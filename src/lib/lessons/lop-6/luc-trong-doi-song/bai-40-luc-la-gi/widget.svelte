<script>
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { card } from '#lib/core/ui.js';
  import { formatNumber } from '#lib/core/number-format.js';
  import { arrowHead, shaftEnd } from '#lib/domain/arrow.js';
  import { fromPolar, toPolar } from '#lib/domain/vector.js';
  import {
    BALLS,
    DIRECTIONS,
    STARTS,
    STRENGTHS,
    VISIBLE_SQUASH,
    applyForce,
    classify,
    squash,
  } from './engine.js';

  const uid = $props.id();
  const W = 360;
  const H = 240;
  const CX = 180;
  const CY = 120;
  const R = 18;
  // Pixels the ball travels per time step for a speed of one square per step.
  const STEP = 14;

  /** @type {import('./engine.js').BallId} */
  let ballId = $state('bong');
  /** @type {import('./engine.js').StartId} */
  let startId = $state('dung-yen');
  let action = $state('day');
  let angle = $state(0);
  let strength = $state(2);

  const start = $derived(STARTS.find((s) => s.id === startId) ?? STARTS[0]);
  const ball = $derived(BALLS.find((b) => b.id === ballId) ?? BALLS[0]);
  const dir = $derived(DIRECTIONS.find((d) => d.angle === angle) ?? DIRECTIONS[0]);
  const acting = $derived(action !== 'khong');
  const s = $derived(acting ? strength : 0);
  const u = $derived(start.velocity);
  const v = $derived(applyForce(u, angle, s));
  const change = $derived(classify(u, v));
  const dent = $derived(squash(ballId, s));

  /** SVG point for a plane offset in pixels (y up). @param {{ x: number, y: number }} p */
  const px = (p) => ({ x: CX + p.x, y: CY - p.y });

  const before = $derived([-3, -2, -1].map((t) => px({ x: u.x * t * STEP, y: u.y * t * STEP })));
  const after = $derived([1, 2, 3].map((t) => px({ x: v.x * t * STEP, y: v.y * t * STEP })));

  const unit = $derived(fromPolar(1, angle));
  // A push comes from behind the ball, a pull from a rope in front of it.
  const hand = $derived(
    action === 'day'
      ? px({ x: -unit.x * (R + 22), y: -unit.y * (R + 22) })
      : px({ x: unit.x * (R + 70), y: unit.y * (R + 70) }),
  );
  const forceTip = $derived(px({ x: unit.x * (R + 14 + 14 * s), y: unit.y * (R + 14 + 14 * s) }));

  const speed = (/** @type {{ x: number, y: number }} */ w) =>
    `${formatNumber(toPolar(w).magnitude, 1)} ô/bước`;

  /** @type {Record<import('./engine.js').Change, string>} */
  const CHANGE_TEXT = {
    'dung-yen': 'Không có lực tác dụng: quả bóng vẫn đứng yên.',
    'khong-doi': 'Không có lực tác dụng: quả bóng vẫn lăn thẳng như cũ, tốc độ và hướng không đổi.',
    'bat-dau': 'Vật đang đứng yên bắt đầu chuyển động theo hướng của lực.',
    'dung-lai': 'Lực ngược chiều chuyển động làm vật đang chuyển động dừng lại.',
    'nhanh-len': 'Lực cùng chiều chuyển động làm vật chuyển động nhanh lên.',
    'cham-lai': 'Lực ngược chiều chuyển động làm vật chuyển động chậm lại.',
    'bat-nguoc':
      'Lực ngược chiều và đủ mạnh làm vật dừng lại rồi chuyển động theo chiều ngược lại: hướng chuyển động thay đổi.',
    'doi-huong': 'Lực không cùng phương với chuyển động làm vật đổi hướng chuyển động.',
  };

  const feedback = $derived.by(() => {
    const motion = CHANGE_TEXT[change];
    if (!acting) return motion;
    const verb = action === 'day' ? 'Tay đẩy' : 'Tay kéo';
    const speeds = `Tốc độ trước: ${speed(u)}, sau: ${speed(v)}.`;
    const shape =
      dent >= VISIBLE_SQUASH
        ? `Trong lúc tay ${action === 'day' ? 'đẩy' : 'kéo'}, ${ball.name.toLowerCase()} bị méo đi: lực còn làm vật biến dạng.`
        : `${ball.name} cứng, biến dạng rất ít nên mắt thường không thấy được.`;
    return `${verb} ${dir.name}, lực ${STRENGTHS.find((x) => x.value === s)?.name.toLowerCase()}. ${motion} ${speeds} ${shape}`;
  });
</script>

<div class="space-y-4">
  <div class="grid gap-3 sm:grid-cols-2">
    <SegmentedControl
      label="Vật"
      options={BALLS.map((b) => ({ value: b.id, label: b.name }))}
      bind:value={ballId}
    />
    <SegmentedControl
      label="Lúc đầu, vật"
      options={STARTS.map((b) => ({ value: b.id, label: b.name }))}
      bind:value={startId}
    />
    <SegmentedControl
      label="Tay"
      options={[
        { value: 'day', label: 'Đẩy' },
        { value: 'keo', label: 'Kéo' },
        { value: 'khong', label: 'Không tác dụng' },
      ]}
      bind:value={action}
    />
    <SegmentedControl
      label="Độ mạnh của lực"
      options={STRENGTHS.map((x) => ({ value: x.value, label: x.name }))}
      bind:value={strength}
    />
  </div>
  <fieldset class="min-w-0" disabled={!acting}>
    <legend class="mb-1 text-sm font-semibold text-slate-700">Hướng của lực</legend>
    <div class="grid grid-cols-4 gap-1 rounded-xl bg-slate-100 p-1 sm:grid-cols-8">
      {#each DIRECTIONS as d (d.angle)}
        <label
          class="flex min-h-11 cursor-pointer items-center justify-center rounded-lg text-xl font-bold text-slate-600 has-[:checked]:bg-white has-[:checked]:text-indigo-700 has-[:checked]:shadow-sm has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-indigo-500 has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-50"
        >
          <input
            type="radio"
            class="sr-only"
            name="{uid}-huong"
            value={d.angle}
            aria-label="Lực hướng {d.name}"
            bind:group={angle}
          />
          <span aria-hidden="true">{d.arrow}</span>
        </label>
      {/each}
    </div>
  </fieldset>

  <figure class="{card} overflow-hidden p-2">
    <svg
      viewBox="0 0 {W} {H}"
      class="mx-auto block w-full max-w-lg select-none"
      role="img"
      aria-label="{ball.name} {start.name.toLowerCase()}. {feedback}"
    >
      <defs>
        <pattern id="{uid}-luoi" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e2e8f0" />
        </pattern>
      </defs>
      <rect width={W} height={H} fill="url(#{uid}-luoi)" />

      <!-- where the ball was: grey ghosts one step apart -->
      {#if toPolar(u).magnitude > 0}
        <polyline
          points="{before.map((p) => `${p.x},${p.y}`).join(' ')} {CX},{CY}"
          fill="none"
          stroke="#94a3b8"
          stroke-dasharray="4 4"
        />
        {#each before as p, i (i)}
          <circle cx={p.x} cy={p.y} r={R} fill="#cbd5e1" fill-opacity={0.25 + i * 0.15} />
        {/each}
      {/if}
      <!-- where the ball goes after the force -->
      {#if toPolar(v).magnitude > 0}
        <polyline
          points="{CX},{CY} {after.map((p) => `${p.x},${p.y}`).join(' ')}"
          fill="none"
          stroke="#6366f1"
          stroke-dasharray="4 4"
        />
        {#each after as p, i (i)}
          <circle
            cx={p.x}
            cy={p.y}
            r={R}
            fill={ballId === 'bong' ? '#f97316' : '#64748b'}
            fill-opacity={0.55 - i * 0.15}
          />
        {/each}
      {/if}

      <!-- the hand and the force it gives -->
      {#if acting}
        {#if action === 'keo'}
          <line
            x1={CX + unit.x * R}
            y1={CY - unit.y * R}
            x2={hand.x}
            y2={hand.y}
            stroke="#a16207"
            stroke-width="2.5"
          />
        {/if}
        <g transform="translate({hand.x} {hand.y})">
          <rect x="-16" y="-13" width="32" height="26" rx="10" fill="#fcd34d" stroke="#a16207" />
          <text y="4" text-anchor="middle" class="fill-amber-900 text-[10px] font-bold">Tay</text>
        </g>
      {/if}

      <!-- the ball at the moment the force acts -->
      <ellipse
        cx={CX}
        cy={CY}
        rx={R * (1 - dent)}
        ry={R * (1 + dent / 2)}
        transform="rotate({-angle} {CX} {CY})"
        fill={ballId === 'bong' ? '#f97316' : '#64748b'}
        stroke={ballId === 'bong' ? '#9a3412' : '#1e293b'}
        stroke-width="2"
      />

      {#if acting}
        {@const end = shaftEnd(CX, CY, forceTip.x, forceTip.y, 11)}
        <line x1={CX} y1={CY} x2={end.x} y2={end.y} stroke="#dc2626" stroke-width="3.5" />
        <polygon points={arrowHead(CX, CY, forceTip.x, forceTip.y, 11)} fill="#dc2626" />
      {/if}
    </svg>
    <figcaption class="flex flex-wrap justify-center gap-x-4 gap-y-1 px-2 text-xs text-slate-600">
      <span>Chấm xám: vị trí trước khi có lực</span>
      <span class="text-indigo-700"
        >Chấm màu: vị trí sau đó, cách nhau cùng một khoảng thời gian</span
      >
      <span class="text-red-700">Mũi tên đỏ: lực của tay</span>
    </figcaption>
  </figure>

  <p
    class="rounded-xl px-4 py-3 text-sm font-semibold {change === 'dung-yen' ||
    change === 'khong-doi'
      ? 'bg-slate-100 text-slate-700'
      : 'bg-emerald-50 text-emerald-800'}"
    aria-live="polite"
  >
    {feedback}
  </p>
</div>
