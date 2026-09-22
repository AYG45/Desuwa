// Vocabulary entries for JLPT N5 level
// Each entry: { word, reading, meaning, category, jlpt, example }

export const vocabulary = [
  // Greetings
  { word: 'こんにちは', reading: 'konnichiwa', meaning: 'Hello / Good afternoon', category: 'greetings', jlpt: 'N5', example: 'こんにちは、元気ですか？ — Hello, how are you?' },
  { word: 'おはようございます', reading: 'ohayou gozaimasu', meaning: 'Good morning (polite)', category: 'greetings', jlpt: 'N5', example: 'おはようございます、先生。 — Good morning, teacher.' },
  { word: 'こんばんは', reading: 'konbanwa', meaning: 'Good evening', category: 'greetings', jlpt: 'N5', example: 'こんばんは、お元気ですか？ — Good evening, how are you?' },
  { word: 'さようなら', reading: 'sayounara', meaning: 'Goodbye', category: 'greetings', jlpt: 'N5', example: 'さようなら、また明日。 — Goodbye, see you tomorrow.' },
  { word: 'ありがとうございます', reading: 'arigatou gozaimasu', meaning: 'Thank you (polite)', category: 'greetings', jlpt: 'N5', example: 'ありがとうございます！ — Thank you very much!' },
  { word: 'すみません', reading: 'sumimasen', meaning: 'Excuse me / I\'m sorry', category: 'greetings', jlpt: 'N5', example: 'すみません、駅はどこですか？ — Excuse me, where is the station?' },

  // People & Family
  { word: '私', reading: 'わたし (watashi)', meaning: 'I / me', category: 'people', jlpt: 'N5', example: '私は学生です。 — I am a student.' },
  { word: '友達', reading: 'ともだち (tomodachi)', meaning: 'Friend', category: 'people', jlpt: 'N5', example: '友達と映画を見ました。 — I watched a movie with a friend.' },
  { word: 'お母さん', reading: 'おかあさん (okaasan)', meaning: 'Mother', category: 'people', jlpt: 'N5', example: 'お母さんは料理が上手です。 — Mother is good at cooking.' },
  { word: 'お父さん', reading: 'おとうさん (otousan)', meaning: 'Father', category: 'people', jlpt: 'N5', example: 'お父さんは会社員です。 — Father is a company employee.' },
  { word: '兄', reading: 'あに (ani)', meaning: 'Older brother', category: 'people', jlpt: 'N5', example: '兄は大学生です。 — My older brother is a college student.' },
  { word: '姉', reading: 'あね (ane)', meaning: 'Older sister', category: 'people', jlpt: 'N5', example: '姉は東京に住んでいます。 — My older sister lives in Tokyo.' },

  // Food & Drink
  { word: 'ご飯', reading: 'ごはん (gohan)', meaning: 'Rice / Meal', category: 'food', jlpt: 'N5', example: 'ご飯を食べましょう。 — Let\'s eat a meal.' },
  { word: '水', reading: 'みず (mizu)', meaning: 'Water', category: 'food', jlpt: 'N5', example: '水を飲みたいです。 — I want to drink water.' },
  { word: 'お茶', reading: 'おちゃ (ocha)', meaning: 'Tea', category: 'food', jlpt: 'N5', example: 'お茶を一杯ください。 — One cup of tea, please.' },
  { word: '肉', reading: 'にく (niku)', meaning: 'Meat', category: 'food', jlpt: 'N5', example: '肉が好きです。 — I like meat.' },
  { word: '魚', reading: 'さかな (sakana)', meaning: 'Fish', category: 'food', jlpt: 'N5', example: '日本の魚はおいしいです。 — Japanese fish is delicious.' },
  { word: '野菜', reading: 'やさい (yasai)', meaning: 'Vegetables', category: 'food', jlpt: 'N5', example: '野菜をもっと食べてください。 — Please eat more vegetables.' },
  { word: '果物', reading: 'くだもの (kudamono)', meaning: 'Fruit', category: 'food', jlpt: 'N5', example: '果物が大好きです。 — I love fruit.' },

  // Places
  { word: '学校', reading: 'がっこう (gakkou)', meaning: 'School', category: 'places', jlpt: 'N5', example: '学校に行きます。 — I go to school.' },
  { word: '駅', reading: 'えき (eki)', meaning: 'Station', category: 'places', jlpt: 'N5', example: '駅はどこですか？ — Where is the station?' },
  { word: '病院', reading: 'びょういん (byouin)', meaning: 'Hospital', category: 'places', jlpt: 'N5', example: '病院に行かなければなりません。 — I must go to the hospital.' },
  { word: '図書館', reading: 'としょかん (toshokan)', meaning: 'Library', category: 'places', jlpt: 'N5', example: '図書館で勉強します。 — I study at the library.' },
  { word: 'お店', reading: 'おみせ (omise)', meaning: 'Store / Shop', category: 'places', jlpt: 'N5', example: 'お店で買い物をしました。 — I went shopping at the store.' },
  { word: '会社', reading: 'かいしゃ (kaisha)', meaning: 'Company', category: 'places', jlpt: 'N5', example: '会社で働いています。 — I work at a company.' },

  // Time
  { word: '今日', reading: 'きょう (kyou)', meaning: 'Today', category: 'time', jlpt: 'N5', example: '今日は暑いですね。 — It\'s hot today, isn\'t it?' },
  { word: '明日', reading: 'あした (ashita)', meaning: 'Tomorrow', category: 'time', jlpt: 'N5', example: '明日テストがあります。 — There is a test tomorrow.' },
  { word: '昨日', reading: 'きのう (kinou)', meaning: 'Yesterday', category: 'time', jlpt: 'N5', example: '昨日映画を見ました。 — I watched a movie yesterday.' },
  { word: '朝', reading: 'あさ (asa)', meaning: 'Morning', category: 'time', jlpt: 'N5', example: '朝ご飯を食べました。 — I ate breakfast.' },
  { word: '夜', reading: 'よる (yoru)', meaning: 'Night', category: 'time', jlpt: 'N5', example: '夜は静かです。 — The night is quiet.' },
  { word: '毎日', reading: 'まいにち (mainichi)', meaning: 'Every day', category: 'time', jlpt: 'N5', example: '毎日日本語を勉強します。 — I study Japanese every day.' },

  // Common Verbs
  { word: '食べる', reading: 'たべる (taberu)', meaning: 'To eat', category: 'verbs', jlpt: 'N5', example: '朝ご飯を食べます。 — I eat breakfast.' },
  { word: '飲む', reading: 'のむ (nomu)', meaning: 'To drink', category: 'verbs', jlpt: 'N5', example: 'コーヒーを飲みます。 — I drink coffee.' },
  { word: '行く', reading: 'いく (iku)', meaning: 'To go', category: 'verbs', jlpt: 'N5', example: '学校に行きます。 — I go to school.' },
  { word: '来る', reading: 'くる (kuru)', meaning: 'To come', category: 'verbs', jlpt: 'N5', example: '明日来てください。 — Please come tomorrow.' },
  { word: '見る', reading: 'みる (miru)', meaning: 'To see / watch', category: 'verbs', jlpt: 'N5', example: 'テレビを見ます。 — I watch TV.' },
  { word: '読む', reading: 'よむ (yomu)', meaning: 'To read', category: 'verbs', jlpt: 'N5', example: '本を読みます。 — I read books.' },
  { word: '書く', reading: 'かく (kaku)', meaning: 'To write', category: 'verbs', jlpt: 'N5', example: '手紙を書きます。 — I write a letter.' },
  { word: '話す', reading: 'はなす (hanasu)', meaning: 'To speak / talk', category: 'verbs', jlpt: 'N5', example: '日本語を話します。 — I speak Japanese.' },
  { word: '聞く', reading: 'きく (kiku)', meaning: 'To hear / listen / ask', category: 'verbs', jlpt: 'N5', example: '音楽を聞きます。 — I listen to music.' },
  { word: '買う', reading: 'かう (kau)', meaning: 'To buy', category: 'verbs', jlpt: 'N5', example: '本を買います。 — I buy a book.' },

  // Common Adjectives
  { word: '大きい', reading: 'おおきい (ookii)', meaning: 'Big / Large', category: 'adjectives', jlpt: 'N5', example: 'この家は大きいです。 — This house is big.' },
  { word: '小さい', reading: 'ちいさい (chiisai)', meaning: 'Small / Little', category: 'adjectives', jlpt: 'N5', example: 'この犬は小さいです。 — This dog is small.' },
  { word: '新しい', reading: 'あたらしい (atarashii)', meaning: 'New', category: 'adjectives', jlpt: 'N5', example: '新しい車を買いました。 — I bought a new car.' },
  { word: '古い', reading: 'ふるい (furui)', meaning: 'Old (things)', category: 'adjectives', jlpt: 'N5', example: 'この建物は古いです。 — This building is old.' },
  { word: '高い', reading: 'たかい (takai)', meaning: 'Expensive / Tall', category: 'adjectives', jlpt: 'N5', example: 'この山は高いです。 — This mountain is tall.' },
  { word: '安い', reading: 'やすい (yasui)', meaning: 'Cheap / Inexpensive', category: 'adjectives', jlpt: 'N5', example: 'このレストランは安いです。 — This restaurant is cheap.' },
  { word: 'いい', reading: 'いい (ii)', meaning: 'Good', category: 'adjectives', jlpt: 'N5', example: 'いい天気ですね。 — Nice weather, isn\'t it?' },
  { word: '悪い', reading: 'わるい (warui)', meaning: 'Bad', category: 'adjectives', jlpt: 'N5', example: '天気が悪いです。 — The weather is bad.' },
];

export const vocabCategories = {
  greetings: { label: 'Greetings', icon: '', color: '#e94560' },
  people: { label: 'People & Family', icon: '', color: '#7c5cbf' },
  food: { label: 'Food & Drink', icon: '', color: '#2ed573' },
  places: { label: 'Places', icon: '', color: '#3498db' },
  time: { label: 'Time', icon: '', color: '#ffa502' },
  verbs: { label: 'Common Verbs', icon: '', color: '#ff6b81' },
  adjectives: { label: 'Adjectives', icon: '', color: '#a29bfe' },
};
