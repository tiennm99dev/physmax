/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Thực hành xác định khối lượng riêng của một khối hộp chữ nhật, của một vật có hình dạng bất kì và của một lượng chất lỏng: đo khối lượng bằng cân, đo thể tích bằng thước hoặc bình chia độ, rồi tính D = m/V.',
  intro:
    'Một hòn sỏi nhặt ngoài sân không có hình dạng nào để tính thể tích bằng công thức. Một chai dầu ăn không ghi khối lượng riêng. Vậy làm sao biết được khối lượng riêng của chúng? Bài này hướng dẫn em tự đo.',
  objectives: [
    'Đo được khối lượng của vật và của chất lỏng bằng cân.',
    'Đo được thể tích khối hộp bằng thước, thể tích vật có hình dạng bất kì và thể tích chất lỏng bằng bình chia độ.',
    'Tính được khối lượng riêng $D = \\dfrac{m}{V}$ từ số đo; đo nhiều lần và lấy giá trị trung bình.',
  ],
  sections: [
    {
      heading: 'Cơ sở của phép đo',
      blocks: [
        {
          type: 'p',
          text: 'Theo công thức $D = \\dfrac{m}{V}$, muốn xác định khối lượng riêng của một chất ta đo khối lượng $m$ và thể tích $V$ của một vật (hoặc một lượng chất lỏng) làm bằng chất đó, rồi tính thương.',
        },
        {
          type: 'table',
          caption: 'Đo khối lượng và thể tích',
          head: ['Cần đo', 'Dụng cụ', 'Cách làm'],
          rows: [
            [
              'Khối lượng $m$',
              'Cân (cân điện tử hoặc cân đồng hồ)',
              'Chỉnh cân về số $0$, đặt vật lên đĩa cân, đọc số chỉ.',
            ],
            [
              'Thể tích khối hộp',
              'Thước',
              'Đo chiều dài $a$, chiều rộng $b$, chiều cao $c$; tính $V = a \\cdot b \\cdot c$.',
            ],
            [
              'Thể tích vật bất kì (chìm trong nước)',
              'Bình chia độ, nước',
              'Đọc mực nước $V_1$; thả chìm vật, đọc mực nước $V_2$; $V = V_2 - V_1$.',
            ],
            ['Thể tích chất lỏng', 'Bình chia độ', 'Đổ chất lỏng vào bình, đọc thể tích.'],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Đọc bình chia độ',
          text: 'Xác định giới hạn đo (GHĐ) và độ chia nhỏ nhất (ĐCNN) của bình trước khi đo. Đặt bình thẳng đứng, mắt nhìn ngang với mực chất lỏng, đọc theo vạch chia gần nhất. Nhớ $1\\ \\text{mL} = 1\\ \\text{cm}^3$.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Cân trước, nhúng nước sau',
          text: 'Vật đã nhúng vào nước bị ướt, nếu cân sau thì khối lượng đọc được lớn hơn khối lượng thật. Vì vậy luôn cân vật khô trước rồi mới đo thể tích bằng bình chia độ.',
        },
      ],
    },
    {
      heading: 'Thực hành: xác định khối lượng riêng',
      project: true,
      blocks: [
        {
          type: 'p',
          text: 'Mục tiêu: xác định khối lượng riêng của (1) một khối hộp chữ nhật, (2) một vật rắn có hình dạng bất kì chìm trong nước (hòn sỏi, con ốc), (3) một lượng chất lỏng (nước muối, dầu ăn); so sánh với bảng khối lượng riêng.',
        },
        { type: 'p', text: 'Dụng cụ:' },
        {
          type: 'list',
          items: [
            'Cân điện tử (ĐCNN $0{,}1\\ \\text{g}$ hoặc $1\\ \\text{g}$).',
            'Thước có ĐCNN $1\\ \\text{mm}$.',
            'Bình chia độ (GHĐ $100\\ \\text{mL}$ hoặc $250\\ \\text{mL}$), cốc thủy tinh, nước.',
            'Một khối hộp chữ nhật (gỗ, nhôm), một hòn sỏi hoặc con ốc vừa lọt bình chia độ, một ít chất lỏng cần đo, khăn lau.',
          ],
        },
        { type: 'p', text: 'Các bước tiến hành:' },
        {
          type: 'list',
          ordered: true,
          items: [
            'Khối hộp: cân khối hộp được $m$; đo $a$, $b$, $c$ bằng thước; tính $V = a \\cdot b \\cdot c$ và $D = \\dfrac{m}{V}$.',
            'Vật bất kì: cân vật khô được $m$. Đổ nước vào bình chia độ (đủ để ngập vật), đọc $V_1$. Buộc vật vào sợi chỉ, thả nhẹ cho vật chìm hẳn, đọc $V_2$. Tính $V = V_2 - V_1$ và $D = \\dfrac{m}{V}$.',
            'Chất lỏng: cân cốc (hoặc bình chia độ) rỗng được $m_1$. Đổ chất lỏng vào bình chia độ, đọc thể tích $V$, đổ hết vào cốc rồi cân được $m_2$ (hoặc đổ thẳng vào bình chia độ đặt trên cân). Khối lượng chất lỏng $m = m_2 - m_1$; $D = \\dfrac{m}{V}$.',
            'Mỗi phép đo làm $3$ lần, ghi vào bảng, tính giá trị trung bình của $D$.',
          ],
        },
        {
          type: 'table',
          caption: 'Bảng ghi kết quả (mẫu, cho vật có hình dạng bất kì)',
          head: [
            'Lần đo',
            '$m$ (g)',
            '$V_1$ (mL)',
            '$V_2$ (mL)',
            '$V = V_2 - V_1$ ($\\text{cm}^3$)',
            '$D$ ($\\text{g/cm}^3$)',
          ],
          rows: [
            ['1', '...', '...', '...', '...', '...'],
            ['2', '...', '...', '...', '...', '...'],
            ['3', '...', '...', '...', '...', '...'],
          ],
        },
        {
          type: 'tex',
          tex: 'D_{\\text{tb}} = \\dfrac{D_1 + D_2 + D_3}{3}',
        },
        {
          type: 'p',
          text: 'Báo cáo: điền bảng kết quả cho từng vật; tính $D$ trung bình theo $\\text{g/cm}^3$ và đổi ra $\\text{kg/m}^3$; so sánh với bảng khối lượng riêng để đoán chất làm vật; nêu những nguyên nhân gây sai số (đọc vạch lệch, vật còn bọt khí bám, vật bị ướt khi cân, nước bắn ra ngoài khi thả vật) và cách khắc phục.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'An toàn',
          text: 'Thả vật nhẹ nhàng, nghiêng bình cho vật trượt theo thành bình để bình thủy tinh không vỡ và nước không bắn ra. Lau khô bàn và cân khi bị nước đổ.',
        },
      ],
    },
  ],
  explore: {
    title: 'Bàn thí nghiệm ảo',
    instruction:
      'Chọn một vật. Bấm "Đặt vật lên cân" và đọc khối lượng $m$. Đọc mực nước $V_1$ trong bình chia độ (dùng khung phóng to), rồi bấm "Thả vật vào bình chia độ" và đọc $V_2$. Điền bốn ô, tính $D = \\dfrac{m}{V_2 - V_1}$ theo $\\text{g/cm}^3$ và bấm "Kiểm tra số đo". Đổi vật khác và so sánh khối lượng riêng tìm được với bảng.',
  },
  examples: [
    {
      problem:
        'Một khối hộp chữ nhật có các cạnh đo được $5{,}0\\ \\text{cm}$, $4{,}0\\ \\text{cm}$, $2{,}0\\ \\text{cm}$ và khối lượng $108\\ \\text{g}$. Tính khối lượng riêng của chất làm khối hộp.',
      steps: [
        '$V = a \\cdot b \\cdot c = 5{,}0 \\cdot 4{,}0 \\cdot 2{,}0 = 40\\ \\text{cm}^3$.',
        '$D = \\dfrac{m}{V} = \\dfrac{108}{40} = 2{,}7\\ \\text{g/cm}^3 = 2700\\ \\text{kg/m}^3$.',
        'So với bảng khối lượng riêng: khối hộp có thể làm bằng nhôm.',
      ],
      answer: '$D = 2{,}7\\ \\text{g/cm}^3 = 2700\\ \\text{kg/m}^3$.',
    },
    {
      problem:
        'Một nhóm đo khối lượng riêng của hòn sỏi ba lần, được: lần 1: $m = 26{,}0\\ \\text{g}$, $V_1 = 50\\ \\text{mL}$, $V_2 = 60\\ \\text{mL}$; lần 2: $m = 26{,}2\\ \\text{g}$, $V_1 = 40\\ \\text{mL}$, $V_2 = 50\\ \\text{mL}$; lần 3: $m = 25{,}9\\ \\text{g}$, $V_1 = 60\\ \\text{mL}$, $V_2 = 70\\ \\text{mL}$. Tính khối lượng riêng trung bình của sỏi.',
      steps: [
        'Cả ba lần $V = V_2 - V_1 = 10\\ \\text{mL} = 10\\ \\text{cm}^3$.',
        '$D_1 = \\dfrac{26{,}0}{10} = 2{,}60\\ \\text{g/cm}^3$; $D_2 = \\dfrac{26{,}2}{10} = 2{,}62\\ \\text{g/cm}^3$; $D_3 = \\dfrac{25{,}9}{10} = 2{,}59\\ \\text{g/cm}^3$.',
        '$D_{\\text{tb}} = \\dfrac{2{,}60 + 2{,}62 + 2{,}59}{3} = \\dfrac{7{,}81}{3} \\approx 2{,}60\\ \\text{g/cm}^3$.',
      ],
      answer:
        'Khối lượng riêng trung bình của sỏi khoảng $2{,}60\\ \\text{g/cm}^3 = 2600\\ \\text{kg/m}^3$.',
    },
    {
      problem:
        'Cân một cốc rỗng được $50\\ \\text{g}$. Đổ vào bình chia độ $100\\ \\text{mL}$ dầu ăn rồi rót hết vào cốc, cân cả cốc và dầu được $130\\ \\text{g}$. Tính khối lượng riêng của dầu ăn.',
      steps: [
        'Khối lượng dầu: $m = m_2 - m_1 = 130 - 50 = 80\\ \\text{g}$.',
        'Thể tích dầu: $V = 100\\ \\text{mL} = 100\\ \\text{cm}^3$.',
        '$D = \\dfrac{80}{100} = 0{,}8\\ \\text{g/cm}^3 = 800\\ \\text{kg/m}^3$.',
      ],
      answer: 'Khối lượng riêng của dầu ăn là $0{,}8\\ \\text{g/cm}^3 = 800\\ \\text{kg/m}^3$.',
    },
  ],
  practice: [
    {
      type: 'order',
      prompt: 'Sắp xếp các bước xác định khối lượng riêng của một hòn sỏi theo đúng thứ tự.',
      items: [
        'Thả nhẹ hòn sỏi cho chìm hẳn trong nước, đọc mực nước $V_2$.',
        'Cân hòn sỏi khô, được khối lượng $m$.',
        'Tính $V = V_2 - V_1$ và $D = \\dfrac{m}{V}$.',
        'Đổ nước vào bình chia độ, đọc mực nước $V_1$.',
      ],
      answer: [1, 3, 0, 2],
      hints: ['Vật phải được cân khi còn khô.', 'Phải biết mực nước trước khi thả vật.'],
      solution:
        'Cân sỏi khô ($m$) → đọc $V_1$ → thả sỏi, đọc $V_2$ → tính $V = V_2 - V_1$ và $D = \\dfrac{m}{V}$.',
    },
    {
      type: 'number',
      prompt:
        'Một khối gỗ hình hộp chữ nhật có kích thước $10\\ \\text{cm} \\times 5\\ \\text{cm} \\times 4\\ \\text{cm}$ và khối lượng $160\\ \\text{g}$. Khối lượng riêng của gỗ là bao nhiêu $\\text{g/cm}^3$?',
      answer: 0.8,
      unit: 'g/cm³',
      hints: [
        'Tính thể tích $V = a \\cdot b \\cdot c$ theo $\\text{cm}^3$.',
        '$D = \\dfrac{m}{V}$.',
      ],
      solution:
        '$V = 10 \\cdot 5 \\cdot 4 = 200\\ \\text{cm}^3$; $D = \\dfrac{160}{200} = 0{,}8\\ \\text{g/cm}^3$.',
    },
    {
      type: 'number',
      prompt:
        'Một vật có khối lượng $39\\ \\text{g}$. Bình chia độ chỉ $55\\ \\text{mL}$ trước khi thả vật và $70\\ \\text{mL}$ khi vật chìm hẳn. Tính khối lượng riêng của vật theo $\\text{g/cm}^3$.',
      answer: 2.6,
      unit: 'g/cm³',
      hints: ['Thể tích vật bằng phần nước dâng lên.', '$1\\ \\text{mL} = 1\\ \\text{cm}^3$.'],
      solution:
        '$V = 70 - 55 = 15\\ \\text{cm}^3$; $D = \\dfrac{39}{15} = 2{,}6\\ \\text{g/cm}^3$.',
    },
    {
      type: 'choice',
      prompt: 'Vì sao phải cân vật trước khi thả vật vào bình chia độ?',
      options: [
        'Vì vật ướt có khối lượng đọc được lớn hơn khối lượng thật của vật.',
        'Vì nước làm vật nhẹ đi mãi mãi.',
        'Vì cân chỉ đo được vật khi vật còn nóng.',
        'Vì thứ tự các bước không ảnh hưởng gì, làm theo thói quen.',
      ],
      answer: 0,
      hints: ['Khi lấy vật ra khỏi nước, trên vật còn gì bám theo?'],
      solution:
        'Vật lấy ra từ nước còn nước bám vào; cân lúc đó được khối lượng của cả vật và nước bám, lớn hơn khối lượng thật, làm $D$ tính ra bị sai.',
    },
    {
      type: 'number',
      prompt:
        'Cân cốc rỗng được $60\\ \\text{g}$. Rót vào cốc $50\\ \\text{mL}$ một chất lỏng rồi cân được $99{,}5\\ \\text{g}$. Khối lượng riêng của chất lỏng là bao nhiêu $\\text{g/cm}^3$?',
      answer: 0.79,
      unit: 'g/cm³',
      hints: [
        'Khối lượng chất lỏng $m = m_2 - m_1$.',
        '$D = \\dfrac{m}{V}$ với $V = 50\\ \\text{cm}^3$.',
      ],
      solution:
        '$m = 99{,}5 - 60 = 39{,}5\\ \\text{g}$; $D = \\dfrac{39{,}5}{50} = 0{,}79\\ \\text{g/cm}^3$ (gần với khối lượng riêng của rượu).',
    },
    {
      type: 'number',
      prompt:
        'Ba lần đo khối lượng riêng của một con ốc được $7{,}7\\ \\text{g/cm}^3$, $7{,}9\\ \\text{g/cm}^3$ và $7{,}8\\ \\text{g/cm}^3$. Tính giá trị trung bình.',
      answer: 7.8,
      unit: 'g/cm³',
      hints: ['Cộng ba kết quả rồi chia cho $3$.'],
      solution:
        '$D_{\\text{tb}} = \\dfrac{7{,}7 + 7{,}9 + 7{,}8}{3} = \\dfrac{23{,}4}{3} = 7{,}8\\ \\text{g/cm}^3$, gần với khối lượng riêng của sắt.',
    },
    {
      type: 'multi',
      prompt: 'Những việc nào giúp giảm sai số khi đo thể tích bằng bình chia độ?',
      options: [
        'Đặt bình thẳng đứng, mắt nhìn ngang mực chất lỏng.',
        'Chọn bình có ĐCNN nhỏ, GHĐ phù hợp với vật.',
        'Thả mạnh vật từ trên cao cho nhanh chìm.',
        'Đo nhiều lần rồi lấy giá trị trung bình.',
      ],
      answers: [0, 1, 3],
      hints: ['Thả mạnh vật thì nước có thể bắn ra ngoài.'],
      solution:
        'Nhìn ngang mực chất lỏng, chọn bình ĐCNN nhỏ và GHĐ phù hợp, đo nhiều lần lấy trung bình đều giảm sai số. Thả mạnh vật làm nước bắn ra ngoài, $V_2$ đọc được nhỏ hơn thực tế.',
    },
  ],
  takeaways: [
    'Muốn xác định khối lượng riêng: đo $m$ bằng cân, đo $V$ rồi tính $D = \\dfrac{m}{V}$.',
    'Khối hộp: $V = a \\cdot b \\cdot c$; vật bất kì chìm trong nước: $V = V_2 - V_1$; chất lỏng: đọc trực tiếp trên bình chia độ, $m = m_2 - m_1$.',
    'Cân vật khô trước khi nhúng nước; đọc bình chia độ với mắt ngang mực chất lỏng.',
    'Đo nhiều lần, lấy giá trị trung bình rồi so với bảng khối lượng riêng.',
  ],
};
