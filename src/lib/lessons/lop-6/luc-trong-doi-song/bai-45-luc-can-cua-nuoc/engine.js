/**
 * Water resistance (lực cản của nước) for two virtual experiments. SI units:
 * newtons, kilograms, metres, seconds.
 *
 * The resistance of a fluid on a moving body is modelled as
 * F = ½ · ρ · C · A · v², with ρ the fluid's density, A the area facing the
 * motion (diện tích mặt cản), C a shape factor (small for a streamlined
 * body) and v the speed. Grade 6 only compares the results; it never
 * computes with the formula.
 */

/** @typedef {'nuoc' | 'khong-khi'} MediumId */
/** @typedef {'thuon' | 'cau' | 'hop' | 'tam'} ShapeId */
/** @typedef {{ id: ShapeId, name: string, shape: number, area: number }} Shape */

/** Density of each medium, in kg/m³. */
export const DENSITY = { nuoc: 1000, 'khong-khi': 1.2 };

export const G = 10;

/** @param {number} x */
const tidy = (x) => Math.round(x * 1e9) / 1e9;

/**
 * Resistance coefficient k in F = k · v².
 * @param {number} density @param {number} shape @param {number} area
 */
export function dragFactor(density, shape, area) {
  return 0.5 * density * shape * area;
}

// ---------------------------------------------------------------------------
// Sinking race: four bodies of the same material, the same mass and the same
// volume (so the same weight and the same buoyancy), differing only in shape.

/** Mass of each body (kg) and its volume (m³), 10 cm³ of a 5 g/cm³ metal. */
export const BODY_MASS = 0.05;
export const BODY_VOLUME = 10e-6;
/** Depth of the tank the bodies fall through, in metres. */
export const DEPTH = 0.5;

/** @type {Shape[]} */
export const SHAPES = [
  { id: 'thuon', name: 'Hình thuôn', shape: 0.1, area: 3e-4 },
  { id: 'cau', name: 'Hình cầu', shape: 0.47, area: 5.6e-4 },
  { id: 'hop', name: 'Hình lập phương', shape: 1.05, area: 4.6e-4 },
  { id: 'tam', name: 'Tấm phẳng nằm ngang', shape: 1.2, area: 20e-4 },
];

/** @param {ShapeId} id */
export function shape(id) {
  return SHAPES.find((s) => s.id === id) ?? SHAPES[0];
}

/**
 * Downward pull left after buoyancy (N), the drag factor, the starting
 * acceleration and the steady sinking speed of one body in one medium.
 * @param {ShapeId} id @param {MediumId} medium
 */
export function fall(id, medium) {
  const rho = DENSITY[medium];
  const s = shape(id);
  const net = (BODY_MASS - rho * BODY_VOLUME) * G;
  const k = dragFactor(rho, s.shape, s.area);
  const a = net / BODY_MASS;
  return { net, k, a, vt: Math.sqrt(net / k) };
}

/** ln(cosh x) without overflow, for x ≥ 0. */
/** @param {number} x */
function lnCosh(x) {
  return x + Math.log1p(Math.exp(-2 * x)) - Math.LN2;
}

/**
 * Depth reached (m, capped at the bottom) and speed (m/s) after t seconds,
 * starting from rest: v = vt·tanh(at/vt), y = (vt²/a)·ln cosh(at/vt).
 * @param {{ a: number, vt: number }} f @param {number} t
 */
export function stateAt(f, t) {
  const x = (f.a * Math.max(0, t)) / f.vt;
  const y = ((f.vt * f.vt) / f.a) * lnCosh(x);
  // Rounding can leave y a hair short of the bottom at the arrival time.
  if (y >= DEPTH - 1e-7) return { y: DEPTH, v: 0, done: true };
  return { y, v: f.vt * Math.tanh(x), done: false };
}

/**
 * Time to fall the whole depth, in seconds.
 * @param {{ a: number, vt: number }} f
 */
export function timeToBottom(f) {
  const u = (DEPTH * f.a) / (f.vt * f.vt);
  // acosh(e^u), written to stay finite for large u.
  const acoshExp = u + Math.log1p(Math.sqrt(1 - Math.exp(-2 * u)));
  return (f.vt / f.a) * acoshExp;
}

/** Results closer than this (s) count as a tie. */
export const TIE = 0.01;

/**
 * Bodies ordered from first to last to reach the bottom, with their times.
 * @param {MediumId} medium
 */
export function ranking(medium) {
  return SHAPES.map((s) => ({
    id: s.id,
    name: s.name,
    time: timeToBottom(fall(s.id, medium)),
  })).sort((p, q) => p.time - q.time);
}

/**
 * The winner of the race: a shape id, or 'cung-luc' when the first and the
 * last arrive within TIE of each other.
 * @param {MediumId} medium
 * @returns {ShapeId | 'cung-luc'}
 */
export function winner(medium) {
  const r = ranking(medium);
  return r[r.length - 1].time - r[0].time < TIE ? 'cung-luc' : r[0].id;
}

/**
 * Resistance on a body moving at speed v in a medium, in newtons.
 * @param {ShapeId} id @param {MediumId} medium @param {number} v
 */
export function dragAt(id, medium, v) {
  const s = shape(id);
  return tidy(dragFactor(DENSITY[medium], s.shape, s.area) * v * v);
}

// ---------------------------------------------------------------------------
// Trolley in a box (the book's experiment): a trolley on a rail carries a
// plate that dips into the box; a string over a pulley leads to a spring
// balance pulled at a steady speed. The balance reads rolling friction plus
// the resistance on the plate.

/** @typedef {'nho' | 'lon' | 'thuon'} PlateId */
/** @typedef {{ id: PlateId, name: string, cm2: number, shape: number }} Plate */

/** Rolling friction of the trolley on its rail, in newtons. */
export const ROLLING = 0.2;
/** Speeds the hand can keep steady, in m/s. */
export const SPEED_MIN = 0.1;
export const SPEED_MAX = 0.5;
export const SPEED_STEP = 0.1;
/** Largest reading of the spring balance (N). */
export const BALANCE_MAX = 5;

/** @type {Plate[]} */
export const PLATES = [
  { id: 'nho', name: 'Tấm cản nhỏ', cm2: 50, shape: 1.2 },
  { id: 'lon', name: 'Tấm cản lớn', cm2: 100, shape: 1.2 },
  { id: 'thuon', name: 'Tấm cản lớn có mũi thuôn', cm2: 100, shape: 0.4 },
];

/** @param {PlateId} id */
export function plate(id) {
  return PLATES.find((p) => p.id === id) ?? PLATES[0];
}

/**
 * Resistance on the plate and the spring balance reading, both rounded to
 * 0,01 N as the balance shows them.
 * @param {PlateId} id @param {boolean} water @param {number} v
 */
export function reading(id, water, v) {
  const p = plate(id);
  const rho = water ? DENSITY.nuoc : DENSITY['khong-khi'];
  const drag = dragFactor(rho, p.shape, p.cm2 / 1e4) * v * v;
  const r2 = (/** @type {number} */ x) => Math.round(tidy(x) * 100) / 100;
  return { drag: r2(drag), balance: r2(ROLLING + drag) };
}
