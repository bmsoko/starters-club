# Starters Club: mock exams, Unit 4 and spelling (design)

Date: 2026-11-23 · Status: draft for approval

## Why

Estani (7, Spanish L1) is preparing for **Cambridge Pre A1 Starters**. The
practice he needs should all live in one place he can open from any device:
**https://bmsoko.github.io/starters-club/**. That site is static. GitHub Pages
serves `main` as is, with no server, login, or build. The DinoQuest app on the
Pi stays as it is and is not part of this work.

## Goals

- **Mock exams in Starters Digital format.** Complete Listening and Reading &
  Writing tests that follow the official task order and question counts, so
  the real exam feels familiar.
- **Practice by task.** Drill any single task (for example Listening Task 3,
  spelling names) with questions drawn at random from a bank.
- **Unit 4 · Family & Homes.** His school unit test, moved over from DinoQuest.
- **Spelling.** Keep the existing Spelling tab and add the words he got wrong
  in his school spelling tests.
- **Progress.** "My stars" keeps working and adds a score history per mock exam.
- **Content.** Questions use only the Pre A1 Starters Digital wordlist
  vocabulary, plus his school-unit words.

## Non-goals

- Speaking. It's face to face with an examiner, and you can't simulate it
  well on a static page.
- Official shield scores. Cambridge's conversion isn't public, so we show
  "x / y" and stars, not shields.
- Accounts, syncing between devices, or a parent dashboard. Progress stays in
  each browser (`localStorage`).
- Timed exam conditions. There's no countdown. The real limits (Listening ≤40
  min, R&W ≤25 min) are shown as information only.

## Anti-goals: these would make it a failure even if it works

- Looking or claiming to be official Cambridge material. Every question is
  original. Cambridge sample tests and activities are used for **task formats
  only**, and nothing is copied. The footer keeps the "not an official
  Cambridge exam" line.
- Breaking what's live. The current Practice round, Spelling and My stars, and
  existing saved stars (the `startersStats` key), must keep working.
- Needing a build step, an install, or a framework to change a question.

## The exam we're copying (Starters Digital, from cambridgeenglish.org)

**Listening, 5 tasks, 20 questions**

| Task | Name | What the child does | Qs | Our version |
|---|---|---|---|---|
| 1 | Minimal differences | Hears a sentence, picks 1 of 3 pictures | 2 | Tap 1 of 3 emoji pictures |
| 2 | Story scene | Hears a short story, picks pictures | 5 | One story audio, 5 questions, each 1 of 3 pictures |
| 3 | Note-taking | Hears spellings and numbers, drags letters and numbers into notes | 5 | Tap letter and number tiles to fill a notes card (names spelled letter by letter, numbers 1–20) |
| 4 | Interactive dialogue | Hears a question, picks 1 of 3 replies, can replay as often as needed | 3 | Tap 1 of 3 written replies, with unlimited replay |
| 5 | Picture editing | Drags objects into place (3), colours with a crayon (2) | 5 | Tap an object, then a spot in the scene (3). Tap an object, then a crayon (2) |

**Reading & Writing, 5 tasks, 25 questions**

| Task | Name | What the child does | Qs | Our version |
|---|---|---|---|---|
| 1 | Information posters | Reads a phrase on a poster, picks 1 of 3 pictures | 5 | Poster card with text, tap 1 of 3 emoji |
| 2 | Online messages | Reads a short chat, picks a picture, emoji or sticker | 5 | Chat bubbles, tap 1 of 3 emoji or stickers |
| 3 | Spelling | Picks the right letter pair to complete a word (2), unscrambles letters (3) | 5 | Tap a letter-pair option (2), tap letter tiles in order (3) |
| 4 | Factual topic | Drags a word into each gap of a short factual text | 5 | Tap a word from the box to fill each gap in turn, with distractors |
| 5 | Comic book story | Types one-word answers about a picture story: 3 copied from the story, 2 naming things in the pictures | 5 | 3–4 emoji comic panels with captions, 5 typed answers |

The audio is played by the browser's own text-to-speech in British English
(the site already does this). It plays automatically and has a replay button.
Each task starts with an example question that isn't scored, as the real
exam does.

## What's on the site

Tabs: **Home · Mock exams · Practice by task · Unit 4 · Spelling ✏️ · My stars**

- **Mock exams.** A list of fixed papers: Listening Test 1–3 and Reading &
  Writing Test 1–3. Each runs every task in order, with a "Task n of 5" header
  and a results screen showing each task's score. Fixed papers mean you can
  compare scores over time.
- **Practice by task.** A grid of the 10 tasks. Each run is 5 random questions
  from that task's bank (the mock papers plus extra questions).
- **Unit 4.** The DinoQuest Unit 4 question pool, in its 5 parts
  (listening, vocabulary, grammar, reading, writing).
- **Spelling.** The existing tab, with his words added: kicking, waving,
  flowers, alphabet, dress, bookcase, people, hat, and the rest of his lists.
- **Home.** The existing Practice round stays as a "Quick round" button.

Sketch of a mock exam screen:

```
Listening · Test 1 ............................ Task 3 of 5
Note-taking · Question 2 of 5                  [🔊 Listen again]
┌──────────────────────────────┐
│ Name of the dog:  [S][P][_][_] │
└──────────────────────────────┘
 [O] [T] [A] [S] [⌫]
                                                [Next →]
```

## How it's built (agreed: plain HTML/JS)

```
index.html              shell + tabs (keeps current look and CSS variables)
css/site.css            styles moved out of index.html
js/app.js               tabs, runner (mock / task practice / unit), results, progress
js/speech.js            text-to-speech helper
js/tasks/*.js           one renderer per task type
data/*.js               question banks: window.SC_DATA.* = {...}
tests/check-data.mjs    data integrity checks (run with node; no dependencies)
```

- **No build, no frameworks, no CDN.** Files are loaded with plain `<script>`
  tags.
- **Data files are `.js`, not `.json`.** That way the page also works when
  opened straight from disk, since `fetch` is blocked on `file://`.
- **Every renderer has the same contract.**
  `render(container, question, onAnswered(correct, total))`, the same as the
  DinoQuest test renderers. That makes the logic easy to port.
- **Typed answers are forgiving.** Case, punctuation and a leading
  a/an/the are ignored, and listed alternatives are accepted.
- **Progress uses `localStorage`.** The existing `startersStats` (stars,
  rounds, best) is kept, and a new `startersExams` holds
  `{examId: [{date, score, total, byTask}]}`.

## Content plan

- 3 Listening mocks × 20 questions, and 3 R&W mocks × 25 questions. That's
  135 scored questions.
- Practice banks add about 50% extra questions per task.
- Vocabulary comes from the digital wordlist topics: animals, body, clothes,
  colours, family, feelings, food, home, school, toys, sports and leisure,
  places, transport, weather, numbers 1–20 and the alphabet.
- Names come from the wordlist (Sam, Tina, Wendy, Yusef, Pat, …).
- It targets his known weak spots: names spelled letter by letter (Task L3),
  pears/peas and other look-alike words (R&W Task 1), and his spelling misses
  (R&W Task 3).
- Unit 4: the existing 34 DinoQuest items, converted to JS data.

## Testing and release

- `node tests/check-data.mjs` checks that:
  - every answer is among its options
  - each mock has the exact task counts above
  - gap-fill words are in the word box
  - each unscramble has a scrambled version that differs from the answer
- Manual run in a local static server (`python3 -m http.server`): every mock,
  every task type, Unit 4, Spelling, and the stars that were already saved.
  Check at phone width too.
- Work happens on branch `feature/mock-exams`, and a PR is opened. **It only
  merges to `main` (which is live) after Bruno approves.**

## Left to the builder

- Exact story texts, posters, chats and comics, written from scratch at
  Starters level.
- Visual details within the existing Starters Club style.
- How to present "drag" tasks on touch screens (tap-tap is the default, and
  real dragging is optional).
