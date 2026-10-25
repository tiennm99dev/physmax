/**
 * Geometric optics: Snell refraction and thin lenses. Lens formula in the KNTT
 * form 1/f = 1/d + 1/d′, with f > 0 for a converging lens and f < 0 for a
 * diverging one; d′ > 0 is a real image behind the lens, d′ < 0 a virtual one
 * on the object's side. Bench coordinates: the lens at x = 0, the object at
 * x = −d, heights up.
 */
import { clean } from './vector.js';

const RAD = Math.PI / 180;

/**
 * Refraction angle from n1·sin i = n2·sin r, or null when the ray is totally
 * internally reflected.
 * @param {number} n1 @param {number} n2 @param {number} incidence degrees from the normal
 * @returns {number | null}
 */
export function refractionAngle(n1, n2, incidence) {
  const s = (n1 / n2) * Math.sin(incidence * RAD);
  if (Math.abs(s) > 1 + 1e-12) return null;
  return clean(Math.asin(Math.max(-1, Math.min(1, s))) / RAD);
}

/**
 * Critical angle for total internal reflection going from n1 into n2 < n1,
 * or null when there is none.
 * @param {number} n1 @param {number} n2
 */
export function criticalAngle(n1, n2) {
  if (!(n1 > n2)) return null;
  return clean(Math.asin(n2 / n1) / RAD);
}

/**
 * Image of an object at distance d > 0 in front of a thin lens of focal length f.
 * @param {number} f @param {number} d
 * @returns {{ distance: number, magnification: number, real: boolean, upright: boolean, atInfinity: boolean }}
 */
export function thinLensImage(f, d) {
  if (Math.abs(d - f) < 1e-12) {
    return {
      distance: Infinity,
      magnification: Infinity,
      real: false,
      upright: false,
      atInfinity: true,
    };
  }
  const distance = clean((d * f) / (d - f));
  const magnification = clean(-distance / d);
  return {
    distance,
    magnification,
    real: distance > 0,
    upright: magnification > 0,
    atInfinity: false,
  };
}

/**
 * The image in words: thật/ảo, cùng chiều/ngược chiều, lớn hơn/nhỏ hơn/bằng vật.
 * @param {ReturnType<typeof thinLensImage>} image
 */
export function describeImage(image) {
  if (image.atInfinity) return 'Ảnh ở vô cực (chùm tia ló song song)';
  const kind = image.real ? 'Ảnh thật' : 'Ảnh ảo';
  const way = image.upright ? 'cùng chiều' : 'ngược chiều';
  const k = Math.abs(image.magnification);
  const size = Math.abs(k - 1) < 1e-9 ? 'bằng vật' : k > 1 ? 'lớn hơn vật' : 'nhỏ hơn vật';
  return `${kind}, ${way}, ${size}`;
}

/** @typedef {{ x: number, y: number }} Pt */
/** @typedef {{ name: string, incident: Pt[], emergent: Pt[], virtual: Pt[] }} Ray */

/**
 * The three principal rays from the tip of an object of height h at distance d:
 * through the optical centre, parallel to the axis, and toward the front focus.
 * Each ray is drawn up to `xMax` behind the lens; `virtual` is the backward
 * extension of the emergent ray that a virtual image sits on.
 * @param {number} f @param {number} d @param {number} h
 * @param {number} xMax how far behind the lens to draw
 * @returns {Ray[]}
 */
export function principalRays(f, d, h, xMax) {
  const tip = { x: -d, y: h };
  /** @param {Pt} at point on the lens plane @param {number} slope emergent slope dy/dx */
  const out = (at, slope) => ({ x: xMax, y: clean(at.y + slope * xMax) });
  const xBack = -Math.max(d, Math.abs(f)) * 2;
  /** @param {Pt} at @param {number} slope */
  const back = (at, slope) => [at, { x: xBack, y: clean(at.y + slope * xBack) }];

  // 1. Through the optical centre: undeviated.
  const s1 = -h / d;
  // 2. Parallel to the axis: leaves through (or as if from) the back focus F′ at x = f.
  const s2 = -h / f;
  /** @type {Ray[]} */
  const rays = [
    {
      name: 'qua quang tâm',
      incident: [tip, { x: 0, y: 0 }],
      emergent: [{ x: 0, y: 0 }, out({ x: 0, y: 0 }, s1)],
      virtual: [],
    },
    {
      name: 'song song với trục chính',
      incident: [tip, { x: 0, y: h }],
      emergent: [{ x: 0, y: h }, out({ x: 0, y: h }, s2)],
      virtual: [],
    },
  ];
  // 3. Aimed at the front focus F at x = −f: leaves parallel to the axis.
  if (Math.abs(d - f) > 1e-9) {
    const hitY = clean(h * (f / (f - d)));
    rays.push({
      name: 'hướng tới tiêu điểm vật',
      incident: [tip, { x: 0, y: hitY }],
      emergent: [
        { x: 0, y: hitY },
        { x: xMax, y: hitY },
      ],
      virtual: [],
    });
  }
  const image = thinLensImage(f, d);
  if (!image.atInfinity && !image.real) {
    rays[0].virtual = back({ x: 0, y: 0 }, s1);
    rays[1].virtual = back({ x: 0, y: h }, s2);
    if (rays[2]) rays[2].virtual = back(rays[2].emergent[0], 0);
  }
  return rays;
}
