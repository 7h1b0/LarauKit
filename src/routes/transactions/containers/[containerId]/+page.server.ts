import type { PageServerLoad } from './$types';

import * as transaction from '$lib/server/db/transaction';
import * as container from '$lib/server/db/container';

export const load: PageServerLoad = async ({ params }) => {
  const containerId = Number(params.containerId);

  const transactions = await transaction.findByContainerId(containerId);
  const containerTitle = await container.getById(containerId);

  return {
    transactions,
    title: containerTitle.title
  };
};
