import { useState } from 'react';
import { SPEED_HACKS, PACING_TARGETS } from '../data/strategies.js';
import { generateBlocks } from '../ai/generate.js';

/**
 * Pacing & Speed-Hack Drill module: a strategy reference plus timed drills.
 * Drills attach a per-question target (e.g. 15s for Part 5) so the quiz engine
 * displays a live countdown and flags over-target answers.
 */
export default function PacingModule({ partMeta, questionBank, aiConfig, onBack, onStart }) {
  const [busy, setBusy] = useState(null);
  const [error, setError] = useState('');

  const drills = [
    { part: 5, target: PACING_TARGETS.part5 },
    { part: 6, target: PACING_TARGETS.part6 },
    { part: 7, target: PACING_TARGETS.part7 },
  ];

  function startBuiltIn(part, target) {
    const blocks = (questionBank[part] || []).map((b) => ({ ...b, part }));
    onStart({
      title: `Pacing Drill — ${partMeta[part].short}`,
      subtitle: `Target: ${target.label}. The countdown turns red once you exceed the per-question target. Speed AND accuracy both count.`,
      mode: 'pacing',
      pacing: true,
      target: target.seconds,
      blocks,
    });
  }

  async function startAi(part, target) {
    setError('');
    setBusy(part);
    try {
      const generated = await generateBlocks({
        apiKey: aiConfig.apiKey,
        model: aiConfig.model,
        part,
        count: part === 5 ? 5 : 2,
      });
      const blocks = generated.map((b) => ({ ...b, part }));
      onStart({
        title: `Pacing Drill — ${partMeta[part].short} (AI)`,
        subtitle: `Target: ${target.label}.`,
        mode: 'pacing-ai',
        pacing: true,
        target: target.seconds,
        blocks,
      });
    } catch (err) {
      setError(err.message || 'AI generation failed.');
    } finally {
      setBusy(null);
    }
  }

  return (
    <section className="pacing-module">
      <div className="view-head">
        <button className="btn-ghost" onClick={onBack}>
          ← Back
        </button>
        <h2>Pacing &amp; Speed-Hack Drill</h2>
      </div>

      {error && <div className="alert-error">{error}</div>}

      <div className="pacing-grid">
        <div className="pacing-col">
          <h3 className="col-title">Timed Drills</h3>
          <p className="col-sub">
            Run a part against its official pace. A live countdown trains you to commit before time
            expires.
          </p>
          {drills.map(({ part, target }) => (
            <div className="drill-card" key={part}>
              <div className="drill-card-head">
                <h4>{partMeta[part].title}</h4>
                <span className="target-chip">{target.seconds}s / Q</span>
              </div>
              <p>{target.label}</p>
              <div className="part-card-actions">
                <button
                  className="btn-primary"
                  onClick={() => startBuiltIn(part, target)}
                  disabled={busy === part}
                >
                  Start drill
                </button>
                {aiConfig.enabled && (
                  <button
                    className="btn-secondary"
                    onClick={() => startAi(part, target)}
                    disabled={busy === part}
                  >
                    {busy === part ? 'Generating…' : 'AI drill'}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="pacing-col">
          <h3 className="col-title">Speed-Hack Reference</h3>
          <p className="col-sub">
            Internalize these patterns so you can solve without translating whole sentences or
            reading whole passages.
          </p>
          {SPEED_HACKS.map((hack) => (
            <details className="hack-card" key={hack.id}>
              <summary>
                <span className="hack-title">{hack.title}</span>
                <span className="hack-summary">{hack.summary}</span>
              </summary>
              <ul>
                {hack.points.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
