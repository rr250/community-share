import React, { useState, useContext } from 'react';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import Navigator from './routes/drawer';
import AuthNavigator from './routes/authStack'
import AuthContextProvider, { AuthContext } from './contexts/AuthContext';

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

  const { loggedInToken } = useContext(AuthContext)

  const isLoggedIn = loggedInToken==='loggedIn'?true:false;

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