// Unit 4 · Family & Homes — school unit practice (converted from DinoQuest).
// Original questions based on Estani's Unit 4 school material.
;(function (g) {
  const D = (g.SC_DATA = g.SC_DATA || {})
  D.unit4 = {
    "title": "Unit 4 · Family & Homes",
    "counts": {
      "listening": 3,
      "vocabulary": 4,
      "grammar": 4,
      "reading": 1,
      "writing": 2
    },
    "items": {
      "listening": [
        {
          "type": "pick",
          "audio": "The flat is on the second floor.",
          "prompt": "Listen and choose.",
          "options": [
            "first floor",
            "second floor",
            "third floor"
          ],
          "answer": "second floor"
        },
        {
          "type": "pick",
          "audio": "Mia is happier than Ben.",
          "prompt": "Listen and choose.",
          "options": [
            "Mia is happier",
            "Ben is happier",
            "they are the same"
          ],
          "answer": "Mia is happier"
        },
        {
          "type": "pick",
          "audio": "Their grandparents live in a village.",
          "prompt": "Listen and choose.",
          "options": [
            "a village",
            "a town centre",
            "a flat"
          ],
          "answer": "a village"
        },
        {
          "type": "pick",
          "audio": "The lift is outside the house.",
          "prompt": "Listen and choose.",
          "options": [
            "inside",
            "outside",
            "upstairs"
          ],
          "answer": "outside"
        },
        {
          "type": "pick",
          "audio": "My cousin has curly hair.",
          "prompt": "Listen and choose.",
          "options": [
            "curly hair",
            "short hair",
            "long hair"
          ],
          "answer": "curly hair"
        },
        {
          "type": "pick",
          "audio": "The garden is behind the house.",
          "prompt": "Listen and choose.",
          "options": [
            "behind the house",
            "inside the house",
            "on the roof"
          ],
          "answer": "behind the house"
        }
      ],
      "vocabulary": [
        {
          "type": "mcq",
          "prompt": "My mum's sister is my ___.",
          "options": [
            "aunt",
            "cousin",
            "grandmother"
          ],
          "answer": "aunt"
        },
        {
          "type": "mcq",
          "prompt": "My uncle's son is my ___.",
          "options": [
            "cousin",
            "grandson",
            "nephew"
          ],
          "answer": "cousin"
        },
        {
          "type": "mcq",
          "prompt": "My parents' parents are my ___.",
          "options": [
            "grandparents",
            "cousins",
            "aunts"
          ],
          "answer": "grandparents"
        },
        {
          "type": "mcq",
          "prompt": "The top covering of a house is the ___.",
          "options": [
            "roof",
            "basement",
            "balcony"
          ],
          "answer": "roof"
        },
        {
          "type": "mcq",
          "prompt": "You go up to another floor in a ___.",
          "options": [
            "lift",
            "garden",
            "roof"
          ],
          "answer": "lift"
        },
        {
          "type": "mcq",
          "prompt": "My dad's brother is my ___.",
          "options": [
            "uncle",
            "cousin",
            "grandfather"
          ],
          "answer": "uncle"
        },
        {
          "type": "gaps",
          "title": "",
          "sentences": [
            {
              "text": "My bedroom is on the first floor. It is ___.",
              "answer": "upstairs"
            },
            {
              "text": "Let's play in the garden, ___ the house.",
              "answer": "outside"
            },
            {
              "text": "It is raining. Let's stay ___.",
              "answer": "inside"
            },
            {
              "text": "Shops and cafés are often in the ___.",
              "answer": "town centre"
            },
            {
              "text": "My grandparents live in a small ___.",
              "answer": "village"
            },
            {
              "text": "You can stand on the ___ and look at the street.",
              "answer": "balcony"
            }
          ],
          "bank": [
            "upstairs",
            "outside",
            "inside",
            "town centre",
            "village",
            "balcony"
          ]
        },
        {
          "type": "match",
          "prompt": "Match each word to its meaning.",
          "pairs": [
            {
              "left": "lift",
              "right": "takes you to another floor"
            },
            {
              "left": "basement",
              "right": "a place below the ground floor"
            },
            {
              "left": "roof",
              "right": "the top of a house"
            },
            {
              "left": "balcony",
              "right": "a place outside an upstairs room"
            }
          ]
        }
      ],
      "grammar": [
        {
          "type": "mcq",
          "prompt": "old → ___",
          "options": [
            "older",
            "olderer",
            "more old"
          ],
          "answer": "older"
        },
        {
          "type": "mcq",
          "prompt": "young → ___",
          "options": [
            "younger",
            "youngerer",
            "more young"
          ],
          "answer": "younger"
        },
        {
          "type": "mcq",
          "prompt": "pretty → ___",
          "options": [
            "prettier",
            "prettyer",
            "more pretty"
          ],
          "answer": "prettier"
        },
        {
          "type": "mcq",
          "prompt": "curly → ___",
          "options": [
            "curlier",
            "curlyer",
            "more curly"
          ],
          "answer": "curlier"
        },
        {
          "type": "mcq",
          "prompt": "happy → ___",
          "options": [
            "happier",
            "happyer",
            "more happy"
          ],
          "answer": "happier"
        },
        {
          "type": "mcq",
          "prompt": "big → ___",
          "options": [
            "bigger",
            "biger",
            "more big"
          ],
          "answer": "bigger"
        },
        {
          "type": "mcq",
          "prompt": "The red bag belongs to me. It is ___.",
          "options": [
            "mine",
            "hers",
            "yours"
          ],
          "answer": "mine"
        },
        {
          "type": "mcq",
          "prompt": "This is Emma's room. It is ___.",
          "options": [
            "hers",
            "his",
            "theirs"
          ],
          "answer": "hers"
        },
        {
          "type": "mcq",
          "prompt": "Mum and I live here. The house is ___.",
          "options": [
            "ours",
            "theirs",
            "mine"
          ],
          "answer": "ours"
        },
        {
          "type": "mcq",
          "prompt": "The cousins have bikes. The bikes are ___.",
          "options": [
            "theirs",
            "ours",
            "yours"
          ],
          "answer": "theirs"
        },
        {
          "type": "mcq",
          "prompt": "This is your coat. It is ___.",
          "options": [
            "yours",
            "his",
            "mine"
          ],
          "answer": "yours"
        },
        {
          "type": "mcq",
          "prompt": "This is his bedroom. It is ___.",
          "options": [
            "his",
            "hers",
            "ours"
          ],
          "answer": "his"
        }
      ],
      "reading": [
        {
          "type": "reading",
          "passage": "Hello! I'm Oliver. I live with my parents and my younger sister, Lily. We live in a house in a village. My aunt lives in a flat in the town centre. Her flat is on the second floor, and she uses the lift. Lily's hair is curlier than mine.",
          "questions": [
            {
              "q": "Where does Oliver live?",
              "options": [
                "In a house in a village",
                "In a flat in the town centre",
                "In a basement"
              ],
              "answer": "In a house in a village"
            },
            {
              "q": "Where does his aunt live?",
              "options": [
                "In a flat in the town centre",
                "In a village",
                "In a house"
              ],
              "answer": "In a flat in the town centre"
            },
            {
              "q": "Whose hair is curlier?",
              "options": [
                "Lily's",
                "Oliver's",
                "the aunt's"
              ],
              "answer": "Lily's"
            }
          ]
        },
        {
          "type": "reading",
          "passage": "I am Sam. I live with my parents, my sister and my grandparents. Our house is in a village. My grandparents sleep downstairs. My sister and I sleep upstairs. My bedroom is smaller than hers. The garden is outside the house.",
          "questions": [
            {
              "q": "Does Sam live in a flat?",
              "options": [
                "No, he lives in a house",
                "Yes, in the town centre",
                "Yes, on the third floor"
              ],
              "answer": "No, he lives in a house"
            },
            {
              "q": "Where do the grandparents sleep?",
              "options": [
                "Downstairs",
                "Upstairs",
                "In the garden"
              ],
              "answer": "Downstairs"
            },
            {
              "q": "Whose bedroom is bigger?",
              "options": [
                "His sister's",
                "Sam's",
                "the grandparents'"
              ],
              "answer": "His sister's"
            }
          ]
        },
        {
          "type": "reading",
          "passage": "I am Rosie. My family lives in the town centre. Our flat is on the third floor. We take the lift. It has a balcony, but it has no garden. My cousin Mia lives in a house in a village. Her house is older than our flat.",
          "questions": [
            {
              "q": "Which floor is Rosie's flat on?",
              "options": [
                "The third floor",
                "The first floor",
                "The second floor"
              ],
              "answer": "The third floor"
            },
            {
              "q": "Does her flat have a garden?",
              "options": [
                "No, it doesn't",
                "Yes, it does",
                "Yes, a big one"
              ],
              "answer": "No, it doesn't"
            },
            {
              "q": "Which home is older?",
              "options": [
                "Mia's house",
                "Rosie's flat",
                "they are the same"
              ],
              "answer": "Mia's house"
            }
          ]
        }
      ],
      "writing": [
        {
          "type": "order",
          "prompt": "Put the words in order.",
          "tokens": [
            "Mia",
            "is",
            "happier",
            "than",
            "Ben"
          ],
          "answer": "Mia is happier than Ben"
        },
        {
          "type": "order",
          "prompt": "Put the words in order.",
          "tokens": [
            "My",
            "flat",
            "is",
            "on",
            "the",
            "third",
            "floor"
          ],
          "answer": "My flat is on the third floor"
        },
        {
          "type": "order",
          "prompt": "Put the words in order.",
          "tokens": [
            "The",
            "red",
            "bag",
            "is",
            "mine"
          ],
          "answer": "The red bag is mine"
        },
        {
          "type": "order",
          "prompt": "Put the words in order.",
          "tokens": [
            "Her",
            "house",
            "is",
            "older",
            "than",
            "our",
            "flat"
          ],
          "answer": "Her house is older than our flat"
        },
        {
          "type": "gaps",
          "title": "",
          "sentences": [
            {
              "text": "My sister is ___ than my dad.",
              "answer": "younger"
            },
            {
              "text": "This book is ___.",
              "answer": "mine"
            },
            {
              "text": "The garden is ___ the house.",
              "answer": "outside"
            }
          ],
          "bank": [
            "younger",
            "mine",
            "outside"
          ]
        }
      ]
    }
  }
})(globalThis)
