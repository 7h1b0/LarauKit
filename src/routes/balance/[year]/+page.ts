import type { PageLoad } from './$types';

type ValuePerCategory = Record<number, number[]>;
type Transaction = {
  title: string;
  data: number[];
};

export const load = (({ data }) => {
  function getCategory(categoryId: number) {
    return data.categories.find((category) => category.id === categoryId);
  }

  const record = data.categories.reduce((acc: ValuePerCategory, category) => {
    acc[category.id] = [];
    return acc;
  }, {});

  const splitExpenses: Transaction[] = [];
  const splitIncomes: Transaction[] = [];

  data.monthlyExpenses.forEach((month) => {
    data.categories.forEach((category) => {
      const expense = month.find((expense) => expense.categoryId === category.id);
      record[category.id].push(expense?.value ?? 0);
    });
  });

  Object.entries(record).forEach(([id, values]) => {
    const category = getCategory(Number(id));
    if (category.income) {
      splitIncomes.push({ title: category.title, data: values });
    } else {
      splitExpenses.push({ title: category.title, data: values });
    }
  });

  return {
    incomes: data.incomes,
    expenses: data.expenses,
    year: data.year,
    splitIncomes,
    splitExpenses
  };
}) satisfies PageLoad;
