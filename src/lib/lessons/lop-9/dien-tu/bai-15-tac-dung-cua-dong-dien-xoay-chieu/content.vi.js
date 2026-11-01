/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Dòng điện xoay chiều có tác dụng nhiệt, tác dụng phát sáng, tác dụng từ và tác dụng sinh lí; nam châm điện dùng dòng điện xoay chiều có cực từ đổi liên tục nên làm kim nam châm rung nhưng vẫn hút sắt; dòng điện xoay chiều 220 V nguy hiểm đến tính mạng nên phải dùng điện an toàn.',
  intro:
    'Cùng một ổ cắm điện trong nhà mà bàn là thì nóng lên, bóng đèn thì sáng, quạt thì quay. Dòng điện xoay chiều có những tác dụng gì? Vì sao chạm vào dây điện bị hở lại có thể nguy hiểm đến tính mạng?',
  objectives: [
    'Lấy được ví dụ chứng tỏ dòng điện xoay chiều có tác dụng nhiệt, tác dụng phát sáng, tác dụng từ và tác dụng sinh lí.',
    'Mô tả được sự khác nhau giữa tác dụng từ của dòng điện một chiều và dòng điện xoay chiều lên kim nam châm.',
    'Nêu được một số quy tắc an toàn khi sử dụng điện xoay chiều.',
  ],
  sections: [
    {
      heading: 'Tác dụng nhiệt và tác dụng phát sáng',
      blocks: [
        {
          type: 'p',
          text: 'Khi dòng điện xoay chiều chạy qua một vật dẫn, vật dẫn nóng lên: dòng điện xoay chiều có tác dụng nhiệt. Bàn là, nồi cơm điện, ấm điện, máy sấy tóc dùng tác dụng này.',
        },
        {
          type: 'p',
          text: 'Dòng điện xoay chiều chạy qua bóng đèn sợi đốt làm dây tóc nóng lên tới mức phát sáng; chạy qua đèn LED, đèn huỳnh quang cũng làm đèn sáng: dòng điện xoay chiều có tác dụng phát sáng.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Không phụ thuộc chiều dòng điện',
          text: 'Tác dụng nhiệt và tác dụng phát sáng không phụ thuộc chiều của dòng điện: dòng điện chạy theo chiều nào thì vật dẫn cũng nóng lên, đèn cũng sáng. Vì vậy bàn là hay bóng đèn sợi đốt dùng được cả dòng điện một chiều lẫn xoay chiều.',
        },
      ],
    },
    {
      heading: 'Tác dụng từ',
      blocks: [
        {
          type: 'p',
          text: 'Dòng điện xoay chiều chạy trong dây dẫn thẳng hoặc cuộn dây cũng sinh ra từ trường: dòng điện xoay chiều có tác dụng từ. Thí nghiệm: đặt một kim nam châm (hoặc một đinh sắt treo trên sợi dây) gần một đầu của nam châm điện, lần lượt nối nam châm điện với nguồn điện một chiều và nguồn điện xoay chiều.',
        },
        {
          type: 'table',
          caption: 'Tác dụng từ của dòng điện một chiều và xoay chiều',
          head: ['Đặc điểm', 'Dòng điện một chiều', 'Dòng điện xoay chiều'],
          rows: [
            ['Cực từ ở đầu cuộn dây', 'Không đổi', 'Đổi N, S luân phiên theo chiều dòng điện'],
            [
              'Kim nam châm',
              'Bị hút (hoặc bị đẩy) và lệch hẳn về một phía, đứng yên',
              'Lần lượt bị hút, bị đẩy: kim rung (dao động qua lại)',
            ],
            ['Đinh sắt', 'Bị hút', 'Vẫn bị hút'],
          ],
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Kết luận',
          text: 'Khi dòng điện xoay chiều đổi chiều thì cực từ của nam châm điện cũng đổi. Lực từ của nam châm điện xoay chiều tác dụng lên kim nam châm luân phiên đổi chiều, nên kim nam châm rung; còn sắt bị hút bởi cả hai cực từ nên nam châm điện xoay chiều vẫn hút được sắt.',
        },
        {
          type: 'list',
          items: [
            'Ứng dụng tác dụng từ của dòng điện xoay chiều: nam châm điện xoay chiều dùng để di chuyển bột sắt trong công nghiệp, rơ le điện từ, động cơ điện (quạt, máy bơm, máy giặt).',
            'Trong y học, máy chụp cộng hưởng từ (MRI) dùng từ trường rất mạnh; trong giao thông có tàu đệm từ.',
          ],
        },
      ],
    },
    {
      heading: 'Tác dụng sinh lí',
      blocks: [
        {
          type: 'p',
          text: 'Khi dòng điện xoay chiều đi qua cơ thể người hoặc động vật (do sơ suất chạm vào dây điện bị hở, ổ cắm hỏng), nó có thể làm cơ co giật, tim ngừng đập, ngạt thở, thần kinh tê liệt: dòng điện xoay chiều có tác dụng sinh lí. Đó là hiện tượng điện giật.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Nguy hiểm đến tính mạng',
          text: 'Dòng điện xoay chiều $220$ V của mạng điện gia đình có thể gây nguy hiểm đến tính mạng. Chỉ những thí nghiệm dùng hiệu điện thế dưới $40$ V mới được coi là an toàn đối với cơ thể người.',
        },
        {
          type: 'p',
          text: 'Được kiểm soát chặt chẽ, tác dụng sinh lí của dòng điện được dùng trong y học để chữa một số bệnh, ví dụ máy khử rung tim cho một xung điện qua tim để tim đập lại nhịp bình thường.',
        },
      ],
    },
    {
      heading: 'An toàn khi sử dụng điện xoay chiều',
      blocks: [
        {
          type: 'list',
          items: [
            'Ngắt cầu dao (aptomat) hoặc rút phích cắm trước khi sửa chữa, thay bóng đèn, lau chùi thiết bị điện.',
            'Không chạm vào dây điện trần, dây bị hở vỏ cách điện; thay ngay dây và ổ cắm bị hỏng.',
            'Không cắm, rút phích điện khi tay ướt; không cho trẻ nhỏ chọc vật kim loại vào ổ cắm.',
            'Không lại gần trạm biến áp, không trèo cột điện, không thả diều gần đường dây điện.',
            'Thấy người bị điện giật: ngắt nguồn điện ngay; nếu chưa ngắt được, dùng vật cách điện khô (gậy gỗ, ống nhựa) tách người đó khỏi dây điện, không chạm tay trực tiếp vào người bị giật.',
          ],
        },
        { type: 'widget', name: 'an-toan' },
      ],
    },
  ],
  explore: {
    title: 'Nam châm điện với dòng một chiều và xoay chiều',
    instruction:
      'Đóng công tắc với nguồn một chiều rồi với nguồn xoay chiều. Quan sát cực từ ở đầu cuộn dây, kim nam châm và đồ thị dòng điện; bấm "Đổi chiều nguồn" khi dùng nguồn một chiều. Thay kim nam châm bằng đinh sắt và so sánh. Để ý đèn trong mạch sáng với cả hai loại nguồn.',
  },
  examples: [
    {
      problem:
        'Đặt một kim nam châm trước một đầu của nam châm điện. Mô tả và giải thích chuyển động của kim khi nam châm điện được nối với nguồn điện một chiều, rồi với nguồn điện xoay chiều.',
      steps: [
        'Với nguồn một chiều, dòng điện chạy theo một chiều không đổi nên cực từ ở đầu cuộn dây không đổi. Kim nam châm bị hút (hoặc bị đẩy), lệch về một phía rồi đứng yên.',
        'Với nguồn xoay chiều, dòng điện luân phiên đổi chiều nên cực từ ở đầu cuộn dây đổi N, S luân phiên.',
        'Một cực của kim nam châm lần lượt bị hút rồi bị đẩy, nên kim rung qua lại quanh vị trí ban đầu.',
      ],
      answer:
        'Dòng một chiều: kim lệch về một phía và đứng yên. Dòng xoay chiều: kim rung vì cực từ của nam châm điện đổi liên tục.',
    },
    {
      problem:
        'Mỗi thiết bị sau hoạt động chủ yếu nhờ tác dụng nào của dòng điện xoay chiều: nồi cơm điện, đèn LED, quạt điện, máy khử rung tim?',
      steps: [
        'Nồi cơm điện biến năng lượng điện thành nhiệt để nấu: tác dụng nhiệt.',
        'Đèn LED biến năng lượng điện thành ánh sáng: tác dụng phát sáng.',
        'Quạt điện có động cơ điện, quay được nhờ lực từ: tác dụng từ.',
        'Máy khử rung tim cho dòng điện tác động lên tim: tác dụng sinh lí.',
      ],
      answer: 'Nồi cơm điện: nhiệt; đèn LED: phát sáng; quạt điện: từ; máy khử rung tim: sinh lí.',
    },
    {
      problem:
        'Dòng điện trong mạng điện gia đình đổi chiều $100$ lần trong mỗi giây. Một nam châm điện dùng dòng điện này đặt gần kim nam châm. Trong $1$ giây, cực từ ở đầu nam châm điện đổi bao nhiêu lần? Vì sao mắt ta chỉ thấy kim nam châm rung nhẹ?',
      steps: [
        'Mỗi lần dòng điện đổi chiều thì cực từ ở đầu nam châm điện đổi một lần: $100$ lần trong $1$ giây.',
        'Lực từ lên kim đổi chiều quá nhanh; kim có quán tính, chưa kịp quay xa theo chiều này thì lực đã đổi sang chiều kia.',
        'Vì vậy kim chỉ rung nhẹ quanh vị trí ban đầu thay vì lệch hẳn về một phía.',
      ],
      answer: 'Cực từ đổi $100$ lần trong $1$ giây; lực đổi chiều quá nhanh nên kim chỉ rung nhẹ.',
    },
  ],
  practice: [
    {
      type: 'multi',
      prompt: 'Dòng điện xoay chiều có những tác dụng nào sau đây?',
      options: [
        'Tác dụng nhiệt',
        'Tác dụng phát sáng',
        'Tác dụng từ',
        'Tác dụng sinh lí',
        'Làm mọi vật bị nhiễm điện khi đặt gần dây dẫn',
      ],
      answers: [0, 1, 2, 3],
      hints: ['Nhớ lại bốn tác dụng đã học: bàn là, bóng đèn, nam châm điện, điện giật.'],
      solution:
        'Dòng điện xoay chiều có tác dụng nhiệt (bàn là nóng), phát sáng (đèn sáng), từ (nam châm điện, động cơ) và sinh lí (điện giật). Đặt vật gần dây dẫn không làm vật nhiễm điện.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi thiết bị với tác dụng chủ yếu của dòng điện xoay chiều mà nó sử dụng.',
      left: ['Bàn là', 'Bóng đèn LED', 'Rơ le điện từ', 'Máy khử rung tim'],
      right: ['Tác dụng nhiệt', 'Tác dụng phát sáng', 'Tác dụng từ', 'Tác dụng sinh lí'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['Hỏi: năng lượng điện được chuyển thành gì, hay tác động lên đâu?'],
      solution:
        'Bàn là nóng lên: nhiệt. Đèn LED sáng: phát sáng. Rơ le điện từ có nam châm điện hút thanh sắt: từ. Máy khử rung tim cho dòng điện tác động lên tim: sinh lí.',
    },
    {
      type: 'choice',
      prompt:
        'Đặt kim nam châm gần một đầu nam châm điện nối với nguồn điện xoay chiều. Khi đóng mạch, kim nam châm thế nào?',
      options: [
        'Kim rung qua lại.',
        'Kim lệch hẳn về một phía rồi đứng yên.',
        'Kim đứng yên, không có tác dụng gì.',
        'Kim quay tròn liên tục theo một chiều.',
      ],
      answer: 0,
      hints: ['Khi dòng điện đổi chiều, cực từ ở đầu nam châm điện có đổi không?'],
      solution:
        'Dòng điện xoay chiều luân phiên đổi chiều nên cực từ ở đầu nam châm điện đổi N, S luân phiên; cực của kim lần lượt bị hút, bị đẩy nên kim rung. Kim lệch hẳn về một phía là trường hợp dòng điện một chiều.',
    },
    {
      type: 'choice',
      prompt:
        'Treo một đinh sắt gần đầu một nam châm điện dùng dòng điện xoay chiều. Khi đóng mạch thì đinh sắt thế nào?',
      options: [
        'Bị hút về phía nam châm điện.',
        'Bị đẩy ra xa nam châm điện.',
        'Lần lượt bị hút rồi bị đẩy.',
        'Đứng yên vì cực từ đổi liên tục.',
      ],
      answer: 0,
      hints: ['Sắt bị cực nào của nam châm hút: cực Bắc, cực Nam hay cả hai?'],
      solution:
        'Sắt bị hút bởi cả cực Bắc lẫn cực Nam. Dù cực từ ở đầu nam châm điện đổi liên tục, đinh sắt vẫn luôn bị hút.',
    },
    {
      type: 'choice',
      prompt:
        'Nam châm điện nối với nguồn điện một chiều đang hút kim nam châm lệch sang trái. Đổi chiều dòng điện qua nam châm điện thì kim nam châm thế nào?',
      options: [
        'Lệch sang phải và đứng yên.',
        'Vẫn lệch sang trái.',
        'Rung qua lại.',
        'Trở về hướng Bắc – Nam và đứng yên.',
      ],
      answer: 0,
      hints: ['Đổi chiều dòng điện thì cực từ ở đầu nam châm điện đổi; lực lên kim đổi chiều.'],
      solution:
        'Đổi chiều dòng điện một chiều thì cực từ ở đầu nam châm điện đổi, cực của kim đang bị hút nay bị đẩy: kim lệch sang phía ngược lại (sang phải) và đứng yên, vì dòng điện không đổi chiều nữa.',
    },
    {
      type: 'number',
      prompt:
        'Dòng điện xoay chiều trong gia đình đổi chiều $100$ lần trong mỗi giây. Trong $0{,}2$ giây, cực từ ở đầu một nam châm điện dùng dòng điện này đổi bao nhiêu lần?',
      answer: 20,
      tolerance: 0.001,
      unit: 'lần',
      hints: ['Mỗi lần dòng điện đổi chiều, cực từ đổi một lần.'],
      solution: 'Số lần đổi cực bằng số lần dòng điện đổi chiều: $100 \\cdot 0{,}2 = 20$ lần.',
    },
    {
      type: 'text',
      prompt:
        'Điền từ còn thiếu: Dòng điện xoay chiều đi qua cơ thể người có thể làm cơ co giật, tim ngừng đập. Đó là tác dụng … của dòng điện.',
      accept: ['sinh lí', 'sinh lý', 'tác dụng sinh lí', 'tác dụng sinh lý'],
      hints: ['Tác dụng này cũng được dùng trong máy khử rung tim.'],
      solution: 'Đó là tác dụng sinh lí của dòng điện xoay chiều.',
    },
    {
      type: 'choice',
      prompt: 'Để an toàn, học sinh chỉ được làm thí nghiệm với nguồn điện có hiệu điện thế:',
      options: ['Dưới $40$ V', 'Dưới $220$ V', 'Đúng $220$ V', 'Bất kì, nếu đứng trên nền khô'],
      answer: 0,
      hints: ['Hiệu điện thế mạng điện gia đình đã đủ để gây nguy hiểm đến tính mạng.'],
      solution:
        'Chỉ hiệu điện thế dưới $40$ V mới được coi là an toàn đối với cơ thể người. $220$ V của mạng điện gia đình có thể gây chết người.',
    },
    {
      type: 'multi',
      prompt: 'Những việc làm nào đảm bảo an toàn khi sử dụng điện xoay chiều?',
      options: [
        'Ngắt cầu dao trước khi thay bóng đèn.',
        'Rút phích cắm khi tay còn ướt.',
        'Thay ngay dây điện bị hở vỏ cách điện.',
        'Thả diều ở bãi đất trống, xa đường dây điện.',
        'Trèo lên cột điện để gỡ diều bị vướng.',
      ],
      answers: [0, 2, 3],
      hints: ['Loại những việc làm có thể để dòng điện chạy qua người.'],
      solution:
        'Ngắt cầu dao, thay dây hở và thả diều xa đường dây là an toàn. Tay ướt làm dễ bị điện giật; trèo cột điện có thể chạm vào dây điện, rất nguy hiểm.',
    },
    {
      type: 'choice',
      prompt: 'Thấy một người đang bị điện giật, việc nên làm đầu tiên là gì?',
      options: [
        'Ngắt nguồn điện ngay (ngắt cầu dao, rút phích cắm).',
        'Dùng tay kéo người đó ra khỏi dây điện.',
        'Dội nước vào người bị điện giật.',
        'Dùng thanh sắt gạt dây điện ra.',
      ],
      answer: 0,
      hints: ['Người cứu không được để dòng điện chạy qua chính mình.'],
      solution:
        'Phải ngắt nguồn điện ngay. Nếu chưa ngắt được, dùng vật cách điện khô (gậy gỗ, ống nhựa) để tách người bị giật khỏi dây điện. Tay, nước, thanh sắt đều dẫn điện, người cứu sẽ bị giật theo.',
    },
  ],
  takeaways: [
    'Dòng điện xoay chiều có tác dụng nhiệt, tác dụng phát sáng, tác dụng từ và tác dụng sinh lí.',
    'Tác dụng nhiệt và phát sáng không phụ thuộc chiều dòng điện.',
    'Nam châm điện dùng dòng điện xoay chiều có cực từ đổi liên tục: kim nam châm đặt gần nó rung, còn sắt vẫn bị hút.',
    'Dòng điện xoay chiều $220$ V có thể gây nguy hiểm đến tính mạng: ngắt điện trước khi sửa chữa, không chạm vào dây hở, không lại gần trạm biến áp; chỉ thí nghiệm với hiệu điện thế dưới $40$ V.',
  ],
};
