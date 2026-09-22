// Complete Katakana character set
export const katakanaBasic = [
  // Vowels
  { char: 'ア', romaji: 'a', row: 'vowel' },
  { char: 'イ', romaji: 'i', row: 'vowel' },
  { char: 'ウ', romaji: 'u', row: 'vowel' },
  { char: 'エ', romaji: 'e', row: 'vowel' },
  { char: 'オ', romaji: 'o', row: 'vowel' },

  // K-row
  { char: 'カ', romaji: 'ka', row: 'k' },
  { char: 'キ', romaji: 'ki', row: 'k' },
  { char: 'ク', romaji: 'ku', row: 'k' },
  { char: 'ケ', romaji: 'ke', row: 'k' },
  { char: 'コ', romaji: 'ko', row: 'k' },

  // S-row
  { char: 'サ', romaji: 'sa', row: 's' },
  { char: 'シ', romaji: 'shi', row: 's' },
  { char: 'ス', romaji: 'su', row: 's' },
  { char: 'セ', romaji: 'se', row: 's' },
  { char: 'ソ', romaji: 'so', row: 's' },

  // T-row
  { char: 'タ', romaji: 'ta', row: 't' },
  { char: 'チ', romaji: 'chi', row: 't' },
  { char: 'ツ', romaji: 'tsu', row: 't' },
  { char: 'テ', romaji: 'te', row: 't' },
  { char: 'ト', romaji: 'to', row: 't' },

  // N-row
  { char: 'ナ', romaji: 'na', row: 'n' },
  { char: 'ニ', romaji: 'ni', row: 'n' },
  { char: 'ヌ', romaji: 'nu', row: 'n' },
  { char: 'ネ', romaji: 'ne', row: 'n' },
  { char: 'ノ', romaji: 'no', row: 'n' },

  // H-row
  { char: 'ハ', romaji: 'ha', row: 'h' },
  { char: 'ヒ', romaji: 'hi', row: 'h' },
  { char: 'フ', romaji: 'fu', row: 'h' },
  { char: 'ヘ', romaji: 'he', row: 'h' },
  { char: 'ホ', romaji: 'ho', row: 'h' },

  // M-row
  { char: 'マ', romaji: 'ma', row: 'm' },
  { char: 'ミ', romaji: 'mi', row: 'm' },
  { char: 'ム', romaji: 'mu', row: 'm' },
  { char: 'メ', romaji: 'me', row: 'm' },
  { char: 'モ', romaji: 'mo', row: 'm' },

  // Y-row
  { char: 'ヤ', romaji: 'ya', row: 'y' },
  { char: 'ユ', romaji: 'yu', row: 'y' },
  { char: 'ヨ', romaji: 'yo', row: 'y' },

  // R-row
  { char: 'ラ', romaji: 'ra', row: 'r' },
  { char: 'リ', romaji: 'ri', row: 'r' },
  { char: 'ル', romaji: 'ru', row: 'r' },
  { char: 'レ', romaji: 're', row: 'r' },
  { char: 'ロ', romaji: 'ro', row: 'r' },

  // W-row
  { char: 'ワ', romaji: 'wa', row: 'w' },
  { char: 'ヲ', romaji: 'wo', row: 'w' },

  // N
  { char: 'ン', romaji: 'n', row: 'special' },
];

export const katakanaDakuten = [
  // G-row
  { char: 'ガ', romaji: 'ga', row: 'g' },
  { char: 'ギ', romaji: 'gi', row: 'g' },
  { char: 'グ', romaji: 'gu', row: 'g' },
  { char: 'ゲ', romaji: 'ge', row: 'g' },
  { char: 'ゴ', romaji: 'go', row: 'g' },

  // Z-row
  { char: 'ザ', romaji: 'za', row: 'z' },
  { char: 'ジ', romaji: 'ji', row: 'z' },
  { char: 'ズ', romaji: 'zu', row: 'z' },
  { char: 'ゼ', romaji: 'ze', row: 'z' },
  { char: 'ゾ', romaji: 'zo', row: 'z' },

  // D-row
  { char: 'ダ', romaji: 'da', row: 'd' },
  { char: 'ヂ', romaji: 'ji', row: 'd' },
  { char: 'ヅ', romaji: 'zu', row: 'd' },
  { char: 'デ', romaji: 'de', row: 'd' },
  { char: 'ド', romaji: 'do', row: 'd' },

  // B-row
  { char: 'バ', romaji: 'ba', row: 'b' },
  { char: 'ビ', romaji: 'bi', row: 'b' },
  { char: 'ブ', romaji: 'bu', row: 'b' },
  { char: 'ベ', romaji: 'be', row: 'b' },
  { char: 'ボ', romaji: 'bo', row: 'b' },

  // P-row
  { char: 'パ', romaji: 'pa', row: 'p' },
  { char: 'ピ', romaji: 'pi', row: 'p' },
  { char: 'プ', romaji: 'pu', row: 'p' },
  { char: 'ペ', romaji: 'pe', row: 'p' },
  { char: 'ポ', romaji: 'po', row: 'p' },
];

export const katakanaCombo = [
  // K-row (kya, kyu, kyo)
  { char: 'キャ', romaji: 'kya', row: 'combo_k' },
  { char: 'キュ', romaji: 'kyu', row: 'combo_k' },
  { char: 'キョ', romaji: 'kyo', row: 'combo_k' },
  // S-row (sha, shu, sho)
  { char: 'シャ', romaji: 'sha', row: 'combo_s' },
  { char: 'シュ', romaji: 'shu', row: 'combo_s' },
  { char: 'ショ', romaji: 'sho', row: 'combo_s' },
  // T-row (cha, chu, cho)
  { char: 'チャ', romaji: 'cha', row: 'combo_t' },
  { char: 'チュ', romaji: 'chu', row: 'combo_t' },
  { char: 'チョ', romaji: 'cho', row: 'combo_t' },
  // N-row (nya, nyu, nyo)
  { char: 'ニャ', romaji: 'nya', row: 'combo_n' },
  { char: 'ニュ', romaji: 'nyu', row: 'combo_n' },
  { char: 'ニョ', romaji: 'nyo', row: 'combo_n' },
  // H-row (hya, hyu, hyo)
  { char: 'ヒャ', romaji: 'hya', row: 'combo_h' },
  { char: 'ヒュ', romaji: 'hyu', row: 'combo_h' },
  { char: 'ヒョ', romaji: 'hyo', row: 'combo_h' },
  // M-row (mya, myu, myo)
  { char: 'ミャ', romaji: 'mya', row: 'combo_m' },
  { char: 'ミュ', romaji: 'myu', row: 'combo_m' },
  { char: 'ミョ', romaji: 'myo', row: 'combo_m' },
  // R-row (rya, ryu, ryo)
  { char: 'リャ', romaji: 'rya', row: 'combo_r' },
  { char: 'リュ', romaji: 'ryu', row: 'combo_r' },
  { char: 'リョ', romaji: 'ryo', row: 'combo_r' },
  // G-row (gya, gyu, gyo)
  { char: 'ギャ', romaji: 'gya', row: 'combo_g' },
  { char: 'ギュ', romaji: 'gyu', row: 'combo_g' },
  { char: 'ギョ', romaji: 'gyo', row: 'combo_g' },
  // Z-row (ja, ju, jo)
  { char: 'ジャ', romaji: 'ja', row: 'combo_z' },
  { char: 'ジュ', romaji: 'ju', row: 'combo_z' },
  { char: 'ジョ', romaji: 'jo', row: 'combo_z' },
  // B-row (bya, byu, byo)
  { char: 'ビャ', romaji: 'bya', row: 'combo_b' },
  { char: 'ビュ', romaji: 'byu', row: 'combo_b' },
  { char: 'ビョ', romaji: 'byo', row: 'combo_b' },
  // P-row (pya, pyu, pyo)
  { char: 'ピャ', romaji: 'pya', row: 'combo_p' },
  { char: 'ピュ', romaji: 'pyu', row: 'combo_p' },
  { char: 'ピョ', romaji: 'pyo', row: 'combo_p' },
];

export const katakanaAll = [...katakanaBasic, ...katakanaDakuten, ...katakanaCombo];

export const katakanaRows = {
  vowel: { label: 'Vowels', color: '#e94560' },
  k: { label: 'K-row', color: '#7c5cbf' },
  s: { label: 'S-row', color: '#3498db' },
  t: { label: 'T-row', color: '#2ed573' },
  n: { label: 'N-row', color: '#ffa502' },
  h: { label: 'H-row', color: '#e94560' },
  m: { label: 'M-row', color: '#7c5cbf' },
  y: { label: 'Y-row', color: '#3498db' },
  r: { label: 'R-row', color: '#2ed573' },
  w: { label: 'W-row', color: '#ffa502' },
  special: { label: 'Special', color: '#e94560' },
  g: { label: 'G-row', color: '#ff6b81' },
  z: { label: 'Z-row', color: '#a29bfe' },
  d: { label: 'D-row', color: '#74b9ff' },
  b: { label: 'B-row', color: '#55efc4' },
  p: { label: 'P-row', color: '#fdcb6e' },
  combo_k: { label: 'Kya-row', color: '#7c5cbf' },
  combo_s: { label: 'Sha-row', color: '#3498db' },
  combo_t: { label: 'Cha-row', color: '#2ed573' },
  combo_n: { label: 'Nya-row', color: '#ffa502' },
  combo_h: { label: 'Hya-row', color: '#e94560' },
  combo_m: { label: 'Mya-row', color: '#7c5cbf' },
  combo_r: { label: 'Rya-row', color: '#2ed573' },
  combo_g: { label: 'Gya-row', color: '#ff6b81' },
  combo_z: { label: 'Ja-row', color: '#a29bfe' },
  combo_b: { label: 'Bya-row', color: '#55efc4' },
  combo_p: { label: 'Pya-row', color: '#fdcb6e' },
};
