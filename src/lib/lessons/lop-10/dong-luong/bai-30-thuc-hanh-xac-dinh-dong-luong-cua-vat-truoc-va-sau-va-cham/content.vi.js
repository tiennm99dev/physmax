/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Bài thực hành đo khối lượng và thời gian qua cổng quang điện để xác định động lượng của hai xe trên đệm khí trước và sau va chạm mềm, va chạm đàn hồi, từ đó kiểm nghiệm định luật bảo toàn động lượng.',
  intro:
    'Hai xe va chạm trên đệm khí có thể dính vào nhau, hoặc một xe dừng lại còn xe kia chạy tiếp, hoặc cả hai bật ra. Định luật bảo toàn động lượng nói rằng tổng động lượng không đổi trong mọi trường hợp đó. Trong bài này, em sẽ đo để kiểm chứng điều ấy.',
  objectives: [
    'Thiết kế được phương án và bố trí được thí nghiệm với đệm khí, cổng quang điện.',
    'Đo được thời gian, tính được vận tốc và động lượng của xe trước và sau va chạm.',
    'So sánh được tổng động lượng trước và sau va chạm, chỉ ra được nguyên nhân sai số.',
  ],
  sections: [
    {
      heading: 'Cơ sở lí thuyết',
      blocks: [
        {
          type: 'p',
          text: 'Hai xe chuyển động trên đệm khí nằm ngang: trọng lực và phản lực cân bằng nhau, ma sát rất nhỏ, nên hệ hai xe được coi là hệ kín. Động lượng của hệ phải không đổi.',
        },
        {
          type: 'tex',
          tex: 'm_A\\vec{v_A} + m_B\\vec{v_B} = m_A\\vec{v_A^{\\prime}} + m_B\\vec{v_B^{\\prime}}',
        },
        {
          type: 'p',
          text: 'Khối lượng đo bằng cân điện tử. Tốc độ đo gián tiếp: xe gắn tấm cản quang độ dài $d$ đi qua cổng quang điện, đồng hồ hiện số đo thời gian $t$ tấm cản quang che cổng. Quãng đường ngắn nên coi xe chuyển động thẳng đều:',
        },
        { type: 'tex', tex: 'v = \\frac{d}{t}, \\qquad p = mv' },
        {
          type: 'callout',
          tone: 'note',
          title: 'Đừng quên dấu',
          text: 'Chọn chiều dương là chiều chuyển động ban đầu của xe $A$. Xe đi ngược lại có vận tốc âm. Đồng hồ chỉ cho biết thời gian, nên em phải quan sát hướng xe đi để ghi đúng dấu.',
        },
      ],
    },
    {
      heading: 'Tiến hành thí nghiệm',
      project: true,
      blocks: [
        {
          type: 'p',
          text: 'Mục tiêu: xác định tổng động lượng của hai xe trước và sau va chạm rồi so sánh. Dụng cụ: băng đệm khí và bơm nén khí, hai xe trượt, hai tấm cản quang, hai cổng quang điện, đồng hồ đo thời gian hiện số, cân điện tử, phụ kiện gắn ở đầu xe để hai xe dính vào nhau hoặc bật ra.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Cân khối lượng $m_A$, $m_B$ của hai xe. Đo độ dài $d$ của tấm cản quang.',
            'Đặt đệm khí nằm ngang, nối với bơm khí. Lắp hai cổng quang điện cách nhau một khoảng, nối với đồng hồ hiện số. Bật bơm và kiểm tra đệm khí nằm ngang: xe đặt lên phải đứng yên.',
            'Đặt xe $B$ đứng yên giữa hai cổng, xe $A$ ở ngoài cổng $1$. Gắn phụ kiện cho va chạm mềm.',
            'Đẩy nhẹ xe $A$ qua cổng $1$ đến va chạm với xe $B$. Ghi thời gian $t$ tại cổng $1$, thời gian $t^{\\prime}$ khi hai xe dính nhau qua cổng $2$.',
            'Đo ít nhất $3$ lần. Ghi vào bảng thứ nhất.',
            'Đổi phụ kiện để có va chạm đàn hồi, đo tương tự: ghi thời gian xe $A$ trước va chạm, xe $B$ sau va chạm và xe $A$ sau va chạm nếu xe $A$ còn đi qua một cổng.',
            'Tính vận tốc, động lượng từng xe và tổng động lượng, tính độ lệch $\\dfrac{|p - p^{\\prime}|}{p} \\cdot 100\\%$.',
          ],
        },
        {
          type: 'table',
          caption: 'Mẫu bảng ghi số liệu cho va chạm mềm',
          head: [
            'Lần đo',
            '$t$ (s)',
            '$v_A$ (m/s)',
            '$p$ (kg.m/s)',
            '$t^{\\prime}$ (s)',
            '$V$ (m/s)',
            '$p^{\\prime}$ (kg.m/s)',
          ],
          rows: [
            ['1', '…', '…', '…', '…', '…', '…'],
            ['2', '…', '…', '…', '…', '…', '…'],
            ['3', '…', '…', '…', '…', '…', '…'],
          ],
        },
        {
          type: 'table',
          caption: 'Mẫu bảng ghi số liệu cho va chạm đàn hồi',
          head: [
            'Lần đo',
            '$t_A$ (s)',
            '$p$ (kg.m/s)',
            '$t_A^{\\prime}$ (s)',
            '$t_B^{\\prime}$ (s)',
            '$v_A^{\\prime}$ (m/s)',
            '$v_B^{\\prime}$ (m/s)',
            '$p^{\\prime}$ (kg.m/s)',
          ],
          rows: [
            ['1', '…', '…', '…', '…', '…', '…', '…'],
            ['2', '…', '…', '…', '…', '…', '…', '…'],
            ['3', '…', '…', '…', '…', '…', '…', '…'],
          ],
        },
        {
          type: 'p',
          text: 'Báo cáo: nộp hai bảng số liệu, nhận xét tổng động lượng trước và sau va chạm trong mỗi trường hợp, kết luận về định luật bảo toàn động lượng, nêu các nguyên nhân gây sai số và đề xuất một phương án khác, ví dụ quay video chuyển động của xe rồi phân tích bằng phần mềm.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Hạn chế sai số',
          text: 'Chỉnh đệm khí thật nằm ngang và không chạm tay vào xe khi xe đang chạy. Đẩy xe nhẹ để va chạm không làm tấm cản quang rung. Bố trí cổng gần chỗ va chạm để ma sát và lực cản không khí ảnh hưởng ít.',
        },
      ],
    },
  ],
  explore: {
    title: 'Đệm khí ảo với cổng quang',
    instruction:
      'Chọn loại va chạm, khối lượng hai xe, rồi đẩy xe $A$. Đọc thời gian trên đồng hồ, tự tính tổng động lượng trước và sau va chạm, nhập vào để ghi vào bảng. Làm ít nhất một lần mỗi loại va chạm, thử cả xe nhẹ va vào xe nặng. Số đo có sai số nhỏ như thí nghiệm thật.',
  },
  examples: [
    {
      problem:
        'Va chạm mềm: $m_A = m_B = 0{,}4$ kg, xe $B$ đứng yên, $d = 0{,}1$ m. Xe $A$ qua cổng $1$ trong $t = 0{,}200$ s, hai xe dính nhau qua cổng $2$ trong $t^{\\prime} = 0{,}408$ s. So sánh tổng động lượng trước và sau va chạm.',
      steps: [
        '$v_A = \\dfrac{0{,}1}{0{,}200} = 0{,}5$ m/s, nên $p = 0{,}4 \\cdot 0{,}5 = 0{,}200$ kg.m/s.',
        '$V = \\dfrac{0{,}1}{0{,}408} \\approx 0{,}245$ m/s, nên $p^{\\prime} = 0{,}8 \\cdot 0{,}245 \\approx 0{,}196$ kg.m/s.',
        'Độ lệch: $\\dfrac{0{,}200 - 0{,}196}{0{,}200} \\cdot 100\\% = 2\\%$.',
      ],
      answer: 'Hai giá trị lệch khoảng $2\\%$: trong giới hạn sai số, động lượng được bảo toàn.',
    },
    {
      problem:
        'Va chạm đàn hồi: $m_A = 0{,}2$ kg, $m_B = 0{,}4$ kg, xe $B$ đứng yên, $d = 0{,}1$ m. Xe $A$ qua cổng $1$ trong $0{,}200$ s rồi bật ngược lại, qua cổng $1$ lần nữa trong $0{,}610$ s. Xe $B$ qua cổng $2$ trong $0{,}305$ s. So sánh tổng động lượng.',
      steps: [
        'Chọn chiều dương là chiều ban đầu của xe $A$. $v_A = 0{,}5$ m/s, nên $p = 0{,}2 \\cdot 0{,}5 = 0{,}100$ kg.m/s.',
        'Xe $A$ bật ngược nên $v_A^{\\prime} = -\\dfrac{0{,}1}{0{,}610} \\approx -0{,}164$ m/s; $v_B^{\\prime} = \\dfrac{0{,}1}{0{,}305} \\approx 0{,}328$ m/s.',
        '$p^{\\prime} = 0{,}2 \\cdot (-0{,}164) + 0{,}4 \\cdot 0{,}328 \\approx 0{,}098$ kg.m/s.',
      ],
      answer:
        'Hai giá trị lệch khoảng $2\\%$. Nếu quên dấu âm của xe $A$, ta sẽ tính sai $p^{\\prime} \\approx 0{,}164$ kg.m/s.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt:
        'Tấm cản quang dài $0{,}1$ m đi qua cổng quang điện trong $0{,}250$ s. Tính tốc độ của xe.',
      answer: 0.4,
      unit: 'm/s',
      hints: ['$v = \\dfrac{d}{t}$.'],
      solution: '$v = \\dfrac{0{,}1}{0{,}250} = 0{,}4$ m/s.',
    },
    {
      type: 'number',
      prompt:
        'Xe $0{,}4$ kg có tấm cản quang dài $0{,}1$ m, qua cổng quang điện trong $0{,}200$ s. Tính độ lớn động lượng của xe.',
      answer: 0.2,
      tolerance: 0.001,
      unit: 'kg.m/s',
      hints: ['Tính tốc độ trước rồi nhân với khối lượng.'],
      solution:
        '$v = \\dfrac{0{,}1}{0{,}200} = 0{,}5$ m/s; $p = 0{,}4 \\cdot 0{,}5 = 0{,}2$ kg.m/s.',
    },
    {
      type: 'number',
      prompt:
        'Trong một lần đo, $p = 0{,}250$ kg.m/s và $p^{\\prime} = 0{,}245$ kg.m/s. Độ lệch tương đối bằng bao nhiêu phần trăm?',
      answer: 2,
      tolerance: 0.05,
      unit: '%',
      hints: ['Chia hiệu của hai giá trị cho $p$.'],
      solution: '$\\dfrac{0{,}250 - 0{,}245}{0{,}250} \\cdot 100\\% = 2\\%$.',
    },
    {
      type: 'number',
      prompt:
        'Va chạm đàn hồi giữa xe $A$ $0{,}3$ kg và xe $B$ $0{,}3$ kg đang đứng yên. Xe $A$ có tốc độ $0{,}6$ m/s trước va chạm và dừng lại sau đó. Theo định luật bảo toàn động lượng, xe $B$ sau va chạm có tốc độ bao nhiêu?',
      answer: 0.6,
      unit: 'm/s',
      hints: ['Hai xe bằng nhau, xe $A$ truyền toàn bộ chuyển động.'],
      solution:
        '$0{,}3 \\cdot 0{,}6 = 0{,}3 \\cdot v_B^{\\prime}$, nên $v_B^{\\prime} = 0{,}6$ m/s.',
    },
    {
      type: 'number',
      prompt:
        'Va chạm đàn hồi: $m_A = 0{,}2$ kg, $m_B = 0{,}6$ kg. Sau va chạm xe $A$ bật ngược lại với tốc độ $0{,}2$ m/s, xe $B$ đi tiếp với tốc độ $0{,}2$ m/s. Tính tổng động lượng của hệ sau va chạm, lấy chiều dương là chiều ban đầu của xe $A$.',
      answer: 0.08,
      tolerance: 0.001,
      unit: 'kg.m/s',
      hints: ['Vận tốc của xe $A$ mang dấu âm.'],
      solution:
        '$p^{\\prime} = 0{,}2 \\cdot (-0{,}2) + 0{,}6 \\cdot 0{,}2 = -0{,}04 + 0{,}12 = 0{,}08$ kg.m/s.',
    },
    {
      type: 'choice',
      prompt: 'Vì sao có thể coi hai xe trên đệm khí nằm ngang là một hệ kín?',
      options: [
        'Trọng lực và phản lực cân bằng, ma sát rất nhỏ nên coi như không có ngoại lực',
        'Hai xe có khối lượng bằng nhau',
        'Hai xe chuyển động với tốc độ nhỏ',
        'Hai xe được nối với đồng hồ đo thời gian',
      ],
      answer: 0,
      hints: ['Hệ kín được định nghĩa dựa vào ngoại lực.'],
      solution:
        'Đệm khí nâng xe lên, giảm ma sát rất nhiều; đệm nằm ngang nên trọng lực và phản lực cân bằng. Do đó coi như không có ngoại lực tác dụng lên hệ.',
    },
    {
      type: 'multi',
      prompt: 'Nguyên nhân nào có thể làm tổng động lượng đo được trước và sau va chạm lệch nhau?',
      options: [
        'Đệm khí đặt chưa thật nằm ngang',
        'Vẫn còn ma sát và lực cản không khí nhỏ',
        'Tấm cản quang đo độ dài chưa chính xác',
        'Màu sơn của hai xe khác nhau',
      ],
      answers: [0, 1, 2],
      hints: ['Những yếu tố nào làm thay đổi tốc độ xe hoặc số đo?'],
      solution:
        'Đệm nghiêng, ma sát, lực cản làm thay đổi động lượng của hệ; đo $d$ sai làm sai vận tốc tính được. Màu sơn không ảnh hưởng.',
    },
    {
      type: 'order',
      prompt: 'Sắp xếp các bước của thí nghiệm va chạm mềm theo đúng thứ tự.',
      items: [
        'Cân khối lượng hai xe',
        'Lắp cổng quang điện, bật bơm và chỉnh đệm khí nằm ngang',
        'Đẩy xe $A$ đến va chạm với xe $B$ đang đứng yên',
        'Ghi thời gian ở hai cổng quang điện',
        'Tính và so sánh tổng động lượng',
      ],
      answer: [0, 1, 2, 3, 4],
      hints: ['Phải có các số đo rồi mới tính được.'],
      solution:
        'Cân xe, lắp đặt và chỉnh thiết bị, đẩy xe $A$, ghi thời gian, rồi tính và so sánh tổng động lượng.',
    },
  ],
  takeaways: [
    'Hai xe trên đệm khí nằm ngang được coi là hệ kín.',
    'Tốc độ xác định qua cổng quang: $v = \\dfrac{d}{t}$; động lượng $p = mv$, kèm dấu theo chiều chuyển động.',
    'Kết quả đo: tổng động lượng trước và sau va chạm bằng nhau trong giới hạn sai số, với cả va chạm mềm và đàn hồi.',
    'Sai số đến từ đệm chưa nằm ngang, ma sát còn lại, lực cản không khí và phép đo độ dài, thời gian.',
  ],
};
