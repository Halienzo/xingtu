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

// STRICT prefix removal: ONLY known OCR artifacts, never generic words
function stripPrefix(line) {
  let s = line;
  // Date icon: "999%" at start of line
  s = s.replace(/^999%\s*/, '');
  // Date number patterns like "A 1 ]", "| 3 ]", "(7)", ">>", "(&"
  s = s.replace(/^[\|A-Z]\s*\d+\s*[\]\)\}]\s*/, '');
  s = s.replace(/^\(\&\s*/, '');
  s = s.replace(/^[\>\?\:\s\.\~\%\*\-\=\{\;\,\<\>]+/, '');
  // Specific artifacts that OCR produces for calendar icons
  s = s.replace(/^Coa\s+/i, ''); // "Coa" is a known artifact
  s = s.replace(/^WS\.\s*/i, ''); // "WS." artifact
  s = s.replace(/^B\s+/, ''); // single "B" artifact (only if followed by space and capital)
  s = s.replace(/^\d+\s+/, ''); // leading number followed by space
  return s.trim();
}

function isGibberish(line, bodyLen) {
  const trimmed = line.trim();
  if (!trimmed) return true;
  const letterCount = (trimmed.match(/[a-zA-Z]/g) || []).length;
  const totalLen = trimmed.length;
  const wordCount = trimmed.split(/\s+/).length;
  
  if (letterCount === 0) return true;
  if (totalLen > 3 && letterCount / totalLen < 0.30 && wordCount <= 3) return true;
  if (wordCount <= 2 && letterCount <= 4 && /[^a-zA-Z\s\.\!\?\'\"\-]/.test(trimmed)) return true;
  // High special char ratio after substantial body
  if (bodyLen > 50 && totalLen > 5 && letterCount / totalLen < 0.5) return true;
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
  // Reject if it looks like a sentence (ends with period and >8 words)
  if (stripped.endsWith('.') && words.length > 8) return false;
  // Reject pure numbers
  if (/^\d+$/.test(stripped)) return false;
  return true;
}

function cleanOCRText(text) {
  const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
  const cleaned = [];
  let titleFound = false;
  let bodyText = '';
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    if (!titleFound) {
      if (isTitle(line)) {
        titleFound = true;
        cleaned.push(stripPrefix(line));
      }
      continue;
    }
    
    // After title: process body text
    const stripped = stripPrefix(line);
    if (!stripped) continue;
    
    // Check for tail noise
    if (isGibberish(stripped, bodyText.length)) {
      // If we've collected substantial text, this is likely tail noise
      if (bodyText.length > 100) continue;
    }
    
    bodyText += stripped + ' ';
    cleaned.push(stripped);
  }
  
  return cleaned;
}

async function cropAndOCR(imagePath, worker) {
  const img = sharp(imagePath);
  const metadata = await img.metadata();
  const width = metadata.width;
  const height = metadata.height;
  
  // Crop: remove top 10% and bottom 25% (more aggressive bottom removal)
  const top = Math.round(height * 0.10);
  const cropHeight = Math.round(height * 0.65);
  
  const croppedBuffer = await img
    .extract({ left: 0, top, width, height: cropHeight })
    .greyscale()
    .toBuffer();
  
  const result = await worker.recognize(croppedBuffer);
  const cleaned = cleanOCRText(result.data.text);
  return {
    path: imagePath,
    cleaned,
  };
}

const worker = await createWorker('eng');

for (const imgPath of testImages) {
  const r = await cropAndOCR(imgPath, worker);
  console.log('\n===', imgPath, '===');
  r.cleaned.forEach((line, i) => console.log(`  [${i}] ${line}`));
}

await worker.terminate();
