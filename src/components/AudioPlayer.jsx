import { useEffect, useRef, useState } from 'react';
import { createSpeaker, speechSupported } from '../audio/speech.js';
import Part1Photo from './Part1Photo.jsx';

/**
 * Plays a listening stimulus aloud (device voice, assigned accent). The
 * transcript is hidden by default — as on the real exam you listen, then
 * answer — with an optional reveal for study.
 */
export default function AudioPlayer({ stimulus, onPlayed }) {
  const [playing, setPlaying] = useState(false);
  const [played, setPlayed] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);
  const speakerRef = useRef(null);
  const supported = speechSupported();

  // Rebuild the speaker whenever the stimulus changes; stop audio on unmount.
  useEffect(() => {
    speakerRef.current = createSpeaker(stimulus);
    // If the device has no TTS, reveal answer choices immediately (the
    // transcript is shown instead, so there is nothing to "play first").
    if (!supported) onPlayed?.();
    return () => {
      speakerRef.current?.stop();
      setPlaying(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stimulus]);

  function play() {
    if (!speakerRef.current) return;
    setPlaying(true);
    setPlayed(true);
    onPlayed?.();
    speakerRef.current.play(() => setPlaying(false));
  }

  function stop() {
    speakerRef.current?.stop();
    setPlaying(false);
  }

  const accent = stimulus.accent || 'American';

  return (
    <div className="audio-player">
      <div className="audio-head">
        <span className="audio-label">🎧 [AUDIO · ACCENT: {accent}]</span>
        {supported ? (
          <div className="audio-controls">
            {!playing ? (
              <button className="btn-mini btn-play" onClick={play}>
                {played ? '🔁 Replay' : '▶ Play audio'}
              </button>
            ) : (
              <button className="btn-mini" onClick={stop}>
                ⏹ Stop
              </button>
            )}
            <button
              className="btn-mini"
              onClick={() => setShowTranscript((s) => !s)}
              title="The real exam plays the audio once with no transcript."
            >
              {showTranscript ? 'Hide transcript' : 'Show transcript'}
            </button>
          </div>
        ) : (
          <span className="audio-fallback-note">
            Audio voice unavailable on this device — transcript shown below.
          </span>
        )}
      </div>

      {/* Part 1: original illustration of the scene (no copyrighted photo). */}
      {stimulus.kind === 'photo' && <Part1Photo description={stimulus.photoDescription} />}

      {playing && <div className="audio-playing">▶ Playing… listen, then answer below.</div>}

      {(showTranscript || !supported) && (
        <pre className="audio-script">{stimulus.audioScript}</pre>
      )}

      {!showTranscript && supported && (
        <p className="audio-hint">
          Press <strong>Play</strong> and listen. Answer from memory — reveal the transcript only
          to review.
        </p>
      )}
    </div>
  );
}
