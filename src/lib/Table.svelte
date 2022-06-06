<script lang="ts">
  import { formatToCurrency } from './numberHelper';

  type DataSet = {
    values: number[];
    label: string;
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
            <p>{formatToCurrency(value)}</p>
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
    width: 100%;
    background: var(--color-background-section);
    border-radius: var(--rounded);
  }

  thead td {
    color: var(--color-primary);
    font-size: var(--font-m);
    padding: var(--space-s);
  }

  tbody tr {
    border-top: 1px solid var(--color-background);
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
