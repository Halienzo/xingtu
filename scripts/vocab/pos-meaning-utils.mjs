const POS_ALIASES = new Map([
  ['noun', 'n.'],
  ['n', 'n.'],
  ['verb', 'v.'],
  ['v', 'v.'],
  ['vt', 'vt.'],
  ['transitive', 'vt.'],
  ['vi', 'vi.'],
  ['intransitive', 'vi.'],
  ['adjective', 'adj.'],
  ['adj', 'adj.'],
  ['a', 'adj.'],
  ['s', 'adj.'],
  ['adverb', 'adv.'],
  ['adv', 'adv.'],
  ['ad', 'adv.'],
  ['preposition', 'prep.'],
  ['prep', 'prep.'],
  ['pronoun', 'pron.'],
  ['pron', 'pron.'],
  ['conjunction', 'conj.'],
  ['conj', 'conj.'],
  ['numeral', 'num.'],
  ['num', 'num.'],
  ['interjection', 'interj.'],
  ['interj', 'interj.'],
  ['int', 'interj.'],
  ['article', 'art.'],
  ['art', 'art.'],
  ['abbreviation', 'abbr.'],
  ['abbr', 'abbr.'],
  ['auxiliary', 'aux.'],
  ['aux', 'aux.'],
  ['modal', 'modal v.'],
  ['modalv', 'modal v.'],
  ['modal v', 'modal v.'],
  ['phrase', 'phr.'],
  ['phr', 'phr.'],
]);

const POS_MARKER_RE = /(^|[\s;；,，、:：()[\]{}<>/&])((?:modal\s+v|auxiliary|abbreviation|interjection|conjunction|preposition|adjective|adverb|pronoun|numeral|article|transitive|intransitive|noun|verb|interj|abbr|prep|pron|conj|adj|adv|num|art|aux|modalv|modal|vt|vi|a\.|s\.|ad\.|v|n)\.?)(?=\s|[\u3400-\u9fff]|[;；,，、:：.)）/&]|$)/gi;
const POS_ONLY_RE = /^(?:n|v|vt|vi|adj|adv|prep|pron|conj|num|int|interj|art|abbr|aux|modalv|modal|modal\s+v)\.?$/i;
const PHONETIC_RE = /\/[^/\n]{1,80}\/|\[[^\]\n]{1,80}\]/g;
const CHINESE_RE = /[\u3400-\u9fff]/;
const POS_DISPLAY_ORDER = [
  'n.',
  'pron.',
  'vi.',
  'vt.',
  'v.',
  'adj.',
  'adv.',
  'prep.',
  'conj.',
  'num.',
  'art.',
  'interj.',
  'abbr.',
  'aux.',
  'modal v.',
  'phr.',
];

export const SUPPLEMENTAL_POS_DETAILS = new Map([
  ['balloon', [
    { pos: 'n.', meaning: '气球；热气球' },
    { pos: 'vi.', meaning: '膨胀；激增；乘气球飞行' },
    { pos: 'vt.', meaning: '使膨胀；使激增' },
    { pos: 'adj.', meaning: '气球状的；像气球般鼓起的' },
  ]],
]);

export function normalizePosToken(token) {
  const compact = String(token || '')
    .trim()
    .toLowerCase()
    .replace(/\.$/, '')
    .replace(/\s+/g, ' ');
  return POS_ALIASES.get(compact) || '';
}

export function isPosOnlyToken(value) {
  return POS_ONLY_RE.test(String(value || '').trim());
}

export function extractPos(line) {
  const found = [];
  for (const marker of findPosMarkers(line)) {
    if (!found.includes(marker.pos)) found.push(marker.pos);
  }
  return found.join('/');
}

export function extractMeanings(text) {
  const structured = extractPosMeaningDetails(text);
  if (structured.length > 0) {
    return uniqueStrings(structured.map((item) => item.meaning)).slice(0, 4);
  }
  return collectLooseMeanings(text).slice(0, 4);
}

export function extractPosMeaningDetails(text) {
  const source = normalizeText(text);
  if (!source) return [];

  const markers = findPosMarkers(source);
  if (markers.length === 0) return [];

  const details = [];
  for (let index = 0; index < markers.length; index += 1) {
    const marker = markers[index];
    const next = markers[index + 1];
    const rawMeaning = source.slice(marker.end, next ? next.start : source.length);
    const meaning = cleanMeaning(rawMeaning);
    if (!meaning) continue;
    addOrMergeDetail(details, { pos: marker.pos, meaning });
  }
  return details;
}

export function mergeCandidateLexicalDetails(rows, supplementalDetails = []) {
  const details = [];
  const rowList = Array.isArray(rows) ? rows.filter(Boolean) : [];

  for (const row of rowList) {
    addDetails(details, normalizeDetailList(row.posDetails));
    addDetails(details, extractPosMeaningDetails(row.rawLine || ''));

    const posList = splitPosList(row.pos);
    const meanings = Array.isArray(row.meanings) ? row.meanings : [];
    if (posList.length > 0 && meanings.length > 0) {
      if (posList.length === meanings.length) {
        posList.forEach((pos, index) => addOrMergeDetail(details, { pos, meaning: meanings[index] }));
      } else if (posList.length === 1) {
        addOrMergeDetail(details, { pos: posList[0], meaning: meanings.join('；') });
      } else {
        posList.forEach((pos) => {
          const matched = meanings.find((meaning) => meaningLooksSpecificToPos(meaning, pos));
          if (matched) addOrMergeDetail(details, { pos, meaning: matched });
        });
      }
    }
  }

  addDetails(details, normalizeDetailList(supplementalDetails));

  const fallbackMeanings = uniqueStrings(rowList.flatMap((row) => Array.isArray(row.meanings) ? row.meanings : []));
  if (details.length === 0 && fallbackMeanings.length > 0) {
    const fallbackPos = splitPosList(rowList.find((row) => row.pos)?.pos)[0] || '';
    if (fallbackPos) addOrMergeDetail(details, { pos: fallbackPos, meaning: fallbackMeanings.join('；') });
  }

  const posDetails = details.map((item) => ({
    pos: item.pos,
    meaning: normalizeMeaning(item.meaning),
  })).filter((item) => item.pos && item.meaning)
    .sort(comparePosForDisplay);

  return {
    pos: posDetails.map((item) => item.pos).join('/'),
    meanings: posDetails.map((item) => item.meaning),
    posDetails,
  };
}

function comparePosForDisplay(a, b) {
  const left = POS_DISPLAY_ORDER.indexOf(a.pos);
  const right = POS_DISPLAY_ORDER.indexOf(b.pos);
  if (left === -1 && right === -1) return 0;
  if (left === -1) return 1;
  if (right === -1) return -1;
  return left - right;
}

export function splitPosList(value) {
  if (!value) return [];
  const found = [];
  for (const part of String(value).split(/[\/,，;；]+/)) {
    const pos = normalizePosToken(part);
    if (pos && !found.includes(pos)) found.push(pos);
  }
  return found;
}

function findPosMarkers(text) {
  const markers = [];
  const source = String(text || '');
  POS_MARKER_RE.lastIndex = 0;
  let match;
  while ((match = POS_MARKER_RE.exec(source)) !== null) {
    const prefix = match[1] || '';
    const raw = match[2] || '';
    const pos = normalizePosToken(raw);
    if (!pos) continue;
    const start = match.index + prefix.length;
    const end = start + raw.length;
    markers.push({ pos, start, end });
  }
  return markers;
}

function addDetails(target, details) {
  for (const item of details || []) addOrMergeDetail(target, item);
}

function addOrMergeDetail(target, item) {
  const pos = normalizePosToken(item?.pos);
  const meaning = normalizeMeaning(item?.meaning);
  if (!pos || !meaning) return;
  const existing = target.find((detail) => detail.pos === pos);
  if (!existing) {
    target.push({ pos, meaning });
    return;
  }
  existing.meaning = mergeMeanings(existing.meaning, meaning);
}

function normalizeDetailList(details) {
  if (!Array.isArray(details)) return [];
  return details
    .map((item) => ({
      pos: normalizePosToken(item?.pos),
      meaning: normalizeMeaning(item?.meaning),
    }))
    .filter((item) => item.pos && item.meaning);
}

function mergeMeanings(left, right) {
  const fragments = [];
  for (const value of [left, right]) {
    for (const fragment of splitMeaningFragments(value)) {
      if (!fragments.some((existing) => sameOrContains(existing, fragment))) {
        const replaceIndex = fragments.findIndex((existing) => sameOrContains(fragment, existing));
        if (replaceIndex >= 0) fragments.splice(replaceIndex, 1, fragment);
        else fragments.push(fragment);
      }
    }
  }
  return fragments.slice(0, 6).join('；');
}

function sameOrContains(a, b) {
  const left = normalizeMeaning(a);
  const right = normalizeMeaning(b);
  return left === right;
}

function meaningLooksSpecificToPos(meaning, pos) {
  const text = String(meaning || '').toLowerCase();
  return text.includes(pos.replace('.', '')) || CHINESE_RE.test(text);
}

function collectLooseMeanings(text) {
  const clean = normalizeText(text).replace(PHONETIC_RE, ' ');
  const chineseParts = clean.match(/[\u3400-\u9fff][\u3400-\u9fff，、；;（）()·\s-]{0,80}/g) || [];
  return uniqueStrings(chineseParts.map(normalizeMeaning).filter(Boolean));
}

function cleanMeaning(segment) {
  let text = normalizeText(segment).replace(PHONETIC_RE, ' ');
  const firstChinese = text.search(CHINESE_RE);
  if (firstChinese < 0) return '';
  text = text.slice(firstChinese);
  text = text
    .replace(/\[[^\]]*\]/g, '')
    .replace(/\([^()\u3400-\u9fff]*\)/g, '')
    .replace(/[。.!?？]+$/g, '')
    .replace(/^[，,、；;:：\s-]+/g, '')
    .replace(/[，,、；;:：\s-]+$/g, '')
    .trim();
  return normalizeMeaning(text);
}

function normalizeMeaning(value) {
  let text = String(value || '')
    .replace(/\s+/g, ' ')
    .replace(/；+/g, '；')
    .replace(/;+/, '；')
    .replace(/[，,、；;:：\s-]+$/g, '')
    .replace(/^[，,、；;:：\s-]+/g, '')
    .trim();
  if (!CHINESE_RE.test(text)) return '';
  text = splitMeaningFragments(text).join('；');
  return text.length > 90 ? `${text.slice(0, 90).replace(/[；，,、\s]+$/g, '')}` : text;
}

function splitMeaningFragments(value) {
  return uniqueStrings(String(value || '')
    .split(/[；;]+/)
    .map((part) => part.replace(/\s+/g, ' ').trim())
    .filter((part) => CHINESE_RE.test(part)));
}

function uniqueStrings(values) {
  const out = [];
  for (const value of values || []) {
    const text = String(value || '').trim();
    if (!text) continue;
    if (!out.includes(text)) out.push(text);
  }
  return out;
}

function normalizeText(text) {
  return String(text || '')
    .replace(/\r/g, '\n')
    .replace(/\u00a0/g, ' ')
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}
