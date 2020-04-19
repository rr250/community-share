import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList, Modal,
  TouchableWithoutFeedback, Keyboard, AsyncStorage, TextInput, Button, Alert } from 'react-native';
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
  const [radius, setRadius] = useState('10');
  const [posts, setPosts] = useState([]);
  const [x, setX] = useState('77.5946');
  const [y, setY] = useState('12.9716');

  const findCoordinates = () => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const location = JSON.stringify(position);
        console.log(position);
        setX(position.coords.longitude);
        setY(position.coords.latitude);
      },
      error => Alert.alert(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  };

  const loadFirst = () => {
    API.get('posts',{
      params:{
        pageNo:0,
        pageSize:10,
        radius:radius,
        includeOwn:true
      },
      headers:{
        Authorization:loggedInToken
      }
    })
    .then(res=>{
      console.log(res)
      setPosts(res.data)
      setPageNo(1);
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

  const loadMore = () => {
    API.get('posts',{
      params:{
        pageNo:pageNo,
        pageSize:10,
        radius:radius,
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

  useEffect(() => {
    findCoordinates();
  }, [])

  useEffect(() => {
    console.log(navigation)
    loadFirst();
  }, [modalOpen])
  
  const handleRadiusChange=(text)=>{
    setRadius(text.substring(9));
  }

  const handleRadiusSubmit=()=>{
    console.log(pageNo,radius);
    loadFirst();
  }

  return (
    <View style={globalStyles.container}>
  
      <Modal visible={modalOpen} animationType='slide'>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.modalContent}>
            <MaterialIcons 
              name='close'
              size={24} 
              style={{...styles.modalToggleClose, ...styles.modalClose}} 
              onPress={() => setModalOpen(false)} 
            />
            <PostForm setModalOpen={setModalOpen} logInToken={loggedInToken} x={x} y={y}/>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <View style={styles.header}>
        <MaterialIcons 
          name='add' 
          size={24} 
          style={styles.modalToggle}
          onPress={() => setModalOpen(true)} 
        > ADD NEW POST</MaterialIcons>

        <TextInput
          style={styles.input}
          onChangeText={text => handleRadiusChange(text)}
          value={'Radius = '+radius}
        />
        <MaterialIcons 
          name='done' 
          size={24} 
          style={styles.radius}
          onPress={handleRadiusSubmit} 
        />
      </View>

      <FlatList data={posts} keyExtractor={(item, index) => item.postId} renderItem={({ item }) => (
        <TouchableOpacity onPress={() => {navigation.navigate('PostDetails', { item: item, logInToken: loggedInToken })}}>
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
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
    marginRight: 25
  },
  modalToggleClose: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#f2f2f2',
    padding: 10,
    borderRadius: 10,
    alignSelf: "center",
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
  },
  modalClose: {
    marginTop: 20,
    marginBottom: 0,
  },
  modalContent: {
    flex: 1,
  },
  header:{
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  radius: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#f2f2f2',
    padding: 10,
    borderRadius: 10,
    alignSelf: "flex-end",
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#f2f2f2',
    padding: 10,
    paddingBottom:7,
    fontSize: 18,
    borderRadius: 10,
    height: 38,
    color: '#333',
  },
});
