/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Đoạn mạch nối tiếp: cường độ dòng điện như nhau, hiệu điện thế cộng lại, điện trở tương đương bằng tổng các điện trở; đoạn mạch song song: hiệu điện thế như nhau, cường độ dòng điện cộng lại, nghịch đảo điện trở tương đương bằng tổng nghịch đảo các điện trở.',
  intro:
    'Dây đèn nháy trang trí có hàng chục bóng đèn nhỏ mắc liền nhau thành một chuỗi, còn đèn, quạt, tủ lạnh trong nhà lại được mắc vào hai dây điện chung. Hai cách mắc này khác nhau thế nào về cường độ dòng điện, hiệu điện thế và điện trở?',
  objectives: [
    'Nêu được điện trở tương đương của một đoạn mạch.',
    'Nêu được và vận dụng được: trong đoạn mạch nối tiếp $I = I_1 = I_2$, $U = U_1 + U_2$, $R_{\\text{tđ}} = R_1 + R_2$.',
    'Nêu được và vận dụng được: trong đoạn mạch song song $U = U_1 = U_2$, $I = I_1 + I_2$, $\\dfrac{1}{R_{\\text{tđ}}} = \\dfrac{1}{R_1} + \\dfrac{1}{R_2}$.',
  ],
  sections: [
    {
      heading: 'Điện trở tương đương',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Điện trở tương đương',
          text: 'Điện trở tương đương $R_{\\text{tđ}}$ của một đoạn mạch gồm nhiều điện trở là điện trở có thể thay thế cho đoạn mạch này, sao cho với cùng hiệu điện thế thì cường độ dòng điện chạy qua đoạn mạch vẫn có giá trị như trước.',
        },
        {
          type: 'p',
          text: 'Biết $R_{\\text{tđ}}$, ta tính được cường độ dòng điện trong mạch chính bằng định luật Ohm: $I = \\dfrac{U}{R_{\\text{tđ}}}$.',
        },
      ],
    },
    {
      heading: 'Đoạn mạch nối tiếp',
      blocks: [
        {
          type: 'p',
          text: 'Hai điện trở $R_1$ và $R_2$ mắc nối tiếp khi chúng được mắc liên tiếp nhau trên cùng một dây, chỉ có một đường cho dòng điện đi qua. Mắc ampe kế ở các vị trí khác nhau trong mạch và vôn kế vào hai đầu từng điện trở, ta thấy:',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Đoạn mạch gồm hai điện trở mắc nối tiếp',
          text: 'Cường độ dòng điện có giá trị như nhau tại mọi điểm: $I = I_1 = I_2$. Hiệu điện thế giữa hai đầu đoạn mạch bằng tổng hiệu điện thế giữa hai đầu mỗi điện trở: $U = U_1 + U_2$.',
        },
        {
          type: 'p',
          text: 'Áp dụng định luật Ohm cho từng điện trở: $U_1 = IR_1$, $U_2 = IR_2$ và cho cả đoạn mạch $U = IR_{\\text{tđ}}$. Thay vào $U = U_1 + U_2$ rồi chia cho $I$ ta được:',
        },
        { type: 'tex', tex: 'R_{\\text{tđ}} = R_1 + R_2' },
        {
          type: 'callout',
          tone: 'note',
          title: 'Hệ quả',
          text: 'Trong đoạn mạch nối tiếp, hiệu điện thế giữa hai đầu mỗi điện trở tỉ lệ thuận với điện trở đó: $\\dfrac{U_1}{U_2} = \\dfrac{R_1}{R_2}$. Điện trở tương đương lớn hơn mỗi điện trở thành phần. Với nhiều điện trở: $R_{\\text{tđ}} = R_1 + R_2 + \\dots + R_n$.',
        },
      ],
    },
    {
      heading: 'Đoạn mạch song song',
      blocks: [
        {
          type: 'p',
          text: 'Hai điện trở $R_1$ và $R_2$ mắc song song khi hai đầu của chúng được nối chung vào hai điểm của mạch; dòng điện mạch chính tách thành hai mạch rẽ rồi lại nhập vào.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Đoạn mạch gồm hai điện trở mắc song song',
          text: 'Hiệu điện thế giữa hai đầu đoạn mạch bằng hiệu điện thế giữa hai đầu mỗi mạch rẽ: $U = U_1 = U_2$. Cường độ dòng điện chạy trong mạch chính bằng tổng cường độ dòng điện chạy trong các mạch rẽ: $I = I_1 + I_2$.',
        },
        {
          type: 'p',
          text: 'Thay $I = \\dfrac{U}{R_{\\text{tđ}}}$, $I_1 = \\dfrac{U}{R_1}$, $I_2 = \\dfrac{U}{R_2}$ vào $I = I_1 + I_2$ rồi chia cho $U$:',
        },
        {
          type: 'tex',
          tex: '\\frac{1}{R_{\\text{tđ}}} = \\frac{1}{R_1} + \\frac{1}{R_2} \\quad \\Rightarrow \\quad R_{\\text{tđ}} = \\frac{R_1 R_2}{R_1 + R_2}',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Hệ quả',
          text: 'Trong đoạn mạch song song, cường độ dòng điện qua mỗi mạch rẽ tỉ lệ nghịch với điện trở của mạch rẽ đó: $\\dfrac{I_1}{I_2} = \\dfrac{R_2}{R_1}$. Điện trở tương đương nhỏ hơn mỗi điện trở thành phần. $n$ điện trở giống nhau $R$ mắc song song có $R_{\\text{tđ}} = \\dfrac{R}{n}$.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Mạng điện trong nhà',
          text: 'Các thiết bị điện trong gia đình được mắc song song vào mạng điện $220$ V: mỗi thiết bị đều nhận đúng hiệu điện thế $220$ V và có thể bật, tắt riêng mà không ảnh hưởng đến các thiết bị khác.',
        },
      ],
    },
  ],
  explore: {
    title: 'Đo ở mọi điểm của mạch',
    instruction:
      'Chọn cách mắc nối tiếp hoặc song song, đổi điện trở và hiệu điện thế. Lần lượt đặt ampe kế vào mạch chính và từng nhánh, vôn kế vào cả đoạn mạch và hai đầu từng điện trở. Khi đã đo ở mọi vị trí, so sánh các số chỉ để tìm quy luật của cường độ dòng điện và hiệu điện thế; rồi thêm một điện trở và kiểm tra lại.',
  },
  examples: [
    {
      problem:
        'Hai điện trở $R_1 = 10\\ \\Omega$ và $R_2 = 20\\ \\Omega$ mắc nối tiếp vào hiệu điện thế $12$ V. Tính điện trở tương đương, cường độ dòng điện trong mạch và hiệu điện thế giữa hai đầu mỗi điện trở.',
      steps: [
        'Điện trở tương đương: $R_{\\text{tđ}} = R_1 + R_2 = 10 + 20 = 30\\ \\Omega$.',
        'Cường độ dòng điện: $I = \\dfrac{U}{R_{\\text{tđ}}} = \\dfrac{12}{30} = 0{,}4$ A; mạch nối tiếp nên $I_1 = I_2 = 0{,}4$ A.',
        'Hiệu điện thế: $U_1 = IR_1 = 0{,}4 \\cdot 10 = 4$ V; $U_2 = IR_2 = 0{,}4 \\cdot 20 = 8$ V.',
        'Kiểm tra: $U_1 + U_2 = 4 + 8 = 12$ V $= U$.',
      ],
      answer: '$R_{\\text{tđ}} = 30\\ \\Omega$; $I = 0{,}4$ A; $U_1 = 4$ V, $U_2 = 8$ V.',
    },
    {
      problem:
        'Hai điện trở $R_1 = 10\\ \\Omega$ và $R_2 = 15\\ \\Omega$ mắc song song vào hiệu điện thế $6$ V. Tính điện trở tương đương và cường độ dòng điện qua mỗi điện trở, qua mạch chính.',
      steps: [
        'Điện trở tương đương: $R_{\\text{tđ}} = \\dfrac{R_1 R_2}{R_1 + R_2} = \\dfrac{10 \\cdot 15}{10 + 15} = 6\\ \\Omega$.',
        'Mạch song song nên $U_1 = U_2 = U = 6$ V.',
        'Cường độ dòng điện mạch rẽ: $I_1 = \\dfrac{6}{10} = 0{,}6$ A; $I_2 = \\dfrac{6}{15} = 0{,}4$ A.',
        'Mạch chính: $I = I_1 + I_2 = 1$ A; kiểm tra: $\\dfrac{U}{R_{\\text{tđ}}} = \\dfrac{6}{6} = 1$ A.',
      ],
      answer: '$R_{\\text{tđ}} = 6\\ \\Omega$; $I_1 = 0{,}6$ A, $I_2 = 0{,}4$ A, $I = 1$ A.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Trong đoạn mạch gồm hai điện trở mắc nối tiếp, hệ thức nào đúng?',
      options: ['$I = I_1 + I_2$', '$I = I_1 = I_2$', '$U = U_1 = U_2$', '$R_{\\text{tđ}} < R_1$'],
      answer: 1,
      hints: ['Mạch nối tiếp chỉ có một đường cho dòng điện đi qua.'],
      solution:
        'Dòng điện chỉ có một đường đi nên cường độ như nhau tại mọi điểm: $I = I_1 = I_2$. Hiệu điện thế thì cộng lại, và $R_{\\text{tđ}} = R_1 + R_2$ lớn hơn mỗi điện trở.',
    },
    {
      type: 'number',
      prompt:
        'Hai điện trở $12\\ \\Omega$ và $18\\ \\Omega$ mắc nối tiếp. Tính điện trở tương đương.',
      answer: 30,
      tolerance: 0.001,
      unit: 'Ω',
      hints: ['Nối tiếp: $R_{\\text{tđ}} = R_1 + R_2$.'],
      solution: '$R_{\\text{tđ}} = 12 + 18 = 30\\ \\Omega$.',
    },
    {
      type: 'number',
      prompt:
        'Hai điện trở $20\\ \\Omega$ và $30\\ \\Omega$ mắc song song. Tính điện trở tương đương.',
      answer: 12,
      tolerance: 0.001,
      unit: 'Ω',
      hints: ['Song song: $R_{\\text{tđ}} = \\dfrac{R_1 R_2}{R_1 + R_2}$.'],
      solution:
        '$R_{\\text{tđ}} = \\dfrac{20 \\cdot 30}{20 + 30} = \\dfrac{600}{50} = 12\\ \\Omega$.',
    },
    {
      type: 'number',
      prompt:
        'Mắc nối tiếp $R_1 = 5\\ \\Omega$ và $R_2 = 10\\ \\Omega$ vào hiệu điện thế $6$ V. Hiệu điện thế giữa hai đầu $R_2$ là bao nhiêu vôn?',
      answer: 4,
      tolerance: 0.001,
      unit: 'V',
      hints: [
        'Tính $R_{\\text{tđ}}$ rồi cường độ dòng điện $I$ chạy qua cả hai điện trở.',
        '$U_2 = I \\cdot R_2$.',
      ],
      solution:
        '$R_{\\text{tđ}} = 15\\ \\Omega$; $I = \\dfrac{6}{15} = 0{,}4$ A; $U_2 = 0{,}4 \\cdot 10 = 4$ V.',
    },
    {
      type: 'number',
      prompt:
        'Mắc song song $R_1 = 6\\ \\Omega$ và $R_2 = 12\\ \\Omega$ vào hiệu điện thế $12$ V. Tính cường độ dòng điện trong mạch chính.',
      answer: 3,
      tolerance: 0.001,
      unit: 'A',
      hints: ['Mỗi mạch rẽ có hiệu điện thế $12$ V.', '$I = I_1 + I_2$.'],
      solution: '$I_1 = \\dfrac{12}{6} = 2$ A; $I_2 = \\dfrac{12}{12} = 1$ A; $I = 2 + 1 = 3$ A.',
    },
    {
      type: 'choice',
      prompt: 'Điện trở tương đương của đoạn mạch gồm hai điện trở mắc song song',
      options: [
        'bằng tổng hai điện trở',
        'lớn hơn mỗi điện trở thành phần',
        'nhỏ hơn mỗi điện trở thành phần',
        'bằng trung bình cộng hai điện trở',
      ],
      answer: 2,
      hints: ['Thêm một mạch rẽ là thêm một đường cho dòng điện đi qua.'],
      solution:
        'Vì $\\dfrac{1}{R_{\\text{tđ}}} = \\dfrac{1}{R_1} + \\dfrac{1}{R_2} > \\dfrac{1}{R_1}$ nên $R_{\\text{tđ}} < R_1$, tương tự $R_{\\text{tđ}} < R_2$.',
    },
    {
      type: 'number',
      prompt:
        'Ba điện trở giống nhau, mỗi điện trở $30\\ \\Omega$, mắc song song. Tính điện trở tương đương.',
      answer: 10,
      tolerance: 0.001,
      unit: 'Ω',
      hints: ['$\\dfrac{1}{R_{\\text{tđ}}} = \\dfrac{1}{30} + \\dfrac{1}{30} + \\dfrac{1}{30}$.'],
      solution:
        '$\\dfrac{1}{R_{\\text{tđ}}} = \\dfrac{3}{30} = \\dfrac{1}{10}$, nên $R_{\\text{tđ}} = 10\\ \\Omega$.',
    },
    {
      type: 'number',
      prompt:
        'Đoạn mạch gồm $R_1$ nối tiếp $R_2 = 12\\ \\Omega$. Ampe kế chỉ $0{,}5$ A, vôn kế mắc vào hai đầu $R_1$ chỉ $3$ V. Hiệu điện thế giữa hai đầu đoạn mạch là bao nhiêu?',
      answer: 9,
      tolerance: 0.001,
      unit: 'V',
      hints: ['Dòng điện $0{,}5$ A cũng chạy qua $R_2$: tính $U_2$.', '$U = U_1 + U_2$.'],
      solution: '$U_2 = IR_2 = 0{,}5 \\cdot 12 = 6$ V; $U = U_1 + U_2 = 3 + 6 = 9$ V.',
    },
    {
      type: 'number',
      prompt:
        'Hai điện trở $R_1 = 20\\ \\Omega$ và $R_2 = 30\\ \\Omega$ mắc song song; cường độ dòng điện mạch chính là $1{,}2$ A. Tính cường độ dòng điện qua $R_1$.',
      answer: 0.72,
      tolerance: 0.001,
      unit: 'A',
      hints: [
        'Tính $R_{\\text{tđ}}$ rồi hiệu điện thế $U = I \\cdot R_{\\text{tđ}}$ chung cho hai mạch rẽ.',
        '$I_1 = \\dfrac{U}{R_1}$.',
      ],
      solution:
        '$R_{\\text{tđ}} = \\dfrac{20 \\cdot 30}{50} = 12\\ \\Omega$; $U = 1{,}2 \\cdot 12 = 14{,}4$ V; $I_1 = \\dfrac{14{,}4}{20} = 0{,}72$ A.',
    },
    {
      type: 'multi',
      prompt: 'Những phát biểu nào đúng với đoạn mạch gồm hai điện trở mắc song song?',
      options: [
        'Hiệu điện thế hai đầu mỗi điện trở bằng nhau.',
        'Điện trở nào lớn hơn thì dòng điện qua nó lớn hơn.',
        'Cường độ dòng điện mạch chính bằng tổng cường độ dòng điện các mạch rẽ.',
        'Tháo bỏ một điện trở thì dòng điện qua điện trở còn lại bị ngắt.',
      ],
      answers: [0, 2],
      hints: ['Mỗi mạch rẽ có cùng $U$, nên $I = \\dfrac{U}{R}$ nhỏ hơn ở nhánh có $R$ lớn hơn.'],
      solution:
        'Đúng: $U = U_1 = U_2$ và $I = I_1 + I_2$. Sai: dòng điện tỉ lệ nghịch với điện trở, nên nhánh có điện trở lớn có dòng nhỏ hơn. Sai: các mạch rẽ hoạt động độc lập, tháo một nhánh thì nhánh kia vẫn có dòng điện.',
    },
    {
      type: 'choice',
      prompt:
        'Hai bóng đèn giống nhau, mỗi bóng sáng bình thường ở hiệu điện thế $220$ V. Mắc thế nào vào mạng điện $220$ V để cả hai sáng bình thường?',
      options: [
        'Mắc nối tiếp hai bóng',
        'Mắc song song hai bóng',
        'Cách nào cũng được',
        'Không có cách nào',
      ],
      answer: 1,
      hints: ['Mỗi bóng cần nhận đủ $220$ V. Nối tiếp thì hiệu điện thế bị chia cho hai bóng.'],
      solution:
        'Mắc song song thì mỗi bóng nhận $U = 220$ V nên sáng bình thường. Mắc nối tiếp, hai bóng giống nhau chia đôi hiệu điện thế, mỗi bóng chỉ nhận $110$ V nên sáng yếu.',
    },
  ],
  takeaways: [
    'Nối tiếp: $I = I_1 = I_2$; $U = U_1 + U_2$; $R_{\\text{tđ}} = R_1 + R_2$; $\\dfrac{U_1}{U_2} = \\dfrac{R_1}{R_2}$.',
    'Song song: $U = U_1 = U_2$; $I = I_1 + I_2$; $\\dfrac{1}{R_{\\text{tđ}}} = \\dfrac{1}{R_1} + \\dfrac{1}{R_2}$; $\\dfrac{I_1}{I_2} = \\dfrac{R_2}{R_1}$.',
    'Mắc nối tiếp làm điện trở tương đương lớn lên, mắc song song làm nó nhỏ đi.',
    'Các thiết bị điện trong nhà được mắc song song để cùng nhận hiệu điện thế $220$ V.',
  ],
};
