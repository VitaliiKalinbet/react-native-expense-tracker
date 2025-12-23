import { StyleSheet } from 'react-native';
import ExpensesOutput from '../components/ExpensesOutput';

export default function AllExpenses() {
  return (
    <ExpensesOutput periodName="Total" />
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
