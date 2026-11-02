/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Biến dạng kéo và biến dạng nén, biến dạng đàn hồi và giới hạn đàn hồi; định luật Hooke: trong giới hạn đàn hồi, lực đàn hồi của lò xo tỉ lệ thuận với độ biến dạng, F = k|Δl|.',
  intro:
    'Trong trò chơi nhảy bungee, người chơi lao xuống với sợi dây buộc ở chân. Dây dãn dài ra, kéo người chậm lại rồi đưa người bật lên. Vì sao sợi dây làm được như vậy, và có phải kéo mạnh đến đâu dây cũng trở về như cũ?',
  objectives: [
    'Phân biệt được biến dạng kéo và biến dạng nén; nêu được thế nào là biến dạng đàn hồi và giới hạn đàn hồi.',
    'Phát biểu và vận dụng được định luật Hooke $F_{\\text{đh}} = k|\\Delta l|$.',
    'Từ đồ thị lực đàn hồi theo độ biến dạng, so sánh được độ cứng của các lò xo và nhận ra phần đồ thị không còn tuân theo định luật Hooke.',
  ],
  sections: [
    {
      heading: 'Biến dạng kéo và biến dạng nén',
      blocks: [
        {
          type: 'p',
          text: 'Khi không chịu lực, vật rắn có hình dạng và kích thước xác định. Khi chịu ngoại lực, vật bị biến dạng: hình dạng hoặc kích thước của nó thay đổi. Lực càng lớn, mức độ biến dạng càng lớn.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Hai kiểu biến dạng',
          text: 'Biến dạng kéo: hai lực ngược chiều, vuông góc với bề mặt, hướng ra ngoài vật; vật dài ra. Biến dạng nén: hai lực ngược chiều, vuông góc với bề mặt, hướng vào trong vật; vật ngắn lại.',
        },
        { type: 'widget', name: 'keo-nen' },
      ],
    },
    {
      heading: 'Biến dạng đàn hồi và giới hạn đàn hồi',
      blocks: [
        {
          type: 'p',
          text: 'Kéo một lò xo hay một vòng dây cao su rồi buông tay, chúng trở về hình dạng và kích thước ban đầu.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Biến dạng đàn hồi',
          text: 'Khi không còn ngoại lực tác dụng, nếu vật rắn lấy lại được hình dạng và kích thước ban đầu thì biến dạng của vật là biến dạng đàn hồi.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Giới hạn đàn hồi',
          text: 'Giới hạn mà trong đó vật rắn còn giữ được tính đàn hồi gọi là giới hạn đàn hồi của vật. Lực vượt quá giới hạn này thì vật không lấy lại được hình dạng và kích thước ban đầu.',
        },
        {
          type: 'p',
          text: 'Biến dạng không thể tự mất đi sau khi thôi tác dụng lực được gọi là biến dạng dẻo (biến dạng không đàn hồi). Vì thế, không nên treo vật quá nặng vào lực kế: lò xo bị dãn hẳn thì lực kế đo sai.',
        },
      ],
    },
    {
      heading: 'Định luật Hooke',
      blocks: [
        {
          type: 'p',
          text: 'Khi bị kéo hoặc nén, lò xo tác dụng lực đàn hồi lên vật gây biến dạng. Lực này ngược chiều với lực gây biến dạng và có xu hướng đưa lò xo về chiều dài ban đầu.',
        },
        {
          type: 'p',
          text: 'Treo lần lượt các quả cân vào một lò xo nhẹ thẳng đứng. Khi quả cân đứng yên, lực đàn hồi cân bằng với trọng lượng của chúng: $F_{\\text{đh}} = P = mg$. Bảng dưới là một bộ số liệu minh hoạ, lấy $g = 10$ m/s².',
        },
        {
          type: 'table',
          caption: 'Lực đàn hồi và độ dãn của một lò xo (số liệu minh hoạ)',
          head: [
            '$m$ (g)',
            '$F_{\\text{đh}}$ (N)',
            '$\\Delta l$ (cm)',
            '$\\dfrac{F_{\\text{đh}}}{\\Delta l}$ (N/m)',
          ],
          rows: [
            ['$50$', '$0{,}5$', '$1$', '$50$'],
            ['$100$', '$1{,}0$', '$2$', '$50$'],
            ['$150$', '$1{,}5$', '$3$', '$50$'],
            ['$200$', '$2{,}0$', '$4$', '$50$'],
          ],
        },
        {
          type: 'p',
          text: 'Tỉ số giữa lực và độ dãn không đổi, nên đồ thị $F_{\\text{đh}}$ theo $\\Delta l$ là đoạn thẳng đi qua gốc toạ độ.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Định luật Hooke',
          text: 'Trong giới hạn đàn hồi, độ lớn của lực đàn hồi của lò xo tỉ lệ thuận với độ biến dạng của lò xo: $F_{\\text{đh}} = k|\\Delta l|$.',
        },
        {
          type: 'list',
          items: [
            '$k$ là độ cứng của lò xo, đơn vị N/m. Lò xo càng cứng thì đồ thị càng dốc.',
            '$\\Delta l = l - l_0$ là độ biến dạng, với $l_0$ là chiều dài ban đầu và $l$ là chiều dài sau khi biến dạng. Lò xo dãn thì $\\Delta l > 0$, lò xo nén thì $\\Delta l < 0$.',
            'Vượt quá giới hạn đàn hồi, lực đàn hồi không còn tỉ lệ với độ biến dạng, đồ thị không còn là đường thẳng.',
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Đo độ cứng',
          text: 'Treo vật khối lượng $m$ vào lò xo có khối lượng rất nhỏ so với vật. Khi vật cân bằng, $k = \\dfrac{mg}{\\Delta l}$. Nếu lò xo nặng, lực đàn hồi không còn bằng trọng lượng vật treo và kết quả bị sai lệch.',
        },
        {
          type: 'p',
          text: 'Lò xo và các vật đàn hồi có mặt trong giảm xóc xe máy, ô tô, ván nhảy ở bể bơi, lực kế và dây bungee. Chúng chỉ làm việc đúng khi được dùng trong giới hạn đàn hồi.',
        },
      ],
    },
  ],
  explore: {
    title: 'Kéo lò xo đến giới hạn',
    instruction:
      'Kéo chấm tròn ở đầu lò xo xuống (hoặc dùng thanh trượt) và theo dõi đồ thị. Tính tỉ số lực trên độ dãn, thả tay để thấy lò xo về chỗ cũ. Rồi kéo tiếp đến khi đồ thị bẻ cong và thả tay lần nữa: lò xo còn về chỗ cũ không? Làm lại với lò xo khác và so sánh độ dốc.',
  },
  examples: [
    {
      problem:
        'Treo vật khối lượng $500$ g vào một lò xo nhẹ thì lò xo dãn $5$ cm khi vật đứng yên. Lấy $g = 9{,}8$ m/s². Tính độ cứng của lò xo.',
      steps: [
        'Đổi đơn vị: $m = 0{,}5$ kg, $\\Delta l = 0{,}05$ m.',
        'Vật cân bằng nên $F_{\\text{đh}} = P = mg = 0{,}5 \\cdot 9{,}8 = 4{,}9$ N.',
        '$k = \\dfrac{F_{\\text{đh}}}{\\Delta l} = \\dfrac{4{,}9}{0{,}05} = 98$ N/m.',
      ],
      answer: '$k = 98$ N/m.',
    },
    {
      problem:
        'Treo vật $100$ g vào đầu một lò xo thì lò xo dài $31$ cm; treo thêm vật $100$ g nữa thì lò xo dài $32$ cm. Lấy $g = 10$ m/s². Tìm chiều dài tự nhiên và độ cứng của lò xo.',
      steps: [
        'Hai vị trí cân bằng: $m_1 g = k(l_1 - l_0)$ và $(m_1 + m_2) g = k(l_2 - l_0)$.',
        'Trừ hai phương trình: $m_2 g = k(l_2 - l_1)$, nên $k = \\dfrac{0{,}1 \\cdot 10}{0{,}32 - 0{,}31} = 100$ N/m.',
        'Từ phương trình đầu: $l_1 - l_0 = \\dfrac{m_1 g}{k} = \\dfrac{1}{100} = 0{,}01$ m, nên $l_0 = 0{,}31 - 0{,}01 = 0{,}30$ m.',
      ],
      answer: '$l_0 = 30$ cm, $k = 100$ N/m.',
    },
    {
      problem:
        'Một lò xo có chiều dài tự nhiên $20$ cm, độ cứng $200$ N/m bị nén bởi lực $10$ N. Tính chiều dài của lò xo khi đó.',
      steps: [
        'Theo định luật Hooke, $|\\Delta l| = \\dfrac{F}{k} = \\dfrac{10}{200} = 0{,}05$ m $= 5$ cm.',
        'Lò xo bị nén nên ngắn đi: $l = l_0 - |\\Delta l| = 20 - 5 = 15$ cm.',
      ],
      answer: '$l = 15$ cm.',
    },
  ],
  practice: [
    {
      type: 'multi',
      prompt: 'Những vật nào dưới đây đang chịu biến dạng kéo?',
      options: [
        'Dây cáp treo buồng thang máy',
        'Sợi dây cao su bị hai tay kéo căng',
        'Cột chịu lực của một toà nhà',
        'Lò xo giảm xóc khi xe chở nặng',
      ],
      answers: [0, 1],
      hints: ['Vật có đang dài ra không? Hai lực hướng ra ngoài hay vào trong vật?'],
      solution:
        'Dây cáp và dây cao su bị hai lực hướng ra ngoài kéo dài ra nên chịu biến dạng kéo. Cột nhà và lò xo giảm xóc bị ép ngắn lại nên chịu biến dạng nén.',
    },
    {
      type: 'choice',
      prompt:
        'Treo một vật quá nặng vào lò xo, sau khi bỏ vật lò xo vẫn dài hơn lúc đầu. Điều đó cho biết gì?',
      options: [
        'Lực kéo đã vượt quá giới hạn đàn hồi của lò xo',
        'Lò xo vẫn đang biến dạng đàn hồi',
        'Độ cứng của lò xo tăng lên',
        'Lực đàn hồi cùng chiều với lực kéo',
      ],
      answer: 0,
      hints: ['Biến dạng đàn hồi đòi hỏi điều gì khi thôi tác dụng lực?'],
      solution:
        'Vật không lấy lại được kích thước ban đầu nên biến dạng không còn là đàn hồi: lực đã vượt quá giới hạn đàn hồi.',
    },
    {
      type: 'choice',
      prompt:
        'Lực đàn hồi của lò xo bị kéo dãn có chiều như thế nào so với lực kéo tác dụng vào lò xo?',
      options: [
        'Ngược chiều với lực kéo',
        'Cùng chiều với lực kéo',
        'Vuông góc với lực kéo',
        'Có chiều tuỳ theo độ cứng của lò xo',
      ],
      answer: 0,
      hints: ['Lò xo luôn có xu hướng trở về chiều dài ban đầu.'],
      solution:
        'Lực đàn hồi chống lại nguyên nhân làm lò xo biến dạng nên ngược chiều với lực kéo.',
    },
    {
      type: 'number',
      prompt:
        'Lò xo có độ cứng $100$ N/m bị kéo dãn $3$ cm, trong giới hạn đàn hồi. Tính độ lớn lực đàn hồi.',
      answer: 3,
      unit: 'N',
      hints: ['Đổi độ dãn ra mét trước khi thay vào công thức.'],
      solution: '$F_{\\text{đh}} = k|\\Delta l| = 100 \\cdot 0{,}03 = 3$ N.',
    },
    {
      type: 'number',
      prompt:
        'Khi chịu lực kéo $4$ N, một lò xo dãn $8$ cm, trong giới hạn đàn hồi. Tính độ cứng của lò xo.',
      answer: 50,
      unit: 'N/m',
      hints: ['$k = \\dfrac{F_{\\text{đh}}}{|\\Delta l|}$, với $\\Delta l$ tính bằng mét.'],
      solution: '$k = \\dfrac{4}{0{,}08} = 50$ N/m.',
    },
    {
      type: 'number',
      prompt:
        'Lò xo dãn $2$ cm khi chịu lực $3$ N. Trong giới hạn đàn hồi, lực $7{,}5$ N làm lò xo dãn bao nhiêu xentimét?',
      answer: 5,
      unit: 'cm',
      hints: ['Độ dãn tỉ lệ thuận với lực.'],
      solution:
        'Lực lớn gấp $\\dfrac{7{,}5}{3} = 2{,}5$ lần nên độ dãn cũng gấp $2{,}5$ lần: $2 \\cdot 2{,}5 = 5$ cm.',
    },
    {
      type: 'number',
      prompt:
        'Lò xo có chiều dài tự nhiên $25$ cm, độ cứng $40$ N/m. Treo vào lò xo vật khối lượng $200$ g, lấy $g = 10$ m/s². Tính chiều dài của lò xo khi vật đứng yên.',
      answer: 30,
      unit: 'cm',
      hints: [
        'Khi vật đứng yên, lực đàn hồi bằng trọng lượng của vật.',
        'Tính độ dãn rồi cộng vào chiều dài tự nhiên.',
      ],
      solution:
        '$F_{\\text{đh}} = mg = 0{,}2 \\cdot 10 = 2$ N; $\\Delta l = \\dfrac{2}{40} = 0{,}05$ m $= 5$ cm; $l = 25 + 5 = 30$ cm.',
    },
    {
      type: 'number',
      prompt:
        'Một lò xo dài $24$ cm khi chịu lực kéo $2$ N và dài $28$ cm khi chịu lực kéo $4$ N, trong giới hạn đàn hồi. Tính chiều dài tự nhiên của lò xo.',
      answer: 20,
      unit: 'cm',
      hints: [
        'Lực tăng thêm $2$ N thì lò xo dài thêm bao nhiêu?',
        'Lực $2$ N làm lò xo dãn đúng từng ấy so với chiều dài tự nhiên.',
      ],
      solution:
        'Thêm $2$ N, lò xo dài thêm $28 - 24 = 4$ cm. Vậy lực $2$ N ban đầu cũng làm lò xo dãn $4$ cm, nên $l_0 = 24 - 4 = 20$ cm.',
    },
    {
      type: 'choice',
      prompt:
        'Cùng chịu lực $6$ N, lò xo A dãn $12$ cm, lò xo B dãn $6$ cm, lò xo C dãn $3$ cm (đều trong giới hạn đàn hồi). Trên đồ thị $F_{\\text{đh}}$ theo $\\Delta l$, đường của lò xo nào dốc nhất?',
      options: ['Lò xo C', 'Lò xo B', 'Lò xo A', 'Ba đường dốc như nhau'],
      answer: 0,
      hints: ['Độ dốc của đồ thị cho biết độ cứng. Lò xo nào dãn ít nhất dưới cùng một lực?'],
      solution:
        '$k_A = 50$ N/m, $k_B = 100$ N/m, $k_C = 200$ N/m. Lò xo C cứng nhất nên đường của nó dốc nhất.',
    },
  ],
  takeaways: [
    'Biến dạng kéo làm vật dài ra, biến dạng nén làm vật ngắn lại.',
    'Biến dạng đàn hồi mất đi khi thôi tác dụng lực; vượt quá giới hạn đàn hồi thì vật không lấy lại được hình dạng và kích thước ban đầu.',
    'Định luật Hooke: trong giới hạn đàn hồi, $F_{\\text{đh}} = k|\\Delta l|$, với $\\Delta l = l - l_0$.',
    'Lực đàn hồi ngược chiều với lực gây biến dạng. Đồ thị $F_{\\text{đh}}$ theo $\\Delta l$ càng dốc thì lò xo càng cứng.',
  ],
};
