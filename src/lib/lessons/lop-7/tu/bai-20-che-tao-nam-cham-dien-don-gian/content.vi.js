/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Ống dây có dòng điện chạy qua có từ trường giống thanh nam châm. Nam châm điện gồm ống dây dẫn có lõi sắt non: có dòng điện thì có từ trường, ngắt điện thì mất. Tăng dòng điện hoặc số vòng dây thì từ trường mạnh hơn; đổi chiều dòng điện thì đổi cực. Bài hướng dẫn tự chế tạo một nam châm điện đơn giản.',
  intro:
    'Ở bãi phế liệu, chiếc cần cẩu hạ một đĩa kim loại xuống đống sắt vụn, nhấc lên cả mảng sắt nặng, đưa sang xe tải rồi "buông tay" thả xuống. Đĩa ấy không phải nam châm vĩnh cửu: nó là nam châm điện, bật tắt được bằng một công tắc. Hôm nay em sẽ tự làm một chiếc như thế.',
  objectives: [
    'Nêu được ống dây có dòng điện chạy qua có từ trường, giống từ trường của thanh nam châm.',
    'Nêu được cấu tạo của nam châm điện và các cách làm thay đổi từ trường của nó.',
    'Chế tạo được nam châm điện đơn giản; làm thay đổi được từ trường của nó bằng cách thay đổi dòng điện.',
  ],
  sections: [
    {
      heading: 'Từ trường của ống dây có dòng điện chạy qua',
      blocks: [
        {
          type: 'p',
          text: 'Thí nghiệm: quấn dây dẫn có vỏ cách điện thành một ống dây, nối hai đầu ống dây với nguồn điện qua công tắc $K$. Đặt ống dây xuyên qua một tấm nhựa, rắc mạt sắt lên tấm nhựa, đóng công tắc rồi gõ nhẹ. Đặt hai kim nam châm ở hai đầu ống dây.',
        },
        {
          type: 'list',
          items: [
            'Khi đóng công tắc, mạt sắt sắp xếp thành từ phổ giống từ phổ của thanh nam châm; hai kim nam châm bị lệch.',
            'Khi ngắt công tắc, kim nam châm quay về hướng Bắc – Nam: không còn từ trường.',
            'Đổi chiều dòng điện (đổi hai cực nguồn điện), mỗi kim nam châm quay ngược lại: hai cực của ống dây đổi chỗ cho nhau.',
          ],
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Kết luận',
          text: 'Ống dây có dòng điện chạy qua có từ trường giống từ trường của thanh nam châm: hai đầu ống dây là hai cực từ. Từ trường này chỉ tồn tại khi có dòng điện; khi đổi chiều dòng điện thì các cực của ống dây cũng đổi.',
        },
      ],
    },
    {
      heading: 'Nam châm điện',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Nam châm điện',
          text: 'Nam châm điện gồm một ống dây dẫn có lõi sắt non. Khi có dòng điện chạy qua ống dây, lõi sắt non bị nhiễm từ và cả khối trở thành một nam châm. Khi ngắt dòng điện, lõi sắt non gần như mất hết từ tính.',
        },
        {
          type: 'table',
          caption: 'Các cách làm thay đổi từ trường của nam châm điện',
          head: ['Thay đổi', 'Kết quả'],
          rows: [
            ['Tăng cường độ dòng điện', 'Từ trường mạnh hơn, hút được nhiều vật hơn'],
            ['Tăng số vòng dây (cùng dòng điện)', 'Từ trường mạnh hơn'],
            ['Đặt lõi sắt non vào ống dây', 'Từ trường mạnh lên rất nhiều'],
            ['Đổi chiều dòng điện', 'Hai cực của nam châm điện đổi chỗ cho nhau'],
            ['Ngắt dòng điện', 'Mất từ trường, vật bị hút rơi ra'],
          ],
        },
        {
          type: 'p',
          text: 'Ưu điểm của nam châm điện so với nam châm vĩnh cửu: bật, tắt được từ trường bằng công tắc; làm từ trường mạnh lên hay yếu đi được; đổi cực được. Nam châm điện có trong cần cẩu điện nâng sắt thép, chuông điện, rơ-le, khóa cửa điện từ, loa điện.',
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Phải dùng lõi sắt non (sắt gần như nguyên chất). Nếu dùng lõi thép, sau khi ngắt điện lõi vẫn giữ từ tính, trở thành nam châm vĩnh cửu, nên không "buông" được vật.',
        },
      ],
    },
    {
      heading: 'Thực hành: chế tạo nam châm điện đơn giản',
      project: true,
      blocks: [
        {
          type: 'p',
          text: 'Mục tiêu: chế tạo một nam châm điện từ chiếc đinh sắt và dây đồng; tìm hiểu số ghim nó hút được thay đổi thế nào khi thay đổi số vòng dây, dòng điện, lõi sắt; xác định cực của nam châm điện bằng kim nam châm.',
        },
        { type: 'p', text: 'Dụng cụ:' },
        {
          type: 'list',
          items: [
            'Một chiếc đinh sắt to dài khoảng $10$ cm (làm lõi sắt non).',
            'Khoảng $2$ m dây đồng có vỏ cách điện (dây điện từ).',
            'Hai pin $1{,}5$ V có đế pin, một công tắc, các dây nối.',
            'Một hộp ghim giấy bằng thép, một kim nam châm (hoặc la bàn), băng dính, giấy nhám.',
          ],
        },
        { type: 'p', text: 'Các bước tiến hành:' },
        {
          type: 'list',
          ordered: true,
          items: [
            'Quấn $50$ vòng dây đồng sát nhau, theo cùng một chiều, quanh thân đinh; dùng băng dính giữ hai đầu cuộn dây. Dùng giấy nhám cạo sạch lớp cách điện ở hai đầu dây.',
            'Nối hai đầu cuộn dây với một pin qua công tắc. Đóng công tắc, đưa mũi đinh lại gần hộp ghim, nhấc lên và đếm số ghim hút được. Ngắt công tắc, quan sát các ghim.',
            'Quấn thêm cho đủ $100$ vòng (cùng chiều cũ), lặp lại bước 2.',
            'Giữ $100$ vòng, dùng hai pin mắc nối tiếp, lặp lại bước 2.',
            'Rút đinh ra khỏi cuộn dây (ống dây không có lõi), lặp lại bước 2.',
            'Đặt kim nam châm gần mũi đinh, đóng công tắc, xem cực nào của kim bị hút vào mũi đinh để biết mũi đinh là cực gì. Đổi hai đầu dây nối vào pin (đổi chiều dòng điện) và quan sát lại.',
          ],
        },
        {
          type: 'table',
          caption: 'Bảng ghi kết quả (mẫu)',
          head: ['Lần đo', 'Số vòng dây', 'Số pin', 'Lõi', 'Số ghim hút được'],
          rows: [
            ['1', '50', '1', 'Đinh sắt', '...'],
            ['2', '100', '1', 'Đinh sắt', '...'],
            ['3', '100', '2', 'Đinh sắt', '...'],
            ['4', '100', '2', 'Không có lõi', '...'],
          ],
        },
        {
          type: 'p',
          text: 'Báo cáo: điền bảng kết quả; trả lời: số ghim thay đổi thế nào khi tăng số vòng dây, tăng số pin, bỏ lõi đinh? Khi ngắt điện các ghim ra sao? Mũi đinh là cực gì trước và sau khi đổi chiều dòng điện? Rút ra kết luận về các cách làm thay đổi từ trường của nam châm điện.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'An toàn',
          text: 'Chỉ dùng pin, không bao giờ nối với ổ điện $220$ V. Cuộn dây nối thẳng vào pin có dòng điện lớn, dây và pin nóng lên rất nhanh: chỉ đóng công tắc trong vài giây mỗi lần đo rồi ngắt ngay.',
        },
      ],
    },
  ],
  explore: {
    title: 'Nam châm điện ảo',
    instruction:
      'Đóng công tắc $K$ rồi chỉnh số vòng dây, cường độ dòng điện và lõi sắt; đếm số ghim treo ở mũi lõi. Bấm "Đổi chiều dòng điện" và xem kim nam châm bên trái quay thế nào. Thử mở công tắc. Cuối cùng, làm thử thách: chỉnh để hút đúng số ghim yêu cầu. (Số ghim trong mô hình chỉ để so sánh, không phải số đo thật.)',
  },
  examples: [
    {
      problem:
        'Một nhóm học sinh đo được: đinh sắt quấn $50$ vòng, dùng $1$ pin hút được $4$ ghim; quấn $100$ vòng, $1$ pin hút được $9$ ghim; $100$ vòng, $2$ pin hút được $17$ ghim; rút đinh ra (vẫn $100$ vòng, $2$ pin) chỉ hút được $1$ ghim. Nhóm rút ra kết luận gì?',
      steps: [
        'So sánh lần 1 và lần 2 (cùng số pin, chỉ khác số vòng): số vòng tăng thì số ghim tăng, từ trường mạnh hơn.',
        'So sánh lần 2 và lần 3 (cùng số vòng, thêm pin làm dòng điện lớn hơn): dòng điện tăng thì từ trường mạnh hơn.',
        'So sánh lần 3 và lần 4 (chỉ khác lõi): bỏ lõi sắt non thì từ trường yếu đi rất nhiều.',
      ],
      answer:
        'Từ trường của nam châm điện mạnh hơn khi tăng số vòng dây, tăng cường độ dòng điện; lõi sắt non làm từ trường mạnh lên rất nhiều.',
    },
    {
      problem:
        'Đóng công tắc, đặt kim nam châm gần mũi đinh của nam châm điện thì thấy cực Nam của kim bị hút vào mũi đinh. Mũi đinh là cực gì? Đổi hai đầu dây nối vào pin thì kim nam châm thế nào?',
      steps: [
        'Cực Nam của kim bị hút nên mũi đinh khác tên với nó: mũi đinh là cực Bắc.',
        'Đổi hai đầu dây nối vào pin là đổi chiều dòng điện, nên hai cực của nam châm điện đổi chỗ: mũi đinh thành cực Nam.',
        'Khi đó mũi đinh đẩy cực Nam và hút cực Bắc của kim: kim quay ngược lại, cực Bắc của kim hướng vào mũi đinh.',
      ],
      answer:
        'Mũi đinh là cực Bắc; sau khi đổi chiều dòng điện, mũi đinh thành cực Nam và kim nam châm quay ngược lại.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Cấu tạo của một nam châm điện gồm',
      options: [
        'một ống dây dẫn có dòng điện chạy qua, không có lõi.',
        'một ống dây dẫn có lõi sắt non, có dòng điện chạy qua.',
        'một thanh thép đã nhiễm từ.',
        'một thanh nam châm quấn dây đồng.',
      ],
      answer: 1,
      hints: ['Bộ phận nào làm từ trường mạnh lên rất nhiều mà ngắt điện lại mất từ tính?'],
      solution:
        'Nam châm điện gồm một ống dây dẫn có lõi sắt non; khi có dòng điện chạy qua ống dây, nó trở thành nam châm.',
    },
    {
      type: 'choice',
      prompt: 'Làm thế nào để biết ống dây đã trở thành nam châm điện?',
      options: [
        'Sờ thấy ống dây nóng lên.',
        'Đưa vật liệu từ (ghim sắt) hoặc kim nam châm lại gần: ống dây hút ghim, làm kim lệch.',
        'Nhìn thấy ống dây phát sáng.',
        'Ống dây kêu tiếng "tách".',
      ],
      answer: 1,
      hints: ['Một nam châm có tác dụng gì lên sắt và lên kim nam châm?'],
      solution:
        'Đưa ghim sắt hoặc kim nam châm lại gần: nếu ống dây hút ghim hoặc làm kim nam châm lệch thì nó đã trở thành nam châm điện.',
    },
    {
      type: 'multi',
      prompt: 'Những cách nào làm từ trường của nam châm điện mạnh hơn?',
      options: [
        'Tăng cường độ dòng điện chạy qua ống dây.',
        'Tăng số vòng dây của ống dây.',
        'Rút lõi sắt non ra khỏi ống dây.',
        'Đổi chiều dòng điện.',
        'Ngắt công tắc.',
      ],
      answers: [0, 1],
      hints: [
        'Đổi chiều dòng điện chỉ làm đổi cực, không làm mạnh hơn.',
        'Lõi sắt non làm từ trường mạnh lên hay yếu đi?',
      ],
      solution:
        'Tăng cường độ dòng điện hoặc tăng số vòng dây làm từ trường mạnh hơn. Rút lõi sắt non ra làm yếu đi nhiều; đổi chiều dòng điện chỉ đổi cực; ngắt công tắc làm mất từ trường.',
    },
    {
      type: 'choice',
      prompt:
        'Một nam châm điện đang hút một chùm ghim. Đổi chiều dòng điện chạy qua ống dây (giữ nguyên cường độ) thì',
      options: [
        'các ghim rơi hết.',
        'các ghim vẫn bị hút, nhưng hai cực của nam châm điện đổi chỗ cho nhau.',
        'nam châm điện hút được gấp đôi số ghim.',
        'nam châm điện đẩy các ghim ra xa.',
      ],
      answer: 1,
      hints: ['Ghim sắt bị hút bởi cả cực Bắc lẫn cực Nam.'],
      solution:
        'Đổi chiều dòng điện thì đổi cực của nam châm điện. Ghim sắt bị cả hai cực hút như nhau nên vẫn bị hút.',
    },
    {
      type: 'choice',
      prompt:
        'Hai nam châm điện $A$ và $B$ có lõi sắt non giống nhau và có cùng cường độ dòng điện chạy qua. Ống dây của $A$ có $200$ vòng, của $B$ có $500$ vòng. Nam châm nào có từ trường mạnh hơn?',
      options: ['Nam châm $A$', 'Nam châm $B$', 'Hai nam châm như nhau'],
      answer: 1,
      hints: ['Cùng dòng điện và cùng lõi, chỉ khác số vòng dây.'],
      solution:
        'Cùng dòng điện, cùng lõi, ống dây nào có nhiều vòng hơn thì từ trường mạnh hơn: $B$ ($500$ vòng) mạnh hơn.',
    },
    {
      type: 'choice',
      prompt: 'Vì sao lõi của nam châm điện làm bằng sắt non mà không làm bằng thép?',
      options: [
        'Vì sắt non rẻ hơn thép.',
        'Vì sắt non mất từ tính gần như hoàn toàn khi ngắt điện, còn thép giữ lại từ tính.',
        'Vì thép không bị nhiễm từ.',
        'Vì sắt non dẫn điện tốt hơn thép.',
      ],
      answer: 1,
      hints: ['Nam châm điện cần "buông" được vật khi ngắt điện.'],
      solution:
        'Sắt non bị nhiễm từ khi có dòng điện và mất từ tính gần như ngay khi ngắt điện. Thép giữ từ tính lâu, sẽ thành nam châm vĩnh cửu, không tắt được.',
    },
    {
      type: 'multi',
      prompt: 'Chọn các phát biểu đúng về nam châm điện.',
      options: [
        'Từ trường của nam châm điện vẫn còn nguyên sau khi ngắt điện.',
        'Nam châm điện là bộ phận chính của cần cẩu điện nâng sắt vụn.',
        'Từ trường của nam châm điện phụ thuộc vào dòng điện và lõi sắt trong ống dây.',
        'Ống dây có dòng điện chạy qua có từ trường giống thanh nam châm.',
      ],
      answers: [1, 2, 3],
      hints: ['Điều gì xảy ra với các ghim khi ngắt công tắc?'],
      solution:
        'Sai: từ trường của nam châm điện chỉ tồn tại khi có dòng điện. Đúng: nam châm điện có trong cần cẩu điện; từ trường phụ thuộc dòng điện và lõi sắt; ống dây có dòng điện có từ trường giống thanh nam châm.',
    },
  ],
  takeaways: [
    'Ống dây có dòng điện chạy qua có từ trường giống thanh nam châm; ngắt điện thì mất.',
    'Nam châm điện = ống dây + lõi sắt non + dòng điện.',
    'Tăng dòng điện hoặc số vòng dây, hay thêm lõi sắt non, thì từ trường mạnh hơn.',
    'Đổi chiều dòng điện thì đổi cực của nam châm điện.',
  ],
};
