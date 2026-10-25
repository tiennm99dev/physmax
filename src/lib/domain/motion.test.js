import { describe, expect, it } from 'vitest';
import {
  averages,
  displacement,
  distanceTravelled,
  sampleMotion,
  stateAt,
  totalTime,
} from './motion.js';

const uniform = { x0: 2, v0: 3, stages: [{ duration: 10, acceleration: 0 }] };
const freeFall = { stages: [{ duration: 3, acceleration: 9.8 }] };
// Thrown up at 10 m/s with a = -10: rises 5 m in 1 s, falls back over the next second.
const throwUp = { v0: 10, stages: [{ duration: 2, acceleration: -10 }] };

describe('motion engine', () => {
  it('moves uniformly with x = x0 + v·t', () => {
    expect(stateAt(uniform, 4)).toEqual({ t: 4, x: 14, v: 3, a: 0 });
    expect(stateAt(uniform, 0)).toEqual({ t: 0, x: 2, v: 3, a: 0 });
  });

  it('falls freely with x = g·t²/2 and v = g·t', () => {
    expect(stateAt(freeFall, 2)).toEqual({ t: 2, x: 19.6, v: 19.6, a: 9.8 });
  });

  it('chains stages and keeps the final velocity afterwards', () => {
    const trip = {
      stages: [
        { duration: 4, acceleration: 2 },
        { duration: 6, acceleration: 0 },
        { duration: 2, acceleration: -4 },
      ],
    };
    expect(totalTime(trip)).toBe(12);
    expect(stateAt(trip, 4)).toMatchObject({ x: 16, v: 8 });
    expect(stateAt(trip, 9)).toMatchObject({ x: 56, v: 8, a: 0 });
    // At a stage boundary the acceleration is the one of the stage that starts there.
    expect(stateAt(trip, 10)).toMatchObject({ x: 64, v: 8, a: -4 });
    expect(stateAt(trip, 12)).toMatchObject({ x: 72, v: 0 });
    expect(stateAt(trip, 15)).toMatchObject({ x: 72, v: 0, a: 0 });
  });

  it('samples evenly and keeps stage corners', () => {
    const trip = {
      stages: [
        { duration: 1.5, acceleration: 1 },
        { duration: 2, acceleration: 0 },
      ],
    };
    const ts = sampleMotion(trip, 4, 4).map((s) => s.t);
    expect(ts).toEqual([0, 1, 1.5, 2, 3, 3.5, 4]);
  });

  it('tells displacement from distance travelled when the body turns back', () => {
    expect(displacement(throwUp, 0, 2)).toBe(0);
    expect(distanceTravelled(throwUp, 2)).toBe(10);
    expect(distanceTravelled(throwUp, 1)).toBe(5);
    expect(distanceTravelled(throwUp, 1.5)).toBe(6.25);
  });

  it('turns back across a stage boundary too', () => {
    const back = {
      x0: 0,
      v0: 0,
      stages: [
        { duration: 2, acceleration: 0 },
        { duration: 0, acceleration: 0 },
      ],
    };
    expect(distanceTravelled(back, 2)).toBe(0);
    const out = {
      v0: 4,
      stages: [
        { duration: 2, acceleration: 0 },
        { duration: 4, acceleration: -2 },
      ],
    };
    // 8 m out, then 4 m more while braking to rest at t = 4, then 4 m back.
    expect(displacement(out, 0, 6)).toBe(8);
    expect(distanceTravelled(out, 6)).toBe(16);
  });

  it('averages speed and velocity', () => {
    expect(averages(throwUp, 0, 2)).toEqual({ speed: 5, velocity: 0 });
    expect(averages(uniform, 1, 3)).toEqual({ speed: 3, velocity: 3 });
    expect(averages(uniform, 3, 3)).toEqual({ speed: 0, velocity: 0 });
  });
});
