import knex from './knexClient';

export function getAll() {
  return knex('category')
    .select('id', 'title', 'income')
    .orderBy('title')
    .then((categories) => categories.map((category) => ({ ...category })));
}
