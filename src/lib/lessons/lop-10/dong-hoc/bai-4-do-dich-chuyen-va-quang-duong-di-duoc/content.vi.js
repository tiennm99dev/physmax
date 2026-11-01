/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Xác định vị trí và thời điểm của vật trong một hệ quy chiếu, hiểu độ dịch chuyển là đại lượng vectơ, phân biệt độ dịch chuyển với quãng đường đi được và tổng hợp các độ dịch chuyển.',
  intro:
    'Một ô tô đi $6$ km về hướng Tây, rẽ đi $4$ km về hướng Nam, rồi $3$ km về hướng Đông. Xe đã lăn bánh $13$ km, nhưng so với lúc xuất phát thì xe chỉ cách chỗ cũ $5$ km. Hai con số ấy đều đúng, vì chúng trả lời hai câu hỏi khác nhau: đi được bao xa, và đã dời chỗ đến đâu.',
  objectives: [
    'Dùng hệ toạ độ, mốc thời gian và đồng hồ để xác định vị trí và thời điểm của vật.',
    'Nêu được độ dịch chuyển là đại lượng vectơ, có độ lớn và hướng.',
    'Phân biệt được độ dịch chuyển với quãng đường đi được.',
    'Tổng hợp được các độ dịch chuyển bằng phép cộng vectơ.',
  ],
  sections: [
    {
      heading: 'Vị trí của vật và hệ quy chiếu',
      blocks: [
        {
          type: 'p',
          text: 'Để xác định vị trí của một vật, ta chọn một vật làm mốc và một hệ toạ độ có gốc gắn với vật mốc. Với chuyển động thẳng chỉ cần một trục $Ox$. Với chuyển động trên một mặt phẳng, ta dùng hệ toạ độ vuông góc $Oxy$, chẳng hạn trục $Ox$ theo hướng Đông và trục $Oy$ theo hướng Bắc.',
        },
        {
          type: 'p',
          text: 'Để xác định thời điểm xảy ra sự việc, ta chọn một mốc thời gian và dùng đồng hồ đo khoảng thời gian tính từ mốc đó.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Hệ quy chiếu',
          text: 'Hệ toạ độ gắn với vật mốc, cùng với mốc thời gian và đồng hồ, tạo thành một hệ quy chiếu.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Thời điểm và thời gian',
          text: 'Tàu rời ga lúc $19$ h và đến nơi lúc $5$ h sáng hôm sau: $19$ h và $5$ h là hai thời điểm, còn $10$ h là thời gian đi của tàu.',
        },
      ],
    },
    {
      heading: 'Độ dịch chuyển',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Độ dịch chuyển',
          text: 'Độ dịch chuyển $\\vec{d}$ là đại lượng vectơ cho biết độ dài và hướng của sự thay đổi vị trí của vật. Vectơ này có gốc ở vị trí đầu, ngọn ở vị trí cuối của chuyển động.',
        },
        {
          type: 'p',
          text: 'Độ dịch chuyển được biểu diễn bằng một mũi tên nối vị trí đầu với vị trí cuối, có độ dài tỉ lệ với độ lớn của độ dịch chuyển. Khi vật chuyển động thẳng trên trục $Ox$ từ toạ độ $x_1$ đến toạ độ $x_2$, ta viết',
        },
        { type: 'tex', tex: 'd = x_2 - x_1' },
        {
          type: 'p',
          text: 'Dấu của $d$ cho biết hướng: $d > 0$ khi vật dời theo chiều dương của trục, $d < 0$ khi vật dời theo chiều ngược lại.',
        },
      ],
    },
    {
      heading: 'Phân biệt độ dịch chuyển và quãng đường đi được',
      blocks: [
        {
          type: 'table',
          caption: 'So sánh hai đại lượng',
          head: ['Đặc điểm', 'Quãng đường đi được $s$', 'Độ dịch chuyển $\\vec{d}$'],
          rows: [
            ['Loại đại lượng', 'Vô hướng, không âm', 'Vectơ, có độ lớn và hướng'],
            [
              'Cho biết',
              'Độ dài của cả đoạn đường vật đã đi',
              'Vị trí cuối đã dời so với vị trí đầu',
            ],
            ['Phụ thuộc đường đi', 'Có', 'Không, chỉ phụ thuộc vị trí đầu và vị trí cuối'],
          ],
        },
        {
          type: 'list',
          items: [
            'Vật chuyển động thẳng, không đổi chiều: độ lớn của độ dịch chuyển bằng quãng đường đi được, $d = s$.',
            'Vật đổi chiều hoặc đi theo đường cong, đường gấp khúc: độ lớn của độ dịch chuyển nhỏ hơn quãng đường, $d < s$.',
            'Vật trở về vị trí đầu: $d = 0$, còn $s$ vẫn lớn hơn $0$.',
          ],
        },
      ],
    },
    {
      heading: 'Tổng hợp độ dịch chuyển',
      blocks: [
        {
          type: 'p',
          text: 'Độ dịch chuyển là vectơ nên các độ dịch chuyển được tổng hợp bằng phép cộng vectơ. Vật đi từ $A$ đến $B$ rồi từ $B$ đến $C$ thì',
        },
        {
          type: 'tex',
          tex: '\\vec{d} = \\overrightarrow{AC} = \\overrightarrow{AB} + \\overrightarrow{BC}',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Hai độ dịch chuyển vuông góc',
          text: 'Khi $AB \\perp BC$, độ lớn của độ dịch chuyển tổng hợp là cạnh huyền của tam giác vuông $ABC$: $AC = \\sqrt{AB^2 + BC^2}$. Hướng của $\\overrightarrow{AC}$ được xác định qua góc $\\alpha$ tại $A$, với $\\tan \\alpha = \\dfrac{BC}{AB}$.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Xác định hướng theo toạ độ địa lí',
          text: 'Trên bản đồ, hướng thường được nêu theo Đông, Tây, Nam, Bắc. Hướng nằm giữa hai hướng chính được gọi theo cả hai, ví dụ hướng Tây – Nam, kèm góc lệch so với một hướng chính.',
        },
      ],
    },
  ],
  explore: {
    title: 'Vẽ lộ trình trên bản đồ lưới',
    instruction:
      'Chạm vào các điểm trên bản đồ, hoặc dùng các nút hướng và phím mũi tên, để xe đi từng chặng. Đường xanh là quãng đường, mũi tên đỏ là độ dịch chuyển. Hoàn thành từng nhiệm vụ và để ý: mũi tên đỏ không quan tâm xe đã đi vòng thế nào.',
  },
  examples: [
    {
      problem:
        'Một ô tô đi thẳng $6$ km theo hướng Tây, sau đó rẽ trái đi thẳng $4$ km theo hướng Nam, rồi rẽ trái đi thẳng $3$ km theo hướng Đông. Tính quãng đường đi được và độ dịch chuyển của ô tô.',
      steps: [
        'Quãng đường là tổng độ dài các chặng: $s = 6 + 4 + 3 = 13$ km.',
        'So với vị trí đầu, vị trí cuối lệch về Tây $6 - 3 = 3$ km và về Nam $4$ km.',
        'Hai phần này vuông góc nên $d = \\sqrt{3^2 + 4^2} = 5$ km.',
        'Góc lệch so với hướng Tây: $\\tan \\alpha = \\dfrac{4}{3}$, nên $\\alpha \\approx 53{,}1^\\circ$.',
      ],
      answer:
        '$s = 13$ km; $d = 5$ km theo hướng Tây – Nam, lệch khoảng $53{,}1^\\circ$ so với hướng Tây.',
    },
    {
      problem:
        'Trên trục $Ox$ dọc theo một đường thẳng, một người đi từ toạ độ $x_1 = 200$ m đến toạ độ $600$ m, rồi quay lại đến toạ độ $x_2 = 100$ m. Tính độ dịch chuyển và quãng đường đi được của người đó.',
      steps: [
        'Độ dịch chuyển chỉ phụ thuộc hai đầu: $d = x_2 - x_1 = 100 - 200 = -100$ m.',
        'Dấu trừ cho biết vị trí cuối nằm về phía ngược chiều dương so với vị trí đầu.',
        'Quãng đường gồm hai chặng: $s = (600 - 200) + (600 - 100) = 400 + 500 = 900$ m.',
      ],
      answer: '$d = -100$ m, độ lớn $100$ m, ngược chiều dương; $s = 900$ m.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Phát biểu nào sau đây về độ dịch chuyển là đúng?',
      options: [
        'Độ dịch chuyển là đại lượng vô hướng, luôn dương.',
        'Độ dịch chuyển là đại lượng vectơ, có gốc ở vị trí đầu và ngọn ở vị trí cuối.',
        'Độ dịch chuyển luôn bằng quãng đường đi được.',
        'Độ dịch chuyển phụ thuộc vào hình dạng đường đi.',
      ],
      answer: 1,
      hints: ['Độ dịch chuyển trả lời cả hai câu hỏi: bao xa và về hướng nào.'],
      solution:
        'Độ dịch chuyển là vectơ nối vị trí đầu với vị trí cuối, nên chỉ phụ thuộc hai vị trí này, không phụ thuộc đường đi.',
    },
    {
      type: 'multi',
      prompt: 'Trường hợp nào có độ lớn của độ dịch chuyển bằng quãng đường đi được?',
      options: [
        'Xe chạy thẳng $5$ km, không đổi chiều.',
        'Xe chạy thẳng $5$ km rồi quay lại $2$ km.',
        'Vận động viên chạy hết một vòng sân.',
        'Quả bóng lăn thẳng trên sàn theo một chiều.',
      ],
      answers: [0, 3],
      hints: ['Hai đại lượng bằng nhau khi đường đi là đoạn thẳng nối vị trí đầu với vị trí cuối.'],
      solution:
        'Chỉ chuyển động thẳng, không đổi chiều mới có $d = s$. Quay lại hay chạy một vòng đều làm $d < s$.',
    },
    {
      type: 'number',
      prompt:
        'Một người đi $8$ km theo hướng Bắc rồi $6$ km theo hướng Đông. Tính độ lớn độ dịch chuyển của người đó.',
      answer: 10,
      unit: 'km',
      hints: [
        'Hai chặng vuông góc với nhau.',
        'Độ dịch chuyển là cạnh huyền của một tam giác vuông.',
      ],
      solution: '$d = \\sqrt{8^2 + 6^2} = \\sqrt{100} = 10$ km.',
    },
    {
      type: 'number',
      prompt: 'Cũng người ở câu trên, quãng đường người đó đi được là bao nhiêu?',
      answer: 14,
      unit: 'km',
      hints: ['Quãng đường là tổng độ dài các chặng, không phải cạnh huyền.'],
      solution: '$s = 8 + 6 = 14$ km.',
    },
    {
      type: 'number',
      prompt:
        'Trên trục $Ox$, một xe đi từ toạ độ $2$ km đến toạ độ $8$ km, rồi quay lại đến toạ độ $5$ km. Tính độ dịch chuyển $d$ của xe (có dấu).',
      answer: 3,
      unit: 'km',
      hints: ['Chỉ cần toạ độ đầu và toạ độ cuối.', 'Dùng $d = x_2 - x_1$.'],
      solution: '$d = 5 - 2 = 3$ km, tức dời $3$ km theo chiều dương.',
    },
    {
      type: 'number',
      prompt: 'Cũng xe ở câu trên, quãng đường xe đi được là bao nhiêu?',
      answer: 9,
      unit: 'km',
      hints: ['Chia làm hai chặng trước và sau khi quay lại.'],
      solution: '$s = (8 - 2) + (8 - 5) = 6 + 3 = 9$ km.',
    },
    {
      type: 'number',
      prompt:
        'Vận động viên chạy đúng một vòng đường tròn bán kính $50$ m. Tính quãng đường vận động viên đi được, lấy $\\pi \\approx 3{,}14$.',
      answer: 314,
      tolerance: 1,
      unit: 'm',
      hints: ['Quãng đường một vòng là chu vi đường tròn.'],
      solution:
        '$s = 2\\pi R \\approx 2 \\cdot 3{,}14 \\cdot 50 = 314$ m. Vì về đúng chỗ xuất phát nên độ dịch chuyển bằng $0$.',
    },
    {
      type: 'choice',
      prompt:
        'Một người đi $5$ km theo hướng Đông rồi $5$ km theo hướng Bắc. Hướng của độ dịch chuyển tổng hợp là',
      options: [
        'hướng Đông',
        'hướng Bắc',
        'hướng Đông – Bắc, lệch $45^\\circ$ so với hướng Đông',
        'hướng Tây – Nam',
      ],
      answer: 2,
      hints: ['Vẽ vectơ từ vị trí đầu đến vị trí cuối, hai cạnh góc vuông bằng nhau.'],
      solution:
        'Tam giác vuông có hai cạnh góc vuông bằng nhau nên $\\tan \\alpha = 1$, $\\alpha = 45^\\circ$. Hướng là Đông – Bắc.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi khái niệm với ý nghĩa của nó.',
      left: ['Quãng đường đi được', 'Độ dịch chuyển', 'Hệ quy chiếu'],
      right: [
        'Độ dài của cả đoạn đường vật đã đi',
        'Vectơ nối vị trí đầu với vị trí cuối',
        'Hệ toạ độ cùng mốc thời gian và đồng hồ',
      ],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
      hints: ['Đại lượng nào có hướng? Đại lượng nào chỉ là một độ dài?'],
      solution:
        'Quãng đường là độ dài đường đi; độ dịch chuyển là vectơ nối hai đầu; hệ quy chiếu gồm hệ toạ độ gắn với vật mốc, mốc thời gian và đồng hồ.',
    },
  ],
  takeaways: [
    'Hệ quy chiếu gồm hệ toạ độ gắn với vật mốc, mốc thời gian và đồng hồ.',
    'Độ dịch chuyển $\\vec{d}$ là vectơ nối vị trí đầu với vị trí cuối, không phụ thuộc đường đi.',
    'Quãng đường $s$ là độ dài đường đi, là đại lượng vô hướng; $d = s$ chỉ khi vật chuyển động thẳng, không đổi chiều.',
    'Độ dịch chuyển được tổng hợp bằng phép cộng vectơ; hai độ dịch chuyển vuông góc cho $d = \\sqrt{d_1^2 + d_2^2}$.',
  ],
};
