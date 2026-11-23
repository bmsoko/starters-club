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

      {
        id: 'L-T2',
        title: 'Listening · Test 2',
        tasks: [
          task('L1', {
            example: pick('The duck is in the water.', ['🦆🌊', '🦆🌳', '🐄🌊'], '🦆🌊'),
            questions: [
              pick('The woman has got long hair and glasses.', ['👩‍🦰👓', '👩‍🦰', '👨👓'], '👩‍🦰👓'),
              pick('There are four eggs in the box.', ['🥚🥚🥚🥚📦', '🥚🥚📦', '🍎🍎🍎🍎📦'], '🥚🥚🥚🥚📦'),
            ],
          }),
          task('L2', {
            intro: 'My name is Alex. On Sunday I go to the zoo with my grandma. First we see the monkeys. They are very funny! Then we see a big elephant. It is drinking water. We have lunch next to the lake. I eat a burger and Grandma eats a salad. At the end I buy a toy tiger. I love the zoo!',
            example: pick('Where does Alex go?', ['🦁', '🏫', '🏥'], '🦁', 'Where does Alex go?'),
            questions: [
              pick('Who goes with Alex?', ['👵', '👨', '👧'], '👵', 'Who goes with Alex?'),
              pick('What do they see first?', ['🐒', '🐘', '🐍'], '🐒', 'What do they see first?'),
              pick('What is the elephant doing?', ['🐘💧', '🐘😴', '🐘🍌'], '🐘💧', 'What is the elephant doing?'),
              pick('What does Alex eat?', ['🍔', '🥗', '🍕'], '🍔', 'What does Alex eat?'),
              pick('What does Alex buy?', ['🐯', '🦒', '🐻'], '🐯', 'What does Alex buy?'),
            ],
          }),
          task('L3', {
            example: notes('What\'s your name? Kim. K, I, M.', 'Name of the girl', 'Kim'),
            questions: [
              notes('What\'s your fish called? Nemo? No, it\'s Bob. B, O, B.', 'Name of the fish', 'Bob'),
              notes('How many children are in your class? Eighteen.', 'Children in the class', '18'),
              notes('What\'s your friend\'s name? Yusef. Y, U, S, E, F.', 'Name of the friend', 'Yusef'),
              notes('How old is your grandpa? He\'s... no, sorry. How old is your cousin? She\'s twelve.', 'Age of the cousin', '12'),
              notes('What\'s the name of your school? Hill School. H, I, L, L.', 'Name of the school: … School', 'Hill'),
            ],
          }),
          task('L4', {
            example: reply('Good morning!', ['Good morning!', 'Goodbye!', 'Yes, I can.'], 'Good morning!'),
            questions: [
              reply('What\'s your favourite food?', ['Pizza!', 'Blue!', 'My dog!'], 'Pizza!'),
              reply('Have you got a pet?', ['Yes, I have.', 'Yes, I do.', 'Yes, it is.'], 'Yes, I have.'),
              reply('Where do you live?', ['In a flat.', 'I\'m eight.', 'With a ball.'], 'In a flat.'),
            ],
          }),
          task('L5', {
            example: place('Put the fish in the boat.', '🐟', PARK, 'boat'),
            questions: [
              place('Look at the cat. Put the cat in the tree.', '🐈', PARK, 'tree'),
              place('Put the bike next to the house.', '🚲', PARK, 'house'),
              place('Now the frog. Put the frog under the car.', '🐸', PARK, 'car'),
              colour('Colour the ball blue.', ['⚽', '🎈', '🧦', '🪣'], '⚽', 'blue'),
              colour('Can you see the sock? Colour the sock pink.', ['⚽', '🎈', '🧦', '🪣'], '🧦', 'pink'),
            ],
          }),
        ],
      },
      {
        id: 'L-T3',
        title: 'Listening · Test 3',
        tasks: [
          task('L1', {
            example: pick('The boy is running.', ['👦🏃', '👦🏊', '👧🏃'], '👦🏃'),
            questions: [
              pick('There is a big ship on the sea.', ['🚢🌊', '⛵🌊', '🚢🏙️'], '🚢🌊'),
              pick('The baby is crying.', ['👶😭', '👶😀', '👴😭'], '👶😭'),
            ],
          }),
          task('L2', {
            intro: 'Hi, I\'m Grace. Today it is raining, so I play at home with my brother Tom. We play a game on the computer. Then we draw pictures. I draw a horse and Tom draws a train. Mum makes some cookies. At six o\'clock Dad comes home. He has got a new ball for us!',
            example: pick('What is the weather like?', ['🌧️', '☀️', '❄️'], '🌧️', 'What is the weather like?'),
            questions: [
              pick('Who does Grace play with?', ['👦', '👵', '🐕'], '👦', 'Who does Grace play with?'),
              pick('What do they play first?', ['💻', '⚽', '🎸'], '💻', 'What do they play first?'),
              pick('What does Grace draw?', ['🐴', '🚂', '🏠'], '🐴', 'What does Grace draw?'),
              pick('What does Mum make?', ['🍪', '🍕', '🍝'], '🍪', 'What does Mum make?'),
              pick('What has Dad got?', ['⚽', '🪁', '📕'], '⚽', 'What has Dad got?'),
            ],
          }),
          task('L3', {
            example: notes('How many dogs have you got? Two.', 'Number of dogs', '2'),
            questions: [
              notes('What\'s your teacher\'s name? Mr Brown. B, R, O, W, N.', 'Name of the teacher: Mr …', 'Brown'),
              notes('How many apples are there? Thirteen.', 'Number of apples', '13'),
              notes('What\'s your baby brother\'s name? Dan. D, A, N.', 'Name of the baby', 'Dan'),
              notes('What\'s the name of the park? Rose Park. R, O, S, E.', 'Name of the park: … Park', 'Rose'),
              notes('How old is Anna? She\'s ten.', 'Age of Anna', '10'),
            ],
          }),
          task('L4', {
            example: reply('Thank you!', ['You\'re welcome!', 'Yes, please.', 'I\'m six.'], 'You\'re welcome!'),
            questions: [
              reply('Can I have a pencil, please?', ['Here you are.', 'Yes, I am.', 'It\'s Monday.'], 'Here you are.'),
              reply('How many brothers have you got?', ['One.', 'Blue.', 'Yes.'], 'One.'),
              reply('What are you doing?', ['I\'m reading.', 'I\'m seven.', 'I\'m Tom.'], 'I\'m reading.'),
            ],
          }),
          task('L5', {
            example: place('Put the shoe under the bed.', '👟', ROOM, 'bed'),
            questions: [
              place('Put the clock on the window.', '⏰', ROOM, 'window'),
              place('Can you see the doll? Put the doll in the box.', '🪆', ROOM, 'box'),
              place('Now put the lamp next to the door.', '💡', ROOM, 'door'),
              colour('Look at the hat. Colour the hat brown.', ['🎩', '👗', '👟', '🧢'], '🎩', 'brown'),
              colour('Now colour the dress yellow, please.', ['🎩', '👗', '👟', '🧢'], '👗', 'yellow'),
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
      L2: [...[
        pick('Where does Yusef go on Saturday?', ['🏖️', '🏫', '🏥'], '🏖️', 'Where does he go?'),
        pick('What does Yusef find on the beach?', ['🐚', '👟', '📱'], '🐚', 'What does he find?'),
        pick('What is the weather like?', ['☀️', '🌧️', '❄️'], '☀️', 'What is the weather like?'),
        pick('What does Yusef drink?', ['🧃', '🥛', '☕'], '🧃', 'What does he drink?'),
        pick('How does Yusef go home?', ['🚌', '🚲', '✈️'], '🚌', 'How does he go home?'),
      ].map((q) => ({ ...q, intro: 'On Saturday Yusef goes to the beach with his mum. The sun is hot. He swims in the sea and finds a beautiful shell. He drinks orange juice. Then he goes home on the bus.' })), ...[
        pick('What does Wendy have for breakfast?', ['🥚🍞', '🍕', '🍰'], '🥚🍞', 'What does Wendy eat?'),
        pick('How does Wendy go to school?', ['🚲', '🚌', '🚗'], '🚲', 'How does she go to school?'),
        pick('What is Wendy\'s favourite lesson?', ['🎨', '🔢', '⚽'], '🎨', 'What is her favourite lesson?'),
        pick('Who sits next to Wendy?', ['👧', '👦', '👩‍🏫'], '👧', 'Who sits next to her?'),
      ].map((q) => ({ ...q, intro: 'Wendy gets up at seven o\'clock. She eats eggs and bread for breakfast. She rides her bike to school. Her favourite lesson is art because she loves painting. Her best friend Jill sits next to her.' }))],
      L3: [
        notes('What\'s your cat\'s name? Lucy. L, U, C, Y.', 'Name of the cat', 'Lucy'),
        notes('Who is your friend? Pat. P, A, T.', 'Name of the friend', 'Pat'),
        notes('How many chairs are there? There are eleven.', 'Number of chairs', '11'),
        notes('What\'s the name of the shop? Shell. S, H, E, L, L.', 'Name of the shop', 'Shell'),
        notes('How old is your sister? She\'s six.', 'Age of the sister', '6'),
        notes('What\'s the horse\'s name? Wendy. W, E, N, D, Y.', 'Name of the horse', 'Wendy'),
        notes('How many pencils are in the box? Twenty.', 'Number of pencils', '20'),
        notes('What\'s the name of your robot? Toby. T, O, B, Y.', 'Name of the robot', 'Toby'),
        notes('How many cows are on the farm? Seventeen.', 'Number of cows', '17'),
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
        place('Put the robot on the sofa.', '🤖', ROOM, 'sofa'),
        colour('Colour the balloon red.', ['🎈', '🪁', '🧸', '🚗'], '🎈', 'red'),
      ],
    },
  }
})(globalThis)
