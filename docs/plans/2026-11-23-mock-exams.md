# Starters Club Mock Exams Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add Starters Digital mock exams, practice by task, Unit 4 and Estani's spelling words to the static Starters Club site.

**Architecture:** Plain HTML/JS with no build step. Pure logic lives in `js/core.js` and attaches to `globalThis.SC`, so Node can load it for tests. Each task type is a renderer with the same contract. Question banks are `data/*.js` files that assign to `globalThis.SC_DATA`. One runner plays any list of screens (mock exam, task practice, Unit 4) and reports per-task scores.

**Tech Stack:** HTML, CSS and vanilla ES2020 JavaScript. Browser `speechSynthesis` for speech. Node ≥18 for tests only (`node --test`, no npm dependencies).

**Spec:** `docs/specs/2026-11-23-mock-exams-design.md`

## Global Constraints

- No build, no frameworks, no CDN, no `package.json` dependencies. Pages serves `main` as is.
- Data files are `.js` (they work on `file://`), not `.json`.
- Every question is original. Vocabulary comes only from the Pre A1 Starters Digital wordlist, plus Unit 4 words.
- Footer keeps: "Material original inspirado en tipos de actividades y vocabulario de Cambridge Pre A1 Starters. No es un examen oficial de Cambridge."
- Keep the existing `localStorage` key `startersStats` `{stars, rounds, best}` and its meaning. New key: `startersExams` = `{[examId]: [{date, score, total, byTask:{[taskId]:{c,t}}}]}`.
- Listening counts are L1:2, L2:5, L3:5, L4:3, L5:5 (5 of them = 3 place + 2 colour), for 20 total.
- R&W counts are R1:5, R2:5, R3:5 (2 pair + 3 scramble), R4:5, R5:5, for 25 total.
- Speech uses `lang="en-GB"` at rate 0.82, as the current site does.
- Show scores as "x / y" plus stars. Never show "shields".
- Changes go on branch `feature/mock-exams`, via a PR. Merging to `main` needs Bruno's approval.

## Review Focus

1. **Saved stars from before this release.** Opening the site with an existing `startersStats` must show the same numbers. A corrupt or missing value must not crash the page; treat it as zero. Test in Task 1.
2. **Speech not available** (some in-app browsers). Audio questions must still be answerable, with a visible "audio unavailable" note and no `alert` loop. Test in Task 1 (`speak` returns false).
3. **Typed answers with odd input**: capitals, trailing spaces or a full stop, "a dog", an empty submit. The first three count as correct; an empty submit is ignored. Test in Task 1.
4. **Leaving a mock exam halfway** by switching tabs. No partial history entry is saved, and the next start begins fresh. Test in Task 5.
5. **Phone width (375px)**: three picture options and letter tiles wrap without scrolling sideways. Checked manually in Task 7.

---

### Task 1: Restructure the site, add core helpers, keep current features

**Files:**
- Create: `css/site.css` (the current `<style>` contents, moved), `js/core.js`, `js/legacy.js` (the current inline script, moved as is), `tests/core.test.mjs`, `.claude/launch.json`
- Modify: `index.html` (link the files; add tabs `Mock exams`, `Practice by task`, `Unit 4` with empty sections)

**Interfaces:**
- Produces `SC.normalize(s): string`: lower-case, trimmed, spaces collapsed, `.?!,` removed.
- Produces `SC.isAccepted(input, answer, accept=[]): boolean`. It strips a leading `a |an |the ` after normalizing, and returns false for empty input.
- Produces `SC.shuffle(arr): arr` (a copy) and `SC.scramble(word): string[]`, which never returns the word in order.
- Produces `SC.speak(text): boolean`. It returns false when `speechSynthesis` is missing, with no `alert`.
- Produces `SC.loadStats(): {stars, rounds, best}`, which tolerates bad JSON.
- Produces `SC.exams.load(): object`, `SC.exams.add(examId, entry)` and `SC.exams.history(examId): entry[]`. Storage is injectable via `SC.storage`, which defaults to `localStorage`.
- `legacy.js` keeps all current behaviour and must call `SC.speak` and `SC.loadStats`.

- [ ] **Step 1: Write the failing tests** in `tests/core.test.mjs`, loading `js/core.js` with `await import` after setting `globalThis.SC_TEST = true`:
  - `isAccepted('Nineteen.', '19', ['nineteen'])` returns true
  - `isAccepted(' A Dog ', 'dog')` returns true
  - `isAccepted('', 'dog')` returns false
  - `isAccepted('dogs', 'dog')` returns false
  - every `scramble('pear')` result over 50 runs is not `pear`, and sorts to the same letters
  - with a memory storage holding `startersStats = "{bad"`, `loadStats()` returns `{stars:0, rounds:0, best:0}`
  - `exams.add('L1', {score:3, total:20, byTask:{}, date:'x'})` followed by `history('L1').length` gives 1
  - with `globalThis.speechSynthesis` undefined, `speak('hi')` returns false

- [ ] **Step 2: Run** `node --test tests/` and expect it to FAIL (the module is missing).
- [ ] **Step 3: Implement `js/core.js`** as an IIFE that assigns `globalThis.SC`. Move the CSS and the inline script out of `index.html` into the new files, and add the three tabs.
- [ ] **Step 4: Run** `node --test tests/` and expect PASS. Then serve with `python3 -m http.server 8765` and check that Home, Practice round, Spelling and My stars behave as on the live site.
- [ ] **Step 5: Commit** with "refactor: split site into css/js files, add core helpers".

### Task 2: Runner and the Listening renderers

**Files:**
- Create: `js/runner.js`, `js/tasks/listening.js`, `data/listening.js` (Test 1 plus the bank), `tests/data.test.mjs`
- Modify: `index.html` (script tags)

**Interfaces:**
- Renderer contract: `SC.renderers[type](el, q, done)`. It must call `done(correct:number, total:number)` exactly once. Most types score 1; `gaps` and `comic` score per blank or question.
- Produces `SC.run(el, screens, onFinish)`, where `screens = [{taskId, taskLabel, q, example?:bool}]`. Example screens are shown first and not scored. `onFinish({score, total, byTask})` is called once, only after the last screen. A task's `intro` audio plays on its first screen.
- Listening question shapes:
  - `pick {type:'pick', audio, prompt?, options:[str], answer}`. Options containing no letters are shown large, as emoji.
  - `notes {type:'notes', audio, label, answer}`. Tiles are the answer's characters plus 3 distractors from `ABCDEFGHIJKLMNOPRSTUVWY0123456789`. Matching is case-insensitive.
  - `reply {type:'reply', audio, options:[str], answer}`. Replay is unlimited.
  - `place {type:'place', audio, scene:[{slot, emoji}], object, answer:slot}`. Tap the object, then a slot.
  - `colour {type:'colour', audio, objects:[emoji], target, colour}`, using the same 10 colours as DinoQuest.
- Data: `SC_DATA.listening = {mocks:[{id:'L1', title:'Listening · Test 1', tasks:[{taskId:'L1'..'L5', label, intro?, example, questions:[…]}]}], bank:{L1:[…],…}}`.

- [ ] **Step 1: Write the failing test** `tests/data.test.mjs`. For every listening mock:
  - the task ids are `L1..L5` in order
  - question counts match the global counts exactly
  - L5 has exactly 3 `place` and 2 `colour` questions
  - every `pick`/`reply` answer is in its options and options are unique
  - every `notes` answer is `/^[A-Za-z]+$|^([1-9]|1\d|20)$/`
  - every `colour` audio contains its colour
  - every `place` answer is a scene slot
  - each bank task has at least 4 questions that aren't in any mock

- [ ] **Step 2: Run** `node --test tests/` and expect it to FAIL.
- [ ] **Step 3: Implement** the runner and the 5 renderers. Write Listening Test 1 and the bank, with names from the wordlist (Sam, Tina, Wendy, Yusef, Pat…). At least 3 of the L3 questions spell names letter by letter, e.g. audio `"Her name is Tina. T, I, N, A."`.
- [ ] **Step 4: Run** the tests and expect PASS. In the browser, temporarily call `SC.run(el, mockScreens('L1'), console.log)` and complete it.
- [ ] **Step 5: Commit** with "feat: exam runner and Listening task renderers with Test 1".

### Task 3: Reading & Writing renderers

**Files:**
- Create: `js/tasks/reading.js`, `data/reading.js` (Test 1 plus the bank)
- Modify: `tests/data.test.mjs`, `index.html`

**Interfaces:**
- Consumes the runner and renderer contract from Task 2.
- Question shapes:
  - `poster {type:'poster', poster, options:[emoji], answer}`
  - `chat {type:'chat', messages:[{from:'me'|'friend', text}], prompt, options:[emoji|str], answer}`
  - `letters {type:'letters', emoji, word, mode:'pair', blank:'s__ep', choices:['he','ee','ea'], answer:'ee'}` or `{…, mode:'scramble'}`
  - `gaps {type:'gaps', title, sentences:[{text:'… ___ …', answer}], bank:[str]}`. It scores one per sentence; the bank has at least 2 spare words, and the gaps fill in order.
  - `comic {type:'comic', panels:[{emoji, caption}], questions:[{q, answer, accept:[]}]}`. It scores one per question and uses `SC.isAccepted`.
- Data: `SC_DATA.reading`, with the same shape as listening and task ids `R1..R5`. R4 is one `gaps` with 5 sentences; R5 is one `comic` with 5 questions, 3 of them answered with words that appear in the captions.

- [ ] **Step 1: Write the failing tests.** For every reading mock:
  - task ids are `R1..R5` and scored counts match (R4 and R5 count their sentences and questions)
  - R3 has exactly 2 `pair` and 3 `scramble`
  - a `pair` blank filled with its answer is a real word: `blank.replace('__', answer) === word`
  - every gap answer is in the bank, and the bank has more words than gaps
  - in the comic, at least 3 answers appear in the caption text (case-insensitive)

- [ ] **Step 2: Run** the tests and expect FAIL.
- [ ] **Step 3: Implement** the 5 renderers and write R&W Test 1 and the bank. R1 must include a pears/peas pair. R3 draws from his missed words (kicking, waving, flowers, dress, bookcase, people, hat, alphabet).
- [ ] **Step 4: Run** the tests and expect PASS. Complete Test 1 in the browser.
- [ ] **Step 5: Commit** with "feat: Reading & Writing task renderers with Test 1".

### Task 4: Mock tests 2–3 and the practice banks

**Files:**
- Modify: `data/listening.js`, `data/reading.js`, `tests/data.test.mjs`

- [ ] **Step 1: Add the failing tests:**
  - there are exactly 3 mocks per paper
  - no question prompt or audio is repeated across the mocks of a paper
  - bank size per task is at least 1.5× that task's mock count, counting mock questions

- [ ] **Step 2: Run** and expect FAIL.
- [ ] **Step 3: Write** Listening Tests 2–3, R&W Tests 2–3 and the extra bank questions. Spread them across the wordlist topics: animals, body, clothes, colours, family, feelings, food, home, school, toys, sports and leisure, places, transport, weather, numbers 1–20.
- [ ] **Step 4: Run** and expect PASS.
- [ ] **Step 5: Commit** with "content: Listening and R&W tests 2-3 and practice banks".

### Task 5: The Mock exams and Practice by task tabs, with results and history

**Files:**
- Create: `js/pages.js`
- Modify: `index.html`, `css/site.css`, `tests/core.test.mjs`

**Interfaces:**
- Consumes `SC.run`, `SC.exams`, and `SC_DATA.*`.
- Produces `SC.mockScreens(examId): screens` and `SC.taskScreens(taskId, n=5): screens` (random from bank and mocks, no repeats).
- `SC.recordResult(examId, result)` adds to history and also adds `score` to `startersStats.stars` and 1 to `rounds`. It is called only from `onFinish`.

- [ ] **Step 1: Write the failing tests** with memory storage:
  - `mockScreens('L1')` has 20 scored screens plus 5 examples
  - `taskScreens('L3')` has 5 screens, all `notes`
  - `recordResult('R2', {score:20, total:25, byTask:{}})` adds 20 stars and creates 1 history entry
  - a runner given 3 screens, abandoned after 1 (no `onFinish`), leaves history empty

- [ ] **Step 2: Run** and expect FAIL.
- [ ] **Step 3: Implement** the pages:
  - **Mock exams:** cards for the 6 tests, each showing its last score and best score, and the information line "Listening up to 40 min · Reading & Writing up to 25 min".
  - **Practice by task:** a grid of the 10 tasks.
  - **Results screen:** the total, a table by task, stars, and "Try again" / "Back".
  - **My stars:** gains a "Mock exams" history list.
- [ ] **Step 4: Run** the tests and expect PASS. In the browser, finish one mock and confirm that the history appears and the stars go up.
- [ ] **Step 5: Commit** with "feat: mock exam and task practice pages with history".

### Task 6: Unit 4 and the spelling words

**Files:**
- Create: `data/unit4.js` (converted from `english-learning/backend/app/testprep_content.py` `_UNIT4_ITEMS`), `js/tasks/unit.js`
- Modify: `js/legacy.js` (spelling words), `js/pages.js`, `tests/data.test.mjs`

**Interfaces:**
- Unit 4 types:
  - `pick` (from `listen_pick`) and `gaps` (from `gap_bank`) reuse earlier renderers
  - new: `mcq {prompt, options, answer}`, `match {pairs:[{left,right}]}` (scores per pair), `order {tokens, answer}`, `reading {passage, questions:[{q, options, answer}]}` (scores per question)
- `SC_DATA.unit4 = {title:'Unit 4 · Family & Homes', counts:{listening:3, vocabulary:4, grammar:4, reading:1, writing:2}, items:{[section]:[q]}}`
- `SC.unitScreens()` picks the counts at random, in section order.

- [ ] **Step 1: Write the failing tests:**
  - unit4 has all 5 sections, each with at least as many items as its count
  - every mcq/pick answer is in its options
  - `order.tokens.join(' ') === answer`
  - the spelling list includes `kicking, waving, flowers, alphabet, dress, bookcase, people, hat`, with no duplicate words

- [ ] **Step 2: Run** and expect FAIL.
- [ ] **Step 3: Implement.** Convert the 34 items with a one-off script, and add the Unit 4 tab with a Start button using the results screen from Task 5 (examId `U4`).
- [ ] **Step 4: Run** and expect PASS. Play Unit 4 once in the browser.
- [ ] **Step 5: Commit** with "feat: Unit 4 practice and Estani's spelling words".

### Task 7: Full check and PR

- [ ] **Step 1:** Run `node --test tests/` and expect all to pass.
- [ ] **Step 2: Browser pass** at desktop width and at 375px:
  - all 6 mocks start and the 10 task practices run
  - Unit 4, Spelling and the quick round work
  - the stars saved before the change are intact
  - with speech blocked (`speechSynthesis` deleted via a JS override), the note shows and there's no crash
  - the console is empty
- [ ] **Step 3: Push** `feature/mock-exams` and open a PR to `main` with screenshots. Do **not** merge without Bruno's OK.
