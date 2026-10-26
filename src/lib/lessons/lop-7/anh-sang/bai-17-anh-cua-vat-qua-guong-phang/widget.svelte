<script>
  import { draggable } from '#lib/actions/draggable.svelte.js';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { button, card } from '#lib/core/ui.js';
  import { formatNumber } from '#lib/core/number-format.js';
  import { clamp } from '#lib/core/visuals/svg-math.js';
  import { distanceToMirror, imageOf, mirrorHit, seesImage } from './engine.js';

  const W = 480;
  const H = 320;
  /** One grid square is 1 cm. */
  const CELL = 20;
  const MX = 280;
  const TOP = 60;
  const BOTTOM = 260;

  let mode = $state('xem');
  let checked = $state(false);
  const a = $state({ x: 180, y: 240 });
  const b = $state({ x: 180, y: 140 });
  const eye = $state({ x: 60, y: 100 });
  const guessA = $state({ x: 420, y: 200 });
  const guessB = $state({ x: 420, y: 100 });

  /** @type {SVGSVGElement | undefined} */
  let svgEl = $state();

  const a2 = $derived(imageOf(a, MX));
  const b2 = $derived(imageOf(b, MX));
  const guessing = $derived(mode === 've');
  const showImage = $derived(!guessing || checked);
  const guessRight = $derived(
    guessA.x === a2.x && guessA.y === a2.y && guessB.x === b2.x && guessB.y === b2.y,
  );

  /**
   * Drag params for a grid-snapped point kept between `x0` and `x1`.
   * @param {{ x: number, y: number }} point @param {number} x0 @param {number} x1
   */
  function dragOn(point, x0, x1) {
    return {
      point,
      svg: () => svgEl ?? null,
      viewBox: { w: W, h: H },
      pad: 0,
      keyStep: CELL,
      keyShiftStep: CELL * 3,
      projector: (/** @type {{ x: number, y: number }} */ p) => ({
        x: clamp(Math.round(p.x / CELL) * CELL, x0, x1),
        y: clamp(Math.round(p.y / CELL) * CELL, CELL, H - CELL),
      }),
      onChange: () => {
        checked = false;
      },
    };
  }

  const cmText = (/** @type {number} */ px) => `${formatNumber(px / CELL, 1)} cm`;
  const sizeAB = $derived(Math.hypot(b.x - a.x, b.y - a.y));

  /** @param {{ x: number, y: number }} p */
  const rayFor = (p) => {
    const k = mirrorHit(p, eye, MX);
    return k && k.y >= TOP && k.y <= BOTTOM ? { p, k, img: imageOf(p, MX) } : null;
  };
  const rays = $derived(showImage ? [rayFor(a), rayFor(b)].filter((r) => r !== null) : []);
  const seesAll = $derived(
    seesImage(a, eye, MX, TOP, BOTTOM) && seesImage(b, eye, MX, TOP, BOTTOM),
  );

  /**
   * Arrowhead at the middle of segment p → q.
   * @param {{ x: number, y: number }} p @param {{ x: number, y: number }} q
   */
  function midArrow(p, q) {
    const m = { x: (p.x + q.x) / 2, y: (p.y + q.y) / 2 };
    const len = Math.hypot(q.x - p.x, q.y - p.y) || 1;
    const ux = (q.x - p.x) / len;
    const uy = (q.y - p.y) / len;
    const w1 = { x: m.x - 9 * ux - 5 * uy, y: m.y - 9 * uy + 5 * ux };
    const w2 = { x: m.x - 9 * ux + 5 * uy, y: m.y - 9 * uy - 5 * ux };
    return `M ${w1.x.toFixed(1)} ${w1.y.toFixed(1)} L ${m.x.toFixed(1)} ${m.y.toFixed(1)} L ${w2.x.toFixed(1)} ${w2.y.toFixed(1)}`;
  }

  const status = $derived.by(() => {
    if (guessing && !checked) {
      return 'Kéo hai điểm A′ và B′ (màu tím) tới chỗ em nghĩ là ảnh của A và B, rồi nhấn "Kiểm tra".';
    }
    if (guessing) {
      return guessRight
        ? 'Đúng rồi! A′ và B′ đối xứng với A và B qua gương: cùng độ cao, cách gương bằng vật.'
        : `Chưa đúng. Ảnh đúng (nét đứt) cách gương ${cmText(distanceToMirror(a, MX))} và ${cmText(distanceToMirror(b, MX))}, ngang hàng với A và B. Thử lại nhé.`;
    }
    const d = `A cách gương ${cmText(distanceToMirror(a, MX))}, A′ cách gương ${cmText(distanceToMirror(a2, MX))}; B cách gương ${cmText(distanceToMirror(b, MX))}, B′ cũng cách gương ${cmText(distanceToMirror(b2, MX))}. AB = A′B′ = ${cmText(sizeAB)}.`;
    return seesAll
      ? `${d} Mắt nhận được tia phản xạ từ cả A và B nên nhìn thấy toàn bộ ảnh A′B′.`
      : `${d} Có tia phản xạ không rơi vào mắt (điểm tới nằm ngoài gương) nên mắt không thấy hết ảnh. Hãy di chuyển mắt.`;
  });
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Chế độ"
    options={[
      { value: 'xem', label: 'Quan sát ảnh' },
      { value: 've', label: 'Tự vẽ ảnh' },
    ]}
    bind:value={mode}
    onchange={() => (checked = false)}
  />

  <figure class="{card} overflow-hidden p-2">
    <svg
      bind:this={svgEl}
      viewBox="0 0 {W} {H}"
      class="w-full touch-none select-none"
      role="group"
      aria-label="Gương phẳng đặt thẳng đứng, vật AB trước gương, mắt người quan sát. {status}"
    >
      <!-- grid, 1 square = 1 cm -->
      {#each Array.from({ length: W / CELL + 1 }, (_, k) => k * CELL) as x (x)}
        <line x1={x} y1="0" x2={x} y2={H} stroke="#e2e8f0" stroke-width="1" />
      {/each}
      {#each Array.from({ length: H / CELL + 1 }, (_, k) => k * CELL) as y (y)}
        <line x1="0" y1={y} x2={W} y2={y} stroke="#e2e8f0" stroke-width="1" />
      {/each}

      <!-- mirror -->
      <line x1={MX} y1={TOP} x2={MX} y2={BOTTOM} stroke="#0ea5e9" stroke-width="4" />
      {#each Array.from({ length: 10 }, (_, k) => TOP + 10 + k * 20) as y (y)}
        <line x1={MX + 2} y1={y} x2={MX + 10} y2={y - 8} stroke="#64748b" stroke-width="1.2" />
      {/each}
      <text x={MX} y={TOP - 8} text-anchor="middle" class="fill-sky-700 text-[16px]">gương</text>

      {#if showImage}
        <!-- symmetry guides -->
        <line x1={a.x} y1={a.y} x2={a2.x} y2={a2.y} stroke="#94a3b8" stroke-dasharray="2 4" />
        <line x1={b.x} y1={b.y} x2={b2.x} y2={b2.y} stroke="#94a3b8" stroke-dasharray="2 4" />
        <!-- virtual image, dashed -->
        <line
          x1={a2.x}
          y1={a2.y}
          x2={b2.x}
          y2={b2.y}
          stroke="#2563eb"
          stroke-width="3"
          stroke-dasharray="7 5"
        />
        <circle cx={b2.x} cy={b2.y} r="4" fill="#2563eb" />
        <text x={a2.x + 8} y={a2.y + 16} class="fill-blue-700 text-[17px] font-semibold">A′</text>
        <text x={b2.x + 8} y={b2.y - 6} class="fill-blue-700 text-[17px] font-semibold">B′</text>
      {/if}

      {#each rays as ray, i (i)}
        <line
          x1={ray.p.x}
          y1={ray.p.y}
          x2={ray.k.x}
          y2={ray.k.y}
          stroke="#dc2626"
          stroke-width="1.8"
        />
        <path d={midArrow(ray.p, ray.k)} fill="none" stroke="#dc2626" stroke-width="1.8" />
        <line x1={ray.k.x} y1={ray.k.y} x2={eye.x} y2={eye.y} stroke="#ea580c" stroke-width="1.8" />
        <path d={midArrow(ray.k, eye)} fill="none" stroke="#ea580c" stroke-width="1.8" />
        <line
          x1={ray.k.x}
          y1={ray.k.y}
          x2={ray.img.x}
          y2={ray.img.y}
          stroke="#ea580c"
          stroke-width="1.4"
          stroke-dasharray="5 4"
        />
      {/each}

      <!-- object AB -->
      <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="#15803d" stroke-width="4" />
      <circle
        class="drag-handle"
        cx={a.x}
        cy={a.y}
        r="8"
        fill="#15803d"
        stroke="#fff"
        stroke-width="2"
        role="slider"
        tabindex="0"
        aria-label="Điểm A của vật: kéo hoặc dùng phím mũi tên, mỗi bước 1 ô"
        aria-valuenow={distanceToMirror(a, MX) / CELL}
        aria-valuetext="A cách gương {cmText(distanceToMirror(a, MX))}"
        style="cursor:grab; outline:none"
        use:draggable={dragOn(a, CELL, MX - CELL)}
      />
      <circle
        class="drag-handle"
        cx={b.x}
        cy={b.y}
        r="8"
        fill="#15803d"
        stroke="#fff"
        stroke-width="2"
        role="slider"
        tabindex="0"
        aria-label="Điểm B của vật: kéo hoặc dùng phím mũi tên, mỗi bước 1 ô"
        aria-valuenow={distanceToMirror(b, MX) / CELL}
        aria-valuetext="B cách gương {cmText(distanceToMirror(b, MX))}"
        style="cursor:grab; outline:none"
        use:draggable={dragOn(b, CELL, MX - CELL)}
      />
      <text x={a.x - 18} y={a.y + 16} class="fill-green-800 text-[17px] font-semibold">A</text>
      <text x={b.x - 18} y={b.y - 6} class="fill-green-800 text-[17px] font-semibold">B</text>

      <!-- eye -->
      <g
        class="drag-handle"
        role="slider"
        tabindex="0"
        aria-label="Mắt người quan sát: kéo hoặc dùng phím mũi tên"
        aria-valuenow={eye.y / CELL}
        aria-valuetext={seesAll ? 'mắt nhìn thấy toàn bộ ảnh' : 'mắt chưa thấy hết ảnh'}
        style="cursor:grab; outline:none"
        use:draggable={dragOn(eye, CELL, MX - CELL)}
      >
        <path
          class="drag-knob"
          d="M {eye.x - 14} {eye.y} Q {eye.x} {eye.y - 12} {eye.x + 14} {eye.y} Q {eye.x} {eye.y +
            12} {eye.x - 14} {eye.y} Z"
          fill="#fff"
          stroke="#334155"
          stroke-width="2"
        />
        <circle cx={eye.x + 3} cy={eye.y} r="4" fill="#334155" />
      </g>
      <text x={eye.x} y={eye.y - 16} text-anchor="middle" class="fill-slate-700 text-[16px]"
        >mắt</text
      >

      {#if guessing}
        <line
          x1={guessA.x}
          y1={guessA.y}
          x2={guessB.x}
          y2={guessB.y}
          stroke="#7c3aed"
          stroke-width="2"
          opacity="0.6"
        />
        {#each [{ p: guessA, name: 'A′' }, { p: guessB, name: 'B′' }] as g (g.name)}
          <circle
            class="drag-handle"
            cx={g.p.x}
            cy={g.p.y}
            r="8"
            fill="#7c3aed"
            stroke="#fff"
            stroke-width="2"
            role="slider"
            tabindex="0"
            aria-label="Điểm {g.name} em dự đoán: kéo hoặc dùng phím mũi tên, mỗi bước 1 ô"
            aria-valuenow={distanceToMirror(g.p, MX) / CELL}
            aria-valuetext="{g.name} cách gương {cmText(distanceToMirror(g.p, MX))}"
            style="cursor:grab; outline:none"
            use:draggable={dragOn(g.p, MX + CELL, W - CELL)}
          />
          <text x={g.p.x + 10} y={g.p.y - 8} class="fill-violet-800 text-[16px] font-semibold"
            >{g.name}?</text
          >
        {/each}
      {/if}
    </svg>
    <figcaption class="px-2 text-center text-sm text-slate-600">
      Mỗi ô vuông có cạnh 1 cm. Ảnh ảo vẽ bằng nét đứt.
    </figcaption>
  </figure>

  {#if guessing}
    <div class="flex flex-wrap gap-2">
      <button type="button" class={button.primary} onclick={() => (checked = true)}>Kiểm tra</button
      >
    </div>
  {/if}

  <FeedbackNote
    tone={guessing ? (checked ? (guessRight ? 'ok' : 'warn') : 'info') : seesAll ? 'ok' : 'warn'}
    text={status}
  />
</div>
