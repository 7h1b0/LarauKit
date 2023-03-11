<script lang="ts">
  import { getShortMonths } from './dateHelper';

  export let primary: number[];
  export let secondary: number[];

  const boxSize = 90;

  $: legends = Math.ceil(Math.max(...primary) / 1000);
  $: max = legends * 1000;
  $: primaryPercentage = primary.map((nmb) => Math.abs((nmb * boxSize) / max));
  $: secondaryPercentage = secondary.map((nmb) => Math.abs((nmb * boxSize) / max));

  function getWithFallback(nmb?: number) {
    return nmb ?? 0;
  }
</script>

<svg
  version="1.1"
  xmlns="http://www.w3.org/2000/svg"
  xmlns:xlink="http://www.w3.org/1999/xlink"
  height="300"
  width="100%"
  role="img"
>
  {#each Array.from({ length: legends }, (_, i) => i + 1) as legend}
    {@const y = (boxSize / legends) * legend}
    <line x1="0" x2="100%" y1={`${y}%`} y2={`${y}%`} stroke-dasharray="4" />
  {/each}
  {#each primaryPercentage as percentage, index}
    <g>
      <rect
        height={`${getWithFallback(secondaryPercentage[index])}%`}
        y={`${boxSize - getWithFallback(secondaryPercentage[index])}%`}
        x={`${(100 / 12) * index + 4.3}%`}
        width="2%"
        rx="1%"
        class="secondary"
      />
      <rect
        height={`${percentage}%`}
        y={`${boxSize - percentage}%`}
        x={`${(100 / 12) * index + 2}%`}
        width="2%"
        rx="1%"
      />
    </g>
  {/each}
  {#each getShortMonths() as month, index}
    <text x={`${(100 / 12) * index + 3}%`} y="97%">{month}</text>
  {/each}
</svg>

<style>
  svg {
    background: var(--color-background-section);
    border-radius: var(--rounded);
  }

  rect {
    fill: var(--color-primary);
  }

  rect.secondary {
    fill: var(--color-secondary);
  }

  line {
    stroke: #4f5053;
  }

  text {
    fill: var(--color-text-secondary);
  }
</style>
