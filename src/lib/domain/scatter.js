/**
 * Repeatable measuring noise for simulated practical work: the same reading
 * number always gets the same scatter, on the server and in the browser.
 */

/**
 * Seeded scatter in [-1, 1].
 * @param {number} draw reading number
 */
export function scatter(draw) {
  const v = Math.sin(draw * 127.1 + 11.7) * 43758.5453;
  return (v - Math.floor(v)) * 2 - 1;
}
