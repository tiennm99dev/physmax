/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Tần số là số dao động trong 1 giây, đơn vị héc (Hz); tần số càng lớn âm càng cao (bổng). Biên độ dao động càng lớn âm càng to. Tai người nghe được âm từ 20 Hz đến 20 000 Hz; dưới 20 Hz là hạ âm, trên 20 000 Hz là siêu âm.',
  intro:
    'Cùng một chiếc đàn ghi ta, có dây phát ra âm trầm, có dây phát ra âm bổng; gảy mạnh thì âm to, gảy nhẹ thì âm nhỏ. Điều gì ở dao động của dây đàn quyết định âm cao hay thấp, to hay nhỏ? Vì sao chó nghe được tiếng còi mà người không nghe thấy?',
  objectives: [
    'Nêu được tần số là số dao động trong 1 giây, đơn vị là héc (Hz); tính được tần số khi biết số dao động và thời gian.',
    'Sử dụng được dao động kí để quan sát dạng sóng của âm.',
    'Nêu được sự liên quan giữa độ to của âm với biên độ âm, giữa độ cao của âm với tần số âm.',
    'Nêu được khoảng tần số âm tai người nghe được, thế nào là hạ âm và siêu âm.',
  ],
  sections: [
    {
      heading: 'Tần số âm',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Tần số',
          text: 'Số dao động vật thực hiện được trong $1$ giây gọi là tần số. Đơn vị tần số là héc, kí hiệu $\\text{Hz}$.',
        },
        {
          type: 'tex',
          tex: '\\text{Tần số} = \\frac{\\text{số dao động}}{\\text{thời gian thực hiện các dao động đó (s)}}',
        },
        {
          type: 'p',
          text: 'Ví dụ: một con lắc thực hiện được $20$ dao động trong $10$ giây thì tần số dao động của con lắc là $20 : 10 = 2\\ \\text{(Hz)}$, nghĩa là mỗi giây con lắc thực hiện được $2$ dao động.',
        },
        {
          type: 'p',
          text: 'Dao động của nguồn âm thường rất nhanh, mắt không theo dõi được. Để quan sát, người ta dùng micro biến dao động âm thành tín hiệu điện rồi đưa vào dao động kí. Trên màn hình dao động kí hiện ra dạng sóng âm: theo chiều ngang là thời gian, theo chiều dọc là độ lệch của dao động so với vị trí cân bằng. Màn hình được chia thành các ô; biết mỗi ô theo chiều ngang ứng với bao nhiêu mili giây, ta đếm được số dao động trong một khoảng thời gian và tính ra tần số.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Hạ âm và siêu âm',
          text: 'Tai người bình thường nghe được âm có tần số từ $20\\ \\text{Hz}$ đến $20\\,000\\ \\text{Hz}$. Âm có tần số dưới $20\\ \\text{Hz}$ gọi là hạ âm. Âm có tần số trên $20\\,000\\ \\text{Hz}$ gọi là siêu âm. Tai người không nghe được hạ âm và siêu âm.',
        },
        {
          type: 'p',
          text: 'Một số động vật nghe được những âm mà người không nghe được: chó, mèo, dơi, cá heo nghe được siêu âm; voi nghe được hạ âm. Siêu âm được dùng để chẩn đoán bệnh (máy siêu âm trong bệnh viện), đo độ sâu của biển, phát hiện đàn cá.',
        },
      ],
    },
    {
      heading: 'Biên độ và độ to của âm',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Biên độ dao động',
          text: 'Biên độ dao động là độ lệch lớn nhất của vật dao động so với vị trí cân bằng của nó. Trên màn hình dao động kí, biên độ là khoảng cách từ đường nằm ngang ở giữa (vị trí cân bằng) đến đỉnh cao nhất của đường sóng.',
        },
        {
          type: 'p',
          text: 'Gõ nhẹ rồi gõ mạnh vào mặt trống: gõ mạnh thì mặt trống lệch nhiều khỏi vị trí cân bằng, biên độ dao động lớn hơn và âm phát ra to hơn. Trên dao động kí, đường sóng của âm to có đỉnh cao hơn.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Độ to và biên độ',
          text: 'Biên độ dao động của nguồn âm càng lớn thì âm phát ra càng to. Biên độ càng nhỏ thì âm càng nhỏ.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Em có biết',
          text: 'Độ to của âm thường được đo bằng đơn vị đêxiben, kí hiệu $\\text{dB}$. Tiếng nói chuyện bình thường khoảng $40\\text{–}60\\ \\text{dB}$; âm to trên khoảng $130\\ \\text{dB}$ làm nhức tai (ngưỡng đau).',
        },
      ],
    },
    {
      heading: 'Tần số và độ cao của âm',
      blocks: [
        {
          type: 'p',
          text: 'Gảy các dây đàn khác nhau: dây phát ra âm trầm dao động chậm, dây phát ra âm bổng dao động nhanh. Trên dao động kí, cùng một thang thời gian, đường sóng của âm bổng có nhiều dao động hơn (các đỉnh sóng sít nhau hơn).',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Độ cao và tần số',
          text: 'Tần số dao động càng lớn thì âm phát ra càng cao (càng bổng). Tần số dao động càng nhỏ thì âm phát ra càng thấp (càng trầm).',
        },
        {
          type: 'table',
          caption: 'Hai đặc trưng của âm và đại lượng quyết định',
          head: ['Đặc trưng của âm', 'Phụ thuộc vào', 'Quy luật'],
          rows: [
            ['Độ to', 'Biên độ dao động', 'Biên độ càng lớn, âm càng to'],
            ['Độ cao', 'Tần số dao động', 'Tần số càng lớn, âm càng cao (bổng)'],
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Đừng nhầm "to" với "cao"',
          text: 'Âm to chưa chắc là âm cao. Tiếng trống to nhưng trầm (tần số nhỏ, biên độ lớn); tiếng muỗi vo ve nhỏ nhưng bổng (tần số lớn, biên độ nhỏ).',
        },
      ],
    },
  ],
  explore: {
    title: 'Máy phát âm và dao động kí',
    instruction:
      'Kéo thanh tần số và quan sát số dao động trên màn hình; kéo thanh biên độ và quan sát độ cao của đỉnh sóng. Nhấn "Nghe âm" để nghe (vặn nhỏ loa trước). Nhấn "Lưu làm âm mẫu", rồi đổi tần số hoặc biên độ để so sánh âm mới với âm mẫu. Thử chọn $10\\ \\text{Hz}$ và $30\\,000\\ \\text{Hz}$: dao động kí vẫn thấy sóng nhưng tai không nghe thấy.',
  },
  examples: [
    {
      problem:
        'Trong $20$ giây, một lá thép thực hiện được $4\\,000$ dao động. Tính tần số dao động của lá thép. Lá thép dao động có phát ra âm mà tai người nghe được không?',
      steps: [
        'Tần số $=$ số dao động $:$ thời gian $= 4\\,000 : 20 = 200\\ \\text{(Hz)}$.',
        'Tai người nghe được âm có tần số từ $20\\ \\text{Hz}$ đến $20\\,000\\ \\text{Hz}$; $200\\ \\text{Hz}$ nằm trong khoảng này.',
      ],
      answer: 'Tần số $200\\ \\text{Hz}$; tai người nghe được âm do lá thép phát ra.',
    },
    {
      problem:
        'Trên màn hình dao động kí, mỗi ô theo chiều ngang ứng với $1\\ \\text{ms}$. Một dao động đầy đủ của đường sóng chiếm đúng $4$ ô. Tính tần số của âm.',
      steps: [
        'Một dao động kéo dài $4 \\cdot 1 = 4\\ \\text{(ms)}$.',
        'Trong $1\\ \\text{s} = 1\\,000\\ \\text{ms}$ có $1\\,000 : 4 = 250$ dao động.',
        'Vậy tần số của âm là $250\\ \\text{Hz}$.',
      ],
      answer: '$250\\ \\text{Hz}$.',
    },
    {
      problem:
        'Hai âm được ghi trên dao động kí với cùng thang đo. Âm A có $3$ dao động trên màn hình, đỉnh sóng cao $2$ ô. Âm B có $6$ dao động trên màn hình, đỉnh sóng cao $1$ ô. So sánh độ cao và độ to của hai âm.',
      steps: [
        'Cùng thang thời gian, âm B có số dao động gấp đôi âm A nên tần số của B gấp đôi tần số của A: âm B cao (bổng) hơn.',
        'Biên độ của A ($2$ ô) lớn hơn biên độ của B ($1$ ô): âm A to hơn.',
      ],
      answer: 'Âm B cao hơn âm A; âm A to hơn âm B.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Tần số dao động là',
      options: [
        'độ lệch lớn nhất của vật so với vị trí cân bằng.',
        'số dao động vật thực hiện được trong $1$ giây.',
        'thời gian vật thực hiện được $1$ dao động.',
        'quãng đường âm truyền được trong $1$ giây.',
      ],
      answer: 1,
      hints: ['Đơn vị của tần số là héc: số dao động mỗi giây.'],
      solution:
        'Tần số là số dao động vật thực hiện được trong $1$ giây. Độ lệch lớn nhất so với vị trí cân bằng là biên độ.',
    },
    {
      type: 'text',
      prompt: 'Đơn vị đo tần số là gì? (ghi tên hoặc kí hiệu)',
      accept: ['héc', 'hec', 'Hz', 'hertz', 'héc (Hz)', 'hec hz'],
      hints: ['Kí hiệu gồm hai chữ cái, chữ đầu viết hoa.'],
      solution: 'Đơn vị tần số là héc, kí hiệu $\\text{Hz}$.',
    },
    {
      type: 'number',
      prompt:
        'Một con lắc thực hiện được $30$ dao động trong $15$ giây. Tần số dao động của con lắc là bao nhiêu?',
      answer: 2,
      unit: 'Hz',
      hints: ['Tần số $=$ số dao động $:$ thời gian (giây).'],
      solution: 'Tần số $= 30 : 15 = 2\\ \\text{(Hz)}$.',
    },
    {
      type: 'number',
      prompt:
        'Trong $1$ phút, cánh của một con côn trùng thực hiện được $18\\,000$ dao động. Tính tần số dao động của cánh côn trùng.',
      answer: 300,
      unit: 'Hz',
      hints: ['Đổi $1$ phút ra giây trước.', '$1$ phút $= 60$ giây.'],
      solution: 'Tần số $= 18\\,000 : 60 = 300\\ \\text{(Hz)}$.',
    },
    {
      type: 'number',
      prompt:
        'Trên dao động kí, mỗi ô theo chiều ngang ứng với $2\\ \\text{ms}$; một dao động đầy đủ của đường sóng chiếm $5$ ô. Tần số của âm là bao nhiêu?',
      answer: 100,
      unit: 'Hz',
      hints: [
        'Một dao động kéo dài bao nhiêu mili giây?',
        'Đếm xem $1\\,000\\ \\text{ms}$ chứa bao nhiêu dao động như thế.',
      ],
      solution:
        'Một dao động kéo dài $5 \\cdot 2 = 10\\ \\text{ms}$. Trong $1\\,000\\ \\text{ms}$ có $1\\,000 : 10 = 100$ dao động, nên tần số là $100\\ \\text{Hz}$.',
    },
    {
      type: 'multi',
      prompt: 'Tai người bình thường nghe được những âm có tần số nào sau đây?',
      options: [
        '$15\\ \\text{Hz}$',
        '$50\\ \\text{Hz}$',
        '$1\\,000\\ \\text{Hz}$',
        '$18\\,000\\ \\text{Hz}$',
        '$25\\,000\\ \\text{Hz}$',
      ],
      answers: [1, 2, 3],
      hints: ['Tai người nghe được âm có tần số từ $20\\ \\text{Hz}$ đến $20\\,000\\ \\text{Hz}$.'],
      solution:
        '$50$, $1\\,000$ và $18\\,000\\ \\text{Hz}$ nằm trong khoảng $20\\text{–}20\\,000\\ \\text{Hz}$. $15\\ \\text{Hz}$ là hạ âm, $25\\,000\\ \\text{Hz}$ là siêu âm, tai người không nghe được.',
    },
    {
      type: 'choice',
      prompt:
        'Một con lắc dao động với tần số $2\\ \\text{Hz}$. Vì sao ta không nghe thấy âm do con lắc phát ra?',
      options: [
        'Vì con lắc không dao động.',
        'Vì đó là siêu âm.',
        'Vì đó là hạ âm, tần số nhỏ hơn $20\\ \\text{Hz}$.',
        'Vì âm không truyền được trong không khí.',
      ],
      answer: 2,
      hints: ['So sánh $2\\ \\text{Hz}$ với giới hạn dưới của tai người.'],
      solution:
        '$2\\ \\text{Hz} < 20\\ \\text{Hz}$ nên âm do con lắc phát ra là hạ âm; tai người không nghe được hạ âm.',
    },
    {
      type: 'choice',
      prompt: 'Gảy mạnh dây đàn hơn so với lúc trước thì',
      options: [
        'biên độ dao động lớn hơn, âm to hơn.',
        'tần số lớn hơn, âm cao hơn.',
        'biên độ nhỏ hơn, âm nhỏ hơn.',
        'tần số nhỏ hơn, âm trầm hơn.',
      ],
      answer: 0,
      hints: ['Gảy mạnh làm dây lệch nhiều hay ít khỏi vị trí cân bằng?'],
      solution:
        'Gảy mạnh làm dây lệch nhiều hơn khỏi vị trí cân bằng: biên độ dao động lớn hơn nên âm to hơn. Độ cao của âm không đổi vì vẫn là dây đó.',
    },
    {
      type: 'order',
      prompt: 'Sắp xếp các âm theo thứ tự từ trầm nhất đến bổng nhất.',
      items: [
        '$880\\ \\text{Hz}$',
        '$110\\ \\text{Hz}$',
        '$4\\,000\\ \\text{Hz}$',
        '$440\\ \\text{Hz}$',
      ],
      answer: [1, 3, 0, 2],
      hints: ['Tần số càng nhỏ, âm càng trầm.'],
      solution:
        'Xếp theo tần số tăng dần: $110 < 440 < 880 < 4\\,000\\ \\text{(Hz)}$, tức từ trầm nhất đến bổng nhất.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi âm với đặc điểm đúng của nó.',
      left: ['Tiếng muỗi vo ve', 'Tiếng trống lớn khi gõ mạnh', 'Âm $30\\,000\\ \\text{Hz}$'],
      right: [
        'Tần số lớn, biên độ nhỏ: bổng nhưng nhỏ',
        'Tần số nhỏ, biên độ lớn: trầm nhưng to',
        'Siêu âm: tai người không nghe được',
        'Hạ âm: tai người không nghe được',
      ],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
      hints: [
        'Độ cao do tần số quyết định, độ to do biên độ quyết định.',
        'So sánh $30\\,000\\ \\text{Hz}$ với $20\\,000\\ \\text{Hz}$.',
      ],
      solution:
        'Tiếng muỗi bổng nhưng nhỏ: tần số lớn, biên độ nhỏ. Tiếng trống gõ mạnh to nhưng trầm: tần số nhỏ, biên độ lớn. $30\\,000\\ \\text{Hz} > 20\\,000\\ \\text{Hz}$ là siêu âm.',
    },
  ],
  takeaways: [
    'Tần số là số dao động trong $1$ giây, đơn vị héc ($\\text{Hz}$).',
    'Tần số càng lớn, âm càng cao (bổng); tần số càng nhỏ, âm càng thấp (trầm).',
    'Biên độ là độ lệch lớn nhất so với vị trí cân bằng; biên độ càng lớn, âm càng to.',
    'Tai người nghe được âm từ $20\\ \\text{Hz}$ đến $20\\,000\\ \\text{Hz}$; dưới $20\\ \\text{Hz}$ là hạ âm, trên $20\\,000\\ \\text{Hz}$ là siêu âm.',
  ],
};
