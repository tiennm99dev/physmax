<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import { button, card } from '#lib/core/ui.js';
  import { fmt, formatNumber } from '#lib/core/number-format.js';
  import { frameLoop, reducedMotion } from '#lib/core/motion.js';
  import { MEDIA, isReached, layerOffset, mediumById, sourceOffset, travelTime } from './engine.js';

  const VW = 480;
  const VH = 220;
  /** x of the membrane at rest, where the medium starts. */
  const MEMBRANE = 56;
  const EAR = 440;
  const COLS = Array.from({ length: 40 }, (_, i) => 64 + i * 9);
  const ROWS = Array.from({ length: 9 }, (_, i) => 34 + i * 19);
  /** The column drawn in red, to show a layer only moves to and fro. */
  const TRACKED = 12;
  /** Slowed-down source: 1,5 vibrations per second, 5,5 px each side. */
  const SCREEN_SOURCE = { amplitude: 5.5, frequency: 1.5 };

  let mediumId = $state('air');
  let on = $state(false);
  /** Seconds since the speaker was last switched on. */
  let clock = $state(0);
  /** Clock reading when the speaker was switched off, or null while on. */
  let offAt = $state(/** @type {number | null} */ (null));
  let distance = $state(1020);

  const medium = $derived(mediumById(mediumId));
  const source = $derived({
    ...SCREEN_SOURCE,
    duration: offAt === null ? (on ? Infinity : -1) : offAt,
  });
  const membraneX = $derived(MEMBRANE + sourceOffset(clock, source));
  const vibrating = $derived(on && offAt === null);
  const earReached = $derived(
    isReached(EAR - MEMBRANE, clock, medium.screenSpeed, source.duration),
  );
  const heardOnce = $derived(
    medium.speed > 0 && clock >= (EAR - MEMBRANE) / Math.max(medium.screenSpeed, 1e-9),
  );
  const active = $derived(
    vibrating ||
      (offAt !== null &&
        medium.speed > 0 &&
        clock - offAt < (EAR - MEMBRANE) / medium.screenSpeed + 0.5),
  );

  $effect(() => {
    if (!active || reducedMotion()) return;
    return frameLoop((dt) => {
      clock += dt;
    });
  });

  function toggle() {
    if (vibrating) {
      offAt = clock;
    } else {
      clock = 0;
      offAt = null;
      on = true;
    }
  }

  function step() {
    if (!on) toggle();
    clock = Math.round((clock + 0.1) * 10) / 10;
  }

  function reset() {
    on = false;
    offAt = null;
    clock = 0;
  }

  const status = $derived.by(() => {
    if (!on) return 'Loa đang tắt: màng loa đứng yên, không có nguồn âm dao động nên không có âm.';
    if (medium.speed === 0) {
      return vibrating
        ? 'Màng loa đang dao động nhưng xung quanh là chân không: không có lớp chất nào để nén, giãn, nên âm không truyền đi và tai không nghe thấy gì.'
        : 'Loa đã tắt. Trong chân không, tai không nghe thấy gì từ đầu đến cuối.';
    }
    if (earReached) {
      return `Dao động đã truyền qua ${medium.name.toLowerCase()} (${medium.state}) tới tai: màng nhĩ dao động theo, tai nghe thấy âm.`;
    }
    if (vibrating) {
      return heardOnce
        ? `Màng loa vẫn dao động, các lớp ${medium.name.toLowerCase()} nén, giãn liên tiếp truyền dao động tới tai.`
        : `Màng loa dao động làm lớp ${medium.name.toLowerCase()} sát nó nén, giãn; dao động đang lan dần ra xa, chưa tới tai.`;
    }
    return 'Loa đã tắt: màng loa đứng yên, dao động cuối cùng lan qua tai rồi các lớp chất đứng yên trở lại.';
  });

  const tone = $derived(
    !on ? 'info' : medium.speed === 0 ? 'warn' : earReached || heardOnce ? 'ok' : 'info',
  );

  const sec = (/** @type {number} */ t) => (t >= 1 ? formatNumber(t, 2) : formatNumber(t, 3));

  const background = $derived(
    {
      air: '#eff6ff',
      water: '#bfdbfe',
      steel: '#cbd5e1',
      vacuum: '#ffffff',
    }[medium.id],
  );
  const dotColor = $derived(medium.id === 'steel' ? '#334155' : '#1d4ed8');
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Môi trường giữa loa và tai"
    options={MEDIA.map((m) => ({ value: m.id, label: m.name }))}
    bind:value={mediumId}
    onchange={reset}
  />

  <figure class="{card} overflow-hidden p-2">
    <svg
      viewBox="0 0 {VW} {VH}"
      class="w-full select-none"
      role="img"
      aria-label="Loa bên trái, tai bên phải, ở giữa là {medium.name.toLowerCase()}. {vibrating
        ? 'Màng loa đang dao động.'
        : 'Màng loa đứng yên.'} {medium.speed === 0
        ? 'Không có lớp chất nào giữa loa và tai.'
        : earReached
          ? 'Dao động đã tới tai.'
          : 'Dao động chưa tới tai.'}"
    >
      <rect
        x={MEMBRANE}
        y="18"
        width={EAR - MEMBRANE - 14}
        height={VH - 36}
        rx="6"
        fill={background}
        stroke={medium.id === 'vacuum' ? '#94a3b8' : 'none'}
        stroke-dasharray="6 4"
      />
      {#if medium.id === 'vacuum'}
        <text
          x={(MEMBRANE + EAR) / 2}
          y={VH / 2 + 5}
          text-anchor="middle"
          class="fill-slate-400 text-[16px] font-semibold">Chân không: không có hạt chất</text
        >
      {:else}
        {#each COLS as x0, c (x0)}
          {@const x = x0 + layerOffset(x0 - MEMBRANE, clock, medium.screenSpeed, source)}
          {#each ROWS as y (y)}
            <circle
              cx={x}
              cy={y + (c % 2) * 5}
              r={c === TRACKED ? 3.4 : 2.6}
              fill={c === TRACKED ? '#dc2626' : dotColor}
            />
          {/each}
        {/each}
      {/if}

      <!-- loudspeaker -->
      <rect x="6" y={VH / 2 - 22} width="22" height="44" rx="4" fill="#0f172a" />
      <path
        d="M28 {VH / 2 - 22} L{membraneX} {VH / 2 - 62} L{membraneX} {VH / 2 + 62} L28 {VH / 2 +
          22} Z"
        fill="#475569"
      />
      <line
        x1={membraneX}
        y1={VH / 2 - 62}
        x2={membraneX}
        y2={VH / 2 + 62}
        stroke={vibrating ? '#f59e0b' : '#0f172a'}
        stroke-width="4"
        stroke-linecap="round"
      />
      <text x="17" y={VH / 2 + 42} text-anchor="middle" class="fill-slate-700 text-[14px]">Loa</text
      >

      <!-- ear -->
      <path
        d="M{EAR + 6} {VH / 2 - 26} q22 0 22 24 q0 14 -10 20 q-6 4 -6 12 q0 10 -10 10"
        fill="none"
        stroke={earReached ? '#059669' : '#64748b'}
        stroke-width="5"
        stroke-linecap="round"
      />
      <text x={EAR + 18} y={VH - 6} text-anchor="middle" class="fill-slate-700 text-[14px]"
        >Tai</text
      >
      {#if earReached}
        <text x={EAR + 18} y="30" text-anchor="middle" class="fill-emerald-700 text-[18px]">♪</text>
      {/if}
    </svg>
    <figcaption class="px-2 text-center text-sm text-slate-600">
      Mỗi chấm là một lớp chất; chấm đỏ cho thấy lớp chất chỉ dao động tại chỗ. Hình đã làm chậm lại
      để dễ quan sát.
    </figcaption>
  </figure>

  <div class="flex flex-wrap gap-2">
    <button type="button" class={button.primary} onclick={toggle} aria-pressed={vibrating}>
      {vibrating ? 'Tắt loa' : 'Bật loa'}
    </button>
    <button type="button" class={button.quiet} onclick={step}>Tiến 0,1 s</button>
    <button type="button" class={button.quiet} onclick={reset}>Làm lại</button>
  </div>

  <FeedbackNote {tone} text={status} />

  <div class="{card} space-y-3 p-3">
    <SliderField
      label="Khoảng cách tới tai (d)"
      bind:value={distance}
      min={10}
      max={3000}
      step={10}
      unit="m"
      format={(v) => fmt(v)}
    />
    <div class="overflow-x-auto">
      <table class="w-full text-sm tabular-nums">
        <caption class="mb-2 text-left font-semibold text-slate-700">
          Thời gian âm truyền tới tai, t = d : v
        </caption>
        <thead>
          <tr class="text-left text-slate-600">
            <th class="py-1 pr-2">Môi trường</th>
            <th class="py-1 pr-2">v (m/s)</th>
            <th class="py-1">t (s)</th>
          </tr>
        </thead>
        <tbody>
          {#each MEDIA as m (m.id)}
            <tr class="border-t border-slate-100 {m.id === mediumId ? 'bg-indigo-50' : ''}">
              <td class="py-1 pr-2">{m.speed > 0 ? `${m.name} (${m.state})` : m.name}</td>
              <td class="py-1 pr-2">{m.speed > 0 ? `khoảng ${fmt(m.speed)}` : '—'}</td>
              <td class="py-1">
                {m.speed > 0 ? sec(travelTime(distance, m)) : 'âm không truyền được'}
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>
</div>
