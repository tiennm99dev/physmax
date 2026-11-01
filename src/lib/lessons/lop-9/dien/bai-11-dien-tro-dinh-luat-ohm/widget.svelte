<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import { formatNumber } from '#lib/core/number-format.js';
  import { button, card } from '#lib/core/ui.js';
  import {
    AREAS,
    I_MAX,
    LENGTHS,
    MATERIALS,
    U_MAX,
    addPoint,
    lineEnd,
    materialById,
    ohmCurrent,
    ratios,
    wireResistance,
  } from './engine.js';

  /** @typedef {{ key: string, label: string, r: number, points: { u: number, i: number }[] }} Series */

  const COLORS = ['#4F46E5', '#D7263D', '#059669', '#D97706'];
  const GW = 360;
  const GH = 250;
  const X0 = 44;
  const Y0 = 214;
  const XW = 296;
  const YH = 196;

  let materialId = $state('constantan');
  let length = $state('1');
  let area = $state('0.1');
  let voltage = $state(3);
  /** @type {Series[]} */
  let series = $state([]);

  const material = $derived(materialById(materialId));
  const r = $derived(wireResistance(material.rho, Number(length), Number(area)));
  const current = $derived(ohmCurrent(voltage, r));
  const key = $derived(`${materialId}|${length}|${area}`);
  const wireLabel = $derived(
    `${material.name}, ${formatNumber(Number(length))} m, ${formatNumber(Number(area))} mm²`,
  );
  const active = $derived(series.find((s) => s.key === key) ?? null);
  const lineReady = $derived((active?.points.filter((p) => p.i > 0).length ?? 0) >= 2);

  const f = (/** @type {number} */ v, d = 2) => formatNumber(v, d);
  const gx = (/** @type {number} */ u) => X0 + (u / U_MAX) * XW;
  const gy = (/** @type {number} */ i) => Y0 - (i / I_MAX) * YH;

  function record() {
    const point = { u: voltage, i: current };
    const old = series.find((s) => s.key === key);
    if (old) {
      series = series.map((s) => (s.key === key ? { ...s, points: addPoint(s.points, point) } : s));
    } else {
      series = [...series, { key, label: wireLabel, r, points: [point] }].slice(-COLORS.length);
    }
  }
  function clear() {
    series = [];
  }

  const colorOf = (/** @type {number} */ i) => COLORS[i % COLORS.length];

  const feedback = $derived.by(() => {
    if (!active) {
      return 'Đặt hiệu điện thế bằng biến trở, rồi nhấn "Ghi điểm đo" để chấm điểm $(U; I)$ của dây này lên đồ thị.';
    }
    if (!lineReady) {
      return 'Đổi hiệu điện thế và ghi thêm ít nhất một điểm nữa để thấy hình dạng đồ thị.';
    }
    const ratio = ratios(active.points);
    let text = `Các điểm của dây ${active.label} nằm trên một đường thẳng đi qua gốc $O$: thương số $U/I$ luôn bằng ${f(ratio.value ?? active.r)} Ω, đó là điện trở $R$ của dây. Khi $U$ tăng bao nhiêu lần thì $I$ tăng bấy nhiêu lần.`;
    const lines = series.filter((s) => s.points.filter((p) => p.i > 0).length >= 2);
    if (lines.length >= 2) {
      const sorted = [...lines].sort((a, b) => a.r - b.r);
      const lo = sorted[0];
      const hi = sorted[sorted.length - 1];
      text +=
        lo.r === hi.r
          ? ' Các dây đã vẽ có cùng điện trở nên đồ thị trùng nhau.'
          : ` So sánh: dây ${f(lo.r)} Ω có đồ thị dốc hơn dây ${f(hi.r)} Ω. Điện trở càng lớn thì đường thẳng càng thoải; độ dốc $I/U$ bằng $1/R$.`;
    } else {
      text += ' Đổi vật liệu, chiều dài hoặc tiết diện và vẽ thêm một dây để so sánh độ dốc.';
    }
    return text;
  });
</script>

<div class="space-y-4">
  <div class="grid gap-3 sm:grid-cols-3">
    <SegmentedControl
      label="Vật liệu dây"
      options={MATERIALS.map((m) => ({ value: m.id, label: m.name }))}
      bind:value={materialId}
    />
    <SegmentedControl
      label="Chiều dài l"
      options={LENGTHS.map((l) => ({ value: String(l), label: `${l} m` }))}
      bind:value={length}
    />
    <SegmentedControl
      label="Tiết diện S"
      options={AREAS.map((s) => ({ value: String(s), label: `${formatNumber(s)} mm²` }))}
      bind:value={area}
    />
  </div>

  <figure class="{card} p-2">
    <svg
      viewBox="0 0 360 150"
      class="mx-auto block w-full max-w-md select-none"
      role="img"
      aria-label="Mạch đo: nguồn, biến trở, ampe kế nối tiếp với dây {wireLabel}, vôn kế mắc song song với dây. Vôn kế chỉ {f(
        voltage,
      )} V, ampe kế chỉ {f(current)} A."
    >
      <g stroke="#334155" stroke-width="2.5" fill="none">
        <path d="M 30 62 V 24 H 330 V 110 H 30 V 82" />
      </g>
      <line x1="14" y1="66" x2="46" y2="66" stroke="#334155" stroke-width="3" />
      <line x1="22" y1="78" x2="38" y2="78" stroke="#334155" stroke-width="6" />
      <text x="50" y="70" class="fill-rose-600 text-[12px] font-bold">+</text>
      <!-- rheostat -->
      <rect x="80" y="15" width="60" height="18" fill="#fff" stroke="#334155" stroke-width="2" />
      <line x1="84" y1="44" x2="136" y2="6" stroke="#334155" stroke-width="2" />
      <text x="110" y="52" text-anchor="middle" class="fill-slate-600 text-[10px]">biến trở</text>
      <!-- ammeter -->
      <circle cx="190" cy="24" r="14" fill="#fff" stroke="#334155" stroke-width="2.5" />
      <text x="190" y="29" text-anchor="middle" class="fill-slate-800 text-[13px] font-bold">A</text
      >
      <text x="190" y="54" text-anchor="middle" class="fill-indigo-700 text-[12px] font-semibold"
        >{f(current)} A</text
      >
      <!-- wire under test -->
      <path
        d="M 150 110 q 6 -12 12 0 q 6 12 12 0 q 6 -12 12 0 q 6 12 12 0 q 6 -12 12 0 q 6 12 12 0 q 6 -12 12 0 q 6 12 12 0 q 6 -12 12 0 q 6 12 12 0"
        fill="#fff"
        stroke="#D97706"
        stroke-width="3"
      />
      <text x="210" y="134" text-anchor="middle" class="fill-amber-700 text-[11px] font-semibold"
        >R = {f(r)} Ω</text
      >
      <!-- voltmeter across the wire -->
      <path
        d="M 150 110 V 80 H 196 M 224 80 H 270 V 110"
        stroke="#334155"
        stroke-width="2"
        fill="none"
      />
      <circle cx="210" cy="80" r="14" fill="#fff" stroke="#334155" stroke-width="2.5" />
      <text x="210" y="85" text-anchor="middle" class="fill-slate-800 text-[13px] font-bold">V</text
      >
      <text x="300" y="84" text-anchor="middle" class="fill-indigo-700 text-[12px] font-semibold"
        >{f(voltage)} V</text
      >
    </svg>
  </figure>

  <SliderField
    label="Biến trở: hiệu điện thế U"
    bind:value={voltage}
    min={0}
    max={U_MAX}
    step={0.5}
    unit="V"
    format={(v) => formatNumber(v, 1)}
  />

  <div class="flex flex-wrap gap-2">
    <button type="button" class={button.primary} onclick={record}>Ghi điểm đo</button>
    <button type="button" class={button.quiet} onclick={clear} disabled={series.length === 0}
      >Xoá đồ thị</button
    >
  </div>

  <figure class="{card} p-2">
    <svg
      viewBox="0 0 {GW} {GH}"
      class="mx-auto block w-full max-w-md select-none"
      role="img"
      aria-label="Đồ thị cường độ dòng điện I theo hiệu điện thế U của {series.length} dây đã đo."
    >
      {#each [1, 2, 3, 4, 5, 6] as u (u)}
        <line x1={gx(u)} y1={Y0} x2={gx(u)} y2={Y0 - YH} stroke="#e2e8f0" />
        <text x={gx(u)} y={Y0 + 14} text-anchor="middle" class="fill-slate-600 text-[10px]"
          >{u}</text
        >
      {/each}
      {#each [0.5, 1, 1.5, 2, 2.5, 3] as i (i)}
        <line x1={X0} y1={gy(i)} x2={X0 + XW} y2={gy(i)} stroke="#e2e8f0" />
        <text x={X0 - 6} y={gy(i) + 3} text-anchor="end" class="fill-slate-600 text-[10px]"
          >{formatNumber(i)}</text
        >
      {/each}
      <line x1={X0} y1={Y0} x2={X0 + XW + 8} y2={Y0} stroke="#334155" stroke-width="1.5" />
      <line x1={X0} y1={Y0} x2={X0} y2={Y0 - YH - 8} stroke="#334155" stroke-width="1.5" />
      <text x={X0 + XW + 6} y={Y0 + 28} text-anchor="end" class="fill-slate-700 text-[11px]"
        >U (V)</text
      >
      <text x={X0 + 4} y={Y0 - YH - 6} class="fill-slate-700 text-[11px]">I (A)</text>
      <text x={X0 - 8} y={Y0 + 14} text-anchor="end" class="fill-slate-600 text-[10px]">O</text>
      {#each series as s, k (s.key)}
        {#if s.points.filter((p) => p.i > 0).length >= 2}
          {@const end = lineEnd(s.r)}
          <line
            x1={gx(0)}
            y1={gy(0)}
            x2={gx(end.u)}
            y2={gy(end.i)}
            stroke={colorOf(k)}
            stroke-width="2"
            stroke-dasharray={s.key === key ? '' : '5 4'}
          />
        {/if}
        {#each s.points as p (p.u)}
          <circle cx={gx(p.u)} cy={gy(p.i)} r="4.5" fill={colorOf(k)} stroke="#fff" />
        {/each}
      {/each}
    </svg>
    {#if series.length > 0}
      <ul class="mt-2 space-y-1 text-sm">
        {#each series as s, k (s.key)}
          <li class="flex items-center gap-2">
            <span class="inline-block h-3 w-3 rounded-full" style:background={colorOf(k)}></span>
            <span class={s.key === key ? 'font-semibold' : ''}
              >{s.label}: R = {f(s.r)} Ω, {s.points.length} điểm</span
            >
          </li>
        {/each}
      </ul>
    {/if}
  </figure>

  {#if active}
    <div class="overflow-x-auto">
      <table class="w-full min-w-64 text-center text-sm tabular-nums">
        <caption class="mb-1 text-left text-sm font-semibold text-slate-700"
          >Bảng số liệu dây {active.label}</caption
        >
        <thead>
          <tr class="border-b border-slate-300 text-slate-600">
            <th scope="col" class="py-1">U (V)</th>
            <th scope="col" class="py-1">I (A)</th>
            <th scope="col" class="py-1">U/I (Ω)</th>
          </tr>
        </thead>
        <tbody>
          {#each active.points as p (p.u)}
            <tr class="border-b border-slate-100">
              <td class="py-1">{f(p.u)}</td>
              <td class="py-1">{f(p.i, 3)}</td>
              <td class="py-1">{p.i > 0 ? f(p.u / p.i) : '—'}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  {/if}

  <FeedbackNote tone={lineReady ? 'ok' : 'info'} text={feedback} />
</div>
