<script>
  import { draggable } from '#lib/actions/draggable.svelte.js';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { frameLoop, reducedMotion } from '#lib/core/motion.js';
  import { formatNumber } from '#lib/core/number-format.js';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import { button, card } from '#lib/core/ui.js';
  import { arrowHead, shaftEnd } from '#lib/domain/arrow.js';
  import { DOOR_CM, OPEN_MOMENT, doorPush, leastForce, openTime, swingSpeed } from './engine.js';

  // Top view: hinge O, door leaf DOOR_CM long, PX pixels per cm.
  const VW = 360;
  const VH = 390;
  const OX = 70;
  const OY = 255;
  const PX = 3;
  const STEP_CM = 5;
  const ARROW_PX = 4; // pixels per newton

  let force = $state(10);
  let angle = $state(90);
  let r = $state(70);
  let dir = $state('ngang');
  let beta = $state(0);
  let running = $state(false);
  let opened = $state(false);

  const push = $derived(doorPush({ force, r, angle, vertical: dir === 'doc' }));
  const least = $derived(leastForce(r, angle));

  const rad = (/** @type {number} */ deg) => (deg * Math.PI) / 180;
  // Door direction u and the side it opens towards, n (screen y points down).
  const u = $derived({ x: Math.cos(rad(beta)), y: -Math.sin(rad(beta)) });
  const n = $derived({ x: -Math.sin(rad(beta)), y: -Math.cos(rad(beta)) });
  const tip = $derived({ x: OX + u.x * DOOR_CM * PX, y: OY + u.y * DOOR_CM * PX });
  const P = $derived({ x: OX + u.x * r * PX, y: OY + u.y * r * PX });
  const f = $derived({
    x: Math.cos(rad(angle)) * u.x + Math.sin(rad(angle)) * n.x,
    y: Math.cos(rad(angle)) * u.y + Math.sin(rad(angle)) * n.y,
  });
  const fEnd = $derived({ x: P.x + f.x * force * ARROW_PX, y: P.y + f.y * force * ARROW_PX });
  const shaft = $derived(shaftEnd(P.x, P.y, fEnd.x, fEnd.y));
  // Foot of the perpendicular from O to the line of action.
  const foot = $derived.by(() => {
    const t = (OX - P.x) * f.x + (OY - P.y) * f.y;
    return { x: P.x + f.x * t, y: P.y + f.y * t };
  });
  const showLine = $derived(dir === 'ngang' && force > 0);
  const showArm = $derived(showLine && push.arm > 0);
  // Small right-angle mark at the foot.
  const mark = $derived.by(() => {
    const len = Math.hypot(OX - foot.x, OY - foot.y) || 1;
    const a = { x: ((OX - foot.x) / len) * 8, y: ((OY - foot.y) / len) * 8 };
    const b = { x: f.x * 8, y: f.y * 8 };
    return `M${foot.x + a.x} ${foot.y + a.y} L${foot.x + a.x + b.x} ${foot.y + a.y + b.y} L${foot.x + b.x} ${foot.y + b.y}`;
  });

  /** @type {SVGSVGElement | undefined} */
  let svgEl = $state();
  const scratch = { x: 0, y: 0 };

  function stop() {
    running = false;
    opened = false;
    beta = 0;
  }

  /** @param {number} cm */
  function moveTo(cm) {
    const next = Math.max(0, Math.min(DOOR_CM, Math.round(cm / STEP_CM) * STEP_CM));
    if (next !== r) {
      r = next;
      stop();
    }
  }

  const drag = $derived({
    point: scratch,
    svg: () => svgEl ?? null,
    viewBox: { w: VW, h: VH },
    pad: 0,
    onChange: () => moveTo(((scratch.x - OX) * u.x + (scratch.y - OY) * u.y) / PX),
    /** @param {number} dx @param {number} dy @param {boolean} big */
    onKeyMove: (dx, dy, big) => {
      const sign = dx !== 0 ? dx : -dy;
      moveTo(r + sign * STEP_CM * (big ? 2 : 1));
    },
  });

  $effect(() => {
    if (!running) return;
    const speed = swingSpeed(push.moment);
    if (speed === 0 || reducedMotion()) {
      beta = speed === 0 ? 0 : 90;
      running = false;
      opened = speed > 0;
      return;
    }
    return frameLoop((dt) => {
      const next = beta + speed * dt;
      if (next >= 90) {
        beta = 90;
        running = false;
        opened = true;
      } else {
        beta = next;
      }
    });
  });

  function pushDoor() {
    beta = 0;
    opened = false;
    running = push.opens;
  }

  const num = (/** @type {number} */ v, d = 2) => formatNumber(v, d);
  const Nm = (/** @type {number} */ v) => `${num(v)} N·m`;

  const feedback = $derived.by(() => {
    if (push.reason === 'doc')
      return {
        tone: /** @type {const} */ ('warn'),
        text: 'Lực thẳng đứng có giá song song với trục quay (trục bản lề): cửa không quay, dù lực lớn đến đâu.',
      };
    if (push.reason === 'khong-luc')
      return {
        tone: /** @type {const} */ ('info'),
        text: 'Chưa có lực: kéo thanh trượt để tăng F.',
      };
    if (push.reason === 'qua-truc')
      return {
        tone: /** @type {const} */ ('warn'),
        text: `Giá của lực đi qua trục quay O nên cánh tay đòn d = 0 và moment M = 0: cửa không quay${r === 0 ? ' (lực đặt ngay tại bản lề)' : ''}.`,
      };
    const base = `M = F · d = ${num(force)} N × ${num(push.arm / 100)} m = ${Nm(push.moment)}.`;
    if (push.reason === 'yeu')
      return {
        tone: /** @type {const} */ ('warn'),
        text: `${base} Chưa đủ ${Nm(OPEN_MOMENT)} để thắng lò xo đóng cửa: cửa chưa quay. Hãy tăng F hoặc tăng cánh tay đòn d (đặt lực xa bản lề, đẩy vuông góc với cánh cửa).`,
      };
    const time = openTime(push.moment) ?? 0;
    const best =
      least !== null && force === least
        ? ` Với điểm đặt và hướng này, ${num(force)} N là lực nhỏ nhất mở được cửa.`
        : '';
    const record =
      force === 5 && r === DOOR_CM && angle === 90
        ? ' Đặt lực ở mép cửa, vuông góc với cánh cửa, cánh tay đòn lớn nhất nên lực cần nhỏ nhất!'
        : '';
    if (opened)
      return {
        tone: /** @type {const} */ ('ok'),
        text: `${base} Cửa mở hết trong khoảng ${num(time, 1)} s.${best}${record}`,
      };
    return {
      tone: /** @type {const} */ ('ok'),
      text: `${base} Đủ để cửa quay: bấm "Đẩy cửa" để xem (moment càng lớn, cửa quay càng nhanh).${best}${record}`,
    };
  });
</script>

<div class="space-y-4">
  <div class="grid gap-3 sm:grid-cols-2">
    <SliderField
      label="Độ lớn của lực F"
      bind:value={force}
      min={0}
      max={30}
      unit="N"
      oninput={stop}
    />
    <SliderField
      label="Góc giữa lực và cánh cửa"
      bind:value={angle}
      min={0}
      max={180}
      step={15}
      unit="°"
      oninput={stop}
    />
  </div>
  <SegmentedControl
    label="Phương của lực"
    options={[
      { value: 'ngang', label: 'Nằm ngang' },
      { value: 'doc', label: 'Thẳng đứng (song song với trục bản lề)' },
    ]}
    bind:value={dir}
    onchange={stop}
  />

  <div class="grid gap-4 sm:grid-cols-[3fr_2fr]">
    <figure class="{card} overflow-hidden p-2">
      <svg
        bind:this={svgEl}
        viewBox="0 0 {VW} {VH}"
        class="mx-auto block w-full max-w-md touch-none select-none"
        role="img"
        aria-label="Cánh cửa nhìn từ trên xuống, bản lề O ở bên trái. Lực đặt cách bản lề {r} xăng-ti-mét, cửa đang mở {Math.round(
          beta,
        )} độ."
      >
        <!-- wall and frame -->
        <rect x="0" y={OY} width={OX - 4} height="12" fill="#94a3b8" />
        <rect
          x={OX + DOOR_CM * PX + 6}
          y={OY}
          width={VW - OX - DOOR_CM * PX - 6}
          height="12"
          fill="#94a3b8"
        />
        <text x="6" y={OY + 30} class="fill-slate-500 text-[11px]">Tường</text>
        <!-- swing arc -->
        <path
          d="M{OX + DOOR_CM * PX} {OY} A {DOOR_CM * PX} {DOOR_CM * PX} 0 0 0 {OX} {OY -
            DOOR_CM * PX}"
          fill="none"
          stroke="#cbd5e1"
          stroke-dasharray="4 4"
        />
        <!-- line of action and lever arm -->
        {#if showLine}
          <line
            x1={P.x - f.x * 600}
            y1={P.y - f.y * 600}
            x2={P.x + f.x * 600}
            y2={P.y + f.y * 600}
            stroke="#f87171"
            stroke-dasharray="6 4"
          />
        {/if}
        <!-- door leaf -->
        <line
          x1={OX}
          y1={OY}
          x2={tip.x}
          y2={tip.y}
          stroke="#92400e"
          stroke-width="10"
          stroke-linecap="round"
        />
        <circle cx={OX} cy={OY} r="7" fill="#1e293b" />
        <text x={OX - 4} y={OY + 28} class="fill-slate-800 text-[13px] font-bold">O</text>
        {#if showArm}
          <line
            x1={OX}
            y1={OY}
            x2={foot.x}
            y2={foot.y}
            stroke="#16a34a"
            stroke-width="4"
            stroke-linecap="round"
          />
          <path d={mark} fill="none" stroke="#16a34a" stroke-width="1.5" />
          <text
            x={(OX + foot.x) / 2 - 12}
            y={(OY + foot.y) / 2 - 10}
            class="fill-green-700 text-[13px] font-bold">d</text
          >
        {/if}
        <!-- force -->
        {#if dir === 'ngang' && force > 0}
          <line x1={P.x} y1={P.y} x2={shaft.x} y2={shaft.y} stroke="#dc2626" stroke-width="4" />
          <polygon points={arrowHead(P.x, P.y, fEnd.x, fEnd.y, 12)} fill="#dc2626" />
          <text x={fEnd.x + 6} y={fEnd.y - 4} class="fill-red-700 text-[13px] font-bold">F</text>
        {:else if dir === 'doc' && force > 0}
          <circle cx={P.x} cy={P.y - 22} r="10" fill="#fff" stroke="#dc2626" stroke-width="2.5" />
          <circle cx={P.x} cy={P.y - 22} r="3" fill="#dc2626" />
          <text x={P.x + 14} y={P.y - 18} class="fill-red-700 text-[11px] font-semibold"
            >F hướng lên</text
          >
        {/if}
        <g
          class="drag-handle"
          role="slider"
          tabindex="0"
          aria-label="Điểm đặt lực trên cánh cửa: dùng phím mũi tên để dời"
          aria-valuemin={0}
          aria-valuemax={DOOR_CM}
          aria-valuenow={r}
          aria-valuetext="Cách bản lề {r} xăng-ti-mét"
          style="cursor:grab; outline:none"
          use:draggable={drag}
        >
          <circle
            class="drag-knob"
            cx={P.x}
            cy={P.y}
            r="8"
            fill="#fff"
            stroke="#2563eb"
            stroke-width="3"
          />
        </g>
      </svg>
      <figcaption class="px-2 text-center text-xs text-slate-600">
        Kéo chấm xanh dọc cánh cửa để đổi điểm đặt lực. Đường đỏ nét đứt là giá của lực, đoạn xanh
        lá là cánh tay đòn d.
      </figcaption>
    </figure>

    <div class="space-y-3">
      <dl class="grid gap-2 text-sm tabular-nums">
        <div class="flex justify-between gap-2 rounded-xl bg-slate-50 px-3 py-2">
          <dt class="text-slate-600">Điểm đặt cách bản lề</dt>
          <dd class="font-semibold">{r} cm</dd>
        </div>
        <div class="flex justify-between gap-2 rounded-xl bg-green-50 px-3 py-2">
          <dt class="text-green-800">Cánh tay đòn d</dt>
          <dd class="font-semibold">{num(push.arm, 1)} cm</dd>
        </div>
        <div class="flex justify-between gap-2 rounded-xl bg-indigo-50 px-3 py-2">
          <dt class="text-indigo-700">Moment lực M = F · d</dt>
          <dd class="font-semibold text-indigo-900">{Nm(push.moment)}</dd>
        </div>
        <div class="flex justify-between gap-2 rounded-xl bg-slate-50 px-3 py-2">
          <dt class="text-slate-600">Cửa cần tối thiểu</dt>
          <dd class="font-semibold">{Nm(OPEN_MOMENT)}</dd>
        </div>
      </dl>
      <div class="flex flex-wrap gap-2">
        <button type="button" class={button.primary} onclick={pushDoor} disabled={running}>
          Đẩy cửa
        </button>
        <button type="button" class={button.quiet} onclick={stop}>Đóng cửa</button>
      </div>
    </div>
  </div>

  <FeedbackNote tone={feedback.tone} text={feedback.text} />
</div>
