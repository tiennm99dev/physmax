import { tidy } from '#lib/core/number-format.js';

/**
 * Round axis marks from 0 up to `max`, at most five steps, for a small graph.
 * @param {number} max
 * @returns {number[]}
 */
export function ticksUpTo(max) {
  const size = 10 ** Math.floor(Math.log10(max / 5));
  const step = [1, 2, 5, 10].map((k) => k * size).find((s) => max / s <= 5) ?? 10 * size;
  const ticks = [];
  for (let i = 0; i * step <= max + 1e-9; i += 1) ticks.push(tidy(i * step));
  return ticks;
}
