<script>
  import { button } from '#lib/core/ui.js';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { formatNumber } from '#lib/core/number-format.js';
  import {
    BULB_VOLTS,
    METERS,
    MISSIONS,
    SOURCE_VOLTS,
    energyAfter,
    evaluate,
    unitText,
  } from './engine.js';

  /** @typedef {import('./engine.js').MeterId} MeterId */
  /** @typedef {import('./engine.js').Position} Position */
  /** @typedef {import('./engine.js').Polarity} Polarity */

  let missionId = $state(MISSIONS[0].id);
  let kind = $state(/** @type {'dc' | 'ac'} */ ('ac'));
  let volts = $state(12);
  let meterId = $state(/** @type {MeterId} */ ('von-ke'));
  let position = $state(/** @type {Position} */ ('song-song'));
  let polarity = $state(/** @type {Polarity} */ ('dung'));
  let range = $state(15);
  let closed = $state(false);
  let seconds = $state(60);
  /** @type {string[]} */
  let done = $state([]);

  const mission = $derived(MISSIONS.find((m) => m.id === missionId) ?? MISSIONS[0]);
  const meter = $derived(METERS[meterId]);
  const analog = $derived(meterId !== 'joulemeter');
  const outcome = $derived(
    evaluate(mission, { kind, volts, meter: meterId, position, polarity, range }),
  );
  const bulb = $derived(closed ? outcome.bulb : 'off');
  const needle = $derived(closed && outcome.needle !== null ? outcome.needle : 0);

  /** Any change to the bench opens the switch first, as in a real lab. */
  function open() {
    closed = false;
  }

  /** @param {string | number} v */
  function pickMeter(v) {
    const m = METERS[/** @type {MeterId} */ (v)];
    if (m.ranges.length) range = m.ranges[m.ranges.length - 1];
    open();
  }

  function closeSwitch() {
    closed = true;
    if (outcome.tone === 'ok' && !done.includes(mission.id)) done = [...done, mission.id];
  }

  const feedback = $derived.by(() => {
    if (!closed) {
      return {
        tone: /** @type {const} */ ('info'),
        text: 'Khoá K đang mở. Chọn chức năng và điện áp của biến áp nguồn, chọn dụng cụ đo, cách mắc, chốt nối và thang đo rồi mới đóng khoá K.',
      };
    }
    return {
      tone: outcome.tone === 'ok' ? /** @type {const} */ ('ok') : /** @type {const} */ ('warn'),
      text: outcome.text,
    };
  });

  const missionOptions = MISSIONS.map((m, i) => ({ value: m.id, label: `Nhiệm vụ ${i + 1}` }));
  const kindOptions = [
    { value: 'dc', label: 'Một chiều (DC)' },
    { value: 'ac', label: 'Xoay chiều (AC)' },
  ];
  const voltOptions = SOURCE_VOLTS.map((v) => ({ value: v, label: `${v} V` }));
  const meterOptions = Object.entries(METERS).map(([id, m]) => ({ value: id, label: m.name }));
  const positionOptions = [
    { value: 'noi-tiep', label: 'Nối tiếp với đèn' },
    { value: 'song-song', label: 'Song song với đèn' },
  ];
  const polarityOptions = $derived(
    analog
      ? [
          { value: 'dung', label: 'Chốt (+) về phía cực (+) của nguồn' },
          { value: 'nguoc', label: 'Chốt (+) về phía cực (−) của nguồn' },
        ]
      : [
          { value: 'dung', label: 'Nguồn vào chốt INPUT' },
          { value: 'nguoc', label: 'Nguồn vào chốt OUTPUT' },
        ],
  );
  const rangeOptions = $derived(
    meter.ranges.map((r) => ({ value: r, label: unitText(r, meter.unit) })),
  );

  // Drawing: the loop runs source (left) → top wire → bulb (right) → bottom wire.
  const TOP = 40;
  const BOTTOM = 190;
  const LEFT = 55;
  const BULB_X = 270;
  const BRANCH_X = 335;
  const SERIES = { x: 165, y: TOP };
  const PARALLEL = { x: BRANCH_X, y: 115 };
  const spot = $derived(position === 'noi-tiep' ? SERIES : PARALLEL);

  /** Labels on the two terminals of the device: [towards source +, towards source −]. */
  const terminals = $derived.by(() => {
    const pair = analog ? ['+', '−'] : ['vào', 'ra'];
    return polarity === 'dung' ? pair : [pair[1], pair[0]];
  });

  const angle = $derived(-60 + 120 * Math.min(1.12, Math.max(-0.12, needle)));
  const needleTip = $derived({
    x: 90 + 62 * Math.sin((angle * Math.PI) / 180),
    y: 80 - 62 * Math.cos((angle * Math.PI) / 180),
  });

  const power = $derived(closed && outcome.power !== null ? outcome.power : 0);
  const display = $derived(
    closed && outcome.power ? { u: BULB_VOLTS, i: outcome.power / BULB_VOLTS } : { u: 0, i: 0 },
  );

  const bulbText = $derived(
    bulb === 'on' ? 'đèn sáng' : bulb === 'burnt' ? 'đèn bị cháy, đứt dây tóc' : 'đèn không sáng',
  );
  const benchLabel = $derived(
    `Mạch điện: biến áp nguồn ${kind === 'dc' ? 'một chiều' : 'xoay chiều'} ${volts} V, khoá K ${closed ? 'đóng' : 'mở'}, bóng đèn ${BULB_VOLTS} V, ${meter.name.toLowerCase()} mắc ${position === 'noi-tiep' ? 'nối tiếp' : 'song song'} với đèn; ${bulbText}.`,
  );
  const dialText = $derived(
    !closed
      ? `${meter.name} chỉ 0.`
      : needle > 1
        ? `Kim ${meter.name.toLowerCase()} vượt quá vạch cuối của thang đo.`
        : needle < 0
          ? `Kim ${meter.name.toLowerCase()} lệch ngược chiều, về bên trái vạch 0.`
          : `${meter.name} chỉ ${unitText(needle * range, meter.unit)}.`,
  );
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Chọn nhiệm vụ"
    options={missionOptions}
    bind:value={missionId}
    onchange={open}
  />
  <p class="rounded-xl bg-indigo-50 px-4 py-3 text-sm text-indigo-900">
    <span class="font-semibold">{mission.title}.</span>
    Hướng dẫn: bóng đèn {BULB_VOLTS} V dùng nguồn điện một chiều {BULB_VOLTS} V lấy từ biến áp nguồn.
    <span class="block pt-1 text-xs text-indigo-700">
      Đã hoàn thành {done.length}/{MISSIONS.length} nhiệm vụ{done.length
        ? `: ${done.map((id) => MISSIONS.findIndex((m) => m.id === id) + 1).join(', ')}`
        : ''}.
    </span>
  </p>

  <div class="grid gap-4 lg:grid-cols-2">
    <div class="space-y-3">
      <SegmentedControl
        label="Biến áp nguồn: chức năng"
        options={kindOptions}
        bind:value={kind}
        onchange={open}
      />
      <SegmentedControl
        label="Biến áp nguồn: điện áp ra"
        options={voltOptions}
        bind:value={volts}
        onchange={open}
      />
      <SegmentedControl
        label="Dụng cụ đo"
        options={meterOptions}
        bind:value={meterId}
        onchange={pickMeter}
      />
      <SegmentedControl
        label="Cách mắc"
        options={positionOptions}
        bind:value={position}
        onchange={open}
      />
      <SegmentedControl
        label={analog ? 'Chốt nối' : 'Chốt vào, chốt ra'}
        options={polarityOptions}
        bind:value={polarity}
        onchange={open}
      />
      {#if analog}
        <SegmentedControl
          label="Thang đo (giới hạn đo)"
          options={rangeOptions}
          bind:value={range}
          onchange={open}
        />
      {/if}
    </div>

    <div class="space-y-3">
      <svg viewBox="0 0 400 225" class="w-full" role="img" aria-label={benchLabel}>
        <defs>
          <radialGradient id="bai1-glow">
            <stop offset="0%" stop-color="#fde047" stop-opacity="0.9" />
            <stop offset="100%" stop-color="#fde047" stop-opacity="0" />
          </radialGradient>
        </defs>
        <!-- wires -->
        <g fill="none" stroke="#334155" stroke-width="3">
          <polyline
            points="{LEFT},92 {LEFT},{TOP} {BULB_X},{TOP} {BULB_X},{BOTTOM} {LEFT},{BOTTOM} {LEFT},140"
          />
          {#if position === 'song-song'}
            <polyline points="{BULB_X},70 {BRANCH_X},70 {BRANCH_X},160 {BULB_X},160" />
          {/if}
        </g>
        <!-- power supply -->
        <rect
          x="8"
          y="92"
          width="94"
          height="48"
          rx="8"
          fill="#e2e8f0"
          stroke="#334155"
          stroke-width="2"
        />
        <text x="55" y="110" text-anchor="middle" font-size="11" fill="#0f172a">Biến áp nguồn</text>
        <text x="55" y="128" text-anchor="middle" font-size="13" font-weight="700" fill="#4338ca"
          >{kind === 'dc' ? 'DC' : 'AC'} {volts} V</text
        >
        <text x="66" y="88" font-size="16" font-weight="700" fill="#b91c1c">+</text>
        <text x="66" y="158" font-size="18" font-weight="700" fill="#1d4ed8">−</text>
        <!-- switch K on the bottom wire -->
        <rect x="140" y={BOTTOM - 6} width="50" height="12" fill="white" />
        <circle cx="145" cy={BOTTOM} r="4" fill="#334155" />
        <circle cx="185" cy={BOTTOM} r="4" fill="#334155" />
        <line
          x1="145"
          y1={BOTTOM}
          x2={closed ? 185 : 180}
          y2={closed ? BOTTOM : BOTTOM - 22}
          stroke="#334155"
          stroke-width="3"
          stroke-linecap="round"
        />
        <text x="165" y={BOTTOM + 22} text-anchor="middle" font-size="14" fill="#0f172a">K</text>
        <!-- bulb -->
        {#if bulb === 'on'}
          <circle cx={BULB_X} cy="115" r="38" fill="url(#bai1-glow)" />
        {/if}
        <circle
          cx={BULB_X}
          cy="115"
          r="16"
          fill={bulb === 'on' ? '#fef08a' : bulb === 'burnt' ? '#94a3b8' : 'white'}
          stroke="#334155"
          stroke-width="3"
        />
        <g stroke="#334155" stroke-width="2.5">
          <line x1={BULB_X - 11} y1="104" x2={BULB_X + 11} y2="126" />
          <line x1={BULB_X + 11} y1="104" x2={BULB_X - 11} y2="126" />
        </g>
        <text x={BULB_X - 22} y="119" text-anchor="end" font-size="14" fill="#0f172a">Đ</text>
        {#if bulb === 'burnt'}
          <text x={BULB_X - 22} y="140" text-anchor="end" font-size="13" fill="#b91c1c">cháy</text>
        {/if}
        <!-- measuring device -->
        <circle
          cx={spot.x}
          cy={spot.y}
          r="18"
          fill={analog ? 'white' : '#ecfccb'}
          stroke="#4338ca"
          stroke-width="3"
        />
        <text
          x={spot.x}
          y={spot.y + 6}
          text-anchor="middle"
          font-size="17"
          font-weight="700"
          fill="#4338ca">{meter.symbol}</text
        >
        {#if position === 'noi-tiep'}
          <text
            x={spot.x - 24}
            y={spot.y - 10}
            text-anchor="end"
            font-size="15"
            font-weight="700"
            fill="#b91c1c">{terminals[0]}</text
          >
          <text x={spot.x + 24} y={spot.y - 10} font-size="15" font-weight="700" fill="#1d4ed8"
            >{terminals[1]}</text
          >
        {:else}
          <text x={spot.x + 22} y={spot.y - 20} font-size="15" font-weight="700" fill="#b91c1c"
            >{terminals[0]}</text
          >
          <text x={spot.x + 22} y={spot.y + 30} font-size="15" font-weight="700" fill="#1d4ed8"
            >{terminals[1]}</text
          >
        {/if}
      </svg>

      {#if analog}
        <div class="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-3">
          <svg viewBox="0 0 180 100" class="w-40 shrink-0" role="img" aria-label={dialText}>
            <path
              d="M 36.3 49 A 62 62 0 0 1 143.7 49"
              fill="none"
              stroke="#94a3b8"
              stroke-width="3"
            />
            {#each [0, 0.25, 0.5, 0.75, 1] as f (f)}
              {@const a = ((-60 + 120 * f) * Math.PI) / 180}
              <line
                x1={90 + 56 * Math.sin(a)}
                y1={80 - 56 * Math.cos(a)}
                x2={90 + 66 * Math.sin(a)}
                y2={80 - 66 * Math.cos(a)}
                stroke="#334155"
                stroke-width="2"
              />
            {/each}
            <text x="26" y="64" font-size="13" fill="#0f172a">0</text>
            <text x="154" y="64" text-anchor="end" font-size="13" fill="#0f172a"
              >{formatNumber(range)}</text
            >
            <text x="90" y="98" text-anchor="middle" font-size="12" font-weight="700" fill="#4338ca"
              >{meter.unit}</text
            >
            <line
              x1="90"
              y1="80"
              x2={needleTip.x}
              y2={needleTip.y}
              stroke="#dc2626"
              stroke-width="3"
              stroke-linecap="round"
            />
            <circle cx="90" cy="80" r="5" fill="#334155" />
          </svg>
          <p class="text-sm text-slate-700">{dialText}</p>
        </div>
      {:else}
        <div class="space-y-3 rounded-xl bg-slate-900 p-3 font-mono text-lime-300">
          <dl class="grid grid-cols-2 gap-2 text-sm" aria-label="Màn hình joulemeter">
            <div>
              <dt class="text-xs text-slate-400">Hiệu điện thế</dt>
              <dd>{unitText(display.u, 'V')}</dd>
            </div>
            <div>
              <dt class="text-xs text-slate-400">Cường độ dòng điện</dt>
              <dd>{unitText(display.i, 'A')}</dd>
            </div>
            <div>
              <dt class="text-xs text-slate-400">Công suất</dt>
              <dd>{unitText(power, 'W')}</dd>
            </div>
            <div>
              <dt class="text-xs text-slate-400">Năng lượng điện</dt>
              <dd>{unitText(energyAfter(power, seconds), 'J')}</dd>
            </div>
          </dl>
          <div class="rounded-lg bg-white p-2 font-sans text-slate-800">
            <SliderField
              label="Thời gian đóng mạch"
              bind:value={seconds}
              min={0}
              max={180}
              step={10}
              unit="s"
            />
          </div>
        </div>
      {/if}
    </div>
  </div>

  <div class="flex flex-wrap gap-2">
    <button type="button" class={button.primary} onclick={closeSwitch} disabled={closed}>
      Đóng khoá K
    </button>
    <button type="button" class={button.quiet} onclick={open} disabled={!closed}>Mở khoá K</button>
  </div>

  <FeedbackNote tone={feedback.tone} text={feedback.text} />
</div>
