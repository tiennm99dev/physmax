<script>
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { button, card } from '#lib/core/ui.js';
  import { formatFixed } from '#lib/core/number-format.js';
  import FeedbackNote from '../_shared/feedback-note.svelte';
  import {
    SLOPES,
    ZERO,
    elapsed,
    gap,
    reset,
    rolled,
    start,
    stop,
    summarise,
    toDisplay,
  } from './engine.js';

  const COUNTDOWN = 3000;
  // Track drawn from the top left down to the finish on the right.
  const X0 = 30;
  const Y0 = 40;
  const X1 = 450;
  const Y1 = 140;
  const BALL = 12;

  let slopeId = $state('it');
  /** @type {import('./engine.js').Stopwatch} */
  let sw = $state(ZERO);
  let now = $state(0);
  /** @typedef {{ go: number, recorded: boolean }} Run */
  let run = $state(/** @type {Run | null} */ (null));
  let fromZero = $state(true);
  /** @type {import('./engine.js').Trial[]} */
  let trials = $state([]);
  /** @type {{ tone: 'ok' | 'warn' | 'info', text: string } | null} */
  let note = $state(null);
  let reduceMotion = $state(false);

  const slope = $derived(SLOPES.find((s) => s.id === slopeId) ?? SLOPES[0]);
  const reading = $derived(toDisplay(elapsed(sw, now)));
  const sinceGo = $derived(run ? (now - run.go) / 1000 : -1);
  const rolling = $derived(run !== null && sinceGo < slope.time + 0.6);
  const progress = $derived.by(() => {
    const f = run ? rolled(sinceGo, slope.time) : 0;
    return reduceMotion && f < 1 ? Math.floor(f * 4) / 4 : f;
  });
  const ball = $derived({
    x: X0 + (X1 - X0) * progress,
    y: Y0 + (Y1 - Y0) * progress - BALL - 2,
  });
  const countdown = $derived(run && sinceGo < 0 ? Math.ceil(-sinceGo) : 0);
  const stage = $derived(
    !run
      ? 'Bóng đang nằm ở đầu máng.'
      : countdown > 0
        ? `Chuẩn bị thả bóng: ${countdown}…`
        : progress < 1
          ? 'Bóng đang lăn!'
          : 'Bóng đã chạm vạch đích.',
  );
  const summary = $derived(summarise(trials));

  $effect(() => {
    reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let frame = 0;
    const tick = () => {
      now = performance.now();
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  });

  function release() {
    if (rolling) return;
    run = { go: performance.now() + COUNTDOWN, recorded: false };
    note = null;
  }
  function pressStart() {
    const t = performance.now();
    if (!sw.running) fromZero = elapsed(sw, t) === 0;
    sw = start(sw, t);
  }
  function pressStop() {
    const t = performance.now();
    if (!sw.running) return;
    sw = stop(sw, t);
    now = t;
    if (!run || run.recorded || t < run.go) return;
    run = { ...run, recorded: true };
    const measured = toDisplay(elapsed(sw, t));
    trials = [...trials, { measured, resetFirst: fromZero }];
    const n = trials.length;
    note = fromZero
      ? {
          tone: 'ok',
          text: `Lần ${n}: ${s(measured)}. Đã ghi vào bảng. Nhấn Reset rồi thả bóng để đo lần tiếp theo.`,
        }
      : {
          tone: 'warn',
          text: `Lần ${n}: đồng hồ chỉ ${s(measured)}, nhưng em chưa nhấn Reset trước khi đo nên số cũ bị cộng dồn. Kết quả này không dùng được.`,
        };
  }
  function pressReset() {
    sw = reset(sw);
  }
  function changeSlope() {
    trials = [];
    run = null;
    note = null;
  }

  const s = (/** @type {number} */ v) => `${formatFixed(v, 2)} s`;
  /** @param {number} v */
  const signed = (v) =>
    v > 0 ? `+${formatFixed(v, 2)}` : v < 0 ? `−${formatFixed(-v, 2)}` : '0,00';

  /** @type {{ tone: 'ok' | 'warn' | 'info', text: string }} */
  const feedback = $derived.by(() => {
    if (summary.count >= 3 && summary.mean !== null && summary.spread !== null) {
      const text = `Trung bình ${summary.count} lần đo: ${s(summary.mean)}; có lần lệch khỏi trung bình tới ${s(summary.spread)} vì tay bấm lúc sớm lúc muộn. Đồng hồ đo thời gian hiện số dùng cổng quang đo được ${s(slope.time)}, chênh ${s(Math.abs(gap(summary.mean, slope.time)))} so với trung bình.`;
      return { tone: note?.tone ?? 'info', text: note ? `${note.text} ${text}` : text };
    }
    if (note) return note;
    return {
      tone: 'info',
      text: 'Nhấn "Thả bóng". Bấm Start đúng lúc bóng bắt đầu lăn, bấm Stop đúng lúc bóng chạm vạch đích. Đo ít nhất ba lần.',
    };
  });
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Máng lăn"
    options={SLOPES.map((x) => ({ value: x.id, label: x.name }))}
    bind:value={slopeId}
    onchange={changeSlope}
  />

  <figure class="{card} overflow-hidden p-2">
    <svg viewBox="0 0 480 170" class="w-full select-none" role="img" aria-label={stage}>
      <line
        x1={X0}
        y1={Y0}
        x2={X1}
        y2={Y1}
        stroke="#64748b"
        stroke-width="6"
        stroke-linecap="round"
      />
      <line x1={X0} y1={Y0 - 26} x2={X0} y2={Y0 + 8} stroke="#16a34a" stroke-width="3" />
      <text x={X0 + 6} y={Y0 - 16} class="fill-emerald-700 text-[12px] font-semibold"
        >Xuất phát</text
      >
      <line x1={X1} y1={Y1 - 34} x2={X1} y2={Y1 + 10} stroke="#dc2626" stroke-width="3" />
      <text x={X1 - 6} y={Y1 - 38} text-anchor="end" class="fill-red-700 text-[12px] font-semibold"
        >Đích</text
      >
      <circle cx={ball.x} cy={ball.y} r={BALL} fill="#2563eb" stroke="#1e3a8a" stroke-width="2" />
      {#if countdown > 0}
        <text x="240" y="60" text-anchor="middle" class="fill-slate-800 text-[36px] font-bold"
          >{countdown}</text
        >
      {/if}
    </svg>
    <figcaption class="px-2 text-center text-sm font-semibold text-slate-700" aria-live="polite">
      {stage}
    </figcaption>
  </figure>

  <div class="grid gap-4 sm:grid-cols-2">
    <div class="{card} space-y-3 p-3">
      <p class="text-sm font-semibold text-slate-700">Đồng hồ bấm giây (ĐCNN 0,01 s)</p>
      <output
        class="block rounded-lg bg-slate-900 px-4 py-3 text-right font-mono text-4xl font-bold tabular-nums text-emerald-400"
        aria-label="Số chỉ của đồng hồ: {s(reading)}">{formatFixed(reading, 2)}</output
      >
      <div class="flex flex-wrap gap-2">
        <button type="button" class={button.primary} onclick={pressStart}>Start</button>
        <button type="button" class={button.secondary} onclick={pressStop}>Stop</button>
        <button type="button" class={button.quiet} onclick={pressReset}>Reset</button>
      </div>
      <button type="button" class="{button.secondary} w-full" onclick={release}>Thả bóng</button>
    </div>

    <div class="{card} p-3">
      <table class="w-full text-sm tabular-nums">
        <caption class="mb-2 text-left font-semibold text-slate-700">Kết quả các lần đo</caption>
        <thead>
          <tr class="text-left text-slate-600">
            <th class="py-1 pr-2">Lần</th>
            <th class="py-1 pr-2">Thời gian (s)</th>
            <th class="py-1">So với trung bình (s)</th>
          </tr>
        </thead>
        <tbody>
          {#each trials as t, i (i)}
            <tr class="border-t border-slate-100">
              <td class="py-1 pr-2">{i + 1}</td>
              <td class="py-1 pr-2">{formatFixed(t.measured, 2)}</td>
              <td class="py-1">
                {#if !t.resetFirst}
                  <span class="text-amber-800">quên Reset, bỏ</span>
                {:else if summary.mean !== null}
                  {signed(gap(t.measured, summary.mean))}
                {/if}
              </td>
            </tr>
          {:else}
            <tr><td colspan="3" class="py-2 text-slate-500">Chưa có lần đo nào.</td></tr>
          {/each}
        </tbody>
      </table>
      {#if summary.mean !== null}
        <p class="mt-2 text-sm font-semibold text-slate-700">
          Trung bình: {s(summary.mean)}
        </p>
      {/if}
    </div>
  </div>

  <FeedbackNote tone={feedback.tone} text={feedback.text} />
</div>
