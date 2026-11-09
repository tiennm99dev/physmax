/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Nhật thực xảy ra lúc trăng non, nguyệt thực lúc trăng tròn, khi Mặt Trời, Trái Đất, Mặt Trăng gần thẳng hàng; thuỷ triều do lực hấp dẫn của Mặt Trăng và Mặt Trời, với triều cường và triều kém theo tuần trăng.',
  intro:
    'Giữa ban ngày, trời bỗng tối như đêm, gà lên chuồng; rồi một đêm trăng rằm, Mặt Trăng dần chuyển màu đỏ sậm. Người xưa coi đó là điềm lạ, còn ngày nay ta tính trước được từng phút. Cũng Mặt Trăng và Mặt Trời ấy, bằng lực hấp dẫn, làm nước biển dâng rút mỗi ngày. Vì sao có những hiện tượng này, và vì sao không phải tháng nào cũng có nhật thực?',
  objectives: [
    'Giải thích được định tính hiện tượng nhật thực, nguyệt thực và nêu được điều kiện xảy ra.',
    'Phân biệt được nhật thực toàn phần, một phần, hình khuyên; nguyệt thực toàn phần, một phần.',
    'Giải thích được định tính hiện tượng thuỷ triều do lực hấp dẫn của Mặt Trăng và Mặt Trời.',
    'Nêu được khi nào có triều cường, triều kém.',
    'Thiết kế được mô hình đơn giản về nhật thực, nguyệt thực.',
  ],
  sections: [
    {
      heading: 'Điều kiện xảy ra nhật thực, nguyệt thực',
      blocks: [
        {
          type: 'p',
          text: 'Trái Đất đi quanh Mặt Trời trong mặt phẳng hoàng đạo. Mặt Trăng đi quanh Trái Đất trong mặt phẳng bạch đạo, nghiêng với mặt phẳng hoàng đạo một góc khoảng $5^\\circ$. Hai mặt phẳng này cắt nhau theo một đường thẳng, gọi là đường nút.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Điều kiện',
          text: 'Nhật thực, nguyệt thực chỉ xảy ra khi Mặt Trời, Trái Đất, Mặt Trăng gần như thẳng hàng. Muốn vậy cần đồng thời hai điều: Mặt Trăng ở pha trăng non (nhật thực) hoặc trăng tròn (nguyệt thực), và Mặt Trời ở gần đường nút.',
        },
        {
          type: 'p',
          text: 'Nếu hai mặt phẳng trùng nhau thì tháng nào cũng có. Vì chúng lệch nhau khoảng $5^\\circ$, nên ở phần lớn các tháng, Mặt Trăng đi cao hơn hoặc thấp hơn đường thẳng nối Mặt Trời và Trái Đất, bóng của nó không đến Trái Đất, và nó cũng không đi vào bóng của Trái Đất.',
        },
        {
          type: 'p',
          text: 'Trong một năm, Mặt Trời đi qua đường nút hai lần, nên nhật thực, nguyệt thực xảy ra theo từng "mùa thực". Trong một năm có từ $2$ đến $5$ lần nhật thực.',
        },
      ],
    },
    {
      heading: 'Nhật thực',
      blocks: [
        {
          type: 'p',
          text: 'Nhật thực xảy ra khi Mặt Trăng ở giữa Mặt Trời và Trái Đất, Mặt Trăng là vật chắn sáng. Phía sau Mặt Trăng có vùng bóng tối, bao quanh là vùng bóng nửa tối.',
        },
        {
          type: 'table',
          head: ['Loại', 'Xảy ra khi', 'Người quan sát thấy'],
          rows: [
            [
              'Nhật thực toàn phần',
              'Ở trong vùng bóng tối của Mặt Trăng',
              'Đĩa Mặt Trời bị che kín, trời tối như đêm trong vài phút',
            ],
            [
              'Nhật thực hình khuyên',
              'Mặt Trăng ở xa, vùng bóng tối không chạm tới Trái Đất',
              'Một vòng sáng bao quanh đĩa Mặt Trăng',
            ],
            ['Nhật thực một phần', 'Ở trong vùng bóng nửa tối', 'Một phần đĩa Mặt Trời bị che'],
          ],
        },
        {
          type: 'p',
          text: 'Đường kính Mặt Trời lớn hơn đường kính Mặt Trăng khoảng $400$ lần, nhưng Mặt Trời cũng ở xa hơn Mặt Trăng khoảng $400$ lần. Vì thế, nhìn từ Trái Đất, hai đĩa trông lớn gần bằng nhau. Quỹ đạo Mặt Trăng là elip, nên khi Mặt Trăng ở gần, đĩa của nó che kín Mặt Trời; khi ở xa, đĩa nhỏ hơn và để lộ vòng sáng.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'An toàn',
          text: 'Không nhìn Mặt Trời bằng mắt thường hoặc qua kính râm, kể cả khi có nhật thực một phần. Chỉ quan sát qua kính chuyên dụng có lọc đạt chuẩn, hoặc qua hình chiếu lên một tờ giấy.',
        },
      ],
    },
    {
      heading: 'Nguyệt thực',
      blocks: [
        {
          type: 'p',
          text: 'Nguyệt thực xảy ra khi Trái Đất ở giữa Mặt Trời và Mặt Trăng, Mặt Trăng đi vào vùng bóng của Trái Đất. Theo thứ tự, trăng đi qua vùng nửa tối (hơi mờ đi), vào vùng bóng tối một phần (nguyệt thực một phần), rồi có thể nằm trọn trong vùng bóng tối (nguyệt thực toàn phần).',
        },
        {
          type: 'p',
          text: 'Khi nguyệt thực toàn phần, Mặt Trăng không tối hẳn mà có màu đỏ sậm, vì một phần ánh sáng đỏ của Mặt Trời bị khí quyển Trái Đất làm lệch và đến được Mặt Trăng.',
        },
        {
          type: 'table',
          head: ['Tiêu chí', 'Nhật thực', 'Nguyệt thực'],
          rows: [
            ['Pha của Mặt Trăng', 'Trăng non', 'Trăng tròn'],
            ['Thiên thể ở giữa', 'Mặt Trăng', 'Trái Đất'],
            ['Vùng quan sát', 'Dải hẹp trên Trái Đất', 'Cả nửa Trái Đất đang là đêm'],
            ['Thời gian toàn phần dài nhất', 'Khoảng $7$ phút', 'Khoảng $1$ giờ $40$ phút'],
          ],
        },
        {
          type: 'p',
          text: 'Nguyệt thực kéo dài hơn và thấy được ở nhiều nơi hơn nhật thực vì Trái Đất lớn hơn Mặt Trăng, nên bóng của Trái Đất cũng lớn hơn hẳn Mặt Trăng.',
        },
      ],
    },
    {
      heading: 'Thuỷ triều',
      blocks: [
        {
          type: 'p',
          text: 'Mặt Trăng hút mọi phần của Trái Đất, nhưng phần gần hút mạnh hơn phần xa. Nước ở phía gần Mặt Trăng bị hút mạnh hơn phần đất ở tâm nên phồng về phía Mặt Trăng; nước ở phía xa bị hút yếu hơn phần tâm nên như bị bỏ lại, cũng phồng lên, theo chiều ngược lại. Do đó có hai chỗ phồng ở hai phía đối diện.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Thuỷ triều',
          text: 'Thuỷ triều là hiện tượng nước biển dâng lên và rút xuống theo chu kì, chủ yếu do lực hấp dẫn của Mặt Trăng và của Mặt Trời tác dụng lên Trái Đất và lớp nước. Trái Đất tự quay nên một nơi trên bờ biển lần lượt đi qua các chỗ phồng và chỗ lõm của nước.',
        },
        {
          type: 'p',
          text: 'Mặt Trăng đi về phía Đông trong lúc Trái Đất tự quay, nên hai lần Mặt Trăng lên cao nhất cách nhau khoảng $24$ giờ $50$ phút. Trong khoảng thời gian đó, về lý tưởng có hai lần nước lớn và hai lần nước ròng. Trên thực tế, đường bờ và đáy biển làm khác đi: Hòn Dấu ở Hải Phòng có chế độ nhật triều, mỗi ngày chỉ một lần nước lên, một lần nước xuống.',
        },
        {
          type: 'p',
          text: 'Lực hút của Mặt Trời lên Trái Đất lớn hơn của Mặt Trăng nhiều, nhưng Mặt Trời ở rất xa, nên chênh lệch lực hút giữa hai phía Trái Đất lại nhỏ hơn. Vì thế, triều do Mặt Trời chỉ cao khoảng $0{,}46$ lần triều do Mặt Trăng.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Triều cường và triều kém',
          text: 'Triều cường xảy ra lúc trăng non và trăng tròn: Mặt Trời, Trái Đất, Mặt Trăng gần thẳng hàng, tác dụng của Mặt Trời và Mặt Trăng cộng lại. Triều kém xảy ra lúc trăng bán nguyệt: hướng Mặt Trời vuông góc với hướng Mặt Trăng, tác dụng của hai thiên thể làm yếu nhau. Thực tế triều cường thường đến chậm một, hai ngày sau đó.',
        },
        { type: 'widget', name: 'thuy-trieu' },
        {
          type: 'p',
          text: 'Theo âm lịch, trăng non vào khoảng mùng một, trăng tròn vào khoảng rằm, nên triều cường vào các ngày đó; triều kém vào khoảng mùng tám và hai mươi ba. Người đi biển, đánh cá, làm muối, vận hành cảng, làm công trình ven biển đều phải xem lịch thuỷ triều.',
        },
      ],
    },
    {
      heading: 'Dự án: Mô hình nhật thực, nguyệt thực',
      project: true,
      blocks: [
        {
          type: 'p',
          text: 'Mục tiêu: dùng mô hình để tái hiện và giải thích nhật thực, nguyệt thực. Dụng cụ: đèn pin (làm Mặt Trời), quả bóng đá (làm Trái Đất), quả bóng tennis (làm Mặt Trăng), giá đỡ, thước dây, phòng tối.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Đặt đèn pin và quả bóng đá cách nhau vài mét. Chiếu đèn vào quả bóng đá, cao ngang tâm bóng.',
            'Đặt quả bóng tennis giữa đèn và quả bóng đá. Tìm vùng tối và vùng nửa tối trên quả bóng đá. Thay đổi khoảng cách giữa quả tennis và quả bóng đá để thấy vùng tối to nhỏ thế nào.',
            'Đặt quả tennis ở phía sau quả bóng đá. Dịch đều quả tennis qua bóng của quả bóng đá và đo thời gian nó đi hết vùng bóng, rồi so sánh độ rộng vùng bóng này với vùng tối trên quả bóng đá ở bước trước.',
            'Nâng quả tennis cao hơn đường thẳng nối đèn và quả bóng đá, để chỉ ra vì sao không phải tháng nào cũng có nhật thực.',
            'Tra lịch của lần nhật thực hoặc nguyệt thực tiếp theo thấy được ở Việt Nam, lập kế hoạch quan sát an toàn.',
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Báo cáo',
          text: 'Nộp ảnh chụp các vị trí đã tái hiện, kèm chú thích: thiên thể nào ở giữa, người ở đâu thấy loại nhật thực hoặc nguyệt thực gì. Nêu một điểm mô hình chưa đúng tỉ lệ so với thực tế và ảnh hưởng của nó.',
        },
      ],
    },
  ],
  explore: {
    title: 'Kéo Mặt Trăng trên quỹ đạo',
    instruction:
      'Kéo Mặt Trăng (hoặc dùng phím mũi tên) đến vị trí trăng non hay trăng tròn. Quan sát: có khi thẳng hàng trên hình mà vẫn không có nhật thực. Thay đổi góc giữa Mặt Trời và đường nút, rồi đổi khoảng cách Mặt Trăng, để tạo đủ các loại nhật thực và nguyệt thực.',
  },
  examples: [
    {
      problem:
        'Mặt Trời có bán kính $R = 696\\,000$ km, Mặt Trăng có bán kính $r = 1\\,737$ km, Mặt Trăng cách Mặt Trời $d = 149\\,600\\,000$ km. Tính chiều dài vùng bóng tối của Mặt Trăng và cho biết khi Mặt Trăng cách mặt đất khoảng $378\\,000$ km thì có thể có nhật thực toàn phần không.',
      steps: [
        'Theo tam giác đồng dạng, bóng tối dài $L$ với $\\dfrac{L}{r} = \\dfrac{L + d}{R}$.',
        'Suy ra $L = \\dfrac{d\\,r}{R - r} = \\dfrac{149\\,600\\,000 \\cdot 1\\,737}{696\\,000 - 1\\,737} \\approx 374\\,000$ km.',
        'Vì $374\\,000$ km $< 378\\,000$ km, nên đỉnh vùng bóng tối không chạm tới mặt đất.',
      ],
      answer:
        'Bóng tối dài khoảng $374\\,000$ km, không chạm mặt đất, nên chỉ có nhật thực hình khuyên hoặc một phần. Khi Mặt Trăng ở gần hơn, sẽ có nhật thực toàn phần.',
    },
    {
      problem:
        'Vùng bóng tối của Trái Đất tại quỹ đạo Mặt Trăng rộng khoảng $9\\,200$ km, Mặt Trăng có đường kính khoảng $3\\,474$ km và đi với tốc độ khoảng $1$ km/s. Ước lượng thời gian dài nhất của nguyệt thực toàn phần.',
      steps: [
        'Toàn phần bắt đầu khi mép sau của Mặt Trăng vừa vào vùng bóng, và kết thúc khi mép trước của nó tới mép bên kia của vùng bóng.',
        'Quãng đường tâm Mặt Trăng đi trong lúc đó: $9\\,200 - 3\\,474 = 5\\,726$ km.',
        'Thời gian: $t = \\dfrac{5\\,726\\ \\text{km}}{1\\ \\text{km/s}} = 5\\,726\\ \\text{s} \\approx 95$ phút.',
      ],
      answer:
        'Khoảng $95$ phút, phù hợp với giới hạn thực tế cỡ $1$ giờ $40$ phút; lớn hơn hẳn vài phút của nhật thực toàn phần.',
    },
    {
      problem:
        'Biết khối lượng Mặt Trời gấp khoảng $2{,}7 \\cdot 10^7$ lần khối lượng Mặt Trăng; khoảng cách đến Mặt Trời gấp $390$ lần khoảng cách đến Mặt Trăng. Lực hút của Mặt Trời lên một vật ở Trái Đất gấp bao nhiêu lần của Mặt Trăng? Vì sao triều do Mặt Trời lại thấp hơn?',
      steps: [
        'Theo định luật vạn vật hấp dẫn, $F \\sim \\dfrac{M}{d^2}$, nên $\\dfrac{F_{\\text{Mặt Trời}}}{F_{\\text{Mặt Trăng}}} = \\dfrac{2{,}7 \\cdot 10^7}{390^2} \\approx 178$.',
        'Thuỷ triều phụ thuộc vào chênh lệch lực hút giữa hai phía của Trái Đất, mà chênh lệch này tỉ lệ với $\\dfrac{M}{d^3}$.',
        '$\\dfrac{2{,}7 \\cdot 10^7}{390^3} \\approx 0{,}46$, nên triều do Mặt Trời chỉ cao khoảng $0{,}46$ lần triều do Mặt Trăng.',
      ],
      answer:
        'Lực hút của Mặt Trời gấp khoảng $178$ lần, nhưng tác dụng tạo triều chỉ bằng khoảng $0{,}46$ lần, vì Mặt Trời ở rất xa.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Nhật thực xảy ra khi nào?',
      options: [
        'Mặt Trăng ở giữa Mặt Trời và Trái Đất, gần như thẳng hàng',
        'Trái Đất ở giữa Mặt Trời và Mặt Trăng, gần như thẳng hàng',
        'Mặt Trời ở giữa Trái Đất và Mặt Trăng',
        'Mỗi khi có trăng tròn',
      ],
      answer: 0,
      hints: ['"Nhật" là Mặt Trời: điều gì đang che Mặt Trời?'],
      solution:
        'Mặt Trăng ở giữa, che đĩa Mặt Trời đối với một vùng trên Trái Đất. Đó phải là lúc trăng non.',
    },
    {
      type: 'choice',
      prompt: 'Vì sao không phải tháng nào cũng có nhật thực và nguyệt thực?',
      options: [
        'Vì mặt phẳng quỹ đạo Mặt Trăng nghiêng khoảng $5^\\circ$ so với mặt phẳng hoàng đạo',
        'Vì có tháng không có trăng non hoặc trăng tròn',
        'Vì khoảng cách từ Mặt Trăng tới Trái Đất quá lớn',
        'Vì Mặt Trăng tự quay quanh mình nó',
      ],
      answer: 0,
      hints: ['Ở phần Khám phá, trăng non có lúc không tạo ra nhật thực. Mặt Trăng ở đâu lúc đó?'],
      solution:
        'Hai mặt phẳng lệch nhau khoảng $5^\\circ$, nên phần lớn các tháng, lúc trăng non hay trăng tròn, Mặt Trăng ở cao hơn hoặc thấp hơn mặt phẳng hoàng đạo và không che được Mặt Trời hay đi vào bóng của Trái Đất.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi hiện tượng với cách giải thích.',
      left: [
        'Nhật thực toàn phần',
        'Nhật thực hình khuyên',
        'Nhật thực một phần',
        'Nguyệt thực toàn phần',
      ],
      right: [
        'Người quan sát ở trong vùng bóng tối của Mặt Trăng',
        'Mặt Trăng ở xa, đĩa của nó nhỏ hơn đĩa Mặt Trời',
        'Người quan sát ở trong vùng bóng nửa tối của Mặt Trăng',
        'Mặt Trăng nằm trọn trong vùng bóng tối của Trái Đất',
        'Mặt Trăng nằm giữa Trái Đất và Hoả tinh',
      ],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: [
        'Nhật thực liên quan đến bóng của Mặt Trăng, nguyệt thực liên quan đến bóng của Trái Đất.',
      ],
      solution:
        'Toàn phần: trong vùng bóng tối của Mặt Trăng. Hình khuyên: Mặt Trăng ở xa. Một phần: trong vùng bóng nửa tối. Nguyệt thực toàn phần: Mặt Trăng nằm trọn trong bóng tối của Trái Đất.',
    },
    {
      type: 'choice',
      prompt: 'Vì sao thời gian nguyệt thực dài hơn thời gian nhật thực?',
      options: [
        'Vì Trái Đất lớn hơn Mặt Trăng nên bóng của Trái Đất che Mặt Trăng lâu hơn',
        'Vì Mặt Trăng đứng yên khi có nguyệt thực',
        'Vì Mặt Trời ở xa Mặt Trăng hơn Trái Đất',
        'Vì nguyệt thực chỉ xảy ra vào ban đêm',
      ],
      answer: 0,
      hints: ['So sánh kích thước của vùng bóng trong hai hiện tượng.'],
      solution:
        'Bóng của Trái Đất lớn hơn Mặt Trăng nhiều, nên Mặt Trăng mất nhiều thời gian để đi qua. Bóng tối của Mặt Trăng trên mặt đất chỉ rộng vài trăm kilômét.',
    },
    {
      type: 'number',
      prompt:
        'Đường kính Mặt Trời khoảng $1\\,392\\,000$ km, đường kính Mặt Trăng khoảng $3\\,474$ km. Đường kính Mặt Trời gấp khoảng bao nhiêu lần đường kính Mặt Trăng? (Làm tròn đến hàng đơn vị.)',
      answer: 401,
      tolerance: 1,
      hints: ['Lấy đường kính Mặt Trời chia cho đường kính Mặt Trăng.'],
      solution:
        '$\\dfrac{1\\,392\\,000}{3\\,474} \\approx 401$ lần. Khoảng cách từ Trái Đất đến Mặt Trời cũng gấp cỡ đó lần khoảng cách đến Mặt Trăng, nên hai đĩa trông lớn gần bằng nhau.',
    },
    {
      type: 'number',
      prompt:
        'Mặt Trời và Mặt Trăng tạo triều với độ cao tỉ lệ $0{,}46 : 1$. Khi triều cường, hai tác dụng cộng lại; khi triều kém, chúng trừ nhau. Biên độ triều cường gấp khoảng bao nhiêu lần biên độ triều kém?',
      answer: 2.7,
      tolerance: 0.05,
      hints: ['Tính $1 + 0{,}46$ và $1 - 0{,}46$.', 'Lập tỉ số của hai kết quả.'],
      solution: '$\\dfrac{1 + 0{,}46}{1 - 0{,}46} = \\dfrac{1{,}46}{0{,}54} \\approx 2{,}7$.',
    },
    {
      type: 'number',
      prompt:
        'Hai lần Mặt Trăng lên cao nhất ở một nơi cách nhau khoảng $24$ giờ $50$ phút. Với hai chỗ phồng đều nhau, hai lần nước lớn liên tiếp cách nhau khoảng bao nhiêu phút?',
      answer: 745,
      tolerance: 3,
      unit: 'phút',
      hints: ['Đổi thời gian ra phút.', 'Có hai lần nước lớn trong khoảng đó.'],
      solution:
        '$24$ giờ $50$ phút $= 1\\,490$ phút. Khoảng cách giữa hai lần nước lớn liên tiếp: $\\dfrac{1\\,490}{2} = 745$ phút, tức $12$ giờ $25$ phút.',
    },
    {
      type: 'choice',
      prompt: 'Những ngày nào trong tháng âm lịch thường có triều kém?',
      options: [
        'Khoảng mùng tám và hai mươi ba',
        'Mùng một và rằm',
        'Chỉ vào ngày rằm',
        'Mỗi ngày đều như nhau',
      ],
      answer: 0,
      hints: ['Triều kém xảy ra khi hướng Mặt Trời vuông góc với hướng Mặt Trăng.'],
      solution:
        'Lúc trăng bán nguyệt, vào khoảng mùng tám và hai mươi ba âm lịch, hướng Mặt Trời vuông góc với hướng Mặt Trăng, nên có triều kém. Mùng một và rằm có triều cường.',
    },
    {
      type: 'multi',
      prompt: 'Những phát biểu nào đúng về thuỷ triều?',
      options: [
        'Thuỷ triều chủ yếu do lực hấp dẫn của Mặt Trăng và Mặt Trời',
        'Nước phồng lên ở cả phía gần và phía xa Mặt Trăng',
        'Triều cường xảy ra lúc trăng non và trăng tròn',
        'Mặt Trời có tác dụng tạo triều mạnh hơn Mặt Trăng',
        'Thuỷ triều ở mọi bờ biển đều lên xuống đúng hai lần mỗi ngày',
      ],
      answers: [0, 1, 2],
      hints: [
        'Tác dụng tạo triều tỉ lệ với $\\dfrac{M}{d^3}$.',
        'Hãy nhớ chế độ nhật triều ở Hòn Dấu.',
      ],
      solution:
        'Ba phát biểu đầu là đúng. Tác dụng tạo triều của Mặt Trời chỉ bằng khoảng $0{,}46$ lần của Mặt Trăng. Chế độ triều còn phụ thuộc đường bờ và đáy biển, như Hòn Dấu có nhật triều.',
    },
    {
      type: 'number',
      prompt:
        'Trong "mùa thực", nhật thực có thể xảy ra khi Mặt Trời cách đường nút dưới khoảng $17^\\circ$ về mỗi phía. Mặt Trời dịch khoảng $1^\\circ$ mỗi ngày. Mùa thực này kéo dài khoảng bao nhiêu ngày?',
      answer: 34,
      tolerance: 1,
      unit: 'ngày',
      hints: ['Mặt Trời đi từ $17^\\circ$ về một phía sang $17^\\circ$ về phía kia.'],
      solution:
        'Mặt Trời đi $2 \\cdot 17^\\circ = 34^\\circ$, mất khoảng $34$ ngày. Vì dài hơn một chu kì tuần trăng ($29{,}5$ ngày), nên mỗi mùa thực luôn có ít nhất một lần trăng non, mỗi năm có ít nhất $2$ lần nhật thực.',
    },
    {
      type: 'order',
      prompt: 'Sắp xếp diễn biến của một lần nguyệt thực toàn phần theo thứ tự thời gian.',
      items: [
        'Mặt Trăng tròn đi vào vùng bóng nửa tối, hơi mờ đi',
        'Một phần Mặt Trăng đi vào vùng bóng tối',
        'Toàn bộ Mặt Trăng ở trong vùng bóng tối, có màu đỏ sậm',
        'Mặt Trăng dần ra khỏi vùng bóng tối',
      ],
      answer: [0, 1, 2, 3],
      hints: ['Vùng nửa tối bao quanh vùng bóng tối.'],
      solution:
        'Trăng đi qua vùng nửa tối, vào một phần vùng bóng tối, nằm trọn trong vùng bóng tối, rồi dần ra khỏi vùng bóng.',
    },
    {
      type: 'text',
      prompt: 'Nhật thực chỉ xảy ra vào pha nào của Mặt Trăng? (Điền tên pha.)',
      accept: ['trăng non', 'không trăng', 'trăng mới', 'sóc'],
      hints: ['Mặt Trăng phải ở cùng phía với Mặt Trời.'],
      solution:
        'Đó là pha trăng non: Mặt Trăng ở cùng phía với Mặt Trời, nửa tối hướng về Trái Đất.',
    },
  ],
  takeaways: [
    'Nhật thực, nguyệt thực xảy ra khi Mặt Trời, Trái Đất, Mặt Trăng gần thẳng hàng, nên chỉ có vào trăng non hoặc trăng tròn và khi Mặt Trời ở gần đường nút.',
    'Mặt phẳng quỹ đạo Mặt Trăng nghiêng khoảng $5^\\circ$ so với mặt phẳng hoàng đạo, nên không phải tháng nào cũng có.',
    'Nhật thực có ba loại: toàn phần, hình khuyên, một phần. Nguyệt thực dài hơn, thấy được ở cả nửa Trái Đất đang là đêm.',
    'Thuỷ triều chủ yếu do lực hấp dẫn của Mặt Trăng và Mặt Trời; tác dụng của Mặt Trời chỉ bằng khoảng $0{,}46$ lần của Mặt Trăng.',
    'Triều cường vào lúc trăng non, trăng tròn; triều kém vào lúc trăng bán nguyệt.',
  ],
};
