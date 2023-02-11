<script lang="ts">
  import type { PageData } from './$types';
  import Table from '$lib/Table.svelte';
  import Header from '$lib/Header.svelte';

  export let data: PageData;
</script>

<Header title="Yearly Balance" />
<Table
  labels={data.labels}
  datasets={[
    { label: 'Incomes', values: data.incomes.map((income) => income.value) },
    { label: 'Expenses', values: data.expenses.map((expense) => expense.value) },
    {
      label: 'Solde',
      values: data.incomes.map((income, index) => income.value + data.expenses[index].value)
    },
    {
      label: 'Percentage',
      format: false,
      values: data.incomes.map((income, index) =>
        Math.round((Math.abs(data.expenses[index].value) * 100) / income.value)
      )
    }
  ]}
/>
