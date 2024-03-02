<script lang="ts">
  import { enhance } from '$app/forms';
  import type { Account, Category, Transaction, Container } from './types';

  export let transaction: Transaction | null;
  export let categories: Category[];
  export let accounts: Account[];
  export let containers: Container[];

</script>

{#if transaction !== null}
  <form method="POST" action="?/updateTransaction" use:enhance>
    <input type="hidden" name="id" value={transaction.id} />
    <label>
      Account
      <select name="account" value={transaction.accountId}>
        {#each accounts as account}
          <option value={account.id}>
            {account.bank} - {account.account}
          </option>
        {/each}
      </select>
    </label>
    <label>
      Category
      <select name="category" value={transaction.categoryId}>
        {#each categories as category}
          <option value={category.id}>
            {category.title}
          </option>
        {/each}
      </select>
    </label>
    <label>
      Amount
      <input type="text" name="amount" required value={transaction.value} />
    </label>
    <label class="expand">
      Container
      <select name="container" value={transaction.containerId}>
        {#each containers as container}
          <option value={container.id}>
            {container.title}
          </option>
        {/each}
      </select>
    </label>

    <label class="expand">
      Description
      <input type="text" name="description" required value={transaction.description} />
    </label>

    <button type="submit">Update</button>
    <button id="delete" type="submit" formaction="?/deleteTransaction">Delete</button>
  </form>
{/if}

<style>
  form {
    color: var(--color-text);
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-m);
    border-radius: var(--rounded);
  }

  select,
  input {
    display: block;
    width: 100%;
    box-sizing: border-box;
    padding: var(--space-xs);
    margin-block-start: var(--space-xs);
    background: var(--color-background);
    border-radius: var(--rounded);
    border: none;
    color: var(--color-text);
  }

  :is(select, input):focus {
    outline: var(--color-primary) 2px solid;
  }

  [type='submit'] {
    background: var(--color-primary);
  }
  #delete {
    background: var(--color-tertiary);
  }
  button {
    height: var(--space-m);
    border: none;
    border-radius: var(--rounded);
    color: var(--color-text-inverse);
    cursor: pointer;
  }

  .expand {
    grid-column: 1 / 3;
  }
</style>
