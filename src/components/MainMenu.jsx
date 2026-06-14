/**
 * The Main Menu. Students take full exams (or focused practice); every exam ends
 * with a score and a full error review. Listening items are played aloud.
 */
export default function MainMenu({
  onFullExam,
  onListeningExam,
  onReadingExam,
  onTargeted,
  onPacing,
  onReviewMistakes,
  onProgress,
  onPlan,
  onVocab,
  progress,
  feedbackMode,
  onSetFeedbackMode,
  timed,
  onSetTimed,
}) {
  const history = progress?.history || [];
  const missedN = Object.keys(progress?.missed || {}).length;
  const bestTotal = history.reduce((m, h) => Math.max(m, h.est?.total || 0), 0);

  return (
    <section className="menu">
      <div className="menu-intro">
        <h2>Choose your exam</h2>
        <p>
          Take a complete practice exam from start to finish. In the Listening parts, press{' '}
          <strong>▶ Play audio</strong> to hear each item in its assigned accent, then answer. At
          the end you receive your <strong>score</strong>, an <strong>estimated TOEIC score</strong>,
          and a full <strong>error review</strong> with 3-tier feedback on every question.
        </p>
      </div>

      <div className="mode-toggle" role="group" aria-label="Feedback mode">
        <span className="mode-label">Before you start — feedback:</span>
        <div className="seg">
          <button
            className={feedbackMode === 'instant' ? 'seg-on' : ''}
            onClick={() => onSetFeedbackMode('instant')}
          >
            Instant (learn as you go)
          </button>
          <button
            className={feedbackMode === 'end' ? 'seg-on' : ''}
            onClick={() => onSetFeedbackMode('end')}
          >
            Only at the end (real exam)
          </button>
        </div>

        <label className="timed-check">
          <input type="checkbox" checked={timed} onChange={(e) => onSetTimed(e.target.checked)} />
          <span>Timed (real exam clock)</span>
        </label>
      </div>

      {(history.length > 0 || missedN > 0) && (
        <div className="progress-strip">
          <div className="progress-stat">
            <span className="ps-num">{bestTotal || '—'}</span>
            <span className="ps-label">Best est. score</span>
          </div>
          <div className="progress-stat">
            <span className="ps-num">{history.length}</span>
            <span className="ps-label">Sessions</span>
          </div>
          <div className="progress-actions">
            {missedN > 0 && (
              <button className="btn-secondary" onClick={onReviewMistakes}>
                Review my mistakes ({missedN})
              </button>
            )}
            <button className="btn-ghost dark" onClick={onProgress}>
              My progress
            </button>
          </div>
        </div>
      )}

      <div className="card-grid">
        <button className="module-card module-card-feature" onClick={onFullExam}>
          <div className="module-index">★</div>
          <h3>Full Exam</h3>
          <p>
            A complete Listening &amp; Reading test across all seven parts (1–7), the closest to the
            real exam experience.
          </p>
          <span className="module-go">Start full exam →</span>
        </button>

        <button className="module-card" onClick={onListeningExam}>
          <div className="module-index">🎧</div>
          <h3>Listening Test</h3>
          <p>Parts 1–4 with spoken audio (photographs, question–response, conversations, talks).</p>
          <span className="module-go">Start listening test →</span>
        </button>

        <button className="module-card" onClick={onReadingExam}>
          <div className="module-index">📖</div>
          <h3>Reading Test</h3>
          <p>Parts 5–7: incomplete sentences, text completion, and single/double/triple passages.</p>
          <span className="module-go">Start reading test →</span>
        </button>

        <button className="module-card" onClick={onTargeted}>
          <div className="module-index">2</div>
          <h3>Targeted Section Practice</h3>
          <p>Drill any single part (1–7) in small, manageable blocks.</p>
          <span className="module-go">Choose a section →</span>
        </button>

        <button className="module-card" onClick={onPacing}>
          <div className="module-index">3</div>
          <h3>Pacing &amp; Speed-Hack Drill</h3>
          <p>Timed drills with per-question target countdowns and a speed-hack strategy reference.</p>
          <span className="module-go">Open drills →</span>
        </button>

        <button className="module-card" onClick={onPlan}>
          <div className="module-index">📅</div>
          <h3>30-Day Study Plan</h3>
          <p>A guided day-by-day plan with one-tap practice — the fastest path to exam-ready.</p>
          <span className="module-go">Open the plan →</span>
        </button>

        <button className="module-card" onClick={onVocab}>
          <div className="module-index">🗂️</div>
          <h3>Vocabulary Trainer</h3>
          <p>Flashcards of high-frequency TOEIC business words, with self-paced review.</p>
          <span className="module-go">Train vocabulary →</span>
        </button>
      </div>
    </section>
  );
}
