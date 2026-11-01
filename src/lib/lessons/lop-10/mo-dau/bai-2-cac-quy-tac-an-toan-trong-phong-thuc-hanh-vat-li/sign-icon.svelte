<script>
  /**
   * A safety sign or device marking drawn in a 64-unit square. The caller
   * passes `label`, the name of the drawing screen readers hear.
   * @type {{ name: import('./engine.js').SignName, label: string, size?: number }}
   */
  let { name, label, size = 56 } = $props();

  const TRIANGLES = ['electric', 'flame', 'laser', 'hot', 'magnet', 'toxic'];
  const CROSSED = ['no-fire', 'no-food', 'no-touch'];
  const MARKS = { dc: 'DC', ac: 'AC', input: 'Input', output: 'Output' };
  const mark = $derived(MARKS[/** @type {keyof typeof MARKS} */ (name)]);
</script>

<svg viewBox="0 0 64 64" width={size} height={size} role="img" aria-label={label}>
  {#if TRIANGLES.includes(name)}
    <polygon
      points="32,5 61,57 3,57"
      fill="#facc15"
      stroke="#0f172a"
      stroke-width="3"
      stroke-linejoin="round"
    />
  {:else if CROSSED.includes(name)}
    <circle cx="32" cy="32" r="28" fill="#fff" stroke="#dc2626" stroke-width="5" />
  {:else if name === 'exit'}
    <rect x="3" y="11" width="58" height="42" rx="4" fill="#15803d" />
  {:else if name === 'extinguisher'}
    <rect x="3" y="7" width="58" height="50" rx="4" fill="#dc2626" />
  {:else}
    <rect x="3" y="3" width="58" height="58" rx="8" fill="#fff" stroke="#475569" stroke-width="2" />
  {/if}

  {#if mark}
    <text
      x="32"
      y={name === 'dc' || name === 'ac' ? 30 : 38}
      text-anchor="middle"
      font-size={name === 'dc' || name === 'ac' ? 20 : 14}
      font-weight="700"
      fill="#0f172a">{mark}</text
    >
    {#if name === 'dc'}
      <path d="M16 44h32" stroke="#0f172a" stroke-width="4" />
    {:else if name === 'ac'}
      <path
        d="M16 45c5-9 11-9 16 0s11 9 16 0"
        fill="none"
        stroke="#0f172a"
        stroke-width="4"
        stroke-linecap="round"
      />
    {/if}
  {:else if name === 'poles'}
    <path d="M10 32h18M19 23v18M38 32h17" stroke="#0f172a" stroke-width="5" />
  {:else if name === 'earth'}
    <path
      d="M32 10v24M14 34h36M21 43h22M27 52h10"
      stroke="#0f172a"
      stroke-width="4"
      stroke-linecap="round"
    />
  {:else if name === 'fragile'}
    <path
      d="M20 10h24c0 17-4 25-12 25s-12-8-12-25zM32 35v15M22 54h20"
      fill="none"
      stroke="#0f172a"
      stroke-width="4"
      stroke-linejoin="round"
      stroke-linecap="round"
    />
  {:else if name === 'upright'}
    <path
      d="M22 50V16M13 26l9-11 9 11M42 50V16M33 26l9-11 9 11"
      fill="none"
      stroke="#0f172a"
      stroke-width="4"
    />
    <path d="M12 54h40" stroke="#0f172a" stroke-width="4" />
  {:else if name === 'no-sun'}
    <circle cx="32" cy="32" r="10" fill="#f59e0b" />
    <path
      d="M32 10v8M32 46v8M10 32h8M46 32h8M16 16l6 6M42 42l6 6M48 16l-6 6M22 42l-6 6"
      stroke="#f59e0b"
      stroke-width="4"
      stroke-linecap="round"
    />
    <path d="M10 54 54 10" stroke="#dc2626" stroke-width="5" />
  {:else if name === 'no-bin'}
    <path
      d="M20 22h24l-3 30H23zM16 17h32M27 17v-5h10v5"
      fill="none"
      stroke="#0f172a"
      stroke-width="4"
    />
    <path d="M10 54 54 10" stroke="#dc2626" stroke-width="5" />
  {:else if name === 'electric'}
    <path d="M36 20 22 40h9l-4 12 15-20h-9z" fill="#0f172a" />
  {:else if name === 'flame'}
    <path
      d="M32 20c2 8 11 12 11 21a11 11 0 0 1-22 0c0-5 3-7 5-11 1 3 2 4 4 5 1-5 0-10 2-15z"
      fill="#0f172a"
    />
  {:else if name === 'laser'}
    <path
      d="M32 24v5M32 45v6M18 37h6M40 37h6M22 27l4 4M38 43l4 4M42 27l-4 4M26 43l-4 4"
      stroke="#0f172a"
      stroke-width="3"
      stroke-linecap="round"
    />
    <circle cx="32" cy="37" r="4" fill="#0f172a" />
  {:else if name === 'hot'}
    <path
      d="M29 22a3 3 0 0 1 6 0v17a7 7 0 1 1-6 0z"
      fill="none"
      stroke="#0f172a"
      stroke-width="3"
    />
    <circle cx="32" cy="45" r="4" fill="#0f172a" />
    <path d="M32 28v14" stroke="#0f172a" stroke-width="3" />
  {:else if name === 'magnet'}
    <path d="M21 26v13a11 11 0 0 0 22 0V26h-7v13a4 4 0 0 1-8 0V26z" fill="#0f172a" />
  {:else if name === 'toxic'}
    <path
      d="M32 22c-7 0-11 5-11 10 0 4 2 6 4 8v5h14v-5c2-2 4-4 4-8 0-5-4-10-11-10z"
      fill="#0f172a"
    />
    <circle cx="27" cy="32" r="3" fill="#facc15" />
    <circle cx="37" cy="32" r="3" fill="#facc15" />
    <path d="M29 42v3M35 42v3" stroke="#facc15" stroke-width="2" />
  {:else if name === 'no-fire'}
    <path
      d="M32 13c2 8 12 13 12 23a12 12 0 0 1-24 0c0-6 4-8 6-13 1 3 2 5 4 6 1-5 0-11 2-16z"
      fill="#0f172a"
    />
  {:else if name === 'no-food'}
    <path d="M21 18h22l-3 29H24zM43 26h6v12h-7" fill="none" stroke="#0f172a" stroke-width="4" />
  {:else if name === 'no-touch'}
    <path
      d="M23 50V29a3 3 0 0 1 6 0v-9a3 3 0 0 1 6 0v9-5a3 3 0 0 1 6 0v8-3a3 3 0 0 1 5 0v14c0 5-3 9-8 9h-6c-3 0-7-2-9-5z"
      fill="#0f172a"
    />
  {:else if name === 'exit'}
    <rect x="42" y="18" width="13" height="28" fill="#fff" />
    <path d="M10 32h24M25 22l11 10-11 10" fill="none" stroke="#fff" stroke-width="5" />
  {:else if name === 'extinguisher'}
    <path
      d="M24 26a8 8 0 0 1 16 0v24H24zM32 18v-6h9M32 12l-9 4"
      fill="#fff"
      stroke="#fff"
      stroke-width="2"
    />
  {/if}

  {#if CROSSED.includes(name)}
    <path d="M12 12 52 52" stroke="#dc2626" stroke-width="5" />
  {/if}
</svg>
