import * as transaction from '$lib/server/db/transaction';
import * as activies from '$lib/server/db/activity';
import * as account from '$lib/server/db/account';

export async function load() {
  const today = new Date();
  const currentMonth = today.getMonth() + 1;
  const currentYear = today.getFullYear();

  const [incomes, expenses, incomeYear, expenseYear, patrimony, accounts] = await Promise.all([
    transaction.findIncomesForTheMonth(currentYear, currentMonth),
    transaction.findExpensesForTheMonth(currentYear, currentMonth),
    activies.findIncomesForYear(currentYear),
    activies.findExpensesForYear(currentYear),
    activies.findPatrimony(),
    account.getByType()
  ]);

  const totalIncome = incomes.reduce((acc, income) => acc + income.value, 0);
  const totalExpense = expenses.reduce((acc, expense) => acc + expense.value, 0);
  const totalIncomeYear = incomeYear.reduce((acc, { value }) => acc + value, 0);
  const totalexpenseYear = expenseYear.reduce((acc, { value }) => acc + value, 0);
  const reshapedPatrimony = patrimony.reduce((acc, { value }) => acc + value, 0);

  const mapAccountTypeToIndex = accounts.reduce((acc, account) => {
    const index = acc.get(account.accountType);
    if (index === undefined) {
      acc.set(account.accountType, acc.size);
    }
    return acc;
  }, new Map());

  const groupedAccounts = accounts.reduce(
    (acc, account) => {
      const index = mapAccountTypeToIndex.get(account.accountType);
      acc[index].push(account);
      return acc;
    },
    Array.from({ length: mapAccountTypeToIndex.size }, () => []) as account.Account[][]
  );

  return {
    income: totalIncome,
    expense: totalExpense,
    incomeYear: totalIncomeYear,
    expenseYear: totalexpenseYear,
    patrimony: reshapedPatrimony,
    groupedAccounts
  };
}
