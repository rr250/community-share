import { AsyncStorage } from 'react-native'

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'GET_LOGIN_TOKEN':
      // console.log('get token')
      // return getToken().then((token)=>{
      //   console.log('tok'+token)
      //   return token
      // });
      return action.loggedInToken
    case 'ADD_LOGIN_TOKEN':
      console.log(action)
      const token = action.loggedInToken;
      saveToken(token);
      return action.loggedInToken;
    case 'REMOVE_LOGIN_TOKEN':
      console.log('remove token')
      console.log(action)
      const token1 = action.loggedInToken;
      saveToken(token1);
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
