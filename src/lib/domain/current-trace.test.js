import { describe, expect, it } from 'vitest';
import { pushSample, tracePoints } from './current-trace.js';

describe('current trace', () => {
  it('keeps only the recent samples', () => {
    let trace = /** @type {Array<{ t: number, i: number }>} */ ([]);
    for (let k = 0; k <= 80; k++) trace = pushSample(trace, k * 0.1, 0, 6);
    expect(trace[0].t).toBeCloseTo(2, 9);
    expect(trace.at(-1)?.t).toBeCloseTo(8, 9);
  });
});

describe('tracePoints', () => {
  it('puts the newest sample at the right and maps current onto the height', () => {
    const trace = [
      { t: 4, i: 1 },
      { t: 10, i: -1 },
    ];
    expect(tracePoints(trace, 10, 6, 50, 38)).toBe('24,12 352,88');
  });
});
