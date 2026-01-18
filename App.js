import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import AllExpenses from './screens/AllExpenses';
// import ManageExpense from './screens/ManageExpense';
// import RecentExpenses from './screens/RecentExpenses';
import AppLoading from 'expo-app-loading';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import AuthContextProvider from './store/auth-context';
import { AuthContext } from './store/auth-context';
import { GlobalStyles } from './constants/styles';
import IconButton from './components/ui/IconButton';
// import { Ionicons } from '@expo/vector-icons';
// import IconButton from './components/ui/IconButton';
// import ExpensesContextProvider from './store/expenses-context';

const Stack = createNativeStackNavigator();
// const BottomTabs = createBottomTabNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: GlobalStyles.colors.primary100 },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}

function AuthenticatedStack() {
  const authContext = useContext(AuthContext);

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: GlobalStyles.colors.primary100 },
      }}
    >
      <Stack.Screen name="Welcome" component={WelcomeScreen} options={{
        headerRight: ({ tintColor }) => (
          <IconButton
            icon="exit"
            size={24}
            color={tintColor}
            onPress={authContext.logout}
          />
        ),
      }} />
    </Stack.Navigator>
  );
}

function Navigation() {
  const authContext = useContext(AuthContext);

  return (
      <NavigationContainer>
        {authContext.isAuthenticated ? <AuthenticatedStack /> : <AuthStack />}
      </NavigationContainer>
  );
}

// function ExpensesOverview() {
//   return (
//     <BottomTabs.Navigator
//       screenOptions={({ navigation }) => ({
//         headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
//         headerTintColor: 'white',
//         tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500 },
//         tabBarActiveTintColor: GlobalStyles.colors.accent500,
//         tabBarInactiveTintColor: 'white',
//         headerRight: ({ tintColor }) => (
//           <IconButton
//             icon="add"
//             size={24}
//             color={tintColor}
//             onPress={() => { navigation.navigate('ManageExpense'); }}
//           />
//         ),
//       })}
//     >
//       <BottomTabs.Screen
//         name="RecentExpenses"
//         component={RecentExpenses}
//         options={{
//           title: 'Recent Expenses',
//           tabBarLabel: 'Recent',
//           tabBarIcon: ({ color, size }) => (
//             <Ionicons name="time-outline" color={color} size={size} />
//           ),
//         }}
//       />
//       <BottomTabs.Screen
//         name="AllExpenses"
//         component={AllExpenses}
//         options={{
//           title: 'All Expenses',
//           tabBarLabel: 'All',
//           tabBarIcon: ({ color, size }) => (
//             <Ionicons name="calendar" color={color} size={size} />
//           ),
//         }}
//       />
//     </BottomTabs.Navigator>
//   );
// }

function Root() {
  const [isLoading, setIsLoading] = useState(true);
  const authContext = useContext(AuthContext);

  useEffect(() => {
    async function fetchToken() {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        authContext.authenticate(token);
      }
      setIsLoading(false);
    }
    fetchToken();
  }, []);

  if (isLoading) {
    return <AppLoading />;
  }

  return (<Navigation />);
}

export default function App() { 
  return (
    <>
      <StatusBar style="light" />

      <AuthContextProvider>
        <Root />
      </AuthContextProvider>

      {/* <ExpensesContextProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="ExpensesOverview"
            screenOptions={{
              headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
              headerTintColor: 'white',
            }}
          >
            <Stack.Screen
              name="ExpensesOverview"
              options={{ headerShown: false }}
              component={ExpensesOverview}
            />
            <Stack.Screen
              name="ManageExpense"
              component={ManageExpense}
              options={{
                presentation: 'modal',
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ExpensesContextProvider> */}
    </>
  );
}
