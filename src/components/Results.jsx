import { PART_META } from '../data/questionBank.js';

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
        <h3>Item Review</h3>
        <ul className="review-list">
          {review.map((r, i) => (
            <li key={i} className={r.isCorrect ? 'rev-ok' : 'rev-bad'}>
              <span className="rev-mark">{r.isCorrect ? '✓' : '✗'}</span>
              <span className="rev-part">P{r.part}</span>
              <span className="rev-prompt">{r.prompt}</span>
              {!r.isCorrect && (
                <span className="rev-keys">
                  Your answer: {r.chosen != null ? String.fromCharCode(65 + r.chosen) : '—'} ·
                  Key: {String.fromCharCode(65 + r.answer)}
                </span>
              )}
            </li>
          ))}
        </ul>
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
