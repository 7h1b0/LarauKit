<script lang="ts">
  export let isOpen = false;
  export let closePanel: () => void;

</script>

<section id="panel" data-panel={isOpen}>
  {#if isOpen === true}
  <div>
    <header>
      <button on:click={closePanel}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </header>
    
    <main>
      <slot />
    </main>
  </div>
  {/if}
</section>

<style>
  #panel {
    position: fixed;
    width: 55%;
    height: 100vh;
    background: var(--color-background-section);
    inset: 0 0 0 auto;
    transform: translateX(100%);
    transition: transform var(--animation-delay) var(--animation-timing);
  }

  #panel[data-panel="true"] {
    transform: translateX(0px)
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
  }

  button:hover {
    color: var(--color-primary)
  }

</style>