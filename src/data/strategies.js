/**
 * Speed-Hack & Pacing reference content for the Pacing & Speed-Hack Drill module.
 * Each entry trains the analytical shortcuts that let students answer under
 * strict time conditions without translating entire sentences or passages.
 */

export const PACING_TARGETS = {
  part5: { seconds: 15, label: 'Part 5 — target 15 seconds per question' },
  part6: { seconds: 25, label: 'Part 6 — target 25 seconds per blank' },
  part7: { seconds: 60, label: 'Part 7 — target ~60 seconds per question' },
};

export const SPEED_HACKS = [
  {
    id: 'p56-categorize',
    title: 'Part 5/6 — Categorize Before You Read',
    summary:
      'In under 3 seconds, classify every item as GRAMMAR-based or VOCABULARY-based by glancing at the four options.',
    points: [
      'If the four options are the SAME word in different forms (rely → reliable → reliably → reliability), it is a GRAMMAR item. Decide by the part of speech immediately before/after the blank — never translate the sentence.',
      'If the four options are DIFFERENT words of the same part of speech (surge / source / search / surface), it is a VOCABULARY item. Scan for the contextual collocation partner instead.',
      'Grammar triggers: a verb before the blank → adverb; an article/adjective before the blank → noun; "than" → comparative; a full clause after the blank → conjunction; a noun right after the blank → possessive/adjective.',
      'Vocabulary triggers: read only the 4–6 words around the blank to find the collocation ("consumer behavior," "surge in demand," "readily available").',
    ],
  },
  {
    id: 'p56-prepositions',
    title: 'Part 5/6 — Deadline vs. Duration Prepositions',
    summary: 'Resolve time-preposition items instantly with one rule pair.',
    points: [
      '"by + point in time" = a deadline for a single action (submit by Friday).',
      '"until + point in time" = a continuous action up to that point (wait until Friday).',
      '"for + length" vs. "since + start point" vs. "during + named period" — match the object type, not the meaning.',
      'These appear several times per test; pre-deciding the rule saves 10+ seconds each.',
    ],
  },
  {
    id: 'p7-stems-first',
    title: 'Part 7 — Read the Question Stems First',
    summary: 'Extract keywords from the questions before touching the passage.',
    points: [
      'Read all question stems for a passage set first and underline the keyword in each (a name, a number, a date, a job title).',
      'Then scan the passage for those exact keywords — answers cluster around them.',
      'Detail and "according to" questions are usually in passage order; main-idea questions are answered by the first paragraph.',
      'Do NOT read every word. Skim for keyword matches, confirm the surrounding sentence, then commit.',
    ],
  },
  {
    id: 'p7-traps',
    title: 'Part 7 — Number & Reference Traps',
    summary: 'The most common multi-passage traps and how to neutralize them.',
    points: [
      'This year vs. last year, expected vs. capacity, base price vs. total price — re-read the clause around any number to confirm WHICH quantity it is.',
      '"According to the emails / both texts" signals a cross-reference question — expect to combine or add figures from two passages.',
      'In triple passages, one text names a WHAT (workshop, product), another supplies the WHEN/WHERE/HOW MUCH. Link them by the shared keyword.',
      'When two discounts/conditions are described, eliminate the one the text explicitly denies (e.g., "We are not members").',
    ],
  },
  {
    id: 'p1-2-listening',
    title: 'Parts 1–2 — Trap-Word Discipline',
    summary: 'Defuse the audio distractors built into every Listening item.',
    points: [
      'Part 1: match the VERB to the visible action first. Passive "is being + p.p." is usually wrong unless someone is clearly doing it. Distinguish "putting on" (action) from "wearing" (state).',
      'Part 2: lock onto the first word — Who→person, Where→place, Why→reason, When/How soon→time, A-or-B→pick one.',
      'Distrust any option that repeats a word from the prompt (table, ship, sales) or uses a similar sound — these are deliberate traps.',
      'Tag questions ("…, don\'t they?") take Yes/No + a supporting detail; reject location/time answers.',
    ],
  },
];
