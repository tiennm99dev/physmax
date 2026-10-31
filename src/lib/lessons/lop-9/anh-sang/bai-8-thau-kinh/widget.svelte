<script>
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import SliderField from '#lib/core/slider-field.svelte';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { button } from '#lib/core/ui.js';
  import RayOpticsBench from '#lib/domain/ray-optics-bench.svelte';
  import { TARGETS, ZONE_TEXT, meetsTarget, zoneOf } from './engine.js';

  /** @type {'hoi-tu' | 'phan-ki'} */
  let lens = $state('hoi-tu');
  let focalSize = $state(10);
  let distance = $state(30);
  let objectHeight = $state(5);
  let target = $state(0);
  /** @type {null | boolean} */
  let result = $state(null);

  const focal = $derived(lens === 'hoi-tu' ? focalSize : -focalSize);
  const zone = $derived(zoneOf(focal, distance));
  const goal = $derived(TARGETS[target]);

  function moved() {
    result = null;
  }
  function check() {
    result = meetsTarget(focal, distance, goal);
  }
  function next() {
    target = (target + 1) % TARGETS.length;
    result = null;
  }

  const zoneNote = $derived(
    zone === 'tieu-diem'
      ? `${ZONE_TEXT[zone]}: chùm tia ló song song, không có ảnh.`
      : zone === 'phan-ki'
        ? `${ZONE_TEXT[zone]} cho ảnh ảo, cùng chiều, nhỏ hơn vật, nằm trong khoảng tiêu cự.`
        : `${ZONE_TEXT[zone]}.`,
  );
  const feedback = $derived.by(() => {
    if (result === null) {
      return {
        tone: /** @type {const} */ ('info'),
        text: `Thử thách: chọn thấu kính và kéo vật để thu được ${goal.text}, rồi nhấn "Kiểm tra".`,
      };
    }
    if (result) {
      return {
        tone: /** @type {const} */ ('ok'),
        text: `Chính xác: ${ZONE_TEXT[zone].charAt(0).toLowerCase()}${ZONE_TEXT[zone].slice(1)} cho ${goal.text}. Nhấn "Thử thách khác" để tiếp tục.`,
      };
    }
    return {
      tone: /** @type {const} */ ('warn'),
      text: `Chưa đúng. ${goal.real ? 'Ảnh thật chỉ có khi dùng thấu kính hội tụ và đặt vật ngoài khoảng tiêu cự.' : 'Ảnh ảo có khi đặt vật trong khoảng tiêu cự của thấu kính hội tụ, hoặc khi dùng thấu kính phân kì.'} So sánh $d$ với $f$ và $2f$.`,
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
      onchange={moved}
    />
    <SliderField
      label="Tiêu cự f"
      bind:value={focalSize}
      min={6}
      max={16}
      unit="cm"
      oninput={moved}
    />
  </div>
  <RayOpticsBench
    {focal}
    bind:distance
    bind:objectHeight
    interactive
    label="Bàn quang học"
    onchange={moved}
  />
  <p class="rounded-lg bg-slate-50 p-2 text-sm text-slate-700" aria-live="polite">
    <span class="font-semibold">Vị trí vật:</span>
    {zoneNote.replace(/\$/g, '')}
  </p>
  <div class="flex flex-wrap gap-2">
    <button type="button" class={button.primary} onclick={check}>Kiểm tra</button>
    <button type="button" class={button.quiet} onclick={next}>Thử thách khác</button>
  </div>
  <FeedbackNote tone={feedback.tone} text={feedback.text} />
</div>
