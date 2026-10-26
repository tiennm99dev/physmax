/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Lực tác dụng vào vật có giá không song song và không cắt trục quay thì có thể làm quay vật. Tác dụng làm quay của lực được đặc trưng bằng moment lực: lực càng lớn, giá của lực càng xa trục quay thì moment lực càng lớn; độ lớn M = F.d với d là cánh tay đòn.',
  intro:
    'Tay nắm cửa luôn được lắp ở mép cửa, xa bản lề. Thử đẩy cửa ở sát bản lề, em sẽ thấy cửa rất khó quay. Người thợ sửa xe muốn vặn một con ốc thật chặt thì nối thêm một đoạn ống vào cán cờ lê. Vì sao cùng một lực mà tác dụng làm quay lại khác nhau như vậy?',
  objectives: [
    'Nêu được điều kiện để lực tác dụng vào vật có thể làm vật quay quanh một trục.',
    'Nêu được tác dụng làm quay của lực được đặc trưng bằng moment lực; moment lực càng lớn khi lực càng lớn và giá của lực càng xa trục quay.',
    'Biết cánh tay đòn là khoảng cách từ trục quay tới giá của lực; tính được độ lớn moment lực $M = F \\cdot d$.',
    'Giải thích được một số hiện tượng thực tế: tay nắm cửa, cờ lê, bập bênh.',
  ],
  sections: [
    {
      heading: 'Lực có thể làm quay vật',
      blocks: [
        {
          type: 'p',
          text: 'Mở cửa, vặn vòi nước, dùng cờ lê vặn đai ốc, chơi bập bênh: trong mỗi trường hợp, lực làm vật quay quanh một trục cố định gọi là trục quay (bản lề cửa, trục vòi nước, tâm đai ốc, trục của bập bênh).',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Giá của lực',
          text: 'Giá của lực là đường thẳng chứa mũi tên biểu diễn lực, tức là đường thẳng đi qua điểm đặt và có phương của lực.',
        },
        {
          type: 'p',
          text: 'Thí nghiệm: một thanh cứng có thể quay quanh trục $O$ nằm ngang ở giữa thanh, trên thanh có các lỗ $A$ (bên trái) và $C$ (bên phải) cách $O$ như nhau. Treo một quả nặng vào $A$: thanh quay ngược chiều kim đồng hồ. Treo vào $C$: thanh quay cùng chiều kim đồng hồ. Treo quả nặng ngay tại $O$: giá của trọng lực cắt trục quay, thanh không quay.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Điều kiện lực làm quay vật',
          text: 'Khi lực tác dụng vào vật có giá không song song và không cắt trục quay thì có thể làm quay vật.',
        },
        {
          type: 'list',
          items: [
            'Đẩy cửa ở tay nắm, theo phương vuông góc với cánh cửa: cửa quay quanh bản lề.',
            'Đẩy hoặc kéo cửa theo phương đi qua bản lề (giá của lực cắt trục quay): cửa không quay.',
            'Ấn cánh cửa theo phương thẳng đứng, song song với trục bản lề: cửa không quay.',
          ],
        },
      ],
    },
    {
      heading: 'Moment lực',
      blocks: [
        {
          type: 'p',
          text: 'Thí nghiệm: treo hai quả nặng giống nhau vào $A$ và $C$ (cách đều $O$): thanh nằm cân bằng. Treo hai quả nặng vào $A$ và một quả vào $C$: đầu $A$ bị kéo xuống, vì lực ở $A$ lớn hơn. Treo một quả vào lỗ $B$ nằm giữa $A$ và $O$, một quả vào $C$: đầu $C$ bị kéo xuống, vì giá của lực ở $C$ xa trục quay hơn.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Moment lực',
          text: 'Tác dụng làm quay của lực lên một vật quanh một điểm hoặc một trục được đặc trưng bằng moment lực.',
        },
        {
          type: 'list',
          items: [
            'Lực càng lớn, moment lực càng lớn, tác dụng làm quay càng lớn.',
            'Giá của lực càng cách xa trục quay, moment lực càng lớn, tác dụng làm quay càng lớn.',
          ],
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Cánh tay đòn',
          text: 'Khoảng cách $d$ từ trục quay tới giá của lực gọi là cánh tay đòn của lực. Khi lực vuông góc với thanh (hay cánh cửa), cánh tay đòn bằng khoảng cách từ trục quay tới điểm đặt lực; khi lực xiên, cánh tay đòn ngắn hơn khoảng cách đó.',
        },
        {
          type: 'p',
          text: 'Độ lớn của moment lực bằng tích của độ lớn lực với cánh tay đòn:',
        },
        { type: 'tex', tex: 'M = F \\cdot d' },
        {
          type: 'list',
          items: [
            '$F$ là độ lớn của lực, đơn vị $\\text{N}$;',
            '$d$ là cánh tay đòn, đơn vị $\\text{m}$;',
            '$M$ là moment lực, đơn vị niutơn mét ($\\text{N} \\cdot \\text{m}$).',
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Có thể em chưa biết',
          text: 'Công thức $M = F \\cdot d$ sẽ được học kĩ hơn ở lớp 10. Ở lớp 8, em dùng nó để so sánh tác dụng làm quay của các lực: cùng một lực, cánh tay đòn gấp đôi thì moment gấp đôi; muốn giữ nguyên moment khi cánh tay đòn gấp đôi thì chỉ cần lực bằng một nửa.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Cánh tay đòn không phải lúc nào cũng là khoảng cách tới điểm đặt',
          text: 'Cánh tay đòn đo từ trục quay tới giá của lực (đường thẳng chứa lực), theo phương vuông góc với giá. Nếu giá của lực đi qua trục quay thì $d = 0$ và $M = 0$: lực không làm vật quay, dù lực lớn đến đâu.',
        },
      ],
    },
    {
      heading: 'Vận dụng trong đời sống',
      blocks: [
        {
          type: 'table',
          head: ['Tình huống', 'Cách làm', 'Giải thích'],
          rows: [
            [
              'Mở cửa',
              'Lắp tay nắm ở mép cửa, xa bản lề',
              'Cánh tay đòn lớn nên chỉ cần lực nhỏ đã đủ moment làm cửa quay',
            ],
            [
              'Vặn đai ốc quá chặt',
              'Nối thêm một đoạn ống vào cán cờ lê',
              'Tăng khoảng cách từ trục quay tới giá của lực, tăng moment lực',
            ],
            [
              'Bập bênh: bạn nhỏ muốn nâng người lớn',
              'Bạn nhỏ ngồi xa trục, người lớn ngồi gần trục',
              'Trọng lượng bạn nhỏ nhỏ hơn nhưng cánh tay đòn lớn hơn',
            ],
            [
              'Vô lăng ô tô, tay quay',
              'Làm vô lăng, tay quay có bán kính lớn',
              'Tay đặt xa trục quay, quay dễ hơn',
            ],
          ],
        },
      ],
    },
  ],
  explore: {
    title: 'Mở cửa ảo',
    instruction:
      'Nhìn cánh cửa từ trên xuống, bản lề ở $O$. Kéo chấm xanh để chọn điểm đặt lực, chọn độ lớn và hướng của lực, rồi bấm "Đẩy cửa". Cửa có lò xo đóng cửa nên cần moment ít nhất $4\\ \\text{N} \\cdot \\text{m}$ mới quay. Thử: đẩy theo phương đi qua bản lề; ấn thẳng đứng; đẩy vuông góc ở gần và ở xa bản lề. Thử thách: mở cửa với lực nhỏ nhất có thể.',
  },
  examples: [
    {
      problem:
        'Một bạn tác dụng lực vào cánh cửa theo ba cách: (a) đẩy ở tay nắm, theo phương vuông góc với cánh cửa; (b) kéo ở tay nắm, theo phương dọc cánh cửa, hướng ra xa bản lề; (c) ấn tay nắm thẳng đứng xuống dưới. Trường hợp nào cửa quay?',
      steps: [
        'Trục quay của cửa là trục bản lề, có phương thẳng đứng.',
        '(a) Giá của lực nằm ngang, vuông góc với cánh cửa: không song song và không cắt trục bản lề, nên cửa quay.',
        '(b) Giá của lực nằm dọc cánh cửa nên đi qua bản lề, tức là cắt trục quay: cửa không quay.',
        '(c) Giá của lực thẳng đứng, song song với trục bản lề: cửa không quay.',
      ],
      answer: 'Chỉ trường hợp (a) làm cửa quay.',
    },
    {
      problem:
        'Một người thợ dùng cờ lê dài $20\\ \\text{cm}$ vặn đai ốc, tác dụng lực $50\\ \\text{N}$ ở đầu cán, vuông góc với cán. (a) Tính moment lực. (b) Người thợ nối thêm một đoạn ống để tay đặt cách tâm đai ốc $40\\ \\text{cm}$. Muốn có cùng moment lực thì phải tác dụng lực bao nhiêu?',
      steps: [
        'Lực vuông góc với cán nên cánh tay đòn bằng khoảng cách từ tâm đai ốc tới tay: $d_1 = 20\\ \\text{cm} = 0{,}2\\ \\text{m}$.',
        '(a) $M = F_1 \\cdot d_1 = 50 \\cdot 0{,}2 = 10\\ \\text{N} \\cdot \\text{m}$.',
        '(b) $d_2 = 0{,}4\\ \\text{m}$. Từ $M = F_2 \\cdot d_2$ suy ra $F_2 = \\dfrac{M}{d_2} = \\dfrac{10}{0{,}4} = 25\\ \\text{N}$.',
      ],
      answer:
        '(a) $M = 10\\ \\text{N} \\cdot \\text{m}$; (b) chỉ cần $25\\ \\text{N}$, bằng một nửa lực lúc đầu.',
    },
    {
      problem:
        'Hai lực tác dụng lên cùng một cánh cửa: lực $F_1 = 20\\ \\text{N}$ có cánh tay đòn $d_1 = 0{,}3\\ \\text{m}$; lực $F_2 = 10\\ \\text{N}$ có cánh tay đòn $d_2 = 0{,}5\\ \\text{m}$. Lực nào có tác dụng làm quay lớn hơn?',
      steps: [
        '$M_1 = F_1 \\cdot d_1 = 20 \\cdot 0{,}3 = 6\\ \\text{N} \\cdot \\text{m}$.',
        '$M_2 = F_2 \\cdot d_2 = 10 \\cdot 0{,}5 = 5\\ \\text{N} \\cdot \\text{m}$.',
        '$M_1 > M_2$: lực $F_1$ có moment lớn hơn.',
      ],
      answer:
        'Lực $F_1$ có tác dụng làm quay lớn hơn, dù cánh tay đòn của nó ngắn hơn: phải so sánh tích $F \\cdot d$, không chỉ riêng $F$ hay $d$.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt:
        'Lực tác dụng vào vật phải thỏa mãn điều kiện nào thì có thể làm vật quay quanh một trục?',
      options: [
        'Chỉ cần vật có trục quay.',
        'Lực có giá đi qua trục quay.',
        'Lực có giá song song với trục quay.',
        'Lực có giá không song song và không cắt trục quay.',
      ],
      answer: 3,
      hints: [
        'Thử nghĩ: đẩy cửa theo phương đi qua bản lề, hoặc ấn thẳng đứng, cửa có quay không?',
      ],
      solution:
        'Lực tác dụng vào vật có giá không song song và không cắt trục quay thì có thể làm quay vật. Giá đi qua (cắt) trục hoặc song song với trục đều không làm vật quay.',
    },
    {
      type: 'choice',
      prompt: 'Moment lực là đại lượng đặc trưng cho',
      options: [
        'tác dụng kéo của lực',
        'tác dụng làm quay của lực',
        'tác dụng nén của lực',
        'độ lớn của lực',
      ],
      answer: 1,
      hints: ['Bài học này nói về tác dụng nào của lực?'],
      solution:
        'Tác dụng làm quay của lực lên một vật quanh một điểm hoặc một trục được đặc trưng bằng moment lực.',
    },
    {
      type: 'text',
      prompt: 'Khoảng cách từ trục quay tới giá của lực gọi là gì?',
      accept: ['cánh tay đòn', 'cánh tay đòn của lực'],
      hints: ['Tên gọi này có chữ "đòn", giống trong "đòn bẩy".'],
      solution: 'Khoảng cách từ trục quay tới giá của lực gọi là cánh tay đòn, kí hiệu $d$.',
    },
    {
      type: 'number',
      prompt:
        'Một lực $40\\ \\text{N}$ tác dụng lên cán cờ lê, vuông góc với cán, tại điểm cách tâm đai ốc $0{,}25\\ \\text{m}$. Tính moment của lực đối với tâm đai ốc.',
      answer: 10,
      unit: 'N·m',
      hints: [
        'Lực vuông góc với cán nên cánh tay đòn là $0{,}25\\ \\text{m}$.',
        'Dùng $M = F \\cdot d$.',
      ],
      solution: '$M = F \\cdot d = 40 \\cdot 0{,}25 = 10\\ \\text{N} \\cdot \\text{m}$.',
    },
    {
      type: 'number',
      prompt:
        'Muốn tạo moment lực $12\\ \\text{N} \\cdot \\text{m}$ bằng một lực $30\\ \\text{N}$ thì cánh tay đòn của lực phải bằng bao nhiêu mét?',
      answer: 0.4,
      unit: 'm',
      hints: ['Từ $M = F \\cdot d$ suy ra $d = \\dfrac{M}{F}$.'],
      solution: '$d = \\dfrac{M}{F} = \\dfrac{12}{30} = 0{,}4\\ \\text{m}$.',
    },
    {
      type: 'number',
      prompt:
        'Dùng cờ lê có cán dài $0{,}2\\ \\text{m}$ thì phải tác dụng lực $60\\ \\text{N}$ (vuông góc với cán, ở đầu cán) mới vặn được một đai ốc. Nối thêm ống để tay đặt cách tâm đai ốc $0{,}5\\ \\text{m}$ thì chỉ cần lực bao nhiêu niutơn?',
      answer: 24,
      unit: 'N',
      hints: [
        'Tính moment cần thiết để vặn đai ốc với cờ lê lúc đầu.',
        'Moment cần thiết không đổi; chia moment đó cho cánh tay đòn mới.',
      ],
      solution:
        'Moment cần thiết: $M = 60 \\cdot 0{,}2 = 12\\ \\text{N} \\cdot \\text{m}$. Với cánh tay đòn $0{,}5\\ \\text{m}$: $F = \\dfrac{12}{0{,}5} = 24\\ \\text{N}$.',
    },
    {
      type: 'choice',
      prompt: 'Lực nào sau đây có tác dụng làm quay lớn nhất?',
      options: [
        '$F = 20\\ \\text{N}$, cánh tay đòn $0{,}3\\ \\text{m}$',
        '$F = 10\\ \\text{N}$, cánh tay đòn $0{,}5\\ \\text{m}$',
        '$F = 30\\ \\text{N}$, cánh tay đòn $0{,}1\\ \\text{m}$',
        '$F = 15\\ \\text{N}$, cánh tay đòn $0{,}2\\ \\text{m}$',
      ],
      answer: 0,
      hints: ['Tính tích $F \\cdot d$ cho từng lực rồi so sánh.'],
      solution:
        'Các moment lần lượt là $6$; $5$; $3$; $3\\ \\text{N} \\cdot \\text{m}$. Lực $20\\ \\text{N}$ với cánh tay đòn $0{,}3\\ \\text{m}$ có moment lớn nhất.',
    },
    {
      type: 'multi',
      prompt: 'Trường hợp nào sau đây lực làm vật quay?',
      options: [
        'Đẩy tay nắm cửa theo phương vuông góc với cánh cửa',
        'Kéo cánh cửa theo phương dọc cánh cửa, đi qua bản lề',
        'Dùng tay vặn nắp chai nước',
        'Ấn cánh cửa thẳng đứng xuống dưới, song song với trục bản lề',
        'Dùng cờ lê vặn đai ốc',
      ],
      answers: [0, 2, 4],
      hints: ['Với mỗi trường hợp, giá của lực có cắt hoặc song song với trục quay không?'],
      solution:
        'Đẩy cửa vuông góc, vặn nắp chai, vặn đai ốc bằng cờ lê: giá của lực không song song và không cắt trục quay nên vật quay. Lực dọc cánh cửa có giá cắt trục bản lề; lực ấn thẳng đứng có giá song song với trục bản lề: cửa không quay.',
    },
    {
      type: 'choice',
      prompt:
        'Trên bập bênh, người lớn ở đầu bên trái đang "nâng bổng" bạn nhỏ ở đầu bên phải. Muốn bạn nhỏ nâng được người lớn thì phải làm thế nào?',
      options: [
        'Bạn nhỏ ngồi gần trục quay, người lớn ngồi xa trục quay',
        'Bạn nhỏ ngồi xa trục quay, người lớn ngồi gần trục quay',
        'Cả hai cùng ngồi sát trục quay',
        'Không có cách nào vì người lớn nặng hơn',
      ],
      answer: 1,
      hints: ['Trọng lượng bạn nhỏ nhỏ hơn; muốn moment lớn hơn thì phải tăng gì?'],
      solution:
        'Lực càng xa trục quay thì moment càng lớn. Bạn nhỏ ngồi xa trục để tăng cánh tay đòn, người lớn ngồi gần trục để giảm cánh tay đòn; khi moment do bạn nhỏ lớn hơn, bạn nhỏ nâng được người lớn.',
    },
    {
      type: 'choice',
      prompt: 'Vì sao tay nắm cửa thường được lắp ở mép cửa, xa bản lề?',
      options: [
        'Để cửa đẹp hơn',
        'Để giá của lực đi qua trục quay',
        'Để cánh tay đòn lớn, chỉ cần lực nhỏ cũng tạo được moment đủ làm cửa quay',
        'Để lực tác dụng lên cửa lớn hơn',
      ],
      answer: 2,
      hints: ['Moment lực phụ thuộc lực và khoảng cách từ trục quay tới giá của lực.'],
      solution:
        'Tay nắm xa bản lề làm cánh tay đòn lớn; theo $M = F \\cdot d$, chỉ cần lực nhỏ là đã đủ moment để cửa quay.',
    },
  ],
  takeaways: [
    'Lực tác dụng vào vật có giá không song song và không cắt trục quay thì có thể làm quay vật.',
    'Tác dụng làm quay của lực được đặc trưng bằng moment lực.',
    'Lực càng lớn và giá của lực càng xa trục quay thì moment lực càng lớn.',
    'Cánh tay đòn $d$ là khoảng cách từ trục quay tới giá của lực; $M = F \\cdot d$, đơn vị $\\text{N} \\cdot \\text{m}$.',
  ],
};
