/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Áp lực là lực ép có phương vuông góc với mặt bị ép; áp suất là độ lớn của áp lực trên một đơn vị diện tích bị ép, p = F/S, đơn vị N/m² hay paxcan (Pa); muốn tăng áp suất thì tăng áp lực hoặc giảm diện tích bị ép, và ngược lại.',
  intro:
    'Một chiếc xe tăng nặng hàng chục tấn đi qua bãi lầy mà không bị sa lầy, trong khi chiếc ô tô nhẹ hơn nhiều lại dễ bị lún bánh. Lưỡi dao sắc cắt dễ hơn lưỡi dao cùn dù ta ấn cùng một lực. Tác dụng của một lực ép lên mặt bị ép phụ thuộc vào những gì?',
  objectives: [
    'Nêu được áp lực là lực ép có phương vuông góc với mặt bị ép.',
    'Nêu được áp suất là độ lớn của áp lực trên một đơn vị diện tích bị ép; viết được công thức $p = \\dfrac{F}{S}$ và đơn vị $\\text{N/m}^2$, $\\text{Pa}$.',
    'Vận dụng công thức tính áp suất; giải thích được các cách làm tăng, giảm áp suất trong đời sống và kĩ thuật.',
  ],
  sections: [
    {
      heading: 'Áp lực',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Áp lực',
          text: 'Áp lực là lực ép có phương vuông góc với mặt bị ép.',
        },
        {
          type: 'list',
          items: [
            'Người đứng trên sàn nhà: trọng lượng của người ép lên sàn theo phương thẳng đứng, vuông góc với sàn, là áp lực.',
            'Ngón tay ấn đầu đinh ghim vào bảng gỗ: lực ấn vuông góc với mặt bảng là áp lực.',
            'Lực kéo một khúc gỗ trượt trên mặt sàn có phương song song với mặt sàn nên không phải là áp lực lên sàn.',
          ],
        },
      ],
    },
    {
      heading: 'Áp suất',
      blocks: [
        {
          type: 'p',
          text: 'Thí nghiệm: đặt một khối hộp kim loại lên mặt bột mịn (hoặc cát) phẳng theo các cách khác nhau, có khi chồng thêm một khối nữa, rồi so sánh độ lún. Kết quả: cùng diện tích bị ép, áp lực càng lớn thì độ lún càng lớn; cùng áp lực, diện tích bị ép càng nhỏ thì độ lún càng lớn.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Áp suất',
          text: 'Áp suất là độ lớn của áp lực trên một đơn vị diện tích bị ép.',
        },
        { type: 'tex', tex: 'p = \\dfrac{F}{S}' },
        {
          type: 'list',
          items: [
            '$p$ là áp suất;',
            '$F$ là áp lực tác dụng lên mặt bị ép, đơn vị $\\text{N}$;',
            '$S$ là diện tích bị ép, đơn vị $\\text{m}^2$.',
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Đơn vị áp suất',
          text: 'Đơn vị áp suất là niutơn trên mét vuông ($\\text{N/m}^2$), còn gọi là paxcan ($\\text{Pa}$): $1\\ \\text{Pa} = 1\\ \\text{N/m}^2$. Ngoài ra còn dùng bar ($1\\ \\text{bar} = 100\\,000\\ \\text{Pa}$) và atmôtphe ($1\\ \\text{atm} \\approx 101\\,300\\ \\text{Pa}$).',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Đổi diện tích ra mét vuông',
          text: '$1\\ \\text{cm}^2 = 0{,}0001\\ \\text{m}^2$ và $1\\ \\text{mm}^2 = 0{,}000\\,001\\ \\text{m}^2$. Quên đổi đơn vị diện tích là lỗi hay gặp nhất khi tính áp suất.',
        },
      ],
    },
    {
      heading: 'Tăng, giảm áp suất',
      blocks: [
        {
          type: 'p',
          text: 'Từ $p = \\dfrac{F}{S}$: áp suất tăng khi áp lực tăng hoặc diện tích bị ép giảm; áp suất giảm khi áp lực giảm hoặc diện tích bị ép tăng.',
        },
        {
          type: 'table',
          head: ['Mục đích', 'Cách làm', 'Ví dụ'],
          rows: [
            [
              'Tăng áp suất',
              'Tăng áp lực, giảm diện tích bị ép (hoặc cả hai)',
              'Mài dao cho sắc, đầu đinh và mũi khoan nhọn, ấn mạnh tay khi cắt',
            ],
            [
              'Giảm áp suất',
              'Giảm áp lực, tăng diện tích bị ép (hoặc cả hai)',
              'Móng nhà xây rộng hơn tường, xe tăng chạy bằng xích, lót tấm ván khi đi trên bùn, quai ba lô bản to',
            ],
          ],
        },
        {
          type: 'p',
          text: 'Xe tăng nặng nhưng xích có diện tích tiếp xúc rất lớn nên áp suất lên mặt đất nhỏ, không bị lún; ô tô nhẹ hơn nhưng chỉ tiếp xúc ở bốn bánh, áp suất lớn hơn nên dễ sa lầy.',
        },
      ],
    },
  ],
  explore: {
    title: 'Gạch trên nền cát',
    instruction:
      'Chọn mặt gạch tiếp xúc với cát (nằm, nghiêng, đứng) và số viên gạch chồng lên nhau. Quan sát áp lực $F$, diện tích bị ép $S$, áp suất $p$ và độ lún. Giữ nguyên số gạch, đổi mặt đặt: $p$ thay đổi thế nào? Giữ nguyên mặt đặt, thêm gạch: $p$ thay đổi thế nào? Sau đó bấm "Bắt đầu thử thách" để đạt đúng áp suất cho trước.',
  },
  examples: [
    {
      problem:
        'Một bạn học sinh có khối lượng $50\\ \\text{kg}$ đứng trên sàn nhà. Diện tích tiếp xúc của hai bàn chân với sàn là $0{,}04\\ \\text{m}^2$. Tính áp suất bạn tác dụng lên sàn.',
      steps: [
        'Áp lực bằng trọng lượng của bạn: $F = P = 10m = 10 \\cdot 50 = 500\\ \\text{N}$.',
        '$p = \\dfrac{F}{S} = \\dfrac{500}{0{,}04} = 12\\,500\\ \\text{Pa}$.',
      ],
      answer: 'Áp suất lên sàn là $12\\,500\\ \\text{Pa}$.',
    },
    {
      problem:
        'Một viên gạch kích thước $20\\ \\text{cm} \\times 10\\ \\text{cm} \\times 5\\ \\text{cm}$ có trọng lượng $20\\ \\text{N}$. Tính áp suất viên gạch tác dụng lên mặt sàn khi đặt nằm (mặt $20\\ \\text{cm} \\times 10\\ \\text{cm}$) và khi đặt đứng (mặt $10\\ \\text{cm} \\times 5\\ \\text{cm}$).',
      steps: [
        'Hai trường hợp áp lực như nhau: $F = 20\\ \\text{N}$.',
        'Đặt nằm: $S_1 = 20 \\cdot 10 = 200\\ \\text{cm}^2 = 0{,}02\\ \\text{m}^2$, $p_1 = \\dfrac{20}{0{,}02} = 1000\\ \\text{Pa}$.',
        'Đặt đứng: $S_2 = 10 \\cdot 5 = 50\\ \\text{cm}^2 = 0{,}005\\ \\text{m}^2$, $p_2 = \\dfrac{20}{0{,}005} = 4000\\ \\text{Pa}$.',
        'Diện tích bị ép nhỏ đi $4$ lần thì áp suất lớn lên $4$ lần.',
      ],
      answer: 'Đặt nằm: $1000\\ \\text{Pa}$; đặt đứng: $4000\\ \\text{Pa}$.',
    },
    {
      problem:
        'Một xe tăng có trọng lượng $340\\,000\\ \\text{N}$, diện tích tiếp xúc của hai bản xích với mặt đất là $1{,}5\\ \\text{m}^2$. Một ô tô có trọng lượng $20\\,000\\ \\text{N}$, diện tích tiếp xúc của bốn bánh với mặt đất là $250\\ \\text{cm}^2$. So sánh áp suất của xe tăng và ô tô lên mặt đất.',
      steps: [
        'Xe tăng: $p_1 = \\dfrac{340\\,000}{1{,}5} \\approx 226\\,667\\ \\text{Pa}$.',
        'Ô tô: $S_2 = 250\\ \\text{cm}^2 = 0{,}025\\ \\text{m}^2$, $p_2 = \\dfrac{20\\,000}{0{,}025} = 800\\,000\\ \\text{Pa}$.',
        '$p_2 > p_1$: ô tô nhẹ hơn rất nhiều nhưng gây áp suất lớn hơn khoảng $3{,}5$ lần.',
      ],
      answer:
        'Áp suất của ô tô lên mặt đất lớn hơn của xe tăng, nên ô tô dễ bị lún trên đất mềm hơn xe tăng.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Áp lực là',
      options: [
        'lực ép có phương song song với mặt bị ép',
        'lực ép có phương vuông góc với mặt bị ép',
        'lực kéo vật chuyển động trên mặt sàn',
        'trọng lượng của mọi vật',
      ],
      answer: 1,
      hints: ['Áp lực "ép" vào mặt bị ép theo phương nào?'],
      solution: 'Áp lực là lực ép có phương vuông góc với mặt bị ép.',
    },
    {
      type: 'choice',
      prompt: 'Đơn vị nào sau đây là đơn vị của áp suất?',
      options: [
        '$\\text{N}$',
        '$\\text{N/m}^2$',
        '$\\text{kg/m}^3$',
        '$\\text{N} \\cdot \\text{m}^2$',
      ],
      answer: 1,
      hints: ['$p = \\dfrac{F}{S}$: lấy đơn vị lực chia cho đơn vị diện tích.'],
      solution:
        'Đơn vị áp suất là $\\text{N/m}^2$, còn gọi là paxcan: $1\\ \\text{Pa} = 1\\ \\text{N/m}^2$.',
    },
    {
      type: 'number',
      prompt:
        'Một thùng hàng có trọng lượng $600\\ \\text{N}$ đặt trên sàn, diện tích tiếp xúc với sàn là $0{,}3\\ \\text{m}^2$. Tính áp suất thùng hàng tác dụng lên sàn.',
      answer: 2000,
      unit: 'Pa',
      hints: ['Áp lực bằng trọng lượng thùng hàng.', '$p = \\dfrac{F}{S}$.'],
      solution: '$p = \\dfrac{600}{0{,}3} = 2000\\ \\text{Pa}$.',
    },
    {
      type: 'number',
      prompt:
        'Một cái bàn có trọng lượng $200\\ \\text{N}$ đứng trên bốn chân, diện tích tiếp xúc của mỗi chân với sàn là $10\\ \\text{cm}^2$. Tính áp suất của bàn lên sàn.',
      answer: 50000,
      unit: 'Pa',
      hints: [
        'Diện tích bị ép là tổng diện tích của bốn chân.',
        'Đổi $\\text{cm}^2$ ra $\\text{m}^2$: $1\\ \\text{cm}^2 = 0{,}0001\\ \\text{m}^2$.',
      ],
      solution:
        '$S = 4 \\cdot 10 = 40\\ \\text{cm}^2 = 0{,}004\\ \\text{m}^2$; $p = \\dfrac{200}{0{,}004} = 50\\,000\\ \\text{Pa}$.',
    },
    {
      type: 'number',
      prompt:
        'Một vật tác dụng lên mặt bàn một áp suất $1500\\ \\text{Pa}$, diện tích bị ép là $0{,}2\\ \\text{m}^2$. Tính áp lực của vật lên mặt bàn.',
      answer: 300,
      unit: 'N',
      hints: ['Từ $p = \\dfrac{F}{S}$ suy ra $F = p \\cdot S$.'],
      solution: '$F = p \\cdot S = 1500 \\cdot 0{,}2 = 300\\ \\text{N}$.',
    },
    {
      type: 'number',
      prompt:
        'Một người có trọng lượng $600\\ \\text{N}$ đứng trên mặt đất gây ra áp suất $15\\,000\\ \\text{Pa}$. Diện tích tiếp xúc của hai bàn chân với mặt đất là bao nhiêu mét vuông?',
      answer: 0.04,
      unit: 'm²',
      hints: ['Từ $p = \\dfrac{F}{S}$ suy ra $S = \\dfrac{F}{p}$.'],
      solution: '$S = \\dfrac{F}{p} = \\dfrac{600}{15\\,000} = 0{,}04\\ \\text{m}^2$.',
    },
    {
      type: 'choice',
      prompt:
        'Cùng một viên gạch hình hộp chữ nhật đặt trên nền cát. Đặt theo mặt nào thì gạch lún sâu nhất?',
      options: [
        'Mặt có diện tích lớn nhất',
        'Mặt có diện tích nhỏ nhất',
        'Mặt nào cũng lún như nhau vì áp lực như nhau',
        'Mặt có diện tích trung bình',
      ],
      answer: 1,
      hints: ['Áp lực không đổi; áp suất phụ thuộc diện tích bị ép thế nào?'],
      solution:
        'Áp lực bằng trọng lượng gạch, không đổi. Theo $p = \\dfrac{F}{S}$, mặt có diện tích nhỏ nhất cho áp suất lớn nhất nên gạch lún sâu nhất.',
    },
    {
      type: 'multi',
      prompt: 'Những trường hợp nào là làm tăng áp suất?',
      options: [
        'Mài lưỡi dao cho sắc',
        'Xây móng nhà rộng hơn tường nhà',
        'Làm đầu đinh nhọn',
        'Lót tấm ván rộng để đi trên bùn',
        'Mũi khoan được làm nhọn',
      ],
      answers: [0, 2, 4],
      hints: ['Tăng áp suất thường bằng cách làm diện tích bị ép nhỏ lại.'],
      solution:
        'Dao sắc, đinh nhọn, mũi khoan nhọn đều làm diện tích bị ép rất nhỏ nên áp suất lớn. Móng nhà rộng và tấm ván rộng làm tăng diện tích bị ép để giảm áp suất.',
    },
    {
      type: 'choice',
      prompt: 'Vì sao quai cặp, quai ba lô thường được làm bản to?',
      options: [
        'Để tăng áp suất lên vai, đeo chắc hơn',
        'Để giảm áp lực của cặp lên vai',
        'Để tăng diện tích bị ép, làm giảm áp suất lên vai',
        'Để cặp nhẹ hơn',
      ],
      answer: 2,
      hints: ['Trọng lượng cặp (áp lực) không đổi khi đổi quai.'],
      solution:
        'Quai bản to làm tăng diện tích bị ép, áp lực (trọng lượng cặp) không đổi, nên áp suất lên vai giảm, đeo đỡ đau vai.',
    },
  ],
  takeaways: [
    'Áp lực là lực ép có phương vuông góc với mặt bị ép.',
    'Áp suất là độ lớn của áp lực trên một đơn vị diện tích bị ép: $p = \\dfrac{F}{S}$.',
    'Đơn vị áp suất: $\\text{N/m}^2 = \\text{Pa}$ (paxcan); nhớ đổi $S$ ra $\\text{m}^2$.',
    'Tăng áp suất: tăng $F$ hoặc giảm $S$; giảm áp suất: giảm $F$ hoặc tăng $S$.',
  ],
};
