/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Trong dao động điều hoà, động năng và thế năng biến thiên tuần hoàn với chu kì T/2 và luôn chuyển hoá cho nhau, còn cơ năng W = ½mω²A² = ½kA² được bảo toàn khi bỏ qua ma sát.',
  intro:
    'Kéo quả nặng của con lắc lò xo ra rồi buông tay: lò xo đang dãn đẩy vật lao về vị trí cân bằng, vật vượt qua rồi lại chậm dần và dừng ở phía bên kia. Năng lượng của vật đã đi đâu khi nó dừng lại, và lấy đâu ra khi nó chạy nhanh nhất?',
  objectives: [
    'Viết được biểu thức động năng, thế năng và cơ năng của con lắc lò xo dao động điều hoà.',
    'Mô tả được sự chuyển hoá giữa động năng và thế năng; nêu được cơ năng được bảo toàn.',
    'Đọc được đồ thị động năng, thế năng theo li độ và theo thời gian.',
    'Vận dụng được bảo toàn cơ năng cho con lắc lò xo và con lắc đơn.',
  ],
  sections: [
    {
      heading: 'Động năng, thế năng, cơ năng của con lắc lò xo',
      blocks: [
        {
          type: 'p',
          text: 'Xét con lắc lò xo gồm vật khối lượng $m$ gắn vào lò xo độ cứng $k$, dao động điều hoà theo phương trình $x = A\\cos(\\omega t + \\varphi)$ với tần số góc',
        },
        {
          type: 'tex',
          tex: '\\omega = \\sqrt{\\frac{k}{m}}, \\qquad T = 2\\pi\\sqrt{\\frac{m}{k}}',
        },
        {
          type: 'p',
          text: 'Động năng của vật và thế năng đàn hồi của lò xo (chọn mốc thế năng ở vị trí cân bằng) là',
        },
        {
          type: 'tex',
          tex: 'W_đ = \\frac{1}{2}mv^2 = \\frac{1}{2}m\\omega^2A^2\\sin^2(\\omega t + \\varphi)',
        },
        {
          type: 'tex',
          tex: 'W_t = \\frac{1}{2}kx^2 = \\frac{1}{2}m\\omega^2A^2\\cos^2(\\omega t + \\varphi)',
        },
        {
          type: 'p',
          text: 'Vì $k = m\\omega^2$ và $\\sin^2 + \\cos^2 = 1$, tổng của chúng không đổi theo thời gian:',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Cơ năng của vật dao động điều hoà',
          text: '$W = W_đ + W_t = \\dfrac{1}{2}m\\omega^2A^2 = \\dfrac{1}{2}kA^2 = \\dfrac{1}{2}mv_{max}^2 =$ hằng số. Khi bỏ qua mọi ma sát, cơ năng của vật dao động điều hoà được bảo toàn và tỉ lệ với bình phương biên độ.',
        },
      ],
    },
    {
      heading: 'Sự chuyển hoá năng lượng',
      blocks: [
        {
          type: 'list',
          items: [
            'Ở vị trí biên ($x = \\pm A$): $v = 0$ nên $W_đ = 0$, thế năng cực đại $W_t = W$.',
            'Khi vật đi từ biên về vị trí cân bằng: thế năng giảm, động năng tăng, thế năng chuyển hoá thành động năng.',
            'Ở vị trí cân bằng ($x = 0$): $W_t = 0$, động năng cực đại $W_đ = W$.',
            'Khi vật đi từ vị trí cân bằng ra biên: động năng chuyển hoá ngược lại thành thế năng.',
          ],
        },
        {
          type: 'p',
          text: 'Theo li độ, $W_t = \\dfrac{1}{2}kx^2$ là một parabol, $W_đ = W - W_t = \\dfrac{1}{2}k(A^2 - x^2)$ là một parabol úp, và tổng của chúng là đường nằm ngang. Hai đồ thị cắt nhau khi $W_đ = W_t = \\dfrac{W}{2}$, tức tại',
        },
        { type: 'tex', tex: 'x = \\pm\\frac{A}{\\sqrt{2}}' },
        {
          type: 'p',
          text: 'Tổng quát, vị trí có $W_đ = nW_t$ thoả mãn $W = (n + 1)W_t$, nên $|x| = \\dfrac{A}{\\sqrt{n + 1}}$.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Chu kì của động năng và thế năng',
          text: 'Dùng $\\cos^2\\alpha = \\dfrac{1 + \\cos 2\\alpha}{2}$: $W_t = \\dfrac{W}{2} + \\dfrac{W}{2}\\cos(2\\omega t + 2\\varphi)$. Động năng và thế năng biến thiên tuần hoàn với tần số góc $2\\omega$, tức chu kì $\\dfrac{T}{2}$ và tần số $2f$; trong một chu kì dao động, động năng đạt cực đại hai lần (mỗi lần vật qua vị trí cân bằng).',
        },
      ],
    },
    {
      heading: 'Năng lượng của con lắc đơn',
      blocks: [
        {
          type: 'p',
          text: 'Con lắc đơn gồm vật nhỏ khối lượng $m$ treo ở đầu sợi dây không dãn, chiều dài $l$. Kéo vật lệch góc $\\alpha_0$ rồi thả, vật dao động quanh vị trí cân bằng (dây thẳng đứng). Chọn mốc thế năng ở vị trí cân bằng, ở góc lệch $\\alpha$ vật cao hơn vị trí cân bằng $l(1 - \\cos\\alpha)$, nên',
        },
        {
          type: 'tex',
          tex: 'W_t = mgl(1 - \\cos\\alpha), \\qquad W = W_đ + W_t = mgl(1 - \\cos\\alpha_0)',
        },
        {
          type: 'p',
          text: 'Bỏ qua lực cản, cơ năng được bảo toàn: thế năng hấp dẫn và động năng chuyển hoá cho nhau. Tốc độ lớn nhất, khi vật qua vị trí cân bằng, là',
        },
        { type: 'tex', tex: 'v_{max} = \\sqrt{2gl(1 - \\cos\\alpha_0)}' },
        {
          type: 'callout',
          tone: 'note',
          title: 'Khi góc lệch nhỏ',
          text: 'Với góc lệch nhỏ (cỡ dưới $10^\\circ$), con lắc đơn dao động điều hoà với tần số góc $\\omega = \\sqrt{\\dfrac{g}{l}}$, chu kì $T = 2\\pi\\sqrt{\\dfrac{l}{g}}$, không phụ thuộc khối lượng vật.',
        },
      ],
    },
  ],
  explore: {
    title: 'Biểu đồ năng lượng',
    instruction:
      'Kéo vật ra một đoạn rồi bấm Thả vật. Quan sát ba thanh $W_đ$, $W_t$, $W$ và điểm chạy trên đồ thị năng lượng theo li độ: thanh nào thay đổi, thanh nào giữ nguyên? Thay đổi $k$ và $m$ để xem cơ năng phụ thuộc vào gì, rồi làm thử thách dừng vật ở vị trí có tỉ lệ năng lượng cho trước.',
  },
  examples: [
    {
      problem:
        'Một con lắc lò xo có độ cứng $100$ N/m dao động điều hoà với biên độ $4$ cm. Tính cơ năng của con lắc, và động năng, thế năng khi vật ở li độ $2$ cm.',
      steps: [
        'Đổi đơn vị: $A = 0{,}04$ m, $x = 0{,}02$ m.',
        'Cơ năng: $W = \\dfrac{1}{2}kA^2 = \\dfrac{1}{2} \\cdot 100 \\cdot 0{,}04^2 = 0{,}08$ J.',
        'Thế năng: $W_t = \\dfrac{1}{2}kx^2 = \\dfrac{1}{2} \\cdot 100 \\cdot 0{,}02^2 = 0{,}02$ J.',
        'Động năng: $W_đ = W - W_t = 0{,}08 - 0{,}02 = 0{,}06$ J.',
      ],
      answer: '$W = 0{,}08$ J; tại $x = 2$ cm: $W_t = 0{,}02$ J, $W_đ = 0{,}06$ J.',
    },
    {
      problem:
        'Vật nặng $100$ g gắn vào lò xo độ cứng $40$ N/m, dao động điều hoà với biên độ $5$ cm. Tính tốc độ của vật khi qua vị trí cân bằng bằng hai cách.',
      steps: [
        'Cách 1: $\\omega = \\sqrt{\\dfrac{k}{m}} = \\sqrt{\\dfrac{40}{0{,}1}} = 20$ rad/s, $v_{max} = \\omega A = 20 \\cdot 0{,}05 = 1$ m/s.',
        'Cách 2: $W = \\dfrac{1}{2}kA^2 = \\dfrac{1}{2} \\cdot 40 \\cdot 0{,}05^2 = 0{,}05$ J. Ở vị trí cân bằng $W = \\dfrac{1}{2}mv_{max}^2$, nên $v_{max} = \\sqrt{\\dfrac{2W}{m}} = \\sqrt{\\dfrac{0{,}1}{0{,}1}} = 1$ m/s.',
      ],
      answer: '$v_{max} = 1$ m/s.',
    },
    {
      problem:
        'Một con lắc đơn có chiều dài $1$ m, vật nặng $200$ g, được kéo lệch $10^\\circ$ rồi thả nhẹ. Lấy $g = 9{,}8$ m/s². Tính cơ năng của con lắc và tốc độ của vật khi qua vị trí cân bằng.',
      steps: [
        '$W = mgl(1 - \\cos\\alpha_0) = 0{,}2 \\cdot 9{,}8 \\cdot 1 \\cdot (1 - \\cos 10^\\circ) \\approx 1{,}96 \\cdot 0{,}0152 \\approx 0{,}030$ J.',
        'Ở vị trí cân bằng toàn bộ cơ năng là động năng: $v_{max} = \\sqrt{2gl(1 - \\cos\\alpha_0)} = \\sqrt{2 \\cdot 9{,}8 \\cdot 1 \\cdot 0{,}0152} \\approx 0{,}55$ m/s.',
      ],
      answer: '$W \\approx 0{,}030$ J, $v_{max} \\approx 0{,}55$ m/s.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt:
        'Một con lắc lò xo có độ cứng $50$ N/m dao động điều hoà với biên độ $6$ cm. Tính cơ năng của con lắc.',
      answer: 0.09,
      unit: 'J',
      hints: ['Đổi biên độ ra mét.', '$W = \\dfrac{1}{2}kA^2$.'],
      solution: '$W = \\dfrac{1}{2} \\cdot 50 \\cdot 0{,}06^2 = 25 \\cdot 0{,}0036 = 0{,}09$ J.',
    },
    {
      type: 'number',
      prompt:
        'Một vật khối lượng $0{,}5$ kg dao động điều hoà với tần số góc $4$ rad/s và biên độ $10$ cm. Tính cơ năng của vật.',
      answer: 0.04,
      unit: 'J',
      hints: ['$W = \\dfrac{1}{2}m\\omega^2A^2$, với $A$ tính bằng mét.'],
      solution:
        '$W = \\dfrac{1}{2} \\cdot 0{,}5 \\cdot 4^2 \\cdot 0{,}1^2 = 0{,}25 \\cdot 16 \\cdot 0{,}01 = 0{,}04$ J.',
    },
    {
      type: 'number',
      prompt:
        'Con lắc lò xo có $k = 100$ N/m dao động với biên độ $5$ cm. Tính động năng của vật khi nó ở li độ $3$ cm.',
      answer: 0.08,
      unit: 'J',
      hints: ['$W_đ = W - W_t = \\dfrac{1}{2}k(A^2 - x^2)$.'],
      solution:
        '$W_đ = \\dfrac{1}{2} \\cdot 100 \\cdot (0{,}05^2 - 0{,}03^2) = 50 \\cdot 0{,}0016 = 0{,}08$ J.',
    },
    {
      type: 'choice',
      prompt:
        'Một vật dao động điều hoà với chu kì $T$. Động năng của vật biến thiên tuần hoàn với chu kì',
      options: ['$\\dfrac{T}{2}$', '$T$', '$2T$', 'không biến thiên'],
      answer: 0,
      hints: ['Trong một chu kì dao động, vật qua vị trí cân bằng mấy lần?'],
      solution:
        'Trong một chu kì vật qua vị trí cân bằng hai lần, mỗi lần động năng cực đại. Vì $\\sin^2$ có chu kì bằng nửa chu kì của $\\sin$, động năng biến thiên với chu kì $\\dfrac{T}{2}$.',
    },
    {
      type: 'choice',
      prompt: 'Nếu biên độ dao động của một con lắc lò xo tăng gấp đôi thì cơ năng của nó',
      options: ['tăng $4$ lần', 'tăng $2$ lần', 'không đổi', 'giảm $2$ lần'],
      answer: 0,
      hints: ['$W = \\dfrac{1}{2}kA^2$.'],
      solution: 'Cơ năng tỉ lệ với $A^2$: biên độ gấp $2$ thì cơ năng gấp $2^2 = 4$ lần.',
    },
    {
      type: 'number',
      prompt:
        'Một vật dao động điều hoà với biên độ $8$ cm. Tại li độ nào (lấy giá trị dương) thì động năng bằng thế năng? Làm tròn đến hai chữ số thập phân.',
      answer: 5.66,
      tolerance: 0.01,
      unit: 'cm',
      hints: ['Khi $W_đ = W_t$ thì $W_t = \\dfrac{W}{2}$.'],
      solution:
        '$\\dfrac{1}{2}kx^2 = \\dfrac{1}{2} \\cdot \\dfrac{1}{2}kA^2$ nên $x = \\dfrac{A}{\\sqrt{2}} = \\dfrac{8}{\\sqrt{2}} = 4\\sqrt{2} \\approx 5{,}66$ cm.',
    },
    {
      type: 'fraction',
      prompt:
        'Một vật dao động điều hoà đang ở li độ $x = \\dfrac{A}{2}$. Động năng của vật bằng bao nhiêu phần cơ năng?',
      answer: [3, 4],
      hints: ['Tính $\\dfrac{W_t}{W} = \\dfrac{x^2}{A^2}$ trước.'],
      solution:
        '$\\dfrac{W_t}{W} = \\dfrac{x^2}{A^2} = \\dfrac{1}{4}$, nên $\\dfrac{W_đ}{W} = 1 - \\dfrac{1}{4} = \\dfrac{3}{4}$.',
    },
    {
      type: 'number',
      prompt:
        'Một con lắc lò xo có vật nặng $0{,}1$ kg, cơ năng $0{,}02$ J. Tính tốc độ của vật khi qua vị trí cân bằng (làm tròn đến hai chữ số thập phân).',
      answer: 0.63,
      tolerance: 0.01,
      unit: 'm/s',
      hints: ['Ở vị trí cân bằng thế năng bằng $0$: $W = \\dfrac{1}{2}mv_{max}^2$.'],
      solution:
        '$v_{max} = \\sqrt{\\dfrac{2W}{m}} = \\sqrt{\\dfrac{0{,}04}{0{,}1}} = \\sqrt{0{,}4} \\approx 0{,}63$ m/s.',
    },
    {
      type: 'choice',
      prompt: 'Khi vật dao động điều hoà đi qua vị trí cân bằng thì',
      options: [
        'động năng cực đại, thế năng bằng $0$',
        'thế năng cực đại, động năng bằng $0$',
        'động năng bằng thế năng',
        'cơ năng bằng $0$',
      ],
      answer: 0,
      hints: ['Ở vị trí cân bằng $x = 0$ và tốc độ lớn nhất.'],
      solution:
        '$x = 0$ nên $W_t = 0$; toàn bộ cơ năng là động năng, nên động năng cực đại. Cơ năng vẫn giữ nguyên giá trị.',
    },
    {
      type: 'number',
      prompt:
        'Một con lắc đơn dài $0{,}8$ m được kéo lệch $60^\\circ$ so với phương thẳng đứng rồi thả nhẹ. Bỏ qua lực cản, lấy $g = 9{,}8$ m/s². Tính tốc độ của vật khi qua vị trí cân bằng.',
      answer: 2.8,
      tolerance: 0.01,
      unit: 'm/s',
      hints: [
        'Vật hạ xuống một độ cao $h = l(1 - \\cos\\alpha_0)$.',
        'Thế năng giảm bao nhiêu thì động năng tăng bấy nhiêu: $\\dfrac{1}{2}mv^2 = mgh$.',
      ],
      solution:
        '$h = 0{,}8(1 - \\cos 60^\\circ) = 0{,}4$ m. $v = \\sqrt{2gh} = \\sqrt{2 \\cdot 9{,}8 \\cdot 0{,}4} = \\sqrt{7{,}84} = 2{,}8$ m/s.',
    },
    {
      type: 'multi',
      prompt:
        'Chọn tất cả các phát biểu đúng về năng lượng của vật dao động điều hoà (bỏ qua ma sát).',
      options: [
        'Cơ năng tỉ lệ với bình phương biên độ',
        'Động năng và thế năng biến thiên tuần hoàn với tần số $2f$',
        'Cơ năng biến thiên tuần hoàn theo thời gian',
        'Thế năng cực đại khi vật ở vị trí cân bằng',
      ],
      answers: [0, 1],
      hints: ['Xét $W = \\dfrac{1}{2}kA^2$ và vị trí mà $W_t = \\dfrac{1}{2}kx^2$ lớn nhất.'],
      solution:
        '$W = \\dfrac{1}{2}kA^2$ không đổi và tỉ lệ với $A^2$; $W_đ$, $W_t$ biến thiên với chu kì $\\dfrac{T}{2}$, tức tần số $2f$. Thế năng cực đại ở biên, không phải ở vị trí cân bằng.',
    },
  ],
  takeaways: [
    'Con lắc lò xo: $\\omega = \\sqrt{\\dfrac{k}{m}}$; $W_đ = \\dfrac{1}{2}mv^2$, $W_t = \\dfrac{1}{2}kx^2$.',
    'Cơ năng $W = \\dfrac{1}{2}m\\omega^2A^2 = \\dfrac{1}{2}kA^2$ được bảo toàn và tỉ lệ với $A^2$.',
    'Đi về vị trí cân bằng: thế năng chuyển thành động năng; đi ra biên: ngược lại.',
    'Động năng và thế năng biến thiên với chu kì $\\dfrac{T}{2}$; $W_đ = nW_t$ khi $|x| = \\dfrac{A}{\\sqrt{n + 1}}$.',
    'Con lắc đơn: $W = mgl(1 - \\cos\\alpha_0)$, $v_{max} = \\sqrt{2gl(1 - \\cos\\alpha_0)}$.',
  ],
};
