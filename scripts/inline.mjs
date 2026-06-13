/**
 * Bundles the Vite build into a single self-contained HTML file that runs
 * offline from file:// — ideal for opening directly on a phone.
 *
 * Usage: npm run build && node scripts/inline.mjs
 * Output: dist/toeic-mastery-simulator.html
 */
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const dist = 'dist';
const assets = join(dist, 'assets');
const files = readdirSync(assets);
const jsFile = files.find((f) => f.endsWith('.js'));
const cssFile = files.find((f) => f.endsWith('.css'));

const css = readFileSync(join(assets, cssFile), 'utf8');
// Guard against an accidental "</script>" sequence breaking the inline tag.
const js = readFileSync(join(assets, jsFile), 'utf8').replace(/<\/script>/g, '<\\/script>');

const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
    <meta name="theme-color" content="#0b1c33" />
    <meta
      name="description"
      content="TOEIC Mastery Simulator — high-fidelity TOEIC Listening & Reading practice with professional 3-tier feedback and speed-hack pacing drills."
    />
    <title>TOEIC Mastery Simulator</title>
    <style>${css}</style>
  </head>
  <body>
    <div id="root"></div>
    <script type="module">${js}</script>
  </body>
</html>
`;

const out = join(dist, 'toeic-mastery-simulator.html');
writeFileSync(out, html);
console.log(`Wrote ${out} (${(html.length / 1024).toFixed(0)} KB)`);
