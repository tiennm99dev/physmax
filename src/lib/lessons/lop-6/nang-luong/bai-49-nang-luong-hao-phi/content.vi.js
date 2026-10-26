/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Khi năng lượng chuyển hoá, chỉ một phần là năng lượng có ích, phần còn lại là năng lượng hao phí, thường ở dạng nhiệt; năng lượng toàn phần bằng năng lượng có ích cộng năng lượng hao phí; có thể giảm hao phí để tiết kiệm năng lượng.',
  intro:
    'Chạm tay gần một bóng đèn sợi đốt đang sáng, em thấy nóng rát; còn bóng đèn LED sáng như vậy lại chỉ hơi ấm. Ta bật đèn để lấy ánh sáng, vậy hơi nóng kia từ đâu ra, và có cách nào để bớt phí năng lượng?',
  objectives: [
    'Nêu được năng lượng có ích và năng lượng hao phí trong một quá trình chuyển hoá năng lượng.',
    'Nêu được năng lượng hao phí luôn xuất hiện khi năng lượng chuyển từ dạng này sang dạng khác, thường ở dạng nhiệt.',
    'Tính được năng lượng hao phí khi biết năng lượng toàn phần và năng lượng có ích.',
    'Đề xuất được biện pháp giảm hao phí năng lượng trong các thiết bị quen thuộc.',
  ],
  sections: [
    {
      heading: 'Năng lượng có ích và năng lượng hao phí',
      blocks: [
        {
          type: 'p',
          text: 'Khi dùng một thiết bị, ta cung cấp cho nó một lượng năng lượng gọi là năng lượng toàn phần. Thiết bị chuyển hoá năng lượng này thành nhiều dạng khác nhau, nhưng chỉ một phần đúng với mục đích sử dụng.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Có ích và hao phí',
          text: 'Năng lượng có ích là phần năng lượng được dùng đúng mục đích. Năng lượng hao phí là phần năng lượng không mong muốn, bị tiêu hao vô ích. Năng lượng hao phí luôn xuất hiện khi năng lượng được chuyển từ dạng này sang dạng khác.',
        },
        {
          type: 'tex',
          tex: '\\text{Năng lượng toàn phần} = \\text{Năng lượng có ích} + \\text{Năng lượng hao phí}',
        },
        {
          type: 'table',
          caption: 'Năng lượng có ích và hao phí của một số thiết bị',
          head: ['Thiết bị', 'Năng lượng cung cấp', 'Có ích', 'Hao phí'],
          rows: [
            ['Bóng đèn', 'Điện năng', 'Quang năng', 'Nhiệt năng'],
            ['Quạt điện', 'Điện năng', 'Động năng của cánh quạt', 'Nhiệt năng, năng lượng âm'],
            [
              'Ấm điện',
              'Điện năng',
              'Nhiệt năng làm nóng nước',
              'Nhiệt năng làm nóng vỏ ấm, không khí',
            ],
            [
              'Xe máy',
              'Năng lượng hoá học của xăng',
              'Động năng của xe',
              'Nhiệt năng, năng lượng âm',
            ],
          ],
        },
      ],
    },
    {
      heading: 'Hao phí thường ở dạng nhiệt',
      blocks: [
        {
          type: 'p',
          text: 'Phần lớn năng lượng hao phí ở dạng nhiệt: dây tóc bóng đèn, động cơ quạt, động cơ xe máy đều nóng lên khi hoạt động. Ma sát giữa các bộ phận chuyển động cũng biến một phần động năng thành nhiệt năng.',
        },
        {
          type: 'p',
          text: 'Bóng đèn sợi đốt chỉ chuyển hoá khoảng $10\\%$ điện năng thành quang năng, còn khoảng $90\\%$ thành nhiệt năng hao phí. Bóng đèn LED chuyển hoá được nhiều điện năng thành quang năng hơn hẳn, nên cùng độ sáng mà tốn ít điện hơn và ít nóng hơn.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Hao phí có mất đi không?',
          text: 'Năng lượng hao phí không mất đi: nó vẫn tồn tại (chủ yếu làm nóng môi trường xung quanh), đúng với định luật bảo toàn năng lượng. Chỉ là ta không dùng được nó cho mục đích của mình.',
        },
      ],
    },
    {
      heading: 'Giảm hao phí năng lượng',
      blocks: [
        {
          type: 'list',
          items: [
            'Dùng thiết bị hiệu quả hơn: thay đèn sợi đốt bằng đèn LED; chọn thiết bị có nhãn tiết kiệm năng lượng.',
            'Giảm ma sát có hại: tra dầu mỡ vào xích xe đạp, trục quay của máy móc.',
            'Giữ nhiệt: đậy nắp nồi khi nấu, dùng ấm, phích có lớp cách nhiệt.',
            'Bảo dưỡng máy móc thường xuyên để máy chạy êm, ít nóng.',
            'Tắt thiết bị điện khi không sử dụng.',
          ],
        },
      ],
    },
  ],
  explore: {
    title: 'Biểu đồ dòng năng lượng của bóng đèn',
    instruction:
      'Mỗi biểu đồ cho thấy điện năng cung cấp (xanh) tách thành quang năng có ích (vàng) và nhiệt năng hao phí (đỏ); độ rộng mỗi dải tỉ lệ với năng lượng. Chọn "Cùng điện năng cung cấp" và kéo thanh trượt để so sánh độ sáng; chọn "Cùng độ sáng" để xem mỗi loại đèn cần bao nhiêu điện năng.',
  },
  examples: [
    {
      problem:
        'Một bóng đèn sợi đốt nhận $100\\ \\text{J}$ điện năng thì phát ra $10\\ \\text{J}$ quang năng. a) Năng lượng có ích là gì, bằng bao nhiêu? b) Tính năng lượng hao phí và cho biết nó ở dạng nào.',
      steps: [
        'a) Ta dùng đèn để chiếu sáng, nên năng lượng có ích là quang năng: $10\\ \\text{J}$.',
        'b) Năng lượng hao phí $=$ năng lượng toàn phần $-$ năng lượng có ích $= 100 - 10 = 90\\ \\text{J}$.',
        'Phần hao phí này làm nóng dây tóc và bóng đèn: nó ở dạng nhiệt năng.',
      ],
      answer: 'a) Quang năng, $10\\ \\text{J}$; b) $90\\ \\text{J}$, ở dạng nhiệt năng.',
    },
    {
      problem:
        'Để có cùng $10\\ \\text{J}$ quang năng, đèn sợi đốt cần $100\\ \\text{J}$ điện năng, đèn LED chỉ cần $25\\ \\text{J}$. Mỗi đèn hao phí bao nhiêu? Nên dùng đèn nào?',
      steps: [
        'Đèn sợi đốt hao phí: $100 - 10 = 90\\ \\text{J}$.',
        'Đèn LED hao phí: $25 - 10 = 15\\ \\text{J}$.',
        'Cùng độ sáng, đèn LED tốn ít điện năng hơn ($25\\ \\text{J}$ so với $100\\ \\text{J}$) và hao phí ít hơn.',
      ],
      answer:
        'Đèn sợi đốt hao phí $90\\ \\text{J}$, đèn LED hao phí $15\\ \\text{J}$; nên dùng đèn LED.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Khi dùng quạt điện để làm mát, năng lượng có ích là',
      options: [
        'động năng của cánh quạt và luồng gió',
        'nhiệt năng làm nóng động cơ',
        'năng lượng âm phát ra từ quạt',
        'quang năng',
      ],
      answer: 0,
      hints: ['Ta bật quạt để có gì?'],
      solution:
        'Ta dùng quạt để tạo gió, nên năng lượng có ích là động năng của cánh quạt và luồng gió. Nhiệt năng và năng lượng âm là hao phí.',
    },
    {
      type: 'number',
      prompt:
        'Một ấm điện nhận $2000\\ \\text{J}$ điện năng, trong đó $1700\\ \\text{J}$ dùng để làm nóng nước. Năng lượng hao phí là bao nhiêu jun?',
      answer: 300,
      unit: 'J',
      hints: ['Năng lượng hao phí = năng lượng toàn phần − năng lượng có ích.'],
      solution:
        'Năng lượng hao phí $= 2000 - 1700 = 300\\ \\text{J}$ (làm nóng vỏ ấm và không khí).',
    },
    {
      type: 'number',
      prompt:
        'Động cơ một chiếc xe máy nhận $1000\\ \\text{J}$ năng lượng từ xăng thì có $750\\ \\text{J}$ bị hao phí. Năng lượng có ích làm xe chuyển động là bao nhiêu jun?',
      answer: 250,
      unit: 'J',
      hints: ['Năng lượng toàn phần = có ích + hao phí.'],
      solution: 'Năng lượng có ích $= 1000 - 750 = 250\\ \\text{J}$.',
    },
    {
      type: 'choice',
      prompt: 'Năng lượng hao phí của các thiết bị thường xuất hiện chủ yếu dưới dạng nào?',
      options: ['Quang năng', 'Nhiệt năng', 'Thế năng hấp dẫn', 'Năng lượng hoá học'],
      answer: 1,
      hints: ['Khi chạy lâu, thân máy, động cơ, bóng đèn thường thế nào?'],
      solution: 'Năng lượng hao phí thường ở dạng nhiệt: các thiết bị nóng lên khi hoạt động.',
    },
    {
      type: 'multi',
      prompt: 'Những việc nào giúp giảm hao phí năng lượng?',
      options: [
        'Thay bóng đèn sợi đốt bằng bóng đèn LED',
        'Tra dầu mỡ vào xích xe đạp',
        'Đậy nắp nồi khi nấu canh',
        'Để tivi bật khi không có ai xem',
        'Mở cửa tủ lạnh thật lâu',
      ],
      answers: [0, 1, 2],
      hints: ['Việc nào làm năng lượng bị phí ít đi, việc nào làm phí thêm?'],
      solution:
        'Dùng đèn LED, tra dầu mỡ (giảm ma sát), đậy nắp nồi (giữ nhiệt) đều giảm hao phí. Bật tivi khi không xem và mở tủ lạnh lâu làm tốn thêm năng lượng.',
    },
    {
      type: 'choice',
      prompt: 'Vì sao bóng đèn LED tiết kiệm điện hơn bóng đèn sợi đốt có cùng độ sáng?',
      options: [
        'Vì đèn LED không cần điện năng',
        'Vì đèn LED tạo ra năng lượng mới',
        'Vì đèn LED chuyển hoá phần lớn hơn điện năng thành quang năng, hao phí nhiệt ít hơn',
        'Vì đèn LED nóng hơn đèn sợi đốt',
      ],
      answer: 2,
      hints: ['So sánh phần có ích và phần hao phí của hai loại đèn.'],
      solution:
        'Đèn LED chuyển hoá phần lớn hơn điện năng thành quang năng, nên cùng độ sáng nó cần ít điện năng hơn và toả ít nhiệt hơn. Không đèn nào tự tạo ra năng lượng.',
    },
    {
      type: 'choice',
      prompt: 'Nhận định nào đúng về năng lượng hao phí?',
      options: [
        'Nó biến mất hoàn toàn',
        'Nó chỉ xuất hiện ở thiết bị bị hỏng',
        'Có thể chế tạo thiết bị không có năng lượng hao phí',
        'Nó không mất đi mà chuyển thành dạng năng lượng ta không dùng được, chủ yếu là nhiệt',
      ],
      answer: 3,
      hints: [
        'Nhớ định luật bảo toàn năng lượng.',
        'Hao phí luôn xuất hiện khi năng lượng chuyển hoá.',
      ],
      solution:
        'Năng lượng hao phí không mất đi, nó chuyển thành dạng ta không dùng được (chủ yếu là nhiệt). Nó luôn xuất hiện khi năng lượng chuyển hoá, nên ta chỉ giảm được chứ không loại bỏ hết.',
    },
    {
      type: 'number',
      prompt:
        'Mỗi giây, một bóng đèn LED nhận $20\\ \\text{J}$ điện năng và phát ra $8\\ \\text{J}$ quang năng. Mỗi giây đèn hao phí bao nhiêu jun dưới dạng nhiệt?',
      answer: 12,
      unit: 'J',
      hints: ['Lấy điện năng nhận vào trừ đi quang năng phát ra.'],
      solution: 'Hao phí $= 20 - 8 = 12\\ \\text{J}$ mỗi giây.',
    },
  ],
  takeaways: [
    'Năng lượng có ích là phần dùng đúng mục đích; năng lượng hao phí là phần tiêu hao vô ích.',
    'Năng lượng toàn phần = năng lượng có ích + năng lượng hao phí.',
    'Hao phí luôn xuất hiện khi năng lượng chuyển hoá và thường ở dạng nhiệt.',
    'Giảm hao phí: dùng thiết bị hiệu quả (đèn LED), giảm ma sát, giữ nhiệt, bảo dưỡng máy, tắt thiết bị khi không dùng.',
  ],
};
