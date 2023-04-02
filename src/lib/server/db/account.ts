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

export type Account = {
  id: number;
  title: string;
  bank: string;
  accountType: number;
  balance: number;
};
export function getByType(): Promise<Account[]> {
  return knex('account')
    .select(
      { id: 'account.id' },
      { title: 'account.title' },
      { bank: 'bank.title' },
      { accountType: 'account.accountTypeId' }
    )
    .sum({ balance: 'value' })
    .join('bank', 'bank.id', 'account.bankId')
    .join('transaction', 'transaction.accountId', 'account.id')
    .andWhere('closeAt', null)
    .groupBy('account.id')
    .orderBy('id')
    .then((accounts) => (accounts as Account[]).map((account) => ({ ...account })));
}
