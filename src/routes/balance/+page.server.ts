import * as activity from '$lib/server/db/activity';
import type { YearlyCategoryBalance } from '$lib/server/db/activity';

function groupBy(
  array: YearlyCategoryBalance[],
  callbackFn: (el: YearlyCategoryBalance) => string
) {
  const map = new Map<string, YearlyCategoryBalance[]>();
  array.forEach((element) => {
    const currentKey = callbackFn(element);
    if (currentKey != null) {
      const chunk = map.get(currentKey);
      if (chunk) {
        chunk.push(element);
      } else {
        map.set(currentKey, [element]);
      }
    }
  });

  return map;
}

export async function load() {
  const [incomes, expenses, monthlyCategorySum] = await Promise.all([
    activity.findIncomesYearly(),
    activity.findExpensesYearly(),
    activity.findMonthlyCategoriesSum()
  ]);

  const labels =
    incomes.length > expenses.length
      ? incomes.map(({ year }) => year)
      : expenses.map(({ year }) => year);
  const incomeCategories = Array.from(
    new Set(monthlyCategorySum.filter(({ income }) => income).map(({ title }) => title))
  );
  const expenseCategories = Array.from(
    new Set(monthlyCategorySum.filter(({ income }) => !income).map(({ title }) => title))
  );
  const groupByCategory = groupBy(monthlyCategorySum, (element) => element.title);

  return { incomes, expenses, labels, incomeCategories, expenseCategories, groupByCategory };
}
