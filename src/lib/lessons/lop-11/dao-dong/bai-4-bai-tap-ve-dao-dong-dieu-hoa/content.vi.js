/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Luyện tập viết phương trình dao động điều hoà, tính li độ, vận tốc, gia tốc tại một thời điểm hay một li độ bất kì, và đọc biên độ, chu kì, pha ban đầu trên đồ thị li độ – thời gian.',
  intro:
    'Ba bài học vừa qua cho ta đủ công cụ để mô tả trọn vẹn một dao động điều hoà: phương trình li độ, vận tốc, gia tốc và đồ thị của chúng. Bài này luyện cách dùng các công cụ đó để giải những dạng bài tập thường gặp.',
  objectives: [
    'Xác định được $A$, $\\omega$, $T$, $f$, $\\varphi$ từ phương trình hoặc đồ thị dao động.',
    'Viết được phương trình dao động từ các điều kiện ban đầu.',
    'Tính được li độ, vận tốc, gia tốc tại một thời điểm hoặc tại một li độ bất kì.',
  ],
  sections: [
    {
      heading: 'Tóm tắt công thức',
      blocks: [
        {
          type: 'table',
          head: ['Đại lượng', 'Công thức'],
          rows: [
            ['Li độ', '$x = A\\cos(\\omega t + \\varphi)$'],
            ['Tần số góc, chu kì, tần số', '$\\omega = \\dfrac{2\\pi}{T} = 2\\pi f$'],
            ['Vận tốc', '$v = -\\omega A\\sin(\\omega t + \\varphi)$, $v_{max} = \\omega A$'],
            ['Gia tốc', '$a = -\\omega^2 x$, $a_{max} = \\omega^2 A$'],
            ['Liên hệ $x$ và $v$', '$x^2 + \\dfrac{v^2}{\\omega^2} = A^2$'],
            ['Độ lệch pha', '$\\Delta\\varphi = 2\\pi\\dfrac{\\Delta t}{T}$'],
          ],
        },
      ],
    },
    {
      heading: 'Phương pháp giải',
      blocks: [
        {
          type: 'list',
          ordered: true,
          items: [
            'Viết phương trình: tìm $A$ (từ biên độ, chiều dài quỹ đạo $L = 2A$ hoặc $A = \\dfrac{v_{max}}{\\omega}$), tìm $\\omega = \\dfrac{2\\pi}{T} = 2\\pi f$, rồi tìm $\\varphi$ từ trạng thái lúc $t = 0$: $\\cos\\varphi = \\dfrac{x_0}{A}$; vật đi theo chiều dương thì $\\varphi < 0$, theo chiều âm thì $\\varphi > 0$.',
            'Tính tại một thời điểm: thay $t$ vào pha $(\\omega t + \\varphi)$ rồi tính $x$, $v$, $a$.',
            'Tính tại một li độ: dùng $|v| = \\omega\\sqrt{A^2 - x^2}$ và $a = -\\omega^2 x$, không cần biết thời điểm.',
            'Đọc đồ thị $x - t$: $A$ là tung độ của đỉnh; $T$ là khoảng thời gian giữa hai đỉnh liên tiếp; $\\varphi$ đọc từ giá trị $x_0$ lúc $t = 0$ và chiều biến thiên của đồ thị ngay sau đó.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Chú ý đơn vị và chế độ máy tính',
          text: 'Pha tính bằng radian: đặt máy tính ở chế độ rad khi tính $\\cos$, $\\sin$. Đổi cm sang m khi đề hỏi theo đơn vị SI: $1$ cm/s² $= 0{,}01$ m/s².',
        },
      ],
    },
  ],
  explore: {
    title: 'Đọc đồ thị dao động',
    instruction:
      'Mỗi lần bấm Đồ thị khác, một đồ thị li độ – thời gian mới hiện ra. Đọc biên độ, chu kì và pha ban đầu, nhập vào rồi bấm Kiểm tra. Khi đọc đúng, em sẽ thấy phương trình dao động và tốc độ, gia tốc cực đại của vật.',
  },
  examples: [
    {
      problem:
        'Một vật dao động điều hoà có phương trình $x = 2\\cos\\left(4\\pi t - \\dfrac{\\pi}{6}\\right)$ (cm). Xác định biên độ, chu kì, tần số, pha ban đầu và tính li độ, vận tốc, gia tốc của vật tại thời điểm $t = 0{,}25$ s.',
      steps: [
        '$A = 2$ cm, $\\omega = 4\\pi$ rad/s, $T = \\dfrac{2\\pi}{4\\pi} = 0{,}5$ s, $f = 2$ Hz, $\\varphi = -\\dfrac{\\pi}{6}$.',
        'Pha lúc $t = 0{,}25$ s: $4\\pi \\cdot 0{,}25 - \\dfrac{\\pi}{6} = \\pi - \\dfrac{\\pi}{6} = \\dfrac{5\\pi}{6}$.',
        '$x = 2\\cos\\dfrac{5\\pi}{6} = -\\sqrt{3} \\approx -1{,}73$ cm.',
        '$v = -4\\pi \\cdot 2\\sin\\dfrac{5\\pi}{6} = -4\\pi \\approx -12{,}57$ cm/s.',
        '$a = -\\omega^2 x = -(4\\pi)^2 \\cdot (-\\sqrt{3}) = 16\\sqrt{3}\\pi^2 \\approx 273{,}5$ cm/s².',
      ],
      answer:
        '$x \\approx -1{,}73$ cm, $v \\approx -12{,}57$ cm/s, $a \\approx 273{,}5$ cm/s² (vật đang đi theo chiều âm, ra xa vị trí cân bằng nên chậm dần).',
    },
    {
      problem:
        'Một vật dao động điều hoà với biên độ $5$ cm, chu kì $0{,}5$ s. Chọn gốc thời gian lúc vật qua li độ $x = 2{,}5$ cm theo chiều dương. Viết phương trình dao động.',
      steps: [
        '$\\omega = \\dfrac{2\\pi}{0{,}5} = 4\\pi$ rad/s.',
        'Lúc $t = 0$: $\\cos\\varphi = \\dfrac{x_0}{A} = \\dfrac{2{,}5}{5} = \\dfrac{1}{2}$, nên $\\varphi = \\pm\\dfrac{\\pi}{3}$.',
        'Vật đi theo chiều dương nên $\\varphi < 0$: $\\varphi = -\\dfrac{\\pi}{3}$.',
        'Phương trình: $x = 5\\cos\\left(4\\pi t - \\dfrac{\\pi}{3}\\right)$ (cm).',
      ],
      answer: '$x = 5\\cos\\left(4\\pi t - \\dfrac{\\pi}{3}\\right)$ (cm).',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt:
        'Một vật dao động điều hoà theo phương trình $x = 2\\cos\\left(4\\pi t - \\dfrac{\\pi}{6}\\right)$ (cm). Tính tần số dao động.',
      answer: 2,
      unit: 'Hz',
      hints: ['$\\omega = 2\\pi f$.'],
      solution: '$f = \\dfrac{\\omega}{2\\pi} = \\dfrac{4\\pi}{2\\pi} = 2$ Hz.',
    },
    {
      type: 'number',
      prompt:
        'Với vật dao động $x = 2\\cos\\left(4\\pi t - \\dfrac{\\pi}{6}\\right)$ (cm), tính li độ của vật lúc $t = 0$ (làm tròn đến hai chữ số thập phân).',
      answer: 1.73,
      tolerance: 0.01,
      unit: 'cm',
      hints: ['Thay $t = 0$ vào phương trình, dùng chế độ radian.'],
      solution:
        '$x_0 = 2\\cos\\left(-\\dfrac{\\pi}{6}\\right) = 2 \\cdot \\dfrac{\\sqrt{3}}{2} = \\sqrt{3} \\approx 1{,}73$ cm.',
    },
    {
      type: 'choice',
      prompt:
        'Một vật dao động điều hoà với biên độ $8$ cm, chu kì $2$ s. Gốc thời gian lúc vật qua vị trí cân bằng theo chiều âm. Phương trình dao động là',
      options: [
        '$x = 8\\cos\\left(\\pi t + \\dfrac{\\pi}{2}\\right)$ (cm)',
        '$x = 8\\cos\\left(\\pi t - \\dfrac{\\pi}{2}\\right)$ (cm)',
        '$x = 8\\cos\\left(2\\pi t + \\dfrac{\\pi}{2}\\right)$ (cm)',
        '$x = 8\\cos(\\pi t)$ (cm)',
      ],
      answer: 0,
      hints: [
        'Tính $\\omega = \\dfrac{2\\pi}{T}$.',
        'Qua vị trí cân bằng theo chiều âm thì $\\varphi > 0$.',
      ],
      solution:
        '$\\omega = \\dfrac{2\\pi}{2} = \\pi$ rad/s. Lúc $t = 0$: $\\cos\\varphi = 0$ và vật đi theo chiều âm nên $\\varphi = \\dfrac{\\pi}{2}$. Vậy $x = 8\\cos\\left(\\pi t + \\dfrac{\\pi}{2}\\right)$ (cm).',
    },
    {
      type: 'choice',
      prompt:
        'Một vật dao động điều hoà với biên độ $4$ cm, tần số $0{,}5$ Hz. Gốc thời gian lúc vật ở biên âm. Phương trình dao động là',
      options: [
        '$x = 4\\cos(\\pi t + \\pi)$ (cm)',
        '$x = 4\\cos(\\pi t)$ (cm)',
        '$x = 4\\cos(0{,}5\\pi t + \\pi)$ (cm)',
        '$x = 4\\cos\\left(\\pi t - \\dfrac{\\pi}{2}\\right)$ (cm)',
      ],
      answer: 0,
      hints: ['$\\omega = 2\\pi f$.', 'Ở biên âm: $\\cos\\varphi = -1$.'],
      solution:
        '$\\omega = 2\\pi \\cdot 0{,}5 = \\pi$ rad/s, $\\varphi = \\pi$. Vậy $x = 4\\cos(\\pi t + \\pi)$ (cm).',
    },
    {
      type: 'number',
      prompt:
        'Một vật dao động theo phương trình $x = 10\\cos(2\\pi t)$ (cm). Tính li độ của vật lúc $t = \\dfrac{1}{6}$ s.',
      answer: 5,
      unit: 'cm',
      hints: ['Pha lúc đó là $2\\pi \\cdot \\dfrac{1}{6}$.'],
      solution:
        'Pha $= \\dfrac{\\pi}{3}$, nên $x = 10\\cos\\dfrac{\\pi}{3} = 10 \\cdot \\dfrac{1}{2} = 5$ cm.',
    },
    {
      type: 'number',
      prompt:
        'Với vật $x = 10\\cos(2\\pi t)$ (cm), tính vận tốc của vật lúc $t = \\dfrac{1}{6}$ s (làm tròn đến hai chữ số thập phân, chú ý dấu).',
      answer: -54.41,
      tolerance: 0.01,
      unit: 'cm/s',
      hints: ['$v = -\\omega A\\sin(\\omega t + \\varphi)$.'],
      solution:
        '$v = -2\\pi \\cdot 10\\sin\\dfrac{\\pi}{3} = -20\\pi \\cdot \\dfrac{\\sqrt{3}}{2} = -10\\sqrt{3}\\pi \\approx -54{,}41$ cm/s: vật đang đi theo chiều âm.',
    },
    {
      type: 'number',
      prompt:
        'Một vật dao động điều hoà với biên độ $5$ cm, tần số góc $4$ rad/s. Tính tốc độ của vật khi nó qua li độ $x = -3$ cm.',
      answer: 16,
      unit: 'cm/s',
      hints: ['$|v| = \\omega\\sqrt{A^2 - x^2}$; bình phương làm mất dấu của $x$.'],
      solution: '$|v| = 4\\sqrt{5^2 - (-3)^2} = 4 \\cdot 4 = 16$ cm/s.',
    },
    {
      type: 'number',
      prompt:
        'Một vật dao động điều hoà với chu kì $1$ s. Tính gia tốc của vật khi nó ở li độ $x = 2$ cm (làm tròn đến hai chữ số thập phân, chú ý dấu).',
      answer: -78.96,
      tolerance: 0.01,
      unit: 'cm/s²',
      hints: ['$\\omega = \\dfrac{2\\pi}{T}$, rồi $a = -\\omega^2 x$.'],
      solution:
        '$\\omega = 2\\pi$ rad/s; $a = -(2\\pi)^2 \\cdot 2 = -8\\pi^2 \\approx -78{,}96$ cm/s².',
    },
    {
      type: 'choice',
      prompt:
        'Đồ thị li độ – thời gian của một vật cho thấy: lúc $t = 0$ vật ở $x = 6$ cm (đỉnh cao nhất của đồ thị), và lần đầu tiên tới $x = -6$ cm lúc $t = 0{,}5$ s. Phương trình dao động là',
      options: [
        '$x = 6\\cos(2\\pi t)$ (cm)',
        '$x = 6\\cos(\\pi t)$ (cm)',
        '$x = 12\\cos(2\\pi t)$ (cm)',
        '$x = 6\\cos(2\\pi t + \\pi)$ (cm)',
      ],
      answer: 0,
      hints: [
        'Từ biên dương đến biên âm là bao nhiêu phần chu kì?',
        'Vật bắt đầu ở biên dương nên $\\varphi = 0$.',
      ],
      solution:
        '$A = 6$ cm. Từ biên dương đến biên âm mất $\\dfrac{T}{2} = 0{,}5$ s nên $T = 1$ s, $\\omega = 2\\pi$ rad/s. Lúc $t = 0$ vật ở biên dương nên $\\varphi = 0$: $x = 6\\cos(2\\pi t)$ (cm).',
    },
    {
      type: 'number',
      prompt:
        'Một vật dao động điều hoà với biên độ $4$ cm. Tại li độ nào (lấy giá trị dương) thì tốc độ của vật bằng một nửa tốc độ cực đại? Làm tròn đến hai chữ số thập phân.',
      answer: 3.46,
      tolerance: 0.01,
      unit: 'cm',
      hints: [
        'Viết $\\omega\\sqrt{A^2 - x^2} = \\dfrac{\\omega A}{2}$.',
        'Bình phương hai vế: $A^2 - x^2 = \\dfrac{A^2}{4}$.',
      ],
      solution:
        '$A^2 - x^2 = \\dfrac{A^2}{4}$ nên $x^2 = \\dfrac{3A^2}{4}$, $x = \\dfrac{\\sqrt{3}}{2}A = 2\\sqrt{3} \\approx 3{,}46$ cm.',
    },
    {
      type: 'number',
      prompt:
        'Một vật dao động điều hoà với chu kì $1{,}2$ s. Tính khoảng thời gian ngắn nhất để vật đi từ vị trí cân bằng đến li độ $x = \\dfrac{A}{2}$.',
      answer: 0.1,
      unit: 's',
      hints: [
        'Trên đường tròn, điểm $M$ phải quay một góc bao nhiêu để hình chiếu đi từ $0$ đến $\\dfrac{A}{2}$?',
        'Góc quay $\\Delta\\varphi$ ứng với thời gian $\\Delta t = \\dfrac{\\Delta\\varphi}{2\\pi}T$.',
      ],
      solution:
        'Ở vị trí cân bằng, $OM$ vuông góc với $Ox$; ở $x = \\dfrac{A}{2}$, $OM$ hợp với $Ox$ góc $\\dfrac{\\pi}{3}$. Góc quay ngắn nhất là $\\dfrac{\\pi}{2} - \\dfrac{\\pi}{3} = \\dfrac{\\pi}{6}$, nên $\\Delta t = \\dfrac{1}{12}T = \\dfrac{1{,}2}{12} = 0{,}1$ s.',
    },
  ],
  takeaways: [
    'Viết phương trình: tìm $A$, $\\omega$, rồi $\\varphi$ từ $x_0$ và chiều chuyển động lúc $t = 0$.',
    'Tại một thời điểm: tính pha $(\\omega t + \\varphi)$ rồi thay vào $x$, $v$, $a$ (máy tính để chế độ radian).',
    'Tại một li độ: $|v| = \\omega\\sqrt{A^2 - x^2}$, $a = -\\omega^2 x$.',
    'Trên đồ thị $x - t$: $A$ là tung độ đỉnh, $T$ là khoảng cách hai đỉnh liên tiếp, $\\varphi$ đọc từ điểm xuất phát và chiều đi của đồ thị.',
  ],
};
