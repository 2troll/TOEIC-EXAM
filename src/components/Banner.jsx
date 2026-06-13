const ASCII = String.raw`
 ______  ____   ____ ___ ____
|_   _|/ __ \ / __ \_ _/ ___|
  | | | |  | | |  | | | |
  | | | |__| | |__| | | |___
  |_|  \____/ \____/___\____|
`;

/**
 * Professional header for the simulator. Shows the ASCII banner, a Home action,
 * and an AI Mode indicator/toggle entry point.
 */
export default function Banner({ onHome, onOpenAi, aiEnabled }) {
  return (
    <header className="banner">
      <div className="banner-inner">
        <button className="banner-brand" onClick={onHome} title="Return to Main Menu">
          <pre className="banner-ascii" aria-hidden="true">{ASCII}</pre>
          <div className="banner-titles">
            <h1>TOEIC MASTERY SIMULATOR</h1>
            <p>Listening &amp; Reading · High-Fidelity Exam Conditioning</p>
          </div>
        </button>

        <div className="banner-actions">
          <button
            className={`pill ${aiEnabled ? 'pill-on' : ''}`}
            onClick={onOpenAi}
            title="Configure optional AI question generation"
          >
            <span className="pill-dot" />
            AI Mode: {aiEnabled ? 'ON' : 'OFF'}
          </button>
          <button className="btn-ghost" onClick={onHome}>
            Main Menu
          </button>
        </div>
      </div>
    </header>
  );
}
