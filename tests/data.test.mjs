import { test } from 'node:test'
import assert from 'node:assert/strict'
import { load } from './helpers.mjs'

load('js/core.js', 'data/listening.js')
const D = globalThis.SC_DATA

const L_COUNTS = { L1: 2, L2: 5, L3: 5, L4: 3, L5: 5 }
const scored = (task) => task.questions

const allListening = () => [
  ...D.listening.mocks.flatMap((m) => m.tasks.flatMap((t) => [...t.questions, t.example].filter(Boolean))),
  ...Object.values(D.listening.bank).flat(),
]

test('listening mocks have tasks L1..L5 in order with exact counts', () => {
  for (const m of D.listening.mocks) {
    assert.deepEqual(m.tasks.map((t) => t.taskId), ['L1', 'L2', 'L3', 'L4', 'L5'], m.id)
    for (const t of m.tasks) assert.equal(scored(t).length, L_COUNTS[t.taskId], `${m.id} ${t.taskId}`)
    assert.ok(m.tasks.every((t) => t.example), `${m.id} needs an example per task`)
  }
})

test('listening L5 has 3 place and 2 colour questions', () => {
  for (const m of D.listening.mocks) {
    const l5 = m.tasks.find((t) => t.taskId === 'L5').questions
    assert.equal(l5.filter((q) => q.type === 'place').length, 3, m.id)
    assert.equal(l5.filter((q) => q.type === 'colour').length, 2, m.id)
  }
})

test('pick and reply answers are among unique options', () => {
  for (const q of allListening().filter((q) => q.type === 'pick' || q.type === 'reply')) {
    assert.ok(q.audio, JSON.stringify(q))
    assert.ok(q.options.includes(q.answer), JSON.stringify(q))
    assert.equal(new Set(q.options).size, q.options.length, JSON.stringify(q))
  }
})

test('notes answers are a name or a number 1-20', () => {
  for (const q of allListening().filter((q) => q.type === 'notes')) {
    assert.match(q.answer, /^[A-Za-z]+$|^([1-9]|1\d|20)$/, JSON.stringify(q))
    assert.ok(q.label && q.audio, JSON.stringify(q))
  }
})

test('colour audio names the colour and the target is in the picture', () => {
  for (const q of allListening().filter((q) => q.type === 'colour')) {
    assert.ok(q.audio.includes(q.colour), JSON.stringify(q))
    assert.ok(q.objects.includes(q.target), JSON.stringify(q))
    assert.ok(globalThis.SC.COLOURS.includes(q.colour), q.colour)
  }
})

test('place answers are slots in the scene', () => {
  for (const q of allListening().filter((q) => q.type === 'place')) {
    assert.ok(q.scene.some((s) => s.slot === q.answer), JSON.stringify(q))
  }
})

test('each listening bank task has at least 4 questions beyond the mocks', () => {
  for (const id of Object.keys(L_COUNTS)) assert.ok((D.listening.bank[id] || []).length >= 4, id)
})

test('every listening question type has a renderer name the runner knows', () => {
  const types = new Set(allListening().map((q) => q.type))
  for (const t of types) assert.ok(['pick', 'notes', 'reply', 'place', 'colour'].includes(t), t)
})
