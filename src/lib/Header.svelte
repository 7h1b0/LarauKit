<script lang="ts">
  export let title: string;
</script>

<header>
  <h1>{title}</h1>
</header>

<style>
  header {
    position: sticky;
    padding: 0 0 var(--space-m);
  }

  h1 {
    color: var(--color-text);
    font-size: calc(var(--font-m) * 2);
  }
</style>
