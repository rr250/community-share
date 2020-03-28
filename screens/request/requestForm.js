import React from 'react';
import { StyleSheet, Button, TextInput, View, Text } from 'react-native';
import { globalStyles } from '../../styles/global.js';
import { Formik } from 'formik';
import * as yup from 'yup';
import FlatButton from '../../shared/button.js';

const requestSchema = yup.object({
  requestTitle: yup.string()
    .required()
    .min(4),
  requestBody: yup.string()
    .required()
    .min(8),
});

export default function RequestForm({ addRequest }) {

  return (
    
    <View style={globalStyles.container}>
      <Formik
        initialValues={{ requestTitle: '', requestBody: '', rating: '' }}
        validationSchema={requestSchema}
        onSubmit={(values, actions) => {
          actions.resetForm(); 
          addRequest(values);
        }}
      >
        {props => (
          <View>
            <TextInput
              style={globalStyles.input}
              placeholder='Request requestTitle'
              onChangeText={props.handleChange('requestTitle')}
              onBlur={props.handleBlur('requestTitle')} 
              value={props.values.requestTitle}
            />
            {/* only if the left value is a valid string, will the right value be displayed */}
            <Text style={globalStyles.errorText}>{props.touched.requestTitle && props.errors.requestTitle}</Text>

            <TextInput
              style={globalStyles.input}
              multiline minHeight={60}
              placeholder='Request details'
              onChangeText={props.handleChange('requestBody')}
              onBlur={props.handleBlur('requestBody')}
              value={props.values.requestBody}
            />
            <Text style={globalStyles.errorText}>{props.touched.requestBody && props.errors.requestBody}</Text>            
            <FlatButton onPress={props.handleSubmit} text='submit' />
          </View>
        )}
      </Formik>
    </View>
    
  );
}