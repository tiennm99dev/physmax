/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Đo tốc độ bằng cách đo quãng đường và thời gian rồi tính v = s/t: dùng thước và đồng hồ bấm giây, hoặc đồng hồ đo thời gian hiện số với cổng quang điện; thiết bị bắn tốc độ trên đường cũng dùng cách này.',
  intro:
    'Không có dụng cụ nào trong phòng thí nghiệm của lớp em đo thẳng ra tốc độ. Vậy làm sao biết một chiếc xe đồ chơi chạy nhanh bao nhiêu, và làm sao cảnh sát giao thông biết một ô tô đã chạy quá tốc độ cho phép?',
  objectives: [
    'Mô tả được sơ lược cách đo tốc độ bằng đồng hồ bấm giây và bằng đồng hồ đo thời gian hiện số dùng cổng quang điện.',
    'Xác định được tốc độ qua quãng đường vật đi được và khoảng thời gian tương ứng.',
    'Mô tả được sơ lược thiết bị "bắn tốc độ" trong kiểm tra tốc độ các phương tiện giao thông.',
  ],
  sections: [
    {
      heading: 'Đo tốc độ là đo quãng đường và thời gian',
      blocks: [
        {
          type: 'p',
          text: 'Tốc độ không đo trực tiếp được. Ta đo trực tiếp quãng đường $s$ (bằng thước) và thời gian $t$ (bằng đồng hồ), rồi tính tốc độ theo công thức $v = \\dfrac{s}{t}$. Cách đo như vậy gọi là đo gián tiếp.',
        },
        {
          type: 'list',
          items: [
            'Đo quãng đường: thước thẳng, thước dây, thước cuộn, thước đo bằng tia laser…',
            'Đo thời gian: đồng hồ bấm giây, đồng hồ đo thời gian hiện số dùng cổng quang điện.',
          ],
        },
      ],
    },
    {
      heading: 'Đo tốc độ bằng đồng hồ bấm giây',
      blocks: [
        {
          type: 'p',
          text: 'Thí nghiệm: đo tốc độ của một xe đồ chơi chạy trên mặt dốc. Dùng phấn vạch trên tấm gỗ một vạch xuất phát và một vạch đích cách nhau $50\\ \\text{cm}$ hoặc $60\\ \\text{cm}$.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Dùng thước đo quãng đường $s$ từ vạch xuất phát đến vạch đích.',
            'Dùng đồng hồ bấm giây đo thời gian $t$ từ lúc xe bắt đầu chạy qua vạch xuất phát đến lúc xe tới vạch đích.',
            'Tính tốc độ: $v = \\dfrac{s}{t}$.',
            'Lặp lại thí nghiệm ba lần, ghi kết quả vào bảng và tính giá trị trung bình.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Sai số do tay bấm',
          text: 'Người bấm đồng hồ thường bấm sớm hoặc muộn một chút so với lúc xe qua vạch. Với chuyển động diễn ra trong một vài giây, khoảng lệch $0{,}1\\ \\text{s}$ – $0{,}2\\ \\text{s}$ đã làm kết quả sai đáng kể. Vì vậy cần đo nhiều lần và lấy giá trị trung bình.',
        },
      ],
    },
    {
      heading: 'Đo tốc độ bằng đồng hồ đo thời gian hiện số và cổng quang điện',
      blocks: [
        {
          type: 'p',
          text: 'Dụng cụ: máng (hoặc đường ray) có thước đo gắn trên giá đỡ, viên bi sắt hoặc xe nhỏ, đồng hồ đo thời gian hiện số và hai cổng quang điện A, B nối với đồng hồ.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Đặt hai cổng quang điện A và B trên máng; đọc trên thước khoảng cách giữa hai cổng. Khoảng cách này là quãng đường $s$ vật chạy.',
            'Vặn núm MODE sang chế độ A↔B, chọn thang đo phù hợp, nhấn RESET để số chỉ về $0$.',
            'Cho vật chạy qua hai cổng: đồng hồ tự bật khi vật qua cổng A, tự tắt khi vật qua cổng B. Số chỉ trên đồng hồ là thời gian $t$ vật đi từ A đến B.',
            'Tính $v = \\dfrac{s}{t}$; lặp lại ba lần và lấy giá trị trung bình.',
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Vì sao chính xác hơn',
          text: 'Cổng quang điện bật và tắt đồng hồ đúng lúc vật chắn tia hồng ngoại, không phụ thuộc phản xạ của người đo; đồng hồ còn đo được đến $0{,}001\\ \\text{s}$. Vì vậy các lần đo cho kết quả gần như bằng nhau.',
        },
      ],
    },
    {
      heading: 'Thiết bị "bắn tốc độ"',
      blocks: [
        {
          type: 'p',
          text: 'Trên nhiều tuyến đường, người ta kẻ hai vạch mốc cách nhau một khoảng cố định (ví dụ $5\\ \\text{m}$) và đặt thiết bị bắn tốc độ có camera theo dõi bên đường.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Camera ghi hình phương tiện và ghi lại thời gian xe chạy từ vạch mốc 1 đến vạch mốc 2.',
            'Máy tính trong thiết bị tính tốc độ $v = \\dfrac{s}{t}$, với $s$ là khoảng cách giữa hai vạch mốc, rồi hiển thị kết quả.',
            'Nếu xe chạy quá tốc độ giới hạn, camera tự động chụp ảnh kèm số liệu tốc độ và biển số xe, gửi về trạm cảnh sát giao thông.',
          ],
        },
        { type: 'widget', name: 'speed-camera' },
        {
          type: 'p',
          text: 'Cảnh sát giao thông cũng dùng thiết bị bắn tốc độ cầm tay: chỉ cần hướng thiết bị về phía xe, màn hình hiện ngay tốc độ của xe.',
        },
      ],
    },
  ],
  explore: {
    title: 'Đo tốc độ xe đồ chơi',
    instruction:
      'Chọn cách đo, đặt khoảng cách $s$ giữa hai vạch A, B trên thước rồi nhấn "Cho xe chạy". Với cổng quang điện, đồng hồ tự đo thời gian; với đồng hồ bấm giây, em tự nhấn "Bấm giây" khi xe chạm vạch A và khi xe chạm vạch B. Sau mỗi lần đo, tự tính $v = \\dfrac{s}{t}$ theo $\\text{m/s}$ và nhập để kiểm tra. So sánh kết quả bấm tay với kết quả cổng quang của cùng một xe.',
  },
  examples: [
    {
      problem:
        'Dùng cổng quang điện đo thời gian viên bi chạy giữa hai cổng cách nhau $50\\ \\text{cm}$, ba lần đo được $0{,}780\\ \\text{s}$; $0{,}784\\ \\text{s}$; $0{,}782\\ \\text{s}$. Tính tốc độ trung bình của viên bi trên đoạn đó.',
      steps: [
        'Thời gian trung bình: $t = \\dfrac{0{,}780 + 0{,}784 + 0{,}782}{3} = \\dfrac{2{,}346}{3} = 0{,}782\\ \\text{(s)}$.',
        'Đổi quãng đường: $s = 50\\ \\text{cm} = 0{,}5\\ \\text{m}$.',
        'Tốc độ: $v = \\dfrac{s}{t} = \\dfrac{0{,}5}{0{,}782} \\approx 0{,}64\\ \\text{(m/s)}$.',
      ],
      answer: '$v \\approx 0{,}64\\ \\text{m/s}$.',
    },
    {
      problem:
        'Camera của một thiết bị bắn tốc độ ghi được thời gian một ô tô chạy từ vạch mốc 1 đến vạch mốc 2 cách nhau $5\\ \\text{m}$ là $0{,}35\\ \\text{s}$. Tốc độ giới hạn trên đoạn đường này là $60\\ \\text{km/h}$. Ô tô có vượt quá tốc độ giới hạn không?',
      steps: [
        'Tốc độ của ô tô: $v = \\dfrac{s}{t} = \\dfrac{5}{0{,}35} \\approx 14{,}29\\ \\text{(m/s)}$.',
        'Đổi sang km/h: $14{,}29 \\cdot 3{,}6 \\approx 51{,}4\\ \\text{(km/h)}$.',
        'So sánh: $51{,}4\\ \\text{km/h} < 60\\ \\text{km/h}$.',
      ],
      answer: 'Ô tô chạy khoảng $51{,}4\\ \\text{km/h}$, không vượt quá tốc độ giới hạn.',
    },
    {
      problem:
        'Một nhóm học sinh đo tốc độ xe đồ chơi trên mặt dốc bằng đồng hồ bấm giây. Vạch xuất phát cách vạch đích $60\\ \\text{cm}$, thời gian đo được là $2{,}40\\ \\text{s}$. Tính tốc độ của xe.',
      steps: [
        'Đổi $s = 60\\ \\text{cm} = 0{,}6\\ \\text{m}$.',
        '$v = \\dfrac{s}{t} = \\dfrac{0{,}6}{2{,}40} = 0{,}25\\ \\text{(m/s)}$.',
      ],
      answer: '$v = 0{,}25\\ \\text{m/s}$.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Để xác định tốc độ của một vật, ta cần đo trực tiếp những đại lượng nào?',
      options: [
        'Khối lượng và thời gian',
        'Quãng đường và thời gian',
        'Quãng đường và khối lượng',
        'Chỉ cần đo thời gian',
      ],
      answer: 1,
      hints: ['Nhìn vào công thức $v = \\dfrac{s}{t}$.'],
      solution:
        'Tốc độ được tính gián tiếp từ $v = \\dfrac{s}{t}$, nên cần đo quãng đường $s$ và thời gian $t$.',
    },
    {
      type: 'order',
      prompt: 'Sắp xếp các bước đo tốc độ của xe đồ chơi bằng đồng hồ bấm giây theo đúng thứ tự.',
      items: [
        'Tính tốc độ bằng công thức $v = \\dfrac{s}{t}$',
        'Dùng thước đo quãng đường từ vạch xuất phát đến vạch đích',
        'Bấm đồng hồ khi xe qua vạch xuất phát và bấm lần nữa khi xe tới vạch đích',
      ],
      answer: [1, 2, 0],
      hints: ['Phải có số liệu $s$ và $t$ trước khi tính.'],
      solution:
        'Đo quãng đường bằng thước → đo thời gian bằng đồng hồ bấm giây → tính $v = \\dfrac{s}{t}$.',
    },
    {
      type: 'number',
      prompt:
        'Hai cổng quang điện đặt cách nhau $40\\ \\text{cm}$. Đồng hồ hiện số (chế độ A↔B) chỉ $0{,}500\\ \\text{s}$. Tốc độ của viên bi giữa hai cổng là bao nhiêu mét trên giây?',
      answer: 0.8,
      tolerance: 0.001,
      unit: 'm/s',
      hints: ['Đổi $40\\ \\text{cm}$ ra mét trước khi chia.'],
      solution: '$s = 0{,}4\\ \\text{m}$; $v = \\dfrac{0{,}4}{0{,}500} = 0{,}8\\ \\text{(m/s)}$.',
    },
    {
      type: 'number',
      prompt:
        'Ba lần đo thời gian xe đồ chơi chạy hết đoạn $60\\ \\text{cm}$ bằng đồng hồ bấm giây được $2{,}45\\ \\text{s}$; $2{,}51\\ \\text{s}$; $2{,}48\\ \\text{s}$. Dùng thời gian trung bình, tính tốc độ của xe (m/s, làm tròn đến hàng phần trăm).',
      answer: 0.24,
      tolerance: 0.005,
      unit: 'm/s',
      hints: [
        'Thời gian trung bình là tổng ba lần đo chia cho $3$.',
        'Đổi $60\\ \\text{cm} = 0{,}6\\ \\text{m}$ rồi chia cho thời gian trung bình.',
      ],
      solution:
        '$t = \\dfrac{2{,}45 + 2{,}51 + 2{,}48}{3} = \\dfrac{7{,}44}{3} = 2{,}48\\ \\text{(s)}$; $v = \\dfrac{0{,}6}{2{,}48} \\approx 0{,}24\\ \\text{(m/s)}$.',
    },
    {
      type: 'number',
      prompt:
        'Camera bắn tốc độ ghi được thời gian một ô tô chạy qua hai vạch mốc cách nhau $5\\ \\text{m}$ là $0{,}25\\ \\text{s}$. Tốc độ của ô tô là bao nhiêu kilômét trên giờ?',
      answer: 72,
      tolerance: 0.05,
      unit: 'km/h',
      hints: ['Tính tốc độ theo m/s trước.', 'Đổi m/s sang km/h thì nhân với $3{,}6$.'],
      solution:
        '$v = \\dfrac{5}{0{,}25} = 20\\ \\text{(m/s)} = 20 \\cdot 3{,}6 = 72\\ \\text{(km/h)}$.',
    },
    {
      type: 'choice',
      prompt:
        'Trên đoạn đường giới hạn $60\\ \\text{km/h}$, hai vạch mốc cách nhau $5\\ \\text{m}$. Camera ghi được thời gian một xe chạy qua hai vạch là $0{,}28\\ \\text{s}$. Kết luận nào đúng?',
      options: [
        'Xe chạy khoảng $17{,}9\\ \\text{km/h}$, không vượt tốc độ',
        'Xe chạy khoảng $64{,}3\\ \\text{km/h}$, vượt tốc độ giới hạn',
        'Xe chạy khoảng $50\\ \\text{km/h}$, không vượt tốc độ',
        'Không đủ số liệu để kết luận',
      ],
      answer: 1,
      hints: [
        'Tính $v = \\dfrac{s}{t}$ theo m/s rồi đổi ra km/h.',
        'Nếu chỉ tính $5 : 0{,}28$ mà quên đổi đơn vị, em sẽ được kết quả theo m/s.',
      ],
      solution:
        '$v = \\dfrac{5}{0{,}28} \\approx 17{,}86\\ \\text{m/s} \\approx 64{,}3\\ \\text{km/h} > 60\\ \\text{km/h}$: xe vượt tốc độ giới hạn.',
    },
    {
      type: 'multi',
      prompt:
        'Vì sao đo tốc độ viên bi bằng đồng hồ hiện số và cổng quang điện cho kết quả chính xác hơn dùng đồng hồ bấm giây?',
      options: [
        'Đồng hồ được bật, tắt tự động khi vật chắn tia sáng của cổng quang',
        'Không có sai số do phản xạ của tay người bấm',
        'Đồng hồ hiện số đo được thời gian đến $0{,}001\\ \\text{s}$',
        'Cổng quang làm viên bi chạy nhanh hơn',
      ],
      answers: [0, 1, 2],
      hints: ['Sai số khi bấm tay đến từ đâu?', 'Cổng quang có tác dụng lực lên viên bi không?'],
      solution:
        'Cổng quang bật, tắt đồng hồ tự động đúng lúc vật đi qua nên không có sai số do tay bấm, và đồng hồ đo được đến $0{,}001\\ \\text{s}$. Cổng quang chỉ phát và thu tia hồng ngoại, không làm thay đổi chuyển động của viên bi.',
    },
    {
      type: 'choice',
      prompt: 'Thiết bị bắn tốc độ có camera đặt bên đường xác định tốc độ của ô tô bằng cách',
      options: [
        'đo khối lượng của ô tô',
        'đo thời gian ô tô chạy giữa hai vạch mốc đã biết khoảng cách, rồi tính $v = \\dfrac{s}{t}$',
        'đọc số trên đồng hồ tốc độ của ô tô',
        'đếm số xe chạy qua trong một phút',
      ],
      answer: 1,
      hints: ['Thiết bị cũng đo gián tiếp, như khi em đo tốc độ trong phòng thí nghiệm.'],
      solution:
        'Khoảng cách giữa hai vạch mốc đã biết; camera ghi thời gian xe chạy giữa hai vạch, máy tính tính $v = \\dfrac{s}{t}$ và hiển thị tốc độ.',
    },
  ],
  takeaways: [
    'Tốc độ được đo gián tiếp: đo quãng đường $s$ bằng thước, đo thời gian $t$ bằng đồng hồ, rồi tính $v = \\dfrac{s}{t}$.',
    'Đồng hồ bấm giây dễ có sai số do tay bấm; đồng hồ hiện số với cổng quang điện bật, tắt tự động nên chính xác hơn.',
    'Nên đo nhiều lần và lấy giá trị trung bình.',
    'Thiết bị bắn tốc độ đo thời gian xe chạy giữa hai vạch mốc đã biết khoảng cách, tính tốc độ và chụp ảnh xe vượt tốc độ giới hạn.',
  ],
};
