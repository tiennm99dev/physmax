/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Động năng Wđ = ½mv² là năng lượng do chuyển động; công của lực bằng độ biến thiên động năng; thế năng trọng trường Wt = mgh phụ thuộc vào mốc thế năng.',
  intro:
    'Viên đạn nhỏ xuyên thủng tấm thép, còn búa máy nâng lên cao rồi thả xuống đóng được cọc sâu vào đất. Cả hai đều có khả năng sinh công: một do đang chuyển động, một do đang ở trên cao. Năng lượng đó tính thế nào?',
  objectives: [
    'Nêu được khái niệm động năng và viết được công thức $W_đ = \\dfrac{1}{2}mv^2$.',
    'Phát biểu được định lí động năng và vận dụng được để tính công, lực, tốc độ.',
    'Nêu được khái niệm thế năng trọng trường, viết được công thức $W_t = mgh$.',
    'Giải thích được sự phụ thuộc của thế năng vào mốc thế năng.',
  ],
  sections: [
    {
      heading: 'Động năng',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Động năng',
          text: 'Động năng là năng lượng vật có được do chuyển động. Vật khối lượng $m$ chuyển động với tốc độ $v$ có động năng $W_đ = \\dfrac{1}{2}mv^2$, với $m$ tính bằng kg, $v$ bằng m/s và $W_đ$ bằng J.',
        },
        {
          type: 'p',
          text: 'Công thức suy ra từ công: vật đứng yên, chịu lực không đổi $F$ và đi được quãng đường $s$ thì $v^2 = 2as$ và $F = ma$, nên $A = F\\,s = ma \\cdot \\dfrac{v^2}{2a} = \\dfrac{1}{2}mv^2$.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Tốc độ quan trọng hơn khối lượng',
          text: 'Động năng tỉ lệ với bình phương tốc độ. Tốc độ tăng gấp đôi thì động năng tăng gấp bốn, vì thế xe chạy nhanh rất nguy hiểm khi va chạm. Động năng là đại lượng vô hướng, không âm.',
        },
      ],
    },
    {
      heading: 'Định lí động năng',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Định lí động năng',
          text: 'Độ biến thiên động năng của một vật bằng công của lực tác dụng lên vật (hợp lực, nếu có nhiều lực): $A = W_{đ2} - W_{đ1} = \\dfrac{1}{2}mv_2^2 - \\dfrac{1}{2}mv_1^2$.',
        },
        {
          type: 'list',
          items: [
            'Công dương (lực phát động): động năng tăng, vật nhanh lên.',
            'Công âm (lực cản): động năng giảm, vật chậm lại.',
          ],
        },
        { type: 'widget', name: 'dinh-li-dong-nang' },
      ],
    },
    {
      heading: 'Thế năng trọng trường',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Thế năng trọng trường',
          text: 'Vật ở độ cao $h$ so với mốc đã chọn dự trữ năng lượng dưới dạng thế năng trọng trường: $W_t = Ph = mgh$. Mốc thế năng là nơi $h = 0$; thường chọn mặt đất, nhưng có thể chọn nơi khác.',
        },
        {
          type: 'p',
          text: 'Giá trị $W_t$ bằng công cần thực hiện để nâng đều vật từ mốc lên độ cao $h$: $A = F\\,s = P\\,h = mgh$. Công này chỉ phụ thuộc hiệu độ cao, không phụ thuộc vào đường đi.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Thế năng phụ thuộc mốc',
          text: 'Đổi mốc thì $W_t$ của vật đổi theo; vật ở dưới mốc có $W_t$ âm. Nhưng độ chênh thế năng giữa hai vị trí không đổi, nên kết quả các bài toán không phụ thuộc vào mốc đã chọn.',
        },
        {
          type: 'p',
          text: 'Ngoài thế năng trọng trường còn có thế năng đàn hồi, như của lò xo bị nén hay cánh cung đang giương.',
        },
      ],
    },
  ],
  explore: {
    title: 'Tàu lượn ảo',
    instruction:
      'Thả tàu chạy hoặc kéo toa tàu dọc đường ray, quan sát hai thanh năng lượng. Thử đổi khối lượng và đổi mốc thế năng: đại lượng nào thay đổi, đại lượng nào giữ nguyên?',
  },
  examples: [
    {
      problem: 'Ô tô $1{,}5$ tấn chạy với tốc độ $72$ km/h. Tính động năng của xe.',
      steps: [
        'Đổi $m = 1\\,500$ kg, $v = 20$ m/s.',
        '$W_đ = \\dfrac{1}{2} \\cdot 1\\,500 \\cdot 20^2 = 300\\,000$ J.',
      ],
      answer: '$W_đ = 300$ kJ.',
    },
    {
      problem:
        'Xe $1\\,000$ kg tăng tốc từ $10$ m/s lên $20$ m/s trên đoạn đường ngang $100$ m. Tính công và độ lớn của hợp lực tác dụng lên xe.',
      steps: [
        '$W_{đ1} = \\dfrac{1}{2} \\cdot 1\\,000 \\cdot 10^2 = 50\\,000$ J; $W_{đ2} = \\dfrac{1}{2} \\cdot 1\\,000 \\cdot 20^2 = 200\\,000$ J.',
        'Định lí động năng: $A = 200\\,000 - 50\\,000 = 150\\,000$ J.',
        'Hợp lực cùng hướng chuyển động: $F = \\dfrac{A}{s} = \\dfrac{150\\,000}{100} = 1\\,500$ N.',
      ],
      answer: '$A = 150$ kJ, $F = 1\\,500$ N.',
    },
    {
      problem:
        'Vật $2$ kg ở cách mặt đất $10$ m, dưới vật là sàn tầng cao $4$ m. Lấy $g = 9{,}8$ m/s². Tính thế năng của vật khi chọn mốc ở mặt đất và khi chọn mốc ở sàn tầng.',
      steps: [
        'Mốc ở mặt đất: $h = 10$ m, $W_t = 2 \\cdot 9{,}8 \\cdot 10 = 196$ J.',
        'Mốc ở sàn tầng: $h = 10 - 4 = 6$ m, $W_t = 2 \\cdot 9{,}8 \\cdot 6 = 117{,}6$ J.',
      ],
      answer: '$196$ J và $117{,}6$ J.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt: 'Vật $2$ kg chuyển động với tốc độ $3$ m/s. Tính động năng của vật.',
      answer: 9,
      unit: 'J',
      hints: ['$W_đ = \\dfrac{1}{2}mv^2$; đừng quên bình phương tốc độ.'],
      solution: '$W_đ = \\dfrac{1}{2} \\cdot 2 \\cdot 3^2 = 9$ J.',
    },
    {
      type: 'number',
      prompt: 'Viên đạn $50$ g bay với tốc độ $200$ m/s. Tính động năng của viên đạn.',
      answer: 1000,
      unit: 'J',
      hints: ['Đổi khối lượng ra kilôgam.'],
      solution: '$m = 0{,}05$ kg; $W_đ = \\dfrac{1}{2} \\cdot 0{,}05 \\cdot 200^2 = 1\\,000$ J.',
    },
    {
      type: 'number',
      prompt: 'Vật $4$ kg có động năng $200$ J. Tính tốc độ của vật.',
      answer: 10,
      unit: 'm/s',
      hints: ['Rút $v^2$ từ công thức động năng.', '$v^2 = \\dfrac{2W_đ}{m}$.'],
      solution: '$v^2 = \\dfrac{2 \\cdot 200}{4} = 100$, nên $v = 10$ m/s.',
    },
    {
      type: 'choice',
      prompt: 'Khối lượng không đổi, tốc độ của vật tăng gấp đôi thì động năng',
      options: ['tăng gấp $4$ lần', 'tăng gấp $2$ lần', 'không đổi', 'giảm một nửa'],
      answer: 0,
      hints: ['Động năng tỉ lệ với $v^2$.'],
      solution: '$W_đ \\sim v^2$, nên $v$ gấp $2$ thì $W_đ$ gấp $2^2 = 4$ lần.',
    },
    {
      type: 'number',
      prompt:
        'Vật $3$ kg ở độ cao $5$ m so với mặt đất, mốc thế năng ở mặt đất. Lấy $g = 9{,}8$ m/s². Tính thế năng.',
      answer: 147,
      unit: 'J',
      hints: ['$W_t = mgh$.'],
      solution: '$W_t = 3 \\cdot 9{,}8 \\cdot 5 = 147$ J.',
    },
    {
      type: 'number',
      prompt:
        'Ô tô $1\\,200$ kg đang chạy $20$ m/s thì phanh, dừng lại sau $40$ m. Coi lực cản không đổi. Tính độ lớn của lực cản.',
      answer: 6000,
      unit: 'N',
      hints: [
        'Xe dừng lại nên $W_{đ2} = 0$; công của lực cản bằng độ biến thiên động năng.',
        'Công của lực cản là $-F\\,s$.',
      ],
      solution:
        '$W_{đ1} = \\dfrac{1}{2} \\cdot 1\\,200 \\cdot 20^2 = 240\\,000$ J. $-F \\cdot 40 = 0 - 240\\,000$ nên $F = 6\\,000$ N.',
    },
    {
      type: 'number',
      prompt:
        'Vật $0{,}5$ kg đang đứng yên, chịu hợp lực $10$ N và đi được $5$ m theo hướng của lực. Tính tốc độ của vật (làm tròn đến hai chữ số thập phân).',
      answer: 14.14,
      tolerance: 0.02,
      unit: 'm/s',
      hints: ['Tính công của lực, đó chính là động năng cuối.', '$\\dfrac{1}{2}mv^2 = F\\,s$.'],
      solution:
        '$A = 10 \\cdot 5 = 50$ J $= \\dfrac{1}{2} \\cdot 0{,}5 \\cdot v^2$, nên $v^2 = 200$ và $v \\approx 14{,}14$ m/s.',
    },
    {
      type: 'multi',
      prompt: 'Thế năng trọng trường của một vật phụ thuộc vào những yếu tố nào?',
      options: [
        'Khối lượng của vật',
        'Độ cao so với mốc thế năng',
        'Vị trí chọn làm mốc',
        'Tốc độ của vật',
      ],
      answers: [0, 1, 2],
      hints: ['Đọc lại công thức $W_t = mgh$; $h$ đo từ đâu?'],
      solution:
        'Trong $W_t = mgh$ có $m$ và $h$; $h$ đo từ mốc nên $W_t$ phụ thuộc mốc. Tốc độ chỉ ảnh hưởng đến động năng.',
    },
    {
      type: 'number',
      prompt:
        'Vật $5$ kg ở đáy giếng sâu $4$ m, chọn mốc thế năng ở miệng giếng. Lấy $g = 9{,}8$ m/s². Tính thế năng của vật.',
      answer: -196,
      unit: 'J',
      hints: ['Vật ở dưới mốc nên $h$ mang dấu âm.'],
      solution: '$h = -4$ m; $W_t = 5 \\cdot 9{,}8 \\cdot (-4) = -196$ J.',
    },
    {
      type: 'choice',
      prompt:
        'Nâng đều cùng một vật lên cùng một độ cao, một lần theo phương thẳng đứng, một lần qua mặt phẳng nghiêng không ma sát. So sánh công của lực nâng.',
      options: [
        'Hai công bằng nhau',
        'Nâng thẳng đứng tốn công hơn',
        'Qua mặt phẳng nghiêng tốn công hơn',
        'Không so sánh được',
      ],
      answer: 0,
      hints: ['Công để nâng vật chỉ phụ thuộc vào gì?'],
      solution:
        'Công nâng vật bằng độ tăng thế năng $mgh$, chỉ phụ thuộc hiệu độ cao, không phụ thuộc đường đi. Mặt phẳng nghiêng lợi về lực nhưng thiệt về đường đi.',
    },
  ],
  takeaways: [
    'Động năng: $W_đ = \\dfrac{1}{2}mv^2$, tỉ lệ với bình phương tốc độ.',
    'Định lí động năng: $A = W_{đ2} - W_{đ1}$; công dương làm vật nhanh lên, công âm làm vật chậm lại.',
    'Thế năng trọng trường: $W_t = mgh$, với $h$ đo từ mốc thế năng đã chọn.',
  ],
};
