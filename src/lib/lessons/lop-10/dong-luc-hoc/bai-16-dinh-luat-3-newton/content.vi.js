/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Định luật 3 Newton: hai vật tương tác với nhau bằng hai lực cùng phương, ngược chiều, cùng độ lớn, đặt vào hai vật khác nhau; đặc điểm của lực và phản lực.',
  intro:
    'Trên sân băng, một bạn đẩy bạn kia. Chỉ một người đẩy, nhưng cả hai đều trượt ra xa. Người đẩy cũng chịu một lực, vậy lực ấy từ đâu ra và lớn bao nhiêu?',
  objectives: [
    'Phát biểu được định luật 3 Newton và viết được hệ thức của định luật.',
    'Nêu được đặc điểm của lực và phản lực.',
    'Phân biệt được cặp lực và phản lực với cặp lực cân bằng.',
    'Vận dụng định luật giải thích các hiện tượng thực tế.',
  ],
  sections: [
    {
      heading: 'Sự tương tác giữa các vật',
      blocks: [
        {
          type: 'p',
          text: 'Lực không bao giờ xuất hiện đơn lẻ. Khi vật này tác dụng lực lên vật kia, vật kia cũng tác dụng lại một lực: búa đập vào đinh thì đinh cũng đập lại búa, chân đạp lên đất thì đất cũng đẩy lại chân. Tác dụng giữa các vật luôn có tính hai chiều, gọi là sự tương tác.',
        },
        {
          type: 'p',
          text: 'Móc hai lực kế vào nhau rồi kéo hai đầu theo hai chiều ngược nhau, ta thấy hai lực kế luôn chỉ cùng một số đo, dù kéo mạnh hay nhẹ, dù kéo một đầu hay cả hai đầu.',
        },
      ],
    },
    {
      heading: 'Định luật 3 Newton',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Định luật 3 Newton',
          text: 'Khi vật $A$ tác dụng lên vật $B$ một lực, vật $B$ cũng tác dụng lại vật $A$ một lực. Hai lực này cùng phương, ngược chiều, cùng độ lớn và đặt vào hai vật khác nhau.',
        },
        { type: 'tex', tex: '\\vec{F}_{AB} = -\\vec{F}_{BA}' },
        {
          type: 'p',
          text: 'Ở đây $\\vec{F}_{AB}$ là lực do $A$ tác dụng lên $B$, còn $\\vec{F}_{BA}$ là lực do $B$ tác dụng lên $A$.',
        },
      ],
    },
    {
      heading: 'Lực và phản lực',
      blocks: [
        {
          type: 'p',
          text: 'Trong tương tác giữa hai vật, một lực gọi là lực tác dụng, lực kia gọi là phản lực. Cặp lực và phản lực có những đặc điểm sau:',
        },
        {
          type: 'list',
          items: [
            'Luôn xuất hiện hoặc mất đi đồng thời.',
            'Cùng phương, ngược chiều, cùng độ lớn và cùng bản chất (cùng là lực hấp dẫn, cùng là lực đàn hồi, ...).',
            'Đặt vào hai vật khác nhau, nên không cân bằng nhau.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Dễ nhầm',
          text: 'Hai lực có cùng độ lớn không có nghĩa là hai vật chuyển động như nhau. Mỗi vật có gia tốc riêng $a = \\dfrac{F}{m}$, nên vật nhẹ thu gia tốc lớn hơn. Quả táo và Trái Đất hút nhau bằng hai lực như nhau, nhưng ta chỉ thấy quả táo rơi.',
        },
        {
          type: 'table',
          caption: 'Quyển sách nằm yên trên mặt bàn',
          head: ['Tiêu chí', 'Lực và phản lực', 'Hai lực cân bằng'],
          rows: [
            ['Đặt vào', 'Hai vật khác nhau', 'Cùng một vật'],
            [
              'Ví dụ',
              'Sách đè lên bàn, bàn đẩy lại sách',
              'Trọng lực của sách, lực nâng của bàn lên sách',
            ],
            ['Bản chất', 'Luôn cùng bản chất', 'Có thể khác bản chất'],
          ],
        },
        { type: 'widget', name: 'cap-luc' },
      ],
    },
  ],
  explore: {
    title: 'Hai người trượt băng đẩy nhau',
    instruction:
      'Chọn ai đẩy, đổi khối lượng và lực đẩy rồi bấm Đẩy nhau. Theo dõi hai lực kế trong lúc đẩy, rồi so sánh gia tốc và vận tốc của hai người.',
  },
  examples: [
    {
      problem:
        'Hai người trên sân băng có khối lượng $50$ kg và $60$ kg đẩy nhau. Trong lúc đẩy, người $50$ kg chịu lực $120$ N. Tính lực mà người $60$ kg chịu và gia tốc của mỗi người.',
      steps: [
        'Theo định luật 3 Newton, người $60$ kg cũng chịu lực $120$ N, ngược chiều.',
        'Người $50$ kg: $a_1 = \\dfrac{120}{50} = 2{,}4$ m/s².',
        'Người $60$ kg: $a_2 = \\dfrac{120}{60} = 2$ m/s².',
      ],
      answer: 'Cùng lực $120$ N; $a_1 = 2{,}4$ m/s², $a_2 = 2$ m/s².',
    },
    {
      problem:
        'Quyển sách nằm yên trên bàn chịu trọng lực $\\vec{P}$ và lực nâng $\\vec{N}$ của bàn. Hai lực này có phải là cặp lực và phản lực không? Phản lực của $\\vec{P}$ và $\\vec{N}$ là những lực nào?',
      steps: [
        '$\\vec{P}$ và $\\vec{N}$ cùng đặt vào sách, nên chúng là hai lực cân bằng, không phải lực và phản lực.',
        '$\\vec{P}$ là lực Trái Đất hút sách, nên phản lực của nó là lực sách hút Trái Đất, đặt vào Trái Đất.',
        '$\\vec{N}$ là lực bàn đẩy sách, nên phản lực của nó là lực sách đè lên bàn, đặt vào bàn.',
      ],
      answer:
        'Không. Phản lực của $\\vec{P}$ đặt vào Trái Đất, phản lực của $\\vec{N}$ đặt vào bàn.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Cặp lực và phản lực trong định luật 3 Newton',
      options: [
        'đặt vào cùng một vật.',
        'đặt vào hai vật khác nhau.',
        'có thể khác độ lớn.',
        'không xuất hiện cùng lúc.',
      ],
      answer: 1,
      hints: ['Nếu đặt vào cùng một vật thì chúng sẽ thành hai lực gì?'],
      solution:
        'Lực và phản lực luôn đặt vào hai vật khác nhau, cùng độ lớn và xuất hiện đồng thời.',
    },
    {
      type: 'number',
      prompt:
        'Trong một vụ va chạm, xe tải tác dụng lên xe con một lực $5\\,000$ N. Xe con tác dụng lên xe tải một lực bao nhiêu?',
      answer: 5000,
      unit: 'N',
      hints: ['Khối lượng hai xe có ảnh hưởng đến độ lớn lực tương tác không?'],
      solution: 'Theo định luật 3 Newton, hai lực có cùng độ lớn: $5\\,000$ N.',
    },
    {
      type: 'number',
      prompt:
        'Hai người $40$ kg và $60$ kg đẩy nhau trên sân băng. Người $40$ kg có gia tốc $3$ m/s². Tính gia tốc của người $60$ kg.',
      answer: 2,
      unit: 'm/s²',
      hints: ['Tính lực tương tác từ người $40$ kg.', 'Người $60$ kg chịu lực cùng độ lớn.'],
      solution: '$F = 40 \\cdot 3 = 120$ N, nên $a_2 = \\dfrac{120}{60} = 2$ m/s².',
    },
    {
      type: 'number',
      prompt:
        'Xe $A$ khối lượng $1$ kg va chạm xe $B$ khối lượng $2$ kg trong $0{,}2$ s. Vận tốc xe $A$ thay đổi $6$ m/s. Vận tốc xe $B$ thay đổi bao nhiêu?',
      answer: 3,
      unit: 'm/s',
      hints: [
        'Tính gia tốc và lực tác dụng lên xe $A$.',
        'Xe $B$ chịu lực cùng độ lớn, trong cùng thời gian.',
      ],
      solution:
        '$a_A = \\dfrac{6}{0{,}2} = 30$ m/s², $F = 1 \\cdot 30 = 30$ N. Khi đó $a_B = \\dfrac{30}{2} = 15$ m/s², nên $\\Delta v_B = 15 \\cdot 0{,}2 = 3$ m/s.',
    },
    {
      type: 'multi',
      prompt: 'Chọn các đặc điểm đúng của cặp lực và phản lực.',
      options: [
        'Cùng phương, ngược chiều.',
        'Cùng độ lớn.',
        'Cùng bản chất.',
        'Cân bằng nhau.',
        'Xuất hiện và mất đi đồng thời.',
      ],
      answers: [0, 1, 2, 4],
      hints: ['Hai lực muốn cân bằng thì phải cùng đặt vào đâu?'],
      solution:
        'Lực và phản lực có tất cả các đặc điểm trên, trừ việc cân bằng nhau: chúng đặt vào hai vật khác nhau nên không thể cân bằng.',
    },
    {
      type: 'choice',
      prompt: 'Quyển sách nằm trên bàn. Phản lực của trọng lực tác dụng lên sách là',
      options: [
        'lực nâng của bàn lên sách.',
        'lực sách đè lên bàn.',
        'lực sách hút Trái Đất.',
        'lực bàn đè lên sàn nhà.',
      ],
      answer: 2,
      hints: ['Trọng lực là lực do vật nào tác dụng lên sách?'],
      solution:
        'Trọng lực là lực Trái Đất hút sách, nên phản lực là lực sách hút Trái Đất, đặt vào Trái Đất. Lực nâng của bàn cũng đặt vào sách nên không phải phản lực của trọng lực.',
    },
    {
      type: 'choice',
      prompt: 'Người đi bộ tiến được về phía trước là nhờ',
      options: [
        'lực chân đạp vào đất.',
        'phản lực của đất đẩy chân về phía trước.',
        'trọng lực của người.',
        'quán tính của người.',
      ],
      answer: 1,
      hints: ['Muốn người tăng tốc, lực phải đặt vào vật nào?'],
      solution:
        'Chân đạp đất về phía sau, lực này đặt vào đất. Phản lực của đất đặt vào người, hướng về phía trước, làm người tiến lên.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi lực với phản lực của nó.',
      left: [
        'Búa đập vào đinh',
        'Trái Đất hút Mặt Trăng',
        'Tay kéo dây',
        'Khí phụt ra bị tên lửa đẩy về sau',
      ],
      right: [
        'Đinh đập lại búa',
        'Mặt Trăng hút Trái Đất',
        'Dây kéo lại tay',
        'Khí đẩy tên lửa về phía trước',
      ],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['Đổi chỗ hai vật trong câu là có phản lực.'],
      solution:
        'Mỗi cặp là tương tác giữa hai vật: đổi vai vật tác dụng và vật chịu lực sẽ được phản lực.',
    },
  ],
  takeaways: [
    'Lực luôn xuất hiện thành cặp: $\\vec{F}_{AB} = -\\vec{F}_{BA}$.',
    'Lực và phản lực cùng phương, ngược chiều, cùng độ lớn, cùng bản chất, xuất hiện và mất đi đồng thời.',
    'Chúng đặt vào hai vật khác nhau nên không cân bằng nhau; hai lực cân bằng thì đặt vào cùng một vật.',
    'Cùng độ lớn lực, vật có khối lượng nhỏ hơn thu gia tốc lớn hơn.',
  ],
};
