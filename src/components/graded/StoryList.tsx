import { CalendarDays, CheckCircle2, Headphones, ChevronLeft, Play } from 'lucide-react';
import type { GradedReadingStory } from '../../data/gradedReadingData';

interface StoryListProps {
  stories: GradedReadingStory[];
  bookNum: number;
  monthEn: string;
  monthCn: string;
  levelLabel: string;
  progress: Record<string, { completed: boolean; lastAt: number }>;
  onSelectStory: (story: GradedReadingStory) => void;
  onBack: () => void;
}

export default function StoryList({
  stories,
  bookNum,
  monthEn,
  monthCn,
  levelLabel,
  progress,
  onSelectStory,
  onBack,
}: StoryListProps) {
  return (
    <div>
      {/* Header */}
      <div className="mb-5 flex items-center gap-3">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1 rounded-lg bg-slate-800 px-3 py-2 text-sm text-slate-300 hover:bg-slate-700"
        >
          <ChevronLeft size={16} />
          返回书架
        </button>
        <div>
          <div className="text-lg font-black text-white">
            {levelLabel} — Book {bookNum} ({monthEn})
          </div>
          <div className="text-xs text-slate-400">
            {stories.length} 个故事 · {monthCn}
          </div>
        </div>
      </div>

      {/* Story List */}
      <div className="space-y-2">
        {stories.map((story) => {
          const completed = Boolean(progress[story.id]?.completed);
          const leftThumb = story.imageLeft.replace('_L.jpg', '_L.jpg'); // Use the left page as thumbnail

          return (
            <button
              key={story.id}
              onClick={() => onSelectStory(story)}
              className={`flex w-full items-center gap-4 rounded-xl border p-3 text-left transition-all hover:-translate-y-0.5 ${
                completed
                  ? 'border-emerald-300/40 bg-emerald-500/10 hover:border-emerald-300/60'
                  : 'border-slate-700 bg-slate-800/40 hover:border-cyan-300/40'
              }`}
            >
              {/* Thumbnail */}
              <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg border border-slate-700 bg-slate-900">
                <img
                  src={leftThumb}
                  alt={story.titleEn}
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <CalendarDays size={20} className="text-white/30" />
                </div>
                <div className="absolute bottom-0 right-0 rounded-tl-lg bg-slate-950/70 px-1.5 py-0.5 text-[10px] font-bold text-white">
                  {story.story}
                </div>
              </div>

              {/* Info */}
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black text-cyan-300">
                    Day {story.story}
                  </span>
                  {completed && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-300">
                      <CheckCircle2 size={10} />
                      已完成
                    </span>
                  )}
                </div>
                <div className="mt-0.5 truncate text-sm font-bold text-white">
                  {story.titleEn}
                </div>
                <div className="mt-1 flex items-center gap-3 text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <Headphones size={11} />
                    音频跟读
                  </span>
                  {story.sentences.length > 0 && (
                    <span>{story.sentences.length} 句</span>
                  )}
                </div>
              </div>

              {/* Play icon */}
              <div className="flex-shrink-0">
                <div className={`flex h-10 w-10 items-center justify-center rounded-full ${
                  completed ? 'bg-emerald-500/20 text-emerald-300' : 'bg-cyan-500/20 text-cyan-300'
                }`}>
                  <Play size={16} fill="currentColor" />
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
