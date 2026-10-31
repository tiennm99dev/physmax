/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Lăng kính là khối trong suốt, đồng chất, giới hạn bởi hai mặt phẳng không song song; tia sáng qua lăng kính bị khúc xạ hai lần và lệch về phía đáy. Lăng kính tách chùm sáng trắng thành dải màu từ đỏ đến tím (tán sắc) vì chiết suất của nó với mỗi màu một khác; vật có màu nào thì phản xạ mạnh ánh sáng màu đó.',
  intro:
    'Sau cơn mưa, cầu vồng hiện lên với đủ màu đỏ, da cam, vàng, lục, lam, chàm, tím. Chiếu một chùm ánh sáng mặt trời qua một khối thuỷ tinh hình lăng trụ, ta cũng thu được một "cầu vồng" nhỏ trên tường. Các màu ấy từ đâu ra, và vì sao chiếc lá trông màu xanh còn quả cà chua trông màu đỏ?',
  objectives: [
    'Nêu được cấu tạo của lăng kính: mặt bên, cạnh, đáy, góc chiết quang.',
    'Vẽ được đường đi của tia sáng đơn sắc qua lăng kính và nêu được tia ló lệch về phía đáy.',
    'Mô tả được hiện tượng tán sắc ánh sáng trắng qua lăng kính; nêu được ánh sáng trắng là hỗn hợp của nhiều ánh sáng màu.',
    'Nêu được khái niệm ánh sáng đơn sắc, tác dụng của tấm lọc màu và giải thích được màu sắc của vật.',
  ],
  sections: [
    {
      heading: 'Lăng kính và đường đi của tia sáng',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Lăng kính',
          text: 'Lăng kính là một khối trong suốt, đồng chất (thuỷ tinh, nhựa...), được giới hạn bởi hai mặt phẳng không song song. Trong thực tế, lăng kính thường có dạng lăng trụ tam giác.',
        },
        {
          type: 'list',
          items: [
            'Hai mặt phẳng giới hạn ánh sáng đi vào và đi ra là hai mặt bên.',
            'Giao tuyến của hai mặt bên là cạnh của lăng kính; mặt đối diện với cạnh là đáy.',
            'Góc hợp bởi hai mặt bên là góc chiết quang $A$. Lăng kính được đặc trưng bởi góc chiết quang $A$ và chiết suất $n$.',
          ],
        },
        {
          type: 'p',
          text: 'Chiếu một tia sáng đơn sắc tới mặt bên thứ nhất. Ở mặt bên này, tia sáng đi từ không khí vào thuỷ tinh nên khúc xạ lệch lại gần pháp tuyến; tới mặt bên thứ hai, tia sáng đi từ thuỷ tinh ra không khí nên khúc xạ lệch xa pháp tuyến. Cả hai lần khúc xạ đều làm tia sáng bị bẻ về phía đáy.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Đường đi của tia sáng qua lăng kính',
          text: 'Tia ló ra khỏi lăng kính bị lệch về phía đáy so với tia tới. Góc tạo bởi tia tới và tia ló gọi là góc lệch $D$.',
        },
      ],
    },
    {
      heading: 'Tán sắc ánh sáng trắng',
      blocks: [
        {
          type: 'p',
          text: 'Chiếu một chùm sáng trắng hẹp (ánh sáng mặt trời, đèn dây tóc) tới mặt bên của lăng kính. Trên màn chắn đặt sau lăng kính, ta thu được một dải màu liền nhau: đỏ, da cam, vàng, lục, lam, chàm, tím. Dải màu này gọi là quang phổ của ánh sáng trắng.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Sự tán sắc ánh sáng',
          text: 'Ánh sáng trắng là hỗn hợp của nhiều ánh sáng màu có màu biến thiên liên tục từ đỏ đến tím. Lăng kính không tạo ra màu mà chỉ tách các chùm sáng màu có sẵn trong chùm sáng trắng, cho mỗi chùm đi theo một phương khác nhau. Hiện tượng đó gọi là sự tán sắc ánh sáng.',
        },
        {
          type: 'p',
          text: 'Nguyên nhân: chiết suất của chất làm lăng kính đối với mỗi ánh sáng màu một khác, nhỏ nhất với ánh sáng đỏ và lớn nhất với ánh sáng tím. Vì vậy tia đỏ lệch ít nhất, tia tím lệch nhiều nhất.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Ánh sáng đơn sắc',
          text: 'Ánh sáng đơn sắc là ánh sáng có một màu nhất định và không bị tán sắc khi đi qua lăng kính: nó vẫn bị lệch về phía đáy nhưng không bị tách thành nhiều màu.',
        },
        {
          type: 'p',
          text: 'Có thể tạo ra ánh sáng màu bằng cách chiếu ánh sáng trắng qua tấm lọc màu (kính màu, giấy bóng màu). Tấm lọc màu nào thì cho ánh sáng màu đó đi qua (hấp thụ ít ánh sáng cùng màu) và hấp thụ mạnh các ánh sáng màu khác. Ở phần Khám phá, em xoay lăng kính và đặt tấm lọc màu trước lăng kính để kiểm tra điều này.',
        },
      ],
    },
    {
      heading: 'Màu sắc của vật',
      blocks: [
        {
          type: 'p',
          text: 'Ta nhìn thấy một vật (không tự phát sáng) khi có ánh sáng từ vật truyền vào mắt. Màu của vật mà ta thấy phụ thuộc vào màu của ánh sáng chiếu tới và màu ánh sáng mà vật phản xạ.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Màu sắc của vật',
          text: 'Dưới ánh sáng trắng, vật có màu nào thì phản xạ mạnh ánh sáng màu đó vào mắt ta và hấp thụ các ánh sáng màu khác. Vật màu trắng phản xạ tốt mọi ánh sáng màu. Vật màu đen hấp thụ hầu hết ánh sáng màu và không phản xạ ánh sáng nào; ta nhận ra vật đen vì nó nằm cạnh các vật sáng khác.',
        },
        {
          type: 'table',
          caption: 'Màu của vật dưới các ánh sáng khác nhau',
          head: ['Vật (dưới ánh sáng trắng)', 'Dưới ánh sáng đỏ', 'Dưới ánh sáng lục'],
          rows: [
            ['Trắng', 'đỏ', 'lục'],
            ['Đỏ', 'đỏ', 'đen'],
            ['Lục', 'đen', 'lục'],
            ['Đen', 'đen', 'đen'],
          ],
        },
        { type: 'widget', name: 'mau-vat' },
      ],
    },
  ],
  explore: {
    title: 'Lăng kính tách ánh sáng trắng',
    instruction:
      'Kéo thanh trượt để xoay lăng kính và quan sát dải màu trên màn chắn: màu nào lệch ít nhất, màu nào lệch nhiều nhất? Sau đó chọn một tấm lọc màu: chùm sáng màu qua lăng kính có bị tách thành nhiều màu nữa không?',
  },
  examples: [
    {
      problem:
        'Mô tả đường đi của một tia sáng đơn sắc chiếu xiên góc tới mặt bên của một lăng kính thuỷ tinh đặt trong không khí.',
      steps: [
        'Tại mặt bên thứ nhất, ánh sáng đi từ không khí vào thuỷ tinh (chiết quang hơn) nên khúc xạ, tia khúc xạ lệch lại gần pháp tuyến, tức là lệch về phía đáy.',
        'Trong lăng kính, tia sáng truyền thẳng tới mặt bên thứ hai.',
        'Tại mặt bên thứ hai, ánh sáng đi từ thuỷ tinh ra không khí nên khúc xạ lệch xa pháp tuyến, lại lệch thêm về phía đáy.',
      ],
      answer: 'Tia sáng bị khúc xạ hai lần và tia ló lệch về phía đáy lăng kính so với tia tới.',
    },
    {
      problem:
        'Một lăng kính thuỷ tinh có góc chiết quang $A = 30^\\circ$, chiết suất $1{,}5$. Chiếu một tia sáng đơn sắc vuông góc với mặt bên thứ nhất; khi đó tia sáng tới mặt bên thứ hai với góc tới $30^\\circ$. Tính góc khúc xạ ở mặt bên thứ hai và góc lệch $D$.',
      steps: [
        'Ở mặt bên thứ nhất, tia sáng vuông góc với mặt nên truyền thẳng vào lăng kính.',
        'Ở mặt bên thứ hai: $1{,}5 \\cdot \\sin 30^\\circ = 1 \\cdot \\sin r$, nên $\\sin r = 0{,}75$ và $r \\approx 48{,}6^\\circ$.',
        'Tia ló lệch khỏi phương của tia tới một góc $D = r - 30^\\circ \\approx 48{,}6^\\circ - 30^\\circ = 18{,}6^\\circ$, về phía đáy.',
      ],
      answer: 'Góc khúc xạ khoảng $48{,}6^\\circ$; góc lệch $D \\approx 18{,}6^\\circ$.',
    },
    {
      problem:
        'Trong phòng tối, chiếu ánh sáng đỏ vào một tờ giấy trắng có in dòng chữ màu lục. Ta nhìn thấy gì? Giải thích.',
      steps: [
        'Giấy trắng phản xạ tốt mọi ánh sáng màu, nên dưới ánh sáng đỏ nó phản xạ ánh sáng đỏ: nền giấy trông màu đỏ.',
        'Chữ màu lục chỉ phản xạ mạnh ánh sáng lục, hấp thụ ánh sáng đỏ. Ánh sáng chiếu tới không có màu lục nên chữ không phản xạ ánh sáng nào vào mắt.',
      ],
      answer: 'Ta thấy dòng chữ màu đen trên nền giấy màu đỏ.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Lăng kính là',
      options: [
        'một khối trong suốt, đồng chất, được giới hạn bởi hai mặt phẳng song song',
        'một khối trong suốt, đồng chất, được giới hạn bởi hai mặt phẳng không song song',
        'một tấm kính có hai mặt cong',
        'một gương phẳng đặt nghiêng',
      ],
      answer: 1,
      hints: ['Nếu hai mặt song song thì tia ló song song với tia tới, không bị lệch hướng.'],
      solution:
        'Lăng kính là khối trong suốt, đồng chất, được giới hạn bởi hai mặt phẳng không song song, thường có dạng lăng trụ tam giác.',
    },
    {
      type: 'choice',
      prompt: 'Chiếu một tia sáng đơn sắc qua lăng kính đặt trong không khí. Tia ló',
      options: [
        'lệch về phía cạnh của lăng kính',
        'song song với tia tới',
        'lệch về phía đáy của lăng kính',
        'luôn vuông góc với mặt bên thứ hai',
      ],
      answer: 2,
      hints: ['Ở cả hai mặt bên, tia khúc xạ đều bị bẻ theo cùng một hướng.'],
      solution: 'Tia ló ra khỏi lăng kính luôn lệch về phía đáy so với tia tới.',
    },
    {
      type: 'order',
      prompt:
        'Chiếu chùm sáng trắng qua lăng kính. Sắp xếp các ánh sáng màu theo thứ tự góc lệch tăng dần (lệch ít nhất trước).',
      items: ['tím', 'lục', 'đỏ', 'vàng', 'chàm', 'da cam', 'lam'],
      answer: [2, 5, 3, 1, 6, 4, 0],
      hints: ['Chiết suất của lăng kính nhỏ nhất với ánh sáng đỏ, lớn nhất với ánh sáng tím.'],
      solution:
        'Góc lệch tăng dần theo chiết suất: đỏ, da cam, vàng, lục, lam, chàm, tím. Tia đỏ lệch ít nhất, tia tím lệch nhiều nhất.',
    },
    {
      type: 'choice',
      prompt: 'Lăng kính tách được chùm sáng trắng thành dải màu vì',
      options: [
        'lăng kính đã nhuộm màu cho ánh sáng',
        'chiết suất của lăng kính đối với mỗi ánh sáng màu một khác, nên mỗi màu lệch một góc khác nhau',
        'lăng kính hấp thụ ánh sáng trắng rồi phát ra ánh sáng màu',
        'ánh sáng phản xạ toàn phần trong lăng kính',
      ],
      answer: 1,
      hints: ['Lăng kính không tạo ra màu; các màu có sẵn trong ánh sáng trắng.'],
      solution:
        'Ánh sáng trắng là hỗn hợp nhiều ánh sáng màu. Chiết suất của lăng kính khác nhau với mỗi màu nên mỗi chùm màu bị lệch một góc khác nhau và tách ra: đó là sự tán sắc ánh sáng.',
    },
    {
      type: 'choice',
      prompt: 'Chiếu một chùm sáng đỏ hẹp (đã qua tấm lọc đỏ) qua lăng kính. Trên màn ta thu được',
      options: [
        'một dải màu từ đỏ đến tím',
        'một vệt sáng màu đỏ, lệch về phía đáy so với tia tới',
        'một vệt sáng màu trắng',
        'không có vệt sáng nào',
      ],
      answer: 1,
      hints: ['Ánh sáng đỏ đã là ánh sáng đơn sắc.'],
      solution:
        'Ánh sáng đơn sắc không bị tán sắc qua lăng kính: nó vẫn bị lệch về phía đáy nhưng vẫn giữ một màu đỏ.',
    },
    {
      type: 'number',
      prompt:
        'Lăng kính có góc chiết quang $30^\\circ$, chiết suất $1{,}4$. Chiếu tia sáng vuông góc với mặt bên thứ nhất, tia sáng tới mặt bên thứ hai với góc tới $30^\\circ$. Tính góc khúc xạ khi tia ló ra khỏi mặt bên thứ hai (theo độ, làm tròn đến một chữ số thập phân).',
      answer: 44.4,
      tolerance: 0.15,
      unit: '°',
      hints: [
        'Ở mặt bên thứ hai, ánh sáng đi từ lăng kính ra không khí: $n_1 \\sin i = n_2 \\sin r$.',
        '$\\sin r = 1{,}4 \\cdot \\sin 30^\\circ$.',
      ],
      solution:
        '$\\sin r = 1{,}4 \\cdot 0{,}5 = 0{,}7$, nên $r \\approx 44{,}4^\\circ$. Góc lệch $D \\approx 44{,}4^\\circ - 30^\\circ = 14{,}4^\\circ$.',
    },
    {
      type: 'choice',
      prompt: 'Đặt một tờ giấy trắng dưới ánh sáng lục. Tờ giấy trông có màu',
      options: ['trắng', 'lục', 'đen', 'đỏ'],
      answer: 1,
      hints: ['Vật trắng phản xạ tốt mọi ánh sáng màu chiếu tới nó.'],
      solution: 'Giấy trắng phản xạ ánh sáng lục chiếu tới, nên trông màu lục.',
    },
    {
      type: 'text',
      prompt: 'Chiếu ánh sáng lam vào một quả cà chua chín màu đỏ. Quả cà chua trông có màu gì?',
      accept: ['đen', 'màu đen'],
      hints: [
        'Quả cà chua đỏ phản xạ mạnh ánh sáng màu nào? Trong ánh sáng chiếu tới có màu đó không?',
      ],
      solution:
        'Quả cà chua đỏ chỉ phản xạ mạnh ánh sáng đỏ và hấp thụ ánh sáng lam. Ánh sáng chiếu tới không có màu đỏ, nên quả cà chua không phản xạ ánh sáng nào vào mắt và trông màu đen.',
    },
    {
      type: 'multi',
      prompt: 'Những phát biểu nào đúng?',
      options: [
        'Ánh sáng trắng là hỗn hợp của nhiều ánh sáng màu.',
        'Tấm lọc màu đỏ cho ánh sáng đỏ đi qua và hấp thụ mạnh các ánh sáng màu khác.',
        'Vật màu đen phản xạ tốt mọi ánh sáng màu.',
        'Dưới ánh sáng trắng, vật màu lục phản xạ mạnh ánh sáng lục.',
      ],
      answers: [0, 1, 3],
      hints: ['Vật nào phản xạ tốt mọi ánh sáng màu: vật trắng hay vật đen?'],
      solution:
        'Vật trắng mới phản xạ tốt mọi ánh sáng màu; vật đen hấp thụ hầu hết ánh sáng và không phản xạ ánh sáng nào. Các phát biểu còn lại đúng.',
    },
  ],
  takeaways: [
    'Lăng kính: khối trong suốt, đồng chất, giới hạn bởi hai mặt phẳng không song song; đặc trưng bởi góc chiết quang $A$ và chiết suất $n$.',
    'Tia sáng qua lăng kính khúc xạ hai lần; tia ló lệch về phía đáy so với tia tới.',
    'Lăng kính tách ánh sáng trắng thành dải màu đỏ, da cam, vàng, lục, lam, chàm, tím (tán sắc): đỏ lệch ít nhất, tím lệch nhiều nhất. Ánh sáng đơn sắc không bị tán sắc.',
    'Vật có màu nào thì phản xạ mạnh ánh sáng màu đó; vật trắng phản xạ mọi màu, vật đen không phản xạ màu nào. Tấm lọc màu nào cho ánh sáng màu đó đi qua.',
  ],
};
