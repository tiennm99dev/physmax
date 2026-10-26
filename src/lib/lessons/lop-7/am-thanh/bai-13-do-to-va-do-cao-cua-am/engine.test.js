import { describe, expect, it } from 'vitest';
import {
  FREQ_MAX,
  FREQ_MIN,
  SLIDER_STEPS,
  bestTimeBase,
  classify,
  compareSounds,
  cyclesOnScreen,
  frequencyOf,
  frequencyToSlider,
  roundFrequency,
  sliderToFrequency,
  trace,
} from './engine.js';

describe('frequency slider', () => {
  it('spans the generator range at both ends', () => {
    expect(sliderToFrequency(0)).toBe(FREQ_MIN);
    expect(sliderToFrequency(SLIDER_STEPS)).toBe(FREQ_MAX);
  });

  it('round-trips a frequency through the slider', () => {
    for (const f of [20, 440, 1000, 20000]) {
      expect(sliderToFrequency(frequencyToSlider(f)) / f).toBeCloseTo(1, 1);
    }
  });

  it('rounds like a dial', () => {
    expect(roundFrequency(17.4)).toBe(17);
    expect(roundFrequency(443)).toBe(440);
    expect(roundFrequency(12345)).toBe(12300);
  });
});

describe('ranges of sound', () => {
  it('classifies infrasound, audible sound and ultrasound', () => {
    expect(classify(10)).toBe('ha-am');
    expect(classify(20)).toBe('nghe-duoc');
    expect(classify(20000)).toBe('nghe-duoc');
    expect(classify(30000)).toBe('sieu-am');
  });
});

describe('frequency', () => {
  it('is the number of vibrations in one second', () => {
    expect(frequencyOf(200, 2)).toBe(100);
    expect(frequencyOf(20, 10)).toBe(2);
  });

  it('counts the vibrations on screen', () => {
    expect(cyclesOnScreen(440, 1)).toBeCloseTo(4.4);
    expect(cyclesOnScreen(50, 10)).toBeCloseTo(5);
  });

  it('picks a time base that shows a few vibrations', () => {
    expect(bestTimeBase(440)).toBe(1);
    expect(bestTimeBase(50)).toBe(10);
    expect(bestTimeBase(5000)).toBe(0.1);
    expect(bestTimeBase(5)).toBe(100);
  });
});

describe('oscilloscope trace', () => {
  it('peaks at the amplitude a quarter period in', () => {
    // 250 Hz at 1 ms per division: one period is 4 divisions.
    const pts = trace(250, 3, 1, 40);
    expect(pts[0].u).toBeCloseTo(0);
    expect(pts[4].u).toBeCloseTo(3);
    expect(pts[12].u).toBeCloseTo(-3);
    expect(pts[40].x).toBe(10);
  });
});

describe('comparing two sounds', () => {
  it('ranks pitch by frequency and loudness by amplitude', () => {
    expect(compareSounds({ f: 880, amplitude: 2 }, { f: 440, amplitude: 3 })).toEqual({
      pitch: 1,
      loudness: -1,
    });
    expect(compareSounds({ f: 440, amplitude: 3 }, { f: 440, amplitude: 3 })).toEqual({
      pitch: 0,
      loudness: 0,
    });
  });
});
