import fs from 'fs';
const content = fs.readFileSync('src/data/gradedReadingData.ts', 'utf8');
const lines = content.split('\n');
let problems = 0;
for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  if (/transcriptEn:\s*"/.test(line) && !/",?\s*$/.test(line)) {
    problems++;
    if (problems <= 10) console.log('Line', i+1, line.substring(0, 100));
  }
}
console.log('Total problematic lines:', problems);
