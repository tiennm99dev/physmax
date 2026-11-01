<script>
  import RightWrongSorter from '#lib/core/right-wrong-sorter.svelte';

  const ACTIONS = [
    {
      id: 'ngat-cau-dao',
      label: 'Ngắt cầu dao (aptomat) trước khi thay bóng đèn hay sửa ổ cắm.',
      ok: true,
      why: 'Ngắt nguồn thì không còn dòng điện chạy qua người khi chạm vào dây dẫn.',
    },
    {
      id: 'tay-uot',
      label: 'Cắm phích điện khi tay còn ướt.',
      ok: false,
      why: 'Nước làm cơ thể dẫn điện tốt hơn, dễ bị điện giật.',
    },
    {
      id: 'day-hong',
      label: 'Thay ngay dây điện bị hở, nứt vỏ cách điện.',
      ok: true,
      why: 'Lõi kim loại lộ ra có thể làm người chạm phải bị điện giật hoặc gây chập điện, cháy nổ.',
    },
    {
      id: 'tram-bien-ap',
      label: 'Trèo vào trạm biến thế để nhặt quả bóng.',
      ok: false,
      why: 'Không được lại gần trạm biến thế: hiệu điện thế rất cao, có thể phóng điện qua người dù chưa chạm vào.',
    },
    {
      id: 'tha-dieu',
      label: 'Thả diều gần đường dây điện cao thế.',
      ok: false,
      why: 'Dây diều vướng vào đường dây có thể dẫn điện xuống người thả.',
    },
    {
      id: 'vat-cach-dien',
      label: 'Dùng gậy gỗ khô tách người bị điện giật khỏi dây điện khi chưa ngắt được nguồn.',
      ok: true,
      why: 'Gỗ khô cách điện nên dòng điện không truyền sang người cứu. Tốt nhất là ngắt nguồn điện ngay.',
    },
    {
      id: 'cho-dien',
      label: 'Chọc que kim loại vào lỗ ổ cắm.',
      ok: false,
      why: 'Kim loại dẫn điện: với hiệu điện thế 220 V của mạng điện, dòng điện sẽ chạy qua que vào người.',
    },
    {
      id: 'thu-nghiem',
      label: 'Làm thí nghiệm với nguồn điện có hiệu điện thế dưới 40 V.',
      ok: true,
      why: 'Hiệu điện thế dưới 40 V thường được coi là an toàn cho thí nghiệm của học sinh.',
    },
  ];
</script>

<RightWrongSorter label="Sử dụng điện xoay chiều an toàn" actions={ACTIONS} seed={15} />
