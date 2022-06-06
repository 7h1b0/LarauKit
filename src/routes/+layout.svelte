<script lang="ts">
  import Nav from '$lib/Nav.svelte';
  import '../app.css';
</script>

<Nav />

<main>
  <slot />
</main>

<style>
  main {
    margin: var(--space-m) var(--space-m) var(--space-m) calc(var(--width-nav) + var(--space-m));
  }
</style>
