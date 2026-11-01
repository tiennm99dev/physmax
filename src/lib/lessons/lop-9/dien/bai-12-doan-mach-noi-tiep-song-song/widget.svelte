<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { formatNumber, numTex, tidy } from '#lib/core/number-format.js';
  import { card } from '#lib/core/ui.js';
  import CircuitBoard from '#lib/domain/circuit-board.svelte';
  import MeterDial from '#lib/domain/meter-dial.svelte';
  import {
    AMMETER_SCALES,
    VOLTMETER_SCALES,
    equivalent,
    obeysLaws,
    pickScale,
    readings,
  } from './engine.js';

  /** @type {'series' | 'parallel'} */
  let mode = $state('series');
  let resistors = $state([10, 20]);
  let voltage = $state(12);
  let closed = $state(true);
  let ammeterAt = $state('main');
  let voltmeterAt = $state('main');
  /** Meter positions already tried, per circuit shape `${mode}-${count}`. */
  /** @type {Record<string, { A: string[], V: string[] }>} */
  let visited = $state({});

  const shape = $derived(`${mode}-${resistors.length}`);
  const r = $derived(readings(mode, resistors, voltage, closed));
  const positions = $derived(['main', ...resistors.map((_, i) => String(i))]);
  const aPos = $derived(positions.includes(ammeterAt) ? ammeterAt : 'main');
  const vPos = $derived(positions.includes(voltmeterAt) ? voltmeterAt : 'main');
  const at = (/** @type {string} */ pos) => (pos === 'main' ? r.main : r.parts[Number(pos)]);
  // A removed resistor takes its meter position with it: move the meter back
  // to the main circuit so its control always shows where it is.
  $effect(() => {
    if (!positions.includes(ammeterAt)) ammeterAt = 'main';
    if (!positions.includes(voltmeterAt)) voltmeterAt = 'main';
  });
  const aValue = $derived(at(aPos).i);
  const vValue = $derived(at(vPos).u);
  const aScale = $derived(pickScale(AMMETER_SCALES, aValue));
  const vScale = $derived(pickScale(VOLTMETER_SCALES, vValue));

  const seenA = $derived([...new Set([...(visited[shape]?.A ?? []), aPos])]);
  const seenV = $derived([...new Set([...(visited[shape]?.V ?? []), vPos])]);
  const allA = $derived(positions.every((p) => seenA.includes(p)));
  const allV = $derived(positions.every((p) => seenV.includes(p)));

  /** Where each meter stood before its last move: it was read there too. */
  const last = { A: 'main', V: 'main' };

  /** @param {'A' | 'V'} kind @param {string} pos */
  function visit(kind, pos) {
    const old = visited[shape] ?? { A: [], V: [] };
    const from = positions.includes(last[kind]) ? last[kind] : 'main';
    last[kind] = pos;
    visited = {
      ...visited,
      [shape]: { ...old, [kind]: [...new Set([...old[kind], from, pos])] },
    };
  }

  const placeA = $derived(
    positions.map((p) => ({
      value: p,
      label: p === 'main' ? 'Mạch chính' : `Qua R${Number(p) + 1}`,
    })),
  );
  const placeV = $derived(
    positions.map((p) => ({
      value: p,
      label: p === 'main' ? 'Cả đoạn mạch' : `Hai đầu R${Number(p) + 1}`,
    })),
  );

  const f = (/** @type {number} */ v) => formatNumber(v, 3);
  const t = (/** @type {number} */ v) => numTex(v, 3);
  /** `=` when the rounded parts add up to the rounded total as shown, else `\approx`. */
  const sumSign = (/** @type {number} */ total, /** @type {number[]} */ parts) =>
    tidy(
      parts.reduce((s, p) => s + tidy(p, 3), 0),
      6,
    ) === tidy(total, 3)
      ? '='
      : '\\approx';
  const n = $derived(resistors.length);
  const idx = $derived(resistors.map((_, i) => i + 1));

  const currentLaw = $derived(
    mode === 'series'
      ? `$I = ${idx.map((i) => `I_${i}`).join(' = ')} = ${t(r.main.i)}$ A: cường độ dòng điện như nhau tại mọi điểm.`
      : `$I = ${idx.map((i) => `I_${i}`).join(' + ')}$: $${t(r.main.i)} ${sumSign(
          r.main.i,
          r.parts.map((p) => p.i),
        )} ${r.parts.map((p) => t(p.i)).join(' + ')}$ (A). Dòng điện mạch chính bằng tổng các dòng điện mạch rẽ.`,
  );
  const voltageLaw = $derived(
    mode === 'series'
      ? `$U = ${idx.map((i) => `U_${i}`).join(' + ')}$: $${t(r.main.u)} ${sumSign(
          r.main.u,
          r.parts.map((p) => p.u),
        )} ${r.parts.map((p) => t(p.u)).join(' + ')}$ (V). Hiệu điện thế giữa hai đầu đoạn mạch bằng tổng các hiệu điện thế thành phần.`
      : `$U = ${idx.map((i) => `U_${i}`).join(' = ')} = ${t(r.main.u)}$ V: hiệu điện thế hai đầu mỗi mạch rẽ bằng hiệu điện thế hai đầu đoạn mạch.`,
  );
  const resistanceLaw = $derived(
    mode === 'series'
      ? `$R_{\\text{tđ}} = ${idx.map((i) => `R_${i}`).join(' + ')} = ${numTex(equivalent(mode, resistors), 2)}\\ \\Omega$.`
      : `$\\dfrac{1}{R_{\\text{tđ}}} = ${idx.map((i) => `\\dfrac{1}{R_${i}}`).join(' + ')}$, nên $R_{\\text{tđ}} = ${numTex(equivalent(mode, resistors), 2)}\\ \\Omega$, nhỏ hơn mỗi điện trở thành phần.`,
  );

  const feedback = $derived.by(() => {
    if (!closed)
      return 'Khoá K đang mở: không có dòng điện, mọi ampe kế chỉ $0$. Đóng khoá K để đo.';
    const left = [];
    if (!allA) left.push(`ampe kế (${seenA.length}/${n + 1} vị trí)`);
    if (!allV) left.push(`vôn kế (${seenV.length}/${n + 1} vị trí)`);
    const parts = [];
    if (allA) parts.push(currentLaw);
    if (allV) parts.push(voltageLaw);
    if (allA && allV) {
      parts.push(resistanceLaw);
      if (!obeysLaws(mode, r)) parts.push('Kiểm tra lại số đo.');
    } else {
      parts.push(`Hãy đặt ${left.join(' và ')} vào mọi vị trí để so sánh các số chỉ.`);
    }
    return parts.join(' ');
  });
</script>

<div class="space-y-4">
  <CircuitBoard
    bind:mode
    bind:resistors
    bind:voltage
    bind:closed
    interactive
    maxVoltage={12}
    resistanceStep={5}
    label="Đoạn mạch đang lắp"
  />

  <div class="grid gap-4 sm:grid-cols-2">
    <div class="{card} space-y-2 p-3">
      <SegmentedControl
        label="Mắc ampe kế đo dòng điện"
        options={placeA}
        bind:value={ammeterAt}
        onchange={(v) => visit('A', String(v))}
      />
      {#if aScale}
        <MeterDial letter="A" value={aValue} {...aScale} />
      {/if}
      <p class="text-center text-sm font-semibold tabular-nums text-slate-700" aria-live="polite">
        {#if aScale}
          Ampe kế (GHĐ {formatNumber(aScale.range)} A) chỉ {f(aValue)} A
        {:else}
          Dòng điện {f(aValue)} A vượt quá giới hạn đo của ampe kế.
        {/if}
      </p>
    </div>
    <div class="{card} space-y-2 p-3">
      <SegmentedControl
        label="Mắc vôn kế giữa"
        options={placeV}
        bind:value={voltmeterAt}
        onchange={(v) => visit('V', String(v))}
      />
      {#if vScale}
        <MeterDial letter="V" value={vValue} {...vScale} />
      {/if}
      <p class="text-center text-sm font-semibold tabular-nums text-slate-700" aria-live="polite">
        {#if vScale}
          Vôn kế (GHĐ {formatNumber(vScale.range)} V) chỉ {f(vValue)} V
        {:else}
          Hiệu điện thế vượt quá giới hạn đo của vôn kế.
        {/if}
      </p>
    </div>
  </div>

  <div class="overflow-x-auto">
    <table class="w-full min-w-64 text-center text-sm tabular-nums">
      <caption class="mb-1 text-left text-sm font-semibold text-slate-700"
        >Số đo đã xem (dấu … là vị trí chưa đặt đồng hồ)</caption
      >
      <thead>
        <tr class="border-b border-slate-300 text-slate-600">
          <th scope="col" class="py-1 text-left">Vị trí</th>
          <th scope="col" class="py-1">I (A)</th>
          <th scope="col" class="py-1">U (V)</th>
        </tr>
      </thead>
      <tbody>
        {#each positions as p (p)}
          <tr class="border-b border-slate-100">
            <th scope="row" class="py-1 text-left font-semibold"
              >{p === 'main'
                ? 'Cả mạch'
                : `R${Number(p) + 1} = ${formatNumber(resistors[Number(p)])} Ω`}</th
            >
            <td class="py-1">{seenA.includes(p) ? f(at(p).i) : '…'}</td>
            <td class="py-1">{seenV.includes(p) ? f(at(p).u) : '…'}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>

  <FeedbackNote tone={closed && allA && allV ? 'ok' : 'info'} text={feedback} />
</div>
