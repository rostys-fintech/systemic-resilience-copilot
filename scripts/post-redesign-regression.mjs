import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const read = p => fs.readFileSync(path.join(ROOT, p), 'utf8');
const mustContain = (text, needle, label) => {
  if (!text.includes(needle)) throw new Error(`missing ${label}: ${needle}`);
};

const html = read('app-v10.html');
const js = read('app-v10.js');
const baseCss = read('app-v10.css');
const polishCss = read('submission-polish.css');
const boundary = read('evidence-boundary.js');
const evidenceUx = read('evidence-ux.js');

// Syntax gates for the presentation-support scripts.
for (const file of ['app-v10.js', 'evidence-boundary.js', 'evidence-ux.js']) {
  execFileSync(process.execPath, ['--check', path.join(ROOT, file)], { stdio: 'pipe' });
}

// Redesign assets must actually be wired into the production page.
mustContain(html, '<link rel="stylesheet" href="/submission-polish.css">', 'submission polish stylesheet link');
mustContain(html, 'A backup exists.', 'redesigned hero');
mustContain(html, 'S5 RED · B2', 'hero / before state');
mustContain(html, 'S6 UNKNOWN', 'after-fix state');
mustContain(html, 'S7 UNKNOWN', 'systemic result');
mustContain(html, 'AI explains.<br>Rules decide.', 'control principle');
mustContain(html, 'Shared recovery resource ≠ proven shortage.', 'systemic guardrail');
mustContain(html, 'When the evidence stops, the inference stops.', 'evidence-discipline close');

// Core DOM controls required by the live click path.
for (const id of ['startBtn','parseBtn','parsedPanel','decisionCard','whyBtn','fixBtn','compareCard','systemicBtn','systemicCard','systemicResult']) {
  mustContain(html, `id="${id}"`, `DOM control ${id}`);
}

// Canonical deterministic path must stay intact after visual changes.
mustContain(js, "if(rec>tol)return d('S5','RED','B2'", 'S5/B2 rule');
mustContain(js, "'R-S5-02','REPAIR_EXECUTION'", 'S5 action');
mustContain(js, "observed_recovery_minutes:45", 'verified execution fix');
mustContain(js, "return d('S6','AMBER_UNKNOWN'", 'S6 next unresolved state');
mustContain(js, '/api/apertus/parse', 'live parse endpoint');
mustContain(js, '/api/apertus/explain', 'live explanation endpoint');
mustContain(js, "p=fallback();parseMode='fallback'", 'safe fallback behavior');

// Re-run hygiene: no stale systemic or AI state may survive a new demo run.
mustContain(boundary, 'const resetSystemic=()=>', 'systemic reset helper');
mustContain(boundary, "['startBtn','parseBtn'].forEach", 'rerun reset binding');
mustContain(boundary, "$('systemicCard')?.classList.add('hidden')", 'systemic card reset');
mustContain(boundary, "$('systemicResult')?.classList.add('hidden')", 'systemic result reset');
mustContain(boundary, "$('aiBox')?.classList.add('hidden')", 'Apertus explanation reset');
mustContain(evidenceUx, "if(parsedPanel.classList.contains('hidden')){main.classList.add('hidden');return;}", 'evidence summary reset');

// Responsive / capture-safety gates.
if (!/@media\s*\(max-width:900px\)/.test(polishCss)) throw new Error('missing tablet/mobile polish breakpoint');
if (!/@media\s*\(max-width:760px\)/.test(baseCss)) throw new Error('missing mobile base breakpoint');
mustContain(polishCss, '@media (prefers-reduced-motion:reduce)', 'reduced-motion capture safety');
mustContain(polishCss, '.flow{position:sticky', 'desktop judge-scan flow');

// Duplicate IDs can silently break click targets after redesigns.
const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map(m => m[1]);
const dupes = [...new Set(ids.filter((id, i) => ids.indexOf(id) !== i))];
if (dupes.length) throw new Error(`duplicate DOM ids: ${dupes.join(', ')}`);

console.log('PASS: post-redesign regression — wiring / canonical S5→S6→S7 path / rerun hygiene / fallback / responsive presentation');
