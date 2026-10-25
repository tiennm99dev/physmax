<script>
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { button, card, textInput } from '#lib/core/ui.js';
  import { formatNumber, parseNumber } from '#lib/units-engine/format.js';
  import { clientToSvg } from '#lib/utils/svg.js';
  import { PARALLAX, RULERS, THINGS, correctReading, judge, suitability } from './engine.js';

  // Main view: 2 px per mm, the object's near end at x = START.
  const W = 640;
  const H = 110;
  const PX = 2;
  const START = 20;
  const MIN_OFFSET = -60;
  const MAX_OFFSET = 40;

  // Zoomed view of the far end: 20 px per mm, ±12 mm around it.
  const ZW = 480;
  const ZH = 150;
  const ZPX = 20;
  const ZC = 240;
  const OBJ_TOP = 40;
  const SCALE_Y = 100;

  let thingId = $state('but-chi');
  let rulerId = $state('c');
  /** @type {import('./engine.js').Eye} */
  let eye = $state('trai');
  let offset = $state(12);
  let typed = $state('');
  /** @type {import('./engine.js').Verdict | 'chua-nhap' | null} */
  let verdict = $state(null);
  /** @type {SVGSVGElement | undefined} */
  let svg = $state();

  const thing = $derived(THINGS.find((t) => t.id === thingId) ?? THINGS[0]);
  const ruler = $derived(RULERS.find((r) => r.id === rulerId) ?? RULERS[0]);
  const zeroX = $derived(START - offset * PX);

  /** @param {number} value */
  const clampOffset = (value) => Math.min(MAX_OFFSET, Math.max(MIN_OFFSET, Math.round(value)));

  // Dragging keeps the grab point under the pointer: remember where on the ruler it was taken.
  /** @type {number | null} */
  let grabbedAt = null;

  /** @param {PointerEvent} e */
  const svgX = (e) => (svg ? clientToSvg(svg, e.clientX, e.clientY, W, H).x : 0);

  /** @param {PointerEvent & { currentTarget: SVGGElement }} e */
  function grab(e) {
    grabbedAt = svgX(e) - zeroX;
    e.currentTarget.setPointerCapture(e.pointerId);
    e.preventDefault();
  }
  /** @param {PointerEvent} e */
  function drag(e) {
    if (grabbedAt === null) return;
    offset = clampOffset((START - (svgX(e) - grabbedAt)) / PX);
    verdict = null;
  }
  function release() {
    grabbedAt = null;
  }
  /** @param {KeyboardEvent} e */
  function nudge(e) {
    const dx = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
    if (dx === 0) return;
    e.preventDefault();
    offset = clampOffset(offset - dx * (e.shiftKey ? 10 : 1));
    verdict = null;
  }

  // Marks drawn on the main ruler and in the zoom window.
  const marks = $derived.by(() => {
    const out = [];
    for (let k = 0; k <= ruler.range; k += ruler.division) out.push(k);
    return out;
  });
  const zoomMarks = $derived(marks.filter((k) => Math.abs(k - offset - thing.length) <= 12));

  const shift = $derived(eye === 'trai' ? PARALLAX : eye === 'phai' ? -PARALLAX : 0);
  // Sight line in the zoom: from the scale through the top corner of the far end, up to the eye.
  const hitX = $derived(ZC + shift * ZPX);
  const eyeX = $derived(hitX + ((ZC - hitX) * (SCALE_Y - 10)) / (SCALE_Y - OBJ_TOP));

  /** @param {number} k mark in mm */
  const markHeight = (k) => (k % 10 === 0 ? 16 : k % 5 === 0 ? 11 : 7);

  function record() {
    const value = parseNumber(typed.replace(/cm$/i, ''));
    if (Number.isNaN(value)) {
      verdict = 'chua-nhap';
      return;
    }
    verdict = judge({ thing, ruler, offset, eye, typed: Math.round(value * 100) / 10 });
  }

  const finer = $derived(RULERS.find((r) => suitability(r, thing.length) === 'phu-hop'));
  const cm = (/** @type {number} */ mm) => `${formatNumber(mm / 10, 1)} cm`;
  const message = $derived.by(() => {
    switch (verdict) {
      case null:
        return 'Chọn thước, kéo thước cho vạch 0 ngang với đầu bên trái của vật, chọn cách đặt mắt, rồi đọc và ghi kết quả.';
      case 'chua-nhap':
        return 'Hãy nhập kết quả đo bằng xăng-ti-mét, ví dụ 12,5.';
      case 'ngan':
        return `GHĐ của thước nhỏ hơn chiều dài ${thing.name.toLowerCase()}: không đo được trong một lần. Chọn thước có GHĐ lớn hơn.`;
      case 'lech-0':
        return 'Vạch số 0 của thước chưa ngang với đầu bên trái của vật. Kéo thước cho khớp rồi đọc lại.';
      case 'mat-lech':
        return 'Mắt đang nhìn lệch nên số đọc bị sai. Đặt mắt nhìn theo hướng vuông góc với cạnh thước ở đầu kia của vật.';
      case 'sai-so':
        return `Kết quả chưa đúng. Đọc giá trị của vạch chia gần nhất với đầu kia của vật; với thước này, kết quả ghi theo ĐCNN ${cm(ruler.division)}.`;
      case 'tho':
        return `Đúng với thước này: ${cm(correctReading(thing, ruler))}. Nhưng ĐCNN ${cm(ruler.division)} khá lớn; ${finer ? finer.name.split(':')[0] : 'thước khác'} có ĐCNN nhỏ hơn sẽ đo chính xác hơn.`;
      case 'dung':
        return `Chính xác! ${thing.name} dài ${cm(correctReading(thing, ruler))}. Em đã chọn thước phù hợp, đặt thước và đặt mắt đúng cách.`;
    }
    return '';
  });
</script>

<div class="space-y-4">
  <div class="grid gap-3 sm:grid-cols-2">
    <SegmentedControl
      label="Vật cần đo"
      options={THINGS.map((t) => ({ value: t.id, label: t.name }))}
      bind:value={thingId}
      onchange={() => (verdict = null)}
    />
    <div>
      <SegmentedControl
        label="Thước"
        options={RULERS.map((r) => ({ value: r.id, label: r.name.split(':')[0] }))}
        bind:value={rulerId}
        onchange={() => (verdict = null)}
      />
      <p class="mt-1 text-sm text-slate-600">{ruler.name}</p>
    </div>
  </div>

  <figure class="{card} overflow-hidden p-2">
    <svg
      bind:this={svg}
      viewBox="0 0 {W} {H}"
      class="w-full touch-none select-none"
      role="img"
      aria-label="{thing.name} đặt trên {ruler.name}"
    >
      <rect
        x={START}
        y="14"
        width={thing.length * PX}
        height="34"
        rx="4"
        fill="#fde68a"
        stroke="#a16207"
      />
      <text x={START + 8} y="36" class="fill-amber-900 text-[13px] font-semibold">{thing.name}</text
      >
      <g
        onpointerdown={grab}
        onpointermove={drag}
        onpointerup={release}
        onpointercancel={release}
        onkeydown={nudge}
        role="slider"
        tabindex="0"
        aria-label="Thước: kéo sang trái, phải hoặc dùng phím mũi tên trái, phải"
        aria-valuemin={MIN_OFFSET}
        aria-valuemax={MAX_OFFSET}
        aria-valuenow={offset}
        aria-valuetext={offset === 0
          ? 'Vạch 0 ngang với đầu vật'
          : `Đầu vật cách vạch 0 ${formatNumber(Math.abs(offset), 0)} mi-li-mét về bên ${offset > 0 ? 'phải' : 'trái'}`}
        class="ruler cursor-ew-resize outline-none"
      >
        <rect
          class="ruler-body"
          x={zeroX - 8}
          y="50"
          width={ruler.range * PX + 16}
          height="46"
          fill="#f1f5f9"
          stroke="#64748b"
        />
        {#each marks as k (k)}
          <line
            x1={zeroX + k * PX}
            y1="50"
            x2={zeroX + k * PX}
            y2={50 + markHeight(k) * 0.9}
            stroke="#334155"
            stroke-width={k % 10 === 0 ? 1.2 : 0.6}
          />
          {#if k % 10 === 0 && (ruler.range <= 200 || k % 20 === 0)}
            <text x={zeroX + k * PX} y="84" text-anchor="middle" class="fill-slate-700 text-[10px]">
              {k / 10}
            </text>
          {/if}
        {/each}
        <text
          x={zeroX + ruler.range * PX - 4}
          y="93"
          text-anchor="end"
          class="fill-slate-500 text-[8px]"
        >
          cm
        </text>
      </g>
    </svg>
    <figcaption class="px-2 text-xs text-slate-600">
      Kéo thước (hoặc chọn thước rồi dùng phím ← →) để vạch 0 ngang với đầu bên trái của vật.
    </figcaption>
  </figure>

  <div class="grid gap-4 sm:grid-cols-2">
    <figure class="{card} overflow-hidden p-2">
      <svg
        viewBox="0 0 {ZW} {ZH}"
        class="w-full"
        role="img"
        aria-label="Phóng to đầu bên phải của vật và hướng nhìn của mắt"
      >
        <rect x="0" y={SCALE_Y} width={ZW} height={ZH - SCALE_Y} fill="#f1f5f9" />
        {#each zoomMarks as k (k)}
          {@const x = ZC + (k - offset - thing.length) * ZPX}
          <line
            x1={x}
            y1={SCALE_Y}
            x2={x}
            y2={SCALE_Y + markHeight(k) * 1.6}
            stroke="#334155"
            stroke-width={k % 10 === 0 ? 2 : 1}
          />
          {#if k % 10 === 0}
            <text
              {x}
              y={ZH - 6}
              text-anchor="middle"
              class="fill-slate-800 text-[16px] font-semibold">{k / 10}</text
            >
          {/if}
        {/each}
        <rect
          x="-10"
          y={OBJ_TOP}
          width={ZC + 10}
          height={SCALE_Y - OBJ_TOP - 6}
          fill="#fde68a"
          stroke="#a16207"
        />
        <line
          x1={hitX}
          y1={SCALE_Y}
          x2={eyeX}
          y2="10"
          stroke="#4f46e5"
          stroke-width="2"
          stroke-dasharray="6 4"
        />
        <ellipse cx={eyeX} cy="10" rx="14" ry="7" fill="#fff" stroke="#334155" stroke-width="2" />
        <circle cx={eyeX} cy="10" r="4" fill="#334155" />
      </svg>
      <figcaption class="px-2 text-xs text-slate-600">
        Phóng to đầu bên phải của vật (số ghi là cm)
      </figcaption>
    </figure>

    <div class="{card} space-y-3 p-3">
      <SegmentedControl
        label="Đặt mắt"
        options={[
          { value: 'trai', label: 'Lệch trái' },
          { value: 'vuong-goc', label: 'Vuông góc' },
          { value: 'phai', label: 'Lệch phải' },
        ]}
        bind:value={eye}
        onchange={() => (verdict = null)}
      />
      <label class="block">
        <span class="mb-1 block text-sm font-semibold text-slate-700">Kết quả đo (cm)</span>
        <input
          class={textInput}
          inputmode="decimal"
          autocomplete="off"
          bind:value={typed}
          onkeydown={(e) => {
            if (e.key === 'Enter') record();
          }}
        />
      </label>
      <button type="button" class={button.primary} onclick={record}>Ghi kết quả</button>
    </div>
  </div>

  <p
    class="rounded-xl px-4 py-3 text-sm font-semibold {verdict === 'dung'
      ? 'bg-emerald-50 text-emerald-800'
      : verdict && verdict !== 'tho'
        ? 'bg-amber-50 text-amber-900'
        : 'bg-slate-100 text-slate-700'}"
    aria-live="polite"
  >
    {message}
  </p>
</div>

<style>
  .ruler:focus-visible .ruler-body {
    stroke: #4f46e5;
    stroke-width: 3;
  }
</style>
