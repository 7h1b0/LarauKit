<script lang="ts">
  import { formatToCurrency, formatToPercent } from './numberHelper';

  type DataSet = {
    values: number[];
    label: string;
    format?: 'percent' | 'currency';
  };

  export let labels: string[];
  export let datasets: DataSet[];
</script>

<table>
  <thead>
    <tr>
      <td />
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
    border-collapse: collapse;
    overflow: hidden;
    inline-size: 100%;
    background: var(--color-background-section);
    border-radius: var(--rounded);
  }

  thead td {
    color: var(--color-primary);
    font-size: var(--font-m);
    padding: var(--space-s);
  }

  tbody tr {
    border-block-start: 1px solid var(--color-background);
    font-size: var(--font-m);
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
