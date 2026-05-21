/**
 * Comprehensive title fix script v2
 */
import fs from 'fs';

const file = 'src/data/gradedReadingData.ts';
let content = fs.readFileSync(file, 'utf8');

// Parse all stories
const storyRegex = /\{\s*id:\s*"([^"]+)"[\s\S]*?story:\s*(\d+)[\s\S]*?titleEn:\s*"([^"]*)"[\s\S]*?\}/g;
const stories = [];
let m;
while ((m = storyRegex.exec(content)) !== null) {
  stories.push({ block: m[0], id: m[1], story: m[2], title: m[3] });
}

let fixed = 0;

function fixCamelCase(title) {
  // Insert space between lowercase and uppercase: "ABirdand" -> "A Bird and"
  // But preserve common patterns like "Don't", "It's"
  return title
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/([A-Z])([A-Z][a-z])/g, '$1 $2');
}

function stripPrefix(title) {
  // Remove leading 1-3 letter all-caps + space (OCR artifacts like "TTR E", "TZ Rubber")
  let s = title.replace(/^[A-Z]{1,3}\s+/, '');
  // Remove leading orphan pattern like "BrkiDar" (not a real word, starts with cap but has weird middle)
  const words = s.split(/\s+/);
  if (words.length > 1 && /^[A-Z][a-z]*[A-Z]/.test(words[0]) && words[0].length <= 8) {
    // First word has internal cap like "BrkiDar" — likely artifact
    s = words.slice(1).join(' ');
  }
  return s;
}

function stripSuffix(title) {
  // Remove trailing: single letter, number, short nonsense
  let s = title;
  for (let i = 0; i < 3; i++) {
    const before = s;
    s = s.replace(/\s+[A-Z]\s*$/g, ''); // "Sleep? Y"
    s = s.replace(/\s+\d+\s*$/g, ''); // "Backyard-2"
    s = s.replace(/\s+[A-Z]{1,2}\s*\d*\s*$/g, ''); // "FN 4", "N17."
    s = s.replace(/[\-\\\=\#\{\}\|\—\–\*\+\~\[\]\(\)\<\>\d]+$/g, ''); // trailing symbols
    if (s === before) break;
  }
  return s.trim();
}

function cleanInnerNoise(title) {
  let s = title;
  // Remove pipe characters
  s = s.replace(/\s*\|\s*/g, ' ');
  // Remove backslashes
  s = s.replace(/\\/g, '');
  // Remove stray numbers in middle
  s = s.replace(/\s+\d+\s+[A-Z]{1,2}\b/g, '');
  // Remove double-dash and similar
  s = s.replace(/\s*[\-—–]{2,}\s*/g, ' ');
  // Clean up extra spaces
  s = s.replace(/\s{2,}/g, ' ').trim();
  return s;
}

function looksLikeSentence(title) {
  // If title is a long sentence with period, it's probably not a title
  const words = title.split(/\s+/);
  if (title.includes('.') && words.length > 8) return true;
  return false;
}

function looksLikeTitle(title) {
  const words = title.split(/\s+/);
  if (words.length < 2 || words.length > 15) return false;
  const letterCount = (title.match(/[a-zA-Z]/g) || []).length;
  if (letterCount < 3) return false;
  const capWords = words.filter(w => /^[A-Z]/.test(w)).length;
  if (capWords < 1) return false;
  // Reject if too many non-letter chars
  if (letterCount / title.length < 0.6) return false;
  return true;
}

for (const s of stories) {
  let newTitle = s.title;
  let changed = false;
  
  // Step 1: Fix camelCase
  if (/[a-z][A-Z]/.test(newTitle)) {
    newTitle = fixCamelCase(newTitle);
    changed = true;
  }
  
  // Step 2: Strip prefix artifacts
  const strippedPrefix = stripPrefix(newTitle);
  if (strippedPrefix !== newTitle) {
    newTitle = strippedPrefix;
    changed = true;
  }
  
  // Step 3: Strip suffix artifacts
  const strippedSuffix = stripSuffix(newTitle);
  if (strippedSuffix !== newTitle) {
    newTitle = strippedSuffix;
    changed = true;
  }
  
  // Step 4: Clean inner noise
  const cleaned = cleanInnerNoise(newTitle);
  if (cleaned !== newTitle) {
    newTitle = cleaned;
    changed = true;
  }
  
  // Step 5: If it looks like a sentence, discard
  if (looksLikeSentence(newTitle)) {
    newTitle = `Story ${s.story}`;
    changed = true;
  }
  
  // Step 6: Final validation
  if (!looksLikeTitle(newTitle)) {
    newTitle = `Story ${s.story}`;
    changed = true;
  }
  
  if (changed) {
    const newBlock = s.block.replace(/titleEn:\s*"[^"]*"/, `titleEn: "${newTitle.replace(/"/g, '\\"')}"`);
    content = content.replace(s.block, newBlock);
    fixed++;
  }
}

fs.writeFileSync(file, content, 'utf8');
console.log(`Fixed ${fixed} titles`);
