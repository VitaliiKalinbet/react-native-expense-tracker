import { View, Text, StyleSheet } from 'react-native';
import ExpensesSummary from './ExpensesSummary';
import ExpensesList from './ExpensesList';
import { GlobalStyles } from '../constants/styles';

const DUMMY_EXPENSES = [
  {
    id: 'e1',
    amount: 19.99,
    date: new Date('2025-12-01'),
    description: 'A pair of shoes',
  },
  {
    id: 'e2',
    amount: 29.99,
    date: new Date('2025-12-02'),
    description: 'A pair of pants',
  },
  {
    id: 'e3',
    amount: 39.99,
    date: new Date('2025-12-03'),
    description: 'A pair of socks',
  },
  {
    id: 'e4',
    amount: 49.99,
    date: new Date('2025-12-21'),
    description: 'A pair of hats',
  },
  {
    id: 'e5',
    amount: 59.99,
    date: new Date('2025-12-22'),
    description: 'A pair of gloves',
  },
  {
    id: 'e6',
    amount: 69.99,
    date: new Date('2025-12-23'),
    description: 'A pair of hats',
  },
  {
    id: 'e7',
    amount: 79.99,
    date: new Date('2025-12-24'),
    description: 'A pair of hats',
  },
  {
    id: 'e8',
    amount: 89.99,
    date: new Date('2025-12-25'),
    description: 'A pair of hats',
  },
  {
    id: 'e9',
    amount: 99.99,
    date: new Date('2025-12-26'),
    description: 'A pair of hats',
  },
  {
    id: 'e10',
    amount: 109.99,
    date: new Date('2025-12-27'),
    description: 'A pair of hats',
  },
];

export default function ExpensesOutput({ expenses = DUMMY_EXPENSES, periodName = 'Last year' }) {
  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={expenses} periodName={periodName} />
      <ExpensesList expenses={expenses} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 0,
    backgroundColor: GlobalStyles.colors.primary700,
    borderRadius: 16,
    margin: 24,
    elevation: 4,
    shadowColor: GlobalStyles.colors.gray700,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
});
