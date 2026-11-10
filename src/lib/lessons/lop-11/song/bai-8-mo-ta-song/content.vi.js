/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Sóng cơ là dao động cơ lan truyền trong một môi trường. Sóng được mô tả bằng biên độ, chu kì, tần số, bước sóng, tốc độ truyền sóng và cường độ sóng; bước sóng là quãng đường sóng truyền được trong một chu kì, nên λ = vT = v/f.',
  intro:
    'Ném một hòn sỏi xuống mặt hồ yên lặng, những gợn tròn lan rộng ra xa, nhưng chiếc lá nổi trên mặt nước chỉ nhấp nhô tại chỗ mà không trôi theo gợn sóng. Vậy cái gì đã truyền đi, và làm thế nào để mô tả một sóng bằng các con số?',
  objectives: [
    'Nêu được sóng cơ là dao động cơ lan truyền trong một môi trường; các phần tử môi trường chỉ dao động quanh vị trí cân bằng.',
    'Nêu được ý nghĩa của biên độ, chu kì, tần số, bước sóng, tốc độ truyền sóng và cường độ sóng.',
    'Rút ra và vận dụng được công thức $\\lambda = vT = \\dfrac{v}{f}$.',
    'Đọc được biên độ, bước sóng từ đồ thị li độ – quãng đường ($u$ – $x$) và so sánh được pha dao động của các điểm trên phương truyền sóng.',
  ],
  sections: [
    {
      heading: 'Sóng cơ',
      blocks: [
        {
          type: 'p',
          text: 'Thí nghiệm: một cần rung gắn mũi nhọn $O$ chạm nhẹ vào mặt nước và dao động lên xuống; một mẩu xốp nhỏ $C$ nổi trên mặt nước cách $O$ một đoạn. Khi $O$ dao động, mặt nước xuất hiện những gợn sóng tròn lan rộng từ $O$ ra xa, còn mẩu xốp $C$ chỉ nhấp nhô lên xuống tại chỗ.',
        },
        {
          type: 'list',
          items: [
            '$O$ là nguồn sóng.',
            'Nước là môi trường truyền sóng.',
            'Đường thẳng $OC$ là phương truyền sóng.',
          ],
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Sóng cơ',
          text: 'Sóng cơ là dao động cơ lan truyền trong một môi trường.',
        },
        {
          type: 'p',
          text: 'Giải thích: nguồn dao động kéo các phần tử môi trường ở sát nó dao động theo. Nhờ lực liên kết giữa các phần tử, dao động được truyền dần sang các phần tử ở xa hơn, mỗi phần tử bắt đầu dao động muộn hơn phần tử đứng trước nó. Sự lệch pha giữa các phần tử dọc theo phương truyền tạo nên hình dạng của sóng.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Sóng truyền dao động, không truyền phần tử',
          text: 'Mỗi phần tử môi trường chỉ dao động quanh vị trí cân bằng của nó trong một phạm vi hẹp, nhưng trạng thái dao động thì được truyền đi rất xa. Sóng cơ cần môi trường vật chất để truyền, nên không truyền được trong chân không.',
        },
      ],
    },
    {
      heading: 'Các đại lượng đặc trưng của sóng',
      blocks: [
        {
          type: 'table',
          head: ['Đại lượng', 'Ý nghĩa', 'Kí hiệu, đơn vị'],
          rows: [
            [
              'Biên độ sóng',
              'Độ lệch lớn nhất của một phần tử sóng khỏi vị trí cân bằng; biên độ càng lớn, sóng càng mạnh',
              '$A$ (m)',
            ],
            [
              'Chu kì sóng',
              'Chu kì dao động của mỗi phần tử môi trường (bằng chu kì của nguồn)',
              '$T$ (s)',
            ],
            [
              'Tần số sóng',
              'Số dao động mỗi phần tử thực hiện trong một giây, $f = \\dfrac{1}{T}$',
              '$f$ (Hz)',
            ],
            ['Bước sóng', 'Quãng đường sóng truyền được trong một chu kì', '$\\lambda$ (m)'],
            ['Tốc độ truyền sóng', 'Tốc độ lan truyền dao động trong không gian', '$v$ (m/s)'],
            [
              'Cường độ sóng',
              'Năng lượng sóng truyền qua một đơn vị diện tích vuông góc với phương truyền sóng trong một đơn vị thời gian',
              '$I$ (W/m$^2$)',
            ],
          ],
        },
        {
          type: 'p',
          text: 'Nếu năng lượng sóng $E$ truyền qua diện tích $S$ đặt vuông góc với phương truyền trong thời gian $\\Delta t$ thì cường độ sóng là',
        },
        { type: 'tex', tex: 'I = \\frac{E}{S\\,\\Delta t}' },
        {
          type: 'callout',
          tone: 'note',
          title: 'Tốc độ truyền sóng phụ thuộc môi trường',
          text: 'Tốc độ truyền sóng là tốc độ lan truyền của trạng thái dao động, không phải tốc độ dao động của phần tử. Nó do môi trường quyết định: cùng một nguồn, sóng âm truyền trong nước nhanh hơn trong không khí.',
        },
      ],
    },
    {
      heading: 'Liên hệ giữa bước sóng, tốc độ và tần số',
      blocks: [
        {
          type: 'p',
          text: 'Trong một chu kì $T$, sóng truyền được quãng đường bằng một bước sóng $\\lambda$ với tốc độ $v$, nên $\\lambda = vT$. Thay $T = \\dfrac{1}{f}$:',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Công thức sóng',
          text: '$\\lambda = vT = \\dfrac{v}{f}$, hay $v = \\lambda f$.',
        },
        {
          type: 'p',
          text: 'Đồ thị li độ – quãng đường ($u$ – $x$) cho biết li độ $u$ của các phần tử nằm trên phương truyền sóng tại cùng một thời điểm, giống như một bức ảnh chụp sợi dây. Trên đồ thị đó:',
        },
        {
          type: 'list',
          items: [
            'Biên độ $A$ là độ cao của đỉnh sóng so với trục $Ox$.',
            'Bước sóng $\\lambda$ là khoảng cách giữa hai đỉnh sóng liền kề (hoặc hai đáy sóng liền kề). Đó cũng là khoảng cách giữa hai điểm gần nhau nhất trên phương truyền sóng dao động cùng pha.',
            'Hai điểm cách nhau $\\dfrac{\\lambda}{2}$ dao động ngược pha: một điểm ở đỉnh thì điểm kia ở đáy.',
            'Hai điểm cách nhau $\\dfrac{\\lambda}{4}$ dao động vuông pha: một điểm ở đỉnh thì điểm kia ở vị trí cân bằng.',
          ],
        },
        {
          type: 'p',
          text: 'Tổng quát, hai điểm trên cùng một phương truyền sóng cách nhau một đoạn $d$ dao động lệch pha nhau',
        },
        { type: 'tex', tex: '\\Delta\\varphi = \\frac{2\\pi d}{\\lambda}' },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Đếm số đỉnh sóng',
          text: 'Giữa $n$ đỉnh sóng liên tiếp có $n - 1$ khoảng, nên khoảng cách giữa chúng là $(n - 1)\\lambda$. Tương tự, một chiếc phao nhô lên $n$ lần thì đã thực hiện $n - 1$ dao động.',
        },
      ],
    },
  ],
  explore: {
    title: 'Dây sóng ảo',
    instruction:
      'Bấm Lắc đầu dây để nguồn $O$ dao động và quan sát biến dạng lan dọc dây, trong khi hạt vàng chỉ lên xuống tại chỗ. Bấm Dừng, rồi kéo hai vạch đỏ đến hai đỉnh sóng liền kề để đo bước sóng. Đổi tần số, biên độ, loại dây và đo lại: bước sóng thay đổi thế nào?',
  },
  examples: [
    {
      problem:
        'Một người quan sát một chiếc phao trên mặt biển thấy nó nhô lên cao $10$ lần trong $18$ s, và đo được khoảng cách giữa $5$ đỉnh sóng liên tiếp là $2$ m. Tính chu kì, bước sóng và tốc độ truyền sóng.',
      steps: [
        'Phao nhô lên $10$ lần thì thực hiện $9$ dao động trong $18$ s: $T = \\dfrac{18}{9} = 2$ s.',
        'Giữa $5$ đỉnh sóng liên tiếp có $4$ bước sóng: $4\\lambda = 2$ m, nên $\\lambda = 0{,}5$ m.',
        '$v = \\dfrac{\\lambda}{T} = \\dfrac{0{,}5}{2} = 0{,}25$ m/s.',
      ],
      answer: '$T = 2$ s, $\\lambda = 0{,}5$ m, $v = 0{,}25$ m/s.',
    },
    {
      problem:
        'Một học sinh chỉ nghe được âm có tần số từ $30$ Hz đến $16\\,000$ Hz. Âm truyền trong không khí với tốc độ $330$ m/s. Tính bước sóng ngắn nhất và dài nhất của âm mà học sinh này nghe được.',
      steps: [
        'Theo $\\lambda = \\dfrac{v}{f}$, bước sóng ngắn nhất ứng với tần số lớn nhất.',
        '$\\lambda_{min} = \\dfrac{330}{16\\,000} \\approx 0{,}021$ m $\\approx 2{,}1$ cm.',
        '$\\lambda_{max} = \\dfrac{330}{30} = 11$ m.',
      ],
      answer: 'Bước sóng từ khoảng $2{,}1$ cm đến $11$ m.',
    },
    {
      problem:
        'Đồ thị $u$ – $x$ của một sóng hình sin có đỉnh cao $4$ cm, hai đỉnh liền kề cách nhau $40$ cm. Nguồn dao động với tần số $5$ Hz. Tính biên độ, bước sóng, tốc độ truyền sóng và độ lệch pha của hai điểm trên phương truyền cách nhau $10$ cm.',
      steps: [
        'Biên độ là độ cao của đỉnh: $A = 4$ cm.',
        'Bước sóng là khoảng cách hai đỉnh liền kề: $\\lambda = 40$ cm $= 0{,}4$ m.',
        '$v = \\lambda f = 0{,}4 \\cdot 5 = 2$ m/s.',
        '$\\Delta\\varphi = \\dfrac{2\\pi d}{\\lambda} = \\dfrac{2\\pi \\cdot 10}{40} = \\dfrac{\\pi}{2}$: hai điểm dao động vuông pha.',
      ],
      answer:
        '$A = 4$ cm, $\\lambda = 0{,}4$ m, $v = 2$ m/s, $\\Delta\\varphi = \\dfrac{\\pi}{2}$ rad.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Bước sóng là',
      options: [
        'quãng đường sóng truyền được trong một chu kì',
        'quãng đường một phần tử môi trường đi được trong một chu kì',
        'khoảng cách giữa hai điểm gần nhau nhất trên phương truyền sóng dao động ngược pha',
        'quãng đường sóng truyền được trong một giây',
      ],
      answer: 0,
      hints: ['Nhớ công thức $\\lambda = vT$.'],
      solution:
        'Bước sóng là quãng đường sóng truyền được trong một chu kì: $\\lambda = vT$. Quãng đường phần tử đi được trong một chu kì là $4A$; hai điểm gần nhất dao động ngược pha cách nhau $\\dfrac{\\lambda}{2}$; quãng đường sóng truyền trong một giây có độ lớn bằng tốc độ $v$.',
    },
    {
      type: 'choice',
      prompt: 'Khi sóng truyền trên mặt hồ, một chiếc lá nổi trên mặt nước sẽ',
      options: [
        'chỉ nhấp nhô lên xuống quanh vị trí cân bằng',
        'trôi ra xa nguồn cùng với sóng',
        'trôi lại gần nguồn sóng',
        'đứng yên hoàn toàn',
      ],
      answer: 0,
      hints: ['Sóng truyền trạng thái dao động hay truyền các phần tử nước?'],
      solution:
        'Sóng chỉ truyền trạng thái dao động; mỗi phần tử nước (và chiếc lá) chỉ dao động quanh vị trí cân bằng, không bị sóng cuốn đi.',
    },
    {
      type: 'number',
      prompt:
        'Một sóng cơ có tần số $50$ Hz truyền trên một sợi dây với tốc độ $2$ m/s. Tính bước sóng (theo cm).',
      answer: 4,
      unit: 'cm',
      hints: ['$\\lambda = \\dfrac{v}{f}$.', 'Đổi kết quả từ mét ra xentimét.'],
      solution: '$\\lambda = \\dfrac{v}{f} = \\dfrac{2}{50} = 0{,}04$ m $= 4$ cm.',
    },
    {
      type: 'number',
      prompt:
        'Một chiếc phao nhô lên cao $6$ lần trong $10$ s khi có sóng truyền qua. Tính chu kì của sóng.',
      answer: 2,
      unit: 's',
      hints: ['Nhô lên $6$ lần thì đã thực hiện bao nhiêu dao động?'],
      solution: 'Nhô lên $6$ lần ứng với $5$ dao động, nên $T = \\dfrac{10}{5} = 2$ s.',
    },
    {
      type: 'number',
      prompt:
        'Trên mặt nước, khoảng cách giữa $7$ gợn lồi liên tiếp là $3$ cm. Nguồn sóng dao động với tần số $40$ Hz. Tính tốc độ truyền sóng (theo cm/s).',
      answer: 20,
      unit: 'cm/s',
      hints: [
        'Giữa $7$ gợn lồi liên tiếp có bao nhiêu bước sóng?',
        'Tính $\\lambda$ rồi dùng $v = \\lambda f$.',
      ],
      solution:
        'Có $6$ bước sóng: $6\\lambda = 3$ cm, $\\lambda = 0{,}5$ cm. $v = \\lambda f = 0{,}5 \\cdot 40 = 20$ cm/s.',
    },
    {
      type: 'number',
      prompt:
        'Âm có tần số $680$ Hz truyền trong không khí với tốc độ $340$ m/s. Tính bước sóng của âm.',
      answer: 0.5,
      unit: 'm',
      hints: ['$\\lambda = \\dfrac{v}{f}$.'],
      solution: '$\\lambda = \\dfrac{340}{680} = 0{,}5$ m.',
    },
    {
      type: 'choice',
      prompt:
        'Một sóng có bước sóng $60$ cm. Hai điểm trên cùng một phương truyền sóng cách nhau $30$ cm dao động',
      options: ['ngược pha', 'cùng pha', 'vuông pha', 'lệch pha $\\dfrac{\\pi}{3}$'],
      answer: 0,
      hints: ['Tính $\\Delta\\varphi = \\dfrac{2\\pi d}{\\lambda}$.'],
      solution:
        '$\\Delta\\varphi = \\dfrac{2\\pi \\cdot 30}{60} = \\pi$: hai điểm dao động ngược pha (cách nhau nửa bước sóng).',
    },
    {
      type: 'choice',
      prompt: 'Sóng cơ không truyền được trong môi trường nào sau đây?',
      options: ['Chân không', 'Không khí', 'Nước', 'Thép'],
      answer: 0,
      hints: ['Sóng cơ truyền dao động nhờ lực liên kết giữa các phần tử của môi trường.'],
      solution:
        'Sóng cơ cần các phần tử vật chất liên kết với nhau để truyền dao động; chân không không có phần tử vật chất nên sóng cơ không truyền được.',
    },
    {
      type: 'number',
      prompt:
        'Trong $0{,}5$ s, sóng truyền một năng lượng $6$ J qua một diện tích $2$ m$^2$ đặt vuông góc với phương truyền. Tính cường độ sóng.',
      answer: 6,
      unit: 'W/m²',
      hints: ['$I = \\dfrac{E}{S\\,\\Delta t}$.'],
      solution: '$I = \\dfrac{E}{S\\,\\Delta t} = \\dfrac{6}{2 \\cdot 0{,}5} = 6$ W/m$^2$.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi đại lượng đặc trưng của sóng với đơn vị của nó trong hệ SI.',
      left: [
        'Bước sóng $\\lambda$',
        'Tần số $f$',
        'Chu kì $T$',
        'Tốc độ truyền sóng $v$',
        'Cường độ sóng $I$',
      ],
      right: ['m', 'Hz', 's', 'm/s', 'W/m$^2$'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
        [4, 4],
      ],
      hints: ['Cường độ sóng là năng lượng trên một đơn vị diện tích trong một đơn vị thời gian.'],
      solution:
        '$\\lambda$ đo bằng m, $f$ bằng Hz, $T$ bằng s, $v$ bằng m/s, còn $I = \\dfrac{E}{S\\,\\Delta t}$ đo bằng J/(m$^2 \\cdot$ s) $=$ W/m$^2$.',
    },
  ],
  takeaways: [
    'Sóng cơ là dao động cơ lan truyền trong một môi trường; các phần tử chỉ dao động quanh vị trí cân bằng, sóng không truyền được trong chân không.',
    'Các đại lượng đặc trưng: biên độ $A$, chu kì $T$, tần số $f = \\dfrac{1}{T}$, bước sóng $\\lambda$, tốc độ truyền sóng $v$, cường độ sóng $I = \\dfrac{E}{S\\,\\Delta t}$.',
    'Bước sóng là quãng đường sóng truyền trong một chu kì: $\\lambda = vT = \\dfrac{v}{f}$.',
    'Trên đồ thị $u$ – $x$, hai đỉnh liền kề cách nhau $\\lambda$; hai điểm cách nhau $d$ lệch pha $\\Delta\\varphi = \\dfrac{2\\pi d}{\\lambda}$.',
  ],
};
