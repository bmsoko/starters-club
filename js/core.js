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
