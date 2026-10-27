<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { frameLoop, reducedMotion } from '#lib/core/motion.js';
  import { button, card } from '#lib/core/ui.js';
  import { MATERIALS, circuitState, loopPoint, material } from './engine.js';

  const BOX = { left: 50, right: 310, top: 50, bottom: 214 };
  const W = BOX.right - BOX.left;
  const H = BOX.bottom - BOX.top;
  const TOTAL = 2 * (W + H);
  // Electrons are drawn on the wires outside the battery: the first three legs.
  const OUTSIDE = (2 * W + H) / TOTAL;
  const CLIP_L = 150;
  const CLIP_R = 210;
  const DOTS = 30;

  let source = $state(true);
  let closed = $state(true);
  /** @type {string | null} */
  let sample = $state(null);
  let phase = $state(0);
  /** @type {Record<string, boolean>} */
  let tested = $state({});

  const loop = $derived(circuitState({ source, closed, sample }));
  const current = $derived(sample === null ? undefined : material(sample));

  $effect(() => {
    if (source && closed && current) tested[current.id] = current.conducts;
  });

  $effect(() => {
    if (!loop.flowing || reducedMotion()) return;
    return frameLoop((dt) => {
      phase = (phase + dt * 0.05) % 1;
    });
  });

  // Free electrons: in the copper wires always, in the sample only when it
  // is a conductor. They drift only while current flows.
  const dots = $derived.by(() => {
    /** @type {Array<{ x: number, y: number }>} */
    const out = [];
    for (let i = 0; i < DOTS; i++) {
      const t = (i / DOTS + phase) % 1;
      if (t > OUTSIDE) continue;
      const p = loopPoint(t, BOX);
      const inGap = p.y === BOX.bottom && p.x > CLIP_L && p.x < CLIP_R;
      const atSwitch = p.x === BOX.right && Math.abs(p.y - 132) < 14;
      const atLamp = p.y === BOX.top && Math.abs(p.x - 180) < 16;
      if ((inGap && !current?.conducts) || (atSwitch && !closed) || atLamp) continue;
      out.push(p);
    }
    return out;
  });

  const tones = /** @type {const} */ ({ ok: 'ok', warn: 'warn', info: 'info' });

  const feedback = $derived.by(() => {
    switch (loop.reason) {
      case 'khong-nguon':
        return {
          tone: tones.warn,
          text: 'Không có nguồn điện: các electron tự do không dịch chuyển có hướng, đèn không sáng.',
        };
      case 'cong-tac-mo':
        return {
          tone: tones.warn,
          text: 'Công tắc mở: mạch bị hở nên không có dòng điện.',
        };
      case 'ho':
        return {
          tone: tones.info,
          text: 'Giữa hai kẹp đang để hở. Chọn một vật để kẹp vào và xem đèn có sáng không.',
        };
      case 'cach-dien':
        return {
          tone: tones.warn,
          text: `${current?.label}: đèn không sáng. Đây là vật cách điện (${current?.note}), không cho dòng điện chạy qua.`,
        };
      default:
        return {
          tone: tones.ok,
          text: `${current?.label}: đèn sáng. Đây là vật dẫn điện (${current?.note}). Các electron tự do dịch chuyển có hướng từ cực âm, qua dây dẫn, đèn, về cực dương của pin.`,
        };
    }
  });

  const conductors = $derived(MATERIALS.filter((m) => tested[m.id] === true));
  const insulators = $derived(MATERIALS.filter((m) => tested[m.id] === false));
</script>

<div class="space-y-4">
  <div>
    <p class="mb-1 text-sm font-semibold text-slate-700">Vật kẹp giữa hai kẹp</p>
    <div class="flex flex-wrap gap-2">
      {#each MATERIALS as m (m.id)}
        <button
          type="button"
          class="{sample === m.id ? button.primary : button.quiet} text-sm"
          aria-pressed={sample === m.id}
          onclick={() => (sample = m.id)}
        >
          {m.label}
        </button>
      {/each}
      <button
        type="button"
        class="{sample === null ? button.primary : button.quiet} text-sm"
        aria-pressed={sample === null}
        onclick={() => (sample = null)}
      >
        Để hở
      </button>
    </div>
  </div>

  <figure class="{card} overflow-hidden p-2">
    <svg
      viewBox="0 0 360 250"
      class="mx-auto block w-full max-w-md select-none"
      role="img"
      aria-label="Mạch điện gồm pin, bóng đèn, công tắc và hai kẹp. {loop.flowing
        ? 'Đèn sáng.'
        : 'Đèn tắt.'}"
    >
      <!-- wires -->
      <g stroke="#b45309" stroke-width="4" fill="none" stroke-linecap="round">
        <polyline
          points="{BOX.left},{BOX.top +
            50} {BOX.left},{BOX.top} {BOX.right},{BOX.top} {BOX.right},{BOX.bottom} {CLIP_R},{BOX.bottom}"
        />
        <polyline
          points="{CLIP_L},{BOX.bottom} {BOX.left},{BOX.bottom} {BOX.left},{BOX.bottom - 50}"
        />
      </g>

      <!-- sample between the clips -->
      <rect x={CLIP_L - 6} y={BOX.bottom - 7} width="8" height="14" fill="#475569" />
      <rect x={CLIP_R - 2} y={BOX.bottom - 7} width="8" height="14" fill="#475569" />
      {#if current}
        <rect
          x={CLIP_L}
          y={BOX.bottom - 5}
          width={CLIP_R - CLIP_L}
          height="10"
          rx="3"
          fill={current.conducts ? '#cbd5e1' : '#fef3c7'}
          stroke={current.conducts ? '#475569' : '#a16207'}
        />
        <text x="180" y={BOX.bottom + 24} text-anchor="middle" class="fill-slate-700 text-[12px]"
          >{current.label}</text
        >
      {:else}
        <text x="180" y={BOX.bottom + 24} text-anchor="middle" class="fill-slate-500 text-[12px]"
          >(để hở)</text
        >
      {/if}

      <!-- battery on the left, + at the top -->
      {#if source}
        <rect x={BOX.left - 16} y={BOX.top + 50} width="32" height="64" rx="5" fill="#1e293b" />
        <rect x={BOX.left - 6} y={BOX.top + 44} width="12" height="7" fill="#94a3b8" />
        <text
          x={BOX.left}
          y={BOX.top + 74}
          text-anchor="middle"
          class="fill-white text-[15px] font-bold">+</text
        >
        <text
          x={BOX.left}
          y={BOX.top + 106}
          text-anchor="middle"
          class="fill-white text-[15px] font-bold">−</text
        >
        <text x={BOX.left + 22} y={BOX.top + 86} class="fill-slate-700 text-[11px]">Pin</text>
      {:else}
        <rect
          x={BOX.left - 16}
          y={BOX.top + 50}
          width="32"
          height="64"
          rx="5"
          fill="none"
          stroke="#94a3b8"
          stroke-dasharray="4 3"
        />
        <text x={BOX.left + 22} y={BOX.top + 86} class="fill-slate-500 text-[11px]"
          >(không có pin)</text
        >
      {/if}

      <!-- lamp on top -->
      {#if loop.flowing}
        <circle cx="180" cy={BOX.top} r="26" fill="#fde68a" opacity="0.6" />
      {/if}
      <circle
        cx="180"
        cy={BOX.top}
        r="15"
        fill={loop.flowing ? '#facc15' : '#f8fafc'}
        stroke="#64748b"
        stroke-width="2"
      />
      <path
        d="M 172 {BOX.top + 2} q 4 -10 8 0 q 4 -10 8 0"
        fill="none"
        stroke="#92400e"
        stroke-width="1.5"
      />
      <text x="204" y={BOX.top - 14} class="fill-slate-700 text-[11px]">Bóng đèn</text>

      <!-- switch on the right -->
      <g>
        <rect x={BOX.right - 6} y="118" width="12" height="28" fill="#fff" />
        <circle cx={BOX.right} cy="146" r="4" fill="#1e293b" />
        <circle cx={BOX.right} cy="118" r="4" fill="#1e293b" />
        <line
          x1={BOX.right}
          y1="146"
          x2={closed ? BOX.right : BOX.right + 18}
          y2={closed ? 118 : 124}
          stroke="#1e293b"
          stroke-width="4"
          stroke-linecap="round"
        />
        <text x={BOX.right + 10} y="168" class="fill-slate-700 text-[11px]">Công tắc</text>
      </g>

      <!-- free electrons -->
      {#each dots as p, i (i)}
        <circle cx={p.x} cy={p.y} r="3.5" fill="#2563eb" />
      {/each}
    </svg>
    <figcaption class="px-2 text-center text-xs text-slate-600">
      Chấm xanh là electron tự do trong kim loại. Khi có dòng điện, chúng dịch chuyển có hướng từ
      cực âm, qua mạch ngoài, về cực dương của pin.
    </figcaption>
  </figure>

  <div class="flex flex-wrap gap-2">
    <button
      type="button"
      class={button.secondary}
      aria-pressed={closed}
      onclick={() => (closed = !closed)}
    >
      {closed ? 'Mở công tắc' : 'Đóng công tắc'}
    </button>
    <button
      type="button"
      class={button.quiet}
      aria-pressed={source}
      onclick={() => (source = !source)}
    >
      {source ? 'Tháo pin ra' : 'Lắp pin vào'}
    </button>
  </div>

  <FeedbackNote tone={feedback.tone} text={feedback.text} />

  <div class="grid gap-2 text-sm sm:grid-cols-2">
    <div class="rounded-xl bg-emerald-50 px-3 py-2">
      <p class="font-semibold text-emerald-800">Vật dẫn điện đã thử</p>
      <p>{conductors.length ? conductors.map((m) => m.label).join(', ') : 'Chưa có'}</p>
    </div>
    <div class="rounded-xl bg-amber-50 px-3 py-2">
      <p class="font-semibold text-amber-900">Vật cách điện đã thử</p>
      <p>{insulators.length ? insulators.map((m) => m.label).join(', ') : 'Chưa có'}</p>
    </div>
  </div>
</div>
