<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { formatNumber } from '#lib/core/number-format.js';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import { card } from '#lib/core/ui.js';
  import { ticksUpTo } from '#lib/domain/ticks.js';
  import XyPlot from '#lib/domain/xy-plot.svelte';
  import {
    CELLS,
    CUT_IN,
    CUT_OUT,
    RATED_SPEED,
    hydroPower,
    powerCurve,
    ratedPower,
    solarDayKwh,
    solarPower,
    windPower,
    windRaw,
  } from './engine.js';

  let tab = $state('mat-troi');

  // Solar panel
  let irradiance = $state(800);
  let area = $state(10);
  let cell = $state('don-tinh-the');
  const efficiency = $derived(CELLS.find((c) => c.id === cell)?.efficiency ?? 0.2);
  const solarW = $derived(solarPower(irradiance, area, efficiency));
  const dayKwh = $derived(solarDayKwh(area, efficiency, 4));
  const rays = $derived(Array.from({ length: Math.round(irradiance / 125) }, (_, i) => i));
  const lit = $derived(Math.floor(solarW / 10));

  // Wind turbine
  let speed = $state(8);
  let radius = $state(40);
  const windW = $derived(windPower(speed, radius));
  const rated = $derived(ratedPower(radius));
  const curve = $derived(powerCurve(radius, 30));
  const yMax = $derived((rated / 1e6) * 1.2);
  const half = $derived(speed / 2);
  const windNote = $derived.by(() => {
    if (speed < CUT_IN) return `Gió dưới ${CUT_IN} m/s quá yếu, cánh quạt chưa quay được.`;
    if (speed > CUT_OUT)
      return `Gió trên ${CUT_OUT} m/s quá mạnh: tua bin dừng lại để không bị hỏng.`;
    if (windRaw(speed, radius) >= rated)
      return `Gió từ ${RATED_SPEED} m/s trở lên: tua bin đã đạt công suất định mức, không tăng thêm.`;
    if (half < CUT_IN)
      return 'Công suất tỉ lệ với $v^3$: tốc độ gió gấp đôi thì công suất gấp $2^3 = 8$ lần.';
    return `Công suất tỉ lệ với $v^3$: ở ${formatNumber(half, 2)} m/s gió chỉ cho ${formatNumber(
      windRaw(half, radius) / 1e3,
      0,
    )} kW, tốc độ gấp đôi thì công suất gấp $2^3 = 8$ lần.`;
  });

  // Hydropower
  let flow = $state(200);
  let head = $state(80);
  const hydroW = $derived(hydroPower(flow, head, 0.9));
  const hoaBinhShare = $derived((hydroW / 1.92e9) * 100);

  /** @param {number} w */
  function powerText(w) {
    if (w >= 1e6) return `${formatNumber(w / 1e6, 2)} MW`;
    if (w >= 1e3) return `${formatNumber(w / 1e3, 1)} kW`;
    return `${formatNumber(w, 0)} W`;
  }
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Công nghệ"
    options={[
      { value: 'mat-troi', label: 'Pin Mặt Trời' },
      { value: 'gio', label: 'Tua bin gió' },
      { value: 'thuy-dien', label: 'Thuỷ điện' },
    ]}
    bind:value={tab}
  />

  {#if tab === 'mat-troi'}
    <svg
      viewBox="0 0 320 150"
      class="mx-auto block w-full max-w-md"
      role="img"
      aria-label="Tấm pin nhận ánh sáng {formatNumber(
        irradiance,
        0,
      )} oát trên mét vuông, phát {powerText(solarW)}"
    >
      <rect width="320" height="150" fill="#f0f9ff" rx="12" />
      <circle cx="40" cy="34" r="20" fill="#facc15" />
      {#each rays as i (i)}
        <line
          x1={56 + i * 8}
          y1={44 + i * 2}
          x2={150 + i * 18}
          y2={92}
          stroke="#f59e0b"
          stroke-width="1.5"
          stroke-dasharray="4 3"
        />
      {/each}
      <polygon points="130,96 290,96 270,130 110,130" fill="#1e3a8a" />
      {#each [0, 1, 2, 3] as c (c)}
        <line
          x1={130 + c * 40}
          y1="96"
          x2={110 + c * 40}
          y2="130"
          stroke="#93c5fd"
          stroke-width="1"
        />
      {/each}
      <line x1="120" y1="113" x2="280" y2="113" stroke="#93c5fd" stroke-width="1" />
    </svg>
    <div class="{card} grid gap-3 p-4 sm:grid-cols-2">
      <SliderField
        label="Cường độ ánh sáng G"
        bind:value={irradiance}
        min={0}
        max={1000}
        step={50}
        unit="W/m²"
      />
      <SliderField label="Diện tích tấm pin A" bind:value={area} min={1} max={30} unit="m²" />
      <div class="sm:col-span-2">
        <SegmentedControl
          label="Loại pin"
          options={CELLS.map((c) => ({
            value: c.id,
            label: `${c.label} (${formatNumber(c.efficiency * 100, 0)}%)`,
          }))}
          bind:value={cell}
        />
      </div>
    </div>
    <div class="{card} space-y-1 p-4 text-sm text-slate-700" aria-live="polite">
      <p class="text-base">
        Công suất điện: <span class="font-bold text-indigo-700">{powerText(solarW)}</span>
      </p>
      <p>
        P = η·G·A = {formatNumber(efficiency, 2)} · {formatNumber(irradiance, 0)} · {formatNumber(
          area,
          0,
        )} = {formatNumber(solarW, 0)} W, đủ thắp sáng {lit} bóng LED 10 W.
      </p>
      <p>
        Nếu mỗi ngày tấm pin nhận lượng nắng bằng 4 giờ ở {formatNumber(1000)} W/m², điện năng thu được
        khoảng
        <span class="font-semibold">{formatNumber(dayKwh, 1)} kWh</span>.
      </p>
    </div>
    <FeedbackNote
      tone="info"
      text={irradiance === 0
        ? 'Không có ánh sáng thì pin không phát điện.'
        : `Chỉ khoảng ${formatNumber(efficiency * 100, 0)}% năng lượng ánh sáng thành điện năng; phần còn lại phản xạ hoặc làm nóng tấm pin.`}
    />
  {:else if tab === 'gio'}
    <XyPlot
      lines={[{ points: curve }]}
      marks={[{ x: speed, y: windW / 1e6 }]}
      guides={[{ y: rated / 1e6, label: 'định mức' }]}
      xMax={30}
      {yMax}
      xTicks={[0, 5, 10, 15, 20, 25, 30]}
      yTicks={ticksUpTo(yMax)}
      xLabel="v (m/s)"
      yLabel="P (MW)"
      label="Đường công suất của tua bin theo tốc độ gió; hiện tại {formatNumber(
        speed,
        1,
      )} mét trên giây, {powerText(windW)}"
    />
    <div class="{card} grid gap-3 p-4 sm:grid-cols-2">
      <SliderField label="Tốc độ gió v" bind:value={speed} min={0} max={30} step={0.5} unit="m/s" />
      <SliderField
        label="Chiều dài cánh R"
        bind:value={radius}
        min={10}
        max={60}
        step={5}
        unit="m"
      />
    </div>
    <div class="{card} space-y-1 p-4 text-sm text-slate-700" aria-live="polite">
      <p class="text-base">
        Công suất điện: <span class="font-bold text-indigo-700">{powerText(windW)}</span>
      </p>
      <p>Công suất định mức của tua bin này: {powerText(rated)}.</p>
    </div>
    <FeedbackNote tone="info" text={windNote} />
  {:else}
    <div class="{card} grid gap-3 p-4 sm:grid-cols-2">
      <SliderField
        label="Lưu lượng nước Q"
        bind:value={flow}
        min={0}
        max={2000}
        step={20}
        unit="m³/s"
      />
      <SliderField
        label="Độ cao cột nước h"
        bind:value={head}
        min={5}
        max={150}
        step={5}
        unit="m"
      />
    </div>
    <div class="{card} space-y-2 p-4 text-sm text-slate-700" aria-live="polite">
      <p class="text-base">
        Công suất điện: <span class="font-bold text-indigo-700">{powerText(hydroW)}</span>
      </p>
      <p>
        P = η·ρ·g·Q·h với hiệu suất η = 90%, ρ = {formatNumber(1000)} kg/m³, g = {formatNumber(9.8)} m/s².
      </p>
      <div
        class="h-4 w-full overflow-hidden rounded-full bg-slate-200"
        role="meter"
        aria-label="So với thuỷ điện Hoà Bình"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.min(100, Math.round(hoaBinhShare))}
        aria-valuetext="{formatNumber(hoaBinhShare, 0)}% công suất thuỷ điện Hoà Bình"
      >
        <div class="h-full bg-sky-500" style:width="{Math.min(100, hoaBinhShare)}%"></div>
      </div>
      <p>
        Bằng khoảng {formatNumber(hoaBinhShare, 0)}% công suất nhà máy thuỷ điện Hoà Bình ({formatNumber(
          1920,
        )} MW).
      </p>
    </div>
    <FeedbackNote
      tone="info"
      text="Công suất tỉ lệ với cả lưu lượng $Q$ và độ cao $h$: đập càng cao, nước càng nhiều thì điện càng lớn, nhưng hồ chứa càng rộng và ngập càng nhiều đất rừng."
    />
  {/if}
</div>
