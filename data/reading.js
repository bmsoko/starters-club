// Starters Digital-style READING & WRITING practice. Original questions written
// for Starters Club, using only Pre A1 Starters Digital wordlist vocabulary.
// Not official Cambridge material.
//
// Question types (see js/tasks/reading.js):
//   poster  {poster, options:[emoji], answer}
//   chat    {messages:[{from:name, text}], prompt, options, answer}   // first name shows on the left
//   letters {emoji, word, mode:'pair', blank:'sh__p', choices:[..], answer} | {emoji, word, mode:'scramble'}
//   gaps    {title, sentences:[{text:'… ___ …', answer}], bank:[word]}   // 1 point per sentence
//   comic   {title, panels:[{emoji, caption}], questions:[{q, answer, accept:[]}]}  // 1 point per question
;(function (g) {
  const D = (g.SC_DATA = g.SC_DATA || {})

  const TASKS = {
    R1: { label: 'Information posters', help: 'Read the poster. Choose the right picture.' },
    R2: { label: 'Online messages', help: 'Read the messages. Choose the right picture.' },
    R3: { label: 'Spelling', help: 'Look at the picture. Complete the word or put the letters in order.' },
    R4: { label: 'Factual topic', help: 'Read the text. Choose a word from the box for each gap.' },
    R5: { label: 'Comic book story', help: 'Read the story. Write one word for each answer.' },
  }
  const task = (taskId, extra) => ({ taskId, ...TASKS[taskId], ...extra })

  const poster = (text, options, answer) => ({ type: 'poster', poster: text, options, answer })
  const chat = (messages, prompt, options, answer) => ({
    type: 'chat', messages: messages.map(([from, text]) => ({ from, text })), prompt, options, answer })
  const pair = (emoji, word, blank, choices, answer) => ({ type: 'letters', mode: 'pair', emoji, word, blank, choices, answer })
  const scramble = (emoji, word) => ({ type: 'letters', mode: 'scramble', emoji, word })
  const gaps = (title, sentences, bank) => ({ type: 'gaps', title, sentences: sentences.map(([text, answer]) => ({ text, answer })), bank })
  const comic = (title, panels, questions) => ({
    type: 'comic', title, panels: panels.map(([emoji, caption]) => ({ emoji, caption })),
    questions: questions.map(([q, answer, accept = []]) => ({ q, answer, accept })) })

  D.reading = {
    tasks: TASKS,
    mocks: [
      {
        id: 'R-T1',
        title: 'Reading & Writing · Test 1',
        tasks: [
          task('R1', {
            example: poster('Ice cream here!', ['🍦', '🍕', '🍎'], '🍦'),
            questions: [
              poster('Fresh pears. Two for one!', ['🍐', '🫛', '🍎'], '🍐'),
              poster('Peas and carrots for lunch today', ['🫛🥕', '🍐🥕', '🍕🍟'], '🫛🥕'),
              poster('Please don\'t feed the ducks', ['🦆', '🐄', '🐈'], '🦆'),
              poster('Football on Saturday in the park', ['⚽🌳', '🎾🏫', '🏊🏖️'], '⚽🌳'),
              poster('Lost! A small grey mouse', ['🐭', '🐱', '🐶'], '🐭'),
            ],
          }),
          task('R2', {
            example: chat([['Sam', 'Hi! What are you eating?'], ['Tina', 'A banana. It\'s yummy!']], 'What is Tina eating?', ['🍌', '🍉', '🍔'], '🍌'),
            questions: [
              chat([['Pat', 'Where are you?'], ['Anna', 'At the beach with my dad! 🌞']], 'Where is Anna?', ['🏖️', '🏫', '🏠'], '🏖️'),
              chat([['Sam', 'Happy birthday, Tina!'], ['Tina', 'Thank you! I\'m eight today!']], 'Choose a sticker for Tina.', ['🎂', '🌧️', '😴'], '🎂'),
              chat([['Ben', 'What\'s your new pet?'], ['Kim', 'It\'s a little white rabbit.']], 'What is Kim\'s new pet?', ['🐰', '🐢', '🐟'], '🐰'),
              chat([['Lucy', 'I\'m sad. I can\'t find my cat.'], ['Tom', 'Oh no! I can help you.']], 'How does Lucy feel?', ['😢', '😀', '😠'], '😢'),
              chat([['Yusef', 'Let\'s play tennis after school!'], ['Matt', 'Great idea! 👍']], 'What do they want to play?', ['🎾', '⚽', '🏀'], '🎾'),
            ],
          }),
          task('R3', {
            example: pair('🐑', 'sheep', 'sh__p', ['ee', 'ea', 'ie'], 'ee'),
            questions: [
              pair('🐟', 'fish', 'fi__', ['sh', 'ch', 'ss'], 'sh'),
              pair('🐄', 'cow', 'c__', ['ow', 'ou', 'oa'], 'ow'),
              scramble('👗', 'dress'),
              scramble('🌸', 'flowers'),
              scramble('👋', 'waving'),
            ],
          }),
          task('R4', {
            example: gaps('Example', [['A ___ is a big grey animal.', 'hippo']], ['hippo', 'mouse', 'bird']),
            questions: [
              gaps('Giraffes', [
                ['Giraffes are very tall ___.', 'animals'],
                ['They have got long ___ and long legs.', 'necks'],
                ['Giraffes eat ___ from the trees.', 'leaves'],
                ['A baby giraffe can ___ when it is one hour old.', 'walk'],
                ['You can see giraffes at the ___.', 'zoo'],
              ], ['animals', 'necks', 'leaves', 'walk', 'zoo', 'fish', 'sea']),
            ],
          }),
          task('R5', {
            example: comic('Example', [['👧🐕', 'Anna has got a dog. His name is Max.']], [['What is the dog\'s name?', 'Max']]),
            questions: [
              comic('The lost ball', [
                ['👦⚽🌳', 'Sam is playing with his ball in the garden.'],
                ['⚽➡️🌊', 'Oh no! The ball goes into the pond.'],
                ['🐸⚽', 'A frog sits on the ball. "Ribbit!"'],
                ['👨🎣⚽', 'Dad gets the ball with a fishing rod. Sam is happy.'],
              ], [
                ['Where is Sam playing?', 'garden', ['in the garden']],
                ['Where does the ball go?', 'pond', ['into the pond', 'the pond']],
                ['What animal sits on the ball?', 'frog', ['a frog']],
                ['Who gets the ball?', 'dad', ['his dad']],
                ['How does Sam feel at the end?', 'happy'],
              ]),
            ],
          }),
        ],
      },

      {
        id: 'R-T2',
        title: 'Reading & Writing · Test 2',
        tasks: [
          task('R1', {
            example: poster('Library: please be quiet', ['📚🤫', '⚽📣', '🎸🔊'], '📚🤫'),
            questions: [
              poster('Hot chips and fish here', ['🍟🐟', '🍕🥗', '🍦🍰'], '🍟🐟'),
              poster('Watch out! Crocodiles in the river', ['🐊', '🦆', '🐸'], '🐊'),
              poster('Come and see our new baby goats!', ['🐐', '🐑', '🐎'], '🐐'),
              poster('Kites for sale', ['🪁', '🎈', '🛹'], '🪁'),
              poster('No phones in class, please', ['📱🚫', '📚🚫', '✏️🚫'], '📱🚫'),
            ],
          }),
          task('R2', {
            example: chat([['Matt', 'What\'s your favourite colour?'], ['Eva', 'Purple! I love purple.']], 'Choose Eva\'s favourite colour.', ['🟣', '🟢', '🔴'], '🟣'),
            questions: [
              chat([['Tom', 'Can you come to my party?'], ['Bill', 'Yes! I can come. 🎉']], 'Where is Bill going?', ['🎉', '🏫', '🏥'], '🎉'),
              chat([['Kim', 'I\'ve got a new phone!'], ['Sue', 'Wow! Take a photo of your cat!']], 'What does Sue want?', ['📷🐈', '📷🐕', '🎵🐈'], '📷🐈'),
              chat([['Dad', 'Where\'s your coat, Ben?'], ['Ben', 'It\'s on my bed.']], 'Where is Ben\'s coat?', ['🛏️', '🚪', '🪑'], '🛏️'),
              chat([['Lucy', 'I\'m very tired.'], ['Pat', 'Go to sleep! Good night!']], 'Choose a sticker for Lucy.', ['😴', '😡', '🥳'], '😴'),
              chat([['Nick', 'What\'s in your lunch box?'], ['Alex', 'A sandwich and an orange.']], 'What has Alex got?', ['🥪🍊', '🍕🍌', '🍔🍎'], '🥪🍊'),
            ],
          }),
          task('R3', {
            example: pair('🐝', 'bee', 'b__', ['ee', 'ea', 'ie'], 'ee'),
            questions: [
              pair('🍰', 'cake', 'c__e', ['ak', 'ac', 'ck'], 'ak'),
              pair('🐢', 'turtle', 'tur__e', ['tl', 'dl', 'll'], 'tl'),
              scramble('🦒', 'giraffe'),
              scramble('🍉', 'watermelon'),
              scramble('🦵', 'kicking'),
            ],
          }),
          task('R4', {
            example: gaps('Example', [['Fish live in the ___.', 'water']], ['water', 'tree', 'car']),
            questions: [
              gaps('Frogs', [
                ['Frogs are small ___ animals.', 'green'],
                ['They can jump with their long back ___.', 'legs'],
                ['Frogs live near water, like ponds and ___.', 'lakes'],
                ['They like to eat ___ and spiders.', 'bugs'],
                ['Baby frogs live in the water and have got a ___.', 'tail'],
              ], ['green', 'legs', 'lakes', 'bugs', 'tail', 'arms', 'cakes']),
            ],
          }),
          task('R5', {
            example: comic('Example', [['👵🍪', 'Grandma makes cookies.']], [['What does Grandma make?', 'cookies']]),
            questions: [
              comic('The new bike', [
                ['🎁🚲', 'It is Hugo\'s birthday. He has got a red bike.'],
                ['👦🚲🌳', 'Hugo rides his bike to the park.'],
                ['🐕💨', 'A big dog runs after him!'],
                ['🐕🦴😀', 'Hugo gives the dog a bone. Now they are friends.'],
              ], [
                ['What colour is Hugo\'s bike?', 'red'],
                ['Where does Hugo ride his bike?', 'park', ['to the park']],
                ['What animal runs after Hugo?', 'dog', ['a big dog', 'big dog']],
                ['What does Hugo give the dog?', 'bone', ['a bone']],
                ['Are Hugo and the dog friends now?', 'yes'],
              ]),
            ],
          }),
        ],
      },
      {
        id: 'R-T3',
        title: 'Reading & Writing · Test 3',
        tasks: [
          task('R1', {
            example: poster('Shoe shop', ['👟', '👕', '🧢'], '👟'),
            questions: [
              poster('Sweet peas for the garden', ['🫛🌱', '🍐🌱', '🍕🌱'], '🫛🌱'),
              poster('Bananas and mangoes today', ['🍌🥭', '🍎🍐', '🥕🥔'], '🍌🥭'),
              poster('Swimming pool closed', ['🏊🚫', '🎾🚫', '🚲🚫'], '🏊🚫'),
              poster('Don\'t touch! Wet paint', ['🎨✋', '💧🚿', '📚✋'], '🎨✋'),
              poster('Lost: a teddy bear with a blue hat', ['🧸', '🐶', '🪆'], '🧸'),
            ],
          }),
          task('R2', {
            example: chat([['Mum', 'Do you want some milk?'], ['Kim', 'Yes, please!']], 'What does Kim want?', ['🥛', '☕', '🧃'], '🥛'),
            questions: [
              chat([['Sam', 'Look at my funny photo!'], ['Tina', 'Ha ha! That\'s so funny!']], 'Choose a sticker for Tina.', ['😂', '😢', '😠'], '😂'),
              chat([['Grace', 'Where\'s your brother?'], ['Dan', 'He\'s in the bath.']], 'Where is Dan\'s brother?', ['🛁', '🛏️', '🌳'], '🛁'),
              chat([['Yusef', 'What are you watching?'], ['Anna', 'A film about bears.']], 'What is Anna watching?', ['🐻', '🐍', '🦈'], '🐻'),
              chat([['Eva', 'What\'s your new toy?'], ['Hugo', 'A robot! It can talk!']], 'What is Hugo\'s new toy?', ['🤖', '🧸', '🪀'], '🤖'),
              chat([['Pat', 'Let\'s go to the beach!'], ['Alex', 'OK! Bring the ball!']], 'What must Pat bring?', ['⚽', '🪣', '🧢'], '⚽'),
            ],
          }),
          task('R3', {
            example: pair('🐐', 'goat', 'g__t', ['oa', 'ou', 'oo'], 'oa'),
            questions: [
              pair('🍋', 'lemon', 'le__n', ['mo', 'mu', 'ma'], 'mo'),
              pair('🦶', 'foot', 'f__t', ['oo', 'ou', 'ea'], 'oo'),
              scramble('🍐', 'pears'),
              scramble('🐒', 'monkey'),
              scramble('📚', 'books'),
            ],
          }),
          task('R4', {
            example: gaps('Example', [['A cow gives us ___.', 'milk']], ['milk', 'juice', 'rice']),
            questions: [
              gaps('Spiders', [
                ['Spiders are small ___.', 'animals'],
                ['All spiders have got eight ___.', 'legs'],
                ['Many spiders make a ___ to catch flies.', 'web'],
                ['Some spiders live in the ___ in our houses.', 'corners'],
                ['Spiders are not ___. They are good for the garden!', 'bugs'],
              ], ['animals', 'legs', 'web', 'corners', 'bugs', 'cakes', 'shoes']),
            ],
          }),
          task('R5', {
            example: comic('Example', [['👦🎈', 'Tom has got a blue balloon.']], [['What colour is the balloon?', 'blue']]),
            questions: [
              comic('A day at the beach', [
                ['👨‍👩‍👧🚗🏖️', 'Kim and her family go to the beach by car.'],
                ['👧🏰', 'Kim makes a big sandcastle.'],
                ['🦀🏰', 'A crab walks on the sandcastle!'],
                ['👩🍦👧', 'Mum buys two ice creams. Yum!'],
              ], [
                ['How do they go to the beach?', 'car', ['by car']],
                ['What does Kim make?', 'sandcastle', ['a sandcastle', 'a big sandcastle']],
                ['What animal walks on the sandcastle?', 'crab', ['a crab']],
                ['What does Mum buy?', 'ice creams', ['ice cream', 'two ice creams']],
                ['Who goes to the beach with Kim?', 'family', ['her family']],
              ]),
            ],
          }),
        ],
      },
      {
        id: 'R-T4',
        title: 'Reading & Writing · Test 4',
        tasks: [
          task('R1', {
            example: poster('Cake shop', ['🍰', '🍔', '🍎'], '🍰'),
            questions: [
              poster('Big sale! Pears and apples', ['🍐🍎', '🫛🍎', '🍌🍊'], '🍐🍎'),
              poster('No swimming in the lake', ['🏊🚫', '🚲🚫', '⚽🚫'], '🏊🚫'),
              poster('Come to our art class!', ['🎨', '🎸', '⚽'], '🎨'),
              poster('Please close the door', ['🚪', '🪟', '📦'], '🚪'),
              poster('Fresh fish every Friday', ['🐟', '🍗', '🥚'], '🐟'),
            ],
          }),
          task('R2', {
            example: chat([['Ann', 'What are you drinking?'], ['Matt', 'Orange juice!']], 'What is Matt drinking?', ['🧃', '🥛', '☕'], '🧃'),
            questions: [
              chat([['Eva', 'Where are you?'], ['Nick', 'In the garden with my dog.']], 'Where is Nick?', ['🌳🐕', '🏫🐕', '🏖️🐈'], '🌳🐕'),
              chat([['Tom', 'What\'s the weather like?'], ['Sue', 'It\'s raining! ☔']], 'What is the weather like where Sue is?', ['🌧️', '☀️', '❄️'], '🌧️'),
              chat([['Bill', 'Look at my new pet! It\'s a lizard.'], ['Grace', 'Wow! It\'s green!']], 'What is Bill\'s new pet?', ['🦎', '🐢', '🐍'], '🦎'),
              chat([['Kim', 'It\'s my birthday party today!'], ['Lucy', 'Hooray! I love parties!']], 'Choose a sticker for Lucy.', ['🥳', '😢', '😴'], '🥳'),
              chat([['Dan', 'What are you doing?'], ['May', 'I\'m playing the piano.']], 'What is May doing?', ['🎹', '🎸', '🥁'], '🎹'),
            ],
          }),
          task('R3', {
            example: pair('🐎', 'horse', 'h__se', ['or', 'ou', 'ar'], 'or'),
            questions: [
              pair('🍊', 'orange', 'or__ge', ['an', 'en', 'in'], 'an'),
              pair('🐻', 'bear', 'b__r', ['ea', 'ee', 'ai'], 'ea'),
              scramble('🚂', 'train'),
              scramble('🧦', 'socks'),
              scramble('🐸', 'frog'),
            ],
          }),
          task('R4', {
            example: gaps('Example', [['A bird can ___.', 'fly']], ['fly', 'read', 'cook']),
            questions: [
              gaps('Elephants', [
                ['Elephants are very big and ___.', 'grey'],
                ['They have got a very long ___.', 'nose'],
                ['Elephants drink a lot of ___.', 'water'],
                ['They eat grass and ___.', 'fruit'],
                ['Baby elephants walk with their ___.', 'mothers'],
              ], ['grey', 'nose', 'water', 'fruit', 'mothers', 'books', 'cars']),
            ],
          }),
          task('R5', {
            example: comic('Example', [['👧🐈‍⬛', 'Lucy has got a black cat.']], [['What colour is Lucy\'s cat?', 'black']]),
            questions: [
              comic('The birthday cake', [
                ['👩🎂', 'Mum is making a big cake for Ben\'s birthday.'],
                ['🐕🎂', 'Oh no! The dog eats the cake! Bad dog!'],
                ['👦😢', 'Ben is very sad.'],
                ['👨🍦👦😀', 'Dad comes home with ice cream. Now Ben is happy!'],
              ], [
                ['Who is making the cake?', 'mum', ['ben\'s mum']],
                ['What animal eats the cake?', 'dog', ['the dog']],
                ['How does Ben feel when the dog eats the cake?', 'sad', ['very sad']],
                ['What does Dad bring?', 'ice cream', ['some ice cream', 'an ice cream']],
                ['Whose birthday is it?', 'ben', ['ben\'s']],
              ]),
            ],
          }),
        ],
      },
      {
        id: 'R-T5',
        title: 'Reading & Writing · Test 5',
        tasks: [
          task('R1', {
            example: poster('Toy shop', ['🧸', '🍞', '👗'], '🧸'),
            questions: [
              poster('Peas: one pound a bag', ['🫛', '🍐', '🍇'], '🫛'),
              poster('Please don\'t run in the classroom', ['🏃🚫', '📖🚫', '✏️🚫'], '🏃🚫'),
              poster('Look! Ducks crossing the road', ['🦆🛣️', '🐄🛣️', '🦆🌳'], '🦆🛣️'),
              poster('Hot chocolate and cookies', ['☕🍪', '🧃🍰', '🥛🍞'], '☕🍪'),
              poster('Lost: a brown dog called Max', ['🐕', '🐈', '🐴'], '🐕'),
            ],
          }),
          task('R2', {
            example: chat([['Tony', 'Is that your new hat?'], ['Pat', 'Yes! It\'s from my grandma.']], 'What has Pat got?', ['👒', '👟', '👜'], '👒'),
            questions: [
              chat([['Sam', 'Where\'s Dad?'], ['Anna', 'He\'s in the kitchen. He\'s cooking.']], 'What is Dad doing?', ['👨‍🍳', '👨😴', '👨📺'], '👨‍🍳'),
              chat([['Jill', 'My cat is under the bed!'], ['Hugo', 'Ha ha! Is she sleeping?']], 'Where is Jill\'s cat?', ['🛏️', '🌳', '🚗'], '🛏️'),
              chat([['Alex', 'I\'ve got a new game for my computer!'], ['Ben', 'Great! Can I play?']], 'What has Alex got?', ['🎮💻', '📕', '⚽'], '🎮💻'),
              chat([['Eva', 'I\'m very hungry!'], ['Mum', 'Here\'s an apple.']], 'Choose a sticker for Eva.', ['😋', '😴', '😢'], '😋'),
              chat([['Grace', 'How many brothers have you got?'], ['Tom', 'Two!']], 'How many brothers has Tom got?', ['👦👦', '👦', '👦👦👦'], '👦👦'),
            ],
          }),
          task('R3', {
            example: pair('🐍', 'snake', 'sn__e', ['ak', 'ac', 'ek'], 'ak'),
            questions: [
              pair('🍞', 'bread', 'br__d', ['ea', 'ee', 'ie'], 'ea'),
              pair('🐔', 'chicken', 'chi__en', ['ck', 'kk', 'ch'], 'ck'),
              scramble('🦓', 'zebra'),
              scramble('🪑', 'chair'),
              scramble('🌙', 'night'),
            ],
          }),
          task('R4', {
            example: gaps('Example', [['We sleep in a ___.', 'bed']], ['bed', 'bath', 'tree']),
            questions: [
              gaps('Monkeys', [
                ['Monkeys are funny ___.', 'animals'],
                ['They can climb ___ very well.', 'trees'],
                ['Monkeys have got long ___.', 'tails'],
                ['They like eating ___.', 'bananas'],
                ['Baby monkeys sit on their mother\'s ___.', 'back'],
              ], ['animals', 'trees', 'tails', 'bananas', 'back', 'shoes', 'boats']),
            ],
          }),
          task('R5', {
            example: comic('Example', [['👦🚲', 'Nick rides his blue bike.']], [['What does Nick ride?', 'bike', ['a bike', 'his bike']]]),
            questions: [
              comic('The rainy day', [
                ['🌧️🏠', 'It is raining. Anna and Bill are at home.'],
                ['👧👦📺', 'They watch a film about a lion.'],
                ['👧👦🖍️', 'Then they draw pictures. Anna draws a lion too.'],
                ['🌈☀️', 'Look! The sun comes out and there is a rainbow!'],
              ], [
                ['What is the weather like at the start?', 'raining', ['rainy', 'rain', 'it is raining']],
                ['Where are Anna and Bill?', 'home', ['at home']],
                ['What is the film about?', 'lion', ['a lion']],
                ['What do they do after the film?', 'draw', ['draw pictures', 'they draw pictures']],
                ['What can they see at the end?', 'rainbow', ['a rainbow', 'the sun']],
              ]),
            ],
          }),
        ],
      },
      {
        id: 'R-T6',
        title: 'Reading & Writing · Test 6',
        tasks: [
          task('R1', {
            example: poster('Bike park', ['🚲', '🚗', '🚂'], '🚲'),
            questions: [
              poster('Pears for sale here', ['🍐', '🫛', '🥔'], '🍐'),
              poster('Please wash your hands', ['🧼👐', '🦷🪥', '👟🧽'], '🧼👐'),
              poster('Our school play is on Friday!', ['🎭', '⚽', '🏊'], '🎭'),
              poster('Watch out! Big dog', ['🐕', '🐦', '🐟'], '🐕'),
              poster('Today: chicken and chips', ['🍗🍟', '🐟🍚', '🍕🥗'], '🍗🍟'),
            ],
          }),
          task('R2', {
            example: chat([['Lucy', 'Look at the snow!'], ['May', 'Let\'s make a snowman!']], 'What do they want to make?', ['⛄', '🏰', '🪁'], '⛄'),
            questions: [
              chat([['Matt', 'Where\'s my ball?'], ['Kim', 'It\'s in the garden, next to the tree.']], 'Where is Matt\'s ball?', ['🌳⚽', '🛏️⚽', '🚗⚽'], '🌳⚽'),
              chat([['Sue', 'What\'s your favourite fruit?'], ['Dan', 'Grapes! I love grapes.']], 'What is Dan\'s favourite fruit?', ['🍇', '🍊', '🍌'], '🍇'),
              chat([['Pat', 'I\'ve got a new baby brother!'], ['Ann', 'Wow! What\'s his name?']], 'What is new in Pat\'s family?', ['👶', '🐕', '👵'], '👶'),
              chat([['Hugo', 'My team is the winner!'], ['Nick', 'Well done! 🏆']], 'Choose a sticker for Hugo.', ['🏆', '😢', '🌧️'], '🏆'),
              chat([['Tony', 'Do you want to go to the zoo?'], ['Eva', 'Yes! I want to see the giraffes.']], 'What does Eva want to see?', ['🦒', '🐘', '🐒'], '🦒'),
            ],
          }),
          task('R3', {
            example: pair('⛵', 'boat', 'b__t', ['oa', 'ou', 'oo'], 'oa'),
            questions: [
              pair('🌳', 'tree', 'tr__', ['ee', 'ea', 'ie'], 'ee'),
              pair('🦆', 'duck', 'du__', ['ck', 'kk', 'cc'], 'ck'),
              scramble('🐭', 'mouse'),
              scramble('🍎', 'apple'),
              scramble('🏠', 'house'),
            ],
          }),
          task('R4', {
            example: gaps('Example', [['We can read a ___.', 'book']], ['book', 'egg', 'shoe']),
            questions: [
              gaps('Crocodiles', [
                ['Crocodiles are big ___ animals.', 'green'],
                ['They live in ___ and lakes.', 'rivers'],
                ['Crocodiles have got lots of ___.', 'teeth'],
                ['They can ___ very well.', 'swim'],
                ['Crocodiles like to sleep in the ___.', 'sun'],
              ], ['green', 'rivers', 'teeth', 'swim', 'sun', 'pink', 'houses']),
            ],
          }),
          task('R5', {
            example: comic('Example', [['👩🌷', 'Grandma has got red flowers.']], [['What colour are the flowers?', 'red']]),
            questions: [
              comic('The lost kite', [
                ['👧🪁🌬️', 'Kim is flying her yellow kite on the beach.'],
                ['🪁🌳', 'The wind takes the kite into a tree!'],
                ['👨🪜', 'A man gets the kite with a long ladder.'],
                ['👧🪁😀', 'Kim says "Thank you!" She is very happy.'],
              ], [
                ['What colour is Kim\'s kite?', 'yellow'],
                ['Where is Kim?', 'beach', ['on the beach', 'the beach']],
                ['Where does the kite go?', 'tree', ['into a tree', 'a tree', 'in a tree']],
                ['Who gets the kite?', 'man', ['a man']],
                ['What does Kim say?', 'thank you', ['thanks']],
              ]),
            ],
          }),
        ],
      },
    ],
    bank: {
      R1: [
        poster('No dogs in the shop', ['🐕', '🐈', '🐦'], '🐕'),
        poster('Swimming lessons every Monday', ['🏊', '🚲', '⚽'], '🏊'),
        poster('Bus stop', ['🚌', '🚗', '🚂'], '🚌'),
        poster('Lemonade: 1 pound', ['🍋', '🍊', '🍇'], '🍋'),
        poster('Music class: bring your guitar!', ['🎸', '🎨', '📚'], '🎸'),
        poster('Pears are good for you!', ['🍐', '🫛', '🍑'], '🍐'),
        poster('Cats sleeping. Please be quiet!', ['🐈😴', '🐕😴', '🐈⚽'], '🐈😴'),
        poster('Train station this way', ['🚂', '✈️', '⛵'], '🚂'),
      ],
      R2: [
        chat([['Grace', 'What are you doing?'], ['Eva', 'I\'m painting a picture of a boat.']], 'What is Eva painting?', ['⛵', '🚌', '✈️'], '⛵'),
        chat([['Nick', 'Is it cold there?'], ['Alex', 'Yes! It\'s snowing! ⛄']], 'What is the weather like where Alex is?', ['❄️', '☀️', '🌧️'], '❄️'),
        chat([['Ann', 'Thank you for the book!'], ['Sue', 'You\'re welcome!']], 'What is Ann\'s present?', ['📕', '🧸', '🎈'], '📕'),
        chat([['Dan', 'I\'ve got a new skateboard!'], ['Bill', 'Cool! Can I try it?']], 'What has Dan got?', ['🛹', '🛴', '🚲'], '🛹'),
        chat([['Mum', 'Good night, Hugo!'], ['Hugo', 'Good night! Sleep well!']], 'Choose a sticker for Hugo.', ['😴', '🍔', '⚽'], '😴'),
        chat([['Jill', 'I can\'t find my glasses!'], ['May', 'They\'re on your head! 😄']], 'Where are Jill\'s glasses?', ['👓🙂', '👓🛏️', '👓🚪'], '👓🙂'),
        chat([['Tony', 'What are you eating?'], ['Sam', 'Meatballs and rice.']], 'What is Sam eating?', ['🍝', '🍔', '🥞'], '🍝'),
        chat([['Ann', 'I\'m scared of the dark.'], ['Mum', 'Don\'t worry. I\'m here.']], 'How does Ann feel?', ['😨', '😀', '😴'], '😨'),
      ],
      R3: [
        pair('🍐', 'pear', 'p__r', ['ea', 'ee', 'ai'], 'ea'),
        pair('🦶', 'feet', 'f__t', ['ee', 'ea', 'oo'], 'ee'),
        pair('📚', 'book', 'b__k', ['oo', 'ou', 'oa'], 'oo'),
        scramble('😊', 'smiling'),
        scramble('🎩', 'hat'),
        scramble('👥', 'people'),
        scramble('🔤', 'alphabet'),
        scramble('🗄️', 'bookcase'),
        scramble('🐌', 'snail'),
      ],
      R4: [
        gaps('Ducks', [
          ['Ducks are ___ that can swim.', 'birds'],
          ['They live on lakes and ___.', 'rivers'],
          ['Ducks have got two short ___.', 'legs'],
          ['Baby ducks are small and ___.', 'yellow'],
          ['Ducks like to eat ___ and small fish.', 'bread'],
        ], ['birds', 'rivers', 'legs', 'yellow', 'bread', 'trees', 'cars']),
        gaps('Cats', [
          ['Cats are popular ___.', 'pets'],
          ['They like to sleep in the ___.', 'sun'],
          ['Cats can see well at ___.', 'night'],
          ['They clean their ___ with their tongue.', 'hair'],
          ['Young cats are called ___.', 'kittens'],
        ], ['pets', 'sun', 'night', 'hair', 'kittens', 'trains', 'apples']),
      ],
      R5: [
        comic('Pizza night', [
          ['👩🍕', 'Mum is making pizza in the kitchen.'],
          ['👧🍅🧀', 'Grace puts tomatoes and cheese on it.'],
          ['🐈🍕', 'The cat jumps on the table! Bad cat!'],
          ['👨‍👩‍👧🍕', 'The family eat the pizza. It is very good.'],
        ], [
          ['Who is making pizza?', 'mum', ['grace\'s mum']],
          ['Where is Mum?', 'kitchen', ['in the kitchen']],
          ['What animal jumps on the table?', 'cat', ['the cat']],
          ['What does Grace put on the pizza with cheese?', 'tomatoes', ['tomato']],
          ['Is the pizza good or bad?', 'good'],
        ]),
        comic('The snowman', [
          ['❄️🏠', 'It is snowing. Matt and May go outside.'],
          ['👦👧⛄', 'They make a big snowman.'],
          ['⛄🥕🧣', 'The snowman has got a carrot nose and a red scarf.'],
          ['☀️💧', 'The sun comes out. Oh no! The snowman is going!'],
        ], [
          ['What is the weather like?', 'snowing', ['snowy', 'snow']],
          ['What do Matt and May make?', 'snowman', ['a snowman', 'a big snowman']],
          ['What is the snowman\'s nose?', 'carrot', ['a carrot']],
          ['What colour is the scarf?', 'red'],
          ['What comes out at the end?', 'sun', ['the sun']],
        ]),
      ],
    },
  }
})(globalThis)
