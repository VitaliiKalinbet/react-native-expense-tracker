import { createContext, useReducer, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext({
  token: '',
  isAuthenticated: false,
  authenticate: (token) => {},
  logout: () => {},
});

function authReducer(state, action) {
  switch (action.type) {
    case 'SIGNUP':
      return { token: action.payload, isAuthenticated: true };
    case 'LOGIN':
      return { token: action.payload, isAuthenticated: true };
    case 'LOGOUT':
      return { token: null, isAuthenticated: false };
  }
}

function AuthContextProvider({ children }) {
  const [authState, dispatch] = useReducer(authReducer, { token: null, isAuthenticated: false });

  function authenticate(token) {
    dispatch({ type: 'SIGNUP', payload: token });
    AsyncStorage.setItem('token', token);
  }

  function logout() {
    dispatch({ type: 'LOGOUT' });
    AsyncStorage.removeItem('token');
  }

  const value = {
    token: authState.token,
    isAuthenticated: authState.isAuthenticated,
    authenticate: authenticate,
    logout: logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
