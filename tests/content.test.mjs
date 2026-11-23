import { test } from 'node:test'
import assert from 'node:assert/strict'
import { load } from './helpers.mjs'

load('js/core.js', 'data/listening.js', 'data/reading.js')
const D = globalThis.SC_DATA
const points = (q) => (q.type === 'gaps' ? q.sentences.length : q.type === 'comic' ? q.questions.length : 1)
const key = (q) => q.type + JSON.stringify([q.intro, q.audio, q.poster, q.word, q.messages, q.prompt, q.panels, q.sentences])

for (const paper of ['listening', 'reading']) {
  test(`${paper}: exactly 3 mock tests with unique ids`, () => {
    assert.equal(D[paper].mocks.length, 3)
    assert.equal(new Set(D[paper].mocks.map((m) => m.id)).size, 3)
  })

  test(`${paper}: no question is repeated across mocks or the bank`, () => {
    const seen = new Map()
    const all = [...D[paper].mocks.flatMap((m) => m.tasks.flatMap((t) => [t.example, ...t.questions])), ...Object.values(D[paper].bank).flat()]
    for (const q of all) {
      const k = key(q)
      assert.ok(!seen.has(k), `repeated: ${k}`)
      seen.set(k, true)
    }
  })

  test(`${paper}: each task's practice bank adds at least 50% on top of its mock questions`, () => {
    for (const id of Object.keys(D[paper].tasks)) {
      const inMocks = D[paper].mocks.flatMap((m) => m.tasks.find((t) => t.taskId === id).questions).reduce((a, q) => a + points(q), 0)
      const inBank = (D[paper].bank[id] || []).reduce((a, q) => a + points(q), 0)
      assert.ok(inBank >= inMocks / 2, `${id}: bank ${inBank} < half of ${inMocks}`)
    }
  })
}
