<script>
  import { rng } from '#lib/core/drill.js';
  import { readNumber } from '#lib/core/decimal.js';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { formatNumber, numTex } from '#lib/core/number-format.js';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { button, card, textInput } from '#lib/core/ui.js';
  import OscGraph from '../_shared/osc-graph.svelte';
  import { equationTex, stateAt } from '../_shared/oscillation.js';
  import { PHASES, PHASE_OPTIONS, check, extremesOf, makeProblem, startHint } from './engine.js';

  let seed = $state(1);
  let typedA = $state('');
  let typedT = $state('');
  let phase = $state(-1);
  /** @type {{ tone: 'ok' | 'warn' | 'info', text: string }} */
  let message = $state({
    tone: 'info',
    text: 'Đọc biên độ $A$, chu kì $T$ và pha ban đầu $\\varphi$ trên đồ thị, rồi bấm Kiểm tra.',
  });
  let solved = $state(false);
  let solvedCount = $state(0);

  const problem = $derived(makeProblem(rng(seed * 7919)));
  const phi = $derived(PHASES[problem.phase]);
  const omega = $derived(extremesOf(problem).omega);
  const uid = $props.id();
  const ids = { A: `${uid}-a`, T: `${uid}-t` };

  function next() {
    seed += 1;
    typedA = '';
    typedT = '';
    phase = -1;
    solved = false;
    message = {
      tone: 'info',
      text: 'Đồ thị mới. Đọc $A$, $T$ và $\\varphi$ rồi bấm Kiểm tra.',
    };
  }

  function submit() {
    const given = {
      A: readNumber(typedA),
      T: readNumber(typedT),
      phase: phase >= 0 ? phase : null,
    };
    if (given.A === null || given.T === null || given.phase === null) {
      message = {
        tone: 'warn',
        text: 'Hãy nhập đủ $A$ (cm), $T$ (s) dưới dạng số, ví dụ $0{,}8$, và chọn một giá trị của $\\varphi$.',
      };
      return;
    }
    const r = check(problem, given);
    if (r.A && r.T && r.phase) {
      const d = extremesOf(problem);
      if (!solved) solvedCount += 1;
      solved = true;
      message = {
        tone: 'ok',
        text: `Đúng! Phương trình: $${equationTex(problem.A, omega, phi)}$ (cm). Từ đó $v_{max} = \\omega A \\approx ${numTex(d.vMax, 1)}$ cm/s, $a_{max} = \\omega^2 A \\approx ${numTex(d.aMax, 0)}$ cm/s².`,
      };
      return;
    }
    const tips = [];
    if (!r.A) tips.push('$A$ là tung độ của đỉnh cao nhất');
    if (!r.T)
      tips.push(
        '$T$ là khoảng thời gian giữa hai đỉnh liên tiếp (hoặc hai lần liên tiếp đồ thị cắt trục cùng chiều)',
      );
    if (!r.phase) {
      const h = startHint(problem);
      tips.push(
        `lúc $t = 0$ đồ thị ở $x_0 = ${numTex(h.x0, 1)}$ cm và ${h.way}; giải $\\cos\\varphi = \\dfrac{x_0}{A}$, chọn $\\varphi < 0$ nếu vật đi theo chiều dương, $\\varphi > 0$ nếu đi theo chiều âm`,
      );
    }
    message = { tone: 'warn', text: `Chưa đúng: ${tips.join('; ')}.` };
  }
</script>

<div class="space-y-4">
  <div class="{card} p-2">
    <OscGraph
      curves={[{ f: (s) => stateAt(problem.A, omega, phi, s).x, color: '#4f46e5' }]}
      tMax={2 * problem.T}
      yMax={1.25 * problem.A}
      tStep={problem.T / 4}
      yStep={problem.A / 2}
      yLabel="x (cm)"
      height={190}
      label={`Đồ thị li độ theo thời gian số ${seed}. Lúc t bằng 0, li độ là ${formatNumber(startHint(problem).x0, 1)} xentimét và vật ${startHint(problem).way}.`}
    />
  </div>

  <div class="grid gap-3 sm:grid-cols-2">
    <div>
      <label for={ids.A} class="mb-1 block text-sm font-semibold text-slate-700"
        >Biên độ A (cm)</label
      >
      <input
        id={ids.A}
        class={textInput}
        inputmode="decimal"
        autocomplete="off"
        bind:value={typedA}
      />
    </div>
    <div>
      <label for={ids.T} class="mb-1 block text-sm font-semibold text-slate-700">Chu kì T (s)</label
      >
      <input
        id={ids.T}
        class={textInput}
        inputmode="decimal"
        autocomplete="off"
        bind:value={typedT}
      />
    </div>
  </div>
  <SegmentedControl label="Pha ban đầu φ (rad)" options={PHASE_OPTIONS} bind:value={phase} />

  <div class="flex flex-wrap gap-3">
    <button type="button" class={button.primary} onclick={submit}>Kiểm tra</button>
    <button type="button" class={button.secondary} onclick={next}>Đồ thị khác</button>
  </div>

  <FeedbackNote tone={message.tone} text={message.text} />
  <p class="text-sm text-slate-600">
    Đã đọc đúng {solvedCount} đồ thị.{solved
      ? ` Pha ban đầu φ = ${PHASE_OPTIONS[problem.phase].label} rad.`
      : ''}
  </p>
</div>
