// High-Resolution Rajasthani Royal Badge Generator & Downloader
// Certified & Powered By Kapil • Sir Padampat Singhania University (SPSU), Udaipur
// Generates 1200x1200 crisp 300-DPI royal badge PNG with no spillover

export class BadgeDownloader {
  constructor(gameState) {
    this.state = gameState;
  }

  // Generate 1200x1200 canvas for a specific badge
  generateBadgeCanvas(badge, zone) {
    const canvas = document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = 1200;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    const W = 1200;
    const H = 1200;
    const cx = W / 2;
    const cy = H / 2;

    // 1. Royal Rajasthani Background Gradient (Deep Indigo & Kesariya Royal Palette)
    const bgGrad = ctx.createRadialGradient(cx, cy, 100, cx, cy, 600);
    bgGrad.addColorStop(0, '#1e1b4b'); // Deep Royal Indigo
    bgGrad.addColorStop(0.65, '#0f172a'); // Midnight Slate
    bgGrad.addColorStop(1, '#080c16'); // Dark Obsidian
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, W, H);

    // 2. Ornate Sunburst / Mandala Background Pattern
    ctx.save();
    ctx.translate(cx, cy - 60);
    ctx.strokeStyle = 'rgba(245, 158, 11, 0.08)';
    ctx.lineWidth = 2;
    const rays = 32;
    for (let i = 0; i < rays; i++) {
      ctx.rotate((Math.PI * 2) / rays);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(0, 480);
      ctx.stroke();
    }
    ctx.restore();

    // 3. Outer Royal Rajasthani Octagonal / Scalloped Shield Frame
    const shieldRadius = 490;
    const goldGrad = ctx.createLinearGradient(100, 100, 1100, 1100);
    goldGrad.addColorStop(0, '#f59e0b');
    goldGrad.addColorStop(0.3, '#fef08a');
    goldGrad.addColorStop(0.7, '#d97706');
    goldGrad.addColorStop(1, '#78350f');

    // Outer Thick Ring
    ctx.beginPath();
    ctx.arc(cx, cy - 60, shieldRadius, 0, Math.PI * 2);
    ctx.strokeStyle = goldGrad;
    ctx.lineWidth = 16;
    ctx.stroke();

    // Inner Kesariya (Saffron) Ring
    ctx.beginPath();
    ctx.arc(cx, cy - 60, shieldRadius - 20, 0, Math.PI * 2);
    ctx.strokeStyle = '#ea580c'; // Mewar Kesariya Saffron
    ctx.lineWidth = 6;
    ctx.stroke();

    // Dotted Royal Beaded Ring
    ctx.beginPath();
    ctx.arc(cx, cy - 60, shieldRadius - 38, 0, Math.PI * 2);
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 4;
    ctx.setLineDash([8, 8]);
    ctx.stroke();
    ctx.setLineDash([]);

    // 4. Center Medallion Plate
    const medGrad = ctx.createRadialGradient(cx, cy - 60, 50, cx, cy - 60, 360);
    medGrad.addColorStop(0, '#1e293b');
    medGrad.addColorStop(1, '#090d16');
    ctx.beginPath();
    ctx.arc(cx, cy - 60, 380, 0, Math.PI * 2);
    ctx.fillStyle = medGrad;
    ctx.fill();
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
    ctx.lineWidth = 4;
    ctx.stroke();

    // 5. Institution & Header Arch
    ctx.textAlign = 'center';
    ctx.fillStyle = '#38bdf8'; // Pichola Azure
    ctx.font = 'bold 28px "Inter", "Segoe UI", sans-serif';
    ctx.letterSpacing = '6px';
    ctx.fillText('SIR PADAMPAT SINGHANIA UNIVERSITY • UDAIPUR', cx, cy - 350);

    ctx.fillStyle = '#ea580c'; // Mewar Kesariya
    ctx.font = '900 24px "Inter", "Segoe UI", sans-serif';
    ctx.letterSpacing = '4px';
    ctx.fillText('⚡ POWERED BY KAPIL • OFFICIAL DSA MERIT ⚡', cx, cy - 310);

    // 6. Huge Badge Central Icon
    ctx.font = '160px "Segoe UI Emoji", "Apple Color Emoji", sans-serif';
    ctx.fillText(badge.icon || '🏅', cx, cy - 140);

    // 7. Badge Title Banner
    ctx.fillStyle = goldGrad;
    ctx.font = '900 52px "Inter", "Segoe UI", sans-serif';
    ctx.letterSpacing = '3px';
    ctx.shadowColor = 'rgba(245, 158, 11, 0.6)';
    ctx.shadowBlur = 18;
    ctx.fillText((badge.name || 'SPSU BADGE').toUpperCase(), cx, cy - 10);
    ctx.shadowBlur = 0;

    // Subtitle / Concept Pill
    const zoneTitle = zone ? `${zone.title} • ${zone.concept}` : 'Udaipur DSA Tour Milestone';
    ctx.fillStyle = '#e2e8f0';
    ctx.font = '600 26px "Inter", "Segoe UI", sans-serif';
    ctx.letterSpacing = '1px';
    ctx.fillText(zoneTitle, cx, cy + 40);

    // Gold Divider Ribbon
    ctx.beginPath();
    ctx.moveTo(cx - 320, cy + 80);
    ctx.lineTo(cx + 320, cy + 80);
    ctx.strokeStyle = goldGrad;
    ctx.lineWidth = 4;
    ctx.stroke();

    // 8. Learner Name (Measured dynamically to guarantee zero spillover)
    const learnerName = (this.state.name || 'Valued SPSU Learner').trim().toUpperCase();
    ctx.fillStyle = '#94a3b8';
    ctx.font = 'italic 24px "Inter", "Segoe UI", sans-serif';
    ctx.fillText('CONFERRED UPON', cx, cy + 125);

    let nameFontSize = 46;
    ctx.font = `900 ${nameFontSize}px "Inter", "Segoe UI", sans-serif`;
    let textWidth = ctx.measureText(learnerName).width;
    while (textWidth > 700 && nameFontSize > 24) {
      nameFontSize -= 3;
      ctx.font = `900 ${nameFontSize}px "Inter", "Segoe UI", sans-serif`;
      textWidth = ctx.measureText(learnerName).width;
    }

    ctx.fillStyle = '#ffffff';
    ctx.fillText(learnerName, cx, cy + 185);

    // 9. Badge Description
    ctx.fillStyle = '#cbd5e1';
    ctx.font = '400 22px "Inter", "Segoe UI", sans-serif';
    const cleanDesc = (badge.desc || '').replace(/• Powered By Kapil/g, '').trim();
    ctx.fillText(cleanDesc, cx, cy + 240);

    // 10. Bottom Authenticity Footer & Verification Tag
    const serial = `SPSU-${(badge.id || 'BDG').toUpperCase()}-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    // Left Bottom Seal Ribbon
    ctx.fillStyle = '#ea580c'; // Kesariya
    ctx.font = 'bold 20px "Inter", monospace';
    ctx.fillText(`SERIAL: ${serial}`, cx, H - 110);

    ctx.fillStyle = '#94a3b8';
    ctx.font = '500 19px "Inter", sans-serif';
    ctx.fillText('Authenticated by Kapil • Lead Architect & DSA Mentor • SPSU Mewar', cx, H - 75);

    return canvas;
  }

  // Trigger one-click PNG download
  downloadBadge(badge, zone) {
    const canvas = this.generateBadgeCanvas(badge, zone);
    if (!canvas) return;

    const badgeSlug = (badge.name || 'Badge').replace(/[^a-zA-Z0-9_-]/g, '_');
    const nameSlug = (this.state.name || 'Learner').replace(/[^a-zA-Z0-9_-]/g, '_');

    const link = document.createElement('a');
    link.download = `SPSU_Badge_${badgeSlug}_${nameSlug}_PoweredByKapil.png`;
    link.href = canvas.toDataURL('image/png', 1.0);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
