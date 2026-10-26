/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Ánh sáng gặp một bề mặt nhẵn bóng thì bị hắt trở lại: đó là sự phản xạ ánh sáng. Định luật phản xạ ánh sáng: tia phản xạ nằm trong mặt phẳng chứa tia tới và pháp tuyến tại điểm tới; góc phản xạ bằng góc tới. Mặt nhẵn cho phản xạ gương, mặt gồ ghề cho phản xạ khuếch tán.',
  intro:
    'Buổi sáng, mặt hồ phẳng lặng in rõ hàng cây bên bờ, còn bức tường trắng bên cạnh thì không in hình gì cả, dù cả hai đều hắt ánh sáng Mặt Trời vào mắt ta. Ánh sáng bị hắt lại theo quy luật nào, và vì sao hai bề mặt ấy lại khác nhau như vậy?',
  objectives: [
    'Nêu được các khái niệm: tia tới, tia phản xạ, điểm tới, pháp tuyến, góc tới, góc phản xạ, mặt phẳng tới.',
    'Phát biểu được định luật phản xạ ánh sáng và vận dụng để tính góc, vẽ tia phản xạ.',
    'Phân biệt được phản xạ (phản xạ gương) và phản xạ khuếch tán.',
  ],
  sections: [
    {
      heading: 'Hiện tượng phản xạ ánh sáng',
      blocks: [
        {
          type: 'p',
          text: 'Chiếu một tia sáng từ đèn laser tới một gương phẳng $G$. Ta thấy tia sáng bị gương hắt trở lại theo một hướng xác định. Hiện tượng ánh sáng bị hắt trở lại khi gặp một bề mặt nhẵn bóng gọi là hiện tượng phản xạ ánh sáng.',
        },
        {
          type: 'table',
          caption: 'Các kí hiệu dùng khi vẽ sự phản xạ ánh sáng trên gương phẳng',
          head: ['Kí hiệu', 'Tên gọi', 'Ý nghĩa'],
          rows: [
            ['$SI$', 'Tia tới', 'Tia sáng chiếu tới gương'],
            ['$IR$', 'Tia phản xạ', 'Tia sáng bị gương hắt trở lại'],
            ['$I$', 'Điểm tới', 'Giao điểm của tia tới với mặt gương'],
            ['$IN$', 'Pháp tuyến', 'Đường thẳng vuông góc với mặt gương tại điểm tới'],
            ['$i = \\widehat{SIN}$', 'Góc tới', 'Góc hợp bởi tia tới và pháp tuyến'],
            ["$i' = \\widehat{NIR}$", 'Góc phản xạ', 'Góc hợp bởi tia phản xạ và pháp tuyến'],
          ],
        },
        {
          type: 'p',
          text: 'Mặt phẳng chứa tia tới $SI$ và pháp tuyến $IN$ gọi là mặt phẳng tới.',
        },
      ],
    },
    {
      heading: 'Định luật phản xạ ánh sáng',
      blocks: [
        {
          type: 'p',
          text: "Thí nghiệm: đặt gương phẳng vuông góc với mặt một tấm bảng có vẽ thước đo góc, pháp tuyến $IN$ trùng vạch $0^\\circ$. Chiếu tia tới $SI$ là lá sát mặt bảng với các góc tới $i$ khác nhau rồi đọc góc phản xạ $i'$. Kết quả: tia phản xạ luôn nằm trên mặt bảng (cùng mặt phẳng với tia tới và pháp tuyến) và $i'$ luôn bằng $i$.",
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Định luật phản xạ ánh sáng',
          text: 'Tia phản xạ nằm trong mặt phẳng chứa tia tới và pháp tuyến của gương ở điểm tới (mặt phẳng tới). Góc phản xạ bằng góc tới.',
        },
        { type: 'tex', tex: "i' = i" },
        {
          type: 'list',
          items: [
            'Góc tới và góc phản xạ đo từ pháp tuyến, không đo từ mặt gương. Nếu tia tới hợp với mặt gương góc $\\alpha$ thì góc tới là $i = 90^\\circ - \\alpha$.',
            'Tia tới vuông góc với gương ($i = 0^\\circ$) thì tia phản xạ bật ngược trở lại theo đường cũ.',
            "Góc hợp bởi tia tới và tia phản xạ là $\\widehat{SIR} = i + i' = 2i$.",
          ],
        },
        {
          type: 'p',
          text: 'Cách vẽ tia phản xạ khi biết tia tới $SI$: dựng pháp tuyến $IN$ vuông góc với gương tại $I$; đo góc tới $i = \\widehat{SIN}$; vẽ tia $IR$ ở phía bên kia pháp tuyến sao cho $\\widehat{NIR} = i$.',
        },
      ],
    },
    {
      heading: 'Phản xạ gương và phản xạ khuếch tán',
      blocks: [
        {
          type: 'table',
          head: ['Đặc điểm', 'Phản xạ (phản xạ gương)', 'Phản xạ khuếch tán'],
          rows: [
            ['Bề mặt', 'Nhẵn bóng', 'Gồ ghề, không nhẵn'],
            [
              'Chùm tia tới song song',
              'Cho chùm tia phản xạ song song, theo một hướng',
              'Bị phản xạ theo mọi hướng',
            ],
            ['Nhìn vào bề mặt', 'Thấy ảnh của vật', 'Không thấy ảnh của vật'],
            [
              'Ví dụ',
              'Mặt gương, mặt nước yên lặng, tấm kim loại nhẵn bóng',
              'Trang giấy, bức tường quét vôi, mặt bàn gỗ thô',
            ],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Ở phản xạ khuếch tán, từng phần rất nhỏ của bề mặt vẫn tuân theo định luật phản xạ ánh sáng. Nhưng các phần nhỏ đó nghiêng theo những hướng khác nhau nên các tia phản xạ đi theo mọi hướng. Nhờ phản xạ khuếch tán mà ta nhìn thấy trang sách, bức tường từ mọi phía.',
        },
        { type: 'widget', name: 'surface-sorter' },
      ],
    },
  ],
  explore: {
    title: 'Đèn laser và gương phẳng',
    instruction:
      'Kéo đèn laser theo vòng tròn (hoặc dùng phím mũi tên) để đổi góc tới và đọc góc phản xạ. Xoay đèn sao cho tia phản xạ đi trúng ngôi sao. Sau đó chọn "Chùm song song" và đổi sang "Mặt gồ ghề" để so sánh phản xạ gương với phản xạ khuếch tán.',
  },
  examples: [
    {
      problem:
        'Chiếu một tia sáng $SI$ tới gương phẳng, tia tới hợp với mặt gương một góc $40^\\circ$. Tính góc tới, góc phản xạ và góc hợp bởi tia tới với tia phản xạ.',
      steps: [
        'Pháp tuyến $IN$ vuông góc với mặt gương, nên góc tới là $i = 90^\\circ - 40^\\circ = 50^\\circ$.',
        "Theo định luật phản xạ ánh sáng, góc phản xạ $i' = i = 50^\\circ$.",
        "Góc hợp bởi tia tới và tia phản xạ: $\\widehat{SIR} = i + i' = 50^\\circ + 50^\\circ = 100^\\circ$.",
      ],
      answer: "$i = 50^\\circ$, $i' = 50^\\circ$, $\\widehat{SIR} = 100^\\circ$.",
    },
    {
      problem:
        'Góc hợp bởi tia tới $SI$ và tia phản xạ $IR$ trên một gương phẳng là $70^\\circ$. Tính góc tới và cho biết cách vẽ tia phản xạ.',
      steps: [
        "Pháp tuyến $IN$ chia góc $\\widehat{SIR}$ thành hai góc $i$ và $i'$ bằng nhau.",
        "Do đó $i = i' = \\dfrac{70^\\circ}{2} = 35^\\circ$.",
        'Vẽ: dựng pháp tuyến $IN$ tại $I$, vẽ tia tới $SI$ hợp với $IN$ góc $35^\\circ$, rồi vẽ tia phản xạ $IR$ ở phía bên kia $IN$ cũng hợp với $IN$ góc $35^\\circ$.',
      ],
      answer: "Góc tới $i = 35^\\circ$ (góc phản xạ $i' = 35^\\circ$).",
    },
    {
      problem:
        'Vì sao ta soi được mặt mình trong gương nhưng không soi được trên một tờ giấy trắng, dù tờ giấy cũng hắt lại rất nhiều ánh sáng?',
      steps: [
        'Mặt gương nhẵn bóng: chùm sáng từ mặt ta tới gương bị phản xạ thành chùm song song theo một hướng (phản xạ gương), nên mắt nhận được chùm sáng có trật tự và thấy ảnh.',
        'Mặt tờ giấy gồ ghề (nhìn qua kính lúp thấy rõ các sợi giấy): mỗi phần nhỏ nghiêng một kiểu nên ánh sáng bị hắt lại theo mọi hướng (phản xạ khuếch tán).',
        'Ánh sáng tới mắt từ tờ giấy bị xáo trộn, không tạo thành ảnh; ta chỉ thấy tờ giấy sáng trắng.',
      ],
      answer:
        'Gương cho phản xạ gương nên thấy ảnh; tờ giấy cho phản xạ khuếch tán nên không thấy ảnh.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Phát biểu nào sau đây đúng với định luật phản xạ ánh sáng?',
      options: [
        'Góc phản xạ bằng góc tới; tia phản xạ nằm trong mặt phẳng chứa tia tới và pháp tuyến tại điểm tới.',
        'Góc phản xạ lớn hơn góc tới; tia phản xạ nằm trong mặt phẳng tới.',
        'Góc phản xạ bằng góc tới; tia phản xạ vuông góc với tia tới.',
        'Góc tới là góc hợp bởi tia tới và mặt gương.',
      ],
      answer: 0,
      hints: ['Định luật có hai ý: tia phản xạ nằm ở đâu, và hai góc liên hệ với nhau thế nào.'],
      solution:
        'Tia phản xạ nằm trong mặt phẳng chứa tia tới và pháp tuyến tại điểm tới; góc phản xạ bằng góc tới. Góc tới đo từ pháp tuyến, không phải từ mặt gương.',
    },
    {
      type: 'number',
      prompt:
        'Chiếu một tia sáng tới gương phẳng với góc tới $35^\\circ$. Góc phản xạ bằng bao nhiêu độ?',
      answer: 35,
      unit: '°',
      hints: ['Góc phản xạ so với góc tới thì thế nào?'],
      solution: "Theo định luật phản xạ ánh sáng, $i' = i = 35^\\circ$.",
    },
    {
      type: 'number',
      prompt:
        'Một tia sáng chiếu tới gương phẳng, hợp với mặt gương một góc $30^\\circ$. Góc phản xạ bằng bao nhiêu độ?',
      answer: 60,
      unit: '°',
      hints: [
        'Góc tới đo từ pháp tuyến, mà pháp tuyến vuông góc với mặt gương.',
        'Góc tới bằng $90^\\circ - 30^\\circ$.',
      ],
      solution: "$i = 90^\\circ - 30^\\circ = 60^\\circ$, nên $i' = i = 60^\\circ$.",
    },
    {
      type: 'number',
      prompt:
        'Góc hợp bởi tia tới và tia phản xạ trên một gương phẳng là $80^\\circ$. Góc tới bằng bao nhiêu độ?',
      answer: 40,
      unit: '°',
      hints: ['Pháp tuyến chia góc giữa tia tới và tia phản xạ thành hai góc bằng nhau.'],
      solution: "$i + i' = 80^\\circ$ và $i' = i$, nên $i = \\dfrac{80^\\circ}{2} = 40^\\circ$.",
    },
    {
      type: 'number',
      prompt:
        'Tia tới $SI$ hợp với tia phản xạ $IR$ một góc $120^\\circ$. Tia phản xạ hợp với mặt gương một góc bao nhiêu độ?',
      answer: 30,
      unit: '°',
      hints: [
        'Tính góc phản xạ trước: nó bằng một nửa góc $\\widehat{SIR}$.',
        'Góc giữa tia phản xạ và mặt gương bằng $90^\\circ$ trừ góc phản xạ.',
      ],
      solution:
        "$i' = \\dfrac{120^\\circ}{2} = 60^\\circ$. Tia phản xạ hợp với mặt gương góc $90^\\circ - 60^\\circ = 30^\\circ$.",
    },
    {
      type: 'choice',
      prompt: 'Chiếu tia sáng vuông góc với mặt gương phẳng thì tia phản xạ',
      options: [
        'đi là là sát mặt gương.',
        'bật ngược trở lại theo đường cũ.',
        'hợp với tia tới một góc $90^\\circ$.',
        'không có, vì ánh sáng đi xuyên qua gương.',
      ],
      answer: 1,
      hints: ['Tia tới trùng pháp tuyến thì góc tới bằng bao nhiêu?'],
      solution:
        "Tia tới vuông góc với gương thì trùng pháp tuyến, $i = 0^\\circ$, nên $i' = 0^\\circ$: tia phản xạ cũng nằm trên pháp tuyến, bật ngược lại theo đường cũ.",
    },
    {
      type: 'multi',
      prompt: 'Bề mặt nào sau đây cho phản xạ gương (nhìn vào thấy được ảnh của vật)?',
      options: [
        'Mặt nước hồ yên lặng',
        'Bức tường quét vôi',
        'Tấm inox nhẵn bóng',
        'Trang giấy vở',
        'Mặt kính cửa sổ sạch',
        'Mặt đường nhựa',
      ],
      answers: [0, 2, 4],
      hints: ['Phản xạ gương xảy ra trên bề mặt nhẵn bóng.'],
      solution:
        'Mặt nước yên lặng, tấm inox nhẵn bóng và mặt kính sạch là bề mặt nhẵn nên cho phản xạ gương. Tường vôi, giấy vở, mặt đường gồ ghề nên cho phản xạ khuếch tán.',
    },
    {
      type: 'choice',
      prompt: 'Khi chiếu một chùm sáng song song tới một bề mặt gồ ghề thì',
      options: [
        'chùm phản xạ là chùm song song.',
        'chùm phản xạ là chùm hội tụ tại một điểm.',
        'các tia phản xạ đi theo mọi hướng.',
        'ánh sáng không bị phản xạ.',
      ],
      answer: 2,
      hints: ['Mỗi phần nhỏ của bề mặt gồ ghề nghiêng một kiểu khác nhau.'],
      solution:
        'Các phần nhỏ của bề mặt gồ ghề nghiêng khác nhau nên các tia phản xạ đi theo mọi hướng: đó là phản xạ khuếch tán.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi kí hiệu với tên gọi đúng của nó.',
      left: ['$SI$', '$IR$', '$IN$', '$\\widehat{SIN}$'],
      right: ['Tia tới', 'Tia phản xạ', 'Pháp tuyến', 'Góc tới', 'Góc phản xạ'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['$S$ là phía nguồn sáng, $R$ là phía tia bị hắt lại, $N$ nằm trên pháp tuyến.'],
      solution:
        '$SI$ là tia tới, $IR$ là tia phản xạ, $IN$ là pháp tuyến, $\\widehat{SIN}$ là góc tới. Góc phản xạ là $\\widehat{NIR}$.',
    },
  ],
  takeaways: [
    'Ánh sáng gặp bề mặt nhẵn bóng bị hắt trở lại: hiện tượng phản xạ ánh sáng.',
    "Định luật phản xạ ánh sáng: tia phản xạ nằm trong mặt phẳng tới; góc phản xạ bằng góc tới, $i' = i$.",
    'Góc tới và góc phản xạ đo từ pháp tuyến $IN$, không đo từ mặt gương.',
    'Mặt nhẵn cho phản xạ gương (thấy ảnh); mặt gồ ghề cho phản xạ khuếch tán, ánh sáng bị hắt lại theo mọi hướng.',
  ],
};
