import React from 'react';
import { TextInput, View, Text, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { globalStyles } from '../../styles/global.js';
import { Formik } from 'formik';
import * as yup from 'yup';
import FlatButton from '../../shared/button.js';
import API from '../../utils/api.js';

const requestSchema = yup.object({
  name: yup.string()
    .required()
    .min(3),
});

export default function ProfileForm({ setProfileModalOpen, logInToken, x, y}) {

  return (
    
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={globalStyles.container}>
        <Formik
          initialValues={{ name: ''}}
          validationSchema={requestSchema}
          onSubmit={(values, actions) => {
            console.log(x,y)
            API.put('users',{
              homeLocation:{
                x:x,
                y:y
              },
              name:values.name
            },
            {
              headers: { 
                Authorization: logInToken
              }
            })
            .then(res=>{
              console.log(res);
              setProfileModalOpen(false)
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
                placeholder='Enter your Name'
                onChangeText={props.handleChange('name')}
                onBlur={props.handleBlur('name')} 
                value={props.values.name}
              />
              {/* only if the left value is a valid string, will the right value be displayed */}
              <Text style={globalStyles.errorText}>{props.touched.name && props.errors.name}</Text>

              <FlatButton onPress={props.handleSubmit} text='submit' />
            </View>
          )}
        </Formik>
      </View>
    </TouchableWithoutFeedback>
    
  );
}