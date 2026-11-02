/**
 * A body falling from rest in a tube, with air drag that grows with the square
 * of the speed. Each body has a terminal speed in air; with no air the terminal
 * speed is infinite and the fall is the free fall of the lesson.
 */
import { numTex, tidy } from '#lib/core/number-format.js';

export const G = 9.8;
export const TUBE = 1; // m

/**
 * @typedef {{ id: string, name: string, shape: 'ball' | 'feather' | 'sheet' | 'crumple', terminal: number }} Body
 * @typedef {{ id: string, label: string, bodies: [Body, Body], lesson: string }} BodyPair
 */

/** @type {BodyPair[]} */
export const PAIRS = [
  {
    id: 'long-bi',
    label: 'Lông chim và hòn bi',
    bodies: [
      { id: 'bi', name: 'Hòn bi', shape: 'ball', terminal: 40 },
      { id: 'long', name: 'Lông chim', shape: 'feather', terminal: 0.6 },
    ],
    lesson:
      'Trong không khí, lực cản đáng kể so với trọng lượng của lông chim, nhưng rất nhỏ so với trọng lượng của hòn bi.',
  },
  {
    id: 'giay',
    label: 'Hai tờ giấy giống nhau',
    bodies: [
      { id: 'vo', name: 'Giấy vo tròn', shape: 'crumple', terminal: 6 },
      { id: 'phang', name: 'Giấy để phẳng', shape: 'sheet', terminal: 1 },
    ],
    lesson:
      'Hai tờ giấy nặng bằng nhau mà vẫn rơi khác nhau: nguyên nhân là lực cản của không khí, không phải khối lượng.',
  },
];

/**
 * Speed after falling for `t` seconds. `terminal` Infinity means no air.
 * @param {number} t @param {number} terminal
 */
export function fallSpeed(t, terminal) {
  if (!Number.isFinite(terminal)) return G * t;
  return terminal * Math.tanh((G * t) / terminal);
}

/**
 * Distance fallen after `t` seconds. Written with exponentials so that a long
 * fall at a small terminal speed does not overflow cosh.
 * @param {number} t @param {number} terminal
 */
export function fallDistance(t, terminal) {
  if (!Number.isFinite(terminal)) return (G * t * t) / 2;
  const u = (G * t) / terminal;
  const logCosh = u + Math.log1p(Math.exp(-2 * u)) - Math.LN2;
  return ((terminal * terminal) / G) * logCosh;
}

/**
 * Time to fall a given height: the inverse of `fallDistance`.
 * @param {number} height @param {number} terminal
 */
export function fallTime(height, terminal) {
  if (!Number.isFinite(terminal)) return Math.sqrt((2 * height) / G);
  const y = (height * G) / (terminal * terminal);
  // acosh(e^y) = y + ln(1 + √(1 − e^(−2y))), which stays finite for a large y.
  return (terminal / G) * (y + Math.log1p(Math.sqrt(1 - Math.exp(-2 * y))));
}

/**
 * Terminal speed of a body in the chosen medium.
 * @param {Body} body @param {boolean} air
 */
export function terminalIn(body, air) {
  return air ? body.terminal : Infinity;
}

/**
 * Stroboscope positions of a falling body, one every `every` seconds until it
 * reaches the bottom of the tube.
 * @param {number} terminal @param {number} every @param {number} [upTo] last time to include
 * @returns {number[]}
 */
export function flashes(terminal, every, upTo = Infinity) {
  const end = Math.min(upTo, fallTime(TUBE, terminal));
  /** @type {number[]} */
  const out = [];
  for (let i = 0; i * every <= end + 1e-9; i++)
    out.push(tidy(fallDistance(i * every, terminal), 4));
  return out;
}

/**
 * What the run shows, as rich text, once both bodies have landed.
 * @param {BodyPair} pair @param {boolean} air
 */
export function runNote(pair, air) {
  const [a, b] = pair.bodies;
  if (!air) {
    const t = numTex(fallTime(TUBE, Infinity), 2);
    return `Không còn lực cản: ${a.name.toLowerCase()} và ${b.name.toLowerCase()} rơi như nhau, cùng chạm đáy sau $t = \\sqrt{\\dfrac{2s}{g}} \\approx ${t}$ s. Khoảng cách giữa các vị trí chụp liên tiếp tăng đều: đó là chuyển động nhanh dần đều.`;
  }
  return `${pair.lesson} Hãy hút hết không khí rồi thả lại.`;
}
