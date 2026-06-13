const ASCII = String.raw`
 ______  ____   ____ ___ ____
|_   _|/ __ \ / __ \_ _/ ___|
  | | | |  | | |  | | | |
  | | | |__| | |__| | | |___
  |_|  \____/ \____/___\____|
`;

/** Professional header for the simulator. */
export default function Banner({ onHome }) {
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
          <button className="btn-ghost" onClick={onHome}>
            Main Menu
          </button>
        </div>
      </div>
    </header>
  );
}
