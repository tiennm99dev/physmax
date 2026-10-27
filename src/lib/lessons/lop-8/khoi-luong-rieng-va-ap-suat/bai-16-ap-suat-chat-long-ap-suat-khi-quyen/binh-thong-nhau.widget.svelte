<script>
  import { button, card } from '#lib/core/ui.js';
  import { frameLoop, reducedMotion } from '#lib/core/motion.js';
  import { qty } from '#lib/domain/materials.js';
  import { flowDirection, flowStep, liquidPressure, settledLevel } from './engine.js';

  const START = { left: 36, right: 12 };
  const MAX_LEVEL = 60;
  const POUR = 6;
  /** Flow speed while levels settle, in cm per second. */
  const SPEED = 12;

  let left = $state(START.left);
  let right = $state(START.right);
  let open = $state(false);

  const flow = $derived(flowDirection(left, right));
  const pA = $derived(liquidPressure(1000, left));
  const pB = $derived(liquidPressure(1000, right));

  $effect(() => {
    if (!open || flow === 'dung-yen') return;
    if (reducedMotion()) {
      const mean = settledLevel(left, right);
      left = mean;
      right = mean;
      return;
    }
    return frameLoop((dt) => {
      [left, right] = flowStep(left, right, SPEED * dt);
    });
  });

  /** @param {'left' | 'right'} side */
  function pour(side) {
    if (side === 'left') left = Math.min(MAX_LEVEL, left + POUR);
    else right = Math.min(MAX_LEVEL, right + POUR);
  }

  function reset() {
    open = false;
    left = START.left;
    right = START.right;
  }

  // Drawing: levels measured up from the pipe axis at y = BASE.
  const BASE = 236;
  const PX = 3;
  const yOf = (/** @type {number} */ h) => BASE - h * PX;
  const full = $derived(Math.max(left, right) >= MAX_LEVEL);

  const status = $derived.by(() => {
    const levels = `Nhánh A: ${qty(left, 1)} cm, nhánh B: ${qty(right, 1)} cm.`;
    if (!open) {
      return flow === 'dung-yen'
        ? `Khóa K đóng. ${levels} Hai mực nước đang ngang nhau.`
        : `Khóa K đóng. ${levels} Áp suất nước ở đáy nhánh A là ${qty(pA)} Pa, nhánh B là ${qty(pB)} Pa. Mở khóa K, em dự đoán nước sẽ chảy thế nào?`;
    }
    if (flow === 'dung-yen') {
      return `Khóa K mở, nước đứng yên. ${levels} Trong bình thông nhau chứa cùng một chất lỏng đứng yên, mực chất lỏng ở các nhánh ở cùng một độ cao.`;
    }
    return `Nước đang chảy từ nhánh ${flow === 'trai-sang-phai' ? 'A sang nhánh B' : 'B sang nhánh A'}, từ nơi mực nước cao (áp suất ở đáy lớn) sang nơi mực nước thấp.`;
  });
</script>

<div class="space-y-4">
  <figure class="{card} overflow-hidden p-2">
    <svg
      viewBox="0 0 300 270"
      class="mx-auto block w-full max-w-sm"
      role="img"
      aria-label="Bình thông nhau hai nhánh A và B nối ở đáy qua khóa K {open
        ? 'đang mở'
        : 'đang đóng'}. Mực nước nhánh A {qty(left, 1)} cm, nhánh B {qty(right, 1)} cm."
    >
      <rect x="60" y={yOf(left)} width="40" height={BASE + 14 - yOf(left)} fill="#7dd3fc" />
      <rect x="200" y={yOf(right)} width="40" height={BASE + 14 - yOf(right)} fill="#7dd3fc" />
      <rect x="100" y={BASE - 6} width="100" height="20" fill="#7dd3fc" />
      <path
        d="M60 {yOf(MAX_LEVEL) - 6} V{BASE + 14} H240 V{yOf(MAX_LEVEL) - 6} M100 {yOf(MAX_LEVEL) -
          6} V{BASE - 6} H200 V{yOf(MAX_LEVEL) - 6}"
        fill="none"
        stroke="#334155"
        stroke-width="2.5"
      />
      {#if !open}
        <rect x="145" y={BASE - 10} width="10" height="28" fill="#475569" />
      {/if}
      <circle cx="150" cy={BASE + 4} r="9" fill="none" stroke="#475569" stroke-width="2" />
      <text
        x="150"
        y={BASE + 30}
        text-anchor="middle"
        class="fill-slate-700 text-[11px] font-semibold">K</text
      >
      {#if open && flow !== 'dung-yen'}
        <path
          d={flow === 'trai-sang-phai'
            ? `M112 ${BASE + 4} h30 m-6 -5 l6 5 l-6 5`
            : `M188 ${BASE + 4} h-30 m6 -5 l-6 5 l6 5`}
          fill="none"
          stroke="#dc2626"
          stroke-width="2.5"
        />
      {/if}
      <line
        x1="40"
        y1={yOf(left)}
        x2="260"
        y2={yOf(left)}
        stroke="#0369a1"
        stroke-dasharray="4 4"
        opacity="0.5"
      />
      <text x="80" y="18" text-anchor="middle" class="fill-slate-800 text-[12px] font-bold">A</text>
      <text x="220" y="18" text-anchor="middle" class="fill-slate-800 text-[12px] font-bold">B</text
      >
      <text x="80" y={yOf(left) - 6} text-anchor="middle" class="fill-sky-900 text-[10px]"
        >{qty(left, 1)} cm</text
      >
      <text x="220" y={yOf(right) - 6} text-anchor="middle" class="fill-sky-900 text-[10px]"
        >{qty(right, 1)} cm</text
      >
    </svg>
    <figcaption class="px-2 text-center text-xs text-slate-600">
      Đường nét đứt: ngang mực nước nhánh A, để so với nhánh B.
    </figcaption>
  </figure>

  <div class="flex flex-wrap gap-2">
    <button type="button" class={button.primary} onclick={() => (open = !open)}>
      {open ? 'Đóng khóa K' : 'Mở khóa K'}
    </button>
    <button type="button" class={button.secondary} onclick={() => pour('left')} disabled={full}>
      Rót thêm nước vào nhánh A
    </button>
    <button type="button" class={button.secondary} onclick={() => pour('right')} disabled={full}>
      Rót thêm nước vào nhánh B
    </button>
    <button type="button" class={button.quiet} onclick={reset}>Làm lại</button>
  </div>

  <p
    class="rounded-xl px-4 py-3 text-sm font-semibold {open && flow === 'dung-yen'
      ? 'bg-emerald-50 text-emerald-800'
      : 'bg-slate-100 text-slate-700'}"
    aria-live="polite"
  >
    {status}
  </p>
</div>
