import { json } from '@sveltejs/kit';
import * as transaction from '$lib/server/db/transaction';

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function GET() {
  const transactions = await transaction.findAll(20, 0);

  return json({ transactions });
}
