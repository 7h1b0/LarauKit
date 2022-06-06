<script lang="ts">
  import MonthlyTransaction from '$lib/MonthlyTransaction.svelte';
  import Header from '$lib/Header.svelte';
  import Navigation from '$lib/Navigation.svelte';
  import type { PageData } from './$types';

  export let data: PageData;

  $: nextYear = data.year + 1;
  $: previous = data.year - 1;
</script>

<Header title="Monthly Balance" />

<section>
  <Navigation
    title={`${data.year}`}
    previousNavigationLink={`/balance/${previous}`}
    nextNavigationLink={`/balance/${nextYear}`}
  />
  <MonthlyTransaction
    lines={[
      { title: 'Produits', data: data.incomes },
      { title: 'Charges', data: data.expenses },
      { title: 'Solde', data: data.incomes.map((value, index) => value + data.expenses[index]) }
    ]}
  />
</section>

<style>
  section {
    display: flex;
    flex-direction: column;
    gap: var(--space-s);
  }
</style>
