// Test helpers: load browser scripts into Node's global scope.
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import vm from 'node:vm'

const root = fileURLToPath(new URL('..', import.meta.url))

export function memoryStorage(init = {}) {
  const m = new Map(Object.entries(init))
  return { getItem: (k) => (m.has(k) ? m.get(k) : null), setItem: (k, v) => m.set(k, String(v)), removeItem: (k) => m.delete(k) }
}

export function load(...files) {
  for (const f of files) vm.runInThisContext(readFileSync(root + f, 'utf8'), { filename: f })
  return globalThis.SC
}
