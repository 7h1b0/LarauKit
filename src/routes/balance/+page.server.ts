import * as activity from '$lib/server/db/activity';

export async function load() {
  const [incomes, expenses] = await Promise.all([
    activity.findIncomesYearly(),
    activity.findExpensesYearly()
  ]);

  const labels = incomes.map(({ year }) => year);

  return { incomes, expenses, labels };
}
