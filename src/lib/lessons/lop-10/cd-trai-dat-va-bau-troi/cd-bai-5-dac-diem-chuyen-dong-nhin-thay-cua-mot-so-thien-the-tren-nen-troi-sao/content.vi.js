/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Mặt Trời đi trên hoàng đạo từ Tây sang Đông mỗi ngày khoảng 1 độ, Mặt Trăng đổi pha theo chu kì 29,5 ngày, Kim tinh và Thuỷ tinh luôn ở gần Mặt Trời; mô hình nhật tâm giải thích được tất cả.',
  intro:
    'Dân gian có câu: "Đêm tháng năm chưa nằm đã sáng, ngày tháng mười chưa cười đã tối". Vì sao độ dài ngày đêm thay đổi theo tháng, vì sao trăng lúc tròn lúc khuyết, và vì sao có một "ngôi sao" sáng rực chỉ hiện ra lúc chiều tối hay lúc rạng đông?',
  objectives: [
    'Nêu được đặc điểm chuyển động nhìn thấy của Mặt Trời trong ngày và trong năm.',
    'Giải thích được các pha của Mặt Trăng và vì sao Mặt Trăng luôn hướng một mặt về Trái Đất.',
    'Mô tả được chuyển động nhìn thấy của Kim tinh, Thuỷ tinh; nêu được chuyển động vòng nút của hành tinh.',
    'Dùng mô hình nhật tâm của Copernicus để giải thích các đặc điểm đó.',
  ],
  sections: [
    {
      heading: 'Hệ Mặt Trời',
      blocks: [
        {
          type: 'p',
          text: 'Hệ Mặt Trời có $8$ hành tinh, kể từ trong ra ngoài: Thuỷ tinh, Kim tinh, Trái Đất, Hoả tinh, Mộc tinh, Thổ tinh, Thiên Vương tinh, Hải Vương tinh. Các hành tinh chuyển động quanh Mặt Trời theo quỹ đạo gần tròn, gần như trong cùng một mặt phẳng, và theo cùng một chiều.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Chuyển động nhìn thấy',
          text: 'Chuyển động nhìn thấy là chuyển động của thiên thể mà người quan sát đứng trên Trái Đất nhìn thấy. Nó có thể khác chuyển động thực, vì bản thân Trái Đất vừa tự quay vừa chuyển động quanh Mặt Trời.',
        },
      ],
    },
    {
      heading: 'Chuyển động nhìn thấy của Mặt Trời',
      blocks: [
        {
          type: 'p',
          text: 'Trong một ngày: Trái Đất tự quay từ Tây sang Đông nên ta thấy Mặt Trời đi từ Đông sang Tây. Khoảng thời gian giữa hai lần Mặt Trời lên cao nhất là một ngày, trung bình $24$ giờ.',
        },
        {
          type: 'p',
          text: 'Trong một năm: Trái Đất đi quanh Mặt Trời, nên nhìn từ Trái Đất, Mặt Trời dịch dần so với các sao, về phía Đông, mỗi ngày khoảng $1^\\circ$.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Hoàng đạo',
          text: 'Hoàng đạo là đường đi nhìn thấy của Mặt Trời trên nền trời sao trong một năm. Trục quay của Trái Đất nghiêng so với mặt phẳng quỹ đạo, nên hoàng đạo nghiêng khoảng $23{,}5^\\circ$ so với xích đạo trời. Hoàng đạo đi qua $12$ chòm sao gọi là các chòm sao hoàng đạo (theo ranh giới chòm sao ngày nay, nó còn đi qua một phần chòm Xà Phu).',
        },
        { type: 'widget', name: 'duong-di-mat-troi' },
        {
          type: 'table',
          caption: 'Đường đi trong ngày của Mặt Trời ở bán cầu Bắc, ngoài vùng cực',
          head: ['Thời điểm', 'Hướng mọc, lặn', 'Ngày và đêm'],
          rows: [
            ['Xuân phân, thu phân', 'Mọc đúng Đông, lặn đúng Tây', 'Dài xấp xỉ bằng nhau'],
            ['Từ xuân phân đến thu phân', 'Mọc và lặn lệch về phía Bắc', 'Ngày dài hơn đêm'],
            ['Từ thu phân đến xuân phân', 'Mọc và lặn lệch về phía Nam', 'Ngày ngắn hơn đêm'],
          ],
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Độ cao Mặt Trời giữa trưa',
          text: 'Ở vĩ độ $\\varphi$ (bán cầu Bắc), trong ngày Mặt Trời có độ xích vĩ $\\delta$ thì độ cao giữa trưa là $h = 90^\\circ - |\\varphi - \\delta|$, với $\\delta$ từ $+23{,}5^\\circ$ vào hạ chí đến $-23{,}5^\\circ$ vào đông chí.',
        },
        {
          type: 'p',
          text: 'Câu ca dao mở đầu nói về tháng năm và tháng mười âm lịch, vào khoảng tháng 6 và tháng 11 dương lịch. Khi đó đường đi của Mặt Trời ở miền Bắc nước ta lần lượt cao và thấp, nên ngày dài hơn và ngắn hơn đêm rõ rệt.',
        },
      ],
    },
    {
      heading: 'Chuyển động nhìn thấy của Mặt Trăng',
      blocks: [
        {
          type: 'p',
          text: 'Mặt Trăng tự nó không phát sáng, chỉ phản xạ ánh sáng Mặt Trời. Nửa quay về phía Mặt Trời luôn sáng, nhưng từ Trái Đất ta chỉ thấy một phần của nửa đó tuỳ vị trí của Mặt Trăng. Vì vậy ta thấy các pha.',
        },
        {
          type: 'table',
          caption: 'Các pha chính trong một chu kì khoảng $29{,}5$ ngày',
          head: ['Pha', 'Vị trí so với Mặt Trời nhìn từ Trái Đất', 'Khi nào thấy'],
          rows: [
            ['Trăng non (không trăng)', 'Cùng phía với Mặt Trời', 'Không thấy'],
            ['Bán nguyệt đầu tháng', 'Lệch $90^\\circ$ về phía Đông', 'Chiều và đầu đêm'],
            ['Trăng tròn', 'Đối diện Mặt Trời', 'Suốt đêm'],
            ['Bán nguyệt cuối tháng', 'Lệch $90^\\circ$ về phía Tây', 'Nửa cuối đêm và sáng'],
          ],
        },
        {
          type: 'p',
          text: 'So với các sao, Mặt Trăng đi về phía Đông mỗi ngày khoảng $13^\\circ$, nhanh hơn Mặt Trời nhiều. Do đó mỗi ngày Mặt Trăng mọc muộn hơn khoảng $50$ phút. Chu kì tự quay của Mặt Trăng bằng chu kì quay quanh Trái Đất, nên nó luôn hướng một mặt về Trái Đất.',
        },
      ],
    },
    {
      heading: 'Kim tinh, Thuỷ tinh và các hành tinh khác',
      blocks: [
        {
          type: 'p',
          text: 'Quỹ đạo của Kim tinh và Thuỷ tinh nằm bên trong quỹ đạo Trái Đất, nên nhìn từ Trái Đất chúng không bao giờ ra xa Mặt Trời. Góc lệch lớn nhất, khi đường nhìn từ Trái Đất tiếp xúc quỹ đạo của hành tinh, là khoảng $46^\\circ$ với Kim tinh. Với Thuỷ tinh, quỹ đạo tròn cho khoảng $23^\\circ$, còn thực tế quỹ đạo khá dẹt nên góc này từ khoảng $18^\\circ$ đến $28^\\circ$.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Sao Hôm và Sao Mai là một',
          text: 'Khi Kim tinh ở phía Đông Mặt Trời, nó lặn sau Mặt Trời, nên ta thấy nó trên trời phía Tây lúc chiều tối và gọi là Sao Hôm. Khi Kim tinh ở phía Tây Mặt Trời, nó mọc trước Mặt Trời, nên ta thấy nó trên trời phía Đông lúc rạng sáng và gọi là Sao Mai.',
        },
        {
          type: 'p',
          text: 'Hoả tinh, Mộc tinh, Thổ tinh có quỹ đạo bên ngoài Trái Đất, nên có thể ở đối diện Mặt Trời và thấy suốt đêm. Thường chúng đi về phía Đông giữa các sao, nhưng có lúc dừng lại, đi giật lùi về phía Tây, rồi lại đi tiếp. Đường đi trên nền sao khi đó tạo thành chuyển động vòng nút.',
        },
        {
          type: 'p',
          text: 'Chọn Hoả tinh ở phần Khám phá, đặt nền sao đứng yên và tua thời gian để thấy vòng nút xuất hiện đúng lúc Trái Đất vượt qua Hoả tinh ở quỹ đạo trong, giống như từ ô tô chạy nhanh hơn, ta thấy xe chạy chậm phía trước lùi dần lại.',
        },
      ],
    },
    {
      heading: 'Mô hình địa tâm và mô hình nhật tâm',
      blocks: [
        {
          type: 'table',
          head: ['Nội dung', 'Mô hình địa tâm (Ptolemy)', 'Mô hình nhật tâm (Copernicus)'],
          rows: [
            ['Tâm của hệ', 'Trái Đất đứng yên', 'Mặt Trời'],
            ['Trái Đất', 'Không chuyển động', 'Vừa tự quay vừa quay quanh Mặt Trời'],
            ['Mặt Trăng', 'Quay quanh Trái Đất', 'Quay quanh Trái Đất'],
            [
              'Các sao',
              'Gắn trên thiên cầu, quay quanh Trái Đất',
              'Rất xa, đứng yên trên thiên cầu',
            ],
            [
              'Giải thích vòng nút',
              'Hành tinh đi trên vòng tròn nhỏ (nội luân), tâm của nó đi trên vòng tròn lớn (ngoại luân)',
              'Do Trái Đất vượt qua hành tinh',
            ],
          ],
        },
        {
          type: 'p',
          text: 'Mô hình của Copernicus gồm $6$ hành tinh và quỹ đạo tròn. Ngày nay ta biết hệ Mặt Trời có $8$ hành tinh, quỹ đạo là các elip gần tròn. Mặc dù vậy, mô hình nhật tâm đã giải thích một cách đơn giản và thống nhất các đặc điểm kể trên.',
        },
      ],
    },
    {
      heading: 'Dự án: Nhật kí bầu trời hai tuần',
      project: true,
      blocks: [
        {
          type: 'p',
          text: 'Mục tiêu: tự ghi nhận chuyển động nhìn thấy của Mặt Trời và Mặt Trăng bằng quan sát, rồi giải thích bằng mô hình nhật tâm. Dụng cụ: một que thẳng dài khoảng $1$ m, thước dây, la bàn hoặc điện thoại, sổ ghi, một đèn và một quả bóng nhỏ để làm mô hình.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Cắm que thẳng đứng ở nơi có nắng. Vào gần trưa, cứ $15$ phút đo bóng que một lần, tìm bóng ngắn nhất. Từ độ dài bóng tính độ cao Mặt Trời giữa trưa.',
            'Lặp lại trong ít nhất $3$ ngày, cách nhau vài ngày. So sánh với công thức $h = 90^\\circ - |\\varphi - \\delta|$ khi tra được $\\delta$.',
            'Mỗi tối, vào cùng một giờ, vẽ hình dạng Mặt Trăng và ghi vị trí của nó so với một mốc cố định, trong khoảng hai tuần.',
            'Trong phòng tối, dùng đèn làm Mặt Trời, quả bóng làm Mặt Trăng, đầu mình là Trái Đất; xoay người để tái hiện các pha đã vẽ.',
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Báo cáo',
          text: 'Nộp bảng số liệu bóng que, hình các pha Mặt Trăng theo ngày và một trang giải thích: vì sao độ cao Mặt Trời giữa trưa thay đổi, vì sao các pha theo thứ tự đó. Không nhìn trực tiếp vào Mặt Trời.',
        },
      ],
    },
  ],
  explore: {
    title: 'Bầu trời tua nhanh theo ngày tháng',
    instruction:
      'Tua nhanh thời gian và theo dõi dải hoàng đạo phía trên: đó là những gì nhìn thấy từ Trái Đất, ứng với mô hình nhật tâm phía dưới. Chọn một hành tinh, đổi khung nhìn, và nhận xét xem nó có thể ra xa Mặt Trời đến đâu.',
  },
  examples: [
    {
      problem:
        'Tính độ cao giữa trưa của Mặt Trời ở Hà Nội ($\\varphi = 21^\\circ$) vào ngày xuân phân, hạ chí và đông chí. Ngày nào Mặt Trời ở phía Bắc đỉnh đầu?',
      steps: [
        'Xuân phân $\\delta = 0^\\circ$: $h = 90^\\circ - 21^\\circ = 69^\\circ$, ở phía Nam đỉnh đầu.',
        'Hạ chí $\\delta = 23{,}5^\\circ$: $h = 90^\\circ - |21^\\circ - 23{,}5^\\circ| = 87{,}5^\\circ$. Vì $\\delta > \\varphi$ nên Mặt Trời ở phía Bắc đỉnh đầu.',
        'Đông chí $\\delta = -23{,}5^\\circ$: $h = 90^\\circ - 44{,}5^\\circ = 45{,}5^\\circ$, ở phía Nam đỉnh đầu.',
      ],
      answer:
        'Lần lượt $69^\\circ$, $87{,}5^\\circ$, $45{,}5^\\circ$; chỉ vào hạ chí Mặt Trời ở phía Bắc đỉnh đầu.',
    },
    {
      problem:
        'Coi quỹ đạo Kim tinh là đường tròn bán kính $0{,}72$ AU, quỹ đạo Trái Đất là đường tròn bán kính $1$ AU. Tính góc lệch lớn nhất giữa Kim tinh và Mặt Trời khi nhìn từ Trái Đất.',
      steps: [
        'Góc lệch lớn nhất khi đường nhìn từ Trái Đất đến Kim tinh tiếp xúc với quỹ đạo Kim tinh.',
        'Khi đó tam giác Mặt Trời, Kim tinh, Trái Đất vuông tại Kim tinh, với cạnh huyền là khoảng cách $1$ AU.',
        '$\\sin\\theta = \\dfrac{0{,}72}{1}$, nên $\\theta \\approx 46^\\circ$.',
      ],
      answer: 'Khoảng $46^\\circ$. Vì vậy Kim tinh không bao giờ ở đối diện Mặt Trời.',
    },
    {
      problem:
        'Hôm nay là trăng tròn, Mặt Trăng mọc lúc khoảng $18$ giờ. Khoảng bao nhiêu ngày sau, Mặt Trăng mọc lúc khoảng nửa đêm, và lúc đó trăng ở pha nào?',
      steps: [
        'Mỗi ngày Mặt Trăng mọc muộn hơn khoảng $\\dfrac{24\\ \\text{giờ}}{29{,}5} \\approx 49$ phút, tức gần $50$ phút.',
        'Từ $18$ giờ đến nửa đêm là muộn thêm $6$ giờ, cần khoảng $\\dfrac{360\\ \\text{phút}}{49\\ \\text{phút}} \\approx 7{,}4$ ngày, tức khoảng một phần tư chu kì.',
        'Từ trăng tròn, sau một phần tư chu kì là trăng bán nguyệt cuối tháng.',
      ],
      answer: 'Sau khoảng $7$ ngày, trăng ở pha bán nguyệt cuối tháng.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Vì sao mỗi ngày ta thấy Mặt Trời mọc ở phía Đông và lặn ở phía Tây?',
      options: [
        'Vì Trái Đất tự quay từ Tây sang Đông',
        'Vì Trái Đất tự quay từ Đông sang Tây',
        'Vì Mặt Trời quay quanh Trái Đất trong $24$ giờ',
        'Vì Trái Đất quay quanh Mặt Trời trong $24$ giờ',
      ],
      answer: 0,
      hints: ['Chuyển động nhìn thấy của Mặt Trời ngược với chiều quay của người quan sát.'],
      solution:
        'Trái Đất tự quay từ Tây sang Đông nên người trên mặt đất thấy Mặt Trời đi từ Đông sang Tây.',
    },
    {
      type: 'choice',
      prompt: 'Hoàng đạo là gì?',
      options: [
        'Đường đi nhìn thấy của Mặt Trời trên nền trời sao trong một năm',
        'Đường đi của Mặt Trăng quanh Trái Đất',
        'Đường xích đạo của Trái Đất',
        'Vòng tròn đi qua thiên cực Bắc và thiên cực Nam',
      ],
      answer: 0,
      hints: ['Tên chòm sao hoàng đạo gợi đến những chòm mà Mặt Trời lần lượt đi qua.'],
      solution: 'Hoàng đạo là đường đi nhìn thấy của Mặt Trời trên nền trời sao trong một năm.',
    },
    {
      type: 'number',
      prompt:
        'Trên nền trời sao, Mặt Trời đi hết một vòng hoàng đạo trong khoảng $365$ ngày. Mỗi ngày Mặt Trời dịch đi khoảng bao nhiêu độ?',
      answer: 0.99,
      tolerance: 0.02,
      unit: '°',
      hints: ['Một vòng là $360^\\circ$.'],
      solution:
        'Mỗi ngày dịch $\\dfrac{360^\\circ}{365} \\approx 0{,}99^\\circ$, tức khoảng $1^\\circ$.',
    },
    {
      type: 'number',
      prompt:
        'Tính độ cao giữa trưa của Mặt Trời vào ngày đông chí ($\\delta = -23{,}5^\\circ$) ở Thành phố Hồ Chí Minh ($\\varphi = 10{,}8^\\circ$).',
      answer: 55.7,
      tolerance: 0.1,
      unit: '°',
      hints: ['Dùng $h = 90^\\circ - |\\varphi - \\delta|$.', 'Chú ý $\\delta$ âm.'],
      solution:
        '$h = 90^\\circ - |10{,}8^\\circ + 23{,}5^\\circ| = 90^\\circ - 34{,}3^\\circ = 55{,}7^\\circ$.',
    },
    {
      type: 'multi',
      prompt: 'Ở Hà Nội, những phát biểu nào về Mặt Trời là đúng?',
      options: [
        'Vào xuân phân và thu phân, Mặt Trời mọc đúng hướng Đông',
        'Vào mùa hè, Mặt Trời mọc lệch về phía Bắc so với hướng Đông',
        'Hằng ngày, Mặt Trời luôn mọc đúng hướng Đông',
        'Giữa trưa, Mặt Trời luôn ở đúng đỉnh đầu',
        'Vào mùa đông, ngày ngắn hơn đêm',
      ],
      answers: [0, 1, 4],
      hints: ['Thử kéo ngày trên sơ đồ đường đi của Mặt Trời ở vĩ độ $21^\\circ$.'],
      solution:
        'Mặt Trời chỉ mọc đúng Đông vào xuân phân, thu phân; mùa hè mọc lệch Bắc; mùa đông ngày ngắn hơn đêm. Giữa trưa Mặt Trời chỉ qua đỉnh đầu vào đúng hai ngày trong năm.',
    },
    {
      type: 'order',
      prompt: 'Sắp xếp các pha của Mặt Trăng theo thứ tự thời gian, bắt đầu từ trăng non.',
      items: [
        'Trăng non',
        'Trăng lưỡi liềm đầu tháng',
        'Trăng bán nguyệt đầu tháng',
        'Trăng tròn',
        'Trăng bán nguyệt cuối tháng',
      ],
      answer: [0, 1, 2, 3, 4],
      hints: ['Từ trăng non, phần sáng lớn dần tới trăng tròn, rồi nhỏ dần.'],
      solution:
        'Trăng non, lưỡi liềm đầu tháng, bán nguyệt đầu tháng, trăng tròn, bán nguyệt cuối tháng, rồi lưỡi liềm cuối tháng và lại trăng non.',
    },
    {
      type: 'choice',
      prompt: 'Vì sao từ Trái Đất ta luôn thấy một mặt của Mặt Trăng?',
      options: [
        'Vì chu kì tự quay của Mặt Trăng bằng chu kì quay quanh Trái Đất',
        'Vì Mặt Trăng không tự quay',
        'Vì Trái Đất che khuất mặt còn lại',
        'Vì mặt còn lại không được chiếu sáng',
      ],
      answer: 0,
      hints: ['Hãy đi vòng quanh một cái bàn và luôn nhìn vào bàn: em có xoay người không?'],
      solution:
        'Hai chu kì bằng nhau nên Mặt Trăng luôn hướng một mặt về Trái Đất. Nếu không tự quay, ta sẽ lần lượt thấy các mặt của nó. Mặt còn lại vẫn được Mặt Trời chiếu sáng vào lúc trăng non.',
    },
    {
      type: 'number',
      prompt:
        'Thuỷ tinh có bán kính quỹ đạo $0{,}39$ AU. Coi quỹ đạo là đường tròn, tính góc lệch lớn nhất của Thuỷ tinh với Mặt Trời khi nhìn từ Trái Đất (làm tròn đến độ).',
      answer: 23,
      tolerance: 1,
      unit: '°',
      hints: [
        'Đường nhìn từ Trái Đất tiếp xúc với quỹ đạo Thuỷ tinh.',
        'Dùng $\\sin\\theta = \\dfrac{r}{1\\ \\text{AU}}$.',
      ],
      solution: '$\\sin\\theta = 0{,}39$, nên $\\theta \\approx 23^\\circ$.',
    },
    {
      type: 'choice',
      prompt:
        'Chiều tối, em thấy một "ngôi sao" rất sáng trên trời phía Tây, đó là Kim tinh. Kim tinh đang ở đâu so với Mặt Trời?',
      options: [
        'Ở phía Đông Mặt Trời, được gọi là Sao Hôm',
        'Ở phía Tây Mặt Trời, được gọi là Sao Hôm',
        'Ở phía Đông Mặt Trời, được gọi là Sao Mai',
        'Ở phía đối diện với Mặt Trời',
      ],
      answer: 0,
      hints: [
        'Mặt Trời vừa lặn ở phía Tây mà Kim tinh vẫn còn trên trời. Nó lặn trước hay sau Mặt Trời?',
      ],
      solution:
        'Kim tinh lặn sau Mặt Trời nên phải ở phía Đông Mặt Trời trên bầu trời, và được gọi là Sao Hôm. Kim tinh không bao giờ ở đối diện Mặt Trời, vì góc lệch lớn nhất khoảng $46^\\circ$.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi mô hình với nội dung tương ứng.',
      left: [
        'Mô hình địa tâm của Ptolemy',
        'Mô hình nhật tâm của Copernicus',
        'Hiểu biết ngày nay',
      ],
      right: [
        'Trái Đất đứng yên ở trung tâm, hành tinh đi trên nội luân và ngoại luân',
        'Mặt Trời ở trung tâm, $6$ hành tinh đi trên quỹ đạo tròn',
        'Hệ Mặt Trời có $8$ hành tinh, quỹ đạo là các elip gần tròn',
      ],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
      hints: ['"Địa" là đất, "nhật" là Mặt Trời.'],
      solution:
        'Ptolemy đặt Trái Đất đứng yên ở trung tâm và dùng nội luân, ngoại luân để giải thích vòng nút. Copernicus đặt Mặt Trời ở trung tâm, với $6$ hành tinh trên quỹ đạo tròn. Ngày nay ta biết có $8$ hành tinh, quỹ đạo là các elip gần tròn.',
    },
    {
      type: 'choice',
      prompt: 'Mô hình nhật tâm giải thích chuyển động vòng nút của Hoả tinh như thế nào?',
      options: [
        'Trái Đất ở quỹ đạo trong, đi nhanh hơn và vượt qua Hoả tinh',
        'Hoả tinh thật sự đổi chiều chuyển động quanh Mặt Trời',
        'Hoả tinh quay trên một vòng tròn nhỏ quanh Trái Đất',
        'Mặt Trăng kéo Hoả tinh lùi lại',
      ],
      answer: 0,
      hints: ['Hình dung ô tô em ngồi vượt qua một xe chạy chậm hơn.'],
      solution:
        'Hoả tinh luôn đi cùng một chiều quanh Mặt Trời. Khi Trái Đất ở quỹ đạo trong đi nhanh hơn và vượt qua, ta thấy Hoả tinh như đi giật lùi trên nền sao.',
    },
  ],
  takeaways: [
    'Trong ngày, Mặt Trời đi từ Đông sang Tây do Trái Đất tự quay; trong năm, nó đi trên hoàng đạo về phía Đông, mỗi ngày khoảng $1^\\circ$.',
    'Mặt Trời chỉ mọc đúng Đông, lặn đúng Tây vào xuân phân và thu phân; độ cao giữa trưa là $h = 90^\\circ - |\\varphi - \\delta|$.',
    'Mặt Trăng có các pha theo chu kì khoảng $29{,}5$ ngày, mọc muộn dần khoảng $50$ phút mỗi ngày và luôn hướng một mặt về Trái Đất.',
    'Kim tinh và Thuỷ tinh luôn ở gần Mặt Trời; Kim tinh chính là Sao Hôm và Sao Mai.',
    'Vòng nút của hành tinh xảy ra khi Trái Đất vượt qua hành tinh; mô hình nhật tâm giải thích được các đặc điểm này.',
  ],
};
