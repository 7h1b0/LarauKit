import knex from './knexClient';

type Container = {
  id: number;
  title: string;
};
export function getAll(): Promise<Container[]> {
  return knex('container')
    .select('id', 'title')
    .orderBy('container.title', 'ASC')
    .then((containers) => containers.map((containers) => ({ ...containers })));
}

export function getById(containerId: number): Promise<Container> {
  return knex('container').first('id', 'title').where('id', containerId);
}

type findAllWithBalanceReturn = {
  id: number;
  title: string;
  balance: number;
};
export function findAllWithBalance(): Promise<findAllWithBalanceReturn[]> {
  return knex('container')
    .select({ id: 'container.id', title: 'container.title', balance: knex.raw('SUM(value)') })
    .join('transaction', 'transaction.containerId', 'container.id')
    .groupBy('transaction.containerId')
    .orderBy('container.title', 'ASC')
    .then((containers) =>
      containers.map((containers: findAllWithBalanceReturn) => ({ ...containers }))
    );
}
