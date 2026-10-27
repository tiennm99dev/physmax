/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Dòng điện là dòng chuyển dời có hướng của các hạt mang điện. Nguồn điện cung cấp năng lượng điện cho các thiết bị hoạt động và có hai cực: cực dương và cực âm. Vật dẫn điện cho dòng điện chạy qua, vật không dẫn điện (vật cách điện) thì không.',
  intro:
    'Bấm công tắc, bóng đèn sáng ngay; tháo pin ra, chiếc đồng hồ treo tường đứng im. Dây điện trong nhà luôn có lõi bằng đồng bọc trong lớp vỏ nhựa. Điều gì chạy trong dây dẫn khi đèn sáng, cái gì giữ cho nó chạy, và vì sao lõi dây phải bằng kim loại còn vỏ dây lại bằng nhựa?',
  objectives: [
    'Nêu được định nghĩa dòng điện là dòng chuyển dời có hướng của các hạt mang điện.',
    'Nêu được nguồn điện có khả năng cung cấp năng lượng điện; kể được một số nguồn điện thông dụng và chỉ ra hai cực của chúng.',
    'Phân biệt được vật dẫn điện và vật không dẫn điện (vật cách điện); kể được ví dụ.',
    'Biết dòng điện trong kim loại là dòng các electron tự do dịch chuyển có hướng.',
  ],
  sections: [
    {
      heading: 'Dòng điện',
      blocks: [
        {
          type: 'p',
          text: 'Ở bài trước, ta đã biết vật nhiễm điện mang điện tích. Nếu cho một vật nhiễm điện chạm vào một đầu bút thử điện mà đầu kia nối với vật khác, bóng đèn nhỏ trong bút lóe sáng trong khoảnh khắc: các điện tích đã dịch chuyển qua bóng đèn. Khi điện tích dịch chuyển hết, đèn tắt.',
        },
        {
          type: 'p',
          text: 'Có thể so sánh dòng điện với dòng nước: nước chảy trong ống khi có chênh lệch mực nước; các điện tích dịch chuyển trong dây dẫn khi có nguồn điện "đẩy" chúng đi.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Dòng điện',
          text: 'Dòng điện là dòng chuyển dời có hướng của các hạt mang điện.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Dòng điện trong kim loại',
          text: 'Trong kim loại có rất nhiều electron có thể dịch chuyển tự do giữa các nguyên tử, gọi là electron tự do. Bình thường chúng chuyển động hỗn loạn, không theo hướng nào. Khi kim loại được nối với hai cực của nguồn điện, các electron tự do dịch chuyển có hướng (từ phía cực âm về phía cực dương): đó là dòng điện trong kim loại.',
        },
      ],
    },
    {
      heading: 'Nguồn điện',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Nguồn điện',
          text: 'Nguồn điện có khả năng cung cấp năng lượng điện cho các thiết bị điện hoạt động, duy trì dòng điện chạy trong mạch. Mỗi nguồn điện có hai cực: cực dương (kí hiệu $+$) và cực âm (kí hiệu $-$).',
        },
        {
          type: 'table',
          head: ['Nguồn điện', 'Hai cực'],
          rows: [
            ['Pin tròn (pin AA, AAA)', 'Đầu có núm nhô lên là cực dương, đầu bằng là cực âm'],
            ['Pin vuông 9 V, pin cúc áo', 'Có ghi dấu $+$ và $-$ trên vỏ pin'],
            ['Acquy (ô tô, xe máy)', 'Hai cọc: cực dương (thường đánh dấu đỏ, $+$), cực âm ($-$)'],
            ['Pin mặt trời', 'Hai dây ra nối với cực dương và cực âm'],
            [
              'Ổ cắm điện trong nhà',
              'Lấy điện từ lưới điện (do các máy phát điện ở nhà máy điện cung cấp)',
            ],
          ],
          caption: 'Một số nguồn điện thông dụng',
        },
        {
          type: 'p',
          text: 'Pin, acquy, pin mặt trời, máy phát điện (ở nhà máy thủy điện, nhiệt điện, điện gió) đều là nguồn điện. Đèn pin, điện thoại, đồng hồ… chỉ hoạt động khi được nối với nguồn điện; pin "hết điện" thì không còn cung cấp được năng lượng điện để duy trì dòng điện.',
        },
      ],
    },
    {
      heading: 'Vật dẫn điện và vật không dẫn điện',
      blocks: [
        {
          type: 'p',
          text: 'Thí nghiệm: mắc một mạch gồm pin, bóng đèn, công tắc, dây nối và hai kẹp. Lần lượt kẹp vào giữa hai kẹp các vật: dây đồng, đinh sắt, giấy nhôm, ruột bút chì, thước nhựa, dây chun, mảnh sứ, que gỗ khô… rồi đóng công tắc. Với dây đồng, đinh sắt, giấy nhôm, ruột bút chì, đèn sáng; với thước nhựa, dây chun, mảnh sứ, que gỗ khô, đèn không sáng.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Vật dẫn điện, vật cách điện',
          text: 'Vật dẫn điện là vật cho dòng điện chạy qua. Vật không dẫn điện (vật cách điện) là vật không cho dòng điện chạy qua.',
        },
        {
          type: 'table',
          head: ['Vật dẫn điện', 'Vật cách điện'],
          rows: [
            ['Kim loại: đồng, nhôm, sắt, thép, bạc…', 'Nhựa, cao su'],
            ['Than chì (ruột bút chì)', 'Sứ, thủy tinh'],
            ['Nước thường (nước máy, nước mưa), dung dịch muối', 'Gỗ khô, giấy khô, không khí khô'],
          ],
        },
        {
          type: 'p',
          text: 'Dây điện có lõi bằng đồng (hoặc nhôm) để dẫn điện, bọc ngoài bằng vỏ nhựa để cách điện, tránh dòng điện truyền sang người và các vật xung quanh. Phích cắm có chân bằng đồng, vỏ bằng nhựa; kìm điện có cán bọc nhựa hoặc cao su.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'An toàn điện',
          text: 'Nước thường dẫn điện. Không chạm vào ổ cắm, công tắc, thiết bị điện khi tay ướt; không dùng vật bằng kim loại chọc vào ổ cắm; tránh xa dây điện bị đứt, nhất là khi trời mưa.',
        },
      ],
    },
  ],
  explore: {
    title: 'Mạch thử vật dẫn điện',
    instruction:
      'Chọn một vật để kẹp giữa hai kẹp, đóng công tắc và quan sát đèn cùng các electron (chấm xanh). Thử hết các vật để lập bảng vật dẫn điện, vật cách điện. Thử thêm: tháo pin, mở công tắc, để hở giữa hai kẹp.',
  },
  examples: [
    {
      problem:
        'Một bạn mắc mạch gồm pin, bóng đèn, công tắc và hai kẹp như trong thí nghiệm. Kẹp một chiếc thìa inox vào giữa hai kẹp, đóng công tắc thì đèn sáng; thay bằng một chiếc thìa nhựa thì đèn không sáng. Rút ra kết luận gì?',
      steps: [
        'Đèn sáng khi có dòng điện chạy qua đèn, tức là chạy qua cả mạch kín, kể cả vật kẹp giữa hai kẹp.',
        'Với thìa inox, đèn sáng: dòng điện chạy qua thìa inox, nên thìa inox là vật dẫn điện.',
        'Với thìa nhựa, đèn không sáng (pin, đèn, công tắc vẫn như cũ): thìa nhựa không cho dòng điện chạy qua, nên thìa nhựa là vật cách điện.',
      ],
      answer: 'Thìa inox (thép, một kim loại) là vật dẫn điện; thìa nhựa là vật cách điện.',
    },
    {
      problem:
        'Một chiếc đèn pin lắp hai pin tròn. Bật công tắc, đèn không sáng. Hãy nêu ba nguyên nhân có thể và cách kiểm tra.',
      steps: [
        'Đèn chỉ sáng khi mạch kín có nguồn điện còn cung cấp được năng lượng và dòng điện chạy qua bóng đèn.',
        'Nguyên nhân 1: pin đã hết điện. Kiểm tra: thay pin mới.',
        'Nguyên nhân 2: lắp pin sai cực (núm cực dương của pin không quay đúng hướng chỉ dẫn), hoặc chỗ tiếp xúc bị gỉ, bẩn làm mạch hở. Kiểm tra: lắp lại pin, lau sạch chỗ tiếp xúc.',
        'Nguyên nhân 3: dây tóc bóng đèn bị đứt nên mạch hở. Kiểm tra: thay bóng đèn khác.',
      ],
      answer: 'Pin hết điện; lắp pin sai hoặc tiếp xúc kém làm mạch hở; bóng đèn bị đứt dây tóc.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Dòng điện là',
      options: [
        'dòng chuyển dời có hướng của các hạt mang điện',
        'dòng chuyển động hỗn loạn của các electron',
        'dòng các nguyên tử chuyển động trong dây dẫn',
        'dòng nước chảy trong ống dẫn',
      ],
      answer: 0,
      hints: ['Hai từ khóa: "hạt mang điện" và "có hướng".'],
      solution: 'Dòng điện là dòng chuyển dời có hướng của các hạt mang điện.',
    },
    {
      type: 'choice',
      prompt: 'Dòng điện trong dây đồng là dòng chuyển dời có hướng của',
      options: [
        'các hạt nhân nguyên tử',
        'các electron tự do',
        'các nguyên tử đồng',
        'các điện tích dương',
      ],
      answer: 1,
      hints: ['Trong kim loại, loại hạt nào có thể dịch chuyển tự do giữa các nguyên tử?'],
      solution:
        'Đồng là kim loại. Dòng điện trong kim loại là dòng các electron tự do dịch chuyển có hướng.',
    },
    {
      type: 'multi',
      prompt: 'Những vật nào sau đây là nguồn điện?',
      options: ['Pin', 'Acquy', 'Bóng đèn', 'Pin mặt trời', 'Quạt điện', 'Máy phát điện'],
      answers: [0, 1, 3, 5],
      hints: [
        'Nguồn điện cung cấp năng lượng điện; thiết bị dùng điện thì tiêu thụ năng lượng điện.',
      ],
      solution:
        'Pin, acquy, pin mặt trời, máy phát điện là nguồn điện. Bóng đèn và quạt điện là thiết bị dùng điện, cần được nối với nguồn điện mới hoạt động.',
    },
    {
      type: 'choice',
      prompt: 'Ở một chiếc pin tròn (pin AA), cực dương là',
      options: [
        'đầu bằng phẳng',
        'đầu có núm nhô lên',
        'phần vỏ ở giữa thân pin',
        'cả hai đầu đều là cực dương',
      ],
      answer: 1,
      hints: ['Pin tròn có hai cực ở hai đầu; một đầu có núm nhô lên.'],
      solution: 'Pin tròn có đầu có núm nhô lên là cực dương ($+$), đầu bằng là cực âm ($-$).',
    },
    {
      type: 'multi',
      prompt: 'Chọn tất cả các vật dẫn điện.',
      options: [
        'Dây đồng',
        'Thước nhựa',
        'Ruột bút chì',
        'Mảnh sứ',
        'Đinh sắt',
        'Que gỗ khô',
        'Giấy nhôm',
      ],
      answers: [0, 2, 4, 6],
      hints: ['Kim loại dẫn điện. Còn ruột bút chì làm bằng than chì: than chì có dẫn điện không?'],
      solution:
        'Dây đồng, đinh sắt, giấy nhôm (kim loại) và ruột bút chì (than chì) là vật dẫn điện. Thước nhựa, mảnh sứ, que gỗ khô là vật cách điện.',
    },
    {
      type: 'text',
      prompt: 'Vật không cho dòng điện chạy qua gọi là vật gì?',
      accept: ['vật cách điện', 'cách điện', 'vật không dẫn điện', 'không dẫn điện'],
      hints: ['Có hai cách gọi: vật không … điện, hoặc vật … điện.'],
      solution: 'Vật không cho dòng điện chạy qua gọi là vật không dẫn điện, hay vật cách điện.',
    },
    {
      type: 'choice',
      prompt: 'Vì sao dây điện trong nhà có lõi bằng đồng và vỏ bọc bằng nhựa?',
      options: [
        'Lõi đồng để dây nặng hơn, vỏ nhựa để dây đẹp hơn.',
        'Lõi đồng dẫn điện tốt, vỏ nhựa cách điện, bảo vệ người dùng.',
        'Lõi đồng cách điện, vỏ nhựa dẫn điện.',
        'Đồng và nhựa đều dẫn điện tốt.',
      ],
      answer: 1,
      hints: ['Phần nào cần cho dòng điện chạy qua, phần nào cần ngăn dòng điện?'],
      solution:
        'Đồng là kim loại, dẫn điện tốt nên làm lõi để dòng điện chạy qua; nhựa là vật cách điện nên làm vỏ bọc, tránh dòng điện truyền sang người và vật xung quanh.',
    },
    {
      type: 'choice',
      prompt:
        'Trong mạch thử, kẹp một que gỗ khô vào giữa hai kẹp và đóng công tắc. Điều gì xảy ra?',
      options: [
        'Đèn sáng mạnh',
        'Đèn sáng yếu',
        'Đèn không sáng vì gỗ khô là vật cách điện',
        'Pin bị hỏng ngay',
      ],
      answer: 2,
      hints: ['Gỗ khô thuộc nhóm vật dẫn điện hay cách điện?'],
      solution:
        'Gỗ khô là vật cách điện, không cho dòng điện chạy qua nên mạch không có dòng điện, đèn không sáng.',
    },
    {
      type: 'choice',
      prompt: 'Vì sao không được chạm vào ổ cắm, công tắc điện khi tay đang ướt?',
      options: [
        'Vì nước làm hỏng công tắc',
        'Vì nước thường dẫn điện, dòng điện có thể truyền qua người gây điện giật',
        'Vì nước là vật cách điện',
        'Vì tay ướt dễ trơn trượt',
      ],
      answer: 1,
      hints: ['Nước máy, nước mưa thuộc nhóm vật dẫn điện hay cách điện?'],
      solution:
        'Nước thường (nước máy, nước mưa) có lẫn các chất tan nên dẫn điện. Tay ướt chạm vào chỗ có điện, dòng điện dễ truyền qua người gây nguy hiểm.',
    },
  ],
  takeaways: [
    'Dòng điện là dòng chuyển dời có hướng của các hạt mang điện; trong kim loại, đó là dòng các electron tự do dịch chuyển có hướng.',
    'Nguồn điện cung cấp năng lượng điện, duy trì dòng điện; mỗi nguồn điện có hai cực: dương ($+$) và âm ($-$).',
    'Vật dẫn điện cho dòng điện chạy qua (kim loại, than chì, nước thường); vật cách điện thì không (nhựa, cao su, sứ, thủy tinh, gỗ khô).',
  ],
};
