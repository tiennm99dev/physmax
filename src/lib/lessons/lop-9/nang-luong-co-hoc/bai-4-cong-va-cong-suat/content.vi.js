/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Công cơ học của lực không đổi làm vật dịch chuyển theo hướng của lực là A = F.s, đơn vị jun (J); công suất là tốc độ thực hiện công, bằng A/t, đơn vị oát (W).',
  intro:
    'Hai bạn An và Bình cùng dùng ròng rọc kéo gạch lên tầng hai. An kéo $10$ viên gạch trong $50$ giây, Bình kéo $15$ viên gạch trong $60$ giây. Bạn nào làm được nhiều việc hơn? Bạn nào làm việc khoẻ hơn? Để trả lời, vật lí dùng hai đại lượng: công và công suất.',
  objectives: [
    'Nêu được khi nào một lực thực hiện công cơ học; lấy được ví dụ lực có và không thực hiện công.',
    'Viết được công thức $A = F \\cdot s$ và nêu được đơn vị jun (J), $1$ J $= 1$ N.m.',
    'Nêu được công suất là đại lượng đặc trưng cho tốc độ thực hiện công; viết được $\\mathcal{P} = \\dfrac{A}{t}$, đơn vị oát (W).',
    'Vận dụng được công thức tính công, công suất trong một số trường hợp đơn giản.',
  ],
  sections: [
    {
      heading: 'Công cơ học',
      blocks: [
        {
          type: 'p',
          text: 'Khi đầu tàu kéo các toa chuyển động, khi xe nâng nâng thùng hàng lên cao, lực đã truyền năng lượng cho vật và làm vật dịch chuyển. Khi đó ta nói lực đã thực hiện công (lực sinh công).',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Công cơ học',
          text: 'Công cơ học (gọi tắt là công) là số đo phần năng lượng được truyền từ vật này sang vật khác trong tương tác giữa các vật. Một lực thực hiện công khi nó tác dụng vào vật và làm vật dịch chuyển theo hướng của lực.',
        },
        {
          type: 'p',
          text: 'Khi lực $F$ không đổi và vật dịch chuyển một quãng đường $s$ theo hướng của lực, công của lực là:',
        },
        {
          type: 'tex',
          tex: 'A = F \\cdot s',
        },
        {
          type: 'list',
          items: [
            '$F$ là lực tác dụng vào vật, đơn vị là niutơn (N);',
            '$s$ là quãng đường vật dịch chuyển theo hướng của lực, đơn vị là mét (m);',
            '$A$ là công của lực, đơn vị là jun (J): $1$ J $= 1$ N.m. Bội của jun: $1$ kJ $= 1\\,000$ J, $1$ MJ $= 1\\,000\\,000$ J.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Khi lực không thực hiện công',
          text: 'Nếu vật không dịch chuyển (người đẩy bức tường đứng yên, lực sĩ giữ quả tạ trên cao) thì lực không thực hiện công, dù người tác dụng lực có thể rất mệt. Nếu vật dịch chuyển theo phương vuông góc với phương của lực (trọng lực tác dụng lên hòn bi lăn trên mặt bàn nằm ngang) thì công của lực đó cũng bằng $0$.',
        },
        {
          type: 'p',
          text: 'Xếp các trường hợp sau vào đúng nhóm.',
        },
        { type: 'widget', name: 'co-cong-khong' },
        {
          type: 'callout',
          tone: 'note',
          title: 'Kéo vật lên đều',
          text: 'Khi kéo đều một vật có trọng lượng $P$ lên độ cao $h$ theo phương thẳng đứng, lực kéo bằng trọng lượng $F = P$ và $s = h$, nên công của lực kéo là $A = P \\cdot h$, đúng bằng thế năng mà vật có thêm.',
        },
      ],
    },
    {
      heading: 'Công suất',
      blocks: [
        {
          type: 'p',
          text: 'Hai máy cùng nâng một thùng hàng lên cùng độ cao thì thực hiện công như nhau; máy làm xong trong thời gian ngắn hơn là máy làm việc khoẻ hơn. Để so sánh, ta tính công thực hiện được trong một đơn vị thời gian.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Công suất',
          text: 'Công suất là đại lượng đặc trưng cho tốc độ thực hiện công, được xác định bằng công thực hiện được trong một đơn vị thời gian.',
        },
        {
          type: 'tex',
          tex: '\\mathcal{P} = \\frac{A}{t}',
        },
        {
          type: 'list',
          items: [
            '$A$ là công thực hiện được, đơn vị là jun (J);',
            '$t$ là thời gian thực hiện công, đơn vị là giây (s);',
            '$\\mathcal{P}$ là công suất, đơn vị là oát (W): $1$ W $= 1$ J/s.',
          ],
        },
        {
          type: 'table',
          caption: 'Đơn vị công suất thường gặp',
          head: ['Đơn vị', 'Đổi ra oát'],
          rows: [
            ['$1$ kilôoát (kW)', '$1\\,000$ W'],
            ['$1$ mêgaoát (MW)', '$1\\,000\\,000$ W'],
            ['$1$ mã lực (HP)', 'khoảng $746$ W'],
          ],
        },
        {
          type: 'p',
          text: 'Ví dụ, một bóng đèn ghi $50$ W nghĩa là mỗi giây nó chuyển hoá $50$ J điện năng thành quang năng và nhiệt năng. Công suất cho biết công được thực hiện nhanh hay chậm, còn công cho biết nhiều hay ít.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Kí hiệu',
          text: 'Công suất được kí hiệu là $\\mathcal{P}$, khác với kí hiệu $P$ của trọng lượng; đừng nhầm hai đại lượng này khi giải bài.',
        },
      ],
    },
  ],
  explore: {
    title: 'Ai làm việc khoẻ hơn?',
    instruction:
      'Chọn độ cao, số viên gạch và thời gian kéo của An và Bình, dự đoán bạn nào làm việc khoẻ hơn, rồi nhấn "Bắt đầu kéo". Bảng số liệu cho biết công mỗi bạn đã làm và công suất khi kéo xong. Hãy tìm một cách chọn để một bạn thực hiện công lớn hơn nhưng lại làm việc chậm hơn bạn kia.',
  },
  examples: [
    {
      problem:
        'Một xe nâng tác dụng lực $700$ N để nâng một thùng hàng lên cao $2$ m theo phương thẳng đứng. Tính công của lực nâng.',
      steps: [
        'Lực nâng có phương thẳng đứng, thùng hàng dịch chuyển lên trên theo hướng của lực: $F = 700$ N, $s = 2$ m.',
        'Công của lực nâng: $A = F \\cdot s = 700 \\cdot 2 = 1\\,400$ J.',
      ],
      answer: 'Công của lực nâng là $1\\,400$ J.',
    },
    {
      problem:
        'Một thang máy đưa cabin và người có tổng trọng lượng $10\\,000$ N lên cao $20$ m trong $80$ s. Tính công và công suất của động cơ thang máy (coi thang máy đi lên đều).',
      steps: [
        'Thang máy đi lên đều nên lực kéo bằng trọng lượng: $F = 10\\,000$ N, $s = 20$ m.',
        'Công: $A = F \\cdot s = 10\\,000 \\cdot 20 = 200\\,000$ J.',
        'Công suất: $\\mathcal{P} = \\dfrac{A}{t} = \\dfrac{200\\,000}{80} = 2\\,500$ W.',
      ],
      answer: 'Công là $200\\,000$ J $= 200$ kJ; công suất là $2\\,500$ W $= 2{,}5$ kW.',
    },
    {
      problem:
        'An kéo $10$ viên gạch lên độ cao $4$ m trong $50$ s; Bình kéo $15$ viên gạch lên cùng độ cao trong $60$ s. Mỗi viên gạch nặng $16$ N. Ai làm việc khoẻ hơn?',
      steps: [
        'Công của An: $A_1 = 10 \\cdot 16 \\cdot 4 = 640$ J; công suất $\\mathcal{P}_1 = \\dfrac{640}{50} = 12{,}8$ W.',
        'Công của Bình: $A_2 = 15 \\cdot 16 \\cdot 4 = 960$ J; công suất $\\mathcal{P}_2 = \\dfrac{960}{60} = 16$ W.',
        'So sánh: $\\mathcal{P}_2 > \\mathcal{P}_1$.',
      ],
      answer: 'Bình làm việc khoẻ hơn An (công suất $16$ W so với $12{,}8$ W).',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Trường hợp nào dưới đây có công cơ học?',
      options: [
        'Một người đang kéo xe cho xe chuyển động trên đường',
        'Một lực sĩ đang giữ quả tạ đứng yên trên cao',
        'Một người đẩy bức tường nhưng tường không dịch chuyển',
        'Một quả cam nằm yên trên mặt bàn',
      ],
      answer: 0,
      hints: ['Phải có lực tác dụng và vật phải dịch chuyển theo hướng của lực.'],
      solution:
        'Chỉ khi người kéo xe, chiếc xe mới dịch chuyển theo hướng của lực kéo, nên lực kéo thực hiện công. Ở các trường hợp còn lại vật không dịch chuyển.',
    },
    {
      type: 'number',
      prompt:
        'Một người kéo một chiếc xe với lực không đổi $50$ N, xe dịch chuyển $15$ m theo hướng của lực kéo. Tính công của lực kéo.',
      answer: 750,
      tolerance: 0.001,
      unit: 'J',
      hints: ['Dùng $A = F \\cdot s$.'],
      solution: '$A = F \\cdot s = 50 \\cdot 15 = 750$ J.',
    },
    {
      type: 'number',
      prompt:
        'Một người nâng đều một thùng hàng khối lượng $25$ kg lên cao $1{,}2$ m. Tính công của lực nâng.',
      answer: 300,
      tolerance: 0.001,
      unit: 'J',
      hints: ['Nâng đều nên lực nâng bằng trọng lượng: $F = P = 10m$.', '$s = h = 1{,}2$ m.'],
      solution: '$F = P = 10 \\cdot 25 = 250$ N; $A = F \\cdot s = 250 \\cdot 1{,}2 = 300$ J.',
    },
    {
      type: 'number',
      prompt: 'Một máy thực hiện công $36\\,000$ J trong $2$ phút. Tính công suất của máy.',
      answer: 300,
      tolerance: 0.001,
      unit: 'W',
      hints: [
        'Đổi thời gian ra giây trước: $2$ phút $= 120$ s.',
        '$\\mathcal{P} = \\dfrac{A}{t}$.',
      ],
      solution: '$t = 2$ phút $= 120$ s; $\\mathcal{P} = \\dfrac{36\\,000}{120} = 300$ W.',
    },
    {
      type: 'choice',
      prompt: 'Đơn vị đo công suất là',
      options: ['jun (J)', 'oát (W)', 'niutơn (N)', 'niutơn mét (N.m)'],
      answer: 1,
      hints: ['Công suất là công chia cho thời gian: J/s.'],
      solution:
        'Công suất đo bằng oát: $1$ W $= 1$ J/s. Jun và niutơn mét là đơn vị của công, niutơn là đơn vị của lực.',
    },
    {
      type: 'number',
      prompt:
        'Một máy bơm nước có công suất $1{,}5$ kW chạy liên tục trong $10$ phút. Máy thực hiện được công bao nhiêu kilôjun (kJ)?',
      answer: 900,
      tolerance: 0.001,
      unit: 'kJ',
      hints: [
        'Từ $\\mathcal{P} = \\dfrac{A}{t}$ suy ra $A = \\mathcal{P} \\cdot t$.',
        'Đổi $1{,}5$ kW $= 1\\,500$ W, $10$ phút $= 600$ s.',
      ],
      solution: '$A = \\mathcal{P} \\cdot t = 1\\,500 \\cdot 600 = 900\\,000$ J $= 900$ kJ.',
    },
    {
      type: 'number',
      prompt:
        'Một cần cẩu nâng đều một container khối lượng $2$ tấn lên cao $15$ m trong $30$ s. Công suất của cần cẩu là bao nhiêu kilôoát (kW)?',
      answer: 10,
      tolerance: 0.001,
      unit: 'kW',
      hints: [
        '$2$ tấn $= 2\\,000$ kg, nên $P = 20\\,000$ N.',
        'Tính công $A = P \\cdot h$, rồi chia cho thời gian.',
      ],
      solution:
        '$F = P = 10 \\cdot 2\\,000 = 20\\,000$ N; $A = 20\\,000 \\cdot 15 = 300\\,000$ J; $\\mathcal{P} = \\dfrac{300\\,000}{30} = 10\\,000$ W $= 10$ kW.',
    },
    {
      type: 'choice',
      prompt:
        'Bạn Nam thực hiện công $1\\,200$ J trong $40$ s; bạn Hà thực hiện công $1\\,500$ J trong $60$ s. Kết luận nào đúng?',
      options: [
        'Hà làm việc khoẻ hơn vì thực hiện công lớn hơn',
        'Nam làm việc khoẻ hơn vì có công suất lớn hơn',
        'Hai bạn làm việc khoẻ như nhau',
        'Không so sánh được vì công khác nhau',
      ],
      answer: 1,
      hints: ['Làm việc khoẻ hơn là có công suất lớn hơn. Tính $\\mathcal{P}$ của mỗi bạn.'],
      solution:
        'Nam: $\\mathcal{P} = \\dfrac{1\\,200}{40} = 30$ W. Hà: $\\mathcal{P} = \\dfrac{1\\,500}{60} = 25$ W. Nam có công suất lớn hơn nên làm việc khoẻ hơn, dù Hà thực hiện công lớn hơn.',
    },
    {
      type: 'multi',
      prompt: 'Những phát biểu nào đúng?',
      options: [
        '$1$ W $= 1$ J/s.',
        '$1$ kJ $= 1\\,000$ J.',
        'Lực vuông góc với phương dịch chuyển của vật thì không thực hiện công.',
        'Máy có công suất lớn hơn thì luôn thực hiện công lớn hơn.',
      ],
      answers: [0, 1, 2],
      hints: ['Công còn phụ thuộc thời gian máy làm việc: $A = \\mathcal{P} \\cdot t$.'],
      solution:
        'Ba phát biểu đầu đúng. Phát biểu cuối sai: máy công suất lớn nhưng chạy trong thời gian ngắn có thể thực hiện công nhỏ hơn máy công suất nhỏ chạy lâu.',
    },
    {
      type: 'number',
      prompt:
        'Một con ngựa kéo xe với lực không đổi $200$ N, đi được $4{,}5$ km theo hướng của lực trong $30$ phút. Tính công suất của con ngựa.',
      answer: 500,
      tolerance: 0.001,
      unit: 'W',
      hints: [
        'Đổi $4{,}5$ km $= 4\\,500$ m và $30$ phút $= 1\\,800$ s.',
        'Tính công trước rồi chia cho thời gian.',
      ],
      solution:
        '$A = 200 \\cdot 4\\,500 = 900\\,000$ J; $\\mathcal{P} = \\dfrac{900\\,000}{1\\,800} = 500$ W.',
    },
  ],
  takeaways: [
    'Lực thực hiện công khi nó làm vật dịch chuyển theo hướng của lực: $A = F \\cdot s$, đơn vị jun, $1$ J $= 1$ N.m.',
    'Vật không dịch chuyển, hoặc dịch chuyển vuông góc với phương của lực, thì công của lực bằng $0$.',
    'Công suất là tốc độ thực hiện công: $\\mathcal{P} = \\dfrac{A}{t}$, đơn vị oát, $1$ W $= 1$ J/s; $1$ kW $= 1\\,000$ W.',
    'Muốn biết ai (máy nào) làm việc khoẻ hơn, so sánh công suất, không so sánh công.',
  ],
};
