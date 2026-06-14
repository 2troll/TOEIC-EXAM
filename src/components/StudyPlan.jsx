import { useState } from 'react';
import { loadPlanDone, setPlanDay, clearPlan } from '../data/progress.js';

/**
 * A guided 30-day plan. Each day has a focus, concrete tasks, and a one-tap
 * launcher into the relevant practice. Completion is saved locally.
 */
const PLAN = [
  // Week 1 — Foundations & diagnosis
  { day: 1, focus: 'Diagnostic — find your level', tasks: ['Take the Full Exam once to get a baseline', 'Note your estimated score and weakest part'], action: { type: 'exam', kind: 'full' } },
  { day: 2, focus: 'Part 5 — Grammar basics', tasks: ['Practice Part 5', 'Sort each item: grammar vs vocabulary in 3 seconds'], action: { type: 'part', part: 5 } },
  { day: 3, focus: 'Part 1 — Photographs', tasks: ['Listen and answer Part 1', 'Match the verb to the action; beware passive traps'], action: { type: 'part', part: 1 } },
  { day: 4, focus: 'Part 2 — Question–Response', tasks: ['Practice Part 2', 'Lock onto the first word: Who / Where / Why / When'], action: { type: 'part', part: 2 } },
  { day: 5, focus: 'Vocabulary + review', tasks: ['Review your mistakes', 'Re-take Part 5'], action: { type: 'review' } },
  { day: 6, focus: 'Reading Test', tasks: ['Take the Reading Test', 'Read the question stems before the passage'], action: { type: 'exam', kind: 'reading' } },
  { day: 7, focus: 'Rest & consolidate', tasks: ['Light review of mistakes', 'Read the Speed-Hack Reference in the Pacing module'], action: { type: 'review' } },
  // Week 2 — Listening depth
  { day: 8, focus: 'Part 3 — Conversations', tasks: ['Practice Part 3', 'Answer the gist from the first lines'], action: { type: 'part', part: 3 } },
  { day: 9, focus: 'Part 4 — Talks', tasks: ['Practice Part 4', 'Catch the purpose in the opening sentence'], action: { type: 'part', part: 4 } },
  { day: 10, focus: 'Listening Test', tasks: ['Take the Listening Test', 'Listen first — answer from memory'], action: { type: 'exam', kind: 'listening' } },
  { day: 11, focus: 'Part 6 — Text Completion', tasks: ['Practice Part 6', 'For sentence blanks, follow the topic'], action: { type: 'part', part: 6 } },
  { day: 12, focus: 'Part 5 speed', tasks: ['Pacing drill, Part 5 (15s/Q)', 'Decide grammar vs vocabulary instantly'], action: { type: 'pacing', part: 5 } },
  { day: 13, focus: 'Review weak points', tasks: ['Review my mistakes', 'Repeat your lowest-accuracy part'], action: { type: 'review' } },
  { day: 14, focus: 'Mini exam', tasks: ['Full Exam', 'Compare your estimated score to Day 1'], action: { type: 'exam', kind: 'full' } },
  // Week 3 — Reading & speed
  { day: 15, focus: 'Part 7 — Single passages', tasks: ['Practice Part 7', 'Scan for keywords from the questions'], action: { type: 'part', part: 7 } },
  { day: 16, focus: 'Part 7 — Double / Triple', tasks: ['Practice Part 7', 'Cross-reference numbers across passages'], action: { type: 'part', part: 7 } },
  { day: 17, focus: 'Part 6 speed', tasks: ['Pacing drill, Part 6', 'Keep cohesion on sentence blanks'], action: { type: 'pacing', part: 6 } },
  { day: 18, focus: 'Part 7 pacing', tasks: ['Pacing drill, Part 7 (~60s/Q)', "Skim — don't read every word"], action: { type: 'pacing', part: 7 } },
  { day: 19, focus: 'Listening review', tasks: ['Re-take the Listening Test', 'Focus on your weakest listening part'], action: { type: 'exam', kind: 'listening' } },
  { day: 20, focus: 'Review my mistakes', tasks: ['Clear as many missed items as you can'], action: { type: 'review' } },
  { day: 21, focus: 'Half-mock', tasks: ['Reading Test, timed', 'Build your reading stamina'], action: { type: 'exam', kind: 'reading' } },
  // Week 4 — Exam conditioning
  { day: 22, focus: 'Timed Listening', tasks: ['Listening Test with the exam clock ON'], action: { type: 'exam', kind: 'listening' } },
  { day: 23, focus: 'Timed Reading', tasks: ['Reading Test with the exam clock ON'], action: { type: 'exam', kind: 'reading' } },
  { day: 24, focus: 'Full timed mock', tasks: ['Full Exam: Timed + Only-at-the-end', 'Treat it exactly like the real test'], action: { type: 'exam', kind: 'full' } },
  { day: 25, focus: 'Deep review', tasks: ['Review every mistake from the mock', 'Read each explanation carefully'], action: { type: 'review' } },
  { day: 26, focus: 'Weak-part blitz', tasks: ['Practice your lowest part twice'], action: { type: 'review' } },
  { day: 27, focus: 'Speed day', tasks: ['Pacing drills for Parts 5, 6 and 7'], action: { type: 'pacing', part: 5 } },
  { day: 28, focus: 'Full timed mock #2', tasks: ['Full Exam: Timed + Only-at-the-end', 'Compare with Day 24'], action: { type: 'exam', kind: 'full' } },
  { day: 29, focus: 'Final review', tasks: ['Clear remaining mistakes', 'Skim the Speed-Hack Reference'], action: { type: 'review' } },
  { day: 30, focus: 'Exam-ready check', tasks: ['One last Full Exam', 'Rest well before the real test 💪'], action: { type: 'exam', kind: 'full' } },
];

const ACTION_LABEL = { review: 'Review mistakes', exam: 'Start exam', part: 'Practice', pacing: 'Speed drill' };

export default function StudyPlan({ onBack, onAction }) {
  const [done, setDone] = useState(() => loadPlanDone());
  const completed = Object.keys(done).length;

  function toggle(day) {
    const d = setPlanDay(day, !done[day]);
    setDone({ ...d });
  }

  return (
    <section className="study-plan">
      <div className="view-head">
        <button className="btn-ghost" onClick={onBack}>
          ← Back
        </button>
        <h2>30-Day Study Plan</h2>
      </div>

      <p className="col-sub">
        One focused step per day. Tap <strong>▶</strong> to jump straight into that day's practice,
        then check it off. Following this for a month covers every part with built-in review and
        timed conditioning.
      </p>

      <div className="plan-progress">
        <div className="plan-bar">
          <div className="plan-bar-fill" style={{ width: `${Math.round((completed / 30) * 100)}%` }} />
        </div>
        <span className="plan-count">{completed}/30 days</span>
        {completed > 0 && (
          <button
            className="btn-ghost danger"
            onClick={() => {
              clearPlan();
              setDone({});
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ol className="plan-list">
        {PLAN.map((d) => (
          <li key={d.day} className={`plan-day ${done[d.day] ? 'plan-done' : ''}`}>
            <div className="plan-day-head">
              <span className="plan-num">Day {d.day}</span>
              <span className="plan-focus">{d.focus}</span>
              <label className="plan-check">
                <input type="checkbox" checked={!!done[d.day]} onChange={() => toggle(d.day)} />
                <span>done</span>
              </label>
            </div>
            <ul className="plan-tasks">
              {d.tasks.map((t, i) => (
                <li key={i}>{t}</li>
              ))}
            </ul>
            {d.action && (
              <button className="btn-secondary plan-start" onClick={() => onAction(d.action)}>
                ▶ {ACTION_LABEL[d.action.type] || 'Start'}
              </button>
            )}
          </li>
        ))}
      </ol>
    </section>
  );
}
