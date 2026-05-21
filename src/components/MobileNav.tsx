import type { Section } from '../App';
import { X } from 'lucide-react';

interface MobileNavProps {
  sections: { id: Section; label: string; icon: string }[];
  activeSection: Section;
  onNavigate: (section: Section) => void;
  isOpen: boolean;
  onClose: () => void;
}

export function MobileNav({ sections, activeSection, onNavigate, isOpen, onClose }: MobileNavProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] md:hidden">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="absolute right-0 top-0 bottom-0 w-72 bg-slate-800 border-l border-white/10 p-6">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-lg font-bold text-amber-100">梵星</h2>
            <p className="text-[10px] font-semibold tracking-[0.18em] text-amber-300/70">PER ASPERA AD ASTRA</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl bg-white/10">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="flex flex-col gap-2">
          {sections.map(s => (
            <button
              key={s.id}
              onClick={() => { onNavigate(s.id); onClose(); }}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all ${
                activeSection === s.id
                  ? 'bg-white text-slate-900 font-semibold'
                  : 'text-slate-300 hover:bg-white/10'
              }`}
            >
              <span className="text-xl">{s.icon}</span>
              {s.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
