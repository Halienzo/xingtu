import type { Section } from '../App';
import { Sparkles } from 'lucide-react';
import { BreathingText } from './AnimatedCard';

interface NavbarProps {
  sections: { id: Section; label: string; icon: string }[];
  activeSection: Section;
  onNavigate: (section: Section) => void;
  onMenuClick: () => void;
}

export function Navbar({ sections, activeSection, onNavigate, onMenuClick }: NavbarProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-lg border-b border-amber-500/20">
      <div className="max-w-7xl mx-auto px-4 h-16 md:h-20 flex items-center justify-between">
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2 md:gap-3 hover:opacity-80 transition-opacity"
        >
          <div className="w-9 h-9 md:w-11 md:h-11 bg-gradient-to-br from-amber-600/20 to-amber-400/10 rounded-xl flex items-center justify-center border border-amber-500/20">
            <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-amber-400" />
          </div>
          <div className="flex flex-col">
            <BreathingText className="text-sm md:text-base font-bold" duration={5}>
              <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-amber-300 bg-clip-text text-transparent" style={{ textShadow: '0 0 30px rgba(218,165,32,0.3)' }}>
                Starry Starry Night
              </span>
            </BreathingText>
            <span className="text-[10px] md:text-xs text-amber-400/70 hidden sm:block">梵星 PER ASPERA AD ASTRA</span>
          </div>
        </button>

        <div className="hidden md:flex items-center gap-1">
          {sections.map(s => (
            <button
              key={s.id}
              onClick={() => onNavigate(s.id)}
              className={`px-3 lg:px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                activeSection === s.id
                  ? 'bg-white text-slate-900 shadow-lg shadow-white/10'
                  : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <span className="mr-1.5">{s.icon}</span>
              {s.label}
            </button>
          ))}
        </div>

        <button
          onClick={onMenuClick}
          className="md:hidden p-2 rounded-xl bg-white/10 text-white"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </nav>
  );
}
