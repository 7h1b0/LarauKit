<script lang="ts">
  import Progress from './Progress.svelte';
  import type { ProgressType } from './types';
  interface Props {
    title: string;
    progressList: ProgressType[];
  }

  let { title, progressList }: Props = $props();

  let maximum = $derived(progressList.reduce((acc, { value }) => Math.max(acc, value), 0));
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
