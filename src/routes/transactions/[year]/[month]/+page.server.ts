import * as transaction from '$lib/server/db/transaction';
import * as account from '$lib/server/db/account';
import * as category from '$lib/server/db/category';

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
