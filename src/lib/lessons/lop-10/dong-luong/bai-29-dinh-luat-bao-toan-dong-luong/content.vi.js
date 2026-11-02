/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Động lượng toàn phần của hệ kín là đại lượng bảo toàn; định luật này giải thích va chạm đàn hồi, va chạm mềm và chuyển động bằng phản lực.',
  intro:
    'Người bước từ thuyền lên bờ thì thuyền lùi lại. Súng giật về phía sau khi đạn bay ra phía trước. Tên lửa bay được ngay cả nơi không có không khí để đẩy vào. Vì sao chuyển động của một phần lại kéo theo chuyển động ngược lại của phần kia?',
  objectives: [
    'Nêu được khái niệm hệ kín và chỉ ra được khi nào có thể coi một hệ là kín.',
    'Phát biểu và viết được biểu thức của định luật bảo toàn động lượng.',
    'Vận dụng được định luật cho va chạm đàn hồi, va chạm mềm; so sánh được động năng trước và sau va chạm.',
    'Giải thích được nguyên tắc chuyển động bằng phản lực.',
  ],
  sections: [
    {
      heading: 'Hệ kín',
      blocks: [
        {
          type: 'p',
          text: 'Trong một hệ nhiều vật, lực các vật trong hệ tác dụng lẫn nhau gọi là nội lực, lực từ vật ngoài hệ tác dụng lên hệ gọi là ngoại lực.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Hệ kín',
          text: 'Một hệ nhiều vật được gọi là hệ kín khi không có ngoại lực tác dụng lên hệ hoặc các ngoại lực tác dụng lên hệ cân bằng nhau. Trong hệ kín chỉ có các nội lực tương tác giữa các vật.',
        },
        {
          type: 'list',
          items: [
            'Hai xe trên đệm khí nằm ngang: trọng lực và phản lực cân bằng, ma sát rất nhỏ nên coi là hệ kín.',
            'Khi nội lực lớn hơn ngoại lực rất nhiều, có thể bỏ qua ngoại lực và coi hệ là kín: pháo hoa khi nổ, súng khi bắn, các vật trong lúc va chạm.',
            'Ô tô đang phanh trên đường không phải hệ kín: lực ma sát của mặt đường là ngoại lực không được cân bằng.',
          ],
        },
      ],
    },
    {
      heading: 'Định luật bảo toàn động lượng',
      blocks: [
        {
          type: 'p',
          text: 'Xét hệ kín gồm hai vật tương tác trong thời gian $\\Delta t$. Gọi $\\vec{F_{12}}$ là lực vật $1$ tác dụng lên vật $2$, $\\vec{F_{21}}$ là lực vật $2$ tác dụng lên vật $1$. Theo định luật 3 Newton, $\\vec{F_{12}} = -\\vec{F_{21}}$. Theo mối liên hệ giữa lực và động lượng:',
        },
        {
          type: 'tex',
          tex: '\\Delta\\vec{p_1} = \\vec{F_{21}}\\Delta t,\\quad \\Delta\\vec{p_2} = \\vec{F_{12}}\\Delta t \\quad\\Rightarrow\\quad \\Delta\\vec{p_1} + \\Delta\\vec{p_2} = \\vec{0}',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Định luật bảo toàn động lượng',
          text: 'Động lượng toàn phần của một hệ kín là một đại lượng bảo toàn: $\\vec{p} = \\vec{p_1} + \\vec{p_2} + \\dots$ không đổi.',
        },
        { type: 'p', text: 'Với hệ hai vật, trước và sau tương tác:' },
        {
          type: 'tex',
          tex: 'm_1\\vec{v_1} + m_2\\vec{v_2} = m_1\\vec{v_1^{\\prime}} + m_2\\vec{v_2^{\\prime}}',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Cách dùng khi các vật chuyển động trên một đường thẳng',
          text: 'Chọn một chiều dương. Vận tốc cùng chiều dương mang dấu $+$, ngược chiều mang dấu $-$. Đáp số vận tốc âm nghĩa là vật chuyển động ngược chiều dương.',
        },
      ],
    },
    {
      heading: 'Động lượng và động năng trong va chạm',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Va chạm đàn hồi',
          text: 'Sau va chạm, hai vật tách rời nhau và động năng của hệ không đổi. Hai xe giống nhau, xe $B$ đứng yên: sau va chạm xe $A$ dừng lại, xe $B$ chuyển động với vận tốc ban đầu của xe $A$. Xe $A$ đã truyền toàn bộ chuyển động cho xe $B$.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Va chạm mềm',
          text: 'Sau va chạm, hai vật dính vào nhau và chuyển động với cùng một vận tốc. Khi đó $m_1v_1 + m_2v_2 = (m_1 + m_2)V$. Động lượng của hệ được bảo toàn nhưng động năng giảm, vì một phần chuyển thành dạng năng lượng khác như nhiệt, biến dạng.',
        },
        {
          type: 'table',
          caption: 'So sánh hai loại va chạm của hệ kín',
          head: ['Đặc điểm', 'Va chạm đàn hồi', 'Va chạm mềm'],
          rows: [
            ['Sau va chạm', 'Hai vật tách nhau', 'Hai vật dính nhau'],
            ['Động lượng của hệ', 'Bảo toàn', 'Bảo toàn'],
            ['Động năng của hệ', 'Không đổi', 'Giảm'],
          ],
        },
      ],
    },
    {
      heading: 'Chuyển động bằng phản lực',
      blocks: [
        {
          type: 'p',
          text: 'Một vật đứng yên tách thành hai phần: phần khối lượng $m$ chuyển động với vận tốc $\\vec{v}$, phần còn lại khối lượng $M$ chuyển động với vận tốc $\\vec{V}$. Tổng động lượng trước đó bằng $\\vec{0}$ nên:',
        },
        {
          type: 'tex',
          tex: 'm\\vec{v} + M\\vec{V} = \\vec{0} \\quad\\Rightarrow\\quad \\vec{V} = -\\frac{m}{M}\\vec{v}',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Chuyển động bằng phản lực',
          text: 'Trong một hệ kín ban đầu đứng yên, khi một phần của hệ chuyển động theo một hướng thì phần còn lại chuyển động theo hướng ngược lại. Đó là chuyển động bằng phản lực: súng giật khi bắn, tên lửa bay nhờ khí phụt ra phía sau, máy bay phản lực, pháo thăng thiên.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Tên lửa không cần đẩy vào không khí',
          text: 'Tên lửa được đẩy đi nhờ tương tác với khối khí do chính nó phụt ra, không phải do khí đẩy vào không khí xung quanh. Vì vậy tên lửa vẫn hoạt động trong khoảng không vũ trụ.',
        },
        { type: 'widget', name: 'phan-luc' },
      ],
    },
  ],
  explore: {
    title: 'Xe đệm khí ảo',
    instruction:
      'Chọn loại va chạm, đặt khối lượng và vận tốc của hai xe rồi cho xe chạy. So sánh mũi tên tổng động lượng trước và sau va chạm. Thử hai xe bằng nhau với xe 2 đứng yên, rồi đổi sang xe nặng va vào xe nhẹ: tổng động lượng có đổi không? Còn động năng?',
  },
  examples: [
    {
      problem:
        'Xe $A$ khối lượng $2$ kg chạy với tốc độ $3$ m/s đến va chạm vào xe $B$ khối lượng $1$ kg đang đứng yên. Sau va chạm hai xe dính vào nhau. Tính tốc độ của hai xe và phần động năng mất đi.',
      steps: [
        'Coi hệ là kín, chọn chiều dương là chiều chuyển động của xe $A$.',
        'Bảo toàn động lượng: $2 \\cdot 3 + 1 \\cdot 0 = (2 + 1)V$, nên $V = 2$ m/s.',
        'Động năng trước: $\\dfrac{1}{2} \\cdot 2 \\cdot 3^2 = 9$ J. Động năng sau: $\\dfrac{1}{2} \\cdot 3 \\cdot 2^2 = 6$ J.',
      ],
      answer:
        'Hai xe chuyển động với tốc độ $2$ m/s theo hướng cũ của xe $A$; động năng mất $3$ J.',
    },
    {
      problem:
        'Hai xe trên đệm khí chạy ngược chiều đến gặp nhau: xe $1$ có $m_1 = 1$ kg, $v_1 = 2$ m/s; xe $2$ có $m_2 = 3$ kg, tốc độ $1$ m/s. Sau va chạm hai xe dính vào nhau. Tìm vận tốc của hai xe.',
      steps: [
        'Chọn chiều dương là chiều chuyển động ban đầu của xe $1$: $v_1 = 2$ m/s, $v_2 = -1$ m/s.',
        '$1 \\cdot 2 + 3 \\cdot (-1) = (1 + 3)V$, tức $-1 = 4V$.',
        '$V = -0{,}25$ m/s; dấu âm cho biết hai xe chuyển động theo chiều cũ của xe $2$.',
      ],
      answer: 'Hai xe chuyển động với tốc độ $0{,}25$ m/s theo chiều cũ của xe $2$.',
    },
    {
      problem:
        'Khẩu súng $4$ kg bắn viên đạn $20$ g với tốc độ $500$ m/s theo phương ngang. Tính tốc độ giật lùi của súng.',
      steps: [
        'Hệ súng và đạn coi là kín trong lúc bắn, ban đầu đứng yên nên tổng động lượng bằng $0$.',
        'Đổi $m = 0{,}02$ kg. $0{,}02 \\cdot 500 + 4V = 0$.',
        '$V = -\\dfrac{10}{4} = -2{,}5$ m/s.',
      ],
      answer: 'Súng giật lùi với tốc độ $2{,}5$ m/s, ngược hướng đạn.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Hệ nào dưới đây có thể coi là hệ kín?',
      options: [
        'Hai xe va chạm trên đệm khí nằm ngang',
        'Ô tô đang phanh gấp trên đường',
        'Quả bóng đang rơi có kể đến trọng lực, không tính Trái Đất vào hệ',
        'Xe được người đẩy tăng tốc, không tính người vào hệ',
      ],
      answer: 0,
      hints: ['Hệ nào có các ngoại lực cân bằng nhau hoặc không đáng kể?'],
      solution:
        'Trên đệm khí nằm ngang, trọng lực và phản lực cân bằng, ma sát rất nhỏ. Các hệ còn lại đều chịu một ngoại lực không được cân bằng: ma sát của đường, trọng lực, lực đẩy của người.',
    },
    {
      type: 'number',
      prompt:
        'Toa xe $4$ tấn chạy với tốc độ $2$ m/s đến móc vào một toa xe $4$ tấn đang đứng yên. Tính tốc độ của hai toa ngay sau khi móc.',
      answer: 1,
      unit: 'm/s',
      hints: ['Hai toa dính nhau: va chạm mềm.', '$m_1v_1 = (m_1 + m_2)V$.'],
      solution: '$4\\,000 \\cdot 2 = (4\\,000 + 4\\,000)V$, nên $V = 1$ m/s.',
    },
    {
      type: 'number',
      prompt:
        'Xe $1$ khối lượng $1$ kg chạy với tốc độ $4$ m/s gặp xe $2$ khối lượng $3$ kg chạy ngược chiều với tốc độ $2$ m/s. Hai xe dính vào nhau. Tính tốc độ của hai xe sau va chạm.',
      answer: 0.5,
      unit: 'm/s',
      hints: [
        'Chọn chiều dương là chiều của xe $1$, nên $v_2 = -2$ m/s.',
        'Tính tổng động lượng rồi chia cho tổng khối lượng.',
      ],
      solution:
        '$1 \\cdot 4 + 3 \\cdot (-2) = 4V$, nên $V = -0{,}5$ m/s: hai xe có tốc độ $0{,}5$ m/s, theo chiều cũ của xe $2$.',
    },
    {
      type: 'number',
      prompt:
        'Xe $A$ khối lượng $2$ kg chạy với vận tốc $3$ m/s va chạm đàn hồi với xe $B$ khối lượng $1$ kg đang đứng yên. Sau va chạm xe $A$ chạy theo hướng cũ với vận tốc $1$ m/s. Tính vận tốc của xe $B$.',
      answer: 4,
      unit: 'm/s',
      hints: ['Bảo toàn động lượng: $m_Av_A = m_Av_A^{\\prime} + m_Bv_B^{\\prime}$.'],
      solution:
        '$2 \\cdot 3 = 2 \\cdot 1 + 1 \\cdot v_B^{\\prime}$, nên $v_B^{\\prime} = 4$ m/s. Kiểm tra động năng: trước $9$ J, sau $1 + 8 = 9$ J.',
    },
    {
      type: 'number',
      prompt:
        'Hai vật cùng khối lượng $1$ kg, vật thứ nhất chạy với tốc độ $4$ m/s đến dính vào vật thứ hai đang đứng yên. Tính phần động năng của hệ bị mất đi.',
      answer: 4,
      unit: 'J',
      hints: ['Tìm vận tốc chung trước.', 'So sánh tổng động năng trước và sau va chạm.'],
      solution:
        '$V = \\dfrac{1 \\cdot 4}{2} = 2$ m/s. Trước: $\\dfrac{1}{2} \\cdot 1 \\cdot 4^2 = 8$ J; sau: $\\dfrac{1}{2} \\cdot 2 \\cdot 2^2 = 4$ J. Mất $4$ J.',
    },
    {
      type: 'number',
      prompt:
        'Súng $5$ kg bắn viên đạn $25$ g với tốc độ $400$ m/s. Tính tốc độ giật lùi của súng.',
      answer: 2,
      unit: 'm/s',
      hints: ['Ban đầu hệ đứng yên, nên $mv = MV$ về độ lớn.', 'Đổi $25$ g ra kg.'],
      solution: '$V = \\dfrac{0{,}025 \\cdot 400}{5} = 2$ m/s, ngược hướng đạn.',
    },
    {
      type: 'number',
      prompt:
        'Người $60$ kg đứng trên thuyền $180$ kg đang đứng yên, nhảy lên bờ theo phương ngang với tốc độ $3$ m/s. Bỏ qua lực cản của nước. Tính tốc độ lùi của thuyền ngay sau khi người rời thuyền.',
      answer: 1,
      unit: 'm/s',
      hints: ['Tổng động lượng của hệ người và thuyền ban đầu bằng $0$.'],
      solution: '$60 \\cdot 3 = 180 \\cdot V$, nên $V = 1$ m/s, ngược hướng người nhảy.',
    },
    {
      type: 'number',
      prompt:
        'Tên lửa tổng khối lượng $1\\,000$ kg đang đứng yên trong vũ trụ thì phụt ra tức thời $100$ kg khí với tốc độ $1\\,800$ m/s. Tính tốc độ của phần tên lửa còn lại.',
      answer: 200,
      unit: 'm/s',
      hints: ['Khối lượng phần còn lại là $M = 1\\,000 - 100$ kg.'],
      solution: '$100 \\cdot 1\\,800 = 900 \\cdot V$, nên $V = 200$ m/s, ngược hướng khí phụt.',
    },
    {
      type: 'multi',
      prompt: 'Những phát biểu nào đúng về hệ kín gồm hai vật va chạm nhau?',
      options: [
        'Tổng động lượng của hệ trước và sau va chạm bằng nhau.',
        'Trong va chạm mềm, động năng của hệ giảm.',
        'Động lượng của từng vật có thể thay đổi.',
        'Trong mọi va chạm, động năng của hệ không đổi.',
      ],
      answers: [0, 1, 2],
      hints: ['Định luật nói về tổng động lượng của hệ, không nói về từng vật.'],
      solution:
        'Tổng động lượng được bảo toàn, còn động lượng từng vật thì đổi. Động năng của hệ chỉ không đổi trong va chạm đàn hồi; trong va chạm mềm nó giảm.',
    },
    {
      type: 'choice',
      prompt: 'Tên lửa hoạt động được trong chân không là nhờ',
      options: [
        'tương tác với khối khí do chính nó phụt ra phía sau',
        'khí phụt ra đẩy vào không khí xung quanh',
        'lực hấp dẫn của các thiên thể',
        'không có lực cản của không khí',
      ],
      answer: 0,
      hints: ['Trong chân không có gì để khí đẩy vào không?'],
      solution:
        'Khí phụt ra mang động lượng về phía sau, tên lửa nhận động lượng ngược lại về phía trước: chuyển động bằng phản lực, không cần môi trường xung quanh.',
    },
  ],
  takeaways: [
    'Hệ kín: không có ngoại lực, hoặc các ngoại lực cân bằng nhau; nội lực rất lớn so với ngoại lực thì coi hệ là kín.',
    'Định luật: động lượng toàn phần của hệ kín không đổi, $m_1\\vec{v_1} + m_2\\vec{v_2} = m_1\\vec{v_1^{\\prime}} + m_2\\vec{v_2^{\\prime}}$.',
    'Va chạm đàn hồi giữ nguyên động năng của hệ; va chạm mềm làm động năng giảm, và hai vật có chung vận tốc $V = \\dfrac{m_1v_1 + m_2v_2}{m_1 + m_2}$.',
    'Chuyển động bằng phản lực: trong hệ kín ban đầu đứng yên, một phần của hệ chuyển động theo một hướng thì phần còn lại chuyển động theo hướng ngược lại.',
  ],
};
