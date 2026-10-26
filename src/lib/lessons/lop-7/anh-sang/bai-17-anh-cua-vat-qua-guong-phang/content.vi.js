/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Ảnh của một vật tạo bởi gương phẳng là ảnh ảo, không hứng được trên màn chắn, và lớn bằng vật. Khoảng cách từ một điểm của vật đến gương bằng khoảng cách từ ảnh của điểm đó đến gương: ảnh và vật đối xứng nhau qua gương phẳng. Có thể vẽ ảnh bằng định luật phản xạ ánh sáng hoặc bằng tính đối xứng.',
  intro:
    'Đứng trước gương, em thấy "một bạn" giống hệt mình đứng phía sau mặt gương. Em tiến lại gần, bạn ấy cũng tiến lại gần; em giơ tay phải, bạn ấy giơ tay ở phía đối diện. Ảnh trong gương thật ra ở đâu, to bằng bao nhiêu, và có sờ hay hứng được nó không?',
  objectives: [
    'Nêu được tính chất ảnh của vật qua gương phẳng: ảnh ảo, lớn bằng vật, đối xứng với vật qua gương.',
    'Vẽ được ảnh của một điểm, một vật qua gương phẳng bằng hai cách: dùng định luật phản xạ và dùng tính đối xứng.',
    'Vận dụng tính chất ảnh để tính khoảng cách và kích thước ảnh.',
  ],
  sections: [
    {
      heading: 'Tính chất ảnh của vật qua gương phẳng',
      blocks: [
        {
          type: 'p',
          text: 'Thí nghiệm: đặt một tấm kính phẳng thẳng đứng trên mặt bàn (tấm kính vừa phản xạ ánh sáng như gương, vừa cho nhìn xuyên qua). Đặt cây nến thứ nhất đang cháy trước tấm kính. Di chuyển cây nến thứ hai giống hệt (không cháy) ở phía sau tấm kính cho đến khi nó trùng khít với ảnh của cây nến thứ nhất: nhìn qua kính thấy nến thứ hai như cũng đang cháy.',
        },
        {
          type: 'list',
          items: [
            'Đặt một màn chắn ở chỗ có ảnh: không hứng được ảnh trên màn.',
            'Cây nến thứ hai trùng khít với ảnh: ảnh lớn bằng vật.',
            'Đo khoảng cách: từ nến thứ nhất đến tấm kính bằng từ nến thứ hai (vị trí ảnh) đến tấm kính; đường nối chúng vuông góc với tấm kính.',
          ],
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Tính chất ảnh tạo bởi gương phẳng',
          text: 'Ảnh của một vật tạo bởi gương phẳng là ảnh ảo, không hứng được trên màn chắn, và có độ lớn bằng vật. Khoảng cách từ một điểm của vật đến gương phẳng bằng khoảng cách từ ảnh của điểm đó đến gương.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Ảnh đối xứng với vật qua gương',
          text: "Ảnh $S'$ của điểm $S$ nằm trên đường thẳng đi qua $S$ và vuông góc với gương, ở phía sau gương, với $HS' = HS$ ($H$ là chân đường vuông góc). Ta nói ảnh và vật đối xứng nhau qua gương phẳng. Vì vậy ảnh của chữ, của bàn tay phải trong gương bị đảo trái phải.",
        },
        {
          type: 'p',
          text: 'Ảnh là ảnh ảo vì không có ánh sáng nào thật sự đi tới chỗ có ảnh: phía sau gương không có ánh sáng. Mắt nhận được các tia phản xạ, mà đường kéo dài của chúng gặp nhau tại ảnh, nên ta thấy như ánh sáng phát ra từ ảnh.',
        },
      ],
    },
    {
      heading: 'Vẽ ảnh của vật qua gương phẳng',
      blocks: [
        {
          type: 'p',
          text: "Cách 1: dựa vào định luật phản xạ ánh sáng. Từ điểm sáng $S$ vẽ hai tia tới bất kì $SI$ và $SK$ đến gương. Tại mỗi điểm tới, dựng pháp tuyến rồi vẽ tia phản xạ $IR$, $KR'$ sao cho góc phản xạ bằng góc tới. Kéo dài hai tia phản xạ về phía sau gương (nét đứt), chúng cắt nhau tại $S'$: đó là ảnh của $S$.",
        },
        {
          type: 'p',
          text: "Cách 2: dựa vào tính chất đối xứng. Từ $S$ kẻ đường vuông góc $SH$ xuống gương và kéo dài về phía sau gương. Lấy điểm $S'$ trên đó sao cho $HS' = HS$. $S'$ là ảnh của $S$.",
        },
        {
          type: 'p',
          text: "Muốn vẽ ảnh của một vật $AB$, ta vẽ ảnh $A'$ của $A$ và ảnh $B'$ của $B$ rồi nối $A'B'$ bằng nét đứt (vì là ảnh ảo).",
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Vùng nhìn thấy',
          text: "Mắt nhìn thấy ảnh $S'$ khi có tia phản xạ đi vào mắt, tức là đường thẳng nối mắt với ảnh $S'$ phải cắt mặt gương. Nếu điểm cắt rơi ra ngoài mép gương, mắt không thấy ảnh của điểm đó.",
        },
      ],
    },
  ],
  explore: {
    title: 'Vật và ảnh trước gương phẳng',
    instruction:
      'Kéo hai điểm A, B của vật và kéo mắt. Quan sát ảnh A′B′ (nét đứt) di chuyển đối xứng với vật, cùng các tia phản xạ đi vào mắt. Đếm ô để so sánh khoảng cách từ vật và từ ảnh đến gương. Chọn "Tự vẽ ảnh" để tự đặt A′, B′ rồi kiểm tra.',
  },
  examples: [
    {
      problem:
        'Một cây bút chì dài $15\\ \\text{cm}$ đặt thẳng đứng trước một gương phẳng thẳng đứng, cách gương $20\\ \\text{cm}$. Ảnh của bút chì cao bao nhiêu, cách gương bao nhiêu và cách bút chì bao nhiêu?',
      steps: [
        'Ảnh tạo bởi gương phẳng lớn bằng vật, nên ảnh cao $15\\ \\text{cm}$.',
        'Ảnh và vật cách gương bằng nhau, nên ảnh cách gương $20\\ \\text{cm}$, ở phía sau gương.',
        'Khoảng cách từ bút chì đến ảnh: $20 + 20 = 40\\ \\text{(cm)}$.',
      ],
      answer:
        'Ảnh cao $15\\ \\text{cm}$, cách gương $20\\ \\text{cm}$ và cách bút chì $40\\ \\text{cm}$.',
    },
    {
      problem:
        'Bạn Lan đứng cách gương phẳng $1{,}2\\ \\text{m}$ rồi lùi ra xa gương thêm $0{,}3\\ \\text{m}$. Khi đó Lan cách ảnh của mình bao nhiêu mét?',
      steps: [
        'Sau khi lùi, Lan cách gương $1{,}2 + 0{,}3 = 1{,}5\\ \\text{(m)}$.',
        'Ảnh cách gương bằng Lan cách gương: $1{,}5\\ \\text{m}$, ở phía sau gương.',
        'Khoảng cách từ Lan đến ảnh: $1{,}5 + 1{,}5 = 3\\ \\text{(m)}$.',
      ],
      answer: 'Lan cách ảnh của mình $3\\ \\text{m}$.',
    },
    {
      problem:
        "Trên giấy kẻ ô vuông, điểm sáng $S$ cách gương phẳng $3$ ô. Hãy vẽ ảnh $S'$ của $S$ bằng tính chất đối xứng và kiểm tra bằng định luật phản xạ.",
      steps: [
        'Từ $S$ kẻ đường vuông góc với gương tại $H$, kéo dài sang phía sau gương.',
        "Đếm $3$ ô từ $H$ về phía sau gương, đánh dấu $S'$: $HS' = HS = 3$ ô.",
        "Kiểm tra: vẽ một tia tới $SI$ bất kì và tia phản xạ $IR$ theo định luật phản xạ; đường kéo dài của $IR$ ra sau gương đi qua đúng $S'$.",
      ],
      answer: "$S'$ nằm sau gương, trên đường vuông góc kẻ từ $S$, cách gương $3$ ô.",
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Ảnh của một vật tạo bởi gương phẳng là',
      options: [
        'ảnh thật, hứng được trên màn, lớn bằng vật.',
        'ảnh ảo, không hứng được trên màn, lớn bằng vật.',
        'ảnh ảo, không hứng được trên màn, nhỏ hơn vật.',
        'ảnh thật, không hứng được trên màn, lớn hơn vật.',
      ],
      answer: 1,
      hints: ['Nhớ lại thí nghiệm với tấm kính và hai cây nến giống hệt nhau.'],
      solution: 'Ảnh tạo bởi gương phẳng là ảnh ảo, không hứng được trên màn chắn và lớn bằng vật.',
    },
    {
      type: 'number',
      prompt:
        'Một quả táo đặt trước gương phẳng, cách gương $30\\ \\text{cm}$. Ảnh của quả táo cách gương bao nhiêu xentimét?',
      answer: 30,
      unit: 'cm',
      hints: ['So sánh khoảng cách từ vật đến gương và từ ảnh đến gương.'],
      solution: 'Ảnh và vật cách gương bằng nhau, nên ảnh cách gương $30\\ \\text{cm}$.',
    },
    {
      type: 'number',
      prompt:
        'Một người đứng cách gương phẳng $1{,}5\\ \\text{m}$. Khoảng cách từ người đó đến ảnh của mình là bao nhiêu mét?',
      answer: 3,
      unit: 'm',
      hints: [
        'Ảnh nằm sau gương, cách gương bao nhiêu?',
        'Cộng khoảng cách người–gương với gương–ảnh.',
      ],
      solution:
        'Ảnh cách gương $1{,}5\\ \\text{m}$, nên người cách ảnh $1{,}5 + 1{,}5 = 3\\ \\text{(m)}$.',
    },
    {
      type: 'number',
      prompt:
        'Một bạn học sinh cao $1{,}55\\ \\text{m}$ đứng trước gương phẳng treo thẳng đứng. Ảnh của bạn đó cao bao nhiêu mét?',
      answer: 1.55,
      tolerance: 0.001,
      unit: 'm',
      hints: ['Ảnh tạo bởi gương phẳng lớn hơn, nhỏ hơn hay bằng vật?'],
      solution: 'Ảnh lớn bằng vật nên cao $1{,}55\\ \\text{m}$, dù người đứng gần hay xa gương.',
    },
    {
      type: 'number',
      prompt:
        'Một người đứng cách gương phẳng $2\\ \\text{m}$ rồi tiến lại gần gương $0{,}5\\ \\text{m}$. Lúc này người đó cách ảnh của mình bao nhiêu mét?',
      answer: 3,
      unit: 'm',
      hints: ['Tính khoảng cách mới từ người đến gương trước.'],
      solution:
        'Người cách gương $2 - 0{,}5 = 1{,}5\\ \\text{(m)}$; ảnh cách gương $1{,}5\\ \\text{m}$; người cách ảnh $1{,}5 + 1{,}5 = 3\\ \\text{(m)}$.',
    },
    {
      type: 'choice',
      prompt: 'Vì sao ảnh tạo bởi gương phẳng được gọi là ảnh ảo?',
      options: [
        'Vì ảnh nhỏ hơn vật.',
        'Vì ảnh không hứng được trên màn chắn: phía sau gương không có ánh sáng thật sự tới.',
        'Vì ảnh luôn bị lộn ngược.',
        'Vì ảnh chỉ thấy được trong bóng tối.',
      ],
      answer: 1,
      hints: ['Thử đặt một màn chắn ở chỗ có ảnh, sau gương.'],
      solution:
        'Ánh sáng không đi qua được gương tới chỗ có ảnh nên không hứng được ảnh trên màn. Mắt chỉ thấy ảnh do đường kéo dài của các tia phản xạ gặp nhau tại đó: đó là ảnh ảo.',
    },
    {
      type: 'order',
      prompt:
        "Sắp xếp các bước vẽ ảnh $S'$ của điểm sáng $S$ qua gương phẳng bằng tính chất đối xứng.",
      items: [
        "Lấy điểm $S'$ trên đường kéo dài sao cho $HS' = HS$.",
        'Từ $S$ kẻ đường thẳng vuông góc với gương, cắt gương tại $H$.',
        'Kéo dài đường vuông góc đó về phía sau gương.',
        "Kết luận $S'$ là ảnh ảo của $S$.",
      ],
      answer: [1, 2, 0, 3],
      hints: ['Đầu tiên phải có chân đường vuông góc $H$ trên gương.'],
      solution:
        "Kẻ $SH$ vuông góc với gương tại $H$; kéo dài về phía sau gương; lấy $S'$ sao cho $HS' = HS$; $S'$ là ảnh ảo của $S$.",
    },
    {
      type: 'choice',
      prompt:
        "Vẽ ảnh của điểm $S$ bằng định luật phản xạ ánh sáng: vẽ hai tia tới, hai tia phản xạ tương ứng. Ảnh $S'$ là",
      options: [
        'giao điểm của hai tia tới.',
        'giao điểm của đường kéo dài hai tia phản xạ về phía sau gương.',
        'trung điểm của đoạn nối hai điểm tới.',
        'điểm mà hai tia phản xạ cắt nhau trước gương.',
      ],
      answer: 1,
      hints: [
        'Các tia phản xạ đi ra xa nhau phía trước gương; chúng chỉ "gặp nhau" khi kéo dài ngược lại.',
      ],
      solution:
        "Hai tia phản xạ loe ra phía trước gương, không cắt nhau. Kéo dài chúng về phía sau gương, chúng cắt nhau tại $S'$, là ảnh ảo của $S$.",
    },
    {
      type: 'multi',
      prompt: 'Những phát biểu nào đúng về ảnh của vật qua gương phẳng?',
      options: [
        'Ảnh và vật đối xứng nhau qua gương.',
        'Vật càng xa gương thì ảnh càng nhỏ.',
        'Đường nối một điểm của vật với ảnh của nó vuông góc với gương.',
        'Ảnh hứng được trên tấm bìa đặt sau gương.',
        'Ảnh lớn bằng vật.',
      ],
      answers: [0, 2, 4],
      hints: ['Ảnh lớn bằng vật dù vật ở gần hay xa.', 'Ảnh là ảnh ảo.'],
      solution:
        'Ảnh đối xứng với vật qua gương, đường nối điểm vật với ảnh vuông góc với gương, ảnh lớn bằng vật. Ảnh không nhỏ đi khi vật ra xa (chỉ trông nhỏ hơn vì ở xa mắt), và là ảnh ảo nên không hứng được trên màn.',
    },
  ],
  takeaways: [
    'Ảnh của vật qua gương phẳng là ảnh ảo, không hứng được trên màn chắn, lớn bằng vật.',
    'Khoảng cách từ một điểm của vật đến gương bằng khoảng cách từ ảnh của điểm đó đến gương: ảnh và vật đối xứng qua gương.',
    "Vẽ ảnh: dùng định luật phản xạ (giao điểm đường kéo dài các tia phản xạ) hoặc dùng đối xứng ($HS' = HS$, $SS'$ vuông góc với gương).",
    'Ảnh ảo được vẽ bằng nét đứt.',
  ],
};
