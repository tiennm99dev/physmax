/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Nhận biết chuyển động biến đổi, tính gia tốc từ độ biến thiên vận tốc theo thời gian, hiểu gia tốc là đại lượng vectơ và phân biệt chuyển động nhanh dần, chậm dần.',
  intro:
    'Xe máy rời đèn đỏ tăng tốc rất nhanh, còn xe tải nặng thì lên tốc độ từ từ. Cùng đạt $10$ m/s, nhưng một xe mất $3$ s, xe kia mất $15$ s. Để so sánh vận tốc thay đổi nhanh hay chậm, ta cần một đại lượng mới: gia tốc.',
  objectives: [
    'Nhận biết được chuyển động biến đổi, chuyển động nhanh dần và chậm dần.',
    'Nêu được gia tốc là đại lượng cho biết vận tốc thay đổi nhanh hay chậm và có đơn vị m/s².',
    'Tính được gia tốc từ độ biến thiên vận tốc và khoảng thời gian.',
    'Dựa vào dấu của $a$ và $v$ để phân biệt chuyển động nhanh dần với chậm dần.',
  ],
  sections: [
    {
      heading: 'Chuyển động biến đổi',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Chuyển động biến đổi',
          text: 'Chuyển động biến đổi là chuyển động có vận tốc thay đổi theo thời gian. Vận tốc tăng dần là chuyển động nhanh dần; vận tốc giảm dần là chuyển động chậm dần.',
        },
        {
          type: 'p',
          text: 'Ô tô rời bến, tàu hoả vào ga, quả bóng bị ném lên cao đều là chuyển động biến đổi. Một vật đi đều trên đường thẳng thì vận tốc không đổi nên không phải chuyển động biến đổi.',
        },
      ],
    },
    {
      heading: 'Gia tốc',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Gia tốc',
          text: 'Gia tốc của chuyển động là đại lượng cho biết vận tốc thay đổi nhanh hay chậm, được tính bằng độ biến thiên vận tốc chia cho khoảng thời gian xảy ra độ biến thiên đó.',
        },
        { type: 'tex', tex: 'a = \\dfrac{\\Delta v}{\\Delta t} = \\dfrac{v - v_0}{t - t_0}' },
        {
          type: 'list',
          items: [
            '$\\Delta v = v - v_0$: độ biến thiên vận tốc (m/s).',
            '$\\Delta t = t - t_0$: khoảng thời gian xảy ra độ biến thiên (s).',
            '$a$: gia tốc, đơn vị m/s² trong hệ SI.',
          ],
        },
        {
          type: 'p',
          text: 'Gia tốc $2$ m/s² có nghĩa là mỗi giây vận tốc tăng thêm $2$ m/s. Gia tốc cho biết vận tốc thay đổi nhanh đến đâu chứ không cho biết vật đang chạy nhanh đến đâu: một xe rất nhanh mà chạy đều vẫn có gia tốc bằng $0$.',
        },
      ],
    },
    {
      heading: 'Gia tốc là đại lượng vectơ',
      blocks: [
        { type: 'tex', tex: '\\vec{a} = \\dfrac{\\Delta \\vec{v}}{\\Delta t}' },
        {
          type: 'p',
          text: 'Trong chuyển động thẳng, ta chọn một chiều dương và viết $v$, $a$ thành số có dấu. Khi đó:',
        },
        {
          type: 'table',
          caption: 'Nhanh dần hay chậm dần',
          head: ['Chuyển động', 'Hướng của $\\vec{a}$', 'Dấu'],
          rows: [
            ['Nhanh dần', 'Cùng chiều với $\\vec{v}$', '$a \\cdot v > 0$'],
            ['Chậm dần', 'Ngược chiều với $\\vec{v}$', '$a \\cdot v < 0$'],
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Gia tốc âm chưa chắc là chậm dần',
          text: 'Dấu của $a$ phụ thuộc vào chiều dương đã chọn. Xe chạy ngược chiều dương với $v < 0$ và $a < 0$ vẫn đang nhanh dần, vì $a \\cdot v > 0$. Luôn xét dấu của tích $a \\cdot v$.',
        },
      ],
    },
  ],
  explore: {
    title: 'Chân ga và phanh',
    instruction:
      'Giữ nút chân ga để tăng tốc, giữ nút phanh để giảm tốc, thả ra để xe đi đều (bỏ qua lực cản). Quan sát mũi tên $\\vec{v}$ và $\\vec{a}$, đồng hồ tốc độ và đồ thị $v - t$. Đổi chiều dương để thấy dấu của $v$, $a$ thay đổi nhưng dấu của tích $a \\cdot v$ thì không.',
  },
  examples: [
    {
      problem:
        'Một con báo đang chạy với vận tốc $30$ m/s thì chuyển động chậm dần khi tới gần một con suối. Trong $3$ s, vận tốc của nó giảm còn $9$ m/s. Tính gia tốc của con báo.',
      steps: [
        'Chọn chiều dương là chiều chuyển động: $v_0 = 30$ m/s, $v = 9$ m/s, $\\Delta t = 3$ s.',
        '$a = \\dfrac{v - v_0}{\\Delta t} = \\dfrac{9 - 30}{3} = -7$ m/s².',
        '$a$ và $v$ trái dấu nên $a \\cdot v < 0$, đúng với chuyển động chậm dần.',
      ],
      answer: '$a = -7$ m/s², ngược chiều chuyển động.',
    },
    {
      problem:
        'Một xe máy đang đi với vận tốc $10$ m/s thì tăng tốc, sau $5$ s đạt $12$ m/s. Sau đó xe phanh, chuyển động chậm dần với gia tốc có độ lớn như trước. Tính gia tốc lúc tăng tốc và thời gian từ khi phanh đến khi dừng hẳn.',
      steps: [
        'Lúc tăng tốc: $a = \\dfrac{12 - 10}{5} = 0{,}4$ m/s².',
        "Lúc phanh: $a' = -0{,}4$ m/s², $v_0 = 12$ m/s, $v = 0$.",
        "$\\Delta t = \\dfrac{v - v_0}{a'} = \\dfrac{0 - 12}{-0{,}4} = 30$ s.",
      ],
      answer: '$a = 0{,}4$ m/s²; xe dừng sau $30$ s kể từ khi phanh.',
    },
  ],
  practice: [
    {
      type: 'multi',
      prompt: 'Chuyển động nào sau đây là chuyển động biến đổi?',
      options: [
        'Ô tô rời bến, tăng tốc dần.',
        'Tàu hoả chạy đều trên đoạn đường thẳng.',
        'Xe đạp phanh lại khi gặp đèn đỏ.',
        'Thang máy bắt đầu đi lên.',
      ],
      answers: [0, 2, 3],
      hints: ['Vận tốc có thay đổi theo thời gian không?'],
      solution:
        'Ô tô rời bến, xe đạp phanh và thang máy bắt đầu đi lên đều có vận tốc thay đổi. Tàu chạy đều có vận tốc không đổi.',
    },
    {
      type: 'choice',
      prompt: 'Gia tốc $a = 2$ m/s² có nghĩa là',
      options: [
        'vật đi được $2$ m trong mỗi giây',
        'mỗi giây vận tốc của vật tăng thêm $2$ m/s',
        'vận tốc của vật luôn bằng $2$ m/s',
        'vật chuyển động thẳng đều',
      ],
      answer: 1,
      hints: ['Gia tốc là độ biến thiên của đại lượng nào trong một đơn vị thời gian?'],
      solution: '$a = \\dfrac{\\Delta v}{\\Delta t}$ nên mỗi giây vận tốc thay đổi $2$ m/s.',
    },
    {
      type: 'number',
      prompt:
        'Một ô tô bắt đầu chuyển động từ trạng thái đứng yên, sau $10$ s đạt vận tốc $72$ km/h. Tính gia tốc của ô tô.',
      answer: 2,
      unit: 'm/s²',
      hints: ['Đổi $72$ km/h ra m/s.'],
      solution: '$v = 72$ km/h $= 20$ m/s, nên $a = \\dfrac{20 - 0}{10} = 2$ m/s².',
    },
    {
      type: 'number',
      prompt:
        'Một xe có vận tốc $v_0 = 4$ m/s tại thời điểm $t_0 = 0$ và $v = 12{,}5$ m/s tại $t = 5$ s. Tính gia tốc trung bình của xe.',
      answer: 1.7,
      tolerance: 0.001,
      unit: 'm/s²',
      hints: ['Dùng $a = \\dfrac{v - v_0}{t - t_0}$.'],
      solution: '$a = \\dfrac{12{,}5 - 4}{5 - 0} = \\dfrac{8{,}5}{5} = 1{,}7$ m/s².',
    },
    {
      type: 'number',
      prompt:
        'Một ô tô đang chạy $20$ m/s thì phanh với gia tốc $-4$ m/s². Sau bao lâu xe dừng hẳn?',
      answer: 5,
      unit: 's',
      hints: ['Khi dừng hẳn, $v = 0$.'],
      solution: '$\\Delta t = \\dfrac{0 - 20}{-4} = 5$ s.',
    },
    {
      type: 'number',
      prompt:
        'Chọn chiều dương từ trái sang phải. Một tàu chạy sang trái, vận tốc đổi từ $-10$ m/s thành $-20$ m/s trong $4$ s. Tính gia tốc (có dấu).',
      answer: -2.5,
      tolerance: 0.001,
      unit: 'm/s²',
      hints: ['Cẩn thận với dấu: $v - v_0 = -20 - (-10)$.'],
      solution: '$a = \\dfrac{-20 - (-10)}{4} = \\dfrac{-10}{4} = -2{,}5$ m/s².',
    },
    {
      type: 'choice',
      prompt: 'Tàu ở câu trên chuyển động',
      options: [
        'chậm dần, vì $a < 0$',
        'nhanh dần, vì $a \\cdot v > 0$',
        'đều, vì $a$ không đổi',
        'chậm dần, vì $v < 0$',
      ],
      answer: 1,
      hints: ['Đừng chỉ nhìn dấu của $a$; xét dấu của tích $a \\cdot v$.'],
      solution:
        '$a < 0$ và $v < 0$ nên $a \\cdot v > 0$: tàu nhanh dần. Độ lớn vận tốc tăng từ $10$ m/s lên $20$ m/s cũng cho thấy điều đó.',
    },
    {
      type: 'choice',
      prompt: 'Trong chuyển động chậm dần, vectơ gia tốc',
      options: [
        'cùng chiều với vectơ vận tốc',
        'ngược chiều với vectơ vận tốc',
        'vuông góc với vectơ vận tốc',
        'bằng vectơ không',
      ],
      answer: 1,
      hints: ['Chậm dần có nghĩa độ lớn vận tốc giảm, nên $a \\cdot v$ mang dấu nào?'],
      solution: 'Chậm dần có $a \\cdot v < 0$, nghĩa là $\\vec{a}$ ngược chiều với $\\vec{v}$.',
    },
    {
      type: 'number',
      prompt:
        'Vận tốc của một vật tăng từ $5{,}28$ m/s tại $t = 4$ s lên $12{,}5$ m/s tại $t = 8$ s. Tính gia tốc trung bình trong khoảng này.',
      answer: 1.805,
      tolerance: 0.001,
      unit: 'm/s²',
      hints: ['$\\Delta t = 8 - 4$ s.'],
      solution: '$a = \\dfrac{12{,}5 - 5{,}28}{4} = \\dfrac{7{,}22}{4} = 1{,}805$ m/s².',
    },
  ],
  takeaways: [
    'Chuyển động biến đổi có vận tốc thay đổi theo thời gian.',
    'Gia tốc $a = \\dfrac{\\Delta v}{\\Delta t}$ cho biết vận tốc thay đổi nhanh hay chậm, đơn vị m/s².',
    'Gia tốc là đại lượng vectơ: $\\vec{a} = \\dfrac{\\Delta \\vec{v}}{\\Delta t}$.',
    'Nhanh dần: $a \\cdot v > 0$; chậm dần: $a \\cdot v < 0$; dấu của riêng $a$ chưa đủ để kết luận.',
  ],
};
