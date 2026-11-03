/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Bầu trời sao quay từ Đông sang Tây quanh một điểm gần Sao Bắc Cực; tìm Sao Bắc Cực qua các chòm Gấu Lớn, Thiên Hậu, Thiên Nga là tìm được hướng Bắc và vĩ độ nơi đứng.',
  intro:
    'Giữa biển đêm hay giữa sa mạc, không có la bàn, không có thiết bị định vị, người xưa vẫn đi đúng hướng. Trên bầu trời có một ngôi sao gần như đứng yên suốt đêm, suốt năm. Làm sao tìm ra nó giữa hàng nghìn ngôi sao, và nó cho ta biết những gì?',
  objectives: [
    'Nêu được khái niệm thiên cầu và đặc điểm chuyển động nhìn thấy của bầu trời sao.',
    'Dựa vào bản đồ sao, nhận ra được các chòm sao Gấu Lớn, Gấu Bé và Thiên Hậu.',
    'Xác định được vị trí Sao Bắc Cực nhờ các chòm sao Gấu Lớn, Thiên Hậu, Thiên Nga.',
    'Dùng Sao Bắc Cực để xác định phương hướng và ước lượng vĩ độ nơi quan sát.',
  ],
  sections: [
    {
      heading: 'Thiên cầu và bản đồ sao',
      blocks: [
        {
          type: 'p',
          text: 'Các ngôi sao ở rất xa, nên mắt ta không phân biệt được sao nào gần, sao nào xa. Chúng trông như cùng gắn trên một mặt cầu khổng lồ bao quanh người quan sát.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Thiên cầu',
          text: 'Thiên cầu là mặt cầu tưởng tượng có bán kính rất lớn, tâm là người quan sát, trên đó ta hình dung có các thiên thể. Mặt phẳng chân trời cắt thiên cầu theo đường chân trời; chỉ nửa thiên cầu ở trên đường này là nhìn thấy được.',
        },
        {
          type: 'p',
          text: 'Kéo dài trục quay của Trái Đất, ta được hai điểm trên thiên cầu là thiên cực Bắc và thiên cực Nam. Vì Trái Đất tự quay từ Tây sang Đông, nên ta thấy cả thiên cầu quay ngược lại, từ Đông sang Tây, mỗi vòng khoảng $24$ giờ, quanh hai thiên cực đó.',
        },
        {
          type: 'p',
          text: 'Từ xa xưa, người ta đã nối các sao sáng gần nhau thành các chòm sao để dễ nhận biết. Bản đồ sao thể hiện các chòm sao trên bầu trời ứng với vĩ độ nơi quan sát và thời điểm quan sát. Bản đồ sao quay có một đĩa in các chòm sao với tâm là cực Bắc, trên vành có các tháng trong năm, xoay đĩa đến đúng ngày giờ là đọc được bầu trời lúc đó.',
        },
        {
          type: 'table',
          caption: 'Ba chòm sao cần nhận ra trên bản đồ sao',
          head: ['Chòm sao', 'Số sao chính', 'Hình dạng dễ nhớ', 'Đặc điểm'],
          rows: [
            ['Gấu Lớn', '$7$', 'Cái gáo, chiếc gàu tát nước', 'Bốn sao làm gàu, ba sao làm cán'],
            ['Gấu Bé', '$7$', 'Cái gáo nhỏ', 'Hướng ngược Gấu Lớn; đầu cán là Sao Bắc Cực'],
            ['Thiên Hậu', '$5$', 'Chữ W hoặc chữ M', 'Ở phía đối diện với Gấu Lớn qua Sao Bắc Cực'],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Bầu trời hai bán cầu khác nhau',
          text: 'Người ở bán cầu Bắc không thấy một phần các chòm sao ở phía thiên cực Nam, và ngược lại. Ở bán cầu Nam không nhìn thấy Sao Bắc Cực.',
        },
      ],
    },
    {
      heading: 'Sao Bắc Cực và cách tìm',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Vì sao Sao Bắc Cực gần như đứng yên',
          text: 'Sao Bắc Cực chỉ cách thiên cực Bắc chưa đến $1^\\circ$. Mọi sao khác quay quanh thiên cực nên đổi chỗ trên trời, còn Sao Bắc Cực gần như giữ nguyên vị trí suốt đêm và suốt năm. Vì thế nó là mốc chỉ hướng Bắc.',
        },
        {
          type: 'p',
          text: 'Sao Bắc Cực không phải sao sáng nhất trên trời, nên phải tìm nó nhờ các chòm sao dễ thấy hơn:',
        },
        {
          type: 'list',
          items: [
            'Qua Gấu Lớn: nối hai sao $\\beta$ và $\\alpha$ ở thành gàu, xa cán nhất, rồi kéo dài về phía $\\alpha$ một đoạn khoảng $5$ lần đoạn $\\alpha\\beta$.',
            'Qua Thiên Hậu: từ trung điểm của đoạn nối hai sao $\\gamma$ và $\\delta$, kẻ đường vuông góc với đoạn đó về phía chữ W mở ra, lấy một đoạn khoảng $7$ lần $\\gamma\\delta$.',
            'Qua Thiên Nga: kéo dài đoạn $ab$ nối sao ở cánh với sao ở đuôi (Deneb) về phía đuôi, thêm khoảng $4$ lần $ab$.',
          ],
        },
        {
          type: 'p',
          text: 'Các hệ số $5$, $7$, $4$ chỉ là ước lượng để tìm nhanh bằng mắt: đo trên bầu trời thật, đoạn cuối với Thiên Hậu gần $8$ lần $\\gamma\\delta$. Thử ba đường dẫn ở phần Khám phá để thấy đường nào dùng được vào lúc nào: cùng một đêm, một chòm sao có thể đã lặn dưới chân trời, nhất là khi ở vĩ độ thấp như Việt Nam.',
        },
      ],
    },
    {
      heading: 'Xác định phương hướng',
      blocks: [
        {
          type: 'p',
          text: 'Đã tìm được Sao Bắc Cực, ta đứng quay mặt về phía sao đó. Hạ một đường thẳng đứng từ sao xuống chân trời, điểm chạm là hướng Bắc. Khi đó:',
        },
        {
          type: 'table',
          head: ['Trước mặt', 'Sau lưng', 'Tay phải', 'Tay trái'],
          rows: [['Bắc', 'Nam', 'Đông', 'Tây']],
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Độ cao của Sao Bắc Cực',
          text: 'Độ cao của Sao Bắc Cực so với đường chân trời xấp xỉ bằng vĩ độ nơi quan sát. Ở vĩ độ $30^\\circ$ Bắc, sao này cao khoảng $30^\\circ$; ở xích đạo, nó sát chân trời; ở Bắc Cực, nó gần đỉnh đầu.',
        },
        {
          type: 'p',
          text: 'Vì vậy người đi biển đo độ cao Sao Bắc Cực để biết mình đang ở vĩ tuyến nào. Ban ngày, có thể dựa vào Mặt Trời: sáng sớm Mặt Trời ở phía Đông, chiều tối ở phía Tây. Hướng mọc lặn thay đổi theo mùa, sẽ tìm hiểu ở bài sau, nên đây chỉ là cách ước lượng.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Dễ nhầm',
          text: 'Sao Bắc Cực không phải sao sáng nhất, và cũng không đứng yên tuyệt đối. Ngoài ra, nó ở đầu cán chòm Gấu Bé, không thuộc chòm Gấu Lớn.',
        },
      ],
    },
    {
      heading: 'Dự án: Bản đồ sao quay tự làm',
      project: true,
      blocks: [
        {
          type: 'p',
          text: 'Mục tiêu: làm một bản đồ sao quay đơn giản, rồi dùng nó để tìm Sao Bắc Cực và xác định hướng Bắc ngoài trời. Dụng cụ: bìa cứng, kéo, đinh ghim, hình các chòm sao in từ phần mềm mô phỏng bầu trời, thước đo độ, sợi dây và vật nặng nhỏ.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Dán hình các chòm sao quanh cực Bắc lên một đĩa bìa, tâm đĩa là cực Bắc. Chia vành đĩa thành $12$ tháng.',
            'Làm một tấm che có cửa sổ ứng với phần trời nhìn thấy ở vĩ độ nơi em ở, chia vành thành $24$ giờ. Ghim tâm đĩa với tấm che để đĩa xoay được.',
            'Xoay đĩa đến đúng ngày, giờ quan sát. Ghi các chòm sao đang ở trên chân trời.',
            'Vào đêm trời quang, tìm một trong các chòm Gấu Lớn, Thiên Hậu, rồi tìm Sao Bắc Cực. Đánh dấu hướng Bắc trên mặt đất và so sánh với la bàn.',
            'Làm thước đo độ cao từ thước đo độ, sợi dây và vật nặng. Đo độ cao Sao Bắc Cực, so sánh với vĩ độ nơi em ở.',
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Báo cáo',
          text: 'Nộp bản đồ sao quay và bảng ghi ngày giờ quan sát, chòm sao đã dùng, độ cao đo được, vĩ độ tra được và độ lệch hướng so với la bàn. Nêu một nguyên nhân gây sai số. Đi quan sát ban đêm cần có người lớn đi cùng.',
        },
      ],
    },
  ],
  explore: {
    title: 'Bầu trời phía Bắc',
    instruction:
      'Bầu trời được vẽ theo vị trí thật của các sao, khi nhìn về phía Bắc. Kéo giờ, tháng và vĩ độ để thấy các chòm sao đổi chỗ. Chọn một đường dẫn rồi chạm vào ngôi sao mà em cho là Sao Bắc Cực.',
  },
  examples: [
    {
      problem:
        'Một người đi biển đo được Sao Bắc Cực cao $16^\\circ$ so với đường chân trời. Người đó đang ở vĩ độ nào, và làm thế nào để đi về hướng Đông?',
      steps: [
        'Độ cao của Sao Bắc Cực xấp xỉ bằng vĩ độ nơi quan sát, nên người đó ở khoảng vĩ độ $16^\\circ$ Bắc.',
        'Quay mặt về phía Sao Bắc Cực thì trước mặt là hướng Bắc.',
        'Khi mặt hướng Bắc, tay phải chỉ hướng Đông, nên chỉ cần đi về phía tay phải.',
      ],
      answer:
        'Người đó ở khoảng vĩ độ $16^\\circ$ Bắc; hướng Đông ở phía tay phải khi nhìn về Sao Bắc Cực.',
    },
    {
      problem:
        'Trên bầu trời, hai sao $\\alpha$ và $\\beta$ của chòm Gấu Lớn cách nhau khoảng $5{,}4^\\circ$. Ước lượng khoảng cách góc từ $\\alpha$ đến Sao Bắc Cực.',
      steps: [
        'Từ $\\alpha$ kéo dài thêm khoảng $5$ lần đoạn $\\alpha\\beta$ thì gặp Sao Bắc Cực.',
        'Khoảng cách góc cần tìm khoảng $5 \\cdot 5{,}4^\\circ = 27^\\circ$.',
        'Sao $\\alpha$ cách thiên cực Bắc khoảng $28^\\circ$, nên ước lượng này khá sát.',
      ],
      answer: 'Khoảng $27^\\circ$.',
    },
    {
      problem:
        'Lúc $20$ giờ, sao $\\alpha$ của Gấu Lớn ở ngay phía trên Sao Bắc Cực. Bầu trời đã quay được bao nhiêu độ lúc $2$ giờ sáng hôm sau, và sao $\\alpha$ đã nằm ở phía nào so với Sao Bắc Cực?',
      steps: [
        'Bầu trời quay $360^\\circ$ trong khoảng $24$ giờ, tức $15^\\circ$ mỗi giờ.',
        'Từ $20$ giờ đến $2$ giờ sáng là $6$ giờ, nên bầu trời quay $6 \\cdot 15^\\circ = 90^\\circ$.',
        'Khi nhìn về phía Bắc, các sao quay ngược chiều kim đồng hồ quanh Sao Bắc Cực, nên từ phía trên, sao $\\alpha$ chuyển sang phía bên trái, tức phía Tây của Sao Bắc Cực.',
      ],
      answer: 'Quay được $90^\\circ$; sao $\\alpha$ nằm ở phía Tây của Sao Bắc Cực.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Thiên cầu là gì?',
      options: [
        'Mặt cầu tưởng tượng có bán kính rất lớn, tâm là người quan sát',
        'Lớp khí quyển bao quanh Trái Đất',
        'Mặt cầu có thật mà các ngôi sao gắn vào',
        'Quỹ đạo của Trái Đất quanh Mặt Trời',
      ],
      answer: 0,
      hints: ['Các sao ở những khoảng cách rất khác nhau, chỉ trông như cùng trên một mặt cầu.'],
      solution:
        'Thiên cầu là mặt cầu tưởng tượng có bán kính rất lớn, tâm là người quan sát. Nó là cách hình dung vị trí các thiên thể, không phải một vật có thật.',
    },
    {
      type: 'choice',
      prompt: 'Nhìn từ Trái Đất, bầu trời sao chuyển động như thế nào trong một đêm?',
      options: [
        'Từ Đông sang Tây, quanh một điểm gần Sao Bắc Cực',
        'Từ Tây sang Đông, quanh một điểm gần Sao Bắc Cực',
        'Từ Bắc xuống Nam',
        'Đứng yên hoàn toàn',
      ],
      answer: 0,
      hints: [
        'Trái Đất tự quay từ Tây sang Đông. Cảnh vật nhìn từ một đoàn tàu đang chạy thì sao?',
      ],
      solution:
        'Trái Đất tự quay từ Tây sang Đông nên ta thấy bầu trời quay ngược lại, từ Đông sang Tây, quanh thiên cực Bắc, là điểm rất gần Sao Bắc Cực.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi chòm sao với đặc điểm của nó.',
      left: ['Gấu Lớn', 'Gấu Bé', 'Thiên Hậu'],
      right: [
        '$7$ sao chính, hình cái gáo lớn',
        '$7$ sao chính, đầu cán là Sao Bắc Cực',
        '$5$ sao chính, hình chữ W hoặc M',
        '$3$ sao chính, thẳng hàng',
      ],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
      hints: [
        'Chòm hình chữ chỉ có $5$ sao chính.',
        'Sao Bắc Cực thuộc chòm nhỏ hơn trong hai chòm hình gáo.',
      ],
      solution:
        'Gấu Lớn: $7$ sao, hình cái gáo lớn. Gấu Bé: $7$ sao, đầu cán là Sao Bắc Cực. Thiên Hậu: $5$ sao, hình chữ W hoặc M.',
    },
    {
      type: 'number',
      prompt:
        'Ở Hà Nội (vĩ độ khoảng $21^\\circ$ Bắc), Sao Bắc Cực cao bao nhiêu độ so với đường chân trời?',
      answer: 21,
      tolerance: 1,
      unit: '°',
      hints: ['Độ cao của Sao Bắc Cực liên hệ với vĩ độ nơi quan sát.'],
      solution: 'Độ cao của Sao Bắc Cực xấp xỉ bằng vĩ độ nơi quan sát, nên khoảng $21^\\circ$.',
    },
    {
      type: 'number',
      prompt:
        'Bầu trời sao quay một vòng trong khoảng $24$ giờ. Sau $4$ giờ, một chòm sao đã quay quanh thiên cực Bắc được bao nhiêu độ?',
      answer: 60,
      unit: '°',
      hints: ['Tính góc quay trong một giờ trước.'],
      solution:
        'Mỗi giờ bầu trời quay $\\dfrac{360^\\circ}{24} = 15^\\circ$. Sau $4$ giờ: $4 \\cdot 15^\\circ = 60^\\circ$.',
    },
    {
      type: 'number',
      prompt:
        'Trên trời, đoạn nối hai sao $\\alpha$, $\\beta$ của Gấu Lớn dài khoảng $5{,}4^\\circ$. Theo cách tìm Sao Bắc Cực, Sao Bắc Cực cách sao $\\alpha$ khoảng bao nhiêu độ?',
      answer: 27,
      tolerance: 0.5,
      unit: '°',
      hints: ['Kéo dài thêm khoảng $5$ lần đoạn $\\alpha\\beta$.'],
      solution: 'Khoảng cách là $5 \\cdot 5{,}4^\\circ = 27^\\circ$.',
    },
    {
      type: 'number',
      prompt:
        'Con tàu đi thẳng về phía Nam, Sao Bắc Cực giảm từ độ cao $21^\\circ$ xuống $10{,}8^\\circ$. Biết mỗi độ vĩ tuyến ứng với khoảng $111$ km trên mặt đất. Con tàu đi được khoảng bao nhiêu kilômét?',
      answer: 1132,
      tolerance: 5,
      unit: 'km',
      hints: [
        'Độ cao giảm bao nhiêu thì vĩ độ giảm bấy nhiêu.',
        'Nhân độ chênh lệch vĩ độ với $111$ km.',
      ],
      solution:
        'Vĩ độ giảm $21^\\circ - 10{,}8^\\circ = 10{,}2^\\circ$. Quãng đường khoảng $10{,}2 \\cdot 111 \\approx 1\\,132$ km.',
    },
    {
      type: 'order',
      prompt: 'Sắp xếp các bước xác định hướng Đông vào ban đêm nhờ chòm Gấu Lớn.',
      items: [
        'Tìm chòm Gấu Lớn hình cái gáo trên bầu trời',
        'Kéo dài đoạn $\\beta\\alpha$ khoảng $5$ lần để tìm Sao Bắc Cực',
        'Quay mặt về phía Sao Bắc Cực, đó là hướng Bắc',
        'Hướng Đông ở phía tay phải',
      ],
      answer: [0, 1, 2, 3],
      hints: ['Phải có Sao Bắc Cực rồi mới biết hướng Bắc.'],
      solution:
        'Tìm Gấu Lớn, kéo dài đoạn $\\beta\\alpha$ để gặp Sao Bắc Cực, quay mặt về sao đó để có hướng Bắc, rồi tay phải chỉ hướng Đông.',
    },
    {
      type: 'multi',
      prompt: 'Những phát biểu nào về Sao Bắc Cực là đúng?',
      options: [
        'Sao này gần như đứng yên vì rất gần thiên cực Bắc',
        'Độ cao của sao này xấp xỉ vĩ độ nơi quan sát ở bán cầu Bắc',
        'Sao này là sao sáng nhất bầu trời đêm',
        'Từ mọi nơi ở bán cầu Nam đều nhìn thấy sao này',
        'Sao này ở đầu cán chòm Gấu Bé',
      ],
      answers: [0, 1, 4],
      hints: [
        'Hãy nghĩ xem sao Vega hay Capella so với Sao Bắc Cực thế nào về độ sáng.',
        'Ở bán cầu Nam, thiên cực Bắc nằm dưới chân trời.',
      ],
      solution:
        'Đúng: gần như đứng yên vì rất gần thiên cực Bắc, độ cao xấp xỉ vĩ độ, ở đầu cán Gấu Bé. Sai: nhiều sao sáng hơn Sao Bắc Cực, và ở bán cầu Nam không thấy sao này.',
    },
    {
      type: 'text',
      prompt: 'Chòm sao nào có $5$ sao chính xếp thành hình chữ W hoặc chữ M?',
      accept: ['Thiên Hậu', 'chòm Thiên Hậu', 'chòm sao Thiên Hậu', 'Cassiopeia'],
      hints: ['Chòm này ở phía đối diện với Gấu Lớn qua Sao Bắc Cực.'],
      solution: 'Đó là chòm Thiên Hậu.',
    },
    {
      type: 'choice',
      prompt:
        'Vào đầu mùa thu, buổi tối ở Hà Nội, chòm Gấu Lớn gần đường chân trời, bị cây cối che khuất. Nên làm thế nào để tìm Sao Bắc Cực?',
      options: [
        'Dùng chòm Thiên Hậu, ở phía đối diện với Gấu Lớn qua Sao Bắc Cực',
        'Tìm ngôi sao sáng nhất trên bầu trời',
        'Đợi đến ban ngày rồi quan sát',
        'Tìm ngôi sao ở ngay trên đỉnh đầu',
      ],
      answer: 0,
      hints: ['Khi một chòm ở thấp thì chòm ở phía bên kia thiên cực thường đang ở cao.'],
      solution:
        'Gấu Lớn và Thiên Hậu ở hai phía của thiên cực Bắc, nên khi chòm này ở thấp thì chòm kia thường ở cao. Dùng Thiên Hậu để tìm Sao Bắc Cực.',
    },
  ],
  takeaways: [
    'Thiên cầu là mặt cầu tưởng tượng, tâm là người quan sát; bầu trời sao quay từ Đông sang Tây quanh các thiên cực, do Trái Đất tự quay.',
    'Gấu Lớn và Gấu Bé có $7$ sao chính; Thiên Hậu có $5$ sao chính, hình chữ W hoặc M.',
    'Sao Bắc Cực gần như đứng yên; tìm nó qua Gấu Lớn (khoảng $5$ lần $\\alpha\\beta$), Thiên Hậu (khoảng $7$ lần $\\gamma\\delta$) hoặc Thiên Nga (khoảng $4$ lần $ab$).',
    'Quay mặt về Sao Bắc Cực: trước mặt là Bắc, sau lưng là Nam, tay phải là Đông, tay trái là Tây.',
    'Độ cao của Sao Bắc Cực xấp xỉ bằng vĩ độ nơi quan sát.',
  ],
};
