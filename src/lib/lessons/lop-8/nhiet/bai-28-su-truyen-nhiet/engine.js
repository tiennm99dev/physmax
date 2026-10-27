/**
 * Three small heat-transfer benches, each a few lines of physics:
 *
 * - Dẫn nhiệt: a rod heated at end A is a row of cells; each step, every cell
 *   moves toward the mean of its neighbours at a rate set by the material,
 *   and loses a little heat to the air. Wax-stuck pins drop once their cell
 *   passes the melting point of wax.
 * - Đối lưu: a tube of water as two layers. The flame heats one layer. Warm
 *   water rises, so when the lower layer is the warmer one the layers mix
 *   fast (a convection current); when the warm layer is on top, only slow
 *   conduction through water couples them.
 * - Bức xạ nhiệt: a lamp shines on a bottle. The heat received falls with the
 *   square of the distance, is stopped by a screen, and a dark rough surface
 *   absorbs more of it than a white shiny one.
 */

/** Room temperature, °C. */
export const ROOM = 25;

/** Wax melts and lets its pin drop at this temperature, °C. */
export const WAX_MELT = 60;

/** Temperature of the flame end of the rod, °C. */
export const FLAME = 400;

/** Cells along the rod; cell 0 sits in the flame. */
export const ROD_CELLS = 13;

/** Cells that carry a wax-stuck pin, from A toward B. */
export const PINS = [2, 4, 6, 8, 10, 12];

/**
 * Rod materials. `kappa` is the conduction rate in cells² per second of the
 * model: metals conduct well, glass poorly.
 * @type {Array<{ id: string, label: string, kappa: number, metal: boolean }>}
 */
export const RODS = [
  { id: 'dong', label: 'Đồng', kappa: 1.2, metal: true },
  { id: 'nhom', label: 'Nhôm', kappa: 1, metal: true },
  { id: 'thep', label: 'Thép', kappa: 0.25, metal: true },
  { id: 'thuy-tinh', label: 'Thủy tinh', kappa: 0.012, metal: false },
];

/** Heat loss rate of a rod cell to the air, per second. */
const ROD_LOSS = 0.004;

/** @param {string} id */
export function rod(id) {
  return RODS.find((r) => r.id === id) ?? RODS[0];
}

/** A rod at room temperature. */
export function coldRod() {
  return Array.from({ length: ROD_CELLS }, () => ROOM);
}

/**
 * Advances the rod by `dt` seconds. With the flame on, cell 0 is held at the
 * flame temperature; the far end B is insulated.
 * @param {number[]} temps
 * @param {number} dt
 * @param {number} kappa
 * @param {boolean} flame
 * @returns {number[]}
 */
export function rodStep(temps, dt, kappa, flame) {
  let t = temps.slice();
  const n = t.length;
  const sub = Math.max(1, Math.ceil((dt * (2 * kappa + ROD_LOSS)) / 0.4));
  const h = dt / sub;
  for (let s = 0; s < sub; s++) {
    if (flame) t[0] = FLAME;
    t = t.map((v, i) => {
      const left = t[Math.max(0, i - 1)];
      const right = t[Math.min(n - 1, i + 1)];
      return v + h * (kappa * (left - 2 * v + right) - ROD_LOSS * (v - ROOM));
    });
  }
  if (flame) t[0] = FLAME;
  return t;
}

/**
 * Which pins have dropped: once a pin's cell has reached the wax melting
 * point it stays dropped.
 * @param {number[]} temps
 * @param {boolean[]} dropped previous state, one entry per pin
 * @returns {boolean[]}
 */
export function dropPins(temps, dropped) {
  return PINS.map((cell, i) => dropped[i] || temps[cell] >= WAX_MELT);
}

/** @typedef {{ top: number, bottom: number }} Tube */
/** @typedef {'day' | 'mieng'} FlameAt */

/** Heating rate of the layer in the flame, °C per second. */
const TUBE_POWER = 1.2;
/** Mixing rate when the warmer water is below (convection), per second. */
export const MIX_CONVECTION = 0.5;
/** Mixing rate when the warmer water is on top (conduction only), per second. */
export const MIX_CONDUCTION = 0.0005;

/**
 * Advances the tube of water by `dt` seconds. Water cannot pass 100 °C.
 * @param {Tube} tube
 * @param {number} dt
 * @param {{ heating: boolean, at: FlameAt }} flame
 * @returns {Tube}
 */
export function tubeStep(tube, dt, { heating, at }) {
  let { top, bottom } = tube;
  const sub = Math.max(1, Math.ceil(dt / 0.05));
  const h = dt / sub;
  for (let s = 0; s < sub; s++) {
    if (heating) {
      if (at === 'day') bottom += TUBE_POWER * h;
      else top += TUBE_POWER * h;
    }
    const rate = bottom > top ? MIX_CONVECTION : MIX_CONDUCTION;
    const flow = rate * (bottom - top) * h * 0.5;
    bottom -= flow;
    top += flow;
    top = Math.min(100, top - 0.002 * (top - ROOM) * h);
    bottom = Math.min(100, bottom - 0.002 * (bottom - ROOM) * h);
  }
  return { top, bottom };
}

/**
 * Whether water is flowing round the tube: the warmer water must be below
 * the cooler water.
 * @param {Tube} tube
 */
export function convecting(tube) {
  return tube.bottom - tube.top > 0.3;
}

/**
 * Bottle surfaces and how much of the radiated heat each absorbs.
 * @type {Array<{ id: string, label: string, absorb: number }>}
 */
export const SURFACES = [
  { id: 'den', label: 'Phủ đen, xù xì', absorb: 0.9 },
  { id: 'trang', label: 'Trắng, bóng', absorb: 0.25 },
];

/** Distance at which the lamp gives intensity 1, cm. */
const REF_CM = 30;
/** Warming rate of a perfect absorber at intensity 1, °C per second. */
const LAMP_GAIN = 0.5;
/** Cooling rate of a bottle toward room temperature, per second. */
const BOTTLE_LOSS = 0.01;

/**
 * Relative heat radiation reaching a bottle: 1 at 30 cm, falling with the
 * square of the distance, 0 behind a screen or with the lamp off.
 * @param {number} cm
 * @param {{ on: boolean, screen: boolean }} setup
 */
export function intensity(cm, { on, screen }) {
  if (!on || screen) return 0;
  return (REF_CM / cm) ** 2;
}

/**
 * Advances a bottle's temperature by `dt` seconds.
 * @param {number} temp
 * @param {number} dt
 * @param {{ absorb: number, intensity: number }} bottle
 */
export function bottleStep(temp, dt, { absorb, intensity: power }) {
  let t = temp;
  const sub = Math.max(1, Math.ceil(dt / 0.1));
  const h = dt / sub;
  for (let s = 0; s < sub; s++) {
    t += h * (LAMP_GAIN * absorb * power - BOTTLE_LOSS * (t - ROOM));
  }
  return t;
}

/**
 * The temperature a bottle settles at under steady radiation.
 * @param {{ absorb: number, intensity: number }} bottle
 */
export function settleTemperature({ absorb, intensity: power }) {
  return ROOM + (LAMP_GAIN * absorb * power) / BOTTLE_LOSS;
}

/**
 * Display colour for a temperature: slate grey at room temperature, then
 * pale red through orange to yellow as it nears `hot`.
 * @param {number} celsius
 * @param {number} [hot]
 */
export function heatColor(celsius, hot = FLAME) {
  const f = Math.max(0, Math.min(1, (celsius - ROOM) / (hot - ROOM)));
  if (f < 0.005) return 'hsl(215 20% 72%)';
  const light = Math.round(88 - 45 * Math.min(1, 2 * f) + 20 * Math.max(0, f - 0.5));
  return `hsl(${Math.round(50 * f)} 85% ${light}%)`;
}
