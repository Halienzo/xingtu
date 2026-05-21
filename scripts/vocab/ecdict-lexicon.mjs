import fs from 'node:fs/promises';

import {
  extractPosMeaningDetails,
  splitPosList,
} from './pos-meaning-utils.mjs';

export async function loadEcdictLexicon(csvPath, targetKeys) {
  try {
    await fs.access(csvPath);
  } catch {
    return new Map();
  }

  const target = targetKeys instanceof Set ? targetKeys : null;
  const raw = await fs.readFile(csvPath, 'utf8');
  const lines = raw.split(/\r?\n/);
  const header = parseCsvLine(lines[0] || '');
  const wordIndex = header.indexOf('word');
  const phoneticIndex = header.indexOf('phonetic');
  const translationIndex = header.indexOf('translation');
  const posIndex = header.indexOf('pos');
  const map = new Map();

  if (wordIndex < 0 || translationIndex < 0) return map;

  for (let index = 1; index < lines.length; index += 1) {
    const line = lines[index];
    if (!line) continue;
    const comma = line.indexOf(',');
    if (comma <= 0) continue;
    const quickWord = unquoteCsvValue(line.slice(0, comma));
    const key = normalizeLexiconKey(quickWord);
    if (!key || (target && !target.has(key))) continue;

    const fields = parseCsvLine(line);
    const word = fields[wordIndex] || quickWord;
    const normalized = normalizeLexiconKey(word);
    if (!normalized || (target && !target.has(normalized))) continue;

    const translation = normalizeTranslation(fields[translationIndex] || '');
    const posDetails = extractPosMeaningDetails(translation);
    const posFromFrequency = normalizeFrequencyPos(fields[posIndex] || '');
    if (posDetails.length === 0 && posFromFrequency.length === 0) continue;

    const existing = map.get(normalized);
    const current = {
      word,
      phonetic: normalizePhonetic(fields[phoneticIndex] || ''),
      pos: posDetails.length ? posDetails.map((item) => item.pos).join('/') : posFromFrequency.join('/'),
      meanings: posDetails.map((item) => item.meaning),
      posDetails,
      source: 'ECDICT',
    };
    if (!existing || current.posDetails.length > existing.posDetails.length) {
      map.set(normalized, current);
    }
  }

  return map;
}

export function normalizeLexiconKey(value) {
  return String(value || '')
    .trim()
    .toLowerCase()
    .replace(/[’']/g, "'")
    .replace(/\s+/g, ' ');
}

function normalizeTranslation(value) {
  return String(value || '').replace(/\\n/g, '\n').replace(/\r/g, '\n');
}

function normalizeFrequencyPos(value) {
  return splitPosList(String(value || '').replace(/:\d+(?:\.\d+)?/g, ''));
}

function normalizePhonetic(value) {
  const text = String(value || '').trim();
  if (!text) return '';
  if (/^[\[/]/.test(text)) return text;
  return `[${text}]`;
}

function parseCsvLine(line) {
  const fields = [];
  let current = '';
  let inQuotes = false;
  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];
    if (char === '"') {
      if (inQuotes && line[index + 1] === '"') {
        current += '"';
        index += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }
    if (char === ',' && !inQuotes) {
      fields.push(current);
      current = '';
      continue;
    }
    current += char;
  }
  fields.push(current);
  return fields.map(unquoteCsvValue);
}

function unquoteCsvValue(value) {
  const text = String(value || '');
  if (text.startsWith('"') && text.endsWith('"')) {
    return text.slice(1, -1).replace(/""/g, '"');
  }
  return text;
}
