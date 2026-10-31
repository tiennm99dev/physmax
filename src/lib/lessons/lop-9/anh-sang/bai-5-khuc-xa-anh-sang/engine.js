/**
 * Checking the refraction law from a table of measurements: with at least
 * three different angles of incidence, every sin i / sin r should equal the
 * relative index n₂₁ = n₂ / n₁.
 */

/** Measurements needed before the widget calls the law confirmed. */
export const MIN_ROWS = 3;

/**
 * @param {Array<{ ratio: number }>} rows measured sin i / sin r
 * @param {number} expected n₂ / n₁
 * @param {number} [tolerance]
 */
export function lawCheck(rows, expected, tolerance = 0.005) {
  const mean = rows.length ? rows.reduce((s, row) => s + row.ratio, 0) / rows.length : 0;
  const steady = rows.every((row) => Math.abs(row.ratio - expected) <= tolerance);
  return { mean, steady, enough: rows.length >= MIN_ROWS && steady };
}

/**
 * Absolute refractive index n = c / v.
 * @param {number} v speed of light in the medium, m/s
 * @param {number} [c] speed of light in vacuum, m/s
 */
export const indexFromSpeed = (v, c = 3e8) => c / v;
