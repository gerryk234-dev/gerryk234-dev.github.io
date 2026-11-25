/* DELTA · Community portal — "Today" (daily message, a simple day plan with meals, movement and practices,
   a motivation video, music, films and books) and the Feed (members share; the DELTA team posts updates). */
'use strict';
const dayIndex = () => Math.floor(now() / DAY);
const pickDay = (arr, k = 0) => arr[((dayIndex() + k) % arr.length + arr.length) % arr.length];
const centreTabs = () => (me() && !isStaff(me())) ? portalNav() : subnav([['/centre', '✦ Centre'], ['/centre/today', '☀ Today'], ['/centre/feed', '♥ Feed'], ['/centre/methods', '🌬 Methods'], ['/community', '◎ Groups']]);
const ytSearch = q => `https://www.youtube.com/results?search_query=${encodeURIComponent(q)}`;

function dailyMessage() { const [text, by] = pickDay(DAILY.messages); return { text, by }; }

/* The day plan: rhythm of the day, practices linked to the guided methods. */
function dayPlan() {
  const ms = ids => ids.map(methodById).filter(Boolean);
  const breath = pickDay(ms(['box', 'coherent', 'nadi', 'wimhof', 'coherent', 'box', 'nadi']));
  const pause = pickDay(ms(['grounding', 'bodyscan', 'laughdrill', 'kindness', 'grounding', 'laughdrill', 'bodyscan']), 2);
  const flow = pickDay(ms(['sunsal', 'brocades', 'chair', 'taichi5', 'qigong-morning', 'sunsal', 'brocades']), 1);
  const wind = pickDay(ms(['bedtime', 'relax478', 'nidra', 'pmr', 'bedtime', 'coherent', 'nidra']), 3);
  const move = pickDay(DAILY.moves);
  return [
    ['07:00', '☀', 'Wake, water & daylight', 'A glass of water, then five minutes of morning light outside — feet on the ground if you can.'],
    ['07:15', '🌬', `Breathe · ${breath.name}`, `${methodMins(breath)} min with the living guide.`, breath.id],
    ['08:00', '🥣', 'Breakfast', pickDay(DAILY.meals.breakfast)],
    ['10:30', '💪', `Movement snack · ${move[0]}`, move[1]],
    ['12:30', '🥗', 'Lunch', pickDay(DAILY.meals.lunch, 2)],
    ['15:00', '🌿', `Mindful pause · ${pause.name}`, `${methodMins(pause)} min — reset the afternoon.`, pause.id],
    ['16:00', '🍎', 'Snack & water', pickDay(DAILY.meals.snack, 1)],
    ['17:30', '🧘', `Move · ${flow.name}`, `${methodMins(flow)} min, gently.`, flow.id],
    ['19:00', '🍲', 'Dinner', pickDay(DAILY.meals.dinner, 4)],
    ['21:00', '🌙', `Wind down · ${wind.name}`, `${methodMins(wind)} min — screens dimmed.`, wind.id],
    ['22:00', '✍', 'Three good things & lights out', 'Add one to the gratitude wall, then sleep.'],
  ];
}
const planDone = () => { try { return JSON.parse(localStorage.getItem('delta_plan_' + todayKey()) || '[]'); } catch { return []; } };
const savePlan = d => { try { localStorage.setItem('delta_plan_' + todayKey(), JSON.stringify(d)); } catch { /* storage unavailable */ } };

function planHTML(compact = false) {
  const plan = dayPlan(), done = planDone(), hh = new Date(now()).getHours() * 60 + new Date(now()).getMinutes();
  const nextIdx = plan.findIndex(([t]) => { const [h, m] = t.split(':').map(Number); return h * 60 + m >= hh - 30; });
  const items = compact ? plan.filter((_, i) => i >= Math.max(0, nextIdx) - 0).slice(0, 4) : plan;
  return `<div class="plan ${compact ? 'compact' : ''}"><div class="plan-line" aria-hidden="true"><i></i></div><ol class="plan-list">${items.map(it => { const i = plan.indexOf(it), [t, ico, title, detail, mid] = it, on = done.includes(i);
    return `<li class="plan-item ${on ? 'done' : ''} ${i === nextIdx ? 'now' : ''}" style="--k:${i}"><span class="p-time">${t}</span><span class="p-dot" aria-hidden="true">${ico}</span>
      <div class="p-body"><b>${esc(title)}</b><span class="xs muted">${esc(detail)}</span>${mid ? `<button class="linkbtn xs gold" data-act="method" data-id="${mid}">▶ Start guided</button>` : ''}</div>
      <button class="p-tick" data-act="plan-tick" data-i="${i}" aria-pressed="${on}" aria-label="${on ? 'Done' : 'Mark done'}: ${esc(title)}">${on ? '✓' : ''}</button></li>`; }).join('')}</ol>
    <p class="xs muted mt2 plan-sum">${done.length} of ${plan.length} done today${done.length >= plan.length ? ' — what a day! 🌟' : ''}</p></div>`;
}

function greeting() { const h = new Date(now()).getHours(), u = me(); return `${h < 12 ? 'Good morning' : h < 18 ? 'Good afternoon' : 'Good evening'}${u ? ', ' + esc(u.name.split(' ')[0]) : ''}`; }

function messageHTML(big = true) {
  const m = dailyMessage();
  return `<figure class="daily-msg ${big ? 'big' : ''}"><div class="dm-art" aria-hidden="true">${LIFE.flower('slow')}</div><blockquote>${m.text.split(' ').map((w, i) => `<span class="dw" style="--i:${i}">${esc(w)}</span>`).join(' ')}</blockquote><figcaption class="xs gold mt3">— ${esc(m.by)} · message for ${new Date(now()).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })}</figcaption></figure>`;
}

function mineralManToday() { const vs = S.videos.filter(v => v.youtubeId && v.status !== 'review' && !v.archived); return vs.length ? pickDay(vs, 5) : null; }

R['/centre/today'] = () => {
  const u = me(), vid = pickDay(DAILY.videos), mm = mineralManToday(), meals = DAILY.meals;
  const music = [0, 1, 2].map(k => pickDay(DAILY.music, k * 5)), film = pickDay(DAILY.films, 3), book = (S.centre.books || []).length ? pickDay(S.centre.books, 7) : null;
  return `${centreTabs()}<main id="main" tabindex="-1" class="centre">
  <section class="container centre-sec today-hero"><div class="kicker">${greeting()}</div><h1 class="mt2">Your <span class="metal">today</span></h1>${messageHTML(true)}</section>
  <section class="container centre-sec"><div class="grid md2" style="align-items:start">
    <div class="card"><h2 class="lined" style="font-size:1.25rem">☀ Today’s plan</h2><p class="xs muted mt2">A gentle rhythm for the day. Tap ▶ to start a practice, tick what you’ve done.</p>${planHTML(false)}</div>
    <div class="stack">
      <div class="card"><h2 class="lined" style="font-size:1.25rem">🥗 Meals for today</h2><ul class="meals mt3">${[['Breakfast', meals.breakfast, 0], ['Lunch', meals.lunch, 2], ['Dinner', meals.dinner, 4], ['Snack', meals.snack, 1]].map(([l, a, k]) => `<li><span class="xs gold">${l}</span><span>${esc(pickDay(a, k))}</span></li>`).join('')}</ul><p class="xs muted mt3">General wholefood ideas — your report’s guidance comes first. Drink water through the day.</p></div>
      <div class="card"><h2 class="lined" style="font-size:1.25rem">💪 Movement of the day</h2><p class="mt3"><b>${esc(pickDay(DAILY.moves)[0])}</b> — ${esc(pickDay(DAILY.moves)[1])}</p><p class="sm muted mt2">Then try <a href="#/centre/methods" data-act="method" data-id="${dayPlan()[7][4]}">${esc(dayPlan()[7][2].replace('Move · ', ''))}</a> this evening.</p></div>
      ${u && hasAccess(u) ? `<div class="card"><h2 class="lined" style="font-size:1.25rem">How are you today?</h2><div class="moods mt3">${[['calm', '😌'], ['happy', '😊'], ['okay', '🙂'], ['tired', '😴'], ['low', '😔'], ['stressed', '😣']].map(([k, e]) => `<button class="mood ${(u.mood || {})[todayKey()] === k ? 'on' : ''}" data-act="mood" data-m="${k}" aria-label="${k}">${e}</button>`).join('')}</div></div>` : ''}
    </div></div></section>
  <section class="container centre-sec"><h2>🎬 Motivation for today</h2><div class="grid md2 mt6">
    ${videoCard({ youtubeId: vid.id, title: vid.title, cat: vid.ch, year: '', length: vid.mins + ' min' })}
    ${mm ? videoCard({ ...mm, cat: 'Meet Mineral Man' }) : ''}</div></section>
  <section class="container centre-sec"><h2>✨ Suggestions</h2><div class="grid md3 mt6">
    <div class="card sugg"><div class="s-ico" aria-hidden="true">🎵</div><h3 class="sm gold">Music to unwind</h3><ul class="mt3">${music.map(([t, a, g]) => `<li><a href="${ytSearch(t + ' ' + a)}" target="_blank" rel="noopener">${esc(t)}</a><span class="xs muted"> · ${esc(a)} · ${esc(g)}</span></li>`).join('')}</ul></div>
    <div class="card sugg"><div class="s-ico" aria-hidden="true">🎞</div><h3 class="sm gold">Film of the day</h3><p class="mt3"><b>${esc(film[0])}</b> <span class="xs muted">(${film[1]})</span></p><p class="sm muted mt1">${esc(film[2])}</p><a class="xs" href="${ytSearch(film[0] + ' ' + film[1] + ' trailer')}" target="_blank" rel="noopener">Watch the trailer ↗</a></div>
    ${book ? `<div class="card sugg"><div class="s-ico" aria-hidden="true">📖</div><h3 class="sm gold">Book of the day</h3><p class="mt3"><b>${esc(book.title)}</b></p><p class="xs muted">${esc(book.author)}</p><p class="sm muted mt1">${esc(book.why)}</p><a class="xs" href="${bookLink(book)}" target="_blank" rel="noopener">Find this book ↗</a></div>` : ''}
  </div></section>
  <section class="container centre-sec"><div class="flex between"><h2>♥ From the community</h2><a href="#/centre/feed">Open the feed →</a></div><div class="stack mt4 feed-mini">${S.centre.feed.slice(0, 3).map(feedItem).join('') || '<p class="muted">Nothing yet.</p>'}</div></section>
  </main>`;
};

/* ── feed ── */
const TAGS = { win: ['🏆', 'A win'], gratitude: ['🙏', 'Gratitude'], question: ['❓', 'Question'], inspiration: ['✨', 'Inspiration'], practice: ['🧘', 'Practice'] };
function feedItem(p) {
  const u = me(), member = u && hasAccess(u), staff = isStaff(u);
  const ytFrame = p.videoId ? videoCard({ youtubeId: p.videoId, title: p.title || 'Video', cat: 'DELTA update', year: '' }) : '';
  const head = p.kind === 'update'
    ? `<div class="f-head"><span class="f-av upd" aria-hidden="true">${LIFE.flower('mini')}</span><div><b>DELTA team</b>${p.pinned ? ' <span class="pill xs">📌 Pinned</span>' : ''}<div class="xs muted">Update · ${fmtDT(p.at)}</div></div></div><h3 class="mt3">${esc(p.title)}</h3>`
    : `<div class="f-head"><span class="f-av" aria-hidden="true">${esc((p.by || '?')[0])}</span><div><b>${esc(p.by)}</b>${p.tag && TAGS[p.tag] ? ` <span class="pill xs">${TAGS[p.tag][0]} ${TAGS[p.tag][1]}</span>` : ''}<div class="xs muted">${fmtDT(p.at)}</div></div></div>`;
  return `<article class="card feed-item ${p.kind}" id="post-${p.id}">${head}<p class="mt2 f-text">${esc(p.text)}</p>${ytFrame ? `<div class="mt3 f-video">${ytFrame}</div>` : ''}
    <div class="flex mt3 f-actions">${member ? `<button class="btn ghost xs" data-act="post-love" data-id="${p.id}" ${p.loved ? 'aria-pressed="true" disabled' : ''}>♥ ${p.loves}</button>` : `<span class="xs muted">♥ ${p.loves}</span>`}
      ${member && p.kind === 'feed' && !p.mine ? `<button class="linkbtn xs" data-act="post-report" data-id="${p.id}">${p.reported ? 'Reported' : 'Report'}</button>` : ''}
      ${p.mine && p.kind === 'feed' ? `<button class="linkbtn xs" data-act="feed-delete" data-id="${p.id}">Delete</button>` : ''}
      ${staff && p.kind === 'update' && canArea('/admin/content') ? `<button class="linkbtn xs" data-act="feed-pin" data-id="${p.id}">${p.pinned ? 'Unpin' : 'Pin'}</button>` : ''}
      ${staff && canArea('/admin/moderation') ? `<button class="linkbtn xs" data-act="feed-remove" data-id="${p.id}">Remove</button>` : ''}</div>
    ${(p.replies || []).map(r => `<div class="inner mt2 sm f-reply"><span class="xs muted">${esc(r.by)} · ${fmtDT(r.at)}</span><p>${esc(r.text)}</p></div>`).join('')}
    ${member ? `<form class="flex mt2" data-form="reply" data-id="${p.id}"><input type="text" name="text" placeholder="Write a kind reply…" required maxlength="1000" style="flex:1;margin:0" aria-label="Reply"><button class="btn ghost xs">Reply</button></form>` : ''}</article>`;
}

R['/centre/feed'] = q => {
  const u = me(), member = u && hasAccess(u), staff = isStaff(u) && canArea('/admin/content');
  const tag = q.tag && TAGS[q.tag] ? q.tag : '';
  const feed = S.centre.feed.filter(p => !tag || p.tag === tag);
  return `${centreTabs()}<main id="main" tabindex="-1" class="centre">
  <section class="container centre-sec feed-wrap"><div class="kicker">Community feed</div><h1 class="mt2">Share the <span class="metal">good</span></h1>
    <p class="muted mt2">Wins, gratitude, questions and inspiration from DELTA members — and updates from the DELTA team. Be kind; keep health details private.</p>
    ${staff ? `<details class="card mt6 upd-form" ${S.centre.feed.some(p => p.kind === 'update') ? '' : 'open'}><summary><b>✦ Post an update</b> <span class="xs muted">as the DELTA team — everyone can see updates</span></summary>
      <form class="stack mt4" data-form="feed-update"><label class="f"><span>Title</span><input name="title" maxlength="120" required></label><label class="f"><span>Message</span><textarea name="text" rows="3" maxlength="1500" required></textarea></label>
      <label class="f"><span>YouTube video link (optional)</span><input name="video" type="url" placeholder="https://www.youtube.com/watch?v=…"></label><label class="chk"><input type="checkbox" name="pinned"> Pin to the top</label><button class="btn">Post update</button></form></details>` : ''}
    ${member ? `<form class="card mt6 composer" data-form="feed-post"><div class="f-head"><span class="f-av" aria-hidden="true">${esc(u.name[0])}</span><textarea name="text" rows="2" maxlength="600" required placeholder="Share a win, a thank-you or a question…" aria-label="Share with the community"></textarea></div>
      <div class="flex mt3 between"><div class="chips" role="group" aria-label="Tag">${Object.entries(TAGS).map(([k, [i, l]]) => `<label class="chip tagchip"><input type="radio" name="tag" value="${k}"> ${i} ${l}</label>`).join('')}</div>
      <div class="flex"><label class="chk xs" style="margin:0"><input type="checkbox" name="anon"> Anonymous</label><button class="btn xs">Share ♥</button></div></div></form>`
      : `<div class="card mt6 sm">${u ? 'Your membership has paused — renew to post and reply.' : '<a href="#/join">Join DELTA</a> to post, reply and send love. Updates from the DELTA team are open to everyone.'}</div>`}
    <div class="chips mt6" role="group" aria-label="Filter"><a class="chip ${tag ? '' : 'on'}" href="#/centre/feed">All</a>${Object.entries(TAGS).map(([k, [i, l]]) => `<a class="chip ${tag === k ? 'on' : ''}" href="#/centre/feed?tag=${k}">${i} ${l}</a>`).join('')}</div>
    <div class="stack mt6">${feed.map(feedItem).join('') || '<p class="muted">Nothing here yet.</p>'}</div>
  </section></main>`;
};

Object.assign(A, {
  'plan-tick'(el) { const i = +el.dataset.i, d = planDone(), on = !d.includes(i); savePlan(on ? [...d, i] : d.filter(x => x !== i)); render(); if (on) { const b = document.querySelector(`[data-act="plan-tick"][data-i="${i}"]`); if (b) { const r = b.getBoundingClientRect(); loveBurst(r.left + r.width / 2, r.top + r.height / 2); } } },
  'feed-delete'(el) { if (confirm('Delete your post?')) act('feed-delete', { id: el.dataset.id }); },
  'feed-pin'(el) { act('feed-pin', { id: el.dataset.id }); },
  'feed-remove'(el) { if (confirm('Remove this from the feed for everyone?')) act('feed-remove', { id: el.dataset.id }); },
});
Object.assign(F, {
  'feed-post'(f, d) { return act('feed-post', { text: d.get('text'), tag: d.get('tag') || '', anon: !!d.get('anon') }); },
  'feed-update'(f, d) { return act('feed-update', { title: d.get('title'), text: d.get('text'), video: d.get('video'), pinned: !!d.get('pinned') }); },
});
