import type { PageServerLoad } from './$types';

import * as transaction from '$lib/server/db/transaction';
import * as account from '$lib/server/db/account';
import * as category from '$lib/server/db/category';

import { redirect, type Actions, type RequestEvent } from '@sveltejs/kit';

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
  updateTransaction: async ({ request }: RequestEvent) => {
    const data = await request.formData();
    const id = data.get('id') as string;
    const account = data.get('account') as string;
    const category = data.get('category') as string;
    const amount = Number(data.get('amount'));
    const description = data.get('description') as string;
    const container = data.get('container') as string;

    await transaction.update({ account, category, amount, id, description, container });

    const url = new URL(request.url);
    throw redirect(302, url.pathname);
  },

  deleteTransaction: async ({ request }: RequestEvent) => {
    const data = await request.formData();
    const id = data.get('id') as string;

    await transaction.remove(id);

    return { success: true };
  }
};
