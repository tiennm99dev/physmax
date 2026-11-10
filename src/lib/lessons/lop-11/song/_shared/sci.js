/**
 * Very large and very small quantities written the book's way, as a mantissa
 * times a power of ten: 3·10⁸, 6·10⁻⁷, with a decimal comma in the mantissa.
 */
import { formatNumber, numTex, sup } from '#lib/core/number-format.js';

/**
 * Splits a positive value into a mantissa in [1, 10) rounded to `digits`
 * decimals and an exponent, carrying a mantissa that rounds up to 10.
 * @param {number} value @param {number} [digits]
 */
export function sciParts(value, digits = 2) {
  if (value === 0) return { mantissa: 0, exponent: 0 };
  let exponent = Math.floor(Math.log10(Math.abs(value)));
  let mantissa = Number((value / 10 ** exponent).toFixed(digits));
  if (Math.abs(mantissa) >= 10) {
    exponent += 1;
    mantissa = Number((value / 10 ** exponent).toFixed(digits));
  }
  return { mantissa, exponent };
}

/** @param {number} n */
const supSigned = (n) => (n < 0 ? `⁻${sup(-n)}` : sup(n));

/**
 * Plain text: 3e8 → '3·10⁸', 6.25e-7 → '6,25·10⁻⁷'. Values with an exponent
 * from −2 to 3 are written as ordinary decimals.
 * @param {number} value @param {number} [digits]
 */
export function sciText(value, digits = 2) {
  const { mantissa, exponent } = sciParts(value, digits);
  if (exponent >= -2 && exponent <= 3) return formatNumber(value, Math.max(0, digits - exponent));
  const m = formatNumber(mantissa, digits);
  return m === '1' ? `10${supSigned(exponent)}` : `${m}·10${supSigned(exponent)}`;
}

/**
 * TeX source: 3e8 → '3 \cdot 10^{8}', 6.25e-7 → '6{,}25 \cdot 10^{-7}', with
 * the same plain-decimal range as `sciText`.
 * @param {number} value @param {number} [digits]
 */
export function sciTex(value, digits = 2) {
  const { mantissa, exponent } = sciParts(value, digits);
  if (exponent >= -2 && exponent <= 3) return numTex(value, Math.max(0, digits - exponent));
  const m = numTex(mantissa, digits);
  return m === '1' ? `10^{${exponent}}` : `${m} \\cdot 10^{${exponent}}`;
}
