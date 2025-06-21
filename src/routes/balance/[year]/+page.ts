import type { PageLoad } from './$types';

type ValuePerCategory = Record<number, number[]>;
type Transaction = {
  title: string;
  data: number[];
};

export const load: PageLoad = ({ data }) => {
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
    if (!category) {
      return;
    }
    if (category.income) {
      splitIncomes.push({ title: category.title, data: values });
    } else {
      splitExpenses.push({ title: category.title, data: values });
    }
  });

  const incomes = Array.from({length: 12}, (_, i) => i+1).map(month => {
    return data.incomes[month] ?? 0;
  });

  const expenses = Array.from({length: 12}, (_, i) => i+1).map(month => {
    return data.expenses[month] ?? 0;
  });

  return {
    incomes,
    expenses,
    year: data.year,
    splitIncomes,
    splitExpenses
  };
};
