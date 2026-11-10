/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Thực hành đo tần số của sóng âm bằng dao động kí điện tử: micro biến âm của âm thoa thành tín hiệu điện hiện trên màn hình; đọc số ô ngang ứng với một số nguyên chu kì, nhân với giá trị TIME/DIV để có chu kì T, rồi tính f = 1/T và so sánh với tần số ghi trên âm thoa.',
  intro:
    'Âm thoa nào cũng có khắc một con số, chẳng hạn $440$ Hz. Tai ta chỉ nghe thấy một âm cao hay trầm, nhưng với một micro và một dao động kí điện tử, ta có thể "nhìn thấy" sóng âm và tự đo tần số của nó để kiểm tra con số ấy.',
  objectives: [
    'Nêu được công dụng của dao động kí điện tử và ý nghĩa của núm TIME/DIV.',
    'Bố trí được thí nghiệm thu âm của âm thoa bằng micro nối với dao động kí.',
    'Đọc được chu kì của sóng âm trên màn hình dao động kí và tính được tần số $f = \\dfrac{1}{T}$.',
    'Lặp lại phép đo, tính được giá trị trung bình và sai số, viết được kết quả $f = \\overline{f} \\pm \\Delta f$.',
  ],
  sections: [
    {
      heading: 'Cơ sở lí thuyết và dụng cụ',
      blocks: [
        {
          type: 'p',
          text: 'Micro biến dao động của áp suất không khí do âm gây ra thành một điện áp biến thiên cùng tần số. Dao động kí điện tử vẽ điện áp đó theo thời gian trên màn hình có chia ô: trục ngang là thời gian, trục dọc là điện áp. Âm của âm thoa cho đường gần đúng hình sin.',
        },
        {
          type: 'list',
          items: [
            'Núm TIME/DIV (thời gian/ô) cho biết thời gian ứng với một ô theo phương ngang, ví dụ $0{,}5$ ms/ô.',
            'Núm VOLTS/DIV (vôn/ô) cho biết điện áp ứng với một ô theo phương dọc; chỉnh để đồ thị cao vừa màn hình.',
          ],
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Đọc chu kì trên màn hình',
          text: 'Nếu $n$ chu kì chiếm $L$ ô ngang và mỗi ô ứng với thời gian $\\tau$ thì $T = \\dfrac{L\\,\\tau}{n}$ và $f = \\dfrac{1}{T}$.',
        },
        {
          type: 'p',
          text: 'Đo nhiều chu kì một lúc (lấy $n$ lớn, đồ thị trải gần hết màn hình) giúp giảm sai số đọc vạch so với chỉ đo một chu kì.',
        },
        {
          type: 'table',
          caption: 'Dụng cụ cho mỗi nhóm',
          head: ['Dụng cụ', 'Ghi chú'],
          rows: [
            ['Dao động kí điện tử', 'Có núm TIME/DIV và VOLTS/DIV'],
            ['Micro', 'Nối vào lối vào của dao động kí'],
            ['Âm thoa và búa cao su', 'Hai hoặc ba âm thoa có ghi tần số'],
            ['Dây nối, giá đỡ', 'Giữ micro cố định gần âm thoa'],
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Lưu ý',
          text: 'Gõ âm thoa bằng búa cao su, không gõ vào vật cứng. Đặt micro gần nhánh âm thoa nhưng không chạm vào. Bật dao động kí theo hướng dẫn của giáo viên và không vặn các núm quá mạnh.',
        },
      ],
    },
    {
      heading: 'Tiến hành thí nghiệm',
      project: true,
      blocks: [
        {
          type: 'p',
          text: 'Mục tiêu: đo tần số của âm do âm thoa phát ra bằng dao động kí điện tử và so sánh với tần số ghi trên âm thoa.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Nối micro vào dao động kí, bật máy và chỉnh để thấy một đường sáng nằm ngang ở giữa màn hình.',
            'Gõ nhẹ âm thoa, đặt gần micro. Chỉnh núm VOLTS/DIV để đồ thị cao vừa màn hình.',
            'Chỉnh núm TIME/DIV để thấy từ hai đến năm chu kì trên màn hình. Ghi giá trị $\\tau$ của một ô.',
            'Đếm số ô $L$ ứng với $n$ chu kì trọn vẹn (từ một đỉnh đến một đỉnh sau đó), ghi vào bảng.',
            'Tính $T = \\dfrac{L\\,\\tau}{n}$ và $f = \\dfrac{1}{T}$. Làm lại thêm hai lần, mỗi lần gõ lại âm thoa và có thể đổi TIME/DIV.',
            'Lặp lại với một âm thoa khác.',
          ],
        },
        {
          type: 'table',
          caption: 'Bảng kết quả (âm thoa ghi $f_0 = \\ldots$ Hz)',
          head: ['Lần đo', '$\\tau$ (ms/ô)', '$n$', '$L$ (ô)', '$T$ (ms)', '$f$ (Hz)'],
          rows: [
            ['$1$', '...', '...', '...', '...', '...'],
            ['$2$', '...', '...', '...', '...', '...'],
            ['$3$', '...', '...', '...', '...', '...'],
          ],
        },
        {
          type: 'p',
          text: 'Báo cáo: tính $\\overline{f} = \\dfrac{f_1 + f_2 + f_3}{3}$ và sai số $\\Delta f = \\dfrac{|f_1 - \\overline{f}| + |f_2 - \\overline{f}| + |f_3 - \\overline{f}|}{3}$; viết kết quả $f = \\overline{f} \\pm \\Delta f$; so sánh với tần số $f_0$ ghi trên âm thoa và nêu nguyên nhân sai số (đọc vạch trên màn hình, đồ thị dịch chuyển, âm thoa tắt dần).',
        },
        {
          type: 'p',
          text: 'Ở phần Khám phá có một dao động kí ảo với bốn âm thoa chưa biết tần số. Em gõ âm thoa, chọn TIME/DIV, đặt hai con trỏ, đọc số ô, tự tính tần số rồi nhập để kiểm tra.',
        },
      ],
    },
  ],
  explore: {
    title: 'Dao động kí ảo',
    instruction:
      'Chọn một âm thoa và bấm Gõ âm thoa. Vặn núm TIME/DIV cho đến khi màn hình hiện vài chu kì. Kéo hai con trỏ vàng tới hai đỉnh cách nhau $n$ chu kì, đọc số ô, tính $T = \\dfrac{L\\,\\tau}{n}$ và $f = \\dfrac{1}{T}$, rồi nhập $f$ để kiểm tra. Đo ba lần với các thang thời gian khác nhau để có giá trị trung bình.',
  },
  examples: [
    {
      problem:
        'Trên màn hình dao động kí đặt ở $0{,}5$ ms/ô, $2$ chu kì của sóng âm chiếm $8$ ô ngang. Tính chu kì và tần số của âm.',
      steps: [
        'Thời gian ứng với $8$ ô: $8 \\cdot 0{,}5 = 4$ ms.',
        'Đó là $2$ chu kì nên $T = \\dfrac{4}{2} = 2$ ms $= 0{,}002$ s.',
        '$f = \\dfrac{1}{T} = \\dfrac{1}{0{,}002} = 500$ Hz.',
      ],
      answer: '$T = 2$ ms, $f = 500$ Hz.',
    },
    {
      problem:
        'Một nhóm đo tần số của một âm thoa ba lần được $438$ Hz, $444$ Hz và $441$ Hz. Viết kết quả đo.',
      steps: [
        '$\\overline{f} = \\dfrac{438 + 444 + 441}{3} = 441$ Hz.',
        'Các độ lệch: $|438 - 441| = 3$, $|444 - 441| = 3$, $|441 - 441| = 0$.',
        '$\\Delta f = \\dfrac{3 + 3 + 0}{3} = 2$ Hz.',
      ],
      answer: '$f = 441 \\pm 2$ Hz.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt:
        'Dao động kí đặt ở $0{,}5$ ms/ô. Một chu kì của sóng âm chiếm $5$ ô ngang. Tính tần số của âm.',
      answer: 400,
      unit: 'Hz',
      hints: ['$T = 5 \\cdot 0{,}5$ ms; đổi ra giây trước khi tính $f$.'],
      solution:
        '$T = 5 \\cdot 0{,}5 = 2{,}5$ ms $= 0{,}0025$ s, nên $f = \\dfrac{1}{0{,}0025} = 400$ Hz.',
    },
    {
      type: 'number',
      prompt:
        'Dao động kí đặt ở $1$ ms/ô. Ba chu kì của sóng âm chiếm đúng $10$ ô ngang. Tính tần số của âm.',
      answer: 300,
      unit: 'Hz',
      hints: ['$T = \\dfrac{L\\,\\tau}{n}$.'],
      solution:
        '$T = \\dfrac{10 \\cdot 1}{3} = \\dfrac{10}{3}$ ms, nên $f = \\dfrac{1}{T} = \\dfrac{3}{10}$ kHz $= 300$ Hz.',
    },
    {
      type: 'choice',
      prompt: 'Núm TIME/DIV của dao động kí điện tử dùng để',
      options: [
        'chọn thời gian ứng với một ô theo phương ngang',
        'chọn điện áp ứng với một ô theo phương dọc',
        'thay đổi tần số của âm phát ra',
        'thay đổi độ to của âm',
      ],
      answer: 0,
      hints: ['Trục ngang của màn hình biểu diễn đại lượng nào?'],
      solution:
        'Trục ngang là trục thời gian; TIME/DIV cho biết một ô ngang ứng với bao nhiêu thời gian. Điện áp mỗi ô dọc do núm VOLTS/DIV chọn. Dao động kí không làm thay đổi âm.',
    },
    {
      type: 'choice',
      prompt:
        'Vì sao nên đo khoảng thời gian của nhiều chu kì rồi chia cho số chu kì, thay vì đo một chu kì?',
      options: [
        'Để giảm sai số tương đối khi đọc vạch',
        'Để âm thoa phát âm to hơn',
        'Để tần số của âm tăng lên',
        'Vì dao động kí không hiển thị được một chu kì',
      ],
      answer: 0,
      hints: ['Sai số đọc vạch gần như như nhau dù đoạn đo dài hay ngắn.'],
      solution:
        'Sai số đọc vạch (cỡ một vạch chia nhỏ) không đổi, nên đoạn đo càng dài thì sai số tương đối càng nhỏ; chia cho $n$ chu kì cho chu kì chính xác hơn.',
    },
    {
      type: 'number',
      prompt:
        'Ba lần đo tần số của một âm thoa được $252$ Hz, $256$ Hz, $260$ Hz. Tính sai số $\\Delta f$ (sai số trung bình của các lần đo).',
      answer: 2.67,
      tolerance: 0.01,
      unit: 'Hz',
      hints: [
        'Tính $\\overline{f}$ trước.',
        '$\\Delta f$ là trung bình của các độ lệch $|f_i - \\overline{f}|$.',
      ],
      solution:
        '$\\overline{f} = \\dfrac{252 + 256 + 260}{3} = 256$ Hz. Các độ lệch $4$, $0$, $4$, nên $\\Delta f = \\dfrac{8}{3} \\approx 2{,}67$ Hz.',
    },
    {
      type: 'number',
      prompt:
        'Đo được tần số của âm thoa là $440$ Hz. Biết tốc độ âm trong không khí là $340$ m/s, tính bước sóng của âm này (làm tròn đến hai chữ số thập phân).',
      answer: 0.77,
      tolerance: 0.01,
      unit: 'm',
      hints: ['$\\lambda = \\dfrac{v}{f}$.'],
      solution: '$\\lambda = \\dfrac{340}{440} \\approx 0{,}77$ m.',
    },
    {
      type: 'order',
      prompt: 'Sắp xếp các bước đo tần số của âm thoa bằng dao động kí theo đúng thứ tự.',
      items: [
        'Nối micro với dao động kí và bật máy',
        'Gõ âm thoa, đặt gần micro',
        'Chỉnh TIME/DIV để thấy vài chu kì trên màn hình',
        'Đếm số ô ứng với $n$ chu kì',
        'Tính $T$ rồi $f = \\dfrac{1}{T}$',
      ],
      answer: [0, 1, 2, 3, 4],
      hints: ['Phải có tín hiệu trên màn hình rồi mới chỉnh thang và đọc số ô.'],
      solution:
        'Nối micro, bật máy; gõ âm thoa; chỉnh TIME/DIV cho dễ đọc; đếm số ô ứng với $n$ chu kì; tính $T = \\dfrac{L\\,\\tau}{n}$ rồi $f = \\dfrac{1}{T}$.',
    },
  ],
  takeaways: [
    'Micro biến âm thành tín hiệu điện cùng tần số; dao động kí vẽ tín hiệu đó theo thời gian.',
    'TIME/DIV là thời gian ứng với một ô ngang; $n$ chu kì chiếm $L$ ô thì $T = \\dfrac{L\\,\\tau}{n}$, $f = \\dfrac{1}{T}$.',
    'Đo nhiều chu kì và lặp lại nhiều lần để giảm sai số; viết kết quả $f = \\overline{f} \\pm \\Delta f$.',
  ],
};
