import React, { useState } from 'react';
import { StyleSheet, Button, TextInput, View, Text } from 'react-native';
import { globalStyles } from '../../styles/global.js';
import { Formik } from 'formik';
import * as yup from 'yup';
import FlatButton from '../../shared/button.js';
import API from '../../utils/api.js';

const requestSchema = yup.object({
  name: yup.string()
    .required()
    .min(3)
});

export default function ProfileForm({ setModalOpen}) {

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

  findCoordinates();

  return (
    
    <View style={globalStyles.container}>
      <Formik
        initialValues={{ name: ''}}
        validationSchema={requestSchema}
        onSubmit={(values, actions) => {
          API.put('users',{
            homeLocation:{
              x:12,
              y:77
            },
            name:values.name
          },
          {
            headers: { 
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJjYjAwNzU0OS1jMDk1LTQ1M2UtOGQ1ZC04YjQ5YzBlNzE2NjYiLCJpYXQiOjE1ODY2MzgyNDUsInN1YiI6Ijk4MjA5NjAxNDIiLCJpc3MiOiJTY2FsZXIiLCJleHAiOjE1ODkyMzAyNDV9.mqtDxKS89k_6yFNJ9Y9ZbIHiYPeHAyEJtN9RT7oT3bs'
            }
          })
          .then(res=>{
            console.log(res);
            setModalOpen(false)
          })
          .catch((err)=>{
            console.log(err);
          })
          actions.resetForm(); 
        }}
      >
        {props => (
          <View>
            <TextInput
              style={globalStyles.input}
              placeholder='Enter your Name'
              onChangeText={props.handleChange('name')}
              onBlur={props.handleBlur('name')} 
              value={props.values.name}
            />
            {/* only if the left value is a valid string, will the right value be displayed */}
            <Text style={globalStyles.errorText}>{props.touched.name && props.errors.name}</Text>

            <FlatButton onPress={props.handleSubmit} text='submit' />
          </View>
        )}
      </Formik>
    </View>
    
  );
}