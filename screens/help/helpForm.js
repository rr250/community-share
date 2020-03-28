import React from 'react';
import { StyleSheet, Button, TextInput, View, Text } from 'react-native';
import { globalStyles } from '../../styles/global.js';
import { Formik } from 'formik';
import * as yup from 'yup';
import FlatButton from '../../shared/button.js';

const helpSchema = yup.object({
  helpTitle: yup.string()
    .required()
    .min(4),
  helpBody: yup.string()
    .required()
    .min(8),
});

export default function HelpForm({ addHelp }) {

  return (
    
    <View style={globalStyles.container}>
      <Formik
        initialValues={{ helpTitle: '', helpBody: '', rating: '' }}
        validationSchema={helpSchema}
        onSubmit={(values, actions) => {
          actions.resetForm(); 
          addHelp(values);
        }}
      >
        {props => (
          <View>
            <TextInput
              style={globalStyles.input}
              placeholder='Help helpTitle'
              onChangeText={props.handleChange('helpTitle')}
              onBlur={props.handleBlur('helpTitle')} 
              value={props.values.helpTitle}
            />
            {/* only if the left value is a valid string, will the right value be displayed */}
            <Text style={globalStyles.errorText}>{props.touched.helpTitle && props.errors.helpTitle}</Text>

            <TextInput
              style={globalStyles.input}
              multiline minHeight={60}
              placeholder='Help details'
              onChangeText={props.handleChange('helpBody')}
              onBlur={props.handleBlur('helpBody')}
              value={props.values.helpBody}
            />
            <Text style={globalStyles.errorText}>{props.touched.helpBody && props.errors.helpBody}</Text>            
            <FlatButton onPress={props.handleSubmit} text='submit' />
          </View>
        )}
      </Formik>
    </View>
    
  );
}