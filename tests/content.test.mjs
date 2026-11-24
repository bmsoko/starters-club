import { test } from 'node:test'
import assert from 'node:assert/strict'
import { load } from './helpers.mjs'

load('js/core.js', 'data/listening.js', 'data/reading.js')
const D = globalThis.SC_DATA
const points = (q) => (q.type === 'gaps' ? q.sentences.length : q.type === 'comic' ? q.questions.length : 1)
const key = (q) => q.type + JSON.stringify([q.intro, q.audio, q.poster, q.word, q.messages, q.prompt, q.panels, q.sentences])

for (const paper of ['listening', 'reading']) {
  test(`${paper}: exactly 6 mock tests with unique ids`, () => {
    assert.equal(D[paper].mocks.length, 6)
    assert.equal(new Set(D[paper].mocks.map((m) => m.id)).size, 6)
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

  test(`${paper}: each task's practice pool (mocks + bank) has enough for 4 different rounds`, () => {
    for (const id of Object.keys(D[paper].tasks)) {
      const inMocks = D[paper].mocks.flatMap((m) => m.tasks.find((t) => t.taskId === id).questions).reduce((a, q) => a + points(q), 0)
      const inBank = (D[paper].bank[id] || []).reduce((a, q) => a + points(q), 0)
      assert.ok(inMocks + inBank >= 20, `${id}: only ${inMocks + inBank} points`)
    }
  })
}
