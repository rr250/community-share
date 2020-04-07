import axios from "axios";
import { AsyncStorage } from 'react-native';

const API = axios.create({
  baseURL: "http://localhost:8085/",
  responseType: "json"
});

async function getToken(token){
  return await AsyncStorage.getItem('LoggedInToken');
}

API.interceptors.request.use((config => {
  console.log('intercepted');
  const loggedInToken = getToken();
  config.headers.Authorization= loggedInToken;
  return config
}))

export default API