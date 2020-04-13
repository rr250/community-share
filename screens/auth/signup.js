import React, { useContext, useState } from 'react';
import { StyleSheet, Button, TextInput, View, Text, AsyncStorage } from 'react-native';
import { globalStyles } from '../../styles/global.js';
import { Formik } from 'formik';
import * as yup from 'yup';
import FlatButton from '../../shared/button.js';
import { StackActions, NavigationActions } from 'react-navigation';
import { AuthContext } from '../../contexts/AuthContext.js';
import API, { baseURL } from '../../utils/api.js';
import Axios from "axios";

const requestSchema = yup.object({
  name: yup.string()
    .required()
    .min(3)
});

export default function SignUp({ navigation }) {

  const [x, setX] = useState('12.9716');

  const [y, setY] = useState('77.5946');

  const { dispatch } = useContext(AuthContext);

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
          console.log("Bearer "+navigation.getParam('token'));
          const authToken = "Bearer "+navigation.getParam('token');
          console.log('Bearer ${authToken}');
          Axios.put(baseURL+'users',{
            homeLocation:{
              x:12.9716,
              y:77.5946
            },
            name:values.name
          },
          {
            headers: { Authorization: authToken }
          })
          .then(res=>{
            console.log(res);
            dispatch({ type: 'ADD_LOGIN_TOKEN', loggedInToken:authToken});
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