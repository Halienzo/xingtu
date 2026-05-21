import fs from 'fs';

const DATA_PATH = 'src/data/gradedReadingData.ts';
let data = fs.readFileSync(DATA_PATH, 'utf-8');

// Titles that need fixing: [id, newTitle]
const fixes = [
  // OCR garbage prefixes
  { id: 'graded-l2-b03-s013', title: 'Seashells' },
  { id: 'graded-l2-b05-s021', title: 'Cereal' },
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
  // Too short / garbled
  { id: 'graded-l1-b07-s002', title: 'Story 2' },
  { id: 'graded-l2-b12-s001', title: 'Story 1' },
  // Fix quotes and special chars in otherwise good titles
  { id: 'graded-l1-b04-s012', title: 'Billy. "It is' },
  { id: 'graded-l1-b05-s012', title: 'My Wish' },
  { id: 'graded-l1-b06-s003', title: 'So Many Cars' },
  { id: 'graded-l1-b10-s010', title: 'Ballet Dancer' },
  { id: 'graded-l1-b10-s011', title: 'Melissa bought a fish. "You\'re my favourite' },
  { id: 'graded-l1-b11-s006', title: 'Story 6' },
  { id: 'graded-l1-b12-s027', title: 'What is a proverb?' },
  { id: 'graded-l2-b01-s009', title: 'My Mother\'s Chair' },
  { id: 'graded-l2-b01-s012', title: 'Needles Don\'t Hurt' },
  { id: 'graded-l2-b02-s013', title: 'Don\'t Cry, Mom' },
  { id: 'graded-l2-b02-s014', title: 'Day to Say' },
  { id: 'graded-l2-b02-s015', title: 'Getting Eyeglasses' },
  { id: 'graded-l2-b03-s020', title: 'Tommy\'s Box' },
  { id: 'graded-l2-b03-s025', title: 'Two Friends' },
  { id: 'graded-l2-b05-s010', title: 'Amazing English' },
  { id: 'graded-l2-b05-s015', title: 'Don\'t Mess with Mom' },
  { id: 'graded-l2-b05-s018', title: 'Irene\'s Blanket (I)' },
  { id: 'graded-l2-b05-s019', title: 'Irene\'s Blanket (II)' },
  { id: 'graded-l2-b07-s001', title: 'Omar\'s Goat (I)' },
  { id: 'graded-l2-b07-s002', title: 'Omar\'s Goat (II)' },
  { id: 'graded-l2-b08-s022', title: 'Tabitha\'s Treasure' },
  { id: 'graded-l2-b09-s008', title: 'Dark or Light - It\'s Amazing' },
  { id: 'graded-l2-b09-s017', title: 'Sara\'s Dream (I)' },
  { id: 'graded-l2-b09-s018', title: 'Sara\'s Dream (II)' },
  { id: 'graded-l2-b10-s001', title: 'Don\'t Fix It' },
  { id: 'graded-l2-b11-s003', title: 'Zebras' },
  { id: 'graded-l2-b11-s017', title: 'Don\'t Forget!' },
  { id: 'graded-l2-b12-s010', title: 'Waiting for Hares' },
  { id: 'graded-l3-b01-s016', title: 'Children\'s World Game' },
  { id: 'graded-l3-b01-s017', title: 'Father\'s Dream' },
  { id: 'graded-l3-b01-s030', title: 'Collecting Things' },
  { id: 'graded-l3-b02-s009', title: 'When You Don\'t Know' },
  { id: 'graded-l3-b02-s014', title: 'Camels - A Perfect Design' },
  { id: 'graded-l3-b03-s003', title: 'A Birthday Wish' },
  { id: 'graded-l3-b04-s009', title: 'Bees - Farmers\' Friends' },
  { id: 'graded-l3-b07-s008', title: 'Canada\'s National' },
  { id: 'graded-l3-b07-s030', title: 'Nature Makes It Better' },
  { id: 'graded-l3-b08-s005', title: 'Ants: Social Insects' },
  { id: 'graded-l3-b08-s026', title: 'Water - an Endless Cycle' },
  { id: 'graded-l3-b08-s031', title: 'Living With Grandpa' },
  { id: 'graded-l3-b09-s001', title: 'The Principal\'s Office' },
  { id: 'graded-l3-b09-s020', title: 'Pie' },
  { id: 'graded-l3-b10-s019', title: 'Story 19' },
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
