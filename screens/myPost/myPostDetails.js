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

  // useEffect(()=>{
  //   AsyncStorage.getItem('LoggedInToken').then((token)=>{
  //     setLogInToken(token.slice(1,logInToken.length-1));
  //   })
  // },[])

  const item = navigation.getParam('item');

  setLogInToken(navigation.getParam('logInToken'))

  useEffect(() => {
    if(logInToken!==null && logInToken!==''){
      console.log(logInToken)
      const postId=navigation.getParam('postId');
      API.get('posts/'+postId+'/help-offers',{
        params:{
          postId:postId
        },
        headers:{
          Authorization:logInToken
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
          { item.title }
        </Text>
        <Text>{ item.description }</Text>
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