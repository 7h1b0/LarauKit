<script lang="ts">
  import { formatToCurrency } from './numberHelper';

  interface Props {
    title: string;
    maximum: number;
    value: number;
  }

  let { title, maximum, value }: Props = $props();
</script>

<label>
  {title}: {formatToCurrency(value)}
  <progress max={maximum} value={Math.abs(value)}></progress>
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
