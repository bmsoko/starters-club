import { test } from 'node:test'
import assert from 'node:assert/strict'
import { load } from './helpers.mjs'

const SC = load('js/core.js', 'data/unit4.js', 'data/spelling.js', 'js/pages.js')
const U = globalThis.SC_DATA.unit4
const SECTIONS = ['listening', 'vocabulary', 'grammar', 'reading', 'writing']

test('unit 4 has all 5 sections with enough items for its counts', () => {
  assert.equal(U.title, 'Unit 4 · Family & Homes')
  for (const s of SECTIONS) assert.ok(U.items[s].length >= U.counts[s], s)
})

test('unit 4 answers are consistent', () => {
  for (const q of Object.values(U.items).flat()) {
    if (q.type === 'pick' || q.type === 'mcq') assert.ok(q.options.includes(q.answer), JSON.stringify(q))
    if (q.type === 'order') assert.equal(q.tokens.join(' '), q.answer)
    if (q.type === 'gaps') for (const s of q.sentences) assert.ok(q.bank.includes(s.answer))
    if (q.type === 'reading') for (const x of q.questions) assert.ok(x.options.includes(x.answer))
    if (q.type === 'match') assert.ok(q.pairs.length >= 2)
  }
})

test('unitScreens follows the section counts in order', () => {
  const s = SC.unitScreens()
  assert.deepEqual([...new Set(s.map((x) => x.taskId))], SECTIONS)
  for (const sec of SECTIONS) assert.equal(s.filter((x) => x.taskId === sec).length, U.counts[sec])
})

test('spelling list includes Estani\'s missed words with no duplicates', () => {
  const words = globalThis.SC_DATA.spelling.map((w) => w.word)
  for (const w of ['kicking', 'waving', 'flowers', 'alphabet', 'dress', 'bookcase', 'people', 'hat']) assert.ok(words.includes(w), w)
  assert.equal(new Set(words).size, words.length)
  assert.ok(globalThis.SC_DATA.spelling.every((w) => w.clue))
})

test('spelling list has the 2026-11-26 spelling-test words', () => {
  const words = globalThis.SC_DATA.spelling.map((w) => w.word)
  for (const w of ['street', 'table tennis', 'bird', 'hat', 'goat', 'picture', 'horse', 'sheep', 'duck', 'pear', 'lemonade']) assert.ok(words.includes(w), w)
})
