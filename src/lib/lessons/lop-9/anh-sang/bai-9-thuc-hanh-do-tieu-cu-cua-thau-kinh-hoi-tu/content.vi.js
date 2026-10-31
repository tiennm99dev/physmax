/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Thực hành đo tiêu cự của thấu kính hội tụ: đặt thấu kính giữa giá quang học, dịch đồng thời vật sáng hình chữ F và màn ra xa thấu kính những khoảng bằng nhau đến khi thu được ảnh rõ nét, cao bằng vật; khi đó d = d′ = 2f nên f = (d + d′) / 4; đo ba lần và lấy giá trị trung bình.',
  intro:
    'Trên vỏ một chiếc kính lúp cũ, nhãn ghi tiêu cự đã bị mờ. Không cần tháo kính hay tra cứu, chỉ với một vật sáng, một màn chắn và một chiếc thước, em vẫn đo được tiêu cự của nó. Bí quyết nằm ở trường hợp đặc biệt đã học: vật đặt cách thấu kính hội tụ một khoảng $2f$ thì cho ảnh thật bằng vật.',
  objectives: [
    "Nêu được cơ sở của cách đo: khi ảnh thật cao bằng vật thì $d = d' = 2f$, nên $f = \\dfrac{d + d'}{4}$.",
    'Bố trí được thí nghiệm trên giá quang học với vật sáng, thấu kính hội tụ và màn ảnh.',
    "Tìm được vị trí cho ảnh rõ nét, cao bằng vật trên màn; đo được $d$, $d'$.",
    'Tính được tiêu cự từ số liệu của nhiều lần đo, lấy giá trị trung bình và báo cáo kết quả.',
  ],
  sections: [
    {
      heading: 'Cơ sở lí thuyết và dụng cụ',
      blocks: [
        {
          type: 'p',
          text: "Vật $AB$ đặt vuông góc với trục chính của thấu kính hội tụ, cách thấu kính $d = 2f$, cho ảnh thật, ngược chiều, cao bằng vật ($h' = h$) và cũng cách thấu kính $d' = 2f$. Ngược lại, khi thấy trên màn một ảnh rõ nét cao bằng vật, ta biết $d = d' = 2f$. Khi đó khoảng cách từ vật đến màn là $d + d' = 4f$.",
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Công thức tính tiêu cự',
          text: "Khi ảnh trên màn rõ nét và $h' = h$: $f = \\dfrac{d + d'}{4}$.",
        },
        {
          type: 'table',
          caption: 'Dụng cụ cho mỗi nhóm',
          head: ['Dụng cụ', 'Ghi chú'],
          rows: [
            ['Thấu kính hội tụ cần đo tiêu cự', 'Tiêu cự khoảng $10$ đến $15$ cm'],
            ['Vật sáng hình chữ F', 'Gắn trên đèn chiếu, cho biết chiều cao $h$'],
            ['Màn ảnh', "Có vạch chia để đo chiều cao ảnh $h'$"],
            ['Giá quang học', 'Có thước đo dài khoảng $1$ m, các giá đỡ trượt được'],
            ['Nguồn điện', 'Cấp điện cho đèn của vật sáng'],
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Lưu ý khi làm thí nghiệm',
          text: 'Điều chỉnh để tâm của vật, thấu kính và màn cùng nằm trên một đường thẳng song song với thước (trục chính). Không nhìn thẳng vào đèn. Ảnh "rõ nét" là khi các cạnh chữ F sắc nhất; dịch màn chậm để tìm đúng vị trí. Thấu kính thuỷ tinh dễ vỡ: cầm vào vành, không chạm tay vào mặt kính.',
        },
      ],
    },
    {
      heading: 'Tiến hành thí nghiệm',
      project: true,
      blocks: [
        {
          type: 'p',
          text: 'Mục tiêu: đo tiêu cự của một thấu kính hội tụ bằng cách tìm vị trí của vật và màn cho ảnh rõ nét, cao bằng vật.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Đo chiều cao $h$ của vật sáng hình chữ F.',
            'Đặt thấu kính ở giữa giá quang học; đặt vật và màn sát hai bên thấu kính, cách đều thấu kính.',
            'Dịch đồng thời vật và màn ra xa thấu kính những khoảng bằng nhau cho đến khi thu được ảnh rõ nét trên màn.',
            "Kiểm tra chiều cao $h'$ của ảnh: nếu $h' = h$ thì đo $d$, $d'$ và ghi vào bảng. Nếu chưa bằng, chỉnh nhẹ vị trí vật và màn, giữ $d = d'$, đến khi ảnh rõ nét và $h' = h$.",
            'Làm lại thí nghiệm thêm hai lần (bắt đầu lại từ bước 2), tính $f$ của mỗi lần và giá trị trung bình.',
          ],
        },
        {
          type: 'table',
          caption: 'Bảng kết quả đo tiêu cự (chiều cao vật $h = \\ldots$ cm)',
          head: ['Lần đo', '$d$ (cm)', "$d'$ (cm)", "$h'$ (cm)", "$f = \\dfrac{d + d'}{4}$ (cm)"],
          rows: [
            ['$1$', '...', '...', '...', '...'],
            ['$2$', '...', '...', '...', '...'],
            ['$3$', '...', '...', '...', '...'],
          ],
        },
        {
          type: 'p',
          text: 'Báo cáo: vẽ sơ đồ bố trí thí nghiệm; điền bảng kết quả; tính tiêu cự trung bình $\\overline{f} = \\dfrac{f_1 + f_2 + f_3}{3}$; nhận xét các lần đo có gần nhau không và nêu nguyên nhân sai số (xác định vị trí ảnh rõ nét, đọc vạch trên thước, đo chiều cao ảnh).',
        },
        {
          type: 'p',
          text: 'Ở phần Khám phá có một giá quang học ảo với thấu kính chưa biết tiêu cự. Em dịch vật và màn, quan sát ảnh trên màn, ghi kết quả và tự tính tiêu cự rồi kiểm tra.',
        },
      ],
    },
  ],
  explore: {
    title: 'Giá quang học ảo',
    instruction:
      'Giữ ô "Dịch đồng thời vật và màn" để $d = d\'$, rồi kéo thanh trượt cho đến khi chữ F trên màn rõ nét. So sánh $h\'$ với $h$, nhấn "Ghi kết quả" và lặp lại. Tính $f = \\dfrac{d + d\'}{4}$ rồi nhập để kiểm tra. Bỏ chọn ô để dịch riêng vật hoặc màn: ảnh rõ nét nhưng $h\' \\ne h$ có dùng được công thức không?',
  },
  examples: [
    {
      problem:
        "Một nhóm học sinh đo được ba lần khi ảnh rõ nét và cao bằng vật: lần 1: $d = 20{,}0$ cm, $d' = 20{,}2$ cm; lần 2: $d = 19{,}8$ cm, $d' = 20{,}0$ cm; lần 3: $d = 20{,}1$ cm, $d' = 19{,}9$ cm. Tính tiêu cự trung bình của thấu kính.",
      steps: [
        'Lần 1: $f_1 = \\dfrac{20{,}0 + 20{,}2}{4} = 10{,}05$ cm.',
        'Lần 2: $f_2 = \\dfrac{19{,}8 + 20{,}0}{4} = 9{,}95$ cm.',
        'Lần 3: $f_3 = \\dfrac{20{,}1 + 19{,}9}{4} = 10{,}00$ cm.',
        'Trung bình: $\\overline{f} = \\dfrac{10{,}05 + 9{,}95 + 10{,}00}{3} = 10{,}00$ cm.',
      ],
      answer: 'Tiêu cự của thấu kính khoảng $10{,}0$ cm.',
    },
    {
      problem:
        "Một bạn thu được ảnh rõ nét trên màn với $d = 15$ cm, $d' = 30$ cm, nhưng ảnh cao gấp đôi vật. Bạn tính $f = \\dfrac{15 + 30}{4} = 11{,}25$ cm. Cách tính đó có đúng không?",
      steps: [
        "Công thức $f = \\dfrac{d + d'}{4}$ chỉ đúng khi ảnh cao bằng vật, vì chỉ khi đó $d = d' = 2f$.",
        "Ở đây $h' = 2h$ và $d \\ne d'$, nên không được dùng công thức này.",
        "Cần dịch vật ra xa và màn lại gần thấu kính, giữ $d = d'$, đến khi ảnh rõ nét và $h' = h$ rồi mới đo.",
      ],
      answer: "Không đúng: chỉ dùng $f = \\dfrac{d + d'}{4}$ khi ảnh rõ nét và cao bằng vật.",
    },
  ],
  practice: [
    {
      type: 'number',
      prompt:
        "Khi ảnh trên màn rõ nét và cao bằng vật, đo được $d = 24{,}0$ cm và $d' = 24{,}0$ cm. Tính tiêu cự của thấu kính.",
      answer: 12,
      tolerance: 0.001,
      unit: 'cm',
      hints: ["$f = \\dfrac{d + d'}{4}$."],
      solution: '$f = \\dfrac{24{,}0 + 24{,}0}{4} = 12{,}0$ cm.',
    },
    {
      type: 'number',
      prompt:
        "Ảnh rõ nét, cao bằng vật khi $d = 30{,}2$ cm và $d' = 29{,}8$ cm. Tiêu cự của thấu kính bằng bao nhiêu?",
      answer: 15,
      tolerance: 0.001,
      unit: 'cm',
      hints: ["Cộng $d$ và $d'$ rồi chia cho $4$."],
      solution: '$f = \\dfrac{30{,}2 + 29{,}8}{4} = \\dfrac{60}{4} = 15{,}0$ cm.',
    },
    {
      type: 'number',
      prompt:
        'Ba lần đo cho tiêu cự $f_1 = 9{,}9$ cm, $f_2 = 10{,}1$ cm, $f_3 = 10{,}3$ cm. Tính tiêu cự trung bình.',
      answer: 10.1,
      tolerance: 0.001,
      unit: 'cm',
      hints: ['$\\overline{f} = \\dfrac{f_1 + f_2 + f_3}{3}$.'],
      solution:
        '$\\overline{f} = \\dfrac{9{,}9 + 10{,}1 + 10{,}3}{3} = \\dfrac{30{,}3}{3} = 10{,}1$ cm.',
    },
    {
      type: 'number',
      prompt:
        'Thấu kính hội tụ có tiêu cự $8$ cm. Khi ảnh trên màn rõ nét và cao bằng vật thì vật cách màn bao nhiêu xentimét?',
      answer: 32,
      tolerance: 0.001,
      unit: 'cm',
      hints: ["Khi $h' = h$: $d = d' = 2f$."],
      solution: "$d + d' = 2f + 2f = 4f = 4 \\cdot 8 = 32$ cm.",
    },
    {
      type: 'choice',
      prompt: 'Vì sao trong bài thực hành phải tìm vị trí cho ảnh cao bằng vật?',
      options: [
        'Vì khi đó ảnh sáng nhất',
        "Vì chỉ khi đó $d = d' = 2f$, nên tính được $f = \\dfrac{d + d'}{4}$",
        'Vì ảnh bằng vật thì là ảnh ảo',
        'Vì khi đó vật nằm tại tiêu điểm',
      ],
      answer: 1,
      hints: ['Nhớ lại tính chất ảnh khi vật đặt cách thấu kính hội tụ một khoảng $2f$.'],
      solution:
        "Thấu kính hội tụ cho ảnh thật cao bằng vật khi và chỉ khi $d = 2f$, lúc đó $d' = 2f$. Nhờ vậy $d + d' = 4f$ và $f = \\dfrac{d + d'}{4}$.",
    },
    {
      type: 'choice',
      prompt:
        'Trong khi dịch, một nhóm thấy ảnh rõ nét trên màn nhưng cao hơn vật. Nhóm cần làm gì để ảnh cao bằng vật?',
      options: [
        'Dịch vật lại gần thấu kính, dịch màn ra xa thấu kính',
        'Dịch vật ra xa thấu kính, dịch màn lại gần thấu kính',
        'Giữ nguyên vật, chỉ dịch màn ra xa',
        'Thay bằng thấu kính phân kì',
      ],
      answer: 1,
      hints: ['Ảnh thật lớn hơn vật khi $f < d < 2f$: vật đang ở gần hơn $2f$.'],
      solution:
        "Ảnh thật lớn hơn vật nghĩa là $d < 2f$ và $d' > 2f$. Cần tăng $d$ (dịch vật ra xa) và giảm $d'$ (dịch màn lại gần) cho đến khi $d = d' = 2f$.",
    },
    {
      type: 'order',
      prompt: 'Sắp xếp các bước đo tiêu cự của thấu kính hội tụ theo đúng thứ tự.',
      items: [
        'Dịch đồng thời vật và màn ra xa thấu kính những khoảng bằng nhau đến khi ảnh rõ nét',
        'Đo chiều cao $h$ của vật',
        "Kiểm tra $h' = h$, đo $d$ và $d'$, tính $f = \\dfrac{d + d'}{4}$",
        'Đặt thấu kính ở giữa giá quang học, vật và màn sát hai bên thấu kính',
      ],
      answer: [1, 3, 0, 2],
      hints: ['Phải biết chiều cao vật trước để còn so sánh với chiều cao ảnh.'],
      solution:
        "Đo $h$ → đặt thấu kính ở giữa, vật và màn sát thấu kính → dịch đồng thời vật và màn đến khi ảnh rõ nét → kiểm tra $h' = h$, đo $d$, $d'$ và tính $f$.",
    },
  ],
  takeaways: [
    "Khi ảnh thật qua thấu kính hội tụ rõ nét và cao bằng vật thì $d = d' = 2f$.",
    "Tiêu cự: $f = \\dfrac{d + d'}{4}$; khoảng cách vật – màn lúc đó bằng $4f$.",
    "Đo nhiều lần và lấy giá trị trung bình để giảm sai số; chỉ dùng các lần đo có ảnh rõ nét và $h' = h$.",
  ],
};
