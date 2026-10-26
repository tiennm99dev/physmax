<script>
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import { button, card, textInput } from '#lib/core/ui.js';
  import { formatFixed, formatNumber } from '#lib/core/number-format.js';
  import { parseNumber } from '#lib/core/answer-check.js';
  import { closeEnough } from '../_shared/speed.js';
  import {
    CARS,
    GATE_A,
    TRACK,
    frontAt,
    measuredSpeed,
    stopwatchReading,
    timerReading,
    travelTime,
  } from './engine.js';

  const VW = 520;
  const X0 = 20;
  const X1 = 500;
  const ROAD = 92;
  const CAR = 10; // car length in cm
  const X = (/** @type {number} */ cm) => X0 + ((X1 - X0) * cm) / TRACK;

  let mode = $state(/** @type {'cong' | 'tay'} */ ('cong'));
  let distance = $state(50);
  let carNo = $state(0);
  /** @typedef {{ go: number, v: number, d: number, mode: 'cong' | 'tay', presses: number[], done: boolean }} Run */
  let run = $state(/** @type {Run | null} */ (null));
  let now = $state(0);
  let reduceMotion = $state(false);
  /** @typedef {{ mode: 'cong' | 'tay', d: number, t: number, truth: number, v: number | null }} Row */
  let rows = $state(/** @type {Row[]} */ ([]));
  let typed = $state('');
  /** @type {{ tone: 'ok' | 'warn' | 'info', text: string } | null} */
  let note = $state(null);

  const since = $derived(run ? (now - run.go) / 1000 : 0);
  const front = $derived.by(() => {
    if (!run) return CAR;
    const f = CAR + frontAt(run.v, since);
    if (!reduceMotion || f >= TRACK) return Math.min(f, TRACK);
    return Math.floor(f / 10) * 10;
  });
  const gateB = $derived(GATE_A + distance);
  const rolling = $derived(run !== null && !run.done);
  // Moments (s after the start) the car's front crosses A and B.
  const tA = $derived(run ? (GATE_A - CAR) / 100 / run.v : 0);
  const tB = $derived(run ? (GATE_A + run.d - CAR) / 100 / run.v : 0);

  const last = $derived(rows.at(-1) ?? null);
  const digits = $derived(mode === 'cong' ? 3 : 2);

  /** Number on the clock face right now. */
  const display = $derived.by(() => {
    if (!run) return 0;
    if (run.mode === 'cong') {
      if (since < tA) return 0;
      const t = Math.min(since, tB) - tA;
      return timerReading(t) ?? 0;
    }
    const [start, stop] = run.presses;
    if (start === undefined) return 0;
    return stopwatchReading(start, stop ?? (run.done ? start : since));
  });

  const stage = $derived.by(() => {
    if (!run) return 'Xe đồ chơi đứng ở đầu đường ray.';
    if (run.done) return 'Xe đã chạy hết đường ray.';
    if (front < GATE_A) return 'Xe đang chạy tới vạch A.';
    if (front < GATE_A + run.d) return 'Xe đang chạy giữa vạch A và vạch B.';
    return 'Xe đã qua vạch B.';
  });

  // The clock ticks only while a car is rolling, so an idle widget does no work.
  $effect(() => {
    if (!rolling) return;
    let frame = 0;
    const tick = () => {
      now = performance.now();
      if (run && !run.done && frontAt(run.v, (now - run.go) / 1000) + CAR >= TRACK) finish();
      else frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  });

  function start() {
    if (rolling) return;
    reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    now = performance.now();
    run = {
      go: now,
      v: CARS[carNo % CARS.length],
      d: distance,
      mode,
      presses: [],
      done: false,
    };
    typed = '';
    note =
      mode === 'tay'
        ? {
            tone: 'info',
            text: 'Nhấn "Bấm giây" đúng lúc đầu xe chạm vạch A, nhấn lần nữa đúng lúc đầu xe chạm vạch B.',
          }
        : { tone: 'info', text: 'Đồng hồ tự bật khi xe qua cổng A và tự tắt khi xe qua cổng B.' };
  }

  function press() {
    if (!run || run.mode !== 'tay' || run.presses.length >= 2) return;
    run.presses = [...run.presses, (performance.now() - run.go) / 1000];
    if (run.presses.length === 2) record();
  }

  function finish() {
    if (!run) return;
    const r = run;
    run = { ...r, done: true };
    if (r.mode === 'cong') record();
    else if (r.presses.length < 2) {
      note = {
        tone: 'warn',
        text: 'Xe đã chạy hết đường ray mà em chưa bấm đủ hai lần. Nhấn "Cho xe chạy" để đo lại.',
      };
    }
  }

  function record() {
    if (!run) return;
    const truth = travelTime(run.d, run.v);
    const t =
      run.mode === 'cong'
        ? (timerReading(truth) ?? truth)
        : stopwatchReading(run.presses[0], run.presses[1]);
    rows = [...rows, { mode: run.mode, d: run.d, t, truth, v: null }];
    note = {
      tone: 'info',
      text: `Đã ghi: s = ${run.d} cm, t = ${formatFixed(t, run.mode === 'cong' ? 3 : 2)} s. Hãy tính tốc độ của xe theo m/s và nhập vào ô bên dưới.`,
    };
  }

  function check() {
    if (!last) return;
    const p = parseNumber(typed);
    if (!p) {
      note = { tone: 'warn', text: 'Hãy nhập một số, ví dụ 0,42.' };
      return;
    }
    const v = measuredSpeed(last.d, last.t);
    const s = formatNumber(last.d / 100, 2);
    const t = formatFixed(last.t, last.mode === 'cong' ? 3 : 2);
    if (!closeEnough(p.value, v)) {
      note = {
        tone: 'warn',
        text: closeEnough(p.value, last.d / last.t)
          ? `Em đang chia số xentimét cho số giây, nên được cm/s. Đổi s = ${last.d} cm = ${s} m trước khi chia.`
          : `Chưa đúng. Đổi quãng đường ra mét (s = ${s} m) rồi chia cho thời gian t = ${t} s.`,
      };
      return;
    }
    rows = rows.map((r, i) => (i === rows.length - 1 ? { ...r, v } : r));
    // What the photogate timer would show for the same run, cut to its 0,001 s division.
    const gateT = timerReading(last.truth) ?? last.truth;
    const real = measuredSpeed(last.d, gateT);
    note =
      last.mode === 'cong'
        ? {
            tone: 'ok',
            text: `Đúng: v = ${s} : ${t} ≈ ${formatNumber(v, 2)} m/s. Đổi khoảng cách hai cổng hoặc chọn xe khác để đo tiếp.`,
          }
        : {
            tone: 'ok',
            text: `Đúng: v = ${s} : ${t} ≈ ${formatNumber(v, 2)} m/s. Cổng quang đo được t = ${formatFixed(gateT, 3)} s, tức v ≈ ${formatNumber(real, 2)} m/s; em bấm lệch khoảng ${formatFixed(Math.abs(last.t - last.truth), 2)} s do phản xạ của tay.`,
          };
  }

  function changeSetup() {
    if (rolling) run = null;
  }

  function nextCar() {
    carNo += 1;
    run = null;
    note = { tone: 'info', text: `Đã đổi sang xe số ${(carNo % CARS.length) + 1}.` };
  }
</script>

<div class="space-y-4">
  <div class="flex flex-wrap gap-4">
    <SegmentedControl
      label="Cách đo thời gian"
      options={[
        { value: 'cong', label: 'Cổng quang điện' },
        { value: 'tay', label: 'Đồng hồ bấm giây' },
      ]}
      bind:value={mode}
      onchange={changeSetup}
    />
  </div>
  <SliderField
    label="Khoảng cách từ vạch A đến vạch B (s)"
    bind:value={distance}
    min={30}
    max={100}
    step={10}
    unit="cm"
    oninput={changeSetup}
  />

  <figure class="{card} overflow-hidden p-2">
    <svg viewBox="0 0 {VW} 150" class="w-full select-none" role="img" aria-label={stage}>
      <rect x={X0} y={ROAD} width={X1 - X0} height="8" fill="#94a3b8" rx="2" />
      <!-- ruler -->
      <rect x={X0} y={ROAD + 12} width={X1 - X0} height="18" fill="#fef9c3" stroke="#ca8a04" />
      {#each Array.from({ length: TRACK / 10 + 1 }, (_, i) => i * 10) as cm (cm)}
        <line x1={X(cm)} y1={ROAD + 12} x2={X(cm)} y2={ROAD + 20} stroke="#854d0e" />
        {#if cm % 20 === 0}
          <text x={X(cm)} y={ROAD + 42} text-anchor="middle" class="fill-slate-600 text-[11px]"
            >{cm}</text
          >
        {/if}
      {/each}
      <text x={X1} y={ROAD + 42} text-anchor="end" class="fill-slate-600 text-[11px]">cm</text>
      {#each [{ cm: GATE_A, name: 'A' }, { cm: gateB, name: 'B' }] as g (g.name)}
        {#if mode === 'cong'}
          <rect x={X(g.cm) - 4} y={ROAD - 52} width="8" height="50" rx="2" fill="#475569" />
          <line
            x1={X(g.cm)}
            y1={ROAD - 46}
            x2={X(g.cm)}
            y2={ROAD}
            stroke="#ef4444"
            stroke-dasharray="3 3"
          />
        {:else}
          <line
            x1={X(g.cm)}
            y1={ROAD - 40}
            x2={X(g.cm)}
            y2={ROAD + 8}
            stroke="#0f172a"
            stroke-width="2"
          />
        {/if}
        <text
          x={X(g.cm)}
          y={ROAD - 58}
          text-anchor="middle"
          class="fill-slate-800 text-[16px] font-bold">{g.name}</text
        >
      {/each}
      <g>
        <rect
          x={X(front - CAR)}
          y={ROAD - 20}
          width={X(CAR) - X0}
          height="16"
          rx="4"
          fill="#2563eb"
        />
        <circle cx={X(front - CAR) + 9} cy={ROAD - 2} r="5" fill="#0f172a" />
        <circle cx={X(front) - 9} cy={ROAD - 2} r="5" fill="#0f172a" />
      </g>
    </svg>
    <figcaption class="px-2 text-center text-sm font-semibold text-slate-700" aria-live="polite">
      {stage}
    </figcaption>
  </figure>

  <div class="grid gap-4 sm:grid-cols-2">
    <div class="{card} space-y-3 p-3">
      <p class="text-sm font-semibold text-slate-700">
        {mode === 'cong'
          ? 'Đồng hồ đo thời gian hiện số · MODE A↔B · 9,999 s – 0,001 s'
          : 'Đồng hồ bấm giây · ĐCNN 0,01 s'}
      </p>
      <p
        class="rounded-lg bg-slate-900 px-4 py-3 text-right font-mono text-4xl font-bold tabular-nums text-emerald-400"
      >
        <span class="sr-only">Số chỉ của đồng hồ: {formatFixed(display, digits)} giây</span>
        <span aria-hidden="true">{formatFixed(display, digits)}</span>
      </p>
      <div class="flex flex-wrap gap-2">
        <button type="button" class={button.primary} onclick={start} disabled={rolling}
          >Cho xe chạy</button
        >
        {#if mode === 'tay'}
          <button
            type="button"
            class={button.secondary}
            onclick={press}
            disabled={!rolling || (run?.presses.length ?? 0) >= 2}>Bấm giây</button
          >
        {/if}
        <button type="button" class={button.quiet} onclick={nextCar} disabled={rolling}
          >Đổi xe</button
        >
      </div>
    </div>

    <div class="{card} max-h-72 overflow-y-auto p-3">
      <table class="w-full text-sm tabular-nums">
        <caption class="mb-2 text-left font-semibold text-slate-700">Bảng kết quả đo</caption>
        <thead>
          <tr class="text-left text-slate-600">
            <th class="py-1 pr-2">Lần</th>
            <th class="py-1 pr-2">Cách đo</th>
            <th class="py-1 pr-2">s (cm)</th>
            <th class="py-1 pr-2">t (s)</th>
            <th class="py-1">v (m/s)</th>
          </tr>
        </thead>
        <tbody>
          {#each rows as r, i (i)}
            <tr class="border-t border-slate-100">
              <td class="py-1 pr-2">{i + 1}</td>
              <td class="py-1 pr-2">{r.mode === 'cong' ? 'cổng quang' : 'bấm tay'}</td>
              <td class="py-1 pr-2">{r.d}</td>
              <td class="py-1 pr-2">{formatFixed(r.t, r.mode === 'cong' ? 3 : 2)}</td>
              <td class="py-1">{r.v === null ? '?' : formatNumber(r.v, 2)}</td>
            </tr>
          {:else}
            <tr><td colspan="5" class="py-2 text-slate-500">Chưa có lần đo nào.</td></tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>

  {#if last && last.v === null}
    <form
      class="flex flex-wrap items-end gap-2"
      onsubmit={(e) => {
        e.preventDefault();
        check();
      }}
    >
      <label class="min-w-0 flex-1">
        <span class="mb-1 block text-sm font-semibold text-slate-700"
          >Tốc độ của xe ở lần đo {rows.length} (m/s)</span
        >
        <input class={textInput} inputmode="decimal" autocomplete="off" bind:value={typed} />
      </label>
      <button type="submit" class={button.primary}>Kiểm tra</button>
    </form>
  {/if}

  <p
    class="rounded-xl px-4 py-3 text-sm font-semibold {note?.tone === 'ok'
      ? 'bg-emerald-50 text-emerald-800'
      : note?.tone === 'warn'
        ? 'bg-amber-50 text-amber-900'
        : 'bg-slate-100 text-slate-700'}"
    aria-live="polite"
  >
    {note?.text ??
      'Chọn cách đo, đặt khoảng cách AB rồi nhấn "Cho xe chạy". Đọc s trên thước, đọc t trên đồng hồ, rồi tính v = s/t.'}
  </p>
</div>
