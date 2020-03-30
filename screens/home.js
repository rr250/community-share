import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList, Modal,
  TouchableWithoutFeedback, Keyboard, AsyncStorage } from 'react-native';
import { globalStyles } from '../styles/global';
import Card from '../shared/card';

export default function Home({ navigation }) {
  const getToken = async () => {
    console.log(await AsyncStorage.getItem('LoggedInToken'));
  };

  getToken();

  findCoordinates = () => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const location = JSON.stringify(position);

        console.log(position);
      },
      error => Alert.alert(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  };

  findCoordinates();

  return (
    <View style={globalStyles.container}>
      <TouchableOpacity>
        <Card>
          <Text style={globalStyles.titleText}>
            Create a new Request
          </Text>
        </Card>
      </TouchableOpacity>
      <TouchableOpacity>
        <Card>
          <Text style={globalStyles.titleText}>
            Create a new Help
          </Text>
        </Card>
      </TouchableOpacity>
    </View>
  );
}