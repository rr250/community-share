import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList, Modal,
  TouchableWithoutFeedback, Keyboard, AsyncStorage } from 'react-native';
import { globalStyles } from '../styles/global';
import Card from '../shared/card';
import { AuthContext } from '../contexts/AuthContext';
import API from '../utils/api';
import PostForm from './post/postForm';
import { MaterialIcons } from '@expo/vector-icons';
import FlatButton from '../shared/button';

export default function Home({ navigation }) {

  const { loggedInToken, dispatch } = useContext(AuthContext);
  console.log(loggedInToken);
  const [modalOpen, setModalOpen] = useState(false);
  const [pageNo, setPageNo] = useState(0);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    console.log(navigation)
    API.get('posts',{
      params:{
        pageNo:pageNo,
        pageSize:10,
        radius:10000,
        includeOwn:true
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
    .catch((error)=>{
      console.log(error.response);
    })
  }, [modalOpen, navigation])

  const loadMore = () => {
    API.get('posts',{
      params:{
        pageNo:pageNo,
        pageSize:10,
        radius:10000,
        includeOwn:true
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
  
      <Modal visible={modalOpen} animationType='slide'>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.modalContent}>
            <MaterialIcons 
              name='close'
              size={24} 
              style={{...styles.modalToggle, ...styles.modalClose}} 
              onPress={() => setModalOpen(false)} 
            />
            <PostForm setModalOpen={setModalOpen} logInToken={loggedInToken}/>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <MaterialIcons 
        name='add' 
        size={24} 
        style={styles.modalToggle}
        onPress={() => setModalOpen(true)} 
      />

      <FlatList data={posts} keyExtractor={(item, index) => item.postId} renderItem={({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate('PostDetails', { item: item, logInToken: loggedInToken })}>
          <Card>
            <Text style={globalStyles.titleText}>{ item.title }</Text>
          </Card>
        </TouchableOpacity>
      )} />
      { posts.length%10===0 && <FlatButton onPress={loadMore} text='Load More' /> }
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
