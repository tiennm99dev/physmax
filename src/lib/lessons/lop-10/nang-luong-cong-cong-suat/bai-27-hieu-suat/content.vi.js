/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Mọi thiết bị đều có năng lượng hao phí; hiệu suất H là tỉ số giữa năng lượng có ích và năng lượng toàn phần, luôn nhỏ hơn 100%; động cơ nhiệt có H = A/Q.',
  intro:
    'Đổ đầy bình xăng, nhưng chỉ khoảng một phần ba năng lượng của xăng thực sự làm bánh xe quay. Phần còn lại đi đâu, và làm sao đo được một thiết bị tận dụng năng lượng tốt đến mức nào?',
  objectives: [
    'Phân biệt được năng lượng có ích và năng lượng hao phí trong các quá trình chuyển hoá năng lượng.',
    'Định nghĩa được hiệu suất, viết được công thức theo năng lượng và theo công suất.',
    'Viết được công thức hiệu suất của động cơ nhiệt $H = \\dfrac{A}{Q}$.',
    'Tính được hiệu suất và các đại lượng liên quan trong bài toán thực tế.',
  ],
  sections: [
    {
      heading: 'Năng lượng có ích và năng lượng hao phí',
      blocks: [
        {
          type: 'p',
          text: 'Khi thiết bị hoạt động, năng lượng cung cấp cho nó chuyển hoá thành nhiều dạng. Phần phục vụ đúng mục đích gọi là năng lượng có ích, phần còn lại, thường toả ra dưới dạng nhiệt, là năng lượng hao phí.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Luôn có hao phí',
          text: 'Trong mọi quá trình chuyển hoá năng lượng luôn tồn tại năng lượng hao phí. Năng lượng không mất đi: $W_{tp} = W_{ci} + W_{hp}$, chỉ là phần hao phí không dùng được cho mục đích của ta.',
        },
        {
          type: 'table',
          head: ['Thiết bị', 'Năng lượng vào', 'Có ích', 'Hao phí'],
          rows: [
            ['Động cơ xe', 'hoá năng của xăng', 'cơ năng', 'nhiệt của khí thải, động cơ'],
            ['Quạt điện', 'điện năng', 'động năng của cánh và gió', 'nhiệt ở động cơ, ma sát'],
            ['Đèn sợi đốt', 'điện năng', 'quang năng', 'nhiệt làm nóng bóng đèn'],
            ['Pin Mặt Trời', 'quang năng', 'điện năng', 'nhiệt ở tấm pin, phản xạ'],
          ],
        },
      ],
    },
    {
      heading: 'Hiệu suất',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Hiệu suất',
          text: 'Hiệu suất là tỉ số giữa năng lượng có ích và năng lượng toàn phần, thường tính theo phần trăm: $H = \\dfrac{W_{ci}}{W_{tp}} \\cdot 100\\%$.',
        },
        {
          type: 'p',
          text: 'Chia cả tử và mẫu cho thời gian hoạt động, ta được công thức theo công suất:',
        },
        { type: 'tex', tex: 'H = \\dfrac{P_{ci}}{P_{tp}} \\cdot 100\\%' },
        {
          type: 'p',
          text: 'Vì luôn có hao phí nên $H$ luôn nhỏ hơn $100\\%$. Hiệu suất càng cao thì thiết bị càng tiết kiệm năng lượng.',
        },
      ],
    },
    {
      heading: 'Hiệu suất của động cơ nhiệt',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Động cơ nhiệt',
          text: 'Động cơ nhiệt chuyển nhiệt lượng của nhiên liệu bị đốt cháy thành công cơ học: $H = \\dfrac{A}{Q} \\cdot 100\\%$, trong đó $A$ là công cơ học động cơ thực hiện và $Q$ là nhiệt lượng động cơ nhận được từ nhiên liệu.',
        },
        {
          type: 'table',
          head: ['Thiết bị', 'Hiệu suất (cỡ)'],
          rows: [
            ['Động cơ nhiệt thông thường', '$30\\% - 40\\%$'],
            ['Động cơ điện', '$90\\%$'],
            ['Pin Mặt Trời', '$10\\%$'],
          ],
          caption: 'Giá trị gần đúng, thay đổi theo từng loại thiết bị.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Nâng cao hiệu suất',
          text: 'Xe điện tiết kiệm năng lượng hơn xe xăng một phần vì động cơ điện có hiệu suất cao hơn nhiều. Đèn LED thay đèn sợi đốt, bảo dưỡng máy móc, giảm ma sát đều là cách nâng cao hiệu suất.',
        },
      ],
    },
  ],
  explore: {
    title: 'Dòng năng lượng qua thiết bị',
    instruction:
      'Chọn thiết bị, rồi kéo nút tròn lên xuống để đổi tỉ lệ hao phí. Dải xanh là phần có ích, dải đỏ là phần hao phí; độ rộng dải tỉ lệ với năng lượng. Hiệu suất thay đổi ra sao?',
  },
  examples: [
    {
      problem:
        'Một động cơ nhiệt nhận nhiệt lượng $200$ kJ từ nhiên liệu và thực hiện công $60$ kJ. Tính hiệu suất và phần năng lượng hao phí.',
      steps: [
        '$H = \\dfrac{A}{Q} \\cdot 100\\% = \\dfrac{60}{200} \\cdot 100\\% = 30\\%$.',
        'Phần hao phí: $Q - A = 200 - 60 = 140$ kJ.',
      ],
      answer: '$H = 30\\%$; hao phí $140$ kJ.',
    },
    {
      problem:
        'Cần cẩu có động cơ công suất $5$ kW nâng đều vật $400$ kg lên cao $10$ m trong $10$ s. Lấy $g = 9{,}8$ m/s². Tính hiệu suất của cần cẩu.',
      steps: [
        'Công có ích: $A = mgh = 400 \\cdot 9{,}8 \\cdot 10 = 39\\,200$ J.',
        '$P_{ci} = \\dfrac{39\\,200}{10} = 3\\,920$ W.',
        '$H = \\dfrac{3\\,920}{5\\,000} \\cdot 100\\% = 78{,}4\\%$.',
      ],
      answer: '$H = 78{,}4\\%$.',
    },
    {
      problem:
        'Bếp điện công suất $1\\,000$ W, hiệu suất $80\\%$, đun nước cần nhận nhiệt lượng $336$ kJ. Tính thời gian đun.',
      steps: [
        'Từ $H = \\dfrac{W_{ci}}{W_{tp}}$: $W_{tp} = \\dfrac{336}{0{,}8} = 420$ kJ $= 420\\,000$ J.',
        '$t = \\dfrac{W_{tp}}{P} = \\dfrac{420\\,000}{1\\,000} = 420$ s.',
      ],
      answer: '$t = 420$ s $= 7$ phút.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt: 'Thiết bị nhận $100$ J và cho $75$ J năng lượng có ích. Tính hiệu suất.',
      answer: 75,
      unit: '%',
      hints: ['$H = \\dfrac{W_{ci}}{W_{tp}} \\cdot 100\\%$.'],
      solution: '$H = \\dfrac{75}{100} \\cdot 100\\% = 75\\%$.',
    },
    {
      type: 'number',
      prompt:
        'Động cơ nhiệt nhận nhiệt lượng $500$ kJ từ nhiên liệu, thực hiện công $150$ kJ. Tính hiệu suất.',
      answer: 30,
      unit: '%',
      hints: ['Dùng $H = \\dfrac{A}{Q} \\cdot 100\\%$.'],
      solution: '$H = \\dfrac{150}{500} \\cdot 100\\% = 30\\%$.',
    },
    {
      type: 'number',
      prompt:
        'Một thiết bị có hiệu suất $25\\%$, nhận năng lượng $1\\,000$ J. Tính phần năng lượng hao phí.',
      answer: 750,
      unit: 'J',
      hints: ['Tìm phần có ích trước.', '$W_{hp} = W_{tp} - W_{ci}$.'],
      solution: '$W_{ci} = 0{,}25 \\cdot 1\\,000 = 250$ J; $W_{hp} = 1\\,000 - 250 = 750$ J.',
    },
    {
      type: 'number',
      prompt:
        'Máy bơm tiêu thụ công suất $2$ kW, hiệu suất $80\\%$. Tính công suất có ích theo oát.',
      answer: 1600,
      unit: 'W',
      hints: ['$P_{ci} = H \\cdot P_{tp}$.'],
      solution: '$P_{ci} = 0{,}8 \\cdot 2\\,000 = 1\\,600$ W.',
    },
    {
      type: 'number',
      prompt:
        'Cần cẩu công suất $10$ kW nâng đều vật $1\\,000$ kg lên cao $6$ m trong $10$ s. Lấy $g = 9{,}8$ m/s². Tính hiệu suất, theo %.',
      answer: 58.8,
      tolerance: 0.1,
      unit: '%',
      hints: ['Công suất có ích bằng $\\dfrac{mgh}{t}$.'],
      solution:
        '$P_{ci} = \\dfrac{1\\,000 \\cdot 9{,}8 \\cdot 6}{10} = 5\\,880$ W; $H = \\dfrac{5\\,880}{10\\,000} \\cdot 100\\% = 58{,}8\\%$.',
    },
    {
      type: 'choice',
      prompt: 'Vì sao hiệu suất của một thiết bị thực tế luôn nhỏ hơn $100\\%$?',
      options: [
        'Vì luôn có một phần năng lượng chuyển thành dạng không dùng được, như nhiệt',
        'Vì năng lượng bị mất đi hoàn toàn trong thiết bị',
        'Vì công suất có ích luôn lớn hơn công suất toàn phần',
        'Vì đơn vị của hiệu suất là phần trăm',
      ],
      answer: 0,
      hints: ['Năng lượng không tự mất đi; nó chuyển đi đâu?'],
      solution:
        'Năng lượng được bảo toàn nhưng một phần luôn chuyển thành nhiệt do ma sát, toả ra môi trường, nên phần có ích nhỏ hơn phần toàn phần.',
    },
    {
      type: 'number',
      prompt:
        'Tấm pin Mặt Trời hiệu suất $10\\%$ nhận công suất ánh sáng $1\\,000$ W. Tính công suất điện nó tạo ra.',
      answer: 100,
      unit: 'W',
      hints: ['Công suất điện là phần có ích.'],
      solution: '$P_{ci} = 0{,}1 \\cdot 1\\,000 = 100$ W.',
    },
    {
      type: 'match',
      prompt: 'Ghép mỗi thiết bị với dạng năng lượng có ích của nó.',
      left: ['Quạt điện', 'Đèn chiếu sáng', 'Bếp từ', 'Pin Mặt Trời'],
      right: [
        'Động năng của cánh quạt',
        'Quang năng',
        'Nhiệt năng của nồi',
        'Điện năng',
        'Hoá năng',
      ],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['Hỏi: thiết bị này được mua để làm gì?'],
      solution:
        'Quạt để tạo gió: động năng của cánh quạt. Đèn để chiếu sáng: quang năng. Bếp từ để đun nấu: nhiệt năng của nồi. Pin Mặt Trời để tạo điện: điện năng.',
    },
    {
      type: 'number',
      prompt:
        'Động cơ xe cho công suất có ích $30$ kW với hiệu suất $30\\%$. Tính công suất toàn phần do nhiên liệu cung cấp, theo kW.',
      answer: 100,
      unit: 'kW',
      hints: ['$P_{tp} = \\dfrac{P_{ci}}{H}$.'],
      solution: '$P_{tp} = \\dfrac{30}{0{,}3} = 100$ kW.',
    },
    {
      type: 'number',
      prompt:
        'Một máy có hiệu suất $40\\%$ và toả ra phần năng lượng hao phí $300$ J. Tính năng lượng toàn phần máy nhận vào.',
      answer: 500,
      unit: 'J',
      hints: ['Phần hao phí chiếm $60\\%$ năng lượng toàn phần.'],
      solution: '$W_{hp} = 0{,}6 \\cdot W_{tp}$, nên $W_{tp} = \\dfrac{300}{0{,}6} = 500$ J.',
    },
  ],
  takeaways: [
    'Năng lượng toàn phần gồm phần có ích và phần hao phí: $W_{tp} = W_{ci} + W_{hp}$.',
    'Hiệu suất: $H = \\dfrac{W_{ci}}{W_{tp}} \\cdot 100\\% = \\dfrac{P_{ci}}{P_{tp}} \\cdot 100\\%$, luôn nhỏ hơn $100\\%$.',
    'Động cơ nhiệt: $H = \\dfrac{A}{Q} \\cdot 100\\%$.',
  ],
};
