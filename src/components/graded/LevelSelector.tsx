import { Baby, BookOpen, GraduationCap } from 'lucide-react';
import type { GradedLevel } from '../../data/gradedReadingData';

const LEVELS: {
  key: GradedLevel;
  label: string;
  sublabel: string;
  ageNote: string;
  accent: string;
  icon: typeof Baby;
  gradient: string;
}[] = [
  {
    key: 'l1',
    label: 'Level 1',
    sublabel: '幼儿版',
    ageNote: '5-7岁 · 彩色绘本',
    accent: 'amber',
    icon: Baby,
    gradient: 'from-amber-600/20 to-amber-400/10',
  },
  {
    key: 'l2',
    label: 'Level 2',
    sublabel: '小学版',
    ageNote: '6岁+ · 彩色绘本',
    accent: 'emerald',
    icon: BookOpen,
    gradient: 'from-emerald-600/20 to-emerald-400/10',
  },
  {
    key: 'l3',
    label: 'Level 3',
    sublabel: '初中版',
    ageNote: '初中 · 黑白插图',
    accent: 'cyan',
    icon: GraduationCap,
    gradient: 'from-cyan-600/20 to-cyan-400/10',
  },
];

const ACCENT_STYLES: Record<string, { border: string; bg: string; text: string; shadow: string; selected: string }> = {
  amber: {
    border: 'border-amber-500/30',
    bg: 'bg-amber-500/10',
    text: 'text-amber-300',
    shadow: 'shadow-amber-950/20',
    selected: 'border-amber-300 bg-amber-300/15 shadow-lg shadow-amber-950/30',
  },
  emerald: {
    border: 'border-emerald-500/30',
    bg: 'bg-emerald-500/10',
    text: 'text-emerald-300',
    shadow: 'shadow-emerald-950/20',
    selected: 'border-emerald-300 bg-emerald-300/15 shadow-lg shadow-emerald-950/30',
  },
  cyan: {
    border: 'border-cyan-500/30',
    bg: 'bg-cyan-500/10',
    text: 'text-cyan-300',
    shadow: 'shadow-cyan-950/20',
    selected: 'border-cyan-300 bg-cyan-300/15 shadow-lg shadow-cyan-950/30',
  },
};

interface LevelSelectorProps {
  selected: GradedLevel | null;
  onSelect: (level: GradedLevel) => void;
}

export default function LevelSelector({ selected, onSelect }: LevelSelectorProps) {
  return (
    <div className="grid gap-3 md:grid-cols-3">
      {LEVELS.map((item) => {
        const styles = ACCENT_STYLES[item.accent];
        const isSelected = selected === item.key;
        const Icon = item.icon;

        return (
          <button
            key={item.key}
            onClick={() => onSelect(item.key)}
            className={`group relative overflow-hidden rounded-2xl border p-5 text-left transition-all duration-300 hover:-translate-y-0.5 ${
              isSelected
                ? styles.selected
                : `${styles.border} bg-slate-800/40 hover:border-slate-500`
            }`}
          >
            {/* Background gradient */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
            />

            <div className="relative">
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-xl border ${styles.border} ${styles.bg}`}
                >
                  <Icon size={22} className={styles.text} />
                </div>
                <div>
                  <div className="text-lg font-black text-white">{item.label}</div>
                  <div className="text-sm text-slate-400">{item.sublabel}</div>
                </div>
              </div>
              <div className={`mt-3 inline-block rounded-full border ${styles.border} ${styles.bg} px-3 py-1 text-xs font-bold ${styles.text}`}>
                {item.ageNote}
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
