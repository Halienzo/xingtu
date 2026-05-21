// ============================================
// Starry Starry Night - 音效系统
// 纯Web Audio API实现，无需外部音频文件
// ============================================

let audioContext: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!audioContext) {
    audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  if (audioContext.state === 'suspended') {
    audioContext.resume();
  }
  return audioContext;
}

// 播放合成音效
function playTone(frequency: number, duration: number, type: OscillatorType = 'sine', volume = 0.15, delay = 0) {
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(frequency, ctx.currentTime + delay);
    gain.gain.setValueAtTime(volume, ctx.currentTime + delay);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(ctx.currentTime + delay);
    osc.stop(ctx.currentTime + delay + duration);
  } catch {
    // 静默处理音频错误
  }
}

// 答对音效 - 清脆的上升琶音
export function playCorrectSound() {
  playTone(523, 0.15, 'sine', 0.12);     // C5
  playTone(659, 0.15, 'sine', 0.12, 0.08); // E5
  playTone(784, 0.2, 'sine', 0.15, 0.16);  // G5
  playTone(1047, 0.3, 'sine', 0.1, 0.24);  // C6
}

// 拼对音效 - 更华丽的星光音效
export function playSpellCorrectSound() {
  playTone(440, 0.1, 'sine', 0.1);       // A4
  playTone(554, 0.1, 'sine', 0.1, 0.05);  // C#5
  playTone(659, 0.1, 'sine', 0.12, 0.1);  // E5
  playTone(880, 0.15, 'sine', 0.14, 0.15); // A5
  playTone(1109, 0.2, 'sine', 0.1, 0.2);   // C#6
  playTone(1319, 0.3, 'triangle', 0.08, 0.25); // E6
}

// 答错音效 - 柔和的下降音
export function playWrongSound() {
  playTone(330, 0.15, 'sine', 0.08);     // E4
  playTone(262, 0.2, 'sine', 0.08, 0.1);  // C4
  playTone(196, 0.3, 'sine', 0.06, 0.2);  // G3
}

// 解锁/成就音效 - 辉煌的全音阶
export function playUnlockSound() {
  const notes = [523, 587, 659, 698, 784, 880, 988, 1047];
  notes.forEach((freq, i) => {
    playTone(freq, 0.25, 'sine', 0.1, i * 0.06);
  });
  playTone(1319, 0.5, 'triangle', 0.12, 0.5);
}

// 按钮点击音效 - 轻微的短音
export function playClickSound() {
  playTone(800, 0.05, 'sine', 0.05);
}

// 翻页/切换音效
export function playPageFlipSound() {
  playTone(600, 0.08, 'sine', 0.04);
  playTone(750, 0.1, 'sine', 0.04, 0.04);
}

// 星光闪烁音效（用于悬浮等）
export function playSparkleSound() {
  playTone(1200, 0.08, 'sine', 0.03);
  playTone(1600, 0.06, 'sine', 0.02, 0.03);
}

// 连续答对连击音效
export function playComboSound(combo: number) {
  const baseFreq = 440 + combo * 50;
  playTone(baseFreq, 0.1, 'sine', 0.1);
  playTone(baseFreq * 1.25, 0.15, 'sine', 0.1, 0.05);
  playTone(baseFreq * 1.5, 0.2, 'triangle', 0.08, 0.1);
}

// 初始化用户交互解锁音频
export function initAudioOnInteraction() {
  const handler = () => {
    getAudioContext();
    document.removeEventListener('click', handler);
    document.removeEventListener('touchstart', handler);
  };
  document.addEventListener('click', handler);
  document.addEventListener('touchstart', handler);
}
