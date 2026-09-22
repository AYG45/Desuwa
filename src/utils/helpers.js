// Utility functions for the app

// Get/set data from localStorage
export const getStorageData = (key, defaultValue) => {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultValue;
  } catch {
    return defaultValue;
  }
};

export const setStorageData = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.warn('localStorage not available:', e);
  }
};

// Shuffle an array (Fisher-Yates)
export const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Get a random subset of an array
export const getRandomSubset = (array, count) => {
  return shuffleArray(array).slice(0, count);
};

// Calculate streak from dates array
export const calculateStreak = (dates) => {
  if (!dates || dates.length === 0) return 0;

  const sorted = [...dates].sort((a, b) => new Date(b) - new Date(a));
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let streak = 0;
  let currentDate = today;

  for (const dateStr of sorted) {
    const date = new Date(dateStr);
    date.setHours(0, 0, 0, 0);

    const diffDays = Math.floor((currentDate - date) / (1000 * 60 * 60 * 24));

    if (diffDays <= 1) {
      streak++;
      currentDate = date;
    } else {
      break;
    }
  }

  return streak;
};

// Format a number with commas
export const formatNumber = (num) => {
  return num.toLocaleString();
};

// Calculate XP level from total XP
export const getLevel = (xp) => {
  // Each level requires increasingly more XP
  // Level 1: 0 XP, Level 2: 100 XP, Level 3: 250 XP, etc.
  const levels = [0, 100, 250, 500, 800, 1200, 1700, 2300, 3000, 4000, 5000, 6500, 8000, 10000];
  let level = 1;
  for (let i = 0; i < levels.length; i++) {
    if (xp >= levels[i]) {
      level = i + 1;
    } else {
      break;
    }
  }
  const currentLevelXP = levels[level - 1] || 0;
  const nextLevelXP = levels[level] || levels[levels.length - 1] + 2000;
  const progress = ((xp - currentLevelXP) / (nextLevelXP - currentLevelXP)) * 100;

  return { level, progress: Math.min(progress, 100), currentXP: xp, nextLevelXP };
};

// Get today's date string
export const getTodayStr = () => {
  return new Date().toISOString().split('T')[0];
};

// Default user progress
export const defaultProgress = {
  xp: 0,
  lessonsCompleted: 0,
  quizzesTaken: 0,
  correctAnswers: 0,
  totalAnswers: 0,
  activeDates: [],
  learnedHiragana: [],
  learnedKatakana: [],
  learnedKanji: [],
  bookmarkedVocab: [],
  achievements: [],
};

/* Appended logic to helpers.js */
const romajiMap = {
  'あ':'a', 'い':'i', 'う':'u', 'え':'e', 'お':'o',
  'か':'ka', 'き':'ki', 'く':'ku', 'け':'ke', 'こ':'ko',
  'さ':'sa', 'し':'shi', 'す':'su', 'せ':'se', 'そ':'so',
  'た':'ta', 'ち':'chi', 'つ':'tsu', 'て':'te', 'と':'to',
  'な':'na', 'に':'ni', 'ぬ':'nu', 'ね':'ne', 'の':'no',
  'は':'ha', 'ひ':'hi', 'ふ':'fu', 'へ':'he', 'ほ':'ho',
  'ま':'ma', 'み':'mi', 'む':'mu', 'め':'me', 'も':'mo',
  'や':'ya', 'ゆ':'yu', 'よ':'yo',
  'ら':'ra', 'り':'ri', 'る':'ru', 'れ':'re', 'ろ':'ro',
  'わ':'wa', 'を':'wo', 'ん':'n',
  'が':'ga', 'ぎ':'gi', 'ぐ':'gu', 'げ':'ge', 'ご':'go',
  'ざ':'za', 'じ':'ji', 'ず':'zu', 'ぜ':'ze', 'ぞ':'zo',
  'だ':'da', 'ぢ':'ji', 'づ':'zu', 'で':'de', 'ど':'do',
  'ば':'ba', 'び':'bi', 'ぶ':'bu', 'べ':'be', 'ぼ':'bo',
  'ぱ':'pa', 'ぴ':'pi', 'ぷ':'pu', 'ぺ':'pe', 'ぽ':'po',
  'きゃ':'kya', 'きゅ':'kyu', 'きょ':'kyo',
  'しゃ':'sha', 'しゅ':'shu', 'しょ':'sho',
  'ちゃ':'cha', 'ちゅ':'chu', 'ちょ':'cho',
  'にゃ':'nya', 'にゅ':'nyu', 'にょ':'nyo',
  'ひゃ':'hya', 'ひゅ':'hyu', 'ひょ':'hyo',
  'みゃ':'mya', 'みゅ':'myu', 'みょ':'myo',
  'りゃ':'rya', 'りゅ':'ryu', 'りょ':'ryo',
  'ぎゃ':'gya', 'ぎゅ':'gyu', 'ぎょ':'gyo',
  'じゃ':'ja', 'じゅ':'ju', 'じょ':'jo',
  'びゃ':'bya', 'びゅ':'byu', 'びょ':'byo',
  'ぴゃ':'pya', 'ぴゅ':'pyu', 'ぴょ':'pyo',
  // Katakana
  'ア':'a', 'イ':'i', 'ウ':'u', 'エ':'e', 'オ':'o',
  'カ':'ka', 'キ':'ki', 'ク':'ku', 'ケ':'ke', 'コ':'ko',
  'サ':'sa', 'シ':'shi', 'ス':'su', 'セ':'se', 'ソ':'so',
  'タ':'ta', 'チ':'chi', 'ツ':'tsu', 'テ':'te', 'ト':'to',
  'ナ':'na', 'ニ':'ni', 'ヌ':'nu', 'ネ':'ne', 'ノ':'no',
  'ハ':'ha', 'ヒ':'hi', 'フ':'fu', 'ヘ':'he', 'ホ':'ho',
  'マ':'ma', 'ミ':'mi', 'ム':'mu', 'メ':'me', 'モ':'mo',
  'ヤ':'ya', 'ユ':'yu', 'ヨ':'yo',
  'ラ':'ra', 'リ':'ri', 'ル':'ru', 'レ':'re', 'ロ':'ro',
  'ワ':'wa', 'ヲ':'wo', 'ン':'n',
  'ガ':'ga', 'ギ':'gi', 'グ':'gu', 'ゲ':'ge', 'ゴ':'go',
  'ザ':'za', 'ジ':'ji', 'ズ':'zu', 'ゼ':'ze', 'ゾ':'zo',
  'ダ':'da', 'ヂ':'ji', 'ヅ':'zu', 'デ':'de', 'ド':'do',
  'バ':'ba', 'ビ':'bi', 'ブ':'bu', 'ベ':'be', 'ボ':'bo',
  'パ':'pa', 'ピ':'pi', 'プ':'pu', 'ペ':'pe', 'ポ':'po',
  'キャ':'kya', 'キュ':'kyu', 'キョ':'kyo',
  'シャ':'sha', 'シュ':'shu', 'ショ':'sho',
  'チャ':'cha', 'チュ':'chu', 'チョ':'cho',
  'ニャ':'nya', 'ニュ':'nyu', 'ニョ':'nyo',
  'ヒャ':'hya', 'ヒュ':'hyu', 'ヒョ':'hyo',
  'ミャ':'mya', 'ミュ':'myu', 'ミョ':'myo',
  'リャ':'rya', 'リュ':'ryu', 'リョ':'ryo',
  'ギャ':'gya', 'ギュ':'gyu', 'ギョ':'gyo',
  'ジャ':'ja', 'ジュ':'ju', 'ジョ':'jo',
  'ビャ':'bya', 'ビュ':'byu', 'ビョ':'byo',
  'ピャ':'pya', 'ピュ':'pyu', 'ピョ':'pyo',
};

export const kanaToRomaji = (kanaStr) => {
  if (!kanaStr) return '';
  let result = '';
  let i = 0;
  while (i < kanaStr.length) {
    if (i < kanaStr.length - 1) {
      const combo = kanaStr.substring(i, i + 2);
      if (romajiMap[combo]) {
        result += romajiMap[combo];
        i += 2;
        continue;
      }
    }
    if (kanaStr[i] === 'っ' || kanaStr[i] === 'ッ') {
      if (i < kanaStr.length - 1) {
        const nextChar = kanaStr[i + 1];
        let nextRomaji = romajiMap[nextChar];
        if (!nextRomaji && i < kanaStr.length - 2) {
           nextRomaji = romajiMap[kanaStr.substring(i+1, i+3)];
        }
        if (nextRomaji) {
          result += nextRomaji[0];
          i++;
          continue;
        }
      }
    }
    if (kanaStr[i] === 'ー') {
      result += '-';
      i++;
      continue;
    }
    
    const char = kanaStr[i];
    result += romajiMap[char] || char;
    i++;
  }
  return result;
};

export const formatJapanese = (wordObj, mode = 'kanji') => {
  if (!wordObj) return '';
  const { word, reading } = wordObj;
  
  const isKanaOnly = !word || word === reading;

  if (mode === 'kanji') {
    return isKanaOnly ? reading : word;
  }
  
  if (mode === 'kana') {
    return reading || word;
  }
  
  if (mode === 'romaji') {
    return kanaToRomaji(reading || word);
  }
  
  return word || reading;
};
