/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Mọi vật có khối lượng đều hút nhau bằng lực hấp dẫn; trọng lượng của một vật là độ lớn lực hút của Trái Đất lên vật, đo bằng niutơn; khối lượng của vật không đổi ở mọi nơi còn trọng lượng thay đổi theo nơi đặt vật.',
  intro:
    'Bộ quần áo của nhà du hành vũ trụ có khối lượng khoảng $50\\ \\text{kg}$, vậy mà trên Mặt Trăng họ vẫn đi lại, nhảy nhót dễ dàng. Vì sao một vật có cùng khối lượng mà ở Mặt Trăng lại "nhẹ" hơn ở Trái Đất? Khối lượng và trọng lượng khác nhau thế nào?',
  objectives: [
    'Nêu được khối lượng là số đo lượng chất của vật.',
    'Nêu được lực hấp dẫn là lực hút giữa các vật có khối lượng.',
    'Nêu được trọng lượng của vật là độ lớn lực hút của Trái Đất tác dụng lên vật, đơn vị niutơn; tính gần đúng trọng lượng từ khối lượng.',
    'Phân biệt được khối lượng và trọng lượng.',
  ],
  sections: [
    {
      heading: 'Khối lượng',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Khối lượng',
          text: 'Khối lượng là số đo lượng chất của một vật. Đơn vị khối lượng là kilôgam ($\\text{kg}$); khối lượng đo bằng cân.',
        },
        {
          type: 'p',
          text: 'Số ghi trên bao bì, như "Khối lượng tịnh: $500\\ \\text{g}$", là khối lượng của chất chứa trong bao bì, không tính vỏ. Lượng chất của một vật không đổi khi ta mang vật đi nơi khác, nên khối lượng của vật ở Trái Đất, trên Mặt Trăng hay trên Sao Hỏa đều như nhau.',
        },
      ],
    },
    {
      heading: 'Lực hấp dẫn',
      blocks: [
        {
          type: 'p',
          text: 'Buông tay, quả táo rơi xuống đất; ném hòn đá lên cao, hòn đá lại rơi xuống. Đó là vì Trái Đất hút mọi vật về phía nó. Không chỉ Trái Đất: Mặt Trăng hút các vật trên Mặt Trăng, Mặt Trời hút Trái Đất, và hai vật bất kì cũng hút nhau.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Lực hấp dẫn',
          text: 'Mọi vật có khối lượng đều hút nhau. Lực hút giữa các vật có khối lượng gọi là lực hấp dẫn. Lực hấp dẫn là lực không tiếp xúc.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Lực hấp dẫn phụ thuộc khối lượng',
          text: 'Vật có khối lượng càng lớn thì lực hấp dẫn của nó càng mạnh. Lực hút giữa hai quyển sách trên bàn rất nhỏ nên ta không nhận thấy; lực hút của Trái Đất, có khối lượng rất lớn, thì giữ được mọi vật trên mặt đất.',
        },
      ],
    },
    {
      heading: 'Trọng lượng',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Trọng lượng',
          text: 'Độ lớn lực hút của Trái Đất tác dụng lên một vật gọi là trọng lượng của vật đó. Trọng lượng kí hiệu là $P$, đơn vị là niutơn ($\\text{N}$), đo bằng lực kế.',
        },
        {
          type: 'p',
          text: 'Lực hút của Trái Đất có phương thẳng đứng, chiều từ trên xuống dưới (hướng về phía Trái Đất). Vì thế quả dọi treo trên sợi dây luôn chỉ phương thẳng đứng.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Liên hệ giữa trọng lượng và khối lượng',
          text: 'Ở gần mặt đất, vật có khối lượng $1\\ \\text{kg}$ có trọng lượng khoảng $10\\ \\text{N}$ (chính xác hơn là $9{,}8\\ \\text{N}$); vật $100\\ \\text{g}$ có trọng lượng khoảng $1\\ \\text{N}$. Có thể tính gần đúng $P = 10m$, với $m$ tính bằng $\\text{kg}$ và $P$ tính bằng $\\text{N}$.',
        },
        {
          type: 'table',
          caption: 'Vật có khối lượng $1\\ \\text{kg}$ ở các nơi (giá trị gần đúng)',
          head: ['Nơi đặt vật', 'Khối lượng', 'Trọng lượng (lực hút của nơi đó lên vật)'],
          rows: [
            ['Trái Đất', '$1\\ \\text{kg}$', '$9{,}8\\ \\text{N}$'],
            ['Mặt Trăng', '$1\\ \\text{kg}$', '$1{,}6\\ \\text{N}$'],
            ['Sao Hỏa', '$1\\ \\text{kg}$', '$3{,}7\\ \\text{N}$'],
          ],
        },
        {
          type: 'table',
          caption: 'Phân biệt khối lượng và trọng lượng',
          head: ['Tiêu chí', 'Khối lượng', 'Trọng lượng'],
          rows: [
            ['Là gì', 'Số đo lượng chất của vật', 'Độ lớn lực hút của Trái Đất lên vật'],
            ['Kí hiệu, đơn vị', '$m$, kilôgam ($\\text{kg}$)', '$P$, niutơn ($\\text{N}$)'],
            ['Dụng cụ đo', 'Cân', 'Lực kế'],
            ['Phương, chiều', 'Không có', 'Thẳng đứng, từ trên xuống'],
            ['Khi mang vật lên Mặt Trăng', 'Không đổi', 'Giảm còn khoảng $\\frac{1}{6}$'],
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Cách nói trong đời sống',
          text: 'Hằng ngày ta hay nói "quả dưa nặng $2$ cân", thực ra là nói khối lượng $2\\ \\text{kg}$. Trong khoa học, trọng lượng là một lực, đo bằng niutơn, không đo bằng kilôgam.',
        },
      ],
    },
  ],
  explore: {
    title: 'Một vật, ba nơi',
    instruction:
      'Chọn một vật rồi chọn nơi đặt vật. Ở Trái Đất, xem cân đĩa cân bằng với quả cân bao nhiêu và lực kế chỉ bao nhiêu. Mang vật tới Mặt Trăng hoặc Sao Hỏa: trước khi xem kết quả, hãy dự đoán số chỉ của cân và của lực kế sẽ lớn hơn, nhỏ hơn hay không đổi so với ở Trái Đất. Bảng cuối cùng ghi lại khối lượng và trọng lượng của vật ở các nơi em đã tới.',
  },
  examples: [
    {
      problem:
        'Một túi gạo có khối lượng $5\\ \\text{kg}$. Tính gần đúng trọng lượng của túi gạo ở Trái Đất.',
      steps: [
        'Ở Trái Đất, có thể tính gần đúng $P = 10m$, với $m$ tính bằng $\\text{kg}$.',
        '$P = 10 \\cdot 5 = 50\\ \\text{N}$.',
      ],
      answer: 'Túi gạo có trọng lượng khoảng $50\\ \\text{N}$.',
    },
    {
      problem:
        'Một quả cân có trọng lượng $2\\ \\text{N}$ ở Trái Đất. Quả cân có khối lượng bao nhiêu gam?',
      steps: [
        'Vật $100\\ \\text{g}$ có trọng lượng khoảng $1\\ \\text{N}$.',
        '$2\\ \\text{N}$ gấp $2$ lần $1\\ \\text{N}$, nên khối lượng gấp $2$ lần $100\\ \\text{g}$.',
        '$m = 2 \\cdot 100 = 200\\ \\text{g}$ (tức là $m = P : 10 = 0{,}2\\ \\text{kg}$).',
      ],
      answer: 'Quả cân có khối lượng khoảng $200\\ \\text{g}$.',
    },
    {
      problem:
        'Nhà du hành mặc bộ quần áo có khối lượng $50\\ \\text{kg}$. Trọng lượng của bộ quần áo trên Trái Đất và trên Mặt Trăng khoảng bao nhiêu, biết lực hút của Mặt Trăng lên vật chỉ bằng khoảng $\\frac{1}{6}$ lực hút của Trái Đất?',
      steps: [
        'Khối lượng của bộ quần áo ở đâu cũng là $50\\ \\text{kg}$.',
        'Trên Trái Đất: $P = 10 \\cdot 50 = 500\\ \\text{N}$.',
        'Trên Mặt Trăng: khoảng $500 : 6 \\approx 83\\ \\text{N}$.',
        'Trọng lượng nhỏ đi khoảng $6$ lần nên nhà du hành đi lại dễ dàng.',
      ],
      answer:
        'Khoảng $500\\ \\text{N}$ trên Trái Đất và khoảng $83\\ \\text{N}$ trên Mặt Trăng; khối lượng vẫn là $50\\ \\text{kg}$.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Trọng lượng của một vật là',
      options: [
        'lượng chất chứa trong vật',
        'độ lớn lực hút của Trái Đất tác dụng lên vật',
        'thể tích của vật',
        'lực hút của vật lên Mặt Trăng',
      ],
      answer: 1,
      hints: ['Trọng lượng là một lực, đo bằng niutơn.'],
      solution:
        'Trọng lượng của vật là độ lớn lực hút của Trái Đất tác dụng lên vật. Lượng chất chứa trong vật là khối lượng.',
    },
    {
      type: 'number',
      prompt:
        'Tính gần đúng trọng lượng ở Trái Đất của một bạn học sinh có khối lượng $42\\ \\text{kg}$.',
      answer: 420,
      unit: 'N',
      hints: ['Dùng $P = 10m$, $m$ tính bằng kilôgam.'],
      solution: '$P = 10 \\cdot 42 = 420\\ \\text{N}$.',
    },
    {
      type: 'number',
      prompt:
        'Một hộp sữa có khối lượng $400\\ \\text{g}$. Trọng lượng của hộp sữa ở Trái Đất khoảng bao nhiêu niutơn?',
      answer: 4,
      unit: 'N',
      hints: [
        'Vật $100\\ \\text{g}$ có trọng lượng khoảng $1\\ \\text{N}$.',
        'Hoặc đổi $400\\ \\text{g}$ ra kilôgam.',
      ],
      solution: '$400\\ \\text{g} = 0{,}4\\ \\text{kg}$, $P = 10 \\cdot 0{,}4 = 4\\ \\text{N}$.',
    },
    {
      type: 'number',
      prompt:
        'Một vật có trọng lượng $35\\ \\text{N}$ ở Trái Đất. Khối lượng của vật khoảng bao nhiêu kilôgam?',
      answer: 3.5,
      unit: 'kg',
      hints: ['Từ $P = 10m$ suy ra $m = P : 10$.'],
      solution: '$m = 35 : 10 = 3{,}5\\ \\text{kg}$.',
    },
    {
      type: 'multi',
      prompt: 'Những tính chất nào là của trọng lượng (không phải của khối lượng)?',
      options: [
        'Có đơn vị là niutơn',
        'Có đơn vị là kilôgam',
        'Đo bằng lực kế',
        'Có phương thẳng đứng, chiều từ trên xuống',
        'Không đổi khi mang vật lên Mặt Trăng',
      ],
      answers: [0, 2, 3],
      hints: [
        'Khối lượng là lượng chất; trọng lượng là một lực.',
        'Một lực thì có phương và chiều.',
      ],
      solution:
        'Trọng lượng là một lực: đơn vị niutơn, đo bằng lực kế, có phương thẳng đứng, chiều từ trên xuống. Đơn vị kilôgam và tính không đổi ở mọi nơi là của khối lượng.',
    },
    {
      type: 'choice',
      prompt: 'Mang một quả cân $1\\ \\text{kg}$ từ Trái Đất lên Mặt Trăng. Điều nào đúng?',
      options: [
        'Khối lượng và trọng lượng đều giảm.',
        'Khối lượng không đổi, trọng lượng giảm.',
        'Khối lượng giảm, trọng lượng không đổi.',
        'Khối lượng và trọng lượng đều không đổi.',
      ],
      answer: 1,
      hints: [
        'Lượng chất của quả cân có thay đổi không?',
        'Mặt Trăng hút vật mạnh hơn hay yếu hơn Trái Đất?',
      ],
      solution:
        'Lượng chất không đổi nên khối lượng vẫn là $1\\ \\text{kg}$. Mặt Trăng hút vật yếu hơn Trái Đất (khoảng $\\frac{1}{6}$), nên trọng lượng giảm từ khoảng $9{,}8\\ \\text{N}$ còn khoảng $1{,}6\\ \\text{N}$.',
    },
    {
      type: 'number',
      prompt:
        'Một robot tự hành có khối lượng $180\\ \\text{kg}$. Biết lực hút của Mặt Trăng chỉ bằng khoảng $\\frac{1}{6}$ lực hút của Trái Đất và dùng $P = 10m$ ở Trái Đất, trọng lượng của robot trên Mặt Trăng khoảng bao nhiêu niutơn?',
      answer: 300,
      unit: 'N',
      hints: ['Tính trọng lượng ở Trái Đất trước.', 'Rồi chia cho $6$.'],
      solution:
        'Ở Trái Đất: $P = 10 \\cdot 180 = 1800\\ \\text{N}$. Trên Mặt Trăng: $1800 : 6 = 300\\ \\text{N}$.',
    },
    {
      type: 'multi',
      prompt: 'Những câu nào nói đúng về lực hấp dẫn?',
      options: [
        'Mọi vật có khối lượng đều hút nhau.',
        'Chỉ Trái Đất mới có lực hấp dẫn.',
        'Lực hấp dẫn là lực không tiếp xúc.',
        'Lực hút của Trái Đất lên vật là một trường hợp của lực hấp dẫn.',
        'Hai quyển sách đặt cạnh nhau không hút nhau chút nào.',
      ],
      answers: [0, 2, 3],
      hints: ['Lực hấp dẫn có ở mọi vật có khối lượng, dù có thể rất nhỏ.'],
      solution:
        'Mọi vật có khối lượng đều hút nhau bằng lực hấp dẫn, một lực không tiếp xúc; lực hút của Trái Đất là một trường hợp của nó. Hai quyển sách vẫn hút nhau, chỉ là lực quá nhỏ nên không nhận thấy.',
    },
  ],
  takeaways: [
    'Khối lượng là số đo lượng chất của vật, đơn vị $\\text{kg}$, đo bằng cân; khối lượng không đổi ở mọi nơi.',
    'Lực hấp dẫn là lực hút giữa các vật có khối lượng.',
    'Trọng lượng $P$ là độ lớn lực hút của Trái Đất lên vật, đơn vị $\\text{N}$, đo bằng lực kế; gần đúng $P = 10m$.',
    'Cùng một vật, ở nơi có lực hút yếu hơn (như Mặt Trăng) thì trọng lượng nhỏ hơn, còn khối lượng vẫn như cũ.',
  ],
};
