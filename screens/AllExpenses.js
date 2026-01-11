import { StyleSheet } from 'react-native';
import ExpensesOutput from '../components/ExpensesOutput';
import { useContext } from 'react';
import { ExpensesContext } from '../store/expenses-context';

export default function AllExpenses() { 
  const expensesContext = useContext(ExpensesContext);

  return (
    <ExpensesOutput periodName="Total" expenses={expensesContext.expenses} fallbackText="No registered expenses found." />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
