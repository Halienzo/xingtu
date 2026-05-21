import sharp from 'sharp';
import { createWorker } from 'tesseract.js';

const testImages = [
  'public/follow-reading/graded/l1/book01/001_L.jpg',
  'public/follow-reading/graded/l1/book01/002_L.jpg',
  'public/follow-reading/graded/l1/book01/003_L.jpg',
  'public/follow-reading/graded/l1/book01/010_L.jpg',
  'public/follow-reading/graded/l2/book01/001_L.jpg',
  'public/follow-reading/graded/l3/book01/001_L.jpg',
  'public/follow-reading/graded/l1/book02/001_L.jpg',
];

function stripPrefix(line) {
  let s = line;
  s = s.replace(/^999%\s*/, '');
  s = s.replace(/^[\|A-Z]\s*\d+\s*[\]\)\}]\s*/, '');
  s = s.replace(/^\(\&\s*/, '');
  s = s.replace(/^[\>\?\:\s\.\~\%\*\-\=\{\;\,\<\>\»]+/, '');
  s = s.replace(/^Coa\s+/i, '');
  s = s.replace(/^WS\.\s*/i, '');
  s = s.replace(/^\d+[\.\)]\s*/, ''); // "5. ", "2) "
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
  if (bodyLen > 80 && totalLen > 5 && letterCount / totalLen < 0.55) return true;
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
  if (stripped.endsWith('.') && words.length > 8) return false;
  if (/^\d+$/.test(stripped)) return false;
  return true;
}

function cleanOCRText(text) {
  const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
  const cleaned = [];
  let titleFound = false;
  let bodyText = '';
  let gibberishCount = 0;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    if (!titleFound) {
      if (isTitle(line)) {
        titleFound = true;
        cleaned.push(stripPrefix(line));
      }
      continue;
    }
    
    const stripped = stripPrefix(line);
    if (!stripped) continue;
    
    // Detect tail noise: if we see gibberish after substantial body, stop
    if (isGibberish(stripped, bodyText.length)) {
      gibberishCount++;
      if (bodyText.length > 80 || gibberishCount >= 2) {
        // Stop collecting after 2 consecutive gibberish lines or after substantial body
        continue;
      }
    } else {
      gibberishCount = 0;
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
  
  // More aggressive: top 15% to bottom 35% removed = keep middle 50%
  const top = Math.round(height * 0.15);
  const cropHeight = Math.round(height * 0.50);
  
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
