import Tesseract from 'tesseract.js';
import sharp from 'sharp';
import fs from 'fs';

const content = fs.readFileSync('src/data/gradedReadingData.ts', 'utf-8');

// Extract suspicious IDs
const regex = /\{[^}]*id: "([^"]+)"[^}]*titleEn: "([^"]+)"[^}]*\}/g;
const suspicious = [];
let m;
while ((m = regex.exec(content)) !== null) {
  const id = m[1];
  const title = m[2];
  const words = title.split(/\s+/).length;
  if (words > 8 && /^[A-Z][a-z]/.test(title)) {
    const starts = /^(One day|My |The |A |I |It |He |She |They |We |You |Every |When |There |This |That |These |Those |Some |All |Many |Most |If |Because |So |But |And |Or |However|Today|Yesterday|Tomorrow|Now|Here|Do you|As we|During|Sometimes|Buzz|Her name|Two |Zack |Bob |Melissa|Julie|Ryan|Cars |Ouch|Steven|Brrr|Would you|When my|Gerry |Smith|Mike |There was|Mom was|Alex |Scan|El is|As we were|Sometimes,|If you are|Buzz,|One elephant|One day at|A little|Tonight|Numbers|Her name|Teddy|Tonight|Melissa|Julie|Today|My |My grandma|Buzz\.)/i;
    if (starts.test(title)) {
      const level = id.match(/l\d+/)?.[0];
      const book = id.match(/b(\d+)/)?.[1];
      const story = id.match(/s(\d+)/)?.[1];
      if (level && book && story) {
        suspicious.push({
          id,
          title,
          img: `public/follow-reading/graded/${level}/book${String(book).padStart(2, '0')}/${String(story).padStart(3, '0')}_L.jpg`
        });
      }
    }
  }
}

console.log(`Processing ${suspicious.length} suspicious titles...\n`);

async function ocrTitle(imgPath) {
  const { width, height } = await sharp(imgPath).metadata();
  // Title area: top 5% to 30% (covers date icon + title)
  const top = Math.floor(height * 0.05);
  const h = Math.floor(height * 0.25);
  const buffer = await sharp(imgPath)
    .extract({ left: 0, top, width, height: h })
    .resize(Math.floor(width * 2), null)
    // No greyscale! Keep color for better OCR
    .normalize()
    .sharpen({ sigma: 1.5 })
    .toBuffer();
  
  const { data: { text } } = await Tesseract.recognize(buffer, 'eng', {
    tessedit_char_whitelist: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 \'"!?.,:-–—',
  });
  return text.trim();
}

function cleanTitle(text) {
  const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);
  // Remove standalone numbers (date icons)
  const filtered = lines.filter(l => !/^\d+$/.test(l));
  
  // Find best title candidate
  for (const line of filtered) {
    const cleaned = line.replace(/[^A-Za-z0-9\s'"!?.,:–-]/g, '').trim();
    // Accept lines that are 1-8 words, start with uppercase
    const words = cleaned.split(/\s+/);
    if (words.length >= 1 && words.length <= 10 && /^[A-Z]/.test(cleaned)) {
      // Reject if it looks like a sentence (has period at end and >4 words)
      if (cleaned.endsWith('.') && words.length > 4) continue;
      return cleaned;
    }
  }
  return null;
}

const fixes = [];
for (const item of suspicious) {
  try {
    const raw = await ocrTitle(item.img);
    const title = cleanTitle(raw);
    console.log(`${item.id}:`);
    console.log(`  Raw: ${raw.replace(/\n/g, ' | ')}`);
    console.log(`  Clean: ${title || '(none)'}`);
    if (title && title !== item.title && title.length >= 2) {
      fixes.push({ id: item.id, title });
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
    }
  }
  fs.writeFileSync('src/data/gradedReadingData.ts', data);
  console.log('\nFile updated.');
}
