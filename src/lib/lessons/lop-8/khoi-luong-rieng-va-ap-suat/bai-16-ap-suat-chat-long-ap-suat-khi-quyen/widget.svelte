<script>
  import { draggable } from '#lib/actions/draggable.svelte.js';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { clamp } from '#lib/core/visuals/svg-math.js';
  import { card } from '#lib/core/ui.js';
  import { material, qty } from '#lib/domain/materials.js';
  import { TANK_DEPTH, liquidPressure } from './engine.js';

  const LIQUIDS = ['nuoc', 'dau-hoa', 'nuoc-muoi'].map(material);
  /** @type {Record<string, string>} */
  const TINT = { nuoc: '#bae6fd', 'dau-hoa': '#fde68a', 'nuoc-muoi': '#a5f3fc' };
  const FACINGS = [
    { value: 'len', label: 'Hướng lên' },
    { value: 'ngang', label: 'Hướng ngang' },
    { value: 'xuong', label: 'Hướng xuống' },
  ];
  /** Membrane normal, pointing out of the sensor face, in SVG coordinates. */
  /** @type {Record<string, [number, number]>} */
  const NORMAL = { len: [0, -1], ngang: [1, 0], xuong: [0, 1] };

  let liquidId = $state('nuoc');
  let facing = $state('len');
  let depth = $state(30);
  let previous = $state(30);

  const liquid = $derived(LIQUIDS.find((l) => l.id === liquidId) ?? LIQUIDS[0]);
  const p = $derived(liquidPressure(liquid.density, depth));
  const pMax = liquidPressure(1200, TANK_DEPTH);

  // Tank drawing.
  const VW = 220;
  const VH = 300;
  const SURFACE = 40;
  const PX = 2.4;
  const TX = 30;
  const TW = 160;
  const SX = 110;
  const sy = $derived(SURFACE + depth * PX);

  /** @type {SVGSVGElement | undefined} */
  let svgEl = $state();
  const scratch = { x: SX, y: SURFACE };

  /** @param {number} next */
  function setDepth(next) {
    depth = clamp(Math.round(next), 0, TANK_DEPTH);
  }

  const drag = {
    point: scratch,
    svg: () => svgEl ?? null,
    viewBox: { w: VW, h: VH },
    pad: 0,
    onChange: () => setDepth((scratch.y - SURFACE) / PX),
    onEnd: () => (previous = depth),
    /** @param {number} _dx @param {number} dy @param {boolean} big */
    onKeyMove: (_dx, dy, big) => {
      previous = depth;
      setDepth(depth + dy * (big ? 20 : 5));
    },
  };

  const n = $derived(NORMAL[facing]);
  // Arrow length grows with the pressure (the liquid presses on the membrane).
  const arrowLen = $derived(6 + (p / pMax) * 26);
  const tip = $derived({ x: SX + n[0] * 9, y: sy + n[1] * 9 });
  const tail = $derived({ x: tip.x + n[0] * arrowLen, y: tip.y + n[1] * arrowLen });

  // p–h chart.
  const CW = 300;
  const CH = 170;
  const PAD = { l: 46, r: 12, t: 12, b: 30 };
  const cx = (/** @type {number} */ h) => PAD.l + (h / TANK_DEPTH) * (CW - PAD.l - PAD.r);
  const cy = (/** @type {number} */ v) => CH - PAD.b - (v / pMax) * (CH - PAD.t - PAD.b);

  const Pa = (/** @type {number} */ v) => `${qty(v)} Pa`;
  const status = $derived.by(() => {
    const base = `${liquid.name} ở độ sâu ${depth} cm, màng cảm biến ${FACINGS.find((f) => f.value === facing)?.label.toLowerCase()}: p = ${Pa(p)}.`;
    if (depth === previous) return base;
    return `${base} ${depth > previous ? 'Sâu hơn nên áp suất lớn hơn' : 'Nông hơn nên áp suất nhỏ hơn'} (lúc trước ở ${previous} cm: ${Pa(liquidPressure(liquid.density, previous))}).`;
  });
</script>

<div class="space-y-4">
  <div class="grid gap-3 sm:grid-cols-2">
    <SegmentedControl
      label="Chất lỏng trong bể"
      options={LIQUIDS.map((l) => ({ value: l.id, label: l.name }))}
      bind:value={liquidId}
    />
    <SegmentedControl label="Mặt màng cảm biến" options={FACINGS} bind:value={facing} />
  </div>

  <div class="grid gap-4 sm:grid-cols-2">
    <figure class="{card} overflow-hidden p-2">
      <svg
        bind:this={svgEl}
        viewBox="0 0 {VW} {VH}"
        class="mx-auto block w-full max-w-xs touch-none"
        role="group"
        aria-label="Bể chứa {liquid.name.toLowerCase()} sâu {TANK_DEPTH} cm với cảm biến áp suất"
      >
        <rect
          x={TX}
          y={SURFACE}
          width={TW}
          height={TANK_DEPTH * PX}
          fill={TINT[liquid.id]}
          opacity="0.8"
        />
        <rect
          x={TX}
          y={SURFACE - 20}
          width={TW}
          height={TANK_DEPTH * PX + 20}
          fill="none"
          stroke="#334155"
          stroke-width="2"
        />
        {#each [0, 20, 40, 60, 80, 100] as h (h)}
          <line
            x1={TX + TW}
            y1={SURFACE + h * PX}
            x2={TX + TW + 6}
            y2={SURFACE + h * PX}
            stroke="#334155"
          />
          <text x={TX + TW + 9} y={SURFACE + h * PX + 3} class="fill-slate-600 text-[9px]">{h}</text
          >
        {/each}
        <text x={VW - 2} y={SURFACE - 8} text-anchor="end" class="fill-slate-600 text-[9px]"
          >h (cm)</text
        >
        <polyline
          points="{SX - 9},{sy} {TX + 10},{sy} {TX + 10},6"
          fill="none"
          stroke="#475569"
          stroke-width="3"
        />
        <line
          x1={tail.x}
          y1={tail.y}
          x2={tip.x}
          y2={tip.y}
          stroke="#dc2626"
          stroke-width="2.5"
          marker-end="url(#ap-suat-mui-ten)"
        />
        <defs>
          <marker
            id="ap-suat-mui-ten"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="5"
            markerHeight="5"
            orient="auto-start-reverse"
          >
            <path d="M0 0 L10 5 L0 10 z" fill="#dc2626" />
          </marker>
        </defs>
        <g
          class="drag-handle"
          role="slider"
          tabindex="0"
          aria-label="Cảm biến áp suất: kéo lên xuống hoặc dùng phím mũi tên lên, xuống để đổi độ sâu"
          aria-valuemin={0}
          aria-valuemax={TANK_DEPTH}
          aria-valuenow={depth}
          aria-valuetext="Độ sâu {depth} cm, áp suất {Pa(p)}"
          style="cursor:grab; outline:none"
          use:draggable={drag}
        >
          <circle
            class="drag-knob"
            cx={SX}
            cy={sy}
            r="9"
            fill="#e2e8f0"
            stroke="#1e293b"
            stroke-width="2"
          />
          <line
            x1={SX - n[1] * 7 + n[0] * 8}
            y1={sy + n[0] * 7 + n[1] * 8}
            x2={SX + n[1] * 7 + n[0] * 8}
            y2={sy - n[0] * 7 + n[1] * 8}
            stroke="#7c3aed"
            stroke-width="3"
          />
        </g>
        <text x={TX + 18} y={SURFACE - 6} class="fill-sky-800 text-[9px]">mặt thoáng</text>
      </svg>
      <figcaption class="px-2 text-center text-xs text-slate-600">
        Kéo cảm biến (vạch tím là màng cao su). Mũi tên đỏ: chất lỏng ép lên màng.
      </figcaption>
    </figure>

    <div class="space-y-3">
      <div class="rounded-xl bg-indigo-50 px-4 py-3 text-center">
        <p class="text-sm text-indigo-700">Áp suất chất lỏng tại cảm biến</p>
        <p class="text-2xl font-bold tabular-nums text-indigo-900">{Pa(p)}</p>
        <p class="text-xs text-indigo-700">độ sâu h = {depth} cm</p>
      </div>
      <figure class="{card} overflow-hidden p-2">
        <svg
          viewBox="0 0 {CW} {CH}"
          class="block w-full"
          role="img"
          aria-label="Đồ thị áp suất theo độ sâu: ba đường thẳng đi qua gốc, chất lỏng có khối lượng riêng lớn hơn thì đường dốc hơn; chấm đỏ là cảm biến."
        >
          {#each [0, 25, 50, 75, 100] as h (h)}
            <line x1={cx(h)} y1={PAD.t} x2={cx(h)} y2={CH - PAD.b} stroke="#e2e8f0" />
            <text
              x={cx(h)}
              y={CH - PAD.b + 12}
              text-anchor="middle"
              class="fill-slate-500 text-[9px]">{h}</text
            >
          {/each}
          {#each [0, 6000, 12000] as v (v)}
            <line x1={PAD.l} y1={cy(v)} x2={CW - PAD.r} y2={cy(v)} stroke="#e2e8f0" />
            <text x={PAD.l - 4} y={cy(v) + 3} text-anchor="end" class="fill-slate-500 text-[9px]"
              >{qty(v)}</text
            >
          {/each}
          <text x={CW - PAD.r} y={CH - 4} text-anchor="end" class="fill-slate-600 text-[9px]"
            >h (cm)</text
          >
          <text x="4" y={PAD.t - 2} class="fill-slate-600 text-[9px]">p (Pa)</text>
          {#each LIQUIDS as l (l.id)}
            <line
              x1={cx(0)}
              y1={cy(0)}
              x2={cx(TANK_DEPTH)}
              y2={cy(liquidPressure(l.density, TANK_DEPTH))}
              stroke={l.id === liquid.id ? '#4f46e5' : '#cbd5e1'}
              stroke-width={l.id === liquid.id ? 2.5 : 1.5}
            />
          {/each}
          <circle cx={cx(depth)} cy={cy(p)} r="5" fill="#dc2626" />
        </svg>
      </figure>
    </div>
  </div>

  <p
    class="rounded-xl bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-700"
    aria-live="polite"
  >
    {status}
  </p>
</div>

<style>
  .drag-handle:focus-visible .drag-knob {
    stroke-width: 4;
    stroke: #4f46e5;
  }
</style>
