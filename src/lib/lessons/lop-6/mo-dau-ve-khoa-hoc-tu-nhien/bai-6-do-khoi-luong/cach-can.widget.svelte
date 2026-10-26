<script>
  import RightWrongSorter from '#lib/core/right-wrong-sorter.svelte';

  const ACTIONS = [
    {
      id: 'mat-phang',
      label: 'Đặt cân trên mặt bàn bằng phẳng',
      ok: true,
      why: 'Cân đặt nghiêng thì kim hoặc số chỉ không đúng.',
    },
    {
      id: 'chinh-0',
      label: 'Chỉnh kim về vạch 0 khi đĩa còn trống',
      ok: true,
      why: 'Kim lệch khỏi vạch 0 thì mọi số đọc đều sai đúng chừng ấy.',
    },
    {
      id: 'giua-dia',
      label: 'Đặt vật vào chính giữa đĩa cân',
      ok: true,
      why: 'Vật nằm giữa đĩa thì cân chịu lực đều, đo chính xác hơn.',
    },
    {
      id: 'vuong-goc',
      label: 'Mắt nhìn vuông góc với vạch chia ở đầu kim',
      ok: true,
      why: 'Nhìn lệch thì đầu kim như chỉ vào vạch khác.',
    },
    {
      id: 'lech-dia',
      label: 'Để vật cồng kềnh lệch hẳn sang một bên đĩa',
      ok: false,
      why: 'Vật lệch một bên làm đĩa nghiêng, kết quả kém chính xác; phải đặt vật vào giữa đĩa.',
    },
    {
      id: 'qua-ghd',
      label: 'Đặt bao gạo 10 kg lên cân có GHĐ 5 kg',
      ok: false,
      why: 'Vật nặng hơn GHĐ thì cân không đo được và có thể hỏng.',
    },
    {
      id: 'dao-dong',
      label: 'Đọc số ngay khi kim còn đang dao động',
      ok: false,
      why: 'Phải đợi cân ổn định, kim đứng yên rồi mới đọc.',
    },
    {
      id: 'nhin-xien',
      label: 'Nhìn xiên từ bên cạnh để đọc số',
      ok: false,
      why: 'Mắt phải nhìn vuông góc với mặt cân ở đầu kim.',
    },
  ];
</script>

<RightWrongSorter label="Phân loại các thao tác khi cân" actions={ACTIONS} seed={61} />
