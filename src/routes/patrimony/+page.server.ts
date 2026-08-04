import * as activies from '$lib/server/db/activity';

export async function load() {
  const [patrimony, saving, lifeInsurance, stock] = await Promise.all([
    activies.findPatrimony(),
    activies.findByAccountType(1),
    activies.findByAccountType(2),
    activies.findByAccountType(3)
  ]);

  const reshapedPatrimony = patrimony.reduce((acc, { value }) => acc + value, 0);

  return {
    patrimony: reshapedPatrimony,
    lifeInsurance,
    stock,
    saving
  };
}
