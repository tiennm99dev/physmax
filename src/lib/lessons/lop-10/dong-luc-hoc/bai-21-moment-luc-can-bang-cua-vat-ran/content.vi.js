/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Moment lực M = F.d đặc trưng cho tác dụng làm quay của lực; quy tắc moment cho vật có trục quay cố định; ngẫu lực; điều kiện cân bằng tổng quát của vật rắn.',
  intro:
    'Dùng tay không rất khó vặn một đai ốc, nhưng dùng cờ lê cán dài thì lại dễ. Búa nhổ đinh, bập bênh, tay nắm cửa đều dựa vào cùng một điều: tác dụng làm quay của lực không chỉ phụ thuộc vào độ lớn của lực.',
  objectives: [
    'Nêu được khái niệm cánh tay đòn, moment lực, viết được công thức $M = F.d$.',
    'Phát biểu và vận dụng được quy tắc moment lực cho vật có trục quay cố định.',
    'Nêu được khái niệm ngẫu lực, tính được moment của ngẫu lực.',
    'Nêu và vận dụng được điều kiện cân bằng tổng quát của vật rắn.',
  ],
  sections: [
    {
      heading: 'Moment lực',
      blocks: [
        {
          type: 'p',
          text: 'Tác dụng làm quay của một lực phụ thuộc vào độ lớn của lực, vị trí của trục quay và khoảng cách từ trục quay đến giá của lực.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Cánh tay đòn',
          text: 'Cánh tay đòn của lực là khoảng cách từ trục quay đến giá của lực, kí hiệu là $d$.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Moment lực',
          text: 'Moment lực đối với một trục quay là đại lượng đặc trưng cho tác dụng làm quay của lực quanh trục ấy, được đo bằng tích của độ lớn lực với cánh tay đòn: $M = F.d$. Đơn vị của moment lực là N.m.',
        },
        { type: 'widget', name: 'canh-tay-don' },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Cánh tay đòn không phải là độ dài thanh',
          text: 'Cánh tay đòn đo vuông góc từ trục đến giá của lực. Khi lực không vuông góc với thanh, $d$ nhỏ hơn khoảng cách từ trục đến điểm đặt lực. Khi giá của lực đi qua trục, $d = 0$ và lực không làm vật quay.',
        },
      ],
    },
    {
      heading: 'Quy tắc moment lực',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Quy tắc moment',
          text: 'Muốn cho một vật có trục quay cố định ở trạng thái cân bằng thì tổng các moment lực làm vật quay theo chiều kim đồng hồ phải bằng tổng các moment lực làm vật quay ngược chiều kim đồng hồ.',
        },
        {
          type: 'p',
          text: 'Nếu quy ước moment làm vật quay theo một chiều là dương, chiều kia là âm, thì điều kiện trên viết gọn thành $\\sum M = 0$. Bập bênh cân bằng khi $F_1 d_1 = F_2 d_2$: người nhẹ hơn ngồi xa trục hơn.',
        },
      ],
    },
    {
      heading: 'Ngẫu lực',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Ngẫu lực',
          text: 'Ngẫu lực là hệ hai lực song song, ngược chiều, có độ lớn bằng nhau và cùng đặt vào một vật. Hợp lực của ngẫu lực bằng $0$ nên ngẫu lực chỉ làm vật quay, không làm vật chuyển động tịnh tiến.',
        },
        {
          type: 'p',
          text: 'Moment của ngẫu lực bằng độ lớn của một lực nhân với khoảng cách $d$ giữa hai giá của hai lực: $M = F.d$. Ta gặp ngẫu lực khi vặn vòi nước, xoay vô lăng bằng hai tay.',
        },
        { type: 'widget', name: 'ngau-luc' },
      ],
    },
    {
      heading: 'Điều kiện cân bằng tổng quát của vật rắn',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Hai điều kiện',
          text: 'Một vật rắn ở trạng thái cân bằng khi: (1) tổng các lực tác dụng lên vật bằng $0$, $\\sum \\vec{F} = \\vec{0}$; (2) tổng moment lực đối với một điểm bất kì, chọn một chiều quay làm chiều dương, bằng $0$, $\\sum M = 0$.',
        },
        {
          type: 'p',
          text: 'Khi giải bài toán, nên lấy moment đối với điểm có lực chưa biết đi qua: moment của lực đó bằng $0$ nên phương trình còn ít ẩn hơn.',
        },
      ],
    },
  ],
  explore: {
    title: 'Thanh cân có trục quay',
    instruction:
      'Mỗi quả nặng là $1$ N, các vị trí cách trục $10$ cm. Bên trái đang có $2$ quả ở vị trí $30$ cm. Hãy treo quả nặng ở bên phải để thanh nằm ngang, rồi tìm thêm một cách cân bằng khác với số quả khác đi.',
  },
  examples: [
    {
      problem:
        'Dùng cờ lê vặn một đai ốc, tác dụng lực $20$ N vuông góc với tay cờ lê tại điểm cách trục $0{,}3$ m. Tính moment lực.',
      steps: [
        'Lực vuông góc với tay cờ lê nên cánh tay đòn $d = 0{,}3$ m.',
        '$M = F.d = 20 \\cdot 0{,}3 = 6$ N.m.',
      ],
      answer: '$M = 6$ N.m.',
    },
    {
      problem:
        'Bạn A nặng $30$ kg ngồi cách trục bập bênh $1{,}5$ m. Bạn B nặng $45$ kg phải ngồi cách trục bao nhiêu ở phía bên kia để bập bênh cân bằng?',
      steps: [
        'Theo quy tắc moment: $P_A d_A = P_B d_B$, tức $m_A g d_A = m_B g d_B$; $g$ giản ước được.',
        '$d_B = \\dfrac{m_A d_A}{m_B} = \\dfrac{30 \\cdot 1{,}5}{45} = 1$ m.',
      ],
      answer: 'Bạn B ngồi cách trục $1$ m.',
    },
    {
      problem:
        'Hai tay tác dụng lên vô lăng một ngẫu lực, mỗi lực $8$ N, hai giá cách nhau $0{,}4$ m. Tính moment của ngẫu lực.',
      steps: ['$M = F.d = 8 \\cdot 0{,}4 = 3{,}2$ N.m.'],
      answer: '$M = 3{,}2$ N.m.',
    },
    {
      problem:
        'Thanh $AB$ dài $1$ m có trọng lượng $20$ N, trọng tâm ở chính giữa, đặt nằm ngang trên hai giá đỡ tại $A$ và $B$. Treo vật $30$ N tại điểm $C$ cách $A$ là $20$ cm. Tính lực đỡ của hai giá.',
      steps: [
        'Lấy moment đối với $A$: lực đỡ $N_A$ đi qua $A$ nên có moment bằng $0$.',
        '$N_B \\cdot 1 = 20 \\cdot 0{,}5 + 30 \\cdot 0{,}2 = 16$, nên $N_B = 16$ N.',
        'Tổng lực bằng $0$: $N_A + N_B = 20 + 30$, nên $N_A = 34$ N.',
      ],
      answer: '$N_A = 34$ N; $N_B = 16$ N.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt: 'Một lực $15$ N có cánh tay đòn $0{,}2$ m đối với trục quay. Tính moment lực.',
      answer: 3,
      unit: 'N.m',
      hints: ['$M = F.d$.'],
      solution: '$M = 15 \\cdot 0{,}2 = 3$ N.m.',
    },
    {
      type: 'number',
      prompt:
        'Thước mảnh quay quanh trục $O$. Tác dụng lực $4$ N tại điểm cách $O$ là $0{,}5$ m, hướng lực hợp với thước góc $30^\\circ$. Tính moment lực.',
      answer: 1,
      tolerance: 0.01,
      unit: 'N.m',
      hints: ['Cánh tay đòn không phải là $0{,}5$ m.', '$d = 0{,}5\\sin 30^\\circ$.'],
      solution: '$d = 0{,}5 \\cdot \\sin 30^\\circ = 0{,}25$ m. $M = 4 \\cdot 0{,}25 = 1$ N.m.',
    },
    {
      type: 'number',
      prompt:
        'Một cờ lê dài $0{,}3$ m cần tạo moment $12$ N.m để vặn đai ốc. Tính lực tối thiểu tác dụng tại đầu cờ lê.',
      answer: 40,
      unit: 'N',
      hints: ['Lực nhỏ nhất khi cánh tay đòn lớn nhất: lực vuông góc với cán.'],
      solution: '$F = \\dfrac{M}{d} = \\dfrac{12}{0{,}3} = 40$ N.',
    },
    {
      type: 'number',
      prompt:
        'Thanh nhẹ có trục quay. Treo lực $F_1 = 6$ N cách trục $0{,}2$ m. Ở phía bên kia, cách trục $0{,}3$ m, cần treo lực $F_2$ bằng bao nhiêu để thanh cân bằng?',
      answer: 4,
      unit: 'N',
      hints: ['$F_1 d_1 = F_2 d_2$.'],
      solution: '$F_2 = \\dfrac{6 \\cdot 0{,}2}{0{,}3} = 4$ N.',
    },
    {
      type: 'number',
      prompt:
        'Bạn $40$ kg ngồi cách trục bập bênh $1{,}5$ m. Bạn $60$ kg phải ngồi cách trục bao nhiêu mét ở phía bên kia để cân bằng?',
      answer: 1,
      tolerance: 0.01,
      unit: 'm',
      hints: ['$g$ ở hai vế giản ước được.'],
      solution: '$d = \\dfrac{40 \\cdot 1{,}5}{60} = 1$ m.',
    },
    {
      type: 'number',
      prompt:
        'Dùng đòn bẩy nâng tảng đá nặng $600$ N đặt cách điểm tựa $0{,}3$ m. Tay ấn vuông góc với đòn tại điểm cách điểm tựa $1{,}2$ m. Tính lực ấn của tay.',
      answer: 150,
      unit: 'N',
      hints: ['Viết quy tắc moment đối với điểm tựa.'],
      solution: '$F \\cdot 1{,}2 = 600 \\cdot 0{,}3$, nên $F = 150$ N.',
    },
    {
      type: 'number',
      prompt:
        'Một ngẫu lực có mỗi lực $5$ N, khoảng cách giữa hai giá $0{,}3$ m. Tính moment của ngẫu lực.',
      answer: 1.5,
      tolerance: 0.01,
      unit: 'N.m',
      hints: ['$F$ là độ lớn của một lực, không cộng hai lực.'],
      solution: '$M = F.d = 5 \\cdot 0{,}3 = 1{,}5$ N.m.',
    },
    {
      type: 'number',
      prompt:
        'Thanh $AB$ dài $2$ m có trọng lượng $100$ N, trọng tâm ở chính giữa, đặt nằm ngang trên hai giá tại $A$ và $B$. Treo vật $200$ N cách $A$ là $0{,}5$ m. Tính lực đỡ của giá tại $A$.',
      answer: 200,
      unit: 'N',
      hints: [
        'Lấy moment đối với $A$ để tìm $N_B$ trước.',
        'Rồi dùng tổng lực bằng $0$ để tìm $N_A$.',
      ],
      solution:
        '$N_B \\cdot 2 = 100 \\cdot 1 + 200 \\cdot 0{,}5 = 200$, nên $N_B = 100$ N. $N_A = 300 - 100 = 200$ N.',
    },
    {
      type: 'choice',
      prompt: 'Lực có giá đi qua trục quay của vật thì',
      options: [
        'làm vật quay nhanh nhất.',
        'có moment bằng $0$, không làm vật quay.',
        'có cánh tay đòn lớn nhất.',
        'làm vật quay ngược chiều kim đồng hồ.',
      ],
      answer: 1,
      hints: ['Tìm khoảng cách từ trục đến giá của lực.'],
      solution: 'Khi đó $d = 0$, nên $M = F.d = 0$.',
    },
    {
      type: 'choice',
      prompt: 'Vật tự do chịu một ngẫu lực thì',
      options: [
        'chỉ chuyển động tịnh tiến.',
        'chỉ quay.',
        'vừa quay vừa tịnh tiến.',
        'luôn đứng yên.',
      ],
      answer: 1,
      hints: ['Hợp lực của ngẫu lực bằng bao nhiêu?'],
      solution: 'Hợp lực bằng $0$ nên không gây tịnh tiến; moment khác $0$ nên làm vật quay.',
    },
    {
      type: 'multi',
      prompt: 'Một vật rắn cân bằng phải thoả mãn những điều kiện nào?',
      options: [
        'Tổng các lực tác dụng lên vật bằng $\\vec{0}$.',
        'Tổng moment lực đối với một điểm bất kì bằng $0$.',
        'Mọi lực tác dụng lên vật phải có giá đi qua trọng tâm.',
        'Vật chỉ chịu tác dụng của hai lực.',
      ],
      answers: [0, 1],
      hints: ['Một điều kiện để không tịnh tiến, một điều kiện để không quay.'],
      solution:
        'Điều kiện cân bằng tổng quát gồm tổng lực bằng $\\vec{0}$ và tổng moment bằng $0$.',
    },
    {
      type: 'text',
      prompt: 'Khoảng cách từ trục quay đến giá của lực gọi là gì?',
      accept: ['cánh tay đòn', 'cánh tay đòn của lực'],
      hints: ['Cụm từ gợi đến chiếc đòn bẩy.'],
      solution: 'Đó là cánh tay đòn của lực, kí hiệu $d$.',
    },
  ],
  takeaways: [
    'Cánh tay đòn $d$ là khoảng cách từ trục quay đến giá của lực; moment lực $M = F.d$, đơn vị N.m.',
    'Quy tắc moment: tổng moment làm vật quay cùng chiều kim đồng hồ bằng tổng moment làm vật quay ngược chiều.',
    'Ngẫu lực: hai lực song song, ngược chiều, cùng độ lớn; chỉ làm vật quay, $M = F.d$ với $d$ là khoảng cách hai giá.',
    'Vật rắn cân bằng khi tổng lực bằng $\\vec{0}$ và tổng moment đối với một điểm bất kì bằng $0$.',
  ],
};
