/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Phòng thực hành có hoá chất, điện và dụng cụ dễ vỡ; bài học nêu các quy định an toàn, ý nghĩa của các kí hiệu cảnh báo và một số dụng cụ, thiết bị thường dùng.',
  intro:
    'Phòng thực hành là nơi em làm thí nghiệm để tự mình kiểm chứng các hiện tượng tự nhiên. Ở đó có hoá chất, đèn cồn, dụng cụ thuỷ tinh và thiết bị dùng điện: nếu không cẩn thận, chúng có thể gây bỏng, đứt tay, ngộ độc hay điện giật. Vì vậy, trước khi bước vào phòng thực hành, em cần biết các quy định an toàn và hiểu các kí hiệu cảnh báo.',
  objectives: [
    'Nêu được các quy định an toàn khi học trong phòng thực hành.',
    'Phân biệt được các kí hiệu cảnh báo trong phòng thực hành theo hình dạng và màu sắc.',
    'Kể được một số dụng cụ, thiết bị thường dùng và cách sử dụng chúng an toàn.',
    'Biết cách xử lí ban đầu khi gặp sự cố trong phòng thực hành.',
  ],
  sections: [
    {
      heading: 'Quy định an toàn trong phòng thực hành',
      blocks: [
        {
          type: 'p',
          text: 'Những nguồn có thể gây mất an toàn trong phòng thực hành gồm: hoá chất (độc, dễ cháy, ăn mòn), nguồn điện, lửa của đèn cồn, dụng cụ thuỷ tinh dễ vỡ và vật sắc nhọn.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Những việc cần làm',
          text: 'Mặc trang phục gọn gàng, buộc gọn tóc, đeo đồ bảo hộ (kính bảo vệ mắt, găng tay, áo choàng) khi làm thí nghiệm. Chỉ làm thí nghiệm khi có sự hướng dẫn và giám sát của giáo viên. Thực hiện đúng nguyên tắc khi sử dụng hoá chất, dụng cụ, thiết bị. Thông báo ngay cho giáo viên khi xảy ra sự cố. Sau khi làm xong, thu gom hoá chất, rác thải đúng nơi quy định, lau dọn chỗ làm và rửa tay bằng xà phòng.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Những việc không được làm',
          text: 'Không ăn uống, đùa nghịch trong phòng thực hành. Không nếm hoặc ngửi trực tiếp hoá chất. Không tự ý làm thí nghiệm hay mang hoá chất, dụng cụ ra khỏi phòng. Không chạm tay ướt vào thiết bị điện. Không đổ hoá chất thừa vào bồn rửa hay thùng rác thông thường.',
        },
        {
          type: 'p',
          text: 'Trong phòng thí nghiệm ảo (phần Khám phá), hãy tìm các hành vi vi phạm những quy định này.',
        },
      ],
    },
    {
      heading: 'Kí hiệu cảnh báo trong phòng thực hành',
      blocks: [
        {
          type: 'p',
          text: 'Kí hiệu cảnh báo giúp em nhận ra mối nguy hiểm chỉ bằng một cái nhìn. Mỗi loại kí hiệu có hình dạng và màu sắc riêng để dễ nhận biết:',
        },
        {
          type: 'table',
          caption: 'Các loại kí hiệu cảnh báo thường gặp',
          head: ['Loại biển', 'Hình dạng và màu sắc', 'Ví dụ'],
          rows: [
            [
              'Kí hiệu cảnh báo cấm',
              'Hình tròn, viền đỏ, nền trắng, hình vẽ màu đen (thường có gạch chéo đỏ)',
              'Cấm lửa, cấm ăn uống, cấm dùng làm nước uống',
            ],
            [
              'Kí hiệu cảnh báo các khu vực nguy hiểm',
              'Hình tam giác đều, viền đen hoặc đỏ, nền vàng',
              'Điện cao thế, nhiệt độ cao',
            ],
            [
              'Kí hiệu cảnh báo nguy hiểm do hoá chất gây ra',
              'Hình vuông, viền đen, nền đỏ cam',
              'Chất dễ cháy, chất độc, chất ăn mòn',
            ],
            [
              'Kí hiệu chỉ dẫn thực hiện',
              'Hình chữ nhật, nền xanh hoặc đỏ',
              'Lối thoát hiểm, nơi để bình chữa cháy',
            ],
          ],
        },
        {
          type: 'p',
          text: 'Xếp các kí hiệu dưới đây vào đúng loại. Hãy nhìn hình dạng và màu sắc trước, rồi đọc ý nghĩa.',
        },
        { type: 'widget', name: 'ki-hieu' },
        {
          type: 'callout',
          tone: 'note',
          text: 'Trên lọ hoá chất cũng có nhãn ghi tên hoá chất và kí hiệu cảnh báo. Luôn đọc kĩ nhãn trước khi dùng.',
        },
      ],
    },
    {
      heading: 'Một số dụng cụ và thiết bị thường dùng',
      blocks: [
        {
          type: 'table',
          caption: 'Dụng cụ, thiết bị trong phòng thực hành',
          head: ['Nhóm', 'Ví dụ', 'Lưu ý an toàn'],
          rows: [
            [
              'Dụng cụ thuỷ tinh',
              'Ống nghiệm, cốc thuỷ tinh, ống đong, bình tam giác',
              'Dễ vỡ; cầm chắc, đặt ở giữa bàn; không nhặt mảnh vỡ bằng tay',
            ],
            [
              'Dụng cụ đun nóng',
              'Đèn cồn, giá đỡ, kẹp ống nghiệm',
              'Không thổi để tắt đèn cồn mà đậy nắp; hướng miệng ống nghiệm ra xa người',
            ],
            [
              'Dụng cụ đo',
              'Thước, cân, nhiệt kế, đồng hồ bấm giây, ống đong',
              'Chọn dụng cụ phù hợp, dùng đúng cách để có kết quả chính xác',
            ],
            [
              'Dụng cụ quan sát',
              'Kính lúp, kính hiển vi quang học',
              'Cầm bằng hai tay, không chạm tay vào mặt kính',
            ],
            [
              'Thiết bị điện',
              'Nguồn điện, công tắc, bóng đèn, dây nối',
              'Kiểm tra dây không hở; tay khô; ngắt nguồn trước khi lắp hoặc tháo mạch',
            ],
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Khi gặp sự cố',
          text: 'Báo ngay cho giáo viên. Nếu hoá chất dính vào da hoặc bắn vào mắt, rửa ngay dưới vòi nước sạch nhiều lần theo hướng dẫn của giáo viên. Nếu có cháy nhỏ hoặc thấy mùi khét từ thiết bị điện, ngắt nguồn điện và tránh xa, chờ giáo viên xử lí.',
        },
      ],
    },
  ],
  explore: {
    title: 'Phòng thí nghiệm ảo',
    instruction:
      'Đọc từng tình huống trong phòng thực hành. Bấm vào những tình huống có hành vi nguy hiểm hoặc vi phạm quy định để đánh dấu (bấm lần nữa để bỏ). Nhấn "Kiểm tra" để xem em tìm đủ chưa và vì sao mỗi hành vi đúng hay sai.',
  },
  examples: [
    {
      problem:
        'Trong giờ thực hành, Nam lỡ làm đổ một ít dung dịch lên tay. Nam định lau bằng áo rồi tiếp tục làm. Việc làm của Nam đúng hay sai? Nam nên làm gì?',
      steps: [
        'Dung dịch trong phòng thực hành có thể là hoá chất ăn mòn hoặc độc, lau bằng áo không làm sạch được và còn làm hoá chất dính sang quần áo.',
        'Quy định: khi có sự cố phải thông báo ngay cho giáo viên.',
        'Cách xử lí: báo giáo viên, rửa tay dưới vòi nước sạch theo hướng dẫn của giáo viên.',
      ],
      answer:
        'Nam làm sai. Nam cần báo ngay cho giáo viên và rửa tay dưới vòi nước sạch theo hướng dẫn.',
    },
    {
      problem:
        'Một biển báo hình tam giác đều, viền đen, nền vàng, ở giữa vẽ tia sét màu đen. Biển báo đó thuộc loại nào và có ý nghĩa gì?',
      steps: [
        'Hình tam giác đều, nền vàng, viền đen là đặc điểm của kí hiệu cảnh báo các khu vực nguy hiểm.',
        'Hình tia sét biểu thị nguy hiểm về điện.',
      ],
      answer: 'Đó là kí hiệu cảnh báo khu vực nguy hiểm: có điện cao thế, cẩn thận bị điện giật.',
    },
  ],
  practice: [
    {
      type: 'multi',
      prompt: 'Những việc nào em phải làm khi học trong phòng thực hành?',
      options: [
        'Đeo kính bảo vệ mắt và găng tay khi làm thí nghiệm',
        'Chỉ làm thí nghiệm khi có hướng dẫn của giáo viên',
        'Nếm thử hoá chất để biết đó là chất gì',
        'Rửa tay bằng xà phòng sau buổi thực hành',
        'Mang hoá chất về nhà để làm thêm',
      ],
      answers: [0, 1, 3],
      hints: ['Hai việc trong danh sách có thể gây ngộ độc hoặc tai nạn ngoài phòng thực hành.'],
      solution:
        'Phải đeo đồ bảo hộ, làm thí nghiệm dưới sự hướng dẫn của giáo viên và rửa tay sau buổi thực hành. Tuyệt đối không nếm hoá chất và không mang hoá chất ra khỏi phòng thực hành.',
    },
    {
      type: 'choice',
      prompt: 'Kí hiệu hình tròn, viền đỏ, nền trắng, hình vẽ màu đen có ý nghĩa gì?',
      options: [
        'Chỉ dẫn thực hiện',
        'Cảnh báo khu vực nguy hiểm',
        'Cấm thực hiện',
        'Nguy hiểm do hoá chất',
      ],
      answer: 2,
      hints: ['Viền đỏ, hình tròn thường đi kèm gạch chéo.'],
      solution:
        'Hình tròn, viền đỏ, nền trắng là kí hiệu cảnh báo cấm: cho biết điều không được làm.',
    },
    {
      type: 'choice',
      prompt:
        'Trên lọ hoá chất có kí hiệu hình vuông, viền đen, nền đỏ cam. Kí hiệu đó thuộc loại nào?',
      options: [
        'Kí hiệu cảnh báo cấm',
        'Kí hiệu cảnh báo các khu vực nguy hiểm',
        'Kí hiệu cảnh báo nguy hiểm do hoá chất gây ra',
        'Kí hiệu chỉ dẫn thực hiện',
      ],
      answer: 2,
      hints: ['Kí hiệu này thường thấy trên nhãn lọ hoá chất như chất độc, chất ăn mòn.'],
      solution:
        'Hình vuông, viền đen, nền đỏ cam là kí hiệu cảnh báo nguy hiểm do hoá chất gây ra, chẳng hạn chất độc, chất ăn mòn, chất dễ cháy.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi kí hiệu (mô tả bằng lời) với ý nghĩa của nó.',
      left: [
        'Hình vuông nền đỏ cam, hình ngọn lửa',
        'Hình vuông nền đỏ cam, hình đầu lâu',
        'Hình tròn viền đỏ, ngọn lửa bị gạch chéo',
        'Tam giác vàng viền đen, hình tia sét',
      ],
      right: ['Chất độc', 'Điện cao thế', 'Chất dễ cháy', 'Cấm lửa'],
      pairs: [
        [0, 2],
        [1, 0],
        [2, 3],
        [3, 1],
      ],
      hints: [
        'Phân loại theo hình dạng và màu trước: vuông đỏ cam là hoá chất, tròn viền đỏ là cấm, tam giác vàng là khu vực nguy hiểm.',
      ],
      solution:
        'Vuông đỏ cam có ngọn lửa: chất dễ cháy. Vuông đỏ cam có đầu lâu: chất độc. Tròn viền đỏ có ngọn lửa gạch chéo: cấm lửa. Tam giác vàng có tia sét: điện cao thế.',
    },
    {
      type: 'choice',
      prompt: 'Khi làm vỡ ống nghiệm thuỷ tinh, em nên làm gì đầu tiên?',
      options: [
        'Dùng tay nhặt ngay các mảnh vỡ',
        'Báo ngay cho giáo viên',
        'Lấy chân gạt mảnh vỡ vào gầm bàn',
        'Im lặng và tiếp tục làm thí nghiệm',
      ],
      answer: 1,
      hints: ['Quy định nói gì về việc xử lí khi có sự cố?'],
      solution:
        'Báo ngay cho giáo viên để được hướng dẫn thu dọn an toàn. Nhặt mảnh vỡ bằng tay dễ bị đứt tay; giấu hoặc bỏ mặc mảnh vỡ có thể gây tai nạn cho người khác.',
    },
    {
      type: 'choice',
      prompt: 'Vì sao không được cắm, rút phích điện khi tay còn ướt?',
      options: [
        'Vì nước làm hỏng phích điện',
        'Vì nước dẫn điện, có thể gây điện giật',
        'Vì tay ướt làm bẩn ổ điện',
        'Vì quy định không cho phép, không có lí do',
      ],
      answer: 1,
      hints: ['Nước thông thường có dẫn điện không?'],
      solution:
        'Nước thông thường dẫn điện, nên tay ướt chạm vào thiết bị điện dễ bị điện giật. Tay phải khô khi dùng thiết bị điện.',
    },
    {
      type: 'multi',
      prompt: 'Những nguồn nào có thể gây mất an toàn trong phòng thực hành?',
      options: [
        'Hoá chất độc, chất dễ cháy',
        'Nguồn điện',
        'Dụng cụ thuỷ tinh dễ vỡ, vật sắc nhọn',
        'Lửa của đèn cồn',
      ],
      answers: [0, 1, 2, 3],
      hints: ['Mỗi nguồn ở đây có thể gây ngộ độc, điện giật, đứt tay hoặc bỏng.'],
      solution:
        'Cả bốn đều là nguồn gây mất an toàn: hoá chất (ngộ độc, cháy, bỏng), điện (điện giật), thuỷ tinh và vật sắc nhọn (đứt tay), lửa đèn cồn (bỏng, cháy).',
    },
    {
      type: 'choice',
      prompt: 'Cách tắt đèn cồn đúng là gì?',
      options: [
        'Thổi mạnh vào ngọn lửa',
        'Đậy nắp đèn cồn lại',
        'Đổ nước vào đèn cồn',
        'Để đèn tự tắt khi hết cồn',
      ],
      answer: 1,
      hints: ['Lửa cần không khí để cháy.'],
      solution:
        'Đậy nắp đèn cồn để ngăn không khí, ngọn lửa sẽ tắt. Thổi có thể làm lửa bùng ra gây cháy; đổ nước hay bỏ mặc đèn đều không an toàn.',
    },
  ],
  takeaways: [
    'Luôn tuân thủ quy định: đồ bảo hộ, có giáo viên hướng dẫn, không ăn uống, không đùa nghịch, không nếm ngửi hoá chất.',
    'Kí hiệu cấm: tròn, viền đỏ, nền trắng. Khu vực nguy hiểm: tam giác đều, viền đen hoặc đỏ, nền vàng. Nguy hiểm do hoá chất: vuông, viền đen, nền đỏ cam. Chỉ dẫn thực hiện: chữ nhật, nền xanh hoặc đỏ.',
    'Dùng dụng cụ thuỷ tinh, đèn cồn và thiết bị điện đúng cách; tay khô khi dùng điện.',
    'Có sự cố thì báo ngay cho giáo viên.',
  ],
};
