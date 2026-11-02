<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { frameLoop, reducedMotion } from '#lib/core/motion.js';
  import { formatFixed, formatNumber, numTex } from '#lib/core/number-format.js';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import { button, card } from '#lib/core/ui.js';
  import { clamp, linear } from '#lib/core/visuals/svg-math.js';
  import ForceArrow from '#lib/domain/force-arrow.svelte';
  import AirCart from '../_shared/air-cart.svelte';
  import { collide, kineticSum, momentum } from '../_shared/collision.js';
  import { CART, TRACK, endTime, meetTime, stateAt } from './engine.js';

  const W = 360;
  const H = 110;
  const RAIL = 84;
  const BLUE = '#4f46e5';
  const TEAL = '#0f766e';
  const ROSE = '#be123c';
  const KINDS = [
    { value: 'dan-hoi', label: 'Đàn hồi' },
    { value: 'mem', label: 'Mềm (dính vào nhau)' },
  ];

  const P_W = 360;
  const P_H = 148;
  const P_X = 180;
  /** Pixels per kg.m/s on the momentum board. */
  const P_SCALE = 110;
  /** Pixels per m/s on the velocity arrows. */
  const V_SCALE = 60;
  /** Room kept for the arrow tip and its name at each side of the board. */
  const V_EDGE = 26;

  const px = linear(0, TRACK, 12, W - 12);

  let kind = $state('dan-hoi');
  let m1 = $state(1);
  let m2 = $state(1);
  let v1 = $state(0.6);
  let v2 = $state(0);
  let t = $state(0);
  let running = $state(false);

  const collisionKind = $derived(
    kind === 'mem' ? /** @type {const} */ ('mem') : /** @type {const} */ ('dan-hoi'),
  );
  const setup = $derived({ kind: collisionKind, m1, v1, m2, v2 });
  const meet = $derived(meetTime(setup));
  const end = $derived(endTime(setup));
  const now = $derived(stateAt(setup, t));
  const after = $derived(collide(collisionKind, m1, v1, m2, v2));
  const finished = $derived(t > 0 && t >= end);
  const pBefore = $derived({ a: momentum(m1, v1), b: momentum(m2, v2) });
  const pAfter = $derived({ a: momentum(m1, after.v1), b: momentum(m2, after.v2) });
  const totalBefore = $derived(pBefore.a + pBefore.b);
  const totalAfter = $derived(pAfter.a + pAfter.b);
  const wBefore = $derived(kineticSum(m1, v1, m2, v2));
  const wAfter = $derived(kineticSum(m1, after.v1, m2, after.v2));

  /**
   * A velocity arrow above a cart, moved along so its tip stays on the board when
   * the cart nears an end of the track.
   * @param {number} x centre of the cart, in pixels @param {number} v m/s
   */
  function velocityArrow(x, v) {
    const length = v * V_SCALE;
    const tip = clamp(x + length, V_EDGE, W - V_EDGE);
    return { x1: tip - length, x2: tip };
  }

  function changed() {
    running = false;
    t = 0;
  }

  function run() {
    if (meet === null) return;
    if (finished) t = 0;
    if (reducedMotion()) {
      t = end;
      return;
    }
    running = true;
  }

  $effect(() => {
    if (!running) return;
    const stop = frameLoop((dt) => {
      const next = Math.min(end, t + dt);
      t = next;
      if (next >= end) {
        running = false;
        stop();
      }
    });
    return stop;
  });

  const note = $derived.by(() => {
    if (meet === null) {
      return {
        tone: /** @type {const} */ ('warn'),
        text: 'Với các vận tốc này, hai xe không gặp nhau trên đệm khí. Hãy tăng vận tốc xe 1 hoặc giảm vận tốc xe 2.',
      };
    }
    if (!now.collided) {
      return {
        tone: /** @type {const} */ ('info'),
        text: `Chọn chiều dương sang phải. Trước va chạm, tổng động lượng là $p = m_1v_1 + m_2v_2 = ${numTex(totalBefore, 3)}$ kg.m/s. Hãy dự đoán các xe chuyển động thế nào sau va chạm.`,
      };
    }
    const sums = `Sau va chạm, $p' = m_1v_1' + m_2v_2' = ${numTex(totalAfter, 3)}$ kg.m/s, đúng bằng trước va chạm.`;
    if (collisionKind === 'mem') {
      const lost = wBefore > 0 ? ((wBefore - wAfter) / wBefore) * 100 : 0;
      return {
        tone: /** @type {const} */ ('ok'),
        text: `${sums} Động năng giảm từ $${numTex(wBefore, 3)}$ J xuống $${numTex(wAfter, 3)}$ J (mất khoảng $${numTex(lost, 0)}\\%$), phần mất đi chuyển thành dạng năng lượng khác.`,
      };
    }
    const handover = m1 === m2 && v2 === 0;
    return {
      tone: /** @type {const} */ ('ok'),
      text: `${sums} Động năng cũng giữ nguyên $${numTex(wBefore, 3)}$ J.${handover ? ' Hai xe bằng nhau nên xe 1 dừng lại, truyền toàn bộ chuyển động cho xe 2.' : ''}`,
    };
  });
</script>

<div class="space-y-4">
  <div class="{card} p-2">
    <svg
      viewBox="0 0 {W} {H}"
      class="mx-auto block w-full max-w-md select-none"
      role="img"
      aria-label={`Đệm khí với hai xe. Xe 1 có vận tốc ${formatNumber(now.v1, 2)}, xe 2 có vận tốc ${formatNumber(now.v2, 2)} mét trên giây.`}
    >
      <rect x="4" y={RAIL} width={W - 8} height="8" rx="2" fill="#94a3b8" />
      {#each Array.from({ length: 34 }, (_, i) => i) as i (i)}
        <circle cx={14 + i * 10} cy={RAIL + 4} r="1" fill="#f1f5f9" />
      {/each}
      <AirCart x={px.map(now.x1)} y={RAIL} width={px.map(CART) - px.map(0)} name="1" color={BLUE} />
      <AirCart x={px.map(now.x2)} y={RAIL} width={px.map(CART) - px.map(0)} name="2" color={TEAL} />
      <ForceArrow
        {...velocityArrow(px.map(now.x1), now.v1)}
        y1={RAIL - 32}
        y2={RAIL - 32}
        color={BLUE}
        label="v₁"
        labelDy={-6}
      />
      <ForceArrow
        {...velocityArrow(px.map(now.x2), now.v2)}
        y1={RAIL - 32}
        y2={RAIL - 32}
        color={TEAL}
        label="v₂"
        labelDy={-6}
      />
      <text x={W - 6} y="16" font-size="11" fill="#475569" text-anchor="end">Chiều dương →</text>
    </svg>
  </div>

  <SegmentedControl label="Loại va chạm" options={KINDS} bind:value={kind} onchange={changed} />
  <div class="grid gap-3 sm:grid-cols-2">
    <SliderField
      label="Khối lượng xe 1"
      bind:value={m1}
      min={0.2}
      max={1}
      step={0.1}
      unit="kg"
      format={(v) => formatFixed(v, 1)}
      oninput={changed}
    />
    <SliderField
      label="Khối lượng xe 2"
      bind:value={m2}
      min={0.2}
      max={1}
      step={0.1}
      unit="kg"
      format={(v) => formatFixed(v, 1)}
      oninput={changed}
    />
    <SliderField
      label="Vận tốc xe 1"
      bind:value={v1}
      min={0}
      max={1}
      step={0.1}
      unit="m/s"
      format={(v) => formatFixed(v, 1)}
      oninput={changed}
    />
    <SliderField
      label="Vận tốc xe 2"
      bind:value={v2}
      min={-1}
      max={0.5}
      step={0.1}
      unit="m/s"
      format={(v) => formatFixed(v, 1)}
      oninput={changed}
    />
  </div>
  <div class="flex flex-wrap gap-3">
    <button type="button" class={button.primary} onclick={run} disabled={meet === null || running}>
      {finished ? 'Chạy lại' : 'Cho hai xe chạy'}
    </button>
    <button type="button" class={button.quiet} onclick={changed}>Về vị trí đầu</button>
  </div>

  <div class="{card} p-2">
    <svg
      viewBox="0 0 {P_W} {P_H}"
      class="mx-auto block w-full max-w-md select-none"
      role="img"
      aria-label={`Vectơ động lượng. Trước va chạm: xe 1 ${formatNumber(pBefore.a, 2)}, xe 2 ${formatNumber(pBefore.b, 2)}, tổng ${formatNumber(totalBefore, 2)}.${now.collided ? ` Sau va chạm: xe 1 ${formatNumber(pAfter.a, 2)}, xe 2 ${formatNumber(pAfter.b, 2)}, tổng ${formatNumber(totalAfter, 2)}.` : ''}`}
    >
      <line x1={P_X} x2={P_X} y1="4" y2={P_H - 4} stroke="#cbd5e1" stroke-dasharray="4 3" />
      <text x="4" y="14" font-size="12" font-weight="600" fill="#334155">Trước va chạm</text>
      <ForceArrow x1={P_X} y1={26} x2={P_X + pBefore.a * P_SCALE} y2={26} color={BLUE} label="p₁" />
      <ForceArrow
        x1={P_X + pBefore.a * P_SCALE}
        y1={26}
        x2={P_X + (pBefore.a + pBefore.b) * P_SCALE}
        y2={26}
        color={TEAL}
        label="p₂"
        labelDy={16}
      />
      <ForceArrow
        x1={P_X}
        y1={50}
        x2={P_X + totalBefore * P_SCALE}
        y2={50}
        color={ROSE}
        label="p"
        labelDy={4}
      />
      <text x="4" y="84" font-size="12" font-weight="600" fill="#334155">Sau va chạm</text>
      {#if now.collided}
        <ForceArrow
          x1={P_X}
          y1={96}
          x2={P_X + pAfter.a * P_SCALE}
          y2={96}
          color={BLUE}
          label="p₁'"
        />
        <ForceArrow
          x1={P_X + pAfter.a * P_SCALE}
          y1={96}
          x2={P_X + (pAfter.a + pAfter.b) * P_SCALE}
          y2={96}
          color={TEAL}
          label="p₂'"
          labelDy={16}
        />
        <ForceArrow
          x1={P_X}
          y1={126}
          x2={P_X + totalAfter * P_SCALE}
          y2={126}
          color={ROSE}
          label="p'"
          labelDy={4}
        />
      {:else}
        <text x={P_X} y="112" font-size="12" fill="#64748b" text-anchor="middle">Chưa va chạm</text>
      {/if}
    </svg>
  </div>

  <div class="overflow-x-auto" aria-live="polite">
    <table class="w-full text-center text-sm tabular-nums">
      <caption class="mb-1 text-left font-semibold text-slate-700"
        >Động lượng (kg.m/s) và động năng (J)</caption
      >
      <thead>
        <tr class="bg-slate-100">
          <th scope="col" class="px-2 py-1">Thời điểm</th>
          <th scope="col" class="px-2 py-1">Xe 1</th>
          <th scope="col" class="px-2 py-1">Xe 2</th>
          <th scope="col" class="px-2 py-1">Tổng p</th>
          <th scope="col" class="px-2 py-1">Tổng Wđ</th>
        </tr>
      </thead>
      <tbody>
        <tr class="border-b border-slate-200">
          <th scope="row" class="px-2 py-1 font-semibold">Trước</th>
          <td class="px-2 py-1">{formatFixed(pBefore.a, 2)}</td>
          <td class="px-2 py-1">{formatFixed(pBefore.b, 2)}</td>
          <td class="px-2 py-1">{formatFixed(totalBefore, 2)}</td>
          <td class="px-2 py-1">{formatFixed(wBefore, 3)}</td>
        </tr>
        <tr class="border-b border-slate-200">
          <th scope="row" class="px-2 py-1 font-semibold">Sau</th>
          {#if now.collided}
            <td class="px-2 py-1">{formatFixed(pAfter.a, 2)}</td>
            <td class="px-2 py-1">{formatFixed(pAfter.b, 2)}</td>
            <td class="px-2 py-1">{formatFixed(totalAfter, 2)}</td>
            <td class="px-2 py-1">{formatFixed(wAfter, 3)}</td>
          {:else}
            <td class="px-2 py-1" colspan="4">chưa va chạm</td>
          {/if}
        </tr>
      </tbody>
    </table>
  </div>

  <FeedbackNote tone={note.tone} text={note.text} />
</div>
