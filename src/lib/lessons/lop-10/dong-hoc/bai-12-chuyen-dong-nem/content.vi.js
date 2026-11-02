/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Phân tích chuyển động ném ngang và ném xiên thành hai chuyển động thành phần vuông góc, tính thời gian rơi, tầm cao và tầm xa khi bỏ qua lực cản không khí.',
  intro:
    'Quả bóng được đá lên, viên đạn pháo được bắn đi đều vạch một đường cong trên không trung. Đường cong đó trông phức tạp, nhưng chỉ cần tách thành hai chuyển động đơn giản đã học, ta tính được bóng bay bao lâu, cao bao nhiêu và xa bao nhiêu.',
  objectives: [
    'Phân tích được chuyển động ném thành hai chuyển động thành phần theo phương ngang và phương thẳng đứng.',
    'Viết được công thức tính thời gian rơi và tầm xa của chuyển động ném ngang.',
    'Viết được công thức tính tầm cao, tầm xa của chuyển động ném xiên.',
    'Giải thích được vì sao tầm xa lớn nhất khi ném xiên với góc $45^\\circ$.',
  ],
  sections: [
    {
      heading: 'Chuyển động ném ngang',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Chuyển động ném ngang',
          text: 'Chuyển động ném ngang là chuyển động của vật có vận tốc đầu $\\vec{v_0}$ theo phương nằm ngang và chỉ chịu tác dụng của trọng lực.',
        },
        {
          type: 'p',
          text: 'Thí nghiệm: búa gõ vào thanh thép, bi $A$ bị đẩy đi theo phương ngang, còn bi $B$ rơi tự do từ cùng độ cao. Hai bi luôn ở cùng một độ cao và chạm đất cùng lúc. Theo phương ngang không có lực tác dụng nên bi $A$ chuyển động đều; theo phương thẳng đứng bi $A$ rơi tự do.',
        },
        {
          type: 'table',
          caption: 'Hai chuyển động thành phần của vật ném ngang từ độ cao $H$',
          head: ['Phương', 'Tính chất', 'Công thức'],
          rows: [
            ['Ngang', 'Thẳng đều', '$d_x = v_0t$; $v_x = v_0$'],
            ['Thẳng đứng', 'Rơi tự do', '$d_y = \\dfrac{1}{2}gt^2$; $v_y = gt$'],
          ],
        },
        {
          type: 'p',
          text: 'Khi chạm đất $d_y = H$, nên thời gian chuyển động và tầm xa $L$ (giá trị lớn nhất của $d_x$) là:',
        },
        {
          type: 'tex',
          tex: 't = \\sqrt{\\dfrac{2H}{g}}, \\qquad L = v_0t = v_0\\sqrt{\\dfrac{2H}{g}}',
        },
        {
          type: 'p',
          text: 'Thời gian rơi chỉ phụ thuộc $H$, không phụ thuộc $v_0$. Tầm xa phụ thuộc cả $H$ và $v_0$. Quỹ đạo có dạng một nhánh parabol.',
        },
      ],
    },
    {
      heading: 'Chuyển động ném xiên',
      blocks: [
        {
          type: 'p',
          text: 'Vật được ném từ mặt đất với vận tốc đầu $\\vec{v_0}$ hợp với phương ngang góc $\\alpha$ (góc ném). Phân tích $\\vec{v_0}$ thành hai thành phần:',
        },
        { type: 'tex', tex: 'v_{0x} = v_0\\cos\\alpha, \\qquad v_{0y} = v_0\\sin\\alpha' },
        {
          type: 'table',
          caption: 'Hai chuyển động thành phần của vật ném xiên',
          head: ['Phương', 'Tính chất', 'Công thức'],
          rows: [
            ['Ngang', 'Thẳng đều', '$v_x = v_0\\cos\\alpha$; $d_x = v_0\\cos\\alpha \\cdot t$'],
            [
              'Thẳng đứng (chiều dương hướng lên)',
              'Biến đổi đều, gia tốc $-g$',
              '$v_y = v_0\\sin\\alpha - gt$; $d_y = v_0\\sin\\alpha \\cdot t - \\dfrac{1}{2}gt^2$',
            ],
          ],
        },
        {
          type: 'p',
          text: 'Ở điểm cao nhất $v_y = 0$, nên vật lên đến đó sau $\\dfrac{v_0\\sin\\alpha}{g}$; thời gian bay gấp đôi khoảng này. Từ đó suy ra tầm cao $H$ và tầm xa $L$:',
        },
        {
          type: 'tex',
          tex: 'H = \\dfrac{v_0^2\\sin^2\\alpha}{2g}, \\qquad L = \\dfrac{v_0^2\\sin 2\\alpha}{g}',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Góc ném cho tầm xa lớn nhất',
          text: 'Với cùng $v_0$, $\\sin 2\\alpha$ lớn nhất khi $\\alpha = 45^\\circ$, nên tầm xa lớn nhất là $L_{max} = \\dfrac{v_0^2}{g}$. Hai góc phụ nhau như $30^\\circ$ và $60^\\circ$ cho cùng một tầm xa, nhưng góc lớn hơn bay cao hơn.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Điều kiện áp dụng',
          text: 'Các công thức trên bỏ qua lực cản không khí. Thực tế, lực cản làm tầm xa giảm, nhất là với vật nhẹ như quả bóng bay nhanh.',
        },
      ],
    },
  ],
  explore: {
    title: 'Súng bắn bóng ảo',
    instruction:
      'Chọn kiểu ném, chỉnh $v_0$ và góc hoặc độ cao, nhấn "Ném" và kéo thanh thời gian để xem $v_x$, $v_y$. Trong ném ngang, so sánh bóng với vật thả rơi tự do màu cam. Tính trước để bóng rơi trúng bia.',
  },
  examples: [
    {
      problem:
        'Từ đỉnh tháp cao $45$ m, một vật được ném ngang với vận tốc $20$ m/s. Bỏ qua lực cản, lấy $g = 10$ m/s². Tính thời gian rơi, tầm xa và tốc độ của vật lúc chạm đất.',
      steps: [
        'Thời gian rơi: $t = \\sqrt{\\dfrac{2H}{g}} = \\sqrt{\\dfrac{2 \\cdot 45}{10}} = 3$ s.',
        'Tầm xa: $L = v_0t = 20 \\cdot 3 = 60$ m.',
        'Lúc chạm đất: $v_x = 20$ m/s, $v_y = gt = 30$ m/s.',
        'Tốc độ: $v = \\sqrt{v_x^2 + v_y^2} = \\sqrt{20^2 + 30^2} \\approx 36{,}1$ m/s.',
      ],
      answer: '$t = 3$ s, $L = 60$ m, $v \\approx 36{,}1$ m/s.',
    },
    {
      problem:
        'Một quả bóng được đá từ mặt đất với vận tốc $20$ m/s, góc ném $30^\\circ$. Bỏ qua lực cản, lấy $g = 9{,}8$ m/s². Tính tầm cao, tầm xa và thời gian bay.',
      steps: [
        'Tầm cao: $H = \\dfrac{v_0^2\\sin^2\\alpha}{2g} = \\dfrac{20^2 \\cdot 0{,}5^2}{2 \\cdot 9{,}8} \\approx 5{,}1$ m.',
        'Tầm xa: $L = \\dfrac{v_0^2\\sin 2\\alpha}{g} = \\dfrac{20^2 \\cdot \\sin 60^\\circ}{9{,}8} \\approx 35{,}3$ m.',
        'Thời gian bay: $t = \\dfrac{2v_0\\sin\\alpha}{g} = \\dfrac{2 \\cdot 20 \\cdot 0{,}5}{9{,}8} \\approx 2{,}04$ s.',
      ],
      answer: '$H \\approx 5{,}1$ m, $L \\approx 35{,}3$ m, $t \\approx 2{,}04$ s.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Thời gian rơi của vật ném ngang phụ thuộc vào yếu tố nào?',
      options: [
        'Chỉ độ cao ném $H$.',
        'Chỉ vận tốc đầu $v_0$.',
        'Cả $H$ và $v_0$.',
        'Khối lượng của vật.',
      ],
      answer: 0,
      hints: ['Theo phương thẳng đứng, vật ném ngang chuyển động thế nào?'],
      solution:
        'Theo phương thẳng đứng vật rơi tự do: $t = \\sqrt{\\dfrac{2H}{g}}$, không chứa $v_0$.',
    },
    {
      type: 'number',
      prompt: 'Một vật được ném ngang từ độ cao $20$ m, lấy $g = 10$ m/s². Tính thời gian rơi.',
      answer: 2,
      tolerance: 0.001,
      unit: 's',
      hints: ['Dùng $t = \\sqrt{\\dfrac{2H}{g}}$.'],
      solution: '$t = \\sqrt{\\dfrac{2 \\cdot 20}{10}} = 2$ s.',
    },
    {
      type: 'number',
      prompt:
        'Một vật được ném ngang với vận tốc $15$ m/s từ độ cao $20$ m, lấy $g = 10$ m/s². Tính tầm xa.',
      answer: 30,
      tolerance: 0.01,
      unit: 'm',
      hints: ['Tìm thời gian rơi trước, rồi dùng $L = v_0t$.'],
      solution: '$t = 2$ s, nên $L = 15 \\cdot 2 = 30$ m.',
    },
    {
      type: 'number',
      prompt:
        'Một vật được ném ngang từ độ cao $4{,}9$ m, có tầm xa $5$ m. Lấy $g = 9{,}8$ m/s². Tính vận tốc ném.',
      answer: 5,
      tolerance: 0.01,
      unit: 'm/s',
      hints: ['Tính thời gian rơi, sau đó $v_0 = \\dfrac{L}{t}$.'],
      solution:
        '$t = \\sqrt{\\dfrac{2 \\cdot 4{,}9}{9{,}8}} = 1$ s, nên $v_0 = \\dfrac{5}{1} = 5$ m/s.',
    },
    {
      type: 'number',
      prompt:
        'Vật được ném xiên từ mặt đất với $v_0 = 30$ m/s, góc ném $30^\\circ$. Lấy $g = 10$ m/s². Tính tầm cao.',
      answer: 11.25,
      tolerance: 0.01,
      unit: 'm',
      hints: ['Dùng $H = \\dfrac{v_0^2\\sin^2\\alpha}{2g}$ với $\\sin 30^\\circ = 0{,}5$.'],
      solution: '$H = \\dfrac{30^2 \\cdot 0{,}5^2}{2 \\cdot 10} = \\dfrac{225}{20} = 11{,}25$ m.',
    },
    {
      type: 'number',
      prompt:
        'Vật được ném xiên từ mặt đất với $v_0 = 14$ m/s, góc ném $45^\\circ$. Lấy $g = 9{,}8$ m/s². Tính tầm xa.',
      answer: 20,
      tolerance: 0.01,
      unit: 'm',
      hints: ['$\\sin 2\\alpha = \\sin 90^\\circ = 1$.'],
      solution: '$L = \\dfrac{14^2 \\cdot 1}{9{,}8} = \\dfrac{196}{9{,}8} = 20$ m.',
    },
    {
      type: 'choice',
      prompt: 'Với cùng vận tốc đầu, ném xiên từ mặt đất ở góc nào thì tầm xa lớn nhất?',
      options: ['$30^\\circ$', '$45^\\circ$', '$60^\\circ$', '$90^\\circ$'],
      answer: 1,
      hints: ['Khi nào $\\sin 2\\alpha$ đạt giá trị lớn nhất?'],
      solution:
        '$\\sin 2\\alpha$ lớn nhất bằng $1$ khi $2\\alpha = 90^\\circ$, tức $\\alpha = 45^\\circ$.',
    },
    {
      type: 'multi',
      prompt: 'Tại điểm cao nhất của quỹ đạo ném xiên (bỏ qua lực cản), những phát biểu nào đúng?',
      options: [
        'Thành phần vận tốc thẳng đứng bằng $0$.',
        'Vận tốc của vật bằng $0$.',
        'Thành phần vận tốc ngang bằng $v_0\\cos\\alpha$.',
        'Gia tốc của vật vẫn là $g$, hướng xuống.',
      ],
      answers: [0, 2, 3],
      hints: ['Thành phần ngang có thay đổi trong khi bay không?'],
      solution:
        'Ở điểm cao nhất $v_y = 0$ nhưng $v_x = v_0\\cos\\alpha$ vẫn giữ nguyên, nên vận tốc khác $0$. Vật vẫn chỉ chịu trọng lực nên gia tốc là $g$ hướng xuống.',
    },
    {
      type: 'choice',
      prompt:
        'Hai vật được ném xiên từ mặt đất với cùng $v_0$, góc ném lần lượt $30^\\circ$ và $60^\\circ$. Kết luận nào đúng?',
      options: [
        'Vật ném góc $60^\\circ$ có tầm xa gấp đôi.',
        'Hai vật có cùng tầm xa, vật ném góc $60^\\circ$ bay cao hơn.',
        'Hai vật có cùng tầm cao.',
        'Vật ném góc $30^\\circ$ bay lâu hơn.',
      ],
      answer: 1,
      hints: ['So sánh $\\sin 60^\\circ$ và $\\sin 120^\\circ$.'],
      solution:
        '$\\sin 60^\\circ = \\sin 120^\\circ$ nên $L$ bằng nhau. Góc $60^\\circ$ có $\\sin\\alpha$ lớn hơn nên $H$ và thời gian bay đều lớn hơn.',
    },
  ],
  takeaways: [
    'Chuyển động ném được phân tích thành chuyển động thẳng đều theo phương ngang và chuyển động do trọng lực theo phương thẳng đứng.',
    'Ném ngang: $t = \\sqrt{\\dfrac{2H}{g}}$, $L = v_0\\sqrt{\\dfrac{2H}{g}}$; thời gian rơi không phụ thuộc $v_0$.',
    'Ném xiên: $H = \\dfrac{v_0^2\\sin^2\\alpha}{2g}$, $L = \\dfrac{v_0^2\\sin 2\\alpha}{g}$; tầm xa lớn nhất khi $\\alpha = 45^\\circ$.',
    'Quỹ đạo có dạng parabol khi bỏ qua lực cản không khí.',
  ],
};
