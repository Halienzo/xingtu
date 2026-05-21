import Tesseract from 'tesseract.js';
import sharp from 'sharp';
import fs from 'fs';

// 17 remaining Story N items
const remaining = [
  { id: 'graded-l1-b01-s008', level: 'l1', book: '01', story: '008', img: 'public/follow-reading/graded/l1/book01/008_L.jpg' },
  { id: 'graded-l1-b03-s005', level: 'l1', book: '03', story: '005', img: 'public/follow-reading/graded/l1/book03/005_L.jpg' },
  { id: 'graded-l1-b03-s007', level: 'l1', book: '03', story: '007', img: 'public/follow-reading/graded/l1/book03/007_L.jpg' },
  { id: 'graded-l1-b04-s002', level: 'l1', book: '04', story: '002', img: 'public/follow-reading/graded/l1/book04/002_L.jpg' },
  { id: 'graded-l1-b04-s004', level: 'l1', book: '04', story: '004', img: 'public/follow-reading/graded/l1/book04/004_L.jpg' },
  { id: 'graded-l1-b05-s013', level: 'l1', book: '05', story: '013', img: 'public/follow-reading/graded/l1/book05/013_L.jpg' },
  { id: 'graded-l1-b05-s028', level: 'l1', book: '05', story: '028', img: 'public/follow-reading/graded/l1/book05/028_L.jpg' },
  { id: 'graded-l1-b08-s004', level: 'l1', book: '08', story: '004', img: 'public/follow-reading/graded/l1/book08/004_L.jpg' },
  { id: 'graded-l1-b08-s005', level: 'l1', book: '08', story: '005', img: 'public/follow-reading/graded/l1/book08/005_L.jpg' },
  { id: 'graded-l1-b08-s018', level: 'l1', book: '08', story: '018', img: 'public/follow-reading/graded/l1/book08/018_L.jpg' },
  { id: 'graded-l1-b08-s019', level: 'l1', book: '08', story: '019', img: 'public/follow-reading/graded/l1/book08/019_L.jpg' },
  { id: 'graded-l1-b08-s021', level: 'l1', book: '08', story: '021', img: 'public/follow-reading/graded/l1/book08/021_L.jpg' },
  { id: 'graded-l1-b09-s022', level: 'l1', book: '09', story: '022', img: 'public/follow-reading/graded/l1/book09/022_L.jpg' },
  { id: 'graded-l1-b09-s023', level: 'l1', book: '09', story: '023', img: 'public/follow-reading/graded/l1/book09/023_L.jpg' },
  { id: 'graded-l1-b11-s013', level: 'l1', book: '11', story: '013', img: 'public/follow-reading/graded/l1/book11/013_L.jpg' },
  { id: 'graded-l1-b12-s016', level: 'l1', book: '12', story: '016', img: 'public/follow-reading/graded/l1/book12/016_L.jpg' },
  { id: 'graded-l2-b04-s029', level: 'l2', book: '04', story: '029', img: 'public/follow-reading/graded/l2/book04/029_L.jpg' },
];

async function ocrTitle(imgPath) {
  const { width, height } = await sharp(imgPath).metadata();
  // Crop title area: top 5% to 28% (where title usually sits below date icon)
  const top = Math.floor(height * 0.05);
  const h = Math.floor(height * 0.23);
  const buffer = await sharp(imgPath)
    .extract({ left: 0, top, width, height: h })
    .resize(Math.floor(width * 2), null)
    .greyscale()
    .normalize()
    .sharpen({ sigma: 2 })
    .toBuffer();
  
  const { data: { text } } = await Tesseract.recognize(buffer, 'eng', {
    tessedit_char_whitelist: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 \'"!?.,:-–—',
  });
  return text.trim();
}

function cleanTitle(text) {
  const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);
  // Remove standalone numbers
  const filtered = lines.filter(l => !/^\d+$/.test(l));
  // Find line that looks like title: starts with uppercase, has reasonable length
  for (const line of filtered) {
    const cleaned = line.replace(/[^A-Za-z0-9\s'"!?.,:–-]/g, '').trim();
    if (/^[A-Z]/.test(cleaned) && cleaned.length >= 2 && cleaned.length <= 60) {
      return cleaned;
    }
  }
  // Fallback: return first non-number line
  for (const line of filtered) {
    const cleaned = line.replace(/[^A-Za-z0-9\s'"!?.,:–-]/g, '').trim();
    if (cleaned.length >= 2) return cleaned;
  }
  return null;
}

console.log('OCR-ing 17 Story N titles with title-area crop...\n');
const fixes = [];

for (const item of remaining) {
  try {
    const raw = await ocrTitle(item.img);
    const title = cleanTitle(raw);
    console.log(`${item.id}:`);
    console.log(`  Raw: ${raw.replace(/\n/g, ' | ')}`);
    console.log(`  Clean: ${title || '(none)'}`);
    if (title) {
      fixes.push({ ...item, title });
    }
    console.log();
  } catch (e) {
    console.log(`${item.id}: ERROR - ${e.message}\n`);
  }
}

console.log(`Found ${fixes.length} fixable titles.`);

if (fixes.length > 0) {
  let data = fs.readFileSync('src/data/gradedReadingData.ts', 'utf-8');
  for (const fix of fixes) {
    const escapedTitle = fix.title.replace(/"/g, '\\"');
    const pattern = new RegExp(`(id: "${fix.id}"[\\s\\S]*?titleEn: )"[^"]*"`, 'g');
    const before = data;
    data = data.replace(pattern, `$1"${escapedTitle}"`);
    if (data !== before) {
      console.log(`Fixed ${fix.id}: "${fix.title}"`);
    } else {
      console.log(`WARNING: Could not find ${fix.id}`);
    }
  }
  fs.writeFileSync('src/data/gradedReadingData.ts', data);
  console.log('\nFile updated.');
}
