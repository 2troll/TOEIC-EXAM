import AudioPlayer from './AudioPlayer.jsx';

const LISTENING_KINDS = ['photo', 'qr', 'conversation', 'talk'];

/**
 * Renders a block's stimulus.
 *
 * Listening (Parts 1–4): an AudioPlayer speaks the script aloud in the assigned
 * accent; the transcript stays hidden until revealed.
 * Reading (Parts 6–7): passages are rendered as labeled documents. Part 5 shows
 * only a small categorization chip, since its sentence lives in the prompt.
 */
export default function Stimulus({ stimulus }) {
  if (!stimulus) return null;

  if (stimulus.kind === 'sentence') {
    return (
      <div className="stimulus stimulus-sentence">
        <span className="drill-tag">Categorize: {stimulus.drillType || 'Grammar / Vocabulary'}</span>
      </div>
    );
  }

  if (LISTENING_KINDS.includes(stimulus.kind)) {
    return (
      <div className="stimulus stimulus-audio">
        <AudioPlayer stimulus={stimulus} />
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
