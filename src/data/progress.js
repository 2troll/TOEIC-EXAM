/**
 * Local progress tracking — stored in the browser (no account, fully private).
 *
 * Records each completed session, estimates a TOEIC scaled score, and tracks
 * missed questions so students can re-practice their weak points. This drives
 * the "best score in the least time" goal: targeted review + visible progress.
 */
import { questionBank } from './questionBank.js';

const KEY = 'toeic_progress_v1';

let _index = null;
function questionIndex() {
  if (_index) return _index;
  _index = {};
  for (const part of Object.keys(questionBank)) {
    for (const block of questionBank[part]) {
      for (const q of block.questions) {
        _index[q.id] = { question: q, stimulus: block.stimulus, part: Number(part) };
      }
    }
  }
  return _index;
}

export function loadProgress() {
  if (typeof localStorage === 'undefined') return { history: [], missed: {} };
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { history: [], missed: {} };
    const p = JSON.parse(raw);
    return { history: p.history || [], missed: p.missed || {} };
  } catch {
    return { history: [], missed: {} };
  }
}

function save(p) {
  try {
    localStorage.setItem(KEY, JSON.stringify(p));
  } catch {
    /* storage unavailable — progress simply isn't persisted */
  }
}

/**
 * Approximate TOEIC scaled score (each section 5–495; total 10–990).
 * This is a rough linear estimate for motivation, NOT an official score.
 */
export function estimateScore(perSection = {}) {
  const sec = (s) => (s && s.total ? Math.max(5, Math.round((s.correct / s.total) * 495)) : null);
  const listening = sec(perSection.listening);
  const reading = sec(perSection.reading);
  const parts = [listening, reading].filter((x) => x != null);
  const total = parts.length ? parts.reduce((a, b) => a + b, 0) : null;
  return { listening, reading, total };
}

export function recordResult(results) {
  const p = loadProgress();
  p.history.push({
    date: new Date().toISOString(),
    title: results.sessionTitle || 'Session',
    total: results.total,
    correct: results.correct,
    pct: results.total ? Math.round((results.correct / results.total) * 100) : 0,
    est: estimateScore(results.perSection || {}),
  });
  if (p.history.length > 50) p.history = p.history.slice(-50);

  for (const r of results.review || []) {
    if (!r.id) continue;
    if (r.isCorrect) {
      delete p.missed[r.id]; // answered correctly → mastered, remove from review
    } else {
      const cur = p.missed[r.id] || { part: r.part, count: 0 };
      cur.count += 1;
      cur.part = r.part;
      p.missed[r.id] = cur;
    }
  }
  save(p);
  return p;
}

export function missedCount() {
  return Object.keys(loadProgress().missed).length;
}

/** Builds a practice session from all currently-missed questions. */
export function buildMissedSession() {
  const p = loadProgress();
  const idx = questionIndex();
  const blocks = Object.keys(p.missed)
    .map((id) => idx[id])
    .filter(Boolean)
    .map((entry) => ({
      id: 'rev-' + entry.question.id,
      part: entry.part,
      stimulus: entry.stimulus,
      questions: [entry.question],
    }));
  if (blocks.length === 0) return null;
  return {
    title: 'Review My Mistakes',
    subtitle:
      'Re-practice the questions you have missed. Answer one correctly to remove it from this list — clear them all to master your weak points.',
    mode: 'review',
    blocks,
  };
}

export function clearProgress() {
  save({ history: [], missed: {} });
}

// ── 30-day study plan completion tracking ──────────────────
const PLAN_KEY = 'toeic_plan_v1';

export function loadPlanDone() {
  if (typeof localStorage === 'undefined') return {};
  try {
    return JSON.parse(localStorage.getItem(PLAN_KEY)) || {};
  } catch {
    return {};
  }
}

export function setPlanDay(day, done) {
  const d = loadPlanDone();
  if (done) d[day] = true;
  else delete d[day];
  try {
    localStorage.setItem(PLAN_KEY, JSON.stringify(d));
  } catch {
    /* ignore */
  }
  return d;
}

export function clearPlan() {
  try {
    localStorage.removeItem(PLAN_KEY);
  } catch {
    /* ignore */
  }
}

// ── Vocabulary trainer (known words) ───────────────────────
const VOCAB_KEY = 'toeic_vocab_v1';

export function loadVocabKnown() {
  if (typeof localStorage === 'undefined') return {};
  try {
    return JSON.parse(localStorage.getItem(VOCAB_KEY)) || {};
  } catch {
    return {};
  }
}

export function setVocabKnown(word, known) {
  const k = loadVocabKnown();
  if (known) k[word] = true;
  else delete k[word];
  try {
    localStorage.setItem(VOCAB_KEY, JSON.stringify(k));
  } catch {
    /* ignore */
  }
  return k;
}

export function clearVocab() {
  try {
    localStorage.removeItem(VOCAB_KEY);
  } catch {
    /* ignore */
  }
}
