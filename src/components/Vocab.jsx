import { useMemo, useState } from 'react';
import { VOCAB } from '../data/vocab.js';
import { loadVocabKnown, setVocabKnown, clearVocab } from '../data/progress.js';

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * Flashcard vocabulary trainer. Tap a card to flip it, then rate yourself.
 * "I know this" marks the word learned; "Review again" keeps it in the deck.
 */
export default function Vocab({ onBack }) {
  const [known, setKnown] = useState(() => loadVocabKnown());
  const [reviewOnly, setReviewOnly] = useState(false);
  const [flipped, setFlipped] = useState(false);
  const [idx, setIdx] = useState(0);
  const [order, setOrder] = useState(() => shuffle(VOCAB.map((_, i) => i)));

  const knownCount = Object.keys(known).length;

  // Active deck (optionally only the words not yet known).
  const deck = useMemo(
    () => order.filter((i) => (reviewOnly ? !known[VOCAB[i].word] : true)),
    [order, reviewOnly, known]
  );

  const cardIndex = deck.length ? deck[idx % deck.length] : null;
  const card = cardIndex != null ? VOCAB[cardIndex] : null;

  function nextCard() {
    setFlipped(false);
    setIdx((i) => (deck.length ? (i + 1) % deck.length : 0));
  }

  function mark(isKnown) {
    if (!card) return;
    const k = setVocabKnown(card.word, isKnown);
    setKnown({ ...k });
    nextCard();
  }

  function reshuffle() {
    setOrder(shuffle(VOCAB.map((_, i) => i)));
    setIdx(0);
    setFlipped(false);
  }

  return (
    <section className="vocab">
      <div className="view-head">
        <button className="btn-ghost" onClick={onBack}>
          ← Back
        </button>
        <h2>Vocabulary Trainer</h2>
      </div>

      <div className="vocab-bar">
        <div className="plan-bar">
          <div
            className="plan-bar-fill"
            style={{ width: `${Math.round((knownCount / VOCAB.length) * 100)}%` }}
          />
        </div>
        <span className="plan-count">
          {knownCount}/{VOCAB.length} learned
        </span>
        <label className="vocab-toggle">
          <input type="checkbox" checked={reviewOnly} onChange={(e) => { setReviewOnly(e.target.checked); setIdx(0); setFlipped(false); }} />
          <span>Review unknown only</span>
        </label>
        <button className="btn-mini" onClick={reshuffle}>
          🔀 Shuffle
        </button>
      </div>

      {card ? (
        <>
          <button
            className={`flashcard ${flipped ? 'is-flipped' : ''}`}
            onClick={() => setFlipped((f) => !f)}
            aria-label="Flip card"
          >
            {!flipped ? (
              <div className="fc-front">
                <span className="fc-word">{card.word}</span>
                <span className="fc-pos">{card.pos}</span>
                <span className="fc-hint">Tap to reveal the meaning</span>
              </div>
            ) : (
              <div className="fc-back">
                <span className="fc-def">{card.def}</span>
                <span className="fc-example">“{card.example}”</span>
              </div>
            )}
          </button>

          <div className="vocab-actions">
            <button className="btn-secondary" onClick={() => mark(false)}>
              Review again
            </button>
            <button className="btn-primary" onClick={() => mark(true)}>
              I know this ✓
            </button>
          </div>
        </>
      ) : (
        <div className="empty-state">
          <p>🎉 You've learned every word! Turn off "Review unknown only" to practice again.</p>
        </div>
      )}

      <div className="results-actions">
        <button
          className="btn-ghost danger"
          onClick={() => {
            clearVocab();
            setKnown({});
            setReviewOnly(false);
            setIdx(0);
          }}
        >
          Reset vocabulary progress
        </button>
      </div>
    </section>
  );
}
