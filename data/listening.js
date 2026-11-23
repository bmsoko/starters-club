// Starters Digital-style LISTENING practice. Original questions written for
// Starters Club, using only Pre A1 Starters Digital wordlist vocabulary.
// Not official Cambridge material.
//
// Question types (see js/tasks/listening.js):
//   pick   {audio, prompt?, options:[emoji|text], answer}
//   notes  {audio, label, answer}            // a name (spelled) or number 1-20
//   reply  {audio, options:[text], answer}   // interactive dialogue
//   place  {audio, object, scene:[{slot, emoji}], answer:slot}
//   colour {audio, objects:[emoji], target, colour}
;(function (g) {
  const D = (g.SC_DATA = g.SC_DATA || {})

  const TASKS = {
    L1: { label: 'Minimal differences', help: 'Listen and choose the right picture.' },
    L2: { label: 'Story scene', help: 'Listen to the story. Then choose the right picture.' },
    L3: { label: 'Note-taking', help: 'Listen and write the name or the number.' },
    L4: { label: 'Interactive dialogue', help: 'Listen and choose the best answer. You can listen again.' },
    L5: { label: 'Picture editing', help: 'Listen and put things in the picture, or colour them.' },
  }

  const pick = (audio, options, answer, prompt) => ({ type: 'pick', audio, options, answer, ...(prompt ? { prompt } : {}) })
  const notes = (audio, label, answer) => ({ type: 'notes', audio, label, answer })
  const reply = (audio, options, answer) => ({ type: 'reply', audio, options, answer })
  const place = (audio, object, scene, answer) => ({ type: 'place', audio, object, scene: scene.map(([slot, emoji]) => ({ slot, emoji })), answer })
  const colour = (audio, objects, target, c) => ({ type: 'colour', audio, objects, target, colour: c })

  const ROOM = [['bed', '🛏️'], ['box', '📦'], ['sofa', '🛋️'], ['window', '🪟'], ['door', '🚪']]
  const PARK = [['tree', '🌳'], ['car', '🚗'], ['boat', '⛵'], ['house', '🏠'], ['flower', '🌷']]
  const task = (taskId, extra) => ({ taskId, ...TASKS[taskId], ...extra })

  D.listening = {
    tasks: TASKS,
    mocks: [
      {
        id: 'L-T1',
        title: 'Listening · Test 1',
        tasks: [
          task('L1', {
            example: pick('There is one apple on the table.', ['🍎', '🍎🍎', '🍐'], '🍎'),
            questions: [
              pick('There are two cats on the bed.', ['🐈🐈🛏️', '🐈🐈🐈🛏️', '🐕🐕🛏️'], '🐈🐈🛏️'),
              pick('The girl is eating a pear.', ['👧🍐', '👧🍎', '👦🍐'], '👧🍐'),
            ],
          }),
          task('L2', {
            intro: 'Hello! I am Tina. Today is my birthday. My friend Sam comes to my house. He has got a present for me. It is a big kite! We go to the park. We fly the kite. Then we eat cake and ice cream. My dog Spot eats a sausage. What a happy day!',
            example: pick('What day is it?', ['🎂', '🏫', '🌧️'], '🎂', 'What is special today?'),
            questions: [
              pick('Who comes to Tina\'s house?', ['👦', '👵', '👨'], '👦', 'Who comes to the house?'),
              pick('What is Tina\'s present?', ['🪁', '⚽', '🧸'], '🪁', 'What is the present?'),
              pick('Where do they go?', ['🌳', '🏫', '🏖️'], '🌳', 'Where do they go?'),
              pick('What do they eat?', ['🍰🍦', '🍕🍟', '🍌🍎'], '🍰🍦', 'What do they eat?'),
              pick('What animal is Spot?', ['🐕', '🐈', '🐟'], '🐕', 'What is Spot?'),
            ],
          }),
          task('L3', {
            example: notes('What is the boy\'s name? It\'s Ben. B, E, N.', 'Name of the boy', 'Ben'),
            questions: [
              notes('What is your teacher\'s name? It\'s Miss Grey. G, R, E, Y.', 'Name of the teacher: Miss …', 'Grey'),
              notes('What is your dog\'s name? Spot. S, P, O, T.', 'Name of the dog', 'Spot'),
              notes('How old is your brother? He is nine.', 'Age of the brother', '9'),
              notes('What is the name of your street? Park Street. P, A, R, K.', 'Name of the street: … Street', 'Park'),
              notes('How many books have you got? I\'ve got fourteen books.', 'Number of books', '14'),
            ],
          }),
          task('L4', {
            example: reply('Hello! What\'s your name?', ['I\'m Sam.', 'I\'m seven.', 'Yes, please.'], 'I\'m Sam.'),
            questions: [
              reply('How old are you?', ['I\'m seven.', 'I\'m fine, thanks.', 'It\'s blue.'], 'I\'m seven.'),
              reply('Do you like bananas?', ['Yes, I do.', 'Yes, it is.', 'I\'ve got two.'], 'Yes, I do.'),
              reply('What colour is your bag?', ['It\'s red.', 'It\'s my bag.', 'I like bags.'], 'It\'s red.'),
            ],
          }),
          task('L5', {
            example: place('Put the cat on the bed.', '🐈', ROOM, 'bed'),
            questions: [
              place('Can you see the ball? Put the ball in the box.', '⚽', ROOM, 'box'),
              place('Now the teddy. Put the teddy on the sofa.', '🧸', ROOM, 'sofa'),
              place('And the bird? Put the bird next to the window.', '🐦', ROOM, 'window'),
              colour('Look at the kite. Colour the kite green.', ['🪁', '⚽', '🧸', '🚗'], '🪁', 'green'),
              colour('Can you see the car? Colour the car purple.', ['🪁', '⚽', '🧸', '🚗'], '🚗', 'purple'),
            ],
          }),
        ],
      },
    ],
    // Extra questions for "Practice by task" (on top of the mock questions)
    bank: {
      L1: [
        pick('The boy has got a ball.', ['👦⚽', '👦🪁', '👧⚽'], '👦⚽'),
        pick('There are three fish.', ['🐟🐟🐟', '🐟🐟', '🐸🐸🐸'], '🐟🐟🐟'),
        pick('The man is sleeping.', ['👨😴', '👨🏃', '👩😴'], '👨😴'),
        pick('These are peas.', ['🫛', '🍐', '🍕'], '🫛'),
        pick('The spider is on the wall.', ['🕷️🧱', '🕷️🌳', '🐌🧱'], '🕷️🧱'),
      ],
      L2: [
        pick('Where does Yusef go on Saturday?', ['🏖️', '🏫', '🏥'], '🏖️', 'Where does he go?'),
        pick('What does Yusef find on the beach?', ['🐚', '👟', '📱'], '🐚', 'What does he find?'),
        pick('What is the weather like?', ['☀️', '🌧️', '❄️'], '☀️', 'What is the weather like?'),
        pick('What does Yusef drink?', ['🧃', '🥛', '☕'], '🧃', 'What does he drink?'),
        pick('How does Yusef go home?', ['🚌', '🚲', '✈️'], '🚌', 'How does he go home?'),
      ].map((q) => ({ ...q, intro: 'On Saturday Yusef goes to the beach with his mum. The sun is hot. He swims in the sea and finds a beautiful shell. He drinks orange juice. Then he goes home on the bus.' })),
      L3: [
        notes('What\'s your cat\'s name? Lucy. L, U, C, Y.', 'Name of the cat', 'Lucy'),
        notes('Who is your friend? Pat. P, A, T.', 'Name of the friend', 'Pat'),
        notes('How many chairs are there? There are eleven.', 'Number of chairs', '11'),
        notes('What\'s the name of the shop? Shell. S, H, E, L, L.', 'Name of the shop', 'Shell'),
        notes('How old is your sister? She\'s six.', 'Age of the sister', '6'),
        notes('What\'s the horse\'s name? Wendy. W, E, N, D, Y.', 'Name of the horse', 'Wendy'),
        notes('How many pencils are in the box? Twenty.', 'Number of pencils', '20'),
      ],
      L4: [
        reply('Where is your pen?', ['It\'s in my bag.', 'It\'s blue.', 'I\'m six.'], 'It\'s in my bag.'),
        reply('Can you swim?', ['Yes, I can.', 'Yes, I am.', 'It\'s a fish.'], 'Yes, I can.'),
        reply('Would you like some juice?', ['Yes, please.', 'I\'m Tina.', 'It\'s my juice.'], 'Yes, please.'),
        reply('What\'s your favourite animal?', ['Monkeys!', 'Red!', 'Nine!'], 'Monkeys!'),
        reply('Who is that?', ['That\'s my brother.', 'That\'s my book.', 'That\'s blue.'], 'That\'s my brother.'),
      ],
      L5: [
        place('Put the duck next to the boat.', '🦆', PARK, 'boat'),
        place('Put the bird in the tree.', '🐦', PARK, 'tree'),
        place('Put the dog in front of the house.', '🐕', PARK, 'house'),
        colour('Colour the flower yellow.', ['🌷', '🏠', '🚗', '⛵'], '🌷', 'yellow'),
        colour('Now colour the boat orange.', ['🌷', '🏠', '🚗', '⛵'], '⛵', 'orange'),
        place('Put the snake under the car.', '🐍', PARK, 'car'),
      ],
    },
  }
})(globalThis)
