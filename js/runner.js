// Exam runner: plays a list of screens, one question each, and reports
// per-task scores. Example screens are shown but never scored.
//   screens: [{taskId, taskLabel, help, intro?, example?, q}]
//   onFinish({score, total, byTask:{[taskId]:{c,t}}}) — called once, after the last screen
;(function (g) {
  const SC = g.SC
  SC.renderers = SC.renderers || {}

  SC.run = (el, screens, onFinish, opts = {}) => {
    const h = SC.h
    let i = 0
    const byTask = {}
    const seenIntro = new Set()
    let finished = false

    const show = () => {
      const s = screens[i]
      const n = screens.filter((x) => x.taskId === s.taskId && !x.example)
      const pos = n.indexOf(s) + 1
      const taskNo = [...new Set(screens.map((x) => x.taskId))].indexOf(s.taskId) + 1
      const taskCount = new Set(screens.map((x) => x.taskId)).size
      const playIntro = !!s.intro && !seenIntro.has(s.taskId)
      if (s.intro) seenIntro.add(s.taskId)

      const area = h('div', { class: 'qarea' })
      const next = h('button', { class: 'primary', disabled: true }, i === screens.length - 1 ? 'Finish ★' : 'Next →')
      el.replaceChildren(
        h('div', { class: 'muted' }, `${opts.title || ''}${opts.title ? ' · ' : ''}Task ${taskNo} of ${taskCount}`),
        h('h2', {}, s.taskLabel),
        h('p', { class: 'muted' }, s.help || ''),
        h('b', {}, s.example ? 'Example 👀' : `Question ${pos} of ${n.length}`),
        h('div', { class: 'progress' }, h('span', { style: { width: `${(i / screens.length) * 100}%` } })),
        area,
        h('div', { class: 'footer' }, next),
      )
      const done = (c, t) => {
        if (!s.example) {
          const b = (byTask[s.taskId] = byTask[s.taskId] || { c: 0, t: 0 })
          b.c += c
          b.t += t
        }
        next.disabled = false
        next.focus()
      }
      SC.renderers[s.q.type](area, s.q, done, { intro: s.intro, playIntro })
      next.onclick = () => {
        if (i < screens.length - 1) { i++; show(); return }
        if (finished) return
        finished = true
        const score = Object.values(byTask).reduce((a, b) => a + b.c, 0)
        const total = Object.values(byTask).reduce((a, b) => a + b.t, 0)
        onFinish({ score, total, byTask })
      }
    }
    show()
  }

  // Shared UI bits for renderers -------------------------------------------
  // A "listen" button that plays [intro?, audio]; autoplays once.
  SC.audioButton = (audio, ctx = {}, label = '🔊 Listen again') => {
    const h = SC.h
    const wrap = h('div', { class: 'actions' })
    if (ctx.intro) wrap.append(h('button', { class: 'secondary', onclick: () => SC.speakAll([ctx.intro]) }, '📖 Story'))
    wrap.append(h('button', { class: 'secondary', onclick: () => SC.speakAll([audio]) }, label))
    setTimeout(() => SC.speakAll(ctx.playIntro ? [ctx.intro, audio] : [audio]), 50)
    return wrap
  }
  SC.feedback = (ok, answer) =>
    SC.h('div', { class: `feedback ${ok ? 'good' : 'bad'}` }, ok ? 'Well done! ⭐' : `Good try! The answer is: ${answer}`)
  SC.isEmoji = (s) => !/[a-z]/i.test(s)
})(globalThis)
