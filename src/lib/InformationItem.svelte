<script lang="ts">
  import { formatToCurrency } from './numberHelper';
  import IconBar from './IconBar.svelte';
  import IconDown from './IconDown.svelte';
  import IconUp from './IconUp.svelte';
  import IconStack from './IconStack.svelte';

  export let amount: number;
  export let label: string;
  export let icon: 'bar' | 'down' | 'up' | 'stack';

  const iconMap = {
    bar: IconBar,
    stack: IconStack,
    up: IconUp,
    down: IconDown
  };
</script>

<div class="container">
  <div class="icon">
    <svelte:component this={iconMap[icon]} />
  </div>

  <p>{label}</p>
  <h2>{formatToCurrency(amount)}</h2>
</div>

<style>
  .container {
    display: grid;
    column-gap: var(--space-s);
    grid-template-columns: 60px 1fr;
  }

  .icon {
    background: black;
    opacity: 0.9;
    border-radius: var(--rounded);
    padding: var(--space-s);
    grid-row: 1 / 3;
  }

  h2,
  p {
    color: var(--color-text-inverse);
    grid-column: 2 /3;
  }
  p {
    align-self: end;
    font-size: var(--font-s);
  }
  h2 {
    font-size: calc(var(--font-m) * 2);
  }
</style>
