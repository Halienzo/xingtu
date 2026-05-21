// ============================================
// 星图 - 背景音乐播放器
// 支持 Vincent.mp3 + 2首备选星空主题BGM
// ============================================
import { useState, useRef, useEffect, useCallback } from 'react';
import { Music, Volume2, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Track {
  id: string;
  name: string;
  artist: string;
  src: string;
}

const TRACKS: Track[] = [
  {
    id: 'vincent',
    name: 'Vincent',
    artist: 'Don McLean',
    src: './Vincent.mp3',
  },
  {
    id: 'starlight',
    name: 'A Brief History of Time',
    artist: 'Star study BGM',
    src: './A Brief History of Time.mp3',
  },
  {
    id: 'starrynight',
    name: 'The Whirling Ways of Stars that Pass',
    artist: 'Star study BGM',
    src: './The Whirling Ways of Stars that Pass.mp3',
  },
];

// 合成星空主题背景音乐
function synthesizeAmbient(type: string): OscillatorNode | null {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    
    if (type === 'starlight') {
      // 柔和星光琶音
      const gain = ctx.createGain();
      gain.gain.value = 0.08;
      gain.connect(ctx.destination);

      const notes = [261.63, 329.63, 392.00, 523.25, 392.00, 329.63];
      let noteIndex = 0;

      const playNote = () => {
        const osc = ctx.createOscillator();
        const noteGain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.value = notes[noteIndex % notes.length];
        noteGain.gain.setValueAtTime(0.06, ctx.currentTime);
        noteGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 2);
        osc.connect(noteGain);
        noteGain.connect(gain);
        osc.start();
        osc.stop(ctx.currentTime + 2);
        noteIndex++;
        setTimeout(playNote, 2200);
      };
      playNote();
      return null;
    }

    if (type === 'starrynight') {
      // 深沉星空氛围
      const gain = ctx.createGain();
      gain.gain.value = 0.06;
      gain.connect(ctx.destination);

      const osc1 = ctx.createOscillator();
      osc1.type = 'sine';
      osc1.frequency.value = 130.81; // C3
      osc1.connect(gain);
      osc1.start();

      const osc2 = ctx.createOscillator();
      osc2.type = 'triangle';
      osc2.frequency.value = 196.00; // G3
      const gain2 = ctx.createGain();
      gain2.gain.value = 0.03;
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start();

      return osc1;
    }

    return null;
  } catch {
    return null;
  }
}

export default function BackgroundMusic() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const synthRef = useRef<OscillatorNode | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // 点击外部关闭
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, []);

  const stopAll = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
    if (synthRef.current) {
      try { synthRef.current.stop(); } catch {}
      synthRef.current = null;
    }
  }, []);

  const playTrack = useCallback((trackId: string) => {
    stopAll();
    const track = TRACKS.find(t => t.id === trackId);
    if (!track) return;

    if (track.src) {
      // 播放MP3文件
      const audio = new Audio(track.src);
      audio.loop = true;
      audio.volume = volume;
      audio.play().catch(() => {
        // 用户未交互时无法自动播放
      });
      audioRef.current = audio;
    } else {
      // 合成音频
      synthRef.current = synthesizeAmbient(trackId);
    }

    setCurrentTrack(trackId);
    setIsPlaying(true);
  }, [stopAll, volume]);

  const togglePlay = useCallback(() => {
    if (!currentTrack) {
      playTrack('vincent');
      return;
    }

    if (isPlaying) {
      if (audioRef.current) audioRef.current.pause();
      if (synthRef.current) {
        try { synthRef.current.stop(); } catch {}
      }
      setIsPlaying(false);
    } else {
      if (audioRef.current) audioRef.current.play().catch(() => {});
      else playTrack(currentTrack);
      setIsPlaying(true);
    }
  }, [currentTrack, isPlaying, playTrack]);

  const handleVolumeChange = (v: number) => {
    setVolume(v);
    if (audioRef.current) audioRef.current.volume = v;
  };

  const handleTrackSelect = (trackId: string) => {
    if (currentTrack === trackId) {
      togglePlay();
    } else {
      playTrack(trackId);
    }
  };

  return (
    <div ref={containerRef} className="fixed bottom-20 right-4 z-50 flex flex-col items-end">
      {/* 播放控制面板 */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="mb-2 p-4 rounded-2xl bg-slate-900/95 backdrop-blur-lg border border-amber-500/20 shadow-2xl shadow-amber-500/10 w-64"
          >
            <h4 className="text-xs font-semibold text-amber-400 mb-3 tracking-wider">背景音乐</h4>

            {/* 曲目列表 */}
            <div className="space-y-2 mb-4">
              {TRACKS.map(track => (
                <button
                  key={track.id}
                  onClick={() => handleTrackSelect(track.id)}
                  className={`w-full flex items-center gap-3 p-2 rounded-xl transition-all text-left ${
                    currentTrack === track.id && isPlaying
                      ? 'bg-amber-500/20 border border-amber-500/30'
                      : 'bg-white/5 border border-white/5 hover:bg-white/10'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    currentTrack === track.id && isPlaying
                      ? 'bg-amber-500 text-white'
                      : 'bg-slate-700 text-slate-400'
                  }`}>
                    {currentTrack === track.id && isPlaying ? (
                      <div className="flex gap-0.5">
                        <motion.div animate={{ height: [4, 12, 4] }} transition={{ repeat: Infinity, duration: 0.6 }} className="w-1 bg-white rounded-full" />
                        <motion.div animate={{ height: [8, 4, 12] }} transition={{ repeat: Infinity, duration: 0.5 }} className="w-1 bg-white rounded-full" />
                        <motion.div animate={{ height: [6, 10, 6] }} transition={{ repeat: Infinity, duration: 0.7 }} className="w-1 bg-white rounded-full" />
                      </div>
                    ) : (
                      <Music size={14} />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-medium truncate">{track.name}</p>
                    <p className="text-slate-500 text-xs truncate">{track.artist}</p>
                  </div>
                  {currentTrack === track.id && (
                    <span className={`text-xs ${isPlaying ? 'text-amber-400' : 'text-slate-500'}`}>
                      {isPlaying ? '播放中' : '已暂停'}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* 音量控制 */}
            <div className="flex items-center gap-3">
              <button onClick={() => handleVolumeChange(volume === 0 ? 0.3 : 0)} className="text-slate-400 hover:text-white transition-colors">
                {volume === 0 ? <VolumeX size={16} /> : <Volume2 size={16} />}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={volume}
                onChange={e => handleVolumeChange(parseFloat(e.target.value))}
                className="flex-1 h-1 bg-slate-700 rounded-full appearance-none cursor-pointer accent-amber-500"
              />
              <span className="text-slate-500 text-xs w-8 text-right">{Math.round(volume * 100)}%</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 浮动按钮 */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all border ${
          isPlaying
            ? 'bg-amber-600 border-amber-400/30 shadow-amber-500/30'
            : 'bg-slate-800 border-white/10'
        }`}
      >
        {isPlaying ? (
          <div className="flex gap-0.5">
            <motion.div animate={{ height: [4, 10, 4] }} transition={{ repeat: Infinity, duration: 0.5 }} className="w-0.5 bg-white rounded-full" />
            <motion.div animate={{ height: [7, 4, 10] }} transition={{ repeat: Infinity, duration: 0.6 }} className="w-0.5 bg-white rounded-full" />
            <motion.div animate={{ height: [5, 9, 5] }} transition={{ repeat: Infinity, duration: 0.4 }} className="w-0.5 bg-white rounded-full" />
          </div>
        ) : (
          <Music size={18} className="text-slate-400" />
        )}
      </motion.button>
    </div>
  );
}
