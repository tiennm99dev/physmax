/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Khúc xạ ánh sáng là hiện tượng tia sáng bị gãy khúc tại mặt phân cách khi truyền xiên góc từ môi trường trong suốt này sang môi trường trong suốt khác; tia khúc xạ nằm trong mặt phẳng tới, bên kia pháp tuyến, và tỉ số sin i / sin r không đổi, bằng chiết suất tỉ đối n21 = n2 / n1, với chiết suất n = c / v.',
  intro:
    'Nhúng một chiếc đũa thẳng nghiêng vào cốc nước rồi nhìn từ bên cạnh: chiếc đũa như bị gãy tại mặt nước. Người đi câu cá cũng biết rằng con cá trong nước không nằm đúng ở chỗ mắt mình nhìn thấy. Vì sao ánh sáng lại "đánh lừa" mắt ta như vậy?',
  objectives: [
    'Mô tả được hiện tượng khúc xạ ánh sáng và nêu được nguyên nhân của hiện tượng.',
    'Nêu được chiết suất tỉ đối, chiết suất tuyệt đối của một môi trường và hệ thức $n = \\dfrac{c}{v}$.',
    'Phát biểu được định luật khúc xạ ánh sáng: $\\dfrac{\\sin i}{\\sin r} = n_{21} = \\dfrac{n_2}{n_1}$.',
    'Vận dụng được định luật khúc xạ để tính góc khúc xạ, góc tới hoặc chiết suất.',
  ],
  sections: [
    {
      heading: 'Hiện tượng khúc xạ ánh sáng',
      blocks: [
        {
          type: 'p',
          text: 'Chiếu một tia sáng hẹp từ không khí xiên góc vào mặt phẳng của một khối thuỷ tinh hình bán trụ. Tia sáng truyền thẳng trong không khí, truyền thẳng trong thuỷ tinh, nhưng bị gãy khúc ngay tại mặt phân cách giữa hai môi trường.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Khúc xạ ánh sáng',
          text: 'Hiện tượng khúc xạ ánh sáng là hiện tượng tia sáng bị gãy khúc (lệch khỏi phương truyền ban đầu) tại mặt phân cách khi truyền xiên góc từ môi trường trong suốt này sang môi trường trong suốt khác.',
        },
        {
          type: 'list',
          items: [
            '$SI$ là tia tới, $I$ là điểm tới, $IR$ là tia khúc xạ.',
            "$NN'$ là pháp tuyến: đường thẳng vuông góc với mặt phân cách tại điểm tới $I$.",
            "Góc tới $i = \\widehat{SIN}$ là góc giữa tia tới và pháp tuyến; góc khúc xạ $r = \\widehat{RIN'}$ là góc giữa tia khúc xạ và pháp tuyến.",
            'Mặt phẳng tới là mặt phẳng chứa tia tới và pháp tuyến.',
          ],
        },
        {
          type: 'p',
          text: 'Nguyên nhân của hiện tượng khúc xạ là tốc độ truyền ánh sáng trong hai môi trường khác nhau. Tia sáng chiếu vuông góc với mặt phân cách ($i = 0^\\circ$) thì truyền thẳng, không bị gãy khúc.',
        },
      ],
    },
    {
      heading: 'Định luật khúc xạ ánh sáng',
      blocks: [
        {
          type: 'p',
          text: 'Thay đổi góc tới và đo góc khúc xạ tương ứng, người ta thấy: khi góc tới tăng thì góc khúc xạ cũng tăng, nhưng tỉ số giữa $\\sin i$ và $\\sin r$ thì không đổi.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Định luật khúc xạ ánh sáng',
          text: 'Tia khúc xạ nằm trong mặt phẳng tới và ở bên kia pháp tuyến so với tia tới. Với hai môi trường trong suốt nhất định, tỉ số giữa sin góc tới ($\\sin i$) và sin góc khúc xạ ($\\sin r$) luôn không đổi: $\\dfrac{\\sin i}{\\sin r} = \\text{hằng số}$.',
        },
        {
          type: 'table',
          caption: 'Ánh sáng đi từ không khí vào thuỷ tinh',
          head: ['Góc tới $i$', 'Góc khúc xạ $r$', '$\\dfrac{\\sin i}{\\sin r}$'],
          rows: [
            ['$20^\\circ$', '$13{,}2^\\circ$', '$1{,}50$'],
            ['$40^\\circ$', '$25{,}4^\\circ$', '$1{,}50$'],
            ['$60^\\circ$', '$35{,}3^\\circ$', '$1{,}50$'],
          ],
        },
      ],
    },
    {
      heading: 'Chiết suất của môi trường',
      blocks: [
        {
          type: 'p',
          text: 'Tỉ số không đổi $\\dfrac{\\sin i}{\\sin r}$ gọi là chiết suất tỉ đối $n_{21}$ của môi trường $2$ (chứa tia khúc xạ) đối với môi trường $1$ (chứa tia tới).',
        },
        {
          type: 'tex',
          tex: '\\frac{\\sin i}{\\sin r} = n_{21} = \\frac{n_2}{n_1}',
        },
        {
          type: 'list',
          items: [
            'Nếu $n_{21} > 1$ thì $r < i$: tia khúc xạ lệch lại gần pháp tuyến hơn. Ta nói môi trường $2$ chiết quang hơn môi trường $1$.',
            'Nếu $n_{21} < 1$ thì $r > i$: tia khúc xạ lệch xa pháp tuyến hơn. Môi trường $2$ chiết quang kém môi trường $1$.',
          ],
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Chiết suất tuyệt đối',
          text: 'Chiết suất tuyệt đối (gọi tắt là chiết suất) của một môi trường là chiết suất tỉ đối của môi trường đó đối với chân không: $n = \\dfrac{c}{v}$, trong đó $c = 3 \\cdot 10^8$ m/s là tốc độ ánh sáng trong chân không, $v$ là tốc độ ánh sáng trong môi trường.',
        },
        {
          type: 'table',
          caption: 'Chiết suất của một số môi trường',
          head: ['Môi trường', 'Chiết suất $n$'],
          rows: [
            ['Chân không', '$1$'],
            ['Không khí', '$1{,}00029 \\approx 1$'],
            ['Nước', '$1{,}33 \\approx \\dfrac{4}{3}$'],
            ['Thuỷ tinh', '$1{,}5$ (tuỳ loại)'],
            ['Kim cương', '$2{,}42$'],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Dạng thường dùng',
          text: 'Từ $\\dfrac{\\sin i}{\\sin r} = \\dfrac{n_2}{n_1}$ ta có thể viết $n_1 \\sin i = n_2 \\sin r$. Mọi môi trường trong suốt đều có $n > 1$, vì ánh sáng truyền trong đó chậm hơn trong chân không.',
        },
        {
          type: 'p',
          text: 'Ở phần Khám phá, em xoay đèn laser để đổi góc tới, ghi số liệu ở nhiều góc tới khác nhau và tự kiểm tra rằng tỉ số $\\dfrac{\\sin i}{\\sin r}$ không đổi.',
        },
      ],
    },
  ],
  explore: {
    title: 'Tia laser qua mặt phân cách',
    instruction:
      'Kéo đèn laser (chấm đỏ) hoặc dùng thanh trượt để đổi góc tới $i$. Nhấn "Ghi số liệu" ở ít nhất ba góc tới khác nhau và so sánh cột $\\dfrac{\\sin i}{\\sin r}$. Sau đó đổi sang thuỷ tinh, rồi chọn "Ra không khí": góc khúc xạ lớn hơn hay nhỏ hơn góc tới?',
  },
  examples: [
    {
      problem:
        'Một tia sáng truyền từ không khí vào nước với góc tới $i = 30^\\circ$. Biết chiết suất của nước là $\\dfrac{4}{3}$, của không khí là $1$. Tính góc khúc xạ.',
      steps: [
        'Định luật khúc xạ: $n_1 \\sin i = n_2 \\sin r$, với $n_1 = 1$, $n_2 = \\dfrac{4}{3}$.',
        '$\\sin r = \\dfrac{n_1 \\sin i}{n_2} = \\dfrac{1 \\cdot 0{,}5}{\\frac{4}{3}} = 0{,}375$.',
        'Tra máy tính: $r \\approx 22^\\circ$. Ta thấy $r < i$: tia khúc xạ lệch lại gần pháp tuyến.',
      ],
      answer: 'Góc khúc xạ $r \\approx 22^\\circ$.',
    },
    {
      problem:
        'Tốc độ ánh sáng trong chân không là $3 \\cdot 10^8$ m/s. Chiết suất của một loại thuỷ tinh là $1{,}5$. Tính tốc độ ánh sáng trong thuỷ tinh đó.',
      steps: [
        'Từ $n = \\dfrac{c}{v}$ suy ra $v = \\dfrac{c}{n}$.',
        '$v = \\dfrac{3 \\cdot 10^8}{1{,}5} = 2 \\cdot 10^8$ m/s.',
      ],
      answer: 'Ánh sáng truyền trong thuỷ tinh với tốc độ $2 \\cdot 10^8$ m/s.',
    },
    {
      problem:
        'Chiếu tia sáng từ không khí vào một khối chất trong suốt với góc tới $60^\\circ$ thì đo được góc khúc xạ $35{,}3^\\circ$. Tính chiết suất của khối chất. Khối chất đó có thể là nước hay thuỷ tinh?',
      steps: [
        '$n_{21} = \\dfrac{\\sin i}{\\sin r} = \\dfrac{\\sin 60^\\circ}{\\sin 35{,}3^\\circ} \\approx \\dfrac{0{,}866}{0{,}578} \\approx 1{,}5$.',
        'Không khí có $n_1 = 1$ nên chiết suất của khối chất là $n_2 = n_{21} \\cdot n_1 \\approx 1{,}5$.',
        'So với bảng chiết suất, $1{,}5$ là chiết suất của thuỷ tinh.',
      ],
      answer: 'Chiết suất khoảng $1{,}5$: khối chất là thuỷ tinh.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Hiện tượng khúc xạ ánh sáng là hiện tượng tia sáng',
      options: [
        'bị hắt trở lại môi trường cũ khi gặp mặt phân cách',
        'bị gãy khúc tại mặt phân cách khi truyền xiên góc từ môi trường trong suốt này sang môi trường trong suốt khác',
        'truyền thẳng khi đi từ môi trường này sang môi trường khác',
        'bị hấp thụ hoàn toàn tại mặt phân cách',
      ],
      answer: 1,
      hints: ['Hiện tượng "hắt trở lại" là phản xạ, không phải khúc xạ.'],
      solution:
        'Khúc xạ là hiện tượng tia sáng bị gãy khúc (lệch khỏi phương truyền ban đầu) tại mặt phân cách khi truyền xiên góc từ môi trường trong suốt này sang môi trường trong suốt khác.',
    },
    {
      type: 'choice',
      prompt: 'Theo định luật khúc xạ ánh sáng, tia khúc xạ',
      options: [
        'nằm trong mặt phẳng tới và ở cùng phía pháp tuyến với tia tới',
        'nằm trong mặt phẳng tới và ở bên kia pháp tuyến so với tia tới',
        'vuông góc với mặt phẳng tới',
        'luôn trùng với pháp tuyến',
      ],
      answer: 1,
      hints: [
        'Hãy nhớ hình vẽ: tia tới ở một bên pháp tuyến, tia khúc xạ đi tiếp sang môi trường kia.',
      ],
      solution:
        'Tia khúc xạ nằm trong mặt phẳng tới (mặt phẳng chứa tia tới và pháp tuyến) và ở bên kia pháp tuyến so với tia tới.',
    },
    {
      type: 'number',
      prompt:
        'Tốc độ ánh sáng trong một chất lỏng là $2{,}25 \\cdot 10^8$ m/s, trong chân không là $3 \\cdot 10^8$ m/s. Tính chiết suất của chất lỏng đó (làm tròn đến hai chữ số thập phân).',
      answer: 1.33,
      tolerance: 0.005,
      hints: ['Dùng $n = \\dfrac{c}{v}$.'],
      solution:
        '$n = \\dfrac{c}{v} = \\dfrac{3 \\cdot 10^8}{2{,}25 \\cdot 10^8} = \\dfrac{4}{3} \\approx 1{,}33$.',
    },
    {
      type: 'number',
      prompt:
        'Kim cương có chiết suất $2{,}42$. Tốc độ ánh sáng trong kim cương bằng bao nhiêu lần $10^8$ m/s? (Làm tròn đến hai chữ số thập phân, $c = 3 \\cdot 10^8$ m/s.)',
      answer: 1.24,
      tolerance: 0.005,
      hints: ['$v = \\dfrac{c}{n}$.'],
      solution: '$v = \\dfrac{3 \\cdot 10^8}{2{,}42} \\approx 1{,}24 \\cdot 10^8$ m/s.',
    },
    {
      type: 'number',
      prompt:
        'Một tia sáng đi từ không khí vào thuỷ tinh có chiết suất $1{,}5$ với góc tới $60^\\circ$. Tính góc khúc xạ (theo độ, làm tròn đến một chữ số thập phân).',
      answer: 35.3,
      tolerance: 0.15,
      unit: '°',
      hints: [
        'Dùng $n_1 \\sin i = n_2 \\sin r$ với $n_1 = 1$.',
        '$\\sin r = \\dfrac{\\sin 60^\\circ}{1{,}5}$, rồi dùng máy tính để tìm $r$.',
      ],
      solution:
        '$\\sin r = \\dfrac{\\sin 60^\\circ}{1{,}5} \\approx \\dfrac{0{,}866}{1{,}5} \\approx 0{,}577$, nên $r \\approx 35{,}3^\\circ$.',
    },
    {
      type: 'number',
      prompt:
        'Chiếu một tia sáng từ không khí vào một chất lỏng với góc tới $45^\\circ$ thì góc khúc xạ là $30^\\circ$. Tính chiết suất của chất lỏng (làm tròn đến hai chữ số thập phân).',
      answer: 1.41,
      tolerance: 0.005,
      hints: ['Chiết suất tỉ đối $n_{21} = \\dfrac{\\sin i}{\\sin r}$; không khí có $n_1 = 1$.'],
      solution:
        '$n = \\dfrac{\\sin 45^\\circ}{\\sin 30^\\circ} = \\dfrac{0{,}7071}{0{,}5} \\approx 1{,}41$.',
    },
    {
      type: 'number',
      prompt:
        'Chiết suất của nước là $\\dfrac{4}{3}$, của thuỷ tinh là $1{,}5$. Tính chiết suất tỉ đối của thuỷ tinh đối với nước (làm tròn đến ba chữ số thập phân).',
      answer: 1.125,
      tolerance: 0.0005,
      hints: [
        'Môi trường $2$ là thuỷ tinh (chứa tia khúc xạ), môi trường $1$ là nước.',
        '$n_{21} = \\dfrac{n_2}{n_1}$.',
      ],
      solution: '$n_{21} = \\dfrac{1{,}5}{\\frac{4}{3}} = \\dfrac{1{,}5 \\cdot 3}{4} = 1{,}125$.',
    },
    {
      type: 'choice',
      prompt: 'Một tia sáng truyền xiên góc từ nước ra không khí. So với góc tới, góc khúc xạ',
      options: ['nhỏ hơn', 'bằng', 'lớn hơn', 'luôn bằng $0^\\circ$'],
      answer: 2,
      hints: ['Không khí chiết quang kém nước: $n_{21} = \\dfrac{1}{4/3} < 1$.'],
      solution:
        'Đi từ nước ($n_1 = \\frac{4}{3}$) ra không khí ($n_2 = 1$): $n_{21} < 1$ nên $\\sin r > \\sin i$, tức $r > i$. Tia khúc xạ lệch xa pháp tuyến hơn.',
    },
    {
      type: 'multi',
      prompt: 'Những phát biểu nào đúng?',
      options: [
        'Tia sáng chiếu vuông góc với mặt phân cách thì không bị gãy khúc.',
        'Khi góc tới tăng thì góc khúc xạ giảm.',
        'Nguyên nhân của hiện tượng khúc xạ là tốc độ ánh sáng trong hai môi trường khác nhau.',
        'Chiết suất của mọi môi trường trong suốt đều lớn hơn $1$.',
      ],
      answers: [0, 2, 3],
      hints: [
        'Nhìn bảng số liệu: khi $i$ tăng từ $20^\\circ$ lên $60^\\circ$ thì $r$ thay đổi thế nào?',
      ],
      solution:
        'Với $i = 0^\\circ$ thì $r = 0^\\circ$: tia sáng truyền thẳng. Khi $i$ tăng thì $r$ cũng tăng (tỉ số $\\sin i / \\sin r$ không đổi), nên phát biểu thứ hai sai. Khúc xạ xảy ra do tốc độ ánh sáng thay đổi; mọi môi trường trong suốt có $v < c$ nên $n = c/v > 1$.',
    },
  ],
  takeaways: [
    'Khúc xạ ánh sáng: tia sáng bị gãy khúc tại mặt phân cách khi truyền xiên góc giữa hai môi trường trong suốt, do tốc độ ánh sáng trong hai môi trường khác nhau.',
    'Định luật khúc xạ: tia khúc xạ nằm trong mặt phẳng tới, bên kia pháp tuyến; $\\dfrac{\\sin i}{\\sin r} = n_{21} = \\dfrac{n_2}{n_1}$ không đổi.',
    'Chiết suất của môi trường: $n = \\dfrac{c}{v}$; chân không $n = 1$, không khí $n \\approx 1$, nước $n \\approx \\dfrac{4}{3}$, thuỷ tinh $n \\approx 1{,}5$.',
    'Vào môi trường chiết quang hơn thì $r < i$; ra môi trường chiết quang kém thì $r > i$.',
  ],
};
