import { PART_META } from '../data/questionBank.js';
import { estimateScore } from '../data/progress.js';
import FeedbackPanel from './FeedbackPanel.jsx';

const LETTERS = ['A', 'B', 'C', 'D', 'E'];

function fmt(total) {
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m}m ${String(s).padStart(2, '0')}s`;
}

function band(pct) {
  if (pct >= 90) return { label: 'Exam-Ready', tone: 'tone-elite' };
  if (pct >= 75) return { label: 'Strong', tone: 'tone-strong' };
  if (pct >= 60) return { label: 'Developing', tone: 'tone-mid' };
  return { label: 'Foundation', tone: 'tone-low' };
}

/**
 * Post-session performance report: headline score, section & per-part
 * breakdowns, pacing assessment, and a compact item review.
 */
export default function Results({ results, onMenu, onRetry }) {
  const { total, correct, perPart, perSection, totalSeconds, pacing, target, review } = results;
  const pct = total ? Math.round((correct / total) * 100) : 0;
  const b = band(pct);

  const targetBudget = pacing ? target * total : null;
  const onPace = pacing ? totalSeconds <= targetBudget : null;
  const est = estimateScore(perSection);

  // Weakest part = lowest accuracy among attempted parts (for "focus next").
  let weakest = null;
  for (const [part, v] of Object.entries(perPart)) {
    if (!v.total) continue;
    const acc = v.correct / v.total;
    if (!weakest || acc < weakest.acc) weakest = { part, acc, ...v };
  }
  const wrongCount = review.filter((r) => !r.isCorrect).length;

  return (
    <section className="results">
      <div className="view-head">
        <h2>Performance Report</h2>
        <span className="results-session">{results.sessionTitle}</span>
      </div>

      <div className="score-hero">
        <div className={`score-ring ${b.tone}`}>
          <span className="score-pct">{pct}%</span>
          <span className="score-frac">
            {correct} / {total}
          </span>
        </div>
        <div className="score-meta">
          <div className={`score-band ${b.tone}`}>{b.label}</div>
          {est.total != null && (
            <div className="est-score">
              Estimated TOEIC score: <strong>~{est.total}</strong>
              <span className="est-range"> / 990</span>
              {est.listening != null && est.reading != null && (
                <span className="est-split">
                  {' '}(Listening ~{est.listening} · Reading ~{est.reading})
                </span>
              )}
              <div className="est-note">Approximate estimate, not an official score.</div>
            </div>
          )}
          <div className="score-time">Total time: {fmt(totalSeconds)}</div>
          {pacing && (
            <div className={`score-pace ${onPace ? 'pace-ok' : 'pace-bad'}`}>
              Pacing target: {fmt(targetBudget)} ·{' '}
              {onPace ? 'On pace ✓' : 'Over pace — keep drilling for speed'}
            </div>
          )}
        </div>
      </div>

      <div className="breakdowns">
        <div className="breakdown">
          <h3>By Section</h3>
          {Object.entries(perSection)
            .filter(([, v]) => v.total > 0)
            .map(([section, v]) => (
              <div className="bar-row" key={section}>
                <span className="bar-label">{section}</span>
                <div className="bar-track">
                  <div
                    className="bar-fill"
                    style={{ width: `${Math.round((v.correct / v.total) * 100)}%` }}
                  />
                </div>
                <span className="bar-val">
                  {v.correct}/{v.total}
                </span>
              </div>
            ))}
        </div>

        <div className="breakdown">
          <h3>By Part</h3>
          {Object.entries(perPart)
            .sort((a, c) => Number(a[0]) - Number(c[0]))
            .map(([part, v]) => (
              <div className="bar-row" key={part}>
                <span className="bar-label">
                  Part {part} · {PART_META[part]?.short}
                </span>
                <div className="bar-track">
                  <div
                    className="bar-fill"
                    style={{ width: `${Math.round((v.correct / v.total) * 100)}%` }}
                  />
                </div>
                <span className="bar-val">
                  {v.correct}/{v.total}
                </span>
              </div>
            ))}
        </div>
      </div>

      <div className="review">
        <div className="review-head-row">
          <h3>Item Review</h3>
          {weakest && (
            <span className="focus-tip">
              Focus next: <strong>Part {weakest.part} · {PART_META[weakest.part]?.short}</strong>{' '}
              ({weakest.correct}/{weakest.total}) — your lowest accuracy
            </span>
          )}
        </div>
        <p className="review-sub">
          {wrongCount === 0
            ? 'Perfect — no mistakes. Open any item to reinforce the strategy.'
            : `${wrongCount} to review. Open each item to see the correct answer and why.`}
        </p>

        <div className="review-list">
          {review.map((r, i) => (
            <details
              className={`rev-item ${r.isCorrect ? 'rev-ok' : 'rev-bad'}`}
              key={i}
              open={!r.isCorrect && wrongCount <= 6}
            >
              <summary>
                <span className="rev-mark">{r.isCorrect ? '✓' : '✗'}</span>
                <span className="rev-part">P{r.part}</span>
                <span className="rev-prompt">{r.prompt}</span>
              </summary>
              <div className="rev-body">
                <div className="rev-options">
                  {r.options.map((opt, oi) => {
                    const text = opt.replace(/^\([A-E]\)\s*/, '');
                    const isKey = oi === r.answer;
                    const isYours = oi === r.chosen;
                    let cls = 'rev-opt';
                    if (isKey) cls += ' rev-opt-key';
                    else if (isYours) cls += ' rev-opt-yours';
                    return (
                      <div className={cls} key={oi}>
                        <span className="rev-letter">{LETTERS[oi]}</span>
                        <span>{text}</span>
                        {isKey && <span className="rev-flag">✓ correct</span>}
                        {isYours && !isKey && <span className="rev-flag wrong">your answer</span>}
                      </div>
                    );
                  })}
                </div>
                {r.feedback && <FeedbackPanel feedback={r.feedback} />}
              </div>
            </details>
          ))}
        </div>
      </div>

      <div className="results-actions">
        <button className="btn-secondary" onClick={onRetry}>
          Retake this session
        </button>
        <button className="btn-primary" onClick={onMenu}>
          Return to Main Menu
        </button>
      </div>
    </section>
  );
}
