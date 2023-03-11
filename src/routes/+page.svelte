<script lang="ts">
  import type { PageData } from './$types';
  import Box from '$lib/Box.svelte';
  import BoxExtended from '$lib/BoxExtended.svelte';
  import { formatToCurrency } from '$lib/numberHelper';

  export let data: PageData;
</script>

<svelte:head>
  <title>Larau</title>
  <meta name="description" content="Larau" />
</svelte:head>

<div class="grid">
  <Box title="This month" income={data.income} expense={data.expense} />
  <BoxExtended
    title="This year"
    income={data.incomeYear}
    expense={data.expenseYear}
    total={data.patrimony}
  />
  <aside class="grid span-3">
    {#each data.accounts as account}
      <div>
        <small>{account.title}</small>
        <p>{account.bank}</p>
        <h2>{formatToCurrency(account.balance)}</h2>
      </div>
    {/each}
  </aside>
</div>

<style>
  aside {
    background: var(--color-background-section);
    border-radius: var(--rounded);
    padding: var(--space-xs) var(--space-s);
  }

  small {
    color: var(--color-text-secondary);
  }

  p {
    color: var(--color-text);
  }

  h2 {
    color: var(--color-primary);
    font-size: calc(var(--font-m) * 2);
    margin-top: var(--space-xs);
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--space-m);
  }

  .grid:not(.span-3) {
    margin-top: var(--space-m);
  }

  .span-3 {
    grid-column: 1 / 4;
  }
</style>
