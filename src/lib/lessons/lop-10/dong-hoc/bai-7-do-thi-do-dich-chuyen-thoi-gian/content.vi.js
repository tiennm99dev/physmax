/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Vẽ đồ thị độ dịch chuyển - thời gian của chuyển động thẳng từ bảng số liệu, đọc đồ thị để mô tả chuyển động và tính vận tốc từ độ dốc của đồ thị.',
  intro:
    'Ở môn Khoa học tự nhiên 7, em đã dùng đồ thị quãng đường - thời gian. Quãng đường không bao giờ giảm, nhưng một chiếc xe có thể dừng lại rồi quay đầu. Đồ thị độ dịch chuyển - thời gian ghi được cả điều đó: chỉ cần nhìn độ dốc và hướng của đường vẽ là biết xe nhanh hay chậm, đi tới hay đi lùi.',
  objectives: [
    'Vẽ được đồ thị độ dịch chuyển - thời gian của chuyển động thẳng từ bảng số liệu.',
    'Mô tả được chuyển động của vật từ đồ thị $d - t$.',
    'Tính được vận tốc từ độ dốc của đồ thị $d - t$.',
  ],
  sections: [
    {
      heading: 'Độ dịch chuyển và vận tốc trong chuyển động thẳng',
      blocks: [
        {
          type: 'p',
          text: 'Chuyển động thẳng là chuyển động có quỹ đạo là đường thẳng. Chọn một trục dọc theo đường thẳng ấy, độ dịch chuyển và vận tốc được biểu diễn bằng số có dấu.',
        },
        {
          type: 'list',
          items: [
            'Vật chuyển động thẳng theo một chiều và chọn chiều đó làm chiều dương: độ dịch chuyển bằng quãng đường, $d = s$; vận tốc bằng tốc độ, $v = \\dfrac{d}{t}$.',
            'Vật đổi chiều: quãng đường và tốc độ vẫn luôn dương, còn độ dịch chuyển và vận tốc trên đoạn đi ngược chiều dương có giá trị âm.',
          ],
        },
      ],
    },
    {
      heading: 'Vẽ đồ thị độ dịch chuyển - thời gian',
      blocks: [
        {
          type: 'p',
          text: 'Đồ thị $d - t$ có trục hoành là thời gian $t$, trục tung là độ dịch chuyển $d$. Để vẽ, ta lập bảng số liệu, chọn tỉ lệ cho hai trục, chấm các điểm $(t; d)$ rồi nối chúng.',
        },
        {
          type: 'table',
          caption: 'Bảng số liệu của một xe chuyển động thẳng đều',
          head: ['$t$ (s)', '$0$', '$2$', '$4$', '$6$', '$8$'],
          rows: [['$d$ (m)', '$0$', '$6$', '$12$', '$18$', '$24$']],
        },
        {
          type: 'p',
          text: 'Trong chuyển động thẳng đều, $d = v \\cdot t$ có dạng $y = ax$ nên đồ thị $d - t$ là một đường thẳng. Xe trong bảng có vận tốc $v = \\dfrac{24}{8} = 3$ m/s.',
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Đồ thị $d - t$ không phải là quỹ đạo của vật. Vật đi trên một đường thẳng, còn đường trên đồ thị cho biết độ dịch chuyển thay đổi theo thời gian thế nào.',
        },
      ],
    },
    {
      heading: 'Mô tả chuyển động và tính vận tốc từ đồ thị',
      blocks: [
        {
          type: 'table',
          caption: 'Đọc hình dạng của đồ thị $d - t$',
          head: ['Hình dạng đoạn đồ thị', 'Chuyển động của vật'],
          rows: [
            ['Đoạn thẳng đi lên', 'Thẳng đều theo chiều dương, $v > 0$'],
            ['Đoạn nằm ngang', 'Đứng yên, $v = 0$'],
            ['Đoạn thẳng đi xuống', 'Thẳng đều ngược chiều dương, $v < 0$'],
            ['Đoạn cong', 'Vận tốc thay đổi: chuyển động không đều'],
          ],
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Vận tốc là độ dốc của đồ thị',
          text: 'Trên một đoạn thẳng của đồ thị $d - t$, vận tốc bằng độ dốc của đoạn đó: $v = \\dfrac{\\Delta d}{\\Delta t}$. Đồ thị càng dốc, vật chuyển động càng nhanh.',
        },
        {
          type: 'p',
          text: 'Trong hình dưới, chọn từng đoạn để thấy cách lấy $\\Delta t$ và $\\Delta d$ trên đồ thị. Các câu bài tập ở cuối bài cũng dùng đồ thị này.',
        },
        { type: 'widget', name: 'doc-do-thi' },
      ],
    },
  ],
  explore: {
    title: 'Vẽ đồ thị bằng chính chuyển động của em',
    instruction:
      'Chọn đồ thị cần vẽ, nhấn "Bắt đầu ghi" rồi kéo nhân vật trên đường thẳng (hoặc dùng phím mũi tên và nút "Ghi thêm 1 s"). Cố gắng để đường xanh trùng với đường nét đứt: đi nhanh khi đoạn dốc, đứng yên khi đoạn nằm ngang, đi lùi khi đoạn đi xuống. Sau đó kéo thanh đọc để xem vận tốc từ độ dốc.',
  },
  examples: [
    {
      problem:
        'Đồ thị $d - t$ của một xe gồm các đoạn thẳng nối $A(0; 1)$, $B(3; 7)$, $C(5; 7)$ và $D(8; 1)$, với $t$ tính bằng giây, $d$ tính bằng mét. Mô tả chuyển động của xe và tính vận tốc trên mỗi đoạn.',
      steps: [
        'Đoạn $AB$ đi lên: xe chuyển động thẳng đều theo chiều dương, $v = \\dfrac{7 - 1}{3 - 0} = 2$ m/s.',
        'Đoạn $BC$ nằm ngang: xe đứng yên trong $2$ s, $v = 0$.',
        'Đoạn $CD$ đi xuống: xe chuyển động thẳng đều ngược chiều dương, $v = \\dfrac{1 - 7}{8 - 5} = -2$ m/s.',
      ],
      answer:
        'Xe đi theo chiều dương với $2$ m/s trong $3$ s, đứng yên $2$ s, rồi đi ngược lại với vận tốc $-2$ m/s trong $3$ s.',
    },
    {
      problem:
        'Một người bơi hết chiều dài bể $50$ m trong $25$ s, nghỉ ở cuối bể $5$ s, rồi bơi về chỗ cũ trong $30$ s. Chọn chiều dương là chiều bơi đi. Tìm vận tốc trên lượt đi, lượt về và vận tốc trung bình cả quá trình.',
      steps: [
        'Lượt đi: $v_1 = \\dfrac{50}{25} = 2$ m/s.',
        'Lượt về: $d = -50$ m nên $v_2 = \\dfrac{-50}{30} \\approx -1{,}67$ m/s.',
        'Cả quá trình người đó về chỗ cũ nên $d = 0$, do đó vận tốc trung bình bằng $0$.',
        'Trên đồ thị $d - t$, các đoạn nối $(0; 0)$, $(25; 50)$, $(30; 50)$ và $(60; 0)$.',
      ],
      answer:
        '$v_1 = 2$ m/s; $v_2 \\approx -1{,}67$ m/s; vận tốc trung bình cả quá trình bằng $0$.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Trên đồ thị $d - t$, một đoạn song song với trục thời gian cho biết',
      options: [
        'vật chuyển động thẳng đều',
        'vật đứng yên',
        'vật chuyển động nhanh dần',
        'vật đổi chiều chuyển động',
      ],
      answer: 1,
      hints: ['Khi $t$ tăng mà $d$ không đổi thì vị trí của vật thế nào?'],
      solution: '$d$ không đổi theo thời gian nên vật đứng yên, $v = 0$.',
    },
    {
      type: 'choice',
      prompt: 'Hai đoạn đồ thị $d - t$ cùng đi lên, đoạn $1$ dốc hơn đoạn $2$. Khi đó',
      options: [
        'vật trên đoạn $1$ chuyển động nhanh hơn',
        'vật trên đoạn $2$ chuyển động nhanh hơn',
        'vật trên hai đoạn có cùng vận tốc',
        'không so sánh được',
      ],
      answer: 0,
      hints: ['Độ dốc của đồ thị $d - t$ cho biết đại lượng nào?'],
      solution: 'Độ dốc bằng vận tốc nên đoạn dốc hơn có vận tốc lớn hơn.',
    },
    {
      type: 'number',
      prompt:
        'Một xe chuyển động thẳng đều có bảng số liệu: $t = 0;\\ 2;\\ 4;\\ 6$ s ứng với $d = 0;\\ 6;\\ 12;\\ 18$ m. Tính vận tốc của xe.',
      answer: 3,
      unit: 'm/s',
      hints: ['Lấy hai điểm bất kì, tính $\\dfrac{\\Delta d}{\\Delta t}$.'],
      solution: '$v = \\dfrac{18 - 0}{6 - 0} = 3$ m/s.',
    },
    {
      type: 'number',
      prompt:
        'Vẫn xe ở câu trên, độ dịch chuyển của xe tại $t = 10$ s là bao nhiêu nếu xe giữ nguyên vận tốc?',
      answer: 30,
      unit: 'm',
      hints: ['Dùng $d = v \\cdot t$.'],
      solution: '$d = 3 \\cdot 10 = 30$ m.',
    },
    {
      type: 'number',
      prompt:
        'Dựa vào đồ thị gồm các đoạn nối $A(0; 1)$, $B(3; 7)$, $C(5; 7)$, $D(8; 1)$ ở phần đọc đồ thị: tính vận tốc (có dấu) trên đoạn $CD$.',
      answer: -2,
      unit: 'm/s',
      hints: ['$\\Delta d = 1 - 7$.', '$\\Delta t = 8 - 5$.'],
      solution: '$v = \\dfrac{1 - 7}{8 - 5} = \\dfrac{-6}{3} = -2$ m/s.',
    },
    {
      type: 'number',
      prompt: 'Cũng đồ thị đó, tính quãng đường xe đi được từ $t = 0$ đến $t = 8$ s.',
      answer: 12,
      unit: 'm',
      hints: ['Quãng đường cộng độ dài từng chặng, không cộng có dấu.'],
      solution: 'Đoạn $AB$: $6$ m; đoạn $BC$: $0$ m; đoạn $CD$: $6$ m. Vậy $s = 12$ m.',
    },
    {
      type: 'number',
      prompt:
        'Vật A có $d_A = 2t$ và vật B có $d_B = 30 - 3t$ ($d$ tính bằng m, $t$ tính bằng s). Hai đồ thị cắt nhau tại thời điểm nào?',
      answer: 6,
      unit: 's',
      hints: ['Giao điểm của hai đồ thị ứng với $d_A = d_B$.'],
      solution:
        '$2t = 30 - 3t \\Rightarrow 5t = 30 \\Rightarrow t = 6$ s. Khi đó hai vật ở cùng vị trí $d = 12$ m.',
    },
    {
      type: 'multi',
      prompt: 'Phát biểu nào về đồ thị $d - t$ của chuyển động thẳng là đúng?',
      options: [
        'Đồ thị $d - t$ chính là quỹ đạo của vật.',
        'Chuyển động thẳng đều có đồ thị là đường thẳng.',
        'Đoạn đi xuống cho biết vận tốc âm.',
        'Đồ thị càng dốc thì vật chuyển động càng chậm.',
      ],
      answers: [1, 2],
      hints: ['Nhớ lại ý nghĩa của độ dốc và dấu của vận tốc.'],
      solution:
        'Đồ thị $d - t$ không phải quỹ đạo, và càng dốc thì vật càng nhanh. Chuyển động thẳng đều có đồ thị thẳng, đoạn đi xuống cho $v < 0$.',
    },
  ],
  takeaways: [
    'Đồ thị $d - t$ của chuyển động thẳng đều là đường thẳng.',
    'Đoạn đi lên: $v > 0$; đoạn nằm ngang: đứng yên; đoạn đi xuống: $v < 0$.',
    'Vận tốc bằng độ dốc của đồ thị: $v = \\dfrac{\\Delta d}{\\Delta t}$; đồ thị càng dốc, vật càng nhanh.',
    'Quãng đường và tốc độ luôn dương; độ dịch chuyển và vận tốc có thể âm.',
  ],
};
