<script>
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { frameLoop, reducedMotion } from '#lib/core/motion.js';
  import { formatNumber } from '#lib/core/number-format.js';
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import { button, card } from '#lib/core/ui.js';
  import { arrowHead, shaftEnd } from '#lib/domain/arrow.js';
  import { SURFACES, cartAt, playbackRate, roadMarks, stopDistance, stopTime } from './engine.js';

  const W = 360;
  const H = 150;
  const GROUND = 112;
  const START = 56;
  const PX_PER_M = 26;
  const MARK_STEP = 2;
  const CAMERA_AT = 170;
  /** Simulated seconds shown at once when animation is turned off. */
  const STILL_TIME = 10;

  const options = SURFACES.map((s) => ({ value: s.id, label: s.label }));

  let surfaceId = $state('cat');
  let v0 = $state(4);
  let time = $state(0);
  let playing = $state(false);
  /** @type {Record<string, number>} */
  let results = $state({});
  /** @type {(() => void) | null} */
  let stopLoop = null;

  const surface = $derived(SURFACES.find((s) => s.id === surfaceId) ?? SURFACES[0]);
  const cart = $derived(cartAt(v0, surface.drag, time));
  const rate = $derived(playbackRate(v0, surface.drag));
  const noDrag = $derived(surface.drag === 0);
  const stopped = $derived(time >= stopTime(v0, surface.drag));

  const cartX = $derived(Math.min(START + cart.d * PX_PER_M, CAMERA_AT));
  const offset = $derived(Math.max(0, cart.d - (CAMERA_AT - START) / PX_PER_M));
  const marks = $derived(
    roadMarks(Math.max(0, offset - START / PX_PER_M), (W + START) / PX_PER_M, MARK_STEP),
  );
  const dragLen = $derived(cart.v > 0 && surface.drag > 0 ? 12 + surface.drag * 6 : 0);

  /** @param {number} metres */
  const markX = (metres) => START + (metres - offset) * PX_PER_M;

  function halt() {
    stopLoop?.();
    stopLoop = null;
    playing = false;
  }

  function reset() {
    halt();
    time = 0;
  }

  function run() {
    if (playing) {
      halt();
      return;
    }
    if (reducedMotion()) {
      time = noDrag ? STILL_TIME : stopTime(v0, surface.drag);
      results[surface.id] = stopDistance(v0, surface.drag);
      return;
    }
    time = 0;
    playing = true;
    if (noDrag) results[surface.id] = Infinity;
    const total = stopTime(v0, surface.drag);
    stopLoop = frameLoop((dt) => {
      time = Math.min(total, time + dt * rate);
      if (time >= total) {
        results[surface.id] = stopDistance(v0, surface.drag);
        halt();
      }
    });
  }

  /** @param {string | number} id */
  function pickSurface(id) {
    surfaceId = String(id);
    reset();
  }

  /** @param {number} value */
  function pickSpeed(value) {
    v0 = value;
    results = {};
    reset();
  }

  const note = $derived.by(() => {
    if (time === 0) {
      return {
        tone: /** @type {const} */ ('info'),
        text: 'Trọng lực và phản lực của mặt đường cân bằng nhau, nên chỉ còn lực cản làm xe chậm lại. Thả xe trên từng mặt, từ thô đến nhẵn.',
      };
    }
    if (noDrag) {
      return {
        tone: /** @type {const} */ ('ok'),
        text: `Hợp lực bằng $0$: vận tốc giữ nguyên $${formatNumber(v0)}$ m/s, xe chuyển động thẳng đều và không bao giờ tự dừng. Đây chính là chuyển động theo quán tính.`,
      };
    }
    if (stopped) {
      return {
        tone: /** @type {const} */ ('info'),
        text: `Xe dừng sau ${formatNumber(cart.d, 1)} m vì có lực cản, không phải vì "hết lực đẩy". Lực cản càng nhỏ, xe đi càng xa. Thử mặt nhẵn hơn.`,
      };
    }
    return {
      tone: /** @type {const} */ ('info'),
      text: 'Lực cản ngược chiều chuyển động đang làm vận tốc giảm dần.',
    };
  });

  $effect(() => () => stopLoop?.());
</script>

<div class="space-y-4">
  <SegmentedControl label="Mặt đường" {options} value={surfaceId} onchange={pickSurface} />

  <div class="{card} overflow-hidden p-2">
    <svg
      viewBox="0 0 {W} {H}"
      class="w-full select-none"
      role="img"
      aria-label={`Xe trên mặt ${surface.label}: vận tốc ${formatNumber(cart.v, 1)} mét trên giây, đã đi ${formatNumber(cart.d, 1)} mét.`}
    >
      <rect x="0" y={GROUND} width={W} height={H - GROUND} fill={noDrag ? '#e0f2fe' : '#f1f5f9'} />
      <line x1="0" y1={GROUND} x2={W} y2={GROUND} stroke="#475569" stroke-width="2" />
      {#each marks as mark (mark)}
        <line x1={markX(mark)} x2={markX(mark)} y1={GROUND} y2={GROUND + 7} stroke="#475569" />
        <text x={markX(mark)} y={GROUND + 32} font-size="11" fill="#475569" text-anchor="middle">
          {`${formatNumber(mark)} m`}
        </text>
      {/each}

      <rect x={cartX - 22} y={GROUND - 30} width="44" height="20" rx="4" fill="#4f46e5" />
      <circle cx={cartX - 12} cy={GROUND - 6} r="6" fill="#1e293b" />
      <circle cx={cartX + 12} cy={GROUND - 6} r="6" fill="#1e293b" />

      <line
        x1={cartX}
        y1={GROUND - 30}
        x2={cartX}
        y2={GROUND - 60}
        stroke="#059669"
        stroke-width="3"
      />
      <polygon points={arrowHead(cartX, GROUND - 30, cartX, GROUND - 66, 8)} fill="#059669" />
      <text x={cartX + 6} y={GROUND - 58} font-size="12" font-weight="700" fill="#059669">N</text>
      <line
        x1={cartX}
        y1={GROUND - 20}
        x2={cartX}
        y2={GROUND + 10}
        stroke="#0f172a"
        stroke-width="3"
      />
      <polygon points={arrowHead(cartX, GROUND - 20, cartX, GROUND + 16, 8)} fill="#0f172a" />
      <text x={cartX + 6} y={GROUND + 16} font-size="12" font-weight="700" fill="#0f172a">P</text>

      {#if dragLen > 0}
        {@const end = shaftEnd(cartX - 22, GROUND - 20, cartX - 22 - dragLen, GROUND - 20, 8)}
        <line
          x1={cartX - 22}
          y1={GROUND - 20}
          x2={end.x}
          y2={end.y}
          stroke="#e11d48"
          stroke-width="3"
        />
        <polygon
          points={arrowHead(cartX - 22, GROUND - 20, cartX - 22 - dragLen, GROUND - 20, 8)}
          fill="#e11d48"
        />
        <text
          x={cartX - 22 - dragLen}
          y={GROUND - 28}
          font-size="12"
          font-weight="700"
          fill="#e11d48">F cản</text
        >
      {/if}
    </svg>
  </div>

  <div class="grid gap-3 sm:grid-cols-[1fr_auto] sm:items-end">
    <SliderField
      label="Vận tốc lúc thả xe"
      value={v0}
      min={1}
      max={6}
      step={1}
      unit="m/s"
      oninput={pickSpeed}
    />
    <button type="button" class={button.primary} onclick={run}>
      {playing ? 'Dừng quan sát' : 'Thả xe'}
    </button>
  </div>

  <dl class="grid grid-cols-3 gap-2 text-center text-sm">
    <div class="rounded-xl bg-indigo-50 px-2 py-2">
      <dt class="font-semibold text-indigo-800">Vận tốc</dt>
      <dd class="tabular-nums">{`${formatNumber(cart.v, 1)} m/s`}</dd>
    </div>
    <div class="rounded-xl bg-violet-50 px-2 py-2">
      <dt class="font-semibold text-violet-800">Đã đi</dt>
      <dd class="tabular-nums">{`${formatNumber(cart.d, 1)} m`}</dd>
    </div>
    <div class="rounded-xl bg-slate-100 px-2 py-2">
      <dt class="font-semibold text-slate-700">Thời gian</dt>
      <dd class="tabular-nums">{`${formatNumber(time, 1)} s`}</dd>
    </div>
  </dl>
  {#if playing && rate > 1}
    <p class="text-center text-xs text-slate-500">
      {`Đang tua nhanh ${formatNumber(rate, 1)} lần.`}
    </p>
  {/if}

  <div class="overflow-x-auto">
    <table class="w-full text-center text-sm">
      <caption class="mb-1 text-left font-semibold text-slate-700">
        {`Quãng đường đến khi dừng, thả xe với vận tốc ${formatNumber(v0)} m/s`}
      </caption>
      <thead>
        <tr class="bg-slate-100">
          <th scope="col" class="px-2 py-1 font-semibold">Mặt đường</th>
          <th scope="col" class="px-2 py-1 font-semibold">Gia tốc do lực cản</th>
          <th scope="col" class="px-2 py-1 font-semibold">Quãng đường</th>
        </tr>
      </thead>
      <tbody>
        {#each SURFACES as s (s.id)}
          <tr class="border-b border-slate-100" class:font-semibold={s.id === surfaceId}>
            <td class="px-2 py-1">{s.label}</td>
            <td class="px-2 py-1 tabular-nums">{`${formatNumber(s.drag)} m/s²`}</td>
            <td class="px-2 py-1 tabular-nums">
              {#if results[s.id] === undefined}
                ?
              {:else if results[s.id] === Infinity}
                Không dừng
              {:else}
                {`${formatNumber(results[s.id], 1)} m`}
              {/if}
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>

  <FeedbackNote tone={note.tone} text={note.text} />
</div>
