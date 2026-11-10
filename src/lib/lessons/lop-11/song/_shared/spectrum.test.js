import { describe, expect, it } from 'vitest';
import { BANDS, bandOf, colorName, frequencyOf, visibleColor, wavelengthOf } from './spectrum.js';

describe('the electromagnetic spectrum', () => {
  it('has bands that meet end to end', () => {
    const gaps = BANDS.slice(1).filter((b, i) => b.from !== BANDS[i].to);
    expect(gaps).toEqual([]);
  });

  it('places the book examples in the right band', () => {
    expect(bandOf(wavelengthOf(200e3))?.id).toBe('vo-tuyen');
    expect(bandOf(wavelengthOf(1e8))?.id).toBe('vo-tuyen');
    expect(bandOf(wavelengthOf(5e14))?.id).toBe('nhin-thay');
    expect(bandOf(wavelengthOf(1e18))?.id).toBe('x');
    expect(bandOf(7e-6)?.id).toBe('hong-ngoai');
    expect(bandOf(wavelengthOf(2.45e9))?.id).toBe('vi-ba');
    expect(bandOf(1e5)?.id).toBe('vo-tuyen');
    expect(bandOf(1)?.id).toBe('vo-tuyen');
    expect(bandOf(1e-3)?.id).toBe('vi-ba');
    expect(bandOf(1e-16)).toBeNull();
  });

  it('turns wavelength into frequency and back', () => {
    expect(frequencyOf(3)).toBe(1e8);
    expect(wavelengthOf(1e6)).toBe(300);
  });

  it('colours visible light', () => {
    expect(visibleColor(700)).toBe('#ff0000');
    expect(visibleColor(530)).toMatch(/^#[0-9a-f]{6}$/);
    expect(colorName(650)).toBe('đỏ');
    expect(colorName(400)).toBe('tím');
    expect(colorName(550)).toBe('lục');
  });
});
