/**
 * The colour an object shows under coloured light. The prism itself (ray
 * tracing and the spectrum) is `#lib/domain/prism.js`.
 */

/** Coloured lights and objects of the colour-of-objects widget. */
export const LIGHTS = /** @type {const} */ ({
  trang: { name: 'trắng', parts: ['do', 'luc', 'lam'] },
  do: { name: 'đỏ', parts: ['do'] },
  luc: { name: 'lục', parts: ['luc'] },
  lam: { name: 'lam', parts: ['lam'] },
});

/** @typedef {keyof typeof LIGHTS} LightId */

/**
 * The colour an object looks under a light: it sends back only the light
 * colours it scatters well, and looks black when none of them is present.
 * `scatters` lists the colours the object sends back under white light.
 * @param {readonly string[]} scatters @param {readonly string[]} light
 * @returns {'trang' | 'do' | 'luc' | 'lam' | 'den'}
 */
export function seenColour(scatters, light) {
  const back = light.filter((c) => scatters.includes(c));
  if (back.length === 0) return 'den';
  if (back.length >= 3) return 'trang';
  return /** @type {'do' | 'luc' | 'lam'} */ (back[0]);
}
