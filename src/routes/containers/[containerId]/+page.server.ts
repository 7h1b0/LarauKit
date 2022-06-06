import * as transaction from '$lib/server/db/transaction';
import * as container from '$lib/server/db/container';

type Params = {
  params: {
    containerId: number;
  };
};

/** @type {import('./$types').PageLoad} */
export async function load({ params }: Params) {
  const transactions = await transaction.findByContainerId(params.containerId);
  const containerTitle = await container.getById(params.containerId);

  return {
    transactions,
    title: containerTitle.title
  };
}
