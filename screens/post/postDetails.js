import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { globalStyles, images } from '../../styles/global';
import Card from '../../shared/card';
import { Formik } from 'formik';
import * as yup from 'yup';
import FlatButton from '../../shared/button.js';
import API from '../../utils/api.js';

const requestSchema = yup.object({
  message: yup.string()
    .required()
    .min(4),
});

export default function PostDetails({ navigation }) {
 
  return (
    <View style={globalStyles.container}>
      <Card>
        <Text style={globalStyles.titleText}>
          { navigation.getParam('title') }
        </Text>
        <Text>{ navigation.getParam('description') }</Text>
        <Text>{ navigation.getParam('locationDisplayName') }</Text>
      </Card>
      <Formik
        initialValues={{ phoneNumber: '',}}
        validationSchema={requestSchema}
        onSubmit={(values, actions) => {
          API.post('help-offers',{
            postId: navigation.getParam('postId'),
            message:values.message
          })
          .then(res=>{
            console.log(res)
            navigation.navigate('VerifyOtp', {requestId:res.data.requestId})
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
              placeholder='To help send a message'
              onChangeText={props.handleChange('message')}
              onBlur={props.handleBlur('message')} 
              value={props.values.message}
            />
            {/* only if the left value is a valid string, will the right value be displayed */}
            <Text style={globalStyles.errorText}>{props.touched.message && props.errors.message}</Text>

            <FlatButton onPress={props.handleSubmit} text='submit' />
          </View>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  rating: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 16,
    marginTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  }
});