/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Đơn vị đo chiều dài là mét; bài học giới thiệu giới hạn đo và độ chia nhỏ nhất của thước, cách chọn thước phù hợp, cách đặt thước, đặt mắt và đọc, ghi kết quả đo chiều dài.',
  intro:
    'Gang tay của em và của cô giáo dài khác nhau, nên đo chiếc bàn bằng gang tay thì mỗi người được một kết quả. Để mọi người hiểu nhau khi nói về độ dài, cần một đơn vị chung và những dụng cụ đo đáng tin cậy. Bài này giúp em chọn thước phù hợp và đo chiều dài cho đúng.',
  objectives: [
    'Nêu được đơn vị đo chiều dài và đổi được giữa các đơn vị thường dùng.',
    'Xác định được giới hạn đo (GHĐ) và độ chia nhỏ nhất (ĐCNN) của thước.',
    'Chọn được thước phù hợp với chiều dài cần đo.',
    'Đo được chiều dài bằng thước theo đúng các bước: đặt thước, đặt mắt, đọc và ghi kết quả.',
  ],
  sections: [
    {
      heading: 'Đơn vị đo chiều dài',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Đơn vị đo chiều dài',
          text: 'Trong hệ đơn vị đo lường hợp pháp của nước ta, đơn vị đo chiều dài là mét, kí hiệu là $\\text{m}$.',
        },
        {
          type: 'p',
          text: 'Ngoài mét, ta còn dùng các đơn vị lớn hơn hoặc nhỏ hơn mét:',
        },
        {
          type: 'table',
          caption: 'Một số đơn vị đo chiều dài thường dùng',
          head: ['Đơn vị', 'Kí hiệu', 'Đổi ra mét'],
          rows: [
            ['ki-lô-mét', '$\\text{km}$', '$1\\ \\text{km} = 1000\\ \\text{m}$'],
            ['đề-xi-mét', '$\\text{dm}$', '$1\\ \\text{dm} = 0{,}1\\ \\text{m}$'],
            ['xăng-ti-mét', '$\\text{cm}$', '$1\\ \\text{cm} = 0{,}01\\ \\text{m}$'],
            ['mi-li-mét', '$\\text{mm}$', '$1\\ \\text{mm} = 0{,}001\\ \\text{m}$'],
          ],
        },
        {
          type: 'tex',
          tex: '1\\ \\text{m} = 10\\ \\text{dm} = 100\\ \\text{cm} = 1000\\ \\text{mm}',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Em có biết?',
          text: 'Một số nước còn dùng đơn vị inch: $1\\ \\text{inch} = 2{,}54\\ \\text{cm}$. Màn hình ti vi, điện thoại thường ghi kích thước đường chéo theo inch.',
        },
      ],
    },
    {
      heading: 'Dụng cụ đo chiều dài: GHĐ và ĐCNN',
      blocks: [
        {
          type: 'p',
          text: 'Để đo chiều dài, người ta dùng thước: thước kẻ, thước dây (đo vòng eo, vòng ngực), thước cuộn (đo chiều dài phòng học), thước mét (dùng ở cửa hàng vải)…',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Giới hạn đo và độ chia nhỏ nhất',
          text: 'Giới hạn đo (GHĐ) của thước là độ dài lớn nhất ghi trên thước. Độ chia nhỏ nhất (ĐCNN) của thước là độ dài giữa hai vạch chia liên tiếp trên thước.',
        },
        {
          type: 'p',
          text: 'Cách tìm ĐCNN: chọn hai vạch có ghi số liền nhau, lấy hiệu hai số đó chia cho số khoảng chia giữa chúng. Ví dụ, giữa vạch $0$ và vạch $1\\ \\text{cm}$ có $10$ khoảng chia thì:',
        },
        {
          type: 'p',
          text: 'ĐCNN $= \\dfrac{1\\ \\text{cm}}{10} = 0{,}1\\ \\text{cm} = 1\\ \\text{mm}$.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Chọn thước phù hợp',
          text: 'Ước lượng chiều dài cần đo, rồi chọn thước có GHĐ lớn hơn chiều dài đó (để chỉ đo một lần) và có ĐCNN thích hợp: ĐCNN càng nhỏ thì kết quả đo càng chính xác.',
        },
      ],
    },
    {
      heading: 'Cách đo chiều dài',
      blocks: [
        {
          type: 'list',
          ordered: true,
          items: [
            'Ước lượng chiều dài cần đo để chọn thước đo thích hợp.',
            'Đặt thước đo dọc theo chiều dài cần đo, vạch số $0$ của thước ngang bằng với một đầu của vật.',
            'Đặt mắt nhìn theo hướng vuông góc với cạnh thước ở đầu kia của vật.',
            'Đọc giá trị chiều dài cần đo theo giá trị của vạch chia gần nhất với đầu kia của vật.',
            'Ghi kết quả đo theo ĐCNN của thước.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Đặt mắt sai, đọc sai',
          text: 'Nếu nhìn lệch sang trái hoặc sang phải, đường nhìn chạm thước ở một vạch khác với đầu của vật, nên số đọc được lớn hơn hoặc nhỏ hơn chiều dài thật.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Ghi kết quả theo ĐCNN',
          text: 'Kết quả đo phải là bội của ĐCNN. Với thước có ĐCNN $1\\ \\text{mm}$, kết quả có dạng $17{,}6\\ \\text{cm}$; với thước có ĐCNN $0{,}5\\ \\text{cm}$, kết quả chỉ có thể là $17{,}5\\ \\text{cm}$ hoặc $18\\ \\text{cm}$, không thể là $17{,}6\\ \\text{cm}$.',
        },
      ],
    },
  ],
  explore: {
    title: 'Thước ảo',
    instruction:
      'Chọn vật cần đo và chọn thước. Kéo thước (hoặc chọn thước rồi dùng phím ← →) để vạch $0$ ngang với đầu bên trái của vật. Ở khung phóng to, chọn cách đặt mắt và xem đường nhìn chạm thước ở đâu. Đọc vạch chia gần nhất, nhập kết quả bằng xăng-ti-mét (ví dụ $12{,}5$) và nhấn "Ghi kết quả". Thử đo cùng một vật bằng hai thước khác nhau để thấy vai trò của GHĐ và ĐCNN.',
  },
  examples: [
    {
      problem:
        'Một chiếc thước kẻ có số lớn nhất ghi trên thước là $20$ (đơn vị cm). Giữa vạch số $0$ và vạch số $1$ có $10$ khoảng chia. Xác định GHĐ và ĐCNN của thước.',
      steps: [
        'GHĐ là độ dài lớn nhất ghi trên thước: $20\\ \\text{cm}$.',
        'Giữa hai vạch $0$ và $1\\ \\text{cm}$ có $10$ khoảng chia, nên mỗi khoảng dài $1 : 10 = 0{,}1\\ \\text{cm}$.',
        'Vậy ĐCNN là $0{,}1\\ \\text{cm} = 1\\ \\text{mm}$.',
      ],
      answer: 'GHĐ $= 20\\ \\text{cm}$, ĐCNN $= 1\\ \\text{mm}$.',
    },
    {
      problem:
        'Dùng thước có ĐCNN $0{,}5\\ \\text{cm}$ đo chiếc bút chì. Vạch $0$ ngang với một đầu bút, mắt nhìn vuông góc thì thấy đầu kia của bút nằm giữa vạch $17{,}5\\ \\text{cm}$ và vạch $18\\ \\text{cm}$, gần vạch $17{,}5\\ \\text{cm}$ hơn. Ghi kết quả đo.',
      steps: [
        'Đọc giá trị của vạch chia gần nhất với đầu kia của bút: vạch $17{,}5\\ \\text{cm}$.',
        'Ghi kết quả theo ĐCNN $0{,}5\\ \\text{cm}$: kết quả là bội của $0{,}5\\ \\text{cm}$.',
      ],
      answer: 'Chiều dài bút chì là $17{,}5\\ \\text{cm}$.',
    },
    {
      problem:
        'Có ba thước: thước kẻ (GHĐ $30\\ \\text{cm}$, ĐCNN $1\\ \\text{mm}$), thước dây (GHĐ $1{,}5\\ \\text{m}$, ĐCNN $1\\ \\text{cm}$) và thước cuộn (GHĐ $10\\ \\text{m}$, ĐCNN $1\\ \\text{cm}$). Nên chọn thước nào để đo chiều dài lớp học (khoảng $8\\ \\text{m}$)?',
      steps: [
        'Ước lượng chiều dài lớp học khoảng $8\\ \\text{m}$.',
        'Thước kẻ ($0{,}3\\ \\text{m}$) và thước dây ($1{,}5\\ \\text{m}$) có GHĐ nhỏ hơn $8\\ \\text{m}$, phải đo nhiều lần, dễ sai.',
        'Thước cuộn có GHĐ $10\\ \\text{m} > 8\\ \\text{m}$, đo một lần là được; ĐCNN $1\\ \\text{cm}$ đủ chính xác cho việc đo phòng.',
      ],
      answer: 'Nên chọn thước cuộn.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Đơn vị đo chiều dài trong hệ đơn vị đo lường hợp pháp của nước ta là',
      options: ['xăng-ti-mét (cm)', 'mét (m)', 'ki-lô-mét (km)', 'inch'],
      answer: 1,
      hints: ['Các đơn vị khác đều được định nghĩa từ đơn vị này.'],
      solution: 'Đơn vị đo chiều dài là mét (m); cm, km là ước và bội của mét.',
    },
    {
      type: 'number',
      prompt: 'Đổi $1{,}25\\ \\text{m}$ ra xăng-ti-mét.',
      answer: 125,
      unit: 'cm',
      hints: ['$1\\ \\text{m} = 100\\ \\text{cm}$.'],
      solution: '$1{,}25\\ \\text{m} = 1{,}25 \\cdot 100\\ \\text{cm} = 125\\ \\text{cm}$.',
    },
    {
      type: 'number',
      prompt: 'Đổi $3{,}2\\ \\text{km}$ ra mét.',
      answer: 3200,
      unit: 'm',
      hints: ['$1\\ \\text{km} = 1000\\ \\text{m}$.'],
      solution: '$3{,}2\\ \\text{km} = 3{,}2 \\cdot 1000\\ \\text{m} = 3200\\ \\text{m}$.',
    },
    {
      type: 'number',
      prompt:
        'Trên một thước, giữa vạch $2\\ \\text{cm}$ và vạch $3\\ \\text{cm}$ có $5$ khoảng chia bằng nhau. ĐCNN của thước là bao nhiêu milimét?',
      answer: 2,
      unit: 'mm',
      hints: ['Hai vạch cách nhau $1\\ \\text{cm} = 10\\ \\text{mm}$.', 'Chia cho số khoảng chia.'],
      solution:
        'ĐCNN $= \\dfrac{3\\ \\text{cm} - 2\\ \\text{cm}}{5} = \\dfrac{10\\ \\text{mm}}{5} = 2\\ \\text{mm}$.',
    },
    {
      type: 'order',
      prompt: 'Sắp xếp các bước đo chiều dài theo đúng thứ tự.',
      items: [
        'Đặt mắt nhìn vuông góc với cạnh thước ở đầu kia của vật',
        'Ghi kết quả đo theo ĐCNN',
        'Ước lượng chiều dài để chọn thước',
        'Đọc giá trị của vạch chia gần nhất với đầu kia của vật',
        'Đặt thước dọc theo vật, vạch 0 ngang với một đầu vật',
      ],
      answer: [2, 4, 0, 3, 1],
      hints: ['Chọn thước trước khi đặt thước.', 'Phải đặt mắt đúng rồi mới đọc.'],
      solution:
        'Ước lượng, chọn thước → đặt thước, vạch 0 ngang một đầu vật → đặt mắt vuông góc với cạnh thước → đọc vạch gần nhất → ghi kết quả theo ĐCNN.',
    },
    {
      type: 'choice',
      prompt:
        'Dùng thước có ĐCNN $0{,}5\\ \\text{cm}$ để đo chiều dài quyển sách. Kết quả nào được ghi đúng?',
      options: [
        '$24{,}3\\ \\text{cm}$',
        '$24{,}5\\ \\text{cm}$',
        '$24{,}25\\ \\text{cm}$',
        '$24{,}8\\ \\text{cm}$',
      ],
      answer: 1,
      hints: ['Kết quả phải là bội của ĐCNN $0{,}5\\ \\text{cm}$.'],
      solution:
        'Với ĐCNN $0{,}5\\ \\text{cm}$, kết quả chỉ có thể là $\\ldots;\\ 24\\ \\text{cm};\\ 24{,}5\\ \\text{cm};\\ 25\\ \\text{cm};\\ldots$ Trong các đáp án, chỉ $24{,}5\\ \\text{cm}$ là bội của $0{,}5\\ \\text{cm}$.',
    },
    {
      type: 'choice',
      prompt: 'Để đo chiều dài một quyển vở (khoảng $25\\ \\text{cm}$), nên chọn thước nào?',
      options: [
        'Thước có GHĐ $20\\ \\text{cm}$, ĐCNN $1\\ \\text{mm}$',
        'Thước có GHĐ $30\\ \\text{cm}$, ĐCNN $1\\ \\text{mm}$',
        'Thước có GHĐ $30\\ \\text{cm}$, ĐCNN $1\\ \\text{cm}$',
        'Thước cuộn có GHĐ $5\\ \\text{m}$, ĐCNN $1\\ \\text{cm}$',
      ],
      answer: 1,
      hints: [
        'GHĐ phải lớn hơn $25\\ \\text{cm}$; trong các thước đủ dài, chọn thước có ĐCNN nhỏ nhất.',
      ],
      solution:
        'Thước GHĐ $20\\ \\text{cm}$ quá ngắn. Trong các thước đủ dài, thước GHĐ $30\\ \\text{cm}$, ĐCNN $1\\ \\text{mm}$ có ĐCNN nhỏ nhất nên đo chính xác nhất.',
    },
    {
      type: 'choice',
      prompt:
        'Khi đọc kết quả, bạn Hà nhìn chếch từ bên trái sang đầu bên phải của vật. Số Hà đọc được so với chiều dài thật sẽ thế nào?',
      options: ['Bằng chiều dài thật', 'Lớn hơn chiều dài thật', 'Nhỏ hơn chiều dài thật'],
      answer: 1,
      hints: [
        'Đường nhìn từ bên trái đi qua đầu vật rồi chạm vào thước ở vị trí lệch về phía nào?',
      ],
      solution:
        'Đường nhìn từ bên trái đi qua đầu bên phải của vật rồi chạm thước ở vạch nằm xa hơn về bên phải, nên số đọc lớn hơn chiều dài thật. Phải đặt mắt vuông góc với cạnh thước.',
    },
    {
      type: 'multi',
      prompt: 'Những cách làm nào là đúng khi đo chiều dài bằng thước?',
      options: [
        'Đặt vạch số $0$ của thước ngang bằng với một đầu của vật',
        'Đặt thước chéo so với chiều dài của vật',
        'Đặt mắt nhìn vuông góc với cạnh thước',
        'Đọc theo vạch chia gần nhất với đầu kia của vật',
      ],
      answers: [0, 2, 3],
      hints: ['Thước phải đặt dọc theo chiều dài cần đo.'],
      solution:
        'Đặt thước dọc theo vật với vạch $0$ ngang một đầu, mắt nhìn vuông góc, đọc theo vạch gần nhất là đúng. Đặt thước chéo làm sai kết quả.',
    },
  ],
  takeaways: [
    'Đơn vị đo chiều dài là mét (m); $1\\ \\text{m} = 10\\ \\text{dm} = 100\\ \\text{cm} = 1000\\ \\text{mm}$, $1\\ \\text{km} = 1000\\ \\text{m}$.',
    'GHĐ là độ dài lớn nhất ghi trên thước; ĐCNN là độ dài giữa hai vạch chia liên tiếp.',
    'Chọn thước có GHĐ lớn hơn chiều dài cần đo và ĐCNN thích hợp.',
    'Đặt vạch $0$ ngang một đầu vật, mắt nhìn vuông góc với cạnh thước, đọc vạch gần nhất, ghi kết quả theo ĐCNN.',
  ],
};
