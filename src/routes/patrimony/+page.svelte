<script lang="ts">
  import type { PageData } from './$types';
  import Box from '$lib/Box.svelte';
  import InformationItem from '$lib/InformationItem.svelte';
  import { formatToPercent } from '$lib/numberHelper';

  interface Props {
    data: PageData;
  }

  let { data }: Props = $props();

  function percent(value: number) {
    return formatToPercent(value / data.patrimony);
  }
</script>

<div class="grid-1-2">
  <Box title="Patrimony" variant="primary">
    <InformationItem label="Patrimony" icon="bar" amount={data.patrimony} />
  </Box>

  <Box title="Types" variant="secondary">
    <InformationItem label={`Stock (${percent(data.stock)})`} icon="stack" amount={data.stock} />
    <InformationItem
      label={`Life Insurance (${percent(data.lifeInsurance)})`}
      icon="stack"
      amount={data.lifeInsurance}
    />
    <InformationItem
      label={`Account (${percent(data.account)})`}
      icon="stack"
      amount={data.account}
    />
    <InformationItem label={`Saving (${percent(data.saving)})`} icon="stack" amount={data.saving} />
  </Box>
</div>

<style>
  .grid-1-2 {
    display: grid;
    gap: var(--space-m);
    margin: var(--space-m) 0 0;
  }

  .grid-1-2 {
    grid-template-columns: 1fr 2fr;
  }
</style>
