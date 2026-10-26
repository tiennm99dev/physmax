/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Tốc độ cho biết chuyển động nhanh hay chậm, bằng quãng đường đi được chia cho thời gian đi quãng đường đó (v = s/t); đơn vị thường dùng là m/s và km/h, với 1 m/s = 3,6 km/h.',
  intro:
    'Trong giờ thể dục, bốn bạn chạy những quãng đường khác nhau và mỗi bạn mất một khoảng thời gian khác nhau. Nếu hai bạn không chạy cùng quãng đường, cũng không chạy trong cùng thời gian, làm sao biết bạn nào chạy nhanh hơn?',
  objectives: [
    'Nêu được ý nghĩa vật lí của tốc độ: đại lượng cho biết chuyển động nhanh hay chậm.',
    'Liệt kê được đơn vị đo tốc độ thường dùng: m/s và km/h; đổi được giữa hai đơn vị này.',
    'Tính được tốc độ theo công thức $v = \\dfrac{s}{t}$, và tính được quãng đường hoặc thời gian khi biết hai đại lượng còn lại.',
    'So sánh được độ nhanh, chậm của các chuyển động.',
  ],
  sections: [
    {
      heading: 'Tốc độ chuyển động',
      blocks: [
        {
          type: 'p',
          text: 'Có hai cách so sánh độ nhanh, chậm của hai chuyển động mà không cần tính toán:',
        },
        {
          type: 'list',
          items: [
            'Cùng một quãng đường: chuyển động nào mất ít thời gian hơn thì nhanh hơn.',
            'Cùng một khoảng thời gian: chuyển động nào đi được quãng đường dài hơn thì nhanh hơn.',
          ],
        },
        {
          type: 'table',
          caption: 'Kết quả chạy của bốn bạn trong giờ thể dục',
          head: [
            'Bạn',
            'Quãng đường $s$ (m)',
            'Thời gian $t$ (s)',
            'Quãng đường chạy trong $1\\ \\text{s}$ (m)',
          ],
          rows: [
            ['An', '$60$', '$10$', '$60 : 10 = 6$'],
            ['Bình', '$60$', '$12$', '$60 : 12 = 5$'],
            ['Chi', '$100$', '$16$', '$100 : 16 = 6{,}25$'],
            ['Dũng', '$72$', '$16$', '$72 : 16 = 4{,}5$'],
          ],
        },
        {
          type: 'p',
          text: 'An và Bình chạy cùng $60\\ \\text{m}$, An mất ít thời gian hơn nên An nhanh hơn. Chi và Dũng chạy cùng $16\\ \\text{s}$, Chi chạy được xa hơn nên Chi nhanh hơn. Còn An và Chi khác cả quãng đường lẫn thời gian: ta so sánh quãng đường mỗi bạn chạy được trong $1\\ \\text{s}$. Chi chạy được $6{,}25\\ \\text{m}$ mỗi giây, An chạy được $6\\ \\text{m}$, nên Chi nhanh hơn An.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Tốc độ',
          text: 'Thương số $\\dfrac{s}{t}$ đặc trưng cho sự nhanh, chậm của chuyển động, gọi là tốc độ chuyển động, gọi tắt là tốc độ. Tốc độ $=$ quãng đường đi được $:$ thời gian đi quãng đường đó.',
        },
        { type: 'tex', tex: 'v = \\frac{s}{t}' },
        {
          type: 'p',
          text: 'Trong đó $v$ là tốc độ, $s$ là quãng đường đi được, $t$ là thời gian đi quãng đường đó. Tốc độ càng lớn thì chuyển động càng nhanh. Từ công thức suy ra:',
        },
        { type: 'tex', tex: 's = v \\cdot t \\qquad\\qquad t = \\frac{s}{v}' },
      ],
    },
    {
      heading: 'Đơn vị đo tốc độ',
      blocks: [
        {
          type: 'p',
          text: 'Đơn vị đo tốc độ phụ thuộc vào đơn vị đo độ dài và đơn vị đo thời gian: quãng đường đo bằng mét, thời gian đo bằng giây thì tốc độ có đơn vị mét trên giây ($\\text{m/s}$). Trong hệ đơn vị đo lường chính thức ở nước ta, đơn vị tốc độ thường dùng là mét trên giây ($\\text{m/s}$) và kilômét trên giờ ($\\text{km/h}$).',
        },
        {
          type: 'table',
          caption: 'Đơn vị tốc độ ứng với đơn vị độ dài và thời gian',
          head: ['Đơn vị độ dài', 'Đơn vị thời gian', 'Đơn vị tốc độ'],
          rows: [
            ['m', 's', '$\\text{m/s}$'],
            ['km', 'h', '$\\text{km/h}$'],
            ['km', 's', '$\\text{km/s}$'],
            ['cm', 's', '$\\text{cm/s}$'],
          ],
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Đổi đơn vị',
          text: '$1\\ \\text{m/s} = \\dfrac{1\\ \\text{m}}{1\\ \\text{s}} = \\dfrac{0{,}001\\ \\text{km}}{\\frac{1}{3600}\\ \\text{h}} = 3{,}6\\ \\text{km/h}$. Muốn đổi từ $\\text{m/s}$ sang $\\text{km/h}$ ta nhân với $3{,}6$; đổi từ $\\text{km/h}$ sang $\\text{m/s}$ ta chia cho $3{,}6$. Ví dụ $36\\ \\text{km/h} = 10\\ \\text{m/s}$.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Đơn vị phải khớp nhau',
          text: 'Khi so sánh tốc độ, phải đổi về cùng một đơn vị. Khi dùng công thức $v = \\dfrac{s}{t}$, nếu $s$ đo bằng km và $t$ đo bằng phút thì phải đổi phút ra giờ (hoặc km ra m và phút ra giây) trước khi chia.',
        },
      ],
    },
  ],
  explore: {
    title: 'Cuộc đua ảo',
    instruction:
      'Chọn từng bạn rồi chỉnh quãng đường $s$ và thời gian $t$ của bạn đó. Bảng xếp hạng tính $v = \\dfrac{s}{t}$ và xếp từ nhanh đến chậm. Nhấn "Xuất phát" để thấy mọi bạn chạy cùng lúc: khi các bạn đều đang chạy, bạn có tốc độ lớn hơn luôn đi được xa hơn. Thử cho hai bạn cùng quãng đường, hoặc cùng thời gian, rồi đọc nhận xét bên dưới.',
  },
  examples: [
    {
      problem:
        'Một người đi xe đạp đi hết quãng đường $9\\ \\text{km}$ trong $45$ phút. Tính tốc độ của người đó theo đơn vị $\\text{km/h}$ và $\\text{m/s}$.',
      steps: [
        'Đổi thời gian ra giờ: $t = 45\\ \\text{min} = \\dfrac{45}{60}\\ \\text{h} = 0{,}75\\ \\text{h}$.',
        'Tốc độ: $v = \\dfrac{s}{t} = \\dfrac{9}{0{,}75} = 12\\ \\text{(km/h)}$.',
        'Đổi sang $\\text{m/s}$: $v = 12 : 3{,}6 \\approx 3{,}33\\ \\text{(m/s)}$. Kiểm tra lại: $\\dfrac{9000\\ \\text{m}}{2700\\ \\text{s}} \\approx 3{,}33\\ \\text{m/s}$.',
      ],
      answer: '$v = 12\\ \\text{km/h} \\approx 3{,}33\\ \\text{m/s}$.',
    },
    {
      problem:
        'Một ô tô chạy với tốc độ $54\\ \\text{km/h}$, một xe máy chạy với tốc độ $12\\ \\text{m/s}$. Xe nào chạy nhanh hơn?',
      steps: [
        'Hai tốc độ khác đơn vị nên phải đổi về cùng đơn vị.',
        'Đổi tốc độ ô tô: $54\\ \\text{km/h} = 54 : 3{,}6 = 15\\ \\text{m/s}$.',
        'So sánh: $15\\ \\text{m/s} > 12\\ \\text{m/s}$.',
      ],
      answer: 'Ô tô chạy nhanh hơn xe máy.',
    },
    {
      problem:
        'Một ô tô chạy với tốc độ không đổi $48\\ \\text{km/h}$. (a) Sau $2{,}5\\ \\text{h}$ ô tô đi được bao nhiêu kilômét? (b) Ô tô cần bao lâu để đi hết quãng đường $60\\ \\text{km}$?',
      steps: [
        '(a) Từ $v = \\dfrac{s}{t}$ suy ra $s = v \\cdot t = 48 \\cdot 2{,}5 = 120\\ \\text{(km)}$.',
        '(b) Từ $v = \\dfrac{s}{t}$ suy ra $t = \\dfrac{s}{v} = \\dfrac{60}{48} = 1{,}25\\ \\text{(h)}$.',
        'Đổi: $1{,}25\\ \\text{h} = 1\\ \\text{h} + 0{,}25 \\cdot 60\\ \\text{min} = 1\\ \\text{h}\\ 15\\ \\text{min}$.',
      ],
      answer: '(a) $120\\ \\text{km}$; (b) $1{,}25\\ \\text{h}$, tức $1$ giờ $15$ phút.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Công thức tính tốc độ là',
      options: ['$v = s \\cdot t$', '$v = \\dfrac{s}{t}$', '$v = \\dfrac{t}{s}$', '$v = s + t$'],
      answer: 1,
      hints: ['Tốc độ là quãng đường đi được trong một đơn vị thời gian.'],
      solution:
        'Tốc độ $=$ quãng đường đi được $:$ thời gian đi quãng đường đó, nên $v = \\dfrac{s}{t}$.',
    },
    {
      type: 'choice',
      prompt:
        'Ba bạn cùng chạy $60\\ \\text{m}$. Bạn A hết $10\\ \\text{s}$, bạn B hết $9{,}5\\ \\text{s}$, bạn C hết $11\\ \\text{s}$. Bạn nào chạy nhanh nhất?',
      options: ['Bạn A', 'Bạn B', 'Bạn C', 'Ba bạn nhanh như nhau'],
      answer: 1,
      hints: ['Cùng quãng đường thì so sánh thời gian.'],
      solution:
        'Ba bạn chạy cùng quãng đường, bạn B mất ít thời gian nhất ($9{,}5\\ \\text{s}$) nên chạy nhanh nhất.',
    },
    {
      type: 'number',
      prompt:
        'Một bạn chạy $100\\ \\text{m}$ hết $16\\ \\text{s}$. Tốc độ của bạn đó là bao nhiêu mét trên giây?',
      answer: 6.25,
      tolerance: 0.005,
      unit: 'm/s',
      hints: ['Dùng $v = \\dfrac{s}{t}$ với $s$ tính bằng mét, $t$ tính bằng giây.'],
      solution: '$v = \\dfrac{s}{t} = \\dfrac{100}{16} = 6{,}25\\ \\text{(m/s)}$.',
    },
    {
      type: 'number',
      prompt: 'Đổi $72\\ \\text{km/h}$ ra mét trên giây.',
      answer: 20,
      unit: 'm/s',
      hints: [
        '$1\\ \\text{m/s} = 3{,}6\\ \\text{km/h}$.',
        'Đổi từ km/h sang m/s thì chia cho $3{,}6$.',
      ],
      solution: '$72\\ \\text{km/h} = 72 : 3{,}6 = 20\\ \\text{m/s}$.',
    },
    {
      type: 'number',
      prompt: 'Đổi $15\\ \\text{m/s}$ ra kilômét trên giờ.',
      answer: 54,
      unit: 'km/h',
      hints: ['Đổi từ m/s sang km/h thì nhân với $3{,}6$.'],
      solution: '$15\\ \\text{m/s} = 15 \\cdot 3{,}6 = 54\\ \\text{km/h}$.',
    },
    {
      type: 'number',
      prompt:
        'Một người đi bộ với tốc độ không đổi $1{,}2\\ \\text{m/s}$ trong $15$ phút. Người đó đi được quãng đường bao nhiêu mét?',
      answer: 1080,
      unit: 'm',
      hints: [
        'Đổi thời gian ra giây để khớp với đơn vị m/s.',
        '$15\\ \\text{min} = 900\\ \\text{s}$; dùng $s = v \\cdot t$.',
      ],
      solution:
        '$t = 15\\ \\text{min} = 900\\ \\text{s}$; $s = v \\cdot t = 1{,}2 \\cdot 900 = 1080\\ \\text{(m)}$.',
    },
    {
      type: 'number',
      prompt:
        'Một xe máy chạy với tốc độ không đổi $36\\ \\text{km/h}$ trên quãng đường $9\\ \\text{km}$. Xe đi hết quãng đường đó trong bao nhiêu phút?',
      answer: 15,
      unit: 'phút',
      hints: [
        'Dùng $t = \\dfrac{s}{v}$, kết quả tính bằng giờ.',
        'Đổi giờ ra phút: nhân với $60$.',
      ],
      solution:
        '$t = \\dfrac{s}{v} = \\dfrac{9}{36} = 0{,}25\\ \\text{(h)} = 0{,}25 \\cdot 60 = 15\\ \\text{(min)}$.',
    },
    {
      type: 'order',
      prompt: 'Sắp xếp các chuyển động sau theo thứ tự từ chậm đến nhanh.',
      items: [
        'Ô tô: $20\\ \\text{m/s}$',
        'Người đi bộ: $5\\ \\text{km/h}$',
        'Xe máy: $40\\ \\text{km/h}$',
        'Xe đạp: $4\\ \\text{m/s}$',
      ],
      answer: [1, 3, 2, 0],
      hints: [
        'Đổi tất cả về cùng một đơn vị, ví dụ km/h.',
        'Nhân tốc độ tính bằng m/s với $3{,}6$.',
      ],
      solution:
        'Đổi ra km/h: ô tô $20 \\cdot 3{,}6 = 72\\ \\text{km/h}$; xe đạp $4 \\cdot 3{,}6 = 14{,}4\\ \\text{km/h}$. Thứ tự từ chậm đến nhanh: người đi bộ ($5$), xe đạp ($14{,}4$), xe máy ($40$), ô tô ($72$).',
    },
    {
      type: 'multi',
      prompt: 'Những đơn vị nào dưới đây là đơn vị đo tốc độ?',
      options: [
        '$\\text{m/s}$',
        '$\\text{km/h}$',
        '$\\text{cm/s}$',
        '$\\text{s/m}$',
        '$\\text{km} \\cdot \\text{h}$',
      ],
      answers: [0, 1, 2],
      hints: ['Đơn vị tốc độ là đơn vị độ dài chia cho đơn vị thời gian.'],
      solution:
        'Đơn vị tốc độ có dạng độ dài $/$ thời gian: $\\text{m/s}$, $\\text{km/h}$, $\\text{cm/s}$. Còn $\\text{s/m}$ là thời gian chia độ dài, $\\text{km} \\cdot \\text{h}$ là tích, đều không phải đơn vị tốc độ.',
    },
  ],
  takeaways: [
    'Tốc độ cho biết chuyển động nhanh hay chậm: $v = \\dfrac{s}{t}$; suy ra $s = v \\cdot t$ và $t = \\dfrac{s}{v}$.',
    'Cùng quãng đường, thời gian ít hơn thì nhanh hơn; cùng thời gian, quãng đường dài hơn thì nhanh hơn; trường hợp khác thì so sánh tốc độ.',
    'Đơn vị thường dùng: $\\text{m/s}$ và $\\text{km/h}$; $1\\ \\text{m/s} = 3{,}6\\ \\text{km/h}$.',
    'Trước khi tính hay so sánh, đổi các đại lượng về đơn vị phù hợp với nhau.',
  ],
};
