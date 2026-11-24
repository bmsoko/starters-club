import { test } from 'node:test'
import assert from 'node:assert/strict'
import { existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { load } from './helpers.mjs'

const root = fileURLToPath(new URL('..', import.meta.url))
const SC = load('js/core.js', 'data/listening.js', 'data/reading.js', 'data/unit4.js', 'data/spelling.js', 'data/speaking.js', 'data/audio-index.js')
const D = globalThis.SC_DATA

test('parseSpeech splits speakers and defaults to the narrator', () => {
  assert.deepEqual(SC.parseSpeech('W: What is his name? | B: Ben. B, E, N.'), [
    { who: 'W', text: 'What is his name?' }, { who: 'B', text: 'Ben. B, E, N.' }])
  assert.deepEqual(SC.parseSpeech('Put the cat on the bed.'), [{ who: 'N', text: 'Put the cat on the bed.' }])
})

test('plainSpeech removes speaker marks', () => {
  assert.equal(SC.plainSpeech('W: Hello! | G: Hi!'), 'Hello! Hi!')
})

test('audioKey is stable, short and different for different texts', () => {
  assert.equal(SC.audioKey('Hello'), SC.audioKey('Hello'))
  assert.match(SC.audioKey('Hello'), /^[0-9a-f]{8}$/)
  assert.notEqual(SC.audioKey('Hello'), SC.audioKey('Hello!'))
})

test('spokenTexts collects listening, unit, speaking and spelling audio', () => {
  const t = SC.spokenTexts(D)
  assert.ok(t.includes(D.listening.mocks[0].tasks[1].intro))
  assert.ok(t.includes(D.spelling[0].word))
  assert.ok(t.includes(D.speaking.mocks[0].tasks[3].questions[0].audio))
  assert.equal(new Set(t).size, t.length)
})

test('only known speakers are used', () => {
  for (const s of SC.spokenTexts(D)) for (const seg of SC.parseSpeech(s)) assert.ok('NMWBG'.includes(seg.who), s)
})

test('every spoken text has a recorded file (run: node tools/make-audio.mjs)', () => {
  const missing = SC.spokenTexts(D).filter((t) => {
    const f = SC.audioFile(t)
    return !f || !existsSync(root + f)
  })
  assert.deepEqual(missing.slice(0, 5), [], `${missing.length} texts without audio`)
})

test('note-taking dialogues have two speakers', () => {
  const all = [...D.listening.mocks.flatMap((m) => m.tasks.flatMap((t) => [t.example, ...t.questions])), ...D.listening.bank.L3]
  for (const q of all.filter((q) => q.type === 'notes')) assert.equal(SC.parseSpeech(q.audio).length, 2, q.audio)
})
