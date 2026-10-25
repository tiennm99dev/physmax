<script>
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import { button, card } from '#lib/core/ui.js';
  import { formatFixed, formatNumber } from '#lib/core/number-format.js';
  import { arrowHead, shaftEnd } from '#lib/domain/arrow.js';
  import {
    PULL_STEP,
    RANGE,
    SURFACES,
    friction,
    limits,
    motionKind,
    snapPull,
    step,
    surface,
  } from './engine.js';

  const W = 400;
  const H = 180;
  const FLOOR = 124;
  const BX = 110;
  const BW = 90;
  const BH = 48;
  const ARROW_PX = 11; // pixels per newton
  const STRIPE = 36;
  const PX_PER_M = 120;
  const V_MAX = 2; // fastest a hand pulling the balance can follow, m/s

  /** @type {import('./engine.js').SurfaceId} */
  let surfaceId = $state('go');
  let load = $state('khong');
  let pull = $state(0);
  /** @type {import('./engine.js').Motion} */
  let motion = $state({ moving: false, v: 0 });
  let offset = $state(0);
  let reduceMotion = $state(false);
  /** @type {Array<{ key: string, label: string, value: number }>} */
  let records = $state([]);
  let note = $state('');

  const loaded = $derived(load === 'co');
  const lim = $derived(limits(surfaceId, loaded));
  const s = $derived(surface(surfaceId));
  const f = $derived(snapPull(pull));
  const fr = $derived(friction(motion, f, lim));
  const kind = $derived(motionKind(motion, f, lim));

  $effect(() => {
    reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let frame = 0;
    let last = performance.now();
    const tick = (/** @type {number} */ now) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const next = step(motion, f, lim, dt);
      if (next.moving !== motion.moving || next.v !== motion.v) motion = next;
      if (motion.v > V_MAX && pull > 0) {
        // The hand cannot keep up with a block that keeps speeding up: it lets go.
        pull = 0;
        note =
          'Khối gỗ chạy nhanh dần mãi nên tay không theo kịp và phải thả ra: không còn lực kéo, lực ma sát làm khối gỗ chậm dần rồi dừng lại.';
      }
      if (motion.v > 0) offset = (offset + motion.v * dt * PX_PER_M) % STRIPE;
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  });

  function resetRun() {
    pull = 0;
    motion = { moving: false, v: 0 };
    note = '';
  }
  function steady() {
    if (motion.moving) pull = lim.sliding;
  }
  function record() {
    if (kind !== 'deu') return;
    const key = `${surfaceId}:${load}`;
    const label = `${s.name}${loaded ? ', có quả nặng' : ''}`;
    records = [...records.filter((r) => r.key !== key), { key, label, value: lim.sliding }];
    note = `Đã ghi: ${label}, lực ma sát ${s.rolling ? 'lăn' : 'trượt'} ${N(lim.sliding)}.${
      records.length >= 2
        ? ' So sánh các dòng trong bảng: mặt nào ma sát lớn nhất, nhỏ nhất?'
        : ' Đổi bề mặt và đo tiếp.'
    }`;
  }

  const N = (/** @type {number} */ v) => `${formatNumber(v, 2)} N`;
  const fName = $derived(
    !motion.moving ? 'ma sát nghỉ' : s.rolling ? 'ma sát lăn' : 'ma sát trượt',
  );

  const feedback = $derived.by(() => {
    switch (kind) {
      case 'dung-yen':
        return f === 0
          ? 'Chưa kéo: khối gỗ đứng yên, không có lực ma sát. Kéo từ từ thanh trượt lực kéo.'
          : `Lực kéo ${N(f)} nhưng khối gỗ vẫn đứng yên: lực ma sát nghỉ ${N(fr)} cân bằng với lực kéo.`;
      case 'bat-dau':
        return `Lực kéo ${N(f)} đã vượt quá lực ma sát nghỉ lớn nhất: khối gỗ bắt đầu trượt.`;
      case 'nhanh-dan':
        return `Khối gỗ ${s.rolling ? 'lăn' : 'trượt'} nhanh dần vì lực kéo ${N(f)} lớn hơn lực ${fName} ${N(fr)}. Nhấn "Kéo đều" để lực kế chỉ đúng lực ma sát.`;
      case 'deu':
        return `Khối gỗ chuyển động đều: lực kéo bằng lực ${fName}, lực kế chỉ ${N(fr)}. Nhấn "Ghi số chỉ" để ghi vào bảng.`;
      case 'cham-dan':
        return `Lực kéo ${N(f)} nhỏ hơn lực ${fName} ${N(fr)}: khối gỗ chuyển động chậm dần rồi dừng lại.`;
    }
    return '';
  });

  // Spring balance between the block and the hand.
  const springEnd = $derived(282 + Math.min(70, f * 7));
  const hookY = FLOOR - BH / 2;
  const top = $derived(s.rolling ? FLOOR - 18 - BH : FLOOR - BH);
  const y = $derived(s.rolling ? hookY - 18 : hookY);
</script>

<div class="space-y-4">
  <div class="grid gap-3 sm:grid-cols-2">
    <SegmentedControl
      label="Bề mặt"
      options={SURFACES.map((x) => ({ value: x.id, label: x.name }))}
      bind:value={surfaceId}
      onchange={resetRun}
    />
    <SegmentedControl
      label="Đặt thêm quả nặng 0,5 kg lên khối gỗ"
      options={[
        { value: 'khong', label: 'Không' },
        { value: 'co', label: 'Có' },
      ]}
      bind:value={load}
      onchange={resetRun}
    />
  </div>

  <figure class="{card} overflow-hidden p-2">
    <svg
      viewBox="0 0 {W} {H}"
      class="mx-auto block w-full max-w-xl select-none"
      role="img"
      aria-label="Khối gỗ trên {s.name.toLowerCase()}. Lực kế chỉ {N(f)}. {feedback}"
    >
      <defs>
        <clipPath id="san-ma-sat">
          <rect x="0" y={FLOOR} width={W} height={H - FLOOR} />
        </clipPath>
      </defs>
      <!-- floor: its marks slide back while the block moves forward -->
      <rect
        x="0"
        y={FLOOR}
        width={W}
        height={H - FLOOR}
        fill={surfaceId === 'kinh' ? '#e0f2fe' : surfaceId === 'nham' ? '#d6d3d1' : '#fde68a'}
      />
      <g clip-path="url(#san-ma-sat)">
        {#each Array.from({ length: Math.ceil(W / STRIPE) + 2 }, (_, i) => i) as i (i)}
          <line
            x1={i * STRIPE - (reduceMotion ? 0 : offset)}
            y1={FLOOR + 4}
            x2={i * STRIPE - (reduceMotion ? 0 : offset) - 12}
            y2={H}
            stroke={surfaceId === 'nham' ? '#57534e' : '#94a3b8'}
            stroke-width={surfaceId === 'nham' ? 3 : 1}
            stroke-dasharray={surfaceId === 'nham' ? '2 3' : null}
          />
        {/each}
      </g>
      <line x1="0" y1={FLOOR} x2={W} y2={FLOOR} stroke="#475569" stroke-width="2" />

      <!-- block (on a trolley when rolling) -->
      {#if s.rolling}
        <rect x={BX - 4} y={FLOOR - 18} width={BW + 8} height="8" rx="2" fill="#64748b" />
        <circle cx={BX + 14} cy={FLOOR - 7} r="7" fill="#334155" />
        <circle cx={BX + BW - 14} cy={FLOOR - 7} r="7" fill="#334155" />
      {/if}
      <rect
        x={BX}
        y={top}
        width={BW}
        height={BH}
        rx="3"
        fill="#d97706"
        stroke="#78350f"
        stroke-width="2"
      />
      <text
        x={BX + BW / 2}
        y={top + 30}
        text-anchor="middle"
        class="fill-amber-50 text-[12px] font-bold">Khối gỗ</text
      >
      {#if loaded}
        <rect
          x={BX + 25}
          y={top - 22}
          width="40"
          height="22"
          rx="3"
          fill="#94a3b8"
          stroke="#334155"
        />
        <text
          x={BX + 45}
          y={top - 7}
          text-anchor="middle"
          class="fill-slate-900 text-[9px] font-bold">0,5 kg</text
        >
      {/if}

      <!-- spring balance pulled by the hand -->
      <line x1={BX + BW} y1={y} x2="232" y2={y} stroke="#334155" stroke-width="2" />
      <rect x="232" y={y - 12} width="50" height="24" rx="5" fill="#e0f2fe" stroke="#0369a1" />
      <text x="257" y={y + 4} text-anchor="middle" class="fill-sky-900 text-[10px] font-bold"
        >{formatFixed(f, 2)} N</text
      >
      <polyline
        points="282,{y} {Array.from(
          { length: 8 },
          (_, i) => `${282 + ((springEnd - 282) * (i + 0.5)) / 8},${y + (i % 2 ? 6 : -6)}`,
        ).join(' ')} {springEnd},{y}"
        fill="none"
        stroke="#334155"
        stroke-width="1.5"
      />
      <rect
        x={springEnd}
        y={y - 10}
        width="24"
        height="20"
        rx="8"
        fill="#fcd34d"
        stroke="#a16207"
      />
      <text
        x={springEnd + 12}
        y={y + 4}
        text-anchor="middle"
        class="fill-amber-900 text-[8px] font-bold">Tay</text
      >

      <!-- forces on the block -->
      {#if f > 0}
        {@const x2 = BX + BW + Math.min(130, f * ARROW_PX)}
        {@const ay = top + 12}
        {@const end = shaftEnd(BX + BW, ay, x2, ay, 9)}
        <line x1={BX + BW} y1={ay} x2={end.x} y2={end.y} stroke="#dc2626" stroke-width="3" />
        <polygon points={arrowHead(BX + BW, ay, x2, ay, 9)} fill="#dc2626" />
      {/if}
      {#if fr > 0}
        {@const fy = s.rolling ? FLOOR - 22 : FLOOR - 4}
        {@const x2 = BX - Math.min(100, fr * ARROW_PX)}
        {@const end = shaftEnd(BX + BW / 2, fy, x2, fy, 9)}
        <line x1={BX + BW / 2} y1={fy} x2={end.x} y2={end.y} stroke="#2563eb" stroke-width="3" />
        <polygon points={arrowHead(BX + BW / 2, fy, x2, fy, 9)} fill="#2563eb" />
        <text x={x2} y={fy - 8} class="fill-blue-700 text-[10px] font-bold">F ms</text>
      {/if}
    </svg>
    <figcaption class="flex flex-wrap justify-center gap-x-4 gap-y-1 px-2 text-xs text-slate-600">
      <span class="text-red-700">Mũi tên đỏ: lực kéo</span>
      <span class="text-blue-700">Mũi tên xanh: lực ma sát (ngược chiều chuyển động)</span>
      <span>Tốc độ: {formatNumber(motion.v, 2)} m/s</span>
    </figcaption>
  </figure>

  <SliderField
    label="Lực kéo của tay (số chỉ lực kế)"
    bind:value={pull}
    min={0}
    max={RANGE}
    step={PULL_STEP}
    unit="N"
    format={(v) => formatFixed(v, 2)}
  />

  <div class="flex flex-wrap gap-2">
    <button type="button" class={button.quiet} onclick={() => (pull = 0)}>Thả tay</button>
    <button type="button" class={button.secondary} disabled={!motion.moving} onclick={steady}
      >Kéo đều</button
    >
    <button type="button" class={button.primary} disabled={kind !== 'deu'} onclick={record}
      >Ghi số chỉ</button
    >
  </div>

  <p
    class="rounded-xl px-4 py-3 text-sm font-semibold {kind === 'deu'
      ? 'bg-emerald-50 text-emerald-800'
      : kind === 'dung-yen'
        ? 'bg-slate-100 text-slate-700'
        : 'bg-amber-50 text-amber-900'}"
    aria-live="polite"
  >
    {feedback}
  </p>

  <div class="overflow-x-auto">
    <table class="w-full text-left text-sm tabular-nums">
      <caption class="mb-1 text-left text-sm font-semibold text-slate-700">
        Số chỉ lực kế khi khối gỗ chuyển động đều
      </caption>
      <thead>
        <tr class="bg-slate-100">
          <th class="px-2 py-1">Bề mặt</th>
          <th class="px-2 py-1">Lực ma sát</th>
        </tr>
      </thead>
      <tbody>
        {#each records as r (r.key)}
          <tr class="border-b border-slate-100">
            <td class="px-2 py-1">{r.label}</td>
            <td class="px-2 py-1">{N(r.value)}</td>
          </tr>
        {:else}
          <tr><td colspan="2" class="px-2 py-2 text-slate-500">Chưa ghi số đo nào.</td></tr>
        {/each}
      </tbody>
    </table>
  </div>
  {#if note}
    <p class="text-sm text-slate-700" aria-live="polite">{note}</p>
  {/if}
</div>
