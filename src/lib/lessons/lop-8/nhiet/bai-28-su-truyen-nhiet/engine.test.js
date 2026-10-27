import { describe, expect, it } from 'vitest';
import {
  FLAME,
  PINS,
  ROOM,
  SURFACES,
  bottleStep,
  coldRod,
  convecting,
  dropPins,
  heatColor,
  intensity,
  rod,
  rodStep,
  settleTemperature,
  tubeStep,
} from './engine.js';

/**
 * Heats a rod for `seconds` and returns its temperatures and dropped pins.
 * @param {string} id
 * @param {number} seconds
 */
function heatRod(id, seconds) {
  let t = coldRod();
  let dropped = PINS.map(() => false);
  for (let s = 0; s < seconds * 10; s++) {
    t = rodStep(t, 0.1, rod(id).kappa, true);
    dropped = dropPins(t, dropped);
  }
  return { t, dropped };
}

describe('conduction along a rod', () => {
  it('holds the flame end hot and warms the rod from A toward B', () => {
    const { t } = heatRod('dong', 5);
    expect(t[0]).toBe(FLAME);
    for (let i = 1; i < t.length; i++) expect(t[i]).toBeLessThanOrEqual(t[i - 1] + 1e-9);
    expect(t.at(-1)).toBeGreaterThanOrEqual(ROOM - 1e-9);
  });

  it('drops the pins in order, nearest the flame first', () => {
    const { dropped } = heatRod('thep', 30);
    const first = dropped.indexOf(false);
    if (first >= 0) expect(dropped.slice(first).every((d) => !d)).toBe(true);
    expect(dropped[0]).toBe(true);
  });

  it('conducts faster in copper than in steel, and hardly at all in glass', () => {
    const count = (/** @type {boolean[]} */ d) => d.filter(Boolean).length;
    const copper = heatRod('dong', 20).dropped;
    const steel = heatRod('thep', 20).dropped;
    const glass = heatRod('thuy-tinh', 120).dropped;
    expect(count(copper)).toBe(PINS.length);
    expect(count(steel)).toBeLessThan(count(copper));
    expect(count(glass)).toBeLessThanOrEqual(2);
  });

  it('cools back toward room temperature with the flame out', () => {
    let { t } = heatRod('dong', 20);
    for (let s = 0; s < 20000; s++) t = rodStep(t, 0.1, rod('dong').kappa, false);
    for (const v of t) expect(v).toBeLessThan(ROOM + 2);
  });
});

describe('convection in a tube of water', () => {
  it('mixes the water when it is heated from below', () => {
    let tube = { top: ROOM, bottom: ROOM };
    for (let s = 0; s < 300; s++) tube = tubeStep(tube, 0.1, { heating: true, at: 'day' });
    expect(convecting(tube)).toBe(true);
    expect(tube.top).toBeGreaterThan(40);
    expect(tube.bottom - tube.top).toBeLessThan(5);
  });

  it('leaves the bottom cold when the water is heated at the top', () => {
    let tube = { top: ROOM, bottom: ROOM };
    for (let s = 0; s < 300; s++) tube = tubeStep(tube, 0.1, { heating: true, at: 'mieng' });
    expect(convecting(tube)).toBe(false);
    expect(tube.top).toBeGreaterThan(55);
    expect(tube.bottom).toBeLessThan(30);
  });

  it('never heats water past 100 °C', () => {
    let tube = { top: ROOM, bottom: ROOM };
    for (let s = 0; s < 3000; s++) tube = tubeStep(tube, 0.1, { heating: true, at: 'mieng' });
    expect(tube.top).toBeLessThanOrEqual(100);
  });
});

describe('heat radiation from a lamp', () => {
  it('falls with the square of the distance and stops behind a screen', () => {
    expect(intensity(30, { on: true, screen: false })).toBe(1);
    expect(intensity(60, { on: true, screen: false })).toBe(0.25);
    expect(intensity(30, { on: true, screen: true })).toBe(0);
    expect(intensity(30, { on: false, screen: false })).toBe(0);
  });

  it('warms a dark bottle more than a white shiny one', () => {
    const [dark, white] = SURFACES;
    let a = ROOM;
    let b = ROOM;
    for (let s = 0; s < 600; s++) {
      a = bottleStep(a, 0.1, { absorb: dark.absorb, intensity: 1 });
      b = bottleStep(b, 0.1, { absorb: white.absorb, intensity: 1 });
    }
    expect(a).toBeGreaterThan(b + 10);
    expect(settleTemperature({ absorb: dark.absorb, intensity: 1 })).toBeCloseTo(70, 9);
    expect(a).toBeLessThan(70);
  });
});

describe('heat colours', () => {
  it('runs from a cool colour at room temperature to a hot one', () => {
    expect(heatColor(ROOM)).toBe('hsl(215 20% 72%)');
    expect(heatColor(FLAME)).toBe('hsl(50 85% 53%)');
    expect(heatColor(FLAME)).not.toBe(heatColor(ROOM));
    expect(heatColor(1000)).toBe(heatColor(FLAME));
  });
});
