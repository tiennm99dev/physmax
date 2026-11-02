/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Động lượng p = mv là đại lượng vectơ đặc trưng cho sự truyền chuyển động; xung lượng của lực bằng độ biến thiên động lượng, nên kéo dài thời gian va chạm thì lực giảm.',
  intro:
    'Xe tải và ô tô con cùng chạy một tốc độ, xe nào khó dừng hơn? Quả bóng sút càng mạnh, thủ môn càng khó bắt. Khả năng truyền chuyển động của một vật phụ thuộc cả khối lượng và vận tốc. Đại lượng nào gộp được cả hai?',
  objectives: [
    'Nêu được ý nghĩa vật lí và định nghĩa động lượng, viết được $\\vec{p} = m\\vec{v}$ và đơn vị kg.m/s.',
    'Nêu được khái niệm xung lượng của lực và đơn vị N.s.',
    'Vận dụng được mối liên hệ $\\vec{F}\\Delta t = \\Delta\\vec{p}$ để tính lực, độ biến thiên động lượng và giải thích tác dụng đệm.',
  ],
  sections: [
    {
      heading: 'Động lượng',
      blocks: [
        {
          type: 'p',
          text: 'Thả các viên bi từ một máng nghiêng cho va chạm với bi đứng yên ở chân dốc. Bi tới càng nặng hoặc càng nhanh thì bi bị va chạm đi càng xa: sự truyền chuyển động phụ thuộc cả khối lượng và vận tốc của vật.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Động lượng',
          text: 'Động lượng của một vật là đại lượng đặc trưng cho khả năng truyền chuyển động của vật khi tương tác với vật khác, đo bằng tích của khối lượng và vận tốc của vật: $\\vec{p} = m\\vec{v}$.',
        },
        {
          type: 'list',
          items: [
            'Động lượng là đại lượng vectơ, cùng hướng với vận tốc của vật.',
            'Độ lớn: $p = mv$. Đơn vị trong hệ SI là kg.m/s.',
            'Vận tốc phụ thuộc hệ quy chiếu nên động lượng cũng phụ thuộc hệ quy chiếu.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Phân biệt với động năng',
          text: 'Hai vật cùng khối lượng, cùng tốc độ nhưng chuyển động ngược chiều có động năng bằng nhau, còn động lượng thì khác nhau vì khác hướng.',
        },
      ],
    },
    {
      heading: 'Xung lượng của lực',
      blocks: [
        {
          type: 'p',
          text: 'Cú đá vô lê hay cú đánh gôn chỉ chạm bóng trong một khoảng thời gian rất ngắn nhưng làm bóng thay đổi chuyển động rất nhiều. Tác dụng của lực phụ thuộc cả độ lớn của lực và thời gian lực tác dụng.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Xung lượng của lực',
          text: 'Khi lực $\\vec{F}$ không đổi tác dụng lên vật trong khoảng thời gian ngắn $\\Delta t$, tích $\\vec{F}\\Delta t$ được gọi là xung lượng của lực trong khoảng thời gian đó. Đơn vị là N.s.',
        },
      ],
    },
    {
      heading: 'Liên hệ giữa lực và độ biến thiên động lượng',
      blocks: [
        {
          type: 'p',
          text: 'Vật khối lượng $m$ có vận tốc $\\vec{v_1}$, chịu lực $\\vec{F}$ trong thời gian $\\Delta t$ thì đạt vận tốc $\\vec{v_2}$. Theo định luật 2 Newton:',
        },
        {
          type: 'tex',
          tex: '\\vec{F} = m\\vec{a} = m\\,\\frac{\\vec{v_2} - \\vec{v_1}}{\\Delta t} \\quad\\Rightarrow\\quad \\vec{F}\\Delta t = m\\vec{v_2} - m\\vec{v_1} = \\Delta\\vec{p}',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Xung lượng và độ biến thiên động lượng',
          text: 'Độ biến thiên động lượng của một vật trong một khoảng thời gian bằng xung lượng của lực tác dụng lên vật trong khoảng thời gian đó: $\\Delta\\vec{p} = \\vec{F}\\Delta t$. Đơn vị kg.m/s và N.s tương đương nhau.',
        },
        {
          type: 'p',
          text: 'Viết lại, ta được dạng tổng quát của định luật 2 Newton: lực tổng hợp tác dụng lên vật bằng tốc độ thay đổi động lượng của vật.',
        },
        { type: 'tex', tex: '\\vec{F} = \\frac{\\Delta\\vec{p}}{\\Delta t}' },
        {
          type: 'callout',
          tone: 'note',
          title: 'Tác dụng đệm',
          text: 'Với cùng một độ biến thiên động lượng, thời gian tác dụng càng dài thì lực càng nhỏ. Vì thế thủ môn co tay và lùi người khi bắt bóng, người nhảy xuống đất khuỵu gối, ô tô có túi khí và đầu xe biến dạng được.',
        },
        {
          type: 'p',
          text: 'Khi tính toán, chọn một chiều dương rồi chiếu các vectơ lên trục đó. Quả bóng đập vào tường rồi bật ngược lại là trường hợp hay sai: hãy đổi các giá trị để thấy $\\Delta\\vec{p}$ không phải là hiệu hai độ lớn.',
        },
        { type: 'widget', name: 'vecto-dong-luong' },
      ],
    },
  ],
  explore: {
    title: 'Đỡ quả trứng ảo',
    instruction:
      'Chọn mặt đỡ và độ cao rồi thả trứng, thử lần lượt các mặt đỡ ở cùng một độ cao. So sánh các hình chữ nhật trên đồ thị: chiều cao (lực) và chiều rộng (thời gian) đổi thế nào, còn diện tích thì sao? Thời gian dừng và ngưỡng vỡ ở đây là giá trị giả định để minh hoạ.',
  },
  examples: [
    {
      problem:
        'Xe tải khối lượng $3$ tấn chạy với tốc độ $36$ km/h, ô tô con khối lượng $1$ tấn chạy với tốc độ $72$ km/h. Xe nào có động lượng lớn hơn?',
      steps: [
        'Đổi đơn vị: $36$ km/h $= 10$ m/s, $72$ km/h $= 20$ m/s.',
        'Xe tải: $p_1 = 3\\,000 \\cdot 10 = 30\\,000$ kg.m/s.',
        'Ô tô con: $p_2 = 1\\,000 \\cdot 20 = 20\\,000$ kg.m/s.',
      ],
      answer: 'Xe tải có động lượng lớn hơn, dù chạy chậm hơn.',
    },
    {
      problem:
        'Quả bóng gôn $46$ g đang nằm yên, sau cú đánh bay đi với tốc độ $70$ m/s. Thời gian gậy tiếp xúc bóng là $0{,}5 \\cdot 10^{-3}$ s. Tính xung lượng của lực và lực trung bình tác dụng lên bóng.',
      steps: [
        'Bóng ban đầu đứng yên nên $\\Delta p = mv = 0{,}046 \\cdot 70 = 3{,}22$ kg.m/s.',
        'Xung lượng của lực bằng độ biến thiên động lượng: $F\\Delta t = 3{,}22$ N.s.',
        'Lực trung bình: $F = \\dfrac{3{,}22}{0{,}5 \\cdot 10^{-3}} = 6\\,440$ N.',
      ],
      answer: 'Xung lượng $3{,}22$ N.s, lực trung bình $6\\,440$ N.',
    },
    {
      problem:
        'Quả bóng $0{,}4$ kg bay vuông góc đến tường với tốc độ $10$ m/s, bật ngược lại với tốc độ $8$ m/s. Thời gian tiếp xúc là $0{,}02$ s. Tính độ biến thiên động lượng và lực trung bình của tường lên bóng.',
      steps: [
        'Chọn chiều dương hướng vào tường: $v_1 = 10$ m/s, $v_2 = -8$ m/s.',
        '$\\Delta p = m(v_2 - v_1) = 0{,}4 \\cdot (-8 - 10) = -7{,}2$ kg.m/s.',
        '$F = \\dfrac{\\Delta p}{\\Delta t} = \\dfrac{-7{,}2}{0{,}02} = -360$ N; dấu âm chỉ lực hướng ra khỏi tường.',
      ],
      answer:
        '$\\Delta p$ có độ lớn $7{,}2$ kg.m/s, lực trung bình có độ lớn $360$ N, hướng ra khỏi tường.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt: 'Hòn đá $0{,}5$ kg bay với tốc độ $10$ m/s. Tính độ lớn động lượng của hòn đá.',
      answer: 5,
      unit: 'kg.m/s',
      hints: ['$p = mv$.'],
      solution: '$p = 0{,}5 \\cdot 10 = 5$ kg.m/s.',
    },
    {
      type: 'number',
      prompt: 'Ô tô $1{,}2$ tấn chạy với tốc độ $54$ km/h. Tính độ lớn động lượng của xe.',
      answer: 18000,
      unit: 'kg.m/s',
      hints: ['Đổi khối lượng ra kg và tốc độ ra m/s trước.', '$54$ km/h $= 15$ m/s.'],
      solution: '$m = 1\\,200$ kg, $v = 15$ m/s, nên $p = 1\\,200 \\cdot 15 = 18\\,000$ kg.m/s.',
    },
    {
      type: 'choice',
      prompt: 'Vectơ động lượng của một vật có hướng như thế nào?',
      options: [
        'Cùng hướng với vận tốc của vật',
        'Luôn cùng hướng với lực tác dụng lên vật',
        'Ngược hướng với vận tốc của vật',
        'Vuông góc với vận tốc của vật',
      ],
      answer: 0,
      hints: ['Trong $\\vec{p} = m\\vec{v}$, $m$ là số dương.'],
      solution:
        'Khối lượng dương nên $\\vec{p}$ cùng hướng với $\\vec{v}$. Lực làm thay đổi động lượng, $\\vec{F}$ cùng hướng với $\\Delta\\vec{p}$ chứ không nhất thiết cùng hướng với $\\vec{p}$.',
    },
    {
      type: 'number',
      prompt: 'Lực $200$ N tác dụng lên vật trong $0{,}05$ s. Tính độ lớn xung lượng của lực.',
      answer: 10,
      unit: 'N.s',
      hints: ['Xung lượng là tích của lực và thời gian tác dụng.'],
      solution: '$F\\Delta t = 200 \\cdot 0{,}05 = 10$ N.s.',
    },
    {
      type: 'number',
      prompt:
        'Quả bóng $0{,}5$ kg đang đứng yên, sau cú sút bay đi với tốc độ $20$ m/s. Chân tiếp xúc bóng trong $0{,}02$ s. Tính độ lớn lực trung bình của chân lên bóng.',
      answer: 500,
      unit: 'N',
      hints: [
        'Tính độ biến thiên động lượng của bóng trước.',
        'Chia độ biến thiên đó cho thời gian tiếp xúc.',
      ],
      solution: '$\\Delta p = 0{,}5 \\cdot 20 = 10$ kg.m/s; $F = \\dfrac{10}{0{,}02} = 500$ N.',
    },
    {
      type: 'number',
      prompt:
        'Ô tô $1\\,000$ kg đang chạy với tốc độ $20$ m/s thì phanh, dừng lại sau $5$ s. Tính độ lớn lực hãm trung bình.',
      answer: 4000,
      unit: 'N',
      hints: ['Động lượng cuối bằng $0$ vì xe dừng lại.'],
      solution:
        '$\\Delta p = 0 - 1\\,000 \\cdot 20 = -20\\,000$ kg.m/s; $F = \\dfrac{-20\\,000}{5} = -4\\,000$ N, độ lớn $4\\,000$ N, ngược chiều chuyển động.',
    },
    {
      type: 'number',
      prompt:
        'Quả bóng $0{,}3$ kg đập vuông góc vào tường với tốc độ $10$ m/s rồi bật ngược lại với cùng tốc độ. Tính độ lớn độ biến thiên động lượng của bóng.',
      answer: 6,
      unit: 'kg.m/s',
      hints: [
        'Chọn chiều dương rồi viết $v_1$ và $v_2$ với dấu của chúng.',
        'Hai vận tốc ngược dấu, đừng lấy hiệu hai độ lớn.',
      ],
      solution:
        'Chọn chiều dương hướng vào tường: $\\Delta p = 0{,}3 \\cdot (-10 - 10) = -6$ kg.m/s, độ lớn $6$ kg.m/s. Tốc độ không đổi nhưng động lượng thay đổi vì đổi hướng.',
    },
    {
      type: 'number',
      prompt:
        'Quả bóng $0{,}2$ kg bay đến vợt với tốc độ $15$ m/s, bật ngược lại với tốc độ $10$ m/s. Thời gian tiếp xúc $0{,}01$ s. Tính độ lớn lực trung bình của vợt lên bóng.',
      answer: 500,
      unit: 'N',
      hints: ['Hai vận tốc ngược chiều nhau.', '$F = \\dfrac{m(v_2 - v_1)}{\\Delta t}$.'],
      solution:
        'Chọn chiều dương là chiều bóng bay đến: $\\Delta p = 0{,}2 \\cdot (-10 - 15) = -5$ kg.m/s; $F = \\dfrac{-5}{0{,}01} = -500$ N, độ lớn $500$ N.',
    },
    {
      type: 'choice',
      prompt: 'Vì sao túi khí trên ô tô làm giảm chấn thương cho người khi va chạm?',
      options: [
        'Túi khí kéo dài thời gian dừng lại của người, nên lực tác dụng lên người giảm',
        'Túi khí làm độ biến thiên động lượng của người bằng $0$',
        'Túi khí làm người nhẹ đi',
        'Túi khí làm tăng tốc độ của người trước va chạm',
      ],
      answer: 0,
      hints: [
        'Người vẫn dừng lại, vậy $\\Delta p$ có đổi không? Đại lượng nào trong $F = \\dfrac{\\Delta p}{\\Delta t}$ thay đổi?',
      ],
      solution:
        'Người vẫn dừng lại nên $\\Delta p$ gần như không đổi. Túi khí tăng $\\Delta t$, do đó $F = \\dfrac{\\Delta p}{\\Delta t}$ giảm.',
    },
    {
      type: 'multi',
      prompt: 'Trường hợp nào dưới đây áp dụng cách kéo dài thời gian tác dụng để giảm lực?',
      options: [
        'Thủ môn co tay, lùi người khi bắt bóng',
        'Người nhảy từ trên cao xuống khuỵu gối khi tiếp đất',
        'Đầu ô tô được thiết kế để biến dạng khi va chạm',
        'Dùng búa thép gõ nhanh để đóng đinh',
      ],
      answers: [0, 1, 2],
      hints: ['Trường hợp nào muốn lực nhỏ, trường hợp nào lại muốn lực lớn?'],
      solution:
        'Co tay, khuỵu gối và đầu xe biến dạng đều làm tăng $\\Delta t$ để giảm lực. Búa thép dừng rất nhanh, $\\Delta t$ nhỏ, tạo lực lớn để đóng đinh.',
    },
  ],
  takeaways: [
    'Động lượng: $\\vec{p} = m\\vec{v}$, là vectơ cùng hướng với vận tốc, đơn vị kg.m/s.',
    'Xung lượng của lực: $\\vec{F}\\Delta t$, đơn vị N.s.',
    'Độ biến thiên động lượng bằng xung lượng của lực: $\\Delta\\vec{p} = \\vec{F}\\Delta t$, hay $\\vec{F} = \\dfrac{\\Delta\\vec{p}}{\\Delta t}$.',
    'Cùng $\\Delta p$, thời gian tác dụng dài thì lực nhỏ: đó là tác dụng đệm.',
    'Khi tính $\\Delta p$, chọn chiều dương và giữ dấu của vận tốc.',
  ],
};
