/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Phân biệt tốc độ trung bình, tốc độ tức thời với vận tốc trung bình, vận tốc tức thời; hiểu vận tốc là đại lượng vectơ và tổng hợp hai vận tốc cùng phương hoặc vuông góc.',
  intro:
    'Một chiếc thuyền hướng mũi thẳng sang bờ bên kia nhưng lại cập bến ở chỗ xa hơn về phía hạ lưu. Thuyền chạy nhanh hay chậm so với nước? Nó thực sự đi theo hướng nào so với bờ? Để trả lời, ta cần phân biệt tốc độ với vận tốc và biết cách cộng các vận tốc.',
  objectives: [
    'Tính được tốc độ trung bình và nêu được ý nghĩa của tốc độ tức thời.',
    'Nêu được vận tốc là đại lượng vectơ, tính được vận tốc trung bình từ độ dịch chuyển và thời gian.',
    'Phân biệt được tốc độ với vận tốc.',
    'Tổng hợp được hai vận tốc cùng phương hoặc vuông góc với nhau.',
  ],
  sections: [
    {
      heading: 'Tốc độ',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Tốc độ trung bình',
          text: 'Tốc độ trung bình cho biết mức độ nhanh chậm của chuyển động trong cả một khoảng thời gian, được tính bằng quãng đường đi được chia cho thời gian đi hết quãng đường đó: $v = \\dfrac{s}{t}$, hay $v = \\dfrac{\\Delta s}{\\Delta t}$ khi xét từ thời điểm này tới thời điểm khác.',
        },
        {
          type: 'p',
          text: 'Trong hệ SI, đơn vị của tốc độ là m/s. Đơn vị thường dùng khác là km/h, với $1$ m/s $= 3{,}6$ km/h.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Tốc độ tức thời',
          text: 'Tốc độ tức thời là tốc độ của vật tại một thời điểm, cho biết chuyển động nhanh hay chậm đúng lúc đó. Số chỉ trên tốc kế của xe chính là tốc độ tức thời của xe.',
        },
      ],
    },
    {
      heading: 'Vận tốc',
      blocks: [
        {
          type: 'p',
          text: 'Tốc độ không cho biết vật đi về hướng nào. Để mô tả cả mức độ nhanh chậm và hướng chuyển động, ta dùng vận tốc, được tính từ độ dịch chuyển.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Vận tốc trung bình',
          text: 'Vận tốc trung bình là đại lượng vectơ, bằng độ dịch chuyển chia cho thời gian thực hiện độ dịch chuyển đó: $\\vec{v} = \\dfrac{\\vec{d}}{t}$. Vectơ vận tốc trung bình có hướng của độ dịch chuyển.',
        },
        {
          type: 'p',
          text: 'Khi xét trong một khoảng thời gian rất nhỏ, vận tốc trung bình trở thành vận tốc tức thời $\\vec{v} = \\dfrac{\\Delta \\vec{d}}{\\Delta t}$, cho biết chuyển động nhanh chậm và hướng đi tại đúng thời điểm đó.',
        },
        {
          type: 'table',
          caption: 'So sánh tốc độ trung bình và vận tốc trung bình',
          head: ['Đặc điểm', 'Tốc độ trung bình', 'Vận tốc trung bình'],
          rows: [
            ['Tính từ', 'Quãng đường $s$', 'Độ dịch chuyển $\\vec{d}$'],
            ['Loại đại lượng', 'Vô hướng', 'Vectơ'],
            ['Khi đi rồi về chỗ cũ', 'Lớn hơn $0$', 'Bằng $0$'],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Khi vật chuyển động thẳng, không đổi chiều, độ lớn của vận tốc bằng tốc độ. Khi vật đổi chiều hoặc đổi hướng, hai giá trị trung bình này thường khác nhau.',
        },
      ],
    },
    {
      heading: 'Tổng hợp vận tốc',
      blocks: [
        {
          type: 'p',
          text: 'Một vật chuyển động trong một hệ quy chiếu đang chuyển động so với hệ quy chiếu khác. Gọi $1$ là vật, $2$ là hệ quy chiếu chuyển động, $3$ là hệ quy chiếu đứng yên, chẳng hạn thuyền, nước và bờ. Khi đó',
        },
        { type: 'tex', tex: '\\vec{v}_{1,3} = \\vec{v}_{1,2} + \\vec{v}_{2,3}' },
        {
          type: 'list',
          items: [
            '$\\vec{v}_{1,3}$: vận tốc tổng hợp, là vận tốc của vật so với hệ quy chiếu đứng yên.',
            '$\\vec{v}_{1,2}$: vận tốc của vật so với hệ quy chiếu chuyển động.',
            '$\\vec{v}_{2,3}$: vận tốc của hệ quy chiếu chuyển động so với hệ quy chiếu đứng yên.',
          ],
        },
        {
          type: 'table',
          caption: 'Độ lớn của vận tốc tổng hợp',
          head: ['Trường hợp', 'Độ lớn $v_{1,3}$'],
          rows: [
            ['Cùng phương, cùng chiều', '$v_{1,3} = v_{1,2} + v_{2,3}$'],
            ['Cùng phương, ngược chiều', '$v_{1,3} = |v_{1,2} - v_{2,3}|$'],
            ['Vuông góc với nhau', '$v_{1,3} = \\sqrt{v_{1,2}^2 + v_{2,3}^2}$'],
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Luôn cộng theo vectơ',
          text: 'Chỉ cộng trực tiếp hai độ lớn khi hai vận tốc cùng phương, cùng chiều. Hướng của vận tốc tổng hợp được xác định từ hình vectơ, không phải từ hướng của từng vận tốc.',
        },
      ],
    },
  ],
  explore: {
    title: 'Thuyền qua sông',
    instruction:
      'Chọn hướng mũi thuyền, chỉnh vận tốc của thuyền và của dòng nước, rồi cho thuyền chạy. Quan sát quỹ đạo và vectơ vận tốc tổng hợp. Khi mũi thuyền vuông góc với bờ, hãy thử tăng dòng nước: thời gian qua sông có đổi không?',
  },
  examples: [
    {
      problem:
        'Một người đi $3$ km theo hướng Đông trong $30$ phút, rồi đi $4$ km theo hướng Bắc trong $30$ phút. Tính tốc độ trung bình và độ lớn vận tốc trung bình của người đó trên cả hành trình.',
      steps: [
        'Tổng thời gian: $t = 30 + 30 = 60$ phút $= 1$ h.',
        'Quãng đường: $s = 3 + 4 = 7$ km, nên tốc độ trung bình $v = \\dfrac{s}{t} = \\dfrac{7}{1} = 7$ km/h.',
        'Hai chặng vuông góc nên độ dịch chuyển $d = \\sqrt{3^2 + 4^2} = 5$ km.',
        'Độ lớn vận tốc trung bình: $\\dfrac{d}{t} = \\dfrac{5}{1} = 5$ km/h.',
      ],
      answer: 'Tốc độ trung bình $7$ km/h; độ lớn vận tốc trung bình $5$ km/h.',
    },
    {
      problem:
        'Một thuyền máy hướng mũi vuông góc với bờ, vận tốc của thuyền so với nước là $3$ m/s, vận tốc của dòng nước so với bờ là $4$ m/s. Sông rộng $60$ m. Tính vận tốc của thuyền so với bờ, thời gian qua sông và khoảng cách thuyền bị trôi theo dòng.',
      steps: [
        'Gọi $1$ là thuyền, $2$ là nước, $3$ là bờ. Hai vận tốc vuông góc nên $v_{1,3} = \\sqrt{3^2 + 4^2} = 5$ m/s.',
        'Thành phần vuông góc với bờ là $v_{1,2}$, nên thời gian qua sông $t = \\dfrac{60}{3} = 20$ s.',
        'Trong thời gian đó, nước cuốn thuyền đi $v_{2,3} \\cdot t = 4 \\cdot 20 = 80$ m.',
      ],
      answer: '$v_{1,3} = 5$ m/s; qua sông hết $20$ s; thuyền trôi $80$ m theo dòng.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Phát biểu nào đúng?',
      options: [
        'Tốc độ là đại lượng vectơ, vận tốc là đại lượng vô hướng.',
        'Vận tốc trung bình được tính từ quãng đường đi được.',
        'Vận tốc là đại lượng vectơ, có hướng của độ dịch chuyển.',
        'Tốc độ trung bình luôn bằng độ lớn vận tốc trung bình.',
      ],
      answer: 2,
      hints: ['Đại lượng nào được tính từ độ dịch chuyển?'],
      solution:
        'Vận tốc $\\vec{v} = \\dfrac{\\vec{d}}{t}$ là vectơ, cùng hướng với độ dịch chuyển. Tốc độ được tính từ quãng đường và là đại lượng vô hướng.',
    },
    {
      type: 'number',
      prompt:
        'Một người đi quãng đường $5$ km trong $20$ phút. Tính tốc độ trung bình theo m/s (làm tròn đến hai chữ số thập phân).',
      answer: 4.17,
      tolerance: 0.01,
      unit: 'm/s',
      hints: ['Đổi $5$ km ra mét và $20$ phút ra giây.'],
      solution: '$v = \\dfrac{5000}{1200} \\approx 4{,}17$ m/s.',
    },
    {
      type: 'number',
      prompt: 'Đổi tốc độ $54$ km/h ra m/s.',
      answer: 15,
      unit: 'm/s',
      hints: ['$1$ m/s $= 3{,}6$ km/h.'],
      solution: '$54 : 3{,}6 = 15$ m/s.',
    },
    {
      type: 'number',
      prompt:
        'Một bạn đạp xe từ nhà đến trường cách nhà $2{,}4$ km trên đường thẳng, rồi về ngay theo đường cũ, tổng thời gian $36$ phút. Tính tốc độ trung bình trên cả hành trình theo km/h.',
      answer: 8,
      unit: 'km/h',
      hints: ['Quãng đường gồm cả lượt đi và lượt về.', 'Đổi $36$ phút ra giờ.'],
      solution:
        'Quãng đường $s = 2 \\cdot 2{,}4 = 4{,}8$ km, thời gian $t = 0{,}6$ h, nên $v = \\dfrac{4{,}8}{0{,}6} = 8$ km/h. Vận tốc trung bình của cả hành trình bằng $0$ vì bạn đã về chỗ cũ.',
    },
    {
      type: 'number',
      prompt:
        'Một ca nô có vận tốc $5$ m/s so với nước, nước chảy với vận tốc $2$ m/s so với bờ. Tính độ lớn vận tốc của ca nô so với bờ khi chạy ngược dòng.',
      answer: 3,
      unit: 'm/s',
      hints: ['Hai vận tốc cùng phương, ngược chiều.'],
      solution: '$v_{1,3} = |v_{1,2} - v_{2,3}| = |5 - 2| = 3$ m/s.',
    },
    {
      type: 'number',
      prompt:
        'Một máy bay bay về hướng Bắc với vận tốc $200$ m/s so với không khí, trong khi gió thổi từ hướng Tây sang hướng Đông với vận tốc $20$ m/s. Tính độ lớn vận tốc của máy bay so với mặt đất, làm tròn đến hàng đơn vị.',
      answer: 201,
      tolerance: 0.5,
      unit: 'm/s',
      hints: ['Hai vận tốc vuông góc với nhau.'],
      solution: '$v_{1,3} = \\sqrt{200^2 + 20^2} = \\sqrt{40\\,400} \\approx 201$ m/s.',
    },
    {
      type: 'number',
      prompt:
        'Thuyền hướng mũi vuông góc với bờ, $v_{1,2} = 4$ m/s, $v_{2,3} = 3$ m/s, sông rộng $80$ m. Thuyền bị trôi bao nhiêu mét theo dòng khi tới bờ bên kia?',
      answer: 60,
      unit: 'm',
      hints: ['Trước tiên tính thời gian qua sông từ thành phần vuông góc với bờ.'],
      solution: '$t = \\dfrac{80}{4} = 20$ s, nên thuyền trôi $3 \\cdot 20 = 60$ m.',
    },
    {
      type: 'choice',
      prompt: 'Thuyền giữ mũi vuông góc với bờ. Nếu dòng nước chảy mạnh hơn thì thời gian qua sông',
      options: ['tăng lên', 'giảm đi', 'không đổi', 'bằng $0$'],
      answer: 2,
      hints: ['Dòng nước có giúp thuyền tiến sang bờ bên kia không?'],
      solution:
        'Vận tốc theo phương vuông góc với bờ vẫn là $v_{1,2}$, nên thời gian không đổi. Thuyền chỉ trôi xa hơn theo dòng.',
    },
    {
      type: 'number',
      prompt:
        'Một người đi $600$ m theo hướng Đông trong $5$ phút rồi quay lại $200$ m theo hướng Tây trong $5$ phút. Tính độ lớn vận tốc trung bình của người đó theo m/s (làm tròn đến hai chữ số thập phân).',
      answer: 0.67,
      tolerance: 0.01,
      unit: 'm/s',
      hints: [
        'Độ dịch chuyển có độ lớn $600 - 200$ m.',
        'Tổng thời gian là $10$ phút, đổi ra giây.',
      ],
      solution:
        '$d = 400$ m về hướng Đông, $t = 600$ s, nên $v = \\dfrac{400}{600} \\approx 0{,}67$ m/s, hướng Đông.',
    },
  ],
  takeaways: [
    'Tốc độ trung bình bằng quãng đường chia thời gian; tốc độ tức thời là tốc độ tại một thời điểm.',
    'Vận tốc là vectơ, $\\vec{v} = \\dfrac{\\vec{d}}{t}$, có hướng của độ dịch chuyển.',
    'Tổng hợp vận tốc: $\\vec{v}_{1,3} = \\vec{v}_{1,2} + \\vec{v}_{2,3}$.',
    'Cùng chiều: $v_{1,3} = v_{1,2} + v_{2,3}$; ngược chiều: $v_{1,3} = |v_{1,2} - v_{2,3}|$; vuông góc: $v_{1,3} = \\sqrt{v_{1,2}^2 + v_{2,3}^2}$.',
  ],
};
