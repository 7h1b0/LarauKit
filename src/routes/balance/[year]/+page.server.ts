import * as transaction from '$lib/server/db/transaction';

type Params = {
  params: {
    month: number;
    year: number;
  };
};

/** @type {import('./$types').PageLoad} */
export async function load({ params }: Params) {
  const incomes = await transaction.findIncomesMonthly(params.year);
  const expenses = await transaction.findExpensesMonthly(params.year);

  return { incomes, expenses, year: Number(params.year) };
}
