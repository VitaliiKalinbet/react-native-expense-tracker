import { View, Text, StyleSheet } from 'react-native';

export default function RecentExpenses() {
  return (
    <View style={styles.container}>
      <Text>Recent Expenses</Text>
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
