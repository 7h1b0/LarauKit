<script lang="ts">
  import { page } from '$app/stores';

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
</script>

<nav>
  <ul>
    <li class:active={$page.url.pathname === '/'}>
      <a data-sveltekit-prefetch href="/"
        ><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <path d="M21 13v10h-6v-6h-6v6h-6v-10h-3l12-12 12 12h-3zm-1-5.907v-5.093h-3v2.093l3 3z" />
        </svg>Home</a
      >
    </li>
    <li class:active={$page.url.pathname.includes('/transactions')}>
      <a data-sveltekit-prefetch href={`/transactions/${year}/${month}`}
        ><svg
          width="24"
          height="24"
          xmlns="http://www.w3.org/2000/svg"
          fill-rule="evenodd"
          clip-rule="evenodd"
        >
          <path
            d="M24 21h-24v-2h24v2zm0-4.024h-24v-2h24v2zm0-3.976h-24v-2h24v2zm0-4h-24v-2h24v2zm0-6v2h-24v-2h24z"
          />
        </svg>Transactions</a
      >
    </li>
    <li class:active={$page.url.pathname.includes('/balance/')}>
      <a data-sveltekit-prefetch href={`/balance/${year}`}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <path d="M7 19h-6v-11h6v11zm8-18h-6v18h6v-18zm8 11h-6v7h6v-7zm1 9h-24v2h24v-2z" />
        </svg>Monthly Balance</a
      >
    </li>
    <li class:active={$page.url.pathname.endsWith('/balance')}>
      <a data-sveltekit-prefetch href="/balance/"
        ><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <path d="M7 19h-6v-11h6v11zm8-18h-6v18h6v-18zm8 11h-6v7h6v-7zm1 9h-24v2h24v-2z" />
        </svg>Yearly Balance</a
      >
    </li>
    <li class:active={$page.url.pathname === '/patrimony'}>
      <a href="/patrimony"
        ><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M7 24h-6v-6h6v6zm8-9h-6v9h6v-9zm8-4h-6v13h6v-13zm0-11l-6 1.221 1.716 1.708-6.85 6.733-3.001-3.002-7.841 7.797 1.41 1.418 6.427-6.39 2.991 2.993 8.28-8.137 1.667 1.66 1.201-6.001z"
          />
        </svg>Patrimony</a
      >
    </li>
    <li class:active={/containers/.test($page.url.pathname)}>
      <a href="/containers"
        ><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M22 18.055v2.458c0 1.925-4.655 3.487-10 3.487-5.344 0-10-1.562-10-3.487v-2.458c2.418 1.738 7.005 2.256 10 2.256 3.006 0 7.588-.523 10-2.256zm-10-3.409c-3.006 0-7.588-.523-10-2.256v2.434c0 1.926 4.656 3.487 10 3.487 5.345 0 10-1.562 10-3.487v-2.434c-2.418 1.738-7.005 2.256-10 2.256zm0-14.646c-5.344 0-10 1.562-10 3.488s4.656 3.487 10 3.487c5.345 0 10-1.562 10-3.487 0-1.926-4.655-3.488-10-3.488zm0 8.975c-3.006 0-7.588-.523-10-2.256v2.44c0 1.926 4.656 3.487 10 3.487 5.345 0 10-1.562 10-3.487v-2.44c-2.418 1.738-7.005 2.256-10 2.256z"
          />
        </svg>Containers</a
      >
    </li>
    <li class:active={$page.url.pathname === '/admin'}>
      <a data-sveltekit-prefetch href="/admin"
        ><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M24 13.616v-3.232c-1.651-.587-2.694-.752-3.219-2.019v-.001c-.527-1.271.1-2.134.847-3.707l-2.285-2.285c-1.561.742-2.433 1.375-3.707.847h-.001c-1.269-.526-1.435-1.576-2.019-3.219h-3.232c-.582 1.635-.749 2.692-2.019 3.219h-.001c-1.271.528-2.132-.098-3.707-.847l-2.285 2.285c.745 1.568 1.375 2.434.847 3.707-.527 1.271-1.584 1.438-3.219 2.02v3.232c1.632.58 2.692.749 3.219 2.019.53 1.282-.114 2.166-.847 3.707l2.285 2.286c1.562-.743 2.434-1.375 3.707-.847h.001c1.27.526 1.436 1.579 2.019 3.219h3.232c.582-1.636.75-2.69 2.027-3.222h.001c1.262-.524 2.12.101 3.698.851l2.285-2.286c-.744-1.563-1.375-2.433-.848-3.706.527-1.271 1.588-1.44 3.221-2.021zm-12 2.384c-2.209 0-4-1.791-4-4s1.791-4 4-4 4 1.791 4 4-1.791 4-4 4z"
          />
        </svg>Settings</a
      >
    </li>
  </ul>
</nav>

<style>
  nav {
    width: var(--width-nav);
    position: fixed;
    top: 0;
  }

  ul {
    list-style: none;
    margin: var(--space-m) 0 0 var(--space-s);
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: var(--space-xs);
  }

  li {
    color: var(--color-text-secondary);
    fill: var(--color-text-secondary);
  }

  .active,
  li:hover {
    fill: var(--color-primary);
    color: var(--color-text);
    background: var(--color-background-section);
    border-radius: var(--rounded);
  }

  a {
    display: flex;
    gap: var(--space-s);
    color: inherit;
    text-decoration: none;
    padding: var(--space-xs) var(--space-s);
  }

  svg {
    color: inherit;
    fill: inherit;
    width: 18px;
    height: 18px;
  }
</style>
