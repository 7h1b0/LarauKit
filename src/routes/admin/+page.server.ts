import * as category from '$lib/server/db/category';
import * as container from '$lib/server/db/container';
import * as account from '$lib/server/db/account';
import * as transaction from '$lib/server/db/transaction';

import type { Actions, RequestEvent } from '@sveltejs/kit';

export async function load() {
  const [categories, containers, accounts] = await Promise.all([
    category.getAll(),
    container.getAll(),
    account.getAllOpen()
  ]);

  return {
    categories,
    containers,
    accounts
  };
}

export const actions: Actions = {
  transaction: async ({ request }: RequestEvent) => {
    const data = await request.formData();
    const account = data.get('account') as string;
    const category = data.get('category') as string;
    const amount = Number(data.get('amount'));
    const container = data.get('container') as string;
    const description = data.get('description') as string;
    const date = data.get('date') as string;

    const actualDate = new Date(date);

    await transaction.add({ account, category, amount, container, description, date: actualDate });

    return { success: true };
  },
  wiretransfer: async ({ request }: RequestEvent) => {
    const data = await request.formData();
    const creditBankID = data.get('creditBankID') as string;
    const debitBankID = data.get('debitBankID') as string;
    const category = '28';
    const amount = Number(data.get('amount'));
    const date = data.get('date') as string;

    const actualDate = new Date(date);

    await transaction.add({
      account: creditBankID,
      category,
      amount: -amount,
      description: `Virement `,
      date: actualDate
    });
    await transaction.add({
      account: debitBankID,
      category,
      amount,
      description: `Virement `,
      date: actualDate
    });

    return { success: true };
  }
};
