/**
 * Recover data from corrupted file and regenerate clean TS
 */
import fs from 'fs';

const file = 'src/data/gradedReadingData.ts';
const content = fs.readFileSync(file, 'utf8');

// Match story blocks with a more robust pattern
// Handle escaped quotes and multiline strings
const storyRegex = /\{\s*id:\s*"([^"]+)"\s*,\s*level:\s*"([^"]+)"\s*,\s*book:\s*(\d+)\s*,\s*story:\s*(\d+)\s*,\s*monthEn:\s*"([^"]*)"\s*,\s*monthCn:\s*"([^"]*)"\s*,\s*titleEn:\s*"((?:[^"\\]|\\.)*)"\s*,\s*titleCn:\s*"((?:[^"\\]|\\.)*)"\s*,\s*audioSrc:\s*"((?:[^"\\]|\\.)*)"\s*,\s*transcriptEn:\s*"((?:[^"\\]|\\.)*)"\s*,\s*transcriptCn:\s*"((?:[^"\\]|\\.)*)"\s*,\s*sentences:\s*\[([\s\S]*?)\]\s*,\s*imageLeft:\s*"((?:[^"\\]|\\.)*)"\s*,\s*imageRight:\s*"((?:[^"\\]|\\.)*)"\s*\}/g;

const stories = [];
let m;
while ((m = storyRegex.exec(content)) !== null) {
  stories.push({
    id: m[1],
    level: m[2],
    book: +m[3],
    story: +m[4],
    monthEn: m[5],
    monthCn: m[6],
    titleEn: m[7].replace(/\\"/g, '"').replace(/\\n/g, '\n'),
    titleCn: m[8].replace(/\\"/g, '"'),
    audioSrc: m[9].replace(/\\"/g, '"'),
    transcriptEn: m[10].replace(/\\"/g, '"').replace(/\\n/g, '\n'),
    transcriptCn: m[11].replace(/\\"/g, '"'),
    sentencesBlock: m[12],
    imageLeft: m[13].replace(/\\"/g, '"'),
    imageRight: m[14].replace(/\\"/g, '"'),
  });
}

console.log(`Recovered ${stories.length} stories`);

// Parse sentences
for (const s of stories) {
  const matches = [...s.sentencesBlock.matchAll(/"((?:[^"\\]|\\.)*)"/g)];
  s.sentences = matches.map(m => m[1].replace(/\\"/g, '"').replace(/\\n/g, '\n'));
}

// ===== Title fixes =====

function fixCamelCase(title) {
  return title
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/([A-Z])([A-Z][a-z])/g, '$1 $2');
}

function stripPrefix(title) {
  let s = title.replace(/^[A-Z]{1,3}\s+/, '');
  const words = s.split(/\s+/);
  if (words.length > 1 && /^[A-Z][a-z]*[A-Z]/.test(words[0]) && words[0].length <= 8) {
    s = words.slice(1).join(' ');
  }
  return s;
}

function stripSuffix(title) {
  let s = title;
  for (let i = 0; i < 3; i++) {
    const before = s;
    s = s.replace(/\s+[A-Z]\s*$/g, '');
    s = s.replace(/\s+\d+\s*$/g, '');
    s = s.replace(/\s+[A-Z]{1,2}\s*\d*\s*$/g, '');
    s = s.replace(/[\-\\=\#\{\}\|—\–\*\+\~\[\]\(\)\<\>\d]+$/g, '');
    if (s === before) break;
  }
  return s.trim();
}

function cleanInner(title) {
  let s = title;
  s = s.replace(/\s*\|\s*/g, ' ');
  s = s.replace(/\\/g, '');
  s = s.replace(/\s+\d+\s+[A-Z]{1,2}\b/g, '');
  s = s.replace(/\s*[\-—–]{2,}\s*/g, ' ');
  s = s.replace(/\s{2,}/g, ' ').trim();
  return s;
}

function looksLikeSentence(t) {
  const words = t.split(/\s+/);
  return t.includes('.') && words.length > 8;
}

function looksLikeTitle(t) {
  const words = t.split(/\s+/);
  if (words.length < 2 || words.length > 15) return false;
  const letterCount = (t.match(/[a-zA-Z]/g) || []).length;
  if (letterCount < 3) return false;
  if (words.filter(w => /^[A-Z]/.test(w)).length < 1) return false;
  if (letterCount / t.length < 0.6) return false;
  return true;
}

let fixed = 0;
for (const s of stories) {
  let t = s.titleEn;
  let changed = false;
  
  if (/[a-z][A-Z]/.test(t)) { t = fixCamelCase(t); changed = true; }
  
  const sp = stripPrefix(t);
  if (sp !== t) { t = sp; changed = true; }
  
  const ss = stripSuffix(t);
  if (ss !== t) { t = ss; changed = true; }
  
  const ci = cleanInner(t);
  if (ci !== t) { t = ci; changed = true; }
  
  if (looksLikeSentence(t)) { t = `Story ${s.story}`; changed = true; }
  if (!looksLikeTitle(t)) { t = `Story ${s.story}`; changed = true; }
  
  s.titleEn = t;
  if (changed) fixed++;
}

console.log(`Fixed ${fixed} titles`);

// ===== Regenerate TypeScript =====

function esc(s) {
  return s.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n');
}

function storyToTs(s) {
  const sents = s.sentences.map(str => `    "${esc(str)}"`).join(',\n');
  return `  {
    id: "${s.id}",
    level: "${s.level}",
    book: ${s.book},
    story: ${s.story},
    monthEn: "${s.monthEn}",
    monthCn: "${s.monthCn}",
    titleEn: "${esc(s.titleEn)}",
    titleCn: "${esc(s.titleCn)}",
    audioSrc: "${esc(s.audioSrc)}",
    transcriptEn: "${esc(s.transcriptEn)}",
    transcriptCn: "${esc(s.transcriptCn)}",
    sentences: [
${sents}
    ],
    imageLeft: "${s.imageLeft}",
    imageRight: "${s.imageRight}",
  }`;
}

function buildBookMeta(levelStories) {
  const byBook = {};
  for (const s of levelStories) {
    if (!byBook[s.book]) byBook[s.book] = { monthEn: s.monthEn, monthCn: s.monthCn, count: 0 };
    if (s.sentences.length > 0) byBook[s.book].count++;
  }
  return Object.keys(byBook).sort((a,b) => +a - +b).map(book => {
    const b = byBook[book];
    return `    { book: ${book}, monthEn: "${b.monthEn}", monthCn: "${b.monthCn}", storyCount: ${b.count} }`;
  }).join(',\n');
}

const l1 = stories.filter(s => s.level === 'l1');
const l2 = stories.filter(s => s.level === 'l2');
const l3 = stories.filter(s => s.level === 'l3');

const newContent = `// Auto-generated by rebuild-ocr-data.mjs + recover-from-bad-file.mjs
export type GradedLevel = 'l1' | 'l2' | 'l3';

export interface GradedReadingStory {
  id: string;
  level: GradedLevel;
  book: number;
  story: number;
  monthEn: string;
  monthCn: string;
  titleEn: string;
  titleCn: string;
  audioSrc: string;
  transcriptEn: string;
  transcriptCn: string;
  sentences: string[];
  imageLeft: string;
  imageRight: string;
}

export interface GradedBookMeta {
  book: number;
  monthEn: string;
  monthCn: string;
  storyCount: number;
}

export const GRADED_LEVEL_META: Record<GradedLevel, { label: string; sublabel: string; ageNote: string }> = {
  l1: { label: 'Level 1', sublabel: '幼儿版', ageNote: '5-7岁 · 彩色绘本' },
  l2: { label: 'Level 2', sublabel: '小学版', ageNote: '6岁+ · 彩色绘本' },
  l3: { label: 'Level 3', sublabel: '初中版', ageNote: '10岁+ · 进阶阅读' },
};

export const gradedReadingData: Record<GradedLevel, GradedReadingStory[]> = {
  l1: [
${l1.map(storyToTs).join(',\n')}
  ],
  l2: [
${l2.map(storyToTs).join(',\n')}
  ],
  l3: [
${l3.map(storyToTs).join(',\n')}
  ],
};

export const gradedReadingBooks: Record<GradedLevel, Array<{book: number; monthEn: string; monthCn: string; storyCount: number}>> = {
  l1: [
${buildBookMeta(l1)}
  ],
  l2: [
${buildBookMeta(l2)}
  ],
  l3: [
${buildBookMeta(l3)}
  ],
};
`;

fs.writeFileSync(file, newContent, 'utf8');
console.log('File regenerated successfully!');
