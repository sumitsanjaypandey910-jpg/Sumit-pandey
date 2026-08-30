/**
 * Web Audio API Synthesizer for 1LINE puzzle game audio effects
 * Rich, responsive procedural sound effects with zero external audio assets
 */

class SoundEngine {
  private ctx: AudioContext | null = null;
  private soundEnabled: boolean = true;

  constructor() {
    // AudioContext will be initialized on first user gesture
  }

  public setEnabled(enabled: boolean) {
    this.soundEnabled = enabled;
  }

  public isEnabled(): boolean {
    return this.soundEnabled;
  }

  private initContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  /**
   * Ascending pentatonic melody scale with harmonic overtone chime
   * Progressively brightens as player approaches puzzle completion
   */
  public playDotConnect(stepIndex: number = 0, totalSteps: number = 10) {
    if (!this.soundEnabled) return;
    try {
      const ctx = this.initContext();
      if (!ctx) return;

      const pentatonic = [
        261.63, // C4
        293.66, // D4
        329.63, // E4
        392.00, // G4
        440.00, // A4
        523.25, // C5
        587.33, // D5
        659.25, // E5
        783.99, // G5
        880.00, // A5
        1046.50, // C6
        1174.66, // D6
        1318.51  // E6
      ];

      const noteIdx = stepIndex % pentatonic.length;
      const baseFreq = pentatonic[noteIdx];
      const progressRatio = Math.min(1, stepIndex / Math.max(1, totalSteps));
      const now = ctx.currentTime;

      // Master gain for this note
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.18 + progressRatio * 0.08, now);
      masterGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.28);
      masterGain.connect(ctx.destination);

      // Fundamental sine wave (warm bell body)
      const osc1 = ctx.createOscillator();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(baseFreq, now);
      osc1.frequency.exponentialRampToValueAtTime(baseFreq * 1.015, now + 0.06);

      const gain1 = ctx.createGain();
      gain1.gain.setValueAtTime(0.8, now);
      gain1.gain.exponentialRampToValueAtTime(0.01, now + 0.24);
      osc1.connect(gain1);
      gain1.connect(masterGain);

      // Shimmer overtone (glassy bell resonance)
      const osc2 = ctx.createOscillator();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(baseFreq * 2.0, now);
      osc2.frequency.exponentialRampToValueAtTime(baseFreq * 2.02, now + 0.05);

      const gain2 = ctx.createGain();
      gain2.gain.setValueAtTime(0.35 + progressRatio * 0.2, now);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.16);
      osc2.connect(gain2);
      gain2.connect(masterGain);

      // High crystal sparkle for later steps
      if (progressRatio > 0.6) {
        const osc3 = ctx.createOscillator();
        osc3.type = 'sine';
        osc3.frequency.setValueAtTime(baseFreq * 4.0, now);
        const gain3 = ctx.createGain();
        gain3.gain.setValueAtTime(0.15, now);
        gain3.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
        osc3.connect(gain3);
        gain3.connect(masterGain);
        osc3.start(now);
        osc3.stop(now + 0.15);
      }

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 0.3);
      osc2.stop(now + 0.3);
    } catch {
      // Audio fallback silent
    }
  }

  /**
   * Sound when user taps/selects a dot or node
   */
  public playDotSelect() {
    if (!this.soundEnabled) return;
    try {
      const ctx = this.initContext();
      if (!ctx) return;
      const now = ctx.currentTime;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, now); // C5
      osc.frequency.exponentialRampToValueAtTime(659.25, now + 0.07); // E5

      gain.gain.setValueAtTime(0.14, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.14);
    } catch {
      // ignore
    }
  }

  /**
   * Subtle glassy tick when hovering over or entering a dot
   */
  public playDotHover() {
    if (!this.soundEnabled) return;
    try {
      const ctx = this.initContext();
      if (!ctx) return;
      const now = ctx.currentTime;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, now); // A5

      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.05);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.06);
    } catch {
      // ignore
    }
  }

  /**
   * Invalid / blocked stroke sound (soft subtle rejection)
   */
  public playInvalidMove() {
    if (!this.soundEnabled) return;
    try {
      const ctx = this.initContext();
      if (!ctx) return;
      const now = ctx.currentTime;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(160, now);
      osc.frequency.linearRampToValueAtTime(110, now + 0.12);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

      // Low pass filter for soft organic woodblock sound
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(400, now);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.16);
    } catch {
      // ignore
    }
  }

  /**
   * Undo sound (gentle descending reverse droplet)
   */
  public playUndo() {
    if (!this.soundEnabled) return;
    try {
      const ctx = this.initContext();
      if (!ctx) return;
      const now = ctx.currentTime;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, now); // D5
      osc.frequency.exponentialRampToValueAtTime(329.63, now + 0.11); // E4

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.13);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.14);
    } catch {
      // ignore
    }
  }

  /**
   * Reset board sound (airy breeze sweep)
   */
  public playReset() {
    if (!this.soundEnabled) return;
    try {
      const ctx = this.initContext();
      if (!ctx) return;
      const now = ctx.currentTime;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(392, now); // G4
      osc.frequency.exponentialRampToValueAtTime(196, now + 0.2); // G3

      gain.gain.setValueAtTime(0.13, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.24);
    } catch {
      // ignore
    }
  }

  /**
   * Shimmering mystical harp / celestial hint glissando
   */
  public playHint() {
    if (!this.soundEnabled) return;
    try {
      const ctx = this.initContext();
      if (!ctx) return;
      const now = ctx.currentTime;

      const freqs = [659.25, 783.99, 987.77, 1318.51]; // E5, G5, B5, E6
      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const noteTime = now + idx * 0.045;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, noteTime);

        gain.gain.setValueAtTime(0.001, now);
        gain.gain.setValueAtTime(0.12, noteTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, noteTime + 0.35);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(noteTime);
        osc.stop(noteTime + 0.38);
      });
    } catch {
      // ignore
    }
  }

  /**
   * Level victory fanfare / arpeggiated triumph chord with bell resonance
   */
  public playLevelComplete() {
    if (!this.soundEnabled) return;
    try {
      const ctx = this.initContext();
      if (!ctx) return;

      const notes = [
        { freq: 523.25, time: 0.00 }, // C5
        { freq: 659.25, time: 0.08 }, // E5
        { freq: 783.99, time: 0.16 }, // G5
        { freq: 1046.50, time: 0.24 }, // C6
        { freq: 1318.51, time: 0.32 }, // E6
        { freq: 1567.98, time: 0.40 }  // G6
      ];

      const now = ctx.currentTime;
      notes.forEach(({ freq, time }) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const noteStart = now + time;

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, noteStart);

        gain.gain.setValueAtTime(0.001, now);
        gain.gain.setValueAtTime(0.2, noteStart);
        gain.gain.exponentialRampToValueAtTime(0.001, noteStart + 0.65);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(noteStart);
        osc.stop(noteStart + 0.7);
      });
    } catch {
      // ignore
    }
  }

  /**
   * Distinct chime for each star earned in the victory modal
   */
  public playStarEarn(starIndex: number = 0) {
    if (!this.soundEnabled) return;
    try {
      const ctx = this.initContext();
      if (!ctx) return;

      const freqs = [783.99, 1046.50, 1318.51]; // G5, C6, E6
      const baseFreq = freqs[Math.min(starIndex, freqs.length - 1)];
      const now = ctx.currentTime;

      const osc = ctx.createOscillator();
      const overtone = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(baseFreq, now);
      overtone.type = 'triangle';
      overtone.frequency.setValueAtTime(baseFreq * 2, now);

      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.45);

      osc.connect(gain);
      overtone.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      overtone.start(now);
      osc.stop(now + 0.48);
      overtone.stop(now + 0.48);
    } catch {
      // ignore
    }
  }

  /**
   * Daily challenge completion fanfare
   */
  public playDailyComplete() {
    if (!this.soundEnabled) return;
    try {
      const ctx = this.initContext();
      if (!ctx) return;

      const notes = [
        { freq: 440.00, time: 0.00 }, // A4
        { freq: 554.37, time: 0.07 }, // C#5
        { freq: 659.25, time: 0.14 }, // E5
        { freq: 880.00, time: 0.21 }, // A5
        { freq: 1108.73, time: 0.28 }, // C#6
        { freq: 1318.51, time: 0.35 }  // E6
      ];

      const now = ctx.currentTime;
      notes.forEach(({ freq, time }) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const noteStart = now + time;

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, noteStart);

        gain.gain.setValueAtTime(0.001, now);
        gain.gain.setValueAtTime(0.22, noteStart);
        gain.gain.exponentialRampToValueAtTime(0.001, noteStart + 0.7);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(noteStart);
        osc.stop(noteStart + 0.75);
      });
    } catch {
      // ignore
    }
  }

  /**
   * Smooth modal open / sheet slide sound
   */
  public playModalOpen() {
    if (!this.soundEnabled) return;
    try {
      const ctx = this.initContext();
      if (!ctx) return;
      const now = ctx.currentTime;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(540, now + 0.08);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.11);
    } catch {
      // ignore
    }
  }

  /**
   * Smooth modal close sound
   */
  public playModalClose() {
    if (!this.soundEnabled) return;
    try {
      const ctx = this.initContext();
      if (!ctx) return;
      const now = ctx.currentTime;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(540, now);
      osc.frequency.exponentialRampToValueAtTime(300, now + 0.08);

      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.1);
    } catch {
      // ignore
    }
  }

  /**
   * UI Click / button press
   */
  public playClick() {
    if (!this.soundEnabled) return;
    try {
      const ctx = this.initContext();
      if (!ctx) return;
      const now = ctx.currentTime;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, now);
      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.05);
    } catch {
      // ignore
    }
  }
}

export const soundManager = new SoundEngine();

/**
 * Device vibration trigger for mobile/touch
 */
export function triggerHaptic(type: 'light' | 'medium' | 'success' | 'warning' = 'light') {
  if (typeof window !== 'undefined' && 'vibrate' in navigator) {
    try {
      if (type === 'light') navigator.vibrate(8);
      else if (type === 'medium') navigator.vibrate(20);
      else if (type === 'warning') navigator.vibrate([20, 30, 20]);
      else if (type === 'success') navigator.vibrate([15, 40, 30, 40, 50]);
    } catch {
      // Ignore vibration failures
    }
  }
}
