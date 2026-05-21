import sharp from 'sharp';
import { createWorker } from 'tesseract.js';

const targets = [
  'public/follow-reading/graded/l1/book01/004_L.jpg',
  'public/follow-reading/graded/l1/book01/006_L.jpg',
  'public/follow-reading/graded/l1/book01/008_L.jpg',
  'public/follow-reading/graded/l1/book01/012_L.jpg',
  'public/follow-reading/graded/l1/book01/013_L.jpg',
  'public/follow-reading/graded/l1/book01/017_L.jpg',
];

async function cropAndOCR(imagePath, worker) {
  const img = sharp(imagePath);
  const metadata = await img.metadata();
  const top = Math.round(metadata.height * 0.15);
  const cropHeight = Math.round(metadata.height * 0.50);
  const croppedBuffer = await img.extract({ left: 0, top, width: metadata.width, height: cropHeight }).greyscale().toBuffer();
  const result = await worker.recognize(croppedBuffer);
  return { path: imagePath, text: result.data.text };
}

const worker = await createWorker('eng');
for (const imgPath of targets) {
  const r = await cropAndOCR(imgPath, worker);
  console.log('\n===', imgPath, '===');
  console.log(r.text.split('\n').slice(0, 8).join('\n'));
}
await worker.terminate();
