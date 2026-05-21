import fs from 'fs';

const DATA_PATH = 'src/data/gradedReadingData.ts';
let data = fs.readFileSync(DATA_PATH, 'utf-8');

const fixes = [
  { id: 'graded-l2-b02-s021', title: 'Friends' },
  { id: 'graded-l2-b04-s013', title: 'A Tree' },
  { id: 'graded-l2-b05-s002', title: 'Watermelon' },
  { id: 'graded-l2-b06-s021', title: 'The Key' },
  { id: 'graded-l2-b09-s013', title: '27 Needles' },
  { id: 'graded-l2-b10-s007', title: 'Cars (II)' },
  { id: 'graded-l2-b11-s011', title: 'Fingernails' },
  { id: 'graded-l3-b03-s006', title: 'Mosquito' },
  { id: 'graded-l3-b03-s025', title: 'Gunpowder' },
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
  } else {
    console.log(`WARNING: Could not find ${id}`);
  }
}

fs.writeFileSync(DATA_PATH, data);
console.log(`\nFixed ${fixed}/${fixes.length} titles.`);
