// Speaking renderers. Contract: render(el, q, done(correct, total), ctx)
//   point: tap the thing the examiner names (auto-marked)
//   ask:   Estani answers out loud; a grown-up marks it
;(function (g) {
  const SC = g.SC
  const h = SC.h
  const R = (SC.renderers = SC.renderers || {})

  R.point = (el, q, done, ctx) => {
    let answered = false
    const fb = h('div')
    const scene = h('div', { class: 'scene' })
    for (const s of q.scene) {
      const b = h('button', { class: 'spot', 'aria-label': s.slot, onclick: () => {
        if (answered) return
        answered = true
        const ok = s.slot === q.answer
        b.classList.add(ok ? 'correct' : 'wrong')
        scene.querySelectorAll('.spot').forEach((x) => { if (x.dataset.slot === q.answer) x.classList.add('correct'); x.disabled = true })
        fb.replaceChildren(SC.feedback(ok, q.scene.find((x) => x.slot === q.answer).emoji + ' ' + q.answer))
        done(ok ? 1 : 0, 1)
      } }, s.emoji)
      b.dataset.slot = s.slot
      scene.append(b)
    }
    el.append(SC.audioButton(q.audio, ctx), h('div', { class: 'question' }, '👆 Tap it!'), scene, fb)
  }

  R.ask = (el, q, done, ctx) => {
    let answered = false
    const fb = h('div')
    const mark = (ok) => {
      if (answered) return
      answered = true
      marks.querySelectorAll('button').forEach((b) => { b.disabled = true })
      fb.replaceChildren(h('div', { class: `feedback ${ok ? 'good' : 'bad'}` }, ok ? 'Well done! ⭐' : 'Good try! Practise this one again soon. 💪'))
      done(ok ? 1 : 0, 1)
    }
    const marks = h('div', { class: 'actions marks' },
      h('button', { class: 'primary', onclick: () => mark(true) }, '✅ Good'),
      h('button', { class: 'secondary', onclick: () => SC.speakAll([q.audio]) }, '🔁 Try again'),
      h('button', { class: 'secondary', onclick: () => mark(false) }, '⏭ Not yet'))
    el.append(
      SC.audioButton(q.audio, ctx),
      q.show ? h('div', { class: `speak-pic ${[...q.show].length <= 3 ? 'card-pic' : ''}` }, q.show) : h('div', { class: 'big-pic' }, '🗣️'),
      h('p', { class: 'muted' }, '🎤 Answer out loud. Grown-up: mark the answer.'),
      marks,
      h('details', { class: 'examples' }, h('summary', {}, '👀 Example answers'), h('ul', {}, ...q.examples.map((x) => h('li', {}, x)))),
      fb)
  }
})(globalThis)
