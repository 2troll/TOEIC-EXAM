/**
 * Targeted Section Practice — pick one TOEIC part and practice it from the
 * curated bank.
 */
export default function SectionSelect({ partMeta, questionBank, onBack, onStart }) {
  const parts = Object.values(partMeta);

  function start(part) {
    const blocks = (questionBank[part] || []).map((b) => ({ ...b, part }));
    if (blocks.length === 0) return;
    onStart({
      title: partMeta[part].title,
      subtitle: partMeta[part].instructions,
      mode: 'targeted',
      blocks,
    });
  }

  return (
    <section className="section-select">
      <div className="view-head">
        <button className="btn-ghost" onClick={onBack}>
          ← Back
        </button>
        <h2>Targeted Section Practice</h2>
      </div>

      <div className="part-grid">
        {parts.map((meta) => {
          const count = (questionBank[meta.part] || []).reduce(
            (n, b) => n + b.questions.length,
            0
          );
          return (
            <div className="part-card" key={meta.part}>
              <div className="part-card-head">
                <span className={`tag tag-${meta.section}`}>{meta.section}</span>
                <span className="part-count">{count} questions</span>
              </div>
              <h3>{meta.title}</h3>
              <p>{meta.instructions}</p>
              <div className="part-card-actions">
                <button className="btn-primary" onClick={() => start(meta.part)}>
                  Practice this part
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
