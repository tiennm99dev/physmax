/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Nhận biết hoá chất qua nhãn, quy tắc lấy và dùng hoá chất an toàn, cách dùng một số dụng cụ thí nghiệm, máy đo pH, huyết áp kế và các thiết bị điện: nguồn điện, biến áp nguồn, ampe kế, vôn kế, joulemeter.',
  intro:
    'Ở lớp 8, em sẽ làm nhiều thí nghiệm với hoá chất, dụng cụ thuỷ tinh và mạch điện. Một lọ hoá chất không có nhãn, một ống nghiệm kẹp quá thấp hay một ampe kế mắc nhầm song song với bóng đèn đều có thể làm thí nghiệm thất bại, thậm chí gây tai nạn. Vậy khi dùng hoá chất, dụng cụ và thiết bị đo, cần chú ý những gì để thí nghiệm vừa thành công vừa an toàn?',
  objectives: [
    'Đọc được thông tin trên nhãn hoá chất và nêu được quy tắc sử dụng hoá chất an toàn.',
    'Nêu được cách lấy hoá chất rắn, hoá chất lỏng và cách dùng ống nghiệm, ống hút nhỏ giọt.',
    'Nêu được cách dùng thiết bị đo pH và huyết áp kế.',
    'Nhận biết được nguồn điện, biến áp nguồn, ampe kế, vôn kế, joulemeter, thiết bị sử dụng điện, thiết bị điện hỗ trợ và cách sử dụng chúng an toàn.',
  ],
  sections: [
    {
      heading: 'Nhận biết hoá chất và quy tắc sử dụng hoá chất an toàn',
      blocks: [
        {
          type: 'p',
          text: 'Các hoá chất trong phòng thí nghiệm đều được đựng trong chai hoặc lọ kín, thường làm bằng thuỷ tinh, nhựa,… và có dán nhãn. Nhãn ghi tên hoá chất, công thức hoá học, khối lượng hoặc thể tích, độ tinh khiết, nhà sản xuất, các kí hiệu cảnh báo, điều kiện bảo quản,… Dung dịch pha sẵn còn ghi nồng độ của chất tan.',
        },
        {
          type: 'table',
          caption: 'Ví dụ thông tin trên nhãn hai lọ hoá chất',
          head: ['Thông tin', 'Lọ thứ nhất', 'Lọ thứ hai'],
          rows: [
            ['Tên hoá chất', 'sodium hydroxide', 'hydrochloric acid'],
            ['Công thức hoá học', 'NaOH', 'HCl'],
            [
              'Thông tin khác',
              'Độ tinh khiết AR (tinh khiết), khối lượng 500 g',
              'Nồng độ 37%, khối lượng mol 36,46 g/mol',
            ],
            ['Kí hiệu cảnh báo', 'Chất ăn mòn', 'Chất ăn mòn, gây hại sức khoẻ'],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Cách lấy hoá chất',
          text: 'Không được dùng tay trực tiếp lấy hoá chất. Hoá chất rắn dạng hạt nhỏ hay bột: dùng thìa kim loại hoặc thìa thuỷ tinh để xúc; dạng hạt to, dây, thanh: dùng panh để gắp. Không đặt lại thìa, panh vào lọ hoá chất sau khi đã dùng. Hoá chất lỏng từ chai miệng nhỏ: rót qua phễu hoặc qua cốc, ống đong có mỏ; lấy lượng nhỏ dùng ống hút nhỏ giọt. Khi rót, hướng nhãn lên phía trên để giọt hoá chất không chảy vào làm hỏng nhãn.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Quy tắc sử dụng hoá chất an toàn',
          text: 'Không dùng hoá chất đựng trong đồ chứa không có nhãn hoặc nhãn mờ, mất chữ. Đọc cẩn thận nhãn, tìm hiểu kĩ tính chất và cảnh báo của hoá chất trước khi dùng. Làm thí nghiệm cẩn thận, đúng quy tắc. Khi hoá chất dính vào người, bị đổ hoặc tràn, báo ngay cho giáo viên để được hướng dẫn xử lí. Hoá chất dùng còn thừa không được đổ trở lại bình chứa mà xử lí theo hướng dẫn của giáo viên.',
        },
        {
          type: 'p',
          text: 'Ví dụ xử lí sự cố: bị bỏng acid đặc thì dội nước rửa ngay nhiều lần (cho vòi nước chảy mạnh vào vết bỏng khoảng 3 đến 5 phút) rồi báo giáo viên; khi có khí độc, ngừng thí nghiệm, mở cửa cho thoáng và đưa người bị ảnh hưởng ra chỗ thoáng gió.',
        },
      ],
    },
    {
      heading: 'Một số dụng cụ thí nghiệm và cách sử dụng',
      blocks: [
        {
          type: 'table',
          caption: 'Dụng cụ thí nghiệm thông dụng',
          head: ['Dụng cụ', 'Dùng để'],
          rows: [
            ['Ống nghiệm', 'Đựng một lượng nhỏ hoá chất để làm thí nghiệm, đun nóng'],
            ['Giá để ống nghiệm', 'Đặt các ống nghiệm'],
            ['Kẹp ống nghiệm (kẹp gỗ)', 'Kẹp ống nghiệm khi đun nóng'],
            ['Cốc thuỷ tinh, bình nón (bình tam giác)', 'Đựng, pha, đun dung dịch'],
            ['Phễu lọc', 'Lọc chất rắn khỏi chất lỏng, rót chất lỏng vào chai miệng nhỏ'],
            ['Ống đong', 'Đong một lượng chất lỏng'],
            ['Ống hút nhỏ giọt', 'Lấy một lượng nhỏ chất lỏng, nhỏ từng giọt'],
            ['Đũa thuỷ tinh', 'Khuấy khi hoà tan chất rắn'],
            ['Thìa thuỷ tinh, panh', 'Lấy hoá chất rắn'],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Ống nghiệm',
          text: 'Khi làm thí nghiệm, giữ ống nghiệm bằng tay không thuận, dùng tay thuận để thêm hoá chất. Khi đun nóng, kẹp ống nghiệm ở khoảng $\\dfrac{1}{3}$ ống tính từ miệng ống. Từ từ đưa đáy ống vào ngọn lửa đèn cồn, miệng ống nghiêng về phía không có người, làm nóng đều đáy ống rồi mới đun tập trung ở chỗ có hoá chất. Đặt đáy ống ở chỗ nóng nhất của ngọn lửa (khoảng $\\dfrac{2}{3}$ ngọn lửa tính từ dưới lên), không để đáy ống chạm vào bấc đèn.',
        },
        {
          type: 'p',
          text: 'Kẹp quá cao thì khó thao tác, kẹp quá thấp thì ống dễ tuột, rơi. Hơ nóng đều giúp nhiệt toả đều, tránh làm nứt vỡ ống khi lửa dồn nhiệt vào một điểm.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Ống hút nhỏ giọt',
          text: 'Bóp chặt và giữ quả bóp cao su, đưa đầu ống vào lọ hoá chất, thả chậm quả bóp để hút chất lỏng lên. Chuyển ống đến miệng ống nghiệm, bóp nhẹ để nhỏ từng giọt. Không chạm đầu ống hút vào thành ống nghiệm.',
        },
      ],
    },
    {
      heading: 'Thiết bị đo pH và huyết áp kế',
      blocks: [
        {
          type: 'p',
          text: 'Thiết bị đo pH (bút đo pH): cho điện cực của thiết bị vào dung dịch cần đo, giá trị pH của dung dịch hiện trên màn hình. Ví dụ đo được: nước chanh khoảng 2,4; nước cam khoảng 3,5; nước máy khoảng 7,5; nước vôi trong khoảng 12.',
        },
        {
          type: 'p',
          text: 'Huyết áp kế dùng để đo huyết áp, gồm huyết áp kế đồng hồ, huyết áp kế thuỷ ngân,… Huyết áp kế đồng hồ gồm một bao cao su bọc trong băng vải dài để quấn quanh cánh tay, nối với áp kế đồng hồ bằng ống cao su; áp kế lại nối với quả bóp cao su có van và một ốc vặn chặt hoặc nới lỏng được.',
        },
      ],
    },
    {
      heading: 'Thiết bị điện và cách sử dụng',
      blocks: [
        {
          type: 'list',
          items: [
            'Nguồn điện: các thí nghiệm thường dùng pin 1,5 V. Ghép nối tiếp hai pin được bộ nguồn 3 V, bốn pin được bộ nguồn 6 V.',
            'Biến áp nguồn: chuyển đổi điện áp xoay chiều 220 V thành điện áp xoay chiều hoặc điện áp một chiều có giá trị nhỏ, đảm bảo an toàn khi làm thí nghiệm.',
            'Thiết bị đo điện: ampe kế đo cường độ dòng điện, vôn kế đo hiệu điện thế.',
            'Joulemeter: đo dòng điện, điện áp, công suất và năng lượng điện cung cấp cho mạch điện; các giá trị hiện trên màn hình LED.',
            'Thiết bị sử dụng điện: biến trở, điôt phát quang (kèm điện trở bảo vệ), bóng đèn kèm đui 3 V,…',
            'Thiết bị điện hỗ trợ: công tắc, cầu chì ống, dây nối,…',
          ],
        },
        {
          type: 'table',
          caption: 'So sánh ampe kế và vôn kế',
          head: ['Đặc điểm', 'Ampe kế', 'Vôn kế'],
          rows: [
            ['Kí hiệu trên mặt', 'A hoặc mA', 'V hoặc mV'],
            ['Đo', 'Cường độ dòng điện', 'Hiệu điện thế'],
            [
              'Cách mắc',
              'Nối tiếp với thiết bị cần đo',
              'Song song với thiết bị (hoặc nguồn) cần đo',
            ],
            [
              'Chốt nối',
              'Chốt (+) nối về phía cực (+) của nguồn, chốt (−) về phía cực (−)',
              'Chốt (+) nối về phía cực (+) của nguồn, chốt (−) về phía cực (−)',
            ],
            ['Điện trở', 'Không đáng kể', 'Rất lớn'],
          ],
        },
        {
          type: 'p',
          text: 'Joulemeter có hai cặp chốt: chốt vào nối với nguồn điện, chốt ra nối với mạch điện, nên toàn bộ dòng điện cung cấp cho mạch đều đi qua nó.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Sử dụng điện an toàn',
          text: 'Với thiết bị đo điện: dùng đúng chức năng, đúng thang đo (giới hạn đo lớn hơn giá trị cần đo), mắc vào mạch đúng cách và dùng nguồn phù hợp. Với nguồn điện và biến áp nguồn: chọn đúng điện áp, đúng chức năng (một chiều hay xoay chiều), cắm đúng chốt. Lắp và sửa mạch khi công tắc đang mở; kiểm tra lại rồi mới đóng mạch. Tay khô khi dùng thiết bị điện, tránh xa nơi có điện thế nguy hiểm.',
        },
        {
          type: 'p',
          text: 'Trong bàn thí nghiệm ảo ở phần Khám phá, em chọn biến áp nguồn, dụng cụ đo, cách mắc, chốt nối và thang đo cho từng nhiệm vụ rồi đóng khoá K để xem điều gì xảy ra.',
        },
      ],
    },
  ],
  explore: {
    title: 'Bàn thí nghiệm ảo',
    instruction:
      'Chọn một nhiệm vụ. Khi khoá K mở, đặt biến áp nguồn đúng chức năng và điện áp cho bóng đèn 3 V, chọn dụng cụ đo, cách mắc, chốt nối và thang đo. Nhấn "Đóng khoá K" để xem đèn, kim đồng hồ hay màn hình joulemeter và lời giải thích. Hoàn thành cả ba nhiệm vụ.',
  },
  examples: [
    {
      problem:
        'Trên nhãn một chai có ghi: "Hydrochloric acid 37%, HCl, M = 36,46 g/mol", kèm kí hiệu cảnh báo chất ăn mòn. Nhãn cho biết những gì và khi rót hoá chất này cần chú ý gì?',
      steps: [
        'Tên hoá chất: hydrochloric acid; công thức hoá học: HCl.',
        'Nồng độ chất tan: 37%; khối lượng mol: 36,46 g/mol.',
        'Kí hiệu cảnh báo chất ăn mòn: hoá chất có thể gây bỏng da, hỏng mắt, nên phải đeo kính, găng tay và không để dính vào người.',
        'Đây là chất lỏng: rót qua phễu hoặc vào ống đong có mỏ, hướng nhãn lên trên; lấy lượng nhỏ thì dùng ống hút nhỏ giọt; không dùng tay trực tiếp.',
      ],
      answer:
        'Nhãn cho biết tên, công thức, nồng độ, khối lượng mol và mức nguy hiểm (ăn mòn). Khi rót cần đồ bảo hộ, rót đúng cách với nhãn hướng lên trên, phần thừa không đổ lại chai.',
    },
    {
      problem:
        'Cần đo cường độ dòng điện qua một bóng đèn 3 V và hiệu điện thế giữa hai đầu bóng đèn đó, dùng biến áp nguồn. Hãy nêu cách chọn và mắc thiết bị.',
      steps: [
        'Biến áp nguồn: chọn chức năng một chiều (DC), điện áp ra 3 V, đúng với hiệu điện thế ghi trên đèn.',
        'Lắp mạch khi công tắc (khoá K) đang mở: nguồn, khoá K, bóng đèn nối tiếp thành một mạch kín.',
        'Đo cường độ dòng điện: dùng ampe kế, mắc nối tiếp với đèn, chốt (+) về phía cực (+) của nguồn.',
        'Đo hiệu điện thế: dùng vôn kế, mắc song song với hai đầu đèn, chốt (+) về phía cực (+) của nguồn.',
        'Chọn thang đo có giới hạn đo lớn hơn giá trị cần đo, kiểm tra lại mạch rồi mới đóng khoá K và đọc số chỉ.',
      ],
      answer:
        'Nguồn một chiều 3 V; ampe kế nối tiếp, vôn kế song song với đèn, chốt (+) đều về phía cực (+) của nguồn; đóng mạch sau khi kiểm tra.',
    },
    {
      problem:
        'Dòng điện qua bóng đèn khoảng 0,5 A. Ampe kế có ba thang đo: 0,3 A; 0,6 A; 3 A. Nên chọn thang nào?',
      steps: [
        'Thang 0,3 A có giới hạn đo nhỏ hơn 0,5 A: kim vượt quá thang, có thể hỏng ampe kế. Loại.',
        'Thang 0,6 A và 3 A đều lớn hơn 0,5 A nên đo được.',
        'Trên thang 3 A, kim chỉ lệch khoảng $\\dfrac{0{,}5}{3} = \\dfrac{1}{6}$ thang nên khó đọc chính xác; trên thang 0,6 A kim lệch gần hết thang, đọc chính xác hơn.',
      ],
      answer: 'Chọn thang 0,6 A: giới hạn đo nhỏ nhất mà vẫn lớn hơn giá trị cần đo.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Biến áp nguồn là thiết bị có chức năng',
      options: [
        'đo cường độ dòng điện.',
        'đo hiệu điện thế.',
        'chuyển đổi điện áp xoay chiều 220 V thành điện áp xoay chiều hoặc một chiều có giá trị nhỏ.',
        'đo dòng điện, điện áp, công suất và năng lượng điện cung cấp cho mạch điện.',
      ],
      answer: 2,
      hints: ['Biến áp nguồn được cắm vào ổ điện trong phòng thí nghiệm.'],
      solution:
        'Biến áp nguồn chuyển điện áp xoay chiều 220 V của lưới điện thành điện áp xoay chiều hoặc một chiều nhỏ, an toàn cho thí nghiệm. Hai phương án đầu là ampe kế và vôn kế, phương án cuối là joulemeter.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi thiết bị với chức năng của nó.',
      left: ['Ampe kế', 'Vôn kế', 'Joulemeter', 'Biến áp nguồn'],
      right: [
        'Đo hiệu điện thế',
        'Đo dòng điện, điện áp, công suất và năng lượng điện cung cấp cho mạch',
        'Đo cường độ dòng điện',
        'Chuyển điện áp 220 V thành điện áp nhỏ, an toàn',
      ],
      pairs: [
        [0, 2],
        [1, 0],
        [2, 1],
        [3, 3],
      ],
      hints: ['Tên ampe kế gắn với đơn vị ampe (A) của cường độ dòng điện, vôn kế với vôn (V).'],
      solution:
        'Ampe kế đo cường độ dòng điện; vôn kế đo hiệu điện thế; joulemeter đo dòng điện, điện áp, công suất và năng lượng điện cung cấp cho mạch; biến áp nguồn chuyển 220 V thành điện áp nhỏ.',
    },
    {
      type: 'multi',
      prompt: 'Những việc làm nào đúng quy tắc sử dụng hoá chất an toàn?',
      options: [
        'Đọc kĩ nhãn hoá chất trước khi dùng',
        'Dùng tay bốc một ít hoá chất rắn cho nhanh',
        'Không dùng hoá chất trong lọ mất nhãn',
        'Đổ hoá chất dùng thừa trở lại lọ để tiết kiệm',
        'Báo giáo viên khi hoá chất bị đổ, tràn',
      ],
      answers: [0, 2, 4],
      hints: ['Hai việc trong danh sách có thể làm em bị bỏng hoặc làm bẩn cả lọ hoá chất.'],
      solution:
        'Đúng: đọc kĩ nhãn, không dùng lọ mất nhãn, báo giáo viên khi có sự cố. Sai: không dùng tay trực tiếp lấy hoá chất; hoá chất thừa không đổ lại bình chứa mà xử lí theo hướng dẫn của giáo viên.',
    },
    {
      type: 'choice',
      prompt: 'Để lấy một lượng nhỏ dung dịch (khoảng 1 mL), thường dùng dụng cụ nào?',
      options: ['Phễu lọc', 'Ống đong có mỏ', 'Ống nghiệm', 'Ống hút nhỏ giọt'],
      answer: 3,
      hints: ['Dụng cụ có quả bóp cao su.'],
      solution:
        'Ống hút nhỏ giọt lấy được lượng nhỏ chất lỏng và nhỏ từng giọt. Ống đong dùng để đong lượng lớn hơn, phễu dùng để lọc hoặc rót.',
    },
    {
      type: 'choice',
      prompt: 'Khi đun nóng hoá chất trong ống nghiệm, cách làm nào sau đây là SAI?',
      options: [
        'Kẹp ống nghiệm ở khoảng 1/3 ống tính từ miệng ống',
        'Nghiêng miệng ống nghiệm về phía không có người',
        'Làm nóng đều đáy ống rồi mới đun ở chỗ có hoá chất',
        'Để đáy ống nghiệm chạm sát bấc đèn cồn',
      ],
      answer: 3,
      hints: ['Chỗ nóng nhất của ngọn lửa ở khoảng 2/3 chiều cao ngọn lửa tính từ dưới lên.'],
      solution:
        'Không để đáy ống nghiệm chạm vào bấc đèn cồn: ở đó lửa không nóng nhất và ống dễ nứt vỡ. Đặt đáy ống ở khoảng 2/3 ngọn lửa tính từ dưới lên.',
    },
    {
      type: 'order',
      prompt: 'Sắp xếp các bước dùng ống hút nhỏ giọt cho đúng thứ tự.',
      items: [
        'Thả chậm quả bóp để hút chất lỏng lên',
        'Bóp chặt và giữ quả bóp cao su',
        'Bóp nhẹ để nhỏ từng giọt vào ống nghiệm, không chạm thành ống',
        'Đưa đầu ống hút vào lọ hoá chất',
        'Chuyển ống hút đến miệng ống nghiệm',
      ],
      answer: [1, 3, 0, 4, 2],
      hints: ['Phải đẩy không khí ra khỏi ống trước khi nhúng vào chất lỏng.'],
      solution:
        'Bóp chặt quả bóp → đưa đầu ống vào lọ → thả chậm để hút → chuyển đến ống nghiệm → bóp nhẹ nhỏ từng giọt.',
    },
    {
      type: 'number',
      prompt:
        'Một ống nghiệm dài 15 cm. Khi đun nóng, nên kẹp ống nghiệm ở chỗ cách miệng ống bao nhiêu xentimét?',
      answer: 5,
      unit: 'cm',
      hints: ['Kẹp ở khoảng 1/3 ống nghiệm tính từ miệng ống.'],
      solution: 'Kẹp cách miệng ống khoảng $\\dfrac{1}{3} \\cdot 15 = 5$ (cm).',
    },
    {
      type: 'number',
      prompt: 'Cần ghép nối tiếp bao nhiêu pin 1,5 V để được bộ nguồn 4,5 V?',
      answer: 3,
      hints: ['Hai pin 1,5 V ghép nối tiếp cho 3 V, bốn pin cho 6 V.'],
      solution: 'Số pin cần dùng: $4{,}5 : 1{,}5 = 3$ (pin).',
    },
    {
      type: 'multi',
      prompt: 'Những điều nào đúng khi dùng ampe kế?',
      options: [
        'Mắc nối tiếp với thiết bị cần đo',
        'Mắc song song với bóng đèn cần đo',
        'Chốt (+) nối về phía cực (+) của nguồn',
        'Chọn thang đo có giới hạn đo lớn hơn cường độ dòng điện cần đo',
      ],
      answers: [0, 2, 3],
      hints: [
        'Ampe kế có điện trở không đáng kể. Nếu mắc song song với đèn thì dòng điện sẽ đi đường nào?',
      ],
      solution:
        'Ampe kế mắc nối tiếp, chốt (+) về phía cực (+) của nguồn, giới hạn đo lớn hơn giá trị cần đo. Mắc song song với đèn là nối tắt đèn, dòng điện rất lớn qua ampe kế có thể làm hỏng ampe kế và nguồn.',
    },
    {
      type: 'choice',
      prompt: 'Một bạn mắc nhầm vôn kế nối tiếp với bóng đèn rồi đóng mạch. Điều gì xảy ra?',
      options: [
        'Đèn sáng bình thường, vôn kế chỉ hiệu điện thế của đèn',
        'Đèn gần như không sáng vì vôn kế có điện trở rất lớn',
        'Vôn kế bị cháy ngay vì dòng điện quá lớn',
        'Đèn sáng mạnh hơn bình thường',
      ],
      answer: 1,
      hints: ['Vôn kế có điện trở rất lớn, còn ampe kế có điện trở không đáng kể.'],
      solution:
        'Điện trở rất lớn của vôn kế làm dòng điện trong mạch gần như bằng 0: đèn không sáng và vôn kế chỉ khoảng hiệu điện thế của nguồn, không phải của đèn. Vôn kế phải mắc song song với đèn.',
    },
    {
      type: 'number',
      prompt:
        'Một ampe kế có giới hạn đo 0,6 A, mỗi vạch chia ứng với 0,02 A. Kim chỉ ở vạch thứ 15 tính từ vạch 0. Ampe kế chỉ bao nhiêu ampe?',
      answer: 0.3,
      tolerance: 0.001,
      unit: 'A',
      hints: ['Số chỉ bằng số vạch nhân với giá trị mỗi vạch chia.'],
      solution: 'Ampe kế chỉ $15 \\cdot 0{,}02 = 0{,}3$ (A).',
    },
    {
      type: 'multi',
      prompt: 'Những thiết bị nào là thiết bị điện hỗ trợ trong phòng thí nghiệm?',
      options: [
        'Công tắc',
        'Biến trở',
        'Cầu chì ống',
        'Bóng đèn kèm đui 3 V',
        'Dây nối',
        'Điôt phát quang',
      ],
      answers: [0, 2, 4],
      hints: [
        'Thiết bị sử dụng điện biến năng lượng điện thành năng lượng khác hoặc điều chỉnh dòng điện trong mạch; thiết bị hỗ trợ dùng để nối, đóng ngắt, bảo vệ mạch.',
      ],
      solution:
        'Thiết bị điện hỗ trợ: công tắc, cầu chì ống, dây nối. Biến trở, bóng đèn, điôt phát quang là thiết bị sử dụng điện.',
    },
  ],
  takeaways: [
    'Chỉ dùng hoá chất có nhãn rõ ràng, đọc kĩ nhãn trước khi dùng; không lấy hoá chất bằng tay; hoá chất thừa không đổ lại bình chứa.',
    'Hoá chất rắn lấy bằng thìa hoặc panh; hoá chất lỏng rót qua phễu, ống đong có mỏ hoặc lấy bằng ống hút nhỏ giọt, nhãn hướng lên trên.',
    'Đun ống nghiệm: kẹp ở khoảng 1/3 ống từ miệng, hơ nóng đều, miệng ống hướng về phía không có người, không chạm bấc đèn.',
    'Biến áp nguồn chuyển 220 V xoay chiều thành điện áp nhỏ an toàn; chọn đúng chức năng và điện áp.',
    'Ampe kế mắc nối tiếp, vôn kế mắc song song, chốt (+) về phía cực (+) của nguồn, thang đo lớn hơn giá trị cần đo; joulemeter nối nguồn vào chốt vào, mạch vào chốt ra.',
  ],
};
