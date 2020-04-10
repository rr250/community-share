import React, { useContext } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { globalStyles } from '../../styles/global';
import FlatButton from '../../shared/button.js';
import { AuthContext } from '../../contexts/AuthContext.js';

export default function Profile() {
  const { dispatch } = useContext(AuthContext);

  const signout = () => {
    dispatch({ type: 'REMOVE_LOGIN_TOKEN', loggedInToken:null});
  }
  return (
    <View style={globalStyles.container}>
      <Text>About Screen</Text>
      <FlatButton onPress={signout} text='Sign Out' />
    </View>
  );
}