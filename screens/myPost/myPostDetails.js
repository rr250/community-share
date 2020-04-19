import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, View, Text, Image, FlatList, Alert, TouchableOpacity, AsyncStorage } from 'react-native';
import { globalStyles, images } from '../../styles/global';
import Card from '../../shared/card';
import API from '../../utils/api';

export default function MyPostDetails({ navigation }) {

  const [logInToken, setLogInToken] = useState('');
  const [helps, setHelps] = useState([]);

  const item = navigation.getParam('item');

  if(logInToken==='')
    setLogInToken(navigation.getParam('logInToken'));

  useEffect(() => {
    if(logInToken!==null && logInToken!==''){
      console.log(logInToken)
      const postId=navigation.getParam('postId');
      API.get('posts/'+item.postId+'/help-offers',{
        params:{
          postId:item.postId
        },
        headers:{
          Authorization:logInToken
        }
      })
      .then(res=>{
        console.log(res)
        setHelps(res.data)
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
    }    
  }, [logInToken])

  
  return (
    <View style={globalStyles.container}>
      <Card>
        <Text style={globalStyles.titleText}>
          { item.title }
        </Text>
        <Text>{ item.description }</Text>
      </Card>

      <FlatList data={helps} keyExtractor={(item, index) => item.helpId} renderItem={({ item }) => (
        <Card>
          <Text style={globalStyles.titleText}>{ item.message }</Text>
        </Card>
      )} />
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