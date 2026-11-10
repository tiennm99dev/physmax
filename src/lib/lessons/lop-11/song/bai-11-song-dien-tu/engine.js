/**
 * A wavelength slider over the electromagnetic spectrum, on a log scale, and
 * a sorting game: each target radiation is given by its frequency, and the
 * learner slides the wavelength into the band it belongs to.
 */
import { BANDS, bandOf, wavelengthOf } from '../_shared/spectrum.js';

/** The slider runs over log10 of the wavelength in metres. */
export const EXP_MIN = -13;
export const EXP_MAX = 5;
export const EXP_STEP = 0.05;

/** Wavelength in metres for a slider position. @param {number} exp */
export const wavelengthAt = (exp) => 10 ** exp;

/**
 * Slider position, as a multiple of the step, for a wavelength.
 * @param {number} wavelength m
 */
export const exponentOf = (wavelength) => Math.round(Math.log10(wavelength) / EXP_STEP) * EXP_STEP;

/** Radiations to place, each given by its frequency in Hz. */
export const TARGETS = [
  { what: 'Sóng của đài phát thanh FM', frequency: 1e8 },
  { what: 'Sóng trong lò vi sóng', frequency: 2.45e9 },
  { what: 'Ánh sáng vàng của đèn natri', frequency: 5.1e14 },
  { what: 'Bức xạ dùng để chụp X-quang', frequency: 1e18 },
  { what: 'Bức xạ do cơ thể người phát ra', frequency: 3e13 },
  { what: 'Bức xạ của đèn diệt khuẩn', frequency: 1.2e15 },
  { what: 'Bức xạ của chất phóng xạ coban', frequency: 3e20 },
];

/**
 * The band a target belongs to.
 * @param {{ frequency: number }} target
 */
export const targetBand = (target) => bandOf(wavelengthOf(target.frequency));

/**
 * Whether the slider sits in the target's band.
 * @param {number} exp slider position @param {{ frequency: number }} target
 */
export function placed(exp, target) {
  const here = bandOf(wavelengthAt(exp));
  return here !== null && here.id === targetBand(target)?.id;
}

/**
 * Where each band starts and ends along the slider, as fractions from 0 to 1,
 * for drawing the scale.
 */
export const bandSpans = () =>
  BANDS.map((b) => ({
    band: b,
    start: Math.max(0, (Math.log10(b.from) - EXP_MIN) / (EXP_MAX - EXP_MIN)),
    end: Math.min(1, (Math.log10(b.to) - EXP_MIN) / (EXP_MAX - EXP_MIN)),
  }));
