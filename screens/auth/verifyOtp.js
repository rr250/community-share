import React, { useContext } from 'react';
import { StyleSheet, Button, TextInput, View, Text, Alert } from 'react-native';
import { globalStyles } from '../../styles/global.js';
import { Formik } from 'formik';
import * as yup from 'yup';
import FlatButton from '../../shared/button.js';
import API from '../../utils/api.js';
import { AuthContext } from '../../contexts/AuthContext.js';

const requestSchema = yup.object({
  otp: yup.string()
    .required()
    .min(6)
    .max(6),
});

export default function VerifyOtp({ navigation }) {

  const { dispatch } = useContext(AuthContext);

  return (
    
    <View style={globalStyles.container}>
      <Formik
        initialValues={{ otp: '',}}
        validationSchema={requestSchema}
        onSubmit={(values, actions) => {
          actions.resetForm(); 
          API.post('auth/login/verify',{
            requestId:navigation.getParam('requestId'),
            otpCode:values.otp
          })
          .then(res=>{
            console.log(res);
            if(res.data.detailsUpdated===false){
              navigation.navigate('SignUp',{token:res.data.token})
            }
            else{
              const authToken = "Bearer "+res.data.token;
              dispatch({ type: 'ADD_LOGIN_TOKEN', loggedInToken:authToken});
            }
          })
          .catch((error)=>{
            const message = error.response.data.message?error.response.data.message:null;
            const statusText = error.response.statusText;
            Alert.alert('Error occurred', message && message!==undefined ? message : statusText!==undefined ? statusText : 'Wrong Input or Server is Down')
          })
          actions.resetForm();    
        }}
      >
        {props => (
          <View>
            <TextInput
              style={globalStyles.input}
              placeholder='Enter the otp'
              onChangeText={props.handleChange('otp')}
              onBlur={props.handleBlur('otp')} 
              value={props.values.otp}
              keyboardType='numeric'
            />
            {/* only if the left value is a valid string, will the right value be displayed */}
            <Text style={globalStyles.errorText}>{props.touched.otp && props.errors.otp}</Text>

            <FlatButton onPress={props.handleSubmit} text='submit' />
          </View>
        )}
      </Formik>
    </View>
    
  );
}