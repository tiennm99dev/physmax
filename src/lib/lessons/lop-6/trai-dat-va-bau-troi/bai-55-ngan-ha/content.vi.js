/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Sao là thiên thể tự phát sáng; thiên hà là tập hợp hàng trăm tỉ ngôi sao cùng khí, bụi liên kết với nhau; Ngân Hà là thiên hà chứa Hệ Mặt Trời; khoảng cách giữa các ngôi sao đo bằng năm ánh sáng, quãng đường ánh sáng đi trong một năm, khoảng 9 461 tỉ km.',
  intro:
    'Những đêm trời trong, ở nơi không có đèn điện, ta thấy một dải sáng mờ như dòng sữa vắt ngang bầu trời. Ông bà ta gọi đó là sông Ngân, nơi Ngưu Lang và Chức Nữ bị chia cắt. Thật ra dải sáng ấy là gì, và các ngôi sao ở xa chúng ta đến mức nào?',
  objectives: [
    'Nêu được ngôi sao là thiên thể tự phát sáng, Mặt Trời là một ngôi sao.',
    'Nêu được thiên hà là gì; nêu được Ngân Hà là thiên hà chứa Hệ Mặt Trời.',
    'Nêu được năm ánh sáng là đơn vị đo khoảng cách và tính được độ dài của một năm ánh sáng.',
    'So sánh được các khoảng cách trong vũ trụ bằng thời gian ánh sáng đi hết quãng đường.',
  ],
  sections: [
    {
      heading: 'Ngôi sao và thiên hà',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Ngôi sao',
          text: 'Ngôi sao (sao) là thiên thể tự phát ra ánh sáng. Mặt Trời là một ngôi sao; nó trông to và sáng hơn hẳn các ngôi sao khác chỉ vì nó ở gần Trái Đất hơn rất nhiều.',
        },
        {
          type: 'p',
          text: 'Ban đêm, các ngôi sao trông chỉ như những chấm sáng nhỏ, vì chúng ở rất xa. Nhiều ngôi sao thật ra lớn và sáng hơn Mặt Trời.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Thiên hà',
          text: 'Thiên hà là một tập hợp rất nhiều ngôi sao (hàng trăm tỉ ngôi sao) cùng các hành tinh, khí và bụi, liên kết với nhau bởi lực hấp dẫn. Vũ trụ có rất nhiều thiên hà.',
        },
      ],
    },
    {
      heading: 'Ngân Hà',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Hệ Mặt Trời thuộc Ngân Hà',
          text: 'Ngân Hà là thiên hà chứa Hệ Mặt Trời. Ngân Hà gồm hàng trăm tỉ thiên thể liên kết với nhau bằng lực hấp dẫn; Hệ Mặt Trời chỉ là một phần rất nhỏ của Ngân Hà.',
        },
        {
          type: 'list',
          items: [
            'Nhìn từ bên ngoài, Ngân Hà có hình xoắn ốc với các nhánh cuộn quanh tâm.',
            'Đường kính của Ngân Hà khoảng $100\\,000$ năm ánh sáng.',
            'Hệ Mặt Trời nằm ở rìa một nhánh xoắn, cách tâm Ngân Hà khoảng $26\\,000$ năm ánh sáng, và chuyển động quanh tâm Ngân Hà.',
          ],
        },
        {
          type: 'p',
          text: 'Trái Đất nằm bên trong Ngân Hà nên ta không thể thấy toàn bộ hình dạng của nó. Khi nhìn dọc theo mặt phẳng của Ngân Hà, ta thấy vô số ngôi sao ở rất xa nằm chồng lên nhau thành dải sáng mờ trên bầu trời đêm: đó là dải Ngân Hà (sông Ngân).',
        },
      ],
    },
    {
      heading: 'Năm ánh sáng',
      blocks: [
        {
          type: 'p',
          text: 'Khoảng cách giữa các ngôi sao lớn đến mức dùng kilômét hay đơn vị thiên văn đều cho những con số quá dài. Người ta dùng một đơn vị lớn hơn nhiều, dựa vào tốc độ của ánh sáng: khoảng $300\\,000\\ \\text{km}$ mỗi giây.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Năm ánh sáng',
          text: 'Năm ánh sáng là quãng đường ánh sáng đi được trong một năm. Năm ánh sáng là đơn vị đo khoảng cách, không phải đơn vị đo thời gian.',
        },
        {
          type: 'tex',
          tex: '1\\ \\text{năm ánh sáng} \\approx 300\\,000 \\times 365 \\times 24 \\times 3\\,600 = 9\\,460\\,800\\,000\\,000\\ \\text{km} \\approx 9\\,461\\ \\text{tỉ km}',
        },
        {
          type: 'table',
          caption: 'Thời gian ánh sáng đi từ một số thiên thể đến Trái Đất',
          head: ['Thiên thể', 'Khoảng cách đến Trái Đất', 'Ánh sáng đi mất'],
          rows: [
            ['Mặt Trăng', '$384\\,400$ km', 'khoảng $1{,}3$ giây'],
            ['Mặt Trời', '$150$ triệu km', 'khoảng $8$ phút $20$ giây'],
            [
              'Cận Tinh (ngôi sao gần nhất sau Mặt Trời)',
              'khoảng $4{,}2$ năm ánh sáng',
              'khoảng $4{,}2$ năm',
            ],
            ['Tâm Ngân Hà', 'khoảng $26\\,000$ năm ánh sáng', 'khoảng $26\\,000$ năm'],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Nhìn sao là nhìn về quá khứ',
          text: 'Ánh sáng từ Cận Tinh phải đi hơn $4$ năm mới tới mắt ta, nên đêm nay ta thấy Cận Tinh như nó của hơn $4$ năm trước. Ánh sáng Mặt Trời ta thấy lúc này đã rời Mặt Trời khoảng $8$ phút trước.',
        },
      ],
    },
  ],
  explore: {
    title: 'Hành trình từ Trái Đất tới Ngân Hà',
    instruction:
      'Kéo thanh trượt (hoặc nhấn "Tới điểm dừng tiếp theo") để bay ra xa Trái Đất. Theo dõi khoảng cách và thời gian ánh sáng đi hết quãng đường đó: lúc nào đơn vị kilômét trở nên quá nhỏ? Từ Hệ Mặt Trời tới ngôi sao gần nhất xa hơn bao nhiêu lần? Hệ Mặt Trời nằm ở đâu trong Ngân Hà?',
  },
  examples: [
    {
      problem:
        'Ánh sáng đi được khoảng $300\\,000\\ \\text{km}$ mỗi giây. Tính độ dài của một năm ánh sáng (coi một năm có $365$ ngày).',
      steps: [
        'Số giây trong một năm: $365 \\times 24 \\times 3\\,600 = 31\\,536\\,000$ giây.',
        'Quãng đường ánh sáng đi trong một năm: $300\\,000 \\times 31\\,536\\,000 = 9\\,460\\,800\\,000\\,000$ km.',
        'Viết gọn: khoảng $9\\,461$ tỉ km (gần $10$ nghìn tỉ km).',
      ],
      answer:
        '$1$ năm ánh sáng $\\approx 9\\,460\\,800\\,000\\,000$ km, tức khoảng $9\\,461$ tỉ km.',
    },
    {
      problem:
        'Mặt Trời cách Trái Đất khoảng $150$ triệu km. Ánh sáng từ Mặt Trời đến Trái Đất mất bao lâu?',
      steps: [
        'Đổi $150$ triệu km $= 150\\,000\\,000$ km.',
        'Thời gian: $150\\,000\\,000 : 300\\,000 = 500$ giây.',
        '$500$ giây $= 8$ phút $20$ giây (vì $8 \\times 60 = 480$, còn dư $20$ giây).',
      ],
      answer: 'Ánh sáng Mặt Trời đến Trái Đất mất khoảng $500$ giây, tức $8$ phút $20$ giây.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Phát biểu nào đúng về Ngân Hà?',
      options: [
        'Ngân Hà là một dòng sông thật trên bầu trời',
        'Ngân Hà gồm tất cả các thiên thể trong vũ trụ',
        'Ngân Hà là tên gọi khác của Hệ Mặt Trời',
        'Ngân Hà là tập hợp hàng trăm tỉ thiên thể liên kết với nhau bằng lực hấp dẫn, trong đó có Hệ Mặt Trời',
      ],
      answer: 3,
      hints: ['Ngân Hà là một thiên hà. Vũ trụ có một hay nhiều thiên hà?'],
      solution:
        'Ngân Hà là thiên hà chứa Hệ Mặt Trời, gồm hàng trăm tỉ thiên thể liên kết bằng lực hấp dẫn. Vũ trụ còn rất nhiều thiên hà khác, nên Ngân Hà không chứa tất cả thiên thể.',
    },
    {
      type: 'choice',
      prompt: 'Hệ Mặt Trời nằm ở đâu trong Ngân Hà?',
      options: [
        'Ở rìa một nhánh xoắn, cách tâm Ngân Hà rất xa',
        'Ở đúng tâm Ngân Hà',
        'Ở bên ngoài Ngân Hà',
        'Hệ Mặt Trời chứa cả Ngân Hà',
      ],
      answer: 0,
      hints: ['Hệ Mặt Trời cách tâm Ngân Hà khoảng $26\\,000$ năm ánh sáng.'],
      solution:
        'Hệ Mặt Trời là một phần nhỏ của Ngân Hà, nằm ở rìa một nhánh xoắn, cách tâm khoảng $26\\,000$ năm ánh sáng.',
    },
    {
      type: 'choice',
      prompt: '"Năm ánh sáng" là đơn vị đo đại lượng nào?',
      options: ['Thời gian', 'Khoảng cách (độ dài)', 'Tốc độ', 'Độ sáng của ngôi sao'],
      answer: 1,
      hints: ['Năm ánh sáng là quãng đường ánh sáng đi được trong một năm.'],
      solution:
        'Năm ánh sáng là quãng đường ánh sáng đi trong một năm, nên nó đo khoảng cách, dù tên có chữ "năm".',
    },
    {
      type: 'text',
      prompt: 'Thiên thể tự phát ra ánh sáng gọi là gì? Mặt Trời là một … như thế.',
      accept: ['ngôi sao', 'sao', 'một ngôi sao'],
      hints: ['Hành tinh và vệ tinh không tự phát sáng.'],
      solution: 'Thiên thể tự phát sáng là ngôi sao (sao). Mặt Trời là một ngôi sao.',
    },
    {
      type: 'number',
      prompt:
        'Ánh sáng đi được khoảng $300\\,000\\ \\text{km}$ mỗi giây. Trong $1$ giờ, ánh sáng đi được bao nhiêu kilômét?',
      answer: 1080000000,
      unit: 'km',
      hints: ['$1$ giờ có bao nhiêu giây?', 'Nhân $300\\,000$ với $3\\,600$.'],
      solution:
        '$1$ giờ $= 3\\,600$ giây. Quãng đường: $300\\,000 \\times 3\\,600 = 1\\,080\\,000\\,000$ km (hơn một tỉ kilômét).',
    },
    {
      type: 'number',
      prompt:
        'Mặt Trời cách Trái Đất khoảng $150\\,000\\,000$ km, ánh sáng đi $300\\,000$ km mỗi giây. Ánh sáng Mặt Trời đến Trái Đất mất bao nhiêu giây?',
      answer: 500,
      unit: 'giây',
      hints: ['Thời gian bằng quãng đường chia cho quãng đường đi được trong mỗi giây.'],
      solution: '$150\\,000\\,000 : 300\\,000 = 500$ giây, tức $8$ phút $20$ giây.',
    },
    {
      type: 'number',
      prompt:
        'Sao Ngưu Lang cách Trái Đất khoảng $17$ năm ánh sáng. Ánh sáng của sao Ngưu Lang mà em nhìn thấy đêm nay đã rời ngôi sao đó khoảng bao nhiêu năm trước?',
      answer: 17,
      unit: 'năm',
      hints: ['Một năm ánh sáng là quãng đường ánh sáng đi trong bao lâu?'],
      solution:
        'Mỗi năm ánh sáng ánh sáng đi mất $1$ năm, nên $17$ năm ánh sáng ánh sáng đi mất khoảng $17$ năm: ta thấy sao Ngưu Lang như nó của $17$ năm trước.',
    },
    {
      type: 'number',
      prompt:
        'Cận Tinh cách Trái Đất khoảng $4$ năm ánh sáng. Lấy $1$ năm ánh sáng $\\approx 9\\,461$ tỉ km, khoảng cách đó là bao nhiêu tỉ kilômét?',
      answer: 37844,
      unit: 'tỉ km',
      hints: ['Nhân số năm ánh sáng với $9\\,461$.'],
      solution: '$4 \\times 9\\,461 = 37\\,844$ tỉ km.',
    },
    {
      type: 'multi',
      prompt: 'Những nhận định nào đúng?',
      options: [
        'Mặt Trời là một ngôi sao',
        'Các ngôi sao trông nhỏ vì chúng ở rất xa',
        'Ngân Hà là thiên hà duy nhất trong vũ trụ',
        'Dải sáng mờ vắt ngang bầu trời đêm là hình ảnh của vô số ngôi sao trong Ngân Hà',
        'Từ Trái Đất ta thấy được toàn bộ hình xoắn ốc của Ngân Hà',
      ],
      answers: [0, 1, 3],
      hints: ['Trái Đất nằm bên trong hay bên ngoài Ngân Hà?'],
      solution:
        'Đúng: Mặt Trời là ngôi sao; các ngôi sao trông nhỏ vì ở rất xa; dải Ngân Hà là vô số ngôi sao ở xa chồng lên nhau. Sai: vũ trụ có rất nhiều thiên hà; Trái Đất ở bên trong Ngân Hà nên không thấy được toàn bộ hình dạng của nó.',
    },
    {
      type: 'number',
      prompt:
        'Đường kính của Ngân Hà khoảng $100\\,000$ năm ánh sáng. Ánh sáng đi từ rìa này sang rìa kia của Ngân Hà mất khoảng bao nhiêu năm?',
      answer: 100000,
      unit: 'năm',
      hints: ['Ánh sáng đi $1$ năm ánh sáng mất $1$ năm.'],
      solution: 'Ánh sáng đi $100\\,000$ năm ánh sáng mất khoảng $100\\,000$ năm.',
    },
  ],
  takeaways: [
    'Ngôi sao là thiên thể tự phát sáng; Mặt Trời là một ngôi sao.',
    'Thiên hà là tập hợp hàng trăm tỉ ngôi sao cùng hành tinh, khí, bụi liên kết bằng lực hấp dẫn; vũ trụ có rất nhiều thiên hà.',
    'Ngân Hà là thiên hà chứa Hệ Mặt Trời, có hình xoắn ốc, đường kính khoảng $100\\,000$ năm ánh sáng; Hệ Mặt Trời là một phần rất nhỏ, nằm ở rìa một nhánh xoắn.',
    'Năm ánh sáng là quãng đường ánh sáng đi trong một năm, khoảng $9\\,461$ tỉ km; đó là đơn vị đo khoảng cách.',
  ],
};
