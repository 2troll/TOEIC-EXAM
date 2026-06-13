import { useState } from 'react';
import { generateBlocks } from '../ai/generate.js';

/**
 * Targeted Section Practice — pick one TOEIC part, then practice it either from
 * the curated bank or (if AI Mode is on) from freshly generated items.
 */
export default function SectionSelect({ partMeta, questionBank, aiConfig, onBack, onStart }) {
  const [busyPart, setBusyPart] = useState(null);
  const [error, setError] = useState('');

  const parts = Object.values(partMeta);

  function startBuiltIn(part) {
    const blocks = (questionBank[part] || []).map((b) => ({ ...b, part }));
    if (blocks.length === 0) {
      setError(`No built-in items available for Part ${part}.`);
      return;
    }
    onStart({
      title: `${partMeta[part].title}`,
      subtitle: partMeta[part].instructions,
      mode: 'targeted',
      blocks,
    });
  }

  async function startAi(part) {
    setError('');
    setBusyPart(part);
    try {
      const count = part >= 3 && part !== 5 ? 2 : 4; // grouped parts: fewer, richer blocks
      const generated = await generateBlocks({
        apiKey: aiConfig.apiKey,
        model: aiConfig.model,
        part,
        count,
      });
      const blocks = generated.map((b) => ({ ...b, part }));
      onStart({
        title: `${partMeta[part].title} (AI-generated)`,
        subtitle: partMeta[part].instructions,
        mode: 'targeted-ai',
        blocks,
      });
    } catch (err) {
      setError(err.message || 'AI generation failed.');
    } finally {
      setBusyPart(null);
    }
  }

  return (
    <section className="section-select">
      <div className="view-head">
        <button className="btn-ghost" onClick={onBack}>
          ← Back
        </button>
        <h2>Targeted Section Practice</h2>
      </div>

      {error && <div className="alert-error">{error}</div>}

      <div className="part-grid">
        {parts.map((meta) => {
          const count = (questionBank[meta.part] || []).reduce(
            (n, b) => n + b.questions.length,
            0
          );
          const isBusy = busyPart === meta.part;
          return (
            <div className="part-card" key={meta.part}>
              <div className="part-card-head">
                <span className={`tag tag-${meta.section}`}>{meta.section}</span>
                <span className="part-count">{count} built-in Q</span>
              </div>
              <h3>{meta.title}</h3>
              <p>{meta.instructions}</p>
              <div className="part-card-actions">
                <button
                  className="btn-primary"
                  onClick={() => startBuiltIn(meta.part)}
                  disabled={isBusy}
                >
                  Practice (built-in)
                </button>
                {aiConfig.enabled && (
                  <button
                    className="btn-secondary"
                    onClick={() => startAi(meta.part)}
                    disabled={isBusy}
                  >
                    {isBusy ? 'Generating…' : 'Generate with AI'}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
