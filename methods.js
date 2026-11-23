/* DELTA · Guided methods — breathwork (incl. Wim Hof–style rounds), yoga sequences, tai chi & qigong,
   mindfulness and deep rest, grounding and laughter. Each plays in a living guide: a breathing orb inside a
   Lotus of Life, a light running round the step ring, soft bells, and the next step shown ahead. */
'use strict';
const methodById = id => METHODS.find(m => m.id === id);
const methodMins = m => (m.steps ? Math.max(1, Math.round(m.steps.reduce((a, s) => a + s[1], 0) / 60)) : m.mins);
const catOf = id => METHOD_CATS.find(c => c[0] === id) || ['', '', ''];
const ytLink = v => `https://www.youtube.com/watch?v=${esc(v.id)}`;

function methodCard(m) {
  const c = catOf(m.cat);
  return `<article class="card method" data-mcat="${m.cat}"><div class="m-top"><div class="m-em">${EMBLEM[m.emblem]}</div><div><div class="xs gold">${c[2]} ${esc(c[1])} · ${methodMins(m)} min · ${esc(m.level)}</div><h3 class="mt1" style="font-size:1.12rem">${esc(m.name)}</h3></div></div>
    <p class="sm muted mt3">${esc(m.desc)}</p>
    <details class="m-safe mt3"><summary class="xs">⚠ Safety first</summary><p class="xs muted mt2">${esc(m.safety)}</p></details>
    <div class="flex mt4" style="gap:.5rem;align-items:center"><button class="btn xs" data-act="method" data-id="${m.id}">▶ Start guided</button>
    <a class="xs" href="${ytLink(m.video)}" target="_blank" rel="noopener" title="${esc(m.video.title)}">Follow-along video${m.video.ch ? ' · ' + esc(m.video.ch) : ''} ↗</a></div></article>`;
}

function methodsPage() {
  const u = me();
  return `${centreTabs()}<main id="main" tabindex="-1" class="centre">
  <section class="container centre-sec">${back('/centre', 'Community Centre')}
    <div class="methods-hero mt6"><div class="mh-art">${LIFE.flower()}</div><div><div class="kicker">Guided methods</div><h1 class="mt2">Breathe, stretch, <span class="metal">flow</span>, rest</h1>
      <p class="lg muted mt3">${METHODS.length} guided practices — Wim Hof–style breathing, yoga, tai chi and qigong, body scans, yoga nidra, grounding and laughter. Press start and the living guide shows you every breath and every move.</p>
      <p class="xs muted mt3">Educational practices, not medical advice. Read the safety note before you begin, go gently, and check with your GP if you have a health condition or are pregnant.</p></div></div>
    <div class="chips mt8" role="group" aria-label="Filter methods"><button class="chip on" data-act="mcat" data-c="">All</button>${METHOD_CATS.map(([k, l, i]) => `<button class="chip" data-act="mcat" data-c="${k}">${i} ${l}</button>`).join('')}</div>
    ${METHOD_CATS.map(([k, l, i]) => `<section class="m-group mt8" data-mgroup="${k}"><h2 class="lined">${i} ${l}</h2><div class="grid md3 mt4">${METHODS.filter(m => m.cat === k).map(methodCard).join('')}</div></section>`).join('')}
  </section></main>`;
}

/* ── the living guide ── */
function guideShell(m, extra = '') {
  return relaxShell(m.name, `<div class="kicker">${catOf(m.cat)[2]} ${esc(catOf(m.cat)[1])}</div><h2 class="metal mt1">${esc(m.name)}</h2>
    <div class="m-bar mt3" aria-hidden="true"><i></i></div>
    <div class="m-stage"><div class="m-fol">${LIFE.flower('slow')}</div>
      <svg class="m-ring" viewBox="0 0 120 120" aria-hidden="true"><circle cx="60" cy="60" r="54" class="track"/><circle cx="60" cy="60" r="54" class="prog" pathLength="1"/><circle cx="60" cy="60" r="54" class="spark" pathLength="1"/></svg>
      <div class="m-orb"><div class="m-orb-em">${EMBLEM[m.emblem]}</div><b class="m-count"></b></div></div>
    <div aria-live="polite"><p class="m-name"></p><p class="m-cue sm muted"></p></div><p class="m-next xs muted"></p>
    ${extra}
    <div class="m-ctrl mt4"><button class="btn ghost xs m-prev" aria-label="Previous step">◀</button><button class="btn m-go">Start</button><button class="btn ghost xs m-skip" aria-label="Next step">▶</button></div>
    <p class="mt3"><button class="linkbtn xs m-bell" aria-pressed="true">🔔 Bells on</button> · <a class="xs" href="${ytLink(m.video)}" target="_blank" rel="noopener">Follow-along video ↗</a></p>`);
}
function guideParts(el) {
  const q = s => el.querySelector(s);
  return { orb: q('.m-orb'), count: q('.m-count'), name: q('.m-name'), cue: q('.m-cue'), next: q('.m-next'), prog: q('.m-ring .prog'), bar: q('.m-bar i'), go: q('.m-go'), prev: q('.m-prev'), skip: q('.m-skip'), bell: q('.m-bell') };
}
function setBreath(g, kind, secs) {
  g.orb.style.transitionDuration = Math.max(0.6, secs) + 's';
  g.orb.classList.toggle('big', kind === 'in' || (kind === 'hold' && g.orb.classList.contains('big')));
  g.orb.classList.toggle('flow', !kind);
}

function openMethod(id) {
  const m = methodById(id); if (!m) return;
  if (m.special === 'kindness') return openKindness('self');
  if (m.special === 'sound') return openSit('hum', 10);
  if (m.special === 'wimhof') return openWimHof(m);
  const el = guideShell(m), g = guideParts(el), steps = m.steps, total = steps.reduce((a, s) => a + s[1], 0);
  const engine = soundEngine(); relax.audio = engine;
  let i = 0, left = steps[0][1], running = false, bells = true, done = 0;
  const elapsed = () => steps.slice(0, i).reduce((a, s) => a + s[1], 0) + (steps[i][1] - left);
  const show = () => {
    const [name, secs, cue, kind] = steps[i], nx = steps[i + 1];
    g.name.textContent = name; g.cue.textContent = cue; g.count.textContent = Math.ceil(left);
    g.next.textContent = nx ? `Next: ${nx[0]}` : 'Last step';
    g.prog.style.strokeDashoffset = String(left / secs); g.bar.style.width = (elapsed() / total * 100).toFixed(1) + '%';
    return kind;
  };
  const enter = () => { left = steps[i][1]; const kind = show(); if (running) { setBreath(g, kind, steps[i][1]); if (bells && !steps[i][3] || (bells && i === 0)) engine?.bell(); } };
  const finish = () => { running = false; clearInterval(relax.tick); g.orb.classList.remove('big', 'flow'); g.name.textContent = 'Complete — beautifully done. 🌿'; g.cue.textContent = 'Take a moment before you move on.'; g.next.textContent = ''; g.count.textContent = '✓'; g.bar.style.width = '100%'; g.go.textContent = 'Again'; engine?.bell(); el.classList.remove('sitting'); i = 0; done++; };
  const tick = () => { left -= 0.25; if (left <= 0.001) { if (i >= steps.length - 1) return finish(); i++; enter(); } else show(); };
  const play = () => { if (g.go.textContent === 'Again') { i = 0; } running = true; g.go.textContent = 'Pause'; el.classList.add('sitting'); enter(); clearInterval(relax.tick); relax.tick = setInterval(tick, 250); };
  const pause = () => { running = false; clearInterval(relax.tick); g.go.textContent = 'Resume'; g.orb.classList.remove('flow'); };
  g.go.onclick = () => (running ? pause() : play());
  g.skip.onclick = () => { if (i < steps.length - 1) { i++; enter(); } };
  g.prev.onclick = () => { if (i > 0) i--; enter(); };
  g.bell.onclick = () => { bells = !bells; g.bell.textContent = bells ? '🔔 Bells on' : '🔕 Bells off'; g.bell.setAttribute('aria-pressed', bells); };
  show(); g.count.textContent = Math.round(total / 60) + "'";
  g.name.textContent = steps[0][0]; g.cue.textContent = `${steps.length} steps · about ${methodMins(m)} minutes. Press start when you're ready.`;
  return done;
}

/* Wim Hof–style rounds: N deep breaths → breathe out and hold (count up, tap to breathe) → 15 s recovery hold. */
function openWimHof(m) {
  const el = guideShell(m, `<div class="wh-setup"><div class="chips" role="group" aria-label="Rounds">${[2, 3, 4].map(n => `<button class="chip ${n === 3 ? 'on' : ''}" data-rounds="${n}">${n} rounds</button>`).join('')}</div>
      <div class="chips mt2" role="group" aria-label="Breaths">${[30, 40].map(n => `<button class="chip ${n === 30 ? 'on' : ''}" data-breaths="${n}">${n} breaths</button>`).join('')}${[['slow', 'Slow pace'], ['normal', 'Normal pace']].map(([k, l]) => `<button class="chip ${k === 'slow' ? 'on' : ''}" data-pace="${k}">${l}</button>`).join('')}</div>
      <label class="chk mt3 wh-ok"><input type="checkbox"> I'm sitting or lying down, not in or near water, and I've read the safety note.</label>
      <p class="xs muted mt2">${esc(m.safety)}</p></div>
      <button class="btn xs wh-breathe mt3" hidden>I need to breathe</button><p class="wh-log xs gold mt2"></p>`);
  const g = guideParts(el), engine = soundEngine(); relax.audio = engine;
  let rounds = 3, breaths = 30, pace = 'slow', running = false, bells = true;
  const pick = (attr, set) => el.querySelectorAll(`[data-${attr}]`).forEach(b => b.onclick = () => { if (running) return; el.querySelectorAll(`[data-${attr}]`).forEach(x => x.classList.toggle('on', x === b)); set(b.dataset[attr]); });
  pick('rounds', v => (rounds = +v)); pick('breaths', v => (breaths = +v)); pick('pace', v => (pace = v));
  const ok = el.querySelector('.wh-ok input'), need = el.querySelector('.wh-breathe'), log = el.querySelector('.wh-log'), setup = el.querySelector('.wh-setup');
  g.prev.hidden = true; g.skip.hidden = true;
  g.bell.onclick = () => { bells = !bells; g.bell.textContent = bells ? '🔔 Bells on' : '🔕 Bells off'; };
  g.name.textContent = 'Ready when you are'; g.cue.textContent = `${rounds} rounds of ${breaths} deep breaths, a relaxed hold, and a recovery breath.`;
  let round = 0, holds = [], timer = null;
  const wait = ms => new Promise(r => { timer = setTimeout(r, ms); relax.timer = timer; });
  const stopped = () => !running || !relax || relax.el !== el;
  async function breatheRound() {
    const tin = pace === 'slow' ? 2.1 : 1.6, tout = pace === 'slow' ? 1.6 : 1.2;
    g.name.textContent = `Round ${round + 1} of ${rounds} — breathe`; g.cue.textContent = 'Fully in through the belly and chest, let go out. Don’t force it.';
    for (let n = 1; n <= breaths; n++) {
      if (stopped()) return false;
      g.count.textContent = n; g.next.textContent = n >= breaths - 3 ? 'Last breaths — then breathe out and hold' : '';
      g.prog.style.strokeDashoffset = String(1 - n / breaths); setBreath(g, 'in', tin); await wait(tin * 1000);
      if (stopped()) return false; setBreath(g, 'out', tout); await wait(tout * 1000);
    }
    return true;
  }
  async function hold() {
    if (bells) engine?.bell();
    g.name.textContent = 'Breathe out… and hold'; g.cue.textContent = 'Relax. Tap “I need to breathe” whenever you feel the urge.'; g.next.textContent = '';
    setBreath(g, 'out', 1); need.hidden = false; need.focus();
    const t0 = Date.now(); let secs = 0;
    await new Promise(res => { need.onclick = res; relax.tick = setInterval(() => { secs = Math.floor((Date.now() - t0) / 1000); g.count.textContent = `${Math.floor(secs / 60)}:${String(secs % 60).padStart(2, '0')}`; g.prog.style.strokeDashoffset = String(1 - Math.min(1, secs / 120)); if (secs >= 180 || stopped()) res(); }, 250); });
    clearInterval(relax.tick); need.hidden = true; holds.push(secs); return !stopped();
  }
  async function recover() {
    g.name.textContent = 'Big breath in — hold for 15'; g.cue.textContent = 'Fill up fully and gently hold.'; setBreath(g, 'in', 2);
    for (let s = 15; s > 0; s--) { if (stopped()) return false; g.count.textContent = s; g.prog.style.strokeDashoffset = String(s / 15); await wait(1000); }
    g.name.textContent = 'Let go'; g.cue.textContent = ''; setBreath(g, 'out', 2); await wait(2500); return !stopped();
  }
  async function run() {
    holds = []; log.textContent = ''; setup.hidden = true; if (bells) engine?.bell(); el.classList.add('sitting');
    for (round = 0; round < rounds; round++) {
      g.bar.style.width = (round / rounds * 100) + '%';
      if (!(await breatheRound()) || !(await hold()) || !(await recover())) return;
      log.textContent = holds.map((s, k) => `Round ${k + 1}: ${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`).join(' · ');
    }
    running = false; g.bar.style.width = '100%'; g.orb.classList.remove('big'); g.count.textContent = '✓'; el.classList.remove('sitting');
    g.name.textContent = 'Complete — sit quietly and notice how you feel. 🌿'; g.cue.textContent = 'Optional: finish with a cool shower — 15–30 seconds to start. Skip cold exposure if you have a heart condition or high blood pressure.';
    g.go.textContent = 'Again'; setup.hidden = false; if (bells) engine?.bell();
  }
  g.go.onclick = () => {
    if (running) { running = false; clearTimeout(timer); clearInterval(relax.tick); need.hidden = true; g.go.textContent = 'Start again'; g.name.textContent = 'Stopped. Breathe normally.'; g.orb.classList.remove('big'); setup.hidden = false; el.classList.remove('sitting'); return; }
    if (!ok.checked) { g.cue.textContent = 'Please tick the safety box first.'; ok.focus(); return; }
    running = true; g.go.textContent = 'Stop'; run();
  };
}

Object.assign(A, {
  method(el) { openMethod(el.dataset.id); },
  mcat(el) { const c = el.dataset.c; document.querySelectorAll('[data-act="mcat"]').forEach(b => b.classList.toggle('on', b === el)); document.querySelectorAll('[data-mgroup]').forEach(s => (s.hidden = !!c && s.dataset.mgroup !== c)); },
});
