import { verifiedDailyWisdomItems } from './dailyWisdomVerifiedPack';
import { verifiedDailyWisdomItemsPack2 } from './dailyWisdomVerifiedPack2';
import calendarDataJson from './calendarData.json';
import type { DailyWisdomItem } from './dailyWisdomTypes';

export type { DailyWisdomItem } from './dailyWisdomTypes';

export const REQUIRED_DAILY_WISDOM_SLOTS = 24 * 365;

export const dailyWisdomItems: DailyWisdomItem[] = [
  ...verifiedDailyWisdomItems,
  ...verifiedDailyWisdomItemsPack2,
];

interface CalendarWordSeed {
  word: string;
  phonetic?: string;
  pos: string;
  meanings: string[];
}

interface CalendarDaySeed {
  day: number;
  date: string;
  unit?: string;
  words: CalendarWordSeed[];
}

interface SemesterSeed {
  key: string;
  name: string;
  sourceNote?: string;
  days: CalendarDaySeed[];
}

const calendarData = calendarDataJson as Record<string, SemesterSeed>;

function hashText(value: string) {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = ((hash << 5) - hash + value.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
}

function buildCalendarWisdom(dayNumber: number, scopeKey: string): DailyWisdomItem | null {
  const semester = calendarData[scopeKey];
  if (!semester) return null;

  const day = semester.days.find(item => item.day === dayNumber);
  if (!day || day.words.length === 0 || dailyWisdomItems.length === 0) return null;

  const seedOffset = hashText(scopeKey);
  const seed = dailyWisdomItems[(Math.max(1, dayNumber) - 1 + seedOffset) % dailyWisdomItems.length];

  return {
    ...seed,
    id: `calendar-${scopeKey}-day-${day.day}`,
    text: seed.text,
    cn: seed.cn,
    sourceTitle: seed.sourceTitle,
    note: seed.note || '',
  };
}

export function getDailyWisdom(dayNumber: number, scopeKey = 'global'): DailyWisdomItem {
  const calendarWisdom = buildCalendarWisdom(dayNumber, scopeKey);
  if (calendarWisdom) return calendarWisdom;

  const offset = hashText(scopeKey);
  return dailyWisdomItems[(Math.max(1, dayNumber) - 1 + offset) % dailyWisdomItems.length];
}

export function getAllCalendarWisdomItems() {
  const items: DailyWisdomItem[] = [];
  Object.keys(calendarData).forEach(scopeKey => {
    calendarData[scopeKey].days.forEach(day => {
      const item = buildCalendarWisdom(day.day, scopeKey);
      if (item) items.push(item);
    });
  });
  return items;
}

export function getDailyWisdomCoverageReport() {
  const uniqueTexts = new Set(dailyWisdomItems.map(item => `${item.type}:${item.text}`));
  const uniqueIds = new Set(dailyWisdomItems.map(item => item.id));
  const verifiedTexts = dailyWisdomItems.filter(item => item.verified).length;
  const withSources = dailyWisdomItems.filter(item => item.sourceTitle && item.sourceUrl).length;
  const calendarItems = getAllCalendarWisdomItems();
  const uniqueCalendarTexts = new Set(calendarItems.map(item => `${item.type}:${item.text}`));
  const uniqueCalendarIds = new Set(calendarItems.map(item => item.id));
  return {
    requiredSlots: REQUIRED_DAILY_WISDOM_SLOTS,
    currentItems: dailyWisdomItems.length,
    uniqueItems: uniqueTexts.size,
    uniqueIds: uniqueIds.size,
    verifiedItems: verifiedTexts,
    sourcedItems: withSources,
    calendarSlotItems: calendarItems.length,
    uniqueCalendarSlotItems: uniqueCalendarTexts.size,
    uniqueCalendarSlotIds: uniqueCalendarIds.size,
    missingUniqueItems: Math.max(0, REQUIRED_DAILY_WISDOM_SLOTS - uniqueCalendarTexts.size),
    readyForStrictUniqueCalendar: uniqueCalendarTexts.size >= REQUIRED_DAILY_WISDOM_SLOTS && uniqueCalendarIds.size >= REQUIRED_DAILY_WISDOM_SLOTS,
  };
}
