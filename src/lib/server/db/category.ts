import knex from './knexClient';

export function getAll() {
  return knex('category')
    .select('id', 'title')
    .orderBy('id')
    .then((categories) => categories.map((category) => ({ ...category })));
}
