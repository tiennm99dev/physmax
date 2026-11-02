/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Chuyển động tròn đều có tốc độ không đổi; dùng radian để đo góc, tốc độ góc, chu kì, tần số mô tả độ nhanh của chuyển động và v = ωr nối tốc độ với tốc độ góc.',
  intro:
    'Xe mô tô đua nghiêng mình vào khúc cua, bánh xe quay tít, kim đồng hồ quay đều suốt ngày. Trên cùng một bánh xe, điểm ở vành và điểm gần trục quay có nhanh như nhau không? Câu trả lời phụ thuộc vào việc ta đo độ nhanh bằng góc hay bằng quãng đường.',
  objectives: [
    'Nêu được định nghĩa radian, biểu diễn được độ dịch chuyển góc theo radian.',
    'Nêu được định nghĩa chuyển động tròn đều, tốc độ góc, chu kì và tần số.',
    'Vận dụng được $\\omega = \\dfrac{\\theta}{t}$, $T = \\dfrac{2\\pi}{\\omega}$, $f = \\dfrac{1}{T}$ và $v = \\omega r$ để giải bài tập.',
    'Nêu được vectơ vận tốc trong chuyển động tròn đều có phương tiếp tuyến với đường tròn.',
  ],
  sections: [
    {
      heading: 'Mô tả chuyển động tròn',
      blocks: [
        {
          type: 'p',
          text: 'Chuyển động tròn là chuyển động có quỹ đạo là đường tròn. Vị trí của vật trên đường tròn có thể xác định bằng quãng đường $s$ dọc theo cung tròn, hoặc bằng góc quét được so với vị trí ban đầu. Để đo góc này, người ta thường dùng radian.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Radian',
          text: 'Một radian (kí hiệu rad) là số đo góc ở tâm một đường tròn chắn cung có độ dài bằng bán kính của đường tròn đó.',
        },
        {
          type: 'p',
          text: 'Góc ở tâm chắn cung dài $s$ trên đường tròn bán kính $r$ gọi là độ dịch chuyển góc, kí hiệu $\\theta$:',
        },
        { type: 'tex', tex: '\\theta = \\frac{s}{r} \\quad\\Rightarrow\\quad s = r\\theta' },
        {
          type: 'p',
          text: 'Cả đường tròn có chu vi $2\\pi r$ nên ứng với góc $2\\pi$ rad. Từ đó suy ra cách đổi đơn vị:',
        },
        {
          type: 'tex',
          tex: '360^\\circ = 2\\pi\\ \\text{rad}, \\qquad 180^\\circ = \\pi\\ \\text{rad}, \\qquad 1\\ \\text{rad} \\approx 57{,}3^\\circ',
        },
        { type: 'widget', name: 'radian' },
      ],
    },
    {
      heading: 'Chuyển động tròn đều. Tốc độ và tốc độ góc',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Chuyển động tròn đều',
          text: 'Chuyển động tròn đều là chuyển động có quỹ đạo tròn và có tốc độ không đổi. Tốc độ (còn gọi là tốc độ dài) là $v = \\dfrac{s}{t}$.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Tốc độ góc',
          text: 'Tốc độ góc $\\omega$ là đại lượng đo bằng góc mà bán kính nối vật với tâm quét được trong một đơn vị thời gian: $\\omega = \\dfrac{\\theta}{t}$. Đơn vị là rad/s. Trong chuyển động tròn đều, $\\omega$ không đổi.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Chu kì và tần số',
          text: 'Chu kì $T$ là thời gian vật đi được một vòng, đơn vị giây (s). Tần số $f$ là số vòng vật đi được trong một giây, đơn vị héc (Hz), $1$ Hz $= 1$ vòng/s.',
        },
        {
          type: 'p',
          text: 'Trong thời gian $T$ vật quét được góc $2\\pi$ nên:',
        },
        {
          type: 'tex',
          tex: 'T = \\frac{2\\pi}{\\omega} = \\frac{1}{f}, \\qquad \\omega = 2\\pi f',
        },
        {
          type: 'p',
          text: 'Thay $s = r\\theta$ vào $v = \\dfrac{s}{t}$ ta được liên hệ giữa tốc độ và tốc độ góc:',
        },
        { type: 'tex', tex: 'v = \\frac{r\\theta}{t} = \\omega r' },
        {
          type: 'callout',
          tone: 'note',
          title: 'Cùng tốc độ góc, khác tốc độ',
          text: 'Các điểm trên một vật rắn quay đều (trừ điểm trên trục quay) có cùng tốc độ góc. Điểm càng xa trục quay càng đi nhanh, vì $v$ tỉ lệ thuận với $r$.',
        },
      ],
    },
    {
      heading: 'Vận tốc trong chuyển động tròn đều',
      blocks: [
        {
          type: 'p',
          text: 'Vận tốc tức thời của vật tại một điểm là vectơ có phương tiếp tuyến với đường tròn tại điểm đó, cùng chiều chuyển động. Độ lớn của vectơ này bằng tốc độ:',
        },
        { type: 'tex', tex: 'v = \\omega r = \\frac{2\\pi r}{T}' },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Tốc độ không đổi nhưng vận tốc thay đổi',
          text: 'Trong chuyển động tròn đều, độ lớn vận tốc không đổi nhưng hướng của vectơ vận tốc luôn thay đổi. Vì vậy chuyển động tròn đều vẫn là chuyển động có gia tốc.',
        },
      ],
    },
  ],
  explore: {
    title: 'Bánh xe quay',
    instruction:
      'Bấm Quay, rồi đặt hai điểm A và B ở hai bán kính khác nhau. So sánh góc quét và quãng đường của chúng trong bảng số liệu: đại lượng nào giống nhau, đại lượng nào khác nhau? Sau đó làm thử thách để đạt tốc độ cho trước.',
  },
  examples: [
    {
      problem: 'Tính độ dịch chuyển góc theo radian của kim giờ đồng hồ sau $1$ giờ.',
      steps: [
        'Kim giờ quay hết một vòng ($2\\pi$ rad) trong $12$ giờ.',
        'Sau $1$ giờ, kim quét được $\\theta = \\dfrac{2\\pi}{12} = \\dfrac{\\pi}{6}$ rad.',
      ],
      answer: '$\\theta = \\dfrac{\\pi}{6}$ rad $\\approx 0{,}52$ rad.',
    },
    {
      problem:
        'Rôto của một tổ máy nhà máy thuỷ điện Hoà Bình quay $125$ vòng/phút. Tính tốc độ góc của rôto theo rad/s.',
      steps: [
        'Mỗi vòng ứng với góc $2\\pi$ rad, một phút có $60$ s.',
        '$\\omega = \\dfrac{125 \\cdot 2\\pi}{60} \\approx 13{,}1$ rad/s.',
      ],
      answer: '$\\omega \\approx 13{,}1$ rad/s.',
    },
    {
      problem:
        'Trái Đất tự quay một vòng trong $24$ giờ, bán kính xích đạo khoảng $6\\,400$ km. Tính tốc độ góc của Trái Đất và tốc độ của một điểm trên xích đạo.',
      steps: [
        'Đổi đơn vị: $T = 24 \\cdot 3\\,600 = 86\\,400$ s, $r = 6{,}4 \\cdot 10^{6}$ m.',
        'Tốc độ góc: $\\omega = \\dfrac{2\\pi}{T} = \\dfrac{2\\pi}{86\\,400} \\approx 7{,}27 \\cdot 10^{-5}$ rad/s.',
        'Tốc độ: $v = \\omega r \\approx 7{,}27 \\cdot 10^{-5} \\cdot 6{,}4 \\cdot 10^{6} \\approx 465$ m/s.',
      ],
      answer: '$\\omega \\approx 7{,}27 \\cdot 10^{-5}$ rad/s, $v \\approx 465$ m/s.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Một radian là số đo của góc ở tâm một đường tròn chắn cung có độ dài bằng',
      options: ['bán kính đường tròn', 'đường kính đường tròn', 'chu vi đường tròn', '$1$ mét'],
      answer: 0,
      hints: ['Dùng $\\theta = \\dfrac{s}{r}$ với $\\theta = 1$ rad.'],
      solution: '$\\theta = 1$ rad thì $s = r \\cdot 1 = r$: cung dài bằng bán kính.',
    },
    {
      type: 'number',
      prompt: 'Đổi góc $60^\\circ$ sang radian (làm tròn đến hai chữ số thập phân).',
      answer: 1.05,
      tolerance: 0.01,
      unit: 'rad',
      hints: ['$180^\\circ = \\pi$ rad.'],
      solution: '$60^\\circ = \\dfrac{60}{180}\\pi = \\dfrac{\\pi}{3} \\approx 1{,}05$ rad.',
    },
    {
      type: 'number',
      prompt:
        'Vật chuyển động trên đường tròn bán kính $0{,}5$ m, có độ dịch chuyển góc $2$ rad. Tính quãng đường vật đi được.',
      answer: 1,
      unit: 'm',
      hints: ['$s = r\\theta$, với $\\theta$ tính bằng radian.'],
      solution: '$s = r\\theta = 0{,}5 \\cdot 2 = 1$ m.',
    },
    {
      type: 'number',
      prompt: 'Tính tốc độ góc của kim giây đồng hồ (làm tròn đến ba chữ số thập phân).',
      answer: 0.105,
      tolerance: 0.001,
      unit: 'rad/s',
      hints: ['Kim giây quay một vòng trong bao lâu?', '$\\omega = \\dfrac{2\\pi}{T}$.'],
      solution: '$T = 60$ s nên $\\omega = \\dfrac{2\\pi}{60} \\approx 0{,}105$ rad/s.',
    },
    {
      type: 'number',
      prompt: 'Một vật chuyển động tròn đều với tốc độ góc $\\pi$ rad/s. Tính tần số của vật.',
      answer: 0.5,
      unit: 'Hz',
      hints: ['$\\omega = 2\\pi f$.'],
      solution: '$f = \\dfrac{\\omega}{2\\pi} = \\dfrac{\\pi}{2\\pi} = 0{,}5$ Hz.',
    },
    {
      type: 'number',
      prompt:
        'Cánh quạt dài $20$ cm quay với tần số $20$ Hz. Tính tốc độ của điểm ở đầu cánh quạt (làm tròn đến một chữ số thập phân).',
      answer: 25.1,
      tolerance: 0.1,
      unit: 'm/s',
      hints: [
        'Tính $\\omega = 2\\pi f$ trước.',
        'Đổi chiều dài cánh quạt ra mét rồi dùng $v = \\omega r$.',
      ],
      solution:
        '$\\omega = 2\\pi \\cdot 20 \\approx 125{,}7$ rad/s; $v = \\omega r \\approx 125{,}7 \\cdot 0{,}2 \\approx 25{,}1$ m/s.',
    },
    {
      type: 'choice',
      prompt: 'Hai điểm A và B trên một đĩa quay đều, $r_A = 2r_B$. Khẳng định nào đúng?',
      options: [
        '$\\omega_A = \\omega_B$ và $v_A = 2v_B$',
        '$\\omega_A = 2\\omega_B$ và $v_A = v_B$',
        '$\\omega_A = 2\\omega_B$ và $v_A = 2v_B$',
        '$\\omega_A = \\omega_B$ và $v_A = v_B$',
      ],
      answer: 0,
      hints: [
        'Trong cùng một thời gian, hai điểm quét góc thế nào?',
        'Với $\\omega$ đã biết, $v$ phụ thuộc vào $r$ ra sao?',
      ],
      solution:
        'Hai điểm trên cùng một đĩa quét cùng một góc trong cùng thời gian nên $\\omega_A = \\omega_B$. Do $v = \\omega r$ nên $v_A = 2v_B$.',
    },
    {
      type: 'number',
      prompt:
        'Kim phút của đồng hồ dài $4$ cm, kim giây dài $5$ cm. Tốc độ của đầu kim giây gấp bao nhiêu lần tốc độ của đầu kim phút?',
      answer: 75,
      unit: 'lần',
      hints: ['Viết $v = \\dfrac{2\\pi r}{T}$ cho từng kim rồi lập tỉ số.'],
      solution:
        '$T_g = 60$ s, $T_{ph} = 3\\,600$ s. $\\dfrac{v_g}{v_{ph}} = \\dfrac{r_g}{r_{ph}} \\cdot \\dfrac{T_{ph}}{T_g} = \\dfrac{5}{4} \\cdot 60 = 75$.',
    },
    {
      type: 'number',
      prompt:
        'Xe đồ chơi chạy với tốc độ không đổi $0{,}2$ m/s trên đường ray tròn bán kính $0{,}5$ m. Tính tốc độ góc của xe.',
      answer: 0.4,
      unit: 'rad/s',
      hints: ['Từ $v = \\omega r$ suy ra $\\omega$.'],
      solution: '$\\omega = \\dfrac{v}{r} = \\dfrac{0{,}2}{0{,}5} = 0{,}4$ rad/s.',
    },
    {
      type: 'number',
      prompt:
        'Xe đồ chơi chạy đều với tốc độ $0{,}2$ m/s trên đường ray tròn. Sau nửa vòng, độ biến thiên vận tốc của xe có độ lớn bằng bao nhiêu?',
      answer: 0.4,
      unit: 'm/s',
      hints: [
        'Sau nửa vòng, vectơ vận tốc đổi hướng thế nào so với lúc đầu?',
        'Chọn chiều dương rồi viết $v_1$, $v_2$ với dấu của chúng.',
      ],
      solution:
        'Sau nửa vòng, vận tốc ngược hướng ban đầu. Chọn chiều dương theo $\\vec{v_1}$: $\\Delta v = -0{,}2 - 0{,}2 = -0{,}4$ m/s, độ lớn $0{,}4$ m/s, dù tốc độ không đổi.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi đại lượng với ý nghĩa của nó.',
      left: ['Tốc độ góc $\\omega$', 'Chu kì $T$', 'Tần số $f$'],
      right: [
        'Góc quét được trong một đơn vị thời gian',
        'Thời gian đi hết một vòng',
        'Số vòng đi được trong một giây',
      ],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
      hints: ['Nhìn vào đơn vị: rad/s, s và Hz.'],
      solution:
        '$\\omega$ (rad/s) là góc quét được trong một đơn vị thời gian, $T$ (s) là thời gian đi hết một vòng, $f$ (Hz) là số vòng đi được trong một giây.',
    },
  ],
  takeaways: [
    'Một radian là góc ở tâm chắn cung có độ dài bằng bán kính; $\\theta = \\dfrac{s}{r}$ và $360^\\circ = 2\\pi$ rad.',
    'Chuyển động tròn đều có quỹ đạo tròn và tốc độ không đổi.',
    'Tốc độ góc $\\omega = \\dfrac{\\theta}{t}$ (rad/s), chu kì $T = \\dfrac{2\\pi}{\\omega}$ (s), tần số $f = \\dfrac{1}{T}$ (Hz).',
    'Tốc độ $v = \\omega r$: cùng một vật quay, điểm càng xa trục càng nhanh dù tốc độ góc như nhau.',
    'Vectơ vận tốc tiếp tuyến với đường tròn, độ lớn không đổi nhưng hướng luôn thay đổi.',
  ],
};
