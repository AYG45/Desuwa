// N5 Grammar Lessons
// Each lesson covers a fundamental grammar point with explanation, examples, and exercises

export const grammarLessons = [
  {
    id: 'grammar-1',
    title: 'です (desu) — "Is / Am / Are"',
    level: 'N5',
    category: 'basics',
    description: 'The most fundamental building block of polite Japanese',
    explanation: [
      'です (desu) is the polite copula — it works like "is", "am", or "are" in English. You put it at the end of a sentence to make it polite.',
      'Japanese sentence structure: [Topic] は [Description] です。',
      'Unlike English, the verb always goes at the END of the sentence. There\'s no need to conjugate です for different subjects — it works the same for "I am", "you are", "he is", etc.',
    ],
    keyPoint: 'Noun + です = "It is [noun]"',
    examples: [
      { japanese: '学生です。', reading: 'がくせい です。', english: '(I) am a student.' },
      { japanese: '日本人です。', reading: 'にほんじん です。', english: '(I) am Japanese.' },
      { japanese: '先生です。', reading: 'せんせい です。', english: '(He/she) is a teacher.' },
      { japanese: '本です。', reading: 'ほん です。', english: 'It is a book.' },
    ],
    exercises: [
      { type: 'choose', question: 'How do you say "I am a student" politely?', choices: ['学生です', '学生だ', '学生ます', '学生する'], answer: 0 },
      { type: 'choose', question: 'What does 先生です mean?', choices: ['I am a school', 'It is a teacher', 'It is a book', 'I am Japanese'], answer: 1 },
      { type: 'fill', sentence: '日本人＿＿＿。', hint: '"(I) am Japanese" — what goes at the end?', choices: ['です', 'ます', 'する', 'ある'], answer: 0 },
      { type: 'fill', sentence: '＿＿＿です。', hint: '"It is a book" — what is the word for book?', choices: ['本', '人', '学', '生'], answer: 0 },
    ],
  },
  {
    id: 'grammar-2',
    title: 'は (wa) — Topic Marker',
    level: 'N5',
    category: 'particles',
    description: 'Mark what your sentence is about with the topic particle',
    explanation: [
      'は (written as は but pronounced "wa") is the topic marker particle. It marks what your sentence is ABOUT — "As for [X], ..."',
      'Think of it like shining a spotlight on the topic of your sentence. Everything after は describes or comments on that topic.',
      'Important: は is spelled with the hiragana は but pronounced "wa" ONLY when used as a particle. In all other cases, は is pronounced "ha".',
    ],
    keyPoint: '[Topic] は [comment] です = "As for [topic], [comment]."',
    examples: [
      { japanese: '私は学生です。', reading: 'わたし は がくせい です。', english: 'I am a student. (As for me, student.)' },
      { japanese: '今日は暑いです。', reading: 'きょう は あつい です。', english: 'Today is hot. (As for today, hot.)' },
      { japanese: 'これは本です。', reading: 'これ は ほん です。', english: 'This is a book. (As for this, book.)' },
      { japanese: '東京は大きいです。', reading: 'とうきょう は おおきい です。', english: 'Tokyo is big. (As for Tokyo, big.)' },
    ],
    exercises: [
      { type: 'fill', sentence: '私＿＿学生です。', hint: 'What particle marks "I" as the topic?', choices: ['は', 'が', 'を', 'に'], answer: 0 },
      { type: 'choose', question: 'What does は do in a sentence?', choices: ['Marks the topic', 'Marks the object', 'Marks the location', 'Marks the time'], answer: 0 },
      { type: 'fill', sentence: 'これ＿＿本です。', hint: '"This is a book" — what connects "this" to "book"?', choices: ['は', 'を', 'に', 'で'], answer: 0 },
      { type: 'choose', question: 'How is は pronounced when used as a particle?', choices: ['wa', 'ha', 'ba', 'pa'], answer: 0 },
    ],
  },
  {
    id: 'grammar-3',
    title: 'を (wo) — Object Marker + Verbs',
    level: 'N5',
    category: 'particles',
    description: 'Mark the direct object of an action — what you eat, drink, see, etc.',
    explanation: [
      'を (pronounced "o") marks the direct object of a verb — the thing that receives the action.',
      'Japanese word order: [Subject は] [Object を] [Verb]。The verb always comes LAST.',
      'Common verbs to use with を: 食べます (eat), 飲みます (drink), 読みます (read), 見ます (watch/see), 書きます (write).',
    ],
    keyPoint: '[Object] を [Verb] = do [verb] to [object]',
    examples: [
      { japanese: 'ご飯を食べます。', reading: 'ごはん を たべます。', english: 'I eat rice/a meal.' },
      { japanese: '水を飲みます。', reading: 'みず を のみます。', english: 'I drink water.' },
      { japanese: '本を読みます。', reading: 'ほん を よみます。', english: 'I read a book.' },
      { japanese: 'テレビを見ます。', reading: 'テレビ を みます。', english: 'I watch TV.' },
    ],
    exercises: [
      { type: 'fill', sentence: '本＿＿読みます。', hint: '"I read a book" — what particle marks the object?', choices: ['を', 'は', 'に', 'で'], answer: 0 },
      { type: 'choose', question: 'What does を mark in a sentence?', choices: ['The direct object', 'The topic', 'The location', 'The time'], answer: 0 },
      { type: 'fill', sentence: '水＿＿飲みます。', hint: '"I drink water" — what particle goes here?', choices: ['を', 'は', 'が', 'の'], answer: 0 },
      { type: 'choose', question: 'In Japanese word order, where does the verb go?', choices: ['At the end', 'At the beginning', 'In the middle', 'Anywhere'], answer: 0 },
    ],
  },
  {
    id: 'grammar-4',
    title: 'に (ni) — Direction & Time',
    level: 'N5',
    category: 'particles',
    description: 'Mark destinations, time points, and targets',
    explanation: [
      'に (ni) is a versatile particle with several important uses at the N5 level:',
      '① Direction/Destination: Where you GO to. 学校に行きます (I go TO school).',
      '② Specific time: When something happens. 七時に起きます (I wake up AT 7 o\'clock). Note: に is used with specific times (7 o\'clock, Monday) but NOT with relative times (today, tomorrow).',
      '③ Location of existence: Where something IS. 部屋に猫がいます (There is a cat IN the room).',
    ],
    keyPoint: '[Place] に 行きます = "go TO [place]" · [Time] に = "AT [time]"',
    examples: [
      { japanese: '学校に行きます。', reading: 'がっこう に いきます。', english: 'I go to school.' },
      { japanese: '七時に起きます。', reading: 'しちじ に おきます。', english: 'I wake up at 7 o\'clock.' },
      { japanese: '日本に来ました。', reading: 'にほん に きました。', english: 'I came to Japan.' },
      { japanese: '部屋に猫がいます。', reading: 'へや に ねこ が います。', english: 'There is a cat in the room.' },
    ],
    exercises: [
      { type: 'fill', sentence: '学校＿＿行きます。', hint: '"I go TO school" — what particle marks the destination?', choices: ['に', 'を', 'は', 'で'], answer: 0 },
      { type: 'choose', question: 'When do you use に for time?', choices: ['With specific times like 7 o\'clock', 'With "today" and "tomorrow"', 'With all time words', 'Never with time'], answer: 0 },
      { type: 'fill', sentence: '六時＿＿食べます。', hint: '"I eat AT 6 o\'clock"', choices: ['に', 'を', 'で', 'は'], answer: 0 },
      { type: 'choose', question: 'What does 日本に来ました mean?', choices: ['I came to Japan', 'I went to Japan', 'Japan is here', 'I am in Japan'], answer: 0 },
    ],
  },
  {
    id: 'grammar-5',
    title: 'で (de) — Location & Means',
    level: 'N5',
    category: 'particles',
    description: 'Where actions happen and how things are done',
    explanation: [
      'で (de) marks the location WHERE an action takes place, or the MEANS by which something is done.',
      '① Location of action: 図書館で勉強します (I study AT the library). Use で for where you DO something (action location).',
      '② Means/Method: バスで行きます (I go BY bus). 日本語で話します (I speak IN Japanese).',
      'Key difference from に: Use に for WHERE something EXISTS or a DESTINATION. Use で for WHERE an ACTION happens.',
    ],
    keyPoint: '[Place] で [Action] = "do [action] AT [place]" · [Means] で = "BY/WITH [means]"',
    examples: [
      { japanese: '図書館で勉強します。', reading: 'としょかん で べんきょう します。', english: 'I study at the library.' },
      { japanese: 'バスで学校に行きます。', reading: 'バス で がっこう に いきます。', english: 'I go to school by bus.' },
      { japanese: 'レストランで食べます。', reading: 'レストラン で たべます。', english: 'I eat at a restaurant.' },
      { japanese: '日本語で話します。', reading: 'にほんご で はなします。', english: 'I speak in Japanese.' },
    ],
    exercises: [
      { type: 'fill', sentence: '図書館＿＿勉強します。', hint: '"I study AT the library" — what marks the location of an action?', choices: ['で', 'に', 'を', 'は'], answer: 0 },
      { type: 'choose', question: 'What is the difference between に and で for location?', choices: ['に = existence/destination, で = action location', 'They are the same', 'に = action, で = existence', 'に = time, で = place'], answer: 0 },
      { type: 'fill', sentence: 'バス＿＿行きます。', hint: '"I go BY bus" — what particle shows the means?', choices: ['で', 'に', 'を', 'は'], answer: 0 },
      { type: 'choose', question: 'What does レストランで食べます mean?', choices: ['I eat at a restaurant', 'I go to a restaurant', 'I like restaurants', 'The restaurant is here'], answer: 0 },
    ],
  },
  {
    id: 'grammar-6',
    title: 'が (ga) — Subject Marker',
    level: 'N5',
    category: 'particles',
    description: 'Mark the grammatical subject and show emphasis or new information',
    explanation: [
      'が (ga) marks the subject of a sentence. While は marks the topic (old/shared info), が introduces NEW information or emphasizes WHO/WHAT.',
      'When to use が over は: ① Answering "who/what" questions: 誰が来ましたか？→ 田中さんが来ました。 ② With existence verbs: ねこがいます (There is a cat). ③ For likes/dislikes and abilities: 日本語が好きです (I like Japanese).',
      'Think of は as "speaking of X..." and が as "X is the one that..."',
    ],
    keyPoint: 'が = "X is the one" (new info/emphasis) vs は = "As for X..." (topic)',
    examples: [
      { japanese: '猫がいます。', reading: 'ねこ が います。', english: 'There is a cat.' },
      { japanese: '日本語が好きです。', reading: 'にほんご が すき です。', english: 'I like Japanese.' },
      { japanese: '誰が来ましたか？', reading: 'だれ が きました か？', english: 'Who came?' },
      { japanese: '水が欲しいです。', reading: 'みず が ほしい です。', english: 'I want water.' },
    ],
    exercises: [
      { type: 'fill', sentence: '猫＿＿います。', hint: '"There is a cat" — what marks the subject with existence verbs?', choices: ['が', 'は', 'を', 'に'], answer: 0 },
      { type: 'choose', question: 'Which particle is used with 好きです (like)?', choices: ['が', 'は', 'を', 'に'], answer: 0 },
      { type: 'fill', sentence: '日本語＿＿好きです。', hint: '"I like Japanese"', choices: ['が', 'は', 'を', 'で'], answer: 0 },
      { type: 'choose', question: 'When do you use が instead of は?', choices: ['When introducing new info or emphasis', 'When talking about old info', 'Always in polite speech', 'At the end of sentences'], answer: 0 },
    ],
  },
  {
    id: 'grammar-7',
    title: 'の (no) — Possession & Connection',
    level: 'N5',
    category: 'particles',
    description: 'Connect nouns to show ownership, affiliation, and description',
    explanation: [
      'の (no) connects two nouns together, most commonly showing possession — like English "\'s" or "of".',
      'Pattern: [Owner/Descriptor] の [Thing] → 私の本 = "my book", 日本の車 = "Japanese car" / "car of Japan".',
      'It\'s also used for descriptions and categories: 日本語の先生 = "Japanese language teacher", 大学の学生 = "university student".',
    ],
    keyPoint: 'A の B = "A\'s B" or "B of A"',
    examples: [
      { japanese: '私の本です。', reading: 'わたし の ほん です。', english: 'It\'s my book.' },
      { japanese: '日本の車は高いです。', reading: 'にほん の くるま は たかい です。', english: 'Japanese cars are expensive.' },
      { japanese: '大学の友達です。', reading: 'だいがく の ともだち です。', english: 'A friend from university.' },
      { japanese: 'これは誰のですか？', reading: 'これ は だれ の です か？', english: 'Whose is this?' },
    ],
    exercises: [
      { type: 'fill', sentence: '私＿＿本です。', hint: '"It\'s MY book" — what particle shows possession?', choices: ['の', 'は', 'が', 'を'], answer: 0 },
      { type: 'choose', question: 'What does 日本の車 mean?', choices: ['Japanese car', 'Japan is a car', 'Car in Japan', 'Japan and car'], answer: 0 },
      { type: 'fill', sentence: '大学＿＿学生です。', hint: '"A university student" — what connects the two nouns?', choices: ['の', 'は', 'に', 'で'], answer: 0 },
      { type: 'choose', question: 'Which is correct for "my friend"?', choices: ['私の友達', '私は友達', '私を友達', '私に友達'], answer: 0 },
    ],
  },
  {
    id: 'grammar-8',
    title: 'も (mo) — "Also / Too"',
    level: 'N5',
    category: 'particles',
    description: 'Express "also", "too", and "as well" — replaces は/が',
    explanation: [
      'も (mo) means "also" or "too". It REPLACES は or が — you never write はも or がも.',
      'Pattern: A は X です。B も X です。→ "A is X. B is ALSO X."',
      'It can also be used for emphasis in negative sentences: 何も食べません = "I don\'t eat ANYTHING".',
    ],
    keyPoint: 'も replaces は/が to mean "also" — never use both together',
    examples: [
      { japanese: '私も学生です。', reading: 'わたし も がくせい です。', english: 'I am also a student.' },
      { japanese: '猫も好きです。', reading: 'ねこ も すき です。', english: 'I like cats too.' },
      { japanese: '田中さんも来ました。', reading: 'たなかさん も きました。', english: 'Tanaka also came.' },
      { japanese: '何も食べませんでした。', reading: 'なに も たべませんでした。', english: 'I didn\'t eat anything.' },
    ],
    exercises: [
      { type: 'fill', sentence: '私＿＿学生です。', hint: '"I am ALSO a student" — what replaces は to mean "also"?', choices: ['も', 'は', 'が', 'を'], answer: 0 },
      { type: 'choose', question: 'What happens to は when you use も?', choices: ['も replaces は entirely', 'You write はも together', 'は comes after も', 'Nothing changes'], answer: 0 },
      { type: 'fill', sentence: '猫＿＿好きです。', hint: '"I like cats TOO"', choices: ['も', 'が', 'は', 'を'], answer: 0 },
      { type: 'choose', question: 'What does 何も食べません mean?', choices: ['I don\'t eat anything', 'I also eat', 'What do I eat?', 'I eat everything'], answer: 0 },
    ],
  },
  {
    id: 'grammar-9',
    title: 'い-Adjectives',
    level: 'N5',
    category: 'adjectives',
    description: 'Japanese adjectives that end in い — they conjugate like verbs!',
    explanation: [
      'い-adjectives always end in い: 大きい (big), 小さい (small), 高い (expensive/tall), おいしい (delicious).',
      'They go BEFORE nouns: 大きい犬 = "big dog". Or at the end with です: この犬は大きいです = "This dog is big."',
      'To make negative: drop い → add くない。大きい → 大きくない (not big). Past tense: drop い → add かった。大きい → 大きかった (was big).',
      'Exception: いい (good) conjugates irregularly: いい → よくない (not good) → よかった (was good).',
    ],
    keyPoint: 'い → くない (negative) · い → かった (past)',
    examples: [
      { japanese: 'この本は面白いです。', reading: 'この ほん は おもしろい です。', english: 'This book is interesting.' },
      { japanese: '大きい犬が好きです。', reading: 'おおきい いぬ が すき です。', english: 'I like big dogs.' },
      { japanese: 'あまり高くないです。', reading: 'あまり たかくない です。', english: 'It\'s not very expensive.' },
      { japanese: '昨日は寒かったです。', reading: 'きのう は さむかった です。', english: 'Yesterday was cold.' },
    ],
    exercises: [
      { type: 'choose', question: 'What is the negative form of 大きい (big)?', choices: ['大きくない', '大きいない', '大きじゃない', '大きません'], answer: 0 },
      { type: 'choose', question: 'What is the past form of 高い (expensive)?', choices: ['高かった', '高いた', '高くた', '高でした'], answer: 0 },
      { type: 'fill', sentence: 'この映画は面白＿＿です。', hint: 'Make "interesting" negative: 面白い → 面白___', choices: ['くない', 'じゃない', 'ない', 'ません'], answer: 0 },
      { type: 'choose', question: 'What is the negative of いい (good)?', choices: ['よくない', 'いくない', 'いいじゃない', 'いません'], answer: 0 },
    ],
  },
  {
    id: 'grammar-10',
    title: 'な-Adjectives',
    level: 'N5',
    category: 'adjectives',
    description: 'Adjectives that need な before nouns — conjugate with じゃない/でした',
    explanation: [
      'な-adjectives are words like 好き (like), きれい (pretty), 元気 (energetic), 静か (quiet), 有名 (famous).',
      'Before nouns, add な: 静かな部屋 = "quiet room", きれいな花 = "pretty flower".',
      'At the end of a sentence, use です: この部屋は静かです = "This room is quiet."',
      'Negative: じゃないです (or ではありません for formal). Past: でした。Negative past: じゃなかったです。',
    ],
    keyPoint: 'な + Noun · じゃないです (negative) · でした (past)',
    examples: [
      { japanese: '日本語が好きです。', reading: 'にほんご が すき です。', english: 'I like Japanese.' },
      { japanese: 'きれいな花ですね。', reading: 'きれい な はな です ね。', english: 'That\'s a pretty flower, isn\'t it?' },
      { japanese: 'ここは静かじゃないです。', reading: 'ここ は しずか じゃない です。', english: 'This place isn\'t quiet.' },
      { japanese: '昨日は元気でした。', reading: 'きのう は げんき でした。', english: 'I was well yesterday.' },
    ],
    exercises: [
      { type: 'fill', sentence: 'きれい＿＿花です。', hint: 'What do な-adjectives need before nouns?', choices: ['な', 'い', 'の', 'に'], answer: 0 },
      { type: 'choose', question: 'What is the negative of 好きです?', choices: ['好きじゃないです', '好きくないです', '好きません', '好きないです'], answer: 0 },
      { type: 'fill', sentence: '昨日は元気＿＿＿。', hint: '"I WAS well yesterday" — past tense of です', choices: ['でした', 'だった', 'かった', 'ました'], answer: 0 },
      { type: 'choose', question: 'Which is a な-adjective?', choices: ['静か (quiet)', '大きい (big)', '高い (tall)', '新しい (new)'], answer: 0 },
    ],
  },
  {
    id: 'grammar-11',
    title: 'Past Tense — ました / でした',
    level: 'N5',
    category: 'tense',
    description: 'Talk about what happened in the past',
    explanation: [
      'Verb past tense (polite): Change ます → ました。食べます → 食べました (ate). 行きます → 行きました (went).',
      'Noun/な-adj past tense: です → でした。学生です → 学生でした (was a student). 元気です → 元気でした (was well).',
      'い-adjective past tense: Drop い → add かった + です。寒い → 寒かったです (was cold).',
      'These are all for polite speech (ます/です form). Casual forms exist too, but start with polite!',
    ],
    keyPoint: 'ます → ました (verbs) · です → でした (nouns) · い → かったです (い-adj)',
    examples: [
      { japanese: '昨日、映画を見ました。', reading: 'きのう、えいが を みました。', english: 'I watched a movie yesterday.' },
      { japanese: '去年、学生でした。', reading: 'きょねん、がくせい でした。', english: 'I was a student last year.' },
      { japanese: 'テストは難しかったです。', reading: 'テスト は むずかしかった です。', english: 'The test was difficult.' },
      { japanese: '朝ご飯を食べました。', reading: 'あさごはん を たべました。', english: 'I ate breakfast.' },
    ],
    exercises: [
      { type: 'fill', sentence: '昨日、本を読み＿＿＿。', hint: 'Past tense of 読みます', choices: ['ました', 'ます', 'ません', 'ましょう'], answer: 0 },
      { type: 'choose', question: 'What is the past tense of 食べます?', choices: ['食べました', '食べるた', '食べた', '食べますた'], answer: 0 },
      { type: 'fill', sentence: '去年、学生＿＿＿。', hint: 'Past tense of です', choices: ['でした', 'ました', 'だ', 'かった'], answer: 0 },
      { type: 'choose', question: 'How do you make 高い (expensive) past tense?', choices: ['高かったです', '高いでした', '高いました', '高くでした'], answer: 0 },
    ],
  },
  {
    id: 'grammar-12',
    title: 'Negative Forms — ません / じゃないです',
    level: 'N5',
    category: 'tense',
    description: 'Express what you don\'t do and what isn\'t the case',
    explanation: [
      'Verb negative (polite): ます → ません。食べます → 食べません (don\'t eat). 行きます → 行きません (don\'t go).',
      'Noun/な-adj negative: です → じゃないです (or ではありません for extra formal)。学生じゃないです (not a student).',
      'Past negative verb: ます → ませんでした。食べませんでした (didn\'t eat).',
      'Past negative noun/な-adj: じゃなかったです。学生じゃなかったです (wasn\'t a student).',
    ],
    keyPoint: 'ます → ません · です → じゃないです · ませんでした (past neg.)',
    examples: [
      { japanese: '肉を食べません。', reading: 'にく を たべません。', english: 'I don\'t eat meat.' },
      { japanese: '学生じゃないです。', reading: 'がくせい じゃないです。', english: 'I\'m not a student.' },
      { japanese: '昨日、学校に行きませんでした。', reading: 'きのう、がっこう に いきませんでした。', english: 'I didn\'t go to school yesterday.' },
      { japanese: 'あまり好きじゃないです。', reading: 'あまり すき じゃない です。', english: 'I don\'t really like it.' },
    ],
    exercises: [
      { type: 'fill', sentence: '肉を食べ＿＿＿。', hint: '"I don\'t eat meat" — negative of 食べます', choices: ['ません', 'ました', 'ましょう', 'ないです'], answer: 0 },
      { type: 'choose', question: 'What is the negative of 学生です?', choices: ['学生じゃないです', '学生ません', '学生くないです', '学生ないです'], answer: 0 },
      { type: 'fill', sentence: '昨日、行き＿＿＿。', hint: '"I didn\'t go yesterday" — past negative', choices: ['ませんでした', 'ません', 'ました', 'ましたない'], answer: 0 },
      { type: 'choose', question: 'Which is correct for "I didn\'t eat"?', choices: ['食べませんでした', '食べないました', '食べましたない', '食べません'], answer: 0 },
    ],
  },
  {
    id: 'grammar-13',
    title: 'か (ka) — Questions',
    level: 'N5',
    category: 'basics',
    description: 'Turn any statement into a question by adding か at the end',
    explanation: [
      'Making questions in Japanese is incredibly simple: just add か (ka) to the end of a sentence. No need to change word order!',
      'Statement: 学生です。(I am a student.) → Question: 学生ですか？ (Are you a student?)',
      'For "what/who/where" questions, use question words: 何 (nani/what), 誰 (dare/who), どこ (doko/where), いつ (itsu/when), どう (dou/how).',
      'In casual speech, か can be dropped and you just raise your intonation at the end, like English.',
    ],
    keyPoint: 'Statement + か = Question — no word order change needed!',
    examples: [
      { japanese: '日本人ですか？', reading: 'にほんじん です か？', english: 'Are you Japanese?' },
      { japanese: 'これは何ですか？', reading: 'これ は なん です か？', english: 'What is this?' },
      { japanese: 'トイレはどこですか？', reading: 'トイレ は どこ です か？', english: 'Where is the toilet?' },
      { japanese: '何時に来ますか？', reading: 'なんじ に きます か？', english: 'What time will you come?' },
    ],
    exercises: [
      { type: 'fill', sentence: '学生です＿＿？', hint: 'How do you make a question?', choices: ['か', 'の', 'ね', 'よ'], answer: 0 },
      { type: 'choose', question: 'How do you say "What is this?" in Japanese?', choices: ['これは何ですか', 'これは何です', '何これですか', 'これですか何'], answer: 0 },
      { type: 'fill', sentence: 'トイレは＿＿ですか？', hint: '"WHERE is the toilet?" — what\'s the question word for "where"?', choices: ['どこ', '何', '誰', 'いつ'], answer: 0 },
      { type: 'choose', question: 'What question word means "who"?', choices: ['誰 (dare)', '何 (nani)', 'どこ (doko)', 'いつ (itsu)'], answer: 0 },
    ],
  },

  // ===== JLPT N4 GRAMMAR =====
  {
    id: 'grammar-n4-1',
    title: '〜たい (tai) — "Want to do"',
    level: 'N4',
    category: 'verbs',
    description: 'Express personal desire to perform an action',
    explanation: [
      'Attach たい to the verb stem (the part before ます).',
      'Example: 食べます (tabemasu) → 食べたい (tabetai - want to eat).',
      'The object can be marked with either を or が (が is common with たい).',
      'Negative: 〜たくない (don\'t want to), Past: 〜たかった (wanted to).',
    ],
    keyPoint: 'Verb stem + たい = "Want to [verb]"',
    examples: [
      { japanese: '日本に行きたいです。', reading: 'にほん に いきたい です。', english: 'I want to go to Japan.' },
      { japanese: 'お茶が飲みたいです。', reading: 'おちゃ が のみたい です。', english: 'I want to drink tea.' },
      { japanese: '何もしたくないです。', reading: 'なにも したくない です。', english: 'I don\'t want to do anything.' },
    ],
    exercises: [
      { type: 'choose', question: 'How do you say "I want to eat"?', choices: ['食べたい', '食べた', '食べるたい', '食べたいですない'], answer: 0 },
      { type: 'fill', sentence: '日本に＿＿＿です。', hint: '"I want to go to Japan" — 行く', choices: ['行きたい', '行くたい', '行きたくない', '行きますたい'], answer: 0 },
    ],
  },
  {
    id: 'grammar-n4-2',
    title: '〜ている (te iru) — "Ongoing action / State"',
    level: 'N4',
    category: 'verbs',
    description: 'Describe actions in progress or resulting ongoing states',
    explanation: [
      'Take the verb て-form and add いる (or います for polite).',
      'For action verbs (食べる, 読む): expresses current action ("is eating", "is reading").',
      'For change-of-state verbs (知る, 結婚する, 住む): expresses the continuing result state ("I know", "is married", "lives in").',
    ],
    keyPoint: 'Verb て-form + いる / います = "-ing / ongoing state"',
    examples: [
      { japanese: '今、本を読んでいます。', reading: 'いま、ほん を よんでいます。', english: 'I am reading a book right now.' },
      { japanese: '東京に住んでいます。', reading: 'とうきょう に すんでいます。', english: 'I live in Tokyo.' },
      { japanese: 'その人を知っています。', reading: 'その ひと を しっています。', english: 'I know that person.' },
    ],
    exercises: [
      { type: 'choose', question: 'What does 今、食べています mean?', choices: ['I am eating right now', 'I ate already', 'I want to eat', 'Please eat'], answer: 0 },
      { type: 'fill', sentence: '本を＿＿＿います。', hint: '"I am reading" (読む)', choices: ['読んで', '読みて', '読むで', '読み'], answer: 0 },
    ],
  },
  {
    id: 'grammar-n4-3',
    title: '〜てはいけない (te wa ikenai) — "Must not do"',
    level: 'N4',
    category: 'rules',
    description: 'Prohibit an action or state a rule',
    explanation: [
      'Formed with Verb て-form + は + いけない / いけません.',
      'Used to state rules, laws, or prohibitions ("You must not...", "Smoking is prohibited here").',
    ],
    keyPoint: 'Verb て-form + はいけません = "Must not [verb]"',
    examples: [
      { japanese: 'ここで写真を撮ってはいけません。', reading: 'ここで しゃしん を とって は いけません。', english: 'You must not take photos here.' },
      { japanese: '嘘をついてはいけません。', reading: 'うそ を ついて は いけません。', english: 'You must not tell lies.' },
    ],
    exercises: [
      { type: 'choose', question: 'What does 入ってはいけません mean?', choices: ['You must not enter', 'Please enter', 'Can I enter?', 'I want to enter'], answer: 0 },
    ],
  },
  {
    id: 'grammar-n4-4',
    title: '〜なければならない (nakereba naranai) — "Must do"',
    level: 'N4',
    category: 'rules',
    description: 'Express duty, requirement, or necessity',
    explanation: [
      'Take the negative verb (ない-form), drop the い, and add ければならない (or ければなりません).',
      'Translates to "must do" or "have to do".',
    ],
    keyPoint: 'Verb ない [drop い] + ければなりません = "Must do"',
    examples: [
      { japanese: '明日、早く起きなければなりません。', reading: 'あした、はやく おきなければ なりません。', english: 'I must wake up early tomorrow.' },
      { japanese: '宿題をしなければなりません。', reading: 'しゅくだい を しなければ なりません。', english: 'I have to do my homework.' },
    ],
    exercises: [
      { type: 'choose', question: 'What expresses obligation ("must do")?', choices: ['〜なければなりません', '〜てもいいです', '〜たいです', '〜ています'], answer: 0 },
    ],
  },
  {
    id: 'grammar-n4-5',
    title: '〜たことがある (ta koto ga aru) — "Have done before"',
    level: 'N4',
    category: 'experience',
    description: 'Describe past life experiences',
    explanation: [
      'Attach ことがある to the past plain form (た-form) of a verb.',
      'Translates to "I have the experience of having [verbed]".',
    ],
    keyPoint: 'Verb た-form + ことがある / あります = "Have done before"',
    examples: [
      { japanese: '富士山に登ったことがあります。', reading: 'ふじさん に のぼった こと が あります。', english: 'I have climbed Mt. Fuji before.' },
      { japanese: '納豆を食べたことがありません。', reading: 'なっとう を たべた こと が ありません。', english: 'I have never eaten natto.' },
    ],
    exercises: [
      { type: 'choose', question: 'How do you say "I have been to Japan"?', choices: ['日本に行ったことがあります', '日本に行くことがあります', '日本に行きたいです', '日本に行っています'], answer: 0 },
    ],
  },

  // ===== JLPT N3 GRAMMAR =====
  {
    id: 'grammar-n3-1',
    title: '〜ようにする (you ni suru) — "Make an effort to"',
    level: 'N3',
    category: 'habits',
    description: 'Express a conscious, continuous effort or habit',
    explanation: [
      'Verb dictionary form or ない-form + ようにする (or ようにしています for current habit).',
      'Expresses an intentional personal effort to establish a habit or avoid something.',
    ],
    keyPoint: 'Verb (dict/nai) + ようにする = "Try to / Make sure to [verb]"',
    examples: [
      { japanese: '毎朝、野菜を食べるようにしています。', reading: 'まいあさ、やさい を たべる ように しています。', english: 'I make an effort to eat vegetables every morning.' },
      { japanese: '夜遅くに甘いものを食べないようにします。', reading: 'よる おそく に あまいもの を たべない ように します。', english: 'I try not to eat sweets late at night.' },
    ],
    exercises: [
      { type: 'choose', question: 'What does 早く寝るようにしています mean?', choices: ['I make a habit of going to bed early', 'I am sleeping early right now', 'I want to sleep early', 'I slept early yesterday'], answer: 0 },
    ],
  },
  {
    id: 'grammar-n3-2',
    title: '〜ことになる (koto ni naru) — "It has been decided that"',
    level: 'N3',
    category: 'decisions',
    description: 'Describe decisions or events arranged by external circumstances',
    explanation: [
      'Verb dictionary form or ない-form + ことになる (or ことになりました).',
      'Focuses on the outcome or decision rather than the individual who decided it.',
    ],
    keyPoint: 'Verb (dict/nai) + ことになった = "It was decided that / Turns out"',
    examples: [
      { japanese: '来月、大阪へ転勤することになりました。', reading: 'らいげつ、おおさか へ てんきん する こと に なりました。', english: 'It has been decided that I will transfer to Osaka next month.' },
    ],
    exercises: [
      { type: 'choose', question: 'What nuance does ことになる carry?', choices: ['Decided by external factors/rules', 'Strong personal stubborn desire', 'Physical impossibility', 'Immediate permission'], answer: 0 },
    ],
  },
  {
    id: 'grammar-n3-3',
    title: '〜わけではない (wake dewa nai) — "It doesn\'t mean that"',
    level: 'N3',
    category: 'reasoning',
    description: 'Partial negation — clarifies that a general assumption is not entirely true',
    explanation: [
      'Plain form + わけではない (or わけじゃない).',
      'Used to gently deny a conclusion or assumption: "It does not necessarily mean that...".',
    ],
    keyPoint: 'Plain form + わけではない = "It\'s not that / Doesn\'t mean that"',
    examples: [
      { japanese: '嫌いなわけではありませんが、辛いものが苦手です。', reading: 'きらい な わけ ではありません が、からい もの が にがて です。', english: 'It\'s not that I dislike it, but I can\'t handle spicy food.' },
    ],
    exercises: [
      { type: 'choose', question: 'What does 嫌いなわけではない mean?', choices: ['It is not that I hate it', 'I completely hate it', 'I love it the most', 'I definitely refuse'], answer: 0 },
    ],
  },
  {
    id: 'grammar-n3-4',
    title: '〜はずだ (hazu da) — "Should be / Expected to"',
    level: 'N3',
    category: 'expectations',
    description: 'Express strong logical expectation based on facts',
    explanation: [
      'Plain form + はずだ (or はずです).',
      'The speaker has good logical reason to believe something ought to happen or be true.',
    ],
    keyPoint: 'Plain form + はずだ = "Ought to be / Should be"',
    examples: [
      { japanese: '田中さんは今日来るはずです。', reading: 'たなかさん は きょう くる はず です。', english: 'Tanaka-san should be coming today (I expect him to).' },
    ],
    exercises: [
      { type: 'choose', question: 'What does はずだ express?', choices: ['Logical expectation based on facts', 'Personal request', 'Prohibition', 'Doubt about one\'s own name'], answer: 0 },
    ],
  },

  // ===== JLPT N2 GRAMMAR =====
  {
    id: 'grammar-n2-1',
    title: '〜にともなって (ni tomonatte) — "Along with / In accordance with"',
    level: 'N2',
    category: 'formal',
    description: 'Indicate that as one major shift happens, another change occurs simultaneously',
    explanation: [
      'Noun or Verb dictionary form + にともなって / にともない.',
      'Formal pattern indicating parallel progression or consequence.',
    ],
    keyPoint: 'Noun / Verb dict + にともなって = "Along with / Concurrently with"',
    examples: [
      { japanese: '人口の増加にともなって、住宅問題が深刻化した。', reading: 'じんこう の ぞうか に ともなって、じゅうたく もんだい が しんこくか した。', english: 'Along with population growth, housing issues grew severe.' },
    ],
    exercises: [
      { type: 'choose', question: 'What registers does にともなって belong to?', choices: ['Formal written & analytical Japanese', 'Casual slang between friends', 'Greetings only', 'Children\'s books'], answer: 0 },
    ],
  },
  {
    id: 'grammar-n2-2',
    title: '〜に違いない (ni chigainai) — "Must be / No doubt that"',
    level: 'N2',
    category: 'certainty',
    description: 'Express high certainty based on conviction',
    explanation: [
      'Plain form + に違いない (or に違いありません).',
      'Indicates speaker\'s strong conviction: "There is no mistake that...".',
    ],
    keyPoint: 'Plain form + に違いない = "Without a doubt / Must be"',
    examples: [
      { japanese: '犯人はあの男に違いない。', reading: 'はんにん は あの おとこ に ちがいない。', english: 'The culprit must be that man without a doubt.' },
    ],
    exercises: [
      { type: 'choose', question: 'What does に違いない express?', choices: ['Absolute speaker conviction', 'Hesitant doubt', 'Mild question', 'Polite denial'], answer: 0 },
    ],
  },
  {
    id: 'grammar-n2-3',
    title: '〜わけにはいかない (wake ni wa ikanai) — "Cannot afford to"',
    level: 'N2',
    category: 'social',
    description: 'Social or psychological impossibility to do something',
    explanation: [
      'Verb dictionary form + わけにはいかない.',
      'Even if you want to do it, social duty, morals, or pressure prevents it.',
    ],
    keyPoint: 'Verb dict + わけにはいかない = "Cannot possibly do (due to duty/morals)"',
    examples: [
      { japanese: '大事な会議だから、休むわけにはいかない。', reading: 'だいじ な かいぎ だから、やすむ わけ に は いかない。', english: 'It\'s an important meeting, so I cannot afford to take the day off.' },
    ],
    exercises: [
      { type: 'choose', question: 'What stops the action in わけにはいかない?', choices: ['Moral obligation or social duty', 'Lack of money only', 'Physical ability', 'Bad weather'], answer: 0 },
    ],
  },

  // ===== JLPT N1 GRAMMAR =====
  {
    id: 'grammar-n1-1',
    title: '〜を皮切りに (o kawakiri ni) — "Starting with / Initiated by"',
    level: 'N1',
    category: 'advanced',
    description: 'A major event or action serves as the spark or starting point for successive occurrences',
    explanation: [
      'Noun + を皮切りに / を皮切りにして.',
      'Literary expression meaning the first event kicked off a wave of subsequent actions.',
    ],
    keyPoint: 'Noun + を皮切りに = "Starting with [first spark], successive events unfolded"',
    examples: [
      { japanese: '東京公演を皮切りに、全国ツアーが始まった。', reading: 'とうきょう こうえん を かわきり に、ぜんこく ツアー が はじまった。', english: 'Starting with the Tokyo performance, the nationwide tour kicked off.' },
    ],
    exercises: [
      { type: 'choose', question: 'What does を皮切りに emphasize?', choices: ['The opening event of a successive series', 'The absolute end of an era', 'Total failure of a plan', 'Sudden cancellation'], answer: 0 },
    ],
  },
  {
    id: 'grammar-n1-2',
    title: '〜極まりない (kiwamarinai) — "Extremely / Boundlessly"',
    level: 'N1',
    category: 'advanced',
    description: 'Express that an emotion or state has reached an extreme limit',
    explanation: [
      'Na-adjective stem / Noun + 極まりない (or 極まる).',
      'Used for formal criticism or profound emotion: "Extremely / Beyond measure".',
    ],
    keyPoint: 'Stem + 極まりない = "Extremely / Infinitely [adjective]"',
    examples: [
      { japanese: 'そのような無礼な態度は、不愉快極まりない。', reading: 'そのような ぶれい な たいど は、ふゆかい きわまりない。', english: 'Such insolent behavior is extremely offensive beyond measure.' },
    ],
    exercises: [
      { type: 'choose', question: 'What tone does 極まりない convey?', choices: ['Formal extreme emotional or critical limit', 'Lighthearted casual sarcasm', 'Polite childish greeting', 'Doubtful wondering'], answer: 0 },
    ],
  },
  {
    id: 'grammar-n1-3',
    title: '〜ならでは (naredewa) — "Unique to / Distinctive of"',
    level: 'N1',
    category: 'advanced',
    description: 'Highlight exceptional qualities only possible by a specific person or place',
    explanation: [
      'Noun + ならでは (or ならではの + Noun).',
      'High praise meaning "something only [Noun] could produce or achieve".',
    ],
    keyPoint: 'Noun + ならでは = "Only possible by / Unique to [noun]"',
    examples: [
      { japanese: '京都ならではの落ち着いた風情を味わう。', reading: 'きょうと ならでは の おちついた ふぜい を あじわう。', english: 'Savor the tranquil elegance unique only to Kyoto.' },
    ],
    exercises: [
      { type: 'choose', question: 'What does ならでは express?', choices: ['A special uniqueness only that entity possesses', 'A common ordinary trait', 'A deficiency or flaw', 'A temporary status'], answer: 0 },
    ],
  },
];

/**
 * JLPT Levels definition with metadata
 */
export const grammarLevels = {
  N5: { label: 'JLPT N5', color: '#2ed573', description: 'Beginner — Foundational copula, particles & basic conjugation' },
  N4: { label: 'JLPT N4', color: '#3498db', description: 'Elementary — Desires, continuous states, obligations & advice' },
  N3: { label: 'JLPT N3', color: '#ffa502', description: 'Intermediate — Natural habits, partial denials & expected outcomes' },
  N2: { label: 'JLPT N2', color: '#e94560', description: 'Pre-Advanced — Formal transitions, certainties & duty constraints' },
  N1: { label: 'JLPT N1', color: '#7c5cbf', description: 'Advanced — Nuanced rhetoric, distinctive praise & extreme limits' },
};

/**
 * Get all grammar lessons.
 */
export function getGrammarLessons() {
  return grammarLessons;
}

/**
 * Get grammar lessons filtered by level.
 */
export function getGrammarByLevel(level) {
  return grammarLessons.filter((l) => l.level === level);
}

/**
 * Get a grammar lesson by ID.
 */
export function getGrammarLessonById(id) {
  return grammarLessons.find(l => l.id === id) || null;
}

/**
 * Get grammar categories for filtering.
 */
export const grammarCategories = {
  all: { label: 'All', color: '#ffffff' },
  basics: { label: 'Basics', color: '#2ed573' },
  particles: { label: 'Particles', color: '#3498db' },
  adjectives: { label: 'Adjectives', color: '#e94560' },
  tense: { label: 'Tense', color: '#7c5cbf' },
  verbs: { label: 'Verbs', color: '#1abc9c' },
  rules: { label: 'Rules', color: '#e67e22' },
  formal: { label: 'Formal', color: '#9b59b6' },
  advanced: { label: 'Advanced', color: '#f39c12' },
};
