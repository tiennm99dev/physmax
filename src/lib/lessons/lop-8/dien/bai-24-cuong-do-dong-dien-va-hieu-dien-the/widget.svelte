<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { formatFixed, formatNumber } from '#lib/core/number-format.js';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { button, card } from '#lib/core/ui.js';
  import CircuitSymbol from '../_shared/circuit-symbol.svelte';
  import { AMMETER, SOURCES, VOLTMETER, needleAngle, readBench } from './engine.js';

  /** @typedef {import('./engine.js').Placement} Placement */

  const L = 40;
  const R = 320;
  const T = 95;
  const B = 205;
  const LAMP_X = 200;
  const SW_X = 105;
  const BR_L = 160;
  const BR_R = 240;

  let source = $state('3');
  let closed = $state(true);
  let aAt = $state('khong');
  let aPol = $state('dung');
  let vAt = $state('khong');
  let vPol = $state('dung');

  const voltage = $derived(Number(source));
  const bench = $derived(
    readBench({
      voltage,
      closed,
      ammeter: { at: /** @type {Placement} */ (aAt), plusToPositive: aPol === 'dung' },
      voltmeter: { at: /** @type {Placement} */ (vAt), plusToPositive: vPol === 'dung' },
    }),
  );
  const glow = $derived(bench.lampCurrent / 0.75);

  const PLACES = [
    { value: 'noi-tiep', label: 'Nối tiếp với đèn' },
    { value: 'song-song', label: 'Song song với đèn' },
    { value: 'khong', label: 'Chưa mắc' },
  ];
  const POLES = [
    { value: 'dung', label: 'Chốt (+) về phía cực (+)' },
    { value: 'nguoc', label: 'Mắc ngược chốt' },
  ];

  /** @param {number | null} v @param {number} digits @param {string} unit */
  function readout(v, digits, unit) {
    if (v === null) return 'chưa mắc';
    if (!Number.isFinite(v)) return 'kim vọt quá giới hạn đo!';
    if (v < 0) return 'kim lệch ngược (dưới vạch 0)';
    return `${formatFixed(v, digits)} ${unit}`;
  }

  const feedback = $derived.by(() => {
    const e = bench.errors;
    if (e.includes('ak-song-song'))
      return {
        tone: /** @type {'ok' | 'warn' | 'info'} */ ('warn'),
        text: 'Sai: ampe kế mắc song song với đèn. Ampe kế gần như không cản trở dòng điện nên nối tắt đèn: đèn tắt, dòng điện qua ampe kế rất lớn, có thể làm hỏng ampe kế và nguồn. Ampe kế phải mắc nối tiếp.',
      };
    if (e.includes('vk-noi-tiep'))
      return {
        tone: /** @type {'ok' | 'warn' | 'info'} */ ('warn'),
        text: `Sai: vôn kế mắc nối tiếp. Vôn kế cản trở dòng điện rất mạnh nên mạch gần như không có dòng điện, đèn tắt, vôn kế chỉ gần bằng hiệu điện thế của nguồn (${formatNumber(voltage)} V). Vôn kế phải mắc song song với đèn.`,
      };
    if (e.includes('ak-nguoc') || e.includes('vk-nguoc'))
      return {
        tone: /** @type {'ok' | 'warn' | 'info'} */ ('warn'),
        text: `Kim ${e.includes('ak-nguoc') ? 'ampe kế' : 'vôn kế'} lệch ngược về phía dưới vạch 0: chốt (+) phải nối về phía cực dương của nguồn, chốt (−) về phía cực âm. Hãy đổi hai dây ở hai chốt.`,
      };
    if (!closed)
      return {
        tone: /** @type {'ok' | 'warn' | 'info'} */ ('info'),
        text: 'Công tắc mở: không có dòng điện, kim các dụng cụ đo chỉ vạch 0.',
      };
    if (bench.ammeter === null || bench.voltmeter === null)
      return {
        tone: /** @type {'ok' | 'warn' | 'info'} */ ('info'),
        text: 'Đèn sáng. Hãy mắc đủ cả ampe kế và vôn kế để đo cường độ dòng điện qua đèn và hiệu điện thế giữa hai đầu đèn.',
      };
    return {
      tone: /** @type {'ok' | 'warn' | 'info'} */ ('ok'),
      text: `Mắc đúng! Cường độ dòng điện qua đèn I = ${formatFixed(bench.ammeter, 2)} A; hiệu điện thế giữa hai đầu đèn U = ${formatFixed(bench.voltmeter, 1)} V. Đổi nguồn điện: hiệu điện thế càng lớn, cường độ dòng điện càng lớn, đèn càng sáng.`,
    };
  });

  /** Tick values along a dial. @param {number} range @param {number} step */
  const ticks = (range, step) =>
    Array.from(
      { length: Math.round(range / step) + 1 },
      (_, i) => Math.round(i * step * 1000) / 1000,
    );

  /** @param {number} deg @param {number} r */
  const onDial = (deg, r) => ({
    x: 80 + r * Math.sin((deg * Math.PI) / 180),
    y: 92 - r * Math.cos((deg * Math.PI) / 180),
  });
</script>

{#snippet dial(
  /** @type {string} */ letter,
  /** @type {number | null} */ value,
  /** @type {{ range: number, division: number }} */ spec,
  /** @type {number} */ tickStep,
  /** @type {number} */ labelStep,
  /** @type {number} */ digits,
)}
  {@const angle = needleAngle(value ?? 0, spec.range)}
  {@const tip = onDial(angle, 62)}
  <figure class="{card} p-2 text-center">
    <svg viewBox="0 0 160 112" class="mx-auto block w-full max-w-[220px]" aria-hidden="true">
      <rect x="4" y="4" width="152" height="104" rx="10" fill="#f8fafc" stroke="#94a3b8" />
      {#each ticks(spec.range, tickStep) as v (v)}
        {@const a = -60 + (120 * v) / spec.range}
        {@const major = Math.abs(v / labelStep - Math.round(v / labelStep)) < 1e-6}
        {@const p1 = onDial(a, 68)}
        {@const p2 = onDial(a, major ? 58 : 63)}
        <line
          x1={p1.x}
          y1={p1.y}
          x2={p2.x}
          y2={p2.y}
          stroke="#334155"
          stroke-width={major ? 1.5 : 0.8}
        />
        {#if major}
          {@const p3 = onDial(a, 46)}
          <text x={p3.x} y={p3.y + 3} text-anchor="middle" class="fill-slate-700 text-[9px]"
            >{formatNumber(v)}</text
          >
        {/if}
      {/each}
      <text x="80" y="80" text-anchor="middle" class="fill-slate-800 text-[16px] font-bold"
        >{letter}</text
      >
      {#if value !== null}
        <line
          x1="80"
          y1="92"
          x2={tip.x}
          y2={tip.y}
          stroke="#dc2626"
          stroke-width="2"
          style="transition: all 0.4s"
        />
      {/if}
      <circle cx="80" cy="92" r="4" fill="#1e293b" />
    </svg>
    <figcaption>
      <span class="block text-xs text-slate-600">
        GHĐ {formatNumber(spec.range)}
        {letter} – ĐCNN {formatNumber(spec.division)}
        {letter}
      </span>
      <span class="mt-1 block text-sm font-semibold tabular-nums" aria-live="polite">
        {letter === 'A' ? 'Ampe kế' : 'Vôn kế'}: {readout(value, digits, letter)}
      </span>
    </figcaption>
  </figure>
{/snippet}

<div class="space-y-4">
  <figure class="{card} overflow-hidden p-2">
    <svg
      viewBox="0 0 360 240"
      class="mx-auto block w-full max-w-md select-none"
      role="img"
      aria-label="Sơ đồ mạch: nguồn {formatNumber(voltage)} vôn, công tắc {closed
        ? 'đóng'
        : 'mở'}, bóng đèn {bench.lampOn ? 'sáng' : 'tắt'}; ampe kế {PLACES.find(
        (p) => p.value === aAt,
      )?.label.toLowerCase()}, vôn kế {PLACES.find((p) => p.value === vAt)?.label.toLowerCase()}."
    >
      <!-- main loop wires -->
      <g stroke="#1e293b" stroke-width="2" fill="none">
        <polyline points="{L},{T + 30} {L},{T} {SW_X - 28},{T}" />
        <line x1={SW_X + 28} y1={T} x2={LAMP_X - 20} y2={T} />
        <polyline points="{LAMP_X + 20},{T} {R},{T} {R},{B} {L},{B} {L},{B - 30}" />
      </g>
      <!-- source on the left, + at the top: the current runs clockwise -->
      <CircuitSymbol kind="pin" x={L} y={(T + B) / 2} angle={-90} len={50} />
      <text x={L + 18} y={(T + B) / 2 + 4} class="fill-slate-600 text-[11px]"
        >{formatNumber(voltage)} V</text
      >
      <CircuitSymbol kind="cong-tac" x={SW_X} y={T} len={56} {closed} />
      <text x={SW_X} y={T + 22} text-anchor="middle" class="fill-slate-600 text-[11px]">K</text>
      {#if bench.lampOn}
        <circle cx={LAMP_X} cy={T} r={14 + 14 * glow} fill="#fde68a" opacity={0.3 + 0.5 * glow} />
      {/if}
      <CircuitSymbol kind="den" x={LAMP_X} y={T} len={40} active={bench.lampOn} />
      <text x={LAMP_X} y={T - 18} text-anchor="middle" class="fill-slate-600 text-[11px]">Đ</text>

      <!-- ammeter -->
      {#if aAt === 'noi-tiep'}
        <rect x="150" y={B - 18} width="60" height="36" fill="#fff" />
        <CircuitSymbol
          kind="ampe-ke"
          x={180}
          y={B}
          angle={180}
          len={60}
          flipped={aPol !== 'dung'}
        />
      {:else if aAt === 'song-song'}
        <polyline
          points="{BR_L},{T} {BR_L},{T + 50} {BR_R},{T + 50} {BR_R},{T}"
          fill="none"
          stroke="#1e293b"
          stroke-width="2"
        />
        <rect x={LAMP_X - 30} y={T + 32} width="60" height="36" fill="#fff" />
        <CircuitSymbol kind="ampe-ke" x={LAMP_X} y={T + 50} len={60} flipped={aPol !== 'dung'} />
        <circle cx={BR_L} cy={T} r="4" fill="#1e293b" />
        <circle cx={BR_R} cy={T} r="4" fill="#1e293b" />
      {/if}

      <!-- voltmeter -->
      {#if vAt === 'song-song'}
        <polyline
          points="{BR_L - 8},{T} {BR_L - 8},{T - 55} {BR_R + 8},{T - 55} {BR_R + 8},{T}"
          fill="none"
          stroke="#1e293b"
          stroke-width="2"
        />
        <rect x={LAMP_X - 30} y={T - 73} width="60" height="36" fill="#fff" />
        <CircuitSymbol kind="von-ke" x={LAMP_X} y={T - 55} len={60} flipped={vPol !== 'dung'} />
        <circle cx={BR_L - 8} cy={T} r="4" fill="#1e293b" />
        <circle cx={BR_R + 8} cy={T} r="4" fill="#1e293b" />
      {:else if vAt === 'noi-tiep'}
        <rect x={R - 18} y={(T + B) / 2 - 30} width="36" height="60" fill="#fff" />
        <CircuitSymbol
          kind="von-ke"
          x={R}
          y={(T + B) / 2}
          angle={90}
          len={60}
          flipped={vPol !== 'dung'}
        />
      {/if}
    </svg>
  </figure>

  <div class="grid grid-cols-2 gap-3">
    {@render dial('A', bench.ammeter, AMMETER, 0.05, 0.2, 2)}
    {@render dial('V', bench.voltmeter, VOLTMETER, 0.2, 1, 1)}
  </div>

  <FeedbackNote tone={feedback.tone} text={feedback.text} />
  <div class="grid gap-3 sm:grid-cols-2">
    <SegmentedControl label="Ampe kế" options={PLACES} bind:value={aAt} />
    <SegmentedControl label="Vôn kế" options={PLACES} bind:value={vAt} />
    <SegmentedControl label="Chốt của ampe kế" options={POLES} bind:value={aPol} />
    <SegmentedControl label="Chốt của vôn kế" options={POLES} bind:value={vPol} />
  </div>
  <div class="flex flex-wrap items-end gap-3">
    <SegmentedControl
      label="Nguồn điện"
      options={SOURCES.map((u) => ({ value: String(u), label: `${formatNumber(u)} V` }))}
      bind:value={source}
    />
    <button
      type="button"
      class={button.secondary}
      aria-pressed={closed}
      onclick={() => (closed = !closed)}
    >
      {closed ? 'Mở công tắc' : 'Đóng công tắc'}
    </button>
  </div>
</div>
