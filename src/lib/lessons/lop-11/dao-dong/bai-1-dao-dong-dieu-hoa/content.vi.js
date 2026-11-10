/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Dao động cơ là chuyển động qua lại quanh vị trí cân bằng; dao động tuần hoàn lặp lại sau những khoảng thời gian bằng nhau; dao động điều hoà có li độ là hàm côsin (hay sin) của thời gian, mô tả bằng li độ, biên độ, chu kì và tần số.',
  intro:
    'Quả lắc đồng hồ đung đưa, dây đàn rung khi gảy, pít-tông chạy lên xuống trong xi lanh. Các chuyển động này có điểm gì chung? Nếu gắn một cây bút vào vật đang dao động và kéo đều một băng giấy bên dưới, nét bút vẽ ra một đường cong rất quen thuộc: đường hình sin.',
  objectives: [
    'Nêu được thế nào là dao động cơ, dao động tuần hoàn.',
    'Nêu được định nghĩa dao động điều hoà và nhận ra đồ thị li độ – thời gian của nó là đường hình sin.',
    'Nêu được các khái niệm li độ, biên độ, chu kì, tần số và mối liên hệ $f = \\dfrac{1}{T}$.',
    'Đọc được biên độ và chu kì từ đồ thị li độ – thời gian.',
  ],
  sections: [
    {
      heading: 'Dao động cơ. Dao động tuần hoàn',
      blocks: [
        {
          type: 'p',
          text: 'Treo một vật nhỏ vào đầu lò xo, kéo vật lệch khỏi vị trí đứng yên rồi thả ra: vật chạy qua chạy lại quanh vị trí đứng yên ban đầu. Vị trí mà vật đứng yên khi không bị kích thích gọi là vị trí cân bằng.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Dao động cơ',
          text: 'Dao động cơ là chuyển động qua lại của một vật quanh một vị trí cân bằng.',
        },
        {
          type: 'p',
          text: 'Chuyển động của quả lắc đồng hồ, của dây đàn khi gảy, của chiếc thuyền nhấp nhô trên sóng đều là dao động cơ.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Dao động tuần hoàn',
          text: 'Dao động tuần hoàn là dao động mà trạng thái chuyển động của vật (vị trí và vận tốc) được lặp lại như cũ sau những khoảng thời gian bằng nhau.',
        },
        {
          type: 'p',
          text: 'Quả lắc của đồng hồ đang chạy dao động tuần hoàn. Một chiếc lá rung rinh trong gió thổi thất thường cũng dao động quanh vị trí cân bằng, nhưng chuyển động của nó không lặp lại đều đặn nên không phải dao động tuần hoàn.',
        },
      ],
    },
    {
      heading: 'Dao động điều hoà',
      blocks: [
        {
          type: 'p',
          text: 'Thí nghiệm: một con lắc lò xo nằm ngang có gắn bút dạ ở vật. Kéo vật lệch khỏi vị trí cân bằng một đoạn rồi thả nhẹ, đồng thời kéo đều một băng giấy theo phương vuông góc với trục lò xo. Nét bút vẽ trên băng giấy là đồ thị li độ của vật theo thời gian, và đồ thị đó có dạng đường hình sin.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Dao động điều hoà',
          text: 'Dao động điều hoà là dao động trong đó li độ của vật là một hàm côsin (hoặc sin) của thời gian. Đồ thị li độ – thời gian của dao động điều hoà là một đường hình sin.',
        },
        {
          type: 'p',
          text: 'Dao động điều hoà là dao động tuần hoàn đơn giản nhất. Ở bài sau ta sẽ viết li độ dưới dạng',
        },
        { type: 'tex', tex: 'x = A\\cos(\\omega t + \\varphi)' },
        {
          type: 'callout',
          tone: 'note',
          title: 'Ba mức độ',
          text: 'Mọi dao động điều hoà đều là dao động tuần hoàn, mọi dao động tuần hoàn đều là dao động cơ, nhưng điều ngược lại không đúng. Một vật chạy đều qua lại giữa hai điểm dao động tuần hoàn mà không điều hoà, vì đồ thị li độ của nó là đường gấp khúc.',
        },
      ],
    },
    {
      heading: 'Li độ, biên độ, chu kì, tần số',
      blocks: [
        {
          type: 'p',
          text: 'Chọn trục $Ox$ dọc theo quỹ đạo của vật, gốc $O$ tại vị trí cân bằng.',
        },
        {
          type: 'list',
          items: [
            'Li độ $x$ là toạ độ của vật trên trục $Ox$, cho biết vật cách vị trí cân bằng bao xa và ở phía nào. Li độ có thể dương, âm hoặc bằng $0$.',
            'Biên độ $A$ là độ lớn cực đại của li độ: $|x| \\le A$, với $A > 0$. Hai vị trí $x = A$ và $x = -A$ gọi là hai vị trí biên; chiều dài quỹ đạo là $L = 2A$.',
            'Chu kì $T$ là khoảng thời gian để vật thực hiện được một dao động toàn phần, đơn vị giây (s). Sau một dao động toàn phần, vật trở lại vị trí cũ theo hướng cũ.',
            'Tần số $f$ là số dao động toàn phần vật thực hiện được trong một giây, đơn vị héc (Hz).',
          ],
        },
        { type: 'tex', tex: 'f = \\frac{1}{T}, \\qquad T = \\frac{\\Delta t}{N}' },
        {
          type: 'p',
          text: 'Trong đó $N$ là số dao động toàn phần vật thực hiện trong thời gian $\\Delta t$. Trong một chu kì, vật đi từ biên này sang biên kia rồi quay về, nên quãng đường đi được là $4A$.',
        },
        {
          type: 'table',
          head: ['Đại lượng', 'Kí hiệu', 'Đơn vị', 'Đọc trên đồ thị $x - t$'],
          rows: [
            ['Li độ', '$x$', 'm, cm', 'Tung độ của điểm trên đồ thị'],
            ['Biên độ', '$A$', 'm, cm', 'Tung độ của đỉnh cao nhất'],
            ['Chu kì', '$T$', 's', 'Khoảng cách theo thời gian giữa hai đỉnh liên tiếp'],
            ['Tần số', '$f$', 'Hz', 'Nghịch đảo của chu kì'],
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Đừng nhầm',
          text: 'Biên độ là nửa chiều dài quỹ đạo, không phải cả chiều dài quỹ đạo. Một dao động toàn phần là đi rồi về đúng trạng thái cũ, không phải chỉ đi từ biên này sang biên kia (đó mới là nửa chu kì).',
        },
      ],
    },
  ],
  explore: {
    title: 'Con lắc lò xo vẽ đồ thị',
    instruction:
      'Bấm Thả vật để con lắc dao động và vẽ đồ thị li độ theo thời gian. Đổi biên độ và chu kì, quan sát đồ thị thay đổi thế nào. Sau đó chuyển sang kiểu Tuần hoàn và Tắt dần để so sánh với dao động điều hoà.',
  },
  examples: [
    {
      problem:
        'Một vật dao động điều hoà trên quỹ đạo dài $12$ cm, thực hiện $20$ dao động toàn phần trong $10$ s. Tính biên độ, chu kì và tần số dao động.',
      steps: [
        'Chiều dài quỹ đạo $L = 2A$ nên $A = \\dfrac{L}{2} = \\dfrac{12}{2} = 6$ cm.',
        'Chu kì là thời gian một dao động toàn phần: $T = \\dfrac{\\Delta t}{N} = \\dfrac{10}{20} = 0{,}5$ s.',
        'Tần số: $f = \\dfrac{1}{T} = \\dfrac{1}{0{,}5} = 2$ Hz.',
      ],
      answer: '$A = 6$ cm, $T = 0{,}5$ s, $f = 2$ Hz.',
    },
    {
      problem:
        'Đồ thị li độ – thời gian của một vật dao động điều hoà có đỉnh cao nhất ở $x = 3$ cm; hai đỉnh liên tiếp cách nhau $0{,}4$ s. Tính tần số và quãng đường vật đi được trong $0{,}8$ s.',
      steps: [
        'Biên độ là tung độ của đỉnh: $A = 3$ cm. Chu kì là khoảng thời gian giữa hai đỉnh liên tiếp: $T = 0{,}4$ s.',
        'Tần số: $f = \\dfrac{1}{T} = \\dfrac{1}{0{,}4} = 2{,}5$ Hz.',
        '$0{,}8$ s $= 2T$. Mỗi chu kì vật đi được $4A$, nên $s = 2 \\cdot 4A = 8 \\cdot 3 = 24$ cm.',
      ],
      answer: '$f = 2{,}5$ Hz, $s = 24$ cm.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Dao động cơ là',
      options: [
        'chuyển động qua lại của vật quanh một vị trí cân bằng',
        'chuyển động có quỹ đạo là đường tròn',
        'chuyển động thẳng có tốc độ không đổi',
        'chuyển động mà vật luôn ở xa dần vị trí ban đầu',
      ],
      answer: 0,
      hints: ['Nghĩ tới quả lắc đồng hồ: nó chuyển động thế nào so với vị trí đứng yên?'],
      solution:
        'Dao động cơ là chuyển động qua lại của vật quanh một vị trí cân bằng, như quả lắc đồng hồ hay dây đàn khi gảy.',
    },
    {
      type: 'multi',
      prompt: 'Chọn tất cả các chuyển động là dao động tuần hoàn.',
      options: [
        'Quả lắc của đồng hồ đang chạy đúng giờ',
        'Pít-tông trong xi lanh của động cơ chạy đều',
        'Chiếc lá rung rinh trong gió thổi thất thường',
        'Ô tô chạy thẳng đều trên đường cao tốc',
      ],
      answers: [0, 1],
      hints: [
        'Trước hết, chuyển động có phải là chuyển động qua lại quanh vị trí cân bằng không?',
        'Rồi xét: trạng thái có lặp lại sau những khoảng thời gian bằng nhau không?',
      ],
      solution:
        'Quả lắc đồng hồ và pít-tông của động cơ chạy đều lặp lại chuyển động sau những khoảng thời gian bằng nhau. Chiếc lá trong gió thất thường dao động nhưng không lặp lại đều đặn; ô tô chạy thẳng đều không chuyển động qua lại nên không phải dao động.',
    },
    {
      type: 'choice',
      prompt: 'Đồ thị li độ – thời gian của một vật dao động điều hoà có dạng',
      options: [
        'đường hình sin',
        'đường thẳng đi qua gốc toạ độ',
        'đường parabol',
        'đường gấp khúc',
      ],
      answer: 0,
      hints: ['Li độ là hàm côsin (hoặc sin) của thời gian.'],
      solution:
        'Li độ của dao động điều hoà là hàm côsin (hoặc sin) của thời gian, nên đồ thị li độ – thời gian là đường hình sin.',
    },
    {
      type: 'number',
      prompt: 'Một vật dao động điều hoà trên quỹ đạo dài $10$ cm. Tính biên độ dao động.',
      answer: 5,
      unit: 'cm',
      hints: ['Vật đi từ biên $-A$ đến biên $+A$: quỹ đạo dài bao nhiêu lần $A$?'],
      solution: 'Chiều dài quỹ đạo $L = 2A$ nên $A = \\dfrac{10}{2} = 5$ cm.',
    },
    {
      type: 'number',
      prompt:
        'Một con lắc thực hiện $15$ dao động toàn phần trong $6$ s. Tính chu kì dao động của con lắc.',
      answer: 0.4,
      unit: 's',
      hints: ['Chu kì là thời gian của một dao động toàn phần.'],
      solution: '$T = \\dfrac{\\Delta t}{N} = \\dfrac{6}{15} = 0{,}4$ s.',
    },
    {
      type: 'number',
      prompt: 'Một vật dao động điều hoà với chu kì $0{,}25$ s. Tính tần số dao động.',
      answer: 4,
      unit: 'Hz',
      hints: ['$f = \\dfrac{1}{T}$.'],
      solution:
        '$f = \\dfrac{1}{T} = \\dfrac{1}{0{,}25} = 4$ Hz: vật thực hiện $4$ dao động mỗi giây.',
    },
    {
      type: 'number',
      prompt:
        'Tim của một người đập đều $75$ lần mỗi phút. Coi mỗi nhịp đập là một dao động toàn phần, tính chu kì đập của tim.',
      answer: 0.8,
      unit: 's',
      hints: ['Đổi $1$ phút ra giây rồi chia cho số lần đập.'],
      solution: '$T = \\dfrac{60}{75} = 0{,}8$ s.',
    },
    {
      type: 'number',
      prompt:
        'Một vật dao động điều hoà với biên độ $4$ cm. Tính quãng đường vật đi được trong $3$ chu kì.',
      answer: 48,
      unit: 'cm',
      hints: ['Trong một chu kì vật đi từ biên này sang biên kia rồi quay về.'],
      solution:
        'Mỗi chu kì vật đi được $4A = 16$ cm, nên trong $3$ chu kì: $s = 3 \\cdot 16 = 48$ cm.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi đại lượng với ý nghĩa của nó.',
      left: ['Li độ $x$', 'Biên độ $A$', 'Chu kì $T$', 'Tần số $f$'],
      right: [
        'Toạ độ của vật so với vị trí cân bằng',
        'Độ lớn cực đại của li độ',
        'Thời gian thực hiện một dao động toàn phần',
        'Số dao động toàn phần trong một giây',
      ],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['Nhìn vào đơn vị: li độ và biên độ đo bằng cm, chu kì bằng s, tần số bằng Hz.'],
      solution:
        'Li độ là toạ độ của vật so với vị trí cân bằng; biên độ là độ lớn cực đại của li độ; chu kì là thời gian một dao động toàn phần; tần số là số dao động toàn phần trong một giây.',
    },
    {
      type: 'choice',
      prompt:
        'Một vật dao động điều hoà đi từ vị trí biên dương đến vị trí biên âm mất $0{,}5$ s. Chu kì dao động là',
      options: ['$1$ s', '$0{,}5$ s', '$0{,}25$ s', '$2$ s'],
      answer: 0,
      hints: ['Đi từ biên này sang biên kia là bao nhiêu phần của một dao động toàn phần?'],
      solution:
        'Từ biên dương sang biên âm mới là nửa dao động toàn phần, nên $\\dfrac{T}{2} = 0{,}5$ s và $T = 1$ s.',
    },
  ],
  takeaways: [
    'Dao động cơ là chuyển động qua lại quanh vị trí cân bằng; dao động tuần hoàn lặp lại trạng thái sau những khoảng thời gian bằng nhau.',
    'Dao động điều hoà có li độ là hàm côsin (hoặc sin) của thời gian; đồ thị li độ – thời gian là đường hình sin.',
    'Biên độ $A$ là độ lớn cực đại của li độ, bằng nửa chiều dài quỹ đạo.',
    'Chu kì $T$ là thời gian một dao động toàn phần; tần số $f = \\dfrac{1}{T}$ là số dao động trong một giây.',
    'Trong một chu kì, vật đi được quãng đường $4A$.',
  ],
};
