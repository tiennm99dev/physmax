/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Vật nhúng trong chất lỏng bị chất lỏng đẩy thẳng đứng từ dưới lên bằng lực đẩy Archimedes, có độ lớn bằng trọng lượng phần chất lỏng bị vật chiếm chỗ, F_A = d.V; vật chìm khi P > F_A, lơ lửng khi P = F_A, nổi lên khi P < F_A.',
  intro:
    'Một con tàu bằng thép nặng hàng nghìn tấn nổi trên mặt biển, trong khi một chiếc đinh sắt nhỏ thả xuống nước thì chìm ngay. Xách một xô nước từ dưới giếng lên, ta thấy xô nhẹ hơn khi còn ở trong nước. Chất lỏng đã tác dụng lên vật một lực như thế nào?',
  objectives: [
    'Nêu được khi một vật ở trong chất lỏng thì chịu tác dụng của lực đẩy hướng thẳng đứng từ dưới lên.',
    'Nêu được độ lớn của lực đẩy Archimedes bằng trọng lượng phần chất lỏng bị vật chiếm chỗ; vận dụng được $F_A = d \\cdot V$.',
    'Nêu được điều kiện vật nổi, vật chìm, vật lơ lửng và giải thích được một số hiện tượng trong đời sống.',
  ],
  sections: [
    {
      heading: 'Lực đẩy của chất lỏng',
      blocks: [
        {
          type: 'p',
          text: 'Thí nghiệm: treo một vật nặng vào lực kế, lực kế chỉ $P$ (trọng lượng của vật). Nhúng vật chìm trong nước, lực kế chỉ $P_1 < P$. Số chỉ giảm chứng tỏ nước đã tác dụng lên vật một lực hướng lên, đỡ một phần trọng lượng của vật.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Lực đẩy Archimedes',
          text: 'Một vật nhúng trong chất lỏng bị chất lỏng tác dụng một lực đẩy có phương thẳng đứng, chiều từ dưới lên. Lực này gọi là lực đẩy Archimedes, kí hiệu $F_A$.',
        },
        { type: 'tex', tex: 'F_A = P - P_1' },
        {
          type: 'p',
          text: 'Không chỉ chất lỏng: chất khí cũng tác dụng lực đẩy Archimedes lên các vật ở trong nó, vì thế khinh khí cầu, bóng bay bơm khí heli bay lên được.',
        },
      ],
    },
    {
      heading: 'Độ lớn của lực đẩy Archimedes',
      blocks: [
        {
          type: 'p',
          text: 'Thí nghiệm với bình tràn: đổ nước đầy tới miệng vòi của bình tràn. Nhúng vật treo trên lực kế vào bình, nước bị vật chiếm chỗ tràn ra cốc hứng. Đem cân phần nước tràn ra thì thấy trọng lượng của nó đúng bằng $P - P_1$, tức bằng lực đẩy lên vật.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Định luật Archimedes',
          text: 'Độ lớn của lực đẩy Archimedes bằng trọng lượng của phần chất lỏng bị vật chiếm chỗ.',
        },
        { type: 'tex', tex: 'F_A = d \\cdot V' },
        {
          type: 'list',
          items: [
            '$F_A$ là lực đẩy Archimedes, đơn vị $\\text{N}$;',
            '$d$ là trọng lượng riêng của chất lỏng, đơn vị $\\text{N/m}^3$, với $d = 10D$ ($D$ là khối lượng riêng, $\\text{kg/m}^3$);',
            '$V$ là thể tích phần chất lỏng bị vật chiếm chỗ (thể tích phần chìm của vật), đơn vị $\\text{m}^3$.',
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Lực đẩy phụ thuộc vào gì?',
          text: '$F_A$ chỉ phụ thuộc trọng lượng riêng của chất lỏng và thể tích phần chìm. Vật đã chìm hẳn thì đưa sâu thêm $F_A$ không đổi. Hai vật cùng thể tích, một bằng sắt, một bằng nhôm, chìm hẳn trong nước chịu lực đẩy bằng nhau.',
        },
      ],
    },
    {
      heading: 'Điều kiện vật nổi, vật chìm',
      blocks: [
        {
          type: 'p',
          text: 'Một vật ở trong lòng chất lỏng chịu hai lực: trọng lượng $P$ hướng xuống và lực đẩy Archimedes $F_A$ hướng lên (lúc vật chìm hẳn).',
        },
        {
          type: 'table',
          head: ['So sánh', 'Vật', 'So sánh khối lượng riêng (vật đặc)'],
          rows: [
            ['$P > F_A$', 'chìm xuống đáy', '$D_{\\text{vật}} > D_{\\text{lỏng}}$'],
            ['$P = F_A$', 'lơ lửng trong chất lỏng', '$D_{\\text{vật}} = D_{\\text{lỏng}}$'],
            ['$P < F_A$', 'nổi lên mặt chất lỏng', '$D_{\\text{vật}} < D_{\\text{lỏng}}$'],
          ],
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Vật nổi trên mặt chất lỏng',
          text: 'Khi vật nổi lên rồi đứng yên trên mặt chất lỏng, chỉ một phần vật chìm, và lực đẩy Archimedes lúc đó bằng trọng lượng của vật: $F_A = d \\cdot V_{\\text{chìm}} = P$.',
        },
        {
          type: 'p',
          text: 'Con tàu bằng thép nổi được vì nó rỗng: phần vỏ tàu chiếm chỗ một thể tích nước rất lớn, nên lực đẩy đủ lớn để cân bằng trọng lượng tàu. Tàu ngầm bơm nước vào hay đẩy nước ra khỏi khoang để làm trọng lượng lớn hơn hay nhỏ hơn lực đẩy, nhờ đó lặn xuống hay nổi lên.',
        },
      ],
    },
  ],
  explore: {
    title: 'Lực kế và bình tràn',
    instruction:
      'Chọn vật và chất lỏng. Kéo vật (hoặc chọn nó rồi bấm phím mũi tên lên, xuống) để nhúng dần vào bình tràn: theo dõi số chỉ lực kế, lực đẩy $F_A$ và lượng chất lỏng tràn ra. Khi vật đã chìm hẳn, nhúng sâu thêm thì $F_A$ có đổi không? Bấm "Thả vật khỏi lực kế" để xem vật chìm, lơ lửng hay nổi; thử khối gỗ trong dầu hỏa và khối sắt trong thủy ngân.',
  },
  examples: [
    {
      problem:
        'Một vật có thể tích $0{,}002\\ \\text{m}^3$ được nhúng chìm hoàn toàn trong nước. Tính lực đẩy Archimedes tác dụng lên vật, biết trọng lượng riêng của nước là $10\\,000\\ \\text{N/m}^3$.',
      steps: [
        'Vật chìm hoàn toàn nên thể tích chất lỏng bị chiếm chỗ bằng thể tích vật: $V = 0{,}002\\ \\text{m}^3$.',
        '$F_A = d \\cdot V = 10\\,000 \\cdot 0{,}002 = 20\\ \\text{N}$.',
      ],
      answer: 'Lực đẩy Archimedes là $20\\ \\text{N}$.',
    },
    {
      problem:
        'Treo một vật vào lực kế, ngoài không khí lực kế chỉ $4{,}8\\ \\text{N}$; nhúng chìm vật trong nước, lực kế chỉ $3{,}6\\ \\text{N}$. Tính lực đẩy Archimedes, thể tích của vật và khối lượng riêng của chất làm vật. Biết $d_{\\text{nước}} = 10\\,000\\ \\text{N/m}^3$.',
      steps: [
        '$F_A = P - P_1 = 4{,}8 - 3{,}6 = 1{,}2\\ \\text{N}$.',
        'Vật chìm hẳn nên $V = \\dfrac{F_A}{d} = \\dfrac{1{,}2}{10\\,000} = 0{,}000\\,12\\ \\text{m}^3 = 120\\ \\text{cm}^3$.',
        'Khối lượng của vật: $m = \\dfrac{P}{10} = 0{,}48\\ \\text{kg}$.',
        '$D = \\dfrac{m}{V} = \\dfrac{0{,}48}{0{,}000\\,12} = 4000\\ \\text{kg/m}^3$.',
      ],
      answer: '$F_A = 1{,}2\\ \\text{N}$, $V = 120\\ \\text{cm}^3$, $D = 4000\\ \\text{kg/m}^3$.',
    },
    {
      problem:
        'Thả một khối gỗ đặc có thể tích $0{,}005\\ \\text{m}^3$ và khối lượng riêng $800\\ \\text{kg/m}^3$ vào nước. Khối gỗ nổi hay chìm? Khi đứng yên, thể tích phần chìm là bao nhiêu?',
      steps: [
        'Trọng lượng khối gỗ: $P = 10 \\cdot D \\cdot V = 10 \\cdot 800 \\cdot 0{,}005 = 40\\ \\text{N}$.',
        'Nếu chìm hẳn, lực đẩy là $F_A = 10\\,000 \\cdot 0{,}005 = 50\\ \\text{N} > P$, nên khối gỗ nổi lên.',
        'Khi nổi đứng yên: $F_A = P$, tức $10\\,000 \\cdot V_{\\text{chìm}} = 40$, suy ra $V_{\\text{chìm}} = 0{,}004\\ \\text{m}^3$.',
      ],
      answer:
        'Khối gỗ nổi; phần chìm có thể tích $0{,}004\\ \\text{m}^3$ (bằng $80\\%$ thể tích khối gỗ).',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Lực đẩy Archimedes tác dụng lên vật nhúng trong chất lỏng có',
      options: [
        'phương thẳng đứng, chiều từ trên xuống',
        'phương thẳng đứng, chiều từ dưới lên',
        'phương nằm ngang',
        'phương và chiều tùy theo hình dạng vật',
      ],
      answer: 1,
      hints: ['Vì sao lực kế chỉ ít đi khi nhúng vật vào nước?'],
      solution:
        'Lực đẩy Archimedes có phương thẳng đứng, chiều từ dưới lên, nên nó đỡ bớt một phần trọng lượng của vật.',
    },
    {
      type: 'number',
      prompt:
        'Một vật có thể tích $0{,}0005\\ \\text{m}^3$ nhúng chìm hoàn toàn trong nước ($d = 10\\,000\\ \\text{N/m}^3$). Tính lực đẩy Archimedes lên vật.',
      answer: 5,
      unit: 'N',
      hints: ['$F_A = d \\cdot V$.'],
      solution: '$F_A = 10\\,000 \\cdot 0{,}0005 = 5\\ \\text{N}$.',
    },
    {
      type: 'number',
      prompt:
        'Một vật treo vào lực kế, ngoài không khí lực kế chỉ $2{,}7\\ \\text{N}$, nhúng chìm vào nước lực kế chỉ $1{,}7\\ \\text{N}$. Lực đẩy Archimedes lên vật bằng bao nhiêu?',
      answer: 1,
      unit: 'N',
      hints: ['Lực đẩy bằng phần số chỉ lực kế bị giảm đi.'],
      solution: '$F_A = P - P_1 = 2{,}7 - 1{,}7 = 1\\ \\text{N}$.',
    },
    {
      type: 'number',
      prompt:
        'Với vật ở câu trên ($F_A = 1\\ \\text{N}$ khi chìm hẳn trong nước, $d = 10\\,000\\ \\text{N/m}^3$), thể tích của vật là bao nhiêu centimét khối?',
      answer: 100,
      unit: 'cm³',
      hints: [
        '$V = \\dfrac{F_A}{d}$ cho kết quả theo $\\text{m}^3$.',
        '$1\\ \\text{m}^3 = 1\\,000\\,000\\ \\text{cm}^3$.',
      ],
      solution: '$V = \\dfrac{1}{10\\,000} = 0{,}0001\\ \\text{m}^3 = 100\\ \\text{cm}^3$.',
    },
    {
      type: 'number',
      prompt:
        'Một vật thể tích $200\\ \\text{cm}^3$ nhúng chìm hoàn toàn trong dầu hỏa có trọng lượng riêng $8000\\ \\text{N/m}^3$. Tính lực đẩy Archimedes.',
      answer: 1.6,
      unit: 'N',
      hints: ['Đổi $200\\ \\text{cm}^3$ ra $\\text{m}^3$.'],
      solution:
        '$V = 200\\ \\text{cm}^3 = 0{,}0002\\ \\text{m}^3$; $F_A = 8000 \\cdot 0{,}0002 = 1{,}6\\ \\text{N}$.',
    },
    {
      type: 'choice',
      prompt: 'Độ lớn của lực đẩy Archimedes phụ thuộc vào',
      options: [
        'khối lượng của vật và độ sâu của vật',
        'trọng lượng riêng của chất lỏng và thể tích phần chất lỏng bị vật chiếm chỗ',
        'chất làm vật và hình dạng của vật',
        'trọng lượng riêng của chất làm vật',
      ],
      answer: 1,
      hints: ['Nhìn vào công thức $F_A = d \\cdot V$: $d$ và $V$ là của cái gì?'],
      solution:
        '$F_A = d \\cdot V$, với $d$ là trọng lượng riêng của chất lỏng và $V$ là thể tích phần chất lỏng bị vật chiếm chỗ. Lực đẩy không phụ thuộc chất làm vật hay độ sâu (khi vật đã chìm hẳn).',
    },
    {
      type: 'choice',
      prompt:
        'Một vật đặc có trọng lượng $5\\ \\text{N}$; khi chìm hoàn toàn trong nước, lực đẩy lên nó là $3\\ \\text{N}$. Thả vật vào nước thì vật',
      options: ['nổi lên', 'lơ lửng', 'chìm xuống đáy', 'lúc nổi lúc chìm'],
      answer: 2,
      hints: ['So sánh $P$ và $F_A$ khi vật chìm hẳn.'],
      solution: '$P = 5\\ \\text{N} > F_A = 3\\ \\text{N}$ nên vật chìm xuống đáy.',
    },
    {
      type: 'multi',
      prompt: 'Thả các vật đặc sau vào nước ($D = 1000\\ \\text{kg/m}^3$). Những vật nào nổi?',
      options: [
        'Khối gỗ tốt ($800\\ \\text{kg/m}^3$)',
        'Viên bi sắt ($7800\\ \\text{kg/m}^3$)',
        'Cục nước đá ($900\\ \\text{kg/m}^3$)',
        'Thỏi nhôm ($2700\\ \\text{kg/m}^3$)',
      ],
      answers: [0, 2],
      hints: ['Vật đặc nổi khi khối lượng riêng của nó nhỏ hơn của chất lỏng.'],
      solution:
        'Gỗ ($800$) và nước đá ($900$) có khối lượng riêng nhỏ hơn nước ($1000$) nên nổi; sắt và nhôm có khối lượng riêng lớn hơn nước nên chìm.',
    },
    {
      type: 'choice',
      prompt: 'Thả một viên bi sắt vào chậu thủy ngân thì viên bi',
      options: [
        'chìm xuống đáy vì sắt là kim loại nặng',
        'nổi lên vì khối lượng riêng của sắt nhỏ hơn của thủy ngân',
        'lơ lửng giữa chậu',
        'tan vào thủy ngân',
      ],
      answer: 1,
      hints: ['Tra bảng: khối lượng riêng của sắt và của thủy ngân.'],
      solution:
        'Sắt có $D = 7800\\ \\text{kg/m}^3$, nhỏ hơn thủy ngân ($13\\,600\\ \\text{kg/m}^3$), nên lực đẩy khi bi chìm hẳn lớn hơn trọng lượng bi: bi nổi lên.',
    },
    {
      type: 'number',
      prompt:
        'Một khối gỗ có trọng lượng $6\\ \\text{N}$ nổi đứng yên trên mặt nước ($d = 10\\,000\\ \\text{N/m}^3$). Thể tích phần chìm của khối gỗ là bao nhiêu centimét khối?',
      answer: 600,
      unit: 'cm³',
      hints: [
        'Vật nổi đứng yên: $F_A = P$.',
        '$V_{\\text{chìm}} = \\dfrac{F_A}{d}$, rồi đổi ra $\\text{cm}^3$.',
      ],
      solution:
        '$F_A = P = 6\\ \\text{N}$; $V_{\\text{chìm}} = \\dfrac{6}{10\\,000} = 0{,}0006\\ \\text{m}^3 = 600\\ \\text{cm}^3$.',
    },
  ],
  takeaways: [
    'Vật nhúng trong chất lỏng chịu lực đẩy Archimedes thẳng đứng, từ dưới lên: $F_A = P - P_1$.',
    'Độ lớn lực đẩy bằng trọng lượng phần chất lỏng bị vật chiếm chỗ: $F_A = d \\cdot V$, với $d = 10D$ của chất lỏng.',
    'Thả vật: $P > F_A$ thì chìm, $P = F_A$ thì lơ lửng, $P < F_A$ thì nổi lên (vật đặc: so sánh $D_{\\text{vật}}$ với $D_{\\text{lỏng}}$).',
    'Vật nổi đứng yên trên mặt chất lỏng: $F_A = P$.',
  ],
};
