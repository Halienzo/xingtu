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
  
  // Remove trailing artifacts: special chars, incomplete words after them
  // Keep removing until the line ends with a letter or valid punctuation
  for (let i = 0; i < 5; i++) { // max 5 iterations
    const before = s;
    // Remove trailing special chars and numbers
    s = s.replace(/[\s\=\#\{\}\|\\\/\—\–\*\@\$\%\^\&\+\~\[\]\(\)\<\>\d]+$/g, '');
    // Remove trailing short incomplete fragments like "A |", "TE i", "b——"", "PR —"
    s = s.replace(/\s+\w{1,3}\s*[\|\—\–\=\#\*\+\~\^]+\s*["\'\)]*$/g, '');
    // Remove trailing "word NUMBER shortword" at end
    s = s.replace(/\s+\d+\s+\w{1,3}$/g, '');
    // Remove trailing "word — word" fragments
    s = s.replace(/\s+[\—\–\-]+\s*\w{0,3}\s*$/g, '');
    if (s === before) break;
  }
  
  // Also remove "word NUMBER shortword" in the middle by splitting
  // e.g. "There is also a new 4 pe" -> "There is also a new"
  s = s.replace(/\s+\d+\s+\w{1,3}(?=\s|$)/g, '');
  
  return s.trim();
}

function isPureGibberish(line) {
  const trimmed = line.trim();
  if (!trimmed) return true;
  const letterCount = (trimmed.match(/[a-zA-Z]/g) || []).length;
  const totalLen = trimmed.length;
  if (letterCount === 0) return true;
  if (totalLen > 3 && letterCount / totalLen < 0.35) return true;
  // All caps nonsense words
  if (/\b[A-Z]{2,}(\s+[A-Z]{2,}){2,}/.test(trimmed) && letterCount / totalLen < 0.9) return true;
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
    raw: result.data.text.split('\n').slice(0, 15),
    cleaned,
  };
}

const worker = await createWorker('eng');

for (const imgPath of testImages) {
  const r = await cropAndOCR(imgPath, worker);
  console.log('\n===', imgPath, '===');
  console.log('Cleaned:');
  r.cleaned.forEach((line, i) => console.log(`  [${i}] ${line}`));
}

await worker.terminate();
