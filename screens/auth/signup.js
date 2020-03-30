import React, { useContext } from 'react';
import { StyleSheet, Button, TextInput, View, Text, AsyncStorage } from 'react-native';
import { globalStyles } from '../../styles/global.js';
import { Formik } from 'formik';
import * as yup from 'yup';
import FlatButton from '../../shared/button.js';
import { StackActions, NavigationActions } from 'react-navigation';
import { AuthContext } from '../../contexts/AuthContext.js';

const resetAction = StackActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: 'Home' })],
});

const requestSchema = yup.object({
  name: yup.string()
    .required()
    .min(3),
  email: yup.string()
    .required()
    .email(),
  address: yup.string()
    .required()
    .min(8)
});

export default function SignUp({ navigation }) {

  const { dispatch } = useContext(AuthContext);

  return (
    
    <View style={globalStyles.container}>
      <Formik
        initialValues={{ name: '', email: '', address:'',}}
        validationSchema={requestSchema}
        onSubmit={(values, actions) => {
          actions.resetForm(); 
          dispatch({ type: 'ADD_LOGIN_TOKEN', loggedInToken:'loggedIn'});
          navigation.dispatch(resetAction);
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

            <TextInput
              style={globalStyles.input}
              multiline minHeight={60}
              placeholder='Enter your Address'
              onChangeText={props.handleChange('address')}
              onBlur={props.handleBlur('address')}
              value={props.values.address}
            />
            <Text style={globalStyles.errorText}>{props.touched.address && props.errors.address}</Text>

            <TextInput 
              style={globalStyles.input}
              placeholder='Enter your Email'
              onChangeText={props.handleChange('email')}
              onBlur={props.handleBlur('email')} 
              value={props.values.email}
              keyboardType='email-address'
            />
            <Text style={globalStyles.errorText}>{props.touched.email && props.errors.email}</Text>

            <FlatButton onPress={props.handleSubmit} text='submit' />
          </View>
        )}
      </Formik>
    </View>
    
  );
}