import { redirect, type Actions, type RequestEvent } from '@sveltejs/kit';

import * as transaction from '$lib/server/db/transaction';

export const formActions: Actions = {
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
