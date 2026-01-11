import { useEffect, useContext, useState } from 'react';
import { StyleSheet } from 'react-native';
import ExpensesOutput from '../components/ExpensesOutput';
import { getDateMinusDays } from '../util/date';
import { fetchExpenses } from '../util/http';
import { ExpensesContext } from '../store/expenses-context';
import LoadingOverlay from '../components/ui/LoadingOverlay';

export default function RecentExpenses() {
  const [isFetching, setIsFetching] = useState(false);
  const expensesContext = useContext(ExpensesContext);

  useEffect(() => {
    async function getExpenses() {
      setIsFetching(true);
      const expenses = await fetchExpenses();
      setIsFetching(false);
      expensesContext.fetchExpenses(expenses);
    }
    getExpenses();
  }, []);

  if (isFetching) {
    return <LoadingOverlay />;
  }

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
