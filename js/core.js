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

  // Speech: returns false (no alert) when the browser has no speech synthesis.
  SC.speak = (text) => {
    const synth = g.speechSynthesis
    if (!synth || typeof g.SpeechSynthesisUtterance === 'undefined') return false
    synth.cancel()
    const u = new g.SpeechSynthesisUtterance(text)
    u.lang = 'en-GB'
    u.rate = 0.82
    synth.speak(u)
    return true
  }
  SC.canSpeak = () => !!g.speechSynthesis && typeof g.SpeechSynthesisUtterance !== 'undefined'

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
globalThis.SC.speakAll = (texts) => {
  const g = globalThis
  if (!globalThis.SC.canSpeak()) { globalThis.SC.noAudio(); return false }
  g.speechSynthesis.cancel()
  for (const t of texts.filter(Boolean)) {
    const u = new g.SpeechSynthesisUtterance(t)
    u.lang = 'en-GB'
    u.rate = 0.82
    g.speechSynthesis.speak(u)
  }
  return true
}
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
