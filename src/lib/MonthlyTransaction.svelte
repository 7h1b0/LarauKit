<script lang="ts">
  import { formatToCurrency } from './numberHelper';
  import { getShortMonths } from './dateHelper';

  type Transaction = {
    title: string;
    data: number[];
  };

  const titles = getShortMonths();
  export let lines: Transaction[];
  export let tableTitle = '';
</script>

<table>
  <thead>
    <tr>
      <td>{tableTitle}</td>
      {#each titles as title}
        <td>{title}</td>
      {/each}
    </tr>
  </thead>
  <tbody>
    {#each lines as line}
      <tr>
        <td>
          <p>{line.title}</p>
        </td>
        {#each line.data as value}
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
