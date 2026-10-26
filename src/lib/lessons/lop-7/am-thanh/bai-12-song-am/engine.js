/**
 * Sound as the spread of a source's vibration through a medium. A loudspeaker
 * membrane vibrates while it is switched on; each layer of the medium at
 * distance x repeats the membrane's motion x/v later, so the layers crowd
 * together (nén) and spread apart (giãn) in turn. In a vacuum there are no
 * layers, so nothing carries the vibration.
 */

/**
 * @typedef {{
 *   id: 'air' | 'water' | 'steel' | 'vacuum',
 *   name: string,
 *   state: string,
 *   speed: number,
 *   screenSpeed: number,
 * }} Medium
 * `speed` is the real speed of sound in m/s at room temperature (0 when sound
 * cannot travel); `screenSpeed` is the slowed-down speed on screen in px/s,
 * which keeps the order air < water < steel.
 */

/** @type {Medium[]} */
export const MEDIA = [
  { id: 'air', name: 'Không khí', state: 'chất khí', speed: 340, screenSpeed: 60 },
  { id: 'water', name: 'Nước', state: 'chất lỏng', speed: 1500, screenSpeed: 110 },
  { id: 'steel', name: 'Thép', state: 'chất rắn', speed: 6000, screenSpeed: 200 },
  { id: 'vacuum', name: 'Chân không', state: 'chân không', speed: 0, screenSpeed: 0 },
];

/**
 * @param {string} id
 * @returns {Medium}
 */
export function mediumById(id) {
  return MEDIA.find((m) => m.id === id) ?? MEDIA[0];
}

/**
 * Displacement of the source at time `tau` after it was switched on, for a
 * source that vibrates for `duration` seconds (Infinity while still on).
 * @param {number} tau
 * @param {{ amplitude: number, frequency: number, duration: number }} source
 */
export function sourceOffset(tau, source) {
  if (tau < 0 || tau > source.duration) return 0;
  return source.amplitude * Math.sin(2 * Math.PI * source.frequency * tau);
}

/**
 * Displacement of the layer at distance `x` from the source, `t` seconds after
 * the source was switched on: it repeats the source's motion `x / speed`
 * later. With speed 0 (a vacuum) no layer ever moves.
 * @param {number} x
 * @param {number} t
 * @param {number} speed
 * @param {{ amplitude: number, frequency: number, duration: number }} source
 */
export function layerOffset(x, t, speed, source) {
  if (speed <= 0) return 0;
  return sourceOffset(t - x / speed, source);
}

/**
 * Whether the vibration is reaching a point at distance `x` at time `t`.
 * @param {number} x
 * @param {number} t
 * @param {number} speed
 * @param {number} duration
 */
export function isReached(x, t, speed, duration) {
  if (speed <= 0) return false;
  const tau = t - x / speed;
  return tau >= 0 && tau <= duration;
}

/**
 * Time in seconds for sound to cover `distance` metres in a medium, or
 * Infinity when it cannot travel there.
 * @param {number} distance
 * @param {Medium} medium
 */
export function travelTime(distance, medium) {
  return medium.speed > 0 ? distance / medium.speed : Infinity;
}
