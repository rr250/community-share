import React, { useState, useContext, useEffect } from 'react';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import Navigator from './routes/drawer';
import AuthNavigator from './routes/authStack'
import AuthContextProvider, { AuthContext } from './contexts/AuthContext';
import { AsyncStorage } from 'react-native';

const getFonts = () => Font.loadAsync({
  'nunito-regular': require('./assets/fonts/Nunito-Regular.ttf'),
  'nunito-bold': require('./assets/fonts/Nunito-Bold.ttf'),
});

export default function AppWrapper() {
  return (
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  );
}

export function App() {

  const { loggedInToken, dispatch } = useContext(AuthContext)
  const [logInToken, setLogInToken] = useState('');
  // useEffect(() => {
  //   //dispatch({ type: 'GET_LOGIN_TOKEN' });
  //   AsyncStorage.getItem('LoggedInToken').then((token)=>{
  //     setLogInToken(token);
  //   })
  // }, []);

  //console.log(logInToken);

  console.log('App'+loggedInToken);

  const isLoggedIn = loggedInToken===null || loggedInToken==='' || loggedInToken === undefined?false:true;

  const [fontsLoaded, setFontsLoaded] = useState(false);

  if (fontsLoaded) {
    if(isLoggedIn){
      return (
        <Navigator />
      );
    }
    else{
      return (
        <AuthNavigator />
      );
    }

  } else {
    return (
      <AppLoading 
        startAsync={getFonts} 
        onFinish={() => setFontsLoaded(true)} 
      />
    )
  }

}