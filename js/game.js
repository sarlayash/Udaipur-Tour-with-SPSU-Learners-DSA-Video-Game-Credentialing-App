// Udaipur Tour with SPSU Learners - Main Video Game Engine
// Powered By Kapil • Sir Padampat Singhania University (SPSU)
import { ZONES } from './data/zones.js';
import { gameState } from './state.js';
import { sound } from './audio.js';
import { VisualizerEngine } from './visualizer.js';
import { CertificateGenerator } from './certificate.js';

class GameController {
  constructor() {
    this.visualizer = null;
    this.certGen = new CertificateGenerator(gameState);
    this.activeZone = null;
    this.activeTab = 'theory';
    this.activeCodeLang = 'cpp';
    this.currentTheme = 'dark';
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

    let html = `
      <div class="map-world">
        <!-- Royal Udaipur Map Header Layer -->
        <div class="map-header-banner">
          <div class="map-title-row">
            <span class="royal-crest">🏰</span>
            <div>
              <h2 class="map-heading">ROYAL UDAIPUR DSA EXPEDITION</h2>
              <p class="map-subheading">Select any unlocked landmark across Udaipur to explore algorithms, simulate logic, and conquer challenges.</p>
            </div>
          </div>
          <div class="powered-by-kapil-badge">
            <span>⚡ POWERED BY KAPIL</span>
            <span>•</span>
            <span>SPSU UDAIPUR</span>
          </div>
        </div>

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
            <span class="node-number">Zone ${zone.id}</span>
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

    html += `
        </div>
      </div>
    `;

    this.mapContainer.innerHTML = html;

    // Attach click events
    this.mapContainer.querySelectorAll('.btn-node-action, .map-node-card').forEach(el => {
      el.addEventListener('click', (e) => {
        const zoneId = parseInt(el.dataset.zoneId || el.closest('.map-node-card')?.dataset.zoneId, 10);
        if (zoneId) {
          this.handleNodeClick(zoneId);
        }
      });
    });
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

    this.badgesGrid.innerHTML = ZONES.map(z => {
      const hasEarned = gameState.hasBadge(z.badge.id);
      return `
        <div class="badge-item-card ${hasEarned ? 'badge-earned' : 'badge-unearned'}">
          <div class="badge-item-icon">${z.badge.icon}</div>
          <div class="badge-item-name">${z.badge.name}</div>
          <div class="badge-item-zone">${z.title}</div>
          <p class="badge-item-desc">${z.badge.desc}</p>
          <div class="badge-item-status">${hasEarned ? '✅ UNLOCKED' : '🔒 LOCKED'}</div>
        </div>
      `;
    }).join('');

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
