const fs = require('fs');
const t = fs.readFileSync('src/data/gradedReadingData.ts', 'utf8');
const stories = t.split('id: "graded-').slice(1);

const storyN = [];
for (const s of stories) {
  const titleMatch = s.match(/titleEn: "([^"]+)"/);
  if (titleMatch && /^Story \d+$/.test(titleMatch[1])) {
    const id = s.match(/^[^"]+/)[0];
    storyN.push(id);
  }
}
console.log('Story N count:', storyN.length);
console.log(storyN.join('\n'));
