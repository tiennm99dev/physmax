/**
 * Environmental hotspots on a simple world map: each place belongs to one
 * global environmental issue and carries a fact and its cause. Longitude and
 * latitude are in degrees; the map is equirectangular.
 */

/** @typedef {'khi-hau' | 'o-nhiem' | 'da-dang' | 'ozone'} IssueId */

/** @type {Array<{ id: IssueId, label: string }>} */
export const ISSUES = [
  { id: 'khi-hau', label: 'Biến đổi khí hậu' },
  { id: 'o-nhiem', label: 'Ô nhiễm môi trường' },
  { id: 'da-dang', label: 'Mất rừng, suy giảm đa dạng sinh học' },
  { id: 'ozone', label: 'Suy giảm tầng ozone' },
];

/**
 * @typedef {object} Hotspot
 * @property {string} id
 * @property {string} place
 * @property {number} lon
 * @property {number} lat
 * @property {string} sign what people see happening there
 * @property {IssueId} issue
 * @property {string} fact
 * @property {string} cause
 */

/** @type {Hotspot[]} */
export const HOTSPOTS = [
  {
    id: 'bac-cuc',
    place: 'Bắc Cực',
    lon: -5,
    lat: 72,
    sign: 'Băng trên biển tan nhanh, gấu trắng mất nơi săn mồi.',
    issue: 'khi-hau',
    fact: 'Từ năm 1979, diện tích băng biển Bắc Cực vào tháng 9 giảm trung bình khoảng 12% mỗi thập kỉ.',
    cause:
      'Lượng khí nhà kính trong khí quyển tăng do đốt nhiên liệu hoá thạch, làm Trái Đất nóng lên.',
  },
  {
    id: 'dbscl',
    place: 'Đồng bằng sông Cửu Long',
    lon: 106,
    lat: 10,
    sign: 'Nước mặn lấn sâu vào ruộng, bờ biển bị sạt lở.',
    issue: 'khi-hau',
    fact: 'Theo kịch bản năm 2016 của Bộ Tài nguyên và Môi trường, nếu mực nước biển dâng 1 m thì khoảng 39% diện tích đồng bằng có nguy cơ bị ngập.',
    cause:
      'Nước biển dâng do băng tan và nước biển nở ra khi nóng lên; thêm vào đó, đất bị sụt lún do khai thác nước ngầm.',
  },
  {
    id: 'maldives',
    place: 'Quần đảo Maldives',
    lon: 73,
    lat: 3,
    sign: 'Những hòn đảo thấp có nguy cơ chìm dần xuống biển.',
    issue: 'khi-hau',
    fact: 'Khoảng 80% diện tích đất của Maldives cao không quá 1 m so với mực nước biển.',
    cause: 'Nhiệt độ Trái Đất tăng làm băng tan và nước biển dâng.',
  },
  {
    id: 'thai-binh-duong',
    place: 'Bắc Thái Bình Dương',
    lon: -140,
    lat: 32,
    sign: 'Một vùng biển rộng lớn tích tụ rác nhựa trôi nổi.',
    issue: 'o-nhiem',
    fact: 'Vùng rác Thái Bình Dương rộng khoảng 1,6 triệu km², chủ yếu là rác nhựa và vi nhựa.',
    cause:
      'Rác nhựa từ đất liền và tàu thuyền bị các dòng hải lưu cuốn về một vùng biển rồi tích tụ ở đó.',
  },
  {
    id: 'delhi',
    place: 'New Delhi (Ấn Độ)',
    lon: 77,
    lat: 29,
    sign: 'Bầu trời mù mịt khói bụi, nhiều người mắc bệnh hô hấp.',
    issue: 'o-nhiem',
    fact: 'Nồng độ bụi mịn PM2,5 trung bình năm cao gấp hơn 10 lần mức hướng dẫn của WHO là 5 µg/m³.',
    cause: 'Khói xe, khí thải nhà máy, đốt than, đốt rơm rạ sau mùa gặt và bụi xây dựng.',
  },
  {
    id: 'amazon',
    place: 'Rừng Amazon',
    lon: -62,
    lat: -5,
    sign: 'Rừng nhiệt đới bị đốt và chặt phá thành đồng cỏ.',
    issue: 'da-dang',
    fact: 'Khoảng 17% diện tích rừng Amazon đã bị mất, nhiều loài sinh vật bị đe doạ.',
    cause: 'Chặt phá rừng lấy đất chăn nuôi, trồng trọt, khai thác gỗ và cháy rừng.',
  },
  {
    id: 'borneo',
    place: 'Đảo Borneo',
    lon: 114,
    lat: 1,
    sign: 'Rừng mưa bị thay bằng đồn điền cọ dầu, đười ươi mất nơi sống.',
    issue: 'da-dang',
    fact: 'Từ năm 1999 đến năm 2015, số đười ươi Borneo giảm khoảng một nửa.',
    cause: 'Rừng bị chặt để trồng cọ dầu, khai thác gỗ, khai mỏ; cháy rừng và săn bắt.',
  },
  {
    id: 'nam-cuc',
    place: 'Nam Cực',
    lon: 40,
    lat: -72,
    sign: 'Mỗi mùa xuân, tầng ozone phía trên mỏng đi rất nhiều.',
    issue: 'ozone',
    fact: 'Lỗ thủng tầng ozone xuất hiện hằng năm vào khoảng tháng 9, tháng 10; có năm rộng hơn 25 triệu km².',
    cause:
      'Các chất CFC, halon dùng trong tủ lạnh, điều hoà, bình xịt phá huỷ ozone. Nghị định thư Montreal (1987) cấm dần các chất này nên tầng ozone đang hồi phục chậm.',
  },
];

/**
 * Map position of a longitude and latitude on a `width` × `height` board that
 * spans longitudes −180° to 180° and latitudes `top` down to −`top`.
 * @param {number} lon
 * @param {number} lat
 * @param {{ width: number, height: number, top: number }} board
 */
export function project(lon, lat, board) {
  return {
    x: ((lon + 180) / 360) * board.width,
    y: ((board.top - lat) / (2 * board.top)) * board.height,
  };
}

/**
 * Simplified coastlines as [longitude, latitude] rings, only good enough to
 * recognise the continents.
 * @type {Array<Array<[number, number]>>}
 */
export const LANDS = [
  // North America
  [
    [-168, 66],
    [-160, 71],
    [-140, 70],
    [-120, 72],
    [-95, 72],
    [-80, 74],
    [-62, 66],
    [-55, 52],
    [-66, 45],
    [-75, 38],
    [-81, 31],
    [-80, 25],
    [-90, 30],
    [-97, 26],
    [-97, 20],
    [-87, 21],
    [-83, 10],
    [-78, 8],
    [-90, 14],
    [-105, 20],
    [-115, 30],
    [-124, 40],
    [-125, 49],
    [-135, 58],
    [-150, 60],
    [-165, 60],
  ],
  // Greenland
  [
    [-50, 82],
    [-25, 83],
    [-20, 72],
    [-40, 64],
    [-50, 62],
    [-55, 70],
    [-72, 78],
  ],
  // South America
  [
    [-78, 8],
    [-60, 10],
    [-50, 0],
    [-35, -6],
    [-40, -22],
    [-48, -28],
    [-58, -38],
    [-65, -42],
    [-68, -55],
    [-74, -50],
    [-72, -35],
    [-71, -18],
    [-81, -5],
    [-80, 2],
  ],
  // Eurasia
  [
    [-10, 36],
    [-9, 43],
    [-2, 44],
    [-5, 48],
    [5, 53],
    [10, 58],
    [5, 62],
    [15, 69],
    [30, 71],
    [45, 68],
    [60, 70],
    [80, 73],
    [105, 78],
    [140, 72],
    [170, 70],
    [180, 66],
    [178, 62],
    [160, 60],
    [155, 50],
    [142, 46],
    [135, 35],
    [122, 40],
    [121, 30],
    [110, 20],
    [106, 10],
    [100, 13],
    [98, 8],
    [103, 1],
    [98, 16],
    [92, 22],
    [80, 15],
    [77, 8],
    [72, 20],
    [66, 25],
    [57, 24],
    [59, 22],
    [52, 16],
    [43, 12],
    [35, 28],
    [34, 31],
    [36, 36],
    [27, 37],
    [26, 40],
    [23, 36],
    [20, 40],
    [12, 44],
    [16, 38],
    [10, 44],
    [3, 43],
  ],
  // Great Britain
  [
    [-5, 50],
    [1, 52],
    [-2, 58],
    [-6, 57],
  ],
  // Africa
  [
    [-17, 21],
    [-10, 30],
    [-5, 36],
    [10, 37],
    [20, 32],
    [32, 31],
    [43, 12],
    [51, 12],
    [40, -2],
    [40, -15],
    [35, -25],
    [20, -35],
    [17, -28],
    [12, -15],
    [13, -5],
    [9, 4],
    [-8, 4],
    [-17, 14],
  ],
  // Madagascar
  [
    [44, -25],
    [49, -13],
    [50, -16],
    [47, -25],
  ],
  // Borneo
  [
    [109, 2],
    [117, 7],
    [119, 1],
    [116, -4],
    [110, -3],
  ],
  // Sumatra
  [
    [95, 5],
    [106, -6],
    [102, -4],
  ],
  // Japan
  [
    [130, 31],
    [141, 36],
    [142, 44],
    [140, 41],
    [135, 34],
  ],
  // Australia
  [
    [114, -22],
    [122, -17],
    [130, -12],
    [137, -12],
    [142, -11],
    [146, -19],
    [153, -26],
    [150, -37],
    [140, -38],
    [130, -32],
    [115, -34],
  ],
  // Antarctica
  [
    [-180, -70],
    [-120, -73],
    [-60, -64],
    [0, -70],
    [60, -67],
    [120, -66],
    [180, -70],
    [180, -85],
    [-180, -85],
  ],
];

/**
 * Score of the guesses so far, by hotspot id.
 * @param {Record<string, IssueId>} guesses
 */
export function tally(guesses) {
  let right = 0;
  let done = 0;
  for (const spot of HOTSPOTS) {
    const g = guesses[spot.id];
    if (g === undefined) continue;
    done += 1;
    if (g === spot.issue) right += 1;
  }
  return { done, right };
}

/** @param {IssueId} id */
export function issueLabel(id) {
  return ISSUES.find((i) => i.id === id)?.label ?? '';
}

/**
 * Actions to sort into "Làm đúng" and "Làm sai" for the environment.
 * @type {Array<{ id: string, label: string, ok: boolean, why: string }>}
 */
export const ACTIONS = [
  {
    id: 'tat-den',
    label: 'Tắt đèn, quạt khi ra khỏi phòng',
    ok: true,
    why: 'Tiết kiệm điện là giảm lượng nhiên liệu đốt ở nhà máy nhiệt điện.',
  },
  {
    id: 'phan-loai',
    label: 'Phân loại rác tại nguồn',
    ok: true,
    why: 'Rác được phân loại thì tái chế được nhiều hơn, chôn lấp ít hơn.',
  },
  {
    id: 'binh-nuoc',
    label: 'Mang bình nước riêng thay cho chai nhựa dùng một lần',
    ok: true,
    why: 'Giảm rác thải nhựa, loại rác phân huỷ hàng trăm năm.',
  },
  {
    id: 'xe-dap',
    label: 'Đi xe đạp hoặc xe buýt tới trường khi có thể',
    ok: true,
    why: 'Giảm khí thải và bụi từ động cơ đốt trong.',
  },
  {
    id: 'trong-cay',
    label: 'Tham gia trồng và chăm sóc cây xanh',
    ok: true,
    why: 'Cây hấp thụ CO₂, giữ đất, che bóng mát và làm sạch không khí.',
  },
  {
    id: 'dot-rac',
    label: 'Đốt rác thải nhựa ngoài vườn',
    ok: false,
    why: 'Đốt nhựa sinh ra khói độc và bụi mịn, gây hại cho sức khoẻ.',
  },
  {
    id: 'pin-cu',
    label: 'Bỏ pin cũ chung với rác sinh hoạt',
    ok: false,
    why: 'Pin chứa kim loại nặng, ngấm vào đất và nước; cần đem tới điểm thu gom riêng.',
  },
  {
    id: 'dieu-hoa',
    label: 'Bật điều hoà ở 18 °C và mở cửa sổ',
    ok: false,
    why: 'Lãng phí rất nhiều điện năng; nên đặt khoảng 26 °C và đóng kín cửa.',
  },
  {
    id: 'xa-nuoc',
    label: 'Để vòi nước chảy trong lúc đánh răng',
    ok: false,
    why: 'Lãng phí nước sạch; chỉ mở vòi khi cần dùng.',
  },
];
