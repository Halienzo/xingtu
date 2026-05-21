import assert from 'node:assert/strict';

import {
  extractMeanings,
  extractPos,
  extractPosMeaningDetails,
  mergeCandidateLexicalDetails,
  SUPPLEMENTAL_POS_DETAILS,
} from './pos-meaning-utils.mjs';

assert.deepEqual(
  extractPosMeaningDetails('vi. 如气球般膨胀 n. 气球'),
  [
    { pos: 'vi.', meaning: '如气球般膨胀' },
    { pos: 'n.', meaning: '气球' },
  ],
);

assert.deepEqual(
  extractPosMeaningDetails('n. 气球；热气球 vt. 使膨胀；使激增 vi. 膨胀；激增 adj. 气球状的'),
  [
    { pos: 'n.', meaning: '气球；热气球' },
    { pos: 'vt.', meaning: '使膨胀；使激增' },
    { pos: 'vi.', meaning: '膨胀；激增' },
    { pos: 'adj.', meaning: '气球状的' },
  ],
);

assert.equal(
  extractPos('vt. 挖，掘；探究 vi. 挖掘 n. 戳，刺；挖苦'),
  'vt./vi./n.',
);

assert.deepEqual(
  extractMeanings('phone v. 打电话 n. 电话'),
  ['打电话', '电话'],
);

const mergedBalloon = mergeCandidateLexicalDetails(
  [
    {
      word: 'balloon',
      normalized: 'balloon',
      pos: 'n.',
      meanings: ['气球'],
      rawLine: 'balloon /bəˈluːn/ n. 气球',
      priority: 1,
    },
    {
      word: 'balloon',
      normalized: 'balloon',
      pos: 'vi./n.',
      meanings: ['如气球般膨胀', '气球'],
      rawLine: '77\tballoon\t[bəˈlu:n]\tvi. 如气球般膨胀 n. 气球',
      priority: 2,
    },
  ],
  SUPPLEMENTAL_POS_DETAILS.get('balloon'),
);

assert.deepEqual(
  mergedBalloon.posDetails.map((item) => item.pos),
  ['n.', 'vi.', 'vt.', 'adj.'],
);

assert.deepEqual(
  mergedBalloon.posDetails.map((item) => item.meaning),
  [
    '气球；热气球',
    '如气球般膨胀；膨胀；激增；乘气球飞行',
    '使膨胀；使激增',
    '气球状的；像气球般鼓起的',
  ],
);

console.log('pos-meaning-utils tests passed');
