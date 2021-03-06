import React, { createContext, useReducer, useEffect } from 'react';
import { authReducer } from '../reducers/authReducer';
import { AsyncStorage } from 'react-native';

export const AuthContext = createContext();

const AuthContextProvider = (props) => {

  const [loggedInToken, dispatch] = useReducer(authReducer,'');

  useEffect(() => {
    AsyncStorage.getItem('LoggedInToken').then((loggedInToken)=>{
      console.log('tok'+loggedInToken)
      dispatch({ type: 'ADD_LOGIN_TOKEN', loggedInToken: JSON.parse(loggedInToken) })
    });
  }, [])

  return (
    <AuthContext.Provider value={{ loggedInToken, dispatch }}>
      {props.children}
    </AuthContext.Provider>
  );
}
 
export default AuthContextProvider;