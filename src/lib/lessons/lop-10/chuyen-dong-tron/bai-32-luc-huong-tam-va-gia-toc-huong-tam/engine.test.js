import { describe, expect, it } from 'vitest';
import {
  BOARD,
  HIT_RADIUS,
  MAX_TILT,
  ROADS,
  TARGETS,
  centripetal,
  centripetalForce,
  cutPoint,
  curve,
  exitTime,
  flight,
  maxCentripetal,
  sweepOnBoard,
} from './engine.js';

describe('centripetal formulas', () => {
  it('matches the satellite of the book', () => {
    expect(centripetal(7570, 7e6)).toBeCloseTo(8.19, 2);
  });

  it('grows fourfold when the speed doubles', () => {
    expect(centripetalForce(2, 6, 3) / centripetalForce(2, 3, 3)).toBeCloseTo(4, 9);
  });
});

describe('the stone', () => {
  it('leaves along the tangent, perpendicular to the string', () => {
    const c = cutPoint(1.1, 1);
    expect(c.x * c.dx + c.y * c.dy).toBeCloseTo(0, 9);
  });

  it('stops at the edge of the board when it misses', () => {
    const start = cutPoint(0, 1);
    const t = exitTime(start, 2);
    expect(start.y + start.dy * 2 * t).toBeCloseTo(BOARD.y, 9);
    expect(flight(0, 1, 2, { x: -2, y: -1.5 })).toEqual({ hit: false, time: t });
  });

  it('hits a target straight ahead, stopping at its edge', () => {
    const r = flight(0, 1, 2, { x: 1, y: 1.5 });
    expect(r.hit).toBe(true);
    expect(r.time).toBeCloseTo((1.5 - HIT_RADIUS) / 2, 9);
  });

  it('never hits a target behind it', () => {
    expect(flight(0, 1, 2, { x: 1, y: -1.5 }).hit).toBe(false);
  });

  it('can hit every target from some cut, on every string length', () => {
    const missed = [];
    for (const target of TARGETS) {
      for (let r = 0.8; r <= 1.41; r += 0.1) {
        let found = false;
        for (let d = 0; d < 360 && !found; d += 5) {
          found = flight((d * Math.PI) / 180, r, 3, target).hit;
        }
        if (!found) missed.push({ target, r });
      }
    }
    expect(missed).toEqual([]);
  });

  it('keeps every target on the board and outside the longest string', () => {
    const bad = TARGETS.filter(
      (t) =>
        Math.abs(t.x) + HIT_RADIUS > BOARD.x ||
        Math.abs(t.y) + HIT_RADIUS > BOARD.y ||
        Math.hypot(t.x, t.y) - HIT_RADIUS <= 1.4,
    );
    expect(bad).toEqual([]);
  });
});

describe('the car on a curve', () => {
  it('on a flat road is limited by friction alone', () => {
    expect(maxCentripetal(0.5, 0)).toBeCloseTo(4.9, 9);
    expect(curve(36, 50, 0.5, 0).needed).toBeCloseTo(2000, 6);
  });

  it('holds a curve on a dry road and skids at the same speed on a wet one', () => {
    expect(curve(60, 50, 0.7, 0).holds).toBe(true);
    const wet = curve(60, 50, 0.4, 0);
    expect(wet.holds).toBe(false);
    expect(wet.skidRadius).toBeGreaterThan(50);
    expect(wet.maxKmh).toBeLessThan(60);
  });

  it('gets more help from a steeper tilt', () => {
    expect(maxCentripetal(0.4, 10)).toBeGreaterThan(maxCentripetal(0.4, 0));
  });

  it('has a limit speed where needed equals available', () => {
    const c = curve(40, 80, 0.4, 5);
    const atLimit = curve(c.maxKmh, 80, 0.4, 5);
    expect(atLimit.needed).toBeCloseTo(atLimit.available, 6);
  });

  it('offers no tilt so steep that a slow car would slide down', () => {
    const tan = Math.tan((MAX_TILT * Math.PI) / 180);
    expect(ROADS.filter((road) => road.value <= tan)).toEqual([]);
  });

  it('turns a path only as far as the board allows', () => {
    expect(sweepOnBoard(100, 60, 200, 350, 10)).toBeCloseTo(Math.PI / 2, 9);
    const wide = sweepOnBoard(1000, 60, 200, 350, 10);
    expect(60 + 1000 * Math.sin(wide)).toBeLessThanOrEqual(350 + 1e-9);
    expect(200 - 1000 * (1 - Math.cos(wide))).toBeGreaterThanOrEqual(10 - 1e-9);
  });
});
