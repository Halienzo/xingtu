/**
 * Comprehensive OCR data cleanup script v2
 * Handles: copyright titles, empty trailing stories, bad title prefixes
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_FILE = path.join(__dirname, '../../src/data/gradedReadingData.ts');

const content = fs.readFileSync(DATA_FILE, 'utf8');
const dataMatch = content.match(/gradedReadingData:[\s\S]*?= ([\s\S]+?);\n\nexport const gradedReadingBooks/);
if (!dataMatch) {
  console.error('Could not parse gradedReadingData');
  process.exit(1);
}

const data = JSON.parse(dataMatch[1]);
let fixedTitles = 0;
let clearedStories = 0;
let fixedPrefixes = 0;

function fixTitle(title) {
  if (!title) return '';
  let t = title.trim();
  // Remove leading brackets, pipes, arrows, numbers
  t = t.replace(/^([>»A-Z$a-z0-9]{1,5}\s+|[\|\}\]\)\-\s]+)/, '');
  // Remove leading isolated digits/punctuation like "16", "8 )", "6 3"
  t = t.replace(/^(\d+[\s\)\]\}]?\s*)/, '');
  t = t.trim();
  // Capitalize first letter
  if (t.length > 0) {
    t = t[0].toUpperCase() + t.slice(1);
  }
  return t;
}

function isCopyrightTitle(title) {
  if (!title) return false;
  const lower = title.toLowerCase();
  return lower.includes('scan the code') ||
         lower.includes('download the audio') ||
         lower.includes('dc canada') ||
         lower.includes('copyright') ||
         lower.includes('all rights reserved');
}

function isCopyrightSentence(sentence) {
  if (!sentence) return false;
  const lower = sentence.toLowerCase();
  return lower.includes('scan the code') ||
         lower.includes('dc canada') ||
         lower.includes('copyright') ||
         lower.includes('all rights reserved');
}

function clearStory(story) {
  story.transcriptEn = '';
  story.transcriptCn = '';
  story.sentences = [];
  story.titleEn = '';
  story.titleCn = '';
  story.audioSrc = '';
}

// --- Pass 1: Clear copyright stories and fix titles ---
for (const level of Object.keys(data)) {
  const stories = data[level];
  
  for (const story of stories) {
    const originalTitle = story.titleEn;
    
    // Check if this is a copyright page
    if (isCopyrightTitle(story.titleEn)) {
      clearStory(story);
      clearedStories++;
      continue;
    }
    
    // Check sentences for copyright content
    const cleanSentences = story.sentences.filter(s => !isCopyrightSentence(s));
    if (cleanSentences.length < story.sentences.length) {
      story.sentences = cleanSentences;
      story.transcriptEn = cleanSentences.join(' ');
      // Recheck if empty after cleanup
      if (cleanSentences.length === 0) {
        clearStory(story);
        clearedStories++;
        continue;
      }
    }
    
    // Fix title prefix issues
    let fixedTitle = fixTitle(story.titleEn);
    if (fixedTitle !== story.titleEn) {
      if (fixedTitle.length > 0) {
        story.titleEn = fixedTitle;
        fixedPrefixes++;
      } else {
        // Title became empty, use a fallback
        story.titleEn = `Story ${story.story}`;
        fixedPrefixes++;
      }
    }
    
    // Additional: if title is just a number or punctuation, replace it
    if (/^[\d\s\)\]\}\-\.]+$/.test(story.titleEn)) {
      story.titleEn = `Story ${story.story}`;
      fixedPrefixes++;
    }
    
    // Fix any title that starts with just digits
    if (/^\d+[\s\)\]]?$/.test(story.titleEn)) {
      story.titleEn = `Story ${story.story}`;
      fixedPrefixes++;
    }
  }
}

// --- Pass 2: Clear trailing empty stories per book ---
for (const level of Object.keys(data)) {
  const stories = data[level];
  // Group by book
  const byBook = {};
  for (const s of stories) {
    if (!byBook[s.book]) byBook[s.book] = [];
    byBook[s.book].push(s);
  }
  
  for (const bookNum of Object.keys(byBook)) {
    const bookStories = byBook[bookNum].sort((a, b) => a.story - b.story);
    // From the end, clear stories with no sentences until we hit one with content
    for (let i = bookStories.length - 1; i >= 0; i--) {
      const s = bookStories[i];
      if (s.sentences.length === 0 && (!s.transcriptEn || s.transcriptEn.length < 5)) {
        if (s.titleEn && !s.titleEn.startsWith('Story ')) {
          // Only clear if it looks like a trailing empty entry
          clearStory(s);
          clearedStories++;
        } else if (!s.titleEn || s.titleEn === '' || s.titleEn.startsWith('Story ')) {
          clearStory(s);
          clearedStories++;
        } else {
          break; // Has some meaningful title, stop
        }
      } else {
        break; // Has content, stop
      }
    }
  }
}

// --- Pass 3: Handle remaining empty stories with meaningful titles ---
for (const level of Object.keys(data)) {
  for (const story of data[level]) {
    if (story.sentences.length === 0 && story.titleEn && !story.titleEn.startsWith('Story ')) {
      // Has a title but no content - check if it's at the end of a book
      const bookStories = data[level].filter(s => s.book === story.book).sort((a, b) => a.story - b.story);
      const maxStory = Math.max(...bookStories.map(s => s.story));
      if (story.story >= maxStory - 1) {
        clearStory(story);
        clearedStories++;
      }
    }
  }
}

// --- Regenerate the TypeScript file ---
function storyToTs(story) {
  return `  {
    id: "${story.id}",
    level: "${story.level}",
    book: ${story.book},
    story: ${story.story},
    monthEn: "${story.monthEn}",
    monthCn: "${story.monthCn}",
    titleEn: ${JSON.stringify(story.titleEn)},
    titleCn: ${JSON.stringify(story.titleCn)},
    audioSrc: ${JSON.stringify(story.audioSrc)},
    transcriptEn: ${JSON.stringify(story.transcriptEn)},
    transcriptCn: ${JSON.stringify(story.transcriptCn)},
    sentences: [${story.sentences.map(s => JSON.stringify(s)).join(', ')}],
    imageLeft: "${story.imageLeft}",
    imageRight: "${story.imageRight}",
  }`;
}

const l1Stories = data.l1.map(storyToTs).join(',\n');
const l2Stories = data.l2.map(storyToTs).join(',\n');
const l3Stories = data.l3.map(storyToTs).join(',\n');

function buildBookMeta(levelStories) {
  const byBook = {};
  for (const s of levelStories) {
    if (!byBook[s.book]) byBook[s.book] = { monthEn: s.monthEn, monthCn: s.monthCn, count: 0 };
    if (s.sentences.length > 0 || (s.transcriptEn && s.transcriptEn.length >= 5)) {
      byBook[s.book].count++;
    }
  }
  return Object.keys(byBook).sort((a,b) => +a - +b).map(book => {
    const b = byBook[book];
    return `    { book: ${book}, monthEn: "${b.monthEn}", monthCn: "${b.monthCn}", storyCount: ${b.count} }`;
  }).join(',\n');
}

const newContent = `// Auto-generated by build-graded-reading-data.mjs
// Cleaned by fix-ocr-data-v2.mjs
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

export const gradedReadingData: Record<GradedLevel, GradedReadingStory[]> = {
  l1: [
${l1Stories}
  ],
  l2: [
${l2Stories}
  ],
  l3: [
${l3Stories}
  ],
};

export const gradedReadingBooks: Record<GradedLevel, Array<{book: number; monthEn: string; monthCn: string; storyCount: number}>> = {
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
`;

fs.writeFileSync(DATA_FILE, newContent, 'utf8');
console.log(`OCR cleanup v2 complete!`);
console.log(`  Fixed ${fixedPrefixes} title prefixes`);
console.log(`  Cleared ${clearedStories} copyright/empty stories`);
