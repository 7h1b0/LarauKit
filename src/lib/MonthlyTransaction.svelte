<script lang="ts">
  import { formatToCurrency } from './numberHelper';
  import { getShortMonths } from './dateHelper';

  type Transaction = {
    title: string;
    data: number[];
  };

  const titles = getShortMonths();
  interface Props {
    lines: Transaction[];
    tableTitle?: string;
  }

  let { lines, tableTitle = '' }: Props = $props();
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

  table, td, tr {
    border: 1px solid var(--color-background);
    border-collapse: collapse;
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
