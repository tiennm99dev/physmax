/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Năng lượng điện của một đoạn mạch W = UIt, đơn vị jun; công suất điện P = UI, đơn vị oát; công suất định mức ghi trên thiết bị; công tơ điện đo năng lượng điện theo kWh, 1 kWh = 3 600 000 J.',
  intro:
    'Cuối mỗi tháng, gia đình em nhận hoá đơn tiền điện ghi số "kWh" đã dùng. Con số đó đo cái gì, được đọc ở đâu và tính thế nào? Vì sao một chiếc ấm siêu tốc chỉ đun nước vài phút mà vẫn tốn điện đáng kể?',
  objectives: [
    'Nêu được dòng điện có năng lượng; viết và vận dụng được công thức tính năng lượng điện $W = UIt$.',
    'Nêu được công suất điện là năng lượng của dòng điện trong một đơn vị thời gian; vận dụng được $P = UI$.',
    'Giải thích được ý nghĩa số oát ghi trên thiết bị điện (công suất định mức).',
    'Đọc được số kWh trên công tơ điện, đổi được kWh ra jun và tính được tiền điện trong trường hợp đơn giản.',
  ],
  sections: [
    {
      heading: 'Năng lượng điện',
      blocks: [
        {
          type: 'p',
          text: 'Dòng điện làm bóng đèn sáng, làm quạt quay, làm bàn là nóng lên: dòng điện có năng lượng. Năng lượng đó gọi là năng lượng điện. Khi dòng điện chạy qua một đoạn mạch, năng lượng điện được chuyển hoá thành các dạng năng lượng khác như năng lượng ánh sáng, nhiệt năng, cơ năng.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Công thức tính năng lượng điện',
          text: 'Năng lượng điện của một đoạn mạch được tính bằng công thức $$W = U I t$$',
        },
        {
          type: 'list',
          items: [
            '$W$ là năng lượng điện, đơn vị jun (J);',
            '$U$ là hiệu điện thế giữa hai đầu đoạn mạch, đơn vị vôn (V);',
            '$I$ là cường độ dòng điện chạy qua đoạn mạch, đơn vị ampe (A);',
            '$t$ là thời gian dòng điện chạy qua đoạn mạch, đơn vị giây (s).',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Đổi thời gian',
          text: 'Khi tính $W$ theo jun, thời gian phải đổi ra giây: $10$ phút $= 600$ s, $1$ h $= 3\\,600$ s.',
        },
      ],
    },
    {
      heading: 'Công suất điện',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Công suất điện',
          text: 'Công suất điện của một đoạn mạch là năng lượng của dòng điện chạy qua đoạn mạch đó trong một đơn vị thời gian: $\\mathcal{P} = \\dfrac{W}{t}$.',
        },
        { type: 'tex', tex: '\\mathcal{P} = \\frac{W}{t} = U I' },
        {
          type: 'list',
          items: [
            '$\\mathcal{P}$ là công suất điện, đơn vị oát (W); $1$ kW $= 1\\,000$ W.',
            '$U$ đo bằng vôn (V), $I$ đo bằng ampe (A): $1$ W $= 1$ V $\\cdot$ $1$ A.',
            'Ngược lại, biết công suất và thời gian thì năng lượng điện là $W = \\mathcal{P} t$.',
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Đoạn mạch chỉ có điện trở',
          text: 'Với một điện trở $R$, thay $U = IR$ (định luật Ohm) vào $\\mathcal{P} = UI$ ta được $\\mathcal{P} = I^2 R = \\dfrac{U^2}{R}$.',
        },
        {
          type: 'p',
          text: 'Trên mỗi thiết bị điện thường ghi hai con số, ví dụ bóng đèn ghi $220$ V – $60$ W. Số $220$ V là hiệu điện thế định mức, số $60$ W là công suất định mức.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Công suất định mức',
          text: 'Công suất định mức của một thiết bị điện là công suất điện của thiết bị khi nó hoạt động bình thường, tức là khi được dùng đúng hiệu điện thế định mức. Bóng đèn $220$ V – $60$ W mắc vào hiệu điện thế $220$ V thì sáng bình thường, công suất của đèn khi đó là $60$ W.',
        },
        {
          type: 'table',
          caption:
            'Công suất định mức gần đúng của một số thiết bị dùng điện $220$ V trong gia đình',
          head: ['Thiết bị', 'Công suất (W)'],
          rows: [
            ['Đèn LED', '$9$ đến $20$'],
            ['Quạt điện', '$40$ đến $75$'],
            ['Ti vi', '$80$ đến $150$'],
            ['Nồi cơm điện', '$500$ đến $800$'],
            ['Bàn là, điều hoà', '$1\\,000$ trở lên'],
            ['Ấm siêu tốc', '$1\\,500$ đến $2\\,000$'],
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Dùng đúng hiệu điện thế định mức',
          text: 'Mắc thiết bị vào hiệu điện thế lớn hơn hiệu điện thế định mức có thể làm hỏng thiết bị; mắc vào hiệu điện thế nhỏ hơn thì thiết bị hoạt động yếu hơn bình thường.',
        },
      ],
    },
    {
      heading: 'Đo năng lượng điện bằng công tơ',
      blocks: [
        {
          type: 'p',
          text: 'Năng lượng điện mà gia đình sử dụng được đo bằng công tơ điện (công tơ điện cơ hoặc công tơ điện điện tử). Đơn vị đo trên công tơ là kilôoát giờ (kWh): $1$ kWh là năng lượng điện mà một thiết bị công suất $1$ kW tiêu thụ trong $1$ giờ.',
        },
        {
          type: 'tex',
          tex: '1\\ \\text{kWh} = 1\\,000\\ \\text{W} \\cdot 3\\,600\\ \\text{s} = 3\\,600\\,000\\ \\text{J}',
        },
        {
          type: 'list',
          items: [
            'Mỗi số đếm của công tơ ứng với $1$ kWh, thường gọi là "một số điện".',
            'Số điện đã dùng trong tháng $=$ số chỉ cuối tháng $-$ số chỉ đầu tháng.',
            'Tính năng lượng theo kWh cho nhanh: $W = \\mathcal{P} t$ với $\\mathcal{P}$ tính bằng kW và $t$ tính bằng giờ.',
            'Tiền điện $=$ số kWh đã dùng $\\times$ giá của $1$ kWh.',
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Giá điện',
          text: 'Trong thực tế, giá điện sinh hoạt được tính theo bậc thang: dùng càng nhiều thì những số điện sau càng đắt. Các bài tập trong bài này dùng một giá chung cho mỗi kWh để dễ tính.',
        },
        {
          type: 'p',
          text: 'Thiết bị công suất lớn chỉ dùng trong thời gian ngắn có thể tốn ít điện hơn thiết bị công suất nhỏ dùng cả ngày: năng lượng điện phụ thuộc cả công suất lẫn thời gian sử dụng.',
        },
      ],
    },
  ],
  explore: {
    title: 'Tính tiền điện của một gia đình',
    instruction:
      'Đặt số giờ dùng mỗi ngày cho từng thiết bị. Mỗi dòng tính năng lượng điện $W = \\mathcal{P} t$ của mỗi thiết bị theo kWh trong một ngày và trong $30$ ngày; công tơ cho thấy số chỉ tăng thêm bao nhiêu và tiền điện phải trả. Thử bật điều hoà, hoặc so sánh quạt dùng lâu với ấm siêu tốc dùng ít phút.',
  },
  examples: [
    {
      problem:
        'Một ấm điện được dùng ở hiệu điện thế $220$ V thì dòng điện chạy qua ấm có cường độ $5$ A. Tính công suất điện của ấm và năng lượng điện ấm tiêu thụ trong $10$ phút.',
      steps: [
        'Công suất điện của ấm: $\\mathcal{P} = UI = 220 \\cdot 5 = 1\\,100$ W.',
        'Đổi thời gian: $t = 10$ phút $= 600$ s.',
        'Năng lượng điện: $W = UIt = 220 \\cdot 5 \\cdot 600 = 660\\,000$ J $= 660$ kJ.',
      ],
      answer: '$\\mathcal{P} = 1\\,100$ W; $W = 660\\,000$ J.',
    },
    {
      problem:
        'Một bóng đèn có ghi $220$ V – $60$ W được mắc vào hiệu điện thế $220$ V. a) Tính cường độ dòng điện chạy qua đèn. b) Mỗi ngày đèn được thắp $5$ giờ. Tính năng lượng điện đèn tiêu thụ trong $30$ ngày theo kWh và theo jun.',
      steps: [
        'Đèn dùng đúng hiệu điện thế định mức nên sáng bình thường, công suất $\\mathcal{P} = 60$ W.',
        'a) $I = \\dfrac{\\mathcal{P}}{U} = \\dfrac{60}{220} \\approx 0{,}27$ A.',
        'b) Thời gian thắp sáng: $t = 5 \\cdot 30 = 150$ h; $\\mathcal{P} = 60$ W $= 0{,}06$ kW.',
        '$W = \\mathcal{P} t = 0{,}06 \\cdot 150 = 9$ kWh $= 9 \\cdot 3\\,600\\,000 = 32\\,400\\,000$ J.',
      ],
      answer: 'a) $I \\approx 0{,}27$ A; b) $W = 9$ kWh $= 32\\,400\\,000$ J.',
    },
    {
      problem:
        'Mỗi ngày một gia đình dùng đèn $40$ W trong $6$ giờ, quạt $75$ W trong $8$ giờ và ti vi $100$ W trong $4$ giờ. Đầu tháng công tơ chỉ $1\\,245$ kWh. Tính số chỉ công tơ sau $30$ ngày và tiền điện, biết giá $1$ kWh là $2\\,000$ đồng.',
      steps: [
        'Năng lượng điện một ngày: đèn $0{,}04 \\cdot 6 = 0{,}24$ kWh; quạt $0{,}075 \\cdot 8 = 0{,}6$ kWh; ti vi $0{,}1 \\cdot 4 = 0{,}4$ kWh.',
        'Cả ngày: $0{,}24 + 0{,}6 + 0{,}4 = 1{,}24$ kWh; trong $30$ ngày: $1{,}24 \\cdot 30 = 37{,}2$ kWh.',
        'Số chỉ công tơ sau $30$ ngày: $1\\,245 + 37{,}2 = 1\\,282{,}2$ kWh.',
        'Tiền điện: $37{,}2 \\cdot 2\\,000 = 74\\,400$ đồng.',
      ],
      answer: 'Công tơ chỉ $1\\,282{,}2$ kWh; tiền điện $74\\,400$ đồng.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Công suất điện của một đoạn mạch được tính bằng công thức nào?',
      options: [
        '$\\mathcal{P} = UI$',
        '$\\mathcal{P} = UIt$',
        '$\\mathcal{P} = \\dfrac{U}{I}$',
        '$\\mathcal{P} = U + I$',
      ],
      answer: 0,
      hints: ['Công suất là năng lượng trong một đơn vị thời gian: chia $W = UIt$ cho $t$.'],
      solution:
        '$\\mathcal{P} = \\dfrac{W}{t} = \\dfrac{UIt}{t} = UI$. Biểu thức $UIt$ là năng lượng điện, còn $\\dfrac{U}{I}$ là điện trở.',
    },
    {
      type: 'number',
      prompt:
        'Một ti vi dùng ở hiệu điện thế $220$ V thì dòng điện chạy qua nó có cường độ $0{,}5$ A. Tính công suất điện của ti vi.',
      answer: 110,
      tolerance: 0.001,
      unit: 'W',
      hints: ['Dùng $\\mathcal{P} = UI$.'],
      solution: '$\\mathcal{P} = UI = 220 \\cdot 0{,}5 = 110$ W.',
    },
    {
      type: 'number',
      prompt:
        'Đặt hiệu điện thế $12$ V vào hai đầu một đoạn mạch thì dòng điện $2$ A chạy qua. Tính năng lượng điện đoạn mạch tiêu thụ trong $5$ phút (theo jun).',
      answer: 7200,
      tolerance: 0.001,
      unit: 'J',
      hints: ['Đổi $5$ phút ra giây.', 'Dùng $W = UIt$ với $t = 300$ s.'],
      solution: '$t = 5$ phút $= 300$ s; $W = UIt = 12 \\cdot 2 \\cdot 300 = 7\\,200$ J.',
    },
    {
      type: 'choice',
      prompt: 'Trên một bàn là có ghi $220$ V – $1\\,000$ W. Số liệu này cho biết điều gì?',
      options: [
        'Khi dùng ở hiệu điện thế $220$ V, bàn là hoạt động bình thường với công suất $1\\,000$ W.',
        'Bàn là luôn có công suất $1\\,000$ W ở mọi hiệu điện thế.',
        'Mỗi giờ bàn là tiêu thụ năng lượng điện $1\\,000$ J.',
        'Dòng điện chạy qua bàn là có cường độ $1\\,000$ A.',
      ],
      answer: 0,
      hints: ['$220$ V là hiệu điện thế định mức, $1\\,000$ W là công suất định mức.'],
      solution:
        'Công suất định mức $1\\,000$ W là công suất của bàn là khi dùng đúng hiệu điện thế định mức $220$ V. Ở hiệu điện thế khác, công suất khác đi. Trong $1$ giờ bàn là tiêu thụ $1$ kWh $= 3\\,600\\,000$ J, không phải $1\\,000$ J.',
    },
    {
      type: 'number',
      prompt: '$1$ kWh bằng bao nhiêu jun?',
      answer: 3600000,
      tolerance: 0.001,
      unit: 'J',
      hints: [
        '$1$ kWh là năng lượng của thiết bị $1\\,000$ W dùng trong $1$ giờ.',
        'Đổi $1$ giờ ra giây rồi nhân với $1\\,000$ W.',
      ],
      solution: '$1$ kWh $= 1\\,000$ W $\\cdot$ $3\\,600$ s $= 3\\,600\\,000$ J.',
    },
    {
      type: 'number',
      prompt:
        'Một nồi cơm điện công suất $700$ W, mỗi ngày dùng $1{,}5$ giờ. Tính năng lượng điện nồi tiêu thụ trong $30$ ngày (theo kWh).',
      answer: 31.5,
      tolerance: 0.001,
      unit: 'kWh',
      hints: [
        'Đổi $700$ W ra kW.',
        'Tổng thời gian dùng là $1{,}5 \\cdot 30$ giờ; dùng $W = \\mathcal{P} t$.',
      ],
      solution:
        '$\\mathcal{P} = 0{,}7$ kW; $t = 1{,}5 \\cdot 30 = 45$ h; $W = 0{,}7 \\cdot 45 = 31{,}5$ kWh.',
    },
    {
      type: 'number',
      prompt:
        'Đầu tháng công tơ điện nhà Lan chỉ $1\\,245$, cuối tháng chỉ $1\\,357$. Giá $1$ kWh là $2\\,000$ đồng. Tính tiền điện tháng đó (theo đồng).',
      answer: 224000,
      tolerance: 0.001,
      unit: 'đồng',
      hints: [
        'Số điện đã dùng bằng số chỉ cuối tháng trừ số chỉ đầu tháng.',
        'Nhân số kWh đã dùng với giá $1$ kWh.',
      ],
      solution:
        'Số điện đã dùng: $1\\,357 - 1\\,245 = 112$ kWh. Tiền điện: $112 \\cdot 2\\,000 = 224\\,000$ đồng.',
    },
    {
      type: 'number',
      prompt:
        'Một bóng đèn ghi $220$ V – $100$ W sáng bình thường. Tính cường độ dòng điện chạy qua đèn (làm tròn đến hàng phần trăm).',
      answer: 0.45,
      tolerance: 0.005,
      unit: 'A',
      hints: [
        'Đèn sáng bình thường nên $U = 220$ V và $\\mathcal{P} = 100$ W.',
        'Từ $\\mathcal{P} = UI$ suy ra $I = \\dfrac{\\mathcal{P}}{U}$.',
      ],
      solution: '$I = \\dfrac{\\mathcal{P}}{U} = \\dfrac{100}{220} \\approx 0{,}45$ A.',
    },
    {
      type: 'number',
      prompt:
        'Dòng điện $2$ A chạy qua một điện trở $10\\ \\Omega$. Tính công suất điện của điện trở.',
      answer: 40,
      tolerance: 0.001,
      unit: 'W',
      hints: ['Tính $U = IR$ trước, hoặc dùng thẳng $\\mathcal{P} = I^2 R$.'],
      solution:
        '$U = IR = 2 \\cdot 10 = 20$ V; $\\mathcal{P} = UI = 20 \\cdot 2 = 40$ W (cũng bằng $I^2 R = 4 \\cdot 10 = 40$ W).',
    },
    {
      type: 'number',
      prompt:
        'Một ấm siêu tốc công suất $1\\,500$ W đun sôi nước trong $6$ phút. Tính năng lượng điện ấm tiêu thụ (theo kJ).',
      answer: 540,
      tolerance: 0.001,
      unit: 'kJ',
      hints: [
        'Đổi $6$ phút ra giây.',
        '$W = \\mathcal{P} t$ cho kết quả theo jun; chia cho $1\\,000$ để ra kJ.',
      ],
      solution:
        '$t = 6$ phút $= 360$ s; $W = \\mathcal{P} t = 1\\,500 \\cdot 360 = 540\\,000$ J $= 540$ kJ.',
    },
    {
      type: 'choice',
      prompt:
        'Quạt điện $60$ W chạy $10$ giờ; ấm siêu tốc $1\\,500$ W đun nước $15$ phút. Thiết bị nào tiêu thụ nhiều năng lượng điện hơn?',
      options: ['Quạt điện', 'Ấm siêu tốc', 'Bằng nhau'],
      answer: 0,
      hints: ['Tính $W = \\mathcal{P} t$ của từng thiết bị theo kWh; $15$ phút $= 0{,}25$ h.'],
      solution:
        'Quạt: $0{,}06 \\cdot 10 = 0{,}6$ kWh. Ấm: $1{,}5 \\cdot 0{,}25 = 0{,}375$ kWh. Quạt công suất nhỏ nhưng chạy lâu nên tiêu thụ nhiều hơn.',
    },
    {
      type: 'multi',
      prompt: 'Những phát biểu nào đúng về công tơ điện trong gia đình?',
      options: [
        'Công tơ điện dùng để đo năng lượng điện đã sử dụng.',
        'Mỗi số đếm của công tơ ứng với $1$ kWh.',
        'Công tơ điện đo công suất của các thiết bị đang bật.',
        'Số chỉ trên công tơ cho biết hiệu điện thế của mạng điện.',
      ],
      answers: [0, 1],
      hints: ['Đơn vị kWh là đơn vị của đại lượng nào: năng lượng hay công suất?'],
      solution:
        'kWh là đơn vị năng lượng, nên công tơ đo năng lượng điện đã dùng, mỗi số ứng với $1$ kWh. Công suất đo bằng oát, hiệu điện thế đo bằng vôn: công tơ không đo hai đại lượng này.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi đại lượng với đơn vị đo của nó.',
      left: [
        'Năng lượng điện $W$',
        'Công suất điện $\\mathcal{P}$',
        'Hiệu điện thế $U$',
        'Cường độ dòng điện $I$',
      ],
      right: ['jun (J)', 'oát (W)', 'vôn (V)', 'ampe (A)', 'ohm ($\\Omega$)'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: [
        'Chú ý: chữ $W$ là kí hiệu của năng lượng điện, còn W (oát) là đơn vị của công suất.',
      ],
      solution:
        'Năng lượng điện đo bằng jun (J), công suất bằng oát (W), hiệu điện thế bằng vôn (V), cường độ dòng điện bằng ampe (A). Ohm là đơn vị điện trở.',
    },
  ],
  takeaways: [
    'Năng lượng điện của đoạn mạch: $W = UIt$ (J); năng lượng điện chuyển hoá thành các dạng năng lượng khác.',
    'Công suất điện: $\\mathcal{P} = \\dfrac{W}{t} = UI$ (W); với điện trở, $\\mathcal{P} = I^2 R = \\dfrac{U^2}{R}$.',
    'Số oát ghi trên thiết bị là công suất định mức, khi thiết bị dùng đúng hiệu điện thế định mức.',
    'Công tơ đo năng lượng điện theo kWh: $1$ kWh $= 3\\,600\\,000$ J; tiền điện $=$ số kWh $\\times$ giá $1$ kWh.',
  ],
};
