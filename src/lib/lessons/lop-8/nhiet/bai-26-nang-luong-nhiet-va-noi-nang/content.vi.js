/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Các phân tử, nguyên tử cấu tạo nên vật luôn chuyển động hỗn loạn không ngừng; nhiệt độ của vật càng cao thì chúng chuyển động càng nhanh. Năng lượng nhiệt (nhiệt năng) của vật là tổng động năng của các phân tử cấu tạo nên vật; nội năng là tổng động năng và thế năng của chúng. Khi vật nóng lên, các phân tử chuyển động nhanh lên và nội năng của vật tăng.',
  intro:
    'Ngay từ lớp 6, em đã làm quen với năng lượng nhiệt: ấm nước nóng, ngọn lửa, Mặt Trời. Nhưng một cục nước đá lạnh có năng lượng nhiệt không? Nhỏ cùng lúc một giọt mực vào cốc nước nóng và cốc nước lạnh, giọt mực ở cốc nào loang ra nhanh hơn, và vì sao?',
  objectives: [
    'Nêu được các phân tử, nguyên tử chuyển động hỗn loạn không ngừng; nhiệt độ của vật càng cao thì chúng chuyển động càng nhanh.',
    'Nêu được khái niệm năng lượng nhiệt (nhiệt năng) và khái niệm nội năng.',
    'Nhận biết được khi một vật được làm nóng, các phân tử của vật chuyển động nhanh lên và nội năng của vật tăng.',
    'Giải thích được một số hiện tượng đơn giản liên quan đến năng lượng nhiệt và nội năng, như xoa hai tay vào nhau thì tay nóng lên.',
  ],
  sections: [
    {
      heading: 'Một số tính chất của phân tử, nguyên tử',
      blocks: [
        {
          type: 'p',
          text: 'Mọi vật đều được cấu tạo từ các nguyên tử, phân tử rất nhỏ bé. Giữa chúng có khoảng cách, và giữa chúng có lực tương tác: khi ở xa nhau thì chúng hút nhau, khi ở quá gần nhau thì chúng đẩy nhau.',
        },
        {
          type: 'p',
          text: 'Năm 1827, nhà thực vật học Brown quan sát hạt phấn hoa trong nước qua kính hiển vi và thấy chúng chuyển động không ngừng theo những đường gấp khúc bất kì. Đó là vì các phân tử nước chuyển động hỗn loạn, va chạm vào hạt phấn hoa từ mọi phía một cách không đều.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Chuyển động nhiệt',
          text: 'Các nguyên tử, phân tử chuyển động hỗn loạn không ngừng. Nhiệt độ của vật càng cao thì các nguyên tử, phân tử cấu tạo nên vật chuyển động càng nhanh. Vì chuyển động này liên quan chặt chẽ đến nhiệt độ nên nó được gọi là chuyển động nhiệt.',
        },
        {
          type: 'p',
          text: 'Vì vậy, giọt mực nhỏ vào cốc nước nóng loang ra nhanh hơn ở cốc nước lạnh: các phân tử nước nóng chuyển động nhanh hơn, va chạm mạnh và nhiều hơn vào các hạt mực.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Nhanh mà vẫn chậm',
          text: 'Ở nhiệt độ phòng, các phân tử không khí chuyển động với tốc độ hàng trăm tới hàng nghìn $\\text{m/s}$. Thế nhưng mở lọ nước hoa ở đầu lớp, phải một lúc sau cuối lớp mới ngửi thấy mùi: các phân tử nước hoa liên tục va chạm với các phân tử không khí nên đi theo đường gấp khúc rất dài, không bay thẳng đến cuối lớp.',
        },
      ],
    },
    {
      heading: 'Năng lượng nhiệt',
      blocks: [
        {
          type: 'p',
          text: 'Mỗi phân tử đang chuyển động nên có động năng. Cộng động năng của tất cả các phân tử cấu tạo nên vật, ta được một dạng năng lượng của vật.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Năng lượng nhiệt',
          text: 'Năng lượng nhiệt (còn gọi là nhiệt năng) của một vật là tổng động năng của các phân tử cấu tạo nên vật.',
        },
        {
          type: 'list',
          items: [
            'Các phân tử của mọi vật luôn chuyển động, kể cả cục nước đá, nên mọi vật đều có năng lượng nhiệt.',
            'Nhiệt độ của vật càng cao thì các phân tử chuyển động càng nhanh, năng lượng nhiệt của vật càng lớn; vật lạnh đi thì năng lượng nhiệt giảm.',
            'Năng lượng nhiệt có thể chuyển hóa thành các dạng năng lượng khác và ngược lại: ấm điện chuyển điện năng thành năng lượng nhiệt làm nóng nước; nhà máy nhiệt điện dùng năng lượng nhiệt của nhiên liệu đốt cháy để sản xuất điện năng.',
          ],
        },
        {
          type: 'table',
          caption: 'Hai cách làm tăng năng lượng nhiệt của hai bàn tay',
          head: ['Cách làm', 'Điều xảy ra'],
          rows: [
            [
              'Xoa hai bàn tay vào nhau',
              'Ta thực hiện công: cơ năng của chuyển động tay chuyển hóa thành năng lượng nhiệt, tay nóng lên.',
            ],
            [
              'Áp hai bàn tay vào cốc nước ấm',
              'Năng lượng nhiệt truyền từ cốc nước ấm sang tay, tay nóng lên.',
            ],
          ],
        },
      ],
    },
    {
      heading: 'Nội năng',
      blocks: [
        {
          type: 'p',
          text: 'Vì giữa các phân tử có lực tương tác nên ngoài động năng, các phân tử còn có thế năng (phụ thuộc vào khoảng cách giữa chúng).',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Nội năng',
          text: 'Nội năng của một vật là tổng động năng và thế năng của các phân tử cấu tạo nên vật.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Nội năng và nhiệt độ',
          text: 'Khi một vật được làm nóng, các phân tử của vật chuyển động nhanh lên, động năng của chúng tăng nên nội năng của vật tăng. Khi vật lạnh đi, nội năng của vật giảm.',
        },
        {
          type: 'list',
          items: [
            'Hai cốc chứa cùng một lượng nước: cốc nước nóng hơn có nội năng lớn hơn.',
            'Hai cốc nước cùng nhiệt độ: cốc nhiều nước hơn có nhiều phân tử hơn nên nội năng lớn hơn. Nội năng của vật phụ thuộc cả nhiệt độ lẫn khối lượng của vật.',
            'Thả quả cầu kim loại ở nhiệt độ phòng vào cốc nước nóng: các nguyên tử kim loại chuyển động nhanh lên, nội năng của quả cầu tăng; các phân tử nước chuyển động chậm lại, nội năng của nước giảm.',
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Nước đang sôi',
          text: 'Đun nước, nhiệt độ của nước tăng dần cho tới khi sôi. Khi nước đã sôi, dù tiếp tục đun, nhiệt độ của nước không tăng nữa: năng lượng nhận thêm được dùng để tách các phân tử nước ra xa nhau (làm tăng thế năng của chúng) và chuyển nước thành hơi. Nội năng vẫn tăng dù nhiệt độ không đổi.',
        },
      ],
    },
  ],
  explore: {
    title: 'Phân tử trong hai cốc nước',
    instruction:
      'Chỉnh nhiệt độ và lượng nước của hai cốc. Quan sát các phân tử chuyển động nhanh hay chậm, so sánh động năng trung bình của một phân tử và năng lượng nhiệt của mỗi cốc. Bấm "Nhỏ mực vào hai cốc" để xem giọt mực loang ở cốc nào nhanh hơn.',
  },
  examples: [
    {
      problem:
        'Hai cốc thủy tinh giống nhau, mỗi cốc chứa $200\\ \\text{g}$ nước. Cốc thứ nhất ở $25\\ ^\\circ\\text{C}$, cốc thứ hai ở $70\\ ^\\circ\\text{C}$. So sánh động năng của các phân tử nước và nội năng của nước ở hai cốc.',
      steps: [
        'Nhiệt độ của vật càng cao thì các phân tử chuyển động càng nhanh, nên các phân tử nước ở cốc thứ hai ($70\\ ^\\circ\\text{C}$) chuyển động nhanh hơn, có động năng lớn hơn.',
        'Hai cốc có cùng khối lượng nước, tức là cùng số phân tử.',
        'Tổng động năng của các phân tử ở cốc thứ hai lớn hơn, nên nội năng của nước ở cốc thứ hai lớn hơn.',
      ],
      answer:
        'Phân tử nước ở cốc $70\\ ^\\circ\\text{C}$ có động năng lớn hơn; nội năng của nước ở cốc này lớn hơn.',
    },
    {
      problem:
        'Thả một đồng xu bằng đồng đang ở nhiệt độ phòng vào một cốc nước nóng. Động năng của các nguyên tử đồng, phân tử nước và nội năng của đồng xu, của nước thay đổi thế nào?',
      steps: [
        'Năng lượng nhiệt truyền từ nước nóng sang đồng xu lạnh hơn, nên đồng xu nóng lên, nước nguội đi.',
        'Đồng xu nóng lên: các nguyên tử đồng chuyển động nhanh hơn, động năng tăng, nội năng của đồng xu tăng.',
        'Nước nguội đi: các phân tử nước chuyển động chậm lại, động năng giảm, nội năng của nước giảm.',
      ],
      answer:
        'Động năng nguyên tử đồng và nội năng đồng xu tăng; động năng phân tử nước và nội năng của nước giảm.',
    },
    {
      problem: 'Nêu hai cách làm tăng năng lượng nhiệt của một đồng xu và giải thích.',
      steps: [
        'Cách 1: cọ xát đồng xu lên mặt bàn. Ta thực hiện công, cơ năng chuyển hóa thành năng lượng nhiệt, đồng xu nóng lên.',
        'Cách 2: thả đồng xu vào cốc nước nóng (hoặc hơ trên lửa). Năng lượng nhiệt truyền từ vật nóng hơn sang đồng xu.',
        'Ở cả hai cách, nhiệt độ của đồng xu tăng, các nguyên tử đồng chuyển động nhanh hơn, năng lượng nhiệt của đồng xu tăng.',
      ],
      answer: 'Cọ xát (thực hiện công) hoặc cho tiếp xúc với vật nóng hơn (truyền nhiệt).',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Năng lượng nhiệt (nhiệt năng) của một vật là',
      options: [
        'tổng thế năng của các phân tử cấu tạo nên vật',
        'tổng động năng của các phân tử cấu tạo nên vật',
        'động năng của cả vật khi vật chuyển động',
        'hiệu động năng và thế năng của các phân tử',
      ],
      answer: 1,
      hints: ['Năng lượng nhiệt gắn với chuyển động của các phân tử.'],
      solution: 'Năng lượng nhiệt của một vật là tổng động năng của các phân tử cấu tạo nên vật.',
    },
    {
      type: 'choice',
      prompt: 'Nội năng của một vật là',
      options: [
        'thế năng của vật',
        'tổng động năng và nhiệt năng của vật',
        'tổng động năng và thế năng của các phân tử cấu tạo nên vật',
        'hiệu động năng và thế năng của các phân tử cấu tạo nên vật',
      ],
      answer: 2,
      hints: ['Các phân tử vừa chuyển động, vừa tương tác với nhau.'],
      solution:
        'Nội năng của một vật là tổng động năng và thế năng của các phân tử cấu tạo nên vật.',
    },
    {
      type: 'choice',
      prompt: 'Phát biểu nào đúng về mối quan hệ giữa nhiệt độ và năng lượng nhiệt của một vật?',
      options: [
        'Nhiệt độ càng cao thì phân tử chuyển động càng chậm, năng lượng nhiệt càng nhỏ.',
        'Nhiệt độ càng thấp thì phân tử chuyển động càng nhanh, năng lượng nhiệt càng lớn.',
        'Nhiệt độ càng thấp thì phân tử chuyển động càng chậm, năng lượng nhiệt càng lớn.',
        'Nhiệt độ càng cao thì phân tử chuyển động càng nhanh, năng lượng nhiệt càng lớn.',
      ],
      answer: 3,
      hints: ['Giọt mực loang nhanh hơn trong nước nóng hay nước lạnh?'],
      solution:
        'Nhiệt độ của vật càng cao thì các phân tử chuyển động càng nhanh, tổng động năng của chúng, tức năng lượng nhiệt của vật, càng lớn.',
    },
    {
      type: 'choice',
      prompt:
        'Bạn An cho rằng: "Hầu hết mọi vật đều có năng lượng nhiệt, trừ những vật rất lạnh như cục nước đá". Ý kiến này',
      options: [
        'đúng, vì nước đá không có nhiệt độ',
        'đúng, vì các phân tử nước đá đứng yên',
        'sai, vì các phân tử của mọi vật đều chuyển động không ngừng nên mọi vật đều có năng lượng nhiệt',
        'sai, vì chỉ vật rất lạnh mới có năng lượng nhiệt',
      ],
      answer: 2,
      hints: ['Các phân tử nước đá có ngừng chuyển động không?'],
      solution:
        'Các phân tử của mọi vật, kể cả nước đá, luôn chuyển động hỗn loạn không ngừng, nên mọi vật đều có năng lượng nhiệt. Vật lạnh chỉ có năng lượng nhiệt nhỏ hơn so với khi nó nóng hơn.',
    },
    {
      type: 'multi',
      prompt: 'Những cách nào sau đây làm tăng nội năng của một miếng kim loại?',
      options: [
        'Hơ miếng kim loại trên ngọn lửa',
        'Cọ xát miếng kim loại lên mặt bàn',
        'Thả miếng kim loại vào cốc nước đá',
        'Thả miếng kim loại vào nồi nước sôi',
        'Đặt miếng kim loại lên cao hơn',
      ],
      answers: [0, 1, 3],
      hints: [
        'Nội năng tăng khi nhiệt độ của miếng kim loại tăng.',
        'Đặt vật lên cao làm tăng thế năng của cả vật, không làm phân tử chuyển động nhanh hơn.',
      ],
      solution:
        'Hơ trên lửa và thả vào nước sôi làm năng lượng nhiệt truyền sang miếng kim loại; cọ xát là thực hiện công. Cả ba đều làm nhiệt độ, do đó nội năng, tăng. Thả vào nước đá làm miếng kim loại lạnh đi, nội năng giảm. Đặt lên cao chỉ tăng thế năng hấp dẫn của cả vật, nội năng không đổi.',
    },
    {
      type: 'choice',
      prompt:
        'Hai bình nước cùng ở $40\\ ^\\circ\\text{C}$: bình A chứa $1\\ \\text{lít}$ nước, bình B chứa $3\\ \\text{lít}$ nước. Kết luận nào đúng?',
      options: [
        'Phân tử nước ở B chuyển động nhanh hơn, nội năng của B lớn hơn',
        'Phân tử nước ở hai bình chuyển động nhanh như nhau, nội năng của B lớn hơn',
        'Phân tử nước ở hai bình chuyển động nhanh như nhau, nội năng hai bình bằng nhau',
        'Phân tử nước ở A chuyển động nhanh hơn vì A ít nước hơn',
      ],
      answer: 1,
      hints: [
        'Tốc độ chuyển động của phân tử phụ thuộc vào nhiệt độ.',
        'Bình nào có nhiều phân tử hơn?',
      ],
      solution:
        'Cùng nhiệt độ nên các phân tử nước ở hai bình chuyển động nhanh như nhau. Bình B có nhiều nước hơn, tức nhiều phân tử hơn, nên tổng động năng và thế năng của chúng lớn hơn: nội năng của B lớn hơn.',
    },
    {
      type: 'number',
      prompt:
        'Một vật có năng lượng nhiệt $200\\ \\text{J}$. Sau khi được nung nóng, năng lượng nhiệt của nó là $400\\ \\text{J}$. Vật đã nhận thêm bao nhiêu jun năng lượng nhiệt?',
      answer: 200,
      unit: 'J',
      hints: ['Phần năng lượng nhiệt nhận thêm bằng độ tăng của năng lượng nhiệt.'],
      solution: 'Năng lượng nhiệt vật nhận thêm: $400 - 200 = 200\\ \\text{J}$.',
    },
    {
      type: 'choice',
      prompt:
        'Ở nhiệt độ phòng, phân tử không khí chuyển động với tốc độ hàng trăm $\\text{m/s}$. Vì sao mở lọ nước hoa ở đầu lớp, phải một lúc sau cuối lớp mới ngửi thấy mùi?',
      options: [
        'Vì phân tử nước hoa đứng yên, chỉ có không khí chuyển động',
        'Vì phân tử nước hoa va chạm liên tục với phân tử không khí nên đi theo đường gấp khúc rất dài',
        'Vì giữa các phân tử không khí không có khoảng cách',
        'Vì phân tử nước hoa chỉ chuyển động khi có gió',
      ],
      answer: 1,
      hints: ['Phân tử nước hoa có bay thẳng một mạch tới cuối lớp không?'],
      solution:
        'Các phân tử nước hoa và không khí đều chuyển động hỗn loạn không ngừng. Phân tử nước hoa va chạm liên tục với phân tử không khí, đổi hướng liên tục, nên quãng đường thực tế dài gấp rất nhiều lần chiều dài lớp học; vì vậy cần một thời gian mùi mới lan tới cuối lớp.',
    },
    {
      type: 'choice',
      prompt:
        'Đun một ấm nước. Khi nước đã sôi, vẫn tiếp tục đun nhưng nhiệt độ của nước không tăng. Năng lượng nước nhận thêm lúc này được dùng để',
      options: [
        'làm các phân tử nước chuyển động nhanh hơn',
        'tách các phân tử nước ra xa nhau, chuyển nước thành hơi',
        'làm nước nặng thêm',
        'không được dùng vào việc gì, vì nước không nhận thêm năng lượng',
      ],
      answer: 1,
      hints: ['Nhiệt độ không đổi nghĩa là động năng trung bình của phân tử không đổi.'],
      solution:
        'Nhiệt độ không tăng nên các phân tử không chuyển động nhanh hơn. Năng lượng nhận thêm làm tăng thế năng của các phân tử khi chúng tách xa nhau, chuyển nước thành hơi; nội năng của nước vẫn tăng.',
    },
  ],
  takeaways: [
    'Các phân tử, nguyên tử chuyển động hỗn loạn không ngừng (chuyển động nhiệt); nhiệt độ càng cao, chúng chuyển động càng nhanh.',
    'Năng lượng nhiệt (nhiệt năng) của vật là tổng động năng của các phân tử cấu tạo nên vật; mọi vật đều có năng lượng nhiệt.',
    'Nội năng của vật là tổng động năng và thế năng của các phân tử cấu tạo nên vật.',
    'Vật nóng lên thì các phân tử chuyển động nhanh lên, nội năng tăng; cùng nhiệt độ, vật có khối lượng lớn hơn thì nội năng lớn hơn.',
    'Có thể làm tăng năng lượng nhiệt của vật bằng cách thực hiện công (cọ xát) hoặc truyền nhiệt (cho tiếp xúc với vật nóng hơn).',
  ],
};
