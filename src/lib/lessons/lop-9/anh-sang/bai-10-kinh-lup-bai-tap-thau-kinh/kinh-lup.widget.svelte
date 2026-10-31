<script>
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import FeedbackNote from '#lib/core/feedback-note.svelte';
  import { formatNumber } from '#lib/core/number-format.js';
  import RayOpticsBench from '#lib/domain/ray-optics-bench.svelte';
  import { thinLensImage } from '#lib/domain/optics.js';
  import { focalOfPower } from './engine.js';

  const POWERS = [2.5, 5, 10];
  let power = $state(5);
  const focal = $derived(focalOfPower(power));
  let distance = $state(3);
  let objectHeight = $state(1);

  const range = $derived(focal * 4);
  const step = $derived(focal / 10);
  const image = $derived(thinLensImage(focal, distance));
  const fmt = (/** @type {number} */ v) => formatNumber(v, 2);

  /** @param {string | number} value the newly chosen power */
  function choose(value) {
    const f = focalOfPower(Number(value));
    distance = Math.round(f * 0.6 * 100) / 100;
    objectHeight = Math.round(f * 0.2 * 100) / 100;
  }

  const feedback = $derived.by(() => {
    if (image.atInfinity) {
      return {
        tone: /** @type {const} */ ('warn'),
        text: 'Vật ở đúng tiêu điểm: chùm tia ló song song, không có ảnh. Đưa kính lại gần vật hơn.',
      };
    }
    if (!image.real) {
      return {
        tone: /** @type {const} */ ('ok'),
        text: `Vật trong khoảng tiêu cự ($d < f$): mắt nhìn qua kính thấy ảnh ảo, cùng chiều, cao gấp ${fmt(image.magnification)} lần vật. Đây là cách dùng kính lúp.`,
      };
    }
    return {
      tone: /** @type {const} */ ('warn'),
      text: 'Vật nằm ngoài khoảng tiêu cự ($d > f$): kính cho ảnh thật, ngược chiều ở phía sau kính, không dùng để quan sát vật nhỏ được. Đưa vật vào trong khoảng $OF$.',
    };
  });
</script>

<div class="space-y-4">
  <SegmentedControl
    label="Kính lúp"
    options={POWERS.map((g) => ({ value: g, label: `${formatNumber(g)}x` }))}
    bind:value={power}
    onchange={choose}
  />
  <p class="rounded-lg bg-slate-50 p-2 text-sm text-slate-700" aria-live="polite">
    Kính ghi {formatNumber(power)}x: tiêu cự f = 25 : {formatNumber(power)} = {fmt(focal)} cm. Số bội
    giác càng lớn thì tiêu cự càng ngắn.
  </p>
  <RayOpticsBench
    {focal}
    bind:distance
    bind:objectHeight
    {range}
    {step}
    interactive
    label="Kính lúp"
  />
  <FeedbackNote tone={feedback.tone} text={feedback.text} />
</div>
