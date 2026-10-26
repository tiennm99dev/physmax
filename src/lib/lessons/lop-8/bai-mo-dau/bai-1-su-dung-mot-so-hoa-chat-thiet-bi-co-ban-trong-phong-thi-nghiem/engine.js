/**
 * The virtual lab bench: a power supply (biến áp nguồn), a switch and a
 * 3 V bulb, plus one measuring device the learner picks and wires in. Each
 * mission asks for one measurement; `evaluate` says what really happens with
 * the chosen setup (the bulb, the needle, the reading) and why.
 *
 * The bulb is an ideal 3 V – 0,5 A lamp (6 Ω); the ammeter has a negligible
 * resistance and the voltmeter a very large one, as the book says.
 */
import { formatNumber } from '#lib/core/number-format.js';

/** Rated voltage of the bulb, in volts. */
export const BULB_VOLTS = 3;
/** Resistance of the bulb at its rated voltage, in ohms. */
export const BULB_OHMS = 6;

/** Output voltages the power supply offers, in volts. */
export const SOURCE_VOLTS = [3, 6, 9, 12];

/**
 * @typedef {'ampe-ke' | 'von-ke' | 'joulemeter'} MeterId
 * @typedef {'noi-tiep' | 'song-song'} Position
 * @typedef {'dung' | 'nguoc'} Polarity
 * @typedef {{ name: string, symbol: string, unit: string, measures: string, ranges: number[] }} Meter
 */

/** @type {Record<MeterId, Meter>} */
export const METERS = {
  'ampe-ke': {
    name: 'Ampe kế',
    symbol: 'A',
    unit: 'A',
    measures: 'cường độ dòng điện',
    ranges: [0.3, 0.6, 3],
  },
  'von-ke': {
    name: 'Vôn kế',
    symbol: 'V',
    unit: 'V',
    measures: 'hiệu điện thế',
    ranges: [1.5, 6, 15],
  },
  joulemeter: {
    name: 'Joulemeter',
    symbol: 'J',
    unit: 'J',
    measures: 'dòng điện, điện áp, công suất và năng lượng điện cung cấp cho mạch',
    ranges: [],
  },
};

/**
 * @typedef {{ id: string, title: string, meter: MeterId, position: Position }} Mission
 */

/** @type {Mission[]} */
export const MISSIONS = [
  {
    id: 'cuong-do',
    title: 'Đo cường độ dòng điện chạy qua bóng đèn',
    meter: 'ampe-ke',
    position: 'noi-tiep',
  },
  {
    id: 'hieu-dien-the',
    title: 'Đo hiệu điện thế giữa hai đầu bóng đèn',
    meter: 'von-ke',
    position: 'song-song',
  },
  {
    id: 'nang-luong',
    title: 'Đo năng lượng điện cung cấp cho bóng đèn',
    meter: 'joulemeter',
    position: 'noi-tiep',
  },
];

/**
 * @typedef {object} Setup
 * @property {'dc' | 'ac'} kind output function of the power supply
 * @property {number} volts output voltage
 * @property {MeterId} meter
 * @property {Position} position
 * @property {Polarity} polarity
 * @property {number} range chosen full-scale value; ignored for the joulemeter
 */

/**
 * @typedef {object} Outcome
 * @property {'ok' | 'warn' | 'fail'} tone ok: right measurement; warn: right but coarse range
 * @property {'on' | 'off' | 'burnt'} bulb
 * @property {number | null} needle needle position as a fraction of full scale
 *   (below 0 or above 1 means it is pinned past the end); null for the joulemeter
 * @property {number | null} value what the device reads (A or V), null when nothing sensible
 * @property {number | null} power power supplied to the bulb in watts, joulemeter only
 * @property {string} text the explanation shown to the learner
 */

/** Current through the bulb on the rated supply, in amperes. */
export const BULB_AMPS = BULB_VOLTS / BULB_OHMS;

/**
 * The smallest full-scale value that still fits `value`, or null.
 * @param {number[]} ranges @param {number} value
 */
export function bestRange(ranges, value) {
  const fit = ranges.filter((r) => r >= value);
  return fit.length ? Math.min(...fit) : null;
}

/**
 * Energy a joulemeter shows after `seconds` of closed circuit, in joules.
 * @param {number} power watts @param {number} seconds
 */
export function energyAfter(power, seconds) {
  return Math.round(power * seconds * 1000) / 1000;
}

/**
 * What happens on the bench for one mission and one setup.
 * @param {Mission} mission @param {Setup} setup
 * @returns {Outcome}
 */
export function evaluate(mission, setup) {
  const meter = METERS[setup.meter];
  const analog = setup.meter !== 'joulemeter';
  /** @param {Partial<Outcome> & { tone: Outcome['tone'], text: string }} o @returns {Outcome} */
  const out = (o) => ({ bulb: 'on', needle: analog ? 0 : null, value: null, power: null, ...o });

  if (setup.kind === 'ac') {
    return out({
      tone: 'fail',
      text: 'Biến áp nguồn đang ở chức năng xoay chiều (AC). Hướng dẫn yêu cầu nguồn một chiều: ampe kế, vôn kế có chốt (+), (−) chỉ đo đúng dòng điện một chiều. Chọn đúng chức năng DC.',
    });
  }
  if (setup.volts > BULB_VOLTS) {
    return out({
      tone: 'fail',
      bulb: 'burnt',
      text: `Bóng đèn ${BULB_VOLTS} V bị cấp ${setup.volts} V, lớn hơn hiệu điện thế định mức: đèn sáng chói rồi đứt dây tóc, mạch hở. Chọn đúng điện áp ${BULB_VOLTS} V.`,
    });
  }

  if (setup.meter === 'ampe-ke' && setup.position === 'song-song') {
    return out({
      tone: 'fail',
      bulb: 'off',
      needle: 1.15,
      text: 'Ampe kế có điện trở không đáng kể, mắc song song với đèn là nối tắt (đoản mạch) đèn: đèn tắt, dòng điện rất lớn chạy qua ampe kế, kim vượt quá thang đo và có thể làm hỏng ampe kế, nguồn. Ampe kế phải mắc nối tiếp.',
    });
  }
  if (setup.meter === 'von-ke' && setup.position === 'noi-tiep') {
    return out({
      tone: 'fail',
      bulb: 'off',
      needle: setup.volts / setup.range,
      value: setup.volts,
      text: `Vôn kế có điện trở rất lớn, mắc nối tiếp làm dòng điện gần như bằng 0: đèn không sáng, vôn kế chỉ khoảng ${volt(setup.volts)} của nguồn chứ không phải hiệu điện thế của đèn. Vôn kế phải mắc song song với đèn.`,
    });
  }
  if (setup.meter === 'joulemeter' && setup.position === 'song-song') {
    return out({
      tone: 'fail',
      power: 0,
      text: 'Joulemeter mắc song song với đèn thì dòng điện cung cấp cho đèn không đi qua nó, nên nó chỉ 0. Joulemeter phải nằm giữa nguồn và mạch: chốt vào nối với nguồn, chốt ra nối với bóng đèn.',
    });
  }
  if (setup.polarity === 'nguoc') {
    if (!analog) {
      return out({
        tone: 'fail',
        power: 0,
        text: 'Đảo chốt vào và chốt ra của joulemeter: nguồn phải nối với chốt vào (INPUT), mạch điện nối với chốt ra (OUTPUT). Mắc ngược thì joulemeter không đo được năng lượng cung cấp cho mạch.',
      });
    }
    return out({
      tone: 'fail',
      needle: -0.15,
      text: `Chốt (+) của ${meter.name.toLowerCase()} đang nối về phía cực (−) của nguồn: kim lệch ngược chiều, có thể cong kim, hỏng ${meter.name.toLowerCase()}. Chốt (+) phải nối về phía cực (+) của nguồn.`,
    });
  }

  if (setup.meter !== mission.meter) {
    const right = METERS[mission.meter];
    return out({
      tone: 'fail',
      needle: analog ? reading(setup.meter) / setup.range : null,
      value: analog ? reading(setup.meter) : null,
      power: analog ? null : BULB_VOLTS * BULB_AMPS,
      text: `Mắc đúng cách, nhưng ${meter.name.toLowerCase()} đo ${meter.measures}. Nhiệm vụ này cần ${right.name.toLowerCase()}, dụng cụ đo ${right.measures}.`,
    });
  }

  if (!analog) {
    return out({
      tone: 'ok',
      power: BULB_VOLTS * BULB_AMPS,
      text: 'Đúng! Nguồn nối với chốt vào, bóng đèn nối với chốt ra của joulemeter. Màn hình hiện hiệu điện thế, cường độ dòng điện, công suất và năng lượng điện đã cung cấp cho đèn, tăng dần theo thời gian đóng mạch.',
    });
  }

  const value = reading(setup.meter);
  if (value > setup.range) {
    return out({
      tone: 'fail',
      needle: 1.15,
      text: `Giá trị cần đo khoảng ${unitText(value, meter.unit)}, lớn hơn giới hạn đo ${unitText(setup.range, meter.unit)}: kim vượt quá thang đo, có thể hỏng dụng cụ. Chọn thang đo có giới hạn đo lớn hơn.`,
    });
  }
  const best = bestRange(meter.ranges, value);
  if (best !== setup.range) {
    return out({
      tone: 'warn',
      needle: value / setup.range,
      value,
      text: `Mắc đúng và đo được ${unitText(value, meter.unit)}, nhưng kim chỉ lệch rất ít trên thang ${unitText(setup.range, meter.unit)} nên khó đọc chính xác. Nên chọn thang ${unitText(best ?? setup.range, meter.unit)}: giới hạn đo nhỏ nhất mà vẫn lớn hơn giá trị cần đo.`,
    });
  }
  return out({
    tone: 'ok',
    needle: value / setup.range,
    value,
    text: `Đúng! ${meter.name} mắc ${setup.position === 'noi-tiep' ? 'nối tiếp' : 'song song'} với đèn, chốt (+) về phía cực (+) của nguồn, thang đo phù hợp. ${meter.name} chỉ ${unitText(value, meter.unit)}.`,
  });
}

/** @param {MeterId} id */
function reading(id) {
  return id === 'ampe-ke' ? BULB_AMPS : BULB_VOLTS;
}

/** @param {number} v */
function volt(v) {
  return unitText(v, 'V');
}

/**
 * A value with its unit, decimal comma.
 * @param {number} v @param {string} unit
 */
export function unitText(v, unit) {
  return `${formatNumber(v, 3)} ${unit}`;
}
