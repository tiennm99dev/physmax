/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Cường độ dòng điện (kí hiệu I, đơn vị ampe A) cho biết mức độ mạnh yếu của dòng điện, đo bằng ampe kế mắc nối tiếp. Hiệu điện thế (kí hiệu U, đơn vị vôn V) giữa hai cực của nguồn đo khả năng sinh ra dòng điện của nguồn, đo bằng vôn kế mắc song song. Chốt dương của dụng cụ đo nối về phía cực dương của nguồn.',
  intro:
    'Cùng một bóng đèn, lắp vào mạch này thì sáng rực, lắp vào mạch kia thì sáng mờ. Trên vỏ pin ghi 1,5 V, trên acquy xe máy ghi 12 V, ổ cắm trong nhà là 220 V. Những con số ấy cho biết điều gì, và làm sao đo được dòng điện mạnh hay yếu?',
  objectives: [
    'Nêu được cường độ dòng điện cho biết mức độ mạnh yếu của dòng điện; kí hiệu $I$, đơn vị ampe ($\\text{A}$), miliampe ($\\text{mA}$).',
    'Nêu được khả năng sinh ra dòng điện của pin (acquy) được đo bằng hiệu điện thế giữa hai cực của nó; kí hiệu $U$, đơn vị vôn ($\\text{V}$).',
    'Mắc được ampe kế nối tiếp, vôn kế song song với dụng cụ cần đo, đúng chốt $(+)$, $(-)$; đọc được giới hạn đo và độ chia nhỏ nhất.',
    'Đổi được đơn vị: $\\text{A}$ và $\\text{mA}$; $\\text{V}$, $\\text{mV}$ và $\\text{kV}$.',
  ],
  sections: [
    {
      heading: 'Cường độ dòng điện',
      blocks: [
        {
          type: 'p',
          text: 'Thí nghiệm: mắc mạch gồm nguồn điện, công tắc, biến trở, bóng đèn và ampe kế nối tiếp nhau. Đóng công tắc, dịch chuyển con chạy của biến trở và quan sát: khi số chỉ của ampe kế càng lớn thì đèn càng sáng.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Cường độ dòng điện',
          text: 'Số chỉ của ampe kế là giá trị của cường độ dòng điện, cho biết mức độ mạnh yếu của dòng điện. Dòng điện càng mạnh thì cường độ dòng điện càng lớn. Cường độ dòng điện kí hiệu là $I$.',
        },
        {
          type: 'list',
          items: [
            'Đơn vị đo cường độ dòng điện là ampe, kí hiệu $\\text{A}$.',
            'Đơn vị nhỏ hơn là miliampe ($\\text{mA}$): $1\\ \\text{A} = 1\\,000\\ \\text{mA}$; $1\\ \\text{mA} = 0{,}001\\ \\text{A}$.',
            'Dụng cụ đo cường độ dòng điện là ampe kế; trên sơ đồ, ampe kế kí hiệu là vòng tròn có chữ $\\text{A}$.',
          ],
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Cách mắc ampe kế',
          text: 'Mắc ampe kế nối tiếp với dụng cụ cần đo cường độ dòng điện, sao cho dòng điện đi vào chốt dương $(+)$ và đi ra ở chốt âm $(-)$ của ampe kế, tức là chốt $(+)$ nối về phía cực dương của nguồn điện.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Không mắc ampe kế song song',
          text: 'Không được mắc hai chốt của ampe kế trực tiếp vào hai cực của nguồn điện hoặc song song với bóng đèn: dòng điện qua ampe kế sẽ rất lớn, làm hỏng ampe kế và nguồn. Chọn ampe kế có giới hạn đo (GHĐ) lớn hơn cường độ dòng điện cần đo và có độ chia nhỏ nhất (ĐCNN) phù hợp.',
        },
      ],
    },
    {
      heading: 'Hiệu điện thế',
      blocks: [
        {
          type: 'p',
          text: 'Trên mỗi nguồn điện đều ghi một số vôn: pin tròn $1{,}5\\ \\text{V}$, pin vuông $9\\ \\text{V}$, acquy xe máy $12\\ \\text{V}$. Giữa hai cực của nguồn điện có một hiệu điện thế.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Hiệu điện thế',
          text: 'Khả năng sinh ra dòng điện của pin (hay acquy) được đo bằng hiệu điện thế (còn gọi là điện áp) giữa hai cực của nó. Hiệu điện thế kí hiệu là $U$.',
        },
        {
          type: 'list',
          items: [
            'Đơn vị đo hiệu điện thế là vôn, kí hiệu $\\text{V}$.',
            'Đơn vị khác: milivôn ($\\text{mV}$) và kilôvôn ($\\text{kV}$): $1\\ \\text{mV} = 0{,}001\\ \\text{V}$; $1\\ \\text{kV} = 1\\,000\\ \\text{V}$.',
            'Dụng cụ đo hiệu điện thế là vôn kế; trên sơ đồ, vôn kế kí hiệu là vòng tròn có chữ $\\text{V}$.',
          ],
        },
        {
          type: 'p',
          text: 'Thí nghiệm: lần lượt thay các nguồn điện $1{,}5\\ \\text{V}$, $3\\ \\text{V}$, $4{,}5\\ \\text{V}$ vào cùng một mạch có bóng đèn và ampe kế. Hiệu điện thế giữa hai cực của nguồn điện càng lớn thì số chỉ ampe kế càng lớn, tức là cường độ dòng điện chạy qua đèn càng lớn, đèn càng sáng.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Cách mắc vôn kế',
          text: 'Mắc vôn kế song song với dụng cụ cần đo hiệu điện thế (hai đầu bóng đèn, hai cực của nguồn điện), chốt dương $(+)$ của vôn kế nối về phía cực dương, chốt âm $(-)$ nối về phía cực âm của nguồn điện.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Số vôn ghi trên nguồn',
          text: 'Số vôn ghi trên mỗi nguồn điện là hiệu điện thế giữa hai cực của nó khi chưa mắc vào mạch. Với pin mới, vôn kế chỉ đúng bằng số ghi trên pin; pin đã dùng lâu thì vôn kế chỉ nhỏ hơn. Hiệu điện thế giữa hai đầu bóng đèn khi chưa mắc vào mạch bằng $0$, nên không có dòng điện chạy qua đèn.',
        },
      ],
    },
    {
      heading: 'So sánh ampe kế và vôn kế',
      blocks: [
        {
          type: 'table',
          head: ['Tiêu chí', 'Ampe kế', 'Vôn kế'],
          rows: [
            ['Đo đại lượng', 'Cường độ dòng điện $I$', 'Hiệu điện thế $U$'],
            [
              'Đơn vị',
              'ampe ($\\text{A}$), miliampe ($\\text{mA}$)',
              'vôn ($\\text{V}$), $\\text{mV}$, $\\text{kV}$',
            ],
            ['Cách mắc', 'Nối tiếp với dụng cụ cần đo', 'Song song với dụng cụ cần đo'],
            ['Chốt $(+)$', 'Nối về phía cực dương của nguồn', 'Nối về phía cực dương của nguồn'],
            [
              'Nếu mắc sai',
              'Song song với đèn: nối tắt đèn, dòng điện rất lớn, hỏng ampe kế',
              'Nối tiếp: mạch gần như không có dòng điện, đèn tắt',
            ],
          ],
        },
        {
          type: 'p',
          text: 'Nhiều phòng thí nghiệm dùng đồng hồ đo điện đa năng: vặn núm chọn về thang đo cường độ dòng điện ($\\text{A}$, $\\text{mA}$) hoặc thang đo hiệu điện thế ($\\text{V}$) rồi mắc đúng cách như ampe kế hoặc vôn kế.',
        },
      ],
    },
  ],
  explore: {
    title: 'Mắc ampe kế và vôn kế',
    instruction:
      'Chọn cách mắc ampe kế và vôn kế, chiều mắc các chốt, rồi quan sát sơ đồ, độ sáng của đèn và kim hai dụng cụ đo. Thử cả cách mắc sai để xem điều gì xảy ra. Khi đã mắc đúng, đổi nguồn $1{,}5\\ \\text{V}$, $3\\ \\text{V}$, $4{,}5\\ \\text{V}$ và ghi lại số chỉ.',
  },
  examples: [
    {
      problem:
        'Đổi đơn vị: (a) $0{,}35\\ \\text{A}$ ra $\\text{mA}$; (b) $1\\,250\\ \\text{mA}$ ra $\\text{A}$; (c) $2{,}5\\ \\text{kV}$ ra $\\text{V}$; (d) $500\\ \\text{mV}$ ra $\\text{V}$.',
      steps: [
        '(a) $1\\ \\text{A} = 1\\,000\\ \\text{mA}$ nên $0{,}35\\ \\text{A} = 0{,}35 \\cdot 1\\,000 = 350\\ \\text{mA}$.',
        '(b) $1\\ \\text{mA} = 0{,}001\\ \\text{A}$ nên $1\\,250\\ \\text{mA} = 1\\,250 \\cdot 0{,}001 = 1{,}25\\ \\text{A}$.',
        '(c) $1\\ \\text{kV} = 1\\,000\\ \\text{V}$ nên $2{,}5\\ \\text{kV} = 2\\,500\\ \\text{V}$.',
        '(d) $1\\ \\text{mV} = 0{,}001\\ \\text{V}$ nên $500\\ \\text{mV} = 0{,}5\\ \\text{V}$.',
      ],
      answer:
        '(a) $350\\ \\text{mA}$; (b) $1{,}25\\ \\text{A}$; (c) $2\\,500\\ \\text{V}$; (d) $0{,}5\\ \\text{V}$.',
    },
    {
      problem:
        'Một ampe kế có giới hạn đo $1\\ \\text{A}$, mặt số chia thành $20$ khoảng đều nhau từ vạch $0$ đến vạch $1\\ \\text{A}$. (a) Tìm độ chia nhỏ nhất. (b) Kim chỉ ở vạch thứ $9$ tính từ vạch $0$. Cường độ dòng điện là bao nhiêu?',
      steps: [
        '(a) ĐCNN là giá trị của một khoảng chia: $1 : 20 = 0{,}05\\ \\text{A}$.',
        '(b) Kim ở vạch thứ $9$: $I = 9 \\cdot 0{,}05 = 0{,}45\\ \\text{A}$.',
      ],
      answer: '(a) ĐCNN $= 0{,}05\\ \\text{A}$; (b) $I = 0{,}45\\ \\text{A} = 450\\ \\text{mA}$.',
    },
    {
      problem:
        'Cần đo cường độ dòng điện qua một bóng đèn và hiệu điện thế giữa hai đầu bóng đèn trong mạch gồm pin, công tắc, bóng đèn. Mô tả cách mắc ampe kế và vôn kế.',
      steps: [
        'Ampe kế đo cường độ dòng điện nên mắc nối tiếp với bóng đèn: ngắt mạch ở một chỗ (ví dụ giữa công tắc và đèn) rồi nối ampe kế vào chỗ đó.',
        'Chốt $(+)$ của ampe kế nối về phía cực dương của pin, chốt $(-)$ nối về phía bóng đèn (phía cực âm).',
        'Vôn kế đo hiệu điện thế giữa hai đầu đèn nên mắc song song với đèn: hai chốt vôn kế nối vào hai đầu bóng đèn, chốt $(+)$ ở đầu đèn phía cực dương của pin.',
        'Kiểm tra lại mạch rồi mới đóng công tắc và đọc số chỉ.',
      ],
      answer:
        'Ampe kế nối tiếp với đèn, vôn kế song song với đèn; chốt $(+)$ của cả hai đều nối về phía cực dương của nguồn.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt: 'Đổi đơn vị: $0{,}25\\ \\text{A} = \\ ?\\ \\text{mA}$',
      answer: 250,
      unit: 'mA',
      hints: ['$1\\ \\text{A} = 1\\,000\\ \\text{mA}$.'],
      solution: '$0{,}25\\ \\text{A} = 0{,}25 \\cdot 1\\,000 = 250\\ \\text{mA}$.',
    },
    {
      type: 'number',
      prompt: 'Đổi đơn vị: $75\\ \\text{mA} = \\ ?\\ \\text{A}$',
      answer: 0.075,
      unit: 'A',
      hints: ['$1\\ \\text{mA} = 0{,}001\\ \\text{A}$.'],
      solution: '$75\\ \\text{mA} = 75 \\cdot 0{,}001 = 0{,}075\\ \\text{A}$.',
    },
    {
      type: 'number',
      prompt: 'Đổi đơn vị: $1{,}2\\ \\text{kV} = \\ ?\\ \\text{V}$',
      answer: 1200,
      unit: 'V',
      hints: ['$1\\ \\text{kV} = 1\\,000\\ \\text{V}$.'],
      solution: '$1{,}2\\ \\text{kV} = 1{,}2 \\cdot 1\\,000 = 1\\,200\\ \\text{V}$.',
    },
    {
      type: 'choice',
      prompt: 'Cách mắc ampe kế nào sau đây đúng để đo cường độ dòng điện qua bóng đèn?',
      options: [
        'Song song với bóng đèn, chốt $(+)$ về phía cực dương',
        'Nối tiếp với bóng đèn, chốt $(+)$ về phía cực dương',
        'Nối tiếp với bóng đèn, chốt $(+)$ về phía cực âm',
        'Nối thẳng hai chốt vào hai cực của nguồn điện',
      ],
      answer: 1,
      hints: [
        'Dòng điện cần đo phải chạy qua cả đèn lẫn ampe kế.',
        'Dòng điện đi vào ampe kế ở chốt nào?',
      ],
      solution:
        'Ampe kế mắc nối tiếp với bóng đèn, chốt $(+)$ nối về phía cực dương của nguồn để dòng điện đi vào chốt $(+)$.',
    },
    {
      type: 'choice',
      prompt: 'Vôn kế dùng để đo hiệu điện thế giữa hai đầu bóng đèn phải được mắc',
      options: [
        'nối tiếp với bóng đèn',
        'song song với bóng đèn',
        'nối tiếp với nguồn và ampe kế',
        'ở bất cứ chỗ nào trong mạch',
      ],
      answer: 1,
      hints: ['Hai chốt của vôn kế nối vào hai điểm nào?'],
      solution: 'Vôn kế mắc song song với bóng đèn: hai chốt vôn kế nối vào hai đầu bóng đèn.',
    },
    {
      type: 'number',
      prompt:
        'Một ampe kế có GHĐ $1\\ \\text{A}$ và ĐCNN $0{,}05\\ \\text{A}$. Kim chỉ ở vạch thứ $7$ tính từ vạch $0$. Số chỉ của ampe kế là bao nhiêu ampe?',
      answer: 0.35,
      unit: 'A',
      hints: ['Mỗi khoảng chia ứng với $0{,}05\\ \\text{A}$.', 'Nhân số khoảng chia với ĐCNN.'],
      solution: '$I = 7 \\cdot 0{,}05 = 0{,}35\\ \\text{A}$.',
    },
    {
      type: 'choice',
      prompt:
        'Cần đo cường độ dòng điện khoảng $0{,}15\\ \\text{A}$. Nên chọn ampe kế nào sau đây để đo chính xác nhất?',
      options: [
        'GHĐ $100\\ \\text{mA}$, ĐCNN $2\\ \\text{mA}$',
        'GHĐ $0{,}5\\ \\text{A}$, ĐCNN $0{,}01\\ \\text{A}$',
        'GHĐ $1\\ \\text{A}$, ĐCNN $0{,}1\\ \\text{A}$',
        'GHĐ $5\\ \\text{A}$, ĐCNN $0{,}5\\ \\text{A}$',
      ],
      answer: 1,
      hints: [
        'GHĐ phải lớn hơn giá trị cần đo: $0{,}15\\ \\text{A} = 150\\ \\text{mA}$.',
        'Trong các ampe kế đủ GHĐ, chọn cái có ĐCNN nhỏ nhất.',
      ],
      solution:
        'Ampe kế GHĐ $100\\ \\text{mA}$ không đủ để đo $150\\ \\text{mA}$. Ba ampe kế còn lại đủ GHĐ; ampe kế GHĐ $0{,}5\\ \\text{A}$ có ĐCNN nhỏ nhất ($0{,}01\\ \\text{A}$) nên đo chính xác nhất.',
    },
    {
      type: 'choice',
      prompt: 'Trên một chiếc pin có ghi $1{,}5\\ \\text{V}$. Con số này cho biết',
      options: [
        'cường độ dòng điện mà pin cung cấp',
        'hiệu điện thế giữa hai cực của pin khi chưa mắc vào mạch',
        'thời gian sử dụng của pin',
        'khối lượng của pin',
      ],
      answer: 1,
      hints: ['Đơn vị vôn ($\\text{V}$) là đơn vị của đại lượng nào?'],
      solution:
        'Số vôn ghi trên nguồn điện là hiệu điện thế giữa hai cực của nó khi chưa mắc vào mạch.',
    },
    {
      type: 'choice',
      prompt:
        'Lần lượt mắc cùng một bóng đèn vào nguồn $1{,}5\\ \\text{V}$, rồi nguồn $4{,}5\\ \\text{V}$ (bóng đèn chịu được). Ở nguồn $4{,}5\\ \\text{V}$ thì',
      options: [
        'số chỉ ampe kế lớn hơn, đèn sáng hơn',
        'số chỉ ampe kế nhỏ hơn, đèn tối hơn',
        'số chỉ ampe kế không đổi',
        'đèn không sáng',
      ],
      answer: 0,
      hints: ['Hiệu điện thế giữa hai cực nguồn càng lớn thì cường độ dòng điện thế nào?'],
      solution:
        'Hiệu điện thế giữa hai cực nguồn càng lớn thì cường độ dòng điện qua đèn càng lớn (số chỉ ampe kế lớn hơn) và đèn càng sáng.',
    },
    {
      type: 'choice',
      prompt:
        'Một bạn mắc vôn kế nối tiếp với bóng đèn trong mạch có pin $3\\ \\text{V}$ rồi đóng công tắc. Hiện tượng nào xảy ra?',
      options: [
        'Đèn sáng bình thường, vôn kế chỉ $0$',
        'Đèn gần như không sáng, vôn kế chỉ gần $3\\ \\text{V}$',
        'Vôn kế bị cháy ngay',
        'Đèn sáng hơn bình thường',
      ],
      answer: 1,
      hints: ['Vôn kế cản trở dòng điện rất mạnh. Khi mắc nối tiếp, dòng điện trong mạch thế nào?'],
      solution:
        'Vôn kế cản trở dòng điện rất mạnh nên mạch gần như không có dòng điện, đèn không sáng; vôn kế lúc này đo gần đúng hiệu điện thế giữa hai cực của pin, khoảng $3\\ \\text{V}$.',
    },
  ],
  takeaways: [
    'Cường độ dòng điện $I$ cho biết mức độ mạnh yếu của dòng điện; đơn vị ampe ($\\text{A}$); $1\\ \\text{A} = 1\\,000\\ \\text{mA}$.',
    'Hiệu điện thế $U$ giữa hai cực của nguồn đo khả năng sinh ra dòng điện của nguồn; đơn vị vôn ($\\text{V}$); $1\\ \\text{kV} = 1\\,000\\ \\text{V}$, $1\\ \\text{mV} = 0{,}001\\ \\text{V}$.',
    'Ampe kế mắc nối tiếp, vôn kế mắc song song với dụng cụ cần đo; chốt $(+)$ nối về phía cực dương của nguồn.',
    'Hiệu điện thế giữa hai cực nguồn càng lớn thì cường độ dòng điện qua đèn càng lớn, đèn càng sáng.',
  ],
};
