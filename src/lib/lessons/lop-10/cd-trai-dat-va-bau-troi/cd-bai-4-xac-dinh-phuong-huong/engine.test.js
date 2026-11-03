import { describe, expect, it } from 'vitest';
import { strictTexFailures } from '#lib/core/tex-check.js';
import {
  DIRECTIONS,
  FACING,
  FIGURES,
  GUIDES,
  STARS,
  clockText,
  guideMeasure,
  guidePath,
  horizontal,
  judgeStar,
  project,
  separation,
  siderealHours,
  starById,
} from './engine.js';

const polaris = starById('polaris');

describe('the sky of the observer', () => {
  it('holds Polaris at the height of the latitude, whatever the hour', () => {
    const off = [];
    for (const lat of [10, 21, 45]) {
      for (let lst = 0; lst < 24; lst += 3) {
        const { alt, az } = horizontal(polaris, lat, lst);
        if (Math.abs(alt - lat) > 0.8 || Math.abs(az) > 2.5) off.push([lat, lst, alt, az]);
      }
    }
    expect(off).toEqual([]);
  });

  it('puts a star on the meridian at its highest point', () => {
    const star = { ra: 6, dec: 30 };
    expect(horizontal(star, 21, 6).alt).toBeCloseTo(81, 6);
  });

  it('turns the northern sky counterclockwise for someone facing north', () => {
    const dubhe = starById('dubhe');
    const view = (/** @type {number} */ lst) => {
      const { alt, az } = horizontal(dubhe, 45, lst);
      const p = project(alt, az, 40);
      const c = horizontal(polaris, 45, lst);
      const o = project(c.alt, c.az, 40);
      return Math.atan2(p.y - o.y, p.x - o.x);
    };
    let turned = view(11) - view(10);
    if (turned < -Math.PI) turned += 2 * Math.PI;
    expect(turned).toBeGreaterThan(0.2);
    expect(turned).toBeLessThan(0.3);
  });

  it('puts the east on the right hand of someone facing north', () => {
    expect(project(10, 45, 30).x).toBeGreaterThan(0);
    expect(project(10, -45, 30).x).toBeLessThan(0);
  });

  it('brings the sky back two hours earlier a month later', () => {
    const later = siderealHours(4, 20);
    const earlier = siderealHours(3, 22);
    expect(Math.abs(later - earlier)).toBeLessThan(0.05);
  });
});

describe('the guides to Polaris', () => {
  it('match the book’s multiples on the real sky', () => {
    const ratio = Object.fromEntries(GUIDES.map((g) => [g.id, guideMeasure(g).units]));
    expect(ratio['gau-lon']).toBeGreaterThan(4.5);
    expect(ratio['gau-lon']).toBeLessThan(5.5);
    expect(ratio['thien-hau']).toBeGreaterThan(7);
    expect(ratio['thien-hau']).toBeLessThan(8.5);
    expect(ratio['thien-nga']).toBeGreaterThan(3.5);
    expect(ratio['thien-nga']).toBeLessThan(4.5);
  });

  it('end on Polaris and carry a tick per unit', () => {
    const wrong = GUIDES.filter((g) => {
      const { line, ticks } = guidePath(g);
      return separation(line[line.length - 1], polaris) > 0.01 || ticks.length < g.times - 1;
    }).map((g) => g.id);
    expect(wrong).toEqual([]);
  });

  it('write valid TeX', () => {
    expect(strictTexFailures(GUIDES.map((g) => g.text))).toEqual([]);
    const said = STARS.filter((s) => s.candidate).map((s) => judgeStar(s.id).text);
    expect(strictTexFailures(said)).toEqual([]);
  });
});

describe('the data', () => {
  it('draws figures only from known stars', () => {
    const ids = new Set(STARS.map((s) => s.id));
    const wrong = FIGURES.flatMap((f) => f.lines.flat()).filter((id) => !ids.has(id));
    expect(wrong).toEqual([]);
  });

  it('has only Polaris as the right star', () => {
    const right = STARS.filter((s) => s.candidate && judgeStar(s.id).ok).map((s) => s.id);
    expect(right).toEqual(['polaris']);
  });

  it('answers each facing question with a real direction', () => {
    expect(FACING.filter((q) => !DIRECTIONS.includes(q.answer))).toEqual([]);
  });
});

describe('clockText', () => {
  it('never writes sixty minutes and wraps at midnight', () => {
    expect(clockText(21)).toBe('21 giờ');
    expect(clockText(5.25)).toBe('5 giờ 15 phút');
    expect(clockText(5.999)).toBe('6 giờ');
    expect(clockText(23.999)).toBe('0 giờ');
    expect(clockText(24)).toBe('0 giờ');
  });
});
