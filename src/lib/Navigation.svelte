<script lang="ts">
  interface Props {
    title: string;
    previousNavigationLink: string;
    nextNavigationLink: string;
  }

  let { title, previousNavigationLink, nextNavigationLink }: Props = $props();
</script>

<div>
  <a href={previousNavigationLink} aria-label="Previous">
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
        d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
      />
    </svg>
  </a>
  <p>{title}</p>
  <a href={nextNavigationLink} aria-label="Next">
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
        d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
      />
    </svg>
  </a>
</div>

<style>
  div {
    display: grid;
    grid-template-columns: 60px 1fr 60px;
    place-items: center;
    inline-size: 100%;
    background: var(--color-background-section);
    padding: var(--space-s) 0;
    color: var(--color-text);
    border-radius: var(--rounded);
  }

  svg,
  a {
    inline-size: 25px;
    block-size: 25px;
    color: var(--color-text);
  }

  :is(a, svg):hover {
    color: var(--color-primary)
  }
</style>
