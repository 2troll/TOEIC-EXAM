import { useEffect, useMemo, useState } from 'react';
import Stimulus from './Stimulus.jsx';
import FeedbackPanel from './FeedbackPanel.jsx';
import Timer from './Timer.jsx';
import { PART_META } from '../data/questionBank.js';

const GROUPED_KINDS = ['conversation', 'talk', 'passage', 'reading'];
const LETTERS = ['A', 'B', 'C', 'D', 'E'];

/**
 * Splits the session's blocks into "sets" (pages). Blocks with a shared
 * multi-question stimulus (conversations, talks, passages) become their own
 * set; single-question blocks (Parts 1, 2, 5) are grouped up to ~5 questions
 * per set, satisfying the "small manageable blocks" delivery rule.
 */
function buildSets(blocks) {
  const sets = [];
  let bucket = [];
  let bucketCount = 0;
  const flush = () => {
    if (bucket.length) sets.push(bucket);
    bucket = [];
    bucketCount = 0;
  };
  for (const block of blocks) {
    const grouped =
      block.questions.length > 1 || GROUPED_KINDS.includes(block.stimulus?.kind);
    if (grouped) {
      flush();
      sets.push([block]);
    } else {
      bucket.push(block);
      bucketCount += block.questions.length;
      if (bucketCount >= 5) flush();
    }
  }
  flush();
  return sets;
}

export default function QuizSession({ session, onExit, onComplete }) {
  const sets = useMemo(() => buildSets(session.blocks), [session.blocks]);
  const [setIndex, setSetIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [revealed, setRevealed] = useState({});
  const [seconds, setSeconds] = useState({});
  // Parts 1 & 2 hide their answer choices until the audio has been played once.
  const [playedBlocks, setPlayedBlocks] = useState({});
  const markPlayed = (id) => setPlayedBlocks((p) => (p[id] ? p : { ...p, [id]: true }));

  const currentSet = sets[setIndex] || [];
  const isRevealed = !!revealed[setIndex];
  const elapsed = seconds[setIndex] || 0;

  // Per-question pacing target for the current set (pacing mode only).
  const questionsInSet = currentSet.reduce((n, b) => n + b.questions.length, 0);
  const setTarget = session.pacing ? session.target * questionsInSet : null;

  // Count up while this set is unanswered.
  useEffect(() => {
    if (isRevealed) return undefined;
    const t = setInterval(() => {
      setSeconds((s) => ({ ...s, [setIndex]: (s[setIndex] || 0) + 1 }));
    }, 1000);
    return () => clearInterval(t);
  }, [setIndex, isRevealed]);

  const allQuestionsOnSet = currentSet.flatMap((b) => b.questions.map((q) => q.id));
  const allAnswered = allQuestionsOnSet.every((id) => answers[id] !== undefined);

  // Global question number offset for display.
  const priorCount = sets
    .slice(0, setIndex)
    .reduce((n, s) => n + s.reduce((m, b) => m + b.questions.length, 0), 0);

  function choose(qid, optionIndex) {
    if (isRevealed) return;
    setAnswers((a) => ({ ...a, [qid]: optionIndex }));
  }

  function submitSet() {
    if (!allAnswered) return;
    setRevealed((r) => ({ ...r, [setIndex]: true }));
  }

  function computeResults() {
    let total = 0;
    let correct = 0;
    const perPart = {};
    const perSection = { listening: { correct: 0, total: 0 }, reading: { correct: 0, total: 0 } };
    const review = [];

    for (const block of session.blocks) {
      const section = PART_META[block.part]?.section || 'reading';
      for (const q of block.questions) {
        total += 1;
        const chosen = answers[q.id];
        const isCorrect = chosen === q.answer;
        if (isCorrect) correct += 1;

        perPart[block.part] = perPart[block.part] || { correct: 0, total: 0 };
        perPart[block.part].total += 1;
        if (isCorrect) perPart[block.part].correct += 1;

        perSection[section].total += 1;
        if (isCorrect) perSection[section].correct += 1;

        review.push({
          part: block.part,
          prompt: q.prompt,
          chosen,
          answer: q.answer,
          options: q.options,
          isCorrect,
        });
      }
    }

    const totalSeconds = Object.values(seconds).reduce((a, b) => a + b, 0);
    return {
      total,
      correct,
      perPart,
      perSection,
      totalSeconds,
      pacing: !!session.pacing,
      target: session.target,
      review,
    };
  }

  function next() {
    if (setIndex + 1 < sets.length) {
      setSetIndex((i) => i + 1);
    } else {
      onComplete(computeResults());
    }
  }

  const isLastSet = setIndex + 1 >= sets.length;

  return (
    <section className="quiz">
      <div className="quiz-head">
        <div>
          <button className="btn-ghost" onClick={onExit}>
            ← Exit to Menu
          </button>
          <h2>{session.title}</h2>
          {session.subtitle && <p className="quiz-sub">{session.subtitle}</p>}
        </div>
        <div className="quiz-head-right">
          <Timer seconds={elapsed} target={setTarget} />
          <div className="set-progress">
            Set {setIndex + 1} of {sets.length}
          </div>
        </div>
      </div>

      <div className="quiz-body">
        {currentSet.map((block) => (
          <div className="block" key={block.id}>
            <Stimulus stimulus={block.stimulus} onPlayed={() => markPlayed(block.id)} />

            {block.questions.map((q) => {
              const audioGated =
                (block.part === 1 || block.part === 2) &&
                !playedBlocks[block.id] &&
                !isRevealed;
              const globalNo =
                priorCount +
                currentSet
                  .slice(0, currentSet.indexOf(block))
                  .reduce((m, b) => m + b.questions.length, 0) +
                block.questions.indexOf(q) +
                1;
              const chosen = answers[q.id];
              return (
                <div className="question" key={q.id}>
                  <div className="question-head">
                    <span className="q-no">Q{globalNo}</span>
                    <span className={`q-part tag tag-${PART_META[block.part]?.section}`}>
                      Part {block.part}
                    </span>
                  </div>
                  <p className="q-prompt">{q.prompt}</p>

                  {audioGated ? (
                    <div className="locked-options">
                      ▶ Play the audio to reveal the answer choices.
                    </div>
                  ) : (
                  <div className="options">
                    {q.options.map((opt, oi) => {
                      // Strip a leading "(A) " style label so we can render our own.
                      const text = opt.replace(/^\([A-E]\)\s*/, '');
                      const selected = chosen === oi;
                      let cls = 'option';
                      if (isRevealed) {
                        if (oi === q.answer) cls += ' option-correct';
                        else if (selected) cls += ' option-wrong';
                      } else if (selected) {
                        cls += ' option-selected';
                      }
                      return (
                        <button
                          key={oi}
                          className={cls}
                          onClick={() => choose(q.id, oi)}
                          disabled={isRevealed}
                        >
                          <span className="option-letter">{LETTERS[oi]}</span>
                          <span className="option-text">{text}</span>
                          {isRevealed && oi === q.answer && (
                            <span className="option-mark">✓ key</span>
                          )}
                          {isRevealed && selected && oi !== q.answer && (
                            <span className="option-mark wrong">✗ your answer</span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                  )}

                  {isRevealed && <FeedbackPanel feedback={q.feedback} />}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      <div className="quiz-actions">
        {!isRevealed ? (
          <>
            <span className="answered-count">
              {allQuestionsOnSet.filter((id) => answers[id] !== undefined).length} /{' '}
              {allQuestionsOnSet.length} answered
            </span>
            <button className="btn-primary" onClick={submitSet} disabled={!allAnswered}>
              Submit Answers
            </button>
          </>
        ) : (
          <button className="btn-primary" onClick={next}>
            {isLastSet ? 'Finish & View Score →' : 'Next Set →'}
          </button>
        )}
      </div>
    </section>
  );
}
