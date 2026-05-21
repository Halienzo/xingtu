import assert from 'node:assert/strict';

import { formatExchangeForms } from './ecdict-exchange.mjs';

assert.deepEqual(
  formatExchangeForms('s:balloons/p:ballooned/i:ballooning/d:ballooned/3:balloons'),
  [
    '复数：balloons',
    '过去式：ballooned',
    '现在分词：ballooning',
    '过去分词：ballooned',
    '第三人称单数：balloons',
  ],
);

assert.deepEqual(
  formatExchangeForms('0:aaah/1:p'),
  [
    '原形：aaah',
    '当前词形：过去式',
  ],
);

assert.deepEqual(formatExchangeForms(''), []);

console.log('ecdict-exchange tests passed');
