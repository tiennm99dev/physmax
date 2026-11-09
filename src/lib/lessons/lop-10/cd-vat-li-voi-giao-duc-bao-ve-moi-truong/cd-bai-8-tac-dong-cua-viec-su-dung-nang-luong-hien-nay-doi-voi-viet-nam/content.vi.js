/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Việt Nam khai thác than, dầu khí, thuỷ năng, năng lượng Mặt Trời, gió; điện chủ yếu đến từ nhiệt điện than và thuỷ điện. Nhiệt điện thải khí nhà kính và chất ô nhiễm, thuỷ điện làm mất rừng và thay đổi dòng chảy, nên cần chuyển dịch sang năng lượng sạch và dùng năng lượng tiết kiệm, hiệu quả.',
  intro:
    'Chụp từ vệ tinh vào ban đêm, Việt Nam hiện lên như một dải ánh đèn chạy dọc bờ biển, sáng nhất ở Hà Nội và Thành phố Hồ Chí Minh. Mỗi năm nước ta sản xuất khoảng $280$ tỉ kWh điện. Lượng điện ấy đến từ đâu, và việc sản xuất nó tác động thế nào tới môi trường?',
  objectives: [
    'Kể được các nguồn năng lượng Việt Nam đang khai thác và tiềm năng của chúng.',
    'Nhận xét được cơ cấu sử dụng năng lượng ở Việt Nam hiện nay.',
    'Nêu được tác động của nhà máy nhiệt điện, thuỷ điện tới môi trường và biến đổi khí hậu.',
    'Ước tính được lượng phát thải $\\mathrm{CO_2}$ của một cơ cấu điện và thực hiện được một số biện pháp tiết kiệm điện năng.',
  ],
  sections: [
    {
      heading: 'Các nguồn năng lượng ở Việt Nam hiện nay',
      blocks: [
        {
          type: 'table',
          caption: 'Các nguồn năng lượng chính ở nước ta',
          head: ['Nguồn', 'Nơi khai thác, tiềm năng'],
          rows: [
            [
              'Than',
              'Trữ lượng lớn nhất ở Quảng Ninh; nhiều mỏ ở sâu nên khai thác ngày càng khó, nước ta đã phải nhập khẩu thêm than',
            ],
            ['Dầu khí', 'Các mỏ chủ yếu ở thềm lục địa phía Nam (như mỏ Bạch Hổ)'],
            [
              'Nước (thuỷ năng)',
              'Nhiều sông dốc, nhiều nước; lớn nhất là hệ thống sông Đà với các nhà máy Hoà Bình, Sơn La, Lai Châu. Các dòng sông lớn hầu như đã được khai thác',
            ],
            [
              'Mặt Trời',
              'Nằm trong vùng nhiệt đới, nhiều nắng, nhất là Nam Trung Bộ và Nam Bộ (Ninh Thuận, Bình Thuận)',
            ],
            [
              'Gió',
              'Bờ biển dài hơn $3\\,260$ km; gió mạnh ở Nam Trung Bộ, ven biển và ngoài khơi đồng bằng sông Cửu Long',
            ],
            ['Địa nhiệt', 'Có nhiều nguồn nước nóng nhưng chưa được khai thác để phát điện'],
          ],
        },
        {
          type: 'p',
          text: 'Than, dầu, khí đốt là năng lượng hoá thạch, không tái tạo: chúng hình thành trong hàng triệu năm và sẽ cạn dần. Nước, Mặt Trời, gió, địa nhiệt là năng lượng tái tạo.',
        },
      ],
    },
    {
      heading: 'Sử dụng năng lượng ở Việt Nam hiện nay',
      blocks: [
        {
          type: 'p',
          text: 'Mức tiêu dùng năng lượng bình quân theo đầu người phản ánh trình độ phát triển của một quốc gia: nước có nhiều nhà máy, phương tiện, thiết bị điện thì dùng nhiều năng lượng. Ảnh vệ tinh chụp ban đêm cho thấy điều đó: vùng sáng rực là nơi dân cư đông, công nghiệp phát triển. Mức tiêu dùng năng lượng bình quân đầu người của nước ta còn thấp hơn nhiều nước phát triển nhưng đang tăng nhanh.',
        },
        {
          type: 'p',
          text: 'Trong những năm gần đây, khoảng một nửa sản lượng điện nước ta đến từ nhiệt điện than, gần một phần ba từ thuỷ điện, phần còn lại từ nhiệt điện khí, điện mặt trời, điện gió và một ít sinh khối. Điện mặt trời và điện gió tăng rất nhanh từ năm 2019. Cơ cấu này cho thấy nước ta vẫn dựa nhiều vào nhiên liệu hoá thạch và công nghệ khai thác năng lượng tái tạo đang dần phát triển.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Ước tính phát thải $\\mathrm{CO_2}$',
          text: 'Mỗi kWh điện từ một nguồn ứng với một lượng $\\mathrm{CO_2}$ phát thải $f$ (g/kWh). Với cơ cấu có tỉ lệ $p_1, p_2, \\ldots$, phát thải trung bình là $f_{tb} = p_1 f_1 + p_2 f_2 + \\ldots$ và lượng $\\mathrm{CO_2}$ của sản lượng điện $A$ là $m = f_{tb} A$.',
        },
        {
          type: 'table',
          caption:
            'Phát thải $\\mathrm{CO_2}$ trong cả vòng đời nhà máy, trung vị theo IPCC (2014)',
          head: ['Nguồn điện', 'Than', 'Khí', 'Sinh khối', 'Mặt trời', 'Thuỷ điện', 'Gió'],
          rows: [['g/kWh', '$820$', '$490$', '$230$', '$48$', '$24$', '$11$']],
        },
        {
          type: 'p',
          text: 'Trong phần khám phá, em hãy kéo các thanh trượt để thay đổi cơ cấu điện và xem lượng $\\mathrm{CO_2}$ thay đổi ra sao. Thử tìm một cơ cấu giảm được một nửa lượng phát thải.',
        },
      ],
    },
    {
      heading: 'Tác động của việc sử dụng năng lượng đối với môi trường và biến đổi khí hậu',
      blocks: [
        {
          type: 'p',
          text: 'Việt Nam là một trong những nước chịu tác động nặng nề nhất của biến đổi khí hậu và nước biển dâng: bờ biển dài, hai đồng bằng lớn (sông Hồng và sông Cửu Long) thấp và đông dân. Nước biển dâng gây ngập, xâm nhập mặn, sạt lở bờ biển; thời tiết cực đoan làm bão, lũ, hạn hán khắc nghiệt hơn.',
        },
        {
          type: 'table',
          caption: 'Tác động của nhà máy nhiệt điện và thuỷ điện',
          head: ['Nhà máy', 'Tác động tới môi trường'],
          rows: [
            [
              'Nhiệt điện than, khí',
              'Thải nhiều $\\mathrm{CO_2}$ gây hiệu ứng nhà kính; thải $\\mathrm{SO_2}$, $\\mathrm{NO_x}$ gây mưa acid; bụi mịn gây bệnh hô hấp; tro xỉ chiếm đất và có thể làm ô nhiễm nước ngầm; nước làm mát xả ra nóng hơn làm hại sinh vật',
            ],
            [
              'Thuỷ điện',
              'Lòng hồ làm ngập rừng, đất canh tác, phải di dân; đập giữ phù sa nên hạ du thiếu phù sa, bờ sông, bờ biển sạt lở; dòng chảy thay đổi ảnh hưởng tới cá và sinh vật; thực vật phân huỷ dưới lòng hồ có thể sinh khí $\\mathrm{CH_4}$; xả lũ, vỡ đập gây nguy hiểm',
            ],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Không có nguồn điện nào hoàn toàn "sạch"',
          text: 'Pin mặt trời, tua bin gió hầu như không thải khí khi vận hành, nhưng việc khai thác vật liệu, sản xuất, vận chuyển và xử lí khi hết hạn vẫn gây phát thải và chất thải. Vì vậy ta so sánh phát thải trong cả vòng đời nhà máy.',
        },
      ],
    },
    {
      heading: 'Sử dụng năng lượng hiệu quả trong đời sống và sản xuất',
      blocks: [
        {
          type: 'p',
          text: 'Mỗi kWh điện tiết kiệm được là một phần nhiên liệu không phải đốt. Sử dụng năng lượng hiệu quả nghĩa là dùng ít năng lượng hơn mà vẫn đạt được cùng một mục đích.',
        },
        {
          type: 'list',
          items: [
            'Dùng đèn LED thay đèn sợi đốt: cùng độ sáng nhưng công suất nhỏ hơn nhiều lần.',
            'Chọn thiết bị có nhãn năng lượng nhiều sao, điều hoà có công nghệ inverter.',
            'Đặt điều hoà khoảng $26\\ ^\\circ\\mathrm{C}$, đóng kín cửa, vệ sinh lưới lọc định kì.',
            'Rút phích cắm hoặc tắt hẳn thiết bị thay vì để chế độ chờ.',
            'Tận dụng ánh sáng và gió tự nhiên; không mở tủ lạnh lâu, không để thức ăn còn nóng vào tủ.',
            'Trong sản xuất: thay động cơ cũ bằng động cơ hiệu suất cao, tận dụng nhiệt thải, lắp pin mặt trời trên mái nhà xưởng.',
          ],
        },
      ],
    },
    {
      heading: 'Dự án: Kiểm toán điện năng gia đình em',
      project: true,
      blocks: [
        {
          type: 'p',
          text: 'Mục tiêu: biết gia đình em dùng điện vào việc gì nhiều nhất, đề ra và thực hiện các biện pháp tiết kiệm điện, ước tính lượng $\\mathrm{CO_2}$ giảm được. Dụng cụ: hoá đơn tiền điện vài tháng gần đây, nhãn công suất trên các thiết bị, bảng tính hoặc sổ ghi chép.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Lập bảng các thiết bị điện trong nhà: tên, công suất $P$ (ghi trên nhãn), số giờ dùng mỗi ngày $t$.',
            'Tính điện năng mỗi thiết bị dùng trong một tháng $A = P t$ (kWh), so sánh tổng với số kWh trên hoá đơn.',
            'Tìm ba thiết bị tốn điện nhất và đề ra biện pháp tiết kiệm cho từng thiết bị.',
            'Thực hiện các biện pháp trong một tháng, rồi đọc số kWh trên hoá đơn tháng đó.',
            'Tính điện năng tiết kiệm được và lượng $\\mathrm{CO_2}$ giảm được, lấy $0{,}7$ kg $\\mathrm{CO_2}$ cho mỗi kWh.',
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Báo cáo',
          text: 'Nộp bảng kiểm toán điện năng, biểu đồ so sánh điện năng trước và sau, danh sách biện pháp đã làm và những khó khăn gặp phải. Chia sẻ một biện pháp hiệu quả nhất với cả lớp.',
        },
      ],
    },
  ],
  explore: {
    title: 'Cơ cấu điện và lượng phát thải',
    instruction:
      'Kéo thanh trượt của từng nguồn điện; các nguồn còn lại tự điều chỉnh để tổng luôn bằng $100\\%$. Quan sát biểu đồ, phát thải trung bình mỗi kWh và tổng lượng $\\mathrm{CO_2}$ mỗi năm. Thử tìm cơ cấu giảm được một nửa lượng phát thải mà thuỷ điện không quá $30\\%$.',
  },
  examples: [
    {
      problem:
        'Một nhà máy nhiệt điện than có công suất $1\\,200$ MW, mỗi năm phát điện tương đương $6\\,000$ giờ ở công suất đó. Lấy phát thải $820$ g $\\mathrm{CO_2}$ cho mỗi kWh. Tính điện năng nhà máy sản xuất mỗi năm và lượng $\\mathrm{CO_2}$ tương ứng.',
      steps: [
        'Đổi công suất: $P = 1\\,200$ MW $= 1{,}2 \\cdot 10^{6}$ kW.',
        'Điện năng: $A = P t = 1{,}2 \\cdot 10^{6} \\cdot 6\\,000 = 7{,}2 \\cdot 10^{9}$ kWh, tức $7{,}2$ tỉ kWh.',
        'Lượng $\\mathrm{CO_2}$: $m = 820 \\cdot 7{,}2 \\cdot 10^{9}$ g $\\approx 5{,}9 \\cdot 10^{12}$ g $= 5{,}9 \\cdot 10^{6}$ tấn.',
      ],
      answer: 'Khoảng $7{,}2$ tỉ kWh điện và $5{,}9$ triệu tấn $\\mathrm{CO_2}$ mỗi năm.',
    },
    {
      problem:
        'Một hệ thống điện gồm $60\\%$ nhiệt điện than, $30\\%$ thuỷ điện và $10\\%$ điện gió. Tính phát thải trung bình cho mỗi kWh. Nếu thay một nửa phần nhiệt điện than bằng điện mặt trời thì phát thải trung bình giảm bao nhiêu phần trăm?',
      steps: [
        '$f_{tb} = 0{,}6 \\cdot 820 + 0{,}3 \\cdot 24 + 0{,}1 \\cdot 11 = 492 + 7{,}2 + 1{,}1 = 500{,}3$ g/kWh.',
        'Cơ cấu mới: $30\\%$ than, $30\\%$ mặt trời, $30\\%$ thuỷ điện, $10\\%$ gió.',
        '$f_{tb}^{\\prime} = 0{,}3 \\cdot 820 + 0{,}3 \\cdot 48 + 0{,}3 \\cdot 24 + 0{,}1 \\cdot 11 = 246 + 14{,}4 + 7{,}2 + 1{,}1 = 268{,}7$ g/kWh.',
        'Mức giảm: $\\dfrac{500{,}3 - 268{,}7}{500{,}3} \\cdot 100\\% \\approx 46\\%$.',
      ],
      answer:
        'Ban đầu khoảng $500$ g/kWh; sau khi thay, phát thải trung bình giảm khoảng $46\\%$, gần một nửa.',
    },
    {
      problem:
        'Một bóng đèn sợi đốt $60$ W được thay bằng bóng LED $9$ W sáng tương đương. Đèn bật $5$ giờ mỗi ngày. Tính điện năng tiết kiệm được trong một năm ($365$ ngày).',
      steps: [
        'Công suất giảm: $60 - 9 = 51$ W.',
        'Thời gian dùng trong năm: $5 \\cdot 365 = 1\\,825$ h.',
        'Điện năng tiết kiệm: $A = 51 \\cdot 1\\,825 = 93\\,075$ Wh $\\approx 93$ kWh.',
      ],
      answer: 'Khoảng $93$ kWh mỗi năm cho chỉ một bóng đèn.',
    },
  ],
  practice: [
    {
      type: 'multi',
      prompt: 'Việt Nam hiện đang khai thác những nguồn năng lượng nào để sản xuất điện?',
      options: [
        'Than',
        'Dầu khí',
        'Thuỷ năng',
        'Năng lượng Mặt Trời',
        'Năng lượng gió',
        'Năng lượng hạt nhân',
      ],
      answers: [0, 1, 2, 3, 4],
      hints: ['Nước ta chưa có nhà máy điện nào thuộc một trong các loại trên.'],
      solution:
        'Nước ta khai thác than, dầu khí, thuỷ năng, năng lượng Mặt Trời và gió. Việt Nam chưa có nhà máy điện hạt nhân.',
    },
    {
      type: 'choice',
      prompt:
        'Trong những năm gần đây, nguồn nào đóng góp nhiều nhất vào sản lượng điện của nước ta?',
      options: ['Nhiệt điện than', 'Điện gió', 'Điện mặt trời', 'Điện sinh khối'],
      answer: 0,
      hints: ['Khoảng một nửa sản lượng điện đến từ nguồn này.'],
      solution:
        'Nhiệt điện than chiếm khoảng một nửa sản lượng điện, tiếp theo là thuỷ điện. Điện mặt trời và điện gió tăng nhanh nhưng tỉ trọng còn nhỏ hơn.',
    },
    {
      type: 'multi',
      prompt: 'Những tác động nào là của nhà máy nhiệt điện than?',
      options: [
        'Thải $\\mathrm{CO_2}$, làm tăng hiệu ứng nhà kính',
        'Thải $\\mathrm{SO_2}$, $\\mathrm{NO_x}$ gây mưa acid',
        'Thải bụi mịn và tro xỉ',
        'Làm ngập một vùng rừng rộng lớn để tạo hồ chứa',
      ],
      answers: [0, 1, 2],
      hints: ['Một tác động thuộc về loại nhà máy cần đắp đập chắn sông.'],
      solution:
        'Nhiệt điện than đốt than nên thải $\\mathrm{CO_2}$, $\\mathrm{SO_2}$, $\\mathrm{NO_x}$, bụi và tro xỉ. Ngập rừng để tạo hồ chứa là tác động của thuỷ điện.',
    },
    {
      type: 'multi',
      prompt: 'Những tác động nào là của nhà máy thuỷ điện?',
      options: [
        'Lòng hồ làm ngập rừng và đất canh tác, phải di dân',
        'Đập giữ phù sa, hạ du thiếu phù sa và dễ sạt lở',
        'Dòng chảy thay đổi, ảnh hưởng tới các loài cá',
        'Thải nhiều $\\mathrm{SO_2}$ khi vận hành',
      ],
      answers: [0, 1, 2],
      hints: ['Thuỷ điện không đốt nhiên liệu khi phát điện.'],
      solution:
        'Thuỷ điện làm ngập rừng, giữ phù sa, thay đổi dòng chảy. Nó không đốt nhiên liệu nên không thải $\\mathrm{SO_2}$ khi vận hành.',
    },
    {
      type: 'number',
      prompt:
        'Một hệ thống điện gồm $60\\%$ nhiệt điện than ($820$ g/kWh) và $40\\%$ thuỷ điện ($24$ g/kWh). Phát thải trung bình cho mỗi kWh là bao nhiêu gam $\\mathrm{CO_2}$?',
      answer: 501.6,
      tolerance: 0.05,
      unit: 'g/kWh',
      hints: ['Nhân tỉ lệ của mỗi nguồn với phát thải của nó rồi cộng lại.'],
      solution: '$f_{tb} = 0{,}6 \\cdot 820 + 0{,}4 \\cdot 24 = 492 + 9{,}6 = 501{,}6$ g/kWh.',
    },
    {
      type: 'number',
      prompt:
        'Các nhà máy nhiệt điện than sản xuất $10$ tỉ kWh điện, mỗi kWh thải $820$ g $\\mathrm{CO_2}$. Lượng $\\mathrm{CO_2}$ thải ra là bao nhiêu triệu tấn?',
      answer: 8.2,
      tolerance: 0.01,
      unit: 'triệu tấn',
      hints: ['$1$ tấn $= 10^{6}$ g, nên $1$ triệu tấn $= 10^{12}$ g.'],
      solution:
        '$m = 820 \\cdot 10 \\cdot 10^{9} = 8{,}2 \\cdot 10^{12}$ g $= 8{,}2 \\cdot 10^{6}$ tấn, tức $8{,}2$ triệu tấn.',
    },
    {
      type: 'number',
      prompt:
        'Nhà máy thuỷ điện Sơn La có công suất $2\\,400$ MW. Nếu mỗi năm nhà máy phát điện tương đương $4\\,200$ giờ ở công suất đó thì điện năng sản xuất được là bao nhiêu tỉ kWh?',
      answer: 10.08,
      tolerance: 0.01,
      unit: 'tỉ kWh',
      hints: ['Đổi $2\\,400$ MW sang kW rồi dùng $A = P t$.'],
      solution:
        '$A = 2{,}4 \\cdot 10^{6} \\cdot 4\\,200 = 1{,}008 \\cdot 10^{10}$ kWh $= 10{,}08$ tỉ kWh.',
    },
    {
      type: 'number',
      prompt:
        'Thay một bóng đèn $40$ W bằng bóng LED $8$ W sáng tương đương, bật $6$ giờ mỗi ngày. Trong $30$ ngày tiết kiệm được bao nhiêu kWh?',
      answer: 5.76,
      tolerance: 0.01,
      unit: 'kWh',
      hints: ['Tính phần công suất giảm được và tổng số giờ trong $30$ ngày.'],
      solution: '$A = (40 - 8) \\cdot 6 \\cdot 30 = 32 \\cdot 180 = 5\\,760$ Wh $= 5{,}76$ kWh.',
    },
    {
      type: 'choice',
      prompt: 'Vì sao nước biển dâng tác động tới Việt Nam nặng nề hơn nhiều nước khác?',
      options: [
        'Vì bờ biển dài và hai đồng bằng lớn thấp, đông dân',
        'Vì Việt Nam nằm gần Bắc Cực',
        'Vì Việt Nam không có sông lớn',
        'Vì Việt Nam thải nhiều khí nhà kính nhất thế giới',
      ],
      answer: 0,
      hints: ['Hãy nghĩ về địa hình ven biển của nước ta.'],
      solution:
        'Việt Nam có bờ biển dài hơn $3\\,260$ km, đồng bằng sông Hồng và sông Cửu Long thấp, đông dân, nên nước biển dâng gây ngập, xâm nhập mặn trên diện rộng.',
    },
    {
      type: 'choice',
      prompt:
        'Vì sao mức tiêu dùng năng lượng bình quân đầu người phản ánh trình độ phát triển của một nước?',
      options: [
        'Vì nước phát triển có nhiều nhà máy, phương tiện và thiết bị dùng năng lượng hơn',
        'Vì nước phát triển luôn lãng phí năng lượng',
        'Vì dân số càng đông thì năng lượng bình quân càng lớn',
        'Vì năng lượng bình quân chỉ phụ thuộc vào khí hậu',
      ],
      answer: 0,
      hints: ['Sản xuất công nghiệp, giao thông, thiết bị điện đều cần năng lượng.'],
      solution:
        'Công nghiệp, giao thông và đời sống hiện đại đều cần năng lượng, nên nước càng phát triển thì năng lượng tiêu dùng trên mỗi người càng lớn. Dân số đông không làm tăng mức bình quân.',
    },
    {
      type: 'multi',
      prompt: 'Những biện pháp nào giúp tiết kiệm điện trong gia đình?',
      options: [
        'Thay đèn sợi đốt bằng đèn LED',
        'Đặt điều hoà khoảng $26\\ ^\\circ\\mathrm{C}$ và đóng kín cửa',
        'Tắt hẳn ti vi thay vì để chế độ chờ',
        'Để thức ăn còn nóng vào tủ lạnh ngay',
        'Mở cửa tủ lạnh lâu để chọn đồ',
      ],
      answers: [0, 1, 2],
      hints: ['Hai việc làm cuối khiến tủ lạnh phải chạy nhiều hơn.'],
      solution:
        'Đèn LED, điều hoà $26\\ ^\\circ\\mathrm{C}$ và tắt hẳn thiết bị đều giảm điện năng. Thức ăn nóng và mở cửa tủ lâu đưa thêm nhiệt vào tủ lạnh, làm máy nén chạy nhiều hơn.',
    },
  ],
  takeaways: [
    'Việt Nam khai thác than, dầu khí, thuỷ năng, năng lượng Mặt Trời, gió; còn tiềm năng địa nhiệt.',
    'Điện nước ta chủ yếu từ nhiệt điện than và thuỷ điện; điện mặt trời, điện gió đang tăng nhanh.',
    'Nhiệt điện thải khí nhà kính, khí gây mưa acid, bụi; thuỷ điện làm ngập rừng, giữ phù sa, thay đổi dòng chảy.',
    'Phát thải trung bình của một cơ cấu điện: $f_{tb} = p_1 f_1 + p_2 f_2 + \\ldots$; lượng $\\mathrm{CO_2}$ bằng $f_{tb}$ nhân điện năng.',
    'Dùng năng lượng tiết kiệm, hiệu quả và chuyển sang năng lượng tái tạo giúp giảm phát thải.',
  ],
};
