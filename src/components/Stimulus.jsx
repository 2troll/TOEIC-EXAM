import { useState } from 'react';

const LISTENING_KINDS = ['photo', 'qr', 'conversation', 'talk'];

/**
 * Renders a block's stimulus.
 *
 * Listening (Parts 1–4): the script is shown inside an [AUDIO SCRIPT] frame.
 * The user reads it once, then hides it to answer from memory — simulating the
 * single audio playback of the real exam and training auditory retention.
 *
 * Reading (Parts 6–7): passages are rendered as labeled documents. Part 5 shows
 * only a small categorization chip, since its sentence lives in the prompt.
 */
export default function Stimulus({ stimulus, part }) {
  const [hidden, setHidden] = useState(false);
  if (!stimulus) return null;

  // Part 5 — just a categorization hint chip.
  if (stimulus.kind === 'sentence') {
    return (
      <div className="stimulus stimulus-sentence">
        <span className="drill-tag">Categorize: {stimulus.drillType || 'Grammar / Vocabulary'}</span>
      </div>
    );
  }

  // Listening parts — audio simulation with read-once toggle.
  if (LISTENING_KINDS.includes(stimulus.kind)) {
    const accent = stimulus.accent || 'American';
    return (
      <div className="stimulus stimulus-audio">
        <div className="audio-head">
          <span className="audio-label">
            🎧 [AUDIO SCRIPT / DESIGNATED ACCENT: {accent}]
          </span>
          <button
            className="btn-mini"
            onClick={() => setHidden((h) => !h)}
            title="Simulate the single audio playback by hiding the script before you answer."
          >
            {hidden ? 'Show script' : 'Hide script & answer from memory'}
          </button>
        </div>

        {hidden ? (
          <div className="audio-hidden">
            Script hidden — answer from memory, just as you would after a single audio play.
          </div>
        ) : (
          <>
            {stimulus.kind === 'photo' && (
              <div className="photo-frame">
                <span className="photo-label">[PHOTOGRAPH]</span>
                <p>{stimulus.photoDescription}</p>
              </div>
            )}
            <pre className="audio-script">{stimulus.audioScript}</pre>
            <p className="audio-hint">
              Read the script once, then hide it before selecting your answer.
            </p>
          </>
        )}
      </div>
    );
  }

  // Reading parts 6 & 7 — labeled passages.
  const passages = stimulus.passages || [];
  return (
    <div className="stimulus stimulus-reading">
      {stimulus.label && <div className="reading-label">{stimulus.label}</div>}
      {passages.map((p, i) => (
        <article className="passage" key={i}>
          <div className="passage-type">{p.type}</div>
          {p.heading && <div className="passage-heading">{p.heading}</div>}
          <div className="passage-text">{p.text}</div>
        </article>
      ))}
    </div>
  );
}
