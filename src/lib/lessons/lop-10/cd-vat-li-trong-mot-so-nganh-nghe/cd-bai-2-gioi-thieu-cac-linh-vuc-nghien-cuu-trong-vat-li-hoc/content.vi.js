/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Giới thiệu các lĩnh vực chính của vật lí hiện đại: thiên văn và vũ trụ học, hạt cơ bản và năng lượng cao, nano, laser, bán dẫn, y sinh, với đối tượng nghiên cứu, mô hình lí thuyết, phương pháp thực nghiệm và mối liên hệ giữa chúng.',
  intro:
    'Tàu thăm dò đáp xuống Sao Hoả, chùm laser thay cho dao mổ, con chip trong điện thoại có hàng tỉ transistor. Những thành tựu ấy đến từ các lĩnh vực khác nhau của vật lí hiện đại. Các nhà khoa học trong từng lĩnh vực nghiên cứu điều gì, và họ làm việc như thế nào?',
  objectives: [
    'Nêu được đối tượng nghiên cứu của một số lĩnh vực chính của vật lí hiện đại.',
    'Liệt kê được một số mô hình lí thuyết đơn giản và phương pháp thực nghiệm của các lĩnh vực đó.',
    'Lấy được ví dụ về ứng dụng của từng lĩnh vực trong công nghệ và đời sống.',
    'Chỉ ra được mối liên hệ giữa các lĩnh vực.',
    'Tự tìm hiểu được một lí thuyết khoa học hoặc công nghệ mới từ sách báo và internet.',
  ],
  sections: [
    {
      heading: 'Vật lí thiên văn và vũ trụ học',
      blocks: [
        {
          type: 'p',
          text: 'Lĩnh vực này nghiên cứu các thiên thể như hành tinh, sao, thiên hà và toàn thể vũ trụ: nguồn gốc, cấu trúc và sự tiến hoá. Mô hình lí thuyết tiêu biểu là thuyết tương đối rộng và thuyết Vụ nổ lớn (Big Bang).',
        },
        {
          type: 'p',
          text: 'Phương pháp thực nghiệm chủ yếu là quan sát và thu tín hiệu từ xa: kính thiên văn đặt trên mặt đất hoặc ngoài không gian, phân tích ánh sáng từ các sao, gửi tàu thăm dò. Năm $2018$, tàu Parker Solar Probe được phóng để tiếp cận Mặt Trời, và tàu InSight hạ cánh xuống Sao Hoả để khảo sát cấu trúc bên trong hành tinh này.',
        },
      ],
    },
    {
      heading: 'Vật lí hạt cơ bản và năng lượng cao',
      blocks: [
        {
          type: 'p',
          text: 'Lĩnh vực này nghiên cứu các hạt sơ cấp trong vật chất và bức xạ, cùng tương tác giữa chúng. Người ta còn gọi nó là vật lí năng lượng cao vì nhiều hạt chỉ được tạo ra trong các va chạm năng lượng rất lớn nhờ máy gia tốc.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Hạt cơ bản và hạt tổ hợp',
          text: 'Hạt cơ bản (hạt sơ cấp) là hạt chưa thể chia nhỏ hơn theo hiểu biết hiện nay, như electron và quark. Hạt tổ hợp được cấu thành từ các hạt khác: proton và neutron được cấu thành từ quark.',
        },
        {
          type: 'p',
          text: 'Mô hình chuẩn là lí thuyết mô tả các hạt cơ bản và tương tác giữa chúng. Máy gia tốc LHC tại CERN cho các chùm proton va chạm, các đầu dò khổng lồ ghi lại sản phẩm. Năm $2012$, hạt Higgs do mô hình này dự đoán đã được xác nhận tại đây.',
        },
      ],
    },
    {
      heading: 'Vật lí nano',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Vật liệu nano',
          text: 'Vật liệu nano là vật liệu có cấu trúc dạng hạt, sợi, ống hoặc tấm mỏng với kích thước khoảng từ $1$ nm đến $100$ nm, trong đó $1$ nm $= 10^{-9}$ m.',
        },
        {
          type: 'p',
          text: 'Vật liệu nano có tính chất rất khác vì kích thước của nó so sánh được với các kích thước tới hạn của tính chất hoá lí: tính chất của nó nằm giữa tính chất lượng tử của nguyên tử và tính chất của vật liệu khối. Khi đó, tỉ lệ nguyên tử nằm ở bề mặt cũng rất lớn.',
        },
        {
          type: 'p',
          text: 'Các nhà khoa học nghiên cứu vật liệu nano bằng lí thuyết (cơ học lượng tử), thực nghiệm (kính hiển vi điện tử quan sát tới cỡ nguyên tử, phân tử) và mô phỏng trên máy tính. Ứng dụng có trong y sinh (chẩn đoán bệnh, dẫn truyền thuốc), năng lượng (pin, tụ điện), môi trường và công nghệ thông tin (thiết bị ghi thông tin, màn hình, vật liệu siêu nhẹ, siêu bền).',
        },
        {
          type: 'p',
          text: 'Để cảm nhận kích thước nano, hãy kéo thanh trượt dưới đây từ hạt nhỏ nhất đến cả vũ trụ quan sát được. Mỗi thang có lĩnh vực nghiên cứu riêng.',
        },
        { type: 'widget', name: 'thang-kich-thuoc' },
      ],
    },
    {
      heading: 'Vật lí laser',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Laser',
          text: 'Laser là viết tắt của cụm từ tiếng Anh Light Amplification by Stimulated Emission of Radiation, nghĩa là khuếch đại ánh sáng bằng bức xạ cảm ứng.',
        },
        {
          type: 'p',
          text: 'So với ánh sáng thông thường, laser có tính đơn sắc cao, định hướng cao, năng lượng tập trung và đi được rất xa mà ít bị phân tán. Thiết bị laser gồm môi trường hoạt chất đặt trong buồng cộng hưởng và nguồn cấp năng lượng; laser đầu tiên hoạt động năm $1960$.',
        },
        {
          type: 'p',
          text: 'Laser dùng để cắt kim loại trong công nghiệp; làm dao mổ trong y học (ít đau, phục hồi nhanh hơn); truyền tin qua cáp quang; đo khoảng cách và liên lạc trong nghiên cứu vũ trụ.',
        },
      ],
    },
    {
      heading: 'Vật lí bán dẫn',
      blocks: [
        {
          type: 'p',
          text: 'Chất bán dẫn như silicon có độ dẫn điện trung gian giữa kim loại và chất cách điện. Độ dẫn điện của nó tăng mạnh khi tăng nhiệt độ, khi chiếu sáng hoặc khi pha tạp chất, nên có thể điều khiển được. Lí thuyết vùng năng lượng dựa trên cơ học lượng tử giải thích các tính chất này.',
        },
        {
          type: 'p',
          text: 'Vật lí bán dẫn là nền tảng của diode, transistor, chip máy tính, thẻ nhớ, LED, pin mặt trời, cảm biến. Từ transistor đầu tiên ($1947$) đến nay, công nghệ không ngừng phát triển: bên cạnh silicon còn có các vật liệu mới như SiC và GaN, dùng trong thiết bị công suất lớn.',
        },
      ],
    },
    {
      heading: 'Vật lí y sinh',
      blocks: [
        {
          type: 'p',
          text: 'Vật lí y sinh nghiên cứu các quá trình vật lí trong cơ thể sống, cơ chế sinh bệnh, tác động của các yếu tố môi trường và vật lí, cùng các kĩ thuật chẩn đoán và điều trị hiện đại.',
        },
        {
          type: 'list',
          items: [
            'Chẩn đoán: chụp X-quang, siêu âm, cộng hưởng từ, đo điện tim.',
            'Phục hồi chức năng: thiết bị dùng laser, điện, từ, quang, siêu âm, sóng ngắn trị liệu.',
            'Nghiên cứu: kĩ thuật PCR khuếch đại một đoạn DNA thành rất nhiều bản sao, giúp quan sát kết quả và nghiên cứu các tương tác phức tạp trong tiến trình sống.',
          ],
        },
      ],
    },
    {
      heading: 'Liên hệ giữa các lĩnh vực',
      blocks: [
        {
          type: 'p',
          text: 'Các lĩnh vực không tách rời nhau. Chúng cùng dựa trên hai trụ cột là cơ học lượng tử và thuyết tương đối, và thường dùng thành quả của nhau: diode laser là linh kiện bán dẫn, transistor trong chip có kích thước nano, laser là công cụ đo của vật lí thiên văn, máy gia tốc được dùng để xạ trị.',
        },
        {
          type: 'table',
          caption: 'Tóm tắt các lĩnh vực',
          head: ['Lĩnh vực', 'Đối tượng', 'Công cụ tiêu biểu'],
          rows: [
            ['Thiên văn và vũ trụ học', 'Thiên thể, vũ trụ', 'Kính thiên văn, tàu thăm dò'],
            ['Hạt cơ bản, năng lượng cao', 'Hạt sơ cấp và tương tác', 'Máy gia tốc, đầu dò'],
            ['Nano', 'Vật liệu cỡ $1$–$100$ nm', 'Kính hiển vi điện tử'],
            ['Laser', 'Bức xạ cảm ứng, chùm laser', 'Buồng cộng hưởng'],
            ['Bán dẫn', 'Vật liệu dẫn điện trung gian', 'Pha tạp, đo đặc trưng linh kiện'],
            ['Y sinh', 'Quá trình vật lí trong cơ thể sống', 'Máy chẩn đoán hình ảnh'],
          ],
        },
      ],
    },
    {
      heading: 'Dự án: Tìm hiểu một công nghệ mới',
      project: true,
      blocks: [
        {
          type: 'p',
          text: 'Mục tiêu: tự tìm hiểu một lí thuyết khoa học hoặc công nghệ mới qua sách báo và internet, chỉ ra được lĩnh vực vật lí đứng sau nó. Dụng cụ: thiết bị truy cập internet, sách báo khoa học, giấy khổ lớn hoặc phần mềm trình chiếu.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Theo nhóm, chọn một thành tựu gần đây, ví dụ: kính thiên văn James Webb, pin mặt trời mới, máy tính lượng tử, dao mổ laser.',
            'Xác định lĩnh vực chính của thành tựu đó và ít nhất một lĩnh vực có liên hệ.',
            'Ghi lại đối tượng nghiên cứu, mô hình lí thuyết và phương pháp thực nghiệm mà nhóm tìm được.',
            'Chọn nguồn đáng tin cậy (trang của viện nghiên cứu, tạp chí khoa học) và đối chiếu ít nhất hai nguồn.',
            'Vẽ sơ đồ tư duy có lĩnh vực ở giữa, các nhánh gồm đối tượng, phương pháp, ứng dụng và lĩnh vực liên quan.',
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Báo cáo',
          text: 'Trình bày sơ đồ tư duy trong $5$ phút. Nêu rõ thành tựu giải quyết vấn đề gì, dựa trên kiến thức vật lí nào, và nêu một câu hỏi mà nhóm vẫn chưa trả lời được. Liệt kê nguồn tham khảo.',
        },
      ],
    },
  ],
  explore: {
    title: 'Bản đồ tư duy các lĩnh vực vật lí',
    instruction:
      'Chạm vào mỗi nhánh để xem đối tượng, hiện tượng, mô hình, thực nghiệm và ứng dụng. Đường màu vàng nối nhánh đang chọn với các nhánh có liên hệ. Sau đó chuyển sang "Đoán nhánh" và chọn nhánh phù hợp với từng hiện tượng.',
  },
  examples: [
    {
      problem:
        'Một hạt nano vàng có đường kính $20$ nm, một sợi tóc có đường kính khoảng $80\\ \\mu\\text{m}$. Đường kính sợi tóc gấp bao nhiêu lần đường kính hạt nano?',
      steps: [
        'Đổi về mét: $20$ nm $= 20 \\cdot 10^{-9}$ m $= 2 \\cdot 10^{-8}$ m.',
        '$80\\ \\mu\\text{m} = 80 \\cdot 10^{-6}$ m $= 8 \\cdot 10^{-5}$ m.',
        'Lập tỉ số: $\\dfrac{8 \\cdot 10^{-5}}{2 \\cdot 10^{-8}} = 4 \\cdot 10^{3} = 4\\,000$.',
      ],
      answer:
        'Đường kính sợi tóc gấp $4\\,000$ lần đường kính hạt nano. Hạt này còn nhỏ hơn bước sóng ánh sáng nhìn thấy (cỡ $500$ nm) nên kính hiển vi quang học không phân biệt được, phải dùng kính hiển vi điện tử.',
    },
    {
      problem:
        'Để đo khoảng cách từ Trái Đất đến Mặt Trăng, người ta bắn một xung laser tới gương phản xạ đặt trên Mặt Trăng. Thời gian từ lúc phát đến lúc nhận lại tín hiệu là $2{,}56$ s. Lấy tốc độ ánh sáng là $3 \\cdot 10^{8}$ m/s. Tính khoảng cách đó.',
      steps: [
        'Xung laser đi tới Mặt Trăng rồi quay về, nên quãng đường đi được bằng $2d$.',
        'Từ $2d = ct$ suy ra $d = \\dfrac{ct}{2}$.',
        '$d = \\dfrac{3 \\cdot 10^{8} \\cdot 2{,}56}{2} = 3{,}84 \\cdot 10^{8}$ m.',
      ],
      answer:
        'Khoảng cách từ Trái Đất đến Mặt Trăng là $3{,}84 \\cdot 10^{8}$ m, tức $384\\,000$ km.',
    },
  ],
  practice: [
    {
      type: 'match',
      prompt: 'Nối mỗi lĩnh vực với đối tượng nghiên cứu của nó.',
      left: ['Vũ trụ học', 'Vật lí hạt cơ bản', 'Vật lí nano', 'Vật lí y sinh'],
      right: [
        'Nguồn gốc, cấu trúc và sự tiến hoá của vũ trụ',
        'Các hạt sơ cấp và tương tác giữa chúng',
        'Vật liệu có kích thước khoảng $1$–$100$ nm',
        'Các quá trình vật lí trong cơ thể sống',
        'Chuyển động của các vật theo định luật Newton',
      ],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['Một ý ở cột bên phải thuộc vật lí cổ điển nên không dùng đến.'],
      solution:
        'Vũ trụ học: nguồn gốc, cấu trúc và sự tiến hoá của vũ trụ. Vật lí hạt cơ bản: các hạt sơ cấp và tương tác. Vật lí nano: vật liệu cỡ $1$–$100$ nm. Vật lí y sinh: các quá trình vật lí trong cơ thể sống.',
    },
    {
      type: 'choice',
      prompt: 'Laser là nguồn sáng thu được nhờ quá trình nào?',
      options: [
        'Khuếch đại ánh sáng bằng bức xạ cảm ứng',
        'Đốt nóng dây tóc đến nhiệt độ rất cao',
        'Tách ánh sáng trắng bằng lăng kính',
        'Phản xạ ánh sáng Mặt Trời trên gương',
      ],
      answer: 0,
      hints: ['Tên laser là viết tắt của Light Amplification by Stimulated Emission of Radiation.'],
      solution: 'Laser có nghĩa là khuếch đại ánh sáng bằng bức xạ cảm ứng.',
    },
    {
      type: 'multi',
      prompt: 'Những ưu điểm nào là của laser so với ánh sáng thông thường?',
      options: [
        'Tính đơn sắc cao',
        'Tính định hướng cao',
        'Năng lượng tập trung',
        'Chứa đủ mọi màu như ánh sáng trắng',
        'Toả đều ra mọi hướng',
      ],
      answers: [0, 1, 2],
      hints: ['Hãy nghĩ đến một chùm sáng mảnh, cùng một màu, chiếu rất xa vẫn ít bị loe ra.'],
      solution:
        'Laser đơn sắc, định hướng cao và tập trung năng lượng lớn. Ánh sáng trắng của đèn thông thường mới gồm nhiều màu và toả ra nhiều hướng.',
    },
    {
      type: 'choice',
      prompt: 'Hạt nào dưới đây là hạt tổ hợp, được cấu thành từ các hạt khác?',
      options: ['Proton', 'Electron', 'Quark', 'Photon'],
      answer: 0,
      hints: ['Hạt cần chọn là một trong hai loại hạt tạo nên hạt nhân nguyên tử.'],
      solution:
        'Proton được cấu thành từ các quark. Electron, quark và photon được coi là hạt cơ bản.',
    },
    {
      type: 'choice',
      prompt: 'Vì sao vật lí hạt cơ bản còn được gọi là vật lí năng lượng cao?',
      options: [
        'Vì nhiều hạt chỉ được tạo ra trong các va chạm có năng lượng rất lớn nhờ máy gia tốc',
        'Vì các hạt cơ bản có khối lượng rất lớn so với Trái Đất',
        'Vì lĩnh vực này chuyên nghiên cứu cách sản xuất điện',
        'Vì các thí nghiệm chỉ được làm ở nhiệt độ thấp',
      ],
      answer: 0,
      hints: ['Hãy nghĩ đến công cụ thí nghiệm chính của lĩnh vực này.'],
      solution:
        'Nhiều hạt chỉ sinh ra trong các va chạm năng lượng rất lớn, nên cần máy gia tốc để tạo ra và nghiên cứu chúng.',
    },
    {
      type: 'number',
      prompt:
        'Xếp các hạt nano đường kính $40$ nm sát nhau thành một hàng dài $1$ mm. Cần bao nhiêu hạt?',
      answer: 25000,
      tolerance: 0.5,
      hints: ['Đổi cả hai độ dài về mét.', '$1$ mm $= 10^{-3}$ m; $40$ nm $= 4 \\cdot 10^{-8}$ m.'],
      solution: '$N = \\dfrac{10^{-3}}{4 \\cdot 10^{-8}} = 25\\,000$ hạt.',
    },
    {
      type: 'number',
      prompt:
        'Một xung laser được bắn tới gương phản xạ trên Mặt Trăng và quay trở lại sau $2{,}5$ s. Lấy tốc độ ánh sáng là $300\\,000$ km/s. Khoảng cách tới gương là bao nhiêu ki-lô-mét?',
      answer: 375000,
      tolerance: 1,
      unit: 'km',
      hints: ['Trong $2{,}5$ s, xung laser đi cả lượt đi và lượt về.'],
      solution: '$d = \\dfrac{ct}{2} = \\dfrac{300\\,000 \\cdot 2{,}5}{2} = 375\\,000$ km.',
    },
    {
      type: 'choice',
      prompt: 'Dụng cụ nào giúp quan sát vật liệu nano tới cỡ nguyên tử, phân tử?',
      options: ['Kính hiển vi điện tử', 'Kính lúp', 'Kính thiên văn', 'Máy gia tốc'],
      answer: 0,
      hints: ['Hãy so sánh kích thước nano với giới hạn của các dụng cụ dùng ánh sáng nhìn thấy.'],
      solution:
        'Kính hiển vi điện tử dùng chùm electron nên quan sát được tới cỡ nguyên tử, phân tử. Kính lúp không đủ độ phóng đại; kính thiên văn dùng để quan sát vật ở xa; máy gia tốc dùng để tạo các va chạm năng lượng cao.',
    },
    {
      type: 'text',
      prompt: 'Nguyên tố bán dẫn nào được dùng phổ biến nhất để chế tạo chip máy tính?',
      accept: ['silicon', 'silic', 'si'],
      hints: ['Nguyên tố này có nhiều trong cát, kí hiệu hoá học gồm hai chữ cái.'],
      solution: 'Đó là silicon (Si), nguyên tố phổ biến trong vỏ Trái Đất, có trong cát.',
    },
    {
      type: 'multi',
      prompt:
        'Diode laser trong đầu đọc đĩa và thiết bị truyền tin qua cáp quang gắn với những lĩnh vực nào?',
      options: ['Vật lí laser', 'Vật lí bán dẫn', 'Vũ trụ học', 'Vật lí hạt cơ bản'],
      answers: [0, 1],
      hints: ['Đây là một linh kiện điện tử phát ra chùm sáng đơn sắc.'],
      solution:
        'Diode laser là linh kiện bán dẫn phát ra chùm laser, nên gắn với cả vật lí bán dẫn và vật lí laser. Đây là một ví dụ về sự liên hệ giữa các lĩnh vực.',
    },
    {
      type: 'choice',
      prompt:
        'Việc dùng siêu âm và cộng hưởng từ để chẩn đoán bệnh gắn trực tiếp nhất với lĩnh vực nào?',
      options: ['Vật lí y sinh', 'Vũ trụ học', 'Vật lí hạt cơ bản', 'Vật lí nano'],
      answer: 0,
      hints: ['Hãy để ý đến đối tượng được khám: cơ thể sống.'],
      solution:
        'Vật lí y sinh nghiên cứu các kĩ thuật chẩn đoán và điều trị dựa trên các hiện tượng vật lí.',
    },
  ],
  takeaways: [
    'Các lĩnh vực chính: thiên văn và vũ trụ học, hạt cơ bản và năng lượng cao, nano, laser, bán dẫn, y sinh.',
    'Mỗi lĩnh vực có đối tượng, mô hình lí thuyết và công cụ thực nghiệm riêng.',
    'Vật liệu nano có kích thước khoảng $1$–$100$ nm, với $1$ nm $= 10^{-9}$ m.',
    'Laser đơn sắc, định hướng cao và tập trung năng lượng.',
    'Các lĩnh vực liên hệ chặt chẽ và cùng dựa trên cơ học lượng tử, thuyết tương đối.',
  ],
};
