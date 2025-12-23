import { View, Text, StyleSheet, FlatList } from 'react-native';
import { GlobalStyles } from '../constants/styles';
import ExpenseItem from './ExpenseItem';

export default function ExpensesList({ expenses }) {
  function renderExpenseItem(itemData) {
    return <ExpenseItem description={itemData.item.description} amount={itemData.item.amount} date={itemData.item.date} />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={expenses}
        renderItem={renderExpenseItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  expenseItem: {
    padding: 16,
    marginVertical: 8,
    borderRadius: 6,
    backgroundColor: GlobalStyles.colors.primary50,
  },
});
