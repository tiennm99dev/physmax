/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Hệ Mặt Trời gồm Mặt Trời ở trung tâm và tám hành tinh chuyển động quanh nó, từ gần đến xa: Thuỷ tinh, Kim tinh, Trái Đất, Hoả tinh, Mộc tinh, Thổ tinh, Thiên Vương tinh, Hải Vương tinh; khoảng cách trong Hệ Mặt Trời đo bằng đơn vị thiên văn (1 AU khoảng 150 triệu km).',
  intro:
    'Trái Đất của chúng ta không cô đơn: cùng với nó, còn bảy hành tinh khác chuyển động quanh Mặt Trời. Hành tinh nào ở gần Mặt Trời nhất, hành tinh nào lớn nhất? Nếu thu nhỏ Hệ Mặt Trời để Trái Đất cách Mặt Trời $1$ m thì hành tinh xa nhất phải đặt cách bao xa?',
  objectives: [
    'Mô tả được sơ lược cấu trúc của Hệ Mặt Trời: Mặt Trời ở trung tâm, tám hành tinh chuyển động quanh Mặt Trời.',
    'Kể tên và sắp xếp được tám hành tinh theo thứ tự từ gần đến xa Mặt Trời.',
    'Nêu được đơn vị thiên văn và dùng nó để so sánh khoảng cách từ các hành tinh đến Mặt Trời.',
    'So sánh được kích thước tương đối của các hành tinh; phân biệt hành tinh vòng trong và vòng ngoài.',
  ],
  sections: [
    {
      heading: 'Mặt Trời và tám hành tinh',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Hệ Mặt Trời',
          text: 'Hệ Mặt Trời gồm Mặt Trời ở trung tâm và các thiên thể chuyển động quanh nó: tám hành tinh cùng các vệ tinh của chúng, các tiểu hành tinh, sao chổi và bụi, khí.',
        },
        {
          type: 'list',
          items: [
            'Mặt Trời là một ngôi sao, tự phát ra ánh sáng và chiếu sáng cả Hệ Mặt Trời. Đường kính Mặt Trời gấp khoảng $109$ lần đường kính Trái Đất.',
            'Các hành tinh không tự phát sáng; ta thấy chúng vì chúng phản chiếu ánh sáng Mặt Trời.',
            'Các hành tinh chuyển động quanh Mặt Trời trên những quỹ đạo gần tròn, cùng chiều với nhau.',
            'Trái Đất là hành tinh duy nhất đã biết có sự sống.',
          ],
        },
      ],
    },
    {
      heading: 'Thứ tự các hành tinh',
      blocks: [
        {
          type: 'p',
          text: 'Tính từ Mặt Trời ra xa, tám hành tinh lần lượt là: Thuỷ tinh, Kim tinh, Trái Đất, Hoả tinh, Mộc tinh, Thổ tinh, Thiên Vương tinh, Hải Vương tinh. Thuỷ tinh gần Mặt Trời nhất, Hải Vương tinh xa Mặt Trời nhất; Trái Đất là hành tinh thứ ba.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Mẹo nhớ',
          text: '"Thuỷ, Kim, Địa, Hoả, Mộc, Thổ, Thiên, Hải" (Địa là Trái Đất). Kim tinh là sao Hôm, sao Mai mà ta thấy sáng rõ lúc chập tối hoặc gần sáng.',
        },
        {
          type: 'table',
          caption: 'Hai nhóm hành tinh',
          head: ['Nhóm', 'Các hành tinh', 'Đặc điểm'],
          rows: [
            [
              'Vòng trong',
              'Thuỷ tinh, Kim tinh, Trái Đất, Hoả tinh',
              'Gần Mặt Trời, kích thước nhỏ, chủ yếu cấu tạo bằng đất đá',
            ],
            [
              'Vòng ngoài',
              'Mộc tinh, Thổ tinh, Thiên Vương tinh, Hải Vương tinh',
              'Xa Mặt Trời, kích thước rất lớn, chủ yếu là các chất khí',
            ],
          ],
        },
        {
          type: 'p',
          text: 'Giữa quỹ đạo Hoả tinh và Mộc tinh có vành đai tiểu hành tinh, gồm rất nhiều thiên thể nhỏ bằng đá chuyển động quanh Mặt Trời.',
        },
      ],
    },
    {
      heading: 'Khoảng cách và kích thước tương đối',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Đơn vị thiên văn',
          text: 'Khoảng cách trong Hệ Mặt Trời rất lớn nên người ta dùng đơn vị thiên văn (kí hiệu AU, còn viết là đvtv): $1\\ \\text{AU}$ bằng khoảng cách trung bình từ Trái Đất đến Mặt Trời, khoảng $150$ triệu kilômét.',
        },
        {
          type: 'table',
          caption: 'Một số số liệu về tám hành tinh (làm tròn)',
          head: [
            'Hành tinh',
            'Khoảng cách đến Mặt Trời (AU)',
            'Đường kính so với Trái Đất',
            'Quay một vòng quanh Mặt Trời',
          ],
          rows: [
            ['Thuỷ tinh', '$0{,}39$', '$0{,}38$', '$88$ ngày'],
            ['Kim tinh', '$0{,}72$', '$0{,}95$', '$225$ ngày'],
            ['Trái Đất', '$1$', '$1$', '$1$ năm'],
            ['Hoả tinh', '$1{,}52$', '$0{,}53$', '$1{,}88$ năm'],
            ['Mộc tinh', '$5{,}2$', '$11{,}2$', '$11{,}9$ năm'],
            ['Thổ tinh', '$9{,}54$', '$9{,}45$', '$29{,}5$ năm'],
            ['Thiên Vương tinh', '$19{,}2$', '$4{,}0$', '$84$ năm'],
            ['Hải Vương tinh', '$30{,}1$', '$3{,}9$', '$165$ năm'],
          ],
        },
        {
          type: 'list',
          items: [
            'Hành tinh càng xa Mặt Trời thì quỹ đạo càng dài và thời gian quay một vòng quanh Mặt Trời càng lâu.',
            'Mộc tinh lớn nhất: đường kính gấp khoảng $11$ lần Trái Đất. Thuỷ tinh nhỏ nhất.',
            'Bốn hành tinh vòng trong nằm rất gần nhau (trong khoảng $1{,}5\\ \\text{AU}$), còn các hành tinh vòng ngoài cách nhau rất xa.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Hình vẽ Hệ Mặt Trời thường không đúng tỉ lệ',
          text: 'Nếu vẽ các hành tinh đúng tỉ lệ khoảng cách trên một trang giấy, các hành tinh sẽ nhỏ hơn cả một hạt bụi. Vì vậy trong sách, các hành tinh thường được vẽ to hơn rất nhiều và đặt gần nhau hơn thật.',
        },
      ],
    },
  ],
  explore: {
    title: 'Mô hình Hệ Mặt Trời theo tỉ lệ',
    instruction:
      'Ở chế độ "Quỹ đạo và khoảng cách", kéo thanh trượt để thu nhỏ dần từ bốn hành tinh vòng trong ra tới Hải Vương tinh, rồi cho các hành tinh chuyển động để so sánh hành tinh gần và hành tinh xa. Chuyển sang "Kích thước" để thấy tám hành tinh vẽ cùng một tỉ lệ cạnh Mặt Trời. Chọn từng hành tinh để xem số liệu.',
  },
  examples: [
    {
      problem:
        'Một nhóm học sinh làm mô hình Hệ Mặt Trời trên sân trường với tỉ lệ $1\\ \\text{AU}$ ứng với $1$ m. Phải đặt Thuỷ tinh, Mộc tinh và Hải Vương tinh cách quả cầu Mặt Trời bao xa? (Thuỷ tinh $0{,}39\\ \\text{AU}$, Mộc tinh $5{,}2\\ \\text{AU}$, Hải Vương tinh $30{,}1\\ \\text{AU}$.)',
      steps: [
        'Mỗi $1\\ \\text{AU}$ ứng với $1$ m, nên số mét bằng số AU.',
        'Thuỷ tinh: $0{,}39$ m $= 39$ cm. Trái Đất: $1$ m.',
        'Mộc tinh: $5{,}2$ m. Hải Vương tinh: $30{,}1$ m.',
      ],
      answer:
        'Thuỷ tinh cách $39$ cm, Mộc tinh cách $5{,}2$ m, Hải Vương tinh cách khoảng $30$ m: các hành tinh vòng ngoài ở rất xa so với vòng trong.',
    },
    {
      problem:
        'Mộc tinh cách Mặt Trời khoảng $5{,}2\\ \\text{AU}$. Tính khoảng cách này ra triệu kilômét, biết $1\\ \\text{AU} \\approx 150$ triệu km. Mộc tinh xa Mặt Trời gấp mấy lần Trái Đất?',
      steps: [
        'Khoảng cách: $5{,}2 \\times 150 = 780$ triệu km.',
        'Trái Đất cách Mặt Trời $1\\ \\text{AU}$, nên Mộc tinh xa gấp $5{,}2 : 1 = 5{,}2$ lần.',
      ],
      answer: 'Mộc tinh cách Mặt Trời khoảng $780$ triệu km, xa gấp $5{,}2$ lần Trái Đất.',
    },
  ],
  practice: [
    {
      type: 'order',
      prompt: 'Sắp xếp các hành tinh sau theo thứ tự từ gần đến xa Mặt Trời.',
      items: ['Hoả tinh', 'Thuỷ tinh', 'Mộc tinh', 'Trái Đất', 'Kim tinh'],
      answer: [1, 4, 3, 0, 2],
      hints: ['Nhớ mẹo: Thuỷ, Kim, Địa, Hoả, Mộc, …'],
      solution: 'Thuỷ tinh → Kim tinh → Trái Đất → Hoả tinh → Mộc tinh.',
    },
    {
      type: 'choice',
      prompt: 'Hành tinh nào gần Mặt Trời nhất?',
      options: ['Kim tinh', 'Trái Đất', 'Hải Vương tinh', 'Thuỷ tinh'],
      answer: 3,
      hints: ['Đó là hành tinh đứng đầu trong mẹo nhớ.'],
      solution: 'Thuỷ tinh gần Mặt Trời nhất, cách khoảng $0{,}39\\ \\text{AU}$.',
    },
    {
      type: 'choice',
      prompt: 'Hành tinh nào lớn nhất trong Hệ Mặt Trời?',
      options: ['Thổ tinh', 'Mộc tinh', 'Trái Đất', 'Hải Vương tinh'],
      answer: 1,
      hints: ['Hành tinh này có đường kính gấp khoảng $11$ lần Trái Đất.'],
      solution:
        'Mộc tinh lớn nhất, đường kính gấp khoảng $11{,}2$ lần Trái Đất; Thổ tinh đứng thứ hai (khoảng $9{,}45$ lần).',
    },
    {
      type: 'number',
      prompt:
        'Thổ tinh cách Mặt Trời khoảng $9{,}54\\ \\text{AU}$. Biết $1\\ \\text{AU} \\approx 150$ triệu km, khoảng cách đó là bao nhiêu triệu kilômét?',
      answer: 1431,
      unit: 'triệu km',
      hints: ['Nhân số AU với $150$.'],
      solution: '$9{,}54 \\times 150 = 1\\,431$ triệu km.',
    },
    {
      type: 'number',
      prompt:
        'Trái Đất cách Mặt Trời $1\\ \\text{AU}$, Hoả tinh cách Mặt Trời $1{,}52\\ \\text{AU}$. Coi hai quỹ đạo là hai đường tròn cùng tâm, khoảng cách giữa hai quỹ đạo là bao nhiêu AU?',
      answer: 0.52,
      tolerance: 0.001,
      unit: 'AU',
      hints: ['Lấy khoảng cách lớn trừ khoảng cách nhỏ.'],
      solution: '$1{,}52 - 1 = 0{,}52\\ \\text{AU}$ (khoảng $0{,}52 \\times 150 = 78$ triệu km).',
    },
    {
      type: 'number',
      prompt:
        'Đường kính Mộc tinh khoảng $142\\,984$ km, đường kính Trái Đất khoảng $12\\,756$ km. Đường kính Mộc tinh gấp khoảng bao nhiêu lần đường kính Trái Đất? (làm tròn đến hàng đơn vị)',
      answer: 11,
      hints: ['Chia đường kính Mộc tinh cho đường kính Trái Đất.'],
      solution: '$142\\,984 : 12\\,756 \\approx 11{,}2$, làm tròn được $11$ lần.',
    },
    {
      type: 'multi',
      prompt: 'Những hành tinh nào thuộc nhóm vòng ngoài, chủ yếu là các chất khí?',
      options: [
        'Mộc tinh',
        'Hoả tinh',
        'Thổ tinh',
        'Kim tinh',
        'Thiên Vương tinh',
        'Hải Vương tinh',
      ],
      answers: [0, 2, 4, 5],
      hints: ['Nhóm vòng ngoài là bốn hành tinh ở xa Mặt Trời hơn vành đai tiểu hành tinh.'],
      solution:
        'Vòng ngoài: Mộc tinh, Thổ tinh, Thiên Vương tinh, Hải Vương tinh. Hoả tinh và Kim tinh là hành tinh vòng trong, bằng đất đá.',
    },
    {
      type: 'choice',
      prompt: 'Hành tinh nào mất nhiều thời gian nhất để quay một vòng quanh Mặt Trời?',
      options: ['Thuỷ tinh', 'Mộc tinh', 'Hải Vương tinh', 'Trái Đất'],
      answer: 2,
      hints: ['Hành tinh càng xa Mặt Trời thì quay một vòng càng lâu.'],
      solution: 'Hải Vương tinh xa Mặt Trời nhất nên quay một vòng lâu nhất, khoảng $165$ năm.',
    },
    {
      type: 'text',
      prompt:
        'Khoảng cách trung bình từ Trái Đất đến Mặt Trời được dùng làm một đơn vị đo khoảng cách. Đơn vị đó tên là gì?',
      accept: ['đơn vị thiên văn', 'AU', 'đvtv', 'don vi thien van', '1 đơn vị thiên văn'],
      hints: ['Kí hiệu của nó là AU.'],
      solution: 'Đó là đơn vị thiên văn (AU): $1\\ \\text{AU} \\approx 150$ triệu km.',
    },
    {
      type: 'number',
      prompt:
        'Trong một mô hình, $1\\ \\text{AU}$ ứng với $10$ cm. Hải Vương tinh cách Mặt Trời khoảng $30\\ \\text{AU}$. Trong mô hình, phải đặt Hải Vương tinh cách Mặt Trời bao nhiêu mét?',
      answer: 3,
      unit: 'm',
      hints: ['Tính ra centimét trước: $30 \\times 10$.', 'Đổi centimét ra mét: $100$ cm $= 1$ m.'],
      solution: '$30 \\times 10 = 300$ cm $= 3$ m.',
    },
    {
      type: 'choice',
      prompt: 'Nhận định nào về Hệ Mặt Trời là đúng?',
      options: [
        'Trái Đất ở trung tâm, Mặt Trời quay quanh Trái Đất',
        'Mặt Trời là một hành tinh lớn',
        'Mặt Trời là một ngôi sao ở trung tâm, tám hành tinh chuyển động quanh nó',
        'Hệ Mặt Trời chỉ gồm Mặt Trời và tám hành tinh, không có thiên thể nào khác',
      ],
      answer: 2,
      hints: [
        'Thiên thể nào tự phát sáng? Ngoài hành tinh, Hệ Mặt Trời còn có vệ tinh, sao chổi, …',
      ],
      solution:
        'Mặt Trời là ngôi sao ở trung tâm Hệ Mặt Trời, tám hành tinh chuyển động quanh nó; Hệ Mặt Trời còn có vệ tinh, tiểu hành tinh, sao chổi.',
    },
  ],
  takeaways: [
    'Hệ Mặt Trời gồm Mặt Trời (một ngôi sao) ở trung tâm, tám hành tinh chuyển động quanh nó cùng các vệ tinh, tiểu hành tinh, sao chổi.',
    'Thứ tự từ gần đến xa Mặt Trời: Thuỷ tinh, Kim tinh, Trái Đất, Hoả tinh, Mộc tinh, Thổ tinh, Thiên Vương tinh, Hải Vương tinh.',
    'Bốn hành tinh vòng trong nhỏ, bằng đất đá; bốn hành tinh vòng ngoài rất lớn, chủ yếu là khí. Mộc tinh lớn nhất.',
    '$1$ đơn vị thiên văn ($1\\ \\text{AU}$) là khoảng cách trung bình từ Trái Đất đến Mặt Trời, khoảng $150$ triệu km. Hành tinh càng xa Mặt Trời thì quay quanh Mặt Trời càng lâu.',
  ],
};
