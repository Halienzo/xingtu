/**
 * Full rebuild: Re-OCR all _L.jpg images with smart cropping and cleaning
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { createWorker } from 'tesseract.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const appRoot = path.resolve(__dirname, '../..');
const publicRoot = path.join(appRoot, 'public', 'follow-reading', 'graded');
const outputFile = path.join(appRoot, 'src', 'data', 'gradedReadingData.ts');

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

function pad2(n) { return String(n).padStart(2, '0'); }
function pad3(n) { return String(n).padStart(3, '0'); }

// ===== OCR Cleaning =====

function cleanTitle(line) {
  const match = line.match(/[A-Z][a-zA-Z].*/);
  return match ? match[0].trim() : line.trim();
}

function cleanBodyLine(line) {
  let s = line.trim();
  if (!s) return '';
  
  for (let i = 0; i < 5; i++) {
    const before = s;
    s = s.replace(/[\s\=\#\{\}\|\\\/\—\–\*\@\$\%\^\&\+\~\[\]\(\)\<\>\d]+$/g, '');
    s = s.replace(/\s+\w{1,3}\s*[\|\—\–\=\#\*\+\~\^]+\s*["\'\)]*$/g, '');
    s = s.replace(/\s+\d+\s+\w{1,3}$/g, '');
    s = s.replace(/\s+[\—\–\-]+\s*\w{0,3}\s*$/g, '');
    if (s === before) break;
  }
  
  s = s.replace(/\s+\d+\s+\w{1,3}(?=\s|$)/g, '');
  s = s.replace(/\s+[A-Z]{1,2}$/g, '');
  s = s.replace(/\s+[A-Z]{1,2}\s+\w{1,2}$/g, '');
  
  return s.trim();
}

function isPureGibberish(line) {
  const trimmed = line.trim();
  if (!trimmed) return true;
  const letterCount = (trimmed.match(/[a-zA-Z]/g) || []).length;
  const totalLen = trimmed.length;
  if (letterCount === 0) return true;
  if (totalLen > 3 && letterCount / totalLen < 0.35) return true;
  if (/\b[A-Z]{2,}(\s+[A-Z]{2,}){2,}/.test(trimmed)) return true;
  if (letterCount <= 4 && trimmed.split(/\s+/).length >= 2 && !/[a-z]/.test(trimmed)) return true;
  return false;
}

function cleanOCRText(text) {
  const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
  const cleaned = [];
  let titleFound = false;
  let goodBodyLines = 0;
  let badLinesInARow = 0;
  
  for (const line of lines) {
    if (!titleFound) {
      const match = line.match(/[A-Z][a-zA-Z].*/);
      if (match) {
        const candidate = match[0].trim();
        const words = candidate.split(/\s+/);
        if (words.length >= 2 && words.length <= 18) {
          titleFound = true;
          cleaned.push(candidate);
        }
      }
      continue;
    }
    
    const cleanedLine = cleanBodyLine(line);
    if (!cleanedLine || isPureGibberish(cleanedLine)) {
      badLinesInARow++;
      if (badLinesInARow >= 3 && goodBodyLines >= 3) break;
      continue;
    }
    
    badLinesInARow = 0;
    goodBodyLines++;
    cleaned.push(cleanedLine);
  }
  
  return cleaned;
}

function splitSentences(lines) {
  const text = lines.join(' ');
  return text
    .replace(/\n/g, ' ')
    .split(/(?<=[.!?])\s+(?=[A-Z"])/)
    .map(s => s.trim())
    .filter(s => s.length > 8)
    .slice(0, 30);
}

// ===== Audio Matching =====

function findAudio(level, book, story) {
  const levelDir = path.join(publicRoot, level, `book${pad2(book)}`);
  const audioFile = path.join(levelDir, `${pad3(story)}.mp3`);
  if (fs.existsSync(audioFile)) {
    return `./follow-reading/graded/${level}/book${pad2(book)}/${pad3(story)}.mp3`;
  }
  return '';
}

// ===== Main =====

async function processStory(imagePath, worker) {
  const img = sharp(imagePath);
  const metadata = await img.metadata();
  const width = metadata.width;
  const height = metadata.height;
  
  const top = Math.round(height * 0.15);
  const cropHeight = Math.round(height * 0.50);
  
  const croppedBuffer = await img
    .extract({ left: 0, top, width, height: cropHeight })
    .greyscale()
    .toBuffer();
  
  const result = await worker.recognize(croppedBuffer);
  const cleaned = cleanOCRText(result.data.text);
  
  if (cleaned.length === 0) return { title: '', sentences: [] };
  
  const title = cleaned[0];
  const body = cleaned.slice(1);
  const sentences = splitSentences(body);
  
  // Post-process: replace isolated | with I
  const fixedSentences = sentences.map(s => {
    // Replace | that looks like I (surrounded by spaces or at start)
    return s.replace(/\b\|\b/g, 'I').replace(/^\| /gm, 'I ');
  });
  
  return { title, sentences: fixedSentences };
}

// ===== Title fixing =====

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

function fixTitle(title, storyNum) {
  let t = title || '';
  if (!t) return `Story ${storyNum}`;
  
  if (/[a-z][A-Z]/.test(t)) t = fixCamelCase(t);
  t = stripPrefix(t);
  t = stripSuffix(t);
  t = cleanInner(t);
  
  if (looksLikeSentence(t)) return `Story ${storyNum}`;
  if (!looksLikeTitle(t)) return `Story ${storyNum}`;
  
  return t;
}

async function main() {
  const worker = await createWorker('eng');
  const allStories = { l1: [], l2: [], l3: [] };
  
  for (const level of ['l1', 'l2', 'l3']) {
    const levelDir = path.join(publicRoot, level);
    const bookDirs = fs.readdirSync(levelDir)
      .filter(d => d.startsWith('book'))
      .sort();
    
    console.log(`\n========== Processing ${level.toUpperCase()} ==========`);
    
    for (const bookDir of bookDirs) {
      const bookNum = parseInt(bookDir.replace('book', ''), 10);
      const bookPath = path.join(levelDir, bookDir);
      
      // Find all _L.jpg files
      const leftImages = fs.readdirSync(bookPath)
        .filter(f => f.endsWith('_L.jpg'))
        .sort();
      
      console.log(`  Book ${pad2(bookNum)}: ${leftImages.length} stories`);
      
      for (const imgName of leftImages) {
        const storyNum = parseInt(imgName.split('_')[0], 10);
        const imgPath = path.join(bookPath, imgName);
        
        const { title, sentences } = await processStory(imgPath, worker);
        
        const audioSrc = findAudio(level, bookNum, storyNum);
        const transcriptEn = sentences.join(' ');
        
        const story = {
          id: `graded-${level}-b${pad2(bookNum)}-s${pad3(storyNum)}`,
          level,
          book: bookNum,
          story: storyNum,
          monthEn: MONTHS[bookNum - 1] || '',
          monthCn: ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'][bookNum - 1] || '',
          titleEn: fixTitle(title, storyNum),
          titleCn: '',
          audioSrc,
          transcriptEn,
          transcriptCn: '',
          sentences,
          imageLeft: `./follow-reading/graded/${level}/book${pad2(bookNum)}/${pad3(storyNum)}_L.jpg`,
          imageRight: `./follow-reading/graded/${level}/book${pad2(bookNum)}/${pad3(storyNum)}_R.jpg`,
        };
        
        allStories[level].push(story);
      }
    }
  }
  
  await worker.terminate();
  
  // Generate TypeScript file
  function esc(s) {
    return s.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n');
  }
  
  function storyToTs(story) {
    const sents = story.sentences.map(s => `    "${esc(s)}"`).join(',\n');
    return `  {
    id: "${story.id}",
    level: "${story.level}",
    book: ${story.book},
    story: ${story.story},
    monthEn: "${story.monthEn}",
    monthCn: "${story.monthCn}",
    titleEn: "${esc(story.titleEn)}",
    titleCn: "${esc(story.titleCn)}",
    audioSrc: "${esc(story.audioSrc)}",
    transcriptEn: "${esc(story.transcriptEn)}",
    transcriptCn: "${esc(story.transcriptCn)}",
    sentences: [
${sents}
    ],
    imageLeft: "${story.imageLeft}",
    imageRight: "${story.imageRight}",
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
  
  const newContent = `// Auto-generated by rebuild-ocr-data.mjs
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
${allStories.l1.map(storyToTs).join(',\n')}
  ],
  l2: [
${allStories.l2.map(storyToTs).join(',\n')}
  ],
  l3: [
${allStories.l3.map(storyToTs).join(',\n')}
  ],
};

export const gradedReadingBooks: Record<GradedLevel, Array<{book: number; monthEn: string; monthCn: string; storyCount: number}>> = {
  l1: [
${buildBookMeta(allStories.l1)}
  ],
  l2: [
${buildBookMeta(allStories.l2)}
  ],
  l3: [
${buildBookMeta(allStories.l3)}
  ],
};
`;
  
  fs.writeFileSync(outputFile, newContent, 'utf8');
  
  const validL1 = allStories.l1.filter(s => s.sentences.length > 0).length;
  const validL2 = allStories.l2.filter(s => s.sentences.length > 0).length;
  const validL3 = allStories.l3.filter(s => s.sentences.length > 0).length;
  
  console.log('\n========== REBUILD COMPLETE ==========');
  console.log(`L1: ${allStories.l1.length} stories, ${validL1} with text`);
  console.log(`L2: ${allStories.l2.length} stories, ${validL2} with text`);
  console.log(`L3: ${allStories.l3.length} stories, ${validL3} with text`);
  console.log(`Total: ${allStories.l1.length + allStories.l2.length + allStories.l3.length}`);
}

main().catch(e => { console.error(e); process.exit(1); });
