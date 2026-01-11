import { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import Input from './Input';
import Button from '../ui/Button';
import { getFormattedDate } from '../../util/date';
import { GlobalStyles } from '../../constants/styles';

export default function ExpenseForm({ onCancel, onSubmit, submitButtonLabel, defaultValues }) {
  const [inputs, setInputs] = useState({
    amount: {
      value: defaultValues ? defaultValues.amount.toString() : '',
      isValid: true,
    },
    date: {
      value: defaultValues ? getFormattedDate(defaultValues.date) : '',
      isValid: true,
    },
    description: {
      value: defaultValues ? defaultValues.description : '',
      isValid: true,
    }
  });

  function inputChangeHandler(inputIdentifier, enteredValue) {
    setInputs((curInputs) => ({
      ...curInputs,
      [inputIdentifier]: { value: enteredValue, isValid: true }
    }));
  }

  function submitHandler() {
    const expenseData = {
      amount: +inputs.amount.value,
      date: new Date(inputs.date.value),
      description: inputs.description.value,
    };

    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = expenseData.date.toString() !== 'Invalid Date';
    const descriptionIsValid = expenseData.description?.trim().length > 0;

    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      // Alert.alert('Invalid input', 'Please check your input values');
      setInputs((curInputs) => ({
        ...curInputs,
        amount: { value: curInputs.amount.value, isValid: amountIsValid },
        date: { value: curInputs.date.value, isValid: dateIsValid },
        description: { value: curInputs.description.value, isValid: descriptionIsValid },
      }));
      return;
    }

    onSubmit(expenseData);
  }

  const  formIsInvalid = !inputs.amount.isValid || !inputs.date.isValid || !inputs.description.isValid;
  
  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <Input
          style={styles.rowInput}
          label="Amount"
          invalid={!inputs.amount.isValid}
          textInputConfig={{
          keyboardType: 'decimal-pad',
          onChangeText: inputChangeHandler.bind(this, 'amount'),
          value: inputs.amount.value,
        }} />
        <Input
          style={styles.rowInput}
          label="Date"
          invalid={!inputs.date.isValid}
          textInputConfig={{
          placeholder: 'YYYY-MM-DD',
          maxLength: 10,
          keyboardType: 'datetime-local',
          onChangeText: inputChangeHandler.bind(this, 'date'),
          value: inputs.date.value,
        }} />
      </View>
      <Input
        label="Description"
        invalid={!inputs.description.isValid}
        textInputConfig={{
        onChangeText: inputChangeHandler.bind(this, 'description'),
        multiline: true,
        value: inputs.description.value,
        // autoCapitalize: 'sentences',
        // autoCorrect: false,
      }} />
      {formIsInvalid && <Text style={styles.errorText}>Invalid input values - please check your entered values</Text>}
      
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
  errorText: {
    color: GlobalStyles.colors.error500,
    textAlign: 'center',
    margin: 8,
  },
});
