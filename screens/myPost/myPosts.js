import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList, Alert } from 'react-native';
import { globalStyles } from '../../styles/global';
import Card from '../../shared/card';
import { AuthContext } from '../../contexts/AuthContext';
import API from '../../utils/api';
import FlatButton from '../../shared/button';

export default function MyPosts({ navigation }) {

  const { loggedInToken, dispatch } = useContext(AuthContext);;

  const [pageNo, setPageNo] = useState(0);
  const [posts, setPosts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadFirst();
  }, [])

  const loadFirst = () => {
    setRefreshing(true)
    API.get('posts/me',{
      params:{
        pageNo:0,
        pageSize:10,
      },
      headers:{
        Authorization:loggedInToken
      }
    })
    .then(res=>{
      console.log(res)
      setPosts(res.data)
      setPageNo(1);
      setRefreshing(false)
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
    if(pageNo<(posts/10+2)){
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
  }
  
  return (
    <View style={globalStyles.container}>
      <FlatList 
        data={posts} 
        keyExtractor={(item, index) => item.postId}
        onRefresh={loadFirst}
        refreshing={refreshing}
        onEndReached = {loadMore}
        onEndThreshold = {0.01}
        renderItem={({ item }) => (
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
