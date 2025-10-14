<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    title: string;
    variant: 'primary' | 'secondary';
    children: Snippet;
  }

  let { title, variant, children }: Props = $props();
</script>

<aside data-variant={variant}>
  <h1>{title}</h1>
  {@render children()}
</aside>

<style>
  aside {
    display: grid;
    grid-template-columns: subgrid;
    background: var(--color);
    color: var(--color);
    padding: var(--space-s);
    border-radius: var(--rounded);
    row-gap: var(--space-s);
  }

  aside[data-variant='primary'] {
    grid-column: span 1;
    --color: var(--color-primary);
  }

  aside[data-variant='secondary'] {
    grid-column: span 2;
    --color: var(--color-secondary);
  }

  h1 {
    color: var(--color-text-inverse);
    font-size: var(--font-l);
    grid-column: 1 / -1;
  }
</style>
