<script lang="ts">
  import type { PageData } from './$types';
  import Box from '$lib/Box.svelte';
  import { formatToCurrency } from '$lib/numberHelper';
  import InformationItem from '$lib/InformationItem.svelte';

  export let data: PageData;
</script>

<svelte:head>
  <title>Larau</title>
  <meta name="description" content="Larau" />
</svelte:head>

<div class="grid-1">
  <div class="grid-1-2">
    <Box title="This month" variant="primary">
      <InformationItem label="Income" icon="up" amount={data.income} />
      <InformationItem label="Expense" icon="down" amount={data.expense} />
    </Box>

    <Box title="This year" variant="secondary">
      <InformationItem label="Income" icon="up" amount={data.incomeYear} />
      <InformationItem label="Expense" icon="down" amount={data.expenseYear} />
      <InformationItem label="Patrimony" icon="bar" amount={data.patrimony} />
      <InformationItem label="Increase" icon="stack" amount={data.incomeYear + data.expenseYear} />
    </Box>
  </div>

  {#each data.groupedAccounts as group}
    <aside class="grid-3">
      {#each group as account}
        <div>
          <small>{account.title}</small>
          <p>{account.bank}</p>
          <h2>{formatToCurrency(account.balance)}</h2>
        </div>
      {/each}
    </aside>
  {/each}
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
    margin-block-start: var(--space-xs);
  }

  .grid-1,
  .grid-3,
  .grid-1-2 {
    display: grid;
    gap: var(--space-m);
  }

  .grid-1 {
    margin-block-start: var(--space-m);
    grid-template-columns: 1fr;
  }

  .grid-1-2 {
    grid-template-columns: 1fr 2fr;
  }

  .grid-3 {
    grid-template-columns: 1fr 1fr 1fr;
  }
</style>
