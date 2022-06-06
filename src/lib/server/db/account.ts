import knex from './knexClient';

export function getAllOpen() {
  return knex('account')
    .select({ id: 'account.id' }, { account: 'account.title' }, { bank: 'bank.title' })
    .join('bank', 'bank.id', 'account.bankId')
    .where('account.closeAt', null)
    .orderBy('bank.title')
    .orderBy('id')
    .then((accounts) => accounts.map((account) => ({ ...account })));
}

export function getByType(accountType: number) {
  return knex('account')
    .select('account.id', { title: 'account.title' }, { bank: 'bank.title' })
    .sum({ balance: 'value' })
    .join('bank', 'bank.id', 'account.bankId')
    .join('transaction', 'transaction.accountId', 'account.id')
    .where('account.accountTypeId', accountType)
    .andWhere('closeAt', null)
    .groupBy('account.id')
    .orderBy('bankId')
    .orderBy('id')
    .then((accounts) => accounts.map((account) => ({ ...account })));
}
