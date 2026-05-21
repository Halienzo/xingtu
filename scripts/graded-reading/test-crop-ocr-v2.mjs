import sharp from 'sharp';
import { createWorker } from 'tesseract.js';

const testImages = [
  'public/follow-reading/graded/l1/book01/001_L.jpg',
  'public/follow-reading/graded/l1/book01/002_L.jpg',
  'public/follow-reading/graded/l1/book01/003_L.jpg',
  'public/follow-reading/graded/l2/book01/001_L.jpg',
  'public/follow-reading/graded/l3/book01/001_L.jpg',
];

function cleanOCRText(text) {
  const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
  const cleaned = [];
  let titleFound = false;
  
  for (const line of lines) {
    // Skip date icon artifacts
    if (/^999%$/.test(line)) continue;
    if (/^[\|\>\?\:\s]*\d+[\s\)\]\}\>\?]*$/.test(line)) continue; // "1", "| 3 ]", "(7)"
    if (/^[A-Z]\s*\d\s*[\]\)\}]$/.test(line)) continue; // "A 1 ]"
    if (/^[\>\?\|\:\s]+$/.test(line)) continue; // ">>", ": .~"
    if (/^[\(\[]\s*\d+[\)\]]$/.test(line)) continue; // "(7)", "[3]"
    if (/^a$/.test(line)) continue; // isolated "a"
    
    // Detect title: first substantial English line
    if (!titleFound) {
      const words = line.split(/\s+/);
      const capWords = words.filter(w => /^[A-Z]/.test(w)).length;
      const letterCount = (line.match(/[a-zA-Z]/g) || []).length;
      const totalLen = line.length;
      
      // Title should have reasonable English content
      if (letterCount >= 3 && capWords >= 1 && !/^[\d\|\>\?\%]/.test(line) &&
          words.length >= 2 && words.length <= 15) {
        titleFound = true;
        cleaned.push(line);
        continue;
      }
      
      // Skip prefix junk before title
      continue;
    }
    
    // After title: body text
    // Skip tail noise
    const letterCount = (line.match(/[a-zA-Z]/g) || []).length;
    const totalLen = line.length;
    const wordCount = line.split(/\s+/).length;
    
    // Skip lines that are mostly non-letters
    if (totalLen > 3 && letterCount / totalLen < 0.4 && wordCount <= 3) {
      // Might be tail noise, but check if it's a continuation
      // If we've already found substantial text, this is likely noise
      if (cleaned.length >= 3) continue;
    }
    
    // Skip isolated gibberish at the end
    if (wordCount <= 2 && letterCount <= 4 && /[^a-zA-Z\s\.\!\?\'\"]/.test(line)) {
      if (cleaned.length >= 4) continue;
    }
    
    cleaned.push(line);
  }
  
  return cleaned;
}

async function cropAndOCR(imagePath, worker) {
  const img = sharp(imagePath);
  const metadata = await img.metadata();
  const width = metadata.width;
  const height = metadata.height;
  
  // Crop: remove top 10% and bottom 20%
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
  console.log('Raw OCR:');
  console.log(r.raw);
  console.log('Cleaned lines:');
  r.cleaned.forEach((line, i) => console.log(`  [${i}] ${line}`));
}

await worker.terminate();
