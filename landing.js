/* DELTA · the landing page — the title, the six steps of the DELTA Method (titles only) and the call to action,
   over the meditation image (white light from above lighting the seven chakras), blended into the page with
   soft fades and a static Lotus of Life behind. */
'use strict';
R['/'] = () => `<main id="main" class="landing">
  <section class="landing-hero">
    <div class="landing-art" aria-hidden="true">
      <div class="landing-fol">${LIFE.flower('bg')}</div>
      <img class="landing-img" src="brand/chakra-light.jpg" srcset="brand/chakra-light-820.jpg 820w, brand/chakra-light.jpg 1408w" sizes="(max-width: 860px) 100vw, 70vw" alt="" fetchpriority="high" decoding="async" width="1408" height="768">
    </div>
    <div class="landing-copy">
      <h1 class="landing-title"><span class="lt-the">The</span> <span class="metal">DELTA</span> <span class="lt-method">Method</span></h1>
      <ol class="method-steps" aria-label="The six steps of the DELTA Method">${PILLARS.map((p, i) => `<li style="--i:${i}"><a href="#/pillars/${p.id}"><span class="ms-n">${p.n}</span>${p.name[0] + p.name.slice(1).toLowerCase()}</a></li>`).join('')}</ol>
      <div class="landing-cta"><a href="#/join" class="btn lg">Join the DELTA Experience</a><a href="#/explore" class="btn ghost lg">Explore DELTA →</a></div>
    </div>
  </section>
</main>`;
