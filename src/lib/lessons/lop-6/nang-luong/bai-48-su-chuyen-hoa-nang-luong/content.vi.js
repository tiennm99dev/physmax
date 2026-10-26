/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Năng lượng có thể chuyển hoá từ dạng này sang dạng khác; định luật bảo toàn năng lượng: năng lượng không tự sinh ra hoặc tự mất đi, chỉ chuyển từ dạng này sang dạng khác hoặc truyền từ vật này sang vật khác.',
  intro:
    'Bật công tắc, chiếc quạt quay vù vù và hơi nóng lên; thả quả bóng từ trên cao, quả bóng rơi ngày càng nhanh. Năng lượng không biến mất mà đổi sang dạng khác. Ta sẽ tìm hiểu năng lượng chuyển hoá như thế nào và vì sao tổng năng lượng luôn được bảo toàn.',
  objectives: [
    'Lấy được ví dụ về sự chuyển hoá năng lượng từ dạng này sang dạng khác.',
    'Phát biểu được định luật bảo toàn năng lượng.',
    'Vẽ và đọc được sơ đồ chuyển hoá năng lượng của một số thiết bị, hiện tượng đơn giản.',
  ],
  sections: [
    {
      heading: 'Sự chuyển hoá năng lượng',
      blocks: [
        {
          type: 'p',
          text: 'Năng lượng có thể chuyển hoá từ dạng này sang dạng khác. Khi quả bóng rơi từ trên cao xuống, độ cao giảm, tốc độ tăng: thế năng hấp dẫn chuyển hoá thành động năng. Khi ném quả bóng lên cao, động năng lại chuyển hoá thành thế năng hấp dẫn.',
        },
        {
          type: 'table',
          caption: 'Một số ví dụ về sự chuyển hoá năng lượng',
          head: ['Thiết bị, hiện tượng', 'Năng lượng ban đầu', 'Chuyển hoá thành'],
          rows: [
            ['Quạt điện', 'Điện năng', 'Động năng (chủ yếu), nhiệt năng, năng lượng âm'],
            ['Bóng đèn điện', 'Điện năng', 'Quang năng, nhiệt năng'],
            ['Que diêm bị quẹt', 'Năng lượng hoá học', 'Nhiệt năng, quang năng'],
            ['Xoa hai bàn tay vào nhau', 'Động năng', 'Nhiệt năng'],
            ['Nước từ thác đổ xuống', 'Thế năng hấp dẫn', 'Động năng'],
            ['Pin Mặt Trời', 'Quang năng', 'Điện năng'],
          ],
        },
        { type: 'widget', name: 'quat-dien' },
      ],
    },
    {
      heading: 'Định luật bảo toàn năng lượng',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Định luật bảo toàn năng lượng',
          text: 'Năng lượng không tự sinh ra hoặc tự mất đi, nó chỉ chuyển từ dạng này sang dạng khác, hoặc truyền từ vật này sang vật khác.',
        },
        {
          type: 'p',
          text: 'Với con lắc dao động, khi quả nặng đi xuống, thế năng hấp dẫn chuyển hoá thành động năng; khi đi lên, động năng chuyển hoá ngược lại thành thế năng. Nếu bỏ qua lực cản, tổng động năng và thế năng luôn không đổi. Thực tế, lực cản của không khí làm một phần năng lượng chuyển hoá thành nhiệt năng, nên con lắc lên thấp dần rồi dừng lại; tổng năng lượng (kể cả nhiệt năng) vẫn không đổi.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Áp dụng',
          text: 'Nếu biết tổng năng lượng ban đầu và một số phần đã chuyển hoá, ta tính được phần còn lại: tổng các phần năng lượng sau khi chuyển hoá luôn bằng năng lượng ban đầu.',
        },
      ],
    },
    {
      heading: 'Sơ đồ chuyển hoá năng lượng',
      blocks: [
        {
          type: 'p',
          text: 'Để mô tả sự chuyển hoá năng lượng, ta vẽ sơ đồ: năng lượng ban đầu viết bên trái, các dạng năng lượng nhận được viết bên phải, nối bằng mũi tên. Ví dụ với đèn pin:',
        },
        {
          type: 'tex',
          tex: '\\text{Hoá năng (pin)} \\rightarrow \\text{Điện năng} \\rightarrow \\text{Quang năng} + \\text{Nhiệt năng}',
        },
        {
          type: 'p',
          text: 'Với quạt điện, phần lớn điện năng chuyển hoá thành động năng của cánh quạt và luồng gió, một phần thành nhiệt năng làm động cơ nóng lên và năng lượng âm (tiếng ù).',
        },
        {
          type: 'tex',
          tex: '\\text{Điện năng} \\rightarrow \\text{Động năng} + \\text{Nhiệt năng} + \\text{Năng lượng âm}',
        },
      ],
    },
  ],
  explore: {
    title: 'Con lắc và thanh năng lượng',
    instruction:
      'Chọn góc kéo lệch ban đầu bằng thanh trượt (hoặc phím mũi tên), rồi nhấn "Thả". Theo dõi các thanh năng lượng khi quả nặng đi xuống và đi lên: phần nào tăng, phần nào giảm? Tổng có thay đổi không? Bật "Lực cản của không khí: Có" và thả lại để thấy năng lượng chuyển dần thành nhiệt năng.',
  },
  examples: [
    {
      problem:
        'Một con lắc được kéo lệch rồi thả ra. Ở vị trí cao nhất, quả nặng có thế năng hấp dẫn $2{,}5\\ \\text{J}$ và đứng yên trong chốc lát. Bỏ qua lực cản, lấy vị trí thấp nhất làm mốc thế năng. Tính động năng của quả nặng ở vị trí thấp nhất.',
      steps: [
        'Ở vị trí cao nhất, quả nặng đứng yên nên động năng bằng $0$; tổng năng lượng là $2{,}5\\ \\text{J}$.',
        'Ở vị trí thấp nhất, thế năng bằng $0$ (mốc thế năng).',
        'Bỏ qua lực cản, năng lượng được bảo toàn: toàn bộ thế năng chuyển hoá thành động năng, nên động năng là $2{,}5\\ \\text{J}$.',
      ],
      answer: 'Động năng ở vị trí thấp nhất là $2{,}5\\ \\text{J}$.',
    },
    {
      problem:
        'Mỗi giây, một chiếc quạt nhận $60\\ \\text{J}$ điện năng, trong đó $42\\ \\text{J}$ chuyển hoá thành động năng của cánh quạt và gió, $3\\ \\text{J}$ thành năng lượng âm. Phần còn lại chuyển hoá thành dạng nào và bằng bao nhiêu?',
      steps: [
        'Phần còn lại làm động cơ quạt nóng lên: đó là nhiệt năng.',
        'Theo định luật bảo toàn năng lượng: $60 = 42 + 3 + Q$.',
        '$Q = 60 - 42 - 3 = 15\\ \\text{J}$.',
      ],
      answer: 'Nhiệt năng, $15\\ \\text{J}$ mỗi giây.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Khi xoa hai bàn tay vào nhau, tay nóng lên. Năng lượng đã chuyển hoá thế nào?',
      options: [
        'Nhiệt năng chuyển hoá thành động năng',
        'Quang năng chuyển hoá thành nhiệt năng',
        'Điện năng chuyển hoá thành nhiệt năng',
        'Động năng chuyển hoá thành nhiệt năng',
      ],
      answer: 3,
      hints: ['Hai bàn tay chuyển động cọ xát vào nhau, rồi nóng lên.'],
      solution:
        'Hai bàn tay chuyển động (có động năng), cọ xát làm tay nóng lên: động năng chuyển hoá thành nhiệt năng.',
    },
    {
      type: 'choice',
      prompt: 'Phát biểu nào đúng với định luật bảo toàn năng lượng?',
      options: [
        'Năng lượng không tự sinh ra hoặc tự mất đi, nó chỉ chuyển từ dạng này sang dạng khác hoặc truyền từ vật này sang vật khác',
        'Năng lượng có thể tự sinh ra khi cần',
        'Năng lượng mất đi sau khi được sử dụng',
        'Năng lượng chỉ truyền được từ vật này sang vật khác, không chuyển hoá được',
      ],
      answer: 0,
      hints: ['Định luật nói năng lượng không tự sinh ra, không tự mất đi.'],
      solution:
        'Định luật bảo toàn năng lượng: năng lượng không tự sinh ra hoặc tự mất đi, nó chỉ chuyển từ dạng này sang dạng khác, hoặc truyền từ vật này sang vật khác.',
    },
    {
      type: 'choice',
      prompt: 'Nước từ trên thác cao đổ xuống. Năng lượng chủ yếu đã chuyển hoá thế nào?',
      options: [
        'Động năng chuyển hoá thành thế năng hấp dẫn',
        'Thế năng hấp dẫn chuyển hoá thành động năng',
        'Nhiệt năng chuyển hoá thành động năng',
        'Năng lượng âm chuyển hoá thành thế năng',
      ],
      answer: 1,
      hints: ['Nước ở trên cao rơi xuống, càng xuống càng nhanh.'],
      solution:
        'Nước mất dần độ cao và chảy ngày càng nhanh: thế năng hấp dẫn chuyển hoá thành động năng.',
    },
    {
      type: 'number',
      prompt:
        'Một quả bóng được thả rơi, bỏ qua lực cản. Lúc thả, bóng có thế năng hấp dẫn $10\\ \\text{J}$ và chưa chuyển động. Tại một điểm trong lúc rơi, thế năng của bóng còn $4\\ \\text{J}$. Động năng của bóng tại điểm đó là bao nhiêu jun?',
      answer: 6,
      unit: 'J',
      hints: [
        'Bỏ qua lực cản, tổng động năng và thế năng luôn bằng năng lượng ban đầu.',
        'Năng lượng ban đầu là $10\\ \\text{J}$.',
      ],
      solution:
        'Năng lượng ban đầu: $10 + 0 = 10\\ \\text{J}$. Tại điểm đó: động năng $= 10 - 4 = 6\\ \\text{J}$.',
    },
    {
      type: 'number',
      prompt:
        'Mỗi giây, một máy sấy tóc nhận $1200\\ \\text{J}$ điện năng. Trong đó $1000\\ \\text{J}$ chuyển hoá thành nhiệt năng, $20\\ \\text{J}$ thành năng lượng âm, phần còn lại thành động năng của quạt gió. Động năng mỗi giây là bao nhiêu jun?',
      answer: 180,
      unit: 'J',
      hints: ['Tổng các phần sau khi chuyển hoá bằng điện năng nhận vào.'],
      solution: 'Động năng $= 1200 - 1000 - 20 = 180\\ \\text{J}$ mỗi giây.',
    },
    {
      type: 'order',
      prompt: 'Sắp xếp sơ đồ chuyển hoá năng lượng của một chiếc đèn pin đang sáng.',
      items: ['Điện năng', 'Quang năng và nhiệt năng', 'Năng lượng hoá học trong pin'],
      answer: [2, 0, 1],
      hints: [
        'Năng lượng bắt đầu từ chiếc pin.',
        'Pin tạo ra dòng điện, dòng điện làm bóng đèn sáng.',
      ],
      solution: 'Năng lượng hoá học trong pin → điện năng → quang năng và nhiệt năng.',
    },
    {
      type: 'choice',
      prompt:
        'Quả bóng cao su được thả rơi xuống sàn, sau mỗi lần nảy lên lại thấp hơn lần trước rồi nằm yên. Giải thích nào đúng?',
      options: [
        'Năng lượng của quả bóng đã tự mất đi',
        'Quả bóng nặng dần lên sau mỗi lần nảy',
        'Một phần năng lượng đã chuyển hoá thành nhiệt năng và năng lượng âm, không mất đi',
        'Thế năng tự sinh ra rồi tự mất đi',
      ],
      answer: 2,
      hints: ['Khi bóng đập vào sàn, em nghe thấy gì? Bóng và sàn có nóng lên một chút không?'],
      solution:
        'Mỗi lần va chạm, một phần năng lượng của bóng chuyển hoá thành nhiệt năng (bóng và sàn nóng lên chút ít) và năng lượng âm (tiếng bịch). Năng lượng không mất đi mà chuyển sang dạng khác, nên bóng nảy thấp dần.',
    },
    {
      type: 'multi',
      prompt: 'Khi quạt điện đang chạy, điện năng chuyển hoá thành những dạng năng lượng nào?',
      options: [
        'Động năng',
        'Nhiệt năng',
        'Năng lượng âm',
        'Năng lượng hoá học',
        'Thế năng đàn hồi',
      ],
      answers: [0, 1, 2],
      hints: ['Cánh quạt quay, động cơ nóng lên, quạt phát ra tiếng ù.'],
      solution:
        'Điện năng chuyển hoá thành động năng (cánh quạt quay, tạo gió), nhiệt năng (động cơ nóng lên) và năng lượng âm (tiếng ù).',
    },
  ],
  takeaways: [
    'Năng lượng có thể chuyển hoá từ dạng này sang dạng khác, ví dụ thế năng hấp dẫn thành động năng khi vật rơi.',
    'Định luật bảo toàn năng lượng: năng lượng không tự sinh ra hoặc tự mất đi, nó chỉ chuyển từ dạng này sang dạng khác, hoặc truyền từ vật này sang vật khác.',
    'Tổng các phần năng lượng sau khi chuyển hoá luôn bằng năng lượng ban đầu.',
    'Sơ đồ chuyển hoá năng lượng: năng lượng ban đầu → các dạng năng lượng nhận được.',
  ],
};
