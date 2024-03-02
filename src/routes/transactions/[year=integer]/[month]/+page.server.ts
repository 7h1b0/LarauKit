import type { PageServerLoad } from './$types';
import { type Actions } from '@sveltejs/kit';

import * as transaction from '$lib/server/db/transaction';
import * as account from '$lib/server/db/account';
import * as category from '$lib/server/db/category';

import { formActions } from '../../formActions';

export const load: PageServerLoad = async ({ params }) => {
  const year = Number(params.year);
  const month = Number(params.month);

  const [transactions, accounts, categories] = await Promise.all([
    transaction.findByDate(month + 1, year),
    account.getAllOpen(),
    category.getAll()
  ]);

  const date = new Date(year, month, 5);

  return {
    transactions,
    date,
    accounts,
    categories
  };
};

export const actions: Actions = {
  updateTransaction: formActions.updateTransaction,
  deleteTransaction: formActions.deleteTransaction
};
