import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList, Modal,
  TouchableWithoutFeedback, Keyboard, AsyncStorage } from 'react-native';
import { globalStyles } from '../styles/global';
import Card from '../shared/card';
import { AuthContext } from '../contexts/AuthContext';
import API from '../utils/api';
import PostForm from './post/postForm';
import { MaterialIcons } from '@expo/vector-icons';

export default function Home({ navigation }) {

  const { loggedInToken, dispatch } = useContext(AuthContext);
  const [logInToken, setLogInToken] = useState('');
  console.log('use'+loggedInToken+'token');
  const [modalOpen, setModalOpen] = useState(false);
  const [pageNo, setPageNo] = useState(0);
  const [posts, setPosts] = useState([]);
  
  useEffect(()=>{
    AsyncStorage.getItem('LoggedInToken').then((token)=>{
      setLogInToken(token.slice(1,logInToken.length-1));
    })
  },[])

  useEffect(() => {
    if(logInToken!==null && logInToken!==''){
      console.log(logInToken)
      API.get('posts',{
        params:{
          pageNo:pageNo,
          pageSize:10,
          radius:10
        },
        headers:{
          Authorization:loggedInToken
        }
      })
      .then(res=>{
        console.log(res)
      })
      .catch((error)=>{
        console.log(error.response);
      })
    }    
  }, [logInToken])

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
            <PostForm setModalOpen={setModalOpen} logInToken={logInToken}/>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <MaterialIcons 
        name='add' 
        size={24} 
        style={styles.modalToggle}
        onPress={() => setModalOpen(true)} 
      />

      <FlatList data={posts} renderItem={({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate('PostDetails', { item: item, logInToken: logInToken })}>
          <Card>
            <Text style={globalStyles.titleText}>{ item.title }</Text>
          </Card>
        </TouchableOpacity>
      )} />

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
