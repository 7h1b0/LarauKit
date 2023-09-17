<script lang="ts">
  import type { PageData } from './$types';
  import Table from '$lib/Table.svelte';
  import Header from '$lib/Header.svelte';

  export let data: PageData;
  $: labels = data.labels.map(label => `${label}`)

  function getValuePerYear(years: number[], yearlyCategoryBalance: {year: number, value: number}[]) {
    return years.map((year) => {
      const value = yearlyCategoryBalance.find((balance) => balance.year === year);
      return value ? value.value : 0;
    });
  }
</script>

<Header title="Yearly Balance" />

<section>
  <Table
    labels={labels}
    datasets={[
      { label: 'Incomes', values: data.incomes.map((income) => income.value) },
      { label: 'Expenses', values: data.expenses.map((expense) => expense.value) },
      {
        label: 'Solde',
        values: data.incomes.map((income, index) => income.value + data.expenses[index].value)
      },
      {
        label: 'Spent',
        format: 'percent',
        values: data.incomes.map(
          (income, index) => Math.abs(data.expenses[index].value) / income.value
        )
      }
    ]}
  />
  <Table
    labels={labels}
    datasets={data.incomeCategories.map((category) => {
      const values = data.groupByCategory.get(category) || [];
      return {
        label: category,
        values: getValuePerYear(data.labels, values)
      };
    })}
  />
  <Table
    labels={labels}
    datasets={data.expenseCategories.map((category) => {
      const values = data.groupByCategory.get(category) || [];
      return {
        label: category,
        values: getValuePerYear(data.labels, values)
      };
    })}
  />
</section>

<style>
  section {
    display: flex;
    flex-direction: column;
    gap: var(--space-m);
  }
</style>
