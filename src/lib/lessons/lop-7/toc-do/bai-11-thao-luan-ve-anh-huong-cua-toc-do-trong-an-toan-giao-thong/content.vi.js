/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Vượt quá tốc độ giới hạn và không giữ khoảng cách an toàn là nguyên nhân chính của nhiều vụ tai nạn giao thông: tốc độ càng lớn thì quãng đường từ lúc thấy nguy hiểm đến lúc xe dừng hẳn càng dài.',
  intro:
    'Nhiều vụ tai nạn giao thông đường bộ có nguyên nhân từ việc chạy quá tốc độ quy định. Vì sao trên đường lại có biển báo tốc độ tối đa, và vì sao xe chạy càng nhanh thì càng phải cách xa xe phía trước?',
  objectives: [
    'Thảo luận được ảnh hưởng của tốc độ trong an toàn giao thông.',
    'Giải thích được vì sao phải tuân thủ tốc độ giới hạn và giữ khoảng cách an toàn giữa các xe.',
    'Tính được quãng đường xe đi được trong thời gian người lái phản ứng, từ tốc độ và thời gian phản ứng.',
  ],
  sections: [
    {
      heading: 'Tốc độ giới hạn',
      blocks: [
        {
          type: 'p',
          text: 'Để đảm bảo an toàn, mỗi loại đường và mỗi loại xe có một tốc độ tối đa cho phép. Biển báo "Tốc độ tối đa cho phép" là biển tròn, viền đỏ, ở giữa ghi con số tốc độ tính bằng $\\text{km/h}$; người lái không được cho xe chạy nhanh hơn con số đó.',
        },
        {
          type: 'list',
          items: [
            'Trong khu vực đông dân cư, ô tô và xe máy chạy tối đa $60\\ \\text{km/h}$ trên đường đôi (có dải phân cách giữa) và $50\\ \\text{km/h}$ trên đường hai chiều không có dải phân cách giữa.',
            'Xe gắn máy (dung tích xi lanh không quá $50\\ \\text{cm}^3$) chạy tối đa $40\\ \\text{km/h}$.',
            'Khi trời mưa, sương mù, đường trơn hoặc tầm nhìn hạn chế, phải giảm tốc độ.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Vì sao phải giới hạn tốc độ',
          text: 'Xe chạy càng nhanh thì người lái càng khó xử lí khi có tình huống bất ngờ, quãng đường cần để dừng xe càng dài, và nếu xảy ra va chạm thì hậu quả càng nặng.',
        },
      ],
    },
    {
      heading: 'Khoảng cách an toàn và quãng đường dừng xe',
      blocks: [
        {
          type: 'p',
          text: 'Khi phát hiện nguy hiểm, người lái cần một khoảng thời gian để phản ứng (nhìn thấy, quyết định, đạp phanh). Trong thời gian đó xe vẫn chạy với tốc độ cũ. Sau khi phanh, xe còn trượt thêm một đoạn nữa mới dừng hẳn.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Quãng đường dừng xe',
          text: 'Quãng đường dừng xe $=$ quãng đường phản ứng $+$ quãng đường phanh. Quãng đường phản ứng tính được bằng $s = v \\cdot t$, với $t$ là thời gian phản ứng (khoảng $1\\ \\text{s}$ với người lái tỉnh táo, dài hơn nhiều nếu người lái mệt mỏi, uống rượu bia hay dùng điện thoại).',
        },
        {
          type: 'list',
          items: [
            'Tốc độ tăng gấp đôi thì quãng đường phản ứng tăng gấp đôi, còn quãng đường phanh tăng khoảng bốn lần.',
            'Mặt đường ướt, trơn làm bánh xe bám đường kém, nên quãng đường phanh dài hơn.',
          ],
        },
        {
          type: 'table',
          caption:
            'Khoảng cách an toàn tối thiểu giữa hai xe trên đường bộ (theo quy định của Bộ Giao thông vận tải)',
          head: ['Tốc độ lưu hành $v$ (km/h)', 'Khoảng cách an toàn tối thiểu (m)'],
          rows: [
            ['$v = 60$', '$35$'],
            ['$60 < v \\le 80$', '$55$'],
            ['$80 < v \\le 100$', '$70$'],
            ['$100 < v \\le 120$', '$100$'],
          ],
        },
        {
          type: 'p',
          text: 'Khi chạy dưới $60\\ \\text{km/h}$, người lái phải chủ động giữ khoảng cách phù hợp với xe phía trước. Khi trời mưa, có sương mù hay đường trơn, phải giữ khoảng cách lớn hơn các trị số trong bảng.',
        },
      ],
    },
    {
      heading: 'Thảo luận nhóm: tốc độ và an toàn giao thông',
      project: true,
      blocks: [
        {
          type: 'p',
          text: 'Mục tiêu: sưu tầm tài liệu, phân tích và trình bày về ảnh hưởng của tốc độ trong an toàn giao thông, rồi đề xuất cách tham gia giao thông an toàn cho bản thân và gia đình.',
        },
        {
          type: 'list',
          items: [
            'Chuẩn bị: tranh ảnh biển báo tốc độ, bài báo hoặc video về các vụ tai nạn do vượt quá tốc độ, bảng khoảng cách an toàn, giấy khổ lớn và bút màu (hoặc máy tính để làm bài trình chiếu).',
          ],
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Chia lớp thành các nhóm; mỗi nhóm chọn một chủ đề: tốc độ giới hạn, khoảng cách an toàn, hoặc ảnh hưởng của thời tiết và người lái tới quãng đường dừng xe.',
            'Sưu tầm tư liệu, ghi rõ nguồn. Dùng thí nghiệm ảo ở trên để lập bảng quãng đường dừng xe ở ít nhất bốn tốc độ khác nhau.',
            'Thảo luận: vì sao phải giới hạn tốc độ, vì sao xe chạy nhanh phải giữ khoảng cách lớn hơn, vì sao trời mưa phải giảm tốc độ.',
            'Làm áp phích hoặc bài trình chiếu, trình bày trước lớp trong khoảng $5$ phút và trả lời câu hỏi của các nhóm khác.',
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Báo cáo cần có',
          text: 'Tên chủ đề và thành viên nhóm; tư liệu đã sưu tầm (có nguồn); bảng số liệu tốc độ – quãng đường dừng xe và nhận xét; ít nhất ba lời khuyên cụ thể để tham gia giao thông an toàn (ví dụ: nhắc người lớn không vượt quá tốc độ, giữ khoảng cách, không dùng điện thoại khi lái xe).',
        },
      ],
    },
  ],
  explore: {
    title: 'Phanh gấp ở các tốc độ khác nhau',
    instruction:
      'Chọn tốc độ của xe, khoảng cách tới vật cản, mặt đường và tình trạng người lái, rồi nhấn "Phanh gấp!". Thanh màu cam là quãng đường xe chạy trong thời gian người lái phản ứng, thanh màu đỏ là quãng đường phanh. Giữ vật cản ở $40\\ \\text{m}$ và tăng dần tốc độ từ $40\\ \\text{km/h}$: từ tốc độ nào thì xe không dừng kịp? Lặp lại với đường ướt, với người lái mất tập trung.',
  },
  examples: [
    {
      problem:
        'Một ô tô chạy với tốc độ $54\\ \\text{km/h}$. Người lái nhìn thấy chướng ngại vật và mất $1\\ \\text{s}$ để phản ứng trước khi đạp phanh. Tính quãng đường xe đi được trong thời gian phản ứng. Nếu người lái đang dùng điện thoại và mất $2\\ \\text{s}$ mới phản ứng thì sao?',
      steps: [
        'Đổi tốc độ: $54\\ \\text{km/h} = 54 : 3{,}6 = 15\\ \\text{m/s}$.',
        'Thời gian phản ứng $1\\ \\text{s}$: $s = v \\cdot t = 15 \\cdot 1 = 15\\ \\text{(m)}$.',
        'Thời gian phản ứng $2\\ \\text{s}$: $s = 15 \\cdot 2 = 30\\ \\text{(m)}$, xe chạy thêm $15\\ \\text{m}$ mà người lái chưa kịp phanh.',
      ],
      answer:
        '$15\\ \\text{m}$ khi phản ứng $1\\ \\text{s}$; $30\\ \\text{m}$ khi phản ứng $2\\ \\text{s}$.',
    },
    {
      problem:
        'Một ô tô chạy trên đường cao tốc với tốc độ $25\\ \\text{m/s}$. Theo bảng khoảng cách an toàn, ô tô phải giữ khoảng cách tối thiểu bao nhiêu mét với xe phía trước?',
      steps: [
        'Đổi tốc độ sang km/h: $25 \\cdot 3{,}6 = 90\\ \\text{(km/h)}$.',
        'Tốc độ $90\\ \\text{km/h}$ thuộc khoảng $80 < v \\le 100$.',
        'Tra bảng: khoảng cách an toàn tối thiểu là $70\\ \\text{m}$.',
      ],
      answer: '$70\\ \\text{m}$.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt:
        'Một xe máy chạy với tốc độ $36\\ \\text{km/h}$, người lái mất $1\\ \\text{s}$ để phản ứng. Trong thời gian phản ứng, xe đi được bao nhiêu mét?',
      answer: 10,
      unit: 'm',
      hints: ['Đổi tốc độ sang m/s.', 'Dùng $s = v \\cdot t$.'],
      solution: '$36\\ \\text{km/h} = 10\\ \\text{m/s}$; $s = 10 \\cdot 1 = 10\\ \\text{(m)}$.',
    },
    {
      type: 'number',
      prompt:
        'Một ô tô chạy với tốc độ $72\\ \\text{km/h}$. Người lái đang xem điện thoại nên mất $2\\ \\text{s}$ mới đạp phanh. Trong $2\\ \\text{s}$ đó ô tô đi được bao nhiêu mét?',
      answer: 40,
      unit: 'm',
      hints: ['$72\\ \\text{km/h}$ bằng bao nhiêu m/s?'],
      solution:
        '$72\\ \\text{km/h} = 72 : 3{,}6 = 20\\ \\text{m/s}$; $s = 20 \\cdot 2 = 40\\ \\text{(m)}$.',
    },
    {
      type: 'number',
      prompt:
        'Một ô tô chạy $36\\ \\text{km/h}$, người lái phản ứng hết $1\\ \\text{s}$, sau khi phanh xe trượt thêm $7\\ \\text{m}$ mới dừng. Quãng đường dừng xe (từ lúc thấy nguy hiểm đến lúc dừng hẳn) là bao nhiêu mét?',
      answer: 17,
      unit: 'm',
      hints: ['Quãng đường dừng xe $=$ quãng đường phản ứng $+$ quãng đường phanh.'],
      solution:
        'Quãng đường phản ứng: $10 \\cdot 1 = 10\\ \\text{m}$; quãng đường dừng xe: $10 + 7 = 17\\ \\text{(m)}$.',
    },
    {
      type: 'choice',
      prompt:
        'Một ô tô chạy với tốc độ $25\\ \\text{m/s}$. Theo bảng khoảng cách an toàn, khoảng cách tối thiểu tới xe phía trước là',
      options: ['$35\\ \\text{m}$', '$55\\ \\text{m}$', '$70\\ \\text{m}$', '$100\\ \\text{m}$'],
      answer: 2,
      hints: ['Đổi $25\\ \\text{m/s}$ sang km/h rồi tra bảng.'],
      solution:
        '$25\\ \\text{m/s} = 90\\ \\text{km/h}$, thuộc khoảng $80 < v \\le 100$, nên khoảng cách an toàn tối thiểu là $70\\ \\text{m}$.',
    },
    {
      type: 'choice',
      prompt:
        'Trên đường khô, một ô tô phanh gấp ở $30\\ \\text{km/h}$ trượt khoảng $5\\ \\text{m}$; ở $60\\ \\text{km/h}$ trượt khoảng $20\\ \\text{m}$. Khi tốc độ tăng gấp đôi, quãng đường phanh tăng khoảng',
      options: ['$2$ lần', '$3$ lần', '$4$ lần', 'không đổi'],
      answer: 2,
      hints: ['Lấy $20$ chia cho $5$.'],
      solution:
        '$20 : 5 = 4$: quãng đường phanh tăng khoảng $4$ lần, nhanh hơn nhiều so với tốc độ (chỉ tăng $2$ lần). Vì vậy chạy nhanh rất nguy hiểm.',
    },
    {
      type: 'multi',
      prompt: 'Những yếu tố nào làm quãng đường dừng xe dài hơn?',
      options: [
        'Xe chạy với tốc độ lớn hơn',
        'Mặt đường ướt, trơn trượt',
        'Người lái mệt mỏi, dùng điện thoại hoặc đã uống rượu bia',
        'Người lái đội mũ bảo hiểm',
        'Xe chạy chậm lại khi vào khu đông dân cư',
      ],
      answers: [0, 1, 2],
      hints: [
        'Nghĩ tới hai phần: quãng đường phản ứng và quãng đường phanh.',
        'Mũ bảo hiểm bảo vệ đầu người lái, không ảnh hưởng tới việc dừng xe.',
      ],
      solution:
        'Tốc độ lớn làm cả hai phần dài ra; đường trơn làm quãng đường phanh dài ra; người lái mất tập trung phản ứng chậm hơn nên quãng đường phản ứng dài ra. Đội mũ bảo hiểm không ảnh hưởng, còn chạy chậm lại làm quãng đường dừng xe ngắn hơn.',
    },
    {
      type: 'number',
      prompt:
        'Trên đoạn đường có biển giới hạn $50\\ \\text{km/h}$, một xe máy đi được $100\\ \\text{m}$ trong $6\\ \\text{s}$. Tốc độ của xe máy là bao nhiêu kilômét trên giờ?',
      answer: 60,
      tolerance: 0.1,
      unit: 'km/h',
      hints: ['Tính $v = \\dfrac{s}{t}$ theo m/s rồi nhân với $3{,}6$.'],
      solution:
        '$v = \\dfrac{100}{6} \\approx 16{,}67\\ \\text{m/s}$; $v = \\dfrac{100}{6} \\cdot 3{,}6 = 60\\ \\text{km/h} > 50\\ \\text{km/h}$: xe máy đã vượt quá tốc độ giới hạn.',
    },
  ],
  takeaways: [
    'Phải tuân thủ biển báo tốc độ tối đa cho phép; khi trời mưa, đường trơn, tầm nhìn hạn chế phải giảm tốc độ.',
    'Quãng đường dừng xe $=$ quãng đường phản ứng ($s = v \\cdot t$) $+$ quãng đường phanh; tốc độ càng lớn thì quãng đường dừng xe càng dài.',
    'Tốc độ tăng gấp đôi thì quãng đường phanh tăng khoảng bốn lần.',
    'Xe chạy càng nhanh càng phải giữ khoảng cách an toàn lớn với xe phía trước: $35\\ \\text{m}$ ở $60\\ \\text{km/h}$, $55\\ \\text{m}$ đến $80\\ \\text{km/h}$, $70\\ \\text{m}$ đến $100\\ \\text{km/h}$, $100\\ \\text{m}$ đến $120\\ \\text{km/h}$.',
  ],
};
