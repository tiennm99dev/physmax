/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Nhiều vật bị nhiễm điện khi cọ xát và hút được các vật khác. Có hai loại điện tích, dương và âm: các vật nhiễm điện cùng loại thì đẩy nhau, khác loại thì hút nhau. Khi cọ xát, electron dịch chuyển từ vật này sang vật kia: vật nhận thêm electron nhiễm điện âm, vật mất bớt electron nhiễm điện dương.',
  intro:
    'Vào những ngày hanh khô, chải tóc bằng lược nhựa, em thấy nhiều sợi tóc bị lược hút, kéo thẳng ra. Cởi chiếc áo len trong phòng tối, đôi khi em còn nghe tiếng lách tách và thấy chớp sáng li ti. Vì sao lại như vậy?',
  objectives: [
    'Giải thích được sơ lược nguyên nhân một vật cách điện nhiễm điện do cọ xát.',
    'Chỉ ra được vật nhiễm điện chỉ có thể nhiễm một trong hai loại điện tích: dương hoặc âm.',
    'Nêu được sự tương tác giữa các vật nhiễm điện: cùng loại thì đẩy nhau, khác loại thì hút nhau.',
    'Giải thích được một số hiện tượng nhiễm điện do cọ xát trong thực tế.',
  ],
  sections: [
    {
      heading: 'Sự nhiễm điện do cọ xát',
      blocks: [
        {
          type: 'p',
          text: 'Thí nghiệm: đưa một đũa nhựa lại gần các vụn giấy, vụn giấy không bị hút. Cọ xát đũa nhựa vào mảnh len (dạ) vài lần rồi đưa lại gần vụn giấy: đũa nhựa hút các vụn giấy. Làm tương tự với đũa thủy tinh cọ xát vào mảnh lụa: đũa thủy tinh cũng hút vụn giấy.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Vật nhiễm điện',
          text: 'Nhiều vật bị nhiễm điện khi cọ xát. Vật bị nhiễm điện (vật mang điện tích) có khả năng hút các vật khác.',
        },
        {
          type: 'p',
          text: 'Thước nhựa, đũa thủy tinh, mảnh polyethylene (túi ni lông), lược nhựa, bóng bay cao su… đều dễ nhiễm điện khi cọ xát. Vật nhiễm điện có thể hút vụn giấy, sợi tóc, mẩu xốp, bụi, hoặc làm dòng nước chảy nhỏ từ vòi bị lệch về phía nó.',
        },
      ],
    },
    {
      heading: 'Hai loại điện tích',
      blocks: [
        {
          type: 'p',
          text: 'Thí nghiệm: treo một đũa nhựa đã cọ xát vào len bằng sợi chỉ. Đưa một đũa nhựa khác cũng đã cọ xát vào len lại gần: hai đũa đẩy nhau. Đưa một đũa thủy tinh đã cọ xát vào lụa lại gần đũa nhựa treo: chúng hút nhau. Vậy điện tích trên đũa thủy tinh và trên đũa nhựa là khác loại.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Hai loại điện tích',
          text: 'Có hai loại điện tích là điện tích dương (kí hiệu $+$) và điện tích âm (kí hiệu $-$). Các vật nhiễm điện cùng loại thì đẩy nhau, khác loại thì hút nhau.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Quy ước',
          text: 'Điện tích của đũa thủy tinh cọ xát vào lụa là điện tích dương. Điện tích của đũa nhựa cọ xát vào len (dạ) là điện tích âm.',
        },
        {
          type: 'table',
          head: ['Vật A', 'Vật B', 'Tương tác'],
          rows: [
            ['nhiễm điện dương', 'nhiễm điện dương', 'đẩy nhau'],
            ['nhiễm điện âm', 'nhiễm điện âm', 'đẩy nhau'],
            ['nhiễm điện dương', 'nhiễm điện âm', 'hút nhau'],
            ['nhiễm điện (dương hoặc âm)', 'chưa nhiễm điện, nhẹ', 'A hút B'],
          ],
          caption: 'Tương tác giữa các vật',
        },
        { type: 'widget', name: 'tuong-tac' },
      ],
    },
    {
      heading: 'Giải thích sự nhiễm điện do cọ xát',
      blocks: [
        {
          type: 'p',
          text: 'Mọi vật đều được cấu tạo từ các nguyên tử. Mỗi nguyên tử gồm hạt nhân mang điện tích dương ở giữa và các electron mang điện tích âm chuyển động xung quanh hạt nhân. Bình thường, tổng điện tích âm của các electron có độ lớn bằng điện tích dương của hạt nhân: nguyên tử trung hòa về điện, vật chưa nhiễm điện.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Nguyên nhân nhiễm điện do cọ xát',
          text: 'Khi cọ xát, một số electron dịch chuyển từ vật này sang vật kia. Vật nhận thêm electron thì nhiễm điện âm; vật mất bớt electron thì nhiễm điện dương.',
        },
        {
          type: 'list',
          items: [
            'Cọ xát đũa nhựa vào len: electron chuyển từ len sang đũa nhựa. Đũa nhựa thừa electron nên nhiễm điện âm; mảnh len thiếu electron nên nhiễm điện dương.',
            'Cọ xát đũa thủy tinh vào lụa: electron chuyển từ đũa thủy tinh sang lụa. Đũa thủy tinh thiếu electron nên nhiễm điện dương; mảnh lụa nhiễm điện âm.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Chỉ electron dịch chuyển',
          text: 'Khi cọ xát, hạt nhân (mang điện tích dương) không rời khỏi vật; chỉ có electron dịch chuyển. Vì vậy hai vật cọ xát vào nhau luôn nhiễm điện trái dấu, và điện tích một vật nhận được bằng điện tích vật kia mất đi.',
        },
      ],
    },
    {
      heading: 'Nhiễm điện do cọ xát trong thực tế',
      blocks: [
        {
          type: 'table',
          head: ['Hiện tượng', 'Giải thích'],
          rows: [
            [
              'Chải tóc khô bằng lược nhựa, tóc bị lược hút thẳng ra',
              'Lược nhựa và tóc cọ xát nhau, nhiễm điện trái dấu nên hút nhau.',
            ],
            [
              'Cánh quạt điện, màn hình ti vi thường bám nhiều bụi',
              'Cánh quạt cọ xát với không khí, màn hình cọ xát khi lau, bị nhiễm điện nên hút bụi.',
            ],
            [
              'Cởi áo len trong phòng tối, nghe tiếng lách tách, thấy chớp sáng nhỏ',
              'Áo len cọ xát với người và áo bên trong, nhiễm điện; điện tích phóng qua không khí tạo tia lửa điện nhỏ.',
            ],
            [
              'Sét',
              'Các đám mây cọ xát với không khí, nhiễm điện rất mạnh; điện tích phóng giữa hai đám mây hoặc giữa đám mây và mặt đất tạo thành tia lửa điện khổng lồ.',
            ],
            [
              'Xe chở xăng có một sợi xích sắt kéo lê trên mặt đường',
              'Thùng xe cọ xát với không khí và xăng sóng sánh cọ xát với thùng, bị nhiễm điện; xích sắt dẫn điện tích xuống đất, tránh tia lửa điện gây cháy nổ.',
            ],
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'An toàn khi có sét',
          text: 'Khi trời mưa giông, không đứng dưới gốc cây cao, cột điện hay ở nơi trống trải; không cầm vật bằng kim loại giơ lên cao. Nhà cao tầng được lắp cột thu lôi để dẫn điện tích của tia sét xuống đất.',
        },
      ],
    },
  ],
  explore: {
    title: 'Cọ xát thanh nhựa, thanh thủy tinh',
    instruction:
      'Chọn thanh và mảnh vải, rồi kéo mảnh vải qua lại trên thanh (hoặc bấm "Cọ xát"). Quan sát electron (chấm xanh) chuyển từ vật nào sang vật nào, rồi đưa thanh lại gần vụn giấy. So sánh: thước nhựa cọ len và thanh thủy tinh cọ lụa nhiễm điện loại gì?',
  },
  examples: [
    {
      problem:
        'Cọ xát một thước nhựa vào mảnh len rồi treo thước bằng sợi chỉ. Đưa lần lượt lại gần thước: (a) một thước nhựa khác cũng vừa cọ xát vào len; (b) một thanh thủy tinh vừa cọ xát vào lụa. Thước treo bị hút hay bị đẩy?',
      steps: [
        'Theo quy ước, thước nhựa cọ xát vào len nhiễm điện âm; thanh thủy tinh cọ xát vào lụa nhiễm điện dương.',
        '(a) Hai thước nhựa cùng nhiễm điện âm, cùng loại nên đẩy nhau.',
        '(b) Thước nhựa nhiễm điện âm, thanh thủy tinh nhiễm điện dương, khác loại nên hút nhau.',
      ],
      answer: '(a) Thước treo bị đẩy ra xa; (b) thước treo bị hút lại gần.',
    },
    {
      problem:
        'Cọ xát một quả bóng bay vào tóc khô, quả bóng nhiễm điện âm. (a) Electron đã dịch chuyển từ vật nào sang vật nào? (b) Tóc nhiễm điện loại gì? (c) Vì sao sau đó tóc bị quả bóng hút?',
      steps: [
        'Vật nhiễm điện âm là vật nhận thêm electron. Quả bóng nhiễm điện âm nên đã nhận thêm electron.',
        '(a) Electron dịch chuyển từ tóc sang quả bóng.',
        '(b) Tóc mất bớt electron nên nhiễm điện dương.',
        '(c) Quả bóng (âm) và tóc (dương) nhiễm điện khác loại nên hút nhau.',
      ],
      answer:
        '(a) Từ tóc sang quả bóng; (b) tóc nhiễm điện dương; (c) vì hai vật nhiễm điện trái dấu hút nhau.',
    },
    {
      problem:
        'Ba vật $A$, $B$, $C$ đã nhiễm điện. $A$ hút $B$, $B$ đẩy $C$. Biết $C$ là đũa thủy tinh vừa cọ xát vào lụa. Hỏi $A$, $B$ nhiễm điện loại gì?',
      steps: [
        '$C$ là đũa thủy tinh cọ xát vào lụa nên $C$ nhiễm điện dương.',
        '$B$ đẩy $C$ nên $B$ nhiễm điện cùng loại với $C$: $B$ nhiễm điện dương.',
        '$A$ hút $B$, mà $A$ đã nhiễm điện, nên $A$ nhiễm điện khác loại với $B$: $A$ nhiễm điện âm.',
      ],
      answer: '$A$ nhiễm điện âm, $B$ nhiễm điện dương.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Có thể làm một thước nhựa nhiễm điện bằng cách nào?',
      options: [
        'Phơi thước nhựa ngoài nắng',
        'Cọ xát thước nhựa vào mảnh len khô',
        'Đặt thước nhựa lên một thanh nam châm',
        'Nhúng thước nhựa vào nước',
      ],
      answer: 1,
      hints: ['Tên bài học đã gợi ý cách làm vật nhiễm điện.'],
      solution:
        'Cọ xát thước nhựa vào mảnh len khô thì thước nhựa nhiễm điện (nhiễm điện âm) và hút được vụn giấy.',
    },
    {
      type: 'choice',
      prompt: 'Hai vật nhiễm điện đặt gần nhau thì đẩy nhau. Kết luận nào đúng?',
      options: [
        'Hai vật nhiễm điện khác loại.',
        'Hai vật nhiễm điện cùng loại.',
        'Một vật nhiễm điện, vật kia không nhiễm điện.',
        'Cả hai vật đều trung hòa về điện.',
      ],
      answer: 1,
      hints: ['Điện tích cùng loại thì đẩy hay hút nhau?'],
      solution: 'Các vật nhiễm điện cùng loại thì đẩy nhau, khác loại thì hút nhau.',
    },
    {
      type: 'choice',
      prompt: 'Một vật trung hòa về điện, sau khi cọ xát thì nhiễm điện dương. Vì sao?',
      options: [
        'Vì vật nhận thêm electron.',
        'Vì vật nhận thêm điện tích dương từ vật kia.',
        'Vì vật mất bớt electron.',
        'Vì hạt nhân của vật bị tách ra.',
      ],
      answer: 2,
      hints: [
        'Khi cọ xát, loại hạt nào dịch chuyển từ vật này sang vật kia?',
        'Electron mang điện tích âm. Bớt điện tích âm thì vật thừa điện tích loại nào?',
      ],
      solution:
        'Khi cọ xát chỉ có electron dịch chuyển. Vật mất bớt electron (mất bớt điện tích âm) thì điện tích dương của hạt nhân chiếm ưu thế: vật nhiễm điện dương.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi vật sau khi cọ xát với điều đã xảy ra với nó (theo quy ước của sách).',
      left: [
        'Đũa thủy tinh cọ xát vào lụa',
        'Đũa nhựa cọ xát vào len',
        'Mảnh len đã cọ xát vào đũa nhựa',
        'Mảnh lụa đã cọ xát vào đũa thủy tinh',
      ],
      right: [
        'Nhận thêm electron từ len, nhiễm điện âm',
        'Mất bớt electron sang lụa, nhiễm điện dương',
        'Nhận thêm electron từ đũa thủy tinh, nhiễm điện âm',
        'Mất bớt electron sang đũa nhựa, nhiễm điện dương',
      ],
      pairs: [
        [0, 1],
        [1, 0],
        [2, 3],
        [3, 2],
      ],
      hints: [
        'Quy ước: thủy tinh cọ lụa nhiễm điện dương, nhựa cọ len nhiễm điện âm.',
        'Hai vật cọ xát vào nhau luôn nhiễm điện trái dấu.',
      ],
      solution:
        'Đũa thủy tinh cọ lụa nhiễm điện dương: nó mất bớt electron sang lụa, nên mảnh lụa nhận thêm electron và nhiễm điện âm. Đũa nhựa cọ len nhiễm điện âm: nó nhận thêm electron từ len, nên mảnh len mất bớt electron và nhiễm điện dương.',
    },
    {
      type: 'choice',
      prompt:
        'Cọ xát đũa nhựa vào mảnh len. Electron dịch chuyển thế nào, và đũa nhựa nhiễm điện gì?',
      options: [
        'Electron chuyển từ len sang đũa nhựa; đũa nhựa nhiễm điện âm.',
        'Electron chuyển từ đũa nhựa sang len; đũa nhựa nhiễm điện âm.',
        'Electron chuyển từ đũa nhựa sang len; đũa nhựa nhiễm điện dương.',
        'Điện tích dương chuyển từ len sang đũa nhựa; đũa nhựa nhiễm điện dương.',
      ],
      answer: 0,
      hints: [
        'Theo quy ước, đũa nhựa cọ len nhiễm điện âm. Vật nhiễm điện âm đã nhận hay mất electron?',
      ],
      solution:
        'Đũa nhựa cọ len nhiễm điện âm, tức là đã nhận thêm electron: electron chuyển từ len sang đũa nhựa.',
    },
    {
      type: 'multi',
      prompt: 'Hiện tượng nào sau đây là do nhiễm điện do cọ xát?',
      options: [
        'Chải tóc khô bằng lược nhựa, tóc bị lược hút thẳng ra',
        'Cánh quạt điện quay lâu ngày bám nhiều bụi',
        'Thanh nam châm hút đinh sắt',
        'Sét đánh trong cơn mưa giông',
        'Viên phấn rơi xuống đất vì có trọng lực',
      ],
      answers: [0, 1, 3],
      hints: ['Hiện tượng nào có hai vật cọ xát vào nhau (kể cả cọ xát với không khí)?'],
      solution:
        'Lược nhựa cọ xát với tóc, cánh quạt cọ xát với không khí, đám mây cọ xát với không khí: đều nhiễm điện do cọ xát. Nam châm hút sắt là tương tác từ; viên phấn rơi do trọng lực.',
    },
    {
      type: 'text',
      prompt:
        'Trong nguyên tử, hạt mang điện tích âm, chuyển động xung quanh hạt nhân và có thể dịch chuyển từ vật này sang vật khác khi cọ xát, gọi là hạt gì?',
      accept: ['electron', 'êlectron', 'hạt electron', 'các electron'],
      hints: ['Hạt nhân mang điện tích dương; hạt mang điện tích âm có tên bắt đầu bằng chữ e.'],
      solution: 'Đó là electron. Khi cọ xát, electron dịch chuyển từ vật này sang vật kia.',
    },
    {
      type: 'choice',
      prompt:
        'Ba quả cầu nhỏ $A$, $B$, $C$ đều nhiễm điện. $A$ đẩy $B$, $B$ hút $C$. Biết $C$ nhiễm điện âm. $A$ nhiễm điện gì?',
      options: ['Âm', 'Dương', 'Không xác định được', 'Không nhiễm điện'],
      answer: 1,
      hints: ['Đi từ $C$: $B$ hút $C$ nên $B$ nhiễm điện loại gì?', 'Rồi $A$ đẩy $B$.'],
      solution:
        '$B$ hút $C$ (âm) nên $B$ nhiễm điện dương. $A$ đẩy $B$ nên $A$ cùng loại với $B$: $A$ nhiễm điện dương.',
    },
    {
      type: 'choice',
      prompt: 'Vì sao xe chở xăng thường có một sợi xích sắt kéo lê trên mặt đường?',
      options: [
        'Để xe chạy êm hơn',
        'Để dẫn điện tích do cọ xát xuống đất, tránh tia lửa điện gây cháy nổ',
        'Để báo hiệu cho xe phía sau',
        'Để giữ cho xăng không sóng sánh',
      ],
      answer: 1,
      hints: [
        'Thùng xe cọ xát với không khí khi chạy. Điều gì có thể xảy ra nếu điện tích tích tụ nhiều?',
      ],
      solution:
        'Khi xe chạy, thùng xe cọ xát với không khí và xăng nên bị nhiễm điện. Xích sắt dẫn điện, đưa điện tích xuống đất, tránh phóng tia lửa điện làm xăng bốc cháy.',
    },
  ],
  takeaways: [
    'Nhiều vật bị nhiễm điện khi cọ xát; vật nhiễm điện có khả năng hút các vật khác.',
    'Có hai loại điện tích: dương ($+$) và âm ($-$). Cùng loại thì đẩy nhau, khác loại thì hút nhau.',
    'Quy ước: thủy tinh cọ xát vào lụa nhiễm điện dương; nhựa cọ xát vào len nhiễm điện âm.',
    'Khi cọ xát, electron dịch chuyển giữa hai vật: vật nhận thêm electron nhiễm điện âm, vật mất bớt electron nhiễm điện dương.',
  ],
};
