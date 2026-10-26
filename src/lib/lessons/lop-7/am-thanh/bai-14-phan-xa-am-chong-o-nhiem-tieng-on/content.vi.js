/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Âm gặp mặt chắn bị phản xạ; âm phản xạ đến tai chậm hơn âm trực tiếp ít nhất 1/15 s thì nghe thành tiếng vang. Vật cứng, nhẵn phản xạ âm tốt; vật mềm, xốp, gồ ghề phản xạ âm kém. Chống ô nhiễm tiếng ồn bằng cách giảm độ to của nguồn âm, phân tán âm và ngăn chặn đường truyền âm.',
  intro:
    'Đứng trong hang động hay trước vách núi rồi gọi to, em nghe thấy tiếng mình vọng lại. Nhưng nói trong phòng học thì không nghe thấy tiếng vọng nào. Vì sao vậy? Và những nhà ở sát đường lớn phải làm gì để bớt tiếng ồn của xe cộ?',
  objectives: [
    'Lấy được ví dụ về phản xạ âm, tiếng vang; giải thích được khi nào nghe được tiếng vang.',
    'Phân biệt được vật phản xạ âm tốt và vật phản xạ âm kém.',
    'Vận dụng được sự truyền và phản xạ âm để tính khoảng cách ($s = v \\cdot t$).',
    'Nêu được ô nhiễm tiếng ồn là gì và đề xuất được phương án đơn giản để hạn chế tiếng ồn ảnh hưởng đến sức khỏe.',
  ],
  sections: [
    {
      heading: 'Phản xạ âm và tiếng vang',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Phản xạ âm',
          text: 'Âm gặp một mặt chắn thì bị dội ngược trở lại. Âm dội lại khi gặp mặt chắn gọi là âm phản xạ. Mọi vật đều phản xạ âm, ít hoặc nhiều.',
        },
        {
          type: 'list',
          items: [
            'Nói to vào miệng một cái giếng sâu, ta nghe thấy tiếng mình vọng lên từ giếng.',
            'Gọi to trong hang động hoặc trước vách núi, ta nghe thấy tiếng vọng lại.',
            'Nói trong một phòng lớn, trống trải, âm nghe ồm ồm và kéo dài hơn khi nói ngoài trời.',
          ],
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Tiếng vang',
          text: 'Ta nghe thấy tiếng vang khi âm phản xạ đến tai chậm hơn âm phát ra (âm truyền trực tiếp) ít nhất $\\dfrac{1}{15}$ giây.',
        },
        {
          type: 'p',
          text: 'Khi đứng cách mặt chắn một khoảng $d$, âm phải đi tới mặt chắn rồi quay về, tổng quãng đường là $2d$. Thời gian âm phản xạ đến tai chậm hơn âm trực tiếp là',
        },
        { type: 'tex', tex: 't = \\frac{2d}{v}' },
        {
          type: 'p',
          text: 'Với $v = 340\\ \\text{m/s}$ trong không khí, điều kiện $t \\ge \\dfrac{1}{15}\\ \\text{s}$ cho $2d \\ge \\dfrac{340}{15} \\approx 22{,}7\\ \\text{m}$, tức mặt chắn phải cách người nói ít nhất khoảng $11{,}3\\ \\text{m}$. Trong phòng nhỏ, âm phản xạ tới tai gần như cùng lúc với âm trực tiếp nên không nghe thành tiếng vang riêng mà chỉ làm âm nghe to hơn.',
        },
        {
          type: 'p',
          text: 'Ứng dụng: tàu thuyền phát siêu âm xuống đáy biển và đo thời gian nhận được âm phản xạ để tính độ sâu của biển; dơi phát siêu âm và nghe âm phản xạ để định hướng, tìm mồi.',
        },
      ],
    },
    {
      heading: 'Vật phản xạ âm tốt và vật phản xạ âm kém',
      blocks: [
        {
          type: 'table',
          caption: 'Vật phản xạ âm tốt và vật phản xạ âm kém',
          head: ['Tiêu chí', 'Vật phản xạ âm tốt', 'Vật phản xạ âm kém'],
          rows: [
            ['Đặc điểm', 'Cứng, có bề mặt nhẵn', 'Mềm, xốp, có bề mặt gồ ghề (hấp thụ âm tốt)'],
            [
              'Ví dụ',
              'Mặt gương, mặt đá hoa, tấm kim loại, tường gạch trát phẳng',
              'Rèm nhung, thảm, tấm xốp, áo len, cao su xốp',
            ],
          ],
        },
        {
          type: 'p',
          text: 'Vật phản xạ âm kém hấp thụ phần lớn âm truyền tới nó. Vì vậy trong rạp hát, phòng hòa nhạc, phòng thu âm, người ta làm tường sần sùi, treo rèm nhung, lót thảm và ốp vật liệu xốp để giảm tiếng vang, giúp âm nghe rõ hơn.',
        },
      ],
    },
    {
      heading: 'Chống ô nhiễm tiếng ồn',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Ô nhiễm tiếng ồn',
          text: 'Tiếng ồn trong môi trường bị coi là ô nhiễm khi nó to, kéo dài, gây ảnh hưởng xấu đến sức khỏe và hoạt động bình thường của con người.',
        },
        {
          type: 'p',
          text: 'Ví dụ: tiếng xe cộ trên đường phố đông đúc, tiếng máy khoan bê tông ở công trường, tiếng loa phát quá to. Tiếng ồn kéo dài gây mệt mỏi, mất ngủ, giảm khả năng tập trung và có thể làm giảm thính lực.',
        },
        {
          type: 'p',
          text: 'Để chống ô nhiễm tiếng ồn, ta làm giảm độ to của tiếng ồn phát ra, ngăn chặn hoặc làm phân tán âm trên đường truyền, làm âm truyền tới tai nhỏ đi:',
        },
        {
          type: 'table',
          caption: 'Các biện pháp chống ô nhiễm tiếng ồn',
          head: ['Cách làm', 'Ví dụ'],
          rows: [
            [
              'Tác động vào nguồn âm (giảm độ to)',
              'Treo biển cấm bóp còi gần bệnh viện, trường học; hạn chế xe cá nhân, khuyến khích đi xe buýt; biển "Đi nhẹ, nói khẽ"',
            ],
            ['Phân tán âm trên đường truyền', 'Trồng nhiều cây xanh quanh nhà và dọc đường'],
            [
              'Ngăn chặn đường truyền âm',
              'Xây tường chắn âm giữa khu dân cư và đường cao tốc; đóng cửa, lắp cửa kính hai lớp; dùng vật liệu cách âm, rèm dày',
            ],
          ],
        },
        { type: 'widget', name: 'noise-barrier' },
      ],
    },
  ],
  explore: {
    title: 'Tiếng vang trong căn phòng',
    instruction:
      'Chọn vật liệu phủ bức tường và đặt khoảng cách từ người đến tường, rồi nhấn "Vỗ tay". Quan sát trên trục thời gian: âm phản xạ (cột đỏ) đến sau âm trực tiếp bao lâu và mạnh hay yếu. Tìm khoảng cách nhỏ nhất để nghe được tiếng vang với tường kính, rồi đổi sang rèm nhung hay tấm xốp.',
  },
  examples: [
    {
      problem:
        'Một bạn đứng cách một vách đá $34\\ \\text{m}$ và hét to. Bạn đó có nghe được tiếng vang không? Biết tốc độ truyền âm trong không khí là $340\\ \\text{m/s}$.',
      steps: [
        'Âm đi tới vách đá rồi quay lại tai: quãng đường $s = 2 \\cdot 34 = 68\\ \\text{(m)}$.',
        'Thời gian âm phản xạ đến tai chậm hơn âm trực tiếp: $t = \\dfrac{s}{v} = \\dfrac{68}{340} = 0{,}2\\ \\text{(s)}$.',
        'So sánh: $\\dfrac{1}{15}\\ \\text{s} \\approx 0{,}067\\ \\text{s}$, mà $0{,}2\\ \\text{s} > 0{,}067\\ \\text{s}$.',
      ],
      answer: 'Bạn đó nghe được tiếng vang (âm phản xạ đến chậm hơn $0{,}2\\ \\text{s}$).',
    },
    {
      problem:
        'Một tàu phát siêu âm thẳng xuống đáy biển, sau $1{,}2\\ \\text{s}$ thì nhận được âm phản xạ. Tốc độ truyền âm trong nước biển là $1\\,500\\ \\text{m/s}$. Tính độ sâu của biển ở chỗ đó.',
      steps: [
        'Trong $1{,}2\\ \\text{s}$, âm đi từ tàu xuống đáy biển rồi quay lại tàu.',
        'Quãng đường âm đi được: $s = v \\cdot t = 1\\,500 \\cdot 1{,}2 = 1\\,800\\ \\text{(m)}$.',
        'Độ sâu bằng một nửa quãng đường đó: $h = \\dfrac{1\\,800}{2} = 900\\ \\text{(m)}$.',
      ],
      answer: 'Biển sâu $900\\ \\text{m}$ ở chỗ đó.',
    },
    {
      problem:
        'Một trường học ở ngay cạnh một khu chợ ồn ào. Hãy đề xuất ba biện pháp giảm tiếng ồn cho các lớp học, mỗi biện pháp thuộc một cách làm khác nhau.',
      steps: [
        'Tác động vào nguồn âm: đề nghị chợ không dùng loa phát to trong giờ học.',
        'Phân tán âm trên đường truyền: trồng hàng cây xanh giữa chợ và trường.',
        'Ngăn chặn đường truyền âm: xây tường rào cao, đóng cửa và lắp cửa kính phía giáp chợ, treo rèm dày.',
      ],
      answer:
        'Ví dụ: hạn chế loa của chợ, trồng cây xanh, xây tường và lắp cửa kính, rèm dày cho lớp học.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Âm phản xạ là',
      options: [
        'âm truyền qua được mặt chắn.',
        'âm dội lại khi gặp mặt chắn.',
        'âm có tần số lớn hơn $20\\,000\\ \\text{Hz}$.',
        'âm phát ra từ nguồn âm đang dao động mạnh.',
      ],
      answer: 1,
      hints: ['"Phản xạ" nghĩa là bị hắt, dội trở lại.'],
      solution: 'Âm dội lại khi gặp một mặt chắn gọi là âm phản xạ.',
    },
    {
      type: 'multi',
      prompt: 'Những vật nào sau đây phản xạ âm tốt?',
      options: ['Mặt gương', 'Rèm nhung', 'Tấm kim loại phẳng', 'Tấm xốp', 'Mặt đá hoa', 'Áo len'],
      answers: [0, 2, 4],
      hints: ['Vật phản xạ âm tốt là vật cứng, có bề mặt nhẵn.'],
      solution:
        'Mặt gương, tấm kim loại phẳng, mặt đá hoa cứng và nhẵn nên phản xạ âm tốt. Rèm nhung, tấm xốp, áo len mềm, xốp nên phản xạ âm kém.',
    },
    {
      type: 'number',
      prompt:
        'Một người đứng cách vách núi $51\\ \\text{m}$ và gọi to. Sau bao nhiêu giây người đó nghe thấy tiếng vang? Lấy tốc độ truyền âm trong không khí là $340\\ \\text{m/s}$.',
      answer: 0.3,
      tolerance: 0.001,
      unit: 's',
      hints: ['Âm đi tới vách núi rồi quay lại: quãng đường gấp đôi khoảng cách.'],
      solution:
        '$t = \\dfrac{2d}{v} = \\dfrac{2 \\cdot 51}{340} = \\dfrac{102}{340} = 0{,}3\\ \\text{(s)}$.',
    },
    {
      type: 'number',
      prompt:
        'Một tàu phát siêu âm xuống đáy biển và nhận được âm phản xạ sau $2\\ \\text{s}$. Tốc độ truyền âm trong nước biển là $1\\,500\\ \\text{m/s}$. Biển sâu bao nhiêu mét?',
      answer: 1500,
      unit: 'm',
      hints: [
        'Tính quãng đường âm đi được trong $2\\ \\text{s}$.',
        'Âm đi xuống rồi đi lên, nên độ sâu chỉ bằng một nửa quãng đường đó.',
      ],
      solution:
        '$s = v \\cdot t = 1\\,500 \\cdot 2 = 3\\,000\\ \\text{(m)}$; độ sâu $h = \\dfrac{3\\,000}{2} = 1\\,500\\ \\text{(m)}$.',
    },
    {
      type: 'number',
      prompt:
        'Muốn nghe được tiếng vang của chính mình trong không khí ($v = 340\\ \\text{m/s}$), người nói phải đứng cách mặt chắn ít nhất bao nhiêu mét? (làm tròn đến hàng phần mười)',
      answer: 11.3,
      tolerance: 0.05,
      unit: 'm',
      hints: [
        'Âm phản xạ phải đến chậm hơn ít nhất $\\dfrac{1}{15}\\ \\text{s}$.',
        'Quãng đường đi và về là $2d = 340 \\cdot \\dfrac{1}{15}$.',
      ],
      solution:
        '$2d = 340 \\cdot \\dfrac{1}{15} \\approx 22{,}67\\ \\text{(m)}$, nên $d \\approx 11{,}3\\ \\text{m}$.',
    },
    {
      type: 'choice',
      prompt: 'Vì sao khi nói trong phòng học nhỏ, ta không nghe thấy tiếng vang?',
      options: [
        'Vì tường phòng học không phản xạ âm.',
        'Vì âm không truyền được trong phòng kín.',
        'Vì âm phản xạ đến tai gần như cùng lúc với âm trực tiếp, chậm hơn chưa tới $\\dfrac{1}{15}\\ \\text{s}$.',
        'Vì âm phản xạ có tần số quá lớn.',
      ],
      answer: 2,
      hints: ['Tường cách người nói chỉ vài mét. Tính thử thời gian âm đi và về.'],
      solution:
        'Tường gần nên âm phản xạ đến tai chậm hơn âm trực tiếp chưa tới $\\dfrac{1}{15}\\ \\text{s}$: nó hòa vào âm trực tiếp, làm âm to hơn chứ không thành tiếng vang riêng.',
    },
    {
      type: 'choice',
      prompt:
        'Trong phòng hòa nhạc, người ta làm tường sần sùi và treo rèm nhung. Mục đích chính là gì?',
      options: [
        'Để trang trí cho đẹp.',
        'Để hấp thụ âm, giảm tiếng vang giúp nghe rõ hơn.',
        'Để âm phản xạ mạnh hơn.',
        'Để tăng tần số của âm.',
      ],
      answer: 1,
      hints: ['Bề mặt mềm, gồ ghề phản xạ âm tốt hay kém?'],
      solution:
        'Tường sần sùi, rèm nhung là vật phản xạ âm kém, hấp thụ âm tốt; chúng làm giảm tiếng vang nên âm nghe rõ hơn.',
    },
    {
      type: 'choice',
      prompt: 'Trường hợp nào sau đây là ô nhiễm tiếng ồn?',
      options: [
        'Tiếng chim hót buổi sáng trong công viên.',
        'Tiếng máy khoan bê tông cả ngày cạnh khu nhà ở.',
        'Tiếng trống trường báo giờ vào lớp.',
        'Tiếng nói chuyện nhỏ trong thư viện.',
      ],
      answer: 1,
      hints: ['Tiếng ồn gây ô nhiễm là âm to, kéo dài, ảnh hưởng đến sức khỏe và sinh hoạt.'],
      solution:
        'Tiếng máy khoan to, kéo dài cả ngày, ảnh hưởng đến sức khỏe và sinh hoạt của người dân: đó là ô nhiễm tiếng ồn. Các âm còn lại nhỏ hoặc ngắn.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi biện pháp chống ồn với cách nó làm giảm tiếng ồn.',
      left: [
        'Treo biển cấm bóp còi gần bệnh viện',
        'Trồng nhiều cây xanh quanh nhà',
        'Xây tường cách âm giữa nhà và đường cao tốc',
      ],
      right: [
        'Giảm độ to của nguồn âm',
        'Phân tán âm trên đường truyền',
        'Ngăn chặn đường truyền âm',
        'Tăng tần số của âm',
      ],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
      hints: ['Hỏi xem biện pháp tác động vào nguồn âm hay vào đường âm đi tới tai.'],
      solution:
        'Cấm bóp còi làm giảm tiếng ồn ngay tại nguồn. Cây xanh làm âm bị phân tán trên đường truyền. Tường cách âm ngăn chặn đường truyền âm.',
    },
  ],
  takeaways: [
    'Âm dội lại khi gặp mặt chắn là âm phản xạ.',
    'Tiếng vang nghe được khi âm phản xạ đến tai chậm hơn âm trực tiếp ít nhất $\\dfrac{1}{15}\\ \\text{s}$; thời gian chậm hơn là $t = \\dfrac{2d}{v}$.',
    'Vật cứng, bề mặt nhẵn phản xạ âm tốt; vật mềm, xốp, bề mặt gồ ghề phản xạ âm kém (hấp thụ âm tốt).',
    'Chống ô nhiễm tiếng ồn: giảm độ to của nguồn âm, phân tán âm trên đường truyền, ngăn chặn đường truyền âm.',
  ],
};
