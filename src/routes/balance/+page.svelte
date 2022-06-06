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
    { label: 'Expenses', values: data.expenses.map((expense) => expense.value) }
  ]}
/>
