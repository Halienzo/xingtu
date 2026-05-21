// ============================================
// Starry Starry Night - 动效卡片组件
// 悬浮放大 + 发光边框 + 入场动画
// ============================================
import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  glowColor?: string;
  onClick?: () => void;
}

export function AnimatedCard({ children, className = '', delay = 0, glowColor = 'rgba(255, 215, 0, 0.15)', onClick }: AnimatedCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{
        scale: 1.02,
        boxShadow: `0 0 30px ${glowColor}, 0 8px 32px rgba(0,0,0,0.3)`,
        y: -4,
      }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={className}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    >
      {children}
    </motion.div>
  );
}

interface FadeInSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
}

export function FadeInSection({ children, className = '', delay = 0, direction = 'up' }: FadeInSectionProps) {
  const directionOffset = {
    up: { y: 40 },
    down: { y: -40 },
    left: { x: 40 },
    right: { x: -40 },
  };

  return (
    <motion.div
      initial={{ opacity: 0, ...directionOffset[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}

export function StaggerContainer({ children, className = '', staggerDelay = 0.1 }: StaggerContainerProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 30, scale: 0.95 },
        visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface PulseGlowProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
  duration?: number;
}

export function PulseGlow({ children, className = '', glowColor = 'rgba(218, 165, 32, 0.3)', duration = 3 }: PulseGlowProps) {
  return (
    <motion.div
      className={className}
      animate={{
        boxShadow: [
          `0 0 10px ${glowColor.replace(/[\d.]+\)$/, '0.1)')}`,
          `0 0 25px ${glowColor}`,
          `0 0 10px ${glowColor.replace(/[\d.]+\)$/, '0.1)')}`,
        ],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      {children}
    </motion.div>
  );
}

// 呼吸动效 - 用于系统名字
export function BreathingText({ children, className = '', duration = 4 }: { children: ReactNode; className?: string; duration?: number }) {
  return (
    <motion.span
      className={className}
      animate={{
        opacity: [0.6, 1, 0.6],
        textShadow: [
          '0 0 5px rgba(218,165,32,0.1)',
          '0 0 20px rgba(218,165,32,0.4)',
          '0 0 5px rgba(218,165,32,0.1)',
        ],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      {children}
    </motion.span>
  );
}

// 悬浮粒子 - 用于装饰
export function FloatingParticle({ count = 20 }: { count?: number }) {
  const particles = Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 4 + 3,
    delay: Math.random() * 3,
    opacity: Math.random() * 0.3 + 0.1,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map(p => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-amber-200"
          style={{
            left: `${p.x}%`,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
          }}
          animate={{
            y: ['100vh', '-10vh'],
            opacity: [0, p.opacity, p.opacity, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  );
}

// 页面过渡动画
export function PageTransition({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      exit={{ opacity: 0, y: -20, filter: 'blur(4px)' }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// 按钮交互动效
interface AnimatedButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
}

export function AnimatedButton({ children, className = '', onClick, variant = 'primary' }: AnimatedButtonProps) {
  const baseClasses = 'relative overflow-hidden rounded-xl font-semibold transition-all';
  const variantClasses = {
    primary: 'bg-gradient-to-r from-amber-600 to-amber-500 text-white hover:from-amber-500 hover:to-amber-400 shadow-lg shadow-amber-500/20',
    secondary: 'bg-white/10 border border-white/20 text-white hover:bg-white/20',
    ghost: 'text-slate-300 hover:text-white hover:bg-white/5',
  };

  return (
    <motion.button
      whileHover={{ scale: 1.03, y: -1 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
        initial={{ x: '-100%' }}
        whileHover={{ x: '100%' }}
        transition={{ duration: 0.5 }}
      />
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}

// 数字滚动动画
export function AnimatedNumber({ value, className = '' }: { value: number; className?: string }) {
  return (
    <motion.span
      key={value}
      initial={{ opacity: 0, y: 10, scale: 0.5 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={className}
    >
      {value}
    </motion.span>
  );
}

// 成功勾选动画
export function SuccessCheck({ className = '' }: { className?: string }) {
  return (
    <motion.svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ type: 'spring', stiffness: 200, damping: 15 }}
    >
      <motion.circle
        cx="12"
        cy="12"
        r="10"
        stroke="#22c55e"
        strokeWidth="2"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.5 }}
      />
      <motion.path
        d="M8 12l2.5 2.5L16 9"
        stroke="#22c55e"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.3, delay: 0.3 }}
      />
    </motion.svg>
  );
}

// 星光闪烁装饰
export function SparkleDecoration({ className = '' }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-amber-300 rounded-full"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0],
          }}
          transition={{
            duration: 2,
            delay: i * 0.6,
            repeat: Infinity,
          }}
        />
      ))}
    </div>
  );
}
