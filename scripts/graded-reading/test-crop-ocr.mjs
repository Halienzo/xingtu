import sharp from 'sharp';
import { createWorker } from 'tesseract.js';
import fs from 'fs';

const testImages = [
  'public/follow-reading/graded/l1/book01/001_L.jpg',
  'public/follow-reading/graded/l1/book01/002_L.jpg',
  'public/follow-reading/graded/l1/book01/003_L.jpg',
  'public/follow-reading/graded/l2/book01/001_L.jpg',
  'public/follow-reading/graded/l3/book01/001_L.jpg',
];

async function cropAndOCR(imagePath, worker) {
  const img = sharp(imagePath);
  const metadata = await img.metadata();
  const width = metadata.width;
  const height = metadata.height;
  
  // Crop: remove top 12% and bottom 20%
  const top = Math.round(height * 0.12);
  const cropHeight = Math.round(height * 0.68);
  
  const croppedBuffer = await img
    .extract({ left: 0, top, width, height: cropHeight })
    .toBuffer();
  
  const result = await worker.recognize(croppedBuffer);
  return {
    path: imagePath,
    size: `${width}x${height}`,
    crop: `0,${top},${width},${cropHeight}`,
    text: result.data.text,
  };
}

const worker = await createWorker('eng');

for (const imgPath of testImages) {
  const r = await cropAndOCR(imgPath, worker);
  console.log('\n===', imgPath, '===');
  console.log('Crop:', r.crop);
  console.log('OCR text:');
  console.log(r.text);
}

await worker.terminate();
