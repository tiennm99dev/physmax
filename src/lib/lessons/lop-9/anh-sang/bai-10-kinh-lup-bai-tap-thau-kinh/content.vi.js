/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Kính lúp là thấu kính hội tụ có tiêu cự ngắn dùng để quan sát vật nhỏ; số bội giác G = 25/f (f tính bằng cm) ghi trên kính như 2x, 5x. Bài toán thấu kính được giải bằng cách dựng ảnh rồi dùng các cặp tam giác đồng dạng để tính khoảng cách và chiều cao của ảnh.',
  intro:
    'Người thợ sửa đồng hồ, nhà sinh học quan sát mẫu lá hay ông bà đọc chữ nhỏ trên hộp thuốc đều dùng một chiếc kính lúp. Vì sao một thấu kính nhỏ lại cho ta thấy vật to hơn nhiều lần, và làm sao tính được ảnh của vật qua thấu kính ở đâu, cao bao nhiêu?',
  objectives: [
    'Nêu được kính lúp là thấu kính hội tụ có tiêu cự ngắn, dùng để quan sát vật nhỏ.',
    'Nêu được ý nghĩa của số bội giác và vận dụng được hệ thức $G = \\dfrac{25}{f}$.',
    'Trình bày được cách dùng kính lúp: đặt vật trong khoảng tiêu cự để thấy ảnh ảo, cùng chiều, lớn hơn vật.',
    'Dựng được ảnh qua thấu kính và dùng tam giác đồng dạng để tính khoảng cách từ ảnh đến thấu kính và chiều cao của ảnh.',
  ],
  sections: [
    {
      heading: 'Kính lúp',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Kính lúp',
          text: 'Kính lúp là một thấu kính hội tụ có tiêu cự ngắn, thường gắn trong một khung có tay cầm, dùng để quan sát các vật nhỏ.',
        },
        {
          type: 'p',
          text: 'Kính lúp được dùng để đọc chữ nhỏ, sửa chữa đồng hồ và linh kiện điện tử, soi vân tay, quan sát côn trùng, mẫu lá, mặt cắt thân cây trong giờ Sinh học.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Số bội giác',
          text: 'Mỗi kính lúp có một số bội giác $G$, ghi trên vành kính bằng các kí hiệu như $2\\text{x}$, $3\\text{x}$, $5\\text{x}$. Giữa số bội giác và tiêu cự $f$ (tính bằng cm) có hệ thức $G = \\dfrac{25}{f}$.',
        },
        {
          type: 'list',
          items: [
            'Kính lúp có tiêu cự càng ngắn thì số bội giác càng lớn.',
            'Dùng kính lúp có số bội giác càng lớn để quan sát thì thấy ảnh càng lớn.',
            'Ví dụ: kính ghi $5\\text{x}$ có tiêu cự $f = \\dfrac{25}{5} = 5$ cm; kính ghi $2{,}5\\text{x}$ có tiêu cự $10$ cm.',
          ],
        },
      ],
    },
    {
      heading: 'Cách quan sát một vật nhỏ qua kính lúp',
      blocks: [
        {
          type: 'list',
          ordered: true,
          items: [
            'Đặt vật nhỏ trong khoảng tiêu cự của kính lúp ($d < f$), gần kính.',
            'Đặt mắt sau kính, nhìn qua kính để thấy ảnh của vật.',
            'Từ từ dịch kính ra xa vật cho đến khi nhìn thấy ảnh rõ nét.',
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Ảnh qua kính lúp',
          text: 'Vật đặt trong khoảng tiêu cự của thấu kính hội tụ cho ảnh ảo, cùng chiều, lớn hơn vật. Mắt nhìn thấy ảnh ảo này qua kính; ảnh không hứng được trên màn.',
        },
        {
          type: 'p',
          text: 'Chọn kính lúp $2{,}5\\text{x}$, $5\\text{x}$ hoặc $10\\text{x}$ rồi kéo vật dọc trục chính. Chỉ khi vật nằm trong khoảng $OF$ kính mới cho ảnh ảo phóng to để quan sát.',
        },
        { type: 'widget', name: 'kinh-lup' },
      ],
    },
    {
      heading: 'Giải bài tập thấu kính',
      blocks: [
        {
          type: 'p',
          text: "Bài toán thường cho tiêu cự $f$, khoảng cách từ vật đến thấu kính $d = OA$ và chiều cao vật $h = AB$; cần tìm khoảng cách từ ảnh đến thấu kính $d' = OA'$ và chiều cao ảnh $h' = A'B'$.",
        },
        {
          type: 'list',
          ordered: true,
          items: [
            "Dựng ảnh $A'B'$ bằng hai tia đặc biệt từ $B$: tia qua quang tâm $O$ và tia song song với trục chính (cắt thấu kính tại $I$, nên $OI = AB$).",
            "Xét cặp tam giác đồng dạng thứ nhất: $\\triangle OAB \\backsim \\triangle OA'B'$, cho $\\dfrac{A'B'}{AB} = \\dfrac{OA'}{OA}$.",
            "Xét cặp tam giác đồng dạng thứ hai có đỉnh tại tiêu điểm: $\\triangle F'OI \\backsim \\triangle F'A'B'$ (thấu kính hội tụ) hoặc $\\triangle FOI \\backsim \\triangle FA'B'$ (thấu kính phân kì).",
            "Ghép hai tỉ số bằng nhau thành một phương trình ẩn $d'$, giải ra $d'$ rồi tính $h' = h \\cdot \\dfrac{d'}{d}$.",
          ],
        },
        {
          type: 'table',
          caption: 'Tỉ số từ cặp tam giác có đỉnh ở tiêu điểm',
          head: ['Trường hợp', 'Tỉ số', 'Kết quả'],
          rows: [
            [
              'Thấu kính hội tụ, $d > f$ (ảnh thật)',
              "$\\dfrac{d'}{d} = \\dfrac{d' - f}{f}$",
              "$d' = \\dfrac{d f}{d - f}$",
            ],
            [
              'Thấu kính hội tụ, $d < f$ (ảnh ảo)',
              "$\\dfrac{d'}{d} = \\dfrac{d' + f}{f}$",
              "$d' = \\dfrac{d f}{f - d}$",
            ],
            [
              'Thấu kính phân kì (ảnh ảo)',
              "$\\dfrac{d'}{d} = \\dfrac{f - d'}{f}$",
              "$d' = \\dfrac{d f}{d + f}$",
            ],
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Lưu ý',
          text: "Luôn vẽ hình trước rồi mới viết tỉ số: hình cho biết ảnh nằm ở phía nào của thấu kính và đoạn $F'A'$ (hay $FA'$) bằng tổng hay hiệu của hai đoạn nào. Các độ dài phải cùng đơn vị.",
        },
      ],
    },
  ],
  explore: {
    title: 'Bộ bài tập thấu kính',
    instruction:
      'Chọn loại thấu kính, tiêu cự $f$, khoảng cách $d$ và chiều cao $h$ của vật (hoặc nhấn "Bài khác" để lấy đề mẫu). Chọn loại ảnh, nhập $d\'$ và $h\'$ rồi nhấn "Kiểm tra". Hình vẽ tia sáng và lời giải bằng tam giác đồng dạng hiện ra để em đối chiếu; kéo đỉnh $B$ trên hình để xem ảnh thay đổi.',
  },
  examples: [
    {
      problem: 'Một kính lúp có ghi $10\\text{x}$ trên vành kính. Tiêu cự của kính bằng bao nhiêu?',
      steps: [
        'Số bội giác $G = 10$.',
        'Từ $G = \\dfrac{25}{f}$ suy ra $f = \\dfrac{25}{G} = \\dfrac{25}{10} = 2{,}5$ cm.',
      ],
      answer: 'Tiêu cự của kính lúp là $2{,}5$ cm.',
    },
    {
      problem:
        'Vật $AB$ cao $1$ cm đặt vuông góc với trục chính của thấu kính hội tụ tiêu cự $f = 12$ cm, điểm $A$ nằm trên trục chính và cách thấu kính $d = 36$ cm. Tính khoảng cách từ ảnh đến thấu kính và chiều cao của ảnh.',
      steps: [
        "Dựng ảnh: $d = 36$ cm $> 2f$, ảnh $A'B'$ là ảnh thật, ngược chiều, nằm sau thấu kính.",
        "$\\triangle OAB \\backsim \\triangle OA'B'$ nên $\\dfrac{A'B'}{AB} = \\dfrac{OA'}{OA} = \\dfrac{d'}{36}$.",
        "$\\triangle F'OI \\backsim \\triangle F'A'B'$ với $OI = AB$ nên $\\dfrac{A'B'}{AB} = \\dfrac{F'A'}{OF'} = \\dfrac{d' - 12}{12}$.",
        "Suy ra $\\dfrac{d'}{36} = \\dfrac{d' - 12}{12}$, tức $12 d' = 36 d' - 432$, nên $d' = 18$ cm.",
        "$h' = h \\cdot \\dfrac{d'}{d} = 1 \\cdot \\dfrac{18}{36} = 0{,}5$ cm.",
      ],
      answer: 'Ảnh cách thấu kính $18$ cm và cao $0{,}5$ cm.',
    },
    {
      problem:
        'Vật $AB$ cao $3$ cm đặt vuông góc với trục chính của thấu kính phân kì tiêu cự $12$ cm, cách thấu kính $24$ cm. Tính khoảng cách từ ảnh đến thấu kính và chiều cao của ảnh.',
      steps: [
        "Thấu kính phân kì cho ảnh ảo $A'B'$, cùng chiều, cùng phía với vật, trong khoảng tiêu cự; $B'$ là giao của $BO$ và đường kéo dài của tia ló đi qua tiêu điểm $F$.",
        "$\\triangle OAB \\backsim \\triangle OA'B'$ nên $\\dfrac{A'B'}{AB} = \\dfrac{d'}{24}$.",
        "$\\triangle FOI \\backsim \\triangle FA'B'$ nên $\\dfrac{A'B'}{AB} = \\dfrac{FA'}{FO} = \\dfrac{12 - d'}{12}$.",
        "Suy ra $\\dfrac{d'}{24} = \\dfrac{12 - d'}{12}$, tức $12 d' = 288 - 24 d'$, nên $d' = 8$ cm.",
        "$h' = 3 \\cdot \\dfrac{8}{24} = 1$ cm.",
      ],
      answer: 'Ảnh ảo cách thấu kính $8$ cm, cao $1$ cm.',
    },
    {
      problem:
        'Dùng một kính lúp có tiêu cự $15$ cm quan sát vật nhỏ cao $1$ cm đặt cách kính $10$ cm. Ảnh cách kính bao nhiêu, cao bao nhiêu?',
      steps: [
        '$d = 10$ cm $< f = 15$ cm: ảnh ảo, cùng chiều, cùng phía với vật.',
        "$\\triangle OAB \\backsim \\triangle OA'B'$ nên $\\dfrac{A'B'}{AB} = \\dfrac{d'}{10}$.",
        "$\\triangle F'OI \\backsim \\triangle F'A'B'$ nên $\\dfrac{A'B'}{AB} = \\dfrac{F'A'}{OF'} = \\dfrac{d' + 15}{15}$.",
        "Suy ra $\\dfrac{d'}{10} = \\dfrac{d' + 15}{15}$, tức $15 d' = 10 d' + 150$, nên $d' = 30$ cm.",
        "$h' = 1 \\cdot \\dfrac{30}{10} = 3$ cm.",
      ],
      answer: 'Ảnh ảo cách kính $30$ cm, cao $3$ cm, gấp $3$ lần vật.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Kính lúp là',
      options: [
        'thấu kính phân kì có tiêu cự ngắn',
        'thấu kính hội tụ có tiêu cự ngắn',
        'thấu kính hội tụ có tiêu cự dài',
        'gương cầu lồi',
      ],
      answer: 1,
      hints: ['Kính lúp cho ảnh lớn hơn vật; loại thấu kính nào làm được điều đó?'],
      solution: 'Kính lúp là thấu kính hội tụ có tiêu cự ngắn, dùng để quan sát vật nhỏ.',
    },
    {
      type: 'number',
      prompt: 'Một kính lúp có ghi $5\\text{x}$. Tiêu cự của kính là bao nhiêu xentimét?',
      answer: 5,
      tolerance: 0.001,
      unit: 'cm',
      hints: ['Dùng hệ thức $G = \\dfrac{25}{f}$ với $f$ tính bằng cm.'],
      solution: '$f = \\dfrac{25}{G} = \\dfrac{25}{5} = 5$ cm.',
    },
    {
      type: 'number',
      prompt: 'Một kính lúp có tiêu cự $10$ cm. Số bội giác của kính là bao nhiêu?',
      answer: 2.5,
      tolerance: 0.001,
      hints: ['$G = \\dfrac{25}{f}$.'],
      solution: '$G = \\dfrac{25}{10} = 2{,}5$, kính ghi $2{,}5\\text{x}$.',
    },
    {
      type: 'choice',
      prompt: 'Có hai kính lúp ghi $2\\text{x}$ và $4\\text{x}$. Phát biểu nào đúng?',
      options: [
        'Kính $2\\text{x}$ có tiêu cự ngắn hơn và cho ảnh lớn hơn.',
        'Kính $4\\text{x}$ có tiêu cự ngắn hơn và cho ảnh lớn hơn.',
        'Kính $4\\text{x}$ có tiêu cự dài hơn và cho ảnh lớn hơn.',
        'Hai kính có cùng tiêu cự.',
      ],
      answer: 1,
      hints: ['Tính tiêu cự mỗi kính bằng $f = \\dfrac{25}{G}$.'],
      solution:
        'Kính $2\\text{x}$ có $f = 12{,}5$ cm, kính $4\\text{x}$ có $f = 6{,}25$ cm. Kính $4\\text{x}$ có tiêu cự ngắn hơn, số bội giác lớn hơn nên cho ảnh quan sát lớn hơn.',
    },
    {
      type: 'choice',
      prompt: 'Muốn quan sát một vật nhỏ qua kính lúp, phải đặt vật',
      options: [
        'ngoài khoảng $2f$',
        'tại tiêu điểm của kính',
        'trong khoảng tiêu cự của kính',
        'trong khoảng từ $f$ đến $2f$',
      ],
      answer: 2,
      hints: ['Ảnh quan sát qua kính lúp phải là ảnh cùng chiều và lớn hơn vật.'],
      solution:
        'Chỉ khi vật đặt trong khoảng tiêu cự, thấu kính hội tụ mới cho ảnh ảo, cùng chiều, lớn hơn vật để mắt quan sát.',
    },
    {
      type: 'choice',
      prompt: 'Ảnh của vật nhỏ quan sát qua kính lúp là',
      options: [
        'ảnh thật, ngược chiều, lớn hơn vật',
        'ảnh ảo, cùng chiều, nhỏ hơn vật',
        'ảnh ảo, cùng chiều, lớn hơn vật',
        'ảnh thật, cùng chiều, lớn hơn vật',
      ],
      answer: 2,
      hints: ['Vật nằm trong khoảng tiêu cự của một thấu kính hội tụ.'],
      solution: 'Qua kính lúp ta thấy ảnh ảo, cùng chiều, lớn hơn vật.',
    },
    {
      type: 'number',
      prompt:
        'Vật $AB$ cao $3$ cm đặt vuông góc với trục chính của thấu kính hội tụ tiêu cự $20$ cm, cách thấu kính $60$ cm. Ảnh cách thấu kính bao nhiêu xentimét?',
      answer: 30,
      tolerance: 0.05,
      unit: 'cm',
      hints: [
        "Ảnh thật. Dùng $\\triangle OAB \\backsim \\triangle OA'B'$ và $\\triangle F'OI \\backsim \\triangle F'A'B'$.",
        "Ghép thành $\\dfrac{d'}{60} = \\dfrac{d' - 20}{20}$.",
      ],
      solution:
        "$\\dfrac{d'}{60} = \\dfrac{d' - 20}{20}$ nên $20 d' = 60 d' - 1200$, $d' = 30$ cm.",
    },
    {
      type: 'number',
      prompt:
        'Với vật và thấu kính ở bài trên ($h = 3$ cm, $f = 20$ cm, $d = 60$ cm), ảnh cao bao nhiêu xentimét?',
      answer: 1.5,
      tolerance: 0.05,
      unit: 'cm',
      hints: ["$\\dfrac{h'}{h} = \\dfrac{d'}{d}$, với $d' = 30$ cm."],
      solution: "$h' = 3 \\cdot \\dfrac{30}{60} = 1{,}5$ cm.",
    },
    {
      type: 'number',
      prompt:
        'Vật $AB$ cao $2$ cm đặt trước thấu kính hội tụ tiêu cự $12$ cm, cách thấu kính $8$ cm. Ảnh cao bao nhiêu xentimét?',
      answer: 6,
      tolerance: 0.05,
      unit: 'cm',
      hints: [
        "$d < f$ nên ảnh ảo; tỉ số từ cặp tam giác ở tiêu điểm là $\\dfrac{d' + f}{f}$.",
        "Giải $\\dfrac{d'}{8} = \\dfrac{d' + 12}{12}$ để tìm $d'$ trước.",
      ],
      solution:
        "$\\dfrac{d'}{8} = \\dfrac{d' + 12}{12}$ nên $12 d' = 8 d' + 96$, $d' = 24$ cm. $h' = 2 \\cdot \\dfrac{24}{8} = 6$ cm.",
    },
    {
      type: 'number',
      prompt:
        'Vật $AB$ đặt vuông góc với trục chính của thấu kính phân kì tiêu cự $15$ cm, cách thấu kính $30$ cm. Ảnh cách thấu kính bao nhiêu xentimét?',
      answer: 10,
      tolerance: 0.05,
      unit: 'cm',
      hints: [
        "Thấu kính phân kì: $\\triangle FOI \\backsim \\triangle FA'B'$ cho tỉ số $\\dfrac{f - d'}{f}$.",
      ],
      solution:
        "$\\dfrac{d'}{30} = \\dfrac{15 - d'}{15}$ nên $15 d' = 450 - 30 d'$, $45 d' = 450$, $d' = 10$ cm.",
    },
    {
      type: 'number',
      prompt:
        'Dùng kính lúp tiêu cự $5$ cm quan sát một con kiến dài $2$ mm đặt cách kính $4$ cm. Ảnh của con kiến dài bao nhiêu milimét?',
      answer: 10,
      tolerance: 0.05,
      unit: 'mm',
      hints: [
        "$d = 4$ cm $< f$: ảnh ảo. Tìm $d'$ từ $\\dfrac{d'}{4} = \\dfrac{d' + 5}{5}$.",
        "Rồi dùng $\\dfrac{h'}{h} = \\dfrac{d'}{d}$, giữ $h$ bằng milimét.",
      ],
      solution:
        "$\\dfrac{d'}{4} = \\dfrac{d' + 5}{5}$ nên $5 d' = 4 d' + 20$, $d' = 20$ cm. $h' = 2 \\cdot \\dfrac{20}{4} = 10$ mm.",
    },
    {
      type: 'multi',
      prompt: 'Những phát biểu nào đúng?',
      options: [
        'Kính lúp có số bội giác càng lớn thì tiêu cự càng ngắn.',
        'Ảnh quan sát qua kính lúp hứng được trên màn.',
        "Khi giải bài toán thấu kính, $\\dfrac{h'}{h} = \\dfrac{d'}{d}$ suy ra từ $\\triangle OAB \\backsim \\triangle OA'B'$.",
        'Một thấu kính phân kì có thể dùng làm kính lúp.',
      ],
      answers: [0, 2],
      hints: ['Kính lúp cho ảnh thật hay ảnh ảo? Thấu kính phân kì cho ảnh lớn hay nhỏ hơn vật?'],
      solution:
        'Ảnh qua kính lúp là ảnh ảo nên không hứng được trên màn; thấu kính phân kì luôn cho ảnh nhỏ hơn vật nên không dùng làm kính lúp. Hai phát biểu còn lại đúng.',
    },
  ],
  takeaways: [
    'Kính lúp là thấu kính hội tụ có tiêu cự ngắn, dùng để quan sát vật nhỏ.',
    'Số bội giác $G = \\dfrac{25}{f}$ ($f$ tính bằng cm), ghi trên kính dạng $2\\text{x}$, $5\\text{x}$...; tiêu cự càng ngắn thì $G$ càng lớn.',
    'Đặt vật trong khoảng tiêu cự của kính lúp để thấy ảnh ảo, cùng chiều, lớn hơn vật.',
    "Giải bài toán thấu kính: dựng ảnh, dùng $\\triangle OAB \\backsim \\triangle OA'B'$ và cặp tam giác có đỉnh ở tiêu điểm để tính $d'$, rồi $h' = h \\cdot \\dfrac{d'}{d}$.",
  ],
};
