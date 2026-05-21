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

function cleanBodyLine(line) {
  let s = line.trim();
  if (!s) return '';
  
  for (let i = 0; i < 5; i++) {
    const before = s;
    s = s.replace(/[\s\=\#\{\}\|\\\/\—\–\*\@\$\%\^\&\+\~\[\]\(\)\<\>\d]+$/g, '');
    s = s.replace(/\s+\w{1,3}\s*[\|\—\–\=\#\*\+\~\^]+\s*["\'\)]*$/g, '');
    s = s.replace(/\s+\d+\s+\w{1,3}$/g, '');
    s = s.replace(/\s+[\—\–\-]+\s*\w{0,3}\s*$/g, '');
    if (s === before) break;
  }
  
  // Remove "word NUMBER shortword" in middle
  s = s.replace(/\s+\d+\s+\w{1,3}(?=\s|$)/g, '');
  
  // Remove trailing orphaned short caps like "new PR", "new A", "Everything TE i"
  // But be careful not to remove legitimate words like "to a", "the I"
  s = s.replace(/\s+[A-Z]{1,2}$/g, ''); // "new A", "new PR"
  s = s.replace(/\s+[A-Z]{1,2}\s+\w{1,2}$/g, ''); // "Everything TE i"
  
  return s.trim();
}

function isPureGibberish(line) {
  const trimmed = line.trim();
  if (!trimmed) return true;
  const letterCount = (trimmed.match(/[a-zA-Z]/g) || []).length;
  const totalLen = trimmed.length;
  if (letterCount === 0) return true;
  if (totalLen > 3 && letterCount / totalLen < 0.35) return true;
  // All caps nonsense chains
  if (/\b[A-Z]{2,}(\s+[A-Z]{2,}){2,}/.test(trimmed)) return true;
  // Very short with no lowercase and many spaces
  if (letterCount <= 4 && trimmed.split(/\s+/).length >= 2 && !/[a-z]/.test(trimmed)) return true;
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
    
    const cleanedLine = cleanBodyLine(line);
    
    if (!cleanedLine || isPureGibberish(cleanedLine)) {
      badLinesInARow++;
      if (badLinesInARow >= 3 && goodBodyLines >= 3) break;
      continue;
    }
    
    badLinesInARow = 0;
    goodBodyLines++;
    cleaned.push(cleanedLine);
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
