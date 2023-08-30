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
    margin-block: 0 var(--space-m);
    margin-inline: calc(var(--size-nav) + var(--space-m)) var(--space-m);
    transition: margin-inline var(--animation-delay) var(--animation-timing);
  }
</style>
