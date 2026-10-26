/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Mặt Trăng là vệ tinh tự nhiên của Trái Đất, không tự phát sáng mà phản chiếu ánh sáng Mặt Trời; do Mặt Trăng chuyển động quanh Trái Đất nên phần sáng ta nhìn thấy thay đổi theo các pha: không trăng, lưỡi liềm, bán nguyệt, khuyết, tròn, lặp lại sau mỗi tuần trăng khoảng 29,5 ngày.',
  intro:
    'Đêm rằm Trung thu, trăng tròn vằng vặc; nhưng đầu tháng âm lịch, trăng chỉ là một vệt cong mảnh như lưỡi liềm, có đêm lại chẳng thấy trăng đâu. Mặt Trăng có thật sự to lên, nhỏ đi không? Vì sao hình dạng Mặt Trăng ta nhìn thấy lại thay đổi đều đặn mỗi tháng?',
  objectives: [
    'Nêu được Mặt Trăng không tự phát sáng mà phản chiếu ánh sáng Mặt Trời.',
    'Giải thích được một cách sơ lược vì sao hình dạng nhìn thấy của Mặt Trăng thay đổi.',
    'Gọi tên và sắp xếp được các pha của Mặt Trăng theo thứ tự trong một tháng âm lịch.',
    'Nêu được chu kì tuần trăng khoảng 29,5 ngày và dùng nó để dự đoán pha trăng.',
  ],
  sections: [
    {
      heading: 'Mặt Trăng phản chiếu ánh sáng Mặt Trời',
      blocks: [
        {
          type: 'p',
          text: 'Mặt Trăng là vệ tinh tự nhiên của Trái Đất: nó chuyển động quanh Trái Đất, cách Trái Đất khoảng $384\\,400\\ \\text{km}$. Đường kính Mặt Trăng chỉ bằng khoảng một phần tư đường kính Trái Đất.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Mặt Trăng không tự phát sáng',
          text: 'Mặt Trăng không tự phát ra ánh sáng. Ta nhìn thấy Mặt Trăng vì nó phản chiếu ánh sáng Mặt Trời chiếu tới nó. Mặt Trời luôn chiếu sáng một nửa Mặt Trăng (nửa hướng về Mặt Trời); nửa kia tối.',
        },
        {
          type: 'p',
          text: 'Giống như một quả bóng được chiếu đèn pin trong phòng tối: nửa quả bóng hướng về đèn thì sáng, nửa kia tối. Đứng ở các chỗ khác nhau quanh quả bóng, ta thấy phần sáng của nó có hình dạng khác nhau.',
        },
      ],
    },
    {
      heading: 'Các pha của Mặt Trăng',
      blocks: [
        {
          type: 'p',
          text: 'Mặt Trăng chuyển động quanh Trái Đất nên vị trí của nó so với Mặt Trời và Trái Đất thay đổi. Từ Trái Đất, ta chỉ thấy được phần sáng nằm trên nửa Mặt Trăng hướng về phía mình; phần sáng này lúc nhiều, lúc ít. Các hình dạng nhìn thấy khác nhau đó gọi là các pha của Mặt Trăng.',
        },
        {
          type: 'table',
          caption: 'Các pha của Mặt Trăng trong một tháng âm lịch (nhìn từ Việt Nam)',
          head: ['Thời điểm (âm lịch)', 'Pha', 'Vị trí và hình dạng'],
          rows: [
            [
              'Khoảng ngày $1$',
              'Không trăng (trăng mới)',
              'Mặt Trăng ở giữa Trái Đất và Mặt Trời: nửa tối hướng về Trái Đất, ta không thấy trăng',
            ],
            [
              'Khoảng ngày $3$ đến $6$',
              'Trăng lưỡi liềm đầu tháng',
              'Vệt sáng cong mảnh ở bên phải',
            ],
            [
              'Khoảng ngày $8$',
              'Trăng bán nguyệt đầu tháng (thượng huyền)',
              'Sáng nửa bên phải của đĩa trăng',
            ],
            [
              'Khoảng ngày $10$ đến $13$',
              'Trăng khuyết đầu tháng',
              'Sáng hơn nửa, khuyết ở bên trái',
            ],
            [
              'Khoảng ngày $15$ (rằm)',
              'Trăng tròn',
              'Trái Đất ở giữa Mặt Trời và Mặt Trăng: cả nửa sáng hướng về Trái Đất',
            ],
            [
              'Khoảng ngày $17$ đến $20$',
              'Trăng khuyết cuối tháng',
              'Sáng hơn nửa, khuyết ở bên phải',
            ],
            [
              'Khoảng ngày $22$, $23$',
              'Trăng bán nguyệt cuối tháng (hạ huyền)',
              'Sáng nửa bên trái của đĩa trăng',
            ],
            [
              'Khoảng ngày $25$ đến $28$',
              'Trăng lưỡi liềm cuối tháng',
              'Vệt sáng cong mảnh ở bên trái',
            ],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Mẹo nhớ',
          text: 'Từ không trăng đến trăng tròn (nửa đầu tháng), phần sáng lớn dần và ở bên phải; từ trăng tròn đến không trăng (nửa cuối tháng), phần sáng nhỏ dần và ở bên trái. Phần sáng luôn quay về phía Mặt Trời.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Không phải bóng Trái Đất che Mặt Trăng',
          text: 'Trăng khuyết, trăng lưỡi liềm không phải do bóng của Trái Đất che bớt Mặt Trăng. Đó chỉ là do ta nhìn thấy nhiều hay ít phần được chiếu sáng của Mặt Trăng.',
        },
      ],
    },
    {
      heading: 'Chu kì tuần trăng',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Tuần trăng',
          text: 'Khoảng thời gian giữa hai lần liên tiếp Mặt Trăng có cùng một pha (ví dụ từ trăng tròn đến trăng tròn tiếp theo) là một tuần trăng, dài khoảng $29{,}5$ ngày. Lịch âm (âm lịch) dựa theo tuần trăng: mỗi tháng âm lịch có $29$ hoặc $30$ ngày.',
        },
        {
          type: 'list',
          items: [
            'Từ không trăng đến trăng tròn mất khoảng nửa tuần trăng, gần $15$ ngày.',
            'Giữa hai pha chính liền nhau (không trăng, bán nguyệt đầu tháng, trăng tròn, bán nguyệt cuối tháng) cách nhau khoảng một phần tư tuần trăng: $29{,}5 : 4 \\approx 7{,}4$ ngày, gần một tuần lễ.',
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Mở rộng: ta luôn thấy một mặt của Mặt Trăng',
          text: 'Mặt Trăng vừa chuyển động quanh Trái Đất vừa tự quay quanh trục của nó; khi tự quay được một vòng thì nó cũng quay quanh Trái Đất được đúng một vòng. Vì vậy từ Trái Đất, ta luôn chỉ thấy một mặt của Mặt Trăng.',
        },
      ],
    },
  ],
  explore: {
    title: 'Kéo Mặt Trăng quanh Trái Đất',
    instruction:
      'Hình thứ nhất nhìn từ phía trên cực Bắc, Mặt Trời ở bên trái. Kéo Mặt Trăng (hoặc dùng phím mũi tên, nút "Thêm 1 ngày") đi quanh Trái Đất ngược chiều kim đồng hồ. Viền cam cho biết nửa Mặt Trăng hướng về Trái Đất; hình thứ hai là trăng ta thấy từ Việt Nam. Sau đó làm các thử thách: đặt Mặt Trăng vào đúng vị trí để thấy pha được yêu cầu.',
  },
  examples: [
    {
      problem:
        'Vì sao đêm rằm (ngày $15$ âm lịch) ta thấy trăng tròn, còn ngày $1$ âm lịch lại không thấy trăng?',
      steps: [
        'Mặt Trời luôn chiếu sáng nửa Mặt Trăng hướng về phía nó; ta chỉ thấy phần sáng nằm trên nửa Mặt Trăng hướng về Trái Đất.',
        'Ngày rằm, Trái Đất nằm giữa Mặt Trời và Mặt Trăng, nên nửa được chiếu sáng của Mặt Trăng hướng trọn về Trái Đất: ta thấy cả đĩa trăng sáng.',
        'Ngày $1$ âm lịch, Mặt Trăng nằm giữa Trái Đất và Mặt Trời, nên nửa được chiếu sáng quay về phía Mặt Trời, nửa tối hướng về Trái Đất: ta không thấy trăng.',
      ],
      answer:
        'Vì vị trí của Mặt Trăng so với Mặt Trời và Trái Đất khác nhau: ngày rằm cả nửa sáng hướng về Trái Đất (trăng tròn), ngày $1$ nửa tối hướng về Trái Đất (không trăng).',
    },
    {
      problem:
        'Hôm nay là ngày $1$ âm lịch, không thấy trăng. Biết một tuần trăng dài khoảng $29{,}5$ ngày, khoảng bao nhiêu ngày nữa sẽ thấy trăng bán nguyệt đầu tháng? Hôm đó là khoảng ngày bao nhiêu âm lịch?',
      steps: [
        'Từ không trăng đến bán nguyệt đầu tháng, Mặt Trăng đi được một phần tư vòng quanh Trái Đất, tức một phần tư tuần trăng.',
        'Số ngày: $29{,}5 : 4 \\approx 7{,}4$ ngày, tức khoảng $7$ ngày nữa.',
        'Ngày $1$ cộng thêm khoảng $7$ ngày là khoảng ngày $8$ âm lịch.',
      ],
      answer:
        'Khoảng $7$ ngày nữa, vào khoảng ngày $8$ âm lịch, sẽ thấy trăng bán nguyệt đầu tháng (sáng nửa bên phải).',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Vì sao ta nhìn thấy Mặt Trăng sáng vào ban đêm?',
      options: [
        'Vì Mặt Trăng tự phát ra ánh sáng như Mặt Trời',
        'Vì Mặt Trăng phản chiếu ánh sáng Mặt Trời chiếu tới nó',
        'Vì Trái Đất chiếu ánh sáng lên Mặt Trăng',
        'Vì Mặt Trăng là một ngôi sao',
      ],
      answer: 1,
      hints: ['Mặt Trăng là vệ tinh. Vệ tinh có tự phát sáng không?'],
      solution:
        'Mặt Trăng không tự phát sáng; ta thấy nó vì nó phản chiếu ánh sáng Mặt Trời. Mặt Trăng là vệ tinh tự nhiên của Trái Đất, không phải ngôi sao.',
    },
    {
      type: 'order',
      prompt: 'Sắp xếp các pha của Mặt Trăng theo thứ tự xuất hiện trong nửa đầu tháng âm lịch.',
      items: [
        'Trăng tròn',
        'Trăng bán nguyệt đầu tháng',
        'Không trăng',
        'Trăng khuyết đầu tháng',
        'Trăng lưỡi liềm đầu tháng',
      ],
      answer: [2, 4, 1, 3, 0],
      hints: [
        'Bắt đầu từ ngày $1$ âm lịch, khi Mặt Trăng ở giữa Trái Đất và Mặt Trời.',
        'Phần sáng lớn dần: từ vệt mảnh, đến một nửa, đến hơn nửa, rồi cả đĩa.',
      ],
      solution:
        'Không trăng → trăng lưỡi liềm đầu tháng → trăng bán nguyệt đầu tháng → trăng khuyết đầu tháng → trăng tròn.',
    },
    {
      type: 'number',
      prompt: 'Một tuần trăng dài khoảng bao nhiêu ngày?',
      answer: 29.5,
      tolerance: 0.01,
      unit: 'ngày',
      hints: ['Gần bằng một tháng âm lịch, có $29$ hoặc $30$ ngày; viết số thập phân.'],
      solution: 'Một tuần trăng dài khoảng $29{,}5$ ngày.',
    },
    {
      type: 'choice',
      prompt: 'Khi nào ta thấy trăng tròn?',
      options: [
        'Khi Mặt Trăng nằm giữa Trái Đất và Mặt Trời',
        'Khi Mặt Trời nằm giữa Trái Đất và Mặt Trăng',
        'Khi đường nối Trái Đất với Mặt Trăng vuông góc với đường nối Trái Đất với Mặt Trời',
        'Khi Trái Đất nằm giữa Mặt Trời và Mặt Trăng',
      ],
      answer: 3,
      hints: ['Muốn thấy cả đĩa sáng thì nửa được chiếu sáng của Mặt Trăng phải hướng về đâu?'],
      solution:
        'Trăng tròn khi Trái Đất ở giữa Mặt Trời và Mặt Trăng: nửa được chiếu sáng của Mặt Trăng hướng trọn về Trái Đất.',
    },
    {
      type: 'choice',
      prompt: 'Nhìn từ Việt Nam, trăng lưỡi liềm đầu tháng có phần sáng ở phía nào?',
      options: ['Bên phải', 'Bên trái', 'Phía trên', 'Cả đĩa đều sáng'],
      answer: 0,
      hints: ['Nửa đầu tháng, phần sáng lớn dần và nằm ở một bên cố định.'],
      solution:
        'Nửa đầu tháng (từ không trăng đến trăng tròn), phần sáng ở bên phải; trăng lưỡi liềm đầu tháng là một vệt sáng cong mảnh ở bên phải.',
    },
    {
      type: 'number',
      prompt:
        'Hôm nay là trăng tròn. Sau đúng $2$ tuần trăng nữa lại có trăng tròn. Đó là sau bao nhiêu ngày?',
      answer: 59,
      unit: 'ngày',
      hints: ['Mỗi tuần trăng khoảng $29{,}5$ ngày.'],
      solution: 'Hai tuần trăng: $2 \\times 29{,}5 = 59$ ngày.',
    },
    {
      type: 'text',
      prompt: 'Điền vào chỗ trống: Mặt Trăng là … tự nhiên của Trái Đất.',
      accept: ['vệ tinh', 've tinh', 'một vệ tinh'],
      hints: ['Thiên thể chuyển động quanh một hành tinh gọi là gì?'],
      solution: 'Mặt Trăng là vệ tinh tự nhiên của Trái Đất: nó chuyển động quanh Trái Đất.',
    },
    {
      type: 'multi',
      prompt: 'Những nhận định nào đúng?',
      options: [
        'Mặt Trời luôn chiếu sáng một nửa Mặt Trăng',
        'Mặt Trăng tự phát sáng nên đêm nào cũng thấy',
        'Hình dạng nhìn thấy của Mặt Trăng thay đổi vì Mặt Trăng chuyển động quanh Trái Đất',
        'Trăng khuyết là do bóng Trái Đất che bớt Mặt Trăng',
        'Từ Trái Đất, ta luôn chỉ thấy một mặt của Mặt Trăng',
      ],
      answers: [0, 2, 4],
      hints: [
        'Nhớ lại: phần sáng ta thấy phụ thuộc vào vị trí của Mặt Trăng so với Mặt Trời và Trái Đất.',
      ],
      solution:
        'Đúng: Mặt Trời luôn chiếu sáng nửa Mặt Trăng; hình dạng thay đổi vì Mặt Trăng chuyển động quanh Trái Đất; ta luôn thấy một mặt của Mặt Trăng. Sai: Mặt Trăng không tự phát sáng; trăng khuyết không phải do bóng Trái Đất che mà do ta thấy ít hay nhiều phần được chiếu sáng.',
    },
    {
      type: 'choice',
      prompt: 'Vào khoảng ngày $8$ âm lịch, ta thấy trăng có hình dạng nào?',
      options: [
        'Trăng tròn',
        'Không trăng',
        'Trăng bán nguyệt đầu tháng (sáng nửa bên phải)',
        'Trăng bán nguyệt cuối tháng (sáng nửa bên trái)',
      ],
      answer: 2,
      hints: ['Ngày $8$ là khoảng một phần tư tuần trăng sau ngày không trăng.'],
      solution:
        'Sau ngày $1$ khoảng $29{,}5 : 4 \\approx 7{,}4$ ngày, Mặt Trăng đi được một phần tư vòng: ta thấy trăng bán nguyệt đầu tháng, sáng nửa bên phải.',
    },
    {
      type: 'choice',
      prompt:
        'Đêm nay em thấy trăng sáng hơn một nửa, khuyết ở bên phải. Những đêm sau trăng sẽ thế nào?',
      options: [
        'To dần thành trăng tròn',
        'Nhỏ dần, tới bán nguyệt cuối tháng rồi lưỡi liềm cuối tháng',
        'Giữ nguyên hình dạng suốt tháng',
        'Ngay đêm mai sẽ không thấy trăng',
      ],
      answer: 1,
      hints: ['Khuyết ở bên phải nghĩa là phần sáng ở bên trái: đó là nửa đầu hay nửa cuối tháng?'],
      solution:
        'Phần sáng ở bên trái là trăng khuyết cuối tháng (sau rằm). Những đêm sau phần sáng nhỏ dần: bán nguyệt cuối tháng, lưỡi liềm cuối tháng, rồi không trăng.',
    },
  ],
  takeaways: [
    'Mặt Trăng là vệ tinh tự nhiên của Trái Đất, không tự phát sáng; ta thấy Mặt Trăng vì nó phản chiếu ánh sáng Mặt Trời.',
    'Mặt Trăng chuyển động quanh Trái Đất nên phần sáng ta nhìn thấy thay đổi: không trăng, lưỡi liềm, bán nguyệt, khuyết, trăng tròn, rồi ngược lại.',
    'Trăng tròn khi Trái Đất ở giữa Mặt Trời và Mặt Trăng; không trăng khi Mặt Trăng ở giữa Trái Đất và Mặt Trời.',
    'Một tuần trăng dài khoảng $29{,}5$ ngày; lịch âm dựa theo tuần trăng.',
  ],
};
