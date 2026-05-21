/**
 * OCR data cleanup v3 - Sentence-level cleanup
 * Handles: story number prefixes, tail noise, pipe-to-I, title extraction
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_FILE = path.join(__dirname, '../../src/data/gradedReadingData.ts');
let content = fs.readFileSync(DATA_FILE, 'utf8');

// --- Regex-based story block extraction and modification ---
// We parse each story block and clean it individually

const storyRegex = /\{\s*id:\s*"([^"]+)",\s*level:\s*"([^"]+)",\s*book:\s*(\d+),\s*story:\s*(\d+),[\s\S]*?titleEn:\s*"([^"]*)",\s*titleCn:\s*"([^"]*)",\s*audioSrc:\s*"([^"]*)",\s*transcriptEn:\s*"([^"]*)",[\s\S]*?sentences:\s*\[([\s\S]*?)\],/g;

let match;
let cleanedStories = 0;
const stories = [];

// First pass: extract all story data
while ((match = storyRegex.exec(content)) !== null) {
  const [fullBlock, id, level, book, story, titleEn, titleCn, audioSrc, transcriptEnRaw, sentencesBlock] = match;
  stories.push({
    fullBlock,
    id,
    level,
    book: +book,
    story: +story,
    titleEn,
    titleCn,
    audioSrc,
    transcriptEnRaw,
    sentencesBlock,
    index: match.index,
  });
}

console.log(`Found ${stories.length} stories to process`);

// --- Sentence cleaning functions ---
function cleanSentence(sentence) {
  if (!sentence) return '';
  let s = sentence;
  
  // Replace literal \n with actual newlines for processing
  s = s.replace(/\\n/g, '\n');
  
  // Remove story number prefix patterns:
  // "| 1\n>? " or "999%\nA 2 ]\nRIOTS " or "2)\nSal\n& " or "999%\n\n4 : : |\n\n"
  s = s.replace(/^[\|\d\%\)\]\}\>\?\:\s]+\n/, ''); // leading number lines like "| 1\n"
  s = s.replace(/^[\d\%\)\]\}\>\?\:\s]+/, ''); // leading chars on first line
  s = s.replace(/^999%\s*\n?/, ''); // "999%" date icon
  s = s.replace(/^[A-Z]\s+\d\s*[\]\)\}]\s*\n?/, ''); // "A 2 ]" 
  s = s.replace(/^\d+[\)\]\}]\s*\n?/, ''); // "2)" or "16]"
  s = s.replace(/^[\>\?\|\s]+\s*\n?/, ''); // ">?" or "|" prefix
  
  // Remove decorative prefix words that aren't sentence starts
  s = s.replace(/^(RIOTS|Sal|OPT|Jo!|re)\s*\n?/i, '');
  
  // Clean up remaining prefix artifacts on the title line
  s = s.replace(/^\s*[\|\>\?\%\)\]\}\s]+\s*/, '');
  
  // Remove tail noise: anything that looks like publisher info, gibberish, symbols
  // Split by newlines and keep only lines that look like English sentences
  const lines = s.split('\n');
  const cleanLines = [];
  let foundGibberish = false;
  
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    
    // If line is mostly gibberish (high ratio of non-letter chars, very short)
    const letterCount = (trimmed.match(/[a-zA-Z]/g) || []).length;
    const totalLen = trimmed.length;
    const wordCount = trimmed.split(/\s+/).length;
    
    // Skip lines that are pure symbols/numbers
    if (letterCount === 0 && totalLen > 0) {
      foundGibberish = true;
      continue;
    }
    
    // Skip lines with very low letter ratio (mostly symbols)
    if (totalLen > 5 && letterCount / totalLen < 0.3 && wordCount < 3) {
      foundGibberish = true;
      continue;
    }
    
    // Skip isolated short nonsense like "3k", "TINA", "> : |"
    if (wordCount <= 2 && letterCount < 5 && /[^a-zA-Z\s\.\!\?\'\"]/.test(trimmed)) {
      foundGibberish = true;
      continue;
    }
    
    // Once we hit gibberish, skip the rest (tail noise is at the end)
    if (foundGibberish) continue;
    
    cleanLines.push(line);
  }
  
  s = cleanLines.join('\n');
  
  // Fix pipe characters used as "I" (when surrounded by spaces or at start)
  s = s.replace(/\b\|\b/g, 'I');
  s = s.replace(/^\| /gm, 'I ');
  
  // Replace double-question-mark boxes with regular quotes
  s = s.replace(/\uFFFD/g, '"');
  
  // Clean up extra whitespace
  s = s.replace(/\n{3,}/g, '\n\n');
  s = s.trim();
  
  return s;
}

function extractTitleFromFirstSentence(sentence) {
  if (!sentence) return null;
  // Look for a capitalized title pattern in the first sentence
  const lines = sentence.split('\n');
  for (const line of lines) {
    const clean = line.trim();
    // Title should be 2-8 words, mostly capitalized, no ending punctuation other than ?!
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

// --- Process each story ---
for (const story of stories) {
  // Parse sentences array from the block
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
    if (!cleaned) {
      changed = true;
      continue; // Skip empty sentences
    }
    
    cleanedSentences.push(cleaned);
    
    // Try to extract title from first sentence if current title is generic
    if (i === 0 && (!story.titleEn || story.titleEn.startsWith('Story '))) {
      const extracted = extractTitleFromFirstSentence(cleaned);
      if (extracted && extracted.length > 2 && !/^(Story \d+|\d+|\|)/.test(extracted)) {
        newTitle = extracted;
      }
    }
  }
  
  // Rebuild transcript from cleaned sentences
  const newTranscript = cleanedSentences.join(' ').replace(/\n/g, '\\n');
  
  // Update title if we found a better one
  let finalTitle = story.titleEn;
  if (newTitle && newTitle !== story.titleEn) {
    finalTitle = newTitle;
    changed = true;
  }
  
  // Also clean up obviously bad titles
  if (/^\d+$/.test(finalTitle) || /^[\|\>\?\%\)\]\}\s]+$/.test(finalTitle) || finalTitle === '0\\') {
    finalTitle = `Story ${story.story}`;
    changed = true;
  }
  
  if (!changed) continue;
  
  // Rebuild the sentences block
  const newSentencesBlock = cleanedSentences.map(s => {
    // Escape quotes and newlines for TS string literal
    const escaped = s.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n');
    return `    "${escaped}"`;
  }).join(',\n');
  
  // Build new story block
  const newBlock = story.fullBlock
    .replace(/titleEn:\s*"[^"]*"/, `titleEn: "${finalTitle.replace(/"/g, '\\"')}"`)
    .replace(/transcriptEn:\s*"[^"]*"/, `transcriptEn: "${newTranscript.replace(/"/g, '\\"')}"`)
    .replace(/sentences:\s*\[[\s\S]*?\],/, `sentences: [\n${newSentencesBlock}\n  ],`);
  
  content = content.replace(story.fullBlock, newBlock);
  cleanedStories++;
}

fs.writeFileSync(DATA_FILE, content, 'utf8');
console.log(`OCR cleanup v3 complete! Cleaned ${cleanedStories} stories.`);
