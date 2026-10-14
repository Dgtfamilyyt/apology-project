/**
 * Web Audio API romantic ambient soundscape & sound effects generator.
 * 100% self-contained, offline-ready, zero network latency or broken external URLs.
 */

class RomanticAudioManager {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private intervalId: number | null = null;
  private masterGain: GainNode | null = null;
  private chordIndex: number = 0;

  // Gentle emotive chord progression (Fmaj7 - C - Dm7 - Bbmaj7) frequencies in Hz
  private chords = [
    [174.61, 220.00, 261.63, 329.63], // F, A, C, E (Fmaj7)
    [130.81, 196.00, 261.63, 329.63], // C, G, C, E (C)
    [146.83, 220.00, 261.63, 349.23], // D, A, C, F (Dm7)
    [116.54, 174.61, 233.08, 293.66], // Bb, F, Bb, D (Bb)
  ];

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.2, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public playAmbient(): boolean {
    try {
      this.initContext();
      if (!this.ctx || !this.masterGain) return false;

      this.isPlaying = true;
      this.playNextChord();

      // Trigger chord progression every 4.5 seconds
      if (this.intervalId) clearInterval(this.intervalId);
      this.intervalId = window.setInterval(() => {
        if (this.isPlaying) {
          this.playNextChord();
        }
      }, 4500);

      return true;
    } catch {
      return false;
    }
  }

  private playNextChord() {
    if (!this.ctx || !this.masterGain || !this.isPlaying) return;

    const chord = this.chords[this.chordIndex];
    this.chordIndex = (this.chordIndex + 1) % this.chords.length;

    const now = this.ctx.currentTime;

    chord.forEach((freq, i) => {
      if (!this.ctx || !this.masterGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      // Warm tone
      osc.type = i === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, now + i * 0.15);

      // Lowpass filter for smooth, cozy warmth (avoid harsh highs)
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(650, now);

      // Delicate envelope
      const startTime = now + i * 0.15;
      gain.gain.setValueAtTime(0.0001, startTime);
      gain.gain.exponentialRampToValueAtTime(0.045 / (i + 1), startTime + 0.6);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 4.2);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      osc.start(startTime);
      osc.stop(startTime + 4.5);
    });
  }

  public stopAmbient() {
    this.isPlaying = false;
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  public toggleAmbient(): boolean {
    if (this.isPlaying) {
      this.stopAmbient();
      return false;
    } else {
      return this.playAmbient();
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  // Soft sparkle chime when unlocking a step
  public playChime() {
    try {
      this.initContext();
      if (!this.ctx || !this.masterGain) return;
      const now = this.ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6

      notes.forEach((freq, idx) => {
        if (!this.ctx || !this.masterGain) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);

        gain.gain.setValueAtTime(0.001, now + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.04, now + idx * 0.08 + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.08 + 1.2);

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 1.3);
      });
    } catch {
      // Audio permission or disabled
    }
  }

  // Gentle flower bloom sound
  public playBloom() {
    try {
      this.initContext();
      if (!this.ctx || !this.masterGain) return;
      const now = this.ctx.currentTime;
      const notes = [440, 554.37, 659.25, 880]; // A4, C#5, E5, A5

      notes.forEach((freq, idx) => {
        if (!this.ctx || !this.masterGain) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.09);

        gain.gain.setValueAtTime(0.001, now + idx * 0.09);
        gain.gain.exponentialRampToValueAtTime(0.035, now + idx * 0.09 + 0.08);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.09 + 1.5);

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.start(now + idx * 0.09);
        osc.stop(now + idx * 0.09 + 1.6);
      });
    } catch {
      // Audio context catch
    }
  }

  // Celebratory harp flourish upon forgiveness
  public playHarpFlourish() {
    try {
      this.initContext();
      if (!this.ctx || !this.masterGain) return;
      const now = this.ctx.currentTime;
      const notes = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99, 1046.50, 1318.51];

      notes.forEach((freq, idx) => {
        if (!this.ctx || !this.masterGain) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.07);

        gain.gain.setValueAtTime(0.001, now + idx * 0.07);
        gain.gain.exponentialRampToValueAtTime(0.06, now + idx * 0.07 + 0.06);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.07 + 2.0);

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.start(now + idx * 0.07);
        osc.stop(now + idx * 0.07 + 2.1);
      });
    } catch {
      // Audio context catch
    }
  }
}

export const romanticAudio = new RomanticAudioManager();
