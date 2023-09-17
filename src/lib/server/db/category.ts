import knex from './knexClient';

type Category = {
  id: number;
  title: string;
  income: boolean;
};
export function getAll(): Promise<Category[]> {
  return knex('category')
    .select('id', 'title', 'income')
    .orderBy('title')
    .then((categories) => categories.map((category) => ({ ...category })));
}
