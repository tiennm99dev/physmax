<script>
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import { button, card, textInput } from '#lib/core/ui.js';
  import { qty } from '../_shared/materials.js';
  import {
    CYLINDER,
    D_TOLERANCE,
    OBJECTS,
    checkField,
    densityFrom,
    labObject,
    levelAfter,
    readTyped,
  } from './engine.js';

  let objectId = $state(OBJECTS[0].id);
  let weighed = $state(false);
  let dropped = $state(false);
  let typedM = $state('');
  let typedV1 = $state('');
  let typedV2 = $state('');
  let typedD = $state('');
  /** @type {{ tone: 'ok' | 'warn' | 'info', lines: string[] } | null} */
  let note = $state(null);

  const obj = $derived(labObject(objectId));
  const level = $derived(dropped ? levelAfter(obj) : obj.start);
  const trueD = $derived(densityFrom(obj.mass, obj.start, levelAfter(obj)) ?? 0);

  function reset() {
    weighed = false;
    dropped = false;
    typedM = '';
    typedV1 = '';
    typedV2 = '';
    typedD = '';
    note = null;
  }

  function weigh() {
    if (dropped) return;
    weighed = true;
    note = {
      tone: 'info',
      lines: [
        'Đã đặt vật lên cân. Đọc số chỉ trên màn hình cân, ghi vào ô m, rồi đọc mực nước V₁ trong bình.',
      ],
    };
  }

  function drop() {
    if (!weighed) {
      note = {
        tone: 'warn',
        lines: [
          'Hãy cân vật trước. Vật đã nhúng nước thì bị ướt, cân sau sẽ cho khối lượng lớn hơn.',
        ],
      };
      return;
    }
    dropped = true;
    note = {
      tone: 'info',
      lines: [
        'Vật đã chìm hẳn trong nước, mực nước dâng lên. Đọc mực nước mới V₂ với mắt đặt ngang mực chất lỏng.',
      ],
    };
  }

  /** @type {Record<string, string>} */
  const WORD = {
    empty: 'chưa nhập',
    invalid: 'chưa phải là một số',
    wrong: 'chưa đúng',
    ok: 'đúng',
  };

  function check() {
    if (!dropped) {
      note = {
        tone: 'warn',
        lines: ['Hãy cân vật và thả vật vào bình chia độ trước khi kiểm tra.'],
      };
      return;
    }
    const rM = checkField(typedM, obj.mass);
    const rV1 = checkField(typedV1, obj.start);
    const rV2 = checkField(typedV2, levelAfter(obj));
    const rD = checkField(typedD, trueD, D_TOLERANCE);
    const lines = [
      `m: ${WORD[rM]}.${rM === 'wrong' ? ' Đọc lại số trên màn hình cân.' : ''}`,
      `V₁: ${WORD[rV1]}.${rV1 === 'wrong' ? ` Mỗi vạch chia ứng với ${CYLINDER.step} mL; đếm vạch từ số ghi gần nhất.` : ''}`,
      `V₂: ${WORD[rV2]}.${rV2 === 'wrong' ? ' Đọc ở đáy mặt nước, mắt ngang mực nước; dùng khung phóng to.' : ''}`,
    ];
    if (rD === 'ok') {
      lines.push(`D: đúng, ${qty(trueD, 2)} g/cm³ = ${qty(trueD * 1000)} kg/m³ (${obj.material}).`);
    } else {
      const m = readTyped(typedM);
      const v1 = readTyped(typedV1);
      const v2 = readTyped(typedV2);
      const own = m !== null && v1 !== null && v2 !== null ? densityFrom(m, v1, v2) : null;
      const consistent =
        rD === 'wrong' && own !== null && checkField(typedD, own, D_TOLERANCE) === 'ok';
      lines.push(
        `D: ${WORD[rD]}.${
          consistent
            ? ' Em tính đúng từ số đã đọc, nhưng số đọc chưa đúng nên D chưa đúng.'
            : rD === 'wrong'
              ? ' Tính V = V₂ − V₁ (1 mL = 1 cm³) rồi D = m : V.'
              : ''
        }`,
      );
    }
    const all = [rM, rV1, rV2, rD].every((r) => r === 'ok');
    note = { tone: all ? 'ok' : 'warn', lines: all ? ['Hoàn thành phép đo!', ...lines] : lines };
  }

  // Cylinder: 0 mL at y = BOTTOM, PX_PER_ML pixels per mL.
  const BOTTOM = 280;
  const PX_PER_ML = 2.5;
  const LEFT = 60;
  const WIDTH = 60;
  const yOf = (/** @type {number} */ v) => BOTTOM - v * PX_PER_ML;
  const ticks = Array.from(
    { length: CYLINDER.max / CYLINDER.step + 1 },
    (_, i) => i * CYLINDER.step,
  );
  // The zoom window: the scale and the left part of the water surface.
  const ZOOM = { x: LEFT - 26, w: 70, h: 44 };
  const zoomTop = $derived(yOf(level) - ZOOM.h / 2);

  const scaleText = $derived(weighed && !dropped ? `${qty(obj.mass, 1)} g` : '0,0 g');
</script>

{#snippet cylinder()}
  <rect
    x={LEFT}
    y={yOf(level)}
    width={WIDTH}
    height={BOTTOM - yOf(level)}
    fill="#bae6fd"
    opacity="0.85"
  />
  <line
    x1={LEFT}
    y1={yOf(level)}
    x2={LEFT + WIDTH}
    y2={yOf(level)}
    stroke="#0369a1"
    stroke-width="1.2"
  />
  {#if dropped}
    <path
      d="M{LEFT + 18} {BOTTOM} l6 -12 l14 -3 l8 9 l-2 6 z"
      fill="#57534e"
      stroke="#292524"
      stroke-width="0.8"
    />
  {/if}
  {#each ticks as t (t)}
    <line
      x1={LEFT}
      y1={yOf(t)}
      x2={LEFT + (t % 10 === 0 ? 16 : 8)}
      y2={yOf(t)}
      stroke="#0f172a"
      stroke-width="0.6"
    />
    {#if t % 10 === 0}
      <text x={LEFT - 4} y={yOf(t) + 3} text-anchor="end" class="fill-slate-700 text-[8px]"
        >{t}</text
      >
    {/if}
  {/each}
  <rect
    x={LEFT}
    y={yOf(CYLINDER.max) - 8}
    width={WIDTH}
    height={BOTTOM - yOf(CYLINDER.max) + 8}
    fill="none"
    stroke="#475569"
    stroke-width="1.5"
  />
{/snippet}

<div class="space-y-4">
  <SegmentedControl
    label="Vật cần đo"
    options={OBJECTS.map((o) => ({ value: o.id, label: o.name }))}
    bind:value={objectId}
    onchange={reset}
  />

  <div class="grid gap-4 sm:grid-cols-3">
    <figure class="{card} overflow-hidden p-2">
      <svg
        viewBox="0 0 200 150"
        class="mx-auto block w-full max-w-xs"
        role="img"
        aria-label={weighed && !dropped
          ? `Cân điện tử có ${obj.name.toLowerCase()} trên đĩa cân, màn hình chỉ ${scaleText}.`
          : 'Cân điện tử chưa có vật, màn hình chỉ 0,0 g.'}
      >
        <rect x="30" y="80" width="140" height="10" rx="3" fill="#94a3b8" />
        <rect x="20" y="90" width="160" height="50" rx="8" fill="#334155" />
        <rect x="60" y="102" width="80" height="24" rx="3" fill="#0f172a" />
        <text
          x="134"
          y="119"
          text-anchor="end"
          class="fill-lime-300 font-mono text-[13px] font-semibold">{scaleText}</text
        >
        {#if weighed && !dropped}
          <path d="M84 80 l6 -14 l18 -4 l10 10 l-2 8 z" fill="#57534e" stroke="#292524" />
        {/if}
      </svg>
      <figcaption class="px-2 text-center text-xs text-slate-600">Cân điện tử (đọc m)</figcaption>
    </figure>

    <figure class="{card} overflow-hidden p-2">
      <svg
        viewBox="0 0 180 300"
        class="mx-auto block w-full max-w-[11rem]"
        role="img"
        aria-label="Bình chia độ, giới hạn đo {CYLINDER.max} mL, độ chia nhỏ nhất {CYLINDER.step} mL{dropped
          ? `, ${obj.name.toLowerCase()} nằm ở đáy bình`
          : ''}. Đọc mực nước trên hình hoặc trong khung phóng to."
      >
        {@render cylinder()}
        <rect
          x={ZOOM.x}
          y={zoomTop}
          width={ZOOM.w}
          height={ZOOM.h}
          fill="none"
          stroke="#f59e0b"
          stroke-dasharray="3 2"
        />
        <text x="150" y="292" class="fill-slate-600 text-[8px]">mL</text>
      </svg>
      <figcaption class="px-2 text-center text-xs text-slate-600">
        Bình chia độ (GHĐ {CYLINDER.max} mL, ĐCNN {CYLINDER.step} mL)
      </figcaption>
    </figure>

    <figure class="{card} overflow-hidden p-2">
      <svg
        viewBox="{ZOOM.x} {zoomTop} {ZOOM.w} {ZOOM.h}"
        class="block w-full overflow-hidden"
        role="img"
        aria-label="Khung phóng to quanh mặt nước trong bình chia độ."
      >
        {@render cylinder()}
      </svg>
      <figcaption class="px-2 text-center text-xs text-slate-600">
        Khung phóng to quanh mặt nước (khung cam)
      </figcaption>
    </figure>
  </div>

  <div class="flex flex-wrap gap-2">
    <button type="button" class={button.primary} onclick={weigh} disabled={weighed}>
      1. Đặt vật lên cân
    </button>
    <button type="button" class={button.primary} onclick={drop} disabled={dropped}>
      2. Thả vật vào bình chia độ
    </button>
    <button type="button" class={button.quiet} onclick={reset}>Làm lại</button>
  </div>

  <div class="grid grid-cols-2 gap-3 sm:grid-cols-4">
    <label class="text-sm font-semibold text-slate-700">
      m (g)
      <input class="{textInput} mt-1" inputmode="decimal" bind:value={typedM} />
    </label>
    <label class="text-sm font-semibold text-slate-700">
      V₁ (mL)
      <input class="{textInput} mt-1" inputmode="decimal" bind:value={typedV1} />
    </label>
    <label class="text-sm font-semibold text-slate-700">
      V₂ (mL)
      <input class="{textInput} mt-1" inputmode="decimal" bind:value={typedV2} />
    </label>
    <label class="text-sm font-semibold text-slate-700">
      D (g/cm³)
      <input class="{textInput} mt-1" inputmode="decimal" bind:value={typedD} />
    </label>
  </div>

  <button type="button" class={button.secondary} onclick={check}>Kiểm tra số đo</button>

  <div
    class="rounded-xl px-4 py-3 text-sm font-semibold {note?.tone === 'ok'
      ? 'bg-emerald-50 text-emerald-800'
      : note?.tone === 'warn'
        ? 'bg-amber-50 text-amber-900'
        : 'bg-slate-100 text-slate-700'}"
    aria-live="polite"
  >
    {#if note}
      {#each note.lines as line, i (i)}
        <p>{line}</p>
      {/each}
    {:else}
      <p>
        Bước 1: cân {obj.name.toLowerCase()}. Bước 2: đọc V₁, thả vật vào bình, đọc V₂. Bước 3: tính
        V = V₂ − V₁ và D = m : V.
      </p>
    {/if}
  </div>
</div>
