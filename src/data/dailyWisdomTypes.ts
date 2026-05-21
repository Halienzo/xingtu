export type DailyWisdomType = 'idiom' | 'proverb' | 'slang' | 'word' | 'fact' | 'latin' | 'world';

export interface DailyWisdomItem {
  id: string;
  type: DailyWisdomType;
  text: string;
  cn: string;
  sourceTitle: string;
  sourceUrl: string;
  sourceType: 'dictionary' | 'etymology' | 'proverb' | 'latin' | 'reference';
  sourceCheckedAt: string;
  verified: boolean;
  note?: string;
}
