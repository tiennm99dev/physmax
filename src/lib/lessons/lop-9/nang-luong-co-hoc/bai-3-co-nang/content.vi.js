/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Cơ năng của vật là tổng động năng và thế năng; khi vật chuyển động, động năng và thế năng chuyển hoá qua lại, và khi bỏ qua ma sát, lực cản thì cơ năng được bảo toàn.',
  intro:
    'Trên đường ray của tàu lượn siêu tốc, đoàn tàu được kéo lên đỉnh dốc đầu tiên rồi thả cho chạy: không cần động cơ, nó vẫn lao xuống, vọt lên những đỉnh thấp hơn rồi lại lao xuống. Điều gì giúp đoàn tàu lên được các đỉnh dốc, và vì sao các đỉnh sau phải thấp hơn đỉnh đầu tiên?',
  objectives: [
    'Nêu được cơ năng là tổng động năng và thế năng của vật; viết được $W = W_\\text{đ} + W_\\text{t}$.',
    'Mô tả được sự chuyển hoá giữa động năng và thế năng khi vật chuyển động trong một số trường hợp đơn giản.',
    'Nêu được: khi bỏ qua ma sát và lực cản, cơ năng của vật được bảo toàn; khi có ma sát, một phần cơ năng chuyển hoá thành nhiệt năng.',
    'Vận dụng được sự bảo toàn cơ năng để tính độ cao, tốc độ của vật.',
  ],
  sections: [
    {
      heading: 'Cơ năng',
      blocks: [
        {
          type: 'p',
          text: 'Một chiếc máy bay đang bay trên cao vừa có động năng (vì nó chuyển động) vừa có thế năng (vì nó ở độ cao so với mặt đất). Năng lượng tổng cộng do chuyển động và do vị trí của vật gọi là cơ năng.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Cơ năng',
          text: 'Cơ năng của vật là tổng động năng và thế năng của nó. Đơn vị của cơ năng là jun (J).',
        },
        {
          type: 'tex',
          tex: 'W = W_\\text{đ} + W_\\text{t} = \\frac{1}{2} m v^2 + P h',
        },
        {
          type: 'p',
          text: 'Vật đứng yên ở trên cao chỉ có thế năng, nên cơ năng bằng thế năng. Vật chuyển động trên mặt đất (chọn làm mốc) chỉ có động năng, nên cơ năng bằng động năng.',
        },
      ],
    },
    {
      heading: 'Sự chuyển hoá giữa động năng và thế năng',
      blocks: [
        {
          type: 'p',
          text: 'Kéo quả nặng của một con lắc lên vị trí $A$ rồi thả ra. Quả nặng đi xuống vị trí thấp nhất $O$, rồi đi lên phía bên kia tới vị trí $B$ và tiếp tục dao động qua lại.',
        },
        {
          type: 'table',
          caption: 'Năng lượng của quả nặng con lắc (mốc thế năng ở vị trí thấp nhất $O$)',
          head: ['Vị trí, chuyển động', 'Động năng', 'Thế năng'],
          rows: [
            ['Ở $A$ (cao nhất, dừng lại)', 'bằng $0$', 'lớn nhất'],
            ['Từ $A$ xuống $O$', 'tăng', 'giảm'],
            ['Ở $O$ (thấp nhất, nhanh nhất)', 'lớn nhất', 'bằng $0$'],
            ['Từ $O$ lên $B$', 'giảm', 'tăng'],
            ['Ở $B$ (cao nhất, dừng lại)', 'bằng $0$', 'lớn nhất'],
          ],
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Chuyển hoá năng lượng',
          text: 'Khi vật đi xuống, thế năng của vật chuyển hoá thành động năng. Khi vật đi lên, động năng của vật chuyển hoá thành thế năng.',
        },
        {
          type: 'p',
          text: 'Quả bóng tung thẳng lên cũng vậy: lúc rời tay, bóng có động năng lớn; càng lên cao, bóng càng chậm vì động năng chuyển dần thành thế năng; ở điểm cao nhất bóng dừng lại trong chốc lát, động năng bằng $0$; khi rơi xuống, thế năng lại chuyển thành động năng.',
        },
      ],
    },
    {
      heading: 'Bảo toàn cơ năng',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Định luật bảo toàn cơ năng',
          text: 'Khi cơ năng của vật không chuyển hoá thành dạng năng lượng khác (bỏ qua ma sát và lực cản của môi trường), cơ năng của vật được bảo toàn: tổng động năng và thế năng của vật không đổi.',
        },
        {
          type: 'tex',
          tex: 'W_\\text{đ1} + W_\\text{t1} = W_\\text{đ2} + W_\\text{t2}',
        },
        {
          type: 'p',
          text: 'Ví dụ, một vật được thả rơi từ độ cao $h$: cơ năng lúc thả bằng thế năng $Ph$. Ngay trước khi chạm đất, thế năng bằng $0$ nên toàn bộ thế năng ban đầu đã thành động năng: $\\frac{1}{2}mv^2 = Ph$.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Khi có ma sát, lực cản',
          text: 'Trong thực tế luôn có ma sát và lực cản. Một phần cơ năng chuyển hoá thành nhiệt năng (làm nóng vật và môi trường), nên cơ năng giảm dần: con lắc dao động thấp dần rồi dừng, quả bóng nảy thấp dần. Cơ năng không được bảo toàn, nhưng năng lượng thì vẫn được bảo toàn: phần cơ năng mất đi đúng bằng nhiệt năng sinh ra.',
        },
        {
          type: 'p',
          text: 'Ở phần Khám phá, em tự vẽ đường trượt cho một người trượt ván. Khi bỏ qua ma sát, người trượt không bao giờ lên cao hơn độ cao xuất phát; đó là lí do các đỉnh sau của tàu lượn phải thấp hơn đỉnh đầu tiên. Bật ma sát để xem cơ năng giảm dần và nhiệt năng tăng lên.',
        },
      ],
    },
  ],
  explore: {
    title: 'Đường trượt ván tự vẽ',
    instruction:
      'Kéo các chấm tím để tạo đường trượt, rồi nhấn "Thả". Theo dõi các thanh năng lượng khi người trượt đi xuống, đi lên. Khi bỏ qua ma sát, thanh cơ năng có thay đổi không? Thử kéo một điểm lên cao hơn đường nét đứt (độ cao xuất phát): người trượt có vượt qua được không? Sau đó chọn "Có ma sát" và quan sát cơ năng, nhiệt năng.',
  },
  examples: [
    {
      problem:
        'Một vật khối lượng $2$ kg được thả rơi không vận tốc đầu từ độ cao $5$ m so với mặt đất. Bỏ qua sức cản của không khí, chọn mốc thế năng tại mặt đất. Tính cơ năng của vật, động năng và tốc độ của vật khi nó ở độ cao $1{,}8$ m.',
      steps: [
        'Lúc thả, vật đứng yên nên $W_\\text{đ} = 0$; $P = 10 \\cdot 2 = 20$ N, $W_\\text{t} = Ph = 20 \\cdot 5 = 100$ J. Cơ năng $W = 0 + 100 = 100$ J.',
        'Ở độ cao $1{,}8$ m: $W_\\text{t} = 20 \\cdot 1{,}8 = 36$ J.',
        'Cơ năng được bảo toàn nên $W_\\text{đ} = W - W_\\text{t} = 100 - 36 = 64$ J.',
        'Từ $\\dfrac{1}{2} \\cdot 2 \\cdot v^2 = 64$ suy ra $v^2 = 64$, $v = 8$ m/s.',
      ],
      answer: 'Cơ năng $100$ J; ở độ cao $1{,}8$ m động năng là $64$ J và tốc độ là $8$ m/s.',
    },
    {
      problem:
        'Một quả bóng khối lượng $0{,}5$ kg được ném thẳng đứng lên từ mặt đất với tốc độ $6$ m/s. Bỏ qua sức cản của không khí, chọn mốc thế năng tại mặt đất. Bóng lên được độ cao lớn nhất là bao nhiêu?',
      steps: [
        'Lúc ném: $W_\\text{t} = 0$, $W_\\text{đ} = \\dfrac{1}{2} \\cdot 0{,}5 \\cdot 6^2 = 9$ J, nên cơ năng $W = 9$ J.',
        'Ở độ cao lớn nhất, bóng dừng lại: $W_\\text{đ} = 0$, nên $W_\\text{t} = W = 9$ J.',
        '$P = 10 \\cdot 0{,}5 = 5$ N, nên $h = \\dfrac{W_\\text{t}}{P} = \\dfrac{9}{5} = 1{,}8$ m.',
      ],
      answer: 'Bóng lên được độ cao lớn nhất $1{,}8$ m.',
    },
    {
      problem:
        'Một người cùng ván trượt có tổng khối lượng $50$ kg trượt không vận tốc đầu từ đỉnh dốc cao $4$ m. Đến chân dốc, tốc độ của người là $8$ m/s. Cơ năng có được bảo toàn không? Bao nhiêu cơ năng đã chuyển hoá thành nhiệt năng? (Chọn mốc thế năng ở chân dốc.)',
      steps: [
        'Cơ năng ở đỉnh dốc: $W_1 = W_\\text{t} = 10 \\cdot 50 \\cdot 4 = 2\\,000$ J.',
        'Cơ năng ở chân dốc: $W_2 = W_\\text{đ} = \\dfrac{1}{2} \\cdot 50 \\cdot 8^2 = 1\\,600$ J.',
        '$W_2 < W_1$ nên cơ năng không được bảo toàn: có ma sát. Phần cơ năng chuyển thành nhiệt năng: $2\\,000 - 1\\,600 = 400$ J.',
      ],
      answer: 'Cơ năng không được bảo toàn; $400$ J cơ năng đã chuyển hoá thành nhiệt năng.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Cơ năng của một vật bằng',
      options: [
        'tổng động năng và thế năng của vật',
        'hiệu thế năng và động năng của vật',
        'tích động năng và thế năng của vật',
        'động năng của vật',
      ],
      answer: 0,
      hints: ['Cơ năng gồm cả năng lượng do chuyển động và năng lượng do độ cao.'],
      solution: 'Cơ năng $W = W_\\text{đ} + W_\\text{t}$: tổng động năng và thế năng của vật.',
    },
    {
      type: 'number',
      prompt:
        'Một con chim khối lượng $0{,}2$ kg bay ở độ cao $10$ m so với mặt đất với tốc độ $5$ m/s. Chọn mốc thế năng tại mặt đất, tính cơ năng của con chim.',
      answer: 22.5,
      tolerance: 0.001,
      unit: 'J',
      hints: ['Tính riêng $W_\\text{t} = Ph$ và $W_\\text{đ} = \\frac{1}{2}mv^2$ rồi cộng lại.'],
      solution:
        '$W_\\text{t} = 10 \\cdot 0{,}2 \\cdot 10 = 20$ J; $W_\\text{đ} = \\dfrac{1}{2} \\cdot 0{,}2 \\cdot 5^2 = 2{,}5$ J; $W = 20 + 2{,}5 = 22{,}5$ J.',
    },
    {
      type: 'choice',
      prompt:
        'Quả nặng của con lắc dao động (bỏ qua lực cản). Tại vị trí thấp nhất của quả nặng thì',
      options: [
        'động năng lớn nhất, thế năng nhỏ nhất',
        'động năng nhỏ nhất, thế năng lớn nhất',
        'động năng và thế năng đều lớn nhất',
        'động năng bằng thế năng',
      ],
      answer: 0,
      hints: ['Ở vị trí thấp nhất, quả nặng chuyển động nhanh nhất.'],
      solution:
        'Ở vị trí thấp nhất, độ cao nhỏ nhất nên thế năng nhỏ nhất, còn tốc độ lớn nhất nên động năng lớn nhất. Cơ năng không đổi.',
    },
    {
      type: 'number',
      prompt:
        'Thả rơi một vật từ độ cao $20$ m so với mặt đất, bỏ qua sức cản của không khí. Tốc độ của vật ngay trước khi chạm đất là bao nhiêu?',
      answer: 20,
      tolerance: 0.001,
      unit: 'm/s',
      hints: [
        'Thế năng lúc đầu chuyển hết thành động năng: $\\frac{1}{2}mv^2 = 10mh$.',
        'Rút gọn $m$: $v^2 = 20h$.',
      ],
      solution:
        '$\\dfrac{1}{2}mv^2 = 10mh \\Rightarrow v^2 = 20h = 20 \\cdot 20 = 400$, nên $v = 20$ m/s.',
    },
    {
      type: 'number',
      prompt:
        'Một vật khối lượng $1$ kg được thả rơi từ độ cao $10$ m (bỏ qua sức cản, mốc thế năng tại mặt đất). Khi vật ở độ cao $4$ m, động năng của nó là bao nhiêu?',
      answer: 60,
      tolerance: 0.001,
      unit: 'J',
      hints: ['Cơ năng lúc thả bằng thế năng ở độ cao $10$ m.', '$W_\\text{đ} = W - W_\\text{t}$.'],
      solution:
        '$W = 10 \\cdot 1 \\cdot 10 = 100$ J. Ở độ cao $4$ m: $W_\\text{t} = 10 \\cdot 1 \\cdot 4 = 40$ J, nên $W_\\text{đ} = 100 - 40 = 60$ J.',
    },
    {
      type: 'choice',
      prompt: 'Một quả bóng rơi xuống sàn, nảy lên thấp dần rồi nằm yên. Phát biểu nào đúng?',
      options: [
        'Năng lượng của quả bóng đã mất đi',
        'Một phần cơ năng đã chuyển hoá thành nhiệt năng, năng lượng vẫn được bảo toàn',
        'Cơ năng của quả bóng được bảo toàn',
        'Thế năng của quả bóng chuyển hết thành động năng',
      ],
      answer: 1,
      hints: [
        'Năng lượng không tự sinh ra cũng không tự mất đi.',
        'Va chạm và lực cản làm bóng, sàn và không khí nóng lên.',
      ],
      solution:
        'Mỗi lần va chạm với sàn và khi bay trong không khí, một phần cơ năng chuyển hoá thành nhiệt năng (và năng lượng âm thanh), nên cơ năng giảm và bóng nảy thấp dần. Năng lượng không mất đi mà chuyển sang dạng khác.',
    },
    {
      type: 'multi',
      prompt:
        'Một quả bóng được ném thẳng đứng lên cao (bỏ qua sức cản). Những phát biểu nào đúng?',
      options: [
        'Khi bóng đi lên, động năng chuyển hoá thành thế năng.',
        'Ở điểm cao nhất, động năng của bóng bằng $0$.',
        'Khi bóng đi xuống, cơ năng của bóng tăng.',
        'Cơ năng của bóng ở mọi vị trí đều bằng nhau.',
      ],
      answers: [0, 1, 3],
      hints: ['Bỏ qua sức cản thì cơ năng được bảo toàn.'],
      solution:
        'Đi lên: động năng giảm, thế năng tăng. Ở điểm cao nhất bóng dừng lại nên $W_\\text{đ} = 0$. Cơ năng không đổi ở mọi vị trí, nên phát biểu "cơ năng tăng khi đi xuống" sai: khi đi xuống chỉ có thế năng chuyển thành động năng.',
    },
    {
      type: 'number',
      prompt:
        'Một quả bóng khối lượng $0{,}4$ kg được ném thẳng đứng lên từ mặt đất với tốc độ $10$ m/s. Bỏ qua sức cản, bóng lên được độ cao lớn nhất bao nhiêu mét?',
      answer: 5,
      tolerance: 0.001,
      unit: 'm',
      hints: [
        'Động năng lúc ném chuyển hết thành thế năng ở điểm cao nhất.',
        '$h = \\dfrac{W_\\text{t}}{P}$.',
      ],
      solution:
        '$W_\\text{đ} = \\dfrac{1}{2} \\cdot 0{,}4 \\cdot 10^2 = 20$ J $= W_\\text{t}$ ở điểm cao nhất. $P = 4$ N, nên $h = \\dfrac{20}{4} = 5$ m.',
    },
    {
      type: 'number',
      prompt:
        'Một em bé khối lượng $40$ kg trượt không vận tốc đầu từ đỉnh cầu trượt cao $5$ m, tới chân cầu trượt với tốc độ $6$ m/s. Có bao nhiêu jun cơ năng đã chuyển hoá thành nhiệt năng? (Mốc thế năng ở chân cầu trượt.)',
      answer: 1280,
      tolerance: 0.001,
      unit: 'J',
      hints: [
        'Cơ năng ở đỉnh là thế năng, ở chân là động năng.',
        'Nhiệt năng bằng phần cơ năng bị giảm.',
      ],
      solution:
        'Ở đỉnh: $W_1 = 10 \\cdot 40 \\cdot 5 = 2\\,000$ J. Ở chân: $W_2 = \\dfrac{1}{2} \\cdot 40 \\cdot 6^2 = 720$ J. Nhiệt năng: $2\\,000 - 720 = 1\\,280$ J.',
    },
  ],
  takeaways: [
    'Cơ năng là tổng động năng và thế năng: $W = W_\\text{đ} + W_\\text{t}$, đơn vị jun (J).',
    'Vật đi xuống: thế năng chuyển hoá thành động năng; vật đi lên: động năng chuyển hoá thành thế năng.',
    'Bỏ qua ma sát và lực cản, cơ năng được bảo toàn: $W_\\text{đ} + W_\\text{t}$ không đổi.',
    'Có ma sát, lực cản: một phần cơ năng chuyển hoá thành nhiệt năng, cơ năng giảm nhưng năng lượng vẫn bảo toàn.',
  ],
};
