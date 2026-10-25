<script>
  import { prefersReducedMotion } from 'svelte/motion';
  import { button } from '#lib/core/ui.js';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import { formatNumber } from '#lib/units-engine/format.js';
  import { flatNetwork, solveCircuit } from './circuit.js';

  /**
   * A circuit of a source and one to four resistors, all in series (nối tiếp)
   * or all in parallel (song song), with a switch and an ammeter. The Ohm
   * solver gives the current, voltage and power of every resistor; moving
   * dots along the wires show the current (still when the reader prefers
   * reduced motion, and when the switch is open).
   *
   * - `mode` (bindable): `'series'` or `'parallel'`.
   * - `resistors` (bindable): resistances in ohms.
   * - `voltage` (bindable): source voltage in volts.
   * - `closed` (bindable): whether the switch (khoá K) is closed.
   * - `interactive`: show controls for mode, voltage, each resistance and the
   *   switch, and buttons to add or remove a resistor.
   * - `maxVoltage`, `maxResistance`, `resistanceStep`: control ranges.
   *
   * @type {{
   *   mode?: 'series' | 'parallel';
   *   resistors?: number[];
   *   voltage?: number;
   *   closed?: boolean;
   *   interactive?: boolean;
   *   maxVoltage?: number;
   *   maxResistance?: number;
   *   resistanceStep?: number;
   *   label?: string;
   * }}
   */
  let {
    mode = $bindable('series'),
    resistors = $bindable([10, 20]),
    voltage = $bindable(12),
    closed = $bindable(true),
    interactive = false,
    maxVoltage = 24,
    maxResistance = 100,
    resistanceStep = 1,
    label = 'Mạch điện',
  } = $props();

  const W = 480;
  const LEFT = 48;
  const RIGHT = 432;
  const ROW = 64;
  const TOP = 44;

  // An open switch is an infinite resistance in series with the whole network.
  const solution = $derived(
    solveCircuit(
      closed
        ? flatNetwork(mode, resistors)
        : {
            type: 'series',
            items: [flatNetwork(mode, resistors), { type: 'resistor', r: Infinity }],
          },
      voltage,
    ),
  );
  // The gap of an open switch comes last; it is not one of the resistors.
  const readings = $derived(solution.resistors.slice(0, resistors.length));
  const current = $derived(closed ? solution.current : 0);
  const H = $derived(mode === 'series' ? 200 : TOP + ROW * resistors.length + 60);
  const bottom = $derived(H - 36);

  const fmt = (/** @type {number} */ v) => (Number.isFinite(v) ? formatNumber(v, 2) : '∞');

  /** Centres of the resistor symbols. */
  const slots = $derived(
    resistors.map((_, i) =>
      mode === 'series'
        ? { x: 150 + ((RIGHT - 150) * (i + 0.5)) / resistors.length, y: TOP }
        : { x: (170 + 380) / 2, y: TOP + ROW * i },
    ),
  );

  /** Wire loop as a path, for the moving current dots (clockwise, + to −). */
  const loop = $derived(
    mode === 'series'
      ? `M ${LEFT} ${H / 2 - 18} V ${TOP} H ${RIGHT} V ${bottom} H ${LEFT} V ${H / 2 + 18}`
      : `M ${LEFT} ${H / 2 - 18} V ${TOP} H 170 V ${TOP + ROW * (resistors.length - 1)} H ${RIGHT} V ${bottom} H ${LEFT} V ${H / 2 + 18}`,
  );
  // Faster dots for a bigger current: one animation cycle takes 6 s at 0.1 A, capped.
  const lap = $derived(current > 0 ? Math.max(0.6, Math.min(12, 0.6 / current)) : 0);
  const moving = $derived(current > 0 && Number.isFinite(current) && !prefersReducedMotion.current);

  /** @param {number} i @param {number} r */
  function setResistance(i, r) {
    resistors = resistors.map((old, j) => (j === i ? r : old));
  }
  function addResistor() {
    if (resistors.length < 4) resistors = [...resistors, 10];
  }
  function removeResistor() {
    if (resistors.length > 1) resistors = resistors.slice(0, -1);
  }

  const summary = $derived(
    !closed
      ? 'Khoá K mở: mạch hở, không có dòng điện.'
      : `Điện trở tương đương ${fmt(solution.resistance)} Ω, cường độ dòng điện ${fmt(current)} A.`,
  );
</script>

<figure class="space-y-3">
  <svg
    viewBox="0 0 {W} {H}"
    class="mx-auto block w-full max-w-xl select-none rounded-xl border border-slate-200 bg-white"
    style:aspect-ratio="{W} / {H}"
    role="img"
    aria-label="{label}: nguồn {fmt(voltage)} V, {resistors.length} điện trở mắc {mode === 'series'
      ? 'nối tiếp'
      : 'song song'}. {summary}"
  >
    <g stroke="#334155" stroke-width="2.5" fill="none">
      <!-- source on the left side, long plate is + -->
      <path d="M {LEFT} {H / 2 - 18} V {TOP} H {mode === 'series' ? RIGHT : 170}" />
      <path d="M {LEFT} {H / 2 + 18} V {bottom} H {RIGHT - 70}" />
      <path
        d="M {RIGHT - 30} {bottom} H {RIGHT} V {mode === 'series'
          ? TOP
          : TOP + ROW * (resistors.length - 1)}"
      />
      {#if mode === 'parallel'}
        <path d="M 170 {TOP} V {TOP + ROW * (resistors.length - 1)}" />
        <path d="M 380 {TOP} V {TOP + ROW * (resistors.length - 1)} H {RIGHT}" />
        {#each slots as s, i (i)}
          <path d="M 170 {s.y} H 380" />
        {/each}
      {/if}
    </g>
    <line
      x1={LEFT - 18}
      y1={H / 2 - 6}
      x2={LEFT + 18}
      y2={H / 2 - 6}
      stroke="#334155"
      stroke-width="3"
    />
    <line
      x1={LEFT - 9}
      y1={H / 2 + 6}
      x2={LEFT + 9}
      y2={H / 2 + 6}
      stroke="#334155"
      stroke-width="6"
    />
    <line x1={LEFT} y1={H / 2 - 18} x2={LEFT} y2={H / 2 - 6} stroke="#334155" stroke-width="2.5" />
    <line x1={LEFT} y1={H / 2 + 6} x2={LEFT} y2={H / 2 + 18} stroke="#334155" stroke-width="2.5" />
    <text x={LEFT + 24} y={H / 2 - 4} font-size="13" font-weight="700" fill="#D7263D">+</text>
    <text x={LEFT + 24} y={H / 2 + 16} font-size="13" font-weight="700" fill="#2E86AB">−</text>
    <text x={LEFT - 22} y={H / 2 + 34} font-size="12" fill="#334155">{fmt(voltage)} V</text>

    {#if moving}
      <path
        d={loop}
        class="flow"
        fill="none"
        stroke="#E9B10A"
        stroke-width="4"
        stroke-linecap="round"
        stroke-dasharray="2 26"
        style:animation-duration="{lap}s"
      />
    {/if}

    <!-- switch K on the bottom wire -->
    <circle cx={RIGHT - 70} cy={bottom} r="3.5" fill="#334155" />
    <circle cx={RIGHT - 30} cy={bottom} r="3.5" fill="#334155" />
    <line
      x1={RIGHT - 70}
      y1={bottom}
      x2={closed ? RIGHT - 30 : RIGHT - 36}
      y2={closed ? bottom : bottom - 20}
      stroke="#334155"
      stroke-width="3"
    />
    <text x={RIGHT - 54} y={bottom + 22} font-size="12" fill="#334155">K</text>

    <!-- ammeter on the bottom wire -->
    <circle
      cx={(LEFT + RIGHT) / 2 - 40}
      cy={bottom}
      r="15"
      fill="#fff"
      stroke="#334155"
      stroke-width="2.5"
    />
    <text
      x={(LEFT + RIGHT) / 2 - 40}
      y={bottom + 5}
      text-anchor="middle"
      font-size="14"
      font-weight="700"
      fill="#334155">A</text
    >
    <text
      x={(LEFT + RIGHT) / 2 - 40}
      y={bottom + 32}
      text-anchor="middle"
      font-size="12"
      fill="#334155">{fmt(current)} A</text
    >

    {#each slots as s, i (i)}
      <rect
        x={s.x - 28}
        y={s.y - 9}
        width="56"
        height="18"
        fill="#fff"
        stroke="#4F46E5"
        stroke-width="2.5"
      />
      <text
        x={s.x}
        y={s.y - 15}
        text-anchor="middle"
        font-size="12"
        font-weight="700"
        fill="#4F46E5">{readings[i]?.label} = {fmt(resistors[i])} Ω</text
      >
      <text x={s.x} y={s.y + 26} text-anchor="middle" font-size="11" fill="#475569"
        >{fmt(readings[i]?.voltage ?? 0)} V · {fmt(closed ? (readings[i]?.current ?? 0) : 0)} A</text
      >
    {/each}
  </svg>

  {#if interactive}
    <div class="grid gap-3 sm:grid-cols-2">
      <SegmentedControl
        label="Cách mắc"
        options={[
          { value: 'series', label: 'Nối tiếp' },
          { value: 'parallel', label: 'Song song' },
        ]}
        bind:value={mode}
      />
      <SliderField
        label="Hiệu điện thế U"
        bind:value={voltage}
        min={0}
        max={maxVoltage}
        step={0.5}
        unit="V"
      />
      {#each resistors as r, i (i)}
        <SliderField
          label="Điện trở R{i + 1}"
          value={r}
          min={resistanceStep}
          max={maxResistance}
          step={resistanceStep}
          unit="Ω"
          oninput={(v) => setResistance(i, v)}
        />
      {/each}
    </div>
    <div class="flex flex-wrap gap-2">
      <button
        type="button"
        class={button.secondary}
        onclick={() => (closed = !closed)}
        aria-pressed={closed}
      >
        {closed ? 'Mở khoá K' : 'Đóng khoá K'}
      </button>
      <button
        type="button"
        class={button.quiet}
        onclick={addResistor}
        disabled={resistors.length >= 4}
      >
        Thêm điện trở
      </button>
      <button
        type="button"
        class={button.quiet}
        onclick={removeResistor}
        disabled={resistors.length <= 1}
      >
        Bớt điện trở
      </button>
    </div>
  {/if}

  <figcaption
    class="text-center text-sm font-semibold text-slate-700 tabular-nums"
    aria-live="polite"
  >
    {summary}
  </figcaption>
</figure>

<style>
  .flow {
    animation-name: flow;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
  }
  @keyframes flow {
    to {
      stroke-dashoffset: -280;
    }
  }
</style>
