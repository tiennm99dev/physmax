<script>
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { button, card } from '#lib/core/ui.js';
  import { formatNumber } from '#lib/units-engine/format.js';
  import {
    COARSE_STEP,
    EYEPIECES,
    FINE_STEP,
    OBJECTIVES,
    START,
    focusOf,
    gapMm,
    moveTube,
    totalMagnification,
    touches,
  } from './engine.js';

  let eyepiece = $state(10);
  let power = $state(4);
  let light = $state(false);
  let p = $state(START);
  let crashed = $state(false);

  const objective = $derived(OBJECTIVES.find((o) => o.power === power) ?? OBJECTIVES[0]);
  const total = $derived(totalMagnification(eyepiece, power));
  const focus = $derived(focusOf(p, objective));
  const gap = $derived(gapMm(p, objective));
  const id = $props.id();
  // Side view: the gap is drawn on a square-root scale so 0,6 mm and 17 mm both show.
  const tipY = $derived(68 - Math.min(56, 9 * Math.sqrt(gap)));

  /** @param {number} delta */
  function turn(delta) {
    const r = moveTube(p, delta, objective);
    p = r.p;
    crashed = r.crashed;
  }

  /** @param {string | number} value */
  function changeObjective(value) {
    const o = OBJECTIVES.find((x) => x.power === Number(value));
    crashed = o ? touches(p, o) : false;
    if (o && crashed) p = -o.workingDistance;
  }

  function reset() {
    p = START;
    crashed = false;
    light = false;
    power = 4;
  }

  // Onion skin cells: long bricks whose drawn size grows with the total magnification.
  const cells = $derived.by(() => {
    const length = total * 0.5;
    const width = length / 4;
    const cols = Math.ceil(200 / length) + 2;
    const rows = Math.ceil(200 / width) + 2;
    const x0 = 100 - (cols / 2) * length;
    const y0 = 100 - (rows / 2) * width;
    /** @type {Array<{ x: number, y: number, w: number, h: number, key: string }>} */
    const out = [];
    for (let r = 0; r < rows; r++) {
      const shift = r % 2 ? length / 2 : 0;
      for (let c = -1; c < cols; c++) {
        out.push({
          x: x0 + c * length + shift,
          y: y0 + r * width,
          w: length,
          h: width,
          key: `${r}-${c}`,
        });
      }
    }
    return out;
  });

  const verdict = $derived.by(() => {
    if (crashed) {
      return 'Vật kính chạm vào tiêu bản! Có thể làm vỡ tiêu bản và hỏng vật kính. Khi hạ vật kính phải nhìn từ bên cạnh; với vật kính 40x chỉ dùng ốc nhỏ. Hãy nâng vật kính lên.';
    }
    if (!light) return 'Vi trường tối: hãy bật đèn để chiếu sáng tiêu bản.';
    if (focus.focus === 'ro-net') {
      return `Ảnh rõ nét! Độ phóng đại: ${eyepiece} × ${power} = ${total} lần.`;
    }
    if (focus.focus === 'gan-ro') return 'Ảnh gần rõ: vặn ốc nhỏ thật chậm để lấy nét.';
    return 'Ảnh mờ: vặn ốc to để đưa vật kính đến gần vị trí cho ảnh.';
  });
</script>

<div class="space-y-4">
  <div class="grid gap-3 sm:grid-cols-2">
    <SegmentedControl
      label="Vật kính"
      options={OBJECTIVES.map((o) => ({ value: o.power, label: `${o.power}x` }))}
      bind:value={power}
      onchange={changeObjective}
    />
    <SegmentedControl
      label="Thị kính"
      options={EYEPIECES.map((e) => ({ value: e, label: `${e}x` }))}
      bind:value={eyepiece}
    />
  </div>

  <div class="grid gap-4 sm:grid-cols-2">
    <figure class="{card} flex flex-col items-center gap-2 p-3">
      <svg
        viewBox="0 0 200 200"
        class="w-full max-w-64"
        role="img"
        aria-label="Vi trường: tế bào biểu bì vảy hành nhìn qua thị kính"
      >
        <defs>
          <filter id="{id}-blur" x="-10%" y="-10%" width="120%" height="120%">
            <feGaussianBlur stdDeviation={focus.blur} />
          </filter>
          <clipPath id="{id}-clip"><circle cx="100" cy="100" r="96" /></clipPath>
        </defs>
        <circle cx="100" cy="100" r="98" fill="#0f172a" />
        {#if light}
          <g clip-path="url(#{id}-clip)">
            <rect x="0" y="0" width="200" height="200" fill="#fef9c3" />
            <g filter="url(#{id}-blur)">
              {#each cells as c (c.key)}
                <rect
                  x={c.x}
                  y={c.y}
                  width={c.w}
                  height={c.h}
                  fill="#fde68a"
                  stroke="#a16207"
                  stroke-width={Math.max(0.6, total / 200)}
                />
                <ellipse
                  cx={c.x + c.w * 0.3}
                  cy={c.y + c.h / 2}
                  rx={c.h * 0.22}
                  ry={c.h * 0.18}
                  fill="#92400e"
                />
              {/each}
            </g>
          </g>
        {/if}
        <circle cx="100" cy="100" r="97" fill="none" stroke="#334155" stroke-width="4" />
      </svg>
      <figcaption class="text-center text-sm font-semibold text-slate-700 tabular-nums">
        Độ phóng đại: {eyepiece} × {power} = {total} lần
      </figcaption>
    </figure>

    <div class="{card} space-y-3 p-3">
      <button
        type="button"
        class={light ? button.secondary : button.primary}
        aria-pressed={light}
        onclick={() => (light = !light)}
      >
        {light ? 'Tắt đèn' : 'Bật đèn'}
      </button>
      <div>
        <p class="mb-1 text-sm font-semibold text-slate-700">Ốc to (sơ cấp): mỗi nấc 0,5 mm</p>
        <div class="flex flex-wrap gap-2">
          <button type="button" class={button.quiet} onclick={() => turn(COARSE_STEP)}>
            ▲ Nâng vật kính
          </button>
          <button type="button" class={button.quiet} onclick={() => turn(-COARSE_STEP)}>
            ▼ Hạ vật kính
          </button>
        </div>
      </div>
      <div>
        <p class="mb-1 text-sm font-semibold text-slate-700">Ốc nhỏ (vi cấp): mỗi nấc 0,02 mm</p>
        <div class="flex flex-wrap gap-2">
          <button type="button" class={button.quiet} onclick={() => turn(FINE_STEP)}>
            ▲ Nâng nhẹ
          </button>
          <button type="button" class={button.quiet} onclick={() => turn(-FINE_STEP)}>
            ▼ Hạ nhẹ
          </button>
        </div>
      </div>
      <svg
        viewBox="0 0 200 100"
        class="w-full"
        role="img"
        aria-label="Hình nhìn ngang: vật kính phía trên tiêu bản"
      >
        <rect x="20" y="72" width="160" height="10" fill="#cbd5e1" />
        <rect x="60" y="68" width="80" height="4" fill="#bae6fd" stroke="#0369a1" />
        <rect x="85" y={tipY - 44} width="30" height="40" fill="#64748b" />
        <rect x="90" y={tipY - 4} width="20" height="4" fill={crashed ? '#dc2626' : '#334155'} />
        <text x="100" y="97" text-anchor="middle" class="fill-slate-700 text-[10px]">
          Vật kính cách tiêu bản {formatNumber(gap, 2)} mm
        </text>
      </svg>
      <button type="button" class={button.quiet} onclick={reset}>Làm lại từ đầu</button>
    </div>
  </div>

  <p
    class="rounded-xl px-4 py-3 text-sm font-semibold {crashed
      ? 'bg-rose-50 text-rose-800'
      : light && focus.focus === 'ro-net'
        ? 'bg-emerald-50 text-emerald-800'
        : 'bg-slate-100 text-slate-700'}"
    aria-live="polite"
  >
    {verdict}
  </p>
</div>
