/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Phản xạ toàn phần là hiện tượng toàn bộ ánh sáng tới bị phản xạ tại mặt phân cách giữa hai môi trường trong suốt; nó xảy ra khi ánh sáng đi từ môi trường có chiết suất lớn sang môi trường có chiết suất nhỏ hơn với góc tới không nhỏ hơn góc tới hạn, sin ith = n2 / n1, và là nguyên tắc hoạt động của cáp quang.',
  intro:
    'Chiếu tia sáng từ thuỷ tinh ra không khí với góc tới $41^\\circ$, tia khúc xạ gần như là là mặt phân cách. Nếu tăng góc tới lên $60^\\circ$ thì tia khúc xạ sẽ đi đâu? Câu trả lời là nguyên tắc giúp những sợi cáp quang mảnh như sợi tóc mang tín hiệu Internet vượt qua cả đại dương.',
  objectives: [
    'Mô tả được hiện tượng phản xạ toàn phần.',
    'Nêu được điều kiện xảy ra phản xạ toàn phần.',
    'Tính được góc tới hạn theo hệ thức $\\sin i_\\text{th} = \\dfrac{n_2}{n_1}$.',
    'Nêu được cấu tạo và nguyên tắc truyền ánh sáng trong sợi quang, cáp quang.',
  ],
  sections: [
    {
      heading: 'Hiện tượng phản xạ toàn phần',
      blocks: [
        {
          type: 'p',
          text: 'Chiếu một tia sáng từ mặt cong của khối thuỷ tinh bán trụ tới tâm của mặt phẳng, để tia sáng đi từ thuỷ tinh ra không khí. Tăng dần góc tới $i$, ta thấy:',
        },
        {
          type: 'list',
          items: [
            'Khi $i$ còn nhỏ: có tia khúc xạ rất sáng ra không khí, góc khúc xạ lớn hơn góc tới; tia phản xạ mờ.',
            'Khi $i$ tăng: góc khúc xạ tăng nhanh, tia khúc xạ mờ dần, tia phản xạ sáng dần.',
            'Khi $i$ đạt khoảng $42^\\circ$: tia khúc xạ gần như là là mặt phân cách ($r \\approx 90^\\circ$) rồi biến mất; chỉ còn tia phản xạ rất sáng.',
          ],
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Phản xạ toàn phần',
          text: 'Phản xạ toàn phần là hiện tượng toàn bộ ánh sáng tới bị phản xạ trở lại môi trường cũ, xảy ra ở mặt phân cách giữa hai môi trường trong suốt.',
        },
      ],
    },
    {
      heading: 'Điều kiện xảy ra phản xạ toàn phần',
      blocks: [
        {
          type: 'p',
          text: 'Khi ánh sáng đi từ môi trường chiết suất $n_1$ sang môi trường chiết suất $n_2 < n_1$, góc khúc xạ luôn lớn hơn góc tới. Góc tới ứng với góc khúc xạ $r = 90^\\circ$ gọi là góc tới hạn $i_\\text{th}$. Thay $r = 90^\\circ$ vào $n_1 \\sin i = n_2 \\sin r$:',
        },
        {
          type: 'tex',
          tex: '\\sin i_\\text{th} = \\frac{n_2}{n_1}',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Điều kiện phản xạ toàn phần',
          text: 'Ánh sáng truyền từ môi trường có chiết suất lớn sang môi trường có chiết suất nhỏ hơn ($n_1 > n_2$), và góc tới lớn hơn hoặc bằng góc tới hạn ($i \\ge i_\\text{th}$).',
        },
        {
          type: 'table',
          caption: 'Góc tới hạn khi ánh sáng đi ra không khí ($n_2 = 1$)',
          head: ['Môi trường', 'Chiết suất $n_1$', 'Góc tới hạn $i_\\text{th}$'],
          rows: [
            ['Nước', '$\\dfrac{4}{3}$', '$\\approx 48{,}6^\\circ$'],
            ['Thuỷ tinh', '$1{,}5$', '$\\approx 41{,}8^\\circ$'],
            ['Kim cương', '$2{,}42$', '$\\approx 24{,}4^\\circ$'],
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Chiều ngược lại thì không',
          text: 'Khi ánh sáng đi từ không khí vào nước hay thuỷ tinh ($n_1 < n_2$), luôn có tia khúc xạ với mọi góc tới, nên không bao giờ xảy ra phản xạ toàn phần.',
        },
        {
          type: 'p',
          text: 'Ở phần Khám phá, em tăng dần góc tới từ trong nước (hoặc thuỷ tinh) ra không khí và tự tìm góc tới hạn, lúc tia khúc xạ vừa biến mất.',
        },
      ],
    },
    {
      heading: 'Ứng dụng: sợi quang và cáp quang',
      blocks: [
        {
          type: 'p',
          text: 'Sợi quang gồm hai phần: phần lõi trong suốt bằng thuỷ tinh siêu sạch hoặc nhựa có chiết suất $n_1$, bọc ngoài bởi lớp vỏ có chiết suất $n_2$ nhỏ hơn $n_1$. Ngoài cùng là lớp vỏ bọc bằng nhựa dẻo để bảo vệ sợi.',
        },
        {
          type: 'p',
          text: 'Ánh sáng chiếu vào một đầu sợi đi tới thành lõi với góc tới lớn hơn góc tới hạn, nên bị phản xạ toàn phần, rồi lại phản xạ toàn phần ở thành đối diện... Cứ thế ánh sáng truyền theo đường gấp khúc trong lõi tới đầu kia, kể cả khi sợi bị uốn cong nhẹ, mà gần như không bị mất đi.',
        },
        { type: 'widget', name: 'soi-quang' },
        {
          type: 'p',
          text: 'Nhiều sợi quang ghép thành bó gọi là cáp quang. Cáp quang được dùng để truyền tín hiệu điện thoại, truyền hình, Internet đi xa với tốc độ cao và ít bị nhiễu; trong y học, ống nội soi dùng bó sợi quang để quan sát bên trong dạ dày, ruột. Phản xạ toàn phần còn làm viên kim cương (góc tới hạn nhỏ) lấp lánh và được dùng trong lăng kính phản xạ toàn phần của ống nhòm.',
        },
      ],
    },
  ],
  explore: {
    title: 'Đi tìm góc tới hạn',
    instruction:
      'Ánh sáng đi từ nước (hoặc thuỷ tinh) ra không khí. Kéo đèn laser hoặc dùng thanh trượt để tăng dần góc tới, quan sát tia khúc xạ mờ dần còn tia phản xạ sáng dần. Khi tia khúc xạ vừa biến mất, nhấn nút thử thách để kiểm tra góc tới hạn em tìm được.',
  },
  examples: [
    {
      problem:
        'Tính góc tới hạn khi ánh sáng truyền từ thuỷ tinh có chiết suất $1{,}5$ ra không khí.',
      steps: [
        'Ánh sáng đi từ môi trường chiết suất lớn ($n_1 = 1{,}5$) sang môi trường chiết suất nhỏ ($n_2 = 1$), nên có thể xảy ra phản xạ toàn phần.',
        '$\\sin i_\\text{th} = \\dfrac{n_2}{n_1} = \\dfrac{1}{1{,}5} = \\dfrac{2}{3} \\approx 0{,}667$.',
        'Dùng máy tính: $i_\\text{th} \\approx 41{,}8^\\circ$.',
      ],
      answer: 'Góc tới hạn $i_\\text{th} \\approx 41{,}8^\\circ$.',
    },
    {
      problem:
        'Chiếu tia sáng từ nước (chiết suất $\\dfrac{4}{3}$) ra không khí. Xác định đường đi của tia sáng khi góc tới là a) $30^\\circ$; b) $60^\\circ$.',
      steps: [
        'Góc tới hạn: $\\sin i_\\text{th} = \\dfrac{1}{4/3} = 0{,}75$, nên $i_\\text{th} \\approx 48{,}6^\\circ$.',
        'a) $i = 30^\\circ < i_\\text{th}$: có tia khúc xạ. $\\sin r = \\dfrac{4}{3} \\sin 30^\\circ = \\dfrac{2}{3}$, nên $r \\approx 41{,}8^\\circ$.',
        'b) $i = 60^\\circ > i_\\text{th}$: không có tia khúc xạ, xảy ra phản xạ toàn phần; tia phản xạ hợp với pháp tuyến góc $60^\\circ$.',
      ],
      answer:
        'a) Tia khúc xạ ra không khí với $r \\approx 41{,}8^\\circ$. b) Phản xạ toàn phần, không có tia khúc xạ.',
    },
    {
      problem:
        'Một sợi quang có lõi chiết suất $1{,}5$, vỏ chiết suất $1{,}2$. Tính góc tới hạn ở mặt phân cách lõi – vỏ. Tia sáng trong lõi tới thành lõi với góc tới $60^\\circ$ có truyền được dọc sợi không?',
      steps: [
        '$\\sin i_\\text{th} = \\dfrac{n_2}{n_1} = \\dfrac{1{,}2}{1{,}5} = 0{,}8$, nên $i_\\text{th} \\approx 53{,}1^\\circ$.',
        'Góc tới $60^\\circ > 53{,}1^\\circ$ và ánh sáng đi từ lõi (chiết suất lớn) ra vỏ (chiết suất nhỏ): xảy ra phản xạ toàn phần.',
        'Ở thành đối diện, góc tới vẫn là $60^\\circ$ nên tia sáng tiếp tục phản xạ toàn phần và truyền dọc sợi.',
      ],
      answer:
        'Góc tới hạn khoảng $53{,}1^\\circ$; tia sáng phản xạ toàn phần liên tiếp và truyền dọc sợi.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Hiện tượng phản xạ toàn phần là hiện tượng',
      options: [
        'toàn bộ ánh sáng tới bị phản xạ trở lại môi trường cũ tại mặt phân cách giữa hai môi trường trong suốt',
        'ánh sáng bị gãy khúc khi đi qua mặt phân cách',
        'toàn bộ ánh sáng tới đi xuyên qua mặt phân cách',
        'ánh sáng bị hấp thụ hoàn toàn tại mặt phân cách',
      ],
      answer: 0,
      hints: ['"Toàn phần" nghĩa là không còn chút ánh sáng nào khúc xạ sang môi trường kia.'],
      solution:
        'Phản xạ toàn phần: toàn bộ ánh sáng tới bị phản xạ, không có tia khúc xạ, tại mặt phân cách giữa hai môi trường trong suốt.',
    },
    {
      type: 'multi',
      prompt: 'Chọn tất cả các điều kiện cần có để xảy ra phản xạ toàn phần.',
      options: [
        'Ánh sáng đi từ môi trường có chiết suất lớn sang môi trường có chiết suất nhỏ hơn.',
        'Ánh sáng đi từ môi trường có chiết suất nhỏ sang môi trường có chiết suất lớn hơn.',
        'Góc tới lớn hơn hoặc bằng góc tới hạn.',
        'Góc tới nhỏ hơn góc tới hạn.',
      ],
      answers: [0, 2],
      hints: ['Có hai điều kiện: một về chiều truyền, một về góc tới.'],
      solution: 'Cần đồng thời: $n_1 > n_2$ và $i \\ge i_\\text{th}$.',
    },
    {
      type: 'number',
      prompt:
        'Tính góc tới hạn khi ánh sáng đi từ nước (chiết suất $\\dfrac{4}{3}$) ra không khí (theo độ, làm tròn đến một chữ số thập phân).',
      answer: 48.6,
      tolerance: 0.15,
      unit: '°',
      hints: ['$\\sin i_\\text{th} = \\dfrac{n_2}{n_1}$ với $n_2 = 1$.'],
      solution:
        '$\\sin i_\\text{th} = \\dfrac{1}{4/3} = 0{,}75$, nên $i_\\text{th} \\approx 48{,}6^\\circ$.',
    },
    {
      type: 'number',
      prompt:
        'Kim cương có chiết suất $2{,}42$. Tính góc tới hạn khi ánh sáng đi từ kim cương ra không khí (theo độ, làm tròn đến một chữ số thập phân).',
      answer: 24.4,
      tolerance: 0.15,
      unit: '°',
      hints: ['$\\sin i_\\text{th} = \\dfrac{1}{2{,}42}$.'],
      solution:
        '$\\sin i_\\text{th} = \\dfrac{1}{2{,}42} \\approx 0{,}413$, nên $i_\\text{th} \\approx 24{,}4^\\circ$. Góc tới hạn nhỏ nên ánh sáng dễ phản xạ toàn phần nhiều lần trong viên kim cương, làm nó lấp lánh.',
    },
    {
      type: 'choice',
      prompt:
        'Chiếu tia sáng từ không khí vào nước với góc tới $80^\\circ$. Điều gì xảy ra tại mặt nước?',
      options: [
        'Phản xạ toàn phần vì góc tới lớn hơn góc tới hạn',
        'Có tia khúc xạ vào nước, không xảy ra phản xạ toàn phần',
        'Ánh sáng bị hấp thụ hết',
        'Tia sáng truyền thẳng không đổi hướng',
      ],
      answer: 1,
      hints: ['Kiểm tra điều kiện về chiều truyền: không khí hay nước có chiết suất lớn hơn?'],
      solution:
        'Ánh sáng đi từ không khí ($n = 1$) vào nước ($n = \\frac{4}{3}$), tức từ chiết suất nhỏ sang chiết suất lớn, nên luôn có tia khúc xạ, không thể xảy ra phản xạ toàn phần dù góc tới lớn.',
    },
    {
      type: 'choice',
      prompt:
        'Tia sáng đi từ thuỷ tinh (chiết suất $1{,}5$) ra không khí với góc tới $45^\\circ$. Khi đó',
      options: [
        'có tia khúc xạ với góc khúc xạ nhỏ hơn $45^\\circ$',
        'có tia khúc xạ với góc khúc xạ lớn hơn $45^\\circ$',
        'xảy ra phản xạ toàn phần',
        'tia sáng truyền thẳng',
      ],
      answer: 2,
      hints: ['So sánh góc tới với góc tới hạn của thuỷ tinh, khoảng $41{,}8^\\circ$.'],
      solution:
        'Ánh sáng đi từ chiết suất lớn sang nhỏ và $i = 45^\\circ > i_\\text{th} \\approx 41{,}8^\\circ$, nên xảy ra phản xạ toàn phần.',
    },
    {
      type: 'number',
      prompt:
        'Ánh sáng đi từ một chất trong suốt ra không khí có góc tới hạn là $30^\\circ$. Tính chiết suất của chất đó.',
      answer: 2,
      tolerance: 0.001,
      hints: ['$\\sin i_\\text{th} = \\dfrac{1}{n}$, nên $n = \\dfrac{1}{\\sin i_\\text{th}}$.'],
      solution: '$n = \\dfrac{1}{\\sin 30^\\circ} = \\dfrac{1}{0{,}5} = 2$.',
    },
    {
      type: 'choice',
      prompt: 'Trong sợi quang, chiết suất của phần lõi',
      options: [
        'nhỏ hơn chiết suất của lớp vỏ',
        'bằng chiết suất của lớp vỏ',
        'lớn hơn chiết suất của lớp vỏ',
        'bằng chiết suất của không khí',
      ],
      answer: 2,
      hints: ['Ánh sáng phải phản xạ toàn phần khi đi từ lõi ra vỏ.'],
      solution:
        'Để ánh sáng đi từ lõi ra vỏ bị phản xạ toàn phần thì phải có $n_\\text{lõi} > n_\\text{vỏ}$.',
    },
    {
      type: 'number',
      prompt:
        'Lõi sợi quang có chiết suất $1{,}6$, vỏ có chiết suất $1{,}4$. Tính góc tới hạn ở mặt phân cách lõi – vỏ (theo độ, làm tròn đến một chữ số thập phân).',
      answer: 61,
      tolerance: 0.15,
      unit: '°',
      hints: ['$\\sin i_\\text{th} = \\dfrac{n_\\text{vỏ}}{n_\\text{lõi}}$.'],
      solution:
        '$\\sin i_\\text{th} = \\dfrac{1{,}4}{1{,}6} = 0{,}875$, nên $i_\\text{th} \\approx 61{,}0^\\circ$.',
    },
  ],
  takeaways: [
    'Phản xạ toàn phần: toàn bộ ánh sáng tới bị phản xạ tại mặt phân cách giữa hai môi trường trong suốt, không có tia khúc xạ.',
    'Điều kiện: ánh sáng đi từ môi trường chiết suất lớn sang môi trường chiết suất nhỏ hơn ($n_1 > n_2$) và $i \\ge i_\\text{th}$.',
    'Góc tới hạn: $\\sin i_\\text{th} = \\dfrac{n_2}{n_1}$; từ thuỷ tinh ra không khí $i_\\text{th} \\approx 41{,}8^\\circ$, từ nước ra không khí $i_\\text{th} \\approx 48{,}6^\\circ$.',
    'Sợi quang có lõi chiết suất lớn hơn vỏ; ánh sáng phản xạ toàn phần liên tiếp trong lõi nên truyền đi xa mà ít bị mất. Cáp quang dùng trong viễn thông và nội soi.',
  ],
};
