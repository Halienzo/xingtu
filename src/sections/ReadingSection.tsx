import { useMemo, useRef, useState } from 'react';
import { BookOpen, CalendarDays, CheckCircle2, ChevronLeft, ChevronRight, Headphones, Mic, Pause, Play, RotateCcw, Volume2, Layers } from 'lucide-react';
import { followReadingData, type FollowReadingEpisode, type FollowReadingLevel } from '../data/followReadingData';
import GradedReadingPanel from '../components/graded/GradedReadingPanel';
import { speakEnglish } from '../lib/ttsService';

type LevelMeta = {
  key: FollowReadingLevel;
  label: string;
  subtitle: string;
  accent: string;
  audioNote: string;
};

const LEVELS: LevelMeta[] = [
  { key: 'elementary', label: '小学', subtitle: '40篇故事音频', accent: 'emerald', audioNote: '小学音频暂未提供配套文本，先做听音频跟读与复述打卡。' },
  { key: 'junior', label: '初中', subtitle: '70篇短文记单词', accent: 'cyan', audioNote: '已写入 70 篇中考词汇短文文本，与 70 个音频按编号对应。' },
  { key: 'senior', label: '高中', subtitle: '40篇3500词英音文章', accent: 'amber', audioNote: '已写入 40 篇高中3500词英文文本，并对应英音音频。' },
];

const SPEEDS = [0.5, 0.65, 0.75, 0.85, 1, 1.15, 1.3, 1.5, 2];
const FOLLOW_PROGRESS_KEY = 'xsc_follow_reading_progress_v1';

type FollowProgress = Record<string, { completed: boolean; lastAt: number }>;

function loadProgress(): FollowProgress {
  try {
    return JSON.parse(localStorage.getItem(FOLLOW_PROGRESS_KEY) || '{}');
  } catch {
    return {};
  }
}

function saveProgress(progress: FollowProgress) {
  localStorage.setItem(FOLLOW_PROGRESS_KEY, JSON.stringify(progress));
}

function getTodayISO() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
}

function buildMonthDays(year: number, monthIndex: number) {
  const days = new Date(year, monthIndex + 1, 0).getDate();
  return Array.from({ length: days }, (_, index) => {
    const date = new Date(year, monthIndex, index + 1);
    return {
      dayOfMonth: index + 1,
      dateISO: `${year}-${String(monthIndex + 1).padStart(2, '0')}-${String(index + 1).padStart(2, '0')}`,
      weekdayCn: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'][date.getDay()],
      weekdayEn: ['Sun.', 'Mon.', 'Tue.', 'Wed.', 'Thu.', 'Fri.', 'Sat.'][date.getDay()],
    };
  });
}

function getEpisodeForDay(episodes: FollowReadingEpisode[], dayOfYear: number) {
  return episodes[(dayOfYear - 1) % episodes.length];
}

function getDayOfYear(year: number, monthIndex: number, day: number) {
  const start = new Date(year, 0, 1);
  const current = new Date(year, monthIndex, day);
  return Math.floor((current.getTime() - start.getTime()) / 86400000) + 1;
}

type ReadingMode = 'level' | 'graded';

export default function ReadingSection() {
  const now = new Date();
  const [mode, setMode] = useState<ReadingMode>('level');
  const [level, setLevel] = useState<FollowReadingLevel>('junior');
  const [monthIndex, setMonthIndex] = useState(now.getMonth());
  const [activeEpisode, setActiveEpisode] = useState<FollowReadingEpisode | null>(null);
  const [speed, setSpeed] = useState(0.85);
  const [playing, setPlaying] = useState(false);
  const [activeSentenceIndex, setActiveSentenceIndex] = useState(0);
  const [progress, setProgress] = useState<FollowProgress>(loadProgress);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const episodes = followReadingData[level];
  const year = now.getFullYear();
  const monthDays = useMemo(() => buildMonthDays(year, monthIndex), [year, monthIndex]);
  const todayISO = getTodayISO();
  const selectedMeta = LEVELS.find(item => item.key === level) || LEVELS[1];
  const leadingBlankDays = new Date(year, monthIndex, 1).getDay();

  const openEpisode = (episode: FollowReadingEpisode) => {
    setActiveEpisode(episode);
    setActiveSentenceIndex(0);
    setPlaying(false);
    window.setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.playbackRate = speed;
      }
    }, 50);
  };

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

  const markComplete = (episode: FollowReadingEpisode) => {
    const next = {
      ...progress,
      [episode.id]: { completed: true, lastAt: Date.now() },
    };
    setProgress(next);
    saveProgress(next);
  };

  const speakSentence = (sentence: string) => {
    void speakEnglish(sentence, { accent: 'en-GB', source: 'youdao', rate: Math.min(1.25, speed + 0.1) });
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <div className="mb-6 text-center">
        <div className="mb-3 inline-flex items-center gap-3 rounded-full border border-amber-300/20 bg-amber-300/5 px-4 py-2 text-amber-100">
          <Mic size={18} />
          <span className="text-xs font-black tracking-[0.22em]">LISTEN · REPEAT · BE HEARD</span>
        </div>
        <h1 className="text-3xl font-black text-white">跟读日历</h1>
        <p className="mt-2 text-sm text-slate-400">托福式句子跟读训练：先听原音频，再逐句复述，速度可以调慢。</p>
      </div>

      {/* Mode Switcher */}
      <div className="mb-6 flex justify-center">
        <div className="inline-flex rounded-xl border border-slate-700 bg-slate-800/50 p-1">
          <button
            onClick={() => setMode('level')}
            className={`flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-bold transition-all ${
              mode === 'level'
                ? 'bg-cyan-400 text-slate-950 shadow-lg'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <BookOpen size={16} />
            学段跟读
          </button>
          <button
            onClick={() => setMode('graded')}
            className={`flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-bold transition-all ${
              mode === 'graded'
                ? 'bg-amber-400 text-slate-950 shadow-lg'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Layers size={16} />
            分级跟读
          </button>
        </div>
      </div>

      {/* Graded Reading Panel */}
      {mode === 'graded' && <GradedReadingPanel />}

      {/* Level-based Reading (Original) */}
      {mode === 'level' && (
        <>
          <div className="mb-4 grid gap-3 md:grid-cols-3">
        {LEVELS.map(item => (
          <button
            key={item.key}
            onClick={() => {
              setLevel(item.key);
              setActiveEpisode(null);
            }}
            className={`rounded-xl border p-4 text-left transition-all ${level === item.key ? 'border-cyan-300 bg-cyan-300/10 shadow-lg shadow-cyan-950/20' : 'border-slate-700 bg-slate-800/40 hover:border-slate-500'}`}
          >
            <div className="flex items-center gap-2">
              <BookOpen size={18} className="text-cyan-300" />
              <span className="text-lg font-black text-white">{item.label}</span>
            </div>
            <p className="mt-1 text-sm text-slate-300">{item.subtitle}</p>
            <p className="mt-2 text-xs leading-relaxed text-slate-500">{item.audioNote}</p>
          </button>
        ))}
      </div>

      <div className="mb-4 flex items-center justify-between rounded-xl border border-slate-700 bg-slate-800/50 px-4 py-3">
        <button onClick={() => setMonthIndex(m => Math.max(0, m - 1))} disabled={monthIndex === 0} className="rounded-lg bg-slate-700 p-2 text-white disabled:opacity-30">
          <ChevronLeft size={18} />
        </button>
        <div className="text-center">
          <div className="text-lg font-black text-white">{selectedMeta.label}跟读 — {monthIndex + 1}月</div>
          <div className="mt-1 text-xs text-slate-400">{episodes.length} 集循环安排 · 每天一集 · 完成后点亮日期</div>
        </div>
        <button onClick={() => setMonthIndex(m => Math.min(11, m + 1))} disabled={monthIndex === 11} className="rounded-lg bg-slate-700 p-2 text-white disabled:opacity-30">
          <ChevronRight size={18} />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1.5">
        {['周日', '周一', '周二', '周三', '周四', '周五', '周六'].map(day => (
          <div key={day} className="py-1 text-center text-xs font-bold text-slate-400">{day}</div>
        ))}
        {Array.from({ length: leadingBlankDays }).map((_, index) => (
          <div key={index} className="min-h-[80px] md:min-h-[132px] rounded-xl border border-slate-800/50 bg-slate-950/20" />
        ))}
        {monthDays.map(day => {
          const dayOfYear = getDayOfYear(year, monthIndex, day.dayOfMonth);
          const episode = getEpisodeForDay(episodes, dayOfYear);
          const completed = Boolean(progress[episode.id]?.completed);
          const isToday = day.dateISO === todayISO;
          return (
            <button
              key={day.dateISO}
              onClick={() => openEpisode(episode)}
              className={`min-h-[80px] md:min-h-[132px] rounded-xl border p-1.5 md:p-2 text-left transition-all hover:-translate-y-0.5 hover:border-cyan-300/60 ${completed ? 'border-emerald-300/70 bg-emerald-500/15' : isToday ? 'border-cyan-300/60 bg-cyan-500/10' : 'border-slate-700/60 bg-slate-800/35'}`}
            >
              <div className="flex items-start justify-between">
                <span className={`text-lg md:text-2xl font-black ${completed ? 'text-emerald-200' : isToday ? 'text-cyan-200' : 'text-white'}`}>{day.dayOfMonth}</span>
                <span className="text-right text-[10px] leading-tight text-slate-500">{day.weekdayCn}<br />{day.weekdayEn}</span>
              </div>
              <div className="mt-3 rounded-lg border border-slate-700/70 bg-slate-950/40 px-2 py-2">
                <div className="text-[10px] font-black text-cyan-200">Episode {episode.episode}</div>
                <div className="mt-1 line-clamp-2 text-xs font-bold text-white">{episode.titleEn}</div>
                {episode.titleCn && <div className="mt-0.5 line-clamp-1 text-[10px] text-slate-400">{episode.titleCn}</div>}
              </div>
              <div className="mt-2 flex items-center gap-1 text-[10px] text-slate-400">
                {completed ? <CheckCircle2 size={12} className="text-emerald-300" /> : <CalendarDays size={12} className="text-slate-500" />}
                {completed ? '已完成跟读' : '待跟读'}
              </div>
            </button>
          );
        })}
      </div>

      {mode === 'level' && activeEpisode && (
        <div className="fixed inset-0 z-[70] overflow-y-auto bg-slate-950/80 p-3 backdrop-blur-sm">
          <div className="mx-auto my-8 max-w-5xl rounded-2xl border border-cyan-300/20 bg-slate-950 shadow-2xl shadow-cyan-950/30">
            <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-800 p-5">
              <div>
                <div className="text-xs font-black tracking-[0.18em] text-cyan-300">{selectedMeta.label} · Episode {activeEpisode.episode}</div>
                <h2 className="mt-1 text-2xl font-black text-white">{activeEpisode.titleEn}</h2>
                {activeEpisode.titleCn && <p className="mt-1 text-sm text-slate-400">{activeEpisode.titleCn}</p>}
              </div>
              <button onClick={() => setActiveEpisode(null)} className="rounded-lg bg-slate-800 px-3 py-2 text-sm text-slate-300 hover:bg-slate-700">关闭</button>
            </div>

            <div className="grid gap-4 p-5 lg:grid-cols-[360px_1fr]">
              <div className="space-y-4">
                <div className="rounded-2xl border border-slate-700 bg-slate-900/70 p-4">
                  <audio ref={audioRef} src={activeEpisode.audioSrc} onEnded={() => setPlaying(false)} />
                  <div className="mb-3 flex items-center gap-2 text-sm font-black text-white">
                    <Headphones size={17} className="text-cyan-300" />
                    原音频播放器
                  </div>
                  <button onClick={togglePlay} className="mb-4 flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-400 px-4 py-3 font-black text-slate-950 hover:bg-cyan-300">
                    {playing ? <Pause size={18} /> : <Play size={18} />}
                    {playing ? '暂停' : '播放'}
                  </button>
                  <div className="grid grid-cols-3 gap-2">
                    {SPEEDS.map(item => (
                      <button
                        key={item}
                        onClick={() => changeSpeed(item)}
                        className={`rounded-lg border px-2 py-2 text-xs font-black ${speed === item ? 'border-amber-300 bg-amber-300/15 text-amber-100' : 'border-slate-700 bg-slate-800 text-slate-300'}`}
                      >
                        {item}x
                      </button>
                    ))}
                  </div>
                  <p className="mt-3 text-xs leading-relaxed text-slate-500">建议基础弱的学生从 0.65x 或 0.75x 开始，能跟上后再回到原速。</p>
                </div>

                <div className="rounded-2xl border border-amber-300/20 bg-amber-300/5 p-4">
                  <div className="mb-2 text-sm font-black text-amber-100">托福式训练步骤</div>
                  <ol className="space-y-2 text-xs leading-relaxed text-slate-300">
                    <li>1. 听一句，不看文本，抓重音和停顿。</li>
                    <li>2. 点击句子英音按钮，再原样复述。</li>
                    <li>3. 看文本修正发音，再复述一遍。</li>
                    <li>4. 整篇能稳定跟上后，标记完成。</li>
                  </ol>
                  <button onClick={() => markComplete(activeEpisode)} className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 px-4 py-2.5 text-sm font-black text-white hover:bg-emerald-400">
                    <CheckCircle2 size={16} />
                    标记今日跟读完成
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                {activeEpisode.sentences.length > 0 ? (
                  <div className="rounded-2xl border border-slate-700 bg-slate-900/60 p-4">
                    <div className="mb-3 flex items-center justify-between gap-2">
                      <div className="font-black text-white">句子跟读</div>
                      <div className="text-xs text-slate-500">{activeSentenceIndex + 1}/{activeEpisode.sentences.length}</div>
                    </div>
                    <div className="rounded-xl border border-cyan-300/20 bg-cyan-300/5 p-4">
                      <p className="text-lg font-bold leading-relaxed text-white">{activeEpisode.sentences[activeSentenceIndex]}</p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        <button onClick={() => speakSentence(activeEpisode.sentences[activeSentenceIndex])} className="inline-flex items-center gap-2 rounded-lg bg-cyan-400 px-3 py-2 text-sm font-black text-slate-950 hover:bg-cyan-300">
                          <Volume2 size={15} />
                          英音示范
                        </button>
                        <button onClick={() => setActiveSentenceIndex(i => Math.max(0, i - 1))} className="rounded-lg border border-slate-700 px-3 py-2 text-sm text-slate-300 hover:bg-slate-800">上一句</button>
                        <button onClick={() => setActiveSentenceIndex(i => Math.min(activeEpisode.sentences.length - 1, i + 1))} className="rounded-lg border border-slate-700 px-3 py-2 text-sm text-slate-300 hover:bg-slate-800">下一句</button>
                        <button onClick={() => setActiveSentenceIndex(0)} className="inline-flex items-center gap-1 rounded-lg border border-slate-700 px-3 py-2 text-sm text-slate-300 hover:bg-slate-800">
                          <RotateCcw size={14} /> 重来
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="rounded-2xl border border-slate-700 bg-slate-900/60 p-5 text-sm leading-relaxed text-slate-300">
                    当前小学音频没有配套文本源。先听原音频，用慢速跟读；如果后续提供小学故事文本，我会把它扩展成逐句跟读。
                  </div>
                )}

                {activeEpisode.transcriptEn && (
                  <div className="rounded-2xl border border-slate-700 bg-slate-900/60 p-4">
                    <div className="mb-2 font-black text-white">英文原文</div>
                    <div className="max-h-80 overflow-y-auto whitespace-pre-wrap text-sm leading-7 text-slate-200">{activeEpisode.transcriptEn}</div>
                  </div>
                )}
                {activeEpisode.transcriptCn && (
                  <div className="rounded-2xl border border-slate-700 bg-slate-900/60 p-4">
                    <div className="mb-2 font-black text-white">中文理解</div>
                    <div className="max-h-60 overflow-y-auto whitespace-pre-wrap text-sm leading-7 text-slate-400">{activeEpisode.transcriptCn}</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
        </>
      )}
    </div>
  );
}
