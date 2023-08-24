<script lang="ts">
  import { filterAccountId, filterCategoryId } from '$lib/filterStore';
  import type { Account, Category } from './types';

  export let accounts: Account[];
  export let categories: Category[];
</script>

<aside>
  <h2>Filter</h2>
  <label>
    Account
    <select name="account" bind:value={$filterAccountId}>
      <option value={-1} />
      {#each accounts as account}
        <option value={account.id}>
          {account.bank} - {account.account}
        </option>
      {/each}
    </select>
  </label>

  <label>
    Category
    <select name="category" bind:value={$filterCategoryId}>
      <option value={-1} />
      {#each categories as category}
        <option value={category.id}>
          {category.title}
        </option>
      {/each}
    </select>
  </label>
</aside>

<style>
  h2 {
    color: var(--color-text-inverse);
    font-size: var(--font-l);
  }

  aside {
    background: var(--color-primary);
    inline-size: 100%;
    min-block-size: 200px;
    border-radius: var(--rounded);
    padding: var(--space-s);
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: var(--space-s);
  }

  label {
    color: var(--color-text-inverse);
    font-size: var(--font-m);
  }

  select {
    display: block;
    inline-size: 100%;
    background: var(--color-background-section);
    border: none;
    color: var(--color-text);
    padding: calc(var(--space-s) / 2);
    border-radius: var(--rounded);
  }
</style>
