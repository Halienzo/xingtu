// ============================================
// 星图 - Starry Starry Night
// 云南省英语语法提分系统
// ============================================
import { useState, useEffect, useCallback } from 'react';
import { Home } from './sections/Home';
import { Knowledge } from './sections/Knowledge';
import { Practice } from './sections/Practice';
import { Exam } from './sections/Exam';
import { WrongBook } from './sections/WrongBook';
import { Stats } from './sections/Stats';
import { VocabularyCalendar } from './sections/VocabularyCalendar';
import ReadingSection from './sections/ReadingSection';
import AiReviewPanel from './sections/AiReviewPanel';
import PhonicsSection from './sections/PhonicsSection';
import { PosLab } from './sections/PosLab';
import StarBackground from './components/StarBackground';
import SplashScreen from './components/SplashScreen';
import BackgroundMusic from './components/BackgroundMusic';
import { GlobalSearch } from './components/GlobalSearch';
import { Navbar } from './components/Navbar';
import { MobileNav } from './components/MobileNav';
import { allQuestions } from './data/questions';
import { initAudioOnInteraction } from './utils/soundSystem';
import { initTtsService } from './lib/ttsService';
import './App.css';

// ========== 重组后的板块结构 ==========
export type Section =
  | 'home'           // 首页（星图入口）
  | 'knowledge'      // 知识库（语法/标点/态时/从句）
  | 'vocabulary'     // 词汇日历
  | 'pos'            // 词性工坊
  | 'phonics'        // 自然拼读
  | 'practice'       // 智能练习
  | 'exam'           // 模拟考试
  | 'wrong'          // 错题本
  | 'stats'          // 统计
  | 'reading'        // 跟读训练
  | 'ai';            // AI批改与内容接口

export interface UserAnswer {
  questionId: number;
  selectedOption: number;
  isCorrect: boolean;
  timestamp: number;
}

export interface AppState {
  userAnswers: Record<number, UserAnswer>;
  favorites: number[];
  studyDays: number;
  lastStudyDate: string;
}

function loadState(): AppState {
  try {
    const saved = localStorage.getItem('star_map_state');
    if (saved) return JSON.parse(saved);
  } catch {}
  return { userAnswers: {}, favorites: [], studyDays: 1, lastStudyDate: new Date().toDateString() };
}

function saveState(state: AppState) {
  localStorage.setItem('star_map_state', JSON.stringify(state));
}

function App() {
  const [showSplash, setShowSplash] = useState(() => {
    // 每天只显示一次开场动画
    const lastSplash = localStorage.getItem('star_map_last_splash');
    const today = new Date().toDateString();
    return lastSplash !== today;
  });
  const [section, setSection] = useState<Section>('home');
  const [state, setState] = useState<AppState>(loadState);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showMobileNav, setShowMobileNav] = useState(false);
  const [knowledgeTab, setKnowledgeTab] = useState<string>('grammar');

  // 持久化状态
  useEffect(() => {
    saveState(state);
  }, [state]);

  // 每日学习天数
  useEffect(() => {
    const today = new Date().toDateString();
    if (state.lastStudyDate !== today) {
      setState(prev => ({
        ...prev,
        studyDays: prev.studyDays + 1,
        lastStudyDate: today
      }));
    }
  }, []);

  // 初始化音效
  useEffect(() => {
    initAudioOnInteraction();
    initTtsService();
  }, []);

  const handleAnswer = useCallback((questionId: number, selectedOption: number, isCorrect: boolean) => {
    setState(prev => ({
      ...prev,
      userAnswers: {
        ...prev.userAnswers,
        [questionId]: { questionId, selectedOption, isCorrect, timestamp: Date.now() }
      }
    }));
  }, []);

  const handleFavorite = useCallback((questionId: number) => {
    setState(prev => {
      const favorites = prev.favorites.includes(questionId)
        ? prev.favorites.filter(id => id !== questionId)
        : [...prev.favorites, questionId];
      return { ...prev, favorites };
    });
  }, []);

  const navigate = useCallback((s: Section | string, cat?: string) => {
    setSection(s as Section);
    if (cat) setSelectedCategory(cat);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // 从知识库导航到特定子模块
  const navigateKnowledge = useCallback((tab: string) => {
    setKnowledgeTab(tab);
    setSection('knowledge');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // 开场动画完成
  const handleSplashComplete = useCallback(() => {
    localStorage.setItem('star_map_last_splash', new Date().toDateString());
    setShowSplash(false);
  }, []);

  // ========== 重组后的导航 ==========
  const sections: { id: Section; label: string; icon: string }[] = [
    { id: 'home',      label: '梵星',    icon: '🌟' },
    { id: 'knowledge', label: '知识库',  icon: '📚' },
    { id: 'vocabulary', label: '词汇',   icon: '🗓️' },
    { id: 'pos',       label: '词性',    icon: '🔠' },
    { id: 'phonics',   label: '拼读',    icon: '🔤' },
    { id: 'practice',  label: '练习',    icon: '✏️' },
    { id: 'exam',      label: '模考',    icon: '📝' },
    { id: 'wrong',     label: '错题',    icon: '❌' },
    { id: 'reading',   label: '跟读',    icon: '🎙️' },
    { id: 'ai',        label: 'AI批改',  icon: 'AI' },
    { id: 'stats',     label: '统计',    icon: '📊' },
  ];

  const renderSection = () => {
    switch (section) {
      case 'home':
        return <Home navigate={navigate} state={state} questions={allQuestions} navigateKnowledge={navigateKnowledge} />;
      case 'knowledge':
        return <Knowledge navigate={navigate} initialTab={knowledgeTab} />;
      case 'practice':
        return <Practice navigate={navigate} questions={allQuestions} state={state} onAnswer={handleAnswer} onFavorite={handleFavorite} initialCategory={selectedCategory} />;
      case 'exam':
        return <Exam questions={allQuestions} state={state} onAnswer={handleAnswer} navigate={navigate} />;
      case 'wrong':
        return <WrongBook questions={allQuestions} state={state} onAnswer={handleAnswer} onFavorite={handleFavorite} />;
      case 'stats':
        return <Stats questions={allQuestions} state={state} />;
      case 'vocabulary':
        return <VocabularyCalendar />;
      case 'pos':
        return <PosLab />;
      case 'phonics':
        return <PhonicsSection />;
      case 'reading':
        return <ReadingSection />;
      case 'ai':
        return <AiReviewPanel />;
      default:
        return <Home navigate={navigate} state={state} questions={allQuestions} navigateKnowledge={navigateKnowledge} />;
    }
  };

  return (
    <>
      {/* 开场动画 */}
      {showSplash && <SplashScreen onComplete={handleSplashComplete} />}

      {/* 主系统 */}
      <div className="min-h-screen bg-slate-900 text-white relative">
        <StarBackground />
        <BackgroundMusic />
        <div className="relative z-10">
          <Navbar
            sections={sections}
            activeSection={section}
            onNavigate={navigate}
            onMenuClick={() => setShowMobileNav(true)}
          />
          <GlobalSearch onNavigate={navigate} navigateKnowledge={navigateKnowledge} />
          <MobileNav
            sections={sections}
            activeSection={section}
            onNavigate={navigate}
            isOpen={showMobileNav}
            onClose={() => setShowMobileNav(false)}
          />
          <main className="pt-16 md:pt-20 pb-20 md:pb-8">
            {renderSection()}
          </main>
        </div>
      </div>
    </>
  );
}

export default App;

