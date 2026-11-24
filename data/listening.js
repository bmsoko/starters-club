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
            intro: 'G: Hello! I am Tina. Today is my birthday. My friend Sam comes to my house. He has got a present for me. It is a big kite! We go to the park. We fly the kite. Then we eat cake and ice cream. My dog Spot eats a sausage. What a happy day!',
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
            example: notes('W: What is the boy\'s name? | G: It\'s Ben. B, E, N.', 'Name of the boy', 'Ben'),
            questions: [
              notes('M: What is your teacher\'s name? | B: It\'s Miss Grey. G, R, E, Y.', 'Name of the teacher: Miss …', 'Grey'),
              notes('W: What is your dog\'s name? | B: Spot. S, P, O, T.', 'Name of the dog', 'Spot'),
              notes('M: How old is your brother? | G: He is nine.', 'Age of the brother', '9'),
              notes('W: What is the name of your street? | B: Park Street. P, A, R, K.', 'Name of the street: … Street', 'Park'),
              notes('M: How many books have you got? | B: I\'ve got fourteen books.', 'Number of books', '14'),
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
            intro: 'B: My name is Alex. On Sunday I go to the zoo with my grandma. First we see the monkeys. They are very funny! Then we see a big elephant. It is drinking water. We have lunch next to the lake. I eat a burger and Grandma eats a salad. At the end I buy a toy tiger. I love the zoo!',
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
            example: notes('W: What\'s your name? | G: Kim. K, I, M.', 'Name of the girl', 'Kim'),
            questions: [
              notes('M: What\'s your fish called? | B: Nemo? No, it\'s Bob. B, O, B.', 'Name of the fish', 'Bob'),
              notes('W: How many children are in your class? | B: Eighteen.', 'Children in the class', '18'),
              notes('M: What\'s your friend\'s name? | G: Yusef. Y, U, S, E, F.', 'Name of the friend', 'Yusef'),
              notes('W: How old is your cousin? Is she eleven? | B: No, she\'s twelve.', 'Age of the cousin', '12'),
              notes('M: What\'s the name of your school? | B: Hill School. H, I, L, L.', 'Name of the school: … School', 'Hill'),
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
            intro: 'G: Hi, I\'m Grace. Today it is raining, so I play at home with my brother Tom. We play a game on the computer. Then we draw pictures. I draw a horse and Tom draws a train. Mum makes some cookies. At six o\'clock Dad comes home. He has got a new ball for us!',
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
            example: notes('W: How many dogs have you got? | G: Two.', 'Number of dogs', '2'),
            questions: [
              notes('M: What\'s your teacher\'s name? | B: Mr Brown. B, R, O, W, N.', 'Name of the teacher: Mr …', 'Brown'),
              notes('W: How many apples are there? | B: Thirteen.', 'Number of apples', '13'),
              notes('M: What\'s your baby brother\'s name? | G: Dan. D, A, N.', 'Name of the baby', 'Dan'),
              notes('W: What\'s the name of the park? | B: Rose Park. R, O, S, E.', 'Name of the park: … Park', 'Rose'),
              notes('M: How old is Anna? | B: She\'s ten.', 'Age of Anna', '10'),
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
      {
        id: 'L-T4',
        title: 'Listening · Test 4',
        tasks: [
          task('L1', {
            example: pick('There are five ducks.', ['🦆🦆🦆🦆🦆', '🦆🦆🦆', '🐔🐔🐔🐔🐔'], '🦆🦆🦆🦆🦆'),
            questions: [
              pick('The man is reading a book.', ['👨📖', '👨📺', '👩📖'], '👨📖'),
              pick('The girl has got a big dog.', ['👧🐕', '👧🐈', '👦🐕'], '👧🐕'),
            ],
          }),
          task('L2', {
            intro: 'B: Hello, I\'m Nick. On Saturday morning I go to the farm with my dad. There are lots of animals. I give the horse an apple. My dad takes a photo of the cows. Then we eat sandwiches in the garden. In the afternoon it rains, so we go home in the car.',
            example: pick('Where does Nick go?', ['🚜', '🏖️', '🏫'], '🚜', 'Where does Nick go?'),
            questions: [
              pick('Who goes with Nick?', ['👨', '👵', '👧'], '👨', 'Who goes with Nick?'),
              pick('What does Nick give the horse?', ['🍎', '🥕', '🍌'], '🍎', 'What does the horse eat?'),
              pick('What does Dad take a photo of?', ['🐄', '🐑', '🐐'], '🐄', 'What is in Dad\'s photo?'),
              pick('What do they eat in the garden?', ['🥪', '🍕', '🍝'], '🥪', 'What do they eat?'),
              pick('How do they go home?', ['🚗', '🚌', '🚲'], '🚗', 'How do they go home?'),
            ],
          }),
          task('L3', {
            example: notes('W: What\'s your name? | B: Sam. S, A, M.', 'Name of the boy', 'Sam'),
            questions: [
              notes('M: What\'s your sister\'s name? | G: Jill. J, I, L, L.', 'Name of the sister', 'Jill'),
              notes('W: How many birds are in the tree? | B: Seven.', 'Number of birds', '7'),
              notes('M: What\'s your grandma\'s name? | G: Grandma May. M, A, Y.', 'Name of the grandma: Grandma …', 'May'),
              notes('W: How old is your friend Tom? | B: He\'s eight.', 'Age of Tom', '8'),
              notes('M: How many pens have you got? | G: Fifteen.', 'Number of pens', '15'),
            ],
          }),
          task('L4', {
            example: reply('Goodbye!', ['Bye! See you!', 'Yes, I do.', 'It\'s red.'], 'Bye! See you!'),
            questions: [
              reply('What\'s your favourite colour?', ['Green.', 'Ten.', 'Yes, please.'], 'Green.'),
              reply('Do you like apples?', ['Yes, I do.', 'Yes, I am.', 'It\'s an apple.'], 'Yes, I do.'),
              reply('Where is your cat?', ['It\'s under the table.', 'It\'s black.', 'I like cats.'], 'It\'s under the table.'),
            ],
          }),
          task('L5', {
            example: place('Put the bag on the bed.', '🎒', ROOM, 'bed'),
            questions: [
              place('Put the guitar next to the sofa.', '🎸', ROOM, 'sofa'),
              place('Can you see the computer? Put the computer on the box.', '💻', ROOM, 'box'),
              place('Now the jacket. Put the jacket on the door.', '🧥', ROOM, 'door'),
              colour('Look at the bike. Colour the bike red.', ['🚲', '🛴', '🪁', '⚽'], '🚲', 'red'),
              colour('Now colour the kite pink.', ['🚲', '🛴', '🪁', '⚽'], '🪁', 'pink'),
            ],
          }),
        ],
      },
      {
        id: 'L-T5',
        title: 'Listening · Test 5',
        tasks: [
          task('L1', {
            example: pick('The bird is in the tree.', ['🐦🌳', '🐦🏠', '🐱🌳'], '🐦🌳'),
            questions: [
              pick('There are two bananas.', ['🍌🍌', '🍌🍌🍌', '🍋🍋'], '🍌🍌'),
              pick('The girl is swimming.', ['👧🏊', '👧🏃', '👦🏊'], '👧🏊'),
            ],
          }),
          task('L2', {
            intro: 'G: Hi! My name is Sue. It is Monday and I am at school. In the morning we read a story about a crocodile. At lunch I eat chicken and rice. In the afternoon we play basketball. After school my mum comes and we go to the shop. She buys me a new pencil.',
            example: pick('Where is Sue?', ['🏫', '🏖️', '🏥'], '🏫', 'Where is Sue today?'),
            questions: [
              pick('What is the story about?', ['🐊', '🦁', '🐸'], '🐊', 'What is the story about?'),
              pick('What does Sue eat at lunch?', ['🍗🍚', '🍔🍟', '🍕'], '🍗🍚', 'What does Sue eat?'),
              pick('What do they play in the afternoon?', ['🏀', '⚽', '🎾'], '🏀', 'What do they play?'),
              pick('Who comes after school?', ['👩', '👨', '👵'], '👩', 'Who comes after school?'),
              pick('What does Mum buy?', ['✏️', '📕', '👟'], '✏️', 'What does Mum buy?'),
            ],
          }),
          task('L3', {
            example: notes('W: What\'s your teacher\'s name? | G: Miss Green. G, R, E, E, N.', 'Name of the teacher: Miss …', 'Green'),
            questions: [
              notes('M: What\'s your rabbit called? | B: Tony. T, O, N, Y.', 'Name of the rabbit', 'Tony'),
              notes('W: How many cakes are there? | G: Nine.', 'Number of cakes', '9'),
              notes('M: What\'s the name of your street? | G: Lake Street. L, A, K, E.', 'Name of the street: … Street', 'Lake'),
              notes('W: How old is your baby sister? | B: She\'s one.', 'Age of the baby', '1'),
              notes('M: How many children are in the park? | B: Sixteen.', 'Children in the park', '16'),
            ],
          }),
          task('L4', {
            example: reply('How are you?', ['I\'m fine, thank you.', 'I\'m Sam.', 'It\'s a cat.'], 'I\'m fine, thank you.'),
            questions: [
              reply('What\'s that?', ['It\'s my new kite.', 'I\'m happy.', 'Yes, I can.'], 'It\'s my new kite.'),
              reply('Can you ride a bike?', ['Yes, I can.', 'Yes, I do.', 'It\'s blue.'], 'Yes, I can.'),
              reply('Let\'s play football!', ['OK! Great!', 'It\'s seven.', 'It\'s a ball.'], 'OK! Great!'),
            ],
          }),
          task('L5', {
            example: place('Put the cat on the car.', '🐈', PARK, 'car'),
            questions: [
              place('Put the ball under the tree.', '⚽', PARK, 'tree'),
              place('Look at the horse. Put the horse next to the flower.', '🐴', PARK, 'flower'),
              place('Now the monkey. Put the monkey on the house.', '🐒', PARK, 'house'),
              colour('Can you see the fish? Colour the fish orange.', ['🐟', '🐦', '🐢', '🐸'], '🐟', 'orange'),
              colour('Colour the bird blue, please.', ['🐟', '🐦', '🐢', '🐸'], '🐦', 'blue'),
            ],
          }),
        ],
      },
      {
        id: 'L-T6',
        title: 'Listening · Test 6',
        tasks: [
          task('L1', {
            example: pick('The woman is singing.', ['👩🎤', '👩😴', '👨🎤'], '👩🎤'),
            questions: [
              pick('There are three cars.', ['🚗🚗🚗', '🚗🚗', '🚌🚌🚌'], '🚗🚗🚗'),
              pick('The boy is eating an orange.', ['👦🍊', '👦🍋', '👧🍊'], '👦🍊'),
            ],
          }),
          task('L2', {
            intro: 'B: Hi, I\'m Tom. Today my family has a picnic next to the river. My sister Kim catches a fish! Then we play with a ball. Oh no! The ball goes in the water. A big dog swims and gets it. In the evening we are very tired and we go to bed.',
            example: pick('Where is the picnic?', ['🏞️', '🏫', '🏠'], '🏞️', 'Where is the picnic?'),
            questions: [
              pick('What does Kim catch?', ['🐟', '🦆', '🐸'], '🐟', 'What does Kim catch?'),
              pick('What do they play with?', ['⚽', '🪁', '🎸'], '⚽', 'What do they play with?'),
              pick('Where does the ball go?', ['🌊', '🌳', '🚗'], '🌊', 'Where does the ball go?'),
              pick('Who gets the ball?', ['🐕', '🐈', '👨'], '🐕', 'Who gets the ball?'),
              pick('What do they do in the evening?', ['😴🛏️', '📺', '🍦'], '😴🛏️', 'What do they do in the evening?'),
            ],
          }),
          task('L3', {
            example: notes('W: How many brothers have you got? | G: Three.', 'Number of brothers', '3'),
            questions: [
              notes('M: What\'s your dog called? | B: Bill. B, I, L, L.', 'Name of the dog', 'Bill'),
              notes('W: How many trains can you see? | B: Twelve.', 'Number of trains', '12'),
              notes('M: What\'s your friend\'s name? | G: Eva. E, V, A.', 'Name of the friend', 'Eva'),
              notes('W: What\'s the name of the shop? | B: Toy Shop. T, O, Y.', 'Name of the shop: … Shop', 'Toy'),
              notes('M: How many balloons are there? | G: Nineteen.', 'Number of balloons', '19'),
            ],
          }),
          task('L4', {
            example: reply('Happy birthday!', ['Thank you!', 'I\'m happy.', 'Here you are.'], 'Thank you!'),
            questions: [
              reply('What\'s your brother\'s name?', ['Ben.', 'Eight.', 'Blue.'], 'Ben.'),
              reply('Is this your bag?', ['Yes, it is.', 'Yes, I can.', 'I\'ve got a bag.'], 'Yes, it is.'),
              reply('What can you see?', ['A big ship.', 'I\'m seven.', 'Yes, please.'], 'A big ship.'),
            ],
          }),
          task('L5', {
            example: place('Put the teddy in the box.', '🧸', ROOM, 'box'),
            questions: [
              place('Put the ball next to the bed.', '⚽', ROOM, 'bed'),
              place('Can you see the bird? Put the bird on the door.', '🐦', ROOM, 'door'),
              place('Now the shoes. Put the shoes under the sofa.', '👟', ROOM, 'sofa'),
              colour('Look at the T-shirt. Colour the T-shirt green.', ['👕', '🧢', '👖', '🧦'], '👕', 'green'),
              colour('Now colour the cap grey.', ['👕', '🧢', '👖', '🧦'], '🧢', 'grey'),
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
        pick('The girl is painting.', ['👧🎨', '👧📖', '👦🎨'], '👧🎨'),
        pick('There are four balloons.', ['🎈🎈🎈🎈', '🎈🎈', '🪁🪁🪁🪁'], '🎈🎈🎈🎈'),
        pick('The cat is sleeping on the sofa.', ['🐈😴🛋️', '🐈🍽️🛋️', '🐕😴🛋️'], '🐈😴🛋️'),
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
        notes('W: What\'s your cat\'s name? | G: Lucy. L, U, C, Y.', 'Name of the cat', 'Lucy'),
        notes('M: Who is your friend? | B: Pat. P, A, T.', 'Name of the friend', 'Pat'),
        notes('W: How many chairs are there? | B: There are eleven.', 'Number of chairs', '11'),
        notes('M: What\'s the name of the shop? | G: Shell. S, H, E, L, L.', 'Name of the shop', 'Shell'),
        notes('W: How old is your sister? | B: She\'s six.', 'Age of the sister', '6'),
        notes('M: What\'s the horse\'s name? | B: Wendy. W, E, N, D, Y.', 'Name of the horse', 'Wendy'),
        notes('W: How many pencils are in the box? | G: Twenty.', 'Number of pencils', '20'),
        notes('M: What\'s the name of your robot? | B: Toby. T, O, B, Y.', 'Name of the robot', 'Toby'),
        notes('W: How many cows are on the farm? | B: Seventeen.', 'Number of cows', '17'),
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
