import { test } from 'node:test'
import assert from 'node:assert/strict'
import { load, memoryStorage } from './helpers.mjs'

const SC = load('js/core.js', 'data/listening.js', 'data/reading.js', 'data/speaking.js', 'js/pages.js')
const points = (q) => (q.type === 'gaps' ? q.sentences.length : q.type === 'comic' ? q.questions.length : 1)
const scored = (s) => s.filter((x) => !x.example)
const byTask = (s) => s.reduce((a, x) => ({ ...a, [x.taskId]: (a[x.taskId] || 0) + points(x.q) }), {})

test('new listening mock follows the Starters Digital format', () => {
  SC.storage = memoryStorage()
  for (let i = 0; i < 20; i++) {
    const s = SC.newMockScreens('listening')
    assert.deepEqual(byTask(scored(s)), { L1: 2, L2: 5, L3: 5, L4: 3, L5: 5 })
    assert.deepEqual([...new Set(s.map((x) => x.taskId))], ['L1', 'L2', 'L3', 'L4', 'L5'])
    const l5 = scored(s).filter((x) => x.taskId === 'L5')
    assert.equal(l5.filter((x) => x.q.type === 'place').length, 3)
    assert.equal(new Set(s.filter((x) => x.taskId === 'L2').map((x) => x.intro)).size, 1, 'one story')
  }
})

test('new reading mock has 25 points with 2 letter pairs and 3 scrambles', () => {
  SC.storage = memoryStorage()
  const s = SC.newMockScreens('reading')
  assert.deepEqual(byTask(scored(s)), { R1: 5, R2: 5, R3: 5, R4: 5, R5: 5 })
  const r3 = scored(s).filter((x) => x.taskId === 'R3')
  assert.equal(r3.filter((x) => x.q.mode === 'pair').length, 2)
})

test('new speaking mock: 18 points, part 2 is about one picture', () => {
  SC.storage = memoryStorage()
  const s = SC.newMockScreens('speaking')
  assert.deepEqual(byTask(scored(s)), { S1: 5, S2: 4, S3: 4, S4: 5 })
  assert.equal(new Set(s.filter((x) => x.taskId === 'S2').map((x) => x.q.show)).size, 1)
})

test('every task of a new mock starts with an example (except bank-only stories)', () => {
  SC.storage = memoryStorage()
  const s = SC.newMockScreens('reading')
  assert.equal(s.filter((x) => x.example).length, 5)
})

test('no question repeats inside a new mock', () => {
  SC.storage = memoryStorage()
  for (const p of ['listening', 'reading', 'speaking']) {
    const keys = scored(SC.newMockScreens(p)).map((x) => JSON.stringify(x.q))
    assert.equal(new Set(keys).size, keys.length, p)
  }
})

test('questions he has seen least come first', () => {
  SC.storage = memoryStorage()
  const first = scored(SC.newMockScreens('listening')).filter((x) => x.taskId === 'L3')
  SC.markSeen(first.map((x) => x.q))
  const second = scored(SC.newMockScreens('listening')).filter((x) => x.taskId === 'L3')
  const seen = new Set(first.map((x) => JSON.stringify(x.q)))
  assert.ok(second.every((x) => !seen.has(JSON.stringify(x.q))), 'repeated a seen L3 question while unseen ones exist')
})

test('new mock titles and exam rules', () => {
  assert.match(SC.examTitle('new:listening'), /Listening · New mock/)
  assert.equal(SC.isExam('new:listening'), true)
  assert.equal(SC.isExam('L-T3'), true)
  assert.equal(SC.isExam('new:speaking'), false)
  assert.equal(SC.isExam('task:L3'), false)
})
