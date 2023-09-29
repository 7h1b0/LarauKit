import type { Transaction } from '$lib/types';
import knex from './knexClient';

export function add(transaction: {
  account: string;
  category: string;
  amount: number;
  container?: string;
  description: string;
  date: Date;
}) {
  return knex('transaction').insert({
    accountId: transaction.account,
    categoryId: transaction.category,
    value: transaction.amount,
    description: transaction.description,
    performedAt: transaction.date,
    containerId: transaction.container
  });
}

export type PayloadTransaction = {
  id: string;
  amount: number;
  category: string;
  account: string;
  description: string;
  container?: string;
};

export function update(transaction: PayloadTransaction) {
  return knex('transaction')
    .update({
      accountId: transaction.account,
      categoryId: transaction.category,
      value: transaction.amount,
      description: transaction.description,
      containerId: transaction.container
    })
    .where({ id: transaction.id });
}

export function remove(id: string) {
  return knex('transaction').where({ id }).del();
}

export function findByDate(month: number, year: number): Promise<Transaction[]> {
  return knex('transaction')
    .select(
      'description',
      'transaction.id',
      'performedAt',
      'value',
      'categoryId',
      'accountId',
      'containerId',
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

export function findById(transactionId: number): Promise<Transaction> {
  return knex('transaction')
    .first(
      'description',
      'transaction.id',
      'performedAt',
      'value',
      'categoryId',
      'accountId',
      'containerId',
      { category: 'category.title' },
      { account: 'account.title' },
      { bank: 'bank.title' }
    )
    .join('category', 'category.id', 'transaction.categoryId')
    .join('account', 'account.id', 'transaction.accountId')
    .join('bank', 'bank.id', 'account.bankId')
    .orderBy('performedAt', 'desc')
    .where('transaction.id', transactionId)
    .then((transaction) => ({ ...transaction }));
}

export function findByContainerId(containerId: number): Promise<Transaction[]> {
  return knex('transaction')
    .select(
      'description',
      'transaction.id',
      'performedAt',
      'value',
      'categoryId',
      'accountId',
      'containerId',
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
