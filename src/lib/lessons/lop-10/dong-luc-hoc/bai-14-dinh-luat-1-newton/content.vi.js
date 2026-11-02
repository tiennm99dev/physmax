/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Định luật 1 Newton: khi hợp lực bằng không, vật đứng yên tiếp tục đứng yên, vật đang chuyển động tiếp tục chuyển động thẳng đều; quán tính và khối lượng là số đo mức quán tính.',
  intro:
    'Đẩy một chiếc xe rồi buông tay, xe chạy chậm dần rồi dừng. Phải chăng muốn vật chuyển động thì phải luôn có lực đẩy? Suốt gần hai nghìn năm, nhiều người tin như vậy, cho đến khi Galilei đặt lại câu hỏi: nếu không có gì cản, xe sẽ dừng lại hay chạy mãi?',
  objectives: [
    'Nêu được ý tưởng thí nghiệm của Galilei về mối liên hệ giữa lực và chuyển động.',
    'Phát biểu được định luật 1 Newton.',
    'Nêu được quán tính là gì và giải thích được một số hiện tượng thực tế.',
    'Nêu được khối lượng là số đo mức quán tính của vật.',
  ],
  sections: [
    {
      heading: 'Lực và chuyển động',
      blocks: [
        {
          type: 'p',
          text: 'Aristotle cho rằng lực là nguyên nhân của chuyển động: không còn lực thì vật dừng lại. Galilei đã kiểm tra quan niệm này bằng thí nghiệm với máng nghiêng.',
        },
        {
          type: 'list',
          items: [
            'Thả hòn bi lăn xuống một máng nghiêng, bi lăn lên máng nghiêng đối diện đến gần độ cao ban đầu.',
            'Giảm độ nghiêng của máng đối diện, bi lăn được đoạn đường dài hơn để lên gần độ cao đó.',
            'Máng càng nhẵn, bi càng lên gần độ cao ban đầu; phần thiếu hụt là do ma sát.',
            'Nếu đặt máng đối diện nằm ngang và không có ma sát, bi không thể đạt lại độ cao ban đầu nên sẽ lăn mãi với vận tốc không đổi.',
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Kết luận của Galilei',
          text: 'Lực không phải là nguyên nhân duy trì chuyển động. Xe dừng lại là vì có lực cản; lực là nguyên nhân làm thay đổi vận tốc của vật.',
        },
      ],
    },
    {
      heading: 'Định luật 1 Newton',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Định luật 1 Newton',
          text: 'Nếu một vật không chịu tác dụng của lực nào hoặc chịu tác dụng của các lực có hợp lực bằng không, thì vật đang đứng yên sẽ tiếp tục đứng yên, vật đang chuyển động sẽ tiếp tục chuyển động thẳng đều.',
        },
        {
          type: 'p',
          text: 'Trong thực tế khó có vật nào hoàn toàn không chịu lực, nhưng rất nhiều vật chịu các lực cân bằng. Ô tô chạy thẳng đều trên đường ngang có lực kéo bằng lực cản và trọng lực cân bằng với phản lực của mặt đường, nên $\\vec{F} = \\vec{0}$ và vận tốc không đổi.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Dễ nhầm',
          text: 'Hợp lực bằng không không có nghĩa là vật đứng yên. Vật có thể đang chuyển động thẳng đều với vận tốc lớn.',
        },
      ],
    },
    {
      heading: 'Quán tính',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Quán tính',
          text: 'Quán tính là tính chất của mọi vật có xu hướng bảo toàn vận tốc cả về hướng và độ lớn, tức là bảo toàn trạng thái đứng yên hay chuyển động của vật.',
        },
        {
          type: 'p',
          text: 'Vì vậy định luật 1 Newton còn được gọi là định luật quán tính, và chuyển động thẳng đều được gọi là chuyển động theo quán tính. Quán tính giải thích nhiều hiện tượng quen thuộc:',
        },
        {
          type: 'list',
          items: [
            'Xe buýt phanh gấp, hành khách lao về phía trước; xe tăng tốc đột ngột, hành khách ngả về phía sau.',
            'Xe rẽ gấp sang trái, người trên xe nghiêng sang phải.',
            'Giũ mạnh chiếc áo rồi dừng tay đột ngột, bụi tiếp tục chuyển động và văng ra khỏi áo.',
            'Gõ cán búa xuống nền, cán dừng lại còn đầu búa tiếp tục đi xuống và cắm chặt vào cán.',
          ],
        },
      ],
    },
    {
      heading: 'Khối lượng là số đo mức quán tính',
      blocks: [
        {
          type: 'p',
          text: 'Mọi vật đều có quán tính, nhưng mức quán tính của các vật khác nhau: cùng một lực, chiếc xe nặng khó thay đổi vận tốc hơn chiếc xe nhẹ. Tàu hoả đầy hàng phải phanh từ rất xa ga mới dừng kịp, còn xe đạp dừng lại ngay.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Khối lượng',
          text: 'Khối lượng là đại lượng đặc trưng cho mức quán tính của vật. Vật có khối lượng càng lớn thì mức quán tính càng lớn, càng khó thay đổi vận tốc.',
        },
        { type: 'widget', name: 'khoi-luong' },
      ],
    },
  ],
  explore: {
    title: 'Xe trên mặt ngày càng nhẵn',
    instruction:
      'Thả xe lần lượt trên các mặt từ cát đến không ma sát và ghi lại quãng đường. Ma sát giảm dần thì xe đi xa dần; khi không còn ma sát, xe chuyển động thẳng đều mãi cho đến khi em bấm dừng quan sát.',
  },
  examples: [
    {
      problem:
        'Một ô tô chạy thẳng đều trên đường nằm ngang với vận tốc $54$ km/h, lực kéo của động cơ là $1\\,500$ N. Tìm tổng lực cản tác dụng lên xe và quãng đường xe đi được trong $10$ s.',
      steps: [
        'Xe chuyển động thẳng đều nên theo định luật 1 Newton hợp lực bằng không.',
        'Theo phương ngang, lực kéo và lực cản cân bằng: $F_c = F_k = 1\\,500$ N.',
        'Đổi $54$ km/h $= 15$ m/s. Quãng đường: $s = vt = 15 \\cdot 10 = 150$ m.',
      ],
      answer: 'Lực cản $1\\,500$ N, ngược chiều chuyển động; quãng đường $150$ m.',
    },
    {
      problem:
        'Xe buýt đang chạy đều thì phanh gấp, hành khách đứng trên xe bị lao về phía trước. Giải thích hiện tượng.',
      steps: [
        'Trước khi phanh, hành khách chuyển động cùng vận tốc với xe.',
        'Khi phanh, lực từ sàn xe làm chân hành khách chậm lại cùng xe.',
        'Phần trên của cơ thể chưa chịu lực đáng kể, do quán tính nên vẫn giữ vận tốc cũ.',
      ],
      answer:
        'Do quán tính, thân trên tiếp tục chuyển động về phía trước trong khi chân đã chậm lại.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Một vật đang chuyển động thì hợp lực tác dụng lên nó đột ngột bằng không. Vật sẽ',
      options: [
        'dừng lại ngay.',
        'chuyển động chậm dần rồi dừng lại.',
        'chuyển động thẳng đều với vận tốc lúc đó.',
        'chuyển động nhanh dần.',
      ],
      answer: 2,
      hints: ['Nhớ lại nội dung định luật 1 Newton.'],
      solution:
        'Theo định luật 1 Newton, vật đang chuyển động mà hợp lực bằng không thì tiếp tục chuyển động thẳng đều.',
    },
    {
      type: 'number',
      prompt:
        'Một ô tô chạy thẳng đều trên đường ngang với lực kéo $2\\,400$ N. Tính độ lớn tổng lực cản tác dụng lên xe.',
      answer: 2400,
      unit: 'N',
      hints: ['Chuyển động thẳng đều thì hợp lực bằng bao nhiêu?'],
      solution: 'Xe chuyển động thẳng đều nên hợp lực bằng $0$, do đó $F_c = F_k = 2\\,400$ N.',
    },
    {
      type: 'number',
      prompt:
        'Một vật trượt thẳng đều trên sàn ngang khi được kéo bằng lực $12$ N theo phương ngang. Tính độ lớn lực ma sát.',
      answer: 12,
      unit: 'N',
      hints: ['Theo phương ngang chỉ có lực kéo và lực ma sát.'],
      solution: 'Vật chuyển động thẳng đều nên lực kéo và lực ma sát cân bằng: $F_{ms} = 12$ N.',
    },
    {
      type: 'number',
      prompt:
        'Một đoàn tàu đang chạy với vận tốc $72$ km/h thì hợp lực tác dụng lên tàu bằng không. Tính quãng đường tàu đi được trong $30$ s tiếp theo.',
      answer: 600,
      unit: 'm',
      hints: ['Đổi vận tốc ra m/s.', 'Chuyển động thẳng đều: $s = vt$.'],
      solution: '$72$ km/h $= 20$ m/s, nên $s = 20 \\cdot 30 = 600$ m.',
    },
    {
      type: 'choice',
      prompt: 'Hiện tượng nào sau đây không phải do quán tính?',
      options: [
        'Giũ mạnh áo để bụi văng ra.',
        'Hành khách ngả về phía sau khi xe tăng tốc đột ngột.',
        'Quả táo rụng rơi xuống đất.',
        'Tra đầu búa vào cán bằng cách gõ cán xuống nền.',
      ],
      answer: 2,
      hints: [
        'Hiện tượng nào có vận tốc thay đổi vì một lực, chứ không phải vật đang giữ vận tốc cũ?',
      ],
      solution:
        'Quả táo rơi vì chịu tác dụng của trọng lực. Các hiện tượng còn lại đều do vật giữ nguyên vận tốc cũ.',
    },
    {
      type: 'choice',
      prompt:
        'Xe đang đi thẳng thì rẽ gấp sang phải. Người ngồi trên xe có xu hướng nghiêng về phía nào?',
      options: ['Bên phải.', 'Bên trái.', 'Phía trước.', 'Không nghiêng.'],
      answer: 1,
      hints: ['Người vẫn muốn giữ hướng cũ, trong khi xe đổi hướng về bên phải.'],
      solution:
        'Do quán tính người giữ hướng chuyển động cũ, còn xe chạy sang phải, nên người nghiêng sang trái so với xe.',
    },
    {
      type: 'choice',
      prompt:
        'Một xe tải $5$ tấn và một xe con $1$ tấn cùng chạy với một vận tốc. Muốn dừng trong cùng thời gian, xe nào cần lực hãm lớn hơn?',
      options: [
        'Xe con, vì nhẹ hơn nên dễ bị ảnh hưởng hơn.',
        'Xe tải, vì khối lượng lớn hơn nên mức quán tính lớn hơn.',
        'Hai xe như nhau, vì có cùng vận tốc.',
      ],
      answer: 1,
      hints: ['Khối lượng đặc trưng cho điều gì của vật?'],
      solution:
        'Khối lượng càng lớn thì mức quán tính càng lớn, vận tốc càng khó thay đổi, nên xe tải cần lực hãm lớn hơn.',
    },
    {
      type: 'multi',
      prompt: 'Chọn các phát biểu đúng.',
      options: [
        'Lực là nguyên nhân làm thay đổi vận tốc của vật.',
        'Muốn vật chuyển động thẳng đều thì phải có hợp lực khác không.',
        'Mọi vật đều có quán tính.',
        'Hợp lực bằng không thì vật luôn đứng yên.',
      ],
      answers: [0, 2],
      hints: ['Vật chuyển động thẳng đều chịu hợp lực bằng bao nhiêu?'],
      solution:
        'Lực làm thay đổi vận tốc, và mọi vật đều có quán tính. Chuyển động thẳng đều có hợp lực bằng không, nên hai phát biểu còn lại sai.',
    },
    {
      type: 'text',
      prompt: 'Tính chất của mọi vật có xu hướng bảo toàn vận tốc cả về hướng và độ lớn gọi là gì?',
      accept: ['quán tính', 'tính quán tính'],
      hints: ['Định luật 1 Newton còn có tên là định luật ... (điền từ này).'],
      solution: 'Đó là quán tính.',
    },
  ],
  takeaways: [
    'Lực không duy trì chuyển động; lực làm thay đổi vận tốc của vật.',
    'Hợp lực bằng không: vật đứng yên tiếp tục đứng yên, vật đang chuyển động tiếp tục chuyển động thẳng đều.',
    'Quán tính là xu hướng bảo toàn vận tốc cả về hướng và độ lớn của mọi vật.',
    'Khối lượng đặc trưng cho mức quán tính: khối lượng càng lớn, vận tốc càng khó thay đổi.',
  ],
};
