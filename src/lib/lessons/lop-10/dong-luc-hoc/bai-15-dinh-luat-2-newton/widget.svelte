<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { frameLoop, reducedMotion } from '#lib/core/motion.js';
  import { formatFixed, formatNumber, numTex } from '#lib/core/number-format.js';
  import SliderField from '#lib/core/slider-field.svelte';
  import { button, card } from '#lib/core/ui.js';
  import { linear } from '#lib/core/visuals/svg-math.js';
  import { arrowHead, shaftEnd } from '#lib/domain/arrow.js';
  import DataPlot from './data-plot.svelte';
  import {
    FORCES,
    MASSES,
    TRACK,
    forceSeries,
    massSeries,
    measure,
    record,
    slopeThroughOrigin,
    travelTime,
  } from './engine.js';

  const W = 360;
  const H = 110;
  const GROUND = 84;
  const rx = linear(0, TRACK, 40, W - 70);

  let force = $state(2);
  let mass = $state(1);
  let time = $state(0);
  let playing = $state(false);
  /** @type {import('./engine.js').Reading[]} */
  let readings = $state([]);
  /** @type {(() => void) | null} */
  let stopLoop = null;

  const a = $derived(force / mass);
  const x = $derived(Math.min(TRACK, (a * time * time) / 2));
  const cartX = $derived(rx.map(x));
  const blocks = $derived(Math.round(mass / 0.5));
  const forceTip = $derived(cartX + 22 + force * 7);
  const forceEnd = $derived(shaftEnd(cartX + 22, GROUND - 15, forceTip, GROUND - 15, 8));

  const byForce = $derived(forceSeries(readings, mass));
  const byMass = $derived(massSeries(readings, force));
  const slopeF = $derived(slopeThroughOrigin(byForce));
  const slopeM = $derived(slopeThroughOrigin(byMass));
  const lastRows = $derived(readings.slice(-6).toReversed());

  function halt() {
    stopLoop?.();
    stopLoop = null;
    playing = false;
  }

  function save() {
    readings = record(readings, measure(force, mass));
  }

  function run() {
    halt();
    const total = travelTime(force, mass);
    if (reducedMotion()) {
      time = total;
      save();
      return;
    }
    time = 0;
    playing = true;
    stopLoop = frameLoop((dt) => {
      time = Math.min(total, time + dt);
      if (time >= total) {
        halt();
        save();
      }
    });
  }

  function measureAllForces() {
    halt();
    time = 0;
    readings = FORCES.reduce((all, f) => record(all, measure(f, mass)), readings);
  }

  function measureAllMasses() {
    halt();
    time = 0;
    readings = MASSES.reduce((all, m) => record(all, measure(force, m)), readings);
  }

  function clear() {
    halt();
    time = 0;
    readings = [];
  }

  /** @param {number} value */
  function pickForce(value) {
    halt();
    force = value;
    time = 0;
  }

  /** @param {number} value */
  function pickMass(value) {
    halt();
    mass = value;
    time = 0;
  }

  const note = $derived.by(() => {
    if (readings.length === 0) {
      return 'Chọn lực và khối lượng rồi cho xe chạy. Đồng hồ đo thời gian xe đi hết $1$ m, từ đó tính $a = \\dfrac{2d}{t^2}$.';
    }
    if (byForce.length >= 3 && slopeF !== null) {
      return `Với $m = ${numTex(mass, 1)}$ kg, các điểm $a - F$ nằm trên đường thẳng qua gốc toạ độ, độ dốc $\\approx ${numTex(slopeF, 2)}$, xấp xỉ $\\dfrac{1}{m}$: $a$ tỉ lệ thuận với $F$.`;
    }
    if (byMass.length >= 3 && slopeM !== null) {
      return `Với $F = ${formatNumber(force)}$ N, các điểm $a - \\dfrac{1}{m}$ nằm trên đường thẳng qua gốc toạ độ, độ dốc $\\approx ${numTex(slopeM, 2)}$, xấp xỉ $F$: $a$ tỉ lệ nghịch với $m$.`;
    }
    return 'Cần ít nhất ba điểm trên một đồ thị: giữ nguyên khối lượng và đổi lực, hoặc giữ nguyên lực và đổi khối lượng.';
  });

  $effect(() => () => stopLoop?.());
</script>

<div class="space-y-4">
  <div class="{card} overflow-hidden p-2">
    <svg
      viewBox="0 0 {W} {H}"
      class="w-full select-none"
      role="img"
      aria-label={`Xe khối lượng ${formatNumber(mass, 1)} ki lô gam chịu lực ${formatNumber(force)} niutơn, đi hết một mét trên đường ray.`}
    >
      <line x1="14" y1={GROUND} x2={W - 14} y2={GROUND} stroke="#475569" stroke-width="2" />
      <line
        x1={rx.map(0)}
        y1={GROUND - 42}
        x2={rx.map(0)}
        y2={GROUND + 6}
        stroke="#059669"
        stroke-dasharray="3 3"
      />
      <line
        x1={rx.map(TRACK)}
        y1={GROUND - 42}
        x2={rx.map(TRACK)}
        y2={GROUND + 6}
        stroke="#059669"
        stroke-dasharray="3 3"
      />
      <text x={rx.map(0)} y={GROUND + 20} font-size="11" fill="#475569" text-anchor="middle"
        >0 m</text
      >
      <text x={rx.map(TRACK)} y={GROUND + 20} font-size="11" fill="#475569" text-anchor="middle"
        >1 m</text
      >

      <rect x={cartX - 22} y={GROUND - 22} width="44" height="14" rx="3" fill="#4f46e5" />
      <circle cx={cartX - 13} cy={GROUND - 5} r="5" fill="#1e293b" />
      <circle cx={cartX + 13} cy={GROUND - 5} r="5" fill="#1e293b" />
      {#each { length: blocks } as _, i (i)}
        <rect
          x={cartX - 20 + i * 8}
          y={GROUND - 32}
          width="7"
          height="10"
          fill="#f59e0b"
          stroke="#b45309"
        />
      {/each}

      <line
        x1={cartX + 22}
        y1={GROUND - 15}
        x2={forceEnd.x}
        y2={forceEnd.y}
        stroke="#e11d48"
        stroke-width="3"
      />
      <polygon
        points={arrowHead(cartX + 22, GROUND - 15, forceTip, GROUND - 15, 8)}
        fill="#e11d48"
      />
      <text x={cartX + 24} y={GROUND - 24} font-size="12" font-weight="700" fill="#e11d48">F</text>
    </svg>
  </div>

  <div class="grid gap-3 sm:grid-cols-2">
    <SliderField
      label="Lực kéo F"
      value={force}
      min={1}
      max={5}
      step={1}
      unit="N"
      oninput={pickForce}
    />
    <SliderField
      label="Khối lượng m"
      value={mass}
      min={0.5}
      max={2.5}
      step={0.5}
      unit="kg"
      format={(v) => formatNumber(v, 1)}
      oninput={pickMass}
    />
  </div>

  <div class="flex flex-wrap gap-2">
    <button type="button" class={button.primary} onclick={run} disabled={playing}
      >Cho xe chạy</button
    >
    <button type="button" class={button.quiet} onclick={measureAllForces}
      >Đo nhanh năm mức lực</button
    >
    <button type="button" class={button.quiet} onclick={measureAllMasses}
      >Đo nhanh năm khối lượng</button
    >
    <button type="button" class={button.quiet} onclick={clear}>Xoá số liệu</button>
  </div>

  <div class="grid gap-3 sm:grid-cols-2">
    <figure class="{card} p-2">
      <figcaption class="text-center text-sm font-semibold text-slate-700">
        {`a theo F, với m = ${formatNumber(mass, 1)} kg`}
      </figcaption>
      <DataPlot
        points={byForce}
        slope={slopeF}
        xMax={5}
        yMax={10}
        xTicks={[0, 1, 2, 3, 4, 5]}
        yTicks={[0, 2, 4, 6, 8, 10]}
        xLabel="F (N)"
        yLabel="a (m/s²)"
        label={`Đồ thị gia tốc theo lực, ${byForce.length} điểm đo`}
      />
    </figure>
    <figure class="{card} p-2">
      <figcaption class="text-center text-sm font-semibold text-slate-700">
        {`a theo 1/m, với F = ${formatNumber(force)} N`}
      </figcaption>
      <DataPlot
        points={byMass}
        slope={slopeM}
        xMax={2}
        yMax={10}
        xTicks={[0, 0.5, 1, 1.5, 2]}
        yTicks={[0, 2, 4, 6, 8, 10]}
        xLabel="1/m (kg⁻¹)"
        yLabel="a (m/s²)"
        label={`Đồ thị gia tốc theo nghịch đảo khối lượng, ${byMass.length} điểm đo`}
      />
    </figure>
  </div>

  {#if readings.length > 0}
    <div class="overflow-x-auto">
      <table class="w-full text-center text-sm tabular-nums">
        <caption class="mb-1 text-left font-semibold text-slate-700">Số liệu mới nhất</caption>
        <thead>
          <tr class="bg-slate-100">
            <th scope="col" class="px-2 py-1 font-semibold">F (N)</th>
            <th scope="col" class="px-2 py-1 font-semibold">m (kg)</th>
            <th scope="col" class="px-2 py-1 font-semibold">t (s)</th>
            <th scope="col" class="px-2 py-1 font-semibold">a = 2d/t² (m/s²)</th>
          </tr>
        </thead>
        <tbody>
          {#each lastRows as row (`${row.force}-${row.mass}`)}
            <tr class="border-b border-slate-100">
              <td class="px-2 py-1">{formatNumber(row.force)}</td>
              <td class="px-2 py-1">{formatNumber(row.mass, 1)}</td>
              <td class="px-2 py-1">{formatFixed(row.time, 2)}</td>
              <td class="px-2 py-1">{formatFixed(row.acceleration, 2)}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  {/if}

  <FeedbackNote tone={byForce.length >= 3 || byMass.length >= 3 ? 'ok' : 'info'} text={note} />
</div>
