/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Định luật 2 Newton: gia tốc của vật cùng hướng với lực, độ lớn tỉ lệ thuận với lực và tỉ lệ nghịch với khối lượng, a = F/m; đơn vị lực là newton.',
  intro:
    'Xe đẩy siêu thị rỗng chỉ cần đẩy nhẹ là chạy nhanh, nhưng chất đầy hàng thì cùng lực đó xe tăng tốc rất chậm. Định luật 1 Newton cho biết điều gì xảy ra khi không có lực; còn khi có lực, vận tốc thay đổi nhanh chậm thế nào?',
  objectives: [
    'Phát biểu được định luật 2 Newton và viết được hệ thức $\\vec{a} = \\dfrac{\\vec{F}}{m}$.',
    'Từ số liệu thí nghiệm, nêu được mối quan hệ giữa gia tốc với lực và với khối lượng.',
    'Nêu được đơn vị newton từ đơn vị cơ bản của SI.',
    'Vận dụng được định luật để tính gia tốc, lực hoặc khối lượng.',
  ],
  sections: [
    {
      heading: 'Thí nghiệm: gia tốc phụ thuộc vào lực và khối lượng',
      blocks: [
        {
          type: 'p',
          text: 'Cho xe chạy từ trạng thái nghỉ trên đoạn đường $d$ dưới tác dụng của lực kéo không đổi. Đo thời gian $t$, gia tốc của xe là $a = \\dfrac{2d}{t^2}$. Lần lượt thay đổi một đại lượng và giữ nguyên đại lượng kia:',
        },
        {
          type: 'list',
          items: [
            'Giữ nguyên khối lượng, tăng lực kéo: đồ thị $a$ theo $F$ là đường thẳng đi qua gốc toạ độ, tức $a$ tỉ lệ thuận với $F$.',
            'Giữ nguyên lực kéo, tăng khối lượng: $a$ giảm, và đồ thị $a$ theo $\\dfrac{1}{m}$ là đường thẳng đi qua gốc toạ độ, tức $a$ tỉ lệ nghịch với $m$.',
          ],
        },
      ],
    },
    {
      heading: 'Định luật 2 Newton',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Định luật 2 Newton',
          text: 'Gia tốc của một vật có cùng hướng với lực tác dụng lên vật. Độ lớn của gia tốc tỉ lệ thuận với độ lớn của lực và tỉ lệ nghịch với khối lượng của vật.',
        },
        {
          type: 'tex',
          tex: '\\vec{a} = \\dfrac{\\vec{F}}{m} \\quad \\text{hay} \\quad \\vec{F} = m\\vec{a}',
        },
        {
          type: 'p',
          text: 'Nếu vật chịu nhiều lực thì $\\vec{F}$ là hợp lực của các lực đó: $\\vec{F} = \\vec{F_1} + \\vec{F_2} + \\dots + \\vec{F_n}$. Ví dụ xe chịu lực kéo và lực cản ngược chiều thì $F = F_k - F_c$. Khi $\\vec{F} = \\vec{0}$ thì $\\vec{a} = \\vec{0}$, ta trở lại định luật 1 Newton.',
        },
      ],
    },
    {
      heading: 'Đơn vị của lực',
      blocks: [
        {
          type: 'p',
          text: 'Từ $F = ma$, trong hệ SI, đơn vị của lực là newton (N), được xây dựng từ các đơn vị cơ bản kilôgam, mét và giây:',
        },
        {
          type: 'tex',
          tex: '1\\text{ N} = 1\\text{ kg} \\cdot 1\\text{ m/s}^2 = 1\\text{ kg.m/s}^2',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Một newton',
          text: '$1$ N là độ lớn của lực truyền cho vật có khối lượng $1$ kg gia tốc $1$ m/s².',
        },
      ],
    },
    {
      heading: 'Khối lượng và mức quán tính',
      blocks: [
        {
          type: 'p',
          text: 'Từ $a = \\dfrac{F}{m}$: cùng một lực, vật có khối lượng càng lớn thì gia tốc càng nhỏ, tức vận tốc càng khó thay đổi. Đó là lí do khối lượng đặc trưng cho mức quán tính của vật.',
        },
        {
          type: 'table',
          caption: 'Hai cách làm thay đổi gia tốc',
          head: ['Thay đổi', 'Gia tốc', 'Ví dụ'],
          rows: [
            ['$F$ tăng gấp đôi, $m$ không đổi', 'Tăng gấp đôi', 'Thêm một người đẩy xe'],
            ['$m$ tăng gấp đôi, $F$ không đổi', 'Giảm một nửa', 'Chất thêm hàng lên xe'],
          ],
        },
      ],
    },
  ],
  explore: {
    title: 'Đẩy xe và vẽ đồ thị từ số liệu',
    instruction:
      'Cho xe chạy với các lực và tải khác nhau. Mỗi lần chạy thêm một điểm vào đồ thị. Giữ nguyên khối lượng để xem đồ thị $a$ theo $F$, giữ nguyên lực để xem đồ thị $a$ theo $\\dfrac{1}{m}$.',
  },
  examples: [
    {
      problem:
        'Một ô tô khối lượng $1\\,000$ kg tăng tốc từ trạng thái đứng yên, sau $10$ s đạt $20$ m/s. Tính hợp lực tác dụng lên xe.',
      steps: [
        'Gia tốc: $a = \\dfrac{v - v_0}{t} = \\dfrac{20 - 0}{10} = 2$ m/s².',
        'Theo định luật 2 Newton: $F = ma = 1\\,000 \\cdot 2 = 2\\,000$ N.',
      ],
      answer: 'Hợp lực bằng $2\\,000$ N, cùng hướng chuyển động.',
    },
    {
      problem:
        'Một lực $F$ truyền cho vật $m_1$ gia tốc $2$ m/s² và truyền cho vật $m_2$ gia tốc $3$ m/s². Lực đó truyền cho vật khối lượng $m_1 + m_2$ gia tốc bao nhiêu?',
      steps: [
        'Từ định luật 2: $m_1 = \\dfrac{F}{2}$ và $m_2 = \\dfrac{F}{3}$.',
        '$a = \\dfrac{F}{m_1 + m_2} = \\dfrac{F}{\\dfrac{F}{2} + \\dfrac{F}{3}} = \\dfrac{1}{\\dfrac{1}{2} + \\dfrac{1}{3}} = \\dfrac{6}{5}$.',
      ],
      answer: '$a = 1{,}2$ m/s².',
    },
    {
      problem:
        'Một xe khối lượng $50$ kg chịu lực kéo $300$ N và lực cản $100$ N ngược chiều chuyển động. Tính gia tốc của xe.',
      steps: [
        'Chọn chiều dương là chiều chuyển động. Hợp lực: $F = F_k - F_c = 300 - 100 = 200$ N.',
        '$a = \\dfrac{F}{m} = \\dfrac{200}{50} = 4$ m/s².',
      ],
      answer: '$a = 4$ m/s², cùng chiều chuyển động.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt: 'Một lực $15$ N tác dụng lên vật $3$ kg. Tính gia tốc của vật.',
      answer: 5,
      unit: 'm/s²',
      hints: ['$a = \\dfrac{F}{m}$.'],
      solution: '$a = \\dfrac{15}{3} = 5$ m/s².',
    },
    {
      type: 'number',
      prompt:
        'Muốn vật $0{,}5$ kg có gia tốc $4$ m/s² thì hợp lực tác dụng lên vật phải bằng bao nhiêu?',
      answer: 2,
      unit: 'N',
      hints: ['$F = ma$.'],
      solution: '$F = 0{,}5 \\cdot 4 = 2$ N.',
    },
    {
      type: 'number',
      prompt: 'Lực $20$ N làm vật có gia tốc $4$ m/s². Tính khối lượng của vật.',
      answer: 5,
      unit: 'kg',
      hints: ['Biến đổi $F = ma$ để tìm $m$.'],
      solution: '$m = \\dfrac{F}{a} = \\dfrac{20}{4} = 5$ kg.',
    },
    {
      type: 'choice',
      prompt:
        'Nếu lực tác dụng lên vật tăng gấp đôi và khối lượng của vật giảm một nửa thì gia tốc',
      options: ['không đổi.', 'tăng gấp đôi.', 'tăng gấp bốn.', 'giảm một nửa.'],
      answer: 2,
      hints: ['Xét riêng ảnh hưởng của lực, rồi của khối lượng.'],
      solution:
        '$a = \\dfrac{F}{m}$: lực gấp $2$ và khối lượng chia $2$ nên $a$ gấp $2 \\cdot 2 = 4$ lần.',
    },
    {
      type: 'number',
      prompt:
        'Xe khối lượng $200$ kg chịu lực kéo $500$ N và lực cản $100$ N ngược chiều chuyển động. Tính gia tốc của xe.',
      answer: 2,
      unit: 'm/s²',
      hints: ['Tìm hợp lực trước.', 'Hai lực ngược chiều.'],
      solution: '$F = 500 - 100 = 400$ N, nên $a = \\dfrac{400}{200} = 2$ m/s².',
    },
    {
      type: 'number',
      prompt:
        'Một ô tô $1\\,200$ kg đang chạy $20$ m/s thì phanh và dừng lại sau $5$ s. Tính độ lớn lực hãm.',
      answer: 4800,
      unit: 'N',
      hints: ['Tính độ lớn gia tốc từ độ biến thiên vận tốc.', '$F = ma$.'],
      solution: '$a = \\dfrac{20}{5} = 4$ m/s² (độ lớn), nên $F = 1\\,200 \\cdot 4 = 4\\,800$ N.',
    },
    {
      type: 'number',
      prompt:
        'Vật $5$ kg đang đứng yên chịu hợp lực không đổi $10$ N. Tính vận tốc của vật sau $4$ s.',
      answer: 8,
      unit: 'm/s',
      hints: ['Tính gia tốc rồi dùng $v = v_0 + at$.'],
      solution: '$a = \\dfrac{10}{5} = 2$ m/s², nên $v = 0 + 2 \\cdot 4 = 8$ m/s.',
    },
    {
      type: 'number',
      prompt:
        'Một lực truyền cho vật $m_1$ gia tốc $6$ m/s² và truyền cho vật $m_2$ gia tốc $3$ m/s². Lực đó truyền cho vật khối lượng $m_1 + m_2$ gia tốc bao nhiêu?',
      answer: 2,
      unit: 'm/s²',
      hints: [
        'Biểu diễn $m_1$, $m_2$ theo $F$.',
        'Thay vào $a = \\dfrac{F}{m_1 + m_2}$, $F$ sẽ rút gọn.',
      ],
      solution:
        '$m_1 = \\dfrac{F}{6}$, $m_2 = \\dfrac{F}{3}$, nên $a = \\dfrac{1}{\\dfrac{1}{6} + \\dfrac{1}{3}} = 2$ m/s².',
    },
    {
      type: 'choice',
      prompt: 'Đơn vị newton được biểu diễn theo các đơn vị cơ bản của SI là',
      options: [
        '$\\text{kg.m/s}$',
        '$\\text{kg.m/s}^2$',
        '$\\text{kg/m.s}^2$',
        '$\\text{g.m/s}^2$',
      ],
      answer: 1,
      hints: ['Dựa vào $F = ma$ với đơn vị của $m$ và $a$.'],
      solution: '$F = ma$ nên $1$ N $= 1$ kg $\\cdot$ $1$ m/s² $= 1$ kg.m/s².',
    },
    {
      type: 'multi',
      prompt: 'Chọn các phát biểu đúng theo định luật 2 Newton.',
      options: [
        'Gia tốc luôn cùng hướng với hợp lực tác dụng lên vật.',
        'Gia tốc luôn cùng hướng với vận tốc của vật.',
        'Cùng một lực, vật có khối lượng lớn hơn thu gia tốc nhỏ hơn.',
        'Vật không chịu lực thì không thể chuyển động.',
      ],
      answers: [0, 2],
      hints: ['Khi xe phanh, gia tốc hướng thế nào so với vận tốc?'],
      solution:
        'Gia tốc cùng hướng với hợp lực và tỉ lệ nghịch với khối lượng. Khi phanh, gia tốc ngược hướng vận tốc; vật không chịu lực vẫn có thể chuyển động thẳng đều.',
    },
  ],
  takeaways: [
    '$\\vec{a} = \\dfrac{\\vec{F}}{m}$: gia tốc cùng hướng với hợp lực, tỉ lệ thuận với lực, tỉ lệ nghịch với khối lượng.',
    '$1$ N $= 1$ kg.m/s² là lực truyền cho vật $1$ kg gia tốc $1$ m/s².',
    'Khối lượng càng lớn, gia tốc càng nhỏ: khối lượng đặc trưng cho mức quán tính.',
  ],
};
