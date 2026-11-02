/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Thực hành đo gia tốc rơi tự do: thả trụ thép từ nam châm điện qua cổng quang điện, đo thời gian rơi ở nhiều độ cao, tính g, sai số và kiểm chứng bằng đồ thị s theo t².',
  intro:
    'Một vật rơi từ độ cao $1$ m chỉ mất chưa đến nửa giây, tay người không bấm kịp đồng hồ. Dùng nam châm điện để thả vật và cổng quang điện để dừng đồng hồ, ta đo được thời gian rơi đến phần nghìn giây, rồi tính ra chính giá trị $g$ tại nơi mình đứng.',
  objectives: [
    'Thiết kế được phương án đo gia tốc rơi tự do bằng nam châm điện và cổng quang điện.',
    'Đo được thời gian rơi ứng với các quãng đường khác nhau.',
    'Tính được $g$ và sai số của phép đo, viết kết quả đúng cách.',
    'Vẽ được đồ thị $s$ theo $t^2$, nhận xét tính chất rơi tự do và suy ra $g$ từ hệ số góc.',
  ],
  sections: [
    {
      heading: 'Cơ sở lí thuyết',
      blocks: [
        {
          type: 'p',
          text: 'Trụ thép được thả không vận tốc đầu và lực cản không đáng kể, nên rơi tự do với $s = \\dfrac{1}{2}gt^2$. Đo $s$ và $t$, ta tính được:',
        },
        { type: 'tex', tex: 'g = \\dfrac{2s}{t^2}' },
        {
          type: 'p',
          text: 'Vì $s = \\dfrac{g}{2} \\cdot t^2$ nên đồ thị $s$ theo $t^2$ là đường thẳng đi qua gốc toạ độ, có hệ số góc $k = \\dfrac{g}{2}$. Khi đó $g = 2k$.',
        },
        {
          type: 'p',
          text: 'Sai số tỉ đối của một lần tính theo công thức trên là $\\delta g = \\delta s + 2\\delta t$; luỹ thừa bậc $2$ của $t$ làm sai số của thời gian được nhân đôi, nên đo thời gian cần chính xác nhất.',
        },
      ],
    },
    {
      heading: 'Dụng cụ và cách bố trí',
      blocks: [
        {
          type: 'list',
          items: [
            'Máng (giá) đứng có dây dọi và thước đo, chân đế có vít chỉnh thăng bằng.',
            'Nam châm điện giữ trụ thép, hộp công tắc kép để ngắt điện thả trụ.',
            'Trụ thép nhỏ, một cổng quang điện $E$ dời được dọc máng.',
            'Đồng hồ đo thời gian hiện số.',
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Đo thời gian rơi',
          text: 'Đồng hồ bắt đầu đếm khi ngắt điện nam châm (trụ bắt đầu rơi) và dừng khi trụ chắn tia sáng của cổng $E$. Muốn vậy, nối hộp công tắc với ổ A, cổng $E$ với ổ B và đặt MODE đo thời gian giữa hai tín hiệu đó (A↔B). Đồng hồ của lớp có thể khác, hãy xem hướng dẫn đi kèm và kiểm tra lại trước khi đo.',
        },
      ],
    },
    {
      heading: 'Thực hành: đo gia tốc rơi tự do',
      project: true,
      blocks: [
        {
          type: 'p',
          text: 'Mục tiêu: đo gia tốc rơi tự do $g$ tại phòng thí nghiệm, viết kết quả $g = \\overline{g} \\pm \\Delta g$ và kiểm chứng rơi tự do là chuyển động nhanh dần đều.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Đặt máng đứng, chỉnh vít ở chân đế để dây dọi song song với máng. Lắp nam châm điện ở đỉnh máng, nối đồng hồ, hộp công tắc và cổng $E$.',
            'Đặt cổng $E$ cách điểm thả một quãng $s = 0{,}2$ m; đo và ghi lại $s$.',
            'Cho trụ thép hút vào nam châm, nhấn RESET để đồng hồ về $0{,}000$. Ngắt điện để thả trụ, rồi ghi thời gian $t$. Lặp lại ít nhất $3$ lần.',
            'Dời cổng $E$ đến các vị trí khác ($s = 0{,}4$; $0{,}6$; $0{,}8$; $1{,}0$ m) và lặp lại bước trên.',
            'Tính $\\overline{t}$, $\\overline{t}^2$ và $g = \\dfrac{2s}{\\overline{t}^2}$ cho từng vị trí; tính $\\overline{g}$ và $\\Delta g$.',
            'Vẽ đồ thị $s$ theo $t^2$, nhận xét dạng đồ thị và tính $g$ từ hệ số góc.',
          ],
        },
        {
          type: 'table',
          caption: 'Mẫu bảng ghi số liệu',
          head: [
            '$s$ (m)',
            '$t_1$ (s)',
            '$t_2$ (s)',
            '$t_3$ (s)',
            '$\\overline{t}$ (s)',
            '$\\overline{t}^2$ (s²)',
            '$g$ (m/s²)',
          ],
          rows: [
            ['$0{,}2$', '…', '…', '…', '…', '…', '…'],
            ['$0{,}4$', '…', '…', '…', '…', '…', '…'],
            ['$0{,}6$', '…', '…', '…', '…', '…', '…'],
            ['$0{,}8$', '…', '…', '…', '…', '…', '…'],
            ['$1{,}0$', '…', '…', '…', '…', '…', '…'],
          ],
        },
        {
          type: 'p',
          text: 'Báo cáo: nộp bảng số liệu, đồ thị $s$ theo $t^2$, kết quả $g = \\overline{g} \\pm \\Delta g$, so sánh với $9{,}8$ m/s² và nêu nguyên nhân gây sai số.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Hạn chế sai số',
          text: 'Giữ máng thật thẳng đứng để trụ không chạm máng, đo $s$ từ đúng mép dưới của trụ đến cổng và thả trụ theo cùng một cách ở mỗi lần đo. Không đặt cổng quá gần điểm thả: thời gian rất ngắn nên sai số tỉ đối sẽ lớn.',
        },
      ],
    },
  ],
  explore: {
    title: 'Thí nghiệm rơi ảo',
    instruction:
      'Kéo cổng $E$ (hoặc chọn rồi dùng phím mũi tên) đến một độ cao, thả trụ ít nhất $3$ lần rồi dời cổng sang chỗ khác. Đo đủ $3$ vị trí trở lên để đường thẳng $s$ theo $t^2$ xuất hiện và đọc $g$ từ hệ số góc.',
  },
  examples: [
    {
      problem:
        'Đo với cổng cách điểm thả $s = 0{,}800$ m (thước có ĐCNN $1$ mm, sai số dụng cụ $0{,}0005$ m), được thời gian $0{,}404$ s; $0{,}405$ s; $0{,}403$ s, đồng hồ có sai số dụng cụ $0{,}0005$ s. Tính $g$ và viết kết quả.',
      steps: [
        'Thời gian trung bình: $\\overline{t} = \\dfrac{0{,}404 + 0{,}405 + 0{,}403}{3} = 0{,}404$ s.',
        'Gia tốc: $\\overline{g} = \\dfrac{2 \\cdot 0{,}800}{0{,}404^2} \\approx 9{,}803$ m/s².',
        'Sai số thời gian: $\\overline{\\Delta t} = \\dfrac{0 + 0{,}001 + 0{,}001}{3} \\approx 0{,}00067$ s, nên $\\Delta t \\approx 0{,}00067 + 0{,}0005 = 0{,}00117$ s.',
        '$\\delta g = \\delta s + 2\\delta t = \\dfrac{0{,}0005}{0{,}800} + 2 \\cdot \\dfrac{0{,}00117}{0{,}404} \\approx 0{,}06\\% + 0{,}58\\% = 0{,}64\\%$.',
        '$\\Delta g = 0{,}64\\% \\cdot 9{,}803 \\approx 0{,}06$ m/s².',
      ],
      answer: '$g = 9{,}80 \\pm 0{,}06$ m/s².',
    },
    {
      problem:
        'Bảng số liệu cho $(s; \\overline{t})$: $(0{,}4; 0{,}286)$; $(0{,}6; 0{,}350)$; $(0{,}8; 0{,}404)$; $(1{,}0; 0{,}452)$; $(1{,}2; 0{,}495)$ (mét; giây). Tính $\\overline{g}$, $\\Delta g$ và $g$ từ đồ thị $s$ theo $t^2$.',
      steps: [
        'Tính $g = \\dfrac{2s}{\\overline{t}^2}$ cho từng dòng: $9{,}780$; $9{,}796$; $9{,}803$; $9{,}789$; $9{,}795$ m/s².',
        'Giá trị trung bình: $\\overline{g} = \\dfrac{9{,}780 + 9{,}796 + 9{,}803 + 9{,}789 + 9{,}795}{5} \\approx 9{,}793$ m/s².',
        'Sai số: $\\Delta g = \\dfrac{0{,}013 + 0{,}003 + 0{,}010 + 0{,}004 + 0{,}002}{5} \\approx 0{,}006$ m/s².',
        'Đồ thị $s$ theo $t^2$ là đường thẳng qua gốc với hệ số góc $k \\approx 4{,}90$ m/s² (ví dụ $\\dfrac{1{,}2}{0{,}245}$), nên $g = 2k \\approx 9{,}8$ m/s², phù hợp với kết quả tính.',
      ],
      answer:
        '$g = 9{,}793 \\pm 0{,}006$ m/s² (chỉ tính sai số ngẫu nhiên giữa các vị trí); đồ thị cho $g \\approx 9{,}8$ m/s².',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt:
        'Công thức nào dùng để tính $g$ khi đo được $s$ và thời gian rơi $t$ từ trạng thái nghỉ?',
      options: [
        '$g = \\dfrac{s}{t}$',
        '$g = \\dfrac{2s}{t}$',
        '$g = \\dfrac{2s}{t^2}$',
        '$g = \\dfrac{s}{2t^2}$',
      ],
      answer: 2,
      hints: ['Bắt đầu từ $s = \\dfrac{1}{2}gt^2$.'],
      solution: 'Từ $s = \\dfrac{1}{2}gt^2$ suy ra $g = \\dfrac{2s}{t^2}$.',
    },
    {
      type: 'number',
      prompt:
        'Trụ thép rơi $0{,}50$ m trong $0{,}32$ s. Tính gia tốc rơi tự do (làm tròn đến hai chữ số thập phân).',
      answer: 9.77,
      tolerance: 0.01,
      unit: 'm/s²',
      hints: ['Áp dụng $g = \\dfrac{2s}{t^2}$; chú ý bình phương thời gian.'],
      solution:
        '$g = \\dfrac{2 \\cdot 0{,}50}{0{,}32^2} = \\dfrac{1}{0{,}1024} \\approx 9{,}77$ m/s².',
    },
    {
      type: 'number',
      prompt:
        'Ba lần đo thời gian rơi được $0{,}451$ s; $0{,}452$ s; $0{,}450$ s. Tính thời gian trung bình.',
      answer: 0.451,
      tolerance: 0.0005,
      unit: 's',
      hints: ['Cộng ba số đo rồi chia cho $3$.'],
      solution: '$\\overline{t} = \\dfrac{0{,}451 + 0{,}452 + 0{,}450}{3} = 0{,}451$ s.',
    },
    {
      type: 'choice',
      prompt: 'Đồ thị $s$ theo $t^2$ của vật rơi tự do có dạng gì?',
      options: [
        'Đường parabol đi qua gốc toạ độ.',
        'Đường thẳng đi qua gốc toạ độ, hệ số góc bằng $\\dfrac{g}{2}$.',
        'Đường thẳng song song với trục $t^2$.',
        'Đường thẳng đi qua gốc toạ độ, hệ số góc bằng $g$.',
      ],
      answer: 1,
      hints: ['Viết $s = \\dfrac{g}{2} \\cdot t^2$ rồi coi $t^2$ là biến.'],
      solution:
        '$s = \\dfrac{g}{2} \\cdot t^2$ có dạng $y = kx$ với $x = t^2$, $k = \\dfrac{g}{2}$.',
    },
    {
      type: 'number',
      prompt: 'Đồ thị $s$ theo $t^2$ có hệ số góc $4{,}88$ m/s². Tính $g$.',
      answer: 9.76,
      tolerance: 0.001,
      unit: 'm/s²',
      hints: ['Hệ số góc bằng nửa $g$.'],
      solution: '$g = 2k = 2 \\cdot 4{,}88 = 9{,}76$ m/s².',
    },
    {
      type: 'number',
      prompt:
        'Đo được $\\delta s = 0{,}1\\%$ và $\\delta t = 0{,}2\\%$. Tính sai số tỉ đối $\\delta g$ của $g = \\dfrac{2s}{t^2}$, theo %.',
      answer: 0.5,
      tolerance: 0.001,
      unit: '%',
      hints: ['$t$ có bậc $2$ nên $\\delta t$ được nhân $2$.'],
      solution: '$\\delta g = \\delta s + 2\\delta t = 0{,}1\\% + 2 \\cdot 0{,}2\\% = 0{,}5\\%$.',
    },
    {
      type: 'multi',
      prompt: 'Những việc nào giúp giảm sai số của phép đo $g$ trong bài này?',
      options: [
        'Chỉnh máng thẳng đứng bằng dây dọi.',
        'Đo nhiều lần ở mỗi vị trí rồi lấy trung bình.',
        'Đặt cổng thật sát điểm thả để đo nhanh hơn.',
        'Đo chính xác khoảng cách từ mép dưới của trụ đến cổng.',
      ],
      answers: [0, 1, 3],
      hints: ['Thời gian đo càng ngắn thì sai số tỉ đối của nó càng lớn hay nhỏ?'],
      solution:
        'Chỉnh thẳng đứng, đo nhiều lần và đo chính xác $s$ đều làm giảm sai số. Đặt cổng quá sát làm $t$ rất nhỏ, sai số tỉ đối của $t$ tăng lên.',
    },
    {
      type: 'order',
      prompt: 'Sắp xếp các bước đo $g$ ở một vị trí cổng.',
      items: [
        'Ngắt điện nam châm để thả trụ, đọc thời gian $t$.',
        'Chỉnh máng thẳng đứng, lắp và nối thiết bị.',
        'Tính $g = \\dfrac{2s}{\\overline{t}^2}$.',
        'Đặt cổng, đo $s$, cho trụ hút vào nam châm, nhấn RESET.',
      ],
      answer: [1, 3, 0, 2],
      hints: ['Lắp thiết bị trước, tính toán sau cùng.'],
      solution:
        'Chỉnh máng và nối thiết bị; đặt cổng, đo $s$, hút trụ vào nam châm và RESET; ngắt điện, đọc $t$ (lặp lại vài lần); cuối cùng tính $g$.',
    },
  ],
  takeaways: [
    'Đo $s$ và thời gian rơi $t$ từ lúc thả đến lúc chắn cổng quang điện, rồi tính $g = \\dfrac{2s}{t^2}$.',
    'Đồ thị $s$ theo $t^2$ là đường thẳng qua gốc: rơi tự do là chuyển động nhanh dần đều, và $g = 2k$.',
    'Kết quả viết dưới dạng $g = \\overline{g} \\pm \\Delta g$; sai số tỉ đối $\\delta g = \\delta s + 2\\delta t$.',
  ],
};
