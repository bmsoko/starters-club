// Starters Club core helpers. Plain script: attaches to globalThis.SC so it
// works in the browser (incl. file://) and in Node tests.
;(function (g) {
  const SC = (g.SC = g.SC || {})

  SC.storage = SC.storage || (typeof localStorage !== 'undefined' ? localStorage : null)

  SC.normalize = (s) =>
    String(s ?? '').toLowerCase().trim().replace(/[.?!,]/g, '').replace(/\s+/g, ' ')

  const clean = (s) => SC.normalize(s).replace(/^(a|an|the) /, '')

  SC.isAccepted = (input, answer, accept = []) => {
    const got = clean(input)
    return got !== '' && [answer, ...accept].some((a) => clean(a) === got)
  }

  SC.shuffle = (arr) => {
    const a = [...arr]
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[a[i], a[j]] = [a[j], a[i]]
    }
    return a
  }

  SC.scramble = (word) => {
    const letters = String(word).split('')
    for (let i = 0; i < 20; i++) {
      const s = SC.shuffle(letters)
      if (s.join('') !== word) return s
    }
    return [...letters].reverse()
  }

  // ---- Speech text: "W: What's his name? | B: Ben." -> speakers N M W B G
  SC.parseSpeech = (text) => String(text).split(' | ').map((seg) => {
    const m = seg.match(/^([NMWBG]): (.*)$/s)
    return m ? { who: m[1], text: m[2].trim() } : { who: 'N', text: seg.trim() }
  }).filter((s) => s.text)
  SC.plainSpeech = (text) => SC.parseSpeech(text).map((s) => s.text).join(' ')

  // FNV-1a 32-bit hash, used as the recorded file name.
  SC.audioKey = (text) => {
    let h = 0x811c9dc5
    for (const ch of new TextEncoder().encode(String(text))) { h ^= ch; h = Math.imul(h, 0x01000193) >>> 0 }
    return h.toString(16).padStart(8, '0')
  }

  // Every string the site speaks (the recorder makes one file per string).
  SC.spokenTexts = (data) => {
    const out = new Set()
    const walk = (o) => {
      if (Array.isArray(o)) return o.forEach(walk)
      if (!o || typeof o !== 'object') return
      for (const [k, v] of Object.entries(o)) {
        if (['audio', 'intro', 'say'].includes(k) && typeof v === 'string') out.add(v)
        else walk(v)
      }
    }
    walk([data.listening, data.unit4, data.speaking])
    for (const w of data.spelling || []) out.add(w.word)
    return [...out]
  }
  SC.audioFile = (text) => {
    const idx = g.SC_DATA && g.SC_DATA.audioIndex
    const k = SC.audioKey(text)
    return idx && idx.includes(k) ? `audio/${k}.mp3` : null
  }

  SC.canSpeak = () => !!g.speechSynthesis && typeof g.SpeechSynthesisUtterance !== 'undefined'
  // Speak one text (recorded file if we have it). Returns false when no audio at all.
  SC.speak = (text) => SC.speakAll([text])

  const read = (key, fallback) => {
    try {
      const raw = SC.storage && SC.storage.getItem(key)
      const v = raw ? JSON.parse(raw) : null
      return v && typeof v === 'object' ? v : fallback
    } catch {
      return fallback
    }
  }
  const write = (key, value) => {
    try { SC.storage && SC.storage.setItem(key, JSON.stringify(value)) } catch { /* storage full or blocked */ }
  }

  SC.loadStats = () => {
    const s = read('startersStats', {})
    const n = (x) => (Number.isFinite(x) && x >= 0 ? x : 0)
    return { stars: n(s.stars), rounds: n(s.rounds), best: n(s.best) }
  }
  SC.saveStats = (s) => write('startersStats', s)

  SC.exams = {
    load: () => read('startersExams', {}),
    add(examId, entry) {
      const all = SC.exams.load()
      all[examId] = [...(Array.isArray(all[examId]) ? all[examId] : []), entry]
      write('startersExams', all)
    },
    history: (examId) => {
      const h = SC.exams.load()[examId]
      return Array.isArray(h) ? h : []
    },
  }
})(globalThis)

// Browser-only: show the "no audio" note instead of an alert.
globalThis.SC.noAudio = () => {
  const n = typeof document !== 'undefined' && document.getElementById('noAudio')
  if (n) n.classList.remove('hidden')
}

// Shared constants and tiny DOM helper used by renderers.
globalThis.SC.COLOURS = ['red', 'blue', 'green', 'yellow', 'pink', 'purple', 'orange', 'brown', 'grey', 'black']
globalThis.SC.SWATCH = {
  red: '#ef4444', blue: '#3b82f6', green: '#22c55e', yellow: '#facc15', pink: '#f472b6',
  purple: '#a855f7', orange: '#fb923c', brown: '#92400e', grey: '#9ca3af', black: '#1f2937',
}
// Speak several texts in order (e.g. a story, then the question).
// Recorded MP3s are used when available; otherwise browser TTS, one voice
// (or pitch) per speaker. A new call stops whatever is playing.
;(function (g) {
  const SC = g.SC
  let current = null // the <audio> element playing now
  let token = 0
  const PITCH = { N: 1, M: 0.8, W: 1.1, B: 1.35, G: 1.5 }
  const MALE = /daniel|george|arthur|oliver|male|man|guy|ryan|thomas|rocko|reed|eddy/i

  const voices = () => (g.speechSynthesis && g.speechSynthesis.getVoices ? g.speechSynthesis.getVoices() : [])
  const pickVoice = (who) => {
    const gb = voices().filter((v) => /en[-_]GB/i.test(v.lang))
    if (!gb.length) return null
    const good = (list) => list.find((v) => /natural|neural|premium|enhanced|google/i.test(v.name)) || list[0]
    const men = gb.filter((v) => MALE.test(v.name))
    const women = gb.filter((v) => !MALE.test(v.name))
    return who === 'M' ? good(men.length ? men : gb) : good(women.length ? women : gb)
  }
  const tts = (text) => {
    for (const seg of SC.parseSpeech(text)) {
      const u = new g.SpeechSynthesisUtterance(seg.text)
      u.lang = 'en-GB'
      u.rate = 0.82
      u.pitch = PITCH[seg.who] || 1
      const v = pickVoice(seg.who)
      if (v) u.voice = v
      g.speechSynthesis.speak(u)
    }
  }

  SC.stopAudio = () => {
    token++
    if (current) { current.pause(); current = null }
    if (SC.canSpeak()) g.speechSynthesis.cancel()
  }

  SC.speakAll = (texts) => {
    const list = texts.filter(Boolean)
    const canFile = typeof g.Audio !== 'undefined'
    if (!SC.canSpeak() && !(canFile && list.every(SC.audioFile))) { SC.noAudio(); return false }
    SC.stopAudio()
    const my = token
    const playFrom = (i) => {
      if (my !== token || i >= list.length) return
      const file = canFile && SC.audioFile(list[i])
      if (!file) {
        if (SC.canSpeak()) tts(list[i])
        // TTS queues itself; keep going so the next text queues after it
        return playFrom(i + 1)
      }
      const a = new g.Audio(file)
      current = a
      const next = () => { if (current === a) current = null; playFrom(i + 1) }
      a.onended = next
      a.onerror = () => { if (my === token && SC.canSpeak()) tts(list[i]); next() }
      a.play().catch(() => a.onerror())
    }
    playFrom(0)
    return true
  }
})(globalThis)
// h('button', {class:'x', onclick}, 'text', child...)
globalThis.SC.h = (tag, attrs = {}, ...kids) => {
  const el = document.createElement(tag)
  for (const [k, v] of Object.entries(attrs || {})) {
    if (v == null || v === false) continue
    if (k.startsWith('on')) el.addEventListener(k.slice(2), v)
    else if (k === 'style' && typeof v === 'object') Object.assign(el.style, v)
    else el.setAttribute(k, v === true ? '' : v)
  }
  for (const c of kids.flat()) if (c != null && c !== false) el.append(c.nodeType ? c : String(c))
  return el
}
