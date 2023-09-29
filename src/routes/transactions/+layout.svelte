<script lang="ts">
  import type { LayoutData } from './$types';
  import { goto } from '$app/navigation';
  import SidePanel from '$lib/SidePanel.svelte';
  import TransactionDetail from '$lib/TransactionDetail.svelte';

  export let data: LayoutData;

  function closePanel() {
    goto(`?transactionId=`, { noScroll: true });
  }
</script>

<slot />

<SidePanel isOpen={data.currentTransaction !== null} {closePanel}>
  <TransactionDetail
    transaction={data.currentTransaction}
    accounts={data.accounts}
    categories={data.categories}
    containers={data.containers}
  />
</SidePanel>
