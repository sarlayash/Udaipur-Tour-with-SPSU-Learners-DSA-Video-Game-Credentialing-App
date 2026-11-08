// State Manager for SPSU Udaipur DSA Quest
// Stores learner progress, XP, badges, unlocked zones and credential ID

const STORAGE_KEY = 'SPSU_UDAIPUR_DSA_QUEST_STATE_V1';

export class GameState {
  constructor() {
    this.name = '';
    this.xp = 0;
    this.level = 1;
    this.badges = [];
    this.unlockedZones = [1]; // Zone 1 starts unlocked
    this.currentZoneId = 1;
    this.credentialId = '';
    this.journeyStarted = false;
    this.startedAt = null;
    this.completedAt = null;
    this.listeners = [];

    this.load();
  }

  load() {
    try {
      if (typeof localStorage === 'undefined') return;
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const data = JSON.parse(saved);
        this.name = data.name || '';
        this.xp = data.xp || 0;
        this.level = this.calculateLevel(this.xp);
        this.badges = Array.isArray(data.badges) ? data.badges : [];
        this.unlockedZones = Array.isArray(data.unlockedZones) && data.unlockedZones.length > 0 ? data.unlockedZones : [1];
        this.currentZoneId = data.currentZoneId || 1;
        this.credentialId = data.credentialId || this.generateCredentialId();
        this.journeyStarted = Boolean(data.journeyStarted && this.name.trim().length > 0);
        this.startedAt = data.startedAt || new Date().toISOString();
        this.completedAt = data.completedAt || null;
      }
    } catch (e) {
      console.warn('Could not load existing game state:', e);
    }
  }

  save() {
    try {
      if (typeof localStorage === 'undefined') {
        this.notify();
        return;
      }
      const data = {
        name: this.name,
        xp: this.xp,
        level: this.level,
        badges: this.badges,
        unlockedZones: this.unlockedZones,
        currentZoneId: this.currentZoneId,
        credentialId: this.credentialId,
        journeyStarted: this.journeyStarted,
        startedAt: this.startedAt,
        completedAt: this.completedAt
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      this.notify();
    } catch (e) {
      console.warn('Could not save game state:', e);
    }
  }

  subscribe(callback) {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter(cb => cb !== callback);
    };
  }

  notify() {
    this.listeners.forEach(cb => {
      try {
        cb(this);
      } catch (err) {
        console.error('State observer error:', err);
      }
    });
  }

  generateCredentialId() {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let rand = '';
    for (let i = 0; i < 6; i++) {
      rand += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    const year = new Date().getFullYear();
    return `SPSU-UDR-DSA-${year}-${rand}`;
  }

  startJourney(learnerName) {
    const trimmed = (learnerName || '').trim();
    if (!trimmed) return false;
    this.name = trimmed;
    this.journeyStarted = true;
    if (!this.credentialId) {
      this.credentialId = this.generateCredentialId();
    }
    if (!this.startedAt) {
      this.startedAt = new Date().toISOString();
    }
    // Award the Welcome Badge if not already present
    this.awardBadge({
      id: 'badge-welcome',
      name: 'SPSU Scholar Emblem',
      icon: '🎓',
      desc: 'Embarked on the royal Udaipur Tour with SPSU learners to conquer DSA • Powered By Kapil'
    }, 50);

    this.save();
    return true;
  }

  calculateLevel(xp) {
    // Level formula: Level 1 at 0 XP, Level 2 at 200 XP, Level 3 at 450, etc.
    if (xp < 200) return 1;
    if (xp < 450) return 2;
    if (xp < 750) return 3;
    if (xp < 1100) return 4;
    if (xp < 1500) return 5;
    if (xp < 1950) return 6;
    if (xp < 2450) return 7;
    if (xp < 3000) return 8;
    if (xp < 3600) return 9;
    if (xp < 4300) return 10;
    return 11; // Grandmaster Level
  }

  getLevelTitle(level = this.level) {
    const titles = {
      1: 'Novice Explorer',
      2: 'Contiguous Array Apprentice',
      3: 'Linked List Voyager',
      4: 'Royal Stack & Queue Warden',
      5: 'Backtracking Enchanter',
      6: 'Divide & Conquer Strategist',
      7: 'Monsoon Tree Sage',
      8: 'Gangaur Heap Crafter',
      9: 'Aravalli Graph Navigator',
      10: 'Kumbhalgarh DP Champion',
      11: 'SPSU Grand DSA Architect'
    };
    return titles[level] || 'SPSU DSA Legend';
  }

  addXP(amount) {
    const oldLevel = this.level;
    this.xp += amount;
    this.level = this.calculateLevel(this.xp);
    const leveledUp = this.level > oldLevel;
    this.save();
    return { newXP: this.xp, leveledUp, level: this.level, title: this.getLevelTitle() };
  }

  awardBadge(badgeObj, xpBonus = 0) {
    if (!badgeObj || !badgeObj.id) return false;
    const exists = this.badges.some(b => b.id === badgeObj.id);
    if (!exists) {
      this.badges.push({
        ...badgeObj,
        unlockedAt: new Date().toISOString()
      });
      if (xpBonus > 0) {
        this.addXP(xpBonus);
      } else {
        this.save();
      }
      return true;
    }
    return false;
  }

  unlockNextZone(currentZoneId) {
    const nextId = currentZoneId + 1;
    let newlyUnlocked = false;
    if (nextId <= 10 && !this.unlockedZones.includes(nextId)) {
      this.unlockedZones.push(nextId);
      newlyUnlocked = true;
    }
    if (this.unlockedZones.length >= 10 && !this.completedAt) {
      this.completedAt = new Date().toISOString();
    }
    this.save();
    return { newlyUnlocked, nextId };
  }

  hasBadge(badgeId) {
    return this.badges.some(b => b.id === badgeId);
  }

  isZoneUnlocked(zoneId) {
    return this.unlockedZones.includes(zoneId);
  }

  resetProgress() {
    this.xp = 0;
    this.level = 1;
    this.badges = [];
    this.unlockedZones = [1];
    this.currentZoneId = 1;
    this.credentialId = this.generateCredentialId();
    this.journeyStarted = false;
    this.startedAt = null;
    this.completedAt = null;
    localStorage.removeItem(STORAGE_KEY);
    this.notify();
  }
}

export const gameState = new GameState();
