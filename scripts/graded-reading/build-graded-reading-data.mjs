import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { pdf } from 'pdf-to-img';
import { createWorker } from 'tesseract.js';
import { execSync } from 'node:child_process';
import ffmpegInstaller from '@ffmpeg-installer/ffmpeg';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const appRoot = path.resolve(__dirname, '../..');
const repoRoot = path.resolve(appRoot, '..');

const publicRoot = path.join(appRoot, 'public', 'follow-reading', 'graded');
const outputFile = path.join(appRoot, 'src', 'data', 'gradedReadingData.ts');
const tempDir = path.join(appRoot, 'node_modules', '.graded-reading-temp');

const ffmpegPath = ffmpegInstaller.path;

// Ensure temp directory exists
fs.mkdirSync(tempDir, { recursive: true });

// ============================================
// Level Configurations
// ============================================

const LEVELS = {
  l1: {
    label: 'Level 1',
    sublabel: '幼儿版',
    pdfDir: path.join(repoRoot, 'One story a day Level 1', '幼儿版 故事文本'),
    audioDir: path.join(repoRoot, 'One story a day Level 1'),
    accent: 'amber',
    ageNote: '5-7岁 · 彩色绘本',
  },
  l2: {
    label: 'Level 2',
    sublabel: '小学版',
    pdfDir: path.join(repoRoot, 'One story a day Level 2', '小学版 故事文本'),
    audioDir: path.join(repoRoot, 'One story a day Level 2', '小学版 故事音频'),
    accent: 'emerald',
    ageNote: '6岁+ · 彩色绘本',
  },
  l3: {
    label: 'Level 3',
    sublabel: '初中版',
    pdfDir: path.join(repoRoot, 'One story a Day Level 3', '初中版 故事文本'),
    audioDir: path.join(repoRoot, 'One story a Day Level 3'),
    accent: 'cyan',
    ageNote: '初中 · 黑白插图',
  },
};

const MONTH_NAMES = [
  { en: 'January', cn: '一月' },
  { en: 'February', cn: '二月' },
  { en: 'March', cn: '三月' },
  { en: 'April', cn: '四月' },
  { en: 'May', cn: '五月' },
  { en: 'June', cn: '六月' },
  { en: 'July', cn: '七月' },
  { en: 'August', cn: '八月' },
  { en: 'September', cn: '九月' },
  { en: 'October', cn: '十月' },
  { en: 'November', cn: '十一月' },
  { en: 'December', cn: '十二月' },
];

// ============================================
// Helpers
// ============================================

function clean(text) {
  return String(text || '')
    .replace(/\u00a0/g, ' ')
    .replace(/\uFEFF/g, '')
    .replace(/[ \t]+/g, ' ')
    .trim();
}

function splitSentences(text) {
  return clean(text)
    .split(/(?<=[.!?])\s+(?=[A-Z""])/)
    .map(clean)
    .filter((sentence) => sentence.length > 8)
    .slice(0, 30); // Allow more sentences for graded stories
}

function pad(n, width = 2) {
  return String(n).padStart(width, '0');
}

function pad3(n) {
  return String(n).padStart(3, '0');
}

// ============================================
// PDF Discovery
// ============================================

function findPDFs(dirPath) {
  const results = [];
  function walk(dir) {
    const items = fs.readdirSync(dir, { withFileTypes: true });
    for (const item of items) {
      const full = path.join(dir, item.name);
      if (item.isDirectory()) {
        walk(full);
      } else if (item.name.endsWith('.pdf')) {
        results.push(full);
      }
    }
  }
  walk(dirPath);
  return results;
}

// Extract book number from PDF folder name
function extractBookNumber(folderName) {
  // Match patterns like "book-1-68", "book-10-66", "one story a day 1-68", "one story a day book-1-68"
  const match = folderName.match(/(?:book[-\s])?(\d+)[-\s]\d+/);
  if (match) return parseInt(match[1], 10);
  // Try "book 1" pattern
  const match2 = folderName.match(/book\s*(\d+)/i);
  if (match2) return parseInt(match2[1], 10);
  return null;
}

// ============================================
// Audio Discovery & Normalization
// ============================================

function discoverAudioFiles(levelKey, bookNum) {
  const config = LEVELS[levelKey];
  let audioFiles = [];

  if (levelKey === 'l1') {
    // Level 1: audio files are in numbered directories 1-12
    const bookDir = path.join(config.audioDir, String(bookNum));
    if (!fs.existsSync(bookDir)) return [];
    const files = fs.readdirSync(bookDir)
      .filter(f => f.match(/\.(mp3|wma)$/i))
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
    
    for (const file of files) {
      const ext = path.extname(file).toLowerCase();
      // Try to extract story number from filename
      const match = file.match(/b\d+s(\d+)/i) || file.match(/(\d+)/);
      const storyNum = match ? parseInt(match[1], 10) : null;
      audioFiles.push({
        source: path.join(bookDir, file),
        storyNum,
        ext,
        originalName: file,
      });
    }
  } else if (levelKey === 'l2') {
    // Level 2: audio files are in month-named subdirectories
    const audioBase = config.audioDir;
    const monthDirs = fs.readdirSync(audioBase, { withFileTypes: true })
      .filter(i => i.isDirectory())
      .map(i => i.name)
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
    
    const monthDir = monthDirs[bookNum - 1];
    if (!monthDir) return [];
    const fullDir = path.join(audioBase, monthDir);
    const files = fs.readdirSync(fullDir)
      .filter(f => f.endsWith('.mp3'))
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
    
    for (const file of files) {
      const match = file.match(/track\s*(\d+)/i) || file.match(/(\d+)/);
      const storyNum = match ? parseInt(match[1], 10) : null;
      audioFiles.push({
        source: path.join(fullDir, file),
        storyNum,
        ext: '.mp3',
        originalName: file,
      });
    }
  } else if (levelKey === 'l3') {
    // Level 3: audio files are in month directories or bkX mp3 subdirectories
    const monthDir = path.join(config.audioDir, pad(bookNum, 2) + '月');
    if (!fs.existsSync(monthDir)) return [];
    
    function collect(dir) {
      const items = fs.readdirSync(dir, { withFileTypes: true });
      for (const item of items) {
        const full = path.join(dir, item.name);
        if (item.isDirectory()) {
          collect(full);
        } else if (item.name.endsWith('.mp3')) {
          const match = item.name.match(/B\d+S(\d+)/i);
          const storyNum = match ? parseInt(match[1], 10) : null;
          // Also extract title from filename
          const titleMatch = item.name.match(/B\d+S\d+\s+(.+?)\.mp3$/i);
          const title = titleMatch ? titleMatch[1].trim() : '';
          audioFiles.push({
            source: full,
            storyNum,
            ext: '.mp3',
            originalName: item.name,
            title,
          });
        }
      }
    }
    collect(monthDir);
    // Sort by story number
    audioFiles.sort((a, b) => (a.storyNum || 0) - (b.storyNum || 0));
  }

  return audioFiles;
}

function normalizeAudio(sourcePath, targetPath) {
  fs.mkdirSync(path.dirname(targetPath), { recursive: true });
  const ext = path.extname(sourcePath).toLowerCase();
  
  if (ext === '.mp3') {
    fs.copyFileSync(sourcePath, targetPath);
  } else {
    // Convert using ffmpeg
    const cmd = `"${ffmpegPath}" -y -i "${sourcePath}" -ar 44100 -ac 2 -b:a 128k "${targetPath}"`;
    try {
      execSync(cmd, { stdio: 'pipe' });
    } catch (e) {
      console.error(`Audio conversion failed: ${sourcePath}`);
      console.error(e.message);
      throw e;
    }
  }
}

// ============================================
// PDF → Images
// ============================================

async function extractStoryImages(pdfPath, bookNum, storyCount, outDir) {
  fs.mkdirSync(outDir, { recursive: true });
  
  console.log(`  Extracting images from ${path.basename(pdfPath)} (${storyCount} stories)...`);
  
  const document = await pdf(pdfPath, { scale: 2.0 });
  let pageNum = 0;
  const images = [];
  
  for await (const image of document) {
    pageNum++;
    // Skip first 5 pages (cover, copyright, preface, TOC x2)
    if (pageNum <= 5) {
      // Save cover separately
      if (pageNum === 1) {
        const coverPath = path.join(outDir, 'cover.jpg');
        fs.writeFileSync(coverPath, image);
        console.log(`    Saved cover.jpg`);
      }
      continue;
    }
    
    const storyIndex = Math.floor((pageNum - 6) / 2) + 1; // 1-based story number
    if (storyIndex > storyCount) {
      console.log(`    Skipping extra page ${pageNum} (beyond ${storyCount} stories)`);
      continue;
    }
    
    const isLeftPage = (pageNum - 6) % 2 === 0; // Left page = text page
    const suffix = isLeftPage ? 'L' : 'R';
    const outPath = path.join(outDir, `${pad3(storyIndex)}_${suffix}.jpg`);
    fs.writeFileSync(outPath, image);
    images.push({ storyIndex, suffix, path: outPath, pageNum });
  }
  
  console.log(`    Extracted ${images.length} pages for ${storyCount} stories`);
  return images;
}

// ============================================
// OCR
// ============================================

async function ocrStoryText(imagePath, worker) {
  const result = await worker.recognize(imagePath);
  let text = result.data.text;
  
  // Clean OCR output
  text = text
    .replace(/\r\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
  
  // Try to remove page number at start or end (standalone number on its own line)
  const lines = text.split('\n');
  const cleanedLines = [];
  for (const line of lines) {
    const trimmed = line.trim();
    // Skip standalone numbers (likely page numbers or date icons)
    if (/^\d+$/.test(trimmed) && trimmed.length <= 2) continue;
    cleanedLines.push(line);
  }
  
  return cleanedLines.join('\n').trim();
}

// ============================================
// Title Extraction
// ============================================

function extractTitleFromText(text, storyNum) {
  const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
  // First non-empty line after removing date number is likely the title
  for (const line of lines) {
    if (/^\d+$/.test(line) && line.length <= 2) continue; // Skip date number
    if (line.length > 3 && line.length < 100 && /[a-zA-Z]/.test(line)) {
      return line;
    }
  }
  return `Story ${storyNum}`;
}

// ============================================
// Build Single Level
// ============================================

async function buildLevel(levelKey, worker) {
  const config = LEVELS[levelKey];
  console.log(`\n========== Building ${config.label} (${config.sublabel}) ==========`);
  
  // Find all PDFs
  const pdfPaths = findPDFs(config.pdfDir);
  console.log(`Found ${pdfPaths.length} PDFs`);
  
  // Sort PDFs by book number
  const books = [];
  for (const pdfPath of pdfPaths) {
    const folderName = path.basename(path.dirname(pdfPath));
    const bookNum = extractBookNumber(folderName);
    if (bookNum && bookNum >= 1 && bookNum <= 12) {
      books.push({ bookNum, pdfPath, folderName });
    }
  }
  books.sort((a, b) => a.bookNum - b.bookNum);
  
  const allStories = [];
  const bookMetas = [];
  
  for (const book of books) {
    const { bookNum, pdfPath } = book;
    const monthMeta = MONTH_NAMES[bookNum - 1];
    console.log(`\n--- Book ${bookNum} (${monthMeta.en}) ---`);
    
    // Discover audio files
    const audioFiles = discoverAudioFiles(levelKey, bookNum);
    const storyCount = audioFiles.length;
    console.log(`  Audio files: ${storyCount}`);
    
    if (storyCount === 0) {
      console.log(`  SKIPPING: No audio files found`);
      continue;
    }
    
    // Extract images from PDF
    const bookOutDir = path.join(publicRoot, levelKey, `book${pad(bookNum)}`);
    const images = await extractStoryImages(pdfPath, bookNum, storyCount, bookOutDir);
    
    // Process each story
    const bookStories = [];
    for (let s = 1; s <= storyCount; s++) {
      const audioInfo = audioFiles[s - 1];
      const leftImage = path.join(bookOutDir, `${pad3(s)}_L.jpg`);
      const rightImage = path.join(bookOutDir, `${pad3(s)}_R.jpg`);
      
      // OCR left page
      let transcriptEn = '';
      let titleEn = audioInfo.title || '';
      if (fs.existsSync(leftImage)) {
        transcriptEn = await ocrStoryText(leftImage, worker);
        if (!titleEn) {
          titleEn = extractTitleFromText(transcriptEn, s);
        }
        // Remove title from transcript
        const lines = transcriptEn.split('\n');
        if (lines.length > 0 && lines[0].trim() === titleEn) {
          transcriptEn = lines.slice(1).join('\n').trim();
        }
      }
      
      // Normalize audio
      const audioTarget = path.join(bookOutDir, `${pad3(s)}.mp3`);
      normalizeAudio(audioInfo.source, audioTarget);
      
      const story = {
        id: `graded-${levelKey}-b${pad(bookNum)}-s${pad3(s)}`,
        level: levelKey,
        book: bookNum,
        story: s,
        monthEn: monthMeta.en,
        monthCn: monthMeta.cn,
        titleEn: titleEn || `Book ${bookNum} Story ${s}`,
        titleCn: '',
        audioSrc: `./follow-reading/graded/${levelKey}/book${pad(bookNum)}/${pad3(s)}.mp3`,
        transcriptEn,
        transcriptCn: '',
        sentences: splitSentences(transcriptEn),
        imageLeft: `./follow-reading/graded/${levelKey}/book${pad(bookNum)}/${pad3(s)}_L.jpg`,
        imageRight: `./follow-reading/graded/${levelKey}/book${pad(bookNum)}/${pad3(s)}_R.jpg`,
      };
      
      bookStories.push(story);
      allStories.push(story);
      
      if (s <= 2 || s === storyCount) {
        console.log(`    Story ${s}: "${story.titleEn}" (${story.sentences.length} sentences)`);
      }
    }
    
    bookMetas.push({
      book: bookNum,
      monthEn: monthMeta.en,
      monthCn: monthMeta.cn,
      storyCount: bookStories.length,
    });
    
    console.log(`  Book ${bookNum} complete: ${bookStories.length} stories`);
  }
  
  return { stories: allStories, books: bookMetas };
}

// ============================================
// Main
// ============================================

async function main() {
  console.log('========================================');
  console.log('Building Graded Reading Data');
  console.log('========================================');
  console.log(`Output: ${outputFile}`);
  console.log(`Public: ${publicRoot}`);
  console.log(`FFmpeg: ${ffmpegPath}`);
  
  fs.mkdirSync(publicRoot, { recursive: true });
  
  // Initialize Tesseract worker
  console.log('\nInitializing Tesseract OCR worker...');
  const worker = await createWorker('eng');
  
  const levelData = {};
  const bookData = {};
  
  try {
    for (const levelKey of ['l1', 'l2', 'l3']) {
      const result = await buildLevel(levelKey, worker);
      levelData[levelKey] = result.stories;
      bookData[levelKey] = result.books;
    }
  } finally {
    await worker.terminate();
  }
  
  // Generate TypeScript file
  const content = `// This file is generated by scripts/graded-reading/build-graded-reading-data.mjs.
// Do not edit by hand.

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

export const gradedReadingData: Record<GradedLevel, GradedReadingStory[]> = ${JSON.stringify(levelData, null, 2)};

export const gradedReadingBooks: Record<GradedLevel, GradedBookMeta[]> = ${JSON.stringify(bookData, null, 2)};

export const GRADED_LEVEL_META: Record<GradedLevel, { label: string; sublabel: string; accent: string; ageNote: string }> = {
  l1: { label: 'Level 1', sublabel: '幼儿版', accent: 'amber', ageNote: '5-7岁 · 彩色绘本' },
  l2: { label: 'Level 2', sublabel: '小学版', accent: 'emerald', ageNote: '6岁+ · 彩色绘本' },
  l3: { label: 'Level 3', sublabel: '初中版', accent: 'cyan', ageNote: '初中 · 黑白插图' },
};
`;
  
  fs.mkdirSync(path.dirname(outputFile), { recursive: true });
  fs.writeFileSync(outputFile, content, 'utf8');
  
  console.log('\n========================================');
  console.log('Build complete!');
  console.log(`Output: ${outputFile}`);
  for (const [level, stories] of Object.entries(levelData)) {
    console.log(`${level}: ${stories.length} stories total`);
  }
  console.log('========================================');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
