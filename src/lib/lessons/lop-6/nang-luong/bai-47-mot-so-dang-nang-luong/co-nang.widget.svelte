<script>
  import { untrack } from 'svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { button, card } from '#lib/core/ui.js';
  import { formatNumber } from '#lib/core/number-format.js';
  import { HEIGHTS, MASSES, SPEEDS, dent, push } from './engine.js';

  const W = 400;
  const H = 200;
  const SAND = 160;
  const PX_PER_CM = 4; // drop heights
  const SPEED_NAMES = ['', 'chậm', 'vừa', 'nhanh'];

  let mode = $state('the-nang');
  let mass = $state(100);
  let height = $state(10);
  let speed = $state(1);
  let t = $state(0); // 0..1 progress of the run
  let running = $state(false);
  let done = $state(false);
  /** @type {Array<{ key: string, label: string, value: number }>} */
  let records = $state([]);

  const result = $derived(mode === 'the-nang' ? dent(mass, height) : push(mass, speed));
  const ballR = $derived(mass === 100 ? 9 : 12);

  $effect(() => {
    if (!running) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      t = 1;
      untrack(finish);
      return;
    }
    let frame = 0;
    const start = performance.now();
    const tick = (/** @type {number} */ now) => {
      t = Math.min(1, (now - start) / 1400);
      if (t >= 1) {
        finish();
        return;
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  });

  function go() {
    t = 0;
    done = false;
    running = true;
  }
  function finish() {
    running = false;
    done = true;
    const key = mode === 'the-nang' ? `h:${mass}:${height}` : `v:${mass}:${speed}`;
    const label =
      mode === 'the-nang'
        ? `Quả nặng ${mass} g, thả từ ${height} cm`
        : `Viên bi ${mass} g, lăn ${SPEED_NAMES[speed]}`;
    records = [...records.filter((r) => r.key !== key), { key, label, value: result }];
  }
  function changed() {
    running = false;
    done = false;
    t = 0;
  }
  function changeMode() {
    changed();
    records = [];
  }

  // Weight falling: it speeds up as it falls (distance grows like t²).
  const dropY = $derived(SAND - height * PX_PER_CM - ballR);
  const ballY = $derived(dropY + (SAND - ballR - dropY) * t * t);
  // Ball rolling: reaches the block halfway through, then the block slides.
  const BLOCK_X = 230;
  const rollX = $derived(40 + (BLOCK_X - ballR - 40) * Math.min(1, t * 2));
  const slide = $derived(t <= 0.5 ? 0 : ((t - 0.5) / 0.5) * result * 3);

  const unitName = $derived(mode === 'the-nang' ? 'Độ sâu vết lõm' : 'Quãng đường khúc gỗ trượt');
  const feedback = $derived.by(() => {
    if (running) return mode === 'the-nang' ? 'Quả nặng đang rơi...' : 'Viên bi đang lăn...';
    if (!done) return 'Chọn khối lượng và độ cao (hoặc tốc độ), rồi nhấn "Thả".';
    const v = `${formatNumber(result, 1)} cm`;
    const more =
      records.length >= 2
        ? mode === 'the-nang'
          ? ' So sánh bảng: vật càng nặng, ở càng cao thì thế năng hấp dẫn càng lớn, vết lõm càng sâu.'
          : ' So sánh bảng: vật càng nặng, chuyển động càng nhanh thì động năng càng lớn, khúc gỗ trượt càng xa.'
        : ' Đổi một đại lượng và thả lại để so sánh.';
    return `${unitName}: ${v}.${more}`;
  });
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Thí nghiệm"
    options={[
      { value: 'the-nang', label: 'Thả quả nặng xuống cát' },
      { value: 'dong-nang', label: 'Viên bi lăn va khúc gỗ' },
    ]}
    bind:value={mode}
    onchange={changeMode}
  />
  <div class="grid gap-3 sm:grid-cols-2">
    <SegmentedControl
      label="Khối lượng"
      options={MASSES.map((m) => ({ value: m, label: `${m} g` }))}
      bind:value={mass}
      onchange={changed}
    />
    {#if mode === 'the-nang'}
      <SegmentedControl
        label="Độ cao thả"
        options={HEIGHTS.map((h) => ({ value: h, label: `${h} cm` }))}
        bind:value={height}
        onchange={changed}
      />
    {:else}
      <SegmentedControl
        label="Tốc độ viên bi"
        options={SPEEDS.map((s) => ({
          value: s,
          label: SPEED_NAMES[s][0].toUpperCase() + SPEED_NAMES[s].slice(1),
        }))}
        bind:value={speed}
        onchange={changed}
      />
    {/if}
  </div>

  <figure class="{card} overflow-hidden p-2">
    <svg
      viewBox="0 0 {W} {H}"
      class="mx-auto block w-full max-w-xl select-none"
      role="img"
      aria-label={mode === 'the-nang'
        ? `Quả nặng ${mass} gam thả từ độ cao ${height} xăng-ti-mét xuống khay cát.`
        : `Viên bi ${mass} gam lăn ${SPEED_NAMES[speed]} tới va vào khúc gỗ.`}
    >
      {#if mode === 'the-nang'}
        <!-- ruler -->
        <line x1="120" y1={SAND - 30 * PX_PER_CM} x2="120" y2={SAND} stroke="#64748b" />
        {#each [0, 10, 20, 30] as h (h)}
          <line
            x1="114"
            y1={SAND - h * PX_PER_CM}
            x2="126"
            y2={SAND - h * PX_PER_CM}
            stroke="#64748b"
          />
          <text
            x="108"
            y={SAND - h * PX_PER_CM + 4}
            text-anchor="end"
            class="fill-slate-600 text-[10px]">{h} cm</text
          >
        {/each}
        <!-- sand tray -->
        <rect x="140" y={SAND} width="140" height="34" fill="#fcd34d" stroke="#a16207" />
        {#if done}
          {@const d = result * 6}
          <path
            d="M {200 - ballR - 4} {SAND} Q 200 {SAND + d * 2} {200 + ballR + 4} {SAND}"
            fill="#d97706"
          />
        {/if}
        <circle
          cx="200"
          cy={done ? SAND - ballR + result * 6 : ballY}
          r={ballR}
          fill="#475569"
          stroke="#1e293b"
        />
      {:else}
        <line x1="10" y1="160" x2="390" y2="160" stroke="#475569" stroke-width="2" />
        <circle cx={rollX} cy={160 - ballR} r={ballR} fill="#475569" stroke="#1e293b" />
        <rect
          x={BLOCK_X + slide}
          y="132"
          width="44"
          height="28"
          rx="3"
          fill="#d97706"
          stroke="#78350f"
        />
        {#each [0, 10, 20, 30] as cm (cm)}
          <line x1={BLOCK_X + cm * 3} y1="160" x2={BLOCK_X + cm * 3} y2="168" stroke="#475569" />
          <text x={BLOCK_X + cm * 3} y="182" text-anchor="middle" class="fill-slate-600 text-[10px]"
            >{cm}</text
          >
        {/each}
        <text x="380" y="196" text-anchor="end" class="fill-slate-600 text-[10px]">cm</text>
      {/if}
    </svg>
  </figure>

  <button type="button" class={button.primary} disabled={running} onclick={go}>Thả</button>

  <p
    class="rounded-xl bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-700"
    aria-live="polite"
  >
    {feedback}
  </p>

  <div class="overflow-x-auto">
    <table class="w-full text-left text-sm tabular-nums">
      <caption class="mb-1 text-left text-sm font-semibold text-slate-700">{unitName}</caption>
      <thead>
        <tr class="bg-slate-100">
          <th class="px-2 py-1">Lần thả</th>
          <th class="px-2 py-1">Kết quả</th>
        </tr>
      </thead>
      <tbody>
        {#each records as r (r.key)}
          <tr class="border-b border-slate-100">
            <td class="px-2 py-1">{r.label}</td>
            <td class="px-2 py-1">{formatNumber(r.value, 1)} cm</td>
          </tr>
        {:else}
          <tr><td colspan="2" class="px-2 py-2 text-slate-500">Chưa thả lần nào.</td></tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>
