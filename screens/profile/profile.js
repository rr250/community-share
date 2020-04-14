import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList, Modal,
  TouchableWithoutFeedback, Keyboard, AsyncStorage } from 'react-native';
import { globalStyles } from '../../styles/global';
import Card from '../../shared/card';
import { AuthContext } from '../../contexts/AuthContext';
import API from '../../utils/api';
import ProfileForm from '.././profile/profileForm';
import { MaterialIcons } from '@expo/vector-icons';
import FlatButton from '../../shared/button.js';

export default function Profile() {
  const { loggedInToken, dispatch } = useContext(AuthContext);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [user, setUser] = useState({
    detailsUpdated: true,
    homeLocation: {
      coordinates: [
        0
      ],
      type: "string",
      x: 0,
      y: 0
    },
    name: "string",
    phoneNumber: "string",
    userId: "string"
  });

  const [x, setX] = useState('12.9716');

  const [y, setY] = useState('77.5946');

  const findCoordinates = () => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const location = JSON.stringify(position);
        console.log(position);
        setX(position.coords.latitude);
        setY(position.coords.longitude);
      },
      error => Alert.alert(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  };

  useEffect(() => {
    findCoordinates();
  }, [])

  useEffect(() => {
    API.get('users/me',{
      headers:{
        Authorization:loggedInToken
      }
    })
    .then(res=>{
      console.log(res)
      setUser(res.data)
    })
    .catch((err)=>{
      console.log(err);
    })    
  }, [profileModalOpen])

  const signout = () => {
    API.post('auth/logout',{
      headers:{
        Authorization:loggedInToken
      }
    })
    .then(res=>{
      console.log(res)
    })
    .catch((error)=>{
      console.log(error.response);
    })
    dispatch({ type: 'REMOVE_LOGIN_TOKEN', loggedInToken:''});
  }
  return (
    <View style={globalStyles.container}>
      <Modal visible={profileModalOpen} animationType='slide'>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.profileModalContent}>
            <MaterialIcons 
              name='close'
              size={24} 
              style={{...styles.profileModalToggle, ...styles.profileModalClose}} 
              onPress={() => setProfileModalOpen(false)} 
            />
            <ProfileForm setProfileModalOpen={setProfileModalOpen} logInToken={loggedInToken} x={x} y={y}/>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <MaterialIcons 
        name='add' 
        size={24} 
        style={styles.profileModalToggle}
        onPress={() => setProfileModalOpen(true)} 
      />

      <Card>
        <Text style={globalStyles.titleText}>
          { user.name }
        </Text>
        <Text>{ user.phoneNumber }</Text>
      </Card>
      <FlatButton onPress={signout} text='Sign Out' />
    </View>
  );
}

const styles = StyleSheet.create({
  profileModalToggle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#f2f2f2',
    padding: 10,
    borderRadius: 10,
    alignSelf: 'center',
  },
  profileModalClose: {
    marginTop: 20,
    marginBottom: 0,
  },
  profileModalContent: {
    flex: 1,
  }
});
