<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import { frameLoop } from '#lib/core/motion.js';
  import { formatFixed, formatNumber } from '#lib/core/number-format.js';
  import { button, card } from '#lib/core/ui.js';
  import {
    GAP_MM,
    LAID_AT,
    SNAP_BAND,
    STRAIGHT_AT,
    SUBSTANCES,
    bend,
    closingTemperature,
    contactClosed,
    railGap,
    railGrowth,
    volumeGain,
  } from './engine.js';

  const SCENES = [
    { value: 'ray', label: 'Thanh ray' },
    { value: 'bang-kep', label: 'Băng kép' },
    { value: 'so-sanh', label: 'Rắn – lỏng – khí' },
  ];
  let scene = $state('ray');

  // Rails
  let railT = $state(20);
  let withGap = $state('co');
  const PX_PER_MM = 4;
  const JOINT = 180;
  const RAIL_Y = 74;
  const gapNow = $derived(railGap(railT, withGap === 'co' ? GAP_MM : 0));
  const growth = $derived(railGrowth(railT));
  const buckle = $derived(gapNow < 0 ? Math.min(34, 7 * Math.sqrt(-gapNow)) : 0);
  const shownGap = $derived(Math.max(0, gapNow) * PX_PER_MM);

  const railNote = $derived.by(() => {
    const g = withGap === 'co';
    if (gapNow < 0)
      return {
        tone: /** @type {'ok' | 'warn' | 'info'} */ ('warn'),
        text: `Ở ${formatNumber(railT)} °C, mỗi thanh ray dài thêm ${formatFixed(growth, 2)} mm so với lúc lắp nhưng ${g ? 'khe hở đã hết' : 'không có khe hở'}: hai đầu ray ép vào nhau, gây ra lực rất lớn làm đường ray cong vênh, rất nguy hiểm cho tàu.`,
      };
    if (growth < 0)
      return {
        tone: /** @type {'ok' | 'warn' | 'info'} */ ('info'),
        text: `Trời lạnh (${formatNumber(railT)} °C): thanh ray co lại ${formatFixed(-growth, 2)} mm, khe hở rộng ra thành ${formatFixed(gapNow, 2)} mm.`,
      };
    return {
      tone: /** @type {'ok' | 'warn' | 'info'} */ ('ok'),
      text: `Ở ${formatNumber(railT)} °C, mỗi thanh ray (dài 12,5 m, lắp ở ${LAID_AT} °C) dài thêm ${formatFixed(growth, 2)} mm; khe hở còn ${formatFixed(gapNow, 2)} mm, đủ chỗ cho ray nở ra. Với khe hở ${GAP_MM} mm, ray chịu được tới khoảng ${formatNumber(closingTemperature())} °C.`,
    };
  });

  // Bimetallic strip
  let stripT = $state(STRAIGHT_AT);
  let setPoint = $state(120);
  let iron = $state(false);
  const STRIP_X0 = 40;
  const STRIP_LEN = 240;
  const STRIP_Y = 96;
  const PX_PER_BEND = 0.07;
  let closed = $state(true);
  const lift = $derived(bend(stripT) * PX_PER_BEND);
  const tipY = $derived(STRIP_Y - lift);
  const contactY = $derived(
    closed ? tipY + 7 : STRIP_Y - bend(setPoint - SNAP_BAND) * PX_PER_BEND + 14,
  );

  /** The strip as a bent band: one curve per layer. @param {number} off */
  const layer = (off) =>
    `M${STRIP_X0} ${STRIP_Y + off} Q${STRIP_X0 + STRIP_LEN * 0.55} ${STRIP_Y + off} ${STRIP_X0 + STRIP_LEN} ${tipY + off}`;

  $effect(() => {
    if (!iron) return;
    return frameLoop((dt) => {
      // The heater warms the strip while the contact is closed and lets it
      // cool when the strip has lifted off.
      const next = closed ? stripT + 40 * dt : stripT - 0.25 * (stripT - STRAIGHT_AT) * dt;
      stripT = Math.round(Math.min(230, Math.max(-20, next)) * 10) / 10;
      closed = contactClosed(closed, stripT, setPoint);
    });
  });

  const stripNote = $derived.by(() => {
    const b = bend(stripT);
    const shape =
      Math.abs(b) < 1
        ? 'Băng kép thẳng.'
        : b > 0
          ? 'Băng kép bị nung nóng: đồng nở vì nhiệt nhiều hơn thép nên lớp đồng dài hơn, băng kép cong về phía thép (lớp đồng nằm ở mặt ngoài).'
          : 'Băng kép bị làm lạnh: đồng co lại nhiều hơn thép nên băng kép cong về phía đồng (lớp đồng nằm ở mặt trong).';
    const contact = closed
      ? 'Tiếp điểm đang đóng: dòng điện chạy qua dây đốt của bàn là, đèn báo sáng.'
      : `Băng kép cong lên, rời khỏi tiếp điểm: mạch điện bị ngắt, bàn là thôi nóng (nhiệt độ đặt ${formatNumber(setPoint)} °C).`;
    return {
      tone: /** @type {'ok' | 'warn' | 'info'} */ (closed ? 'info' : 'ok'),
      text: `${shape} ${contact}`,
    };
  });

  // Solids, liquids and gases
  let rise = $state(50);
  const STATE_COLOR = /** @type {Record<string, string>} */ ({
    khi: '#0ea5e9',
    long: '#8b5cf6',
    ran: '#f97316',
  });
  const STATE_NAME = /** @type {Record<string, string>} */ ({
    khi: 'chất khí',
    long: 'chất lỏng',
    ran: 'chất rắn',
  });
</script>

<div class="space-y-4">
  <SegmentedControl label="Thí nghiệm" options={SCENES} bind:value={scene} />

  {#if scene === 'ray'}
    <figure class="{card} p-2">
      <svg
        viewBox="0 0 360 130"
        class="mx-auto block w-full max-w-lg"
        role="img"
        aria-label="Chỗ nối hai thanh ray ở {formatNumber(railT)} độ C: {gapNow < 0
          ? 'ray bị cong vênh'
          : `khe hở ${formatFixed(gapNow, 1)} milimét`}."
      >
        <rect x="0" y="96" width="360" height="30" fill="#d6d3d1" />
        {#each [20, 70, 120, 170, 220, 270, 320] as x (x)}
          <rect x={x - 8} y={RAIL_Y + 6} width="26" height="10" fill="#78716c" />
        {/each}
        <path
          d="M4 {RAIL_Y} Q{(4 + JOINT) / 2} {RAIL_Y - 2 * buckle} {JOINT - shownGap / 2} {RAIL_Y}"
          fill="none"
          stroke="#475569"
          stroke-width="10"
        />
        <path
          d="M{JOINT + shownGap / 2} {RAIL_Y} Q{(JOINT + 356) / 2} {RAIL_Y -
            2 * buckle} 356 {RAIL_Y}"
          fill="none"
          stroke="#475569"
          stroke-width="10"
        />
        {#if gapNow > 0}
          <line
            x1={JOINT - shownGap / 2}
            y1={RAIL_Y - 16}
            x2={JOINT + shownGap / 2}
            y2={RAIL_Y - 16}
            stroke="#dc2626"
          />
          <text x={JOINT} y={RAIL_Y - 22} text-anchor="middle" class="fill-red-700 text-[11px]"
            >{formatFixed(gapNow, 1)} mm</text
          >
        {/if}
        <text x="8" y="16" class="fill-slate-600 text-[10px]"
          >Khe hở vẽ phóng to; chiều dài ray không theo tỉ lệ.</text
        >
      </svg>
    </figure>
    <FeedbackNote tone={railNote.tone} text={railNote.text} />
    <SliderField label="Nhiệt độ của đường ray" bind:value={railT} min={-10} max={70} unit="°C" />
    <SegmentedControl
      label="Khi lắp ray ở 20 °C"
      options={[
        { value: 'co', label: `Để khe hở ${GAP_MM} mm` },
        { value: 'khong', label: 'Không để khe hở' },
      ]}
      bind:value={withGap}
    />
  {:else if scene === 'bang-kep'}
    <figure class="{card} p-2">
      <svg
        viewBox="0 0 360 170"
        class="mx-auto block w-full max-w-lg"
        role="img"
        aria-label="Băng kép đồng – thép ở {formatNumber(stripT)} độ C, {bend(stripT) > 0
          ? 'cong về phía thép'
          : bend(stripT) < 0
            ? 'cong về phía đồng'
            : 'thẳng'}; tiếp điểm {closed ? 'đóng' : 'mở'}."
      >
        <rect x={STRIP_X0 - 26} y={STRIP_Y - 20} width="26" height="40" fill="#64748b" />
        <path d={layer(-3)} fill="none" stroke="#94a3b8" stroke-width="6" />
        <path d={layer(3)} fill="none" stroke="#c2410c" stroke-width="6" />
        <text x={STRIP_X0 + 6} y={STRIP_Y - 10} class="fill-slate-600 text-[10px]">thép</text>
        <text x={STRIP_X0 + 6} y={STRIP_Y + 20} class="fill-orange-800 text-[10px]">đồng</text>
        <!-- contact -->
        <line
          x1={STRIP_X0 + STRIP_LEN - 4}
          y1={contactY}
          x2={STRIP_X0 + STRIP_LEN - 4}
          y2="150"
          stroke="#334155"
          stroke-width="3"
        />
        <circle cx={STRIP_X0 + STRIP_LEN - 4} cy={contactY} r="3.5" fill="#eab308" />
        <!-- lamp and wire -->
        <polyline
          points="{STRIP_X0 - 13},{STRIP_Y + 20} {STRIP_X0 - 13},150 {STRIP_X0 + STRIP_LEN - 4},150"
          fill="none"
          stroke="#334155"
          stroke-width="1.5"
          stroke-dasharray="3 3"
        />
        <circle cx="150" cy="150" r="10" fill={closed ? '#fde047' : '#e2e8f0'} stroke="#475569" />
        <text x="150" y="168" text-anchor="middle" class="fill-slate-600 text-[9px]"
          >đèn báo / dây đốt</text
        >
        <text x="350" y="20" text-anchor="end" class="fill-slate-700 text-[13px] font-semibold"
          >{formatNumber(stripT)} °C</text
        >
      </svg>
    </figure>
    <FeedbackNote tone={stripNote.tone} text={stripNote.text} />
    <SliderField
      label="Nhiệt độ của băng kép"
      bind:value={stripT}
      oninput={(v) => {
        iron = false;
        closed = contactClosed(closed, v, setPoint);
      }}
      min={-20}
      max={230}
      unit="°C"
    />
    <SliderField
      label="Nhiệt độ đặt của bàn là"
      bind:value={setPoint}
      min={60}
      max={200}
      step={10}
      unit="°C"
      oninput={(v) => (closed = contactClosed(closed, stripT, v))}
    />
    <button
      type="button"
      class={iron ? button.secondary : button.primary}
      onclick={() => (iron = !iron)}
    >
      {iron ? 'Dừng bàn là' : 'Bật bàn là (tự động đóng ngắt)'}
    </button>
  {:else}
    <div class="{card} space-y-2 p-3 text-sm">
      <p class="font-semibold text-slate-700">
        Độ tăng thể tích của 1 000 cm³ mỗi chất khi nóng thêm {formatNumber(rise)} °C
      </p>
      {#each SUBSTANCES as s (s.id)}
        {@const dv = volumeGain(s.id, rise)}
        <div class="grid grid-cols-[6.5rem_1fr_4.5rem] items-center gap-2">
          <span>{s.label}</span>
          <div class="h-3 rounded bg-slate-100">
            <div
              class="h-3 rounded"
              style:width="{Math.max(dv > 0 ? 0.6 : 0, (100 * dv) / 183)}%"
              style:background={STATE_COLOR[s.state]}
            ></div>
          </div>
          <span class="text-right tabular-nums">{formatNumber(dv, 2)} cm³</span>
        </div>
      {/each}
      <p class="text-xs text-slate-500">
        Màu xanh: chất khí; tím: chất lỏng; cam: chất rắn. Số liệu theo bảng cho độ tăng 50 °C, tính
        tỉ lệ cho độ tăng khác.
      </p>
    </div>
    <FeedbackNote
      tone="ok"
      text={rise === 0
        ? 'Chưa nung nóng: thể tích các chất không đổi.'
        : `Nóng thêm ${formatNumber(rise)} °C: 1 000 cm³ không khí nở thêm ${formatNumber(volumeGain('khong-khi', rise), 1)} cm³, rượu ${formatNumber(volumeGain('ruou', rise), 1)} cm³, còn sắt chỉ ${formatNumber(volumeGain('sat', rise), 2)} cm³. Chất khí nở vì nhiệt nhiều hơn chất lỏng, chất lỏng nở nhiều hơn chất rắn; các ${STATE_NAME.khi} khác nhau nở như nhau, còn các ${STATE_NAME.long}, các ${STATE_NAME.ran} khác nhau nở khác nhau.`}
    />
    <SliderField label="Độ tăng nhiệt độ" bind:value={rise} min={0} max={50} unit="°C" />
  {/if}
</div>
