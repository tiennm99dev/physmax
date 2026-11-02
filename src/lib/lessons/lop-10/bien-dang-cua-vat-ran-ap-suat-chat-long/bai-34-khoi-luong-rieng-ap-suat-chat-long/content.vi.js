/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Khối lượng riêng ρ = m/V, áp lực và áp suất p = F/S, áp suất chất lỏng p = pa + ρgh, độ chênh áp suất Δp = ρgΔh, định luật Pascal và máy nén thủy lực.',
  intro:
    'Xuống càng sâu dưới nước, thợ lặn càng thấy tai bị ép, nên lặn sâu phải có trang bị riêng. Một người chỉ cần nhấn tay lên kích thủy lực cũng nâng được cả chiếc ô tô. Áp suất trong chất lỏng phụ thuộc vào những gì, và nó được truyền đi ra sao?',
  objectives: [
    'Nêu được định nghĩa khối lượng riêng; tính được $\\rho = \\dfrac{m}{V}$ và đổi được đơn vị.',
    'Phân biệt được áp lực và áp suất; vận dụng được $p = \\dfrac{F}{S}$.',
    'Vận dụng được $p = p_a + \\rho g h$ và $\\Delta p = \\rho g \\Delta h$ cho chất lỏng đứng yên.',
    'Phát biểu được định luật Pascal và giải thích được nguyên tắc của máy nén thủy lực.',
  ],
  sections: [
    {
      heading: 'Khối lượng riêng',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Khối lượng riêng',
          text: 'Khối lượng riêng của một chất là khối lượng của một đơn vị thể tích chất đó: $\\rho = \\dfrac{m}{V}$. Trong hệ SI, đơn vị là kg/m³; ngoài ra thường dùng g/cm³, với $1$ g/cm³ $= 1\\,000$ kg/m³.',
        },
        {
          type: 'table',
          caption: 'Khối lượng riêng của một số chất (giá trị làm tròn)',
          head: ['Chất', '$\\rho$ (kg/m³)', 'Chất', '$\\rho$ (kg/m³)'],
          rows: [
            ['Sắt', '$7\\,800$', 'Thủy ngân', '$13\\,600$'],
            ['Nhôm', '$2\\,700$', 'Nước', '$1\\,000$'],
            ['Đồng', '$8\\,900$', 'Dầu hỏa', '$800$'],
          ],
        },
        {
          type: 'p',
          text: 'Khối lượng của vật không đổi, còn thể tích thay đổi theo nhiệt độ. Vì thế khối lượng riêng của một chất phụ thuộc vào nhiệt độ.',
        },
      ],
    },
    {
      heading: 'Áp lực và áp suất',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Áp lực',
          text: 'Áp lực là lực ép có phương vuông góc với mặt bị ép. Cuốn sách trọng lượng $P$ nằm trên mặt bàn nằm ngang có áp lực bằng $P$; trên mặt bàn nghiêng góc $\\alpha$, áp lực chỉ còn $F_N = P\\cos\\alpha$.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Áp suất',
          text: 'Áp suất đặc trưng cho tác dụng của áp lực, được đo bằng áp lực trên một đơn vị diện tích bị ép: $p = \\dfrac{F}{S}$. Đơn vị là paxcan (Pa), $1$ Pa $= 1$ N/m².',
        },
        {
          type: 'p',
          text: 'Cùng một áp lực, diện tích bị ép càng nhỏ thì áp suất càng lớn. Xe tăng rất nặng nhưng có dải xích bản rộng nên áp suất lên đất nhỏ, đi được trên bùn; ô tô nhẹ hơn nhiều nhưng diện tích tiếp xúc nhỏ nên dễ bị lún. Mũi xẻng nhọn có diện tích nhỏ nên dễ cắm sâu vào đất.',
        },
      ],
    },
    {
      heading: 'Áp suất chất lỏng',
      blocks: [
        {
          type: 'p',
          text: 'Chọc các lỗ nhỏ trên thành một bình cầu đựng đầy nước rồi nén nước: nước phun ra từ mọi lỗ. Chất lỏng gây áp suất theo mọi phương lên các vật ở trong nó và lên thành bình.',
        },
        {
          type: 'p',
          text: 'Xét một khối chất lỏng đứng yên, hình trụ đứng có diện tích đáy $S$, cao $h$, đỉnh ở mặt thoáng. Trọng lượng của khối là $P = mg = \\rho V g = \\rho S h g$, gây lên đáy áp suất:',
        },
        { type: 'tex', tex: '\\dfrac{P}{S} = \\rho g h' },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Áp suất tại độ sâu $h$',
          text: '$p = p_a + \\rho g h$, với $p_a$ là áp suất khí quyển trên mặt thoáng (khoảng $1{,}013 \\cdot 10^{5}$ Pa), $\\rho$ là khối lượng riêng của chất lỏng, $g$ là gia tốc trọng trường, $h$ là độ sâu so với mặt thoáng.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Phương trình cơ bản của chất lưu đứng yên',
          text: 'Độ chênh lệch áp suất giữa hai điểm cách nhau độ cao $\\Delta h$ trong chất lỏng đứng yên là $\\Delta p = \\rho g \\Delta h$.',
        },
        {
          type: 'list',
          items: [
            'Các điểm trên cùng một mặt phẳng nằm ngang có $\\Delta h = 0$ nên có cùng áp suất.',
            'Áp suất chỉ phụ thuộc vào độ sâu và khối lượng riêng (với $p_a$, $g$ đã cho), không phụ thuộc vào hình dạng bình.',
            'Áp suất của nước lên mặt dưới và mặt trên của vật chênh nhau, từ đó sinh ra lực đẩy Archimedes: $F_A = \\Delta p \\cdot S = \\rho g V$.',
          ],
        },
      ],
    },
    {
      heading: 'Định luật Pascal và máy nén thủy lực',
      blocks: [
        {
          type: 'p',
          text: 'Trong công thức $p = p_a + \\rho g h$, nếu áp suất $p_a$ trên mặt chất lỏng tăng thêm một lượng thì áp suất tại mọi độ sâu cũng tăng thêm đúng lượng đó. Pascal đã phát biểu điều này thành định luật.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Định luật Pascal',
          text: 'Độ tăng áp suất lên một chất lỏng chứa trong bình kín được truyền nguyên vẹn đến mọi điểm của chất lỏng và của thành bình.',
        },
        {
          type: 'p',
          text: 'Máy nén thủy lực gồm hai xilanh có pít-tông diện tích $S_1 < S_2$, nối thông nhau và chứa đầy chất lỏng. Lực $F_1$ trên pít-tông nhỏ tạo độ tăng áp suất $\\dfrac{F_1}{S_1}$, được truyền đến pít-tông lớn:',
        },
        {
          type: 'tex',
          tex: '\\dfrac{F_1}{S_1} = \\dfrac{F_2}{S_2} \\quad\\Rightarrow\\quad F_2 = F_1\\dfrac{S_2}{S_1}',
        },
        {
          type: 'p',
          text: 'Chất lỏng gần như không nén được nên thể tích đi khỏi xilanh nhỏ bằng thể tích vào xilanh lớn: $S_1 d_1 = S_2 d_2$. Lợi bao nhiêu lần về lực thì thiệt bấy nhiêu lần về đường đi, công không thay đổi. Kích thủy lực, phanh thủy lực và máy ép thủy lực đều dựa trên nguyên tắc này.',
        },
        { type: 'widget', name: 'may-nen' },
      ],
    },
  ],
  explore: {
    title: 'Cảm biến áp suất trong bình',
    instruction:
      'Kéo cảm biến lên xuống trong bình và theo dõi số đo, đồ thị. Kéo ngang theo đường đứt nét, đổi dạng bình: số đo có đổi không? Rồi đổi chất lỏng và xem đường thẳng dốc hơn hay thoải hơn.',
  },
  examples: [
    {
      problem:
        'Một khối lập phương cạnh $0{,}30$ m chìm $\\dfrac{2}{3}$ thể tích trong nước, mặt dưới nằm ngang. Biết $\\rho = 1\\,000$ kg/m³, lấy $g = 9{,}8$ m/s². Tính áp suất do nước gây ra ở mặt dưới của khối và lực do áp suất đó tác dụng lên mặt dưới.',
      steps: [
        'Độ sâu của mặt dưới: $h = \\dfrac{2}{3} \\cdot 0{,}30 = 0{,}20$ m.',
        '$\\rho g h = 1\\,000 \\cdot 9{,}8 \\cdot 0{,}20 = 1\\,960$ Pa.',
        'Diện tích mặt dưới: $S = 0{,}30^2 = 0{,}09$ m². Lực: $F = pS = 1\\,960 \\cdot 0{,}09 = 176{,}4$ N, phương thẳng đứng, chiều từ dưới lên.',
        'Lực này chính là lực đẩy Archimedes: $\\rho g V = 1\\,000 \\cdot 9{,}8 \\cdot 0{,}018 = 176{,}4$ N.',
      ],
      answer: 'Áp suất do nước gây ra là $1\\,960$ Pa, lực có độ lớn $176{,}4$ N, hướng lên.',
    },
    {
      problem:
        'Một người khối lượng $50$ kg đứng trên mặt đất nằm ngang, diện tích tiếp xúc của mỗi bàn chân là $0{,}015$ m². Lấy $g = 9{,}8$ m/s². Tính áp suất người đó tác dụng lên mặt đất khi đứng hai chân và khi đứng một chân.',
      steps: [
        'Áp lực bằng trọng lượng: $F = P = mg = 50 \\cdot 9{,}8 = 490$ N.',
        'Đứng hai chân: $S = 0{,}030$ m², $p = \\dfrac{490}{0{,}030} \\approx 16\\,333$ Pa.',
        'Đứng một chân: $S = 0{,}015$ m², $p = \\dfrac{490}{0{,}015} \\approx 32\\,667$ Pa, gấp đôi.',
      ],
      answer: 'Khoảng $16\\,333$ Pa khi đứng hai chân, $32\\,667$ Pa khi đứng một chân.',
    },
    {
      problem:
        'Kích thủy lực có $\\dfrac{S_2}{S_1} = 50$ dùng để nâng ô tô khối lượng $1\\,500$ kg. Lấy $g = 9{,}8$ m/s². Tính lực nhỏ nhất đặt lên pít-tông nhỏ, và quãng đường pít-tông lớn đi lên khi pít-tông nhỏ đi xuống $20$ cm.',
      steps: [
        'Pít-tông lớn phải nâng được trọng lượng xe: $F_2 = P = 1\\,500 \\cdot 9{,}8 = 14\\,700$ N.',
        '$F_1 = F_2 \\dfrac{S_1}{S_2} = \\dfrac{14\\,700}{50} = 294$ N.',
        '$d_2 = d_1 \\dfrac{S_1}{S_2} = \\dfrac{20}{50} = 0{,}4$ cm.',
      ],
      answer: '$F_1 = 294$ N; $d_2 = 0{,}4$ cm.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt:
        'Một khối sắt có thể tích $0{,}002$ m³, khối lượng riêng của sắt là $7\\,800$ kg/m³. Tính khối lượng của khối sắt.',
      answer: 15.6,
      tolerance: 0.01,
      unit: 'kg',
      hints: ['Từ $\\rho = \\dfrac{m}{V}$ suy ra $m$.'],
      solution: '$m = \\rho V = 7\\,800 \\cdot 0{,}002 = 15{,}6$ kg.',
    },
    {
      type: 'choice',
      prompt: 'Vì sao khối lượng riêng của một chất phụ thuộc vào nhiệt độ?',
      options: [
        'Khối lượng không đổi nhưng thể tích thay đổi theo nhiệt độ',
        'Khối lượng thay đổi nhưng thể tích không đổi theo nhiệt độ',
        'Cả khối lượng và thể tích đều không đổi',
        'Vì gia tốc trọng trường thay đổi theo nhiệt độ',
      ],
      answer: 0,
      hints: ['Đun nóng một vật, lượng chất trong vật có thay đổi không?'],
      solution:
        'Lượng chất không đổi nên khối lượng không đổi, còn thể tích thay đổi theo nhiệt độ, kéo theo $\\rho = \\dfrac{m}{V}$ thay đổi.',
    },
    {
      type: 'number',
      prompt:
        'Người khối lượng $60$ kg đứng hai chân trên sàn nằm ngang, diện tích tiếp xúc mỗi bàn chân là $0{,}02$ m². Lấy $g = 9{,}8$ m/s². Tính áp suất của người lên sàn.',
      answer: 14700,
      tolerance: 1,
      unit: 'Pa',
      hints: ['Áp lực bằng trọng lượng. Diện tích bị ép gồm cả hai bàn chân.'],
      solution: '$p = \\dfrac{mg}{S} = \\dfrac{60 \\cdot 9{,}8}{0{,}04} = 14\\,700$ Pa.',
    },
    {
      type: 'choice',
      prompt:
        'Xe tăng nặng hơn ô tô nhiều lần mà đi được trên đất bùn, còn ô tô lại bị lún. Lí do là gì?',
      options: [
        'Dải xích bản rộng làm diện tích bị ép lớn nên áp suất lên đất nhỏ',
        'Xe tăng có áp lực lên đất nhỏ hơn ô tô',
        'Bánh ô tô tạo lực ma sát lớn hơn dải xích',
        'Xe tăng chuyển động chậm hơn nên đất không bị ép',
      ],
      answer: 0,
      hints: ['Áp suất phụ thuộc vào cả áp lực và diện tích bị ép.'],
      solution:
        'Áp lực của xe tăng lớn hơn nhưng diện tích tiếp xúc của dải xích lớn hơn rất nhiều, nên $p = \\dfrac{F}{S}$ nhỏ hơn.',
    },
    {
      type: 'number',
      prompt:
        'Tính áp suất tại điểm ở độ sâu $5$ m dưới mặt thoáng của nước. Biết $\\rho = 1\\,000$ kg/m³, $g = 9{,}8$ m/s², $p_a = 1{,}013 \\cdot 10^{5}$ Pa.',
      answer: 150300,
      tolerance: 50,
      unit: 'Pa',
      hints: ['Đừng quên áp suất khí quyển trên mặt thoáng.'],
      solution: '$p = 101\\,300 + 1\\,000 \\cdot 9{,}8 \\cdot 5 = 150\\,300$ Pa.',
    },
    {
      type: 'number',
      prompt:
        'Tính độ chênh lệch áp suất giữa hai điểm trong dầu hỏa ($\\rho = 800$ kg/m³) thuộc hai mặt phẳng nằm ngang cách nhau $50$ cm, lấy $g = 9{,}8$ m/s².',
      answer: 3920,
      tolerance: 1,
      unit: 'Pa',
      hints: ['$\\Delta p = \\rho g \\Delta h$, đổi $\\Delta h$ ra mét.'],
      solution: '$\\Delta p = 800 \\cdot 9{,}8 \\cdot 0{,}5 = 3\\,920$ Pa.',
    },
    {
      type: 'number',
      prompt:
        'Thợ lặn đo được áp suất $2{,}5 \\cdot 10^{5}$ Pa dưới nước biển ($\\rho = 1\\,030$ kg/m³). Biết $p_a = 1{,}013 \\cdot 10^{5}$ Pa, $g = 9{,}8$ m/s². Thợ lặn ở độ sâu khoảng bao nhiêu mét (làm tròn đến một chữ số thập phân)?',
      answer: 14.7,
      tolerance: 0.1,
      unit: 'm',
      hints: ['Từ $p = p_a + \\rho g h$ rút ra $h$.'],
      solution:
        '$h = \\dfrac{p - p_a}{\\rho g} = \\dfrac{250\\,000 - 101\\,300}{1\\,030 \\cdot 9{,}8} = \\dfrac{148\\,700}{10\\,094} \\approx 14{,}7$ m.',
    },
    {
      type: 'multi',
      prompt: 'Trong một chất lỏng đứng yên, những phát biểu nào đúng?',
      options: [
        'Hai điểm trên cùng một mặt phẳng nằm ngang có cùng áp suất',
        'Càng xuống sâu, áp suất càng lớn',
        'Áp suất chỉ tác dụng theo phương thẳng đứng, từ trên xuống',
        'Cùng độ sâu, bình càng rộng thì áp suất càng lớn',
      ],
      answers: [0, 1],
      hints: ['Dùng $\\Delta p = \\rho g \\Delta h$ để kiểm tra từng phát biểu.'],
      solution:
        '$\\Delta h = 0$ thì $\\Delta p = 0$; $h$ tăng thì $p$ tăng. Chất lỏng gây áp suất theo mọi phương, và áp suất không phụ thuộc vào độ rộng của bình.',
    },
    {
      type: 'number',
      prompt:
        'Máy nén thủy lực có $S_1 = 10$ cm², $S_2 = 400$ cm². Lực $250$ N đặt lên pít-tông nhỏ tạo ra lực nâng bao nhiêu ở pít-tông lớn?',
      answer: 10000,
      tolerance: 1,
      unit: 'N',
      hints: [
        '$\\dfrac{F_1}{S_1} = \\dfrac{F_2}{S_2}$; chỉ cần tỉ số diện tích nên không phải đổi ra m².',
      ],
      solution: '$F_2 = 250 \\cdot \\dfrac{400}{10} = 10\\,000$ N.',
    },
    {
      type: 'number',
      prompt:
        'Máy nén thủy lực có $\\dfrac{S_2}{S_1} = 60$ nâng một ô tô khối lượng $1\\,200$ kg. Lấy $g = 10$ m/s². Tính lực nhỏ nhất đặt lên pít-tông nhỏ.',
      answer: 200,
      tolerance: 0.5,
      unit: 'N',
      hints: ['Tính trọng lượng xe, rồi chia cho tỉ số diện tích.'],
      solution: '$F_1 = \\dfrac{mg}{60} = \\dfrac{12\\,000}{60} = 200$ N.',
    },
    {
      type: 'number',
      prompt:
        'Trong máy nén thủy lực có $\\dfrac{S_2}{S_1} = 50$, pít-tông nhỏ đi xuống $20$ cm. Pít-tông lớn đi lên bao nhiêu xentimét?',
      answer: 0.4,
      tolerance: 0.01,
      unit: 'cm',
      hints: ['Thể tích chất lỏng rời xilanh nhỏ bằng thể tích vào xilanh lớn.'],
      solution: '$S_1 d_1 = S_2 d_2$ nên $d_2 = \\dfrac{20}{50} = 0{,}4$ cm.',
    },
  ],
  takeaways: [
    'Khối lượng riêng $\\rho = \\dfrac{m}{V}$, đơn vị kg/m³, phụ thuộc vào nhiệt độ.',
    'Áp lực là lực ép vuông góc với mặt bị ép; áp suất $p = \\dfrac{F}{S}$, đơn vị Pa.',
    'Trong chất lỏng đứng yên: $p = p_a + \\rho g h$ và $\\Delta p = \\rho g \\Delta h$. Cùng mặt phẳng ngang thì cùng áp suất.',
    'Định luật Pascal: độ tăng áp suất được truyền nguyên vẹn trong chất lỏng ở bình kín. Máy nén thủy lực: $\\dfrac{F_1}{S_1} = \\dfrac{F_2}{S_2}$, lợi về lực thì thiệt về đường đi.',
  ],
};
