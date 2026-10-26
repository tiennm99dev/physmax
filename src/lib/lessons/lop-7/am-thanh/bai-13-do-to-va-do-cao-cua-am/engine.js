/**
 * A sound generator feeding an oscilloscope: the frequency f (Hz) sets the
 * pitch and whether the ear can hear the sound at all, the amplitude sets
 * the loudness. The screen shows u(t) = A·sin(2πft) over ten time divisions.
 */

export const FREQ_MIN = 5;
export const FREQ_MAX = 40000;
/** Positions of the frequency slider, which runs on a logarithmic scale. */
export const SLIDER_STEPS = 1000;
/** The human ear hears from about 20 Hz to about 20 000 Hz. */
export const HEARING_MIN = 20;
export const HEARING_MAX = 20000;
/** Divisions across the oscilloscope screen. */
export const DIVISIONS = 10;

/** Time bases of the oscilloscope, in milliseconds per division. */
export const TIME_BASES = [0.1, 1, 10, 100];

/**
 * Rounds a frequency the way a generator dial reads: whole hertz below
 * 100 Hz, tens below 1 000 Hz, hundreds above.
 * @param {number} f
 */
export function roundFrequency(f) {
  const unit = f < 100 ? 1 : f < 1000 ? 10 : 100;
  return Math.round(f / unit) * unit;
}

/**
 * Frequency for a slider position 0…SLIDER_STEPS on a logarithmic scale.
 * @param {number} position
 */
export function sliderToFrequency(position) {
  const p = Math.min(Math.max(position, 0), SLIDER_STEPS) / SLIDER_STEPS;
  return roundFrequency(FREQ_MIN * (FREQ_MAX / FREQ_MIN) ** p);
}

/**
 * Slider position nearest to a frequency.
 * @param {number} f
 */
export function frequencyToSlider(f) {
  const p = Math.log(f / FREQ_MIN) / Math.log(FREQ_MAX / FREQ_MIN);
  return Math.round(Math.min(Math.max(p, 0), 1) * SLIDER_STEPS);
}

/**
 * Hạ âm below 20 Hz, siêu âm above 20 000 Hz, âm nghe được in between.
 * @param {number} f
 * @returns {'ha-am' | 'nghe-duoc' | 'sieu-am'}
 */
export function classify(f) {
  if (f < HEARING_MIN) return 'ha-am';
  if (f > HEARING_MAX) return 'sieu-am';
  return 'nghe-duoc';
}

/**
 * Frequency from a count of vibrations and the time they took.
 * @param {number} vibrations
 * @param {number} seconds
 */
export function frequencyOf(vibrations, seconds) {
  return vibrations / seconds;
}

/**
 * How many whole and partial vibrations fit on the screen.
 * @param {number} f
 * @param {number} msPerDivision
 */
export function cyclesOnScreen(f, msPerDivision) {
  return (f * DIVISIONS * msPerDivision) / 1000;
}

/**
 * The time base that shows between 2 and 20 vibrations, preferring the one
 * closest to 5; the largest base when even that shows too few.
 * @param {number} f
 */
export function bestTimeBase(f) {
  let best = TIME_BASES[TIME_BASES.length - 1];
  let score = Infinity;
  for (const base of TIME_BASES) {
    const n = cyclesOnScreen(f, base);
    if (n < 2 || n > 20) continue;
    const s = Math.abs(Math.log(n / 5));
    if (s < score) {
      score = s;
      best = base;
    }
  }
  return best;
}

/**
 * `count + 1` samples of the trace across the screen, with x from 0 to
 * DIVISIONS and u in amplitude divisions.
 * @param {number} f
 * @param {number} amplitude
 * @param {number} msPerDivision
 * @param {number} [count]
 */
export function trace(f, amplitude, msPerDivision, count = 400) {
  const out = [];
  for (let i = 0; i <= count; i++) {
    const x = (DIVISIONS * i) / count;
    const t = (x * msPerDivision) / 1000;
    out.push({ x, u: amplitude * Math.sin(2 * Math.PI * f * t) });
  }
  return out;
}

/**
 * Compares a sound with a reference: which is higher (by frequency) and which
 * is louder (by amplitude). Each answer is 1 (this one), -1 (the reference)
 * or 0 (same).
 * @param {{ f: number, amplitude: number }} a
 * @param {{ f: number, amplitude: number }} ref
 */
export function compareSounds(a, ref) {
  return {
    pitch: Math.sign(a.f - ref.f),
    loudness: Math.sign(a.amplitude - ref.amplitude),
  };
}
