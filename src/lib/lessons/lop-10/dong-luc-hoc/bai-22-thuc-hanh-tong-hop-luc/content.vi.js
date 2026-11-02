/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Bài thực hành kiểm nghiệm quy tắc tổng hợp hai lực đồng quy và hai lực song song cùng chiều bằng lực kế, dây cao su, lò xo và quả nặng.',
  intro:
    'Quy tắc hình bình hành và quy tắc hợp lực song song đã được phát biểu trên giấy. Liệu một lực kế thật có chỉ đúng con số ta tính? Trong bài này, em sẽ thay hai lực bằng một lực có cùng tác dụng, rồi so sánh số đo với kết quả tính.',
  objectives: [
    'Thiết kế và thực hiện được thí nghiệm tổng hợp hai lực đồng quy, hai lực song song cùng chiều.',
    'So sánh được kết quả đo với kết quả tính theo quy tắc, chỉ ra nguyên nhân sai số.',
  ],
  sections: [
    {
      heading: 'Cơ sở lí thuyết',
      blocks: [
        {
          type: 'p',
          text: 'Hai lực đồng quy $\\vec{F_1}$, $\\vec{F_2}$ hợp với nhau góc $\\alpha$ có hợp lực là đường chéo của hình bình hành, với độ lớn:',
        },
        { type: 'tex', tex: 'F = \\sqrt{F_1^2 + F_2^2 + 2F_1F_2\\cos\\alpha}' },
        {
          type: 'p',
          text: 'Hai lực song song cùng chiều đặt tại $A$, $B$ có hợp lực song song, cùng chiều với hai lực, độ lớn và điểm đặt $O$ nằm giữa $A$, $B$ thoả mãn:',
        },
        { type: 'tex', tex: 'F = F_1 + F_2, \\qquad \\frac{F_1}{F_2} = \\frac{d_2}{d_1}' },
        {
          type: 'callout',
          tone: 'note',
          title: 'Ý tưởng chung của hai thí nghiệm',
          text: 'Một lực là hợp lực của hai lực nếu nó gây ra cùng một tác dụng: làm dây cao su dãn đến đúng điểm cũ, hoặc đưa thanh về đúng vị trí cũ.',
        },
        { type: 'widget', name: 'song-song' },
      ],
    },
    {
      heading: 'Thí nghiệm 1: Tổng hợp hai lực đồng quy',
      project: true,
      blocks: [
        {
          type: 'p',
          text: 'Mục tiêu: đo hợp lực của hai lực đồng quy và so sánh với quy tắc hình bình hành. Dụng cụ: bảng thép, đế nam châm, dây cao su, hai lực kế, thước đo góc, bút và giấy.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Gắn đế nam châm lên bảng thép, móc dây cao su vào đế, rồi móc hai lực kế vào đầu còn lại của dây.',
            'Kéo hai lực kế theo hai hướng để dây cao su dãn đến một điểm $O$ rồi đánh dấu điểm đó. Ghi số chỉ $F_1$, $F_2$ và đo góc $\\alpha$ giữa hai lực.',
            'Tháo một lực kế. Dùng lực kế còn lại kéo dây cao su đến đúng điểm $O$, ghi số chỉ $F_{\\text{đo}}$.',
            'Lặp lại ít nhất $2$ lần với các giá trị khác của lực và góc.',
            'Tính $F_{\\text{tính}}$ theo công thức, so sánh với $F_{\\text{đo}}$.',
          ],
        },
        {
          type: 'table',
          caption: 'Mẫu bảng ghi số liệu',
          head: [
            'Lần đo',
            '$F_1$ (N)',
            '$F_2$ (N)',
            '$\\alpha$',
            '$F_{\\text{đo}}$ (N)',
            '$F_{\\text{tính}}$ (N)',
          ],
          rows: [
            ['1', '…', '…', '…', '…', '…'],
            ['2', '…', '…', '…', '…', '…'],
            ['3', '…', '…', '…', '…', '…'],
          ],
        },
      ],
    },
    {
      heading: 'Thí nghiệm 2: Tổng hợp hai lực song song cùng chiều',
      project: true,
      blocks: [
        {
          type: 'p',
          text: 'Mục tiêu: tìm điểm đặt và độ lớn hợp lực của hai lực song song cùng chiều. Dụng cụ: bảng thép, hai đế nam châm, thanh kim loại nhẹ, hai lò xo, các quả nặng, thước.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Treo thanh lên hai đế nam châm bằng hai lò xo. Treo các quả nặng tại hai điểm $A$, $B$ trên thanh. Đánh dấu vị trí của thanh và ghi $F_1$, $F_2$.',
            'Tháo các quả nặng rồi treo tất cả vào một móc trên thanh. Dời móc đến khi thanh về đúng vị trí đã đánh dấu.',
            'Đánh dấu điểm treo $O$, đo $d_1 = OA$, $d_2 = OB$. Lực do các quả nặng treo chung có độ lớn $F$ bằng tổng trọng lượng của chúng.',
            'Lặp lại ít nhất $2$ lần với số quả nặng khác nhau.',
            'So sánh $F$ với $F_1 + F_2$ và $\\dfrac{F_1}{F_2}$ với $\\dfrac{d_2}{d_1}$.',
          ],
        },
        {
          type: 'table',
          caption: 'Mẫu bảng ghi số liệu',
          head: [
            'Lần đo',
            '$F_1$ (N)',
            '$F_2$ (N)',
            '$d_1$ (cm)',
            '$d_2$ (cm)',
            '$\\dfrac{F_1}{F_2}$',
            '$\\dfrac{d_2}{d_1}$',
          ],
          rows: [
            ['1', '…', '…', '…', '…', '…', '…'],
            ['2', '…', '…', '…', '…', '…', '…'],
            ['3', '…', '…', '…', '…', '…', '…'],
          ],
        },
        {
          type: 'p',
          text: 'Báo cáo: nộp hai bảng số liệu, kết quả so sánh giữa đo và tính, kết luận về quy tắc hình bình hành và quy tắc hợp lực song song, các nguyên nhân gây sai số.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Hạn chế sai số',
          text: 'Giữ lực kế song song với bảng và đọc số ở đúng phương dây; kiểm tra kim lực kế chỉ $0$ trước khi đo; đưa dây về đúng điểm $O$, không chỉ gần đó. Khi đo góc, đặt thước đo góc đúng tại điểm $O$.',
        },
      ],
    },
  ],
  explore: {
    title: 'Bảng lực kế ảo',
    instruction:
      'Đặt hai lực và góc giữa chúng, bấm thay bằng một lực kế để đọc $F_{\\text{đo}}$. Tự tính $F$ theo công thức, nhập vào và ghi vào bảng. Đo ít nhất ba lần với các góc khác nhau. Số đo có sai số nhỏ như lực kế thật.',
  },
  examples: [
    {
      problem:
        'Trong một lần đo, $F_1 = 3{,}0$ N, $F_2 = 4{,}0$ N, $\\alpha = 90^\\circ$; lực kế thay thế chỉ $F_{\\text{đo}} = 5{,}1$ N. So sánh với lí thuyết.',
      steps: [
        '$F_{\\text{tính}} = \\sqrt{3^2 + 4^2 + 2 \\cdot 3 \\cdot 4 \\cdot \\cos 90^\\circ} = \\sqrt{25} = 5{,}0$ N.',
        'Độ lệch: $\\dfrac{|5{,}1 - 5{,}0|}{5{,}0} \\cdot 100\\% = 2\\%$.',
      ],
      answer: 'Hai kết quả gần bằng nhau, lệch khoảng $2\\%$: phù hợp với quy tắc hình bình hành.',
    },
    {
      problem:
        'Treo $F_1 = 1{,}0$ N tại $A$ và $F_2 = 2{,}0$ N tại $B$, với $AB = 24$ cm. Hợp lực đặt tại $O$ cách $A$ bao nhiêu?',
      steps: [
        'Hợp lực nằm giữa $A$, $B$: $d_1 + d_2 = 24$ cm.',
        '$\\dfrac{F_1}{F_2} = \\dfrac{d_2}{d_1} = \\dfrac{1}{2}$, nên $d_1 = 2d_2$.',
        'Suy ra $d_2 = 8$ cm, $d_1 = 16$ cm.',
      ],
      answer: '$O$ cách $A$ là $16$ cm, gần lực lớn hơn.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt: 'Hai lực $3$ N và $4$ N vuông góc với nhau. Tính độ lớn hợp lực.',
      answer: 5,
      tolerance: 0.01,
      unit: 'N',
      hints: ['$\\cos 90^\\circ = 0$.'],
      solution: '$F = \\sqrt{3^2 + 4^2} = 5$ N.',
    },
    {
      type: 'number',
      prompt: 'Hai lực cùng độ lớn $5$ N hợp với nhau góc $60^\\circ$. Tính độ lớn hợp lực.',
      answer: 8.66,
      tolerance: 0.02,
      unit: 'N',
      hints: ['Thay vào $F^2 = F_1^2 + F_2^2 + 2F_1F_2\\cos\\alpha$.'],
      solution: '$F^2 = 25 + 25 + 50 \\cdot 0{,}5 = 75$, nên $F \\approx 8{,}66$ N.',
    },
    {
      type: 'number',
      prompt: 'Hai lực $6$ N và $8$ N hợp với nhau góc $120^\\circ$. Tính độ lớn hợp lực.',
      answer: 7.21,
      tolerance: 0.02,
      unit: 'N',
      hints: ['$\\cos 120^\\circ = -0{,}5$.'],
      solution:
        '$F^2 = 36 + 64 + 2 \\cdot 6 \\cdot 8 \\cdot (-0{,}5) = 52$, nên $F \\approx 7{,}21$ N.',
    },
    {
      type: 'number',
      prompt:
        'Hai lực song song cùng chiều $F_1 = 2$ N và $F_2 = 3$ N đặt lên một thanh. Tính độ lớn hợp lực.',
      answer: 5,
      unit: 'N',
      hints: ['Hai lực cùng chiều nên độ lớn cộng lại.'],
      solution: '$F = F_1 + F_2 = 5$ N.',
    },
    {
      type: 'number',
      prompt:
        'Hai lực song song cùng chiều $F_1 = 2$ N tại $A$, $F_2 = 4$ N tại $B$, $AB = 30$ cm. Điểm đặt hợp lực cách $A$ bao nhiêu xăng-ti-mét?',
      answer: 20,
      unit: 'cm',
      hints: ['$\\dfrac{d_2}{d_1} = \\dfrac{F_1}{F_2}$ và $d_1 + d_2 = 30$ cm.'],
      solution:
        '$\\dfrac{d_2}{d_1} = \\dfrac{2}{4}$, nên $d_1 = 2d_2$; $3d_2 = 30$, vậy $d_2 = 10$ cm, $d_1 = 20$ cm.',
    },
    {
      type: 'number',
      prompt:
        'Một lần đo được $F_{\\text{đo}} = 5{,}2$ N trong khi tính được $F_{\\text{tính}} = 5{,}0$ N. Độ lệch tương đối là bao nhiêu phần trăm?',
      answer: 4,
      tolerance: 0.05,
      unit: '%',
      hints: ['Chia độ chênh lệch cho $F_{\\text{tính}}$.'],
      solution: '$\\dfrac{0{,}2}{5{,}0} \\cdot 100\\% = 4\\%$.',
    },
    {
      type: 'choice',
      prompt: 'Vì sao phải kéo dây cao su bằng một lực kế đến đúng điểm $O$ đã đánh dấu?',
      options: [
        'Để lực kế không bị hỏng.',
        'Để lực đó gây ra cùng tác dụng như hai lực ban đầu.',
        'Để góc $\\alpha$ bằng $0$.',
        'Để dây cao su không bị đứt.',
      ],
      answer: 1,
      hints: ['Thế nào là hợp lực của hai lực?'],
      solution: 'Hợp lực có tác dụng giống hệt các lực thành phần: làm dây dãn đến đúng vị trí cũ.',
    },
    {
      type: 'multi',
      prompt: 'Nguyên nhân nào có thể gây sai số trong thí nghiệm hai lực đồng quy?',
      options: [
        'Lực kế không song song với mặt bảng.',
        'Đọc số lực kế không chính xác.',
        'Đo góc giữa hai lực chưa chuẩn.',
        'Màu của dây cao su.',
      ],
      answers: [0, 1, 2],
      hints: ['Những thao tác đo nào ảnh hưởng đến con số thu được?'],
      solution:
        'Lực kế lệch mặt bảng, đọc sai và đo sai góc đều làm kết quả lệch. Màu dây không ảnh hưởng.',
    },
  ],
  takeaways: [
    'Hợp lực là lực có cùng tác dụng với các lực thành phần: đưa dây hay thanh về đúng vị trí cũ.',
    'Hai lực đồng quy: $F^2 = F_1^2 + F_2^2 + 2F_1F_2\\cos\\alpha$.',
    'Hai lực song song cùng chiều: $F = F_1 + F_2$ và $\\dfrac{F_1}{F_2} = \\dfrac{d_2}{d_1}$.',
    'So sánh đo và tính phải kèm độ lệch và nguyên nhân sai số.',
  ],
};
