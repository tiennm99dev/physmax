<script>
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { button, card } from '#lib/core/ui.js';
  import { qty } from '#lib/domain/materials.js';
  import { BRICK, FACES, MAX_BRICKS, TARGETS, dentMm, face, stack, waysTo } from './engine.js';

  /** @typedef {import('./engine.js').FaceId} FaceId */

  /** @type {FaceId} */
  let faceId = $state('nam');
  let count = $state(1);
  let targetAt = $state(0);
  let challenge = $state(false);

  const f = $derived(face(faceId));
  const s = $derived(stack(faceId, count));
  const target = $derived(TARGETS[targetAt]);
  const hit = $derived(challenge && s.p === target);

  const COUNTS = Array.from({ length: MAX_BRICKS }, (_, i) => ({
    value: i + 1,
    label: `${i + 1} viên`,
  }));

  // Oblique drawing: K px per cm, depth at 45° and halved.
  const K = 4;
  const SAND = 270;
  const CX = 150;
  const w = $derived(f.base[0] * K);
  const dd = $derived((f.base[1] * K) / 2 / Math.SQRT2);
  const h = $derived(f.height * K);
  const dent = $derived(dentMm(s.p) * 1.2);
  const x0 = $derived(CX - (w + dd) / 2);
  const bricks = $derived(
    Array.from({ length: count }, (_, i) => {
      const yb = SAND + dent - i * h;
      return {
        front: { x: x0, y: yb - h, w, h },
        top: `${x0},${yb - h} ${x0 + dd},${yb - h - dd} ${x0 + w + dd},${yb - h - dd} ${x0 + w},${yb - h}`,
        side: `${x0 + w},${yb} ${x0 + w},${yb - h} ${x0 + w + dd},${yb - h - dd} ${x0 + w + dd},${yb - dd}`,
      };
    }),
  );

  const N = (/** @type {number} */ v) => `${qty(v)} N`;
  const Pa = (/** @type {number} */ v) => `${qty(v)} Pa`;

  const feedback = $derived.by(() => {
    const base = `${count} viên gạch ${f.name.toLowerCase()}: áp lực F = ${N(s.force)}, diện tích bị ép S = ${f.base[0]} cm × ${f.base[1]} cm = ${s.area.cm2} cm² = ${qty(s.area.m2, 3)} m², áp suất p = F : S = ${Pa(s.p)}. Gạch lún ${qty(dentMm(s.p), 1)} mm (mô hình).`;
    if (!challenge) return { tone: /** @type {'info'} */ ('info'), text: base };
    if (hit) {
      const others = waysTo(target).filter((w) => !(w.face === faceId && w.n === count));
      const more = others.length
        ? ` Còn cách khác: ${others.map((o) => `${o.n} viên ${face(o.face).name.toLowerCase()}`).join(', ')}.`
        : '';
      return {
        tone: /** @type {'ok'} */ ('ok'),
        text: `Đạt ${Pa(target)}! ${base}${more}`,
      };
    }
    const hint =
      s.p < target
        ? 'Áp suất còn nhỏ: tăng áp lực (thêm gạch) hoặc giảm diện tích bị ép.'
        : 'Áp suất quá lớn: giảm áp lực (bớt gạch) hoặc tăng diện tích bị ép.';
    return { tone: /** @type {'warn'} */ ('warn'), text: `${hint} Hiện tại p = ${Pa(s.p)}.` };
  });

  function nextTarget() {
    if (challenge) targetAt = (targetAt + 1) % TARGETS.length;
    challenge = true;
  }
</script>

<div class="space-y-4">
  <div class="grid gap-3 sm:grid-cols-2">
    <SegmentedControl
      label="Mặt tiếp xúc với cát"
      options={FACES.map((x) => ({ value: x.id, label: x.name }))}
      bind:value={faceId}
    />
    <SegmentedControl label="Số viên gạch chồng lên nhau" options={COUNTS} bind:value={count} />
  </div>

  <div class="grid gap-4 sm:grid-cols-[3fr_2fr]">
    <figure class="{card} overflow-hidden p-2">
      <svg
        viewBox="0 0 300 330"
        class="mx-auto block w-full max-w-sm"
        role="img"
        aria-label="{count} viên gạch {f.name.toLowerCase()} trên nền cát, lún sâu {qty(
          dentMm(s.p),
          1,
        )} mi-li-mét."
      >
        <polygon points="0,{SAND} 40,{SAND - 40} 300,{SAND - 40} 300,{SAND}" fill="#fde68a" />
        {#each bricks as b, i (i)}
          <polygon points={b.side} fill="#9a3412" />
          <polygon points={b.top} fill="#fb923c" />
          <rect
            x={b.front.x}
            y={b.front.y}
            width={b.front.w}
            height={b.front.h}
            fill="#ea580c"
            stroke="#7c2d12"
          />
        {/each}
        <rect x="0" y={SAND} width="300" height={330 - SAND} fill="#fcd34d" />
        <path
          d="M{x0} {SAND} q {(w + dd) / 2} {dent * 0.6} {w + dd} 0"
          fill="none"
          stroke="#b45309"
          stroke-width="1.5"
        />
        <text x="8" y="322" class="fill-amber-900 text-[11px]">Cát</text>
        <text x="292" y="322" text-anchor="end" class="fill-amber-900 text-[11px] font-semibold"
          >lún {qty(dentMm(s.p), 1)} mm</text
        >
      </svg>
      <figcaption class="px-2 text-center text-xs text-slate-600">
        Mỗi viên gạch {BRICK.length} cm × {BRICK.width} cm × {BRICK.thick} cm, trọng lượng {BRICK.weight}
        N.
      </figcaption>
    </figure>

    <div class="space-y-3">
      <dl class="grid gap-2 text-sm tabular-nums">
        <div class="flex justify-between rounded-xl bg-slate-50 px-3 py-2">
          <dt class="text-slate-600">Áp lực F</dt>
          <dd class="font-semibold">{N(s.force)}</dd>
        </div>
        <div class="flex justify-between rounded-xl bg-slate-50 px-3 py-2">
          <dt class="text-slate-600">Diện tích bị ép S</dt>
          <dd class="font-semibold">{s.area.cm2} cm² = {qty(s.area.m2, 3)} m²</dd>
        </div>
        <div class="flex justify-between rounded-xl bg-indigo-50 px-3 py-2">
          <dt class="text-indigo-700">Áp suất p = F : S</dt>
          <dd class="font-semibold text-indigo-900">{Pa(s.p)}</dd>
        </div>
      </dl>

      <div class="{card} space-y-2 p-3">
        {#if challenge}
          <p class="text-sm font-semibold text-slate-700">
            Thử thách: chọn mặt đặt và số viên gạch để áp suất lên cát bằng đúng {Pa(target)}.
          </p>
        {:else}
          <p class="text-sm text-slate-700">
            Thử thách: đạt một áp suất cho trước bằng cách đổi áp lực hoặc diện tích bị ép.
          </p>
        {/if}
        <div class="flex flex-wrap gap-2">
          <button type="button" class={button.secondary} onclick={nextTarget}>
            {challenge ? 'Thử thách khác' : 'Bắt đầu thử thách'}
          </button>
          {#if challenge}
            <button type="button" class={button.quiet} onclick={() => (challenge = false)}>
              Thoát thử thách
            </button>
          {/if}
        </div>
      </div>
    </div>
  </div>

  <p
    class="rounded-xl px-4 py-3 text-sm font-semibold {feedback.tone === 'ok'
      ? 'bg-emerald-50 text-emerald-800'
      : feedback.tone === 'warn'
        ? 'bg-amber-50 text-amber-900'
        : 'bg-slate-100 text-slate-700'}"
    aria-live="polite"
  >
    {feedback.text}
  </p>
</div>
