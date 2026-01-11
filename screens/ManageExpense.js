import { View, Text, StyleSheet } from 'react-native';
import { useLayoutEffect } from 'react';

export default function ManageExpense({ route, navigation }) {
  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense',  
    });
  }, [navigation, isEditing]);

  return (
    <View style={styles.container}>
      <Text>Manage Expense</Text>
    </View>
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
