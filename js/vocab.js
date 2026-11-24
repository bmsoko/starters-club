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
    el.append(SC.audioButton(q.audio, ctx), h('div', { class: 'question' }, '👆 Listen and point'), grid, fb)
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
      h('p', { class: 'muted' }, '1️⃣ Look and listen: tap a picture. 2️⃣ Say the word out loud. 3️⃣ Play "Listen and point".'),
      h('div', { class: 'vgrid' }, ...t.words.map((w) => h('button', { class: 'vcard', onclick: () => SC.speak(w.en) },
        picture(w), h('b', {}, w.en), es ? h('span', { class: 'muted' }, w.es) : ''))),
      h('h3', {}, '🗣️ Say it'),
      h('div', { class: 'phrases' }, ...t.phrases.map((p) => h('button', { class: 'phrase', onclick: () => SC.speak(p.en) },
        h('span', {}, '🔊 ', p.en), es ? h('span', { class: 'muted' }, p.es) : ''))),
      h('div', { class: 'actions' }, h('button', { class: 'primary', onclick: () => {
        const meta = { taskId: 'vocab', taskLabel: 'Listen and point', help: 'Listen. Tap the right picture.' }
        const screens = SC.vocabRounds(t.id, 8).map((r) => ({ ...meta, q: { type: 'vpick', audio: r.answer.en, options: r.options, answer: r.answer } }))
        SC.startRun(`vocab:${t.id}`, screens, `Vocabulary · ${t.title}`, 'vocab')
      } }, '🎧 Listen and point ▶')),
    )
  }
  document.addEventListener('DOMContentLoaded', () => SC.renderVocab())
  if (document.readyState !== 'loading') SC.renderVocab()
})(globalThis)
