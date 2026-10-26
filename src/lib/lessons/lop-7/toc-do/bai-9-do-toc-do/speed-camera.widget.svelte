<script>
  import { button, card } from '#lib/core/ui.js';
  import { formatFixed, formatNumber } from '#lib/core/number-format.js';
  import { CAMERA_TIMES, LIMIT, MARKS, cameraCheck } from './engine.js';

  const VW = 480;
  const M1 = 150;
  const M2 = 330;
  /** Screen seconds a car takes to cross the road drawing. */
  const SHOW = 1.6;

  let carNo = $state(0);
  /** 0..1 progress of the car across the drawing, or -1 before it comes. */
  let progress = $state(-1);
  let answer = $state(/** @type {boolean | null} */ (null));
  let score = $state({ right: 0, total: 0 });

  const t = $derived(CAMERA_TIMES[carNo % CAMERA_TIMES.length]);
  const verdict = $derived(cameraCheck(t));
  const recorded = $derived(progress >= 1);
  const carX = $derived(progress < 0 ? -60 : -60 + (VW - 10) * Math.min(progress, 1));

  let frame = 0;
  $effect(() => () => cancelAnimationFrame(frame));

  function animate() {
    cancelAnimationFrame(frame);
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      progress = 1;
      return;
    }
    progress = 0;
    const start = performance.now();
    const tick = () => {
      progress = Math.min(1, (performance.now() - start) / 1000 / SHOW);
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
  }

  function next() {
    if (progress >= 0) carNo += 1;
    answer = null;
    animate();
  }

  /** @param {boolean} over */
  function judge(over) {
    if (answer !== null || !recorded) return;
    answer = over;
    score = {
      right: score.right + (over === verdict.over ? 1 : 0),
      total: score.total + 1,
    };
  }

  const kmh = $derived(formatNumber(verdict.kmh, 1));
  const feedback = $derived.by(() => {
    if (progress < 0) return 'Nhấn "Xe tiếp theo" để một ô tô chạy qua hai vạch mốc.';
    if (!recorded) return 'Ô tô đang chạy qua hai vạch mốc…';
    const work = `v = ${MARKS} : ${formatFixed(t, 2)} ≈ ${formatNumber(verdict.v, 2)} m/s ≈ ${kmh} km/h`;
    if (answer === null)
      return `Camera ghi được thời gian xe đi từ vạch 1 đến vạch 2 là ${formatFixed(t, 2)} s. Xe có vượt quá ${LIMIT} km/h không?`;
    const right = answer === verdict.over;
    const result = verdict.over
      ? `vượt quá ${LIMIT} km/h: camera chụp biển số xe gửi về trạm cảnh sát giao thông`
      : `không vượt quá ${LIMIT} km/h`;
    return `${right ? 'Đúng.' : 'Chưa đúng.'} ${work}, ${result}. Điểm: ${score.right}/${score.total}.`;
  });
</script>

<div class="space-y-4">
  <figure class="{card} overflow-hidden p-2">
    <svg
      viewBox="0 0 {VW} 140"
      class="w-full select-none"
      role="img"
      aria-label="Đoạn đường có hai vạch mốc cách nhau {MARKS} m, giới hạn tốc độ {LIMIT} km/h, có thiết bị bắn tốc độ bên đường."
    >
      <rect x="0" y="60" width={VW} height="60" fill="#475569" />
      <line
        x1="0"
        y1="90"
        x2={VW}
        y2="90"
        stroke="#f8fafc"
        stroke-width="2"
        stroke-dasharray="14 10"
      />
      {#each [M1, M2] as m, i (m)}
        <line x1={m} y1="60" x2={m} y2="120" stroke="#facc15" stroke-width="4" />
        <text x={m} y="136" text-anchor="middle" class="fill-slate-700 text-[12px] font-semibold"
          >Vạch {i + 1}</text
        >
      {/each}
      <line x1={M1} y1="48" x2={M2} y2="48" stroke="#0f172a" stroke-width="1.5" />
      <text x={(M1 + M2) / 2} y="42" text-anchor="middle" class="fill-slate-800 text-[13px]"
        >{MARKS} m</text
      >
      <!-- speed limit sign -->
      <circle cx="40" cy="28" r="20" fill="#fff" stroke="#dc2626" stroke-width="5" />
      <text x="40" y="34" text-anchor="middle" class="fill-slate-900 text-[16px] font-bold"
        >{LIMIT}</text
      >
      <!-- camera -->
      <rect x={VW - 60} y="14" width="40" height="22" rx="4" fill="#1e293b" />
      <circle cx={VW - 40} cy="25" r="6" fill="#38bdf8" />
      <rect x={carX} y="68" width="56" height="20" rx="6" fill="#dc2626" />
    </svg>
  </figure>

  <div class="flex flex-wrap items-center gap-2">
    <button
      type="button"
      class={button.primary}
      onclick={next}
      disabled={progress >= 0 && !recorded}>Xe tiếp theo</button
    >
    <button
      type="button"
      class={button.secondary}
      onclick={() => judge(true)}
      disabled={!recorded || answer !== null}>Vượt tốc độ</button
    >
    <button
      type="button"
      class={button.quiet}
      onclick={() => judge(false)}
      disabled={!recorded || answer !== null}>Không vượt</button
    >
    {#if recorded}
      <span class="rounded-lg bg-slate-900 px-3 py-2 font-mono text-lg font-bold text-emerald-400">
        t = {formatFixed(t, 2)} s
      </span>
    {/if}
  </div>

  <p
    class="rounded-xl px-4 py-3 text-sm font-semibold {answer === null
      ? 'bg-slate-100 text-slate-700'
      : answer === verdict.over
        ? 'bg-emerald-50 text-emerald-800'
        : 'bg-amber-50 text-amber-900'}"
    aria-live="polite"
  >
    {feedback}
  </p>
</div>
