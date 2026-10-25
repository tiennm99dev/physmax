/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Nhiệt độ là số đo độ nóng, lạnh của vật; bài học giới thiệu thang nhiệt độ Celsius, cách đổi sang độ F và kelvin, nguyên tắc hoạt động của nhiệt kế, các loại nhiệt kế và cách đo nhiệt độ, nhất là nhiệt độ cơ thể.',
  intro:
    'Nhúng tay trái vào cốc nước lạnh, tay phải vào cốc nước ấm, một lúc sau nhúng cả hai tay vào cùng một cốc nước thường: tay trái thấy ấm, tay phải lại thấy mát. Cảm giác của tay không cho biết chính xác vật nóng hay lạnh đến đâu. Muốn biết điều đó, ta phải đo nhiệt độ bằng nhiệt kế.',
  objectives: [
    'Nêu được nhiệt độ là gì và đơn vị đo nhiệt độ trong thang Celsius.',
    'Đổi được nhiệt độ từ độ C sang độ F và sang kelvin.',
    'Nêu được nguyên tắc hoạt động của nhiệt kế chất lỏng và kể được một số loại nhiệt kế.',
    'Đo được nhiệt độ bằng nhiệt kế đúng các bước, đo được nhiệt độ cơ thể bằng nhiệt kế y tế.',
  ],
  sections: [
    {
      heading: 'Nhiệt độ và thang nhiệt độ Celsius',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Nhiệt độ',
          text: 'Nhiệt độ là số đo độ "nóng", "lạnh" của một vật. Vật càng nóng thì nhiệt độ của vật càng cao.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Thang nhiệt độ Celsius',
          text: 'Trong thang nhiệt độ Celsius, nhiệt độ của nước đá đang tan là $0\\ ^\\circ\\text{C}$, nhiệt độ của nước đang sôi là $100\\ ^\\circ\\text{C}$. Khoảng giữa hai nhiệt độ đó được chia thành $100$ phần bằng nhau, mỗi phần là $1$ độ C, kí hiệu $1\\ ^\\circ\\text{C}$. Ở nước ta, nhiệt độ thường đo bằng độ C.',
        },
        {
          type: 'p',
          text: 'Nhiệt độ thấp hơn $0\\ ^\\circ\\text{C}$ được ghi với dấu trừ, ví dụ $-10\\ ^\\circ\\text{C}$. Biết một số nhiệt độ quen thuộc giúp em ước lượng nhiệt độ trước khi đo:',
        },
        {
          type: 'table',
          caption: 'Một số nhiệt độ quen thuộc',
          head: ['Vật hoặc hiện tượng', 'Nhiệt độ'],
          rows: [
            ['Nước đá đang tan', '$0\\ ^\\circ\\text{C}$'],
            ['Ngăn mát tủ lạnh', 'khoảng $5\\ ^\\circ\\text{C}$'],
            ['Cơ thể người khoẻ mạnh', 'khoảng $37\\ ^\\circ\\text{C}$'],
            ['Nước đang sôi', '$100\\ ^\\circ\\text{C}$'],
            ['Bề mặt Mặt Trời', 'khoảng $5500\\ ^\\circ\\text{C}$'],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Thang nhiệt độ Fahrenheit',
          text: 'Một số nước như Mỹ dùng thang Fahrenheit: nước đá đang tan là $32\\ ^\\circ\\text{F}$, nước đang sôi là $212\\ ^\\circ\\text{F}$, khoảng giữa chia thành $180$ phần. Đổi từ độ C sang độ F: $t(^\\circ\\text{F}) = t(^\\circ\\text{C}) \\times 1{,}8 + 32$. Ví dụ $25\\ ^\\circ\\text{C} = 25 \\times 1{,}8 + 32 = 77\\ ^\\circ\\text{F}$.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Em có biết?',
          text: 'Trong hệ đơn vị đo lường quốc tế (SI), đơn vị nhiệt độ là kelvin, kí hiệu $\\text{K}$. Một độ chênh trong thang Kelvin bằng một độ chênh trong thang Celsius, và $0\\ ^\\circ\\text{C}$ ứng với $273\\ \\text{K}$, nên $T(\\text{K}) = t(^\\circ\\text{C}) + 273$.',
        },
      ],
    },
    {
      heading: 'Nhiệt kế',
      blocks: [
        {
          type: 'p',
          text: 'Dụng cụ đo nhiệt độ là nhiệt kế. Có nhiều loại nhiệt kế: nhiệt kế rượu, nhiệt kế thuỷ ngân, nhiệt kế y tế (thuỷ ngân hoặc điện tử), nhiệt kế hồng ngoại, nhiệt kế dạng dải băng đổi màu dán lên trán…',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Nguyên tắc hoạt động của nhiệt kế chất lỏng',
          text: 'Chất lỏng nở ra khi nóng lên và co lại khi lạnh đi; nhiệt độ càng cao thì chất lỏng nở ra càng nhiều. Nhiệt kế chất lỏng hoạt động dựa trên sự nở vì nhiệt của chất lỏng: cột chất lỏng trong ống dâng lên hay hạ xuống theo nhiệt độ của bầu nhiệt kế.',
        },
        {
          type: 'table',
          caption: 'Một số loại nhiệt kế',
          head: ['Nhiệt kế', 'Thang đo thường gặp', 'Công dụng'],
          rows: [
            [
              'Nhiệt kế rượu',
              '$-30\\ ^\\circ\\text{C}$ đến $60\\ ^\\circ\\text{C}$',
              'Đo nhiệt độ không khí.',
            ],
            [
              'Nhiệt kế thuỷ ngân',
              '$-10\\ ^\\circ\\text{C}$ đến $110\\ ^\\circ\\text{C}$',
              'Đo nhiệt độ trong phòng thí nghiệm.',
            ],
            [
              'Nhiệt kế y tế',
              '$35\\ ^\\circ\\text{C}$ đến $42\\ ^\\circ\\text{C}$, ĐCNN $0{,}1\\ ^\\circ\\text{C}$',
              'Đo nhiệt độ cơ thể người.',
            ],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Chỗ thắt của nhiệt kế y tế',
          text: 'Ống nhiệt kế y tế thuỷ ngân có một chỗ thắt gần bầu. Khi lấy nhiệt kế ra khỏi cơ thể, thuỷ ngân không tụt xuống được nên ta kịp đọc số chỉ. Trước mỗi lần đo phải vẩy nhiệt kế cho thuỷ ngân tụt xuống dưới vạch $35\\ ^\\circ\\text{C}$.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Không đo quá GHĐ',
          text: 'Rượu sôi ở khoảng $78\\ ^\\circ\\text{C}$ nên không dùng nhiệt kế rượu để đo nhiệt độ nước sôi. Nhúng nhiệt kế vào vật nóng hơn GHĐ thì chất lỏng dâng tràn ống, nhiệt kế có thể bị vỡ.',
        },
      ],
    },
    {
      heading: 'Cách đo nhiệt độ',
      blocks: [
        {
          type: 'list',
          ordered: true,
          items: [
            'Ước lượng nhiệt độ của vật cần đo.',
            'Chọn nhiệt kế có GHĐ và ĐCNN phù hợp.',
            'Hiệu chỉnh nhiệt kế đúng cách trước khi đo (vẩy nhiệt kế y tế, bật nhiệt kế điện tử).',
            'Thực hiện phép đo: bầu nhiệt kế tiếp xúc tốt với vật cần đo, đợi cột chất lỏng đứng yên.',
            'Đọc và ghi kết quả theo vạch chia gần nhất với đỉnh cột chất lỏng, mắt nhìn vuông góc với nhiệt kế.',
          ],
        },
        {
          type: 'p',
          text: 'Đo nhiệt độ cơ thể bằng nhiệt kế y tế thuỷ ngân: lau sạch thân và bầu nhiệt kế bằng bông và cồn; vẩy cho thuỷ ngân tụt xuống dưới vạch $35\\ ^\\circ\\text{C}$; đặt bầu nhiệt kế vào nách, kẹp cánh tay lại, đợi $2$ đến $3$ phút rồi lấy ra đọc.',
        },
        {
          type: 'p',
          text: 'Đo nhiệt độ cơ thể bằng nhiệt kế y tế điện tử: lau sạch đầu kim loại của nhiệt kế; bấm nút khởi động; đặt đầu kim loại dưới lưỡi (hoặc kẹp vào nách); khi nghe tiếng "bíp" thì lấy ra đọc số trên màn hình; tắt nhiệt kế.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Nhiệt độ cơ thể',
          text: 'Nhiệt độ cơ thể người khoẻ mạnh khoảng $37\\ ^\\circ\\text{C}$. Khi đo được từ khoảng $38\\ ^\\circ\\text{C}$ trở lên là người đang bị sốt.',
        },
        { type: 'widget', name: 'thao-tac' },
      ],
    },
  ],
  explore: {
    title: 'Nhiệt kế ảo',
    instruction:
      'Chọn nhiệt kế, rồi chọn nơi nhúng bầu nhiệt kế vào. Quan sát cột chất lỏng dâng lên hay hạ xuống, đợi nó đứng yên rồi đọc ở khung phóng to và nhập kết quả bằng độ C. Thang bên phải cho thấy cùng mức đó trên thang Kelvin hoặc Fahrenheit. Thử nhúng nhiệt kế rượu vào nước sôi, dùng nhiệt kế y tế đo nước đá, hay đo hai lần liền bằng nhiệt kế y tế mà không vẩy để thấy vì sao phải chọn và dùng nhiệt kế đúng cách.',
  },
  examples: [
    {
      problem:
        'Nhiệt độ một ngày hè ở Hà Nội là $30\\ ^\\circ\\text{C}$. Nhiệt độ đó bằng bao nhiêu độ F?',
      steps: [
        'Dùng công thức $t(^\\circ\\text{F}) = t(^\\circ\\text{C}) \\times 1{,}8 + 32$.',
        '$30 \\times 1{,}8 = 54$.',
        '$54 + 32 = 86$.',
      ],
      answer: '$30\\ ^\\circ\\text{C} = 86\\ ^\\circ\\text{F}$.',
    },
    {
      problem:
        'Một em bé ở Mỹ được đo nhiệt độ là $104\\ ^\\circ\\text{F}$. Đổi ra độ C. Em bé có bị sốt không?',
      steps: [
        'Từ $t(^\\circ\\text{F}) = t(^\\circ\\text{C}) \\times 1{,}8 + 32$, ta có $t(^\\circ\\text{C}) = (t(^\\circ\\text{F}) - 32) : 1{,}8$.',
        '$104 - 32 = 72$; $72 : 1{,}8 = 40$.',
        '$40\\ ^\\circ\\text{C}$ cao hơn nhiều so với $37\\ ^\\circ\\text{C}$.',
      ],
      answer: '$104\\ ^\\circ\\text{F} = 40\\ ^\\circ\\text{C}$: em bé đang sốt cao.',
    },
    {
      problem:
        'Có ba nhiệt kế: nhiệt kế rượu (GHĐ $60\\ ^\\circ\\text{C}$), nhiệt kế thuỷ ngân (GHĐ $110\\ ^\\circ\\text{C}$) và nhiệt kế y tế (GHĐ $42\\ ^\\circ\\text{C}$). Nên dùng nhiệt kế nào để đo nhiệt độ nước đang sôi? Đổi kết quả ra kelvin.',
      steps: [
        'Ước lượng: nước đang sôi khoảng $100\\ ^\\circ\\text{C}$.',
        'Nhiệt kế rượu và nhiệt kế y tế có GHĐ nhỏ hơn $100\\ ^\\circ\\text{C}$, dùng sẽ hỏng nhiệt kế.',
        'Nhiệt kế thuỷ ngân có GHĐ $110\\ ^\\circ\\text{C} > 100\\ ^\\circ\\text{C}$ nên dùng được.',
        '$T = 100 + 273 = 373\\ \\text{K}$.',
      ],
      answer: 'Dùng nhiệt kế thuỷ ngân; $100\\ ^\\circ\\text{C} = 373\\ \\text{K}$.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Trong thang nhiệt độ Celsius, nhiệt độ của nước đá đang tan là',
      options: [
        '$0\\ ^\\circ\\text{C}$',
        '$32\\ ^\\circ\\text{C}$',
        '$100\\ ^\\circ\\text{C}$',
        '$273\\ ^\\circ\\text{C}$',
      ],
      answer: 0,
      hints: ['Đây là mốc thứ nhất của thang Celsius; mốc thứ hai là nước đang sôi.'],
      solution:
        'Nước đá đang tan là $0\\ ^\\circ\\text{C}$, nước đang sôi là $100\\ ^\\circ\\text{C}$. Còn $32$ là số độ F của nước đá đang tan và $273$ là số kelvin.',
    },
    {
      type: 'choice',
      prompt: 'Nhiệt kế chất lỏng hoạt động dựa trên',
      options: [
        'sự nở vì nhiệt của chất lỏng',
        'sự bay hơi của chất lỏng',
        'màu sắc của chất lỏng',
        'khối lượng của chất lỏng',
      ],
      answer: 0,
      hints: ['Khi bầu nhiệt kế nóng lên, cột chất lỏng dâng lên. Vì sao?'],
      solution:
        'Chất lỏng nở ra khi nóng lên, co lại khi lạnh đi; cột chất lỏng dâng hay hạ theo nhiệt độ.',
    },
    {
      type: 'number',
      prompt: 'Đổi $25\\ ^\\circ\\text{C}$ ra độ F.',
      answer: 77,
      unit: '°F',
      hints: ['$t(^\\circ\\text{F}) = t(^\\circ\\text{C}) \\times 1{,}8 + 32$.'],
      solution: '$25 \\times 1{,}8 + 32 = 45 + 32 = 77\\ ^\\circ\\text{F}$.',
    },
    {
      type: 'number',
      prompt: 'Nhiệt độ cơ thể người khoẻ mạnh là $37\\ ^\\circ\\text{C}$. Đổi ra độ F.',
      answer: 98.6,
      tolerance: 0.01,
      unit: '°F',
      hints: ['Nhân với $1{,}8$ rồi cộng $32$.'],
      solution: '$37 \\times 1{,}8 + 32 = 66{,}6 + 32 = 98{,}6\\ ^\\circ\\text{F}$.',
    },
    {
      type: 'number',
      prompt: 'Nhiệt độ phòng học là $20\\ ^\\circ\\text{C}$. Nhiệt độ đó bằng bao nhiêu kelvin?',
      answer: 293,
      unit: 'K',
      hints: ['$T(\\text{K}) = t(^\\circ\\text{C}) + 273$.'],
      solution: '$T = 20 + 273 = 293\\ \\text{K}$.',
    },
    {
      type: 'match',
      prompt: 'Ghép mỗi vật với nhiệt độ phù hợp nhất của nó.',
      left: ['Nước đá đang tan', 'Ngăn mát tủ lạnh', 'Cơ thể người khoẻ mạnh', 'Nước đang sôi'],
      right: [
        '$0\\ ^\\circ\\text{C}$',
        '$5\\ ^\\circ\\text{C}$',
        '$37\\ ^\\circ\\text{C}$',
        '$100\\ ^\\circ\\text{C}$',
      ],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['Hai mốc của thang Celsius là nước đá đang tan và nước đang sôi.'],
      solution:
        'Nước đá đang tan: $0\\ ^\\circ\\text{C}$; ngăn mát tủ lạnh: khoảng $5\\ ^\\circ\\text{C}$; cơ thể người: khoảng $37\\ ^\\circ\\text{C}$; nước đang sôi: $100\\ ^\\circ\\text{C}$.',
    },
    {
      type: 'choice',
      prompt: 'Nên dùng nhiệt kế nào để đo nhiệt độ nước đang sôi?',
      options: [
        'Nhiệt kế rượu, GHĐ $60\\ ^\\circ\\text{C}$',
        'Nhiệt kế y tế, GHĐ $42\\ ^\\circ\\text{C}$',
        'Nhiệt kế thuỷ ngân, GHĐ $110\\ ^\\circ\\text{C}$',
      ],
      answer: 2,
      hints: ['GHĐ của nhiệt kế phải lớn hơn nhiệt độ cần đo, khoảng $100\\ ^\\circ\\text{C}$.'],
      solution:
        'Chỉ nhiệt kế thuỷ ngân có GHĐ $110\\ ^\\circ\\text{C}$ lớn hơn $100\\ ^\\circ\\text{C}$. Hai nhiệt kế kia sẽ bị hỏng, vỡ.',
    },
    {
      type: 'number',
      prompt:
        'Trên một nhiệt kế y tế, giữa vạch $37\\ ^\\circ\\text{C}$ và vạch $38\\ ^\\circ\\text{C}$ có $10$ khoảng chia bằng nhau. ĐCNN của nhiệt kế là bao nhiêu độ C?',
      answer: 0.1,
      tolerance: 0.001,
      unit: '°C',
      hints: ['Lấy hiệu hai số ghi liền nhau chia cho số khoảng chia giữa chúng.'],
      solution: 'ĐCNN $= (38 - 37) : 10 = 0{,}1\\ ^\\circ\\text{C}$.',
    },
    {
      type: 'order',
      prompt: 'Sắp xếp các bước đo nhiệt độ cơ thể bằng nhiệt kế y tế thuỷ ngân theo đúng thứ tự.',
      items: [
        'Đặt bầu nhiệt kế vào nách, kẹp cánh tay lại',
        'Vẩy cho thuỷ ngân tụt xuống dưới vạch 35 °C',
        'Lấy nhiệt kế ra và đọc kết quả',
        'Lau sạch thân và bầu nhiệt kế bằng bông và cồn',
        'Đợi 2 đến 3 phút',
      ],
      answer: [3, 1, 0, 4, 2],
      hints: ['Làm sạch và vẩy nhiệt kế trước khi đặt vào nách.'],
      solution:
        'Lau sạch nhiệt kế → vẩy cho thuỷ ngân tụt dưới vạch 35 °C → đặt vào nách, kẹp tay lại → đợi 2 đến 3 phút → lấy ra đọc kết quả.',
    },
    {
      type: 'choice',
      prompt:
        'Bạn Hoa nhúng tay trái vào cốc nước lạnh, tay phải vào cốc nước ấm, rồi nhúng cả hai tay vào cùng một cốc nước thường. Điều gì xảy ra?',
      options: [
        'Hai tay thấy nóng như nhau',
        'Tay trái thấy ấm, tay phải thấy mát',
        'Tay trái thấy mát, tay phải thấy ấm',
        'Hai tay đều không có cảm giác gì',
      ],
      answer: 1,
      hints: ['Mỗi tay so cốc nước thường với nước nó vừa ở trong.'],
      solution:
        'Tay trái vừa ở nước lạnh nên thấy nước thường ấm; tay phải vừa ở nước ấm nên thấy nước thường mát. Cảm giác của tay không xác định đúng nhiệt độ, nên phải dùng nhiệt kế.',
    },
  ],
  takeaways: [
    'Nhiệt độ là số đo độ nóng, lạnh của vật; ở nước ta thường đo bằng độ C.',
    'Thang Celsius: nước đá đang tan $0\\ ^\\circ\\text{C}$, nước đang sôi $100\\ ^\\circ\\text{C}$; $t(^\\circ\\text{F}) = t(^\\circ\\text{C}) \\times 1{,}8 + 32$; $T(\\text{K}) = t(^\\circ\\text{C}) + 273$.',
    'Nhiệt kế chất lỏng hoạt động dựa trên sự nở vì nhiệt của chất lỏng; chọn nhiệt kế có GHĐ lớn hơn nhiệt độ cần đo.',
    'Đo nhiệt độ cơ thể bằng nhiệt kế y tế: lau sạch, vẩy (với nhiệt kế thuỷ ngân), kẹp vào nách hoặc ngậm dưới lưỡi, đợi đủ thời gian rồi đọc.',
  ],
};
