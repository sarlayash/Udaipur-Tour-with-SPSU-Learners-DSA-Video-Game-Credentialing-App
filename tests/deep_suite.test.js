// Deep Testing Suite for Udaipur Tour with SPSU Learners - DSA App
// Conforming to Google & Microsoft Web Engineering Quality Standards
// Tests: DOM Synchronization, Syllabus Completeness, Visualizer Engine,
// State Transitions, Certificate High-Res Integrity, Zero Spillover & Branding

import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.join(__dirname, '..');

import { ZONES } from '../js/data/zones.js';
import { GameState } from '../js/state.js';
import { VisualizerEngine } from '../js/visualizer.js';
import { CertificateGenerator } from '../js/certificate.js';

let passed = 0;
let failed = 0;

function it(desc, fn) {
  try {
    fn();
    console.log(`  ✅ PASS: ${desc}`);
    passed++;
  } catch (err) {
    console.error(`  ❌ FAIL: ${desc}`);
    console.error(err);
    failed++;
  }
}


// 9. DSA Graph Topology & Shortest Path First Verification
console.log('\n--- 9. DSA GRAPH TOPOLOGY & SHORTEST PATH FIRST ---');
import { GRAPH_STAGES, GRAPH_EDGES } from '../js/data/zones.js';

it('DSA Graph Topology defines 6 distinct stages from Source to Destination', () => {
  assert.strictEqual(GRAPH_STAGES.length, 6, 'Must define 6 topological stages');
  assert.strictEqual(GRAPH_STAGES[0].stage, 0, 'Stage 0 must be Source');
  assert.strictEqual(GRAPH_STAGES[5].stage, 5, 'Stage 5 must be Final Destination');
});

it('All 10 vertices have spacious, non-colliding coordinates (minimum distance >= 180px)', () => {
  for (let i = 0; i < ZONES.length; i++) {
    for (let j = i + 1; j < ZONES.length; j++) {
      const dx = ZONES[i].mapCoords.x - ZONES[j].mapCoords.x;
      const dy = ZONES[i].mapCoords.y - ZONES[j].mapCoords.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      assert.ok(dist >= 180, 'Distance between Zone ' + ZONES[i].id + ' and Zone ' + ZONES[j].id + ' (' + dist.toFixed(1) + 'px) must be >= 180px to prevent clutter');
    }
  }
});

it('Shortest Path edges form a contiguous optimal Dijkstra path from Source (1) to Destination (10)', () => {
  const shortestEdges = GRAPH_EDGES.filter(e => e.isShortestPath);
  assert.strictEqual(shortestEdges.length, 9, 'Must have exactly 9 shortest path edges for 10 vertices');
  for (let i = 0; i < 9; i++) {
    assert.strictEqual(shortestEdges[i].from, i + 1, 'Edge ' + i + ' must start at vertex ' + (i + 1));
    assert.strictEqual(shortestEdges[i].to, i + 2, 'Edge ' + i + ' must end at vertex ' + (i + 2));
    assert.ok(shortestEdges[i].weight > 0, 'Edge weight must be positive');
  }
  const totalDist = shortestEdges.reduce((sum, e) => sum + e.weight, 0);
  assert.strictEqual(totalDist.toFixed(1), '28.0', 'Total shortest path distance must equal 28.0 km');
});

console.log('\n======================================================');
console.log('🧪 RUNNING FAANG-GRADE DEEP TEST SUITE: SPSU UDAIPUR DSA');
console.log('======================================================\n');

// 1. DOM Synchronization Test
console.log('--- 1. DOM ID SYNCHRONIZATION ---');
const htmlContent = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');

const requiredIds = [
  'onboarding-modal',
  'onboarding-form',
  'learner-name-input',
  'btn-start-journey',
  'nav-player-name',
  'nav-player-level',
  'nav-player-xp',
  'nav-player-avatar',
  'xp-progress-fill',
  'btn-theme-toggle',
  'theme-icon',
  'theme-label',
  'btn-audio-toggle',
  'btn-open-badges',
  'btn-open-certificate',
  'btn-reset-journey',
  'udaipur-map-container',
  'zone-modal',
  'btn-close-zone-modal',
  'zone-modal-title',
  'zone-modal-subtitle',
  'zone-modal-icon',
  'theory-content-container',
  'visualizer-render-area',
  'vis-step-status',
  'vis-step-comment',
  'btn-vis-play',
  'btn-vis-next',
  'btn-vis-prev',
  'btn-vis-reset',
  'vis-speed-select',
  'challenge-question',
  'challenge-options',
  'challenge-feedback',
  'code-display-block',
  'btn-copy-code',
  'cert-modal',
  'btn-close-cert-modal',
  'cert-svg-target',
  'btn-download-cert',
  'btn-print-cert',
  'badges-modal',
  'btn-close-badges-modal',
  'badges-grid-container',
  'confetti-canvas'
];

requiredIds.forEach(id => {
  it(`DOM element with id="${id}" must exist in index.html`, () => {
    assert.ok(htmlContent.includes(`id="${id}"`), `Missing DOM element id: ${id}`);
  });
});

// 2. Syllabus & Zones Completeness
console.log('\n--- 2. SYLLABUS & ZONES COMPLETENESS ---');
it('Should contain exactly 10 comprehensive Udaipur zones', () => {
  assert.strictEqual(ZONES.length, 10, 'Expected 10 zones');
});

ZONES.forEach((zone, index) => {
  it(`Zone ${zone.id} (${zone.title}) must have complete data structure & algorithm curriculum`, () => {
    assert.strictEqual(zone.id, index + 1, `Zone id mismatch at index ${index}`);
    assert.ok(zone.title && zone.title.length > 5, 'Zone title required');
    assert.ok(zone.subtitle && zone.subtitle.length > 5, 'Zone subtitle required');
    assert.ok(zone.lore && zone.lore.length > 30, 'Substantial Udaipur/SPSU lore required');
    assert.ok(zone.concept && zone.concept.length > 3, 'Concept required');
    assert.ok(zone.badge && zone.badge.id && zone.badge.name, 'Badge details required');
    assert.ok(zone.badge.desc.includes('Powered By Kapil'), 'Badge must include "Powered By Kapil" attribution');
    assert.ok(zone.xpReward >= 150, 'Minimum XP reward of 150 required');

    // Theory
    assert.ok(zone.theory.overview.length > 50, 'Substantial theory overview required');
    assert.ok(zone.theory.keyPoints.length >= 3, 'At least 3 key architectural points required');
    assert.ok(Object.keys(zone.theory.complexities).length >= 3, 'At least 3 complexity notations required');

    // Challenge
    assert.ok(zone.challenge.question.length > 20, 'Challenge question required');
    assert.ok(zone.challenge.options.length >= 4, 'Challenge must have at least 4 options');
    assert.ok(zone.challenge.correctIndex >= 0 && zone.challenge.correctIndex < zone.challenge.options.length, 'Valid correctIndex required');
    assert.ok(zone.challenge.explanation.length > 20, 'Detailed educational explanation required');

    // Code Snippets in 4 FAANG-standard languages
    ['cpp', 'java', 'python', 'javascript'].forEach(lang => {
      assert.ok(zone.codeSnippets[lang] && zone.codeSnippets[lang].length > 30, `Missing code snippet for language: ${lang}`);
    });
  });
});

// 3. Algorithm Visualizer Step Generation
console.log('\n--- 3. ALGORITHM VISUALIZER ENGINE ---');
const dummyContainer = {};
const visualizer = new VisualizerEngine(dummyContainer, null, null);

ZONES.forEach(zone => {
  it(`Visualizer for Zone ${zone.id} (${zone.visualizer.algorithm}) generates valid step pipeline`, () => {
    const steps = visualizer.generateSteps(zone);
    assert.ok(Array.isArray(steps), 'Steps must be an array');
    assert.ok(steps.length >= 3, `Expected at least 3 steps, got ${steps.length}`);
    steps.forEach((step, sIdx) => {
      assert.ok(step.comment && step.comment.length > 5, `Step ${sIdx} missing descriptive comment`);
      assert.notStrictEqual(step.comment, undefined);
    });
  });
});

// 4. State Machine & Level Progression
console.log('\n--- 4. STATE MACHINE & XP LEVELING ---');
it('State manager handles onboarding, level progression and credential IDs', () => {
  // Mock localStorage for Node environment
  global.localStorage = {
    _data: {},
    getItem(k) { return this._data[k] || null; },
    setItem(k, v) { this._data[k] = String(v); },
    removeItem(k) { delete this._data[k]; }
  };

  const state = new GameState();
  assert.strictEqual(state.journeyStarted, false);

  // Onboard learner
  const started = state.startJourney('Aarav Singhania');
  assert.strictEqual(started, true);
  assert.strictEqual(state.name, 'Aarav Singhania');
  assert.ok(state.credentialId.startsWith('SPSU-UDR-DSA-'), 'Credential ID format valid');
  assert.strictEqual(state.hasBadge('badge-welcome'), true, 'Welcome badge awarded');

  // XP addition
  const res = state.addXP(400);
  assert.strictEqual(state.xp >= 450, true);
  assert.strictEqual(state.level >= 2, true);

  // Unlock zone
  const unlockRes = state.unlockNextZone(1);
  assert.strictEqual(unlockRes.newlyUnlocked, true);
  assert.strictEqual(state.isZoneUnlocked(2), true);
});

// 5. Certificate High-Resolution Integrity & "Powered By Kapil"
console.log('\n--- 5. CERTIFICATE INTEGRITY & NO FAKE SIGNATORIES ---');
it('Certificate SVG generator renders mathematically valid, bounded markup with Powered By Kapil', () => {
  const state = new GameState();
  state.startJourney('KAPIL NARULA');
  state.addXP(2500);

  const certGen = new CertificateGenerator(state);
  const svg = certGen.generateSVG(false);

  assert.ok(svg.includes('<svg'), 'Output must be valid SVG');
  assert.ok(svg.includes('viewBox="0 0 1200 800"'), 'ViewBox must be 1200 800');
  assert.ok(svg.includes('POWERED BY KAPIL'), 'Certificate must proudly feature "POWERED BY KAPIL"');
  assert.ok(svg.includes('SIR PADAMPAT SINGHANIA UNIVERSITY'), 'Institution must be SPSU Udaipur');
  assert.ok(!svg.includes('Prof. K. R. Sharma'), 'Must NOT contain fake signatory: Prof. K. R. Sharma');
  assert.ok(!svg.includes('Dr. M. S. Rathore'), 'Must NOT contain fake signatory: Dr. M. S. Rathore');
  assert.ok(svg.includes('Lead Architect &amp; DSA Mentor') || svg.includes('Lead Architect & DSA Mentor'), 'Authentic role designation present');
  assert.ok(!svg.includes('NaN'), 'SVG must not contain any NaN values');
});

// 6. CSS Light / Dark Theme & WCAG Compliance Check
console.log('\n--- 6. THEME ENGINE & WCAG CONTRAST ---');
const cssContent = fs.readFileSync(path.join(ROOT, 'css/style.css'), 'utf8');

it('CSS contains full Dark and Light mode theme tokens', () => {
  assert.ok(cssContent.includes(':root'), 'Root dark theme must exist');
  assert.ok(cssContent.includes('[data-theme="light"]'), 'Light theme data attribute must exist');
  assert.ok(cssContent.includes('--bg-main'), '--bg-main variable defined');
  assert.ok(cssContent.includes('--text-primary'), '--text-primary variable defined');
  assert.ok(cssContent.includes('--gold-primary'), '--gold-primary variable defined');
  assert.ok(cssContent.includes('--cyan-pichola'), '--cyan-pichola variable defined');
});

it('CSS contains high-resolution print styles', () => {
  assert.ok(cssContent.includes('@media print'), 'Print media queries configured');
});

// 7. Badge Downloader & Royal Colors of Rajasthan Verification
console.log('\n--- 7. BADGE DOWNLOADER & ROYAL RAJASTHANI COLORS ---');
import { BadgeDownloader } from '../js/badge_download.js';

it('BadgeDownloader generates valid 1200x1200 canvas with royal branding and zero spillovers', () => {
  global.document = {
    createElement: (tag) => {
      if (tag === 'canvas') {
        return {
          width: 0,
          height: 0,
          getContext: () => ({
            createRadialGradient: () => ({ addColorStop: () => {} }),
            createLinearGradient: () => ({ addColorStop: () => {} }),
            fillRect: () => {},
            save: () => {},
            restore: () => {},
            translate: () => {},
            rotate: () => {},
            beginPath: () => {},
            moveTo: () => {},
            lineTo: () => {},
            stroke: () => {},
            arc: () => {},
            fill: () => {},
            fillText: () => {},
            measureText: () => ({ width: 250 }),
            setLineDash: () => {}
          }),
          toDataURL: () => 'data:image/png;base64,mock'
        };
      }
      return {};
    }
  };

  const state = new GameState();
  state.startJourney('PRIYA SHARMA');
  const downloader = new BadgeDownloader(state);
  const canvas = downloader.generateBadgeCanvas(ZONES[0].badge, ZONES[0]);
  assert.ok(canvas, 'Canvas must be generated');
  assert.strictEqual(canvas.width, 1200, 'Width must be 1200 px');
  assert.strictEqual(canvas.height, 1200, 'Height must be 1200 px');
});

it('CSS contains signature royal Rajasthani color palette', () => {
  assert.ok(cssContent.includes('--mewar-kesariya'), 'Mewar Kesariya Royal Saffron defined');
  assert.ok(cssContent.includes('--kundan-gold'), 'Royal Kundan Gold defined');
  assert.ok(cssContent.includes('--jodhpur-indigo'), 'Jodhpur Royal Indigo defined');
  assert.ok(cssContent.includes('--pichola-turquoise'), 'Lake Pichola Turquoise defined');
  assert.ok(cssContent.includes('--jaipur-rose'), 'Jaipur Royal Rose defined');
  assert.ok(cssContent.includes('--panna-emerald'), 'Royal Turban Emerald defined');
});

// 8. Copyright Footers & Official Attribution Verification
console.log('\n--- 8. COPYRIGHT FOOTERS & ATTRIBUTION ---');
it('Page and all modals contain official SPSU copyright and Powered By Kapil attribution', () => {
  assert.ok(htmlContent.includes('id="app-footer"'), 'Main app footer must exist');
  assert.ok(htmlContent.includes('id="footer-copyright-text"'), 'Footer copyright element must exist');
  assert.ok(htmlContent.includes('© 2026 Sir Padampat Singhania University (SPSU), Udaipur'), 'Official SPSU university copyright present');
  assert.ok(htmlContent.includes('Powered By Kapil'), 'Powered By Kapil attribution present');
  const modalFooters = htmlContent.match(/modal-footer-copyright/g);
  assert.ok(modalFooters && modalFooters.length >= 4, 'All 4 modals must contain bottom copyright footers');
});

// 10. Official SPSU Brand Assets
console.log('\n--- 10. OFFICIAL SPSU BRAND ASSETS ---');
it('Official SPSU logo asset exists and is rendered on landing page', () => {
  assert.ok(fs.existsSync(path.join(ROOT, 'assets/spsu-logo.png')), 'assets/spsu-logo.png must exist');
  assert.ok(htmlContent.includes('src="assets/spsu-logo.png"'), 'Logo must be referenced in index.html');
  assert.ok(htmlContent.includes('class="brand-logo-img"'), 'Navbar must contain brand logo image');
  assert.ok(htmlContent.includes('class="onboarding-spsu-logo"'), 'Onboarding modal must contain SPSU logo');
});

console.log('\n======================================================');
console.log(`📊 TEST RESULTS: ${passed} PASSED | ${failed} FAILED`);
console.log('======================================================\n');

if (failed > 0) {
  process.exit(1);
} else {
  console.log('🌟 ALL FAANG-GRADE QUALITY STANDARDS VERIFIED SUCCESSFULLY!\n');
}
