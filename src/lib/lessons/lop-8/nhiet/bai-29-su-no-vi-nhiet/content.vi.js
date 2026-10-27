/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Chất rắn, chất lỏng, chất khí đều nở ra khi nóng lên và co lại khi lạnh đi. Các chất rắn khác nhau, các chất lỏng khác nhau nở vì nhiệt khác nhau; các chất khí khác nhau nở vì nhiệt giống nhau. Chất khí nở vì nhiệt nhiều hơn chất lỏng, chất lỏng nhiều hơn chất rắn. Sự nở vì nhiệt được ứng dụng trong nhiệt kế, băng kép và phải được phòng tránh ở đường ray, cầu, ống dẫn.',
  intro:
    'Tháp Eiffel ở Paris (Pháp) làm bằng thép, cao $324\\ \\text{m}$. Các phép đo cho thấy vào mùa hè tháp cao hơn vào mùa đông vài xăng-ti-mét. Vì sao tháp có thể "lớn lên" như vậy? Còn đường ray xe lửa, vì sao chỗ nối hai thanh ray lại chừa một khe hở nhỏ?',
  objectives: [
    'Nêu được chất rắn, chất lỏng, chất khí nở ra khi nóng lên, co lại khi lạnh đi.',
    'Nêu được các chất khác nhau nở vì nhiệt khác nhau; so sánh được sự nở vì nhiệt của chất rắn, chất lỏng, chất khí.',
    'Mô tả được hoạt động của băng kép khi bị nung nóng và làm lạnh.',
    'Lấy được ví dụ về công dụng và tác hại của sự nở vì nhiệt và cách phòng tránh tác hại.',
  ],
  sections: [
    {
      heading: 'Sự nở vì nhiệt của chất rắn',
      blocks: [
        {
          type: 'p',
          text: 'Thí nghiệm: ba thanh nhôm, đồng, sắt có cùng chiều dài ở nhiệt độ phòng, được đặt trong một ống. Cho hơi nước nóng đi qua ống để làm nóng ba thanh như nhau. Kim chỉ thị cho thấy cả ba thanh đều dài ra; thanh nhôm dài ra nhiều nhất, sau đó đến thanh đồng, thanh sắt dài ra ít nhất.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Kết luận',
          text: 'Chất rắn nở ra khi nóng lên và co lại khi lạnh đi. Các chất rắn khác nhau nở vì nhiệt khác nhau: nhôm nở nhiều hơn đồng, đồng nở nhiều hơn sắt (thép).',
        },
        {
          type: 'table',
          caption:
            'Độ dài thêm của thanh dài $100\\ \\text{cm}$ khi nóng thêm $50\\ ^\\circ\\text{C}$',
          head: ['Chất', 'Nhôm', 'Đồng', 'Sắt'],
          rows: [
            [
              'Độ dài thêm',
              '$0{,}12\\ \\text{cm}$',
              '$0{,}086\\ \\text{cm}$',
              '$0{,}060\\ \\text{cm}$',
            ],
          ],
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Băng kép',
          text: 'Băng kép gồm hai thanh kim loại khác nhau (ví dụ đồng và thép) được tán chặt vào nhau dọc theo chiều dài. Khi bị nung nóng, thanh đồng nở nhiều hơn thanh thép nên băng kép cong về phía thanh thép (đồng ở mặt ngoài). Khi bị làm lạnh, đồng co lại nhiều hơn nên băng kép cong về phía thanh đồng.',
        },
      ],
    },
    {
      heading: 'Sự nở vì nhiệt của chất lỏng và chất khí',
      blocks: [
        {
          type: 'p',
          text: 'Thí nghiệm với chất lỏng: một bình thủy tinh đựng đầy nước màu, nút có cắm một ống thủy tinh nhỏ. Đặt bình vào chậu nước nóng: mực nước màu trong ống dâng lên. Đặt bình vào chậu nước lạnh: mực nước màu hạ xuống. Làm thí nghiệm với ba bình giống nhau đựng rượu, dầu và nước cùng thể tích, cùng nhúng vào nước nóng: mực chất lỏng trong ba ống dâng lên khác nhau.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Chất lỏng',
          text: 'Chất lỏng nở ra khi nóng lên, co lại khi lạnh đi. Các chất lỏng khác nhau nở vì nhiệt khác nhau.',
        },
        {
          type: 'p',
          text: 'Thí nghiệm với chất khí: một bình cầu chứa không khí, nút có cắm ống thủy tinh, trong ống có một giọt nước màu. Áp hai bàn tay vào bình cho không khí trong bình nóng lên: giọt nước màu đi ra phía ngoài. Bỏ tay ra, không khí nguội đi: giọt nước màu đi vào trong. Chỉ hơi ấm của bàn tay đã đủ làm không khí nở ra thấy rõ, trong khi muốn thấy nước nở ra phải nhúng bình vào nước nóng: chất khí nở vì nhiệt nhiều hơn chất lỏng.',
        },
        {
          type: 'table',
          caption:
            'Độ tăng thể tích của $1\\,000\\ \\text{cm}^3$ một số chất khi nóng thêm $50\\ ^\\circ\\text{C}$',
          head: ['Chất khí', 'Chất lỏng', 'Chất rắn'],
          rows: [
            [
              'Không khí: $183\\ \\text{cm}^3$',
              'Rượu: $58\\ \\text{cm}^3$',
              'Nhôm: $3{,}45\\ \\text{cm}^3$',
            ],
            [
              'Hơi nước: $183\\ \\text{cm}^3$',
              'Dầu hỏa: $55\\ \\text{cm}^3$',
              'Đồng: $2{,}55\\ \\text{cm}^3$',
            ],
            [
              'Khí oxygen: $183\\ \\text{cm}^3$',
              'Thủy ngân: $9\\ \\text{cm}^3$',
              'Sắt: $1{,}80\\ \\text{cm}^3$',
            ],
          ],
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'So sánh',
          text: 'Chất rắn, chất lỏng, chất khí đều nở ra khi nóng lên. Chất khí nở vì nhiệt nhiều hơn chất lỏng, chất lỏng nở vì nhiệt nhiều hơn chất rắn. Các chất khí khác nhau nở vì nhiệt giống nhau; các chất lỏng khác nhau, các chất rắn khác nhau nở vì nhiệt khác nhau.',
        },
      ],
    },
    {
      heading: 'Ứng dụng và phòng tránh tác hại',
      blocks: [
        {
          type: 'list',
          items: [
            'Nhiệt kế chất lỏng: chất lỏng trong bầu nhiệt kế (rượu, thủy ngân) nở ra khi nóng lên, co lại khi lạnh đi, mực chất lỏng trong ống cho biết nhiệt độ.',
            'Băng kép dùng để tự động đóng ngắt mạch điện khi nhiệt độ thay đổi: trong bàn là, nồi cơm điện, bình nóng lạnh, thiết bị báo cháy. Khi đủ nóng, băng kép cong lên, rời tiếp điểm, ngắt điện; khi nguội đi, băng kép trở lại, đóng mạch.',
            'Khinh khí cầu: không khí trong khí cầu được đốt nóng, nở ra, nhẹ hơn không khí bên ngoài nên khí cầu bay lên.',
            'Nút thủy tinh của lọ bị kẹt: hơ nóng cổ lọ, cổ lọ nở ra và mở được nút. Quả bóng bàn bị bẹp nhúng vào nước nóng sẽ phồng lên.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Tác hại và cách phòng tránh',
          text: 'Khi sự nở vì nhiệt bị ngăn cản, vật có thể gây ra lực rất lớn: đường ray bị cong vênh, bê tông bị nứt, ống dẫn bị vỡ. Vì vậy chỗ nối hai thanh ray có khe hở; một đầu cầu thép được đặt trên gối đỡ có con lăn; ống dẫn khí, dẫn hơi nóng có những đoạn uốn cong; mặt đường bê tông chia thành từng tấm có khe co giãn; không đổ thật đầy chai nước, ấm nước khi đun.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Rót nước sôi vào cốc thủy tinh dày',
          text: 'Thủy tinh dẫn nhiệt kém. Rót nước sôi vào cốc thủy tinh dày, mặt trong nóng lên và nở ra trước khi mặt ngoài kịp nóng, nên cốc dễ bị nứt vỡ. Cốc thủy tinh mỏng, hoặc tráng nước ấm trước, thì ít bị nứt hơn.',
        },
      ],
    },
  ],
  explore: {
    title: 'Thanh ray, băng kép và bảng so sánh',
    instruction:
      'Thanh ray: kéo nhiệt độ và quan sát khe hở; thử lắp ray không để khe hở. Băng kép: nung nóng hoặc làm lạnh băng kép đồng – thép, rồi bật bàn là để thấy băng kép tự động đóng ngắt mạch điện. Rắn – lỏng – khí: đổi độ tăng nhiệt độ và so sánh độ tăng thể tích của các chất.',
  },
  examples: [
    {
      problem:
        'Một băng kép làm từ đồng và thép tán chặt vào nhau. Hình dạng băng kép thay đổi thế nào khi (a) bị hơ nóng; (b) bị làm lạnh? Biết đồng nở vì nhiệt nhiều hơn thép.',
      steps: [
        '(a) Khi hơ nóng, cả hai thanh đều dài ra nhưng thanh đồng dài ra nhiều hơn. Hai thanh bị tán chặt nên băng kép phải cong, thanh dài hơn (đồng) nằm ở mặt ngoài.',
        '(b) Khi làm lạnh, cả hai thanh co lại nhưng thanh đồng co nhiều hơn, trở thành thanh ngắn hơn, nằm ở mặt trong.',
      ],
      answer: '(a) Cong về phía thanh thép; (b) cong về phía thanh đồng.',
    },
    {
      problem:
        'Mỗi mét thép dài thêm $0{,}012\\ \\text{mm}$ khi nóng thêm $1\\ ^\\circ\\text{C}$. Một thanh ray thép dài $12{,}5\\ \\text{m}$ được lắp ở $20\\ ^\\circ\\text{C}$. Vào trưa hè, ray nóng tới $50\\ ^\\circ\\text{C}$. Thanh ray dài thêm bao nhiêu? Khe hở $6\\ \\text{mm}$ ở chỗ nối có đủ không?',
      steps: [
        'Độ tăng nhiệt độ: $50 - 20 = 30\\ ^\\circ\\text{C}$.',
        'Mỗi mét dài thêm $0{,}012 \\cdot 30 = 0{,}36\\ \\text{mm}$.',
        'Cả thanh dài thêm $12{,}5 \\cdot 0{,}36 = 4{,}5\\ \\text{mm}$.',
        'Khe hở $6\\ \\text{mm} > 4{,}5\\ \\text{mm}$ nên còn $1{,}5\\ \\text{mm}$, đủ để ray nở ra mà không bị cong vênh.',
      ],
      answer: 'Ray dài thêm $4{,}5\\ \\text{mm}$; khe hở $6\\ \\text{mm}$ là đủ.',
    },
    {
      problem:
        'Đun nóng $2\\,000\\ \\text{cm}^3$ rượu và $2\\,000\\ \\text{cm}^3$ không khí thêm $50\\ ^\\circ\\text{C}$. Dùng bảng độ tăng thể tích, tính độ tăng thể tích của mỗi chất và so sánh.',
      steps: [
        'Theo bảng, $1\\,000\\ \\text{cm}^3$ rượu nóng thêm $50\\ ^\\circ\\text{C}$ tăng $58\\ \\text{cm}^3$, nên $2\\,000\\ \\text{cm}^3$ tăng $2 \\cdot 58 = 116\\ \\text{cm}^3$.',
        '$1\\,000\\ \\text{cm}^3$ không khí tăng $183\\ \\text{cm}^3$, nên $2\\,000\\ \\text{cm}^3$ tăng $2 \\cdot 183 = 366\\ \\text{cm}^3$.',
        '$366 : 116 \\approx 3{,}2$: không khí nở vì nhiệt nhiều hơn rượu khoảng $3$ lần.',
      ],
      answer:
        'Rượu tăng $116\\ \\text{cm}^3$, không khí tăng $366\\ \\text{cm}^3$; chất khí nở nhiều hơn.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Sắp xếp sự nở vì nhiệt từ nhiều tới ít, cách nào đúng?',
      options: ['Rắn, lỏng, khí', 'Lỏng, khí, rắn', 'Khí, lỏng, rắn', 'Khí, rắn, lỏng'],
      answer: 2,
      hints: ['Chỉ hơi ấm bàn tay đã làm không khí trong bình nở ra thấy rõ.'],
      solution: 'Chất khí nở vì nhiệt nhiều nhất, rồi đến chất lỏng, chất rắn nở ít nhất.',
    },
    {
      type: 'choice',
      prompt:
        'Ba thanh nhôm, đồng, sắt cùng chiều dài ở nhiệt độ phòng được nung nóng như nhau. Thanh nào dài nhất?',
      options: ['Thanh sắt', 'Thanh đồng', 'Thanh nhôm', 'Ba thanh dài bằng nhau'],
      answer: 2,
      hints: ['Các chất rắn khác nhau nở vì nhiệt khác nhau; xem bảng độ dài thêm.'],
      solution:
        'Nhôm nở vì nhiệt nhiều nhất, sau đó là đồng, rồi đến sắt, nên thanh nhôm dài nhất.',
    },
    {
      type: 'choice',
      prompt: 'Băng kép đồng – thép bị hơ nóng sẽ',
      options: [
        'cong về phía thanh đồng',
        'cong về phía thanh thép',
        'vẫn thẳng nhưng dài ra',
        'xoắn lại',
      ],
      answer: 1,
      hints: ['Thanh nào nở nhiều hơn sẽ nằm ở mặt ngoài của chỗ cong?'],
      solution:
        'Đồng nở vì nhiệt nhiều hơn thép, thanh đồng dài hơn nằm ở mặt ngoài, nên băng kép cong về phía thanh thép.',
    },
    {
      type: 'number',
      prompt:
        'Mỗi mét thép dài thêm $0{,}012\\ \\text{mm}$ khi nóng thêm $1\\ ^\\circ\\text{C}$. Một thanh ray dài $12{,}5\\ \\text{m}$ nóng từ $20\\ ^\\circ\\text{C}$ lên $40\\ ^\\circ\\text{C}$ thì dài thêm bao nhiêu milimét?',
      answer: 3,
      unit: 'mm',
      hints: [
        'Tính độ tăng nhiệt độ trước.',
        'Nhân độ dài thêm của $1\\ \\text{m}$ khi tăng $1\\ ^\\circ\\text{C}$ với số mét và số độ.',
      ],
      solution:
        'Độ tăng nhiệt độ $40 - 20 = 20\\ ^\\circ\\text{C}$. Độ dài thêm: $0{,}012 \\cdot 12{,}5 \\cdot 20 = 3\\ \\text{mm}$.',
    },
    {
      type: 'number',
      prompt:
        'Tháp Eiffel bằng thép cao $324\\ \\text{m}$. Mỗi mét thép dài thêm $0{,}012\\ \\text{mm}$ khi nóng thêm $1\\ ^\\circ\\text{C}$. Nếu nhiệt độ của tháp vào mùa hè cao hơn mùa đông $20\\ ^\\circ\\text{C}$ thì tháp cao thêm khoảng bao nhiêu xăng-ti-mét? (làm tròn đến một chữ số thập phân)',
      answer: 7.8,
      tolerance: 0.05,
      unit: 'cm',
      hints: [
        'Tính độ cao thêm theo milimét trước: $0{,}012 \\cdot 324 \\cdot 20$.',
        '$1\\ \\text{cm} = 10\\ \\text{mm}$.',
      ],
      solution:
        'Độ cao thêm: $0{,}012 \\cdot 324 \\cdot 20 = 77{,}76\\ \\text{mm} \\approx 7{,}8\\ \\text{cm}$.',
    },
    {
      type: 'number',
      prompt:
        'Theo bảng, $1\\,000\\ \\text{cm}^3$ rượu nóng thêm $50\\ ^\\circ\\text{C}$ thì thể tích tăng $58\\ \\text{cm}^3$. Hỏi $500\\ \\text{cm}^3$ rượu nóng thêm $50\\ ^\\circ\\text{C}$ thì thể tích tăng bao nhiêu $\\text{cm}^3$?',
      answer: 29,
      unit: 'cm³',
      hints: ['$500\\ \\text{cm}^3$ bằng một nửa $1\\,000\\ \\text{cm}^3$.'],
      solution: '$500\\ \\text{cm}^3$ rượu tăng $58 : 2 = 29\\ \\text{cm}^3$.',
    },
    {
      type: 'choice',
      prompt: 'Vì sao chỗ nối hai đầu thanh ray xe lửa lại để một khe hở?',
      options: [
        'Để tiết kiệm thép',
        'Để khi trời nóng, ray nở ra không bị cản trở, tránh cong vênh',
        'Để nước mưa thoát đi',
        'Để tàu chạy êm hơn',
      ],
      answer: 1,
      hints: ['Ray thép dài ra khi nóng lên. Nếu không có chỗ để dài ra thì sao?'],
      solution:
        'Trời nóng, thanh ray nở dài ra. Khe hở để ray nở ra mà không bị cản trở; nếu không có khe hở, hai đầu ray ép vào nhau gây lực rất lớn làm ray cong vênh.',
    },
    {
      type: 'multi',
      prompt: 'Trường hợp nào là ứng dụng có ích của sự nở vì nhiệt?',
      options: [
        'Nhiệt kế rượu dùng để đo nhiệt độ',
        'Băng kép tự động ngắt điện trong bàn là',
        'Đường bê tông bị nứt vào ngày nắng nóng',
        'Hơ nóng cổ lọ để mở nút thủy tinh bị kẹt',
        'Ống dẫn hơi nóng bị vỡ do không có đoạn uốn cong',
      ],
      answers: [0, 1, 3],
      hints: ['Phân biệt ứng dụng (có ích) và tác hại cần phòng tránh.'],
      solution:
        'Nhiệt kế, băng kép, hơ nóng cổ lọ là ứng dụng có ích. Bê tông bị nứt, ống dẫn bị vỡ là tác hại của sự nở vì nhiệt cần phòng tránh.',
    },
    {
      type: 'choice',
      prompt: 'Một quả bóng bàn bị bẹp (không thủng) được nhúng vào nước nóng thì phồng lên vì',
      options: [
        'vỏ quả bóng co lại',
        'nước nóng chui vào trong quả bóng',
        'không khí trong quả bóng nóng lên, nở ra',
        'khối lượng không khí trong quả bóng tăng',
      ],
      answer: 2,
      hints: ['Chất khí nở vì nhiệt rất nhiều.'],
      solution:
        'Không khí trong quả bóng nóng lên, nở ra, đẩy vỏ bóng phồng trở lại. Khối lượng không khí bên trong không đổi.',
    },
    {
      type: 'choice',
      prompt: 'Vì sao khi đun nước không nên đổ đầy ấm?',
      options: [
        'Vì nước nóng lên nở ra, có thể tràn ra ngoài',
        'Vì nước nóng lên co lại',
        'Vì ấm co lại khi nóng',
        'Vì nước đầy thì không sôi được',
      ],
      answer: 0,
      hints: ['Chất lỏng thay đổi thể tích thế nào khi nóng lên?'],
      solution:
        'Nước nóng lên thì nở ra (nở nhiều hơn ấm kim loại), nên nếu đổ đầy, nước sẽ tràn ra ngoài khi đun.',
    },
  ],
  takeaways: [
    'Chất rắn, chất lỏng, chất khí đều nở ra khi nóng lên, co lại khi lạnh đi.',
    'Chất khí nở vì nhiệt nhiều hơn chất lỏng, chất lỏng nở nhiều hơn chất rắn; các chất khí khác nhau nở như nhau, các chất rắn, chất lỏng khác nhau nở khác nhau.',
    'Băng kép (đồng – thép) cong về phía thép khi nóng, về phía đồng khi lạnh; dùng để tự động đóng ngắt mạch điện.',
    'Sự nở vì nhiệt bị ngăn cản gây ra lực rất lớn; phòng tránh bằng khe hở ở ray, gối đỡ con lăn ở cầu, đoạn uốn cong ở ống dẫn.',
  ],
};
