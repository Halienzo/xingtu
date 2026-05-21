import fs from 'fs';

const DATA_PATH = 'src/data/gradedReadingData.ts';
let content = fs.readFileSync(DATA_PATH, 'utf-8');

// ============================================
// STEP 1: Remove 13 blank-page stories
// ============================================
const blankIds = new Set([
  'graded-l2-b04-s030','graded-l2-b05-s031','graded-l2-b06-s029',
  'graded-l2-b07-s031','graded-l2-b08-s031','graded-l2-b10-s031',
  'graded-l2-b11-s030','graded-l3-b03-s031','graded-l3-b05-s031',
  'graded-l3-b07-s032','graded-l3-b09-s030','graded-l3-b10-s032',
  'graded-l3-b12-s032'
]);

let removed = 0;
for (const id of blankIds) {
  // Match the full story object spanning multiple lines
  const pattern = new RegExp(`\\s*\{[^}]*id: "${id}"[\\s\\S]*?sentences: \\[[^\\]]*\\][^}]*\},?`, 'g');
  const before = content;
  content = content.replace(pattern, '');
  if (content !== before) {
    removed++;
  }
}
console.log(`Removed ${removed} blank-page stories`);

// ============================================
// STEP 2: Update storyCount in gradedReadingBooks
// ============================================
// Count actual stories per level/book after removal
const storyCounts = {};
const levelBookRegex = /level: "(l\d+)",\s*book: (\d+),\s*story: (\d+)/g;
let m;
while ((m = levelBookRegex.exec(content)) !== null) {
  const key = `${m[1]}-b${m[2].padStart(2, '0')}`;
  storyCounts[key] = (storyCounts[key] || 0) + 1;
}

// Update gradedReadingBooks storyCount
for (const [key, count] of Object.entries(storyCounts)) {
  const [level, bookStr] = key.split('-');
  const bookNum = parseInt(bookStr.replace('b', ''));
  const bookPattern = new RegExp(
    `(gradedReadingBooks\["${level}"\])\s*=\s*\[[^\]]*\{book:\s*${bookNum}[^}]*storyCount:\s*\\d+`,
    'g'
  );
  content = content.replace(bookPattern, (match) => {
    return match.replace(/storyCount: \d+/, `storyCount: ${count}`);
  });
}
console.log('Updated storyCount in gradedReadingBooks');

// ============================================
// STEP 3: Fix titles that are clearly body sentences
// Heuristic: if title starts with common sentence starters AND is >8 words
// Replace with "Story N" fallback
// ============================================
const bodyStarters = /^(One day|My |The |A |I |It |He |She |They |We |You |Every |When |There |This |That |These |Those |Some |All |Many |Most |If |Because |So |But |And |Or |However|Today|Yesterday|Tomorrow|Now|Here|Do you|As we|During|Sometimes|Buzz|Her name|Two |Zack |Bob |Melissa|Julie|Ryan|Cars |Ouch|Steven|Brrr|Would you|When my|Gerry |Smith|Mike |Cars |There was|Mom was|Alex |Scan the code|El is|As we were|Sometimes,|If you are|Buzz,|One elephant|One day at|A little|Tonight|Numbers|Her name|Teddy|Scan the code|Scan the code|Scan the code)/i;

let titleFixes = 0;
const titleRegex = /titleEn: "([^"]+)"/g;
const titleReplacements = [];

content.replace(titleRegex, (match, title, offset) => {
  const words = title.split(/\s+/).length;
  if (words > 8 && bodyStarters.test(title)) {
    // Find the story id for this title
    const beforeText = content.substring(Math.max(0, offset - 500), offset);
    const idMatch = beforeText.match(/id: "([^"]+)"/g);
    const id = idMatch ? idMatch[idMatch.length - 1].match(/id: "([^"]+)"/)[1] : 'unknown';
    const storyMatch = beforeText.match(/story: (\d+)/g);
    const storyNum = storyMatch ? storyMatch[storyMatch.length - 1].match(/story: (\d+)/)[1] : '?';
    
    // Skip if it's actually a known real title (check against known good titles)
    const knownGood = [
      'The Boys and the Old Man',
      'There is No Place Like Home',
      'What is a proverb',
      'Jake got out a piece of paper',
      'There once was a man who was very lazy',
      'One day, Turtle lost his footing and rolled down a',
      'Do you like seashells? Do you enjoy walking on the',
      'There was a little tree growing on the vacant lot near Mr.',
      'The Lie That Grew and Grew',
      'My uncle is a farmer. He grows watermelons. Each year',
      'Mom was on her way to the kitchen. Just then, she',
      'Alex was very excited today',
      'Gerry screamed. He jumped up and down and he',
      'Smith and his wife were coming back from shopping.',
      'Darcie wanted to give her mother a special present',
      'The next time you brush your teeth, take a closer look',
      'During the summer holiday, my friends and often play',
      'Saturday. The Drake family was watching their',
      'Mike was the youngest in his family. His older brother and',
      'One day, Sam was walking his dog Homer in a field. He',
      'Cars help people get to places that are far away. They',
      'Ryan got a toy sailboat and a kite for his birthday. The',
      'Zebras are unique',
      'Ouch',
      'There are thousands of volcanoes all over the world.',
      'Steven\'s family was having a fight with their neighbour,',
      'Brrr! It was cold, really cold. Dustin felt little bumps all',
      'It was the annual Christmas parade. Annie was standing',
      'My First Day as a Teacher',
      'My grandma moved to a new townhouse. Her house is',
      'Buzz. Buzz. Buzz! On warm summer nights, the air is filled',
      'The Old Man and the Wolf',
      'Sometimes, the people who invent something have one idea',
      'There once was a young man who had just graduated from',
      'Would you be surprised to learn that the book you\'re reading',
      'When my brother was young, he was afraid of monsters.',
      'My name is Al, and I have a story I\'d like to tell. When',
      'The Eiffel Tower: A Paris Story',
      'Site. + Nature Makes It Better',
      'The Tree and the Stingy Brother',
      'Most valuable Player was what I hoped to get. Yes, MVP',
      'The Boy in the Grass Boat',
      'The mechanical watches that are full of gears, springs, and',
      'The Frog in the Shallow Well',
      'The First Lady of the Air (I',
      'The First Lady of the Air (II',
      'Every year in my town, we have a fishing contest. It\'s very',
      'The Moon or the Banana Tree',
      'Friendship is one of the most precious things in the world.',
      'A Bowl of Stew for a Birthright',
    ];
    const isKnownGood = knownGood.some(good => title.toLowerCase().startsWith(good.toLowerCase().substring(0, 20)));
    
    if (!isKnownGood) {
      titleReplacements.push({ offset, old: match, new: `titleEn: "Story ${storyNum}"`, id, title });
    }
  }
  return match;
});

// Apply title replacements in reverse order (so offsets don't shift)
for (const { offset, old, new: replacement } of titleReplacements.reverse()) {
  content = content.substring(0, offset) + replacement + content.substring(offset + old.length);
  titleFixes++;
}
console.log(`Fixed ${titleFixes} titles that were body sentences`);

// ============================================
// STEP 4: Write updated file
// ============================================
fs.writeFileSync(DATA_PATH, content);
console.log('File saved.');
