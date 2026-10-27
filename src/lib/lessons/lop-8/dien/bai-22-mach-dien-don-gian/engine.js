/**
 * A one-loop circuit with four slots, taken clockwise round the loop. Each
 * slot holds a part or is empty. A polar part (pin, LED) is `flipped` when
 * it faces counter-clockwise: an unflipped pin drives current clockwise, an
 * unflipped LED lets current through only clockwise. The conventional current
 * leaves the positive terminal, runs through the wires and parts and comes
 * back to the negative terminal.
 */

/** @typedef {'pin' | 'cong-tac' | 'den' | 'chuong' | 'led' | 'dien-tro' | 'day'} PartKind */
/** @typedef {{ kind: PartKind, flipped?: boolean, closed?: boolean }} Part */
/** @typedef {Part | null} Slot */

/** @type {Record<PartKind, string>} */
export const PART_NAMES = {
  pin: 'Pin',
  'cong-tac': 'Công tắc',
  den: 'Bóng đèn',
  chuong: 'Chuông điện',
  led: 'Đèn LED',
  'dien-tro': 'Điện trở',
  day: 'Dây nối',
};

/** Parts that use the electric energy. */
const LOADS = new Set(['den', 'chuong', 'led', 'dien-tro']);

/**
 * @typedef {'khong-nguon' | 'pin-nguoc' | 'ho' | 'cong-tac-mo' | 'doan-mach' | 'led-nguoc' | 'kin'} LoopReason
 */

/**
 * Whether current flows and which way. The first problem found is reported,
 * in this order: no source, pins that cancel, an empty slot, an open switch,
 * a short circuit (no part uses the energy), an LED the wrong way round.
 * @param {Slot[]} slots
 * @returns {{ flowing: boolean, reason: LoopReason, clockwise: boolean }}
 */
export function evaluateLoop(slots) {
  const pins = slots.filter((s) => s?.kind === 'pin');
  const drive = pins.reduce((n, p) => n + (p?.flipped ? -1 : 1), 0);
  const clockwise = drive >= 0;
  /** @param {LoopReason} reason */
  const off = (reason) => ({ flowing: false, reason, clockwise });
  if (pins.length === 0) return off('khong-nguon');
  if (drive === 0) return off('pin-nguoc');
  if (slots.some((s) => s === null)) return off('ho');
  if (slots.some((s) => s?.kind === 'cong-tac' && !s.closed)) return off('cong-tac-mo');
  if (!slots.some((s) => s !== null && LOADS.has(s.kind))) {
    return { flowing: true, reason: 'doan-mach', clockwise };
  }
  const ledBlocks = slots.some(
    (s) => s?.kind === 'led' && (s.flipped ? -1 : 1) !== Math.sign(drive),
  );
  if (ledBlocks) return off('led-nguoc');
  return { flowing: true, reason: 'kin', clockwise };
}

/**
 * Names of the parts that work (đèn sáng, chuông kêu, LED sáng) for a loop.
 * @param {Slot[]} slots
 * @returns {number[]} indices of the slots whose part works
 */
export function workingParts(slots) {
  const { reason } = evaluateLoop(slots);
  if (reason !== 'kin') return [];
  return slots.flatMap((s, i) => (s && ['den', 'chuong', 'led'].includes(s.kind) ? [i] : []));
}
