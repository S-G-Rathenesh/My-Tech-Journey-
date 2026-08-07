// Web Audio API Sound Synthesizer for Cyber Atmosphere & Effects

class AudioManager {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private bgOscillator: OscillatorNode | null = null;
  private cinematicNodes: (OscillatorNode | GainNode | BiquadFilterNode)[] = [];

  constructor() {}

  private initCtx() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.isMuted) {
      this.stopCinematicAudio();
      if (this.bgOscillator) {
        try {
          this.bgOscillator.stop();
          this.bgOscillator = null;
        } catch (e) {
          console.error(e);
        }
      }
    }
    return this.isMuted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public playClick() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(400, this.ctx.currentTime + 0.05);

    gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.05);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.05);
  }

  public playSubtleTyping() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    // Extremely soft mechanical key click
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(1400 + Math.random() * 400, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(300, this.ctx.currentTime + 0.02);

    gain.gain.setValueAtTime(0.02, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.02);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.02);
  }

  public playHover() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(600, this.ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(900, this.ctx.currentTime + 0.04);

    gain.gain.setValueAtTime(0.05, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.001, this.ctx.currentTime + 0.04);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.04);
  }

  public playZoneChime() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const notes = [523.25, 659.25, 783.99, 1046.50];
    notes.forEach((freq, idx) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.08);

      gain.gain.setValueAtTime(0.08, this.ctx.currentTime + idx * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + idx * 0.08 + 0.3);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(this.ctx.currentTime + idx * 0.08);
      osc.stop(this.ctx.currentTime + idx * 0.08 + 0.3);
    });
  }

  public playExaChime() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(1200, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1800, this.ctx.currentTime + 0.15);

    gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.2);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.2);
  }

  public playJumpSound() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'square';
    osc.frequency.setValueAtTime(200, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(500, this.ctx.currentTime + 0.1);

    gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.12);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.12);
  }

  // --- CINEMATIC AUDIO SYNTHESIZERS ---

  public startCinematicSoundscape() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    this.stopCinematicAudio();

    const humOsc = this.ctx.createOscillator();
    const humGain = this.ctx.createGain();
    humOsc.type = 'sawtooth';
    humOsc.frequency.setValueAtTime(45, this.ctx.currentTime);
    humGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
    humGain.gain.linearRampToValueAtTime(0.04, this.ctx.currentTime + 2.0);

    humOsc.connect(humGain);
    humGain.connect(this.ctx.destination);
    humOsc.start();
    this.cinematicNodes.push(humOsc, humGain);

    setTimeout(() => {
      if (!this.ctx || this.isMuted) return;
      const chargeOsc = this.ctx.createOscillator();
      const chargeGain = this.ctx.createGain();

      chargeOsc.type = 'sine';
      chargeOsc.frequency.setValueAtTime(110, this.ctx.currentTime);
      chargeOsc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 4.0);

      chargeGain.gain.setValueAtTime(0.01, this.ctx.currentTime);
      chargeGain.gain.linearRampToValueAtTime(0.06, this.ctx.currentTime + 3.0);
      chargeGain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 4.5);

      chargeOsc.connect(chargeGain);
      chargeGain.connect(this.ctx.destination);
      chargeOsc.start();
      chargeOsc.stop(this.ctx.currentTime + 4.5);
    }, 1000);

    setTimeout(() => {
      if (!this.ctx || this.isMuted) return;
      const clankOsc = this.ctx.createOscillator();
      const clankGain = this.ctx.createGain();

      clankOsc.type = 'triangle';
      clankOsc.frequency.setValueAtTime(150, this.ctx.currentTime);
      clankOsc.frequency.exponentialRampToValueAtTime(60, this.ctx.currentTime + 0.8);

      clankGain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      clankGain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.9);

      clankOsc.connect(clankGain);
      clankGain.connect(this.ctx.destination);
      clankOsc.start();
      clankOsc.stop(this.ctx.currentTime + 0.9);
    }, 3500);

    setTimeout(() => {
      if (!this.ctx || this.isMuted) return;
      const windOsc = this.ctx.createOscillator();
      const windGain = this.ctx.createGain();

      windOsc.type = 'sine';
      windOsc.frequency.setValueAtTime(300, this.ctx.currentTime);
      windOsc.frequency.exponentialRampToValueAtTime(1200, this.ctx.currentTime + 3.5);

      windGain.gain.setValueAtTime(0.01, this.ctx.currentTime);
      windGain.gain.linearRampToValueAtTime(0.08, this.ctx.currentTime + 2.0);
      windGain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 3.5);

      windOsc.connect(windGain);
      windGain.connect(this.ctx.destination);
      windOsc.start();
      windOsc.stop(this.ctx.currentTime + 3.5);
    }, 7000);
  }

  public stopCinematicAudio() {
    this.cinematicNodes.forEach((node) => {
      try {
        if ('stop' in node && typeof node.stop === 'function') {
          node.stop();
        }
        node.disconnect();
      } catch (e) {}
    });
    this.cinematicNodes = [];
  }
}

export const audioManager = new AudioManager();
