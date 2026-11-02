/**
 * Pressure in a liquid at rest, p = pa + ρgh, and the hydraulic press that
 * passes a pressure on through a closed liquid. Pressures are in pascal, depths
 * in metres, piston areas in cm² and strokes in cm.
 */
import { material } from '#lib/domain/materials.js';

/** The book's free-fall acceleration, in m/s². */
export const G = 9.8;

/** Atmospheric pressure at the free surface, in pascal. */
export const PA = 101300;

/** Depth of the tank, in metres. */
export const MAX_DEPTH = 10;

/** The liquids the tank can hold. */
export const TANK_LIQUIDS = ['xang', 'dau-hoa', 'nuoc', 'nuoc-muoi'].map(material);

/**
 * Pressure added by the column of liquid above a depth.
 * @param {number} density kg/m³ @param {number} depth m
 */
export const columnPressure = (density, depth) => density * G * depth;

/**
 * Total pressure at a depth under an open surface.
 * @param {number} density kg/m³ @param {number} depth m
 */
export const pressureAt = (density, depth) => PA + columnPressure(density, depth);

/**
 * Half width of the tank at a depth, in pixels. A straight tank keeps its width;
 * a flared one narrows towards the bottom.
 * @param {'thang' | 'loe'} shape @param {number} depth m
 */
export function halfWidth(shape, depth) {
  return shape === 'thang' ? 120 : 120 - 9 * depth;
}

/**
 * Keeps a sensor inside the tank at its depth.
 * @param {'thang' | 'loe'} shape @param {number} depth m
 * @param {number} offset pixels from the tank's axis
 * @param {number} [margin] pixels kept clear of the wall
 */
export function keepInside(shape, depth, offset, margin = 10) {
  const room = halfWidth(shape, depth) - margin;
  return Math.max(-room, Math.min(room, offset));
}

/**
 * Pressure a force on a piston puts into the liquid.
 * @param {number} force N @param {number} areaCm2 cm²
 */
export const pistonPressure = (force, areaCm2) => force / (areaCm2 * 1e-4);

/**
 * Force on the large piston: the same pressure acting on a larger area.
 * @param {number} force N on the small piston @param {number} small cm² @param {number} large cm²
 */
export const outputForce = (force, small, large) => (force * large) / small;

/**
 * How far the large piston rises for a stroke of the small one: the liquid
 * pushed out on one side comes in on the other.
 * @param {number} stroke cm @param {number} small cm² @param {number} large cm²
 */
export const outputStroke = (stroke, small, large) => (stroke * small) / large;

/** Length of one press on the small piston, in cm. */
export const STROKE = 20;

/** How high the load is to be lifted, in cm. */
export const GOAL = 5;

/** What the press can lift, with masses in kg. */
export const LOADS = [
  { id: 'xe-may', label: 'Xe máy', mass: 120 },
  { id: 'o-to', label: 'Ô tô', mass: 1500 },
  { id: 'xe-tai', label: 'Xe tải nhẹ', mass: 3000 },
];

/**
 * The press under a load: its pressure and forces, whether it can lift the load,
 * and how many presses reach the goal.
 * @param {number} force N @param {number} small cm² @param {number} large cm² @param {number} mass kg
 */
export function press(force, small, large, mass) {
  const output = outputForce(force, small, large);
  const weight = mass * G;
  const rise = outputStroke(STROKE, small, large);
  return {
    pressure: pistonPressure(force, small),
    output,
    weight,
    lifts: output >= weight,
    rise,
    presses: Math.ceil(GOAL / rise - 1e-9),
  };
}
