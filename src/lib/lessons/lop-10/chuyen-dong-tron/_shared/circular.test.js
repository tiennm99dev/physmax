import { describe, expect, it } from 'vitest';
import { TAU, arcPath, pointAt, tangentAt, toDeg, toRad } from './circular.js';

describe('points on the circle', () => {
  it('goes counter-clockwise on screen, so up comes a quarter turn after right', () => {
    expect(pointAt(10, 20, 5, 0)).toEqual({ x: 15, y: 20 });
    const up = pointAt(10, 20, 5, Math.PI / 2);
    expect(up.x).toBeCloseTo(10, 9);
    expect(up.y).toBeCloseTo(15, 9);
  });

  it('has a tangent perpendicular to the radius, along the motion', () => {
    const a = 0.7;
    const p = pointAt(0, 0, 1, a);
    const t = tangentAt(a);
    expect(p.x * t.x + p.y * t.y).toBeCloseTo(0, 9);
    const next = pointAt(0, 0, 1, a + 1e-4);
    expect((next.x - p.x) * t.x + (next.y - p.y) * t.y).toBeGreaterThan(0);
  });

  it('converts 180 degrees to pi radians and back', () => {
    expect(toRad(180)).toBeCloseTo(Math.PI, 9);
    expect(toDeg(TAU)).toBeCloseTo(360, 9);
  });
});

describe('arcPath', () => {
  it('is empty for no sweep', () => {
    expect(arcPath(0, 0, 5, 1, 1)).toBe('');
  });

  it('sets the large-arc flag only past a half turn', () => {
    expect(arcPath(0, 0, 5, 0, 1)).toContain('0 0 0');
    expect(arcPath(0, 0, 5, 0, 4)).toContain('0 1 0');
  });

  it('draws a full turn as two arcs', () => {
    expect(arcPath(0, 0, 5, 0, TAU).match(/A/g)).toHaveLength(2);
  });
});
