import React from 'react';
import { StyleSheet, Button, TextInput, View, Text, Alert, Image } from 'react-native';
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
          <View style={{flex:1}}>
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
            <View style={styles.cogiv}>
              <Image source={require('../../assets/cogiv_logo_nowhite.png')} style={styles.cogivImage} />
              <Text style={styles.cogivText}>COGIV</Text>
            </View>
            <View style={styles.scaler}>
              <Image source={require('../../assets/scaler_logo.png')} style={styles.scalerImage} />
              <Text style={styles.scalerText}>Made By Scaler Academy</Text>
            </View>
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
    marginBottom:10
  },
  cogiv:{
    position: "relative",
    top: 40,
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 10,
    backgroundColor: '#c6f5ff',
    marginHorizontal:30
  },
  cogivImage: {
    width:'100%',
    width:200,
    height:200,
    alignSelf:"center",

  },
  cogivText:{
    textAlign: "center", 
    position: "relative",
    color: '#75b038',
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 10,
    textAlign: 'center',
    fontSize: 40,
  },
  scaler: {
    alignSelf: 'center',
    flexDirection: 'row',
    marginVertical: 10,
    marginHorizontal: 10,
    position: 'absolute',
    bottom:0
  },
  scalerImage: {
    width:'100%',
    bottom:0,
    width:25,
    height:25,
    marginHorizontal: 10
  },
  scalerText:{
    textAlign: "center", 
    color: '#808080',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20,
  }
})