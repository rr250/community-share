import React from 'react';
import { StyleSheet, View, Text, TextInput, Alert } from 'react-native';
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

  const item = navigation.getParam('item');
  const logInToken=navigation.getParam('logInToken');
 
  return (
    <View style={globalStyles.container}>
      <Card>
        <Text style={globalStyles.titleText}>
          { item.title }
        </Text>
        <Text>{ item.description }</Text>
        <Text>{ item.locationDisplayName }</Text>
      </Card>
      <Formik
        initialValues={{ message: '',}}
        validationSchema={requestSchema}
        onSubmit={(values, actions) => {
          API.post('help-offers',{
            postId: item.postId,
            message:values.message
          },
          {
            headers: { 
              Authorization: logInToken
            }
          }
          )
          .then(res=>{
            console.log(res)
          })
          .catch((error)=>{
            console.log(error.response)
            if(error.response.status===401){
              Alert.alert('Session Expired', 'Login Again');
              dispatch({ type: 'REMOVE_LOGIN_TOKEN', loggedInToken:''});
            }
            else{
              const message = error.response.data.message?error.response.data.message:null;
              const statusText = error.response.statusText;
              Alert.alert('Error occurred', message && message!==undefined ? message : statusText!==undefined ? statusText : 'Wrong Input or Server is Down')
            }
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