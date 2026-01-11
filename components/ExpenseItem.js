import { View, Text, StyleSheet, Pressable } from 'react-native';
import { GlobalStyles } from '../constants/styles';
import { getFormattedDate } from '../util/date';
import { useNavigation } from '@react-navigation/native';

export default function ExpenseItem({ description, amount, date, id }) {
  const navigation = useNavigation();
  
  function expenseItemPressHandler() {
    navigation.navigate('ManageExpense', {
      expenseId: id,
    });
  }

  const formattedDate = getFormattedDate(date);

  return (
    <Pressable
      style={({ pressed }) => [pressed && styles.pressed]}
      onPress={expenseItemPressHandler}
    >
      <View style={styles.expenseItem}>
        <View>
          <Text style={[styles.textBase, styles.description]}>{description}</Text>
          <Text style={styles.textBase}>{formattedDate}</Text>
        </View>
        <View style={styles.amountContainer}>
          <Text style={styles.amount}>${amount.toFixed(2)}</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  expenseItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  pressed: {
    opacity: 0.75,
  },
});
