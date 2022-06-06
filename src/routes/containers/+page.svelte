<script lang="ts">
  import type { PageData } from './$types';
  import Header from '$lib/Header.svelte';
  import { formatToCurrency } from '$lib/numberHelper';

  export let data: PageData;
</script>

<Header title="Containers" />

<ul>
  {#each data.containers as container}
    <li>
      <a href={`/containers/${container.id}`}>
        <p>{container.title}</p>
        <small>{formatToCurrency(container.balance)}</small>
      </a>
    </li>
  {/each}
</ul>

<style>
  ul {
    list-style: none;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: var(--space-s);
  }

  li {
    background: var(--color-background-section);
    border-radius: var(--rounded);
  }
  a {
    text-decoration: none;
    display: block;
    padding: var(--space-s);
  }
  p {
    color: var(--color-text);
    font-size: var(--font-l);
    padding-bottom: var(--space-xs);
  }
  small {
    font-size: var(--font-m);
    color: var(--color-primary);
  }
</style>
