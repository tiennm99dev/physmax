/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Đơn vị đo thời gian là giây; bài học giới thiệu các loại đồng hồ, cách ước lượng thời gian để chọn đồng hồ phù hợp và cách đo thời gian bằng đồng hồ bấm giây theo các bước Reset, Start, Stop.',
  intro:
    'Trong giờ thể dục, thầy giáo đo thời gian em chạy $60\\ \\text{m}$ bằng một chiếc đồng hồ nhỏ có nút bấm, còn chiếc đồng hồ treo tường lớp học chỉ dùng để xem giờ. Vì sao thầy không nhìn đồng hồ treo tường để tính thời gian chạy? Bài này giúp em chọn đồng hồ phù hợp và đo thời gian cho đúng.',
  objectives: [
    'Nêu được đơn vị đo thời gian và đổi được giữa giây, phút, giờ, ngày.',
    'Kể được một số loại đồng hồ và công dụng của chúng.',
    'Ước lượng được khoảng thời gian cần đo để chọn đồng hồ phù hợp.',
    'Đo được thời gian bằng đồng hồ bấm giây đúng các bước; biết đo nhiều lần và lấy giá trị trung bình.',
  ],
  sections: [
    {
      heading: 'Đơn vị đo thời gian',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Đơn vị đo thời gian',
          text: 'Trong hệ đơn vị đo lường hợp pháp của nước ta, đơn vị đo thời gian là giây, kí hiệu là $\\text{s}$.',
        },
        {
          type: 'p',
          text: 'Ngoài giây, ta còn dùng các đơn vị lớn hơn: phút ($\\text{min}$), giờ ($\\text{h}$), ngày, tuần, tháng, năm, thế kỉ.',
        },
        {
          type: 'table',
          caption: 'Đổi một số đơn vị đo thời gian',
          head: ['Đơn vị', 'Đổi'],
          rows: [
            ['1 phút', '$60\\ \\text{s}$'],
            ['1 giờ', '$60\\ \\text{phút} = 3600\\ \\text{s}$'],
            ['1 ngày', '$24\\ \\text{giờ} = 86\\,400\\ \\text{s}$'],
            ['1 tuần', '$7\\ \\text{ngày}$'],
            ['1 thế kỉ', '$100\\ \\text{năm}$'],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Em có biết?',
          text: 'Mỗi nhịp tim của người bình thường kéo dài khoảng $0{,}8\\ \\text{s}$; một cái chớp mắt chỉ khoảng $0{,}1\\ \\text{s}$. Ngày xưa ông cha ta chia đêm thành năm canh, mỗi canh khoảng $2$ giờ.',
        },
      ],
    },
    {
      heading: 'Dụng cụ đo thời gian',
      blocks: [
        {
          type: 'p',
          text: 'Dụng cụ đo thời gian là đồng hồ. Mỗi loại đồng hồ hợp với một việc:',
        },
        {
          type: 'table',
          head: ['Loại đồng hồ', 'Công dụng'],
          rows: [
            [
              'Đồng hồ treo tường, đồng hồ đeo tay, đồng hồ quả lắc',
              'Xem giờ, đo những khoảng thời gian dài trong sinh hoạt hằng ngày.',
            ],
            [
              'Đồng hồ bấm giây (cơ hoặc điện tử)',
              'Đo những khoảng thời gian ngắn cần chính xác: thi đấu thể thao, thí nghiệm.',
            ],
            [
              'Đồng hồ đo thời gian hiện số dùng cổng quang',
              'Đo rất chính xác thời gian vật chuyển động trong phòng thí nghiệm; máy tự bật, tự tắt khi vật đi qua cổng quang.',
            ],
            ['Đồng hồ cát', 'Đo khoảng thời gian không cần độ chính xác cao.'],
          ],
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'GHĐ và ĐCNN của đồng hồ',
          text: 'Giới hạn đo (GHĐ) của đồng hồ là khoảng thời gian dài nhất đồng hồ đo được; độ chia nhỏ nhất (ĐCNN) là khoảng thời gian nhỏ nhất đồng hồ phân biệt được. Đồng hồ bấm giây điện tử thường có ĐCNN $0{,}01\\ \\text{s}$, còn đồng hồ treo tường có kim giây chỉ có ĐCNN $1\\ \\text{s}$.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Ước lượng thời gian',
          text: 'Trước khi đo, hãy ước lượng khoảng thời gian cần đo. Việc kéo dài vài giây, cần chính xác thì dùng đồng hồ bấm giây; việc kéo dài hàng giờ thì dùng đồng hồ treo tường hoặc đồng hồ đeo tay là đủ.',
        },
      ],
    },
    {
      heading: 'Cách đo thời gian',
      blocks: [
        {
          type: 'p',
          text: 'Đo thời gian bằng đồng hồ, ta thực hiện các bước:',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Ước lượng khoảng thời gian cần đo để chọn đồng hồ thích hợp.',
            'Hiệu chỉnh đồng hồ đúng cách trước khi đo (đưa đồng hồ bấm giây về số $0$).',
            'Thực hiện phép đo thời gian bằng đồng hồ.',
            'Đọc và ghi kết quả đo.',
          ],
        },
        {
          type: 'p',
          text: 'Với đồng hồ bấm giây điện tử, phép đo gồm ba thao tác:',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Nhấn nút Reset để đưa đồng hồ về số $0$.',
            'Nhấn nút Start đúng lúc sự việc bắt đầu.',
            'Nhấn nút Stop đúng lúc sự việc kết thúc, rồi đọc số trên màn hình.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Quên Reset, kết quả sai',
          text: 'Nút Start chỉ cho đồng hồ chạy tiếp từ số đang hiện. Nếu quên Reset, thời gian của lần đo trước bị cộng vào lần đo sau.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Đo nhiều lần, lấy trung bình',
          text: 'Tay người bấm nút lúc nhanh lúc chậm, nên mỗi lần đo cùng một việc lại được một kết quả hơi khác. Nên đo nhiều lần rồi lấy giá trị trung bình: cộng các kết quả rồi chia cho số lần đo.',
        },
      ],
    },
  ],
  explore: {
    title: 'Đo thời gian bóng lăn',
    instruction:
      'Nhấn "Thả bóng": sau khi đếm ngược, bóng bắt đầu lăn xuống máng. Bấm Start đúng lúc bóng rời vạch xuất phát và Stop đúng lúc bóng chạm vạch đích. Nhấn Reset trước mỗi lần đo. Đo ít nhất ba lần để so sánh các kết quả, xem giá trị trung bình và so với kết quả của đồng hồ cổng quang. Thử một lần quên Reset để thấy chuyện gì xảy ra.',
  },
  examples: [
    {
      problem: 'Đổi $1$ giờ $20$ phút ra giây.',
      steps: [
        '$1$ giờ $= 60$ phút, nên $1$ giờ $20$ phút $= 60 + 20 = 80$ phút.',
        '$1$ phút $= 60\\ \\text{s}$, nên $80$ phút $= 80 \\cdot 60 = 4800\\ \\text{s}$.',
      ],
      answer: '$1$ giờ $20$ phút $= 4800\\ \\text{s}$.',
    },
    {
      problem:
        'Ba lần đo thời gian một quả bóng lăn hết máng bằng đồng hồ bấm giây được: $2{,}58\\ \\text{s}$; $2{,}71\\ \\text{s}$; $2{,}65\\ \\text{s}$. Tính thời gian lăn trung bình. Vì sao ba kết quả khác nhau?',
      steps: [
        'Cộng ba kết quả: $2{,}58 + 2{,}71 + 2{,}65 = 7{,}94\\ \\text{(s)}$.',
        'Chia cho số lần đo: $7{,}94 : 3 \\approx 2{,}65\\ \\text{(s)}$, làm tròn theo ĐCNN $0{,}01\\ \\text{s}$.',
        'Các kết quả khác nhau vì người đo bấm Start và Stop lúc sớm, lúc muộn hơn thời điểm bóng xuất phát và về đích.',
      ],
      answer: 'Thời gian lăn trung bình khoảng $2{,}65\\ \\text{s}$.',
    },
    {
      problem:
        'Bạn Lan quên nhấn Reset: trước khi đo, đồng hồ bấm giây đang chỉ $1{,}50\\ \\text{s}$. Lan bấm Start khi bóng xuất phát, bấm Stop khi bóng về đích, đồng hồ chỉ $4{,}12\\ \\text{s}$. Bóng lăn hết bao lâu?',
      steps: [
        'Nút Start cho đồng hồ chạy tiếp từ $1{,}50\\ \\text{s}$, nên số chỉ cuối đã cộng thêm $1{,}50\\ \\text{s}$.',
        'Thời gian bóng lăn: $4{,}12 - 1{,}50 = 2{,}62\\ \\text{(s)}$.',
        'Cách làm đúng: nhấn Reset đưa đồng hồ về $0$ trước khi đo.',
      ],
      answer: 'Bóng lăn hết $2{,}62\\ \\text{s}$.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Đơn vị đo thời gian trong hệ đơn vị đo lường hợp pháp của nước ta là',
      options: ['phút', 'giờ', 'giây', 'ngày'],
      answer: 2,
      hints: ['Kí hiệu của đơn vị này là $\\text{s}$.'],
      solution: 'Đơn vị đo thời gian là giây ($\\text{s}$); phút, giờ, ngày là các đơn vị lớn hơn.',
    },
    {
      type: 'number',
      prompt: 'Đổi $2{,}5$ phút ra giây.',
      answer: 150,
      unit: 's',
      hints: ['$1$ phút $= 60\\ \\text{s}$.'],
      solution: '$2{,}5$ phút $= 2{,}5 \\cdot 60\\ \\text{s} = 150\\ \\text{s}$.',
    },
    {
      type: 'number',
      prompt: 'Một tiết học kéo dài $45$ phút. Đổi ra giây.',
      answer: 2700,
      unit: 's',
      hints: ['Nhân số phút với $60$.'],
      solution: '$45$ phút $= 45 \\cdot 60\\ \\text{s} = 2700\\ \\text{s}$.',
    },
    {
      type: 'order',
      prompt: 'Sắp xếp các thao tác đo thời gian bằng đồng hồ bấm giây điện tử theo đúng thứ tự.',
      items: [
        'Nhấn Stop khi sự việc kết thúc',
        'Nhấn Reset để đưa đồng hồ về số 0',
        'Đọc và ghi kết quả',
        'Nhấn Start khi sự việc bắt đầu',
      ],
      answer: [1, 3, 0, 2],
      hints: ['Đồng hồ phải chỉ số 0 trước khi bắt đầu đo.'],
      solution:
        'Reset → Start khi sự việc bắt đầu → Stop khi sự việc kết thúc → đọc và ghi kết quả.',
    },
    {
      type: 'match',
      prompt: 'Ghép mỗi việc cần đo thời gian với loại đồng hồ phù hợp nhất.',
      left: [
        'Thời gian chạy $60\\ \\text{m}$ trong giờ thể dục',
        'Thời gian một buổi học',
        'Thời gian một viên bi lăn qua hai cổng quang trong thí nghiệm',
        'Khoảng $3$ phút đánh răng, không cần chính xác',
      ],
      right: [
        'Đồng hồ bấm giây',
        'Đồng hồ treo tường',
        'Đồng hồ đo thời gian hiện số',
        'Đồng hồ cát',
      ],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: [
        'Việc ngắn, cần chính xác thì cần đồng hồ có ĐCNN nhỏ.',
        'Cổng quang đi cùng một loại đồng hồ riêng.',
      ],
      solution:
        'Chạy $60\\ \\text{m}$: đồng hồ bấm giây. Buổi học: đồng hồ treo tường. Viên bi qua cổng quang: đồng hồ đo thời gian hiện số. Đánh răng $3$ phút không cần chính xác: đồng hồ cát.',
    },
    {
      type: 'number',
      prompt:
        'Ba lần đo thời gian bóng lăn hết máng được $2{,}62\\ \\text{s}$; $2{,}70\\ \\text{s}$; $2{,}66\\ \\text{s}$. Thời gian lăn trung bình là bao nhiêu giây?',
      answer: 2.66,
      tolerance: 0.005,
      unit: 's',
      hints: ['Cộng ba kết quả rồi chia cho $3$.'],
      solution: '$(2{,}62 + 2{,}70 + 2{,}66) : 3 = 7{,}98 : 3 = 2{,}66\\ \\text{(s)}$.',
    },
    {
      type: 'number',
      prompt:
        'Trước khi đo, đồng hồ bấm giây đang chỉ $3{,}20\\ \\text{s}$ vì bạn Nam quên nhấn Reset. Đo xong, đồng hồ chỉ $5{,}85\\ \\text{s}$. Thời gian thật của sự việc là bao nhiêu giây?',
      answer: 2.65,
      tolerance: 0.005,
      unit: 's',
      hints: ['Đồng hồ chạy tiếp từ số cũ, nên số cuối đã cộng thêm số cũ.'],
      solution: 'Thời gian thật: $5{,}85 - 3{,}20 = 2{,}65\\ \\text{(s)}$.',
    },
    {
      type: 'choice',
      prompt:
        'Một đồng hồ bấm giây điện tử có ĐCNN $0{,}01\\ \\text{s}$. Kết quả nào dưới đây được ghi đúng khi dùng đồng hồ này?',
      options: [
        '$12{,}5\\ \\text{s}$',
        '$12{,}46\\ \\text{s}$',
        '$12{,}463\\ \\text{s}$',
        '$12\\ \\text{s}$',
      ],
      answer: 1,
      hints: ['Kết quả ghi theo ĐCNN của dụng cụ: đến phần trăm giây.'],
      solution:
        'Đồng hồ phân biệt được $0{,}01\\ \\text{s}$, màn hình hiện đến chữ số phần trăm giây, nên ghi $12{,}46\\ \\text{s}$.',
    },
    {
      type: 'multi',
      prompt: 'Vì sao nên đo thời gian bóng lăn nhiều lần rồi lấy giá trị trung bình?',
      options: [
        'Vì tay bấm Start, Stop lúc sớm lúc muộn nên mỗi lần đo có sai lệch',
        'Vì bóng lăn mỗi lần một nhanh hơn',
        'Vì giá trị trung bình thường gần thời gian thật hơn từng lần đo',
        'Vì đồng hồ bấm giây chỉ đo được một lần',
      ],
      answers: [0, 2],
      hints: ['Máng và bóng không đổi; cái gì thay đổi giữa các lần đo?'],
      solution:
        'Sai lệch đến từ thời điểm bấm nút của người đo; lấy trung bình nhiều lần thì các lần bấm sớm và bấm muộn bù trừ nhau, kết quả gần thời gian thật hơn.',
    },
  ],
  takeaways: [
    'Đơn vị đo thời gian là giây ($\\text{s}$); $1$ phút $= 60\\ \\text{s}$, $1$ giờ $= 3600\\ \\text{s}$.',
    'Dụng cụ đo thời gian là đồng hồ; ước lượng thời gian cần đo để chọn đồng hồ phù hợp.',
    'Đồng hồ bấm giây: Reset về $0$, Start khi bắt đầu, Stop khi kết thúc, rồi đọc và ghi kết quả.',
    'Đo nhiều lần và lấy giá trị trung bình để giảm sai lệch do bấm nút.',
  ],
};
