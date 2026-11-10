/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Dao động tắt dần có biên độ giảm dần do lực cản; dao động cưỡng bức có tần số bằng tần số ngoại lực; khi tần số ngoại lực bằng tần số riêng của hệ, biên độ dao động cưỡng bức đạt cực đại: đó là hiện tượng cộng hưởng.',
  intro:
    'Chiếc xích đu được đẩy một lần rồi để tự do sẽ đung đưa thấp dần rồi dừng hẳn. Nhưng chỉ cần đẩy nhẹ đúng nhịp, em bé lại được đưa lên mỗi lúc một cao. Vì sao những cú đẩy nhẹ lại có tác dụng lớn như vậy, và vì sao người ta cấm đoàn quân đi đều bước qua cầu?',
  objectives: [
    'Nêu được dao động tắt dần là gì, nguyên nhân và ví dụ thực tế của dao động tắt dần.',
    'Nêu được dao động cưỡng bức là gì và các đặc điểm của nó.',
    'Nêu được hiện tượng cộng hưởng, điều kiện xảy ra cộng hưởng và ảnh hưởng của lực cản.',
    'Đánh giá được sự có lợi hay có hại của cộng hưởng trong một số trường hợp thực tế.',
  ],
  sections: [
    {
      heading: 'Dao động tắt dần',
      blocks: [
        {
          type: 'p',
          text: 'Kéo con lắc lò xo hay con lắc đơn ra khỏi vị trí cân bằng rồi thả, ta thấy biên độ của nó nhỏ dần và cuối cùng vật dừng lại. Gắn bút dạ vào quả nặng để vẽ đồ thị dao động lên tấm nhựa chuyển động đều, ta được một đường hình sin có các đỉnh thấp dần.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Dao động tắt dần',
          text: 'Dao động tắt dần là dao động có biên độ giảm dần theo thời gian.',
        },
        {
          type: 'p',
          text: 'Nguyên nhân: vật luôn chịu lực cản của môi trường (lực cản của không khí, của chất lỏng, lực ma sát). Lực cản sinh công âm, làm cơ năng của vật giảm dần và chuyển hoá thành nhiệt năng. Cơ năng tỉ lệ với bình phương biên độ, nên biên độ cũng giảm dần. Lực cản càng lớn, dao động tắt càng nhanh.',
        },
        {
          type: 'list',
          items: [
            'Có lợi: bộ phận giảm xóc của ô tô, xe máy (lò xo kết hợp với pít-tông chuyển động trong dầu nhớt) làm dao động của thân xe tắt nhanh khi xe đi qua chỗ xóc; cơ cấu đóng cửa tự động giúp cánh cửa khép lại êm, không dao động.',
            'Có hại: con lắc đồng hồ, chiếc xích đu sẽ dừng lại nếu không được cung cấp thêm năng lượng.',
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Phần năng lượng mất đi sau mỗi chu kì',
          text: 'Nếu sau mỗi chu kì biên độ còn lại $k$ lần biên độ trước đó ($k < 1$) thì cơ năng còn lại $k^2$ lần, và phần cơ năng mất đi là $1 - k^2$. Ví dụ biên độ giảm $3\\%$ thì $k = 0{,}97$ và cơ năng mất đi $1 - 0{,}97^2 \\approx 5{,}9\\%$.',
        },
      ],
    },
    {
      heading: 'Dao động cưỡng bức',
      blocks: [
        {
          type: 'p',
          text: 'Muốn dao động không tắt, ta phải tác dụng vào vật một ngoại lực biến thiên tuần hoàn, gọi là lực cưỡng bức, chẳng hạn $F = F_0\\cos(2\\pi f t)$. Người mẹ đẩy nhẹ chiếc xích đu sau mỗi lần nó trở lại, hay động cơ đang chạy làm rung cả thân máy, là những lực như vậy.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Dao động cưỡng bức',
          text: 'Dao động của một hệ chịu tác dụng của ngoại lực cưỡng bức tuần hoàn gọi là dao động cưỡng bức.',
        },
        {
          type: 'list',
          items: [
            'Sau một thời gian ngắn ban đầu, dao động cưỡng bức có biên độ không đổi.',
            'Tần số của dao động cưỡng bức bằng tần số $f$ của lực cưỡng bức (không phải tần số riêng $f_0$ của hệ).',
            'Biên độ của dao động cưỡng bức phụ thuộc vào biên độ $F_0$ của lực cưỡng bức, vào lực cản của môi trường và vào độ chênh lệch giữa tần số $f$ của lực cưỡng bức với tần số riêng $f_0$ của hệ.',
          ],
        },
        {
          type: 'p',
          text: 'Tần số riêng $f_0$ là tần số hệ dao động khi để tự do, không có lực cản: với con lắc lò xo $f_0 = \\dfrac{1}{2\\pi}\\sqrt{\\dfrac{k}{m}}$, với con lắc đơn (góc nhỏ) $f_0 = \\dfrac{1}{2\\pi}\\sqrt{\\dfrac{g}{l}}$.',
        },
      ],
    },
    {
      heading: 'Hiện tượng cộng hưởng',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Cộng hưởng',
          text: 'Hiện tượng biên độ của dao động cưỡng bức tăng đến giá trị cực đại khi tần số $f$ của lực cưỡng bức bằng tần số riêng $f_0$ của hệ dao động gọi là hiện tượng cộng hưởng.',
        },
        { type: 'tex', tex: '\\text{Điều kiện cộng hưởng: } f = f_0 \\quad (T = T_0)' },
        {
          type: 'p',
          text: 'Giải thích: khi $f = f_0$, lực cưỡng bức luôn đẩy vật cùng chiều chuyển động của vật, nên hệ được cung cấp năng lượng nhiều nhất. Biên độ tăng cho tới khi phần năng lượng nhận được trong mỗi chu kì bằng phần năng lượng mất đi do lực cản.',
        },
        {
          type: 'p',
          text: 'Đồ thị biên độ theo tần số lực cưỡng bức có một đỉnh tại $f \\approx f_0$. Lực cản càng nhỏ, đỉnh càng cao và càng nhọn (cộng hưởng rõ nét); lực cản lớn, đỉnh thấp và tù (cộng hưởng không rõ).',
        },
        {
          type: 'table',
          head: ['Cộng hưởng có lợi', 'Cộng hưởng có hại'],
          rows: [
            [
              'Hộp đàn ghi-ta, đàn violon cộng hưởng với dây đàn, làm âm to và giàu âm sắc.',
              'Đoàn quân đi đều bước qua cầu có thể làm cầu dao động mạnh rồi gãy, vì thế họ phải đi lộn xộn.',
            ],
            [
              'Đẩy xích đu đúng nhịp: lực nhỏ mà xích đu lên cao.',
              'Gió thổi tuần hoàn làm cầu Tacoma (Mỹ, 1940) dao động mạnh và đổ sập.',
            ],
            [
              'Mạch thu sóng của máy thu thanh chọn đúng một đài nhờ cộng hưởng điện.',
              'Máy móc, động cơ rung mạnh ở một số tốc độ quay, làm hỏng chi tiết; người ta phải thiết kế sao cho tần số riêng tránh xa tần số rung.',
            ],
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Đừng nhầm hai tần số',
          text: 'Dao động cưỡng bức luôn có tần số bằng tần số ngoại lực $f$. Tần số riêng $f_0$ chỉ quyết định khi nào biên độ lớn nhất.',
        },
      ],
    },
  ],
  explore: {
    title: 'Tắt dần và cộng hưởng',
    instruction:
      'Ở chế độ Tắt dần, chọn lực cản rồi Thả vật: theo dõi biên độ giảm theo đường nét đứt. Ở chế độ Cưỡng bức, hệ có một tần số riêng bị giấu: kéo thanh tần số ngoại lực, mỗi tần số em thử để lại một chấm trên đồ thị biên độ. Tìm tần số cho biên độ lớn nhất rồi bấm Chốt, sau đó so sánh đỉnh cộng hưởng với ba mức lực cản.',
  },
  examples: [
    {
      problem:
        'Một con lắc dao động tắt dần chậm. Cứ sau mỗi chu kì, biên độ giảm $3\\%$. Phần năng lượng của con lắc bị mất đi trong một dao động toàn phần là bao nhiêu phần trăm?',
      steps: [
        'Sau một chu kì, biên độ còn $A_1 = 0{,}97A$.',
        'Cơ năng tỉ lệ với bình phương biên độ: $\\dfrac{W_1}{W} = \\dfrac{A_1^2}{A^2} = 0{,}97^2 = 0{,}9409$.',
        'Phần năng lượng mất đi: $\\dfrac{W - W_1}{W} = 1 - 0{,}9409 = 0{,}0591$.',
      ],
      answer: 'Khoảng $5{,}9\\%$ năng lượng bị mất đi trong mỗi dao động toàn phần.',
    },
    {
      problem:
        'Một con lắc đơn dài $44$ cm được treo vào trần một toa xe lửa. Con lắc bị kích động mỗi khi bánh xe gặp chỗ nối giữa hai thanh ray. Chiều dài mỗi thanh ray là $12{,}5$ m, lấy $g = 9{,}8$ m/s². Tàu chạy thẳng đều với tốc độ bao nhiêu thì biên độ dao động của con lắc lớn nhất?',
      steps: [
        'Chu kì riêng của con lắc: $T_0 = 2\\pi\\sqrt{\\dfrac{l}{g}} = 2\\pi\\sqrt{\\dfrac{0{,}44}{9{,}8}} \\approx 1{,}33$ s.',
        'Lực kích động lặp lại sau mỗi khoảng thời gian tàu đi hết một thanh ray: $T = \\dfrac{L}{v}$.',
        'Biên độ lớn nhất khi có cộng hưởng: $T = T_0$, nên $v = \\dfrac{L}{T_0} = \\dfrac{12{,}5}{1{,}33} \\approx 9{,}4$ m/s.',
      ],
      answer: '$v \\approx 9{,}4$ m/s, tức khoảng $34$ km/h.',
    },
    {
      problem:
        'Một con lắc lò xo gồm vật $100$ g và lò xo độ cứng $40$ N/m chịu tác dụng của ngoại lực $F = 0{,}5\\cos(10\\pi t)$ (N). Vật dao động với tần số bao nhiêu? Muốn biên độ dao động lớn nhất thì phải điều chỉnh tần số ngoại lực bằng bao nhiêu?',
      steps: [
        'Dao động cưỡng bức có tần số bằng tần số ngoại lực: $f = \\dfrac{10\\pi}{2\\pi} = 5$ Hz.',
        'Tần số riêng: $f_0 = \\dfrac{1}{2\\pi}\\sqrt{\\dfrac{k}{m}} = \\dfrac{1}{2\\pi}\\sqrt{\\dfrac{40}{0{,}1}} = \\dfrac{20}{2\\pi} \\approx 3{,}18$ Hz.',
        'Biên độ lớn nhất khi xảy ra cộng hưởng, tức khi tần số ngoại lực bằng $f_0$.',
      ],
      answer:
        'Vật dao động với tần số $5$ Hz; cần chỉnh tần số ngoại lực về $f_0 \\approx 3{,}18$ Hz.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Dao động tắt dần là dao động có',
      options: [
        'biên độ giảm dần theo thời gian',
        'tần số tăng dần theo thời gian',
        'cơ năng không đổi theo thời gian',
        'biên độ không đổi theo thời gian',
      ],
      answer: 0,
      hints: ['Quan sát con lắc được thả tự do trong không khí: đại lượng nào nhỏ dần?'],
      solution:
        'Theo định nghĩa, dao động tắt dần là dao động có biên độ giảm dần theo thời gian; cơ năng của nó cũng giảm dần.',
    },
    {
      type: 'choice',
      prompt: 'Nguyên nhân gây ra dao động tắt dần của con lắc đơn dao động trong không khí là',
      options: [
        'lực cản của không khí',
        'trọng lực tác dụng lên vật',
        'lực căng của dây treo',
        'khối lượng của vật nặng',
      ],
      answer: 0,
      hints: ['Lực nào làm cơ năng của con lắc chuyển thành nhiệt?'],
      solution:
        'Lực cản của không khí sinh công âm, làm cơ năng giảm dần và chuyển thành nhiệt năng, nên biên độ giảm dần.',
    },
    {
      type: 'choice',
      prompt: 'Khi đã ổn định, dao động cưỡng bức có tần số',
      options: [
        'bằng tần số của lực cưỡng bức',
        'bằng tần số riêng của hệ',
        'bằng tổng tần số riêng và tần số lực cưỡng bức',
        'luôn nhỏ hơn tần số riêng của hệ',
      ],
      answer: 0,
      hints: ['Ngoại lực "ép" vật dao động theo nhịp của ai?'],
      solution:
        'Dao động cưỡng bức có biên độ không đổi và tần số bằng tần số $f$ của lực cưỡng bức, dù tần số riêng $f_0$ của hệ khác $f$.',
    },
    {
      type: 'multi',
      prompt: 'Biên độ của dao động cưỡng bức phụ thuộc vào những yếu tố nào?',
      options: [
        'Biên độ của lực cưỡng bức',
        'Độ chênh lệch giữa tần số lực cưỡng bức và tần số riêng của hệ',
        'Lực cản của môi trường',
        'Pha ban đầu của lực cưỡng bức',
      ],
      answers: [0, 1, 2],
      hints: [
        'Pha ban đầu chỉ cho biết lúc bắt đầu tính thời gian lực đang ở đâu, nó không làm lực mạnh hay yếu hơn.',
      ],
      solution:
        'Biên độ dao động cưỡng bức phụ thuộc biên độ $F_0$ của lực cưỡng bức, lực cản của môi trường và độ chênh lệch giữa $f$ và $f_0$. Pha ban đầu của ngoại lực không ảnh hưởng tới biên độ.',
    },
    {
      type: 'choice',
      prompt: 'Hiện tượng cộng hưởng xảy ra khi',
      options: [
        'tần số của lực cưỡng bức bằng tần số riêng của hệ',
        'tần số của lực cưỡng bức lớn hơn nhiều tần số riêng của hệ',
        'lực cản của môi trường rất lớn',
        'biên độ của lực cưỡng bức bằng biên độ dao động',
      ],
      answer: 0,
      hints: ['Ở đồ thị biên độ theo tần số, đỉnh nằm ở đâu?'],
      solution: 'Biên độ dao động cưỡng bức đạt cực đại khi $f = f_0$: đó là điều kiện cộng hưởng.',
    },
    {
      type: 'number',
      prompt:
        'Một con lắc dao động tắt dần chậm, cứ sau mỗi chu kì biên độ giảm $4\\%$. Phần cơ năng bị mất đi trong một dao động toàn phần là bao nhiêu phần trăm? (Làm tròn đến hai chữ số thập phân.)',
      answer: 7.84,
      tolerance: 0.01,
      unit: '%',
      hints: [
        'Sau một chu kì biên độ còn $0{,}96A$.',
        'Cơ năng tỉ lệ với $A^2$: cơ năng còn lại $0{,}96^2$ lần.',
      ],
      solution:
        '$\\dfrac{W_1}{W} = 0{,}96^2 = 0{,}9216$, nên phần mất đi là $1 - 0{,}9216 = 0{,}0784 = 7{,}84\\%$.',
    },
    {
      type: 'number',
      prompt:
        'Một con lắc dao động tắt dần với biên độ ban đầu $10$ cm, cứ sau mỗi chu kì biên độ giảm $5\\%$ so với chu kì trước. Tính biên độ sau ba chu kì (làm tròn đến hai chữ số thập phân).',
      answer: 8.57,
      tolerance: 0.01,
      unit: 'cm',
      hints: [
        'Mỗi chu kì biên độ được nhân với $0{,}95$, không phải trừ đi $0{,}5$ cm.',
        'Sau ba chu kì: $A_3 = 10 \\cdot 0{,}95^3$.',
      ],
      solution: '$A_3 = 10 \\cdot 0{,}95^3 = 10 \\cdot 0{,}857375 \\approx 8{,}57$ cm.',
    },
    {
      type: 'number',
      prompt:
        'Một con lắc lò xo gồm vật $250$ g và lò xo độ cứng $100$ N/m. Tác dụng vào vật một ngoại lực tuần hoàn. Tần số của ngoại lực bằng bao nhiêu thì xảy ra cộng hưởng? (Làm tròn đến hai chữ số thập phân.)',
      answer: 3.18,
      tolerance: 0.01,
      unit: 'Hz',
      hints: [
        'Cộng hưởng khi $f = f_0$.',
        'Tần số riêng: $f_0 = \\dfrac{1}{2\\pi}\\sqrt{\\dfrac{k}{m}}$, với $m$ tính bằng kg.',
      ],
      solution:
        '$f_0 = \\dfrac{1}{2\\pi}\\sqrt{\\dfrac{100}{0{,}25}} = \\dfrac{20}{2\\pi} \\approx 3{,}18$ Hz. Cộng hưởng khi tần số ngoại lực bằng $3{,}18$ Hz.',
    },
    {
      type: 'number',
      prompt:
        'Một người xách một xô nước đi trên đường, mỗi bước đi dài $45$ cm. Chu kì dao động riêng của nước trong xô là $0{,}3$ s. Người đó đi với tốc độ bao nhiêu thì nước trong xô sóng sánh mạnh nhất?',
      answer: 1.5,
      unit: 'm/s',
      hints: [
        'Mỗi bước chân tác dụng vào xô một lần: chu kì của ngoại lực là thời gian đi một bước.',
        'Nước sóng sánh mạnh nhất khi thời gian đi một bước bằng $0{,}3$ s.',
      ],
      solution:
        'Cộng hưởng khi $T = T_0 = 0{,}3$ s, tức mỗi bước đi mất $0{,}3$ s. Tốc độ: $v = \\dfrac{0{,}45}{0{,}3} = 1{,}5$ m/s.',
    },
    {
      type: 'number',
      prompt:
        'Một con lắc đơn dài $64$ cm treo trong toa tàu. Mỗi thanh ray dài $12$ m. Lấy $g = \\pi^2$ m/s². Tàu chạy thẳng đều với tốc độ bao nhiêu kilômét trên giờ thì con lắc dao động mạnh nhất?',
      answer: 27,
      unit: 'km/h',
      hints: [
        'Tính chu kì riêng $T_0 = 2\\pi\\sqrt{\\dfrac{l}{g}}$; với $g = \\pi^2$ phép tính rất gọn.',
        'Cộng hưởng khi tàu đi hết một thanh ray trong đúng $T_0$; nhớ đổi m/s sang km/h.',
      ],
      solution:
        '$T_0 = 2\\pi\\sqrt{\\dfrac{0{,}64}{\\pi^2}} = 2 \\cdot 0{,}8 = 1{,}6$ s. $v = \\dfrac{12}{1{,}6} = 7{,}5$ m/s $= 7{,}5 \\cdot 3{,}6 = 27$ km/h.',
    },
    {
      type: 'choice',
      prompt:
        'Hai hệ giống nhau chịu cùng một lực cưỡng bức, hệ 1 trong không khí, hệ 2 trong dầu (lực cản lớn hơn). So với hệ 2, đỉnh cộng hưởng của hệ 1',
      options: [
        'cao hơn và nhọn hơn',
        'thấp hơn và tù hơn',
        'cao bằng nhau',
        'nằm ở tần số lớn gấp đôi',
      ],
      answer: 0,
      hints: ['Lực cản càng nhỏ, năng lượng mất đi mỗi chu kì càng ít.'],
      solution:
        'Lực cản nhỏ thì biên độ cộng hưởng lớn và chỉ lớn trong một khoảng tần số hẹp: đỉnh cao và nhọn. Hệ 1 có lực cản nhỏ hơn nên đỉnh cao và nhọn hơn.',
    },
    {
      type: 'match',
      prompt: 'Ghép mỗi ví dụ với loại dao động hoặc hiện tượng phù hợp.',
      left: [
        'Thân xe ô tô dừng rung nhanh nhờ bộ giảm xóc',
        'Thân máy rung theo nhịp động cơ đang chạy',
        'Ca sĩ hát đúng một nốt làm vỡ ly thuỷ tinh',
      ],
      right: ['Dao động tắt dần', 'Dao động cưỡng bức', 'Cộng hưởng', 'Dao động điều hoà tự do'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
      hints: [
        'Có ngoại lực tuần hoàn không? Nếu có, biên độ có tăng vọt vì tần số trùng tần số riêng không?',
      ],
      solution:
        'Bộ giảm xóc tạo lực cản lớn: dao động tắt dần. Động cơ tác dụng lực tuần hoàn lên thân máy: dao động cưỡng bức. Âm thanh có tần số bằng tần số riêng của ly làm ly rung rất mạnh tới vỡ: cộng hưởng.',
    },
  ],
  takeaways: [
    'Dao động tắt dần có biên độ giảm dần theo thời gian, do lực cản làm cơ năng chuyển thành nhiệt; ứng dụng trong giảm xóc.',
    'Biên độ còn $k$ lần sau mỗi chu kì thì cơ năng còn $k^2$ lần.',
    'Dao động cưỡng bức có biên độ không đổi và tần số bằng tần số lực cưỡng bức.',
    'Cộng hưởng: biên độ dao động cưỡng bức cực đại khi $f = f_0$; lực cản càng nhỏ, cộng hưởng càng rõ.',
    'Cộng hưởng có thể có lợi (hộp đàn, xích đu) hoặc có hại (cầu, máy móc).',
  ],
};
