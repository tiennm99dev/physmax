/**
 * Data and pure state for the lab-safety lesson: situations with one safe way
 * to act, and the signs and device markings the learner sorts by meaning.
 */

/** @typedef {'dien' | 'nhiet' | 'quang' | 'su-co'} Domain */
/**
 * @typedef {'dc' | 'ac' | 'input' | 'output' | 'poles' | 'earth' | 'fragile' | 'upright' | 'no-sun'
 *   | 'no-bin' | 'electric' | 'flame' | 'laser' | 'hot' | 'magnet' | 'toxic' | 'no-fire' | 'no-food'
 *   | 'no-touch' | 'exit' | 'extinguisher'} SignName
 */
/** @typedef {{ text: string, safe: boolean, why: string }} Option */
/** @typedef {{ id: string, domain: Domain, sign: SignName, situation: string, options: Option[] }} Scenario */
/** @typedef {{ index: number, tried: number[][] }} Run */

/** @type {Record<Domain, string>} */
export const DOMAIN_LABELS = {
  dien: 'An toàn điện',
  nhiet: 'An toàn nhiệt',
  quang: 'An toàn quang',
  'su-co': 'Xử lí sự cố',
};

/** @type {Scenario[]} */
export const SCENARIOS = [
  {
    id: 'rut-phich',
    domain: 'dien',
    sign: 'electric',
    situation: 'Thí nghiệm đã xong, em cần rút nguồn của bộ thí nghiệm khỏi ổ cắm.',
    options: [
      {
        text: 'Kéo mạnh dây điện cho phích bật ra.',
        safe: false,
        why: 'Kéo dây có thể làm đứt dây, hở lõi và gây điện giật.',
      },
      {
        text: 'Tắt công tắc nguồn, rồi cầm vào thân nhựa của phích cắm để rút ra.',
        safe: true,
        why: 'Đúng: tắt nguồn trước, tay chỉ chạm vào phần cách điện của phích.',
      },
      {
        text: 'Rút khi thiết bị vẫn bật, tay giữ vào chân kim loại của phích.',
        safe: false,
        why: 'Chân kim loại dẫn điện: chạm vào đó rất dễ bị điện giật.',
      },
    ],
  },
  {
    id: 'bien-ap',
    domain: 'dien',
    sign: 'electric',
    situation: 'Cần cấp điện áp $6$ V cho mạch, nút chỉnh của máy biến áp đang để ở $12$ V.',
    options: [
      {
        text: 'Bật nguồn ngay rồi vặn nút từ $12$ V xuống $6$ V.',
        safe: false,
        why: 'Ngay lúc bật, mạch đã chịu $12$ V, gấp đôi mức cần dùng, nên có thể hỏng dụng cụ.',
      },
      {
        text: 'Để nguyên $12$ V vì điện áp cao thì thí nghiệm rõ hơn.',
        safe: false,
        why: 'Điện áp vượt mức cần dùng có thể làm cháy dụng cụ trong mạch.',
      },
      {
        text: 'Vặn nút về mức thấp nhất, bật nguồn, rồi tăng dần đến $6$ V.',
        safe: true,
        why: 'Đúng: tăng dần từ mức thấp để mạch không bị quá áp đột ngột.',
      },
    ],
  },
  {
    id: 'thang-do',
    domain: 'dien',
    sign: 'electric',
    situation: 'Em đo một dòng điện chưa biết độ lớn bằng đồng hồ đo điện đa năng.',
    options: [
      {
        text: 'Chọn thang đo lớn nhất, rồi giảm dần đến thang phù hợp.',
        safe: true,
        why: 'Đúng: dòng điện chưa biết thì bắt đầu từ thang lớn để không vượt giới hạn đo.',
      },
      {
        text: 'Chọn thang đo nhỏ nhất cho số đọc chính xác nhất.',
        safe: false,
        why: 'Dòng điện vượt giới hạn đo có thể làm hỏng đồng hồ, thậm chí gây chập cháy.',
      },
      {
        text: 'Để nguyên thang đo điện áp vì đồng hồ tự nhận biết.',
        safe: false,
        why: 'Phải chọn đúng chức năng trước khi đo; đo sai chức năng có thể hỏng đồng hồ.',
      },
    ],
  },
  {
    id: 'day-so',
    domain: 'dien',
    sign: 'electric',
    situation: 'Khi lắp mạch, em thấy một dây nối bị sờn, lộ lõi đồng.',
    options: [
      {
        text: 'Vẫn dùng, chỉ cần không chạm vào chỗ sờn.',
        safe: false,
        why: 'Chỗ hở có thể chạm vào vật khác gây chập mạch, hoặc chạm vào tay gây điện giật.',
      },
      {
        text: 'Quấn giấy quanh chỗ hở rồi dùng tiếp.',
        safe: false,
        why: 'Giấy không phải vật liệu cách điện đáng tin cậy, nhất là khi ẩm.',
      },
      {
        text: 'Không dùng dây đó, báo giáo viên để thay dây khác.',
        safe: true,
        why: 'Đúng: kiểm tra dụng cụ trước khi dùng và không dùng dây hỏng vỏ bọc.',
      },
    ],
  },
  {
    id: 'tat-den',
    domain: 'nhiet',
    sign: 'flame',
    situation: 'Đun nước xong, em cần tắt đèn cồn.',
    options: [
      {
        text: 'Thổi mạnh vào ngọn lửa.',
        safe: false,
        why: 'Thổi có thể làm lửa bùng hoặc bắt vào hơi cồn trong bầu đèn.',
      },
      {
        text: 'Đậy nắp đèn lên ngọn lửa.',
        safe: true,
        why: 'Đúng: nắp ngăn không khí nên lửa tắt an toàn.',
      },
      {
        text: 'Để đèn cháy đến hết cồn rồi đi làm việc khác.',
        safe: false,
        why: 'Không được để lửa cháy khi không có người trông coi.',
      },
    ],
  },
  {
    id: 'coc-nong',
    domain: 'nhiet',
    sign: 'hot',
    situation: 'Cần lấy chiếc cốc thuỷ tinh vừa đun nóng ra khỏi giá.',
    options: [
      {
        text: 'Nhấc bằng tay trần thật nhanh.',
        safe: false,
        why: 'Không chạm trực tiếp vào vật nóng khi không có dụng cụ bảo hộ, vì dễ bị bỏng.',
      },
      {
        text: 'Xối nước lạnh vào cốc cho nguội nhanh rồi cầm.',
        safe: false,
        why: 'Thuỷ tinh đang nóng gặp lạnh đột ngột dễ nứt vỡ.',
      },
      {
        text: 'Dùng kẹp hoặc găng tay cách nhiệt, đặt cốc lên chỗ chịu nhiệt cho nguội dần.',
        safe: true,
        why: 'Đúng: có dụng cụ bảo hộ và để thuỷ tinh nguội từ từ.',
      },
    ],
  },
  {
    id: 'laser',
    domain: 'quang',
    sign: 'laser',
    situation: 'Trong giờ thí nghiệm quang, một bạn cầm đèn laser quay về phía các bạn khác.',
    options: [
      {
        text: 'Nhìn thẳng vào đèn xem tia có đủ sáng không.',
        safe: false,
        why: 'Tia laser chiếu vào mắt có thể gây hại cho mắt.',
      },
      {
        text: 'Nhắc bạn tắt đèn; khi dùng chỉ chiếu lên màn, không hướng vào mắt ai.',
        safe: true,
        why: 'Đúng: giữ khoảng cách an toàn và không để tia hướng vào người.',
      },
      {
        text: 'Lấy gương phẳng hắt tia sang chỗ khác trong phòng.',
        safe: false,
        why: 'Tia phản xạ từ gương cũng nguy hiểm như tia chiếu thẳng.',
      },
    ],
  },
  {
    id: 'thau-kinh',
    domain: 'quang',
    sign: 'fragile',
    situation: 'Thấu kính bám bụi làm ảnh trên màn bị mờ.',
    options: [
      {
        text: 'Cầm vào vành, lau nhẹ bằng khăn mềm khô, dùng xong cất nơi khô ráo.',
        safe: true,
        why: 'Đúng: thấu kính dễ xước, dễ vỡ và dễ mốc khi để ẩm.',
      },
      {
        text: 'Chà mạnh mặt kính bằng vạt áo.',
        safe: false,
        why: 'Chà mạnh làm xước mặt kính, sai lệch đường truyền của ánh sáng.',
      },
      {
        text: 'Rửa bằng nước rồi cất ngay vào hộp kín khi còn ướt.',
        safe: false,
        why: 'Để ẩm làm thấu kính dễ bị mốc.',
      },
    ],
  },
  {
    id: 'dien-giat',
    domain: 'su-co',
    sign: 'electric',
    situation: 'Một bạn chạm vào dây hở và bị điện giật, tay vẫn dính vào dây.',
    options: [
      {
        text: 'Lấy tay kéo bạn ra thật nhanh.',
        safe: false,
        why: 'Cơ thể bạn đang có dòng điện chạy qua, chạm vào thì em cũng có thể bị giật.',
      },
      {
        text: 'Hắt nước vào chỗ dây hở.',
        safe: false,
        why: 'Nước dẫn điện, làm mọi người xung quanh thêm nguy hiểm.',
      },
      {
        text: 'Ngắt nguồn điện ngay bằng công tắc hoặc cầu dao và gọi giáo viên.',
        safe: true,
        why: 'Đúng: phải ngắt nguồn điện trước, rồi mới sơ cứu theo hướng dẫn của giáo viên.',
      },
    ],
  },
  {
    id: 'chay-con',
    domain: 'su-co',
    sign: 'flame',
    situation: 'Đèn cồn đổ, cồn tràn ra mặt bàn và bắt lửa thành một đám nhỏ.',
    options: [
      {
        text: 'Bình tĩnh báo giáo viên, trùm khăn ướt hoặc phủ cát lên đám lửa, dời chất dễ cháy ra xa.',
        safe: true,
        why: 'Đúng: khăn ướt hoặc cát ngăn không khí, còn chất dễ cháy không bị bén lửa.',
      },
      {
        text: 'Dội nhiều nước lên bàn.',
        safe: false,
        why: 'Dội nước có thể làm cồn đang cháy chảy lan rộng và làm nước dính vào thiết bị điện.',
      },
      {
        text: 'Thổi hoặc quạt cho lửa tắt.',
        safe: false,
        why: 'Thổi, quạt cấp thêm không khí và làm lửa lan rộng.',
      },
    ],
  },
  {
    id: 'chay-dien',
    domain: 'su-co',
    sign: 'extinguisher',
    situation: 'Bộ nguồn đang cắm điện bốc khói rồi bắt lửa.',
    options: [
      {
        text: 'Hắt nước vào bộ nguồn ngay.',
        safe: false,
        why: 'Nước dẫn điện: không dùng nước dập lửa khi thiết bị vẫn còn điện.',
      },
      {
        text: 'Ngắt nguồn điện, báo giáo viên, dập lửa bằng bình chữa cháy theo hướng dẫn; ra theo lối thoát hiểm nếu lửa lan.',
        safe: true,
        why: 'Đúng: ngắt điện trước, dập lửa theo hướng dẫn, và ưu tiên an toàn của mọi người.',
      },
      {
        text: 'Rút hết dây trên bàn bằng tay rồi bê bộ nguồn đi.',
        safe: false,
        why: 'Thiết bị đang cháy rất nóng, có thể còn điện: chạm vào dễ bị bỏng và điện giật.',
      },
    ],
  },
  {
    id: 'bong',
    domain: 'su-co',
    sign: 'hot',
    situation: 'Em lỡ chạm tay vào giá đun nóng và bị bỏng nhẹ.',
    options: [
      {
        text: 'Bôi kem đánh răng lên chỗ bỏng.',
        safe: false,
        why: 'Kem đánh răng giữ nhiệt và có thể gây nhiễm trùng, không phải cách sơ cứu đúng.',
      },
      {
        text: 'Làm vỡ bóng nước cho xẹp nhanh.',
        safe: false,
        why: 'Làm vỡ bóng nước dễ gây nhiễm trùng.',
      },
      {
        text: 'Báo giáo viên, xả chỗ bỏng dưới vòi nước mát sạch khoảng $15$ phút.',
        safe: true,
        why: 'Đúng: nước mát làm hạ nhiệt vùng bỏng; giáo viên sẽ xử lí tiếp.',
      },
    ],
  },
  {
    id: 'nhiet-ke-vo',
    domain: 'su-co',
    sign: 'toxic',
    situation: 'Một nhiệt kế thuỷ ngân rơi vỡ, các giọt thuỷ ngân văng trên sàn.',
    options: [
      {
        text: 'Không chạm vào, tránh xa chỗ vỡ, báo ngay giáo viên và mở cửa cho thoáng.',
        safe: true,
        why: 'Đúng: thuỷ ngân rất độc và dễ bay hơi, phải để giáo viên thu gom đúng cách.',
      },
      {
        text: 'Dùng tay nhặt các giọt thuỷ ngân và mảnh vỡ.',
        safe: false,
        why: 'Thuỷ ngân rất độc, còn mảnh thuỷ tinh có thể gây đứt tay.',
      },
      {
        text: 'Quét hết vào thùng rác của lớp.',
        safe: false,
        why: 'Chổi làm thuỷ ngân vỡ thành giọt nhỏ, bay hơi nhanh hơn; không được bỏ vào rác thường.',
      },
    ],
  },
];

/**
 * A fresh walk through the situations.
 * @returns {Run}
 */
export function newRun() {
  return { index: 0, tried: SCENARIOS.map(() => []) };
}

/**
 * The run after trying one option of the current situation. Trying an option
 * twice, or anything after the safe one was found, changes nothing.
 * @param {Run} run @param {number} option
 * @returns {Run}
 */
export function choose(run, option) {
  const tried = run.tried[run.index];
  if (!tried || isSolved(run, run.index) || tried.includes(option)) return run;
  return { ...run, tried: run.tried.map((t, i) => (i === run.index ? [...t, option] : t)) };
}

/**
 * Whether the safe option of a situation has been found.
 * @param {Run} run @param {number} index
 */
export function isSolved(run, index) {
  const { options } = SCENARIOS[index];
  return run.tried[index].some((o) => options[o].safe);
}

/**
 * The run moved on to the next situation, once the current one is solved.
 * @param {Run} run
 * @returns {Run}
 */
export function advance(run) {
  return isFinished(run) || !isSolved(run, run.index) ? run : { ...run, index: run.index + 1 };
}

/** @param {Run} run */
export function isFinished(run) {
  return run.index >= SCENARIOS.length;
}

/**
 * First-try results per domain, in the order of `DOMAIN_LABELS`.
 * @param {Run} run
 * @returns {Array<{ domain: Domain, label: string, total: number, firstTry: number }>}
 */
export function report(run) {
  const domains = /** @type {Domain[]} */ (Object.keys(DOMAIN_LABELS));
  return domains.map((domain) => {
    const rows = SCENARIOS.map((s, i) => ({ s, i })).filter(({ s }) => s.domain === domain);
    return {
      domain,
      label: DOMAIN_LABELS[domain],
      total: rows.length,
      firstTry: rows.filter(({ s, i }) => {
        const first = run.tried[i][0];
        return first !== undefined && s.options[first].safe;
      }).length,
    };
  });
}

/**
 * @typedef {object} SignCard
 * @property {string} id
 * @property {string} label names the drawing without giving away its meaning
 * @property {string} bin
 * @property {string} why
 * @property {SignName} sign
 */
/**
 * @typedef {object} SignSet
 * @property {string} id
 * @property {string} label
 * @property {Array<{ id: string, label: string }>} bins
 * @property {SignCard[]} cards
 */

/** @type {SignSet[]} */
export const SIGN_SETS = [
  {
    id: 'dien',
    label: 'Trên thiết bị điện',
    bins: [
      { id: 'mot-chieu', label: 'Dòng điện một chiều' },
      { id: 'xoay-chieu', label: 'Dòng điện xoay chiều' },
      { id: 'dau-vao', label: 'Đầu vào' },
      { id: 'dau-ra', label: 'Đầu ra' },
      { id: 'hai-cuc', label: 'Cực dương, cực âm' },
      { id: 'noi-dat', label: 'Cần nối đất' },
    ],
    cards: [
      {
        id: 'dc',
        label: 'Chữ DC có gạch ngang',
        bin: 'mot-chieu',
        why: 'DC (hoặc dấu −) chỉ dòng điện một chiều.',
        sign: 'dc',
      },
      {
        id: 'ac',
        label: 'Chữ AC có dấu ngã',
        bin: 'xoay-chieu',
        why: 'AC (hoặc dấu ~) chỉ dòng điện xoay chiều.',
        sign: 'ac',
      },
      {
        id: 'input',
        label: 'Chữ Input hoặc I',
        bin: 'dau-vao',
        why: 'Input (I) là đầu vào: nơi nối với nguồn cấp điện.',
        sign: 'input',
      },
      {
        id: 'output',
        label: 'Chữ Output hoặc O',
        bin: 'dau-ra',
        why: 'Output (O) là đầu ra: nơi thiết bị cấp điện cho mạch.',
        sign: 'output',
      },
      {
        id: 'poles',
        label: 'Dấu cộng và dấu trừ',
        bin: 'hai-cuc',
        why: 'Dấu + chỉ cực dương, dấu − chỉ cực âm.',
        sign: 'poles',
      },
      {
        id: 'earth',
        label: 'Ba vạch ngang ngắn dần',
        bin: 'noi-dat',
        why: 'Ba vạch ngắn dần dưới một đường thẳng đứng là kí hiệu nối đất.',
        sign: 'earth',
      },
    ],
  },
  {
    id: 'dung-cu',
    label: 'Trên dụng cụ',
    bins: [
      { id: 'de-vo', label: 'Dụng cụ dễ vỡ' },
      { id: 'dat-dung', label: 'Dụng cụ đặt đứng' },
      { id: 'tranh-nang', label: 'Tránh ánh nắng chiếu trực tiếp' },
      { id: 'khong-vut', label: 'Không được bỏ vào thùng rác' },
      { id: 'nhiet-cao', label: 'Nhiệt độ cao' },
      { id: 'tu-truong', label: 'Từ trường' },
    ],
    cards: [
      {
        id: 'fragile',
        label: 'Chiếc li thuỷ tinh',
        bin: 'de-vo',
        why: 'Hình chiếc li báo dụng cụ dễ vỡ, phải cầm nhẹ tay.',
        sign: 'fragile',
      },
      {
        id: 'upright',
        label: 'Hai mũi tên chỉ lên',
        bin: 'dat-dung',
        why: 'Hai mũi tên chỉ chiều đặt dụng cụ: đứng, hướng lên trên.',
        sign: 'upright',
      },
      {
        id: 'no-sun',
        label: 'Mặt trời bị gạch chéo',
        bin: 'tranh-nang',
        why: 'Mặt trời bị gạch chéo: để dụng cụ tránh ánh nắng chiếu trực tiếp.',
        sign: 'no-sun',
      },
      {
        id: 'no-bin',
        label: 'Thùng rác bị gạch chéo',
        bin: 'khong-vut',
        why: 'Thùng rác bị gạch chéo: không được bỏ dụng cụ vào thùng rác thường.',
        sign: 'no-bin',
      },
      {
        id: 'hot',
        label: 'Tam giác có nhiệt kế',
        bin: 'nhiet-cao',
        why: 'Tam giác vàng có nhiệt kế cảnh báo bề mặt có nhiệt độ cao, dễ gây bỏng.',
        sign: 'hot',
      },
      {
        id: 'magnet',
        label: 'Tam giác có nam châm',
        bin: 'tu-truong',
        why: 'Tam giác vàng có nam châm cảnh báo nơi có từ trường mạnh.',
        sign: 'magnet',
      },
    ],
  },
  {
    id: 'bien-bao',
    label: 'Nhóm biển báo',
    bins: [
      { id: 'cam', label: 'Biển cấm (tròn, viền đỏ)' },
      { id: 'canh-bao', label: 'Biển cảnh báo (tam giác, nền vàng)' },
      { id: 'thong-bao', label: 'Biển thông báo (chữ nhật)' },
    ],
    cards: [
      {
        id: 'no-fire',
        label: 'Ngọn lửa bị gạch chéo',
        bin: 'cam',
        why: 'Viền tròn đỏ có gạch chéo: cấm lửa.',
        sign: 'no-fire',
      },
      {
        id: 'no-food',
        label: 'Chiếc cốc bị gạch chéo',
        bin: 'cam',
        why: 'Viền tròn đỏ có gạch chéo: cấm ăn uống trong phòng thực hành.',
        sign: 'no-food',
      },
      {
        id: 'no-touch',
        label: 'Bàn tay bị gạch chéo',
        bin: 'cam',
        why: 'Viền tròn đỏ có gạch chéo: cấm chạm tay vào.',
        sign: 'no-touch',
      },
      {
        id: 'electric',
        label: 'Tam giác có tia sét',
        bin: 'canh-bao',
        why: 'Tam giác nền vàng có tia sét: nơi nguy hiểm về điện.',
        sign: 'electric',
      },
      {
        id: 'flame',
        label: 'Tam giác có ngọn lửa',
        bin: 'canh-bao',
        why: 'Tam giác nền vàng có ngọn lửa: chất dễ cháy.',
        sign: 'flame',
      },
      {
        id: 'laser',
        label: 'Tam giác có tia sáng toả ra',
        bin: 'canh-bao',
        why: 'Tam giác nền vàng có tia toả ra: cảnh báo tia laser.',
        sign: 'laser',
      },
      {
        id: 'toxic',
        label: 'Tam giác có đầu lâu',
        bin: 'canh-bao',
        why: 'Tam giác nền vàng có đầu lâu: chất độc.',
        sign: 'toxic',
      },
      {
        id: 'exit',
        label: 'Hình chữ nhật xanh có mũi tên và cửa',
        bin: 'thong-bao',
        why: 'Biển chữ nhật này chỉ lối thoát hiểm.',
        sign: 'exit',
      },
      {
        id: 'extinguisher',
        label: 'Hình chữ nhật đỏ có bình chữa cháy',
        bin: 'thong-bao',
        why: 'Biển chữ nhật này thông báo vị trí đặt bình chữa cháy.',
        sign: 'extinguisher',
      },
    ],
  },
];
