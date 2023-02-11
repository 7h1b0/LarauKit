import knex from './knexClient';

type MonthlyBalance = { year: string; value: number };

export function findIncomesYearly(): Promise<MonthlyBalance[]> {
  return knex('transaction')
    .select({ year: knex.raw('YEAR(performedAt)') })
    .sum({ value: 'value' })
    .join('category', 'category.id', 'transaction.categoryId')
    .where('income', 1)
    .groupByRaw('YEAR(performedAt)')
    .orderByRaw('YEAR(performedAt) ASC')
    .then((incomes) => incomes as MonthlyBalance[])
    .then((incomes) => incomes.map((income) => ({ ...income })));
}

export function findExpensesYearly(): Promise<MonthlyBalance[]> {
  return knex('transaction')
    .select({ year: knex.raw('YEAR(performedAt)') })
    .sum({ value: 'value' })
    .join('category', 'category.id', 'transaction.categoryId')
    .where('income', 0)
    .groupByRaw('YEAR(performedAt)')
    .orderByRaw('YEAR(performedAt) ASC')
    .then((expenses) => expenses as MonthlyBalance[])
    .then((expenses) => expenses.map((expense) => ({ ...expense })));
}

type MonthlyExpenses = { title: string; categoryId: number; value: number };

export function findMonthly(year: number, month: number): Promise<MonthlyExpenses[]> {
  return knex('transaction')
    .select('categoryId')
    .sum({ value: 'value' })
    .whereRaw('MONTH(performedAt) = ? AND YEAR(performedAt) = ?', [month, year])
    .groupBy('categoryId')
    .then((expenses) => expenses as MonthlyExpenses[])
    .then((expenses) => expenses.map((expense) => ({ ...expense })));
}

export function findIncomesForYear(year: number) {
  return knex('transaction')
    .sum({ value: 'value' })
    .join('category', 'category.id', 'transaction.categoryId')
    .where('income', 1)
    .andWhereRaw('YEAR(performedAt) = ?', year);
}

export function findExpensesForYear(year: number) {
  return knex('transaction')
    .sum({ value: 'value' })
    .join('category', 'category.id', 'transaction.categoryId')
    .where('income', 0)
    .andWhereRaw('YEAR(performedAt) = ?', year);
}

export function findPatrimony() {
  return knex('transaction').sum({ value: 'value' });
}
