import * as transaction from '$lib/server/db/transaction';
import * as account from '$lib/server/db/account';
import * as category from '$lib/server/db/category';

import type { Actions, RequestEvent } from '@sveltejs/kit';

type Params = {
  params: {
    month: number;
    year: number;
  };
};
/** @type {import('@sveltejs/kit').PageLoad} */
export async function load({ params }: Params) {
  const [transactions, accounts, categories] = await Promise.all([
    transaction.findByDate(Number(params.month) + 1, params.year),
    account.getAllOpen(),
    category.getAll()
  ]);

  const date = new Date(params.year, params.month, 5);

  return {
    transactions,
    date,
    accounts,
    categories
  };
}

export const actions: Actions = {
  updateTransaction: async ({ request }: RequestEvent) => {
    const data = await request.formData();
    const id = data.get('id') as string;
    const account = data.get('account') as string;
    const category = data.get('category') as string;
    const amount = Number(data.get('amount'));
    const description = data.get('description') as string;

    await transaction.update({ account, category, amount, id, description });

    return { success: true };
  },

  deleteTransaction: async ({ request }: RequestEvent) => {
    const data = await request.formData();
    const id = data.get('id') as string;

    await transaction.remove(id);

    return { success: true };
  }
};
