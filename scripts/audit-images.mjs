#!/usr/bin/env node
// Image audit: proves no photo is used twice and every referenced file exists.
//  - Every key in src/config/images.ts must be used from exactly one place.
//  - No source file may hardcode an image path or remote photo URL (all go through the registry).
//  - Every file listed in the registry must exist in /public.
import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const root = new URL('..', import.meta.url).pathname;
const registryFile = join(root, 'src/config/images.ts');
const registry = readFileSync(registryFile, 'utf8');

const keys = [...registry.matchAll(/^ {2}(\w+): \{$/gm)].map((m) => m[1]);
const files = [...registry.matchAll(/'(\/images\/[^' ]+\.webp)/g)].map((m) => m[1]);
const fileSets = [...registry.matchAll(/srcSet: '([^']+)'/g)].flatMap((m) => [...m[1].matchAll(/(\/images\/\S+\.webp)/g)].map((x) => x[1]));

const walk = (dir) =>
  readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? walk(p) : /\.(tsx?|css)$/.test(f) ? [p] : [];
  });

const usage = Object.fromEntries(keys.map((k) => [k, []]));
const problems = [];

for (const file of walk(join(root, 'src'))) {
  if (file === registryFile) continue;
  const text = readFileSync(file, 'utf8');
  const lines = text.split('\n');
  lines.forEach((line, i) => {
    // A "use" is IMAGES.key (bare) or IMAGES.key.src — .alt/.srcSet/.width etc. belong to the same use.
    for (const m of line.matchAll(/IMAGES\.(\w+)(\.src\b|(?![.\w]))/g)) {
      if (!(m[1] in usage)) problems.push(`Unknown image key IMAGES.${m[1]} at ${relative(root, file)}:${i + 1}`);
      else usage[m[1]].push(`${relative(root, file)}:${i + 1}`);
    }
    if (/(images\.unsplash\.com|\/banners\/|\/images\/(?!brand\/)[\w-]+\/[\w-]+\.(webp|jpe?g|png))/.test(line)) {
      problems.push(`Hardcoded image path at ${relative(root, file)}:${i + 1}: ${line.trim()}`);
    }
  });
}

for (const [k, uses] of Object.entries(usage)) {
  if (uses.length === 0) problems.push(`Unused image: ${k}`);
  if (uses.length > 1) problems.push(`Image "${k}" used ${uses.length}x: ${uses.join(', ')}`);
}
for (const f of new Set([...files, ...fileSets])) {
  if (!existsSync(join(root, 'public', f))) problems.push(`Missing file: public${f}`);
}

console.log('Image → location mapping');
for (const [k, uses] of Object.entries(usage)) console.log(`  ${k.padEnd(20)} → ${uses.join(', ') || '(unused)'}`);
if (problems.length) {
  console.error(`\n✗ ${problems.length} problem(s):\n  ` + problems.join('\n  '));
  process.exit(1);
}
console.log(`\n✓ ${keys.length} images, each used exactly once; all ${new Set(fileSets).size} files present.`);
