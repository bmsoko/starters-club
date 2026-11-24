// Starters-style SPEAKING practice. A grown-up plays the examiner: the site
// reads each question aloud, Estani answers out loud, the grown-up marks it.
// Original questions written for Starters Club. Not official Cambridge material.
//
// Question types (see js/tasks/speaking.js):
//   point {audio, scene:[{slot, emoji}], answer:slot}          // he taps it (auto-marked)
//   place {audio, object, scene:[{slot, emoji}], answer:slot}  // listening renderer (auto-marked)
//   ask   {audio, show?, examples:[text]}                      // grown-up marks the spoken answer
;(function (g) {
  const D = (g.SC_DATA = g.SC_DATA || {})

  const TASKS = {
    S1: { label: 'Look and point', help: 'Look at the picture. Listen, then tap the right thing.' },
    S2: { label: 'Talk about the picture', help: 'Look at the picture and answer out loud. A grown-up marks it.' },
    S3: { label: 'Object cards', help: 'Look at the card and answer out loud. A grown-up marks it.' },
    S4: { label: 'About you', help: 'Answer the questions about you out loud. A grown-up marks it.' },
  }
  const task = (taskId, extra) => ({ taskId, ...TASKS[taskId], ...extra })
  const sc = (pairs) => pairs.map(([slot, emoji]) => ({ slot, emoji }))
  const point = (audio, scene, answer) => ({ type: 'point', audio, scene: sc(scene), answer })
  const place = (audio, object, scene, answer) => ({ type: 'place', audio, object, scene: sc(scene), answer })
  const ask = (audio, examples, show) => ({ type: 'ask', audio, examples, ...(show ? { show } : {}) })

  // Scenes (the "big picture" of each test)
  const PARK = [['tree', '🌳'], ['duck', '🦆'], ['dog', '🐕'], ['ball', '⚽'], ['kite', '🪁'], ['bike', '🚲']]
  const PARK_PIC = '🌳 🦆🦆 🐕 ⚽ 👧🪁 🚲 ☀️'
  const KITCHEN = [['table', '🍽️'], ['cat', '🐈'], ['apple', '🍎'], ['clock', '⏰'], ['fish', '🐟'], ['chair', '🪑']]
  const KITCHEN_PIC = '👩🍳 🐈 🍎🍎🍎 ⏰ 🪑 🐟'
  const BEACH = [['sea', '🌊'], ['boat', '⛵'], ['crab', '🦀'], ['shell', '🐚'], ['sun', '☀️'], ['bird', '🐦']]
  const BEACH_PIC = '☀️ 🌊⛵ 🦀 🐚🐚 🐦🐦🐦 👦🏊'
  const ZOO = [['monkey', '🐒'], ['elephant', '🐘'], ['giraffe', '🦒'], ['snake', '🐍'], ['lion', '🦁'], ['tiger', '🐯']]

  D.speaking = {
    tasks: TASKS,
    mocks: [
      {
        id: 'S-T1',
        title: 'Speaking · Test 1',
        tasks: [
          task('S1', {
            example: point('This is the park. Look, here is the tree. Point to the tree.', PARK, 'tree'),
            questions: [
              point('Where is the duck?', PARK, 'duck'),
              point('Where is the kite?', PARK, 'kite'),
              point('Where is the dog?', PARK, 'dog'),
              place('Here is a cat. Put the cat next to the bike.', '🐈', PARK, 'bike'),
              place('Here is a bird. Put the bird in the tree.', '🐦', PARK, 'tree'),
            ],
          }),
          task('S2', {
            example: ask('What is this? It\'s a tree. What colour is the tree?', ['It\'s green.', 'Green.'], PARK_PIC),
            questions: [
              ask('How many ducks are there?', ['Two.', 'There are two ducks.'], PARK_PIC),
              ask('What is the girl doing?', ['She\'s flying a kite.', 'Flying a kite.'], PARK_PIC),
              ask('What is the weather like?', ['It\'s sunny.', 'Sunny.'], PARK_PIC),
              ask('Tell me about the dog.', ['It\'s brown.', 'It\'s happy.', 'It\'s playing with the ball.'], PARK_PIC),
            ],
          }),
          task('S3', {
            example: ask('What\'s this?', ['It\'s a banana.', 'A banana.'], '🍌'),
            questions: [
              ask('What\'s this?', ['It\'s an apple.', 'An apple.'], '🍎'),
              ask('What colour is it?', ['It\'s red.', 'Red.'], '🍎'),
              ask('What\'s this?', ['It\'s a bus.', 'A bus.'], '🚌'),
              ask('Do you like going on the bus?', ['Yes, I do.', 'No, I don\'t.'], '🚌'),
            ],
          }),
          task('S4', {
            example: ask('Hello! What\'s your name?', ['My name is Estani.', 'Estani.']),
            questions: [
              ask('How old are you?', ['I\'m seven.', 'Seven.']),
              ask('What\'s your favourite colour?', ['Blue.', 'My favourite colour is blue.']),
              ask('Have you got a pet?', ['Yes, I\'ve got a dog.', 'No, I haven\'t.']),
              ask('What do you like eating?', ['I like pizza.', 'Pizza and ice cream.']),
              ask('Who is your best friend?', ['My best friend is Tom.', 'Tom.']),
            ],
          }),
        ],
      },
      {
        id: 'S-T2',
        title: 'Speaking · Test 2',
        tasks: [
          task('S1', {
            example: point('This is the kitchen. Look, here is the table. Point to the table.', KITCHEN, 'table'),
            questions: [
              point('Where is the cat?', KITCHEN, 'cat'),
              point('Where is the clock?', KITCHEN, 'clock'),
              point('Where are the apples?', KITCHEN, 'apple'),
              place('Here is a ball. Put the ball under the chair.', '⚽', KITCHEN, 'chair'),
              place('Here is a cake. Put the cake on the table.', '🍰', KITCHEN, 'table'),
            ],
          }),
          task('S2', {
            example: ask('Look at the woman. What is she doing?', ['She\'s cooking.', 'Cooking.'], KITCHEN_PIC),
            questions: [
              ask('How many apples are there?', ['Three.', 'There are three apples.'], KITCHEN_PIC),
              ask('What animal can you see?', ['A cat.', 'I can see a cat.'], KITCHEN_PIC),
              ask('What time is it?', ['It\'s... I don\'t know.', 'It\'s ten o\'clock.'], KITCHEN_PIC),
              ask('Tell me about the fish.', ['It\'s blue.', 'It\'s small.', 'It\'s for lunch.'], KITCHEN_PIC),
            ],
          }),
          task('S3', {
            example: ask('What\'s this?', ['It\'s a ball.', 'A ball.'], '⚽'),
            questions: [
              ask('What\'s this?', ['It\'s a T-shirt.', 'A T-shirt.'], '👕'),
              ask('What colour is it?', ['It\'s blue.', 'Blue.'], '👕'),
              ask('What\'s this?', ['It\'s a guitar.', 'A guitar.'], '🎸'),
              ask('Can you play the guitar?', ['Yes, I can.', 'No, I can\'t.'], '🎸'),
            ],
          }),
          task('S4', {
            example: ask('Hello! How are you?', ['I\'m fine, thank you.', 'Fine, thanks.']),
            questions: [
              ask('How many people are there in your family?', ['Four.', 'There are four people.']),
              ask('What\'s your favourite animal?', ['Monkeys.', 'My favourite animal is the monkey.']),
              ask('Where do you live?', ['I live in a house.', 'In Buenos Aires.']),
              ask('What do you do after school?', ['I play football.', 'I watch TV.']),
              ask('Have you got a brother or a sister?', ['Yes, I\'ve got a sister.', 'No, I haven\'t.']),
            ],
          }),
        ],
      },
      {
        id: 'S-T3',
        title: 'Speaking · Test 3',
        tasks: [
          task('S1', {
            example: point('This is the beach. Look, here is the sea. Point to the sea.', BEACH, 'sea'),
            questions: [
              point('Where is the crab?', BEACH, 'crab'),
              point('Where is the boat?', BEACH, 'boat'),
              point('Where is the shell?', BEACH, 'shell'),
              place('Here is a fish. Put the fish in the sea.', '🐟', BEACH, 'sea'),
              place('Here is a hat. Put the hat next to the shell.', '👒', BEACH, 'shell'),
            ],
          }),
          task('S2', {
            example: ask('Look at the boy. What is he doing?', ['He\'s swimming.', 'Swimming.'], BEACH_PIC),
            questions: [
              ask('How many birds are there?', ['Three.', 'There are three birds.'], BEACH_PIC),
              ask('What is the weather like?', ['It\'s sunny.', 'It\'s hot.'], BEACH_PIC),
              ask('How many shells are there?', ['Two.', 'There are two shells.'], BEACH_PIC),
              ask('Tell me about the boat.', ['It\'s white.', 'It\'s on the sea.', 'It\'s small.'], BEACH_PIC),
            ],
          }),
          task('S3', {
            example: ask('What\'s this?', ['It\'s a book.', 'A book.'], '📕'),
            questions: [
              ask('What\'s this?', ['It\'s an ice cream.', 'An ice cream.'], '🍦'),
              ask('Do you like ice cream?', ['Yes, I do.', 'No, I don\'t.'], '🍦'),
              ask('What\'s this?', ['It\'s a train.', 'A train.'], '🚂'),
              ask('What colour is it?', ['It\'s green.', 'Green and red.'], '🚂'),
            ],
          }),
          task('S4', {
            example: ask('Hello! What\'s your name? How do you spell it?', ['E, S, T, A, N, I.', 'My name is Estani.']),
            questions: [
              ask('What\'s your favourite food?', ['Pizza.', 'My favourite food is pasta.']),
              ask('What can you do?', ['I can swim.', 'I can ride a bike.']),
              ask('What\'s your teacher\'s name?', ['Miss Laura.', 'My teacher is Miss Laura.']),
              ask('What sport do you like?', ['Football.', 'I like tennis.']),
              ask('What toys have you got?', ['I\'ve got a robot.', 'A ball and a kite.']),
            ],
          }),
        ],
      },
    ],
    bank: {
      S1: [
        point('Where is the monkey?', ZOO, 'monkey'),
        point('Where is the giraffe?', ZOO, 'giraffe'),
        point('Where is the snake?', ZOO, 'snake'),
        point('Where is the lion?', ZOO, 'lion'),
        place('Here is a banana. Put the banana next to the monkey.', '🍌', ZOO, 'monkey'),
        place('Here is a bird. Put the bird on the elephant.', '🐦', ZOO, 'elephant'),
      ],
      S2: [
        ask('Look at the zoo. How many animals can you see?', ['Six.', 'I can see six animals.'], '🐒 🐘 🦒 🐍 🦁 🐯'),
        ask('Which animal is very tall?', ['The giraffe.', 'The giraffe is tall.'], '🐒 🐘 🦒 🐍 🦁 🐯'),
        ask('Which animal is long?', ['The snake.', 'The snake is long.'], '🐒 🐘 🦒 🐍 🦁 🐯'),
        ask('Which animal do you like?', ['I like the monkey.', 'The tiger.'], '🐒 🐘 🦒 🐍 🦁 🐯'),
      ],
      S3: [
        ask('What\'s this?', ['It\'s a pencil.', 'A pencil.'], '✏️'),
        ask('What\'s this?', ['It\'s a cake.', 'A cake.'], '🎂'),
        ask('What\'s this?', ['It\'s a shoe.', 'A shoe.'], '👟'),
        ask('What\'s this?', ['It\'s a computer.', 'A computer.'], '💻'),
        ask('What\'s this?', ['It\'s a kite.', 'A kite.'], '🪁'),
      ],
      S4: [
        ask('What colour is your bedroom?', ['It\'s blue.', 'Blue and white.']),
        ask('What do you have for breakfast?', ['I have milk and bread.', 'Cereal.']),
        ask('Have you got a bike?', ['Yes, I have.', 'No, I haven\'t.']),
        ask('What\'s your favourite game?', ['Football.', 'Hide and seek.']),
        ask('What do you like doing on Saturday?', ['I go to the park.', 'I play with my friends.']),
      ],
    },
  }
})(globalThis)
