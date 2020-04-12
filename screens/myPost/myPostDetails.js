import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, View, Text, Image, FlatList, TouchableOpacity, AsyncStorage } from 'react-native';
import { globalStyles, images } from '../../styles/global';
import Card from '../../shared/card';
import API from '../../utils/api';

export default function MyPostDetails({ navigation }) {

  const [logInToken, setLogInToken] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [pageNo, setPageNo] = useState(0);
  const [helps, setHelps] = useState([]);

  useEffect(()=>{
    AsyncStorage.getItem('LoggedInToken').then((token)=>{
      setLogInToken(token);
    })
  },[])

  useEffect(() => {
    if(logInToken!==null && logInToken!==''){
      console.log(logInToken)
      const postId=navigation.getParam('postId');
      API.get('posts/'+postId+'/help-offers',{
        params:{
          postId:postId
        },
        headers:{
          Authorization:'Bearer eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJjYjAwNzU0OS1jMDk1LTQ1M2UtOGQ1ZC04YjQ5YzBlNzE2NjYiLCJpYXQiOjE1ODY2MzgyNDUsInN1YiI6Ijk4MjA5NjAxNDIiLCJpc3MiOiJTY2FsZXIiLCJleHAiOjE1ODkyMzAyNDV9.mqtDxKS89k_6yFNJ9Y9ZbIHiYPeHAyEJtN9RT7oT3bs'
        }
      })
      .then(res=>{
        console.log(res)
        setHelps(res.data)
      })
      .catch((err)=>{
        console.log(err);
      })
    }    
  }, [logInToken])

  
  return (
    <View style={globalStyles.container}>
      <Card>
        <Text style={globalStyles.titleText}>
          { navigation.getParam('title') }
        </Text>
        <Text>{ navigation.getParam('description') }</Text>
      </Card>

      <FlatList data={helps} keyExtractor={(item, index) => item.helpId} renderItem={({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate('MyPostDetails', item)}>
          <Card>
            <Text style={globalStyles.titleText}>{ item.message }</Text>
          </Card>
        </TouchableOpacity>
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