import { useState, useCallback } from 'react';
import { Layers } from 'lucide-react';
import LevelSelector from './LevelSelector';
import BookShelf from './BookShelf';
import StoryList from './StoryList';
import StoryPlayer from './StoryPlayer';
import {
  gradedReadingData,
  gradedReadingBooks,
  GRADED_LEVEL_META,
  type GradedLevel,
  type GradedReadingStory,
} from '../../data/gradedReadingData';

const GRADED_PROGRESS_KEY = 'xsc_graded_reading_progress_v1';

type GradedView = 'level' | 'book' | 'story' | 'player';

interface GradedProgress {
  [storyId: string]: { completed: boolean; lastAt: number };
}

function loadProgress(): GradedProgress {
  try {
    return JSON.parse(localStorage.getItem(GRADED_PROGRESS_KEY) || '{}');
  } catch {
    return {};
  }
}

function saveProgress(progress: GradedProgress) {
  localStorage.setItem(GRADED_PROGRESS_KEY, JSON.stringify(progress));
}

export default function GradedReadingPanel() {
  const [view, setView] = useState<GradedView>('level');
  const [level, setLevel] = useState<GradedLevel | null>(null);
  const [book, setBook] = useState<number | null>(null);
  const [activeStory, setActiveStory] = useState<GradedReadingStory | null>(null);
  const [progress, setProgress] = useState<GradedProgress>(loadProgress);

  const handleSelectLevel = useCallback((selectedLevel: GradedLevel) => {
    setLevel(selectedLevel);
    setBook(null);
    setActiveStory(null);
    setView('book');
  }, []);

  const handleSelectBook = useCallback((selectedBook: number) => {
    setBook(selectedBook);
    setActiveStory(null);
    setView('story');
  }, []);

  const handleSelectStory = useCallback((story: GradedReadingStory) => {
    setActiveStory(story);
    setView('player');
  }, []);

  const handleBackToLevel = useCallback(() => {
    setLevel(null);
    setBook(null);
    setActiveStory(null);
    setView('level');
  }, []);

  const handleBackToBook = useCallback(() => {
    setBook(null);
    setActiveStory(null);
    setView('book');
  }, []);

  const handleBackToStory = useCallback(() => {
    setActiveStory(null);
    setView('story');
  }, []);

  const handleMarkComplete = useCallback((story: GradedReadingStory) => {
    const next = {
      ...progress,
      [story.id]: { completed: true, lastAt: Date.now() },
    };
    setProgress(next);
    saveProgress(next);
  }, [progress]);

  const levelMeta = level ? GRADED_LEVEL_META[level] : null;
  const books = level ? gradedReadingBooks[level] : [];
  const stories = level && book
    ? gradedReadingData[level].filter((s) => s.book === book)
    : [];
  const monthMeta = book && level
    ? books.find((b) => b.book === book)
    : null;

  return (
    <div className="space-y-5">
      {/* Section Header */}
      {view === 'level' && (
        <div className="text-center">
          <div className="mb-3 inline-flex items-center gap-3 rounded-full border border-amber-300/20 bg-amber-300/5 px-4 py-2 text-amber-100">
            <Layers size={18} />
            <span className="text-xs font-black tracking-[0.22em]">GRADED READING</span>
          </div>
          <h2 className="text-2xl font-black text-white">分级跟读</h2>
          <p className="mt-2 text-sm text-slate-400">
            One Story A Day 原版分级读物：每天一个故事，从幼儿到初中循序渐进。
          </p>
        </div>
      )}

      {/* Breadcrumb / Status Bar */}
      {view !== 'level' && levelMeta && (
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <button onClick={handleBackToLevel} className="hover:text-cyan-300 transition-colors">
            分级跟读
          </button>
          {view !== 'book' && (
            <>
              <span>/</span>
              <button onClick={handleBackToBook} className="hover:text-cyan-300 transition-colors">
                {levelMeta.label}
              </button>
            </>
          )}
          {view !== 'book' && view !== 'story' && monthMeta && (
            <>
              <span>/</span>
              <button onClick={handleBackToStory} className="hover:text-cyan-300 transition-colors">
                Book {book} ({monthMeta.monthEn})
              </button>
            </>
          )}
        </div>
      )}

      {/* Views */}
      {view === 'level' && (
        <LevelSelector selected={level} onSelect={handleSelectLevel} />
      )}

      {view === 'book' && level && (
        <BookShelf
          books={books}
          levelKey={level}
          levelLabel={levelMeta?.label || ''}
          onSelectBook={handleSelectBook}
          onBack={handleBackToLevel}
        />
      )}

      {view === 'story' && level && book && monthMeta && (
        <StoryList
          stories={stories}
          bookNum={book}
          monthEn={monthMeta.monthEn}
          monthCn={monthMeta.monthCn}
          levelLabel={levelMeta?.label || ''}
          progress={progress}
          onSelectStory={handleSelectStory}
          onBack={handleBackToBook}
        />
      )}

      {view === 'player' && activeStory && levelMeta && (
        <StoryPlayer
          story={activeStory}
          levelLabel={levelMeta.label}
          onClose={handleBackToStory}
          onComplete={handleMarkComplete}
        />
      )}
    </div>
  );
}
