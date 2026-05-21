import fs from 'fs';

const DATA_PATH = 'src/data/gradedReadingData.ts';
let data = fs.readFileSync(DATA_PATH, 'utf-8');

// Fix remaining bad titles: strip garbage chars, set Story N fallback for too-short
const fixes = [
  { id: 'graded-l1-b01-s014', title: 'Story 14' },
  { id: 'graded-l1-b01-s017', title: 'Story 17' },
  { id: 'graded-l1-b04-s019', title: 'Story 19' },
  { id: 'graded-l1-b05-s012', title: 'My Wish' },
  { id: 'graded-l1-b06-s003', title: 'So Many Cars' },
  { id: 'graded-l1-b07-s007', title: 'Story 7' },
  { id: 'graded-l1-b10-s012', title: 'Story 12' },
  { id: 'graded-l1-b12-s018', title: 'Story 18' },
  { id: 'graded-l2-b02-s015', title: 'Getting Eyeglasses' },
  { id: 'graded-l2-b04-s003', title: 'Story 3' },
  { id: 'graded-l2-b12-s030', title: 'Story 30' },
  { id: 'graded-l3-b01-s030', title: 'Collecting Things' },
  { id: 'graded-l3-b02-s023', title: 'Story 23' },
  { id: 'graded-l3-b03-s003', title: 'A Birthday Wish' },
  { id: 'graded-l3-b04-s019', title: 'Story 19' },
  { id: 'graded-l3-b05-s005', title: 'Story 5' },
  { id: 'graded-l3-b05-s009', title: 'Story 9' },
  { id: 'graded-l3-b07-s030', title: 'Nature Makes It Better' },
  { id: 'graded-l3-b08-s015', title: 'Story 15' },
  { id: 'graded-l3-b08-s025', title: 'Story 25' },
  { id: 'graded-l3-b08-s031', title: 'Living With Grandpa' },
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

fs.writeFileSync(DATA_PATH, data);
console.log(`\nFixed ${fixed}/${fixes.length} titles.`);
