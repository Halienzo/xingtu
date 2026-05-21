import fs from 'fs';

const DATA_PATH = 'src/data/gradedReadingData.ts';
let data = fs.readFileSync(DATA_PATH, 'utf-8');

// Manually verified titles from visual inspection
const fixes = [
  { id: 'graded-l1-b01-s008', title: 'Colours' },
  { id: 'graded-l1-b03-s005', title: 'Bookworm' },
  { id: 'graded-l1-b03-s007', title: 'Teddy' },
  { id: 'graded-l1-b04-s002', title: 'Haircut' },
  { id: 'graded-l1-b04-s004', title: 'I Care' },
  { id: 'graded-l1-b05-s013', title: 'Fishing' },
  { id: 'graded-l1-b05-s028', title: 'Thunder' },
  { id: 'graded-l1-b08-s004', title: 'PEI Potatoes-1' },
  { id: 'graded-l1-b08-s005', title: 'PEI Potatoes-2' },
  { id: 'graded-l1-b08-s018', title: 'Lightning-1' },
  { id: 'graded-l1-b08-s019', title: 'Lightning-2' },
  { id: 'graded-l1-b08-s021', title: 'Ants' },
  { id: 'graded-l1-b09-s022', title: 'Names' },
  { id: 'graded-l1-b09-s023', title: 'A Sleepover' },
  { id: 'graded-l1-b11-s013', title: 'Sneeze' },
  { id: 'graded-l1-b12-s016', title: 'Click!' },
  { id: 'graded-l2-b04-s029', title: 'Dandelions' },
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
