/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Phân biệt phép đo trực tiếp và gián tiếp, sai số hệ thống và sai số ngẫu nhiên; tính sai số tuyệt đối, sai số tỉ đối của phép đo và ghi kết quả đo đúng cách, rồi thực hành đo tốc độ của một xe đồ chơi.',
  intro:
    'Dùng cùng một chiếc thước đo cùng một viên bi năm lần, em có thể nhận được năm con số không hoàn toàn giống nhau. Không phép đo nào cho ta giá trị đúng tuyệt đối của một đại lượng. Vậy làm sao biết phép đo chính xác tới đâu, và kết quả nên ghi thế nào cho trung thực?',
  objectives: [
    'Phân biệt được phép đo trực tiếp và phép đo gián tiếp.',
    'Phân biệt được sai số hệ thống và sai số ngẫu nhiên, nêu được cách hạn chế mỗi loại.',
    'Tính được sai số tuyệt đối và sai số tỉ đối của phép đo trực tiếp và gián tiếp.',
    'Ghi được kết quả đo dưới dạng $A = \\overline{A} \\pm \\Delta A$ với số chữ số phù hợp.',
    'Thực hành đo, tính sai số và báo cáo kết quả đo tốc độ của xe đồ chơi.',
  ],
  sections: [
    {
      heading: 'Phép đo trực tiếp và phép đo gián tiếp',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Hai loại phép đo',
          text: 'Phép đo trực tiếp: giá trị của đại lượng được đọc trực tiếp trên dụng cụ đo. Phép đo gián tiếp: giá trị của đại lượng được tính qua công thức liên hệ với các đại lượng đo trực tiếp.',
        },
        {
          type: 'p',
          text: 'Ví dụ, để biết tốc độ của xe đồ chơi chỉ với thước và đồng hồ bấm giây, ta đo trực tiếp quãng đường $s$ và thời gian $t$, rồi tính $v = \\dfrac{s}{t}$. Phép đo $s$ và $t$ là trực tiếp, phép đo $v$ là gián tiếp.',
        },
      ],
    },
    {
      heading: 'Sai số của phép đo',
      blocks: [
        {
          type: 'table',
          caption: 'Hai loại sai số',
          head: ['Đặc điểm', 'Sai số hệ thống', 'Sai số ngẫu nhiên'],
          rows: [
            [
              'Nguyên nhân',
              'Do cấu tạo dụng cụ (sai số dụng cụ), do dụng cụ chưa được hiệu chỉnh như kim lệch vạch $0$, hoặc do người đo luôn đọc lệch một cách',
              'Chưa rõ nguyên nhân, thường do thao tác, điều kiện thí nghiệm, giác quan của người đo',
            ],
            [
              'Biểu hiện',
              'Các lần đo cùng lệch về một phía so với giá trị thật',
              'Các lần đo lúc lớn hơn, lúc nhỏ hơn và khác nhau',
            ],
            [
              'Cách hạn chế',
              'Hiệu chỉnh dụng cụ trước khi đo, chọn dụng cụ phù hợp; đo nhiều lần không loại bỏ được',
              'Đo nhiều lần, lấy giá trị trung bình và tính sai số',
            ],
          ],
        },
        {
          type: 'p',
          text: 'Giả sử đo $n$ lần đại lượng $A$ được $A_1, A_2, \\ldots, A_n$. Ta tính lần lượt:',
        },
        {
          type: 'tex',
          tex: '\\overline{A} = \\dfrac{A_1 + A_2 + \\ldots + A_n}{n}, \\quad \\Delta A_i = \\left| \\overline{A} - A_i \\right|, \\quad \\overline{\\Delta A} = \\dfrac{\\Delta A_1 + \\Delta A_2 + \\ldots + \\Delta A_n}{n}',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Sai số tuyệt đối',
          text: '$\\Delta A = \\overline{\\Delta A} + \\Delta A_{dc}$, trong đó $\\overline{\\Delta A}$ là sai số ngẫu nhiên tuyệt đối trung bình và $\\Delta A_{dc}$ là sai số dụng cụ. Sai số dụng cụ thường được lấy bằng nửa độ chia nhỏ nhất (ĐCNN) của dụng cụ, trừ khi nhà sản xuất hoặc đề bài cho giá trị khác.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Sai số tỉ đối (sai số tương đối)',
          text: '$\\delta A = \\dfrac{\\Delta A}{\\overline{A}} \\cdot 100\\%$. Sai số tỉ đối cho biết mức độ chính xác của phép đo: sai số tỉ đối càng nhỏ, phép đo càng chính xác.',
        },
      ],
    },
    {
      heading: 'Sai số của phép đo gián tiếp',
      blocks: [
        {
          type: 'list',
          items: [
            'Tổng hoặc hiệu: nếu $A = B + C$ hoặc $A = B - C$ thì $\\Delta A = \\Delta B + \\Delta C$. Sai số tuyệt đối của tổng hay hiệu bằng tổng các sai số tuyệt đối.',
            'Tích hoặc thương: nếu $A = B \\cdot C$ hoặc $A = \\dfrac{B}{C}$ thì $\\delta A = \\delta B + \\delta C$. Sai số tỉ đối của tích hay thương bằng tổng các sai số tỉ đối.',
          ],
        },
        {
          type: 'p',
          text: 'Biết $\\delta A$, ta tính lại sai số tuyệt đối bằng $\\Delta A = \\dfrac{\\delta A \\cdot \\overline{A}}{100\\%}$.',
        },
      ],
    },
    {
      heading: 'Cách ghi kết quả đo',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Kết quả đo',
          text: '$A = \\overline{A} \\pm \\Delta A$, nghĩa là giá trị của đại lượng nằm trong khoảng từ $\\overline{A} - \\Delta A$ đến $\\overline{A} + \\Delta A$.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Làm tròn $\\Delta A$ đến cùng hàng với ĐCNN của dụng cụ: chữ số bỏ đi nhỏ hơn $5$ thì giữ nguyên chữ số bên trái; từ $5$ trở lên thì tăng chữ số bên trái thêm $1$ đơn vị.',
            'Viết $\\overline{A}$ đến cùng hàng thập phân với $\\Delta A$.',
          ],
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Chữ số có nghĩa',
          text: 'Các chữ số có nghĩa của một số là mọi chữ số tính từ trái sang, bắt đầu từ chữ số khác $0$ đầu tiên. Chẳng hạn $0{,}0305$ có $3$ chữ số có nghĩa ($3$, $0$, $5$), còn $12{,}0$ cũng có $3$ chữ số có nghĩa. Viết dư chữ số là ghi một độ chính xác mà phép đo không có.',
        },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Không viết $d = 15{,}8634 \\pm 0{,}057$ mm: các chữ số sau hàng của sai số không có ý nghĩa. Viết đúng là $d = 15{,}86 \\pm 0{,}06$ mm.',
        },
      ],
    },
    {
      heading: 'Thực hành: đo tốc độ của xe đồ chơi',
      project: true,
      blocks: [
        {
          type: 'p',
          text: 'Mục tiêu: đo gián tiếp tốc độ trung bình của một xe đồ chơi chạy bằng pin, tính sai số của phép đo và ghi kết quả đúng cách.',
        },
        {
          type: 'list',
          items: [
            'Xe đồ chơi chạy bằng pin, mặt bàn hoặc mặt sàn phẳng.',
            'Thước có ĐCNN $1$ mm, đồng hồ đo thời gian có ĐCNN $0{,}01$ s.',
            'Băng dính để đánh dấu hai điểm $A$ và $B$.',
          ],
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Dán hai vạch $A$ và $B$ cách nhau khoảng $60$ đến $80$ cm. Đo quãng đường $s$ giữa hai vạch $5$ lần, mỗi lần đặt lại thước.',
            'Đặt xe đứng yên ở $A$ rồi cho xe chạy đến $B$, đo thời gian $t$ xe đi từ $A$ đến $B$. Làm $5$ lần.',
            'Ghi số liệu vào bảng dưới đây, tính $\\overline{s}$, $\\overline{t}$ và các sai số. Lấy sai số dụng cụ $\\Delta s_{dc} = 0{,}0005$ m, $\\Delta t_{dc} = 0{,}005$ s.',
            'Tính $\\overline{v} = \\dfrac{\\overline{s}}{\\overline{t}}$, $\\delta v = \\delta s + \\delta t$ và $\\Delta v$; ghi kết quả dưới dạng $v = \\overline{v} \\pm \\Delta v$.',
          ],
        },
        {
          type: 'table',
          caption: 'Bảng số liệu đo quãng đường và thời gian',
          head: ['Lần đo', '$s$ (m)', '$\\Delta s$ (m)', '$t$ (s)', '$\\Delta t$ (s)'],
          rows: [
            ['$1$', '…', '…', '…', '…'],
            ['$2$', '…', '…', '…', '…'],
            ['$3$', '…', '…', '…', '…'],
            ['$4$', '…', '…', '…', '…'],
            ['$5$', '…', '…', '…', '…'],
            ['Trung bình', '…', '…', '…', '…'],
          ],
        },
        {
          type: 'p',
          text: 'Báo cáo: bảng số liệu; kết quả $s$, $t$, $v$ với sai số; nguyên nhân khiến các lần đo khác nhau; đại lượng nào đóng góp nhiều nhất vào sai số của $v$, và em sẽ làm gì để giảm sai số đó.',
        },
      ],
    },
  ],
  explore: {
    title: 'Đo đường kính viên bi',
    instruction:
      'Chọn dụng cụ rồi đo viên bi nhiều lần. Xem cách tính giá trị trung bình và sai số, chọn cách ghi kết quả đúng. Sau đó bật "Bị lệch" ở vạch 0, đo lại và hiện giá trị thật: đo thêm có đưa kết quả về đúng không?',
  },
  examples: [
    {
      problem:
        'Dùng thước kẹp có ĐCNN $0{,}05$ mm đo đường kính một viên bi $5$ lần, được (theo mm): $15{,}85$; $15{,}90$; $15{,}85$; $15{,}80$; $15{,}90$. Hãy tính sai số và ghi kết quả đo.',
      steps: [
        'Trung bình: $\\overline{d} = \\dfrac{15{,}85 + 15{,}90 + 15{,}85 + 15{,}80 + 15{,}90}{5} = \\dfrac{79{,}30}{5} = 15{,}86$ mm.',
        'Sai số từng lần: $\\Delta d_1 = 0{,}01$; $\\Delta d_2 = 0{,}04$; $\\Delta d_3 = 0{,}01$; $\\Delta d_4 = 0{,}06$; $\\Delta d_5 = 0{,}04$ (mm).',
        'Sai số ngẫu nhiên trung bình: $\\overline{\\Delta d} = \\dfrac{0{,}16}{5} = 0{,}032$ mm.',
        'Sai số dụng cụ bằng nửa ĐCNN: $\\Delta d_{dc} = 0{,}025$ mm, nên $\\Delta d = 0{,}032 + 0{,}025 = 0{,}057$ mm.',
        'Làm tròn đến hàng của ĐCNN: $\\Delta d \\approx 0{,}06$ mm. Sai số tỉ đối: $\\delta d = \\dfrac{0{,}06}{15{,}86} \\cdot 100\\% \\approx 0{,}38\\%$.',
      ],
      answer: '$d = 15{,}86 \\pm 0{,}06$ mm, với $\\delta d \\approx 0{,}38\\%$.',
    },
    {
      problem:
        'Đo được quãng đường $s = 0{,}651 \\pm 0{,}002$ m và thời gian $t = 3{,}51 \\pm 0{,}02$ s của một xe đồ chơi. Tính tốc độ $v$ và sai số của nó.',
      steps: [
        'Tốc độ trung bình: $\\overline{v} = \\dfrac{0{,}651}{3{,}51} \\approx 0{,}185$ m/s.',
        'Sai số tỉ đối của từng đại lượng: $\\delta s = \\dfrac{0{,}002}{0{,}651} \\cdot 100\\% \\approx 0{,}31\\%$; $\\delta t = \\dfrac{0{,}02}{3{,}51} \\cdot 100\\% \\approx 0{,}57\\%$.',
        'Vì $v$ là thương của $s$ và $t$ nên $\\delta v = \\delta s + \\delta t \\approx 0{,}88\\%$.',
        '$\\Delta v = 0{,}88\\% \\cdot 0{,}185 \\approx 0{,}002$ m/s.',
      ],
      answer: '$v = 0{,}185 \\pm 0{,}002$ m/s.',
    },
    {
      problem:
        'Đo hai cạnh của một tấm bìa chữ nhật được $a = 20{,}0 \\pm 0{,}1$ cm và $b = 10{,}0 \\pm 0{,}1$ cm. Tính chu vi $C = 2(a + b)$ và diện tích $S = ab$ cùng sai số.',
      steps: [
        'Với tổng, cộng các sai số tuyệt đối: $\\Delta(a + b) = 0{,}1 + 0{,}1 = 0{,}2$ cm, nên $\\Delta C = 2 \\cdot 0{,}2 = 0{,}4$ cm và $\\overline{C} = 2 \\cdot 30{,}0 = 60{,}0$ cm.',
        'Với tích, cộng các sai số tỉ đối: $\\delta a = 0{,}5\\%$; $\\delta b = 1\\%$; $\\delta S = 1{,}5\\%$.',
        '$\\overline{S} = 20{,}0 \\cdot 10{,}0 = 200$ cm$^2$ và $\\Delta S = 1{,}5\\% \\cdot 200 = 3$ cm$^2$.',
      ],
      answer: '$C = 60{,}0 \\pm 0{,}4$ cm và $S = 200 \\pm 3$ cm$^2$.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Phép đo nào sau đây là phép đo gián tiếp?',
      options: [
        'Đo chiều dài bàn học bằng thước.',
        'Đo khối lượng quả cân bằng cân điện tử.',
        'Đo khối lượng riêng của sỏi bằng cân và bình chia độ.',
        'Đo nhiệt độ nước bằng nhiệt kế.',
      ],
      answer: 2,
      hints: ['Phép đo gián tiếp phải tính qua công thức.'],
      solution:
        'Khối lượng riêng được tính bằng công thức $D = \\dfrac{m}{V}$ từ hai đại lượng đo trực tiếp, nên đây là phép đo gián tiếp.',
    },
    {
      type: 'choice',
      prompt:
        'Kim của một cân chỉ $0{,}2$ kg khi chưa đặt vật. Mọi lần cân đều cho số đo lớn hơn thực tế. Đây là loại sai số nào?',
      options: ['Sai số ngẫu nhiên', 'Sai số hệ thống', 'Sai số tỉ đối', 'Sai số do đo nhiều lần'],
      answer: 1,
      hints: ['Các số đo lệch về cùng một phía.'],
      solution:
        'Lệch vạch $0$ làm mọi số đo cùng lệch về một phía: đó là sai số hệ thống, khắc phục bằng cách hiệu chỉnh cân.',
    },
    {
      type: 'multi',
      prompt: 'Những việc nào giúp hạn chế sai số của phép đo?',
      options: [
        'Hiệu chỉnh vạch $0$ của dụng cụ trước khi đo.',
        'Đo nhiều lần và lấy giá trị trung bình.',
        'Chọn dụng cụ có ĐCNN phù hợp.',
        'Ghi kết quả với thật nhiều chữ số thập phân.',
      ],
      answers: [0, 1, 2],
      hints: ['Một phương án chỉ làm con số dài ra, không làm phép đo tốt hơn.'],
      solution:
        'Ba việc đầu làm giảm sai số hệ thống và sai số ngẫu nhiên. Viết nhiều chữ số không làm phép đo chính xác hơn.',
    },
    {
      type: 'number',
      prompt:
        'Đồng hồ có ĐCNN $0{,}01$ s đo thời gian rơi của một vật $5$ lần, được (theo s): $2{,}41$; $2{,}43$; $2{,}42$; $2{,}44$; $2{,}40$. Tính giá trị trung bình $\\overline{t}$.',
      answer: 2.42,
      tolerance: 0.001,
      unit: 's',
      hints: ['Cộng $5$ số đo rồi chia cho $5$.'],
      solution:
        '$\\overline{t} = \\dfrac{2{,}41 + 2{,}43 + 2{,}42 + 2{,}44 + 2{,}40}{5} = \\dfrac{12{,}10}{5} = 2{,}42$ s.',
    },
    {
      type: 'number',
      prompt:
        'Với số liệu trên ($2{,}41$; $2{,}43$; $2{,}42$; $2{,}44$; $2{,}40$ s và $\\overline{t} = 2{,}42$ s), tính sai số ngẫu nhiên tuyệt đối trung bình $\\overline{\\Delta t}$.',
      answer: 0.012,
      tolerance: 0.0005,
      unit: 's',
      hints: [
        'Tính $|\\overline{t} - t_i|$ cho từng lần đo.',
        'Lấy trung bình của năm giá trị đó.',
      ],
      solution:
        'Các sai số là $0{,}01$; $0{,}01$; $0$; $0{,}02$; $0{,}02$ (s). Trung bình: $\\overline{\\Delta t} = \\dfrac{0{,}06}{5} = 0{,}012$ s.',
    },
    {
      type: 'number',
      prompt:
        'Tiếp tục số liệu trên: lấy sai số dụng cụ bằng nửa ĐCNN, rồi làm tròn đến hàng của ĐCNN. Sai số tuyệt đối $\\Delta t$ bằng bao nhiêu?',
      answer: 0.02,
      tolerance: 0.0005,
      unit: 's',
      hints: [
        '$\\Delta t_{dc} = 0{,}005$ s.',
        'Cộng với $\\overline{\\Delta t}$, rồi làm tròn đến hàng phần trăm.',
      ],
      solution:
        '$\\Delta t = 0{,}012 + 0{,}005 = 0{,}017$ s, làm tròn thành $\\Delta t \\approx 0{,}02$ s.',
    },
    {
      type: 'number',
      prompt:
        'Tiếp tục số liệu trên: với $t = 2{,}42 \\pm 0{,}02$ s, tính sai số tỉ đối $\\delta t$ theo %, làm tròn đến hàng phần trăm.',
      answer: 0.83,
      tolerance: 0.01,
      unit: '%',
      hints: ['$\\delta t = \\dfrac{\\Delta t}{\\overline{t}} \\cdot 100\\%$.'],
      solution: '$\\delta t = \\dfrac{0{,}02}{2{,}42} \\cdot 100\\% \\approx 0{,}83\\%$.',
    },
    {
      type: 'choice',
      prompt:
        'Thước có ĐCNN $0{,}1$ cm, tính được $\\overline{L} = 25{,}234$ cm và $\\Delta L = 0{,}13$ cm. Kết quả đo được ghi đúng là',
      options: [
        '$L = 25{,}234 \\pm 0{,}13$ cm',
        '$L = 25{,}23 \\pm 0{,}1$ cm',
        '$L = 25{,}2 \\pm 0{,}1$ cm',
        '$L = 25 \\pm 0{,}1$ cm',
      ],
      answer: 2,
      hints: [
        'Làm tròn $\\Delta L$ đến hàng của ĐCNN trước.',
        '$\\overline{L}$ viết đến cùng hàng với $\\Delta L$.',
      ],
      solution:
        '$\\Delta L = 0{,}13 \\approx 0{,}1$ cm (hàng phần mười). $\\overline{L}$ viết đến hàng phần mười: $25{,}2$ cm. Vậy $L = 25{,}2 \\pm 0{,}1$ cm.',
    },
    {
      type: 'number',
      prompt: 'Số $0{,}0305$ có bao nhiêu chữ số có nghĩa?',
      answer: 3,
      hints: ['Bắt đầu đếm từ chữ số khác $0$ đầu tiên, tính từ trái sang.'],
      solution: 'Các chữ số có nghĩa là $3$, $0$, $5$, nên có $3$ chữ số có nghĩa.',
    },
    {
      type: 'number',
      prompt:
        'Đo được $s_1 = 3{,}25 \\pm 0{,}02$ m và $s_2 = 1{,}40 \\pm 0{,}01$ m. Với $s = s_1 - s_2$, sai số tuyệt đối $\\Delta s$ bằng bao nhiêu mét?',
      answer: 0.03,
      tolerance: 0.0005,
      unit: 'm',
      hints: ['Với hiệu, các sai số cộng hay trừ?'],
      solution:
        'Với cả tổng và hiệu, $\\Delta s = \\Delta s_1 + \\Delta s_2 = 0{,}02 + 0{,}01 = 0{,}03$ m. Sai số không bị trừ đi.',
    },
    {
      type: 'number',
      prompt:
        'Đo khối lượng $m = 50{,}0 \\pm 0{,}5$ g và thể tích $V = 20{,}0 \\pm 0{,}4$ cm$^3$ của một vật. Sai số tỉ đối của khối lượng riêng $D = \\dfrac{m}{V}$ là bao nhiêu %?',
      answer: 3,
      tolerance: 0.01,
      unit: '%',
      hints: ['Tính $\\delta m$ và $\\delta V$ trước.', 'Với thương, các sai số tỉ đối cộng lại.'],
      solution:
        '$\\delta m = \\dfrac{0{,}5}{50{,}0} \\cdot 100\\% = 1\\%$; $\\delta V = \\dfrac{0{,}4}{20{,}0} \\cdot 100\\% = 2\\%$; $\\delta D = 1\\% + 2\\% = 3\\%$.',
    },
    {
      type: 'choice',
      prompt:
        'Phép đo A cho $100 \\pm 1$ cm, phép đo B cho $10{,}0 \\pm 0{,}2$ cm. Phép đo nào chính xác hơn?',
      options: [
        'Phép đo A, vì sai số tỉ đối nhỏ hơn.',
        'Phép đo B, vì sai số tuyệt đối nhỏ hơn.',
        'Hai phép đo chính xác như nhau.',
        'Không so sánh được vì hai đại lượng khác nhau.',
      ],
      answer: 0,
      hints: ['So sánh $\\dfrac{\\Delta A}{\\overline{A}}$ của hai phép đo.'],
      solution:
        'Phép đo A: $\\delta = \\dfrac{1}{100} \\cdot 100\\% = 1\\%$. Phép đo B: $\\delta = \\dfrac{0{,}2}{10{,}0} \\cdot 100\\% = 2\\%$. Phép đo A chính xác hơn dù sai số tuyệt đối lớn hơn.',
    },
  ],
  takeaways: [
    'Phép đo trực tiếp đọc trên dụng cụ; phép đo gián tiếp tính qua công thức.',
    'Sai số hệ thống làm các số đo lệch về một phía, phải hiệu chỉnh; sai số ngẫu nhiên được hạn chế bằng cách đo nhiều lần.',
    '$\\Delta A = \\overline{\\Delta A} + \\Delta A_{dc}$ và $\\delta A = \\dfrac{\\Delta A}{\\overline{A}} \\cdot 100\\%$; sai số tỉ đối càng nhỏ, phép đo càng chính xác.',
    'Tổng, hiệu: cộng các sai số tuyệt đối. Tích, thương: cộng các sai số tỉ đối.',
    'Ghi $A = \\overline{A} \\pm \\Delta A$: $\\Delta A$ làm tròn đến hàng của ĐCNN, $\\overline{A}$ viết đến cùng hàng đó.',
  ],
};
