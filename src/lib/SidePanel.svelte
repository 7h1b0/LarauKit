<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    isOpen?: boolean;
    closePanel: () => void;
    children: Snippet;
  }

  let { isOpen = false, closePanel, children }: Props = $props();
</script>

<dialog open={isOpen}>
  <div>
    <header>
      <button type="button" onclick={closePanel} aria-label="Close">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </header>

    <main>
      {@render children()}
    </main>
  </div>
</dialog>

<style>
  dialog {
    position: fixed;
    width: 55%;
    height: 100vh;
    background: var(--color-background-section);
    inset: 0 0 0 auto;
    transform: translateX(100%);
    transition-property: display, transform;
    transition-duration: var(--animation-delay);
    transition-timing-function: var(--animation-timing);
    transition-behavior: allow-discrete;
    border: none;
    border-inline-start: 1px solid var(--color-background);

    &[open] {
      transform: translateX(0px);

      @starting-style {
        transform: translateX(100%);
      }
    }
  }

  div {
    padding: var(--space-m);
    display: flex;
    flex-direction: column;
    gap: var(--space-m);
  }

  svg {
    width: calc(var(--size-icon) * 2);
    height: calc(var(--size-icon) * 2);
  }

  button {
    background: none;
    border: none;
    padding: 0;
    margin: 0;
    color: var(--color-text);
    cursor: pointer;

    &:hover {
      color: var(--color-primary);
    }
  }
</style>
