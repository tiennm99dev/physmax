/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Tổng hợp lực theo quy tắc hình bình hành, phân tích một lực thành hai lực thành phần vuông góc và điều kiện cân bằng của chất điểm: hợp lực bằng không.',
  intro:
    'Hai tàu lai cùng kéo một con tàu lớn bằng hai sợi cáp hợp với nhau một góc. Con tàu không đi theo cáp nào cả mà đi theo một hướng ở giữa. Vậy hai lực kéo đó tương đương với một lực duy nhất như thế nào?',
  objectives: [
    'Nêu được thế nào là tổng hợp lực và hợp lực.',
    'Vận dụng được quy tắc hình bình hành để tìm hợp lực của hai lực đồng quy.',
    'Nêu được điều kiện cân bằng của một vật chịu tác dụng của các lực đồng quy.',
    'Phân tích được một lực thành hai lực thành phần vuông góc và nêu rõ tác dụng của mỗi thành phần.',
  ],
  sections: [
    {
      heading: 'Tổng hợp lực',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Tổng hợp lực',
          text: 'Tổng hợp lực là thay thế các lực tác dụng đồng thời vào cùng một vật bằng một lực có tác dụng giống hệt các lực ấy. Lực thay thế này gọi là hợp lực.',
        },
        {
          type: 'table',
          caption: 'Hợp lực của hai lực cùng phương',
          head: ['Hai lực', 'Độ lớn hợp lực', 'Chiều của hợp lực'],
          rows: [
            ['Cùng phương, cùng chiều', '$F = F_1 + F_2$', 'Chiều của hai lực'],
            ['Cùng phương, ngược chiều', '$F = |F_1 - F_2|$', 'Chiều của lực lớn hơn'],
          ],
        },
      ],
    },
    {
      heading: 'Quy tắc hình bình hành',
      blocks: [
        {
          type: 'p',
          text: 'Thí nghiệm với các lực kế cho thấy: hợp lực của hai lực đồng quy không phải là tổng độ lớn của chúng, mà được xác định bằng một phép vẽ.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Quy tắc hình bình hành',
          text: 'Nếu hai lực đồng quy làm thành hai cạnh của một hình bình hành, thì đường chéo kẻ từ điểm đồng quy biểu diễn hợp lực của chúng: $\\vec{F} = \\vec{F_1} + \\vec{F_2}$.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Vẽ hai vectơ lực $\\vec{F_1}$, $\\vec{F_2}$ có chung gốc $O$.',
            'Vẽ hình bình hành có hai cạnh liền kề là hai vectơ đó.',
            'Vẽ đường chéo có gốc $O$: đó là vectơ hợp lực $\\vec{F}$.',
          ],
        },
        {
          type: 'p',
          text: 'Độ dài đường chéo cho biết độ lớn của hợp lực. Có thể đo trên hình vẽ theo tỉ lệ xích, hoặc tính bằng định lí côsin với $\\alpha$ là góc giữa hai lực:',
        },
        { type: 'tex', tex: 'F = \\sqrt{F_1^2 + F_2^2 + 2F_1F_2\\cos\\alpha}' },
        {
          type: 'p',
          text: 'Khi hai lực vuông góc ($\\alpha = 90^\\circ$), công thức trở thành $F = \\sqrt{F_1^2 + F_2^2}$. Góc $\\alpha$ càng lớn thì hợp lực càng nhỏ, nên luôn có $|F_1 - F_2| \\le F \\le F_1 + F_2$. Muốn tổng hợp nhiều lực, ta tổng hợp lần lượt từng cặp.',
        },
      ],
    },
    {
      heading: 'Cân bằng lực',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Các lực cân bằng',
          text: 'Các lực cân bằng là các lực khi tác dụng đồng thời vào một vật thì không gây ra gia tốc cho vật. Hai lực cân bằng là hai lực cùng tác dụng lên một vật, cùng độ lớn, cùng phương và ngược chiều.',
        },
        {
          type: 'p',
          text: 'Điều kiện cân bằng của một vật được coi là chất điểm: hợp lực của các lực tác dụng lên vật bằng không.',
        },
        { type: 'tex', tex: '\\vec{F} = \\vec{F_1} + \\vec{F_2} + \\dots + \\vec{F_n} = \\vec{0}' },
        {
          type: 'p',
          text: 'Với ba lực đồng quy cân bằng, hợp lực của hai lực bất kì phải cùng độ lớn và ngược chiều với lực thứ ba.',
        },
      ],
    },
    {
      heading: 'Phân tích lực',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Phân tích lực',
          text: 'Phân tích lực là thay thế một lực bằng hai hay nhiều lực thành phần có tác dụng giống hệt lực đó. Đây là phép làm ngược lại với tổng hợp lực, cũng theo quy tắc hình bình hành.',
        },
        {
          type: 'p',
          text: 'Một lực có thể phân tích theo vô số cặp phương, nên phải chọn phương cho phù hợp với bài toán. Thường ta phân tích theo hai phương vuông góc, vì khi đó mỗi lực thành phần không có tác dụng theo phương của thành phần kia. Lực $\\vec{F}$ hợp với trục $Ox$ góc $\\alpha$ có:',
        },
        { type: 'tex', tex: 'F_x = F\\cos\\alpha, \\qquad F_y = F\\sin\\alpha' },
        {
          type: 'p',
          text: 'Với vật trên mặt phẳng nghiêng góc $\\alpha$, trọng lực $\\vec{P}$ được phân tích thành $P_1 = P\\sin\\alpha$ theo mặt nghiêng, có tác dụng kéo vật trượt xuống, và $P_2 = P\\cos\\alpha$ vuông góc với mặt nghiêng, có tác dụng ép vật vào mặt nghiêng.',
        },
        { type: 'widget', name: 'incline' },
      ],
    },
  ],
  explore: {
    title: 'Hình bình hành lực',
    instruction:
      'Kéo đầu các mũi tên (hoặc chọn mũi tên rồi dùng phím mũi tên). Ở chế độ Cân bằng, hãy đặt $\\vec{F_3}$ để hợp lực của ba lực bằng $0$; ở chế độ Phân tích, xoay trục để thấy hai lực thành phần thay đổi.',
  },
  examples: [
    {
      problem:
        'Hai tàu lai kéo một tàu lớn bằng hai dây cáp hợp với nhau góc $30^\\circ$, lực kéo của mỗi dây là $8\\,000$ N. Tính độ lớn hợp lực của hai lực kéo.',
      steps: [
        'Áp dụng quy tắc hình bình hành với $F_1 = F_2 = 8\\,000$ N, $\\alpha = 30^\\circ$.',
        '$F = \\sqrt{8\\,000^2 + 8\\,000^2 + 2 \\cdot 8\\,000 \\cdot 8\\,000 \\cdot \\cos 30^\\circ}$.',
        '$F = 8\\,000\\sqrt{2 + \\sqrt{3}} \\approx 8\\,000 \\cdot 1{,}932 \\approx 15\\,455$ N.',
      ],
      answer: 'Hợp lực có độ lớn khoảng $15\\,455$ N, nhỏ hơn tổng hai lực ($16\\,000$ N).',
    },
    {
      problem:
        'Một chất điểm đứng yên dưới tác dụng của ba lực đồng quy. Biết $F_1 = 6$ N, $F_2 = 8$ N và hai lực này vuông góc với nhau. Tính $F_3$.',
      steps: [
        'Chất điểm cân bằng nên $\\vec{F_3}$ phải cùng độ lớn và ngược chiều với hợp lực của $\\vec{F_1}$ và $\\vec{F_2}$.',
        'Hai lực vuông góc nên hợp lực của chúng là $\\sqrt{6^2 + 8^2} = 10$ N.',
      ],
      answer:
        '$F_3 = 10$ N, ngược chiều với đường chéo của hình chữ nhật dựng trên $\\vec{F_1}$, $\\vec{F_2}$.',
    },
    {
      problem:
        'Một vật có trọng lực $P = 20$ N nằm trên mặt phẳng nghiêng góc $30^\\circ$. Phân tích trọng lực thành hai thành phần theo mặt nghiêng và vuông góc với mặt nghiêng.',
      steps: [
        'Thành phần song song với mặt nghiêng: $P_1 = P\\sin 30^\\circ = 20 \\cdot 0{,}5 = 10$ N, kéo vật trượt xuống.',
        'Thành phần vuông góc với mặt nghiêng: $P_2 = P\\cos 30^\\circ = 20 \\cdot \\dfrac{\\sqrt{3}}{2} \\approx 17{,}3$ N, ép vật vào mặt nghiêng.',
      ],
      answer: '$P_1 = 10$ N và $P_2 \\approx 17{,}3$ N.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt:
        'Hai lực đồng quy $F_1 = 6$ N và $F_2 = 8$ N vuông góc với nhau. Tính độ lớn hợp lực.',
      answer: 10,
      unit: 'N',
      hints: ['Hình bình hành lúc này là hình chữ nhật.', 'Dùng định lí Pythagore.'],
      solution: '$F = \\sqrt{6^2 + 8^2} = \\sqrt{100} = 10$ N.',
    },
    {
      type: 'number',
      prompt: 'Hai lực cùng phương, ngược chiều, có độ lớn $40$ N và $25$ N. Tính độ lớn hợp lực.',
      answer: 15,
      unit: 'N',
      hints: ['Hai lực ngược chiều thì hợp lực bằng hiệu độ lớn.'],
      solution: '$F = |F_1 - F_2| = 40 - 25 = 15$ N, cùng chiều với lực $40$ N.',
    },
    {
      type: 'number',
      prompt:
        'Hai lực cùng có độ lớn $30$ N, hợp với nhau một góc $120^\\circ$. Tính độ lớn hợp lực.',
      answer: 30,
      unit: 'N',
      hints: [
        'Dùng $F^2 = F_1^2 + F_2^2 + 2F_1F_2\\cos\\alpha$.',
        '$\\cos 120^\\circ = -\\dfrac{1}{2}$.',
      ],
      solution:
        '$F^2 = 30^2 + 30^2 + 2 \\cdot 30 \\cdot 30 \\cdot \\left(-\\dfrac{1}{2}\\right) = 900$, nên $F = 30$ N.',
    },
    {
      type: 'number',
      prompt:
        'Hai lực cùng có độ lớn $5$ N, hợp với nhau một góc $60^\\circ$. Tính độ lớn hợp lực (làm tròn đến hàng phần trăm).',
      answer: 8.66,
      tolerance: 0.01,
      unit: 'N',
      hints: ['$\\cos 60^\\circ = 0{,}5$.', 'Tính $F^2$ trước, rồi lấy căn bậc hai.'],
      solution:
        '$F^2 = 25 + 25 + 2 \\cdot 25 \\cdot 0{,}5 = 75$, nên $F = \\sqrt{75} \\approx 8{,}66$ N.',
    },
    {
      type: 'choice',
      prompt: 'Hợp lực của hai lực $9$ N và $12$ N có thể có độ lớn nào sau đây?',
      options: ['$2$ N', '$15$ N', '$25$ N', '$1$ N'],
      answer: 1,
      hints: ['Hợp lực luôn nằm giữa hiệu và tổng độ lớn của hai lực.'],
      solution:
        'Ta có $|12 - 9| \\le F \\le 12 + 9$, tức $3$ N $\\le F \\le 21$ N. Chỉ $15$ N thoả mãn.',
    },
    {
      type: 'number',
      prompt:
        'Một vật đứng yên dưới tác dụng của ba lực đồng quy. Hai lực $12$ N và $16$ N vuông góc với nhau. Tính độ lớn lực thứ ba.',
      answer: 20,
      unit: 'N',
      hints: [
        'Vật cân bằng nên lực thứ ba có độ lớn bằng hợp lực của hai lực kia.',
        'Hai lực kia vuông góc.',
      ],
      solution: '$F_3 = \\sqrt{12^2 + 16^2} = \\sqrt{400} = 20$ N.',
    },
    {
      type: 'number',
      prompt:
        'Lực $F = 100$ N hợp với phương ngang góc $60^\\circ$. Tính thành phần theo phương thẳng đứng của lực (làm tròn đến hàng phần mười).',
      answer: 86.6,
      tolerance: 0.1,
      unit: 'N',
      hints: [
        'Vẽ tam giác vuông có cạnh huyền là $F$.',
        'Thành phần đối diện góc $60^\\circ$ dùng sin.',
      ],
      solution: '$F_y = F\\sin 60^\\circ = 100 \\cdot \\dfrac{\\sqrt{3}}{2} \\approx 86{,}6$ N.',
    },
    {
      type: 'number',
      prompt:
        'Vật có trọng lực $50$ N nằm trên mặt phẳng nghiêng góc $30^\\circ$. Tính thành phần của trọng lực kéo vật trượt xuống dốc.',
      answer: 25,
      unit: 'N',
      hints: ['Thành phần song song với mặt nghiêng là $P_1 = P\\sin\\alpha$.'],
      solution: '$P_1 = 50 \\cdot \\sin 30^\\circ = 50 \\cdot 0{,}5 = 25$ N.',
    },
    {
      type: 'choice',
      prompt: 'Điều kiện để một chất điểm cân bằng là gì?',
      options: [
        'Tổng độ lớn các lực tác dụng lên nó bằng không.',
        'Hợp lực của các lực tác dụng lên nó bằng không.',
        'Nó chỉ chịu đúng hai lực.',
        'Các lực tác dụng lên nó có độ lớn bằng nhau.',
      ],
      answer: 1,
      hints: ['Lực là đại lượng vectơ, nên phải cộng theo quy tắc vectơ.'],
      solution:
        'Chất điểm cân bằng khi $\\vec{F_1} + \\vec{F_2} + \\dots + \\vec{F_n} = \\vec{0}$, tức là hợp lực bằng không.',
    },
    {
      type: 'multi',
      prompt: 'Chọn các phát biểu đúng.',
      options: [
        'Hợp lực có thể nhỏ hơn mỗi lực thành phần.',
        'Hợp lực luôn lớn hơn mỗi lực thành phần.',
        'Một lực có thể phân tích theo nhiều cặp phương khác nhau.',
        'Hai lực cân bằng đặt vào hai vật khác nhau.',
      ],
      answers: [0, 2],
      hints: [
        'Thử hai lực $10$ N ngược chiều: hợp lực bao nhiêu?',
        'Hai lực cân bằng phải làm cho một vật không có gia tốc.',
      ],
      solution:
        'Hai lực gần ngược chiều cho hợp lực rất nhỏ, nên phát biểu đầu đúng, phát biểu thứ hai sai. Một đường chéo thuộc vô số hình bình hành, nên phát biểu thứ ba đúng. Hai lực cân bằng phải cùng tác dụng lên một vật, nên phát biểu cuối sai.',
    },
  ],
  takeaways: [
    'Hợp lực của hai lực đồng quy là đường chéo hình bình hành: $F = \\sqrt{F_1^2 + F_2^2 + 2F_1F_2\\cos\\alpha}$.',
    'Chất điểm cân bằng khi hợp lực của các lực tác dụng lên nó bằng không.',
    'Phân tích lực là phép ngược của tổng hợp lực; thường phân tích theo hai phương vuông góc.',
    'Trên mặt phẳng nghiêng: $P_1 = P\\sin\\alpha$ kéo vật trượt, $P_2 = P\\cos\\alpha$ ép vật vào mặt nghiêng.',
  ],
};
