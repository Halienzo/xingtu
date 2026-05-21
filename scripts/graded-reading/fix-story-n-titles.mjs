/**
 * Incremental fix: Re-OCR stories with Story N titles using improved title detection
 */
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';
import { createWorker } from 'tesseract.js';

const appRoot = path.resolve('.');
const publicRoot = path.join(appRoot, 'public', 'follow-reading', 'graded');
const DATA_FILE = path.join(appRoot, 'src', 'data', 'gradedReadingData.ts');

// Read current data
const content = fs.readFileSync(DATA_FILE, 'utf8');
const dataMatch = content.match(/gradedReadingData:[\s\S]*?= ([\s\S]+?);\n\nexport const gradedReadingBooks/);
const data = eval('(' + dataMatch[1] + ')');

// Find all Story N titles
const toFix = [];
for (const level of ['l1', 'l2', 'l3']) {
  for (const s of data[level]) {
    if (s.titleEn.startsWith('Story ')) {
      toFix.push({ ...s });
    }
  }
}

console.log(`Found ${toFix.length} stories with Story N titles to fix`);

// Improved OCR cleaning
function cleanTitle(line) {
  // Require second char to be lowercase — rejects "TTR E" but accepts "Tall Tom"
  const match = line.match(/[A-Z][a-z].*/);
  return match ? match[0].trim() : line.trim();
}

function stripPrefix(title) {
  let s = title.replace(/^[A-Z]{2,3}\s+/, ''); // Only strip 2-3 cap prefixes like "TZ", "NY'"
  s = s.replace(/^\d+[\.\)]\s*/, ''); // "12. " or "5) "
  return s.trim();
}

function stripSuffix(title) {
  let s = title;
  for (let i = 0; i < 3; i++) {
    const before = s;
    s = s.replace(/\s+[A-Z]\s*$/g, '');
    s = s.replace(/\s+\d+\s*$/g, '');
    s = s.replace(/[\-\\=\#\{\}\|—\–\*\+\~\[\]\(\)\<\>\d]+$/g, '');
    if (s === before) break;
  }
  return s.trim();
}

function cleanInner(title) {
  let s = title;
  s = s.replace(/\s*\|\s*/g, ' ');
  s = s.replace(/\\/g, '');
  s = s.replace(/\s{2,}/g, ' ').trim();
  return s;
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

async function reOCR(story, worker) {
  const imgPath = path.join(publicRoot, story.level, `book${String(story.book).padStart(2,'0')}`, `${String(story.story).padStart(3,'0')}_L.jpg`);
  if (!fs.existsSync(imgPath)) return null;
  
  const img = sharp(imgPath);
  const metadata = await img.metadata();
  const top = Math.round(metadata.height * 0.15);
  const cropHeight = Math.round(metadata.height * 0.50);
  
  const croppedBuffer = await img.extract({ left: 0, top, width: metadata.width, height: cropHeight }).greyscale().toBuffer();
  const result = await worker.recognize(croppedBuffer);
  
  const lines = result.data.text.split('\n').map(l => l.trim()).filter(Boolean);
  
  for (const line of lines) {
    let candidate = cleanTitle(line);
    if (!candidate) continue;
    candidate = stripPrefix(candidate);
    candidate = stripSuffix(candidate);
    candidate = cleanInner(candidate);
    
    const words = candidate.split(/\s+/);
    if (words.length >= 2 && words.length <= 15 && looksLikeTitle(candidate)) {
      return candidate;
    }
  }
  return null;
}

const worker = await createWorker('eng');
let fixed = 0;

for (const story of toFix) {
  const newTitle = await reOCR(story, worker);
  if (newTitle && newTitle !== story.titleEn) {
    // Update in data
    const s = data[story.level].find(x => x.id === story.id);
    if (s) {
      s.titleEn = newTitle;
      fixed++;
      console.log(`  Fixed ${story.id}: "${newTitle}"`);
    }
  }
}

await worker.terminate();

// Regenerate file
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

const newContent = content.replace(
  /gradedReadingData:[\s\S]*?};\n\nexport const gradedReadingBooks/,
  `gradedReadingData: Record<GradedLevel, GradedReadingStory[]> = {
  l1: [
${data.l1.map(storyToTs).join(',\n')}
  ],
  l2: [
${data.l2.map(storyToTs).join(',\n')}
  ],
  l3: [
${data.l3.map(storyToTs).join(',\n')}
  ],
};

export const gradedReadingBooks`
).replace(
  /gradedReadingBooks:[\s\S]*?};\n/,
  `gradedReadingBooks: Record<GradedLevel, Array<{book: number; monthEn: string; monthCn: string; storyCount: number}>> = {
  l1: [
${buildBookMeta(data.l1)}
  ],
  l2: [
${buildBookMeta(data.l2)}
  ],
  l3: [
${buildBookMeta(data.l3)}
  ],
};
`
);

fs.writeFileSync(DATA_FILE, newContent, 'utf8');
console.log(`\nFixed ${fixed} titles. File updated.`);
