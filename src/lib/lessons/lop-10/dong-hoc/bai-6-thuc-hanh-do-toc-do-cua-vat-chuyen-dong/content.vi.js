/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Thiết kế phương án và thực hành đo tốc độ trung bình, tốc độ tức thời của viên bi thép lăn trên máng nghiêng bằng đồng hồ đo thời gian hiện số và cổng quang điện, rồi tính sai số.',
  intro:
    'Đo thời gian bằng đồng hồ bấm giây, phản xạ của tay có thể lệch tới vài phần mười giây. Với một viên bi lướt qua cổng trong vài phần trăm giây, sai lệch đó còn lớn hơn cả kết quả. Đồng hồ hiện số điều khiển bằng cổng quang điện giúp ta đo được thời gian ngắn đến phần nghìn giây.',
  objectives: [
    'Nêu được chức năng của đồng hồ đo thời gian hiện số và cổng quang điện.',
    'Chọn đúng chế độ đo (MODE) để đo tốc độ trung bình và tốc độ tức thời.',
    'Thực hành đo, ghi số liệu, tính tốc độ và sai số của phép đo.',
    'Nêu được nguyên nhân gây sai số và cách hạn chế.',
  ],
  sections: [
    {
      heading: 'Đồng hồ đo thời gian hiện số và cổng quang điện',
      blocks: [
        {
          type: 'p',
          text: 'Muốn đo tốc độ của một vật, ta đo quãng đường vật đi được và thời gian đi hết quãng đường đó. Đồng hồ hiện số đo được thời gian đến phần nghìn giây ($0{,}001$ s) và được điều khiển bằng cổng quang điện: khi vật chắn tia sáng của cổng, đồng hồ nhận được tín hiệu để bắt đầu hoặc dừng đếm.',
        },
        {
          type: 'table',
          caption: 'Các chế độ đo thường dùng',
          head: ['MODE', 'Đồng hồ đo'],
          rows: [
            ['A', 'Thời gian vật chắn cổng quang điện nối với ổ A'],
            ['B', 'Thời gian vật chắn cổng quang điện nối với ổ B'],
            ['A + B', 'Tổng thời gian vật chắn hai cổng quang điện'],
            ['A↔B', 'Thời gian vật đi từ cổng nối với ổ A đến cổng nối với ổ B'],
          ],
        },
        {
          type: 'p',
          text: 'Nút RESET đưa số chỉ của đồng hồ về $0{,}000$ trước mỗi lần đo.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Dụng cụ khác: đồng hồ cần rung',
          text: 'Đồng hồ cần rung có một cần rung đều đặn khoảng $50$ lần trong một giây, đánh dấu chấm lên băng giấy gắn với xe. Khoảng cách giữa hai chấm liên tiếp là quãng đường xe đi trong $0{,}02$ s.',
        },
      ],
    },
    {
      heading: 'Phương án đo tốc độ',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Tốc độ trung bình giữa hai cổng',
          text: 'Đo quãng đường $s = EF$ bằng thước, đặt đồng hồ ở MODE A↔B để đo thời gian $t$ bi đi từ $E$ đến $F$, rồi tính $v = \\dfrac{s}{t}$.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Tốc độ tức thời tại một cổng',
          text: 'Đo đường kính $d$ của viên bi bằng thước kẹp, đặt đồng hồ ở MODE A hoặc MODE B để đo thời gian $t$ bi chắn cổng, rồi tính $v = \\dfrac{d}{t}$. Thời gian này rất ngắn nên kết quả được coi là tốc độ tức thời của bi tại cổng đó.',
        },
        {
          type: 'p',
          text: 'Sai số được tính như đã học ở bài trước: $\\delta v = \\delta s + \\delta t$ và $\\Delta v = \\delta v \\cdot \\overline{v}$; với tốc độ tức thời, thay $\\delta s$ bằng $\\delta d$. Sai số dụng cụ được lấy bằng nửa độ chia nhỏ nhất: $\\Delta s_{dc} = 0{,}0005$ m với thước có ĐCNN $1$ mm, $\\Delta d_{dc} = 0{,}01$ mm với thước kẹp có ĐCNN $0{,}02$ mm, $\\Delta t_{dc} = 0{,}0005$ s với đồng hồ hiện số.',
        },
      ],
    },
    {
      heading: 'Thực hành: đo tốc độ của viên bi thép',
      project: true,
      blocks: [
        {
          type: 'p',
          text: 'Mục tiêu: đo tốc độ trung bình của viên bi thép giữa hai cổng $E$, $F$ và tốc độ tức thời của bi tại cổng $F$, tính sai số và viết kết quả.',
        },
        {
          type: 'list',
          items: [
            'Máng nhôm có thước đo, giá đỡ để chỉnh độ nghiêng.',
            'Viên bi thép, nam châm điện và công tắc để giữ và thả bi.',
            'Đồng hồ đo thời gian hiện số, hai cổng quang điện $E$, $F$.',
            'Thước kẹp để đo đường kính viên bi.',
          ],
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Lắp máng nghiêng, nối cổng $E$ với ổ A và cổng $F$ với ổ B của đồng hồ, cấp điện cho đồng hồ và nam châm điện.',
            'Đo đường kính $d$ của bi. Đặt hai cổng cách nhau $s = 0{,}5$ m và ghi lại $s$.',
            'Chọn MODE A↔B, nhấn RESET, thả bi rồi ghi thời gian $t$. Lặp lại ít nhất $3$ lần với cùng vị trí thả.',
            'Chọn MODE B, nhấn RESET, thả bi rồi ghi thời gian bi chắn cổng $F$. Lặp lại ít nhất $3$ lần.',
            'Tính $\\overline{t}$, $\\overline{v}$, $\\delta v$ và $\\Delta v$ cho từng phép đo.',
          ],
        },
        {
          type: 'table',
          caption: 'Mẫu bảng ghi số liệu',
          head: ['Lần đo', '$t$ ở MODE A↔B (s)', '$t$ ở MODE B (s)'],
          rows: [
            ['$1$', '…', '…'],
            ['$2$', '…', '…'],
            ['$3$', '…', '…'],
            ['Trung bình', '…', '…'],
          ],
        },
        {
          type: 'p',
          text: 'Báo cáo: nộp bảng số liệu, kết quả dưới dạng $v = \\overline{v} \\pm \\Delta v$ của hai phép đo, so sánh hai tốc độ và nêu nguyên nhân gây sai số.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Hạn chế sai số',
          text: 'Sai số đến từ dụng cụ, từ việc đo quãng đường và đường kính chưa chuẩn, từ thao tác thả bi và từ gió. Hãy đo nhiều lần lấy trung bình, giữ nguyên vị trí thả bi và tắt quạt, điều hoà khi làm thí nghiệm.',
        },
      ],
    },
  ],
  explore: {
    title: 'Máng nghiêng ảo',
    instruction:
      'Kéo hai cổng $E$, $F$ dọc máng hoặc chọn cổng rồi dùng phím mũi tên. Chọn MODE, thả bi ít nhất $3$ lần ở mỗi MODE và đọc kết quả. So sánh tốc độ tại $E$, tốc độ trung bình và tốc độ tại $F$.',
  },
  examples: [
    {
      problem:
        'Đo thời gian bi đi giữa hai cổng cách nhau $s = 0{,}500$ m (thước ĐCNN $1$ mm) ở MODE A↔B được $0{,}777$ s; $0{,}780$ s; $0{,}776$ s. Tính tốc độ trung bình và viết kết quả.',
      steps: [
        'Thời gian trung bình: $\\overline{t} = \\dfrac{0{,}777 + 0{,}780 + 0{,}776}{3} \\approx 0{,}778$ s.',
        'Tốc độ trung bình: $\\overline{v} = \\dfrac{0{,}500}{0{,}778} \\approx 0{,}643$ m/s.',
        'Sai số thời gian: $\\overline{\\Delta t} = \\dfrac{0{,}001 + 0{,}002 + 0{,}002}{3} \\approx 0{,}0017$ s, nên $\\Delta t \\approx 0{,}0017 + 0{,}0005 = 0{,}0022$ s.',
        '$\\delta v = \\dfrac{\\Delta s}{s} + \\dfrac{\\Delta t}{\\overline{t}} = \\dfrac{0{,}0005}{0{,}5} + \\dfrac{0{,}0022}{0{,}778} \\approx 0{,}38\\%$.',
        '$\\Delta v = 0{,}38\\% \\cdot 0{,}643 \\approx 0{,}002$ m/s.',
      ],
      answer: '$v = 0{,}643 \\pm 0{,}002$ m/s.',
    },
    {
      problem:
        'Viên bi đường kính $d = 0{,}02000$ m (sai số $\\Delta d = 0{,}00001$ m) chắn cổng $E$ ở MODE A trong $0{,}033$ s; $0{,}032$ s; $0{,}031$ s. Tính tốc độ tức thời của bi tại $E$.',
      steps: [
        'Thời gian trung bình: $\\overline{t} = 0{,}032$ s.',
        'Tốc độ tức thời: $\\overline{v} = \\dfrac{0{,}02}{0{,}032} = 0{,}625$ m/s.',
        'Sai số thời gian: $\\overline{\\Delta t} = \\dfrac{0{,}001 + 0 + 0{,}001}{3} \\approx 0{,}0007$ s, nên $\\Delta t \\approx 0{,}0007 + 0{,}0005 = 0{,}0012$ s (giữ thêm chữ số khi tính tiếp: $0{,}00117$ s).',
        '$\\delta v = \\dfrac{0{,}00001}{0{,}02} + \\dfrac{0{,}00117}{0{,}032} \\approx 0{,}05\\% + 3{,}66\\% \\approx 3{,}7\\%$.',
        '$\\Delta v \\approx 3{,}7\\% \\cdot 0{,}625 \\approx 0{,}023$ m/s.',
      ],
      answer: '$v = 0{,}625 \\pm 0{,}023$ m/s. Sai số lớn hơn nhiều, vì thời gian đo rất ngắn.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt:
        'Muốn đo thời gian bi đi từ cổng $E$ (nối ổ A) đến cổng $F$ (nối ổ B), ta chọn MODE nào?',
      options: ['MODE A', 'MODE B', 'MODE A + B', 'MODE A↔B'],
      answer: 3,
      hints: ['Đồng hồ phải chạy suốt khoảng thời gian bi đi giữa hai cổng.'],
      solution: 'MODE A↔B đo thời gian vật đi từ cổng nối với ổ A đến cổng nối với ổ B.',
    },
    {
      type: 'choice',
      prompt:
        'Để đo tốc độ tức thời của bi tại cổng $E$ (nối ổ A), ta đặt MODE nào và cần đo thêm gì?',
      options: [
        'MODE A, đo đường kính bi',
        'MODE B, đo đường kính bi',
        'MODE A↔B, đo khoảng cách $EF$',
        'MODE A + B, đo khoảng cách $EF$',
      ],
      answer: 0,
      hints: ['Đồng hồ chỉ cần đo thời gian bi chắn cổng $E$.'],
      solution:
        'MODE A đo thời gian bi chắn cổng $E$; với đường kính $d$ của bi, tính $v = \\dfrac{d}{t}$.',
    },
    {
      type: 'number',
      prompt:
        'Bi đi giữa hai cổng cách nhau $0{,}40$ m trong thời gian trung bình $0{,}500$ s. Tính tốc độ trung bình của bi.',
      answer: 0.8,
      tolerance: 0.001,
      unit: 'm/s',
      hints: ['Áp dụng $v = \\dfrac{s}{t}$.'],
      solution: '$v = \\dfrac{0{,}40}{0{,}500} = 0{,}8$ m/s.',
    },
    {
      type: 'number',
      prompt:
        'Viên bi đường kính $2{,}0$ cm chắn một cổng quang điện trong $0{,}025$ s. Tính tốc độ tức thời của bi tại cổng đó.',
      answer: 0.8,
      tolerance: 0.001,
      unit: 'm/s',
      hints: ['Đổi đường kính ra mét.', 'Áp dụng $v = \\dfrac{d}{t}$.'],
      solution: '$v = \\dfrac{0{,}020}{0{,}025} = 0{,}8$ m/s.',
    },
    {
      type: 'number',
      prompt:
        'Đo được $s = 0{,}500 \\pm 0{,}001$ m và $t = 0{,}800 \\pm 0{,}004$ s. Tính sai số tỉ đối $\\delta v$ của tốc độ, theo %.',
      answer: 0.7,
      tolerance: 0.01,
      unit: '%',
      hints: ['Tính $\\delta s$ và $\\delta t$ riêng rồi cộng lại.'],
      solution:
        '$\\delta s = \\dfrac{0{,}001}{0{,}500} = 0{,}2\\%$; $\\delta t = \\dfrac{0{,}004}{0{,}800} = 0{,}5\\%$; $\\delta v = 0{,}2\\% + 0{,}5\\% = 0{,}7\\%$.',
    },
    {
      type: 'choice',
      prompt: 'Vì sao $v = \\dfrac{d}{t}$ khi bi chắn cổng lại được coi là tốc độ tức thời?',
      options: [
        'Vì đường kính của bi không đổi.',
        'Vì thời gian bi chắn cổng rất ngắn, tốc độ gần như không kịp thay đổi.',
        'Vì đồng hồ ở MODE A đo chính xác tuyệt đối.',
        'Vì bi chuyển động thẳng đều trên máng.',
      ],
      answer: 1,
      hints: ['Tốc độ tức thời là tốc độ trung bình trong một khoảng thời gian rất nhỏ.'],
      solution:
        'Bi đi qua cổng trong khoảng thời gian rất nhỏ nên tốc độ trung bình trong khoảng đó xấp xỉ tốc độ tức thời. Thực tế bi vẫn chạy nhanh dần.',
    },
    {
      type: 'multi',
      prompt: 'Những việc nào giúp giảm sai số của phép đo trong bài thực hành này?',
      options: [
        'Đo nhiều lần rồi lấy giá trị trung bình.',
        'Tắt quạt, điều hoà khi làm thí nghiệm.',
        'Mỗi lần đo thả bi ở một vị trí khác nhau.',
        'Đo cẩn thận quãng đường và đường kính của bi.',
      ],
      answers: [0, 1, 3],
      hints: ['Muốn lấy trung bình, các lần đo phải có cùng điều kiện.'],
      solution:
        'Đo nhiều lần, tránh gió và đo cẩn thận làm giảm sai số. Đổi vị trí thả bi làm mỗi lần đo một tốc độ khác nhau nên không được.',
    },
    {
      type: 'order',
      prompt: 'Sắp xếp các bước đo tốc độ trung bình của viên bi từ $E$ đến $F$.',
      items: [
        'Thả bi, đọc thời gian trên đồng hồ.',
        'Lắp máng, nối cổng $E$ với ổ A và cổng $F$ với ổ B.',
        'Chọn MODE A↔B rồi nhấn RESET.',
        'Tính $\\overline{t}$ và $v = \\dfrac{s}{\\overline{t}}$.',
      ],
      answer: [1, 2, 0, 3],
      hints: ['Lắp thiết bị trước, tính toán sau cùng.'],
      solution:
        'Lắp máng và nối cổng, chọn MODE A↔B và RESET, thả bi đọc số chỉ (lặp lại vài lần), cuối cùng tính $\\overline{t}$ và $v$.',
    },
  ],
  takeaways: [
    'Đồng hồ hiện số kết hợp cổng quang điện đo được thời gian đến $0{,}001$ s.',
    'MODE A↔B đo thời gian đi giữa hai cổng, dùng để tính tốc độ trung bình $v = \\dfrac{s}{t}$.',
    'MODE A hoặc B đo thời gian bi chắn cổng, dùng để tính tốc độ tức thời $v = \\dfrac{d}{t}$.',
    'Viết kết quả dưới dạng $v = \\overline{v} \\pm \\Delta v$, với $\\delta v = \\delta s + \\delta t$ (tốc độ tức thời: $\\delta d + \\delta t$).',
  ],
};
