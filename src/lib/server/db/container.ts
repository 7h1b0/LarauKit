import knex from './knexClient';

export function getAll() {
  return knex('container')
    .select('id', 'title')
    .orderBy('id')
    .then((containers) => containers.map((containers) => ({ ...containers })));
}

export function getById(containerId: number) {
  return knex('container').first('id', 'title').where('id', containerId);
}

export function findAllWithBalance() {
  return knex('container')
    .select({ id: 'container.id', title: 'container.title' })
    .sum({ balance: 'value' })
    .join('transaction', 'transaction.containerId', 'container.id')
    .groupBy('container.id')
    .orderBy('transaction.performedAt', 'DESC')
    .then((containers) => containers.map((containers) => ({ ...containers })));
}
