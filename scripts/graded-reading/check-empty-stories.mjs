import fs from 'fs';

const content = fs.readFileSync('src/data/gradedReadingData.ts', 'utf-8');
const ids = [
  'graded-l2-b04-s030','graded-l2-b05-s031','graded-l2-b06-s029',
  'graded-l2-b07-s031','graded-l2-b08-s031','graded-l2-b10-s031',
  'graded-l2-b11-s030','graded-l3-b03-s031','graded-l3-b05-s031',
  'graded-l3-b07-s032','graded-l3-b09-s030','graded-l3-b10-s032',
  'graded-l3-b12-s032'
];

for (const id of ids) {
  // Find the story object
  const pattern = new RegExp(`\\{[^}]*id: "${id}"[^}]*\\}`);
  const m = content.match(pattern);
  if (m) {
    const sentences = m[0].match(/sentences: \[(.*?)\]/);
    const transcript = m[0].match(/transcriptEn: "([^"]*)"/);
    console.log(`${id}: sentences=[${sentences ? sentences[1].trim() : 'N/A'}] transcript="${transcript ? transcript[1] : 'N/A'}"`);
  } else {
    console.log(`${id}: not found`);
  }
}
