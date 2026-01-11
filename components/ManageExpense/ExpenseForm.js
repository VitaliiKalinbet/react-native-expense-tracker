import { View, TextInput, StyleSheet } from 'react-native';
import Input from './Input';
import { GlobalStyles } from '../../constants/styles';

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
      <Input label="Amount" textInputConfig={{
        keyboardType: 'decimal-pad',
        onChangeText: amountChangeHandler,
      }} />
      <Input label="Date" textInputConfig={{
        placeholder: 'YYYY-MM-DD',
        maxLength: 10,
        keyboardType: 'datetime-local',
        onChangeText: dateChangeHandler,
      }} />
      <Input label="Description" textInputConfig={{
        onChangeText: descriptionChangeHandler,
        multiline: true,
        autoCapitalize: 'sentences',
        // autoCorrect: false,
      }} />
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    marginTop: 40,
  },
});
