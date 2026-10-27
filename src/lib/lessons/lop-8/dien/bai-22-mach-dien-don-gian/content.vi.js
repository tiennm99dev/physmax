/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Mạch điện gồm nguồn điện, dây nối, công tắc và các thiết bị dùng điện; mạch điện được biểu diễn bằng sơ đồ với các kí hiệu quy ước. Chiều dòng điện quy ước là chiều từ cực dương của nguồn điện qua dây nối và các thiết bị điện tới cực âm của nguồn. Cầu chì, cầu dao tự động, rơ-le, chuông điện có những công dụng riêng trong mạch điện.',
  intro:
    'Với một pin, một bóng đèn pin, một công tắc và vài đoạn dây nối, làm thế nào để bóng đèn sáng? Người thợ điện không vẽ hình cái pin, cái bóng đèn thật mà vẽ những kí hiệu đơn giản. Đọc được những kí hiệu ấy, em có thể lắp đúng mọi mạch điện.',
  objectives: [
    'Nêu được các bộ phận của một mạch điện đơn giản; phân biệt mạch kín và mạch hở.',
    'Vẽ được sơ đồ mạch điện với kí hiệu của pin, công tắc, dây dẫn, bóng đèn, điện trở, biến trở, chuông điện, ampe kế, vôn kế, điốt và điốt phát quang.',
    'Mắc được mạch điện đơn giản gồm pin, công tắc, dây dẫn, bóng đèn; xác định được chiều dòng điện quy ước.',
    'Mô tả được công dụng của cầu chì, rơ-le, cầu dao tự động, chuông điện.',
  ],
  sections: [
    {
      heading: 'Mạch điện và sơ đồ mạch điện',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Mạch điện',
          text: 'Mạch điện đơn giản gồm nguồn điện (pin, acquy…), các thiết bị tiêu thụ điện (bóng đèn, chuông, động cơ…), công tắc và dây nối. Khi công tắc đóng và các bộ phận được nối liền với hai cực của nguồn điện, mạch kín, có dòng điện chạy qua. Khi có chỗ bị ngắt (công tắc mở, dây đứt, bóng đèn đứt dây tóc), mạch hở, không có dòng điện.',
        },
        {
          type: 'p',
          text: 'Để vẽ mạch điện cho nhanh, rõ và ai cũng hiểu giống nhau, người ta dùng sơ đồ mạch điện: mỗi bộ phận được thay bằng một kí hiệu quy ước, các dây nối được vẽ bằng những đoạn thẳng. Chọn từng kí hiệu dưới đây để xem tên và công dụng.',
        },
        { type: 'widget', name: 'ki-hieu' },
        {
          type: 'table',
          head: ['Bộ phận', 'Kí hiệu được vẽ như thế nào'],
          rows: [
            [
              'Nguồn điện (pin)',
              'Hai vạch song song: vạch dài, mảnh là cực dương; vạch ngắn, đậm là cực âm',
            ],
            ['Công tắc', 'Đoạn thẳng nối hai chấm tròn (đóng) hoặc chếch lên (mở)'],
            ['Bóng đèn', 'Vòng tròn có dấu nhân bên trong'],
            ['Điện trở', 'Hình chữ nhật'],
            ['Biến trở', 'Hình chữ nhật có mũi tên chéo qua'],
            ['Ampe kế, vôn kế', 'Vòng tròn có chữ A, chữ V; có ghi chốt $(+)$, $(-)$'],
            ['Điốt', 'Tam giác chỉ vào một vạch thẳng (chiều cho dòng điện đi qua)'],
            ['Điốt phát quang (LED)', 'Kí hiệu điốt kèm hai mũi tên nhỏ hướng ra ngoài'],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Mẹo vẽ sơ đồ',
          text: 'Vẽ các dây nối bằng thước, thành những đoạn thẳng nằm ngang hoặc thẳng đứng; mỗi kí hiệu đặt đúng vị trí của bộ phận đó trong mạch thật. Sơ đồ phải giữ đúng thứ tự các bộ phận trên đường đi của dòng điện.',
        },
      ],
    },
    {
      heading: 'Chiều dòng điện',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Quy ước chiều dòng điện',
          text: 'Chiều dòng điện trong mạch điện là chiều từ cực dương của nguồn điện qua dây nối và các dụng cụ tiêu thụ điện tới cực âm của nguồn điện. Trên sơ đồ, chiều dòng điện được biểu diễn bằng mũi tên.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Electron đi ngược chiều quy ước',
          text: 'Trong dây dẫn kim loại, các electron tự do (mang điện tích âm) dịch chuyển từ cực âm, qua mạch ngoài, về cực dương: ngược với chiều dòng điện quy ước. Chiều quy ước được chọn từ trước khi người ta biết đến electron, và vẫn được dùng đến nay.',
        },
        {
          type: 'p',
          text: 'Dòng điện do pin hoặc acquy cung cấp có chiều không đổi, gọi là dòng điện một chiều. Nếu đảo hai cực của pin trong mạch, chiều dòng điện trong mạch đổi ngược lại.',
        },
      ],
    },
    {
      heading: 'Cầu chì, cầu dao tự động, rơ-le, chuông điện',
      blocks: [
        {
          type: 'table',
          head: ['Thiết bị', 'Công dụng', 'Hoạt động'],
          rows: [
            [
              'Cầu chì',
              'Bảo vệ các thiết bị điện khác trong mạch không bị hỏng khi dòng điện trong mạch đột ngột tăng quá mức',
              'Mắc nối tiếp với thiết bị. Khi dòng điện quá lớn, dây chảy trong cầu chì nóng chảy và đứt, làm ngắt mạch; phải thay dây chảy mới',
            ],
            [
              'Cầu dao tự động (aptomat)',
              'Tự động ngắt mạch điện để các thiết bị điện không bị hỏng khi dòng điện đột ngột tăng quá mức',
              'Thường đặt ngay sau chỗ đưa điện lưới vào nhà hoặc ở từng tầng; sau khi tự ngắt, chỉ cần gạt lên để đóng lại',
            ],
            [
              'Rơ-le',
              'Điều khiển đóng, ngắt mạch điện một cách tự động',
              'Dòng điện nhỏ chạy qua cuộn dây của rơ-le làm nó hút một thanh kim loại, đóng hoặc ngắt một mạch điện khác',
            ],
            [
              'Chuông điện',
              'Phát ra tín hiệu bằng âm thanh khi có dòng điện chạy qua',
              'Thường lắp ở cửa ra vào; khách bấm nút (công tắc) làm mạch kín, chuông kêu',
            ],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Điểm giống nhau',
          text: 'Cầu chì, cầu dao tự động và rơ-le đều có thể ngắt mạch điện. Cầu chì và cầu dao tự động bảo vệ mạch khi dòng điện tăng quá mức; rơ-le dùng để điều khiển đóng, ngắt mạch tự động.',
        },
      ],
    },
  ],
  explore: {
    title: 'Bộ lắp mạch điện',
    instruction:
      'Chọn một vị trí trên bàn lắp mạch rồi chọn bộ phận để lắp vào; sơ đồ bên cạnh tự vẽ bằng kí hiệu. Hãy làm cho đèn sáng, rồi thử: mở công tắc, đảo chiều pin (quan sát mũi tên chiều dòng điện), thay đèn bằng LED và đảo chiều LED, bỏ hết đèn chỉ để dây nối.',
  },
  examples: [
    {
      problem:
        'Một chiếc đèn pin gồm hai pin tròn mắc nối tiếp, một công tắc, một bóng đèn và các dây nối (lò xo, thanh kim loại). Hãy mô tả cách vẽ sơ đồ mạch điện của đèn pin và chỉ chiều dòng điện khi bật đèn.',
      steps: [
        'Kí hiệu hai pin mắc nối tiếp: hai cặp vạch dài – ngắn, vạch ngắn của pin này nối với vạch dài của pin kia.',
        'Vẽ dây nối từ cực dương (vạch dài ở đầu bộ pin) tới công tắc, từ công tắc tới bóng đèn (vòng tròn có dấu nhân), rồi từ bóng đèn trở về cực âm của bộ pin: một vòng kín.',
        'Khi bật công tắc (vẽ công tắc đóng), dòng điện đi từ cực dương của bộ pin, qua công tắc, qua bóng đèn, về cực âm. Vẽ mũi tên theo chiều đó trên dây nối.',
      ],
      answer:
        'Sơ đồ là một vòng kín: bộ hai pin → công tắc → bóng đèn → trở về bộ pin; mũi tên chiều dòng điện đi ra từ cực dương của bộ pin.',
    },
    {
      problem:
        'Trong một mạch điện, khi mắc đèn LED theo một chiều thì đèn sáng; đảo ngược hai đầu LED thì đèn không sáng (pin, dây nối vẫn tốt). Giải thích.',
      steps: [
        'Điốt phát quang (LED) chỉ cho dòng điện đi qua theo một chiều nhất định (chiều mũi tên trong kí hiệu).',
        'Khi LED mắc đúng chiều, dòng điện từ cực dương của pin đi qua LED theo chiều cho phép: có dòng điện, LED sáng.',
        'Khi đảo LED, chiều dòng điện trong mạch ngược với chiều LED cho phép đi qua: LED chặn dòng điện, mạch không có dòng điện.',
      ],
      answer:
        'LED chỉ cho dòng điện đi qua theo một chiều; mắc ngược thì không có dòng điện nên LED không sáng.',
    },
    {
      problem:
        'Gia đình bạn An dùng cùng lúc bếp điện, bình nóng lạnh, máy giặt và điều hòa thì "mất điện" cả nhà; ra xem thì thấy cầu dao tự động đã bật xuống. Vì sao, và nên làm gì?',
      steps: [
        'Dùng cùng lúc nhiều thiết bị công suất lớn làm dòng điện trong mạch tăng quá mức.',
        'Cầu dao tự động có công dụng tự ngắt mạch khi dòng điện tăng quá mức, để dây dẫn và các thiết bị không bị hỏng, tránh cháy nổ.',
        'Nên tắt bớt một số thiết bị rồi mới gạt cầu dao lên; không dùng cùng lúc quá nhiều thiết bị công suất lớn.',
      ],
      answer:
        'Cầu dao tự động đã ngắt mạch vì dòng điện tăng quá mức. Cần giảm bớt số thiết bị dùng cùng lúc rồi đóng cầu dao lại.',
    },
  ],
  practice: [
    {
      type: 'multi',
      prompt: 'Một mạch điện đơn giản để thắp sáng bóng đèn pin cần những bộ phận nào?',
      options: ['Nguồn điện (pin)', 'Bóng đèn', 'Dây nối', 'Công tắc', 'Ampe kế', 'Cầu chì'],
      answers: [0, 1, 2, 3],
      hints: ['Bộ phận nào bắt buộc phải có để đèn sáng và bật, tắt được?'],
      solution:
        'Mạch điện đơn giản gồm nguồn điện (pin), bóng đèn, dây nối và công tắc. Ampe kế, cầu chì không bắt buộc.',
    },
    {
      type: 'choice',
      prompt: 'Trong kí hiệu nguồn điện (pin) trên sơ đồ, cực dương được biểu diễn bằng',
      options: ['vạch ngắn, đậm', 'vạch dài, mảnh', 'vòng tròn có dấu nhân', 'hình chữ nhật'],
      answer: 1,
      hints: ['Kí hiệu pin có hai vạch song song, một dài và một ngắn.'],
      solution: 'Vạch dài, mảnh là cực dương; vạch ngắn, đậm là cực âm.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi bộ phận với kí hiệu của nó trên sơ đồ mạch điện.',
      left: ['Bóng đèn', 'Điện trở', 'Biến trở', 'Ampe kế', 'Điốt phát quang (LED)'],
      right: [
        'Hình chữ nhật có mũi tên chéo qua',
        'Vòng tròn có dấu nhân bên trong',
        'Vòng tròn có chữ A',
        'Hình chữ nhật',
        'Tam giác chỉ vào vạch thẳng, kèm hai mũi tên nhỏ hướng ra',
      ],
      pairs: [
        [0, 1],
        [1, 3],
        [2, 0],
        [3, 2],
        [4, 4],
      ],
      hints: [
        'Biến trở là điện trở thay đổi được: kí hiệu của nó giống kí hiệu điện trở, thêm một chi tiết.',
      ],
      solution:
        'Bóng đèn: vòng tròn có dấu nhân. Điện trở: hình chữ nhật. Biến trở: hình chữ nhật có mũi tên chéo. Ampe kế: vòng tròn có chữ A. LED: kí hiệu điốt kèm hai mũi tên nhỏ hướng ra (ánh sáng phát ra).',
    },
    {
      type: 'choice',
      prompt: 'Chiều dòng điện quy ước trong mạch điện là chiều',
      options: [
        'từ cực âm của nguồn qua dây nối và các dụng cụ điện tới cực dương',
        'từ cực dương của nguồn qua dây nối và các dụng cụ điện tới cực âm',
        'dịch chuyển của các electron tự do trong dây dẫn',
        'thay đổi liên tục theo thời gian',
      ],
      answer: 1,
      hints: ['Dòng điện "đi ra" từ cực nào của nguồn điện?'],
      solution:
        'Quy ước: chiều dòng điện là chiều từ cực dương của nguồn điện qua dây nối và các dụng cụ tiêu thụ điện tới cực âm của nguồn. Electron tự do dịch chuyển ngược chiều này.',
    },
    {
      type: 'choice',
      prompt:
        'Trong dây dẫn kim loại của một mạch điện kín, các electron tự do dịch chuyển như thế nào so với chiều dòng điện quy ước?',
      options: ['Cùng chiều', 'Ngược chiều', 'Vuông góc', 'Đứng yên'],
      answer: 1,
      hints: ['Electron mang điện tích âm, đi từ cực nào về cực nào của nguồn?'],
      solution:
        'Electron tự do dịch chuyển từ cực âm, qua mạch ngoài, về cực dương của nguồn: ngược với chiều dòng điện quy ước.',
    },
    {
      type: 'choice',
      prompt: 'Mạch điện gồm pin, công tắc, bóng đèn tốt và dây nối. Công tắc mở thì',
      options: [
        'mạch kín, đèn sáng',
        'mạch hở, đèn không sáng',
        'mạch kín, đèn không sáng',
        'đèn sáng yếu hơn',
      ],
      answer: 1,
      hints: ['Công tắc mở thì giữa hai chốt của công tắc có liền nhau không?'],
      solution: 'Công tắc mở làm mạch bị ngắt (mạch hở) nên không có dòng điện, đèn không sáng.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi thiết bị với công dụng của nó.',
      left: ['Cầu chì', 'Cầu dao tự động', 'Rơ-le', 'Chuông điện'],
      right: [
        'Phát ra tín hiệu bằng âm thanh khi có dòng điện chạy qua',
        'Điều khiển đóng, ngắt mạch điện tự động',
        'Dây chảy nóng chảy, đứt khi dòng điện tăng quá mức, bảo vệ thiết bị',
        'Tự động ngắt mạch khi dòng điện tăng quá mức, đóng lại bằng cách gạt lên',
      ],
      pairs: [
        [0, 2],
        [1, 3],
        [2, 1],
        [3, 0],
      ],
      hints: [
        'Cầu chì và cầu dao tự động cùng bảo vệ mạch, nhưng khác nhau ở chỗ có dùng lại được ngay hay không.',
      ],
      solution:
        'Cầu chì: dây chảy nóng chảy và đứt khi dòng điện quá lớn. Cầu dao tự động: tự ngắt khi dòng điện quá lớn, gạt lên để đóng lại. Rơ-le: điều khiển đóng, ngắt mạch tự động. Chuông điện: phát âm thanh khi có dòng điện.',
    },
    {
      type: 'choice',
      prompt:
        'Dòng điện do pin hoặc acquy cung cấp có chiều không đổi. Dòng điện này được gọi là gì?',
      options: [
        'Dòng điện xoay chiều',
        'Dòng điện một chiều',
        'Dòng điện tự do',
        'Dòng điện quy ước',
      ],
      answer: 1,
      hints: ['Tên gọi nói lên chiều của dòng điện luôn như thế nào?'],
      solution:
        'Dòng điện có chiều không đổi, do pin hoặc acquy cung cấp, gọi là dòng điện một chiều.',
    },
    {
      type: 'choice',
      prompt:
        'Một bạn nối thẳng hai cực của pin bằng một đoạn dây đồng, không qua bóng đèn hay thiết bị nào. Điều gì xảy ra?',
      options: [
        'Không có dòng điện vì không có bóng đèn',
        'Dòng điện rất lớn (đoản mạch), dây và pin nóng lên, pin nhanh hỏng',
        'Dòng điện rất nhỏ, không có hại',
        'Pin được nạp thêm điện',
      ],
      answer: 1,
      hints: ['Mạch có kín không? Có bộ phận nào cản trở dòng điện không?'],
      solution:
        'Mạch kín chỉ có dây dẫn nên dòng điện rất lớn (đoản mạch, chập mạch): dây dẫn và pin nóng lên, pin nhanh hỏng; với điện lưới còn có thể gây cháy. Không bao giờ được nối tắt hai cực nguồn điện.',
    },
  ],
  takeaways: [
    'Mạch điện gồm nguồn điện, thiết bị tiêu thụ điện, công tắc, dây nối; mạch kín mới có dòng điện.',
    'Sơ đồ mạch điện dùng kí hiệu quy ước; ở kí hiệu pin, vạch dài là cực dương, vạch ngắn là cực âm.',
    'Chiều dòng điện quy ước: từ cực dương của nguồn, qua dây nối và các dụng cụ điện, tới cực âm. Pin, acquy cho dòng điện một chiều.',
    'Cầu chì, cầu dao tự động bảo vệ mạch khi dòng điện tăng quá mức; rơ-le đóng, ngắt mạch tự động; chuông điện phát âm thanh khi có dòng điện.',
  ],
};
