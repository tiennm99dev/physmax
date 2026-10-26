/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Đòn bẩy là một thanh cứng có thể quay quanh một điểm tựa O; nó có thể làm thay đổi hướng tác dụng của lực và cho lợi về lực khi khoảng cách từ điểm tựa tới lực tác dụng lớn hơn khoảng cách từ điểm tựa tới vật. Đòn bẩy loại 1 có điểm tựa nằm trong khoảng giữa vật và lực tác dụng; đòn bẩy loại 2 có điểm tựa nằm ngoài khoảng đó.',
  intro:
    'Nhà bác học Archimedes từng nói: "Hãy cho tôi một điểm tựa, tôi sẽ nâng cả Trái Đất". Chỉ với một thanh gỗ chắc và một hòn đá kê làm điểm tựa, một người có thể bẩy được tảng đá nặng gấp nhiều lần sức mình. Đòn bẩy giúp ta như thế nào, và vì sao kéo, đũa, xe cút kít, bập bênh đều là đòn bẩy?',
  objectives: [
    'Nhận biết điểm tựa $O$, điểm đặt của vật $O_1$ và điểm đặt của lực tác dụng $O_2$ trên một đòn bẩy.',
    'Nêu được đòn bẩy có thể làm thay đổi hướng tác dụng của lực và cho lợi về lực khi $OO_2 > OO_1$.',
    'Phân biệt được đòn bẩy loại 1 và loại 2; chỉ ra được loại đòn bẩy trong các dụng cụ đời thường và trong cơ thể người.',
    'Vận dụng $F_1 \\cdot d_1 = F_2 \\cdot d_2$ để tính lực cần dùng khi đòn bẩy cân bằng.',
  ],
  sections: [
    {
      heading: 'Đòn bẩy và tác dụng của đòn bẩy',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Đòn bẩy',
          text: 'Đòn bẩy là một thanh cứng có thể quay quanh một điểm tựa cố định. Trục quay của đòn bẩy luôn đi qua điểm tựa $O$.',
        },
        {
          type: 'list',
          items: [
            'Điểm tựa $O$: điểm mà đòn bẩy quay quanh.',
            'Điểm $O_1$: nơi vật cần nâng tác dụng lực $F_1$ lên đòn bẩy (thường là trọng lượng của vật).',
            'Điểm $O_2$: nơi người tác dụng lực $F_2$ lên đòn bẩy.',
            'Khoảng cách từ giá của lực tới điểm tựa là cánh tay đòn của lực đó. Khi các lực vuông góc với đòn bẩy: $d_1 = OO_1$, $d_2 = OO_2$.',
          ],
        },
        {
          type: 'p',
          text: 'Thí nghiệm: dùng lực kế kéo một đầu thanh cứng có điểm tựa $O$ để nâng quả nặng treo ở đầu kia, móc lực kế vào các lỗ khác nhau. Lực kế đặt càng xa $O$ thì số chỉ càng nhỏ; đặt gần $O$ thì số chỉ lớn. Muốn nâng quả nặng lên, tay phải kéo lực kế xuống dưới.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Tác dụng của đòn bẩy',
          text: 'Đòn bẩy có thể làm thay đổi hướng tác dụng của lực (ví dụ ấn xuống để nâng vật lên). Khi khoảng cách $OO_2$ từ điểm tựa tới lực tác dụng lớn hơn khoảng cách $OO_1$ từ điểm tựa tới vật thì $F_2 < F_1$: ta được lợi về lực.',
        },
        {
          type: 'p',
          text: 'Theo bài moment lực, đòn bẩy nằm cân bằng khi tác dụng làm quay của hai lực như nhau:',
        },
        {
          type: 'tex',
          tex: 'F_1 \\cdot d_1 = F_2 \\cdot d_2 \\quad\\Rightarrow\\quad \\frac{F_2}{F_1} = \\frac{d_1}{d_2}',
        },
        {
          type: 'p',
          text: 'Cánh tay đòn của lực tác dụng dài gấp bao nhiêu lần cánh tay đòn của vật thì lực cần dùng nhỏ hơn trọng lượng vật bấy nhiêu lần.',
        },
      ],
    },
    {
      heading: 'Các loại đòn bẩy',
      blocks: [
        {
          type: 'p',
          text: 'Tùy theo vị trí của điểm tựa $O$ so với các điểm đặt $O_1$, $O_2$ của các lực $F_1$, $F_2$, đòn bẩy được chia thành hai loại. Đòn bẩy loại 2 lại có hai trường hợp, tùy lực tác dụng xa hay gần điểm tựa hơn vật.',
        },
        {
          type: 'table',
          head: ['Loại', 'Vị trí', 'Lợi ích', 'Ví dụ'],
          rows: [
            [
              'Đòn bẩy loại 1',
              'Điểm tựa $O$ nằm trong khoảng giữa $O_1$ và $O_2$',
              'Đổi hướng tác dụng của lực; lợi về lực khi $OO_2 > OO_1$',
              'Bập bênh, kéo cắt giấy, búa nhổ đinh, kìm, xà beng bẩy hòn đá',
            ],
            [
              'Đòn bẩy loại 2, lực tác dụng xa điểm tựa',
              'Điểm tựa $O$ nằm ngoài khoảng $O_1O_2$; lực tác dụng $O_2$ xa điểm tựa hơn vật $O_1$ (vật ở giữa)',
              'Luôn cho lợi về lực, nhưng vật di chuyển chậm, được quãng ngắn',
              'Cái mở nắp chai, xe cút kít, dụng cụ kẹp vỡ hạt',
            ],
            [
              'Đòn bẩy loại 2, lực tác dụng gần điểm tựa',
              'Điểm tựa $O$ nằm ngoài khoảng $O_1O_2$; lực tác dụng $O_2$ gần điểm tựa hơn vật $O_1$ (lực ở giữa)',
              'Không cho lợi về lực, nhưng vật di chuyển nhanh, được quãng dài',
              'Đôi đũa, cần câu cá, cái kẹp gắp',
            ],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Về cách gọi tên',
          text: 'Sách giáo khoa chỉ chia đòn bẩy thành hai loại theo vị trí điểm tựa: điểm tựa ở trong khoảng $O_1O_2$ (loại 1) và ở ngoài khoảng đó (loại 2). Một số tài liệu khác tách trường hợp lực tác dụng ở giữa (như đôi đũa, cần câu) thành "đòn bẩy loại 3"; trong bài này, theo sách giáo khoa, đó là đòn bẩy loại 2 không cho lợi về lực.',
        },
        { type: 'widget', name: 'dung-cu' },
      ],
    },
    {
      heading: 'Ứng dụng của đòn bẩy',
      blocks: [
        {
          type: 'list',
          items: [
            'Bơm nước bằng tay: người ấn cần bơm xuống ở đầu dài, đầu ngắn kéo pít-tông lên; cần bơm quay quanh chốt (điểm tựa) nằm ở giữa, vừa đổi hướng lực vừa cho lợi về lực.',
            'Trong cơ thể người: đầu là đòn bẩy loại 1, điểm tựa là khớp nối hộp sọ với cột sống, nằm giữa trọng lượng của đầu và lực kéo của cơ gáy. Cẳng tay khi cầm vật quay quanh khuỷu tay; cơ bắp tay kéo ở gần khuỷu, vật ở bàn tay xa hơn, nên cơ phải kéo một lực lớn hơn trọng lượng vật, đổi lại bàn tay di chuyển nhanh và xa.',
            'Xe đạp: khi đạp, bàn đạp là nơi đặt lực, trục giữa là điểm tựa, đùi đĩa truyền lực tới xích để kéo bánh sau. Tay phanh cũng là một đòn bẩy.',
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Giữ gìn cơ thể',
          text: 'Khi cầm vật nặng, nên đưa vật sát vào người và gập cẳng tay sát vào bắp tay để giảm cánh tay đòn của trọng lượng vật, đỡ mỏi cơ. Khi ngồi học, giữ đầu và lưng thẳng để trọng lượng của đầu có cánh tay đòn nhỏ, cơ cổ không phải gồng lâu.',
        },
      ],
    },
  ],
  explore: {
    title: 'Bập bênh ảo',
    instruction:
      'Kéo điểm tựa $O$ (tam giác), vật cần nâng (hộp xanh) và điểm đặt lực tác dụng (chấm đỏ) tới các lỗ trên thanh, rồi chỉnh lực $F_2$ cho đến khi thanh nằm cân bằng. So sánh $F_1 \\cdot d_1$ với $F_2 \\cdot d_2$, xem loại đòn bẩy và lực $F_2$ nhỏ hơn hay lớn hơn $F_1$. Bấm "Bắt đầu thử thách" để dựng đúng loại đòn bẩy theo yêu cầu.',
  },
  examples: [
    {
      problem:
        'Dùng một xà beng để bẩy hòn đá có trọng lượng $900\\ \\text{N}$. Điểm tựa cách điểm đặt hòn đá $0{,}2\\ \\text{m}$ và cách điểm tay ấn $1{,}2\\ \\text{m}$; điểm tựa nằm giữa hòn đá và tay. Coi các lực vuông góc với xà beng. (a) Đây là đòn bẩy loại mấy? (b) Tay phải ấn một lực bao nhiêu và theo hướng nào?',
      steps: [
        '(a) Điểm tựa $O$ nằm giữa $O_1$ (hòn đá) và $O_2$ (tay): đòn bẩy loại 1.',
        '(b) $F_1 = 900\\ \\text{N}$, $d_1 = 0{,}2\\ \\text{m}$, $d_2 = 1{,}2\\ \\text{m}$.',
        'Từ $F_1 \\cdot d_1 = F_2 \\cdot d_2$: $F_2 = \\dfrac{F_1 \\cdot d_1}{d_2} = \\dfrac{900 \\cdot 0{,}2}{1{,}2} = 150\\ \\text{N}$.',
        'Muốn hòn đá đi lên, tay phải ấn đầu kia xuống dưới: đòn bẩy đã đổi hướng tác dụng của lực.',
      ],
      answer:
        '(a) Loại 1; (b) ấn xuống với lực ít nhất $150\\ \\text{N}$, nhỏ hơn trọng lượng hòn đá $6$ lần.',
    },
    {
      problem:
        'Một xe cút kít chở hàng, tổng trọng lượng xe và hàng là $600\\ \\text{N}$, đặt tại điểm cách trục bánh xe $0{,}4\\ \\text{m}$. Tay người nâng ở đầu càng xe, cách trục bánh xe $1{,}2\\ \\text{m}$. Tính lực nâng của tay (coi các lực thẳng đứng, càng xe gần nằm ngang).',
      steps: [
        'Trục bánh xe là điểm tựa $O$, ở một đầu; hàng ở giữa; tay ở đầu kia, xa điểm tựa hơn: đòn bẩy loại 2.',
        '$d_1 = 0{,}4\\ \\text{m}$, $d_2 = 1{,}2\\ \\text{m}$.',
        '$F_2 = \\dfrac{F_1 \\cdot d_1}{d_2} = \\dfrac{600 \\cdot 0{,}4}{1{,}2} = 200\\ \\text{N}$.',
      ],
      answer:
        'Tay chỉ cần nâng lên với lực $200\\ \\text{N}$, bằng một phần ba trọng lượng xe và hàng.',
    },
    {
      problem:
        'Khi giật cần câu, tay dưới giữ cuối cán làm điểm tựa, tay trên cách điểm tựa $0{,}5\\ \\text{m}$; con cá có trọng lượng $5\\ \\text{N}$ treo ở đầu cần, cách điểm tựa $2\\ \\text{m}$. Để giữ cần cân bằng nằm ngang, tay trên phải tác dụng lực bao nhiêu? Cần câu cho lợi gì?',
      steps: [
        'Điểm tựa ở cuối cán, nằm ngoài khoảng giữa tay trên và con cá: đòn bẩy loại 2, với lực tác dụng ở giữa, gần điểm tựa hơn vật.',
        '$F_2 = \\dfrac{F_1 \\cdot d_1}{d_2} = \\dfrac{5 \\cdot 2}{0{,}5} = 20\\ \\text{N}$.',
        '$F_2 = 20\\ \\text{N} > F_1 = 5\\ \\text{N}$: không được lợi về lực.',
        'Bù lại, tay chỉ dịch chuyển một đoạn ngắn mà đầu cần (con cá) đi được quãng dài gấp $4$ lần, nên cá được nhấc lên rất nhanh.',
      ],
      answer:
        'Tay trên phải tác dụng $20\\ \\text{N}$; cần câu không cho lợi về lực nhưng giúp nhấc cá lên nhanh.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Đòn bẩy là',
      options: [
        'một thanh cứng có thể quay quanh một điểm tựa cố định',
        'một sợi dây vắt qua một bánh xe có rãnh',
        'một mặt phẳng nghiêng',
        'một thanh bất kì đặt trên mặt bàn',
      ],
      answer: 0,
      hints: ['Mọi đòn bẩy đều có một điểm mà nó quay quanh.'],
      solution:
        'Đòn bẩy là một thanh cứng có thể quay quanh một điểm tựa cố định; trục quay đi qua điểm tựa $O$.',
    },
    {
      type: 'choice',
      prompt:
        'Dùng đòn bẩy có điểm tựa $O$, vật đặt tại $O_1$, lực tác dụng đặt tại $O_2$ (các lực vuông góc với đòn bẩy). Khi nào ta được lợi về lực?',
      options: ['$OO_2 < OO_1$', '$OO_2 = OO_1$', '$OO_2 > OO_1$', 'Bất kì vị trí nào'],
      answer: 2,
      hints: ['Đòn bẩy cân bằng khi $F_1 \\cdot OO_1 = F_2 \\cdot OO_2$.'],
      solution:
        'Từ $F_1 \\cdot OO_1 = F_2 \\cdot OO_2$, ta có $F_2 < F_1$ khi $OO_2 > OO_1$: khoảng cách từ điểm tựa tới lực tác dụng lớn hơn khoảng cách từ điểm tựa tới vật.',
    },
    {
      type: 'number',
      prompt:
        'Dùng một thanh cứng có điểm tựa ở giữa vật và tay để bẩy một vật nặng $1200\\ \\text{N}$. Vật cách điểm tựa $0{,}25\\ \\text{m}$, tay cách điểm tựa $1{,}5\\ \\text{m}$. Tay phải ấn một lực bao nhiêu niutơn để giữ thanh cân bằng (coi các lực vuông góc với thanh)?',
      answer: 200,
      unit: 'N',
      hints: [
        'Dùng $F_1 \\cdot d_1 = F_2 \\cdot d_2$.',
        'Tính $F_1 \\cdot d_1$ trước rồi chia cho $d_2$.',
      ],
      solution:
        '$F_2 = \\dfrac{F_1 \\cdot d_1}{d_2} = \\dfrac{1200 \\cdot 0{,}25}{1{,}5} = \\dfrac{300}{1{,}5} = 200\\ \\text{N}$.',
    },
    {
      type: 'number',
      prompt:
        'Muốn dùng lực $100\\ \\text{N}$ để nâng một vật $400\\ \\text{N}$ bằng đòn bẩy, vật cách điểm tựa $0{,}3\\ \\text{m}$. Lực tác dụng phải đặt cách điểm tựa ít nhất bao nhiêu mét (coi các lực vuông góc với đòn bẩy)?',
      answer: 1.2,
      unit: 'm',
      hints: ['Từ $F_1 \\cdot d_1 = F_2 \\cdot d_2$ suy ra $d_2 = \\dfrac{F_1 \\cdot d_1}{F_2}$.'],
      solution:
        '$d_2 = \\dfrac{F_1 \\cdot d_1}{F_2} = \\dfrac{400 \\cdot 0{,}3}{100} = 1{,}2\\ \\text{m}$.',
    },
    {
      type: 'number',
      prompt:
        'Trên bập bênh, bạn An nặng $300\\ \\text{N}$ ngồi cách trục $1{,}5\\ \\text{m}$. Bố của An nặng $450\\ \\text{N}$ phải ngồi ở phía bên kia, cách trục bao nhiêu mét để bập bênh nằm cân bằng?',
      answer: 1,
      unit: 'm',
      hints: [
        'Hai bên phải có cùng tác dụng làm quay: $F_1 \\cdot d_1 = F_2 \\cdot d_2$.',
        'Người nặng hơn ngồi gần trục hơn.',
      ],
      solution: '$450 \\cdot d = 300 \\cdot 1{,}5 = 450$, suy ra $d = 1\\ \\text{m}$.',
    },
    {
      type: 'choice',
      prompt:
        'Cái mở nắp chai (điểm tựa tì lên đỉnh nắp, mép nắp ở giữa, tay ở đầu kia) là đòn bẩy loại mấy?',
      options: ['Loại 1', 'Loại 2', 'Không phải đòn bẩy'],
      answer: 1,
      hints: ['Điểm tựa nằm ở giữa hay ở một đầu? Lực tay xa hay gần điểm tựa hơn vật?'],
      solution:
        'Điểm tựa ở một đầu, vật (mép nắp) ở giữa, lực tay xa điểm tựa hơn vật: đòn bẩy loại 2, cho lợi về lực.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi dụng cụ với loại đòn bẩy và trường hợp của nó.',
      left: ['Kéo cắt giấy', 'Xe cút kít', 'Đôi đũa'],
      right: [
        'Loại 1: điểm tựa ở giữa',
        'Loại 2: vật ở giữa, lợi về lực',
        'Loại 2: lực ở giữa, không lợi về lực',
      ],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
      hints: [
        'Tìm điểm tựa của mỗi dụng cụ trước.',
        'Kéo: chốt ở giữa. Xe cút kít: trục bánh xe ở đầu, hàng ở giữa. Đũa: ngón tay đặt lực ở giữa.',
      ],
      solution:
        'Kéo: điểm tựa (chốt) ở giữa tay và giấy, loại 1. Xe cút kít: trục bánh xe ở đầu, hàng ở giữa, loại 2 cho lợi về lực. Đôi đũa: điểm tựa ở đầu đũa trong lòng bàn tay, lực ngón tay ở giữa, thức ăn ở đầu kia, loại 2 không cho lợi về lực.',
    },
    {
      type: 'multi',
      prompt: 'Những dụng cụ nào sau đây cho ta lợi về lực khi dùng đúng cách?',
      options: ['Búa nhổ đinh', 'Xe cút kít', 'Đôi đũa', 'Cần câu cá', 'Cái mở nắp chai'],
      answers: [0, 1, 4],
      hints: ['Lợi về lực khi lực tác dụng xa điểm tựa hơn vật.'],
      solution:
        'Búa nhổ đinh (loại 1, tay xa điểm tựa hơn đinh), xe cút kít và cái mở nắp chai (loại 2) cho lợi về lực. Đũa và cần câu là đòn bẩy loại 2 có lực tác dụng gần điểm tựa hơn vật nên không lợi về lực.',
    },
    {
      type: 'choice',
      prompt:
        'Dùng xà beng có điểm tựa ở giữa để bẩy hòn đá lên, tay phải tác dụng lực theo hướng nào?',
      options: [
        'Từ dưới lên trên, cùng hướng chuyển động của hòn đá',
        'Từ trên xuống dưới, ngược hướng chuyển động của hòn đá',
        'Theo phương nằm ngang',
        'Theo phương dọc xà beng, hướng vào điểm tựa',
      ],
      answer: 1,
      hints: ['Đòn bẩy loại 1 quay quanh điểm tựa: hai đầu chuyển động ngược nhau.'],
      solution:
        'Điểm tựa ở giữa nên đầu có tay đi xuống thì đầu có hòn đá đi lên. Tay ấn từ trên xuống: đòn bẩy loại 1 đã làm thay đổi hướng tác dụng của lực. Lực dọc xà beng có giá đi qua điểm tựa, không làm xà beng quay.',
    },
    {
      type: 'choice',
      prompt:
        'Vì sao khi xách vật nặng, ta nên gập cẳng tay sát vào bắp tay và đưa vật sát vào người?',
      options: [
        'Để trọng lượng của vật giảm đi',
        'Để giảm cánh tay đòn của trọng lượng vật đối với khớp, để cơ không phải kéo một lực lớn',
        'Để tăng cánh tay đòn của trọng lượng vật',
        'Để vật di chuyển nhanh hơn',
      ],
      answer: 1,
      hints: ['Trọng lượng vật không đổi; cái gì thay đổi khi đưa vật lại gần khớp?'],
      solution:
        'Đưa vật lại gần khớp (điểm tựa) làm cánh tay đòn $d_1$ của trọng lượng vật nhỏ đi, moment $F_1 \\cdot d_1$ nhỏ đi, nên cơ chỉ cần kéo một lực nhỏ hơn, đỡ mỏi.',
    },
  ],
  takeaways: [
    'Đòn bẩy là thanh cứng quay quanh điểm tựa $O$; vật đặt tại $O_1$, lực tác dụng đặt tại $O_2$.',
    'Đòn bẩy có thể làm thay đổi hướng tác dụng của lực, và cho lợi về lực khi $OO_2 > OO_1$.',
    'Đòn bẩy cân bằng khi $F_1 \\cdot d_1 = F_2 \\cdot d_2$.',
    'Loại 1: điểm tựa nằm trong khoảng $O_1O_2$. Loại 2: điểm tựa nằm ngoài khoảng $O_1O_2$; lợi về lực khi vật ở giữa, không lợi về lực nhưng vật di chuyển nhanh, xa khi lực ở giữa.',
  ],
};
