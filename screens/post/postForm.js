import React from 'react';
import { StyleSheet, Button, TextInput, View, Text } from 'react-native';
import { globalStyles } from '../../styles/global.js';
import { Formik } from 'formik';
import * as yup from 'yup';
import FlatButton from '../../shared/button.js';
import API from '../../utils/api.js';

const requestSchema = yup.object({
  description: yup.string()
    .required()
    .min(6),
  locationDisplayName: yup.string()
    .required()
    .min(3),
  title: yup.string()
    .required()
});

export default function PostForm({ setModalOpen, logInToken}) {

  return (
    
    <View style={globalStyles.container}>
      <Formik
        initialValues={{ description: '', locationDisplayName: '', title: ''}}
        validationSchema={requestSchema}
        onSubmit={(values, actions) => {
          API.post('posts',{
            description: values.description,
            fullAddress: "string",
            geoHash: "string",
            latitude: 12,
            locationDisplayName: values.locationDisplayName,
            longitude: 77,
            title: values.title,
            willingToPay: true
          },
          {
          headers: { 
            Authorization: logInToken
          }
          })
          .then(res=>{
            console.log(res)
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
              placeholder='What do you need?'
              onChangeText={props.handleChange('title')}
              onBlur={props.handleBlur('title')} 
              value={props.title}
            />
            {/* only if the left value is a valid string, will the right value be displayed */}
            <Text style={globalStyles.errorText}>{props.touched.title && props.errors.title}</Text>

            <TextInput
              style={globalStyles.input}
              placeholder='Description and Quantity'
              onChangeText={props.handleChange('description')}
              onBlur={props.handleBlur('description')} 
              value={props.description}
            />
            {/* only if the left value is a valid string, will the right value be displayed */}
            <Text style={globalStyles.errorText}>{props.touched.description && props.errors.description}</Text>

            <TextInput
              style={globalStyles.input}
              placeholder='Area e.g. Kormangala, Bengaluru'
              onChangeText={props.handleChange('locationDisplayName')}
              onBlur={props.handleBlur('locationDisplayName')} 
              value={props.locationDisplayName}
            />
            {/* only if the left value is a valid string, will the right value be displayed */}
            <Text style={globalStyles.errorText}>{props.touched.locationDisplayName && props.errors.locationDisplayName}</Text>

            <FlatButton onPress={props.handleSubmit} text='submit' />
          </View>
        )}
      </Formik>
    </View>
    
  );
}