/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Chất lỏng gây áp suất theo mọi phương lên đáy bình, thành bình và các vật trong lòng nó, càng xuống sâu áp suất càng lớn; áp suất tác dụng vào chất lỏng được truyền đi nguyên vẹn theo mọi hướng (máy nén thủy lực); bình thông nhau chứa cùng một chất lỏng đứng yên có mực chất lỏng ngang nhau; Trái Đất và mọi vật trên Trái Đất chịu áp suất khí quyển theo mọi phương.',
  intro:
    'Người thợ lặn phải mặc bộ áo lặn chịu được áp suất lớn khi lặn sâu. Lật úp một cốc nước đầy có tờ giấy đậy miệng, nước không đổ ra. Hai hiện tượng này cho thấy chất lỏng và không khí đều gây ra áp suất. Áp suất ấy tác dụng theo phương nào và lớn cỡ nào?',
  objectives: [
    'Nêu được chất lỏng gây áp suất theo mọi phương lên đáy bình, thành bình và các vật ở trong lòng nó; càng sâu áp suất càng lớn.',
    'Nêu được áp suất tác dụng vào chất lỏng được chất lỏng truyền đi nguyên vẹn theo mọi hướng; giải thích được nguyên tắc máy nén thủy lực.',
    'Nêu được đặc điểm mực chất lỏng trong bình thông nhau.',
    'Lấy được ví dụ chứng tỏ sự tồn tại của áp suất khí quyển, áp suất này tác dụng theo mọi phương; giải thích được một số ứng dụng.',
  ],
  sections: [
    {
      heading: 'Áp suất chất lỏng',
      blocks: [
        {
          type: 'p',
          text: 'Thí nghiệm 1: đổ nước vào một bình trụ có đáy và các lỗ ở thành bình được bịt bằng màng cao su mỏng. Các màng cao su ở đáy và ở thành bình đều bị phồng ra: chất lỏng ép lên cả đáy bình lẫn thành bình.',
        },
        {
          type: 'p',
          text: 'Thí nghiệm 2: dùng một đĩa nhẹ $D$ đậy đáy một ống trụ hở hai đầu (giữ bằng sợi dây), nhúng sâu vào bình nước rồi buông dây. Đĩa $D$ không rơi dù ta xoay ống theo các hướng khác nhau: chất lỏng ép lên đĩa từ dưới lên và theo mọi phương.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Kết luận',
          text: 'Chất lỏng gây ra áp suất theo mọi phương lên đáy bình, thành bình và các vật ở trong lòng nó. Càng xuống sâu trong chất lỏng, áp suất chất lỏng càng lớn.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Em có thể chưa biết: tính áp suất chất lỏng',
          text: 'Tại độ sâu $h$ (tính từ mặt thoáng, đơn vị $\\text{m}$) trong chất lỏng có trọng lượng riêng $d = 10D$ (đơn vị $\\text{N/m}^3$), áp suất do chất lỏng gây ra là $p = d \\cdot h$. Với nước, $d = 10\\,000\\ \\text{N/m}^3$: cứ xuống sâu thêm $1\\ \\text{m}$ thì áp suất tăng thêm $10\\,000\\ \\text{Pa}$.',
        },
      ],
    },
    {
      heading: 'Bình thông nhau',
      blocks: [
        {
          type: 'p',
          text: 'Bình thông nhau là bình có hai hoặc nhiều nhánh nối thông đáy với nhau. Trong hình dưới, khi khóa $K$ mở, nước chảy từ nhánh có mực nước cao sang nhánh có mực nước thấp cho tới khi đứng yên.',
        },
        { type: 'widget', name: 'binh-thong-nhau' },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Bình thông nhau',
          text: 'Trong bình thông nhau chứa cùng một chất lỏng đứng yên, mực chất lỏng ở các nhánh luôn ở cùng một độ cao.',
        },
        {
          type: 'p',
          text: 'Ứng dụng: vòi ấm trà cao bằng miệng ấm (vòi thấp hơn thì nước tràn ra khi chưa rót đầy); ống đo mực chất lỏng gắn ngoài bể, nồi hơi; hệ thống cấp nước từ đài nước trên cao xuống các nhà.',
        },
      ],
    },
    {
      heading: 'Sự truyền áp suất chất lỏng. Máy nén thủy lực',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Sự truyền áp suất',
          text: 'Áp suất tác dụng vào chất lỏng (chứa trong bình kín) được chất lỏng truyền đi nguyên vẹn theo mọi hướng.',
        },
        {
          type: 'p',
          text: 'Máy nén thủy lực gồm hai xilanh, một nhỏ một to, thông đáy với nhau, chứa đầy chất lỏng (thường là dầu) và được đậy bằng hai pít-tông. Tác dụng lực $f$ lên pít-tông nhỏ diện tích $s$, áp suất $\\dfrac{f}{s}$ được dầu truyền nguyên vẹn tới pít-tông lớn diện tích $S$, tạo ra lực nâng $F$:',
        },
        {
          type: 'tex',
          tex: '\\dfrac{F}{S} = \\dfrac{f}{s} \\quad\\Rightarrow\\quad \\dfrac{F}{f} = \\dfrac{S}{s}',
        },
        {
          type: 'p',
          text: 'Diện tích pít-tông lớn gấp bao nhiêu lần pít-tông nhỏ thì lực nâng lớn gấp bấy nhiêu lần lực tác dụng. Nhờ vậy, kích nâng ô tô, phanh dầu, máy ép dùng một lực nhỏ để tạo ra lực rất lớn.',
        },
      ],
    },
    {
      heading: 'Áp suất khí quyển',
      blocks: [
        {
          type: 'p',
          text: 'Trái Đất được bao bọc bởi một lớp không khí dày tới hàng nghìn kilômét, gọi là khí quyển. Không khí có trọng lượng nên gây ra áp suất lên Trái Đất và mọi vật trên Trái Đất.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Áp suất khí quyển',
          text: 'Trái Đất và mọi vật trên Trái Đất đều chịu tác dụng của áp suất khí quyển theo mọi phương. Ở mặt nước biển, áp suất khí quyển vào khoảng $101\\,300\\ \\text{Pa}$ (bằng áp suất của cột thủy ngân cao $760\\ \\text{mm}$).',
        },
        {
          type: 'list',
          items: [
            'Hút hết không khí trong hộp sữa giấy, hộp bị bẹp theo nhiều phía: áp suất khí quyển bên ngoài lớn hơn áp suất không khí còn lại trong hộp.',
            'Lật ngược cốc nước đầy có tờ giấy đậy miệng, nước không chảy ra: áp suất khí quyển đẩy tờ giấy từ dưới lên, lớn hơn áp suất do nước trong cốc gây ra.',
            'Khi máy bay cất cánh hay hạ cánh, áp suất khí quyển bên ngoài thay đổi nhanh, chênh với áp suất trong tai nên ta bị ù tai.',
          ],
        },
        { type: 'widget', name: 'coc-nuoc-up-giay' },
        {
          type: 'p',
          text: 'Ứng dụng: ấn giác mút vào mặt kính để đẩy không khí ra, áp suất khí quyển bên ngoài ép giác mút dính chặt; dùng ống hút để uống nước; bình xịt, tàu đệm khí; nắp ấm trà có lỗ nhỏ để không khí vào, nước rót ra dễ dàng.',
        },
      ],
    },
  ],
  explore: {
    title: 'Cảm biến áp suất trong bể',
    instruction:
      'Kéo cảm biến (hoặc chọn nó rồi bấm phím mũi tên lên, xuống) để thay đổi độ sâu $h$ và đọc áp suất. Xoay màng cảm biến hướng lên, ngang, xuống ở cùng một độ sâu: số chỉ có đổi không? Đổi chất lỏng trong bể và so sánh các đường trên đồ thị $p$ theo $h$.',
  },
  examples: [
    {
      problem:
        'Một thợ lặn đang ở độ sâu $20\\ \\text{m}$ dưới mặt nước. Biết trọng lượng riêng của nước là $10\\,000\\ \\text{N/m}^3$, dùng $p = d \\cdot h$ tính áp suất do nước gây ra tại độ sâu đó. Nếu lặn sâu thêm, áp suất thay đổi thế nào?',
      steps: [
        '$p = d \\cdot h = 10\\,000 \\cdot 20 = 200\\,000\\ \\text{Pa}$.',
        'Càng xuống sâu, $h$ càng lớn nên áp suất chất lỏng càng lớn; vì thế bộ áo lặn phải chịu được áp suất lớn.',
      ],
      answer:
        'Áp suất do nước gây ra là $200\\,000\\ \\text{Pa}$, gần gấp đôi áp suất khí quyển; lặn sâu thêm thì áp suất tăng.',
    },
    {
      problem:
        'Một máy nén thủy lực có pít-tông nhỏ diện tích $s = 4\\ \\text{cm}^2$, pít-tông lớn diện tích $S = 200\\ \\text{cm}^2$. Tác dụng lên pít-tông nhỏ một lực $f = 100\\ \\text{N}$. Tính lực nâng $F$ ở pít-tông lớn.',
      steps: [
        'Áp suất được chất lỏng truyền nguyên vẹn: $\\dfrac{F}{S} = \\dfrac{f}{s}$, suy ra $\\dfrac{F}{f} = \\dfrac{S}{s}$.',
        '$\\dfrac{S}{s} = \\dfrac{200}{4} = 50$ (cùng đơn vị $\\text{cm}^2$ nên không cần đổi).',
        '$F = 50 \\cdot f = 50 \\cdot 100 = 5000\\ \\text{N}$.',
      ],
      answer: 'Lực nâng ở pít-tông lớn là $5000\\ \\text{N}$, gấp $50$ lần lực tác dụng.',
    },
    {
      problem:
        'Vì sao lật úp cốc nước đầy có tờ giấy đậy miệng thì nước không chảy ra, còn làm thí nghiệm đó trong một chuông thủy tinh đã hút hết không khí thì nước đổ ra?',
      steps: [
        'Ngoài không khí, tờ giấy chịu áp suất khí quyển (khoảng $101\\,300\\ \\text{Pa}$) đẩy từ dưới lên.',
        'Nước trong cốc cao khoảng $10\\ \\text{cm}$ chỉ gây áp suất khoảng $1000\\ \\text{Pa}$ lên tờ giấy, nhỏ hơn rất nhiều, nên tờ giấy bị ép chặt vào miệng cốc.',
        'Trong chuông đã hút hết không khí, không còn áp suất khí quyển đẩy tờ giấy lên, nước và tờ giấy rơi xuống.',
      ],
      answer: 'Chính áp suất khí quyển giữ tờ giấy và nước trong cốc.',
    },
  ],
  practice: [
    {
      type: 'multi',
      prompt: 'Chất lỏng đứng yên trong bình gây áp suất lên',
      options: [
        'đáy bình',
        'thành bình',
        'các vật ở trong lòng chất lỏng',
        'chỉ đáy bình, theo phương thẳng đứng',
      ],
      answers: [0, 1, 2],
      hints: ['Nhớ thí nghiệm bình có màng cao su ở đáy và ở thành bình.'],
      solution:
        'Chất lỏng gây áp suất theo mọi phương lên đáy bình, thành bình và các vật ở trong lòng nó, không chỉ lên đáy bình.',
    },
    {
      type: 'choice',
      prompt:
        'Trong một hồ nước có bốn điểm: $A$ sâu $0{,}5\\ \\text{m}$, $B$ sâu $1{,}2\\ \\text{m}$, $C$ sâu $2\\ \\text{m}$, $D$ sâu $0{,}8\\ \\text{m}$ (tính từ mặt nước). Áp suất của nước lớn nhất tại điểm nào?',
      options: ['$A$', '$B$', '$C$', '$D$'],
      answer: 2,
      hints: ['Áp suất chất lỏng phụ thuộc độ sâu thế nào?'],
      solution:
        'Càng xuống sâu, áp suất chất lỏng càng lớn; $C$ ở sâu nhất ($2\\ \\text{m}$) nên áp suất lớn nhất.',
    },
    {
      type: 'number',
      prompt:
        'Dùng công thức $p = d \\cdot h$, tính áp suất do nước gây ra ở đáy một bể sâu $1{,}5\\ \\text{m}$ chứa đầy nước. Biết trọng lượng riêng của nước là $10\\,000\\ \\text{N/m}^3$.',
      answer: 15000,
      unit: 'Pa',
      hints: ['$h$ là độ sâu tính từ mặt thoáng, đơn vị mét.'],
      solution: '$p = 10\\,000 \\cdot 1{,}5 = 15\\,000\\ \\text{Pa}$.',
    },
    {
      type: 'choice',
      prompt: 'Một bình thông nhau chứa nước đứng yên. Mực nước trong các nhánh',
      options: [
        'cao nhất ở nhánh to nhất',
        'cao nhất ở nhánh nhỏ nhất',
        'ở cùng một độ cao',
        'phụ thuộc lượng nước đổ vào từng nhánh',
      ],
      answer: 2,
      hints: ['Mở khóa $K$ trong hình bình thông nhau và chờ nước đứng yên.'],
      solution:
        'Trong bình thông nhau chứa cùng một chất lỏng đứng yên, mực chất lỏng ở các nhánh luôn ở cùng một độ cao, dù các nhánh to nhỏ khác nhau.',
    },
    {
      type: 'number',
      prompt:
        'Một kích thủy lực có pít-tông nhỏ diện tích $2\\ \\text{cm}^2$ và pít-tông lớn diện tích $100\\ \\text{cm}^2$. Cần tác dụng lên pít-tông nhỏ một lực $200\\ \\text{N}$. Lực nâng ở pít-tông lớn là bao nhiêu niutơn?',
      answer: 10000,
      unit: 'N',
      hints: ['$\\dfrac{F}{f} = \\dfrac{S}{s}$.', 'Tỉ số diện tích là $\\dfrac{100}{2}$.'],
      solution: '$F = f \\cdot \\dfrac{S}{s} = 200 \\cdot \\dfrac{100}{2} = 10\\,000\\ \\text{N}$.',
    },
    {
      type: 'multi',
      prompt: 'Hiện tượng nào do áp suất khí quyển gây ra?',
      options: [
        'Hút bớt không khí trong hộp sữa giấy, hộp bị bẹp theo nhiều phía.',
        'Giác mút ấn vào mặt kính thì dính chặt.',
        'Bị ù tai khi máy bay cất cánh.',
        'Quả táo rơi từ trên cây xuống.',
      ],
      answers: [0, 1, 2],
      hints: ['Quả táo rơi là do lực nào?'],
      solution:
        'Hộp sữa bẹp, giác mút dính, ù tai đều do áp suất khí quyển (hoặc sự chênh lệch của nó). Quả táo rơi là do lực hút của Trái Đất (trọng lực).',
    },
    {
      type: 'choice',
      prompt:
        'Làm thí nghiệm cốc nước úp có tờ giấy đậy trong một chuông thủy tinh đã hút hết không khí thì',
      options: [
        'nước vẫn ở trong cốc như khi ở ngoài không khí',
        'tờ giấy rơi, nước đổ ra vì không còn áp suất khí quyển đẩy tờ giấy',
        'nước bị hút lên đáy cốc',
        'tờ giấy dính chặt hơn',
      ],
      answer: 1,
      hints: ['Lực nào giữ tờ giấy khi làm thí nghiệm ngoài không khí?'],
      solution:
        'Ngoài không khí, áp suất khí quyển giữ tờ giấy. Trong chuông đã hút hết không khí, không còn áp suất khí quyển nên tờ giấy rơi và nước đổ ra.',
    },
    {
      type: 'choice',
      prompt: 'Vì sao trên nắp ấm trà thường có một lỗ nhỏ?',
      options: [
        'Để hơi nước thoát ra cho trà nhanh nguội',
        'Để không khí vào trong ấm, áp suất khí quyển cùng với trọng lượng nước giúp nước rót ra dễ dàng',
        'Để giảm khối lượng nắp ấm',
        'Để trang trí',
      ],
      answer: 1,
      hints: [
        'Nếu nắp kín hoàn toàn, khi nước chảy ra thì không khí phía trên nước trong ấm thế nào?',
      ],
      solution:
        'Nếu nắp kín, nước chảy ra làm không khí trong ấm loãng đi, áp suất trong ấm nhỏ hơn áp suất khí quyển ở vòi nên nước khó chảy. Lỗ nhỏ cho không khí vào, áp suất hai bên cân bằng, nước rót ra dễ dàng.',
    },
  ],
  takeaways: [
    'Chất lỏng gây áp suất theo mọi phương lên đáy bình, thành bình và các vật trong lòng nó; càng sâu áp suất càng lớn ($p = d \\cdot h$).',
    'Bình thông nhau chứa cùng một chất lỏng đứng yên: mực chất lỏng ở các nhánh ở cùng một độ cao.',
    'Áp suất tác dụng vào chất lỏng được truyền nguyên vẹn theo mọi hướng; máy nén thủy lực: $\\dfrac{F}{f} = \\dfrac{S}{s}$.',
    'Trái Đất và mọi vật trên Trái Đất chịu áp suất khí quyển theo mọi phương, khoảng $101\\,300\\ \\text{Pa}$ ở mặt nước biển.',
  ],
};
