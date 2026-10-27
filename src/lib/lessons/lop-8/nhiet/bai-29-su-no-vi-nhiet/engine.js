/**
 * Thermal expansion on three benches:
 *
 * - Rails: a 12,5 m steel rail grows by α·L·Δt; the joint gap left when the
 *   rails were laid at 20 °C closes as they warm and opens as they cool.
 *   With no gap, a warmer rail has nowhere to go and buckles.
 * - Bimetallic strip: copper expands more than steel, so a copper–steel strip
 *   bends toward the steel side when heated and toward the copper side when
 *   cooled. Its tip bend is proportional to the temperature change.
 * - Solids, liquids, gases: how much 1 000 cm³ of each grows when warmed,
 *   from the book's table for a 50 °C rise, scaled in proportion.
 */

/** Linear expansion per °C. */
export const ALPHA = { thep: 12e-6, dong: 17e-6, nhom: 23e-6 };

/** Rail length, m. */
export const RAIL_M = 12.5;

/** Temperature at which the rails were laid, °C. */
export const LAID_AT = 20;

/** Joint gap left when laying the rails, mm. */
export const GAP_MM = 6;

/** Rounds away floating-point noise. */
const tidy = (/** @type {number} */ v) => Math.round(v * 1e9) / 1e9;

/**
 * How much longer a rail is than when it was laid, mm (negative: shorter).
 * @param {number} celsius
 */
export function railGrowth(celsius) {
  return tidy(ALPHA.thep * RAIL_M * 1000 * (celsius - LAID_AT));
}

/**
 * The joint gap at a temperature, mm. Zero or less means the rail ends push
 * on each other.
 * @param {number} celsius
 * @param {number} [gap] gap left at laying, mm
 */
export function railGap(celsius, gap = GAP_MM) {
  return tidy(gap - railGrowth(celsius));
}

/**
 * Temperature at which a joint gap closes, °C.
 * @param {number} [gap] mm
 */
export function closingTemperature(gap = GAP_MM) {
  return tidy(LAID_AT + gap / (ALPHA.thep * RAIL_M * 1000));
}

/** Temperature at which the bimetallic strip is straight, °C. */
export const STRAIGHT_AT = 25;

/**
 * Signed bend of a copper–steel strip: positive toward the steel side
 * (heated), negative toward the copper side (cooled), in units of
 * (α_copper − α_steel)·Δt × 10⁶, so 1 °C of heating gives 5.
 * @param {number} celsius
 */
export function bend(celsius) {
  return tidy((ALPHA.dong - ALPHA.thep) * 1e6 * (celsius - STRAIGHT_AT));
}

/** A thermostat contact closes again only after cooling this far, °C. */
export const SNAP_BAND = 10;

/**
 * Whether a snap-action thermostat contact under the strip's tip is closed:
 * a closed contact opens once the strip is heated to the set temperature,
 * and an open one closes again only when the strip has cooled `SNAP_BAND`
 * below it, so the heater is not switched on and off at every instant.
 * @param {boolean} wasClosed
 * @param {number} celsius
 * @param {number} setPoint °C
 */
export function contactClosed(wasClosed, celsius, setPoint) {
  return wasClosed ? celsius < setPoint : celsius <= setPoint - SNAP_BAND;
}

/**
 * The book's table: increase in volume of 1 000 cm³ of each substance for a
 * 50 °C rise, cm³.
 * @type {Array<{ id: string, label: string, state: 'ran' | 'long' | 'khi', per50: number }>}
 */
export const SUBSTANCES = [
  { id: 'khong-khi', label: 'Không khí', state: 'khi', per50: 183 },
  { id: 'hoi-nuoc', label: 'Hơi nước', state: 'khi', per50: 183 },
  { id: 'oxygen', label: 'Khí oxygen', state: 'khi', per50: 183 },
  { id: 'ruou', label: 'Rượu', state: 'long', per50: 58 },
  { id: 'dau-hoa', label: 'Dầu hỏa', state: 'long', per50: 55 },
  { id: 'thuy-ngan', label: 'Thủy ngân', state: 'long', per50: 9 },
  { id: 'nhom', label: 'Nhôm', state: 'ran', per50: 3.45 },
  { id: 'dong', label: 'Đồng', state: 'ran', per50: 2.55 },
  { id: 'sat', label: 'Sắt', state: 'ran', per50: 1.8 },
];

/**
 * Increase in volume of 1 000 cm³ of a substance for a temperature rise, cm³.
 * @param {string} id
 * @param {number} rise °C
 */
export function volumeGain(id, rise) {
  const s = SUBSTANCES.find((x) => x.id === id);
  if (!s) return NaN;
  return tidy((s.per50 * rise) / 50);
}
