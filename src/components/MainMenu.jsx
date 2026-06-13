/**
 * The Main Menu — the entry point students see first. Presents the three core
 * modules plus the AI Mode status. Nothing is generated until a module is chosen.
 */
export default function MainMenu({ onFullDiagnostic, onTargeted, onPacing, aiEnabled, onOpenAi }) {
  return (
    <section className="menu">
      <div className="menu-intro">
        <h2>Welcome to your training session</h2>
        <p>
          Select a module to begin. Each module is delivered step by step — you submit your
          answers before the correct keys, scores, and the mandatory{' '}
          <strong>3-tier professional feedback</strong> are revealed.
        </p>
      </div>

      <div className="card-grid">
        <button className="module-card" onClick={onFullDiagnostic}>
          <div className="module-index">1</div>
          <h3>Full Simulation Diagnostic</h3>
          <p>
            A timed cross-section spanning all seven parts (1–7). Establishes a baseline across
            Listening and Reading under realistic conditions.
          </p>
          <span className="module-go">Begin diagnostic →</span>
        </button>

        <button className="module-card" onClick={onTargeted}>
          <div className="module-index">2</div>
          <h3>Targeted Section Practice</h3>
          <p>
            Drill any single part — Photographs, Question–Response, Conversations, Talks,
            Incomplete Sentences, Text Completion, or Reading Comprehension — in manageable blocks.
          </p>
          <span className="module-go">Choose a section →</span>
        </button>

        <button className="module-card" onClick={onPacing}>
          <div className="module-index">3</div>
          <h3>Pacing &amp; Speed-Hack Drill</h3>
          <p>
            Train strict time management: instant grammar/vocabulary categorization for Parts 5–6
            and active skimming workflows for Part 7, with per-question target timers.
          </p>
          <span className="module-go">Open drills →</span>
        </button>
      </div>

      <div className="ai-banner">
        <div>
          <strong>AI Mode is {aiEnabled ? 'enabled' : 'available'}.</strong>{' '}
          {aiEnabled
            ? 'Targeted and Pacing modules can generate fresh, unseen items on demand.'
            : 'Optionally connect an Anthropic API key to generate unlimited fresh items. The built-in question bank works with no setup.'}
        </div>
        <button className="btn-secondary" onClick={onOpenAi}>
          {aiEnabled ? 'Manage AI Mode' : 'Enable AI Mode'}
        </button>
      </div>
    </section>
  );
}
