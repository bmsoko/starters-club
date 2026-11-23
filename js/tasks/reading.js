// Reading & Writing renderers. Contract: render(el, q, done(correct, total), ctx)
;(function (g) {
  const SC = g.SC
  const h = SC.h
  const R = (SC.renderers = SC.renderers || {})

  // One-of-three choice with no audio (posters, chats, letter pairs).
  const choose = (opts, answer, done, fb, show = (o) => o) => {
    let answered = false
    const grid = h('div', { class: `choices ${opts.every(SC.isEmoji) ? 'pics' : ''}` })
    for (const o of SC.shuffle(opts)) {
      const b = h('button', { class: 'choice', onclick: () => {
        if (answered) return
        answered = true
        const ok = o === answer
        b.classList.add(ok ? 'correct' : 'wrong')
        grid.querySelectorAll('.choice').forEach((x) => { if (x.dataset.v === answer) x.classList.add('correct'); x.disabled = true })
        fb.replaceChildren(SC.feedback(ok, show(answer)))
        done(ok ? 1 : 0, 1)
      } }, show(o))
      b.dataset.v = o
      grid.append(b)
    }
    return grid
  }

  R.poster = (el, q, done) => {
    const fb = h('div')
    el.append(h('div', { class: 'poster' }, q.poster), choose(q.options, q.answer, done, fb), fb)
  }

  R.chat = (el, q, done) => {
    const fb = h('div')
    el.append(
      h('div', { class: 'chat' }, ...q.messages.map((m) => h('div', { class: `bubble ${m.from === q.messages[0].from ? 'friend' : 'me'}` }, h('small', {}, m.from), h('br'), m.text))),
      h('div', { class: 'question' }, q.prompt),
      choose(q.options, q.answer, done, fb), fb)
  }

  R.letters = (el, q, done) => {
    const fb = h('div')
    const pic = h('div', { class: 'big-pic' }, q.emoji)
    if (q.mode === 'pair') {
      el.append(pic, h('div', { class: 'question' }, q.blank.replace('__', ' _ _ ')),
        choose(q.choices, q.answer, done, fb, (o) => q.blank.replace('__', o)), fb)
      return
    }
    const tiles = SC.scramble(q.word)
    const used = []
    let answered = false
    const slots = h('div', { class: 'note-slots' })
    const row = h('div', { class: 'tiles' })
    const draw = () => {
      slots.replaceChildren(...tiles.map((_, k) => h('span', { class: 'slot' }, used[k] != null ? tiles[used[k]] : '')))
      row.replaceChildren(
        ...tiles.map((c, k) => h('button', { class: 'tile', disabled: answered || used.includes(k), onclick: () => {
          used.push(k)
          if (used.length === tiles.length) {
            answered = true
            const ok = used.map((j) => tiles[j]).join('') === q.word
            fb.replaceChildren(SC.feedback(ok, q.word))
            done(ok ? 1 : 0, 1)
          }
          draw()
        } }, c)),
        h('button', { class: 'tile secondary', disabled: answered || !used.length, onclick: () => { used.pop(); draw() } }, '⌫'))
    }
    draw()
    el.append(pic, slots, row, fb)
  }

  // Fill gaps in order by tapping words from the box. 1 point per gap.
  R.gaps = (el, q, done) => {
    const fills = q.sentences.map(() => null)
    let finished = false
    const text = h('div', { class: 'gap-text' })
    const box = h('div', { class: 'wordbox' })
    const fb = h('div')
    const draw = () => {
      const active = fills.indexOf(null)
      text.replaceChildren(...q.sentences.map((s, k) => {
        const [a, b] = s.text.split('___')
        const state = !finished ? (k === active ? 'active' : '') : fills[k] === s.answer ? 'right' : 'wrongfill'
        return h('p', {}, a, h('span', { class: `gap ${state}` }, fills[k] ?? ' '), b,
          finished && fills[k] !== s.answer ? h('b', { class: 'fix' }, ` (${s.answer})`) : '')
      }))
      box.replaceChildren(...q.bank.map((w) => h('button', { class: 'secondary', disabled: finished || fills.includes(w), onclick: () => {
        const k = fills.indexOf(null)
        if (k < 0) return
        fills[k] = w
        if (!fills.includes(null)) {
          finished = true
          const c = fills.filter((f, j) => f === q.sentences[j].answer).length
          fb.replaceChildren(h('div', { class: `feedback ${c === fills.length ? 'good' : 'bad'}` }, `${c} / ${fills.length} correct`))
          done(c, fills.length)
        }
        draw()
      } }, w)),
      h('button', { class: 'secondary', disabled: finished || fills.every((f) => f === null), onclick: () => {
        const k = fills.indexOf(null) - 1; if (k >= 0) fills[k] = null; draw() } }, '⌫'))
    }
    draw()
    el.append(q.title && q.title !== 'Example' ? h('h3', {}, q.title) : '', text, h('div', { class: 'muted' }, 'Word box:'), box, fb)
  }

  // Comic: read panels, type one word per question. 1 point per question.
  R.comic = (el, q, done) => {
    const inputs = q.questions.map((x) => h('input', { autocomplete: 'off', autocapitalize: 'off', spellcheck: 'false', 'aria-label': x.q }))
    const marks = q.questions.map(() => h('span', { class: 'mark' }))
    const fb = h('div')
    const check = h('button', { class: 'primary' }, 'Check answers')
    check.onclick = () => {
      if (inputs.some((i) => !i.value.trim())) { fb.replaceChildren(h('div', { class: 'feedback bad' }, 'Write an answer for every question first!')); return }
      let c = 0
      q.questions.forEach((x, k) => {
        const ok = SC.isAccepted(inputs[k].value, x.answer, x.accept)
        if (ok) c++
        inputs[k].disabled = true
        inputs[k].classList.add(ok ? 'right' : 'wrongfill')
        marks[k].textContent = ok ? ' ✓' : ` ✗ ${x.answer}`
      })
      check.remove()
      fb.replaceChildren(h('div', { class: `feedback ${c === inputs.length ? 'good' : 'bad'}` }, `${c} / ${inputs.length} correct`))
      done(c, inputs.length)
    }
    el.append(
      q.title && q.title !== 'Example' ? h('h3', {}, q.title) : '',
      h('div', { class: 'comic' }, ...q.panels.map((p) => h('div', { class: 'panel-c' }, h('div', { class: 'big-pic' }, p.emoji), h('p', {}, p.caption)))),
      ...q.questions.map((x, k) => h('label', { class: 'qa' }, h('span', {}, x.q), inputs[k], marks[k])),
      h('div', { class: 'actions' }, check), fb)
  }
})(globalThis)
