import type { LayoutServerLoad } from './$types';

import * as transaction from '$lib/server/db/transaction';
import * as account from '$lib/server/db/account';
import * as category from '$lib/server/db/category';
import * as container from '$lib/server/db/container';

export const load: LayoutServerLoad = async ({ url }) => {
  const transactionId = url.searchParams.get('transactionId');
  if (transactionId) {
    const [currentTransaction, accounts, categories, containers] = await Promise.all([
      transaction.findById(Number(transactionId)),
      account.getAllOpen(),
      category.getAll(),
      container.getAll()
    ]);

    return {
      currentTransaction,
      accounts,
      categories,
      containers
    };
  }
  return {
    currentTransaction: null,
    accounts: [],
    categories: [],
    containers: []
  };
};
