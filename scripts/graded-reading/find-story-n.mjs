import fs from 'fs';

const content = fs.readFileSync('src/data/gradedReadingData.ts', 'utf-8');

// Better approach: split by story entries
const storyRegex = /\{[^}]*titleEn: "Story \d+"[^}]*\}/g;
const matches = content.match(storyRegex) || [];
matches.forEach(m => {
  const id = m.match(/id: "([^"]+)"/)?.[1] || '?';
  const title = m.match(/titleEn: "([^"]+)"/)?.[1] || '?';
  const story = m.match(/story: (\d+)/)?.[1] || '?';
  const image = m.match(/imageLeft: "([^"]+)"/)?.[1] || '?';
  console.log(`${id} | story ${story} | ${title} | ${image}`);
});
console.log('Total:', matches.length);
