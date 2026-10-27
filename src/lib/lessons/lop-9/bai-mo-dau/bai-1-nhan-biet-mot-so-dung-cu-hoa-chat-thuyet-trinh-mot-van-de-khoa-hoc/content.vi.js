/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Nhận biết dụng cụ thí nghiệm quang học, điện từ, dụng cụ hoá học và các hoá chất thường dùng ở lớp 9 cùng cách bảo quản, sử dụng an toàn; viết báo cáo và thuyết trình một vấn đề khoa học bằng trình chiếu hoặc báo cáo treo tường.',
  intro:
    'Ở lớp 9, em sẽ cho tia sáng đi qua khối thuỷ tinh, tìm ảnh của vật qua thấu kính, tạo ra dòng điện bằng nam châm và làm nhiều phản ứng hoá học. Muốn thí nghiệm thành công và an toàn, trước hết phải chọn đúng dụng cụ, hoá chất và biết cách dùng chúng. Làm xong thí nghiệm, em còn cần trình bày kết quả sao cho người khác hiểu và tin được. Bài mở đầu này giúp em chuẩn bị cả hai việc đó.',
  objectives: [
    'Nhận biết được một số dụng cụ thí nghiệm quang học và điện từ, nêu được công dụng của chúng.',
    'Nhận biết được một số dụng cụ và hoá chất thường dùng, nêu được cách bảo quản và sử dụng hoá chất an toàn.',
    'Nêu được cấu trúc của một báo cáo khoa học.',
    'Thuyết trình được một vấn đề khoa học bằng phần mềm trình chiếu hoặc báo cáo treo tường.',
  ],
  sections: [
    {
      heading: 'Dụng cụ thí nghiệm quang học',
      blocks: [
        {
          type: 'p',
          text: 'Các thí nghiệm về khúc xạ ánh sáng, phản xạ toàn phần và thấu kính dùng những dụng cụ sau.',
        },
        {
          type: 'table',
          caption: 'Một số dụng cụ thí nghiệm quang học',
          head: ['Dụng cụ', 'Công dụng'],
          rows: [
            [
              'Nguồn sáng: đèn sợi đốt 12 V kèm màn chắn có một khe hoặc nhiều khe hẹp',
              'Tạo một tia sáng hoặc một chùm tia sáng hẹp',
            ],
            [
              'Nguồn laser',
              'Tạo các tia sáng hẹp, rõ nét; mỗi tia được bật bằng một công tắc trên đèn',
            ],
            [
              'Bản bán trụ (khối thuỷ tinh trong suốt hình nửa trụ)',
              'Cho tia sáng truyền từ không khí vào thuỷ tinh và ngược lại để nghiên cứu khúc xạ, phản xạ toàn phần',
            ],
            [
              'Bảng chia độ',
              'Đọc giá trị các góc khi nghiên cứu hiện tượng khúc xạ và phản xạ toàn phần',
            ],
            [
              'Bộ thí nghiệm thấu kính: thấu kính hội tụ, thấu kính phân kì, màn chắn, đèn, khe chữ F, giá quang học đồng trục',
              'Nghiên cứu đặc điểm ảnh của vật tạo bởi thấu kính',
            ],
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'An toàn với dụng cụ quang học',
          text: 'Không chiếu tia laser vào mắt. Bóng đèn sợi đốt nóng khi sáng lâu, không chạm tay vào. Cầm thấu kính, bản bán trụ ở vành hoặc mặt cong, không để vân tay trên mặt quang học, đặt nhẹ để không làm vỡ, xước.',
        },
      ],
    },
    {
      heading: 'Dụng cụ thí nghiệm điện từ và các dụng cụ khác',
      blocks: [
        {
          type: 'table',
          caption: 'Một số dụng cụ thí nghiệm điện từ',
          head: ['Dụng cụ', 'Công dụng'],
          rows: [
            [
              'Điện kế (galvanometer)',
              'Phát hiện dòng điện rất nhỏ, như dòng điện cảm ứng. Vạch 0 nằm ở giữa mặt số',
            ],
            [
              'Đồng hồ đo điện đa năng',
              'Đo cường độ dòng điện, hiệu điện thế, điện trở,… của mạch điện một chiều và xoay chiều',
            ],
            [
              'Cuộn dây dẫn có hai đèn LED mắc song song, ngược cực nhau',
              'Phát hiện dòng điện cảm ứng và chiều của nó',
            ],
          ],
        },
        {
          type: 'p',
          text: 'Vạch 0 của điện kế nằm ở giữa vì dòng điện cảm ứng có thể chạy theo hai chiều: khi dòng điện đổi chiều, kim lệch sang phía ngược lại, ứng với giá trị âm. Tương tự, đèn LED chỉ sáng khi dòng điện chạy qua nó theo một chiều, nên với hai đèn LED mắc ngược cực nhau, đèn nào sáng cho biết dòng điện cảm ứng đang chạy theo chiều nào.',
        },
        {
          type: 'p',
          text: 'Các thí nghiệm về điện còn dùng những thiết bị đã biết ở lớp 8: biến áp nguồn, ampe kế, vôn kế, joulemeter, điện trở, biến trở, công tắc, dây nối,…',
        },
        {
          type: 'list',
          items: [
            'Dụng cụ cho thí nghiệm về chất và sự biến đổi của chất: ống nghiệm, cốc thuỷ tinh, phễu, phễu chiết, bình cầu, đèn cồn, kiềng ba chân, lưới tản nhiệt,… Phễu, phễu chiết, bình cầu thường làm bằng thuỷ tinh nên dễ vỡ, phải cầm nắm cẩn thận.',
            'Khi đun dung dịch trong cốc thuỷ tinh, đặt cốc trên lưới tản nhiệt để nhiệt phân bố đều ở đáy cốc, tránh cốc bị nứt vỡ.',
            'Dụng cụ quan sát nhiễm sắc thể: kính hiển vi và tiêu bản cố định. Khi dùng vật kính có độ phóng đại lớn ($100\\times$), nhỏ dầu soi kính lên tiêu bản để nhìn rõ các mẫu vật rất nhỏ, trong suốt.',
          ],
        },
      ],
    },
    {
      heading: 'Một số hoá chất thường dùng',
      blocks: [
        {
          type: 'table',
          caption: 'Hoá chất cơ bản trong phòng thí nghiệm lớp 9',
          head: ['Nhóm', 'Ví dụ'],
          rows: [
            ['Kim loại', 'sodium (Na), iron (Fe), copper (Cu)'],
            ['Phi kim', 'sulfur (S), iodine ($\\text{I}_2$)'],
            ['Oxide', 'CuO, CaO, $\\text{MnO}_2$'],
            ['Acid', 'HCl, $\\text{H}_2\\text{SO}_4$'],
            ['Base', 'NaOH, $\\text{NH}_3$ (dung dịch ammonia)'],
            [
              'Hợp chất hữu cơ',
              'ethylic alcohol ($\\text{C}_2\\text{H}_5\\text{OH}$), glucose ($\\text{C}_6\\text{H}_{12}\\text{O}_6$)',
            ],
            ['Chất chỉ thị', 'giấy pH, dung dịch phenolphthalein'],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Bảo quản hoá chất',
          text: 'Hoá chất được đựng trong chai, lọ có nắp đậy kín và dán nhãn ghi thông tin về hoá chất. Hoá chất dễ bị ánh sáng phân huỷ được đựng trong lọ màu tối, để nơi tối hoặc bọc giấy đen bên ngoài. Kim loại sodium phản ứng mạnh với nước và oxygen nên được ngâm trong dầu hoả.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Sử dụng hoá chất an toàn',
          text: 'Đọc kĩ nhãn trước khi dùng để tránh nhầm lẫn. Lấy đúng lượng cần dùng, đậy nắp lọ ngay sau khi lấy; không đổ hoá chất thừa trở lại lọ. Không tự ý nghiền, trộn các hoá chất với nhau vì có thể gây phản ứng không mong muốn, thậm chí gây nổ. Với hoá chất dễ bay hơi, độc hại hoặc nguy hiểm như $\\text{H}_2\\text{SO}_4$ đặc: đeo kính, khẩu trang, găng tay, thao tác cẩn thận theo hướng dẫn của giáo viên.',
        },
      ],
    },
    {
      heading: 'Báo cáo và thuyết trình một vấn đề khoa học',
      blocks: [
        {
          type: 'p',
          text: 'Sau một nghiên cứu hay một bài thực hành, kết quả cần được viết thành báo cáo. Báo cáo một vấn đề khoa học có cấu trúc chặt chẽ và đầy đủ hơn báo cáo thực hành: có thêm tóm tắt, thảo luận và tài liệu tham khảo.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Tiêu đề: tên vấn đề nghiên cứu, ngắn gọn, rõ ràng; kèm tên tác giả.',
            'Tóm tắt: vài câu nêu mục tiêu, cách làm và kết quả chính.',
            'Giới thiệu: lí do chọn vấn đề, câu hỏi và giả thuyết nghiên cứu.',
            'Phương pháp: dụng cụ, hoá chất, các bước tiến hành.',
            'Kết quả: số liệu, bảng, đồ thị, hình ảnh thu được.',
            'Thảo luận: giải thích kết quả, so sánh với giả thuyết, nêu sai số và hạn chế.',
            'Kết luận: câu trả lời cho câu hỏi nghiên cứu, đề xuất.',
            'Tài liệu tham khảo: các nguồn đã dùng.',
          ],
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Thuyết trình bằng phần mềm trình chiếu',
          text: 'Bài thuyết trình gồm ba phần: mở đầu (chủ đề, người trình bày, mục tiêu), nội dung (tổng quan, phương pháp, kết quả, thảo luận) và kết luận (tóm tắt, đề xuất). Mỗi trang chiếu nêu ít ý, chữ đủ lớn, dùng hình ảnh, bảng, đồ thị. Khi nói, dùng ngôn ngữ đơn giản, rõ ràng, tập trung vào thông điệp chính, nhìn và tương tác với người nghe, giữ đúng thời gian, rồi trả lời câu hỏi.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Báo cáo treo tường (poster)',
          text: 'Thường in khổ A0 hoặc A1, đặt dọc hoặc ngang. Tiêu đề chữ lớn, đọc được từ xa, tên tác giả ngay bên dưới. Nội dung chia thành các phần: giới thiệu, phương pháp, kết quả, thảo luận, kết luận; tài liệu tham khảo có thể dùng cỡ chữ nhỏ hơn. Dùng ít màu, chữ và nền tương phản, phông chữ đơn giản, dễ đọc; ít chữ, nhiều hình ảnh, đồ thị. Treo ở nơi dễ nhìn, dễ tiếp cận.',
        },
        {
          type: 'table',
          caption: 'So sánh hai cách thuyết trình',
          head: ['Tiêu chí', 'Trình chiếu', 'Báo cáo treo tường'],
          rows: [
            [
              'Ưu điểm',
              'Sinh động, dùng được hình động, video; trình bày đủ các nội dung theo trình tự',
              'Người xem đọc theo tốc độ của mình, xem lại được nhiều lần; trưng bày được lâu, nhiều nhóm cùng lúc',
            ],
            [
              'Hạn chế',
              'Cần máy chiếu, máy tính; mất nhiều thời gian chuẩn bị để bài hay, sinh động',
              'Diện tích có hạn nên phải chọn lọc nội dung; không có chuyển động, âm thanh',
            ],
          ],
        },
      ],
    },
  ],
  explore: {
    title: 'Kho dụng cụ ảo',
    instruction:
      'Chọn một thí nghiệm và đọc mục tiêu. Mở từng kệ trong kho, bấm vào mỗi dụng cụ, hoá chất để xem tên, công dụng và lưu ý an toàn, rồi thêm những thứ cần dùng vào bộ dụng cụ. Nhấn "Kiểm tra bộ dụng cụ": nếu thiếu, kho cho biết còn thiếu dụng cụ để làm việc gì; nếu thừa, kho chỉ ra món không cần hoặc các món làm trùng việc nhau. Lắp đúng cả sáu thí nghiệm.',
  },
  examples: [
    {
      problem:
        'Cần đo góc tới và góc khúc xạ khi chiếu một tia sáng từ không khí vào thuỷ tinh. Hãy chọn dụng cụ và nêu công dụng của từng dụng cụ.',
      steps: [
        'Cần một tia sáng hẹp: dùng nguồn laser, hoặc đèn sợi đốt 12 V kèm màn chắn có một khe hẹp.',
        'Cần môi trường thuỷ tinh có mặt phân cách phẳng: dùng bản bán trụ.',
        'Cần đọc góc: dùng bảng chia độ, đặt tâm bảng trùng tâm mặt phẳng của bản bán trụ.',
        'Thấu kính, màn chắn, khe chữ F không cần cho thí nghiệm này.',
      ],
      answer: 'Nguồn sáng (laser hoặc đèn có khe hẹp), bản bán trụ, bảng chia độ.',
    },
    {
      problem:
        'Đưa một cực của nam châm vào trong cuộn dây nối với điện kế, kim điện kế lệch sang phải. Kéo nam châm ra, kim lệch sang trái. Vì sao vạch 0 của điện kế đặt ở giữa mặt số? Có thể thay điện kế bằng dụng cụ nào?',
      steps: [
        'Kim lệch sang hai phía khác nhau cho biết dòng điện cảm ứng ở hai lần có chiều ngược nhau.',
        'Nếu vạch 0 ở mép trái như ampe kế thường, kim không thể lệch về bên trái nên không thấy được chiều ngược lại; đặt vạch 0 ở giữa thì kim lệch được cả hai phía.',
        'Có thể dùng cuộn dây dẫn có hai đèn LED mắc song song, ngược cực nhau: mỗi đèn chỉ sáng với một chiều dòng điện, nên đèn nào sáng cho biết chiều dòng điện cảm ứng.',
      ],
      answer:
        'Vạch 0 ở giữa để kim lệch được sang hai phía, chỉ ra hai chiều của dòng điện; có thể thay bằng cuộn dây có hai đèn LED mắc ngược cực.',
    },
    {
      problem:
        'Nhóm em đã làm thí nghiệm đo góc khúc xạ và muốn thuyết trình trước lớp bằng phần mềm trình chiếu. Hãy lập dàn ý cho bài thuyết trình.',
      steps: [
        'Mở đầu: tên chủ đề "Đo góc khúc xạ khi ánh sáng đi từ không khí vào thuỷ tinh", tên các thành viên, mục tiêu.',
        'Nội dung: tổng quan về hiện tượng khúc xạ; phương pháp (dụng cụ, các bước); kết quả (bảng góc tới, góc khúc xạ, đồ thị); thảo luận (nhận xét, sai số).',
        'Kết luận: tóm tắt điều rút ra (góc khúc xạ nhỏ hơn góc tới khi ánh sáng đi từ không khí vào thuỷ tinh), đề xuất làm thêm.',
        'Cuối cùng dành thời gian trả lời câu hỏi của các bạn.',
      ],
      answer: 'Dàn ý ba phần: mở đầu, nội dung, kết luận; kèm phần trả lời câu hỏi.',
    },
  ],
  practice: [
    {
      type: 'match',
      prompt: 'Nối mỗi dụng cụ với công dụng của nó.',
      left: ['Bảng chia độ', 'Điện kế', 'Đồng hồ đo điện đa năng', 'Lưới tản nhiệt'],
      right: [
        'Đo cường độ dòng điện, hiệu điện thế, điện trở',
        'Đọc giá trị các góc trong thí nghiệm khúc xạ',
        'Làm nhiệt phân bố đều khi đun cốc thuỷ tinh',
        'Phát hiện dòng điện cảm ứng',
        'Tạo vật sáng trước thấu kính',
      ],
      pairs: [
        [0, 1],
        [1, 3],
        [2, 0],
        [3, 2],
      ],
      hints: ['Một công dụng ở cột phải không dùng đến: đó là việc của khe chữ F.'],
      solution:
        'Bảng chia độ đọc góc; điện kế phát hiện dòng điện cảm ứng; đồng hồ đa năng đo cường độ dòng điện, hiệu điện thế, điện trở; lưới tản nhiệt làm nhiệt phân bố đều. "Tạo vật sáng trước thấu kính" là công dụng của khe chữ F.',
    },
    {
      type: 'multi',
      prompt: 'Những dụng cụ nào thuộc bộ thí nghiệm tìm ảnh của vật tạo bởi thấu kính hội tụ?',
      options: [
        'Thấu kính hội tụ',
        'Khe chữ F',
        'Điện kế',
        'Màn chắn',
        'Giá quang học đồng trục',
        'Lưới tản nhiệt',
      ],
      answers: [0, 1, 3, 4],
      hints: ['Cần vật sáng, thấu kính, chỗ hứng ảnh và giá để đặt chúng trên cùng một trục.'],
      solution:
        'Bộ thí nghiệm thấu kính gồm đèn, khe chữ F (vật sáng), thấu kính, màn chắn và giá quang học đồng trục. Điện kế là dụng cụ điện từ, lưới tản nhiệt là dụng cụ đun nóng.',
    },
    {
      type: 'choice',
      prompt: 'Vì sao vạch 0 của điện kế dùng trong thí nghiệm cảm ứng điện từ nằm ở giữa mặt số?',
      options: [
        'Để kim lệch được sang hai phía, cho biết hai chiều của dòng điện',
        'Để đo được dòng điện lớn hơn',
        'Để điện kế đẹp và cân đối hơn',
        'Vì điện kế chỉ đo được hiệu điện thế',
      ],
      answer: 0,
      hints: ['Khi đưa nam châm vào rồi kéo ra, chiều dòng điện cảm ứng thay đổi.'],
      solution:
        'Dòng điện cảm ứng có thể đổi chiều; khi dòng điện đổi chiều, kim lệch về phía ngược lại (giá trị âm). Vạch 0 ở giữa cho phép thấy cả hai chiều.',
    },
    {
      type: 'choice',
      prompt:
        'Cuộn dây dẫn có hai đèn LED mắc song song, ngược cực nhau. Khi đưa nam châm vào cuộn dây, đèn LED thứ nhất sáng. Khi kéo nam châm ra, điều gì xảy ra?',
      options: [
        'Đèn thứ nhất sáng tiếp',
        'Đèn thứ hai sáng, vì dòng điện cảm ứng đổi chiều',
        'Cả hai đèn cùng sáng',
        'Không đèn nào sáng vì không có dòng điện',
      ],
      answer: 1,
      hints: ['Mỗi đèn LED chỉ cho dòng điện đi qua theo một chiều.'],
      solution:
        'Kéo nam châm ra, dòng điện cảm ứng chạy theo chiều ngược lại. Đèn LED thứ nhất không cho dòng điện theo chiều này đi qua, còn đèn thứ hai (mắc ngược cực) sáng.',
    },
    {
      type: 'number',
      prompt:
        'Trên bảng chia độ, tia tới hợp với mặt phẳng của bản bán trụ một góc $30^\\circ$. Góc tới bằng bao nhiêu độ?',
      answer: 60,
      unit: '°',
      hints: [
        'Góc tới là góc giữa tia tới và pháp tuyến tại điểm tới, không phải góc giữa tia tới và mặt phân cách.',
        'Pháp tuyến vuông góc với mặt phân cách.',
      ],
      solution: 'Góc tới $i = 90^\\circ - 30^\\circ = 60^\\circ$.',
    },
    {
      type: 'multi',
      prompt: 'Những cách làm nào đúng khi sử dụng hoá chất?',
      options: [
        'Đọc kĩ nhãn trước khi lấy hoá chất',
        'Lấy thật nhiều hoá chất cho chắc, thừa thì đổ lại lọ',
        'Đậy nắp lọ ngay sau khi lấy',
        'Tự ý trộn hai hoá chất xem có hiện tượng gì',
        'Đeo kính, khẩu trang, găng tay khi dùng $\\text{H}_2\\text{SO}_4$ đặc',
      ],
      answers: [0, 2, 4],
      hints: [
        'Hai việc trong danh sách có thể làm bẩn cả lọ hoá chất hoặc gây phản ứng nguy hiểm.',
      ],
      solution:
        'Đúng: đọc kĩ nhãn, đậy nắp ngay, dùng đồ bảo hộ với hoá chất nguy hiểm. Sai: phải lấy đúng lượng cần dùng và không đổ hoá chất thừa lại lọ; không tự ý nghiền, trộn hoá chất vì có thể gây phản ứng không mong muốn, thậm chí gây nổ.',
    },
    {
      type: 'choice',
      prompt: 'Hoá chất dễ bị ánh sáng phân huỷ nên được bảo quản thế nào?',
      options: [
        'Đựng trong lọ thuỷ tinh trong suốt, đặt cạnh cửa sổ',
        'Đựng trong lọ màu tối, để nơi tối hoặc bọc giấy đen bên ngoài',
        'Để trong cốc thuỷ tinh không đậy nắp',
        'Ngâm trong nước',
      ],
      answer: 1,
      hints: ['Cần ngăn ánh sáng chiếu vào hoá chất.'],
      solution:
        'Lọ màu tối, nơi tối hoặc giấy đen bọc ngoài ngăn ánh sáng chiếu vào hoá chất, nên hoá chất không bị phân huỷ.',
    },
    {
      type: 'text',
      prompt: 'Kim loại sodium được bảo quản bằng cách ngâm trong chất lỏng nào?',
      accept: ['dầu hoả', 'dầu hỏa', 'dầu', 'kerosene'],
      hints: [
        'Sodium phản ứng mạnh với nước và oxygen, nên chất lỏng này không chứa nước và ngăn không khí.',
      ],
      solution:
        'Sodium được ngâm trong dầu hoả: dầu hoả không phản ứng với sodium và ngăn sodium tiếp xúc với hơi nước, oxygen trong không khí.',
    },
    {
      type: 'choice',
      prompt: 'Chất nào sau đây là chất chỉ thị thường dùng trong phòng thí nghiệm?',
      options: ['Glucose', 'Phenolphthalein', 'Calcium oxide', 'Copper'],
      answer: 1,
      hints: ['Chất chỉ thị đổi màu theo môi trường acid hay base.'],
      solution:
        'Phenolphthalein (cùng với giấy pH) là chất chỉ thị: chuyển màu hồng trong dung dịch base. Glucose là hợp chất hữu cơ, calcium oxide là oxide, copper là kim loại.',
    },
    {
      type: 'order',
      prompt: 'Sắp xếp các phần của một báo cáo khoa học theo đúng thứ tự.',
      items: [
        'Kết quả',
        'Tiêu đề',
        'Phương pháp',
        'Tài liệu tham khảo',
        'Giới thiệu',
        'Thảo luận',
        'Tóm tắt',
        'Kết luận',
      ],
      answer: [1, 6, 4, 2, 0, 5, 7, 3],
      hints: [
        'Mở đầu bằng tên và phần tóm lược, kết thúc bằng các nguồn đã dùng.',
        'Phải có số liệu trước rồi mới bàn luận và kết luận về chúng.',
      ],
      solution:
        'Tiêu đề → Tóm tắt → Giới thiệu → Phương pháp → Kết quả → Thảo luận → Kết luận → Tài liệu tham khảo.',
    },
    {
      type: 'multi',
      prompt: 'Những yêu cầu nào đúng với một báo cáo treo tường?',
      options: [
        'Tiêu đề chữ lớn, đọc được từ xa',
        'Viết thật nhiều chữ để đủ thông tin',
        'Dùng nhiều hình ảnh, đồ thị',
        'Dùng thật nhiều màu sắc rực rỡ',
        'Chữ và nền tương phản, phông chữ đơn giản',
      ],
      answers: [0, 2, 4],
      hints: ['Người xem thường đứng cách poster vài bước và chỉ dừng lại trong thời gian ngắn.'],
      solution:
        'Poster cần tiêu đề lớn, ít chữ, nhiều hình ảnh và đồ thị, ít màu, chữ và nền tương phản, phông chữ dễ đọc. Nhiều chữ và nhiều màu làm poster rối, khó đọc.',
    },
    {
      type: 'choice',
      prompt: 'Bài thuyết trình bằng phần mềm trình chiếu gồm những phần chính nào?',
      options: [
        'Mở đầu, nội dung, kết luận',
        'Chỉ có phần kết quả',
        'Tiêu đề và tài liệu tham khảo',
        'Câu hỏi và trả lời',
      ],
      answer: 0,
      hints: ['Giống bố cục của một bài văn.'],
      solution:
        'Bài thuyết trình gồm ba phần: mở đầu (chủ đề, mục tiêu), nội dung (tổng quan, phương pháp, kết quả, thảo luận) và kết luận (tóm tắt, đề xuất).',
    },
  ],
  takeaways: [
    'Dụng cụ quang học: nguồn sáng (đèn có khe hẹp, laser), bản bán trụ, bảng chia độ, bộ thí nghiệm thấu kính trên giá quang học đồng trục.',
    'Dụng cụ điện từ: điện kế (vạch 0 ở giữa), đồng hồ đo điện đa năng, cuộn dây có hai đèn LED mắc ngược cực để phát hiện dòng điện cảm ứng.',
    'Hoá chất đựng trong lọ có nắp, dán nhãn; chất dễ bị ánh sáng phân huỷ đựng lọ màu tối; sodium ngâm trong dầu hoả.',
    'Đọc kĩ nhãn, lấy đúng lượng, đậy nắp ngay, không tự ý nghiền, trộn hoá chất; đun cốc thuỷ tinh trên lưới tản nhiệt.',
    'Báo cáo khoa học: tiêu đề, tóm tắt, giới thiệu, phương pháp, kết quả, thảo luận, kết luận, tài liệu tham khảo; thuyết trình bằng trình chiếu (mở đầu, nội dung, kết luận) hoặc báo cáo treo tường.',
  ],
};
