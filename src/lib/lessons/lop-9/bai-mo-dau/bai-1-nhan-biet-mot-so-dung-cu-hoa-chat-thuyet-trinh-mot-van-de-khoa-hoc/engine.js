/**
 * The virtual tool store of the lesson: every tool and chemical with its use
 * and safety note, and the experiments a learner assembles from them. A kit is
 * checked by roles: each role names what the experiment needs done and the
 * tools that can do it, so a kit passes when every role is filled, nothing
 * unneeded was taken and no tool only repeats a job another taken tool does.
 * `allowed` lists helpers (power supply, wires) a kit may carry without
 * needing them.
 */

/** @typedef {'quang' | 'dien' | 'hoa'} Shelf */
/**
 * @typedef {{
 *   id: string,
 *   name: string,
 *   shelf: Shelf,
 *   use: string,
 *   safety: string,
 * }} Tool
 */
/** @typedef {{ need: string, tools: string[] }} Role */
/** @typedef {{ id: string, title: string, goal: string, roles: Role[], allowed?: string[] }} Experiment */

/** @type {Array<{ id: Shelf, label: string }>} */
export const SHELVES = [
  { id: 'quang', label: 'Quang học' },
  { id: 'dien', label: 'Điện và điện từ' },
  { id: 'hoa', label: 'Hoá chất, dụng cụ hoá học' },
];

/** @type {Tool[]} */
export const TOOLS = [
  {
    id: 'den',
    name: 'Đèn sợi đốt 12 V',
    shelf: 'quang',
    use: 'Nguồn sáng. Kèm màn chắn có một hoặc nhiều khe hẹp để tạo tia sáng hay chùm sáng hẹp; chiếu sáng khe chữ F để tạo vật sáng.',
    safety: 'Dùng nguồn 12 V qua biến áp nguồn; bóng đèn nóng khi sáng lâu, không chạm tay vào.',
  },
  {
    id: 'laser',
    name: 'Nguồn laser',
    shelf: 'quang',
    use: 'Tạo các tia sáng hẹp, rõ nét; mỗi tia được bật bằng một công tắc trên đèn.',
    safety: 'Tuyệt đối không chiếu tia laser vào mắt mình hay mắt người khác.',
  },
  {
    id: 'ban-ban-tru',
    name: 'Bản bán trụ',
    shelf: 'quang',
    use: 'Khối thuỷ tinh trong suốt hình nửa trụ, dùng trong thí nghiệm khúc xạ ánh sáng và phản xạ toàn phần.',
    safety: 'Dễ vỡ, dễ xước mặt phẳng: cầm vào mặt cong, đặt nhẹ lên bảng chia độ.',
  },
  {
    id: 'bang-chia-do',
    name: 'Bảng chia độ',
    shelf: 'quang',
    use: 'Đọc giá trị các góc (góc tới, góc khúc xạ, góc phản xạ) khi nghiên cứu khúc xạ và phản xạ toàn phần.',
    safety: 'Đặt tâm bảng trùng tâm mặt phẳng của bản bán trụ để đọc góc đúng.',
  },
  {
    id: 'thau-kinh-hoi-tu',
    name: 'Thấu kính hội tụ',
    shelf: 'quang',
    use: 'Thấu kính rìa mỏng, dùng để nghiên cứu đặc điểm ảnh tạo bởi thấu kính hội tụ.',
    safety:
      'Cầm vào vành, không chạm tay vào mặt thấu kính; không dùng thấu kính hội tụ nhìn Mặt Trời.',
  },
  {
    id: 'thau-kinh-phan-ki',
    name: 'Thấu kính phân kì',
    shelf: 'quang',
    use: 'Thấu kính rìa dày, dùng để nghiên cứu đặc điểm ảnh tạo bởi thấu kính phân kì.',
    safety: 'Cầm vào vành, không chạm tay vào mặt thấu kính.',
  },
  {
    id: 'khe-f',
    name: 'Khe chữ F',
    shelf: 'quang',
    use: 'Tấm chắn có khe hình chữ F, được đèn chiếu sáng, đóng vai trò vật sáng đặt trước thấu kính.',
    safety: 'Đặt thẳng đứng, vuông góc với trục của giá quang học.',
  },
  {
    id: 'man-chan',
    name: 'Màn chắn',
    shelf: 'quang',
    use: 'Hứng ảnh thật của vật tạo bởi thấu kính.',
    safety: 'Dịch chuyển màn từ từ dọc giá quang học cho đến khi ảnh rõ nét.',
  },
  {
    id: 'gia-quang-hoc',
    name: 'Giá quang học đồng trục',
    shelf: 'quang',
    use: 'Giá có thước chia, giữ đèn, vật, thấu kính và màn trên cùng một trục để đo khoảng cách.',
    safety: 'Đặt giá trên mặt bàn phẳng, chắc chắn.',
  },
  {
    id: 'bien-ap',
    name: 'Biến áp nguồn',
    shelf: 'dien',
    use: 'Chuyển điện áp xoay chiều 220 V thành điện áp một chiều hoặc xoay chiều nhỏ, an toàn cho thí nghiệm.',
    safety: 'Chọn đúng chức năng (một chiều hay xoay chiều) và đúng điện áp trước khi bật.',
  },
  {
    id: 'dien-ke',
    name: 'Điện kế (galvanometer)',
    shelf: 'dien',
    use: 'Phát hiện dòng điện rất nhỏ, như dòng điện cảm ứng. Vạch 0 ở giữa mặt số: kim lệch sang hai phía cho biết hai chiều của dòng điện.',
    safety: 'Không nối trực tiếp điện kế vào nguồn điện: dòng điện lớn làm hỏng điện kế.',
  },
  {
    id: 'da-nang',
    name: 'Đồng hồ đo điện đa năng',
    shelf: 'dien',
    use: 'Đo cường độ dòng điện, hiệu điện thế, điện trở,… của mạch điện một chiều và xoay chiều.',
    safety:
      'Xoay núm đến đúng đại lượng và thang đo trước khi nối vào mạch; không đo điện trở khi mạch đang có điện.',
  },
  {
    id: 'cuon-day-led',
    name: 'Cuộn dây dẫn có hai đèn LED',
    shelf: 'dien',
    use: 'Hai đèn LED mắc song song, ngược cực nhau vào hai đầu cuộn dây: đèn sáng cho biết có dòng điện cảm ứng, đèn nào sáng cho biết chiều dòng điện.',
    safety: 'Không nối cuộn dây vào nguồn điện có điện áp lớn: đèn LED dễ hỏng.',
  },
  {
    id: 'cuon-day',
    name: 'Cuộn dây dẫn',
    shelf: 'dien',
    use: 'Ống dây gồm nhiều vòng dây dẫn có vỏ cách điện; nối với điện kế để khảo sát dòng điện cảm ứng.',
    safety: 'Không để hai đầu dây trần chạm nhau khi nối vào nguồn điện.',
  },
  {
    id: 'nam-cham',
    name: 'Nam châm thẳng',
    shelf: 'dien',
    use: 'Tạo từ trường; đưa vào, kéo ra khỏi cuộn dây để làm số đường sức từ qua cuộn dây biến thiên.',
    safety: 'Không làm rơi, không để gần đồng hồ đo và thiết bị điện tử.',
  },
  {
    id: 'dien-tro',
    name: 'Điện trở mẫu',
    shelf: 'dien',
    use: 'Vật dẫn có điện trở xác định, dùng làm đoạn mạch cần đo cường độ dòng điện, hiệu điện thế.',
    safety: 'Điện trở nóng lên khi có dòng điện lớn chạy qua lâu: ngắt mạch sau khi đo.',
  },
  {
    id: 'day-noi',
    name: 'Dây nối',
    shelf: 'dien',
    use: 'Nối các thiết bị thành mạch điện kín.',
    safety: 'Dùng dây còn nguyên vỏ cách điện; lắp mạch khi công tắc đang mở.',
  },
  {
    id: 'ong-nghiem',
    name: 'Ống nghiệm',
    shelf: 'hoa',
    use: 'Đựng một lượng nhỏ hoá chất để làm thí nghiệm.',
    safety:
      'Dễ vỡ; khi đun, kẹp ở khoảng 1/3 ống tính từ miệng, miệng ống hướng về phía không có người.',
  },
  {
    id: 'ong-hut',
    name: 'Ống hút nhỏ giọt',
    shelf: 'hoa',
    use: 'Lấy một lượng nhỏ dung dịch và nhỏ từng giọt.',
    safety:
      'Không chạm đầu ống hút vào thành ống nghiệm; không dùng một ống hút cho nhiều hoá chất.',
  },
  {
    id: 'coc',
    name: 'Cốc thuỷ tinh',
    shelf: 'hoa',
    use: 'Đựng, pha và đun dung dịch.',
    safety: 'Khi đun phải đặt trên lưới tản nhiệt để nhiệt phân bố đều, tránh vỡ cốc.',
  },
  {
    id: 'den-con',
    name: 'Đèn cồn',
    shelf: 'hoa',
    use: 'Đun nóng hoá chất.',
    safety: 'Không thổi để tắt đèn mà đậy nắp; không châm đèn cồn từ một đèn cồn khác.',
  },
  {
    id: 'luoi',
    name: 'Lưới tản nhiệt',
    shelf: 'hoa',
    use: 'Đặt giữa ngọn lửa và đáy cốc, bình để nhiệt toả đều khi đun.',
    safety: 'Lưới còn nóng sau khi đun: dùng kẹp, không cầm bằng tay.',
  },
  {
    id: 'kieng',
    name: 'Kiềng ba chân',
    shelf: 'hoa',
    use: 'Đỡ lưới tản nhiệt và cốc, bình ở phía trên đèn cồn.',
    safety: 'Đặt trên mặt bàn phẳng để cốc không bị đổ.',
  },
  {
    id: 'naoh',
    name: 'Dung dịch NaOH loãng',
    shelf: 'hoa',
    use: 'Một base thường dùng trong phòng thí nghiệm.',
    safety: 'Base có tính ăn mòn: đeo kính, găng tay, tránh dính vào da và mắt.',
  },
  {
    id: 'hcl',
    name: 'Dung dịch HCl loãng',
    shelf: 'hoa',
    use: 'Một acid thường dùng trong phòng thí nghiệm.',
    safety: 'Acid có tính ăn mòn: đeo kính, găng tay; dính vào da thì rửa ngay bằng nhiều nước.',
  },
  {
    id: 'phenolphthalein',
    name: 'Dung dịch phenolphthalein',
    shelf: 'hoa',
    use: 'Chất chỉ thị: không màu trong môi trường acid và trung tính, chuyển màu hồng trong dung dịch base.',
    safety: 'Đậy nắp lọ ngay sau khi lấy; chỉ nhỏ 1 đến 2 giọt.',
  },
  {
    id: 'giay-ph',
    name: 'Giấy pH',
    shelf: 'hoa',
    use: 'Chất chỉ thị: đổi màu theo pH của dung dịch, so với bảng màu để biết pH.',
    safety: 'Dùng đũa thuỷ tinh chấm dung dịch lên giấy, không nhúng cả tờ giấy vào lọ hoá chất.',
  },
  {
    id: 'natri',
    name: 'Kim loại sodium (Na)',
    shelf: 'hoa',
    use: 'Kim loại hoạt động mạnh, dùng trong thí nghiệm về tính chất của kim loại.',
    safety:
      'Bảo quản ngâm trong dầu hoả; gắp bằng panh, không cầm bằng tay; phản ứng mạnh với nước.',
  },
];

/** @type {Experiment[]} */
export const EXPERIMENTS = [
  {
    id: 'khuc-xa',
    title: 'Đo góc khúc xạ',
    goal: 'Chiếu một tia sáng từ không khí vào thuỷ tinh, đo góc tới và góc khúc xạ.',
    roles: [
      { need: 'tạo một tia sáng hẹp', tools: ['den', 'laser'] },
      { need: 'làm môi trường thuỷ tinh cho tia sáng khúc xạ', tools: ['ban-ban-tru'] },
      { need: 'đọc góc tới và góc khúc xạ', tools: ['bang-chia-do'] },
    ],
    allowed: ['bien-ap', 'day-noi'],
  },
  {
    id: 'thau-kinh',
    title: 'Ảnh qua thấu kính hội tụ',
    goal: 'Tạo ảnh thật của một vật sáng qua thấu kính hội tụ và đo khoảng cách từ vật, từ ảnh đến thấu kính.',
    roles: [
      { need: 'chiếu sáng vật', tools: ['den'] },
      { need: 'làm vật sáng', tools: ['khe-f'] },
      { need: 'tạo ảnh thật', tools: ['thau-kinh-hoi-tu'] },
      { need: 'hứng ảnh', tools: ['man-chan'] },
      { need: 'giữ các dụng cụ đồng trục và đo khoảng cách', tools: ['gia-quang-hoc'] },
    ],
    allowed: ['bien-ap', 'day-noi'],
  },
  {
    id: 'cam-ung',
    title: 'Dòng điện cảm ứng',
    goal: 'Đưa nam châm vào, ra khỏi cuộn dây và phát hiện dòng điện cảm ứng cùng chiều của nó.',
    roles: [
      { need: 'tạo từ trường biến thiên qua cuộn dây', tools: ['nam-cham'] },
      { need: 'làm mạch kín có dòng điện cảm ứng', tools: ['cuon-day', 'cuon-day-led'] },
      { need: 'phát hiện dòng điện cảm ứng và chiều của nó', tools: ['dien-ke', 'cuon-day-led'] },
    ],
    allowed: ['day-noi'],
  },
  {
    id: 'do-dien',
    title: 'Đo hiệu điện thế, cường độ dòng điện',
    goal: 'Đo hiệu điện thế giữa hai đầu một điện trở và cường độ dòng điện qua nó.',
    roles: [
      { need: 'cấp điện áp một chiều nhỏ, an toàn', tools: ['bien-ap'] },
      { need: 'làm đoạn mạch cần đo', tools: ['dien-tro'] },
      { need: 'đo hiệu điện thế và cường độ dòng điện', tools: ['da-nang'] },
      { need: 'nối thành mạch kín', tools: ['day-noi'] },
    ],
  },
  {
    id: 'chi-thi',
    title: 'Nhận biết dung dịch base',
    goal: 'Nhỏ phenolphthalein vào dung dịch NaOH trong ống nghiệm và quan sát màu.',
    roles: [
      { need: 'làm dung dịch cần thử', tools: ['naoh'] },
      { need: 'làm chất chỉ thị', tools: ['phenolphthalein'] },
      { need: 'đựng dung dịch', tools: ['ong-nghiem'] },
      { need: 'lấy và nhỏ từng giọt chất chỉ thị', tools: ['ong-hut'] },
    ],
  },
  {
    id: 'dun-coc',
    title: 'Đun dung dịch trong cốc',
    goal: 'Đun nóng một cốc nước bằng đèn cồn sao cho cốc không bị vỡ.',
    roles: [
      { need: 'đựng nước', tools: ['coc'] },
      { need: 'tạo ngọn lửa', tools: ['den-con'] },
      { need: 'làm nhiệt phân bố đều ở đáy cốc', tools: ['luoi'] },
      { need: 'đỡ cốc phía trên ngọn lửa', tools: ['kieng'] },
    ],
  },
];

/** @param {string} id */
export function toolById(id) {
  const t = TOOLS.find((x) => x.id === id);
  if (!t) throw new Error(`Unknown tool ${id}`);
  return t;
}

/**
 * The needs of an experiment that no tool of a kit fills.
 * @param {Experiment} exp
 * @param {Set<string>} taken
 */
function missingNeeds(exp, taken) {
  return exp.roles.filter((r) => !r.tools.some((t) => taken.has(t))).map((r) => r.need);
}

/**
 * Check a kit against an experiment.
 * @param {Experiment} exp
 * @param {string[]} kit tool ids the learner took
 * @returns {{ ok: boolean, missing: string[], extra: string[], repeated: string[], text: string }}
 *   `missing` holds the needs no taken tool fills, `extra` the names of the
 *   taken tools no role uses, `repeated` (only once nothing is missing) the
 *   names of role tools the kit could drop and still fill every need.
 */
export function checkKit(exp, kit) {
  const taken = new Set(kit);
  const missing = missingNeeds(exp, taken);
  const roleTools = new Set(exp.roles.flatMap((r) => r.tools));
  const allowed = new Set(exp.allowed ?? []);
  const extra = TOOLS.filter(
    (t) => taken.has(t.id) && !roleTools.has(t.id) && !allowed.has(t.id),
  ).map((t) => t.name);
  const repeated = missing.length
    ? []
    : TOOLS.filter((t) => {
        if (!taken.has(t.id) || !roleTools.has(t.id)) return false;
        const without = new Set(taken);
        without.delete(t.id);
        return missingNeeds(exp, without).length === 0;
      }).map((t) => t.name);
  const ok = missing.length === 0 && extra.length === 0 && repeated.length === 0;
  if (kit.length === 0) {
    return {
      ok: false,
      missing,
      extra,
      repeated,
      text: 'Bộ dụng cụ đang trống. Chọn dụng cụ từ kho.',
    };
  }
  /** @type {string[]} */
  const parts = [];
  if (missing.length) parts.push(`Còn thiếu dụng cụ để ${missing.join('; ')}.`);
  if (extra.length) parts.push(`Không cần cho thí nghiệm này: ${extra.join(', ')}.`);
  if (repeated.length) {
    parts.push(
      `Có dụng cụ làm trùng việc với nhau: ${repeated.join(', ')}. Bỏ bớt để mỗi việc chỉ cần một dụng cụ.`,
    );
  }
  const text = ok
    ? `Đủ và đúng dụng cụ cho thí nghiệm "${exp.title}". Nhớ đọc lưu ý an toàn của từng dụng cụ trước khi làm.`
    : parts.join(' ');
  return { ok, missing, extra, repeated, text };
}
