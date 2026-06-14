/**
 * Illustrations / photos for Part 1 (Photographs).
 *
 * The real exam shows a photograph. To stay legal, real photos are pulled at
 * runtime from Openverse filtered to CC0 / public-domain licenses (with credit
 * shown). If that fails (offline, no result), an original inline-SVG scene is
 * drawn instead — so the single-file offline build always shows something.
 */
import { useEffect, useState } from 'react';

function pickScene(description = '') {
  const d = description.toLowerCase();
  if (/forklift/.test(d)) return 'forklift';
  if (/telephone|phone/.test(d)) return 'phone';
  if (/van|delivery|loading dock/.test(d)) return 'van';
  if (/blueprint|engineer|hard hat|construction|crane/.test(d)) return 'blueprints';
  if (/conference|chart|screen|presentation|projected/.test(d)) return 'meeting';
  if (/caf|terrace|server|coffee/.test(d)) return 'cafe';
  return 'office';
}

// Simple reusable person (head + body) in a flat style.
function Person({ x, y, scale = 1, skin = '#e8b78f', shirt = '#3b6ea5' }) {
  return (
    <g transform={`translate(${x},${y}) scale(${scale})`}>
      <circle cx="0" cy="0" r="7" fill={skin} />
      <path d="M -9 26 Q -9 9 0 9 Q 9 9 9 26 Z" fill={shirt} />
    </g>
  );
}

function Forklift() {
  return (
    <svg viewBox="0 0 320 180" className="p1-svg" role="img" aria-label="Warehouse forklift">
      <rect width="320" height="180" fill="#eef3f8" />
      <rect y="140" width="320" height="40" fill="#cfd8e3" />
      {/* shelving with boxes */}
      <rect x="232" y="40" width="78" height="100" fill="#9fb0c4" />
      <rect x="236" y="46" width="32" height="26" fill="#caa873" />
      <rect x="274" y="46" width="32" height="26" fill="#b8925e" />
      <rect x="236" y="80" width="32" height="26" fill="#b8925e" />
      <rect x="274" y="80" width="32" height="26" fill="#caa873" />
      {/* forklift body */}
      <rect x="70" y="92" width="60" height="34" rx="4" fill="#f2a93b" />
      <rect x="96" y="70" width="30" height="24" fill="#f2a93b" />
      <rect x="100" y="74" width="22" height="16" fill="#bfe0f5" />
      {/* mast */}
      <rect x="132" y="40" width="6" height="90" fill="#6b7785" />
      <rect x="142" y="40" width="6" height="90" fill="#6b7785" />
      {/* forks + pallet with boxes (raised) */}
      <rect x="138" y="64" width="46" height="6" fill="#4b5563" />
      <rect x="150" y="44" width="34" height="20" fill="#caa873" stroke="#8a6a3c" />
      {/* wheels */}
      <circle cx="86" cy="128" r="13" fill="#2b3440" />
      <circle cx="120" cy="128" r="13" fill="#2b3440" />
      {/* worker */}
      <Person x="40" y="104" shirt="#e0683c" />
      <rect x="33" y="96" width="14" height="6" rx="3" fill="#f2c94c" />
    </svg>
  );
}

function Meeting() {
  return (
    <svg viewBox="0 0 320 180" className="p1-svg" role="img" aria-label="Meeting with a chart on screen">
      <rect width="320" height="180" fill="#eef3f8" />
      <rect y="138" width="320" height="42" fill="#d7c9b3" />
      {/* screen with bar chart */}
      <rect x="184" y="24" width="116" height="74" rx="3" fill="#ffffff" stroke="#6b7785" />
      <line x1="196" y1="86" x2="288" y2="86" stroke="#9aa6b2" />
      <rect x="204" y="60" width="14" height="26" fill="#3b6ea5" />
      <rect x="226" y="48" width="14" height="38" fill="#f2a93b" />
      <rect x="248" y="40" width="14" height="46" fill="#2f9e6f" />
      <rect x="270" y="56" width="14" height="30" fill="#3b6ea5" />
      {/* presenter pointing */}
      <Person x="150" y="92" shirt="#2f3e52" />
      <line x1="158" y1="100" x2="186" y2="74" stroke="#2f3e52" strokeWidth="3" strokeLinecap="round" />
      {/* table + seated participants */}
      <ellipse cx="86" cy="138" rx="74" ry="20" fill="#a9794e" />
      <Person x="44" y="104" scale="0.9" shirt="#3b6ea5" />
      <Person x="86" y="100" scale="0.9" shirt="#c0504d" />
      <Person x="128" y="104" scale="0.9" shirt="#2f9e6f" />
    </svg>
  );
}

function Cafe() {
  return (
    <svg viewBox="0 0 320 180" className="p1-svg" role="img" aria-label="Café terrace with a server">
      <rect width="320" height="180" fill="#eaf4ec" />
      <rect y="142" width="320" height="38" fill="#d9c4a3" />
      {/* railing + plants */}
      <rect x="0" y="96" width="320" height="6" fill="#8a6a3c" />
      <circle cx="28" cy="86" r="14" fill="#3f9d5a" />
      <circle cx="292" cy="86" r="14" fill="#3f9d5a" />
      {/* table + cups */}
      <ellipse cx="120" cy="138" rx="56" ry="16" fill="#c9952f" />
      <rect x="118" y="120" width="4" height="20" fill="#a9794e" />
      <rect x="96" y="120" width="14" height="10" rx="2" fill="#fff" stroke="#a9794e" />
      <rect x="132" y="120" width="14" height="10" rx="2" fill="#fff" stroke="#a9794e" />
      {/* two seated guests */}
      <Person x="74" y="104" scale="0.9" shirt="#3b6ea5" />
      <Person x="166" y="104" scale="0.9" shirt="#c0504d" />
      {/* server with apron + tray */}
      <Person x="232" y="100" shirt="#2f3e52" />
      <rect x="226" y="116" width="12" height="14" fill="#ffffff" />
      <rect x="240" y="104" width="20" height="4" rx="2" fill="#9aa6b2" />
    </svg>
  );
}

function Blueprints() {
  return (
    <svg viewBox="0 0 320 180" className="p1-svg" role="img" aria-label="Engineers reviewing blueprints at a construction site">
      <rect width="320" height="180" fill="#eef3f8" />
      <rect y="140" width="320" height="40" fill="#cdb89a" />
      {/* crane + building */}
      <rect x="250" y="40" width="40" height="100" fill="#b8c2cf" />
      <rect x="210" y="30" width="6" height="110" fill="#6b7785" />
      <rect x="210" y="30" width="70" height="6" fill="#6b7785" />
      <line x1="270" y1="36" x2="270" y2="58" stroke="#4b5563" strokeWidth="2" />
      <rect x="262" y="58" width="16" height="12" fill="#caa873" />
      {/* table with blueprint */}
      <rect x="64" y="108" width="120" height="14" fill="#a9794e" />
      <g transform="rotate(-6 124 104)">
        <rect x="74" y="86" width="100" height="24" fill="#2f6fb0" />
        <line x1="84" y1="92" x2="164" y2="92" stroke="#bcd6ef" />
        <line x1="84" y1="98" x2="164" y2="98" stroke="#bcd6ef" />
        <line x1="104" y1="86" x2="104" y2="110" stroke="#bcd6ef" />
        <line x1="134" y1="86" x2="134" y2="110" stroke="#bcd6ef" />
      </g>
      {/* two engineers with hard hats */}
      <Person x="44" y="100" shirt="#e0683c" />
      <rect x="37" y="92" width="14" height="6" rx="3" fill="#f2c94c" />
      <Person x="196" y="100" shirt="#e0683c" />
      <rect x="189" y="92" width="14" height="6" rx="3" fill="#f2c94c" />
    </svg>
  );
}

function Phone() {
  return (
    <svg viewBox="0 0 320 180" className="p1-svg" role="img" aria-label="Woman on the telephone at an office desk">
      <rect width="320" height="180" fill="#eef3f8" />
      <rect y="150" width="320" height="30" fill="#cfd8e3" />
      {/* desk */}
      <rect x="150" y="116" width="150" height="12" fill="#a9794e" />
      {/* laptop */}
      <rect x="232" y="98" width="40" height="20" fill="#3a4654" />
      <rect x="236" y="100" width="32" height="14" fill="#bfe0f5" />
      {/* mug */}
      <rect x="206" y="104" width="14" height="12" rx="2" fill="#e0683c" />
      {/* person seated with phone to ear */}
      <Person x="120" y="92" scale="1.3" skin="#e8b78f" shirt="#7a4ea3" />
      <line x1="132" y1="92" x2="146" y2="100" stroke="#7a4ea3" strokeWidth="4" strokeLinecap="round" />
      {/* phone handset */}
      <rect x="112" y="84" width="6" height="18" rx="3" fill="#2b3440" transform="rotate(-25 115 93)" />
      {/* document in hand */}
      <rect x="150" y="104" width="16" height="12" fill="#ffffff" stroke="#9aa6b2" />
    </svg>
  );
}

function Van() {
  return (
    <svg viewBox="0 0 320 180" className="p1-svg" role="img" aria-label="Workers loading boxes into a delivery van">
      <rect width="320" height="180" fill="#eef3f8" />
      <rect y="138" width="320" height="42" fill="#9aa6b2" />
      {/* van */}
      <rect x="150" y="64" width="120" height="64" rx="6" fill="#d8542e" />
      <rect x="150" y="64" width="120" height="64" rx="6" fill="none" stroke="#a83c1e" />
      <line x1="210" y1="64" x2="210" y2="128" stroke="#a83c1e" strokeWidth="2" />
      <rect x="156" y="74" width="48" height="48" fill="#caa873" stroke="#8a6a3c" />
      <circle cx="180" cy="138" r="14" fill="#2b3440" />
      <circle cx="246" cy="138" r="14" fill="#2b3440" />
      {/* trolley with boxes */}
      <rect x="60" y="96" width="40" height="30" fill="#b8925e" stroke="#8a6a3c" />
      <rect x="60" y="84" width="40" height="14" fill="#caa873" stroke="#8a6a3c" />
      <line x1="58" y1="84" x2="58" y2="132" stroke="#4b5563" strokeWidth="3" />
      <circle cx="62" cy="134" r="6" fill="#2b3440" />
      {/* two workers */}
      <Person x="40" y="100" shirt="#2f6fb0" />
      <Person x="120" y="100" shirt="#2f6fb0" />
    </svg>
  );
}

const SCENES = {
  forklift: Forklift,
  meeting: Meeting,
  cafe: Cafe,
  blueprints: Blueprints,
  phone: Phone,
  van: Van,
  office: Phone,
};

// Search terms per scene: a specific query plus a broader fallback, so most
// scenes return a real photo instead of falling back to the illustration.
const SCENE_QUERY = {
  forklift: ['warehouse forklift boxes', 'warehouse'],
  meeting: ['business presentation meeting', 'business people office'],
  cafe: ['cafe coffee people', 'coffee shop'],
  blueprints: ['construction engineers site', 'construction site'],
  phone: ['businesswoman office telephone', 'office desk'],
  van: ['delivery van', 'delivery truck'],
  office: ['office worker desk', 'office'],
};

function licenseLabel(code) {
  const c = (code || '').toLowerCase();
  if (c === 'cc0') return 'CC0';
  if (c === 'pdm') return 'Public Domain';
  return 'CC ' + c.toUpperCase();
}

async function fetchOpenversePhoto(query, signal) {
  // cc0,pdm → no attribution required; by (CC BY) → free to use with credit,
  // which we always display. All allow commercial use and modification.
  const url =
    'https://api.openverse.org/v1/images/?q=' +
    encodeURIComponent(query) +
    '&license=cc0,pdm,by&category=photograph&page_size=12';
  const res = await fetch(url, { signal, headers: { Accept: 'application/json' } });
  if (!res.ok) throw new Error('openverse request failed');
  const data = await res.json();
  const hit = (data.results || []).find((r) => r.url);
  if (!hit) throw new Error('no openly-licensed result');
  return {
    url: hit.url,
    title: hit.title || 'Untitled',
    license: hit.license || 'cc0',
    licenseUrl: hit.license_url || 'https://creativecommons.org/publicdomain/zero/1.0/',
    landing: hit.foreign_landing_url || hit.url,
    creator: hit.creator || null,
  };
}

export default function Part1Photo({ description }) {
  const scene = pickScene(description);
  const Scene = SCENES[scene] || Phone;
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    let active = true;
    const ctrl = new AbortController();
    const timeout = setTimeout(() => ctrl.abort(), 9000);
    const queries = SCENE_QUERY[scene] || [description];
    (async () => {
      for (const q of queries) {
        try {
          const p = await fetchOpenversePhoto(q, ctrl.signal);
          if (active) setPhoto(p);
          return;
        } catch {
          /* try the next (broader) query */
        }
      }
      // every query failed → keep the SVG illustration
    })().finally(() => clearTimeout(timeout));
    return () => {
      active = false;
      ctrl.abort();
      clearTimeout(timeout);
    };
  }, [scene, description]);

  return (
    <figure className="p1-photo">
      {photo ? (
        <img
          className="p1-img"
          src={photo.url}
          alt={description}
          loading="lazy"
          onError={() => setPhoto(null)}
        />
      ) : (
        <Scene />
      )}
      <figcaption className="p1-caption">
        {description}
        {photo && (
          <span className="p1-credit">
            {' '}— Photo:{' '}
            <a href={photo.landing} target="_blank" rel="noreferrer">
              {photo.title}
            </a>
            {photo.creator ? ` by ${photo.creator}` : ''} ·{' '}
            <a href={photo.licenseUrl} target="_blank" rel="noreferrer">
              {licenseLabel(photo.license)}
            </a>{' '}
            via Openverse
          </span>
        )}
      </figcaption>
    </figure>
  );
}
