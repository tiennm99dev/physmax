/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Năng lượng có nhiều dạng, truyền và chuyển hoá được; công của lực không đổi A = F.s.cosα, dương là công phát động, âm là công cản.',
  intro:
    'Vận động viên nâng tạ từ sàn lên cao rồi giữ yên trên đầu. Động tác nào mệt hơn? Trong đời sống, cả hai đều gọi là "làm việc", nhưng trong Vật lí chỉ một động tác sinh công. Vì sao, và công liên hệ thế nào với năng lượng?',
  objectives: [
    'Nêu được các dạng năng lượng, tính chất của năng lượng và các cách truyền năng lượng.',
    'Hiểu sinh công là một cách truyền năng lượng; viết được công thức $A = F\\,s\\cos\\alpha$ và đơn vị jun.',
    'Phân biệt được công phát động, công cản và trường hợp lực không sinh công.',
    'Vận dụng được công thức tính công trong các bài toán đơn giản.',
  ],
  sections: [
    {
      heading: 'Năng lượng',
      blocks: [
        {
          type: 'p',
          text: 'Năng lượng có ở xung quanh ta và trong mọi vật: động năng của xe đang chạy, thế năng của nước trên đỉnh đập, hoá năng của xăng, nhiệt năng của nước nóng, điện năng, quang năng của ánh sáng, năng lượng hạt nhân.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Tính chất của năng lượng',
          text: 'Năng lượng là một đại lượng vô hướng; có thể tồn tại ở những dạng khác nhau; có thể truyền từ vật này sang vật khác hoặc chuyển hoá từ dạng này sang dạng khác; tổng năng lượng được bảo toàn. Đơn vị của năng lượng trong hệ SI là jun (J).',
        },
        {
          type: 'p',
          text: 'Năng lượng có thể được truyền bằng nhiều cách: thực hiện công, truyền nhiệt và phát ra bức xạ. Ngoài jun, người ta còn dùng calo khi nói về nhiệt lượng: $1$ cal xấp xỉ $4{,}2$ J.',
        },
        { type: 'widget', name: 'truyen-nang-luong' },
      ],
    },
    {
      heading: 'Công cơ học',
      blocks: [
        {
          type: 'p',
          text: 'Một lực sinh công khi điểm đặt của nó dịch chuyển. Sinh công là một cách truyền năng lượng: động cơ điện kéo thang máy đi lên đã truyền năng lượng cho thang máy bằng cách thực hiện công.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Công thức tính công',
          text: 'Khi lực $\\vec{F}$ không đổi tác dụng lên vật và điểm đặt của lực chuyển dời một đoạn $s$ theo hướng hợp với hướng của lực góc $\\alpha$ thì công của lực là $A = F\\,s\\cos\\alpha$.',
        },
        {
          type: 'p',
          text: 'Trong công thức, $F$ tính bằng niutơn (N), $s$ bằng mét (m), $A$ bằng jun (J). Thành phần $F\\cos\\alpha$ của lực dọc theo hướng chuyển dời mới là phần sinh công.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Đơn vị công',
          text: 'Jun là công do lực có độ lớn $1$ N thực hiện khi điểm đặt của lực chuyển dời $1$ m theo hướng của lực: $1\\text{ J} = 1\\text{ N}\\cdot\\text{m}$. Bội số thường dùng là kilôjun: $1$ kJ $= 1\\,000$ J.',
        },
      ],
    },
    {
      heading: 'Công phát động và công cản',
      blocks: [
        {
          type: 'p',
          text: 'Dấu của công phụ thuộc vào $\\cos\\alpha$, tức là vào góc giữa lực và hướng chuyển dời.',
        },
        {
          type: 'table',
          head: ['Góc $\\alpha$', 'Dấu của $\\cos\\alpha$', 'Công $A$', 'Tên gọi'],
          rows: [
            ['$0^\\circ \\le \\alpha < 90^\\circ$', 'dương', '$A > 0$', 'công phát động'],
            ['$\\alpha = 90^\\circ$', 'bằng $0$', '$A = 0$', 'lực không sinh công'],
            ['$90^\\circ < \\alpha \\le 180^\\circ$', 'âm', '$A < 0$', 'công cản'],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Trở lại với vận động viên',
          text: 'Khi nâng tạ lên, lực của tay cùng hướng với chuyển dời nên sinh công. Khi giữ tạ đứng yên, $s = 0$ nên $A = 0$: cơ bắp vẫn mỏi, nhưng lực nâng không sinh công lên tạ.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Dễ nhầm',
          text: 'Trong $A = F\\,s\\cos\\alpha$, góc $\\alpha$ là góc giữa lực và hướng chuyển dời, không phải góc giữa lực và phương ngang. Hai góc này chỉ trùng nhau khi vật chuyển dời theo phương ngang.',
        },
      ],
    },
  ],
  explore: {
    title: 'Xoay lực, đọc công',
    instruction:
      'Kéo đầu mũi tên $\\vec{F}$ để xoay lực (hoặc dùng phím mũi tên). Tìm góc làm công bằng $0$, góc làm công lớn nhất và góc làm công âm mạnh nhất.',
  },
  examples: [
    {
      problem:
        'Một người kéo thùng hàng trên sàn ngang bằng dây chếch lên, lực kéo $F = 100$ N hợp với phương ngang góc $60^\\circ$. Thùng dịch chuyển $20$ m theo phương ngang. Tính công của lực kéo.',
      steps: [
        'Thùng chuyển dời theo phương ngang nên góc giữa lực và hướng chuyển dời là $\\alpha = 60^\\circ$.',
        '$A = F\\,s\\cos\\alpha = 100 \\cdot 20 \\cdot \\cos 60^\\circ = 100 \\cdot 20 \\cdot 0{,}5$.',
        '$A = 1\\,000$ J, dương nên đây là công phát động.',
      ],
      answer: '$A = 1\\,000$ J.',
    },
    {
      problem:
        'Ô tô trượt thẳng trên đường ngang khi phanh, lực ma sát có độ lớn $2\\,000$ N. Tính công của lực ma sát, công của trọng lực và công của phản lực trên đoạn đường $25$ m.',
      steps: [
        'Lực ma sát ngược hướng chuyển dời: $\\alpha = 180^\\circ$, $\\cos\\alpha = -1$.',
        '$A_{ms} = 2\\,000 \\cdot 25 \\cdot (-1) = -50\\,000$ J: công cản.',
        'Trọng lực và phản lực đều vuông góc với hướng chuyển dời: $\\alpha = 90^\\circ$ nên công của chúng bằng $0$.',
      ],
      answer: '$A_{ms} = -50\\,000$ J; $A_P = A_N = 0$.',
    },
    {
      problem:
        'Vận động viên nâng đều quả tạ $100$ kg từ sàn lên độ cao $2$ m rồi giữ yên. Lấy $g = 9{,}8$ m/s². Tính công của lực nâng trong mỗi giai đoạn.',
      steps: [
        'Nâng đều: lực nâng cân bằng với trọng lực, $F = mg = 100 \\cdot 9{,}8 = 980$ N, cùng hướng chuyển dời ($\\alpha = 0^\\circ$).',
        'Giai đoạn nâng: $A_1 = 980 \\cdot 2 \\cdot 1 = 1\\,960$ J.',
        'Giai đoạn giữ yên: $s = 0$ nên $A_2 = 0$.',
      ],
      answer: '$A_1 = 1\\,960$ J; $A_2 = 0$.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Đơn vị của năng lượng và của công trong hệ SI là',
      options: ['jun (J)', 'oát (W)', 'niutơn (N)', 'calo (cal)'],
      answer: 0,
      hints: ['Oát là đơn vị của công suất, niutơn là đơn vị của lực.'],
      solution:
        'Công và năng lượng đều đo bằng jun (J); $1$ J $= 1$ N.m. Calo thường dùng cho nhiệt lượng và không thuộc hệ SI.',
    },
    {
      type: 'number',
      prompt:
        'Lực $F = 50$ N kéo vật dịch chuyển $10$ m theo đúng hướng của lực. Tính công của lực.',
      answer: 500,
      unit: 'J',
      hints: ['Lực cùng hướng chuyển dời thì $\\alpha = 0^\\circ$.', '$\\cos 0^\\circ = 1$.'],
      solution: '$A = F\\,s\\cos 0^\\circ = 50 \\cdot 10 \\cdot 1 = 500$ J.',
    },
    {
      type: 'number',
      prompt:
        'Lực $F = 100$ N hợp với hướng chuyển dời góc $30^\\circ$, vật dịch chuyển $10$ m. Tính công của lực (làm tròn đến jun).',
      answer: 866,
      tolerance: 1,
      unit: 'J',
      hints: ['$\\cos 30^\\circ = \\dfrac{\\sqrt{3}}{2} \\approx 0{,}866$.'],
      solution:
        '$A = 100 \\cdot 10 \\cdot \\cos 30^\\circ \\approx 1\\,000 \\cdot 0{,}866 = 866$ J.',
    },
    {
      type: 'choice',
      prompt:
        'Một người xách túi đi đều trên đường ngang, lực xách hướng thẳng đứng lên trên. Công của lực xách',
      options: ['bằng $0$', 'dương', 'âm', 'không xác định được'],
      answer: 0,
      hints: ['Tìm góc giữa lực xách và hướng đi của người.'],
      solution:
        'Lực xách vuông góc với hướng chuyển dời: $\\alpha = 90^\\circ$, $\\cos\\alpha = 0$ nên $A = 0$.',
    },
    {
      type: 'number',
      prompt: 'Vật trượt $3$ m trên sàn, lực ma sát có độ lớn $40$ N. Tính công của lực ma sát.',
      answer: -120,
      unit: 'J',
      hints: ['Lực ma sát ngược hướng chuyển dời, $\\alpha = 180^\\circ$.', 'Công có dấu.'],
      solution: '$A = 40 \\cdot 3 \\cdot \\cos 180^\\circ = -120$ J.',
    },
    {
      type: 'multi',
      prompt: 'Những lực nào dưới đây sinh công cản?',
      options: [
        'Lực ma sát khi vật trượt trên sàn',
        'Trọng lực khi quả bóng được ném thẳng đứng lên cao',
        'Trọng lực khi quả táo rơi xuống',
        'Lực kéo của động cơ khi xe tăng tốc',
      ],
      answers: [0, 1],
      hints: ['Công cản khi lực có thành phần ngược hướng chuyển dời ($\\alpha > 90^\\circ$).'],
      solution:
        'Ma sát ngược hướng trượt và trọng lực ngược hướng đi lên của bóng nên sinh công cản. Trọng lực khi táo rơi và lực kéo động cơ cùng hướng chuyển dời nên sinh công phát động.',
    },
    {
      type: 'match',
      prompt: 'Ghép mỗi góc giữa lực và hướng chuyển dời với kết luận về công.',
      left: ['$\\alpha = 45^\\circ$', '$\\alpha = 90^\\circ$', '$\\alpha = 150^\\circ$'],
      right: ['$A > 0$, công phát động', '$A = 0$, lực không sinh công', '$A < 0$, công cản'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
      hints: ['Xét dấu của $\\cos\\alpha$ ở mỗi góc.'],
      solution:
        '$\\cos 45^\\circ > 0$ nên công phát động; $\\cos 90^\\circ = 0$ nên công bằng $0$; $\\cos 150^\\circ < 0$ nên công cản.',
    },
    {
      type: 'number',
      prompt:
        'Vật $2$ kg trượt xuống $5$ m dọc theo mặt phẳng nghiêng $30^\\circ$ so với phương ngang. Lấy $g = 9{,}8$ m/s². Tính công của trọng lực.',
      answer: 49,
      tolerance: 0.5,
      unit: 'J',
      hints: [
        'Trọng lực hướng thẳng đứng, chuyển dời dọc mặt nghiêng: góc giữa chúng không phải $30^\\circ$.',
        'Góc giữa trọng lực và hướng chuyển dời là $90^\\circ - 30^\\circ = 60^\\circ$.',
      ],
      solution:
        '$P = mg = 19{,}6$ N, $\\alpha = 60^\\circ$. $A = 19{,}6 \\cdot 5 \\cdot \\cos 60^\\circ = 49$ J.',
    },
    {
      type: 'number',
      prompt:
        'Lực không đổi cùng hướng chuyển dời đã thực hiện công $1\\,500$ J trên quãng đường $30$ m. Tính độ lớn của lực.',
      answer: 50,
      unit: 'N',
      hints: ['Rút $F$ từ $A = F\\,s$.'],
      solution: '$F = \\dfrac{A}{s} = \\dfrac{1\\,500}{30} = 50$ N.',
    },
  ],
  takeaways: [
    'Năng lượng có nhiều dạng, truyền và chuyển hoá được, đo bằng jun; sinh công là một cách truyền năng lượng.',
    'Công của lực không đổi: $A = F\\,s\\cos\\alpha$, với $\\alpha$ là góc giữa lực và hướng chuyển dời.',
    '$\\alpha < 90^\\circ$: công phát động; $\\alpha = 90^\\circ$: lực không sinh công; $\\alpha > 90^\\circ$: công cản.',
  ],
};
