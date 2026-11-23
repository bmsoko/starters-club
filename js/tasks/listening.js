// Listening task renderers. Contract: render(el, q, done(correct, total), ctx)
;(function (g) {
  const SC = g.SC
  const h = SC.h
  const R = (SC.renderers = SC.renderers || {})

  // Choose one of three options (pictures or short texts).
  const choose = (el, q, done, ctx, { audio = true } = {}) => {
    let answered = false
    const opts = SC.shuffle(q.options)
    const grid = h('div', { class: `choices ${opts.every(SC.isEmoji) ? 'pics' : ''}` })
    const fb = h('div')
    for (const o of opts) {
      const b = h('button', { class: 'choice', onclick: () => {
        if (answered) return
        answered = true
        const ok = o === q.answer
        b.classList.add(ok ? 'correct' : 'wrong')
        grid.querySelectorAll('.choice').forEach((x) => { if (x.dataset.v === q.answer) x.classList.add('correct'); x.disabled = true })
        fb.replaceChildren(SC.feedback(ok, q.answer))
        done(ok ? 1 : 0, 1)
      } }, o)
      b.dataset.v = o
      grid.append(b)
    }
    el.append(...[audio && SC.audioButton(q.audio, ctx), q.prompt && h('div', { class: 'question' }, q.prompt), grid, fb].filter(Boolean))
  }

  R.pick = (el, q, done, ctx) => choose(el, q, done, ctx)
  R.reply = (el, q, done, ctx) => choose(el, q, done, ctx)

  // Note-taking: tap letter/number tiles to fill the note.
  R.notes = (el, q, done, ctx) => {
    const isNum = /^\d+$/.test(q.answer)
    const target = q.answer.toUpperCase()
    const pool = isNum ? '0123456789' : 'ABCDEFGHIJKLMNOPRSTUVWY'
    const extra = SC.shuffle([...pool].filter((c) => !target.includes(c))).slice(0, 3)
    const tiles = SC.shuffle([...target, ...extra])
    let typed = []
    let answered = false
    const slots = h('div', { class: 'note-slots' })
    const tileRow = h('div', { class: 'tiles' })
    const fb = h('div')
    const check = h('button', { class: 'primary', disabled: true }, 'Check answer')
    const draw = () => {
      slots.replaceChildren(...[...target].map((_, k) => h('span', { class: 'slot' }, typed[k] != null ? tiles[typed[k]] : '')))
      tileRow.replaceChildren(
        ...tiles.map((c, k) => h('button', { class: 'tile', disabled: answered || typed.includes(k) || typed.length >= target.length,
          onclick: () => { typed.push(k); draw() } }, c)),
        h('button', { class: 'tile secondary', disabled: answered || !typed.length, onclick: () => { typed.pop(); draw() } }, '⌫'),
      )
      check.disabled = answered || typed.length !== target.length
    }
    check.onclick = () => {
      if (answered) return
      answered = true
      const ok = typed.map((k) => tiles[k]).join('') === target
      fb.replaceChildren(SC.feedback(ok, q.answer))
      draw()
      done(ok ? 1 : 0, 1)
    }
    draw()
    el.append(SC.audioButton(q.audio, ctx), h('div', { class: 'note' }, h('div', { class: 'muted' }, '📝 ' + q.label), slots), tileRow, h('div', { class: 'actions' }, check), fb)
  }

  // Picture editing: tap a place in the picture for the object.
  R.place = (el, q, done, ctx) => {
    let answered = false
    const fb = h('div')
    const scene = h('div', { class: 'scene' })
    for (const s of q.scene) {
      const b = h('button', { class: 'spot', onclick: () => {
        if (answered) return
        answered = true
        const ok = s.slot === q.answer
        b.append(h('span', { class: 'placed' }, q.object))
        b.classList.add(ok ? 'correct' : 'wrong')
        scene.querySelectorAll('.spot').forEach((x) => { if (x.dataset.slot === q.answer) x.classList.add('correct'); x.disabled = true })
        fb.replaceChildren(SC.feedback(ok, q.scene.find((x) => x.slot === q.answer).emoji + ' ' + q.answer))
        done(ok ? 1 : 0, 1)
      } }, s.emoji)
      b.dataset.slot = s.slot
      scene.append(b)
    }
    el.append(SC.audioButton(q.audio, ctx), h('div', { class: 'question' }, 'Where does it go? ', h('span', { class: 'big' }, q.object)), scene, fb)
  }

  // Colouring: tap the object, then a crayon, then check.
  R.colour = (el, q, done, ctx) => {
    let obj = null
    let col = null
    let answered = false
    const fb = h('div')
    const objs = h('div', { class: 'scene' })
    const crayons = h('div', { class: 'crayons' })
    const check = h('button', { class: 'primary', disabled: true }, 'Check answer')
    const draw = () => {
      objs.replaceChildren(...q.objects.map((o) => h('button', {
        class: `spot ${o === obj ? 'selected' : ''} ${answered && o === q.target ? 'correct' : ''}`,
        style: { background: o === obj && col ? SC.SWATCH[col] + '99' : '' }, disabled: answered,
        onclick: () => { obj = o; draw() } }, o)))
      crayons.replaceChildren(...SC.COLOURS.map((c) => h('button', {
        class: `crayon ${c === col ? 'selected' : ''}`, title: c, 'aria-label': c, disabled: answered,
        style: { background: SC.SWATCH[c] }, onclick: () => { col = c; draw() } })))
      check.disabled = answered || !obj || !col
    }
    check.onclick = () => {
      if (answered) return
      answered = true
      const ok = obj === q.target && col === q.colour
      fb.replaceChildren(SC.feedback(ok, `${q.target} ${q.colour}`))
      draw()
      done(ok ? 1 : 0, 1)
    }
    draw()
    el.append(SC.audioButton(q.audio, ctx), objs, crayons, h('div', { class: 'actions' }, check), fb)
  }
})(globalThis)
