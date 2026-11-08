// Udaipur Tour with SPSU Learners - Main Video Game Engine
// Powered By Kapil • Sir Padampat Singhania University (SPSU)
import { ZONES, GRAPH_EDGES, GRAPH_STAGES } from './data/zones.js';
import { gameState } from './state.js';
import { sound } from './audio.js';
import { VisualizerEngine } from './visualizer.js';
import { CertificateGenerator } from './certificate.js';
import { BadgeDownloader } from './badge_download.js';

class GameController {
  constructor() {
    this.visualizer = null;
    this.certGen = new CertificateGenerator(gameState);
    this.badgeDownloader = new BadgeDownloader(gameState);
    this.activeZone = null;
    this.activeTab = 'theory';
    this.activeCodeLang = 'cpp';
    this.currentTheme = 'dark';
    this.shortestPathOnly = true;
  }

  init() {
    this.setupTheme();
    this.bindDOM();
    this.setupVisualizer();
    this.setupConfetti();
    this.setupKeyboardShortcuts();
    this.checkOnboarding();
    this.renderTopBar();
    this.renderMap();

    // Subscribe to state changes
    gameState.subscribe(() => {
      this.renderTopBar();
      this.renderMap();
    });
  }

  setupTheme() {
    const savedTheme = localStorage.getItem('SPSU_DSA_THEME') || 'dark';
    this.setTheme(savedTheme);
  }

  setTheme(theme) {
    this.currentTheme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('SPSU_DSA_THEME', theme);

    const themeIcon = document.getElementById('theme-icon');
    const themeLabel = document.getElementById('theme-label');
    if (themeIcon && themeLabel) {
      if (theme === 'light') {
        themeIcon.textContent = '🌙';
        themeLabel.textContent = 'Dark Mode';
      } else {
        themeIcon.textContent = '☀️';
        themeLabel.textContent = 'Light Mode';
      }
    }
  }

  toggleTheme() {
    const nextTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
    sound.playClick();
    this.setTheme(nextTheme);
  }

  bindDOM() {
    // Welcome / Onboarding elements
    this.onboardingModal = document.getElementById('onboarding-modal');
    this.onboardingForm = document.getElementById('onboarding-form');
    this.learnerNameInput = document.getElementById('learner-name-input');
    this.onboardingStartBtn = document.getElementById('btn-start-journey');

    // Navigation elements
    this.navPlayerName = document.getElementById('nav-player-name');
    this.navPlayerLevel = document.getElementById('nav-player-level');
    this.navPlayerXP = document.getElementById('nav-player-xp');
    this.navPlayerAvatar = document.getElementById('nav-player-avatar');
    this.xpFill = document.getElementById('xp-progress-fill');
    this.btnThemeToggle = document.getElementById('btn-theme-toggle');
    this.btnCertificate = document.getElementById('btn-open-certificate');
    this.btnBadges = document.getElementById('btn-open-badges');
    this.btnAudioToggle = document.getElementById('btn-audio-toggle');
    this.btnReset = document.getElementById('btn-reset-journey');

    // Map container
    this.mapContainer = document.getElementById('udaipur-map-container');
    this.currentViewMode = 'map'; // 'map' or 'grid'

    // Zone Modal & Tabs
    this.zoneModal = document.getElementById('zone-modal');
    this.btnZoneClose = document.getElementById('btn-close-zone-modal');
    this.zoneTitle = document.getElementById('zone-modal-title');
    this.zoneSubtitle = document.getElementById('zone-modal-subtitle');
    this.zoneIcon = document.getElementById('zone-modal-icon');
    this.tabButtons = document.querySelectorAll('.zone-tab-btn');
    this.tabPanes = document.querySelectorAll('.zone-tab-pane');

    // Visualizer Controls
    this.visContainer = document.getElementById('visualizer-render-area');
    this.visStatus = document.getElementById('vis-step-status');
    this.visComment = document.getElementById('vis-step-comment');
    this.btnVisPlay = document.getElementById('btn-vis-play');
    this.btnVisNext = document.getElementById('btn-vis-next');
    this.btnVisPrev = document.getElementById('btn-vis-prev');
    this.btnVisReset = document.getElementById('btn-vis-reset');
    this.visSpeedSelect = document.getElementById('vis-speed-select');

    // Challenge elements
    this.challengeQuestion = document.getElementById('challenge-question');
    this.challengeOptions = document.getElementById('challenge-options');
    this.challengeFeedback = document.getElementById('challenge-feedback');

    // Code Lab elements
    this.codeLangTabs = document.querySelectorAll('.code-lang-btn');
    this.codeDisplay = document.getElementById('code-display-block');
    this.btnCopyCode = document.getElementById('btn-copy-code');

    // Certificate Modal
    this.certModal = document.getElementById('cert-modal');
    this.btnCloseCert = document.getElementById('btn-close-cert-modal');
    this.certSvgTarget = document.getElementById('cert-svg-target');
    this.btnDownloadCert = document.getElementById('btn-download-cert');
    this.btnPrintCert = document.getElementById('btn-print-cert');

    // Badges Modal
    this.badgesModal = document.getElementById('badges-modal');
    this.btnCloseBadges = document.getElementById('btn-close-badges-modal');
    this.badgesGrid = document.getElementById('badges-grid-container');

    // Event Listeners
    if (this.btnThemeToggle) {
      this.btnThemeToggle.addEventListener('click', () => {
        this.toggleTheme();
      });
    }

    if (this.onboardingForm) {
      this.onboardingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleStartJourney();
      });
    }

    if (this.btnZoneClose) {
      this.btnZoneClose.addEventListener('click', () => {
        sound.playClick();
        this.closeZoneModal();
      });
    }

    if (this.btnCertificate) {
      this.btnCertificate.addEventListener('click', () => {
        sound.playClick();
        this.openCertificateModal();
      });
    }

    if (this.btnCloseCert) {
      this.btnCloseCert.addEventListener('click', () => {
        sound.playClick();
        this.closeCertificateModal();
      });
    }

    if (this.btnDownloadCert) {
      this.btnDownloadCert.addEventListener('click', () => {
        sound.playSuccess();
        this.certGen.downloadCertificate();
      });
    }

    if (this.btnPrintCert) {
      this.btnPrintCert.addEventListener('click', () => {
        sound.playClick();
        window.print();
      });
    }

    if (this.btnBadges) {
      this.btnBadges.addEventListener('click', () => {
        sound.playClick();
        this.openBadgesModal();
      });
    }

    if (this.btnCloseBadges) {
      this.btnCloseBadges.addEventListener('click', () => {
        sound.playClick();
        this.closeBadgesModal();
      });
    }

    if (this.btnAudioToggle) {
      this.btnAudioToggle.addEventListener('click', () => {
        const isMuted = sound.toggleMute();
        this.btnAudioToggle.innerHTML = isMuted ? '🔇 Audio Off' : '🔊 Audio On';
        this.btnAudioToggle.classList.toggle('muted', isMuted);
      });
    }

    if (this.btnReset) {
      this.btnReset.addEventListener('click', () => {
        if (confirm('Start a fresh SPSU Udaipur DSA journey? Your XP and badges will reset.')) {
          gameState.resetProgress();
          this.checkOnboarding();
        }
      });
    }

    // Tab buttons
    this.tabButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        sound.playClick();
        this.switchZoneTab(btn.dataset.tab);
      });
    });

    // Code language buttons
    this.codeLangTabs.forEach(btn => {
      btn.addEventListener('click', () => {
        sound.playClick();
        this.switchCodeLang(btn.dataset.lang);
      });
    });

    if (this.btnCopyCode) {
      this.btnCopyCode.addEventListener('click', () => {
        if (this.codeDisplay) {
          navigator.clipboard.writeText(this.codeDisplay.innerText).then(() => {
            sound.playSuccess();
            const original = this.btnCopyCode.innerText;
            this.btnCopyCode.innerText = '✅ Copied!';
            setTimeout(() => { this.btnCopyCode.innerText = original; }, 2000);
          });
        }
      });
    }

    // Modal background close on click outside
    [this.zoneModal, this.certModal, this.badgesModal].forEach(modal => {
      if (modal) {
        modal.addEventListener('click', (e) => {
          if (e.target === modal) {
            modal.classList.remove('modal-open');
          }
        });
      }
    });
  }

  setupKeyboardShortcuts() {
    window.addEventListener('keydown', (e) => {
      // Escape key closes modals
      if (e.key === 'Escape') {
        if (this.zoneModal && this.zoneModal.classList.contains('modal-open')) {
          this.closeZoneModal();
        } else if (this.certModal && this.certModal.classList.contains('modal-open')) {
          this.closeCertificateModal();
        } else if (this.badgesModal && this.badgesModal.classList.contains('modal-open')) {
          this.closeBadgesModal();
        }
      }

      // Visualizer step controls via keyboard when visualizer tab is active
      if (this.zoneModal && this.zoneModal.classList.contains('modal-open') && this.activeTab === 'visualizer' && this.visualizer) {
        if (e.key === 'ArrowRight') {
          e.preventDefault();
          this.visualizer.next();
        } else if (e.key === 'ArrowLeft') {
          e.preventDefault();
          this.visualizer.prev();
        } else if (e.key === ' ') {
          e.preventDefault();
          const isPlaying = this.visualizer.togglePlay();
          if (this.btnVisPlay) this.btnVisPlay.innerHTML = isPlaying ? '⏸️ Pause' : '▶️ Play Steps';
        }
      }
    });
  }

  setupVisualizer() {
    this.visualizer = new VisualizerEngine(
      this.visContainer,
      this.visStatus,
      this.visComment
    );

    if (this.btnVisPlay) {
      this.btnVisPlay.addEventListener('click', () => {
        const isPlaying = this.visualizer.togglePlay();
        this.btnVisPlay.innerHTML = isPlaying ? '⏸️ Pause' : '▶️ Play Steps';
      });
    }
    if (this.btnVisNext) {
      this.btnVisNext.addEventListener('click', () => {
        this.visualizer.next();
      });
    }
    if (this.btnVisPrev) {
      this.btnVisPrev.addEventListener('click', () => {
        this.visualizer.prev();
      });
    }
    if (this.btnVisReset) {
      this.btnVisReset.addEventListener('click', () => {
        this.visualizer.reset();
        if (this.btnVisPlay) this.btnVisPlay.innerHTML = '▶️ Play Steps';
      });
    }
    if (this.visSpeedSelect) {
      this.visSpeedSelect.addEventListener('change', (e) => {
        this.visualizer.setSpeed(parseInt(e.target.value, 10));
      });
    }
  }

  checkOnboarding() {
    if (!gameState.journeyStarted || !gameState.name) {
      if (this.onboardingModal) {
        this.onboardingModal.classList.add('modal-open');
        setTimeout(() => {
          if (this.learnerNameInput) this.learnerNameInput.focus();
        }, 150);
      }
    } else {
      if (this.onboardingModal) {
        this.onboardingModal.classList.remove('modal-open');
      }
    }
  }

  handleStartJourney() {
    const rawName = this.learnerNameInput ? this.learnerNameInput.value : '';
    if (!rawName.trim()) {
      if (this.learnerNameInput) {
        this.learnerNameInput.classList.add('input-shake');
        setTimeout(() => this.learnerNameInput.classList.remove('input-shake'), 600);
      }
      return;
    }

    sound.playFanfare();
    gameState.startJourney(rawName);
    this.triggerConfetti();
      setTimeout(() => { const victoryBadgeBtn = document.getElementById('btn-victory-download-badge');
        if (victoryBadgeBtn) {
          victoryBadgeBtn.addEventListener('click', () => {
            sound.playSuccess();
            this.badgeDownloader.downloadBadge(zone.badge, zone);
          });
        } }, 50);

    if (this.onboardingModal) {
      this.onboardingModal.classList.remove('modal-open');
    }
  }

  getAvatarForLevel(level) {
    if (level <= 2) return '🧙‍♂️';
    if (level <= 4) return '⚔️';
    if (level <= 6) return '🏹';
    if (level <= 8) return '🛡️';
    if (level <= 10) return '👑';
    return '🌟';
  }

  renderTopBar() {
    const name = gameState.name || 'Learner';
    const xp = gameState.xp || 0;
    const level = gameState.level || 1;
    const levelTitle = gameState.getLevelTitle(level);

    if (this.navPlayerName) this.navPlayerName.textContent = name;
    if (this.navPlayerLevel) this.navPlayerLevel.textContent = `Lvl ${level} • ${levelTitle}`;
    if (this.navPlayerXP) this.navPlayerXP.textContent = `${xp.toLocaleString()} XP`;
    if (this.navPlayerAvatar) this.navPlayerAvatar.textContent = this.getAvatarForLevel(level);

    // Calculate level progress (each level ~ 400 XP)
    const baseXP = (level - 1) * 400;
    const nextXP = level * 400;
    const pct = Math.min(100, Math.max(5, Math.round(((xp - baseXP) / (nextXP - baseXP)) * 100)));
    if (this.xpFill) {
      this.xpFill.style.width = `${pct}%`;
    }
  }

  renderMap() {
    if (!this.mapContainer) return;

    const currentZone = ZONES.find(z => z.id === gameState.currentZoneId) || ZONES[0];
    const sourceZone = ZONES[0];
    const finalDestZone = ZONES[ZONES.length - 1];
    const totalConquered = gameState.badges.filter(b => b.id !== 'badge-welcome').length;
    const progressPct = Math.min(100, Math.round((totalConquered / 10) * 100));
    const avatarIcon = this.getAvatarForLevel(gameState.level);

    let html = `
      <div class="udaipur-expedition-wrapper">
        <!-- Travel Telemetry Banner -->
        <div class="expedition-hud-card">
          <div class="hud-route-header">
            <div class="route-waypoints">
              <div class="waypoint-box source-waypoint">
                <span class="waypoint-tag">SOURCE (START)</span>
                <span class="waypoint-title"><img src="assets/spsu-logo.png" alt="SPSU" class="hud-spsu-logo" /> 🎓 ${sourceZone.title}</span>
                <span class="waypoint-concept">${sourceZone.concept}</span>
              </div>
              <div class="route-arrow-flow">
                <span class="arrow-glyph">➔</span>
                <span class="journey-distance">${progressPct}% EXPEDITION COMPLETED</span>
                <span class="arrow-glyph">➔</span>
              </div>
              <div class="waypoint-box dest-waypoint">
                <span class="waypoint-tag">FINAL DESTINATION</span>
                <span class="waypoint-title"><img src="assets/spsu-logo.png" alt="SPSU" class="hud-spsu-logo" /> 👑 ${finalDestZone.title}</span>
                <span class="waypoint-concept">${finalDestZone.concept}</span>
              </div>
            </div>

            <div class="hud-actions-group">
              <div class="view-toggle-pills">
                <button class="btn-view-toggle ${this.currentViewMode === 'map' ? 'active' : ''}" id="btn-toggle-map-view">
                  🗺️ Udaipur Map
                </button>
                <button class="btn-view-toggle ${this.currentViewMode === 'grid' ? 'active' : ''}" id="btn-toggle-grid-view">
                  📋 Grid View
                </button>
              </div>
              <button class="btn-travel-now" id="btn-travel-current-zone">
                🚀 Travel To Current Zone (${currentZone.id}: ${currentZone.title.split(',')[0]}) ➔
              </button>
            </div>
          </div>

          <!-- Overall Journey Progress Track -->
          <div class="expedition-progress-strip">
            <div class="progress-labels">
              <span>Origin: SPSU Bhatewar</span>
              <span>Learner at: <strong>Zone ${currentZone.id} (${currentZone.title})</strong></span>
              <span>Final Destination: SPSU Convocation</span>
            </div>
            <div class="expedition-track">
              <div class="expedition-fill" style="width: ${Math.max(8, progressPct)}%;"></div>
            </div>
          </div>
        </div>
    `;

    if (this.currentViewMode === 'map') {
      html += this.renderInteractiveUdaipurMap(currentZone, avatarIcon);
    } else {
      html += this.renderGridView();
    }

    html += `</div>`;

    this.mapContainer.innerHTML = html;

    // Bind map/view buttons
    const btnMap = document.getElementById('btn-toggle-map-view');
    const btnGrid = document.getElementById('btn-toggle-grid-view');
    const btnTravel = document.getElementById('btn-travel-current-zone');

    if (btnMap) {
      btnMap.addEventListener('click', () => {
        sound.playClick();
        this.currentViewMode = 'map';
        this.renderMap();
      });
    }
    if (btnGrid) {
      btnGrid.addEventListener('click', () => {
        sound.playClick();
        this.currentViewMode = 'grid';
        this.renderMap();
      });
    }
    if (btnTravel) {
      btnTravel.addEventListener('click', () => {
        sound.playClick();
        this.openZoneModal(gameState.currentZoneId);
      });
    }

    // Attach click events on landmark nodes and pins
    this.mapContainer.querySelectorAll('[data-zone-id]').forEach(el => {
      el.addEventListener('click', (e) => {
        const zoneId = parseInt(el.dataset.zoneId, 10);
        if (zoneId) {
          this.handleNodeClick(zoneId);
        }
      });
    });
  }

  renderInteractiveUdaipurMap(currentZone, avatarIcon) {
    const totalShortestDist = '28.0 km';
    const shortestPathSequence = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const svgWidth = 1200;
    const svgHeight = 660;

    return `
      <div class="udaipur-interactive-map-frame dsa-graph-frame">
        <!-- DSA Graph Top Telemetry & Shortest Path Controls -->
        <div class="dsa-graph-hud-bar">
          <div class="dsa-graph-hud-left">
            <span class="dsa-graph-title-pill">⚡ DSA GRAPH TOPOLOGY: G = (V, E)</span>
            <span class="dsa-graph-specs">|V| = 10 Landmarks • |E| = 17 Weighted Edges</span>
            <span class="dsa-graph-algo">Dijkstra Shortest Path: O((V + E) log V)</span>
          </div>
          <div class="dsa-graph-hud-right">
            <button class="btn-shortest-path-toggle ${this.shortestPathOnly ? 'active' : ''}" id="btn-toggle-shortest-path" title="Toggle Shortest Path First / All Routes">
              ${this.shortestPathOnly ? '⚡ Shortest Path First (ACTIVE)' : '🌐 Show All Graph Pathways'}
            </button>
          </div>
        </div>

        <!-- Shortest Path Route Chain Strip -->
        <div class="dsa-shortest-path-strip">
          <div class="strip-label">🏆 SHORTEST PATH FIRST:</div>
          <div class="strip-nodes-flow">
            ${shortestPathSequence.map((zid, idx) => {
              const z = ZONES.find(item => item.id === zid);
              const isConquered = gameState.hasBadge(z.badge.id);
              const isCurrent = currentZone.id === zid;
              return `
                <div class="flow-node-chip ${isCurrent ? 'chip-current' : isConquered ? 'chip-conquered' : ''}" data-zone-id="${z.id}" title="Click to view Zone ${z.id}">
                  <span class="chip-num">V${z.id}</span>
                  <span class="chip-name">${z.title.split(',')[0]}</span>
                  <span class="chip-cost">${z.mapCoords.shortestDist}</span>
                </div>
                ${idx < shortestPathSequence.length - 1 ? '<span class="flow-arrow">➔</span>' : ''}
              `;
            }).join('')}
          </div>
          <div class="strip-total-dist">
            <span>Total Optimal Distance: <strong>${totalShortestDist}</strong></span>
          </div>
        </div>

        <!-- Main SVG DSA Graph Canvas -->
        <div class="svg-map-wrapper">
          <svg viewBox="0 0 ${svgWidth} ${svgHeight}" class="udaipur-vector-map dsa-vector-graph" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <!-- Arrowhead for Shortest Path Edges (Blue/Cyan) -->
              <marker id="arrow-shortest" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                <path d="M 0 1.5 L 9 5 L 0 8.5 z" fill="#0284c7" />
              </marker>

              <!-- Arrowhead for Conquered Path -->
              <marker id="arrow-conquered" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                <path d="M 0 1.5 L 9 5 L 0 8.5 z" fill="#10b981" />
              </marker>

              <!-- Arrowhead for Alternative Edges -->
              <marker id="arrow-alt" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 2 L 8 5 L 0 8 z" fill="#94a3b8" />
              </marker>

              <!-- Shortest Path Neon Gradient -->
              <linearGradient id="shortestPathGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#0284c7" />
                <stop offset="50%" stop-color="#38bdf8" />
                <stop offset="100%" stop-color="#0ea5e9" />
              </linearGradient>

              <linearGradient id="goldConqueredGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#f59e0b" />
                <stop offset="100%" stop-color="#10b981" />
              </linearGradient>

              <!-- Subtle Grid Background -->
              <pattern id="dsaGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="var(--border-light)" stroke-width="0.75" stroke-dasharray="3,3" opacity="0.6" />
              </pattern>

              <!-- Glow Filter -->
              <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3.5" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            <!-- Background Canvas with Topological Grid -->
            <rect width="${svgWidth}" height="${svgHeight}" fill="var(--bg-main)" />
            <rect width="${svgWidth}" height="${svgHeight}" fill="url(#dsaGrid)" />

            <!-- Stage Columns (Topological Layout) -->
            ${GRAPH_STAGES.map(stage => `
              <g class="graph-stage-column" opacity="0.85">
                <line x1="${stage.x}" y1="36" x2="${stage.x}" y2="625" stroke="var(--border-light)" stroke-width="1.2" stroke-dasharray="4,6" opacity="0.5" />
                <rect x="${stage.x - 70}" y="10" width="140" height="22" rx="11" fill="var(--bg-card)" stroke="var(--border-color)" stroke-width="1" />
                <text x="${stage.x}" y="25" text-anchor="middle" font-size="8.5" font-weight="800" fill="var(--text-muted)">${stage.title}</text>
              </g>
            `).join('')}

            <!-- 1. GRAPH EDGES -->
            <!-- Render Alternative Edges first so Shortest Path sits on top -->
            <g class="graph-edges-layer">
              ${GRAPH_EDGES.filter(e => !e.isShortestPath).map(edge => {
                const u = ZONES.find(z => z.id === edge.from);
                const v = ZONES.find(z => z.id === edge.to);
                if (!u || !v) return '';

                const x1 = u.mapCoords.x;
                const y1 = u.mapCoords.y;
                const x2 = v.mapCoords.x;
                const y2 = v.mapCoords.y;

                const dx = x2 - x1;
                const dy = y2 - y1;
                const len = Math.sqrt(dx * dx + dy * dy);
                const r = 26;
                const startX = x1 + (dx / len) * r;
                const startY = y1 + (dy / len) * r;
                const endX = x2 - (dx / len) * (r + 7);
                const endY = y2 - (dy / len) * (r + 7);

                const midX = (x1 + x2) / 2;
                const midY = (y1 + y2) / 2 + (dy === 0 ? -12 : (dx < 0 ? -10 : 10));

                const opacity = this.shortestPathOnly ? '0.18' : '0.65';

                return `
                  <g class="graph-edge-alt" opacity="${opacity}">
                    <line x1="${startX}" y1="${startY}" x2="${endX}" y2="${endY}" stroke="#94a3b8" stroke-width="1.8" stroke-dasharray="6,5" marker-end="url(#arrow-alt)" />
                    <g transform="translate(${midX}, ${midY})">
                      <rect x="-20" y="-8.5" width="40" height="17" rx="8.5" fill="var(--bg-card)" stroke="var(--border-color)" stroke-width="1" />
                      <text x="0" y="3.5" text-anchor="middle" font-size="8" font-weight="700" fill="var(--text-muted)">${edge.label}</text>
                    </g>
                  </g>
                `;
              }).join('')}

              <!-- Shortest Path Edges (Prominently Highlighted with Glow) -->
              ${GRAPH_EDGES.filter(e => e.isShortestPath).map(edge => {
                const u = ZONES.find(z => z.id === edge.from);
                const v = ZONES.find(z => z.id === edge.to);
                if (!u || !v) return '';

                const x1 = u.mapCoords.x;
                const y1 = u.mapCoords.y;
                const x2 = v.mapCoords.x;
                const y2 = v.mapCoords.y;

                const dx = x2 - x1;
                const dy = y2 - y1;
                const len = Math.sqrt(dx * dx + dy * dy);
                const r = 26;
                const startX = x1 + (dx / len) * r;
                const startY = y1 + (dy / len) * r;
                const endX = x2 - (dx / len) * (r + 8);
                const endY = y2 - (dy / len) * (r + 8);

                const midX = (x1 + x2) / 2;
                const midY = (y1 + y2) / 2;

                const isEdgeConquered = gameState.hasBadge(u.badge.id) && gameState.hasBadge(v.badge.id);
                const strokeColor = isEdgeConquered ? 'url(#goldConqueredGrad)' : 'url(#shortestPathGrad)';
                const markerId = isEdgeConquered ? 'url(#arrow-conquered)' : 'url(#arrow-shortest)';

                return `
                  <g class="graph-edge-shortest">
                    <!-- Broad glow line -->
                    <line x1="${startX}" y1="${startY}" x2="${endX}" y2="${endY}" stroke="#0284c7" stroke-width="8" stroke-opacity="0.2" stroke-linecap="round" />
                    <!-- Crisp animated shortest path stroke -->
                    <line x1="${startX}" y1="${startY}" x2="${endX}" y2="${endY}" stroke="${strokeColor}" stroke-width="4.5" stroke-linecap="round" marker-end="${markerId}" class="animated-shortest-edge" stroke-dasharray="10,6" />
                    <!-- Shortest Path Edge Weight Badge -->
                    <g transform="translate(${midX}, ${midY})">
                      <rect x="-24" y="-10" width="48" height="20" rx="10" fill="#0284c7" stroke="#38bdf8" stroke-width="1.5" filter="url(#neonGlow)" />
                      <text x="0" y="3.5" text-anchor="middle" font-size="9" font-weight="900" fill="#ffffff">⚡ ${edge.label}</text>
                    </g>
                  </g>
                `;
              }).join('')}
            </g>

            <!-- 2. GRAPH VERTICES & NON-OVERLAPPING INFO CARDS -->
            <g class="graph-nodes-layer">
              ${ZONES.map(z => {
                const isSource = (z.id === 1);
                const isFinal = (z.id === 10);
                const isUnlocked = gameState.isZoneUnlocked(z.id);
                const isConquered = gameState.hasBadge(z.badge.id);
                const isCurrent = (currentZone.id === z.id);

                const x = z.mapCoords.x;
                const y = z.mapCoords.y;

                // Determine whether card sits above or below vertex
                let cardY = 65;
                let connectorY1 = 140;
                let connectorY2 = y - 26;

                if (y > 400) {
                  // Lower row
                  cardY = 515;
                  connectorY1 = y + 26;
                  connectorY2 = 515;
                } else if (y > 250 && y < 400) {
                  // Middle row (Source & Final)
                  cardY = 210;
                  connectorY1 = 285;
                  connectorY2 = y - 26;
                }

                // Node coloring & state
                let discFill = '#334155';
                let discStroke = '#64748b';
                let statusTagText = '🔒 Locked';
                let statusTagColor = '#64748b';

                if (isConquered) {
                  discFill = '#f59e0b';
                  discStroke = '#fbbf24';
                  statusTagText = '⭐ Conquered';
                  statusTagColor = '#d97706';
                } else if (isCurrent) {
                  discFill = '#0284c7';
                  discStroke = '#38bdf8';
                  statusTagText = '📍 Current Location';
                  statusTagColor = '#0284c7';
                } else if (isUnlocked) {
                  discFill = '#10b981';
                  discStroke = '#34d399';
                  statusTagText = '🔓 Unlocked (Ready)';
                  statusTagColor = '#059669';
                }

                const cardWidth = 158;
                const cardHeight = 74;
                const cardX = x - (cardWidth / 2);

                return `
                  <!-- Vertex G Group for Zone ${z.id} -->
                  <g class="dsa-vertex-group ${isCurrent ? 'current-vertex' : ''} ${!isUnlocked ? 'locked-vertex' : ''}" data-zone-id="${z.id}" style="cursor: pointer;">
                    <!-- Connector line between card and circle -->
                    <line x1="${x}" y1="${connectorY1}" x2="${x}" y2="${connectorY2}" stroke="${discStroke}" stroke-width="1.5" stroke-dasharray="2,2" opacity="0.75" />

                    <!-- Vertex Info Card -->
                    <g transform="translate(${cardX}, ${cardY})" class="vertex-card-svg">
                      <rect width="${cardWidth}" height="${cardHeight}" rx="8" fill="var(--bg-card)" stroke="${isCurrent ? '#0284c7' : isConquered ? '#f59e0b' : 'var(--border-color)'}" stroke-width="${isCurrent ? 2 : 1.2}" />
                      
                      <!-- Card Title Row -->
                      <text x="8" y="18" font-size="10" font-weight="900" fill="var(--text-primary)">
                        ${isSource ? '🏁 1. SPSU Campus (Source)' : isFinal ? '👑 10. SPSU Convocation' : `V${z.id}. ${z.title.split(',')[0]}`}
                      </text>

                      <!-- Concept Tag Pill -->
                      <rect x="8" y="24" width="${cardWidth - 16}" height="17" rx="4" fill="var(--bg-card-subtle)" />
                      <text x="12" y="36" font-size="8" font-weight="700" fill="var(--text-secondary)">
                        ${z.concept.split('&')[0].trim()}
                      </text>

                      <!-- Shortest Path Distance & Status -->
                      <text x="8" y="54" font-size="8.5" font-weight="800" fill="#0284c7">
                        ⚡ Shortest: ${z.mapCoords.shortestDist}
                      </text>
                      <text x="8" y="66" font-size="8" font-weight="700" fill="${statusTagColor}">
                        ${statusTagText}
                      </text>
                    </g>

                    <!-- Vertex Disc Anchor at (x, y) -->
                    <g transform="translate(${x}, ${y})">
                      <!-- Pulsing rings for current node -->
                      ${isCurrent ? `
                        <circle cx="0" cy="0" r="34" fill="none" stroke="#38bdf8" stroke-width="2" class="avatar-ripple" />
                        <circle cx="0" cy="0" r="44" fill="none" stroke="#0284c7" stroke-width="1.5" class="avatar-ripple-delayed" />
                      ` : ''}

                      <!-- Node outer circle -->
                      <circle cx="0" cy="0" r="24" fill="${discFill}" stroke="${discStroke}" stroke-width="2.5" class="vertex-circle" />

                      <!-- Center Icon -->
                      <text x="0" y="5" text-anchor="middle" font-size="14">${z.icon}</text>

                      <!-- Small Vertex ID badge tag at corner -->
                      <circle cx="16" cy="-16" r="9" fill="var(--bg-card)" stroke="${discStroke}" stroke-width="1.5" />
                      <text x="16" y="-13" text-anchor="middle" font-size="8" font-weight="900" fill="var(--text-primary)">${z.id}</text>
                    </g>
                  </g>
                `;
              }).join('')}
            </g>

            <!-- 3. CURRENT LEARNER TRAVELER AVATAR PIN -->
            <g class="learner-traveler-avatar" transform="translate(${currentZone.mapCoords.x}, ${currentZone.mapCoords.y})">
              <!-- Elevated Pin Banner -->
              <g transform="translate(0, -56)">
                <rect x="-55" y="-20" width="110" height="22" rx="5" fill="#f59e0b" stroke="#ffffff" stroke-width="1.8" filter="url(#neonGlow)" />
                <text x="0" y="-5" text-anchor="middle" fill="#0f172a" font-size="9.5" font-weight="900">
                  📍 YOU ARE HERE
                </text>
                <polygon points="-5,2 5,2 0,7" fill="#f59e0b" />
              </g>

              <!-- Learner Character Marker -->
              <circle cx="0" cy="0" r="20" fill="#0f172a" stroke="#f59e0b" stroke-width="2.5" />
              <text x="0" y="6" text-anchor="middle" font-size="16">${avatarIcon}</text>
            </g>
          </svg>
        </div>
      </div>
    `;
  }

  renderGridView() {
    let html = `
      <div class="map-nodes-grid">
    `;

    ZONES.forEach(zone => {
      const isUnlocked = gameState.isZoneUnlocked(zone.id);
      const isConquered = gameState.hasBadge(zone.badge.id);
      const isCurrent = gameState.currentZoneId === zone.id;

      let statusCls = 'node-locked';
      let statusLabel = '🔒 Locked';
      if (isConquered) {
        statusCls = 'node-conquered';
        statusLabel = '⭐ Conquered';
      } else if (isUnlocked) {
        statusCls = 'node-active';
        statusLabel = '📍 Explore';
      }

      html += `
        <div class="map-node-card ${statusCls} ${isCurrent ? 'current-pulse' : ''}" data-zone-id="${zone.id}">
          <div class="node-card-header">
            <span class="node-number">Zone ${zone.id} • ${zone.id === 1 ? 'SOURCE' : zone.id === 10 ? 'DESTINATION' : 'WAYPOINT'}</span>
            <span class="node-status-tag ${statusCls}">${statusLabel}</span>
          </div>
          <div class="node-icon-row">
            <span class="node-glyph">${zone.icon}</span>
            <div class="node-title-group">
              <h3 class="node-title">${zone.title}</h3>
              <p class="node-concept">${zone.concept}</p>
            </div>
          </div>
          <p class="node-landmark">📍 ${zone.landmark}</p>
          <div class="node-footer">
            <span class="node-xp">+${zone.xpReward} XP</span>
            <button class="btn-node-action ${isUnlocked ? 'btn-active-zone' : 'btn-locked-zone'}" data-zone-id="${zone.id}">
              ${isConquered ? 'Review & Practice ➔' : isUnlocked ? 'Enter Realm ➔' : 'Complete Prior Zone'}
            </button>
          </div>
        </div>
      `;
    });

    html += `</div>`;
    return html;
  }

  handleNodeClick(zoneId) {
    if (!gameState.isZoneUnlocked(zoneId)) {
      sound.playError();
      alert(`Zone ${zoneId} is currently locked! Please complete the challenge in Zone ${zoneId - 1} to unlock this royal Udaipur landmark.`);
      return;
    }

    sound.playClick();
    gameState.currentZoneId = zoneId;
    gameState.save();
    this.openZoneModal(zoneId);
  }

  openZoneModal(zoneId) {
    const zone = ZONES.find(z => z.id === zoneId);
    if (!zone) return;

    this.activeZone = zone;
    if (this.zoneTitle) this.zoneTitle.textContent = `${zone.id}. ${zone.title}`;
    if (this.zoneSubtitle) this.zoneSubtitle.textContent = `${zone.concept} • ${zone.landmark}`;
    if (this.zoneIcon) this.zoneIcon.textContent = zone.icon;

    // Render Theory Tab
    this.renderTheoryTab(zone);

    // Setup Visualizer Tab
    if (this.visualizer) {
      this.visualizer.loadZone(zone);
    }
    if (this.btnVisPlay) this.btnVisPlay.innerHTML = '▶️ Play Steps';

    // Render Challenge Tab
    this.renderChallengeTab(zone);

    // Render Code Lab Tab
    this.renderCodeTab(zone);

    // Default to first tab
    this.switchZoneTab('theory');

    if (this.zoneModal) {
      this.zoneModal.classList.add('modal-open');
    }
  }

  closeZoneModal() {
    if (this.visualizer) {
      this.visualizer.pause();
    }
    if (this.zoneModal) {
      this.zoneModal.classList.remove('modal-open');
    }
  }

  switchZoneTab(tabName) {
    this.activeTab = tabName;
    this.tabButtons.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.tab === tabName);
    });
    this.tabPanes.forEach(pane => {
      pane.classList.toggle('active', pane.dataset.tab === tabName);
    });

    if (tabName === 'visualizer' && this.visualizer) {
      this.visualizer.render();
    }
  }

  renderTheoryTab(zone) {
    const container = document.getElementById('theory-content-container');
    if (!container) return;

    container.innerHTML = `
      <div class="theory-royal-card">
        <div class="lore-box">
          <div class="lore-title">🏰 Udaipur Architectural & Cultural Lore • Powered By Kapil</div>
          <p class="lore-text">${zone.lore}</p>
        </div>

        <div class="theory-main-box">
          <h4 class="concept-title">${zone.concept}</h4>
          <p class="concept-overview">${zone.theory.overview}</p>

          <h5 class="key-points-heading">Core Algorithmic Principles</h5>
          <ul class="key-points-list">
            ${zone.theory.keyPoints.map(p => `<li>${p}</li>`).join('')}
          </ul>

          <h5 class="key-points-heading">Time & Space Complexity Summary</h5>
          <div class="complexity-chips">
            ${Object.entries(zone.theory.complexities).map(([k, v]) => `
              <div class="complexity-chip">
                <span class="comp-key">${k.replace(/([A-Z])/g, ' $1').toUpperCase()}:</span>
                <span class="comp-val">${v}</span>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="badge-preview-card">
          <div class="badge-preview-icon">${zone.badge.icon}</div>
          <div class="badge-preview-details">
            <div class="badge-preview-name">${zone.badge.name}</div>
            <div class="badge-preview-desc">${zone.badge.desc}</div>
          </div>
          <div class="badge-preview-reward">+${zone.xpReward} XP</div>
        </div>
      </div>
    `;
  }

  renderChallengeTab(zone) {
    if (!this.challengeQuestion || !this.challengeOptions) return;

    const isConquered = gameState.hasBadge(zone.badge.id);

    this.challengeQuestion.innerHTML = `
      <div class="challenge-header">
        <span class="challenge-badge-tag">${isConquered ? '⭐ Solved' : '⚔️ Active Challenge'}</span>
        <span class="challenge-reward-tag">+${zone.xpReward} XP on Victory</span>
      </div>
      <p class="challenge-text">${zone.challenge.question}</p>
    `;

    this.challengeOptions.innerHTML = zone.challenge.options.map((opt, idx) => `
      <button class="challenge-option-btn" data-index="${idx}">
        <span class="opt-letter">${String.fromCharCode(65 + idx)}</span>
        <span class="opt-text">${opt}</span>
      </button>
    `).join('');

    if (this.challengeFeedback) {
      this.challengeFeedback.innerHTML = isConquered ? `
        <div class="feedback-box feedback-success">
          ⭐ You have already conquered this challenge and earned the <strong>${zone.badge.name}</strong>!
        </div>
      ` : '';
    }

    this.challengeOptions.querySelectorAll('.challenge-option-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const selected = parseInt(btn.dataset.index, 10);
        this.handleChallengeAnswer(zone, selected);
      });
    });
  }

  handleChallengeAnswer(zone, selectedIdx) {
    const isCorrect = selectedIdx === zone.challenge.correctIndex;
    const optionBtns = this.challengeOptions.querySelectorAll('.challenge-option-btn');

    optionBtns.forEach((btn, idx) => {
      btn.disabled = true;
      if (idx === zone.challenge.correctIndex) {
        btn.classList.add('option-correct');
      } else if (idx === selectedIdx && !isCorrect) {
        btn.classList.add('option-incorrect');
      }
    });

    if (isCorrect) {
      sound.playLevelUp();
      this.triggerConfetti();

      const badgeAwarded = gameState.awardBadge(zone.badge, zone.xpReward);
      const { newlyUnlocked, nextId } = gameState.unlockNextZone(zone.id);

      if (this.challengeFeedback) {
        this.challengeFeedback.innerHTML = `
          <div class="feedback-box feedback-success">
            <h4>🎉 Splendid Victory, SPSU Scholar!</h4>
            <p>${zone.challenge.explanation}</p>
            <div class="reward-toast">
              🎖️ Unlocked Badge: <strong>${zone.badge.name}</strong> • Earned <strong>+${zone.xpReward} XP</strong>!
              ${newlyUnlocked ? `<br/>🔓 Landmark <strong>Zone ${nextId}</strong> is now unlocked on the Udaipur map!` : ''}
              ${zone.id === 10 ? `<br/>👑 <strong>CONGRATULATIONS!</strong> You have conquered the entire tour. View and download your high-resolution Certificate (Powered By Kapil)!` : ''}
            </div>
          </div>
        `;
      }
    } else {
      sound.playError();
      if (this.challengeFeedback) {
        this.challengeFeedback.innerHTML = `
          <div class="feedback-box feedback-error">
            <h4>⚠️ Not quite correct</h4>
            <p>${zone.challenge.explanation}</p>
            <button class="btn-retry-challenge" id="btn-retry-challenge">Try Again</button>
          </div>
        `;

        const retryBtn = document.getElementById('btn-retry-challenge');
        if (retryBtn) {
          retryBtn.addEventListener('click', () => {
            sound.playClick();
            this.renderChallengeTab(zone);
          });
        }
      }
    }
  }

  switchCodeLang(lang) {
    this.activeCodeLang = lang;
    this.codeLangTabs.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });
    if (this.activeZone) {
      this.renderCodeTab(this.activeZone);
    }
  }

  renderCodeTab(zone) {
    if (!this.codeDisplay) return;
    const snippet = (zone.codeSnippets && zone.codeSnippets[this.activeCodeLang]) || '// Code coming soon';
    this.codeDisplay.textContent = snippet;
  }

  openCertificateModal() {
    if (!this.certSvgTarget) return;
    this.certSvgTarget.innerHTML = this.certGen.generateSVG(true);
    if (this.certModal) {
      this.certModal.classList.add('modal-open');
    }
  }

  closeCertificateModal() {
    if (this.certModal) {
      this.certModal.classList.remove('modal-open');
    }
  }

    openBadgesModal() {
    if (!this.badgesGrid) return;

    const earnedBadgesCount = ZONES.filter(z => gameState.hasBadge(z.badge.id)).length;

    let headerHtml = `
      <div class="badges-header-actions" style="grid-column: 1 / -1; width: 100%;">
        <span class="badges-count-status">
          🏆 Royal Badges Conquered: <strong>${earnedBadgesCount} of 10 Landmarks</strong> (Certified &amp; Powered By Kapil)
        </span>
        ${earnedBadgesCount > 0 ? `
          <button class="btn-download-all-badges" id="btn-download-earned-badges">
            📥 Download All Earned Badges (PNG Archive)
          </button>
        ` : ''}
      </div>
    `;

    const cardsHtml = ZONES.map(z => {
      const hasEarned = gameState.hasBadge(z.badge.id);
      return `
        <div class="badge-item-card ${hasEarned ? 'badge-earned' : 'badge-unearned'}">
          <div class="badge-item-icon">${z.badge.icon}</div>
          <div class="badge-item-name">${z.badge.name}</div>
          <div class="badge-item-zone">${z.title}</div>
          <p class="badge-item-desc">${z.badge.desc}</p>
          <div class="badge-card-footer">
            <div class="badge-item-status">${hasEarned ? '✅ UNLOCKED' : '🔒 LOCKED'}</div>
            ${hasEarned ? `
              <button class="btn-download-single-badge" data-badge-id="${z.badge.id}" data-zone-id="${z.id}">
                📥 Download Badge (PNG)
              </button>
            ` : ''}
          </div>
        </div>
      `;
    }).join('');

    this.badgesGrid.innerHTML = headerHtml + cardsHtml;

    // Attach click events on badge download buttons
    this.badgesGrid.querySelectorAll('.btn-download-single-badge').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const zoneId = parseInt(btn.dataset.zoneId, 10);
        const zone = ZONES.find(z => z.id === zoneId);
        if (zone) {
          sound.playSuccess();
          this.badgeDownloader.downloadBadge(zone.badge, zone);
        }
      });
    });

    const btnDownloadAll = document.getElementById('btn-download-earned-badges');
    if (btnDownloadAll) {
      btnDownloadAll.addEventListener('click', () => {
        sound.playFanfare();
        const earnedZones = ZONES.filter(z => gameState.hasBadge(z.badge.id));
        earnedZones.forEach((z, idx) => {
          setTimeout(() => {
            this.badgeDownloader.downloadBadge(z.badge, z);
          }, idx * 300);
        });
      });
    }

    if (this.badgesModal) {
      this.badgesModal.classList.add('modal-open');
    }
  }

  closeBadgesModal() {
    if (this.badgesModal) {
      this.badgesModal.classList.remove('modal-open');
    }
  }

  setupConfetti() {
    const canvas = document.getElementById('confetti-canvas');
    if (!canvas) return;
    this.confettiCanvas = canvas;
    this.confettiCtx = canvas.getContext('2d');
    this.confettiParticles = [];

    window.addEventListener('resize', () => {
      if (this.confettiCanvas) {
        this.confettiCanvas.width = window.innerWidth;
        this.confettiCanvas.height = window.innerHeight;
      }
    });
    this.confettiCanvas.width = window.innerWidth;
    this.confettiCanvas.height = window.innerHeight;
  }

  triggerConfetti() {
    if (!this.confettiCanvas || !this.confettiCtx) return;
    const colors = ['#f59e0b', '#38bdf8', '#10b981', '#ec4899', '#8b5cf6', '#fbbf24'];
    this.confettiParticles = [];

    for (let i = 0; i < 90; i++) {
      this.confettiParticles.push({
        x: window.innerWidth / 2 + (Math.random() * 200 - 100),
        y: window.innerHeight / 2 - 50,
        vx: (Math.random() - 0.5) * 16,
        vy: (Math.random() - 0.9) * 18,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 8 + 4,
        rot: Math.random() * 360,
        rotSpeed: Math.random() * 10 - 5,
        alpha: 1
      });
    }

    if (!this.confettiRunning) {
      this.confettiRunning = true;
      this.animateConfetti();
    }
  }

  animateConfetti() {
    if (!this.confettiCtx || !this.confettiCanvas) return;
    this.confettiCtx.clearRect(0, 0, this.confettiCanvas.width, this.confettiCanvas.height);

    let activeCount = 0;
    this.confettiParticles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.35; // gravity
      p.rot += p.rotSpeed;
      p.alpha -= 0.009;

      if (p.alpha > 0) {
        activeCount++;
        this.confettiCtx.save();
        this.confettiCtx.globalAlpha = Math.max(0, p.alpha);
        this.confettiCtx.translate(p.x, p.y);
        this.confettiCtx.rotate((p.rot * Math.PI) / 180);
        this.confettiCtx.fillStyle = p.color;
        this.confettiCtx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        this.confettiCtx.restore();
      }
    });

    if (activeCount > 0) {
      requestAnimationFrame(() => this.animateConfetti());
    } else {
      this.confettiRunning = false;
      this.confettiCtx.clearRect(0, 0, this.confettiCanvas.width, this.confettiCanvas.height);
    }
  }
}

// Instantiate and start
window.addEventListener('DOMContentLoaded', () => {
  const game = new GameController();
  game.init();
});
