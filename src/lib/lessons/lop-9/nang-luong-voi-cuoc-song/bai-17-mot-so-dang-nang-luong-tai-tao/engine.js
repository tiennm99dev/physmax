/**
 * A simplified electricity plan for a province. The learner builds clusters
 * of renewable plants; each cluster gives a share of the province's daytime
 * demand (taken as 100) that depends on the time of day and on the season.
 * The figures are made up for the game, chosen to show how terrain and weather
 * shape a mix: sunlight stops at night, rivers run low in the dry season.
 */

/** @typedef {[number, number, number, number]} ByCondition output in the four conditions of `CONDITIONS` */
/** @typedef {{ id: string, name: string, plus: string, minus: string }} Source */
/** @typedef {{ max: number, cost: number, output: ByCondition, note: string }} Site */
/** @typedef {{ id: string, label: string, about: string, budget: number, sites: Record<string, Site> }} Province */
/** @typedef {Record<string, number>} Mix clusters built, by source id */

/** Time and season of each output; `night` and `dry` explain a shortfall. */
export const CONDITIONS = [
  { id: 'ngay-mua', label: 'Ngày, mùa mưa', night: false, dry: false },
  { id: 'dem-mua', label: 'Đêm, mùa mưa', night: true, dry: false },
  { id: 'ngay-kho', label: 'Ngày, mùa khô', night: false, dry: true },
  { id: 'dem-kho', label: 'Đêm, mùa khô', night: true, dry: true },
];

/** Electricity the province needs: less at night. Same order as `CONDITIONS`. */
export const DEMAND = /** @type {ByCondition} */ ([100, 60, 100, 60]);

/** @type {Source[]} */
export const SOURCES = [
  {
    id: 'mat-troi',
    name: 'Mặt Trời',
    plus: 'Luôn có sẵn, khó cạn kiệt, không gây tiếng ồn, không thải khí nhà kính khi hoạt động.',
    minus:
      'Chi phí cao, chiếm nhiều diện tích; pin hết hạn thành rác thải điện tử; ban đêm không phát điện.',
  },
  {
    id: 'gio',
    name: 'Gió',
    plus: 'Luôn có sẵn, không thải khí nhà kính khi hoạt động, có triển vọng lớn ở ngoài khơi.',
    minus: 'Đầu tư ban đầu cao, gây tiếng ồn, ảnh hưởng đến chim di cư và dơi; lúc có lúc không.',
  },
  {
    id: 'song',
    name: 'Dòng sông',
    plus: 'Hiệu suất tạo điện cao hơn điện Mặt Trời và điện gió; hồ chứa điều tiết được điện cả ngày đêm.',
    minus:
      'Đập làm mất rừng, cản đường di chuyển của cá, buộc di dời dân cư; vỡ đập gây lũ lụt lớn; mùa khô ít nước.',
  },
  {
    id: 'sinh-khoi',
    name: 'Sinh khối',
    plus: 'Tận dụng rơm, trấu, bã mía, gỗ vụn; chủ động phát điện cả ngày đêm.',
    minus: 'Đốt vẫn thải khói và khí gây ô nhiễm; lượng nguyên liệu có hạn.',
  },
  {
    id: 'dia-nhiet',
    name: 'Địa nhiệt',
    plus: 'Ổn định cả ngày đêm, quanh năm; chiếm ít đất.',
    minus: 'Chỉ có ở một số nơi, khoan sâu rất tốn kém; có thể làm rò rỉ khí độc từ lòng đất.',
  },
  {
    id: 'song-bien',
    name: 'Sóng biển',
    plus: 'Luôn có sẵn, không tạo chất thải.',
    minus:
      'Hiệu suất thấp, đầu tư cao; cản trở giao thông đường biển, phụ thuộc mùa, chịu ảnh hưởng của thiên tai.',
  },
];

const NONE = /** @type {ByCondition} */ ([0, 0, 0, 0]);

/** @type {Province[]} */
export const PROVINCES = [
  {
    id: 've-bien',
    label: 'Ven biển',
    about:
      'Tỉnh ven biển khô hạn: nhiều nắng, gió mạnh quanh năm, không có sông lớn và rất ít cây trồng.',
    budget: 30,
    sites: {
      'mat-troi': { max: 6, cost: 3, output: [10, 0, 20, 0], note: 'Nhiều nắng, nhất là mùa khô.' },
      gio: {
        max: 5,
        cost: 4,
        output: [15, 15, 25, 25],
        note: 'Gió mạnh ngày và đêm, nhất là mùa khô.',
      },
      song: { max: 0, cost: 5, output: NONE, note: 'Không có sông lớn để làm thuỷ điện.' },
      'sinh-khoi': {
        max: 2,
        cost: 3,
        output: [10, 10, 10, 10],
        note: 'Ít phụ phẩm nông nghiệp nên chỉ có vài cụm.',
      },
      'dia-nhiet': { max: 0, cost: 6, output: NONE, note: 'Không có vùng địa nhiệt thuận lợi.' },
      'song-bien': {
        max: 2,
        cost: 6,
        output: [6, 6, 10, 10],
        note: 'Có sóng nhưng đầu tư tốn kém.',
      },
    },
  },
  {
    id: 'mien-nui',
    label: 'Miền núi',
    about:
      'Tỉnh miền núi: sông dốc, mùa mưa nhiều nước nhưng mùa khô cạn; ít gió, nhiều rừng và có suối nước nóng.',
    budget: 40,
    sites: {
      'mat-troi': {
        max: 4,
        cost: 3,
        output: [8, 0, 16, 0],
        note: 'Mùa mưa nhiều mây, mùa khô nắng hơn.',
      },
      gio: {
        max: 1,
        cost: 4,
        output: [5, 5, 8, 8],
        note: 'Ít gió, chỉ có vài đỉnh đèo thuận lợi.',
      },
      song: {
        max: 5,
        cost: 5,
        output: [25, 25, 8, 8],
        note: 'Rất mạnh vào mùa mưa, yếu đi nhiều vào mùa khô.',
      },
      'sinh-khoi': {
        max: 3,
        cost: 3,
        output: [10, 10, 10, 10],
        note: 'Có gỗ vụn và phụ phẩm nông lâm nghiệp.',
      },
      'dia-nhiet': {
        max: 1,
        cost: 6,
        output: [12, 12, 12, 12],
        note: 'Có suối nước nóng, ổn định nhưng khoan tốn kém.',
      },
      'song-bien': { max: 0, cost: 6, output: NONE, note: 'Không có biển.' },
    },
  },
  {
    id: 'dong-bang',
    label: 'Đồng bằng',
    about:
      'Tỉnh đồng bằng trồng lúa, giáp biển: nhiều rơm, trấu; nắng tốt; có gió ở dải ven biển; sông phẳng, không có độ dốc.',
    budget: 32,
    sites: {
      'mat-troi': {
        max: 6,
        cost: 3,
        output: [10, 0, 18, 0],
        note: 'Nắng tốt, nhưng đất lúa nên diện tích có hạn.',
      },
      gio: { max: 3, cost: 4, output: [10, 10, 18, 18], note: 'Có gió ở dải ven biển.' },
      song: {
        max: 0,
        cost: 5,
        output: NONE,
        note: 'Sông phẳng, không đủ độ dốc để làm thuỷ điện.',
      },
      'sinh-khoi': {
        max: 5,
        cost: 3,
        output: [10, 10, 12, 12],
        note: 'Nhiều rơm, trấu, nhất là sau vụ gặt mùa khô.',
      },
      'dia-nhiet': { max: 0, cost: 6, output: NONE, note: 'Không có vùng địa nhiệt thuận lợi.' },
      'song-bien': { max: 1, cost: 6, output: [4, 4, 8, 8], note: 'Biển nông, sóng yếu.' },
    },
  },
];

/**
 * @param {string} id
 * @returns {Province}
 */
export function provinceOf(id) {
  const province = PROVINCES.find((p) => p.id === id);
  if (!province) throw new Error(`no province ${id}`);
  return province;
}

/**
 * Electricity supplied in each of the four conditions.
 * @param {Province} province @param {Mix} mix
 * @returns {number[]}
 */
export function supply(province, mix) {
  return CONDITIONS.map((_, c) =>
    SOURCES.reduce((sum, s) => sum + province.sites[s.id].output[c] * (mix[s.id] ?? 0), 0),
  );
}

/**
 * Total cost of the plants built.
 * @param {Province} province @param {Mix} mix
 */
export function cost(province, mix) {
  return SOURCES.reduce((sum, s) => sum + province.sites[s.id].cost * (mix[s.id] ?? 0), 0);
}

/**
 * How a plan stands: the conditions it leaves short (with how much is
 * missing), whether it is over budget and whether it meets the goal.
 * @param {Province} province @param {Mix} mix
 */
export function judge(province, mix) {
  const out = supply(province, mix);
  const short = CONDITIONS.map((condition, c) => ({
    condition,
    missing: DEMAND[c] - out[c],
  })).filter((s) => s.missing > 0);
  const total = cost(province, mix);
  const over = total > province.budget;
  return { out, short, total, over, ok: short.length === 0 && !over };
}

/**
 * Why the plan falls short, or what its sources cost the environment.
 * @param {Province} province @param {Mix} mix
 * @returns {{ tone: 'ok' | 'warn' | 'info', text: string }}
 */
export function advise(province, mix) {
  const built = SOURCES.filter((s) => (mix[s.id] ?? 0) > 0);
  if (built.length === 0) {
    return {
      tone: 'info',
      text: 'Chưa có nhà máy nào. Đọc đặc điểm của tỉnh, rồi bấm + để xây cụm nhà máy từ nguồn phù hợp.',
    };
  }
  const { short, total, ok } = judge(province, mix);
  if (ok) {
    const names = built.map((s) => s.name).join(', ');
    const drawbacks = built.map((s) => `${s.name}: ${lower(s.minus)}`).join(' ');
    return {
      tone: 'ok',
      text: `Đạt! Tổ hợp ${names} đủ điện trong cả bốn tình huống với chi phí ${total}/${province.budget}. Vẫn cần lưu ý nhược điểm. ${drawbacks}`,
    };
  }
  if (short.length > 0) {
    const worst = short.reduce((a, b) => (b.missing > a.missing ? b : a));
    return {
      tone: 'warn',
      text: `Thiếu ${worst.missing} phần điện lúc ${worst.condition.label.toLowerCase()}. ${reason(worst.condition, mix)}`,
    };
  }
  return {
    tone: 'warn',
    text: `Đã đủ điện nhưng chi phí ${total} vượt ngân sách ${province.budget}. Hãy bớt nguồn đang dư hoặc thay bằng nguồn rẻ hơn.`,
  };
}

/** @param {string} text */
const lower = (text) => text.charAt(0).toLowerCase() + text.slice(1);

/**
 * @param {{ night: boolean, dry: boolean }} condition @param {Mix} mix
 */
function reason(condition, mix) {
  if (condition.night && (mix['mat-troi'] ?? 0) > 0) {
    return 'Ban đêm pin Mặt Trời không phát điện, nên cần thêm nguồn chạy được cả đêm.';
  }
  if (condition.dry && (mix.song ?? 0) > 0) {
    return 'Mùa khô sông ít nước nên thuỷ điện giảm mạnh; hãy bù bằng nguồn không phụ thuộc lượng mưa.';
  }
  if (condition.night) return 'Hãy thêm nguồn chạy được cả đêm.';
  return 'Hãy thêm nguồn phù hợp với đặc điểm của tỉnh.';
}

/**
 * Every plan within the site limits that meets the goal.
 * @param {Province} province
 * @returns {Mix[]}
 */
export function solutions(province) {
  /** @type {Mix[]} */
  let plans = [{}];
  for (const s of SOURCES) {
    const next = [];
    for (const plan of plans) {
      for (let n = 0; n <= province.sites[s.id].max; n += 1) next.push({ ...plan, [s.id]: n });
    }
    plans = next;
  }
  return plans.filter((plan) => judge(province, plan).ok);
}

/**
 * Scale for the supply bars: width in % for a value, so twice the demand
 * fills the bar and the demand mark stays in view.
 * @param {number} value @param {number} full
 */
export function barWidth(value, full = 200) {
  return Math.min(100, (value / full) * 100);
}
