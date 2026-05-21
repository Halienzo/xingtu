import { useRef, useState } from 'react';
import { BookOpen, CheckCircle2, Headphones, Pause, Play, RotateCcw, Volume2, ChevronLeft, Image, FileText } from 'lucide-react';
import type { GradedReadingStory } from '../../data/gradedReadingData';
import { speakEnglish } from '../../lib/ttsService';

const SPEEDS = [0.5, 0.65, 0.75, 0.85, 1, 1.15];

interface StoryPlayerProps {
  story: GradedReadingStory;
  levelLabel: string;
  onClose: () => void;
  onComplete: (story: GradedReadingStory) => void;
}

export default function StoryPlayer({ story, levelLabel, onClose, onComplete }: StoryPlayerProps) {
  const [speed, setSpeed] = useState(0.85);
  const [playing, setPlaying] = useState(false);
  const [activeSentenceIndex, setActiveSentenceIndex] = useState(0);
  const [imageTab, setImageTab] = useState<'left' | 'right'>('left');
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.playbackRate = speed;
    if (audio.paused) {
      await audio.play();
      setPlaying(true);
    } else {
      audio.pause();
      setPlaying(false);
    }
  };

  const changeSpeed = (nextSpeed: number) => {
    setSpeed(nextSpeed);
    if (audioRef.current) audioRef.current.playbackRate = nextSpeed;
  };

  const speakSentence = (sentence: string) => {
    void speakEnglish(sentence, { accent: 'en-GB', source: 'youdao', rate: Math.min(1.25, speed + 0.1) });
  };

  return (
    <div className="fixed inset-0 z-[70] overflow-y-auto bg-slate-950/80 p-3 backdrop-blur-sm">
      <div className="mx-auto my-4 max-w-6xl rounded-2xl border border-cyan-300/20 bg-slate-950 shadow-2xl shadow-cyan-950/30">
        {/* Header */}
        <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-800 p-5">
          <div>
            <button
              onClick={onClose}
              className="mb-2 inline-flex items-center gap-1 rounded-lg bg-slate-800 px-3 py-1.5 text-xs text-slate-300 hover:bg-slate-700"
            >
              <ChevronLeft size={14} />
              返回故事列表
            </button>
            <div className="text-xs font-black tracking-[0.18em] text-cyan-300">
              {levelLabel} · Book {story.book} ({story.monthEn}) · Story {story.story}
            </div>
            <h2 className="mt-1 text-2xl font-black text-white">{story.titleEn}</h2>
          </div>
          <button onClick={onClose} className="rounded-lg bg-slate-800 px-3 py-2 text-sm text-slate-300 hover:bg-slate-700">
            关闭
          </button>
        </div>

        <div className="grid gap-4 p-5 lg:grid-cols-[380px_1fr]">
          {/* Left Column: Audio + Images */}
          <div className="space-y-4">
            {/* Audio Player */}
            <div className="rounded-2xl border border-slate-700 bg-slate-900/70 p-4">
              <audio ref={audioRef} src={story.audioSrc} onEnded={() => setPlaying(false)} />
              <div className="mb-3 flex items-center gap-2 text-sm font-black text-white">
                <Headphones size={17} className="text-cyan-300" />
                原音频播放器
              </div>
              <button
                onClick={togglePlay}
                className="mb-4 flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-400 px-4 py-3 font-black text-slate-950 hover:bg-cyan-300"
              >
                {playing ? <Pause size={18} /> : <Play size={18} />}
                {playing ? '暂停' : '播放'}
              </button>
              <div className="grid grid-cols-3 gap-2">
                {SPEEDS.map((item) => (
                  <button
                    key={item}
                    onClick={() => changeSpeed(item)}
                    className={`rounded-lg border px-2 py-2 text-xs font-black ${
                      speed === item
                        ? 'border-amber-300 bg-amber-300/15 text-amber-100'
                        : 'border-slate-700 bg-slate-800 text-slate-300'
                    }`}
                  >
                    {item}x
                  </button>
                ))}
              </div>
            </div>

            {/* Original Book Images */}
            <div className="rounded-2xl border border-slate-700 bg-slate-900/70 p-4">
              <div className="mb-3 flex items-center gap-2 text-sm font-black text-white">
                <BookOpen size={17} className="text-amber-300" />
                原版绘本
              </div>
              <div className="mb-3 flex gap-2">
                <button
                  onClick={() => setImageTab('left')}
                  className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-bold transition-all ${
                    imageTab === 'left'
                      ? 'bg-amber-300/15 text-amber-100 border border-amber-300/40'
                      : 'border border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  <FileText size={13} />
                  文本页
                </button>
                <button
                  onClick={() => setImageTab('right')}
                  className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-bold transition-all ${
                    imageTab === 'right'
                      ? 'bg-purple-300/15 text-purple-100 border border-purple-300/40'
                      : 'border border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  <Image size={13} />
                  插画页
                </button>
              </div>
              <div className="overflow-hidden rounded-xl border border-slate-700 bg-slate-950">
                <img
                  src={imageTab === 'left' ? story.imageLeft : story.imageRight}
                  alt={imageTab === 'left' ? '故事文本页' : '故事插画页'}
                  className="w-full object-contain"
                  style={{ maxHeight: '480px' }}
                />
              </div>
            </div>

            {/* Training Steps */}
            <div className="rounded-2xl border border-amber-300/20 bg-amber-300/5 p-4">
              <div className="mb-2 text-sm font-black text-amber-100">托福式训练步骤</div>
              <ol className="space-y-2 text-xs leading-relaxed text-slate-300">
                <li>1. 听一句，不看文本，抓重音和停顿。</li>
                <li>2. 点击句子英音按钮，再原样复述。</li>
                <li>3. 看文本修正发音，再复述一遍。</li>
                <li>4. 整篇能稳定跟上后，标记完成。</li>
              </ol>
              <button
                onClick={() => onComplete(story)}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 px-4 py-2.5 text-sm font-black text-white hover:bg-emerald-400"
              >
                <CheckCircle2 size={16} />
                标记今日跟读完成
              </button>
            </div>
          </div>

          {/* Right Column: Sentences + OCR Text */}
          <div className="space-y-4">
            {/* Sentence Drill */}
            {story.sentences.length > 0 ? (
              <div className="rounded-2xl border border-slate-700 bg-slate-900/60 p-4">
                <div className="mb-3 flex items-center justify-between gap-2">
                  <div className="font-black text-white">句子跟读</div>
                  <div className="text-xs text-slate-500">
                    {activeSentenceIndex + 1}/{story.sentences.length}
                  </div>
                </div>
                <div className="rounded-xl border border-cyan-300/20 bg-cyan-300/5 p-4">
                  <p className="text-lg font-bold leading-relaxed text-white">
                    {story.sentences[activeSentenceIndex]}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <button
                      onClick={() => speakSentence(story.sentences[activeSentenceIndex])}
                      className="inline-flex items-center gap-2 rounded-lg bg-cyan-400 px-3 py-2 text-sm font-black text-slate-950 hover:bg-cyan-300"
                    >
                      <Volume2 size={15} />
                      英音示范
                    </button>
                    <button
                      onClick={() => setActiveSentenceIndex((i) => Math.max(0, i - 1))}
                      className="rounded-lg border border-slate-700 px-3 py-2 text-sm text-slate-300 hover:bg-slate-800"
                    >
                      上一句
                    </button>
                    <button
                      onClick={() =>
                        setActiveSentenceIndex((i) => Math.min(story.sentences.length - 1, i + 1))
                      }
                      className="rounded-lg border border-slate-700 px-3 py-2 text-sm text-slate-300 hover:bg-slate-800"
                    >
                      下一句
                    </button>
                    <button
                      onClick={() => setActiveSentenceIndex(0)}
                      className="inline-flex items-center gap-1 rounded-lg border border-slate-700 px-3 py-2 text-sm text-slate-300 hover:bg-slate-800"
                    >
                      <RotateCcw size={14} /> 重来
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="rounded-2xl border border-slate-700 bg-slate-900/60 p-5 text-sm leading-relaxed text-slate-300">
                当前故事暂无OCR文本。请先通过原版绘本图片进行跟读，后续将补充文本识别。
              </div>
            )}

            {/* OCR English Transcript */}
            {story.transcriptEn && (
              <div className="rounded-2xl border border-slate-700 bg-slate-900/60 p-4">
                <div className="mb-2 font-black text-white">英文原文（OCR识别）</div>
                <div className="max-h-80 overflow-y-auto whitespace-pre-wrap text-sm leading-7 text-slate-200">
                  {story.transcriptEn}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
