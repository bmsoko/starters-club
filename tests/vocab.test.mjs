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
