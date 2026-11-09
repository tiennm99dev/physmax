/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Đốt nhiên liệu hoá thạch thải CO2, SO2, NOx, CO và bụi; SO2, NOx gây mưa acid; năng lượng hạt nhân có nguy cơ ô nhiễm phóng xạ; CFC làm suy giảm tầng ozone; khí nhà kính gây biến đổi khí hậu. Các chất ô nhiễm lan vào không khí, nước, đất và gây hại cho sức khoẻ.',
  intro:
    'Mỗi ngày, con người thải ra môi trường rất nhiều chất từ nhà máy, xe cộ, đồng ruộng, bãi rác. Có chất bay lên không khí, có chất theo mưa xuống sông hồ, có chất ngấm vào đất rồi đi vào cây trồng và cơ thể ta. Những chất nào gây ô nhiễm môi trường, chúng từ đâu tới và gây hại ra sao?',
  objectives: [
    'Nêu được nguồn gốc của nhiên liệu hoá thạch và các chất gây ô nhiễm khi khai thác, sử dụng chúng.',
    'Nêu được nguyên nhân gây mưa acid và các tác động tiêu cực của mưa acid.',
    'Nêu được nguy cơ gây ô nhiễm môi trường của năng lượng hạt nhân.',
    'Nêu được nguyên nhân, tác hại của sự suy giảm tầng ozone và biến đổi khí hậu.',
    'Chỉ ra được nguồn gốc của một số chất ô nhiễm không khí, nước, đất và ảnh hưởng của chúng tới sức khoẻ.',
  ],
  sections: [
    {
      heading: 'Các chất gây ô nhiễm trong nhiên liệu hoá thạch',
      blocks: [
        {
          type: 'p',
          text: 'Than đá, dầu mỏ và khí thiên nhiên được hình thành từ xác thực vật, động vật bị chôn vùi trong lòng đất hàng triệu năm, chịu áp suất và nhiệt độ cao. Thành phần chính của chúng là carbon và các hợp chất của carbon với hydrogen, kèm theo một ít lưu huỳnh, nitrogen và kim loại nặng.',
        },
        {
          type: 'list',
          items: [
            'Khi khai thác: bụi than, đất đá thải, sụt lún mặt đất; khí methane thoát ra từ mỏ; dầu tràn khi khoan, vận chuyển làm ô nhiễm biển.',
            'Khi đốt: $\\mathrm{CO_2}$ (khí nhà kính); $\\mathrm{CO}$ khi cháy không hoàn toàn; $\\mathrm{SO_2}$ từ lưu huỳnh; các oxide của nitrogen $\\mathrm{NO_x}$; bụi mịn; tro xỉ chứa kim loại nặng.',
          ],
        },
        {
          type: 'table',
          caption: 'Một số chất gây ô nhiễm không khí và ảnh hưởng tới sức khoẻ',
          head: ['Chất', 'Nguồn chính', 'Ảnh hưởng'],
          rows: [
            [
              '$\\mathrm{CO}$',
              'Động cơ xe, bếp than đun trong phòng kín',
              'Kết hợp với hemoglobin, cản trở máu vận chuyển oxygen, gây ngộ độc',
            ],
            [
              '$\\mathrm{SO_2}$, $\\mathrm{NO_x}$',
              'Nhà máy nhiệt điện, động cơ đốt trong',
              'Kích thích đường hô hấp, gây mưa acid',
            ],
            [
              'Bụi mịn PM2,5',
              'Đốt nhiên liệu, xây dựng, đốt rơm rạ',
              'Đi sâu vào phổi và máu, gây bệnh hô hấp, tim mạch',
            ],
            [
              '$\\mathrm{CO_2}$, $\\mathrm{CH_4}$',
              'Đốt nhiên liệu, bãi rác, ruộng lúa',
              'Gây hiệu ứng nhà kính',
            ],
          ],
        },
      ],
    },
    {
      heading: 'Mưa acid',
      blocks: [
        {
          type: 'p',
          text: 'Nước mưa bình thường hoà tan một ít $\\mathrm{CO_2}$ nên có tính acid rất yếu, $\\mathrm{pH} \\approx 5{,}6$. Khi không khí chứa nhiều $\\mathrm{SO_2}$ và $\\mathrm{NO_x}$, các khí này phản ứng với oxygen và hơi nước tạo thành acid $\\mathrm{H_2SO_4}$, $\\mathrm{HNO_3}$, rơi xuống theo mưa.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Mưa acid',
          text: 'Mưa acid là mưa có $\\mathrm{pH}$ nhỏ hơn $5{,}6$. Giảm $1$ đơn vị $\\mathrm{pH}$ nghĩa là nồng độ ion $\\mathrm{H^+}$ tăng $10$ lần.',
        },
        {
          type: 'list',
          items: [
            'Làm chua đất, rửa trôi chất dinh dưỡng, cây cối và rừng bị hại.',
            'Làm chua sông hồ, cá và sinh vật dưới nước bị chết.',
            'Ăn mòn công trình bằng kim loại, đá vôi, tượng đài, di tích.',
            'Hoà tan kim loại nặng trong đất, đưa chúng vào nguồn nước.',
          ],
        },
        {
          type: 'p',
          text: 'Các khí gây mưa acid có thể bay đi hàng trăm ki-lô-mét theo gió, nên mưa acid có thể rơi ở những nơi xa nhà máy.',
        },
      ],
    },
    {
      heading: 'Năng lượng hạt nhân và nguy cơ gây ô nhiễm môi trường',
      blocks: [
        {
          type: 'p',
          text: 'Nhà máy điện hạt nhân dùng năng lượng toả ra khi hạt nhân uranium phân hạch để đun nước thành hơi, quay tua bin. Khi vận hành bình thường, nhà máy hầu như không thải khí nhà kính. Tuy vậy, năng lượng hạt nhân có những nguy cơ lớn:',
        },
        {
          type: 'list',
          items: [
            'Sự cố lò phản ứng có thể phát tán chất phóng xạ vào không khí, nước, đất trên vùng rộng lớn, như ở Chernobyl (1986) và Fukushima (2011).',
            'Chất thải phóng xạ phát ra tia phóng xạ trong thời gian rất dài, không thể khử bằng cách đốt hay dùng hoá chất, phải được cô lập và lưu giữ an toàn hàng nghìn năm.',
            'Khai thác quặng uranium để lại đất đá thải có tính phóng xạ.',
            'Nước làm mát xả ra nóng hơn nước tự nhiên, gây ô nhiễm nhiệt cho sông, biển.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Tác hại của phóng xạ',
          text: 'Tia phóng xạ có năng lượng lớn, có thể làm tổn thương tế bào và vật chất di truyền, gây bệnh phóng xạ, ung thư. Chất phóng xạ lọt vào nước, đất sẽ đi vào cây trồng, vật nuôi và cơ thể người.',
        },
      ],
    },
    {
      heading: 'Suy giảm tầng ozone',
      blocks: [
        {
          type: 'p',
          text: 'Tầng ozone nằm ở tầng bình lưu, cách mặt đất khoảng $15$ – $35$ km. Nó hấp thụ phần lớn tia tử ngoại có hại từ Mặt Trời, như một tấm khiên bảo vệ sự sống trên Trái Đất.',
        },
        {
          type: 'p',
          text: 'Các chất CFC (dùng trong tủ lạnh, điều hoà, bình xịt) và halon (dùng trong bình chữa cháy) bay lên tầng bình lưu. Tại đó, tia tử ngoại phân tách chúng, giải phóng nguyên tử chlorine. Một nguyên tử chlorine có thể phá huỷ hàng nghìn phân tử ozone. Vì vậy tầng ozone mỏng đi, rõ nhất là "lỗ thủng" trên Nam Cực mỗi mùa xuân.',
        },
        {
          type: 'list',
          items: [
            'Tia tử ngoại tới mặt đất tăng gây ung thư da, đục thuỷ tinh thể, suy giảm miễn dịch.',
            'Làm hại sinh vật phù du ở biển, mắt xích đầu tiên của nhiều chuỗi thức ăn.',
            'Làm giảm năng suất cây trồng.',
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Một thành công của hợp tác quốc tế',
          text: 'Nghị định thư Montreal (1987) cấm dần các chất phá huỷ tầng ozone. Nhờ đó, tầng ozone đang hồi phục chậm và được dự báo trở lại mức của năm 1980 vào khoảng giữa thế kỉ XXI.',
        },
      ],
    },
    {
      heading: 'Biến đổi khí hậu và ô nhiễm nước, đất',
      blocks: [
        {
          type: 'p',
          text: 'Khí nhà kính ($\\mathrm{CO_2}$, $\\mathrm{CH_4}$, ...) từ đốt nhiên liệu, phá rừng, bãi rác, chăn nuôi làm Trái Đất nóng lên. Ở Việt Nam, biến đổi khí hậu biểu hiện qua nước biển dâng, xâm nhập mặn ở đồng bằng sông Cửu Long, bão mạnh hơn, lũ quét, sạt lở đất ở miền núi, nắng nóng và hạn hán kéo dài.',
        },
        {
          type: 'table',
          caption: 'Nguồn gốc của một số chất gây ô nhiễm nước và đất',
          head: ['Chất ô nhiễm', 'Nguồn gốc', 'Ảnh hưởng'],
          rows: [
            [
              'Kim loại nặng (chì, thuỷ ngân, cadmium)',
              'Nước thải công nghiệp, pin và rác điện tử, tro xỉ',
              'Tích tụ qua chuỗi thức ăn, hại thần kinh, thận',
            ],
            [
              'Thuốc bảo vệ thực vật, phân bón dư thừa',
              'Đồng ruộng, trôi theo nước mưa',
              'Ngộ độc; làm nước phú dưỡng, tảo phát triển mạnh, cá chết',
            ],
            [
              'Rác nhựa, vi nhựa',
              'Rác sinh hoạt không được thu gom, xử lí',
              'Tồn tại hàng trăm năm, vi nhựa đi vào cơ thể sinh vật',
            ],
            [
              'Vi sinh vật gây bệnh',
              'Nước thải sinh hoạt, chuồng trại chưa xử lí',
              'Gây bệnh tiêu chảy, tả, lị',
            ],
          ],
        },
        {
          type: 'p',
          text: 'Trong phần khám phá, em hãy bật từng nguồn thải trong thành phố ảo để xem chất ô nhiễm đi vào không khí, nước hay đất.',
        },
      ],
    },
    {
      heading: 'Dự án: Bản đồ ô nhiễm quanh em',
      project: true,
      blocks: [
        {
          type: 'p',
          text: 'Mục tiêu: xác định các nguồn gây ô nhiễm quanh trường hoặc nơi em sống, các chất ô nhiễm chúng thải ra và đề xuất giải pháp hạn chế. Dụng cụ: bản đồ khu vực (vẽ tay hoặc in), điện thoại để chụp ảnh, giấy quỳ hoặc giấy đo pH, cốc sạch để hứng nước mưa.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Đánh dấu trên bản đồ các nguồn thải: đường đông xe, nhà máy, bãi rác, cống thải, đồng ruộng, nơi đốt rác.',
            'Với mỗi nguồn, ghi các chất ô nhiễm có thể thải ra và chúng đi vào không khí, nước hay đất.',
            'Hứng nước mưa vào cốc sạch ở hai địa điểm khác nhau, đo $\\mathrm{pH}$ và so sánh với $5{,}6$.',
            'Tra chỉ số chất lượng không khí (AQI) của tỉnh, thành phố em trong một tuần và ghi lại.',
            'Đề xuất ít nhất ba giải pháp hạn chế ô nhiễm mà học sinh và gia đình có thể làm.',
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Báo cáo',
          text: 'Nộp bản đồ ô nhiễm có chú thích, bảng "nguồn – chất ô nhiễm – môi trường bị ảnh hưởng – tác hại", kết quả đo $\\mathrm{pH}$ và AQI, các giải pháp đề xuất. Lưu ý an toàn: chỉ quan sát từ xa, không lại gần nguồn thải độc hại.',
        },
      ],
    },
  ],
  explore: {
    title: 'Thành phố ảo và các nguồn thải',
    instruction:
      'Chế độ Khám phá: bật hoặc tắt từng nguồn thải và quan sát chất ô nhiễm đi vào không khí, nước, đất cùng tác hại của chúng. Chế độ Thử thách: đọc yêu cầu, bật đúng các nguồn rồi bấm "Kiểm tra".',
  },
  examples: [
    {
      problem:
        'Nước mưa ở một khu công nghiệp có $\\mathrm{pH} = 4{,}6$. Đây có phải mưa acid không? Nồng độ ion $\\mathrm{H^+}$ trong nước mưa này gấp bao nhiêu lần nước mưa bình thường ($\\mathrm{pH} = 5{,}6$)?',
      steps: [
        '$4{,}6 < 5{,}6$ nên đây là mưa acid.',
        '$\\mathrm{pH}$ giảm $5{,}6 - 4{,}6 = 1$ đơn vị.',
        'Mỗi đơn vị $\\mathrm{pH}$ giảm ứng với nồng độ $\\mathrm{H^+}$ tăng $10$ lần, nên nồng độ tăng $10^{1} = 10$ lần.',
      ],
      answer: 'Là mưa acid; nồng độ ion $\\mathrm{H^+}$ gấp $10$ lần nước mưa bình thường.',
    },
    {
      problem:
        'Một tấn than có $80\\%$ khối lượng là carbon. Khi cháy hoàn toàn, carbon chuyển thành $\\mathrm{CO_2}$ theo phương trình $\\mathrm{C + O_2 \\rightarrow CO_2}$. Tính khối lượng $\\mathrm{CO_2}$ tạo thành. Cho $\\mathrm{C} = 12$, $\\mathrm{O} = 16$.',
      steps: [
        'Khối lượng carbon: $0{,}8 \\cdot 1 = 0{,}8$ tấn.',
        'Cứ $12$ phần khối lượng carbon tạo ra $12 + 2 \\cdot 16 = 44$ phần khối lượng $\\mathrm{CO_2}$.',
        '$m_{\\mathrm{CO_2}} = 0{,}8 \\cdot \\dfrac{44}{12} \\approx 2{,}93$ tấn.',
      ],
      answer:
        'Khoảng $2{,}93$ tấn $\\mathrm{CO_2}$, nặng gần gấp ba lượng than đã đốt vì carbon kết hợp thêm oxygen của không khí.',
    },
  ],
  practice: [
    {
      type: 'multi',
      prompt: 'Những chất nào được thải ra khi đốt nhiên liệu hoá thạch?',
      options: [
        '$\\mathrm{CO_2}$',
        '$\\mathrm{SO_2}$',
        'Các oxide của nitrogen $\\mathrm{NO_x}$',
        'Bụi mịn',
        'Khí oxygen',
      ],
      answers: [0, 1, 2, 3],
      hints: ['Sự cháy tiêu thụ một trong các khí trên chứ không sinh ra nó.'],
      solution:
        'Đốt nhiên liệu hoá thạch thải $\\mathrm{CO_2}$, $\\mathrm{SO_2}$, $\\mathrm{NO_x}$, bụi mịn (và $\\mathrm{CO}$ khi cháy không hoàn toàn). Sự cháy tiêu thụ oxygen.',
    },
    {
      type: 'choice',
      prompt: 'Nhiên liệu hoá thạch được hình thành như thế nào?',
      options: [
        'Từ xác sinh vật bị chôn vùi hàng triệu năm, chịu áp suất và nhiệt độ cao',
        'Từ đá núi lửa nguội đi trong vài năm',
        'Từ nước biển bay hơi',
        'Do con người tổng hợp trong nhà máy',
      ],
      answer: 0,
      hints: ['Chữ "hoá thạch" gợi đến di tích của sinh vật cổ.'],
      solution:
        'Than, dầu, khí hình thành từ xác thực vật, động vật bị chôn vùi hàng triệu năm dưới áp suất và nhiệt độ cao, nên chúng là năng lượng không tái tạo.',
    },
    {
      type: 'text',
      prompt: 'Mưa có $\\mathrm{pH}$ nhỏ hơn $5{,}6$ được gọi là gì?',
      accept: ['mưa acid', 'mưa axit'],
      hints: ['Tên gọi nói lên tính chất hoá học của nước mưa này.'],
      solution: 'Đó là mưa acid.',
    },
    {
      type: 'number',
      prompt:
        'Nước mưa ở một vùng có $\\mathrm{pH} = 3{,}6$. Nồng độ ion $\\mathrm{H^+}$ của nó gấp bao nhiêu lần nước mưa bình thường có $\\mathrm{pH} = 5{,}6$?',
      answer: 100,
      hints: ['Mỗi đơn vị $\\mathrm{pH}$ giảm ứng với nồng độ $\\mathrm{H^+}$ tăng $10$ lần.'],
      solution:
        '$\\mathrm{pH}$ giảm $2$ đơn vị nên nồng độ $\\mathrm{H^+}$ tăng $10^{2} = 100$ lần.',
    },
    {
      type: 'number',
      prompt:
        'Đốt $500$ tấn than chứa $2\\%$ khối lượng lưu huỳnh. Toàn bộ lưu huỳnh cháy theo phương trình $\\mathrm{S + O_2 \\rightarrow SO_2}$. Tính khối lượng $\\mathrm{SO_2}$ thải ra (tấn). Cho $\\mathrm{S} = 32$, $\\mathrm{O} = 16$.',
      answer: 20,
      tolerance: 0.01,
      unit: 'tấn',
      hints: [
        'Tính khối lượng lưu huỳnh trong than trước.',
        'Cứ $32$ phần khối lượng lưu huỳnh tạo ra $64$ phần khối lượng $\\mathrm{SO_2}$.',
      ],
      solution:
        'Lưu huỳnh: $0{,}02 \\cdot 500 = 10$ tấn. $m_{\\mathrm{SO_2}} = 10 \\cdot \\dfrac{64}{32} = 20$ tấn.',
    },
    {
      type: 'number',
      prompt:
        'Đốt cháy hoàn toàn $1{,}2$ tấn than chứa $75\\%$ khối lượng carbon. Khối lượng $\\mathrm{CO_2}$ tạo thành là bao nhiêu tấn? Cho $\\mathrm{C} = 12$, $\\mathrm{O} = 16$.',
      answer: 3.3,
      tolerance: 0.01,
      unit: 'tấn',
      hints: ['Cứ $12$ phần khối lượng carbon tạo ra $44$ phần khối lượng $\\mathrm{CO_2}$.'],
      solution:
        'Carbon: $0{,}75 \\cdot 1{,}2 = 0{,}9$ tấn. $m_{\\mathrm{CO_2}} = 0{,}9 \\cdot \\dfrac{44}{12} = 3{,}3$ tấn.',
    },
    {
      type: 'multi',
      prompt: 'Mưa acid gây ra những tác hại nào?',
      options: [
        'Làm chua đất, hại cây cối và rừng',
        'Làm chua sông hồ, cá bị chết',
        'Ăn mòn công trình kim loại, đá vôi, di tích',
        'Làm tầng ozone dày lên',
      ],
      answers: [0, 1, 2],
      hints: ['Mưa acid xảy ra ở tầng thấp của khí quyển, không liên quan tới tầng bình lưu.'],
      solution:
        'Mưa acid làm chua đất, sông hồ và ăn mòn công trình. Nó không làm tầng ozone dày lên.',
    },
    {
      type: 'choice',
      prompt: 'Tầng ozone có vai trò gì đối với sự sống trên Trái Đất?',
      options: [
        'Hấp thụ phần lớn tia tử ngoại có hại từ Mặt Trời',
        'Giữ nhiệt cho Trái Đất vào ban đêm',
        'Cung cấp oxygen cho con người hô hấp',
        'Ngăn thiên thạch rơi xuống mặt đất',
      ],
      answer: 0,
      hints: ['Khi tầng ozone mỏng đi, số người bị ung thư da tăng lên.'],
      solution:
        'Tầng ozone hấp thụ phần lớn tia tử ngoại có hại. Tầng ozone suy giảm thì tia tử ngoại tới mặt đất tăng, gây ung thư da, đục thuỷ tinh thể.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi chất với tác hại chính của nó.',
      left: ['$\\mathrm{CO}$', 'CFC', '$\\mathrm{SO_2}$', '$\\mathrm{CO_2}$'],
      right: [
        'Cản trở máu vận chuyển oxygen',
        'Phá huỷ tầng ozone',
        'Gây mưa acid',
        'Gây hiệu ứng nhà kính',
        'Gây phú dưỡng nguồn nước',
      ],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['Phú dưỡng nguồn nước do phân bón dư thừa, không phải do các chất khí trên.'],
      solution:
        '$\\mathrm{CO}$: cản trở vận chuyển oxygen. CFC: phá huỷ tầng ozone. $\\mathrm{SO_2}$: gây mưa acid. $\\mathrm{CO_2}$: gây hiệu ứng nhà kính.',
    },
    {
      type: 'choice',
      prompt: 'Vì sao chất thải phóng xạ của nhà máy điện hạt nhân rất khó xử lí?',
      options: [
        'Vì nó phát tia phóng xạ trong thời gian rất dài và không thể khử bằng cách đốt hay dùng hoá chất',
        'Vì nó là chất khí bay nhanh vào khí quyển',
        'Vì nó tan hoàn toàn trong nước',
        'Vì nó có khối lượng quá lớn',
      ],
      answer: 0,
      hints: [
        'Tính phóng xạ là tính chất của hạt nhân, không thay đổi khi chất tham gia phản ứng hoá học.',
      ],
      solution:
        'Phóng xạ là quá trình của hạt nhân nên không bị đốt hay hoá chất làm mất đi. Chất thải phải được cô lập, lưu giữ an toàn rất lâu.',
    },
    {
      type: 'multi',
      prompt: 'Những nguồn nào đưa chất ô nhiễm vào nguồn nước?',
      options: [
        'Nước thải công nghiệp chưa qua xử lí',
        'Phân bón, thuốc bảo vệ thực vật trôi theo nước mưa',
        'Nước rỉ ra từ bãi rác',
        'Trồng rừng ở đầu nguồn',
      ],
      answers: [0, 1, 2],
      hints: ['Một việc làm giúp giữ đất và làm sạch nước.'],
      solution:
        'Nước thải công nghiệp, hoá chất nông nghiệp và nước rỉ rác đều làm ô nhiễm nước. Trồng rừng đầu nguồn giúp giữ đất, điều hoà dòng chảy, bảo vệ nguồn nước.',
    },
  ],
  takeaways: [
    'Đốt nhiên liệu hoá thạch thải $\\mathrm{CO_2}$, $\\mathrm{CO}$, $\\mathrm{SO_2}$, $\\mathrm{NO_x}$, bụi mịn và tro xỉ.',
    'Mưa acid ($\\mathrm{pH} < 5{,}6$) do $\\mathrm{SO_2}$, $\\mathrm{NO_x}$ gây ra, làm chua đất, nước và ăn mòn công trình.',
    'Năng lượng hạt nhân có nguy cơ sự cố phát tán phóng xạ và chất thải phóng xạ phải lưu giữ rất lâu.',
    'CFC, halon phá huỷ tầng ozone, làm tia tử ngoại tới mặt đất tăng.',
    'Chất ô nhiễm lan qua không khí, nước, đất và đi vào cơ thể người qua hô hấp, nước uống, thức ăn.',
  ],
};
