/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Chuyển động thẳng biến đổi đều có gia tốc không đổi: vận tốc v = v0 + at, đồ thị v – t là đường thẳng và độ dịch chuyển bằng diện tích dưới đồ thị.',
  intro:
    'Một ô tô rời bến, cứ mỗi giây vận tốc tăng thêm đúng $2$ m/s. Biết vận tốc tại mỗi thời điểm, làm sao tính được xe đã đi bao xa mà không cần đo trên đường? Câu trả lời nằm ngay trên đồ thị vận tốc – thời gian.',
  objectives: [
    'Nêu được định nghĩa chuyển động thẳng biến đổi đều, phân biệt nhanh dần đều và chậm dần đều.',
    'Viết và vận dụng được công thức $v = v_0 + at$.',
    'Vẽ và đọc được đồ thị $v - t$, tính gia tốc từ độ dốc của đồ thị.',
    'Tính được độ dịch chuyển từ diện tích dưới đồ thị $v - t$ và từ công thức.',
    'Vận dụng được hệ thức $v^2 - v_0^2 = 2ad$.',
  ],
  sections: [
    {
      heading: 'Gia tốc của chuyển động thẳng biến đổi đều',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Chuyển động thẳng biến đổi đều',
          text: 'Chuyển động thẳng biến đổi đều là chuyển động thẳng có vận tốc tăng đều hoặc giảm đều theo thời gian. Độ lớn vận tốc tăng đều là chuyển động thẳng nhanh dần đều; độ lớn vận tốc giảm đều là chuyển động thẳng chậm dần đều.',
        },
        {
          type: 'p',
          text: 'Vận tốc thay đổi đều nên độ biến thiên vận tốc trong những khoảng thời gian bằng nhau là như nhau. Do đó gia tốc không đổi:',
        },
        { type: 'tex', tex: 'a = \\dfrac{\\Delta v}{\\Delta t} = \\text{hằng số}' },
      ],
    },
    {
      heading: 'Vận tốc tức thời',
      blocks: [
        {
          type: 'p',
          text: 'Chọn gốc thời gian $t_0 = 0$ lúc vật có vận tốc $v_0$. Từ $a = \\dfrac{v - v_0}{t}$, vận tốc tại thời điểm $t$ (sách còn viết là $v_t$) là:',
        },
        { type: 'tex', tex: 'v = v_0 + at' },
        {
          type: 'p',
          text: 'Nếu vật bắt đầu chuyển động từ trạng thái nghỉ ($v_0 = 0$) thì $v = at$. Chọn chiều dương là chiều chuyển động: nhanh dần đều có $a > 0$, chậm dần đều có $a < 0$. Tổng quát: $a$ cùng dấu với $v$ là nhanh dần, $a$ trái dấu với $v$ là chậm dần.',
        },
      ],
    },
    {
      heading: 'Đồ thị vận tốc – thời gian',
      blocks: [
        {
          type: 'p',
          text: 'Vì $v$ là hàm bậc nhất của $t$ nên đồ thị $v - t$ là một đoạn thẳng. Điểm đầu của đồ thị cho biết $v_0$, còn độ dốc của đồ thị cho biết gia tốc:',
        },
        {
          type: 'tex',
          tex: 'a = \\dfrac{\\Delta v}{\\Delta t} = \\text{độ dốc của đồ thị } v - t',
        },
        {
          type: 'table',
          caption: 'Đọc tính chất chuyển động trên đồ thị (khi $v > 0$)',
          head: ['Dáng đồ thị', 'Gia tốc', 'Chuyển động'],
          rows: [
            ['Nằm ngang', '$a = 0$', 'Thẳng đều'],
            ['Đi lên', '$a > 0$', 'Nhanh dần đều'],
            ['Đi xuống', '$a < 0$', 'Chậm dần đều'],
          ],
        },
      ],
    },
    {
      heading: 'Độ dịch chuyển',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Tính từ đồ thị',
          text: 'Độ dịch chuyển trong khoảng thời gian $t$ có giá trị bằng diện tích giới hạn bởi đồ thị $v - t$, trục thời gian và hai đường thẳng đứng tại đầu và cuối khoảng thời gian đó. Phần nằm dưới trục thời gian (vật đi ngược chiều dương) được tính là âm.',
        },
        {
          type: 'p',
          text: 'Với chuyển động thẳng đều, phần diện tích là hình chữ nhật cạnh $v$ và $t$, nên $d = vt$. Với chuyển động thẳng biến đổi đều, phần diện tích là hình thang vuông có hai đáy $v_0$, $v$ và chiều cao $t$:',
        },
        {
          type: 'tex',
          tex: 'd = \\dfrac{(v_0 + v)t}{2} = \\dfrac{(v_0 + v_0 + at)t}{2} = v_0t + \\dfrac{1}{2}at^2',
        },
        {
          type: 'p',
          text: 'Thay $t = \\dfrac{v - v_0}{a}$ vào công thức trên, ta được hệ thức không chứa thời gian:',
        },
        { type: 'tex', tex: 'v^2 - v_0^2 = 2ad' },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Chú ý khi vật đổi chiều',
          text: 'Nếu $v$ đổi dấu giữa chừng, độ dịch chuyển là tổng đại số hai phần diện tích, còn quãng đường là tổng độ lớn của chúng. Khi vật không đổi chiều, quãng đường bằng độ lớn của độ dịch chuyển.',
        },
      ],
    },
  ],
  explore: {
    title: 'Đồ thị vận tốc – thời gian kéo thả',
    instruction:
      'Kéo hai đầu đoạn thẳng (hoặc chọn rồi dùng phím mũi tên) để đổi $v_0$, $v$ và thời gian. Nhấn "Cho xe chạy" và so sánh diện tích tô màu với vị trí của xe. Thử cho đồ thị cắt trục thời gian để thấy xe đổi chiều.',
  },
  examples: [
    {
      problem:
        'Một ô tô đang chạy với vận tốc $10$ m/s thì tăng tốc đều, sau $5$ s đạt $20$ m/s. Tính gia tốc và độ dịch chuyển của ô tô trong $5$ s đó.',
      steps: [
        'Chọn chiều dương là chiều chuyển động. Gia tốc: $a = \\dfrac{v - v_0}{t} = \\dfrac{20 - 10}{5} = 2$ m/s².',
        'Độ dịch chuyển: $d = v_0t + \\dfrac{1}{2}at^2 = 10 \\cdot 5 + \\dfrac{1}{2} \\cdot 2 \\cdot 5^2 = 75$ m.',
        'Kiểm tra bằng diện tích hình thang: $d = \\dfrac{(10 + 20) \\cdot 5}{2} = 75$ m.',
      ],
      answer: '$a = 2$ m/s², $d = 75$ m.',
    },
    {
      problem:
        'Một đoàn tàu đang chạy với vận tốc $15$ m/s thì hãm phanh, chuyển động chậm dần đều và dừng lại sau $30$ s. Tính gia tốc và quãng đường tàu đi được từ lúc hãm phanh.',
      steps: [
        'Chọn chiều dương là chiều chuyển động; khi dừng $v = 0$.',
        'Gia tốc: $a = \\dfrac{0 - 15}{30} = -0{,}5$ m/s² (âm vì chậm dần).',
        'Từ $v^2 - v_0^2 = 2ad$: $d = \\dfrac{0 - 15^2}{2 \\cdot (-0{,}5)} = 225$ m.',
      ],
      answer: '$a = -0{,}5$ m/s², tàu đi được $225$ m.',
    },
    {
      problem:
        'Đồ thị $v - t$ của một vật là đoạn thẳng đi từ $v_0 = 6$ m/s lúc $t = 0$ đến $v = -4$ m/s lúc $t = 5$ s. Tìm thời điểm vật đổi chiều, độ dịch chuyển và quãng đường trong $5$ s.',
      steps: [
        'Gia tốc: $a = \\dfrac{-4 - 6}{5} = -2$ m/s².',
        'Vật đổi chiều khi $v = 0$: $6 - 2t = 0$, nên $t = 3$ s.',
        'Từ $0$ đến $3$ s, tam giác phía trên trục có diện tích $\\dfrac{6 \\cdot 3}{2} = 9$ m. Từ $3$ s đến $5$ s, tam giác phía dưới trục có diện tích $\\dfrac{4 \\cdot 2}{2} = 4$ m.',
        'Độ dịch chuyển: $d = 9 - 4 = 5$ m. Quãng đường: $s = 9 + 4 = 13$ m.',
      ],
      answer: 'Đổi chiều lúc $t = 3$ s; $d = 5$ m; $s = 13$ m.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Đặc điểm nào đúng với mọi chuyển động thẳng biến đổi đều?',
      options: [
        'Vận tốc không đổi theo thời gian.',
        'Gia tốc không đổi theo thời gian.',
        'Độ dịch chuyển tỉ lệ thuận với thời gian.',
        'Gia tốc luôn dương.',
      ],
      answer: 1,
      hints: ['Vận tốc thay đổi đều thì $\\dfrac{\\Delta v}{\\Delta t}$ thế nào?'],
      solution:
        'Vận tốc tăng hoặc giảm đều nên $a = \\dfrac{\\Delta v}{\\Delta t}$ là hằng số. Gia tốc có thể âm, còn $d$ phụ thuộc $t^2$.',
    },
    {
      type: 'number',
      prompt:
        'Một xe máy có $v_0 = 5$ m/s, tăng tốc đều với gia tốc $2$ m/s². Tính vận tốc của xe sau $4$ s.',
      answer: 13,
      tolerance: 0.001,
      unit: 'm/s',
      hints: ['Dùng $v = v_0 + at$.'],
      solution: '$v = 5 + 2 \\cdot 4 = 13$ m/s.',
    },
    {
      type: 'number',
      prompt:
        'Một ô tô bắt đầu rời bến, chuyển động nhanh dần đều với gia tốc $1{,}5$ m/s². Tính độ dịch chuyển của ô tô sau $10$ s.',
      answer: 75,
      tolerance: 0.01,
      unit: 'm',
      hints: ['Rời bến nghĩa là $v_0 = 0$.', 'Dùng $d = v_0t + \\dfrac{1}{2}at^2$.'],
      solution: '$d = 0 + \\dfrac{1}{2} \\cdot 1{,}5 \\cdot 10^2 = 75$ m.',
    },
    {
      type: 'number',
      prompt:
        'Một ô tô đang chạy $20$ m/s thì phanh gấp, đi thêm $100$ m mới dừng. Tính gia tốc của ô tô, lấy chiều dương là chiều chuyển động.',
      answer: -2,
      tolerance: 0.001,
      unit: 'm/s²',
      hints: ['Bài không cho thời gian: dùng hệ thức $v^2 - v_0^2 = 2ad$.', 'Khi dừng $v = 0$.'],
      solution: '$a = \\dfrac{v^2 - v_0^2}{2d} = \\dfrac{0 - 20^2}{2 \\cdot 100} = -2$ m/s².',
    },
    {
      type: 'number',
      prompt:
        'Đồ thị $v - t$ của một vật là đoạn thẳng đi từ $4$ m/s lúc $t = 0$ lên $12$ m/s lúc $t = 6$ s. Tính độ dịch chuyển của vật trong $6$ s đó.',
      answer: 48,
      tolerance: 0.01,
      unit: 'm',
      hints: ['Độ dịch chuyển bằng diện tích hình thang dưới đồ thị.'],
      solution: '$d = \\dfrac{(4 + 12) \\cdot 6}{2} = 48$ m.',
    },
    {
      type: 'number',
      prompt:
        'Một vật có $v_0 = 8$ m/s và $a = -2$ m/s². Tính quãng đường vật đi được trong $6$ s đầu (không phải độ dịch chuyển).',
      answer: 20,
      tolerance: 0.01,
      unit: 'm',
      hints: [
        'Tìm thời điểm vật đổi chiều, tức lúc $v = 0$.',
        'Tính riêng diện tích hai tam giác rồi cộng độ lớn.',
      ],
      solution:
        'Vật đổi chiều khi $8 - 2t = 0$, tức $t = 4$ s. Lúc $t = 6$ s, $v = -4$ m/s. Quãng đường: $s = \\dfrac{8 \\cdot 4}{2} + \\dfrac{4 \\cdot 2}{2} = 16 + 4 = 20$ m (còn $d = 16 - 4 = 12$ m).',
    },
    {
      type: 'choice',
      prompt: 'Vận tốc của một vật là $v = 10 - 2t$ (m/s). Mô tả nào đúng?',
      options: [
        'Vật nhanh dần đều trong suốt thời gian chuyển động.',
        'Vật chậm dần đều đến $t = 5$ s, sau đó nhanh dần đều theo chiều ngược lại.',
        'Vật chuyển động thẳng đều với vận tốc $10$ m/s.',
        'Vật chậm dần đều rồi dừng hẳn từ $t = 5$ s.',
      ],
      answer: 1,
      hints: ['So sánh dấu của $a$ và $v$ trước và sau lúc $v = 0$.'],
      solution:
        '$a = -2$ m/s². Khi $t < 5$ s, $v > 0$ nên $a$ và $v$ trái dấu: chậm dần. Khi $t > 5$ s, $v < 0$ cùng dấu với $a$: nhanh dần theo chiều âm.',
    },
    {
      type: 'multi',
      prompt: 'Những công thức nào đúng với chuyển động thẳng biến đổi đều (lúc $t = 0$ có $v_0$)?',
      options: [
        '$v = v_0 + at$',
        '$d = v_0 + \\dfrac{1}{2}at$',
        '$d = v_0t + \\dfrac{1}{2}at^2$',
        '$v^2 - v_0^2 = 2ad$',
      ],
      answers: [0, 2, 3],
      hints: ['Kiểm tra đơn vị: độ dịch chuyển phải có đơn vị mét.'],
      solution:
        'Ba công thức đúng là $v = v_0 + at$, $d = v_0t + \\dfrac{1}{2}at^2$ và $v^2 - v_0^2 = 2ad$. Công thức còn lại sai đơn vị: $v_0$ có đơn vị m/s, không phải m.',
    },
    {
      type: 'match',
      prompt: 'Nối dáng đồ thị $v - t$ (với $v > 0$) với tính chất chuyển động.',
      left: ['Đoạn thẳng nằm ngang', 'Đoạn thẳng đi lên', 'Đoạn thẳng đi xuống'],
      right: ['Thẳng đều', 'Nhanh dần đều', 'Chậm dần đều'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
      hints: ['Độ dốc của đồ thị cho biết gia tốc.'],
      solution:
        'Nằm ngang: $a = 0$, thẳng đều. Đi lên: $a > 0$ cùng dấu $v$, nhanh dần đều. Đi xuống: $a < 0$ trái dấu $v$, chậm dần đều.',
    },
  ],
  takeaways: [
    'Chuyển động thẳng biến đổi đều có gia tốc không đổi: $a$ cùng dấu $v$ là nhanh dần đều, trái dấu $v$ là chậm dần đều.',
    'Vận tốc: $v = v_0 + at$; đồ thị $v - t$ là đoạn thẳng có độ dốc bằng $a$.',
    'Độ dịch chuyển bằng diện tích dưới đồ thị $v - t$: $d = v_0t + \\dfrac{1}{2}at^2$.',
    'Khi không biết thời gian, dùng $v^2 - v_0^2 = 2ad$.',
  ],
};
