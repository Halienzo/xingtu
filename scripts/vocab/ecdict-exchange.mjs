const EXCHANGE_LABELS = new Map([
  ['p', '过去式'],
  ['d', '过去分词'],
  ['i', '现在分词'],
  ['3', '第三人称单数'],
  ['r', '比较级'],
  ['t', '最高级'],
  ['s', '复数'],
  ['0', '原形'],
]);

const INFLECTION_TYPE_LABELS = new Map([
  ['p', '过去式'],
  ['d', '过去分词'],
  ['i', '现在分词'],
  ['3', '第三人称单数'],
  ['r', '比较级'],
  ['t', '最高级'],
  ['s', '复数'],
]);

export function formatExchangeForms(exchange) {
  const text = String(exchange || '').trim();
  if (!text) return [];

  const out = [];
  for (const part of text.split('/')) {
    const [rawType, ...rawValueParts] = part.split(':');
    const type = String(rawType || '').trim();
    const value = rawValueParts.join(':').trim();
    if (!type || !value) continue;

    if (type === '1') {
      const label = INFLECTION_TYPE_LABELS.get(value) || value;
      out.push(`当前词形：${label}`);
      continue;
    }

    const label = EXCHANGE_LABELS.get(type);
    if (!label) continue;
    out.push(`${label}：${value}`);
  }
  return Array.from(new Set(out));
}
