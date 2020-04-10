import React, { createContext, useReducer, useEffect } from 'react';
import { authReducer } from '../reducers/authReducer';
import { AsyncStorage } from 'react-native';

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
  const [loggedInToken, dispatch] = useReducer(authReducer, null, async () => {
    const loggedInToken =  await getToken();
    return loggedInToken;
  });
  async function saveToken(token){
    await AsyncStorage.setItem('LoggedInToken', JSON.stringify(token));
  }

  async function getToken(){
    const storageLoggedInToken = await AsyncStorage.getItem('LoggedInToken');
    return storageLoggedInToken;
  }

  useEffect(() => {
    saveToken(loggedInToken).then();
  }, [loggedInToken]);
  return (
    <AuthContext.Provider value={{ loggedInToken, dispatch }}>
      {props.children}
    </AuthContext.Provider>
  );
}
 
export default AuthContextProvider;