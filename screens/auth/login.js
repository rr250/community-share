import React from 'react';
import { StyleSheet, Button, TextInput, View, Text, Alert } from 'react-native';
import { globalStyles } from '../../styles/global.js';
import { Formik } from 'formik';
import * as yup from 'yup';
import FlatButton from '../../shared/button.js';
import API from '../../utils/api.js';

const requestSchema = yup.object({
  phoneNumber: yup.number()
    .required()
    .min(1000000000)
    .max(9999999999),
});

export default function Login({ navigation }) {

  return (
    
    <View style={globalStyles.container}>
      <Formik
        initialValues={{ phoneNumber: '',}}
        validationSchema={requestSchema}
        onSubmit={(values, actions) => {
          API.post('auth/login',{
            otpLength:6,
            phoneNumber:'+91'+values.phoneNumber
          })
          .then(res=>{
            console.log(res)
            navigation.navigate('VerifyOtp', {requestId:res.data.requestId})
          })
          .catch((error)=>{
            console.log(error.response)
            const message = error.response.data.message?error.response.data.message:null;
            const statusText = error.response.statusText;
            Alert.alert('Error occurred', message && message!==undefined ? message : statusText!==undefined ? statusText : 'Wrong Input or Server is Down')
          })
          actions.resetForm();           
        }}
      >
        {props => (
          <View>
            <View style={styles.login}>
              <TextInput
                style={{...globalStyles.input,width:'15%'}}
                value={'+91'}
              />
              <TextInput
                style={{...globalStyles.input,width:'80%'}}
                placeholder='Enter your Phone Number'
                onChangeText={props.handleChange('phoneNumber')}
                onBlur={props.handleBlur('phoneNumber')} 
                value={props.values.phoneNumber}
                keyboardType='numeric'
              />
              {/* only if the left value is a valid string, will the right value be displayed */}
            </View>
            <Text style={globalStyles.errorText}>{props.touched.phoneNumber && props.errors.phoneNumber}</Text>
            <FlatButton onPress={props.handleSubmit} text='submit' />
          
          </View>
        )}
      </Formik>
    </View>
    
  );
}

const styles = StyleSheet.create({
  login: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom:35
  }
})