<script module>
  export const title = 'Trường vectơ';
</script>

<script>
  import SegmentedControl from '#lib/core/segmented-control.svelte';
  import VectorField from './vector-field.svelte';

  let sources = $state([
    { x: -2, y: 0, strength: 1 },
    { x: 2, y: 0, strength: -1 },
  ]);
  let preset = $state('dipole');
  /** @param {string | number} v */
  function choose(v) {
    sources =
      v === 'dipole'
        ? [
            { x: -2, y: 0, strength: 1 },
            { x: 2, y: 0, strength: -1 },
          ]
        : v === 'pair'
          ? [
              { x: -2, y: 0, strength: 1 },
              { x: 2, y: 0, strength: 1 },
            ]
          : [{ x: 0, y: 0, strength: 1 }];
  }
</script>

<SegmentedControl
  label="Cấu hình điện tích"
  options={[
    { value: 'dipole', label: 'Trái dấu' },
    { value: 'pair', label: 'Cùng dấu' },
    { value: 'single', label: 'Một điện tích' },
  ]}
  bind:value={preset}
  onchange={choose}
/>
<VectorField
  bind:sources
  interactive
  showLines
  probe={{ x: 0, y: 1.5 }}
  fieldName="Cường độ điện trường (tương đối)"
  label="Điện trường của các điện tích điểm"
/>
<VectorField
  uniform={{ x: 0, y: -9.8 }}
  nx={10}
  bounds={{ xMin: 0, xMax: 10, yMin: 0, yMax: 4 }}
  label="Trường trọng lực đều gần mặt đất"
/>
