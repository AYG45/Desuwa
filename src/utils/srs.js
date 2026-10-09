// Spaced Repetition System (SRS) Engine
// Inspired by WaniKani/Anki — items progress through levels with increasing intervals

// SRS intervals in milliseconds
const SRS_INTERVALS = [
  4 * 60 * 60 * 1000,       // Level 0 (New): 4 hours
  8 * 60 * 60 * 1000,       // Level 1 (Apprentice 1): 8 hours
  24 * 60 * 60 * 1000,      // Level 2 (Apprentice 2): 1 day
  3 * 24 * 60 * 60 * 1000,  // Level 3 (Guru 1): 3 days
  7 * 24 * 60 * 60 * 1000,  // Level 4 (Guru 2): 7 days
  14 * 24 * 60 * 60 * 1000, // Level 5 (Master): 14 days
  30 * 24 * 60 * 60 * 1000, // Level 6 (Enlightened): 30 days
  // Level 7: "Burned" — no more reviews needed
];

const SRS_LEVEL_NAMES = [
  'New', 'Apprentice 1', 'Apprentice 2', 'Guru 1',
  'Guru 2', 'Master', 'Enlightened', 'Burned',
];

const SRS_LEVEL_COLORS = [
  '#ff6b6b', '#ffa502', '#ffd93d', '#6bcb77',
  '#4d96ff', '#9b59b6', '#e94560', '#2ed573',
];

export const SRS_MAX_LEVEL = 7;

/**
 * Create a new SRS item when a character/word is first learned.
 */
export function createSRSItem(id, type, char, extra = {}) {
  return {
    id,
    type,       // 'hiragana' | 'katakana' | 'kanji' | 'vocab'
    char,
    meaning: extra.meaning || '',
    reading: extra.reading || '',
    level: 0,
    nextReview: Date.now() + SRS_INTERVALS[0],
    interval: SRS_INTERVALS[0],
    correctStreak: 0,
    totalReviews: 0,
    totalCorrect: 0,
    lastReviewed: null,
  };
}

/**
 * Get all items that are due for review right now.
 */
export function getDueItems(srsItems) {
  const now = Date.now();
  return srsItems
    .filter(item => item.level < SRS_MAX_LEVEL && item.nextReview <= now)
    .sort((a, b) => a.nextReview - b.nextReview);
}

/**
 * Get count of items due for review.
 */
export function getDueCount(srsItems) {
  const now = Date.now();
  return srsItems.filter(item => item.level < SRS_MAX_LEVEL && item.nextReview <= now).length;
}

/**
 * Process a review answer. Returns updated item.
 * @param {Object} item - The SRS item
 * @param {'again'|'good'|'easy'} quality - How well the user knew it
 */
export function reviewItem(item, quality) {
  const updated = {
    ...item,
    lastReviewed: Date.now(),
    totalReviews: item.totalReviews + 1,
  };

  if (quality === 'again') {
    // Drop back 2 levels, reset streak
    updated.level = Math.max(0, item.level - 2);
    updated.correctStreak = 0;
    updated.interval = SRS_INTERVALS[updated.level];
  } else if (quality === 'good') {
    // Advance 1 level
    updated.level = Math.min(SRS_MAX_LEVEL, item.level + 1);
    updated.correctStreak = item.correctStreak + 1;
    updated.totalCorrect = item.totalCorrect + 1;
    updated.interval = SRS_INTERVALS[Math.min(updated.level, SRS_INTERVALS.length - 1)];
  } else if (quality === 'easy') {
    // Advance 2 levels
    updated.level = Math.min(SRS_MAX_LEVEL, item.level + 2);
    updated.correctStreak = item.correctStreak + 1;
    updated.totalCorrect = item.totalCorrect + 1;
    updated.interval = SRS_INTERVALS[Math.min(updated.level, SRS_INTERVALS.length - 1)];
  }

  // Schedule next review
  if (updated.level < SRS_MAX_LEVEL) {
    updated.nextReview = Date.now() + updated.interval;
  } else {
    updated.nextReview = Infinity; // Burned — no more reviews
  }

  return updated;
}

/**
 * Get the human-readable name for an SRS level.
 */
export function getSRSLevelName(level) {
  return SRS_LEVEL_NAMES[Math.min(level, SRS_LEVEL_NAMES.length - 1)];
}

/**
 * Get the color for an SRS level.
 */
export function getSRSLevelColor(level) {
  return SRS_LEVEL_COLORS[Math.min(level, SRS_LEVEL_COLORS.length - 1)];
}

/**
 * Get aggregate SRS statistics.
 */
export function getSRSStats(srsItems) {
  const now = Date.now();
  const stats = {
    total: srsItems.length,
    due: 0,
    burned: 0,
    apprentice: 0,
    guru: 0,
    master: 0,
    enlightened: 0,
    levels: new Array(8).fill(0),
  };

  srsItems.forEach(item => {
    stats.levels[Math.min(item.level, 7)]++;

    if (item.level >= SRS_MAX_LEVEL) {
      stats.burned++;
    } else if (item.nextReview <= now) {
      stats.due++;
    }

    // Category buckets
    if (item.level <= 2) stats.apprentice++;
    else if (item.level <= 4) stats.guru++;
    else if (item.level === 5) stats.master++;
    else if (item.level === 6) stats.enlightened++;
  });

  return stats;
}

/**
 * Format an interval duration into human-readable text.
 */
export function formatInterval(ms) {
  const hours = Math.floor(ms / (60 * 60 * 1000));
  const days = Math.floor(ms / (24 * 60 * 60 * 1000));

  if (days >= 1) return `${days}d`;
  return `${hours}h`;
}

/**
 * Get time until next review as human-readable string.
 */
export function getTimeUntilReview(nextReview) {
  const diff = nextReview - Date.now();
  if (diff <= 0) return 'Now';

  const minutes = Math.floor(diff / (60 * 1000));
  const hours = Math.floor(diff / (60 * 60 * 1000));
  const days = Math.floor(diff / (24 * 60 * 60 * 1000));

  if (days > 0) return `${days}d ${hours % 24}h`;
  if (hours > 0) return `${hours}h ${minutes % 60}m`;
  return `${minutes}m`;
}
