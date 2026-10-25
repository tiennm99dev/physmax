/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Khối lượng là số đo lượng chất của một vật, đơn vị là kilôgam; bài học giới thiệu các loại cân, giới hạn đo và độ chia nhỏ nhất của cân, cách chỉnh cân về số 0, đặt vật, đọc và ghi kết quả đo khối lượng.',
  intro:
    'Ra chợ, mẹ mua một cân táo, hai lạng thịt và một bao gạo năm mươi cân. Người bán dùng những chiếc cân rất khác nhau: cân đồng hồ, cân điện tử, cân bàn. Vì sao mỗi việc lại cần một loại cân, và dùng cân thế nào để biết chính xác vật nặng bao nhiêu?',
  objectives: [
    'Nêu được khối lượng là gì và đơn vị đo khối lượng; đổi được giữa các đơn vị thường dùng.',
    'Kể được một số loại cân và xác định được GHĐ, ĐCNN của cân.',
    'Chọn được cân phù hợp với vật cần đo.',
    'Đo được khối lượng bằng cân theo đúng các bước: chỉnh về số 0, đặt vật, đặt mắt, đọc và ghi kết quả.',
  ],
  sections: [
    {
      heading: 'Khối lượng và đơn vị đo',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Khối lượng',
          text: 'Mọi vật đều có khối lượng. Khối lượng là số đo lượng chất của một vật.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Đơn vị đo khối lượng',
          text: 'Trong hệ đơn vị đo lường hợp pháp của nước ta, đơn vị cơ bản đo khối lượng là kilôgam, kí hiệu là $\\text{kg}$.',
        },
        {
          type: 'table',
          caption: 'Một số đơn vị đo khối lượng thường dùng',
          head: ['Đơn vị', 'Kí hiệu', 'Đổi'],
          rows: [
            ['tấn', '$\\text{t}$', '$1\\ \\text{tấn} = 1000\\ \\text{kg}$'],
            ['tạ', '—', '$1\\ \\text{tạ} = 100\\ \\text{kg}$'],
            ['yến', '—', '$1\\ \\text{yến} = 10\\ \\text{kg}$'],
            ['lạng', '—', '$1\\ \\text{lạng} = 100\\ \\text{g}$'],
            ['gam', '$\\text{g}$', '$1\\ \\text{g} = 0{,}001\\ \\text{kg}$'],
            ['miligam', '$\\text{mg}$', '$1\\ \\text{mg} = 0{,}001\\ \\text{g}$'],
          ],
        },
        {
          type: 'tex',
          tex: '1\\ \\text{kg} = 1000\\ \\text{g}, \\qquad 1\\ \\text{g} = 1000\\ \\text{mg}',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Em có biết?',
          text: 'Trong đời sống, người ta hay gọi kilôgam là "cân": "một cân táo" nghĩa là $1\\ \\text{kg}$ táo. Số ghi trên bao bì như "Khối lượng tịnh: $500\\ \\text{g}$" là khối lượng của chất đựng bên trong, không tính vỏ hộp.',
        },
      ],
    },
    {
      heading: 'Các loại cân',
      blocks: [
        {
          type: 'p',
          text: 'Dụng cụ đo khối lượng là cân. Tuỳ khối lượng của vật và độ chính xác cần có, người ta dùng các loại cân khác nhau:',
        },
        {
          type: 'table',
          head: ['Loại cân', 'Thường dùng để cân'],
          rows: [
            ['Cân đồng hồ', 'Vật nhỏ, từ vài chục gam đến vài kilôgam (rau, quả, thịt).'],
            [
              'Cân điện tử',
              'Vật rất nhỏ, từ vài miligam đến vài trăm gam, cần độ chính xác cao (hoá chất, vàng bạc).',
            ],
            ['Cân Roberval', 'Vật từ vài trăm gam đến vài chục kilôgam.'],
            ['Cân y tế (cân sức khoẻ)', 'Khối lượng cơ thể người.'],
            ['Cân tạ, cân đòn, cân bàn', 'Vật nặng như bao gạo, con lợn, hàng hoá.'],
          ],
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'GHĐ và ĐCNN của cân',
          text: 'Giới hạn đo (GHĐ) của cân là khối lượng lớn nhất ghi trên cân. Độ chia nhỏ nhất (ĐCNN) của cân là hiệu khối lượng giữa hai vạch chia liên tiếp trên mặt cân (với cân điện tử là bước nhảy nhỏ nhất của số hiển thị).',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Chọn cân phù hợp',
          text: 'Ước lượng khối lượng của vật, rồi chọn cân có GHĐ lớn hơn khối lượng đó và có ĐCNN thích hợp. Đặt vật nặng hơn GHĐ lên cân thì cân không đo được và có thể bị hỏng.',
        },
      ],
    },
    {
      heading: 'Cách đo khối lượng bằng cân',
      blocks: [
        {
          type: 'p',
          text: 'Để đo khối lượng bằng cân đồng hồ, ta thực hiện các bước:',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Ước lượng khối lượng của vật để chọn cân có GHĐ và ĐCNN thích hợp.',
            'Vặn ốc điều chỉnh để kim cân chỉ đúng vạch số $0$.',
            'Đặt vật lên đĩa cân.',
            'Mắt nhìn vuông góc với vạch chia trên mặt cân ở đầu kim cân.',
            'Đọc và ghi kết quả đo khi cân ổn định, theo vạch chia gần nhất với đầu kim.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Chưa chỉnh về số 0, đọc sai',
          text: 'Nếu khi đĩa trống kim đã chỉ $40\\ \\text{g}$ thì mọi số đọc đều lớn hơn khối lượng thật $40\\ \\text{g}$. Phải chỉnh kim về vạch $0$ khi đĩa cân còn trống.',
        },
        {
          type: 'p',
          text: 'Với cân điện tử: đặt cân trên mặt phẳng, bật cân, nhấn nút đưa số hiển thị về $0$ khi đĩa còn trống, đặt vật nhẹ nhàng vào giữa đĩa rồi đọc số trên màn hình khi số đã đứng yên. Nếu màn hình báo quá tải (như "O-Ld" hoặc "Err") thì vật đã nặng hơn GHĐ.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Đặt cân và đặt vật đúng cách',
          text: 'Đặt cân trên mặt bằng phẳng và đặt vật vào chính giữa đĩa cân. Cân trên mặt nghiêng hoặc để vật lệch một bên đều làm kết quả kém chính xác.',
        },
        { type: 'widget', name: 'cach-can' },
      ],
    },
  ],
  explore: {
    title: 'Cân đồng hồ và cân điện tử ảo',
    instruction:
      'Chọn vật cần cân và chọn cân. Khi đĩa còn trống, kim cân đồng hồ đang lệch khỏi vạch $0$ và cân điện tử chưa chỉ $0$: hãy vặn ốc điều chỉnh hoặc nhấn nút về $0$. Đặt vật lên đĩa, đọc số ở khung phóng to (hoặc trên màn hình), nhập kết quả bằng gam và nhấn "Ghi kết quả". Thử cân một vật bằng cả hai cân để thấy vai trò của GHĐ và ĐCNN, và thử ghi kết quả khi chưa chỉnh về $0$ để thấy sai số.',
  },
  examples: [
    {
      problem:
        'Trên mặt một cân đồng hồ, số lớn nhất ghi là $5\\ \\text{kg}$. Giữa vạch $0$ và vạch $0{,}1\\ \\text{kg}$ có $5$ khoảng chia bằng nhau. Xác định GHĐ và ĐCNN của cân.',
      steps: [
        'GHĐ là khối lượng lớn nhất ghi trên cân: $5\\ \\text{kg}$.',
        'Hai vạch $0$ và $0{,}1\\ \\text{kg}$ cách nhau $0{,}1\\ \\text{kg} = 100\\ \\text{g}$.',
        'Có $5$ khoảng chia nên mỗi khoảng là $100\\ \\text{g} : 5 = 20\\ \\text{g}$.',
      ],
      answer: 'GHĐ $= 5\\ \\text{kg}$, ĐCNN $= 20\\ \\text{g}$.',
    },
    {
      problem:
        'Bạn Minh quên chỉnh cân: khi đĩa cân trống, kim đã chỉ vạch $60\\ \\text{g}$. Đặt túi cam lên đĩa, kim chỉ $1{,}26\\ \\text{kg}$. Túi cam có khối lượng bao nhiêu?',
      steps: [
        'Khi đĩa trống kim đã chỉ $60\\ \\text{g}$, nên mọi số đọc đều lớn hơn khối lượng thật $60\\ \\text{g}$.',
        'Đổi $1{,}26\\ \\text{kg} = 1260\\ \\text{g}$.',
        'Khối lượng túi cam: $1260\\ \\text{g} - 60\\ \\text{g} = 1200\\ \\text{g} = 1{,}2\\ \\text{kg}$.',
        'Cách làm đúng là vặn ốc điều chỉnh để kim chỉ vạch $0$ trước khi đặt túi cam lên.',
      ],
      answer: 'Túi cam nặng $1{,}2\\ \\text{kg}$.',
    },
    {
      problem:
        'Cần cân một chiếc nhẫn (khoảng $4\\ \\text{g}$). Có hai cân: cân đồng hồ GHĐ $5\\ \\text{kg}$, ĐCNN $20\\ \\text{g}$ và cân điện tử GHĐ $200\\ \\text{g}$, ĐCNN $0{,}01\\ \\text{g}$. Nên dùng cân nào?',
      steps: [
        'Cả hai cân đều có GHĐ lớn hơn $4\\ \\text{g}$.',
        'ĐCNN của cân đồng hồ là $20\\ \\text{g}$, lớn hơn cả khối lượng chiếc nhẫn: kim gần như không nhích, không đọc được.',
        'Cân điện tử có ĐCNN $0{,}01\\ \\text{g}$, đọc được khối lượng nhẫn rất chính xác.',
      ],
      answer: 'Nên dùng cân điện tử.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Trong hệ đơn vị đo lường hợp pháp của nước ta, đơn vị cơ bản đo khối lượng là',
      options: ['gam (g)', 'kilôgam (kg)', 'tấn', 'lạng'],
      answer: 1,
      hints: ['"Một cân táo" trong đời sống chính là đơn vị này.'],
      solution:
        'Đơn vị cơ bản đo khối lượng là kilôgam ($\\text{kg}$); gam, tấn, lạng là các đơn vị khác thường dùng.',
    },
    {
      type: 'number',
      prompt: 'Đổi $3{,}5\\ \\text{kg}$ ra gam.',
      answer: 3500,
      unit: 'g',
      hints: ['$1\\ \\text{kg} = 1000\\ \\text{g}$.'],
      solution: '$3{,}5\\ \\text{kg} = 3{,}5 \\cdot 1000\\ \\text{g} = 3500\\ \\text{g}$.',
    },
    {
      type: 'number',
      prompt: 'Một con lợn nặng $1{,}2$ tạ. Con lợn nặng bao nhiêu kilôgam?',
      answer: 120,
      unit: 'kg',
      hints: ['$1\\ \\text{tạ} = 100\\ \\text{kg}$.'],
      solution: '$1{,}2\\ \\text{tạ} = 1{,}2 \\cdot 100\\ \\text{kg} = 120\\ \\text{kg}$.',
    },
    {
      type: 'number',
      prompt:
        'Mẹ mua $3$ lạng thịt và $1{,}5\\ \\text{kg}$ rau củ. Tổng khối lượng mẹ mua là bao nhiêu gam?',
      answer: 1800,
      unit: 'g',
      hints: [
        '$1\\ \\text{lạng} = 100\\ \\text{g}$, $1\\ \\text{kg} = 1000\\ \\text{g}$.',
        'Đổi cả hai về gam rồi cộng.',
      ],
      solution:
        '$3\\ \\text{lạng} = 300\\ \\text{g}$; $1{,}5\\ \\text{kg} = 1500\\ \\text{g}$. Tổng: $300 + 1500 = 1800\\ \\text{g}$.',
    },
    {
      type: 'order',
      prompt: 'Sắp xếp các bước đo khối lượng bằng cân đồng hồ theo đúng thứ tự.',
      items: [
        'Đặt vật lên đĩa cân',
        'Đọc và ghi kết quả khi cân ổn định',
        'Ước lượng khối lượng để chọn cân phù hợp',
        'Mắt nhìn vuông góc với vạch chia ở đầu kim',
        'Vặn ốc điều chỉnh cho kim chỉ đúng vạch 0',
      ],
      answer: [2, 4, 0, 3, 1],
      hints: [
        'Phải chọn cân trước, chỉnh kim về 0 khi đĩa còn trống.',
        'Đặt mắt đúng rồi mới đọc.',
      ],
      solution:
        'Ước lượng, chọn cân → vặn ốc cho kim chỉ vạch 0 → đặt vật lên đĩa → mắt nhìn vuông góc với vạch chia ở đầu kim → đọc và ghi kết quả.',
    },
    {
      type: 'number',
      prompt:
        'Khi đĩa cân còn trống, kim cân đồng hồ đã chỉ vạch $40\\ \\text{g}$. Đặt gói bánh lên đĩa, kim chỉ $540\\ \\text{g}$. Khối lượng thật của gói bánh là bao nhiêu gam?',
      answer: 500,
      unit: 'g',
      hints: ['Số đọc đã cộng thêm phần kim lệch khi đĩa trống.'],
      solution:
        'Mọi số đọc đều lớn hơn khối lượng thật $40\\ \\text{g}$, nên gói bánh nặng $540 - 40 = 500\\ \\text{g}$.',
    },
    {
      type: 'choice',
      prompt:
        'Một cân đồng hồ có ĐCNN $50\\ \\text{g}$. Kết quả nào dưới đây được ghi đúng khi dùng cân này?',
      options: [
        '$1230\\ \\text{g}$',
        '$1250\\ \\text{g}$',
        '$1245\\ \\text{g}$',
        '$1260\\ \\text{g}$',
      ],
      answer: 1,
      hints: ['Kết quả đọc theo vạch chia nên phải là bội của ĐCNN.'],
      solution:
        'Các vạch chia của cân ứng với $\\ldots;\\ 1200\\ \\text{g};\\ 1250\\ \\text{g};\\ 1300\\ \\text{g};\\ldots$ Chỉ $1250\\ \\text{g}$ là bội của $50\\ \\text{g}$.',
    },
    {
      type: 'choice',
      prompt: 'Để cân một bạn học sinh lớp 6 (khoảng $40\\ \\text{kg}$), nên dùng cân nào?',
      options: [
        'Cân điện tử GHĐ $500\\ \\text{g}$, ĐCNN $0{,}1\\ \\text{g}$',
        'Cân đồng hồ GHĐ $5\\ \\text{kg}$, ĐCNN $20\\ \\text{g}$',
        'Cân y tế GHĐ $120\\ \\text{kg}$, ĐCNN $0{,}5\\ \\text{kg}$',
        'Cân tạ GHĐ $1$ tấn, ĐCNN $5\\ \\text{kg}$',
      ],
      answer: 2,
      hints: [
        'Loại hai cân có GHĐ nhỏ hơn $40\\ \\text{kg}$.',
        'Trong các cân còn lại, chọn cân có ĐCNN nhỏ hơn.',
      ],
      solution:
        'Cân điện tử ($0{,}5\\ \\text{kg}$) và cân đồng hồ ($5\\ \\text{kg}$) có GHĐ quá nhỏ. Cân y tế và cân tạ đều cân được, nhưng cân y tế có ĐCNN $0{,}5\\ \\text{kg}$ nhỏ hơn nhiều so với $5\\ \\text{kg}$, lại được làm để cân người.',
    },
    {
      type: 'multi',
      prompt: 'Những cách làm nào là đúng khi đo khối lượng bằng cân?',
      options: [
        'Đặt cân trên mặt bàn bằng phẳng',
        'Đặt vật lệch về một bên đĩa cân cho dễ nhìn',
        'Chỉnh cân về số $0$ khi đĩa còn trống',
        'Đọc kết quả ngay khi kim còn đang dao động',
        'Đọc kết quả theo vạch chia gần nhất với đầu kim',
      ],
      answers: [0, 2, 4],
      hints: ['Kết quả chỉ đáng tin khi cân đứng yên, vật nằm giữa đĩa.'],
      solution:
        'Đúng: đặt cân trên mặt phẳng, chỉnh về $0$ khi đĩa trống, đọc theo vạch gần nhất với đầu kim. Sai: đặt vật lệch một bên và đọc khi kim còn dao động; phải đặt vật vào giữa đĩa và đọc khi cân đã ổn định.',
    },
  ],
  takeaways: [
    'Khối lượng là số đo lượng chất của một vật; đơn vị cơ bản là kilôgam ($\\text{kg}$).',
    '$1\\ \\text{tấn} = 1000\\ \\text{kg}$, $1\\ \\text{tạ} = 100\\ \\text{kg}$, $1\\ \\text{yến} = 10\\ \\text{kg}$, $1\\ \\text{kg} = 1000\\ \\text{g}$, $1\\ \\text{g} = 1000\\ \\text{mg}$.',
    'Dụng cụ đo khối lượng là cân; chọn cân có GHĐ lớn hơn khối lượng vật và ĐCNN thích hợp.',
    'Chỉnh cân về số $0$ khi đĩa trống, đặt vật vào giữa đĩa, mắt nhìn vuông góc, đọc và ghi kết quả khi cân ổn định.',
  ],
};
