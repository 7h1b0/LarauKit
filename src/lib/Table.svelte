<script lang="ts">
  import { formatToCurrency, formatToPercent } from './numberHelper';

  type DataSet = {
    values: number[];
    label: string;
    format?: 'percent' | 'currency';
  };

  interface Props {
    labels: string[];
    datasets: DataSet[];
  }

  let { labels, datasets }: Props = $props();
</script>

<table>
  <thead>
    <tr>
      <td></td>
      {#each labels as label}
        <td>{label}</td>
      {/each}
    </tr>
  </thead>
  <tbody>
    {#each datasets as dataset}
      <tr>
        <td>
          <p>{dataset.label}</p>
        </td>
        {#each dataset.values as value}
          <td>
            <p>
              {dataset.format === 'percent' ? formatToPercent(value) : formatToCurrency(value)}
            </p>
          </td>
        {/each}
      </tr>
    {/each}
  </tbody>
</table>

<style>
  table {
    table-layout: fixed;
    overflow: hidden;
    inline-size: 100%;
    background: var(--color-background-section);
    border-radius: var(--rounded);
  }

  table, td, tr {
    border: 1px solid var(--color-background);
    border-collapse: collapse;
  }

  thead td {
    color: var(--color-primary);
    font-size: var(--font-m);
    padding: var(--space-s);
  }

  td {
    color: var(--color-text);
    padding: var(--space-xs) var(--space-s);
    text-align: right;
  }

  td:first-child {
    text-align: left;
  }
</style>
