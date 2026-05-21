import fs from 'fs';

const DATA_PATH = 'src/data/gradedReadingData.ts';
let data = fs.readFileSync(DATA_PATH, 'utf-8');

// Only fix titles we visually confirmed or that are clearly OCR garbage
const fixes = [
  // Confirmed from visual inspection
  { id: 'graded-l2-b03-s013', title: 'Seashells' },
  { id: 'graded-l2-b05-s021', title: 'Breakfast' },
  { id: 'graded-l2-b07-s029', title: 'Fireflies' },
  { id: 'graded-l2-b10-s010', title: 'Perfect' },
  { id: 'graded-l2-b11-s020', title: 'Volcanoes' },
  { id: 'graded-l2-b12-s003', title: 'Broken Ankle' },
  { id: 'graded-l2-b12-s009', title: 'Cows and Pigs' },
  { id: 'graded-l2-b12-s017', title: 'Clown' },
  { id: 'graded-l3-b01-s012', title: 'Surprises for Everyone!' },
  { id: 'graded-l3-b04-s007', title: 'A Small Gift' },
  { id: 'graded-l3-b04-s021', title: 'Paper' },
  { id: 'graded-l3-b05-s015', title: 'Why?' },
  { id: 'graded-l3-b09-s023', title: 'Watches' },
  // Too short / clearly garbled
  { id: 'graded-l1-b07-s002', title: 'Story 2' },
  { id: 'graded-l2-b12-s001', title: 'Story 1' },
  { id: 'graded-l2-b12-s009', title: 'Cows and Pigs' },
];

let fixed = 0;
for (const { id, title } of fixes) {
  const escapedTitle = title.replace(/"/g, '\\"');
  const pattern = new RegExp(`(id: "${id}"[\\s\\S]*?titleEn: )"[^"]*"`, 'g');
  const before = data;
  data = data.replace(pattern, `$1"${escapedTitle}"`);
  if (data !== before) {
    console.log(`Fixed ${id}: "${title}"`);
    fixed++;
  }
}

// Clean up non-ASCII chars in titles (convert Chinese quotes to ASCII)
const titleRegex = /titleEn: "([^"]+)"/g;
let cleanCount = 0;
data = data.replace(titleRegex, (match, title) => {
  let cleaned = title;
  // Replace Chinese quotes and similar punctuation with ASCII equivalents
  cleaned = cleaned.replace(/[\u201c\u201d]/g, '"');
  cleaned = cleaned.replace(/[\u2018\u2019]/g, "'");
  cleaned = cleaned.replace(/[\u2013\u2014]/g, '-');
  cleaned = cleaned.replace(/[\uff08\uff09]/g, (c) => c === '\uff08' ? '(' : ')');
  // Remove other non-ASCII chars that are not part of normal text
  cleaned = cleaned.replace(/[^\x00-\x7F]/g, '');
  cleaned = cleaned.replace(/\s+/g, ' ').trim();
  if (cleaned !== title) {
    cleanCount++;
  }
  return `titleEn: "${cleaned.replace(/"/g, '\\"')}"`;
});
console.log(`Cleaned ${cleanCount} titles of non-ASCII chars.`);

fs.writeFileSync(DATA_PATH, data);
console.log(`\nFixed ${fixed} titles, cleaned ${cleanCount} titles.`);
