// ============================================
// Starry Starry Night - 动态星空背景
// 缓慢闪现的朦胧繁星效果
// ============================================
import { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
  targetOpacity: number;
  twinkleSpeed: number;
  phase: number;
}

export default function StarBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars();
    };

    const initStars = () => {
      const count = Math.floor((canvas.width * canvas.height) / 3000);
      const stars: Star[] = [];
      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 1.5 + 0.3,
          opacity: Math.random() * 0.3,
          targetOpacity: Math.random() * 0.6 + 0.1,
          twinkleSpeed: Math.random() * 0.008 + 0.002,
          phase: Math.random() * Math.PI * 2,
        });
      }
      starsRef.current = stars;
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 绘制朦胧星云
      const time = Date.now() * 0.0001;
      const nebulaGrad = ctx.createRadialGradient(
        canvas.width * 0.3 + Math.sin(time) * 50,
        canvas.height * 0.4 + Math.cos(time * 0.7) * 30,
        0,
        canvas.width * 0.3,
        canvas.height * 0.4,
        400
      );
      nebulaGrad.addColorStop(0, 'rgba(120, 100, 60, 0.04)');
      nebulaGrad.addColorStop(0.5, 'rgba(80, 60, 40, 0.02)');
      nebulaGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = nebulaGrad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const nebulaGrad2 = ctx.createRadialGradient(
        canvas.width * 0.7 + Math.cos(time * 0.5) * 40,
        canvas.height * 0.6 + Math.sin(time * 0.8) * 50,
        0,
        canvas.width * 0.7,
        canvas.height * 0.6,
        350
      );
      nebulaGrad2.addColorStop(0, 'rgba(60, 80, 120, 0.03)');
      nebulaGrad2.addColorStop(0.5, 'rgba(40, 50, 80, 0.015)');
      nebulaGrad2.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = nebulaGrad2;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 绘制星星
      const now = Date.now();
      starsRef.current.forEach(star => {
        // 缓慢呼吸闪烁
        const twinkle = Math.sin(now * star.twinkleSpeed + star.phase) * 0.5 + 0.5;
        star.opacity = star.targetOpacity * twinkle;

        // 星星光晕
        const glow = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, star.size * 3);
        glow.addColorStop(0, `rgba(255, 250, 220, ${star.opacity * 0.8})`);
        glow.addColorStop(0.3, `rgba(220, 200, 160, ${star.opacity * 0.3})`);
        glow.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size * 3, 0, Math.PI * 2);
        ctx.fill();

        // 星星核心
        ctx.fillStyle = `rgba(255, 248, 230, ${star.opacity})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animRef.current = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
}
