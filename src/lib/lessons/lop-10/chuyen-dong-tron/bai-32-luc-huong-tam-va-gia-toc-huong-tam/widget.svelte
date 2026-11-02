<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { frameLoop, reducedMotion } from '#lib/core/motion.js';
  import { formatFixed, formatNumber, numTex } from '#lib/core/number-format.js';
  import SliderField from '#lib/core/slider-field.svelte';
  import { button, card } from '#lib/core/ui.js';
  import ForceArrow from '#lib/domain/force-arrow.svelte';
  import { TAU, pointAt, tangentAt, toRad } from '../_shared/circular.js';
  import {
    HIT_RADIUS,
    TARGETS,
    centripetal,
    centripetalForce,
    cutPoint,
    flight,
  } from './engine.js';

  const W = 360;
  const H = 320;
  const CX = 180;
  const CY = 160;
  /** Pixels per metre. */
  const S = 75;
  /** Pixels per m/s and per newton for the arrows. */
  const V_ARROW = 12;
  const F_ARROW = 5;
  const STONE_R = 8;
  const NUDGE = toRad(5);

  let mass = $state(0.5);
  let radius = $state(1);
  let speed = $state(3);
  let theta = $state(0);
  let running = $state(false);
  let phase = $state(/** @type {'spin' | 'fly' | 'done'} */ ('spin'));
  let flown = $state(0);
  let cutAt = $state(0);
  let targetAt = $state(0);
  let hits = $state(0);

  const omega = $derived(speed / radius);
  const acc = $derived(centripetal(speed, radius));
  const force = $derived(centripetalForce(mass, speed, radius));
  const target = $derived(TARGETS[targetAt]);
  const shot = $derived(flight(cutAt, radius, speed, target));

  const spinPoint = $derived(pointAt(CX, CY, radius * S, theta));
  const dir = $derived(tangentAt(phase === 'spin' ? theta : cutAt));
  const start = $derived(cutPoint(cutAt, radius));
  const flyPoint = $derived({
    x: CX + (start.x + start.dx * speed * flown) * S,
    y: CY - (start.y + start.dy * speed * flown) * S,
  });
  const stone = $derived(phase === 'spin' ? spinPoint : flyPoint);
  const inward = $derived({ x: CX - stone.x, y: CY - stone.y });
  const inwardLength = $derived(Math.hypot(inward.x, inward.y));

  function spin() {
    if (phase !== 'spin') return;
    if (reducedMotion()) {
      nudge(3);
      return;
    }
    running = !running;
  }

  /** @param {number} steps */
  function nudge(steps) {
    theta = (theta + steps * NUDGE) % TAU;
  }

  function finish() {
    phase = 'done';
    if (shot.hit) hits += 1;
  }

  function cut() {
    if (phase !== 'spin') return;
    running = false;
    cutAt = theta;
    flown = 0;
    if (reducedMotion()) {
      flown = shot.time;
      finish();
      return;
    }
    phase = 'fly';
  }

  function retie() {
    phase = 'spin';
    flown = 0;
  }

  function nextTarget() {
    targetAt = (targetAt + 1) % TARGETS.length;
    retie();
  }

  $effect(() => {
    if (!running) return;
    return frameLoop((dt) => {
      theta = (theta + omega * dt) % TAU;
    });
  });

  $effect(() => {
    if (phase !== 'fly') return;
    const stop = frameLoop((dt) => {
      flown = Math.min(flown + dt, shot.time);
      if (flown >= shot.time) {
        stop();
        finish();
      }
    });
    return stop;
  });

  const note = $derived.by(() => {
    if (phase === 'spin') {
      return {
        tone: /** @type {const} */ ('info'),
        text: `Lực căng dây là lực hướng tâm: $F_{ht} = m\\dfrac{v^2}{r} = ${numTex(mass, 1)} \\cdot \\dfrac{${numTex(speed, 1)}^2}{${numTex(radius, 1)}} = ${numTex(force, 2)}$ N, gây ra gia tốc $a_{ht} = ${numTex(acc, 2)}$ m/s². Tốc độ góc $\\omega = ${numTex(omega, 2)}$ rad/s. Canh lúc mũi tên $\\vec{v}$ chỉ vào bia rồi cắt dây.`,
      };
    }
    if (phase === 'fly') {
      return { tone: /** @type {const} */ ('info'), text: 'Dây đã đứt, viên đá đang bay.' };
    }
    return shot.hit
      ? {
          tone: /** @type {const} */ ('ok'),
          text: `Trúng bia! Khi dây đứt, không còn lực hướng tâm, viên đá giữ nguyên vận tốc lúc đó và bay thẳng theo tiếp tuyến với tốc độ $${numTex(speed, 1)}$ m/s.`,
        }
      : {
          tone: /** @type {const} */ ('warn'),
          text: 'Trượt bia. Viên đá không bay ra xa tâm theo sợi dây mà bay thẳng theo tiếp tuyến tại điểm cắt, đúng hướng mũi tên vận tốc lúc đó. Buộc lại dây rồi cắt sớm hoặc muộn hơn.',
        };
  });
</script>

<div class="space-y-4">
  <div class="{card} p-2">
    <svg
      viewBox="0 0 {W} {H}"
      class="mx-auto block w-full max-w-md select-none"
      role="img"
      aria-label={phase === 'spin'
        ? `Nhìn từ trên xuống: viên đá quay tròn quanh tay, dây dài ${formatNumber(radius, 1)} mét. Lực căng dây hướng vào tâm, vận tốc theo tiếp tuyến.`
        : 'Nhìn từ trên xuống: dây đã đứt, viên đá bay thẳng theo tiếp tuyến tại điểm cắt.'}
    >
      <circle
        cx={CX}
        cy={CY}
        r={radius * S}
        fill="none"
        stroke="#94a3b8"
        stroke-dasharray="5 4"
        stroke-width="1.5"
      />
      <circle
        cx={CX + target.x * S}
        cy={CY - target.y * S}
        r={HIT_RADIUS * S}
        fill="#fee2e2"
        stroke="#be123c"
        stroke-width="2"
      />
      <circle
        cx={CX + target.x * S}
        cy={CY - target.y * S}
        r={HIT_RADIUS * S * 0.5}
        fill="#fecaca"
        stroke="#be123c"
      />
      {#if phase === 'spin'}
        <line x1={CX} y1={CY} x2={stone.x} y2={stone.y} stroke="#64748b" stroke-width="2" />
      {:else}
        <line
          x1={CX + start.x * S}
          y1={CY - start.y * S}
          x2={stone.x}
          y2={stone.y}
          stroke="#0f766e"
          stroke-width="2"
          stroke-dasharray="6 4"
        />
      {/if}
      <circle cx={CX} cy={CY} r="5" fill="#334155" />
      {#if phase === 'spin'}
        <ForceArrow
          x1={stone.x}
          y1={stone.y}
          x2={stone.x + (inward.x / inwardLength) * force * F_ARROW}
          y2={stone.y + (inward.y / inwardLength) * force * F_ARROW}
          color="#be123c"
          label="Fht"
        />
      {/if}
      {#if phase !== 'done'}
        <ForceArrow
          x1={stone.x}
          y1={stone.y}
          x2={stone.x + dir.x * speed * V_ARROW}
          y2={stone.y + dir.y * speed * V_ARROW}
          color="#4f46e5"
          label="v"
        />
      {/if}
      <circle
        cx={stone.x}
        cy={stone.y}
        r={STONE_R}
        fill="#475569"
        stroke="#fff"
        stroke-width="1.5"
      />
    </svg>
    <p class="px-2 pb-1 text-sm text-slate-600">
      Nhìn từ trên xuống, bỏ qua trọng lực và lực cản của không khí. Số lần trúng bia: {hits}.
    </p>
  </div>

  <div class="flex flex-wrap gap-3">
    {#if phase === 'spin'}
      <button type="button" class={button.primary} onclick={cut}>Cắt dây</button>
      <button type="button" class={button.secondary} onclick={spin}>
        {running ? 'Dừng lại để canh' : 'Quay'}
      </button>
      <button type="button" class={button.quiet} onclick={() => nudge(1)} disabled={running}>
        Nhích thêm 5°
      </button>
    {:else}
      <button type="button" class={button.primary} onclick={retie} disabled={phase === 'fly'}>
        Buộc lại dây
      </button>
      <button type="button" class={button.quiet} onclick={nextTarget} disabled={phase === 'fly'}>
        Đổi bia
      </button>
    {/if}
  </div>

  <div class="grid gap-3 sm:grid-cols-3">
    <SliderField
      label="Khối lượng m"
      bind:value={mass}
      min={0.2}
      max={0.5}
      step={0.1}
      unit="kg"
      format={(v) => formatFixed(v, 1)}
      oninput={retie}
    />
    <SliderField
      label="Chiều dài dây r"
      bind:value={radius}
      min={0.8}
      max={1.4}
      step={0.1}
      unit="m"
      format={(v) => formatFixed(v, 1)}
      oninput={retie}
    />
    <SliderField
      label="Tốc độ v"
      bind:value={speed}
      min={2}
      max={4}
      step={0.5}
      unit="m/s"
      format={(v) => formatFixed(v, 1)}
      oninput={retie}
    />
  </div>

  <FeedbackNote tone={note.tone} text={note.text} />
</div>
