// Web Audio API Synthesizer for Udaipur SPSU DSA Quest
// Zero external assets required, 100% reliable across browsers

class SoundEngine {
  constructor() {
    this.ctx = null;
    this.muted = false;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleMute() {
    this.muted = !this.muted;
    return this.muted;
  }

  playTone(freq, duration = 0.1, type = 'sine', gainVal = 0.15) {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(gainVal, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {
      // Audio context might be restricted before user gesture
    }
  }

  playClick() {
    this.playTone(800, 0.05, 'triangle', 0.1);
  }

  playStep() {
    this.playTone(520, 0.08, 'sine', 0.12);
  }

  playSuccess() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const freqs = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    freqs.forEach((f, idx) => {
      setTimeout(() => {
        this.playTone(f, 0.2, 'triangle', 0.18);
      }, idx * 70);
    });
  }

  playError() {
    if (this.muted) return;
    this.playTone(220, 0.15, 'sawtooth', 0.2);
    setTimeout(() => {
      this.playTone(180, 0.25, 'sawtooth', 0.2);
    }, 120);
  }

  playLevelUp() {
    if (this.muted) return;
    this.init();
    const chords = [440, 554.37, 659.25, 880, 1108.73];
    chords.forEach((f, idx) => {
      setTimeout(() => {
        this.playTone(f, 0.35, 'sine', 0.2);
      }, idx * 90);
    });
  }

  playFanfare() {
    if (this.muted) return;
    this.init();
    const melody = [
      { f: 523, d: 0.15 },
      { f: 659, d: 0.15 },
      { f: 784, d: 0.2 },
      { f: 1046, d: 0.4 },
      { f: 880, d: 0.2 },
      { f: 1046, d: 0.6 }
    ];
    let time = 0;
    melody.forEach(note => {
      setTimeout(() => {
        this.playTone(note.f, note.d, 'triangle', 0.22);
      }, time * 1000);
      time += note.d + 0.05;
    });
  }
}

export const sound = new SoundEngine();
