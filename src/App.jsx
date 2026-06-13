import { useState, useCallback } from 'react';
import Banner from './components/Banner.jsx';
import MainMenu from './components/MainMenu.jsx';
import SectionSelect from './components/SectionSelect.jsx';
import PacingModule from './components/PacingModule.jsx';
import QuizSession from './components/QuizSession.jsx';
import Results from './components/Results.jsx';
import AISettings from './components/AISettings.jsx';
import { questionBank, PART_META, DIAGNOSTIC_BLUEPRINT } from './data/questionBank.js';

/**
 * Top-level state machine for the TOEIC Mastery Simulator.
 *
 * Views: 'menu' → 'section' | 'pacing' → 'quiz' → 'results'
 * A "session" is { title, subtitle, mode, pacing?, target?, blocks: [...] }
 * where each block carries a `part` field so the quiz can render the correct
 * stimulus and feedback.
 */

function tagBlocksWithPart(blocks, part) {
  return blocks.map((block) => ({ ...block, part }));
}

function buildDiagnosticSession() {
  const blocks = [];
  for (const { part, blocks: n } of DIAGNOSTIC_BLUEPRINT) {
    const available = questionBank[part] || [];
    blocks.push(...tagBlocksWithPart(available.slice(0, n), part));
  }
  return {
    title: 'Full Simulation Diagnostic',
    subtitle:
      'A representative cross-section of all seven TOEIC parts. Pace yourself, submit each set, then study the 3-tier feedback.',
    mode: 'diagnostic',
    blocks,
  };
}

export default function App() {
  const [view, setView] = useState('menu');
  const [session, setSession] = useState(null);
  const [lastResults, setLastResults] = useState(null);
  const [aiSettingsOpen, setAiSettingsOpen] = useState(false);

  // AI Mode configuration (kept in memory; optionally persisted by AISettings).
  const [aiConfig, setAiConfig] = useState(() => ({
    enabled: false,
    apiKey: typeof localStorage !== 'undefined' ? localStorage.getItem('toeic_ai_key') || '' : '',
    model:
      (typeof localStorage !== 'undefined' && localStorage.getItem('toeic_ai_model')) ||
      'claude-opus-4-8',
  }));

  const goMenu = useCallback(() => {
    setView('menu');
    setSession(null);
  }, []);

  const startSession = useCallback((built) => {
    setSession(built);
    setView('quiz');
  }, []);

  const finishSession = useCallback(
    (results) => {
      setLastResults({ ...results, sessionTitle: session?.title || 'Practice Session' });
      setView('results');
    },
    [session]
  );

  return (
    <div className="app-shell">
      <Banner
        onHome={goMenu}
        onOpenAi={() => setAiSettingsOpen(true)}
        aiEnabled={aiConfig.enabled}
      />

      <main className="app-main">
        {view === 'menu' && (
          <MainMenu
            onFullDiagnostic={() => startSession(buildDiagnosticSession())}
            onTargeted={() => setView('section')}
            onPacing={() => setView('pacing')}
            aiEnabled={aiConfig.enabled}
            onOpenAi={() => setAiSettingsOpen(true)}
          />
        )}

        {view === 'section' && (
          <SectionSelect
            partMeta={PART_META}
            questionBank={questionBank}
            aiConfig={aiConfig}
            onBack={goMenu}
            onStart={startSession}
          />
        )}

        {view === 'pacing' && (
          <PacingModule
            partMeta={PART_META}
            questionBank={questionBank}
            aiConfig={aiConfig}
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
            onRetry={() => {
              if (session) {
                setView('quiz');
              } else {
                goMenu();
              }
            }}
          />
        )}
      </main>

      {aiSettingsOpen && (
        <AISettings
          config={aiConfig}
          onClose={() => setAiSettingsOpen(false)}
          onSave={(next) => {
            setAiConfig(next);
            if (typeof localStorage !== 'undefined') {
              if (next.apiKey) localStorage.setItem('toeic_ai_key', next.apiKey);
              else localStorage.removeItem('toeic_ai_key');
              localStorage.setItem('toeic_ai_model', next.model);
            }
            setAiSettingsOpen(false);
          }}
        />
      )}

      <footer className="app-footer">
        <span>TOEIC Mastery Simulator</span>
        <span className="dot">•</span>
        <span>Listening &amp; Reading · Professional Practice Platform</span>
      </footer>
    </div>
  );
}
