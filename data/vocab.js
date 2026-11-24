// Starters VOCABULARY by topic. Topics and words follow the Cambridge
// Pre A1 Starters Digital wordlist (topic list + alphabetic list).
// Pictures, Spanish meanings (Argentina) and example sentences are written
// for Starters Club. Not official Cambridge material.
//
//   topic {id, title, es, icon, words:[{en, es, pic | swatch}], phrases:[{en, es}]}
//   pic: emoji or short text shown as the picture; swatch: a colour (CSS)
;(function (g) {
  const D = (g.SC_DATA = g.SC_DATA || {})
  const w = (list) => list.map(([en, pic, es]) => ({ en, pic, es }))
  const p = (list) => list.map(([en, es]) => ({ en, es }))

  D.vocab = {
    topics: [
      {
        id: 'animals', title: 'Animals', es: 'Animales', icon: '🐵',
        words: w([
          ['bear', '🐻', 'oso'], ['bee', '🐝', 'abeja'], ['bird', '🐦', 'pájaro'], ['bug', '🐛', 'bicho'],
          ['cat', '🐈', 'gato'], ['chicken', '🐔', 'gallina'], ['cow', '🐄', 'vaca'], ['crocodile', '🐊', 'cocodrilo'],
          ['dog', '🐕', 'perro'], ['duck', '🦆', 'pato'], ['elephant', '🐘', 'elefante'], ['fish', '🐟', 'pez'],
          ['fox', '🦊', 'zorro'], ['frog', '🐸', 'rana'], ['giraffe', '🦒', 'jirafa'], ['goat', '🐐', 'cabra'],
          ['hippo', '🦛', 'hipopótamo'], ['horse', '🐴', 'caballo'], ['lizard', '🦎', 'lagartija'], ['monkey', '🐒', 'mono'],
          ['mouse', '🐭', 'ratón'], ['panda', '🐼', 'panda'], ['sheep', '🐑', 'oveja'], ['snake', '🐍', 'serpiente'],
          ['spider', '🕷️', 'araña'], ['tiger', '🐯', 'tigre'], ['zebra', '🦓', 'cebra'],
        ]),
        phrases: p([
          ['Do you like horses? Yes, I do.', '¿Te gustan los caballos? Sí.'],
          ['I love pandas. So do I!', 'Me encantan los pandas. ¡A mí también!'],
          ['Look! The monkey has got a long tail.', '¡Mirá! El mono tiene una cola larga.'],
        ]),
      },
      {
        id: 'body', title: 'The body and the face', es: 'El cuerpo y la cara', icon: '🙂',
        words: w([
          ['arm', '💪', 'brazo'], ['hand', '✋', 'mano'], ['ear', '👂', 'oreja'], ['eye', '👁️', 'ojo'],
          ['mouth', '👄', 'boca'], ['nose', '👃', 'nariz'], ['foot', '🦶', 'pie'], ['leg', '🦵', 'pierna'],
          ['hair', '💇', 'pelo'], ['face', '🙂', 'cara'], ['smile', '😁', 'sonrisa'],
        ]),
        phrases: p([
          ['I\'ve got short hair.', 'Tengo el pelo corto.'],
          ['She\'s got green eyes.', 'Ella tiene ojos verdes.'],
          ['Draw a face with two eyes and a big smile.', 'Dibujá una cara con dos ojos y una sonrisa grande.'],
        ]),
      },
      {
        id: 'clothes', title: 'Clothes', es: 'La ropa', icon: '👕',
        words: w([
          ['bag', '👜', 'cartera'], ['boots', '🥾', 'botas'], ['cap', '🧢', 'gorra'], ['coat', '🧥', 'abrigo'],
          ['dress', '👗', 'vestido'], ['glasses', '👓', 'anteojos'], ['hat', '🎩', 'sombrero'], ['jeans', '👖', 'jean'],
          ['shirt', '👔', 'camisa'], ['shoe', '👞', 'zapato'], ['shorts', '🩳', 'short'], ['sock', '🧦', 'media'],
          ['T-shirt', '👕', 'remera'],
        ]),
        phrases: p([
          ['What are you wearing? I\'m wearing a red cap.', '¿Qué tenés puesto? Tengo una gorra roja.'],
          ['Get your coat and your hat!', '¡Agarrá tu abrigo y tu sombrero!'],
          ['I like your new shoes!', '¡Me gustan tus zapatos nuevos!'],
        ]),
      },
      {
        id: 'colours', title: 'Colours', es: 'Los colores', icon: '🎨',
        words: [
          ['black', 'negro'], ['blue', 'azul'], ['brown', 'marrón'], ['green', 'verde'], ['grey', 'gris'],
          ['orange', 'naranja'], ['pink', 'rosa'], ['purple', 'violeta'], ['red', 'rojo'], ['white', 'blanco'], ['yellow', 'amarillo'],
        ].map(([en, es]) => ({ en, es, swatch: en })),
        phrases: p([
          ['What colour is the kite? It\'s red and blue.', '¿De qué color es el barrilete? Es rojo y azul.'],
          ['My favourite colour is green.', 'Mi color favorito es el verde.'],
          ['Which is the yellow one? This one!', '¿Cuál es el amarillo? ¡Este!'],
        ]),
      },
      {
        id: 'family', title: 'Family & friends', es: 'Familia y amigos', icon: '👨‍👩‍👧',
        words: w([
          ['baby', '👶', 'bebé'], ['boy', '👦', 'nene'], ['girl', '👧', 'nena'], ['man', '👨', 'hombre'],
          ['woman', '👩', 'mujer'], ['grandpa', '👴', 'abuelo'], ['grandma', '👵', 'abuela'], ['family', '👨‍👩‍👧‍👦', 'familia'],
          ['friend', '🤝', 'amigo'], ['children', '🧒🧒', 'chicos'], ['mum', '🤱', 'mamá'], ['dad', '👨‍👧', 'papá'],
        ]),
        phrases: p([
          ['Who\'s in your family?', '¿Quiénes son tu familia?'],
          ['Have you got a brother? Yes, I have.', '¿Tenés un hermano? Sí.'],
          ['How old is your sister? She\'s five.', '¿Cuántos años tiene tu hermana? Tiene cinco.'],
        ]),
      },
      {
        id: 'feelings', title: 'Feelings', es: 'Sentimientos', icon: '😀',
        words: w([
          ['happy', '😀', 'contento'], ['sad', '😢', 'triste'], ['angry', '😠', 'enojado'], ['scared', '😨', 'asustado'],
          ['tired', '😴', 'cansado'], ['sorry', '😔', 'perdón'], ['cry', '😭', 'llorar'], ['smile', '😊', 'sonreír'],
        ]),
        phrases: p([
          ['Are you happy today? Yes, I am!', '¿Estás contento hoy? ¡Sí!'],
          ['I\'m very sorry.', 'Perdón, de verdad.'],
          ['Don\'t worry!', '¡No te preocupes!'],
        ]),
      },
      {
        id: 'food', title: 'Food & drink', es: 'Comida y bebida', icon: '🍎',
        words: w([
          ['apple', '🍎', 'manzana'], ['banana', '🍌', 'banana'], ['bean', '🫘', 'poroto'], ['bread', '🍞', 'pan'],
          ['breakfast', '🥣', 'desayuno'], ['burger', '🍔', 'hamburguesa'], ['cake', '🍰', 'torta'], ['carrot', '🥕', 'zanahoria'],
          ['cheese', '🧀', 'queso'], ['chicken', '🍗', 'pollo'], ['chips', '🍟', 'papas fritas'], ['chocolate', '🍫', 'chocolate'],
          ['coconut', '🥥', 'coco'], ['egg', '🥚', 'huevo'], ['grape', '🍇', 'uva'], ['ice cream', '🍦', 'helado'],
          ['juice', '🧃', 'jugo'], ['kiwi', '🥝', 'kiwi'], ['lemon', '🍋', 'limón'], ['mango', '🥭', 'mango'],
          ['meat', '🥩', 'carne'], ['milk', '🥛', 'leche'], ['orange', '🍊', 'naranja'], ['pea', '🫛', 'arveja'],
          ['pear', '🍐', 'pera'], ['pie', '🥧', 'tarta'], ['pizza', '🍕', 'pizza'], ['potato', '🥔', 'papa'],
          ['rice', '🍚', 'arroz'], ['salad', '🥗', 'ensalada'], ['sweets', '🍬', 'caramelos'], ['tomato', '🍅', 'tomate'],
          ['water', '💧', 'agua'], ['watermelon', '🍉', 'sandía'],
        ]),
        phrases: p([
          ['What\'s your favourite food? I really like pizza.', '¿Cuál es tu comida favorita? Me gusta mucho la pizza.'],
          ['Can I have some salad, please? Yes, here you are.', '¿Me das un poco de ensalada, por favor? Sí, acá tenés.'],
          ['Would you like a banana? No, thank you.', '¿Querés una banana? No, gracias.'],
        ]),
      },
      {
        id: 'home', title: 'The home', es: 'La casa', icon: '🏠',
        words: w([
          ['bath', '🛁', 'bañadera'], ['bed', '🛏️', 'cama'], ['bookcase', '📚', 'biblioteca'], ['box', '📦', 'caja'],
          ['camera', '📷', 'cámara'], ['chair', '🪑', 'silla'], ['clock', '⏰', 'reloj'], ['computer', '💻', 'computadora'],
          ['cup', '☕', 'taza'], ['door', '🚪', 'puerta'], ['flower', '🌷', 'flor'], ['house', '🏠', 'casa'],
          ['kitchen', '🍳', 'cocina'], ['lamp', '💡', 'lámpara'], ['mirror', '🪞', 'espejo'], ['phone', '📱', 'teléfono'],
          ['picture', '🖼️', 'cuadro'], ['sofa', '🛋️', 'sillón'], ['television', '📺', 'tele'], ['tree', '🌳', 'árbol'],
          ['window', '🪟', 'ventana'], ['watch', '⌚', 'reloj de pulsera'], ['garden', '🏡', 'jardín'],
        ]),
        phrases: p([
          ['Where do you live? I live in a house.', '¿Dónde vivís? Vivo en una casa.'],
          ['Where are your toys? They\'re under the bed.', '¿Dónde están tus juguetes? Están abajo de la cama.'],
          ['There\'s a sofa and a TV in the living room.', 'Hay un sillón y una tele en el living.'],
        ]),
      },
      {
        id: 'places', title: 'Places & directions', es: 'Lugares y direcciones', icon: '🏞️',
        words: w([
          ['park', '🏞️', 'parque'], ['playground', '🛝', 'plaza de juegos'], ['shop', '🏪', 'negocio'], ['bookshop', '📖', 'librería'],
          ['street', '🛣️', 'calle'], ['zoo', '🦁', 'zoológico'], ['school', '🏫', 'escuela'], ['beach', '🏖️', 'playa'],
          ['in', '🐈📦', 'adentro de'], ['on', '📦🐈', 'arriba de'], ['under', '🪑🐕', 'abajo de'], ['next to', '🐕🐈', 'al lado de'],
        ]),
        phrases: p([
          ['Where is the bookshop? It\'s next to the park.', '¿Dónde está la librería? Está al lado del parque.'],
          ['The cat is under the table.', 'El gato está abajo de la mesa.'],
          ['Can I go to the playground, Mum? Yes, OK.', '¿Puedo ir a la plaza, mamá? Sí, dale.'],
        ]),
      },
      {
        id: 'school', title: 'School', es: 'La escuela', icon: '🏫',
        words: w([
          ['book', '📕', 'libro'], ['crayon', '🖍️', 'crayón'], ['pen', '🖊️', 'lapicera'], ['pencil', '✏️', 'lápiz'],
          ['paper', '📄', 'papel'], ['ruler', '📏', 'regla'], ['teacher', '🧑‍🏫', 'maestra'], ['school', '🏫', 'escuela'],
          ['alphabet', '🔤', 'abecedario'], ['number', '🔢', 'número'], ['question', '❓', 'pregunta'], ['write', '✍️', 'escribir'],
          ['listen', '🎧', 'escuchar'], ['look', '👀', 'mirar'], ['point', '👉', 'señalar'], ['keyboard', '⌨️', 'teclado'],
          ['mouse', '🖱️', 'mouse'], ['music', '🎵', 'música'], ['painting', '🎨', 'pintura'],
        ]),
        phrases: p([
          ['How do you spell dog? D, O, G.', '¿Cómo se escribe dog? D, O, G.'],
          ['Open your books, please.', 'Abran los libros, por favor.'],
          ['Sorry, I don\'t understand.', 'Perdón, no entiendo.'],
        ]),
      },
      {
        id: 'sports', title: 'Sports & leisure', es: 'Deportes y tiempo libre', icon: '⚽',
        words: w([
          ['football', '⚽', 'fútbol'], ['baseball', '⚾', 'béisbol'], ['basketball', '🏀', 'básquet'], ['tennis', '🎾', 'tenis'],
          ['table tennis', '🏓', 'ping-pong'], ['beach', '🏖️', 'playa'], ['bike', '🚲', 'bici'], ['drum', '🥁', 'tambor'],
          ['guitar', '🎸', 'guitarra'], ['piano', '🎹', 'piano'], ['kite', '🪁', 'barrilete'], ['fishing', '🎣', 'pescar'],
          ['swim', '🏊', 'nadar'], ['run', '🏃', 'correr'], ['sing', '🎤', 'cantar'], ['paint', '🖌️', 'pintar'],
          ['party', '🥳', 'fiesta'], ['photo', '📸', 'foto'], ['skateboard', '🛹', 'skate'], ['walk', '🚶', 'caminar'],
        ]),
        phrases: p([
          ['What do you like doing? I love swimming.', '¿Qué te gusta hacer? Me encanta nadar.'],
          ['Can you catch a ball? Yes, I can.', '¿Podés agarrar una pelota? Sí, puedo.'],
          ['Let\'s play football in the park!', '¡Juguemos al fútbol en el parque!'],
        ]),
      },
      {
        id: 'time', title: 'Time', es: 'El tiempo', icon: '⏰',
        words: w([
          ['morning', '🌅', 'mañana'], ['afternoon', '🌤️', 'tarde'], ['evening', '🌆', 'atardecer'], ['night', '🌙', 'noche'],
          ['birthday', '🎂', 'cumpleaños'], ['day', '☀️', 'día'], ['year', '📅', 'año'], ['clock', '🕰️', 'reloj'],
        ]),
        phrases: p([
          ['I eat breakfast in the morning.', 'Desayuno a la mañana.'],
          ['It\'s my birthday today. I\'m seven!', 'Hoy es mi cumpleaños. ¡Tengo siete!'],
          ['Good night!', '¡Buenas noches!'],
        ]),
      },
      {
        id: 'toys', title: 'Toys', es: 'Juguetes', icon: '🧸',
        words: w([
          ['alien', '👽', 'extraterrestre'], ['ball', '⚽', 'pelota'], ['balloon', '🎈', 'globo'], ['board game', '🎲', 'juego de mesa'],
          ['car', '🚗', 'auto'], ['doll', '🪆', 'muñeca'], ['helicopter', '🚁', 'helicóptero'], ['monster', '👾', 'monstruo'],
          ['motorbike', '🏍️', 'moto'], ['plane', '✈️', 'avión'], ['robot', '🤖', 'robot'], ['teddy', '🧸', 'osito de peluche'],
          ['train', '🚂', 'tren'], ['truck', '🚚', 'camión'], ['video game', '🎮', 'videojuego'], ['scooter', '🛴', 'monopatín'],
        ]),
        phrases: p([
          ['What toys do you like? I like robots.', '¿Qué juguetes te gustan? Me gustan los robots.'],
          ['Have you got a scooter? Yes, it\'s my favourite toy.', '¿Tenés monopatín? Sí, es mi juguete favorito.'],
          ['I like your new video game! Thanks!', '¡Me gusta tu videojuego nuevo! ¡Gracias!'],
        ]),
      },
      {
        id: 'transport', title: 'Transport', es: 'Transporte', icon: '🚌',
        words: w([
          ['bike', '🚲', 'bici'], ['bus', '🚌', 'colectivo'], ['car', '🚗', 'auto'], ['boat', '⛵', 'bote'],
          ['ship', '🚢', 'barco'], ['train', '🚂', 'tren'], ['plane', '✈️', 'avión'], ['helicopter', '🚁', 'helicóptero'],
          ['motorbike', '🏍️', 'moto'], ['truck', '🚚', 'camión'], ['van', '🚐', 'camioneta'], ['scooter', '🛴', 'monopatín'],
        ]),
        phrases: p([
          ['I go to school on the bus.', 'Voy a la escuela en colectivo.'],
          ['Look, there\'s a blue van!', '¡Mirá, hay una camioneta azul!'],
          ['Can you ride a bike? Yes, I can.', '¿Sabés andar en bici? Sí.'],
        ]),
      },
      {
        id: 'world', title: 'The world around us', es: 'El mundo que nos rodea', icon: '🌳',
        words: w([
          ['beach', '🏖️', 'playa'], ['sea', '🌊', 'mar'], ['shell', '🐚', 'caracol de mar'], ['sand', '🏝️', 'arena'],
          ['sun', '☀️', 'sol'], ['tree', '🌳', 'árbol'], ['water', '💧', 'agua'], ['flower', '🌸', 'flor'],
          ['park', '🏞️', 'parque'], ['street', '🛣️', 'calle'],
        ]),
        phrases: p([
          ['There are lots of shells on the beach.', 'Hay muchos caracoles en la playa.'],
          ['I can see a fish in the pond.', 'Veo un pez en el estanque.'],
          ['We\'ve got five trees in our garden.', 'Tenemos cinco árboles en nuestro jardín.'],
        ]),
      },
      {
        id: 'numbers', title: 'Numbers 1–20', es: 'Números del 1 al 20', icon: '🔢',
        words: [
          'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten',
          'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen', 'twenty',
        ].map((en, i) => ({
          en, pic: String(i + 1),
          es: ['uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve', 'diez', 'once', 'doce', 'trece',
            'catorce', 'quince', 'dieciséis', 'diecisiete', 'dieciocho', 'diecinueve', 'veinte'][i],
        })),
        phrases: p([
          ['How old are you? I\'m seven.', '¿Cuántos años tenés? Tengo siete.'],
          ['How many crocodiles are there? Three.', '¿Cuántos cocodrilos hay? Tres.'],
          ['Count to ten with me!', '¡Contá hasta diez conmigo!'],
        ]),
      },
    ],
  }
})(globalThis)
