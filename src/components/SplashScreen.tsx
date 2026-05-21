// ============================================
// 梵星 - Cosmic Genesis: 26 letters born from stardust
// Inspired by Van Gogh's The Starry Night (1889)
// ============================================
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface SplashScreenProps {
  onComplete: () => void;
}

/* ─────────────── 粒子 ─────────────── */
interface CosmicParticle {
  x: number; y: number;
  startX: number; startY: number;
  letterX: number; letterY: number;
  planetX: number; planetY: number;
  phraseX: number; phraseY: number;
  baseSize: number;
  color: string;
  letterIndex: number;
  driftPhase: number;
  driftSpeed: number;
}

/* ─────────────── 呼吸星 ─────────────── */
interface TwinkleStar {
  x: number; y: number;
  size: number;
  baseAlpha: number;
  phase: number;
  speed: number;
  color: string;
  cross: boolean;
}

/* ─────────────── 旋涡层 ─────────────── */
interface VortexLayer {
  radius: number;
  rotation: number;
  rotSpeed: number;
  color: string;
  opacity: number;
  lineWidth: number;
  ellipseRatio: number;
  tilt: number;
}

/* ─────────────── 常量 ─────────────── */
const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const PHRASE = 'Per Aspera Ad Astra';
const DURATION = 25000;

/* 梵高《星夜》真实配色 */
const VAN_GOGH = {
  // 夜空
  deepVoid:    '#020510',
  nightEdge:   '#0B1E38',
  cobaltBlue:  '#2D3B6E',
  starBlue:    '#4C6394',
  mistBlue:    '#7EA4B0',
  vortexBlue:  '#173679',
  // 星光
  starGold:    '#FFD700',
  brightGold:  '#E1D06F',
  greenGold:   '#CDD27E',
  paleGold:    '#C8B662',
  softGold:    '#E7DB7B',
  // 暗金（字母）
  darkGold:    '#b8860b',
  peruGold:    '#cd853f',
  goldenrod:   '#daa520',
  amber:       '#b9872d',
  // 柏树
  cypress:     '#1C585E',
  olive:       '#556B2F',
};

const GOLDEN_PALETTE = [
  VAN_GOGH.darkGold,
  VAN_GOGH.peruGold,
  VAN_GOGH.goldenrod,
  VAN_GOGH.amber,
  VAN_GOGH.paleGold,
];

const STAR_COLORS = [
  VAN_GOGH.starGold,
  VAN_GOGH.brightGold,
  VAN_GOGH.greenGold,
  VAN_GOGH.softGold,
  '#ffffff',
  VAN_GOGH.mistBlue,
];

/* ─────────────── 工具函数 ─────────────── */
function seeded(seed: number) {
  const x = Math.sin(seed * 999.73) * 10000;
  return x - Math.floor(x);
}

function clamp01(v: number) { return Math.max(0, Math.min(1, v)); }

function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }

function easeOutQuart(t: number) { return 1 - Math.pow(1 - t, 4); }
function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}
function easeOutBack(t: number) {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
}
function easeOutExpo(t: number) { return t === 1 ? 1 : 1 - Math.pow(2, -10 * t); }

/* ─────────────── 生成器 ─────────────── */

function buildStars(w: number, h: number): TwinkleStar[] {
  const count = Math.max(180, Math.min(420, Math.floor((w * h) / 3800)));
  return Array.from({ length: count }, (_, i) => ({
    x: seeded(i + 1) * w,
    y: seeded(i + 97) * h,
    size: 0.25 + seeded(i + 211) * 1.1,
    baseAlpha: 0.08 + seeded(i + 409) * 0.55,
    phase: seeded(i + 601) * Math.PI * 2,
    speed: 3000 + seeded(i + 811) * 5000,
    color: STAR_COLORS[i % STAR_COLORS.length],
    cross: seeded(i + 1013) > 0.82,
  }));
}

function buildVortexLayers(): VortexLayer[] {
  return [
    { radius: 0.42, rotation: 0,       rotSpeed: 0.008,  color: VAN_GOGH.cobaltBlue,  opacity: 0.18, lineWidth: 2.2, ellipseRatio: 0.38, tilt: 0.15 },
    { radius: 0.35, rotation: 0.7,     rotSpeed: -0.012, color: VAN_GOGH.starBlue,    opacity: 0.14, lineWidth: 1.8, ellipseRatio: 0.45, tilt: -0.22 },
    { radius: 0.28, rotation: 1.4,     rotSpeed: 0.018,  color: VAN_GOGH.mistBlue,    opacity: 0.10, lineWidth: 1.4, ellipseRatio: 0.52, tilt: 0.08 },
    { radius: 0.50, rotation: 2.1,     rotSpeed: -0.006, color: VAN_GOGH.vortexBlue,  opacity: 0.12, lineWidth: 2.6, ellipseRatio: 0.32, tilt: -0.10 },
    { radius: 0.22, rotation: 3.0,     rotSpeed: 0.025,  color: VAN_GOGH.brightGold,  opacity: 0.08, lineWidth: 1.0, ellipseRatio: 0.60, tilt: 0.30 },
    { radius: 0.38, rotation: 4.2,     rotSpeed: -0.015, color: VAN_GOGH.paleGold,    opacity: 0.06, lineWidth: 1.2, ellipseRatio: 0.40, tilt: -0.18 },
  ];
}

/* 用离屏 canvas 提取字母轮廓点 */
function sampleLetterPoints(char: string, fontSize: number): Array<{x: number, y: number}> {
  const c = document.createElement('canvas');
  const ctx = c.getContext('2d')!;
  const pad = 6;
  c.width = fontSize + pad * 2;
  c.height = fontSize + pad * 2;
  ctx.font = `900 ${fontSize}px Georgia, "Times New Roman", serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = '#fff';
  ctx.fillText(char, c.width / 2, c.height / 2 + fontSize * 0.08);

  const img = ctx.getImageData(0, 0, c.width, c.height).data;
  const pts: Array<{x: number, y: number}> = [];
  const step = 2;
  for (let y = 0; y < c.height; y += step) {
    for (let x = 0; x < c.width; x += step) {
      if (img[(y * c.width + x) * 4 + 3] > 40) {
        pts.push({ x: x - c.width / 2, y: y - c.height / 2 });
      }
    }
  }
  return pts;
}

/* 提取短语 "Per Aspera Ad Astra" 轮廓点 */
function samplePhrasePoints(w: number, h: number, fontSize: number): Array<{x: number, y: number}> {
  const c = document.createElement('canvas');
  const ctx = c.getContext('2d')!;
  const ratio = 2;
  c.width = Math.floor(w * ratio);
  c.height = Math.floor(h * ratio);
  ctx.scale(ratio, ratio);
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = `800 ${fontSize}px Georgia, "Times New Roman", serif`;
  ctx.fillStyle = '#fff';
  ctx.fillText(PHRASE, w / 2, h / 2 + (w < 640 ? 8 : 18));

  const img = ctx.getImageData(0, 0, c.width, c.height).data;
  const pts: Array<{x: number, y: number}> = [];
  const step = w < 640 ? 6 : 8;
  for (let y = 0; y < c.height; y += step) {
    for (let x = 0; x < c.width; x += step) {
      if (img[(y * c.width + x) * 4 + 3] > 30 && seeded(x + y * 13) > 0.15) {
        pts.push({ x: x / ratio, y: y / ratio });
      }
    }
  }
  const max = w < 640 ? 520 : 900;
  if (pts.length > max) {
    const keep = Math.ceil(pts.length / max);
    return pts.filter((_, i) => i % keep === 0).slice(0, max);
  }
  return pts;
}

/* 构建所有粒子 */
function buildParticles(w: number, h: number): CosmicParticle[] {
  const cx = w / 2;
  const cy = h / 2;
  const letterFontSize = w < 640 ? 28 : 42;
  const particlesPerLetter = w < 640 ? 32 : 48;
  const allParticles: CosmicParticle[] = [];

  LETTERS.forEach((char, li) => {
    const pts = sampleLetterPoints(char, letterFontSize);
    const selected = pts.length > particlesPerLetter
      ? pts.filter((_, i) => i % Math.ceil(pts.length / particlesPerLetter) === 0).slice(0, particlesPerLetter)
      : pts;

    // 字母中心（排列成弧形）
    const arcRadius = w * (w < 640 ? 0.38 : 0.32);
    const arcAngle = (li / (LETTERS.length - 1) - 0.5) * Math.PI * 0.85;
    const letterCx = cx + Math.cos(arcAngle) * arcRadius * 0.6;
    const letterCy = cy + Math.sin(arcAngle) * arcRadius * 0.25;

    selected.forEach((pt, pi) => {
      // 极远处起点（屏幕外很远）
      const farAngle = seeded(li * 100 + pi * 7 + 333) * Math.PI * 2;
      const farDist = Math.max(w, h) * (1.2 + seeded(li * 50 + pi * 3 + 777) * 1.8);
      const startX = cx + Math.cos(farAngle) * farDist;
      const startY = cy + Math.sin(farAngle) * farDist;

      // 星球位置（球面分布）
      const planetAngle = seeded(li * 20 + pi + 555) * Math.PI * 2;
      const planetElev = (seeded(li * 30 + pi * 2 + 888) - 0.5) * Math.PI;
      const planetR = Math.min(w, h) * (0.08 + seeded(li * 10 + pi + 999) * 0.06);
      const planetX = cx + Math.cos(planetAngle) * Math.cos(planetElev) * planetR;
      const planetY = cy + Math.sin(planetElev) * planetR;

      allParticles.push({
        x: startX,
        y: startY,
        startX,
        startY,
        letterX: letterCx + pt.x,
        letterY: letterCy + pt.y,
        planetX,
        planetY,
        phraseX: 0,
        phraseY: 0,
        baseSize: 0.4 + seeded(li * 40 + pi + 123) * 1.2,
        color: GOLDEN_PALETTE[li % GOLDEN_PALETTE.length],
        letterIndex: li,
        driftPhase: seeded(li * 60 + pi + 456) * Math.PI * 2,
        driftSpeed: 0.3 + seeded(li * 80 + pi + 789) * 0.7,
      });
    });
  });

  return allParticles;
}

/* 将短语点分配给粒子 */
function assignPhraseTargets(particles: CosmicParticle[], phrasePts: Array<{x: number, y: number}>) {
  const shuffled = [...phrasePts].sort((a, b) => seeded(a.x * 1000 + a.y) - seeded(b.x * 1000 + b.y));
  particles.forEach((p, i) => {
    const target = shuffled[i % shuffled.length];
    p.phraseX = target.x;
    p.phraseY = target.y;
  });
}

/* ─────────────── 主组件 ─────────────── */
export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<CosmicParticle[]>([]);
  const starsRef = useRef<TwinkleStar[]>([]);
  const vortexRef = useRef<VortexLayer[]>([]);
  const frameRef = useRef<number>(0);
  const startedRef = useRef<number>(0);
  const completedRef = useRef(false);
  const [showSkip, setShowSkip] = useState(false);
  const [showTitle, setShowTitle] = useState(false);
  const [phaseLabel, setPhaseLabel] = useState('');
  const phaseLabelRef = useRef('');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = window.innerWidth;
    let h = window.innerHeight;

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      const ratio = window.devicePixelRatio || 1;
      canvas.width = Math.floor(w * ratio);
      canvas.height = Math.floor(h * ratio);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

      particlesRef.current = buildParticles(w, h);
      starsRef.current = buildStars(w, h);
      vortexRef.current = buildVortexLayers();

      const phraseFontSize = w < 640 ? 34 : 70;
      const phrasePts = samplePhrasePoints(w, h, phraseFontSize);
      assignPhraseTargets(particlesRef.current, phrasePts);
    };

    const finish = () => {
      if (completedRef.current) return;
      completedRef.current = true;
      cancelAnimationFrame(frameRef.current);
      onComplete();
    };

    /* ─── 绘制背景 ─── */
    const drawBackground = (elapsed: number) => {
      const cx = w / 2;
      const cy = h / 2;

      // 深空径向渐变
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(w, h) * 0.9);
      grad.addColorStop(0, VAN_GOGH.nightEdge);
      grad.addColorStop(0.35, '#070f28');
      grad.addColorStop(0.65, VAN_GOGH.deepVoid);
      grad.addColorStop(1, '#010208');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      // 梵高旋涡
      const time = elapsed / 1000;
      vortexRef.current.forEach((layer) => {
        const r = Math.min(w, h) * layer.radius;
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(layer.rotation + time * layer.rotSpeed);
        ctx.globalAlpha = layer.opacity * (0.7 + Math.sin(time * 0.4 + layer.rotation) * 0.3);
        ctx.strokeStyle = layer.color;
        ctx.lineWidth = layer.lineWidth;
        ctx.lineCap = 'round';

        // 绘制多条旋转椭圆形成旋涡
        const arms = 5;
        for (let arm = 0; arm < arms; arm++) {
          ctx.beginPath();
          const armRot = (arm / arms) * Math.PI * 2;
          for (let t = 0; t <= 1; t += 0.02) {
            const angle = armRot + t * Math.PI * 3;
            const dist = t * r;
            const ex = Math.cos(angle) * dist;
            const ey = Math.sin(angle) * dist * layer.ellipseRatio;
            // 加入旋涡扭曲
            const twist = Math.sin(t * Math.PI * 2 + time * 0.3) * r * 0.08;
            const px = ex + Math.cos(angle + layer.tilt) * twist;
            const py = ey + Math.sin(angle + layer.tilt) * twist;
            if (t === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
          }
          ctx.stroke();
        }

        // 中心发光核
        const nucleusGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, r * 0.15);
        nucleusGrad.addColorStop(0, `rgba(225, 208, 111, ${layer.opacity * 0.3})`);
        nucleusGrad.addColorStop(0.5, `rgba(76, 99, 148, ${layer.opacity * 0.15})`);
        nucleusGrad.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = nucleusGrad;
        ctx.beginPath();
        ctx.arc(0, 0, r * 0.15, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      });

      // 呼吸星星
      starsRef.current.forEach((star) => {
        const breath = 0.35 + Math.sin(elapsed / star.speed + star.phase) * 0.35;
        const alpha = star.baseAlpha * breath;
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.fillStyle = star.color;

        if (star.cross && star.size > 0.6) {
          // 十字星芒（梵高式星星）
          const s = star.size * (0.8 + breath * 0.5);
          ctx.shadowBlur = 8 + breath * 12;
          ctx.shadowColor = star.color;
          ctx.beginPath();
          ctx.arc(star.x, star.y, s * 0.4, 0, Math.PI * 2);
          ctx.fill();
          // 十字光芒
          ctx.strokeStyle = star.color;
          ctx.lineWidth = 0.4;
          ctx.globalAlpha = alpha * 0.6;
          ctx.beginPath();
          ctx.moveTo(star.x - s * 2.5, star.y);
          ctx.lineTo(star.x + s * 2.5, star.y);
          ctx.moveTo(star.x, star.y - s * 2.5);
          ctx.lineTo(star.x, star.y + s * 2.5);
          ctx.stroke();
          // 对角光芒
          ctx.globalAlpha = alpha * 0.3;
          ctx.beginPath();
          ctx.moveTo(star.x - s * 1.5, star.y - s * 1.5);
          ctx.lineTo(star.x + s * 1.5, star.y + s * 1.5);
          ctx.moveTo(star.x + s * 1.5, star.y - s * 1.5);
          ctx.lineTo(star.x - s * 1.5, star.y + s * 1.5);
          ctx.stroke();
        } else {
          // 普通小星点
          ctx.shadowBlur = 3 + breath * 6;
          ctx.shadowColor = star.color;
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size * (0.6 + breath * 0.6), 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      });

      // 底部柏树剪影（梵高式火焰状轮廓）
      const cypressAlpha = 0.25 + Math.sin(time * 0.15) * 0.05;
      ctx.save();
      ctx.globalAlpha = cypressAlpha;
      ctx.fillStyle = VAN_GOGH.cypress;
      const treeCount = Math.ceil(w / 180);
      for (let t = 0; t < treeCount; t++) {
        const tx = (w / (treeCount + 1)) * (t + 1) + Math.sin(t * 2.3) * 30;
        const th = 60 + seeded(t * 100 + 55) * 80;
        ctx.beginPath();
        ctx.moveTo(tx, h);
        ctx.quadraticCurveTo(tx - 15, h - th * 0.5, tx - 8, h - th);
        ctx.quadraticCurveTo(tx, h - th * 1.15, tx + 8, h - th);
        ctx.quadraticCurveTo(tx + 15, h - th * 0.5, tx, h);
        ctx.fill();
      }
      ctx.restore();
    };

    /* ─── 计算粒子位置 ─── */
    const computeParticlePosition = (p: CosmicParticle, progress: number, elapsed: number) => {
      // 阶段1: 0-0.24 (0-6s) 星尘初现 - 从远处缓慢飘来
      // 阶段2: 0.24-0.52 (6-13s) 字母凝结
      // 阶段3: 0.52-0.80 (13-20s) 星球汇聚
      // 阶段4: 0.80-1.00 (20-25s) 拉升成文

      let tx: number, ty: number, scale: number, alpha: number;
      const drift = Math.sin(elapsed / 2000 + p.driftPhase) * 2;

      if (progress < 0.24) {
        const t = easeOutQuart(clamp01(progress / 0.24));
        tx = lerp(p.startX, p.letterX, t * 0.15);
        ty = lerp(p.startY, p.letterY, t * 0.15);
        scale = 0.3 + t * 0.4;
        alpha = 0.2 + t * 0.3;
      } else if (progress < 0.52) {
        const t = easeInOutCubic(clamp01((progress - 0.24) / 0.28));
        const midX = lerp(p.startX, p.letterX, 0.15);
        const midY = lerp(p.startY, p.letterY, 0.15);
        tx = lerp(midX, p.letterX, t);
        ty = lerp(midY, p.letterY, t);
        scale = 0.7 + t * 0.5;
        alpha = 0.5 + t * 0.4;
      } else if (progress < 0.80) {
        const t = easeOutBack(clamp01((progress - 0.52) / 0.28));
        tx = lerp(p.letterX, p.planetX, t);
        ty = lerp(p.letterY, p.planetY, t);
        scale = 1.2 - t * 0.2;
        alpha = 0.9;
      } else {
        const t = easeOutExpo(clamp01((progress - 0.80) / 0.20));
        tx = lerp(p.planetX, p.phraseX, t);
        ty = lerp(p.planetY, p.phraseY, t);
        scale = 1.0 + t * 0.1;
        alpha = 0.9 - t * 0.1;
      }

      return { x: tx + drift, y: ty + drift * 0.5, scale, alpha };
    };

    /* ─── 绘制粒子 ─── */
    const drawParticles = (elapsed: number, progress: number) => {
      const particles = particlesRef.current;
      if (!particles.length) return;

      ctx.save();
      particles.forEach((p) => {
        const pos = computeParticlePosition(p, progress, elapsed);
        const size = p.baseSize * pos.scale;

        ctx.globalAlpha = pos.alpha;
        ctx.fillStyle = p.color;
        ctx.shadowBlur = size * 3;
        ctx.shadowColor = p.color;

        ctx.beginPath();
        ctx.arc(pos.x, pos.y, size, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.restore();
    };

    /* ─── 绘制星球团光晕（阶段3）─── */
    const drawPlanetGlow = (progress: number, elapsed: number) => {
      if (progress < 0.48 || progress > 0.88) return;
      const planetProgress = clamp01((progress - 0.48) / 0.40);
      const cx = w / 2;
      const cy = h / 2;
      const radius = Math.min(w, h) * 0.12 * (1 + Math.sin(planetProgress * Math.PI) * 0.3);
      const breath = 0.8 + Math.sin(elapsed / 800) * 0.2;

      ctx.save();

      // 外层光晕
      const outerGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius * 3);
      outerGrad.addColorStop(0, `rgba(184, 134, 11, ${0.25 * breath * Math.sin(planetProgress * Math.PI)})`);
      outerGrad.addColorStop(0.3, `rgba(205, 133, 63, ${0.12 * breath * Math.sin(planetProgress * Math.PI)})`);
      outerGrad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = outerGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 3, 0, Math.PI * 2);
      ctx.fill();

      // 内层球体
      const innerGrad = ctx.createRadialGradient(cx - radius * 0.3, cy - radius * 0.3, 0, cx, cy, radius);
      innerGrad.addColorStop(0, `rgba(225, 208, 111, ${0.6 * breath})`);
      innerGrad.addColorStop(0.4, `rgba(184, 134, 11, ${0.4 * breath})`);
      innerGrad.addColorStop(0.8, `rgba(139, 90, 0, ${0.2 * breath})`);
      innerGrad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = innerGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    };

    /* ─── 绘制拉丁文（阶段4）─── */
    const drawPhrase = (progress: number, elapsed: number) => {
      if (progress < 0.72) return;
      const phraseProgress = clamp01((progress - 0.72) / 0.28);
      const eased = easeOutExpo(phraseProgress);
      const settle = clamp01((phraseProgress - 0.55) / 0.45);
      const breath = 0.55 + Math.sin(elapsed / 950) * 0.45;
      const fontSize = w < 640 ? 34 : 70;

      // 主文字
      ctx.save();
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.font = `800 ${fontSize}px Georgia, "Times New Roman", serif`;
      ctx.globalAlpha = eased * (0.35 + breath * 0.3);
      ctx.shadowBlur = 20 + breath * 20;
      ctx.shadowColor = VAN_GOGH.amber;
      ctx.fillStyle = VAN_GOGH.darkGold;
      ctx.fillText(PHRASE, w / 2, h / 2 + (w < 640 ? 8 : 18));
      ctx.restore();

      // 消散中的粒子（叠加在文字上增加质感）
      if (phraseProgress < 0.85) {
        ctx.save();
        particlesRef.current.forEach((p, i) => {
          if (i % 3 !== 0) return;
          const distToPhrase = Math.sqrt(
            Math.pow(p.phraseX - p.planetX, 2) + Math.pow(p.phraseY - p.planetY, 2)
          );
          if (distToPhrase < 5) return;
          const t = eased;
          const px = lerp(p.planetX, p.phraseX, t);
          const py = lerp(p.planetY, p.phraseY, t);
          const wave = Math.sin(elapsed / 600 + i * 0.1) * (1 - t) * 10;
          ctx.globalAlpha = (1 - t) * 0.4;
          ctx.fillStyle = p.color;
          ctx.shadowBlur = 3;
          ctx.shadowColor = p.color;
          ctx.beginPath();
          ctx.arc(px + wave, py + wave * 0.5, p.baseSize * 0.8, 0, Math.PI * 2);
          ctx.fill();
        });
        ctx.restore();
      }

      //  settled 后显示标题
      if (settle > 0.8 && !showTitle) {
        setShowTitle(true);
      }
    };

    /* ─── 阶段标签 ─── */
    const updatePhaseLabel = (progress: number) => {
      const labels = [
        { t: 0,    label: 'STARDUST EMERGES FROM THE VOID' },
        { t: 0.24, label: 'TWENTY-SIX LETTERS CONDENSE' },
        { t: 0.52, label: 'A PLANET OF LIGHT FORMS' },
        { t: 0.80, label: 'PER ASPERA AD ASTRA' },
      ];
      for (let i = labels.length - 1; i >= 0; i--) {
        if (progress >= labels[i].t) {
          if (phaseLabelRef.current !== labels[i].label) {
            phaseLabelRef.current = labels[i].label;
            setPhaseLabel(labels[i].label);
          }
          break;
        }
      }
    };

    /* ─── 主循环 ─── */
    const draw = (timestamp: number) => {
      if (!startedRef.current) startedRef.current = timestamp;
      const elapsed = timestamp - startedRef.current;
      const progress = clamp01(elapsed / DURATION);

      ctx.clearRect(0, 0, w, h);

      drawBackground(elapsed);
      drawParticles(elapsed, progress);
      drawPlanetGlow(progress, elapsed);
      drawPhrase(progress, elapsed);
      updatePhaseLabel(progress);

      if (progress >= 1) {
        finish();
        return;
      }
      frameRef.current = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener('resize', resize);
    frameRef.current = requestAnimationFrame(draw);

    const skipTimer = window.setTimeout(() => setShowSkip(true), 2000);
    const completeTimer = window.setTimeout(finish, DURATION + 500);

    return () => {
      window.removeEventListener('resize', resize);
      window.clearTimeout(skipTimer);
      window.clearTimeout(completeTimer);
      cancelAnimationFrame(frameRef.current);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden" style={{ background: VAN_GOGH.deepVoid }}>
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

      {/* 阶段标签 */}
      <div className="pointer-events-none absolute inset-x-0 bottom-28 flex flex-col items-center px-4 text-center">
        <motion.div
          key={phaseLabel}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="text-[10px] font-black uppercase tracking-[0.35em] text-amber-100/50 md:text-xs"
        >
          {phaseLabel}
        </motion.div>
      </div>

      {/* 梵星标题 - 拉丁文成文后浮现 */}
      {showTitle && (
        <div className="pointer-events-none absolute inset-x-0 bottom-14 flex flex-col items-center px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            className="text-5xl font-black tracking-normal text-[#f5ead2] md:text-7xl"
            style={{ textShadow: '0 0 40px rgba(184,134,11,0.5), 0 0 80px rgba(184,134,11,0.2)' }}
          >
            梵星
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="mt-2 text-sm font-semibold tracking-[0.25em] text-[#b8860b]"
          >
            Per Aspera Ad Astra
          </motion.p>
        </div>
      )}

      {/* 跳过按钮 */}
      {showSkip && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={onComplete}
          className="absolute bottom-8 right-8 rounded-full border border-amber-100/15 bg-amber-50/10 px-4 py-2 text-xs text-amber-50/70 transition-all hover:bg-amber-50/20 hover:text-white"
        >
          跳过
        </motion.button>
      )}
    </div>
  );
}
