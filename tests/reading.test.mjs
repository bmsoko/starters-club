import { test } from 'node:test'
import assert from 'node:assert/strict'
import { load } from './helpers.mjs'

load('js/core.js', 'data/reading.js')
const D = globalThis.SC_DATA

// R4/R5 score per sentence/question; others score 1 each
const points = (q) => (q.type === 'gaps' ? q.sentences.length : q.type === 'comic' ? q.questions.length : 1)
const taskPoints = (t) => t.questions.reduce((a, q) => a + points(q), 0)
const allReading = () => [
  ...D.reading.mocks.flatMap((m) => m.tasks.flatMap((t) => [...t.questions, t.example].filter(Boolean))),
  ...Object.values(D.reading.bank).flat(),
]

test('reading mocks have tasks R1..R5 with 5 points each (25 total)', () => {
  for (const m of D.reading.mocks) {
    assert.deepEqual(m.tasks.map((t) => t.taskId), ['R1', 'R2', 'R3', 'R4', 'R5'], m.id)
    for (const t of m.tasks) assert.equal(taskPoints(t), 5, `${m.id} ${t.taskId}`)
    assert.ok(m.tasks.every((t) => t.example), `${m.id} needs an example per task`)
  }
})

test('R3 has 2 letter-pair and 3 scramble questions', () => {
  for (const m of D.reading.mocks) {
    const r3 = m.tasks.find((t) => t.taskId === 'R3').questions
    assert.equal(r3.filter((q) => q.mode === 'pair').length, 2, m.id)
    assert.equal(r3.filter((q) => q.mode === 'scramble').length, 3, m.id)
  }
})

test('letter pairs complete the word and choices are unique', () => {
  for (const q of allReading().filter((q) => q.type === 'letters' && q.mode === 'pair')) {
    assert.equal(q.blank.replace('__', q.answer), q.word, JSON.stringify(q))
    assert.ok(q.choices.includes(q.answer) && new Set(q.choices).size === q.choices.length, JSON.stringify(q))
  }
  for (const q of allReading().filter((q) => q.type === 'letters' && q.mode === 'scramble')) {
    assert.match(q.word, /^[a-z]{3,}$/, JSON.stringify(q))
  }
})

test('poster and chat answers are among unique options', () => {
  for (const q of allReading().filter((q) => q.type === 'poster' || q.type === 'chat')) {
    assert.ok(q.options.includes(q.answer) && new Set(q.options).size === q.options.length, JSON.stringify(q))
  }
})

test('gap answers come from a word box with spare words', () => {
  for (const q of allReading().filter((q) => q.type === 'gaps')) {
    assert.ok(q.bank.length >= q.sentences.length + 2, q.title)
    for (const s of q.sentences) assert.ok(q.bank.includes(s.answer) && s.text.includes('___'), s.text)
    assert.equal(new Set(q.sentences.map((s) => s.answer)).size, q.sentences.length, q.title)
  }
})

test('comic: at least 3 answers can be copied from the captions', () => {
  for (const q of allReading().filter((q) => q.type === 'comic' && q.questions.length >= 5)) {
    const text = q.panels.map((p) => p.caption).join(' ').toLowerCase()
    assert.ok(q.questions.filter((x) => text.includes(x.answer.toLowerCase())).length >= 3, q.title)
  }
})

test('chat messages are between two named people', () => {
  for (const q of allReading().filter((q) => q.type === 'chat')) {
    const names = new Set(q.messages.map((m) => m.from))
    assert.equal(names.size, 2, JSON.stringify(q))
    assert.ok(![...names].some((n) => n === 'me' || n === 'friend'), JSON.stringify(q))
  }
})

test('R1 includes the pears/peas look-alike pair', () => {
  const r1 = D.reading.mocks.flatMap((m) => m.tasks.find((t) => t.taskId === 'R1').questions)
  assert.ok(r1.some((q) => /pears/i.test(q.poster)) && r1.some((q) => /peas/i.test(q.poster)))
})

test('each reading bank task has extra questions', () => {
  for (const id of ['R1', 'R2', 'R3', 'R4', 'R5']) assert.ok((D.reading.bank[id] || []).length >= (id === 'R4' || id === 'R5' ? 1 : 4), id)
})
