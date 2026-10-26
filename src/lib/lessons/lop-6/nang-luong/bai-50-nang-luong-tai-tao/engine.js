/**
 * A small virtual city powered by renewable sources. The learner places solar
 * panels, wind turbines and a hydro dam on map tiles; each source's output
 * depends on the tile and on nature (sun, wind, season), so no single source
 * covers the city all the time. Whatever the renewables cannot supply has to
 * come from a coal-fired plant, which burns a fossil fuel.
 *
 * Outputs are in megawatts (MW), rounded, illustrative figures.
 */

/** @typedef {'doi' | 'mai-nha' | 'song' | 'dat' | 'bo-bien'} TileKind */
/** @typedef {'pin' | 'gio' | 'thuy-dien'} SourceId */
/** @typedef {'nang' | 'may' | 'dem'} Sky */
/** @typedef {'manh' | 'nhe' | 'lang'} Wind */
/** @typedef {'mua' | 'kho'} Season */
/** @typedef {{ sky: Sky, wind: Wind, season: Season }} Conditions */
/** @typedef {Record<number, SourceId>} Placements tile index → source */

/** @type {Record<TileKind, string>} */
export const TILE_NAMES = {
  doi: 'Đồi lộng gió',
  'mai-nha': 'Mái nhà',
  song: 'Sông có thác',
  dat: 'Bãi đất trống',
  'bo-bien': 'Bờ biển',
};

/** Map tiles, row by row, four to a row. @type {TileKind[]} */
export const TILES = [
  'doi',
  'doi',
  'mai-nha',
  'mai-nha',
  'song',
  'dat',
  'mai-nha',
  'bo-bien',
  'dat',
  'dat',
  'dat',
  'bo-bien',
];

/** @type {Record<SourceId, string>} */
export const SOURCE_NAMES = {
  pin: 'Pin Mặt Trời',
  gio: 'Tua bin gió',
  'thuy-dien': 'Thuỷ điện',
};

/** City demand in MW: more by day than by night. */
export const DEMAND = { day: 100, night: 80 };

/**
 * Whether a source can be built on a tile, and why not.
 * @param {SourceId} source @param {TileKind} kind
 * @returns {{ ok: boolean, why: string }}
 */
export function canPlace(source, kind) {
  if (source === 'thuy-dien') {
    return kind === 'song'
      ? { ok: true, why: '' }
      : {
          ok: false,
          why: 'Nhà máy thuỷ điện cần dòng sông có độ dốc, nơi có thể đắp đập giữ nước trên cao.',
        };
  }
  if (kind === 'song') {
    return { ok: false, why: 'Không lắp được trên mặt sông; chỗ này hợp với thuỷ điện.' };
  }
  if (source === 'gio' && kind === 'mai-nha') {
    return { ok: false, why: 'Tua bin gió rất lớn, không dựng được trên mái nhà trong thành phố.' };
  }
  return { ok: true, why: '' };
}

/**
 * Output of one source on one tile under the given conditions, in MW.
 * @param {SourceId} source @param {TileKind} kind @param {Conditions} c
 */
export function output(source, kind, c) {
  if (!canPlace(source, kind).ok) return 0;
  if (source === 'pin') return { nang: 10, may: 4, dem: 0 }[c.sky];
  if (source === 'gio') {
    const base = { manh: 12, nhe: 5, lang: 0 }[c.wind];
    // Hills and the coast are windier than open ground in town.
    return kind === 'doi' || kind === 'bo-bien' ? base : base / 2;
  }
  return c.season === 'mua' ? 30 : 15;
}

/**
 * Total output of the city's sources against its demand.
 * @param {Placements} placements @param {Conditions} c
 */
export function cityOutput(placements, c) {
  /** @type {Record<SourceId, number>} */
  const by = { pin: 0, gio: 0, 'thuy-dien': 0 };
  for (const [i, source] of Object.entries(placements)) {
    by[source] += output(source, TILES[Number(i)], c);
  }
  const total = by.pin + by.gio + by['thuy-dien'];
  const demand = c.sky === 'dem' ? DEMAND.night : DEMAND.day;
  return {
    by,
    total,
    demand,
    shortfall: Math.max(0, demand - total),
    surplus: Math.max(0, total - demand),
  };
}
