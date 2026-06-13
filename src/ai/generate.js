/**
 * Optional "AI Mode" — generates fresh TOEIC blocks on demand via the Claude API.
 *
 * This is a client-side integration: the user supplies their own Anthropic API
 * key, which is held only in memory (and optionally localStorage) and sent
 * directly from the browser to the Anthropic API using the
 * `anthropic-dangerous-direct-browser-access` header. No backend is involved,
 * so the built-in question bank remains fully functional with zero setup.
 *
 * The model is asked to return blocks that match the simulator's internal
 * schema (see src/data/questionBank.js) so generated content flows through the
 * exact same quiz + 3-tier feedback components as the curated bank.
 */

const ANTHROPIC_URL = 'https://api.anthropic.com/v1/messages';
const ANTHROPIC_VERSION = '2023-06-01';

// Per the Claude API guidance, default to the most capable model unless the
// user explicitly selects another. Opus 4.8 produces the highest-fidelity
// TOEIC items; Sonnet is offered in the UI as a faster/cheaper alternative.
export const DEFAULT_MODEL = 'claude-opus-4-8';

export const AI_MODELS = [
  { id: 'claude-opus-4-8', label: 'Claude Opus 4.8 — highest fidelity (recommended)' },
  { id: 'claude-sonnet-4-6', label: 'Claude Sonnet 4.6 — faster / lower cost' },
  { id: 'claude-haiku-4-5', label: 'Claude Haiku 4.5 — fastest / cheapest' },
];

const PART_INSTRUCTIONS = {
  1: 'Part 1 (Photographs). Each block: stimulus.kind="photo", a vivid stimulus.photoDescription (a workplace scene rendered in words), stimulus.accent (one of American/British/Canadian/Australian), and stimulus.audioScript containing four lettered statements (A)–(D). Exactly ONE question with 4 options that mirror the four statements; include passive-voice traps and state-vs-action traps.',
  2: 'Part 2 (Question–Response). stimulus.kind="qr", stimulus.accent set, stimulus.audioScript holds the question/statement plus three responses (A)–(C). Exactly ONE question with 3 options. Build in similar-sound and word-repetition distractors.',
  3: 'Part 3 (Conversations). stimulus.kind="conversation", stimulus.accent (e.g. "American / British"), stimulus.audioScript is a 4–7 line dialogue between W:/M: speakers using professional vocabulary. Provide 3 questions (gist, detail, next-action) with 4 options each.',
  4: 'Part 4 (Talks). stimulus.kind="talk", stimulus.accent set, stimulus.audioScript is a single-speaker announcement/voicemail/broadcast. Provide 3 questions (audience/purpose, detail, future-plan) with 4 options each.',
  5: 'Part 5 (Incomplete Sentences). stimulus.kind="sentence" and stimulus.drillType naming the category (e.g. "Grammar (word form)" or "Vocabulary (collocation)"). Exactly ONE question whose prompt is a sentence containing "______". 4 options. Mix grammar-based and vocabulary-based items across blocks.',
  6: 'Part 6 (Text Completion). stimulus.kind="passage" with stimulus.passages = [{type, heading, text}]; the text must contain [1] [2] [3] [4] markers. Provide 4 questions, one of which is a full-sentence insertion (its options are complete sentences). Others test grammar/vocabulary.',
  7: 'Part 7 (Reading Comprehension). stimulus.kind="reading", stimulus.label (e.g. "Single Passage"/"Double Passage"), stimulus.passages = [{type, heading, text}] (1–3 passages). Provide 2–4 questions with 4 options; for multi-passage sets include at least one cross-reference question.',
};

function buildSystemPrompt() {
  return [
    'You are a Senior Content Developer for ETS creating authentic TOEIC Listening & Reading practice items.',
    'Return ONLY valid JSON — no markdown fences, no commentary. The JSON must be a single object: {"blocks": [ ... ]}.',
    '',
    'Each block has this shape:',
    '{',
    '  "id": string,',
    '  "stimulus": object | null,   // shape depends on the part (see instructions)',
    '  "questions": [',
    '    {',
    '      "id": string,',
    '      "prompt": string,',
    '      "options": string[],      // each begins with "(A) ", "(B) " ... ',
    '      "answer": number,         // 0-based index of the correct option',
    '      "feedback": {',
    '        "correct": string,      // why the key is right (grammar/context)',
    '        "distractors": string,  // why each other option is wrong',
    '        "timeHack": string      // a <15-second pattern-recognition shortcut',
    '      }',
    '    }',
    '  ]',
    '}',
    '',
    'Rules: use authentic corporate vocabulary (procurement, logistics, HR, corporate travel, finance, marketing). Every question MUST include all three feedback tiers. Keep "answer" indices accurate. Output English only.',
  ].join('\n');
}

function extractJson(text) {
  // Strip optional code fences and isolate the outermost JSON object.
  const cleaned = text.replace(/```json\s*/gi, '').replace(/```/g, '').trim();
  const start = cleaned.indexOf('{');
  const end = cleaned.lastIndexOf('}');
  if (start === -1 || end === -1 || end < start) {
    throw new Error('The model did not return JSON. Try again or use the built-in bank.');
  }
  return JSON.parse(cleaned.slice(start, end + 1));
}

/**
 * Generate `count` blocks for a given TOEIC part.
 * @returns {Promise<Array>} blocks matching the simulator's internal schema.
 */
export async function generateBlocks({ apiKey, model = DEFAULT_MODEL, part, count = 2 }) {
  if (!apiKey) throw new Error('An Anthropic API key is required for AI Mode.');
  const partInstruction = PART_INSTRUCTIONS[part];
  if (!partInstruction) throw new Error(`Unsupported part: ${part}`);

  const userPrompt =
    `Generate ${count} fresh, exam-standard block(s) for ${partInstruction}\n\n` +
    `Make every block distinct from the others. Vary the business scenario, the accent (for listening), and the trap types. Return the JSON object now.`;

  let response;
  try {
    response = await fetch(ANTHROPIC_URL, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': ANTHROPIC_VERSION,
        'anthropic-dangerous-direct-browser-access': 'true',
      },
      body: JSON.stringify({
        model,
        max_tokens: 8000,
        system: buildSystemPrompt(),
        messages: [{ role: 'user', content: userPrompt }],
      }),
    });
  } catch (networkError) {
    throw new Error(
      'Network error contacting the Anthropic API. Check your connection and that direct browser access is permitted.'
    );
  }

  if (!response.ok) {
    let detail = `${response.status} ${response.statusText}`;
    try {
      const errBody = await response.json();
      if (errBody?.error?.message) detail = errBody.error.message;
    } catch {
      /* ignore JSON parse failure on error body */
    }
    if (response.status === 401) {
      throw new Error('Authentication failed — please verify your Anthropic API key.');
    }
    if (response.status === 429) {
      throw new Error('Rate limited by the Anthropic API. Wait a moment and try again.');
    }
    throw new Error(`Anthropic API error: ${detail}`);
  }

  const data = await response.json();
  const textBlock = (data.content || []).find((b) => b.type === 'text');
  if (!textBlock) throw new Error('The model returned no text content.');

  const parsed = extractJson(textBlock.text);
  const blocks = Array.isArray(parsed.blocks) ? parsed.blocks : [];
  if (blocks.length === 0) throw new Error('The model returned no usable blocks.');

  // Light validation so malformed items never crash the quiz UI.
  return blocks.map((block, bi) => ({
    id: block.id || `ai-p${part}-${Date.now()}-${bi}`,
    stimulus: block.stimulus ?? null,
    questions: (block.questions || [])
      .filter((q) => Array.isArray(q.options) && q.options.length >= 2)
      .map((q, qi) => ({
        id: q.id || `ai-p${part}-${Date.now()}-${bi}-${qi}`,
        prompt: q.prompt || '',
        options: q.options,
        answer:
          typeof q.answer === 'number' && q.answer >= 0 && q.answer < q.options.length
            ? q.answer
            : 0,
        feedback: {
          correct: q.feedback?.correct || 'No analysis provided.',
          distractors: q.feedback?.distractors || 'No analysis provided.',
          timeHack: q.feedback?.timeHack || 'No strategy provided.',
        },
      })),
  })).filter((block) => block.questions.length > 0);
}
