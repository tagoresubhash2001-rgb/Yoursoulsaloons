#!/usr/bin/env node
// Crawl the BUILT site (dist/) and prove every image returns 200 with an image content-type.
//
// Serves dist/ like Firebase Hosting does: case-sensitive paths, the redirects from firebase.json,
// and the catch-all SPA rewrite to index.html. That last point matters: on Firebase a missing image
// does NOT 404 — it returns index.html with status 200 — so we also require an image/* content-type.
//
// Image URLs are collected two ways:
//   1. statically from dist/index.html, JS and CSS bundles (src, srcset candidates, url(...), meta/link icons)
//   2. by rendering all 8 routes in Chromium (if Playwright is available) and reading every <img> currentSrc,
//      every srcset candidate, CSS background-image, <link rel=icon|preload|apple-touch-icon> and og:image.
//
// Usage: npm run build && node scripts/check-images.mjs
//        node scripts/check-images.mjs --base=https://yoursoulsaloons.web.app   (check the LIVE site instead)
import { createServer } from 'node:http';
import { readFileSync, existsSync, statSync, readdirSync } from 'node:fs';
import { join, extname, relative } from 'node:path';
import { createRequire } from 'node:module';

const root = new URL('..', import.meta.url).pathname;
const dist = join(root, 'dist');
const baseArg = process.argv.find((a) => a.startsWith('--base='))?.slice(7).replace(/\/$/, '');
if (!baseArg && !existsSync(join(dist, 'index.html'))) {
  console.error('dist/ not found — run `npm run build` first.');
  process.exit(1);
}
const hosting = JSON.parse(readFileSync(join(root, 'firebase.json'), 'utf8')).hosting;
const redirects = hosting.redirects ?? [];
const ROUTES = ['/salon', '/salon/about', '/salon/services', '/salon/contact', '/academy', '/academy/about', '/academy/services', '/academy/contact'];
const TYPES = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.ico': 'image/x-icon', '.svg': 'image/svg+xml', '.pdf': 'application/pdf', '.xml': 'application/xml', '.txt': 'text/plain', '.webmanifest': 'application/manifest+json' };

// Case-sensitive existence check (Firebase Hosting is case-sensitive; so is Linux).
function existsExactCase(absPath) {
  const parts = relative(dist, absPath).split('/');
  let dir = dist;
  for (const p of parts) {
    if (!readdirSync(dir).includes(p)) return false;
    dir = join(dir, p);
  }
  return statSync(dir).isFile();
}

const server = createServer((req, res) => {
  const url = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  const r = redirects.find((x) => x.source === url);
  if (r) {
    res.writeHead(r.type ?? 301, { Location: r.destination });
    return res.end();
  }
  const file = join(dist, url);
  if (file.startsWith(dist) && url !== '/' && existsExactCase(file)) {
    res.writeHead(200, { 'Content-Type': TYPES[extname(file).toLowerCase()] ?? 'application/octet-stream' });
    return res.end(readFileSync(file));
  }
  res.writeHead(200, { 'Content-Type': 'text/html' }); // SPA rewrite, exactly like firebase.json "** → /index.html"
  res.end(readFileSync(join(dist, 'index.html')));
});
if (!baseArg) await new Promise((ok) => server.listen(0, ok));
const origin = baseArg ?? `http://localhost:${server.address().port}`;

const found = new Map(); // url → Set(where)
const photoUses = new Map(); // photo (size suffix stripped) → ['route #n', …] — one entry per <img> element at 1280px
const add = (u, where) => {
  if (!u || u.startsWith('data:')) return;
  const abs = new URL(u, origin);
  if (abs.origin !== origin && !abs.hostname.endsWith('web.app')) return; // external hosts aren't ours
  const key = abs.pathname;
  if (!found.has(key)) found.set(key, new Set());
  found.get(key).add(where);
};
const IMG_RE = /["'(\s,](\/(?:images|assets|downloads)?\/?[\w./-]+\.(?:webp|png|jpe?g|gif|svg|ico|avif))/gi;

// 1. Static scan of build output (live mode: the deployed index.html and the JS/CSS it references)
if (baseArg) {
  const html = await (await fetch(origin + '/')).text();
  for (const m of html.matchAll(IMG_RE)) add(m[1], 'static:live index.html');
  for (const m of html.matchAll(/(?:src|href)="(\/assets\/[^"]+\.(?:js|css))"/g)) {
    const text = await (await fetch(origin + m[1])).text();
    for (const x of text.matchAll(IMG_RE)) add(x[1], `static:live ${m[1]}`);
  }
}
const walk = (d) => readdirSync(d).flatMap((f) => (statSync(join(d, f)).isDirectory() ? walk(join(d, f)) : [join(d, f)]));
for (const f of (baseArg ? [] : walk(dist)).filter((f) => /\.(html|js|css|webmanifest)$/.test(f))) {
  const text = readFileSync(f, 'utf8');
  for (const m of text.matchAll(IMG_RE)) add(m[1], `static:${relative(dist, f)}`);
}

// 2. Rendered scan of every route
let rendered = false;
try {
  const require = createRequire(import.meta.url);
  const { chromium } = require('playwright');
  const browser = await chromium.launch();
  for (const width of [360, 1280]) {
    const page = await browser.newPage({ viewport: { width, height: 900 } });
    for (const route of ROUTES) {
      await page.goto(origin + route, { waitUntil: 'load' });
      await page.evaluate(async () => {
        for (let y = 0; y < document.body.scrollHeight; y += 500) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 40)); }
      });
      await page.waitForTimeout(400);
      const urls = await page.evaluate(() => {
        const out = [];
        for (const img of document.querySelectorAll('img')) {
          out.push(img.currentSrc || img.src);
          for (const c of (img.getAttribute('srcset') || '').split(',')) out.push(c.trim().split(/\s+/)[0]);
        }
        for (const el of document.querySelectorAll('*')) {
          const bg = getComputedStyle(el).backgroundImage;
          for (const m of bg.matchAll(/url\(["']?([^"')]+)["']?\)/g)) out.push(m[1]);
        }
        for (const l of document.querySelectorAll('link[rel~="icon"],link[rel="apple-touch-icon"],link[rel="preload"][as="image"]')) {
          out.push(l.getAttribute('href'));
          for (const c of (l.getAttribute('imagesrcset') || '').split(',')) out.push(c.trim().split(/\s+/)[0]);
        }
        for (const m of document.querySelectorAll('meta[property="og:image"],meta[name="twitter:image"]')) out.push(m.getAttribute('content'));
        return out.filter(Boolean);
      });
      for (const u of urls) add(u, `page:${route}@${width}px`);
      if (width === 1280) {
        const imgs = await page.evaluate(() => [...document.querySelectorAll('img')].map((i) => new URL(i.currentSrc || i.src, location.href).pathname));
        imgs.forEach((src, n) => {
          if (src.includes('/brand/')) return; // the logo is intentionally in header + footer
          const key = src.replace(/-\d+\.(webp|jpe?g|png)$/i, '');
          if (!photoUses.has(key)) photoUses.set(key, []);
          photoUses.get(key).push(`${route} #${n + 1}`);
        });
      }
    }
    await page.close();
  }
  await browser.close();
  rendered = true;
} catch (e) {
  console.warn(`(Playwright not available — rendered-page scan skipped: ${e.message.split('\n')[0]})`);
}

// 3. Fetch every image URL (absolute og:image URLs on web.app are checked against the local build path)
const results = [];
for (const [path, where] of [...found.entries()].sort()) {
  const res = await fetch(origin + path, { redirect: 'manual' });
  const type = res.headers.get('content-type') ?? '';
  const ok = res.status === 200 && type.startsWith('image/');
  const kebab = /^[a-z0-9/.-]+$/.test(path);
  results.push({ path, status: res.status, type, ok: ok && kebab, kebab, where: [...where] });
}
// 4. Old URLs must redirect to a working image
const redirectResults = [];
for (const r of redirects) {
  const res = await fetch(origin + r.source, { redirect: 'manual' });
  const target = await fetch(origin + r.destination);
  const tType = target.headers.get('content-type') ?? '';
  redirectResults.push({ from: r.source, to: r.destination, status: res.status, targetStatus: target.status, ok: res.status === 301 && target.status === 200 && !tType.startsWith('text/html') });
}
if (!baseArg) server.close();

const bad = results.filter((r) => !r.ok);
const dupes = [...photoUses.entries()].filter(([, uses]) => uses.length > 1);
console.log(`\nIMAGE CHECK${baseArg ? ` (LIVE: ${baseArg})` : ''} — ${results.length} unique image URLs (${rendered ? 'static scan + 8 routes rendered at 360px & 1280px' : 'static scan only'})\n`);
for (const r of results) console.log(`${r.ok ? '200 ✓' : `${r.status} ✗`}  ${r.type.padEnd(12)} ${r.path}${r.kebab ? '' : '   ← not lowercase-kebab-case'}`);
console.log(`\nREDIRECTS (old URLs) — ${redirectResults.length}`);
for (const r of redirectResults) console.log(`${r.ok ? '✓' : '✗'} ${r.status} ${r.from} → ${r.to} (${r.targetStatus})`);
const badRedirects = redirectResults.filter((r) => !r.ok);
if (photoUses.size) {
  console.log(`\nPHOTO → LOCATION (every <img> on all 8 routes at 1280px; logo excluded) — ${photoUses.size} photos`);
  for (const [k, uses] of [...photoUses.entries()].sort()) console.log(`${uses.length > 1 ? '✗ DUPLICATE' : '✓'} ${k}  →  ${uses.join(', ')}`);
}
if (bad.length || badRedirects.length || dupes.length) {
  if (dupes.length) console.error(`\n✗ ${dupes.length} photo(s) used more than once: ${dupes.map(([k]) => k).join(', ')}`);
  console.error(`\n✗ ${bad.length} broken image(s), ${badRedirects.length} broken redirect(s)`);
  for (const r of bad) console.error(`   ${r.path} (status ${r.status}, ${r.type}) used at: ${r.where.slice(0, 3).join(', ')}`);
  process.exit(1);
}
console.log(`\n✓ All ${results.length} images return 200 with an image content-type; all ${redirectResults.length} old URLs redirect correctly.${photoUses.size ? ` No photo appears twice (${photoUses.size} photos across 8 routes).` : ''}`);
