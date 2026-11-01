import { describe, expect, it } from 'vitest';
import { pushSample } from './trace.js';

describe('current trace', () => {
  it('keeps only the recent samples', () => {
    let trace = /** @type {Array<{ t: number, i: number }>} */ ([]);
    for (let k = 0; k <= 80; k++) trace = pushSample(trace, k * 0.1, 0, 6);
    expect(trace[0].t).toBeCloseTo(2, 9);
    expect(trace.at(-1)?.t).toBeCloseTo(8, 9);
  });
});
