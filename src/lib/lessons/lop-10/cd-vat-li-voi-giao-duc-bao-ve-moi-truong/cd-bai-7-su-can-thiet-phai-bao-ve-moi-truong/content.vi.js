/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Môi trường là không gian sống, nguồn tài nguyên và nơi chứa chất thải của con người. Biến đổi khí hậu, ô nhiễm, mất rừng và suy giảm tầng ozone đang đe doạ Trái Đất, nên mỗi quốc gia, mỗi cộng đồng và mỗi người đều phải bảo vệ môi trường.',
  intro:
    'Trái Đất là hành tinh duy nhất mà con người biết là có sự sống. Thế nhưng băng ở hai cực đang tan, nước biển dâng, không khí ở nhiều thành phố mù mịt khói bụi. Vì sao bảo vệ môi trường lại cần thiết, và mỗi chúng ta có thể làm gì?',
  objectives: [
    'Nêu được khái niệm môi trường, ô nhiễm môi trường và biến đổi khí hậu.',
    'Nêu được vai trò của môi trường và một số vấn đề môi trường toàn cầu.',
    'Nêu được sự cần thiết bảo vệ môi trường trong chiến lược phát triển của các quốc gia.',
    'Nêu được vai trò của cá nhân và cộng đồng trong bảo vệ môi trường, đề xuất được những việc làm thiết thực.',
  ],
  sections: [
    {
      heading: 'Môi trường và vai trò của môi trường',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Môi trường',
          text: 'Môi trường bao gồm các yếu tố vật chất tự nhiên và nhân tạo quan hệ mật thiết với nhau, bao quanh con người, có ảnh hưởng đến đời sống, kinh tế, xã hội, sự tồn tại, phát triển của con người, sinh vật và tự nhiên (Luật Bảo vệ môi trường năm 2020).',
        },
        {
          type: 'p',
          text: 'Môi trường gồm môi trường tự nhiên (đất, nước, không khí, sinh vật, ánh sáng Mặt Trời), môi trường nhân tạo (nhà cửa, đường sá, nhà máy, đô thị do con người tạo ra) và môi trường xã hội (các mối quan hệ giữa con người với nhau).',
        },
        {
          type: 'list',
          items: [
            'Môi trường là không gian sống của con người và sinh vật.',
            'Môi trường cung cấp tài nguyên thiên nhiên cho đời sống và sản xuất: đất, nước, khoáng sản, rừng, năng lượng.',
            'Môi trường là nơi chứa đựng và phân huỷ chất thải từ sinh hoạt và sản xuất.',
            'Môi trường lưu giữ và cung cấp thông tin: các tầng đất đá, hoá thạch, vòng gỗ trong thân cây cho biết lịch sử Trái Đất và khí hậu.',
          ],
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Ô nhiễm môi trường',
          text: 'Ô nhiễm môi trường là sự biến đổi tính chất vật lí, hoá học, sinh học của thành phần môi trường không phù hợp với quy chuẩn kĩ thuật môi trường, tiêu chuẩn môi trường, gây ảnh hưởng xấu đến sức khoẻ con người, sinh vật và tự nhiên.',
        },
        {
          type: 'p',
          text: 'Ngoài ô nhiễm đất, nước, không khí còn có ô nhiễm tiếng ồn, ô nhiễm nhiệt, ô nhiễm ánh sáng. Phần lớn ô nhiễm hiện nay bắt nguồn từ hoạt động của con người: khí thải nhà máy và xe cộ, nước thải chưa xử lí, rác thải nhựa, phân bón và thuốc bảo vệ thực vật dùng quá mức, chặt phá rừng.',
        },
      ],
    },
    {
      heading: 'Biến đổi khí hậu và các vấn đề môi trường toàn cầu',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Biến đổi khí hậu',
          text: 'Biến đổi khí hậu là sự thay đổi của khí hậu do tác động trực tiếp hoặc gián tiếp của hoạt động con người làm thay đổi thành phần của khí quyển toàn cầu và do sự biến động tự nhiên của khí hậu, quan sát được trong những thời kì có thể so sánh được.',
        },
        {
          type: 'p',
          text: 'Về mặt vật lí, Mặt Trời truyền năng lượng tới Trái Đất chủ yếu dưới dạng ánh sáng nhìn thấy, đi qua khí quyển khá dễ dàng. Mặt đất nóng lên rồi bức xạ trở lại dưới dạng tia hồng ngoại. Các khí nhà kính như $\\mathrm{CO_2}$, $\\mathrm{CH_4}$, hơi nước hấp thụ tia hồng ngoại này rồi bức xạ một phần trở lại mặt đất, giữ nhiệt cho Trái Đất. Đó là hiệu ứng nhà kính. Khi con người đốt nhiều nhiên liệu hoá thạch, lượng khí nhà kính tăng, nhiệt bị giữ lại nhiều hơn và Trái Đất nóng lên.',
        },
        {
          type: 'table',
          caption: 'Một số vấn đề môi trường toàn cầu',
          head: ['Vấn đề', 'Biểu hiện', 'Nguyên nhân chính'],
          rows: [
            [
              'Biến đổi khí hậu',
              'Nhiệt độ trung bình toàn cầu giai đoạn 2011 – 2020 cao hơn thời kì tiền công nghiệp khoảng $1{,}1\\ ^\\circ\\mathrm{C}$; băng tan, nước biển dâng; hạn hán, lũ lụt, bão mạnh hơn',
              'Khí nhà kính từ đốt nhiên liệu hoá thạch, phá rừng',
            ],
            [
              'Ô nhiễm môi trường',
              'Khói bụi đô thị, nước sông ô nhiễm, rác nhựa trên biển',
              'Khí thải, nước thải, rác thải chưa được xử lí',
            ],
            [
              'Mất rừng, suy giảm đa dạng sinh học',
              'Rừng nhiệt đới thu hẹp, nhiều loài bị đe doạ tuyệt chủng',
              'Chặt phá rừng, săn bắt, mất nơi sống',
            ],
            [
              'Suy giảm tầng ozone',
              'Lỗ thủng tầng ozone trên Nam Cực, tia tử ngoại tới mặt đất tăng',
              'Các chất CFC, halon',
            ],
          ],
        },
        {
          type: 'p',
          text: 'Trong phần khám phá của bài, em hãy chọn từng điểm nóng trên bản đồ, đọc biểu hiện và cho biết đó là vấn đề môi trường nào. Sau khi chọn, em sẽ thấy số liệu và nguyên nhân.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Băng nào tan mới làm nước biển dâng?',
          text: 'Băng biển đang nổi trên mặt nước đã chiếm chỗ một thể tích nước có trọng lượng đúng bằng trọng lượng của nó (định luật Archimedes), nên khi tan nó hầu như không làm mực nước biển thay đổi. Nước biển dâng chủ yếu do băng trên lục địa (Greenland, Nam Cực, sông băng trên núi) tan chảy ra biển và do nước biển nở ra khi nóng lên.',
        },
      ],
    },
    {
      heading: 'Bảo vệ môi trường trong chiến lược phát triển của các quốc gia',
      blocks: [
        {
          type: 'p',
          text: 'Môi trường bị huỷ hoại thì sức khoẻ con người bị ảnh hưởng, tài nguyên cạn kiệt, thiên tai gây thiệt hại nặng nề, kinh tế không thể phát triển lâu dài. Ô nhiễm không khí, nước biển dâng hay mất rừng cũng không dừng lại ở biên giới một nước. Vì vậy, bảo vệ môi trường phải là một phần của chiến lược phát triển bền vững: phát triển đáp ứng nhu cầu của hiện tại mà không làm tổn hại khả năng đáp ứng nhu cầu của các thế hệ tương lai.',
        },
        {
          type: 'list',
          items: [
            'Quản lí chất thải rắn, giảm rác thải nhựa; xử lí nước thải và chất thải công nghiệp.',
            'Quản lí hoá chất trong nông nghiệp, nuôi trồng thuỷ sản.',
            'Quản lí, bảo vệ rừng và tài nguyên khoáng sản; trồng rừng để tăng độ che phủ.',
            'Chuyển dần sang năng lượng sạch, sử dụng năng lượng tiết kiệm và hiệu quả.',
            'Tuyên truyền, giáo dục bảo vệ môi trường; chủ động thích ứng với thiên tai và biến đổi khí hậu.',
          ],
        },
        {
          type: 'p',
          text: 'Việt Nam đã ban hành Luật Bảo vệ môi trường năm 2020, Chiến lược quốc gia về tăng trưởng xanh, chương trình trồng một tỉ cây xanh giai đoạn 2021 – 2025, và cam kết đưa mức phát thải ròng khí nhà kính về $0$ vào năm 2050. Độ che phủ rừng được tính bằng tỉ số giữa diện tích rừng và diện tích tự nhiên; ở nước ta, con số này đã tăng dần và đạt trên $42\\%$ từ năm 2020.',
        },
      ],
    },
    {
      heading: 'Vai trò của cá nhân và cộng đồng',
      blocks: [
        {
          type: 'p',
          text: 'Mỗi người và mỗi cộng đồng là chủ thể tác động trực tiếp đến môi trường hằng ngày: dùng điện, nước, đi lại, mua sắm, thải rác. Một việc nhỏ được hàng triệu người cùng làm sẽ tạo ra thay đổi lớn. Cộng đồng còn có thể giám sát, phát hiện và lên tiếng trước những hành vi gây hại môi trường.',
        },
        {
          type: 'p',
          text: 'Hãy xếp mỗi việc làm dưới đây vào "Làm đúng" hoặc "Làm sai" đối với môi trường.',
        },
        { type: 'widget', name: 'hanh-dong' },
        {
          type: 'callout',
          tone: 'note',
          title: 'Mỗi việc nhỏ đều có số liệu',
          text: 'Điện năng tiết kiệm được tính bằng $A = P t$. Một kWh điện từ lưới điện nước ta tạo ra cỡ $0{,}7$ kg $\\mathrm{CO_2}$, vì phần lớn điện vẫn đến từ nhiệt điện than. Tiết kiệm điện cũng chính là giảm phát thải.',
        },
      ],
    },
    {
      heading: 'Dự án: Chiến dịch xanh ở trường em',
      project: true,
      blocks: [
        {
          type: 'p',
          text: 'Mục tiêu: tìm hiểu một vấn đề môi trường ở trường hoặc khu dân cư, đề xuất và thực hiện một phương án vận động mọi người cùng tham gia bảo vệ môi trường. Dụng cụ: sổ ghi chép, điện thoại để chụp ảnh, cân (nếu đo lượng rác), giấy khổ lớn hoặc phần mềm trình chiếu.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Khảo sát và chụp ảnh những nơi môi trường bị ảnh hưởng: rác, nước thải, lãng phí điện nước, thiếu cây xanh.',
            'Chọn một vấn đề, tìm nguyên nhân và ước lượng mức độ bằng số liệu (khối lượng rác mỗi ngày, số bóng đèn bật khi không có người, ...).',
            'Đề xuất ít nhất hai phương án vận động (bảng tin, buổi nói chuyện, cuộc thi, góc tái chế, ...), so sánh và chọn phương án khả thi nhất.',
            'Thực hiện phương án trong khoảng hai tuần và đo lại các số liệu.',
            'So sánh số liệu trước và sau, rút ra bài học.',
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Báo cáo',
          text: 'Nộp một áp phích hoặc bài trình chiếu gồm: vấn đề và nguyên nhân, ảnh minh hoạ, phương án đã chọn và lí do, bảng số liệu trước và sau, những việc làm tiếp theo. Trình bày trong $5$ phút.',
        },
      ],
    },
  ],
  explore: {
    title: 'Bản đồ điểm nóng môi trường',
    instruction:
      'Chạm vào một chấm trên bản đồ hoặc một nút số bên dưới bản đồ, đọc biểu hiện và chọn vấn đề môi trường tương ứng. Sau khi chọn, em đọc số liệu và nguyên nhân rồi chuyển sang điểm tiếp theo.',
  },
  examples: [
    {
      problem:
        'Một tỉnh có diện tích tự nhiên là $600\\,000$ ha, trong đó diện tích rừng là $252\\,000$ ha. Sau một chương trình trồng rừng, diện tích rừng tăng thêm $18\\,000$ ha. Tính độ che phủ rừng trước và sau chương trình.',
      steps: [
        'Độ che phủ rừng bằng diện tích rừng chia cho diện tích tự nhiên, tính theo phần trăm.',
        'Trước: $\\dfrac{252\\,000}{600\\,000} \\cdot 100\\% = 42\\%$.',
        'Sau: diện tích rừng là $252\\,000 + 18\\,000 = 270\\,000$ ha, nên độ che phủ là $\\dfrac{270\\,000}{600\\,000} \\cdot 100\\% = 45\\%$.',
      ],
      answer: 'Độ che phủ rừng tăng từ $42\\%$ lên $45\\%$.',
    },
    {
      problem:
        'Một lớp học có $10$ bóng đèn, mỗi bóng $40$ W. Nhờ tắt đèn khi ra chơi và cuối buổi, mỗi ngày các bóng bớt sáng $2$ giờ. Tính điện năng tiết kiệm được trong $30$ ngày và lượng $\\mathrm{CO_2}$ giảm được, nếu mỗi kWh điện tạo ra $0{,}7$ kg $\\mathrm{CO_2}$.',
      steps: [
        'Công suất của cả $10$ bóng: $P = 10 \\cdot 40 = 400$ W $= 0{,}4$ kW.',
        'Thời gian bớt sáng: $t = 2 \\cdot 30 = 60$ h.',
        'Điện năng tiết kiệm: $A = P t = 0{,}4 \\cdot 60 = 24$ kWh.',
        'Lượng $\\mathrm{CO_2}$ giảm: $24 \\cdot 0{,}7 = 16{,}8$ kg.',
      ],
      answer: 'Tiết kiệm $24$ kWh điện, giảm khoảng $16{,}8$ kg $\\mathrm{CO_2}$ mỗi tháng.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Theo Luật Bảo vệ môi trường năm 2020, môi trường bao gồm những yếu tố nào?',
      options: [
        'Các yếu tố vật chất tự nhiên và nhân tạo quan hệ mật thiết với nhau, bao quanh con người',
        'Chỉ các yếu tố tự nhiên như đất, nước, không khí',
        'Chỉ các công trình do con người xây dựng',
        'Chỉ các loài sinh vật sống trên Trái Đất',
      ],
      answer: 0,
      hints: ['Môi trường gồm cả những gì có sẵn trong tự nhiên lẫn những gì con người tạo ra.'],
      solution:
        'Môi trường bao gồm các yếu tố vật chất tự nhiên và nhân tạo quan hệ mật thiết với nhau, bao quanh con người, ảnh hưởng đến đời sống, sự tồn tại, phát triển của con người, sinh vật và tự nhiên.',
    },
    {
      type: 'multi',
      prompt: 'Những phát biểu nào nêu đúng vai trò của môi trường đối với con người?',
      options: [
        'Là không gian sống của con người và sinh vật',
        'Cung cấp tài nguyên thiên nhiên cho đời sống và sản xuất',
        'Là nơi chứa đựng chất thải của sinh hoạt và sản xuất',
        'Lưu giữ và cung cấp thông tin về lịch sử Trái Đất',
        'Chứa được mọi lượng chất thải mà không bị ô nhiễm',
      ],
      answers: [0, 1, 2, 3],
      hints: ['Một phát biểu quá tuyệt đối: khả năng tự làm sạch của môi trường có giới hạn.'],
      solution:
        'Môi trường là không gian sống, nguồn tài nguyên, nơi chứa chất thải và lưu giữ thông tin. Nhưng khả năng chứa và phân huỷ chất thải có giới hạn; vượt quá giới hạn đó thì môi trường bị ô nhiễm.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi biểu hiện với vấn đề môi trường chính của nó.',
      left: [
        'Băng ở Bắc Cực tan nhanh',
        'Lỗ thủng tầng ozone trên Nam Cực',
        'Rừng Amazon thu hẹp',
        'Vùng rác nhựa trên Thái Bình Dương',
      ],
      right: [
        'Biến đổi khí hậu',
        'Suy giảm tầng ozone',
        'Mất rừng, suy giảm đa dạng sinh học',
        'Ô nhiễm môi trường',
      ],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['Hãy nghĩ tới nguyên nhân: khí nhà kính, chất CFC, chặt phá rừng hay rác thải.'],
      solution:
        'Băng tan: biến đổi khí hậu. Lỗ thủng ozone: suy giảm tầng ozone. Amazon thu hẹp: mất rừng, suy giảm đa dạng sinh học. Rác nhựa trên biển: ô nhiễm môi trường.',
    },
    {
      type: 'choice',
      prompt: 'Vì sao các khí nhà kính làm Trái Đất nóng lên?',
      options: [
        'Chúng hấp thụ tia hồng ngoại do mặt đất bức xạ và bức xạ một phần trở lại mặt đất',
        'Chúng tự toả nhiệt do phản ứng hoá học trong khí quyển',
        'Chúng phản xạ toàn bộ ánh sáng Mặt Trời xuống mặt đất',
        'Chúng làm Trái Đất quay gần Mặt Trời hơn',
      ],
      answer: 0,
      hints: ['Mặt đất nóng lên sẽ bức xạ trở lại không gian dưới dạng tia gì?'],
      solution:
        'Mặt đất bức xạ tia hồng ngoại. Khí nhà kính hấp thụ tia này và bức xạ một phần trở lại mặt đất, nên nhiệt bị giữ lại nhiều hơn.',
    },
    {
      type: 'choice',
      prompt:
        'Một tảng băng đang nổi trên mặt nước biển tan hết. Bỏ qua chênh lệch giữa nước ngọt và nước mặn, mực nước biển thay đổi thế nào?',
      options: ['Hầu như không đổi', 'Dâng lên rõ rệt', 'Hạ xuống rõ rệt', 'Dâng lên rồi hạ xuống'],
      answer: 0,
      hints: [
        'Vật nổi chiếm chỗ một thể tích nước có trọng lượng bằng trọng lượng của vật.',
        'So sánh thể tích nước do băng tan ra với thể tích phần băng chìm.',
      ],
      solution:
        'Băng nổi chiếm chỗ một lượng nước có trọng lượng bằng trọng lượng của nó. Khi tan, nó trở thành đúng lượng nước đó, lấp vừa chỗ phần chìm, nên mực nước hầu như không đổi. Nước biển dâng chủ yếu do băng trên lục địa tan và nước nở vì nhiệt.',
    },
    {
      type: 'number',
      prompt:
        'Một huyện có diện tích tự nhiên $40\\,000$ ha, trong đó $18\\,000$ ha là rừng. Độ che phủ rừng của huyện là bao nhiêu phần trăm?',
      answer: 45,
      tolerance: 0.01,
      unit: '%',
      hints: ['Chia diện tích rừng cho diện tích tự nhiên rồi nhân với $100\\%$.'],
      solution: '$\\dfrac{18\\,000}{40\\,000} \\cdot 100\\% = 45\\%$.',
    },
    {
      type: 'number',
      prompt:
        'Một chiếc quạt công suất $50$ W được tắt bớt $3$ giờ mỗi ngày. Trong $30$ ngày, điện năng tiết kiệm được là bao nhiêu kWh?',
      answer: 4.5,
      tolerance: 0.01,
      unit: 'kWh',
      hints: ['Đổi công suất sang kW và tính tổng số giờ.', 'Dùng $A = P t$.'],
      solution: '$A = 0{,}05 \\cdot (3 \\cdot 30) = 0{,}05 \\cdot 90 = 4{,}5$ kWh.',
    },
    {
      type: 'number',
      prompt:
        'Một gia đình tiết kiệm được $30$ kWh điện mỗi tháng. Nếu mỗi kWh điện tạo ra $0{,}7$ kg $\\mathrm{CO_2}$, trong một năm gia đình đó giảm được bao nhiêu kilôgam $\\mathrm{CO_2}$?',
      answer: 252,
      tolerance: 0.01,
      unit: 'kg',
      hints: ['Tính điện năng tiết kiệm trong $12$ tháng trước.'],
      solution:
        'Điện năng một năm: $30 \\cdot 12 = 360$ kWh. Lượng $\\mathrm{CO_2}$: $360 \\cdot 0{,}7 = 252$ kg.',
    },
    {
      type: 'text',
      prompt:
        'Sự phát triển đáp ứng nhu cầu của hiện tại mà không làm tổn hại khả năng đáp ứng nhu cầu của các thế hệ tương lai được gọi là phát triển gì?',
      accept: ['bền vững', 'phát triển bền vững'],
      hints: ['Đó là sự phát triển có thể kéo dài lâu bền qua nhiều thế hệ.'],
      solution: 'Đó là phát triển bền vững.',
    },
    {
      type: 'choice',
      prompt: 'Vì sao bảo vệ môi trường cần có sự hợp tác giữa các quốc gia?',
      options: [
        'Vì ô nhiễm không khí, nước biển dâng, biến đổi khí hậu không dừng lại ở biên giới một nước',
        'Vì mỗi nước tự bảo vệ môi trường của mình là đủ',
        'Vì chỉ các nước giàu mới gây ô nhiễm',
        'Vì môi trường chỉ cần được bảo vệ ở các vùng cực',
      ],
      answer: 0,
      hints: ['Hãy nghĩ đến khí quyển và đại dương mà mọi quốc gia cùng dùng chung.'],
      solution:
        'Khí quyển và đại dương là của chung. Khí nhà kính thải ở một nước làm cả Trái Đất nóng lên, khói bụi và rác thải cũng lan sang nước khác, nên các quốc gia phải cùng hành động.',
    },
    {
      type: 'multi',
      prompt: 'Những việc nào là hành động thiết thực của học sinh để bảo vệ môi trường?',
      options: [
        'Phân loại rác tại nguồn',
        'Tắt thiết bị điện khi không dùng',
        'Dùng túi vải thay túi nilon',
        'Đốt rác nhựa để giảm lượng rác',
        'Bỏ pin cũ chung với rác sinh hoạt',
      ],
      answers: [0, 1, 2],
      hints: ['Loại những việc sinh ra khói độc hoặc đưa kim loại nặng vào đất.'],
      solution:
        'Phân loại rác, tiết kiệm điện, dùng túi vải đều giảm tác động xấu tới môi trường. Đốt nhựa sinh khí độc và bụi mịn; pin cũ chứa kim loại nặng cần được thu gom riêng.',
    },
  ],
  takeaways: [
    'Môi trường gồm các yếu tố tự nhiên và nhân tạo bao quanh con người; nó là không gian sống, nguồn tài nguyên, nơi chứa chất thải và lưu giữ thông tin.',
    'Các vấn đề môi trường toàn cầu: biến đổi khí hậu, ô nhiễm, mất rừng và suy giảm đa dạng sinh học, suy giảm tầng ozone.',
    'Khí nhà kính hấp thụ tia hồng ngoại từ mặt đất, giữ nhiệt và làm Trái Đất nóng lên.',
    'Bảo vệ môi trường là điều kiện để các quốc gia phát triển bền vững và cần sự hợp tác quốc tế.',
    'Mỗi cá nhân, cộng đồng tác động trực tiếp tới môi trường; những việc nhỏ như tiết kiệm điện, phân loại rác đều có ý nghĩa.',
  ],
};
