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
    ],
    bank: {
      R1: [
        poster('No dogs in the shop', ['🐕', '🐈', '🐦'], '🐕'),
        poster('Swimming lessons every Monday', ['🏊', '🚲', '⚽'], '🏊'),
        poster('Bus stop', ['🚌', '🚗', '🚂'], '🚌'),
        poster('Lemonade: 1 pound', ['🍋', '🍊', '🍇'], '🍋'),
        poster('Music class: bring your guitar!', ['🎸', '🎨', '📚'], '🎸'),
      ],
      R2: [
        chat([['Grace', 'What are you doing?'], ['Eva', 'I\'m painting a picture of a boat.']], 'What is Eva painting?', ['⛵', '🚌', '✈️'], '⛵'),
        chat([['Nick', 'Is it cold there?'], ['Alex', 'Yes! It\'s snowing! ⛄']], 'What is the weather like where Alex is?', ['❄️', '☀️', '🌧️'], '❄️'),
        chat([['Ann', 'Thank you for the book!'], ['Sue', 'You\'re welcome!']], 'What is Ann\'s present?', ['📕', '🧸', '🎈'], '📕'),
        chat([['Dan', 'I\'ve got a new skateboard!'], ['Bill', 'Cool! Can I try it?']], 'What has Dan got?', ['🛹', '🛴', '🚲'], '🛹'),
        chat([['Mum', 'Good night, Hugo!'], ['Hugo', 'Good night! Sleep well!']], 'Choose a sticker for Hugo.', ['😴', '🍔', '⚽'], '😴'),
      ],
      R3: [
        pair('🍐', 'pear', 'p__r', ['ea', 'ee', 'ai'], 'ea'),
        pair('🦶', 'feet', 'f__t', ['ee', 'ea', 'oo'], 'ee'),
        pair('📚', 'book', 'b__k', ['oo', 'ou', 'oa'], 'oo'),
        scramble('⚽', 'kicking'),
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
      ],
    },
  }
})(globalThis)
