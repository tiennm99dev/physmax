/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Điện trở đặc trưng cho mức độ cản trở dòng điện của vật dẫn, R = U/I, đơn vị ohm; định luật Ohm I = U/R; điện trở dây dẫn R = ρl/S tỉ lệ thuận với chiều dài, tỉ lệ nghịch với tiết diện và phụ thuộc vật liệu.',
  intro:
    'Cùng mắc vào một nguồn điện, có dây cho dòng điện rất lớn chạy qua, có dây chỉ cho dòng điện nhỏ. Dây dẫn điện trong nhà làm bằng đồng, còn dây trong ấm điện, bàn là lại làm bằng hợp kim nicrom. Vì sao vậy? Câu trả lời nằm ở một đại lượng mới: điện trở.',
  objectives: [
    'Nêu được điện trở có tác dụng cản trở dòng điện; định nghĩa được điện trở $R = \\dfrac{U}{I}$ và đơn vị ohm ($\\Omega$).',
    'Phát biểu và vận dụng được định luật Ohm $I = \\dfrac{U}{R}$; mô tả được đồ thị $I$ theo $U$ là đường thẳng đi qua gốc toạ độ.',
    'Nêu được điện trở của đoạn dây dẫn tỉ lệ thuận với chiều dài, tỉ lệ nghịch với tiết diện và phụ thuộc vật liệu; vận dụng được $R = \\rho\\dfrac{l}{S}$.',
  ],
  sections: [
    {
      heading: 'Điện trở',
      blocks: [
        {
          type: 'p',
          text: 'Lần lượt đặt cùng một hiệu điện thế vào hai đầu những đoạn dây dẫn khác nhau và đo cường độ dòng điện chạy qua mỗi đoạn dây. Kết quả cho thấy cường độ dòng điện qua các dây khác nhau: mỗi đoạn dây cản trở dòng điện nhiều hay ít khác nhau.',
        },
        {
          type: 'p',
          text: 'Với một đoạn dây dẫn xác định, khi thay đổi hiệu điện thế $U$ thì cường độ dòng điện $I$ thay đổi theo, nhưng thương số $\\dfrac{U}{I}$ luôn không đổi. Với các đoạn dây khác nhau, thương số này có giá trị khác nhau.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Điện trở',
          text: 'Điện trở của một đoạn dây dẫn là đại lượng đặc trưng cho mức độ cản trở dòng điện của đoạn dây đó, được xác định bằng thương số giữa hiệu điện thế đặt vào hai đầu đoạn dây và cường độ dòng điện chạy qua nó: $R = \\dfrac{U}{I}$.',
        },
        {
          type: 'list',
          items: [
            'Đơn vị của điện trở là ohm (đọc là ôm), kí hiệu $\\Omega$: $1\\ \\Omega = \\dfrac{1\\ \\text{V}}{1\\ \\text{A}}$.',
            'Ước và bội của ohm: $1$ m$\\Omega$ $= 0{,}001\\ \\Omega$; $1$ k$\\Omega$ $= 1\\,000\\ \\Omega$; $1$ M$\\Omega$ $= 1\\,000\\,000\\ \\Omega$.',
            'Trong sơ đồ mạch điện, điện trở được kí hiệu bằng một hình chữ nhật nhỏ nối với hai đoạn dây.',
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Ý nghĩa',
          text: 'Với cùng một hiệu điện thế, dây có điện trở càng lớn thì cường độ dòng điện chạy qua càng nhỏ.',
        },
      ],
    },
    {
      heading: 'Định luật Ohm',
      blocks: [
        {
          type: 'p',
          text: 'Đo cường độ dòng điện qua một dây dẫn ứng với nhiều giá trị hiệu điện thế khác nhau rồi biểu diễn các cặp giá trị $(U; I)$ trên hệ trục toạ độ ($U$ trên trục hoành, $I$ trên trục tung). Các điểm nằm trên một đường thẳng đi qua gốc toạ độ: cường độ dòng điện tỉ lệ thuận với hiệu điện thế.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Định luật Ohm',
          text: 'Cường độ dòng điện chạy qua một đoạn dây dẫn tỉ lệ thuận với hiệu điện thế đặt vào hai đầu đoạn dây và tỉ lệ nghịch với điện trở của đoạn dây.',
        },
        { type: 'tex', tex: 'I = \\frac{U}{R}' },
        {
          type: 'list',
          items: [
            '$U$ là hiệu điện thế giữa hai đầu đoạn dây, đơn vị vôn (V);',
            '$I$ là cường độ dòng điện chạy qua đoạn dây, đơn vị ampe (A);',
            '$R$ là điện trở của đoạn dây, đơn vị ohm ($\\Omega$).',
          ],
        },
        {
          type: 'p',
          text: 'Từ định luật Ohm suy ra $U = I \\cdot R$ và $R = \\dfrac{U}{I}$. Trên đồ thị $I$ theo $U$, dây có điện trở càng lớn thì đường thẳng càng thoải (ít dốc).',
        },
      ],
    },
    {
      heading: 'Điện trở của đoạn dây dẫn',
      blocks: [
        {
          type: 'p',
          text: 'Thí nghiệm với các dây dẫn khác nhau cho thấy điện trở của một đoạn dây dẫn phụ thuộc vào ba yếu tố: chiều dài, tiết diện và vật liệu làm dây.',
        },
        {
          type: 'list',
          items: [
            'Các dây cùng tiết diện, cùng vật liệu: điện trở tỉ lệ thuận với chiều dài $l$ của dây.',
            'Các dây cùng chiều dài, cùng vật liệu: điện trở tỉ lệ nghịch với tiết diện $S$ của dây.',
            'Các dây cùng chiều dài, cùng tiết diện nhưng làm bằng vật liệu khác nhau thì có điện trở khác nhau.',
          ],
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Công thức tính điện trở',
          text: '$$R = \\rho \\frac{l}{S}$$ trong đó $l$ là chiều dài dây (m), $S$ là tiết diện dây (m$^2$), $\\rho$ là điện trở suất của vật liệu làm dây ($\\Omega \\cdot$m), $R$ là điện trở của dây ($\\Omega$).',
        },
        {
          type: 'table',
          caption: 'Điện trở suất của một số chất ở $20\\ ^\\circ$C',
          head: ['Chất', 'Loại', '$\\rho$ ($\\Omega \\cdot$m)'],
          rows: [
            ['Bạc', 'kim loại', '$1{,}6 \\cdot 10^{-8}$'],
            ['Đồng', 'kim loại', '$1{,}7 \\cdot 10^{-8}$'],
            ['Nhôm', 'kim loại', '$2{,}8 \\cdot 10^{-8}$'],
            ['Vonfram', 'kim loại', '$5{,}5 \\cdot 10^{-8}$'],
            ['Sắt', 'kim loại', '$12{,}0 \\cdot 10^{-8}$'],
            ['Nikelin', 'hợp kim', '$0{,}40 \\cdot 10^{-6}$'],
            ['Manganin', 'hợp kim', '$0{,}43 \\cdot 10^{-6}$'],
            ['Constantan', 'hợp kim', '$0{,}50 \\cdot 10^{-6}$'],
            ['Nicrom', 'hợp kim', '$1{,}10 \\cdot 10^{-6}$'],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Ứng dụng',
          text: 'Bạc, đồng, nhôm có điện trở suất nhỏ nên dẫn điện tốt; đồng và nhôm được dùng làm dây dẫn điện. Hợp kim như nicrom, constantan có điện trở suất lớn, được dùng làm dây đốt nóng của bàn là, ấm điện hay làm biến trở.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Đổi đơn vị tiết diện',
          text: 'Tiết diện thường cho bằng mm$^2$; phải đổi ra m$^2$ trước khi thay vào công thức: $1$ mm$^2$ $= 10^{-6}$ m$^2$.',
        },
      ],
    },
  ],
  explore: {
    title: 'Vẽ đồ thị I theo U',
    instruction:
      'Chọn một đoạn dây, dịch con chạy biến trở để đổi hiệu điện thế, mỗi lần nhấn "Ghi điểm đo" để chấm một điểm $(U; I)$. Ghi ít nhất hai điểm để thấy đường thẳng đi qua gốc toạ độ, rồi đổi vật liệu, chiều dài hoặc tiết diện và vẽ thêm một dây để so sánh độ dốc của hai đồ thị.',
  },
  examples: [
    {
      problem:
        'Đặt hiệu điện thế $12$ V vào hai đầu một dây dẫn thì cường độ dòng điện chạy qua dây là $0{,}5$ A. Tính điện trở của dây. Nếu giảm hiệu điện thế còn $6$ V thì cường độ dòng điện qua dây là bao nhiêu?',
      steps: [
        'Điện trở của dây: $R = \\dfrac{U}{I} = \\dfrac{12}{0{,}5} = 24\\ \\Omega$.',
        "Điện trở của dây không đổi, theo định luật Ohm: $I' = \\dfrac{U'}{R} = \\dfrac{6}{24} = 0{,}25$ A.",
        'Nhận xét: hiệu điện thế giảm $2$ lần thì cường độ dòng điện cũng giảm $2$ lần.',
      ],
      answer: "$R = 24\\ \\Omega$; khi $U' = 6$ V thì $I' = 0{,}25$ A.",
    },
    {
      problem:
        'Một dây đồng dài $150$ m, tiết diện $2$ mm$^2$. Tính điện trở của dây, biết điện trở suất của đồng là $1{,}7 \\cdot 10^{-8}\\ \\Omega \\cdot$m.',
      steps: [
        'Đổi tiết diện: $S = 2$ mm$^2$ $= 2 \\cdot 10^{-6}$ m$^2$.',
        'Điện trở của dây: $R = \\rho\\dfrac{l}{S} = 1{,}7 \\cdot 10^{-8} \\cdot \\dfrac{150}{2 \\cdot 10^{-6}} = 1{,}275\\ \\Omega$.',
      ],
      answer: 'Điện trở của dây đồng là $1{,}275\\ \\Omega$.',
    },
    {
      problem:
        'Một dây nicrom dài $2$ m, tiết diện $0{,}2$ mm$^2$ được mắc vào hiệu điện thế $22$ V. Tính cường độ dòng điện chạy qua dây.',
      steps: [
        'Đổi $S = 0{,}2$ mm$^2$ $= 0{,}2 \\cdot 10^{-6}$ m$^2$; tra bảng: $\\rho = 1{,}10 \\cdot 10^{-6}\\ \\Omega \\cdot$m.',
        'Điện trở của dây: $R = \\rho\\dfrac{l}{S} = 1{,}1 \\cdot 10^{-6} \\cdot \\dfrac{2}{0{,}2 \\cdot 10^{-6}} = 11\\ \\Omega$.',
        'Cường độ dòng điện: $I = \\dfrac{U}{R} = \\dfrac{22}{11} = 2$ A.',
      ],
      answer: 'Cường độ dòng điện chạy qua dây là $2$ A.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Đơn vị của điện trở là',
      options: ['vôn (V)', 'ampe (A)', 'ohm ($\\Omega$)', 'oát (W)'],
      answer: 2,
      hints: ['Điện trở bằng thương số $U/I$, tức là vôn chia cho ampe.'],
      solution:
        'Điện trở đo bằng ohm: $1\\ \\Omega = 1$ V/A. Vôn là đơn vị hiệu điện thế, ampe là đơn vị cường độ dòng điện, oát là đơn vị công suất.',
    },
    {
      type: 'number',
      prompt:
        'Đặt hiệu điện thế $9$ V vào hai đầu một điện trở thì dòng điện chạy qua nó có cường độ $0{,}3$ A. Tính điện trở.',
      answer: 30,
      tolerance: 0.001,
      unit: 'Ω',
      hints: ['Dùng $R = \\dfrac{U}{I}$.'],
      solution: '$R = \\dfrac{U}{I} = \\dfrac{9}{0{,}3} = 30\\ \\Omega$.',
    },
    {
      type: 'number',
      prompt:
        'Mắc một điện trở $40\\ \\Omega$ vào hiệu điện thế $12$ V. Cường độ dòng điện chạy qua điện trở là bao nhiêu ampe?',
      answer: 0.3,
      tolerance: 0.001,
      unit: 'A',
      hints: ['Áp dụng định luật Ohm $I = \\dfrac{U}{R}$.'],
      solution: '$I = \\dfrac{U}{R} = \\dfrac{12}{40} = 0{,}3$ A.',
    },
    {
      type: 'number',
      prompt:
        'Dòng điện $0{,}4$ A chạy qua một điện trở $15\\ \\Omega$. Hiệu điện thế giữa hai đầu điện trở là bao nhiêu vôn?',
      answer: 6,
      tolerance: 0.001,
      unit: 'V',
      hints: ['Từ $I = \\dfrac{U}{R}$ suy ra $U = I \\cdot R$.'],
      solution: '$U = I \\cdot R = 0{,}4 \\cdot 15 = 6$ V.',
    },
    {
      type: 'choice',
      prompt:
        'Khi tăng hiệu điện thế giữa hai đầu một dây dẫn lên $3$ lần thì cường độ dòng điện chạy qua dây',
      options: ['giảm $3$ lần', 'tăng $3$ lần', 'không đổi', 'tăng $9$ lần'],
      answer: 1,
      hints: ['Điện trở của dây không đổi; $I$ tỉ lệ thuận với $U$.'],
      solution:
        'Theo định luật Ohm, $I = \\dfrac{U}{R}$ với $R$ không đổi, nên $U$ tăng $3$ lần thì $I$ cũng tăng $3$ lần.',
    },
    {
      type: 'number',
      prompt:
        'Một dây constantan dài $4$ m, tiết diện $0{,}5$ mm$^2$, điện trở suất $0{,}50 \\cdot 10^{-6}\\ \\Omega \\cdot$m. Tính điện trở của dây.',
      answer: 4,
      tolerance: 0.001,
      unit: 'Ω',
      hints: [
        'Đổi $0{,}5$ mm$^2$ $= 0{,}5 \\cdot 10^{-6}$ m$^2$.',
        'Dùng $R = \\rho\\dfrac{l}{S}$.',
      ],
      solution:
        '$R = \\rho\\dfrac{l}{S} = 0{,}5 \\cdot 10^{-6} \\cdot \\dfrac{4}{0{,}5 \\cdot 10^{-6}} = 4\\ \\Omega$.',
    },
    {
      type: 'choice',
      prompt:
        'Hai dây đồng có cùng tiết diện, dây thứ nhất dài gấp đôi dây thứ hai. Điện trở $R_1$ của dây thứ nhất và $R_2$ của dây thứ hai liên hệ thế nào?',
      options: ['$R_1 = R_2$', '$R_1 = 2R_2$', '$R_2 = 2R_1$', '$R_1 = 4R_2$'],
      answer: 1,
      hints: ['Cùng vật liệu, cùng tiết diện: điện trở tỉ lệ thuận với chiều dài.'],
      solution:
        'Vì $R = \\rho\\dfrac{l}{S}$ với $\\rho$, $S$ như nhau, $l_1 = 2l_2$ nên $R_1 = 2R_2$.',
    },
    {
      type: 'choice',
      prompt:
        'Hai dây nhôm dài bằng nhau, tiết diện dây thứ nhất gấp $3$ lần tiết diện dây thứ hai. Kết luận nào đúng?',
      options: [
        '$R_1 = 3R_2$',
        '$R_1 = \\dfrac{R_2}{3}$',
        '$R_1 = R_2$',
        '$R_1 = \\dfrac{R_2}{9}$',
      ],
      answer: 1,
      hints: ['Cùng vật liệu, cùng chiều dài: điện trở tỉ lệ nghịch với tiết diện.'],
      solution:
        'Tiết diện lớn gấp $3$ lần thì điện trở nhỏ đi $3$ lần: $R_1 = \\dfrac{R_2}{3}$. Dây to hơn cản trở dòng điện ít hơn.',
    },
    {
      type: 'number',
      prompt:
        'Một dây đồng dài $100$ m, tiết diện $1{,}7$ mm$^2$. Biết điện trở suất của đồng là $1{,}7 \\cdot 10^{-8}\\ \\Omega \\cdot$m, tính điện trở của dây.',
      answer: 1,
      tolerance: 0.001,
      unit: 'Ω',
      hints: ['Đổi $S = 1{,}7 \\cdot 10^{-6}$ m$^2$ rồi thay vào $R = \\rho\\dfrac{l}{S}$.'],
      solution:
        '$R = 1{,}7 \\cdot 10^{-8} \\cdot \\dfrac{100}{1{,}7 \\cdot 10^{-6}} = 10^{-8} \\cdot 10^{8} = 1\\ \\Omega$.',
    },
    {
      type: 'number',
      prompt:
        'Cần làm một dây đốt nóng bằng nicrom ($\\rho = 1{,}10 \\cdot 10^{-6}\\ \\Omega \\cdot$m) tiết diện $0{,}1$ mm$^2$ có điện trở $22\\ \\Omega$. Dây phải dài bao nhiêu mét?',
      answer: 2,
      tolerance: 0.001,
      unit: 'm',
      hints: [
        'Từ $R = \\rho\\dfrac{l}{S}$ suy ra $l = \\dfrac{R \\cdot S}{\\rho}$.',
        'Nhớ đổi $0{,}1$ mm$^2$ $= 0{,}1 \\cdot 10^{-6}$ m$^2$.',
      ],
      solution:
        '$l = \\dfrac{R \\cdot S}{\\rho} = \\dfrac{22 \\cdot 0{,}1 \\cdot 10^{-6}}{1{,}1 \\cdot 10^{-6}} = 2$ m.',
    },
    {
      type: 'multi',
      prompt:
        'Về đồ thị biểu diễn cường độ dòng điện $I$ theo hiệu điện thế $U$ của một dây dẫn, những phát biểu nào đúng?',
      options: [
        'Đồ thị là một đường thẳng đi qua gốc toạ độ.',
        'Đồ thị là một đường cong đi lên.',
        'Dây có điện trở lớn hơn thì đồ thị dốc hơn.',
        'Mọi điểm trên đồ thị có cùng thương số $U/I$.',
      ],
      answers: [0, 3],
      hints: ['$I = \\dfrac{U}{R}$: $I$ tỉ lệ thuận với $U$, hệ số tỉ lệ là $\\dfrac{1}{R}$.'],
      solution:
        'Vì $I = \\dfrac{1}{R} \\cdot U$ nên đồ thị là đường thẳng qua gốc toạ độ, mọi điểm có $U/I = R$. Hệ số góc là $\\dfrac{1}{R}$, nên dây có điện trở lớn hơn thì đồ thị thoải hơn, không dốc hơn.',
    },
    {
      type: 'order',
      prompt:
        'Sắp xếp các kim loại theo thứ tự dẫn điện từ tốt nhất đến kém nhất (điện trở suất từ nhỏ đến lớn).',
      items: ['Nhôm', 'Bạc', 'Sắt', 'Đồng'],
      answer: [1, 3, 0, 2],
      hints: ['Tra bảng điện trở suất: chất có $\\rho$ càng nhỏ thì dẫn điện càng tốt.'],
      solution:
        'Bạc $1{,}6 \\cdot 10^{-8}$, đồng $1{,}7 \\cdot 10^{-8}$, nhôm $2{,}8 \\cdot 10^{-8}$, sắt $12{,}0 \\cdot 10^{-8}\\ \\Omega \\cdot$m: bạc, đồng, nhôm, sắt.',
    },
  ],
  takeaways: [
    'Điện trở đặc trưng cho mức độ cản trở dòng điện của vật dẫn: $R = \\dfrac{U}{I}$, đơn vị ohm ($\\Omega$).',
    'Định luật Ohm: $I = \\dfrac{U}{R}$; đồ thị $I$ theo $U$ là đường thẳng qua gốc toạ độ, càng thoải khi $R$ càng lớn.',
    'Điện trở dây dẫn $R = \\rho\\dfrac{l}{S}$: tỉ lệ thuận với chiều dài, tỉ lệ nghịch với tiết diện, phụ thuộc vật liệu qua điện trở suất $\\rho$.',
    'Đổi tiết diện ra m$^2$ ($1$ mm$^2$ $= 10^{-6}$ m$^2$) trước khi tính.',
  ],
};
