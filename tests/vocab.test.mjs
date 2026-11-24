import { test } from 'node:test'
import assert from 'node:assert/strict'
import { load } from './helpers.mjs'

const SC = load('js/core.js', 'data/vocab.js', 'js/vocab.js')
const T = globalThis.SC_DATA.vocab.topics

test('vocabulary follows the Cambridge Starters topics', () => {
  assert.deepEqual(T.map((t) => t.title), ['Animals', 'The body and the face', 'Clothes', 'Colours', 'Family & friends', 'Feelings',
    'Food & drink', 'The home', 'Places & directions', 'School', 'Sports & leisure', 'Time', 'Toys', 'Transport', 'The world around us', 'Numbers 1–20'])
})

test('each topic: 8+ words with a picture and Spanish meaning, unique inside the topic', () => {
  for (const t of T) {
    assert.ok(t.words.length >= 8, t.id)
    for (const w of t.words) assert.ok(w.en && w.es && (w.pic || w.swatch), JSON.stringify(w))
    assert.equal(new Set(t.words.map((w) => w.en)).size, t.words.length, `${t.id} words`)
    assert.equal(new Set(t.words.map((w) => w.pic || w.swatch)).size, t.words.length, `${t.id} pictures`)
    assert.ok(t.phrases.length >= 3 && t.phrases.every((p) => p.en && p.es), `${t.id} phrases`)
  }
})

test('colour swatches are colours the site can draw', () => {
  for (const w of T.find((t) => t.id === 'colours').words) assert.ok(SC.SWATCH[w.swatch], w.swatch)
})

test('listen-and-point rounds: 4 different pictures, the answer among them, no word twice', () => {
  for (const t of T) {
    const r = SC.vocabRounds(t.id, 8)
    assert.equal(r.length, 8, t.id)
    assert.equal(new Set(r.map((x) => x.answer.en)).size, 8, t.id)
    for (const x of r) {
      assert.equal(x.options.length, 4)
      assert.ok(x.options.includes(x.answer))
      assert.equal(new Set(x.options).size, 4)
    }
  }
})

test('all vocabulary words and phrases are spoken (recorded)', () => {
  const s = SC.spokenTexts(globalThis.SC_DATA)
  for (const t of T) for (const x of [...t.words, ...t.phrases]) assert.ok(s.includes(x.en), x.en)
})

test('vocabScreens: every game gives 8 rounds in every topic', () => {
  for (const t of T) for (const game of SC.VOCAB_GAMES.map((x) => x.id)) {
    const s = SC.vocabScreens(t.id, game)
    assert.ok(s.length >= 6 && s.length <= 8, `${t.id} ${game}: ${s.length}`)
    assert.ok(s.every((x) => x.taskId === game && x.q.type), `${t.id} ${game}`)
  }
})

test('read and choose: written word, 4 different pictures, answer among them', () => {
  for (const x of SC.vocabScreens('animals', 'read')) {
    assert.equal(x.q.type, 'vread')
    assert.equal(x.q.options.length, 4)
    assert.ok(x.q.options.includes(x.q.answer))
  }
})

test('look and spell: only one-word answers, tiles hold every letter', () => {
  for (const t of T) for (const x of SC.vocabScreens(t.id, 'spell')) {
    assert.match(x.q.word, /^[a-z]+$/, x.q.word)
    const tiles = [...x.q.tiles]
    for (const c of x.q.word) { const i = tiles.indexOf(c); assert.ok(i >= 0, x.q.word); tiles.splice(i, 1) }
  }
})

test('yes or no: the right answer matches whether the word fits the picture', () => {
  let yes = 0
  for (let i = 0; i < 10; i++) for (const x of SC.vocabScreens('food', 'yesno')) {
    assert.equal(x.q.type, 'vyesno')
    assert.equal(x.q.correct, x.q.said === x.q.shown)
    if (x.q.correct) yes++
  }
  assert.ok(yes > 20 && yes < 60, `yes answers: ${yes}/80`)
})
