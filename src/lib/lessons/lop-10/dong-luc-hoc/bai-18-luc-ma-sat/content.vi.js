/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Lực ma sát nghỉ giữ vật đứng yên, lực ma sát trượt cản vật trượt với độ lớn F = μN; ma sát không phụ thuộc diện tích tiếp xúc, và có cả lợi lẫn hại trong đời sống.',
  intro:
    'Đẩy nhẹ một chiếc tủ nặng, tủ vẫn đứng yên. Đẩy mạnh dần, đến một lúc tủ bật đi, và khi đã trượt thì lại dễ đẩy hơn lúc đầu. Điều gì đã giữ tủ lại, và vì sao lực giữ đó lại giảm khi tủ bắt đầu trượt?',
  objectives: [
    'Nêu được đặc điểm của lực ma sát nghỉ và lực ma sát nghỉ cực đại.',
    'Nêu được đặc điểm của lực ma sát trượt, viết được công thức $F_{mst} = \\mu N$.',
    'Biết độ lớn lực ma sát trượt phụ thuộc vào vật liệu, tình trạng bề mặt và áp lực, không phụ thuộc vào diện tích tiếp xúc.',
    'Vận dụng được hệ số ma sát để tính lực và gia tốc, nêu được lợi ích và tác hại của ma sát.',
  ],
  sections: [
    {
      heading: 'Lực ma sát nghỉ',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Lực ma sát nghỉ',
          text: 'Lực ma sát nghỉ xuất hiện ở mặt tiếp xúc khi có một lực tác dụng lên vật nhưng vật vẫn đứng yên. Lực này cùng phương, ngược chiều với lực tác dụng theo phương song song với mặt tiếp xúc, và có độ lớn bằng độ lớn của lực đó nên giữ cho vật đứng yên.',
        },
        {
          type: 'p',
          text: 'Khi lực tác dụng tăng dần, lực ma sát nghỉ tăng theo, đến một giá trị lớn nhất gọi là lực ma sát nghỉ cực đại $F_{msn\\,max}$. Lực tác dụng vượt quá giá trị đó thì vật bắt đầu trượt.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Ma sát nghỉ cũng có ích',
          text: 'Khi ta bước đi, bàn chân đẩy mặt đất về phía sau. Lực ma sát nghỉ do mặt đất tác dụng lên chân hướng về phía trước và là lực phát động giúp ta đi được.',
        },
      ],
    },
    {
      heading: 'Lực ma sát trượt',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Lực ma sát trượt',
          text: 'Lực ma sát trượt xuất hiện ở mặt tiếp xúc khi vật trượt trên một bề mặt. Lực có điểm đặt tại mặt tiếp xúc, phương song song với mặt tiếp xúc và chiều ngược với chiều chuyển động tương đối của vật so với bề mặt.',
        },
        {
          type: 'p',
          text: 'Thí nghiệm kéo vật đều bằng lực kế cho thấy độ lớn của lực ma sát trượt:',
        },
        {
          type: 'list',
          items: [
            'phụ thuộc vào vật liệu và tình trạng của hai bề mặt tiếp xúc;',
            'tỉ lệ với độ lớn áp lực $N$ giữa hai bề mặt;',
            'không phụ thuộc vào diện tích tiếp xúc và tốc độ của vật.',
          ],
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Công thức',
          text: '$F_{mst} = \\mu N$, trong đó $\\mu$ là hệ số ma sát trượt (không có đơn vị), phụ thuộc vào vật liệu và tình trạng của hai mặt tiếp xúc; $N$ là độ lớn áp lực, tính bằng niutơn.',
        },
        {
          type: 'p',
          text: 'Trên mặt ngang, nếu các lực khác không có thành phần thẳng đứng thì $N = P = mg$. Thực nghiệm cho thấy $F_{mst}$ thường nhỏ hơn $F_{msn\\,max}$ một chút, nên giữ vật trượt đều dễ hơn làm vật bắt đầu trượt.',
        },
      ],
    },
    {
      heading: 'Lực ma sát trong đời sống',
      blocks: [
        {
          type: 'table',
          head: ['Ma sát có lợi', 'Ma sát có hại'],
          rows: [
            [
              'Giúp người và xe đi được trên đường, phanh được xe',
              'Làm mòn lốp xe, giày dép, chi tiết máy',
            ],
            [
              'Giữ đồ vật nằm yên, giúp ta cầm nắm được',
              'Cản trở chuyển động, tốn thêm năng lượng và sinh nhiệt',
            ],
          ],
        },
        {
          type: 'p',
          text: 'Muốn giảm ma sát có thể làm nhẵn bề mặt, tra dầu mỡ, thay vật liệu tiếp xúc, giảm áp lực, hoặc đổi ma sát trượt thành ma sát lăn bằng con lăn và ổ bi. Muốn tăng ma sát có thể làm nhám bề mặt, như tạo gai lốp xe hay xoa phấn vào tay trước khi nâng tạ.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'An toàn giao thông',
          text: 'Đường trơn do mưa làm $\\mu$ giảm, nên lực hãm giảm và quãng đường phanh dài ra. Lốp xe mòn cũng có tác dụng tương tự. Vì vậy cần giảm tốc độ và giữ khoảng cách khi trời mưa.',
        },
      ],
    },
  ],
  explore: {
    title: 'Kéo vật trên mặt sàn',
    instruction:
      'Tăng từ từ lực kéo và theo dõi đồ thị: đường thẳng đi lên là ma sát nghỉ, chỗ tụt xuống là lúc vật bắt đầu trượt. Sau đó giảm lực kéo về đúng $F_{mst}$, đổi mặt tiếp xúc rồi đổi cặp bề mặt. Hệ số ma sát trong hình là giá trị minh hoạ.',
  },
  examples: [
    {
      problem:
        'Một thùng gỗ khối lượng $20$ kg đặt trên sàn ngang, hệ số ma sát trượt $\\mu = 0{,}3$. Lấy $g = 9{,}8$ m/s². a) Tính lực đẩy ngang để thùng trượt thẳng đều. b) Nếu đẩy với lực $80$ N thì thùng có gia tốc bao nhiêu?',
      steps: [
        'Áp lực: $N = P = mg = 20 \\cdot 9{,}8 = 196$ N.',
        'Lực ma sát trượt: $F_{mst} = \\mu N = 0{,}3 \\cdot 196 = 58{,}8$ N.',
        'Thùng trượt đều nên hợp lực bằng $0$, lực đẩy $F = F_{mst} = 58{,}8$ N.',
        'Với $F = 80$ N: $a = \\dfrac{F - F_{mst}}{m} = \\dfrac{80 - 58{,}8}{20} = 1{,}06$ m/s².',
      ],
      answer: 'a) $58{,}8$ N. b) $1{,}06$ m/s².',
    },
    {
      problem:
        'Dùng lực kế kéo đều một khối gỗ $2{,}5$ kg trên mặt bàn ngang, lực kế chỉ $4{,}9$ N. Tính hệ số ma sát trượt. Lấy $g = 9{,}8$ m/s².',
      steps: [
        'Kéo đều nên lực kéo cân bằng lực ma sát trượt: $F_{mst} = 4{,}9$ N.',
        'Áp lực: $N = mg = 2{,}5 \\cdot 9{,}8 = 24{,}5$ N.',
        '$\\mu = \\dfrac{F_{mst}}{N} = \\dfrac{4{,}9}{24{,}5} = 0{,}2$.',
      ],
      answer: '$\\mu = 0{,}2$.',
    },
    {
      problem:
        'Một chiếc tủ có lực ma sát nghỉ cực đại với sàn là $120$ N. Một người đẩy tủ theo phương ngang với lực $80$ N. Tủ có chuyển động không? Lực ma sát tác dụng lên tủ bằng bao nhiêu?',
      steps: [
        'So sánh: $80$ N $< 120$ N nên lực đẩy chưa vượt quá lực ma sát nghỉ cực đại.',
        'Tủ đứng yên, lực ma sát nghỉ cân bằng với lực đẩy: $F_{msn} = 80$ N.',
      ],
      answer: 'Tủ đứng yên, lực ma sát nghỉ là $80$ N (không phải $120$ N).',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt:
        'Một vật trượt trên mặt phẳng với áp lực $N = 50$ N, hệ số ma sát trượt $\\mu = 0{,}4$. Tính lực ma sát trượt.',
      answer: 20,
      unit: 'N',
      hints: ['Áp dụng trực tiếp công thức của lực ma sát trượt.'],
      solution: '$F_{mst} = \\mu N = 0{,}4 \\cdot 50 = 20$ N.',
    },
    {
      type: 'number',
      prompt:
        'Một vật $10$ kg trượt trên sàn ngang, hệ số ma sát trượt $0{,}25$. Tính lực ma sát trượt. Lấy $g = 9{,}8$ m/s².',
      answer: 24.5,
      tolerance: 0.01,
      unit: 'N',
      hints: ['Trên sàn ngang, áp lực bằng trọng lượng của vật.'],
      solution: '$N = mg = 98$ N; $F_{mst} = 0{,}25 \\cdot 98 = 24{,}5$ N.',
    },
    {
      type: 'number',
      prompt:
        'Kéo đều một vật $5$ kg trên mặt ngang bằng lực kế nằm ngang, lực kế chỉ $14{,}7$ N. Tính hệ số ma sát trượt. Lấy $g = 9{,}8$ m/s².',
      answer: 0.3,
      tolerance: 0.005,
      hints: [
        'Kéo đều thì lực kéo cân bằng với lực nào?',
        'Lập tỉ số $\\mu = \\dfrac{F_{mst}}{N}$.',
      ],
      solution:
        '$F_{mst} = 14{,}7$ N, $N = 5 \\cdot 9{,}8 = 49$ N, nên $\\mu = \\dfrac{14{,}7}{49} = 0{,}3$.',
    },
    {
      type: 'number',
      prompt:
        'Một vật có lực ma sát nghỉ cực đại với sàn là $150$ N. Đẩy vật theo phương ngang với lực $90$ N. Tính độ lớn lực ma sát tác dụng lên vật.',
      answer: 90,
      unit: 'N',
      hints: ['Trước hết xét xem vật có trượt không.'],
      solution:
        '$90$ N $< 150$ N nên vật đứng yên và lực ma sát nghỉ cân bằng với lực đẩy: $F_{msn} = 90$ N.',
    },
    {
      type: 'number',
      prompt:
        'Đẩy một thùng $20$ kg trên sàn ngang bằng lực ngang $100$ N, hệ số ma sát trượt $0{,}4$. Tính gia tốc của thùng. Lấy $g = 9{,}8$ m/s².',
      answer: 1.08,
      tolerance: 0.01,
      unit: 'm/s²',
      hints: ['Tính $F_{mst}$ trước.', 'Hợp lực theo phương ngang là $F - F_{mst}$.'],
      solution:
        '$F_{mst} = 0{,}4 \\cdot 20 \\cdot 9{,}8 = 78{,}4$ N; $a = \\dfrac{100 - 78{,}4}{20} = 1{,}08$ m/s².',
    },
    {
      type: 'number',
      prompt:
        'Một ô tô đang chạy với tốc độ $10$ m/s thì phanh gấp, bánh xe trượt trên đường với hệ số ma sát trượt $0{,}5$. Tính quãng đường xe đi thêm được đến khi dừng. Lấy $g = 9{,}8$ m/s².',
      answer: 10.2,
      tolerance: 0.1,
      unit: 'm',
      hints: [
        'Lực ma sát là lực duy nhất làm xe chậm lại, nên độ lớn gia tốc là $\\mu g$: khối lượng bị giản ước.',
        'Dùng $v^2 - v_0^2 = 2as$ với $v = 0$.',
      ],
      solution:
        '$a = \\mu g = 4{,}9$ m/s² (xe chậm dần). $s = \\dfrac{v_0^2}{2a} = \\dfrac{100}{9{,}8} \\approx 10{,}2$ m.',
    },
    {
      type: 'choice',
      prompt:
        'Đặt một viên gạch trên bàn lần lượt bằng mặt rộng và mặt hẹp rồi kéo đều. So sánh lực ma sát trượt trong hai lần, biết hai mặt gạch như nhau.',
      options: [
        'Lần đặt mặt rộng lớn hơn.',
        'Lần đặt mặt hẹp lớn hơn.',
        'Bằng nhau.',
        'Không so sánh được.',
      ],
      answer: 2,
      hints: ['Áp lực và vật liệu có đổi không?'],
      solution:
        'Vật liệu, tình trạng bề mặt và áp lực không đổi nên $F_{mst} = \\mu N$ không đổi. Lực ma sát trượt không phụ thuộc vào diện tích tiếp xúc.',
    },
    {
      type: 'multi',
      prompt: 'Độ lớn lực ma sát trượt phụ thuộc vào những yếu tố nào?',
      options: [
        'Vật liệu của hai bề mặt tiếp xúc.',
        'Tình trạng của hai bề mặt tiếp xúc.',
        'Độ lớn áp lực.',
        'Diện tích tiếp xúc.',
        'Tốc độ của vật.',
      ],
      answers: [0, 1, 2],
      hints: ['Nghĩ tới hai đại lượng trong công thức $F_{mst} = \\mu N$.'],
      solution:
        'Hệ số $\\mu$ phụ thuộc vào vật liệu và tình trạng bề mặt, $N$ là áp lực. Diện tích tiếp xúc và tốc độ không ảnh hưởng.',
    },
    {
      type: 'choice',
      prompt:
        'Khi ta bước đi trên đường, lực nào do mặt đất tác dụng lên bàn chân và đẩy ta tiến về phía trước?',
      options: ['Lực ma sát trượt.', 'Lực ma sát nghỉ.', 'Trọng lực.', 'Áp lực của chân lên đất.'],
      answer: 1,
      hints: ['Bàn chân có trượt trên mặt đất không khi ta đi bình thường?'],
      solution:
        'Bàn chân không trượt trên đất, lực ma sát nghỉ hướng về phía trước là lực phát động.',
    },
    {
      type: 'multi',
      prompt: 'Cách nào làm giảm ma sát?',
      options: [
        'Tra dầu mỡ vào trục quay.',
        'Lắp ổ bi để đổi ma sát trượt thành ma sát lăn.',
        'Tạo gai trên lốp xe.',
        'Làm nhẵn hai bề mặt tiếp xúc.',
      ],
      answers: [0, 1, 3],
      hints: ['Gai lốp giúp xe bám đường tốt hơn hay kém hơn?'],
      solution:
        'Dầu mỡ, ổ bi và làm nhẵn bề mặt đều giảm ma sát. Gai lốp làm tăng ma sát để xe bám đường.',
    },
  ],
  takeaways: [
    'Lực ma sát nghỉ có độ lớn bằng lực tác dụng song song với mặt tiếp xúc, tăng đến cực đại $F_{msn\\,max}$ thì vật bắt đầu trượt.',
    'Lực ma sát trượt: $F_{mst} = \\mu N$, ngược chiều chuyển động tương đối, thường nhỏ hơn $F_{msn\\,max}$.',
    '$\\mu$ phụ thuộc vào vật liệu và tình trạng bề mặt; $F_{mst}$ không phụ thuộc vào diện tích tiếp xúc và tốc độ.',
    'Ma sát vừa có lợi vừa có hại: có thể làm tăng hoặc giảm tuỳ mục đích.',
  ],
};
