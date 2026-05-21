import fs from 'fs';

const content = fs.readFileSync('src/data/gradedReadingData.ts', 'utf-8');
const regex = /\{[^}]*id: "([^"]+)"[^}]*titleEn: "([^"]+)"[^}]*\}/g;
const suspicious = [];
let m;
while ((m = regex.exec(content)) !== null) {
  const id = m[1];
  const title = m[2];
  const words = title.split(/\s+/).length;
  if (words > 8 && /^[A-Z][a-z]/.test(title)) {
    const starts = /^(One day|My |The |A |I |It |He |She |They |We |You |Every |When |There |This |That |These |Those |Some |All |Many |Most |If |Because |So |But |And |Or |However|Today|Yesterday|Tomorrow|Now|Here|Do you|As we|During|Sometimes|Buzz|Her name|Two |Zack |Bob |Melissa|Julie|Ryan|Cars |Ouch|Steven|Brrr|Would you|When my|Gerry |Smith|Mike |There was|Mom was|Alex |Scan|El is|As we were|Sometimes,|If you are|Buzz,|One elephant|One day at|A little|Tonight|Numbers|Her name|Teddy|Tonight|Melissa|Julie|Today|My |My grandma|Buzz\.)/i;
    if (starts.test(title)) {
      suspicious.push({id, title, words});
    }
  }
}
console.log('Found', suspicious.length, 'suspicious titles:');
suspicious.forEach(s => console.log(s.id, '|', s.words, 'words |', s.title.substring(0, 70)));
