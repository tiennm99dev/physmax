/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Cơ năng W = Wđ + Wt là tổng động năng và thế năng; khi vật chỉ chịu tác dụng của trọng lực, cơ năng được bảo toàn, đây là công cụ mạnh để giải bài toán chuyển động.',
  intro:
    'Trên tàu lượn, toa tàu lao xuống dốc thật nhanh rồi lại vọt lên đỉnh tiếp theo mà không cần động cơ. Tốc độ mất đi rồi lấy lại từ đâu? Có một đại lượng gần như không đổi suốt hành trình.',
  objectives: [
    'Nêu được sự chuyển hoá giữa động năng và thế năng khi vật chuyển động trong trọng trường.',
    'Định nghĩa được cơ năng, viết được công thức $W = W_đ + W_t$.',
    'Phát biểu được định luật bảo toàn cơ năng và điều kiện áp dụng.',
    'Vận dụng được định luật để giải bài toán rơi tự do, ném lên, con lắc.',
  ],
  sections: [
    {
      heading: 'Chuyển hoá giữa động năng và thế năng',
      blocks: [
        {
          type: 'p',
          text: 'Khi vật chuyển động trong trọng trường, động năng và thế năng có thể chuyển hoá qua lại. Ném bóng lên cao: tốc độ giảm, độ cao tăng, động năng chuyển hoá thành thế năng. Khi bóng rơi xuống thì ngược lại.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Cơ năng',
          text: 'Cơ năng của một vật là tổng động năng và thế năng của vật: $W = W_đ + W_t = \\dfrac{1}{2}mv^2 + mgh$.',
        },
        {
          type: 'p',
          text: 'Giống như thế năng, giá trị của cơ năng phụ thuộc vào mốc thế năng đã chọn, nên phải nêu rõ mốc trước khi tính.',
        },
      ],
    },
    {
      heading: 'Định luật bảo toàn cơ năng',
      blocks: [
        {
          type: 'p',
          text: 'Con lắc đơn dao động giữa hai biên $A$, $B$ qua vị trí cân bằng $O$. Ở biên, tốc độ bằng $0$, thế năng lớn nhất. Ở $O$, thế năng nhỏ nhất, động năng lớn nhất. Nếu bỏ qua lực cản, con lắc trở lại đúng độ cao ban đầu.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Định luật bảo toàn cơ năng',
          text: 'Khi một vật chuyển động trong trọng trường và chỉ chịu tác dụng của trọng lực, cơ năng của vật là một đại lượng bảo toàn: $W = W_đ + W_t = \\text{hằng số}$.',
        },
        { type: 'tex', tex: '\\dfrac{1}{2}mv_1^2 + mgh_1 = \\dfrac{1}{2}mv_2^2 + mgh_2' },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Khi có lực cản',
          text: 'Có lực cản hay ma sát thì cơ năng không bảo toàn: phần cơ năng giảm đi bằng độ lớn công của lực cản và chuyển thành dạng năng lượng khác, chủ yếu là nhiệt. Tổng mọi dạng năng lượng vẫn bảo toàn.',
        },
      ],
    },
    {
      heading: 'Vận dụng định luật',
      blocks: [
        {
          type: 'list',
          ordered: true,
          items: [
            'Kiểm tra điều kiện: vật chỉ chịu trọng lực (hoặc lực cản không đáng kể; lực căng dây và phản lực vuông góc với chuyển động không làm đổi cơ năng).',
            'Chọn mốc thế năng.',
            'Viết cơ năng tại hai vị trí và cho chúng bằng nhau.',
            'Rút đại lượng cần tìm; thường khối lượng được giản ước.',
          ],
        },
        {
          type: 'p',
          text: 'Ưu điểm của cách này là không cần biết thời gian hay hình dạng đường đi, chỉ cần trạng thái đầu và cuối.',
        },
      ],
    },
  ],
  explore: {
    title: 'Con lắc và biểu đồ năng lượng',
    instruction:
      'Kéo quả nặng để chọn góc lệch rồi thả. Quan sát biểu đồ năng lượng và đường cơ năng trên đồ thị. Bật "Có lực cản" khi con lắc đang chạy: cơ năng và biên độ thay đổi ra sao?',
  },
  examples: [
    {
      problem:
        'Thả rơi tự do một vật từ độ cao $20$ m so với mặt đất. Bỏ qua lực cản, lấy $g = 10$ m/s². Tính tốc độ của vật khi chạm đất.',
      steps: [
        'Vật chỉ chịu trọng lực nên cơ năng bảo toàn. Chọn mốc thế năng ở mặt đất.',
        'Lúc thả: $W_1 = mgh$. Lúc chạm đất: $W_2 = \\dfrac{1}{2}mv^2$.',
        '$mgh = \\dfrac{1}{2}mv^2$ nên $v = \\sqrt{2gh} = \\sqrt{2 \\cdot 10 \\cdot 20} = 20$ m/s.',
      ],
      answer: '$v = 20$ m/s, không phụ thuộc khối lượng.',
    },
    {
      problem:
        'Ném vật $0{,}2$ kg thẳng đứng lên từ mặt đất với tốc độ $10$ m/s. Bỏ qua lực cản, lấy $g = 10$ m/s², mốc thế năng ở mặt đất. Tính cơ năng, độ cao lớn nhất và độ cao tại đó động năng bằng thế năng.',
      steps: [
        'Lúc ném: $W = \\dfrac{1}{2} \\cdot 0{,}2 \\cdot 10^2 = 10$ J.',
        'Ở độ cao lớn nhất $v = 0$: $mgh_{max} = W$, nên $h_{max} = \\dfrac{10}{0{,}2 \\cdot 10} = 5$ m.',
        'Khi $W_đ = W_t$ thì $W = 2W_t = 2mgh$, nên $h = \\dfrac{10}{2 \\cdot 0{,}2 \\cdot 10} = 2{,}5$ m.',
      ],
      answer: '$W = 10$ J; $h_{max} = 5$ m; $h = 2{,}5$ m.',
    },
    {
      problem:
        'Vật $2$ kg trượt từ đỉnh dốc cao $5$ m, xuất phát từ trạng thái nghỉ, đến chân dốc có tốc độ $8$ m/s. Lấy $g = 9{,}8$ m/s². Cơ năng có bảo toàn không? Tính phần cơ năng đã mất.',
      steps: [
        'Chọn mốc thế năng ở chân dốc. Tại đỉnh: $W_1 = 2 \\cdot 9{,}8 \\cdot 5 = 98$ J.',
        'Tại chân dốc: $W_2 = \\dfrac{1}{2} \\cdot 2 \\cdot 8^2 = 64$ J.',
        '$W_2 < W_1$ nên cơ năng không bảo toàn; phần mất đi là $98 - 64 = 34$ J, chuyển thành nhiệt do ma sát.',
      ],
      answer: 'Không bảo toàn; mất $34$ J.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt:
        'Vật $1$ kg ở độ cao $10$ m so với mốc thế năng, đang có tốc độ $5$ m/s. Lấy $g = 10$ m/s². Tính cơ năng của vật.',
      answer: 112.5,
      unit: 'J',
      hints: ['Tính riêng động năng và thế năng rồi cộng lại.'],
      solution:
        '$W = \\dfrac{1}{2} \\cdot 1 \\cdot 5^2 + 1 \\cdot 10 \\cdot 10 = 12{,}5 + 100 = 112{,}5$ J.',
    },
    {
      type: 'number',
      prompt:
        'Thả rơi tự do một vật từ độ cao $45$ m. Bỏ qua lực cản, lấy $g = 10$ m/s². Tính tốc độ khi chạm đất.',
      answer: 30,
      unit: 'm/s',
      hints: ['Thế năng ban đầu chuyển hết thành động năng lúc chạm đất.'],
      solution: '$v = \\sqrt{2gh} = \\sqrt{2 \\cdot 10 \\cdot 45} = \\sqrt{900} = 30$ m/s.',
    },
    {
      type: 'number',
      prompt:
        'Ném vật thẳng đứng lên từ mặt đất với tốc độ $20$ m/s. Bỏ qua lực cản, lấy $g = 10$ m/s². Tính độ cao lớn nhất.',
      answer: 20,
      unit: 'm',
      hints: ['Ở điểm cao nhất vận tốc bằng $0$.'],
      solution:
        '$\\dfrac{1}{2}mv^2 = mgh_{max}$ nên $h_{max} = \\dfrac{v^2}{2g} = \\dfrac{400}{20} = 20$ m.',
    },
    {
      type: 'choice',
      prompt: 'Cơ năng của một vật được bảo toàn khi',
      options: [
        'vật chỉ chịu tác dụng của trọng lực',
        'vật chuyển động thẳng đều',
        'vật có khối lượng nhỏ',
        'vật chuyển động trên mặt phẳng nghiêng bất kì',
      ],
      answer: 0,
      hints: ['Nhớ lại điều kiện trong phát biểu của định luật.'],
      solution:
        'Định luật áp dụng khi vật chuyển động trong trọng trường và chỉ chịu tác dụng của trọng lực. Một vật đi đều xuống dốc nhờ ma sát có cơ năng giảm, nên chuyển động đều chưa đủ.',
    },
    {
      type: 'number',
      prompt:
        'Thả rơi một vật từ độ cao $30$ m so với mặt đất, bỏ qua lực cản, mốc thế năng ở mặt đất. Tại độ cao nào động năng bằng thế năng?',
      answer: 15,
      unit: 'm',
      hints: ['Khi $W_đ = W_t$, cơ năng bằng hai lần thế năng.'],
      solution: '$mg \\cdot 30 = 2mgh$ nên $h = 15$ m.',
    },
    {
      type: 'number',
      prompt:
        'Thả rơi một vật từ độ cao $20$ m so với mặt đất, bỏ qua lực cản, mốc thế năng ở mặt đất. Tại độ cao nào động năng bằng ba lần thế năng?',
      answer: 5,
      unit: 'm',
      hints: ['$W = W_đ + W_t = 4W_t$.'],
      solution: '$mg \\cdot 20 = 4mgh$ nên $h = 5$ m.',
    },
    {
      type: 'number',
      prompt:
        'Con lắc đơn dài $2$ m, kéo lệch $60^\\circ$ rồi thả nhẹ, bỏ qua lực cản, lấy $g = 9{,}8$ m/s². Tính tốc độ của quả nặng khi qua vị trí cân bằng (làm tròn đến hai chữ số thập phân).',
      answer: 4.43,
      tolerance: 0.02,
      unit: 'm/s',
      hints: [
        'Độ cao của quả nặng so với vị trí cân bằng là $h = \\ell(1 - \\cos\\alpha)$.',
        'Thế năng ở biên chuyển hết thành động năng ở vị trí cân bằng.',
      ],
      solution:
        '$h = 2(1 - \\cos 60^\\circ) = 1$ m; $v = \\sqrt{2gh} = \\sqrt{19{,}6} \\approx 4{,}43$ m/s.',
    },
    {
      type: 'multi',
      prompt: 'Cơ năng của vật được bảo toàn trong những trường hợp nào?',
      options: [
        'Quả táo rơi tự do',
        'Quả bóng ném xiên lên trong chân không',
        'Vật trượt trên sàn nhám và dừng lại',
        'Người nhảy dù rơi đều nhờ dù',
      ],
      answers: [0, 1],
      hints: ['Có lực nào khác ngoài trọng lực sinh công không?'],
      solution:
        'Táo rơi tự do và bóng trong chân không chỉ chịu trọng lực. Vật trượt chịu ma sát; người nhảy dù chịu lực cản của dù: độ cao giảm mà tốc độ không tăng, cơ năng giảm.',
    },
    {
      type: 'number',
      prompt:
        'Vật $5$ kg trượt từ đỉnh dốc cao $4$ m, xuất phát từ trạng thái nghỉ, đến chân dốc có tốc độ $6$ m/s. Lấy $g = 10$ m/s². Tính phần cơ năng đã chuyển thành nhiệt.',
      answer: 110,
      unit: 'J',
      hints: ['So sánh cơ năng tại đỉnh và tại chân dốc.'],
      solution:
        '$W_1 = 5 \\cdot 10 \\cdot 4 = 200$ J; $W_2 = \\dfrac{1}{2} \\cdot 5 \\cdot 6^2 = 90$ J; phần mất đi là $110$ J.',
    },
    {
      type: 'choice',
      prompt: 'Khi quả nặng của con lắc đi từ biên về vị trí cân bằng (bỏ qua lực cản) thì',
      options: [
        'thế năng giảm, động năng tăng, cơ năng không đổi',
        'thế năng tăng, động năng giảm, cơ năng không đổi',
        'thế năng và động năng cùng tăng',
        'cơ năng giảm dần về $0$',
      ],
      answer: 0,
      hints: ['Quả nặng đi xuống thấp hơn và nhanh dần.'],
      solution:
        'Độ cao giảm nên thế năng giảm, tốc độ tăng nên động năng tăng, tổng của chúng không đổi vì không có lực cản.',
    },
    {
      type: 'number',
      prompt:
        'Từ độ cao $10$ m so với mặt đất, ném một vật với tốc độ $10$ m/s theo hướng bất kì. Bỏ qua lực cản, lấy $g = 10$ m/s². Tính tốc độ khi chạm đất (làm tròn đến hai chữ số thập phân).',
      answer: 17.32,
      tolerance: 0.02,
      unit: 'm/s',
      hints: ['Hướng ném không ảnh hưởng đến cơ năng ban đầu.', 'Chọn mốc thế năng ở mặt đất.'],
      solution:
        '$\\dfrac{1}{2}mv_0^2 + mgh = \\dfrac{1}{2}mv^2$ nên $v = \\sqrt{v_0^2 + 2gh} = \\sqrt{100 + 200} \\approx 17{,}32$ m/s.',
    },
  ],
  takeaways: [
    'Cơ năng: $W = W_đ + W_t = \\dfrac{1}{2}mv^2 + mgh$.',
    'Vật chỉ chịu trọng lực thì cơ năng không đổi; động năng tăng bao nhiêu thì thế năng giảm bấy nhiêu.',
    'Có lực cản thì cơ năng giảm, phần mất đi chuyển thành nhiệt.',
  ],
};
