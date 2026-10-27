/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Thực hành đo năng lượng nhiệt mà nước trong bình nhiệt lượng kế nhận được khi bị đun nóng: năng lượng điện đo bằng joulemeter chuyển hóa thành năng lượng nhiệt trên dây đốt và làm nóng nước. Ghi số chỉ joulemeter khi nhiệt độ nước tăng thêm 3 °C, 6 °C, 9 °C với hai lượng nước khác nhau và nhận xét.',
  intro:
    'Muốn đun nóng một lượng nước xác định thêm vài độ thì cần cung cấp bao nhiêu năng lượng nhiệt? Đun nhiều nước hơn thì cần nhiều năng lượng hơn bao nhiêu? Trong bài thực hành này, em dùng joulemeter để đo năng lượng cung cấp cho nước và tìm câu trả lời bằng số liệu của chính mình.',
  objectives: [
    'Mô tả được cách bố trí và tiến hành thí nghiệm đo năng lượng nhiệt mà nước nhận được khi bị đun nóng bằng joulemeter.',
    'Đo được năng lượng nhiệt mà nước nhận được ứng với các độ tăng nhiệt độ khác nhau, ghi kết quả vào bảng.',
    'Rút ra được nhận xét: năng lượng nhiệt cần cung cấp càng lớn khi độ tăng nhiệt độ càng lớn và lượng nước càng nhiều.',
  ],
  sections: [
    {
      heading: 'Chuẩn bị và cách dùng joulemeter',
      blocks: [
        {
          type: 'table',
          caption: 'Dụng cụ cho mỗi nhóm',
          head: ['Dụng cụ', 'Công dụng'],
          rows: [
            [
              'Bình nhiệt lượng kế có dây đốt và que khuấy',
              'Chứa một lượng nước xác định; dây đốt nóng lên khi có dòng điện chạy qua và đun nóng nước',
            ],
            ['Nhiệt kế', 'Đo nhiệt độ của nước trong bình'],
            [
              'Joulemeter',
              'Đo năng lượng điện mà nguồn cung cấp cho dây đốt, đơn vị jun ($\\text{J}$)',
            ],
            ['Nguồn điện $12\\ \\text{V}$ (biến áp nguồn)', 'Cung cấp điện cho dây đốt'],
            [
              'Bốn dây nối có giắc cắm ở hai đầu',
              'Nối nguồn với joulemeter, joulemeter với dây đốt',
            ],
          ],
        },
        {
          type: 'p',
          text: 'Joulemeter được mắc giữa nguồn điện và dây đốt: hai lỗ cắm vào nối với nguồn, hai lỗ cắm ra nối với dây đốt. Trên màn hình, joulemeter cho biết năng lượng điện đã cung cấp cho dây đốt tính bằng jun; nhiều loại còn hiện công suất và thời gian.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Vì sao đo năng lượng điện lại biết năng lượng nhiệt?',
          text: 'Toàn bộ năng lượng điện mà dây đốt nhận được chuyển hóa thành năng lượng nhiệt của dây đốt rồi truyền cho nước. Nếu bỏ qua phần nhỏ làm nóng bình, que khuấy và tỏa ra không khí, số chỉ joulemeter chính là năng lượng nhiệt mà nước nhận được.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'An toàn',
          text: 'Nước phải ngập dây đốt và đầu đo của nhiệt kế trước khi bật nguồn. Kiểm tra lại cách mắc mạch điện trước khi bật nguồn. Không chạm tay vào dây đốt; tắt nguồn ngay sau khi đo xong.',
        },
      ],
    },
    {
      heading: 'Tiến hành thí nghiệm',
      project: true,
      blocks: [
        {
          type: 'p',
          text: 'Mục tiêu: đo năng lượng nhiệt mà nước trong bình nhiệt lượng kế nhận được khi nhiệt độ của nước tăng thêm $3\\ ^\\circ\\text{C}$, $6\\ ^\\circ\\text{C}$, $9\\ ^\\circ\\text{C}$ so với nhiệt độ ban đầu, với hai lượng nước khác nhau.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Cân và đổ một lượng nước xác định vào bình nhiệt lượng kế (ví dụ $100\\ \\text{g}$) sao cho nước ngập dây đốt và đầu đo của nhiệt kế.',
            'Mắc mạch điện: nguồn điện nối với joulemeter, joulemeter nối với dây đốt. Đặt số chỉ joulemeter về $0$.',
            'Khuấy nhẹ nước, đọc nhiệt độ ban đầu của nước, ghi vào dòng "Bắt đầu đo".',
            'Bật nguồn. Vừa khuấy nhẹ vừa theo dõi nhiệt kế. Khi nhiệt độ tăng thêm $3\\ ^\\circ\\text{C}$, $6\\ ^\\circ\\text{C}$, $9\\ ^\\circ\\text{C}$, đọc số chỉ joulemeter và ghi vào bảng.',
            'Tắt nguồn. Lặp lại thí nghiệm với lượng nước nhiều hơn (ví dụ $200\\ \\text{g}$), ghi vào bảng thứ hai.',
          ],
        },
        {
          type: 'table',
          caption: 'Bảng số liệu đo năng lượng nhiệt (mỗi lượng nước một bảng)',
          head: ['Lần đo', '$t$ ($^\\circ\\text{C}$)', 'Năng lượng nhiệt ($\\text{J}$)'],
          rows: [
            ['Bắt đầu đo', '...', '$0$'],
            ['Tăng $3\\ ^\\circ\\text{C}$', '...', '...'],
            ['Tăng $6\\ ^\\circ\\text{C}$', '...', '...'],
            ['Tăng $9\\ ^\\circ\\text{C}$', '...', '...'],
          ],
        },
        {
          type: 'p',
          text: 'Báo cáo: mục đích thí nghiệm; dụng cụ; các bước tiến hành; hai bảng số liệu; nhận xét năng lượng nhiệt cần thiết để đun nước theo độ tăng nhiệt độ và theo lượng nước; trả lời: có thể ước tính năng lượng nhiệt cần để đun lượng nước trong bình tới sôi ($100\\ ^\\circ\\text{C}$) được không, giải thích.',
        },
      ],
    },
    {
      heading: 'Nhận xét kết quả',
      blocks: [
        {
          type: 'p',
          text: 'Một nhóm học sinh đo được kết quả như sau (nước ban đầu ở $25\\ ^\\circ\\text{C}$):',
        },
        {
          type: 'table',
          caption: 'Kết quả mẫu',
          head: ['Độ tăng nhiệt độ', '$100\\ \\text{g}$ nước', '$200\\ \\text{g}$ nước'],
          rows: [
            ['$3\\ ^\\circ\\text{C}$', '$1\\,410\\ \\text{J}$', '$2\\,670\\ \\text{J}$'],
            ['$6\\ ^\\circ\\text{C}$', '$2\\,820\\ \\text{J}$', '$5\\,340\\ \\text{J}$'],
            ['$9\\ ^\\circ\\text{C}$', '$4\\,230\\ \\text{J}$', '$8\\,010\\ \\text{J}$'],
          ],
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Kết luận',
          text: 'Với cùng một lượng nước, độ tăng nhiệt độ càng lớn thì năng lượng nhiệt cần cung cấp càng lớn; độ tăng nhiệt độ gấp đôi, gấp ba thì năng lượng nhiệt cũng gấp đôi, gấp ba. Với cùng độ tăng nhiệt độ, lượng nước càng nhiều thì năng lượng nhiệt cần cung cấp càng lớn.',
        },
        {
          type: 'p',
          text: 'Vì năng lượng nhiệt tỉ lệ với độ tăng nhiệt độ, từ số liệu có thể ước tính năng lượng cần để đun nước tới sôi. Ví dụ với $100\\ \\text{g}$ nước: cứ tăng $1\\ ^\\circ\\text{C}$ cần $1\\,410 : 3 = 470\\ \\text{J}$; từ $25\\ ^\\circ\\text{C}$ lên $100\\ ^\\circ\\text{C}$ (tăng $75\\ ^\\circ\\text{C}$) cần khoảng $75 \\cdot 470 = 35\\,250\\ \\text{J}$.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Vì sao $200\\ \\text{g}$ nước chưa cần gấp đôi năng lượng?',
          text: 'Trong bảng mẫu, $200\\ \\text{g}$ nước cần khoảng $1{,}9$ lần năng lượng của $100\\ \\text{g}$ nước chứ chưa đủ gấp đôi, vì joulemeter đo cả phần năng lượng làm nóng bình, dây đốt và que khuấy (phần này như nhau ở hai lần đo). Ngoài ra, một phần năng lượng tỏa ra không khí; khuấy chưa đều, đọc nhiệt kế chậm cũng gây sai số.',
        },
      ],
    },
  ],
  explore: {
    title: 'Bàn thí nghiệm joulemeter ảo',
    instruction:
      'Chọn lượng nước, đặt joulemeter về $0$ và bấm "Ghi số liệu" để ghi dòng "Bắt đầu đo". Bật nguồn; mỗi khi nhiệt độ tăng thêm khoảng $3\\ ^\\circ\\text{C}$, bấm "Ghi số liệu". Sau đó đổi sang lượng nước kia và đo lại, so sánh hai đường trên đồ thị.',
  },
  examples: [
    {
      problem:
        'Đun $100\\ \\text{g}$ nước bằng dây đốt nối qua joulemeter. Khi nhiệt độ nước tăng thêm $3\\ ^\\circ\\text{C}$, joulemeter chỉ $1\\,410\\ \\text{J}$. Ước tính số chỉ joulemeter khi nhiệt độ tăng thêm $9\\ ^\\circ\\text{C}$.',
      steps: [
        'Với cùng một lượng nước, năng lượng nhiệt cần cung cấp tỉ lệ với độ tăng nhiệt độ.',
        'Độ tăng nhiệt độ gấp $9 : 3 = 3$ lần.',
        'Năng lượng cần cung cấp: $3 \\cdot 1\\,410 = 4\\,230\\ \\text{J}$.',
      ],
      answer: 'Khoảng $4\\,230\\ \\text{J}$.',
    },
    {
      problem:
        'Bảng của một nhóm: bắt đầu đo $28{,}0\\ ^\\circ\\text{C}$, joulemeter $150\\ \\text{J}$ (nhóm quên đặt về $0$); khi nước ở $31{,}0\\ ^\\circ\\text{C}$, joulemeter chỉ $1\\,560\\ \\text{J}$. Năng lượng nhiệt nước nhận được khi tăng $3\\ ^\\circ\\text{C}$ là bao nhiêu?',
      steps: [
        'Joulemeter chưa ở $0$ lúc bắt đầu, nên năng lượng nhận được bằng hiệu hai số chỉ.',
        'Năng lượng nhận được: $1\\,560 - 150 = 1\\,410\\ \\text{J}$.',
      ],
      answer: '$1\\,410\\ \\text{J}$.',
    },
    {
      problem:
        'Có thể ước tính năng lượng nhiệt cần để đun $100\\ \\text{g}$ nước trong bình từ $25\\ ^\\circ\\text{C}$ tới sôi không, nếu biết tăng $3\\ ^\\circ\\text{C}$ cần $1\\,410\\ \\text{J}$?',
      steps: [
        'Được, vì năng lượng nhiệt tỉ lệ với độ tăng nhiệt độ.',
        'Mỗi $1\\ ^\\circ\\text{C}$ cần $1\\,410 : 3 = 470\\ \\text{J}$.',
        'Từ $25\\ ^\\circ\\text{C}$ tới $100\\ ^\\circ\\text{C}$ tăng $75\\ ^\\circ\\text{C}$, cần $75 \\cdot 470 = 35\\,250\\ \\text{J}$.',
      ],
      answer: 'Khoảng $35\\,250\\ \\text{J}$ (chưa kể phần tỏa ra môi trường).',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Trong bài thực hành, joulemeter dùng để đo',
      options: [
        'nhiệt độ của nước',
        'năng lượng điện mà nguồn cung cấp cho dây đốt',
        'khối lượng nước trong bình',
        'thời gian sôi của nước',
      ],
      answer: 1,
      hints: ['Đơn vị trên màn hình joulemeter là jun ($\\text{J}$).'],
      solution:
        'Joulemeter đo năng lượng điện mà nguồn cung cấp cho dây đốt; năng lượng này chuyển hóa thành năng lượng nhiệt làm nóng nước.',
    },
    {
      type: 'order',
      prompt: 'Sắp xếp các bước thí nghiệm theo đúng thứ tự.',
      items: [
        'Bật nguồn, khuấy nhẹ và ghi số chỉ joulemeter khi nhiệt độ tăng thêm 3 °C, 6 °C, 9 °C',
        'Đổ lượng nước xác định vào bình sao cho ngập dây đốt và đầu nhiệt kế',
        'Mắc nguồn, joulemeter và dây đốt; đặt joulemeter về 0',
        'Đọc và ghi nhiệt độ ban đầu của nước',
        'Tắt nguồn, lặp lại với lượng nước nhiều hơn',
      ],
      answer: [1, 2, 3, 0, 4],
      hints: [
        'Phải có nước trong bình trước khi bật nguồn.',
        'Ghi dòng "Bắt đầu đo" trước khi đun.',
      ],
      solution:
        'Đổ nước vào bình → mắc mạch, đặt joulemeter về $0$ → ghi nhiệt độ ban đầu → bật nguồn và ghi số liệu theo các mức tăng nhiệt độ → tắt nguồn, lặp lại với lượng nước nhiều hơn.',
    },
    {
      type: 'number',
      prompt:
        'Đun một lượng nước, khi nhiệt độ tăng $3\\ ^\\circ\\text{C}$ thì joulemeter chỉ $1\\,500\\ \\text{J}$. Ước tính số chỉ joulemeter khi nhiệt độ tăng $6\\ ^\\circ\\text{C}$ (bắt đầu từ $0\\ \\text{J}$).',
      answer: 3000,
      unit: 'J',
      hints: ['Cùng lượng nước: năng lượng tỉ lệ với độ tăng nhiệt độ.'],
      solution:
        'Độ tăng nhiệt độ gấp đôi nên năng lượng gấp đôi: $2 \\cdot 1\\,500 = 3\\,000\\ \\text{J}$.',
    },
    {
      type: 'number',
      prompt:
        'Lúc bắt đầu đo, joulemeter chỉ $320\\ \\text{J}$. Khi nước tăng thêm $6\\ ^\\circ\\text{C}$, joulemeter chỉ $3\\,140\\ \\text{J}$. Nước đã nhận bao nhiêu jun?',
      answer: 2820,
      unit: 'J',
      hints: ['Năng lượng nhận được bằng hiệu hai số chỉ.'],
      solution: '$3\\,140 - 320 = 2\\,820\\ \\text{J}$.',
    },
    {
      type: 'choice',
      prompt:
        'Bốn bình A, B, C, D chứa nước cùng nhiệt độ ban đầu, lần lượt $100\\ \\text{g}$, $50\\ \\text{g}$, $150\\ \\text{g}$, $200\\ \\text{g}$. Đun bằng bốn đèn cồn giống hệt nhau trong cùng thời gian. Nước ở bình nào nóng nhất?',
      options: ['Bình A', 'Bình B', 'Bình C', 'Bình D'],
      answer: 1,
      hints: [
        'Các bình nhận năng lượng nhiệt như nhau.',
        'Cùng năng lượng nhiệt, lượng nước càng ít thì nhiệt độ tăng thế nào?',
      ],
      solution:
        'Đèn giống nhau, đun cùng thời gian nên các bình nhận năng lượng nhiệt như nhau. Bình B ít nước nhất nên nhiệt độ tăng nhiều nhất, nóng nhất. Điều làm nhiệt độ các bình khác nhau là lượng nước trong từng bình.',
    },
    {
      type: 'number',
      prompt:
        'Với một lượng nước trong bình, cứ tăng $1\\ ^\\circ\\text{C}$ cần $890\\ \\text{J}$. Ước tính năng lượng nhiệt cần để đun nước từ $30\\ ^\\circ\\text{C}$ lên $40\\ ^\\circ\\text{C}$.',
      answer: 8900,
      unit: 'J',
      hints: ['Tính độ tăng nhiệt độ trước.'],
      solution:
        'Độ tăng nhiệt độ $40 - 30 = 10\\ ^\\circ\\text{C}$; năng lượng cần $10 \\cdot 890 = 8\\,900\\ \\text{J}$.',
    },
    {
      type: 'choice',
      prompt: 'Vì sao cần khuấy nhẹ nước trước mỗi lần đọc nhiệt kế?',
      options: [
        'Để nước sôi nhanh hơn',
        'Để nhiệt độ nước trong bình đều nhau, nhiệt kế chỉ đúng nhiệt độ của cả lượng nước',
        'Để joulemeter chỉ số lớn hơn',
        'Để nước không bay hơi',
      ],
      answer: 1,
      hints: ['Nước ở gần dây đốt nóng hơn nước ở xa.'],
      solution:
        'Nước gần dây đốt nóng hơn nước ở xa. Khuấy nhẹ làm nhiệt độ nước đều nhau, nhiệt kế mới chỉ đúng nhiệt độ của cả lượng nước.',
    },
    {
      type: 'multi',
      prompt:
        'Số chỉ joulemeter thường lớn hơn một chút so với năng lượng chỉ riêng nước nhận được. Nguyên nhân là',
      options: [
        'bình nhiệt lượng kế, dây đốt và que khuấy cũng nóng lên',
        'một phần năng lượng nhiệt tỏa ra không khí xung quanh',
        'nước tự sinh ra năng lượng',
        'nhiệt kế làm lạnh nước',
      ],
      answers: [0, 1],
      hints: ['Năng lượng điện chuyển thành năng lượng nhiệt, rồi đi đến những đâu?'],
      solution:
        'Năng lượng nhiệt từ dây đốt còn làm nóng bình, dây đốt, que khuấy và một phần tỏa ra không khí, nên nước nhận ít hơn số chỉ joulemeter một chút.',
    },
  ],
  takeaways: [
    'Joulemeter đo năng lượng điện cung cấp cho dây đốt; năng lượng này chuyển hóa thành năng lượng nhiệt làm nóng nước.',
    'Đặt joulemeter về $0$ (hoặc ghi số chỉ ban đầu) và ghi nhiệt độ ban đầu trước khi bật nguồn; khuấy nhẹ trước khi đọc nhiệt kế.',
    'Cùng một lượng nước: độ tăng nhiệt độ càng lớn thì năng lượng nhiệt cần cung cấp càng lớn, tỉ lệ với độ tăng nhiệt độ.',
    'Cùng độ tăng nhiệt độ: lượng nước càng nhiều thì năng lượng nhiệt cần cung cấp càng lớn.',
  ],
};
