/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Khi số đường sức từ xuyên qua tiết diện của cuộn dây dẫn kín biến thiên, trong cuộn dây xuất hiện dòng điện cảm ứng; cho nam châm quay trước cuộn dây (hoặc cuộn dây quay trong từ trường) thì số đường sức từ luân phiên tăng, giảm và ta được dòng điện xoay chiều.',
  intro:
    'Dòng điện chạy qua cuộn dây quấn quanh lõi sắt tạo ra từ trường: đó là nam châm điện. Vậy ngược lại, từ trường có tạo ra được dòng điện không? Nhà máy thuỷ điện, chiếc đinamô gắn trên xe đạp tạo ra dòng điện bằng cách nào?',
  objectives: [
    'Thực hiện (hoặc mô tả) được thí nghiệm làm xuất hiện dòng điện cảm ứng; nêu được thế nào là hiện tượng cảm ứng điện từ.',
    'Nêu được điều kiện xuất hiện dòng điện cảm ứng: số đường sức từ xuyên qua tiết diện của cuộn dây dẫn kín biến thiên.',
    'Nêu được dòng điện xoay chiều là dòng điện luân phiên đổi chiều và nguyên tắc tạo ra dòng điện xoay chiều.',
  ],
  sections: [
    {
      heading: 'Hiện tượng cảm ứng điện từ',
      blocks: [
        {
          type: 'p',
          text: 'Thí nghiệm 1. Nối hai đầu một cuộn dây dẫn với một điện kế (ampe kế có độ nhạy cao, số 0 ở giữa thang đo) để được một mạch kín. Đưa một cực của nam châm thẳng lại gần cuộn dây, rồi kéo ra xa, theo phương vuông góc với tiết diện của cuộn dây.',
        },
        {
          type: 'list',
          items: [
            'Khi đưa nam châm lại gần cuộn dây: kim điện kế lệch, trong mạch có dòng điện.',
            'Khi kéo nam châm ra xa cuộn dây: kim điện kế lệch theo chiều ngược lại.',
            'Khi giữ nam châm đứng yên (ở gần hay ở xa, kể cả nằm trong lòng cuộn dây): kim điện kế chỉ số 0.',
          ],
        },
        {
          type: 'p',
          text: 'Thí nghiệm 2. Thay nam châm thẳng bằng một nam châm điện (cuộn dây có lõi sắt nối với nguồn điện qua công tắc) đặt gần cuộn dây nối với điện kế. Kim điện kế lệch trong khoảnh khắc đóng công tắc và trong khoảnh khắc ngắt công tắc; khi công tắc đóng yên, dòng điện qua nam châm điện không đổi, kim điện kế chỉ số 0.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Dòng điện cảm ứng. Hiện tượng cảm ứng điện từ',
          text: 'Dòng điện xuất hiện trong cuộn dây dẫn kín trong các thí nghiệm trên gọi là dòng điện cảm ứng. Hiện tượng xuất hiện dòng điện cảm ứng gọi là hiện tượng cảm ứng điện từ.',
        },
        {
          type: 'p',
          text: 'Nam châm vĩnh cửu hay nam châm điện đều có thể dùng để tạo ra dòng điện cảm ứng. Thay điện kế bằng một đèn LED, ta thấy đèn loé sáng khi nam châm chuyển động nhanh lại gần hoặc ra xa cuộn dây.',
        },
      ],
    },
    {
      heading: 'Điều kiện xuất hiện dòng điện cảm ứng',
      blocks: [
        {
          type: 'p',
          text: 'Gọi $S$ là tiết diện của cuộn dây. Khi cực của nam châm tiến lại gần cuộn dây, số đường sức từ xuyên qua tiết diện $S$ tăng; khi nam châm ra xa, số đường sức từ đó giảm. Trong thí nghiệm 2, khi đóng công tắc, từ trường của nam châm điện mạnh lên nên số đường sức từ qua cuộn dây tăng; khi ngắt công tắc, số đường sức từ giảm.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Điều kiện xuất hiện dòng điện cảm ứng',
          text: 'Trong cuộn dây dẫn kín xuất hiện dòng điện cảm ứng khi và chỉ khi số đường sức từ xuyên qua tiết diện $S$ của cuộn dây biến thiên (tăng hoặc giảm).',
        },
        {
          type: 'table',
          caption: 'Số đường sức từ qua cuộn dây và dòng điện cảm ứng trong thí nghiệm 1',
          head: ['Việc làm', 'Số đường sức từ qua $S$', 'Dòng điện cảm ứng'],
          rows: [
            ['Đưa nam châm lại gần', 'Tăng', 'Có'],
            ['Giữ nam châm đứng yên', 'Không đổi', 'Không'],
            ['Kéo nam châm ra xa', 'Giảm', 'Có, ngược chiều lúc đưa lại gần'],
          ],
        },
        {
          type: 'list',
          items: [
            'Số đường sức từ biến thiên càng nhanh (nam châm chuyển động càng nhanh) thì dòng điện cảm ứng càng mạnh, kim điện kế lệch càng nhiều.',
            'Với cùng một cực nam châm, khi số đường sức từ tăng, dòng điện cảm ứng có một chiều; khi số đường sức từ giảm, dòng điện cảm ứng đổi sang chiều ngược lại.',
            'Đổi cực của nam châm (đưa cực Nam thay cho cực Bắc lại gần) thì chiều dòng điện cảm ứng cũng đổi.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Có chuyển động chưa chắc có dòng điện cảm ứng',
          text: 'Điều quyết định là số đường sức từ qua cuộn dây có thay đổi hay không. Nam châm và cuộn dây cùng chuyển động mà không đổi vị trí với nhau, hay nam châm thẳng quay quanh trục của chính nó khi trục này trùng với trục cuộn dây, thì số đường sức từ qua cuộn dây không đổi, không có dòng điện cảm ứng.',
        },
      ],
    },
    {
      heading: 'Nguyên tắc tạo ra dòng điện xoay chiều',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Dòng điện xoay chiều',
          text: 'Dòng điện luân phiên đổi chiều gọi là dòng điện xoay chiều. Dòng điện do pin, acquy tạo ra chỉ chạy theo một chiều, gọi là dòng điện một chiều.',
        },
        {
          type: 'p',
          text: 'Mắc hai đèn LED song song và ngược chiều nhau vào hai đầu cuộn dây (mỗi đèn chỉ sáng khi dòng điện chạy qua nó theo một chiều). Cho nam châm quay trước cuộn dây: hai đèn thay nhau sáng. Khi nam châm quay, số đường sức từ xuyên qua tiết diện cuộn dây luân phiên tăng, giảm, nên dòng điện cảm ứng luân phiên đổi chiều.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Nguyên tắc tạo ra dòng điện xoay chiều',
          text: 'Khi cho nam châm quay trước cuộn dây dẫn kín, hoặc cho cuộn dây dẫn kín quay trong từ trường, số đường sức từ xuyên qua tiết diện $S$ của cuộn dây luân phiên tăng, giảm. Trong cuộn dây xuất hiện dòng điện cảm ứng xoay chiều.',
        },
        {
          type: 'list',
          items: [
            'Mỗi vòng quay, số đường sức từ qua cuộn dây hai lần tăng, hai lần giảm; dòng điện cảm ứng đổi chiều hai lần.',
            'Nam châm quay càng nhanh thì dòng điện đổi chiều càng nhiều lần trong một giây và càng mạnh.',
            'Máy phát điện xoay chiều có hai bộ phận chính là nam châm và cuộn dây: một bộ phận đứng yên, bộ phận kia quay. Đinamô xe đạp là một máy phát điện xoay chiều nhỏ có nam châm quay, cuộn dây đứng yên.',
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Dòng điện trong gia đình',
          text: 'Mạng điện gia đình ở Việt Nam dùng dòng điện xoay chiều có hiệu điện thế $220$ V, do các máy phát điện xoay chiều ở nhà máy điện tạo ra. Dòng điện này đổi chiều $100$ lần trong mỗi giây.',
        },
      ],
    },
  ],
  explore: {
    title: 'Nam châm, cuộn dây và điện kế',
    instruction:
      'Kéo nam châm lại gần rồi ra xa cuộn dây, theo dõi số đường sức từ xuyên qua cuộn dây, kim điện kế và đồ thị dòng điện. Thử di chuyển nhanh, chậm, đứng yên và đảo cực nam châm. Sau đó chọn "Quay nam châm" để thấy hai đèn LED thay nhau sáng và đồ thị dòng điện xoay chiều hiện ra.',
  },
  examples: [
    {
      problem:
        'Trong thí nghiệm 1, khi đưa cực Bắc của nam châm lại gần cuộn dây thì kim điện kế lệch sang trái. Hỏi kim lệch thế nào khi: a) giữ nam châm đứng yên sát cuộn dây; b) kéo cực Bắc ra xa; c) đưa cực Nam lại gần?',
      steps: [
        'a) Nam châm đứng yên: số đường sức từ qua cuộn dây không đổi, không có dòng điện cảm ứng, kim chỉ số 0.',
        'b) Kéo ra xa: số đường sức từ qua cuộn dây giảm thay vì tăng, dòng điện cảm ứng đổi chiều, kim lệch sang phải.',
        'c) Đổi cực Bắc thành cực Nam thì chiều dòng điện cảm ứng đổi so với khi đưa cực Bắc lại gần, kim lệch sang phải.',
      ],
      answer: 'a) Chỉ số 0; b) lệch sang phải; c) lệch sang phải.',
    },
    {
      problem:
        'Đặt một cuộn dây dẫn kín nối với điện kế gần một nam châm điện. Mô tả kim điện kế khi đóng công tắc của nam châm điện, khi công tắc đang đóng và khi ngắt công tắc. Giải thích.',
      steps: [
        'Lúc đóng công tắc, dòng điện qua nam châm điện tăng từ $0$, từ trường của nó mạnh lên: số đường sức từ qua cuộn dây tăng, kim điện kế lệch.',
        'Khi công tắc đóng yên, dòng điện qua nam châm điện không đổi, số đường sức từ qua cuộn dây không đổi: kim chỉ số 0.',
        'Lúc ngắt công tắc, từ trường mất đi, số đường sức từ qua cuộn dây giảm: kim lệch theo chiều ngược lại.',
      ],
      answer:
        'Kim chỉ lệch trong khoảnh khắc đóng và ngắt công tắc (hai lần lệch ngược chiều nhau); khi công tắc đóng yên kim chỉ số 0.',
    },
    {
      problem:
        'Một nam châm quay đều trước một cuộn dây dẫn kín, mỗi giây quay $5$ vòng. Trong $1$ giây, dòng điện cảm ứng đổi chiều bao nhiêu lần? Vì sao đó là dòng điện xoay chiều?',
      steps: [
        'Trong một vòng quay, số đường sức từ qua cuộn dây hai lần tăng, hai lần giảm, nên dòng điện cảm ứng đổi chiều $2$ lần.',
        'Trong $1$ giây nam châm quay $5$ vòng: số lần đổi chiều là $5 \\cdot 2 = 10$ lần.',
        'Dòng điện luân phiên đổi chiều nên là dòng điện xoay chiều.',
      ],
      answer:
        'Đổi chiều $10$ lần trong $1$ giây; đó là dòng điện xoay chiều vì nó luân phiên đổi chiều.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Điều kiện để xuất hiện dòng điện cảm ứng trong một cuộn dây dẫn kín là gì?',
      options: [
        'Số đường sức từ xuyên qua tiết diện của cuộn dây biến thiên.',
        'Số đường sức từ xuyên qua tiết diện của cuộn dây rất lớn.',
        'Đặt cuộn dây trong từ trường của một nam châm mạnh.',
        'Nối cuộn dây với hai cực của một viên pin.',
      ],
      answer: 0,
      hints: [
        'Trong thí nghiệm, nam châm đứng yên sát cuộn dây (rất nhiều đường sức từ) thì kim điện kế chỉ số mấy?',
      ],
      solution:
        'Dòng điện cảm ứng chỉ xuất hiện khi số đường sức từ xuyên qua tiết diện của cuộn dây tăng hoặc giảm. Từ trường mạnh mà không đổi thì không có dòng điện cảm ứng; nối với pin là dòng điện do nguồn, không phải dòng điện cảm ứng.',
    },
    {
      type: 'multi',
      prompt: 'Trường hợp nào dưới đây xuất hiện dòng điện cảm ứng trong cuộn dây dẫn kín?',
      options: [
        'Đưa một cực của nam châm lại gần cuộn dây.',
        'Để nam châm đứng yên trong lòng cuộn dây.',
        'Cho nam châm quay trước cuộn dây.',
        'Đóng hoặc ngắt công tắc của một nam châm điện đặt gần cuộn dây.',
        'Đặt cuộn dây cạnh một nam châm điện có dòng điện không đổi chạy qua.',
      ],
      answers: [0, 2, 3],
      hints: ['Với từng trường hợp, hỏi: số đường sức từ qua cuộn dây có thay đổi không?'],
      solution:
        'Đưa nam châm lại gần, quay nam châm, đóng hoặc ngắt nam châm điện đều làm số đường sức từ qua cuộn dây biến thiên. Nam châm đứng yên, hay nam châm điện có dòng điện không đổi, cho số đường sức từ không đổi: không có dòng điện cảm ứng.',
    },
    {
      type: 'match',
      prompt:
        'Trong thí nghiệm với nam châm thẳng và cuộn dây, nối mỗi việc làm với điều xảy ra với số đường sức từ qua tiết diện cuộn dây.',
      left: [
        'Đưa nam châm lại gần cuộn dây',
        'Kéo nam châm ra xa cuộn dây',
        'Giữ nam châm đứng yên',
      ],
      right: ['Số đường sức từ tăng', 'Số đường sức từ giảm', 'Số đường sức từ không đổi'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
      hints: ['Càng gần cực nam châm, từ trường càng mạnh, đường sức từ càng dày.'],
      solution:
        'Lại gần: từ trường qua cuộn dây mạnh lên, số đường sức từ tăng. Ra xa: số đường sức từ giảm. Đứng yên: không đổi, nên chỉ trường hợp này không có dòng điện cảm ứng.',
    },
    {
      type: 'choice',
      prompt:
        'Đưa cực Bắc của nam châm lại gần một cuộn dây kín thì kim điện kế lệch sang phải. Kéo cực Bắc đó ra xa cuộn dây thì kim điện kế thế nào?',
      options: ['Lệch sang trái', 'Lệch sang phải', 'Chỉ số 0', 'Lệch sang phải nhiều hơn'],
      answer: 0,
      hints: ['Số đường sức từ lúc này tăng hay giảm, ngược với lúc đưa lại gần không?'],
      solution:
        'Khi kéo ra xa, số đường sức từ qua cuộn dây giảm (ngược với lúc đưa lại gần là tăng), nên dòng điện cảm ứng đổi chiều: kim lệch sang trái.',
    },
    {
      type: 'choice',
      prompt:
        'Vẫn thí nghiệm trên (đưa cực Bắc lại gần thì kim lệch sang phải). Quay ngược nam châm rồi đưa cực Nam lại gần cuộn dây thì kim điện kế thế nào?',
      options: ['Lệch sang phải', 'Lệch sang trái', 'Chỉ số 0'],
      answer: 1,
      hints: ['Đổi cực của nam châm thì chiều dòng điện cảm ứng có đổi không?'],
      solution:
        'Số đường sức từ vẫn tăng nhưng các đường sức từ đi theo chiều ngược lại (đi vào cực Nam), nên dòng điện cảm ứng đổi chiều so với khi đưa cực Bắc lại gần: kim lệch sang trái.',
    },
    {
      type: 'text',
      prompt: 'Điền từ còn thiếu: Dòng điện luân phiên đổi chiều gọi là dòng điện …',
      accept: ['xoay chiều', 'dòng điện xoay chiều', 'xoay chieu'],
      hints: ['Dòng điện trong mạng điện gia đình là loại dòng điện này.'],
      solution: 'Dòng điện luân phiên đổi chiều gọi là dòng điện xoay chiều.',
    },
    {
      type: 'number',
      prompt:
        'Một nam châm quay đều trước cuộn dây dẫn kín. Biết mỗi vòng quay dòng điện cảm ứng đổi chiều $2$ lần. Khi nam châm quay được $25$ vòng, dòng điện đã đổi chiều bao nhiêu lần?',
      answer: 50,
      tolerance: 0.001,
      unit: 'lần',
      hints: ['Mỗi vòng quay: $2$ lần đổi chiều.'],
      solution: 'Số lần đổi chiều: $25 \\cdot 2 = 50$ lần.',
    },
    {
      type: 'number',
      prompt:
        'Dòng điện xoay chiều trong mạng điện gia đình đổi chiều $100$ lần trong mỗi giây. Trong $1$ phút, dòng điện này đổi chiều bao nhiêu lần?',
      answer: 6000,
      tolerance: 0.001,
      unit: 'lần',
      hints: ['$1$ phút $= 60$ giây.'],
      solution: 'Trong $1$ phút: $100 \\cdot 60 = 6\\,000$ lần.',
    },
    {
      type: 'choice',
      prompt:
        'Mắc hai đèn LED song song, ngược chiều nhau vào hai đầu cuộn dây rồi cho nam châm quay đều trước cuộn dây. Hiện tượng nào xảy ra?',
      options: [
        'Hai đèn LED thay nhau sáng.',
        'Chỉ một đèn LED sáng liên tục.',
        'Hai đèn LED cùng sáng liên tục.',
        'Không đèn nào sáng vì không có pin.',
      ],
      answer: 0,
      hints: [
        'Mỗi đèn LED chỉ sáng khi dòng điện chạy qua nó theo một chiều.',
        'Khi nam châm quay, dòng điện cảm ứng có giữ nguyên chiều không?',
      ],
      solution:
        'Nam châm quay làm số đường sức từ qua cuộn dây luân phiên tăng, giảm nên dòng điện cảm ứng luân phiên đổi chiều. Mỗi chiều làm một đèn sáng, nên hai đèn thay nhau sáng.',
    },
    {
      type: 'choice',
      prompt: 'Đinamô xe đạp hoạt động dựa trên hiện tượng nào và tạo ra dòng điện gì?',
      options: [
        'Hiện tượng cảm ứng điện từ; dòng điện xoay chiều.',
        'Hiện tượng cảm ứng điện từ; dòng điện một chiều không đổi.',
        'Tác dụng nhiệt của dòng điện; dòng điện xoay chiều.',
        'Phản ứng hoá học như pin; dòng điện một chiều.',
      ],
      answer: 0,
      hints: ['Trong đinamô, nam châm quay trước cuộn dây đứng yên.'],
      solution:
        'Bánh xe làm nam châm của đinamô quay trước cuộn dây; số đường sức từ qua cuộn dây luân phiên tăng, giảm (cảm ứng điện từ), nên đinamô tạo ra dòng điện xoay chiều.',
    },
  ],
  takeaways: [
    'Hiện tượng cảm ứng điện từ là hiện tượng xuất hiện dòng điện cảm ứng trong cuộn dây dẫn kín.',
    'Dòng điện cảm ứng xuất hiện khi số đường sức từ xuyên qua tiết diện $S$ của cuộn dây dẫn kín biến thiên; với cùng một cực nam châm, số đường sức từ tăng hay giảm cho dòng điện cảm ứng ngược chiều nhau.',
    'Dòng điện xoay chiều là dòng điện luân phiên đổi chiều.',
    'Cho nam châm quay trước cuộn dây (hoặc cuộn dây quay trong từ trường) thì số đường sức từ luân phiên tăng, giảm và trong cuộn dây có dòng điện xoay chiều: đó là nguyên tắc của máy phát điện xoay chiều.',
  ],
};
