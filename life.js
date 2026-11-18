/* DELTA · Love & Life — living, animated symbols drawn in SVG (no images):
   the Flower of Life (blooming out of the Seed of Life), the Tree of Life (growing, with heart-shaped leaves)
   and the Ankh, the ancient symbol of life. Also: the love burst shown whenever someone sends a ♥,
   and the loving-kindness practice. All motion is CSS and respects "reduce motion". */
'use strict';
let lifeUid = 0;
const r2 = n => Math.round(n * 100) / 100;
const HEART = (x, y, s) => `M${r2(x)} ${r2(y + s * 0.9)}C${r2(x - s * 1.6)} ${r2(y - s * 0.1)} ${r2(x - s * 0.7)} ${r2(y - s * 1.2)} ${r2(x)} ${r2(y - s * 0.4)}C${r2(x + s * 0.7)} ${r2(y - s * 1.2)} ${r2(x + s * 1.6)} ${r2(y - s * 0.1)} ${r2(x)} ${r2(y + s * 0.9)}Z`;

/* Living light: a copy of every drawn line carries a small spark that keeps travelling round it, like a buffering ring. */
const glints = m => `<g class="glints">${m.replace(/<(circle|path)\b([^>]*?)\/>/g, (x, t, a) => (/pathLength/.test(a) ? `<${t}${a.replace(/\s?class="[^"]*"/, '').replace(/stroke-width:[^;"]*;?/, '')} class="glint"/>` : ''))}</g>`;
const LIFE = {
  /* Flower of Life: 19 interlocking circles. The first 7 are the Seed of Life, drawn first, then the flower blooms. */
  flower(cls = '') {
    const id = 'fol' + (++lifeUid), R = 26, c = 100, pts = [[0, 0]];
    for (let i = 0; i < 6; i++) pts.push([R * Math.cos(i * Math.PI / 3), R * Math.sin(i * Math.PI / 3)]);
    for (let i = 0; i < 6; i++) { pts.push([R * Math.sqrt(3) * Math.cos(Math.PI / 6 + i * Math.PI / 3), R * Math.sqrt(3) * Math.sin(Math.PI / 6 + i * Math.PI / 3)]); pts.push([2 * R * Math.cos(i * Math.PI / 3), 2 * R * Math.sin(i * Math.PI / 3)]); }
    return `<svg viewBox="0 0 200 200" class="life life-flower ${cls}" aria-hidden="true"><defs><radialGradient id="${id}g"><stop offset="0" stop-color="#fff3c4" stop-opacity=".9"/><stop offset=".45" stop-color="#f5bf45" stop-opacity=".35"/><stop offset="1" stop-color="#f5bf45" stop-opacity="0"/></radialGradient>
      <linearGradient id="${id}s" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffe9a8"/><stop offset=".5" stop-color="#f5bf45"/><stop offset="1" stop-color="#ff9fb4"/></linearGradient></defs>
      <circle class="heartbeat" cx="${c}" cy="${c}" r="60" fill="url(#${id}g)"/>
      <g class="petals" stroke="url(#${id}s)">${(m => m + glints(m))(pts.map(([x, y], i) => `<circle cx="${r2(c + x)}" cy="${r2(c + y)}" r="${R}" pathLength="1" style="--d:${i < 7 ? i : 7 + (i - 7) * 0.5}"/>`).join('') + `
      <circle cx="${c}" cy="${c}" r="${3 * R}" pathLength="1" class="rim" style="--d:13"/><circle cx="${c}" cy="${c}" r="${3 * R + 5}" pathLength="1" class="rim thin" style="--d:13.5"/>`)}</g>
      <path class="core-heart" d="${HEART(c, c, 7)}"/></svg>`;
  },

  /* Tree of Life: a trunk that grows, branches by generation, roots below, heart leaves that open, inside a circle. */
  tree(cls = '') {
    let seed = 7; const rnd = () => { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; };
    const br = [], leaves = [], roots = [];
    const grow = (x, y, ang, len, d, out, max) => {
      const x2 = x + Math.cos(ang) * len, y2 = y + Math.sin(ang) * len;
      out.push({ d: `M${r2(x)} ${r2(y)}Q${r2((x + x2) / 2 + Math.cos(ang + 1.57) * len * 0.12)} ${r2((y + y2) / 2 + Math.sin(ang + 1.57) * len * 0.12)} ${r2(x2)} ${r2(y2)}`, g: d, w: Math.max(0.8, 4.2 - d * 0.8) });
      if (d >= max) { if (out === br) leaves.push([x2, y2]); return; }
      const spread = 0.42 + rnd() * 0.16;
      grow(x2, y2, ang - spread, len * (0.72 + rnd() * 0.06), d + 1, out, max);
      grow(x2, y2, ang + spread, len * (0.72 + rnd() * 0.06), d + 1, out, max);
    };
    br.push({ d: 'M100 156C99 140 101 124 100 112', g: 0, w: 5 });
    grow(100, 112, -Math.PI / 2 - 0.45, 24, 1, br, 5); grow(100, 112, -Math.PI / 2 + 0.45, 24, 1, br, 5); grow(100, 112, -Math.PI / 2, 20, 2, br, 5);
    grow(100, 156, Math.PI / 2 - 0.7, 14, 1, roots, 3); grow(100, 156, Math.PI / 2 + 0.7, 14, 1, roots, 3); grow(100, 156, Math.PI / 2, 12, 2, roots, 3);
    const id = 'tol' + (++lifeUid);
    return `<svg viewBox="0 0 200 200" class="life life-tree ${cls}" aria-hidden="true"><defs><clipPath id="${id}c"><circle cx="100" cy="100" r="88"/></clipPath>
      <radialGradient id="${id}g" cy=".35"><stop offset="0" stop-color="#ffe7a0" stop-opacity=".45"/><stop offset="1" stop-color="#f5bf45" stop-opacity="0"/></radialGradient></defs>
      <circle cx="100" cy="100" r="88" fill="url(#${id}g)" class="halo"/>${(m => m + glints(m))('<circle cx="100" cy="100" r="90" class="rim" pathLength="1" style="--d:0"/>')}
      <g clip-path="url(#${id}c)"><path class="ground" d="M14 157Q100 150 186 157" pathLength="1" style="--d:.5"/>
      <g class="roots">${(m => m + glints(m))(roots.map(b => `<path d="${b.d}" pathLength="1" style="--d:${1 + b.g * 0.5};stroke-width:${b.w * 0.7}"/>`).join(''))}</g>
      <g class="canopy">${(m => m + glints(m))(br.map(b => `<path d="${b.d}" pathLength="1" style="--d:${1 + b.g * 0.7};stroke-width:${b.w}"/>`).join(''))}
      ${leaves.map(([x, y], i) => `<path class="leaf ${i % 3 ? '' : 'rose'}" d="${HEART(x, y, 3.6)}" style="--d:${5.2 + (i % 16) * 0.12};--o:${r2(x)}px ${r2(y)}px"/>`).join('')}</g></g></svg>`;
  },

  /* The Ankh — the ancient Egyptian symbol of life — drawn in light, with a heart beating in its loop. */
  ankh(cls = '') {
    const id = 'ank' + (++lifeUid);
    return `<svg viewBox="0 0 200 200" class="life life-ankh ${cls}" aria-hidden="true"><defs><linearGradient id="${id}s" gradientUnits="userSpaceOnUse" x1="0" y1="20" x2="0" y2="180"><stop offset="0" stop-color="#fff0b8"/><stop offset=".55" stop-color="#f5bf45"/><stop offset="1" stop-color="#c98a22"/></linearGradient>
      <radialGradient id="${id}g"><stop offset="0" stop-color="#ffe7a0" stop-opacity=".55"/><stop offset="1" stop-color="#f5bf45" stop-opacity="0"/></radialGradient></defs>
      <g class="rays">${Array.from({ length: 24 }, (_, i) => `<line x1="100" y1="100" x2="${r2(100 + 92 * Math.cos(i * Math.PI / 12))}" y2="${r2(100 + 92 * Math.sin(i * Math.PI / 12))}"/>`).join('')}</g>
      <circle cx="100" cy="72" r="70" fill="url(#${id}g)" class="heartbeat"/>
      <g class="body" stroke="url(#${id}s)">${(m => m + glints(m))('<path d="M100 92C80 92 72 70 74 54C76 36 88 24 100 24C112 24 124 36 126 54C128 70 120 92 100 92Z" pathLength="1" style="--d:0"/><path d="M58 98L142 98" pathLength="1" style="--d:1.4"/><path d="M100 92L96 178M100 92L104 178M90 178L110 178" pathLength="1" style="--d:2"/>')}</g>
      <path class="core-heart" d="${HEART(100, 58, 8)}"/></svg>`;
  },
};

/* ── love burst: a little Flower of Life blooms and hearts float out from where love was sent ── */
function loveBurst(x, y) {
  const el = document.createElement('div'); el.className = 'love-burst'; el.setAttribute('aria-hidden', 'true');
  el.style.left = x + 'px'; el.style.top = y + 'px';
  const n = matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 12;
  el.innerHTML = `<div class="lb-flower">${LIFE.flower('mini')}</div>${Array.from({ length: n }, (_, i) => { const a = (i / n) * Math.PI * 2 + Math.random() * 0.4, d = 50 + Math.random() * 60; return `<span class="lh ${i % 3 ? '' : 'gold'}" style="--dx:${Math.round(Math.cos(a) * d)}px;--dy:${Math.round(Math.sin(a) * d - 30)}px;--rot:${Math.round(Math.random() * 60 - 30)}deg;--t:${(0.9 + Math.random() * 0.6).toFixed(2)}s">♥</span>`; }).join('')}`;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 1800);
}
/* every ♥ button on the site gets the burst (laughs, community posts, gratitude notes, Send love) */
document.addEventListener('click', ev => {
  const b = ev.target.closest('[data-act="love"], [data-act="post-love"], [data-act="send-love"], .love-btn');
  if (!b || b.disabled) return;
  const r = b.getBoundingClientRect(); loveBurst(r.left + r.width / 2, r.top + r.height / 2);
}, true);

/* ── loving-kindness: the Tree of Life grows inside a turning Flower of Life while kind phrases are offered ── */
const KINDNESS = {
  self: ['May I be well', 'May I be happy', 'May I be safe', 'May I be at peace'],
  loved: ['May you be well', 'May you be happy', 'May you be safe', 'May you be at peace'],
  all: ['May all beings be well', 'May all beings be happy', 'May all beings be safe', 'May all beings be at peace'],
};
function openKindness(who = 'self') {
  const el = relaxShell('Loving-kindness', `<h2 class="metal">Send love</h2><p class="sm muted mt2">Rest a hand on your heart. Read each phrase slowly, breathing out as you do.</p>
    <div class="chips mt4" role="group" aria-label="Send love to">${[['self', 'Myself'], ['loved', 'Someone I love'], ['all', 'Everyone']].map(([k, l]) => `<button class="chip ${k === who ? 'on' : ''}" data-who="${k}">${l}</button>`).join('')}</div>
    <div class="kind-stage"><div class="kind-flower">${LIFE.flower('slow')}</div><div class="kind-tree">${LIFE.tree()}</div></div>
    <p class="kind-phrase" aria-live="polite"></p>
    <button class="btn mt4 love-btn" data-act="send-love">♥ Send love</button><p class="xs muted mt3 kind-count"></p>`);
  const phrase = el.querySelector('.kind-phrase'), count = el.querySelector('.kind-count'), tree = el.querySelector('.kind-tree');
  let i = 0, sent = 0;
  const show = () => { phrase.classList.remove('in'); void phrase.offsetWidth; phrase.textContent = KINDNESS[who][i % 4]; phrase.classList.add('in'); i++; };
  const cycle = () => { clearInterval(relax.tick); i = 0; show(); relax.tick = setInterval(show, 5500); };
  el.querySelectorAll('[data-who]').forEach(b => b.onclick = () => { el.querySelectorAll('[data-who]').forEach(x => x.classList.toggle('on', x === b)); who = b.dataset.who; tree.innerHTML = LIFE.tree(); cycle(); });
  el.querySelector('.love-btn').onclick = () => { sent++; count.textContent = `${sent} ♥ sent — thank you for adding a little more kindness to the world.`; };
  cycle();
}
Object.assign(A, { kindness(el) { openKindness(el?.dataset?.who || 'self'); }, 'send-love'() { /* the burst is the whole point */ } });

/* the Love & Life section used in the Community Centre */
function lifeSection() {
  const card = (art, kicker, title, text) => `<figure class="card life-card"><div class="life-art">${art}</div><figcaption><div class="kicker" style="font-size:.66rem">${kicker}</div><h3 class="mt1" style="font-size:1.2rem">${title}</h3><p class="sm muted mt2">${text}</p></figcaption></figure>`;
  return `<section class="container centre-sec life-sec" id="love"><div class="kicker">Love &amp; Life</div><h2 class="mt2">Living symbols of connection</h2>
    <p class="sm muted mt2" style="max-width:44rem">Three ancient designs, found across many cultures, drawn here in moving light. They are reminders — of how everything is connected, how we grow, and how precious life is. No belief required.</p>
    <div class="grid md3 mt6">
      ${card(LIFE.flower(), 'Connection', 'The Flower of Life', 'It begins as the Seed of Life — seven circles — and blooms into nineteen. Every circle touches its neighbours: a picture of how each of us is part of something whole.')}
      ${card(LIFE.tree(), 'Growth', 'The Tree of Life', 'Roots below, branches above. A reminder to ground yourself, reach for the light and keep growing — one small leaf of love at a time.')}
      ${card(LIFE.ankh(), 'Vitality', 'The Symbol of Life', 'The Ankh, the ancient Egyptian sign for life and breath. Here it holds a beating heart: life is lived best with love at its centre.')}
    </div>
    <div class="flex mt6" style="justify-content:center"><button class="btn" data-act="kindness">♥ Loving-kindness practice</button><button class="btn ghost" data-act="kindness" data-who="all">Send love to everyone</button></div></section>`;
}

/* Symbols start drawing when they scroll into view (so the bloom is seen, not missed). */
const lifeIO = 'IntersectionObserver' in window ? new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('on'); lifeIO.unobserve(e.target); } }), { threshold: 0.25 }) : null;
const watchLife = root => root.querySelectorAll?.('svg.life:not(.on)').forEach(s => (lifeIO ? lifeIO.observe(s) : s.classList.add('on')));
new MutationObserver(ms => ms.forEach(m => m.addedNodes.forEach(n => n.nodeType === 1 && (n.matches?.('svg.life') ? watchLife(n.parentNode) : watchLife(n))))).observe(document.body, { childList: true, subtree: true });
watchLife(document);
