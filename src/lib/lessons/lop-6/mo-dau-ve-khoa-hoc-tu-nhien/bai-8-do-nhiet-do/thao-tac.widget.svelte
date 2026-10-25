<script>
  import RightWrongSorter from '../_shared/right-wrong-sorter.svelte';

  const ACTIONS = [
    {
      id: 'lau-sach',
      label: 'Lau sạch bầu nhiệt kế y tế bằng bông và cồn trước khi đo',
      ok: true,
      why: 'Nhiệt kế y tế dùng cho nhiều người nên phải giữ sạch.',
    },
    {
      id: 'vay',
      label: 'Vẩy nhiệt kế y tế thuỷ ngân cho thuỷ ngân tụt xuống dưới vạch 35 °C',
      ok: true,
      why: 'Nhiệt kế y tế giữ số chỉ cũ; phải vẩy thì mới đo được lần mới.',
    },
    {
      id: 'kep-nach',
      label: 'Kẹp nhiệt kế vào nách, đợi 2 đến 3 phút rồi lấy ra đọc',
      ok: true,
      why: 'Thuỷ ngân cần thời gian để nóng bằng cơ thể.',
    },
    {
      id: 'bip',
      label: 'Đọc nhiệt kế điện tử sau khi nghe tiếng "bíp"',
      ok: true,
      why: 'Tiếng "bíp" báo số chỉ đã ổn định.',
    },
    {
      id: 'than-nk',
      label: 'Cầm vào phần thân nhiệt kế khi đo nhiệt độ cốc nước',
      ok: true,
      why: 'Tay không chạm bầu nên không làm thay đổi số chỉ.',
    },
    {
      id: 'nam-bau',
      label: 'Nắm chặt bầu nhiệt kế khi đo nhiệt độ cốc nước',
      ok: false,
      why: 'Hơi ấm của tay làm nóng bầu nhiệt kế, số chỉ sai.',
    },
    {
      id: 'y-te-soi',
      label: 'Dùng nhiệt kế y tế để đo nhiệt độ nước đang sôi',
      ok: false,
      why: 'Nhiệt kế y tế chỉ đo đến 42 °C; nhúng vào nước sôi sẽ làm vỡ nhiệt kế.',
    },
    {
      id: 'doc-ngay',
      label: 'Đọc kết quả ngay khi vừa nhúng nhiệt kế vào nước',
      ok: false,
      why: 'Phải đợi cột chất lỏng đứng yên rồi mới đọc.',
    },
    {
      id: 'cham-day',
      label: 'Để bầu nhiệt kế chạm đáy cốc nước đang đun',
      ok: false,
      why: 'Đáy cốc nóng hơn nước; bầu nhiệt kế phải ngập trong nước, không chạm đáy và thành cốc.',
    },
  ];
</script>

<RightWrongSorter label="Phân loại các thao tác khi dùng nhiệt kế" actions={ACTIONS} seed={83} />
