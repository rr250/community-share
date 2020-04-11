import { AsyncStorage } from 'react-native'

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'GET_LOGIN_TOKEN':
      console.log('get token')
      var token1='';
      getToken().then((token)=>{
        console.log(token)
        token1= token;
      });
      return token1;
    case 'ADD_LOGIN_TOKEN':
      saveToken(action.loggedInToken).then(()=>{
      })
      return action.loggedInToken;
    case 'REMOVE_LOGIN_TOKEN':
      console.log('remove token')
      const token = action.loggedInToken;
      saveToken(token).then(()=>{
        
      })
      return token;
    default:
      return state;
  }
} 

async function saveToken(token){
  await AsyncStorage.setItem('LoggedInToken', JSON.stringify(token));
}

async function getToken(){
  const initLoggedInToken = await AsyncStorage.getItem('LoggedInToken');
  return initLoggedInToken;
}
