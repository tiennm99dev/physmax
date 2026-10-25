/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Đơn vị lực là niutơn (N), đo lực bằng lực kế; mỗi lực có điểm đặt, phương, chiều và độ lớn, và được biểu diễn bằng một mũi tên vẽ theo tỉ xích cho trước.',
  intro:
    'Trong trận kéo co, đội nào kéo mạnh hơn sẽ thắng. Ta không nhìn thấy lực, vậy làm sao biết lực mạnh hay yếu, kéo theo hướng nào, và làm sao vẽ được một lực lên giấy để người khác đọc hiểu?',
  objectives: [
    'Nêu được đơn vị lực là niutơn (N) và dụng cụ đo lực là lực kế; đo được lực bằng lực kế.',
    'Nêu được các đặc trưng của lực: điểm đặt, phương, chiều và độ lớn.',
    'Biểu diễn được một lực bằng mũi tên theo tỉ xích cho trước, và đọc được lực từ một mũi tên đã vẽ.',
  ],
  sections: [
    {
      heading: 'Độ lớn và đơn vị của lực',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Độ lớn của lực',
          text: 'Độ mạnh hay yếu của một lực được gọi là độ lớn (cường độ) của lực.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Đơn vị lực',
          text: 'Trong hệ đơn vị đo lường hợp pháp của Việt Nam, đơn vị lực là niutơn, kí hiệu là $\\text{N}$.',
        },
        {
          type: 'table',
          caption: 'Độ lớn của một số lực thường gặp (giá trị gần đúng)',
          head: ['Lực', 'Độ lớn'],
          rows: [
            ['Ngón tay ấn nút bút bi', 'khoảng $1\\ \\text{N}$'],
            ['Lực sĩ nâng quả tạ', 'có thể tới $2400\\ \\text{N}$'],
            ['Động cơ xe tải kéo xe', 'có thể tới $10\\,000\\ \\text{N}$'],
          ],
        },
        {
          type: 'p',
          text: 'Dụng cụ đo lực là lực kế. Lực kế thường dùng trong phòng thí nghiệm là lực kế lò xo: một lò xo gắn với kim chỉ thị chạy trên bảng chia độ. Mỗi lực kế có giới hạn đo (GHĐ) và độ chia nhỏ nhất (ĐCNN) ghi trên bảng chia độ.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Ước lượng độ lớn của lực cần đo.',
            'Chọn lực kế có GHĐ và ĐCNN phù hợp.',
            'Hiệu chỉnh lực kế: khi chưa đo, kim chỉ thị phải nằm đúng vạch số $0$.',
            'Móc vật vào lực kế, hoặc kéo, giữ lực kế sao cho lò xo nằm dọc theo phương của lực cần đo.',
            'Đọc và ghi kết quả đo theo vạch chia gần nhất với kim chỉ thị.',
          ],
        },
      ],
    },
    {
      heading: 'Các đặc trưng của lực',
      blocks: [
        {
          type: 'p',
          text: 'Mỗi lực có bốn đặc trưng (yếu tố): điểm đặt, phương, chiều và độ lớn.',
        },
        {
          type: 'table',
          head: ['Đặc trưng', 'Ý nghĩa', 'Ví dụ: tay kéo thùng hàng sang phải'],
          rows: [
            ['Điểm đặt', 'Vị trí mà lực tác dụng lên vật', 'Chỗ dây buộc vào thùng'],
            ['Phương', 'Đường thẳng mà lực tác dụng dọc theo', 'Nằm ngang'],
            ['Chiều', 'Lực hướng về phía nào trên phương đó', 'Từ trái sang phải'],
            ['Độ lớn', 'Lực mạnh hay yếu, đo bằng niutơn', '$30\\ \\text{N}$'],
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Phương khác chiều',
          text: 'Một phương có hai chiều. Phương nằm ngang có chiều từ trái sang phải và chiều từ phải sang trái; phương thẳng đứng có chiều từ dưới lên trên và chiều từ trên xuống dưới. Hai đội kéo co kéo sợi dây cùng phương nhưng ngược chiều.',
        },
      ],
    },
    {
      heading: 'Biểu diễn lực bằng mũi tên',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Cách biểu diễn lực',
          text: 'Lực được biểu diễn bằng một mũi tên có: gốc là điểm đặt của lực; phương và chiều trùng với phương và chiều của lực; độ dài biểu diễn độ lớn của lực theo một tỉ xích cho trước.',
        },
        {
          type: 'p',
          text: 'Kí hiệu véc tơ lực là $\\vec{F}$; độ lớn của lực kí hiệu là $F$. Tỉ xích cho biết mỗi đoạn dài bao nhiêu thì ứng với bao nhiêu niutơn, ví dụ: $1\\ \\text{cm}$ ứng với $10\\ \\text{N}$.',
        },
        {
          type: 'tex',
          tex: '\\text{độ dài mũi tên} = \\dfrac{\\text{độ lớn của lực}}{\\text{số niutơn ứng với một đơn vị độ dài}}',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Đọc một mũi tên lực',
          text: 'Ngược lại, biết tỉ xích và đo độ dài mũi tên, ta tính được độ lớn của lực: mũi tên dài $3\\ \\text{cm}$, tỉ xích $1\\ \\text{cm}$ ứng với $10\\ \\text{N}$ thì lực có độ lớn $3 \\cdot 10 = 30\\ \\text{N}$.',
        },
      ],
    },
  ],
  explore: {
    title: 'Vẽ mũi tên lực trên lưới',
    instruction:
      'Chọn một lực, đọc đề, rồi kéo gốc (chấm xanh) và ngọn (chấm đỏ) của mũi tên trên lưới ô vuông; cũng có thể nhấn Tab để chọn một chấm rồi dùng phím mũi tên. Dòng dưới hình cho biết mũi tên em vẽ đang ứng với lực nào. Nhấn "Kiểm tra" để xem từng đặc trưng điểm đặt, phương, chiều, độ lớn đã đúng chưa.',
  },
  examples: [
    {
      problem:
        'Biểu diễn lực kéo một chiếc xe có độ lớn $200\\ \\text{N}$, phương nằm ngang, chiều từ trái sang phải. Tỉ xích $1\\ \\text{cm}$ ứng với $50\\ \\text{N}$.',
      steps: [
        'Chọn điểm đặt là chỗ dây kéo buộc vào xe; gốc mũi tên đặt tại đó.',
        'Độ dài mũi tên: $200 : 50 = 4$, tức là $4\\ \\text{cm}$.',
        'Vẽ mũi tên nằm ngang, hướng sang phải, dài $4\\ \\text{cm}$, ghi $\\vec{F}$ bên cạnh.',
      ],
      answer: 'Mũi tên nằm ngang, hướng sang phải, gốc ở chỗ buộc dây, dài $4\\ \\text{cm}$.',
    },
    {
      problem:
        'Một mũi tên lực dài $2{,}5\\ \\text{cm}$, có phương thẳng đứng, hướng từ dưới lên, gốc đặt ở đáy một chậu cây. Tỉ xích $1\\ \\text{cm}$ ứng với $20\\ \\text{N}$. Mô tả lực đó.',
      steps: [
        'Điểm đặt: ở đáy chậu cây (gốc mũi tên).',
        'Phương thẳng đứng, chiều từ dưới lên trên.',
        'Độ lớn: $2{,}5 \\cdot 20 = 50\\ \\text{N}$.',
      ],
      answer:
        'Lực đặt ở đáy chậu, phương thẳng đứng, chiều từ dưới lên, độ lớn $50\\ \\text{N}$ (ví dụ lực nâng của tay).',
    },
    {
      problem:
        'Cần đo lực kéo một hộp bút trượt trên bàn, ước lượng khoảng $1\\ \\text{N}$. Có hai lực kế: lực kế 1 có GHĐ $5\\ \\text{N}$, ĐCNN $0{,}1\\ \\text{N}$; lực kế 2 có GHĐ $100\\ \\text{N}$, ĐCNN $5\\ \\text{N}$. Nên chọn lực kế nào và cầm lực kế thế nào?',
      steps: [
        'Cả hai lực kế đều có GHĐ lớn hơn $1\\ \\text{N}$.',
        'ĐCNN của lực kế 2 là $5\\ \\text{N}$, lớn hơn cả lực cần đo, nên không đọc được; lực kế 1 có ĐCNN $0{,}1\\ \\text{N}$, đọc được chính xác.',
        'Lực kéo có phương nằm ngang, nên cầm lực kế nằm ngang để lò xo nằm dọc theo phương của lực.',
      ],
      answer: 'Chọn lực kế 1, hiệu chỉnh về $0$ rồi kéo lực kế theo phương nằm ngang.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Đơn vị đo lực trong hệ đơn vị đo lường hợp pháp của Việt Nam là',
      options: ['kilôgam (kg)', 'niutơn (N)', 'mét (m)', 'gam (g)'],
      answer: 1,
      hints: ['Kilôgam và gam là đơn vị khối lượng, mét là đơn vị độ dài.'],
      solution: 'Đơn vị lực là niutơn, kí hiệu $\\text{N}$.',
    },
    {
      type: 'multi',
      prompt: 'Những yếu tố nào là đặc trưng của lực?',
      options: ['Điểm đặt', 'Màu sắc', 'Phương', 'Chiều', 'Độ lớn', 'Khối lượng'],
      answers: [0, 2, 3, 4],
      hints: ['Có đúng bốn đặc trưng; chúng chính là những gì một mũi tên lực thể hiện.'],
      solution:
        'Mỗi lực có bốn đặc trưng: điểm đặt, phương, chiều và độ lớn. Màu sắc và khối lượng không phải đặc trưng của lực.',
    },
    {
      type: 'number',
      prompt:
        'Với tỉ xích $1\\ \\text{cm}$ ứng với $10\\ \\text{N}$, mũi tên biểu diễn lực $45\\ \\text{N}$ dài bao nhiêu xentimét?',
      answer: 4.5,
      unit: 'cm',
      hints: ['Mỗi $10\\ \\text{N}$ ứng với $1\\ \\text{cm}$.', 'Lấy $45$ chia cho $10$.'],
      solution: 'Độ dài mũi tên: $45 : 10 = 4{,}5\\ \\text{cm}$.',
    },
    {
      type: 'number',
      prompt:
        'Một mũi tên lực dài $6$ ô, tỉ xích $1$ ô ứng với $0{,}5\\ \\text{N}$. Lực có độ lớn bao nhiêu niutơn?',
      answer: 3,
      unit: 'N',
      hints: ['Độ lớn = số ô nhân với số niutơn của một ô.'],
      solution: '$F = 6 \\cdot 0{,}5 = 3\\ \\text{N}$.',
    },
    {
      type: 'choice',
      prompt:
        'Hai đội kéo co, đội A kéo sang trái, đội B kéo sang phải. Hai lực của hai đội tác dụng lên sợi dây',
      options: [
        'cùng phương, cùng chiều',
        'cùng phương, ngược chiều',
        'khác phương, ngược chiều',
        'khác phương, cùng chiều',
      ],
      answer: 1,
      hints: ['Cả hai lực đều dọc theo sợi dây nằm ngang.', 'Một sang trái, một sang phải.'],
      solution:
        'Cả hai lực cùng nằm dọc sợi dây nằm ngang nên cùng phương; một lực hướng sang trái, một lực hướng sang phải nên ngược chiều.',
    },
    {
      type: 'choice',
      prompt:
        'Tỉ xích $1\\ \\text{cm}$ ứng với $5\\ \\text{N}$. Mũi tên nào biểu diễn đúng lực đẩy $20\\ \\text{N}$ theo phương nằm ngang, chiều từ phải sang trái, đặt tại điểm $A$ trên vật?',
      options: [
        'Gốc tại $A$, nằm ngang, hướng sang trái, dài $4\\ \\text{cm}$',
        'Gốc tại $A$, nằm ngang, hướng sang phải, dài $4\\ \\text{cm}$',
        'Gốc tại $A$, nằm ngang, hướng sang trái, dài $20\\ \\text{cm}$',
        'Gốc tại $A$, thẳng đứng, hướng lên, dài $4\\ \\text{cm}$',
      ],
      answer: 0,
      hints: [
        'Tính độ dài: $20 : 5$.',
        'Chiều từ phải sang trái nghĩa là mũi tên chỉ về bên trái.',
      ],
      solution:
        'Độ dài mũi tên $20 : 5 = 4\\ \\text{cm}$; phương nằm ngang, mũi tên chỉ sang trái; gốc tại điểm đặt $A$.',
    },
    {
      type: 'order',
      prompt: 'Sắp xếp các bước đo lực bằng lực kế theo đúng thứ tự.',
      items: [
        'Đọc và ghi kết quả đo',
        'Chọn lực kế có GHĐ và ĐCNN phù hợp',
        'Móc vật vào lực kế, giữ lực kế theo phương của lực cần đo',
        'Ước lượng độ lớn của lực cần đo',
        'Hiệu chỉnh kim chỉ thị về vạch số 0',
      ],
      answer: [3, 1, 4, 2, 0],
      hints: [
        'Phải biết lực khoảng bao nhiêu thì mới chọn được lực kế.',
        'Hiệu chỉnh trước khi đo.',
      ],
      solution:
        'Ước lượng lực → chọn lực kế phù hợp → hiệu chỉnh về số 0 → móc vật, giữ lực kế theo phương của lực → đọc và ghi kết quả.',
    },
    {
      type: 'number',
      prompt:
        'Trên cùng một hình, lực $\\vec{F_1}$ được vẽ bằng mũi tên dài $3\\ \\text{cm}$ và có độ lớn $60\\ \\text{N}$. Lực $\\vec{F_2}$ được vẽ theo cùng tỉ xích bằng mũi tên dài $5\\ \\text{cm}$. Độ lớn của $\\vec{F_2}$ là bao nhiêu niutơn?',
      answer: 100,
      unit: 'N',
      hints: ['Tìm tỉ xích: $1\\ \\text{cm}$ ứng với bao nhiêu niutơn?'],
      solution:
        'Tỉ xích: $60 : 3 = 20\\ \\text{N}$ cho mỗi xentimét. Vậy $F_2 = 5 \\cdot 20 = 100\\ \\text{N}$.',
    },
  ],
  takeaways: [
    'Đơn vị lực là niutơn ($\\text{N}$); dụng cụ đo lực là lực kế.',
    'Lực có bốn đặc trưng: điểm đặt, phương, chiều, độ lớn.',
    'Biểu diễn lực bằng mũi tên: gốc ở điểm đặt, phương và chiều trùng với lực, độ dài theo tỉ xích cho trước.',
  ],
};
