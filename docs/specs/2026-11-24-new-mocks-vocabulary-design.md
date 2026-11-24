# Starters Club: New mock exams and Vocabulary (design)

Date: 2026-11-24 · Status: approved by Bruno (chat)

## Why

Estani has done every fixed mock. He needs fresh tests and a place to learn
the Starters words by meaning. Bruno asked that everything follow Cambridge
standards and the Cambridge way of teaching young learners.

## Decisions (Bruno's)

- **"Rotate the mocks" means a new mock exam every time.** It's a fresh
  Listening, Reading & Writing or Speaking paper in the exact Starters
  Digital format, made from all our questions, with the ones he has seen
  least first. Tests 1–6 stay as they are, so scores can be compared.
- **Vocabulary shows a picture plus the Spanish meaning.** Each word has a
  picture, the spoken English word and the Spanish meaning (Argentina).

## Cambridge alignment

- **New mocks keep the official format.**
  - Task order is the same as the real exam.
  - Counts are the same: Listening 2/5/5/3/5 (Task 5 is 3 place and
    2 colour), R&W 5 tasks at 5 points (Task 3 is 2 letter pairs and
    3 scrambles), Speaking 5/4/4/5.
  - Each task starts with an example.
  - Listening plays every recording twice, and only Task 4 can be replayed.
- **Vocabulary uses the Pre A1 Starters Digital wordlist.**
  - The 16 topics are taken from the wordlist's "vocabulary list by topic"
    (Names and Greetings are left out).
  - Every word and example sentence was checked against its alphabetic
    list.
  - Example sentences are original, written in the style of the wordlist's
    "example language".
- **Teaching follows the young-learner sequence: look, listen, say, play.**
  - The picture comes first; he taps it to hear the word and says it out
    loud.
  - "Say it" phrases teach whole chunks of language.
  - "Listen and point" is the same skill as Listening Task 1.
  - Spanish is a helper that can be hidden.

## Built

- `SC.newMockScreens(paper)`.
- `startersSeen` counts, saved after each finished run.
- `data/vocab.js` and `js/vocab.js`.
- A Vocabulary 📚 tab.
- 259 new recordings.

## Update: more vocabulary games (Bruno asked)

Each topic now has four games, in the order a young learner meets the
skills:

1. 🎧 **Listen and point.**
2. 📖 **Read and choose**: read the word, tap its picture.
3. ✏️ **Look and spell**: letter tiles, as in R&W Task 3. One-word answers
   only.
4. ✅ **Listen: yes or no?**: see a picture and hear a word; does it match?
   About half the answers are "yes".

Each game has up to 8 rounds, and its scores go to My stars.
