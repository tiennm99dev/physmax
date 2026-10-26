<script>
  import { untrack } from 'svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { button, card } from '#lib/core/ui.js';
  import { arrowHead, shaftEnd } from '#lib/domain/arrow.js';
  import { blow } from './engine.js';

  const W = 400;
  const H = 150;
  const GROUND = 112;
  const START_X = 70;
  const PX_PER_CM = 3.2;
  const NAMES = ['', 'nhẹ', 'vừa', 'mạnh'];

  let strength = $state(1);
  let seconds = $state(1);
  let pos = $state(0); // centimetres travelled
  let running = $state(false);
  /** @type {Array<{ key: string, label: string, distance: number }>} */
  let records = $state([]);

  const shot = $derived(blow(strength, seconds));
  const carX = $derived(START_X + pos * PX_PER_CM);

  $effect(() => {
    if (!running) return;
    const target = shot.distance;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      pos = target;
      untrack(finish);
      return;
    }
    let frame = 0;
    let prev = performance.now();
    const tick = (/** @type {number} */ t) => {
      // The car slows down as it rolls, like a real toy car on a table.
      const left = target - pos;
      pos = Math.min(target, pos + Math.max(0.05, left * 2.2) * ((t - prev) / 1000) * 1.5);
      prev = t;
      if (target - pos < 0.05) {
        pos = target;
        finish();
        return;
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  });

  function go() {
    pos = 0;
    running = true;
  }
  function finish() {
    running = false;
    const key = `${strength}:${seconds}`;
    const label = `Thổi ${NAMES[strength]}, ${seconds} giây`;
    records = [
      ...records.filter((r) => r.key !== key),
      { key, label, distance: shot.distance },
    ].sort((a, b) => a.distance - b.distance);
  }
  function changed() {
    running = false;
    pos = 0;
  }

  const feedback = $derived(
    running
      ? 'Luồng hơi đang đẩy cánh buồm...'
      : pos === 0
        ? `Chọn cách thổi rồi nhấn "Thổi". Thổi ${NAMES[strength]} trong ${seconds} giây.`
        : `Xe đi được ${shot.distance} cm. ${
            records.length >= 2
              ? 'So sánh bảng: thổi càng mạnh, càng lâu thì năng lượng truyền cho xe càng lớn, xe đi càng xa.'
              : 'Đổi cách thổi và thử lại để so sánh.'
          }`,
  );
</script>

<div class="space-y-4">
  <div class="grid gap-3 sm:grid-cols-2">
    <SegmentedControl
      label="Thổi"
      options={[
        { value: 1, label: 'Nhẹ' },
        { value: 2, label: 'Vừa' },
        { value: 3, label: 'Mạnh' },
      ]}
      bind:value={strength}
      onchange={changed}
    />
    <SegmentedControl
      label="Thời gian thổi"
      options={[
        { value: 1, label: '1 giây' },
        { value: 2, label: '2 giây' },
        { value: 3, label: '3 giây' },
      ]}
      bind:value={seconds}
      onchange={changed}
    />
  </div>

  <figure class="{card} overflow-hidden p-2">
    <svg
      viewBox="0 0 {W} {H}"
      class="mx-auto block w-full max-w-xl select-none"
      role="img"
      aria-label="Xe đồ chơi có cánh buồm giấy, đã đi được {Math.round(pos)} xăng-ti-mét."
    >
      <rect x="0" y={GROUND} width={W} height={H - GROUND} fill="#fde68a" />
      <line x1="0" y1={GROUND} x2={W} y2={GROUND} stroke="#92400e" stroke-width="2" />
      {#each [0, 30, 60, 90] as cm (cm)}
        <line
          x1={START_X + cm * PX_PER_CM}
          y1={GROUND}
          x2={START_X + cm * PX_PER_CM}
          y2={GROUND + 8}
          stroke="#92400e"
        />
        <text
          x={START_X + cm * PX_PER_CM}
          y={GROUND + 22}
          text-anchor="middle"
          class="fill-amber-900 text-[10px]">{cm} cm</text
        >
      {/each}

      <!-- straw and puff -->
      <line x1="4" y1="70" x2={START_X - 30} y2="70" stroke="#0ea5e9" stroke-width="6" />
      {#if running && pos < 3}
        {@const x2 = START_X - 30 + 10 + shot.force * 8}
        {@const end = shaftEnd(START_X - 28, 70, x2, 70, 8)}
        <line
          x1={START_X - 28}
          y1="70"
          x2={end.x}
          y2={end.y}
          stroke="#dc2626"
          stroke-width={1 + shot.force}
        />
        <polygon points={arrowHead(START_X - 28, 70, x2, 70, 8)} fill="#dc2626" />
      {/if}

      <!-- car with paper sail -->
      <g transform="translate({carX - START_X} 0)">
        <polygon
          points="{START_X - 18},96 {START_X - 18},48 {START_X + 6},90"
          fill="#f8fafc"
          stroke="#475569"
        />
        <line
          x1={START_X - 18}
          y1="48"
          x2={START_X - 18}
          y2="98"
          stroke="#475569"
          stroke-width="2"
        />
        <rect x={START_X - 28} y="96" width="56" height="10" rx="3" fill="#6366f1" />
        <circle cx={START_X - 16} cy={GROUND - 5} r="6" fill="#1e293b" />
        <circle cx={START_X + 16} cy={GROUND - 5} r="6" fill="#1e293b" />
      </g>
    </svg>
    <figcaption class="px-2 text-center text-xs text-slate-600">
      Mũi tên đỏ: lực đẩy của luồng hơi (dài hơn khi thổi mạnh hơn)
    </figcaption>
  </figure>

  <button type="button" class={button.primary} disabled={running} onclick={go}>Thổi</button>

  <p
    class="rounded-xl bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-700"
    aria-live="polite"
  >
    {feedback}
  </p>

  <div class="overflow-x-auto">
    <table class="w-full text-left text-sm tabular-nums">
      <caption class="mb-1 text-left text-sm font-semibold text-slate-700">
        Quãng đường xe đi được
      </caption>
      <thead>
        <tr class="bg-slate-100">
          <th class="px-2 py-1">Cách thổi</th>
          <th class="px-2 py-1">Quãng đường</th>
        </tr>
      </thead>
      <tbody>
        {#each records as r (r.key)}
          <tr class="border-b border-slate-100">
            <td class="px-2 py-1">{r.label}</td>
            <td class="px-2 py-1">{r.distance} cm</td>
          </tr>
        {:else}
          <tr><td colspan="2" class="px-2 py-2 text-slate-500">Chưa thổi lần nào.</td></tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>
