import { View, Text, StyleSheet, Pressable } from 'react-native';
import { GlobalStyles } from '../constants/styles';

export default function ExpenseItem({ description, amount, date }) {
  function onPress() {
    console.log('ExpenseItem pressed');
  }

  const formattedDate = date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <Pressable onPress={onPress}>
      <View style={styles.expenseItem}>
        <View>
          <Text style={[styles.textBase, styles.description]}>{description}</Text>
          <Text style={styles.textBase}>{formattedDate}</Text>
        </View>
        <View style={styles.amountContainer}>
          <Text style={styles.amount}>${amount}</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  expenseItem: {
    padding: 16,
    marginVertical: 8,
    borderRadius: 6,
    backgroundColor: GlobalStyles.colors.primary500,
    elevation: 4,
    shadowColor: GlobalStyles.colors.gray500,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  textBase: {
    color: GlobalStyles.colors.primary50,
  },
  amountContainer: {
    padding: 16,
    backgroundColor: GlobalStyles.colors.primary50,
    borderRadius: 6,
  },
  description: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: 'bold',
  },
  amountContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: GlobalStyles.colors.primary50,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 80,
  },
  amount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: GlobalStyles.colors.primary500,
  },
});
