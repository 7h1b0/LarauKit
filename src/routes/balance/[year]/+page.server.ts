import type { PageServerLoad } from './$types';

import * as transaction from '$lib/server/db/transaction';
import * as activity from '$lib/server/db/activity';
import * as category from '$lib/server/db/category';

export const load: PageServerLoad = async ({ params }) => {
  const year = Number(params.year);

  const incomes = await transaction.findIncomesMonthly(year);
  const expenses = await transaction.findExpensesMonthly(year);
  const categories = await category.getAll();

  const promises = Array.from({ length: 12 }, (_, i) => i + 1).map((month) => {
    return activity.findMonthly(year, month);
  });

  const monthlyExpenses = await Promise.all(promises);

  return { incomes, expenses, year: Number(params.year), monthlyExpenses, categories };
};
