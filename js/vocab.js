// Vocabulary by Cambridge Starters topic: look, listen and say, then
// "listen and point". Pure helper vocabRounds() is Node-testable.
;(function (g) {
  const SC = g.SC
  const topics = () => (g.SC_DATA && g.SC_DATA.vocab && g.SC_DATA.vocab.topics) || []
  SC.vocabTopic = (id) => topics().find((t) => t.id === id)

  // n rounds: hear one word, choose its picture among 4.
  SC.vocabRounds = (topicId, n = 8) => {
    const t = SC.vocabTopic(topicId)
    if (!t) return []
    return SC.shuffle(t.words).slice(0, n).map((answer) => ({
      answer, options: SC.shuffle([answer, ...SC.shuffle(t.words.filter((w) => w !== answer)).slice(0, 3)]),
    }))
  }

  // Games, in the Cambridge young-learner order: listen, read, spell, check.
  SC.VOCAB_GAMES = [
    { id: 'listen', label: 'Listen and point', icon: '🎧', help: 'Listen. Tap the right picture.' },
    { id: 'read', label: 'Read and choose', icon: '📖', help: 'Read the word. Tap the right picture.' },
    { id: 'spell', label: 'Look and spell', icon: '✏️', help: 'Look at the picture. Tap the letters in order.' },
    { id: 'yesno', label: 'Listen: yes or no?', icon: '✅', help: 'Look and listen. Is it right? Tap yes or no.' },
  ]
  const one = (w) => /^[a-z]+$/.test(w.en)
  SC.vocabScreens = (topicId, game = 'listen', n = 8) => {
    const t = SC.vocabTopic(topicId)
    const G = SC.VOCAB_GAMES.find((x) => x.id === game)
    if (!t || !G) return []
    const meta = { taskId: game, taskLabel: G.label, help: G.help }
    if (game === 'spell') {
      const ABC = 'abcdefghijklmnoprstuwy'
      return SC.shuffle(t.words.filter(one)).slice(0, n).map((w) => ({ ...meta, q: {
        type: 'vspell', word: w.en, pic: w.pic, swatch: w.swatch, es: w.es,
        tiles: SC.shuffle([...w.en, ...SC.shuffle([...ABC].filter((c) => !w.en.includes(c))).slice(0, 2)]),
      } }))
    }
    if (game === 'yesno') {
      return SC.shuffle(t.words).slice(0, n).map((w) => {
        const said = Math.random() < 0.5 ? w : SC.shuffle(t.words.filter((x) => x !== w))[0]
        return { ...meta, q: { type: 'vyesno', audio: said.en, shown: w, said, correct: said === w } }
      })
    }
    return SC.vocabRounds(topicId, n).map((r) => ({ ...meta, q: {
      type: game === 'read' ? 'vread' : 'vpick', audio: r.answer.en, options: r.options, answer: r.answer } }))
  }

  if (typeof document === 'undefined') return
  const h = SC.h
  const R = (SC.renderers = SC.renderers || {})
  const $ = (id) => document.getElementById(id)

  const picture = (w, cls = '') => (w.swatch
    ? h('span', { class: `swatch ${cls}`, style: { background: SC.SWATCH[w.swatch] }, 'aria-label': w.en })
    : h('span', { class: `vpic ${cls}` }, w.pic))

  // Listen and point: hear the word, tap its picture.
  R.vpick = (el, q, done, ctx) => {
    let answered = false
    const fb = h('div')
    const grid = h('div', { class: 'choices pics' })
    for (const o of q.options) {
      const b = h('button', { class: 'choice', 'aria-label': o.en, onclick: () => {
        if (answered) return
        answered = true
        const ok = o === q.answer
        b.classList.add(ok ? 'correct' : 'wrong')
        grid.querySelectorAll('.choice').forEach((x) => { if (x.dataset.v === q.answer.en) x.classList.add('correct'); x.disabled = true })
        fb.replaceChildren(h('div', { class: `feedback ${ok ? 'good' : 'bad'}` },
          ok ? 'Well done! ⭐ ' : 'Good try! It\'s ', h('b', {}, q.answer.en), h('span', { class: 'muted' }, `  (${q.answer.es})`)))
        SC.speak(q.answer.en)
        done(ok ? 1 : 0, 1)
      } }, picture(o))
      b.dataset.v = o.en
      grid.append(b)
    }
    el.append(...(q.type === 'vread'
      ? [h('div', { class: 'question vword' }, q.answer.en)]
      : [SC.audioButton(q.audio, ctx), h('div', { class: 'question' }, '👆 Listen and point')]), grid, fb)
  }
  R.vread = (el, q, done, ctx) => R.vpick(el, q, done, ctx)

  // Look and spell: tap letter tiles in order (like Reading & Writing Task 3).
  R.vspell = (el, q, done) => {
    let typed = []
    let answered = false
    const slots = h('div', { class: 'note-slots' })
    const row = h('div', { class: 'tiles' })
    const fb = h('div')
    const check = h('button', { class: 'primary', disabled: true }, 'Check answer')
    const draw = () => {
      slots.replaceChildren(...[...q.word].map((_, k) => h('span', { class: 'slot' }, typed[k] != null ? q.tiles[typed[k]] : '')))
      row.replaceChildren(...q.tiles.map((c, k) => h('button', { class: 'tile', disabled: answered || typed.includes(k) || typed.length >= q.word.length,
        onclick: () => { typed.push(k); draw() } }, c)),
      h('button', { class: 'tile secondary', disabled: answered || !typed.length, onclick: () => { typed.pop(); draw() } }, '⌫'))
      check.disabled = answered || typed.length !== q.word.length
    }
    check.onclick = () => {
      if (answered) return
      answered = true
      const ok = typed.map((k) => q.tiles[k]).join('') === q.word
      fb.replaceChildren(h('div', { class: `feedback ${ok ? 'good' : 'bad'}` }, ok ? 'Well done! ⭐ ' : 'Good try! It\'s ', h('b', {}, q.word), h('span', { class: 'muted' }, `  (${q.es})`)))
      SC.speak(q.word)
      draw()
      done(ok ? 1 : 0, 1)
    }
    draw()
    el.append(h('div', { class: 'big-pic' }, picture(q)), slots, row, h('div', { class: 'actions' }, check), fb)
  }

  // Yes or no: see a picture, hear a word. Does it match?
  R.vyesno = (el, q, done, ctx) => {
    let answered = false
    const fb = h('div')
    const pick = (yes) => {
      if (answered) return
      answered = true
      const ok = yes === q.correct
      btns.querySelectorAll('button').forEach((b) => { b.disabled = true })
      fb.replaceChildren(h('div', { class: `feedback ${ok ? 'good' : 'bad'}` }, ok ? 'Well done! ⭐ ' : 'Good try! ',
        'This is ', h('b', {}, q.shown.en), h('span', { class: 'muted' }, `  (${q.shown.es})`)))
      done(ok ? 1 : 0, 1)
    }
    const btns = h('div', { class: 'actions yesno' },
      h('button', { class: 'choice', onclick: () => pick(true) }, '✅ Yes'),
      h('button', { class: 'choice', onclick: () => pick(false) }, '❌ No'))
    el.append(SC.audioButton(q.audio, ctx), h('div', { class: 'big-pic' }, picture(q.shown)), h('div', { class: 'question' }, 'Is it right?'), btns, fb)
  }

  const showEs = () => { try { return SC.storage.getItem('startersShowEs') !== '0' } catch { return true } }
  let open = null // topic id being viewed

  SC.renderVocab = () => {
    const box = $('vocabArea')
    if (!box) return
    const t = open && SC.vocabTopic(open)
    if (!t) {
      box.replaceChildren(h('div', { class: 'cards' }, ...topics().map((x) => h('button', { class: 'card', onclick: () => { open = x.id; SC.renderVocab() } },
        h('span', { class: 'big' }, x.icon), h('b', {}, x.title), h('span', { class: 'muted' }, `${x.es} · ${x.words.length} words`)))))
      return
    }
    const es = showEs()
    box.replaceChildren(
      h('div', { class: 'actions' },
        h('button', { class: 'secondary', onclick: () => { open = null; SC.renderVocab() } }, '← Topics'),
        h('button', { class: 'secondary', onclick: () => { try { SC.storage.setItem('startersShowEs', es ? '0' : '1') } catch { /* */ } SC.renderVocab() } },
          es ? '🇦🇷 Hide Spanish' : '🇦🇷 Show Spanish')),
      h('h3', {}, `${t.icon} ${t.title}`),
      h('p', { class: 'muted' }, '1️⃣ Look and listen: tap a picture. 2️⃣ Say the word out loud. 3️⃣ Play the games.'),
      h('div', { class: 'vgrid' }, ...t.words.map((w) => h('button', { class: 'vcard', onclick: () => SC.speak(w.en) },
        picture(w), h('b', {}, w.en), es ? h('span', { class: 'muted' }, w.es) : ''))),
      h('h3', {}, '🗣️ Say it'),
      h('div', { class: 'phrases' }, ...t.phrases.map((p) => h('button', { class: 'phrase', onclick: () => SC.speak(p.en) },
        h('span', {}, '🔊 ', p.en), es ? h('span', { class: 'muted' }, p.es) : ''))),
      h('h3', {}, '🎮 Play'),
      h('div', { class: 'cards' }, ...SC.VOCAB_GAMES.map((G) => h('button', { class: 'card', onclick: () =>
        SC.startRun(`vocab:${t.id}:${G.id}`, SC.vocabScreens(t.id, G.id), `${t.title} · ${G.label}`, 'vocab') },
      h('b', {}, `${G.icon} ${G.label}`), h('span', { class: 'muted' }, G.help)))),
    )
  }
  document.addEventListener('DOMContentLoaded', () => SC.renderVocab())
  if (document.readyState !== 'loading') SC.renderVocab()
})(globalThis)
