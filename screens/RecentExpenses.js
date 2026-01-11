import { useEffect, useContext } from 'react';
import { StyleSheet } from 'react-native';
import ExpensesOutput from '../components/ExpensesOutput';
import { getDateMinusDays } from '../util/date';
import { fetchExpenses } from '../util/http';
import { ExpensesContext } from '../store/expenses-context';

export default function RecentExpenses() {
  const expensesContext = useContext(ExpensesContext);

  useEffect(() => {
    async function getExpenses() {
      try {
        const expenses = await fetchExpenses();
        expensesContext.fetchExpenses(expenses);
      } catch (error) {
        // Network error - silently fail
      }
    }
    getExpenses();
  }, []);

  const recentExpenses = expensesContext.expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);

    return expense.date >= date7DaysAgo && expense.date <= today;
  });

  return (
    <ExpensesOutput
      periodName="Last 7 days"
      expenses={recentExpenses}
      fallbackText="No expenses found for the last 7 days."
    />
  );
}

const styles = StyleSheet.create({
});
