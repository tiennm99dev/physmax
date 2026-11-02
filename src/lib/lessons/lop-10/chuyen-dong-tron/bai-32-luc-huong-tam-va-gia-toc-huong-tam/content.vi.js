/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Lực hoặc hợp lực hướng vào tâm giữ vật chuyển động tròn đều, gây ra gia tốc hướng tâm a = v²/r; lực căng dây, lực hấp dẫn, lực ma sát đều có thể đóng vai trò lực hướng tâm.',
  intro:
    'Trái Đất không bay thẳng ra vũ trụ mà cứ quay quanh Mặt Trời. Xe chạy trên đường vòng phải giảm tốc, và mặt đường ở khúc cua thường nghiêng về phía tâm. Lực nào giữ các vật đi trên đường tròn, và nó phải lớn đến đâu?',
  objectives: [
    'Nêu được khái niệm lực hướng tâm và chỉ ra lực đóng vai trò lực hướng tâm trong các trường hợp cụ thể.',
    'Vận dụng được $a_{ht} = \\dfrac{v^2}{r} = \\omega^2 r$ và $F_{ht} = m\\dfrac{v^2}{r} = m\\omega^2 r$.',
    'Giải thích được vì sao xe phải giảm tốc khi qua khúc cua và vì sao mặt đường cong được làm nghiêng.',
  ],
  sections: [
    {
      heading: 'Lực hướng tâm',
      blocks: [
        {
          type: 'p',
          text: 'Buộc một cục tẩy vào đầu sợi dây rồi quay tròn. Dây luôn kéo cục tẩy về phía tay, tức là về phía tâm quỹ đạo. Nếu buông tay, cục tẩy không còn bị kéo và văng theo phương tiếp tuyến với quỹ đạo tại điểm đó. Vậy phải có lực hướng vào tâm thì vật mới duy trì được chuyển động tròn.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Lực hướng tâm',
          text: 'Lực (hay hợp lực) tác dụng lên vật chuyển động tròn đều, hướng vào tâm quỹ đạo, gọi là lực hướng tâm.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Không phải một loại lực mới',
          text: 'Lực hướng tâm không phải là một loại lực riêng. Đó là vai trò của một lực đã biết (lực căng dây, lực hấp dẫn, lực ma sát) hoặc của hợp lực các lực tác dụng lên vật. Khi vẽ lực, không vẽ thêm một lực hướng tâm bên cạnh các lực đó.',
        },
      ],
    },
    {
      heading: 'Gia tốc hướng tâm',
      blocks: [
        {
          type: 'p',
          text: 'Trong chuyển động tròn đều, vectơ vận tốc đổi hướng liên tục nên vật có gia tốc. Theo định luật 2 Newton, gia tốc cùng hướng với lực, nên gia tốc này cũng hướng vào tâm và được gọi là gia tốc hướng tâm, kí hiệu $a_{ht}$. Vì $\\vec{a}$ luôn vuông góc với $\\vec{v}$, nó chỉ làm đổi hướng vận tốc mà không làm đổi tốc độ.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Độ lớn của gia tốc hướng tâm',
          text: '$a_{ht} = \\dfrac{v^2}{r} = \\omega^2 r$, với $v$ là tốc độ, $\\omega$ là tốc độ góc, $r$ là bán kính quỹ đạo. Đơn vị là m/s².',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Độ lớn của lực hướng tâm',
          text: 'Theo định luật 2 Newton: $F_{ht} = ma_{ht} = m\\dfrac{v^2}{r} = m\\omega^2 r$.',
        },
        {
          type: 'p',
          text: 'Lực hướng tâm tỉ lệ với bình phương tốc độ: tốc độ tăng gấp đôi thì lực cần thiết tăng gấp bốn lần.',
        },
      ],
    },
    {
      heading: 'Ứng dụng của chuyển động tròn',
      blocks: [
        {
          type: 'p',
          text: 'Treo quả cầu vào sợi dây rồi cho quay đều trong mặt phẳng ngang, dây hợp với phương thẳng đứng góc $\\alpha$. Hợp lực của lực căng dây $\\vec{T}$ và trọng lực $\\vec{P}$ nằm ngang, hướng vào tâm, và đóng vai trò lực hướng tâm:',
        },
        {
          type: 'tex',
          tex: 'F_{ht} = P\\tan\\alpha \\quad\\Rightarrow\\quad m\\omega^2 r = mg\\tan\\alpha',
        },
        {
          type: 'p',
          text: 'Vệ tinh nhân tạo quay quanh Trái Đất: lực hấp dẫn do Trái Đất tác dụng lên vệ tinh đóng vai trò lực hướng tâm.',
        },
        {
          type: 'list',
          items: [
            'Xe chạy trên đường phẳng nằm ngang ở khúc cua: lực ma sát giữa bánh xe và mặt đường đóng vai trò lực hướng tâm.',
            'Khi tốc độ lớn, lực hướng tâm cần thiết có thể vượt quá lực ma sát lớn nhất, xe sẽ trượt ra ngoài khúc cua. Vì vậy xe phải giảm tốc khi vào cua.',
            'Mặt đường ở khúc cua được làm nghiêng về phía tâm để hợp lực của phản lực và lực ma sát tạo ra lực hướng tâm lớn hơn, giúp xe an toàn hơn.',
          ],
        },
        { type: 'widget', name: 'khuc-cua' },
      ],
    },
  ],
  explore: {
    title: 'Viên đá buộc dây',
    instruction:
      'Bấm Quay rồi đổi khối lượng, chiều dài dây, tốc độ và theo dõi mũi tên lực hướng tâm. Sau đó canh lúc cắt dây để viên đá bay trúng bia: có thể dừng lại và nhích từng chút để canh. Viên đá bay theo hướng nào?',
  },
  examples: [
    {
      problem:
        'Một vệ tinh nhân tạo chuyển động tròn đều quanh Trái Đất với bán kính quỹ đạo $7\\,000$ km, tốc độ $7{,}57$ km/s. Tính gia tốc hướng tâm của vệ tinh.',
      steps: [
        'Đổi đơn vị: $r = 7 \\cdot 10^{6}$ m, $v = 7\\,570$ m/s.',
        '$a_{ht} = \\dfrac{v^2}{r} = \\dfrac{7\\,570^2}{7 \\cdot 10^{6}} \\approx 8{,}19$ m/s².',
      ],
      answer: '$a_{ht} \\approx 8{,}19$ m/s².',
    },
    {
      problem:
        'Quả cầu treo vào sợi dây dài $l = 0{,}75$ m, quay đều trong mặt phẳng ngang, dây hợp với phương thẳng đứng góc $\\alpha = 60^\\circ$. Lấy $g = 9{,}8$ m/s². Tính tốc độ góc và tần số quay của quả cầu.',
      steps: [
        'Bán kính quỹ đạo: $r = l\\sin\\alpha = 0{,}75 \\cdot \\sin 60^\\circ \\approx 0{,}65$ m.',
        'Hợp lực của $\\vec{T}$ và $\\vec{P}$ là lực hướng tâm: $m\\omega^2 r = mg\\tan\\alpha$, khối lượng được giản ước.',
        '$\\omega = \\sqrt{\\dfrac{g\\tan\\alpha}{r}} = \\sqrt{\\dfrac{g}{l\\cos\\alpha}} = \\sqrt{\\dfrac{9{,}8}{0{,}75 \\cdot 0{,}5}} \\approx 5{,}11$ rad/s.',
        '$f = \\dfrac{\\omega}{2\\pi} \\approx 0{,}81$ Hz.',
      ],
      answer: '$\\omega \\approx 5{,}11$ rad/s, $f \\approx 0{,}81$ Hz.',
    },
    {
      problem:
        'Ô tô khối lượng $1{,}5$ tấn chạy với tốc độ $36$ km/h qua khúc cua nằm ngang bán kính $50$ m. Tính lực ma sát đóng vai trò lực hướng tâm.',
      steps: [
        'Đổi đơn vị: $m = 1\\,500$ kg, $v = 10$ m/s.',
        '$F_{ms} = F_{ht} = m\\dfrac{v^2}{r} = 1\\,500 \\cdot \\dfrac{10^2}{50} = 3\\,000$ N.',
      ],
      answer: 'Lực ma sát có độ lớn $3\\,000$ N, hướng vào tâm khúc cua.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt:
        'Vật chuyển động tròn đều với tốc độ $6$ m/s trên đường tròn bán kính $3$ m. Tính gia tốc hướng tâm của vật.',
      answer: 12,
      unit: 'm/s²',
      hints: ['$a_{ht} = \\dfrac{v^2}{r}$.'],
      solution: '$a_{ht} = \\dfrac{6^2}{3} = 12$ m/s².',
    },
    {
      type: 'number',
      prompt:
        'Điểm trên đĩa cách trục quay $0{,}5$ m, đĩa quay đều với tốc độ góc $4$ rad/s. Tính gia tốc hướng tâm của điểm đó.',
      answer: 8,
      unit: 'm/s²',
      hints: ['Khi biết $\\omega$, dùng $a_{ht} = \\omega^2 r$.'],
      solution: '$a_{ht} = 4^2 \\cdot 0{,}5 = 8$ m/s².',
    },
    {
      type: 'number',
      prompt:
        'Viên đá $0{,}5$ kg buộc vào sợi dây dài $1$ m, quay đều trên mặt bàn nhẵn nằm ngang với tốc độ $4$ m/s. Tính lực căng dây.',
      answer: 8,
      unit: 'N',
      hints: ['Lực căng dây đóng vai trò lực hướng tâm.'],
      solution: '$T = F_{ht} = m\\dfrac{v^2}{r} = 0{,}5 \\cdot \\dfrac{4^2}{1} = 8$ N.',
    },
    {
      type: 'choice',
      prompt:
        'Vật đang quay tròn nhờ sợi dây thì dây đứt. Ngay sau đó vật chuyển động thế nào (bỏ qua trọng lực)?',
      options: [
        'Thẳng đều theo phương tiếp tuyến với quỹ đạo tại điểm dây đứt',
        'Thẳng theo sợi dây, ra xa tâm quỹ đạo',
        'Tiếp tục đi trên đường tròn cũ',
        'Thẳng về phía tâm quỹ đạo',
      ],
      answer: 0,
      hints: [
        'Khi dây đứt, còn lực nào tác dụng lên vật không?',
        'Không có lực thì vận tốc của vật thay đổi thế nào?',
      ],
      solution:
        'Không còn lực nên theo định luật 1 Newton, vật giữ nguyên vận tốc ngay trước lúc dây đứt. Vận tốc đó có phương tiếp tuyến với quỹ đạo.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi chuyển động tròn với lực đóng vai trò lực hướng tâm.',
      left: [
        'Vệ tinh nhân tạo quay quanh Trái Đất',
        'Viên đá quay trên mặt bàn nhẵn nhờ sợi dây',
        'Ô tô qua khúc cua trên đường phẳng nằm ngang',
      ],
      right: ['Lực hấp dẫn', 'Lực căng dây', 'Lực ma sát', 'Lực đẩy Archimedes'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
      hints: ['Với mỗi vật, hỏi: cái gì đang kéo hoặc đẩy nó về phía tâm?'],
      solution:
        'Trái Đất hút vệ tinh bằng lực hấp dẫn, dây kéo viên đá bằng lực căng, mặt đường giữ bánh xe bằng lực ma sát.',
    },
    {
      type: 'number',
      prompt:
        'Vệ tinh địa tĩnh quay quanh Trái Đất với chu kì $24$ giờ, bán kính quỹ đạo $42\\,180$ km. Tính gia tốc hướng tâm của vệ tinh (làm tròn đến ba chữ số thập phân).',
      answer: 0.223,
      tolerance: 0.002,
      unit: 'm/s²',
      hints: [
        'Đổi $T$ ra giây và $r$ ra mét.',
        'Dùng $\\omega = \\dfrac{2\\pi}{T}$ rồi $a_{ht} = \\omega^2 r$.',
      ],
      solution:
        '$T = 86\\,400$ s nên $\\omega = \\dfrac{2\\pi}{86\\,400} \\approx 7{,}27 \\cdot 10^{-5}$ rad/s; $a_{ht} = \\omega^2 r \\approx (7{,}27 \\cdot 10^{-5})^2 \\cdot 4{,}218 \\cdot 10^{7} \\approx 0{,}223$ m/s².',
    },
    {
      type: 'number',
      prompt:
        'Mặt Trăng quay quanh Trái Đất với bán kính quỹ đạo $3{,}84 \\cdot 10^{8}$ m, chu kì $27{,}2$ ngày. Gia tốc hướng tâm của Mặt Trăng bằng bao nhiêu lần $10^{-3}$ m/s² (làm tròn đến hai chữ số thập phân)?',
      answer: 2.74,
      tolerance: 0.02,
      hints: [
        'Đổi chu kì ra giây: một ngày có $86\\,400$ s.',
        'Dùng $a_{ht} = \\left(\\dfrac{2\\pi}{T}\\right)^2 r$.',
      ],
      solution:
        '$T = 27{,}2 \\cdot 86\\,400 = 2\\,350\\,080$ s; $\\omega = \\dfrac{2\\pi}{T} \\approx 2{,}67 \\cdot 10^{-6}$ rad/s; $a_{ht} = \\omega^2 r \\approx 2{,}74 \\cdot 10^{-3}$ m/s².',
    },
    {
      type: 'number',
      prompt:
        'Ô tô $1\\,000$ kg chạy với tốc độ $54$ km/h qua khúc cua nằm ngang bán kính $75$ m. Tính lực ma sát đóng vai trò lực hướng tâm.',
      answer: 3000,
      unit: 'N',
      hints: ['Đổi tốc độ ra m/s.', '$F_{ms} = F_{ht} = m\\dfrac{v^2}{r}$.'],
      solution: '$v = 15$ m/s; $F_{ht} = 1\\,000 \\cdot \\dfrac{15^2}{75} = 3\\,000$ N.',
    },
    {
      type: 'number',
      prompt:
        'Khi qua cùng một khúc cua, tốc độ xe tăng gấp đôi thì lực hướng tâm cần thiết tăng gấp bao nhiêu lần?',
      answer: 4,
      unit: 'lần',
      hints: ['Trong $F_{ht} = m\\dfrac{v^2}{r}$, $v$ có số mũ bao nhiêu?'],
      solution: '$F_{ht}$ tỉ lệ với $v^2$, nên $v$ tăng $2$ lần thì $F_{ht}$ tăng $2^2 = 4$ lần.',
    },
    {
      type: 'number',
      prompt:
        'Xe qua khúc cua nằm ngang bán kính $50$ m, hệ số ma sát giữa bánh xe và mặt đường là $0{,}5$. Lấy $g = 9{,}8$ m/s². Tính tốc độ lớn nhất để xe không trượt (làm tròn đến một chữ số thập phân).',
      answer: 15.7,
      tolerance: 0.1,
      unit: 'm/s',
      hints: [
        'Lực ma sát lớn nhất là $\\mu mg$.',
        'Cho $m\\dfrac{v^2}{r} = \\mu mg$, khối lượng được giản ước.',
      ],
      solution:
        '$m\\dfrac{v^2}{r} = \\mu mg$ nên $v = \\sqrt{\\mu g r} = \\sqrt{0{,}5 \\cdot 9{,}8 \\cdot 50} = \\sqrt{245} \\approx 15{,}7$ m/s.',
    },
    {
      type: 'number',
      prompt:
        'Quả cầu treo vào sợi dây quay đều trong mặt phẳng ngang theo đường tròn bán kính $0{,}5$ m, dây hợp với phương thẳng đứng góc $45^\\circ$. Lấy $g = 9{,}8$ m/s². Tính tốc độ góc của quả cầu (làm tròn đến hai chữ số thập phân).',
      answer: 4.43,
      tolerance: 0.02,
      unit: 'rad/s',
      hints: [
        'Hợp lực của lực căng và trọng lực là $P\\tan\\alpha$.',
        'Cho $m\\omega^2 r = mg\\tan\\alpha$.',
      ],
      solution:
        '$\\omega^2 = \\dfrac{g\\tan 45^\\circ}{r} = \\dfrac{9{,}8}{0{,}5} = 19{,}6$ nên $\\omega \\approx 4{,}43$ rad/s.',
    },
    {
      type: 'choice',
      prompt: 'Vì sao mặt đường ở khúc cua thường được làm nghiêng về phía tâm?',
      options: [
        'Để hợp lực của phản lực và lực ma sát tạo được lực hướng tâm lớn hơn',
        'Để giảm khối lượng của xe',
        'Để triệt tiêu lực hướng tâm tác dụng lên xe',
        'Để xe tăng tốc khi vào cua',
      ],
      answer: 0,
      hints: ['Xe đi trên đường cong cần lực gì? Mặt đường nghiêng thì phản lực có hướng thế nào?'],
      solution:
        'Xe vẫn cần lực hướng tâm để đi theo đường cong. Trên mặt nghiêng, phản lực có thành phần hướng vào tâm, cùng lực ma sát tạo lực hướng tâm lớn hơn so với mặt phẳng.',
    },
  ],
  takeaways: [
    'Lực hướng tâm là lực hoặc hợp lực hướng vào tâm, giữ vật chuyển động tròn đều; không phải một loại lực mới.',
    'Gia tốc hướng tâm: $a_{ht} = \\dfrac{v^2}{r} = \\omega^2 r$, hướng vào tâm, vuông góc với vận tốc.',
    'Lực hướng tâm: $F_{ht} = m\\dfrac{v^2}{r} = m\\omega^2 r$.',
    'Khi không còn lực hướng tâm, vật bay thẳng theo tiếp tuyến với quỹ đạo.',
    'Xe qua khúc cua: lực ma sát, cùng phản lực khi đường nghiêng, tạo lực hướng tâm; tốc độ càng lớn thì lực cần càng lớn, nên phải giảm tốc.',
  ],
};
