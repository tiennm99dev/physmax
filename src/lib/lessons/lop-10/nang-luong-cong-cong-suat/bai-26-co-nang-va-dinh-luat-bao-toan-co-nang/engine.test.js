import { describe, expect, it } from 'vitest';
import {
  DRAG,
  G,
  LENGTH,
  heightOf,
  kineticOf,
  mechanicalOf,
  potentialOf,
  releaseAt,
  stepSwing,
} from './engine.js';

describe('a pendulum released at rest', () => {
  it('starts with potential energy only', () => {
    const swing = releaseAt(60);
    expect(heightOf(swing.theta)).toBeCloseTo(0.75, 9);
    expect(mechanicalOf(2, swing)).toBeCloseTo(2 * G * 0.75, 9);
    expect(kineticOf(2, swing.omega)).toBe(0);
  });

  it('keeps its mechanical energy with no drag', () => {
    let swing = releaseAt(60);
    const start = mechanicalOf(1, swing);
    /** @type {number[]} */
    const drift = [];
    for (let i = 0; i < 300; i += 1) {
      swing = stepSwing(swing, 1 / 60, 0);
      drift.push(Math.abs(mechanicalOf(1, swing) - start));
    }
    expect(Math.max(...drift)).toBeLessThan(start * 1e-3);
  });

  it('reaches the speed the energy law gives at the bottom', () => {
    let swing = releaseAt(60);
    while (swing.theta > 0) swing = stepSwing(swing, 1 / 240, 0);
    const v = LENGTH * Math.abs(swing.omega);
    expect(v).toBeCloseTo(Math.sqrt(2 * G * LENGTH * 0.5), 1);
  });

  it('swings to the same height on the other side', () => {
    let swing = releaseAt(40);
    let far = 0;
    for (let i = 0; i < 400; i += 1) {
      swing = stepSwing(swing, 1 / 120, 0);
      far = Math.min(far, swing.theta);
    }
    expect((-far * 180) / Math.PI).toBeCloseTo(40, 0);
  });

  it('loses mechanical energy to drag, and never gains', () => {
    let swing = releaseAt(60);
    const values = [mechanicalOf(1, swing)];
    for (let i = 0; i < 40; i += 1) {
      swing = stepSwing(swing, 0.25, DRAG);
      values.push(mechanicalOf(1, swing));
    }
    const rises = values.filter((w, i) => i > 0 && w > values[i - 1] + 1e-3);
    expect(rises).toEqual([]);
    expect(values[values.length - 1]).toBeLessThan(values[0] * 0.5);
  });

  it('scales its energy with the mass', () => {
    expect(potentialOf(3, 1)).toBeCloseTo(3 * potentialOf(1, 1), 9);
  });
});
