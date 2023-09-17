<script lang="ts">
  import Table from '$lib/TableTransaction.svelte';
  import Header from '$lib/Header.svelte';
  import type { PageData } from './$types';

  export let data: PageData;


  function openSidePanel() {
    // TODO
  }
</script>

<Header title={data.title} />
<Table data={data.transactions} onClick={openSidePanel}/>
