import { PART_META } from '../data/questionBank.js';
import { clearProgress } from '../data/progress.js';

function fmtDate(iso) {
  try {
    return new Date(iso).toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return iso;
  }
}

/** Progress dashboard: best estimated score, trend, and weakest parts. */
export default function Progress({ progress, onBack, onReview, onCleared }) {
  const history = progress.history || [];
  const missed = progress.missed || {};

  const bestTotal = history.reduce((max, h) => Math.max(max, h.est?.total || 0), 0);
  const lastPct = history.length ? history[history.length - 1].pct : null;
  const firstPct = history.length ? history[0].pct : null;
  const trend = firstPct != null && lastPct != null ? lastPct - firstPct : 0;

  // Count missed questions by part to surface weak areas.
  const weakByPart = {};
  for (const id of Object.keys(missed)) {
    const part = missed[id].part;
    weakByPart[part] = (weakByPart[part] || 0) + 1;
  }
  const weakSorted = Object.entries(weakByPart).sort((a, b) => b[1] - a[1]);

  return (
    <section className="progress-view">
      <div className="view-head">
        <button className="btn-ghost" onClick={onBack}>
          ← Back
        </button>
        <h2>My Progress</h2>
      </div>

      {history.length === 0 ? (
        <div className="empty-state">
          <p>No sessions yet. Take an exam and your scores, trend, and weak points will appear here.</p>
        </div>
      ) : (
        <>
          <div className="stat-row">
            <div className="stat-card">
              <span className="stat-num">{bestTotal || '—'}</span>
              <span className="stat-label">Best estimated score (10–990)</span>
            </div>
            <div className="stat-card">
              <span className="stat-num">{history.length}</span>
              <span className="stat-label">Sessions completed</span>
            </div>
            <div className="stat-card">
              <span className={`stat-num ${trend >= 0 ? 'up' : 'down'}`}>
                {trend >= 0 ? '+' : ''}
                {trend}%
              </span>
              <span className="stat-label">Accuracy change since first</span>
            </div>
          </div>

          <div className="progress-cols">
            <div className="breakdown">
              <h3>Weak points to review</h3>
              {weakSorted.length === 0 ? (
                <p className="col-sub">No outstanding mistakes — excellent! 🎉</p>
              ) : (
                <>
                  {weakSorted.map(([part, n]) => (
                    <div className="bar-row" key={part}>
                      <span className="bar-label">
                        Part {part} · {PART_META[part]?.short}
                      </span>
                      <span className="weak-count">{n} to review</span>
                    </div>
                  ))}
                  <button className="btn-primary review-btn" onClick={onReview}>
                    Review my mistakes ({Object.keys(missed).length})
                  </button>
                </>
              )}
            </div>

            <div className="breakdown">
              <h3>Recent sessions</h3>
              <ul className="hist-list">
                {[...history]
                  .reverse()
                  .slice(0, 12)
                  .map((h, i) => (
                    <li key={i}>
                      <span className="hist-date">{fmtDate(h.date)}</span>
                      <span className="hist-title">{h.title}</span>
                      <span className="hist-score">
                        {h.pct}% · ~{h.est?.total ?? '—'}
                      </span>
                    </li>
                  ))}
              </ul>
            </div>
          </div>

          <div className="results-actions">
            <button
              className="btn-ghost danger"
              onClick={() => {
                clearProgress();
                onCleared();
              }}
            >
              Reset progress
            </button>
          </div>
        </>
      )}
    </section>
  );
}
