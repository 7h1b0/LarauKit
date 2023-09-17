<script lang="ts">
  import { formatToCurrency } from './numberHelper';
  import { formatDate } from './dateHelper';
  import type { Transaction } from './types';

  export let data: Transaction[];
  export let onClick: (data: Transaction) => void;
</script>

<table>
  <thead>
    <tr>
      <td>Account</td>
      <td>Date</td>
      <td>Category</td>
      <td>Amount</td>
    </tr>
  </thead>
  <tbody>
    {#each data as line}
      <tr on:click={() => onClick(line)}>
        <td>
          <small>{line.bank}</small>
          <p>{line.account}</p>
        </td>
        <td>
          <p>{formatDate(line.performedAt)}</p>
        </td>
        <td>
          <small>{line.category}</small>
          <p>{line.description}</p>
        </td>
        <td>
          <p>{formatToCurrency(line.value)}</p>
        </td>
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
    cursor: pointer;
  }

  td:last-child {
    text-align: right;
  }

  small {
    color: var(--color-text-secondary);
  }
</style>
