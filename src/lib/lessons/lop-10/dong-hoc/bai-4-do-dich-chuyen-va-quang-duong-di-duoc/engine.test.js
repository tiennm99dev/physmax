import { describe, expect, it } from 'vitest';
import {
  MAP,
  MISSIONS,
  STEPS,
  addLeg,
  compareNote,
  directionText,
  displacement,
  lengthRelation,
  meets,
  pathLength,
  snapToMap,
  walk,
} from './engine.js';

const START = [{ x: 0, y: 0 }];

describe('route measures', () => {
  it('reproduces the car that goes 6 km West, 4 km South, 3 km East', () => {
    const route = [
      { x: 0, y: 0 },
      { x: -6, y: 0 },
      { x: -6, y: -4 },
      { x: -3, y: -4 },
    ];
    expect(pathLength(route)).toBe(13);
    expect(displacement(route)).toEqual({ x: -3, y: -4, size: 5 });
    expect(directionText(-3, -4)).toContain('Tây – Nam');
    expect(directionText(-3, -4)).toContain('53{,}1');
  });

  it('has zero displacement on a closed route', () => {
    const route = [
      { x: 0, y: 0 },
      { x: 2, y: 0 },
      { x: 2, y: 2 },
      { x: 0, y: 2 },
      { x: 0, y: 0 },
    ];
    expect(pathLength(route)).toBe(8);
    expect(displacement(route).size).toBe(0);
    expect(meets(route, MISSIONS[0])).toBe(true);
    expect(compareNote(route)).toContain('$d = 0$');
  });

  it('names a pure compass direction without an angle', () => {
    expect(directionText(3, 0)).toBe('hướng Đông');
    expect(directionText(0, -2)).toBe('hướng Nam');
    expect(directionText(0, 0)).toContain('không có hướng');
  });

  it('marks a rounded length as approximate', () => {
    expect(lengthRelation(5)).toBe('= 5');
    expect(lengthRelation(Math.hypot(2, 5))).toBe('\\approx 5{,}39');
  });
});

describe('editing a route', () => {
  it('snaps to the map and stays on it', () => {
    expect(snapToMap(2.4, -1.6)).toEqual({ x: 2, y: -2 });
    expect(snapToMap(99, -99)).toEqual({ x: MAP.xMax, y: MAP.yMin });
  });

  it('ignores a leg that goes nowhere', () => {
    expect(addLeg(START, { x: 0, y: 0 })).toBe(START);
    const edge = [{ x: MAP.xMax, y: 0 }];
    expect(walk(edge, STEPS.dong)).toBe(edge);
  });

  it('walks one kilometre in a compass direction', () => {
    expect(walk(START, STEPS.bac).at(-1)).toEqual({ x: 0, y: 1 });
    expect(walk(START, STEPS.tay).at(-1)).toEqual({ x: -1, y: 0 });
  });

  it('every task can be met on the map', () => {
    const straight = [
      { x: 0, y: 0 },
      { x: 6, y: 0 },
    ];
    const car = [
      { x: 0, y: 0 },
      { x: -6, y: 0 },
      { x: -6, y: -4 },
      { x: -3, y: -4 },
    ];
    expect(meets(straight, MISSIONS[2])).toBe(true);
    expect(meets(car, MISSIONS[1])).toBe(true);
  });
});
