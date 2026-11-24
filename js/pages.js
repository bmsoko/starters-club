// Pages: Mock exams, Practice by task, results and exam history.
// Pure helpers (mockScreens, taskScreens, recordResult) are Node-testable;
// the DOM parts only run in the browser.
;(function (g) {
  const SC = g.SC
  const D = () => g.SC_DATA || {}
  const PAPERS = ['listening', 'reading', 'speaking']
  const PAPER_LABEL = { listening: '🎧 Listening', reading: '📖 Reading & Writing', speaking: '🗣️ Speaking' }
  const points = (q) => (q.type === 'gaps' ? q.sentences.length : q.type === 'comic' ? q.questions.length : 1)

  const findMock = (examId) => {
    for (const p of PAPERS) {
      const m = (D()[p]?.mocks || []).find((x) => x.id === examId)
      if (m) return m
    }
    return null
  }
  const paperOfTask = (taskId) => PAPERS.find((p) => D()[p]?.tasks?.[taskId])

  const screen = (t, q, example = false) => ({
    taskId: t.taskId, taskLabel: t.label, help: t.help, intro: q.intro || t.intro, example, q,
  })

  SC.mockScreens = (examId) => {
    const m = findMock(examId)
    if (!m) return []
    return m.tasks.flatMap((t) => [screen(t, t.example, true), ...t.questions.map((q) => screen(t, q))])
  }

  // Random questions of one task (mocks + bank), up to 5 points, no repeats.
  // Story questions (L2) come from a single story so the intro makes sense.
  SC.taskScreens = (taskId, target = 5) => {
    const p = paperOfTask(taskId)
    if (!p) return []
    const meta = { taskId, ...D()[p].tasks[taskId] }
    let pool = [
      ...D()[p].mocks.flatMap((m) => {
        const t = m.tasks.find((x) => x.taskId === taskId)
        return t.questions.map((q) => ({ ...q, intro: q.intro || t.intro }))
      }),
      ...(D()[p].bank[taskId] || []),
    ]
    if (pool.some((q) => q.intro)) {
      const stories = [...new Set(pool.map((q) => q.intro))]
      const story = stories[Math.floor(Math.random() * stories.length)]
      pool = pool.filter((q) => q.intro === story)
    }
    const out = []
    let pts = 0
    for (const q of SC.shuffle(pool)) {
      if (pts >= target) break
      out.push(screen(meta, q))
      pts += points(q)
    }
    return out
  }

  // Quick speaking: 2 questions from each part, in exam order.
  SC.speakingQuick = () => ['S1', 'S2', 'S3', 'S4'].flatMap((id) => SC.taskScreens(id, 2))

  // ---- New mock exam: a fresh paper in the Starters Digital format, built
  // from every question we have, preferring the ones seen least.
  const FORMAT = {
    listening: { L1: { n: 2 }, L2: { story: 5 }, L3: { n: 5 }, L4: { n: 3 }, L5: { types: { place: 3, colour: 2 } } },
    reading: { R1: { n: 5 }, R2: { n: 5 }, R3: { modes: { pair: 2, scramble: 3 } }, R4: { n: 1 }, R5: { n: 1 } },
    speaking: { S1: { types: { point: 3, place: 2 } }, S2: { picture: 4 }, S3: { n: 4 }, S4: { n: 5 } },
  }
  const leastSeen = (pool, n, counts) => {
    const unique = [...new Map(pool.map((q) => [SC.qKey(q), q])).values()]
    return SC.shuffle(unique).sort((a, b) => (counts[SC.qKey(a)] || 0) - (counts[SC.qKey(b)] || 0)).slice(0, n)
  }
  const avg = (qs, counts) => qs.reduce((a, q) => a + (counts[SC.qKey(q)] || 0), 0) / Math.max(qs.length, 1)

  SC.newMockScreens = (paper) => {
    const P = D()[paper]
    if (!P) return []
    const counts = SC.seenCounts()
    const out = []
    for (const [taskId, rule] of Object.entries(FORMAT[paper])) {
      const meta = { taskId, ...P.tasks[taskId] }
      const fromMocks = P.mocks.map((m) => m.tasks.find((t) => t.taskId === taskId))
      const pool = [...fromMocks.flatMap((t) => t.questions), ...(P.bank[taskId] || [])]
      let example = SC.shuffle(fromMocks)[0].example
      let qs
      if (rule.story || rule.picture) {
        // One story (L2) or one picture (S2): keep a whole group together.
        const field = rule.story ? 'intro' : 'show'
        const groups = new Map()
        for (const t of fromMocks) {
          const key = t[field] || t.questions[0][field]
          groups.set(key, { key, example: t.example, qs: t.questions.map((q) => ({ ...q, [field]: key })) })
        }
        for (const q of P.bank[taskId] || []) {
          const g = groups.get(q[field]) || { key: q[field], example: null, qs: [] }
          if (!groups.has(q[field])) groups.set(q[field], g)
          if (!g.qs.some((x) => x.audio === q.audio)) g.qs.push(q)
        }
        const need = rule.story || rule.picture
        const ok = SC.shuffle([...groups.values()].filter((g) => g.qs.length >= need))
          .sort((a, b) => avg(a.qs, counts) - avg(b.qs, counts))
        const g = ok[0]
        example = g.example
        qs = leastSeen(g.qs, need, counts)
        if (rule.story) meta.intro = g.key
      } else if (rule.types || rule.modes) {
        const field = rule.types ? 'type' : 'mode'
        qs = Object.entries(rule.types || rule.modes).flatMap(([v, n]) => leastSeen(pool.filter((q) => q[field] === v), n, counts))
      } else {
        qs = leastSeen(pool, rule.n, counts)
      }
      if (example) out.push(screen(meta, example, true))
      out.push(...qs.map((q) => screen(meta, q)))
    }
    return out
  }
  const PAPER_NAME = { listening: 'Listening', reading: 'Reading & Writing', speaking: 'Speaking' }
  SC.isExam = (examId) => /^L-T\d/.test(examId) || examId === 'new:listening'

  const UNIT_LABELS = { listening: 'Listening', vocabulary: 'Vocabulary', grammar: 'Grammar', reading: 'Reading', writing: 'Writing' }
  SC.unitScreens = () => {
    const U = D().unit4
    if (!U) return []
    return Object.keys(UNIT_LABELS).flatMap((sec) =>
      SC.shuffle(U.items[sec] || []).slice(0, U.counts[sec] || 0).map((q) => screen({ taskId: sec, label: UNIT_LABELS[sec], help: '' }, q)))
  }
  SC.taskLabel = (id) => D()[paperOfTask(id)]?.tasks?.[id]?.label || UNIT_LABELS[id] || id

  SC.recordResult = (examId, { score, total, byTask }) => {
    const s = SC.loadStats()
    s.stars += score
    s.rounds += 1
    s.best = Math.max(s.best, total ? Math.round((score / total) * 100) : 0)
    SC.saveStats(s)
    SC.exams.add(examId, { date: new Date().toISOString(), score, total, byTask })
  }

  SC.examTitle = (examId) =>
    findMock(examId)?.title || (examId.startsWith('new:') ? `${PAPER_NAME[examId.slice(4)]} · New mock exam` : '') || (examId === 'U4' ? D().unit4?.title : '') || (examId === 'task:S' ? 'Quick speaking' : '') ||
    (examId.startsWith('task:') ? `Practice · ${D()[paperOfTask(examId.slice(5))]?.tasks[examId.slice(5)]?.label}` : examId)

  // ---------------------------------------------------------------- DOM
  if (typeof document === 'undefined') return
  const h = SC.h
  const $ = (id) => document.getElementById(id)

  const lastBest = (examId) => {
    const hist = SC.exams.history(examId)
    if (!hist.length) return 'Not tried yet'
    const last = hist[hist.length - 1]
    const best = Math.max(...hist.map((x) => x.score / x.total))
    return `Last: ${last.score}/${last.total} · Best: ${Math.round(best * 100)}%`
  }

  const stars = (score, total) => {
    const r = total ? score / total : 0
    return r >= 0.9 ? '⭐⭐⭐' : r >= 0.7 ? '⭐⭐' : r >= 0.5 ? '⭐' : '💪'
  }

  SC.startRun = (examId, screens, title, back) => {
    if (!screens.length) return
    SC.show('exam')
    $('noAudio').classList.add('hidden')
    SC.run($('examArea'), screens, (res) => {
      SC.recordResult(examId, res)
      SC.markSeen(screens.filter((x) => !x.example).map((x) => x.q))
      if (SC.refreshStats) SC.refreshStats()
      const tasks = Object.entries(res.byTask)
      $('examArea').replaceChildren(
        h('div', { style: { textAlign: 'center' } },
          h('div', { style: { fontSize: '56px' } }, '🏆'),
          h('h2', {}, title),
          h('p', { class: 'question' }, `${res.score} / ${res.total}  ${stars(res.score, res.total)}`)),
        h('table', { class: 'results' }, ...tasks.map(([id, v]) => {
          return h('tr', {}, h('td', {}, SC.taskLabel(id)), h('td', {}, `${v.c} / ${v.t}`))
        })),
        h('div', { class: 'actions' },
          h('button', { class: 'primary', onclick: () => SC.startRun(examId, examId.startsWith('new:') ? SC.newMockScreens(examId.slice(4)) : examId === 'task:S' ? SC.speakingQuick() : examId.startsWith('task:') ? SC.taskScreens(examId.slice(5)) : examId === 'U4' ? SC.unitScreens() : screens, title, back) }, 'Try again 🔁'),
          h('button', { class: 'secondary', onclick: () => { SC.show(back); renderAll() } }, '← Back')),
      )
    }, { title, exam: SC.isExam(examId) })
  }

  const newCard = (p, back) => h('button', { class: 'card new', onclick: () => SC.startRun(`new:${p}`, SC.newMockScreens(p), SC.examTitle(`new:${p}`), back) },
    h('b', {}, '🎲 New mock exam'), h('span', { class: 'muted' }, `A new test every time · ${lastBest(`new:${p}`)}`))

  const renderMocks = () => {
    $('mockList').replaceChildren(...PAPERS.map((p) => h('div', {},
      h('h3', {}, PAPER_LABEL[p]),
      h('div', { class: 'cards' }, newCard(p, 'mocks'), ...(D()[p]?.mocks || []).map((m) => h('button', { class: 'card', onclick: () => SC.startRun(m.id, SC.mockScreens(m.id), m.title, 'mocks') },
        h('b', {}, m.title.split('·')[1] || m.title), h('span', { class: 'muted' }, lastBest(m.id))))))))
  }

  const renderTasks = () => {
    $('taskList').replaceChildren(...PAPERS.map((p) => h('div', {},
      h('h3', {}, PAPER_LABEL[p]),
      h('div', { class: 'cards' }, ...Object.entries(D()[p]?.tasks || {}).map(([id, t], k) => h('button', { class: 'card',
        onclick: () => SC.startRun(`task:${id}`, SC.taskScreens(id), `Practice · ${t.label}`, 'tasks') },
      h('b', {}, `${p === 'speaking' ? 'Part' : 'Task'} ${k + 1}`), h('span', {}, t.label)))))))
  }

  const renderHistory = () => {
    const all = SC.exams.load()
    const rows = Object.entries(all).flatMap(([id, list]) => (Array.isArray(list) ? list : []).map((e) => ({ id, ...e })))
      .sort((a, b) => String(b.date).localeCompare(String(a.date))).slice(0, 20)
    let box = $('examHistory')
    if (!box) {
      box = h('div', { id: 'examHistory' })
      $('progress').insertBefore(box, $('again'))
    }
    box.replaceChildren(h('h3', {}, 'Mock exams & practice 📝'),
      rows.length ? h('table', { class: 'results' }, ...rows.map((r) => h('tr', {},
        h('td', {}, new Date(r.date).toLocaleDateString()), h('td', {}, SC.examTitle(r.id)), h('td', {}, `${r.score} / ${r.total}`))))
        : h('p', { class: 'muted' }, 'No exams yet. Try one!'))
  }

  const renderUnit = () => {
    const U = D().unit4
    if (!U) return
    $('unitArea').replaceChildren(
      h('p', { class: 'muted' }, 'Listening, vocabulary, grammar, reading and writing · about 6 minutes'),
      h('p', {}, lastBest('U4')),
      h('button', { class: 'primary', onclick: () => SC.startRun('U4', SC.unitScreens(), U.title, 'unit4') }, 'Start Unit 4 ▶'))
  }

  const renderSpeaking = () => {
    const box = $('speakArea')
    if (!box) return
    const S = D().speaking
    if (!S) return
    box.replaceChildren(
      h('div', { class: 'cards' }, newCard('speaking', 'speaking'), ...S.mocks.map((m) => h('button', { class: 'card', onclick: () => SC.startRun(m.id, SC.mockScreens(m.id), m.title, 'speaking') },
        h('b', {}, m.title.split('·')[1] || m.title), h('span', { class: 'muted' }, lastBest(m.id)))),
      h('button', { class: 'card', onclick: () => SC.startRun('task:S', SC.speakingQuick(), 'Quick speaking', 'speaking') },
        h('b', {}, 'Quick speaking 🎲'), h('span', { class: 'muted' }, 'Random questions from every part'))))
  }

  const renderAll = () => { renderMocks(); renderTasks(); renderHistory(); renderUnit(); renderSpeaking() }
  SC.onShow = (v) => { if (SC.stopAudio) SC.stopAudio(); if (['mocks', 'tasks', 'progress', 'unit4', 'speaking'].includes(v)) renderAll() }
  document.addEventListener('DOMContentLoaded', renderAll)
  if (document.readyState !== 'loading') renderAll()
})(globalThis)
