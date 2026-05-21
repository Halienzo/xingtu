import sharp from 'sharp';
import { createWorker } from 'tesseract.js';

const testImages = [
  'public/follow-reading/graded/l1/book01/001_L.jpg',
  'public/follow-reading/graded/l1/book01/002_L.jpg',
  'public/follow-reading/graded/l1/book01/003_L.jpg',
  'public/follow-reading/graded/l1/book01/010_L.jpg',
  'public/follow-reading/graded/l1/book01/015_L.jpg',
  'public/follow-reading/graded/l2/book01/001_L.jpg',
  'public/follow-reading/graded/l3/book01/001_L.jpg',
  'public/follow-reading/graded/l1/book02/001_L.jpg',
];

function cleanTitle(line) {
  // Find the first substantial English word and keep from there
  const match = line.match(/[A-Z][a-zA-Z].*/);
  return match ? match[0].trim() : line.trim();
}

function isBodyGibberish(line) {
  const trimmed = line.trim();
  if (!trimmed) return true;
  
  const letterCount = (trimmed.match(/[a-zA-Z]/g) || []).length;
  const totalLen = trimmed.length;
  const wordCount = trimmed.split(/\s+/).length;
  
  // Pure symbols/numbers
  if (letterCount === 0) return true;
  
  // Count special chars that indicate image artifacts
  const specialChars = (trimmed.match(/[\=\#\{\}\|\\\/\—\–\*\@\$\%\^\&\+\~\[\]\(\)\<\>]/g) || []).length;
  const punctCount = (trimmed.match(/[\.\!\?\,\;\:\'\"\-]/g) || []).length;
  
  // High special char ratio
  if (specialChars > 2 && specialChars / totalLen > 0.15) return true;
  
  // Very low letter ratio
  if (totalLen > 5 && letterCount / totalLen < 0.45) return true;
  
  // Short with many special chars
  if (wordCount <= 3 && specialChars >= 2) return true;
  
  // Incomplete words mixed with symbols (like "new 4 pe", "PR — 5")
  if (/\b\w{1,2}\s+[\d\=\#\{\}\|\—\–\*\+\~]+/.test(trimmed)) return true;
  
  return false;
}

function cleanOCRText(text) {
  const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
  const cleaned = [];
  let titleFound = false;
  let bodyStarted = false;
  let goodBodyLines = 0;
  let badLinesInARow = 0;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    if (!titleFound) {
      // Title: first line with substantial English, starting with capital letter
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
    
    // Body text processing
    if (isBodyGibberish(line)) {
      badLinesInARow++;
      // After 2 consecutive bad lines and some good body text, stop
      if (badLinesInARow >= 2 && goodBodyLines >= 3) {
        break;
      }
      continue;
    }
    
    badLinesInARow = 0;
    goodBodyLines++;
    cleaned.push(line);
  }
  
  return cleaned;
}

async function cropAndOCR(imagePath, worker) {
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
