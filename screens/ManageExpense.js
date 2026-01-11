import { View, TextInput, StyleSheet } from 'react-native';
import { useLayoutEffect } from 'react';
import IconButton from '../components/ui/IconButton';
import Button from '../components/ui/Button';
import { GlobalStyles } from '../constants/styles';
import { ExpensesContext } from '../store/expenses-context';
import { useContext } from 'react';
import ExpenseForm from '../components/ManageExpense/ExpenseForm';

export default function ManageExpense({ route, navigation }) {
  const expensesContext = useContext(ExpensesContext);
  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;

  function deleteExpenseHandler() {
    expensesContext.deleteExpense(editedExpenseId);
    navigation.goBack();
  }

  function cancelHandler() {
    navigation.goBack();
  }

  function confirmHandler() {
    if (isEditing) {
      expensesContext.updateExpense(editedExpenseId, {
        description: 'test',
        amount: 100,
        date: new Date('2026-01-10'),
      });
    } else {
      expensesContext.addExpense({
        description: 'test',
        amount: 100,
        date: new Date('2026-01-10'),
      });
    }
    
    navigation.goBack();
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense',  
    });
  }, [navigation, isEditing]);

  return (
    <View style={styles.container}>
      <ExpenseForm />
      <View style={styles.buttonsContainer}>
        <Button onPress={cancelHandler} style={styles.button}>Cancel</Button>
        <Button onPress={confirmHandler} style={styles.button}>{isEditing ? 'Update' : 'Add'}</Button>
      </View>
      
      {isEditing && <View style={styles.deleteContainer}>
         <IconButton
          icon="trash"
          size={24}
          color={GlobalStyles.colors.error500}
          onPress={deleteExpenseHandler}
        />
      </View>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  deleteContainer: {
    marginTop: 12,
    padding: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
});
