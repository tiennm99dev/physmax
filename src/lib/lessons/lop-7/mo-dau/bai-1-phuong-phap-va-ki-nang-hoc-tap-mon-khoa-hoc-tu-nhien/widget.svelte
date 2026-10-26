<script>
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import { button, card } from '#lib/core/ui.js';
  import { formatFixed } from '#lib/core/number-format.js';
  import {
    GATE_A,
    SCALES,
    SLOPES,
    TRACK,
    reading,
    rolledAt,
    runTime,
    summarise,
    timeAt,
  } from './engine.js';

  const DELAY = 600;
  // Track drawn from the release point (top left) down to the right.
  const X0 = 40;
  const X1 = 460;
  const Y0 = 72;
  const BALL = 9;

  let slopeId = $state(/** @type {'doc' | 'thoai'} */ ('doc'));
  let scaleId = $state(/** @type {'nho' | 'lon'} */ ('nho'));
  let distance = $state(50);
  /** Display of the timer when no ball is between the gates: a time, or 'over' past its GHĐ. */
  let shown = $state(/** @type {number | 'over'} */ (0));
  /** @typedef {{ go: number, d: number, accel: number, tA: number, tB: number, measured: number, done: boolean }} Run */
  let run = $state(/** @type {Run | null} */ (null));
  let runs = $state(0);
  let now = $state(0);
  /** @type {import('./engine.js').Trial[]} */
  let trials = $state([]);
  /** @type {{ tone: 'ok' | 'warn' | 'info', text: string } | null} */
  let note = $state(null);
  let reduceMotion = $state(false);

  const slope = $derived(SLOPES.find((s) => s.id === slopeId) ?? SLOPES[0]);
  const scale = $derived(SCALES.find((s) => s.id === scaleId) ?? SCALES[0]);
  const Y1 = $derived(slopeId === 'doc' ? 170 : 104);
  const since = $derived(run ? (now - run.go) / 1000 : -1);
  const rolling = $derived(run !== null && !run.done);

  const at = (/** @type {number} */ x) => ({
    x: X0 + ((X1 - X0) * x) / TRACK,
    y: Y0 + ((Y1 - Y0) * x) / TRACK,
  });
  const gateA = $derived(at(GATE_A));
  const gateB = $derived(at(GATE_A + distance / 100));

  const ballPos = $derived.by(() => {
    if (!run) return 0;
    const s = rolledAt(since, run.accel);
    if (!reduceMotion || s >= TRACK) return s;
    return Math.floor((s / TRACK) * 6) * (TRACK / 6);
  });
  const ball = $derived.by(() => {
    const p = at(ballPos);
    const len = Math.hypot(X1 - X0, Y1 - Y0);
    // Sit the ball on top of the track line.
    return { x: p.x + (BALL * (Y1 - Y0)) / len, y: p.y - (BALL * (X1 - X0)) / len - 2 };
  });

  /** What the screen shows right now: a number, or 'over'. */
  const display = $derived.by(() => {
    if (!run || run.done) return shown;
    if (since < run.tA) return shown;
    const t = Math.min(since, run.tB) - run.tA;
    const r = reading(t, scale);
    return r === null ? 'over' : r;
  });
  const digits = $derived(display === 'over' ? '– – – –' : formatFixed(display, scale.digits));
  const spoken = $derived(
    display === 'over' ? 'vượt quá giới hạn đo' : `${formatFixed(display, scale.digits)} giây`,
  );
  const blockedA = $derived(run !== null && Math.abs(ballPos - GATE_A) < 0.02);
  const blockedB = $derived(run !== null && Math.abs(ballPos - (GATE_A + distance / 100)) < 0.02);

  const stage = $derived(
    !run
      ? 'Viên bi đang nằm ở đầu máng, cổng quang A và B đặt trên máng.'
      : run.done
        ? 'Viên bi đã đi qua cổng quang B, đồng hồ đã dừng.'
        : since < 0
          ? 'Chuẩn bị thả bi…'
          : since < run.tA
            ? 'Viên bi đang lăn tới cổng quang A.'
            : 'Viên bi đã qua cổng A, đồng hồ đang đếm.',
  );
  const summary = $derived(summarise(trials, distance, slopeId, scale));

  const sec = (/** @type {number} */ v, /** @type {number} */ d) => `${formatFixed(v, d)} s`;

  $effect(() => {
    reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let frame = 0;
    const tick = () => {
      now = performance.now();
      if (run && !run.done && (now - run.go) / 1000 >= run.tB + 0.3) finish(run);
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  });

  /** @param {Run} r */
  function finish(r) {
    run = { ...r, done: true };
    const value = reading(r.measured, scale);
    if (value === null) {
      shown = 'over';
      note = {
        tone: 'warn',
        text: `Bi lăn từ A đến B lâu hơn ${sec(scale.max, scale.digits)}, vượt quá GHĐ của thang đo này nên đồng hồ không hiện được kết quả. Nhấn RESET và chọn thang đo 99,99 s – 0,01 s.`,
      };
      return;
    }
    shown = value;
    trials = [...trials, { distance, slope: slopeId, scale: scaleId, time: value }];
    const n = trials.length;
    note =
      scale.id === 'lon' && value <= SCALES[0].max
        ? {
            tone: 'info',
            text: `Lần ${n}: ${sec(value, 2)}. Thời gian này ngắn hơn 9,999 s, nên thang đo 9,999 s – 0,001 s (ĐCNN 0,001 s) cho kết quả chính xác hơn.`,
          }
        : {
            tone: 'ok',
            text: `Lần ${n}: ${sec(value, scale.digits)}. Đã ghi vào bảng. Nhấn RESET rồi thả bi để đo lần tiếp theo.`,
          };
  }

  function release() {
    if (rolling) return;
    if (shown !== 0) {
      note = {
        tone: 'warn',
        text: 'Đồng hồ còn hiện kết quả lần trước. Nhấn RESET để đưa số chỉ về 0 trước khi thả bi.',
      };
      return;
    }
    const d = distance / 100;
    const accel = slope.accel;
    run = {
      go: performance.now() + DELAY,
      d,
      accel,
      tA: timeAt(GATE_A, accel),
      tB: timeAt(GATE_A + d, accel),
      measured: runTime(d, accel, runs),
      done: false,
    };
    runs += 1;
    note = null;
  }

  function pressReset() {
    if (rolling) return;
    shown = 0;
    run = null;
  }

  function changeSetup() {
    if (rolling) run = null;
    note = null;
  }

  /** @type {{ tone: 'ok' | 'warn' | 'info', text: string }} */
  const feedback = $derived.by(() => {
    const base = note ?? {
      tone: 'info',
      text: 'Nhấn RESET để số chỉ về 0, rồi nhấn "Thả bi". Đồng hồ tự bật khi bi đi qua cổng A và tự tắt khi bi đi qua cổng B.',
    };
    if (summary.count >= 3 && summary.mean !== null && summary.spread !== null) {
      return {
        tone: base.tone,
        text: `${base.text} Trung bình ${summary.count} lần đo với cách đặt này: ${sec(summary.mean, scale.digits)}; các lần đo lệch khỏi trung bình không quá ${sec(summary.spread, scale.digits)}.`,
      };
    }
    return base;
  });
</script>

<div class="space-y-4">
  <div class="flex flex-wrap gap-4">
    <SegmentedControl
      label="Độ dốc của máng"
      options={SLOPES.map((x) => ({ value: x.id, label: x.name }))}
      bind:value={slopeId}
      onchange={changeSetup}
    />
    <SegmentedControl
      label="Thang đo của đồng hồ"
      options={SCALES.map((x) => ({ value: x.id, label: x.label }))}
      bind:value={scaleId}
      onchange={changeSetup}
    />
  </div>
  <SliderField
    label="Khoảng cách từ cổng quang A đến cổng quang B"
    bind:value={distance}
    min={10}
    max={100}
    step={10}
    unit="cm"
    oninput={changeSetup}
  />

  <figure class="{card} overflow-hidden p-2">
    <svg viewBox="0 0 490 196" class="w-full select-none" role="img" aria-label={stage}>
      <line
        x1={X0}
        y1={Y0}
        x2={X1}
        y2={Y1}
        stroke="#64748b"
        stroke-width="6"
        stroke-linecap="round"
      />
      <line x1={X0} y1={Y0 - 30} x2={X0} y2={Y0 + 6} stroke="#334155" stroke-width="3" />
      {#each [{ p: gateA, name: 'A', lit: blockedA }, { p: gateB, name: 'B', lit: blockedB }] as g (g.name)}
        <g>
          <rect
            x={g.p.x - 4}
            y={g.p.y - 46}
            width="8"
            height="44"
            rx="2"
            fill={g.lit ? '#dc2626' : '#475569'}
          />
          <line
            x1={g.p.x}
            y1={g.p.y - 40}
            x2={g.p.x}
            y2={g.p.y - 4}
            stroke="#ef4444"
            stroke-width="1.5"
            stroke-dasharray="3 3"
            opacity="0.7"
          />
          <text
            x={g.p.x}
            y={g.p.y - 52}
            text-anchor="middle"
            class="fill-slate-800 text-[18px] font-bold">{g.name}</text
          >
        </g>
      {/each}
      <circle cx={ball.x} cy={ball.y} r={BALL} fill="#2563eb" stroke="#1e3a8a" stroke-width="2" />
    </svg>
    <figcaption class="px-2 text-center text-sm font-semibold text-slate-700" aria-live="polite">
      {stage}
    </figcaption>
  </figure>

  <div class="grid gap-4 sm:grid-cols-2">
    <div class="{card} space-y-3 p-3">
      <p class="text-sm font-semibold text-slate-700">
        Đồng hồ đo thời gian hiện số · MODE A↔B · thang đo {scale.label}
      </p>
      <p
        class="rounded-lg bg-slate-900 px-4 py-3 text-right font-mono text-4xl font-bold tabular-nums text-emerald-400"
      >
        <span class="sr-only">Số chỉ của đồng hồ: {spoken}</span>
        <span aria-hidden="true">{digits}</span>
      </p>
      <div class="flex flex-wrap gap-2">
        <button type="button" class={button.quiet} onclick={pressReset} disabled={rolling}
          >RESET</button
        >
        <button type="button" class={button.primary} onclick={release} disabled={rolling}
          >Thả bi</button
        >
      </div>
    </div>

    <div class="{card} max-h-72 overflow-y-auto p-3">
      <table class="w-full text-sm tabular-nums">
        <caption class="mb-2 text-left font-semibold text-slate-700">Bảng kết quả đo</caption>
        <thead>
          <tr class="text-left text-slate-600">
            <th class="py-1 pr-2">Lần</th>
            <th class="py-1 pr-2">Máng</th>
            <th class="py-1 pr-2">AB (cm)</th>
            <th class="py-1">t (s)</th>
          </tr>
        </thead>
        <tbody>
          {#each trials as t, i (i)}
            <tr class="border-t border-slate-100">
              <td class="py-1 pr-2">{i + 1}</td>
              <td class="py-1 pr-2">{t.slope === 'doc' ? 'dốc' : 'thoải'}</td>
              <td class="py-1 pr-2">{t.distance}</td>
              <td class="py-1">{formatFixed(t.time, t.scale === 'nho' ? 3 : 2)}</td>
            </tr>
          {:else}
            <tr><td colspan="4" class="py-2 text-slate-500">Chưa có lần đo nào.</td></tr>
          {/each}
        </tbody>
      </table>
      {#if summary.mean !== null}
        <p class="mt-2 text-sm font-semibold text-slate-700">
          Trung bình với cách đặt hiện tại ({summary.count} lần): {sec(summary.mean, scale.digits)}
        </p>
      {/if}
    </div>
  </div>

  <p
    class="rounded-xl px-4 py-3 text-sm font-semibold {feedback.tone === 'ok'
      ? 'bg-emerald-50 text-emerald-800'
      : feedback.tone === 'warn'
        ? 'bg-amber-50 text-amber-900'
        : 'bg-slate-100 text-slate-700'}"
    aria-live="polite"
  >
    {feedback.text}
  </p>
</div>
