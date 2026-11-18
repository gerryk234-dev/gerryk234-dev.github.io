/* DELTA · the homepage — alive: the Earth and sun from the brief's cover with a living Flower of Life
   around the sun, rotating practice words, counting stats, today's message and plan, the living orbit of
   pillars and practices, a journey path with travelling light, the Love & Life symbols and a growing Tree of Life. */
'use strict';
const HOME_CARDS = [
  { title: 'Analysis', body: 'A qualifying mineral test, clear sample steps, and your results in one place.', image: 'brand/nourish.jpg', alt: 'A plate of vegetables and protein', to: '/analysis' },
  { title: 'Intelligence', body: 'A plain-language chart that shows where each mineral sits in its laboratory range.', image: 'brand/ground.jpg', alt: 'Feet standing on morning grass', to: '/intelligence' },
  { title: 'Method', body: 'Six pillars for food, space, nature, movement, release and rest.', image: 'brand/move.jpg', alt: 'A person walking a tree-lined path', to: '/pillars' },
];
const WORDS = ['Breathe', 'Ground', 'Move', 'Laugh', 'Rest', 'Awaken'];

R['/'] = () => {
  const vids = S.videos.filter(v => v.youtubeId && v.status !== 'review' && !v.archived);
  const stats = [[6, 'pillars'], [METHODS.length, 'guided methods'], [vids.length, 'Mineral Man videos'], [6, 'months included']];
  const journey = [['🧪', 'Test', 'Your hair mineral test, posted home.'], ['📊', 'Understand', 'A chart you can read, in plain English.'], ['🌿', 'Live', 'Six pillars, guided methods and a daily plan.'], ['✦', 'Awaken', 'A community growing together.']];
  return `<main id="main" class="home">
  <section class="hero hero-earth"><div class="stars" aria-hidden="true"></div><div class="rays" aria-hidden="true"></div><div class="sun" aria-hidden="true"></div>
    <div class="hero-fol" aria-hidden="true">${LIFE.flower('hero')}</div>
    <div class="embers" aria-hidden="true">${Array.from({ length: 14 }, (_, i) => `<span style="--x:${i}"></span>`).join('')}</div>
    <img class="earth" src="brand/earth.jpg" srcset="brand/earth-800.jpg 800w, brand/earth.jpg 1010w" sizes="100vw" alt="" fetchpriority="high" decoding="async"><div class="shade"></div><div class="container">
    <div class="rise logo-wrap"><span class="logo-live big">${logo('')}</span></div>
    <div class="rise d1 kicker">Awakening Human Potential</div>
    <h1>${['From', 'Analysis', 'to'].map((w, i) => `<span class="w" style="--i:${i}">${w}</span>`).join(' ')} <span class="w metal" style="--i:3">Awakening</span></h1>
    <p class="rise d2 rotator" aria-label="${WORDS.join(', ')}">${WORDS.map((w, i) => `<span style="--i:${i}">${w}</span>`).join('')}</p>
    <p class="rise d3 lead">One purchase. Your mineral test, a chart you can read, and six months inside a calmer way of living — with a community to walk beside you.</p>
    <div class="rise d4 cta"><a href="#/join" class="btn lg">Join the DELTA Experience</a><a href="#/centre/today" class="btn ghost lg">☀ See today in the community</a></div>
    <a class="scroll-cue" href="#/" data-act="scrollto" data-to="home-today" aria-label="Scroll down"><span></span></a>
  </div></section>

  <section class="stats-strip"><div class="container stats">${stats.map(([n, l], i) => `<div class="stat rise d${i + 1}"><b style="--n:${n}" aria-label="${n}"></b><span>${l}</span></div>`).join('')}</div></section>

  ${chapterCards()}

  <section class="container home-sec" id="home-today"><div class="kicker center">Today in the DELTA community</div><h2 class="center mt2 big-h">${greeting()} <span class="metal">✦</span></h2>
    <div class="grid md2 mt8" style="align-items:start">
      <div class="card today-card">${messageHTML(false)}<div class="flex mt4"><a class="btn" href="#/centre/today">Open today’s plan</a><button class="btn ghost" data-act="breathe">🌬 Breathe with me</button></div></div>
      <div class="card"><h3 class="lined">☀ Coming up today</h3>${planHTML(true)}</div>
    </div>
    <div class="grid md3 mt6">${S.centre.feed.slice(0, 3).map(p => `<a class="card feed-peek" href="#/centre/feed"><div class="f-head"><span class="f-av ${p.kind === 'update' ? 'upd' : ''}" aria-hidden="true">${p.kind === 'update' ? LIFE.flower('mini') : esc((p.by || '?')[0])}</span><div><b class="sm">${esc(p.kind === 'update' ? 'DELTA team' : p.by)}</b><div class="xs muted">${fmtDT(p.at)}</div></div></div><p class="sm mt2">${esc(p.title || p.text).slice(0, 140)}</p><span class="xs gold mt2">♥ ${p.loves}</span></a>`).join('')}</div>
  </section>

  <section class="band living-band"><div class="container grid md2 home-orbit" style="align-items:center">
    <div><div class="kicker">The Method · The Community Centre</div><h2 class="mt3 big-h">Six pillars. Six practices. <span class="metal">One living centre.</span></h2>
      <p class="lg muted mt4">Meditation, yoga, tai chi, mindfulness, laughter and comedy circle the six DELTA pillars — BODY, ENVIRONMENT, GROUND, MOVE, RELEASE and REST. Tap any circle to step inside.</p>
      <div class="flex mt6"><a class="btn" href="#/centre">Enter the Community Centre</a><a class="btn ghost" href="#/centre/methods">✦ ${METHODS.length} guided methods</a></div></div>
    ${centreOrbit()}
  </div></section>

  <section class="container home-sec"><div class="grid md3">${HOME_CARDS.map((c, i) => `<a href="#${c.to}" class="card flush rise d${i + 1} photo-card"><div class="photo" style="height:12rem;border-radius:0"><img src="${c.image}" alt="${esc(c.alt)}" loading="lazy"></div><div class="body"><h3 class="gold" style="font-size:1.25rem;font-weight:300">${c.title}</h3><p class="muted mt2">${c.body}</p></div></a>`).join('')}</div></section>

  <section class="container home-sec"><div class="kicker center">Your journey</div><h2 class="center mt2 big-h">From Analysis to <span class="metal">Awakening</span></h2>
    <ol class="journey mt8"><span class="j-line" aria-hidden="true"><i></i></span>${journey.map(([ico, t, d], i) => `<li class="rise d${i + 1}"><span class="j-dot">${ico}</span><b>${t}</b><span class="sm muted">${d}</span></li>`).join('')}</ol>
    <p class="center mt6"><a href="#/how-it-works">How DELTA works, step by step →</a></p></section>

  ${lifeSection()}

  <section class="band"><div class="container grid md2" style="align-items:start">
    <div><div class="kicker">One DELTA Experience</div><h2 class="mt3 big-h">Everything is included</h2>
      <p class="muted mt4">There is one package — not a test plus a subscription plus add-ons. A qualifying mineral test gives you six months of full access. Order a repeat test before then and six more months are added on to your current end date, so early renewals never lose time.</p>
      <a href="#/join" class="btn mt6">Join for ${money(S.settings.price)}</a> <span class="xs muted">Placeholder price — set by the founder in admin.</span></div>
    <div class="card hl"><ul class="sm included" style="margin:0;padding-left:1.1rem;line-height:2">
      <li>Hair mineral test kit and laboratory analysis</li><li>Your Mineral Intelligence chart and plain-English summary</li><li>A safety-screened proposed programme</li><li>Six months of the six pillars, Awakening, the DELTA Podcast and Meet Mineral Man</li><li>The Community Centre: daily plan, feed, guided methods, live sessions</li><li>LAUGHOLOGY, community groups and the Partner Collective</li><li class="muted">Optional: a personal practitioner voice note (${money(S.settings.voicePrice)})</li></ul></div>
  </div></section>
  ${vids.length ? `<section class="container home-sec"><div class="flex between"><h2 class="big-h">New on Meet Mineral Man</h2><a href="#/mineral-man">The full video library</a></div>
    <div class="grid md3 mt6">${vids.slice(0, 3).map(videoCard).join('')}</div></section>` : ''}
  <section class="container home-sec"><div class="flex between"><h2 class="big-h">Latest from the DELTA Podcast</h2><a href="#/podcast">All episodes</a></div>
    <div class="grid md3 mt6">${S.episodes.filter(e => !e.archived).slice(0, 3).map(episodeCard).join('')}</div></section>

  <section class="final-cta"><div class="container fc-grid"><div class="fc-tree" aria-hidden="true">${LIFE.tree()}</div>
    <div><div class="kicker">Begin today</div><h2 class="mt3 big-h">Grow your roots. <span class="metal">Reach for the light.</span></h2><p class="lg muted mt4">A test, a plan, a practice and a community — everything you need to start, in one place.</p>
      <div class="flex mt6"><a class="btn lg" href="#/join">Join the DELTA Experience</a><a class="btn ghost lg" href="#/centre">Visit the Community Centre</a></div></div></div></section>
</main>`;
};
Object.assign(A, { scrollto(el) { document.getElementById(el.dataset.to)?.scrollIntoView({ behavior: 'smooth' }); } });
