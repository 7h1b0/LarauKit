<script lang="ts">
  import type { PageData } from './$types';
  import Box from '$lib/Box.svelte';
  import { formatToCurrency } from '$lib/numberHelper';
  import InformationItem from '$lib/InformationItem.svelte';

  interface Props {
    data: PageData;
  }

  let { data }: Props = $props();
</script>

<svelte:head>
  <title>Larau</title>
  <meta name="description" content="Larau" />
</svelte:head>

<div class="grid">
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

  {#each data.groupedAccounts as group}
    <aside class="subgrid">
      {#each group as account}
        <div>
          <small>{account.bank}</small>
          <p>{account.title}</p>
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
    row-gap: var(--space-s);
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

  .grid {
    display: grid;
    gap: var(--space-m);
    grid-template-columns: repeat(3, minmax(0, 1fr));
    margin-block-start: var(--space-m);
  }

  .subgrid {
    display: grid;
    grid-template-columns: subgrid;
    grid-column: span 3;
  }
</style>
