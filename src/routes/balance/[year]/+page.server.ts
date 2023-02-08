import * as transaction from '$lib/server/db/transaction';
import * as activity from '$lib/server/db/activity';
import * as category from '$lib/server/db/category';

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
  const categories = await category.getAll();

  const promises = Array.from({ length: 12 }, (_, i) => i + 1).map((month) => {
    return activity.findMonthly(params.year, month);
  });

  const monthlyExpenses = await Promise.all(promises);

  return { incomes, expenses, year: Number(params.year), monthlyExpenses, categories };
}
