/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Năng lượng tái tạo đến từ những nguồn được tự nhiên bổ sung liên tục: Mặt Trời, gió, nước, sinh khối, địa nhiệt, đại dương. Pin quang điện, tua bin gió, nhà máy thuỷ điện, hầm khí sinh học, nhà máy địa nhiệt biến chúng thành điện năng hoặc nhiệt năng với những hiệu suất khác nhau.',
  intro:
    'Than, dầu, khí đốt cần hàng triệu năm để hình thành nhưng con người đang dùng hết chúng chỉ trong vài trăm năm, kèm theo lượng khí thải khổng lồ. Trong khi đó, mỗi giây Mặt Trời vẫn chiếu xuống, gió vẫn thổi, sông vẫn chảy. Làm thế nào để thu những nguồn năng lượng ấy?',
  objectives: [
    'Phân biệt được năng lượng tái tạo và năng lượng không tái tạo; nêu được vai trò của năng lượng tái tạo.',
    'Kể được các loại năng lượng tái tạo và nguyên lí của một số công nghệ thu chúng: thuỷ điện, nhiên liệu sinh học, pin Mặt Trời, tua bin gió, năng lượng đại dương, địa nhiệt.',
    'Tính được công suất của tấm pin Mặt Trời, tua bin gió, nhà máy thuỷ điện và hiệu suất của chúng.',
    'Thiết kế và chế tạo được một thiết bị đơn giản thu năng lượng tái tạo.',
  ],
  sections: [
    {
      heading: 'Năng lượng tái tạo và năng lượng không tái tạo',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Năng lượng tái tạo',
          text: 'Năng lượng tái tạo là năng lượng từ những nguồn được bổ sung liên tục theo quá trình tự nhiên, gần như vô hạn đối với con người: năng lượng Mặt Trời, gió, nước, sinh khối, địa nhiệt, năng lượng đại dương.',
        },
        {
          type: 'p',
          text: 'Năng lượng không tái tạo đến từ những nguồn có trữ lượng hữu hạn, cần thời gian rất dài để hình thành: than đá, dầu mỏ, khí thiên nhiên (nhiên liệu hoá thạch) và nhiên liệu hạt nhân như uranium.',
        },
        {
          type: 'list',
          items: [
            'Vai trò của năng lượng tái tạo: phát thải khí nhà kính và chất ô nhiễm rất ít, góp phần chống biến đổi khí hậu.',
            'Là nguồn năng lượng lâu dài, giảm phụ thuộc vào nhiên liệu nhập khẩu, bảo đảm an ninh năng lượng.',
            'Có thể lắp đặt ở nơi xa lưới điện: vùng núi, hải đảo, trên mái nhà.',
            'Tạo ra ngành công nghiệp và việc làm mới.',
          ],
        },
      ],
    },
    {
      heading: 'Thuỷ điện và nhiên liệu sinh học',
      blocks: [
        {
          type: 'p',
          text: 'Nhà máy thuỷ điện dùng đập chắn sông để tạo hồ chứa. Nước từ trên cao chảy qua đường ống, thế năng chuyển thành động năng làm quay tua bin, tua bin quay máy phát điện. Nhà máy càng có lưu lượng nước lớn và cột nước cao thì công suất càng lớn.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Công suất của nhà máy thuỷ điện',
          text: 'Mỗi giây có khối lượng nước $m = \\rho Q$ rơi qua độ cao $h$, thế năng giảm $m g h$. Với hiệu suất $\\eta$: $$P = \\eta \\rho g Q h,$$ trong đó $Q$ là lưu lượng nước ($\\mathrm{m^3/s}$), $\\rho = 1\\,000\\ \\mathrm{kg/m^3}$.',
        },
        {
          type: 'p',
          text: 'Các nhà máy thuỷ điện lớn của nước ta: Sơn La ($2\\,400$ MW), Hoà Bình ($1\\,920$ MW, được mở rộng lên $2\\,400$ MW vào năm 2025), Lai Châu ($1\\,200$ MW). Thuỷ điện tích năng bơm nước lên hồ cao khi thừa điện và xả nước phát điện khi thiếu, giống như một "cục pin" khổng lồ.',
        },
        {
          type: 'p',
          text: 'Nhiên liệu sinh học được sản xuất từ sinh khối (thực vật, chất thải nông nghiệp, phân động vật). Hầm biogas ủ phân và chất thải hữu cơ trong điều kiện không có không khí, tạo ra khí sinh học có thành phần chính là methane $\\mathrm{CH_4}$, dùng để đun nấu, thắp sáng, chạy máy phát điện. Ethanol từ sắn, mía được pha vào xăng thành xăng sinh học E5 (chứa $5\\%$ ethanol). Bã mía, trấu, rơm có thể đốt để phát điện.',
        },
      ],
    },
    {
      heading: 'Năng lượng Mặt Trời',
      blocks: [
        {
          type: 'p',
          text: 'Pin Mặt Trời (pin quang điện) làm từ chất bán dẫn, thường là silicon. Ánh sáng chiếu vào giải phóng các electron và tạo ra dòng điện: quang năng chuyển trực tiếp thành điện năng. Nhiều tấm pin ghép lại thành hệ thống điện mặt trời mái nhà hoặc trang trại điện mặt trời.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Công suất và hiệu suất của tấm pin',
          text: 'Ánh sáng có cường độ $G$ ($\\mathrm{W/m^2}$) chiếu vuông góc lên tấm pin diện tích $A$ mang công suất toàn phần $P_{tp} = G A$. Với hiệu suất $\\eta$: $$P = \\eta G A,\\qquad \\eta = \\dfrac{P_{ci}}{P_{tp}}.$$ Ở mặt đất, khi trời nắng gắt, $G$ vào khoảng $1\\,000\\ \\mathrm{W/m^2}$; hiệu suất pin phổ biến hiện nay khoảng $15\\%$ – $22\\%$.',
        },
        {
          type: 'p',
          text: 'Công nghệ nhiệt Mặt Trời dùng tấm hấp thụ màu đen hoặc gương hội tụ để biến quang năng thành nhiệt năng: máy nước nóng năng lượng mặt trời trên mái nhà, bếp năng lượng mặt trời, nhà máy nhiệt điện mặt trời dùng gương tập trung ánh sáng đun sôi chất lỏng.',
        },
      ],
    },
    {
      heading: 'Năng lượng gió',
      blocks: [
        {
          type: 'p',
          text: 'Tua bin gió biến động năng của không khí chuyển động thành động năng quay của cánh quạt, rồi máy phát biến thành điện năng. Phổ biến nhất là tua bin trục ngang ba cánh; tua bin trục đứng nhỏ hơn, nhận gió từ mọi hướng.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Công suất của gió',
          text: 'Gió tốc độ $v$ thổi qua vòng quay của cánh dài $R$ (diện tích $S = \\pi R^2$). Trong thời gian $t$, khối lượng không khí $m = \\rho S v t$ đi qua, mang động năng $\\dfrac{1}{2} m v^2$. Công suất gió là $$P_{\\text{gió}} = \\dfrac{1}{2}\\rho \\pi R^2 v^3.$$ Tua bin chỉ thu được một phần $C_p$ (thực tế khoảng $0{,}35$ – $0{,}45$, không thể vượt $0{,}59$): $P = C_p P_{\\text{gió}}$.',
        },
        {
          type: 'p',
          text: 'Vì $P \\sim v^3$, gió mạnh gấp đôi cho công suất gấp $8$ lần, nên tua bin được đặt ở nơi gió mạnh và đều: ven biển, ngoài khơi, đỉnh đồi. Gió quá yếu thì cánh không quay; gió quá mạnh thì tua bin dừng để không bị hỏng. Ưu điểm: không thải khí khi vận hành, tốn ít đất. Nhược điểm: phụ thuộc thời tiết nên công suất không ổn định, gây tiếng ồn, ảnh hưởng chim, cảnh quan.',
        },
      ],
    },
    {
      heading: 'Năng lượng đại dương, địa nhiệt và triển vọng',
      blocks: [
        {
          type: 'list',
          items: [
            'Năng lượng thuỷ triều: đập chắn cửa vịnh, nước lên xuống chảy qua tua bin.',
            'Năng lượng sóng biển: phao nổi dao động theo sóng làm chạy máy phát.',
            'Năng lượng dòng hải lưu và chênh lệch nhiệt độ giữa nước mặt và nước sâu.',
            'Địa nhiệt: hơi nước và nước nóng trong lòng đất được đưa lên làm quay tua bin hoặc sưởi ấm; Iceland lấy phần lớn nhiệt sưởi và một phần điện từ địa nhiệt.',
          ],
        },
        {
          type: 'table',
          caption: 'Hiệu suất chuyển hoá điển hình',
          head: ['Công nghệ', 'Chuyển hoá', 'Hiệu suất'],
          rows: [
            ['Thuỷ điện', 'Thế năng nước → điện năng', 'khoảng $85\\%$ – $90\\%$'],
            ['Tua bin gió', 'Động năng gió → điện năng', 'khoảng $35\\%$ – $45\\%$'],
            ['Pin quang điện', 'Quang năng → điện năng', 'khoảng $15\\%$ – $22\\%$'],
          ],
        },
        {
          type: 'p',
          text: 'Giá điện mặt trời và điện gió đã giảm mạnh trong hơn mười năm qua, nhiều nước đặt mục tiêu dùng năng lượng tái tạo là nguồn điện chính. Thách thức lớn nhất là nắng và gió thay đổi theo giờ, theo mùa, nên cần lưới điện thông minh và các cách tích trữ năng lượng như pin lưu trữ, thuỷ điện tích năng.',
        },
      ],
    },
    {
      heading: 'Dự án: Chế tạo hệ thống thu năng lượng tái tạo',
      project: true,
      blocks: [
        {
          type: 'p',
          text: 'Mục tiêu: chế tạo một trong ba thiết bị: bếp năng lượng mặt trời, tua bin gió mini hoặc máy nước nóng năng lượng mặt trời mini; đo và đánh giá hiệu quả của nó. Dụng cụ gợi ý: hộp các-tông, giấy bạc, kính hoặc màng bọc thực phẩm, sơn đen, nhiệt kế; hoặc động cơ điện một chiều nhỏ, cánh quạt nhựa, đèn LED, đồng hồ đo điện; quạt điện để tạo gió.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Chọn thiết bị, vẽ thiết kế và giải thích nguyên lí chuyển hoá năng lượng của nó.',
            'Chế tạo thiết bị theo thiết kế.',
            'Đo đại lượng đầu ra: nhiệt độ nước sau $30$ phút phơi nắng, hoặc hiệu điện thế và cường độ dòng điện ở các tốc độ gió khác nhau (đặt quạt ở các mức gió).',
            'Thay đổi một yếu tố (góc đặt tấm hấp thụ, số cánh, chiều dài cánh) và đo lại để so sánh.',
            'Đánh giá, cải tiến thiết kế.',
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Báo cáo',
          text: 'Nộp bản vẽ thiết kế, ảnh thiết bị, bảng số liệu đo, đồ thị đại lượng đầu ra theo yếu tố đã thay đổi, nhận xét về hiệu suất và hướng cải tiến. Trình diễn thiết bị trước lớp. Lưu ý an toàn: không nhìn thẳng vào ánh sáng hội tụ, cẩn thận với nước nóng và cánh quạt đang quay.',
        },
      ],
    },
  ],
  explore: {
    title: 'Pin Mặt Trời, tua bin gió và thuỷ điện',
    instruction:
      'Chọn một công nghệ. Với pin Mặt Trời, chỉnh cường độ ánh sáng, diện tích và loại pin. Với tua bin gió, chỉnh tốc độ gió và chiều dài cánh, quan sát điểm đỏ trên đường công suất. Với thuỷ điện, chỉnh lưu lượng và độ cao cột nước. Đọc công suất phát và nhận xét.',
  },
  examples: [
    {
      problem:
        'Một tấm pin Mặt Trời diện tích $1{,}6\\ \\mathrm{m^2}$, hiệu suất $20\\%$, nhận ánh sáng có cường độ $1\\,000\\ \\mathrm{W/m^2}$ chiếu vuông góc. Tính công suất điện của tấm pin. Nếu mỗi ngày lượng nắng tương đương $4$ giờ ở cường độ đó thì tấm pin cho bao nhiêu điện năng?',
      steps: [
        'Công suất toàn phần: $P_{tp} = G A = 1\\,000 \\cdot 1{,}6 = 1\\,600$ W.',
        'Công suất điện: $P = \\eta P_{tp} = 0{,}2 \\cdot 1\\,600 = 320$ W.',
        'Điện năng mỗi ngày: $A = P t = 320 \\cdot 4 = 1\\,280$ Wh $= 1{,}28$ kWh.',
      ],
      answer: '$P = 320$ W; mỗi ngày khoảng $1{,}28$ kWh.',
    },
    {
      problem:
        'Một tua bin gió có cánh dài $R = 40$ m, thu được $C_p = 0{,}4$ công suất gió. Lấy $\\rho = 1{,}2\\ \\mathrm{kg/m^3}$. Tính công suất điện khi tốc độ gió là $10$ m/s. Khi gió chỉ còn $5$ m/s thì công suất giảm bao nhiêu lần?',
      steps: [
        '$P = C_p \\cdot \\dfrac{1}{2}\\rho \\pi R^2 v^3 = 0{,}4 \\cdot 0{,}5 \\cdot 1{,}2 \\cdot \\pi \\cdot 40^2 \\cdot 10^3$.',
        '$P = 0{,}24 \\cdot \\pi \\cdot 1\\,600 \\cdot 1\\,000 \\approx 1{,}21 \\cdot 10^{6}$ W $\\approx 1{,}21$ MW.',
        'Công suất tỉ lệ với $v^3$: $\\dfrac{P_{10}}{P_5} = \\left(\\dfrac{10}{5}\\right)^3 = 8$.',
      ],
      answer: 'Khoảng $1{,}21$ MW; khi gió giảm còn một nửa, công suất giảm $8$ lần.',
    },
    {
      problem:
        'Một nhà máy thuỷ điện có lưu lượng nước qua tua bin $Q = 300\\ \\mathrm{m^3/s}$, độ cao cột nước $h = 100$ m, hiệu suất $90\\%$. Lấy $g = 9{,}8\\ \\mathrm{m/s^2}$. Tính công suất điện của nhà máy.',
      steps: [
        'Khối lượng nước chảy qua mỗi giây: $\\rho Q = 1\\,000 \\cdot 300 = 3 \\cdot 10^{5}$ kg.',
        '$P = \\eta \\rho g Q h = 0{,}9 \\cdot 3 \\cdot 10^{5} \\cdot 9{,}8 \\cdot 100 = 2{,}646 \\cdot 10^{8}$ W.',
      ],
      answer: '$P \\approx 264{,}6$ MW.',
    },
  ],
  practice: [
    {
      type: 'multi',
      prompt: 'Những nguồn nào là năng lượng tái tạo?',
      options: [
        'Năng lượng Mặt Trời',
        'Năng lượng gió',
        'Địa nhiệt',
        'Sinh khối',
        'Than đá',
        'Khí thiên nhiên',
        'Uranium',
      ],
      answers: [0, 1, 2, 3],
      hints: ['Nguồn nào được tự nhiên bổ sung liên tục, nguồn nào có trữ lượng hữu hạn?'],
      solution:
        'Mặt Trời, gió, địa nhiệt, sinh khối được bổ sung liên tục nên là năng lượng tái tạo. Than đá, khí thiên nhiên, uranium có trữ lượng hữu hạn.',
    },
    {
      type: 'number',
      prompt:
        'Tấm pin Mặt Trời diện tích $2\\ \\mathrm{m^2}$, hiệu suất $18\\%$, nhận ánh sáng cường độ $900\\ \\mathrm{W/m^2}$ chiếu vuông góc. Công suất điện của tấm pin là bao nhiêu oát?',
      answer: 324,
      tolerance: 0.5,
      unit: 'W',
      hints: ['Dùng $P = \\eta G A$.'],
      solution: '$P = 0{,}18 \\cdot 900 \\cdot 2 = 324$ W.',
    },
    {
      type: 'number',
      prompt:
        'Một tấm pin diện tích $1{,}5\\ \\mathrm{m^2}$ nhận ánh sáng $1\\,000\\ \\mathrm{W/m^2}$ và phát công suất điện $270$ W. Hiệu suất của tấm pin là bao nhiêu phần trăm?',
      answer: 18,
      tolerance: 0.05,
      unit: '%',
      hints: ['Tính công suất toàn phần của ánh sáng chiếu lên tấm pin trước.'],
      solution:
        '$P_{tp} = 1\\,000 \\cdot 1{,}5 = 1\\,500$ W; $\\eta = \\dfrac{270}{1\\,500} = 0{,}18 = 18\\%$.',
    },
    {
      type: 'number',
      prompt:
        'Một hệ thống điện mặt trời mái nhà có tổng diện tích tấm pin $20\\ \\mathrm{m^2}$, hiệu suất $20\\%$. Mỗi ngày lượng nắng tương đương $4$ giờ ở cường độ $1\\,000\\ \\mathrm{W/m^2}$. Điện năng hệ thống cho mỗi ngày là bao nhiêu kWh?',
      answer: 16,
      tolerance: 0.05,
      unit: 'kWh',
      hints: ['Tính công suất điện rồi nhân với $4$ giờ.'],
      solution:
        '$P = 0{,}2 \\cdot 1\\,000 \\cdot 20 = 4\\,000$ W $= 4$ kW; $A = 4 \\cdot 4 = 16$ kWh.',
    },
    {
      type: 'number',
      prompt:
        'Tốc độ gió tăng từ $4$ m/s lên $8$ m/s (tua bin chưa đạt công suất định mức). Công suất của tua bin tăng bao nhiêu lần?',
      answer: 8,
      hints: ['Công suất gió tỉ lệ với lập phương tốc độ gió.'],
      solution: '$\\dfrac{P_2}{P_1} = \\left(\\dfrac{8}{4}\\right)^3 = 2^3 = 8$ lần.',
    },
    {
      type: 'number',
      prompt:
        'Ở cùng tốc độ gió, một tua bin có cánh dài gấp đôi tua bin khác. Công suất của nó gấp bao nhiêu lần?',
      answer: 4,
      hints: ['Công suất tỉ lệ với diện tích vòng quay $\\pi R^2$.'],
      solution: 'Diện tích vòng quay tỉ lệ với $R^2$, nên công suất gấp $2^2 = 4$ lần.',
    },
    {
      type: 'number',
      prompt:
        'Một thuỷ điện nhỏ có lưu lượng nước $50\\ \\mathrm{m^3/s}$, độ cao cột nước $40$ m, hiệu suất $80\\%$. Lấy $g = 9{,}8\\ \\mathrm{m/s^2}$. Công suất điện của nhà máy là bao nhiêu MW?',
      answer: 15.68,
      tolerance: 0.01,
      unit: 'MW',
      hints: [
        'Dùng $P = \\eta \\rho g Q h$ với $\\rho = 1\\,000\\ \\mathrm{kg/m^3}$, rồi đổi sang MW.',
      ],
      solution:
        '$P = 0{,}8 \\cdot 1\\,000 \\cdot 9{,}8 \\cdot 50 \\cdot 40 = 1{,}568 \\cdot 10^{7}$ W $= 15{,}68$ MW.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi công nghệ với sự chuyển hoá năng lượng của nó.',
      left: [
        'Pin quang điện',
        'Tua bin gió',
        'Nhà máy thuỷ điện',
        'Máy nước nóng năng lượng mặt trời',
      ],
      right: [
        'Quang năng → điện năng',
        'Động năng của gió → điện năng',
        'Thế năng của nước → điện năng',
        'Quang năng → nhiệt năng',
        'Điện năng → quang năng',
      ],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['Máy nước nóng không tạo ra điện; đèn mới biến điện năng thành quang năng.'],
      solution:
        'Pin quang điện: quang năng → điện năng. Tua bin gió: động năng gió → điện năng. Thuỷ điện: thế năng nước → điện năng. Máy nước nóng: quang năng → nhiệt năng.',
    },
    {
      type: 'choice',
      prompt: 'Thành phần chính của khí sinh học (biogas) là chất nào?',
      options: [
        'Methane $\\mathrm{CH_4}$',
        'Oxygen $\\mathrm{O_2}$',
        'Hydrogen $\\mathrm{H_2}$',
        'Ozone $\\mathrm{O_3}$',
      ],
      answer: 0,
      hints: ['Đây cũng là thành phần chính của khí thiên nhiên.'],
      solution:
        'Khí sinh học chủ yếu là methane $\\mathrm{CH_4}$, sinh ra khi chất thải hữu cơ bị phân huỷ trong điều kiện không có không khí.',
    },
    {
      type: 'choice',
      prompt: 'Nhược điểm lớn nhất của điện gió và điện mặt trời là gì?',
      options: [
        'Công suất thay đổi theo thời tiết, giờ trong ngày, mùa trong năm',
        'Thải nhiều khí nhà kính khi vận hành',
        'Nguồn năng lượng sẽ sớm cạn kiệt',
        'Chỉ dùng được ở vùng cực',
      ],
      answer: 0,
      hints: ['Ban đêm hoặc lúc lặng gió thì điều gì xảy ra?'],
      solution:
        'Nắng và gió thay đổi liên tục nên công suất không ổn định; cần tích trữ năng lượng và lưới điện thông minh. Chúng hầu như không thải khí khi vận hành và không cạn kiệt.',
    },
    {
      type: 'choice',
      prompt: 'Vì sao tua bin gió phải dừng lại khi gió quá mạnh?',
      options: [
        'Để tránh cánh quạt và máy phát bị hỏng do lực quá lớn',
        'Vì gió mạnh không mang năng lượng',
        'Vì gió mạnh làm công suất giảm về $0$ theo công thức',
        'Để tiết kiệm điện cho tua bin',
      ],
      answer: 0,
      hints: ['Theo công thức, gió càng mạnh thì năng lượng càng lớn.'],
      solution:
        'Gió càng mạnh càng mang nhiều năng lượng, nhưng lực tác dụng lên cánh và trục cũng rất lớn. Tua bin dừng lại để không bị hỏng.',
    },
  ],
  takeaways: [
    'Năng lượng tái tạo (Mặt Trời, gió, nước, sinh khối, địa nhiệt, đại dương) được tự nhiên bổ sung liên tục và phát thải rất ít.',
    'Thuỷ điện: $P = \\eta \\rho g Q h$; hiệu suất cao, nhưng hồ chứa ảnh hưởng tới môi trường.',
    'Pin Mặt Trời: $P = \\eta G A$, hiệu suất khoảng $15\\%$ – $22\\%$.',
    'Tua bin gió: $P = C_p \\cdot \\dfrac{1}{2}\\rho \\pi R^2 v^3$; gió mạnh gấp đôi, công suất gấp $8$ lần.',
    'Thách thức của năng lượng tái tạo là công suất thay đổi theo thời tiết, cần tích trữ năng lượng.',
  ],
};
