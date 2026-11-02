/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Sự rơi tự do là sự rơi chỉ dưới tác dụng của trọng lực: chuyển động thẳng nhanh dần đều theo phương thẳng đứng, với cùng gia tốc g cho mọi vật ở cùng một nơi.',
  intro:
    'Thả một hòn đá và một chiếc lá cùng lúc, hòn đá chạm đất trước. Có phải vật nặng luôn rơi nhanh hơn vật nhẹ? Galilei đã phản bác quan niệm hàng nghìn năm đó, và một ống đã hút hết không khí sẽ cho ta thấy vì sao.',
  objectives: [
    'Nêu được yếu tố làm các vật rơi nhanh, chậm khác nhau trong không khí.',
    'Nêu được khái niệm sự rơi tự do và các đặc điểm của chuyển động rơi tự do.',
    'Nêu được gia tốc rơi tự do $g$ và các yếu tố mà $g$ phụ thuộc.',
    'Vận dụng được các công thức của chuyển động rơi tự do.',
  ],
  sections: [
    {
      heading: 'Sự rơi trong không khí',
      blocks: [
        {
          type: 'p',
          text: 'Thả hai tờ giấy giống nhau, một tờ để phẳng và một tờ vo tròn: hai tờ nặng bằng nhau nhưng tờ vo tròn rơi nhanh hơn. Vậy khối lượng không phải yếu tố quyết định.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Nguyên nhân',
          text: 'Trong không khí, vật rơi nhanh hay chậm phụ thuộc vào độ lớn của lực cản không khí so với trọng lượng của vật. Lực cản càng nhỏ so với trọng lượng thì vật rơi càng nhanh.',
        },
      ],
    },
    {
      heading: 'Sự rơi tự do',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Sự rơi tự do',
          text: 'Sự rơi tự do là sự rơi chỉ dưới tác dụng của trọng lực. Khi lực cản của không khí không đáng kể so với trọng lượng của vật, sự rơi của vật trong không khí được coi là rơi tự do.',
        },
        {
          type: 'p',
          text: 'Trong ống đã hút hết không khí (ống Newton), lông chim và hòn bi rơi nhanh như nhau. Muốn biết vật rơi tự do chuyển động thế nào, người ta dùng ảnh hoạt nghiệm: chụp vị trí của vật sau những khoảng thời gian bằng nhau.',
        },
        {
          type: 'table',
          caption: 'Vị trí của vật rơi tự do từ trạng thái nghỉ (lấy $g = 9{,}8$ m/s²)',
          head: ['$t$ (s)', '$0{,}1$', '$0{,}2$', '$0{,}3$', '$0{,}4$', '$0{,}5$'],
          rows: [
            ['$s$ (m)', '$0{,}049$', '$0{,}196$', '$0{,}441$', '$0{,}784$', '$1{,}225$'],
            ['$\\dfrac{s}{t^2}$ (m/s²)', '$4{,}9$', '$4{,}9$', '$4{,}9$', '$4{,}9$', '$4{,}9$'],
          ],
        },
        {
          type: 'p',
          text: 'Tỉ số $\\dfrac{s}{t^2}$ không đổi, nghĩa là $s$ tỉ lệ với $t^2$ đúng như công thức của chuyển động nhanh dần đều không vận tốc đầu.',
        },
        {
          type: 'list',
          items: [
            'Phương: thẳng đứng.',
            'Chiều: từ trên xuống dưới.',
            'Tính chất: chuyển động thẳng nhanh dần đều.',
          ],
        },
      ],
    },
    {
      heading: 'Gia tốc rơi tự do và các công thức',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Gia tốc rơi tự do',
          text: 'Tại cùng một nơi trên Trái Đất, mọi vật rơi tự do đều có cùng gia tốc, kí hiệu là $g$. Giá trị của $g$ phụ thuộc vào vĩ độ địa lí và độ cao. Ở gần bề mặt Trái Đất thường lấy $g = 9{,}8$ m/s² (có khi lấy gần đúng $10$ m/s² để tính nhanh).',
        },
        {
          type: 'p',
          text: 'Rơi tự do từ trạng thái nghỉ là trường hợp riêng của chuyển động thẳng biến đổi đều với $v_0 = 0$, $a = g$. Chọn chiều dương hướng xuống, ta có:',
        },
        { type: 'tex', tex: 'v = gt' },
        { type: 'tex', tex: 'd = s = \\dfrac{1}{2}gt^2' },
        { type: 'tex', tex: 'v^2 = 2gs' },
      ],
    },
  ],
  explore: {
    title: 'Ống Newton ảo',
    instruction:
      'Thả cặp vật trong ống có không khí, rồi hút hết không khí và thả lại. So sánh thời gian chạm đáy. Quan sát các dấu chấm: khoảng cách giữa chúng thay đổi thế nào?',
  },
  examples: [
    {
      problem:
        'Thả một viên bi từ độ cao $19{,}6$ m so với mặt đất. Bỏ qua lực cản không khí, lấy $g = 9{,}8$ m/s². Tính thời gian rơi và vận tốc của bi khi chạm đất.',
      steps: [
        'Từ $s = \\dfrac{1}{2}gt^2$, suy ra $t = \\sqrt{\\dfrac{2s}{g}} = \\sqrt{\\dfrac{2 \\cdot 19{,}6}{9{,}8}} = 2$ s.',
        'Vận tốc khi chạm đất: $v = gt = 9{,}8 \\cdot 2 = 19{,}6$ m/s.',
        'Kiểm tra: $v^2 = 2gs = 2 \\cdot 9{,}8 \\cdot 19{,}6 = 19{,}6^2$.',
      ],
      answer: '$t = 2$ s, $v = 19{,}6$ m/s.',
    },
    {
      problem:
        'Một hòn đá rơi tự do mất $3$ s mới chạm đất. Lấy $g = 9{,}8$ m/s². Tính độ cao thả và quãng đường đá rơi được trong giây cuối cùng.',
      steps: [
        'Độ cao thả: $s_3 = \\dfrac{1}{2} \\cdot 9{,}8 \\cdot 3^2 = 44{,}1$ m.',
        'Quãng đường rơi trong $2$ s đầu: $s_2 = \\dfrac{1}{2} \\cdot 9{,}8 \\cdot 2^2 = 19{,}6$ m.',
        'Quãng đường trong giây cuối: $\\Delta s = s_3 - s_2 = 44{,}1 - 19{,}6 = 24{,}5$ m.',
      ],
      answer: 'Độ cao $44{,}1$ m; giây cuối đá rơi được $24{,}5$ m.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Trường hợp nào có thể coi là sự rơi tự do?',
      options: [
        'Chiếc lá khô rơi từ trên cây.',
        'Hòn sỏi nhỏ được thả từ độ cao vài mét.',
        'Chiếc dù đang mở, đưa người xuống đất.',
        'Tờ giấy phẳng rơi trong phòng.',
      ],
      answer: 1,
      hints: ['Xét lực cản không khí so với trọng lượng của vật.'],
      solution:
        'Hòn sỏi có lực cản không đáng kể so với trọng lượng nên được coi là rơi tự do. Lá khô, dù, giấy phẳng chịu lực cản đáng kể.',
    },
    {
      type: 'choice',
      prompt: 'Trong chân không, thả cùng lúc một lông chim và một hòn bi ở cùng độ cao thì',
      options: [
        'hòn bi chạm đáy trước vì nặng hơn.',
        'lông chim chạm đáy trước vì nhẹ hơn.',
        'hai vật chạm đáy cùng lúc.',
        'hai vật đều không rơi.',
      ],
      answer: 2,
      hints: ['Không còn lực cản, hai vật chỉ chịu tác dụng của trọng lực.'],
      solution:
        'Ở cùng một nơi, mọi vật rơi tự do có cùng gia tốc $g$, nên hai vật chạm đáy cùng lúc.',
    },
    {
      type: 'multi',
      prompt: 'Những phát biểu nào đúng về chuyển động rơi tự do?',
      options: [
        'Phương thẳng đứng, chiều từ trên xuống dưới.',
        'Là chuyển động thẳng nhanh dần đều.',
        'Vật càng nặng thì gia tốc rơi càng lớn.',
        'Giá trị của $g$ phụ thuộc vào vĩ độ địa lí và độ cao.',
      ],
      answers: [0, 1, 3],
      hints: ['Gia tốc rơi tự do có phụ thuộc vào khối lượng vật không?'],
      solution:
        'Rơi tự do có phương thẳng đứng, chiều xuống, nhanh dần đều, và $g$ phụ thuộc vĩ độ, độ cao. Gia tốc không phụ thuộc khối lượng của vật.',
    },
    {
      type: 'number',
      prompt:
        'Một vật rơi tự do từ trạng thái nghỉ. Lấy $g = 9{,}8$ m/s². Tính vận tốc của vật sau $2{,}5$ s.',
      answer: 24.5,
      tolerance: 0.01,
      unit: 'm/s',
      hints: ['Dùng $v = gt$.'],
      solution: '$v = 9{,}8 \\cdot 2{,}5 = 24{,}5$ m/s.',
    },
    {
      type: 'number',
      prompt: 'Một vật rơi tự do trong $4$ s. Lấy $g = 9{,}8$ m/s². Tính quãng đường vật rơi được.',
      answer: 78.4,
      tolerance: 0.01,
      unit: 'm',
      hints: ['Dùng $s = \\dfrac{1}{2}gt^2$.'],
      solution: '$s = \\dfrac{1}{2} \\cdot 9{,}8 \\cdot 4^2 = 78{,}4$ m.',
    },
    {
      type: 'number',
      prompt:
        'Thả một vật từ độ cao $45$ m, bỏ qua lực cản, lấy $g = 10$ m/s². Sau bao lâu vật chạm đất?',
      answer: 3,
      tolerance: 0.001,
      unit: 's',
      hints: ['Rút $t$ từ $s = \\dfrac{1}{2}gt^2$.'],
      solution: '$t = \\sqrt{\\dfrac{2s}{g}} = \\sqrt{\\dfrac{2 \\cdot 45}{10}} = 3$ s.',
    },
    {
      type: 'number',
      prompt:
        'Thả một vật từ độ cao $20$ m, bỏ qua lực cản, lấy $g = 9{,}8$ m/s². Tính vận tốc khi vật chạm đất (làm tròn đến một chữ số thập phân).',
      answer: 19.8,
      tolerance: 0.05,
      unit: 'm/s',
      hints: ['Bài không cho thời gian: dùng $v^2 = 2gs$.'],
      solution:
        '$v = \\sqrt{2gs} = \\sqrt{2 \\cdot 9{,}8 \\cdot 20} = \\sqrt{392} \\approx 19{,}8$ m/s.',
    },
    {
      type: 'number',
      prompt:
        'Một vật rơi tự do chạm đất sau $4$ s, lấy $g = 9{,}8$ m/s². Tính quãng đường vật rơi trong giây cuối cùng.',
      answer: 34.3,
      tolerance: 0.01,
      unit: 'm',
      hints: ['Lấy quãng đường trong $4$ s trừ đi quãng đường trong $3$ s.'],
      solution:
        '$s_4 = \\dfrac{1}{2} \\cdot 9{,}8 \\cdot 16 = 78{,}4$ m; $s_3 = \\dfrac{1}{2} \\cdot 9{,}8 \\cdot 9 = 44{,}1$ m. Giây cuối: $78{,}4 - 44{,}1 = 34{,}3$ m.',
    },
  ],
  takeaways: [
    'Trong không khí, vật rơi nhanh hay chậm phụ thuộc vào lực cản so với trọng lượng, không phải vào khối lượng.',
    'Sự rơi tự do là sự rơi chỉ dưới tác dụng của trọng lực: thẳng đứng, từ trên xuống, nhanh dần đều.',
    'Ở cùng một nơi, mọi vật rơi tự do có cùng gia tốc $g$; gần mặt đất thường lấy $g = 9{,}8$ m/s².',
    'Công thức: $v = gt$, $s = \\dfrac{1}{2}gt^2$, $v^2 = 2gs$.',
  ],
};
