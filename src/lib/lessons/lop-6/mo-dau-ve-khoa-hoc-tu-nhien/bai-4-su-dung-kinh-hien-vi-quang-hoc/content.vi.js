/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Kính hiển vi quang học phóng to ảnh của vật từ 40 đến 3000 lần, gồm hệ thống phóng đại, chiếu sáng, điều chỉnh và giá đỡ; bài học hướng dẫn quy trình quan sát tiêu bản, cách tính độ phóng đại và cách bảo quản kính.',
  intro:
    'Một giọt nước ao trông rất trong, nhưng dưới kính hiển vi lại có cả một thế giới sinh vật nhỏ bé đang bơi lội. Lớp vảy hành mỏng tưởng như trơn nhẵn lại gồm hàng trăm tế bào xếp sát nhau như những viên gạch. Kính hiển vi quang học giúp em nhìn thấy những vật mà mắt thường và cả kính lúp đều không thấy được.',
  objectives: [
    'Nêu được cấu tạo của kính hiển vi quang học và chức năng của từng bộ phận.',
    'Tính được độ phóng đại của kính từ số ghi trên thị kính và vật kính.',
    'Trình bày được các bước quan sát tiêu bản bằng kính hiển vi quang học.',
    'Nêu được cách cầm, sử dụng và bảo quản kính hiển vi.',
  ],
  sections: [
    {
      heading: 'Cấu tạo của kính hiển vi quang học',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Kính hiển vi quang học',
          text: 'Kính hiển vi quang học là dụng cụ dùng để quan sát những vật rất nhỏ mà mắt thường không nhìn thấy được, như tế bào, vi khuẩn. Kính có thể phóng to ảnh của vật từ $40$ đến $3000$ lần.',
        },
        {
          type: 'table',
          caption: 'Các hệ thống của kính hiển vi quang học',
          head: ['Hệ thống', 'Bộ phận', 'Chức năng'],
          rows: [
            [
              'Hệ thống phóng đại',
              'Thị kính (ống kính sát mắt), vật kính (ống kính sát vật)',
              'Phóng to ảnh của vật',
            ],
            [
              'Hệ thống chiếu sáng',
              'Nguồn sáng (đèn hoặc gương), màn chắn sáng',
              'Chiếu sáng và điều chỉnh lượng ánh sáng qua mẫu vật',
            ],
            [
              'Hệ thống điều chỉnh',
              'Ốc to (ốc sơ cấp), ốc nhỏ (ốc vi cấp)',
              'Nâng, hạ ống kính để lấy nét: ốc to điều chỉnh nhanh, ốc nhỏ điều chỉnh chậm và chính xác',
            ],
            [
              'Hệ thống giá đỡ',
              'Chân kính, thân kính, bàn kính, kẹp giữ tiêu bản',
              'Giữ vững kính và giữ tiêu bản cố định',
            ],
          ],
        },
        {
          type: 'p',
          text: 'Vật kính được gắn trên một đĩa xoay, thường có các loại $4\\text{x}$, $10\\text{x}$, $40\\text{x}$ và $100\\text{x}$. Xoay đĩa để đổi vật kính. Thị kính thường ghi $10\\text{x}$ hoặc $15\\text{x}$.',
        },
      ],
    },
    {
      heading: 'Độ phóng đại của kính hiển vi',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Độ phóng đại',
          text: 'Độ phóng đại của kính hiển vi bằng tích độ phóng đại của thị kính và độ phóng đại của vật kính đang dùng.',
        },
        {
          type: 'p',
          text: 'Ví dụ: thị kính $10\\text{x}$ và vật kính $40\\text{x}$ cho ảnh phóng to $10 \\times 40 = 400$ lần.',
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Vật kính có độ phóng đại càng lớn thì khi lấy nét càng nằm gần tiêu bản: vật kính $4\\text{x}$ cách tiêu bản khoảng $17$ mm, còn vật kính $40\\text{x}$ chỉ khoảng $0{,}6$ mm. Vì vậy, luôn quan sát mẫu bằng vật kính nhỏ trước rồi mới chuyển sang vật kính lớn.',
        },
      ],
    },
    {
      heading: 'Cách sử dụng kính hiển vi quang học',
      blocks: [
        {
          type: 'list',
          ordered: true,
          items: [
            'Chọn vật kính phù hợp với mẫu vật (bắt đầu từ vật kính có độ phóng đại nhỏ).',
            'Điều chỉnh ánh sáng cho thích hợp với vật kính: bật đèn hoặc chỉnh gương, màn chắn sáng.',
            'Đặt tiêu bản lên bàn kính sao cho mẫu vật nằm ở giữa, dùng kẹp giữ tiêu bản.',
            'Mắt nhìn vật kính từ một phía, vặn ốc to để hạ vật kính gần sát tiêu bản (cẩn thận không để vật kính chạm vào tiêu bản).',
            'Mắt nhìn vào thị kính, vặn ốc to theo chiều ngược lại để nâng vật kính lên từ từ đến khi nhìn thấy mẫu vật.',
            'Vặn ốc nhỏ thật chậm cho đến khi nhìn thấy mẫu vật rõ nét.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Khi dùng vật kính có độ phóng đại lớn ($40\\text{x}$ trở lên), chỉ dùng ốc nhỏ để lấy nét. Vặn ốc to có thể làm vật kính đâm vào tiêu bản, làm vỡ tiêu bản và hỏng vật kính.',
        },
      ],
    },
    {
      heading: 'Bảo quản kính hiển vi',
      blocks: [
        {
          type: 'list',
          items: [
            'Khi di chuyển kính, dùng hai tay: một tay cầm chắc thân kính, tay kia đỡ chân kính.',
            'Không để tay ướt hay bẩn chạm vào kính; không chạm tay vào các mặt kính của thị kính, vật kính.',
            'Lau các mặt kính bằng giấy lau chuyên dụng.',
            'Sau khi dùng, tháo tiêu bản, xoay vật kính nhỏ nhất vào vị trí, tắt đèn, che kính và cất nơi khô ráo.',
          ],
        },
      ],
    },
  ],
  explore: {
    title: 'Kính hiển vi ảo',
    instruction:
      'Quan sát tiêu bản biểu bì vảy hành. Bật đèn, rồi dùng ốc to hạ vật kính đến khi thấy ảnh, sau đó dùng ốc nhỏ lấy nét. Đổi vật kính và thị kính để xem độ phóng đại thay đổi thế nào. Thử với vật kính $40\\text{x}$: điều gì xảy ra nếu tiếp tục vặn ốc to để hạ vật kính?',
  },
  examples: [
    {
      problem:
        'Một kính hiển vi có thị kính $15\\text{x}$ và ba vật kính $4\\text{x}$, $10\\text{x}$, $40\\text{x}$. Tính độ phóng đại nhỏ nhất và lớn nhất của kính.',
      steps: [
        'Độ phóng đại bằng tích độ phóng đại của thị kính và vật kính.',
        'Nhỏ nhất khi dùng vật kính $4\\text{x}$: $15 \\times 4 = 60$ lần.',
        'Lớn nhất khi dùng vật kính $40\\text{x}$: $15 \\times 40 = 600$ lần.',
      ],
      answer: 'Độ phóng đại nhỏ nhất là $60$ lần, lớn nhất là $600$ lần.',
    },
    {
      problem:
        'Một tế bào có chiều dài thật $0{,}02$ mm. Quan sát qua kính hiển vi với thị kính $10\\text{x}$, vật kính $40\\text{x}$, ảnh của tế bào dài bao nhiêu milimét?',
      steps: [
        'Độ phóng đại: $10 \\times 40 = 400$ lần.',
        'Chiều dài ảnh: $0{,}02 \\cdot 400 = 8$ mm.',
      ],
      answer: 'Ảnh của tế bào dài $8$ mm.',
    },
    {
      problem:
        'Bạn An đặt tiêu bản, chọn ngay vật kính $40\\text{x}$ rồi vừa nhìn vào thị kính vừa vặn ốc to để hạ vật kính. Cách làm này sai ở đâu?',
      steps: [
        'Phải bắt đầu bằng vật kính có độ phóng đại nhỏ để dễ tìm mẫu vật.',
        'Khi hạ vật kính, mắt phải nhìn vật kính từ một phía, không nhìn vào thị kính, để không làm vật kính chạm tiêu bản.',
        'Với vật kính $40\\text{x}$ chỉ được dùng ốc nhỏ, vì vật kính nằm rất gần tiêu bản.',
      ],
      answer:
        'An sai ở ba điểm: dùng ngay vật kính lớn, nhìn vào thị kính khi hạ vật kính và dùng ốc to với vật kính $40\\text{x}$.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt:
        'Thị kính ghi $10\\text{x}$, vật kính ghi $40\\text{x}$. Kính hiển vi phóng to ảnh của vật bao nhiêu lần?',
      answer: 400,
      unit: 'lần',
      hints: ['Độ phóng đại bằng tích hai số ghi trên thị kính và vật kính.'],
      solution: '$10 \\times 40 = 400$ lần.',
    },
    {
      type: 'number',
      prompt:
        'Muốn quan sát với độ phóng đại $150$ lần bằng thị kính $15\\text{x}$, em phải dùng vật kính có độ phóng đại bao nhiêu?',
      answer: 10,
      unit: 'x',
      hints: ['Độ phóng đại thị kính $\\times$ độ phóng đại vật kính $= 150$.'],
      solution: 'Độ phóng đại vật kính $= 150 : 15 = 10$, tức là vật kính $10\\text{x}$.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi bộ phận với hệ thống của kính hiển vi chứa nó.',
      left: ['Thị kính', 'Đèn chiếu sáng', 'Ốc nhỏ', 'Bàn kính'],
      right: [
        'Hệ thống giá đỡ',
        'Hệ thống điều chỉnh',
        'Hệ thống phóng đại',
        'Hệ thống chiếu sáng',
      ],
      pairs: [
        [0, 2],
        [1, 3],
        [2, 1],
        [3, 0],
      ],
      hints: ['Hệ thống phóng đại gồm hai loại ống kính; hệ thống điều chỉnh gồm hai ốc.'],
      solution:
        'Thị kính thuộc hệ thống phóng đại; đèn thuộc hệ thống chiếu sáng; ốc nhỏ thuộc hệ thống điều chỉnh; bàn kính thuộc hệ thống giá đỡ.',
    },
    {
      type: 'order',
      prompt: 'Sắp xếp các bước quan sát tiêu bản bằng kính hiển vi theo đúng thứ tự.',
      items: [
        'Vặn ốc nhỏ để nhìn rõ mẫu vật',
        'Đặt tiêu bản lên bàn kính, kẹp giữ',
        'Chọn vật kính phù hợp',
        'Nhìn vật kính từ một phía, hạ vật kính gần sát tiêu bản',
        'Điều chỉnh ánh sáng',
        'Nhìn vào thị kính, vặn ốc to nâng vật kính đến khi thấy mẫu vật',
      ],
      answer: [2, 4, 1, 3, 5, 0],
      hints: [
        'Chuẩn bị kính (vật kính, ánh sáng) trước khi đặt tiêu bản.',
        'Lấy nét bằng ốc to trước, ốc nhỏ sau cùng.',
      ],
      solution:
        'Chọn vật kính → điều chỉnh ánh sáng → đặt và kẹp tiêu bản → nhìn từ một phía, hạ vật kính sát tiêu bản → nhìn vào thị kính, nâng vật kính bằng ốc to đến khi thấy mẫu → vặn ốc nhỏ để nhìn rõ.',
    },
    {
      type: 'choice',
      prompt: 'Khi đang dùng vật kính $40\\text{x}$ mà ảnh hơi mờ, em nên vặn ốc nào?',
      options: ['Ốc to', 'Ốc nhỏ', 'Cả hai ốc cùng lúc', 'Không cần vặn ốc nào'],
      answer: 1,
      hints: ['Vật kính $40\\text{x}$ nằm rất gần tiêu bản.'],
      solution:
        'Dùng ốc nhỏ để điều chỉnh chậm và chính xác. Ốc to làm vật kính di chuyển nhiều, dễ đâm vào tiêu bản.',
    },
    {
      type: 'choice',
      prompt: 'Cách cầm kính hiển vi khi di chuyển nào là đúng?',
      options: [
        'Một tay cầm thân kính, tay kia đỡ chân kính',
        'Một tay cầm vào thị kính',
        'Hai tay cầm bàn kính',
        'Cầm vào ốc to để nhấc kính lên',
      ],
      answer: 0,
      hints: ['Kính khá nặng và có nhiều bộ phận dễ hỏng.'],
      solution:
        'Dùng hai tay: một tay cầm chắc thân kính, tay kia đỡ chân kính. Cầm vào thị kính, bàn kính hay ốc có thể làm rơi hoặc hỏng kính.',
    },
    {
      type: 'multi',
      prompt: 'Những vật nào cần dùng kính hiển vi (không thể quan sát rõ bằng kính lúp)?',
      options: ['Tế bào biểu bì vảy hành', 'Vi khuẩn trong sữa chua', 'Gân lá cây', 'Con kiến'],
      answers: [0, 1],
      hints: ['Kính lúp chỉ phóng to đến khoảng $20$ lần.'],
      solution:
        'Tế bào và vi khuẩn rất nhỏ, cần kính hiển vi. Gân lá và con kiến có thể quan sát bằng kính lúp.',
    },
    {
      type: 'number',
      prompt:
        'Ảnh của một tế bào qua kính hiển vi có độ phóng đại $100$ lần dài $5$ mm. Chiều dài thật của tế bào là bao nhiêu milimét?',
      answer: 0.05,
      tolerance: 0.0001,
      unit: 'mm',
      hints: [
        'Chiều dài ảnh $=$ chiều dài thật $\\times$ độ phóng đại.',
        'Lấy $5$ chia cho $100$.',
      ],
      solution: 'Chiều dài thật $= 5 : 100 = 0{,}05$ mm.',
    },
  ],
  takeaways: [
    'Kính hiển vi quang học phóng to ảnh của vật từ $40$ đến $3000$ lần, dùng để quan sát tế bào, vi khuẩn.',
    'Bốn hệ thống: phóng đại (thị kính, vật kính), chiếu sáng, điều chỉnh (ốc to, ốc nhỏ), giá đỡ.',
    'Độ phóng đại $=$ độ phóng đại thị kính $\\times$ độ phóng đại vật kính.',
    'Bắt đầu với vật kính nhỏ; hạ vật kính khi nhìn từ một phía; lấy nét bằng ốc to rồi ốc nhỏ; vật kính lớn chỉ dùng ốc nhỏ.',
    'Cầm kính bằng hai tay, không chạm vào mặt kính, cất nơi khô ráo.',
  ],
};
