/* DELTA · site structure — one map that drives everything: the header menu, the journey bar ("you are here"),
   the breadcrumb, the Previous/Next steps at the end of every page, the homepage chapter cards and the footer.
   Six chapters, in order, from first visit to joining. */
'use strict';
const CHAPTERS = [
  { n: 1, id: 'home', name: 'Home', tag: 'Start here', icon: '⌂', desc: 'What DELTA is, today in the community, and where to go next.', pages: [['/', 'Home']] },
  { n: 2, id: 'understand', name: 'Understand', tag: 'How DELTA works', icon: '◎', desc: 'One purchase: your mineral test, a chart you can read, and six months of access.',
    pages: [['/how-it-works', 'How it works'], ['/analysis', 'Analysis — your test'], ['/intelligence', 'Intelligence — your report']] },
  { n: 3, id: 'method', name: 'The Method', tag: 'Six pillars & Awakening', icon: '△', desc: 'BODY, ENVIRONMENT, GROUND, MOVE, RELEASE and REST — and Awakening through them all.',
    pages: [['/pillars', 'The six pillars'], ...PILLARS.map(p => [`/pillars/${p.id}`, `${p.n}. ${p.name[0] + p.name.slice(1).toLowerCase()}`, 'sub']), ['/awakening', 'Awakening']] },
  { n: 4, id: 'community', name: 'Community', tag: 'Practise together', icon: '♡', desc: 'The Community Centre: today’s plan, the feed, guided methods, practice rooms and laughter.',
    pages: [['/centre', 'Community Centre'], ['/centre/today', 'Today'], ['/centre/feed', 'Community feed'], ['/centre/methods', 'Guided methods'], ...PRACTICES.map(p => [`/centre/${p.id}`, p.name, 'sub']), ['/laughology', 'LAUGHOLOGY']] },
  { n: 5, id: 'watch', name: 'Watch & listen', tag: 'Videos & podcast', icon: '▷', desc: 'Meet Mineral Man and the DELTA Podcast — the founder’s talks and conversations.',
    pages: [['/mineral-man', 'Meet Mineral Man'], ['/podcast', 'The DELTA Podcast']] },
  { n: 6, id: 'join', name: 'Join', tag: 'Begin your journey', icon: '✦', desc: 'Join the DELTA Experience, meet our partners, and find answers.',
    pages: [['/join', 'Join the DELTA Experience'], ['/partners', 'Partner Collective'], ['/faq', 'FAQs'], ['/about', 'About & contact']] },
];
const MY_DELTA = { n: 0, id: 'my', name: 'My DELTA', tag: 'Your portal', icon: '◉', pages: [['/portal', 'Overview'], ['/report', 'My report'], ['/learn', 'My lessons'], ['/account', 'Account'], ['/community', 'Groups']] };
const PAGE_ORDER = CHAPTERS.flatMap(c => c.pages.map(([to, label, kind]) => ({ to, label, kind, ch: c })));

/* Which chapter and page is the current path in? (deepest match wins: /pillars/ground before /pillars) */
function whereAmI(path) {
  const all = [...PAGE_ORDER, ...MY_DELTA.pages.map(([to, label]) => ({ to, label, ch: MY_DELTA }))];
  const exact = all.find(p => p.to === path);
  if (exact) return exact;
  if (path.startsWith('/community')) return { to: path, label: 'Groups', ch: MY_DELTA };
  const parent = all.filter(p => p.to !== '/' && path.startsWith(p.to + '/')).sort((a, b) => b.to.length - a.to.length)[0];
  if (parent) return { ...parent, to: path };
  if (['/login', '/register', '/intake', '/paid', '/legal'].some(x => path.startsWith(x))) return { to: path, label: { '/login': 'Sign in', '/register': 'Sign up', '/intake': 'Intake', '/paid': 'Payment', '/legal': 'Privacy & terms' }[path] || '', ch: CHAPTERS[5] };
  return null;
}

/* Header menu: Home + the five chapters, each with its pages in a drop-down (expanded on phones). */
function chapterNav(path) {
  const here = whereAmI(path);
  let i = 0;
  return CHAPTERS.map(c => {
    const on = here && here.ch.id === c.id;
    if (c.id === 'home') return `<a href="#/" style="--i:${i++}" class="nav-home ${on ? 'active' : ''}"${path === '/' ? ' aria-current="page"' : ''}>${c.icon} Home</a>`;
    const items = c.pages.filter(([, , k]) => k !== 'sub');
    return `<div class="nav-item ${on ? 'on' : ''}" style="--i:${i++}"><a href="#${items[0][0]}" class="nav-top ${on ? 'active' : ''}" aria-haspopup="true">${c.name}<span class="caret" aria-hidden="true">▾</span></a>
      <div class="drop" role="group" aria-label="${esc(c.name)}"><span class="drop-tag xs">${c.n} · ${esc(c.tag)}</span>${items.map(([to, label]) => `<a href="#${to}" class="${path === to ? 'active' : ''}"${path === to ? ' aria-current="page"' : ''}>${esc(label)}</a>`).join('')}</div></div>`;
  }).join('');
}

/* Journey bar: the six chapters as a lit path, plus the breadcrumb (Home › Chapter › Page). */
function journeyBar(path) {
  const here = whereAmI(path); if (!here || path === '/') return '';
  const idx = here.ch.n || 0;
  const crumbs = [['/', 'Home']];
  if (here.ch.id !== 'home') crumbs.push([here.ch.pages[0][0], here.ch.name]);
  if (here.to !== here.ch.pages[0][0] && here.label) crumbs.push([here.to, here.label]);
  return `<nav class="journey-bar" aria-label="Where you are"><div class="container">
    <ol class="jb-steps" style="--p:${idx ? (idx - 1) / 5 : 0}">${CHAPTERS.map(c => `<li class="${c.n < idx ? 'past' : ''} ${c.n === idx ? 'now' : ''}"><a href="#${c.pages[0][0]}"${c.n === idx ? ' aria-current="step"' : ''}><span class="jb-dot">${c.n === 1 ? '⌂' : c.n}</span><span class="jb-name">${esc(c.name)}</span></a></li>`).join('')}<span class="jb-line" aria-hidden="true"><i></i><b></b></span></ol>
    <ol class="crumbs xs">${crumbs.map(([to, l], k) => `<li>${k === crumbs.length - 1 ? `<span aria-current="page">${esc(l)}</span>` : `<a href="#${to}">${esc(l)}</a>`}</li>`).join('')}${here.ch.id === 'my' ? '<li class="muted">your portal</li>' : ''}</ol>
  </div></nav>`;
}

/* Previous / Next at the end of every page, so each page leads to the next one in the journey. */
function nextSteps(path) {
  const here = whereAmI(path); if (!here) return '';
  let i = PAGE_ORDER.findIndex(p => p.to === here.to);
  if (i < 0) i = PAGE_ORDER.findIndex(p => p.to === here.ch.pages[0][0]);
  if (here.ch.id === 'my') return `<section class="next-steps container"><a class="ns-card next" href="#/centre/today"><span class="xs gold">Continue · Community</span><b>☀ Today in the community →</b><span class="xs muted">Your plan, message and practices for today</span></a></section>`;
  const prev = PAGE_ORDER[i - 1], next = PAGE_ORDER[i + 1] || PAGE_ORDER[0];
  const card = (p, dir) => `<a class="ns-card ${dir}" href="#${p.to}"><span class="xs gold">${dir === 'prev' ? '← Previous' : 'Next step →'} · ${p.ch.n}. ${esc(p.ch.name)}</span><b>${esc(p.label)}</b><span class="xs muted">${esc(p.ch.tag)}</span></a>`;
  return `<section class="next-steps container">${prev ? card(prev, 'prev') : '<span></span>'}${card(next, 'next')}</section>`;
}

/* Homepage: the whole structure at a glance — six numbered chapters. */
function chapterCards() {
  return `<section class="container home-sec" id="explore"><div class="kicker center">Explore DELTA</div><h2 class="center mt2 big-h">Six steps, <span class="metal">one journey</span></h2>
    <p class="center muted mt3" style="max-width:40rem;margin-left:auto;margin-right:auto">Everything on DELTA follows the same path. Start anywhere — each page leads you to the next.</p>
    <ol class="chapters mt8">${CHAPTERS.map(c => `<li style="--k:${c.n}"><a class="card chapter" href="#${c.pages[0][0]}"${c.n === 1 ? ' data-act="scrollto" data-to="home-today"' : ''}><span class="ch-n">${c.n}</span><span class="ch-ico" aria-hidden="true">${c.icon}</span><b>${esc(c.name)}</b><span class="xs gold">${esc(c.tag)}</span><span class="sm muted">${esc(c.desc)}</span>
      <span class="ch-links xs">${c.n === 1 ? 'You are here ✦ — scroll for today' : c.pages.filter(([, , k]) => k !== 'sub').slice(0, 4).map(([, l]) => esc(l)).join(' · ')}</span></a></li>`).join('')}</ol></section>`;
}

/* Footer: the same six chapters as a site map. */
function footerMap() {
  return CHAPTERS.map(c => `<div><b class="gold sm">${c.n}. ${esc(c.name)}</b>${c.pages.filter(([, , k]) => k !== 'sub').map(([to, l]) => `<a href="#${to}">${esc(l)}</a>`).join('')}</div>`).join('');
}
