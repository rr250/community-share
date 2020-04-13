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
  const [modalOpen, setModalOpen] = useState(false);
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
  }, [modalOpen])

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
      <Modal visible={modalOpen} animationType='slide'>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.modalContent}>
            <MaterialIcons 
              name='close'
              size={24} 
              style={{...styles.modalToggle, ...styles.modalClose}} 
              onPress={() => setModalOpen(false)} 
            />
            <ProfileForm setModalOpen={setModalOpen} logInToken={loggedInToken}/>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <MaterialIcons 
        name='add' 
        size={24} 
        style={styles.modalToggle}
        onPress={() => setModalOpen(true)} 
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
  modalToggle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#f2f2f2',
    padding: 10,
    borderRadius: 10,
    alignSelf: 'center',
  },
  modalClose: {
    marginTop: 20,
    marginBottom: 0,
  },
  modalContent: {
    flex: 1,
  }
});
