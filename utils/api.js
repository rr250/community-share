import axios from "axios";
import { AsyncStorage } from 'react-native';

export const baseURL="https://cogiv.social/";

const API = axios.create({
  baseURL: baseURL,
  responseType: "json"
});

// async function getToken(token){
//   const loggedInToken = await AsyncStorage.getItem('LoggedInToken');
//   return loggedInToken===null||loggedInToken===''?null:loggedInToken;
// }

// API.interceptors.request.use( config => {
//   console.log('intercepted');
//   var loggedInToken='';
//   return getToken().then((token)=>{
//     loggedInToken=token;  
//     if(loggedInToken!==null||loggedInToken!==''){
//       config.headers.common.Authorization= loggedInToken;
//       console.log(config.headers)
//       console.log(config)
//       return config
//     }
//   });
// })

export default API