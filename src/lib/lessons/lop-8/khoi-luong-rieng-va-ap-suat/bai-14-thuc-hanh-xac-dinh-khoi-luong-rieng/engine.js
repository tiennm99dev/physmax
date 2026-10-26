/**
 * The virtual bench for measuring the density of a small solid that sinks:
 * an electronic scale gives its mass m (g); a graduated cylinder (0 to 100 mL,
 * divisions of 2 mL) gives the water level V1 before and V2 after the object
 * is dropped in, so V = V2 − V1 (1 mL = 1 cm³) and D = m / V.
 */
import { tidy } from '../_shared/materials.js';

/** Graduated cylinder: capacity (GHĐ) and smallest division (ĐCNN), in mL. */
export const CYLINDER = { max: 100, step: 2 };

/**
 * @typedef {{ id: string, name: string, mass: number, volume: number, start: number, material: string }} LabObject
 * mass in g, volume in cm³, start = water level before dropping, in mL.
 */

/** @type {LabObject[]} */
export const OBJECTS = [
  { id: 'hon-da', name: 'Hòn đá', mass: 52, volume: 20, start: 50, material: 'đá' },
  { id: 'oc-sat', name: 'Con ốc sắt', mass: 62.4, volume: 8, start: 40, material: 'sắt' },
  { id: 'qua-nang', name: 'Quả nặng nhôm', mass: 54, volume: 20, start: 60, material: 'nhôm' },
  { id: 'chi', name: 'Mẩu chì', mass: 113, volume: 10, start: 46, material: 'chì' },
];

/**
 * @param {string} id
 * @returns {LabObject}
 */
export function labObject(id) {
  return OBJECTS.find((o) => o.id === id) ?? OBJECTS[0];
}

/**
 * Water level after the object is fully under water, in mL.
 * @param {LabObject} o
 */
export const levelAfter = (o) => o.start + o.volume;

/**
 * D in g/cm³ from a mass and the two levels.
 * @param {number} mass @param {number} v1 @param {number} v2
 * @returns {number | null} null when V2 is not above V1
 */
export function densityFrom(mass, v1, v2) {
  const v = v2 - v1;
  if (!(v > 0)) return null;
  return tidy(mass / v);
}

/**
 * Reads a learner's typed number: decimal comma or point, spaces ignored.
 * @param {string} text
 * @returns {number | null}
 */
export function readTyped(text) {
  const t = text.trim().replace(/\s+/g, '').replace(',', '.');
  if (!/^\d+(\.\d+)?$/.test(t)) return null;
  return Number(t);
}

/** @typedef {'empty' | 'invalid' | 'ok' | 'wrong'} FieldResult */

/**
 * @param {string} text
 * @param {number} truth
 * @param {number} [tolerance]
 * @returns {FieldResult}
 */
export function checkField(text, truth, tolerance = 1e-9) {
  if (text.trim() === '') return 'empty';
  const v = readTyped(text);
  if (v === null) return 'invalid';
  return Math.abs(v - truth) <= tolerance + 1e-9 ? 'ok' : 'wrong';
}

/** Rounding a learner may apply to D: within 0.05 g/cm³ counts as right. */
export const D_TOLERANCE = 0.05;
