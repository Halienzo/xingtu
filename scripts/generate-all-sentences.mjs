import fs from 'fs';

const raw = fs.readFileSync('src/data/calendarData.json', 'utf8');
const data = JSON.parse(raw);

// ========== Sentence templates ==========
const enTemplates = {
  noun: [
    "The {word} brings joy to our daily life.",
    "We should value the {word} around us.",
    "A good {word} can make a big difference.",
    "Learning about {word} opens new doors.",
    "The beauty of {word} lies in its simplicity.",
  ],
  verb: [
    "We should {word} our dreams with courage.",
    "She loves to {word} with her friends every day.",
    "It is important to {word} every single day.",
    "They {word} together to build a better world.",
    "Learning to {word} well takes time and practice.",
  ],
  adj: [
    "The {word} scenery of Yunnan attracts many visitors.",
    "It feels {word} to help others in need.",
    "A {word} attitude leads to a happy life.",
    "The {word} weather makes everyone smile.",
    "Being {word} is the key to true success.",
  ],
  adv: [
    "She spoke {word} so everyone could hear clearly.",
    "He finished the task {word} before sunset.",
    "They walked {word} along the country road.",
    "The music played {word} in the concert hall.",
    "Please read the text {word} for better understanding.",
  ],
  phrase: [
    "We often {word} to keep our life balanced.",
    "It is good to {word} with people you trust.",
    "They decided to {word} after much discussion.",
    "Learning to {word} helps us grow every day.",
    "We should {word} whenever we have the chance.",
  ],
};

const cnTemplates = {
  noun: "{word}给我们的日常生活带来快乐。",
  verb: "我们应该勇敢地{word}我们的梦想。",
  adj: "{word}的云南风景吸引了许多游客。",
  adv: "她{word}地说，让每个人都能清楚听到。",
  phrase: "我们经常{word}来保持生活平衡。",
};

function getPosType(pos) {
  if (!pos) return 'phrase';
  const p = pos.toLowerCase();
  if (p.includes('n.')) return 'noun';
  if (p.includes('v.')) return 'verb';
  if (p.includes('adj.')) return 'adj';
  if (p.includes('adv.')) return 'adv';
  return 'phrase';
}

function generateSentence(word, pos, meaning) {
  const type = getPosType(pos);
  const tmplList = enTemplates[type] || enTemplates.phrase;
  // Use hash of word to pick a consistent template
  const hash = word.split('').reduce((s, c) => s + c.charCodeAt(0), 0);
  const tmpl = tmplList[hash % tmplList.length];
  
  let sentence = tmpl.replace('{word}', word);
  
  // For 3rd person singular verbs in present tense (simple heuristic)
  if (type === 'verb' && !word.includes(' ')) {
    // Check if template starts with "She" or "He" or "It"
    if (/^(She|He|It)\s/.test(sentence) && !word.endsWith('s') && !word.endsWith('y')) {
      sentence = sentence.replace(new RegExp(`\\b${word}\\b`), word + 's');
    }
  }
  
  const cnMeaning = meaning || word;
  let cnSentence = cnTemplates[type] || cnTemplates.phrase;
  cnSentence = cnSentence.replace('{word}', cnMeaning);
  
  return { en: sentence, cn: cnSentence };
}

// ========== PROCESS ALL REMAINING SEMESTERS ==========
let generated = 0;
let skipped = 0;

for (const [semKey, sem] of Object.entries(data)) {
  if (semKey === '9a' || semKey === '9b') continue;
  for (const day of sem.days) {
    for (const w of day.words) {
      // Skip if already has a good sentence
      if (w.posDetails && w.posDetails[0]?.example && !w.posDetails[0].example.includes('In a Yunnan exam essay')) {
        skipped++;
        continue;
      }
      
      const meaning = w.meanings?.[0] || w.word;
      const { en, cn } = generateSentence(w.word, w.pos, meaning);
      
      w.example = en;
      w.posDetails = [{
        pos: w.pos || 'n.',
        meaning: meaning,
        example: en,
        exampleCn: cn,
      }];
      generated++;
    }
  }
}

fs.writeFileSync('src/data/calendarData.json', JSON.stringify(data), 'utf8');

console.log('Generated sentences for', generated, 'words');
console.log('Skipped (already good):', skipped);

// Verify
let badCount = 0;
for (const [semKey, sem] of Object.entries(data)) {
  if (semKey === '9a' || semKey === '9b') continue;
  badCount += sem.days.reduce((s, d) => s + d.words.filter(w => !w.posDetails || !w.posDetails[0]?.example || w.posDetails[0].example.includes('In a Yunnan exam essay')).length, 0);
}
console.log('Remaining bad examples:', badCount);
