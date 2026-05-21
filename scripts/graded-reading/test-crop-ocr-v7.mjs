import sharp from 'sharp';
import { createWorker } from 'tesseract.js';

const testImages = [
  'public/follow-reading/graded/l1/book01/010_L.jpg',
  'public/follow-reading/graded/l1/book01/015_L.jpg',
  'public/follow-reading/graded/l1/book02/001_L.jpg',
  'public/follow-reading/graded/l1/book01/001_L.jpg',
  'public/follow-reading/graded/l3/book01/001_L.jpg',
];

function cleanTitle(line) {
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
  
  // Very low letter ratio
  if (totalLen > 5 && letterCount / totalLen < 0.40) return true;
  
  // Short line with mostly capitals (like "R AN", "A PER")
  if (wordCount <= 3 && totalLen <= 15) {
    const capRatio = (trimmed.match(/[A-Z]/g) || []).length / letterCount;
    if (capRatio > 0.7 && letterCount / totalLen < 0.8) return true;
  }
  
  // Contains suspicious patterns that indicate image artifacts:
  // Word + number + short word: "new 4 pe", "mother =="
  if (/\b\w{2,}\s+[\d\=\#\{\}\|\—\–\*\+\~\&]{1,3}(\s+\w{1,3})?/.test(trimmed)) return true;
  
  // Multiple special chars in a row within a line
  if (/[\=\#\{\}\|\\\—\–\*\@\$\%\^\&\+\~]{2,}/.test(trimmed)) return true;
  
  // Line starts with & and is short
  if (/^&\s/.test(trimmed) && wordCount <= 4) return true;
  
  // Line with dash-dash or long dash patterns
  if (/[—–\-]{2,}/.test(trimmed) && wordCount <= 5) return true;
  
  // All caps nonsense words
  if (/\b[A-Z]{3,}\s+[A-Z]{3,}\s+[A-Z]{3,}/.test(trimmed)) return true;
  
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
    
    if (isBodyGibberish(line)) {
      badLinesInARow++;
      if (badLinesInARow >= 2 && goodBodyLines >= 3) break;
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
    raw: result.data.text.split('\n').slice(0, 15),
    cleaned,
  };
}

const worker = await createWorker('eng');

for (const imgPath of testImages) {
  const r = await cropAndOCR(imgPath, worker);
  console.log('\n===', imgPath, '===');
  console.log('Raw (first 15 lines):');
  r.raw.forEach((line, i) => console.log(`  raw[${i}] ${line}`));
  console.log('Cleaned:');
  r.cleaned.forEach((line, i) => console.log(`  [${i}] ${line}`));
}

await worker.terminate();
