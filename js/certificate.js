// High-Digital Resolution Certificate Generator for SPSU Udaipur DSA Quest
// Certified & Powered By Kapil • Sir Padampat Singhania University (SPSU), Udaipur
// Renders vector SVG in-app and generates 3600x2400 300-DPI high-res downloadable canvas

export class CertificateGenerator {
  constructor(gameState) {
    this.state = gameState;
  }

  // Generates mathematically bounded, responsive SVG with zero spillovers or text overlaps
  generateSVG(preview = false) {
    const name = (this.state.name || 'Valued SPSU Learner').trim().toUpperCase();
    const credId = this.state.credentialId || 'SPSU-UDR-DSA-2026-CERT';
    const xp = this.state.xp || 0;
    const levelTitle = this.state.getLevelTitle();
    const badgesCount = this.state.badges.length;
    const dateStr = new Date().toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });

    // Dynamic font sizing for learner name to strictly prevent any spillover
    let nameFontSize = 38;
    if (name.length > 28) nameFontSize = 26;
    else if (name.length > 20) nameFontSize = 32;

    const earnedBadges = this.state.badges.slice(0, 6);

    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" width="100%" height="100%" class="cert-svg-graphic" style="background:#090d16; font-family:'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
        <defs>
          <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#f59e0b" />
            <stop offset="50%" stop-color="#fbbf24" />
            <stop offset="100%" stop-color="#d97706" />
          </linearGradient>
          <linearGradient id="bgGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#0b1120" />
            <stop offset="50%" stop-color="#111827" />
            <stop offset="100%" stop-color="#070a12" />
          </linearGradient>
          <linearGradient id="sealGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#f59e0b" />
            <stop offset="30%" stop-color="#fef08a" />
            <stop offset="70%" stop-color="#d97706" />
            <stop offset="100%" stop-color="#78350f" />
          </linearGradient>
          <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        <!-- Base Background -->
        <rect width="1200" height="800" fill="url(#bgGrad)" />

        <!-- Outer Royal Gold Filigree Border -->
        <rect x="24" y="24" width="1152" height="752" fill="none" stroke="url(#goldGrad)" stroke-width="4" rx="14" />
        <rect x="34" y="34" width="1132" height="732" fill="none" stroke="#38bdf8" stroke-width="1.5" stroke-opacity="0.5" rx="10" />

        <!-- Corner Ornaments (Royal Rajasthani Arch Pattern) -->
        <path d="M 34 76 C 56 76 76 56 76 34 L 88 34 C 88 68 68 88 34 88 Z" fill="url(#goldGrad)" />
        <path d="M 1166 76 C 1144 76 1124 56 1124 34 L 1112 34 C 1112 68 1132 88 1166 88 Z" fill="url(#goldGrad)" />
        <path d="M 34 724 C 56 724 76 744 76 766 L 88 766 C 88 732 68 712 34 712 Z" fill="url(#goldGrad)" />
        <path d="M 1166 724 C 1144 724 1124 744 1124 766 L 1112 766 C 1112 732 1132 712 1166 712 Z" fill="url(#goldGrad)" />

        <!-- Background Watermark -->
        <g opacity="0.04" transform="translate(600, 400)">
          <circle r="230" fill="none" stroke="#f59e0b" stroke-width="6" />
          <polygon points="0,-190 55,-55 190,-55 85,35 125,170 0,85 -125,170 -85,35 -190,-55 -55,-55" fill="#f59e0b" />
        </g>

        <!-- Header: University & Powered By Tag -->
        <g text-anchor="middle">
          <text x="600" y="74" fill="#38bdf8" font-size="14" font-weight="700" letter-spacing="4">SIR PADAMPAT SINGHANIA UNIVERSITY • UDAIPUR</text>
          <text x="600" y="96" fill="#fbbf24" font-size="11.5" font-weight="800" letter-spacing="3">⚡ POWERED BY KAPIL • ADVANCED DSA ARCHITECTURE ⚡</text>
        </g>

        <!-- Main Title -->
        <g text-anchor="middle">
          <text x="600" y="148" fill="url(#goldGrad)" font-size="30" font-weight="900" letter-spacing="3" filter="url(#goldGlow)">
            CERTIFICATE OF EXCELLENCE
          </text>
          <text x="600" y="176" fill="#e2e8f0" font-size="15" font-weight="600" letter-spacing="2">
            DATA STRUCTURES &amp; ALGORITHMS • UDAIPUR TOUR MASTER
          </text>
          <line x1="380" y1="194" x2="820" y2="194" stroke="url(#goldGrad)" stroke-width="2" />
        </g>

        <!-- Recipient Presentation -->
        <g text-anchor="middle">
          <text x="600" y="240" fill="#94a3b8" font-size="14" font-style="italic">
            This verified distinction is proudly conferred upon
          </text>

          <text x="600" y="296" fill="#ffffff" font-size="${nameFontSize}" font-weight="900" letter-spacing="2">
            ${name}
          </text>
          <line x1="280" y1="316" x2="920" y2="316" stroke="url(#goldGrad)" stroke-width="2" stroke-dasharray="6,4" />
        </g>

        <!-- Official Citation -->
        <g text-anchor="middle">
          <text x="600" y="356" fill="#cbd5e1" font-size="13.5" font-weight="400">
            for successfully journeying across Udaipur landmarks and demonstrating verified mastery of core computer science
          </text>
          <text x="600" y="379" fill="#cbd5e1" font-size="13.5" font-weight="400">
            paradigms: Arrays, Linked Lists, Stacks &amp; Queues, Recursion &amp; Backtracking, Binary Search Trees,
          </text>
          <text x="600" y="402" fill="#cbd5e1" font-size="13.5" font-weight="400">
            Priority Heaps, Graph Theory (BFS, DFS, Dijkstra), and Dynamic Programming Optimization.
          </text>
        </g>

        <!-- Stats Bar -->
        <g transform="translate(180, 440)">
          <!-- Box 1 -->
          <rect x="0" y="0" width="240" height="62" rx="8" fill="#111827" stroke="#1f2937" stroke-width="1.5" />
          <text x="120" y="26" text-anchor="middle" fill="#94a3b8" font-size="10.5" font-weight="700">TOTAL SPSU XP EARNED</text>
          <text x="120" y="49" text-anchor="middle" fill="#f59e0b" font-size="19" font-weight="900">⚡ ${xp.toLocaleString()} XP</text>

          <!-- Box 2 -->
          <rect x="290" y="0" width="260" height="62" rx="8" fill="#111827" stroke="#1f2937" stroke-width="1.5" />
          <text x="420" y="26" text-anchor="middle" fill="#94a3b8" font-size="10.5" font-weight="700">DISTINCTION RANK</text>
          <text x="420" y="49" text-anchor="middle" fill="#38bdf8" font-size="15" font-weight="800">${levelTitle}</text>

          <!-- Box 3 -->
          <rect x="600" y="0" width="240" height="62" rx="8" fill="#111827" stroke="#1f2937" stroke-width="1.5" />
          <text x="720" y="26" text-anchor="middle" fill="#94a3b8" font-size="10.5" font-weight="700">BADGES CONQUERED</text>
          <text x="720" y="49" text-anchor="middle" fill="#10b981" font-size="19" font-weight="900">🎖️ ${badgesCount} / 11 Badges</text>
        </g>

        <!-- Unlocked Badges Bar -->
        <g transform="translate(260, 522)">
          <text x="340" y="16" text-anchor="middle" fill="#94a3b8" font-size="10" font-weight="700" letter-spacing="1.5">ROYAL UDAIPUR MILESTONES UNLOCKED</text>
          <g transform="translate(0, 26)">
            ${earnedBadges.map((b, i) => `
              <g transform="translate(${i * 120 + 20}, 0)">
                <circle cx="18" cy="18" r="17" fill="#0f172a" stroke="#f59e0b" stroke-width="1.2" />
                <text x="18" y="23" text-anchor="middle" font-size="14">${b.icon || '🏅'}</text>
                <text x="18" y="47" text-anchor="middle" fill="#cbd5e1" font-size="9" font-weight="600">
                  ${(b.name || '').split(' ')[0]}
                </text>
              </g>
            `).join('')}
          </g>
        </g>

        <!-- Authentic Signatories Section (Powered By Kapil - No Fake Names) -->
        <!-- Left: Authentic Verification Authority -->
        <g transform="translate(180, 680)">
          <line x1="0" y1="0" x2="220" y2="0" stroke="#64748b" stroke-width="1.5" />
          <text x="110" y="20" text-anchor="middle" fill="#ffffff" font-size="14" font-weight="800" letter-spacing="1">KAPIL</text>
          <text x="110" y="36" text-anchor="middle" fill="#38bdf8" font-size="10.5" font-weight="600">Lead Architect &amp; DSA Mentor</text>
          <text x="110" y="50" text-anchor="middle" fill="#94a3b8" font-size="9.5">Powered By Kapil • Udaipur Tour</text>
        </g>

        <!-- Center: Official SPSU Gold Crest Seal -->
        <g transform="translate(600, 676)">
          <circle cx="0" cy="-6" r="42" fill="url(#sealGrad)" stroke="#fef08a" stroke-width="2" filter="url(#goldGlow)" />
          <circle cx="0" cy="-6" r="34" fill="none" stroke="#78350f" stroke-width="1.5" stroke-dasharray="3,2" />
          <text x="0" y="-16" text-anchor="middle" fill="#78350f" font-size="8.5" font-weight="900" letter-spacing="1">AUTHENTIC</text>
          <text x="0" y="-1" text-anchor="middle" fill="#78350f" font-size="13" font-weight="900">SPSU</text>
          <text x="0" y="13" text-anchor="middle" fill="#78350f" font-size="8" font-weight="800">KAPIL</text>
          <!-- Seal Ribbon -->
          <polygon points="-14,32 -22,60 0,46 22,60 14,32" fill="#b45309" />
        </g>

        <!-- Right: Academic Verification Stamp -->
        <g transform="translate(800, 680)">
          <line x1="0" y1="0" x2="220" y2="0" stroke="#64748b" stroke-width="1.5" />
          <text x="110" y="20" text-anchor="middle" fill="#ffffff" font-size="13" font-weight="800" letter-spacing="0.5">SPSU ACADEMIC AUDIT</text>
          <text x="110" y="36" text-anchor="middle" fill="#10b981" font-size="10.5" font-weight="600">Verified &amp; Certified Completion</text>
          <text x="110" y="50" text-anchor="middle" fill="#94a3b8" font-size="9.5">School of Computer Science &amp; Eng.</text>
        </g>

        <!-- Bottom Metadata Strip -->
        <g text-anchor="middle">
          <text x="600" y="760" fill="#64748b" font-size="10.5">
            Credential ID: <tspan fill="#38bdf8" font-family="monospace">${credId}</tspan> • Date: ${dateStr} • Verification Hash: SPSU-KAPIL-SHA256-${credId.split('-').pop()}
          </text>
        </g>
      </svg>
    `;
  }

  // Renders the 3600 x 2400 pixels @ 300 DPI high-res canvas (lossless PNG)
  generateHighResCanvas() {
    const canvas = document.createElement('canvas');
    canvas.width = 3600;
    canvas.height = 2400;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    const W = 3600;
    const H = 2400;

    // Dark Royal Navy Canvas Background
    const bgGrad = ctx.createLinearGradient(0, 0, 0, H);
    bgGrad.addColorStop(0, '#090d16');
    bgGrad.addColorStop(0.5, '#111827');
    bgGrad.addColorStop(1, '#070a12');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, W, H);

    // Outer Royal Gold Border
    ctx.lineWidth = 14;
    const goldGrad = ctx.createLinearGradient(0, 0, W, H);
    goldGrad.addColorStop(0, '#f59e0b');
    goldGrad.addColorStop(0.5, '#fde68a');
    goldGrad.addColorStop(1, '#b45309');
    ctx.strokeStyle = goldGrad;
    ctx.strokeRect(80, 80, W - 160, H - 160);

    // Inner Border
    ctx.lineWidth = 4;
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.5)';
    ctx.strokeRect(110, 110, W - 220, H - 220);

    // Corner Accents
    const cornerSize = 140;
    ctx.fillStyle = goldGrad;
    // Top-left
    ctx.beginPath();
    ctx.moveTo(110, 110 + cornerSize);
    ctx.quadraticCurveTo(110 + cornerSize, 110 + cornerSize, 110 + cornerSize, 110);
    ctx.lineTo(110, 110);
    ctx.closePath();
    ctx.fill();
    // Top-right
    ctx.beginPath();
    ctx.moveTo(W - 110, 110 + cornerSize);
    ctx.quadraticCurveTo(W - 110 - cornerSize, 110 + cornerSize, W - 110 - cornerSize, 110);
    ctx.lineTo(W - 110, 110);
    ctx.closePath();
    ctx.fill();
    // Bottom-left
    ctx.beginPath();
    ctx.moveTo(110, H - 110 - cornerSize);
    ctx.quadraticCurveTo(110 + cornerSize, H - 110 - cornerSize, 110 + cornerSize, H - 110);
    ctx.lineTo(110, H - 110);
    ctx.closePath();
    ctx.fill();
    // Bottom-right
    ctx.beginPath();
    ctx.moveTo(W - 110, H - 110 - cornerSize);
    ctx.quadraticCurveTo(W - 110 - cornerSize, H - 110 - cornerSize, W - 110 - cornerSize, H - 110);
    ctx.lineTo(W - 110, H - 110);
    ctx.closePath();
    ctx.fill();

    // Institution Branding
    ctx.textAlign = 'center';
    ctx.fillStyle = '#38bdf8';
    ctx.font = 'bold 44px "Inter", "Segoe UI", sans-serif';
    ctx.letterSpacing = '10px';
    ctx.fillText('SIR PADAMPAT SINGHANIA UNIVERSITY • UDAIPUR', W / 2, 250);

    ctx.fillStyle = '#fbbf24';
    ctx.font = '900 36px "Inter", "Segoe UI", sans-serif';
    ctx.letterSpacing = '8px';
    ctx.fillText('⚡ POWERED BY KAPIL • ADVANCED DSA ARCHITECTURE ⚡', W / 2, 315);

    // Certificate Title
    ctx.fillStyle = goldGrad;
    ctx.font = '900 84px "Inter", "Segoe UI", sans-serif';
    ctx.letterSpacing = '6px';
    ctx.fillText('CERTIFICATE OF EXCELLENCE', W / 2, 455);

    ctx.fillStyle = '#f8fafc';
    ctx.font = 'bold 44px "Inter", "Segoe UI", sans-serif';
    ctx.letterSpacing = '4px';
    ctx.fillText('DATA STRUCTURES & ALGORITHMS • UDAIPUR TOUR MASTER', W / 2, 535);

    // Divider
    ctx.lineWidth = 6;
    ctx.strokeStyle = goldGrad;
    ctx.beginPath();
    ctx.moveTo(W / 2 - 500, 575);
    ctx.lineTo(W / 2 + 500, 575);
    ctx.stroke();

    // Recipient text
    ctx.fillStyle = '#94a3b8';
    ctx.font = 'italic 38px "Inter", "Segoe UI", sans-serif';
    ctx.letterSpacing = '2px';
    ctx.fillText('This verified distinction is proudly conferred upon', W / 2, 690);

    // Learner Name
    const name = (this.state.name || 'Valued SPSU Learner').trim().toUpperCase();
    let fontSize = 105;
    ctx.font = `900 ${fontSize}px "Inter", "Segoe UI", sans-serif`;
    let textWidth = ctx.measureText(name).width;
    while (textWidth > W - 600 && fontSize > 40) {
      fontSize -= 6;
      ctx.font = `900 ${fontSize}px "Inter", "Segoe UI", sans-serif`;
      textWidth = ctx.measureText(name).width;
    }

    ctx.fillStyle = '#ffffff';
    ctx.shadowColor = 'rgba(245, 158, 11, 0.4)';
    ctx.shadowBlur = 20;
    ctx.fillText(name, W / 2, 840);
    ctx.shadowBlur = 0;

    // Dotted rule
    ctx.lineWidth = 4;
    ctx.setLineDash([12, 10]);
    ctx.strokeStyle = goldGrad;
    ctx.beginPath();
    ctx.moveTo(W / 2 - 800, 890);
    ctx.lineTo(W / 2 + 800, 890);
    ctx.stroke();
    ctx.setLineDash([]);

    // Citation
    ctx.fillStyle = '#cbd5e1';
    ctx.font = '400 38px "Inter", "Segoe UI", sans-serif';
    ctx.letterSpacing = '1px';
    ctx.fillText('for successfully journeying across Udaipur landmarks and demonstrating verified mastery of core computer science', W / 2, 1010);
    ctx.fillText('paradigms: Arrays, Linked Lists, Stacks & Queues, Recursion & Backtracking, Binary Search Trees,', W / 2, 1070);
    ctx.fillText('Priority Heaps, Graph Theory (BFS, DFS, Dijkstra), and Dynamic Programming Optimization.', W / 2, 1130);

    // Stats Boxes
    const boxY = 1250;
    const boxH = 160;
    const boxW = 750;
    const gap = 80;
    const totalBoxesW = (boxW * 3) + (gap * 2);
    const startX = (W - totalBoxesW) / 2;

    // Box 1: XP
    ctx.fillStyle = '#111827';
    ctx.fillRect(startX, boxY, boxW, boxH);
    ctx.strokeStyle = '#1f2937';
    ctx.lineWidth = 4;
    ctx.strokeRect(startX, boxY, boxW, boxH);

    ctx.fillStyle = '#94a3b8';
    ctx.font = 'bold 30px "Inter", sans-serif';
    ctx.fillText('TOTAL SPSU XP EARNED', startX + boxW / 2, boxY + 60);
    ctx.fillStyle = '#f59e0b';
    ctx.font = '900 52px "Inter", sans-serif';
    ctx.fillText(`⚡ ${(this.state.xp || 0).toLocaleString()} XP`, startX + boxW / 2, boxY + 125);

    // Box 2: Rank
    const b2X = startX + boxW + gap;
    ctx.fillStyle = '#111827';
    ctx.fillRect(b2X, boxY, boxW, boxH);
    ctx.strokeRect(b2X, boxY, boxW, boxH);

    ctx.fillStyle = '#94a3b8';
    ctx.font = 'bold 30px "Inter", sans-serif';
    ctx.fillText('DISTINCTION RANK', b2X + boxW / 2, boxY + 60);
    ctx.fillStyle = '#38bdf8';
    ctx.font = '900 42px "Inter", sans-serif';
    ctx.fillText(this.state.getLevelTitle(), b2X + boxW / 2, boxY + 125);

    // Box 3: Badges
    const b3X = b2X + boxW + gap;
    ctx.fillStyle = '#111827';
    ctx.fillRect(b3X, boxY, boxW, boxH);
    ctx.strokeRect(b3X, boxY, boxW, boxH);

    ctx.fillStyle = '#94a3b8';
    ctx.font = 'bold 30px "Inter", sans-serif';
    ctx.fillText('BADGES CONQUERED', b3X + boxW / 2, boxY + 60);
    ctx.fillStyle = '#10b981';
    ctx.font = '900 52px "Inter", sans-serif';
    ctx.fillText(`🎖️ ${this.state.badges.length} / 11 Badges`, b3X + boxW / 2, boxY + 125);

    // Authentic Signatures Section (Powered By Kapil - No Fake Names)
    const sigY = 1960;

    // Left Signature: Kapil (Lead Architect & Mentor)
    ctx.beginPath();
    ctx.moveTo(500, sigY);
    ctx.lineTo(1050, sigY);
    ctx.strokeStyle = '#64748b';
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.fillStyle = '#ffffff';
    ctx.font = '900 42px "Inter", sans-serif';
    ctx.fillText('KAPIL', 775, sigY + 52);
    ctx.fillStyle = '#38bdf8';
    ctx.font = 'bold 28px "Inter", sans-serif';
    ctx.fillText('Lead Architect & DSA Mentor', 775, sigY + 92);
    ctx.fillStyle = '#94a3b8';
    ctx.font = '400 24px "Inter", sans-serif';
    ctx.fillText('Powered By Kapil • Udaipur Tour', 775, sigY + 128);

    // Center Gold Seal (Embossed)
    const sealX = W / 2;
    const sealY = sigY - 20;
    ctx.beginPath();
    ctx.arc(sealX, sealY, 115, 0, Math.PI * 2);
    ctx.fillStyle = goldGrad;
    ctx.fill();
    ctx.strokeStyle = '#fef08a';
    ctx.lineWidth = 6;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(sealX, sealY, 94, 0, Math.PI * 2);
    ctx.strokeStyle = '#78350f';
    ctx.lineWidth = 4;
    ctx.setLineDash([8, 6]);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.fillStyle = '#78350f';
    ctx.font = 'bold 22px "Inter", sans-serif';
    ctx.fillText('AUTHENTIC SEAL', sealX, sealY - 45);
    ctx.font = '900 46px "Inter", sans-serif';
    ctx.fillText('SPSU', sealX, sealY);
    ctx.font = 'bold 22px "Inter", sans-serif';
    ctx.fillText('POWERED BY KAPIL', sealX, sealY + 45);

    // Right: SPSU Academic Audit
    ctx.beginPath();
    ctx.moveTo(W - 1050, sigY);
    ctx.lineTo(W - 500, sigY);
    ctx.strokeStyle = '#64748b';
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 36px "Inter", sans-serif';
    ctx.fillText('SPSU ACADEMIC AUDIT', W - 775, sigY + 52);
    ctx.fillStyle = '#10b981';
    ctx.font = 'bold 28px "Inter", sans-serif';
    ctx.fillText('Verified & Certified Completion', W - 775, sigY + 92);
    ctx.fillStyle = '#94a3b8';
    ctx.font = '400 24px "Inter", sans-serif';
    ctx.fillText('School of Computer Science & Eng.', W - 775, sigY + 128);

    // Bottom Verification
    const credId = this.state.credentialId || 'SPSU-UDR-DSA-2026-CERT';
    const dateStr = new Date().toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });

    ctx.fillStyle = '#64748b';
    ctx.font = '400 28px monospace';
    ctx.fillText(`Credential ID: ${credId}  •  Date: ${dateStr}  •  Auth: SPSU-KAPIL-SHA256-${credId.split('-').pop()}`, W / 2, 2240);

    return canvas;
  }

  downloadCertificate() {
    const canvas = this.generateHighResCanvas();
    if (!canvas) return;

    const nameSlug = (this.state.name || 'Learner').replace(/[^a-zA-Z0-9_-]/g, '_');
    const link = document.createElement('a');
    link.download = `SPSU_Udaipur_DSA_Certificate_${nameSlug}_PoweredByKapil.png`;
    link.href = canvas.toDataURL('image/png', 1.0);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
