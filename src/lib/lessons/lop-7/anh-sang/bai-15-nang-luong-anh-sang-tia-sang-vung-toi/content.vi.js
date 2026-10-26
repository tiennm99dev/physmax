/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Ánh sáng là một dạng của năng lượng, có thể chuyển hóa thành nhiệt năng, điện năng, hóa năng. Tia sáng là đường thẳng có mũi tên chỉ hướng truyền ánh sáng; có ba loại chùm sáng: song song, hội tụ, phân kì. Sau vật cản sáng có vùng tối; nguồn sáng rộng còn tạo thêm vùng nửa tối.',
  intro:
    'Tấm pin trên mái nhà biến ánh nắng thành điện, chậu nước phơi nắng ấm lên. Buổi tối, bóng bàn tay dưới ngọn đèn nhỏ có viền sắc nét, còn dưới bóng đèn ống dài thì viền bóng lại nhòe. Ánh sáng mang năng lượng gì, nó truyền đi như thế nào, và vì sao bóng tối lại có hai kiểu như vậy?',
  objectives: [
    'Nêu được ánh sáng là một dạng của năng lượng và lấy được ví dụ về sự chuyển hóa năng lượng ánh sáng.',
    'Biểu diễn được đường truyền của ánh sáng bằng tia sáng; phân biệt được chùm sáng song song, hội tụ, phân kì.',
    'Vẽ được hình biểu diễn vùng tối do nguồn sáng hẹp và vùng tối, vùng nửa tối do nguồn sáng rộng.',
    'Giải thích được một số hiện tượng như bóng nhòe, nhật thực bằng sự truyền thẳng của ánh sáng.',
  ],
  sections: [
    {
      heading: 'Ánh sáng là một dạng của năng lượng',
      blocks: [
        {
          type: 'p',
          text: 'Thí nghiệm: nối một pin quang điện (pin mặt trời) với một quạt điện nhỏ hoặc một điện kế. Khi chiếu ánh sáng đèn vào pin, cánh quạt quay (kim điện kế lệch). Tắt đèn, cánh quạt dừng lại. Pin quang điện đã nhận năng lượng ánh sáng và chuyển hóa thành điện năng.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Năng lượng ánh sáng',
          text: 'Ánh sáng là một dạng của năng lượng. Năng lượng ánh sáng có thể chuyển hóa thành các dạng năng lượng khác như nhiệt năng, điện năng, hóa năng.',
        },
        {
          type: 'table',
          caption: 'Một số ví dụ về chuyển hóa năng lượng ánh sáng',
          head: ['Thiết bị, hiện tượng', 'Năng lượng ánh sáng chuyển hóa thành'],
          rows: [
            ['Pin quang điện (pin mặt trời), máy tính cầm tay dùng pin mặt trời', 'Điện năng'],
            ['Bình nước nóng năng lượng mặt trời, phơi quần áo, phơi thóc', 'Nhiệt năng'],
            ['Cây xanh quang hợp tạo ra chất hữu cơ', 'Hóa năng (năng lượng hóa học)'],
          ],
        },
      ],
    },
    {
      heading: 'Chùm sáng và tia sáng',
      blocks: [
        {
          type: 'p',
          text: 'Trong một môi trường trong suốt và đồng tính như không khí, ánh sáng truyền đi theo đường thẳng. Nguồn sáng phát ra ánh sáng thành từng chùm sáng; hình dạng chùm sáng phụ thuộc vào nguồn sáng và các vật mà ánh sáng đi qua.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Tia sáng',
          text: 'Đường truyền của ánh sáng được biểu diễn bằng một đường thẳng có mũi tên chỉ hướng truyền, gọi là tia sáng. Trong thực tế, một chùm sáng song song rất hẹp được coi là một tia sáng.',
        },
        {
          type: 'p',
          text: 'Khi vẽ, chùm sáng được biểu diễn bằng hai tia sáng ở hai mép của chùm. Có ba loại chùm sáng:',
        },
        {
          type: 'table',
          head: ['Loại chùm sáng', 'Đặc điểm', 'Ví dụ'],
          rows: [
            [
              'Chùm sáng song song',
              'Các tia sáng không giao nhau trên đường truyền',
              'Ánh sáng Mặt Trời chiếu xuống mặt đất, chùm sáng của đèn laser',
            ],
            [
              'Chùm sáng hội tụ',
              'Các tia sáng giao nhau (gặp nhau) tại một điểm trên đường truyền',
              'Ánh nắng đi qua kính lúp chụm lại thành một điểm sáng',
            ],
            [
              'Chùm sáng phân kì',
              'Các tia sáng loe rộng ra trên đường truyền',
              'Ánh sáng phát ra từ bóng đèn pin, ngọn nến',
            ],
          ],
        },
      ],
    },
    {
      heading: 'Vùng tối và vùng nửa tối',
      blocks: [
        {
          type: 'p',
          text: 'Đặt một vật cản sáng (vật không cho ánh sáng truyền qua) giữa nguồn sáng và màn chắn. Vì ánh sáng truyền theo đường thẳng, phía sau vật cản có những chỗ ánh sáng không tới được.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Vùng tối',
          text: 'Vùng tối là vùng nằm phía sau vật cản sáng, hoàn toàn không nhận được ánh sáng từ nguồn sáng chiếu tới.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Vùng nửa tối',
          text: 'Vùng nửa tối (vùng tối không hoàn toàn) là vùng nằm phía sau vật cản sáng, chỉ nhận được ánh sáng từ một phần của nguồn sáng.',
        },
        {
          type: 'list',
          items: [
            'Nguồn sáng hẹp (bóng đèn nhỏ, đèn LED): phía sau vật cản chỉ có vùng tối. Bóng trên màn có ranh giới rõ nét. Muốn vẽ, ta kẻ hai tia sáng từ nguồn đi sát hai mép vật cản tới màn.',
            'Nguồn sáng rộng (bóng đèn lớn, đèn ống dài): phía sau vật cản có vùng tối ở giữa và vùng nửa tối bao quanh. Bóng trên màn gồm phần đen ở giữa và viền xám mờ dần ra ngoài.',
          ],
        },
        {
          type: 'p',
          text: 'Cách vẽ với nguồn sáng rộng: từ mỗi đầu của nguồn sáng, kẻ các tia sáng đi sát hai mép vật cản tới màn. Vùng mà tia sáng từ mọi điểm của nguồn đều bị chặn là vùng tối; vùng chỉ bị chặn một phần là vùng nửa tối.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Nhật thực',
          text: 'Khi Mặt Trời, Mặt Trăng, Trái Đất nằm thẳng hàng, Mặt Trăng là vật cản, che ánh sáng Mặt Trời (nguồn sáng rộng). Người đứng trong vùng tối của Mặt Trăng trên Trái Đất không nhìn thấy Mặt Trời: đó là nhật thực toàn phần. Người đứng trong vùng nửa tối chỉ nhìn thấy một phần Mặt Trời: đó là nhật thực một phần.',
        },
      ],
    },
  ],
  explore: {
    title: 'Vùng tối và vùng nửa tối trên màn chắn',
    instruction:
      'Đặt độ rộng nguồn sáng về "hẹp" rồi kéo vật cản: bóng trên màn chỉ có vùng tối. Tăng độ rộng nguồn sáng để thấy vùng nửa tối xuất hiện. Kéo điểm M trên màn và xem từ M nhìn thấy bao nhiêu phần nguồn sáng. Thử đưa vật cản lại gần màn hoặc ra xa màn.',
  },
  examples: [
    {
      problem:
        'Nêu sự chuyển hóa năng lượng ánh sáng trong ba trường hợp: tấm pin mặt trời thắp sáng đèn đường, bình nước nóng năng lượng mặt trời trên mái nhà, lá cây quang hợp.',
      steps: [
        'Tấm pin mặt trời nhận ánh sáng và tạo ra dòng điện: năng lượng ánh sáng chuyển hóa thành điện năng.',
        'Bình nước nóng hấp thụ ánh sáng, nước trong bình nóng lên: năng lượng ánh sáng chuyển hóa thành nhiệt năng.',
        'Lá cây dùng ánh sáng để tạo ra chất hữu cơ: năng lượng ánh sáng chuyển hóa thành hóa năng.',
      ],
      answer: 'Lần lượt thành điện năng, nhiệt năng và hóa năng.',
    },
    {
      problem:
        'Một bóng đèn nhỏ (coi là nguồn sáng hẹp) chiếu vào một tấm bìa tròn đường kính $10\\ \\text{cm}$ đặt song song với màn. Tấm bìa cách bóng đèn $30\\ \\text{cm}$, màn cách bóng đèn $90\\ \\text{cm}$. Tính đường kính bóng tối của tấm bìa trên màn.',
      steps: [
        'Ánh sáng truyền theo đường thẳng: hai tia sáng từ bóng đèn đi sát hai mép tấm bìa giới hạn vùng tối trên màn.',
        'Khoảng cách từ đèn tới màn gấp khoảng cách từ đèn tới tấm bìa: $\\dfrac{90}{30} = 3$ lần.',
        'Hai tia sáng loe ra đều theo khoảng cách, nên đường kính bóng tối cũng gấp $3$ lần đường kính tấm bìa: $10 \\cdot 3 = 30\\ \\text{(cm)}$.',
      ],
      answer: 'Bóng tối trên màn là hình tròn đường kính $30\\ \\text{cm}$.',
    },
    {
      problem:
        'Đặt bàn tay dưới một bóng đèn ống dài thì bóng của bàn tay trên mặt bàn có viền nhòe. Thay bằng một bóng đèn LED nhỏ thì viền bóng sắc nét. Giải thích.',
      steps: [
        'Đèn ống dài là nguồn sáng rộng: sau bàn tay có vùng tối (không nhận được ánh sáng từ cả đèn) và vùng nửa tối (nhận được ánh sáng từ một phần của đèn).',
        'Vùng nửa tối sáng dần từ phía vùng tối ra ngoài, nên ranh giới bóng bị nhòe.',
        'Đèn LED nhỏ là nguồn sáng hẹp: sau bàn tay chỉ có vùng tối, ánh sáng hoặc tới được, hoặc không, nên viền bóng sắc nét.',
      ],
      answer:
        'Nguồn sáng rộng tạo thêm vùng nửa tối làm viền bóng nhòe; nguồn sáng hẹp chỉ tạo vùng tối.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Ánh sáng là một dạng của',
      options: ['vật chất rắn.', 'năng lượng.', 'âm thanh.', 'lực.'],
      answer: 1,
      hints: ['Pin quang điện nhận ánh sáng thì làm quạt quay được.'],
      solution:
        'Ánh sáng là một dạng của năng lượng: nó có thể chuyển hóa thành điện năng, nhiệt năng, hóa năng.',
    },
    {
      type: 'multi',
      prompt:
        'Trường hợp nào sau đây có năng lượng ánh sáng chuyển hóa thành dạng năng lượng khác?',
      options: [
        'Máy tính cầm tay chạy bằng pin mặt trời',
        'Phơi thóc ngoài nắng cho khô',
        'Cây xanh quang hợp',
        'Quạt điện chạy bằng điện lưới',
        'Bếp gas đun nước',
      ],
      answers: [0, 1, 2],
      hints: ['Tìm những trường hợp cần có ánh sáng chiếu vào mới hoạt động được.'],
      solution:
        'Pin mặt trời: ánh sáng thành điện năng; phơi thóc: ánh sáng thành nhiệt năng; quang hợp: ánh sáng thành hóa năng. Quạt điện dùng điện năng, bếp gas dùng hóa năng của khí đốt, không dùng năng lượng ánh sáng.',
    },
    {
      type: 'text',
      prompt:
        'Đường thẳng có mũi tên chỉ hướng truyền ánh sáng, dùng để biểu diễn đường truyền của ánh sáng, gọi là gì?',
      accept: ['tia sáng', 'tia sang', 'một tia sáng'],
      hints: ['Một chùm sáng song song rất hẹp được coi là mô hình của nó.'],
      solution: 'Đó là tia sáng.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi loại chùm sáng với đặc điểm của nó.',
      left: ['Chùm sáng song song', 'Chùm sáng hội tụ', 'Chùm sáng phân kì'],
      right: [
        'Các tia sáng không giao nhau trên đường truyền',
        'Các tia sáng gặp nhau tại một điểm trên đường truyền',
        'Các tia sáng loe rộng ra trên đường truyền',
        'Các tia sáng bị bẻ cong thành đường tròn',
      ],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
      hints: ['"Hội tụ" nghĩa là tụ lại một chỗ; "phân kì" nghĩa là tách xa nhau ra.'],
      solution:
        'Song song: các tia không giao nhau. Hội tụ: các tia gặp nhau tại một điểm. Phân kì: các tia loe rộng ra. Trong môi trường trong suốt, đồng tính ánh sáng truyền thẳng, không bị bẻ cong.',
    },
    {
      type: 'choice',
      prompt: 'Ánh sáng phát ra từ ngọn nến tạo thành chùm sáng loại nào?',
      options: ['Chùm sáng song song', 'Chùm sáng hội tụ', 'Chùm sáng phân kì'],
      answer: 2,
      hints: ['Đi càng xa ngọn nến, vùng được chiếu sáng càng rộng hay càng hẹp?'],
      solution:
        'Ánh sáng từ ngọn nến tỏa ra mọi phía, các tia loe rộng ra: đó là chùm sáng phân kì.',
    },
    {
      type: 'choice',
      prompt: 'Vùng nửa tối là vùng nằm phía sau vật cản sáng và',
      options: [
        'hoàn toàn không nhận được ánh sáng từ nguồn sáng.',
        'nhận được ánh sáng từ một phần của nguồn sáng.',
        'nhận được ánh sáng từ toàn bộ nguồn sáng.',
        'chỉ có khi nguồn sáng là nguồn sáng hẹp.',
      ],
      answer: 1,
      hints: [
        'Từ một điểm trong vùng nửa tối nhìn về nguồn sáng, ta thấy được bao nhiêu phần nguồn?',
      ],
      solution:
        'Vùng nửa tối chỉ nhận được ánh sáng từ một phần của nguồn sáng. Nó chỉ xuất hiện khi nguồn sáng rộng; vùng hoàn toàn không nhận được ánh sáng là vùng tối.',
    },
    {
      type: 'choice',
      prompt:
        'Chiếu một bóng đèn LED rất nhỏ vào quả bóng bàn, bóng của quả bóng bàn trên tường có đặc điểm gì?',
      options: [
        'Chỉ có vùng tối, ranh giới rõ nét.',
        'Có vùng tối ở giữa và vùng nửa tối bao quanh.',
        'Chỉ có vùng nửa tối.',
        'Không có bóng vì ánh sáng đi vòng qua quả bóng.',
      ],
      answer: 0,
      hints: ['Đèn LED rất nhỏ là nguồn sáng hẹp hay rộng?'],
      solution:
        'Đèn LED nhỏ là nguồn sáng hẹp, nên phía sau quả bóng chỉ có vùng tối và bóng trên tường có ranh giới rõ nét.',
    },
    {
      type: 'number',
      prompt:
        'Một bóng đèn nhỏ chiếu vào một tấm bìa tròn đường kính $4\\ \\text{cm}$ đặt song song với màn, cách bóng đèn $20\\ \\text{cm}$. Màn cách bóng đèn $60\\ \\text{cm}$. Đường kính bóng tối trên màn là bao nhiêu xentimét?',
      answer: 12,
      unit: 'cm',
      hints: [
        'Kẻ hai tia sáng từ đèn đi sát hai mép tấm bìa tới màn.',
        'Màn xa đèn gấp $\\dfrac{60}{20}$ lần tấm bìa, nên bóng cũng lớn gấp bấy nhiêu lần.',
      ],
      solution:
        'Màn xa đèn gấp $\\dfrac{60}{20} = 3$ lần tấm bìa, nên đường kính bóng tối là $4 \\cdot 3 = 12\\ \\text{(cm)}$.',
    },
    {
      type: 'choice',
      prompt: 'Khi xảy ra nhật thực, người đứng ở đâu trên Trái Đất thì thấy nhật thực toàn phần?',
      options: [
        'Trong vùng tối của Mặt Trăng.',
        'Trong vùng nửa tối của Mặt Trăng.',
        'Ở nơi được Mặt Trời chiếu sáng hoàn toàn.',
        'Ở bất kì nơi nào là ban đêm.',
      ],
      answer: 0,
      hints: ['Nhật thực toàn phần: hoàn toàn không nhìn thấy Mặt Trời.'],
      solution:
        'Trong vùng tối của Mặt Trăng, ánh sáng từ mọi phần Mặt Trời đều bị Mặt Trăng chặn lại, nên ta không nhìn thấy Mặt Trời: đó là nhật thực toàn phần. Trong vùng nửa tối thì thấy nhật thực một phần.',
    },
  ],
  takeaways: [
    'Ánh sáng là một dạng của năng lượng, có thể chuyển hóa thành điện năng, nhiệt năng, hóa năng.',
    'Tia sáng là đường thẳng có mũi tên chỉ hướng truyền ánh sáng. Có ba loại chùm sáng: song song, hội tụ, phân kì.',
    'Vùng tối không nhận được ánh sáng từ nguồn; vùng nửa tối nhận được ánh sáng từ một phần nguồn.',
    'Nguồn sáng hẹp chỉ tạo vùng tối, bóng rõ nét; nguồn sáng rộng tạo vùng tối và vùng nửa tối, bóng có viền nhòe.',
  ],
};
