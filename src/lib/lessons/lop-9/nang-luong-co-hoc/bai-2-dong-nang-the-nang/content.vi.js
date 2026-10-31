/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Động năng là năng lượng vật có do chuyển động, Wđ = ½mv²; thế năng trọng trường là năng lượng vật có khi ở một độ cao so với mốc, Wt = Ph với P = 10m.',
  intro:
    'Búa máy được nâng lên cao rồi thả rơi xuống thì đóng được cọc ngập sâu vào đất. Một quả bóng đang bay nhanh có thể làm vỡ kính cửa sổ. Cả hai đều có năng lượng: một vật có năng lượng vì nó đang chuyển động, vật kia vì nó ở trên cao. Năng lượng ấy lớn hay nhỏ phụ thuộc vào những yếu tố nào, và tính bằng công thức gì?',
  objectives: [
    'Nêu được động năng là năng lượng vật có được do chuyển động; viết được công thức $W_\\text{đ} = \\frac{1}{2}mv^2$.',
    'Nêu được thế năng trọng trường là năng lượng vật có khi ở một độ cao so với mốc; viết được công thức $W_\\text{t} = Ph$.',
    'Nêu được động năng phụ thuộc khối lượng và tốc độ, thế năng phụ thuộc khối lượng và độ cao của vật.',
    'Vận dụng được các công thức để tính động năng, thế năng và các đại lượng liên quan.',
  ],
  sections: [
    {
      heading: 'Động năng',
      blocks: [
        {
          type: 'p',
          text: 'Cho một viên bi lăn xuống máng nghiêng và va vào một khúc gỗ đặt ở chân máng. Viên bi đẩy khúc gỗ đi một đoạn: viên bi đang chuyển động có khả năng làm khúc gỗ dịch chuyển, tức là nó có năng lượng. Thả viên bi từ chỗ cao hơn trên máng (bi đến chân máng nhanh hơn) hoặc thay bằng viên bi nặng hơn, khúc gỗ bị đẩy đi xa hơn.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Động năng',
          text: 'Năng lượng mà vật có được do chuyển động gọi là động năng. Động năng của vật phụ thuộc vào khối lượng và tốc độ của nó: vật có khối lượng càng lớn và chuyển động càng nhanh thì động năng càng lớn.',
        },
        {
          type: 'tex',
          tex: 'W_\\text{đ} = \\frac{1}{2} m v^2',
        },
        {
          type: 'list',
          items: [
            '$W_\\text{đ}$ là động năng của vật, đơn vị là jun (J);',
            '$m$ là khối lượng của vật, đơn vị là kilôgam (kg);',
            '$v$ là tốc độ của vật, đơn vị là mét trên giây (m/s).',
          ],
        },
        {
          type: 'p',
          text: 'Động năng tỉ lệ với khối lượng nhưng tỉ lệ với bình phương tốc độ. Cùng khối lượng, xe chạy nhanh gấp đôi có động năng gấp bốn; nhanh gấp ba thì động năng gấp chín. Đó là một lí do xe chạy quá tốc độ rất nguy hiểm khi va chạm. Hãy đổi khối lượng và tốc độ của hai xe dưới đây để so sánh.',
        },
        { type: 'widget', name: 'so-sanh-dong-nang' },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Đổi đơn vị trước khi tính',
          text: 'Tốc độ phải tính bằng m/s và khối lượng bằng kg: $36$ km/h $= 10$ m/s, $1$ tấn $= 1\\,000$ kg. Vật đứng yên ($v = 0$) thì không có động năng.',
        },
      ],
    },
    {
      heading: 'Thế năng trọng trường',
      blocks: [
        {
          type: 'p',
          text: 'Một vật nặng được treo trên cao, khi rơi xuống có thể làm bẹp một khối đất nặn bên dưới. Vật ở trên cao cũng có năng lượng, dù nó đang đứng yên. Vật càng nặng và ở càng cao thì khối đất nặn bị lún càng sâu.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Thế năng trọng trường',
          text: 'Năng lượng mà vật có được khi ở một độ cao nhất định so với mặt đất (hoặc so với một vị trí chọn làm mốc) gọi là thế năng trọng trường, gọi tắt là thế năng. Vật có khối lượng càng lớn và ở càng cao thì thế năng càng lớn.',
        },
        {
          type: 'tex',
          tex: 'W_\\text{t} = P h, \\qquad P = 10m',
        },
        {
          type: 'list',
          items: [
            '$W_\\text{t}$ là thế năng của vật, đơn vị là jun (J);',
            '$P$ là trọng lượng của vật, đơn vị là niutơn (N); vật khối lượng $m$ (kg) có trọng lượng $P = 10m$;',
            '$h$ là độ cao của vật so với vị trí chọn làm mốc, đơn vị là mét (m).',
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Mốc thế năng',
          text: 'Giá trị của thế năng phụ thuộc vào vị trí chọn làm mốc để tính độ cao. Người ta thường chọn mặt đất làm mốc. Vật nằm ngay tại mốc có $h = 0$ nên thế năng bằng $0$. Quyển sách trên mặt bàn có thế năng khi chọn mặt đất làm mốc, nhưng có thế năng bằng $0$ khi chọn mặt bàn làm mốc.',
        },
        {
          type: 'table',
          caption: 'Hai dạng năng lượng của một vật',
          head: ['Đặc điểm', 'Động năng', 'Thế năng trọng trường'],
          rows: [
            ['Có được do', 'chuyển động', 'ở độ cao so với mốc'],
            ['Công thức', '$W_\\text{đ} = \\frac{1}{2}mv^2$', '$W_\\text{t} = Ph = 10mh$'],
            ['Phụ thuộc', 'khối lượng, tốc độ', 'khối lượng, độ cao'],
            ['Bằng $0$ khi', 'vật đứng yên', 'vật ở mốc thế năng'],
          ],
        },
        {
          type: 'p',
          text: 'Trong thí nghiệm ảo ở phần Khám phá, một vật được thả rơi từ độ cao em chọn. Theo dõi hai thanh năng lượng: khi vật rơi, độ cao giảm nên thế năng giảm, tốc độ tăng nên động năng tăng.',
        },
      ],
    },
  ],
  explore: {
    title: 'Thả vật từ trên cao',
    instruction:
      'Chọn khối lượng $m$ và độ cao ban đầu $h$, rồi nhấn "Thả vật" (hoặc "Tiến 0,1 s" để xem từng bước). So sánh thế năng ở vị trí ban đầu khi em tăng gấp đôi khối lượng hoặc độ cao. Khi vật rơi, thanh nào giảm, thanh nào tăng? Lúc chạm đất, động năng có bằng thế năng lúc đầu không?',
  },
  examples: [
    {
      problem:
        'Một ô tô có khối lượng $1\\,200$ kg đang chạy với tốc độ $54$ km/h. Tính động năng của ô tô.',
      steps: [
        'Đổi tốc độ ra m/s: $v = 54$ km/h $= \\dfrac{54\\,000\\text{ m}}{3\\,600\\text{ s}} = 15$ m/s.',
        'Áp dụng công thức: $W_\\text{đ} = \\dfrac{1}{2} m v^2 = \\dfrac{1}{2} \\cdot 1\\,200 \\cdot 15^2$.',
        'Tính: $W_\\text{đ} = 600 \\cdot 225 = 135\\,000$ J.',
      ],
      answer: 'Động năng của ô tô là $135\\,000$ J $= 135$ kJ.',
    },
    {
      problem:
        'Một quả dừa có khối lượng $1{,}5$ kg ở trên cây, cách mặt đất $8$ m. Chọn mốc thế năng tại mặt đất, tính thế năng của quả dừa.',
      steps: [
        'Trọng lượng quả dừa: $P = 10m = 10 \\cdot 1{,}5 = 15$ N.',
        'Độ cao so với mốc: $h = 8$ m.',
        'Thế năng: $W_\\text{t} = P h = 15 \\cdot 8 = 120$ J.',
      ],
      answer: 'Thế năng của quả dừa là $120$ J.',
    },
    {
      problem:
        'Vật A khối lượng $2$ kg chuyển động với tốc độ $3$ m/s; vật B khối lượng $1$ kg chuyển động với tốc độ $6$ m/s. Vật nào có động năng lớn hơn, lớn hơn bao nhiêu lần?',
      steps: [
        '$W_\\text{đA} = \\dfrac{1}{2} \\cdot 2 \\cdot 3^2 = 9$ J.',
        '$W_\\text{đB} = \\dfrac{1}{2} \\cdot 1 \\cdot 6^2 = 18$ J.',
        'So sánh: $\\dfrac{W_\\text{đB}}{W_\\text{đA}} = \\dfrac{18}{9} = 2$. Khối lượng B chỉ bằng một nửa nhưng tốc độ gấp đôi, nên động năng gấp $\\dfrac{1}{2} \\cdot 2^2 = 2$ lần.',
      ],
      answer: 'Vật B có động năng lớn hơn, gấp $2$ lần động năng vật A.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Động năng của một vật là',
      options: [
        'năng lượng vật có được do chuyển động',
        'năng lượng vật có được khi ở trên cao',
        'năng lượng vật có được do bị nung nóng',
        'năng lượng vật có được do bị biến dạng',
      ],
      answer: 0,
      hints: ['Chữ "động" trong động năng gợi đến điều gì?'],
      solution:
        'Động năng là năng lượng vật có được do chuyển động. Năng lượng vật có khi ở trên cao là thế năng trọng trường.',
    },
    {
      type: 'number',
      prompt:
        'Một quả bóng khối lượng $0{,}4$ kg bay với tốc độ $10$ m/s. Tính động năng của quả bóng.',
      answer: 20,
      tolerance: 0.001,
      unit: 'J',
      hints: ['Dùng $W_\\text{đ} = \\frac{1}{2}mv^2$.', '$v^2 = 100$.'],
      solution: '$W_\\text{đ} = \\dfrac{1}{2} \\cdot 0{,}4 \\cdot 10^2 = 0{,}2 \\cdot 100 = 20$ J.',
    },
    {
      type: 'number',
      prompt:
        'Một thùng hàng khối lượng $20$ kg đặt trên nóc tủ cao $3$ m so với sàn nhà. Chọn mốc thế năng ở sàn nhà, tính thế năng của thùng hàng.',
      answer: 600,
      tolerance: 0.001,
      unit: 'J',
      hints: ['Tính trọng lượng trước: $P = 10m$.', 'Rồi dùng $W_\\text{t} = Ph$.'],
      solution: '$P = 10 \\cdot 20 = 200$ N; $W_\\text{t} = Ph = 200 \\cdot 3 = 600$ J.',
    },
    {
      type: 'choice',
      prompt:
        'Khối lượng của một vật không đổi, tốc độ của vật tăng lên gấp $3$ lần. Động năng của vật thay đổi thế nào?',
      options: ['Tăng gấp $3$ lần', 'Tăng gấp $6$ lần', 'Tăng gấp $9$ lần', 'Không đổi'],
      answer: 2,
      hints: ['Động năng tỉ lệ với $v^2$, không phải với $v$.'],
      solution:
        '$W_\\text{đ} = \\frac{1}{2}mv^2$; khi $v$ gấp $3$ thì $v^2$ gấp $3^2 = 9$, nên động năng tăng gấp $9$ lần.',
    },
    {
      type: 'number',
      prompt:
        'Một người khối lượng $60$ kg đang chạy có động năng $750$ J. Tốc độ của người đó là bao nhiêu?',
      answer: 5,
      tolerance: 0.001,
      unit: 'm/s',
      hints: [
        'Viết $750 = \\frac{1}{2} \\cdot 60 \\cdot v^2$ rồi tìm $v^2$.',
        '$v^2 = \\dfrac{2 W_\\text{đ}}{m}$.',
      ],
      solution: '$v^2 = \\dfrac{2 \\cdot 750}{60} = 25$, nên $v = 5$ m/s.',
    },
    {
      type: 'number',
      prompt:
        'Một vật khối lượng $15$ kg có thế năng $450$ J so với mặt đất. Vật ở độ cao bao nhiêu mét so với mặt đất?',
      answer: 3,
      tolerance: 0.001,
      unit: 'm',
      hints: [
        'Từ $W_\\text{t} = Ph$ suy ra $h = \\dfrac{W_\\text{t}}{P}$.',
        '$P = 10 \\cdot 15$ N.',
      ],
      solution:
        '$P = 10 \\cdot 15 = 150$ N; $h = \\dfrac{W_\\text{t}}{P} = \\dfrac{450}{150} = 3$ m.',
    },
    {
      type: 'multi',
      prompt: 'Chọn mốc thế năng tại mặt đất. Những vật nào dưới đây có động năng?',
      options: [
        'Quả táo đang rơi',
        'Quyển sách nằm yên trên bàn',
        'Chiếc xe đạp đang chạy trên đường',
        'Máy bay đang bay trên trời',
        'Chiếc đèn treo đứng yên trên trần nhà',
      ],
      answers: [0, 2, 3],
      hints: ['Vật có động năng khi nó đang chuyển động.'],
      solution:
        'Quả táo đang rơi, xe đạp đang chạy và máy bay đang bay đều chuyển động nên có động năng. Quyển sách và chiếc đèn đứng yên nên không có động năng; chúng chỉ có thế năng vì ở trên cao so với mặt đất.',
    },
    {
      type: 'choice',
      prompt:
        'Một quyển sách nằm yên trên mặt bàn cao $0{,}8$ m. Nếu chọn mặt bàn làm mốc thế năng thì thế năng của quyển sách',
      options: [
        'bằng $0$',
        'bằng trọng lượng quyển sách nhân $0{,}8$ m',
        'lớn hơn khi chọn mặt đất làm mốc',
        'không xác định được',
      ],
      answer: 0,
      hints: ['$h$ là độ cao so với vị trí chọn làm mốc. Quyển sách cách mặt bàn bao nhiêu?'],
      solution:
        'Quyển sách nằm ngay trên mặt bàn, tức là ở mốc thế năng: $h = 0$, nên $W_\\text{t} = P \\cdot 0 = 0$. Thế năng phụ thuộc vào cách chọn mốc.',
    },
    {
      type: 'number',
      prompt:
        'Một ô tô khối lượng $1{,}5$ tấn chạy với tốc độ $72$ km/h. Động năng của ô tô là bao nhiêu kilôjun (kJ)?',
      answer: 300,
      tolerance: 0.001,
      unit: 'kJ',
      hints: ['Đổi $1{,}5$ tấn $= 1\\,500$ kg và $72$ km/h $= 20$ m/s.', '$1$ kJ $= 1\\,000$ J.'],
      solution:
        '$W_\\text{đ} = \\dfrac{1}{2} \\cdot 1\\,500 \\cdot 20^2 = 750 \\cdot 400 = 300\\,000$ J $= 300$ kJ.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi đại lượng với đơn vị đo của nó trong công thức tính năng lượng.',
      left: ['Khối lượng $m$', 'Tốc độ $v$', 'Trọng lượng $P$', 'Động năng $W_\\text{đ}$'],
      right: ['kg', 'm/s', 'N', 'J'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['Năng lượng có đơn vị là jun; lực (trọng lượng) có đơn vị là niutơn.'],
      solution: '$m$ tính bằng kg, $v$ bằng m/s, $P$ bằng N và $W_\\text{đ}$ bằng J.',
    },
  ],
  takeaways: [
    'Động năng là năng lượng vật có được do chuyển động: $W_\\text{đ} = \\frac{1}{2}mv^2$ (J), với $m$ tính bằng kg, $v$ bằng m/s.',
    'Động năng phụ thuộc khối lượng và tốc độ; tốc độ gấp đôi thì động năng gấp bốn.',
    'Thế năng trọng trường là năng lượng vật có khi ở một độ cao so với mốc: $W_\\text{t} = Ph$, với $P = 10m$ (N), $h$ (m).',
    'Thế năng phụ thuộc khối lượng, độ cao và cách chọn mốc; thường chọn mặt đất làm mốc.',
    'Đơn vị của động năng và thế năng đều là jun (J).',
  ],
};
