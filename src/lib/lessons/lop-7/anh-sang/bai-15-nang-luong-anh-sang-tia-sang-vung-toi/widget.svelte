<script>
  import { draggable } from '#lib/actions/draggable.svelte.js';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import { card } from '#lib/core/ui.js';
  import { formatNumber } from '#lib/core/number-format.js';
  import { clamp } from '#lib/core/visuals/svg-math.js';
  import { litFraction, regionAt, seesSourcePoint, shadowShape } from './engine.js';

  const W = 480;
  const H = 300;
  const SX = 36;
  const SY = H / 2;
  const MX = 440;
  const B = 26;
  /** SVG units per centimetre of the drawing. */
  const PX_PER_CM = 10;
  const CELLS = 24;

  let sourceWidth = $state(0);
  const obstacle = $state({ x: 220, y: SY });
  const probe = $state({ x: MX, y: SY + 40 });

  /** @type {SVGSVGElement | undefined} */
  let svgEl = $state();
  const clipId = $props.id();

  const scene = $derived({
    sx: SX,
    sy: SY,
    a: (sourceWidth * PX_PER_CM) / 2,
    ox: obstacle.x,
    oy: obstacle.y,
    b: B,
    mx: MX,
  });
  const shape = $derived(shadowShape(scene));
  const region = $derived(regionAt(scene, probe.y));
  const share = $derived(litFraction(scene, probe.y));
  const strips = $derived(
    Array.from({ length: H / 4 }, (_, i) => ({ y: i * 4, f: litFraction(scene, i * 4 + 2) })),
  );
  /** What the eye at M sees of the source, cell by cell from top to bottom. */
  const seen = $derived(
    Array.from({ length: CELLS }, (_, i) => {
      if (scene.a <= 0) return seesSourcePoint(scene, SY, probe.y);
      const s = SY - scene.a + ((i + 0.5) * 2 * scene.a) / CELLS;
      return seesSourcePoint(scene, s, probe.y);
    }),
  );

  /** @param {Array<{ x: number, y: number }>} pts */
  const poly = (pts) => pts.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');
  const cm = (/** @type {number} */ px) => `${formatNumber(px / PX_PER_CM, 1)} cm`;

  const obstacleDrag = $derived({
    point: obstacle,
    svg: () => svgEl ?? null,
    viewBox: { w: W, h: H },
    pad: 0,
    keyStep: 5,
    keyShiftStep: 20,
    projector: (/** @type {{ x: number, y: number }} */ p) => ({
      x: clamp(Math.round(p.x), 110, 390),
      y: clamp(Math.round(p.y), 60, H - 60),
    }),
  });

  const probeDrag = $derived({
    point: probe,
    svg: () => svgEl ?? null,
    viewBox: { w: W, h: H },
    pad: 0,
    keyStep: 4,
    keyShiftStep: 16,
    projector: (/** @type {{ x: number, y: number }} */ p) => ({
      x: MX,
      y: clamp(Math.round(p.y), 8, H - 8),
    }),
  });

  const umbraSize = $derived(
    shape.umbraOnScreen ? shape.umbraOnScreen[1] - shape.umbraOnScreen[0] : 0,
  );
  const penumbraSize = $derived(
    scene.a > 0 ? shape.shadowOnScreen[1] - shape.shadowOnScreen[0] - umbraSize : 0,
  );

  const summary = $derived.by(() => {
    if (scene.a <= 0) {
      return `Nguồn sáng hẹp: bóng trên màn chỉ có vùng tối, cao ${cm(umbraSize)}, ranh giới rõ nét.`;
    }
    const umbraText = shape.umbraOnScreen
      ? `vùng tối cao ${cm(umbraSize)}`
      : 'không có vùng tối (vật cản quá xa màn so với độ rộng nguồn)';
    return `Nguồn sáng rộng: trên màn có ${umbraText}, viền vùng nửa tối tổng cộng ${cm(penumbraSize)}.`;
  });

  const probeText = $derived(
    region === 'toi'
      ? 'Điểm M nằm trong vùng tối: từ M không nhìn thấy chút nào của nguồn sáng.'
      : region === 'sang'
        ? 'Điểm M được chiếu sáng: từ M nhìn thấy toàn bộ nguồn sáng.'
        : `Điểm M nằm trong vùng nửa tối: từ M chỉ nhìn thấy khoảng ${formatNumber(Math.round(share * 100), 0)}% nguồn sáng.`,
  );
</script>

<div class="space-y-4">
  <SliderField
    label="Độ rộng của nguồn sáng"
    bind:value={sourceWidth}
    min={0}
    max={12}
    step={1}
    format={(v) => (v === 0 ? 'hẹp (gần như một điểm)' : `${formatNumber(v, 0)} cm`)}
  />

  <figure class="{card} overflow-hidden p-2">
    <svg
      bind:this={svgEl}
      viewBox="0 0 {W} {H}"
      class="w-full touch-none select-none"
      role="group"
      aria-label="Nguồn sáng bên trái, vật cản ở giữa, màn chắn bên phải. {summary}"
    >
      <defs>
        <clipPath id="{clipId}-clip">
          <rect x={SX} y="0" width={MX - SX} height={H} />
        </clipPath>
      </defs>
      <rect x="0" y="0" width={W} height={H} fill="#fffbeb" />
      <g clip-path="url(#{clipId}-clip)">
        {#if shape.penumbra.length}
          <polygon points={poly(shape.penumbra)} fill="#94a3b8" opacity="0.55" />
        {/if}
        <polygon points={poly(shape.umbra)} fill="#1e293b" opacity="0.85" />
        <!-- edge rays through the obstacle ends -->
        {#each [[SY - scene.a, obstacle.y - B], [SY + scene.a, obstacle.y + B], [SY + scene.a, obstacle.y - B], [SY - scene.a, obstacle.y + B]] as [s, o], i (i)}
          {@const slope = (o - s) / (obstacle.x - SX)}
          <line
            x1={SX}
            y1={s}
            x2={MX}
            y2={s + slope * (MX - SX)}
            stroke={i < 2 ? '#b45309' : '#64748b'}
            stroke-width="1.2"
            stroke-dasharray="5 4"
          />
        {/each}
      </g>

      <!-- source -->
      {#if scene.a > 0}
        <rect x={SX - 8} y={SY - scene.a} width="10" height={2 * scene.a} rx="3" fill="#f59e0b" />
      {:else}
        <circle cx={SX - 3} cy={SY} r="6" fill="#f59e0b" />
      {/if}
      <text x="6" y={SY - Math.max(scene.a, 8) - 8} class="fill-amber-800 text-[16px]"
        >nguồn sáng</text
      >

      <!-- screen with its brightness -->
      {#each strips as st (st.y)}
        <rect
          x={MX}
          y={st.y}
          width="14"
          height="4"
          fill="rgb({Math.round(30 + 225 * st.f)}, {Math.round(41 + 210 * st.f)}, {Math.round(
            59 + 140 * st.f,
          )})"
        />
      {/each}
      <rect x={MX} y="0" width="14" height={H} fill="none" stroke="#475569" />
      <text x={MX + 7} y={H - 6} text-anchor="end" class="fill-slate-700 text-[16px]">màn</text>

      <!-- obstacle -->
      <g
        class="drag-handle"
        role="slider"
        tabindex="0"
        aria-label="Vật cản: kéo hoặc dùng phím mũi tên để di chuyển"
        aria-valuetext="cách nguồn {cm(obstacle.x - SX)}, cách màn {cm(MX - obstacle.x)}"
        aria-valuenow={obstacle.x}
        style="cursor:grab; outline:none"
        use:draggable={obstacleDrag}
      >
        <rect
          class="drag-knob"
          x={obstacle.x - 5}
          y={obstacle.y - B}
          width="10"
          height={2 * B}
          rx="2"
          fill="#7c2d12"
          stroke="#fff"
          stroke-width="1.5"
        />
      </g>
      <text
        x={obstacle.x}
        y={obstacle.y - B - 6}
        text-anchor="middle"
        class="fill-orange-900 text-[16px]">vật cản</text
      >

      <!-- probe M on the screen -->
      <g
        class="drag-handle"
        role="slider"
        tabindex="0"
        aria-label="Điểm M trên màn chắn: kéo lên xuống hoặc dùng phím mũi tên"
        aria-valuenow={probe.y}
        aria-valuetext={probeText}
        style="cursor:grab; outline:none"
        use:draggable={probeDrag}
      >
        <circle
          class="drag-knob"
          cx={MX + 7}
          cy={probe.y}
          r="8"
          fill="#4f46e5"
          stroke="#fff"
          stroke-width="2"
        />
      </g>
      <text
        x={MX - 6}
        y={probe.y + 5}
        text-anchor="end"
        class="fill-indigo-800 text-[17px] font-bold">M</text
      >
    </svg>
  </figure>

  <div class="{card} flex items-center gap-3 p-3">
    <span class="text-sm font-semibold text-slate-700"
      >Từ M nhìn về nguồn sáng <span class="font-normal">(đầu trên → đầu dưới)</span>:</span
    >
    <div
      class="flex h-8 flex-1 overflow-hidden rounded-md border border-slate-300"
      aria-hidden="true"
    >
      {#each seen as lit, i (i)}
        <div class="h-full flex-1 {lit ? 'bg-amber-400' : 'bg-slate-700'}"></div>
      {/each}
    </div>
  </div>

  <FeedbackNote tone="info" text={summary} />
  <FeedbackNote tone={region === 'sang' ? 'ok' : 'warn'} text={probeText} />
</div>
