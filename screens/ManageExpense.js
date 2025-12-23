import { View, Text, StyleSheet } from 'react-native';

export default function ManageExpense() {
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
