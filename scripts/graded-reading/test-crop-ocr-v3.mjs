import sharp from 'sharp';
import { createWorker } from 'tesseract.js';

const testImages = [
  'public/follow-reading/graded/l1/book01/001_L.jpg',
  'public/follow-reading/graded/l1/book01/002_L.jpg',
  'public/follow-reading/graded/l1/book01/003_L.jpg',
  'public/follow-reading/graded/l1/book01/010_L.jpg',
  'public/follow-reading/graded/l2/book01/001_L.jpg',
  'public/follow-reading/graded/l3/book01/001_L.jpg',
];

function stripPrefix(line) {
  // Remove common OCR prefix artifacts
  let s = line;
  // Date icon patterns
  s = s.replace(/^999%\s*/, '');
  s = s.replace(/^[A-Z]\s*\d\s*[\]\)\}]\s*/, ''); // "A 1 ]"
  s = s.replace(/^\d+[\)\]\}\.]\s*/, ''); // "5.", "2)", "30]"
  s = s.replace(/^[\|\>\?\:\s\.\~\(\&\%\*\-\=\{\;\,]+/, ''); // symbols
  s = s.replace(/^[a-z]{1,3}\s+/i, ''); // isolated short words like "Coa", "B", "WS", "a"
  s = s.replace(/^\d+\s*/, ''); // leading numbers
  return s.trim();
}

function isGibberish(line) {
  const trimmed = line.trim();
  if (!trimmed) return true;
  const letterCount = (trimmed.match(/[a-zA-Z]/g) || []).length;
  const totalLen = trimmed.length;
  const wordCount = trimmed.split(/\s+/).length;
  
  // Pure symbols/numbers
  if (letterCount === 0) return true;
  // Very low letter ratio with few words
  if (totalLen > 3 && letterCount / totalLen < 0.35 && wordCount <= 3) return true;
  // Short nonsense with special chars
  if (wordCount <= 2 && letterCount <= 4 && /[^a-zA-Z\s\.\!\?\'\"\-]/.test(trimmed)) return true;
  return false;
}

function isTitle(line) {
  const stripped = stripPrefix(line);
  if (!stripped) return false;
  const words = stripped.split(/\s+/);
  if (words.length < 2 || words.length > 20) return false;
  const capWords = words.filter(w => /^[A-Z]/.test(w)).length;
  const letterCount = (stripped.match(/[a-zA-Z]/g) || []).length;
  if (letterCount < 3) return false;
  if (capWords < 1) return false;
  // Title typically ends with ? or ! or has no period
  const hasPeriod = stripped.endsWith('.');
  const hasQuestion = stripped.endsWith('?');
  const hasExclaim = stripped.endsWith('!');
  // If it has a period and many words, might be a sentence, not a title
  if (hasPeriod && words.length > 8) return false;
  return true;
}

function cleanOCRText(text) {
  const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
  const cleaned = [];
  let titleFound = false;
  let bodyStarted = false;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    if (!titleFound) {
      if (isTitle(line)) {
        titleFound = true;
        cleaned.push(stripPrefix(line));
      }
      continue;
    }
    
    // After title found
    // Check if this line is body text (substantial English)
    const stripped = stripPrefix(line);
    if (!stripped) continue;
    
    // If we've collected enough body text, start filtering tail noise
    if (cleaned.length >= 4) {
      if (isGibberish(stripped)) continue;
    }
    
    cleaned.push(stripped);
  }
  
  return cleaned;
}

async function cropAndOCR(imagePath, worker) {
  const img = sharp(imagePath);
  const metadata = await img.metadata();
  const width = metadata.width;
  const height = metadata.height;
  
  const top = Math.round(height * 0.10);
  const cropHeight = Math.round(height * 0.70);
  
  const croppedBuffer = await img
    .extract({ left: 0, top, width, height: cropHeight })
    .greyscale()
    .toBuffer();
  
  const result = await worker.recognize(croppedBuffer);
  const cleaned = cleanOCRText(result.data.text);
  return {
    path: imagePath,
    raw: result.data.text,
    cleaned,
  };
}

const worker = await createWorker('eng');

for (const imgPath of testImages) {
  const r = await cropAndOCR(imgPath, worker);
  console.log('\n===', imgPath, '===');
  console.log('Cleaned lines:');
  r.cleaned.forEach((line, i) => console.log(`  [${i}] ${line}`));
}

await worker.terminate();
