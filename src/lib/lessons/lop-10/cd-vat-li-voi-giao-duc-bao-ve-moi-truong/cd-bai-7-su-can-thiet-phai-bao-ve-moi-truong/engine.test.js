import { describe, expect, it } from 'vitest';
import { ACTIONS, HOTSPOTS, ISSUES, LANDS, issueLabel, project, tally } from './engine.js';

const BOARD = { width: 360, height: 170, top: 85 };

describe('hotspots', () => {
  it('have unique ids and a known issue', () => {
    expect(new Set(HOTSPOTS.map((h) => h.id)).size).toBe(HOTSPOTS.length);
    const known = new Set(ISSUES.map((i) => i.id));
    expect(HOTSPOTS.filter((h) => !known.has(h.issue))).toEqual([]);
  });

  it('cover every issue at least once', () => {
    const used = new Set(HOTSPOTS.map((h) => h.issue));
    expect(ISSUES.filter((i) => !used.has(i.id))).toEqual([]);
  });

  it('sit inside the map board', () => {
    const outside = HOTSPOTS.filter((h) => {
      const p = project(h.lon, h.lat, BOARD);
      return p.x < 10 || p.x > BOARD.width - 10 || p.y < 10 || p.y > BOARD.height - 10;
    });
    expect(outside).toEqual([]);
  });

  it('place Viet Nam east of India and north of the equator', () => {
    const vn = HOTSPOTS.find((h) => h.id === 'dbscl');
    const india = HOTSPOTS.find((h) => h.id === 'delhi');
    if (!vn || !india) throw new Error('missing hotspot');
    const a = project(vn.lon, vn.lat, BOARD);
    const b = project(india.lon, india.lat, BOARD);
    expect(a.x).toBeGreaterThan(b.x);
    expect(a.y).toBeLessThan(BOARD.height / 2);
  });
});

describe('project', () => {
  it('maps the corners and the centre', () => {
    expect(project(-180, 85, BOARD)).toEqual({ x: 0, y: 0 });
    expect(project(0, 0, BOARD)).toEqual({ x: 180, y: 85 });
    expect(project(180, -85, BOARD)).toEqual({ x: 360, y: 170 });
  });
});

describe('lands', () => {
  it('are rings of at least three valid points', () => {
    const bad = LANDS.filter(
      (ring) =>
        ring.length < 3 || ring.some(([lon, lat]) => Math.abs(lon) > 180 || Math.abs(lat) > 90),
    );
    expect(bad).toEqual([]);
  });
});

describe('tally', () => {
  it('counts answered and right hotspots', () => {
    const [a, b] = HOTSPOTS;
    const wrong = ISSUES.find((i) => i.id !== b.issue)?.id ?? 'ozone';
    expect(tally({ [a.id]: a.issue, [b.id]: wrong })).toEqual({ done: 2, right: 1 });
    expect(tally({})).toEqual({ done: 0, right: 0 });
  });

  it('names an issue', () => {
    expect(issueLabel('ozone')).toBe('Suy giảm tầng ozone');
  });
});

describe('actions', () => {
  it('have unique ids and both kinds', () => {
    expect(new Set(ACTIONS.map((a) => a.id)).size).toBe(ACTIONS.length);
    expect(ACTIONS.some((a) => a.ok)).toBe(true);
    expect(ACTIONS.some((a) => !a.ok)).toBe(true);
  });
});
