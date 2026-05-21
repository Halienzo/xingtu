/**
 * Recover data from corrupted TS file and regenerate clean version
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_FILE = path.join(__dirname, '../../src/data/gradedReadingData.ts');
const content = fs.readFileSync(DATA_FILE, 'utf8');

// Match story blocks using a more robust pattern that handles multiline strings
const storyRegex = /\{\s*id:\s*"([^"]+)"\s*,\s*level:\s*"([^"]+)"\s*,\s*book:\s*(\d+)\s*,\s*story:\s*(\d+)\s*,\s*monthEn:\s*"([^"]*)"\s*,\s*monthCn:\s*"([^"]*)"\s*,\s*titleEn:\s*"([^"]*)"\s*,\s*titleCn:\s*"([^"]*)"\s*,\s*audioSrc:\s*"([^"]*)"\s*,\s*transcriptEn:\s*"([\s\S]*?)"\s*,\s*transcriptCn:\s*"([^"]*)"\s*,\s*sentences:\s*\[([\s\S]*?)\]\s*,\s*imageLeft:\s*"([^"]*)"\s*,\s*imageRight:\s*"([^"]*)"\s*,?\s*\}/g;

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
    titleEn: m[7],
    titleCn: m[8],
    audioSrc: m[9],
    transcriptEn: m[10],
    transcriptCn: m[11],
    sentencesBlock: m[12],
    imageLeft: m[13],
    imageRight: m[14],
  });
}

console.log(`Extracted ${stories.length} stories`);

function cleanSentence(sentence) {
  if (!sentence) return '';
  let s = sentence;
  
  // Remove story number prefix patterns
  s = s.replace(/^[\|\d\%\)\]\}\>\?\:\s]+\n/, '');
  s = s.replace(/^[\d\%\)\]\}\>\?\:\s]+/, '');
  s = s.replace(/^999%\s*\n?/, '');
  s = s.replace(/^[A-Z]\s+\d\s*[\]\)\}]\s*\n?/, '');
  s = s.replace(/^\d+[\)\]\}]\s*\n?/, '');
  s = s.replace(/^[\>\?\|\s]+\s*\n?/, '');
  s = s.replace(/^(RIOTS|Sal|OPT|Jo!|re)\s*\n?/i, '');
  s = s.replace(/^\s*[\|\>\?\%\)\]\}\s]+\s*/, '');
  
  // Remove tail noise by line analysis
  const lines = s.split('\n');
  const cleanLines = [];
  let foundGibberish = false;
  
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    
    const letterCount = (trimmed.match(/[a-zA-Z]/g) || []).length;
    const totalLen = trimmed.length;
    const wordCount = trimmed.split(/\s+/).length;
    
    if (letterCount === 0 && totalLen > 0) { foundGibberish = true; continue; }
    if (totalLen > 5 && letterCount / totalLen < 0.3 && wordCount < 3) { foundGibberish = true; continue; }
    if (wordCount <= 2 && letterCount < 5 && /[^a-zA-Z\s\.\!\?\'\"]/.test(trimmed)) { foundGibberish = true; continue; }
    if (foundGibberish) continue;
    
    cleanLines.push(line);
  }
  
  s = cleanLines.join('\n');
  s = s.replace(/\b\|\b/g, 'I');
  s = s.replace(/^\| /gm, 'I ');
  s = s.replace(/\uFFFD/g, '"');
  s = s.replace(/\n{3,}/g, '\n\n');
  s = s.trim();
  
  return s;
}

function extractTitleFromFirstSentence(sentence) {
  if (!sentence) return null;
  const lines = sentence.split('\n');
  for (const line of lines) {
    const clean = line.trim();
    const words = clean.split(/\s+/);
    if (words.length >= 2 && words.length <= 12) {
      const capWords = words.filter(w => /^[A-Z]/.test(w)).length;
      if (capWords >= words.length * 0.5 && !/^[\d\|\>\?\%]/.test(clean)) {
        return clean.replace(/[\*\#\@\$\%\^\&]+$/, '').trim();
      }
    }
  }
  return null;
}

let cleanedCount = 0;

for (const story of stories) {
  // Parse sentences
  const sentenceMatches = [...story.sentencesBlock.matchAll(/"((?:[^"\\]|\\.)*)"/g)];
  const sentences = sentenceMatches.map(m => m[1].replace(/\\"/g, '"').replace(/\\n/g, '\n'));
  
  if (sentences.length === 0) continue;
  
  let changed = false;
  const cleanedSentences = [];
  let newTitle = null;
  
  for (let i = 0; i < sentences.length; i++) {
    const original = sentences[i];
    const cleaned = cleanSentence(original);
    if (cleaned !== original) changed = true;
    if (!cleaned) { changed = true; continue; }
    cleanedSentences.push(cleaned);
    
    if (i === 0 && (!story.titleEn || story.titleEn.startsWith('Story '))) {
      const extracted = extractTitleFromFirstSentence(cleaned);
      if (extracted && extracted.length > 2 && !/^(Story \d+|\d+|\|)/.test(extracted)) {
        newTitle = extracted;
      }
    }
  }
  
  const newTranscript = cleanedSentences.join(' ');
  let finalTitle = story.titleEn;
  if (newTitle && newTitle !== story.titleEn) { finalTitle = newTitle; changed = true; }
  if (/^\d+$/.test(finalTitle) || /^[\|\>\?\%\)\]\}\s]+$/.test(finalTitle) || finalTitle === '0\\') {
    finalTitle = `Story ${story.story}`; changed = true;
  }
  
  story.titleEn = finalTitle;
  story.transcriptEn = newTranscript;
  story.sentences = cleanedSentences;
  if (changed) cleanedCount++;
}

console.log(`Cleaned ${cleanedCount} stories`);

// Regenerate TypeScript file
function esc(s) {
  return s.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n');
}

function storyToTs(story) {
  const sents = (story.sentences || []).map(s => `    "${esc(s)}"`).join(',\n');
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

const l1 = stories.filter(s => s.level === 'l1');
const l2 = stories.filter(s => s.level === 'l2');
const l3 = stories.filter(s => s.level === 'l3');

function buildBookMeta(levelStories) {
  const byBook = {};
  for (const s of levelStories) {
    if (!byBook[s.book]) byBook[s.book] = { monthEn: s.monthEn, monthCn: s.monthCn, count: 0 };
    if ((s.sentences || []).length > 0 || (s.transcriptEn && s.transcriptEn.length >= 5)) {
      byBook[s.book].count++;
    }
  }
  return Object.keys(byBook).sort((a,b) => +a - +b).map(book => {
    const b = byBook[book];
    return `    { book: ${book}, monthEn: "${b.monthEn}", monthCn: "${b.monthCn}", storyCount: ${b.count} }`;
  }).join(',\n');
}

const newContent = `// Auto-generated by build-graded-reading-data.mjs
// Cleaned by recover-and-clean.mjs
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

fs.writeFileSync(DATA_FILE, newContent, 'utf8');
console.log('File regenerated successfully!');
