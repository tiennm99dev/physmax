/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Công suất P = A/t cho biết sinh công nhanh hay chậm, đơn vị oát; khi lực cùng hướng chuyển động thì P = F.v, giải thích vì sao xe về số thấp khi lên dốc.',
  intro:
    'Đi cầu thang bộ hay đi thang máy lên tầng năm, công đưa bạn lên cao là như nhau. Vậy thang máy hơn ở chỗ nào? Vật lí đo điều đó bằng công suất.',
  objectives: [
    'Nêu được ý nghĩa và định nghĩa của công suất, viết được công thức $P = \\dfrac{A}{t}$.',
    'Nêu được đơn vị oát, các bội số và đơn vị mã lực.',
    'Suy ra được liên hệ $P = F\\,v$ và vận dụng được để giải thích tác dụng của hộp số.',
    'Tính được công suất trong các tình huống thực tế.',
  ],
  sections: [
    {
      heading: 'Công suất',
      blocks: [
        {
          type: 'p',
          text: 'Hai máy nâng cùng một vật lên cùng một độ cao thực hiện cùng một công, nhưng máy làm xong trước thì mạnh hơn. Muốn so sánh, ta xét công thực hiện được trong một đơn vị thời gian.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Công suất',
          text: 'Công suất là đại lượng đặc trưng cho tốc độ sinh công của người hoặc thiết bị, đo bằng công sinh ra trong một đơn vị thời gian: $P = \\dfrac{A}{t}$, với $A$ là công thực hiện được trong thời gian $t$.',
        },
        {
          type: 'p',
          text: 'Công suất cũng dùng cho các quá trình truyền năng lượng nói chung: máy sưởi $2\\,000$ W nhận $2\\,000$ J điện năng mỗi giây.',
        },
      ],
    },
    {
      heading: 'Đơn vị công suất',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Oát',
          text: 'Trong hệ SI, đơn vị công suất là oát (W): $1\\text{ W} = \\dfrac{1\\text{ J}}{1\\text{ s}}$. Oát là công suất của thiết bị sinh công $1$ J trong $1$ s.',
        },
        {
          type: 'table',
          head: ['Đơn vị', 'Đổi ra oát'],
          rows: [
            ['kilôoát (kW)', '$1$ kW $= 1\\,000$ W'],
            ['mêgaoát (MW)', '$1$ MW $= 1\\,000\\,000$ W'],
            ['mã lực (HP)', '$1$ HP $\\approx 746$ W'],
          ],
          caption: 'Ô tô, xe máy thường ghi công suất bằng mã lực.',
        },
      ],
    },
    {
      heading: 'Liên hệ giữa công suất, lực và tốc độ',
      blocks: [
        {
          type: 'p',
          text: 'Vật chuyển động thẳng đều theo hướng của lực không đổi $F$, đi được quãng đường $s$ trong thời gian $t$, khi đó $A = F\\,s$ và $v = \\dfrac{s}{t}$.',
        },
        { type: 'tex', tex: 'P = \\dfrac{A}{t} = \\dfrac{F\\,s}{t} = F\\,v' },
        {
          type: 'p',
          text: 'Nếu $v$ là tốc độ trung bình thì $P$ là công suất trung bình; nếu $v$ là tốc độ tức thời thì $P$ là công suất tức thời.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Hộp số',
          text: 'Động cơ có công suất giới hạn, nên với cùng công suất, tốc độ càng nhỏ thì lực kéo càng lớn. Lên dốc cần lực lớn, người lái về số thấp: xe chạy chậm hơn nhưng kéo khoẻ hơn.',
        },
        { type: 'widget', name: 'hop-so' },
      ],
    },
  ],
  explore: {
    title: 'Thang máy và cầu thang bộ',
    instruction:
      'Chọn khối lượng, độ cao và thời gian của hai cách đi, rồi bấm "Bắt đầu đi lên". Công của hai cách thay đổi thế nào, công suất thay đổi thế nào?',
  },
  examples: [
    {
      problem:
        'Cần cẩu nâng đều kiện hàng $500$ kg lên cao $20$ m trong $25$ s. Lấy $g = 9{,}8$ m/s². Tính công và công suất của lực nâng.',
      steps: [
        'Nâng đều: $F = mg = 500 \\cdot 9{,}8 = 4\\,900$ N.',
        '$A = F\\,s = 4\\,900 \\cdot 20 = 98\\,000$ J.',
        '$P = \\dfrac{A}{t} = \\dfrac{98\\,000}{25} = 3\\,920$ W.',
      ],
      answer: '$A = 98\\,000$ J, $P = 3\\,920$ W $= 3{,}92$ kW.',
    },
    {
      problem:
        'Ô tô chạy đều với tốc độ $72$ km/h, lực kéo của động cơ là $2\\,000$ N. Tính công suất của động cơ theo kW và theo mã lực.',
      steps: [
        'Đổi $v = 72$ km/h $= 20$ m/s.',
        '$P = F\\,v = 2\\,000 \\cdot 20 = 40\\,000$ W $= 40$ kW.',
        'Đổi ra mã lực: $\\dfrac{40\\,000}{746} \\approx 53{,}6$ HP.',
      ],
      answer: '$P = 40$ kW $\\approx 53{,}6$ HP.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt: 'Một máy sinh công $6\\,000$ J trong $30$ s. Tính công suất của máy.',
      answer: 200,
      unit: 'W',
      hints: ['Công suất là công chia cho thời gian.'],
      solution: '$P = \\dfrac{A}{t} = \\dfrac{6\\,000}{30} = 200$ W.',
    },
    {
      type: 'number',
      prompt:
        'Một người $60$ kg đi cầu thang lên độ cao $15$ m trong $1$ phút. Lấy $g = 9{,}8$ m/s². Tính công suất đưa người đó lên cao.',
      answer: 147,
      tolerance: 0.5,
      unit: 'W',
      hints: ['Đổi $1$ phút ra giây.', 'Công nâng người lên là $A = mgh$.'],
      solution: '$A = 60 \\cdot 9{,}8 \\cdot 15 = 8\\,820$ J; $P = \\dfrac{8\\,820}{60} = 147$ W.',
    },
    {
      type: 'number',
      prompt:
        'Lực kéo của động cơ là $500$ N, xe chuyển động đều cùng hướng lực với tốc độ $10$ m/s. Tính công suất.',
      answer: 5000,
      unit: 'W',
      hints: ['Dùng $P = F\\,v$.'],
      solution: '$P = 500 \\cdot 10 = 5\\,000$ W.',
    },
    {
      type: 'choice',
      prompt: 'Oát (W) bằng',
      options: ['$1$ J/s', '$1$ J.s', '$1$ N.m', '$1$ N/s'],
      answer: 0,
      hints: ['Viết đơn vị của $\\dfrac{A}{t}$.'],
      solution:
        'Công đo bằng jun, thời gian đo bằng giây, nên $1$ W $= 1$ J/s. Còn $1$ N.m là $1$ J.',
    },
    {
      type: 'number',
      prompt: 'Một máy bơm có công suất $1{,}5$ HP. Đổi công suất này ra oát.',
      answer: 1119,
      tolerance: 1,
      unit: 'W',
      hints: ['$1$ HP $\\approx 746$ W.'],
      solution: '$P = 1{,}5 \\cdot 746 = 1\\,119$ W.',
    },
    {
      type: 'number',
      prompt:
        'Động cơ ô tô cho công suất $60$ kW khi xe chạy đều $72$ km/h. Tính lực kéo của động cơ.',
      answer: 3000,
      unit: 'N',
      hints: ['Đổi tốc độ ra m/s và công suất ra W.', 'Rút $F$ từ $P = F\\,v$.'],
      solution: '$v = 20$ m/s; $F = \\dfrac{P}{v} = \\dfrac{60\\,000}{20} = 3\\,000$ N.',
    },
    {
      type: 'number',
      prompt:
        'Một máy có công suất $2$ kW hoạt động liên tục trong $5$ phút. Tính công máy sinh ra, theo kJ.',
      answer: 600,
      unit: 'kJ',
      hints: ['Từ công thức công suất: $A = P\\,t$.', 'Đổi $5$ phút ra giây.'],
      solution: '$A = 2\\,000 \\cdot 300 = 600\\,000$ J $= 600$ kJ.',
    },
    {
      type: 'choice',
      prompt: 'Máy nào có công suất lớn nhất?',
      options: [
        'Máy sinh $2\\,000$ J trong $10$ s',
        'Máy sinh $6\\,000$ J trong $40$ s',
        'Máy sinh $1\\,500$ J trong $5$ s',
        'Máy sinh $9\\,000$ J trong $60$ s',
      ],
      answer: 2,
      hints: ['Không so công, hãy tính công suất của từng máy.'],
      solution:
        'Công suất lần lượt: $200$ W; $150$ W; $300$ W; $150$ W. Máy sinh $1\\,500$ J trong $5$ s có công suất lớn nhất.',
    },
    {
      type: 'number',
      prompt:
        'Thang máy khối lượng tổng cộng $800$ kg đi lên đều với tốc độ $2$ m/s. Lấy $g = 9{,}8$ m/s². Tính công suất của lực kéo.',
      answer: 15680,
      tolerance: 5,
      unit: 'W',
      hints: ['Đi đều nên lực kéo bằng trọng lượng.', '$P = F\\,v$.'],
      solution: '$F = 800 \\cdot 9{,}8 = 7\\,840$ N; $P = 7\\,840 \\cdot 2 = 15\\,680$ W.',
    },
    {
      type: 'choice',
      prompt: 'Giữ nguyên công suất động cơ, lái xe về số thấp khi lên dốc để',
      options: [
        'giảm tốc độ và tăng lực kéo',
        'tăng tốc độ và tăng lực kéo',
        'giảm công mà xe thực hiện',
        'tăng công suất động cơ',
      ],
      answer: 0,
      hints: ['Với $P$ không đổi, $F$ và $v$ liên hệ theo $F = \\dfrac{P}{v}$.'],
      solution:
        '$P$ không đổi nên $v$ giảm thì $F$ tăng: về số thấp giúp xe có lực kéo đủ lớn để lên dốc.',
    },
  ],
  takeaways: [
    'Công suất là tốc độ sinh công: $P = \\dfrac{A}{t}$.',
    'Đơn vị là oát: $1$ W $= 1$ J/s; $1$ kW $= 1\\,000$ W; $1$ HP $\\approx 746$ W.',
    'Khi lực cùng hướng chuyển động: $P = F\\,v$, cùng công suất thì đi chậm kéo khoẻ.',
  ],
};
