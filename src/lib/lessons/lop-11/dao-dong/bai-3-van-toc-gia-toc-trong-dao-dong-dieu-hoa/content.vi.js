/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Trong dao động điều hoà, vận tốc v = −ωA sin(ωt + φ) sớm pha π/2 so với li độ và gia tốc a = −ω²x ngược pha với li độ; tốc độ cực đại ωA ở vị trí cân bằng, gia tốc cực đại ω²A ở biên.',
  intro:
    'Ngồi trên xích đu, ta thấy mình lao nhanh nhất khi qua điểm thấp nhất và như dừng lại trong khoảnh khắc ở hai điểm cao nhất. Vận tốc và gia tốc của một vật dao động điều hoà thay đổi theo thời gian như thế nào, và chúng liên hệ với li độ ra sao?',
  objectives: [
    'Viết được phương trình vận tốc và gia tốc của vật dao động điều hoà.',
    'Nêu được quan hệ về pha giữa li độ, vận tốc và gia tốc.',
    'Xác định được vị trí và giá trị cực đại của tốc độ ($\\omega A$) và gia tốc ($\\omega^2 A$).',
    'Vận dụng được $a = -\\omega^2 x$ và $|v| = \\omega\\sqrt{A^2 - x^2}$ để tính vận tốc, gia tốc tại một li độ.',
  ],
  sections: [
    {
      heading: 'Vận tốc',
      blocks: [
        {
          type: 'p',
          text: 'Coi dao động $x = A\\cos(\\omega t + \\varphi)$ là hình chiếu của điểm $M$ chuyển động tròn đều trên đường tròn bán kính $A$. Vận tốc của $M$ tiếp tuyến với đường tròn, có độ lớn $\\omega A$. Hình chiếu của vectơ vận tốc này lên trục $Ox$ là vận tốc của vật dao động:',
        },
        {
          type: 'tex',
          tex: 'v = -\\omega A\\sin(\\omega t + \\varphi) = \\omega A\\cos\\left(\\omega t + \\varphi + \\frac{\\pi}{2}\\right)',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Vận tốc trong dao động điều hoà',
          text: 'Vận tốc biến thiên điều hoà cùng tần số với li độ và sớm pha $\\dfrac{\\pi}{2}$ so với li độ. Ở vị trí biên ($x = \\pm A$), $v = 0$. Ở vị trí cân bằng ($x = 0$), tốc độ cực đại $v_{max} = \\omega A$.',
        },
        {
          type: 'p',
          text: 'Từ $\\cos^2 + \\sin^2 = 1$ suy ra liên hệ giữa vận tốc và li độ, không phụ thuộc thời gian:',
        },
        {
          type: 'tex',
          tex: 'x^2 + \\frac{v^2}{\\omega^2} = A^2 \\quad\\Rightarrow\\quad v = \\pm\\,\\omega\\sqrt{A^2 - x^2}',
        },
        {
          type: 'p',
          text: 'Dấu của $v$ cho biết chiều chuyển động: $v > 0$ khi vật đi theo chiều dương, $v < 0$ khi vật đi theo chiều âm.',
        },
      ],
    },
    {
      heading: 'Gia tốc',
      blocks: [
        {
          type: 'p',
          text: 'Gia tốc của $M$ là gia tốc hướng tâm, độ lớn $\\omega^2 A$, luôn hướng vào tâm $O$. Hình chiếu của nó lên trục $Ox$ là gia tốc của vật dao động:',
        },
        {
          type: 'tex',
          tex: 'a = -\\omega^2 A\\cos(\\omega t + \\varphi) = -\\omega^2 x',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Gia tốc trong dao động điều hoà',
          text: 'Gia tốc biến thiên điều hoà cùng tần số với li độ, ngược pha với li độ và sớm pha $\\dfrac{\\pi}{2}$ so với vận tốc. Gia tốc tỉ lệ với li độ và trái dấu: vectơ gia tốc luôn hướng về vị trí cân bằng. Ở vị trí cân bằng $a = 0$; ở hai biên gia tốc có độ lớn cực đại $a_{max} = \\omega^2 A$.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Nhanh dần hay chậm dần',
          text: 'Khi vật đi từ biên về vị trí cân bằng, $\\vec{v}$ và $\\vec{a}$ cùng chiều: vật chuyển động nhanh dần. Khi vật đi từ vị trí cân bằng ra biên, $\\vec{v}$ và $\\vec{a}$ ngược chiều: vật chuyển động chậm dần. Gia tốc thay đổi liên tục nên đây không phải chuyển động biến đổi đều.',
        },
      ],
    },
    {
      heading: 'Đồ thị li độ, vận tốc, gia tốc',
      blocks: [
        {
          type: 'p',
          text: 'Với $\\varphi = 0$, xét một số thời điểm đặc biệt trong một chu kì:',
        },
        {
          type: 'table',
          head: ['$t$', '$0$', '$\\dfrac{T}{4}$', '$\\dfrac{T}{2}$', '$\\dfrac{3T}{4}$', '$T$'],
          rows: [
            ['$x$', '$A$', '$0$', '$-A$', '$0$', '$A$'],
            ['$v$', '$0$', '$-\\omega A$', '$0$', '$\\omega A$', '$0$'],
            ['$a$', '$-\\omega^2 A$', '$0$', '$\\omega^2 A$', '$0$', '$-\\omega^2 A$'],
          ],
        },
        {
          type: 'p',
          text: 'Ba đồ thị đều là đường hình sin cùng chu kì $T$. Đồ thị $v$ đạt đỉnh sớm hơn đồ thị $x$ một phần tư chu kì; đồ thị $a$ luôn có dạng đối xứng với đồ thị $x$ qua trục thời gian.',
        },
        {
          type: 'table',
          head: ['Vị trí', 'Li độ', 'Tốc độ', 'Độ lớn gia tốc'],
          rows: [
            ['Vị trí cân bằng', '$x = 0$', 'cực đại $\\omega A$', '$0$'],
            ['Vị trí biên', '$x = \\pm A$', '$0$', 'cực đại $\\omega^2 A$'],
          ],
        },
      ],
    },
  ],
  explore: {
    title: 'Ba đồ thị đồng bộ',
    instruction:
      'Bấm Chạy để vật dao động, hoặc bấm, kéo trên bất kì đồ thị nào (hay dùng phím mũi tên) để chọn thời điểm. Theo dõi mũi tên vận tốc và gia tốc trên vật, rồi làm các thử thách: tìm thời điểm thoả mãn điều kiện cho trước.',
  },
  examples: [
    {
      problem:
        'Một vật dao động điều hoà theo phương trình $x = 5\\cos(4\\pi t)$ (cm). Tính tốc độ cực đại và độ lớn gia tốc cực đại của vật.',
      steps: [
        'Đọc từ phương trình: $A = 5$ cm, $\\omega = 4\\pi$ rad/s.',
        '$v_{max} = \\omega A = 4\\pi \\cdot 5 = 20\\pi \\approx 62{,}8$ cm/s.',
        '$a_{max} = \\omega^2 A = (4\\pi)^2 \\cdot 5 = 80\\pi^2 \\approx 789{,}6$ cm/s² $\\approx 7{,}9$ m/s².',
      ],
      answer: '$v_{max} \\approx 62{,}8$ cm/s, $a_{max} \\approx 7{,}9$ m/s².',
    },
    {
      problem: 'Vật ở ví dụ trên đi qua li độ $x = 3$ cm. Tính tốc độ và gia tốc của vật tại đó.',
      steps: [
        '$|v| = \\omega\\sqrt{A^2 - x^2} = 4\\pi\\sqrt{5^2 - 3^2} = 4\\pi \\cdot 4 = 16\\pi \\approx 50{,}3$ cm/s.',
        '$a = -\\omega^2 x = -(4\\pi)^2 \\cdot 3 = -48\\pi^2 \\approx -473{,}7$ cm/s².',
        'Gia tốc âm: vectơ gia tốc hướng theo chiều âm, tức về vị trí cân bằng.',
      ],
      answer: '$|v| \\approx 50{,}3$ cm/s, $a \\approx -473{,}7$ cm/s².',
    },
    {
      problem:
        'Một vật dao động điều hoà có tốc độ cực đại $20$ cm/s và gia tốc cực đại $200$ cm/s². Tính tần số góc và biên độ dao động.',
      steps: [
        'Lập tỉ số: $\\dfrac{a_{max}}{v_{max}} = \\dfrac{\\omega^2 A}{\\omega A} = \\omega$.',
        '$\\omega = \\dfrac{200}{20} = 10$ rad/s.',
        '$A = \\dfrac{v_{max}}{\\omega} = \\dfrac{20}{10} = 2$ cm.',
      ],
      answer: '$\\omega = 10$ rad/s, $A = 2$ cm.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt:
        'Một vật dao động điều hoà theo phương trình $x = 6\\cos(\\pi t)$ (cm). Tính tốc độ cực đại của vật (làm tròn đến hai chữ số thập phân).',
      answer: 18.85,
      tolerance: 0.01,
      unit: 'cm/s',
      hints: ['$v_{max} = \\omega A$.'],
      solution: '$v_{max} = \\omega A = \\pi \\cdot 6 = 6\\pi \\approx 18{,}85$ cm/s.',
    },
    {
      type: 'number',
      prompt:
        'Với vật $x = 6\\cos(\\pi t)$ (cm), tính độ lớn gia tốc cực đại (làm tròn đến hai chữ số thập phân).',
      answer: 59.22,
      tolerance: 0.01,
      unit: 'cm/s²',
      hints: ['$a_{max} = \\omega^2 A$.'],
      solution: '$a_{max} = \\omega^2 A = \\pi^2 \\cdot 6 = 6\\pi^2 \\approx 59{,}22$ cm/s².',
    },
    {
      type: 'choice',
      prompt: 'Trong dao động điều hoà, vận tốc biến thiên',
      options: [
        'sớm pha $\\dfrac{\\pi}{2}$ so với li độ',
        'cùng pha với li độ',
        'ngược pha với li độ',
        'trễ pha $\\dfrac{\\pi}{2}$ so với li độ',
      ],
      answer: 0,
      hints: ['Viết $v = -\\omega A\\sin(\\omega t + \\varphi)$ dưới dạng hàm côsin.'],
      solution:
        '$v = \\omega A\\cos\\left(\\omega t + \\varphi + \\dfrac{\\pi}{2}\\right)$: pha của $v$ lớn hơn pha của $x$ một lượng $\\dfrac{\\pi}{2}$, tức vận tốc sớm pha $\\dfrac{\\pi}{2}$ so với li độ.',
    },
    {
      type: 'choice',
      prompt: 'Trong dao động điều hoà, gia tốc biến thiên',
      options: [
        'ngược pha với li độ',
        'cùng pha với li độ',
        'sớm pha $\\dfrac{\\pi}{2}$ so với li độ',
        'ngược pha với vận tốc',
      ],
      answer: 0,
      hints: ['Dùng $a = -\\omega^2 x$.'],
      solution:
        '$a = -\\omega^2 x$: gia tốc luôn trái dấu và tỉ lệ với li độ, nên gia tốc ngược pha với li độ (và sớm pha $\\dfrac{\\pi}{2}$ so với vận tốc).',
    },
    {
      type: 'choice',
      prompt: 'Khi vật dao động điều hoà đi qua vị trí cân bằng thì',
      options: [
        'tốc độ cực đại, gia tốc bằng $0$',
        'vận tốc bằng $0$, gia tốc cực đại',
        'vận tốc và gia tốc đều bằng $0$',
        'vận tốc và gia tốc đều cực đại',
      ],
      answer: 0,
      hints: [
        'Ở vị trí cân bằng $x = 0$. Thay vào $a = -\\omega^2 x$ và $|v| = \\omega\\sqrt{A^2 - x^2}$.',
      ],
      solution: 'Với $x = 0$: $a = 0$ và $|v| = \\omega A$ là tốc độ cực đại.',
    },
    {
      type: 'number',
      prompt:
        'Một vật dao động điều hoà với biên độ $10$ cm, tần số góc $2$ rad/s. Tính tốc độ của vật khi nó ở li độ $6$ cm.',
      answer: 16,
      unit: 'cm/s',
      hints: ['$|v| = \\omega\\sqrt{A^2 - x^2}$.'],
      solution: '$|v| = 2\\sqrt{10^2 - 6^2} = 2 \\cdot 8 = 16$ cm/s.',
    },
    {
      type: 'number',
      prompt:
        'Một vật dao động điều hoà với tần số góc $5$ rad/s. Tính gia tốc của vật khi nó ở li độ $x = -2$ cm.',
      answer: 50,
      unit: 'cm/s²',
      hints: ['$a = -\\omega^2 x$; chú ý dấu của $x$.'],
      solution: '$a = -5^2 \\cdot (-2) = 50$ cm/s²: gia tốc dương, hướng về vị trí cân bằng.',
    },
    {
      type: 'number',
      prompt:
        'Một vật dao động điều hoà có tốc độ cực đại $31{,}4$ cm/s và gia tốc cực đại $197{,}2$ cm/s². Tính chu kì dao động (làm tròn đến hai chữ số thập phân).',
      answer: 1,
      tolerance: 0.01,
      unit: 's',
      hints: ['$\\dfrac{a_{max}}{v_{max}} = \\omega$.', '$T = \\dfrac{2\\pi}{\\omega}$.'],
      solution:
        '$\\omega = \\dfrac{197{,}2}{31{,}4} \\approx 6{,}28$ rad/s $= 2\\pi$ rad/s, nên $T = \\dfrac{2\\pi}{\\omega} \\approx 1{,}00$ s.',
    },
    {
      type: 'multi',
      prompt: 'Vật dao động điều hoà chuyển động nhanh dần khi (chọn tất cả ý đúng)',
      options: [
        'vật đi từ vị trí biên về vị trí cân bằng',
        'vectơ vận tốc và vectơ gia tốc cùng chiều',
        'vật đi từ vị trí cân bằng ra vị trí biên',
        'li độ và vận tốc cùng dấu',
      ],
      answers: [0, 1],
      hints: [
        'Vectơ gia tốc luôn hướng về đâu?',
        'Vật nhanh dần khi gia tốc cùng chiều chuyển động.',
      ],
      solution:
        'Gia tốc luôn hướng về vị trí cân bằng. Khi vật đi về vị trí cân bằng thì $\\vec{v}$ cùng chiều $\\vec{a}$: nhanh dần. Khi li độ và vận tốc cùng dấu, vật đang đi ra xa vị trí cân bằng nên chậm dần.',
    },
    {
      type: 'choice',
      prompt: 'Vectơ gia tốc của vật dao động điều hoà luôn',
      options: [
        'hướng về vị trí cân bằng',
        'cùng hướng với vectơ vận tốc',
        'hướng ra xa vị trí cân bằng',
        'có độ lớn không đổi',
      ],
      answer: 0,
      hints: ['Xét dấu của $a = -\\omega^2 x$ khi $x > 0$ và khi $x < 0$.'],
      solution:
        '$x > 0$ thì $a < 0$, $x < 0$ thì $a > 0$: gia tốc luôn hướng về vị trí cân bằng, độ lớn tỉ lệ với $|x|$.',
    },
  ],
  takeaways: [
    'Vận tốc $v = -\\omega A\\sin(\\omega t + \\varphi)$, sớm pha $\\dfrac{\\pi}{2}$ so với li độ; tốc độ cực đại $\\omega A$ ở vị trí cân bằng, bằng $0$ ở biên.',
    'Gia tốc $a = -\\omega^2 x$, ngược pha với li độ, luôn hướng về vị trí cân bằng; độ lớn cực đại $\\omega^2 A$ ở biên, bằng $0$ ở vị trí cân bằng.',
    'Liên hệ không phụ thuộc thời gian: $x^2 + \\dfrac{v^2}{\\omega^2} = A^2$.',
    'Đi về vị trí cân bằng: nhanh dần; đi ra biên: chậm dần.',
  ],
};
