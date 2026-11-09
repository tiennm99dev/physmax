import { describe, expect, it } from 'vitest';
import {
  CHALLENGES,
  MEDIA,
  POLLUTANTS,
  SOURCES,
  ZONES,
  byMedium,
  checkChallenge,
  dotSpots,
  sourceLabel,
  sourcesOf,
} from './engine.js';

describe('sources', () => {
  it('have unique ids and release known pollutants into known media', () => {
    expect(new Set(SOURCES.map((s) => s.id)).size).toBe(SOURCES.length);
    const media = new Set(MEDIA.map((m) => m.id));
    const bad = SOURCES.flatMap((s) =>
      s.releases.filter(
        (r) =>
          !(r.pollutant in POLLUTANTS) ||
          r.media.length === 0 ||
          r.media.some((m) => !media.has(m)),
      ),
    );
    expect(bad).toEqual([]);
  });

  it('leave no pollutant unused', () => {
    const used = new Set(SOURCES.flatMap((s) => s.releases.map((r) => r.pollutant)));
    expect(Object.keys(POLLUTANTS).filter((p) => !used.has(p))).toEqual([]);
  });
});

describe('byMedium', () => {
  it('is empty with no source on', () => {
    expect(byMedium([])).toEqual({ 'khong-khi': [], nuoc: [], dat: [] });
  });

  it('brings acid rain gases down to water and soil', () => {
    const r = byMedium(['nhiet-dien']);
    const so2 = r.nuoc.find((x) => x.pollutant === 'so2');
    expect(so2?.via).toEqual(['qua mưa acid']);
    expect(r['khong-khi'].map((x) => x.pollutant)).toEqual(['co2', 'so2', 'nox', 'bui']);
  });

  it('merges one pollutant from several sources', () => {
    const r = byMedium(['nhiet-dien', 'giao-thong']);
    const nox = r['khong-khi'].find((x) => x.pollutant === 'nox');
    expect(nox?.sources).toEqual(['nhiet-dien', 'giao-thong']);
  });
});

describe('challenges', () => {
  it('have a non-empty answer each', () => {
    expect(CHALLENGES.filter((c) => sourcesOf(c.pollutants).length === 0)).toEqual([]);
  });

  it('find the right sources', () => {
    expect(sourcesOf(['so2', 'nox'])).toEqual(['nhiet-dien', 'giao-thong']);
    expect(sourcesOf(['cfc'])).toEqual(['thiet-bi-cu']);
    expect(sourcesOf(['kim-loai'])).toEqual(['nhiet-dien', 'khu-cong-nghiep', 'bai-rac']);
    expect(sourcesOf(['co2', 'ch4'])).toEqual([
      'nhiet-dien',
      'giao-thong',
      'dong-ruong',
      'bai-rac',
    ]);
  });

  it('report missing and extra sources', () => {
    const acid = CHALLENGES[0];
    expect(checkChallenge(['giao-thong', 'nhiet-dien'], acid)).toEqual({
      ok: true,
      missing: [],
      extra: [],
    });
    expect(checkChallenge(['giao-thong', 'bai-rac'], acid)).toEqual({
      ok: false,
      missing: ['nhiet-dien'],
      extra: ['bai-rac'],
    });
  });

  it('name sources', () => {
    expect(sourceLabel('bai-rac')).toBe('Bãi rác');
  });
});

describe('dotSpots', () => {
  it('stay inside their zone and are the same every time', () => {
    const outside = [];
    for (let i = 0; i < SOURCES.length; i++) {
      for (const m of MEDIA) {
        const z = ZONES[m.id];
        for (const p of dotSpots(i, m.id)) {
          if (p.x < z.x || p.x > z.x + z.w || p.y < z.y || p.y > z.y + z.h) outside.push(p);
        }
      }
    }
    expect(outside).toEqual([]);
    expect(dotSpots(2, 'nuoc')).toEqual(dotSpots(2, 'nuoc'));
  });
});
