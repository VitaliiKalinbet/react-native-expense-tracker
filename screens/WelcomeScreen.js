import { useEffect, useState } from 'react';
import axios from 'axios';
import { StyleSheet, Text, View } from 'react-native';
import { AuthContext } from '../store/auth-context';
import { useContext } from 'react';

function WelcomeScreen() {
  const [message, setMessage] = useState('');
  const authContext = useContext(AuthContext);
  const token = authContext.token;

  useEffect(() => {
    axios.get(`https://expense-tracker-react-na-5a1fc-default-rtdb.firebaseio.com/message.json?auth=${token}`)
      .then(response => {
        console.log('response.data: ', response.data);
        setMessage(response.data);
      })
  }, [token]);

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Welcome!</Text>
      <Text>You authenticated successfully!</Text>
      <Text>{message}</Text>
    </View>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});
