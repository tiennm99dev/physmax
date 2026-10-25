<script>
  import { draggable } from '#lib/actions/draggable.svelte.js';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import { card } from '#lib/core/ui.js';
  import { formatNumber } from '#lib/units-engine/format.js';
  import { LENSES, focalLength, magnifierView } from './engine.js';

  const W = 240;
  const H = 260;
  const TABLE_Y = 232;
  const LENS_X = 120;
  const TRAVEL = 190;

  let g = $state(5);
  let d = $state(1.5);
  /** @type {SVGSVGElement | undefined} */
  let svg = $state();

  const dMax = $derived(Math.round(focalLength(g) * 1.6 * 10) / 10);
  const pxPerCm = $derived(TRAVEL / dMax);
  const view = $derived(magnifierView(d, g));
  const filterId = $props.id();

  /** @param {number} value */
  const snapD = (value) => Math.min(dMax, Math.max(0.1, Math.round(value * 10) / 10));

  // Keep the lens inside the travel when a weaker lens is swapped for a stronger one.
  $effect(() => {
    if (d > dMax) d = dMax;
  });

  const point = $state({ x: LENS_X, y: 0 });
  $effect(() => {
    point.y = TABLE_Y - d * pxPerCm;
  });

  const MESSAGES = {
    'qua-gan': 'Kính quá gần vật: ảnh to chưa nhiều và bị mờ. Đưa kính ra xa vật từ từ.',
    'ro-net': 'Ảnh rõ nét và to hơn vật nhiều lần. Giữ kính ở khoảng cách này để quan sát.',
    'qua-xa': 'Kính quá xa vật: ảnh bị nhoè. Đưa kính lại gần vật.',
  };
</script>

<div class="space-y-4">
  <div class="grid gap-3 sm:grid-cols-2">
    <SegmentedControl
      label="Kính lúp"
      options={LENSES.map((x) => ({ value: x, label: `${x}x` }))}
      bind:value={g}
    />
    <SliderField
      label="Khoảng cách từ kính đến vật"
      bind:value={d}
      min={0.1}
      max={dMax}
      step={0.1}
      unit="cm"
      format={(v) => formatNumber(v, 1)}
    />
  </div>

  <div class="grid gap-4 sm:grid-cols-2">
    <figure class="{card} p-2">
      <svg
        bind:this={svg}
        viewBox="0 0 {W} {H}"
        class="w-full touch-none select-none"
        role="img"
        aria-label="Hình nhìn ngang: mắt, kính lúp và con kiến trên mặt bàn"
      >
        <!-- eye -->
        <g aria-hidden="true">
          <ellipse
            cx={LENS_X}
            cy="18"
            rx="16"
            ry="8"
            fill="#fff"
            stroke="#334155"
            stroke-width="2"
          />
          <circle cx={LENS_X} cy="18" r="5" fill="#334155" />
          <line
            x1={LENS_X}
            y1="28"
            x2={LENS_X}
            y2={point.y - 8}
            stroke="#94a3b8"
            stroke-dasharray="4 4"
          />
          <!-- table and ant -->
          <rect x="0" y={TABLE_Y} width={W} height={H - TABLE_Y} fill="#e2e8f0" />
          <ellipse cx={LENS_X - 6} cy={TABLE_Y - 3} rx="4" ry="3" fill="#1e293b" />
          <ellipse cx={LENS_X + 3} cy={TABLE_Y - 3} rx="5" ry="3" fill="#1e293b" />
          <!-- distance marker -->
          <line x1="30" y1={point.y} x2="30" y2={TABLE_Y} stroke="#6366f1" stroke-width="2" />
          <text
            x="36"
            y={(point.y + TABLE_Y) / 2 + 4}
            class="fill-indigo-700 text-[11px] font-semibold"
          >
            {formatNumber(d, 1)} cm
          </text>
        </g>
        <!-- lens: drag up and down -->
        <g
          use:draggable={{
            point,
            svg: () => svg ?? null,
            viewBox: { w: W, h: H },
            pad: 0,
            projector: (p) => ({
              x: LENS_X,
              y: Math.min(TABLE_Y - 0.1 * pxPerCm, Math.max(TABLE_Y - TRAVEL, p.y)),
            }),
            onChange: () => {
              d = snapD((TABLE_Y - point.y) / pxPerCm);
            },
            onKeyMove: (_dx, dy, big) => {
              if (dy !== 0) d = snapD(d - dy * (big ? 0.5 : 0.1));
            },
          }}
          role="slider"
          tabindex="0"
          aria-label="Kính lúp: kéo lên xuống hoặc dùng phím mũi tên lên, xuống"
          aria-valuemin={0.1}
          aria-valuemax={dMax}
          aria-valuenow={d}
          aria-valuetext="{formatNumber(d, 1)} xăng-ti-mét"
          class="lens cursor-ns-resize outline-none"
        >
          <rect x={LENS_X - 70} y={point.y - 20} width="150" height="40" fill="transparent" />
          <ellipse
            cx={LENS_X}
            cy={point.y}
            rx="52"
            ry="7"
            fill="#bae6fd"
            fill-opacity="0.7"
            stroke="#0369a1"
            stroke-width="3"
          />
          <rect x={LENS_X + 52} y={point.y - 3} width="52" height="7" rx="3" fill="#92400e" />
        </g>
      </svg>
      <figcaption class="px-2 pb-1 text-xs text-slate-600">
        Kéo kính lúp lên xuống (hoặc dùng phím ↑ ↓).
      </figcaption>
    </figure>

    <figure class="{card} flex flex-col items-center gap-2 p-3">
      <svg
        viewBox="0 0 200 200"
        class="w-full max-w-64"
        role="img"
        aria-label="Ảnh con kiến em nhìn thấy qua kính lúp"
      >
        <defs>
          <filter id="{filterId}-blur" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation={view.blur} />
          </filter>
          <clipPath id="{filterId}-clip"><circle cx="100" cy="100" r="96" /></clipPath>
        </defs>
        <circle cx="100" cy="100" r="98" fill="#f8fafc" stroke="#0369a1" stroke-width="4" />
        <g clip-path="url(#{filterId}-clip)">
          <g filter="url(#{filterId}-blur)">
            <g transform="translate(100 100) scale({view.scale * 1.5})">
              <!-- a small ant, drawn about 18 units long -->
              <g stroke="#1e293b" stroke-width="0.6" fill="none" stroke-linecap="round">
                <path d="M-1 -1l-3 -4M1 -1l3 -4M-1 0l-4 1M1 0l4 1M-1 1l-3 4M1 1l3 4" />
                <path d="M-1 -8.5l-2 -3M1 -8.5l2 -3" />
              </g>
              <ellipse cx="0" cy="-7" rx="1.8" ry="1.8" fill="#1e293b" />
              <ellipse cx="0" cy="0" rx="1.5" ry="2.6" fill="#7c2d12" />
              <ellipse cx="0" cy="6" rx="2.6" ry="3.6" fill="#1e293b" />
              <circle cx="-0.8" cy="-7.5" r="0.4" fill="#f8fafc" />
              <circle cx="0.8" cy="-7.5" r="0.4" fill="#f8fafc" />
            </g>
          </g>
        </g>
      </svg>
      <figcaption class="text-xs text-slate-600">Ảnh em nhìn thấy qua kính</figcaption>
    </figure>
  </div>

  <p
    class="rounded-xl px-4 py-3 text-sm font-semibold {view.zone === 'ro-net'
      ? 'bg-emerald-50 text-emerald-800'
      : 'bg-amber-50 text-amber-900'}"
    aria-live="polite"
  >
    Kính {g}x, cách vật {formatNumber(d, 1)} cm. {MESSAGES[view.zone]}
  </p>
</div>

<style>
  .lens:focus-visible ellipse {
    stroke: #4f46e5;
    stroke-width: 5;
  }
</style>
