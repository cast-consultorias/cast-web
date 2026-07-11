/**
 * Script de pre-renderizado estático para CAST Consultorías.
 *
 * Problema que resuelve:
 *   React (Vite SPA) entrega un <div id="root"></div> vacío al crawler.
 *   Google no ejecuta JS en el primer crawl, así que no indexa el contenido.
 *
 * Solución:
 *   1. Build del bundle del cliente (dist/)
 *   2. Build del bundle SSR (dist-ssr/entry-server.js)
 *   3. Render del App a HTML string en Node.js
 *   4. Inyección del HTML en dist/index.html
 *   5. Limpieza del bundle SSR temporal
 *
 * Resultado:
 *   dist/index.html contiene todo el texto real de la página.
 *   Google lo ve en "view-source" sin ejecutar JavaScript.
 *   El cliente hidrata (hydrateRoot) sobre ese HTML → sin FOUC.
 */

import { build } from 'vite'
import { readFileSync, writeFileSync, rmSync, mkdirSync, existsSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath, pathToFileURL } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')

// ─── MOCKS DE ENTORNO BROWSER ────────────────────────────────────────────────
// Node.js 24 define window, navigator, etc. como getters de solo lectura en
// globalThis. Usamos Object.defineProperty para sobrescribirlos de forma segura.
function defineGlobal(key, value) {
  try {
    Object.defineProperty(globalThis, key, {
      value,
      writable: true,
      configurable: true,
    })
  } catch {
    // Si ya está definido y no es configurable, lo ignoramos
  }
}

defineGlobal('window', {
  location: { pathname: '/', href: 'https://castconsultorias.com/' },
  innerWidth: 1280,
  innerHeight: 800,
  devicePixelRatio: 1,
  addEventListener: () => {},
  removeEventListener: () => {},
  requestAnimationFrame: () => 0,
  cancelAnimationFrame: () => {},
  scrollY: 0,
  matchMedia: () => ({ matches: false, addEventListener: () => {}, removeEventListener: () => {} }),
})

defineGlobal('document', {
  createElement: (_tag) => ({
    style: {},
    getContext: () => null,
    setAttribute: () => {},
    appendChild: () => {},
    removeChild: () => {},
    contains: () => false,
  }),
  createElementNS: (_ns, _tag) => ({ style: {} }),
  body: {
    style: {},
    appendChild: () => {},
    removeChild: () => {},
    contains: () => false,
  },
  head: {
    querySelectorAll: () => [],
    appendChild: () => {},
  },
  querySelector: () => null,
  querySelectorAll: () => [],
  getElementById: (id) => (id === 'root' ? { hasChildNodes: () => false } : null),
  addEventListener: () => {},
  removeEventListener: () => {},
})

defineGlobal('navigator', { userAgent: 'node/ssr' })
defineGlobal('self', globalThis)
defineGlobal('requestAnimationFrame', () => 0)
defineGlobal('cancelAnimationFrame', () => {})

// ─── 1. BUILD DEL CLIENTE ────────────────────────────────────────────────────
console.log('\n[prerender] 1/4 — Building client bundle...')
await build({
  root,
  logLevel: 'warn',
})

// ─── 2. BUILD DEL BUNDLE SSR ─────────────────────────────────────────────────
console.log('[prerender] 2/4 — Building SSR bundle...')
await build({
  root,
  logLevel: 'warn',
  build: {
    ssr: resolve(root, 'src/entry-server.jsx'),
    outDir: resolve(root, 'dist-ssr'),
    rollupOptions: {
      output: { format: 'esm' },
    },
    minify: false,
  },
})

// ─── 3. RENDER A HTML ────────────────────────────────────────────────────────
console.log('[prerender] 3/4 — Rendering App to HTML string...')
const entryUrl = pathToFileURL(resolve(root, 'dist-ssr/entry-server.js')).href
const { render } = await import(entryUrl)

// ─── 4. INYECCIÓN EN dist/index.html (home /) ────────────────────────────────
console.log('[prerender] 4/4 — Injecting pre-rendered HTML...')
const template = readFileSync(resolve(root, 'dist/index.html'), 'utf-8')

const homeHtml = render('/')
const hydratedHome = template.replace(
  '<div id="root"></div>',
  `<div id="root">${homeHtml}</div>`
)
writeFileSync(resolve(root, 'dist/index.html'), hydratedHome)

// ─── 4b. PRE-RENDER /blueprint → dist/blueprint/index.html ───────────────────
const blueprintHtml = render('/blueprint')
const blueprintMeta = template
  .replace(
    '<title>CAST Consultorías | Consultoría Estratégica · Barranquilla</title>',
    '<title>Blueprint Session™ CAST — Diagnóstico Estratégico de tu Negocio en 48 horas</title>'
  )
  .replace(
    /<meta name="description" content="[^"]*"/,
    '<meta name="description" content="Deja de emprender a ciegas. Hazte la Radiografía CAST™ (17 preguntas, 5 minutos) y recibe un Diagnóstico Estratégico de 8–12 páginas en 48 horas. Agenda tu Blueprint Session™."'
  )
  .replace(
    '<link rel="canonical" href="https://castconsultorias.com/" />',
    '<link rel="canonical" href="https://castconsultorias.com/blueprint" />'
  )
  // OG tags
  .replace(
    'content="https://castconsultorias.com/" />',
    'content="https://castconsultorias.com/blueprint" />'
  )
  .replace(
    'og:title" content="CAST Consultorías — De la Idea al Impacto Real"',
    'og:title" content="Blueprint Session™ CAST — Diagnóstico Estratégico en 48 horas"'
  )
  .replace(
    /<meta property="og:description" content="[^"]*"/,
    '<meta property="og:description" content="Deja de emprender a ciegas. Hazte la Radiografía CAST™ y recibe tu Diagnóstico Estratégico de 8–12 páginas en 48 horas."'
  )
  .replace(
    /<meta property="og:image" content="[^"]*"/,
    '<meta property="og:image" content="https://castconsultorias.com/og-blueprint.jpg"'
  )
  .replace(
    /<meta property="og:image:alt" content="[^"]*"/,
    '<meta property="og:image:alt" content="Blueprint Session™ CAST — Deja de emprender a ciegas"'
  )
  // Twitter/X tags
  .replace(
    'twitter:title" content="CAST Consultorías — De la Idea al Impacto Real"',
    'twitter:title" content="Blueprint Session™ CAST — Diagnóstico Estratégico en 48 horas"'
  )
  .replace(
    /<meta name="twitter:description" content="[^"]*"/,
    '<meta name="twitter:description" content="Deja de emprender a ciegas. Hazte la Radiografía CAST™ y recibe tu Diagnóstico Estratégico de 8–12 páginas en 48 horas."'
  )
  .replace(
    /<meta name="twitter:image" content="[^"]*"/,
    '<meta name="twitter:image" content="https://castconsultorias.com/og-blueprint.jpg"'
  )
  .replace(
    '<div id="root"></div>',
    `<div id="root">${blueprintHtml}</div>`
  )

const blueprintDir = resolve(root, 'dist/blueprint')
if (!existsSync(blueprintDir)) mkdirSync(blueprintDir, { recursive: true })
writeFileSync(resolve(blueprintDir, 'index.html'), blueprintMeta)
console.log('   dist/blueprint/index.html created.')

// ─── 5. LIMPIEZA ─────────────────────────────────────────────────────────────
try {
  rmSync(resolve(root, 'dist-ssr'), { recursive: true, force: true })
} catch {
  // En Windows / OneDrive el rmSync puede fallar por file-locking.
  // El dist-ssr/ es solo un artefacto temporal; no afecta el resultado.
}

console.log('\n✅ Pre-rendering complete!')
console.log('   dist/index.html now contains full server-rendered HTML.')
console.log('   Google can index all text content without executing JavaScript.\n')
