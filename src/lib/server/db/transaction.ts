import knex from './knexClient';

type Transaction = {
  account: string;
  category: string;
  amount: number;
  container?: string;
  description: string;
  date: Date;
};
export function add(transaction: Transaction) {
  return knex('transaction').insert({
    accountId: transaction.account,
    categoryId: transaction.category,
    value: transaction.amount,
    description: transaction.description,
    performedAt: transaction.date,
    containerId: transaction.container
  });
}

export function findAll(limit: number, offset: number) {
  return knex('transaction')
    .select(
      'description',
      'transaction.id',
      'performedAt',
      'value',
      'categoryId',
      { category: 'category.title' },
      { account: 'account.title' },
      { bank: 'bank.title' }
    )
    .join('category', 'category.id', 'transaction.categoryId')
    .join('account', 'account.id', 'transaction.accountId')
    .join('bank', 'bank.id', 'account.bankId')
    .limit(limit)
    .offset(offset)
    .orderBy('performedAt', 'desc');
}

export function findByDate(month: number, year: number) {
  return knex('transaction')
    .select(
      'description',
      'transaction.id',
      'performedAt',
      'value',
      'categoryId',
      'accountId',
      { category: 'category.title' },
      { account: 'account.title' },
      { bank: 'bank.title' }
    )
    .join('category', 'category.id', 'transaction.categoryId')
    .join('account', 'account.id', 'transaction.accountId')
    .join('bank', 'bank.id', 'account.bankId')
    .orderBy('performedAt', 'desc')
    .whereRaw('MONTH(performedAt) = ? AND YEAR(performedAt) = ?', [month, year])
    .then((transactions) => transactions.map((transaction) => ({ ...transaction })));
}

export function findByContainerId(containerId: number) {
  return knex('transaction')
    .select(
      'description',
      'transaction.id',
      'performedAt',
      'value',
      'categoryId',
      'accountId',
      { category: 'category.title' },
      { account: 'account.title' },
      { bank: 'bank.title' }
    )
    .join('category', 'category.id', 'transaction.categoryId')
    .join('account', 'account.id', 'transaction.accountId')
    .join('bank', 'bank.id', 'account.bankId')
    .orderBy('performedAt', 'desc')
    .where('containerId', containerId)
    .then((transactions) => transactions.map((transaction) => ({ ...transaction })));
}

export function findIncomesMonthly(year: number): Promise<number[]> {
  return knex('transaction')
    .sum({ value: 'value' })
    .join('category', 'category.id', 'transaction.categoryId')
    .whereRaw('YEAR(performedAt) = ?', [year])
    .where('category.income', 1)
    .groupByRaw('MONTH(performedAt)')
    .orderByRaw('MONTH(performedAt) ASC')
    .then((incomes) => incomes.map(({ value }) => value));
}

export function findExpensesMonthly(year: number): Promise<number[]> {
  return knex('transaction')
    .sum({ value: 'value' })
    .join('category', 'category.id', 'transaction.categoryId')
    .whereRaw('YEAR(performedAt) = ?', [year])
    .andWhere('category.income', 0)
    .groupByRaw('MONTH(performedAt)')
    .orderByRaw('MONTH(performedAt) ASC')
    .then((expenses) => expenses.map(({ value }) => value));
}

export function findExpensesForTheMonth(year: number, month: number) {
  return knex('transaction')
    .sum({ value: 'value' })
    .join('category', 'category.id', 'transaction.categoryId')
    .whereRaw('YEAR(performedAt) = ?', [year])
    .andWhereRaw('MONTH(performedAt) = ?', [month])
    .andWhere('category.income', 0);
}

export function findIncomesForTheMonth(year: number, month: number) {
  return knex('transaction')
    .sum({ value: 'value' })
    .join('category', 'category.id', 'transaction.categoryId')
    .whereRaw('YEAR(performedAt) = ?', [year])
    .andWhereRaw('MONTH(performedAt) = ?', [month])
    .andWhere('category.income', 1);
}
