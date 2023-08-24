<script lang="ts">
  export let title: string;
</script>

<header>
  <h1>{title}</h1>
</header>

<style>
  header {
    position: sticky;
    inset-block-start: 0;
    background: var(--color-background);
    padding: var(--space-m) 0;
  }

  h1 {
    color: var(--color-text);
    font-size: calc(var(--font-m) * 2);
  }
</style>
