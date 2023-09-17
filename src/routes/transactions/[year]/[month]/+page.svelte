<script lang="ts">
  import Table from '$lib/TableTransaction.svelte';
  import Navigation from '$lib/Navigation.svelte';
  import Header from '$lib/Header.svelte';
  import FilterAside from '$lib/FilterAside.svelte';
  import { filterAccountId, filterCategoryId } from '$lib/filterStore';
  import type { Transaction, ProgressType } from '$lib/types';
  import type { PageData } from './$types';
  import ProgressAside from '$lib/ProgressAside.svelte';
    import SidePanel from '$lib/SidePanel.svelte';
    import TransactionDetail from '$lib/TransactionDetail.svelte';

  export let data: PageData;

  const intl = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long'
  });

  let progressList: ProgressType[];

  $: progressList = data.categories.map((category) => {
    const total = data.transactions
      .filter((transaction) => transaction.categoryId === category.id)
      .reduce((acc, transaction) => acc + transaction.value, 0);

    return { title: category.title, value: total };
  });

  function filterTransaction(transactions: Transaction[], accountId: number, categoryId: number) {
    return transactions.filter((transaction) => {
      const matchAccountId = accountId === -1 ? true : transaction.accountId === accountId;
      const matchCategoryId = categoryId === -1 ? true : transaction.categoryId === categoryId;

      return matchAccountId && matchCategoryId;
    });
  }

  let isPanelOpen = false;
  let selectedTransaction: Transaction | undefined = undefined;
  function closePanel() {
    isPanelOpen = false;
  }

  function openSidePanel(transaction: Transaction) {
    selectedTransaction = transaction;
    isPanelOpen = true;
  }

</script>

<Header title="Transactions" />
<div class="grid">
  <section>
    <Navigation
      title={intl.format(data.date)}
      previousNavigationLink={`/transactions/${data.previousMonth.getFullYear()}/${data.previousMonth.getMonth()}`}
      nextNavigationLink={`/transactions/${data.nextMonth.getFullYear()}/${data.nextMonth.getMonth()}`}
    />
    <Table data={filterTransaction(data.transactions, $filterAccountId, $filterCategoryId)} onClick={openSidePanel} />
  </section>

  <div>
    <FilterAside accounts={data.accounts} categories={data.categories} />

    <ProgressAside title="Categories" {progressList} />
  </div>
</div>

<SidePanel isOpen={isPanelOpen} closePanel={closePanel}>
  <TransactionDetail transaction={selectedTransaction} accounts={data.accounts} categories={data.categories} containers={data.containers} />
</SidePanel>

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
