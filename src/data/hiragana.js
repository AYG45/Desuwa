// Complete Hiragana character set
// Each entry: { char, romaji, row, type }

export const hiraganaBasic = [
  // Vowels
  { char: 'あ', romaji: 'a', row: 'vowel' },
  { char: 'い', romaji: 'i', row: 'vowel' },
  { char: 'う', romaji: 'u', row: 'vowel' },
  { char: 'え', romaji: 'e', row: 'vowel' },
  { char: 'お', romaji: 'o', row: 'vowel' },

  // K-row
  { char: 'か', romaji: 'ka', row: 'k' },
  { char: 'き', romaji: 'ki', row: 'k' },
  { char: 'く', romaji: 'ku', row: 'k' },
  { char: 'け', romaji: 'ke', row: 'k' },
  { char: 'こ', romaji: 'ko', row: 'k' },

  // S-row
  { char: 'さ', romaji: 'sa', row: 's' },
  { char: 'し', romaji: 'shi', row: 's' },
  { char: 'す', romaji: 'su', row: 's' },
  { char: 'せ', romaji: 'se', row: 's' },
  { char: 'そ', romaji: 'so', row: 's' },

  // T-row
  { char: 'た', romaji: 'ta', row: 't' },
  { char: 'ち', romaji: 'chi', row: 't' },
  { char: 'つ', romaji: 'tsu', row: 't' },
  { char: 'て', romaji: 'te', row: 't' },
  { char: 'と', romaji: 'to', row: 't' },

  // N-row
  { char: 'な', romaji: 'na', row: 'n' },
  { char: 'に', romaji: 'ni', row: 'n' },
  { char: 'ぬ', romaji: 'nu', row: 'n' },
  { char: 'ね', romaji: 'ne', row: 'n' },
  { char: 'の', romaji: 'no', row: 'n' },

  // H-row
  { char: 'は', romaji: 'ha', row: 'h' },
  { char: 'ひ', romaji: 'hi', row: 'h' },
  { char: 'ふ', romaji: 'fu', row: 'h' },
  { char: 'へ', romaji: 'he', row: 'h' },
  { char: 'ほ', romaji: 'ho', row: 'h' },

  // M-row
  { char: 'ま', romaji: 'ma', row: 'm' },
  { char: 'み', romaji: 'mi', row: 'm' },
  { char: 'む', romaji: 'mu', row: 'm' },
  { char: 'め', romaji: 'me', row: 'm' },
  { char: 'も', romaji: 'mo', row: 'm' },

  // Y-row
  { char: 'や', romaji: 'ya', row: 'y' },
  { char: 'ゆ', romaji: 'yu', row: 'y' },
  { char: 'よ', romaji: 'yo', row: 'y' },

  // R-row
  { char: 'ら', romaji: 'ra', row: 'r' },
  { char: 'り', romaji: 'ri', row: 'r' },
  { char: 'る', romaji: 'ru', row: 'r' },
  { char: 'れ', romaji: 're', row: 'r' },
  { char: 'ろ', romaji: 'ro', row: 'r' },

  // W-row
  { char: 'わ', romaji: 'wa', row: 'w' },
  { char: 'を', romaji: 'wo', row: 'w' },

  // N
  { char: 'ん', romaji: 'n', row: 'special' },
];

export const hiraganaDakuten = [
  // G-row
  { char: 'が', romaji: 'ga', row: 'g' },
  { char: 'ぎ', romaji: 'gi', row: 'g' },
  { char: 'ぐ', romaji: 'gu', row: 'g' },
  { char: 'げ', romaji: 'ge', row: 'g' },
  { char: 'ご', romaji: 'go', row: 'g' },

  // Z-row
  { char: 'ざ', romaji: 'za', row: 'z' },
  { char: 'じ', romaji: 'ji', row: 'z' },
  { char: 'ず', romaji: 'zu', row: 'z' },
  { char: 'ぜ', romaji: 'ze', row: 'z' },
  { char: 'ぞ', romaji: 'zo', row: 'z' },

  // D-row
  { char: 'だ', romaji: 'da', row: 'd' },
  { char: 'ぢ', romaji: 'ji', row: 'd' },
  { char: 'づ', romaji: 'zu', row: 'd' },
  { char: 'で', romaji: 'de', row: 'd' },
  { char: 'ど', romaji: 'do', row: 'd' },

  // B-row
  { char: 'ば', romaji: 'ba', row: 'b' },
  { char: 'び', romaji: 'bi', row: 'b' },
  { char: 'ぶ', romaji: 'bu', row: 'b' },
  { char: 'べ', romaji: 'be', row: 'b' },
  { char: 'ぼ', romaji: 'bo', row: 'b' },

  // P-row
  { char: 'ぱ', romaji: 'pa', row: 'p' },
  { char: 'ぴ', romaji: 'pi', row: 'p' },
  { char: 'ぷ', romaji: 'pu', row: 'p' },
  { char: 'ぺ', romaji: 'pe', row: 'p' },
  { char: 'ぽ', romaji: 'po', row: 'p' },
];

export const hiraganaCombo = [
  // K-row (kya, kyu, kyo)
  { char: 'きゃ', romaji: 'kya', row: 'combo_k' },
  { char: 'きゅ', romaji: 'kyu', row: 'combo_k' },
  { char: 'きょ', romaji: 'kyo', row: 'combo_k' },
  // S-row (sha, shu, sho)
  { char: 'しゃ', romaji: 'sha', row: 'combo_s' },
  { char: 'しゅ', romaji: 'shu', row: 'combo_s' },
  { char: 'しょ', romaji: 'sho', row: 'combo_s' },
  // T-row (cha, chu, cho)
  { char: 'ちゃ', romaji: 'cha', row: 'combo_t' },
  { char: 'ちゅ', romaji: 'chu', row: 'combo_t' },
  { char: 'ちょ', romaji: 'cho', row: 'combo_t' },
  // N-row (nya, nyu, nyo)
  { char: 'にゃ', romaji: 'nya', row: 'combo_n' },
  { char: 'にゅ', romaji: 'nyu', row: 'combo_n' },
  { char: 'にょ', romaji: 'nyo', row: 'combo_n' },
  // H-row (hya, hyu, hyo)
  { char: 'ひゃ', romaji: 'hya', row: 'combo_h' },
  { char: 'ひゅ', romaji: 'hyu', row: 'combo_h' },
  { char: 'ひょ', romaji: 'hyo', row: 'combo_h' },
  // M-row (mya, myu, myo)
  { char: 'みゃ', romaji: 'mya', row: 'combo_m' },
  { char: 'みゅ', romaji: 'myu', row: 'combo_m' },
  { char: 'みょ', romaji: 'myo', row: 'combo_m' },
  // R-row (rya, ryu, ryo)
  { char: 'りゃ', romaji: 'rya', row: 'combo_r' },
  { char: 'りゅ', romaji: 'ryu', row: 'combo_r' },
  { char: 'りょ', romaji: 'ryo', row: 'combo_r' },
  // G-row (gya, gyu, gyo)
  { char: 'ぎゃ', romaji: 'gya', row: 'combo_g' },
  { char: 'ぎゅ', romaji: 'gyu', row: 'combo_g' },
  { char: 'ぎょ', romaji: 'gyo', row: 'combo_g' },
  // Z-row (ja, ju, jo)
  { char: 'じゃ', romaji: 'ja', row: 'combo_z' },
  { char: 'じゅ', romaji: 'ju', row: 'combo_z' },
  { char: 'じょ', romaji: 'jo', row: 'combo_z' },
  // B-row (bya, byu, byo)
  { char: 'びゃ', romaji: 'bya', row: 'combo_b' },
  { char: 'びゅ', romaji: 'byu', row: 'combo_b' },
  { char: 'びょ', romaji: 'byo', row: 'combo_b' },
  // P-row (pya, pyu, pyo)
  { char: 'ぴゃ', romaji: 'pya', row: 'combo_p' },
  { char: 'ぴゅ', romaji: 'pyu', row: 'combo_p' },
  { char: 'ぴょ', romaji: 'pyo', row: 'combo_p' },
];

export const hiraganaAll = [...hiraganaBasic, ...hiraganaDakuten, ...hiraganaCombo];

export const hiraganaRows = {
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
