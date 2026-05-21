import Tesseract from 'tesseract.js';
import sharp from 'sharp';
import fs from 'fs';

// The 13 remaining Story N entries
const remaining = [
  { id: 'graded-l2-b04-s030', level: 'l2', book: '04', story: '030', img: 'public/follow-reading/graded/l2/book04/030_L.jpg' },
  { id: 'graded-l2-b05-s031', level: 'l2', book: '05', story: '031', img: 'public/follow-reading/graded/l2/book05/031_L.jpg' },
  { id: 'graded-l2-b06-s029', level: 'l2', book: '06', story: '029', img: 'public/follow-reading/graded/l2/book06/029_L.jpg' },
  { id: 'graded-l2-b07-s031', level: 'l2', book: '07', story: '031', img: 'public/follow-reading/graded/l2/book07/031_L.jpg' },
  { id: 'graded-l2-b08-s031', level: 'l2', book: '08', story: '031', img: 'public/follow-reading/graded/l2/book08/031_L.jpg' },
  { id: 'graded-l2-b10-s031', level: 'l2', book: '10', story: '031', img: 'public/follow-reading/graded/l2/book10/031_L.jpg' },
  { id: 'graded-l2-b11-s030', level: 'l2', book: '11', story: '030', img: 'public/follow-reading/graded/l2/book11/030_L.jpg' },
  { id: 'graded-l3-b03-s031', level: 'l3', book: '03', story: '031', img: 'public/follow-reading/graded/l3/book03/031_L.jpg' },
  { id: 'graded-l3-b05-s031', level: 'l3', book: '05', story: '031', img: 'public/follow-reading/graded/l3/book05/031_L.jpg' },
  { id: 'graded-l3-b07-s032', level: 'l3', book: '07', story: '032', img: 'public/follow-reading/graded/l3/book07/032_L.jpg' },
  { id: 'graded-l3-b09-s030', level: 'l3', book: '09', story: '030', img: 'public/follow-reading/graded/l3/book09/030_L.jpg' },
  { id: 'graded-l3-b10-s032', level: 'l3', book: '10', story: '032', img: 'public/follow-reading/graded/l3/book10/032_L.jpg' },
  { id: 'graded-l3-b12-s032', level: 'l3', book: '12', story: '032', img: 'public/follow-reading/graded/l3/book12/032_L.jpg' },
];

async function ocrTitle(imgPath) {
  // Try crop top 20% for title-only extraction
  const { width, height } = await sharp(imgPath).metadata();
  const buffer = await sharp(imgPath)
    .extract({ left: 0, top: 0, width, height: Math.floor(height * 0.2) })
    .resize(Math.floor(width * 1.5), null)
    .greyscale()
    .normalize()
    .sharpen({ sigma: 1.5 })
    .toBuffer();
  
  const { data: { text } } = await Tesseract.recognize(buffer, 'eng', {
    tessedit_char_whitelist: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 \'"-!?.,:;',
  });
  return text.trim();
}

function cleanTitle(text) {
  // Remove standalone numbers, common noise
  let lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);
  lines = lines.filter(l => !/^\d+$/.test(l));
  lines = lines.filter(l => l.length >= 3);
  
  // Find first line that looks like a title (starts with uppercase, contains lowercase)
  for (const line of lines) {
    const cleaned = line.replace(/[^A-Za-z0-9\s'"!?.,:;-]/g, '').trim();
    if (/^[A-Z][a-z]/.test(cleaned) && cleaned.split(/\s+/).length >= 2) {
      // Remove trailing period if present
      return cleaned.replace(/\.$/, '').trim();
    }
  }
  return null;
}

console.log('OCR-ing 13 remaining Story N titles with top-20% crop...\n');
const fixes = [];

for (const item of remaining) {
  try {
    const raw = await ocrTitle(item.img);
    const title = cleanTitle(raw);
    console.log(`${item.id}:`);
    console.log(`  Raw OCR: ${raw.replace(/\n/g, ' | ')}`);
    console.log(`  Cleaned: ${title || '(none)'}`);
    if (title) {
      fixes.push({ ...item, title });
    }
    console.log();
  } catch (e) {
    console.log(`${item.id}: ERROR - ${e.message}\n`);
  }
}

console.log(`Found ${fixes.length} fixable titles.`);

// Apply fixes to data file
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
      console.log(`WARNING: Could not find ${fix.id} in data file`);
    }
  }
  fs.writeFileSync('src/data/gradedReadingData.ts', data);
  console.log('\nFile updated.');
}
