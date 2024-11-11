<script lang="ts">
  import Table from '$lib/TableTransaction.svelte';
  import Header from '$lib/Header.svelte';
  import type { PageData } from './$types';

  interface Props {
    data: PageData;
  }

  let { data }: Props = $props();
</script>

<Header title={data.title} />
<Table data={data.transactions} />
