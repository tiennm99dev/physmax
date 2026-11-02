/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Vật chuyển động trong chất lưu chịu lực cản ngược hướng chuyển động, phụ thuộc hình dạng và tốc độ, và có thể chịu lực nâng; hình dạng khí động học giúp giảm lực cản.',
  intro:
    'Vì sao xe đua, tàu cao tốc, cá heo đều có đầu thon? Vì sao chiếc máy bay nặng hàng trăm tấn lại giữ được độ cao, còn con chuồn chuồn có thể lơ lửng trên không? Câu trả lời nằm ở hai lực do chất lưu tác dụng lên vật: lực cản và lực nâng.',
  objectives: [
    'Nêu được khái niệm chất lưu, đặc điểm của lực cản khi vật chuyển động trong chất lưu.',
    'Nêu được lực cản phụ thuộc vào hình dạng và tốc độ của vật, giải thích được tác dụng của hình dạng khí động học.',
    'Giải thích được vì sao vật rơi trong chất lưu đạt tới tốc độ giới hạn.',
    'Nêu được đặc điểm của lực nâng và vận dụng để tính lực nâng trong trường hợp vật cân bằng.',
  ],
  sections: [
    {
      heading: 'Lực cản của chất lưu',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Chất lưu và lực cản',
          text: 'Chất lưu là tên gọi chung của chất lỏng và chất khí. Mọi vật chuyển động trong chất lưu đều chịu tác dụng của lực cản, có hướng ngược với hướng chuyển động của vật và có tác dụng làm chậm chuyển động đó.',
        },
        {
          type: 'list',
          items: [
            'Tốc độ: vật chuyển động càng nhanh, lực cản càng lớn. Đạp xe nhanh ta cảm nhận gió cản mạnh hơn đạp chậm.',
            'Hình dạng: cùng tốc độ, vật đầu bè chịu lực cản lớn hơn vật đầu thon.',
          ],
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Hình dạng khí động học',
          text: 'Hình dạng khí động học là hình dạng có phần đầu thon, nhỏ, giúp dòng chất lưu chảy bám theo thân vật và làm giảm đáng kể lực cản. Tàu ngầm, cá, máy bay, ô tô đua đều có dạng này.',
        },
      ],
    },
    {
      heading: 'Tốc độ giới hạn khi vật rơi trong chất lưu',
      blocks: [
        {
          type: 'p',
          text: 'Khi một vật rơi trong chất lưu, tốc độ tăng làm lực cản tăng. Đến một lúc, lực cản cân bằng với trọng lực (nếu lực đẩy của chất lưu không đáng kể) nên hợp lực bằng $0$: vật chuyển động đều với tốc độ không đổi, gọi là tốc độ giới hạn.',
        },
        { type: 'widget', name: 'roi' },
        {
          type: 'p',
          text: 'Chiếc dù có diện tích lớn và cản không khí mạnh, nên tốc độ giới hạn khi bung dù chỉ vài mét trên giây, đủ để người nhảy dù tiếp đất an toàn.',
        },
      ],
    },
    {
      heading: 'Lực nâng của chất lưu',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Lực nâng',
          text: 'Khi chuyển động trong nước hoặc không khí, ngoài lực cản vật còn có thể chịu lực nâng của chất lưu. Lực này có phương vuông góc với hướng chuyển động và đỡ vật, giúp máy bay, chim và côn trùng bay được.',
        },
        {
          type: 'table',
          caption: 'So sánh lực cản và lực nâng khi vật chuyển động trong chất lưu',
          head: ['Đặc điểm', 'Lực cản', 'Lực nâng'],
          rows: [
            ['Phương', 'Song song với chuyển động', 'Vuông góc với chuyển động'],
            ['Tác dụng', 'Làm chậm chuyển động', 'Đỡ vật, giữ vật không bị rơi'],
          ],
        },
        {
          type: 'p',
          text: 'Máy bay bay ngang với tốc độ không đổi thì các lực cân bằng từng đôi: lực nâng cân bằng với trọng lực, lực đẩy của động cơ cân bằng với lực cản. Khi cất cánh, đầu máy bay ngẩng lên làm lực nâng tăng; khi hạ cánh, đầu chúc nhẹ xuống làm lực nâng giảm.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Lực đẩy Archimedes',
          text: 'Vật đứng yên trong chất lưu cũng được chất lưu nâng đỡ bằng lực đẩy Archimedes: $F_A = \\rho g V$, với $\\rho$ là khối lượng riêng của chất lưu, $V$ là thể tích phần chất lưu bị vật chiếm chỗ. Khinh khí cầu và tàu thuyền nổi được nhờ lực này.',
        },
      ],
    },
  ],
  explore: {
    title: 'Ống khí động ảo',
    instruction:
      'Đổi hình dạng vật và tốc độ gió, so sánh độ dài mũi tên lực cản. Với cánh máy bay, tăng góc ngẩng để xem lực nâng đổi thế nào. Số đo trong ống là từ một mô hình minh hoạ, dùng để so sánh các trường hợp.',
  },
  examples: [
    {
      problem:
        'Một máy bay khối lượng $500$ tấn bay ngang với tốc độ không đổi. Tính độ lớn lực nâng của không khí lên máy bay. Lấy $g = 9{,}8$ m/s².',
      steps: [
        'Máy bay chuyển động thẳng đều nên theo phương thẳng đứng, lực nâng cân bằng với trọng lực.',
        'Đổi đơn vị: $m = 500$ tấn $= 5 \\cdot 10^5$ kg.',
        '$F_n = P = mg = 5 \\cdot 10^5 \\cdot 9{,}8 = 4{,}9 \\cdot 10^6$ N.',
      ],
      answer: 'Lực nâng có độ lớn $4{,}9 \\cdot 10^6$ N.',
    },
    {
      problem:
        'Một người nhảy dù cùng dù có tổng khối lượng $80$ kg đang rơi đều với tốc độ giới hạn. Tính độ lớn lực cản của không khí. Lấy $g = 9{,}8$ m/s².',
      steps: [
        'Rơi đều nên hợp lực bằng $0$; bỏ qua lực đẩy của không khí, lực cản cân bằng với trọng lực.',
        '$F_c = P = mg = 80 \\cdot 9{,}8 = 784$ N.',
      ],
      answer: '$F_c = 784$ N, hướng lên.',
    },
    {
      problem:
        'Một vật có thể tích $0{,}002$ m³ chìm hoàn toàn trong nước, khối lượng riêng của nước $1\\,000$ kg/m³. Tính lực đẩy Archimedes. Lấy $g = 9{,}8$ m/s².',
      steps: ['$F_A = \\rho g V = 1\\,000 \\cdot 9{,}8 \\cdot 0{,}002 = 19{,}6$ N.'],
      answer: '$F_A = 19{,}6$ N.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Chất lưu gồm những chất nào?',
      options: [
        'Chất lỏng và chất rắn.',
        'Chất lỏng và chất khí.',
        'Chỉ có chất lỏng.',
        'Chỉ có chất khí.',
      ],
      answer: 1,
      hints: ['Những chất có thể chảy được.'],
      solution: 'Chất lưu là tên gọi chung của chất lỏng và chất khí.',
    },
    {
      type: 'choice',
      prompt: 'Lực cản của chất lưu tác dụng lên vật đang chuyển động có hướng',
      options: [
        'cùng hướng chuyển động.',
        'ngược hướng chuyển động.',
        'vuông góc với chuyển động.',
        'luôn thẳng đứng hướng lên.',
      ],
      answer: 1,
      hints: ['Lực này làm vật nhanh lên hay chậm đi?'],
      solution: 'Lực cản ngược hướng chuyển động và làm chậm chuyển động đó.',
    },
    {
      type: 'multi',
      prompt:
        'Lực cản của không khí lên một ô tô phụ thuộc vào những yếu tố nào được nêu dưới đây?',
      options: ['Tốc độ của ô tô.', 'Hình dạng của ô tô.', 'Màu sơn của ô tô.'],
      answers: [0, 1],
      hints: ['Hình dung cùng một chiếc xe chạy chậm rồi chạy nhanh.'],
      solution: 'Lực cản phụ thuộc vào tốc độ và hình dạng; màu sơn không có ảnh hưởng.',
    },
    {
      type: 'choice',
      prompt: 'Vì sao tàu ngầm và cá thường có phần đầu thon?',
      options: [
        'Để lực nâng của nước lớn hơn.',
        'Để giảm lực cản của nước.',
        'Để khối lượng nhỏ hơn.',
        'Để tăng lực đẩy Archimedes.',
      ],
      answer: 1,
      hints: ['Đây là hình dạng khí động học.'],
      solution:
        'Phần đầu thon làm dòng nước chảy bám theo thân, giảm đáng kể lực cản nên vật chuyển động dễ dàng hơn.',
    },
    {
      type: 'number',
      prompt:
        'Một máy bay khối lượng $200$ tấn bay ngang với tốc độ không đổi. Tính độ lớn lực nâng, theo đơn vị MN. Lấy $g = 9{,}8$ m/s².',
      answer: 1.96,
      tolerance: 0.005,
      unit: 'MN',
      hints: [
        'Theo phương thẳng đứng, máy bay chịu hai lực cân bằng nhau.',
        'Đổi $1$ tấn $= 1\\,000$ kg và $1$ MN $= 10^6$ N.',
      ],
      solution: '$F_n = mg = 2 \\cdot 10^5 \\cdot 9{,}8 = 1{,}96 \\cdot 10^6$ N $= 1{,}96$ MN.',
    },
    {
      type: 'number',
      prompt:
        'Một khinh khí cầu có tổng khối lượng $300$ kg lơ lửng đứng yên trên không. Tính độ lớn lực nâng của không khí. Lấy $g = 9{,}8$ m/s².',
      answer: 2940,
      unit: 'N',
      hints: ['Đứng yên thì hợp lực bằng bao nhiêu?'],
      solution: 'Lực nâng cân bằng với trọng lực: $F = mg = 300 \\cdot 9{,}8 = 2\\,940$ N.',
    },
    {
      type: 'number',
      prompt:
        'Một vật $0{,}5$ kg rơi trong dầu và đã đạt tốc độ giới hạn. Lực đẩy của dầu lên vật là $1{,}4$ N. Tính lực cản của dầu. Lấy $g = 9{,}8$ m/s².',
      answer: 3.5,
      tolerance: 0.01,
      unit: 'N',
      hints: [
        'Rơi đều: tổng lực hướng lên bằng trọng lực.',
        'Hai lực hướng lên là lực cản và lực đẩy.',
      ],
      solution: '$P = 0{,}5 \\cdot 9{,}8 = 4{,}9$ N. $F_c = P - F_A = 4{,}9 - 1{,}4 = 3{,}5$ N.',
    },
    {
      type: 'number',
      prompt:
        'Thả một vật có thể tích $5 \\cdot 10^{-4}$ m³ chìm hoàn toàn trong nước có khối lượng riêng $1\\,000$ kg/m³. Tính lực đẩy Archimedes. Lấy $g = 9{,}8$ m/s².',
      answer: 4.9,
      tolerance: 0.01,
      unit: 'N',
      hints: ['$F_A = \\rho g V$.'],
      solution: '$F_A = 1\\,000 \\cdot 9{,}8 \\cdot 5 \\cdot 10^{-4} = 4{,}9$ N.',
    },
    {
      type: 'choice',
      prompt: 'Một vật rơi trong không khí đạt tốc độ giới hạn khi',
      options: [
        'lực cản bằng $0$.',
        'trọng lực của vật bằng $0$.',
        'lực cản cân bằng với trọng lực, nên hợp lực bằng $0$.',
        'gia tốc của vật đạt lớn nhất.',
      ],
      answer: 2,
      hints: ['Vật chuyển động đều khi nào?'],
      solution:
        'Lực cản tăng theo tốc độ cho đến khi cân bằng với trọng lực; khi đó gia tốc bằng $0$ và vật rơi đều.',
    },
    {
      type: 'text',
      prompt:
        'Hình dạng có đầu thon, nhỏ, làm giảm lực cản của chất lưu gọi là hình dạng gì? (Trả lời bằng cụm từ.)',
      accept: ['khí động học', 'hình dạng khí động học', 'khi dong hoc'],
      hints: ['Cụm từ thường gắn với thiết kế máy bay và ô tô đua.'],
      solution: 'Đó là hình dạng khí động học.',
    },
  ],
  takeaways: [
    'Lực cản của chất lưu ngược hướng chuyển động, phụ thuộc vào hình dạng và tốc độ của vật.',
    'Hình dạng khí động học có đầu thon, nhỏ, làm giảm lực cản.',
    'Vật rơi trong chất lưu đạt tốc độ giới hạn khi hợp lực bằng $0$, sau đó rơi đều.',
    'Lực nâng vuông góc với hướng chuyển động; khi vật bay ngang đều, lực nâng cân bằng với trọng lực.',
  ],
};
