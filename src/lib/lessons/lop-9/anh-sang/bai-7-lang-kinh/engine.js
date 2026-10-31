/**
 * A triangular glass prism in SVG coordinates (y down): tracing a ray
 * through it with refraction at each face (and total internal reflection
 * when it happens), the dispersion of white light into the seven colours,
 * and the colour an object shows under coloured light.
 */

const RAD = Math.PI / 180;

/**
 * The seven colours of the spectrum with the index of the prism glass for
 * each. The spread of indices is exaggerated (real glass spans about 0,02) so
 * the colours separate visibly on a small screen.
 */
export const SPECTRUM = /** @type {const} */ ([
  { id: 'do', name: 'đỏ', color: '#ef4444', n: 1.5 },
  { id: 'da-cam', name: 'da cam', color: '#f97316', n: 1.51 },
  { id: 'vang', name: 'vàng', color: '#facc15', n: 1.52 },
  { id: 'luc', name: 'lục', color: '#22c55e', n: 1.53 },
  { id: 'lam', name: 'lam', color: '#3b82f6', n: 1.54 },
  { id: 'cham', name: 'chàm', color: '#4f46e5', n: 1.55 },
  { id: 'tim', name: 'tím', color: '#a855f7', n: 1.56 },
]);

/** @typedef {{ x: number, y: number }} Pt */

/**
 * Corners of an equilateral prism with its refracting edge (cạnh) on top
 * when `rotation` is 0, turned clockwise by `rotation` degrees about its
 * centre. Order: top edge, bottom right, bottom left.
 * @param {Pt} c centre @param {number} side @param {number} rotation degrees
 * @returns {Pt[]}
 */
export function prismCorners(c, side, rotation) {
  const R = side / Math.sqrt(3);
  return [-90, 30, 150].map((a) => ({
    x: c.x + R * Math.cos((a + rotation) * RAD),
    y: c.y + R * Math.sin((a + rotation) * RAD),
  }));
}

/**
 * New direction after meeting a surface with unit normal `nrm` (either side).
 * @param {Pt} d unit direction @param {Pt} nrm unit normal
 * @param {number} n1 index the ray comes from @param {number} n2 index it goes into
 * @returns {{ dir: Pt, total: boolean }}
 */
export function bend(d, nrm, n1, n2) {
  let nx = nrm.x;
  let ny = nrm.y;
  let cosi = -(d.x * nx + d.y * ny);
  if (cosi < 0) {
    nx = -nx;
    ny = -ny;
    cosi = -cosi;
  }
  const eta = n1 / n2;
  const k = 1 - eta * eta * (1 - cosi * cosi);
  if (k < 0) {
    return { dir: { x: d.x + 2 * cosi * nx, y: d.y + 2 * cosi * ny }, total: true };
  }
  const t = eta * cosi - Math.sqrt(k);
  return { dir: { x: eta * d.x + t * nx, y: eta * d.y + t * ny }, total: false };
}

/**
 * First crossing of a ray with the polygon's edges, skipping `skip`.
 * @param {Pt[]} poly @param {Pt} o @param {Pt} d @param {number} skip
 * @returns {{ t: number, edge: number, p: Pt } | null}
 */
function firstHit(poly, o, d, skip) {
  /** @type {{ t: number, edge: number, p: Pt } | null} */
  let best = null;
  for (let e = 0; e < poly.length; e++) {
    if (e === skip) continue;
    const a = poly[e];
    const b = poly[(e + 1) % poly.length];
    const ex = b.x - a.x;
    const ey = b.y - a.y;
    const den = d.x * ey - d.y * ex;
    if (Math.abs(den) < 1e-12) continue;
    const t = ((a.x - o.x) * ey - (a.y - o.y) * ex) / den;
    const s = ((a.x - o.x) * d.y - (a.y - o.y) * d.x) / den;
    if (t > 1e-9 && s >= 0 && s <= 1 && (!best || t < best.t)) {
      best = { t, edge: e, p: { x: o.x + t * d.x, y: o.y + t * d.y } };
    }
  }
  return best;
}

/** @param {Pt[]} poly @param {number} e */
function edgeNormal(poly, e) {
  const a = poly[e];
  const b = poly[(e + 1) % poly.length];
  const len = Math.hypot(b.x - a.x, b.y - a.y);
  return { x: -(b.y - a.y) / len, y: (b.x - a.x) / len };
}

/**
 * Trace a ray from outside through a prism of index n, then on to the
 * vertical screen at x = `screenX`.
 * @param {Pt[]} poly @param {Pt} origin @param {Pt} dir unit direction
 * @param {number} n @param {number} screenX
 * @returns {{ points: Pt[], entry: number, exit: number, out: Pt | null, deviation: number | null, screenY: number | null }}
 */
export function traceThrough(poly, origin, dir, n, screenX) {
  const points = [origin];
  const first = firstHit(poly, origin, dir, -1);
  if (!first) {
    const t = (screenX - origin.x) / dir.x;
    points.push({ x: screenX, y: origin.y + t * dir.y });
    return { points, entry: -1, exit: -1, out: dir, deviation: 0, screenY: points[1].y };
  }
  points.push(first.p);
  let d = bend(dir, edgeNormal(poly, first.edge), 1, n).dir;
  let at = first;
  for (let k = 0; k < 5; k++) {
    const hit = firstHit(poly, at.p, d, at.edge);
    if (!hit) break;
    points.push(hit.p);
    const b = bend(d, edgeNormal(poly, hit.edge), n, 1);
    if (b.total) {
      d = b.dir;
      at = hit;
      continue;
    }
    const out = b.dir;
    const deviation = Math.acos(Math.max(-1, Math.min(1, out.x * dir.x + out.y * dir.y))) / RAD;
    let screenY = null;
    if (out.x > 1e-9) {
      const t = (screenX - hit.p.x) / out.x;
      screenY = hit.p.y + t * out.y;
      points.push({ x: screenX, y: screenY });
    } else {
      points.push({ x: hit.p.x + out.x * 400, y: hit.p.y + out.y * 400 });
    }
    return { points, entry: first.edge, exit: hit.edge, out, deviation, screenY };
  }
  return { points, entry: first.edge, exit: -1, out: null, deviation: null, screenY: null };
}

/** Coloured lights and objects of the colour-of-objects widget. */
export const LIGHTS = /** @type {const} */ ({
  trang: { name: 'trắng', parts: ['do', 'luc', 'lam'] },
  do: { name: 'đỏ', parts: ['do'] },
  luc: { name: 'lục', parts: ['luc'] },
  lam: { name: 'lam', parts: ['lam'] },
});

/** @typedef {keyof typeof LIGHTS} LightId */

/**
 * The colour an object looks under a light: it sends back only the light
 * colours it scatters well, and looks black when none of them is present.
 * `scatters` lists the colours the object sends back under white light.
 * @param {readonly string[]} scatters @param {readonly string[]} light
 * @returns {'trang' | 'do' | 'luc' | 'lam' | 'den'}
 */
export function seenColour(scatters, light) {
  const back = light.filter((c) => scatters.includes(c));
  if (back.length === 0) return 'den';
  if (back.length >= 3) return 'trang';
  return /** @type {'do' | 'luc' | 'lam'} */ (back[0]);
}
