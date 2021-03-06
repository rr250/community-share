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
      type: "",
      x: 0,
      y: 0
    },
    name: "",
    phoneNumber: "",
    userId: ""
  });

  const [x, setX] = useState('77.5946');
  const [y, setY] = useState('12.9716');

  const findCoordinates = () => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const location = JSON.stringify(position);
        console.log(position);
        setX(position.coords.longitude);
        setY(position.coords.latitude);
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
    API.post('auth/logout',{},{
      headers:{
        Authorization:loggedInToken
      }
    })
    .then(res=>{
      console.log(res)
      dispatch({ type: 'REMOVE_LOGIN_TOKEN', loggedInToken:''});
    })
    .catch((error)=>{
      console.log(error.response)
      if(error.response.status===401){
        Alert.alert('Session Expired', 'Login Again');
        dispatch({ type: 'REMOVE_LOGIN_TOKEN', loggedInToken:''});
      }
      else{
        const message = error.response.data.message?error.response.data.message:null;
        const statusText = error.response.statusText;
        Alert.alert('Error occurred', message && message!==undefined ? message : statusText!==undefined ? statusText : 'Wrong Input or Server is Down')
      }
    }) 
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
        name='edit' 
        size={24} 
        style={styles.profileModalToggle}
        onPress={() => setProfileModalOpen(true)} 
      > EDIT PROFILE</MaterialIcons>

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
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
  },
  profileModalClose: {
    marginTop: 20,
    marginBottom: 0,
  },
  profileModalContent: {
    flex: 1,
  }
});
