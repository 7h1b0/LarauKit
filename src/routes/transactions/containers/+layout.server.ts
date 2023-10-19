import * as container from '$lib/server/db/container';

export async function load({ params }) {
  const containers = await container.findAllWithBalance();

  return { containers, selected: Number(params.containerId) };
}
