import React from 'react';
import { StyleSheet, Button, TextInput, View, Text } from 'react-native';
import { globalStyles } from '../../styles/global.js';
import { Formik } from 'formik';
import * as yup from 'yup';
import FlatButton from '../../shared/button.js';

const requestSchema = yup.object({
  otp: yup.string()
    .required()
    .min(6)
    .max(6),
});

export default function VerifyOtp({ navigation }) {

  return (
    
    <View style={globalStyles.container}>
      <Formik
        initialValues={{ otp: '',}}
        validationSchema={requestSchema}
        onSubmit={(values, actions) => {
          actions.resetForm(); 
          navigation.navigate('SignUp')
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