<script>
  import { draggable } from '#lib/actions/draggable.svelte.js';
  import LiveRichText from '#lib/components/live-rich-text.svelte';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { formatNumber, numTex } from '#lib/core/number-format.js';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import { button, card } from '#lib/core/ui.js';
  import { arrowHead, shaftEnd } from '#lib/domain/arrow.js';
  import { components, describeDirection, resultant } from '#lib/domain/force-diagram.js';
  import { angleBetween, forceFromTip, isBalancedOnBoard, resolve, snapForce } from './engine.js';

  const SIZE = 360;
  const C = SIZE / 2;
  /** Pixels per newton: two 40 N forces together still fit on the board. */
  const K = 2.2;
  const MODES = [
    { value: 'tong-hop', label: 'Tổng hợp' },
    { value: 'can-bang', label: 'Cân bằng' },
    { value: 'phan-tich', label: 'Phân tích' },
  ];
  const PRESETS = [
    { label: 'Cùng chiều', f1: { magnitude: 30, angle: 0 }, f2: { magnitude: 20, angle: 0 } },
    { label: 'Ngược chiều', f1: { magnitude: 30, angle: 0 }, f2: { magnitude: 20, angle: 180 } },
    { label: 'Vuông góc', f1: { magnitude: 30, angle: 0 }, f2: { magnitude: 40, angle: 90 } },
    {
      label: 'Bằng nhau, 120°',
      f1: { magnitude: 30, angle: 30 },
      f2: { magnitude: 30, angle: 150 },
    },
  ];
  const COLORS = { f1: '#4f46e5', f2: '#0891b2', f3: '#c026d3', whole: '#4f46e5', net: '#0f172a' };

  /** @typedef {'f1' | 'f2' | 'f3' | 'whole'} ForceKey */

  let mode = $state('tong-hop');
  let forces = $state({
    f1: { magnitude: 30, angle: 20 },
    f2: { magnitude: 25, angle: 95 },
    f3: { magnitude: 20, angle: 260 },
    whole: { magnitude: 40, angle: 50 },
  });
  let axis = $state(0);
  /** @type {SVGSVGElement | null} */
  let board = $state(null);

  const pair = $derived(resultant([forces.f1, forces.f2]));
  const alpha = $derived(angleBetween(forces.f1.angle, forces.f2.angle));
  const net = $derived(resultant([forces.f1, forces.f2, forces.f3]));
  const balanced = $derived(isBalancedOnBoard([forces.f1, forces.f2, forces.f3]));
  const parts = $derived(resolve(forces.whole, axis));

  /** @param {{ magnitude: number, angle: number }} f */
  function tipOf(f) {
    const v = components(f);
    return { x: C + v.x * K, y: C - v.y * K };
  }

  /** Point `size` newtons along direction `angle`. @param {number} size @param {number} angle */
  const along = (size, angle) =>
    tipOf({ magnitude: Math.abs(size), angle: size < 0 ? angle + 180 : angle });

  /** @param {ForceKey} key */
  const maxOf = (key) => (key === 'f3' ? 80 : 40);

  /** @param {ForceKey} key */
  const dragFor = (key) => ({
    point: tipOf(forces[key]),
    svg: () => board,
    viewBox: { w: SIZE, h: SIZE },
    pad: 0,
    /** @param {{ x: number, y: number }} p */
    projector: (p) => {
      forces[key] = forceFromTip((p.x - C) / K, (C - p.y) / K, maxOf(key));
      return p;
    },
    /** @param {number} dx @param {number} dy @param {boolean} big */
    onKeyMove: (dx, dy, big) => {
      const f = forces[key];
      forces[key] = snapForce(
        f.magnitude - dy * (big ? 5 : 1),
        f.angle - dx * (big ? 15 : 1),
        maxOf(key),
      );
    },
  });

  /** @param {typeof PRESETS[number]} preset */
  function choose(preset) {
    forces.f1 = { ...preset.f1 };
    forces.f2 = { ...preset.f2 };
  }

  const formula = $derived(
    `$F = \\sqrt{F_1^2 + F_2^2 + 2F_1F_2\\cos\\alpha} = \\sqrt{${numTex(forces.f1.magnitude)}^2 + ${numTex(forces.f2.magnitude)}^2 + 2 \\cdot ${numTex(forces.f1.magnitude)} \\cdot ${numTex(forces.f2.magnitude)} \\cdot \\cos ${numTex(alpha)}^\\circ} \\approx ${numTex(pair.magnitude, 1)}$ N`,
  );
  const splitLine = $derived(
    `$F_x = ${numTex(parts.along, 1)}$ N, $F_y = ${numTex(parts.across, 1)}$ N; $\\sqrt{F_x^2 + F_y^2} \\approx ${numTex(Math.hypot(parts.along, parts.across), 1)}$ N, đúng bằng $F$.`,
  );

  const note = $derived.by(() => {
    if (mode === 'phan-tich') {
      if (Math.abs(parts.across) < 0.5)
        return {
          tone: 'info',
          text: 'Lực nằm dọc trục $Ox$: toàn bộ tác dụng của lực theo phương này.',
        };
      if (Math.abs(parts.along) < 0.5)
        return {
          tone: 'info',
          text: 'Lực nằm dọc trục $Oy$: lực không có tác dụng theo phương $Ox$.',
        };
      return {
        tone: 'info',
        text: 'Xoay trục rồi xem: cùng một lực, hai lực thành phần đổi theo hai phương đã chọn, nhưng hợp lực của chúng luôn là $\\vec{F}$.',
      };
    }
    if (mode === 'can-bang') {
      if (balanced)
        return {
          tone: 'ok',
          text: `Cân bằng! $F_3 = ${numTex(forces.f3.magnitude)}$ N bằng độ lớn và ngược hướng với hợp lực của $\\vec{F_1}$ và $\\vec{F_2}$, nên hợp lực của ba lực bằng $0$.`,
        };
      return {
        tone: 'warn',
        text: `Hợp lực của ba lực còn $${numTex(net.magnitude, 1)}$ N (mũi tên đen). Kéo $\\vec{F_3}$ để triệt tiêu nó: đặt $\\vec{F_3}$ ngược hướng với đường chéo của hình bình hành.`,
      };
    }
    if (alpha === 0)
      return {
        tone: 'info',
        text: 'Hai lực cùng phương, cùng chiều: $F = F_1 + F_2$, hợp lực lớn nhất.',
      };
    if (alpha === 180)
      return {
        tone: 'info',
        text: 'Hai lực cùng phương, ngược chiều: $F = |F_1 - F_2|$, hợp lực nhỏ nhất và cùng chiều với lực lớn hơn.',
      };
    if (pair.magnitude < Math.max(forces.f1.magnitude, forces.f2.magnitude))
      return { tone: 'info', text: 'Góc lớn: hợp lực có thể nhỏ hơn cả lực thành phần lớn hơn.' };
    return {
      tone: 'info',
      text: 'Đường chéo của hình bình hành, kẻ từ điểm đặt, chính là hợp lực $\\vec{F}$.',
    };
  });
</script>

{#snippet arrow(
  /** @type {{ x: number, y: number }} */ tip,
  /** @type {string} */ color,
  /** @type {string} */ name,
  dashed = false,
)}
  {@const end = shaftEnd(C, C, tip.x, tip.y, 11)}
  {#if Math.hypot(tip.x - C, tip.y - C) > 1}
    <line
      x1={C}
      y1={C}
      x2={end.x}
      y2={end.y}
      stroke={color}
      stroke-width="3"
      stroke-dasharray={dashed ? '7 4' : undefined}
    />
    <polygon points={arrowHead(C, C, tip.x, tip.y, 11)} fill={color} />
    <text
      x={Math.min(SIZE - 26, Math.max(8, tip.x + (tip.x >= C ? 9 : -22)))}
      y={Math.min(SIZE - 6, Math.max(16, tip.y + (tip.y > C ? 18 : -8)))}
      font-size="14"
      font-weight="700"
      fill={color}>{name}</text
    >
  {/if}
{/snippet}

{#snippet handle(/** @type {ForceKey} */ key, /** @type {string} */ name)}
  {@const f = forces[key]}
  {@const tip = tipOf(f)}
  <g
    class="drag-handle cursor-grab outline-none"
    role="slider"
    tabindex="0"
    aria-label={`Lực ${name}: phím lên xuống đổi độ lớn, phím trái phải đổi hướng`}
    aria-valuemin={0}
    aria-valuemax={maxOf(key)}
    aria-valuenow={f.magnitude}
    aria-valuetext={`${formatNumber(f.magnitude)} niutơn, ${describeDirection(f.angle)}`}
    use:draggable={dragFor(key)}
  >
    <circle
      class="drag-knob"
      cx={tip.x}
      cy={tip.y}
      r="8"
      fill="#fff"
      stroke={COLORS[key]}
      stroke-width="3"
    />
  </g>
{/snippet}

{#snippet parallelogram()}
  {@const a = tipOf(forces.f1)}
  {@const b = tipOf(forces.f2)}
  {@const d = tipOf(pair)}
  {#if alpha !== 0 && alpha !== 180 && forces.f1.magnitude > 0 && forces.f2.magnitude > 0}
    <polygon
      points={`${C},${C} ${a.x},${a.y} ${d.x},${d.y} ${b.x},${b.y}`}
      fill="#6366f1"
      fill-opacity="0.08"
    />
    <line x1={a.x} y1={a.y} x2={d.x} y2={d.y} stroke="#94a3b8" stroke-dasharray="4 3" />
    <line x1={b.x} y1={b.y} x2={d.x} y2={d.y} stroke="#94a3b8" stroke-dasharray="4 3" />
  {/if}
{/snippet}

<div class="space-y-4">
  <SegmentedControl label="Việc cần làm" options={MODES} bind:value={mode} />

  {#if mode === 'tong-hop'}
    <div class="flex flex-wrap gap-2">
      {#each PRESETS as preset (preset.label)}
        <button type="button" class={button.quiet} onclick={() => choose(preset)}>
          {preset.label}
        </button>
      {/each}
    </div>
  {/if}

  <div class="{card} p-2">
    <svg
      bind:this={board}
      viewBox="0 0 {SIZE} {SIZE}"
      class="mx-auto block w-full max-w-md touch-none select-none"
      role="group"
      aria-label="Bảng vẽ lực. Kéo đầu mũi tên hoặc dùng phím mũi tên để đổi độ lớn và hướng của lực."
    >
      {#if mode === 'phan-tich'}
        {@const x = { a: along(-80, axis), b: along(80, axis) }}
        {@const y = { a: along(-80, axis + 90), b: along(80, axis + 90) }}
        <line x1={x.a.x} y1={x.a.y} x2={x.b.x} y2={x.b.y} stroke="#cbd5e1" />
        <line x1={y.a.x} y1={y.a.y} x2={y.b.x} y2={y.b.y} stroke="#cbd5e1" />
        <text x={x.b.x - 16} y={x.b.y - 6} font-size="12" fill="#64748b">x</text>
        <text x={y.b.x + 6} y={y.b.y + 12} font-size="12" fill="#64748b">y</text>
        {@const tip = tipOf(forces.whole)}
        {@const fx = along(parts.along, axis)}
        {@const fy = along(parts.across, axis + 90)}
        <line x1={tip.x} y1={tip.y} x2={fx.x} y2={fx.y} stroke="#94a3b8" stroke-dasharray="4 3" />
        <line x1={tip.x} y1={tip.y} x2={fy.x} y2={fy.y} stroke="#94a3b8" stroke-dasharray="4 3" />
        {@render arrow(fx, '#e11d48', 'Fx')}
        {@render arrow(fy, '#059669', 'Fy')}
        {@render arrow(tip, COLORS.whole, 'F')}
      {:else}
        <line x1="12" y1={C} x2={SIZE - 12} y2={C} stroke="#e2e8f0" stroke-dasharray="4 4" />
        <line x1={C} y1="12" x2={C} y2={SIZE - 12} stroke="#e2e8f0" stroke-dasharray="4 4" />
        {@render parallelogram()}
        {@render arrow(tipOf(pair), mode === 'can-bang' ? '#94a3b8' : COLORS.net, 'F', true)}
        {@render arrow(tipOf(forces.f1), COLORS.f1, 'F₁')}
        {@render arrow(tipOf(forces.f2), COLORS.f2, 'F₂')}
        {#if mode === 'can-bang'}
          {@render arrow(tipOf(forces.f3), COLORS.f3, 'F₃')}
          {#if !balanced}
            {@render arrow(tipOf(net), COLORS.net, '')}
          {/if}
        {/if}
      {/if}
      <circle cx={C} cy={C} r="6" fill="#334155" />
      {#if mode === 'phan-tich'}
        {@render handle('whole', 'F')}
      {:else}
        {@render handle('f1', 'F₁')}
        {@render handle('f2', 'F₂')}
        {#if mode === 'can-bang'}
          {@render handle('f3', 'F₃')}
        {/if}
      {/if}
    </svg>
  </div>

  {#if mode === 'phan-tich'}
    <SliderField
      label="Góc xoay của trục Ox"
      bind:value={axis}
      min={0}
      max={75}
      step={5}
      unit="°"
    />
    <dl class="grid grid-cols-3 gap-2 text-center text-sm">
      <div class="rounded-xl bg-indigo-50 px-2 py-2">
        <dt class="font-semibold text-indigo-800">F</dt>
        <dd class="tabular-nums">{`${formatNumber(forces.whole.magnitude)} N`}</dd>
      </div>
      <div class="rounded-xl bg-rose-50 px-2 py-2">
        <dt class="font-semibold text-rose-800">Fx</dt>
        <dd class="tabular-nums">{`${formatNumber(parts.along, 1)} N`}</dd>
      </div>
      <div class="rounded-xl bg-emerald-50 px-2 py-2">
        <dt class="font-semibold text-emerald-800">Fy</dt>
        <dd class="tabular-nums">{`${formatNumber(parts.across, 1)} N`}</dd>
      </div>
    </dl>
    <p class="overflow-x-auto text-sm text-slate-700"><LiveRichText text={splitLine} /></p>
  {:else}
    <dl class="grid grid-cols-2 gap-2 text-center text-sm sm:grid-cols-4">
      <div class="rounded-xl bg-indigo-50 px-2 py-2">
        <dt class="font-semibold text-indigo-800">F₁</dt>
        <dd class="tabular-nums">{`${formatNumber(forces.f1.magnitude)} N`}</dd>
      </div>
      <div class="rounded-xl bg-cyan-50 px-2 py-2">
        <dt class="font-semibold text-cyan-800">F₂</dt>
        <dd class="tabular-nums">{`${formatNumber(forces.f2.magnitude)} N`}</dd>
      </div>
      <div class="rounded-xl bg-slate-100 px-2 py-2">
        <dt class="font-semibold text-slate-700">Góc α</dt>
        <dd class="tabular-nums">{`${formatNumber(alpha)}°`}</dd>
      </div>
      <div class="rounded-xl bg-violet-50 px-2 py-2">
        <dt class="font-semibold text-violet-800">Hợp lực F</dt>
        <dd class="tabular-nums">{`${formatNumber(pair.magnitude, 1)} N`}</dd>
      </div>
    </dl>
    <p class="overflow-x-auto text-sm text-slate-700"><LiveRichText text={formula} /></p>
  {/if}

  <FeedbackNote
    tone={note.tone === 'ok' ? 'ok' : note.tone === 'warn' ? 'warn' : 'info'}
    text={note.text}
  />
</div>
