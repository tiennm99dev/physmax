/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Vật lí học phát triển từ quan sát và suy luận của thời cổ đại, qua vật lí thực nghiệm và vật lí cổ điển, đến cuộc khủng hoảng cuối thế kỉ XIX và sự ra đời của vật lí hiện đại.',
  intro:
    'Thả cùng lúc một cục tẩy và một tờ giấy phẳng: cục tẩy chạm sàn trước. Suốt gần $2\\,000$ năm, người ta tin điều đó chứng tỏ vật nặng rơi nhanh hơn vật nhẹ. Vì sao quan niệm này bị bác bỏ, và từ đó vật lí học đã thay đổi như thế nào?',
  objectives: [
    'Nêu được sự ra đời và những thành tựu ban đầu của vật lí thực nghiệm.',
    'Nêu được sơ lược vai trò của cơ học Newton đối với sự phát triển của vật lí học.',
    'Liệt kê được một số nhánh nghiên cứu chính của vật lí cổ điển.',
    'Nêu được sự khủng hoảng của vật lí cuối thế kỉ XIX, tiền đề cho sự ra đời của vật lí hiện đại.',
    'Kể được một số lĩnh vực chính của vật lí hiện đại.',
  ],
  sections: [
    {
      heading: 'Sự ra đời và những thành tựu ban đầu của vật lí thực nghiệm',
      blocks: [
        {
          type: 'p',
          text: 'Các nhà triết học tự nhiên Hy Lạp cổ đại tìm hiểu thế giới chủ yếu bằng quan sát và suy luận chủ quan. Aristotle ($384$–$322$ TCN) xây dựng một hệ thống tri thức, đi từ những quan sát cụ thể để khái quát tính chất chung của tự nhiên. Ông cho rằng vật nặng rơi nhanh hơn vật nhẹ.',
        },
        {
          type: 'p',
          text: 'Galilei ($1564$–$1642$) làm khác: ông đề ra lí thuyết từ việc phân tích thí nghiệm, rồi thiết kế thí nghiệm để kiểm tra. Theo câu chuyện thường được kể, ông thả từ tháp nghiêng Pisa hai quả cầu kim loại, quả nặng gấp khoảng $10$ lần quả nhẹ, và chúng chạm đất gần như cùng lúc. Ông cũng dùng máng nghiêng để đo chuyển động nhanh dần của viên bi.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Vật lí thực nghiệm',
          text: 'Vật lí học dùng phương pháp thực nghiệm để tìm ra các quy luật, định luật và để kiểm chứng lí thuyết. Vật lí thường bước sang giai đoạn mới khi một hiện tượng mới được phát hiện, hoặc khi thí nghiệm xác nhận dự đoán của một lí thuyết mới.',
        },
        {
          type: 'table',
          caption: 'Một số thành tựu ban đầu của vật lí thực nghiệm',
          head: ['Nhà khoa học', 'Thành tựu', 'Ý nghĩa'],
          rows: [
            [
              'Galilei ($1609$)',
              'Chế tạo kính thiên văn',
              'Mở đầu việc quan sát vũ trụ bằng dụng cụ',
            ],
            [
              'Newton',
              'Tán sắc ánh sáng qua lăng kính',
              'Ánh sáng trắng gồm nhiều ánh sáng đơn sắc',
            ],
            ['Young ($1801$)', 'Giao thoa ánh sáng', 'Ánh sáng có tính chất sóng'],
            ['Faraday ($1831$)', 'Cảm ứng điện từ', 'Cơ sở của máy phát điện xoay chiều'],
          ],
        },
        {
          type: 'p',
          text: 'Thực nghiệm kéo theo những thay đổi lớn trong sản xuất. Nghiên cứu về nhiệt là cơ sở của máy hơi nước, mở đầu cuộc cách mạng công nghiệp lần thứ nhất. Máy phát điện tạo dòng điện hiệu quả hơn pin điện hoá; động cơ điện dần thay động cơ hơi nước, tạo điều kiện cho dây chuyền sản xuất và truyền tải điện đi xa.',
        },
      ],
    },
    {
      heading: 'Cơ học Newton và các nhánh của vật lí cổ điển',
      blocks: [
        {
          type: 'p',
          text: 'Newton ($1642$–$1727$) xây dựng hệ thống các định luật chuyển động và định luật vạn vật hấp dẫn, đặt nền tảng lí luận và toán học cho cơ học cổ điển. Lần đầu tiên, cùng một hệ thống định luật giải thích được cả quả táo rơi và chuyển động của các hành tinh. Phương pháp của ông, kết hợp thực nghiệm và toán học, trở thành khuôn mẫu cho các nhánh vật lí sau này.',
        },
        {
          type: 'table',
          caption: 'Các nhánh chính của vật lí cổ điển',
          head: ['Nhánh', 'Nghiên cứu', 'Đóng góp'],
          rows: [
            [
              'Cơ học (vật rắn, chất lưu, âm học)',
              'Chuyển động và tương tác của các vật; chất lỏng, chất khí; sóng âm',
              'Công trình xây dựng, máy bay, chống ồn',
            ],
            ['Nhiệt học', 'Nhiệt, nhiệt độ, sự chuyển hoá nhiệt thành công', 'Động cơ nhiệt'],
            [
              'Điện từ học',
              'Điện tích, dòng điện, từ trường, sóng điện từ',
              'Máy phát điện, vô tuyến',
            ],
            ['Quang học', 'Sự truyền và tính chất của ánh sáng', 'Kính thiên văn, kính hiển vi'],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Vì sao âm học thuộc cơ học?',
          text: 'Âm do vật dao động phát ra và truyền đi trong môi trường rắn, lỏng, khí nhờ dao động của các phần tử môi trường. Bản chất đó là cơ học, nên âm học được coi là một nhánh của cơ học.',
        },
        {
          type: 'p',
          text: 'Hãy thử xếp các thành tựu dưới đây vào đúng nhánh. Mỗi lần đặt thẻ, em sẽ thấy lí do.',
        },
        { type: 'widget', name: 'nhanh-co-dien' },
      ],
    },
    {
      heading: 'Khủng hoảng cuối thế kỉ XIX và sự ra đời của vật lí hiện đại',
      blocks: [
        {
          type: 'p',
          text: 'Cuối thế kỉ XIX, nhiều người nghĩ vật lí đã gần như hoàn chỉnh. Nhưng một loạt phát hiện đã không thể giải thích bằng vật lí cổ điển:',
        },
        {
          type: 'list',
          items: [
            'Tia X (Röntgen, $1895$) và hiện tượng phóng xạ (Becquerel, $1896$): những bức xạ chưa từng được dự đoán.',
            'Electron (Thomson, $1897$): nguyên tử không phải là hạt nhỏ nhất, không thể phân chia như quan niệm trước đó.',
            'Bức xạ nhiệt của vật đen: lí thuyết của Maxwell coi ánh sáng là sóng điện từ, nhưng khi áp dụng cho bức xạ nhiệt thì dẫn đến cường độ bức xạ lớn vô hạn ở vùng bước sóng ngắn, trái với thí nghiệm. Khó khăn này được gọi là "tai biến tử ngoại".',
          ],
        },
        {
          type: 'p',
          text: 'Từ cuộc khủng hoảng đó, hai trụ cột của vật lí hiện đại ra đời vào đầu thế kỉ XX.',
        },
        {
          type: 'list',
          items: [
            'Thuyết lượng tử: năm $1900$, Planck cho rằng năng lượng được phát ra theo từng phần gián đoạn, giải thích được bức xạ của vật đen. Về sau, cơ học lượng tử mô tả thế giới nguyên tử và các hạt vi mô.',
            'Thuyết tương đối: Einstein đưa ra thuyết tương đối hẹp năm $1905$ và thuyết tương đối rộng năm $1915$, làm thay đổi cách hiểu về không gian và thời gian. Các dự đoán của thuyết được thực nghiệm xác nhận và được dùng trong kĩ thuật, chẳng hạn trong hệ thống định vị toàn cầu GPS.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Vật lí hiện đại không xoá bỏ vật lí cổ điển',
          text: 'Cơ học Newton vẫn cho kết quả rất chính xác với các vật vĩ mô có tốc độ nhỏ hơn nhiều so với tốc độ ánh sáng. Vật lí hiện đại mở rộng phạm vi sang thế giới vi mô và các tốc độ rất lớn.',
        },
      ],
    },
    {
      heading: 'Một số lĩnh vực chính của vật lí hiện đại',
      blocks: [
        {
          type: 'p',
          text: 'Trên nền tảng lượng tử và tương đối, vật lí hiện đại phát triển thành nhiều lĩnh vực: vật lí nguyên tử và hạt nhân, vật lí thiên văn và vũ trụ học, vật lí hạt cơ bản và năng lượng cao, vật lí chất rắn và bán dẫn, vật lí nano, vật lí laser, vật lí y sinh. Bài học sau sẽ giới thiệu kĩ hơn một số lĩnh vực trong đó.',
        },
        {
          type: 'table',
          caption: 'So sánh ba giai đoạn phát triển của vật lí',
          head: ['Giai đoạn', 'Thời gian', 'Phương pháp chính', 'Tiêu biểu'],
          rows: [
            [
              'Tiền vật lí',
              'Từ thời cổ đại đến trước thế kỉ XVII',
              'Quan sát, suy luận chủ quan',
              'Aristotle',
            ],
            [
              'Vật lí cổ điển',
              'Từ thế kỉ XVII đến cuối thế kỉ XIX',
              'Thực nghiệm kết hợp toán học',
              'Galilei, Newton, Faraday, Maxwell',
            ],
            [
              'Vật lí hiện đại',
              'Từ cuối thế kỉ XIX đến nay',
              'Thực nghiệm và lí thuyết về thế giới vi mô, tốc độ rất lớn, vũ trụ',
              'Planck, Einstein',
            ],
          ],
        },
      ],
    },
    {
      heading: 'Dự án: Dòng thời gian của một nhánh vật lí',
      project: true,
      blocks: [
        {
          type: 'p',
          text: 'Mục tiêu: trình bày được sự phát triển của một nhánh vật lí qua các thời kì và vai trò của nó đối với đời sống, sản xuất. Dụng cụ: sách báo hoặc internet, giấy khổ lớn hoặc phần mềm trình chiếu; một cục tẩy và hai tờ giấy giống nhau để làm lại thí nghiệm rơi.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Làm thí nghiệm mở đầu: thả cục tẩy cùng tờ giấy phẳng, rồi cùng tờ giấy đã vo tròn. Ghi lại kết quả, giải thích vì sao kết quả thay đổi.',
            'Theo nhóm, chọn một nhánh: cơ học, nhiệt học, điện từ học, quang học hoặc một lĩnh vực của vật lí hiện đại.',
            'Tìm ít nhất $6$ mốc, mỗi mốc gồm năm, tên nhà khoa học, thành tựu. Ghi rõ nguồn và kiểm tra mỗi mốc ở ít nhất hai nguồn.',
            'Vẽ dòng thời gian theo đúng thứ tự, tô màu theo ba giai đoạn của vật lí.',
            'Chọn một mốc đã tạo ra thay đổi lớn và nêu một thiết bị hoặc ngành nghề ngày nay dựa trên mốc đó.',
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Báo cáo',
          text: 'Trình bày dòng thời gian trong $5$ phút. Trả lời được ba câu hỏi: nhánh này dùng phương pháp nghiên cứu nào, mốc nào là bước ngoặt và vì sao, thành tựu của nhánh đã thay đổi đời sống như thế nào. Nộp kèm danh sách nguồn tham khảo.',
        },
      ],
    },
  ],
  explore: {
    title: 'Dòng thời gian của vật lí',
    instruction:
      'Lọc theo giai đoạn và chạm vào một mốc để xem nhà khoa học đã làm gì. Khi đã nắm được thứ tự, chuyển sang "Đố thứ tự" và chọn mốc xảy ra trước trong mỗi cặp.',
  },
  examples: [
    {
      problem:
        'Thả cùng lúc một cục tẩy và một tờ giấy phẳng, cục tẩy chạm sàn trước. Bạn Minh kết luận: "Aristotle đúng, vật nặng rơi nhanh hơn." Hãy nêu một thí nghiệm đơn giản để kiểm tra kết luận này và rút ra nhận xét.',
      steps: [
        'Muốn biết khối lượng có quyết định thời gian rơi không, phải giữ nguyên khối lượng và thay đổi yếu tố khác.',
        'Lấy hai tờ giấy giống hệt nhau, vo tròn một tờ, rồi thả cùng lúc từ cùng độ cao: khối lượng bằng nhau nhưng tờ vo tròn chạm sàn trước.',
        'Tiếp tục thả tờ giấy vo tròn cùng cục tẩy: hai vật khối lượng khác nhau chạm sàn gần như cùng lúc.',
        'Vậy khác biệt ở thí nghiệm đầu chủ yếu do lực cản của không khí, không phải do khối lượng.',
      ],
      answer:
        'Kết luận của bạn Minh chưa đúng. Đây là cách làm của vật lí thực nghiệm: dùng thí nghiệm có kiểm soát để kiểm tra một giả thuyết.',
    },
    {
      problem:
        'Lí thuyết của Maxwell cho biết sóng điện từ truyền với tốc độ khoảng $300\\,000$ km/s. Mặt Trời cách Trái Đất khoảng $150\\,000\\,000$ km. Ánh sáng từ Mặt Trời tới Trái Đất mất bao lâu?',
      steps: [
        'Ánh sáng là sóng điện từ, chuyển động với tốc độ không đổi nên $t = \\dfrac{s}{v}$.',
        '$t = \\dfrac{150\\,000\\,000}{300\\,000} = 500$ s.',
        'Đổi đơn vị: $500$ s $= 8$ phút $20$ giây.',
      ],
      answer: 'Ánh sáng đi từ Mặt Trời tới Trái Đất mất khoảng $500$ s, tức $8$ phút $20$ giây.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt:
        'Các nhà triết học tự nhiên Hy Lạp cổ đại chủ yếu dùng phương pháp nào để nghiên cứu thế giới tự nhiên?',
      options: [
        'Quan sát và suy luận chủ quan',
        'Thí nghiệm có kiểm soát với dụng cụ đo chính xác',
        'Mô phỏng bằng máy tính',
        'Tính toán bằng các định luật của Newton',
      ],
      answer: 0,
      hints: [
        'Thời đó chưa có dụng cụ đo chính xác và thí nghiệm chưa được dùng một cách hệ thống.',
      ],
      solution:
        'Họ tìm hiểu tự nhiên chủ yếu bằng quan sát và suy luận chủ quan. Phương pháp thực nghiệm chỉ được dùng một cách hệ thống từ thời Galilei.',
    },
    {
      type: 'choice',
      prompt:
        'Nhà khoa học nào đã dùng thí nghiệm để bác bỏ quan niệm "vật nặng rơi nhanh hơn vật nhẹ" của Aristotle?',
      options: ['Galilei', 'Newton', 'Faraday', 'Einstein'],
      answer: 0,
      hints: ['Nhớ đến thí nghiệm ở tháp nghiêng Pisa và viên bi lăn trên máng nghiêng.'],
      solution:
        'Galilei dùng thí nghiệm thả rơi và thí nghiệm máng nghiêng để kiểm tra, từ đó bác bỏ quan niệm của Aristotle.',
    },
    {
      type: 'order',
      prompt: 'Sắp xếp các mốc sau theo đúng thứ tự thời gian, từ sớm đến muộn.',
      items: [
        'Planck đưa ra thuyết lượng tử',
        'Newton công bố các định luật chuyển động',
        'Röntgen phát hiện tia X',
        'Faraday phát hiện cảm ứng điện từ',
      ],
      answer: [1, 3, 2, 0],
      hints: [
        'Mốc sớm nhất thuộc thế kỉ XVII.',
        'Hai mốc cuối cùng rất gần nhau, ở khoảng chuyển giao thế kỉ XIX và XX.',
      ],
      solution: 'Newton ($1687$), Faraday ($1831$), Röntgen ($1895$), Planck ($1900$).',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi nhà khoa học với thành tựu của mình.',
      left: ['Young', 'Faraday', 'Thomson', 'Einstein'],
      right: [
        'Giao thoa ánh sáng',
        'Cảm ứng điện từ',
        'Phát hiện electron',
        'Thuyết tương đối',
        'Ba định luật về hành tinh',
      ],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['Ba định luật về hành tinh là của Kepler, không có tên ở cột bên trái.'],
      solution:
        'Young: giao thoa ánh sáng. Faraday: cảm ứng điện từ. Thomson: phát hiện electron. Einstein: thuyết tương đối.',
    },
    {
      type: 'multi',
      prompt: 'Những phát hiện nào góp phần tạo nên sự khủng hoảng của vật lí cuối thế kỉ XIX?',
      options: [
        'Tia X',
        'Hiện tượng phóng xạ',
        'Electron',
        'Ba định luật Kepler',
        'Lực đẩy Archimedes',
      ],
      answers: [0, 1, 2],
      hints: [
        'Hãy loại những kết quả đã có từ trước thế kỉ XIX.',
        'Các phát hiện cần chọn đều xuất hiện trong khoảng từ năm $1895$ đến năm $1897$.',
      ],
      solution:
        'Tia X ($1895$), phóng xạ ($1896$) và electron ($1897$) không giải thích được bằng vật lí cổ điển. Định luật Kepler và lực đẩy Archimedes thuộc cơ học cổ điển.',
    },
    {
      type: 'choice',
      prompt:
        'Phát minh nào dựa trên nghiên cứu về nhiệt và mở đầu cuộc cách mạng công nghiệp lần thứ nhất?',
      options: ['Máy hơi nước', 'Máy phát điện', 'Transistor', 'Laser'],
      answer: 0,
      hints: [
        'Cuộc cách mạng này diễn ra vào cuối thế kỉ XVIII, khi chưa có điện năng công nghiệp.',
      ],
      solution:
        'Máy hơi nước biến nhiệt thành công cơ học, mở đầu cuộc cách mạng công nghiệp lần thứ nhất. Máy phát điện gắn với cuộc cách mạng lần thứ hai; transistor và laser ra đời ở thế kỉ XX.',
    },
    {
      type: 'choice',
      prompt: 'Vì sao âm học được coi là một nhánh của cơ học?',
      options: [
        'Vì âm do vật dao động phát ra và truyền đi nhờ dao động của các phần tử môi trường',
        'Vì âm là một loại sóng điện từ',
        'Vì âm truyền được trong chân không',
        'Vì âm chỉ xuất hiện khi có dòng điện',
      ],
      answer: 0,
      hints: ['Hãy nghĩ xem điều gì xảy ra ở dây đàn và trong không khí khi có âm thanh.'],
      solution:
        'Âm do vật dao động phát ra và truyền qua môi trường rắn, lỏng, khí nhờ dao động của các phần tử môi trường, nên bản chất là cơ học. Âm không truyền được trong chân không và không phải sóng điện từ.',
    },
    {
      type: 'text',
      prompt:
        'Năm $1900$, Planck đưa ra một thuyết để giải thích bức xạ nhiệt của vật đen. Đó là thuyết gì?',
      accept: ['lượng tử', 'thuyết lượng tử', 'lượng tử năng lượng', 'thuyết lượng tử năng lượng'],
      hints: ['Theo thuyết này, năng lượng được phát ra theo từng phần gián đoạn.'],
      solution:
        'Đó là thuyết lượng tử (năng lượng được phát ra theo từng lượng tử), một trong hai trụ cột của vật lí hiện đại.',
    },
    {
      type: 'number',
      prompt:
        'Trong thí nghiệm máng nghiêng, quãng đường viên bi đi được tỉ lệ với bình phương thời gian: $s = kt^2$. Sau $1$ s viên bi đi được $0{,}2$ m. Sau $3$ s, viên bi đi được bao nhiêu mét kể từ lúc bắt đầu?',
      answer: 1.8,
      tolerance: 0.001,
      unit: 'm',
      hints: [
        'Tìm $k$ từ dữ kiện sau $1$ s.',
        'Thời gian tăng $3$ lần thì quãng đường tăng $3^2$ lần.',
      ],
      solution: '$k = 0{,}2\\ \\text{m/s}^2$. Sau $3$ s: $s = 0{,}2 \\cdot 3^2 = 1{,}8$ m.',
    },
    {
      type: 'number',
      prompt:
        'Mặt Trăng cách Trái Đất khoảng $384\\,000$ km, ánh sáng truyền với tốc độ $300\\,000$ km/s. Ánh sáng đi từ Mặt Trăng đến Trái Đất mất bao nhiêu giây?',
      answer: 1.28,
      tolerance: 0.01,
      unit: 's',
      hints: ['Dùng $t = \\dfrac{s}{v}$ với $s$ và $v$ cùng đơn vị độ dài.'],
      solution: '$t = \\dfrac{384\\,000}{300\\,000} = 1{,}28$ s.',
    },
    {
      type: 'choice',
      prompt: 'Phát biểu nào đúng về quan hệ giữa vật lí cổ điển và vật lí hiện đại?',
      options: [
        'Cơ học Newton vẫn rất chính xác với vật vĩ mô có tốc độ nhỏ hơn nhiều so với tốc độ ánh sáng',
        'Vật lí hiện đại đã chứng minh mọi định luật của vật lí cổ điển đều sai',
        'Vật lí hiện đại chỉ nghiên cứu các thiên thể ở rất xa',
        'Vật lí hiện đại ra đời trước cơ học Newton',
      ],
      answer: 0,
      hints: ['Kĩ sư ngày nay vẫn dùng các định luật Newton để tính toán cầu, ô tô, máy bay.'],
      solution:
        'Cơ học Newton vẫn đúng trong phạm vi vật vĩ mô, tốc độ nhỏ so với tốc độ ánh sáng. Vật lí hiện đại mở rộng phạm vi nghiên cứu sang thế giới vi mô và tốc độ rất lớn.',
    },
  ],
  takeaways: [
    'Vật lí phát triển qua ba giai đoạn: tiền vật lí, vật lí cổ điển và vật lí hiện đại.',
    'Galilei đưa thực nghiệm vào nghiên cứu; Newton đặt nền tảng lí luận và toán học cho cơ học cổ điển.',
    'Các nhánh chính của vật lí cổ điển: cơ học, nhiệt học, điện từ học, quang học.',
    'Tia X, phóng xạ, electron và bức xạ của vật đen đã tạo nên khủng hoảng cuối thế kỉ XIX.',
    'Thuyết lượng tử và thuyết tương đối là hai trụ cột của vật lí hiện đại.',
  ],
};
