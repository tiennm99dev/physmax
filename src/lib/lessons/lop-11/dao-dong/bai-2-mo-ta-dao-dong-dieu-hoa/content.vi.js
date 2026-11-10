/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Dao động điều hoà được mô tả bằng phương trình x = A cos(ωt + φ) với biên độ A, tần số góc ω = 2π/T = 2πf và pha ban đầu φ; độ lệch pha của hai dao động cùng chu kì cho biết dao động nào sớm hơn và sớm hơn bao lâu.',
  intro:
    'Hai con lắc giống hệt nhau, cùng chu kì, nhưng được thả ở hai thời điểm khác nhau: con lắc này luôn đi trước con lắc kia một chút. Để vẽ đồ thị hay viết phương trình của một dao động điều hoà, ta cần biết những đại lượng nào, và làm sao nói chính xác dao động nào đi trước?',
  objectives: [
    'Viết được phương trình dao động điều hoà $x = A\\cos(\\omega t + \\varphi)$ và nêu ý nghĩa của từng đại lượng.',
    'Nêu được mối liên hệ $\\omega = \\dfrac{2\\pi}{T} = 2\\pi f$.',
    'Xác định được pha ban đầu từ trạng thái của vật lúc $t = 0$.',
    'Xác định được độ lệch pha giữa hai dao động điều hoà cùng chu kì từ phương trình hoặc đồ thị.',
  ],
  sections: [
    {
      heading: 'Phương trình dao động điều hoà',
      blocks: [
        {
          type: 'p',
          text: 'Li độ của vật dao động điều hoà là hàm côsin của thời gian, viết dưới dạng',
        },
        { type: 'tex', tex: 'x = A\\cos(\\omega t + \\varphi)' },
        {
          type: 'list',
          items: [
            '$x$ là li độ của vật tại thời điểm $t$.',
            '$A$ là biên độ, luôn dương.',
            '$\\omega$ là tần số góc, đơn vị rad/s, luôn dương.',
            '$(\\omega t + \\varphi)$ là pha của dao động tại thời điểm $t$, đơn vị rad; pha cho biết trạng thái (vị trí và chiều chuyển động) của vật tại thời điểm đó.',
            '$\\varphi$ là pha ban đầu, tức pha tại $t = 0$, đơn vị rad, thường chọn trong khoảng $-\\pi < \\varphi \\le \\pi$.',
          ],
        },
        {
          type: 'p',
          text: 'Khi $t$ tăng thêm một chu kì $T$, pha tăng thêm $2\\pi$ và vật trở lại trạng thái cũ, nên $\\omega T = 2\\pi$:',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Tần số góc',
          text: '$\\omega = \\dfrac{2\\pi}{T} = 2\\pi f$, đơn vị rad/s.',
        },
      ],
    },
    {
      heading: 'Dao động điều hoà và chuyển động tròn đều',
      blocks: [
        {
          type: 'p',
          text: 'Cho điểm $M$ chuyển động tròn đều ngược chiều kim đồng hồ trên đường tròn tâm $O$, bán kính $A$, với tốc độ góc $\\omega$. Lúc $t = 0$, bán kính $OM$ hợp với trục $Ox$ góc $\\varphi$. Đến thời điểm $t$, góc đó là $\\omega t + \\varphi$, nên hình chiếu $P$ của $M$ trên trục $Ox$ có toạ độ',
        },
        { type: 'tex', tex: 'x = \\overline{OP} = A\\cos(\\omega t + \\varphi)' },
        {
          type: 'callout',
          tone: 'note',
          title: 'Ý nghĩa hình học',
          text: 'Hình chiếu của một điểm chuyển động tròn đều lên một đường kính là một dao động điều hoà. Biên độ là bán kính đường tròn, tần số góc là tốc độ góc, pha ban đầu là góc ban đầu của bán kính $OM$.',
        },
      ],
    },
    {
      heading: 'Pha ban đầu. Độ lệch pha',
      blocks: [
        {
          type: 'p',
          text: 'Pha ban đầu được xác định từ trạng thái của vật lúc $t = 0$: vị trí $x_0 = A\\cos\\varphi$ và chiều chuyển động. Trên đường tròn, vật đi theo chiều dương khi $M$ ở nửa dưới ($\\varphi < 0$), đi theo chiều âm khi $M$ ở nửa trên ($\\varphi > 0$).',
        },
        {
          type: 'table',
          head: ['Trạng thái lúc $t = 0$', 'Pha ban đầu $\\varphi$'],
          rows: [
            ['Ở biên dương $x = A$', '$0$'],
            ['Ở biên âm $x = -A$', '$\\pi$'],
            ['Qua vị trí cân bằng theo chiều dương', '$-\\dfrac{\\pi}{2}$'],
            ['Qua vị trí cân bằng theo chiều âm', '$\\dfrac{\\pi}{2}$'],
            ['Ở $x = \\dfrac{A}{2}$, đi theo chiều âm', '$\\dfrac{\\pi}{3}$'],
          ],
        },
        {
          type: 'p',
          text: 'Xét hai dao động điều hoà cùng tần số góc $\\omega$: $x_1 = A_1\\cos(\\omega t + \\varphi_1)$ và $x_2 = A_2\\cos(\\omega t + \\varphi_2)$. Hiệu hai pha của chúng',
        },
        {
          type: 'tex',
          tex: '\\Delta\\varphi = (\\omega t + \\varphi_2) - (\\omega t + \\varphi_1) = \\varphi_2 - \\varphi_1',
        },
        {
          type: 'p',
          text: 'không phụ thuộc thời gian và bằng hiệu hai pha ban đầu; đó là độ lệch pha của hai dao động. Độ lệch pha ứng với độ lệch về thời gian $\\Delta t$ giữa hai dao động:',
        },
        { type: 'tex', tex: '\\Delta\\varphi = 2\\pi\\frac{\\Delta t}{T} = \\omega\\,\\Delta t' },
        {
          type: 'list',
          items: [
            '$\\Delta\\varphi > 0$: dao động 2 sớm pha hơn dao động 1 (đạt cùng trạng thái sớm hơn); $\\Delta\\varphi < 0$: dao động 2 trễ pha hơn dao động 1.',
            '$\\Delta\\varphi = 2n\\pi$ ($n$ nguyên): hai dao động cùng pha, luôn cùng chiều, cùng đạt biên dương một lúc.',
            '$\\Delta\\varphi = (2n + 1)\\pi$: hai dao động ngược pha, một vật ở biên dương thì vật kia ở biên âm.',
            '$\\Delta\\varphi = (2n + 1)\\dfrac{\\pi}{2}$: hai dao động vuông pha, một vật ở biên thì vật kia qua vị trí cân bằng.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Chỉ so pha khi cùng chu kì',
          text: 'Độ lệch pha chỉ không đổi khi hai dao động có cùng tần số góc. Trên đồ thị, dao động sớm pha hơn là dao động có đỉnh xuất hiện trước (ở bên trái).',
        },
      ],
    },
  ],
  explore: {
    title: 'Từ chuyển động tròn đến đồ thị',
    instruction:
      'Bấm Chạy để điểm M quay và quan sát hình chiếu P dao động trên trục Ox. Chỉnh biên độ A, tần số góc ω và pha ban đầu φ sao cho đồ thị của em trùng với đồ thị mẫu đứt nét; khi chưa trùng, xem độ lệch pha giữa hai dao động.',
  },
  examples: [
    {
      problem:
        'Một vật dao động điều hoà với biên độ $10$ cm, tần số $5$ Hz. Chọn gốc thời gian lúc vật ở vị trí biên dương. Viết phương trình dao động của vật.',
      steps: [
        'Biên độ $A = 10$ cm. Tần số góc $\\omega = 2\\pi f = 2\\pi \\cdot 5 = 10\\pi$ rad/s.',
        'Lúc $t = 0$: $x_0 = A\\cos\\varphi = A$ nên $\\cos\\varphi = 1$, $\\varphi = 0$.',
        'Phương trình: $x = 10\\cos(10\\pi t)$ (cm).',
      ],
      answer: '$x = 10\\cos(10\\pi t)$ (cm).',
    },
    {
      problem:
        'Một vật dao động điều hoà với biên độ $4$ cm, chu kì $2$ s. Chọn gốc thời gian lúc vật qua vị trí cân bằng theo chiều dương. Viết phương trình dao động.',
      steps: [
        '$A = 4$ cm, $\\omega = \\dfrac{2\\pi}{T} = \\dfrac{2\\pi}{2} = \\pi$ rad/s.',
        'Lúc $t = 0$ vật ở vị trí cân bằng: $\\cos\\varphi = 0$, nên $\\varphi = \\pm\\dfrac{\\pi}{2}$.',
        'Vật đi theo chiều dương nên điểm $M$ trên đường tròn ở nửa dưới, $\\varphi < 0$: $\\varphi = -\\dfrac{\\pi}{2}$.',
        'Phương trình: $x = 4\\cos\\left(\\pi t - \\dfrac{\\pi}{2}\\right)$ (cm).',
      ],
      answer: '$x = 4\\cos\\left(\\pi t - \\dfrac{\\pi}{2}\\right)$ (cm).',
    },
    {
      problem:
        'Hai dao động có phương trình $x_1 = 20\\cos\\left(20\\pi t + \\dfrac{\\pi}{2}\\right)$ (cm) và $x_2 = 10\\cos\\left(20\\pi t + \\dfrac{\\pi}{6}\\right)$ (cm). Tính độ lệch pha của hai dao động và độ lệch thời gian tương ứng; dao động nào sớm pha hơn?',
      steps: [
        'Hai dao động cùng tần số góc $\\omega = 20\\pi$ rad/s nên có độ lệch pha không đổi.',
        '$\\Delta\\varphi = \\varphi_1 - \\varphi_2 = \\dfrac{\\pi}{2} - \\dfrac{\\pi}{6} = \\dfrac{\\pi}{3} > 0$: dao động 1 sớm pha hơn dao động 2 một góc $\\dfrac{\\pi}{3}$.',
        'Chu kì $T = \\dfrac{2\\pi}{\\omega} = \\dfrac{2\\pi}{20\\pi} = 0{,}1$ s.',
        '$\\Delta t = \\dfrac{\\Delta\\varphi}{2\\pi}T = \\dfrac{1}{6} \\cdot 0{,}1 = \\dfrac{1}{60} \\approx 0{,}017$ s.',
      ],
      answer:
        'Dao động 1 sớm pha hơn dao động 2 góc $\\dfrac{\\pi}{3}$ rad, tức sớm hơn $\\dfrac{1}{60}$ s.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt:
        'Một vật dao động điều hoà theo phương trình $x = 4\\cos\\left(2\\pi t + \\dfrac{\\pi}{3}\\right)$ (cm). Biên độ dao động là bao nhiêu?',
      answer: 4,
      unit: 'cm',
      hints: ['So sánh với dạng $x = A\\cos(\\omega t + \\varphi)$.'],
      solution: 'Hệ số đứng trước dấu côsin là biên độ: $A = 4$ cm.',
    },
    {
      type: 'number',
      prompt:
        'Một vật dao động điều hoà theo phương trình $x = 4\\cos\\left(2\\pi t + \\dfrac{\\pi}{3}\\right)$ (cm). Tính chu kì dao động.',
      answer: 1,
      unit: 's',
      hints: ['Đọc tần số góc $\\omega$ từ phương trình.', '$T = \\dfrac{2\\pi}{\\omega}$.'],
      solution: '$\\omega = 2\\pi$ rad/s nên $T = \\dfrac{2\\pi}{2\\pi} = 1$ s.',
    },
    {
      type: 'choice',
      prompt:
        'Pha ban đầu của dao động $x = 5\\cos\\left(\\pi t - \\dfrac{\\pi}{6}\\right)$ (cm) là',
      options: [
        '$-\\dfrac{\\pi}{6}$ rad',
        '$\\dfrac{\\pi}{6}$ rad',
        '$\\pi$ rad',
        '$\\left(\\pi t - \\dfrac{\\pi}{6}\\right)$ rad',
      ],
      answer: 0,
      hints: ['Pha ban đầu là pha tại $t = 0$.'],
      solution:
        'Thay $t = 0$ vào pha $\\left(\\pi t - \\dfrac{\\pi}{6}\\right)$ được $\\varphi = -\\dfrac{\\pi}{6}$ rad. Biểu thức $\\left(\\pi t - \\dfrac{\\pi}{6}\\right)$ là pha tại thời điểm $t$, không phải pha ban đầu.',
    },
    {
      type: 'number',
      prompt:
        'Một vật dao động điều hoà với chu kì $0{,}5$ s. Tính tần số góc của dao động (làm tròn đến hai chữ số thập phân).',
      answer: 12.57,
      tolerance: 0.01,
      unit: 'rad/s',
      hints: ['$\\omega = \\dfrac{2\\pi}{T}$.'],
      solution: '$\\omega = \\dfrac{2\\pi}{0{,}5} = 4\\pi \\approx 12{,}57$ rad/s.',
    },
    {
      type: 'choice',
      prompt:
        'Chọn gốc thời gian lúc vật dao động điều hoà ở vị trí biên âm. Pha ban đầu của dao động là',
      options: ['$\\pi$', '$0$', '$\\dfrac{\\pi}{2}$', '$-\\dfrac{\\pi}{2}$'],
      answer: 0,
      hints: ['Lúc $t = 0$: $x_0 = A\\cos\\varphi = -A$.'],
      solution: '$\\cos\\varphi = -1$ nên $\\varphi = \\pi$.',
    },
    {
      type: 'choice',
      prompt:
        'Chọn gốc thời gian lúc vật dao động điều hoà qua vị trí cân bằng theo chiều âm. Pha ban đầu của dao động là',
      options: ['$\\dfrac{\\pi}{2}$', '$-\\dfrac{\\pi}{2}$', '$0$', '$\\pi$'],
      answer: 0,
      hints: [
        'Ở vị trí cân bằng $\\cos\\varphi = 0$.',
        'Trên đường tròn, điểm $M$ ở nửa trên thì hình chiếu đi theo chiều âm.',
      ],
      solution:
        '$\\cos\\varphi = 0$ nên $\\varphi = \\pm\\dfrac{\\pi}{2}$. Vật đi theo chiều âm nên $M$ ở nửa trên đường tròn, $\\varphi > 0$: $\\varphi = \\dfrac{\\pi}{2}$.',
    },
    {
      type: 'choice',
      prompt:
        'Một vật dao động điều hoà với biên độ $6$ cm, tần số $2$ Hz. Gốc thời gian lúc vật ở biên dương. Phương trình dao động là',
      options: [
        '$x = 6\\cos(4\\pi t)$ (cm)',
        '$x = 6\\cos(2\\pi t)$ (cm)',
        '$x = 6\\cos(4\\pi t + \\pi)$ (cm)',
        '$x = 12\\cos(4\\pi t)$ (cm)',
      ],
      answer: 0,
      hints: ['Tính $\\omega = 2\\pi f$.', 'Ở biên dương thì $\\varphi = 0$.'],
      solution:
        '$A = 6$ cm, $\\omega = 2\\pi \\cdot 2 = 4\\pi$ rad/s, $\\varphi = 0$, nên $x = 6\\cos(4\\pi t)$ (cm).',
    },
    {
      type: 'choice',
      prompt:
        'Hai dao động $x_1 = 3\\cos\\left(4\\pi t + \\dfrac{\\pi}{4}\\right)$ (cm) và $x_2 = 3\\cos\\left(4\\pi t - \\dfrac{\\pi}{4}\\right)$ (cm). Khẳng định nào đúng?',
      options: [
        'Hai dao động vuông pha, dao động 1 sớm pha hơn dao động 2',
        'Hai dao động vuông pha, dao động 2 sớm pha hơn dao động 1',
        'Hai dao động ngược pha',
        'Hai dao động cùng pha',
      ],
      answer: 0,
      hints: ['Tính $\\varphi_1 - \\varphi_2$.'],
      solution:
        '$\\varphi_1 - \\varphi_2 = \\dfrac{\\pi}{4} - \\left(-\\dfrac{\\pi}{4}\\right) = \\dfrac{\\pi}{2} > 0$: hai dao động vuông pha và dao động 1 sớm pha hơn.',
    },
    {
      type: 'number',
      prompt:
        'Hai con lắc dao động cùng chu kì $1$ s; con lắc thứ hai luôn đến biên dương muộn hơn con lắc thứ nhất $0{,}25$ s. Tính độ lớn độ lệch pha của hai dao động (rad, làm tròn đến hai chữ số thập phân).',
      answer: 1.57,
      tolerance: 0.01,
      unit: 'rad',
      hints: ['$\\Delta\\varphi = 2\\pi\\dfrac{\\Delta t}{T}$.'],
      solution:
        '$\\Delta\\varphi = 2\\pi \\cdot \\dfrac{0{,}25}{1} = \\dfrac{\\pi}{2} \\approx 1{,}57$ rad: hai dao động vuông pha.',
    },
    {
      type: 'match',
      prompt:
        'Nối mỗi kí hiệu trong phương trình $x = A\\cos(\\omega t + \\varphi)$ với tên gọi của nó.',
      left: ['$A$', '$\\omega$', '$\\varphi$', '$\\omega t + \\varphi$'],
      right: ['Biên độ', 'Tần số góc', 'Pha ban đầu', 'Pha của dao động tại thời điểm $t$'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['Đại lượng nào thay đổi theo thời gian, đại lượng nào không?'],
      solution:
        '$A$ là biên độ, $\\omega$ là tần số góc, $\\varphi$ là pha ban đầu, $(\\omega t + \\varphi)$ là pha tại thời điểm $t$ (đại lượng duy nhất thay đổi theo thời gian).',
    },
  ],
  takeaways: [
    'Phương trình dao động điều hoà: $x = A\\cos(\\omega t + \\varphi)$, với $A > 0$, $\\omega > 0$.',
    'Tần số góc $\\omega = \\dfrac{2\\pi}{T} = 2\\pi f$ (rad/s).',
    'Pha $(\\omega t + \\varphi)$ cho biết trạng thái của vật lúc $t$; pha ban đầu $\\varphi$ xác định từ vị trí và chiều chuyển động lúc $t = 0$.',
    'Dao động điều hoà là hình chiếu của chuyển động tròn đều lên một đường kính.',
    'Hai dao động cùng chu kì có độ lệch pha không đổi $\\Delta\\varphi = \\varphi_2 - \\varphi_1 = 2\\pi\\dfrac{\\Delta t}{T}$; cùng pha, ngược pha, vuông pha là ba trường hợp đặc biệt.',
  ],
};
