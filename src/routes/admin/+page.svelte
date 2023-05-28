<script lang="ts">
  import Header from '$lib/Header.svelte';
  import type { PageData, ActionData } from './$types';

  export let data: PageData;
  export let form: ActionData;
</script>

<Header title="Admin" />

{#if form?.success}
  <output>Done !</output>
{/if}

<section>
  <form method="POST" action="?/transaction">
    <label>
      Account
      <select name="account">
        {#each data.accounts as account}
          <option value={account.id}>
            {account.bank} - {account.account}
          </option>
        {/each}
      </select>
    </label>
    <label>
      Category
      <select name="category">
        {#each data.categories as category}
          <option value={category.id}>
            {category.title}
          </option>
        {/each}
      </select>
    </label>
    <label>
      Amount
      <input type="text" name="amount" required />
    </label>
    <label>
      Date
      <input type="date" name="date" required />
    </label>
    <label class="expand">
      Container
      <select name="container">
        <option value={0} />
        {#each data.containers as container}
          <option value={container.id}>
            {container.title}
          </option>
        {/each}
      </select>
    </label>
    <label class="expand">
      Description
      <input type="text" name="description" required />
    </label>

    <button type="submit">Submit</button>
    <button type="reset">Reset</button>
  </form>

  <form method="POST" action="?/wiretransfer">
    <label>
      Credit Account
      <select name="creditBankID">
        {#each data.accounts as account}
          <option value={account.id}>
            {account.bank} - {account.account}
          </option>
        {/each}
      </select>
    </label>
    <label>
      Debit Account
      <select name="debitBankID">
        {#each data.accounts as account}
          <option value={account.id}>
            {account.bank} - {account.account}
          </option>
        {/each}
      </select>
    </label>
    <label>
      Amount
      <input type="text" name="amount" required />
    </label>
    <label>
      Date
      <input type="date" name="date" required />
    </label>

    <button type="submit">Submit</button>
    <button type="reset">Reset</button>
  </form>
</section>

<style>
  section {
    display: flex;
    gap: var(--space-s);
    align-items: flex-start;
  }
  form {
    background: var(--color-background-section);
    padding: var(--space-m);
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
    margin-top: var(--space-xs);
    background: var(--color-background);
    border-radius: var(--rounded);
    border: none;
    color: var(--color-text);
  }

  output {
    background: var(--color-secondary);
    border-radius: var(--rounded);
    padding: var(--space-s);
    margin: 0 0 var(--space-s);
    display: block;
  }

  .expand {
    grid-column: 1 / 3;
  }

  [type='submit'] {
    background: var(--color-primary);
  }
  [type='reset'] {
    background: var(--color-tertiary);
  }
  button {
    height: var(--space-m);
    border: none;
    border-radius: var(--rounded);
    color: var(--color-text-inverse);
    cursor: pointer;
  }
</style>
