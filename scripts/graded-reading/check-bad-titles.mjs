import fs from 'fs';

const content = fs.readFileSync('src/data/gradedReadingData.ts', 'utf-8');
const regex = /\{[^}]*id: "([^"]+)"[^}]*titleEn: "([^"]+)"[^}]*\}/g;
const bad = [];
let m;
while ((m = regex.exec(content)) !== null) {
  const id = m[1];
  const title = m[2];
  // Check for: very short (1-2 chars), non-English characters, or patterns that look like OCR errors
  if (title.length <= 2) {
    bad.push({id, title, reason: 'too short'});
  } else if (/[^A-Za-z0-9\s'"!?.,:–\-()]/.test(title)) {
    bad.push({id, title, reason: 'non-english chars'});
  } else if (/^(Iz|CE|VN|QQ|Ii|AD|Zl|Ceri|S00|TAR)\b/.test(title)) {
    bad.push({id, title, reason: 'OCR garbage prefix'});
  }
}
console.log(`Found ${bad.length} bad titles:`);
bad.forEach(b => console.log(b.id, '|', b.title, '|', b.reason));
