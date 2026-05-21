import fs from 'fs';

const raw = fs.readFileSync('src/data/calendarData.json', 'utf8');
const data = JSON.parse(raw);

// ========== Sentence templates by POS ==========
const templates = {
  noun: [
    "The {word} brings joy to our daily life.",
    "We should value the {word} around us.",
    "A true {word} can change everything.",
    "The beauty of {word} lies in its simplicity.",
  ],
  verb: [
    "We should {word} our dreams with courage.",
    "She loves to {word} with her friends.",
    "It is important to {word} every day.",
    "They {word} together to make the world better.",
  ],
  adj: [
    "The {word} scenery of Yunnan attracts many visitors.",
    "It feels {word} to help others in need.",
    "A {word} attitude leads to a happy life.",
    "The {word} river flows through the valley.",
  ],
  adv: [
    "She spoke {word} so everyone could hear.",
    "He finished the task {word} before sunset.",
    "They walked {word} along the country road.",
    "The music played {word} in the concert hall.",
  ],
  phrase: [
    "We often {word} during the holiday season.",
    "It is good to {word} with family members.",
    "They decided to {word} after school.",
    "Learning to {word} helps us grow.",
  ],
};

const cnTemplates = {
  noun: "{word}给我们的日常生活带来快乐。",
  verb: "我们应该勇敢地{word}我们的梦想。",
  adj: "{word}的云南风景吸引了许多游客。",
  adv: "她{word}说话，让每个人都能听到。",
  phrase: "我们经常在假期{word}。",
};

function getPosType(pos) {
  if (!pos) return 'phrase';
  const p = pos.toLowerCase();
  if (p.includes('n.')) return 'noun';
  if (p.includes('v.')) return 'verb';
  if (p.includes('adj.')) return 'adj';
  if (p.includes('adv.')) return 'adv';
  if (p.includes('phr') || p.includes('prep') || p.includes('conj')) return 'phrase';
  return 'phrase';
}

function generateSentence(word, pos, meaning) {
  const type = getPosType(pos);
  const tmplList = templates[type] || templates.phrase;
  const tmpl = tmplList[Math.floor(Math.random() * tmplList.length)];
  
  // For phrases with spaces, adjust template
  let sentence = tmpl.replace('{word}', word);
  
  // For 3rd person singular verbs (simple heuristic)
  if (type === 'verb' && !word.includes(' ')) {
    if (/^[aeiou]/.test(word)) {
      // do nothing
    }
  }
  
  // Generate Chinese translation
  const cnMeaning = meaning || word;
  let cnSentence = cnTemplates[type] || cnTemplates.phrase;
  cnSentence = cnSentence.replace('{word}', cnMeaning);
  
  return { en: sentence, cn: cnSentence };
}

// ========== PROCESS 9a ==========
let generated = 0;
let skipped = 0;

for (const day of data['9a'].days) {
  for (const w of day.words) {
    // Only generate for words that still have the bad template sentence
    const hasBadExample = !w.posDetails || !w.posDetails[0]?.example || w.posDetails[0].example.includes('In a Yunnan exam essay');
    if (!hasBadExample) {
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

fs.writeFileSync('src/data/calendarData.json', JSON.stringify(data), 'utf8');

console.log('Generated sentences for', generated, 'words');
console.log('Skipped (already have good sentences):', skipped);

// Show samples
console.log('\nSample generated sentences:');
const samples = [];
for (const day of data['9a'].days) {
  for (const w of day.words) {
    if (w.posDetails && w.posDetails[0]?.example && !w.posDetails[0].example.includes('In a Yunnan exam essay')) {
      if (samples.length < 10 && !samples.find(s => s.word === w.word)) {
        samples.push({word: w.word, ex: w.posDetails[0].example, cn: w.posDetails[0].exampleCn});
      }
    }
  }
}
for (const s of samples) {
  console.log(`  ${s.word}: ${s.ex}`);
  console.log(`     ${s.cn}`);
}
