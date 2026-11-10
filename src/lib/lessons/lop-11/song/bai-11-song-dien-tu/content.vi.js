/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Sóng điện từ là điện từ trường lan truyền trong không gian; nó là sóng ngang, truyền được cả trong chân không với tốc độ c ≈ 3·10⁸ m/s, và có λ = c/f. Theo bước sóng giảm dần, thang sóng điện từ gồm sóng vô tuyến, sóng vi ba, tia hồng ngoại, ánh sáng nhìn thấy, tia tử ngoại, tia X và tia gamma.',
  intro:
    'Chiếc điện thoại trong túi em nhận tín hiệu từ trạm phát cách xa hàng kilômét, ánh sáng Mặt Trời vượt qua khoảng chân không dài $150$ triệu kilômét để tới Trái Đất, còn bác sĩ dùng tia X để nhìn xuyên qua cơ thể. Ba thứ tưởng như khác hẳn nhau ấy thực ra cùng một bản chất: chúng đều là sóng điện từ.',
  objectives: [
    'Nêu được sóng điện từ là điện từ trường lan truyền trong không gian, là sóng ngang và truyền được trong chân không với tốc độ $c \\approx 3 \\cdot 10^8$ m/s.',
    'Vận dụng được công thức $\\lambda = \\dfrac{c}{f}$ cho sóng điện từ trong chân không.',
    'Nêu được thứ tự các vùng của thang sóng điện từ và phạm vi bước sóng gần đúng của mỗi vùng.',
    'Nhận biết được loại bức xạ từ bước sóng hoặc tần số của nó và nêu được một số nguồn phát, ứng dụng.',
  ],
  sections: [
    {
      heading: 'Sóng điện từ',
      blocks: [
        {
          type: 'p',
          text: 'Một điện trường biến thiên theo thời gian sinh ra một từ trường biến thiên, và ngược lại từ trường biến thiên sinh ra điện trường biến thiên. Hai trường này liên quan chặt chẽ với nhau thành điện từ trường, lan truyền ra không gian xung quanh.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Sóng điện từ',
          text: 'Sóng điện từ là điện từ trường lan truyền trong không gian.',
        },
        {
          type: 'list',
          items: [
            'Sóng điện từ là sóng ngang: tại mỗi điểm, vectơ cường độ điện trường $\\vec{E}$ và vectơ cảm ứng từ $\\vec{B}$ luôn vuông góc với nhau và cùng vuông góc với phương truyền sóng.',
            'Tại mỗi điểm, điện trường và từ trường dao động cùng tần số và cùng pha.',
            'Sóng điện từ truyền được trong chân không và trong các môi trường vật chất (rắn, lỏng, khí); đây là điểm khác cơ bản so với sóng cơ.',
            'Trong chân không mọi sóng điện từ có cùng tốc độ $c \\approx 3 \\cdot 10^8$ m/s, gọi là tốc độ ánh sáng. Trong các môi trường khác, tốc độ nhỏ hơn $c$.',
            'Sóng điện từ mang năng lượng; nó cũng phản xạ, khúc xạ, giao thoa như sóng cơ.',
          ],
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Bước sóng trong chân không',
          text: '$\\lambda = cT = \\dfrac{c}{f}$, với $c = 3 \\cdot 10^8$ m/s.',
        },
      ],
    },
    {
      heading: 'Thang sóng điện từ',
      blocks: [
        {
          type: 'p',
          text: 'Sóng điện từ có bước sóng trải dài từ hàng kilômét đến nhỏ hơn kích thước hạt nhân. Sắp xếp theo bước sóng ta được thang sóng điện từ. Các vùng không có ranh giới rõ rệt, vùng kề nhau có thể chồng lên nhau một chút.',
        },
        {
          type: 'table',
          caption: 'Phạm vi bước sóng trong chân không (gần đúng)',
          head: ['Vùng', 'Bước sóng', 'Nguồn phát, ứng dụng tiêu biểu'],
          rows: [
            ['Sóng vô tuyến', '$1$ m đến $100$ km', 'Ăng-ten đài phát; phát thanh, truyền hình'],
            ['Sóng vi ba', '$1$ mm đến $1$ m', 'Lò vi sóng, điện thoại di động, Wi-Fi, ra-đa'],
            [
              'Tia hồng ngoại',
              '$0{,}76$ µm đến $1$ mm',
              'Mọi vật có nhiệt độ; sưởi ấm, điều khiển từ xa',
            ],
            [
              'Ánh sáng nhìn thấy',
              '$0{,}38$ µm đến $0{,}76$ µm',
              'Mặt Trời, đèn; giúp mắt nhìn thấy',
            ],
            [
              'Tia tử ngoại',
              '$10$ nm đến $400$ nm',
              'Mặt Trời, hồ quang; tiệt trùng, phát hiện tiền giả',
            ],
            ['Tia X', 'khoảng $30$ pm đến $3$ nm', 'Ống tia X; chụp X-quang, kiểm tra hành lí'],
            ['Tia gamma', 'nhỏ hơn khoảng $10^{-11}$ m', 'Chất phóng xạ; xạ trị ung thư'],
          ],
        },
        {
          type: 'p',
          text: 'Đi từ sóng vô tuyến đến tia gamma, bước sóng giảm dần và tần số $f = \\dfrac{c}{\\lambda}$ tăng dần. Mắt người chỉ cảm nhận được một dải rất hẹp, ánh sáng nhìn thấy, gồm các màu từ đỏ (bước sóng dài nhất) đến tím (bước sóng ngắn nhất).',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'An toàn',
          text: 'Tia tử ngoại, tia X và tia gamma có tần số lớn, mang năng lượng cao, có thể gây hại cho da, mắt và tế bào. Vì thế thợ hàn hồ quang phải đeo mặt nạ, người làm việc với tia X phải có tấm chắn chì, và ta nên dùng kem chống nắng khi ra nắng gắt.',
        },
      ],
    },
  ],
  explore: {
    title: 'Thang sóng điện từ',
    instruction:
      'Kéo thanh bước sóng từ $10^{-13}$ m đến $10^{5}$ m và đọc tên vùng, tần số, nguồn phát và ứng dụng. Ở phần Xếp chỗ, mỗi bức xạ được cho bằng tần số: tính $\\lambda = \\dfrac{c}{f}$, kéo thanh tới đúng vùng rồi bấm Kiểm tra vị trí.',
  },
  examples: [
    {
      problem:
        'Một đài phát thanh FM phát sóng có tần số $100$ MHz. Tính bước sóng của sóng này trong không khí (coi như chân không) và cho biết nó thuộc vùng nào.',
      steps: [
        'Đổi $f = 100$ MHz $= 10^8$ Hz.',
        '$\\lambda = \\dfrac{c}{f} = \\dfrac{3 \\cdot 10^8}{10^8} = 3$ m.',
        '$3$ m nằm trong khoảng $1$ m đến $100$ km nên đó là sóng vô tuyến.',
      ],
      answer: '$\\lambda = 3$ m, sóng vô tuyến.',
    },
    {
      problem: 'Xác định vùng của các bức xạ có tần số $5 \\cdot 10^{14}$ Hz và $10^{18}$ Hz.',
      steps: [
        '$\\lambda_1 = \\dfrac{3 \\cdot 10^8}{5 \\cdot 10^{14}} = 6 \\cdot 10^{-7}$ m $= 0{,}6$ µm, nằm trong khoảng $0{,}38$ µm đến $0{,}76$ µm: ánh sáng nhìn thấy.',
        '$\\lambda_2 = \\dfrac{3 \\cdot 10^8}{10^{18}} = 3 \\cdot 10^{-10}$ m $= 0{,}3$ nm, nằm trong khoảng $30$ pm đến $3$ nm: tia X.',
      ],
      answer: '$5 \\cdot 10^{14}$ Hz là ánh sáng nhìn thấy; $10^{18}$ Hz là tia X.',
    },
    {
      problem: 'Nêu hai điểm khác nhau giữa sóng điện từ và sóng âm truyền trong không khí.',
      steps: [
        'Sóng điện từ là sóng ngang; sóng âm trong không khí là sóng dọc.',
        'Sóng điện từ truyền được trong chân không với tốc độ $3 \\cdot 10^8$ m/s; sóng âm cần môi trường vật chất và trong không khí chỉ truyền với tốc độ cỡ $340$ m/s.',
      ],
      answer:
        'Khác về loại sóng (ngang và dọc) và về khả năng truyền trong chân không, tốc độ truyền.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt:
        'Một đài phát thanh phát sóng có tần số $10^6$ Hz. Tính bước sóng của sóng này trong chân không.',
      answer: 300,
      unit: 'm',
      hints: ['$\\lambda = \\dfrac{c}{f}$ với $c = 3 \\cdot 10^8$ m/s.'],
      solution: '$\\lambda = \\dfrac{3 \\cdot 10^8}{10^6} = 300$ m.',
    },
    {
      type: 'number',
      prompt:
        'Wi-Fi dùng sóng có tần số $2{,}4$ GHz. Tính bước sóng của sóng này trong chân không (theo cm).',
      answer: 12.5,
      unit: 'cm',
      hints: ['$1$ GHz $= 10^9$ Hz.', '$\\lambda = \\dfrac{c}{f}$, rồi đổi ra xentimét.'],
      solution: '$\\lambda = \\dfrac{3 \\cdot 10^8}{2{,}4 \\cdot 10^9} = 0{,}125$ m $= 12{,}5$ cm.',
    },
    {
      type: 'number',
      prompt:
        'Một ánh sáng nhìn thấy có bước sóng $600$ nm trong chân không. Tần số của nó bằng bao nhiêu lần $10^{14}$ Hz?',
      answer: 5,
      hints: ['$600$ nm $= 6 \\cdot 10^{-7}$ m.', '$f = \\dfrac{c}{\\lambda}$.'],
      solution:
        '$f = \\dfrac{3 \\cdot 10^8}{6 \\cdot 10^{-7}} = 5 \\cdot 10^{14}$ Hz, tức $5$ lần $10^{14}$ Hz.',
    },
    {
      type: 'choice',
      prompt: 'Bức xạ có bước sóng $7 \\cdot 10^{-6}$ m trong chân không thuộc vùng',
      options: ['tia hồng ngoại', 'ánh sáng nhìn thấy', 'tia tử ngoại', 'sóng vi ba'],
      answer: 0,
      hints: [
        '$7 \\cdot 10^{-6}$ m $= 7$ µm. So với khoảng $0{,}38$ µm đến $0{,}76$ µm của ánh sáng nhìn thấy.',
      ],
      solution: '$7$ µm lớn hơn $0{,}76$ µm nhưng nhỏ hơn $1$ mm, nên đó là tia hồng ngoại.',
    },
    {
      type: 'choice',
      prompt: 'Một ngọn đèn phát ra bức xạ có tần số $10^{14}$ Hz. Bức xạ này thuộc vùng',
      options: ['tia hồng ngoại', 'ánh sáng nhìn thấy', 'tia tử ngoại', 'tia X'],
      answer: 0,
      hints: ['Tính bước sóng $\\lambda = \\dfrac{c}{f}$ trước.'],
      solution:
        '$\\lambda = \\dfrac{3 \\cdot 10^8}{10^{14}} = 3 \\cdot 10^{-6}$ m $= 3$ µm $> 0{,}76$ µm: tia hồng ngoại.',
    },
    {
      type: 'choice',
      prompt: 'Phát biểu nào sau đây về sóng điện từ là sai?',
      options: [
        'Sóng điện từ không truyền được trong chân không',
        'Sóng điện từ là sóng ngang',
        'Sóng điện từ mang năng lượng',
        'Trong chân không, sóng điện từ truyền với tốc độ khoảng $3 \\cdot 10^8$ m/s',
      ],
      answer: 0,
      hints: ['Ánh sáng Mặt Trời đến Trái Đất bằng cách nào?'],
      solution:
        'Sóng điện từ truyền được trong chân không (ánh sáng Mặt Trời đến được Trái Đất); các phát biểu còn lại đều đúng.',
    },
    {
      type: 'order',
      prompt: 'Sắp xếp các bức xạ sau theo thứ tự bước sóng tăng dần.',
      items: [
        'Tia gamma',
        'Tia X',
        'Tia tử ngoại',
        'Ánh sáng nhìn thấy',
        'Tia hồng ngoại',
        'Sóng vô tuyến',
      ],
      answer: [0, 1, 2, 3, 4, 5],
      hints: ['Tia gamma có bước sóng ngắn nhất, sóng vô tuyến dài nhất.'],
      solution:
        'Bước sóng tăng dần: tia gamma, tia X, tia tử ngoại, ánh sáng nhìn thấy, tia hồng ngoại, sóng vô tuyến.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi ứng dụng với loại bức xạ được dùng.',
      left: [
        'Chụp X-quang để kiểm tra xương',
        'Điều khiển ti vi từ xa',
        'Hâm nóng thức ăn trong lò vi sóng',
        'Diệt khuẩn trong nước uống',
      ],
      right: ['Tia X', 'Tia hồng ngoại', 'Sóng vi ba', 'Tia tử ngoại'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['Bức xạ nào đâm xuyên mạnh? Bức xạ nào có tác dụng diệt khuẩn?'],
      solution:
        'Chụp X-quang dùng tia X; điều khiển từ xa dùng tia hồng ngoại; lò vi sóng dùng sóng vi ba; diệt khuẩn trong nước dùng tia tử ngoại.',
    },
  ],
  takeaways: [
    'Sóng điện từ là điện từ trường lan truyền trong không gian; $\\vec{E} \\perp \\vec{B}$ và cùng vuông góc với phương truyền: sóng ngang.',
    'Sóng điện từ truyền được trong chân không với tốc độ $c \\approx 3 \\cdot 10^8$ m/s; $\\lambda = \\dfrac{c}{f}$.',
    'Thang sóng điện từ theo bước sóng giảm dần: vô tuyến, vi ba, hồng ngoại, nhìn thấy ($0{,}38$ µm đến $0{,}76$ µm), tử ngoại, tia X, tia gamma.',
    'Bước sóng càng ngắn, tần số càng lớn, bức xạ mang năng lượng càng cao và càng cần lưu ý an toàn.',
  ],
};
