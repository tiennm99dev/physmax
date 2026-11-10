/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Hai nguồn kết hợp (cùng tần số, cùng phương, hiệu số pha không đổi theo thời gian) tạo ra hiện tượng giao thoa: những điểm có hiệu đường đi d2 − d1 = kλ dao động với biên độ cực đại, những điểm có d2 − d1 = (k + 1/2)λ đứng yên. Giao thoa ánh sáng qua hai khe Young cho các vân sáng, vân tối xen kẽ cách đều nhau một khoảng vân i = λD/a.',
  intro:
    'Thả đồng thời hai hòn sỏi xuống mặt hồ, hai hệ gợn tròn lan ra và chồng lên nhau. Có chỗ mặt nước nhô lên rất cao, có chỗ lại phẳng lặng một cách lạ lùng dù sóng từ cả hai phía cùng đi tới. Hiện tượng đó gọi là giao thoa, và ánh sáng cũng làm được như vậy.',
  objectives: [
    'Mô tả được thí nghiệm giao thoa sóng nước với hai nguồn kết hợp.',
    'Nêu được điều kiện để có giao thoa: hai nguồn kết hợp.',
    'Viết và vận dụng được điều kiện cực đại $d_2 - d_1 = k\\lambda$ và cực tiểu $d_2 - d_1 = \\left(k + \\dfrac{1}{2}\\right)\\lambda$ với hai nguồn cùng pha.',
    'Mô tả được thí nghiệm giao thoa ánh sáng qua hai khe Young và vận dụng được $i = \\dfrac{\\lambda D}{a}$, $x_k = ki$.',
  ],
  sections: [
    {
      heading: 'Thí nghiệm giao thoa sóng nước',
      blocks: [
        {
          type: 'p',
          text: 'Gắn vào cần rung hai mũi nhọn $S_1$, $S_2$ chạm nhẹ vào mặt nước. Khi cần rung dao động, $S_1$ và $S_2$ dao động cùng tần số, cùng pha và là hai nguồn phát sóng. Trên mặt nước, trong vùng hai sóng gặp nhau, xuất hiện những gợn lồi dao động rất mạnh xen kẽ với những đường gần như đứng yên; các đường đó có dạng hypebol, nhận $S_1$, $S_2$ làm tiêu điểm. Đường trung trực của $S_1S_2$ là một gợn lồi.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Giao thoa sóng',
          text: 'Giao thoa là hiện tượng hai sóng kết hợp gặp nhau, tạo nên các vùng mà sóng luôn tăng cường lẫn nhau (cực đại) xen kẽ với các vùng sóng luôn triệt tiêu lẫn nhau (cực tiểu).',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Điều kiện giao thoa',
          text: 'Hai sóng giao thoa được với nhau khi chúng là hai sóng kết hợp, phát ra từ hai nguồn kết hợp: hai nguồn dao động cùng phương, cùng tần số và có hiệu số pha không đổi theo thời gian.',
        },
      ],
    },
    {
      heading: 'Vị trí cực đại và cực tiểu giao thoa',
      blocks: [
        {
          type: 'p',
          text: 'Xét điểm $M$ cách hai nguồn cùng pha những đoạn $d_1 = S_1M$ và $d_2 = S_2M$. Sóng từ hai nguồn tới $M$ lệch pha nhau $\\Delta\\varphi = \\dfrac{2\\pi(d_2 - d_1)}{\\lambda}$; hiệu $d_2 - d_1$ gọi là hiệu đường đi.',
        },
        {
          type: 'list',
          items: [
            'Hai sóng tới $M$ cùng pha, tăng cường nhau, $M$ dao động với biên độ cực đại khi $d_2 - d_1 = k\\lambda$ ($k = 0, \\pm 1, \\pm 2, \\ldots$).',
            'Hai sóng tới $M$ ngược pha, triệt tiêu nhau, $M$ đứng yên (biên độ cực tiểu) khi $d_2 - d_1 = \\left(k + \\dfrac{1}{2}\\right)\\lambda$ ($k = 0, \\pm 1, \\pm 2, \\ldots$).',
          ],
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Hai nguồn cùng pha',
          text: 'Cực đại: $d_2 - d_1 = k\\lambda$. Cực tiểu: $d_2 - d_1 = \\left(k + \\dfrac{1}{2}\\right)\\lambda$. Trên đoạn $S_1S_2$, hai cực đại (hoặc hai cực tiểu) liên tiếp cách nhau $\\dfrac{\\lambda}{2}$.',
        },
        {
          type: 'p',
          text: 'Số cực đại trên đoạn $S_1S_2$ (không kể hai nguồn) là số giá trị nguyên của $k$ thoả mãn $-\\dfrac{S_1S_2}{\\lambda} < k < \\dfrac{S_1S_2}{\\lambda}$.',
        },
      ],
    },
    {
      heading: 'Giao thoa ánh sáng: thí nghiệm Young',
      blocks: [
        {
          type: 'p',
          text: 'Chiếu ánh sáng đơn sắc từ một khe hẹp $F$ tới hai khe hẹp $F_1$, $F_2$ song song, rất gần nhau (cách nhau $a$). Hai khe này trở thành hai nguồn sáng kết hợp. Trên màn đặt cách hai khe một khoảng $D$ (với $D \\gg a$) ta quan sát được các vạch sáng và tối xen kẽ, cách đều nhau: đó là các vân giao thoa. Thí nghiệm của Young chứng tỏ ánh sáng có tính chất sóng.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Vị trí vân và khoảng vân',
          text: 'Vân sáng: $x_k = k\\dfrac{\\lambda D}{a}$. Vân tối: $x = \\left(k + \\dfrac{1}{2}\\right)\\dfrac{\\lambda D}{a}$. Khoảng vân (khoảng cách giữa hai vân sáng hoặc hai vân tối liên tiếp): $i = \\dfrac{\\lambda D}{a}$.',
        },
        { type: 'widget', name: 'young' },
        {
          type: 'callout',
          tone: 'note',
          title: 'Đổi đơn vị cho nhanh',
          text: 'Nếu $\\lambda$ tính bằng µm, $D$ bằng m và $a$ bằng mm thì $i = \\dfrac{\\lambda D}{a}$ tính ra mm. Giữa $n$ vân sáng liên tiếp có $n - 1$ khoảng vân.',
        },
      ],
    },
  ],
  explore: {
    title: 'Mặt nước với hai nguồn',
    instruction:
      'Ở chế độ Biên độ dao động, vùng đậm dao động mạnh, các đường nhạt gần như đứng yên. Kéo điểm $M$ và đọc $d_1$, $d_2$, $d_2 - d_1$ theo $\\lambda$ để thấy khi nào $M$ là cực đại hay cực tiểu; làm lần lượt các nhiệm vụ. Đổi khoảng cách $S_1S_2$ và tần số để xem số vân thay đổi thế nào, rồi bấm Cho nước dao động để thấy mặt nước thật sự.',
  },
  examples: [
    {
      problem:
        'Hai nguồn kết hợp cùng pha $S_1$, $S_2$ dao động với tần số $20$ Hz trên mặt nước, tốc độ truyền sóng $40$ cm/s. Điểm $M$ cách hai nguồn $16$ cm và $22$ cm; điểm $N$ cách hai nguồn $10$ cm và $15$ cm. $M$, $N$ dao động thế nào?',
      steps: [
        '$\\lambda = \\dfrac{v}{f} = \\dfrac{40}{20} = 2$ cm.',
        'Tại $M$: $d_2 - d_1 = 22 - 16 = 6$ cm $= 3\\lambda$: $M$ là cực đại bậc $3$.',
        'Tại $N$: $d_2 - d_1 = 15 - 10 = 5$ cm $= 2{,}5\\lambda = \\left(2 + \\dfrac{1}{2}\\right)\\lambda$: $N$ là cực tiểu, đứng yên.',
      ],
      answer: '$M$ dao động với biên độ cực đại; $N$ đứng yên.',
    },
    {
      problem:
        'Hai nguồn cùng pha cách nhau $S_1S_2 = 9$ cm, bước sóng $\\lambda = 2$ cm. Tìm số cực đại trên đoạn $S_1S_2$.',
      steps: [
        'Cực đại thoả mãn $-\\dfrac{S_1S_2}{\\lambda} < k < \\dfrac{S_1S_2}{\\lambda}$, tức $-4{,}5 < k < 4{,}5$.',
        '$k$ nguyên: $k = -4, -3, \\ldots, 3, 4$, có $9$ giá trị.',
      ],
      answer: 'Có $9$ cực đại trên đoạn $S_1S_2$.',
    },
    {
      problem:
        'Trong thí nghiệm Young, hai khe cách nhau $a = 1$ mm, màn cách hai khe $D = 2$ m, ánh sáng có bước sóng $\\lambda = 0{,}6$ µm. Tính khoảng vân, vị trí vân sáng bậc $3$ và khoảng cách giữa $5$ vân sáng liên tiếp.',
      steps: [
        '$i = \\dfrac{\\lambda D}{a} = \\dfrac{0{,}6 \\cdot 2}{1} = 1{,}2$ mm.',
        'Vân sáng bậc $3$: $x_3 = 3i = 3{,}6$ mm.',
        'Giữa $5$ vân sáng liên tiếp có $4$ khoảng vân: $4i = 4{,}8$ mm.',
      ],
      answer: '$i = 1{,}2$ mm; $x_3 = 3{,}6$ mm; $5$ vân sáng liên tiếp trải trên $4{,}8$ mm.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Hai nguồn kết hợp là hai nguồn dao động',
      options: [
        'cùng phương, cùng tần số và có hiệu số pha không đổi theo thời gian',
        'cùng biên độ và cùng tần số',
        'cùng phương và cùng biên độ',
        'cùng biên độ, có hiệu số pha thay đổi theo thời gian',
      ],
      answer: 0,
      hints: ['Muốn vân giao thoa đứng yên, độ lệch pha của hai sóng tại mỗi điểm phải không đổi.'],
      solution:
        'Hai nguồn kết hợp dao động cùng phương, cùng tần số và có hiệu số pha không đổi theo thời gian; biên độ không cần bằng nhau.',
    },
    {
      type: 'number',
      prompt:
        'Hai nguồn kết hợp cùng pha dao động với tần số $50$ Hz trên mặt nước, tốc độ truyền sóng $1$ m/s. Điểm $M$ cách hai nguồn $12$ cm và $18$ cm là một cực đại. Tìm bậc $k$ của cực đại đó (lấy $k$ dương).',
      answer: 3,
      hints: ['Tính $\\lambda = \\dfrac{v}{f}$ theo cm.', 'Chia $d_2 - d_1$ cho $\\lambda$.'],
      solution:
        '$\\lambda = \\dfrac{100}{50} = 2$ cm; $d_2 - d_1 = 18 - 12 = 6$ cm $= 3\\lambda$, nên $k = 3$.',
    },
    {
      type: 'choice',
      prompt:
        'Hai nguồn kết hợp cùng pha, bước sóng $2$ cm. Điểm $N$ cách hai nguồn $10$ cm và $13$ cm sẽ',
      options: [
        'đứng yên (cực tiểu)',
        'dao động với biên độ cực đại',
        'dao động với biên độ bằng biên độ của mỗi nguồn',
        'dao động với tần số gấp đôi',
      ],
      answer: 0,
      hints: ['Tính $\\dfrac{d_2 - d_1}{\\lambda}$: số nguyên hay nửa nguyên?'],
      solution:
        '$d_2 - d_1 = 3$ cm $= 1{,}5\\lambda = \\left(1 + \\dfrac{1}{2}\\right)\\lambda$: $N$ là cực tiểu, đứng yên.',
    },
    {
      type: 'number',
      prompt:
        'Trên đoạn thẳng nối hai nguồn kết hợp cùng pha, khoảng cách giữa hai cực đại liên tiếp là $1$ cm. Tần số sóng là $25$ Hz. Tính tốc độ truyền sóng (theo cm/s).',
      answer: 50,
      unit: 'cm/s',
      hints: ['Hai cực đại liên tiếp trên $S_1S_2$ cách nhau $\\dfrac{\\lambda}{2}$.'],
      solution:
        '$\\dfrac{\\lambda}{2} = 1$ cm nên $\\lambda = 2$ cm; $v = \\lambda f = 2 \\cdot 25 = 50$ cm/s.',
    },
    {
      type: 'number',
      prompt:
        'Hai nguồn kết hợp cùng pha cách nhau $10$ cm, bước sóng $3$ cm. Có bao nhiêu cực đại trên đoạn nối hai nguồn?',
      answer: 7,
      hints: ['Đếm số nguyên $k$ với $-\\dfrac{10}{3} < k < \\dfrac{10}{3}$.'],
      solution: '$-3{,}33 < k < 3{,}33$ nên $k = -3, -2, \\ldots, 3$: có $7$ cực đại.',
    },
    {
      type: 'choice',
      prompt: 'Với hai nguồn kết hợp cùng pha, các điểm nằm trên đường trung trực của $S_1S_2$',
      options: [
        'dao động với biên độ cực đại',
        'đứng yên',
        'dao động với biên độ bằng một nửa cực đại',
        'không nhận được sóng',
      ],
      answer: 0,
      hints: ['Trên đường trung trực, $d_1$ và $d_2$ có quan hệ gì?'],
      solution:
        'Trên đường trung trực $d_1 = d_2$, nên $d_2 - d_1 = 0 = 0 \\cdot \\lambda$: đó là cực đại bậc $0$.',
    },
    {
      type: 'number',
      prompt:
        'Trong thí nghiệm Young, $\\lambda = 0{,}5$ µm, $a = 0{,}5$ mm, $D = 1{,}5$ m. Tính khoảng vân.',
      answer: 1.5,
      unit: 'mm',
      hints: [
        '$i = \\dfrac{\\lambda D}{a}$; với $\\lambda$ bằng µm, $D$ bằng m, $a$ bằng mm thì $i$ ra mm.',
      ],
      solution: '$i = \\dfrac{0{,}5 \\cdot 1{,}5}{0{,}5} = 1{,}5$ mm.',
    },
    {
      type: 'number',
      prompt:
        'Trong thí nghiệm Young, $a = 1$ mm, $D = 2$ m. Khoảng cách giữa $6$ vân sáng liên tiếp đo được là $6$ mm. Tính bước sóng ánh sáng (theo µm).',
      answer: 0.6,
      unit: 'µm',
      hints: ['$6$ vân sáng liên tiếp có $5$ khoảng vân.', '$\\lambda = \\dfrac{ia}{D}$.'],
      solution:
        '$5i = 6$ mm nên $i = 1{,}2$ mm. $\\lambda = \\dfrac{ia}{D} = \\dfrac{1{,}2 \\cdot 1}{2} = 0{,}6$ µm.',
    },
    {
      type: 'number',
      prompt:
        'Trong thí nghiệm Young, khoảng vân $i = 1{,}2$ mm. Tính khoảng cách từ vân sáng trung tâm đến vân tối gần nó nhất.',
      answer: 0.6,
      unit: 'mm',
      hints: ['Vân tối ở $x = \\left(k + \\dfrac{1}{2}\\right)i$; chọn $k = 0$.'],
      solution: 'Vân tối gần vân trung tâm nhất ở $x = \\dfrac{i}{2} = 0{,}6$ mm.',
    },
    {
      type: 'choice',
      prompt: 'Thí nghiệm giao thoa ánh sáng của Young chứng tỏ',
      options: [
        'ánh sáng có tính chất sóng',
        'ánh sáng truyền thẳng',
        'ánh sáng là sóng dọc',
        'ánh sáng chỉ truyền được trong không khí',
      ],
      answer: 0,
      hints: ['Giao thoa là hiện tượng đặc trưng của loại quá trình nào?'],
      solution:
        'Giao thoa là hiện tượng đặc trưng của sóng; thấy được vân giao thoa ánh sáng chứng tỏ ánh sáng có tính chất sóng.',
    },
  ],
  takeaways: [
    'Giao thoa xảy ra khi hai sóng kết hợp gặp nhau; hai nguồn kết hợp dao động cùng phương, cùng tần số, hiệu số pha không đổi.',
    'Hai nguồn cùng pha: cực đại khi $d_2 - d_1 = k\\lambda$, cực tiểu khi $d_2 - d_1 = \\left(k + \\dfrac{1}{2}\\right)\\lambda$; trên $S_1S_2$ hai cực đại liên tiếp cách nhau $\\dfrac{\\lambda}{2}$.',
    'Thí nghiệm Young: khoảng vân $i = \\dfrac{\\lambda D}{a}$, vân sáng $x_k = ki$, vân tối $x = \\left(k + \\dfrac{1}{2}\\right)i$.',
    'Giao thoa ánh sáng chứng tỏ ánh sáng có tính chất sóng.',
  ],
};
