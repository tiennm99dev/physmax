/**
 * Data and pure logic for the fields-of-physics lesson: the mind map of six
 * fields, the links between them, the "which field?" clues and the size scale.
 */

/** @typedef {'thien-van' | 'hat' | 'nano' | 'ban-dan' | 'laser' | 'y-sinh'} FieldId */
/**
 * @typedef {{
 *   id: FieldId,
 *   short: string,
 *   name: string,
 *   object: string,
 *   phenomena: string,
 *   model: string,
 *   experiment: string,
 *   uses: string,
 *   x: number,
 *   y: number,
 * }} Field
 */
/** @typedef {{ a: FieldId, b: FieldId, why: string }} Link */
/** @typedef {{ text: string, field: FieldId, why: string }} Clue */
/** @typedef {{ exponent: number, thing: string, size: string, fieldName: string }} ScaleStop */

/** @type {Field[]} */
export const FIELDS = [
  {
    id: 'thien-van',
    short: 'Thiên văn và vũ trụ',
    name: 'Vật lí thiên văn và vũ trụ học',
    object:
      'Các thiên thể (hành tinh, sao, thiên hà) và toàn thể vũ trụ: nguồn gốc, cấu trúc, sự tiến hoá.',
    phenomena: 'Vũ trụ giãn nở, lỗ đen, sóng hấp dẫn, sự tiến hoá của các sao.',
    model: 'Thuyết tương đối rộng, thuyết Vụ nổ lớn (Big Bang), mô hình tiến hoá sao.',
    experiment:
      'Kính thiên văn trên mặt đất và ngoài không gian, tàu thăm dò, phân tích ánh sáng từ các sao.',
    uses: 'Vệ tinh nhân tạo, định vị GPS, thông tin vũ trụ.',
    x: 35,
    y: 14,
  },
  {
    id: 'hat',
    short: 'Hạt cơ bản, năng lượng cao',
    name: 'Vật lí hạt cơ bản và năng lượng cao',
    object: 'Các hạt sơ cấp cấu tạo nên vật chất và bức xạ, cùng tương tác giữa chúng.',
    phenomena:
      'Hạt mới sinh ra trong va chạm năng lượng rất cao; proton và neutron được cấu thành từ quark.',
    model: 'Mô hình chuẩn của các hạt cơ bản.',
    experiment: 'Máy gia tốc (như LHC) cho các hạt va chạm và các đầu dò ghi lại sản phẩm va chạm.',
    uses: 'Chùm hạt xạ trị ung thư, chụp cắt lớp PET.',
    x: 65,
    y: 14,
  },
  {
    id: 'nano',
    short: 'Nano',
    name: 'Vật lí nano',
    object: 'Vật liệu có cấu trúc hạt, sợi, ống hoặc tấm mỏng với kích thước khoảng $1$–$100$ nm.',
    phenomena:
      'Cùng một chất nhưng ở kích thước nano có màu sắc, độ bền, khả năng dẫn điện rất khác.',
    model: 'Cơ học lượng tử, mô phỏng trên máy tính.',
    experiment: 'Kính hiển vi điện tử, quan sát được tới cỡ nguyên tử, phân tử.',
    uses: 'Dẫn truyền thuốc, pin, màn hình, vật liệu siêu nhẹ và siêu bền.',
    x: 15,
    y: 50,
  },
  {
    id: 'ban-dan',
    short: 'Bán dẫn',
    name: 'Vật lí bán dẫn',
    object: 'Vật liệu có độ dẫn điện trung gian như silicon, và các linh kiện làm từ chúng.',
    phenomena: 'Độ dẫn điện tăng mạnh khi tăng nhiệt độ, khi chiếu sáng hoặc khi pha tạp chất.',
    model: 'Lí thuyết vùng năng lượng dựa trên cơ học lượng tử.',
    experiment: 'Pha tạp và chế tạo linh kiện, đo đặc trưng dòng điện theo hiệu điện thế.',
    uses: 'Diode, transistor, chip máy tính, LED, pin mặt trời, cảm biến.',
    x: 85,
    y: 50,
  },
  {
    id: 'laser',
    short: 'Laser',
    name: 'Vật lí laser',
    object: 'Sự khuếch đại ánh sáng bằng bức xạ cảm ứng và tính chất của chùm laser.',
    phenomena:
      'Chùm sáng đơn sắc, định hướng cao, năng lượng tập trung, đi rất xa mà ít bị phân tán.',
    model: 'Lí thuyết bức xạ cảm ứng của Einstein.',
    experiment:
      'Môi trường hoạt chất đặt trong buồng cộng hưởng được cấp năng lượng để phát laser.',
    uses: 'Cắt kim loại, dao mổ, cáp quang, đo khoảng cách trong nghiên cứu vũ trụ.',
    x: 35,
    y: 86,
  },
  {
    id: 'y-sinh',
    short: 'Y sinh',
    name: 'Vật lí y sinh',
    object:
      'Các quá trình vật lí trong cơ thể sống, tác động của yếu tố vật lí và kĩ thuật chẩn đoán, điều trị.',
    phenomena: 'Tín hiệu điện của tim và thần kinh, dòng máu chảy, tác dụng của bức xạ lên mô.',
    model: 'Mô hình cơ học của dòng máu, mô hình điện của tế bào thần kinh.',
    experiment: 'Chụp X-quang, siêu âm, cộng hưởng từ, đo điện tim, kĩ thuật khuếch đại PCR.',
    uses: 'Máy chẩn đoán hình ảnh, thiết bị phục hồi chức năng, xạ trị.',
    x: 65,
    y: 86,
  },
];

/** @type {Link[]} */
export const LINKS = [
  {
    a: 'thien-van',
    b: 'hat',
    why: 'Vũ trụ thuở sơ khai rất nóng và đặc; máy gia tốc tái tạo những mức năng lượng đó để kiểm tra lí thuyết về nguồn gốc vũ trụ.',
  },
  {
    a: 'hat',
    b: 'y-sinh',
    why: 'Công nghệ máy gia tốc được dùng để tạo chùm hạt xạ trị ung thư.',
  },
  {
    a: 'nano',
    b: 'ban-dan',
    why: 'Các transistor trong chip hiện đại có kích thước cỡ nano mét.',
  },
  { a: 'nano', b: 'y-sinh', why: 'Hạt nano có thể mang thuốc đến đúng tế bào ung thư.' },
  {
    a: 'laser',
    b: 'ban-dan',
    why: 'Diode laser là linh kiện bán dẫn, có trong đầu đọc đĩa và thiết bị truyền tin qua cáp quang.',
  },
  { a: 'laser', b: 'y-sinh', why: 'Chùm laser được dùng làm dao mổ và điều trị mắt.' },
  {
    a: 'laser',
    b: 'thien-van',
    why: 'Laser đo khoảng cách Trái Đất – Mặt Trăng, và là công cụ của các máy dò sóng hấp dẫn.',
  },
  {
    a: 'ban-dan',
    b: 'thien-van',
    why: 'Cảm biến ảnh bán dẫn trong kính thiên văn và pin mặt trời cấp điện cho tàu vũ trụ.',
  },
];

/** @type {Clue[]} */
export const CLUES = [
  {
    text: 'Tàu InSight hạ cánh xuống Sao Hoả để đo động đất trên hành tinh này.',
    field: 'thien-van',
    why: 'Khám phá các hành tinh bằng tàu thăm dò thuộc vật lí thiên văn và vũ trụ học.',
  },
  {
    text: 'Hai chùm proton va chạm trong đường hầm dài $27$ km, sinh ra hạt mới.',
    field: 'hat',
    why: 'Máy gia tốc LHC là công cụ của vật lí hạt cơ bản và năng lượng cao.',
  },
  {
    text: 'Vàng ở dạng hạt đường kính $20$ nm không có màu vàng mà có màu đỏ.',
    field: 'nano',
    why: 'Tính chất thay đổi theo kích thước cỡ nano mét là đối tượng của vật lí nano.',
  },
  {
    text: 'Pha thêm một lượng rất nhỏ tạp chất làm silicon dẫn điện tốt hơn hàng nghìn lần.',
    field: 'ban-dan',
    why: 'Pha tạp để điều khiển độ dẫn điện là hiện tượng cốt lõi của vật lí bán dẫn.',
  },
  {
    text: 'Một chùm sáng đơn sắc, rất mảnh, cắt được tấm thép dày nhiều mi-li-mét.',
    field: 'laser',
    why: 'Chùm sáng đơn sắc, tập trung năng lượng cao là đặc trưng của laser.',
  },
  {
    text: 'Bác sĩ dùng siêu âm để xem tim bơm máu như thế nào.',
    field: 'y-sinh',
    why: 'Dùng sóng âm tần số cao để chẩn đoán trong cơ thể thuộc vật lí y sinh.',
  },
  {
    text: 'Ánh sáng từ các thiên hà xa bị lệch về phía đỏ, cho thấy vũ trụ đang giãn nở.',
    field: 'thien-van',
    why: 'Phân tích ánh sáng thiên hà để tìm hiểu vũ trụ thuộc vũ trụ học.',
  },
  {
    text: 'Proton không phải hạt sơ cấp: nó được cấu thành từ các quark.',
    field: 'hat',
    why: 'Cấu tạo của các hạt thuộc vật lí hạt cơ bản.',
  },
];

/** @type {ScaleStop[]} */
export const SCALE = [
  {
    exponent: -15,
    thing: 'Proton, hạt nhân nhỏ',
    size: 'cỡ $10^{-15}$ m',
    fieldName: 'Vật lí hạt cơ bản và năng lượng cao',
  },
  {
    exponent: -10,
    thing: 'Nguyên tử',
    size: 'cỡ $10^{-10}$ m',
    fieldName: 'Cơ học lượng tử, nền tảng của vật lí nano và bán dẫn',
  },
  {
    exponent: -9,
    thing: 'Giới hạn dưới của vật liệu nano',
    size: '$1$ nm $= 10^{-9}$ m',
    fieldName: 'Vật lí nano, vật lí bán dẫn',
  },
  {
    exponent: -7,
    thing: 'Giới hạn trên của vật liệu nano, virus lớn',
    size: '$100$ nm $= 10^{-7}$ m',
    fieldName: 'Vật lí nano, vật lí y sinh',
  },
  {
    exponent: -6,
    thing: 'Bước sóng ánh sáng laser, vi khuẩn',
    size: 'cỡ $10^{-6}$ m',
    fieldName: 'Vật lí laser, vật lí y sinh',
  },
  {
    exponent: -5,
    thing: 'Tế bào cơ thể người',
    size: 'cỡ $10^{-5}$ m',
    fieldName: 'Vật lí y sinh',
  },
  {
    exponent: 0,
    thing: 'Con người, đồ vật quanh ta',
    size: 'cỡ $1$ m',
    fieldName: 'Vật lí cổ điển vẫn mô tả rất tốt ở thang này',
  },
  {
    exponent: 7,
    thing: 'Trái Đất',
    size: 'đường kính cỡ $10^{7}$ m',
    fieldName: 'Vật lí thiên văn',
  },
  {
    exponent: 9,
    thing: 'Mặt Trời',
    size: 'đường kính cỡ $10^{9}$ m',
    fieldName: 'Vật lí thiên văn',
  },
  {
    exponent: 21,
    thing: 'Thiên hà của chúng ta (Ngân Hà)',
    size: 'đường kính cỡ $10^{21}$ m',
    fieldName: 'Vật lí thiên văn và vũ trụ học',
  },
  {
    exponent: 27,
    thing: 'Vũ trụ quan sát được',
    size: 'đường kính cỡ $10^{27}$ m',
    fieldName: 'Vũ trụ học',
  },
];

/**
 * The field with this id.
 * @param {FieldId} id
 * @returns {Field}
 */
export function fieldOf(id) {
  const field = FIELDS.find((f) => f.id === id);
  if (!field) throw new Error(`Unknown field: ${id}`);
  return field;
}

/**
 * The links of one field, each with the field at its other end.
 * @param {FieldId} id
 * @returns {{ other: FieldId, why: string }[]}
 */
export function linksOf(id) {
  return LINKS.filter((l) => l.a === id || l.b === id).map((l) => ({
    other: l.a === id ? l.b : l.a,
    why: l.why,
  }));
}

/**
 * The feedback line after a learner names a field for a clue.
 * @param {Clue} clue
 * @param {FieldId} picked
 * @returns {{ ok: boolean, text: string }}
 */
export function judgeClue(clue, picked) {
  const ok = picked === clue.field;
  return {
    ok,
    text: ok
      ? `Đúng. ${clue.why}`
      : `Chưa đúng, đây không phải ${fieldOf(picked).name}. Thử nhánh khác.`,
  };
}

/**
 * How one scale stop compares with a person of about 1 m, as rich text.
 * @param {number} exponent the power of ten of the stop, in metres
 * @returns {string}
 */
export function compareWithPerson(exponent) {
  if (exponent === 0) return 'Đây là thang kích thước của đời sống hằng ngày.';
  const power = `$10^{${Math.abs(exponent)}}$`;
  return exponent < 0
    ? `Nhỏ hơn con người khoảng ${power} lần.`
    : `Lớn hơn con người khoảng ${power} lần.`;
}
