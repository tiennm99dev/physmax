/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Thực hành mắc ampe kế nối tiếp để đo cường độ dòng điện ở hai vị trí trước và sau bóng đèn, mắc vôn kế song song để đo hiệu điện thế giữa hai cực nguồn và giữa hai đầu bóng đèn; đọc số chỉ theo giới hạn đo và độ chia nhỏ nhất, ghi bảng và nhận xét kết quả.',
  intro:
    'Một bạn học sinh cho rằng: “Bóng đèn tiêu thụ dòng điện, do đó cường độ dòng điện sẽ giảm sau khi đi qua bóng đèn”. Em có đồng ý với bạn không? Làm thế nào để kiểm tra ý kiến của mình? Trong bài thực hành này, em tự mắc mạch, đo và trả lời câu hỏi đó bằng số liệu.',
  objectives: [
    'Mắc được mạch điện đơn giản theo sơ đồ, với ampe kế mắc nối tiếp và vôn kế mắc song song, đúng chốt $(+)$, $(-)$.',
    'Đo được cường độ dòng điện bằng ampe kế; từ đó xác định được mạch điện kín hay hở.',
    'Đo được hiệu điện thế bằng vôn kế; dùng vôn kế xác định được pin cũ hay mới và hiệu điện thế giữa hai đầu bóng đèn.',
    'Đọc đúng số chỉ theo giới hạn đo (GHĐ) và độ chia nhỏ nhất (ĐCNN), ghi kết quả vào bảng và rút ra nhận xét.',
  ],
  sections: [
    {
      heading: 'Chuẩn bị và cách đọc dụng cụ đo',
      blocks: [
        {
          type: 'table',
          caption: 'Dụng cụ cho mỗi nhóm',
          head: ['Dụng cụ', 'Số lượng, đặc điểm'],
          rows: [
            ['Nguồn điện', 'Loại $1{,}5\\ \\text{V}$, $3\\ \\text{V}$ và $6\\ \\text{V}$'],
            ['Ampe kế', 'GHĐ từ $0{,}5\\ \\text{A}$ trở lên, ĐCNN $0{,}01\\ \\text{A}$'],
            ['Vôn kế', 'GHĐ $6\\ \\text{V}$, ĐCNN $0{,}1\\ \\text{V}$'],
            ['Bóng đèn pin', '$6\\ \\text{V}$ – $0{,}5\\ \\text{A}$, lắp sẵn trên đế đèn'],
            ['Công tắc', '$1$ cái'],
            ['Dây nối', 'Các đoạn dây dẫn có vỏ cách điện, có kẹp nối ở hai đầu'],
          ],
        },
        {
          type: 'p',
          text: 'Số ghi trên bóng đèn $6\\ \\text{V}$ – $0{,}5\\ \\text{A}$ cho biết: khi hiệu điện thế giữa hai đầu đèn là $6\\ \\text{V}$ thì dòng điện qua đèn có cường độ $0{,}5\\ \\text{A}$, đèn sáng bình thường. Vì vậy ampe kế cần có GHĐ ít nhất $0{,}5\\ \\text{A}$ và vôn kế có GHĐ $6\\ \\text{V}$.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Đọc số chỉ của dụng cụ đo',
          text: 'Trước khi đo: xác định GHĐ và ĐCNN, kiểm tra kim chỉ đúng vạch $0$. Khi đọc: đặt mắt nhìn vuông góc với mặt số, ngay trước kim. Số chỉ bằng giá trị của vạch có số gần nhất phía trước kim cộng với số khoảng chia nhân với ĐCNN. Ví dụ ampe kế ĐCNN $0{,}01\\ \\text{A}$, kim ở vạch thứ $6$ sau vạch $0{,}4$: $I = 0{,}4 + 6 \\cdot 0{,}01 = 0{,}46\\ \\text{A}$.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'An toàn khi mắc mạch',
          text: 'Mắc mạch khi công tắc đang mở. Ampe kế mắc nối tiếp, vôn kế mắc song song; chốt $(+)$ của dụng cụ đo nối về phía cực dương của nguồn. Không bao giờ nối hai chốt của ampe kế thẳng vào hai cực của nguồn. Mắc xong phải nhờ giáo viên kiểm tra mạch rồi mới đóng công tắc.',
        },
      ],
    },
    {
      heading: 'Thí nghiệm 1: Đo cường độ dòng điện',
      project: true,
      blocks: [
        {
          type: 'p',
          text: 'Mục tiêu: đo cường độ dòng điện trong mạch kín ở vị trí $(1)$, giữa cực dương của nguồn và bóng đèn, và ở vị trí $(2)$, giữa bóng đèn và cực âm của nguồn; so sánh hai giá trị.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Mắc mạch điện gồm nguồn $1{,}5\\ \\text{V}$, công tắc, bóng đèn và ampe kế nối tiếp, ampe kế ở vị trí $(1)$: chốt $(+)$ của ampe kế nối với cực dương của nguồn, chốt $(-)$ nối với bóng đèn. Công tắc đang mở, mạch hở.',
            'Đóng công tắc, đọc cường độ dòng điện $I_1$ tại vị trí $(1)$, ghi vào bảng.',
            'Mở công tắc, chuyển ampe kế sang vị trí $(2)$: chốt $(+)$ nối với đầu bóng đèn, chốt $(-)$ nối với cực âm của nguồn. Đóng công tắc, đọc $I_2$, ghi vào bảng.',
            'Lặp lại các bước trên với nguồn $3\\ \\text{V}$ và nguồn $6\\ \\text{V}$.',
          ],
        },
        {
          type: 'table',
          caption: 'Bảng ghi kết quả đo cường độ dòng điện',
          head: ['Nguồn điện', '$I_1$ (A)', '$I_2$ (A)'],
          rows: [
            ['$1{,}5\\ \\text{V}$', '...', '...'],
            ['$3\\ \\text{V}$', '...', '...'],
            ['$6\\ \\text{V}$', '...', '...'],
          ],
        },
        {
          type: 'p',
          text: 'Báo cáo: vẽ sơ đồ mạch điện đã mắc bằng kí hiệu; điền bảng; so sánh $I_1$ và $I_2$ với cùng một nguồn; nhận xét cường độ dòng điện khi tăng hiệu điện thế của nguồn; trả lời câu hỏi đầu bài.',
        },
      ],
    },
    {
      heading: 'Thí nghiệm 2: Đo hiệu điện thế',
      project: true,
      blocks: [
        {
          type: 'p',
          text: 'Mục tiêu: đo hiệu điện thế giữa hai cực của nguồn điện và hiệu điện thế giữa hai đầu bóng đèn trong mạch kín; so sánh hai giá trị.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Nối hai chốt của vôn kế với hai cực của nguồn $1{,}5\\ \\text{V}$ (chốt $(+)$ với cực dương), khi nguồn chưa mắc vào mạch. Đọc hiệu điện thế $U_{\\text{nguồn}}$, ghi vào bảng.',
            'Mắc mạch gồm nguồn, công tắc, bóng đèn nối tiếp; mắc vôn kế song song với bóng đèn, chốt $(+)$ nối với đầu đèn ở phía cực dương của nguồn. Công tắc đang mở.',
            'Đóng công tắc, đọc hiệu điện thế giữa hai đầu bóng đèn $U_{\\text{đèn}}$, ghi vào bảng.',
            'Thay nguồn $1{,}5\\ \\text{V}$ bằng nguồn $3\\ \\text{V}$, lặp lại các bước trên.',
          ],
        },
        {
          type: 'table',
          caption: 'Bảng ghi kết quả đo hiệu điện thế',
          head: ['Nguồn điện', '$U_{\\text{nguồn}}$ (V)', '$U_{\\text{đèn}}$ (V)'],
          rows: [
            ['$1{,}5\\ \\text{V}$', '...', '...'],
            ['$3\\ \\text{V}$', '...', '...'],
          ],
        },
        {
          type: 'p',
          text: 'Báo cáo: vẽ sơ đồ mạch điện có vôn kế; điền bảng; so sánh $U_{\\text{đèn}}$ với $U_{\\text{nguồn}}$; dùng vôn kế kiểm tra thêm một chiếc pin đã dùng lâu và cho biết pin đó cũ hay mới.',
        },
      ],
    },
    {
      heading: 'Nhận xét kết quả',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Kết quả',
          text: 'Với cùng một nguồn điện, cường độ dòng điện tại vị trí $(1)$ và $(2)$ bằng nhau: $I_1 = I_2$. Dòng điện không bị “tiêu thụ” khi đi qua bóng đèn, nên ý kiến của bạn học sinh ở đầu bài là không đúng. Hiệu điện thế giữa hai đầu bóng đèn nhỏ hơn một chút so với hiệu điện thế của nguồn đo khi mạch hở.',
        },
        {
          type: 'list',
          items: [
            'Hiệu điện thế của nguồn càng lớn thì cường độ dòng điện qua đèn càng lớn, đèn càng sáng.',
            'Mạch kín: đèn sáng, kim ampe kế lệch khỏi vạch $0$. Mạch hở (công tắc mở, dây lỏng, đèn đứt dây tóc): đèn không sáng, kim ampe kế vẫn ở vạch $0$.',
            'Pin mới: số chỉ vôn kế bằng số vôn ghi trên pin. Pin cũ: số chỉ vôn kế nhỏ hơn số vôn ghi trên pin.',
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Vì sao kết quả các nhóm khác nhau?',
          text: 'Hiệu điện thế của các nguồn không đúng hẳn $1{,}5\\ \\text{V}$, $3\\ \\text{V}$, $6\\ \\text{V}$; mối nối dây lỏng; đặt mắt đọc kim chưa đúng; dây nối và dụng cụ đo cũng cản trở dòng điện một chút, mỗi bộ dụng cụ một khác (sai số do dụng cụ).',
        },
      ],
    },
  ],
  explore: {
    title: 'Bàn thực hành ảo',
    instruction:
      'Chọn bóng đèn và nguồn điện. Để công tắc mở, vôn kế nối hai cực nguồn và đọc $U_{\\text{nguồn}}$. Đóng công tắc, đặt ampe kế ở vị trí $(1)$ rồi $(2)$ để đọc $I_1$, $I_2$; chuyển vôn kế sang hai đầu bóng đèn để đọc $U_{\\text{đèn}}$. Ghi các số đo vào bảng (dùng dấu phẩy thập phân) rồi bấm "Kiểm tra bảng": mỗi dòng ghi đúng thêm một điểm vào đồ thị $I$ theo $U_{\\text{đèn}}$. Đổi bóng đèn để so sánh hai đường.',
  },
  examples: [
    {
      problem:
        'Trên mặt số một ampe kế có ghi $\\text{A}$, vạch cuối ghi $0{,}6$, giữa hai vạch số liền nhau $0{,}1$ và $0{,}2$ có $10$ khoảng chia. Kim chỉ ở vạch thứ $6$ sau vạch $0{,}4$. (a) Tìm GHĐ và ĐCNN. (b) Đọc số chỉ.',
      steps: [
        'GHĐ là số lớn nhất ghi trên mặt số: $0{,}6\\ \\text{A}$.',
        'ĐCNN là giá trị một khoảng chia: $(0{,}2 - 0{,}1) : 10 = 0{,}01\\ \\text{A}$.',
        'Số chỉ: $I = 0{,}4 + 6 \\cdot 0{,}01 = 0{,}46\\ \\text{A}$.',
      ],
      answer:
        '(a) GHĐ $0{,}6\\ \\text{A}$, ĐCNN $0{,}01\\ \\text{A}$; (b) $I = 0{,}46\\ \\text{A}$.',
    },
    {
      problem:
        'Một nhóm dùng nguồn $6\\ \\text{V}$ và đèn $6\\ \\text{V}$ – $0{,}5\\ \\text{A}$, đo được: $I_1 = 0{,}46\\ \\text{A}$, $I_2 = 0{,}46\\ \\text{A}$, $U_{\\text{nguồn}} = 6{,}0\\ \\text{V}$ (mạch hở), $U_{\\text{đèn}} = 5{,}2\\ \\text{V}$. Nêu nhận xét và giải thích vì sao đèn sáng hơi yếu hơn bình thường.',
      steps: [
        '$I_1 = I_2 = 0{,}46\\ \\text{A}$: cường độ dòng điện trước và sau đèn bằng nhau.',
        '$U_{\\text{đèn}} = 5{,}2\\ \\text{V} < U_{\\text{nguồn}} = 6{,}0\\ \\text{V}$: hiệu điện thế giữa hai đầu đèn nhỏ hơn của nguồn.',
        'Đèn sáng bình thường khi $U = 6\\ \\text{V}$, $I = 0{,}5\\ \\text{A}$. Ở đây $U_{\\text{đèn}}$ và $I$ đều nhỏ hơn số ghi trên đèn nên đèn sáng yếu hơn bình thường một chút.',
      ],
      answer:
        '$I_1 = I_2$; $U_{\\text{đèn}}$ nhỏ hơn $U_{\\text{nguồn}}$; đèn nhận hiệu điện thế và dòng điện nhỏ hơn giá trị định mức nên sáng hơi yếu.',
    },
    {
      problem:
        'Dùng vôn kế đo hai chiếc pin cùng ghi $1{,}5\\ \\text{V}$ khi chưa mắc vào mạch: pin A cho số chỉ $1{,}5\\ \\text{V}$, pin B cho số chỉ $1{,}2\\ \\text{V}$. Pin nào đã cũ? Lắp pin nào vào đèn pin thì đèn sáng hơn?',
      steps: [
        'Pin mới có hiệu điện thế giữa hai cực bằng số vôn ghi trên pin; pin cũ cho số chỉ nhỏ hơn.',
        'Pin B chỉ $1{,}2\\ \\text{V} < 1{,}5\\ \\text{V}$ nên pin B đã cũ.',
        'Hiệu điện thế của nguồn càng lớn thì dòng điện qua đèn càng lớn, đèn càng sáng: lắp pin A đèn sáng hơn.',
      ],
      answer: 'Pin B đã cũ; lắp pin A thì đèn sáng hơn.',
    },
  ],
  practice: [
    {
      type: 'order',
      prompt: 'Sắp xếp các bước đo cường độ dòng điện tại hai vị trí trong mạch theo đúng thứ tự.',
      items: [
        'Đóng công tắc, đọc $I_1$ tại vị trí $(1)$ và ghi vào bảng.',
        'Mắc mạch theo sơ đồ khi công tắc đang mở, ampe kế ở vị trí $(1)$.',
        'Mở công tắc, chuyển ampe kế sang vị trí $(2)$, đóng công tắc và đọc $I_2$.',
        'Nhờ giáo viên kiểm tra mạch.',
        'Thay nguồn khác và lặp lại.',
      ],
      answer: [1, 3, 0, 2, 4],
      hints: [
        'Mạch phải được mắc và kiểm tra trước khi có dòng điện.',
        'Chỉ thay đổi cách mắc khi công tắc đang mở.',
      ],
      solution:
        'Mắc mạch (công tắc mở) → giáo viên kiểm tra → đóng công tắc, đọc $I_1$ → mở công tắc, chuyển ampe kế sang $(2)$, đóng công tắc, đọc $I_2$ → thay nguồn khác, lặp lại.',
    },
    {
      type: 'number',
      prompt:
        'Một vôn kế có GHĐ $6\\ \\text{V}$, giữa hai vạch số liền nhau $2$ và $3$ có $10$ khoảng chia. Kim chỉ ở vạch thứ $3$ sau vạch $2$. Số chỉ của vôn kế là bao nhiêu vôn?',
      answer: 2.3,
      unit: 'V',
      hints: [
        'Tìm ĐCNN: lấy hiệu hai vạch số liền nhau chia cho số khoảng chia.',
        'Số chỉ = giá trị vạch số phía trước kim + số khoảng chia × ĐCNN.',
      ],
      solution:
        'ĐCNN $= (3 - 2) : 10 = 0{,}1\\ \\text{V}$; $U = 2 + 3 \\cdot 0{,}1 = 2{,}3\\ \\text{V}$.',
    },
    {
      type: 'number',
      prompt:
        'Ampe kế có ĐCNN $0{,}01\\ \\text{A}$. Kim chỉ ở vạch thứ $8$ sau vạch $0{,}2$. Số chỉ của ampe kế là bao nhiêu ampe?',
      answer: 0.28,
      unit: 'A',
      hints: ['Mỗi khoảng chia ứng với $0{,}01\\ \\text{A}$.'],
      solution: '$I = 0{,}2 + 8 \\cdot 0{,}01 = 0{,}28\\ \\text{A}$.',
    },
    {
      type: 'choice',
      prompt:
        'Với nguồn $3\\ \\text{V}$, ampe kế ở vị trí $(1)$ (giữa cực dương và đèn) chỉ $0{,}32\\ \\text{A}$. Chuyển ampe kế sang vị trí $(2)$ (giữa đèn và cực âm), số chỉ sẽ là',
      options: [
        '$0\\ \\text{A}$, vì đèn đã dùng hết dòng điện',
        'nhỏ hơn $0{,}32\\ \\text{A}$, vì đèn tiêu thụ bớt dòng điện',
        '$0{,}32\\ \\text{A}$',
        'lớn hơn $0{,}32\\ \\text{A}$',
      ],
      answer: 2,
      hints: ['Mạch chỉ có một vòng, không rẽ nhánh. Điện tích có bị mất đi khi qua đèn không?'],
      solution:
        'Trong mạch nối tiếp, cường độ dòng điện như nhau ở mọi vị trí: $I_2 = I_1 = 0{,}32\\ \\text{A}$. Đèn không “tiêu thụ” dòng điện.',
    },
    {
      type: 'choice',
      prompt:
        'Cần đo cường độ dòng điện qua bóng đèn $6\\ \\text{V}$ – $0{,}5\\ \\text{A}$ khi mắc vào nguồn $6\\ \\text{V}$. Chọn ampe kế phù hợp nhất.',
      options: [
        'GHĐ $0{,}1\\ \\text{A}$, ĐCNN $0{,}002\\ \\text{A}$',
        'GHĐ $0{,}6\\ \\text{A}$, ĐCNN $0{,}01\\ \\text{A}$',
        'GHĐ $3\\ \\text{A}$, ĐCNN $0{,}1\\ \\text{A}$',
        'GHĐ $10\\ \\text{A}$, ĐCNN $0{,}5\\ \\text{A}$',
      ],
      answer: 1,
      hints: [
        'GHĐ phải lớn hơn cường độ dòng điện cần đo (khoảng $0{,}5\\ \\text{A}$).',
        'Trong các ampe kế đủ GHĐ, chọn cái có ĐCNN nhỏ nhất.',
      ],
      solution:
        'Ampe kế GHĐ $0{,}1\\ \\text{A}$ không đủ để đo $0{,}5\\ \\text{A}$. Ba ampe kế còn lại đủ GHĐ; ampe kế GHĐ $0{,}6\\ \\text{A}$ có ĐCNN nhỏ nhất ($0{,}01\\ \\text{A}$) nên đo chính xác nhất.',
    },
    {
      type: 'choice',
      prompt:
        'Đóng công tắc nhưng đèn không sáng và kim ampe kế (mắc nối tiếp, đúng chốt) vẫn chỉ vạch $0$. Kết luận nào đúng?',
      options: [
        'Mạch đang kín, chỉ có đèn bị yếu',
        'Mạch đang hở ở một chỗ nào đó (dây lỏng, đèn đứt dây tóc…)',
        'Ampe kế bị mắc song song',
        'Nguồn điện có hiệu điện thế quá lớn',
      ],
      answer: 1,
      hints: ['Kim ampe kế chỉ vạch $0$ nghĩa là trong mạch có dòng điện không?'],
      solution:
        'Ampe kế chỉ $0$ và đèn không sáng: trong mạch không có dòng điện, tức là mạch hở. Cần kiểm tra các mối nối, công tắc và bóng đèn.',
    },
    {
      type: 'choice',
      prompt:
        'Một chiếc pin ghi $1{,}5\\ \\text{V}$. Mắc vôn kế vào hai cực của pin (chưa nối vào mạch), vôn kế chỉ $1{,}1\\ \\text{V}$. Kết luận nào đúng?',
      options: [
        'Pin còn mới',
        'Pin đã cũ',
        'Vôn kế bị mắc ngược chốt',
        'Pin có hiệu điện thế lớn hơn số ghi',
      ],
      answer: 1,
      hints: ['So sánh số chỉ vôn kế với số vôn ghi trên pin.'],
      solution:
        'Pin mới cho số chỉ bằng số vôn ghi trên pin. Ở đây $1{,}1\\ \\text{V} < 1{,}5\\ \\text{V}$ nên pin đã cũ. (Nếu mắc ngược chốt, kim sẽ lệch về phía dưới vạch $0$.)',
    },
    {
      type: 'choice',
      prompt:
        'Với nguồn $3\\ \\text{V}$ (vôn kế chỉ $3{,}0\\ \\text{V}$ khi mạch hở), hiệu điện thế giữa hai đầu bóng đèn khi đóng công tắc nhiều khả năng là',
      options: [
        '$0\\ \\text{V}$',
        '$2{,}7\\ \\text{V}$',
        '$3{,}0\\ \\text{V}$',
        '$3{,}6\\ \\text{V}$',
      ],
      answer: 1,
      hints: ['Kết quả thực hành: $U_{\\text{đèn}}$ so với $U_{\\text{nguồn}}$ thế nào?'],
      solution:
        'Hiệu điện thế giữa hai đầu bóng đèn nhỏ hơn một chút so với hiệu điện thế của nguồn đo khi mạch hở, nên $2{,}7\\ \\text{V}$ là hợp lí; không thể lớn hơn $3{,}0\\ \\text{V}$, và đèn đang sáng nên không thể bằng $0$.',
    },
    {
      type: 'multi',
      prompt: 'Những nguyên nhân nào làm kết quả đo của các nhóm khác nhau?',
      options: [
        'Hiệu điện thế của các nguồn không đúng hẳn số ghi trên nguồn.',
        'Mối nối dây dẫn lỏng.',
        'Đặt mắt đọc kim dụng cụ đo chưa đúng.',
        'Dây nối và dụng cụ đo ở mỗi nhóm cản trở dòng điện khác nhau.',
        'Cường độ dòng điện giảm dần sau khi đi qua bóng đèn.',
      ],
      answers: [0, 1, 2, 3],
      hints: ['Một phương án mâu thuẫn với kết quả $I_1 = I_2$.'],
      solution:
        'Bốn nguyên nhân đầu đều gây sai khác giữa các nhóm. Phương án cuối sai: cường độ dòng điện trước và sau bóng đèn bằng nhau.',
    },
    {
      type: 'match',
      prompt: 'Ghép mỗi phép đo với cách mắc dụng cụ đo đúng.',
      left: [
        'Đo cường độ dòng điện qua bóng đèn',
        'Đo hiệu điện thế giữa hai đầu bóng đèn',
        'Kiểm tra pin cũ hay mới',
      ],
      right: [
        'Ampe kế mắc nối tiếp với bóng đèn',
        'Vôn kế mắc song song với bóng đèn',
        'Vôn kế nối thẳng vào hai cực của pin',
        'Ampe kế nối thẳng vào hai cực của pin',
      ],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
      hints: ['Ampe kế không bao giờ được nối thẳng vào hai cực nguồn.'],
      solution:
        'Cường độ dòng điện: ampe kế nối tiếp; hiệu điện thế giữa hai đầu đèn: vôn kế song song với đèn; kiểm tra pin: vôn kế nối vào hai cực pin rồi so số chỉ với số ghi trên pin.',
    },
  ],
  takeaways: [
    'Mắc mạch khi công tắc mở; ampe kế nối tiếp, vôn kế song song, chốt $(+)$ về phía cực dương của nguồn; nhờ giáo viên kiểm tra trước khi đóng công tắc.',
    'Đọc số chỉ: xác định GHĐ, ĐCNN; số chỉ = vạch số trước kim + số khoảng chia × ĐCNN.',
    'Trong mạch một vòng, $I_1 = I_2$: dòng điện không bị bóng đèn tiêu thụ.',
    'Hiệu điện thế giữa hai đầu đèn nhỏ hơn một chút so với hiệu điện thế của nguồn; nguồn có hiệu điện thế lớn hơn cho dòng điện lớn hơn.',
    'Kim ampe kế ở vạch $0$, đèn tắt: mạch hở. Vôn kế chỉ nhỏ hơn số ghi trên pin: pin cũ.',
  ],
};
