import { test } from 'node:test'
import assert from 'node:assert/strict'
import { load, memoryStorage } from './helpers.mjs'

const SC = load('js/core.js')

test('isAccepted ignores case and punctuation and accepts alternatives', () => {
  assert.equal(SC.isAccepted('Nineteen.', '19', ['nineteen']), true)
})
test('isAccepted strips a leading article and spaces', () => {
  assert.equal(SC.isAccepted(' A Dog ', 'dog'), true)
})
test('isAccepted rejects empty input', () => {
  assert.equal(SC.isAccepted('', 'dog'), false)
  assert.equal(SC.isAccepted('   ', 'dog'), false)
})
test('isAccepted rejects a different word', () => {
  assert.equal(SC.isAccepted('dogs', 'dog'), false)
})
test('scramble never returns the word in order and keeps its letters', () => {
  for (let i = 0; i < 50; i++) {
    const s = SC.scramble('pear')
    assert.notEqual(s.join(''), 'pear')
    assert.equal([...s].sort().join(''), 'aepr')
  }
})
test('loadStats tolerates corrupt saved stats', () => {
  SC.storage = memoryStorage({ startersStats: '{bad' })
  assert.deepEqual(SC.loadStats(), { stars: 0, rounds: 0, best: 0 })
})
test('loadStats keeps stars saved before this release', () => {
  SC.storage = memoryStorage({ startersStats: '{"stars":42,"rounds":5,"best":90}' })
  assert.deepEqual(SC.loadStats(), { stars: 42, rounds: 5, best: 90 })
})
test('exams.add stores a history entry per exam', () => {
  SC.storage = memoryStorage()
  SC.exams.add('L1', { score: 3, total: 20, byTask: {}, date: 'x' })
  assert.equal(SC.exams.history('L1').length, 1)
  assert.equal(SC.exams.history('R1').length, 0)
})
test('speak returns false when speech is unavailable', () => {
  const saved = globalThis.speechSynthesis
  delete globalThis.speechSynthesis
  assert.equal(SC.speak('hi'), false)
  if (saved) globalThis.speechSynthesis = saved
})
