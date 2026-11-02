<script>
  import LiveRichText from '#lib/components/live-rich-text.svelte';
  import { readNumber } from '#lib/core/decimal.js';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { frameLoop, reducedMotion } from '#lib/core/motion.js';
  import { formatNumber, numTex } from '#lib/core/number-format.js';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { button, card, textInput } from '#lib/core/ui.js';
  import ForceArrow from '../_shared/force-arrow.svelte';
  import { PROBLEMS, checkForces, isRightAnswer, simulate } from './engine.js';

  const W = 360;
  const H = 230;
  const START = { x: 80, y: 80 };
  /** Longest path the body travels on the board, in pixels. */
  const TRACK = 140;
  const STEPS = ['Vẽ lực', 'Chọn trục', 'Viết phương trình', 'Tính', 'Kiểm tra'];

  let chosen = $state('ngang');
  let step = $state(0);
  let picked = $state(/** @type {string[]} */ ([]));
  let typed = $state('');
  let message = $state(
    /** @type {{ tone: 'ok' | 'warn' | 'info', text: string }} */ ({
      tone: 'info',
      text: 'Bước 1: chọn tất cả các lực tác dụng lên vật, rồi bấm Kiểm tra.',
    }),
  );
  let time = $state(0);
  let ran = $state(false);
  /** @type {(() => void) | null} */
  let stopLoop = null;

  const problem = $derived(PROBLEMS.find((p) => p.value === chosen) ?? PROBLEMS[0]);
  const options = $derived(
    [...problem.forces.map((f) => f.tex), ...problem.decoys.map((d) => d.tex)].toSorted(),
  );
  const axisRad = $derived((problem.axis * Math.PI) / 180);
  const pxPerMetre = $derived(TRACK / Math.max(simulate(problem, problem.runTime).s, 0.01));
  const now = $derived(simulate(problem, time));
  const body = $derived({
    x: START.x + now.s * pxPerMetre * Math.cos(axisRad),
    y: START.y - now.s * pxPerMetre * Math.sin(axisRad),
  });

  /** @param {number} angle degrees @param {number} length pixels */
  const tipOf = (angle, length) => ({
    x: body.x + length * Math.cos((angle * Math.PI) / 180),
    y: body.y - length * Math.sin((angle * Math.PI) / 180),
  });

  function reset() {
    stopLoop?.();
    stopLoop = null;
    step = 0;
    picked = [];
    typed = '';
    time = 0;
    ran = false;
    message = {
      tone: 'info',
      text: 'Bước 1: chọn tất cả các lực tác dụng lên vật, rồi bấm Kiểm tra.',
    };
  }

  /** @param {string} tex */
  function toggle(tex) {
    picked = picked.includes(tex) ? picked.filter((p) => p !== tex) : [...picked, tex];
  }

  function checkPicked() {
    const { missing, extra } = checkForces(picked, problem);
    if (extra.length > 0) {
      message = { tone: 'warn', text: extra[0].why };
    } else if (missing.length > 0) {
      message = {
        tone: 'warn',
        text: `Còn thiếu ${missing.length} lực. Hãy nghĩ xem những vật nào tiếp xúc với vật đang xét, và Trái Đất.`,
      };
    } else {
      step = 1;
      message = { tone: 'ok', text: 'Đủ các lực. Bước 2: chọn hệ trục toạ độ.' };
    }
  }

  /** @param {{ right?: boolean, why: string }} option */
  function pickAxis(option) {
    if (option.right) {
      step = 2;
      message = { tone: 'ok', text: `${option.why} Bước 3: viết phương trình theo $Ox$.` };
    } else {
      message = { tone: 'warn', text: option.why };
    }
  }

  /** @param {{ right?: boolean, why: string }} option */
  function pickEquation(option) {
    if (option.right) {
      step = 3;
      message = { tone: 'ok', text: `${option.why} Bước 4: giải phương trình tìm $a$.` };
    } else {
      message = { tone: 'warn', text: option.why };
    }
  }

  function checkAnswer() {
    const value = readNumber(typed);
    if (value === null) {
      message = { tone: 'warn', text: 'Hãy nhập một số, ví dụ $2{,}5$.' };
    } else if (isRightAnswer(value, problem)) {
      step = 4;
      message = {
        tone: 'ok',
        text: `Đúng: $a = ${numTex(problem.answer, 2)}$ m/s². Bước 5: chạy mô phỏng để kiểm tra kết quả.`,
      };
    } else {
      message = {
        tone: 'warn',
        text: 'Chưa đúng. Thay số cẩn thận vào phương trình vừa chọn, kiểm tra góc, dấu và đơn vị.',
      };
    }
  }

  function finish() {
    const end = simulate(problem, problem.runTime);
    ran = true;
    message = {
      tone: 'ok',
      text: `Mô phỏng cộng các lực theo $Ox$ được $a = ${numTex(end.a, 2)}$ m/s², khớp với kết quả tính. Sau $${numTex(problem.runTime)}$ s: tốc độ $${numTex(Math.abs(end.v), 2)}$ m/s, quãng đường $${numTex(end.s, 2)}$ m.`,
    };
  }

  function run() {
    stopLoop?.();
    if (reducedMotion()) {
      time = problem.runTime;
      finish();
      return;
    }
    time = 0;
    stopLoop = frameLoop((dt) => {
      const next = Math.min(problem.runTime, time + dt);
      time = next;
      if (next >= problem.runTime) {
        stopLoop?.();
        stopLoop = null;
        finish();
      }
    });
  }

  $effect(() => () => stopLoop?.());
</script>

<div class="space-y-4">
  <SegmentedControl label="Bài toán" options={PROBLEMS} bind:value={chosen} onchange={reset} />

  <p class="rounded-xl bg-slate-100 px-4 py-3 text-sm text-slate-800">
    <LiveRichText text={problem.text} />
  </p>

  <ol class="flex flex-wrap gap-1 text-xs font-semibold" aria-label="Các bước giải">
    {#each STEPS as name, i (name)}
      <li
        class="rounded-full px-3 py-1 {i === step
          ? 'bg-indigo-600 text-white'
          : i < step
            ? 'bg-emerald-100 text-emerald-800'
            : 'bg-slate-100 text-slate-500'}"
        aria-current={i === step ? 'step' : undefined}
      >
        {`${i + 1}. ${name}`}
      </li>
    {/each}
  </ol>

  <div class="{card} p-2">
    <svg
      viewBox="0 0 {W} {H}"
      class="mx-auto block w-full max-w-md select-none"
      role="img"
      aria-label={`Hình vẽ bài toán ${problem.label}. ${step >= 1 ? 'Đã vẽ các lực.' : 'Chưa vẽ lực.'} ${ran ? `Vật đã đi ${formatNumber(now.s, 2)} mét.` : ''}`}
    >
      <line
        x1={START.x - 90 * Math.cos(axisRad)}
        y1={START.y + 18 + 90 * Math.sin(axisRad)}
        x2={START.x + 270 * Math.cos(axisRad)}
        y2={START.y + 18 - 270 * Math.sin(axisRad)}
        stroke="#475569"
        stroke-width="3"
      />
      <rect
        x={body.x - 20}
        y={body.y - 16}
        width="40"
        height="32"
        rx="4"
        fill="#fde68a"
        stroke="#b45309"
        transform="rotate({-problem.axis} {body.x} {body.y})"
      />
      {#if step >= 2}
        <ForceArrow
          x1={body.x}
          y1={body.y}
          x2={tipOf(problem.axis, 110).x}
          y2={tipOf(problem.axis, 110).y}
          color="#94a3b8"
          label="x"
          dashed
        />
        <ForceArrow
          x1={body.x}
          y1={body.y}
          x2={tipOf(problem.axis + 90, 80).x}
          y2={tipOf(problem.axis + 90, 80).y}
          color="#94a3b8"
          label="y"
          dashed
        />
      {/if}
      {#if step >= 1}
        {#each problem.forces as force (force.name)}
          {@const tip = tipOf(force.angle, force.size * problem.scale)}
          <ForceArrow
            x1={body.x}
            y1={body.y}
            x2={tip.x}
            y2={tip.y}
            color={force.name === 'P' ? '#0f172a' : force.name === 'Fms' ? '#dc2626' : '#4f46e5'}
            label={force.name}
          />
        {/each}
      {/if}
      <circle cx={body.x} cy={body.y} r="3.5" fill="#0f172a" />
    </svg>
  </div>

  {#if step === 0}
    <fieldset class="space-y-2">
      <legend class="mb-1 text-sm font-semibold text-slate-700">Lực nào tác dụng lên vật?</legend>
      {#each options as option (option)}
        <button
          type="button"
          class="{picked.includes(option)
            ? button.secondary
            : button.quiet} w-full justify-start text-left"
          aria-pressed={picked.includes(option)}
          onclick={() => toggle(option)}
        >
          <LiveRichText text={option} />
        </button>
      {/each}
      <button type="button" class={button.primary} onclick={checkPicked}>Kiểm tra</button>
    </fieldset>
  {:else if step === 1}
    <div class="space-y-2">
      {#each problem.axes as axis (axis.text)}
        <button
          type="button"
          class="{button.quiet} w-full justify-start text-left"
          onclick={() => pickAxis(axis)}
        >
          <LiveRichText text={axis.text} />
        </button>
      {/each}
    </div>
  {:else if step === 2}
    <div class="space-y-2">
      {#each problem.equations as equation (equation.tex)}
        <button
          type="button"
          class="{button.quiet} w-full justify-start text-left"
          onclick={() => pickEquation(equation)}
        >
          <LiveRichText text={equation.tex} />
        </button>
      {/each}
    </div>
  {:else if step === 3}
    <form
      class="flex flex-wrap items-end gap-2"
      onsubmit={(event) => {
        event.preventDefault();
        checkAnswer();
      }}
    >
      <label class="min-w-40 flex-1 text-sm font-semibold text-slate-700">
        <LiveRichText text={problem.ask} />
        <input class="mt-1 {textInput}" inputmode="text" autocomplete="off" bind:value={typed} />
      </label>
      <button type="submit" class={button.primary}>Kiểm tra</button>
    </form>
  {:else}
    <div class="flex flex-wrap gap-2">
      <button type="button" class={button.primary} onclick={run}>Chạy mô phỏng</button>
      <button type="button" class={button.quiet} onclick={reset}>Giải lại</button>
    </div>
  {/if}

  <FeedbackNote tone={message.tone} text={message.text} />
</div>
