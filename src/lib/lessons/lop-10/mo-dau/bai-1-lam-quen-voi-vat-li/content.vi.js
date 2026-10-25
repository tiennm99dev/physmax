/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Vật lí nghiên cứu các dạng vận động của vật chất và năng lượng; bài học giới thiệu các lĩnh vực của vật lí, phương pháp thực nghiệm và phương pháp lí thuyết, cùng vai trò của vật lí trong các cuộc cách mạng công nghiệp.',
  intro:
    'Vì sao quả táo rơi xuống đất, vì sao bầu trời có màu xanh, vì sao điện thoại nhận được sóng từ một trạm cách xa hàng cây số? Vật lí đi tìm quy luật đằng sau những hiện tượng như thế. Trong bài này, em làm quen với đối tượng nghiên cứu của vật lí, cách các nhà vật lí tìm ra quy luật và vai trò của vật lí trong đời sống, kĩ thuật và công nghệ.',
  objectives: [
    'Nêu được đối tượng nghiên cứu của vật lí và mục tiêu của môn Vật lí.',
    'Kể được các giai đoạn phát triển của vật lí và một số lĩnh vực nghiên cứu chính.',
    'Phân biệt phương pháp thực nghiệm và phương pháp lí thuyết; nêu được các loại mô hình.',
    'Nêu được các bước của quá trình tìm hiểu thế giới tự nhiên dưới góc độ vật lí.',
    'Lấy được ví dụ về ảnh hưởng của vật lí đối với khoa học, kĩ thuật và công nghệ.',
  ],
  sections: [
    {
      heading: 'Đối tượng nghiên cứu và mục tiêu của môn Vật lí',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Đối tượng nghiên cứu của vật lí',
          text: 'Vật lí là môn khoa học tự nhiên có đối tượng nghiên cứu là các dạng vận động của vật chất và năng lượng. Vật lí tìm ra các quy luật chi phối những vận động đó, từ chuyển động của hạt nhỏ hơn nguyên tử đến chuyển động của các thiên hà.',
        },
        {
          type: 'p',
          text: 'Tuỳ theo dạng vận động được nghiên cứu, vật lí chia thành nhiều lĩnh vực. Các lĩnh vực này liên quan chặt chẽ với nhau và với các ngành khoa học khác như hoá học, sinh học, thiên văn học.',
        },
        {
          type: 'table',
          caption: 'Một số lĩnh vực nghiên cứu của vật lí',
          head: ['Lĩnh vực', 'Nghiên cứu', 'Ví dụ'],
          rows: [
            ['Cơ học', 'Chuyển động và tương tác của các vật', 'Chuyển động của ô tô, vệ tinh'],
            ['Nhiệt học', 'Nhiệt độ, nội năng và sự truyền nhiệt', 'Động cơ nhiệt, tủ lạnh'],
            ['Điện học, từ học', 'Điện tích, dòng điện, từ trường', 'Máy phát điện, nam châm điện'],
            ['Quang học', 'Ánh sáng và tương tác của ánh sáng với vật chất', 'Kính lúp, cáp quang'],
            ['Vật lí hạt nhân', 'Cấu trúc và biến đổi của hạt nhân', 'Nhà máy điện hạt nhân'],
          ],
        },
        {
          type: 'p',
          text: 'Mục tiêu của môn Vật lí là giúp em có được những kiến thức, kĩ năng cơ bản về vật lí; vận dụng chúng để khám phá, giải quyết các vấn đề trong học tập và đời sống; từ đó hình thành và phát triển năng lực vật lí, có thái độ tôn trọng các quy luật của tự nhiên và bảo vệ môi trường.',
        },
      ],
    },
    {
      heading: 'Sơ lược quá trình phát triển của vật lí',
      blocks: [
        {
          type: 'list',
          ordered: true,
          items: [
            'Tiền vật lí (từ thời cổ đại đến trước thế kỉ XVII): các nhà triết học tìm hiểu tự nhiên chủ yếu bằng quan sát và suy luận chủ quan. Aristotle cho rằng vật nặng rơi nhanh hơn vật nhẹ.',
            'Vật lí cổ điển (từ thế kỉ XVII đến cuối thế kỉ XIX): Galilei đưa thí nghiệm vào nghiên cứu; Newton xây dựng cơ học; nhiệt học và điện từ học (Faraday, Maxwell) ra đời.',
            'Vật lí hiện đại (từ cuối thế kỉ XIX đến nay): thuyết tương đối của Einstein và thuyết lượng tử mở ra thế giới của vận tốc rất lớn, của nguyên tử và hạt nhân.',
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Thí nghiệm làm thay đổi cách nghĩ',
          text: 'Galilei thả các vật nặng nhẹ khác nhau và cho bi lăn trên máng nghiêng, đo quãng đường theo thời gian. Kết quả bác bỏ ý kiến của Aristotle: khi bỏ qua sức cản của không khí, mọi vật rơi nhanh như nhau, và quãng đường đi được tỉ lệ với bình phương thời gian.',
        },
      ],
    },
    {
      heading: 'Phương pháp nghiên cứu vật lí',
      blocks: [
        {
          type: 'p',
          text: 'Các nhà vật lí dùng hai phương pháp bổ sung cho nhau: phương pháp thực nghiệm và phương pháp lí thuyết.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Phương pháp thực nghiệm',
          text: 'Dùng thí nghiệm để phát hiện kết quả mới giúp kiểm chứng, hoàn thiện, bổ sung hay bác bỏ giả thuyết nào đó. Kết quả mới này cần được giải thích bằng lí thuyết đã biết hoặc lí thuyết mới.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Phương pháp lí thuyết',
          text: 'Dùng ngôn ngữ toán học và suy luận lí thuyết để phát hiện một kết quả mới. Kết quả mới này cần được kiểm chứng bằng thực nghiệm.',
        },
        {
          type: 'p',
          text: 'Để nghiên cứu một hiện tượng phức tạp, người ta thay vật thật bằng một mô hình giữ lại những đặc điểm chính. Có ba loại mô hình thường gặp:',
        },
        {
          type: 'list',
          items: [
            'Mô hình vật chất: vật thật thu nhỏ hay phóng to, như quả địa cầu, mô hình nguyên tử bằng nhựa.',
            'Mô hình lí thuyết: hình ảnh đơn giản hoá, như coi ô tô là một chất điểm hay ánh sáng là các tia sáng.',
            'Mô hình toán học: công thức, phương trình hay đồ thị mô tả hiện tượng, như $s = k t^2$ cho viên bi lăn trên máng nghiêng.',
          ],
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Quá trình tìm hiểu thế giới tự nhiên dưới góc độ vật lí',
          text: 'Quan sát hiện tượng → Đề xuất vấn đề → Hình thành giả thuyết → Kiểm tra giả thuyết (bằng thí nghiệm hoặc suy luận) → Rút ra kết luận. Nếu giả thuyết bị bác bỏ, ta quay lại đề xuất giả thuyết mới.',
        },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Một giả thuyết dù hợp lí đến đâu cũng chỉ được chấp nhận khi kết quả kiểm chứng phù hợp với nó. Một kết quả thí nghiệm đáng tin cậy trái với giả thuyết là đủ để bác bỏ giả thuyết đó.',
        },
      ],
    },
    {
      heading: 'Vai trò của vật lí đối với khoa học, kĩ thuật và công nghệ',
      blocks: [
        {
          type: 'p',
          text: 'Mỗi cuộc cách mạng công nghiệp đều dựa trên những phát minh vật lí. Chọn từng cuộc cách mạng dưới đây để xem nền tảng vật lí của nó.',
        },
        { type: 'widget', name: 'cach-mang-cong-nghiep' },
        {
          type: 'p',
          text: 'Vật lí còn là cơ sở của nhiều ngành: y học (chụp X-quang, cộng hưởng từ, xạ trị), nông nghiệp (cảm biến, chiếu xạ bảo quản), thông tin liên lạc (sóng vô tuyến, cáp quang) và nghiên cứu khoa học (kính hiển vi điện tử, kính thiên văn).',
        },
      ],
    },
  ],
  explore: {
    title: 'Kiểm tra giả thuyết như Galilei',
    instruction:
      'Một viên bi lăn không vận tốc đầu trên máng nghiêng. Chọn giả thuyết về quan hệ giữa quãng đường $s$ và thời gian $t$, tiến hành thí nghiệm ảo để có số liệu, rồi chỉnh hệ số $k$ (hoặc nhấn "Tìm k khớp nhất") xem đường giả thuyết có đi qua các điểm đo không. Nhìn cột $s/t$ và $s/t^2$: cột nào gần như không đổi?',
  },
  examples: [
    {
      problem:
        'Bạn An thấy chiếc lá rơi chậm hơn hòn sỏi và cho rằng "vật nặng rơi nhanh hơn vật nhẹ". Hãy dùng các bước tìm hiểu thế giới tự nhiên để kiểm tra ý kiến này.',
      steps: [
        'Quan sát hiện tượng: lá rơi chậm hơn sỏi.',
        'Đề xuất vấn đề: thời gian rơi có phụ thuộc vào khối lượng của vật không?',
        'Hình thành giả thuyết: vật nặng hơn rơi nhanh hơn.',
        'Kiểm tra giả thuyết: vo tròn tờ giấy thành viên nhỏ rồi thả cùng lúc với tờ giấy phẳng giống hệt (cùng khối lượng). Viên giấy chạm đất trước, nên khối lượng như nhau mà thời gian rơi khác nhau. Thả viên giấy vo tròn cùng hòn sỏi: chúng chạm đất gần như cùng lúc.',
        'Rút ra kết luận: thời gian rơi khác nhau chủ yếu do sức cản của không khí chứ không do khối lượng.',
      ],
      answer:
        'Giả thuyết "vật nặng rơi nhanh hơn" bị bác bỏ; khi sức cản không khí không đáng kể, các vật rơi nhanh như nhau.',
    },
    {
      problem:
        'Một viên bi lăn trên máng nghiêng đi được $0{,}2$ m sau $1$ s, $0{,}8$ m sau $2$ s và $1{,}8$ m sau $3$ s. Số liệu này ủng hộ giả thuyết $s \\sim t$ hay $s \\sim t^2$?',
      steps: [
        'Nếu $s \\sim t$ thì $s/t$ không đổi: $0{,}2/1 = 0{,}2$; $0{,}8/2 = 0{,}4$; $1{,}8/3 = 0{,}6$. Tỉ số tăng dần, nên không phải.',
        'Nếu $s \\sim t^2$ thì $s/t^2$ không đổi: $0{,}2/1 = 0{,}2$; $0{,}8/4 = 0{,}2$; $1{,}8/9 = 0{,}2$.',
        'Tỉ số $s/t^2$ không đổi, bằng $0{,}2\\ \\text{m/s}^2$.',
      ],
      answer: 'Số liệu ủng hộ giả thuyết $s \\sim t^2$, cụ thể $s = 0{,}2\\,t^2$ (m).',
    },
    {
      problem:
        'Khi tính thời gian ô tô đi từ Hà Nội đến Hải Phòng, ta coi ô tô là một chất điểm. Đó là loại mô hình nào và vì sao dùng được?',
      steps: [
        'Coi ô tô là một điểm có khối lượng là một hình ảnh đơn giản hoá, không phải vật thật thu nhỏ hay công thức.',
        'Kích thước ô tô (vài mét) rất nhỏ so với quãng đường (hơn $100$ km), nên bỏ qua kích thước không làm sai kết quả đáng kể.',
      ],
      answer:
        'Đó là mô hình lí thuyết; dùng được vì kích thước ô tô rất nhỏ so với quãng đường đi.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Đối tượng nghiên cứu của vật lí là gì?',
      options: [
        'Các chất và sự biến đổi của chất',
        'Các dạng vận động của vật chất và năng lượng',
        'Sự sống và các cơ thể sống',
        'Các con số và hình học',
      ],
      answer: 1,
      hints: ['Hoá học nghiên cứu chất, sinh học nghiên cứu sự sống.'],
      solution:
        'Vật lí nghiên cứu các dạng vận động của vật chất và năng lượng. Sự biến đổi của chất thuộc hoá học, sự sống thuộc sinh học.',
    },
    {
      type: 'order',
      prompt: 'Sắp xếp các bước của quá trình tìm hiểu thế giới tự nhiên dưới góc độ vật lí.',
      items: [
        'Hình thành giả thuyết',
        'Quan sát hiện tượng',
        'Rút ra kết luận',
        'Đề xuất vấn đề',
        'Kiểm tra giả thuyết',
      ],
      answer: [1, 3, 0, 4, 2],
      hints: [
        'Mọi tìm hiểu bắt đầu từ việc quan sát.',
        'Phải có giả thuyết rồi mới kiểm tra được nó.',
      ],
      solution:
        'Quan sát hiện tượng → Đề xuất vấn đề → Hình thành giả thuyết → Kiểm tra giả thuyết → Rút ra kết luận.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi ví dụ với loại mô hình tương ứng.',
      left: [
        'Quả địa cầu trong lớp học',
        'Coi Trái Đất là một chất điểm khi xét chuyển động quanh Mặt Trời',
        'Công thức $s = v t$ của chuyển động thẳng đều',
      ],
      right: ['Mô hình lí thuyết', 'Mô hình toán học', 'Mô hình vật chất'],
      pairs: [
        [0, 2],
        [1, 0],
        [2, 1],
      ],
      hints: ['Mô hình vật chất là vật thật thu nhỏ; mô hình toán học là công thức, đồ thị.'],
      solution:
        'Quả địa cầu là mô hình vật chất; coi Trái Đất là chất điểm là mô hình lí thuyết; công thức $s = vt$ là mô hình toán học.',
    },
    {
      type: 'choice',
      prompt: 'Ai là người đầu tiên đưa phương pháp thực nghiệm vào nghiên cứu vật lí?',
      options: ['Aristotle', 'Galilei', 'Newton', 'Einstein'],
      answer: 1,
      hints: ['Ông làm thí nghiệm với vật rơi và viên bi lăn trên máng nghiêng.'],
      solution:
        'Galilei dùng thí nghiệm để kiểm tra giả thuyết, mở đầu giai đoạn vật lí cổ điển. Aristotle chỉ quan sát và suy luận; Newton và Einstein đến sau.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi cuộc cách mạng công nghiệp với thành tựu tiêu biểu của nó.',
      left: ['Lần thứ nhất', 'Lần thứ hai', 'Lần thứ ba', 'Lần thứ tư'],
      right: [
        'Máy tính, Internet và tự động hoá',
        'Máy hơi nước',
        'Trí tuệ nhân tạo và Internet vạn vật',
        'Điện năng và dây chuyền sản xuất',
      ],
      pairs: [
        [0, 1],
        [1, 3],
        [2, 0],
        [3, 2],
      ],
      hints: [
        'Mở phần "Vai trò của vật lí" và chọn từng cuộc cách mạng.',
        'Cuộc đầu tiên diễn ra cuối thế kỉ XVIII, khi chưa có điện.',
      ],
      solution:
        'Lần 1: máy hơi nước; lần 2: điện năng; lần 3: điện tử, máy tính, tự động hoá; lần 4: trí tuệ nhân tạo, Internet vạn vật, dữ liệu lớn.',
    },
    {
      type: 'multi',
      prompt: 'Những phát biểu nào về phương pháp nghiên cứu vật lí là đúng?',
      options: [
        'Kết quả của phương pháp lí thuyết cần được kiểm chứng bằng thực nghiệm.',
        'Một giả thuyết hợp lí thì không cần kiểm tra.',
        'Thí nghiệm có thể bác bỏ một giả thuyết.',
        'Phương pháp lí thuyết dùng ngôn ngữ toán học và suy luận.',
      ],
      answers: [0, 2, 3],
      hints: ['Giả thuyết chỉ được chấp nhận sau khi kiểm chứng.'],
      solution:
        'Phát biểu thứ hai sai: mọi giả thuyết đều phải được kiểm tra. Ba phát biểu còn lại đúng.',
    },
    {
      type: 'number',
      prompt:
        'Viên bi lăn trên máng nghiêng theo quy luật $s = 0{,}2\\,t^2$ (s tính bằng m, t tính bằng s). Sau $4$ s viên bi đi được bao nhiêu mét?',
      answer: 3.2,
      tolerance: 0.001,
      unit: 'm',
      hints: ['Thay $t = 4$ vào công thức.', '$4^2 = 16$.'],
      solution: '$s = 0{,}2 \\cdot 4^2 = 0{,}2 \\cdot 16 = 3{,}2$ m.',
    },
    {
      type: 'choice',
      prompt:
        'Thí nghiệm ảo cho $s/t^2$ gần như không đổi ở mọi lần đo. Kết luận nào đúng với giả thuyết "$s$ tỉ lệ với $t$"?',
      options: [
        'Giả thuyết được chấp nhận',
        'Giả thuyết bị bác bỏ',
        'Chưa kết luận được gì',
        'Phải đổi đơn vị đo',
      ],
      answer: 1,
      hints: [
        'Nếu $s \\sim t$ thì tỉ số $s/t$ phải không đổi; khi $s/t^2$ không đổi thì $s/t = (s/t^2) \\cdot t$ tăng theo $t$.',
      ],
      solution:
        'Khi $s/t^2$ không đổi, $s/t$ tăng tỉ lệ với $t$, trái với giả thuyết $s \\sim t$. Kết quả thí nghiệm đáng tin cậy trái với giả thuyết thì giả thuyết bị bác bỏ.',
    },
  ],
  takeaways: [
    'Vật lí nghiên cứu các dạng vận động của vật chất và năng lượng, gồm nhiều lĩnh vực: cơ, nhiệt, điện, từ, quang, hạt nhân…',
    'Vật lí phát triển qua ba giai đoạn: tiền vật lí, vật lí cổ điển (bắt đầu từ Galilei) và vật lí hiện đại.',
    'Hai phương pháp nghiên cứu: thực nghiệm (thí nghiệm kiểm chứng) và lí thuyết (toán học, suy luận); chúng bổ sung cho nhau.',
    'Ba loại mô hình: mô hình vật chất, mô hình lí thuyết, mô hình toán học.',
    'Các bước: quan sát → đề xuất vấn đề → giả thuyết → kiểm tra → kết luận.',
    'Mỗi cuộc cách mạng công nghiệp đều dựa trên những phát minh vật lí.',
  ],
};
