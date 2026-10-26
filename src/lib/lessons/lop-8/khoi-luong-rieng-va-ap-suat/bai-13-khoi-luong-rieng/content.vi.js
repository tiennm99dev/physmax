/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Khối lượng riêng của một chất là khối lượng của một đơn vị thể tích chất đó, D = m/V, đơn vị kg/m³ hoặc g/cm³; biết khối lượng riêng thì tính được khối lượng, thể tích của vật và nhận biết được chất làm vật.',
  intro:
    'Một khối sắt và một khối nhôm to bằng nhau, nhấc lên thì khối sắt nặng hơn hẳn. Một thỏi sắt nhỏ và một cánh cửa sắt có khối lượng khác xa nhau, nhưng cùng làm bằng sắt. Đại lượng nào cho biết chất này "nặng" hơn chất kia, không phụ thuộc vật to hay nhỏ?',
  objectives: [
    'Nêu được định nghĩa khối lượng riêng và công thức $D = \\dfrac{m}{V}$.',
    'Nêu được đơn vị khối lượng riêng là $\\text{kg/m}^3$; đổi được sang $\\text{g/cm}^3$ và ngược lại.',
    'Tra được bảng khối lượng riêng; tính được khối lượng, thể tích của vật khi biết khối lượng riêng và nhận biết được chất làm vật.',
  ],
  sections: [
    {
      heading: 'Khối lượng riêng',
      blocks: [
        {
          type: 'p',
          text: 'Cân các khối sắt có thể tích khác nhau: khối $1\\ \\text{cm}^3$ có khối lượng $7{,}8\\ \\text{g}$, khối $2\\ \\text{cm}^3$ có khối lượng $15{,}6\\ \\text{g}$, khối $10\\ \\text{cm}^3$ có khối lượng $78\\ \\text{g}$. Thể tích tăng bao nhiêu lần thì khối lượng tăng bấy nhiêu lần, nên tỉ số khối lượng trên thể tích luôn bằng $7{,}8\\ \\text{g/cm}^3$. Làm như vậy với nhôm, tỉ số luôn bằng $2{,}7\\ \\text{g/cm}^3$.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Khối lượng riêng',
          text: 'Khối lượng riêng của một chất là khối lượng của một đơn vị thể tích chất đó.',
        },
        {
          type: 'tex',
          tex: 'D = \\dfrac{m}{V}',
        },
        {
          type: 'list',
          items: [
            '$D$ là khối lượng riêng của chất làm vật;',
            '$m$ là khối lượng của vật;',
            '$V$ là thể tích của vật.',
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Mỗi chất có một khối lượng riêng',
          text: 'Với cùng một chất (ở cùng điều kiện), khối lượng của vật tỉ lệ thuận với thể tích, nên $D$ không đổi dù vật to hay nhỏ. Cắt đôi một thanh sắt thì khối lượng và thể tích đều giảm một nửa, còn khối lượng riêng vẫn là của sắt.',
        },
      ],
    },
    {
      heading: 'Đơn vị khối lượng riêng',
      blocks: [
        {
          type: 'p',
          text: 'Trong hệ SI, khối lượng đo bằng $\\text{kg}$, thể tích đo bằng $\\text{m}^3$, nên đơn vị khối lượng riêng là kilôgam trên mét khối ($\\text{kg/m}^3$). Ngoài ra còn dùng gam trên centimét khối ($\\text{g/cm}^3$) hay gam trên mililít ($\\text{g/mL}$), vì $1\\ \\text{mL} = 1\\ \\text{cm}^3$.',
        },
        {
          type: 'tex',
          tex: '1\\ \\text{g/cm}^3 = \\dfrac{0{,}001\\ \\text{kg}}{0{,}000\\,001\\ \\text{m}^3} = 1000\\ \\text{kg/m}^3',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Đổi đơn vị trước khi tính',
          text: 'Muốn $D$ ra $\\text{kg/m}^3$ thì $m$ phải ở $\\text{kg}$, $V$ ở $\\text{m}^3$; muốn $D$ ra $\\text{g/cm}^3$ thì $m$ ở $\\text{g}$, $V$ ở $\\text{cm}^3$. Nhớ: $1\\ \\text{L} = 1\\ \\text{dm}^3 = 0{,}001\\ \\text{m}^3$.',
        },
      ],
    },
    {
      heading: 'Bảng khối lượng riêng của một số chất',
      blocks: [
        {
          type: 'table',
          caption: 'Khối lượng riêng của một số chất (giá trị gần đúng, ở nhiệt độ phòng)',
          head: ['Chất rắn', '$D$ ($\\text{kg/m}^3$)', 'Chất lỏng', '$D$ ($\\text{kg/m}^3$)'],
          rows: [
            ['Chì', '$11\\,300$', 'Thủy ngân', '$13\\,600$'],
            ['Đồng', '$8900$', 'Nước', '$1000$'],
            ['Sắt, thép', '$7800$', 'Dầu ăn', '$\\approx 800$'],
            ['Nhôm', '$2700$', 'Dầu hỏa', '$\\approx 800$'],
            ['Đá', '$\\approx 2600$', 'Rượu, cồn', '$\\approx 790$'],
            ['Nước đá', '$900$', 'Xăng', '$\\approx 700$'],
            ['Gỗ tốt', '$\\approx 800$', 'Không khí (chất khí)', '$\\approx 1{,}29$'],
          ],
        },
        {
          type: 'p',
          text: 'Từ công thức $D = \\dfrac{m}{V}$ suy ra hai công thức dùng nhiều trong bài tập:',
        },
        {
          type: 'tex',
          tex: 'm = D \\cdot V \\qquad\\qquad V = \\dfrac{m}{D}',
        },
        {
          type: 'list',
          items: [
            'Biết chất làm vật (tra $D$) và thể tích, tính được khối lượng mà không cần cân, ví dụ khối lượng một cột đá, một dầm sắt.',
            'Biết khối lượng và $D$, tính được thể tích, ví dụ thể tích của một can dầu.',
            'Đo $m$ và $V$, tính $D$ rồi so với bảng để biết vật làm bằng chất gì.',
          ],
        },
      ],
    },
  ],
  explore: {
    title: 'Khối vật liệu đổi kích thước',
    instruction:
      'Chọn chất làm khối rồi kéo ba thanh trượt để đổi chiều dài, chiều rộng, chiều cao. Cân điện tử cho khối lượng $m$, thể tích $V$ tính từ ba cạnh. Ghi ít nhất ba lần đo với ba kích thước khác nhau vào bảng: $m$ và $V$ thay đổi, còn $\\dfrac{m}{V}$ thì sao? Các điểm trên đồ thị $m$ theo $V$ xếp thế nào? Sau đó chuyển sang "Khối bí ẩn", đo và tính $\\dfrac{m}{V}$ để đoán khối làm bằng chất gì.',
  },
  examples: [
    {
      problem:
        'Một khối kim loại đặc có khối lượng $540\\ \\text{g}$ và thể tích $200\\ \\text{cm}^3$. Tính khối lượng riêng của kim loại theo $\\text{g/cm}^3$ và $\\text{kg/m}^3$. Khối làm bằng kim loại gì?',
      steps: [
        '$D = \\dfrac{m}{V} = \\dfrac{540}{200} = 2{,}7\\ \\text{g/cm}^3$.',
        'Đổi đơn vị: $2{,}7\\ \\text{g/cm}^3 = 2{,}7 \\cdot 1000 = 2700\\ \\text{kg/m}^3$.',
        'Tra bảng: $2700\\ \\text{kg/m}^3$ là khối lượng riêng của nhôm.',
      ],
      answer: '$D = 2{,}7\\ \\text{g/cm}^3 = 2700\\ \\text{kg/m}^3$; khối làm bằng nhôm.',
    },
    {
      problem:
        'Một dầm sắt có thể tích $40\\ \\text{dm}^3$. Tính khối lượng của dầm, biết khối lượng riêng của sắt là $7800\\ \\text{kg/m}^3$.',
      steps: [
        'Đổi $V = 40\\ \\text{dm}^3 = 0{,}04\\ \\text{m}^3$.',
        'Từ $D = \\dfrac{m}{V}$ suy ra $m = D \\cdot V$.',
        '$m = 7800 \\cdot 0{,}04 = 312\\ \\text{kg}$.',
      ],
      answer: 'Dầm sắt có khối lượng $312\\ \\text{kg}$.',
    },
    {
      problem:
        'Cần một can có dung tích ít nhất bao nhiêu lít để chứa $1{,}6\\ \\text{kg}$ dầu hỏa? Biết khối lượng riêng của dầu hỏa là $800\\ \\text{kg/m}^3$.',
      steps: [
        'Từ $D = \\dfrac{m}{V}$ suy ra $V = \\dfrac{m}{D}$.',
        '$V = \\dfrac{1{,}6}{800} = 0{,}002\\ \\text{m}^3$.',
        'Đổi: $0{,}002\\ \\text{m}^3 = 2\\ \\text{dm}^3 = 2\\ \\text{L}$.',
      ],
      answer: 'Can phải chứa được ít nhất $2$ lít.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt:
        'Công thức tính khối lượng riêng $D$ của một chất theo khối lượng $m$ và thể tích $V$ của vật là',
      options: ['$D = m \\cdot V$', '$D = \\dfrac{m}{V}$', '$D = \\dfrac{V}{m}$', '$D = 10m$'],
      answer: 1,
      hints: ['Khối lượng riêng là khối lượng của một đơn vị thể tích.'],
      solution:
        'Khối lượng của một đơn vị thể tích bằng khối lượng chia cho thể tích: $D = \\dfrac{m}{V}$.',
    },
    {
      type: 'number',
      prompt:
        'Một khúc gỗ có thể tích $0{,}05\\ \\text{m}^3$ và khối lượng $40\\ \\text{kg}$. Tính khối lượng riêng của gỗ (theo $\\text{kg/m}^3$).',
      answer: 800,
      unit: 'kg/m³',
      hints: ['Dùng $D = \\dfrac{m}{V}$ với $m$ ở $\\text{kg}$ và $V$ ở $\\text{m}^3$.'],
      solution: '$D = \\dfrac{40}{0{,}05} = 800\\ \\text{kg/m}^3$.',
    },
    {
      type: 'number',
      prompt: 'Đổi $2{,}7\\ \\text{g/cm}^3$ ra $\\text{kg/m}^3$.',
      answer: 2700,
      unit: 'kg/m³',
      hints: ['$1\\ \\text{g/cm}^3 = 1000\\ \\text{kg/m}^3$.'],
      solution: '$2{,}7\\ \\text{g/cm}^3 = 2{,}7 \\cdot 1000 = 2700\\ \\text{kg/m}^3$.',
    },
    {
      type: 'number',
      prompt:
        'Tính khối lượng của $2$ lít nước, biết khối lượng riêng của nước là $1000\\ \\text{kg/m}^3$.',
      answer: 2,
      unit: 'kg',
      hints: [
        'Đổi thể tích ra mét khối: $1\\ \\text{L} = 1\\ \\text{dm}^3 = 0{,}001\\ \\text{m}^3$.',
        'Dùng $m = D \\cdot V$.',
      ],
      solution:
        '$V = 2\\ \\text{L} = 0{,}002\\ \\text{m}^3$; $m = 1000 \\cdot 0{,}002 = 2\\ \\text{kg}$.',
    },
    {
      type: 'number',
      prompt:
        'Một bức tượng đồng đặc có thể tích $0{,}02\\ \\text{m}^3$. Khối lượng riêng của đồng là $8900\\ \\text{kg/m}^3$. Tính khối lượng của bức tượng.',
      answer: 178,
      unit: 'kg',
      hints: ['$m = D \\cdot V$.'],
      solution: '$m = 8900 \\cdot 0{,}02 = 178\\ \\text{kg}$.',
    },
    {
      type: 'number',
      prompt:
        'Một khối sắt đặc có khối lượng $15{,}6\\ \\text{kg}$. Thể tích của khối sắt là bao nhiêu đềximét khối? Biết khối lượng riêng của sắt là $7800\\ \\text{kg/m}^3$.',
      answer: 2,
      unit: 'dm³',
      hints: [
        '$V = \\dfrac{m}{D}$ cho kết quả theo $\\text{m}^3$.',
        '$1\\ \\text{m}^3 = 1000\\ \\text{dm}^3$.',
      ],
      solution: '$V = \\dfrac{15{,}6}{7800} = 0{,}002\\ \\text{m}^3 = 2\\ \\text{dm}^3$.',
    },
    {
      type: 'choice',
      prompt:
        'Một khối kim loại hình hộp chữ nhật kích thước $3\\ \\text{cm} \\times 2\\ \\text{cm} \\times 5\\ \\text{cm}$ có khối lượng $267\\ \\text{g}$. Dựa vào bảng khối lượng riêng, khối làm bằng',
      options: ['nhôm', 'sắt', 'đồng', 'chì'],
      answer: 2,
      hints: [
        'Tính thể tích hình hộp: $V = 3 \\cdot 2 \\cdot 5$.',
        'Tính $D = \\dfrac{m}{V}$ theo $\\text{g/cm}^3$ rồi đổi ra $\\text{kg/m}^3$ để tra bảng.',
      ],
      solution:
        '$V = 3 \\cdot 2 \\cdot 5 = 30\\ \\text{cm}^3$; $D = \\dfrac{267}{30} = 8{,}9\\ \\text{g/cm}^3 = 8900\\ \\text{kg/m}^3$: đó là đồng.',
    },
    {
      type: 'multi',
      prompt: 'Những câu nào đúng?',
      options: [
        'Cắt đôi một thanh nhôm thì khối lượng riêng của mỗi nửa vẫn là $2700\\ \\text{kg/m}^3$.',
        'Vật có khối lượng càng lớn thì chất làm vật có khối lượng riêng càng lớn.',
        '$1\\ \\text{g/cm}^3 = 1000\\ \\text{kg/m}^3$.',
        'Hai vật đặc cùng thể tích, vật bằng chì có khối lượng lớn hơn vật bằng nhôm.',
      ],
      answers: [0, 2, 3],
      hints: [
        'Khối lượng riêng là đặc trưng của chất, không phụ thuộc vật to hay nhỏ.',
        'Một cánh cửa sắt và một chiếc đinh sắt có cùng khối lượng riêng không?',
      ],
      solution:
        'Khối lượng riêng là của chất, không đổi khi cắt vật; $1\\ \\text{g/cm}^3 = 1000\\ \\text{kg/m}^3$; cùng thể tích thì $m = D \\cdot V$ lớn hơn với chì ($11\\,300\\ \\text{kg/m}^3$) so với nhôm ($2700\\ \\text{kg/m}^3$). Câu thứ hai sai: một cánh cửa gỗ to nặng hơn chiếc đinh sắt nhưng gỗ có khối lượng riêng nhỏ hơn sắt.',
    },
    {
      type: 'choice',
      prompt:
        'Hai khối đặc, một bằng nhôm, một bằng sắt, có cùng khối lượng $1\\ \\text{kg}$. Khối nào có thể tích lớn hơn?',
      options: [
        'Khối nhôm',
        'Khối sắt',
        'Hai khối có thể tích bằng nhau',
        'Không đủ dữ kiện để so sánh',
      ],
      answer: 0,
      hints: ['Dùng $V = \\dfrac{m}{D}$: cùng $m$, chất nào có $D$ nhỏ hơn?'],
      solution:
        'Cùng $m$, $V = \\dfrac{m}{D}$ lớn hơn khi $D$ nhỏ hơn. Nhôm ($2700\\ \\text{kg/m}^3$) có $D$ nhỏ hơn sắt ($7800\\ \\text{kg/m}^3$) nên khối nhôm to hơn.',
    },
  ],
  takeaways: [
    'Khối lượng riêng của một chất là khối lượng của một đơn vị thể tích chất đó: $D = \\dfrac{m}{V}$.',
    'Đơn vị: $\\text{kg/m}^3$; ngoài ra $\\text{g/cm}^3$ ($= \\text{g/mL}$), với $1\\ \\text{g/cm}^3 = 1000\\ \\text{kg/m}^3$.',
    'Mỗi chất có một khối lượng riêng xác định (tra bảng), không phụ thuộc kích thước vật.',
    'Dùng $m = D \\cdot V$ và $V = \\dfrac{m}{D}$ để tính khối lượng, thể tích; đo $m$, $V$ rồi tính $D$ để nhận biết chất.',
  ],
};
