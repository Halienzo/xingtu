import fs from 'fs';

const DATA_PATH = 'src/data/gradedReadingData.ts';
let data = fs.readFileSync(DATA_PATH, 'utf-8');

// Fix the 2 remaining Story N
const storyNFixes = [
  { id: 'graded-l1-b07-s002', title: 'Clean the Beach' },
  { id: 'graded-l2-b12-s001', title: 'A Test' },
];

for (const { id, title } of storyNFixes) {
  const escapedTitle = title.replace(/"/g, '\\"');
  const pattern = new RegExp(`(id: "${id}"[\\s\\S]*?titleEn: )"[^"]*"`, 'g');
  data = data.replace(pattern, `$1"${escapedTitle}"`);
  console.log(`Fixed ${id}: "${title}"`);
}

// Strip backslash and other garbage prefixes from all titles
const titleRegex = /titleEn: "([^"]+)"/g;
let cleanCount = 0;
data = data.replace(titleRegex, (match, title) => {
  let cleaned = title;
  // Strip common OCR garbage prefixes
  cleaned = cleaned.replace(/^[\\~=%\/\-@#\[\]{}|<>*+`^]+\s*/, '');
  cleaned = cleaned.replace(/^[A-Za-z]{1,2}\s+/, (m) => {
    // Only strip if it looks like garbage (single/two letters followed by space)
    const word = m.trim();
    if (word.length <= 2 && /^[A-Z][a-z]?$/.test(word)) {
      return '';
    }
    return m;
  });
  // Remove backslashes
  cleaned = cleaned.replace(/\\/g, '');
  // Clean up multiple spaces
  cleaned = cleaned.replace(/\s+/g, ' ').trim();
  if (cleaned !== title) {
    cleanCount++;
  }
  return `titleEn: "${cleaned.replace(/"/g, '\\"')}"`;
});
console.log(`Cleaned ${cleanCount} titles of garbage prefixes.`);

fs.writeFileSync(DATA_PATH, data);
console.log('Done.');
