import { test } from 'node:test'
import assert from 'node:assert/strict'
import { load, memoryStorage } from './helpers.mjs'

const SC = load('js/core.js', 'data/listening.js', 'data/reading.js', 'js/pages.js')
const points = (q) => (q.type === 'gaps' ? q.sentences.length : q.type === 'comic' ? q.questions.length : 1)

test('mockScreens gives 20 scored listening screens plus one example per task', () => {
  const s = SC.mockScreens('L-T1')
  assert.equal(s.filter((x) => !x.example).length, 20)
  assert.equal(s.filter((x) => x.example).length, 5)
  assert.ok(s.every((x) => x.taskId && x.taskLabel && x.q))
})

test('mockScreens for reading adds up to 25 points', () => {
  const s = SC.mockScreens('R-T2').filter((x) => !x.example)
  assert.equal(s.reduce((a, x) => a + points(x.q), 0), 25)
})

test('taskScreens gives 5 different questions of that task', () => {
  const s = SC.taskScreens('L3')
  assert.equal(s.length, 5)
  assert.ok(s.every((x) => x.q.type === 'notes' && x.taskId === 'L3'))
  assert.equal(new Set(s.map((x) => x.q.audio)).size, 5)
})

test('taskScreens for a 5-point text task gives one text', () => {
  const s = SC.taskScreens('R4')
  assert.equal(s.reduce((a, x) => a + points(x.q), 0), 5)
})

test('story questions in task practice carry their story', () => {
  for (let i = 0; i < 10; i++) assert.ok(SC.taskScreens('L2').every((x) => x.intro), 'L2 needs intro')
})

test('recordResult adds stars, a round and a history entry', () => {
  SC.storage = memoryStorage({ startersStats: '{"stars":10,"rounds":2,"best":50}' })
  SC.recordResult('R-T2', { score: 20, total: 25, byTask: { R1: { c: 5, t: 5 } } })
  assert.deepEqual(SC.loadStats(), { stars: 30, rounds: 3, best: 80 })
  const h = SC.exams.history('R-T2')
  assert.equal(h.length, 1)
  assert.equal(h[0].score, 20)
  assert.ok(h[0].date)
})

test('unknown exam id gives no screens instead of crashing', () => {
  assert.deepEqual(SC.mockScreens('nope'), [])
})
