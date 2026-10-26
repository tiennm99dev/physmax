/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Đồ thị quãng đường – thời gian vẽ từ bảng số liệu s và t; đoạn thẳng nằm nghiêng ứng với chuyển động có tốc độ không đổi, càng dốc thì tốc độ càng lớn; đoạn nằm ngang là vật đứng yên. Từ đồ thị đọc được quãng đường, thời gian và tính được tốc độ.',
  intro:
    'Một ô tô chở khách đi đường dài: chạy liền ba giờ rồi dừng nghỉ một giờ. Thay vì kể lại bằng lời hay ghi một bảng số dài, ta có thể vẽ một hình để chỉ cần nhìn là biết lúc nào xe chạy nhanh, lúc nào xe dừng và xe đã đi được bao xa.',
  objectives: [
    'Vẽ được đồ thị quãng đường – thời gian cho chuyển động thẳng từ bảng số liệu.',
    'Từ đồ thị, xác định được quãng đường đi được, thời gian đi và tốc độ của vật.',
    'Dùng đồ thị để mô tả chuyển động: lúc nào vật chạy, chạy nhanh hay chậm, lúc nào đứng yên.',
  ],
  sections: [
    {
      heading: 'Vẽ đồ thị quãng đường – thời gian',
      blocks: [
        {
          type: 'p',
          text: 'Bảng sau ghi quãng đường một ô tô đi được sau những khoảng thời gian khác nhau kể từ lúc khởi hành.',
        },
        {
          type: 'table',
          caption: 'Quãng đường đi được của ô tô theo thời gian',
          head: ['Thời gian $t$ (h)', '$0$', '$1$', '$2$', '$3$', '$4$'],
          rows: [['Quãng đường $s$ (km)', '$0$', '$60$', '$120$', '$180$', '$180$']],
        },
        { type: 'p', text: 'Các bước vẽ đồ thị quãng đường – thời gian:' },
        {
          type: 'list',
          ordered: true,
          items: [
            'Vẽ hai trục vuông góc chung gốc $O$: trục nằm ngang $Ot$ biểu diễn thời gian, trục thẳng đứng $Os$ biểu diễn quãng đường.',
            'Chọn tỉ lệ (đơn vị) phù hợp trên mỗi trục, ví dụ $1$ ô ứng với $1\\ \\text{h}$ trên trục $Ot$ và $1$ ô ứng với $20\\ \\text{km}$ trên trục $Os$.',
            'Từ bảng số liệu, xác định các điểm $(t;\\ s)$ trên mặt phẳng: $O(0;\\ 0)$, $A(1;\\ 60)$, $B(2;\\ 120)$, $C(3;\\ 180)$, $D(4;\\ 180)$.',
            'Nối các điểm lại với nhau, ta được đồ thị quãng đường – thời gian.',
          ],
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Hình dạng của đồ thị',
          text: 'Trong $3$ giờ đầu, cứ mỗi giờ ô tô đi thêm $60\\ \\text{km}$: tốc độ không đổi và đồ thị là đoạn thẳng nằm nghiêng $OC$. Từ giờ thứ $3$ đến giờ thứ $4$, quãng đường không đổi: ô tô đứng yên và đồ thị là đoạn thẳng $CD$ nằm ngang, song song với trục thời gian.',
        },
      ],
    },
    {
      heading: 'Sử dụng đồ thị quãng đường – thời gian',
      blocks: [
        {
          type: 'p',
          text: 'Từ đồ thị quãng đường – thời gian, ta có thể:',
        },
        {
          type: 'list',
          items: [
            'Xác định quãng đường vật đi được sau một thời gian $t$: từ điểm $t$ trên trục $Ot$, kẻ đường thẳng đứng tới đồ thị, rồi kẻ đường nằm ngang tới trục $Os$ để đọc $s$.',
            'Xác định thời gian vật đi hết quãng đường $s$: làm ngược lại, đi từ trục $Os$ tới đồ thị rồi xuống trục $Ot$.',
            'Tính tốc độ trên một đoạn: lấy quãng đường đi thêm chia cho thời gian tương ứng, $v = \\dfrac{s}{t}$.',
            'Mô tả chuyển động: đoạn nằm nghiêng là vật chuyển động, đoạn nằm ngang là vật đứng yên.',
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Đồ thị càng dốc, tốc độ càng lớn',
          text: 'Trong cùng một khoảng thời gian, vật có tốc độ lớn hơn đi được quãng đường dài hơn, nên đoạn đồ thị của nó dốc hơn. Vẽ đồ thị của hai vật trên cùng một hệ trục, đoạn nào dốc hơn thì vật đó chạy nhanh hơn.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Đồ thị không phải đường đi',
          text: 'Đồ thị quãng đường – thời gian không phải là hình vẽ con đường xe đi. Xe chạy trên đường thẳng hay đường cong, đoạn đồ thị vẫn là đoạn thẳng nằm nghiêng nếu tốc độ không đổi.',
        },
      ],
    },
  ],
  explore: {
    title: 'Vẽ và đọc đồ thị s – t',
    instruction:
      'Kéo các chấm tròn lên hoặc xuống để đổi độ dốc của từng đoạn một giờ: đoạn càng dốc, xe càng nhanh; kéo cho đoạn nằm ngang thì xe đứng yên. Nhấn "Cho xe chạy" để xem xe chạy trên đường trong khi đồ thị được vẽ dần. Dùng thanh trượt để đọc quãng đường tại một thời điểm, rồi thử ba nhiệm vụ vẽ đồ thị theo mô tả.',
  },
  examples: [
    {
      problem:
        'Dựa vào bảng số liệu của ô tô ở trên ($t = 0; 1; 2; 3; 4$ h ứng với $s = 0; 60; 120; 180; 180$ km): (a) mô tả chuyển động của ô tô trong $4$ giờ đầu; (b) tính tốc độ của ô tô trong $3$ giờ đầu; (c) xác định quãng đường ô tô đi được sau $1$ giờ $30$ phút.',
      steps: [
        '(a) Từ $0$ đến $3\\ \\text{h}$ đồ thị là đoạn nằm nghiêng: ô tô chạy với tốc độ không đổi. Từ $3\\ \\text{h}$ đến $4\\ \\text{h}$ đồ thị nằm ngang: ô tô dừng lại (nghỉ).',
        '(b) Trong $3$ giờ đầu ô tô đi được $180\\ \\text{km}$: $v = \\dfrac{s}{t} = \\dfrac{180}{3} = 60\\ \\text{(km/h)}$.',
        '(c) $1$ giờ $30$ phút $= 1{,}5\\ \\text{h}$. Từ điểm $1{,}5$ trên trục $Ot$ kẻ lên đồ thị rồi sang trục $Os$, đọc được $90\\ \\text{km}$. Kiểm tra: $s = v \\cdot t = 60 \\cdot 1{,}5 = 90\\ \\text{(km)}$.',
      ],
      answer: '(a) Chạy đều $3$ giờ, nghỉ $1$ giờ; (b) $60\\ \\text{km/h}$; (c) $90\\ \\text{km}$.',
    },
    {
      problem:
        'Bạn A đi bộ từ nhà tới công viên. Trong $15$ phút đầu A đi được $1000\\ \\text{m}$ thì gặp bạn B và đứng nói chuyện $5$ phút. Sau đó A đi tiếp $1000\\ \\text{m}$ nữa trong $10$ phút thì tới công viên. Lập bảng số liệu, mô tả đồ thị quãng đường – thời gian và tính tốc độ của A trong $15$ phút đầu và $10$ phút cuối (theo m/s).',
      steps: [
        'Bảng số liệu: $t = 0; 15; 20; 30$ (min) ứng với $s = 0; 1000; 1000; 2000$ (m).',
        'Đồ thị gồm ba đoạn: đoạn nằm nghiêng từ $(0;\\ 0)$ đến $(15;\\ 1000)$, đoạn nằm ngang từ $(15;\\ 1000)$ đến $(20;\\ 1000)$ khi A đứng nói chuyện, và đoạn nằm nghiêng dốc hơn từ $(20;\\ 1000)$ đến $(30;\\ 2000)$.',
        '$15$ phút đầu: $t = 900\\ \\text{s}$, $v = \\dfrac{1000}{900} \\approx 1{,}11\\ \\text{(m/s)}$.',
        '$10$ phút cuối: $t = 600\\ \\text{s}$, $v = \\dfrac{1000}{600} \\approx 1{,}67\\ \\text{(m/s)}$.',
      ],
      answer:
        '$15$ phút đầu khoảng $1{,}11\\ \\text{m/s}$; $10$ phút cuối khoảng $1{,}67\\ \\text{m/s}$, đoạn cuối của đồ thị dốc hơn.',
    },
    {
      problem:
        'Hai người đi xe đạp cùng xuất phát. Đồ thị của người thứ nhất đi qua điểm $(2\\ \\text{h};\\ 30\\ \\text{km})$, đồ thị của người thứ hai đi qua điểm $(1{,}5\\ \\text{h};\\ 30\\ \\text{km})$; cả hai đồ thị đều là đoạn thẳng xuất phát từ gốc $O$. Ai đi nhanh hơn?',
      steps: [
        'Người thứ nhất: $v_1 = \\dfrac{30}{2} = 15\\ \\text{(km/h)}$.',
        'Người thứ hai: $v_2 = \\dfrac{30}{1{,}5} = 20\\ \\text{(km/h)}$.',
        'Cùng đi $30\\ \\text{km}$, người thứ hai mất ít thời gian hơn: đồ thị của người thứ hai dốc hơn.',
      ],
      answer: 'Người thứ hai đi nhanh hơn ($20\\ \\text{km/h} > 15\\ \\text{km/h}$).',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt:
        'Trên đồ thị quãng đường – thời gian, một đoạn thẳng nằm ngang (song song với trục thời gian) cho biết vật',
      options: [
        'chuyển động với tốc độ rất lớn',
        'đứng yên',
        'chuyển động với tốc độ không đổi',
        'chuyển động ngược lại',
      ],
      answer: 1,
      hints: ['Trên đoạn nằm ngang, quãng đường $s$ có thay đổi theo thời gian không?'],
      solution:
        'Trên đoạn nằm ngang, thời gian tăng nhưng quãng đường không đổi: vật không đi thêm được mét nào, tức là đứng yên.',
    },
    {
      type: 'order',
      prompt: 'Sắp xếp các bước vẽ đồ thị quãng đường – thời gian theo đúng thứ tự.',
      items: [
        'Nối các điểm lại với nhau',
        'Vẽ hai trục vuông góc $Ot$ và $Os$',
        'Xác định các điểm $(t;\\ s)$ từ bảng số liệu',
        'Chọn tỉ lệ phù hợp trên mỗi trục',
      ],
      answer: [1, 3, 2, 0],
      hints: ['Phải có trục và tỉ lệ thì mới đánh dấu được điểm.'],
      solution: 'Vẽ hai trục → chọn tỉ lệ → xác định các điểm → nối các điểm.',
    },
    {
      type: 'number',
      prompt:
        'Ô tô có bảng số liệu $t = 0; 1; 2; 3; 4$ h ứng với $s = 0; 60; 120; 180; 180$ km. Sau $2{,}5$ giờ kể từ lúc khởi hành, ô tô đi được bao nhiêu kilômét?',
      answer: 150,
      unit: 'km',
      hints: [
        'Thời điểm $2{,}5\\ \\text{h}$ nằm trên đoạn nghiêng nào của đồ thị?',
        'Trên đoạn đó ô tô chạy $60\\ \\text{km/h}$; dùng $s = v \\cdot t$.',
      ],
      solution:
        'Trong $3$ giờ đầu ô tô chạy đều $60\\ \\text{km/h}$, nên sau $2{,}5\\ \\text{h}$: $s = 60 \\cdot 2{,}5 = 150\\ \\text{(km)}$.',
    },
    {
      type: 'number',
      prompt:
        'Đồ thị quãng đường – thời gian của một người đi xe đạp là đoạn thẳng đi qua gốc $O$ và điểm $(2\\ \\text{h};\\ 30\\ \\text{km})$. Tốc độ của người đó là bao nhiêu kilômét trên giờ?',
      answer: 15,
      unit: 'km/h',
      hints: ['Đọc quãng đường và thời gian tương ứng ở một điểm trên đồ thị rồi chia.'],
      solution: '$v = \\dfrac{s}{t} = \\dfrac{30}{2} = 15\\ \\text{(km/h)}$.',
    },
    {
      type: 'number',
      prompt:
        'Với người đi xe đạp ở câu trên (đồ thị thẳng, tốc độ không đổi), sau bao nhiêu giờ người đó đi được $45\\ \\text{km}$?',
      answer: 3,
      unit: 'giờ',
      hints: ['Kéo dài đồ thị; hoặc dùng $t = \\dfrac{s}{v}$.'],
      solution: '$t = \\dfrac{s}{v} = \\dfrac{45}{15} = 3\\ \\text{(h)}$.',
    },
    {
      type: 'choice',
      prompt:
        'Trên cùng một hệ trục, đồ thị của xe X là đoạn thẳng từ $O$ đến $(1\\ \\text{h};\\ 40\\ \\text{km})$, của xe Y là đoạn thẳng từ $O$ đến $(1\\ \\text{h};\\ 60\\ \\text{km})$. Nhận xét nào đúng?',
      options: [
        'Đồ thị của Y dốc hơn, Y chạy nhanh hơn',
        'Đồ thị của X dốc hơn, X chạy nhanh hơn',
        'Hai xe chạy nhanh như nhau vì cùng chạy $1$ giờ',
        'Đồ thị của Y dốc hơn nên Y chạy chậm hơn',
      ],
      answer: 0,
      hints: ['Cùng $1$ giờ, xe nào đi được quãng đường dài hơn?'],
      solution:
        'Trong cùng $1\\ \\text{h}$, Y đi $60\\ \\text{km}$, X đi $40\\ \\text{km}$: Y nhanh hơn ($60\\ \\text{km/h}$ so với $40\\ \\text{km/h}$) và đồ thị của Y dốc hơn.',
    },
    {
      type: 'number',
      prompt:
        'Bạn A đi bộ có bảng số liệu $t = 0; 15; 20; 30$ (min) ứng với $s = 0; 1000; 1000; 2000$ (m). Bạn A đứng yên trong bao nhiêu phút?',
      answer: 5,
      unit: 'phút',
      hints: ['Tìm khoảng thời gian mà quãng đường không thay đổi.'],
      solution:
        'Từ phút thứ $15$ đến phút thứ $20$, quãng đường vẫn là $1000\\ \\text{m}$: A đứng yên $20 - 15 = 5$ phút.',
    },
    {
      type: 'number',
      prompt:
        'Cũng với bạn A ở câu trên, tốc độ của A trong $10$ phút cuối là bao nhiêu mét trên giây (làm tròn đến hàng phần trăm)?',
      answer: 1.67,
      tolerance: 0.005,
      unit: 'm/s',
      hints: ['Trong $10$ phút cuối A đi thêm bao nhiêu mét?', 'Đổi $10$ phút ra giây.'],
      solution:
        'A đi thêm $2000 - 1000 = 1000\\ \\text{m}$ trong $10\\ \\text{min} = 600\\ \\text{s}$: $v = \\dfrac{1000}{600} \\approx 1{,}67\\ \\text{(m/s)}$.',
    },
    {
      type: 'multi',
      prompt: 'Từ đồ thị quãng đường – thời gian của một vật, ta có thể biết được những gì?',
      options: [
        'Quãng đường vật đi được sau một thời gian cho trước',
        'Thời gian vật cần để đi hết một quãng đường',
        'Tốc độ của vật trên từng đoạn',
        'Khối lượng của vật',
        'Hình dạng con đường vật đi',
      ],
      answers: [0, 1, 2],
      hints: [
        'Đồ thị chỉ ghi hai đại lượng: $s$ và $t$.',
        'Đồ thị là đường biểu diễn $s$ theo $t$, không phải bản vẽ con đường.',
      ],
      solution:
        'Đồ thị cho biết cặp giá trị $(t;\\ s)$, nên đọc được quãng đường, thời gian và tính được tốc độ $v = \\dfrac{s}{t}$. Nó không cho biết khối lượng, cũng không vẽ hình dạng con đường.',
    },
  ],
  takeaways: [
    'Vẽ đồ thị $s$ – $t$: vẽ hai trục $Ot$, $Os$; chọn tỉ lệ; xác định các điểm $(t;\\ s)$ từ bảng; nối các điểm.',
    'Tốc độ không đổi: đồ thị là đoạn thẳng nằm nghiêng; đoạn càng dốc thì tốc độ càng lớn.',
    'Đoạn nằm ngang (song song trục $Ot$): vật đứng yên.',
    'Từ đồ thị đọc được quãng đường, thời gian, và tính được tốc độ $v = \\dfrac{s}{t}$ trên từng đoạn.',
  ],
};
