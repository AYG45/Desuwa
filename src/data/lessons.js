// Structured lesson data for guided learning
// Each lesson teaches a small group of characters with mnemonics, tips, and example words

export const lessonTracks = {
  hiragana: {
    title: 'Hiragana',
    icon: 'あ',
    color: '#e94560',
    description: 'The basic Japanese writing system — used for native Japanese words',
    lessons: [
      {
        id: 'hiragana-1',
        title: 'The Vowels',
        subtitle: 'Foundation of all Japanese sounds — every syllable ends in a vowel',
        chars: [
          { char: 'あ', romaji: 'a', mnemonic: 'An Antenna on a rooftop — "Aah, what a view!"', tip: 'Like "a" in "father"', word: 'あめ', wordReading: 'ame', wordMeaning: 'rain' },
          { char: 'い', romaji: 'i', mnemonic: 'Two Eels swimming upright side by side', tip: 'Like "ee" in "feet"', word: 'いぬ', wordReading: 'inu', wordMeaning: 'dog' },
          { char: 'う', romaji: 'u', mnemonic: 'A fishhook pulling Up from the water', tip: 'Like "oo" in "food" but shorter, don\'t round your lips', word: 'うみ', wordReading: 'umi', wordMeaning: 'sea' },
          { char: 'え', romaji: 'e', mnemonic: 'An Energetic dancer leaping through the air', tip: 'Like "e" in "pet"', word: 'えき', wordReading: 'eki', wordMeaning: 'station' },
          { char: 'お', romaji: 'o', mnemonic: 'A golf ball On a tee — "Oh, nice shot!"', tip: 'Like "o" in "go"', word: 'おちゃ', wordReading: 'ocha', wordMeaning: 'tea' },
        ],
      },
      {
        id: 'hiragana-2',
        title: 'K-Row',
        subtitle: 'The "k" consonant combined with each vowel',
        chars: [
          { char: 'か', romaji: 'ka', mnemonic: 'A Kite cutting through the sky', tip: '"ka" as in "car"', word: 'かわ', wordReading: 'kawa', wordMeaning: 'river' },
          { char: 'き', romaji: 'ki', mnemonic: 'A Key with a fancy handle', tip: '"ki" as in "key"', word: 'きく', wordReading: 'kiku', wordMeaning: 'to listen' },
          { char: 'く', romaji: 'ku', mnemonic: 'A Cuckoo bird\'s open beak', tip: '"ku" as in "cool"', word: 'くち', wordReading: 'kuchi', wordMeaning: 'mouth' },
          { char: 'け', romaji: 'ke', mnemonic: 'A Keg lying on its side', tip: '"ke" as in "kept"', word: 'けさ', wordReading: 'kesa', wordMeaning: 'this morning' },
          { char: 'こ', romaji: 'ko', mnemonic: 'Two Coins stacked on each other', tip: '"ko" as in "coat"', word: 'ここ', wordReading: 'koko', wordMeaning: 'here' },
        ],
      },
      {
        id: 'hiragana-3',
        title: 'S-Row',
        subtitle: 'The "s" consonant — watch out for し (shi)!',
        chars: [
          { char: 'さ', romaji: 'sa', mnemonic: 'A Sardine with a big fin on top', tip: '"sa" as in "saw"', word: 'さくら', wordReading: 'sakura', wordMeaning: 'cherry blossom' },
          { char: 'し', romaji: 'shi', mnemonic: 'A fishhook — "She caught a fish!"', tip: 'NOT "si" — it\'s "shi" like "she"', word: 'しろ', wordReading: 'shiro', wordMeaning: 'white' },
          { char: 'す', romaji: 'su', mnemonic: 'A Swing set hanging down', tip: '"su" as in "suit"', word: 'すし', wordReading: 'sushi', wordMeaning: 'sushi' },
          { char: 'せ', romaji: 'se', mnemonic: 'A mouth about to Say something', tip: '"se" as in "set"', word: 'せんせい', wordReading: 'sensei', wordMeaning: 'teacher' },
          { char: 'そ', romaji: 'so', mnemonic: 'A zigzag Sewing stitch', tip: '"so" as in "soap"', word: 'そと', wordReading: 'soto', wordMeaning: 'outside' },
        ],
      },
      {
        id: 'hiragana-4',
        title: 'T-Row',
        subtitle: 'The "t" consonant — ち (chi) and つ (tsu) are special!',
        chars: [
          { char: 'た', romaji: 'ta', mnemonic: 'The letters "t" and "a" combined together', tip: '"ta" as in "tall"', word: 'たべる', wordReading: 'taberu', wordMeaning: 'to eat' },
          { char: 'ち', romaji: 'chi', mnemonic: 'A Cheerleader doing a split', tip: 'NOT "ti" — it\'s "chi" like "cheese"', word: 'ちいさい', wordReading: 'chiisai', wordMeaning: 'small' },
          { char: 'つ', romaji: 'tsu', mnemonic: 'A Tsunami wave crashing', tip: 'Starts with "ts" — try saying "cats" and hold the "ts"', word: 'つき', wordReading: 'tsuki', wordMeaning: 'moon' },
          { char: 'て', romaji: 'te', mnemonic: 'A Telephone pole with a wire', tip: '"te" as in "ten"', word: 'てがみ', wordReading: 'tegami', wordMeaning: 'letter' },
          { char: 'と', romaji: 'to', mnemonic: 'A Tornado starting to spin', tip: '"to" as in "toe"', word: 'ともだち', wordReading: 'tomodachi', wordMeaning: 'friend' },
        ],
      },
      {
        id: 'hiragana-5',
        title: 'N-Row',
        subtitle: 'The "n" consonant with each vowel',
        chars: [
          { char: 'な', romaji: 'na', mnemonic: 'A Knot being tied in a rope', tip: '"na" as in "not"', word: 'なつ', wordReading: 'natsu', wordMeaning: 'summer' },
          { char: 'に', romaji: 'ni', mnemonic: 'A Knee bending — the two strokes look like legs', tip: '"ni" as in "knee"', word: 'にほん', wordReading: 'nihon', wordMeaning: 'Japan' },
          { char: 'ぬ', romaji: 'nu', mnemonic: 'Noodles tangled on chopsticks', tip: '"nu" as in "noodle"', word: 'いぬ', wordReading: 'inu', wordMeaning: 'dog' },
          { char: 'ね', romaji: 'ne', mnemonic: 'A cat Nesting and curled up — "neko!"', tip: '"ne" as in "net"', word: 'ねこ', wordReading: 'neko', wordMeaning: 'cat' },
          { char: 'の', romaji: 'no', mnemonic: 'A "No" sign — a circle with a line through it', tip: '"no" as in "note"', word: 'のむ', wordReading: 'nomu', wordMeaning: 'to drink' },
        ],
      },
      {
        id: 'hiragana-6',
        title: 'H-Row',
        subtitle: 'The "h" consonant — ふ (fu) is unique!',
        chars: [
          { char: 'は', romaji: 'ha', mnemonic: 'A person laughing "Ha ha!" with arms wide', tip: '"ha" as in "hot" — but as a particle, it\'s read "wa"!', word: 'はな', wordReading: 'hana', wordMeaning: 'flower' },
          { char: 'ひ', romaji: 'hi', mnemonic: 'A person smiling — "Hee hee!"', tip: '"hi" as in "heat"', word: 'ひと', wordReading: 'hito', wordMeaning: 'person' },
          { char: 'ふ', romaji: 'fu', mnemonic: 'Mount Fuji with snow on top', tip: 'Between "fu" and "hu" — blow air gently', word: 'ふゆ', wordReading: 'fuyu', wordMeaning: 'winter' },
          { char: 'へ', romaji: 'he', mnemonic: 'A Hill or mountain slope', tip: '"he" as in "help" — as a particle, read as "e"', word: 'へや', wordReading: 'heya', wordMeaning: 'room' },
          { char: 'ほ', romaji: 'ho', mnemonic: 'Santa\'s belt — "Ho ho ho!"', tip: '"ho" as in "hope"', word: 'ほん', wordReading: 'hon', wordMeaning: 'book' },
        ],
      },
      {
        id: 'hiragana-7',
        title: 'M-Row',
        subtitle: 'The "m" consonant with each vowel',
        chars: [
          { char: 'ま', romaji: 'ma', mnemonic: 'A Mama carrying a baby on her back', tip: '"ma" as in "mama"', word: 'まど', wordReading: 'mado', wordMeaning: 'window' },
          { char: 'み', romaji: 'mi', mnemonic: 'The lucky number 21 — "Me! I won!"', tip: '"mi" as in "me"', word: 'みず', wordReading: 'mizu', wordMeaning: 'water' },
          { char: 'む', romaji: 'mu', mnemonic: 'A cow Mooing — see the horns?', tip: '"mu" as in "mood"', word: 'むし', wordReading: 'mushi', wordMeaning: 'insect' },
          { char: 'め', romaji: 'me', mnemonic: 'An eye with eyelashes — "Me see!"', tip: '"me" as in "met"', word: 'め', wordReading: 'me', wordMeaning: 'eye' },
          { char: 'も', romaji: 'mo', mnemonic: 'A fishhook catching More fish', tip: '"mo" as in "more"', word: 'もの', wordReading: 'mono', wordMeaning: 'thing' },
        ],
      },
      {
        id: 'hiragana-8',
        title: 'Y-Row',
        subtitle: 'Only 3 characters — や, ゆ, よ',
        chars: [
          { char: 'や', romaji: 'ya', mnemonic: 'A Yak with curved horns', tip: '"ya" as in "yard"', word: 'やま', wordReading: 'yama', wordMeaning: 'mountain' },
          { char: 'ゆ', romaji: 'yu', mnemonic: 'A U-turn sign on the road', tip: '"yu" as in "you"', word: 'ゆき', wordReading: 'yuki', wordMeaning: 'snow' },
          { char: 'よ', romaji: 'yo', mnemonic: 'A Yo-yo dangling from a string', tip: '"yo" as in "yogurt"', word: 'よる', wordReading: 'yoru', wordMeaning: 'night' },
        ],
      },
      {
        id: 'hiragana-9',
        title: 'R-Row',
        subtitle: 'Japanese "r" is between English "r" and "l"',
        chars: [
          { char: 'ら', romaji: 'ra', mnemonic: 'A Rabbit sitting down with floppy ears', tip: 'Tap your tongue lightly on the roof of your mouth', word: 'らいねん', wordReading: 'rainen', wordMeaning: 'next year' },
          { char: 'り', romaji: 'ri', mnemonic: 'Two Reeds growing by a river', tip: 'Quick flick of the tongue, like a soft "d"', word: 'りんご', wordReading: 'ringo', wordMeaning: 'apple' },
          { char: 'る', romaji: 'ru', mnemonic: 'A loop or Lasso — a "ru"nning loop', tip: '"ru" — tongue taps once, doesn\'t roll', word: 'くるま', wordReading: 'kuruma', wordMeaning: 'car' },
          { char: 'れ', romaji: 're', mnemonic: 'A tail Reaching out behind someone', tip: '"re" as in "red" with a light tongue tap', word: 'れきし', wordReading: 'rekishi', wordMeaning: 'history' },
          { char: 'ろ', romaji: 'ro', mnemonic: 'The number 3 rotated — a Road ahead', tip: '"ro" as in "road" with the Japanese r-sound', word: 'ろく', wordReading: 'roku', wordMeaning: 'six' },
        ],
      },
      {
        id: 'hiragana-10',
        title: 'W-Row + N',
        subtitle: 'The final 3 characters — you\'re almost done!',
        chars: [
          { char: 'わ', romaji: 'wa', mnemonic: 'A Wave crashing in the Water', tip: '"wa" as in "want"', word: 'わたし', wordReading: 'watashi', wordMeaning: 'I / me' },
          { char: 'を', romaji: 'wo', mnemonic: 'A Whirlpool spinning in the ocean', tip: 'Sounds like "o" — used only as the object particle', word: 'を (particle)', wordReading: 'wo', wordMeaning: 'marks the object of a verb' },
          { char: 'ん', romaji: 'n', mnemonic: 'The letter "n" written in cursive', tip: 'The ONLY consonant that can stand alone — no vowel after it', word: 'にほん', wordReading: 'nihon', wordMeaning: 'Japan' },
        ],
      },
    ],
  },
  katakana: {
    title: 'Katakana',
    icon: 'ア',
    color: '#7c5cbf',
    description: 'Used for foreign words, loanwords, and emphasis — same sounds as hiragana',
    lessons: [
      {
        id: 'katakana-1',
        title: 'The Vowels',
        subtitle: 'Same 5 vowel sounds, angular shapes — used for foreign words',
        chars: [
          { char: 'ア', romaji: 'a', mnemonic: 'An Arrowhead pointing left', tip: 'Same sound as あ — "a" in "father"', word: 'アメリカ', wordReading: 'amerika', wordMeaning: 'America' },
          { char: 'イ', romaji: 'i', mnemonic: 'An eagle\'s beak — sharp and angular', tip: 'Same sound as い — "ee" in "feet"', word: 'イギリス', wordReading: 'igirisu', wordMeaning: 'England' },
          { char: 'ウ', romaji: 'u', mnemonic: 'An upside-down "U" shape — Uh oh!', tip: 'Same sound as う — "oo" in "food"', word: 'ウイスキー', wordReading: 'uisukii', wordMeaning: 'whiskey' },
          { char: 'エ', romaji: 'e', mnemonic: 'The letter "I" with an extra stroke — like a building Entrance', tip: 'Same sound as え — "e" in "pet"', word: 'エレベーター', wordReading: 'erebeetaa', wordMeaning: 'elevator' },
          { char: 'オ', romaji: 'o', mnemonic: 'A person doing an Opera pose with arms out', tip: 'Same sound as お — "o" in "go"', word: 'オレンジ', wordReading: 'orenji', wordMeaning: 'orange' },
        ],
      },
      {
        id: 'katakana-2',
        title: 'K-Row',
        subtitle: 'Angular versions of the hiragana K-sounds',
        chars: [
          { char: 'カ', romaji: 'ka', mnemonic: 'A sharp Katana blade', tip: 'Same as か — "ka" in "car"', word: 'カメラ', wordReading: 'kamera', wordMeaning: 'camera' },
          { char: 'キ', romaji: 'ki', mnemonic: 'A Key — more angular than き', tip: 'Same as き — "ki" in "key"', word: 'キロ', wordReading: 'kiro', wordMeaning: 'kilo' },
          { char: 'ク', romaji: 'ku', mnemonic: 'The corner of a box — a sharp angle', tip: 'Same as く — "ku" in "cool"', word: 'クラス', wordReading: 'kurasu', wordMeaning: 'class' },
          { char: 'ケ', romaji: 'ke', mnemonic: 'A crooked letter "K"', tip: 'Same as け — "ke" in "kept"', word: 'ケーキ', wordReading: 'keeki', wordMeaning: 'cake' },
          { char: 'コ', romaji: 'ko', mnemonic: 'A Corner — two right angles', tip: 'Same as こ — "ko" in "coat"', word: 'コーヒー', wordReading: 'koohii', wordMeaning: 'coffee' },
        ],
      },
      {
        id: 'katakana-3',
        title: 'S-Row',
        subtitle: 'Watch for シ (shi) vs ツ (tsu) — commonly confused!',
        chars: [
          { char: 'サ', romaji: 'sa', mnemonic: 'A Saddle sitting on a horse', tip: 'Same as さ — "sa" in "saw"', word: 'サラダ', wordReading: 'sarada', wordMeaning: 'salad' },
          { char: 'シ', romaji: 'shi', mnemonic: 'A Smiley face :) — strokes go left-to-right ← the smile is SIDEWAYS', tip: 'シ smiles sideways (horizontal dots). ツ cries down (vertical dots)', word: 'シャツ', wordReading: 'shatsu', wordMeaning: 'shirt' },
          { char: 'ス', romaji: 'su', mnemonic: 'A Ski slope going downhill', tip: 'Same as す — "su" in "suit"', word: 'スポーツ', wordReading: 'supootsu', wordMeaning: 'sports' },
          { char: 'セ', romaji: 'se', mnemonic: 'A Sail catching the wind', tip: 'Same as せ — "se" in "set"', word: 'セーター', wordReading: 'seetaa', wordMeaning: 'sweater' },
          { char: 'ソ', romaji: 'so', mnemonic: 'A Sewing needle with thread — two quick strokes', tip: 'ソ has diagonal strokes going different ways than ン', word: 'ソファ', wordReading: 'sofa', wordMeaning: 'sofa' },
        ],
      },
      {
        id: 'katakana-4',
        title: 'T-Row',
        subtitle: 'チ (chi) and ツ (tsu) — don\'t mix up ツ and シ!',
        chars: [
          { char: 'タ', romaji: 'ta', mnemonic: 'Looks like the kanji 夕 — evening', tip: 'Same as た — "ta" in "tall"', word: 'タクシー', wordReading: 'takushii', wordMeaning: 'taxi' },
          { char: 'チ', romaji: 'chi', mnemonic: 'A number 5 in a stylish font', tip: 'Same as ち — "chi" in "cheese"', word: 'チーズ', wordReading: 'chiizu', wordMeaning: 'cheese' },
          { char: 'ツ', romaji: 'tsu', mnemonic: 'A face with tears falling DOWN :"( — dots are VERTICAL', tip: 'ツ has vertical dots (tears fall down). シ has horizontal dots (a smile)', word: 'ツアー', wordReading: 'tsuaa', wordMeaning: 'tour' },
          { char: 'テ', romaji: 'te', mnemonic: 'A Telephone pole — simple T-shape', tip: 'Same as て — "te" in "ten"', word: 'テレビ', wordReading: 'terebi', wordMeaning: 'TV' },
          { char: 'ト', romaji: 'to', mnemonic: 'A Totem pole — tall and vertical', tip: 'Same as と — "to" in "toe"', word: 'トイレ', wordReading: 'toire', wordMeaning: 'toilet' },
        ],
      },
      {
        id: 'katakana-5',
        title: 'N-Row',
        subtitle: 'The "n" consonant in angular katakana form',
        chars: [
          { char: 'ナ', romaji: 'na', mnemonic: 'A cross shape — like a plus sign tilted', tip: 'Same as な — "na" in "not"', word: 'ナイフ', wordReading: 'naifu', wordMeaning: 'knife' },
          { char: 'ニ', romaji: 'ni', mnemonic: 'Two horizontal lines — the number 2 (二)', tip: 'Same as に — "ni" in "knee"', word: 'ニュース', wordReading: 'nyuusu', wordMeaning: 'news' },
          { char: 'ヌ', romaji: 'nu', mnemonic: 'Chopsticks with Noodles wrapped around them', tip: 'Same as ぬ — "nu" in "noodle"', word: 'メニュー', wordReading: 'menyuu', wordMeaning: 'menu' },
          { char: 'ネ', romaji: 'ne', mnemonic: 'A Net with a pole on the left', tip: 'Same as ね — "ne" in "net"', word: 'ネクタイ', wordReading: 'nekutai', wordMeaning: 'necktie' },
          { char: 'ノ', romaji: 'no', mnemonic: 'A long Nose — just one diagonal stroke', tip: 'Same as の — "no" in "note"', word: 'ノート', wordReading: 'nooto', wordMeaning: 'notebook' },
        ],
      },
      {
        id: 'katakana-6',
        title: 'H-Row',
        subtitle: 'The "h" consonant — フ (fu) is just 1 stroke!',
        chars: [
          { char: 'ハ', romaji: 'ha', mnemonic: 'Looks like "Ha!" — arms spreading wide in surprise', tip: 'Same as は — "ha" in "hot"', word: 'ハンバーガー', wordReading: 'hanbaagaa', wordMeaning: 'hamburger' },
          { char: 'ヒ', romaji: 'hi', mnemonic: 'A sharp grin — "Hee hee!" — teeth showing', tip: 'Same as ひ — "hi" in "heat"', word: 'ヒーロー', wordReading: 'hiiroo', wordMeaning: 'hero' },
          { char: 'フ', romaji: 'fu', mnemonic: 'Mount Fuji — a single peak', tip: 'Same as ふ — between "fu" and "hu"', word: 'フランス', wordReading: 'furansu', wordMeaning: 'France' },
          { char: 'ヘ', romaji: 'he', mnemonic: 'Identical to へ — a simple hill slope', tip: 'Same shape as hiragana! Same sound.', word: 'ヘリコプター', wordReading: 'herikoputaa', wordMeaning: 'helicopter' },
          { char: 'ホ', romaji: 'ho', mnemonic: 'A cross with dots — a Holy cross', tip: 'Same as ほ — "ho" in "hope"', word: 'ホテル', wordReading: 'hoteru', wordMeaning: 'hotel' },
        ],
      },
      {
        id: 'katakana-7',
        title: 'M-Row',
        subtitle: 'The "m" consonant in katakana',
        chars: [
          { char: 'マ', romaji: 'ma', mnemonic: 'Looks like a Mouth open — "Maaaa"', tip: 'Same as ま — "ma" in "mama"', word: 'マンガ', wordReading: 'manga', wordMeaning: 'manga/comics' },
          { char: 'ミ', romaji: 'mi', mnemonic: 'Three horizontal lines — "Mi" has 3 strokes', tip: 'Same as み — "mi" in "me"', word: 'ミルク', wordReading: 'miruku', wordMeaning: 'milk' },
          { char: 'ム', romaji: 'mu', mnemonic: 'A cow\'s head — "Moo!"', tip: 'Same as む — "mu" in "mood"', word: 'ゲーム', wordReading: 'geemu', wordMeaning: 'game' },
          { char: 'メ', romaji: 'me', mnemonic: 'An X-mark — crossed Metal blades', tip: 'Same as め — "me" in "met"', word: 'メール', wordReading: 'meeru', wordMeaning: 'email' },
          { char: 'モ', romaji: 'mo', mnemonic: 'Looks like the kanji for "also" (も) but angular', tip: 'Same as も — "mo" in "more"', word: 'モデル', wordReading: 'moderu', wordMeaning: 'model' },
        ],
      },
      {
        id: 'katakana-8',
        title: 'Y-Row',
        subtitle: 'Only 3 characters — ヤ, ユ, ヨ',
        chars: [
          { char: 'ヤ', romaji: 'ya', mnemonic: 'A Yak\'s horns — angular and sharp', tip: 'Same as や — "ya" in "yard"', word: 'タイヤ', wordReading: 'taiya', wordMeaning: 'tire' },
          { char: 'ユ', romaji: 'yu', mnemonic: 'A Unique vase or container', tip: 'Same as ゆ — "yu" in "you"', word: 'ユニフォーム', wordReading: 'yunifoomu', wordMeaning: 'uniform' },
          { char: 'ヨ', romaji: 'yo', mnemonic: 'A Yoke for carrying water — three horizontal bars', tip: 'Same as よ — "yo" in "yogurt"', word: 'ヨーロッパ', wordReading: 'yooroppa', wordMeaning: 'Europe' },
        ],
      },
      {
        id: 'katakana-9',
        title: 'R-Row',
        subtitle: 'Same soft "r" sound — between English "r" and "l"',
        chars: [
          { char: 'ラ', romaji: 'ra', mnemonic: 'Looks like a clothes Rack', tip: 'Same as ら — light tongue tap', word: 'ラーメン', wordReading: 'raamen', wordMeaning: 'ramen' },
          { char: 'リ', romaji: 'ri', mnemonic: 'Two vertical Reeds standing tall', tip: 'Same as り — "ri" in "ring"', word: 'リモコン', wordReading: 'rimokon', wordMeaning: 'remote control' },
          { char: 'ル', romaji: 'ru', mnemonic: 'A tree Root digging into the ground', tip: 'Same as る — "ru" as in "ruby"', word: 'ルール', wordReading: 'ruuru', wordMeaning: 'rule' },
          { char: 'レ', romaji: 're', mnemonic: 'A sharp angle — like the letter "L" tilted', tip: 'Same as れ — "re" in "red"', word: 'レストラン', wordReading: 'resutoran', wordMeaning: 'restaurant' },
          { char: 'ロ', romaji: 'ro', mnemonic: 'A square Road sign — a simple box', tip: 'Same as ろ — "ro" in "road"', word: 'ロボット', wordReading: 'robotto', wordMeaning: 'robot' },
        ],
      },
      {
        id: 'katakana-10',
        title: 'W-Row + N',
        subtitle: 'Final 3 — be careful with ン (n) vs ソ (so)!',
        chars: [
          { char: 'ワ', romaji: 'wa', mnemonic: 'A Wine glass tipped over', tip: 'Same as わ — "wa" in "want"', word: 'ワイン', wordReading: 'wain', wordMeaning: 'wine' },
          { char: 'ヲ', romaji: 'wo', mnemonic: 'A top-heavy pillar — rarely used in modern Japanese', tip: 'Same as を — mostly used as a particle', word: 'ヲ (particle)', wordReading: 'wo', wordMeaning: 'object marker' },
          { char: 'ン', romaji: 'n', mnemonic: 'A diagonal swoop — like someone saying "Hmmn" while nodding', tip: 'Don\'t confuse with ソ! ン has a longer bottom stroke', word: 'パン', wordReading: 'pan', wordMeaning: 'bread' },
        ],
      },
    ],
  },
};

/**
 * Get all lessons for a given track type.
 */
export function getLessons(type) {
  return lessonTracks[type]?.lessons || [];
}

/**
 * Get a specific lesson by its ID.
 */
export function getLessonById(lessonId) {
  for (const track of Object.values(lessonTracks)) {
    const lesson = track.lessons.find(l => l.id === lessonId);
    if (lesson) return lesson;
  }
  return null;
}

/**
 * Get track type from a lesson ID.
 */
export function getTrackFromLessonId(lessonId) {
  if (lessonId.startsWith('hiragana')) return 'hiragana';
  if (lessonId.startsWith('katakana')) return 'katakana';
  return null;
}

/**
 * Get the next lesson ID after the given one.
 */
export function getNextLessonId(lessonId) {
  const type = getTrackFromLessonId(lessonId);
  if (!type) return null;
  const lessons = lessonTracks[type].lessons;
  const idx = lessons.findIndex(l => l.id === lessonId);
  if (idx >= 0 && idx < lessons.length - 1) {
    return lessons[idx + 1].id;
  }
  return null;
}

/**
 * Check if a lesson is unlocked (previous lesson completed or it's the first).
 */
export function isLessonUnlocked(lessonId, completedLessons) {
  const type = getTrackFromLessonId(lessonId);
  if (!type) return false;
  const lessons = lessonTracks[type].lessons;
  const idx = lessons.findIndex(l => l.id === lessonId);
  if (idx === 0) return true; // First lesson is always unlocked
  return completedLessons.includes(lessons[idx - 1].id);
}
