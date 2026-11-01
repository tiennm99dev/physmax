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
