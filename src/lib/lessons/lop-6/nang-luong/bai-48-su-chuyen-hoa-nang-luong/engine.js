/**
 * A pendulum swinging, and an electric fan, for energy conversion.
 *
 * Pendulum: a bob of mass `m` (kg) on a string of length `L` (m), angle
 * `theta` from the vertical (radians), angular speed `omega` (rad/s). Taking
 * the lowest point as the zero level, its potential energy is
 * m·g·L·(1 − cos θ) and its kinetic energy ½·m·(L·ω)². With air resistance, a
 * drag term slowly turns mechanical energy into heat; the heat is whatever the
 * bob has lost, so the total always equals the starting energy. Uses g = 10
 * m/s², as the grade 6 book does with P = 10·m.
 *
 * Fan: each second the fan takes in electrical energy and gives it out as the
 * kinetic energy of the blades and the wind, heat and sound. The split is a
 * rounded, illustrative one.
 */

export const G = 10;
export const PENDULUM = { m: 0.5, L: 1 };

/** @typedef {{ theta: number, omega: number }} Swing */

/** @param {number} deg */
export const rad = (deg) => (deg * Math.PI) / 180;

/**
 * @param {Swing} s
 * @param {{ m: number, L: number }} [p]
 */
export function energies(s, p = PENDULUM) {
  const potential = p.m * G * p.L * (1 - Math.cos(s.theta));
  const v = p.L * s.omega;
  const kinetic = 0.5 * p.m * v * v;
  return { kinetic, potential, mechanical: kinetic + potential };
}

/**
 * The starting energy for a release from rest at `deg` degrees.
 * @param {number} deg @param {{ m: number, L: number }} [p]
 */
export function startEnergy(deg, p = PENDULUM) {
  return energies({ theta: rad(deg), omega: 0 }, p).mechanical;
}

/**
 * @param {Swing} s @param {number} drag per second @param {{ m: number, L: number }} p
 * @returns {Swing}
 */
function rate(s, drag, p) {
  return { theta: s.omega, omega: -(G / p.L) * Math.sin(s.theta) - drag * s.omega };
}

/**
 * Advance the swing by `dt` seconds (RK4 in small sub-steps).
 * @param {Swing} s @param {number} dt @param {number} drag 0 for no air resistance
 * @param {{ m: number, L: number }} [p]
 * @returns {Swing}
 */
export function swing(s, dt, drag, p = PENDULUM) {
  const n = Math.max(1, Math.ceil(dt / 0.002));
  const h = dt / n;
  let cur = s;
  for (let i = 0; i < n; i++) {
    const k1 = rate(cur, drag, p);
    const k2 = rate(
      { theta: cur.theta + (h / 2) * k1.theta, omega: cur.omega + (h / 2) * k1.omega },
      drag,
      p,
    );
    const k3 = rate(
      { theta: cur.theta + (h / 2) * k2.theta, omega: cur.omega + (h / 2) * k2.omega },
      drag,
      p,
    );
    const k4 = rate({ theta: cur.theta + h * k3.theta, omega: cur.omega + h * k3.omega }, drag, p);
    cur = {
      theta: cur.theta + (h / 6) * (k1.theta + 2 * k2.theta + 2 * k3.theta + k4.theta),
      omega: cur.omega + (h / 6) * (k1.omega + 2 * k2.omega + 2 * k3.omega + k4.omega),
    };
  }
  return cur;
}

/**
 * The energy split at one moment: kinetic, potential and the heat produced so
 * far, which together make up the starting energy `total`.
 * @param {Swing} s @param {number} total @param {{ m: number, L: number }} [p]
 */
export function budget(s, total, p = PENDULUM) {
  const e = energies(s, p);
  const heat = Math.max(0, total - e.mechanical);
  return { kinetic: e.kinetic, potential: e.potential, heat, total };
}

/** Electrical energy taken in each second at each fan speed, in joules. */
export const FAN_INPUT = { 1: 30, 2: 40, 3: 50 };

/**
 * Where a fan's electrical energy goes in one second: 70 % into the kinetic
 * energy of blades and wind, 26 % heat, 4 % sound (illustrative figures).
 * @param {1 | 2 | 3} level
 */
export function fanSplit(level) {
  const input = FAN_INPUT[level];
  const kinetic = Math.round(input * 0.7 * 10) / 10;
  const sound = Math.round(input * 0.04 * 10) / 10;
  const heat = Math.round((input - kinetic - sound) * 10) / 10;
  return { input, kinetic, heat, sound };
}
