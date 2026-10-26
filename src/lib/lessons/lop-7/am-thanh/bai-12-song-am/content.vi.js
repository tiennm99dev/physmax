/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Các nguồn âm đều dao động; sóng âm là sự lan truyền dao động của nguồn âm trong môi trường. Âm truyền được qua chất rắn, lỏng, khí, nhanh nhất trong chất rắn, và không truyền được trong chân không.',
  intro:
    'Khi em nói, bạn ngồi cuối lớp vẫn nghe rõ; khi áp tai xuống mặt bàn, em nghe rõ tiếng gõ nhẹ ở đầu bàn bên kia. Âm thanh được tạo ra như thế nào và đi từ nguồn âm tới tai ta bằng cách nào? Vì sao các nhà du hành trên Mặt Trăng không nói chuyện trực tiếp được với nhau?',
  objectives: [
    'Nêu được các nguồn âm đều dao động và thế nào là dao động.',
    'Mô tả được sóng âm là sự lan truyền dao động của nguồn âm trong môi trường; giải thích được sự truyền sóng âm trong không khí.',
    'Nêu được âm truyền được qua chất rắn, lỏng, khí và không truyền được trong chân không.',
    'So sánh được tốc độ truyền âm trong chất rắn, chất lỏng và chất khí; vận dụng $s = v \\cdot t$ cho sự truyền âm.',
  ],
  sections: [
    {
      heading: 'Nguồn âm và dao động',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Dao động',
          text: 'Dao động là chuyển động qua lại quanh một vị trí cân bằng. Ví dụ: quả lắc đồng hồ, chiếc xích đu, dây đàn sau khi gảy.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Nguồn âm',
          text: 'Vật phát ra âm gọi là nguồn âm. Các nguồn âm đều dao động.',
        },
        {
          type: 'list',
          items: [
            'Gảy dây đàn: dây đàn dao động và phát ra âm.',
            'Gõ vào mặt trống: mặt trống dao động; đặt vài hạt gạo lên mặt trống, các hạt gạo nảy lên.',
            'Gõ vào âm thoa rồi để một nhánh chạm nhẹ vào quả bóng bàn treo trên sợi chỉ: quả bóng bị bật ra, chứng tỏ nhánh âm thoa đang dao động.',
            'Khi nói, dây thanh quản trong cổ họng dao động; đặt tay lên cổ, em cảm thấy cổ rung.',
            'Khi loa phát âm, màng loa dao động.',
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Khi giữ chặt dây đàn hay mặt trống cho chúng ngừng dao động thì âm cũng tắt. Không có dao động thì không có âm.',
        },
      ],
    },
    {
      heading: 'Sóng âm',
      blocks: [
        {
          type: 'p',
          text: 'Dùng một thanh thép dao động chạm nhẹ vào mặt nước: dao động lan ra thành những vòng tròn đồng tâm trên mặt nước. Kéo dãn rồi thả một đầu chiếc lò xo dài: dọc lò xo xuất hiện các đoạn bị nén lại và các đoạn bị giãn ra nối tiếp nhau. Sự lan truyền dao động trong môi trường như vậy tạo thành sóng.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Sóng âm',
          text: 'Sóng âm là sự lan truyền dao động của nguồn âm trong môi trường.',
        },
        {
          type: 'p',
          text: 'Sự truyền sóng âm trong không khí: khi màng loa dao động, nó làm lớp không khí sát màng loa dao động theo, bị nén lại rồi giãn ra. Lớp không khí này lại làm lớp không khí kế tiếp dao động, cứ thế dao động lan truyền ra xa tạo thành các lớp không khí nén, giãn xen kẽ. Khi sóng âm truyền tới tai, nó làm màng nhĩ dao động và ta nghe thấy âm.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Truyền dao động, không truyền chất',
          text: 'Các lớp không khí chỉ dao động qua lại quanh vị trí cân bằng của chúng; không khí ở cạnh loa không chạy tới tai ta. Cái được truyền đi là dao động.',
        },
      ],
    },
    {
      heading: 'Môi trường truyền âm',
      blocks: [
        {
          type: 'p',
          text: 'Sóng âm truyền được trong chất rắn, chất lỏng và chất khí:',
        },
        {
          type: 'list',
          items: [
            'Chất khí: ta nghe được tiếng nói của người khác qua không khí.',
            'Chất rắn: áp tai xuống mặt bàn, ta nghe rõ tiếng gõ nhẹ ở đầu bàn bên kia; áp tai vào tường nghe được tiếng động ở phòng bên.',
            'Chất lỏng: cá trong hồ nghe được tiếng chân người trên bờ và bơi đi chỗ khác; người lặn dưới nước vẫn nghe được tiếng động.',
          ],
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Âm không truyền được trong chân không',
          text: 'Đặt một chuông điện đang reo trong bình kín rồi hút dần không khí ra: tiếng chuông nhỏ dần rồi gần như không nghe thấy nữa. Chân không là môi trường không có các hạt chất, nên không có gì để dao động và truyền âm đi. Trên Mặt Trăng không có không khí, các nhà du hành phải nói chuyện với nhau qua bộ đàm (sóng vô tuyến).',
        },
        {
          type: 'p',
          text: 'Tốc độ truyền âm phụ thuộc vào môi trường: nói chung tốc độ truyền âm trong chất rắn lớn hơn trong chất lỏng, trong chất lỏng lớn hơn trong chất khí.',
        },
        {
          type: 'table',
          caption: 'Tốc độ truyền âm gần đúng ở nhiệt độ phòng',
          head: ['Môi trường', 'Tốc độ truyền âm (m/s)'],
          rows: [
            ['Không khí (chất khí)', 'khoảng $340$'],
            ['Nước (chất lỏng)', 'khoảng $1\\,500$'],
            ['Thép (chất rắn)', 'khoảng $6\\,000$'],
            ['Chân không', 'không truyền được'],
          ],
        },
        {
          type: 'p',
          text: 'Âm truyền đi với tốc độ xác định nên ta dùng được công thức của chương Tốc độ: quãng đường âm truyền được $s = v \\cdot t$, thời gian âm truyền hết quãng đường $s$ là $t = \\dfrac{s}{v}$.',
        },
      ],
    },
  ],
  explore: {
    title: 'Loa phát âm trong các môi trường',
    instruction:
      'Bật loa và quan sát: màng loa dao động làm các lớp chất sát nó nén, giãn, rồi dao động lan dần tới tai. Theo dõi chấm đỏ để thấy mỗi lớp chất chỉ dao động tại chỗ. Đổi môi trường sang nước, thép rồi chân không và so sánh. Kéo thanh khoảng cách để tính thời gian âm thật truyền tới tai trong từng môi trường.',
  },
  examples: [
    {
      problem:
        'Trong một cơn giông, một bạn nhìn thấy tia chớp, $3$ giây sau mới nghe thấy tiếng sấm. Coi như ánh sáng tới mắt ngay lập tức và tốc độ truyền âm trong không khí là $340\\ \\text{m/s}$. Chỗ có tia chớp cách bạn đó bao xa?',
      steps: [
        'Tia chớp và tiếng sấm sinh ra cùng lúc; thời gian âm truyền từ chỗ có chớp tới tai là $t = 3\\ \\text{s}$.',
        'Quãng đường âm truyền được: $s = v \\cdot t = 340 \\cdot 3 = 1\\,020\\ \\text{(m)}$.',
      ],
      answer: 'Chỗ có tia chớp cách bạn đó khoảng $1\\,020\\ \\text{m}$.',
    },
    {
      problem:
        'Một bạn gõ mạnh một lần vào đầu một ống thép dài $510\\ \\text{m}$. Bạn khác áp tai vào đầu kia của ống nghe thấy hai tiếng gõ. Giải thích vì sao và tính khoảng thời gian giữa hai tiếng, biết tốc độ truyền âm trong thép là $6\\,000\\ \\text{m/s}$, trong không khí là $340\\ \\text{m/s}$.',
      steps: [
        'Âm truyền tới tai theo hai đường: qua thành ống thép (chất rắn) và qua không khí. Âm truyền trong thép nhanh hơn nên tới trước, âm qua không khí tới sau, vì vậy nghe thấy hai tiếng.',
        'Thời gian âm truyền qua thép: $t_1 = \\dfrac{s}{v_1} = \\dfrac{510}{6\\,000} = 0{,}085\\ \\text{(s)}$.',
        'Thời gian âm truyền qua không khí: $t_2 = \\dfrac{s}{v_2} = \\dfrac{510}{340} = 1{,}5\\ \\text{(s)}$.',
        'Khoảng thời gian giữa hai tiếng: $t_2 - t_1 = 1{,}5 - 0{,}085 = 1{,}415\\ \\text{(s)}$.',
      ],
      answer:
        'Tiếng thứ nhất truyền qua thép, tiếng thứ hai truyền qua không khí; hai tiếng cách nhau khoảng $1{,}4\\ \\text{s}$.',
    },
    {
      problem:
        'Hai nhà du hành vũ trụ đứng cạnh nhau trên Mặt Trăng. Vì sao họ không nghe được tiếng nói của nhau dù đứng rất gần, nhưng nếu chạm hai mũ bảo hiểm vào nhau thì có thể nghe được?',
      steps: [
        'Mặt Trăng không có không khí: khoảng giữa hai người là chân không.',
        'Âm không truyền được trong chân không, nên tiếng nói không tới được tai người kia.',
        'Khi hai mũ chạm nhau, dao động truyền qua vỏ mũ (chất rắn) và không khí bên trong mũ tới tai.',
      ],
      answer:
        'Âm không truyền qua chân không nhưng truyền được qua chất rắn (vỏ mũ) và không khí trong mũ.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Đặc điểm chung của các nguồn âm là gì?',
      options: [
        'Đều được làm bằng kim loại.',
        'Đều đang dao động.',
        'Đều có kích thước lớn.',
        'Đều đang phát sáng.',
      ],
      answer: 1,
      hints: ['Nghĩ tới dây đàn, mặt trống, màng loa khi chúng đang phát ra âm.'],
      solution:
        'Các nguồn âm đều dao động: dây đàn, mặt trống, màng loa, dây thanh quản đều dao động khi phát ra âm.',
    },
    {
      type: 'text',
      prompt: 'Điền từ còn thiếu: Sóng âm là sự lan truyền ______ của nguồn âm trong môi trường.',
      accept: ['dao động', 'dao dong'],
      hints: ['Nguồn âm làm gì khi phát ra âm?'],
      solution: 'Sóng âm là sự lan truyền dao động của nguồn âm trong môi trường.',
    },
    {
      type: 'choice',
      prompt:
        'Khi loa đang phát âm, các lớp không khí giữa loa và tai người nghe chuyển động như thế nào?',
      options: [
        'Chạy thẳng từ loa tới tai người nghe.',
        'Đứng yên hoàn toàn.',
        'Dao động qua lại tại chỗ, bị nén và giãn liên tiếp.',
        'Bay lên cao rồi rơi xuống tai.',
      ],
      answer: 2,
      hints: ['Sóng âm truyền dao động chứ không đưa không khí đi xa.'],
      solution:
        'Mỗi lớp không khí chỉ dao động qua lại quanh vị trí cân bằng, bị nén rồi giãn liên tiếp; dao động được truyền từ lớp này sang lớp khác tới tai.',
    },
    {
      type: 'multi',
      prompt: 'Âm truyền được qua những môi trường nào sau đây?',
      options: ['Thép', 'Nước', 'Không khí', 'Chân không', 'Gỗ'],
      answers: [0, 1, 2, 4],
      hints: ['Âm truyền được qua chất rắn, lỏng, khí.', 'Môi trường nào không có hạt chất nào?'],
      solution:
        'Thép và gỗ (chất rắn), nước (chất lỏng), không khí (chất khí) đều truyền được âm. Chân không không truyền được âm.',
    },
    {
      type: 'order',
      prompt: 'Sắp xếp các môi trường theo thứ tự tốc độ truyền âm tăng dần.',
      items: ['Thép', 'Không khí', 'Nước'],
      answer: [1, 2, 0],
      hints: ['Tốc độ truyền âm trong chất rắn lớn nhất, trong chất khí nhỏ nhất.'],
      solution:
        'Không khí (khoảng $340\\ \\text{m/s}$) $<$ nước (khoảng $1\\,500\\ \\text{m/s}$) $<$ thép (khoảng $6\\,000\\ \\text{m/s}$).',
    },
    {
      type: 'number',
      prompt:
        'Nhìn thấy tia chớp, $5$ giây sau mới nghe thấy tiếng sấm. Lấy tốc độ truyền âm trong không khí là $340\\ \\text{m/s}$ và coi ánh sáng tới mắt ngay lập tức. Chỗ có tia chớp cách người quan sát bao nhiêu mét?',
      answer: 1700,
      unit: 'm',
      hints: ['Thời gian âm truyền tới tai là $5\\ \\text{s}$.', 'Dùng $s = v \\cdot t$.'],
      solution: '$s = v \\cdot t = 340 \\cdot 5 = 1\\,700\\ \\text{(m)}$.',
    },
    {
      type: 'number',
      prompt:
        'Một tàu phát ra âm dưới nước. Tốc độ truyền âm trong nước là $1\\,500\\ \\text{m/s}$. Sau bao nhiêu giây âm truyền tới một thợ lặn cách tàu $3\\,000\\ \\text{m}$?',
      answer: 2,
      unit: 's',
      hints: ['Dùng $t = \\dfrac{s}{v}$.'],
      solution: '$t = \\dfrac{s}{v} = \\dfrac{3\\,000}{1\\,500} = 2\\ \\text{(s)}$.',
    },
    {
      type: 'choice',
      prompt:
        'Đặt một chuông điện đang reo trong bình kín rồi hút dần không khí ra khỏi bình. Hiện tượng nào xảy ra?',
      options: [
        'Tiếng chuông to dần lên.',
        'Tiếng chuông không thay đổi.',
        'Tiếng chuông nhỏ dần rồi gần như không nghe thấy.',
        'Chuông ngừng dao động.',
      ],
      answer: 2,
      hints: ['Chuông vẫn reo, nhưng môi trường truyền âm quanh nó thay đổi thế nào?'],
      solution:
        'Chuông vẫn dao động, nhưng không khí trong bình ít dần, gần thành chân không; âm không truyền được trong chân không nên tiếng chuông nhỏ dần rồi gần như không nghe thấy.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi hiện tượng với môi trường đã truyền âm.',
      left: [
        'Cá bơi đi khi nghe tiếng chân người trên bờ hồ.',
        'Áp tai xuống đường ray nghe được tiếng tàu từ xa.',
        'Nghe tiếng bạn gọi từ cuối lớp.',
      ],
      right: ['Chất lỏng', 'Chất rắn', 'Chất khí'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
      hints: ['Xác định âm đi qua nước, kim loại hay không khí trước khi tới tai.'],
      solution:
        'Tiếng chân truyền qua đất bờ hồ rồi qua nước tới cá: chất lỏng là môi trường cuối cùng. Đường ray bằng thép: chất rắn. Tiếng gọi trong lớp truyền qua không khí: chất khí.',
    },
  ],
  takeaways: [
    'Dao động là chuyển động qua lại quanh một vị trí cân bằng. Các nguồn âm đều dao động.',
    'Sóng âm là sự lan truyền dao động của nguồn âm trong môi trường; trong không khí, các lớp không khí bị nén, giãn liên tiếp.',
    'Âm truyền được qua chất rắn, lỏng, khí; không truyền được trong chân không.',
    'Tốc độ truyền âm: chất rắn $>$ chất lỏng $>$ chất khí; quãng đường âm truyền được $s = v \\cdot t$.',
  ],
};
