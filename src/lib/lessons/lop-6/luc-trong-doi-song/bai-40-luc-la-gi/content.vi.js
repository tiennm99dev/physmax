/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Lực là sự đẩy hoặc kéo của vật này lên vật khác; lực có thể làm vật thay đổi tốc độ, đổi hướng chuyển động hoặc bị biến dạng; lực được chia thành lực tiếp xúc và lực không tiếp xúc.',
  intro:
    'Cầu thủ sút quả bóng đang nằm yên, thủ môn bắt dính quả bóng đang bay tới, em bóp méo quả bóng cao su trong tay, một thanh nam châm hút chiếc đinh từ xa. Tất cả đều là tác dụng của lực. Vậy lực là gì, và lực gây ra những thay đổi nào cho vật?',
  objectives: [
    'Lấy được ví dụ để chứng tỏ lực là sự đẩy hoặc sự kéo.',
    'Nêu được lực có thể làm vật thay đổi tốc độ, thay đổi hướng chuyển động hoặc bị biến dạng.',
    'Phân biệt được lực tiếp xúc và lực không tiếp xúc, lấy được ví dụ cho mỗi loại.',
  ],
  sections: [
    {
      heading: 'Lực là sự đẩy hoặc kéo',
      blocks: [
        {
          type: 'p',
          text: 'Tay em đẩy cánh cửa thì cửa mở ra; con bò kéo chiếc xe thì xe lăn bánh; chân cầu thủ đá vào quả bóng thì bóng bay đi. Trong mỗi trường hợp, một vật đẩy hoặc kéo một vật khác.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Lực',
          text: 'Tác dụng đẩy hoặc kéo của vật này lên vật khác được gọi là lực. Khi vật $A$ đẩy hoặc kéo vật $B$, ta nói vật $A$ tác dụng lực lên vật $B$.',
        },
        {
          type: 'table',
          caption: 'Vật gây ra lực và vật chịu tác dụng của lực',
          head: ['Hoạt động', 'Vật gây ra lực', 'Vật chịu tác dụng lực', 'Đẩy hay kéo'],
          rows: [
            ['Mở cửa tủ', 'Tay', 'Cánh cửa tủ', 'Kéo'],
            ['Đẩy xe hàng', 'Tay người', 'Xe hàng', 'Đẩy'],
            ['Kéo co', 'Mỗi đội', 'Sợi dây', 'Kéo'],
            ['Đá bóng', 'Chân cầu thủ', 'Quả bóng', 'Đẩy'],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Lực luôn có hai vật',
          text: 'Khi nói đến một lực, luôn phải chỉ ra được vật nào gây ra lực và vật nào chịu tác dụng của lực. Một vật không tự đẩy hay tự kéo chính nó.',
        },
      ],
    },
    {
      heading: 'Tác dụng của lực',
      blocks: [
        {
          type: 'p',
          text: 'Lực tác dụng lên một vật có thể làm thay đổi chuyển động của vật. Sự thay đổi chuyển động gồm:',
        },
        {
          type: 'list',
          items: [
            'Vật đang đứng yên bắt đầu chuyển động (cầu thủ sút quả bóng đang nằm yên).',
            'Vật đang chuyển động bị dừng lại (thủ môn bắt dính quả bóng).',
            'Vật chuyển động nhanh lên (đạp mạnh bàn đạp, xe đạp chạy nhanh hơn).',
            'Vật chuyển động chậm lại (bóp phanh, xe đạp chạy chậm dần).',
            'Vật đổi hướng chuyển động (cầu thủ đánh đầu làm quả bóng bay chệch hướng).',
          ],
        },
        {
          type: 'p',
          text: 'Lực tác dụng lên vật cũng có thể làm vật bị biến dạng, tức là thay đổi hình dạng: tay bóp quả bóng làm nó méo đi, tay kéo lò xo làm lò xo dãn ra, chân giẫm lên lon nhôm làm lon bẹp lại.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Kết luận',
          text: 'Lực tác dụng lên vật có thể làm thay đổi tốc độ, thay đổi hướng chuyển động của vật, làm vật bị biến dạng, hoặc đồng thời gây ra cả những tác dụng đó.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Khi không có lực',
          text: 'Nếu không có lực nào tác dụng thì vật đang đứng yên vẫn đứng yên, vật đang chuyển động không tự nhanh lên, chậm lại hay đổi hướng được.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Có thể có hai tác dụng cùng lúc',
          text: 'Khi cầu thủ sút bóng, quả bóng vừa bị méo đi trong khoảnh khắc chân chạm bóng, vừa bắt đầu bay đi. Lực đã đồng thời làm bóng biến dạng và làm thay đổi chuyển động của bóng.',
        },
      ],
    },
    {
      heading: 'Lực tiếp xúc và lực không tiếp xúc',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Lực tiếp xúc',
          text: 'Lực tiếp xúc xuất hiện khi vật (hoặc đối tượng) gây ra lực có sự tiếp xúc với vật (hoặc đối tượng) chịu tác dụng của lực. Ví dụ: tay đẩy cửa, chân đá bóng, dây kéo thùng hàng.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Lực không tiếp xúc',
          text: 'Lực không tiếp xúc xuất hiện khi vật (hoặc đối tượng) gây ra lực không có sự tiếp xúc với vật (hoặc đối tượng) chịu tác dụng của lực. Ví dụ: nam châm hút chiếc đinh sắt đặt gần nó, Trái Đất hút quả táo đang rơi.',
        },
        { type: 'widget', name: 'tiep-xuc' },
      ],
    },
  ],
  explore: {
    title: 'Sân chơi đẩy và kéo',
    instruction:
      'Chọn vật, chọn lúc đầu vật đứng yên hay đang lăn sang phải, rồi chọn tay đẩy hoặc kéo, hướng và độ mạnh của lực. Các chấm xám cho biết vị trí của vật trước khi có lực, các chấm màu là vị trí sau đó, cách nhau những khoảng thời gian bằng nhau: chấm càng xa nhau thì vật chạy càng nhanh. Hãy tìm cách làm quả bóng đang lăn chạy nhanh lên, chậm lại, dừng lại và đổi hướng; so sánh độ méo của quả bóng cao su và hòn bi sắt.',
  },
  examples: [
    {
      problem:
        'Trong mỗi hoạt động sau, lực là lực đẩy hay lực kéo, vật nào gây ra lực, vật nào chịu tác dụng của lực: a) Bạn Nam xách cặp sách lên; b) Gió thổi căng cánh buồm.',
      steps: [
        'a) Tay bạn Nam kéo cặp sách lên trên: vật gây ra lực là tay, vật chịu tác dụng lực là cặp sách, đây là lực kéo.',
        'b) Gió ép vào cánh buồm làm buồm căng ra: vật gây ra lực là gió (không khí chuyển động), vật chịu tác dụng lực là cánh buồm, đây là lực đẩy.',
      ],
      answer: 'a) Lực kéo của tay lên cặp; b) Lực đẩy của gió lên cánh buồm.',
    },
    {
      problem:
        'Nêu tác dụng của lực trong mỗi trường hợp: a) Thủ môn bắt dính quả bóng đang bay tới; b) Em dùng tay ép quả bóng bay; c) Cầu thủ đánh đầu làm quả bóng bay theo hướng khác.',
      steps: [
        'a) Quả bóng đang chuyển động bị dừng lại: lực làm thay đổi tốc độ của bóng.',
        'b) Quả bóng bay bị ép méo đi: lực làm vật biến dạng.',
        'c) Quả bóng bay theo hướng khác: lực làm thay đổi hướng chuyển động. Lúc đầu chạm bóng, bóng cũng bị méo một chút.',
      ],
      answer:
        'a) Làm vật dừng lại; b) Làm vật biến dạng; c) Làm vật đổi hướng chuyển động (kèm biến dạng).',
    },
    {
      problem:
        'Lực nào là lực tiếp xúc, lực nào là lực không tiếp xúc: a) Lực của tay kéo vali; b) Lực hút của Trái Đất lên chiếc lá đang rơi; c) Lực của nam châm hút viên bi sắt từ xa.',
      steps: [
        'a) Tay cầm vào tay kéo của vali: hai vật tiếp xúc nhau, đây là lực tiếp xúc.',
        'b) Chiếc lá đang rơi không chạm vào Trái Đất mà vẫn bị hút: lực không tiếp xúc.',
        'c) Nam châm chưa chạm vào viên bi mà vẫn hút được: lực không tiếp xúc.',
      ],
      answer: 'a) Lực tiếp xúc; b) và c) Lực không tiếp xúc.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Câu nào nói đúng về lực?',
      options: [
        'Lực là tác dụng đẩy hoặc kéo của vật này lên vật khác.',
        'Lực là tốc độ chuyển động của vật.',
        'Lực là khối lượng của vật.',
        'Lực chỉ xuất hiện khi vật đang chuyển động.',
      ],
      answer: 0,
      hints: ['Nghĩ đến những việc như mở cửa, kéo xe, đá bóng.'],
      solution:
        'Tác dụng đẩy hoặc kéo của vật này lên vật khác gọi là lực. Lực không phải tốc độ hay khối lượng, và vật đứng yên vẫn có thể chịu tác dụng của lực.',
    },
    {
      type: 'match',
      prompt: 'Ghép mỗi hoạt động với tác dụng chính của lực trong hoạt động đó.',
      left: [
        'Cầu thủ sút quả bóng đang nằm yên trên sân',
        'Bóp phanh khi xe đạp đang chạy',
        'Nặn cục đất sét thành hình con vật',
        'Gậy đánh bóng chày làm quả bóng bay ngược trở lại',
      ],
      right: [
        'Vật bị biến dạng',
        'Vật đổi hướng chuyển động',
        'Vật bắt đầu chuyển động',
        'Vật chuyển động chậm lại',
      ],
      pairs: [
        [0, 2],
        [1, 3],
        [2, 0],
        [3, 1],
      ],
      hints: ['Xem trước và sau khi có lực, vật thay đổi tốc độ, hướng hay hình dạng.'],
      solution:
        'Sút bóng đang nằm yên: bóng bắt đầu chuyển động. Bóp phanh: xe chậm lại. Nặn đất sét: đất sét biến dạng. Đánh bóng chày bay ngược lại: bóng đổi hướng chuyển động.',
    },
    {
      type: 'multi',
      prompt: 'Những lực nào dưới đây là lực không tiếp xúc?',
      options: [
        'Lực hút của nam châm lên chiếc ghim sắt đặt gần nó',
        'Lực của tay kéo dây gầu nước',
        'Lực hút của Trái Đất lên quả bóng đang rơi',
        'Lực của gió đẩy cánh diều',
        'Lực của chiếc lược nhựa đã cọ xát hút các mẩu giấy vụn',
      ],
      answers: [0, 2, 4],
      hints: [
        'Hỏi: vật gây ra lực có chạm vào vật chịu lực không?',
        'Gió là không khí chuyển động, nó chạm vào cánh diều.',
      ],
      solution:
        'Lực không tiếp xúc: nam châm hút ghim, Trái Đất hút quả bóng đang rơi, lược nhựa nhiễm điện hút mẩu giấy. Tay kéo dây gầu và gió đẩy cánh diều đều là lực tiếp xúc.',
    },
    {
      type: 'choice',
      prompt:
        'Một quả bóng đang lăn sang phải. Bạn Lan đẩy nhẹ vào quả bóng theo hướng ngược lại (sang trái). Điều gì có thể xảy ra?',
      options: [
        'Quả bóng lăn nhanh hơn.',
        'Quả bóng lăn chậm lại.',
        'Quả bóng vẫn lăn như cũ.',
        'Quả bóng bay lên cao.',
      ],
      answer: 1,
      hints: ['Lực ngược chiều chuyển động làm vật thay đổi tốc độ theo cách nào?'],
      solution:
        'Lực ngược chiều chuyển động làm quả bóng chậm lại; nếu lực đủ mạnh, bóng có thể dừng lại hoặc lăn ngược trở lại.',
    },
    {
      type: 'choice',
      prompt:
        'Trường hợp nào dưới đây lực vừa làm vật biến dạng vừa làm thay đổi chuyển động của vật?',
      options: [
        'Tay ép chặt một lò xo đặt trên bàn rồi giữ yên.',
        'Vợt đánh vào quả bóng tennis làm bóng bay đi.',
        'Nam châm hút chiếc đinh đang nằm yên trên tay.',
        'Ngồi lên đệm mút làm đệm lõm xuống.',
      ],
      answer: 1,
      hints: ['Tìm trường hợp vật vừa thay đổi hình dạng, vừa thay đổi tốc độ hoặc hướng.'],
      solution:
        'Khi vợt đánh vào bóng tennis, quả bóng bị méo đi (biến dạng) và bay đi theo hướng mới (thay đổi chuyển động). Ép lò xo và ngồi lên đệm chỉ làm biến dạng; vật không chuyển động.',
    },
    {
      type: 'order',
      prompt:
        'Một bạn thả quả bóng rơi xuống sàn và quả bóng nảy lên. Sắp xếp các giai đoạn theo đúng thứ tự xảy ra.',
      items: [
        'Sàn đẩy quả bóng, bóng bị méo đi và dừng lại trong khoảnh khắc',
        'Quả bóng rơi xuống ngày càng nhanh nhờ lực hút của Trái Đất',
        'Quả bóng chuyển động lên trên, chậm dần',
        'Bóng lấy lại hình dạng cũ và bật lên khỏi sàn',
      ],
      answer: [1, 0, 3, 2],
      hints: ['Bắt đầu từ lúc thả tay.', 'Bóng chạm sàn rồi mới nảy lên.'],
      solution:
        'Bóng rơi nhanh dần (lực hút của Trái Đất) → chạm sàn, bị méo và dừng lại trong khoảnh khắc (lực đẩy của sàn) → lấy lại hình dạng, bật lên → chuyển động lên chậm dần vì Trái Đất vẫn hút bóng.',
    },
    {
      type: 'text',
      prompt:
        'Khi em ngồi lên ghế, ghế chịu một lực đẩy xuống. Vật nào đã gây ra lực này? (ghi một từ hoặc cụm từ ngắn)',
      accept: [
        'em',
        'người',
        'người ngồi',
        'cơ thể em',
        'cơ thể',
        'người em',
        'bạn',
        'bản thân em',
      ],
      hints: ['Ghế là vật chịu tác dụng lực; ai đang ép lên ghế?'],
      solution:
        'Người ngồi (em) ép lên mặt ghế: vật gây ra lực là em, vật chịu tác dụng lực là chiếc ghế.',
    },
  ],
  takeaways: [
    'Tác dụng đẩy hoặc kéo của vật này lên vật khác gọi là lực.',
    'Lực có thể làm vật bắt đầu chuyển động, dừng lại, nhanh lên, chậm lại, đổi hướng chuyển động, hoặc làm vật biến dạng.',
    'Lực tiếp xúc: vật gây ra lực tiếp xúc với vật chịu lực. Lực không tiếp xúc: hai vật không tiếp xúc nhau (lực hút của nam châm, của Trái Đất).',
  ],
};
