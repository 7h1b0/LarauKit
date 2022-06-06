<script lang="ts">
  import Table from '$lib/TableTransaction.svelte';
  import Navigation from '$lib/Navigation.svelte';
  import Header from '$lib/Header.svelte';
  import FilterAside from '$lib/FilterAside.svelte';
  import { filterAccountId, filterCategoryId } from '$lib/filterStore';
  import type { Transaction, ProgressType } from '$lib/types';
  import type { PageData } from './$types';
  import SidePanel from '$lib/SidePanel.svelte';

  export let data: PageData;

  const intl = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long'
  });

  let progressList: ProgressType[];

  $: previousMonth = addToDate(data.date, -1);
  $: nextMonth = addToDate(data.date, 1);
  $: progressList = data.categories.map((category) => {
    const total = data.transactions
      .filter((transaction) => transaction.categoryId === category.id)
      .reduce((acc, transaction) => acc + transaction.value, 0);

    return { title: category.title, value: total };
  });

  function addToDate(date: Date, offset: number) {
    const newDate = new Date(date);
    newDate.setMonth(date.getMonth() + offset);
    return newDate;
  }

  function filterTransaction(transactions: Transaction[], accountId: number, categoryId: number) {
    return transactions.filter((transaction) => {
      const matchAccountId = accountId === -1 ? true : transaction.accountId === accountId;
      const matchCategoryId = categoryId === -1 ? true : transaction.categoryId === categoryId;

      return matchAccountId && matchCategoryId;
    });
  }
</script>

<Header title="Transactions" />
<div class="grid">
  <section>
    <Navigation
      title={intl.format(data.date)}
      previousNavigationLink={`/transactions/${previousMonth.getFullYear()}/${previousMonth.getMonth()}`}
      nextNavigationLink={`/transactions/${nextMonth.getFullYear()}/${nextMonth.getMonth()}`}
    />
    <Table data={filterTransaction(data.transactions, $filterAccountId, $filterCategoryId)} />
  </section>

  <div>
    <FilterAside accounts={data.accounts} categories={data.categories} />

    <SidePanel title="Categories" {progressList} />
  </div>
</div>

<style>
  .grid {
    display: grid;
    grid-template-columns: 1fr minmax(200px, 350px);
    gap: var(--space-m);
    align-items: flex-start;
  }
  section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 1;
    gap: var(--space-s);
  }
  div {
    display: flex;
    flex-direction: column;
    gap: var(--space-m);
  }
</style>
