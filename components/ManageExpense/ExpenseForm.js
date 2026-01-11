import { View, Text, StyleSheet } from 'react-native';
import Input from './Input';

export default function ExpenseForm() {
  function amountChangeHandler(enteredAmount) {
    console.log(enteredAmount);
  }

  function dateChangeHandler(enteredDate) {
    console.log(enteredDate);
  }

  function descriptionChangeHandler(enteredDescription) {
    console.log(enteredDescription);
  }

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <Input
          style={styles.rowInput}
          label="Amount"
          textInputConfig={{
          keyboardType: 'decimal-pad',
          onChangeText: amountChangeHandler,
        }} />
        <Input
          style={styles.rowInput}
          label="Date"
          textInputConfig={{
          placeholder: 'YYYY-MM-DD',
          maxLength: 10,
          keyboardType: 'datetime-local',
          onChangeText: dateChangeHandler,
        }} />
      </View>
      <Input label="Description" textInputConfig={{
        onChangeText: descriptionChangeHandler,
        multiline: true,
        // autoCapitalize: 'sentences',
        // autoCorrect: false,
      }} />
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    marginTop: 40,
  },
  inputsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowInput: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 16,
    textAlign: 'center',
  },
});
