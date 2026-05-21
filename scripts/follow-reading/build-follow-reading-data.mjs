import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import mammoth from 'mammoth';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const appRoot = path.resolve(__dirname, '../..');
const repoRoot = path.resolve(appRoot, '..');

const publicRoot = path.join(appRoot, 'public', 'follow-reading');
const outputFile = path.join(appRoot, 'src', 'data', 'followReadingData.ts');

const LEVELS = {
  elementary: {
    audioDir: '40篇故事（小学）- 音频',
    ext: '.mp3',
    count: 40,
    audioName: (n) => `${n}.mp3`,
    title: (n) => `Primary Story ${n}`,
    titleCn: (n) => `小学故事第 ${n} 集`,
  },
  junior: {
    audioDir: '70篇初中短文记单词音频',
    docx: '71篇短文搞定中考词汇word版.docx',
    ext: '.m4a',
    count: 70,
    audioName: (n) => `${String(n).padStart(2, '0')}.m4a`,
  },
  senior: {
    audioDir: '40篇高中文章音频(英音)',
    docx: '40篇英语短文搞定3500个单词word版.docx',
    ext: '.mp3',
    count: 40,
    audioName: (n) => `英音 ${n}.mp3`,
  },
};

function clean(text) {
  return String(text || '')
    .replace(/\u00a0/g, ' ')
    .replace(/\uFEFF/g, '')
    .replace(/[ \t]+/g, ' ')
    .trim();
}

function hasChinese(text) {
  return /[\u4e00-\u9fa5]/.test(text);
}

function splitSentences(text) {
  return clean(text)
    .split(/(?<=[.!?])\s+(?=[A-Z"“])/)
    .map(clean)
    .filter((sentence) => sentence.length > 8)
    .slice(0, 18);
}

function parseBilingualTitle(rawTitle, fallback) {
  const title = clean(rawTitle || fallback).replace(/\bP\/eased\b/g, 'Pleased');
  const chineseMatch = title.match(/[\u4e00-\u9fa5].*$/);
  const titleCn = chineseMatch ? clean(chineseMatch[0]) : '';
  const titleEn = titleCn ? clean(title.replace(titleCn, '')) : title;
  return { titleEn: titleEn || fallback, titleCn };
}

function getJuniorTitle(paragraph) {
  const text = clean(paragraph);
  if (hasChinese(text)) return null;
  const match = text.match(/^([lI]|\d{1,2})[.．]\s*(.+)$/);
  if (!match) return null;
  const number = /[lI]/.test(match[1]) ? 1 : Number(match[1]);
  const title = clean(match[2]);
  if (title.length < 3 || title.length > 86) return null;
  const bodyLikeStart = /^(If|There|You|Then|Also|When|Remember|Buy|Believe|Prepare|Follow|Lay|The students|The teacher|The first student|Taking|Barack)\b/i;
  if (bodyLikeStart.test(title)) return null;
  if (!/[A-Za-z]/.test(title)) return null;
  return { number, title };
}

function getSeniorTitle(paragraph) {
  const text = clean(paragraph);
  if (!/^\d{1,2}[.．]\s*/.test(text)) return null;
  const number = Number(text.match(/^(\d{1,2})[.．]\s*/)?.[1]);
  const rest = clean(text.replace(/^\d{1,2}[.．]\s*/, ''));
  if (!(rest.length > 3 && rest.length < 110)) return null;
  return { number, title: rest };
}

function collectEpisodes(paragraphs, getTitle, maxCount) {
  const episodes = [];
  let current = null;
  let lastTitleNumber = 0;

  for (const paragraph of paragraphs) {
    const text = clean(paragraph);
    if (!text) continue;
    const titleInfo = getTitle(text);
    if (titleInfo && titleInfo.number >= lastTitleNumber) {
      if (current) episodes.push(current);
      lastTitleNumber = titleInfo.number;
      const { titleEn, titleCn } = parseBilingualTitle(titleInfo.title, `Episode ${episodes.length + 1}`);
      current = { titleEn, titleCn, english: [], chinese: [] };
      continue;
    }
    if (!current) continue;
    if (hasChinese(text)) current.chinese.push(text);
    else current.english.push(text);
  }

  if (current) episodes.push(current);
  return episodes.slice(0, maxCount);
}

async function readDocxParagraphs(filename) {
  const result = await mammoth.extractRawText({ path: path.join(repoRoot, filename) });
  return result.value.split(/\r?\n/).map(clean).filter(Boolean);
}

function copyAudio(levelKey, config) {
  const sourceDir = path.join(repoRoot, config.audioDir);
  const targetDir = path.join(publicRoot, levelKey);
  fs.mkdirSync(targetDir, { recursive: true });

  const items = [];
  for (let i = 1; i <= config.count; i += 1) {
    const source = path.join(sourceDir, config.audioName(i));
    const ext = path.extname(source).toLowerCase();
    const targetName = `${String(i).padStart(3, '0')}${ext}`;
    const target = path.join(targetDir, targetName);
    if (!fs.existsSync(source)) throw new Error(`Missing audio: ${source}`);
    fs.copyFileSync(source, target);
    items.push(`./follow-reading/${levelKey}/${targetName}`);
  }
  return items;
}

async function buildLevel(levelKey, config) {
  const audioPaths = copyAudio(levelKey, config);
  let episodes = [];

  if (levelKey === 'elementary') {
    episodes = Array.from({ length: config.count }, (_, index) => ({
      titleEn: config.title(index + 1),
      titleCn: config.titleCn(index + 1),
      english: [],
      chinese: [],
    }));
  } else {
    const paragraphs = await readDocxParagraphs(config.docx);
    episodes = collectEpisodes(
      paragraphs,
      levelKey === 'junior' ? getJuniorTitle : getSeniorTitle,
      config.count,
    );
    if (episodes.length !== config.count) {
      throw new Error(`${levelKey} parsed ${episodes.length} episodes, expected ${config.count}`);
    }
  }

  return episodes.map((episode, index) => {
    const englishText = episode.english.join('\n\n');
    const chineseText = episode.chinese.join('\n\n');
    return {
      id: `${levelKey}-${String(index + 1).padStart(3, '0')}`,
      level: levelKey,
      episode: index + 1,
      titleEn: episode.titleEn,
      titleCn: episode.titleCn,
      audioSrc: audioPaths[index],
      transcriptEn: englishText,
      transcriptCn: chineseText,
      sentences: splitSentences(englishText),
    };
  });
}

const levels = {};
for (const [levelKey, config] of Object.entries(LEVELS)) {
  levels[levelKey] = await buildLevel(levelKey, config);
}

const content = `// This file is generated by scripts/follow-reading/build-follow-reading-data.mjs.
// Do not edit by hand.

export type FollowReadingLevel = 'elementary' | 'junior' | 'senior';

export interface FollowReadingEpisode {
  id: string;
  level: FollowReadingLevel;
  episode: number;
  titleEn: string;
  titleCn: string;
  audioSrc: string;
  transcriptEn: string;
  transcriptCn: string;
  sentences: string[];
}

export const followReadingData: Record<FollowReadingLevel, FollowReadingEpisode[]> = ${JSON.stringify(levels, null, 2)};
`;

fs.mkdirSync(path.dirname(outputFile), { recursive: true });
fs.writeFileSync(outputFile, content, 'utf8');

console.log(`Generated ${outputFile}`);
for (const [level, items] of Object.entries(levels)) {
  console.log(`${level}: ${items.length} episodes`);
}
