<script lang="ts">
  import Progress from './Progress.svelte';
  import type { ProgressType } from './types';
  export let title: string;
  export let progressList: ProgressType[];

  $: maximum = progressList.reduce((acc, { value }) => Math.max(acc, value), 0);
  $: sortedList = progressList.sort((a, b) => Math.abs(b.value) - Math.abs(a.value));
</script>

<aside>
  <h1>{title}</h1>
  {#each progressList as progress}
    <Progress title={progress.title} value={Math.abs(progress.value)} {maximum} />
  {/each}
</aside>

<style>
  aside {
    display: flex;
    flex-direction: column;
    gap: var(--space-s);
    background: var(--color-secondary);
    padding: var(--space-s);
    border-radius: var(--rounded);
  }
</style>
