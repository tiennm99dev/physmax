/**
 * Harmonic oscillation x = A cos(ωt + φ) and the way the book writes it:
 * position, velocity and acceleration at a time, phases written as fractions
 * of π, the equation as TeX and the name of a phase difference.
 */
import { gcd } from '#lib/numtheory-engine/index.js';
import { formatNumber, numTex, tidy } from '#lib/core/number-format.js';

export const TAU = 2 * Math.PI;

/** Denominators tried when a value is written as a fraction of π. */
const PI_DENOMINATORS = [1, 2, 3, 4, 6, 12];

/**
 * The state of the oscillator at time t.
 * @param {number} A amplitude @param {number} omega rad/s @param {number} phi rad
 * @param {number} t seconds
 * @returns {{ phase: number, x: number, v: number, a: number }}
 */
export function stateAt(A, omega, phi, t) {
  const phase = omega * t + phi;
  const x = A * Math.cos(phase);
  return { phase, x, v: -omega * A * Math.sin(phase), a: -omega * omega * x };
}

/**
 * A phase brought into (−π, π].
 * @param {number} phi
 */
export function wrapPhase(phi) {
  let p = phi % TAU;
  if (p <= -Math.PI) p += TAU;
  if (p > Math.PI) p -= TAU;
  return tidy(p, 12);
}

/**
 * The value as a fraction p/q of π in lowest terms, or null when it is not
 * one with a small denominator.
 * @param {number} value
 * @returns {{ p: number, q: number } | null}
 */
export function piFraction(value) {
  for (const q of PI_DENOMINATORS) {
    const p = Math.round((value * q) / Math.PI);
    if (Math.abs((p * Math.PI) / q - value) < 1e-9) {
      if (p === 0) return { p: 0, q: 1 };
      const g = gcd(Math.abs(p), q);
      return { p: p / g, q: q / g };
    }
  }
  return null;
}

/**
 * A multiple of π as TeX ('\frac{2\pi}{3}', '-\frac{\pi}{2}', '4\pi', '0'),
 * other values as a decimal.
 * @param {number} value
 */
export function piTex(value) {
  const f = piFraction(value);
  if (!f) return numTex(value, 2);
  if (f.p === 0) return '0';
  const sign = f.p < 0 ? '-' : '';
  const n = Math.abs(f.p);
  const top = n === 1 ? '\\pi' : `${n}\\pi`;
  return f.q === 1 ? `${sign}${top}` : `${sign}\\frac{${top}}{${f.q}}`;
}

/**
 * A multiple of π as plain text ('2π/3', '−π/2', '4π', '0'), other values as
 * a decimal with a comma.
 * @param {number} value
 */
export function piText(value) {
  const f = piFraction(value);
  if (!f) return formatNumber(value, 2);
  if (f.p === 0) return '0';
  const sign = f.p < 0 ? '−' : '';
  const n = Math.abs(f.p);
  const top = n === 1 ? 'π' : `${n}π`;
  return f.q === 1 ? `${sign}${top}` : `${sign}${top}/${f.q}`;
}

/**
 * The equation x = A cos(ωt + φ) as TeX, the way the book writes it:
 * 'x = 5\cos\left(2\pi t - \frac{\pi}{3}\right)'.
 * @param {number} A @param {number} omega @param {number} phi
 * @param {string} [name] the quantity on the left
 */
export function equationTex(A, omega, phi, name = 'x') {
  const w = piTex(omega);
  const wt = w === '1' ? 't' : w.endsWith('\\pi') ? `${w} t` : `${w}t`;
  const p = wrapPhase(phi);
  let inside = wt;
  if (p !== 0) {
    const tex = piTex(p);
    inside = tex.startsWith('-') ? `${wt} - ${tex.slice(1)}` : `${wt} + ${tex}`;
  }
  return `${name} = ${numTex(A, 2)}\\cos\\left(${inside}\\right)`;
}

/**
 * How oscillation 1 stands to oscillation 2 when Δφ = φ1 − φ2.
 * @param {number} dphi
 * @returns {{ dphi: number, name: 'cùng pha' | 'ngược pha' | 'vuông pha' | 'lệch pha', lead: 1 | 2 | null }}
 *   `lead` is the one that is ahead (sớm pha), null when neither is.
 */
export function phaseRelation(dphi) {
  const d = wrapPhase(dphi);
  if (Math.abs(d) < 1e-9) return { dphi: 0, name: 'cùng pha', lead: null };
  if (Math.abs(Math.abs(d) - Math.PI) < 1e-9) return { dphi: d, name: 'ngược pha', lead: null };
  const name = Math.abs(Math.abs(d) - Math.PI / 2) < 1e-9 ? 'vuông pha' : 'lệch pha';
  return { dphi: d, name, lead: d > 0 ? 1 : 2 };
}

/**
 * The time lag matching a phase difference: Δt = |Δφ| T / (2π).
 * @param {number} dphi @param {number} T
 */
export const lagOf = (dphi, T) => (Math.abs(wrapPhase(dphi)) * T) / TAU;

/**
 * Speed at position x: |v| = ω √(A² − x²).
 * @param {number} A @param {number} omega @param {number} x
 */
export function speedAt(A, omega, x) {
  return omega * Math.sqrt(Math.max(0, A * A - x * x));
}

/**
 * Points of a curve y = f(t) for an SVG path, from t0 to t1.
 * @param {(t: number) => number} f
 * @param {number} t0 @param {number} t1
 * @param {number} [n] number of pieces
 * @returns {Array<{ t: number, y: number }>}
 */
export function sample(f, t0, t1, n = 160) {
  const out = [];
  for (let i = 0; i <= n; i += 1) {
    const t = t0 + ((t1 - t0) * i) / n;
    out.push({ t, y: f(t) });
  }
  return out;
}
