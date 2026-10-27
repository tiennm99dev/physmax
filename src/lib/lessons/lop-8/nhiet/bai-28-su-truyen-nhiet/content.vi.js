/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Năng lượng nhiệt truyền từ vật nóng hơn sang vật lạnh hơn bằng ba hình thức. Dẫn nhiệt: truyền từ phần này sang phần khác của vật, từ vật này sang vật khác khi tiếp xúc; kim loại dẫn nhiệt tốt, chất lỏng và chất khí dẫn nhiệt kém. Đối lưu: truyền nhờ dòng chất lỏng hoặc chất khí. Bức xạ nhiệt: truyền bằng các tia nhiệt đi thẳng, kể cả trong chân không. Hiệu ứng nhà kính là ứng dụng của bức xạ nhiệt.',
  intro:
    'Cầm thìa kim loại khuấy cốc trà nóng, một lúc sau cán thìa nóng lên. Ngồi cạnh lò sưởi, ta thấy ấm dù không chạm vào lò. Mặt Trời ở rất xa, giữa Mặt Trời và Trái Đất gần như là chân không, vậy mà năng lượng nhiệt của Mặt Trời vẫn tới được Trái Đất. Năng lượng nhiệt truyền đi bằng những cách nào?',
  objectives: [
    'Nêu được năng lượng nhiệt truyền từ vật nóng hơn sang vật lạnh hơn.',
    'Lấy được ví dụ về hiện tượng dẫn nhiệt, đối lưu, bức xạ nhiệt và mô tả sơ lược sự truyền năng lượng trong mỗi hiện tượng.',
    'Phân tích được ví dụ về công dụng của vật dẫn nhiệt tốt, vật cách nhiệt tốt.',
    'Giải thích được một số hiện tượng thường gặp: mặc áo màu trắng vào mùa hè, phích giữ nước nóng, hiệu ứng nhà kính.',
  ],
  sections: [
    {
      heading: 'Dẫn nhiệt',
      blocks: [
        {
          type: 'p',
          text: 'Năng lượng nhiệt luôn được truyền từ vật (hoặc phần) nóng hơn sang vật (hoặc phần) lạnh hơn. Năng lượng nhiệt có thể truyền trong chất rắn, chất lỏng, chất khí và cả trong chân không, theo ba hình thức: dẫn nhiệt, đối lưu và bức xạ nhiệt.',
        },
        {
          type: 'p',
          text: 'Thí nghiệm: một thanh đồng $AB$ mắc trên giá, dưới thanh gắn các đinh nhỏ bằng sáp ở những khoảng cách đều nhau. Đốt nóng đầu $A$ bằng đèn cồn. Các đinh lần lượt rơi xuống, bắt đầu từ đinh gần đầu $A$ nhất rồi đến các đinh xa hơn.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Dẫn nhiệt',
          text: 'Dẫn nhiệt là sự truyền năng lượng nhiệt từ phần này sang phần khác của một vật, hoặc từ vật này sang vật khác khi chúng tiếp xúc nhau. Các hạt (phân tử, nguyên tử) ở phần nóng chuyển động mạnh, va chạm và truyền một phần động năng cho các hạt bên cạnh.',
        },
        {
          type: 'table',
          caption: 'Vật dẫn nhiệt tốt và vật dẫn nhiệt kém',
          head: ['Loại', 'Ví dụ', 'Công dụng'],
          rows: [
            [
              'Dẫn nhiệt tốt',
              'Kim loại: đồng, nhôm, sắt, bạc',
              'Làm nồi, xoong, ấm đun nước, đáy bàn là, tấm tản nhiệt',
            ],
            [
              'Dẫn nhiệt kém (cách nhiệt tốt)',
              'Gỗ, nhựa, cao su, sứ, thủy tinh, bông, len, không khí, chất lỏng',
              'Làm tay cầm nồi, lót nồi, áo ấm, vỏ hộp giữ nhiệt, lớp cách nhiệt tường nhà',
            ],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Chất lỏng và chất khí dẫn nhiệt kém',
          text: 'Chất rắn dẫn nhiệt tốt hơn chất lỏng và chất khí. Không khí dẫn nhiệt rất kém, vì vậy áo bông, chăn bông, lông thú (giữ nhiều lớp không khí) giữ ấm tốt; mặc nhiều áo mỏng ấm hơn một áo dày vì giữa các lớp áo có không khí.',
        },
      ],
    },
    {
      heading: 'Đối lưu',
      blocks: [
        {
          type: 'p',
          text: 'Thí nghiệm: hai ống nghiệm đựng nước. Ống (1) gắn viên sáp ở đáy, đun nóng ở gần miệng ống: nước ở miệng ống sôi mà viên sáp ở đáy vẫn không chảy. Ống (2) gắn viên sáp ở miệng, đun nóng ở đáy ống: viên sáp ở miệng ống chảy ra nhanh. Rắc vài hạt thuốc tím vào cốc nước rồi đun ở đáy, ta thấy các dòng nước màu tím đi từ đáy lên rồi từ trên xuống.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Đối lưu',
          text: 'Đối lưu là sự truyền năng lượng nhiệt nhờ các dòng chất lỏng hoặc chất khí. Đối lưu là hình thức truyền nhiệt chủ yếu của chất lỏng và chất khí.',
        },
        {
          type: 'p',
          text: 'Giải thích: lớp nước ở dưới nóng lên trước, nở ra, khối lượng riêng giảm nên nổi lên; lớp nước lạnh ở trên có khối lượng riêng lớn hơn chìm xuống thế chỗ. Cứ thế tạo thành dòng đối lưu làm nóng cả ống. Khi đun ở miệng ống, nước nóng nhẹ hơn vẫn ở trên, không có dòng đối lưu, còn nước lại dẫn nhiệt kém nên đáy ống hầu như không nóng lên.',
        },
        {
          type: 'list',
          items: [
            'Đun nước, phải đặt ấm, nồi lên trên ngọn lửa (đun từ dưới lên).',
            'Đốt nến dưới một chong chóng giấy: không khí nóng bốc lên tạo dòng đối lưu làm chong chóng quay.',
            'Điều hòa thường lắp trên cao: không khí lạnh nặng hơn đi xuống, không khí nóng nhẹ hơn đi lên, nhờ đó cả phòng mát đều.',
            'Gió biển, gió đất; ống khói nhà máy cao để tạo dòng đối lưu hút khói lên.',
          ],
        },
      ],
    },
    {
      heading: 'Bức xạ nhiệt',
      blocks: [
        {
          type: 'p',
          text: 'Thí nghiệm: một bình thủy tinh phủ đen, bên trong có nhiệt kế, đặt gần một ngọn đèn (nguồn nhiệt). Bật đèn, nhiệt kế chỉ nhiệt độ tăng dần. Đặt tấm gỗ chắn giữa đèn và bình, nhiệt độ không tăng nữa. Năng lượng nhiệt từ đèn tới bình không nhờ dẫn nhiệt (không khí dẫn nhiệt kém) cũng không nhờ đối lưu (không khí nóng đi lên, không đi ngang).',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Bức xạ nhiệt',
          text: 'Bức xạ nhiệt là sự truyền năng lượng nhiệt bằng các tia nhiệt đi thẳng. Bức xạ nhiệt có thể xảy ra cả trong chân không: năng lượng nhiệt của Mặt Trời truyền tới Trái Đất bằng bức xạ nhiệt.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Hấp thụ tia nhiệt',
          text: 'Vật có bề mặt càng sẫm màu và càng xù xì thì hấp thụ tia nhiệt càng nhiều. Vật có bề mặt sáng màu, nhẵn bóng hấp thụ ít và phản xạ nhiều tia nhiệt.',
        },
        {
          type: 'list',
          items: [
            'Mùa hè nên mặc áo màu trắng hoặc sáng màu để hấp thụ ít tia nhiệt của Mặt Trời; mùa đông nên mặc áo sẫm màu.',
            'Phích (bình thủy) có hai lớp thủy tinh, giữa là chân không để ngăn dẫn nhiệt và đối lưu; mặt trong tráng bạc để phản xạ tia nhiệt trở lại nước; nút đậy kín ngăn đối lưu ra ngoài.',
            'Mái nhà, bồn chứa nước, xe chở xăng dầu thường sơn màu sáng, bóng để ít hấp thụ tia nhiệt.',
          ],
        },
      ],
    },
    {
      heading: 'Hiệu ứng nhà kính',
      blocks: [
        {
          type: 'p',
          text: 'Thí nghiệm: đặt hai cốc nước giống nhau dưới ánh nắng, một cốc đặt trong lồng kính, một cốc ở ngoài. Sau một thời gian, nước trong cốc đặt trong lồng kính nóng hơn.',
        },
        {
          type: 'p',
          text: 'Bức xạ của Mặt Trời đi qua tấm kính vào bên trong, làm nóng các vật trong lồng. Các vật này phát ra bức xạ nhiệt yếu hơn, phần lớn không đi qua được tấm kính để ra ngoài, nên năng lượng nhiệt bị giữ lại, bên trong nóng dần lên. Hiện tượng này gọi là hiệu ứng nhà kính.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Hiệu ứng nhà kính của Trái Đất',
          text: 'Các khí như carbon dioxide, hơi nước, methane trong khí quyển đóng vai trò như tấm kính, giữ lại năng lượng nhiệt, giúp Trái Đất đủ ấm cho sự sống. Nhưng khi lượng các khí này tăng lên quá nhiều (do đốt nhiên liệu, phá rừng), Trái Đất nóng lên, gây biến đổi khí hậu. Cần tiết kiệm năng lượng, trồng cây xanh, sử dụng năng lượng sạch.',
        },
        {
          type: 'p',
          text: 'Người ta vận dụng hiệu ứng nhà kính để trồng rau, hoa trong nhà kính vào mùa lạnh.',
        },
      ],
    },
  ],
  explore: {
    title: 'Ba cách truyền nhiệt',
    instruction:
      'Chọn một thí nghiệm. Dẫn nhiệt: đốt đầu $A$ của thanh và xem thứ tự các đinh rơi, đổi vật liệu để so sánh. Đối lưu: đun ống nghiệm ở đáy rồi ở miệng ống, quan sát hạt thuốc tím và hai viên sáp. Bức xạ nhiệt: bật đèn sưởi, so sánh bình đen với bình trắng, thử đặt tấm gỗ chắn và đổi khoảng cách.',
  },
  examples: [
    {
      problem:
        'Đứng gần một bếp lửa, ta cảm thấy nóng. Năng lượng nhiệt mà cơ thể nhận được từ bếp chủ yếu là do dẫn nhiệt, đối lưu hay bức xạ nhiệt? Vì sao?',
      steps: [
        'Không khí giữa bếp và người dẫn nhiệt rất kém, nên dẫn nhiệt không đáng kể.',
        'Không khí nóng quanh bếp nhẹ hơn nên bốc lên trên, dòng đối lưu đi lên chứ không đi ngang tới người đứng cạnh bếp.',
        'Năng lượng nhiệt truyền từ bếp tới người theo các tia nhiệt đi thẳng.',
      ],
      answer: 'Chủ yếu do bức xạ nhiệt.',
    },
    {
      problem:
        'Vì sao xoong, nồi thường làm bằng kim loại, còn tay cầm của chúng làm bằng gỗ hoặc nhựa?',
      steps: [
        'Kim loại dẫn nhiệt tốt, nên năng lượng nhiệt từ bếp truyền nhanh qua đáy nồi vào thức ăn, nấu nhanh chín, tiết kiệm nhiên liệu.',
        'Gỗ, nhựa dẫn nhiệt kém, nên năng lượng nhiệt từ thân nồi truyền rất chậm tới tay cầm, cầm vào không bị bỏng.',
      ],
      answer:
        'Thân nồi bằng kim loại để dẫn nhiệt tốt; tay cầm bằng gỗ, nhựa để cách nhiệt, không bị bỏng.',
    },
    {
      problem:
        'Phích giữ nước nóng có hai lớp thủy tinh, giữa hai lớp là chân không, mặt trong tráng bạc, nút đậy kín. Mỗi bộ phận ngăn hình thức truyền nhiệt nào?',
      steps: [
        'Lớp chân không giữa hai lớp thủy tinh: không có hạt vật chất nên không có dẫn nhiệt và đối lưu qua lớp này.',
        'Mặt tráng bạc sáng bóng phản xạ các tia nhiệt trở lại nước, hạn chế bức xạ nhiệt ra ngoài.',
        'Nút đậy kín ngăn không khí nóng đi ra ngoài theo dòng đối lưu ở miệng phích (và nút làm bằng chất dẫn nhiệt kém).',
      ],
      answer:
        'Chân không ngăn dẫn nhiệt và đối lưu; lớp bạc hạn chế bức xạ nhiệt; nút đậy ngăn đối lưu ở miệng phích.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Năng lượng nhiệt tự truyền',
      options: [
        'từ vật lạnh hơn sang vật nóng hơn',
        'từ vật nóng hơn sang vật lạnh hơn',
        'từ vật lớn hơn sang vật nhỏ hơn',
        'từ vật nặng hơn sang vật nhẹ hơn',
      ],
      answer: 1,
      hints: ['Thả thìa lạnh vào cốc trà nóng, vật nào nóng lên?'],
      solution: 'Năng lượng nhiệt truyền từ vật nóng hơn sang vật lạnh hơn.',
    },
    {
      type: 'match',
      prompt: 'Ghép mỗi hiện tượng với hình thức truyền nhiệt chủ yếu.',
      left: [
        'Cán thìa kim loại nóng lên khi khuấy trà nóng',
        'Nước trong nồi đặt trên bếp nóng lên đều',
        'Năng lượng của Mặt Trời tới Trái Đất',
      ],
      right: ['Dẫn nhiệt', 'Đối lưu', 'Bức xạ nhiệt'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
      hints: [
        'Dẫn nhiệt xảy ra chủ yếu trong chất rắn; đối lưu cần dòng chất lỏng hoặc chất khí.',
        'Hình thức nào truyền được qua chân không?',
      ],
      solution:
        'Cán thìa: dẫn nhiệt. Nước trong nồi: đối lưu. Mặt Trời tới Trái Đất qua khoảng chân không: bức xạ nhiệt.',
    },
    {
      type: 'choice',
      prompt: 'Hình thức truyền nhiệt nào có thể xảy ra trong chân không?',
      options: ['Dẫn nhiệt', 'Đối lưu', 'Bức xạ nhiệt', 'Cả ba hình thức'],
      answer: 2,
      hints: ['Dẫn nhiệt và đối lưu đều cần các hạt vật chất.'],
      solution:
        'Dẫn nhiệt cần va chạm giữa các hạt, đối lưu cần dòng chất lỏng hoặc chất khí; chân không không có hạt vật chất. Chỉ bức xạ nhiệt xảy ra được trong chân không.',
    },
    {
      type: 'multi',
      prompt: 'Chọn tất cả các vật dẫn nhiệt kém (cách nhiệt tốt).',
      options: ['Đồng', 'Gỗ khô', 'Nhôm', 'Không khí', 'Nhựa', 'Bạc'],
      answers: [1, 3, 4],
      hints: ['Kim loại dẫn nhiệt tốt.'],
      solution:
        'Đồng, nhôm, bạc là kim loại, dẫn nhiệt tốt. Gỗ khô, không khí, nhựa dẫn nhiệt kém.',
    },
    {
      type: 'choice',
      prompt: 'Vì sao mùa hè người ta thường mặc áo màu trắng, ít mặc áo màu đen?',
      options: [
        'Áo trắng dẫn nhiệt tốt hơn',
        'Áo trắng hấp thụ ít tia nhiệt của Mặt Trời hơn áo đen',
        'Áo trắng tạo dòng đối lưu',
        'Áo đen nặng hơn áo trắng',
      ],
      answer: 1,
      hints: ['Màu sắc của bề mặt ảnh hưởng tới sự hấp thụ tia nhiệt.'],
      solution:
        'Vật có bề mặt sáng màu hấp thụ ít tia nhiệt, vật sẫm màu hấp thụ nhiều. Mặc áo trắng thì ít hấp thụ tia nhiệt của Mặt Trời nên đỡ nóng.',
    },
    {
      type: 'choice',
      prompt:
        'Đun nước trong ống nghiệm ở gần miệng ống, viên sáp gắn ở đáy ống không chảy dù nước ở miệng ống đã sôi. Nguyên nhân là',
      options: [
        'nước dẫn nhiệt kém và nước nóng ở trên không đi xuống được nên không có dòng đối lưu xuống đáy',
        'thủy tinh dẫn nhiệt quá tốt',
        'sáp không bao giờ chảy trong nước',
        'bức xạ nhiệt không đi qua được nước',
      ],
      answer: 0,
      hints: ['Nước nóng nhẹ hơn hay nặng hơn nước lạnh?', 'Nước là chất dẫn nhiệt tốt hay kém?'],
      solution:
        'Nước nóng ở miệng ống nhẹ hơn nên vẫn ở trên, không tạo được dòng đối lưu xuống đáy; nước lại dẫn nhiệt kém, nên đáy ống hầu như không nóng và viên sáp không chảy.',
    },
    {
      type: 'choice',
      prompt: 'Muốn làm mát cả phòng nhanh nhất, nên lắp máy điều hòa ở đâu?',
      options: [
        'Sát sàn nhà',
        'Ở trên cao, gần trần nhà',
        'Ở giữa phòng, ngang bàn',
        'Ở đâu cũng như nhau',
      ],
      answer: 1,
      hints: ['Không khí lạnh nặng hơn hay nhẹ hơn không khí nóng?'],
      solution:
        'Không khí lạnh từ điều hòa nặng hơn nên đi xuống, không khí nóng nhẹ hơn đi lên tới máy, tạo dòng đối lưu làm mát cả phòng. Vì vậy điều hòa nên lắp trên cao.',
    },
    {
      type: 'choice',
      prompt:
        'Đặt hai cốc nước giống nhau dưới nắng, một cốc trong lồng kính, một cốc ngoài trời. Cốc trong lồng kính nóng hơn vì',
      options: [
        'kính dẫn nhiệt tốt',
        'bức xạ Mặt Trời đi qua kính vào trong, còn bức xạ nhiệt của các vật bên trong khó đi ra ngoài',
        'không khí trong lồng kính đối lưu mạnh hơn ngoài trời',
        'kính tự sinh ra năng lượng nhiệt',
      ],
      answer: 1,
      hints: ['Đây là hiệu ứng nhà kính.'],
      solution:
        'Bức xạ của Mặt Trời đi qua kính làm nóng các vật bên trong; bức xạ nhiệt yếu hơn của các vật này phần lớn bị kính giữ lại, nên năng lượng nhiệt tích tụ trong lồng kính: đó là hiệu ứng nhà kính.',
    },
    {
      type: 'multi',
      prompt: 'Việc làm nào giúp giảm tác hại của hiệu ứng nhà kính đối với Trái Đất?',
      options: [
        'Trồng nhiều cây xanh',
        'Tắt các thiết bị điện khi không dùng',
        'Đốt rơm rạ, rác thải ngoài trời',
        'Đi xe đạp, đi bộ hoặc dùng phương tiện công cộng',
        'Phá rừng để mở rộng đất canh tác',
      ],
      answers: [0, 1, 3],
      hints: ['Việc nào làm giảm lượng khí carbon dioxide thải vào khí quyển?'],
      solution:
        'Trồng cây xanh hấp thụ carbon dioxide; tiết kiệm điện và đi xe đạp, phương tiện công cộng giảm đốt nhiên liệu. Đốt rơm rạ, phá rừng làm tăng khí nhà kính.',
    },
  ],
  takeaways: [
    'Năng lượng nhiệt truyền từ vật nóng hơn sang vật lạnh hơn, bằng ba hình thức: dẫn nhiệt, đối lưu, bức xạ nhiệt.',
    'Dẫn nhiệt: truyền từ phần này sang phần khác của vật, từ vật này sang vật khác khi tiếp xúc; kim loại dẫn nhiệt tốt; gỗ, nhựa, chất lỏng, chất khí dẫn nhiệt kém.',
    'Đối lưu: truyền nhờ dòng chất lỏng hoặc chất khí; là hình thức truyền nhiệt chủ yếu của chất lỏng và chất khí.',
    'Bức xạ nhiệt: truyền bằng tia nhiệt đi thẳng, xảy ra cả trong chân không; bề mặt sẫm màu, xù xì hấp thụ tia nhiệt nhiều.',
    'Hiệu ứng nhà kính giữ năng lượng nhiệt lại bên trong; khí nhà kính tăng quá mức làm Trái Đất nóng lên.',
  ],
};
