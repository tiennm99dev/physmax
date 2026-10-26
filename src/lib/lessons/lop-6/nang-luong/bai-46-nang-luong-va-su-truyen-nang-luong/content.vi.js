/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Năng lượng đặc trưng cho khả năng tác dụng lực; năng lượng truyền từ vật này sang vật khác bằng tác dụng lực hoặc truyền nhiệt; nhiên liệu khi cháy cung cấp năng lượng; đơn vị năng lượng là jun (J).',
  intro:
    'Ta không nhìn thấy năng lượng, nhưng cảm nhận được tác dụng của nó: gió mạnh làm cây nghiêng ngả, ngọn lửa làm nước sôi, bữa cơm giúp ta đủ sức chạy nhảy. Năng lượng là gì, và nó đi từ vật này sang vật khác như thế nào?',
  objectives: [
    'Nêu được: năng lượng đặc trưng cho khả năng tác dụng lực; vật có năng lượng càng lớn thì có thể tác dụng lực càng mạnh, càng lâu.',
    'Lấy được ví dụ về sự truyền năng lượng từ vật này sang vật khác bằng tác dụng lực hoặc truyền nhiệt.',
    'Nêu được nhiên liệu là chất cháy được, khi cháy toả ra năng lượng (nhiệt, ánh sáng).',
    'Biết đơn vị năng lượng là jun (J) và đổi được giữa J, kJ, cal.',
  ],
  sections: [
    {
      heading: 'Năng lượng và tác dụng lực',
      blocks: [
        {
          type: 'p',
          text: 'Mọi hoạt động và mọi biến đổi trong tự nhiên đều cần năng lượng: con người hoạt động nhờ năng lượng lấy từ thức ăn, cây xanh lớn lên nhờ năng lượng ánh sáng Mặt Trời, đèn pin sáng nhờ năng lượng dự trữ trong pin.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Năng lượng',
          text: 'Năng lượng đặc trưng cho khả năng tác dụng lực. Một vật có năng lượng thì có khả năng tác dụng lực lên vật khác. Năng lượng càng lớn thì lực tác dụng có thể càng mạnh và kéo dài càng lâu.',
        },
        {
          type: 'p',
          text: 'Thí nghiệm: dùng ống hút thổi vào cánh buồm giấy gắn trên một chiếc xe đồ chơi. Thổi càng mạnh, càng lâu thì năng lượng truyền cho xe càng lớn: luồng hơi đẩy xe mạnh hơn, xe chạy được xa hơn.',
        },
        { type: 'widget', name: 'thoi-xe' },
        {
          type: 'callout',
          tone: 'note',
          title: 'Đơn vị năng lượng',
          text: 'Đơn vị năng lượng là jun, kí hiệu $\\text{J}$. Năng lượng cần để nâng một vật có trọng lượng $1\\ \\text{N}$ lên cao $1\\ \\text{m}$ là $1\\ \\text{J}$. Ngoài ra còn dùng kilôjun và calo: $1\\ \\text{kJ} = 1000\\ \\text{J}$; $1\\ \\text{cal} \\approx 4{,}2\\ \\text{J}$.',
        },
      ],
    },
    {
      heading: 'Sự truyền năng lượng',
      blocks: [
        {
          type: 'p',
          text: 'Năng lượng có thể truyền từ vật này sang vật khác, từ nơi này đến nơi khác. Hai cách truyền thường gặp:',
        },
        {
          type: 'table',
          caption: 'Hai cách truyền năng lượng',
          head: ['Cách truyền', 'Ví dụ'],
          rows: [
            [
              'Bằng tác dụng lực',
              'Gió đẩy cánh quạt gió quay; chân đá vào quả bóng làm bóng bay đi; người đạp bàn đạp làm xe đạp chạy',
            ],
            [
              'Bằng truyền nhiệt',
              'Ngọn lửa bếp làm ấm nước nóng lên; bàn là nóng làm phẳng quần áo; Mặt Trời sưởi ấm mặt đất',
            ],
          ],
        },
        {
          type: 'p',
          text: 'Năng lượng thường truyền nối tiếp qua nhiều vật, như các quân domino đổ lần lượt. Ví dụ: khí gas cháy tạo ngọn lửa, ngọn lửa truyền nhiệt cho ấm, ấm truyền nhiệt cho nước, nước sôi tạo hơi đẩy nắp ấm.',
        },
      ],
    },
    {
      heading: 'Nhiên liệu và năng lượng',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Nhiên liệu',
          text: 'Nhiên liệu là những chất cháy được, khi cháy toả ra nhiều nhiệt và thường phát sáng. Năng lượng được dự trữ trong nhiên liệu và giải phóng khi nhiên liệu bị đốt cháy.',
        },
        {
          type: 'list',
          items: [
            'Nhiên liệu rắn: than, củi, gỗ.',
            'Nhiên liệu lỏng: xăng, dầu hoả, dầu diesel, cồn.',
            'Nhiên liệu khí: khí gas, khí biogas.',
          ],
        },
        {
          type: 'p',
          text: 'Xe máy, ô tô chạy được nhờ năng lượng từ xăng, dầu; bếp nấu chín thức ăn nhờ năng lượng từ gas, than, củi. Than đá, dầu mỏ và khí tự nhiên được tạo thành từ xác sinh vật chôn vùi hàng triệu năm, gọi là nhiên liệu hoá thạch; chúng sẽ cạn dần nếu khai thác mãi.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'An toàn khi dùng nhiên liệu',
          text: 'Nhiên liệu dễ cháy, có thể gây cháy nổ. Để xa nguồn lửa, khoá van bình gas sau khi nấu, mở cửa cho thoáng khí khi đun bếp than.',
        },
      ],
    },
  ],
  explore: {
    title: 'Chuỗi domino năng lượng',
    instruction:
      'Chọn một chuỗi, rồi chạm (hoặc kéo) từng thẻ để xếp vào các ô theo đúng thứ tự năng lượng được truyền đi: ô 1 là nơi năng lượng bắt đầu. Mỗi mũi tên giữa hai ô cho biết hai khâu đã nối đúng chưa. Chạm vào một ô để lấy thẻ ra. Xếp đúng cả chuỗi để xem năng lượng truyền qua từng khâu bằng cách nào.',
  },
  examples: [
    {
      problem:
        'Một quả bóng đang lăn đập vào một chai nhựa và làm chai đổ. a) Vật nào có năng lượng? Vì sao? b) Năng lượng truyền từ vật nào sang vật nào, bằng cách nào?',
      steps: [
        'a) Quả bóng đang lăn tác dụng được lực lên chai nhựa (làm chai đổ). Năng lượng đặc trưng cho khả năng tác dụng lực nên quả bóng có năng lượng.',
        'b) Khi va chạm, quả bóng tác dụng lực lên chai, làm chai chuyển động: năng lượng truyền từ quả bóng sang chai bằng tác dụng lực.',
      ],
      answer:
        'a) Quả bóng đang lăn có năng lượng vì nó tác dụng được lực lên chai. b) Năng lượng truyền từ quả bóng sang chai bằng tác dụng lực.',
    },
    {
      problem: 'Đổi các giá trị sau ra jun: a) $2{,}5\\ \\text{kJ}$; b) $100\\ \\text{cal}$.',
      steps: [
        'a) $1\\ \\text{kJ} = 1000\\ \\text{J}$ nên $2{,}5\\ \\text{kJ} = 2{,}5 \\times 1000\\ \\text{J} = 2500\\ \\text{J}$.',
        'b) $1\\ \\text{cal} \\approx 4{,}2\\ \\text{J}$ nên $100\\ \\text{cal} \\approx 100 \\times 4{,}2\\ \\text{J} = 420\\ \\text{J}$.',
      ],
      answer: 'a) $2500\\ \\text{J}$; b) khoảng $420\\ \\text{J}$.',
    },
    {
      problem:
        'Khi đun nước bằng bếp gas, năng lượng được truyền qua những vật nào? Ở mỗi khâu, năng lượng truyền bằng cách nào?',
      steps: [
        'Khí gas là nhiên liệu: khi cháy, năng lượng dự trữ trong gas toả ra thành ngọn lửa nóng.',
        'Ngọn lửa truyền nhiệt cho đáy ấm, đáy ấm truyền nhiệt cho nước: đây là truyền năng lượng bằng truyền nhiệt.',
        'Khi nước sôi, hơi nước đẩy nắp ấm lên: năng lượng truyền bằng tác dụng lực.',
      ],
      answer:
        'Gas → ngọn lửa → ấm → nước → nắp ấm; truyền nhiệt ở các khâu giữa, tác dụng lực ở khâu cuối.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Năng lượng đặc trưng cho',
      options: [
        'khả năng tác dụng lực',
        'khối lượng của vật',
        'kích thước của vật',
        'màu sắc của vật',
      ],
      answer: 0,
      hints: ['Nhớ lại thí nghiệm thổi xe: thổi mạnh hơn thì điều gì xảy ra với lực đẩy xe?'],
      solution:
        'Năng lượng đặc trưng cho khả năng tác dụng lực: vật có năng lượng càng lớn thì có thể tác dụng lực càng mạnh, càng lâu.',
    },
    {
      type: 'choice',
      prompt:
        'Thổi vào cánh buồm của cùng một xe đồ chơi hai lần: lần 1 thổi nhẹ, lần 2 thổi mạnh và lâu hơn. Kết luận nào đúng?',
      options: [
        'Lần 2 truyền cho xe nhiều năng lượng hơn nên xe đi xa hơn',
        'Hai lần xe nhận năng lượng như nhau',
        'Lần 1 truyền cho xe nhiều năng lượng hơn',
        'Xe đi xa hay gần không liên quan đến năng lượng',
      ],
      answer: 0,
      hints: ['Năng lượng càng lớn thì lực tác dụng càng mạnh và kéo dài.'],
      solution:
        'Thổi mạnh và lâu hơn thì năng lượng truyền cho xe lớn hơn, lực đẩy mạnh hơn và lâu hơn, nên xe đi xa hơn.',
    },
    {
      type: 'multi',
      prompt:
        'Trong những trường hợp sau, trường hợp nào năng lượng được truyền bằng truyền nhiệt?',
      options: [
        'Gió thổi làm cánh quạt gió quay',
        'Bếp điện làm nồi canh nóng lên',
        'Cầu thủ sút quả bóng bay vào lưới',
        'Ánh nắng làm sân xi măng nóng lên',
        'Bàn là nóng làm phẳng áo',
      ],
      answers: [1, 3, 4],
      hints: ['Vật nhận năng lượng bị đẩy cho chuyển động, hay bị làm nóng lên?'],
      solution:
        'Bếp làm nóng nồi canh, nắng làm nóng sân, bàn là làm nóng áo: truyền bằng truyền nhiệt. Gió đẩy cánh quạt và chân sút bóng: truyền bằng tác dụng lực.',
    },
    {
      type: 'number',
      prompt: 'Đổi $3{,}5\\ \\text{kJ}$ ra jun.',
      answer: 3500,
      unit: 'J',
      hints: ['$1\\ \\text{kJ} = 1000\\ \\text{J}$.'],
      solution: '$3{,}5\\ \\text{kJ} = 3{,}5 \\times 1000\\ \\text{J} = 3500\\ \\text{J}$.',
    },
    {
      type: 'number',
      prompt:
        'Biết $1\\ \\text{cal} \\approx 4{,}2\\ \\text{J}$. Năng lượng $500\\ \\text{cal}$ xấp xỉ bằng bao nhiêu jun?',
      answer: 2100,
      unit: 'J',
      hints: ['Nhân số calo với $4{,}2$.'],
      solution: '$500\\ \\text{cal} \\approx 500 \\times 4{,}2\\ \\text{J} = 2100\\ \\text{J}$.',
    },
    {
      type: 'multi',
      prompt: 'Những chất nào là nhiên liệu?',
      options: ['Xăng', 'Nước', 'Than', 'Khí gas', 'Muối ăn', 'Củi'],
      answers: [0, 2, 3, 5],
      hints: ['Nhiên liệu là chất cháy được và toả nhiều nhiệt khi cháy.'],
      solution:
        'Xăng, than, khí gas, củi cháy được và toả nhiều nhiệt nên là nhiên liệu. Nước và muối ăn không cháy được.',
    },
    {
      type: 'order',
      prompt: 'Sắp xếp các khâu theo đúng thứ tự năng lượng được truyền đi khi bạn An đạp xe.',
      items: ['Chiếc xe đạp chạy', 'Mặt Trời chiếu sáng', 'Bạn An ăn cơm', 'Cây lúa cho hạt gạo'],
      answer: [1, 3, 2, 0],
      hints: [
        'Bắt đầu từ nguồn năng lượng giúp cây lớn lên.',
        'Năng lượng đi qua cây lúa rồi qua thức ăn vào cơ thể người.',
      ],
      solution:
        'Mặt Trời chiếu sáng → cây lúa cho hạt gạo → bạn An ăn cơm → bạn An đạp, xe đạp chạy.',
    },
    {
      type: 'choice',
      prompt: 'Vì sao không nhìn thấy năng lượng nhưng ta vẫn biết vật có năng lượng?',
      options: [
        'Vì ta cảm nhận được tác dụng của nó, như làm vật chuyển động, nóng lên, phát sáng',
        'Vì vật có năng lượng luôn có màu đỏ',
        'Vì vật có năng lượng luôn nặng hơn',
        'Vì vật có năng lượng luôn đứng yên',
      ],
      answer: 0,
      hints: ['Gió làm cây nghiêng ngả, lửa làm nước sôi: ta thấy điều gì?'],
      solution:
        'Năng lượng không nhìn thấy được, nhưng ta nhận ra nó qua tác dụng: làm vật chuyển động, biến dạng, nóng lên, phát sáng, phát ra âm thanh.',
    },
  ],
  takeaways: [
    'Năng lượng đặc trưng cho khả năng tác dụng lực; năng lượng càng lớn thì lực tác dụng có thể càng mạnh, càng lâu.',
    'Năng lượng truyền từ vật này sang vật khác bằng tác dụng lực hoặc bằng truyền nhiệt.',
    'Nhiên liệu là chất cháy được, khi cháy toả ra năng lượng dưới dạng nhiệt và ánh sáng.',
    'Đơn vị năng lượng là jun ($\\text{J}$): $1\\ \\text{kJ} = 1000\\ \\text{J}$, $1\\ \\text{cal} \\approx 4{,}2\\ \\text{J}$.',
  ],
};
