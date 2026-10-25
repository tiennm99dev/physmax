import { describe, expect, it } from 'vitest';
import { SITUATIONS, checkFlags } from './engine.js';

describe('virtual lab safety check', () => {
  const dangerous = SITUATIONS.filter((s) => s.danger).map((s) => s.id);

  it('mixes safe and dangerous situations with unique ids', () => {
    expect(new Set(SITUATIONS.map((s) => s.id)).size).toBe(SITUATIONS.length);
    expect(dangerous.length).toBeGreaterThan(2);
    expect(dangerous.length).toBeLessThan(SITUATIONS.length);
  });

  it('is perfect only when exactly the dangerous situations are flagged', () => {
    expect(checkFlags(SITUATIONS, dangerous).perfect).toBe(true);
    expect(checkFlags(SITUATIONS, []).missed).toEqual(dangerous);
    const r = checkFlags(SITUATIONS, ['an-uong', 'bao-ho']);
    expect(r.found).toEqual(['an-uong']);
    expect(r.wrong).toEqual(['bao-ho']);
    expect(r.dangerous).toBe(dangerous.length);
    expect(r.perfect).toBe(false);
  });
});
