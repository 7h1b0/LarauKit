<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { LayoutData } from './$types';
  import { goto } from '$app/navigation';
  import SidePanel from '$lib/SidePanel.svelte';
  import TransactionDetail from '$lib/TransactionDetail.svelte';

  interface Props {
    data: LayoutData;
    children: Snippet;
  }

  let { data, children }: Props = $props();

  function closePanel() {
    goto(`?transactionId=`, { noScroll: true });
  }
</script>

{@render children()}

<SidePanel isOpen={data.currentTransaction !== null} {closePanel}>
  <TransactionDetail
    transaction={data.currentTransaction}
    accounts={data.accounts}
    categories={data.categories}
    containers={data.containers}
  />
</SidePanel>
