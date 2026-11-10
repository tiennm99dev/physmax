import { describe, expect, it } from 'vitest';
import { sciParts, sciTex, sciText } from './sci.js';

describe('powers of ten', () => {
  it('splits a value into mantissa and exponent', () => {
    expect(sciParts(3e8)).toEqual({ mantissa: 3, exponent: 8 });
    expect(sciParts(6.25e-7)).toEqual({ mantissa: 6.25, exponent: -7 });
    expect(sciParts(9.999e5)).toEqual({ mantissa: 1, exponent: 6 });
  });

  it('writes text and TeX the book way', () => {
    expect(sciText(3e8)).toBe('3·10⁸');
    expect(sciText(6.25e-7)).toBe('6,25·10⁻⁷');
    expect(sciText(1e-12)).toBe('10⁻¹²');
    expect(sciText(0.5)).toBe('0,5');
    expect(sciText(1000)).toBe('1\u202f000');
    expect(sciTex(2500)).toBe('2\\,500');
    expect(sciTex(3e8)).toBe('3 \\cdot 10^{8}');
    expect(sciTex(1.5e-10)).toBe('1{,}5 \\cdot 10^{-10}');
    expect(sciTex(250)).toBe('250');
  });
});
