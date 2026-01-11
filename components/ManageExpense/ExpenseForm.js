import { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Input from './Input';
import Button from '../ui/Button';
import { getFormattedDate } from '../../util/date';

export default function ExpenseForm({ onCancel, onSubmit, submitButtonLabel, defaultValues }) {
  const [inputs, setInputs] = useState({
    amount: defaultValues ? defaultValues.amount.toString() : '',
    date: defaultValues ? getFormattedDate(defaultValues.date) : '',
    description: defaultValues ? defaultValues.description : '',
  });

  function inputChangeHandler(inputIdentifier, enteredValue) {
    setInputs((curInputs) => ({ ...curInputs, [inputIdentifier]: enteredValue }));
  }

  function submitHandler() {
    const expenseData = {
      amount: +inputs.amount,
      date: new Date(inputs.date),
      description: inputs.description,
    };
    onSubmit(expenseData);
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
          onChangeText: inputChangeHandler.bind(this, 'amount'),
          value: inputs.amount,
        }} />
        <Input
          style={styles.rowInput}
          label="Date"
          textInputConfig={{
          placeholder: 'YYYY-MM-DD',
          maxLength: 10,
          keyboardType: 'datetime-local',
          onChangeText: inputChangeHandler.bind(this, 'date'),
          value: inputs.date,
        }} />
      </View>
      <Input label="Description" textInputConfig={{
        onChangeText: inputChangeHandler.bind(this, 'description'),
        multiline: true,
        value: inputs.description,
        // autoCapitalize: 'sentences',
        // autoCorrect: false,
      }} />

      <View style={styles.buttonsContainer}>
        <Button mode="flat" onPress={onCancel} style={styles.button}>Cancel</Button>
        <Button onPress={submitHandler} style={styles.button}>{submitButtonLabel}</Button>
      </View>
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
