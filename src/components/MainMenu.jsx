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
}) {
  return (
    <section className="menu">
      <div className="menu-intro">
        <h2>Choose your exam</h2>
        <p>
          Take a complete practice exam from start to finish. In the Listening parts, press{' '}
          <strong>▶ Play audio</strong> to hear each item in its assigned accent, then answer. At
          the end you receive your <strong>score</strong> and a full <strong>error review</strong>{' '}
          with the 3-tier professional feedback on every question.
        </p>
      </div>

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
      </div>
    </section>
  );
}
