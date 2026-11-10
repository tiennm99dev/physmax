/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Sóng ngang có phương dao động của các phần tử vuông góc với phương truyền sóng; sóng dọc có phương dao động trùng với phương truyền sóng, tạo nên các vùng nén và vùng dãn. Sóng truyền năng lượng mà không truyền vật chất; cường độ sóng I = E/(SΔt) = P/S. Mô hình sóng dọc giải thích độ cao và độ to của âm.',
  intro:
    'Sóng trên mặt nước và sóng âm trong không khí đều là sóng cơ. Thế nhưng ta nhìn thấy mặt nước nhấp nhô lên xuống, còn không khí khi có âm truyền qua thì chỉ bị nén lại và dãn ra liên tục. Các phần tử môi trường dao động theo phương nào so với phương truyền sóng, và sóng mang theo điều gì khi lan đi?',
  objectives: [
    'Nêu được định nghĩa sóng ngang, sóng dọc và lấy được ví dụ thực tế cho mỗi loại.',
    'Chỉ ra được phương dao động và phương truyền sóng trong sóng ngang và sóng dọc; nhận ra vùng nén, vùng dãn của sóng dọc.',
    'Nêu được quá trình truyền năng lượng bởi sóng và tính được cường độ sóng.',
    'Dùng mô hình sóng để giải thích được một số tính chất đơn giản của âm.',
  ],
  sections: [
    {
      heading: 'Sóng ngang',
      blocks: [
        {
          type: 'p',
          text: 'Căng ngang một sợi dây cao su dài, cầm một đầu dây lắc lên xuống. Biến dạng của dây truyền dọc theo dây (phương ngang), còn mỗi điểm trên dây chỉ dao động lên xuống (phương thẳng đứng).',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Sóng ngang',
          text: 'Sóng ngang là sóng trong đó các phần tử của môi trường dao động theo phương vuông góc với phương truyền sóng.',
        },
        {
          type: 'p',
          text: 'Ví dụ: sóng trên sợi dây đàn, sóng trên dây cao su; sóng trên mặt nước có thể xem gần đúng là sóng ngang. Sóng cơ ngang truyền được trong chất rắn và trên bề mặt chất lỏng.',
        },
      ],
    },
    {
      heading: 'Sóng dọc',
      blocks: [
        {
          type: 'p',
          text: 'Treo một lò xo dài nằm ngang, nén nhanh rồi thả một đầu lò xo theo phương của trục lò xo. Trên lò xo xuất hiện các vùng các vòng xít lại (vùng nén) xen kẽ các vùng các vòng dãn ra (vùng dãn); các vùng này truyền dọc theo lò xo, còn mỗi vòng lò xo chỉ dao động qua lại quanh vị trí cân bằng dọc theo trục lò xo.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Sóng dọc',
          text: 'Sóng dọc là sóng trong đó các phần tử của môi trường dao động theo phương trùng với phương truyền sóng.',
        },
        {
          type: 'list',
          items: [
            'Với sóng dọc, bước sóng là khoảng cách giữa tâm hai vùng nén liên tiếp (hoặc hai vùng dãn liên tiếp).',
            'Sóng dọc truyền được trong chất rắn, chất lỏng và chất khí.',
            'Sóng âm truyền trong không khí là sóng dọc: lớp không khí sát màng loa bị nén, dãn liên tục và truyền dao động đó cho các lớp không khí kế tiếp.',
          ],
        },
        {
          type: 'table',
          head: ['Đặc điểm', 'Sóng ngang', 'Sóng dọc'],
          rows: [
            ['Phương dao động so với phương truyền', 'Vuông góc', 'Trùng nhau'],
            ['Hình ảnh đặc trưng', 'Đỉnh sóng và đáy sóng', 'Vùng nén và vùng dãn'],
            [
              'Môi trường truyền (sóng cơ)',
              'Chất rắn, bề mặt chất lỏng',
              'Chất rắn, chất lỏng, chất khí',
            ],
            ['Ví dụ', 'Sóng trên dây đàn', 'Sóng âm trong không khí, sóng trên lò xo'],
          ],
        },
      ],
    },
    {
      heading: 'Sự truyền năng lượng của sóng cơ',
      blocks: [
        {
          type: 'p',
          text: 'Khi sóng truyền qua, các phần tử môi trường đang đứng yên bắt đầu dao động, tức là chúng nhận được năng lượng (động năng và thế năng). Năng lượng đó do nguồn sóng cung cấp và được các phần tử truyền dần cho nhau. Vậy quá trình truyền sóng là quá trình truyền năng lượng, còn các phần tử vật chất thì không bị sóng mang đi.',
        },
        {
          type: 'list',
          items: [
            'Sóng thần truyền năng lượng khổng lồ vào bờ, có thể phá huỷ nhà cửa.',
            'Âm rất to làm rung kính cửa sổ, thậm chí làm vỡ kính.',
            'Sóng biển làm quay tua-bin của máy phát điện sóng biển.',
          ],
        },
        {
          type: 'p',
          text: 'Mức độ mạnh yếu của sự truyền năng lượng được đặc trưng bởi cường độ sóng $I$: năng lượng sóng truyền qua một đơn vị diện tích đặt vuông góc với phương truyền sóng trong một đơn vị thời gian.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Cường độ sóng',
          text: '$I = \\dfrac{E}{S\\,\\Delta t} = \\dfrac{P}{S}$, đơn vị W/m$^2$; trong đó $P = \\dfrac{E}{\\Delta t}$ là công suất sóng truyền qua diện tích $S$.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Biên độ và năng lượng',
          text: 'Mỗi phần tử dao động điều hoà có cơ năng $W = \\dfrac{1}{2}m\\omega^2A^2$, nên sóng có biên độ càng lớn thì càng mang nhiều năng lượng.',
        },
      ],
    },
    {
      heading: 'Dùng mô hình sóng giải thích tính chất của âm',
      blocks: [
        {
          type: 'p',
          text: 'Âm là sóng dọc truyền trong môi trường rắn, lỏng, khí. Dùng micro nối với dao động kí, ta thấy được dạng sóng của âm trên màn hình: chiều cao của đồ thị cho biết biên độ, khoảng cách giữa hai đỉnh liền kề cho biết chu kì.',
        },
        {
          type: 'list',
          items: [
            'Âm cần môi trường vật chất để truyền, nên không truyền được trong chân không.',
            'Âm có tần số càng lớn thì nghe càng cao (càng thanh); tần số càng nhỏ thì nghe càng trầm.',
            'Âm có biên độ càng lớn thì nghe càng to.',
            'Tai người bình thường nghe được âm có tần số từ khoảng $16$ Hz đến $20\\,000$ Hz. Âm có tần số dưới $16$ Hz gọi là hạ âm, trên $20\\,000$ Hz gọi là siêu âm.',
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Đọc dao động kí',
          text: 'Nếu trên màn hình, trong khoảng thời gian $0{,}01$ s âm thực hiện $4$ dao động thì $T = \\dfrac{0{,}01}{4} = 0{,}0025$ s và $f = \\dfrac{1}{T} = 400$ Hz.',
        },
      ],
    },
  ],
  explore: {
    title: 'Dây và lò xo',
    instruction:
      'Chọn mô hình sợi dây hoặc lò xo, bấm Cho sóng chạy và theo dõi phần tử màu đỏ. Chọn xem nó dao động vuông góc hay trùng với phương truyền sóng. Với lò xo, quan sát các vùng nén và vùng dãn di chuyển theo sóng trong khi từng vòng chỉ dao động qua lại.',
  },
  examples: [
    {
      problem:
        'Trên một lò xo dài có sóng dọc truyền qua. Khoảng cách giữa tâm của $4$ vùng nén liên tiếp là $60$ cm, đầu lò xo dao động với tần số $2$ Hz. Tính bước sóng và tốc độ truyền sóng trên lò xo.',
      steps: [
        'Giữa tâm $4$ vùng nén liên tiếp có $3$ bước sóng: $3\\lambda = 60$ cm, nên $\\lambda = 20$ cm $= 0{,}2$ m.',
        '$v = \\lambda f = 0{,}2 \\cdot 2 = 0{,}4$ m/s.',
      ],
      answer: '$\\lambda = 20$ cm, $v = 0{,}4$ m/s.',
    },
    {
      problem:
        'Sóng âm có cường độ $2 \\cdot 10^{-4}$ W/m$^2$ truyền vuông góc qua một ô cửa sổ diện tích $1{,}5$ m$^2$. Tính công suất âm truyền qua cửa sổ và năng lượng âm truyền qua nó trong $1$ phút.',
      steps: [
        'Từ $I = \\dfrac{P}{S}$: $P = IS = 2 \\cdot 10^{-4} \\cdot 1{,}5 = 3 \\cdot 10^{-4}$ W.',
        'Đổi $\\Delta t = 1$ phút $= 60$ s.',
        '$E = P\\,\\Delta t = 3 \\cdot 10^{-4} \\cdot 60 = 1{,}8 \\cdot 10^{-2}$ J $= 0{,}018$ J.',
      ],
      answer: '$P = 3 \\cdot 10^{-4}$ W, $E = 0{,}018$ J.',
    },
    {
      problem:
        'Trên màn hình dao động kí, trong khoảng thời gian $0{,}02$ s, sóng âm do một loa phát ra thực hiện $5$ dao động. Tính tần số của âm. Tai người có nghe được âm này không? Nếu tăng biên độ dao động của màng loa mà giữ nguyên tần số thì âm nghe thay đổi thế nào?',
      steps: [
        '$T = \\dfrac{0{,}02}{5} = 0{,}004$ s.',
        '$f = \\dfrac{1}{T} = \\dfrac{1}{0{,}004} = 250$ Hz, nằm trong khoảng $16$ Hz đến $20\\,000$ Hz nên tai người nghe được.',
        'Biên độ tăng, tần số giữ nguyên: âm to hơn nhưng độ cao không đổi.',
      ],
      answer: '$f = 250$ Hz, nghe được; tăng biên độ thì âm to hơn, cao như cũ.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Sóng ngang là sóng có các phần tử môi trường dao động theo phương',
      options: [
        'vuông góc với phương truyền sóng',
        'trùng với phương truyền sóng',
        'nằm ngang',
        'thẳng đứng',
      ],
      answer: 0,
      hints: ['Chữ "ngang" nói về quan hệ giữa phương dao động và phương truyền sóng.'],
      solution:
        'Sóng ngang có phương dao động của các phần tử vuông góc với phương truyền sóng; điều này không phụ thuộc vào việc phương đó nằm ngang hay thẳng đứng.',
    },
    {
      type: 'choice',
      prompt: 'Sóng âm truyền trong không khí là',
      options: ['sóng dọc', 'sóng ngang', 'sóng điện từ', 'vừa là sóng ngang vừa là sóng dọc'],
      answer: 0,
      hints: ['Lớp không khí trước màng loa bị nén và dãn theo phương nào?'],
      solution:
        'Không khí bị nén, dãn theo đúng phương truyền âm: các phần tử dao động trùng phương truyền, nên âm trong không khí là sóng dọc.',
    },
    {
      type: 'multi',
      prompt: 'Sóng cơ dọc truyền được trong những môi trường nào?',
      options: ['Chất rắn', 'Chất lỏng', 'Chất khí', 'Chân không'],
      answers: [0, 1, 2],
      hints: ['Sóng cơ cần các phần tử vật chất liên kết với nhau.'],
      solution:
        'Sóng dọc truyền được trong chất rắn, chất lỏng và chất khí. Chân không không có phần tử vật chất nên không truyền được sóng cơ.',
    },
    {
      type: 'choice',
      prompt: 'Khi sóng cơ truyền đi trong một môi trường, điều gì được truyền đi theo sóng?',
      options: [
        'Năng lượng và trạng thái dao động',
        'Các phần tử vật chất của môi trường',
        'Cả phần tử vật chất lẫn năng lượng',
        'Không có gì được truyền đi',
      ],
      answer: 0,
      hints: ['Chiếc lá trên mặt hồ có bị sóng cuốn đi không?'],
      solution:
        'Các phần tử chỉ dao động tại chỗ; thứ được truyền đi là trạng thái dao động và năng lượng do nguồn cung cấp.',
    },
    {
      type: 'number',
      prompt:
        'Trong $2$ s, sóng truyền một năng lượng $0{,}6$ J qua một diện tích $0{,}5$ m$^2$ đặt vuông góc với phương truyền. Tính cường độ sóng.',
      answer: 0.6,
      unit: 'W/m²',
      hints: ['$I = \\dfrac{E}{S\\,\\Delta t}$.'],
      solution: '$I = \\dfrac{0{,}6}{0{,}5 \\cdot 2} = 0{,}6$ W/m$^2$.',
    },
    {
      type: 'number',
      prompt:
        'Trên một lò xo có sóng dọc, khoảng cách giữa tâm một vùng nén và tâm vùng dãn kề nó là $5$ cm. Đầu lò xo dao động với tần số $4$ Hz. Tính tốc độ truyền sóng (theo cm/s).',
      answer: 40,
      unit: 'cm/s',
      hints: [
        'Vùng nén và vùng dãn kề nhau cách nhau nửa bước sóng.',
        'Tính $\\lambda$ rồi dùng $v = \\lambda f$.',
      ],
      solution:
        '$\\dfrac{\\lambda}{2} = 5$ cm nên $\\lambda = 10$ cm; $v = \\lambda f = 10 \\cdot 4 = 40$ cm/s.',
    },
    {
      type: 'number',
      prompt:
        'Âm có tần số $20\\,000$ Hz truyền trong không khí với tốc độ $340$ m/s. Tính bước sóng của âm (theo cm).',
      answer: 1.7,
      unit: 'cm',
      hints: ['$\\lambda = \\dfrac{v}{f}$, rồi đổi ra xentimét.'],
      solution: '$\\lambda = \\dfrac{340}{20\\,000} = 0{,}017$ m $= 1{,}7$ cm.',
    },
    {
      type: 'choice',
      prompt: 'Một nguồn dao động phát ra sóng âm có tần số $30\\,000$ Hz. Âm này là',
      options: [
        'siêu âm, tai người không nghe được',
        'hạ âm, tai người không nghe được',
        'âm nghe được, rất trầm',
        'âm nghe được, rất cao',
      ],
      answer: 0,
      hints: ['Tai người nghe được âm từ khoảng $16$ Hz đến $20\\,000$ Hz.'],
      solution: '$30\\,000$ Hz lớn hơn $20\\,000$ Hz nên đó là siêu âm, tai người không nghe được.',
    },
    {
      type: 'choice',
      prompt:
        'Trên màn hình dao động kí, đồ thị của âm do một loa phát ra cao gấp đôi lúc trước, còn khoảng cách giữa hai đỉnh liền kề không đổi. So với lúc trước, âm nghe được',
      options: [
        'to hơn, cao như cũ',
        'cao hơn, to như cũ',
        'vừa to hơn vừa cao hơn',
        'nhỏ hơn, trầm hơn',
      ],
      answer: 0,
      hints: ['Chiều cao đồ thị ứng với biên độ, khoảng cách hai đỉnh ứng với chu kì.'],
      solution:
        'Biên độ tăng nên âm to hơn; chu kì, do đó tần số, không đổi nên độ cao của âm không đổi.',
    },
    {
      type: 'number',
      prompt:
        'Trên màn hình dao động kí, trong khoảng thời gian $0{,}01$ s, sóng âm thực hiện $4$ dao động. Tính tần số của âm.',
      answer: 400,
      unit: 'Hz',
      hints: ['Tính chu kì $T$ trước, rồi $f = \\dfrac{1}{T}$.'],
      solution: '$T = \\dfrac{0{,}01}{4} = 0{,}0025$ s, $f = \\dfrac{1}{0{,}0025} = 400$ Hz.',
    },
  ],
  takeaways: [
    'Sóng ngang: phần tử dao động vuông góc với phương truyền sóng (sóng trên dây).',
    'Sóng dọc: phần tử dao động trùng phương truyền sóng, tạo vùng nén và vùng dãn (sóng âm trong không khí, sóng trên lò xo).',
    'Sóng cơ ngang truyền trong chất rắn và trên bề mặt chất lỏng; sóng cơ dọc truyền trong chất rắn, lỏng, khí; sóng cơ không truyền trong chân không.',
    'Sóng truyền năng lượng, không truyền vật chất; cường độ sóng $I = \\dfrac{E}{S\\,\\Delta t} = \\dfrac{P}{S}$ (W/m$^2$).',
    'Âm có tần số càng lớn càng cao, biên độ càng lớn càng to; tai người nghe được âm từ khoảng $16$ Hz đến $20\\,000$ Hz.',
  ],
};
