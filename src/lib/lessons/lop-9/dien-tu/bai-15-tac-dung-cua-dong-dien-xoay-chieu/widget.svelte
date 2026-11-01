<script>
  import { onDestroy, onMount } from 'svelte';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { button, card } from '#lib/core/ui.js';
  import { frameLoop, reducedMotion } from '#lib/core/motion.js';
  import {
    behaviour,
    coilCurrent,
    endPole,
    follow,
    lampGlow,
    nailPull,
    needleTilt,
    pushSample,
  } from './engine.js';

  const SPAN = 4;
  const SPEEDS = [
    { value: 'rat-cham', label: 'Rất chậm', freq: 0.5 },
    { value: 'cham', label: 'Chậm', freq: 2 },
    { value: 'nhanh', label: 'Nhanh hơn', freq: 8 },
  ];

  let source = $state(/** @type {'mot-chieu' | 'xoay-chieu'} */ ('mot-chieu'));
  let object = $state(/** @type {'kim' | 'dinh'} */ ('kim'));
  let speed = $state('rat-cham');
  let closed = $state(false);
  let reversed = $state(false);
  let t = $state(0);
  /** Time on the graph: runs whenever the widget animates, unlike the phase `t`. */
  let clock = $state(0);
  let tilt = $state(0);
  let pull = $state(0);
  let trace = $state(/** @type {Array<{ t: number, i: number }>} */ ([]));
  let reduce = $state(false);
  /** @type {(() => void) | null} */
  let stop = null;

  onMount(() => {
    reduce = reducedMotion();
  });

  const freq = $derived(SPEEDS.find((s) => s.value === speed)?.freq ?? 0.5);
  const setup = $derived({ source, closed, reversed, freq });
  const current = $derived(coilCurrent(setup, t));
  const pole = $derived(endPole(current));
  const glow = $derived(lampGlow(current));
  const alternating = $derived(source === 'xoay-chieu' && closed);
  const what = $derived(behaviour(setup, object));

  function tick(/** @type {number} */ dt) {
    clock += dt;
    if (alternating) t += dt;
    const i = coilCurrent(setup, t);
    tilt = follow(tilt, needleTilt(i), dt);
    pull = follow(pull, nailPull(i), dt);
    trace = pushSample(trace, clock, i, SPAN);
    if (!closed && tilt === 0 && pull === 0 && trace.every((p) => p.i === 0)) halt();
  }

  function halt() {
    stop?.();
    stop = null;
  }
  onDestroy(halt);

  function wake() {
    if (reduce) {
      const i = coilCurrent(setup, t);
      tilt = needleTilt(i);
      pull = nailPull(i);
      clock += 0.25;
      trace = pushSample(trace, clock, i, SPAN);
      return;
    }
    if (!stop) stop = frameLoop(tick);
  }

  function toggleSwitch() {
    closed = !closed;
    wake();
  }

  function changeSource() {
    t = 0;
    trace = [];
    wake();
  }

  function quarterStep() {
    // Each press moves time on by a quarter of a cycle, so the current
    // passes 0, the largest value one way, 0, the largest value the other way.
    t = Math.round((t + 1 / (4 * freq)) * 4 * freq) / (4 * freq);
    wake();
  }

  const traceLine = $derived(
    trace
      .map((s) => {
        const x = 24 + ((s.t - (clock - SPAN)) / SPAN) * 328;
        return `${Math.round(x * 10) / 10},${Math.round((45 - 32 * s.i) * 10) / 10}`;
      })
      .join(' '),
  );

  const poleText = $derived(
    pole === 'N' ? 'cực Bắc (N)' : pole === 'S' ? 'cực Nam (S)' : 'không có cực từ',
  );

  const feedback = $derived.by(() => {
    const lamp =
      ' Đèn trong mạch sáng với cả hai loại dòng điện: tác dụng phát sáng và tác dụng nhiệt không phụ thuộc chiều dòng điện.';
    switch (what) {
      case 'yen':
        return object === 'kim'
          ? 'Công tắc đang mở: không có dòng điện, cuộn dây không có từ trường. Kim nam châm nằm theo hướng Bắc – Nam như bình thường. Hãy đóng công tắc.'
          : 'Công tắc đang mở: cuộn dây không có từ trường, đinh sắt treo thẳng đứng. Hãy đóng công tắc.';
      case 'lech':
        return `Dòng điện một chiều: đầu cuộn dây gần kim luôn là ${poleText}, nên cực Bắc của kim nam châm bị ${pole === 'N' ? 'đẩy' : 'hút'} và kim lệch hẳn về một phía rồi đứng yên. Bấm "Đổi chiều nguồn" để kim lệch sang phía kia.${lamp}`;
      case 'rung':
        return `Dòng điện xoay chiều: chiều dòng điện đổi liên tục nên cực từ ở đầu cuộn dây đổi N, S luân phiên. Cực Bắc của kim nam châm lần lượt bị đẩy, bị hút: kim rung qua lại. Chọn "Nhanh hơn" để thấy kim chỉ rung nhẹ; với dòng điện trong gia đình, cực từ đổi tới $100$ lần mỗi giây.${lamp}`;
      default:
        return `Đinh sắt bị hút về phía cuộn dây. Sắt bị hút bởi cả cực Bắc lẫn cực Nam, nên dù ${source === 'xoay-chieu' ? 'cực từ ở đầu cuộn dây đổi liên tục, đinh vẫn bị hút' : 'đổi chiều dòng điện, đinh vẫn bị hút'}: dòng điện ${source === 'xoay-chieu' ? 'xoay chiều' : 'một chiều'} có tác dụng từ.`;
    }
  });
</script>

<div class="space-y-4">
  <div class="flex flex-wrap gap-4">
    <SegmentedControl
      label="Nguồn điện"
      options={[
        { value: 'mot-chieu', label: 'Một chiều' },
        { value: 'xoay-chieu', label: 'Xoay chiều' },
      ]}
      bind:value={source}
      onchange={changeSource}
    />
    <SegmentedControl
      label="Đặt trước đầu cuộn dây"
      options={[
        { value: 'kim', label: 'Kim nam châm' },
        { value: 'dinh', label: 'Đinh sắt' },
      ]}
      bind:value={object}
      onchange={wake}
    />
  </div>

  <figure class="{card} overflow-hidden p-2">
    <svg
      viewBox="0 0 360 200"
      class="mx-auto block w-full max-w-lg select-none"
      role="img"
      aria-label="Nam châm điện nối với nguồn {source === 'mot-chieu'
        ? 'một chiều'
        : 'xoay chiều'}, công tắc {closed ? 'đóng' : 'mở'}. Đầu cuộn dây bên phải: {poleText}."
    >
      <!-- circuit: coil, source, lamp and switch -->
      <g fill="none" stroke="#475569" stroke-width="1.5">
        <polyline points="64,128 64,172 104,172" />
        <polyline points="136,172 160,172" />
        <polyline points="184,172 214,172" />
        <polyline points="244,172 260,172 260,186 176,186 176,128" />
      </g>
      {#if source === 'mot-chieu'}
        <g stroke="#0f172a" stroke-width="2">
          <line x1="114" y1="162" x2="114" y2="182" />
          <line x1="124" y1="166" x2="124" y2="178" stroke-width="4" />
        </g>
        <line x1="104" y1="172" x2="114" y2="172" stroke="#475569" stroke-width="1.5" />
        <line x1="124" y1="172" x2="136" y2="172" stroke="#475569" stroke-width="1.5" />
        <text x="110" y="158" text-anchor="middle" class="fill-slate-700 text-[10px] font-bold"
          >{reversed ? '−' : '+'}</text
        >
        <text x="128" y="158" text-anchor="middle" class="fill-slate-700 text-[10px] font-bold"
          >{reversed ? '+' : '−'}</text
        >
      {:else}
        <circle cx="120" cy="172" r="15" fill="#fff" stroke="#0f172a" stroke-width="1.5" />
        <path
          d="M110,172 C113,164 117,164 120,172 C123,180 127,180 130,172"
          fill="none"
          stroke="#0f172a"
          stroke-width="1.5"
        />
      {/if}
      <!-- lamp -->
      <circle cx="172" cy="172" r="14" fill="#facc15" opacity={glow * 0.7} />
      <circle cx="172" cy="172" r="9" fill="#fff" stroke="#334155" stroke-width="1.5" />
      <path d="M166,166 L178,178 M178,166 L166,178" stroke="#334155" stroke-width="1.2" />
      <!-- switch -->
      <circle cx="214" cy="172" r="2.5" fill="#334155" />
      <circle cx="244" cy="172" r="2.5" fill="#334155" />
      <line
        x1="214"
        y1="172"
        x2={closed ? 244 : 240}
        y2={closed ? 172 : 154}
        stroke="#334155"
        stroke-width="2.5"
        stroke-linecap="round"
      />
      <text x="229" y="194" text-anchor="middle" class="fill-slate-500 text-[9px]">K</text>

      <!-- electromagnet -->
      <rect x="48" y="102" width="144" height="16" fill="#cbd5e1" stroke="#64748b" />
      {#each Array.from({ length: 12 }, (_, k) => k) as k (k)}
        <ellipse
          cx={70 + k * 9.5}
          cy="110"
          rx="4"
          ry="18"
          fill="none"
          stroke="#b45309"
          stroke-width="2"
        />
      {/each}
      {#if pole}
        <rect
          x="194"
          y="98"
          width="20"
          height="24"
          rx="4"
          fill={pole === 'N' ? '#dc2626' : '#2563eb'}
        />
        <text x="204" y="115" text-anchor="middle" class="fill-white text-[13px] font-bold"
          >{pole}</text
        >
      {/if}
      <text x="120" y="80" text-anchor="middle" class="fill-slate-600 text-[10px]"
        >nam châm điện (cuộn dây có lõi sắt)</text
      >

      {#if object === 'kim'}
        <!-- compass needle: north tip red, pointing north at rest -->
        <circle cx="282" cy="110" r="40" fill="#f8fafc" stroke="#94a3b8" />
        <text x="282" y="80" text-anchor="middle" class="fill-slate-400 text-[8px]">Bắc</text>
        <g transform="rotate({tilt} 282 110)">
          <path d="M282,76 L290,110 L274,110 Z" fill="#dc2626" />
          <path d="M282,144 L290,110 L274,110 Z" fill="#2563eb" />
          <text x="282" y="102" text-anchor="middle" class="fill-white text-[8px] font-bold">N</text
          >
        </g>
        <circle cx="282" cy="110" r="3" fill="#0f172a" />
      {:else}
        <!-- iron nail hanging on a thread -->
        <line x1="250" y1="24" x2="300" y2="24" stroke="#475569" stroke-width="3" />
        <g transform="rotate({pull} 275 24)">
          <line x1="275" y1="24" x2="275" y2="92" stroke="#64748b" />
          <rect x="271" y="92" width="8" height="5" fill="#475569" />
          <path d="M273,97 L277,97 L277,132 L275,138 L273,132 Z" fill="#64748b" />
        </g>
      {/if}
    </svg>
  </figure>

  <div class="flex flex-wrap gap-2">
    <button type="button" class={button.primary} onclick={toggleSwitch}
      >{closed ? 'Ngắt công tắc' : 'Đóng công tắc'}</button
    >
    {#if source === 'mot-chieu'}
      <button
        type="button"
        class={button.secondary}
        onclick={() => {
          reversed = !reversed;
          wake();
        }}>Đổi chiều nguồn</button
      >
    {:else if reduce}
      <button type="button" class={button.secondary} onclick={quarterStep} disabled={!closed}
        >Tiến 1/4 chu kì</button
      >
    {/if}
  </div>
  {#if source === 'xoay-chieu'}
    <SegmentedControl
      label="Tốc độ đổi chiều (làm chậm để quan sát)"
      options={SPEEDS.map((s) => ({ value: s.value, label: s.label }))}
      bind:value={speed}
      onchange={wake}
    />
    {#if reduce}
      <p class="text-sm text-slate-600">
        Máy của em đang bật chế độ giảm chuyển động: bấm "Tiến 1/4 chu kì" để xem dòng điện từng
        bước.
      </p>
    {/if}
  {/if}

  <div class="{card} p-3">
    <p class="mb-1 text-sm text-slate-700">
      Đầu cuộn dây gần {object === 'kim' ? 'kim nam châm' : 'đinh sắt'}: <b>{poleText}</b>
    </p>
    <svg
      viewBox="0 0 360 90"
      class="block w-full"
      role="img"
      aria-label="Đồ thị cường độ dòng điện qua cuộn dây theo thời gian"
    >
      <line x1="24" y1="45" x2="354" y2="45" stroke="#94a3b8" />
      <line x1="24" y1="6" x2="24" y2="84" stroke="#94a3b8" />
      <text x="4" y="14" class="fill-slate-600 text-[11px] italic">I</text>
      <text x="346" y="58" class="fill-slate-600 text-[11px] italic">t</text>
      {#if trace.length > 1}
        <polyline points={traceLine} fill="none" stroke="#4f46e5" stroke-width="2" />
      {/if}
    </svg>
  </div>

  <FeedbackNote tone={closed ? 'ok' : 'info'} text={feedback} />
</div>
