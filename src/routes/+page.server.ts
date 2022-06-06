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
    account.getByType(1)
  ]);

  const totalIncome = incomes.reduce((acc, income) => acc + income.value, 0);
  const totalExpense = expenses.reduce((acc, expense) => acc + expense.value, 0);
  const totalIncomeYear = incomeYear.reduce((acc, { value }) => acc + value, 0);
  const totalexpenseYear = expenseYear.reduce((acc, { value }) => acc + value, 0);
  const reshapedPatrimony = patrimony.reduce((acc, { value }) => acc + value, 0);

  return {
    income: totalIncome,
    expense: totalExpense,
    incomeYear: totalIncomeYear,
    expenseYear: totalexpenseYear,
    patrimony: reshapedPatrimony,
    accounts
  };
}
