import { BookOpen, ChevronLeft } from 'lucide-react';
import type { GradedBookMeta, GradedLevel } from '../../data/gradedReadingData';

const MONTH_COLORS = [
  'from-red-500/20 to-orange-500/10',
  'from-pink-500/20 to-rose-500/10',
  'from-emerald-500/20 to-teal-500/10',
  'from-cyan-500/20 to-sky-500/10',
  'from-blue-500/20 to-indigo-500/10',
  'from-violet-500/20 to-purple-500/10',
  'from-amber-500/20 to-yellow-500/10',
  'from-orange-500/20 to-amber-500/10',
  'from-teal-500/20 to-emerald-500/10',
  'from-indigo-500/20 to-blue-500/10',
  'from-rose-500/20 to-pink-500/10',
  'from-sky-500/20 to-cyan-500/10',
];

interface BookShelfProps {
  books: GradedBookMeta[];
  levelKey: GradedLevel;
  levelLabel: string;
  onSelectBook: (book: number) => void;
  onBack: () => void;
}

export default function BookShelf({ books, levelKey, levelLabel, onSelectBook, onBack }: BookShelfProps) {
  return (
    <div>
      {/* Header */}
      <div className="mb-5 flex items-center gap-3">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1 rounded-lg bg-slate-800 px-3 py-2 text-sm text-slate-300 hover:bg-slate-700"
        >
          <ChevronLeft size={16} />
          返回级别选择
        </button>
        <div className="text-lg font-black text-white">
          {levelLabel} — 选择月份
        </div>
      </div>

      {/* Book Grid */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {books.map((book) => {
          const colorIdx = (book.book - 1) % MONTH_COLORS.length;
          const coverImage = `./follow-reading/graded/${levelKey}/book${String(book.book).padStart(2, '0')}/cover.jpg`;

          return (
            <button
              key={book.book}
              onClick={() => onSelectBook(book.book)}
              className="group relative overflow-hidden rounded-xl border border-slate-700 bg-slate-800/50 p-3 text-left transition-all hover:-translate-y-0.5 hover:border-cyan-300/40 hover:shadow-lg hover:shadow-cyan-950/20"
            >
              {/* Cover image or gradient placeholder */}
              <div className={`relative mb-3 aspect-[3/4] overflow-hidden rounded-lg bg-gradient-to-br ${MONTH_COLORS[colorIdx]} border border-slate-700/50`}>
                <img
                  src={coverImage}
                  alt={`${book.monthEn} cover`}
                  className="h-full w-full object-cover opacity-80 transition-opacity group-hover:opacity-100"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <BookOpen size={32} className="text-white/20" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-950/80 to-transparent p-2">
                  <div className="text-center text-2xl font-black text-white">
                    {book.book}
                  </div>
                </div>
              </div>

              <div className="text-sm font-bold text-white">{book.monthEn}</div>
              <div className="text-xs text-slate-400">{book.monthCn}</div>
              <div className="mt-1 text-xs text-slate-500">{book.storyCount} 个故事</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
