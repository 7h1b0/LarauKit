<script lang="ts">
  import { getShortMonths } from './dateHelper';

  interface Props {
    primary: number[];
    secondary: number[];
  }

  let { primary, secondary }: Props = $props();

  const boxSize = 90;

  let legends = $derived(Math.max(Math.ceil(Math.max(...primary) / 1000), 6));
  let max = $derived(legends * 1000);
  let primaryPercentage = $derived(primary.map((nmb) => Math.abs((nmb * boxSize) / max)));
  let secondaryPercentage = $derived(secondary.map((nmb) => Math.abs((nmb * boxSize) / max)));

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
        rx=".4%"
        class="secondary"
      />
      <rect
        height={`${percentage}%`}
        y={`${boxSize - percentage}%`}
        x={`${(100 / 12) * index + 2}%`}
        width="2%"
        rx=".4%"
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
