import { useState, useCallback } from 'react';
import Banner from './components/Banner.jsx';
import MainMenu from './components/MainMenu.jsx';
import SectionSelect from './components/SectionSelect.jsx';
import PacingModule from './components/PacingModule.jsx';
import QuizSession from './components/QuizSession.jsx';
import Results from './components/Results.jsx';
import Progress from './components/Progress.jsx';
import StudyPlan from './components/StudyPlan.jsx';
import Vocab from './components/Vocab.jsx';
import { questionBank, PART_META } from './data/questionBank.js';
import { PACING_TARGETS } from './data/strategies.js';
import { loadProgress, recordResult, buildMissedSession } from './data/progress.js';

/**
 * Top-level state machine for the TOEIC Mastery Simulator.
 * Views: 'menu' → 'section' | 'pacing' → 'quiz' → 'results'.
 * A "session" is { title, subtitle, mode, pacing?, target?, blocks: [...] }
 * where each block carries a `part` field.
 */

function blocksForParts(parts) {
  const out = [];
  for (const part of parts) {
    const available = questionBank[part] || [];
    out.push(...available.map((b) => ({ ...b, part })));
  }
  return out;
}

function buildExam(parts, title, subtitle, mode) {
  return { title, subtitle, mode, blocks: blocksForParts(parts) };
}

const ALL_PARTS = [1, 2, 3, 4, 5, 6, 7];
const LISTENING_PARTS = [1, 2, 3, 4];
const READING_PARTS = [5, 6, 7];

export default function App() {
  const [view, setView] = useState('menu');
  const [session, setSession] = useState(null);
  const [lastResults, setLastResults] = useState(null);
  const [progress, setProgress] = useState(() => loadProgress());
  // 'instant' = feedback after each set; 'end' = exam mode (results only at end).
  const [feedbackMode, setFeedbackMode] = useState('instant');
  // Timed mode runs a global countdown at the official TOEIC pace.
  const [timed, setTimed] = useState(false);

  const goMenu = useCallback(() => {
    setView('menu');
    setSession(null);
  }, []);

  const startSession = useCallback((built) => {
    setSession(built);
    setView('quiz');
  }, []);

  const startReview = useCallback(() => {
    const built = buildMissedSession();
    if (built) {
      setSession(built);
      setView('quiz');
    }
  }, []);

  // Launch the practice a study-plan day points to.
  const startPlanAction = useCallback(
    (action) => {
      if (!action) return;
      if (action.type === 'review') {
        startReview();
        return;
      }
      if (action.type === 'part') {
        const blocks = (questionBank[action.part] || []).map((b) => ({ ...b, part: action.part }));
        startSession({
          title: PART_META[action.part].title,
          subtitle: PART_META[action.part].instructions,
          mode: 'targeted',
          blocks,
        });
        return;
      }
      if (action.type === 'pacing') {
        const t = PACING_TARGETS['part' + action.part];
        const blocks = (questionBank[action.part] || []).map((b) => ({ ...b, part: action.part }));
        startSession({
          title: `Pacing Drill — Part ${action.part}`,
          subtitle: `Target: ${t.label}.`,
          mode: 'pacing',
          pacing: true,
          target: t.seconds,
          blocks,
        });
        return;
      }
      if (action.type === 'exam') {
        const map = { full: ALL_PARTS, listening: LISTENING_PARTS, reading: READING_PARTS };
        const parts = map[action.kind] || ALL_PARTS;
        startSession({
          ...buildExam(parts, `${action.kind[0].toUpperCase()}${action.kind.slice(1)} Exam`, '', 'exam'),
          feedbackMode,
          timed,
        });
      }
    },
    [startReview, startSession, feedbackMode, timed]
  );

  const finishSession = useCallback(
    (results) => {
      const enriched = { ...results, sessionTitle: session?.title || 'Practice Session' };
      recordResult(enriched); // persist score + missed questions
      setProgress(loadProgress());
      setLastResults(enriched);
      setView('results');
    },
    [session]
  );

  return (
    <div className="app-shell">
      <Banner onHome={goMenu} />

      <main className="app-main">
        {view === 'menu' && (
          <MainMenu
            feedbackMode={feedbackMode}
            onSetFeedbackMode={setFeedbackMode}
            timed={timed}
            onSetTimed={setTimed}
            onFullExam={() =>
              startSession({
                ...buildExam(
                  ALL_PARTS,
                  'Full Exam — All Parts (1–7)',
                  'A complete Listening & Reading exam. Press Play to hear each listening item, answer every set, then receive your score and a full error review at the end.',
                  'exam'
                ),
                feedbackMode,
                timed,
              })
            }
            onListeningExam={() =>
              startSession({
                ...buildExam(
                  LISTENING_PARTS,
                  'Listening Test — Parts 1–4',
                  'Audio is played aloud in the assigned accent. Listen, then answer.',
                  'exam-listening'
                ),
                feedbackMode,
                timed,
              })
            }
            onReadingExam={() =>
              startSession({
                ...buildExam(
                  READING_PARTS,
                  'Reading Test — Parts 5–7',
                  'Incomplete sentences, text completion, and single/double/triple passages.',
                  'exam-reading'
                ),
                feedbackMode,
                timed,
              })
            }
            onTargeted={() => setView('section')}
            onPacing={() => setView('pacing')}
            onReviewMistakes={startReview}
            onProgress={() => setView('progress')}
            onPlan={() => setView('plan')}
            onVocab={() => setView('vocab')}
            progress={progress}
          />
        )}

        {view === 'plan' && (
          <StudyPlan onBack={goMenu} onAction={startPlanAction} />
        )}

        {view === 'vocab' && <Vocab onBack={goMenu} />}

        {view === 'progress' && (
          <Progress
            progress={progress}
            onBack={goMenu}
            onReview={startReview}
            onCleared={() => setProgress(loadProgress())}
          />
        )}

        {view === 'section' && (
          <SectionSelect
            partMeta={PART_META}
            questionBank={questionBank}
            onBack={goMenu}
            onStart={startSession}
          />
        )}

        {view === 'pacing' && (
          <PacingModule
            partMeta={PART_META}
            questionBank={questionBank}
            onBack={goMenu}
            onStart={startSession}
          />
        )}

        {view === 'quiz' && session && (
          <QuizSession session={session} onExit={goMenu} onComplete={finishSession} />
        )}

        {view === 'results' && lastResults && (
          <Results
            results={lastResults}
            onMenu={goMenu}
            onRetry={() => (session ? setView('quiz') : goMenu())}
          />
        )}
      </main>

      <footer className="app-footer">
        <span>TOEIC Mastery Simulator</span>
        <span className="dot">•</span>
        <span>Listening &amp; Reading · Professional Practice Platform</span>
      </footer>
    </div>
  );
}
