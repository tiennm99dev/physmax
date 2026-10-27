<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { frameLoop, reducedMotion } from '#lib/core/motion.js';
  import SliderField from '#lib/core/slider-field.svelte';
  import { button, card } from '#lib/core/ui.js';
  import {
    AMPS_PER_APPLIANCE,
    DEVICES,
    EFFECTS,
    FUSE_RATING,
    checkEffects,
    fuseLine,
    ledLights,
    platedElectrode,
    warmUp,
  } from './engine.js';

  /** @typedef {import('./engine.js').Effect} Effect */

  const EFFECT_IDS = /** @type {Effect[]} */ (Object.keys(EFFECTS));
  const MAX_COPPER = 6;
  const SIDES = /** @type {const} */ (['trai', 'phai']);

  let chosen = $state('ban-la');
  let on = $state(false);
  let t = $state(0);
  let ledForward = $state(true);
  let leftNegative = $state(true);
  let copper = $state({ trai: 0, phai: 0 });
  let appliances = $state(2);
  let melted = $state(false);
  /** @type {Effect[]} */
  let picked = $state([]);
  /** @type {ReturnType<typeof checkEffects> | null} */
  let verdict = $state(null);
  /** @type {Record<string, boolean>} */
  let solved = $state({});

  const dev = $derived(DEVICES.find((d) => d.id === chosen) ?? DEVICES[0]);
  const fuse = $derived(fuseLine(appliances));
  // Current really flows through the device shown.
  const flowing = $derived(
    on && (chosen !== 'den-led' || ledLights(ledForward)) && (chosen !== 'cau-chi' || !melted),
  );

  /** @param {string} id */
  function choose(id) {
    chosen = id;
    on = false;
    t = 0;
    picked = [];
    verdict = null;
  }

  function toggle() {
    on = !on;
    if (on) t = 0;
  }

  $effect(() => {
    if (!flowing) return;
    if (reducedMotion()) {
      t = 30;
      if (chosen === 'ma-dien') copper[platedElectrode(leftNegative)] = MAX_COPPER;
      return;
    }
    return frameLoop((dt) => {
      t += dt;
      if (chosen === 'ma-dien') {
        const side = platedElectrode(leftNegative);
        copper[side] = Math.min(MAX_COPPER, copper[side] + dt * 0.8);
      }
    });
  });

  $effect(() => {
    if (chosen === 'cau-chi' && on && fuse.melts) melted = true;
  });

  /** @param {Effect} e */
  function pick(e) {
    picked = picked.includes(e) ? picked.filter((x) => x !== e) : [...picked, e];
    verdict = null;
  }

  function check() {
    verdict = checkEffects(chosen, picked);
    if (verdict.correct) solved[chosen] = true;
  }

  const temp = $derived(
    chosen === 'ban-la' ? warmUp(flowing ? t : 0, 200) : warmUp(flowing ? t : 0, 100),
  );
  const swing = $derived(flowing && chosen === 'chuong' ? Math.sin(t * 25) * 14 : 0);
  const pulse = $derived(flowing ? (Math.sin(t * 8) + 1) / 2 : 0);
  const solvedCount = $derived(Object.keys(solved).length);

  const observe = $derived.by(() => {
    if (!on) return 'Mạch đang hở: chưa có dòng điện. Bấm "Cho dòng điện chạy qua".';
    switch (chosen) {
      case 'ban-la':
        return `Đế bàn là nóng dần: ${temp} °C.`;
      case 'am-dien':
        return temp >= 99
          ? 'Nước trong ấm đã sôi (100 °C).'
          : `Nước trong ấm nóng dần: ${temp} °C.`;
      case 'den-soi-dot':
        return 'Dây tóc nóng sáng; sờ gần bóng đèn thấy rất nóng.';
      case 'den-led':
        return flowing
          ? 'Đèn LED sáng, vỏ đèn chỉ hơi ấm.'
          : 'Đèn LED không sáng: chân dài (cực dương của LED) đang nối với cực âm của pin. Hãy đảo chiều LED.';
      case 'chuong':
        return 'Cuộn dây hút thanh thép, búa gõ liên tục vào chuông: chuông kêu.';
      case 'ma-dien':
        return `Một lớp đồng màu đỏ nâu bám dần vào thỏi than bên ${platedElectrode(leftNegative) === 'trai' ? 'trái' : 'phải'}, thỏi nối với cực âm.`;
      case 'dien-cham':
        return 'Các cơ ở chỗ đặt điện cực co lại nhẹ theo từng xung điện.';
      default:
        return melted
          ? `Dòng điện ${fuse.current} A vượt quá ${FUSE_RATING} A: dây chảy nóng chảy và đứt, mạch bị ngắt.`
          : `Dòng điện ${fuse.current} A, chưa vượt quá ${FUSE_RATING} A: dây chảy hơi nóng nhưng chưa đứt.`;
    }
  });

  const feedback = $derived.by(() => {
    if (!verdict)
      return {
        tone: /** @type {'info' | 'ok' | 'warn'} */ ('info'),
        text: `Đã nhận ra ${solvedCount}/${DEVICES.length} thiết bị. Chọn tác dụng chính của ${dev.label.toLowerCase()} rồi bấm "Kiểm tra".`,
      };
    if (verdict.correct)
      return {
        tone: /** @type {'info' | 'ok' | 'warn'} */ ('ok'),
        text: `Đúng! ${dev.why} (Đã nhận ra ${solvedCount}/${DEVICES.length} thiết bị.)`,
      };
    const parts = [];
    if (verdict.missing.length) parts.push(`còn thiếu ${verdict.missing.length} tác dụng`);
    if (verdict.extra.length)
      parts.push(
        `"${verdict.extra.map((e) => EFFECTS[e].toLowerCase()).join('", "')}" không phải tác dụng chính`,
      );
    return {
      tone: /** @type {'info' | 'ok' | 'warn'} */ ('warn'),
      text: `Chưa đúng: ${parts.join('; ')}. Cho dòng điện chạy qua và quan sát lại.`,
    };
  });
</script>

<div class="space-y-4">
  <div class="grid grid-cols-2 gap-2 sm:grid-cols-4">
    {#each DEVICES as d (d.id)}
      <button
        type="button"
        class="{chosen === d.id ? button.primary : button.quiet} text-sm"
        aria-pressed={chosen === d.id}
        onclick={() => choose(d.id)}
      >
        {d.label}{solved[d.id] ? ' ✓' : ''}
      </button>
    {/each}
  </div>

  <figure class="{card} overflow-hidden p-2">
    <svg
      viewBox="0 0 360 200"
      class="mx-auto block w-full max-w-md select-none"
      role="img"
      aria-label="{dev.label}. {observe}"
    >
      {#if chosen === 'ban-la'}
        {@const k = (temp - 25) / 175}
        <path
          d="M 80 140 L 270 140 Q 280 100 230 90 L 120 90 Q 90 95 80 140 Z"
          fill="#cbd5e1"
          stroke="#475569"
          stroke-width="2"
        />
        <path d="M 150 90 Q 180 50 215 90" fill="none" stroke="#1e293b" stroke-width="8" />
        <rect
          x="76"
          y="140"
          width="200"
          height="12"
          rx="4"
          fill="rgb({120 + 135 * k}, {120 - 70 * k}, {120 - 90 * k})"
        />
        {#if flowing && k > 0.3}
          {#each [110, 170, 230] as x (x)}
            <path
              d="M {x} 172 q 6 -6 0 -12 q -6 -6 0 -12"
              fill="none"
              stroke="#f97316"
              stroke-width="2"
              opacity={k}
            />
          {/each}
        {/if}
        <text x="180" y="190" text-anchor="middle" class="fill-slate-700 text-[13px] font-semibold"
          >{temp} °C</text
        >
      {:else if chosen === 'am-dien'}
        <rect
          x="120"
          y="50"
          width="110"
          height="120"
          rx="14"
          fill="#e2e8f0"
          stroke="#475569"
          stroke-width="2"
        />
        <rect
          x="126"
          y="80"
          width="98"
          height="84"
          rx="8"
          fill="rgb({96 + (temp - 25) * 1.6}, {165 - (temp - 25) * 0.6}, 250)"
        />
        <path d="M 230 70 Q 270 80 255 140" fill="none" stroke="#475569" stroke-width="7" />
        <rect x="128" y="160" width="94" height="6" fill={flowing ? '#ef4444' : '#94a3b8'} />
        {#if temp >= 95}
          {#each [145, 170, 195, 210] as x, i (x)}
            <circle cx={x} cy={140 - ((t * 30 + i * 17) % 50)} r="4" fill="#fff" opacity="0.8" />
          {/each}
        {/if}
        <text x="175" y="192" text-anchor="middle" class="fill-slate-700 text-[13px] font-semibold"
          >Nước: {temp} °C</text
        >
      {:else if chosen === 'den-soi-dot'}
        {#if flowing}
          <circle cx="180" cy="80" r="62" fill="#fde68a" opacity="0.55" />
        {/if}
        <circle
          cx="180"
          cy="80"
          r="40"
          fill={flowing ? '#fef08a' : '#f8fafc'}
          stroke="#64748b"
          stroke-width="2"
        />
        <path
          d="M 165 92 L 168 75 Q 172 66 176 75 Q 180 66 184 75 Q 188 66 192 75 L 195 92"
          fill="none"
          stroke={flowing ? '#f97316' : '#78716c'}
          stroke-width={flowing ? 3 : 1.5}
        />
        <rect x="164" y="118" width="32" height="30" fill="#94a3b8" />
        <text x="180" y="185" text-anchor="middle" class="fill-slate-700 text-[12px]"
          >{flowing ? 'Dây tóc khoảng 2 500 °C' : 'Dây tóc nguội'}</text
        >
      {:else if chosen === 'den-led'}
        <rect x="40" y="110" width="80" height="34" rx="6" fill="#1e293b" />
        <text x="54" y="132" class="fill-white text-[15px] font-bold">−</text>
        <text x="100" y="132" class="fill-white text-[15px] font-bold">+</text>
        <rect x="120" y="120" width="6" height="14" fill="#94a3b8" />
        {#if flowing}
          <circle cx="240" cy="70" r="40" fill="#fecaca" opacity="0.8" />
        {/if}
        <path
          d="M 225 100 L 225 70 A 15 15 0 0 1 255 70 L 255 100 Z"
          fill={flowing ? '#ef4444' : '#fca5a5'}
          stroke="#991b1b"
        />
        <!-- long leg (anode) and short leg (cathode) -->
        <line
          x1={ledForward ? 248 : 232}
          y1="100"
          x2={ledForward ? 248 : 232}
          y2="150"
          stroke="#64748b"
          stroke-width="3"
        />
        <line
          x1={ledForward ? 232 : 248}
          y1="100"
          x2={ledForward ? 232 : 248}
          y2="132"
          stroke="#64748b"
          stroke-width="3"
        />
        <!-- wires: + terminal to the right leg, − terminal to the left leg -->
        <polyline
          points="126,127 140,127 140,170 248,170 248,132"
          fill="none"
          stroke="#dc2626"
          stroke-width="2"
        />
        <polyline
          points="44,144 44,185 300,185 300,30 180,30 180,120 232,120 232,132"
          fill="none"
          stroke="#1d4ed8"
          stroke-width="2"
        />
        <text x="262" y="160" class="fill-slate-600 text-[11px]"
          >{ledForward ? 'chân dài' : 'chân ngắn'}</text
        >
      {:else if chosen === 'chuong'}
        <path
          d="M 210 110 A 40 40 0 0 1 290 110 Z"
          fill="#facc15"
          stroke="#a16207"
          stroke-width="2"
        />
        <rect x="70" y="60" width="50" height="70" rx="6" fill="#fdba74" stroke="#9a3412" />
        {#each [70, 82, 94, 106, 118] as y (y)}
          <line x1="70" y1={y} x2="120" y2={y} stroke="#9a3412" />
        {/each}
        <text x="95" y="150" text-anchor="middle" class="fill-slate-600 text-[11px]"
          >nam châm điện</text
        >
        <g transform="rotate({swing} 140 160)">
          <line x1="140" y1="160" x2="140" y2="40" stroke="#475569" stroke-width="5" />
          <line x1="140" y1="40" x2="215" y2="95" stroke="#475569" stroke-width="3" />
          <circle cx="215" cy="95" r="8" fill="#1e293b" />
        </g>
        {#if flowing}
          <path
            d="M 300 70 q 10 15 0 30 M 312 62 q 14 23 0 46"
            fill="none"
            stroke="#b45309"
            stroke-width="2"
          />
        {/if}
      {:else if chosen === 'ma-dien'}
        <rect
          x="100"
          y="70"
          width="160"
          height="110"
          rx="8"
          fill="#bae6fd"
          stroke="#475569"
          stroke-width="2"
        />
        <text x="180" y="172" text-anchor="middle" class="fill-sky-900 text-[11px]"
          >dung dịch CuSO₄</text
        >
        {#each SIDES as side (side)}
          {@const s = { x: side === 'trai' ? 135 : 215, neg: (side === 'trai') === leftNegative }}
          {@const c = copper[side]}
          <rect x={s.x - 7} y="40" width="14" height="110" fill="#1e293b" />
          {#if c > 0}
            <!-- copper only where the rod is under the solution -->
            <rect x={s.x - 7 - c} y="74" width={14 + 2 * c} height="76" rx="2" fill="#b45309" />
          {/if}
          <text x={s.x} y="30" text-anchor="middle" class="fill-slate-800 text-[15px] font-bold"
            >{s.neg ? '−' : '+'}</text
          >
        {/each}
        <text x="180" y="20" text-anchor="middle" class="fill-slate-600 text-[11px]"
          >nguồn điện</text
        >
      {:else if chosen === 'dien-cham'}
        <path
          d="M 40 100 Q 120 {80 - 8 * pulse} 200 {90 -
            6 * pulse} Q 280 95 330 110 L 330 150 Q 260 160 200 {150 +
            6 * pulse} Q 120 160 40 150 Z"
          fill="#fed7aa"
          stroke="#9a3412"
          stroke-width="2"
        />
        <rect x="110" y="70" width="24" height="16" rx="3" fill="#475569" />
        <rect x="230" y="74" width="24" height="16" rx="3" fill="#475569" />
        <path d="M 122 70 Q 180 20 242 74" fill="none" stroke="#1d4ed8" stroke-width="2" />
        {#if flowing}
          <path
            d="M 160 40 l 8 -10 l -2 8 l 8 -6"
            fill="none"
            stroke="#eab308"
            stroke-width="2"
            opacity={pulse}
          />
        {/if}
        <text x="180" y="190" text-anchor="middle" class="fill-slate-600 text-[11px]"
          >Điện cực dán lên da</text
        >
      {:else}
        <rect x="40" y="80" width="280" height="40" rx="6" fill="#f1f5f9" stroke="#64748b" />
        <rect x="120" y="88" width="120" height="24" rx="4" fill="#fff" stroke="#475569" />
        {#if melted}
          <line x1="122" y1="100" x2="170" y2="100" stroke="#78716c" stroke-width="3" />
          <line x1="190" y1="100" x2="238" y2="100" stroke="#78716c" stroke-width="3" />
          <circle cx="172" cy="102" r="3" fill="#78716c" />
          <circle cx="188" cy="98" r="3" fill="#78716c" />
        {:else}
          <line
            x1="122"
            y1="100"
            x2="238"
            y2="100"
            stroke={on ? (fuse.current > FUSE_RATING * 0.7 ? '#f97316' : '#a8a29e') : '#78716c'}
            stroke-width="3"
          />
        {/if}
        <text x="180" y="146" text-anchor="middle" class="fill-slate-700 text-[12px]"
          >Dây chảy chịu được tối đa {FUSE_RATING} A</text
        >
        <text x="180" y="170" text-anchor="middle" class="fill-slate-700 text-[12px] font-semibold"
          >Dòng điện: {on && !melted ? fuse.current : 0} A</text
        >
      {/if}
    </svg>
  </figure>

  <div class="flex flex-wrap gap-2">
    <button type="button" class={button.primary} aria-pressed={on} onclick={toggle}>
      {on ? 'Ngắt mạch' : 'Cho dòng điện chạy qua'}
    </button>
    {#if chosen === 'den-led'}
      <button type="button" class={button.secondary} onclick={() => (ledForward = !ledForward)}>
        Đảo chiều LED
      </button>
    {/if}
    {#if chosen === 'ma-dien'}
      <button type="button" class={button.secondary} onclick={() => (leftNegative = !leftNegative)}>
        Đổi chiều nguồn
      </button>
      <button type="button" class={button.quiet} onclick={() => (copper = { trai: 0, phai: 0 })}>
        Lau sạch thỏi than
      </button>
    {/if}
    {#if chosen === 'cau-chi' && melted}
      <button
        type="button"
        class={button.secondary}
        onclick={() => ((melted = false), (on = false))}
      >
        Thay dây chảy mới
      </button>
    {/if}
  </div>
  {#if chosen === 'cau-chi'}
    <SliderField
      label="Số thiết bị đang bật (mỗi thiết bị {AMPS_PER_APPLIANCE} A)"
      bind:value={appliances}
      min={1}
      max={4}
    />
  {/if}

  <p class="rounded-xl bg-slate-50 px-4 py-3 text-sm text-slate-800" aria-live="polite">
    {observe}
  </p>

  <fieldset class="space-y-2">
    <legend class="text-sm font-semibold text-slate-700">
      {dev.label} dùng tác dụng nào của dòng điện? (có thể chọn nhiều)
    </legend>
    <div class="flex flex-wrap gap-2">
      {#each EFFECT_IDS as e (e)}
        <button
          type="button"
          class="{picked.includes(e) ? button.primary : button.quiet} text-sm"
          aria-pressed={picked.includes(e)}
          onclick={() => pick(e)}
        >
          {EFFECTS[e]}
        </button>
      {/each}
      <button type="button" class={button.secondary} onclick={check} disabled={picked.length === 0}>
        Kiểm tra
      </button>
    </div>
  </fieldset>

  <FeedbackNote tone={feedback.tone} text={feedback.text} />
</div>
