import { readdirSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dataDir = resolve(__dirname, '../src/data');
const packFiles = readdirSync(dataDir)
  .filter(file => /^dailyWisdomVerifiedPack.*\.ts$/.test(file))
  .sort();
const source = packFiles.map(file => readFileSync(resolve(dataDir, file), 'utf8')).join('\n');
const strict = process.argv.includes('--strict');
const calendarDataPath = resolve(dataDir, 'calendarData.json');
const calendarData = JSON.parse(readFileSync(calendarDataPath, 'utf8'));

const requiredSlots = 24 * 365;
const ids = [...source.matchAll(/id:\s*'([^']+)'/g)].map(match => match[1]);
const texts = [...source.matchAll(/text:\s*'([^']+)'/g)].map(match => match[1]);
const sourceUrls = [...source.matchAll(/sourceUrl:\s*'https?:\/\/[^']+'/g)];
const verifiedFlags = [...source.matchAll(/verified:\s*true/g)];
const checkedDates = [...source.matchAll(/sourceCheckedAt:\s*checkedAt/g)];

function findDuplicates(values) {
  const seen = new Set();
  const duplicates = new Set();
  values.forEach(value => {
    if (seen.has(value)) duplicates.add(value);
    seen.add(value);
  });
  return Array.from(duplicates);
}

function hashText(value) {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = ((hash << 5) - hash + value.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
}

const duplicateIds = findDuplicates(ids);
const duplicateTexts = findDuplicates(texts);
const itemCount = ids.length;
const uniqueTextCount = new Set(texts).size;
const verifiedCount = verifiedFlags.length;
const sourcedCount = sourceUrls.length;
const checkedCount = checkedDates.length;

const integrityIssues = [
  ...duplicateIds.map(value => `duplicate id: ${value}`),
  ...duplicateTexts.map(value => `duplicate text: ${value}`),
  itemCount !== sourcedCount ? `sourceUrl count mismatch: ${sourcedCount}/${itemCount}` : '',
  itemCount !== verifiedCount ? `verified count mismatch: ${verifiedCount}/${itemCount}` : '',
  itemCount !== checkedCount ? `sourceCheckedAt count mismatch: ${checkedCount}/${itemCount}` : '',
].filter(Boolean);

const byType = [...source.matchAll(/type:\s*'([^']+)'/g)].reduce((acc, match) => {
  acc[match[1]] = (acc[match[1]] || 0) + 1;
  return acc;
}, {});

const seedItems = [...source.matchAll(/id:\s*'([^']+)'[\s\S]*?type:\s*'([^']+)'[\s\S]*?text:\s*'([^']+)'/g)]
  .map(match => ({ id: match[1], type: match[2], text: match[3] }));

const calendarSlots = [];
Object.entries(calendarData).forEach(([scopeKey, semester]) => {
  const seedOffset = hashText(scopeKey);
  semester.days.forEach(day => {
    if (!Array.isArray(day.words) || day.words.length === 0 || seedItems.length === 0) return;
    const seed = seedItems[(Math.max(1, day.day) - 1 + seedOffset) % seedItems.length];
    const word = day.words[hashText(`${scopeKey}-${day.day}`) % day.words.length];
    calendarSlots.push({
      id: `calendar-${scopeKey}-day-${day.day}`,
      text: `${seed.text} · ${semester.name} Day ${day.day}: ${word.word}`,
      type: seed.type,
    });
  });
});

const calendarSlotTexts = calendarSlots.map(slot => `${slot.type}:${slot.text}`);
const calendarSlotIds = calendarSlots.map(slot => slot.id);
const duplicateCalendarSlotTexts = findDuplicates(calendarSlotTexts);
const duplicateCalendarSlotIds = findDuplicates(calendarSlotIds);

if (calendarSlots.length !== requiredSlots) {
  integrityIssues.push(`calendar slot count mismatch: ${calendarSlots.length}/${requiredSlots}`);
}
duplicateCalendarSlotTexts.forEach(value => integrityIssues.push(`duplicate calendar slot text: ${value}`));
duplicateCalendarSlotIds.forEach(value => integrityIssues.push(`duplicate calendar slot id: ${value}`));

const report = {
  requiredSlots,
  packFiles,
  seedItemCount: itemCount,
  uniqueSeedTextCount: uniqueTextCount,
  verifiedCount,
  sourcedCount,
  checkedCount,
  calendarSlotCount: calendarSlots.length,
  uniqueCalendarSlotTextCount: new Set(calendarSlotTexts).size,
  uniqueCalendarSlotIdCount: new Set(calendarSlotIds).size,
  missingUniqueItems: Math.max(0, requiredSlots - new Set(calendarSlotTexts).size),
  byType,
  integrityIssues,
  readyForStrictUniqueCalendar: new Set(calendarSlotTexts).size >= requiredSlots && integrityIssues.length === 0,
};

console.log(JSON.stringify(report, null, 2));

if (integrityIssues.length > 0) {
  process.exitCode = 1;
} else if (strict && !report.readyForStrictUniqueCalendar) {
  process.exitCode = 1;
}
