/**
 * The energy cycles of the lesson as data: every cycle starts at the Sun and
 * runs through stages on a ring. The ring's last arrow closes the loop for
 * matter (carbon dioxide, water, air), while the energy itself is topped up by
 * the Sun and spreads out as heat at every stage.
 */

/** @typedef {{ id: string, lines: string[], name: string, form: string, store: string, change: string, clue: string }} Stage */
/** @typedef {{ id: string, label: string, stages: Stage[], closing: string, finished: string }} Cycle */

export const SUN_ID = 'mat-troi';

/** @type {Stage} */
export const SUN = {
  id: SUN_ID,
  lines: ['Mặt Trời'],
  name: 'Mặt Trời',
  form: 'Năng lượng ánh sáng và nhiệt',
  store: 'Không phải khâu lưu trữ: Mặt Trời liên tục bức xạ năng lượng tới Trái Đất.',
  change: 'Đây là nguồn cung cấp năng lượng cho cả ba vòng.',
  clue: 'Mọi vòng năng lượng đều bắt đầu từ Mặt Trời ở giữa sơ đồ.',
};

/** @type {Cycle[]} */
export const CYCLES = [
  {
    id: 'vat-song',
    label: 'Giữa các vật sống',
    closing:
      'Mũi tên nét đứt: khí carbon dioxide do đốt nhiên liệu (và do hô hấp) trở lại khí quyển, cây dùng nó để quang hợp. Vật chất quay vòng, còn năng lượng mới luôn đến từ Mặt Trời.',
    finished:
      'Vậy năng lượng trong than, dầu, khí chính là năng lượng Mặt Trời được thực vật hấp thụ từ hàng triệu năm trước.',
    stages: [
      {
        id: 'thuc-vat',
        lines: ['Thực vật'],
        name: 'Thực vật',
        form: 'Năng lượng hoá học',
        store: 'Trong chất hữu cơ của cây, như glucose và tinh bột.',
        change:
          'Quang hợp: năng lượng ánh sáng chuyển hoá thành năng lượng hoá học, tạo chất hữu cơ từ carbon dioxide và nước.',
        clue: 'Sinh vật nào hấp thụ trực tiếp năng lượng ánh sáng Mặt Trời?',
      },
      {
        id: 'dong-vat',
        lines: ['Động vật'],
        name: 'Động vật',
        form: 'Năng lượng hoá học',
        store: 'Trong chất hữu cơ của cơ thể, lấy từ thức ăn.',
        change:
          'Động vật ăn thực vật (hoặc ăn động vật khác). Hô hấp phân giải chất hữu cơ, giải phóng năng lượng để cơ thể hoạt động; một phần tản ra dưới dạng nhiệt.',
        clue: 'Năng lượng trong cây được truyền đi qua thức ăn, tới sinh vật nào?',
      },
      {
        id: 'xac',
        lines: ['Xác sinh vật', 'bị vùi lấp'],
        name: 'Xác sinh vật bị vùi lấp',
        form: 'Năng lượng hoá học',
        store: 'Trong chất hữu cơ của xác sinh vật nằm dưới các lớp đất đá.',
        change: 'Sinh vật chết đi, xác bị vùi lấp nên năng lượng hoá học vẫn được giữ lại.',
        clue: 'Điều gì xảy ra với sinh vật khi chết đi và bị đất đá phủ lên?',
      },
      {
        id: 'hoa-thach',
        lines: ['Than, dầu,', 'khí'],
        name: 'Than mỏ, dầu mỏ, khí mỏ dầu, khí thiên nhiên',
        form: 'Năng lượng hoá học',
        store: 'Trong nhiên liệu hoá thạch nằm sâu dưới lòng đất.',
        change:
          'Qua hàng triệu năm, xác sinh vật bị phân huỷ và biến đổi thành nhiên liệu hoá thạch.',
        clue: 'Xác sinh vật sau hàng triệu năm biến đổi thành gì?',
      },
      {
        id: 'dot',
        lines: ['Đốt nhiên', 'liệu'],
        name: 'Đốt nhiên liệu',
        form: 'Nhiệt năng, rồi cơ năng và điện năng',
        store: 'Năng lượng không còn được lưu trữ: nó được giải phóng để sử dụng.',
        change:
          'Năng lượng hoá học chuyển hoá thành nhiệt năng, rồi động cơ và nhà máy nhiệt điện biến một phần thành cơ năng, điện năng. Khí thải đi vào khí quyển.',
        clue: 'Muốn lấy năng lượng từ than, dầu, khí, con người phải làm gì?',
      },
    ],
  },
  {
    id: 'nuoc',
    label: 'Tuần hoàn nước',
    closing:
      'Mũi tên nét đứt: nước theo sông chảy ra biển, khép kín vòng tuần hoàn. Nước quay vòng, còn năng lượng để nước bốc hơi lần sau lại đến từ Mặt Trời.',
    finished:
      'Vậy điện từ nhà máy thuỷ điện cũng bắt nguồn từ Mặt Trời: chính Mặt Trời đã đưa nước lên cao.',
    stages: [
      {
        id: 'bien',
        lines: ['Nước biển,', 'sông, hồ'],
        name: 'Nước ở biển, sông, hồ',
        form: 'Nhiệt năng',
        store: 'Trong khối nước được làm nóng.',
        change:
          'Ánh sáng Mặt Trời làm nước nóng lên: năng lượng ánh sáng chuyển hoá thành nhiệt năng.',
        clue: 'Ánh sáng Mặt Trời chiếu xuống và làm nóng nơi có rất nhiều nước.',
      },
      {
        id: 'hoi',
        lines: ['Hơi nước', 'bay lên'],
        name: 'Hơi nước bay lên',
        form: 'Nhiệt năng và thế năng',
        store: 'Trong hơi nước đang lên cao.',
        change:
          'Nước bốc hơi rồi bay lên cao; thực vật thoát hơi nước cũng đưa thêm hơi nước vào khí quyển.',
        clue: 'Nước được làm nóng thì chuyển sang thể nào?',
      },
      {
        id: 'may',
        lines: ['Mây'],
        name: 'Mây',
        form: 'Thế năng',
        store: 'Trong các giọt nước nhỏ ở trên cao.',
        change: 'Lên cao gặp lạnh, hơi nước ngưng tụ thành các giọt nước nhỏ, tạo thành mây.',
        clue: 'Hơi nước lên cao gặp lạnh sẽ ngưng tụ thành gì?',
      },
      {
        id: 'mua',
        lines: ['Mưa'],
        name: 'Mưa',
        form: 'Thế năng chuyển thành động năng',
        store: 'Trong giọt nước đang rơi.',
        change: 'Giọt nước lớn dần rồi rơi xuống: thế năng giảm, động năng tăng.',
        clue: 'Giọt nước trong mây lớn dần thì rơi xuống dưới dạng gì?',
      },
      {
        id: 'ho-cao',
        lines: ['Hồ chứa', 'trên cao'],
        name: 'Hồ chứa trên cao',
        form: 'Thế năng',
        store: 'Trong nước được giữ lại ở trên cao, nhờ đập thuỷ điện.',
        change: 'Nước mưa chảy về và được tích lại ở độ cao lớn: thế năng được lưu trữ.',
        clue: 'Nước mưa ở vùng núi được giữ lại ở đâu?',
      },
      {
        id: 'tuabin',
        lines: ['Dòng chảy,', 'tuabin'],
        name: 'Dòng chảy làm quay tuabin',
        form: 'Động năng, rồi điện năng',
        store: 'Năng lượng được giải phóng để sử dụng.',
        change:
          'Nước chảy xuống: thế năng chuyển hoá thành động năng, làm quay tuabin của máy phát; cơ năng chuyển hoá thành điện năng.',
        clue: 'Thế năng của nước trong hồ được dùng để làm quay cái gì?',
      },
    ],
  },
  {
    id: 'khi-quyen',
    label: 'Gió và hải lưu',
    closing:
      'Mũi tên nét đứt: không khí và nước biển nguội đi rồi lại được Mặt Trời làm nóng, nên gió và dòng hải lưu không ngừng hình thành.',
    finished:
      'Vậy năng lượng của gió, của dòng hải lưu và phần lớn các hiện tượng thời tiết đều bắt nguồn từ Mặt Trời.',
    stages: [
      {
        id: 'nong-khong-deu',
        lines: ['Mặt đất, biển', 'nóng lên'],
        name: 'Mặt đất và nước biển nóng lên không đều',
        form: 'Nhiệt năng',
        store: 'Trong mặt đất, nước biển và không khí.',
        change:
          'Năng lượng Mặt Trời làm nóng khí quyển và nước ở các vùng khác nhau trên Trái Đất một cách không đều.',
        clue: 'Ánh sáng Mặt Trời chiếu xuống thì trước hết làm vật gì nóng lên?',
      },
      {
        id: 'chenh-lech',
        lines: ['Chênh lệch', 'nhiệt độ'],
        name: 'Chênh lệch nhiệt độ',
        form: 'Nhiệt năng',
        store: 'Trong các khối khí, khối nước nóng lạnh khác nhau.',
        change: 'Khối khí, khối nước nóng và lạnh khác nhau bắt đầu chuyển động.',
        clue: 'Nóng lên không đều thì giữa các vùng xuất hiện điều gì?',
      },
      {
        id: 'gio',
        lines: ['Gió,', 'dòng hải lưu'],
        name: 'Gió và dòng hải lưu',
        form: 'Động năng',
        store: 'Trong không khí và nước biển đang chuyển động.',
        change: 'Nhiệt năng chuyển hoá thành động năng của khối khí và khối nước.',
        clue: 'Không khí và nước biển chuyển động tạo thành những gì?',
      },
      {
        id: 'su-dung',
        lines: ['Tuabin gió,', 'thời tiết'],
        name: 'Tuabin gió và các hiện tượng thời tiết',
        form: 'Cơ năng, điện năng, nhiệt năng',
        store: 'Năng lượng được dùng hoặc tản dần vào môi trường.',
        change:
          'Gió làm quay tuabin để tạo điện, tạo ra mưa bão và các hiện tượng thời tiết; cuối cùng năng lượng tản ra dưới dạng nhiệt.',
        clue: 'Động năng của gió có thể làm quay cái gì để tạo ra điện?',
      },
    ],
  },
];

/**
 * @param {string} id
 * @returns {Cycle}
 */
export function cycleOf(id) {
  const cycle = CYCLES.find((c) => c.id === id);
  if (!cycle) throw new Error(`no energy cycle ${id}`);
  return cycle;
}

/**
 * Stage ids in the order the energy reaches them, starting at the Sun.
 * @param {Cycle} cycle
 */
export function route(cycle) {
  return [SUN_ID, ...cycle.stages.map((s) => s.id)];
}

/**
 * A stage of the cycle by id, the Sun included.
 * @param {Cycle} cycle @param {string} id
 * @returns {Stage}
 */
export function stageOf(cycle, id) {
  if (id === SUN_ID) return SUN;
  const stage = cycle.stages.find((s) => s.id === id);
  if (!stage) throw new Error(`no stage ${id} in ${cycle.id}`);
  return stage;
}

/**
 * The learner follows the energy: a press on the next stage moves on, any
 * other press changes nothing and gets the next stage's clue. `done` counts
 * the stages already reached.
 * @param {Cycle} cycle @param {number} done @param {string} id
 * @returns {{ ok: boolean, done: number, finished: boolean, clue: string }}
 */
export function walk(cycle, done, id) {
  const steps = route(cycle);
  const expected = steps[done];
  if (expected === undefined) return { ok: false, done, finished: true, clue: '' };
  if (id !== expected) {
    return { ok: false, done, finished: false, clue: stageOf(cycle, expected).clue };
  }
  const next = done + 1;
  return {
    ok: true,
    done: next,
    finished: next === steps.length,
    clue: next < steps.length ? stageOf(cycle, steps[next]).clue : '',
  };
}

export const NODE_W = 92;
export const NODE_H = 40;

/**
 * Stage boxes on an ellipse, clockwise from the top, and the arrows joining
 * them. An arrow runs between box centres, so the boxes hide its ends and its
 * head sits at the middle; the last arrow closes the ring.
 * @param {number} n @param {number} cx @param {number} cy @param {number} rx @param {number} ry
 */
export function ringLayout(n, cx, cy, rx, ry) {
  const nodes = Array.from({ length: n }, (_, i) => {
    const a = (2 * Math.PI * i) / n;
    return { x: cx + rx * Math.sin(a), y: cy - ry * Math.cos(a) };
  });
  const edges = nodes.map((from, i) => {
    const to = nodes[(i + 1) % n];
    return {
      x1: from.x,
      y1: from.y,
      x2: to.x,
      y2: to.y,
      mx: (from.x + to.x) / 2,
      my: (from.y + to.y) / 2,
      angle: (Math.atan2(to.y - from.y, to.x - from.x) * 180) / Math.PI,
    };
  });
  return { nodes, edges };
}
