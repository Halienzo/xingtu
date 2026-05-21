const fs = require('fs');
const data = JSON.parse(fs.readFileSync('src/data/calendarData.json', 'utf8'));
const keys = Object.keys(data).sort().filter(k => k !== '9a' && k !== '9b');

// 检测复合词中明显有语法问题的例句
const badPatterns = [
  /It is good to \S+ with people/,
  /Learning to \S+ helps us grow/,
  /We should \S+ whenever we have/,
  /We often \S+ to keep our life balanced/,
  /The beauty of \S+ lies in its simplicity/,
  /Learning about \S+ opens new doors/,
  /A good \S+ can make a big difference/,
  /We should value the \S+ around us/,
  /We should \S+ whenever we have/,
  /She loves to \S+ with her friends every day/,
  /It is important to \S+ every day/,
  /They decided to \S+ after much discussion/,
  /He broke the \S+ by accident/,
  /I keep the \S+ on my desk/,
  /I named my \S+ Lucky/,
  /She designed a new \S+ last month/,
  /The \S+ is perfect for the job/,
  /The \S+ is older than me/,
  /The \S+ is on sale today/,
  /The \S+ fell on the floor/,
  /The \S+ is my favorite gift/,
  /The \S+ is very popular now/,
  /The \S+ is heavier than it looks/,
  /The \S+ is the best I have ever seen/,
  /The \S+ was a gift from my parents/,
  /The \S+ came from a distant country/,
  /The \S+ is safe in the drawer/,
  /I chose the blue \S+/,
  /I put the \S+ in the box/,
  /I found a \S+ in my bag/,
  /I want to buy a \S+/,
  /I like \S+\./,
  /I need a \S+ for school/,
  /I received a \S+ for my birthday/,
  /I ordered a \S+ online yesterday/,
  /I saved money to buy the \S+/,
  /I forgot where I put the \S+/,
  /I added the \S+ to my collection/,
  /I painted the \S+ green/,
  /I wrapped the \S+ in paper/,
  /I borrowed a \S+ from the library/,
  /I compared two \S+s carefully/,
  /I took a photo of the \S+/,
  /I cleaned the \S+ carefully/,
  /I read about the \S+ online/,
  /I share my \S+ with friends/,
  /I saw a \S+ in the museum/,
  /I lost my \S+ this morning/,
  /I named my \S+ Lucky/,
  /He gave me a \S+/,
  /He found a \S+ by the river/,
  /He searched for the \S+ everywhere/,
  /He carried the \S+ upstairs/,
  /He donated his \S+ to charity/,
  /He admired the \S+ for a long time/,
  /He described the \S+ in detail/,
  /He collects \S+s as a hobby/,
  /He broke the \S+ by accident/,
  /He brought a \S+ to class/,
  /She sent me a \S+ as a gift/,
  /She picked up the \S+ gently/,
  /She returned the \S+ to the store/,
  /She repaired the broken \S+/,
  /She decorated the \S+ with flowers/,
  /She chose the \S+ for its color/,
  /She made a \S+ by hand/,
  /She uses the \S+ every day/,
  /She drew a \S+ on the paper/,
  /She bought a \S+ yesterday/,
  /She wrapped the \S+ in paper/,
  /The teacher showed us a \S+/,
  /The \S+ belongs to my sister/,
  /The \S+ reminds me of home/,
  /The \S+ is missing from the shelf/,
  /The \S+ fits perfectly in my hand/,
  /The \S+ is made of wood/,
  /The \S+ is near the window/,
  /The \S+ is under the chair/,
  /The \S+ is on the table/,
  /The \S+ looks new/,
  /The \S+ is very expensive/,
  /The \S+ is very beautiful/,
  /The \S+ is very useful/,
  /This \S+ is very useful/,
  /Do you like this \S+/,
  /My favorite \S+ is red/,
  /We saw many \S+s in the park/
];

let compoundCount = 0;
let badCompoundCount = 0;
const samples = [];

for (const key of keys) {
  const sem = data[key];
  for (const day of sem.days) {
    for (const w of day.words) {
      const word = w.word;
      if (!word.includes(' ') && !word.includes('-') && !word.includes('...')) continue;
      
      if (w.posDetails) {
        for (const pd of w.posDetails) {
          compoundCount++;
          const ex = pd.example || '';
          const isBad = badPatterns.some(p => p.test(ex));
          if (isBad) {
            badCompoundCount++;
            if (samples.length < 30) {
              samples.push({word, ex: ex.substring(0, 100), cn: pd.exampleCn?.substring(0, 60)});
            }
          }
        }
      }
    }
  }
}

console.log('Total compound word examples: ' + compoundCount);
console.log('Bad compound examples: ' + badCompoundCount);
console.log('\nSamples of bad compound examples:');
samples.forEach((s, i) => {
  console.log((i+1) + '. ' + s.word + ': ' + s.ex);
  console.log('   CN: ' + s.cn);
});
