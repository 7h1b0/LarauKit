<script lang="ts">
  import { formatToCurrency } from './numberHelper';

  export let title: string;
  export let maximum: number;
  export let value: number;
</script>

<label>
  {title}: {formatToCurrency(value)}
  <progress max={maximum} value={Math.abs(value)} />
</label>

<style>
  label {
    display: block;
    text-align: justify;
  }

  progress {
    display: block;
    width: 100%;
    border-radius: var(--rounded);
    overflow: hidden;
    background: #6f9281;
    border: none;
  }

  progress::-moz-progress-bar {
    background-color: var(--color-background);
  }
</style>
