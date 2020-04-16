import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList, Modal,
  TouchableWithoutFeedback, Keyboard, AsyncStorage } from 'react-native';
import { globalStyles } from '../../styles/global';
import Card from '../../shared/card';
import { AuthContext } from '../../contexts/AuthContext';
import API from '../../utils/api';
import PostForm from '.././post/postForm';
import { MaterialIcons } from '@expo/vector-icons';
import FlatButton from '../../shared/button';

export default function MyPosts({ navigation }) {

  const { loggedInToken, dispatch } = useContext(AuthContext);;

  const [pageNo, setPageNo] = useState(0);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    API.get('posts/me',{
      params:{
        pageNo:pageNo,
        pageSize:10,
      },
      headers:{
        Authorization:loggedInToken
      }
    })
    .then(res=>{
      console.log(res)
      setPosts(res.data)
      setPageNo(pageNo+1)
    })
    .catch((err)=>{
      console.log(err);
    })  
  }, [])

  const loadMore = () => {
    API.get('posts/me',{
      params:{
        pageNo:pageNo,
        pageSize:10,
      },
      headers:{
        Authorization:loggedInToken
      }
    })
    .then(res=>{
      console.log(res)
      setPosts((posts)=>{
        return [...posts, ...res.data]
      })
      setPageNo(pageNo+1)
    })
    .catch((err)=>{
      console.log(err);
    })  
  }
  
  return (
    <View style={globalStyles.container}>
      <FlatList data={posts} keyExtractor={(item, index) => item.postId} renderItem={({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate('MyPostDetails', { item: item, logInToken: loggedInToken })}>
          <Card>
            <Text style={globalStyles.titleText}>{ item.title }</Text>
          </Card>
        </TouchableOpacity>
      )} />
      { posts.length%10===0 && posts.length!==0 && <FlatButton onPress={loadMore} text='Load More' /> }
    </View>
  );
}

const styles = StyleSheet.create({
  modalToggle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#f2f2f2',
    padding: 10,
    borderRadius: 10,
    alignSelf: 'center',
  },
  modalClose: {
    marginTop: 20,
    marginBottom: 0,
  },
  modalContent: {
    flex: 1,
  }
});
