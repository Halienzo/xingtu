import { useEffect, useRef, useState } from 'react';
import { Maximize2, Play, X } from 'lucide-react';

interface HalienzoUniversePlayerProps {
  isOpen: boolean;
  onClose: () => void;
}

const VIDEO_SRC = `${import.meta.env.BASE_URL}universe/Halienzo-Universe.mp4`;

export default function HalienzoUniversePlayer({ isOpen, onClose }: HalienzoUniversePlayerProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [needsManualStart, setNeedsManualStart] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) {
      videoRef.current?.pause();
      setNeedsManualStart(false);
      return;
    }
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = 0;
    const playAttempt = video.play();
    if (playAttempt) {
      playAttempt
        .then(() => setNeedsManualStart(false))
        .catch(() => setNeedsManualStart(true));
    }
  }, [isOpen]);

  const startVideo = () => {
    videoRef.current?.play()
      .then(() => setNeedsManualStart(false))
      .catch(() => setNeedsManualStart(true));
  };

  const enterFullscreen = () => {
    const fullscreenAttempt = videoRef.current?.requestFullscreen?.();
    fullscreenAttempt?.catch(() => {});
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[130] overflow-hidden bg-black text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(212,175,55,0.14),transparent_30%),radial-gradient(circle_at_20%_80%,rgba(59,130,246,0.12),transparent_35%),linear-gradient(180deg,#020617_0%,#000_100%)]" />
      <div className="relative z-10 flex h-full min-h-dvh flex-col">
        <header className="flex items-center justify-between px-4 py-3 sm:px-6">
          <div>
            <div className="text-xs uppercase tracking-[0.28em] text-amber-200/70">Halienzo</div>
            <h1 className="text-lg font-black text-amber-100 sm:text-2xl">Universe</h1>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={enterFullscreen}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white backdrop-blur transition hover:bg-white/20"
              aria-label="全屏播放"
              title="全屏播放"
            >
              <Maximize2 size={18} />
            </button>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white backdrop-blur transition hover:bg-white/20"
              aria-label="关闭视频"
              title="关闭视频"
            >
              <X size={19} />
            </button>
          </div>
        </header>

        <main className="relative flex min-h-0 flex-1 items-center justify-center px-3 pb-5 sm:px-6">
          <video
            ref={videoRef}
            src={VIDEO_SRC}
            controls
            autoPlay
            playsInline
            preload="auto"
            className="max-h-full w-full max-w-6xl rounded-lg bg-black object-contain shadow-2xl shadow-black"
          />
          {needsManualStart && (
            <button
              type="button"
              onClick={startVideo}
              className="absolute left-1/2 top-1/2 inline-flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-full border border-amber-200/40 bg-black/70 px-5 py-3 text-sm font-black text-amber-100 shadow-2xl backdrop-blur transition hover:bg-black/85"
            >
              <Play size={18} fill="currentColor" />
              播放
            </button>
          )}
        </main>
      </div>
    </div>
  );
}
