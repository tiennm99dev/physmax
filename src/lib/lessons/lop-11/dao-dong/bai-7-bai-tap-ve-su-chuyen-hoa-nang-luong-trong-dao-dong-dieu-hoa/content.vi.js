/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Luyện tập tính động năng, thế năng, cơ năng của con lắc lò xo và con lắc đơn, tìm vị trí có Wđ = nWt và tốc độ của vật tại một vị trí bất kì bằng định luật bảo toàn cơ năng.',
  intro:
    'Bảo toàn cơ năng là chìa khoá của hầu hết các bài tập năng lượng trong dao động: biết cơ năng và một trong hai dạng năng lượng, ta tìm được dạng còn lại, từ đó suy ra li độ hay tốc độ của vật mà không cần biết thời điểm.',
  objectives: [
    'Tính được động năng, thế năng, cơ năng của vật dao động điều hoà.',
    'Xác định được vị trí có $W_đ = nW_t$ và tốc độ của vật tại đó.',
    'Vận dụng được bảo toàn cơ năng cho con lắc lò xo và con lắc đơn.',
  ],
  sections: [
    {
      heading: 'Tóm tắt công thức',
      blocks: [
        {
          type: 'table',
          head: ['Đại lượng', 'Con lắc lò xo', 'Con lắc đơn'],
          rows: [
            [
              'Tần số góc',
              '$\\omega = \\sqrt{\\dfrac{k}{m}}$',
              '$\\omega = \\sqrt{\\dfrac{g}{l}}$ (góc nhỏ)',
            ],
            ['Động năng', '$W_đ = \\dfrac{1}{2}mv^2$', '$W_đ = \\dfrac{1}{2}mv^2$'],
            ['Thế năng', '$W_t = \\dfrac{1}{2}kx^2$', '$W_t = mgl(1 - \\cos\\alpha)$'],
            [
              'Cơ năng',
              '$W = \\dfrac{1}{2}kA^2 = \\dfrac{1}{2}m\\omega^2A^2$',
              '$W = mgl(1 - \\cos\\alpha_0)$',
            ],
            [
              'Tốc độ',
              '$|v| = \\omega\\sqrt{A^2 - x^2}$',
              '$|v| = \\sqrt{2gl(\\cos\\alpha - \\cos\\alpha_0)}$',
            ],
          ],
        },
        {
          type: 'p',
          text: 'Khi góc lệch nhỏ ($\\alpha_0$ tính bằng rad), $1 - \\cos\\alpha_0 \\approx \\dfrac{\\alpha_0^2}{2}$ nên cơ năng con lắc đơn $W \\approx \\dfrac{1}{2}mgl\\alpha_0^2$.',
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
            'Đổi đơn vị sang SI: khối lượng ra kg, li độ và biên độ ra m.',
            'Tính cơ năng $W$ từ dữ kiện ở biên ($W = W_{t\\,max}$) hoặc ở vị trí cân bằng ($W = W_{đ\\,max} = \\dfrac{1}{2}mv_{max}^2$).',
            'Dùng $W = W_đ + W_t$ để tìm dạng năng lượng còn lại, rồi suy ra $x$ hoặc $v$.',
          ],
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Vị trí có $W_đ = nW_t$',
          text: '$W = (n + 1)W_t$, tức $\\dfrac{1}{2}kA^2 = (n + 1)\\dfrac{1}{2}kx^2$, nên $|x| = \\dfrac{A}{\\sqrt{n + 1}}$. Tại đó $|v| = v_{max}\\sqrt{\\dfrac{n}{n + 1}}$.',
        },
        {
          type: 'table',
          head: ['Trạng thái', '$|x|$', '$|v|$'],
          rows: [
            ['$W_đ = W_t$', '$\\dfrac{A}{\\sqrt{2}}$', '$\\dfrac{v_{max}}{\\sqrt{2}}$'],
            ['$W_đ = 3W_t$', '$\\dfrac{A}{2}$', '$\\dfrac{\\sqrt{3}}{2}v_{max}$'],
            ['$W_t = 3W_đ$', '$\\dfrac{\\sqrt{3}}{2}A$', '$\\dfrac{v_{max}}{2}$'],
          ],
          caption: 'Ba trường hợp thường gặp.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Chu kì của năng lượng',
          text: 'Động năng và thế năng biến thiên tuần hoàn với chu kì $\\dfrac{T}{2}$, tần số $2f$. Hai lần liên tiếp $W_đ = W_t$ cách nhau $\\dfrac{T}{4}$.',
        },
      ],
    },
  ],
  explore: {
    title: 'Kéo vật đến đúng chỗ',
    instruction:
      'Mỗi đề cho độ cứng $k$, biên độ $A$ và một trạng thái năng lượng cần đạt. Tính trước li độ cần tìm, kéo vật tới đó (hoặc dùng phím mũi tên) rồi bấm Kiểm tra: ứng dụng sẽ đo $W_đ$, $W_t$ và tỉ số $\\dfrac{W_đ}{W_t}$ tại vị trí em chọn.',
  },
  examples: [
    {
      problem:
        'Một con lắc lò xo gồm vật $250$ g và lò xo độ cứng $100$ N/m dao động điều hoà với biên độ $10$ cm. Xác định vị trí vật có động năng bằng ba lần thế năng và tốc độ của vật tại đó.',
      steps: [
        'Cơ năng: $W = \\dfrac{1}{2}kA^2 = \\dfrac{1}{2} \\cdot 100 \\cdot 0{,}1^2 = 0{,}5$ J.',
        '$W_đ = 3W_t$ nên $W = 4W_t$: $W_t = 0{,}125$ J, suy ra $|x| = \\dfrac{A}{2} = 5$ cm.',
        '$W_đ = W - W_t = 0{,}375$ J, nên $|v| = \\sqrt{\\dfrac{2W_đ}{m}} = \\sqrt{\\dfrac{0{,}75}{0{,}25}} = \\sqrt{3} \\approx 1{,}73$ m/s.',
        'Kiểm tra lại: $\\omega = \\sqrt{\\dfrac{100}{0{,}25}} = 20$ rad/s, $|v| = 20\\sqrt{0{,}1^2 - 0{,}05^2} \\approx 1{,}73$ m/s.',
      ],
      answer: '$x = \\pm 5$ cm, $|v| \\approx 1{,}73$ m/s.',
    },
    {
      problem:
        'Một con lắc đơn có vật nặng $200$ g, dây dài $0{,}8$ m, được kéo lệch $60^\\circ$ rồi thả nhẹ. Bỏ qua lực cản, lấy $g = 9{,}8$ m/s². Tính cơ năng của con lắc và tốc độ của vật khi dây treo lệch $30^\\circ$.',
      steps: [
        'Chọn mốc thế năng ở vị trí cân bằng: $W = mgl(1 - \\cos 60^\\circ) = 0{,}2 \\cdot 9{,}8 \\cdot 0{,}8 \\cdot 0{,}5 = 0{,}784$ J.',
        'Tại $\\alpha = 30^\\circ$: $W_t = mgl(1 - \\cos 30^\\circ)$.',
        'Bảo toàn cơ năng: $\\dfrac{1}{2}mv^2 = mgl(\\cos 30^\\circ - \\cos 60^\\circ)$, nên $v = \\sqrt{2 \\cdot 9{,}8 \\cdot 0{,}8 \\cdot (0{,}866 - 0{,}5)} \\approx 2{,}40$ m/s.',
      ],
      answer: '$W = 0{,}784$ J, $v \\approx 2{,}40$ m/s.',
    },
    {
      problem:
        'Con lắc lò xo gồm vật $100$ g và lò xo độ cứng $40$ N/m. Tính khoảng thời gian ngắn nhất giữa hai lần liên tiếp động năng bằng thế năng.',
      steps: [
        '$T = 2\\pi\\sqrt{\\dfrac{m}{k}} = 2\\pi\\sqrt{\\dfrac{0{,}1}{40}} = \\dfrac{\\pi}{10} \\approx 0{,}314$ s.',
        '$W_đ = W_t$ tại $x = \\pm\\dfrac{A}{\\sqrt{2}}$, ứng với các pha $\\dfrac{\\pi}{4}, \\dfrac{3\\pi}{4}, \\dfrac{5\\pi}{4}, \\dfrac{7\\pi}{4}$: hai pha liền nhau cách nhau $\\dfrac{\\pi}{2}$, tức một phần tư chu kì.',
        '$\\Delta t = \\dfrac{T}{4} = \\dfrac{\\pi}{40} \\approx 0{,}0785$ s.',
      ],
      answer: '$\\Delta t = \\dfrac{T}{4} \\approx 0{,}079$ s.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt:
        'Một con lắc lò xo có độ cứng $80$ N/m dao động điều hoà với biên độ $5$ cm. Tính cơ năng của con lắc.',
      answer: 0.1,
      unit: 'J',
      hints: ['Đổi $A$ ra mét rồi dùng $W = \\dfrac{1}{2}kA^2$.'],
      solution: '$W = \\dfrac{1}{2} \\cdot 80 \\cdot 0{,}05^2 = 40 \\cdot 0{,}0025 = 0{,}1$ J.',
    },
    {
      type: 'number',
      prompt:
        'Một vật khối lượng $200$ g dao động điều hoà với tần số góc $10$ rad/s và biên độ $6$ cm. Tính cơ năng của vật.',
      answer: 0.036,
      unit: 'J',
      hints: ['$W = \\dfrac{1}{2}m\\omega^2A^2$, với $m$ tính bằng kg và $A$ bằng m.'],
      solution:
        '$W = \\dfrac{1}{2} \\cdot 0{,}2 \\cdot 10^2 \\cdot 0{,}06^2 = 10 \\cdot 0{,}0036 = 0{,}036$ J.',
    },
    {
      type: 'number',
      prompt:
        'Con lắc lò xo có $k = 50$ N/m dao động với biên độ $8$ cm. Tính động năng của vật khi nó ở li độ $x = -4$ cm.',
      answer: 0.12,
      unit: 'J',
      hints: [
        'Thế năng chỉ phụ thuộc $x^2$, dấu của li độ không quan trọng.',
        '$W_đ = \\dfrac{1}{2}k(A^2 - x^2)$.',
      ],
      solution:
        '$W_đ = \\dfrac{1}{2} \\cdot 50 \\cdot (0{,}08^2 - 0{,}04^2) = 25 \\cdot 0{,}0048 = 0{,}12$ J.',
    },
    {
      type: 'number',
      prompt:
        'Một vật dao động điều hoà với biên độ $6$ cm. Tại vị trí động năng bằng ba lần thế năng, li độ của vật có độ lớn bao nhiêu?',
      answer: 3,
      unit: 'cm',
      hints: ['$W_đ = 3W_t$ thì $W = 4W_t$.', '$\\dfrac{x^2}{A^2} = \\dfrac{W_t}{W}$.'],
      solution: '$W = 4W_t$ nên $x^2 = \\dfrac{A^2}{4}$, $|x| = \\dfrac{A}{2} = 3$ cm.',
    },
    {
      type: 'number',
      prompt:
        'Một vật dao động điều hoà với biên độ $10$ cm. Tại vị trí thế năng bằng ba lần động năng, li độ của vật có độ lớn bao nhiêu? (Làm tròn đến hai chữ số thập phân.)',
      answer: 8.66,
      tolerance: 0.01,
      unit: 'cm',
      hints: ['$W_t = 3W_đ$ thì $W = W_t + \\dfrac{W_t}{3} = \\dfrac{4}{3}W_t$.'],
      solution:
        '$W_t = \\dfrac{3}{4}W$ nên $x^2 = \\dfrac{3}{4}A^2$, $|x| = \\dfrac{\\sqrt{3}}{2} \\cdot 10 \\approx 8{,}66$ cm.',
    },
    {
      type: 'number',
      prompt:
        'Một vật dao động điều hoà đang ở li độ $x = \\dfrac{A}{3}$. Tỉ số giữa động năng và thế năng của vật bằng bao nhiêu?',
      answer: 8,
      hints: ['Tính $\\dfrac{W_t}{W} = \\dfrac{x^2}{A^2}$ trước.'],
      solution:
        '$\\dfrac{W_t}{W} = \\dfrac{1}{9}$, nên $W_đ = \\dfrac{8}{9}W$ và $\\dfrac{W_đ}{W_t} = 8$.',
    },
    {
      type: 'number',
      prompt:
        'Con lắc lò xo gồm vật $100$ g và lò xo độ cứng $40$ N/m dao động với biên độ $5$ cm. Tính tốc độ của vật khi nó ở li độ $3$ cm.',
      answer: 0.8,
      unit: 'm/s',
      hints: [
        'Bảo toàn cơ năng: $\\dfrac{1}{2}mv^2 = \\dfrac{1}{2}k(A^2 - x^2)$.',
        'Hoặc dùng $\\omega = \\sqrt{\\dfrac{k}{m}}$ và $|v| = \\omega\\sqrt{A^2 - x^2}$.',
      ],
      solution:
        '$\\omega = \\sqrt{\\dfrac{40}{0{,}1}} = 20$ rad/s, $|v| = 20\\sqrt{0{,}05^2 - 0{,}03^2} = 20 \\cdot 0{,}04 = 0{,}8$ m/s.',
    },
    {
      type: 'number',
      prompt:
        'Một con lắc lò xo có vật nặng $0{,}4$ kg và cơ năng $0{,}08$ J. Tính tốc độ của vật tại vị trí động năng bằng thế năng (làm tròn đến hai chữ số thập phân).',
      answer: 0.45,
      tolerance: 0.01,
      unit: 'm/s',
      hints: ['Khi $W_đ = W_t$ thì mỗi phần bằng $\\dfrac{W}{2}$.'],
      solution:
        '$W_đ = \\dfrac{0{,}08}{2} = 0{,}04$ J, $|v| = \\sqrt{\\dfrac{2 \\cdot 0{,}04}{0{,}4}} = \\sqrt{0{,}2} \\approx 0{,}45$ m/s.',
    },
    {
      type: 'number',
      prompt:
        'Một con lắc đơn có vật nặng $100$ g, dây dài $1$ m, được kéo lệch $60^\\circ$ rồi thả nhẹ. Bỏ qua lực cản, lấy $g = 10$ m/s². Tính tốc độ của vật khi dây treo lệch $30^\\circ$ (làm tròn đến hai chữ số thập phân).',
      answer: 2.71,
      tolerance: 0.01,
      unit: 'm/s',
      hints: [
        'Từ $60^\\circ$ xuống $30^\\circ$, vật hạ độ cao $h = l(\\cos 30^\\circ - \\cos 60^\\circ)$.',
        'Thế năng giảm bao nhiêu thì động năng tăng bấy nhiêu: $\\dfrac{1}{2}mv^2 = mgh$.',
      ],
      solution:
        '$h = 1 \\cdot (0{,}866 - 0{,}5) = 0{,}366$ m. $v = \\sqrt{2gh} = \\sqrt{2 \\cdot 10 \\cdot 0{,}366} = \\sqrt{7{,}32} \\approx 2{,}71$ m/s.',
    },
    {
      type: 'number',
      prompt:
        'Một con lắc đơn có vật nặng $200$ g, dây dài $0{,}5$ m, dao động với biên độ góc $0{,}1$ rad tại nơi có $g = 9{,}8$ m/s². Tính cơ năng của con lắc theo mJ (làm tròn đến hai chữ số thập phân).',
      answer: 4.9,
      tolerance: 0.01,
      unit: 'mJ',
      hints: ['Góc nhỏ: $W \\approx \\dfrac{1}{2}mgl\\alpha_0^2$, với $\\alpha_0$ tính bằng rad.'],
      solution:
        '$W \\approx \\dfrac{1}{2} \\cdot 0{,}2 \\cdot 9{,}8 \\cdot 0{,}5 \\cdot 0{,}1^2 = 0{,}0049$ J $= 4{,}90$ mJ. (Tính chính xác $mgl(1 - \\cos 0{,}1) \\approx 4{,}90$ mJ.)',
    },
    {
      type: 'choice',
      prompt:
        'Một vật dao động điều hoà với chu kì $T$. Khoảng thời gian ngắn nhất giữa hai lần liên tiếp động năng bằng thế năng là',
      options: ['$\\dfrac{T}{4}$', '$\\dfrac{T}{2}$', '$\\dfrac{T}{8}$', '$T$'],
      answer: 0,
      hints: [
        '$W_đ = W_t$ tại $x = \\pm\\dfrac{A}{\\sqrt{2}}$; trên vòng tròn pha, đó là bốn điểm cách đều nhau.',
      ],
      solution:
        'Bốn vị trí $W_đ = W_t$ ứng với các pha $\\dfrac{\\pi}{4}, \\dfrac{3\\pi}{4}, \\dfrac{5\\pi}{4}, \\dfrac{7\\pi}{4}$, cách nhau $\\dfrac{\\pi}{2}$, tức $\\dfrac{T}{4}$.',
    },
    {
      type: 'number',
      prompt:
        'Thế năng của một con lắc lò xo dao động điều hoà biến thiên tuần hoàn với tần số $6$ Hz. Tần số dao động của con lắc là bao nhiêu?',
      answer: 3,
      unit: 'Hz',
      hints: ['Thế năng biến thiên với tần số gấp mấy lần tần số dao động?'],
      solution: 'Thế năng và động năng biến thiên với tần số $2f$, nên $2f = 6$ Hz và $f = 3$ Hz.',
    },
  ],
  takeaways: [
    'Luôn bắt đầu từ cơ năng: $W = \\dfrac{1}{2}kA^2$ (con lắc lò xo), $W = mgl(1 - \\cos\\alpha_0)$ (con lắc đơn).',
    '$W_đ = W - W_t$: biết li độ thì tìm được tốc độ, biết tốc độ thì tìm được li độ.',
    '$W_đ = nW_t$ khi $|x| = \\dfrac{A}{\\sqrt{n + 1}}$; $W_đ = W_t$ tại $x = \\pm\\dfrac{A}{\\sqrt{2}}$.',
    'Động năng và thế năng biến thiên với tần số $2f$; hai lần liên tiếp $W_đ = W_t$ cách nhau $\\dfrac{T}{4}$.',
  ],
};
