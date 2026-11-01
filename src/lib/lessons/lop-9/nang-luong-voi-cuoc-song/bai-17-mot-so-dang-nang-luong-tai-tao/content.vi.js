/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Năng lượng tái tạo đến từ các nguồn liên tục được bổ sung qua các quá trình tự nhiên, như năng lượng Mặt Trời, gió, sóng biển, dòng sông, sinh khối, địa nhiệt. Mỗi dạng có ưu điểm và nhược điểm riêng, nên cần chọn theo điều kiện từng nơi và sử dụng năng lượng hiệu quả để bảo vệ môi trường.',
  intro:
    'Nhiên liệu hoá thạch đang cạn dần và gây ô nhiễm môi trường. Nắng, gió, sóng, dòng sông thì vẫn còn đó mỗi ngày. Nhưng vì sao ta không thể chỉ lắp thật nhiều pin Mặt Trời là đủ điện cho cả tỉnh? Mỗi nguồn năng lượng tái tạo mạnh ở đâu, yếu ở đâu?',
  objectives: [
    'Nêu được khái niệm năng lượng tái tạo và kể được một số dạng năng lượng tái tạo.',
    'Nêu được ưu điểm, nhược điểm của năng lượng Mặt Trời, gió, sóng biển, dòng sông, sinh khối và địa nhiệt.',
    'Chọn được dạng năng lượng tái tạo phù hợp với địa hình và thời tiết của một vùng, giải thích được vì sao cần phối hợp nhiều nguồn.',
    'Nêu được một số biện pháp sử dụng hiệu quả năng lượng và bảo vệ môi trường.',
  ],
  sections: [
    {
      heading: 'Năng lượng tái tạo',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Năng lượng tái tạo',
          text: 'Năng lượng tái tạo là năng lượng từ các nguồn có sẵn trong tự nhiên, liên tục được bổ sung thông qua các quá trình tự nhiên.',
        },
        {
          type: 'p',
          text: 'Phần lớn năng lượng tái tạo bắt nguồn từ Mặt Trời: ánh sáng trực tiếp, gió và sóng (do chênh lệch nhiệt độ trong khí quyển), dòng sông (do nước bốc hơi rồi mưa xuống), sinh khối (do cây quang hợp). Riêng địa nhiệt đến từ nhiệt trong lòng Trái Đất.',
        },
      ],
    },
    {
      heading: 'Năng lượng Mặt Trời, gió và sóng biển',
      blocks: [
        {
          type: 'table',
          caption: 'Ưu điểm và nhược điểm',
          head: ['Dạng năng lượng', 'Ưu điểm', 'Nhược điểm'],
          rows: [
            [
              'Mặt Trời',
              'Luôn có sẵn, khó cạn kiệt; không gây tiếng ồn; không thải khí gây ô nhiễm hay khí nhà kính khi hoạt động.',
              'Giá tấm pin còn cao, hiệu suất thấp; pin hết hạn thành rác thải điện tử; gây ô nhiễm ánh sáng ở đô thị; chiếm nhiều diện tích, ảnh hưởng hệ sinh thái.',
            ],
            [
              'Gió',
              'Luôn có sẵn, không thải khí nhà kính; công nghệ phát triển mạnh; nhiều vùng biển nước ta có tiềm năng.',
              'Hiệu suất chuyển đổi thấp, đầu tư ban đầu cao; gây tiếng ồn; ảnh hưởng đến chim di cư và dơi; có thể gây nhiễu tín hiệu phát thanh.',
            ],
            [
              'Sóng biển',
              'Luôn có sẵn, không tạo chất thải.',
              'Hiệu suất thấp, đầu tư cao; ảnh hưởng giao thông đường biển và hệ sinh thái; phụ thuộc mùa, chịu tác động của thiên tai.',
            ],
          ],
        },
        {
          type: 'p',
          text: 'Năng lượng Mặt Trời được dùng trực tiếp để chiếu sáng, sấy khô nông sản, làm muối; và dùng để tạo điện nhờ pin Mặt Trời, hoặc để đun nước và chạy nhà máy nhiệt điện nhờ thiết bị thu nhiệt.',
        },
      ],
    },
    {
      heading: 'Năng lượng dòng sông, sinh khối và địa nhiệt',
      blocks: [
        {
          type: 'table',
          caption: 'Ưu điểm và nhược điểm',
          head: ['Dạng năng lượng', 'Ưu điểm', 'Nhược điểm'],
          rows: [
            [
              'Dòng sông (thuỷ điện)',
              'Có sẵn trong tự nhiên; ít tác động xấu đến môi trường hơn nhiên liệu hoá thạch; hiệu suất tạo điện cao hơn điện Mặt Trời và điện gió.',
              'Đập ảnh hưởng môi trường sống, cản trở động vật di chuyển từ hạ nguồn lên thượng nguồn; có thể gây áp lực địa chất và động đất; làm mất rừng, buộc di dời dân cư; vỡ đập gây lũ lụt diện rộng.',
            ],
            [
              'Sinh khối',
              'Tận dụng chất hữu cơ từ thực vật, động vật như rơm, trấu, bã mía, gỗ vụn, phân; chủ động phát điện cả ngày đêm.',
              'Đốt vẫn thải khói và khí gây ô nhiễm; nguồn nguyên liệu có hạn; có thể chiếm đất trồng cây lương thực.',
            ],
            [
              'Địa nhiệt',
              'Ổn định cả ngày đêm, quanh năm; chiếm ít đất; thải ít khí nhà kính.',
              'Chỉ khai thác được ở một số vùng; khoan sâu rất tốn kém; có thể làm rò rỉ khí độc từ lòng đất.',
            ],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Không có nguồn nào hoàn hảo',
          text: 'Ban đêm không có điện từ pin Mặt Trời, gió lúc mạnh lúc yếu, mùa khô sông ít nước. Vì vậy cần chọn nguồn phù hợp với địa hình, thời tiết của từng vùng và phối hợp nhiều nguồn với nhau.',
        },
      ],
    },
    {
      heading: 'Sử dụng hiệu quả năng lượng và bảo vệ môi trường',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Sử dụng hiệu quả năng lượng',
          text: 'Sử dụng hiệu quả năng lượng là dùng ít năng lượng hơn để thực hiện cùng một công việc hoặc chức năng của thiết bị.',
        },
        {
          type: 'p',
          text: 'Bảo vệ môi trường gồm phòng ngừa và hạn chế tác động xấu đến môi trường, khắc phục ô nhiễm, sử dụng hợp lí tài nguyên thiên nhiên và ứng phó với biến đổi khí hậu. Hai việc này gắn chặt với nhau: dùng ít năng lượng hơn thì đốt ít nhiên liệu hơn và thải ít khí độc hơn.',
        },
        {
          type: 'list',
          items: [
            'Tắt đèn, quạt và rút phích cắm khi không dùng; tận dụng ánh sáng và gió tự nhiên.',
            'Chọn thiết bị tiết kiệm điện, như đèn LED hay thiết bị có nhãn năng lượng cao.',
            'Đi bộ, đi xe đạp, đi phương tiện công cộng khi có thể.',
            'Tăng tỉ lệ năng lượng tái tạo, giảm dần việc đốt nhiên liệu hoá thạch.',
            'Trồng và giữ rừng; phân loại, tái chế rác thải.',
          ],
        },
      ],
    },
  ],
  explore: {
    title: 'Quy hoạch điện cho một tỉnh',
    instruction:
      'Chọn một tỉnh, đọc đặc điểm địa hình và thời tiết, rồi bấm + để xây các cụm nhà máy. Mục tiêu: đủ điện trong cả bốn tình huống (ngày, đêm, mùa mưa, mùa khô) mà không vượt ngân sách. Thử cả ba tỉnh và so sánh tổ hợp của em.',
  },
  examples: [
    {
      problem:
        'Một gia đình lắp $10$ tấm pin Mặt Trời, mỗi tấm có công suất $400$ W khi nắng tốt. Coi mỗi ngày có $5$ giờ nắng tốt. Tính điện năng các tấm pin tạo ra trong một ngày và trong $30$ ngày (theo kWh).',
      steps: [
        'Tổng công suất: $P = 10 \\cdot 400 = 4\\,000$ W $= 4$ kW.',
        'Điện năng mỗi ngày: $W = P \\cdot t = 4 \\cdot 5 = 20$ kWh.',
        'Điện năng trong $30$ ngày: $20 \\cdot 30 = 600$ kWh.',
      ],
      answer:
        'Mỗi ngày $20$ kWh; trong $30$ ngày $600$ kWh. Ban đêm các tấm pin không tạo ra điện.',
    },
    {
      problem:
        'Mỗi giây có $20$ tấn nước từ hồ chứa chảy xuống tuabin đặt thấp hơn mặt hồ $50$ m. Coi $85\\%$ thế năng của nước được biến thành điện năng. Tính công suất điện của nhà máy.',
      steps: [
        'Trọng lượng nước mỗi giây: $P = 10m = 10 \\cdot 20\\,000 = 200\\,000$ N.',
        'Thế năng của lượng nước đó: $W_t = P \\cdot h = 200\\,000 \\cdot 50 = 10\\,000\\,000$ J.',
        'Điện năng tạo ra trong mỗi giây: $10\\,000\\,000 \\cdot 85\\% = 8\\,500\\,000$ J.',
        'Công suất điện là điện năng tạo ra trong một giây: $8\\,500\\,000$ W $= 8{,}5$ MW.',
      ],
      answer: 'Công suất điện của nhà máy là $8{,}5$ MW.',
    },
    {
      problem:
        'Một huyện đảo nắng nhiều, gió mạnh quanh năm, không có sông lớn. Nên chọn những nguồn năng lượng tái tạo nào để cấp điện, và vì sao không nên chỉ dùng một nguồn?',
      steps: [
        'Không có sông lớn nên không làm được thuỷ điện. Đảo nhỏ cũng ít phụ phẩm để làm sinh khối.',
        'Nhiều nắng nên phù hợp pin Mặt Trời, nhưng ban đêm pin không phát điện.',
        'Gió mạnh quanh năm và chạy được cả đêm, nhưng có lúc gió yếu.',
        'Kết hợp Mặt Trời với gió thì hai nguồn bù cho nhau; nên có thêm thiết bị tích trữ điện.',
      ],
      answer: 'Nên phối hợp điện Mặt Trời và điện gió, vì mỗi nguồn đều có lúc không đủ điện.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Năng lượng tái tạo là năng lượng',
      options: [
        'lấy từ các nguồn có sẵn trong tự nhiên, liên tục được bổ sung qua các quá trình tự nhiên.',
        'chỉ dùng được một lần rồi hết.',
        'do con người tự tạo ra trong nhà máy, không lấy từ tự nhiên.',
        'luôn không gây bất kì ảnh hưởng nào tới môi trường.',
      ],
      answer: 0,
      hints: ['Từ khoá là "liên tục được bổ sung".'],
      solution:
        'Năng lượng tái tạo đến từ các nguồn liên tục được bổ sung qua các quá trình tự nhiên. Nó vẫn có thể ảnh hưởng tới môi trường, như đập thuỷ điện làm mất rừng.',
    },
    {
      type: 'multi',
      prompt: 'Những dạng năng lượng nào là năng lượng tái tạo?',
      options: [
        'Năng lượng gió',
        'Năng lượng từ than mỏ',
        'Năng lượng sóng biển',
        'Năng lượng địa nhiệt',
        'Năng lượng từ khí thiên nhiên',
      ],
      answers: [0, 2, 3],
      hints: ['Loại những nguồn phải mất hàng triệu năm mới hình thành.'],
      solution:
        'Gió, sóng biển và địa nhiệt là năng lượng tái tạo. Than mỏ và khí thiên nhiên là năng lượng hoá thạch.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi dạng năng lượng với nhược điểm đặc trưng của nó.',
      left: ['Mặt Trời', 'Gió', 'Dòng sông', 'Sinh khối'],
      right: [
        'Pin hết hạn thành rác thải điện tử',
        'Gây tiếng ồn, ảnh hưởng đến chim di cư',
        'Đập làm mất rừng, buộc di dời dân cư',
        'Đốt vẫn thải khói gây ô nhiễm',
      ],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['Hãy nghĩ tới thiết bị dùng để khai thác mỗi nguồn: tấm pin, tuabin, đập, lò đốt.'],
      solution:
        'Mặt Trời: rác thải pin. Gió: tiếng ồn, ảnh hưởng tới chim. Dòng sông: đập làm mất rừng, di dời dân cư. Sinh khối: đốt vẫn thải khói.',
    },
    {
      type: 'choice',
      prompt: 'Một tỉnh chỉ có thuỷ điện. Thời điểm nào dễ thiếu điện nhất?',
      options: [
        'Ban đêm mùa mưa',
        'Ban ngày mùa mưa',
        'Mùa khô, khi sông ít nước',
        'Ngày nhiều gió',
      ],
      answer: 2,
      hints: ['Thuỷ điện phụ thuộc vào lượng nước trong sông và hồ chứa.'],
      solution:
        'Mùa khô nước sông và hồ chứa giảm, nên thuỷ điện tạo ra ít điện hơn. Ban đêm thì hồ chứa vẫn có nước.',
    },
    {
      type: 'choice',
      prompt: 'Vùng nào sau đây phù hợp nhất để xây nhà máy điện gió?',
      options: [
        'Thung lũng kín giữa núi',
        'Vùng ven biển và ngoài khơi có gió mạnh',
        'Trung tâm thành phố đông dân',
        'Vùng rừng rậm',
      ],
      answer: 1,
      hints: ['Tuabin cần gió mạnh và ổn định, ít vật cản.'],
      solution:
        'Vùng ven biển, ngoài khơi có gió mạnh, ổn định và ít vật cản. Nhiều vùng biển nước ta có tiềm năng này.',
    },
    {
      type: 'number',
      prompt:
        'Một mái nhà lắp $8$ tấm pin Mặt Trời, mỗi tấm công suất $450$ W. Coi mỗi ngày có $4$ giờ nắng tốt. Tính điện năng tạo ra trong một ngày (theo kWh).',
      answer: 14.4,
      tolerance: 0.001,
      unit: 'kWh',
      hints: ['Tính tổng công suất rồi đổi ra kW.', 'Dùng $W = P \\cdot t$ với $t$ tính theo giờ.'],
      solution: '$P = 8 \\cdot 450 = 3\\,600$ W $= 3{,}6$ kW. $W = 3{,}6 \\cdot 4 = 14{,}4$ kWh.',
    },
    {
      type: 'number',
      prompt:
        'Có $5$ tấn nước trong hồ chứa ở độ cao $40$ m so với tuabin. Coi $90\\%$ thế năng của nước biến thành điện năng. Tính điện năng tạo ra (theo jun).',
      answer: 1800000,
      tolerance: 0.001,
      unit: 'J',
      hints: [
        'Tính thế năng $W_t = 10m \\cdot h$ với $m$ tính theo kilôgam.',
        'Lấy $90\\%$ của thế năng đó.',
      ],
      solution:
        '$W_t = 10 \\cdot 5\\,000 \\cdot 40 = 2\\,000\\,000$ J. Điện năng: $2\\,000\\,000 \\cdot 90\\% = 1\\,800\\,000$ J.',
    },
    {
      type: 'number',
      prompt:
        'Thay một bóng đèn sợi đốt $60$ W bằng một bóng đèn LED $9$ W cùng độ sáng. Mỗi ngày đèn bật $5$ giờ. Sau $30$ ngày, gia đình tiết kiệm được bao nhiêu kWh điện?',
      answer: 7.65,
      tolerance: 0.001,
      unit: 'kWh',
      hints: [
        'Công suất giảm được là $60 - 9$ W.',
        'Tính số giờ bật đèn trong $30$ ngày, rồi đổi Wh ra kWh.',
      ],
      solution:
        'Công suất giảm: $60 - 9 = 51$ W. Thời gian: $5 \\cdot 30 = 150$ giờ. Điện năng tiết kiệm: $51 \\cdot 150 = 7\\,650$ Wh $= 7{,}65$ kWh.',
    },
    {
      type: 'multi',
      prompt: 'Những việc làm nào là sử dụng hiệu quả năng lượng?',
      options: [
        'Thay đèn sợi đốt bằng đèn LED có cùng độ sáng',
        'Mở tủ lạnh thật lâu khi chọn đồ',
        'Tận dụng ánh sáng tự nhiên vào ban ngày',
        'Bật điều hoà nhưng vẫn mở cửa sổ',
        'Đi xe đạp thay xe máy trên quãng đường ngắn',
      ],
      answers: [0, 2, 4],
      hints: ['Hỏi: việc đó có làm cùng một công việc mà tốn ít năng lượng hơn không?'],
      solution:
        'Đèn LED, ánh sáng tự nhiên và đi xe đạp đều tốn ít năng lượng hơn cho cùng việc. Mở tủ lạnh lâu và mở cửa khi bật điều hoà làm tốn thêm điện.',
    },
  ],
  takeaways: [
    'Năng lượng tái tạo đến từ các nguồn liên tục được bổ sung qua các quá trình tự nhiên.',
    'Năng lượng Mặt Trời, gió, sóng biển luôn có sẵn và không thải khí nhà kính khi hoạt động, nhưng đầu tư cao, hiệu suất thấp và phụ thuộc thời tiết.',
    'Thuỷ điện có hiệu suất cao nhưng đập làm mất rừng, cản đường đi của động vật và buộc di dời dân cư; mùa khô sông ít nước.',
    'Sinh khối tận dụng phụ phẩm nhưng đốt vẫn thải khói; địa nhiệt ổn định nhưng chỉ có ở một số vùng và rất tốn kém.',
    'Không nguồn nào hoàn hảo: cần chọn theo địa hình, thời tiết và phối hợp nhiều nguồn.',
    'Sử dụng hiệu quả năng lượng là dùng ít năng lượng hơn cho cùng một công việc; điều đó cũng giúp bảo vệ môi trường.',
  ],
};
