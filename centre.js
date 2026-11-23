/* DELTA Community Centre — animated hub of the six pillars and six practices, practice rooms with
   videos, books and weekly sessions, relaxing tools (breathing guide, meditation timer with bell and
   ambient sounds), gratitude wall and a private mood check-in. Loaded after app.js; uses its helpers. */
'use strict';

/* ── animated emblems (inline SVG; motion in styles.css, paused for reduced motion) ── */
const EMBLEM = {
  lotus: `<svg viewBox="0 0 100 100" class="em em-lotus" aria-hidden="true"><g class="petals"><path d="M50 18C61 34 61 54 50 70C39 54 39 34 50 18Z"/><path d="M50 70C35 62 25 48 24 33C38 37 47 51 50 70Z"/><path d="M50 70C65 62 75 48 76 33C62 37 53 51 50 70Z"/><path d="M50 72C34 70 18 62 11 51C27 49 42 57 50 72Z"/><path d="M50 72C66 70 82 62 89 51C73 49 58 57 50 72Z"/></g><path class="water" d="M20 82Q35 77 50 82T80 82"/></svg>`,
  yoga: `<svg viewBox="0 0 100 100" class="em em-yoga" aria-hidden="true"><circle class="halo" cx="50" cy="50" r="44"/><g class="fig"><circle cx="50" cy="27" r="6.5"/><path d="M50 34V62M50 62L44 90M50 62L61 71L50 75M50 41C41 31 43 15 50 7C57 15 59 31 50 41"/></g></svg>`,
  yinyang: `<svg viewBox="0 0 100 100" class="em em-yinyang" aria-hidden="true"><g class="spin"><circle class="ring" cx="50" cy="50" r="38"/><path class="fillg" d="M50 12A38 38 0 0 1 50 88A19 19 0 0 1 50 50A19 19 0 0 0 50 12Z"/><circle class="hole" cx="50" cy="31" r="5"/><circle class="fillg" cx="50" cy="69" r="5"/></g></svg>`,
  ripple: `<svg viewBox="0 0 100 100" class="em em-ripple" aria-hidden="true"><circle class="core" cx="50" cy="50" r="7"/><circle class="r r1" cx="50" cy="50" r="18"/><circle class="r r2" cx="50" cy="50" r="18"/><circle class="r r3" cx="50" cy="50" r="18"/></svg>`,
  laugh: `<svg viewBox="0 0 100 100" class="em em-laugh" aria-hidden="true"><g class="face"><circle cx="50" cy="55" r="30"/><path d="M37 48Q41 43 45 48M55 48Q59 43 63 48"/><path class="mouth" d="M35 60Q50 80 65 60Z"/></g><text class="ha h1" x="70" y="24">ha</text><text class="ha h2" x="14" y="30">ha</text></svg>`,
  masks: `<svg viewBox="0 0 100 100" class="em em-masks" aria-hidden="true"><g class="mask m1"><path d="M22 26C34 20 50 20 60 26C61 46 54 62 41 66C28 62 21 46 22 26Z"/><path d="M30 37Q34 33 38 37M45 37Q49 33 53 37M31 48Q41 60 52 48"/></g><g class="mask m2"><path d="M44 40C55 35 70 35 80 41C80 60 73 74 62 78C50 74 43 60 44 40Z"/><path d="M52 52Q56 49 60 52M66 52Q70 49 74 52M55 66Q63 58 71 66"/></g></svg>`,
};
const practiceById = id => PRACTICES.find(p => p.id === id);
const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const bookLink = b => `https://openlibrary.org/search?q=${encodeURIComponent(b.title + ' ' + b.author)}`;
const centreVideoCard = v => videoCard({ ...v, cat: v.channel || 'YouTube', year: '' });

/* ── social media buttons (links set in Admin → Settings) ── */
const SOCIAL = [
  ['facebook', 'Facebook', '<path d="M14 8h3V4h-3c-2.8 0-4.5 1.8-4.5 4.6V11H7v4h2.5v9h4v-9h3l.5-4h-3.5V8.8c0-.5.3-.8.5-.8Z"/>'],
  ['instagram', 'Instagram', '<rect x="3.5" y="3.5" width="17" height="17" rx="5" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="17.3" cy="6.7" r="1.2"/>'],
  ['tiktok', 'TikTok', '<path d="M15.5 3c.4 2.2 1.8 3.7 4 4v3.2c-1.5 0-2.9-.5-4-1.2v6.3a5.6 5.6 0 1 1-5.6-5.6c.3 0 .6 0 .9.1v3.3a2.4 2.4 0 1 0 1.5 2.2V3h3.2Z"/>'],
  ['youtube', 'YouTube', '<path d="M22 8.2c-.2-1.5-1-2.5-2.4-2.7C17.3 5.2 12 5.2 12 5.2s-5.3 0-7.6.3C3 5.7 2.2 6.7 2 8.2 1.8 9.7 1.8 12 1.8 12s0 2.3.2 3.8c.2 1.5 1 2.5 2.4 2.7 2.3.3 7.6.3 7.6.3s5.3 0 7.6-.3c1.4-.2 2.2-1.2 2.4-2.7.2-1.5.2-3.8.2-3.8s0-2.3-.2-3.8ZM10 15.2V8.8l5.3 3.2L10 15.2Z"/>'],
];
function socialButtons_(big = false) {
  const links = S.settings.social || {};
  const items = SOCIAL.filter(([k]) => links[k] || S.demo).map(([k, label, path]) => links[k]
    ? `<a class="soc soc-${k}" href="${esc(links[k])}" target="_blank" rel="noopener" aria-label="DELTA on ${label}" title="${label}"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">${path}</svg>${big ? `<span>${label}</span>` : ''}</a>`
    : `<button class="soc soc-${k} unset" data-act="social-unset" data-p="${label}" aria-label="${label} — link not added yet" title="${label} — add the link in Admin → Settings"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">${path}</svg>${big ? `<span>${label}</span>` : ''}</button>`).join('');
  return items ? `<div class="socials ${big ? 'big' : ''}">${items}</div>` : '';
}

/* ── the hub ── */
function centreOrbit(coreHref = '#/centre', coreLabel = 'Community<br>Centre') {
  const orbit = (items, cls, r) => `<div class="ring ${cls}" style="--r:${r}">${items.map((it, i) => `<div class="node" style="--a:${(360 / items.length) * i}deg"><a href="${it.href}" class="bubble" aria-label="${esc(it.label)}"><span class="bub-ico">${it.ico}</span><span class="bub-txt">${esc(it.short)}</span></a></div>`).join('')}</div>`;
  const pills = PILLARS.map(p => ({ href: `#/pillars/${p.id}`, label: `Pillar ${p.n}: ${p.name}`, short: p.name[0] + p.name.slice(1).toLowerCase(), ico: `<b>${p.icon}</b>` }));
  const pracs = PRACTICES.map(p => ({ href: `#/centre/${p.id}`, label: p.name, short: p.name.replace(' & Qi Gong', ''), ico: EMBLEM[p.emblem] }));
  return `<div class="orbit" aria-label="Rooms of the Community Centre">
      <div class="orbit-glow" aria-hidden="true"></div><div class="orbit-fol" aria-hidden="true">${LIFE.flower('bg')}</div>
      <svg class="life orbit-lights" viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="43" pathLength="1" class="ol out"/><circle cx="50" cy="50" r="43" pathLength="1" class="ol out b"/><circle cx="50" cy="50" r="25" pathLength="1" class="ol in"/><circle cx="50" cy="50" r="25" pathLength="1" class="ol in b"/></svg>
      ${orbit(pracs, 'ring-out', 'var(--r-outer)')}${orbit(pills, 'ring-in', 'var(--r-inner)')}
      <a class="core" href="${coreHref}" aria-label="${coreLabel.replace('<br>', ' ')}"><img src="brand/logo.svg" alt="" width="88" height="88"><span>${coreLabel}</span></a>
    </div>`;
}
R['/centre'] = (q = {}) => {
  const u = me(), member = u && hasAccess(u), c = S.centre;
  const week = c.sessions.slice(0, 7);
  const todayIdx = new Date(now()).getDay();
  const myMood = u?.mood || {}, last7 = Array.from({ length: 7 }, (_, i) => { const d = new Date(now() - (6 - i) * DAY).toISOString().slice(0, 10); return myMood[d]; });
  const MOODS = [['calm', '😌'], ['happy', '😊'], ['okay', '🙂'], ['tired', '😴'], ['low', '😔'], ['stressed', '😣']];
  return `${centreTabs()}<main id="main" tabindex="-1" class="centre">
  <section class="centre-hero">
    <div class="centre-copy"><div class="kicker">The DELTA Community Centre</div><h1 class="mt3">A calmer place to <span class="metal">gather</span></h1>
      <p class="lg muted mt4">Meditation, yoga, tai chi, mindfulness, laughter and comedy — around the six DELTA pillars. Drop in, breathe, watch, read, and practise together.</p>
      <div class="flex mt6"><button class="btn" data-act="breathe">🌬 Breathe with me</button><a class="btn ghost" href="#/centre/methods">✦ Guided methods</a><button class="btn ghost" data-act="sit">🔔 Meditation timer</button></div>
      <p class="xs muted mt4">${motionMoving() ? 'Tap any circle to step inside. ' : 'Your device asks for less motion, so the centre is still. '}${motionButton('xs')}</p></div>
    ${centreOrbit()}
  </section>

  <section class="container centre-sec"><div class="grid md2" style="align-items:start">
    <div class="card today-card"><div class="flex between"><h2 class="lined" style="font-size:1.25rem">☀ ${greeting()}</h2><a class="xs" href="#/centre/today">Open today →</a></div>${messageHTML(false)}${planHTML(true)}<a class="btn xs mt3" href="#/centre/today">See today’s plan, meals & suggestions</a></div>
    <div class="card"><div class="flex between"><h2 class="lined" style="font-size:1.25rem">♥ Community feed</h2><a class="xs" href="#/centre/feed">Open the feed →</a></div><div class="stack mt4 feed-mini">${(c.feed || []).slice(0, 3).map(feedItem).join('') || '<p class="muted">Nothing yet.</p>'}</div></div>
  </div></section>

  <section class="container centre-sec"><h2>The practice rooms</h2>
    <div class="grid md3 mt6">${PRACTICES.map(p => `<a class="card room" href="#/centre/${p.id}"><div class="room-em">${EMBLEM[p.emblem]}</div><div><div class="kicker" style="font-size:.66rem">${esc(p.tag)}</div><h3 class="mt1" style="font-size:1.2rem">${esc(p.name)}</h3><p class="sm muted mt2">${esc(p.desc)}</p>
      <p class="xs gold mt3">${c.videos.filter(v => v.practice === p.id).length} videos · ${c.books.filter(b => b.practice === p.id).length} books · ${c.sessions.filter(s => s.practice === p.id).length} weekly session${c.sessions.filter(s => s.practice === p.id).length === 1 ? '' : 's'}</p></div></a>`).join('')}</div></section>

  <section class="container centre-sec"><div class="kicker">Guided methods</div><h2 class="mt2">Breathe, stretch, flow, rest</h2>
    <p class="sm muted mt2">Wim Hof–style breathing, yoga, tai chi, qigong, body scans, yoga nidra, grounding and laughter — each with a living guide that shows every breath and every move.</p>
    <div class="grid md3 mt6">${['wimhof', 'sunsal', 'brocades', 'bodyscan', 'nidra', 'laughdrill'].map(k => methodCard(methodById(k))).join('')}</div>
    <div class="flex mt6" style="justify-content:center"><a class="btn" href="#/centre/methods">✦ See all ${METHODS.length} guided methods</a></div></section>

  ${lifeSection()}

  <section class="container centre-sec"><div class="grid md2" style="align-items:start">
    <div><h2>This week</h2><p class="sm muted mt2">Live online sessions with a DELTA guide. ${member ? 'Tap “I’ll join” and we’ll remind you.' : 'Members can save a place.'}</p>
      <div class="stack mt4">${week.map(s => { const p = practiceById(s.practice); return `<div class="session ${s.day === todayIdx ? 'today' : ''}"><div class="s-em">${EMBLEM[p?.emblem] || ''}</div><div class="s-body"><div class="xs gold">${DAYS[s.day]}${s.day === todayIdx ? ' · today' : ''} · ${esc(s.time)} · ${s.mins} min</div><b>${esc(s.title)}</b><div class="xs muted">${esc(s.where)} · ${esc(s.host)} · ${s.going} going</div></div>
        ${member ? `<button class="btn ${s.mine ? '' : 'ghost'} xs" data-act="rsvp" data-id="${s.id}" aria-pressed="${s.mine}">${s.mine ? '✓ Going' : 'I’ll join'}</button>` : ''}</div>`; }).join('')}</div></div>
    <div class="stack6">
      ${member ? `<div class="card"><h2 class="sm" style="font-size:1rem">How are you today?</h2><p class="xs muted mt1">Private to you — just a gentle way to notice how you feel.</p>
        <div class="moods mt3">${MOODS.map(([k, e]) => `<button class="mood ${myMood[new Date(now()).toISOString().slice(0, 10)] === k ? 'on' : ''}" data-act="mood" data-m="${k}" aria-label="${k}" title="${k}">${e}</button>`).join('')}</div>
        <div class="xs muted mt3">Your week: ${last7.map(m => MOODS.find(x => x[0] === m)?.[1] || '·').join(' ')}</div></div>` : ''}
      <div class="card relax"><h2 class="sm" style="font-size:1rem">Relax now</h2><div class="grid mt3" style="grid-template-columns:1fr 1fr;gap:.6rem">
        <button class="tile" data-act="breathe"><span class="t-ico">🌬</span>Breathing guide</button><button class="tile" data-act="sit"><span class="t-ico">🔔</span>Meditation timer</button>
        <button class="tile" data-act="sit" data-sound="ocean"><span class="t-ico">🌊</span>Ocean sounds</button><button class="tile" data-act="sit" data-sound="rain"><span class="t-ico">🌧</span>Gentle rain</button><button class="tile" data-act="kindness" style="grid-column:1/-1"><span class="t-ico">♥</span>Loving-kindness — send love</button></div></div>
      <div class="card"><h2 class="sm" style="font-size:1rem">Follow DELTA</h2><p class="xs muted mt1">New videos, sessions and good news.</p>${socialButtons_(true)}</div>
    </div></div></section>

  <section class="container centre-sec"><h2>Gratitude wall</h2><p class="sm muted mt2">Small good things, shared kindly.</p>
    ${member ? `<form class="flex mt4" data-form="gratitude"><input type="text" name="text" maxlength="200" required placeholder="Today I’m grateful for…" style="flex:1;min-width:14rem;margin:0" aria-label="Today I'm grateful for"><label class="chk" style="margin:0"><input type="checkbox" name="anon"> Anonymous</label><button class="btn xs">Share</button></form>` : `<p class="sm mt3"><a href="#/join">Join DELTA</a> to read and add to the wall.</p>`}
    <div class="gwall mt6">${(c.gratitude || []).map((g, i) => `<figure class="gnote" style="--i:${i % 7}"><blockquote>${esc(g.text)}</blockquote><figcaption class="xs muted">— ${esc(g.by)} · ${fmtDate(g.at)}</figcaption>${member ? `<div class="flex mt2" style="gap:.5rem"><button class="btn ghost xs" data-act="post-love" data-id="${g.id}" ${g.loved ? 'aria-pressed="true" disabled' : ''}>♥ ${g.loves || 0}</button><button class="linkbtn xs" data-act="post-report" data-id="${g.id}">Report</button></div>` : ''}</figure>`).join('') || (member ? '<p class="sm muted">Be the first to add something.</p>' : '')}</div></section>

  <section class="container centre-sec"><h2>Gathering rooms</h2><p class="sm muted mt2">Moderated conversation groups for each pillar, Awakening and everyday encouragement.</p>
    <div class="chips mt4">${PILLARS.map(p => `<a class="chip" href="#/community/${p.id}">${p.icon} ${p.name[0] + p.name.slice(1).toLowerCase()}</a>`).join('')}<a class="chip" href="#/community/awakening">✧ Awakening</a><a class="chip" href="#/community/general">♡ Encouragement</a><a class="chip" href="#/laughology">😄 LAUGHOLOGY</a></div></section>
  </main>`;
};

/* ── a practice room ── */
function centreRoom(id) {
  if (id === 'methods') return methodsPage();
  const p = practiceById(id); if (!p) return notFound();
  const u = me(), member = u && hasAccess(u), c = S.centre;
  const vids = c.videos.filter(v => v.practice === id), books = c.books.filter(b => b.practice === id), sess = c.sessions.filter(s => s.practice === id);
  const pillar = PILLARS.find(x => x.id === p.pillar);
  const gentle = ['yoga', 'taichi'].includes(id) ? '<p class="xs muted mt3">Move gently and within your own range; stop if anything hurts, and check with your GP if you have a health condition.</p>' : '';
  return `${centreTabs()}` + page(`${back('/centre', 'Community Centre')}
  <div class="room-hero mt6"><div class="room-big">${EMBLEM[p.emblem]}</div><div><div class="kicker">${esc(p.tag)}</div><h1 class="mt2">${esc(p.name)}</h1><p class="lg muted mt3">${esc(p.desc)}</p>
    <div class="flex mt4"><button class="btn xs" data-act="breathe">🌬 Breathe</button><button class="btn ghost xs" data-act="sit">🔔 Timer</button>${pillar ? `<a class="btn ghost xs" href="#/pillars/${pillar.id}">${pillar.icon} ${pillar.name} pillar</a>` : ''}</div>${gentle}</div></div>
  ${(() => { const ms = METHODS.filter(m => m.practice === id || (id === 'laughter' && m.cat === 'joy') || (id === 'comedy' && m.id === 'laughdrill')); return ms.length ? `<h2 class="mt10 lined">Guided methods</h2><div class="grid md3 mt4">${ms.map(methodCard).join('')}</div><p class="sm mt3"><a href="#/centre/methods">All ${METHODS.length} guided methods →</a></p>` : ''; })()}
  <h2 class="mt10">Watch & follow along</h2><div class="grid md3 mt4">${vids.map(centreVideoCard).join('') || '<p class="muted">Videos coming soon.</p>'}</div>
  ${books.length ? `<h2 class="mt10">The reading shelf</h2><div class="shelf mt4">${books.map((b, i) => `<a class="book" href="${bookLink(b)}" target="_blank" rel="noopener" style="--i:${i}"><span class="spine"><b>${esc(b.title)}</b><i>${esc(b.author)}</i></span><span class="b-why">${esc(b.why)}<span class="xs gold">Find this book ↗</span></span></a>`).join('')}</div>` : ''}
  ${sess.length ? `<h2 class="mt10">Weekly sessions</h2><div class="stack mt4">${sess.map(s => `<div class="session"><div class="s-body"><div class="xs gold">${DAYS[s.day]} · ${esc(s.time)} · ${s.mins} min</div><b>${esc(s.title)}</b><div class="xs muted">${esc(s.where)} · ${s.going} going</div></div>${member ? `<button class="btn ${s.mine ? '' : 'ghost'} xs" data-act="rsvp" data-id="${s.id}">${s.mine ? '✓ Going' : 'I’ll join'}</button>` : `<a class="xs" href="#/join">Join to save a place</a>`}</div>`).join('')}</div>` : ''}
  <div class="card hl mt10 flex between"><div><h2 class="sm" style="font-size:1rem">Talk about it</h2><p class="sm muted mt1">Share how your practice is going in the ${pillar ? pillar.name : ''} group.</p></div><a class="btn xs" href="#/community/${p.pillar}">Open the group</a></div>`, 'wide');
}

/* ── relaxing tools: breathing guide and meditation timer with bell + ambient sounds (Web Audio, no downloads) ── */
let relax = null;
function closeRelax() { if (!relax) return; clearTimeout(relax.timer); clearInterval(relax.tick); relax.audio?.stop(); relax.el.remove(); document.removeEventListener('keydown', relax.key); relax = null; }
function relaxShell(title, inner) {
  closeRelax();
  const el = document.createElement('div'); el.className = 'relax-overlay'; el.setAttribute('role', 'dialog'); el.setAttribute('aria-modal', 'true'); el.setAttribute('aria-label', title);
  el.innerHTML = `<div class="relax-stars" aria-hidden="true"></div><button class="relax-close" aria-label="Close">✕</button><div class="relax-inner">${inner}</div>`;
  document.body.appendChild(el);
  const key = e => { if (e.key === 'Escape') closeRelax(); };
  document.addEventListener('keydown', key);
  el.querySelector('.relax-close').onclick = closeRelax;
  relax = { el, key };
  el.querySelector('button, select')?.focus();
  return el;
}
const PATTERNS = { calm: { name: 'Calm (in 4 · out 6)', steps: [['Breathe in', 4, 1], ['Breathe out', 6, 0]] }, box: { name: 'Box (4 · 4 · 4 · 4)', steps: [['Breathe in', 4, 1], ['Hold', 4, 1], ['Breathe out', 4, 0], ['Hold', 4, 0]] }, relax478: { name: '4 · 7 · 8 relaxing breath', steps: [['Breathe in', 4, 1], ['Hold', 7, 1], ['Breathe out', 8, 0]] } };
function openBreathe() {
  const el = relaxShell('Breathing guide', `<h2 class="metal">Breathe with me</h2><div class="chips mt4" role="group" aria-label="Pattern">${Object.entries(PATTERNS).map(([k, p], i) => `<button class="chip ${i ? '' : 'on'}" data-pat="${k}">${p.name}</button>`).join('')}</div>
    <div class="breath-wrap"><div class="breath-glow"></div><div class="breath-circle"><span class="breath-word">Ready</span><span class="breath-count"></span></div></div>
    <p class="sm muted" aria-live="polite"><span class="breath-cycles">Press start and follow the circle.</span></p><button class="btn mt4 breath-go">Start</button>`);
  let pat = 'calm', running = false, cycles = 0;
  const circle = el.querySelector('.breath-circle'), word = el.querySelector('.breath-word'), count = el.querySelector('.breath-count'), info = el.querySelector('.breath-cycles'), go = el.querySelector('.breath-go');
  el.querySelectorAll('[data-pat]').forEach(b => b.onclick = () => { el.querySelectorAll('[data-pat]').forEach(x => x.classList.toggle('on', x === b)); pat = b.dataset.pat; if (running) { stop(); start(); } });
  const step = i => {
    const [w, secs, big] = PATTERNS[pat].steps[i];
    word.textContent = w; circle.style.transitionDuration = secs + 's'; circle.classList.toggle('big', !!big);
    let left = secs; count.textContent = left; clearInterval(relax.tick); relax.tick = setInterval(() => { left--; count.textContent = left > 0 ? left : ''; }, 1000);
    relax.timer = setTimeout(() => { const n = (i + 1) % PATTERNS[pat].steps.length; if (!n) { cycles++; info.textContent = `${cycles} breath${cycles === 1 ? '' : 's'} — lovely. Keep going as long as you like.`; } step(n); }, secs * 1000);
  };
  const start = () => { running = true; go.textContent = 'Pause'; step(0); };
  const stop = () => { running = false; go.textContent = 'Start'; clearTimeout(relax.timer); clearInterval(relax.tick); word.textContent = 'Paused'; count.textContent = ''; circle.classList.remove('big'); };
  go.onclick = () => (running ? stop() : start());
}
function soundEngine() {
  const AC = window.AudioContext || window.webkitAudioContext; if (!AC) return null;
  const ctx = new AC(), master = ctx.createGain(); master.gain.value = 0.0; master.connect(ctx.destination);
  let nodes = [];
  const noise = () => { const len = ctx.sampleRate * 2, buf = ctx.createBuffer(1, len, ctx.sampleRate), d = buf.getChannelData(0); let last = 0; for (let i = 0; i < len; i++) { const w = Math.random() * 2 - 1; last = (last + 0.02 * w) / 1.02; d[i] = last * 3.5; } const s = ctx.createBufferSource(); s.buffer = buf; s.loop = true; return s; };
  const white = () => { const len = ctx.sampleRate * 2, buf = ctx.createBuffer(1, len, ctx.sampleRate), d = buf.getChannelData(0); for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1; const s = ctx.createBufferSource(); s.buffer = buf; s.loop = true; return s; };
  const api = {
    bell() { const t = ctx.currentTime; [[528, 0.35], [792, 0.12], [1056, 0.06]].forEach(([f, g]) => { const o = ctx.createOscillator(), a = ctx.createGain(); o.frequency.value = f; a.gain.setValueAtTime(g, t); a.gain.exponentialRampToValueAtTime(0.0001, t + 6); o.connect(a).connect(ctx.destination); o.start(t); o.stop(t + 6.2); }); },
    play(kind) {
      api.quiet(); if (kind === 'none') return;
      if (kind === 'ocean') { const s = noise(), f = ctx.createBiquadFilter(), lfo = ctx.createOscillator(), lg = ctx.createGain(), g = ctx.createGain(); f.type = 'lowpass'; f.frequency.value = 700; lfo.frequency.value = 0.09; lg.gain.value = 0.45; g.gain.value = 0.55; lfo.connect(lg).connect(g.gain); s.connect(f).connect(g).connect(master); s.start(); lfo.start(); nodes.push(s, lfo); }
      if (kind === 'rain') { const s = white(), f = ctx.createBiquadFilter(), g = ctx.createGain(); f.type = 'bandpass'; f.frequency.value = 2500; f.Q.value = 0.6; g.gain.value = 0.12; s.connect(f).connect(g).connect(master); s.start(); nodes.push(s); }
      if (kind === 'hum') { [110, 165, 220].forEach((fq, i) => { const o = ctx.createOscillator(), g = ctx.createGain(); o.frequency.value = fq; g.gain.value = [0.12, 0.06, 0.03][i]; o.connect(g).connect(master); o.start(); nodes.push(o); }); }
      master.gain.cancelScheduledValues(ctx.currentTime); master.gain.setTargetAtTime(0.9, ctx.currentTime, 1.2);
    },
    quiet() { nodes.forEach(n => { try { n.stop(); } catch { /* already stopped */ } }); nodes = []; },
    stop() { api.quiet(); ctx.close(); },
  };
  return api;
}
function openSit(sound = 'none', startMins = 5) {
  const el = relaxShell('Meditation timer', `<h2 class="metal">Sit for a while</h2>
    <div class="chips mt4" role="group" aria-label="Length">${[3, 5, 10, 20].map(m => `<button class="chip ${m === startMins ? 'on' : ''}" data-min="${m}">${m} min</button>`).join('')}</div>
    <div class="chips mt3" role="group" aria-label="Background sound">${[['none', 'Silence'], ['ocean', '🌊 Ocean'], ['rain', '🌧 Rain'], ['hum', '〰 Soft hum']].map(([k, l]) => `<button class="chip ${k === sound ? 'on' : ''}" data-snd="${k}">${l}</button>`).join('')}</div>
    <div class="sit-ring"><svg viewBox="0 0 120 120" aria-hidden="true"><circle cx="60" cy="60" r="52" class="track"/><circle cx="60" cy="60" r="52" class="prog" pathLength="1"/></svg><div class="sit-time">5:00</div><div class="lotus-mini">${EMBLEM.lotus}</div></div>
    <p class="sm muted" aria-live="polite"><span class="sit-msg">A bell will sound at the start and the end.</span></p><button class="btn mt4 sit-go">Begin</button>`);
  let mins = startMins, left = startMins * 60, running = false;
  const engine = soundEngine(); relax.audio = engine;
  const prog = el.querySelector('.prog'), time = el.querySelector('.sit-time'), msg = el.querySelector('.sit-msg'), go = el.querySelector('.sit-go');
  const show = () => { time.textContent = `${Math.floor(left / 60)}:${String(left % 60).padStart(2, '0')}`; prog.style.strokeDashoffset = String(1 - left / (mins * 60)); };
  el.querySelectorAll('[data-min]').forEach(b => b.onclick = () => { if (running) return; el.querySelectorAll('[data-min]').forEach(x => x.classList.toggle('on', x === b)); mins = +b.dataset.min; left = mins * 60; show(); });
  el.querySelectorAll('[data-snd]').forEach(b => b.onclick = () => { el.querySelectorAll('[data-snd]').forEach(x => x.classList.toggle('on', x === b)); sound = b.dataset.snd; if (running) engine?.play(sound); });
  go.onclick = () => {
    if (running) { running = false; clearInterval(relax.tick); engine?.quiet(); go.textContent = 'Resume'; msg.textContent = 'Paused.'; return; }
    running = true; go.textContent = 'Pause'; msg.textContent = 'Settle in. Let your breath be easy.'; engine?.bell(); engine?.play(sound); el.classList.add('sitting');
    relax.tick = setInterval(() => { left--; show(); if (left <= 0) { clearInterval(relax.tick); running = false; engine?.quiet(); engine?.bell(); el.classList.remove('sitting'); msg.textContent = 'Welcome back. Take a moment before you move on. 🌿'; go.textContent = 'Again'; left = mins * 60; } }, 1000);
  };
  show();
}

Object.assign(A, {
  breathe() { openBreathe(); },
  sit(el) { openSit(el?.dataset?.sound || 'none'); },
  rsvp(el) { act('rsvp', { id: el.dataset.id }); },
  mood(el) { act('mood', { mood: el.dataset.m }).then(r => r && load().then(render)); },
  'social-unset'(el) { toast(`${el.dataset.p}: the link hasn't been added yet${S.role === 'admin' ? ' — add it in Admin → Settings.' : '.'}`); },
});
Object.assign(F, {
  gratitude(f, d) { return act('gratitude', { text: d.get('text'), anon: !!d.get('anon') }); },
  'centre-video'(f, d) { return act('centre-video', obj(d)).then(r => { if (r) f.reset(); return r; }); },
  'centre-book'(f, d) { return act('centre-book', obj(d)).then(r => { if (r) f.reset(); return r; }); },
  'centre-session'(f, d) { return act('centre-session', obj(d)).then(r => { if (r) f.reset(); return r; }); },
});
addEventListener('hashchange', closeRelax);
