/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Ta không nhìn thấy dòng điện, nhưng nhận biết được nó qua các tác dụng: tác dụng nhiệt (vật dẫn nóng lên), tác dụng phát sáng (đèn LED, bóng đèn), tác dụng hóa học (tách đồng khỏi dung dịch, mạ điện), tác dụng sinh lí (lên cơ thể người và động vật), và tác dụng từ (nam châm điện, chuông điện).',
  intro:
    'Dòng điện chạy trong dây dẫn mà ta không nhìn thấy các hạt mang điện dịch chuyển. Vậy làm sao biết trong mạch có dòng điện? Hãy nhìn bàn là nóng lên, đèn LED bật sáng, chuông cửa reo… Mỗi thiết bị cho thấy một tác dụng của dòng điện.',
  objectives: [
    'Thực hiện hoặc mô tả được thí nghiệm minh họa các tác dụng cơ bản của dòng điện: nhiệt, phát sáng, hóa học, sinh lí.',
    'Nêu được tác dụng từ của dòng điện qua nam châm điện, chuông điện.',
    'Chỉ ra được tác dụng chính của dòng điện trong một số thiết bị: bàn là, ấm điện, đèn LED, bóng đèn sợi đốt, chuông điện, bình mạ điện, máy điện châm, cầu chì.',
    'Biết tác dụng sinh lí có thể gây nguy hiểm và thực hiện được các quy tắc an toàn điện.',
  ],
  sections: [
    {
      heading: 'Tác dụng nhiệt',
      blocks: [
        {
          type: 'p',
          text: 'Thí nghiệm: nối hai đầu một đoạn dây sắt mảnh $AB$ với nguồn điện qua công tắc. Đóng công tắc một lúc rồi đưa tay lại gần (không chạm vào) dây: dây $AB$ nóng lên. Ngắt công tắc, dây nguội dần.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Tác dụng nhiệt',
          text: 'Vật dẫn nóng lên khi có dòng điện chạy qua. Đó là tác dụng nhiệt của dòng điện.',
        },
        {
          type: 'list',
          items: [
            'Ứng dụng: bàn là, ấm điện, nồi cơm điện, bếp điện, máy sấy tóc, bình nóng lạnh… đều có dây đốt nóng.',
            'Cầu chì dùng tác dụng nhiệt để bảo vệ mạch: khi dòng điện quá lớn, dây chảy nóng chảy và đứt, ngắt mạch.',
            'Có khi tác dụng nhiệt là không mong muốn: máy tính, điện thoại, quạt điện nóng lên khi chạy lâu, làm hao phí năng lượng; vì thế máy tính cần quạt tản nhiệt.',
          ],
        },
      ],
    },
    {
      heading: 'Tác dụng phát sáng',
      blocks: [
        {
          type: 'p',
          text: 'Thí nghiệm: mắc một đèn LED (điốt phát quang) vào mạch có pin và công tắc rồi đóng công tắc, quan sát đèn. Sau đó đảo ngược hai đầu dây nối với đèn LED và đóng công tắc lần nữa. Ở một chiều mắc, đèn LED sáng; đảo chiều thì đèn không sáng.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Tác dụng phát sáng',
          text: 'Dòng điện có thể làm một số vật phát sáng, như đèn LED, dây tóc bóng đèn. Đó là tác dụng phát sáng của dòng điện.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Đèn LED',
          text: 'Đèn LED chỉ cho dòng điện đi qua theo một chiều nhất định. Chân dài (bản cực nhỏ bên trong) là cực dương, phải nối về phía cực dương của nguồn; chân ngắn (bản cực lớn) là cực âm. Đèn LED phát sáng khi còn nguội nên tiết kiệm điện, được dùng rất rộng rãi để chiếu sáng, trang trí, làm biển quảng cáo, màn hình.',
        },
        {
          type: 'p',
          text: 'Ở bóng đèn sợi đốt, dòng điện làm dây tóc bằng vonfram nóng tới khoảng $2\\,500\\ ^\\circ\\text{C}$ và phát sáng: bóng đèn sợi đốt cho thấy cả tác dụng nhiệt lẫn tác dụng phát sáng, phần lớn năng lượng điện biến thành nhiệt.',
        },
      ],
    },
    {
      heading: 'Tác dụng hóa học',
      blocks: [
        {
          type: 'p',
          text: 'Thí nghiệm: nhúng hai thỏi than vào cốc đựng dung dịch copper(II) sulfate ($\\text{CuSO}_4$) màu xanh, nối hai thỏi than với hai cực của nguồn điện qua công tắc và bóng đèn. Đóng công tắc, đèn sáng: dung dịch copper(II) sulfate dẫn điện. Sau vài phút, nhấc thỏi than nối với cực âm ra, thấy nó được phủ một lớp màu đỏ nâu: đó là kim loại đồng.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Tác dụng hóa học',
          text: 'Dòng điện chạy qua dung dịch muối kim loại có thể tách kim loại ra khỏi dung dịch, bám vào điện cực nối với cực âm. Đó là tác dụng hóa học của dòng điện.',
        },
        {
          type: 'p',
          text: 'Ứng dụng: mạ điện, phủ một lớp kim loại mỏng (đồng, kẽm, niken, vàng, bạc…) lên đồ vật để chống gỉ hoặc làm đẹp. Vật cần mạ được nối với cực âm của nguồn và nhúng vào dung dịch muối của kim loại dùng để mạ. Tác dụng hóa học còn dùng để tinh chế kim loại, sạc acquy.',
        },
      ],
    },
    {
      heading: 'Tác dụng sinh lí',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Tác dụng sinh lí',
          text: 'Dòng điện đi qua cơ thể người và động vật làm các cơ co giật, có thể làm tim ngừng đập, ngạt thở và thần kinh bị tê liệt. Đó là tác dụng sinh lí của dòng điện.',
        },
        {
          type: 'p',
          text: 'Ứng dụng: trong y học, dòng điện rất nhỏ, được kiểm soát chặt chẽ dùng để chữa bệnh: điện châm (châm cứu bằng điện) giúp giảm đau, gây tê; máy sốc điện (máy khử rung tim) dùng để cấp cứu người bị ngừng tim.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'An toàn điện',
          text: 'Dòng điện qua cơ thể có thể gây chết người. Không chạm vào dây điện trần, ổ cắm; không đến gần dây điện bị đứt rơi xuống đất, nhất là khi trời mưa; khi thấy người bị điện giật, phải ngắt nguồn điện trước rồi mới cứu, không dùng tay không kéo người bị nạn.',
        },
      ],
    },
    {
      heading: 'Tác dụng từ',
      blocks: [
        {
          type: 'p',
          text: 'Ở lớp 7, em đã chế tạo nam châm điện: một cuộn dây dẫn quấn quanh lõi sắt. Khi có dòng điện chạy qua, cuộn dây hút được đinh sắt, kim nam châm đặt gần bị lệch; ngắt dòng điện thì lực hút mất đi. Đó là tác dụng từ của dòng điện.',
        },
        {
          type: 'list',
          items: [
            'Chuông điện: dòng điện qua cuộn dây làm nó thành nam châm điện, hút thanh thép có gắn búa gõ vào chuông.',
            'Rơ-le: dòng điện nhỏ qua cuộn dây hút thanh kim loại, đóng hoặc ngắt một mạch điện khác.',
            'Quạt điện, máy bơm, máy giặt: động cơ điện quay nhờ tác dụng từ của dòng điện.',
          ],
        },
      ],
    },
  ],
  explore: {
    title: 'Thẻ thiết bị điện',
    instruction:
      'Chọn một thiết bị, bấm "Cho dòng điện chạy qua" và quan sát. Sau đó chọn tác dụng chính của dòng điện mà thiết bị dùng và bấm "Kiểm tra". Với đèn LED và bình mạ đồng, thử đảo chiều; với cầu chì, tăng số thiết bị đang bật.',
  },
  examples: [
    {
      problem:
        'Khi bóng đèn sợi đốt đang sáng, sờ gần vỏ bóng thấy rất nóng; còn bóng đèn LED đang sáng chỉ hơi ấm. Mỗi loại đèn cho thấy những tác dụng nào của dòng điện? Vì sao đèn LED tiết kiệm điện hơn?',
      steps: [
        'Đèn sợi đốt: dòng điện làm dây tóc nóng lên tới mức phát sáng, nên có tác dụng nhiệt và tác dụng phát sáng.',
        'Đèn LED: dòng điện làm điốt phát quang phát sáng khi còn nguội, nên chủ yếu là tác dụng phát sáng.',
        'Ở đèn sợi đốt, phần lớn năng lượng điện biến thành nhiệt (vô ích cho việc chiếu sáng); đèn LED biến phần lớn năng lượng điện thành ánh sáng.',
      ],
      answer:
        'Đèn sợi đốt: tác dụng nhiệt và phát sáng; đèn LED: tác dụng phát sáng. Đèn LED ít hao phí năng lượng dưới dạng nhiệt nên tiết kiệm điện hơn.',
    },
    {
      problem:
        'Muốn mạ đồng cho một chiếc chìa khóa bằng sắt, cần làm như thế nào? Đây là ứng dụng tác dụng nào của dòng điện?',
      steps: [
        'Kim loại dùng để mạ là đồng nên dùng dung dịch muối đồng, ví dụ dung dịch copper(II) sulfate.',
        'Đồng tách khỏi dung dịch và bám vào điện cực nối với cực âm của nguồn, nên nối chìa khóa với cực âm, điện cực còn lại (thanh đồng hoặc thỏi than) nối với cực dương.',
        'Nhúng cả hai vào dung dịch và cho dòng điện chạy qua một thời gian: lớp đồng bám dần lên chìa khóa.',
      ],
      answer:
        'Nối chìa khóa với cực âm, nhúng vào dung dịch copper(II) sulfate cùng điện cực nối với cực dương, cho dòng điện chạy qua. Đây là tác dụng hóa học của dòng điện.',
    },
  ],
  practice: [
    {
      type: 'match',
      prompt: 'Nối mỗi thiết bị với tác dụng chính của dòng điện mà nó sử dụng.',
      left: ['Ấm điện', 'Đèn LED', 'Bình mạ điện', 'Máy điện châm', 'Chuông điện'],
      right: [
        'Tác dụng phát sáng',
        'Tác dụng nhiệt',
        'Tác dụng sinh lí',
        'Tác dụng từ',
        'Tác dụng hóa học',
      ],
      pairs: [
        [0, 1],
        [1, 0],
        [2, 4],
        [3, 2],
        [4, 3],
      ],
      hints: [
        'Hỏi: khi có dòng điện chạy qua, thiết bị nóng lên, phát sáng, tách kim loại, tác động lên cơ thể, hay hút sắt?',
      ],
      solution:
        'Ấm điện: nhiệt. Đèn LED: phát sáng. Bình mạ điện: hóa học. Máy điện châm: sinh lí. Chuông điện: từ.',
    },
    {
      type: 'choice',
      prompt: 'Khi cho dòng điện chạy qua một đoạn dây sắt mảnh, dây nóng lên. Đó là',
      options: [
        'tác dụng nhiệt của dòng điện',
        'tác dụng hóa học của dòng điện',
        'tác dụng sinh lí của dòng điện',
        'tác dụng phát sáng của dòng điện',
      ],
      answer: 0,
      hints: ['Hiện tượng liên quan đến nhiệt độ của vật dẫn.'],
      solution: 'Vật dẫn nóng lên khi có dòng điện chạy qua là tác dụng nhiệt của dòng điện.',
    },
    {
      type: 'choice',
      prompt:
        'Cho dòng điện chạy qua dung dịch copper(II) sulfate bằng hai thỏi than. Sau vài phút, lớp đồng bám vào thỏi than nào?',
      options: [
        'Thỏi than nối với cực dương',
        'Thỏi than nối với cực âm',
        'Cả hai thỏi than',
        'Không thỏi nào, đồng nổi lên mặt dung dịch',
      ],
      answer: 1,
      hints: ['Trong mạ điện, vật cần mạ được nối với cực nào của nguồn?'],
      solution:
        'Đồng tách ra khỏi dung dịch và bám vào thỏi than nối với cực âm của nguồn điện (tác dụng hóa học).',
    },
    {
      type: 'choice',
      prompt:
        'Mắc đèn LED vào mạch, đóng công tắc nhưng đèn không sáng; đảo ngược hai đầu đèn thì đèn sáng. Giải thích nào đúng?',
      options: [
        'Pin yếu nên phải đảo đèn',
        'Đèn LED chỉ cho dòng điện đi qua theo một chiều nhất định',
        'Dây nối bị đứt',
        'Đèn LED cần nóng lên mới sáng',
      ],
      answer: 1,
      hints: ['Đèn LED khác bóng đèn sợi đốt ở chỗ nào khi đảo chiều mắc?'],
      solution:
        'Đèn LED chỉ cho dòng điện đi qua theo một chiều: chân dài (cực dương của LED) phải nối về phía cực dương của nguồn. Mắc ngược thì không có dòng điện, đèn không sáng.',
    },
    {
      type: 'multi',
      prompt: 'Bóng đèn sợi đốt đang sáng cho thấy những tác dụng nào của dòng điện?',
      options: ['Tác dụng nhiệt', 'Tác dụng phát sáng', 'Tác dụng hóa học', 'Tác dụng sinh lí'],
      answers: [0, 1],
      hints: ['Dây tóc bóng đèn có nóng không? Có phát sáng không?'],
      solution: 'Dây tóc nóng lên rất mạnh (tác dụng nhiệt) và phát sáng (tác dụng phát sáng).',
    },
    {
      type: 'choice',
      prompt:
        'Chạm vào dây điện trần (không có lớp vỏ cách điện), dòng điện truyền qua cơ thể gây co giật, có thể gây chết người. Đó là do',
      options: [
        'tác dụng sinh lí của dòng điện',
        'tác dụng hóa học của dòng điện',
        'tác dụng từ của dòng điện',
        'tác dụng phát sáng của dòng điện',
      ],
      answer: 0,
      hints: ['Tác dụng nào của dòng điện liên quan đến cơ thể người và động vật?'],
      solution:
        'Dòng điện đi qua cơ thể làm cơ co giật, có thể làm tim ngừng đập: đó là tác dụng sinh lí.',
    },
    {
      type: 'choice',
      prompt: 'Cầu chì bảo vệ mạch điện nhờ tác dụng nào của dòng điện?',
      options: ['Tác dụng từ', 'Tác dụng nhiệt', 'Tác dụng hóa học', 'Tác dụng phát sáng'],
      answer: 1,
      hints: ['Khi dòng điện quá lớn, dây chảy trong cầu chì bị làm sao?'],
      solution:
        'Khi dòng điện quá lớn, dây chảy nóng lên tới nóng chảy và đứt, ngắt mạch: cầu chì dùng tác dụng nhiệt.',
    },
    {
      type: 'choice',
      prompt: 'Nhận định nào sau đây đúng?',
      options: [
        'Dòng điện nào cũng có tác dụng phát sáng.',
        'Dòng điện chạy qua dung dịch copper(II) sulfate chỉ có tác dụng hóa học.',
        'Dòng điện chạy qua bất cứ vật dẫn nào cũng gây ra tác dụng nhiệt.',
        'Tác dụng nhiệt của dòng điện lúc nào cũng có ích.',
      ],
      answer: 2,
      hints: [
        'Dòng điện chạy qua dây dẫn trong nhà có làm nó sáng lên không? Có làm nó nóng lên chút nào không?',
      ],
      solution:
        'Mọi vật dẫn đều nóng lên ít nhiều khi có dòng điện chạy qua. Dòng điện không phải lúc nào cũng làm vật phát sáng; dung dịch copper(II) sulfate cũng nóng lên (tác dụng nhiệt) chứ không chỉ có tác dụng hóa học; tác dụng nhiệt ở máy tính, động cơ là không mong muốn.',
    },
    {
      type: 'text',
      prompt:
        'Dòng điện chạy qua cuộn dây quấn quanh lõi sắt làm nó hút được đinh sắt. Đó là tác dụng gì của dòng điện? (Trả lời một từ.)',
      accept: ['từ', 'tác dụng từ', 'tác dụng từ của dòng điện'],
      hints: ['Cuộn dây trở thành một loại nam châm.'],
      solution:
        'Cuộn dây có dòng điện chạy qua trở thành nam châm điện, hút đinh sắt: đó là tác dụng từ của dòng điện.',
    },
  ],
  takeaways: [
    'Tác dụng nhiệt: vật dẫn nóng lên khi có dòng điện chạy qua (bàn là, ấm điện, cầu chì).',
    'Tác dụng phát sáng: dòng điện làm đèn LED, dây tóc bóng đèn phát sáng; đèn LED chỉ cho dòng điện đi qua theo một chiều.',
    'Tác dụng hóa học: dòng điện qua dung dịch muối kim loại tách kim loại bám vào điện cực nối với cực âm (mạ điện).',
    'Tác dụng sinh lí: dòng điện qua cơ thể gây co giật, có thể gây chết người; dòng điện nhỏ được dùng để chữa bệnh.',
    'Tác dụng từ: cuộn dây có dòng điện chạy qua trở thành nam châm điện (chuông điện, rơ-le, động cơ điện).',
  ],
};
