// ============================================
// Starry Starry Night - 庆祝动效组件
// 答对/拼对时触发：彩纸 + 星光粒子 + 浮动文字
// ============================================
import { useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';

interface CelebrationEffectProps {
  trigger: boolean;
  type?: 'correct' | 'spell' | 'combo';
  combo?: number;
}

export default function CelebrationEffect({ trigger, type = 'correct', combo = 0 }: CelebrationEffectProps) {
  const fire = useCallback(() => {
    const isCombo = combo >= 3;
    const particleCount = isCombo ? 150 : type === 'spell' ? 120 : 80;

    // 主彩纸爆发 - 金色系
    confetti({
      particleCount,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#FFD700', '#FFA500', '#FF6B35', '#FFE4B5', '#DAA520', '#B8860B'],
      ticks: 200,
      gravity: 0.8,
      scalar: 1.2,
      shapes: ['circle', 'square'],
    });

    // 左侧爆发
    setTimeout(() => {
      confetti({
        particleCount: particleCount * 0.5,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.65 },
        colors: ['#FFD700', '#FFA07A', '#F0E68C', '#DAA520'],
        ticks: 180,
      });
    }, 100);

    // 右侧爆发
    setTimeout(() => {
      confetti({
        particleCount: particleCount * 0.5,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.65 },
        colors: ['#FFA500', '#FFD700', '#FFE4B5', '#B8860B'],
        ticks: 180,
      });
    }, 200);

    // 连击时额外中心大爆发
    if (isCombo) {
      setTimeout(() => {
        confetti({
          particleCount: 200,
          spread: 100,
          origin: { y: 0.5 },
          colors: ['#FFD700', '#FF4500', '#FF6347', '#FFDAB9', '#FFA500', '#DAA520', '#FFFFFF'],
          ticks: 250,
          gravity: 0.6,
          scalar: 1.5,
          shapes: ['circle', 'star'],
        });
      }, 300);
    }
  }, [type, combo]);

  useEffect(() => {
    if (trigger) {
      fire();
    }
  }, [trigger, fire]);

  return null;
}

// 触发庆祝的辅助函数
export function triggerCelebration(type: 'correct' | 'spell' | 'combo' = 'correct', combo = 0) {
  const particleCount = combo >= 3 ? 150 : type === 'spell' ? 120 : 80;

  confetti({
    particleCount,
    spread: 70,
    origin: { y: 0.7 },
    colors: ['#FFD700', '#FFA500', '#FF6B35', '#FFE4B5', '#DAA520'],
    ticks: 200,
    gravity: 0.8,
    scalar: 1.2,
  });

  setTimeout(() => {
    confetti({
      particleCount: particleCount * 0.5,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.65 },
      colors: ['#FFD700', '#FFA07A', '#F0E68C', '#DAA520'],
      ticks: 180,
    });
  }, 100);

  setTimeout(() => {
    confetti({
      particleCount: particleCount * 0.5,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.65 },
      colors: ['#FFA500', '#FFD700', '#FFE4B5', '#B8860B'],
      ticks: 180,
    });
  }, 200);

  if (combo >= 3) {
    setTimeout(() => {
      confetti({
        particleCount: 200,
        spread: 100,
        origin: { y: 0.5 },
        colors: ['#FFD700', '#FF4500', '#FF6347', '#FFDAB9', '#FFA500', '#FFFFFF'],
        ticks: 250,
        gravity: 0.6,
        scalar: 1.5,
        shapes: ['circle', 'star'],
      });
    }, 300);
  }
}
