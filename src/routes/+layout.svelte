<script lang="ts">
  import type { Snippet } from 'svelte';
  import Nav from '$lib/Nav.svelte';

  import '../app.css';

  interface Props {
    children: Snippet;
  }

  let { children }: Props = $props();
</script>

<div>
  <Nav />

  <main>
    {@render children()}
  </main>
</div>

<style>
  div {
    display: grid;
    align-items: start;
    grid-template-columns: var(--size-nav) 1fr;
    gap: var(--space-m);
    margin-inline: var(--space-s);
    transition: all var(--animation-delay) var(--animation-timing);
  }
  main {
    margin-block: 0 var(--space-m);
  }
</style>
