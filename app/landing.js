/* DELTA · the landing page — the meditation image (full body, white light from above lighting the seven chakras)
   with the Lotus of Life behind it; below it the title, the four steps of the DELTA Method and the call to action. */
'use strict';
const METHOD_STEPS = [
  ['Join the community', '#/centre', '♡'],
  ['Hair analysis', '#/analysis', '◎'],
  ['Learn', '#/pillars', '△'],
  ['Heal', '#/centre/methods', '✦'],
];
R['/'] = () => `<main id="main" class="landing">
  <section class="landing-hero">
    <div class="landing-art" aria-hidden="true">
      <div class="landing-fol">${LIFE.flower('bg')}</div>
      <img class="landing-img" src="brand/chakra-light.jpg" srcset="brand/chakra-light-820.jpg 820w, brand/chakra-light.jpg 1408w" sizes="(max-width: 860px) 100vw, 1100px" alt="" fetchpriority="high" decoding="async" width="1408" height="768">
    </div>
    <div class="landing-copy">
      <h1 class="landing-title"><span class="lt-the">The</span> <span class="metal">DELTA</span> <span class="lt-method">Method</span></h1>
      <ol class="method-steps" aria-label="The DELTA Method in four steps">${METHOD_STEPS.map(([t, to, ico], i) => `<li style="--i:${i}"><a href="${to}"><span class="ms-n" aria-hidden="true">${ico}</span><span class="ms-k">Step ${i + 1}</span><b>${t}</b></a></li>`).join('')}</ol>
      <div class="landing-cta"><a href="#/join" class="btn lg">Join the DELTA Experience</a><a href="#/explore" class="btn ghost lg">Explore DELTA →</a></div>
    </div>
  </section>
</main>`;
