import React, { createContext, useReducer, useEffect } from 'react';
import { authReducer } from '../reducers/authReducer';
import { AsyncStorage } from 'react-native';

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
  const [loggedInToken, dispatch] = useReducer(authReducer, null, () => {
    const storageLoggedInToken =AsyncStorage.getItem('loggedInToken')
    return loggedInToken ? storageLoggedInToken : null;
  });
  async function saveToken(token){
    await AsyncStorage.setItem('LoggedInToken', token);
    console.log(await AsyncStorage.getItem('LoggedInToken'));
  }
  useEffect(() => {
    saveToken(loggedInToken);
  }, [loggedInToken]);
  return (
    <AuthContext.Provider value={{ loggedInToken, dispatch }}>
      {props.children}
    </AuthContext.Provider>
  );
}
 
export default AuthContextProvider;