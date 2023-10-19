<script lang="ts">
  import type { LayoutData } from './$types';
  import Header from '$lib/Header.svelte';
  import { formatToCurrency } from '$lib/numberHelper';

  export let data: LayoutData;
</script>

<div>
  <aside>
    <Header title="Containers" />
    <ul>
      {#each data.containers as container}
        <li data-selected={container.id === data.selected}>
          <a href={`/transactions/containers/${container.id}`}>
            <p>{container.title}</p>
            <small>{formatToCurrency(container.balance)}</small>
          </a>
        </li>
      {/each}
    </ul>
  </aside>
  <section>
    <slot />
  </section>
</div>

<style>
  div {
    display: grid;
    grid-template-columns: 1fr 3fr;
    align-items: flex-start;
    gap: var(--space-m);
  }

  ul {
    list-style: none;
    display: grid;
    grid-template-columns: repeat(1, 1fr);
  }

  a {
    display: flex;
    justify-content: space-between;
    text-decoration: none;
    padding: var(--space-s) 0;
  }

  li[data-selected='true'],
  a:hover,
  a:focus-visible {
    background: var(--color-background-section);
    border-radius: var(--rounded);
    outline: var(--color-background-section) solid 8px;
  }

  li:not(:last-child)::after {
    content: '';
    height: 1px;
    background: var(--color-background-section);
    width: 100%;
    display: block;
  }

  p,
  small {
    font-size: var(--font-m);
  }
  p {
    color: var(--color-text);
  }
  small {
    color: var(--color-primary);
  }
</style>
