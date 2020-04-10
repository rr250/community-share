import axios from "axios";
import { AsyncStorage } from 'react-native';

export const baseURL="http://192.168.43.49:8085/";

const API = axios.create({
  baseURL: baseURL,
  responseType: "json"
});

async function getToken(token){
  const loggedInToken = await AsyncStorage.getItem('LoggedInToken');
  return loggedInToken===null?null:loggedInToken;
}

API.interceptors.request.use(async config => {
  console.log('intercepted');
  const loggedInToken = await getToken();
  console.log(loggedInToken)
  if(loggedInToken!==null){
    config.headers.Authorization= loggedInToken;
  }
  console.log(config.headers.Authorization);
  return config
})

export default API