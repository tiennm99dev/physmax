/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Năng lượng tái tạo là năng lượng có sẵn trong thiên nhiên, liên tục được bổ sung qua các quá trình tự nhiên, như năng lượng Mặt Trời, gió, nước, địa nhiệt, sinh khối; so với nhiên liệu hoá thạch, nó không cạn kiệt và ít gây ô nhiễm.',
  intro:
    'Than đá, dầu mỏ, khí tự nhiên phải mất hàng triệu năm mới hình thành, và đang bị khai thác ngày càng nhiều. Trong khi đó, mỗi ngày Mặt Trời vẫn chiếu sáng, gió vẫn thổi, sông vẫn chảy. Con người có thể dùng những nguồn năng lượng không bao giờ cạn ấy như thế nào?',
  objectives: [
    'Nêu được khái niệm năng lượng tái tạo và năng lượng không tái tạo; lấy được ví dụ.',
    'Kể được các nguồn năng lượng tái tạo: Mặt Trời, gió, nước, địa nhiệt, sinh khối và cách khai thác chúng.',
    'Nêu được ưu điểm của năng lượng tái tạo so với nhiên liệu hoá thạch, và hạn chế của một số nguồn tái tạo.',
  ],
  sections: [
    {
      heading: 'Năng lượng tái tạo và năng lượng không tái tạo',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Năng lượng tái tạo',
          text: 'Năng lượng tái tạo là năng lượng có sẵn trong thiên nhiên, liên tục được bổ sung thông qua các quá trình tự nhiên. Ví dụ: năng lượng Mặt Trời, năng lượng gió, năng lượng nước.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Năng lượng không tái tạo',
          text: 'Năng lượng từ than đá, dầu mỏ, khí tự nhiên (nhiên liệu hoá thạch) cần hàng triệu năm để hình thành; khai thác mãi sẽ cạn kiệt, nên gọi là năng lượng không tái tạo.',
        },
      ],
    },
    {
      heading: 'Các nguồn năng lượng tái tạo',
      blocks: [
        {
          type: 'table',
          caption: 'Một số nguồn năng lượng tái tạo',
          head: ['Nguồn', 'Có được từ', 'Cách khai thác', 'Ở Việt Nam'],
          rows: [
            [
              'Năng lượng Mặt Trời',
              'Ánh sáng và nhiệt của Mặt Trời',
              'Pin Mặt Trời tạo điện; máy nước nóng năng lượng Mặt Trời',
              'Các cánh đồng điện Mặt Trời ở duyên hải Nam Trung Bộ',
            ],
            [
              'Năng lượng gió',
              'Không khí chuyển động',
              'Tua bin gió (cối xay gió) quay máy phát điện',
              'Điện gió ven biển đồng bằng sông Cửu Long',
            ],
            [
              'Năng lượng nước',
              'Dòng nước chảy, thác nước, sóng biển, thuỷ triều',
              'Đắp đập giữ nước trên cao, cho nước chảy xuống quay tua bin',
              'Thuỷ điện Hoà Bình, Sơn La trên sông Đà',
            ],
            [
              'Năng lượng địa nhiệt',
              'Sức nóng bên trong lòng Trái Đất',
              'Dùng hơi nóng, nước nóng từ lòng đất để sưởi, phát điện',
              'Các suối nước nóng',
            ],
            [
              'Năng lượng sinh khối',
              'Gỗ, rơm rạ, bã mía, phân, chất thải hữu cơ',
              'Đốt trực tiếp hoặc ủ thành khí sinh học (biogas)',
              'Hầm biogas ở nông thôn',
            ],
          ],
        },
        {
          type: 'p',
          text: 'Nhà máy thuỷ điện dùng thế năng của nước giữ trên cao: nước chảy xuống, thế năng chuyển hoá thành động năng làm quay tua bin, tua bin quay máy phát tạo ra điện năng. Tua bin gió dùng động năng của gió; pin Mặt Trời biến quang năng thành điện năng.',
        },
      ],
    },
    {
      heading: 'Ưu điểm và hạn chế',
      blocks: [
        {
          type: 'list',
          items: [
            'Không cạn kiệt: được thiên nhiên bổ sung liên tục.',
            'Ít gây ô nhiễm: không thải nhiều khói, bụi và khí carbon dioxide như khi đốt than, dầu; góp phần giảm hiệu ứng nhà kính, giảm biến đổi khí hậu.',
            'Có sẵn ở nhiều nơi, giúp giảm phụ thuộc vào than, dầu.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Hạn chế',
          text: 'Một số nguồn phụ thuộc vào thời tiết: pin Mặt Trời không phát điện ban đêm, phát ít khi trời nhiều mây; tua bin gió đứng yên khi lặng gió; hồ thuỷ điện ít nước vào mùa khô. Vì vậy cần kết hợp nhiều nguồn và có cách tích trữ điện.',
        },
      ],
    },
  ],
  explore: {
    title: 'Thành phố chạy bằng năng lượng tái tạo',
    instruction:
      'Chọn một nguồn điện (pin Mặt Trời, tua bin gió, thuỷ điện), rồi chạm vào ô trên bản đồ để xây. Mỗi nguồn hợp với một số địa điểm. Theo dõi thanh sản lượng: nguồn tái tạo đã đủ cho nhu cầu của thành phố (vạch đỏ) chưa? Đổi bầu trời, gió và mùa để thấy sản lượng thay đổi; phần thiếu phải lấy từ nhà máy nhiệt điện than.',
  },
  examples: [
    {
      problem:
        'Trong các nguồn năng lượng sau, nguồn nào là năng lượng tái tạo, nguồn nào không tái tạo: gió, than đá, ánh sáng Mặt Trời, dầu mỏ, dòng nước sông?',
      steps: [
        'Gió, ánh sáng Mặt Trời, dòng nước sông có sẵn trong thiên nhiên và liên tục được bổ sung: năng lượng tái tạo.',
        'Than đá, dầu mỏ là nhiên liệu hoá thạch, cần hàng triệu năm để hình thành, sẽ cạn kiệt: năng lượng không tái tạo.',
      ],
      answer: 'Tái tạo: gió, ánh sáng Mặt Trời, dòng nước sông. Không tái tạo: than đá, dầu mỏ.',
    },
    {
      problem:
        'Một thành phố cần $80\\ \\text{MW}$ điện vào ban đêm. Ban đêm trời lặng gió, chỉ có nhà máy thuỷ điện phát được $15\\ \\text{MW}$. a) Vì sao pin Mặt Trời và tua bin gió không phát điện? b) Nhà máy nhiệt điện than phải phát bù bao nhiêu?',
      steps: [
        'a) Ban đêm không có ánh sáng Mặt Trời nên pin Mặt Trời không phát điện; trời lặng gió nên tua bin gió không quay.',
        'b) Phần thiếu: $80 - 15 = 65\\ \\text{MW}$, nhà máy nhiệt điện than phải phát bù.',
      ],
      answer: 'a) Vì không có ánh sáng và không có gió. b) $65\\ \\text{MW}$.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Năng lượng tái tạo là',
      options: [
        'năng lượng lấy từ than đá, dầu mỏ, khí tự nhiên',
        'năng lượng có sẵn trong thiên nhiên, liên tục được bổ sung qua các quá trình tự nhiên',
        'năng lượng chỉ dùng được một lần rồi hết',
        'năng lượng do con người tự tạo ra từ không có gì',
      ],
      answer: 1,
      hints: ['"Tái tạo" nghĩa là được tạo lại, bổ sung lại.'],
      solution:
        'Năng lượng tái tạo là năng lượng có sẵn trong thiên nhiên, liên tục được bổ sung qua các quá trình tự nhiên.',
    },
    {
      type: 'multi',
      prompt: 'Những nguồn năng lượng nào là năng lượng tái tạo?',
      options: [
        'Năng lượng gió',
        'Than đá',
        'Năng lượng Mặt Trời',
        'Dầu mỏ',
        'Năng lượng địa nhiệt',
        'Khí tự nhiên',
      ],
      answers: [0, 2, 4],
      hints: ['Than đá, dầu mỏ, khí tự nhiên là nhiên liệu hoá thạch.'],
      solution:
        'Gió, Mặt Trời, địa nhiệt là năng lượng tái tạo. Than đá, dầu mỏ, khí tự nhiên là nhiên liệu hoá thạch, không tái tạo.',
    },
    {
      type: 'match',
      prompt: 'Ghép mỗi thiết bị, công trình với nguồn năng lượng tái tạo mà nó khai thác.',
      left: ['Pin Mặt Trời', 'Tua bin gió', 'Đập thuỷ điện', 'Hầm biogas'],
      right: ['Năng lượng nước', 'Năng lượng sinh khối', 'Năng lượng Mặt Trời', 'Năng lượng gió'],
      pairs: [
        [0, 2],
        [1, 3],
        [2, 0],
        [3, 1],
      ],
      hints: ['Biogas được ủ từ phân và chất thải hữu cơ.'],
      solution:
        'Pin Mặt Trời: năng lượng Mặt Trời. Tua bin gió: năng lượng gió. Đập thuỷ điện: năng lượng nước. Hầm biogas: năng lượng sinh khối.',
    },
    {
      type: 'choice',
      prompt: 'Ưu điểm lớn nhất của năng lượng tái tạo so với nhiên liệu hoá thạch là',
      options: [
        'luôn phát điện đều đặn suốt ngày đêm',
        'chỉ có ở một vài nước',
        'không cạn kiệt và ít gây ô nhiễm môi trường',
        'thải nhiều khí carbon dioxide hơn',
      ],
      answer: 2,
      hints: ['Than, dầu sẽ cạn và khi đốt thải nhiều khói, khí.'],
      solution:
        'Năng lượng tái tạo được thiên nhiên bổ sung liên tục nên không cạn kiệt, và ít thải khí, bụi gây ô nhiễm như khi đốt than, dầu.',
    },
    {
      type: 'choice',
      prompt: 'Vì sao một thành phố không thể chỉ dùng pin Mặt Trời để có điện suốt ngày đêm?',
      options: [
        'Vì pin Mặt Trời gây ô nhiễm nặng',
        'Vì ánh sáng Mặt Trời sắp cạn kiệt',
        'Vì pin Mặt Trời chỉ tạo ra nhiệt năng',
        'Vì ban đêm và khi trời nhiều mây, pin Mặt Trời không phát hoặc phát rất ít điện',
      ],
      answer: 3,
      hints: ['Pin Mặt Trời biến quang năng thành điện năng. Ban đêm có ánh sáng Mặt Trời không?'],
      solution:
        'Pin Mặt Trời cần ánh sáng: ban đêm không phát điện, trời nhiều mây phát ít. Cần kết hợp với nguồn khác và tích trữ điện.',
    },
    {
      type: 'order',
      prompt: 'Sắp xếp các bước để nhà máy thuỷ điện tạo ra điện.',
      items: [
        'Tua bin quay làm máy phát quay, tạo ra điện năng',
        'Đắp đập giữ nước ở trên cao',
        'Nước chảy mạnh xuống, đập vào cánh tua bin',
      ],
      answer: [1, 2, 0],
      hints: ['Nước phải có thế năng trước, rồi mới chuyển thành động năng.'],
      solution:
        'Đắp đập giữ nước trên cao (thế năng) → nước chảy xuống (động năng) đập vào tua bin → tua bin quay máy phát, tạo ra điện năng.',
    },
    {
      type: 'number',
      prompt:
        'Ban ngày, một thành phố cần $100\\ \\text{MW}$ điện. Các tấm pin Mặt Trời phát $40\\ \\text{MW}$, tua bin gió phát $24\\ \\text{MW}$, thuỷ điện phát $30\\ \\text{MW}$. Nhà máy nhiệt điện than phải phát bù bao nhiêu megaoát?',
      answer: 6,
      unit: 'MW',
      hints: ['Cộng sản lượng ba nguồn tái tạo, rồi so với nhu cầu.'],
      solution:
        'Nguồn tái tạo: $40 + 24 + 30 = 94\\ \\text{MW}$. Phải bù: $100 - 94 = 6\\ \\text{MW}$.',
    },
    {
      type: 'choice',
      prompt: 'Nhà máy thuỷ điện khai thác dạng năng lượng nào của nước?',
      options: [
        'Năng lượng hoá học của nước',
        'Thế năng của nước giữ trên cao, chuyển hoá thành động năng khi nước chảy xuống',
        'Quang năng của nước',
        'Nhiệt năng của nước nóng',
      ],
      answer: 1,
      hints: ['Vì sao phải đắp đập để giữ nước ở trên cao?'],
      solution:
        'Đập giữ nước trên cao để nước có thế năng hấp dẫn lớn; khi nước chảy xuống, thế năng chuyển hoá thành động năng làm quay tua bin.',
    },
  ],
  takeaways: [
    'Năng lượng tái tạo có sẵn trong thiên nhiên, liên tục được bổ sung: Mặt Trời, gió, nước, địa nhiệt, sinh khối.',
    'Than đá, dầu mỏ, khí tự nhiên là nhiên liệu hoá thạch, nguồn năng lượng không tái tạo, sẽ cạn kiệt và gây ô nhiễm khi đốt.',
    'Năng lượng tái tạo không cạn kiệt, ít gây ô nhiễm; nhưng một số nguồn phụ thuộc thời tiết nên cần kết hợp nhiều nguồn.',
  ],
};
