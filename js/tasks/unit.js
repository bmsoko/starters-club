// Unit 4 renderers (mcq, match, order, reading). pick/gaps come from the exam renderers.
;(function (g) {
  const SC = g.SC
  const h = SC.h
  const R = (SC.renderers = SC.renderers || {})

  R.mcq = (el, q, done) => {
    let answered = false
    const fb = h('div')
    const grid = h('div', { class: 'choices' })
    for (const o of SC.shuffle(q.options)) {
      const b = h('button', { class: 'choice', onclick: () => {
        if (answered) return
        answered = true
        const ok = o === q.answer
        grid.querySelectorAll('.choice').forEach((x) => { if (x.dataset.v === q.answer) x.classList.add('correct'); x.disabled = true })
        if (!ok) b.classList.add('wrong')
        fb.replaceChildren(SC.feedback(ok, q.answer))
        done(ok ? 1 : 0, 1)
      } }, o)
      b.dataset.v = o
      grid.append(b)
    }
    el.append(h('div', { class: 'question' }, q.prompt), grid, fb)
  }

  // Tap a word on the left, then its match on the right. 1 point per pair (first try).
  R.match = (el, q, done) => {
    const rights = SC.shuffle(q.pairs.map((p) => p.right))
    const result = {}
    let sel = null
    const fb = h('div')
    const box = h('div', { class: 'match' })
    const draw = () => {
      box.replaceChildren(
        h('div', {}, ...q.pairs.map((p) => h('button', { class: `choice ${sel === p.left ? 'selected' : ''} ${p.left in result ? (result[p.left] ? 'correct' : 'wrong') : ''}`,
          disabled: p.left in result, onclick: () => { sel = p.left; draw() } }, p.left))),
        h('div', {}, ...rights.map((r) => {
          const usedBy = q.pairs.find((p) => p.right === r && p.left in result)
          return h('button', { class: `choice ${usedBy ? 'correct' : ''}`, disabled: !!usedBy || !sel, onclick: () => {
            const pair = q.pairs.find((p) => p.left === sel)
            result[sel] = pair.right === r
            if (!result[sel]) fb.replaceChildren(h('div', { class: 'feedback bad' }, `${sel} → ${pair.right}`))
            sel = null
            if (Object.keys(result).length === q.pairs.length) {
              const c = Object.values(result).filter(Boolean).length
              fb.replaceChildren(h('div', { class: `feedback ${c === q.pairs.length ? 'good' : 'bad'}` }, `${c} / ${q.pairs.length} correct`))
              done(c, q.pairs.length)
            }
            draw()
          } }, r)
        })))
    }
    draw()
    el.append(h('div', { class: 'question' }, q.prompt), box, fb)
  }

  // Tap the words in order to make the sentence.
  R.order = (el, q, done) => {
    const tiles = SC.shuffle(q.tokens)
    const used = []
    let answered = false
    const line = h('div', { class: 'question' })
    const row = h('div', { class: 'wordbox' })
    const fb = h('div')
    const draw = () => {
      line.textContent = used.map((k) => tiles[k]).join(' ') || '…'
      row.replaceChildren(...tiles.map((t, k) => h('button', { class: 'secondary', disabled: answered || used.includes(k), onclick: () => {
        used.push(k)
        if (used.length === tiles.length) {
          answered = true
          const ok = used.map((j) => tiles[j]).join(' ') === q.answer
          fb.replaceChildren(SC.feedback(ok, q.answer))
          done(ok ? 1 : 0, 1)
        }
        draw()
      } }, t)), h('button', { class: 'secondary', disabled: answered || !used.length, onclick: () => { used.pop(); draw() } }, '⌫'))
    }
    draw()
    el.append(h('p', { class: 'muted' }, q.prompt), line, row, fb)
  }

  // Read a passage and answer each question. 1 point per question.
  R.reading = (el, q, done) => {
    const picks = q.questions.map(() => null)
    const fb = h('div')
    const qs = q.questions.map((x, k) => {
      const grid = h('div', { class: 'choices' })
      for (const o of x.options) {
        const b = h('button', { class: 'choice', onclick: () => {
          if (picks[k] !== null) return
          picks[k] = o
          grid.querySelectorAll('.choice').forEach((y) => { if (y.dataset.v === x.answer) y.classList.add('correct'); y.disabled = true })
          if (o !== x.answer) b.classList.add('wrong')
          if (!picks.includes(null)) {
            const c = picks.filter((p, j) => p === q.questions[j].answer).length
            fb.replaceChildren(h('div', { class: `feedback ${c === picks.length ? 'good' : 'bad'}` }, `${c} / ${picks.length} correct`))
            done(c, picks.length)
          }
        } }, o)
        b.dataset.v = o
        grid.append(b)
      }
      return h('div', {}, h('p', { class: 'question', style: { fontSize: '19px' } }, x.q), grid)
    })
    el.append(h('div', { class: 'passage' }, q.passage), ...qs, fb)
  }
})(globalThis)
