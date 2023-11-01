<script lang="ts">
  import Nav from '$lib/Nav.svelte';
  import { isPanelOpen } from '$lib/panelStore';

  import '../app.css';
</script>

<div data-shrink={$isPanelOpen}>
  <Nav />

  <main>
    <slot />
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
