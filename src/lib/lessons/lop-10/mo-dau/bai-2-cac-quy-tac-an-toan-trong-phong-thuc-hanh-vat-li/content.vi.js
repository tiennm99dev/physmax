/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Các kí hiệu trên thiết bị và biển báo trong phòng thực hành vật lí, những nguy cơ mất an toàn về điện, nhiệt, quang, các quy tắc an toàn cần tuân thủ và cách xử lí khi xảy ra sự cố.',
  intro:
    'Một chiếc phích cắm rút sai cách, một ngọn đèn cồn bị thổi tắt, một tia laser chiếu nhầm vào mắt: rất nhiều tai nạn trong phòng thực hành bắt đầu từ những thao tác tưởng như vô hại. Trước khi làm thí nghiệm, em cần đọc được các kí hiệu trên thiết bị, nhận ra nguy cơ và biết cách xử lí khi có sự cố.',
  objectives: [
    'Đọc được các kí hiệu và nhãn thông số thường gặp trên thiết bị thí nghiệm.',
    'Phân biệt được biển cấm, biển cảnh báo và biển thông báo trong phòng thực hành.',
    'Nêu được các nguy cơ mất an toàn khi sử dụng thiết bị điện, nhiệt và quang.',
    'Nêu và tuân thủ được các quy tắc an toàn trong phòng thực hành.',
    'Chọn được cách xử lí phù hợp khi xảy ra sự cố về điện, cháy, bỏng hoặc vỡ dụng cụ.',
  ],
  sections: [
    {
      heading: 'Kí hiệu và biển báo trong phòng thực hành',
      blocks: [
        {
          type: 'p',
          text: 'Mỗi thiết bị đều có nhãn thông số và các kí hiệu cho biết chức năng, yêu cầu kĩ thuật và lưu ý khi sử dụng. Phải đọc kĩ chúng trước khi dùng.',
        },
        {
          type: 'table',
          caption: 'Một số kí hiệu thường gặp trên thiết bị và dụng cụ',
          head: ['Kí hiệu', 'Ý nghĩa'],
          rows: [
            ['DC hoặc dấu $-$', 'Dòng điện một chiều'],
            ['AC hoặc dấu $\\sim$', 'Dòng điện xoay chiều'],
            ['Input (I)', 'Đầu vào'],
            ['Output (O)', 'Đầu ra'],
            ['Dấu $+$ và dấu $-$', 'Cực dương và cực âm'],
            ['Ba vạch ngang ngắn dần', 'Cần nối đất'],
            ['Hình chiếc li', 'Dụng cụ dễ vỡ'],
            ['Hai mũi tên chỉ lên', 'Dụng cụ đặt đứng'],
            ['Mặt trời bị gạch chéo', 'Tránh ánh nắng chiếu trực tiếp'],
            ['Thùng rác bị gạch chéo', 'Không được bỏ vào thùng rác'],
          ],
        },
        {
          type: 'table',
          caption: 'Ba nhóm biển báo',
          head: ['Nhóm', 'Hình dạng', 'Ví dụ'],
          rows: [
            ['Biển cấm', 'Hình tròn, viền đỏ', 'Cấm lửa, cấm ăn uống'],
            [
              'Biển cảnh báo',
              'Hình tam giác đều, viền đen hoặc đỏ, nền vàng',
              'Nguy hiểm về điện, chất dễ cháy, chất độc, tia laser, nhiệt độ cao, từ trường',
            ],
            ['Biển thông báo', 'Hình chữ nhật', 'Lối thoát hiểm, vị trí đặt bình chữa cháy'],
          ],
        },
        {
          type: 'p',
          text: 'Chọn một bộ kí hiệu, rồi đặt từng thẻ vào đúng ý nghĩa của nó.',
        },
        { type: 'widget', name: 'ki-hieu' },
        {
          type: 'callout',
          tone: 'note',
          title: 'Đọc nhãn thông số',
          text: 'Trên một bộ đổi nguồn có nhãn "Input: $220$ V AC; Output: $12$ V DC, $2$ A", đầu vào phải nối với nguồn xoay chiều $220$ V, đầu ra cấp điện một chiều $12$ V và dòng điện lấy ra không nên vượt quá $2$ A.',
        },
      ],
    },
    {
      heading: 'An toàn khi sử dụng thiết bị thí nghiệm',
      blocks: [
        {
          type: 'table',
          caption: 'Đặc điểm và lưu ý khi dùng từng loại thiết bị',
          head: ['Loại thiết bị', 'Đặc điểm', 'Lưu ý'],
          rows: [
            [
              'Thiết bị điện (biến áp nguồn, đồng hồ đa năng, ampe kế, vôn kế)',
              'Có hiệu điện thế định mức, giới hạn đo và thang đo',
              'Dùng đúng chức năng, đúng thang đo; điện áp nguồn phải khớp với điện áp định mức; tăng điện áp từ thấp lên',
            ],
            [
              'Thiết bị nhiệt và dụng cụ thuỷ tinh (đèn cồn, bình chịu nhiệt, nhiệt kế)',
              'Dễ gây bỏng; thuỷ tinh dễ nứt, vỡ; thuỷ ngân trong nhiệt kế rất độc',
              'Không cầm trực tiếp vật nóng; tắt đèn cồn bằng cách đậy nắp, không thổi; không kéo bấc đèn quá dài',
            ],
            [
              'Thiết bị quang (đèn chiếu, thấu kính, gương, màn ảnh, đèn laser)',
              'Dễ mốc, xước, nứt, vỡ, bám bụi, làm sai lệch đường truyền của ánh sáng',
              'Để nơi khô thoáng; cầm nhẹ, tránh trầy xước; không chiếu tia laser vào mắt',
            ],
          ],
        },
      ],
    },
    {
      heading: 'Các nguy cơ mất an toàn',
      blocks: [
        {
          type: 'list',
          items: [
            'Nguy hiểm cho người: chạm tay vào phần kim loại của phích cắm, rút phích bằng cách kéo dây, chạm vào dây sờn có thể gây điện giật; chiếu tia laser vào mắt làm hại mắt; chạm tay vào vật đang nóng gây bỏng.',
            'Hỏng thiết bị đo: đo dòng điện vượt giới hạn đo của ampe kế có thể làm hỏng ampe kế, thậm chí gây chập cháy; chọn sai chức năng hoặc sai thang đo cũng làm hỏng đồng hồ.',
            'Cháy nổ: để nước, dung dịch dẫn điện hoặc chất dễ cháy gần thiết bị điện; đun bằng đèn cồn sai cách; cắm dây lỏng gây phóng tia lửa điện.',
          ],
        },
      ],
    },
    {
      heading: 'Các quy tắc an toàn trong phòng thực hành',
      blocks: [
        {
          type: 'list',
          ordered: true,
          items: [
            'Đọc kĩ hướng dẫn sử dụng và các kí hiệu trên thiết bị; kiểm tra thiết bị trước khi dùng.',
            'Chỉ tiến hành thí nghiệm khi được giáo viên hướng dẫn cho phép.',
            'Tắt công tắc nguồn trước khi cắm hoặc tháo thiết bị điện.',
            'Chỉ cắm phích khi hiệu điện thế của nguồn khớp với hiệu điện thế định mức của dụng cụ; bố trí dây điện gọn gàng, không gây vướng.',
            'Không chạm trực tiếp vào vật hoặc thiết bị đang nóng khi không có dụng cụ bảo hộ.',
            'Không để nước, dung dịch dẫn điện hoặc dễ cháy gần thiết bị điện.',
            'Giữ khoảng cách an toàn khi nung nóng vật, khi làm thí nghiệm có vật bắn ra hoặc có tia laser.',
            'Làm xong, tắt nguồn, sắp xếp dụng cụ gọn gàng, vệ sinh chỗ làm và bỏ chất thải đúng nơi quy định.',
          ],
        },
      ],
    },
    {
      heading: 'Xử lí khi có sự cố',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Nguyên tắc chung',
          text: 'Bình tĩnh, báo ngay cho giáo viên, ngắt nguồn điện nếu sự cố liên quan đến điện hoặc cháy, và làm theo hướng dẫn. An toàn của con người luôn được ưu tiên hơn thiết bị.',
        },
        {
          type: 'table',
          caption: 'Một số sự cố thường gặp',
          head: ['Sự cố', 'Cách xử lí', 'Không được'],
          rows: [
            [
              'Có người bị điện giật',
              'Ngắt nguồn điện ngay bằng công tắc hoặc cầu dao, gọi giáo viên',
              'Dùng tay trần kéo người bị giật khi chưa ngắt điện',
            ],
            [
              'Thiết bị điện bốc cháy',
              'Ngắt điện, báo giáo viên, dùng bình chữa cháy theo hướng dẫn; ra theo lối thoát hiểm nếu lửa lan',
              'Dùng nước dập lửa khi thiết bị còn điện',
            ],
            [
              'Cồn đổ và bắt lửa',
              'Trùm khăn ướt hoặc phủ cát lên đám lửa, dời chất dễ cháy ra xa',
              'Thổi, quạt hay dội nhiều nước',
            ],
            [
              'Bị bỏng nhẹ',
              'Xả chỗ bỏng dưới vòi nước mát sạch khoảng $15$ phút, báo giáo viên',
              'Bôi kem đánh răng, làm vỡ bóng nước',
            ],
            [
              'Vỡ nhiệt kế thuỷ ngân',
              'Tránh xa chỗ vỡ, mở cửa cho thoáng, báo giáo viên để thu gom',
              'Nhặt bằng tay, quét vào thùng rác',
            ],
          ],
        },
      ],
    },
  ],
  explore: {
    title: 'Em xử lí thế nào?',
    instruction:
      'Mỗi tình huống là một việc có thể xảy ra trong phòng thực hành. Chọn cách xử lí an toàn và đọc lời giải thích: chọn sai, em sẽ thấy hậu quả và được chọn lại. Cuối cùng, xem nhóm quy tắc nào em cần đọc lại.',
  },
  examples: [
    {
      problem:
        'Một bộ đổi nguồn có nhãn: "Input: $220$ V AC, $50$ Hz; Output: $12$ V DC, $2$ A". Hãy cho biết cách nối bộ đổi nguồn và công suất lớn nhất nó cấp được cho mạch.',
      steps: [
        'Input là đầu vào, AC là xoay chiều: đầu vào nối với ổ điện xoay chiều $220$ V.',
        'Output là đầu ra, DC là một chiều: đầu ra cấp điện một chiều $12$ V, nên phải nối đúng cực dương, cực âm.',
        'Dòng điện lớn nhất lấy ra được là $2$ A, nên công suất lớn nhất là $P = UI = 12 \\cdot 2 = 24$ W.',
      ],
      answer:
        'Đầu vào nối với điện xoay chiều $220$ V, đầu ra cấp điện một chiều $12$ V; công suất lớn nhất là $24$ W.',
    },
    {
      problem:
        'Đồng hồ đa năng có các thang đo cường độ dòng điện $200$ mA, $2$ A và $10$ A. Em cần đo dòng điện chưa biết, dự đoán khoảng trên dưới $1$ A. Em nên làm thế nào?',
      steps: [
        'Chưa biết chắc độ lớn của dòng điện, nên chọn thang lớn nhất $10$ A để không vượt giới hạn đo.',
        'Đóng mạch và đọc số đo. Giả sử đọc được khoảng $1{,}2$ A: giá trị này nhỏ hơn giới hạn $2$ A.',
        'Ngắt mạch, chuyển sang thang $2$ A để đọc chính xác hơn. Không dùng thang $200$ mA vì $1{,}2$ A $= 1\\,200$ mA vượt giới hạn đo.',
      ],
      answer: 'Bắt đầu từ thang $10$ A, sau đó giảm xuống thang $2$ A.',
    },
    {
      problem:
        'Khi đang đun nước, một bạn làm đổ đèn cồn, cồn tràn ra bàn và bắt lửa, gần đó có bộ nguồn đang cắm điện. Hãy nêu cách xử lí.',
      steps: [
        'Bình tĩnh, báo ngay cho giáo viên.',
        'Ngắt nguồn điện để lửa không gây thêm chập cháy.',
        'Trùm khăn ướt hoặc phủ cát lên đám lửa để ngăn không khí; không thổi, không dội nhiều nước.',
        'Dời các chất dễ cháy ra xa; nếu lửa lan rộng, dùng bình chữa cháy theo hướng dẫn hoặc ra theo lối thoát hiểm.',
      ],
      answer: 'Báo giáo viên, ngắt điện, trùm khăn ướt hoặc phủ cát để dập lửa, dời chất dễ cháy.',
    },
  ],
  practice: [
    {
      type: 'match',
      prompt: 'Nối mỗi kí hiệu trên thiết bị với ý nghĩa của nó.',
      left: ['DC', 'AC', 'Input', 'Output'],
      right: ['Đầu ra', 'Dòng điện xoay chiều', 'Đầu vào', 'Dòng điện một chiều'],
      pairs: [
        [0, 3],
        [1, 1],
        [2, 2],
        [3, 0],
      ],
      hints: ['AC đi kèm dấu $\\sim$ gợi dạng sóng đổi chiều; "in" nghĩa là đi vào.'],
      solution: 'DC: một chiều; AC: xoay chiều; Input: đầu vào; Output: đầu ra.',
    },
    {
      type: 'choice',
      prompt: 'Biển báo hình tam giác đều, viền đen hoặc đỏ, nền vàng thuộc nhóm nào?',
      options: ['Biển cấm', 'Biển cảnh báo', 'Biển thông báo', 'Biển chỉ dẫn lối đi'],
      answer: 1,
      hints: ['Biển cấm có dạng tròn, biển thông báo có dạng chữ nhật.'],
      solution: 'Tam giác đều, nền vàng là biển cảnh báo khu vực hoặc vật nguy hiểm.',
    },
    {
      type: 'multi',
      prompt: 'Những thao tác nào gây mất an toàn trong phòng thực hành?',
      options: [
        'Rút phích điện bằng cách kéo dây.',
        'Tắt công tắc nguồn trước khi tháo thiết bị.',
        'Dùng tay kiểm tra xem vật đang nung đã nóng chưa.',
        'Chiếu tia laser về phía các bạn.',
        'Xếp dây điện gọn gàng, không gây vướng.',
      ],
      answers: [0, 2, 3],
      hints: ['Hãy nghĩ tới nguy cơ điện giật, bỏng và hại mắt.'],
      solution:
        'Kéo dây dễ đứt dây và gây giật; tay chạm vật nóng gây bỏng; tia laser hại mắt. Hai thao tác còn lại là đúng quy tắc.',
    },
    {
      type: 'choice',
      prompt:
        'Ampe kế có giới hạn đo $3$ A được mắc vào mạch có dòng điện $5$ A. Điều gì có thể xảy ra?',
      options: [
        'Ampe kế chỉ đúng $5$ A.',
        'Ampe kế có thể hỏng, thậm chí gây chập cháy.',
        'Dòng điện tự giảm xuống $3$ A và ampe kế vẫn an toàn.',
        'Không có gì xảy ra vì ampe kế có điện trở rất nhỏ.',
      ],
      answer: 1,
      hints: ['Giới hạn đo là giá trị lớn nhất mà dụng cụ đo được.'],
      solution:
        'Vì $5$ A $> 3$ A nên dòng điện vượt giới hạn đo; ampe kế có thể hỏng, thậm chí gây chập cháy.',
    },
    {
      type: 'number',
      prompt:
        'Một bộ nguồn có nhãn "Output: $12$ V DC, $1{,}5$ A". Công suất lớn nhất mà bộ nguồn cấp được là bao nhiêu oát?',
      answer: 18,
      unit: 'W',
      hints: ['Dùng công thức công suất điện đã học ở lớp 9.', '$P = UI$.'],
      solution: '$P = UI = 12 \\cdot 1{,}5 = 18$ W.',
    },
    {
      type: 'choice',
      prompt: 'Vì sao trước khi bật máy biến áp, phải vặn nút chỉnh điện áp về mức thấp nhất?',
      options: [
        'Để tiết kiệm điện năng cho phòng thực hành.',
        'Để mạch không chịu quá áp đột ngột, rồi tăng dần đến mức cần dùng.',
        'Để máy biến áp đổi được dòng điện xoay chiều thành một chiều.',
        'Vì nút chỉ xoay được khi đang ở mức thấp nhất.',
      ],
      answer: 1,
      hints: ['Điều gì xảy ra với dụng cụ trong mạch nếu điện áp vượt mức định mức?'],
      solution:
        'Điện áp cao đột ngột có thể làm hỏng dụng cụ trong mạch, nên phải tăng dần từ mức thấp.',
    },
    {
      type: 'choice',
      prompt: 'Cách đúng để tắt đèn cồn là gì?',
      options: ['Thổi mạnh vào ngọn lửa', 'Đậy nắp đèn', 'Đổ nước vào bấc đèn', 'Rút bấc đèn ra'],
      answer: 1,
      hints: ['Muốn tắt lửa an toàn, hãy ngăn ngọn lửa tiếp xúc với không khí.'],
      solution: 'Đậy nắp đèn để ngăn không khí, lửa sẽ tắt. Không thổi, vì lửa có thể bùng lên.',
    },
    {
      type: 'order',
      prompt: 'Bộ nguồn đang cắm điện bốc cháy. Sắp xếp các việc cần làm theo đúng thứ tự.',
      items: [
        'Dập lửa bằng bình chữa cháy theo hướng dẫn',
        'Ngắt nguồn điện',
        'Ra ngoài theo lối thoát hiểm nếu lửa lan rộng',
        'Báo ngay cho giáo viên',
      ],
      answer: [1, 3, 0, 2],
      hints: [
        'Thiết bị còn điện thì việc dập lửa rất nguy hiểm, nên việc nào phải làm trước?',
        'Thoát hiểm là phương án khi không dập được lửa.',
      ],
      solution:
        'Ngắt nguồn điện → báo giáo viên → dập lửa bằng bình chữa cháy theo hướng dẫn → ra theo lối thoát hiểm nếu lửa lan rộng.',
    },
    {
      type: 'choice',
      prompt: 'Một bạn bị điện giật, tay còn dính vào dây điện hở. Em cần làm gì đầu tiên?',
      options: [
        'Dùng tay kéo bạn ra thật nhanh.',
        'Ngắt nguồn điện bằng công tắc hoặc cầu dao.',
        'Hắt nước vào chỗ dây điện.',
        'Chạy đi tìm thuốc sơ cứu.',
      ],
      answer: 1,
      hints: ['Chạm vào bạn lúc này, em cũng có thể bị dòng điện đi qua người.'],
      solution:
        'Ngắt nguồn điện trước, rồi gọi giáo viên. Không chạm tay trần vào bạn, không dùng nước vì nước dẫn điện.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi thao tác sai với nguy cơ chính mà nó gây ra.',
      left: [
        'Nhìn thẳng vào tia laser',
        'Chạm tay trần vào dây điện bị sờn',
        'Chạm tay vào giá đun vừa tắt lửa',
        'Làm rơi nhiệt kế thuỷ ngân',
      ],
      right: ['Bỏng', 'Hại mắt', 'Nhiễm độc thuỷ ngân', 'Điện giật'],
      pairs: [
        [0, 1],
        [1, 3],
        [2, 0],
        [3, 2],
      ],
      hints: ['Mỗi loại nguy cơ ứng với đúng một thao tác.'],
      solution:
        'Tia laser hại mắt; dây sờn gây điện giật; giá đun còn nóng gây bỏng; nhiệt kế vỡ làm thuỷ ngân độc thoát ra ngoài.',
    },
  ],
  takeaways: [
    'Đọc kĩ kí hiệu và nhãn thông số trước khi dùng: DC một chiều, AC xoay chiều, Input đầu vào, Output đầu ra.',
    'Biển cấm hình tròn viền đỏ, biển cảnh báo tam giác nền vàng, biển thông báo hình chữ nhật.',
    'Chỉ làm thí nghiệm khi giáo viên cho phép; tắt nguồn trước khi cắm, tháo thiết bị; chọn đúng thang đo, bắt đầu từ thang lớn nhất.',
    'Không chạm vật nóng bằng tay trần, không thổi tắt đèn cồn, không chiếu tia laser vào mắt.',
    'Khi có sự cố: bình tĩnh, ngắt điện nếu liên quan đến điện hoặc cháy, báo ngay cho giáo viên và làm theo hướng dẫn.',
  ],
};
