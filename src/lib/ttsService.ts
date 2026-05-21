export type TtsAccent = 'en-GB' | 'en-US';
export type TtsSource = 'youdao' | 'browser';

interface SpeakOptions {
  accent?: TtsAccent;
  source?: TtsSource;
  rate?: number;
  pitch?: number;
  volume?: number;
}

let currentAudio: HTMLAudioElement | null = null;
let voicesReady = false;
let cachedVoices: SpeechSynthesisVoice[] = [];

function getSpeechSynthesis() {
  if (typeof window === 'undefined') return null;
  return window.speechSynthesis || null;
}

function loadVoices() {
  const synth = getSpeechSynthesis();
  if (!synth) return [];
  cachedVoices = synth.getVoices().filter(voice => voice.lang.toLowerCase().startsWith('en'));
  return cachedVoices;
}

export function initTtsService() {
  const synth = getSpeechSynthesis();
  if (!synth || voicesReady) return;

  loadVoices();
  if (cachedVoices.length > 0) {
    voicesReady = true;
    return;
  }

  if ('onvoiceschanged' in synth) {
    synth.onvoiceschanged = () => {
      loadVoices();
      voicesReady = true;
    };
  }
}

export function stopTts() {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    currentAudio = null;
  }

  const synth = getSpeechSynthesis();
  if (synth && (synth.speaking || synth.pending || synth.paused)) {
    synth.cancel();
  }
}

function getYoudaoUrl(text: string, accent: TtsAccent) {
  const type = accent === 'en-GB' ? '1' : '2';
  return `https://dict.youdao.com/dictvoice?audio=${encodeURIComponent(text)}&type=${type}`;
}

function chooseBrowserVoice(accent: TtsAccent) {
  const voices = cachedVoices.length ? cachedVoices : loadVoices();
  const normalizedAccent = accent.toLowerCase();
  return (
    voices.find(voice => voice.lang.toLowerCase().startsWith(normalizedAccent)) ||
    voices.find(voice => voice.lang.toLowerCase().startsWith('en-gb')) ||
    voices.find(voice => voice.lang.toLowerCase().startsWith('en')) ||
    null
  );
}

function speakWithBrowser(text: string, options: SpeakOptions): Promise<boolean> {
  return new Promise(resolve => {
    const synth = getSpeechSynthesis();
    if (!synth || typeof SpeechSynthesisUtterance === 'undefined') {
      resolve(false);
      return;
    }

    try {
      if (synth.paused) synth.resume();
      if (synth.speaking || synth.pending) synth.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      const accent = options.accent || 'en-GB';
      const voice = chooseBrowserVoice(accent);
      if (voice) utterance.voice = voice;
      utterance.lang = voice?.lang || accent;
      utterance.rate = options.rate || 0.88;
      utterance.pitch = options.pitch || 1;
      utterance.volume = options.volume ?? 1;
      utterance.onend = () => resolve(true);
      utterance.onerror = () => resolve(false);
      synth.speak(utterance);
      window.setTimeout(() => resolve(true), Math.max(1800, text.length * 90));
    } catch {
      resolve(false);
    }
  });
}

function speakWithYoudao(text: string, options: SpeakOptions): Promise<boolean> {
  return new Promise(resolve => {
    if (typeof Audio === 'undefined') {
      resolve(false);
      return;
    }

    try {
      const accent = options.accent || 'en-GB';
      currentAudio = new Audio(getYoudaoUrl(text, accent));
      currentAudio.playbackRate = options.rate || 1;
      currentAudio.volume = options.volume ?? 1;
      currentAudio.onended = () => resolve(true);
      currentAudio.onerror = () => resolve(false);
      currentAudio.play().catch(() => resolve(false));
    } catch {
      resolve(false);
    }
  });
}

export async function speakEnglish(text: string, options: SpeakOptions = {}) {
  const cleanText = text.trim();
  if (!cleanText) return false;

  stopTts();
  initTtsService();

  if ((options.source || 'youdao') === 'youdao') {
    const ok = await speakWithYoudao(cleanText, options);
    if (ok) return true;
  }

  return speakWithBrowser(cleanText, options);
}
