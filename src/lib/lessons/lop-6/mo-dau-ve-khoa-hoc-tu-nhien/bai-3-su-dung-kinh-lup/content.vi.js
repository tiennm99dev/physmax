/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Kính lúp gồm tấm kính lồi, khung kính và tay cầm, giúp quan sát rõ vật nhỏ với độ phóng đại từ 3 đến 20 lần; bài học hướng dẫn cách cầm kính, điều chỉnh khoảng cách để nhìn rõ và cách bảo quản kính.',
  intro:
    'Gân của chiếc lá, các chân nhỏ xíu của con kiến hay những dòng chữ in rất nhỏ trên vỏ hộp thuốc: mắt thường khó nhìn rõ. Chỉ với một chiếc kính lúp, những chi tiết ấy hiện ra to và rõ nét. Nhưng nếu cầm kính không đúng khoảng cách, em sẽ chỉ thấy một hình mờ nhoè. Bài này giúp em dùng kính lúp đúng cách.',
  objectives: [
    'Nêu được cấu tạo và công dụng của kính lúp.',
    'Biết cách cầm kính lúp và điều chỉnh khoảng cách để nhìn rõ vật.',
    'Hiểu ý nghĩa của số ghi trên kính lúp (3x, 5x, 10x).',
    'Nêu được cách bảo quản kính lúp.',
  ],
  sections: [
    {
      heading: 'Cấu tạo và công dụng của kính lúp',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Kính lúp',
          text: 'Kính lúp là dụng cụ dùng để quan sát rõ những vật nhỏ mà mắt thường khó nhìn thấy. Kính lúp thông thường giúp ta nhìn thấy ảnh của vật lớn hơn vật từ 3 đến 20 lần.',
        },
        {
          type: 'list',
          items: [
            'Tấm kính lồi (dày ở giữa, mỏng ở mép): bộ phận chính, tạo ra ảnh phóng to của vật.',
            'Khung kính: giữ và bảo vệ tấm kính.',
            'Tay cầm: để cầm kính khi quan sát.',
          ],
        },
        {
          type: 'p',
          text: 'Trên khung kính thường ghi độ phóng đại của kính, ví dụ $3\\text{x}$, $5\\text{x}$ hay $10\\text{x}$. Kính ghi $5\\text{x}$ giúp ta nhìn thấy vật to hơn khoảng $5$ lần so với khi nhìn bằng mắt thường. Số ghi càng lớn, ảnh nhìn thấy càng to.',
        },
        {
          type: 'p',
          text: 'Kính lúp được dùng để quan sát gân lá, côn trùng nhỏ, đọc chữ in nhỏ, sửa đồng hồ, kiểm tra vết vân tay, soi các chi tiết nhỏ của mạch điện tử…',
        },
      ],
    },
    {
      heading: 'Cách sử dụng kính lúp',
      blocks: [
        {
          type: 'list',
          ordered: true,
          items: [
            'Đặt vật cần quan sát ở nơi đủ ánh sáng.',
            'Tay cầm chắc tay cầm của kính lúp, đặt mặt kính lên trên vật.',
            'Mắt nhìn vào mặt kính, đặt mắt gần kính.',
            'Từ từ đưa kính ra xa vật (hoặc lại gần) cho đến khi nhìn thấy ảnh của vật to và rõ nét nhất.',
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Vì sao phải điều chỉnh khoảng cách?',
          text: 'Mỗi kính lúp chỉ cho ảnh rõ nét khi kính cách vật trong một khoảng nhất định. Đặt kính quá gần vật thì ảnh to chưa nhiều và có thể mờ; đặt kính quá xa vật thì ảnh bị nhoè. Kính có độ phóng đại càng lớn thì khoảng đặt kính cho ảnh rõ nét càng gần vật và càng hẹp.',
        },
      ],
    },
    {
      heading: 'Bảo quản kính lúp',
      blocks: [
        {
          type: 'list',
          items: [
            'Không để mặt kính tiếp xúc với vật nhám, bẩn hoặc sắc nhọn để tránh làm xước mặt kính.',
            'Thường xuyên vệ sinh mặt kính bằng khăn mềm hoặc giấy lau kính chuyên dụng.',
            'Không để kính tiếp xúc với hoá chất; cất kính trong hộp, ở nơi khô ráo.',
            'Không dùng kính lúp nhìn trực tiếp vào Mặt Trời, vì có thể gây hại cho mắt.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Không để kính lúp dưới nắng gắt gần giấy, lá khô: kính lồi có thể hội tụ ánh sáng Mặt Trời tạo thành điểm rất nóng, gây cháy.',
        },
      ],
    },
  ],
  explore: {
    title: 'Kính lúp mô phỏng',
    instruction:
      'Chọn kính lúp $3\\text{x}$, $5\\text{x}$ hoặc $10\\text{x}$. Kéo kính lúp lên xuống phía trên con kiến (hoặc dùng thanh trượt, phím mũi tên) và nhìn khung "Ảnh em nhìn thấy". Tìm khoảng cách cho ảnh to và rõ nét nhất. So sánh khoảng cách đó giữa các kính: kính $10\\text{x}$ phải đặt gần vật hơn hay xa vật hơn kính $3\\text{x}$?',
  },
  examples: [
    {
      problem:
        'Một con kiến dài $3$ mm. Bạn Hoa quan sát nó qua kính lúp có ghi $5\\text{x}$. Hoa nhìn thấy con kiến dài khoảng bao nhiêu?',
      steps: [
        'Kính ghi $5\\text{x}$ giúp nhìn thấy vật to hơn khoảng $5$ lần.',
        'Chiều dài nhìn thấy: $3 \\cdot 5 = 15$ mm.',
      ],
      answer: 'Hoa nhìn thấy con kiến dài khoảng $15$ mm.',
    },
    {
      problem:
        'Bạn Nam đặt kính lúp sát lên trang sách rồi giữ yên, thấy chữ gần như không to hơn. Nam nên làm gì để nhìn rõ chữ to hơn?',
      steps: [
        'Khi kính sát vật, ảnh to chưa đáng kể.',
        'Mắt đặt gần kính, từ từ đưa kính ra xa trang sách.',
        'Dừng lại khi chữ to và rõ nét nhất; nếu đưa quá xa, chữ sẽ nhoè, khi đó đưa kính lại gần một chút.',
      ],
      answer:
        'Nam cần từ từ đưa kính ra xa trang sách, điều chỉnh khoảng cách cho đến khi chữ to và rõ nét.',
    },
  ],
  practice: [
    {
      type: 'multi',
      prompt: 'Kính lúp gồm những bộ phận nào?',
      options: ['Tấm kính lồi', 'Khung kính', 'Tay cầm', 'Ốc điều chỉnh', 'Bóng đèn chiếu sáng'],
      answers: [0, 1, 2],
      hints: ['Kính lúp rất đơn giản, không có bộ phận điều chỉnh hay chiếu sáng.'],
      solution:
        'Kính lúp gồm tấm kính lồi, khung kính và tay cầm. Ốc điều chỉnh và đèn chiếu sáng là bộ phận của kính hiển vi.',
    },
    {
      type: 'choice',
      prompt: 'Tấm kính của kính lúp có đặc điểm gì?',
      options: [
        'Mỏng ở giữa, dày ở mép',
        'Dày ở giữa, mỏng ở mép',
        'Dày đều ở mọi chỗ',
        'Là tấm kính phẳng có tráng bạc',
      ],
      answer: 1,
      hints: ['Kính lúp là kính lồi.'],
      solution: 'Kính lúp là kính lồi: phần giữa dày hơn phần mép.',
    },
    {
      type: 'number',
      prompt:
        'Một hạt cát có đường kính $0{,}4$ mm. Quan sát qua kính lúp ghi $10\\text{x}$, em thấy hạt cát có đường kính khoảng bao nhiêu milimét?',
      answer: 4,
      tolerance: 0.001,
      unit: 'mm',
      hints: ['Kính $10\\text{x}$ giúp thấy vật to hơn khoảng $10$ lần.'],
      solution: '$0{,}4 \\cdot 10 = 4$ mm.',
    },
    {
      type: 'order',
      prompt: 'Sắp xếp các bước sử dụng kính lúp theo đúng thứ tự.',
      items: [
        'Từ từ đưa kính ra xa vật đến khi thấy ảnh rõ nét',
        'Đặt vật ở nơi đủ ánh sáng',
        'Cầm kính, đặt mặt kính lên trên vật',
        'Đặt mắt gần kính, nhìn vào mặt kính',
      ],
      answer: [1, 2, 3, 0],
      hints: ['Chuẩn bị vật trước, điều chỉnh khoảng cách sau cùng.'],
      solution:
        'Đặt vật ở nơi đủ ánh sáng → cầm kính, đặt mặt kính lên trên vật → đặt mắt gần kính → từ từ đưa kính ra xa đến khi ảnh rõ nét.',
    },
    {
      type: 'choice',
      prompt:
        'Nhìn qua kính lúp, em thấy ảnh con kiến bị nhoè dù kính đang ở khá xa con kiến. Em nên làm gì?',
      options: [
        'Đưa kính ra xa con kiến hơn nữa',
        'Từ từ đưa kính lại gần con kiến',
        'Lau kính bằng tay',
        'Đổi sang nhìn bằng mắt thường',
      ],
      answer: 1,
      hints: ['Kính quá xa vật thì ảnh như thế nào?'],
      solution:
        'Kính đặt quá xa vật nên ảnh bị nhoè. Cần từ từ đưa kính lại gần vật đến khi ảnh rõ nét.',
    },
    {
      type: 'choice',
      prompt: 'Muốn quan sát rõ nhất các chi tiết nhỏ của cánh bướm, em chọn kính lúp nào?',
      options: ['Kính ghi $3\\text{x}$', 'Kính ghi $5\\text{x}$', 'Kính ghi $10\\text{x}$'],
      answer: 2,
      hints: ['Số ghi trên kính càng lớn, ảnh nhìn thấy càng to.'],
      solution:
        'Kính ghi $10\\text{x}$ có độ phóng đại lớn nhất trong ba kính, cho ảnh to nhất, thấy được nhiều chi tiết nhất.',
    },
    {
      type: 'multi',
      prompt: 'Những việc nào giúp bảo quản kính lúp đúng cách?',
      options: [
        'Lau mặt kính bằng khăn mềm hoặc giấy lau kính',
        'Dùng giấy nhám chà sạch vết bẩn trên mặt kính',
        'Cất kính trong hộp, ở nơi khô ráo',
        'Để kính tiếp xúc với hoá chất khi làm thí nghiệm',
      ],
      answers: [0, 2],
      hints: ['Mặt kính dễ bị xước và bị hoá chất làm hỏng.'],
      solution:
        'Lau bằng khăn mềm hoặc giấy chuyên dụng và cất nơi khô ráo là đúng. Giấy nhám làm xước mặt kính; hoá chất làm hỏng kính.',
    },
    {
      type: 'choice',
      prompt: 'Vật nào dưới đây có thể quan sát rõ bằng kính lúp?',
      options: [
        'Gân của một chiếc lá',
        'Tế bào vi khuẩn',
        'Các hạt nhỏ bên trong tế bào',
        'Mặt Trời',
      ],
      answer: 0,
      hints: ['Kính lúp chỉ phóng to từ $3$ đến $20$ lần.'],
      solution:
        'Gân lá đủ lớn để quan sát rõ qua kính lúp. Vi khuẩn và các thành phần bên trong tế bào quá nhỏ, cần kính hiển vi. Không bao giờ dùng kính lúp nhìn Mặt Trời.',
    },
  ],
  takeaways: [
    'Kính lúp gồm tấm kính lồi (dày ở giữa, mỏng ở mép), khung kính và tay cầm; phóng to ảnh của vật từ $3$ đến $20$ lần.',
    'Số ghi trên kính ($3\\text{x}$, $5\\text{x}$, $10\\text{x}$) là độ phóng đại: số càng lớn, ảnh nhìn thấy càng to.',
    'Muốn nhìn rõ: mắt đặt gần kính, điều chỉnh khoảng cách giữa kính và vật đến khi ảnh rõ nét.',
    'Bảo quản: tránh vật nhám, bẩn, hoá chất; lau bằng khăn mềm; cất nơi khô ráo.',
  ],
};
