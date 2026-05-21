import fs from 'node:fs/promises';
import path from 'node:path';

import { formatExchangeForms } from './ecdict-exchange.mjs';

const appRoot = process.cwd();
const sourceCsvPath = path.join(appRoot, 'external', 'ECDICT', 'ecdict.csv');
const outRoot = path.join(appRoot, 'public', 'ecdict');
const chunkRoot = path.join(outRoot, 'chunks');
const manifestPath = path.join(outRoot, 'manifest.json');

const FIELD_NAMES = [
  'word',
  'phonetic',
  'definition',
  'translation',
  'pos',
  'collins',
  'oxford',
  'tag',
  'bnc',
  'frq',
  'exchange',
  'detail',
  'audio',
];

await fs.mkdir(chunkRoot, { recursive: true });

const raw = await fs.readFile(sourceCsvPath, 'utf8');
const rows = parseCsvRecords(raw);
const header = rows.shift() || [];
const indexByField = Object.fromEntries(FIELD_NAMES.map((name) => [name, header.indexOf(name)]));
const chunks = new Map();
let totalEntries = 0;

for (const row of rows) {
  const word = valueAt(row, indexByField.word);
  const key = normalizeWord(word);
  if (!key) continue;

  const chunkKey = getChunkKey(key);
  const entry = {
    w: word,
    s: stripWord(word),
    p: normalizePhonetic(valueAt(row, indexByField.phonetic)),
    t: normalizeMultiline(valueAt(row, indexByField.translation)),
    d: normalizeMultiline(valueAt(row, indexByField.definition)),
    pos: valueAt(row, indexByField.pos),
    tag: valueAt(row, indexByField.tag),
    bnc: toNumberOrEmpty(valueAt(row, indexByField.bnc)),
    frq: toNumberOrEmpty(valueAt(row, indexByField.frq)),
    forms: formatExchangeForms(valueAt(row, indexByField.exchange)),
  };
  if (!entry.t && !entry.d) continue;
  if (!chunks.has(chunkKey)) chunks.set(chunkKey, []);
  chunks.get(chunkKey).push(entry);
  totalEntries += 1;
}

const manifest = {
  source: 'skywind3000/ECDICT',
  sourcePath: path.relative(appRoot, sourceCsvPath).replace(/\\/g, '/'),
  generatedAt: new Date().toISOString(),
  format: 'xsc-ecdict-search-index-v1',
  totalEntries,
  chunks: {},
};

for (const [chunkKey, entries] of chunks) {
  entries.sort((a, b) => a.s.localeCompare(b.s) || a.w.localeCompare(b.w));
  const filename = `${chunkKey}.json`;
  const payload = {
    key: chunkKey,
    count: entries.length,
    entries,
  };
  const json = `${JSON.stringify(payload)}\n`;
  await fs.writeFile(path.join(chunkRoot, filename), json, 'utf8');
  manifest.chunks[chunkKey] = {
    file: `chunks/${filename}`,
    count: entries.length,
    bytes: Buffer.byteLength(json, 'utf8'),
  };
}

await fs.writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');

console.log(`ECDICT entries indexed: ${totalEntries}`);
console.log(`Chunks: ${Object.keys(manifest.chunks).length}`);
console.log(`Output: ${outRoot}`);

function valueAt(row, index) {
  return index >= 0 ? String(row[index] || '').trim() : '';
}

function normalizeWord(value) {
  return String(value || '').trim().toLowerCase().replace(/\s+/g, ' ');
}

function stripWord(value) {
  return normalizeWord(value).replace(/[^a-z0-9]+/g, '');
}

function getChunkKey(word) {
  const stripped = stripWord(word);
  if (!stripped) return 'other';
  const prefix = stripped.slice(0, 2);
  if (/^[a-z][a-z0-9]?$/.test(prefix)) return prefix.padEnd(2, '_');
  if (/^[0-9]/.test(prefix)) return 'num';
  return 'other';
}

function normalizePhonetic(value) {
  const text = String(value || '').trim();
  if (!text) return '';
  if (/^[\[/]/.test(text)) return text;
  return `[${text}]`;
}

function normalizeMultiline(value) {
  return String(value || '')
    .replace(/\r/g, '\n')
    .replace(/\\n/g, '\n')
    .split('\n')
    .map((line) => line.replace(/\s+/g, ' ').trim())
    .filter(Boolean)
    .slice(0, 8)
    .join('\n');
}

function toNumberOrEmpty(value) {
  const number = Number(value);
  return Number.isFinite(number) && number > 0 ? number : '';
}

function parseCsvRecords(text) {
  const records = [];
  let row = [];
  let field = '';
  let inQuotes = false;

  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];
    if (char === '"') {
      if (inQuotes && text[index + 1] === '"') {
        field += '"';
        index += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }
    if (char === ',' && !inQuotes) {
      row.push(field);
      field = '';
      continue;
    }
    if ((char === '\n' || char === '\r') && !inQuotes) {
      if (char === '\r' && text[index + 1] === '\n') index += 1;
      row.push(field);
      if (row.some((item) => item.length > 0)) records.push(row);
      row = [];
      field = '';
      continue;
    }
    field += char;
  }

  if (field || row.length > 0) {
    row.push(field);
    if (row.some((item) => item.length > 0)) records.push(row);
  }

  return records;
}
