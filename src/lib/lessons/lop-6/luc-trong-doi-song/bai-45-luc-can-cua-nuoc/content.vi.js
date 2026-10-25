/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Vật chuyển động trong nước chịu tác dụng của lực cản của nước, ngược chiều chuyển động; lực cản của nước lớn hơn nhiều so với lực cản của không khí, càng lớn khi diện tích mặt cản càng lớn, và nhỏ hơn với vật có hình dạng thuôn như thân cá, thân thuyền.',
  intro:
    'Một chiếc máy bay có thể bay với tốc độ gần $900\\ \\text{km/h}$, còn một chiếc tàu ngầm chạy dưới nước chỉ đạt khoảng vài chục kilômét mỗi giờ. Vì sao tàu ngầm chậm hơn nhiều như vậy? Và vì sao đi bộ dưới bể bơi lại mệt hơn hẳn đi trên bờ?',
  objectives: [
    'Nêu được: vật chuyển động trong nước chịu tác dụng của lực cản của nước.',
    'Nêu được lực cản của nước ngược chiều chuyển động và lớn hơn lực cản của không khí.',
    'Nêu được lực cản của nước càng lớn khi diện tích mặt cản càng lớn; vật có hình dạng thuôn chịu lực cản nhỏ hơn.',
    'Giải thích được hình dạng của cá, tàu thuyền và tư thế của vận động viên bơi lội bằng lực cản của nước.',
  ],
  sections: [
    {
      heading: 'Lực cản của nước',
      blocks: [
        {
          type: 'p',
          text: 'Thí nghiệm: một hộp nhựa trong suốt, phía trên có ray cho xe lăn chạy. Dưới xe lăn gắn một tấm cản nhúng vào trong hộp. Sợi dây buộc vào xe, vắt qua ròng rọc cố định và nối với lực kế. Kéo lực kế để xe lăn chuyển động đều, đọc số chỉ lực kế khi hộp chưa có nước, rồi đổ nước vào hộp và làm lại.',
        },
        { type: 'widget', name: 'xe-lan' },
        {
          type: 'p',
          text: 'Khi hộp có nước, số chỉ lực kế lớn hơn hẳn so với khi chưa có nước. Nước đã cản trở chuyển động của tấm cản, nên phải kéo mạnh hơn mới giữ được xe chuyển động đều.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Lực cản của nước',
          text: 'Các vật chuyển động trong nước chịu tác dụng của lực cản của nước. Lực cản của nước là lực tiếp xúc, ngược chiều với chiều chuyển động của vật.',
        },
        {
          type: 'p',
          text: 'Vật chuyển động trong không khí cũng chịu lực cản của không khí, nhưng lực này nhỏ hơn nhiều. Thả hai hòn bi giống nhau từ cùng độ cao, một hòn trong không khí, một hòn trong cốc nước: hòn bi trong không khí rơi nhanh hơn, vì lực cản của nước lên hòn bi lớn hơn lực cản của không khí.',
        },
      ],
    },
    {
      heading: 'Lực cản của nước phụ thuộc vào yếu tố nào?',
      blocks: [
        {
          type: 'p',
          text: 'Làm lại thí nghiệm trên với hai tấm cản có kích thước khác nhau. Thay tấm cản nhỏ bằng tấm cản có diện tích lớn hơn: số chỉ lực kế tăng lên. Cầm hai tấm cản đẩy trong chậu nước: đẩy tấm lớn thấy nặng tay hơn.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Kết luận',
          text: 'Lực cản của nước phụ thuộc vào nhiều yếu tố. Diện tích mặt cản (phần bề mặt của vật hướng về phía chuyển động, đón lấy nước) càng lớn thì lực cản của nước càng lớn.',
        },
        {
          type: 'list',
          items: [
            'Hình dạng của vật: vật có hình dạng thuôn, đầu nhọn (như thân cá) rẽ nước dễ dàng nên chịu lực cản nhỏ hơn vật có mặt phẳng chắn ngang dòng nước.',
            'Tốc độ của vật: cùng một vật, chuyển động trong nước càng nhanh thì lực cản càng lớn. Em có thể thấy điều này khi kéo xe lăn nhanh hơn trong thí nghiệm ảo.',
          ],
        },
        {
          type: 'table',
          caption: 'Số chỉ lực kế trong thí nghiệm ảo, kéo xe đều với tốc độ $0{,}5\\ \\text{m/s}$',
          head: ['Tấm cản', 'Chưa có nước', 'Có nước'],
          rows: [
            ['Tấm cản nhỏ', '$0{,}20\\ \\text{N}$', '$0{,}95\\ \\text{N}$'],
            ['Tấm cản lớn', '$0{,}20\\ \\text{N}$', '$1{,}70\\ \\text{N}$'],
            ['Tấm cản lớn có mũi thuôn', '$0{,}20\\ \\text{N}$', '$0{,}70\\ \\text{N}$'],
          ],
        },
      ],
    },
    {
      heading: 'Lực cản của nước trong đời sống',
      blocks: [
        {
          type: 'list',
          items: [
            'Cá có thân hình thuôn, đầu nhọn, vảy trơn nhẵn: lực cản của nước nhỏ nên cá bơi nhanh.',
            'Tàu thuyền có mũi nhọn, thân thuôn dài để giảm lực cản của nước; tàu ngầm có thân thuôn như thân cá.',
            'Vận động viên bơi giữ người thẳng, nằm ngang trên mặt nước, đội mũ bơi và mặc đồ bơi bó sát, trơn: diện tích mặt cản giảm, lực cản giảm, bơi nhanh hơn.',
            'Đi bộ dưới nước khó hơn đi trên cạn vì lực cản của nước lớn hơn lực cản của không khí.',
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Lực cản của nước cũng có ích',
          text: 'Mái chèo có bản rộng: khi chèo, nước cản lại mái chèo nên đẩy thuyền tiến về phía trước. Chân vịt có màng, chân ếch nhái có màng giúp chúng bơi được nhờ đẩy vào nước. Người tập đi bộ trong nước để rèn luyện cơ bắp vì nước cản lại mỗi bước chân.',
        },
      ],
    },
  ],
  explore: {
    title: 'Cuộc đua trong bể nước',
    instruction:
      'Bốn vật cùng chất, cùng khối lượng nhưng khác hình dạng được thả cùng lúc từ mặt nước. Chọn dự đoán vật nào chạm đáy trước rồi nhấn "Thả" và xem thời gian của từng vật. Sau đó đổi bể sang "Không khí" và thả lại. So sánh lực cản lên mỗi vật ở bảng bên dưới.',
  },
  examples: [
    {
      problem:
        'Trong thí nghiệm kéo xe lăn có gắn tấm cản, khi hộp chưa có nước lực kế chỉ $0{,}2\\ \\text{N}$; khi đổ nước vào hộp và kéo xe đều như trước, lực kế chỉ $0{,}9\\ \\text{N}$. a) Vì sao số chỉ lực kế tăng? b) Lực cản của nước lên tấm cản khoảng bao nhiêu?',
      steps: [
        'a) Khi có nước, tấm cản chuyển động trong nước nên chịu thêm lực cản của nước, ngược chiều chuyển động. Muốn xe vẫn chuyển động đều, phải kéo mạnh hơn.',
        'b) Lúc chưa có nước, lực kéo $0{,}2\\ \\text{N}$ chỉ để thắng ma sát (lực cản của không khí rất nhỏ).',
        'Lúc có nước, lực kéo phải thắng cả ma sát lẫn lực cản của nước, nên lực cản của nước khoảng $0{,}9 - 0{,}2 = 0{,}7\\ \\text{N}$.',
      ],
      answer: 'a) Do lực cản của nước; b) khoảng $0{,}7\\ \\text{N}$.',
    },
    {
      problem:
        'Vì sao tàu thuyền thường được đóng với mũi nhọn, thân thuôn dài, còn mái chèo lại có bản rộng?',
      steps: [
        'Khi tàu chạy, phần mũi tàu đón nước. Mũi nhọn, thân thuôn giúp tàu rẽ nước dễ dàng, giảm lực cản của nước, nên tàu chạy nhanh hơn và tốn ít nhiên liệu hơn.',
        'Mái chèo thì cần nước cản lại thật mạnh: bản rộng có diện tích mặt cản lớn, nước cản mái chèo nhiều, nhờ đó người chèo đẩy được thuyền đi.',
      ],
      answer:
        'Thân tàu thuôn để giảm lực cản của nước; mái chèo bản rộng để tăng lực cản của nước, giúp đẩy thuyền đi.',
    },
    {
      problem:
        'Lấy hai miếng đất nặn giống hệt nhau: một miếng vo thành viên tròn, một miếng ép thành tấm mỏng, rộng. Thả cả hai (tấm mỏng nằm ngang) cùng lúc từ mặt nước vào một bình nước cao. Miếng nào chạm đáy trước? Giải thích.',
      steps: [
        'Hai miếng đất nặn giống hệt nhau nên nặng như nhau; chúng chỉ khác hình dạng.',
        'Tấm mỏng nằm ngang có diện tích mặt cản lớn nên chịu lực cản của nước lớn, chìm chậm.',
        'Viên tròn có diện tích mặt cản nhỏ hơn nhiều, lực cản nhỏ hơn nên chìm nhanh hơn.',
      ],
      answer: 'Viên đất nặn tròn chạm đáy trước vì diện tích mặt cản nhỏ, lực cản của nước nhỏ.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Lực cản của nước tác dụng lên vật khi nào?',
      options: [
        'Khi vật chuyển động trong nước',
        'Chỉ khi vật đứng yên trong nước',
        'Chỉ khi vật nổi trên mặt nước',
        'Khi vật ở trên cạn, gần mặt nước',
      ],
      answer: 0,
      hints: ['Nhớ lại thí nghiệm: tấm cản phải chuyển động trong nước.'],
      solution: 'Các vật chuyển động trong nước chịu tác dụng của lực cản của nước.',
    },
    {
      type: 'choice',
      prompt: 'Một con cá đang bơi về phía bên phải. Lực cản của nước tác dụng lên cá có chiều',
      options: [
        'từ trái sang phải, cùng chiều bơi',
        'từ phải sang trái, ngược chiều bơi',
        'từ dưới lên trên',
        'từ trên xuống dưới',
      ],
      answer: 1,
      hints: ['Lực cản luôn cản trở chuyển động.'],
      solution:
        'Lực cản của nước ngược chiều chuyển động: cá bơi sang phải thì lực cản hướng từ phải sang trái.',
    },
    {
      type: 'text',
      prompt: 'Lực cản của nước là lực tiếp xúc hay lực không tiếp xúc? (Gõ câu trả lời.)',
      accept: ['tiếp xúc', 'lực tiếp xúc', 'là lực tiếp xúc'],
      hints: ['Nước có phải chạm vào vật thì mới cản được vật không?'],
      solution:
        'Nước chỉ cản được vật khi nước tiếp xúc với bề mặt vật, nên lực cản của nước là lực tiếp xúc.',
    },
    {
      type: 'number',
      prompt:
        'Kéo xe lăn có gắn tấm cản chuyển động đều. Khi hộp chưa có nước lực kế chỉ $0{,}3\\ \\text{N}$, khi hộp có nước lực kế chỉ $1{,}1\\ \\text{N}$. Lực cản của nước lên tấm cản khoảng bao nhiêu niutơn?',
      answer: 0.8,
      tolerance: 0.001,
      unit: 'N',
      hints: [
        'Lúc chưa có nước, lực kéo chỉ để thắng ma sát.',
        'Phần lực kéo tăng thêm khi có nước chính là lực cản của nước.',
      ],
      solution: 'Lực cản của nước khoảng $1{,}1 - 0{,}3 = 0{,}8\\ \\text{N}$.',
    },
    {
      type: 'choice',
      prompt:
        'Làm thí nghiệm với hai tấm cản có diện tích $50\\ \\text{cm}^2$ và $100\\ \\text{cm}^2$, kéo xe đều với cùng tốc độ trong hộp có nước. Kết quả nào đúng?',
      options: [
        'Số chỉ lực kế với tấm $100\\ \\text{cm}^2$ lớn hơn',
        'Số chỉ lực kế với tấm $50\\ \\text{cm}^2$ lớn hơn',
        'Số chỉ lực kế như nhau',
        'Lực kế chỉ $0$ với cả hai tấm',
      ],
      answer: 0,
      hints: ['Diện tích mặt cản ảnh hưởng thế nào đến lực cản của nước?'],
      solution:
        'Diện tích mặt cản càng lớn thì lực cản của nước càng lớn, nên với tấm $100\\ \\text{cm}^2$ phải kéo mạnh hơn: lực kế chỉ lớn hơn.',
    },
    {
      type: 'choice',
      prompt:
        'Thả hai hòn bi giống nhau từ cùng độ cao: hòn thứ nhất rơi trong không khí, hòn thứ hai rơi trong một ống đựng đầy nước. Điều nào đúng?',
      options: [
        'Hòn bi trong không khí rơi nhanh hơn vì lực cản của nước lớn hơn lực cản của không khí',
        'Hòn bi trong nước rơi nhanh hơn vì nước nặng hơn không khí',
        'Hai hòn bi rơi nhanh như nhau vì chúng giống nhau',
        'Hòn bi trong nước không rơi xuống được',
      ],
      answer: 0,
      hints: ['So sánh lực cản của nước và lực cản của không khí lên cùng một vật.'],
      solution:
        'Lực cản của nước lớn hơn nhiều so với lực cản của không khí, nên hòn bi trong nước rơi chậm hơn; hòn bi trong không khí rơi nhanh hơn.',
    },
    {
      type: 'order',
      prompt:
        'Bốn vật cùng chất, cùng khối lượng được thả cùng lúc trong một bể nước sâu. Sắp xếp theo thứ tự chạm đáy, từ vật chạm đáy trước đến vật chạm đáy sau cùng.',
      items: ['Tấm phẳng nằm ngang', 'Hình thuôn như thân cá', 'Hình lập phương', 'Hình cầu'],
      answer: [1, 3, 2, 0],
      hints: [
        'Vật chịu lực cản càng nhỏ thì chìm càng nhanh.',
        'Vật thuôn rẽ nước tốt nhất; tấm phẳng nằm ngang có diện tích mặt cản lớn nhất.',
      ],
      solution:
        'Hình thuôn chịu lực cản nhỏ nhất nên chạm đáy trước, rồi đến hình cầu, hình lập phương; tấm phẳng nằm ngang có diện tích mặt cản lớn nhất nên chạm đáy sau cùng (đúng như trong cuộc đua ở bể nước ảo).',
    },
    {
      type: 'multi',
      prompt: 'Những đặc điểm nào giúp giảm lực cản của nước?',
      options: [
        'Thân cá thuôn, đầu nhọn, vảy trơn',
        'Mũi tàu nhọn, thân tàu thuôn dài',
        'Vận động viên bơi giữ người thẳng, nằm ngang, mặc đồ bơi bó sát',
        'Mái chèo có bản rộng',
        'Bàn chân vịt có màng',
      ],
      answers: [0, 1, 2],
      hints: [
        'Giảm lực cản là làm vật rẽ nước dễ hơn, diện tích mặt cản nhỏ hơn.',
        'Có hai đặc điểm lại cần nước cản thật nhiều để đẩy vào nước.',
      ],
      solution:
        'Thân cá, thân tàu thuôn và tư thế bơi thẳng người giúp giảm lực cản. Mái chèo bản rộng và chân vịt có màng thì tăng diện tích mặt cản, để nước cản lại nhiều, nhờ đó đẩy thuyền hoặc con vịt đi tới.',
    },
    {
      type: 'choice',
      prompt: 'Vì sao đi bộ dưới bể bơi (nước ngập đến ngực) khó hơn đi bộ trên bờ?',
      options: [
        'Vì lực cản của nước lớn hơn lực cản của không khí',
        'Vì dưới nước không có lực ma sát',
        'Vì dưới nước cơ thể ta nặng hơn',
        'Vì nước làm chân ta biến dạng',
      ],
      answer: 0,
      hints: ['Khi đi, cơ thể ta phải đẩy cái gì ra phía trước?'],
      solution:
        'Khi đi dưới nước, cơ thể chuyển động trong nước nên chịu lực cản của nước, lớn hơn nhiều so với lực cản của không khí khi đi trên bờ.',
    },
  ],
  takeaways: [
    'Các vật chuyển động trong nước chịu tác dụng của lực cản của nước, ngược chiều chuyển động.',
    'Lực cản của nước lớn hơn nhiều so với lực cản của không khí.',
    'Diện tích mặt cản càng lớn thì lực cản của nước càng lớn; vật hình thuôn chịu lực cản nhỏ.',
    'Cá, tàu thuyền có hình dạng thuôn để giảm lực cản; mái chèo bản rộng tận dụng lực cản để đẩy thuyền đi.',
  ],
};
