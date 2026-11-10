<script>
  import { draggable } from '#lib/actions/draggable.svelte.js';
  import { readNumber } from '#lib/core/decimal.js';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { formatFixed, formatNumber, numTex } from '#lib/core/number-format.js';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { button, card, textInput } from '#lib/core/ui.js';
  import { clamp } from '#lib/core/visuals/svg-math.js';
  import {
    DIVS_X,
    DIVS_Y,
    FORKS,
    TIME_DIVS,
    judgeFrequency,
    meanAndError,
    readable,
    trace,
  } from './engine.js';

  const W = 340;
  const H = 240;
  const PAD = 10;
  const DIV = (W - 2 * PAD) / DIVS_X;
  const MID = PAD + (DIVS_Y / 2) * DIV;
  const HEIGHT = 2.6;
  const TIME_OPTIONS = TIME_DIVS.map((d) => ({ value: d, label: `${formatNumber(d)} ms/ô` }));

  let forkId = $state('a');
  let timeDiv = $state(2);
  let struck = $state(false);
  let c1 = $state(0);
  let c2 = $state(2);
  let typed = $state('');
  /** @type {{ tone: 'ok' | 'warn' | 'info', text: string } | null} */
  let checked = $state(null);
  /** @type {number[]} */
  let readings = $state([]);
  /** @type {SVGSVGElement | null} */
  let board = $state(null);

  const fork = $derived(FORKS.find((f) => f.value === forkId) ?? FORKS[0]);
  const points = $derived(
    struck
      ? trace(fork.frequency, timeDiv, HEIGHT)
          .map((p) => `${(PAD + p.x * DIV).toFixed(1)},${(MID - p.y * DIV).toFixed(1)}`)
          .join(' ')
      : `${PAD},${MID} ${W - PAD},${MID}`,
  );
  const gap = $derived(Math.abs(c2 - c1));
  const summary = $derived(readings.length ? meanAndError(readings) : null);

  /** @param {number} v divisions */
  const snapDiv = (v) => Math.round(clamp(v, 0, DIVS_X) * 10) / 10;

  /** @param {string} key @param {number} v */
  function setCursor(key, v) {
    if (key === 'c1') c1 = v;
    else c2 = v;
  }

  function newFork() {
    struck = false;
    checked = null;
    typed = '';
    readings = [];
  }

  function check() {
    const guess = readNumber(typed.replace(/\s*hz\s*$/i, ''));
    if (guess === null || guess <= 0) {
      checked = { tone: 'warn', text: 'Hãy nhập tần số là một số dương, theo đơn vị Hz.' };
      return;
    }
    const verdict = judgeFrequency(guess, fork.frequency);
    if (verdict.ok) {
      readings = [...readings, guess];
      checked = {
        tone: 'ok',
        text: `Tốt! Kết quả $f = ${numTex(guess, 1)}$ Hz lệch khoảng $${numTex(verdict.error, 1)}\\%$ so với tần số ghi trên âm thoa ($${fork.frequency}$ Hz). Đã ghi vào bảng; đổi TIME/DIV và đo lại để có thêm lần đo.`,
      };
    } else {
      checked = {
        tone: 'warn',
        text: 'Chưa khớp. Kiểm tra lại: số ô ứng với một số nguyên chu kì, nhân với số ms của một ô để được thời gian, chia cho số chu kì để được $T$, rồi $f = \\dfrac{1}{T}$ (nhớ đổi ms ra s).',
      };
    }
  }

  const status = $derived.by(() => {
    if (!struck) {
      return {
        tone: /** @type {const} */ ('info'),
        text: 'Bấm Gõ âm thoa để micro thu âm và đưa tín hiệu lên màn hình.',
      };
    }
    if (!readable(fork.frequency, timeDiv)) {
      return {
        tone: /** @type {const} */ ('warn'),
        text: 'Với thang thời gian này, đồ thị quá dày hoặc chưa đủ một chu kì nên khó đọc. Vặn núm TIME/DIV sang giá trị khác.',
      };
    }
    return {
      tone: /** @type {const} */ ('info'),
      text: `Một ô ngang ứng với $${numTex(timeDiv)}$ ms. Kéo hai con trỏ tới hai điểm cách nhau một số nguyên chu kì (chẳng hạn hai đỉnh), đọc số ô rồi tính $T$ và $f$.`,
    };
  });
</script>

<div class="space-y-4">
  <SegmentedControl label="Chọn âm thoa" options={FORKS} bind:value={forkId} onchange={newFork} />

  <div class="{card} space-y-2 p-2">
    <svg
      bind:this={board}
      viewBox="0 0 {W} {H}"
      class="mx-auto block w-full max-w-md touch-none select-none rounded-xl bg-slate-900"
      role="group"
      aria-label={`Màn hình dao động kí ${DIVS_X} ô ngang, ${DIVS_Y} ô dọc, ${formatNumber(timeDiv)} mili giây mỗi ô. ${struck ? 'Đang hiển thị sóng âm hình sin.' : 'Chưa có tín hiệu.'} Hai con trỏ cách nhau ${formatNumber(gap, 1)} ô.`}
    >
      {#each Array.from({ length: DIVS_X + 1 }, (_, i) => i) as i (i)}
        <line
          x1={PAD + i * DIV}
          x2={PAD + i * DIV}
          y1={PAD}
          y2={PAD + DIVS_Y * DIV}
          stroke="#334155"
        />
      {/each}
      {#each Array.from({ length: DIVS_Y + 1 }, (_, i) => i) as i (i)}
        <line x1={PAD} x2={W - PAD} y1={PAD + i * DIV} y2={PAD + i * DIV} stroke="#334155" />
      {/each}
      {#each Array.from({ length: DIVS_X * 5 + 1 }, (_, i) => i) as i (i)}
        <line
          x1={PAD + (i * DIV) / 5}
          x2={PAD + (i * DIV) / 5}
          y1={MID - 3}
          y2={MID + 3}
          stroke="#64748b"
        />
      {/each}
      <polyline {points} fill="none" stroke="#4ade80" stroke-width="2" />
      {#each [{ key: 'c1', v: c1, name: 'thứ nhất' }, { key: 'c2', v: c2, name: 'thứ hai' }] as cur (cur.key)}
        <line
          x1={PAD + cur.v * DIV}
          x2={PAD + cur.v * DIV}
          y1={PAD}
          y2={PAD + DIVS_Y * DIV}
          stroke="#fbbf24"
          stroke-dasharray="4 3"
        />
        <g
          class="drag-handle cursor-ew-resize outline-none"
          role="slider"
          tabindex="0"
          aria-label={`Con trỏ ${cur.name}: kéo ngang hoặc dùng phím trái phải`}
          aria-valuemin={0}
          aria-valuemax={DIVS_X}
          aria-valuenow={cur.v}
          aria-valuetext={`${formatNumber(cur.v, 1)} ô`}
          use:draggable={{
            point: { x: PAD + cur.v * DIV, y: H - 12 },
            svg: () => board,
            viewBox: { w: W, h: H },
            pad: 0,
            projector: (p) => {
              setCursor(cur.key, snapDiv((p.x - PAD) / DIV));
              return p;
            },
            onKeyMove: (dx, _dy, big) => setCursor(cur.key, snapDiv(cur.v + dx * (big ? 1 : 0.1))),
          }}
        >
          <path
            class="drag-knob"
            d="M {PAD + cur.v * DIV} {H - 20} l -7 12 h 14 z"
            fill="#fbbf24"
          />
        </g>
      {/each}
    </svg>
    <p class="px-2 text-sm tabular-nums text-slate-700">
      Hai con trỏ cách nhau {formatFixed(gap, 1)} ô. TIME/DIV: {formatNumber(timeDiv)} ms/ô.
    </p>
  </div>

  <div class="flex flex-wrap items-center gap-3">
    <button type="button" class={button.primary} onclick={() => (struck = true)}>Gõ âm thoa</button>
  </div>
  <SegmentedControl label="Núm TIME/DIV" options={TIME_OPTIONS} bind:value={timeDiv} />
  <FeedbackNote tone={status.tone} text={status.text} />

  <form
    class="flex flex-wrap items-end gap-3"
    onsubmit={(e) => {
      e.preventDefault();
      check();
    }}
  >
    <label class="min-w-40 flex-1 text-sm font-semibold text-slate-700">
      Tần số em tính được (Hz)
      <input class="{textInput} mt-1" inputmode="decimal" bind:value={typed} disabled={!struck} />
    </label>
    <button type="submit" class={button.secondary} disabled={!struck}>Kiểm tra</button>
  </form>
  {#if checked}
    <FeedbackNote tone={checked.tone} text={checked.text} />
  {/if}

  {#if readings.length}
    <div class="{card} overflow-x-auto p-3 text-sm">
      <table class="w-full tabular-nums">
        <caption class="mb-1 text-left font-semibold text-slate-700"
          >Bảng kết quả, {fork.label.toLowerCase()}</caption
        >
        <thead>
          <tr class="text-left text-slate-600"
            ><th scope="col">Lần đo</th><th scope="col">f (Hz)</th></tr
          >
        </thead>
        <tbody>
          {#each readings as r, i (i)}
            <tr><td>{i + 1}</td><td>{formatNumber(r, 1)}</td></tr>
          {/each}
        </tbody>
      </table>
      {#if summary}
        <p class="mt-2 text-slate-700">
          Giá trị trung bình {formatNumber(summary.mean, 1)} Hz, sai số Δf = {formatNumber(
            summary.delta,
            1,
          )} Hz: f = {formatNumber(summary.mean, 1)} ± {formatNumber(summary.delta, 1)} Hz.
        </p>
      {/if}
    </div>
  {/if}
</div>
