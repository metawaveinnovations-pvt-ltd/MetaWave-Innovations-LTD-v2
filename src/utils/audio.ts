let audioCtx: AudioContext | null = null;

function getAudioContext() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  return audioCtx;
}

export function isSoundEnabled(): boolean {
  if (typeof window === 'undefined') return false;
  const saved = localStorage.getItem('mwi_sound_enabled');
  return saved === null ? true : saved === 'true';
}

export function setSoundEnabled(enabled: boolean) {
  if (typeof window === 'undefined') return;
  localStorage.setItem('mwi_sound_enabled', enabled ? 'true' : 'false');
  // Dispatch a custom event so other components (e.g., Navbar) can update state if needed
  window.dispatchEvent(new Event('mwi_sound_changed'));
}

export type SoundType = 'click' | 'success' | 'toggle' | 'hover' | 'nav' | 'service' | 'form_input';

export function playSound(type: SoundType) {
  if (!isSoundEnabled()) return;

  const ctx = getAudioContext();
  if (!ctx) return;

  // Resume context if suspended (browser autoplay security policy)
  if (ctx.state === 'suspended') {
    ctx.resume().catch(() => {});
  }

  try {
    const now = ctx.currentTime;

    if (type === 'click') {
      // Subtle premium snappy UI click - snappy transient
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(640, now);
      osc.frequency.exponentialRampToValueAtTime(140, now + 0.04);

      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.04);
    } else if (type === 'nav') {
      // Elegant high-pitched minimalist "airy pop / water droplet" sound for navigation tabs
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(1050, now);
      osc.frequency.exponentialRampToValueAtTime(680, now + 0.035);

      gain.gain.setValueAtTime(0.02, now); // soft, delicate
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.035);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.035);
    } else if (type === 'service') {
      // Organic "wooden/kalimba pluck" tone - low frequency warm organic decay
      const oscCore = ctx.createOscillator();
      const oscHarmonic = ctx.createOscillator();
      const gainCore = ctx.createGain();
      const gainHarmonic = ctx.createGain();

      oscCore.type = 'triangle';
      oscCore.frequency.setValueAtTime(329.63, now); // E4 warm note
      oscCore.frequency.exponentialRampToValueAtTime(280, now + 0.12);

      oscHarmonic.type = 'sine';
      oscHarmonic.frequency.setValueAtTime(659.25, now); // E5 (1st harmonic for pluck character)
      oscHarmonic.frequency.exponentialRampToValueAtTime(500, now + 0.08);

      gainCore.gain.setValueAtTime(0.035, now);
      gainCore.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

      gainHarmonic.gain.setValueAtTime(0.015, now);
      gainHarmonic.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

      oscCore.connect(gainCore);
      gainCore.connect(ctx.destination);

      oscHarmonic.connect(gainHarmonic);
      gainHarmonic.connect(ctx.destination);

      oscCore.start(now);
      oscCore.stop(now + 0.12);
      oscHarmonic.start(now);
      oscHarmonic.stop(now + 0.12);
    } else if (type === 'form_input') {
      // Ultra-short premium paper-like page tap/tick for focus or option clicks
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(950, now);
      osc.frequency.exponentialRampToValueAtTime(800, now + 0.015);

      gain.gain.setValueAtTime(0.01, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.015);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.015);
    } else if (type === 'hover') {
      // Very gentle micro hover tick (high-pass aesthetic)
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(850, now);
      osc.frequency.exponentialRampToValueAtTime(450, now + 0.02);

      gain.gain.setValueAtTime(0.012, now); // ultra soft/subtle
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.02);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.02);
    } else if (type === 'toggle') {
      // Pleasant double-tone interactive chime
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = 'triangle';
      osc1.frequency.setValueAtTime(523.25, now); // C5
      gain1.gain.setValueAtTime(0.03, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.08);

      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(659.25, now + 0.03); // E5
      gain2.gain.setValueAtTime(0.03, now + 0.03);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start(now + 0.03);
      osc2.stop(now + 0.15);
    } else if (type === 'success') {
      // Elegant ascending major arpeggio chord
      const playChimeNode = (freq: number, startTime: number, duration: number, vol: number) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, startTime);
        
        gain.gain.setValueAtTime(vol, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + duration);
      };

      // C5 -> E5 -> G5 -> C6 arpeggio with high aesthetic values
      playChimeNode(523.25, now, 0.18, 0.025);
      playChimeNode(659.25, now + 0.05, 0.18, 0.025);
      playChimeNode(783.99, now + 0.10, 0.18, 0.025);
      playChimeNode(1046.50, now + 0.15, 0.28, 0.035);
    }
  } catch (error) {
    console.warn("Audio feedback play failed:", error);
  }
}
