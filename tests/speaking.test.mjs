import { test } from 'node:test'
import assert from 'node:assert/strict'
import { load } from './helpers.mjs'

const SC = load('js/core.js', 'data/listening.js', 'data/reading.js', 'data/speaking.js', 'js/pages.js')
const D = globalThis.SC_DATA
const COUNTS = { S1: 5, S2: 4, S3: 4, S4: 5 }
const all = () => [...D.speaking.mocks.flatMap((m) => m.tasks.flatMap((t) => [t.example, ...t.questions])), ...Object.values(D.speaking.bank).flat()]

test('speaking: 3 tests, parts S1..S4 with exact counts and an example each', () => {
  assert.equal(D.speaking.mocks.length, 3)
  for (const m of D.speaking.mocks) {
    assert.deepEqual(m.tasks.map((t) => t.taskId), ['S1', 'S2', 'S3', 'S4'], m.id)
    for (const t of m.tasks) {
      assert.equal(t.questions.length, COUNTS[t.taskId], `${m.id} ${t.taskId}`)
      assert.ok(t.example, `${m.id} ${t.taskId} example`)
    }
  }
})

test('speaking: part 1 has 3 point and 2 place questions', () => {
  for (const m of D.speaking.mocks) {
    const q = m.tasks[0].questions
    assert.equal(q.filter((x) => x.type === 'point').length, 3, m.id)
    assert.equal(q.filter((x) => x.type === 'place').length, 2, m.id)
  }
})

test('speaking: point/place answers are in the scene, asks have example answers', () => {
  for (const q of all()) {
    assert.ok(q.audio, JSON.stringify(q))
    if (q.type === 'ask') assert.ok(q.examples.length >= 1, q.audio)
    else assert.ok(q.scene.some((s) => s.slot === q.answer), JSON.stringify(q))
  }
})

test('speaking: parts 2 and 3 show a picture or card', () => {
  for (const m of D.speaking.mocks) for (const t of m.tasks.filter((t) => t.taskId === 'S2' || t.taskId === 'S3')) {
    for (const q of [t.example, ...t.questions]) assert.ok(q.show, `${m.id} ${q.audio}`)
  }
})

test('speaking: each part bank has at least 4 extra questions', () => {
  for (const id of Object.keys(COUNTS)) assert.ok(D.speaking.bank[id].length >= 4, id)
})

test('speaking mock gives 18 scored screens and task practice gives 5', () => {
  assert.equal(SC.mockScreens('S-T2').filter((x) => !x.example).length, 18)
  assert.equal(SC.taskScreens('S4').length, 5)
  assert.match(SC.examTitle('task:S3'), /Object cards/)
})
