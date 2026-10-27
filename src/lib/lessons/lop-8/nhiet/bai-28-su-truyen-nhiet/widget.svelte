<script>
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import BucXa from './buc-xa.svelte';
  import DanNhiet from './dan-nhiet.svelte';
  import DoiLuu from './doi-luu.svelte';

  const SCENES = [
    { value: 'dan-nhiet', label: 'Dẫn nhiệt' },
    { value: 'doi-luu', label: 'Đối lưu' },
    { value: 'buc-xa', label: 'Bức xạ nhiệt' },
  ];

  let scene = $state('dan-nhiet');
</script>

<div class="space-y-4">
  <SegmentedControl label="Thí nghiệm" options={SCENES} bind:value={scene} />
  {#if scene === 'dan-nhiet'}
    <DanNhiet />
  {:else if scene === 'doi-luu'}
    <DoiLuu />
  {:else}
    <BucXa />
  {/if}
</div>
