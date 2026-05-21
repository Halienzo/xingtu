import fs from 'fs';

const file = 'src/data/gradedReadingData.ts';
let content = fs.readFileSync(file, 'utf8');

// Count replacements
let count = 0;

// Fix specific bad titles found in visual test
const fixes = [
  // Day 10 patterns
  { pattern: /titleEn: "0\\\\",/g, replacement: (storyNum) => `titleEn: "Story ${storyNum}",` },
  { pattern: /titleEn: "0\\",/g, replacement: (storyNum) => `titleEn: "Story ${storyNum}",` },
  // AF) JL - appears for Day 13, 14
  { pattern: /titleEn: "AF\) JL",/g, replacement: (storyNum) => `titleEn: "Story ${storyNum}",` },
  // J[26)
  { pattern: /titleEn: "J\[26\)",/g, replacement: (storyNum) => `titleEn: "Story ${storyNum}",` },
  // | 30]  and similar
  { pattern: /titleEn: "\| 30\]",/g, replacement: (storyNum) => `titleEn: "Story ${storyNum}",` },
  // | 9| and similar
  { pattern: /titleEn: "\| 9\|",/g, replacement: (storyNum) => `titleEn: "Story ${storyNum}",` },
  // Generic: titles that are just numbers or symbols
  { pattern: /titleEn: "\d+",/g, replacement: (storyNum) => `titleEn: "Story ${storyNum}",` },
  // Generic: titles starting with | or containing mostly symbols
  { pattern: /titleEn: "[\|\>\?\%\)\]\}\s\d]+",/g, replacement: (storyNum) => `titleEn: "Story ${storyNum}",` },
];

// For replacements that need story number, we need to process story by story
const storyRegex = /\{\s*id:\s*"([^"]+)"[\s\S]*?story:\s*(\d+)[\s\S]*?titleEn:\s*"([^"]*)"[\s\S]*?\}/g;

const stories = [];
let m;
while ((m = storyRegex.exec(content)) !== null) {
  const block = m[0];
  const id = m[1];
  const storyNum = m[2];
  const title = m[3];
  stories.push({ block, id, storyNum, title, index: m.index });
}

for (const s of stories) {
  let newTitle = s.title;
  let changed = false;
  
  // Apply title fixes
  if (/^0\\*$/.test(s.title) || /^\d+$/.test(s.title) || /^[\|\>\?\%\)\]\}\s\d]+$/.test(s.title) ||
      s.title === 'AF) JL' || s.title === 'J[26)' || /^\|/.test(s.title)) {
    newTitle = `Story ${s.storyNum}`;
    changed = true;
  }
  
  if (changed) {
    const newBlock = s.block.replace(/titleEn: "[^"]*"/, `titleEn: "${newTitle}"`);
    content = content.replace(s.block, newBlock);
    count++;
  }
}

fs.writeFileSync(file, content, 'utf8');
console.log(`Fixed ${count} bad titles`);
