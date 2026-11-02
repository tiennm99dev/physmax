/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Trọng lực P = mg đặt tại trọng tâm của vật, cách xác định trọng tâm và đặc điểm của lực căng dây, tính lực căng khi treo vật bằng một hoặc hai dây.',
  intro:
    'Một chiếc đèn nặng được treo bằng hai sợi dây chéo. Kéo hai sợi dây dang rộng ra, đèn vẫn nặng như cũ nhưng dây lại dễ đứt hơn. Vì sao vậy? Muốn trả lời, ta cần hiểu trọng lực và lực căng.',
  objectives: [
    'Nêu được trọng lực là gì, viết được công thức $P = mg$.',
    'Nêu được khái niệm trọng tâm và cách xác định trọng tâm của vật mỏng phẳng.',
    'Nêu được đặc điểm của lực căng dây.',
    'Tính được lực căng khi vật được treo cân bằng bằng một hoặc hai dây.',
  ],
  sections: [
    {
      heading: 'Trọng lực',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Trọng lực',
          text: 'Trọng lực là lực hấp dẫn do Trái Đất tác dụng lên vật, gây ra cho vật gia tốc rơi tự do. Trọng lực có phương thẳng đứng, chiều từ trên xuống và điểm đặt tại trọng tâm của vật.',
        },
        {
          type: 'p',
          text: 'Áp dụng định luật 2 Newton cho vật rơi tự do, độ lớn của trọng lực, còn gọi là trọng lượng của vật, là:',
        },
        { type: 'tex', tex: 'P = mg' },
        {
          type: 'p',
          text: 'Gần mặt đất thường lấy $g \\approx 9{,}8$ m/s². Trọng lượng của vật thay đổi theo nơi đặt vật vì $g$ thay đổi, còn khối lượng của vật thì không đổi. Lên Mặt Trăng ($g \\approx 1{,}6$ m/s²), trọng lượng của vật giảm đi khoảng $6$ lần.',
        },
      ],
    },
    {
      heading: 'Trọng tâm của vật',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Trọng tâm',
          text: 'Trọng tâm là điểm đặt của trọng lực của vật. Với vật mỏng phẳng đồng chất có hình dạng đối xứng, trọng tâm trùng với tâm đối xứng của vật.',
        },
        {
          type: 'p',
          text: 'Với vật mỏng phẳng bất kì, có thể tìm trọng tâm bằng cách treo: buộc dây vào một điểm trên vật, khi vật đứng yên thì trọng lực và lực căng cân bằng, nên trọng tâm nằm trên đường kéo dài của dây. Treo ở một điểm khác, ta được đường thứ hai; giao điểm của hai đường là trọng tâm.',
        },
        { type: 'widget', name: 'trong-tam' },
      ],
    },
    {
      heading: 'Lực căng',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Lực căng dây',
          text: 'Khi dây bị kéo căng, nó tác dụng lên hai vật gắn với hai đầu dây những lực căng. Lực căng có điểm đặt là điểm mà đầu dây tiếp xúc với vật, phương trùng với chính sợi dây, chiều hướng từ hai đầu dây vào phần giữa của sợi dây.',
        },
        {
          type: 'p',
          text: 'Với dây nhẹ, lực căng tại mọi điểm trên dây có cùng độ lớn. Mỗi sợi dây chỉ chịu được một lực căng tối đa, vượt quá giới hạn đó thì dây đứt.',
        },
        {
          type: 'table',
          caption: 'Vật khối lượng $m$ treo đứng yên',
          head: ['Cách treo', 'Điều kiện cân bằng', 'Lực căng'],
          rows: [
            ['Một dây thẳng đứng', '$T = P$', '$T = mg$'],
            [
              'Hai dây đối xứng, mỗi dây hợp với phương thẳng đứng góc $\\alpha$',
              '$2T\\cos\\alpha = P$',
              '$T = \\dfrac{mg}{2\\cos\\alpha}$',
            ],
          ],
        },
      ],
    },
  ],
  explore: {
    title: 'Treo vật bằng dây',
    instruction:
      'Đổi cách treo, khối lượng và góc của dây. Quan sát hai mũi tên lực căng thay đổi trong khi trọng lực giữ nguyên, và hợp lực của chúng (nét đứt) luôn cân bằng với $\\vec{P}$.',
  },
  examples: [
    {
      problem:
        'Một vật có khối lượng $2{,}5$ kg. Tính trọng lượng của vật ở Trái Đất ($g = 9{,}8$ m/s²) và trên Mặt Trăng ($g = 1{,}6$ m/s²).',
      steps: [
        'Ở Trái Đất: $P = mg = 2{,}5 \\cdot 9{,}8 = 24{,}5$ N.',
        'Trên Mặt Trăng: $P = 2{,}5 \\cdot 1{,}6 = 4$ N. Khối lượng vẫn là $2{,}5$ kg.',
      ],
      answer: '$24{,}5$ N ở Trái Đất và $4$ N trên Mặt Trăng.',
    },
    {
      problem:
        'Một đèn khối lượng $3$ kg được treo bằng hai dây đối xứng, mỗi dây hợp với phương thẳng đứng góc $30^\\circ$. Tính lực căng mỗi dây. Lấy $g = 9{,}8$ m/s².',
      steps: [
        'Trọng lực: $P = 3 \\cdot 9{,}8 = 29{,}4$ N.',
        'Đèn cân bằng nên hợp lực của hai lực căng có độ lớn bằng $P$, hướng lên: $2T\\cos 30^\\circ = P$.',
        '$T = \\dfrac{29{,}4}{2 \\cdot \\cos 30^\\circ} = \\dfrac{29{,}4}{\\sqrt{3}} \\approx 17{,}0$ N.',
      ],
      answer: 'Lực căng mỗi dây khoảng $17{,}0$ N.',
    },
    {
      problem:
        'Dây kéo vật $2$ kg đi lên nhanh dần đều với gia tốc $1$ m/s². Tính lực căng dây. Lấy $g = 9{,}8$ m/s².',
      steps: [
        'Chọn chiều dương hướng lên. Vật chịu lực căng $T$ hướng lên và trọng lực $P$ hướng xuống.',
        'Theo định luật 2 Newton: $T - P = ma$.',
        '$T = mg + ma = 2 \\cdot 9{,}8 + 2 \\cdot 1 = 21{,}6$ N.',
      ],
      answer: '$T = 21{,}6$ N, lớn hơn trọng lực vì vật có gia tốc hướng lên.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt: 'Tính trọng lượng của một người có khối lượng $50$ kg. Lấy $g = 9{,}8$ m/s².',
      answer: 490,
      unit: 'N',
      hints: ['$P = mg$.'],
      solution: '$P = 50 \\cdot 9{,}8 = 490$ N.',
    },
    {
      type: 'number',
      prompt:
        'Một nhà du hành khối lượng $60$ kg đứng trên Mặt Trăng, nơi $g = 1{,}6$ m/s². Tính trọng lượng của người đó.',
      answer: 96,
      unit: 'N',
      hints: ['Khối lượng không đổi, chỉ có $g$ thay đổi.'],
      solution: '$P = 60 \\cdot 1{,}6 = 96$ N.',
    },
    {
      type: 'number',
      prompt:
        'Một vật $4$ kg treo đứng yên bằng một sợi dây. Tính lực căng dây. Lấy $g = 9{,}8$ m/s².',
      answer: 39.2,
      tolerance: 0.01,
      unit: 'N',
      hints: ['Vật cân bằng dưới tác dụng của những lực nào?'],
      solution: 'Vật đứng yên nên $T = P = 4 \\cdot 9{,}8 = 39{,}2$ N.',
    },
    {
      type: 'number',
      prompt:
        'Vật $5$ kg treo bằng hai dây đối xứng, mỗi dây hợp với phương thẳng đứng góc $60^\\circ$. Tính lực căng mỗi dây. Lấy $g = 9{,}8$ m/s².',
      answer: 49,
      tolerance: 0.01,
      unit: 'N',
      hints: ['$2T\\cos\\alpha = P$.', '$\\cos 60^\\circ = 0{,}5$.'],
      solution: '$P = 49$ N và $2T \\cdot 0{,}5 = 49$, nên $T = 49$ N.',
    },
    {
      type: 'number',
      prompt:
        'Vật có trọng lực $49$ N treo bằng hai dây vuông góc với nhau, dây thứ nhất hợp với phương thẳng đứng góc $60^\\circ$, dây thứ hai góc $30^\\circ$. Tính lực căng dây thứ nhất.',
      answer: 24.5,
      tolerance: 0.01,
      unit: 'N',
      hints: [
        'Hợp lực của hai lực căng là đường chéo của hình chữ nhật, có độ lớn bằng $P$.',
        'Dây lệch nhiều so với phương thẳng đứng gánh ít hơn: lấy thành phần của $P$ theo phương của dây.',
      ],
      solution:
        'Hai dây vuông góc nên $T_1$ là hình chiếu của hợp lực lên dây thứ nhất: $T_1 = P\\cos 60^\\circ = 49 \\cdot 0{,}5 = 24{,}5$ N.',
    },
    {
      type: 'number',
      prompt:
        'Dây kéo vật $10$ kg đi lên nhanh dần đều với gia tốc $0{,}5$ m/s². Tính lực căng dây. Lấy $g = 9{,}8$ m/s².',
      answer: 103,
      tolerance: 0.01,
      unit: 'N',
      hints: ['Viết định luật 2 Newton với chiều dương hướng lên.'],
      solution: '$T - mg = ma$, nên $T = 10 \\cdot 9{,}8 + 10 \\cdot 0{,}5 = 103$ N.',
    },
    {
      type: 'choice',
      prompt:
        'Khi dang rộng hai dây treo một vật (góc với phương thẳng đứng tăng), lực căng mỗi dây',
      options: ['giảm đi.', 'không đổi.', 'tăng lên.', 'bằng không.'],
      answer: 2,
      hints: ['Xét $T = \\dfrac{P}{2\\cos\\alpha}$ khi $\\alpha$ tăng.'],
      solution: '$\\alpha$ tăng thì $\\cos\\alpha$ giảm, nên $T$ tăng trong khi $P$ không đổi.',
    },
    {
      type: 'choice',
      prompt: 'Trọng tâm của một chiếc nhẫn tròn đồng chất nằm ở đâu?',
      options: [
        'Trên vành nhẫn.',
        'Tại tâm của nhẫn, nằm ngoài phần vật chất.',
        'Không xác định được.',
        'Tại điểm thấp nhất của nhẫn.',
      ],
      answer: 1,
      hints: ['Nhẫn đồng chất đối xứng qua điểm nào?'],
      solution:
        'Vật đồng chất đối xứng có trọng tâm tại tâm đối xứng. Với nhẫn, điểm đó nằm ngoài phần vật chất.',
    },
    {
      type: 'multi',
      prompt: 'Chọn các đặc điểm đúng của lực căng dây tác dụng lên vật.',
      options: [
        'Phương trùng với sợi dây.',
        'Chiều hướng từ vật vào phần giữa sợi dây.',
        'Điểm đặt tại trọng tâm của vật.',
        'Có thể đẩy vật ra xa dây.',
      ],
      answers: [0, 1],
      hints: ['Dây chỉ có thể kéo, không thể đẩy.'],
      solution:
        'Lực căng có phương theo dây, chiều từ đầu dây vào giữa dây, điểm đặt là chỗ đầu dây tiếp xúc với vật. Dây không thể đẩy.',
    },
    {
      type: 'choice',
      prompt: 'Phát biểu nào sau đây đúng?',
      options: [
        'Khối lượng của vật thay đổi khi đưa vật lên Mặt Trăng.',
        'Trọng lượng của vật không phụ thuộc vào nơi đặt vật.',
        'Trọng lượng của vật thay đổi theo $g$, còn khối lượng thì không đổi.',
        'Trọng lực luôn có phương vuông góc với mặt đỡ.',
      ],
      answer: 2,
      hints: ['Trọng lượng $P = mg$ phụ thuộc vào đại lượng nào thay đổi theo nơi đặt vật?'],
      solution:
        'Khối lượng là đặc trưng của vật, không đổi; $g$ thay đổi theo vị trí nên trọng lượng thay đổi. Trọng lực luôn có phương thẳng đứng.',
    },
  ],
  takeaways: [
    'Trọng lực có phương thẳng đứng, chiều từ trên xuống, đặt tại trọng tâm; độ lớn $P = mg$.',
    'Trọng tâm của vật mỏng phẳng là giao điểm của các đường dây treo kéo dài khi treo ở các điểm khác nhau.',
    'Lực căng có phương theo dây, chiều từ hai đầu dây vào giữa dây.',
    'Hai dây đối xứng: $T = \\dfrac{mg}{2\\cos\\alpha}$; góc càng lớn, lực căng càng lớn.',
  ],
};
