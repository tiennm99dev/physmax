/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Các bước giải bài toán động lực học: phân tích lực, chọn hệ trục, viết định luật 2 Newton theo từng trục, giải hệ phương trình; áp dụng cho vật trên mặt ngang, mặt phẳng nghiêng và hệ vật.',
  intro:
    'Một thùng hàng bị kéo trên sàn, một quyển sách trượt trên mặt bàn nghiêng hay một ô tô hãm phanh: các tình huống rất khác nhau nhưng đều giải được theo cùng một trình tự. Nắm được trình tự đó, ta sẽ không bỏ sót lực và không nhầm dấu.',
  objectives: [
    'Thực hiện được các bước giải bài toán động lực học: vẽ lực, chọn trục, viết phương trình, giải.',
    'Tìm được gia tốc khi biết các lực, tìm được lực khi biết gia tốc.',
    'Giải được bài toán chuyển động trên mặt phẳng ngang và mặt phẳng nghiêng có ma sát.',
  ],
  sections: [
    {
      heading: 'Các bước giải',
      blocks: [
        {
          type: 'list',
          ordered: true,
          items: [
            'Chọn vật cần khảo sát. Biểu diễn tất cả các lực tác dụng lên vật, với điểm đặt, phương và chiều của từng lực.',
            'Chọn hệ trục vuông góc: $Ox$ cùng hướng chuyển động (nếu vật đứng yên, lấy theo hướng lực kéo), $Oy$ vuông góc với $Ox$.',
            'Chiếu các lực lên hai trục rồi viết định luật 2 Newton: theo $Ox$: $\\sum F_x = ma_x$ (1); theo $Oy$: $\\sum F_y = 0$ (2).',
            'Giải hệ (1), (2) để tìm đại lượng cần tìm. Kiểm tra lại đơn vị và ý nghĩa của kết quả.',
          ],
        },
        {
          type: 'p',
          text: 'Bài toán thường gặp thuộc hai dạng: biết các lực, tìm gia tốc rồi suy ra chuyển động; hoặc biết chuyển động (gia tốc), tìm lực. Cầu nối giữa lực và chuyển động chính là gia tốc.',
        },
      ],
    },
    {
      heading: 'Hai tình huống quan trọng',
      blocks: [
        {
          type: 'table',
          head: ['Tình huống', 'Theo $Oy$', 'Theo $Ox$'],
          rows: [
            [
              'Mặt ngang, lực kéo $F$ chếch lên góc $\\alpha$',
              '$N = mg - F\\sin\\alpha$',
              '$F\\cos\\alpha - \\mu N = ma$',
            ],
            [
              'Vật trượt xuống mặt phẳng nghiêng góc $\\alpha$',
              '$N = mg\\cos\\alpha$',
              '$mg\\sin\\alpha - \\mu N = ma$',
            ],
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Lỗi thường gặp',
          text: 'Áp lực $N$ không phải lúc nào cũng bằng $mg$: hãy luôn tìm $N$ từ phương trình theo $Oy$. Chỉ vẽ các lực tác dụng lên vật đang xét; thành phần $P\\sin\\alpha$ là một phần của trọng lực, không phải thêm một lực mới.',
        },
      ],
    },
  ],
  explore: {
    title: 'Giải bài toán theo từng bước',
    instruction:
      'Chọn một bài toán và đi qua năm bước: chọn đủ các lực, chọn trục, chọn phương trình đúng, tính gia tốc, rồi chạy mô phỏng. Làm sai ở bước nào, trang sẽ giải thích lỗi đó trước khi cho đi tiếp.',
  },
  examples: [
    {
      problem:
        'Đẩy một cái thùng $55$ kg theo phương ngang với lực $220$ N, hệ số ma sát trượt giữa thùng và sàn là $0{,}35$. Tính gia tốc của thùng. Lấy $g = 9{,}8$ m/s².',
      steps: [
        'Các lực: trọng lực $\\vec{P}$, phản lực $\\vec{N}$, lực đẩy $\\vec{F}$, lực ma sát trượt $\\vec{F}_{mst}$.',
        'Chọn $Ox$ theo chiều chuyển động, $Oy$ thẳng đứng hướng lên.',
        'Theo $Oy$: $N = P = 55 \\cdot 9{,}8 = 539$ N, nên $F_{mst} = 0{,}35 \\cdot 539 = 188{,}65$ N.',
        'Theo $Ox$: $F - F_{mst} = ma$, nên $a = \\dfrac{220 - 188{,}65}{55} = 0{,}57$ m/s².',
      ],
      answer: '$a = 0{,}57$ m/s².',
    },
    {
      problem:
        'Một quyển sách được thả trượt từ trạng thái nghỉ trên mặt bàn nghiêng góc $30^\\circ$, hệ số ma sát trượt $0{,}3$. Tính gia tốc của sách và tốc độ của sách sau $2$ s. Lấy $g = 9{,}8$ m/s².',
      steps: [
        'Các lực: trọng lực, phản lực, lực ma sát trượt. Chọn $Ox$ dọc mặt nghiêng hướng xuống, $Oy$ vuông góc với mặt nghiêng.',
        'Theo $Oy$: $N = mg\\cos 30^\\circ$.',
        'Theo $Ox$: $mg\\sin 30^\\circ - \\mu mg\\cos 30^\\circ = ma$. Khối lượng $m$ giản ước được.',
        '$a = 9{,}8(0{,}5 - 0{,}3 \\cdot 0{,}866) \\approx 2{,}35$ m/s².',
        '$v = at = 2{,}35 \\cdot 2 = 4{,}7$ m/s.',
      ],
      answer: '$a \\approx 2{,}35$ m/s²; $v \\approx 4{,}7$ m/s.',
    },
    {
      problem:
        'Một học sinh kéo thùng sách $10$ kg trên sàn ngang bằng dây chếch lên $30^\\circ$, hệ số ma sát trượt $0{,}2$. Tính lực kéo để thùng chuyển động thẳng đều. Lấy $g = 9{,}8$ m/s².',
      steps: [
        'Chuyển động thẳng đều nên $a = 0$.',
        'Theo $Oy$: $N + F\\sin 30^\\circ = mg$, nên $N = 98 - 0{,}5F$.',
        'Theo $Ox$: $F\\cos 30^\\circ = \\mu N = 0{,}2(98 - 0{,}5F)$.',
        '$F(0{,}866 + 0{,}1) = 19{,}6$, suy ra $F \\approx 20{,}3$ N.',
      ],
      answer: '$F \\approx 20{,}3$ N.',
    },
    {
      problem:
        'Hai vật $m_1 = 5$ kg và $m_2 = 10$ kg nối với nhau bằng dây nhẹ trên sàn ngang. Kéo vật $m_2$ bằng lực ngang $F = 45$ N, hệ số ma sát trượt với mỗi vật là $0{,}1$. Tính gia tốc và lực căng dây. Lấy $g = 9{,}8$ m/s².',
      steps: [
        'Hai vật có cùng gia tốc vì dây không dãn; lực căng $T$ có cùng độ lớn ở hai đầu dây.',
        'Vật 1: $T - \\mu m_1 g = m_1 a$. Vật 2: $F - T - \\mu m_2 g = m_2 a$.',
        'Cộng hai phương trình: $F - \\mu(m_1 + m_2)g = (m_1 + m_2)a$, nên $a = \\dfrac{45 - 14{,}7}{15} = 2{,}02$ m/s².',
        '$T = m_1(a + \\mu g) = 5(2{,}02 + 0{,}98) = 15$ N.',
      ],
      answer: '$a = 2{,}02$ m/s²; $T = 15$ N.',
    },
  ],
  practice: [
    {
      type: 'order',
      prompt: 'Sắp xếp các bước giải bài toán động lực học theo đúng thứ tự.',
      items: [
        'Giải hệ phương trình, kiểm tra kết quả.',
        'Chọn vật, biểu diễn các lực tác dụng lên vật.',
        'Viết định luật 2 Newton theo từng trục.',
        'Chọn hệ trục $Ox$, $Oy$.',
      ],
      answer: [1, 3, 2, 0],
      hints: ['Phải biết có những lực nào rồi mới chiếu được lên trục.'],
      solution: 'Thứ tự: vẽ lực, chọn trục, viết phương trình theo từng trục, giải và kiểm tra.',
    },
    {
      type: 'number',
      prompt:
        'Đẩy một vật $40$ kg trên sàn ngang bằng lực ngang $200$ N, hệ số ma sát trượt $0{,}25$. Tính gia tốc của vật. Lấy $g = 9{,}8$ m/s².',
      answer: 2.55,
      tolerance: 0.01,
      unit: 'm/s²',
      hints: [
        'Tìm $N$ từ phương trình theo $Oy$.',
        '$F_{mst} = \\mu N$, rồi dùng phương trình theo $Ox$.',
      ],
      solution:
        '$N = 40 \\cdot 9{,}8 = 392$ N, $F_{mst} = 98$ N, $a = \\dfrac{200 - 98}{40} = 2{,}55$ m/s².',
    },
    {
      type: 'number',
      prompt:
        'Một vật $100$ kg bắt đầu chuyển động nhanh dần đều, đi được $10$ m thì đạt tốc độ $25{,}2$ km/h. Bỏ qua ma sát, tính lực kéo.',
      answer: 245,
      tolerance: 0.5,
      unit: 'N',
      hints: ['Đổi tốc độ về m/s.', 'Từ $v^2 = 2as$ tìm $a$, rồi $F = ma$.'],
      solution:
        '$v = 7$ m/s. $a = \\dfrac{v^2}{2s} = \\dfrac{49}{20} = 2{,}45$ m/s². $F = ma = 100 \\cdot 2{,}45 = 245$ N.',
    },
    {
      type: 'number',
      prompt:
        'Một ô tô $2$ tấn đang chạy với tốc độ $20$ m/s thì hãm phanh, dừng lại sau $5$ s. Tính độ lớn lực hãm.',
      answer: 8000,
      tolerance: 1,
      unit: 'N',
      hints: ['Tính độ lớn gia tốc: $a = \\dfrac{\\Delta v}{\\Delta t}$.'],
      solution: '$a = \\dfrac{20}{5} = 4$ m/s². $F = ma = 2\\,000 \\cdot 4 = 8\\,000$ N.',
    },
    {
      type: 'number',
      prompt:
        'Một vật trượt xuống mặt phẳng nghiêng $30^\\circ$ không ma sát. Tính gia tốc của vật. Lấy $g = 9{,}8$ m/s².',
      answer: 4.9,
      tolerance: 0.01,
      unit: 'm/s²',
      hints: ['Chỉ còn thành phần $P\\sin\\alpha$ theo $Ox$.'],
      solution: '$a = g\\sin 30^\\circ = 9{,}8 \\cdot 0{,}5 = 4{,}9$ m/s².',
    },
    {
      type: 'number',
      prompt:
        'Một vật trượt xuống mặt phẳng nghiêng $30^\\circ$, hệ số ma sát trượt $0{,}2$. Tính gia tốc của vật. Lấy $g = 9{,}8$ m/s².',
      answer: 3.2,
      tolerance: 0.02,
      unit: 'm/s²',
      hints: ['$a = g(\\sin\\alpha - \\mu\\cos\\alpha)$.'],
      solution: '$a = 9{,}8(0{,}5 - 0{,}2 \\cdot 0{,}866) \\approx 3{,}20$ m/s².',
    },
    {
      type: 'number',
      prompt:
        'Kéo một vật $20$ kg trên sàn ngang bằng dây chếch lên $60^\\circ$, hệ số ma sát trượt $0{,}1$. Tính lực kéo để vật chuyển động thẳng đều. Lấy $g = 9{,}8$ m/s².',
      answer: 33.4,
      tolerance: 0.1,
      unit: 'N',
      hints: [
        'Với chuyển động đều, $a = 0$.',
        'Viết $N = mg - F\\sin 60^\\circ$, rồi $F\\cos 60^\\circ = \\mu N$.',
      ],
      solution:
        '$F\\cos 60^\\circ = 0{,}1(196 - F\\sin 60^\\circ)$, nên $F(0{,}5 + 0{,}0866) = 19{,}6$ và $F \\approx 33{,}4$ N.',
    },
    {
      type: 'number',
      prompt:
        'Dây kéo vật $5$ kg đi lên với lực căng $60$ N. Tính gia tốc của vật. Lấy $g = 9{,}8$ m/s².',
      answer: 2.2,
      tolerance: 0.01,
      unit: 'm/s²',
      hints: ['Chọn chiều dương hướng lên.'],
      solution: '$T - mg = ma$, nên $a = \\dfrac{60 - 49}{5} = 2{,}2$ m/s².',
    },
    {
      type: 'number',
      prompt:
        'Hai vật $m_1 = 2$ kg và $m_2 = 3$ kg nối bằng dây nhẹ trên mặt ngang không ma sát. Kéo vật $m_2$ bằng lực ngang $20$ N. Tính lực căng dây nối.',
      answer: 8,
      tolerance: 0.01,
      unit: 'N',
      hints: [
        'Tính gia tốc chung của hệ.',
        'Lực căng là lực duy nhất kéo vật $m_1$ theo phương ngang.',
      ],
      solution: '$a = \\dfrac{20}{2 + 3} = 4$ m/s². $T = m_1 a = 2 \\cdot 4 = 8$ N.',
    },
    {
      type: 'number',
      prompt:
        'Đẩy nhẹ một vật trên mặt phẳng nghiêng $30^\\circ$ cho vật bắt đầu đi xuống, sau đó vật trượt xuống thẳng đều. Tính hệ số ma sát trượt.',
      answer: 0.577,
      tolerance: 0.005,
      hints: [
        'Đi xuống đều nên $a = 0$.',
        'Từ $\\sin\\alpha - \\mu\\cos\\alpha = 0$ suy ra $\\mu$ theo $\\alpha$.',
      ],
      solution: '$\\mu = \\tan 30^\\circ \\approx 0{,}577$.',
    },
    {
      type: 'multi',
      prompt:
        'Một vật đang trượt xuống mặt phẳng nghiêng có ma sát. Những lực nào tác dụng lên vật?',
      options: [
        'Trọng lực.',
        'Phản lực của mặt phẳng nghiêng.',
        'Lực ma sát trượt.',
        'Lực trượt riêng kéo vật xuống, ngoài trọng lực.',
      ],
      answers: [0, 1, 2],
      hints: ['Mỗi lực phải có một vật khác tác dụng lên vật đang xét.'],
      solution:
        'Ba lực là trọng lực, phản lực và ma sát. Thành phần $P\\sin\\alpha$ chỉ là một phần của trọng lực.',
    },
    {
      type: 'choice',
      prompt:
        'Kéo vật trên sàn ngang bằng lực chếch lên góc $\\alpha$ ($0 < \\alpha < 90^\\circ$). Áp lực của vật lên sàn',
      options: [
        'bằng $mg$.',
        'lớn hơn $mg$.',
        'bằng $mg - F\\sin\\alpha$.',
        'bằng $F\\cos\\alpha$.',
      ],
      answer: 2,
      hints: ['Chiếu các lực lên $Oy$.'],
      solution:
        'Theo $Oy$: $N + F\\sin\\alpha - mg = 0$, nên $N = mg - F\\sin\\alpha$; áp lực có cùng độ lớn.',
    },
  ],
  takeaways: [
    'Bốn bước: vẽ lực, chọn trục, viết định luật 2 Newton theo từng trục, giải và kiểm tra.',
    'Chọn $Ox$ theo hướng chuyển động, nên theo $Oy$ thường có $\\sum F_y = 0$.',
    'Luôn tìm $N$ từ phương trình theo $Oy$ rồi mới tính $F_{mst} = \\mu N$.',
    'Mặt phẳng nghiêng: $a = g(\\sin\\alpha - \\mu\\cos\\alpha)$ khi vật trượt xuống.',
  ],
};
