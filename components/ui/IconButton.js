import { Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, StyleSheet } from 'react-native';
import { GlobalStyles } from '../../constants/styles';

export default function IconButton({ icon, size, color, onPress, children = null }) {
  return (
    <Pressable
      style={({ pressed }) => [styles.buttonContainer, pressed && styles.pressed]}
      onPress={onPress}
    >
      <View style={styles.buttonContainer}>
        <Ionicons name={icon} size={size} color={color} />
        <Text style={styles.buttonText}>{children}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    marginHorizontal: 8,
    marginVertical: 2,
  },
  pressed: {
    opacity: 0.75,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});
