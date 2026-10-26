/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Nam châm hút được các vật làm bằng sắt, thép, niken, coban (vật liệu từ). Mỗi nam châm có hai cực: cực Bắc (N) và cực Nam (S); để tự do, nam châm nằm theo hướng Bắc – Nam. Hai cực cùng tên đẩy nhau, khác tên hút nhau. La bàn dùng kim nam châm để xác định hướng địa lí.',
  intro:
    'Người đi biển xưa, giữa đại dương mênh mông không thấy bờ, vẫn tìm được đường về nhờ một chiếc kim nhỏ luôn chỉ về phương Bắc. Chiếc kim ấy làm bằng gì, và vì sao nó chỉ hướng được?',
  objectives: [
    'Nêu được tác dụng của nam châm lên các vật liệu khác nhau; kể được tên một số vật liệu từ.',
    'Nêu được sự định hướng của thanh nam châm (kim nam châm) và xác định được cực Bắc, cực Nam của một nam châm.',
    'Nêu được sự tương tác giữa các cực của hai nam châm.',
    'Mô tả được cấu tạo của la bàn và sử dụng la bàn để tìm hướng địa lí.',
  ],
  sections: [
    {
      heading: 'Tác dụng của nam châm lên các vật liệu khác nhau',
      blocks: [
        {
          type: 'p',
          text: 'Đưa một thanh nam châm lại gần các vật nhỏ làm bằng sắt, thép, nhôm, đồng, nhựa, gỗ, thủy tinh,... ta thấy nam châm chỉ hút các vật bằng sắt, thép và không hút các vật còn lại.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Vật liệu từ',
          text: 'Nam châm hút được các vật làm bằng sắt, thép, niken, coban và một số hợp kim của chúng. Những vật liệu bị nam châm hút gọi là vật liệu có tính chất từ (vật liệu từ). Nam châm không hút nhôm, đồng, nhựa, gỗ, thủy tinh,...',
        },
        {
          type: 'p',
          text: 'Nam châm có nhiều hình dạng: nam châm thẳng (thanh nam châm), nam châm hình chữ U, kim nam châm, nam châm hình trụ, hình đĩa,... Những nam châm này giữ được từ tính lâu dài nên gọi là nam châm vĩnh cửu.',
        },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Không phải kim loại nào cũng bị nam châm hút: thìa nhôm, dây đồng là kim loại nhưng không bị hút.',
        },
        { type: 'widget', name: 'materials' },
      ],
    },
    {
      heading: 'Sự định hướng của nam châm. Hai cực của nam châm',
      blocks: [
        {
          type: 'p',
          text: 'Treo một thanh nam châm bằng sợi chỉ mềm ở chính giữa (hoặc đặt kim nam châm lên một mũi nhọn) cho nó quay tự do. Khi đã đứng cân bằng, nam châm luôn nằm theo hướng Bắc – Nam địa lí. Xoay lệch đi rồi thả ra, nó lại quay về hướng cũ, và đầu chỉ hướng Bắc vẫn là đầu cũ.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Hai cực của nam châm',
          text: 'Đầu luôn chỉ hướng Bắc gọi là cực Bắc, kí hiệu $N$; đầu luôn chỉ hướng Nam gọi là cực Nam, kí hiệu $S$. Mỗi nam châm đều có hai cực. Hai cực là nơi hút sắt mạnh nhất. Cực Bắc thường được sơn màu đỏ, cực Nam sơn màu xanh.',
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Bẻ đôi một thanh nam châm, ta không tách riêng được cực Bắc và cực Nam: mỗi nửa lại là một nam châm có đủ hai cực.',
        },
      ],
    },
    {
      heading: 'Tương tác giữa hai nam châm',
      blocks: [
        {
          type: 'p',
          text: 'Đặt một kim nam châm (hoặc thanh nam châm) quay tự do, rồi đưa lần lượt từng cực của một thanh nam châm khác lại gần mỗi cực của nó. Có lúc hai cực hút nhau, có lúc đẩy nhau.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Tương tác giữa hai nam châm',
          text: 'Khi đặt hai nam châm gần nhau, các cực cùng tên thì đẩy nhau, các cực khác tên thì hút nhau.',
        },
        {
          type: 'table',
          head: ['Hai cực đặt gần nhau', 'Cùng tên hay khác tên', 'Tương tác'],
          rows: [
            ['$N$ và $N$', 'Cùng tên', 'Đẩy nhau'],
            ['$S$ và $S$', 'Cùng tên', 'Đẩy nhau'],
            ['$N$ và $S$', 'Khác tên', 'Hút nhau'],
          ],
        },
        {
          type: 'p',
          text: 'Dựa vào tương tác này, ta xác định được cực của một nam châm chưa ghi tên: đưa một đầu của nó lại gần cực Bắc của một nam châm đã biết. Nếu chúng đẩy nhau thì đầu đó là cực Bắc; nếu hút nhau thì đầu đó là cực Nam.',
        },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Nam châm hút cả sắt chưa nhiễm từ, nên thấy "hút nhau" chưa chắc vật kia là nam châm. Muốn biết một thanh kim loại có phải nam châm không, hãy thử xem nó có đẩy được một cực của nam châm khác không.',
        },
      ],
    },
    {
      heading: 'La bàn',
      blocks: [
        {
          type: 'p',
          text: 'La bàn là dụng cụ dùng để xác định hướng địa lí. Bộ phận chính của la bàn là một kim nam châm có thể quay tự do quanh một trục, đặt trong hộp (vỏ) bằng nhựa hoặc kim loại, có mặt chia độ ghi các hướng và mặt kính bảo vệ.',
        },
        {
          type: 'table',
          head: ['Chữ trên mặt la bàn', 'Hướng'],
          rows: [
            ['$N$', 'Bắc'],
            ['$S$', 'Nam'],
            ['$E$', 'Đông'],
            ['$W$', 'Tây'],
          ],
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Đặt la bàn nằm ngang, ở xa nam châm và các vật bằng sắt, thép.',
            'Chờ kim nam châm đứng yên: đầu đỏ (cực Bắc) chỉ hướng Bắc.',
            'Xoay vỏ la bàn sao cho vạch $N$ trên mặt chia độ trùng với cực Bắc của kim.',
            'Đọc trên mặt chia độ hướng của vật cần xác định.',
          ],
        },
        { type: 'widget', name: 'compass' },
        {
          type: 'callout',
          tone: 'note',
          text: 'Nam châm hoặc vật bằng sắt đặt gần la bàn sẽ hút lệch kim nam châm, làm la bàn chỉ sai hướng.',
        },
      ],
    },
  ],
  explore: {
    title: 'Hai thanh nam châm',
    instruction:
      'Kéo nam châm B (hoặc dùng phím mũi tên) lại gần nam châm A rồi thả ra: hai nam châm hút nhau hay đẩy nhau? Bấm "Quay ngược" để đổi cực đối diện. Ở chế độ "Nam châm bí ẩn", các cực của B bị che: hãy thử với A rồi đoán đầu trái của B là cực gì.',
  },
  examples: [
    {
      problem:
        'Một thanh nam châm bị mất màu sơn, không biết đầu nào là cực Bắc. Nêu cách xác định cực của nó bằng một sợi chỉ.',
      steps: [
        'Buộc sợi chỉ vào chính giữa thanh nam châm rồi treo lên, để nó quay tự do, xa các vật bằng sắt.',
        'Khi nam châm đứng cân bằng, nó nằm theo hướng Bắc – Nam địa lí.',
        'Đầu chỉ về hướng Bắc (xác định nhờ Mặt Trời mọc ở hướng Đông hoặc nhờ la bàn) là cực Bắc; đầu kia là cực Nam.',
      ],
      answer:
        'Treo nam châm quay tự do; đầu chỉ hướng Bắc là cực Bắc ($N$), đầu kia là cực Nam ($S$).',
    },
    {
      problem:
        'Có hai thanh nam châm $AB$ và $CD$. Biết $C$ là cực Bắc. Đưa đầu $A$ lại gần đầu $C$ thì chúng đẩy nhau. Hỏi đầu $B$ là cực gì, và nếu đưa $B$ lại gần $D$ thì chúng hút hay đẩy nhau?',
      steps: [
        '$A$ đẩy $C$ nên $A$ và $C$ là hai cực cùng tên: $A$ là cực Bắc.',
        'Mỗi nam châm có hai cực khác nhau, nên $B$ là cực Nam; tương tự $D$ là cực Nam.',
        '$B$ và $D$ đều là cực Nam, cùng tên nên đẩy nhau.',
      ],
      answer: '$B$ là cực Nam; $B$ và $D$ đẩy nhau.',
    },
    {
      problem:
        'Bạn Lan đứng ở sân trường, xoay la bàn sao cho vạch $N$ trùng với đầu đỏ của kim. Cổng trường nằm đúng giữa hai vạch $S$ và $E$. Cổng trường nằm ở hướng nào so với Lan?',
      steps: [
        'Khi vạch $N$ trùng với cực Bắc của kim, các vạch trên mặt la bàn chỉ đúng hướng địa lí.',
        '$S$ là hướng Nam, $E$ là hướng Đông.',
        'Hướng nằm giữa Nam và Đông là hướng Đông Nam.',
      ],
      answer: 'Cổng trường ở hướng Đông Nam.',
    },
  ],
  practice: [
    {
      type: 'multi',
      prompt: 'Nam châm hút được những vật nào sau đây?',
      options: [
        'Chiếc đinh sắt',
        'Chiếc thìa nhôm',
        'Chiếc kéo thép',
        'Đoạn dây đồng',
        'Miếng niken',
        'Chiếc thước nhựa',
      ],
      answers: [0, 2, 4],
      hints: [
        'Nam châm hút các vật làm bằng vật liệu từ.',
        'Vật liệu từ thường gặp: sắt, thép, niken, coban.',
      ],
      solution:
        'Đinh sắt, kéo thép và miếng niken làm bằng vật liệu từ nên bị hút. Nhôm, đồng, nhựa không bị nam châm hút.',
    },
    {
      type: 'choice',
      prompt: 'Treo một thanh nam châm cho quay tự do. Khi đứng cân bằng, nó luôn',
      options: [
        'nằm theo hướng Đông – Tây.',
        'nằm theo hướng Bắc – Nam, cực Bắc chỉ hướng Bắc.',
        'nằm theo hướng Bắc – Nam, cực Bắc chỉ hướng Nam.',
        'nằm theo một hướng bất kì.',
      ],
      answer: 1,
      hints: ['Cực Bắc của nam châm được đặt tên theo hướng mà nó chỉ.'],
      solution:
        'Nam châm quay tự do luôn nằm theo hướng Bắc – Nam địa lí; đầu chỉ hướng Bắc chính là cực Bắc.',
    },
    {
      type: 'text',
      prompt: 'Cực Bắc của nam châm được kí hiệu bằng chữ cái nào?',
      accept: ['N'],
      hints: ['Chữ cái đầu của từ tiếng Anh "North".'],
      solution: 'Cực Bắc kí hiệu là $N$ (North), cực Nam kí hiệu là $S$ (South).',
    },
    {
      type: 'choice',
      prompt:
        'Đưa cực Nam của thanh nam châm thứ nhất lại gần cực Nam của thanh nam châm thứ hai thì',
      options: [
        'chúng hút nhau.',
        'chúng đẩy nhau.',
        'chúng không tác dụng lên nhau.',
        'lúc đầu hút, sau đó đẩy.',
      ],
      answer: 1,
      hints: ['Hai cực này cùng tên hay khác tên?'],
      solution: 'Hai cực Nam là hai cực cùng tên, nên chúng đẩy nhau.',
    },
    {
      type: 'choice',
      prompt:
        'Đưa đầu $X$ của một thanh nam châm lại gần cực Bắc của một kim nam châm thì thấy chúng hút nhau. Đầu $X$ là',
      options: ['cực Bắc.', 'cực Nam.', 'không phải cực nào.', 'không xác định được.'],
      answer: 1,
      hints: ['Hai cực hút nhau khi chúng khác tên.'],
      solution: '$X$ hút cực Bắc của kim nam châm nên $X$ khác tên với cực Bắc: $X$ là cực Nam.',
    },
    {
      type: 'choice',
      prompt:
        'Thanh nam châm $1$ có hai đầu $P$, $Q$; thanh nam châm $2$ có hai đầu $M$, $K$, trong đó $M$ là cực Bắc. Biết $P$ đẩy $M$. Đưa $Q$ lại gần $K$ thì',
      options: ['chúng hút nhau.', 'chúng đẩy nhau.', 'chúng không tương tác.'],
      answer: 1,
      hints: [
        'Từ "$P$ đẩy $M$", suy ra $P$ là cực gì.',
        'Mỗi nam châm có hai cực khác tên: suy ra $Q$ và $K$.',
      ],
      solution:
        '$P$ đẩy $M$ (cực Bắc) nên $P$ là cực Bắc, do đó $Q$ là cực Nam. $M$ là cực Bắc nên $K$ là cực Nam. $Q$ và $K$ cùng là cực Nam nên đẩy nhau.',
    },
    {
      type: 'order',
      prompt: 'Sắp xếp các bước dùng la bàn để xác định hướng của một vật theo đúng thứ tự.',
      items: [
        'Đặt la bàn nằm ngang, xa nam châm và vật bằng sắt.',
        'Chờ kim nam châm đứng yên.',
        'Xoay vỏ la bàn cho vạch $N$ trùng với cực Bắc (đầu đỏ) của kim.',
        'Đọc hướng của vật trên mặt chia độ.',
      ],
      answer: [0, 1, 2, 3],
      hints: ['Phải đặt la bàn đúng chỗ trước, đọc hướng là việc cuối cùng.'],
      solution:
        'Đặt la bàn nằm ngang, xa vật bằng sắt → chờ kim đứng yên → xoay vỏ cho vạch $N$ trùng cực Bắc của kim → đọc hướng.',
    },
    {
      type: 'choice',
      prompt: 'Vì sao khi dùng la bàn phải để la bàn xa nam châm và các vật bằng sắt?',
      options: [
        'Vì sắt làm mặt kính la bàn bị vỡ.',
        'Vì nam châm và vật bằng sắt tương tác với kim nam châm, làm kim lệch khỏi hướng Bắc – Nam.',
        'Vì la bàn sẽ bị mất hết từ tính ngay lập tức.',
        'Vì vỏ la bàn bị nam châm hút dính chặt.',
      ],
      answer: 1,
      hints: ['Kim la bàn là một nam châm nhỏ quay tự do.'],
      solution:
        'Kim la bàn là một nam châm. Nam châm khác hoặc vật bằng sắt ở gần sẽ hút (hoặc đẩy) kim, làm kim lệch, la bàn chỉ sai hướng.',
    },
    {
      type: 'match',
      prompt: 'Nối chữ trên mặt la bàn với hướng tương ứng.',
      left: ['$N$', '$S$', '$E$', '$W$'],
      right: ['Tây', 'Đông', 'Nam', 'Bắc'],
      pairs: [
        [0, 3],
        [1, 2],
        [2, 1],
        [3, 0],
      ],
      hints: ['$N$ – North, $S$ – South, $E$ – East, $W$ – West.'],
      solution: '$N$ là Bắc, $S$ là Nam, $E$ là Đông, $W$ là Tây.',
    },
  ],
  takeaways: [
    'Nam châm hút các vật bằng sắt, thép, niken, coban (vật liệu từ); không hút nhôm, đồng, nhựa, gỗ.',
    'Mỗi nam châm có hai cực: cực Bắc ($N$) và cực Nam ($S$); để tự do, nam châm nằm theo hướng Bắc – Nam.',
    'Hai cực cùng tên đẩy nhau, hai cực khác tên hút nhau.',
    'La bàn có kim nam châm quay tự do; xoay vỏ cho vạch $N$ trùng cực Bắc của kim rồi đọc hướng.',
  ],
};
