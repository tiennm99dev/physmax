<script>
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import LiveRichText from '#lib/components/live-rich-text.svelte';
  import { button, textInput } from '#lib/core/ui.js';
  import { numTex } from '#lib/core/number-format.js';
  import { readNumber } from '#lib/core/decimal.js';
  import RayOpticsBench from '#lib/domain/ray-optics-bench.svelte';
  import { PRESETS, closeEnough, solveLens } from './engine.js';

  /** @type {'hoi-tu' | 'phan-ki'} */
  let lens = $state('hoi-tu');
  let focalSize = $state(PRESETS[0].f);
  let distance = $state(PRESETS[0].d);
  let objectHeight = $state(PRESETS[0].h);
  let preset = $state(0);

  /** @type {'that' | 'ao' | 'khong' | ''} */
  let kind = $state('');
  let typedDistance = $state('');
  let typedHeight = $state('');
  /** @type {null | { kind: boolean, distance: boolean, height: boolean }} */
  let verdict = $state(null);
  let shown = $state(false);

  const focal = $derived(lens === 'hoi-tu' ? focalSize : -focalSize);
  const solution = $derived(solveLens(focal, distance, objectHeight));
  const tn = (/** @type {number} */ v) => numTex(v, 2);

  function reset() {
    verdict = null;
    shown = false;
  }
  function loadPreset() {
    preset = (preset + 1) % PRESETS.length;
    const p = PRESETS[preset];
    lens = p.lens;
    focalSize = p.f;
    distance = p.d;
    objectHeight = p.h;
    kind = '';
    typedDistance = '';
    typedHeight = '';
    reset();
  }
  function check() {
    const s = solution;
    const noImage = s.kind === 'khong';
    verdict = {
      kind: kind === s.kind,
      distance: noImage || closeEnough(readNumber(typedDistance), s.distance ?? 0),
      height: noImage || closeEnough(readNumber(typedHeight), s.height ?? 0),
    };
    shown = true;
  }

  const problem = $derived(
    `Vật $AB$ cao $${tn(objectHeight)}$ cm đặt vuông góc với trục chính của thấu kính ${lens === 'hoi-tu' ? 'hội tụ' : 'phân kì'} tiêu cự $f = ${tn(focalSize)}$ cm, cách thấu kính $d = ${tn(distance)}$ cm. Ảnh là ảnh gì, cách thấu kính bao nhiêu và cao bao nhiêu?`,
  );

  const feedback = $derived.by(() => {
    if (!verdict) {
      return {
        tone: /** @type {const} */ ('info'),
        text: 'Chọn loại ảnh, nhập $d\'$ và $h\'$ (làm tròn đến một chữ số thập phân), rồi nhấn "Kiểm tra". Hình vẽ tia sáng hiện ra sau khi kiểm tra.',
      };
    }
    const s = solution;
    if (verdict.kind && verdict.distance && verdict.height) {
      return {
        tone: /** @type {const} */ ('ok'),
        text:
          s.kind === 'khong'
            ? 'Đúng: vật đặt tại tiêu điểm nên không có ảnh. Xem hình: các tia ló song song.'
            : `Chính xác: ảnh ${s.kind === 'that' ? 'thật' : 'ảo'}, $d' = ${tn(s.distance ?? 0)}$ cm, $h' = ${tn(s.height ?? 0)}$ cm. So sánh với hình vẽ bên dưới.`,
      };
    }
    /** @type {string[]} */
    const wrong = [];
    if (!verdict.kind) wrong.push('loại ảnh');
    if (!verdict.distance) wrong.push("$d'$");
    if (!verdict.height) wrong.push("$h'$");
    return {
      tone: /** @type {const} */ ('warn'),
      text: `Chưa đúng: ${wrong.join(', ')}. ${s.kind === 'khong' ? 'So sánh $d$ với $f$.' : 'Xem hình vẽ và lời giải từng bước bên dưới, rồi thử bài khác.'}`,
    };
  });
</script>

<div class="space-y-4">
  <div class="grid gap-4 sm:grid-cols-2">
    <SegmentedControl
      label="Loại thấu kính"
      options={[
        { value: 'hoi-tu', label: 'Hội tụ' },
        { value: 'phan-ki', label: 'Phân kì' },
      ]}
      bind:value={lens}
      onchange={reset}
    />
    <SliderField
      label="Tiêu cự f"
      bind:value={focalSize}
      min={5}
      max={20}
      unit="cm"
      oninput={reset}
    />
    <SliderField
      label="Khoảng cách vật d"
      bind:value={distance}
      min={2}
      max={48}
      unit="cm"
      oninput={reset}
    />
    <SliderField
      label="Chiều cao vật h"
      bind:value={objectHeight}
      min={1}
      max={6}
      unit="cm"
      oninput={reset}
    />
  </div>

  <p class="rounded-lg bg-slate-50 p-3 text-slate-800"><LiveRichText text={problem} /></p>

  <div class="grid gap-4 sm:grid-cols-3">
    <SegmentedControl
      label="Ảnh là"
      options={[
        { value: 'that', label: 'Ảnh thật' },
        { value: 'ao', label: 'Ảnh ảo' },
        { value: 'khong', label: 'Không có ảnh' },
      ]}
      bind:value={kind}
      onchange={reset}
    />
    <label class="block text-sm font-semibold text-slate-700">
      Khoảng cách ảnh d′ (cm)
      <input
        class="{textInput} mt-1"
        inputmode="decimal"
        bind:value={typedDistance}
        oninput={reset}
        disabled={kind === 'khong'}
      />
    </label>
    <label class="block text-sm font-semibold text-slate-700">
      Chiều cao ảnh h′ (cm)
      <input
        class="{textInput} mt-1"
        inputmode="decimal"
        bind:value={typedHeight}
        oninput={reset}
        disabled={kind === 'khong'}
      />
    </label>
  </div>

  <div class="flex flex-wrap gap-2">
    <button type="button" class={button.primary} onclick={check} disabled={kind === ''}
      >Kiểm tra</button
    >
    <button type="button" class={button.quiet} onclick={() => (shown = !shown)}
      >{shown ? 'Ẩn hình vẽ' : 'Xem hình vẽ'}</button
    >
    <button type="button" class={button.quiet} onclick={loadPreset}>Bài khác</button>
  </div>

  <FeedbackNote tone={feedback.tone} text={feedback.text} />

  {#if shown}
    <RayOpticsBench
      {focal}
      bind:distance
      bind:objectHeight
      interactive
      label="Hình vẽ tia sáng"
      onchange={() => (verdict = null)}
    />
    <p class="text-sm text-slate-600">
      <LiveRichText
        text="Dòng chữ dưới hình ghi $d'$ có dấu: $d' < 0$ là ảnh ảo, cùng phía với vật, và khoảng cách $OA'$ bằng giá trị không dấu của nó."
      />
    </p>
    <ol class="list-decimal space-y-1 pl-6 text-slate-800">
      {#each solution.steps as step, i (i)}
        <li><LiveRichText text={step} /></li>
      {/each}
    </ol>
  {/if}
</div>
