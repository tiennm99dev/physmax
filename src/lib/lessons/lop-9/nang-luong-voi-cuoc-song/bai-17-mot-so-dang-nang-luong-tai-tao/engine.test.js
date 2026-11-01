import { describe, expect, it } from 'vitest';
import {
  CONDITIONS,
  DEMAND,
  PROVINCES,
  SOURCES,
  advise,
  barWidth,
  cost,
  judge,
  provinceOf,
  solutions,
  supply,
} from './engine.js';

const coast = provinceOf('ve-bien');
const mountain = provinceOf('mien-nui');

describe('the sites of a province', () => {
  it('describes every source in every province', () => {
    const missing = PROVINCES.flatMap((p) =>
      SOURCES.filter((s) => !p.sites[s.id]?.note).map((s) => `${p.id}/${s.id}`),
    );
    expect(missing).toEqual([]);
  });

  it('gives no sunlight at night anywhere', () => {
    const bad = PROVINCES.filter((p) => {
      const o = p.sites['mat-troi'].output;
      return CONDITIONS.some((c, i) => c.night && o[i] !== 0);
    });
    expect(bad).toEqual([]);
  });

  it('gives less hydropower in the dry season', () => {
    const o = mountain.sites.song.output;
    expect(o[2]).toBeLessThan(o[0]);
    expect(o[3]).toBeLessThan(o[1]);
  });

  it('rules out what the land does not have', () => {
    expect(coast.sites.song.max).toBe(0);
    expect(mountain.sites['song-bien'].max).toBe(0);
  });
});

describe('judging a plan', () => {
  it('adds up supply and cost', () => {
    const mix = { 'mat-troi': 2, gio: 1 };
    expect(supply(coast, mix)).toEqual([35, 15, 65, 25]);
    expect(cost(coast, mix)).toBe(10);
  });

  it('accepts a worked plan for each province', () => {
    expect(judge(coast, { gio: 4, 'mat-troi': 4 }).ok).toBe(true);
    expect(judge(mountain, { song: 4, 'sinh-khoi': 3, 'mat-troi': 3 }).ok).toBe(true);
    expect(judge(provinceOf('dong-bang'), { 'sinh-khoi': 5, gio: 1, 'mat-troi': 4 }).ok).toBe(true);
  });

  it('marks the shortfall and the overrun', () => {
    const night = judge(coast, { 'mat-troi': 6 });
    expect(night.short.map((s) => s.condition.id)).toEqual(['ngay-mua', 'dem-mua', 'dem-kho']);
    expect(night.short.find((s) => s.condition.id === 'dem-mua')?.missing).toBe(DEMAND[1]);
    const rich = judge(coast, { gio: 5, 'mat-troi': 6, 'sinh-khoi': 2 });
    expect(rich.short).toEqual([]);
    expect(rich.over).toBe(true);
    expect(rich.ok).toBe(false);
  });

  it('every province has a plan and needs more than one source', () => {
    const bad = [];
    for (const p of PROVINCES) {
      const plans = solutions(p);
      if (plans.length === 0) bad.push(`${p.id} no plan`);
      const single = plans.filter((m) => SOURCES.filter((s) => (m[s.id] ?? 0) > 0).length < 2);
      if (single.length > 0) bad.push(`${p.id} single source`);
    }
    expect(bad).toEqual([]);
  });
});

describe('advice', () => {
  it('invites a start on an empty plan', () => {
    expect(advise(coast, {}).tone).toBe('info');
  });

  it('blames the night for a solar-only plan', () => {
    const { tone, text } = advise(coast, { 'mat-troi': 6, 'sinh-khoi': 1 });
    expect(tone).toBe('warn');
    expect(text).toContain('Ban đêm');
  });

  it('blames the dry season for a river-only plan', () => {
    const { text } = advise(mountain, { song: 5 });
    expect(text).toContain('ngày, mùa khô');
    expect(text).toContain('Mùa khô');
  });

  it('warns about the budget, and lists the drawbacks of a good plan', () => {
    expect(advise(coast, { gio: 5, 'mat-troi': 6, 'sinh-khoi': 2 }).text).toContain(
      'vượt ngân sách',
    );
    const good = advise(coast, { gio: 4, 'mat-troi': 4 });
    expect(good.tone).toBe('ok');
    expect(good.text).toContain('Gió');
    expect(good.text).toContain('Mặt Trời');
  });
});

describe('supply bars', () => {
  it('fills at twice the demand and stops there', () => {
    expect(barWidth(100)).toBe(50);
    expect(barWidth(300)).toBe(100);
  });
});
