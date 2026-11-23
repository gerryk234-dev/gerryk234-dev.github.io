/* DELTA · the landing page — only the title and the call to action, with a figure of light:
   white light pours down from above, enters at the crown, travels through the body to the feet,
   and lights the seven chakras one by one (crown → root). Drawn in SVG; a handful of CSS animations, no images. */
'use strict';
const CHAKRAS = [
  ['Crown', 74, '#b07cff'], ['Third eye', 112, '#6f6bff'], ['Throat', 176, '#3fb2ff'], ['Heart', 262, '#41e08f'],
  ['Solar plexus', 334, '#ffd34a'], ['Sacral', 410, '#ff9a3c'], ['Root', 486, '#ff4d4d'],
];

/* a smooth closed outline through the points (Catmull–Rom → cubic Bézier) */
function smoothPath(pts) {
  const n = pts.length, P = i => pts[(i + n) % n], f = v => Math.round(v * 10) / 10;
  let d = `M${pts[0][0]} ${pts[0][1]}`;
  for (let i = 0; i < n; i++) {
    const [p0, p1, p2, p3] = [P(i - 1), P(i), P(i + 1), P(i + 2)];
    d += `C${f(p1[0] + (p2[0] - p0[0]) / 6)} ${f(p1[1] + (p2[1] - p0[1]) / 6)} ${f(p2[0] - (p3[0] - p1[0]) / 6)} ${f(p2[1] - (p3[1] - p1[1]) / 6)} ${p2[0]} ${p2[1]}`;
  }
  return d + 'Z';
}
function lightFigure() {
  const left = [[187, 160], [185, 184], [160, 196], [136, 208], [122, 228], [114, 278], [106, 340], [98, 400], [90, 460], [84, 510], [78, 540], [84, 566], [97, 560], [101, 530], [109, 470], [121, 400], [131, 330], [143, 270],
    [147, 330], [151, 390], [147, 450], [145, 500], [151, 580], [157, 660], [159, 740], [165, 820], [158, 858], [172, 876], [193, 872], [190, 820], [188, 740], [190, 660], [194, 580], [200, 532]];
  const right = left.slice(0, -1).reverse().map(([x, y]) => [400 - x, y]);
  const body = smoothPath([...left, ...right]);
  const head = 'M200 66C224 66 238 88 238 114C238 142 222 160 200 160C178 160 162 142 162 114C162 88 176 66 200 66Z';
  const travel = (d, k) => `<path class="lf-path" d="${d}" pathLength="1" style="--k:${k}"/>`;
  return `<svg class="light-figure" viewBox="0 -40 400 960" role="img" aria-label="A person filled with white light from above, the light travelling from the crown to the feet and lighting the seven chakras">
    <defs>
      <linearGradient id="lfBeam" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".35" stop-color="#fff" stop-opacity=".55"/><stop offset="1" stop-color="#fffbe8" stop-opacity=".95"/></linearGradient>
      <linearGradient id="lfBody" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1b2550"/><stop offset=".55" stop-color="#101833"/><stop offset="1" stop-color="#0a0f22"/></linearGradient>
      <linearGradient id="lfFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff" stop-opacity=".7"/><stop offset=".45" stop-color="#fff0c8" stop-opacity=".32"/><stop offset="1" stop-color="#ffd98a" stop-opacity=".2"/></linearGradient>
      <linearGradient id="lfCore" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".5" stop-color="#fffdf2" stop-opacity=".75"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
      <radialGradient id="lfAura" cx=".5" cy=".42" r=".5"><stop offset="0" stop-color="#fff6dc" stop-opacity=".55"/><stop offset=".45" stop-color="#f5bf45" stop-opacity=".18"/><stop offset="1" stop-color="#f5bf45" stop-opacity="0"/></radialGradient>
      ${CHAKRAS.map(([, , c], i) => `<radialGradient id="ck${i}"><stop offset="0" stop-color="#fff"/><stop offset=".25" stop-color="${c}"/><stop offset="1" stop-color="${c}" stop-opacity="0"/></radialGradient>`).join('')}
      <clipPath id="lfClip"><path d="${body}"/><path d="${head}"/><rect x="186" y="150" width="28" height="40"/></clipPath>
    </defs>
    <ellipse class="lf-aura" cx="200" cy="420" rx="210" ry="470" fill="url(#lfAura)"/>
    <polygon class="lf-beam wide" points="110,-40 290,-40 228,70 172,70" fill="url(#lfBeam)"/>
    <polygon class="lf-beam" points="168,-40 232,-40 212,72 188,72" fill="url(#lfBeam)"/>
    <g class="lf-body"><path d="${body}" fill="url(#lfBody)"/><path d="${head}" fill="url(#lfBody)"/><rect x="186" y="150" width="28" height="40" fill="#141d40"/></g>
    <g clip-path="url(#lfClip)"><rect class="lf-fill" x="0" y="60" width="400" height="830" fill="url(#lfFill)"/><rect class="lf-fill" x="150" y="60" width="100" height="830" fill="url(#lfCore)"/></g>
    <g class="lf-rim" fill="none"><path d="${body}"/><path d="${head}"/></g>
    <g class="lf-channel" fill="none">${travel('M200 64L200 532', 0)}${travel('M200 532C194 620 186 740 178 860', 1)}${travel('M200 532C206 620 214 740 222 860', 1)}</g>
    ${CHAKRAS.map(([name, y], i) => `<g class="ck" style="--i:${i};--t:${(0.6 + (y - 60) / 830 * 3.6).toFixed(2)}s"><circle cx="200" cy="${y}" r="30" fill="url(#ck${i})" class="ck-halo"/><circle cx="200" cy="${y}" r="7" fill="${CHAKRAS[i][2]}" class="ck-core"/><title>${name}</title></g>`).join('')}
    <ellipse class="lf-ground" cx="200" cy="880" rx="120" ry="12" fill="url(#lfAura)"/>
  </svg>`;
}

R['/'] = () => `<main id="main" class="landing">
  <section class="landing-hero">
    <div class="landing-figure" aria-hidden="false">${lightFigure()}</div>
    <div class="landing-copy">
      <h1 class="landing-title"><span class="lt-the">The</span> <span class="metal">DELTA</span> <span class="lt-method">Method</span></h1>
      <ol class="chakra-row" aria-label="The seven chakras, lit from crown to root">${CHAKRAS.map(([n, y, c], i) => `<li style="--ck:${c};--i:${i};--t:${(0.6 + (y - 60) / 830 * 3.6).toFixed(2)}s"><span aria-hidden="true"></span>${n}</li>`).join('')}</ol>
      <div class="landing-cta"><a href="#/join" class="btn lg">Join the DELTA Experience</a><a href="#/explore" class="btn ghost lg">Explore DELTA →</a></div>
    </div>
  </section>
</main>`;
