<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { frameLoop } from '#lib/core/motion.js';
  import { fmt, formatFixed, formatNumber } from '#lib/core/number-format.js';
  import { button, card } from '#lib/core/ui.js';
  import Thermometer from '#lib/domain/thermometer.svelte';
  import {
    POWER,
    ROOM,
    energyIn,
    increments,
    joulesPerDegree,
    slope,
    temperatureAfter,
  } from './engine.js';

  /** @typedef {import('./engine.js').Reading} Reading */

  const MAX_T = 60;
  const MASSES = [
    { value: '100', label: '100 g nước' },
    { value: '200', label: '200 g nước' },
  ];
  const SPEEDS = [
    { value: '10', label: 'Nhanh ×10' },
    { value: '30', label: 'Nhanh ×30' },
  ];
  const COLORS = /** @type {Record<string, string>} */ ({ 100: '#0284c7', 200: '#ea580c' });

  let mass = $state('100');
  let speed = $state('10');
  let heating = $state(false);
  /** Joulemeter energy reading, J. */
  let meter = $state(0);
  /** Joulemeter clock, s. */
  let clock = $state(0);
  /** Energy the present water has received since it was poured, J. */
  let received = $state(0);
  /** @type {Record<string, Reading[]>} */
  let rows = $state({ 100: [], 200: [] });
  let note = $state('');

  const grams = $derived(Number(mass));
  const celsius = $derived(temperatureAfter(received, grams));
  const shown = $derived(Math.round(celsius * 10) / 10);
  const current = $derived(rows[mass]);
  const start = $derived(current[0]);
  const rise = $derived(start ? Math.round((shown - start.celsius) * 10) / 10 : 0);

  $effect(() => {
    if (!heating) return;
    return frameLoop((dt) => {
      const sim = dt * Number(speed);
      const room = (MAX_T - temperatureAfter(received, grams)) * joulesPerDegree(grams);
      const e = Math.min(energyIn(sim), room);
      meter += e;
      received += e;
      clock += sim;
      if (e < energyIn(sim)) {
        heating = false;
        note = `Nước đã tới ${MAX_T} °C, nguồn được tắt để an toàn.`;
      }
    });
  });

  /** @param {string} m */
  function pour(m) {
    heating = false;
    received = 0;
    rows[m] = [];
    note = '';
  }

  function resetMeter() {
    meter = 0;
    clock = 0;
    note = '';
  }

  function record() {
    const last = current.at(-1);
    if (last && Math.abs(last.celsius - shown) < 0.05) {
      note = 'Nhiệt độ chưa thay đổi so với lần ghi trước. Hãy đun thêm rồi mới ghi.';
      return;
    }
    rows[mass] = [...current, { celsius: shown, joules: Math.round(meter) }];
    note = '';
  }

  const series = $derived(
    MASSES.map((m) => {
      const pts = increments(rows[m.value]).slice(1);
      return { mass: m.value, pts, k: slope(pts) };
    }),
  );

  const feedback = $derived.by(() => {
    if (note) return { tone: /** @type {'ok' | 'warn' | 'info'} */ ('info'), text: note };
    if (!start && heating)
      return {
        tone: /** @type {'ok' | 'warn' | 'info'} */ ('warn'),
        text: 'Em chưa ghi dòng "Bắt đầu đo". Hãy tắt nguồn, đổ nước mới và ghi số chỉ nhiệt kế, joulemeter trước khi đun.',
      };
    if (!start)
      return {
        tone: /** @type {'ok' | 'warn' | 'info'} */ ('info'),
        text: 'Bước 1: đặt joulemeter về 0, khuấy nhẹ rồi bấm "Ghi số liệu" để ghi dòng "Bắt đầu đo". Bước 2: bật nguồn và ghi tiếp mỗi khi nhiệt độ tăng thêm khoảng 3 °C.',
      };
    const now = series.find((s) => s.mass === mass);
    const other = series.find((s) => s.mass !== mass);
    if (!now || !Number.isFinite(now.k))
      return {
        tone: /** @type {'ok' | 'warn' | 'info'} */ ('info'),
        text: `Đã ghi dòng bắt đầu. Bật nguồn và ghi số liệu khi nhiệt độ tăng thêm 3 °C, 6 °C, 9 °C. Hiện đã tăng ${formatNumber(rise)} °C.`,
      };
    let text = `Với ${mass} g nước, cứ tăng 1 °C thì nước và bình nhận khoảng ${fmt(Math.round(now.k))} J. Độ tăng nhiệt độ gấp đôi thì năng lượng cần cung cấp cũng gấp đôi.`;
    if (other && Number.isFinite(other.k)) {
      const big = Number(mass) > Number(other.mass) ? now.k : other.k;
      const small = Number(mass) > Number(other.mass) ? other.k : now.k;
      text += ` Cùng độ tăng nhiệt độ, 200 g nước cần năng lượng gấp khoảng ${formatNumber(big / small, 1)} lần 100 g nước: lượng nước càng nhiều thì năng lượng nhiệt cần cung cấp càng lớn.`;
    } else if (now.pts.length < 3) {
      text += ` Ghi thêm số liệu (đã tăng ${formatNumber(rise)} °C so với lúc bắt đầu).`;
    } else {
      text += ' Đổi sang lượng nước khác và đo lại để so sánh.';
    }
    return { tone: /** @type {'ok' | 'warn' | 'info'} */ ('ok'), text };
  });

  // Plot of energy received against temperature rise.
  const PW = 320;
  const PH = 200;
  const X0 = 52;
  const Y0 = 166;
  // The axes grow in steps of 3 °C and 4 000 J to fit every measured point.
  const XMAX = $derived(
    Math.max(
      12,
      3 * Math.ceil(Math.max(0, ...series.flatMap((s) => s.pts.map((p) => p.rise))) / 3),
    ),
  );
  const YMAX = $derived(
    Math.max(
      12000,
      4000 * Math.ceil(Math.max(0, ...series.flatMap((s) => s.pts.map((p) => p.energy))) / 4000),
    ),
  );
  const xTicks = $derived(Array.from({ length: XMAX / 3 + 1 }, (_, i) => 3 * i));
  const yStep = $derived(YMAX > 24000 ? 8000 : 4000);
  const yTicks = $derived(Array.from({ length: YMAX / yStep + 1 }, (_, i) => yStep * i));
  const px = (/** @type {number} */ r) => X0 + ((PW - X0 - 14) * r) / XMAX;
  const py = (/** @type {number} */ e) => Y0 - ((Y0 - 14) * e) / YMAX;
  const hot = $derived((celsius - ROOM) / (MAX_T - ROOM));
</script>

<div class="space-y-4">
  <div class="grid grid-cols-[1fr_auto] items-center gap-3">
    <figure class="{card} p-2">
      <svg
        viewBox="0 0 260 230"
        class="mx-auto block w-full max-w-sm"
        role="img"
        aria-label="Joulemeter nối nguồn 12 vôn với dây đốt trong bình nhiệt lượng kế chứa {mass} gam nước. Nguồn {heating
          ? 'đang bật'
          : 'đang tắt'}. Joulemeter chỉ {Math.round(meter)} jun."
      >
        <!-- source -->
        <rect x="6" y="14" width="70" height="44" rx="6" fill="#e2e8f0" stroke="#475569" />
        <text x="41" y="34" text-anchor="middle" class="fill-slate-700 text-[11px] font-semibold"
          >Nguồn</text
        >
        <text x="41" y="49" text-anchor="middle" class="fill-slate-700 text-[11px]">12 V</text>
        <circle cx="66" cy="22" r="4" fill={heating ? '#22c55e' : '#94a3b8'} />
        <!-- joulemeter -->
        <rect x="98" y="6" width="156" height="78" rx="8" fill="#1e293b" />
        <text x="176" y="20" text-anchor="middle" class="fill-slate-300 text-[9px]">JOULEMETER</text
        >
        <rect x="106" y="25" width="140" height="52" rx="4" fill="#bbf7d0" />
        <text x="240" y="47" text-anchor="end" class="fill-slate-900 font-mono text-[17px]"
          >{fmt(Math.round(meter))} J</text
        >
        <text x="112" y="70" class="fill-slate-800 font-mono text-[10px]"
          >{heating ? POWER : 0} W</text
        >
        <text x="240" y="70" text-anchor="end" class="fill-slate-800 font-mono text-[10px]"
          >{fmt(Math.floor(clock))} s</text
        >
        <!-- wires -->
        <g stroke="#334155" stroke-width="2" fill="none">
          <polyline points="76,30 98,30" />
          <polyline points="76,46 98,46" />
          <polyline points="140,84 140,120 112,120 112,176" />
          <polyline points="210,84 210,120 168,120 168,176" />
        </g>
        <!-- calorimeter -->
        <rect x="70" y="120" width="140" height="104" rx="8" fill="#f1f5f9" stroke="#64748b" />
        <rect
          x="80"
          y={grams === 100 ? 160 : 136}
          width="120"
          height={grams === 100 ? 56 : 80}
          style:fill="color-mix(in srgb, #fdba74 {Math.round(100 * hot)}%, #bae6fd)"
        />
        <path
          d="M112 176 q6 -10 12 0 t12 0 t12 0 t12 0 t8 0 L168 176"
          fill="none"
          stroke={heating ? '#dc2626' : '#78716c'}
          stroke-width="3"
        />
        <text x="140" y="208" text-anchor="middle" class="fill-slate-600 text-[10px]"
          >{mass} g nước</text
        >
        <line x1="190" y1="104" x2="190" y2="196" stroke="#94a3b8" stroke-width="4" />
        <circle cx="190" cy="198" r="5" fill="#dc2626" />
      </svg>
    </figure>
    <Thermometer {celsius} min={20} max={MAX_T} major={10} minor={1} height={240} />
  </div>

  <FeedbackNote tone={feedback.tone} text={feedback.text} />

  <div class="grid gap-3 sm:grid-cols-2">
    <SegmentedControl
      label="Lượng nước trong bình"
      options={MASSES}
      bind:value={mass}
      onchange={(v) => pour(String(v))}
    />
    <SegmentedControl label="Tốc độ thời gian" options={SPEEDS} bind:value={speed} />
  </div>
  <div class="flex flex-wrap gap-2">
    <button
      type="button"
      class={heating ? button.secondary : button.primary}
      onclick={() => {
        heating = !heating;
        note = '';
      }}
      disabled={!heating && celsius >= MAX_T - 0.01}
    >
      {heating ? 'Tắt nguồn' : 'Bật nguồn'}
    </button>
    <button type="button" class={button.secondary} onclick={record}>Ghi số liệu</button>
    <button type="button" class={button.quiet} onclick={resetMeter} disabled={heating}>
      Đặt joulemeter về 0
    </button>
    <button type="button" class={button.quiet} onclick={() => pour(mass)}>Đổ nước mới</button>
  </div>

  <div class="grid gap-4 md:grid-cols-2">
    {#each MASSES as m (m.value)}
      {@const list = rows[m.value]}
      {@const inc = increments(list)}
      <div class="{card} overflow-x-auto p-2">
        <table class="w-full text-sm tabular-nums">
          <caption class="pb-1 text-left font-semibold" style:color={COLORS[m.value]}>
            Bảng số liệu với {m.label}
          </caption>
          <thead>
            <tr class="text-left text-slate-600">
              <th class="px-1 font-semibold">Lần đo</th>
              <th class="px-1 font-semibold">t (°C)</th>
              <th class="px-1 font-semibold">Joulemeter (J)</th>
              <th class="px-1 font-semibold">Năng lượng nhận (J)</th>
            </tr>
          </thead>
          <tbody>
            {#each list as r, i (i)}
              <tr class="border-t border-slate-100">
                <td class="px-1"
                  >{i === 0 ? 'Bắt đầu đo' : `Tăng ${formatNumber(inc[i].rise)} °C`}</td
                >
                <td class="px-1">{formatFixed(r.celsius, 1)}</td>
                <td class="px-1">{fmt(r.joules)}</td>
                <td class="px-1">{fmt(inc[i].energy)}</td>
              </tr>
            {:else}
              <tr><td colspan="4" class="px-1 text-slate-500">Chưa có số liệu.</td></tr>
            {/each}
          </tbody>
        </table>
      </div>
    {/each}
  </div>

  <figure class="{card} p-2">
    <svg
      viewBox="0 0 {PW} {PH}"
      class="mx-auto block w-full max-w-md"
      role="img"
      aria-label="Đồ thị năng lượng nhận được theo độ tăng nhiệt độ của nước: {series
        .map((s) => `${s.mass} gam có ${s.pts.length} điểm`)
        .join(', ')}."
    >
      {#each xTicks as r (r)}
        <line x1={px(r)} y1={Y0} x2={px(r)} y2="14" stroke="#e2e8f0" />
        <text x={px(r)} y={Y0 + 14} text-anchor="middle" class="fill-slate-600 text-[10px]"
          >{r}</text
        >
      {/each}
      {#each yTicks as e (e)}
        <line x1={X0} y1={py(e)} x2={PW - 14} y2={py(e)} stroke="#e2e8f0" />
        <text x={X0 - 4} y={py(e) + 3} text-anchor="end" class="fill-slate-600 text-[10px]"
          >{fmt(e)}</text
        >
      {/each}
      <line x1={X0} y1={Y0} x2={PW - 14} y2={Y0} stroke="#334155" />
      <line x1={X0} y1={Y0} x2={X0} y2="14" stroke="#334155" />
      <text x={(X0 + PW) / 2} y={PH - 4} text-anchor="middle" class="fill-slate-700 text-[10px]"
        >Độ tăng nhiệt độ (°C)</text
      >
      <text x="10" y="10" class="fill-slate-700 text-[10px]">Năng lượng (J)</text>
      {#each series as s (s.mass)}
        {#if Number.isFinite(s.k)}
          {@const end = Math.min(XMAX, YMAX / s.k)}
          <line
            x1={px(0)}
            y1={py(0)}
            x2={px(end)}
            y2={py(end * s.k)}
            stroke={COLORS[s.mass]}
            stroke-dasharray="4 3"
          />
        {/if}
        {#each s.pts as p, i (i)}
          {#if s.mass === '100'}
            <circle cx={px(p.rise)} cy={py(p.energy)} r="4" fill={COLORS[s.mass]} />
          {:else}
            <rect
              x={px(p.rise) - 4}
              y={py(p.energy) - 4}
              width="8"
              height="8"
              fill={COLORS[s.mass]}
            />
          {/if}
        {/each}
      {/each}
    </svg>
    <figcaption class="text-center text-xs text-slate-600">
      ● 100 g nước &nbsp; ■ 200 g nước. Đường nét đứt đi qua gốc tọa độ, gần các điểm đo nhất.
    </figcaption>
  </figure>
</div>
