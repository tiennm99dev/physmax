/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Lò xo bị kéo dãn rồi thả ra thì trở lại hình dạng ban đầu: đó là biến dạng đàn hồi; độ dãn của lò xo treo thẳng đứng tỉ lệ với khối lượng vật treo, và lực kế lò xo dựa vào tính chất này để đo lực.',
  intro:
    'Kéo hai đầu một chiếc lò xo rồi buông tay, lò xo co lại như cũ. Đệm giường, giảm xóc xe máy, chiếc bút bi bấm đều có lò xo bên trong. Lò xo dãn ra bao nhiêu khi treo vật nặng, và vì sao người ta dùng lò xo để làm cân và lực kế?',
  objectives: [
    'Nhận biết được biến dạng đàn hồi của lò xo và giới hạn đàn hồi.',
    'Tính được độ dãn của lò xo $\\Delta l = l - l_0$.',
    'Thực hiện thí nghiệm để rút ra: độ dãn của lò xo treo thẳng đứng tỉ lệ với khối lượng vật treo.',
    'Nêu được nguyên tắc của lực kế lò xo và dùng lực kế để đo lực.',
  ],
  sections: [
    {
      heading: 'Biến dạng của lò xo',
      blocks: [
        {
          type: 'p',
          text: 'Lò xo là một vật đàn hồi. Khi bị kéo, lò xo dãn ra; khi bị nén, lò xo co ngắn lại. Khi thôi tác dụng lực, lò xo trở lại hình dạng ban đầu.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Biến dạng đàn hồi',
          text: 'Biến dạng của một vật có thể trở lại hình dạng ban đầu khi thôi tác dụng lực gọi là biến dạng đàn hồi. Lò xo, dây chun, quả bóng cao su đều có biến dạng đàn hồi; cục đất nặn bị bóp méo thì không trở lại như cũ.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Độ dãn của lò xo',
          text: 'Chiều dài của lò xo khi không bị kéo hay nén là chiều dài tự nhiên $l_0$. Khi bị kéo, lò xo có chiều dài $l$. Độ dãn (độ biến dạng) của lò xo là hiệu giữa chiều dài khi biến dạng và chiều dài tự nhiên.',
        },
        { type: 'tex', tex: '\\Delta l = l - l_0' },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Giới hạn đàn hồi',
          text: 'Mỗi lò xo có một giới hạn đàn hồi. Nếu kéo dãn lò xo quá giới hạn này, lò xo bị hỏng: thôi tác dụng lực, nó không trở lại chiều dài ban đầu nữa. Vì vậy không treo vật quá nặng vào lò xo hay lực kế.',
        },
        {
          type: 'p',
          text: 'Lò xo thường được làm bằng thép hoặc đồng vì các vật liệu này có tính đàn hồi tốt.',
        },
      ],
    },
    {
      heading: 'Độ dãn của lò xo và khối lượng vật treo',
      blocks: [
        {
          type: 'p',
          text: 'Thí nghiệm: treo một lò xo thẳng đứng cạnh một thước đo, đo chiều dài tự nhiên $l_0$. Lần lượt treo $1$, $2$, $3$, ... quả nặng giống nhau vào đầu dưới lò xo, mỗi lần đọc chiều dài $l$ rồi tính độ dãn $\\Delta l = l - l_0$.',
        },
        {
          type: 'table',
          caption: 'Một kết quả thí nghiệm với lò xo có $l_0 = 25\\ \\text{cm}$',
          head: ['$m$ (g)', '$10$', '$20$', '$30$', '$40$', '$50$', '$60$'],
          rows: [
            ['$l$ (cm)', '$25{,}5$', '$26$', '$26{,}5$', '$27$', '$27{,}5$', '$28$'],
            ['$\\Delta l$ (cm)', '$0{,}5$', '$1$', '$1{,}5$', '$2$', '$2{,}5$', '$3$'],
          ],
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Kết luận',
          text: 'Độ dãn của lò xo treo thẳng đứng tỉ lệ với khối lượng của vật treo: khối lượng vật treo tăng gấp bao nhiêu lần thì độ dãn của lò xo cũng tăng gấp bấy nhiêu lần (khi chưa vượt quá giới hạn đàn hồi).',
        },
        { type: 'tex', tex: '\\dfrac{\\Delta l_1}{\\Delta l_2} = \\dfrac{m_1}{m_2}' },
        {
          type: 'p',
          text: 'Vẽ đồ thị độ dãn $\\Delta l$ theo khối lượng $m$, các điểm nằm trên một đường thẳng đi qua gốc toạ độ.',
        },
      ],
    },
    {
      heading: 'Lực kế lò xo và cân lò xo',
      blocks: [
        {
          type: 'p',
          text: 'Vật treo càng nặng thì kéo lò xo càng mạnh và lò xo càng dãn nhiều. Dựa vào đó, người ta làm lực kế lò xo: một lò xo, một đầu gắn vào vỏ, đầu kia gắn móc treo và kim chỉ thị chạy trên bảng chia độ ghi sẵn số niutơn.',
        },
        {
          type: 'list',
          items: [
            'Lực kéo càng lớn thì lò xo dãn càng nhiều, kim chỉ thị chỉ số càng lớn.',
            'Cân lò xo (cân treo, cân đồng hồ) cũng có lò xo bên trong; bảng chia độ của nó ghi khối lượng thay cho lực.',
            'Khi đo: hiệu chỉnh kim về vạch $0$, giữ lực kế dọc theo phương của lực, không kéo quá GHĐ ghi trên lực kế.',
          ],
        },
      ],
    },
  ],
  explore: {
    title: 'Lò xo và quả nặng ảo',
    instruction:
      'Chọn một lò xo. Lần lượt treo thêm từng quả nặng $50\\ \\text{g}$, đọc chiều dài $l$ ở kim chỉ màu đỏ trên thước, nhập vào ô rồi nhấn "Ghi vào bảng". Bảng tự tính độ dãn $\\Delta l = l - l_0$ và vẽ điểm lên đồ thị. Sau vài lần đo, quan sát đồ thị. Cuối cùng thử treo nhiều quả nặng hơn giới hạn rồi bỏ ra hết để xem lò xo có trở về $l_0$ không.',
  },
  examples: [
    {
      problem:
        'Một lò xo có chiều dài tự nhiên $20\\ \\text{cm}$. Treo vật $200\\ \\text{g}$ thì lò xo dài $24\\ \\text{cm}$. Treo vật $300\\ \\text{g}$ thì lò xo dài bao nhiêu? (Chưa vượt quá giới hạn đàn hồi.)',
      steps: [
        'Độ dãn khi treo $200\\ \\text{g}$: $\\Delta l_1 = 24 - 20 = 4\\ \\text{cm}$.',
        'Độ dãn tỉ lệ với khối lượng: $\\dfrac{\\Delta l_2}{\\Delta l_1} = \\dfrac{300}{200}$, nên $\\Delta l_2 = 4 \\cdot \\dfrac{300}{200} = 6\\ \\text{cm}$.',
        'Chiều dài lò xo: $l_2 = l_0 + \\Delta l_2 = 20 + 6 = 26\\ \\text{cm}$.',
      ],
      answer: 'Lò xo dài $26\\ \\text{cm}$.',
    },
    {
      problem:
        'Một lò xo treo thẳng đứng có $l_0 = 25\\ \\text{cm}$. Treo vật $10\\ \\text{g}$ thì lò xo dài $25{,}5\\ \\text{cm}$. Tính chiều dài lò xo khi treo vật $50\\ \\text{g}$.',
      steps: [
        'Với $10\\ \\text{g}$: $\\Delta l = 25{,}5 - 25 = 0{,}5\\ \\text{cm}$.',
        '$50\\ \\text{g}$ gấp $5$ lần $10\\ \\text{g}$ nên độ dãn gấp $5$ lần: $\\Delta l = 5 \\cdot 0{,}5 = 2{,}5\\ \\text{cm}$.',
        '$l = 25 + 2{,}5 = 27{,}5\\ \\text{cm}$.',
      ],
      answer: '$l = 27{,}5\\ \\text{cm}$.',
    },
  ],
  practice: [
    {
      type: 'multi',
      prompt:
        'Những vật nào có biến dạng đàn hồi (thôi tác dụng lực thì trở lại hình dạng ban đầu)?',
      options: [
        'Lò xo trong bút bi bấm',
        'Dây chun bị kéo nhẹ',
        'Cục đất nặn bị bóp méo',
        'Quả bóng cao su bị ấn nhẹ',
        'Tờ giấy bị vò nhàu',
      ],
      answers: [0, 1, 3],
      hints: ['Hỏi: khi buông tay, vật có tự trở lại hình dạng cũ không?'],
      solution:
        'Lò xo, dây chun, quả bóng cao su trở lại hình dạng ban đầu khi thôi tác dụng lực. Đất nặn và tờ giấy vò không tự trở lại như cũ.',
    },
    {
      type: 'number',
      prompt:
        'Một lò xo có chiều dài tự nhiên $12\\ \\text{cm}$. Khi treo một vật, lò xo dài $15{,}5\\ \\text{cm}$. Độ dãn của lò xo là bao nhiêu xentimét?',
      answer: 3.5,
      unit: 'cm',
      hints: ['$\\Delta l = l - l_0$.'],
      solution: '$\\Delta l = 15{,}5 - 12 = 3{,}5\\ \\text{cm}$.',
    },
    {
      type: 'number',
      prompt:
        'Lò xo có $l_0 = 25\\ \\text{cm}$; treo vật $10\\ \\text{g}$ thì lò xo dài $25{,}5\\ \\text{cm}$. Khi treo vật $60\\ \\text{g}$, lò xo dài bao nhiêu xentimét?',
      answer: 28,
      unit: 'cm',
      hints: [
        'Tìm độ dãn ứng với $10\\ \\text{g}$.',
        '$60\\ \\text{g}$ gấp mấy lần $10\\ \\text{g}$? Độ dãn cũng gấp bấy nhiêu lần.',
      ],
      solution:
        'Với $10\\ \\text{g}$: $\\Delta l = 0{,}5\\ \\text{cm}$. Với $60\\ \\text{g}$: $\\Delta l = 6 \\cdot 0{,}5 = 3\\ \\text{cm}$, nên $l = 25 + 3 = 28\\ \\text{cm}$.',
    },
    {
      type: 'number',
      prompt:
        'Một lò xo dài $15\\ \\text{cm}$ khi chưa treo vật và dài $17\\ \\text{cm}$ khi treo vật $100\\ \\text{g}$. Treo vật khối lượng $m$ thì lò xo dài $20\\ \\text{cm}$. Tìm $m$ (theo gam), biết chưa vượt quá giới hạn đàn hồi.',
      answer: 250,
      unit: 'g',
      hints: [
        'Tính độ dãn trong hai trường hợp.',
        'Độ dãn tỉ lệ với khối lượng: $\\dfrac{m}{100} = \\dfrac{\\Delta l_2}{\\Delta l_1}$.',
      ],
      solution:
        '$\\Delta l_1 = 17 - 15 = 2\\ \\text{cm}$, $\\Delta l_2 = 20 - 15 = 5\\ \\text{cm}$. $m = 100 \\cdot \\dfrac{5}{2} = 250\\ \\text{g}$.',
    },
    {
      type: 'choice',
      prompt:
        'Khi khối lượng vật treo vào một lò xo treo thẳng đứng tăng gấp $3$ lần (chưa quá giới hạn đàn hồi) thì',
      options: [
        'độ dãn của lò xo tăng gấp $3$ lần',
        'chiều dài của lò xo tăng gấp $3$ lần',
        'độ dãn của lò xo không đổi',
        'độ dãn của lò xo giảm $3$ lần',
      ],
      answer: 0,
      hints: ['Cái tỉ lệ với khối lượng là độ dãn $\\Delta l$, không phải chiều dài $l$.'],
      solution:
        'Độ dãn tỉ lệ với khối lượng vật treo nên tăng gấp $3$ lần. Chiều dài $l = l_0 + \\Delta l$ thì không tăng gấp $3$ vì còn có phần $l_0$.',
    },
    {
      type: 'choice',
      prompt:
        'Bạn An treo quá nhiều quả nặng vào một lò xo. Khi bỏ hết quả nặng ra, lò xo dài hơn chiều dài tự nhiên lúc đầu. Vì sao?',
      options: [
        'Lò xo đã bị kéo quá giới hạn đàn hồi nên bị hỏng.',
        'Lò xo nóng lên nên dài ra.',
        'Thước đo bị sai.',
        'Đó là biến dạng đàn hồi bình thường.',
      ],
      answer: 0,
      hints: ['Biến dạng đàn hồi thì lò xo phải trở lại như cũ.'],
      solution:
        'Khi bị kéo quá giới hạn đàn hồi, lò xo không còn trở lại chiều dài ban đầu nữa: nó đã bị hỏng.',
    },
    {
      type: 'number',
      prompt:
        'Lò xo của một lực kế dãn thêm $0{,}5\\ \\text{cm}$ khi lực kéo tăng thêm $1\\ \\text{N}$. Khi kéo lực kế bằng lực $4\\ \\text{N}$, lò xo dãn bao nhiêu xentimét so với lúc chưa kéo?',
      answer: 2,
      unit: 'cm',
      hints: ['Lực tăng gấp mấy lần $1\\ \\text{N}$ thì độ dãn tăng gấp bấy nhiêu lần.'],
      solution: 'Độ dãn: $4 \\cdot 0{,}5 = 2\\ \\text{cm}$.',
    },
    {
      type: 'multi',
      prompt: 'Những dụng cụ nào hoạt động nhờ biến dạng đàn hồi của lò xo?',
      options: ['Lực kế lò xo', 'Cân lò xo (cân treo)', 'Thước kẻ', 'Giảm xóc xe máy', 'Nhiệt kế'],
      answers: [0, 1, 3],
      hints: ['Tìm dụng cụ có lò xo bên trong, lò xo dãn hoặc nén khi dùng.'],
      solution:
        'Lực kế lò xo, cân lò xo và giảm xóc xe máy đều có lò xo dãn hoặc nén khi chịu lực rồi trở lại như cũ. Thước kẻ và nhiệt kế không dùng lò xo để hoạt động.',
    },
  ],
  takeaways: [
    'Lò xo bị kéo hoặc nén rồi thả ra thì trở lại hình dạng ban đầu: biến dạng đàn hồi.',
    'Độ dãn của lò xo: $\\Delta l = l - l_0$; độ dãn của lò xo treo thẳng đứng tỉ lệ với khối lượng vật treo.',
    'Kéo lò xo quá giới hạn đàn hồi thì lò xo hỏng, không trở lại chiều dài ban đầu.',
    'Lực kế lò xo đo lực dựa vào độ dãn của lò xo; khi đo cần hiệu chỉnh về $0$ và không kéo quá GHĐ.',
  ],
};
