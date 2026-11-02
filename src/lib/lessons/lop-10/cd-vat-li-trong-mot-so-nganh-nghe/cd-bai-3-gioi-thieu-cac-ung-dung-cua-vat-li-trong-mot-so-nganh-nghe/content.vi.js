/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Vật lí được ứng dụng trong quân sự, công nghiệp hạt nhân, điện tử, cơ khí và tự động hoá, thông tin truyền thông, năng lượng, y tế, giao thông, khí tượng thuỷ văn, nông nghiệp, lâm nghiệp và cả tài chính; từ đó em có thể tìm ngành nghề phù hợp với mình.',
  intro:
    'Bác sĩ đọc ảnh X-quang, kĩ sư lắp pin mặt trời, người dự báo bão theo dõi ảnh vệ tinh, chuyên viên tài chính lập mô hình thị trường. Họ làm những công việc rất khác nhau, nhưng đều dùng kiến thức vật lí. Vật lí có vai trò như thế nào với các ngành nghề trong xã hội?',
  objectives: [
    'Mô tả được ví dụ thực tế về ứng dụng vật lí trong quân sự, công nghiệp hạt nhân, kĩ thuật điện tử, cơ khí và tự động hoá, thông tin truyền thông.',
    'Mô tả được ví dụ thực tế về ứng dụng vật lí trong năng lượng, y tế, giao thông, khí tượng thuỷ văn, nông nghiệp, lâm nghiệp, tài chính.',
    'Giải thích được nguyên lí vật lí đơn giản đứng sau một số thiết bị.',
    'Nhận ra được một số ngành nghề phù hợp với thiên hướng của bản thân.',
  ],
  sections: [
    {
      heading: 'Quân sự và công nghiệp hạt nhân',
      blocks: [
        {
          type: 'p',
          text: 'Từ xa xưa, con người đã dùng máy cơ trong quân sự: cung và máy bắn tên dùng lực đàn hồi, máy bắn đá dùng nguyên lí đòn bẩy. Ngày nay, máy bay chiến đấu phản lực được chế tạo nhờ định luật bảo toàn động lượng, cơ học chất lưu, khoa học vật liệu và điện tử.',
        },
        {
          type: 'p',
          text: 'Công nghiệp hạt nhân sử dụng năng lượng được giải phóng khi hạt nhân biến đổi. Trong nhà máy điện hạt nhân, năng lượng phân hạch đun nóng nước, tạo hơi quay tua-bin và máy phát điện. Năng lượng hạt nhân còn dùng cho tàu phá băng, tàu quân sự; các nguồn phóng xạ dùng trong y tế và công nghiệp.',
        },
        {
          type: 'table',
          caption: 'Lợi ích và rủi ro của công nghiệp hạt nhân',
          head: ['Lợi ích', 'Rủi ro'],
          rows: [
            [
              'Năng lượng rất lớn từ lượng nhiên liệu nhỏ',
              'Sự cố mất kiểm soát có thể gây ô nhiễm không khí, nguồn nước, đất',
            ],
            [
              'Không trực tiếp thải khí nhà kính khi vận hành',
              'Xử lí chất thải phóng xạ là vấn đề lớn',
            ],
            ['Cung cấp điện ổn định', 'Nguy cơ dùng cho vũ khí, chạy đua vũ trang'],
          ],
        },
      ],
    },
    {
      heading: 'Năng lượng',
      blocks: [
        {
          type: 'p',
          text: 'Vật lí cho biết năng lượng được chuyển hoá như thế nào, từ đó kĩ sư thiết kế các nhà máy điện. Thuỷ điện chuyển thế năng của nước thành điện năng qua tua-bin và máy phát. Điện gió chuyển động năng của gió thành điện năng. Pin mặt trời chuyển quang năng trực tiếp thành điện năng nhờ hiệu ứng quang điện trong chất bán dẫn.',
        },
        {
          type: 'p',
          text: 'Trong mọi nhà máy, chỉ một phần năng lượng đầu vào trở thành điện năng. Hiệu suất là tỉ số giữa công suất có ích và công suất toàn phần; nhiều tấm pin mặt trời hiện nay có hiệu suất cỡ $20\\%$.',
        },
      ],
    },
    {
      heading: 'Kĩ thuật điện tử, cơ khí và tự động hoá',
      blocks: [
        {
          type: 'p',
          text: 'Vật lí giúp nghiên cứu và chế tạo các linh kiện như diode, transistor, LED, photodiode, diode laser. Con chip đóng vai trò như bộ não, quyết định sức mạnh của hệ thống điện tử. Đây là nền tảng của máy tính, robot thông minh trong cuộc cách mạng công nghiệp lần thứ tư.',
        },
        {
          type: 'p',
          text: 'Trong cơ khí, máy hơi nước của James Watt là nền tảng của cuộc cách mạng công nghiệp lần thứ nhất. Hiện nay, dây chuyền sản xuất tự động, ô tô tự lái, robot công nghiệp dùng cảm biến để đổi các đại lượng vật lí thành tín hiệu điện, từ đó điều khiển máy móc.',
        },
      ],
    },
    {
      heading: 'Thông tin và truyền thông',
      blocks: [
        {
          type: 'p',
          text: 'Định vị GPS, điện thoại thông minh, mạng không dây, vệ tinh nhân tạo đều dựa trên dao động điện từ và sóng vô tuyến; laser và cáp quang truyền lượng thông tin rất lớn đi xa.',
        },
      ],
    },
    {
      heading: 'Y tế và giao thông',
      blocks: [
        {
          type: 'p',
          text: 'Trong y tế, bác sĩ dùng nhiều hiện tượng vật lí để chẩn đoán: tia X bị xương hấp thụ mạnh hơn mô mềm; siêu âm dùng sóng âm tần số cao phản xạ ở ranh giới giữa các mô; cộng hưởng từ dùng từ trường mạnh và sóng vô tuyến. Laser được dùng để phẫu thuật, bức xạ được dùng để xạ trị.',
        },
        {
          type: 'p',
          text: 'Trong giao thông, kĩ sư dùng cơ học để thiết kế cầu, phanh xe và khúc cua: xe đi trên đường cong cần lực hướng tâm $F_{ht} = \\dfrac{mv^2}{r}$, nên mặt đường được làm nghiêng và có biển giới hạn tốc độ. Ô tô tự lái dùng radar và cảm biến để nhận biết vật cản.',
        },
      ],
    },
    {
      heading: 'Khí tượng, thuỷ văn, nông nghiệp và lâm nghiệp',
      blocks: [
        {
          type: 'p',
          text: 'Để ứng phó với biến đổi khí hậu và thiên tai, người ta dùng mô hình vật lí – toán học xử lí dữ liệu lớn trên siêu máy tính để mô phỏng thời tiết. Ảnh viễn thám từ vệ tinh kết hợp với mô hình thuỷ văn cho biết biến động của bề mặt Trái Đất.',
        },
        {
          type: 'list',
          items: [
            'Hải lưu chịu tác động của gió, sự tự quay của Trái Đất, chênh lệch nhiệt độ và độ mặn.',
            'Sóng biển chủ yếu do gió tạo ra.',
            'Thuỷ triều chủ yếu do lực hấp dẫn của Mặt Trăng và Mặt Trời tác dụng lên nước biển.',
          ],
        },
        {
          type: 'p',
          text: 'Trong nông nghiệp, công nghệ nano tăng hiệu quả và độ an toàn của phân bón; nhà kính tạo môi trường ổn định; chiếu xạ tiêu diệt vi sinh vật, làm chậm mọc mầm và tạo giống mới; máy nông nghiệp tự động có camera, định vị, radar. Trong lâm nghiệp, cảm biến nhiệt độ, độ ẩm, tốc độ gió giúp cảnh báo cháy rừng, viễn thám giúp theo dõi tài nguyên rừng, laser và máy CNC giúp chế biến lâm sản tiết kiệm nguyên liệu.',
        },
      ],
    },
    {
      heading: 'Tài chính, kinh tế',
      blocks: [
        {
          type: 'p',
          text: 'Một số nhà vật lí thuộc lĩnh vực cơ học thống kê đã áp dụng công cụ và phương pháp vật lí vào kinh tế, kết hợp mô hình lí thuyết với dữ liệu thực nghiệm. Những mô hình đó hỗ trợ dự báo và lập kế hoạch.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Mô hình lực hấp dẫn trong kinh tế',
          text: 'Theo mô hình này ở dạng đơn giản, thương mại giữa hai nước tỉ lệ thuận với quy mô kinh tế $M_1$, $M_2$ của hai nước và tỉ lệ nghịch với khoảng cách $D$ giữa chúng: $T = A\\dfrac{M_1 M_2}{D}$, với $A$ là hằng số. Nguồn gốc của ý tưởng là định luật vạn vật hấp dẫn $F = G\\dfrac{m_1 m_2}{r^2}$. Đây là mô hình dùng để ước lượng, không phải một định luật tự nhiên.',
        },
      ],
    },
    {
      heading: 'Định hướng nghề nghiệp',
      blocks: [
        {
          type: 'p',
          text: 'Kiến thức vật lí mở ra nhiều con đường, và không phải chỉ những nghề mang tên vật lí. Hãy chọn những điều giống với em, xem gợi ý và những phần vật lí nên chú ý học. Sau đó, tự tìm hiểu thêm về ngành nghề em quan tâm.',
        },
        { type: 'widget', name: 'dinh-huong' },
      ],
    },
    {
      heading: 'Dự án: Hồ sơ vật lí của một nghề',
      project: true,
      blocks: [
        {
          type: 'p',
          text: 'Mục tiêu: mô tả được những ứng dụng của vật lí trong một ngành nghề em yêu thích. Dụng cụ: internet, sách báo; điện thoại để ghi chép khi phỏng vấn; giấy khổ lớn hoặc phần mềm trình chiếu.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Chọn một nghề em quan tâm, không nhất thiết có trong bài học.',
            'Tìm hiểu nội dung công việc hằng ngày, nơi làm việc và yêu cầu đào tạo.',
            'Tìm ít nhất $3$ thiết bị hoặc quy trình của nghề có dùng kiến thức vật lí. Với mỗi cái, nêu nguyên lí vật lí và lĩnh vực vật lí tương ứng.',
            'Phỏng vấn một người đang làm nghề đó nếu có thể, hỏi xem kiến thức vật lí nào họ dùng nhiều nhất. Nếu không phỏng vấn được, hãy tìm một bài viết hoặc video chia sẻ từ người trong nghề.',
            'Đánh giá sự phù hợp của bản thân: em có sở thích, thế mạnh nào giống yêu cầu của nghề, và cần rèn thêm điều gì.',
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Báo cáo',
          text: 'Nộp hồ sơ nghề một trang gồm: mô tả công việc, bảng "thiết bị – nguyên lí – lĩnh vực vật lí", nhận xét về sự phù hợp của bản thân, nguồn tham khảo. Trình bày trong $3$ phút.',
        },
      ],
    },
  ],
  explore: {
    title: 'Thẻ ngành nghề',
    instruction:
      'Đọc mô tả công việc trên mặt trước của mỗi thẻ và đoán nguyên lí vật lí mà nghề đó dùng. Thẻ sẽ lật lại để cho biết kết quả và giải thích. Các thẻ đã lật đổi màu theo kết quả.',
  },
  examples: [
    {
      problem:
        'Một máy bắn đá có thanh quay quanh trục. Đối trọng tạo lực $2\\,000$ N ở đầu cánh tay ngắn dài $1$ m, đầu kia là cánh tay dài $4$ m. Bỏ qua khối lượng của thanh và ma sát ở trục. Để giữ thanh cân bằng nằm ngang, cần lực bao nhiêu ở đầu cánh tay dài? Khi thanh quay, đầu cánh tay dài đi được quãng đường gấp bao nhiêu lần đầu cánh tay ngắn?',
      steps: [
        'Thanh cân bằng khi moment của hai lực đối với trục bằng nhau: $F_1 d_1 = F_2 d_2$.',
        '$F_2 = \\dfrac{F_1 d_1}{d_2} = \\dfrac{2\\,000 \\cdot 1}{4} = 500$ N.',
        'Khi thanh quay một góc, hai đầu đi trên hai cung tròn cùng góc ở tâm, nên quãng đường tỉ lệ với bán kính: $\\dfrac{s_2}{s_1} = \\dfrac{d_2}{d_1} = 4$.',
      ],
      answer:
        'Cần lực $500$ N. Đầu cánh tay dài đi được quãng đường gấp $4$ lần, nên trong cùng một thời gian nó chuyển động nhanh gấp $4$ lần: máy được lợi về đường đi, giúp hòn đá bay đi với tốc độ lớn.',
    },
    {
      problem:
        'Dùng mô hình lực hấp dẫn dạng đơn giản $T = A\\dfrac{M_1 M_2}{D}$. So với một cặp nước ban đầu, cặp nước thứ hai có quy mô kinh tế $M_1$ gấp đôi và khoảng cách $D$ gấp đôi, còn $M_2$ như cũ. Giá trị $T$ của cặp thứ hai thay đổi thế nào? Với định luật vạn vật hấp dẫn $F = G\\dfrac{m_1 m_2}{r^2}$, nếu một khối lượng và khoảng cách đều tăng gấp đôi thì $F$ thay đổi thế nào?',
      steps: [
        'Với mô hình kinh tế: $T^{\\prime} = A\\dfrac{2 M_1 M_2}{2D} = T$.',
        'Với lực hấp dẫn: $F^{\\prime} = G\\dfrac{2 m_1 m_2}{(2r)^2} = \\dfrac{2}{4}F = \\dfrac{F}{2}$.',
      ],
      answer:
        '$T$ không đổi, còn $F$ giảm đi một nửa. Hai công thức có hình thức giống nhau nhưng khác nhau ở số mũ của khoảng cách, vì một bên là mô hình ước lượng, bên kia là định luật vật lí.',
    },
  ],
  practice: [
    {
      type: 'match',
      prompt: 'Nối mỗi ứng dụng với nguyên lí vật lí chính của nó.',
      left: ['Cung tên', 'Máy bắn đá', 'Điện thoại liên lạc với trạm', 'Pin mặt trời'],
      right: [
        'Lực đàn hồi',
        'Đòn bẩy',
        'Sóng vô tuyến',
        'Hiệu ứng quang điện trong chất bán dẫn',
        'Lực đẩy Archimedes',
      ],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: [
        'Lực đẩy Archimedes liên quan đến vật chìm trong chất lỏng, không dùng cho các ứng dụng này.',
      ],
      solution:
        'Cung tên: lực đàn hồi. Máy bắn đá: đòn bẩy. Điện thoại: sóng vô tuyến. Pin mặt trời: hiệu ứng quang điện trong chất bán dẫn.',
    },
    {
      type: 'number',
      prompt:
        'Một máy bắn đá có đối trọng tạo lực $3\\,000$ N ở cánh tay ngắn dài $1{,}5$ m, cánh tay dài là $6$ m. Bỏ qua khối lượng của thanh. Để thanh cân bằng, cần lực bao nhiêu niutơn ở đầu cánh tay dài?',
      answer: 750,
      tolerance: 0.5,
      unit: 'N',
      hints: ['Viết điều kiện cân bằng moment: $F_1 d_1 = F_2 d_2$.'],
      solution: '$F_2 = \\dfrac{3\\,000 \\cdot 1{,}5}{6} = 750$ N.',
    },
    {
      type: 'number',
      prompt:
        'Một radar thời tiết phát sóng điện từ và nhận lại tín hiệu phản xạ từ đám mây sau $0{,}001$ s. Lấy tốc độ sóng điện từ là $3 \\cdot 10^{8}$ m/s. Đám mây cách radar bao nhiêu ki-lô-mét?',
      answer: 150,
      tolerance: 0.5,
      unit: 'km',
      hints: [
        'Sóng đi tới đám mây rồi quay về.',
        'Tính $\\dfrac{ct}{2}$ rồi đổi từ mét sang ki-lô-mét.',
      ],
      solution:
        '$d = \\dfrac{ct}{2} = \\dfrac{3 \\cdot 10^{8} \\cdot 0{,}001}{2} = 1{,}5 \\cdot 10^{5}$ m $= 150$ km.',
    },
    {
      type: 'number',
      prompt:
        'Theo định luật vạn vật hấp dẫn, khi khoảng cách giữa hai vật tăng lên $2$ lần thì lực hấp dẫn giảm đi bao nhiêu lần?',
      answer: 4,
      hints: ['Lực hấp dẫn tỉ lệ nghịch với bình phương khoảng cách.'],
      solution: '$F^{\\prime} = G\\dfrac{m_1 m_2}{(2r)^2} = \\dfrac{F}{4}$, nên lực giảm $4$ lần.',
    },
    {
      type: 'multi',
      prompt: 'Những phát biểu nào là lợi ích của năng lượng hạt nhân?',
      options: [
        'Tạo năng lượng rất lớn từ lượng nhiên liệu nhỏ',
        'Không trực tiếp thải khí nhà kính khi vận hành',
        'Không tạo ra chất thải phóng xạ',
        'Không bao giờ có nguy cơ xảy ra sự cố',
      ],
      answers: [0, 1],
      hints: ['Hãy loại những phát biểu quá tuyệt đối, trái với những rủi ro đã học.'],
      solution:
        'Năng lượng hạt nhân tạo ra năng lượng rất lớn và không trực tiếp thải khí nhà kính khi vận hành. Tuy vậy, nó có chất thải phóng xạ và vẫn có nguy cơ sự cố, nên phải được kiểm soát nghiêm ngặt.',
    },
    {
      type: 'choice',
      prompt:
        'Theo hệ thức $E = mc^2$ với $c = 3 \\cdot 10^{8}$ m/s, năng lượng tương ứng với $1$ g khối lượng là bao nhiêu?',
      options: [
        '$9 \\cdot 10^{13}$ J',
        '$9 \\cdot 10^{16}$ J',
        '$3 \\cdot 10^{11}$ J',
        '$3 \\cdot 10^{5}$ J',
      ],
      answer: 0,
      hints: ['Đổi $1$ g ra ki-lô-gam trước.', 'Nhớ bình phương $c$.'],
      solution:
        '$E = 10^{-3} \\cdot (3 \\cdot 10^{8})^2 = 9 \\cdot 10^{13}$ J. Trong lò phản ứng, chỉ một phần nhỏ khối lượng nhiên liệu chuyển thành năng lượng, nhưng năng lượng thu được vẫn rất lớn.',
    },
    {
      type: 'number',
      prompt:
        'Một tấm pin mặt trời diện tích $2\\ \\text{m}^2$ nhận ánh sáng Mặt Trời với công suất $1\\,000$ W trên mỗi mét vuông. Hiệu suất của tấm pin là $20\\%$. Công suất điện của tấm pin là bao nhiêu oát?',
      answer: 400,
      tolerance: 0.5,
      unit: 'W',
      hints: [
        'Tính công suất ánh sáng chiếu lên cả tấm pin.',
        'Công suất có ích bằng hiệu suất nhân công suất toàn phần.',
      ],
      solution:
        '$P_{tp} = 1\\,000 \\cdot 2 = 2\\,000$ W, nên $P_{ci} = 0{,}2 \\cdot 2\\,000 = 400$ W.',
    },
    {
      type: 'choice',
      prompt: 'Kĩ thuật chẩn đoán nào dùng sóng âm tần số cao phản xạ ở ranh giới giữa các mô?',
      options: ['Siêu âm', 'Chụp X-quang', 'Chụp cộng hưởng từ', 'Đo điện tim'],
      answer: 0,
      hints: ['Tên của kĩ thuật này gợi ngay đến loại sóng nó dùng.'],
      solution:
        'Đó là siêu âm. Chụp X-quang dùng tia X, cộng hưởng từ dùng từ trường và sóng vô tuyến, đo điện tim ghi tín hiệu điện của tim.',
    },
    {
      type: 'number',
      prompt:
        'Một ô tô khối lượng $1\\,200$ kg đi qua khúc cua tròn bán kính $60$ m với tốc độ $10$ m/s. Lực hướng tâm cần thiết là bao nhiêu niutơn?',
      answer: 2000,
      tolerance: 0.5,
      unit: 'N',
      hints: ['Dùng $F_{ht} = \\dfrac{mv^2}{r}$ với $m$ tính bằng kg, $v$ tính bằng m/s.'],
      solution: '$F_{ht} = \\dfrac{1\\,200 \\cdot 10^2}{60} = 2\\,000$ N.',
    },
    {
      type: 'choice',
      prompt: 'Trong nông nghiệp, chiếu xạ nông sản nhằm mục đích chính nào?',
      options: [
        'Tiêu diệt vi sinh vật, làm chậm mọc mầm và chín hỏng',
        'Làm nông sản nặng hơn',
        'Làm nông sản phát sáng',
        'Tăng lượng nước trong nông sản',
      ],
      answer: 0,
      hints: ['Hãy nghĩ đến việc bảo quản nông sản được lâu.'],
      solution:
        'Chiếu xạ tiêu diệt vi sinh vật, làm chậm mọc mầm, chín hỏng nên bảo quản được lâu hơn. Nó còn được dùng để tạo giống cây trồng mới.',
    },
    {
      type: 'choice',
      prompt: 'Nguyên nhân chủ yếu gây ra thuỷ triều là gì?',
      options: [
        'Lực hấp dẫn của Mặt Trăng và Mặt Trời tác dụng lên nước biển',
        'Gió thổi trên mặt biển',
        'Chênh lệch độ mặn của nước biển',
        'Động đất dưới đáy đại dương',
      ],
      answer: 0,
      hints: ['Thuỷ triều lên xuống có chu kì gắn với chuyển động của Mặt Trăng.'],
      solution:
        'Thuỷ triều chủ yếu do lực hấp dẫn của Mặt Trăng và Mặt Trời. Gió chủ yếu tạo ra sóng biển; chênh lệch độ mặn góp phần tạo hải lưu.',
    },
    {
      type: 'choice',
      prompt: 'Hệ thống cảnh báo cháy rừng tự động cần đo những đại lượng nào?',
      options: [
        'Nhiệt độ, độ ẩm và tốc độ gió',
        'Khối lượng và chiều cao của từng cây',
        'Cường độ dòng điện trong thân cây',
        'Áp suất của nước ngầm',
      ],
      answer: 0,
      hints: ['Hãy nghĩ xem điều kiện thời tiết nào làm đám cháy dễ bùng phát và lan rộng.'],
      solution:
        'Rừng dễ cháy khi nhiệt độ cao, độ ẩm thấp, gió mạnh, nên cảm biến đo ba đại lượng đó.',
    },
    {
      type: 'text',
      prompt: 'Hệ thống định vị toàn cầu dùng vệ tinh và sóng vô tuyến thường được gọi tắt là gì?',
      accept: ['GPS'],
      hints: ['Tên viết tắt gồm ba chữ cái của cụm từ Global Positioning System.'],
      solution: 'Đó là GPS (Global Positioning System).',
    },
    {
      type: 'choice',
      prompt:
        'Bạn Lan thích lập trình và mạch điện tử. Ngành nào sau đây phù hợp nhất với sở thích này?',
      options: ['Cơ khí, tự động hoá', 'Lâm nghiệp', 'Khí tượng, thuỷ văn', 'Công nghiệp hạt nhân'],
      answer: 0,
      hints: ['Hãy tìm ngành thường xuyên làm việc với robot và bộ điều khiển.'],
      solution:
        'Cơ khí, tự động hoá dùng lập trình và mạch điện tử để điều khiển robot, dây chuyền. Các ngành khác cũng có lúc dùng, nhưng không phải trọng tâm công việc.',
    },
  ],
  takeaways: [
    'Vật lí có ứng dụng trong rất nhiều ngành, từ quân sự, hạt nhân, năng lượng, điện tử, cơ khí đến y tế, giao thông, nông nghiệp, lâm nghiệp và tài chính.',
    'Mỗi thiết bị nghề nghiệp đều dựa trên những nguyên lí vật lí cụ thể.',
    'Công nghiệp hạt nhân có lợi ích lớn nhưng cũng có rủi ro phải kiểm soát.',
    'Một số phương pháp và mô hình của vật lí còn được dùng trong kinh tế, tài chính.',
    'Biết sở thích của bản thân giúp em tìm hiểu đúng ngành nghề và phần vật lí cần học.',
  ],
};
