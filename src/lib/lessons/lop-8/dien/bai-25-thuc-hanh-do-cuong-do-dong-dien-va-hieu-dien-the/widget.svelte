<script>
  import { readNumber } from '#lib/core/decimal.js';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { formatFixed, formatNumber } from '#lib/core/number-format.js';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { button, card, focusRing } from '#lib/core/ui.js';
  import CircuitSymbol from '../_shared/circuit-symbol.svelte';
  import MeterDial from '../_shared/meter-dial.svelte';
  import {
    AMMETER,
    COLUMNS,
    LAMPS,
    SOURCES,
    VOLTMETER,
    checkReading,
    divisionOf,
    expectedRow,
    lampById,
    readBench,
    sourceById,
  } from './engine.js';

  /** @typedef {import('./engine.js').Column} Column */
  /** @typedef {'trong' | 'dung' | 'sai'} Mark */

  const L = 70;
  const R = 330;
  const T = 80;
  const B = 200;
  const A1_X = 135;
  const LAMP_X = 235;
  const A2_X = 260;
  const SW_X = 150;

  let lampId = $state(LAMPS[0].id);
  let sourceId = $state(SOURCES[0].id);
  let closed = $state(false);
  let ammeterAt = $state('1');
  let voltmeterAt = $state('nguon');
  let showValues = $state(false);

  /** Typed readings, keyed `${lampId}|${sourceId}|${column}`. */
  /** @type {Record<string, string>} */
  let typed = $state({});
  /** Result of the last check of each cell, same keys. */
  /** @type {Record<string, Mark>} */
  let marks = $state({});
  /** @type {{ tone: 'ok' | 'warn' | 'info', text: string } | null} */
  let report = $state(null);

  const source = $derived(sourceById(sourceId));
  const lamp = $derived(lampById(lampId));
  const bench = $derived(
    readBench({
      sourceId,
      lampId,
      closed,
      ammeterAt: ammeterAt === '2' ? '2' : '1',
      voltmeterAt: voltmeterAt === 'den' ? 'den' : 'nguon',
    }),
  );

  const HEAD = /** @type {Record<Column, string>} */ ({
    uNguon: 'U nguồn, mạch hở (V)',
    i1: 'I₁ tại (1) (A)',
    i2: 'I₂ tại (2) (A)',
    uDen: 'U hai đầu đèn (V)',
  });
  const SHORT = /** @type {Record<Column, string>} */ ({
    uNguon: 'U nguồn (V)',
    i1: 'I₁ (A)',
    i2: 'I₂ (A)',
    uDen: 'U đèn (V)',
  });

  const key = (/** @type {string} */ l, /** @type {string} */ s, /** @type {Column} */ c) =>
    `${l}|${s}|${c}`;

  const benchNote = $derived.by(() => {
    const where = ammeterAt === '1' ? '(1)' : '(2)';
    if (!closed)
      return voltmeterAt === 'nguon'
        ? `Công tắc mở, mạch hở: đèn tắt, kim ampe kế chỉ vạch 0. Vôn kế nối hai cực nguồn chỉ hiệu điện thế giữa hai cực nguồn khi mạch hở: ghi vào cột “U nguồn”.`
        : 'Công tắc mở, mạch hở: đèn tắt, kim ampe kế và vôn kế (nối hai đầu đèn) đều chỉ vạch 0. Đóng công tắc để đo.';
    return voltmeterAt === 'den'
      ? `Mạch kín: đèn sáng. Ampe kế ở vị trí ${where} chỉ cường độ dòng điện I${ammeterAt === '1' ? '₁' : '₂'}; vôn kế chỉ hiệu điện thế giữa hai đầu đèn.`
      : `Mạch kín: đèn sáng. Ampe kế ở vị trí ${where} chỉ I${ammeterAt === '1' ? '₁' : '₂'}. Vôn kế đang nối hai cực nguồn khi mạch kín; cột “U nguồn” đo khi công tắc mở.`;
  });

  /** @param {number | null} v @param {number} digits @param {string} unit */
  const readout = (v, digits, unit) =>
    v === null ? 'chưa mắc' : `${formatFixed(v, digits)} ${unit}`;

  function checkTable() {
    let right = 0;
    let wrong = 0;
    /** @type {string[]} */
    const notes = [];
    for (const s of SOURCES) {
      const want = expectedRow(s.id, lampId);
      for (const c of COLUMNS) {
        const k = key(lampId, s.id, c);
        const text = (typed[k] ?? '').trim();
        const mark = checkReading(text === '' ? null : readNumber(text), want[c], divisionOf(c));
        marks[k] = mark;
        if (mark === 'dung') right++;
        if (mark === 'sai') wrong++;
      }
      const ok = (/** @type {Column} */ c) => marks[key(lampId, s.id, c)] === 'dung';
      if (ok('i1') && ok('i2') && !notes.some((n) => n.startsWith('I₁')))
        notes.push(
          'I₁ = I₂: cường độ dòng điện trước và sau bóng đèn như nhau, đèn không làm “hao” dòng điện.',
        );
      if (ok('uNguon') && ok('uDen') && !notes.some((n) => n.startsWith('U đèn')))
        notes.push('U đèn nhỏ hơn U nguồn một chút.');
      if (s.id === 'cu' && ok('uNguon'))
        notes.push(
          `Pin cũ: vôn kế chỉ ${formatNumber(want.uNguon)} V, nhỏ hơn số ${formatNumber(s.nominal)} V ghi trên pin.`,
        );
    }
    const empty = SOURCES.length * COLUMNS.length - right - wrong;
    if (right === 0 && wrong === 0) {
      report = { tone: 'info', text: 'Bảng còn trống. Đọc kim dụng cụ đo rồi ghi số vào ô.' };
      return;
    }
    report = {
      tone: wrong === 0 ? 'ok' : 'warn',
      text:
        `${right} ô đúng${wrong ? `, ${wrong} ô cần đọc lại (xem lại GHĐ, ĐCNN và vị trí kim)` : ''}${empty ? `, còn ${empty} ô trống` : ', đã điền đủ bảng'}. ` +
        notes.join(' '),
    };
  }

  /** @param {string} k @param {string} v */
  function setCell(k, v) {
    typed[k] = v;
    delete marks[k];
  }

  /** Points of the I–U graph: rows whose I₁ and U đèn were read correctly. */
  const points = $derived(
    LAMPS.map((l) => ({
      lamp: l,
      pts: [
        { u: 0, i: 0 },
        ...SOURCES.filter(
          (s) =>
            marks[key(l.id, s.id, 'i1')] === 'dung' && marks[key(l.id, s.id, 'uDen')] === 'dung',
        ).map((s) => {
          const row = expectedRow(s.id, l.id);
          return { u: row.uDen, i: row.i1 };
        }),
      ].sort((a, b) => a.u - b.u),
    })),
  );

  const GX0 = 44;
  const GX1 = 300;
  const GY0 = 170;
  const GY1 = 16;
  const gx = (/** @type {number} */ u) => GX0 + ((GX1 - GX0) * u) / VOLTMETER.range;
  const gy = (/** @type {number} */ i) => GY0 - ((GY0 - GY1) * i) / AMMETER.range;
  const COLORS = ['#2563eb', '#db2777'];
</script>

<div class="space-y-4">
  <div class="grid gap-3 sm:grid-cols-2">
    <SegmentedControl
      label="Bóng đèn"
      options={LAMPS.map((l) => ({ value: l.id, label: l.label }))}
      bind:value={lampId}
    />
    <SegmentedControl
      label="Nguồn điện"
      options={SOURCES.map((s) => ({ value: s.id, label: s.label }))}
      bind:value={sourceId}
    />
    <SegmentedControl
      label="Vị trí ampe kế"
      options={[
        { value: '1', label: '(1): giữa cực (+) và đèn' },
        { value: '2', label: '(2): giữa đèn và cực (−)' },
      ]}
      bind:value={ammeterAt}
    />
    <SegmentedControl
      label="Vôn kế mắc song song với"
      options={[
        { value: 'nguon', label: 'Hai cực nguồn' },
        { value: 'den', label: 'Hai đầu bóng đèn' },
      ]}
      bind:value={voltmeterAt}
    />
  </div>

  <figure class="{card} overflow-hidden p-2">
    <svg
      viewBox="0 0 360 250"
      class="mx-auto block w-full max-w-md select-none"
      role="img"
      aria-label="Sơ đồ mạch: nguồn {source.label}, công tắc {closed
        ? 'đóng'
        : 'mở'}, {lamp.label.toLowerCase()} {bench.lampOn
        ? 'sáng'
        : 'tắt'}; ampe kế ở vị trí ({ammeterAt}); vôn kế mắc song song với {voltmeterAt === 'den'
        ? 'hai đầu bóng đèn'
        : 'hai cực nguồn'}."
    >
      <g stroke="#1e293b" stroke-width="2" fill="none">
        <polyline points="{L},{T + 35} {L},{T} {A1_X - 30},{T}" />
        <line x1={A1_X + 30} y1={T} x2={LAMP_X - 20} y2={T} />
        <polyline points="{LAMP_X + 20},{T} {R},{T} {R},{B} {A2_X + 30},{B}" />
        <line x1={A2_X - 30} y1={B} x2={SW_X + 28} y2={B} />
        <polyline points="{SW_X - 28},{B} {L},{B} {L},{B - 35}" />
      </g>

      <!-- source on the left, + at the top: the current runs clockwise -->
      <CircuitSymbol
        kind={source.emf > 2 ? 'bo-pin' : 'pin'}
        x={L}
        y={(T + B) / 2}
        angle={-90}
        len={50}
      />
      <text x={L + 22} y={(T + B) / 2 + 4} class="fill-slate-600 text-[11px]">{source.label}</text>

      <!-- position (1) -->
      {#if ammeterAt === '1'}
        <CircuitSymbol kind="ampe-ke" x={A1_X} y={T} len={60} />
      {:else}
        <line x1={A1_X - 30} y1={T} x2={A1_X + 30} y2={T} stroke="#1e293b" stroke-width="2" />
      {/if}
      <text x={A1_X} y={T + 32} text-anchor="middle" class="fill-sky-700 text-[12px] font-semibold"
        >(1)</text
      >

      {#if bench.lampOn}
        <circle
          cx={LAMP_X}
          cy={T}
          r={14 + 16 * bench.glow}
          fill="#fde68a"
          opacity={0.3 + 0.5 * bench.glow}
        />
      {/if}
      <CircuitSymbol kind="den" x={LAMP_X} y={T} len={40} active={bench.lampOn} />
      <text x={LAMP_X} y={T + 30} text-anchor="middle" class="fill-slate-600 text-[11px]">Đ</text>

      <!-- position (2) -->
      {#if ammeterAt === '2'}
        <CircuitSymbol kind="ampe-ke" x={A2_X} y={B} angle={180} len={60} />
      {:else}
        <line x1={A2_X - 30} y1={B} x2={A2_X + 30} y2={B} stroke="#1e293b" stroke-width="2" />
      {/if}
      <text x={A2_X} y={B - 22} text-anchor="middle" class="fill-sky-700 text-[12px] font-semibold"
        >(2)</text
      >

      <CircuitSymbol kind="cong-tac" x={SW_X} y={B} len={56} {closed} />
      <text x={SW_X} y={B + 24} text-anchor="middle" class="fill-slate-600 text-[11px]">K</text>

      <!-- voltmeter -->
      {#if voltmeterAt === 'den'}
        <polyline
          points="{LAMP_X - 45},{T} {LAMP_X - 45},{T - 50} {LAMP_X + 45},{T - 50} {LAMP_X + 45},{T}"
          fill="none"
          stroke="#1e293b"
          stroke-width="2"
        />
        <rect x={LAMP_X - 30} y={T - 68} width="60" height="36" fill="#fff" />
        <CircuitSymbol kind="von-ke" x={LAMP_X} y={T - 50} len={60} />
        <circle cx={LAMP_X - 45} cy={T} r="4" fill="#1e293b" />
        <circle cx={LAMP_X + 45} cy={T} r="4" fill="#1e293b" />
      {:else}
        <polyline
          points="{L},{T + 12} {L - 46},{T + 12} {L - 46},{B - 12} {L},{B - 12}"
          fill="none"
          stroke="#1e293b"
          stroke-width="2"
        />
        <rect x={L - 64} y={(T + B) / 2 - 30} width="36" height="60" fill="#fff" />
        <CircuitSymbol kind="von-ke" x={L - 46} y={(T + B) / 2} angle={90} len={60} />
        <circle cx={L} cy={T + 12} r="4" fill="#1e293b" />
        <circle cx={L} cy={B - 12} r="4" fill="#1e293b" />
      {/if}
    </svg>
  </figure>

  <div class="flex flex-wrap items-center gap-3">
    <button type="button" class={button.primary} onclick={() => (closed = !closed)}>
      {closed ? 'Mở công tắc K' : 'Đóng công tắc K'}
    </button>
    <label class="flex min-h-11 items-center gap-2 text-sm text-slate-700">
      <input type="checkbox" class="size-5 {focusRing}" bind:checked={showValues} />
      Hiện số chỉ để tự kiểm tra
    </label>
  </div>

  <FeedbackNote tone="info" text={benchNote} />

  <div class="grid gap-3 sm:grid-cols-2">
    {#each [{ letter: 'A', name: 'Ampe kế', value: bench.ammeter, spec: AMMETER, step: 0.1, digits: 2 }, { letter: 'V', name: 'Vôn kế', value: bench.voltmeter, spec: VOLTMETER, step: 1, digits: 1 }] as m (m.letter)}
      <figure class="{card} p-2 text-center">
        <MeterDial
          letter={m.letter}
          value={m.value}
          range={m.spec.range}
          division={m.spec.division}
          labelStep={m.step}
        />
        <figcaption>
          <span class="block text-xs text-slate-600">
            {m.name}: GHĐ {formatNumber(m.spec.range)}
            {m.letter} – ĐCNN {formatNumber(m.spec.division)}
            {m.letter}
          </span>
          <span class="mt-1 block text-sm font-semibold tabular-nums" aria-live="polite">
            {#if showValues}
              Số chỉ: {readout(m.value, m.digits, m.letter)}
            {:else}
              <span aria-hidden="true">Đọc số chỉ trên mặt số</span>
              <span class="sr-only">Số chỉ: {readout(m.value, m.digits, m.letter)}</span>
            {/if}
          </span>
        </figcaption>
      </figure>
    {/each}
  </div>

  <div class="{card} overflow-x-auto p-3">
    <p class="mb-2 text-sm font-semibold text-slate-800">
      Bảng kết quả – {lamp.label}
    </p>
    <p class="mb-2 text-xs text-slate-600">
      U nguồn: vôn kế nối hai cực nguồn, công tắc mở. I₁, I₂: ampe kế ở vị trí (1), (2), công tắc
      đóng. U đèn: vôn kế song song với đèn, công tắc đóng.
    </p>
    <table class="w-full table-fixed border-collapse text-sm">
      <thead>
        <tr>
          <th class="border border-slate-200 bg-slate-50 p-1 text-left">Nguồn</th>
          {#each COLUMNS as c (c)}
            <th class="border border-slate-200 bg-slate-50 p-1 text-xs font-semibold">{SHORT[c]}</th
            >
          {/each}
        </tr>
      </thead>
      <tbody>
        {#each SOURCES as s (s.id)}
          <tr>
            <th scope="row" class="border border-slate-200 p-1 text-left text-xs font-semibold"
              >{s.label}</th
            >
            {#each COLUMNS as c (c)}
              {@const k = key(lampId, s.id, c)}
              {@const mark = marks[k]}
              <td
                class="border border-slate-200 p-1 {mark === 'dung'
                  ? 'bg-emerald-50'
                  : mark === 'sai'
                    ? 'bg-amber-50'
                    : ''}"
              >
                <input
                  type="text"
                  inputmode="decimal"
                  autocomplete="off"
                  class="min-h-11 w-full min-w-0 rounded border border-slate-300 px-1 text-center tabular-nums {focusRing}"
                  aria-label="{HEAD[c]}, nguồn {s.label}{mark === 'dung'
                    ? ', đúng'
                    : mark === 'sai'
                      ? ', cần đọc lại'
                      : ''}"
                  value={typed[k] ?? ''}
                  oninput={(e) => setCell(k, e.currentTarget.value)}
                />
              </td>
            {/each}
          </tr>
        {/each}
      </tbody>
    </table>
    <div class="mt-3 flex flex-wrap gap-3">
      <button type="button" class={button.primary} onclick={checkTable}>Kiểm tra bảng</button>
    </div>
  </div>

  {#if report}
    <FeedbackNote tone={report.tone} text={report.text} />
  {/if}

  <figure class="{card} p-2">
    <svg
      viewBox="0 0 320 205"
      class="mx-auto block w-full max-w-md"
      role="img"
      aria-label="Đồ thị cường độ dòng điện theo hiệu điện thế giữa hai đầu đèn. {points
        .map(
          (p) =>
            `${p.lamp.label}: ${p.pts.length - 1} điểm đo${p.pts
              .slice(1)
              .map((q) => `, U ${formatNumber(q.u)} V, I ${formatNumber(q.i)} A`)
              .join('')}`,
        )
        .join('. ')}"
    >
      {#each [0, 1, 2, 3, 4, 5, 6] as u (u)}
        <line x1={gx(u)} y1={GY0} x2={gx(u)} y2={GY1} stroke="#e2e8f0" />
        <text x={gx(u)} y={GY0 + 14} text-anchor="middle" class="fill-slate-600 text-[10px]"
          >{u}</text
        >
      {/each}
      {#each [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6] as i (i)}
        <line x1={GX0} y1={gy(i)} x2={GX1} y2={gy(i)} stroke="#e2e8f0" />
        <text x={GX0 - 5} y={gy(i) + 3} text-anchor="end" class="fill-slate-600 text-[10px]"
          >{formatNumber(i)}</text
        >
      {/each}
      <line x1={GX0} y1={GY0} x2={GX1 + 6} y2={GY0} stroke="#334155" stroke-width="1.5" />
      <line x1={GX0} y1={GY0} x2={GX0} y2={GY1 - 8} stroke="#334155" stroke-width="1.5" />
      <text x={GX1 + 4} y={GY0 + 28} text-anchor="end" class="fill-slate-700 text-[11px]"
        >U đèn (V)</text
      >
      <text x={GX0 + 4} y={GY1 - 4} class="fill-slate-700 text-[11px]">I (A)</text>
      {#each points as p, n (p.lamp.id)}
        {#if p.pts.length > 1}
          <polyline
            points={p.pts.map((q) => `${gx(q.u)},${gy(q.i)}`).join(' ')}
            fill="none"
            stroke={COLORS[n]}
            stroke-width="1.5"
            stroke-dasharray={n ? '5 3' : undefined}
          />
        {/if}
        {#each p.pts.slice(1) as q (`${q.u}-${q.i}`)}
          {#if n === 0}
            <circle cx={gx(q.u)} cy={gy(q.i)} r="4" fill={COLORS[n]} />
          {:else}
            <rect x={gx(q.u) - 4} y={gy(q.i) - 4} width="8" height="8" fill={COLORS[n]} />
          {/if}
        {/each}
      {/each}
    </svg>
    <figcaption class="mt-1 flex flex-wrap justify-center gap-4 text-xs text-slate-700">
      {#each LAMPS as l, n (l.id)}
        <span class="flex items-center gap-1">
          <svg viewBox="0 0 10 10" class="size-3" aria-hidden="true">
            {#if n === 0}
              <circle cx="5" cy="5" r="4" fill={COLORS[n]} />
            {:else}
              <rect x="1" y="1" width="8" height="8" fill={COLORS[n]} />
            {/if}
          </svg>
          {l.label}
        </span>
      {/each}
      <span>Điểm hiện lên khi I₁ và U đèn của dòng đó được ghi đúng.</span>
    </figcaption>
  </figure>
</div>
