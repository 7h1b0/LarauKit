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
    inline-size: 100%;
    border-radius: var(--rounded);
    overflow: hidden;
    background: #6f9281;
    border: none;
  }

  progress::-webkit-progress-value {
    background-color: var(--color-background);
  }
  
  progress::-webkit-progress-bar {
    background-color: #6f9281;
  }

  progress::-moz-progress-bar {
    background-color: var(--color-background);
  }
</style>
