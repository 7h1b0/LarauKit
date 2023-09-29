import * as container from '$lib/server/db/container';

export async function load() {
  const containers = await container.findAllWithBalance();

  return { containers };
}
