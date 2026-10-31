/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Thấu kính là khối trong suốt giới hạn bởi hai mặt cong hoặc một mặt cong và một mặt phẳng; thấu kính rìa mỏng là thấu kính hội tụ, rìa dày là thấu kính phân kì. Mỗi thấu kính có trục chính, quang tâm, hai tiêu điểm và tiêu cự; dùng hai trong ba tia sáng đặc biệt để dựng ảnh và nêu tính chất ảnh của vật qua thấu kính.',
  intro:
    'Kính lúp, ống nhòm, máy ảnh, kính hiển vi và cả con mắt của chúng ta đều có một bộ phận chung: thấu kính. Có thấu kính cho ảnh to hơn vật, có thấu kính cho ảnh nhỏ hơn, có lúc ảnh lại lộn ngược. Ảnh của một vật qua thấu kính được tạo thành như thế nào?',
  objectives: [
    'Nhận biết được thấu kính hội tụ (rìa mỏng) và thấu kính phân kì (rìa dày).',
    'Chỉ ra được trục chính, quang tâm, tiêu điểm và tiêu cự của thấu kính.',
    'Vẽ được đường truyền của ba tia sáng đặc biệt qua thấu kính hội tụ và thấu kính phân kì.',
    'Dựng được ảnh của một vật qua thấu kính và nêu được tính chất của ảnh trong từng trường hợp.',
  ],
  sections: [
    {
      heading: 'Cấu tạo và phân loại thấu kính',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Thấu kính',
          text: 'Thấu kính là một khối trong suốt (thuỷ tinh, nhựa...) được giới hạn bởi hai mặt cong, hoặc một mặt cong và một mặt phẳng.',
        },
        {
          type: 'table',
          head: ['Loại thấu kính', 'Hình dạng', 'Kí hiệu'],
          rows: [
            [
              'Thấu kính hội tụ',
              'Phần rìa mỏng hơn phần giữa',
              'Đoạn thẳng có hai đầu mũi tên hướng ra ngoài',
            ],
            [
              'Thấu kính phân kì',
              'Phần rìa dày hơn phần giữa',
              'Đoạn thẳng có hai đầu mũi tên hướng vào trong',
            ],
          ],
        },
        {
          type: 'p',
          text: 'Chiếu một chùm sáng song song tới thấu kính hội tụ, chùm tia ló hội tụ tại một điểm. Với thấu kính phân kì, chùm tia ló loe rộng ra (phân kì).',
        },
      ],
    },
    {
      heading: 'Trục chính, quang tâm, tiêu điểm, tiêu cự',
      blocks: [
        {
          type: 'list',
          items: [
            'Trục chính $\\Delta$: đường thẳng đi qua tâm thấu kính và vuông góc với mặt thấu kính. Tia sáng tới dọc theo trục chính thì truyền thẳng.',
            'Quang tâm $O$: điểm chính giữa thấu kính, nằm trên trục chính. Mọi tia sáng tới quang tâm đều truyền thẳng, không đổi hướng.',
            "Tiêu điểm $F$ và $F'$: hai điểm nằm trên trục chính, ở hai bên thấu kính, cách đều quang tâm. Với thấu kính hội tụ, chùm tia tới song song với trục chính cho chùm tia ló hội tụ tại tiêu điểm $F'$; với thấu kính phân kì, chùm tia ló có đường kéo dài đi qua tiêu điểm.",
            "Tiêu cự $f$: khoảng cách từ quang tâm tới mỗi tiêu điểm, $f = OF = OF'$.",
          ],
        },
      ],
    },
    {
      heading: 'Đường truyền của các tia sáng đặc biệt',
      blocks: [
        {
          type: 'table',
          caption: 'Ba tia sáng đặc biệt',
          head: ['Tia tới', 'Thấu kính hội tụ', 'Thấu kính phân kì'],
          rows: [
            ['Qua quang tâm $O$', 'Truyền thẳng', 'Truyền thẳng'],
            [
              'Song song với trục chính',
              "Tia ló đi qua tiêu điểm $F'$",
              'Tia ló có đường kéo dài đi qua tiêu điểm nằm cùng phía với tia tới',
            ],
            [
              'Qua tiêu điểm $F$ (với thấu kính phân kì: hướng tới tiêu điểm ở bên kia thấu kính)',
              'Tia ló song song với trục chính',
              'Tia ló song song với trục chính',
            ],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Dựng ảnh của một vật',
          text: "Vật $AB$ đặt vuông góc với trục chính, $A$ nằm trên trục chính. Để dựng ảnh $B'$ của điểm $B$, vẽ hai trong ba tia đặc biệt xuất phát từ $B$; giao điểm của hai tia ló (hoặc của đường kéo dài của chúng) là $B'$. Từ $B'$ hạ đường vuông góc xuống trục chính, chân đường vuông góc là $A'$. $A'B'$ là ảnh của $AB$.",
        },
      ],
    },
    {
      heading: 'Tính chất ảnh của vật qua thấu kính',
      blocks: [
        {
          type: 'p',
          text: 'Gọi $d$ là khoảng cách từ vật đến thấu kính. Ảnh thật hứng được trên màn, ảnh ảo không hứng được trên màn mà chỉ nhìn thấy khi đặt mắt sau thấu kính.',
        },
        {
          type: 'table',
          caption: 'Ảnh của vật qua thấu kính hội tụ',
          head: ['Vị trí của vật', 'Tính chất của ảnh'],
          rows: [
            ['$d > 2f$', 'Ảnh thật, ngược chiều, nhỏ hơn vật'],
            ['$d = 2f$', 'Ảnh thật, ngược chiều, bằng vật (ảnh cách thấu kính $2f$)'],
            ['$f < d < 2f$', 'Ảnh thật, ngược chiều, lớn hơn vật'],
            ['$d = f$', 'Không có ảnh (chùm tia ló song song)'],
            ['$d < f$', 'Ảnh ảo, cùng chiều, lớn hơn vật'],
          ],
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Thấu kính phân kì',
          text: 'Vật đặt ở mọi vị trí trước thấu kính phân kì luôn cho ảnh ảo, cùng chiều, nhỏ hơn vật và luôn nằm trong khoảng tiêu cự của thấu kính.',
        },
        {
          type: 'p',
          text: "Ở phần Khám phá, em kéo vật dọc trục chính; ba tia đặc biệt và ảnh $A'B'$ tự vẽ lại. Đường nét đứt là đường kéo dài của tia ló và ảnh ảo.",
        },
      ],
    },
  ],
  explore: {
    title: 'Bàn quang học',
    instruction:
      "Kéo đỉnh $B$ của vật (hoặc chọn nó rồi dùng phím mũi tên) để dời vật dọc trục chính. Quan sát ba tia sáng đặc biệt và ảnh $A'B'$ màu tím khi vật ở xa hơn $2f$, đúng $2f$, giữa $f$ và $2f$, và trong khoảng tiêu cự. Dòng chữ dưới hình cho biết $d$, $d'$ và tỉ số $k$ giữa chiều cao ảnh và vật ($k < 0$ khi ảnh ngược chiều). Làm các thử thách để luyện tính chất ảnh.",
  },
  examples: [
    {
      problem:
        "Vật $AB$ cao $2$ cm đặt vuông góc với trục chính của thấu kính hội tụ tiêu cự $f = 10$ cm, cách thấu kính $d = 30$ cm. Dựng ảnh $A'B'$ và nêu tính chất của ảnh.",
      steps: [
        'Từ $B$ vẽ tia qua quang tâm $O$: tia này truyền thẳng.',
        "Từ $B$ vẽ tia song song với trục chính: tia ló đi qua tiêu điểm $F'$ ở phía sau thấu kính.",
        "Hai tia ló cắt nhau tại $B'$ ở phía sau thấu kính, dưới trục chính. Hạ $B'A'$ vuông góc với trục chính.",
        '$d = 30$ cm $> 2f = 20$ cm, nên ảnh là ảnh thật, ngược chiều và nhỏ hơn vật.',
      ],
      answer: "Ảnh $A'B'$ là ảnh thật, ngược chiều, nhỏ hơn vật.",
    },
    {
      problem:
        'Đặt vật $AB$ trước thấu kính hội tụ tiêu cự $12$ cm, cách thấu kính $24$ cm. Ảnh cách thấu kính bao nhiêu, và có tính chất gì?',
      steps: [
        '$d = 24$ cm $= 2 \\cdot 12$ cm $= 2f$.',
        'Khi $d = 2f$, ảnh thật, ngược chiều, bằng vật và cũng cách thấu kính một khoảng $2f$.',
      ],
      answer: 'Ảnh thật, ngược chiều, bằng vật, cách thấu kính $24$ cm.',
    },
    {
      problem:
        'Vật $AB$ đặt trước thấu kính phân kì tiêu cự $10$ cm, cách thấu kính $20$ cm. Dựng ảnh và nêu tính chất ảnh.',
      steps: [
        'Từ $B$ vẽ tia qua quang tâm $O$: truyền thẳng.',
        'Từ $B$ vẽ tia song song với trục chính: tia ló loe ra, có đường kéo dài đi qua tiêu điểm ở cùng phía với vật.',
        "Tia ló thứ nhất và đường kéo dài của tia ló thứ hai cắt nhau tại $B'$ ở cùng phía với vật, giữa quang tâm và tiêu điểm.",
      ],
      answer: "Ảnh $A'B'$ là ảnh ảo, cùng chiều, nhỏ hơn vật, nằm trong khoảng tiêu cự.",
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Thấu kính hội tụ là thấu kính có',
      options: [
        'phần rìa dày hơn phần giữa',
        'phần rìa mỏng hơn phần giữa',
        'hai mặt phẳng song song',
        'độ dày như nhau ở mọi chỗ',
      ],
      answer: 1,
      hints: ['Nghĩ đến một chiếc kính lúp: phần nào phồng lên?'],
      solution:
        'Thấu kính hội tụ có rìa mỏng hơn phần giữa; thấu kính phân kì có rìa dày hơn phần giữa.',
    },
    {
      type: 'choice',
      prompt: 'Tia sáng tới song song với trục chính của thấu kính hội tụ cho tia ló',
      options: [
        'truyền thẳng',
        'song song với trục chính',
        "đi qua tiêu điểm $F'$",
        'có đường kéo dài đi qua tiêu điểm $F$',
      ],
      answer: 2,
      hints: ['Chùm sáng song song qua thấu kính hội tụ hội tụ tại đâu?'],
      solution:
        "Tia tới song song với trục chính của thấu kính hội tụ cho tia ló đi qua tiêu điểm $F'$.",
    },
    {
      type: 'number',
      prompt:
        "Một thấu kính hội tụ có tiêu cự $15$ cm. Khoảng cách giữa hai tiêu điểm $F$ và $F'$ của nó là bao nhiêu xentimét?",
      answer: 30,
      tolerance: 0.001,
      unit: 'cm',
      hints: ['Hai tiêu điểm nằm ở hai bên quang tâm, mỗi điểm cách $O$ một đoạn bằng tiêu cự.'],
      solution: "$FF' = OF + OF' = 15 + 15 = 30$ cm.",
    },
    {
      type: 'choice',
      prompt:
        'Đặt vật trước thấu kính hội tụ, cách thấu kính một khoảng $d$ với $f < d < 2f$. Ảnh của vật là',
      options: [
        'ảnh thật, ngược chiều, nhỏ hơn vật',
        'ảnh thật, ngược chiều, lớn hơn vật',
        'ảnh ảo, cùng chiều, lớn hơn vật',
        'ảnh ảo, cùng chiều, nhỏ hơn vật',
      ],
      answer: 1,
      hints: ['Vật nằm ngoài khoảng tiêu cự nên ảnh là ảnh thật; so sánh với trường hợp $d = 2f$.'],
      solution:
        'Với $f < d < 2f$, ảnh thật, ngược chiều và lớn hơn vật (ảnh ở xa hơn $2f$ phía sau thấu kính).',
    },
    {
      type: 'choice',
      prompt: 'Vật đặt trong khoảng tiêu cự của thấu kính hội tụ cho ảnh',
      options: [
        'thật, ngược chiều, lớn hơn vật',
        'ảo, cùng chiều, nhỏ hơn vật',
        'ảo, cùng chiều, lớn hơn vật',
        'thật, cùng chiều, bằng vật',
      ],
      answer: 2,
      hints: ['Đây là cách dùng kính lúp.'],
      solution: 'Khi $d < f$, thấu kính hội tụ cho ảnh ảo, cùng chiều, lớn hơn vật.',
    },
    {
      type: 'choice',
      prompt: 'Ảnh của một vật qua thấu kính phân kì luôn là',
      options: [
        'ảnh thật, ngược chiều, nhỏ hơn vật',
        'ảnh ảo, cùng chiều, nhỏ hơn vật',
        'ảnh ảo, cùng chiều, lớn hơn vật',
        'ảnh thật, cùng chiều, lớn hơn vật',
      ],
      answer: 1,
      hints: [
        'Thấu kính phân kì làm chùm sáng loe ra, nên các tia ló không bao giờ cắt nhau thật.',
      ],
      solution:
        'Vật ở mọi vị trí trước thấu kính phân kì luôn cho ảnh ảo, cùng chiều, nhỏ hơn vật, nằm trong khoảng tiêu cự.',
    },
    {
      type: 'number',
      prompt:
        'Vật $AB$ đặt cách thấu kính hội tụ $40$ cm thì thu được ảnh thật bằng vật. Tiêu cự của thấu kính là bao nhiêu xentimét?',
      answer: 20,
      tolerance: 0.001,
      unit: 'cm',
      hints: ['Ảnh thật bằng vật khi vật đặt ở vị trí đặc biệt nào?'],
      solution: 'Ảnh thật bằng vật khi $d = 2f$, nên $f = \\dfrac{40}{2} = 20$ cm.',
    },
    {
      type: 'choice',
      prompt:
        'Muốn thu được trên màn ảnh của một ngọn nến lớn hơn ngọn nến bằng thấu kính hội tụ tiêu cự $10$ cm, cần đặt ngọn nến cách thấu kính',
      options: ['$5$ cm', '$10$ cm', '$15$ cm', '$30$ cm'],
      answer: 2,
      hints: ['Ảnh hứng được trên màn là ảnh thật; ảnh thật lớn hơn vật khi $f < d < 2f$.'],
      solution:
        'Cần ảnh thật lớn hơn vật nên $10$ cm $< d < 20$ cm: chọn $15$ cm. Ở $5$ cm ảnh là ảnh ảo (không hứng được), ở $10$ cm không có ảnh, ở $30$ cm ảnh nhỏ hơn vật.',
    },
    {
      type: 'multi',
      prompt: 'Những phát biểu nào đúng?',
      options: [
        'Tia sáng tới quang tâm của thấu kính truyền thẳng.',
        'Tia tới qua tiêu điểm $F$ của thấu kính hội tụ cho tia ló song song với trục chính.',
        'Thấu kính phân kì có thể cho ảnh thật hứng được trên màn.',
        'Tiêu cự là khoảng cách từ quang tâm đến tiêu điểm.',
      ],
      answers: [0, 1, 3],
      hints: ['Ảnh qua thấu kính phân kì là ảnh thật hay ảnh ảo?'],
      solution:
        'Thấu kính phân kì luôn cho ảnh ảo nên không hứng được trên màn; các phát biểu còn lại đúng.',
    },
  ],
  takeaways: [
    'Thấu kính hội tụ có rìa mỏng, thấu kính phân kì có rìa dày.',
    "Mỗi thấu kính có trục chính $\\Delta$, quang tâm $O$, hai tiêu điểm $F$, $F'$ đối xứng qua $O$; tiêu cự $f = OF = OF'$.",
    'Tia qua quang tâm truyền thẳng; tia song song trục chính ló qua (hoặc có đường kéo dài qua) tiêu điểm; tia qua (hoặc hướng tới) tiêu điểm ló song song trục chính.',
    'Thấu kính hội tụ: $d > f$ cho ảnh thật, ngược chiều (nhỏ hơn, bằng, lớn hơn vật khi $d > 2f$, $d = 2f$, $f < d < 2f$); $d < f$ cho ảnh ảo, cùng chiều, lớn hơn vật.',
    'Thấu kính phân kì luôn cho ảnh ảo, cùng chiều, nhỏ hơn vật.',
  ],
};
