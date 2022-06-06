<script lang="ts">
  import { formatToCurrency } from './numberHelper';

  export let title: string;
  export let total: number;
  export let income: number;
  export let expense: number;
</script>

<aside>
  <h1>{title}</h1>
  <div class="container">
    <div class="icon">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
        />
      </svg>
    </div>

    <p>Income</p>
    <h2>{formatToCurrency(income)}</h2>
  </div>
  <div class="container">
    <div class="icon">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-6 h-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
        />
      </svg>
    </div>

    <p>Patrimony</p>
    <h2>{formatToCurrency(total)}</h2>
  </div>

  <div class="container">
    <div class="icon">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M4.5 4.5l15 15m0 0V8.25m0 11.25H8.25"
        />
      </svg>
    </div>

    <p>Expense</p>
    <h2>{formatToCurrency(expense)}</h2>
  </div>
  <div class="container">
    <div class="icon">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-6 h-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"
        />
      </svg>
    </div>

    <p>Increase</p>
    <h2>{formatToCurrency(income + expense)}</h2>
  </div>
</aside>

<style>
  aside {
    background: var(--color-secondary);
    padding: var(--space-s);
    border-radius: var(--rounded);
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-s);
    grid-column: 2 / 4;
  }

  h1 {
    grid-column: 1 / 3;
  }

  .container {
    display: grid;
    column-gap: var(--space-s);
    grid-template-columns: 60px 1fr;
  }

  .icon {
    background: black;
    opacity: 0.9;
    border-radius: var(--rounded);
    padding: var(--space-s);
    color: var(--color-secondary);
    grid-row: 1 / 3;
  }

  h1 {
    color: var(--color-text-inverse);
    font-size: var(--font-l);
    opacity: 0.9;
  }

  h2,
  p {
    color: var(--color-text-inverse);
    grid-column: 2 /3;
  }
  p {
    align-self: end;
    font-size: var(--font-s);
  }
  h2 {
    font-size: calc(var(--font-m) * 2);
  }
</style>
