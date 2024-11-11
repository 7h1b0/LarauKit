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
  <div class="items">
    {@render children()}
  </div>
</aside>

<style>
  aside {
    background: var(--color);
    color: var(--color);
    padding: var(--space-s);
    border-radius: var(--rounded);
  }

  aside[data-variant='primary'] {
    --color: var(--color-primary);
  }

  aside[data-variant='secondary'] {
    --color: var(--color-secondary);
  }

  .items {
    display: grid;
    margin-block-start: var(--space-s);
    grid-auto-flow: column;
    grid-template-rows: 1fr 1fr;
    gap: var(--space-s);
    grid-column: 2 / 4;
  }

  h1 {
    color: var(--color-text-inverse);
    font-size: var(--font-l);
    opacity: 0.9;
  }
</style>
