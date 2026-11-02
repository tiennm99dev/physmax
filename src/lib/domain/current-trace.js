/**
 * Appends a sample to a current trace and drops samples older than `span`
 * seconds.
 * @param {Array<{ t: number, i: number }>} trace
 * @param {number} t @param {number} i @param {number} span
 */
export function pushSample(trace, t, i, span) {
  const next = [...trace, { t, i }];
  let from = 0;
  while (from < next.length && next[from].t < t - span) from++;
  return from ? next.slice(from) : next;
}

/**
 * The points of a current trace as a polyline: the time axis runs from x = 24 to
 * x = 352, the newest sample at the right, and `i` from -1 to 1 goes `amp` either
 * side of `mid`.
 * @param {ReadonlyArray<{ t: number, i: number }>} trace
 * @param {number} clock seconds now
 * @param {number} span seconds shown
 * @param {number} mid y of the time axis
 * @param {number} amp pixels for |i| = 1
 */
export function tracePoints(trace, clock, span, mid, amp) {
  return trace
    .map((s) => {
      const x = 24 + ((s.t - (clock - span)) / span) * 328;
      return `${Math.round(x * 10) / 10},${Math.round((mid - amp * s.i) * 10) / 10}`;
    })
    .join(' ');
}
