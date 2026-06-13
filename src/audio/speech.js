/**
 * Browser text-to-speech for the Listening section.
 *
 * Real exam audio (ETS recordings) cannot be redistributed, so the simulator
 * speaks each listening script aloud using the device's built-in voices via the
 * Web Speech API (SpeechSynthesis). The designated accent maps to a locale, and
 * two-speaker conversations alternate male/female voices when available.
 */

const LANG_BY_ACCENT = {
  American: 'en-US',
  British: 'en-GB',
  Australian: 'en-AU',
  Canadian: 'en-CA',
};

const FEMALE_HINT =
  /female|woman|samantha|victoria|karen|moira|tessa|fiona|zira|susan|catherine|amelie|serena|google uk english female|google us english female/i;
const MALE_HINT =
  /\bmale\b|man|daniel|alex|fred|david|mark|rishi|oliver|google uk english male|google us english male/i;

export function speechSupported() {
  return typeof window !== 'undefined' && 'speechSynthesis' in window;
}

let voicesCache = [];

export function loadVoices() {
  return new Promise((resolve) => {
    if (!speechSupported()) {
      resolve([]);
      return;
    }
    const existing = window.speechSynthesis.getVoices();
    if (existing.length) {
      voicesCache = existing;
      resolve(existing);
      return;
    }
    const handler = () => {
      voicesCache = window.speechSynthesis.getVoices();
      resolve(voicesCache);
    };
    window.speechSynthesis.onvoiceschanged = handler;
    // Some browsers never fire the event; resolve after a short delay too.
    setTimeout(() => resolve(window.speechSynthesis.getVoices() || []), 600);
  });
}

function accentToLang(accent = 'American') {
  const first = String(accent).split('/')[0].trim();
  return LANG_BY_ACCENT[first] || 'en-US';
}

function pickVoice(voices, lang, gender) {
  if (!voices.length) return null;
  const two = lang.slice(0, 2).toLowerCase();
  const exact = voices.filter((v) => v.lang === lang);
  const sameLang = voices.filter((v) => (v.lang || '').toLowerCase().startsWith(two));
  const pool = exact.length ? exact : sameLang.length ? sameLang : voices;
  if (gender === 'F') {
    const f = pool.find((v) => FEMALE_HINT.test(v.name));
    if (f) return f;
  }
  if (gender === 'M') {
    const m = pool.find((v) => MALE_HINT.test(v.name));
    if (m) return m;
  }
  return pool[0];
}

/**
 * Turns a stimulus into an ordered list of { text, gender } lines.
 * Conversations split on speaker tags (W:/M:); other listening types read
 * line by line with a single narrator.
 */
function scriptToLines(stimulus) {
  const raw = stimulus.audioScript || '';
  const lines = raw
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean);

  if (stimulus.kind === 'conversation') {
    let last = 'M';
    return lines.map((line) => {
      const m = line.match(/^([WMwm])\s*:\s*(.*)$/);
      if (m) {
        last = m[1].toUpperCase();
        return { text: m[2], gender: last };
      }
      return { text: line, gender: last };
    });
  }
  // photo / qr / talk: single narrator
  return lines.map((line) => ({ text: line.replace(/^\([A-E]\)\s*/, (s) => s), gender: 'N' }));
}

/**
 * Creates a speaker bound to one stimulus.
 * @returns {{ play: (onEnd?: () => void) => void, stop: () => void }}
 */
export function createSpeaker(stimulus) {
  const lang = accentToLang(stimulus.accent);
  const secondLang = (() => {
    const parts = String(stimulus.accent || '').split('/');
    return parts[1] ? accentToLang(parts[1].trim()) : lang;
  })();

  function stop() {
    if (speechSupported()) window.speechSynthesis.cancel();
  }

  async function play(onEnd) {
    if (!speechSupported()) {
      onEnd?.();
      return;
    }
    stop();
    const voices = voicesCache.length ? voicesCache : await loadVoices();
    const lines = scriptToLines(stimulus);

    lines.forEach((line, i) => {
      const u = new SpeechSynthesisUtterance(line.text);
      // For two-accent conversations, give the female speaker the second accent.
      const useLang = line.gender === 'F' ? secondLang : lang;
      u.lang = useLang;
      const voice = pickVoice(voices, useLang, line.gender);
      if (voice) u.voice = voice;
      u.rate = 0.96;
      u.pitch = line.gender === 'F' ? 1.05 : line.gender === 'M' ? 0.95 : 1;
      if (i === lines.length - 1) u.onend = () => onEnd?.();
      window.speechSynthesis.speak(u);
    });

    if (lines.length === 0) onEnd?.();
  }

  return { play, stop };
}
