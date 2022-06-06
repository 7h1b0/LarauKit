<script lang="ts">
  import { formatToCurrency } from './numberHelper';

  export let title: string;
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
</aside>

<style>
  aside {
    background: var(--color-primary);
    padding: var(--space-s);
    border-radius: var(--rounded);
    display: flex;
    flex-direction: column;
    gap: var(--space-s);
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
    color: var(--color-primary);
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
