import axios from "axios";
import { AsyncStorage } from 'react-native';

export const baseURL="http://192.168.43.76:8085/";

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
//   getToken().then((token)=>{
//     loggedInToken=token;  
//     if(loggedInToken!==null||loggedInToken!==''){
//       config.headers.common.Authorization= loggedInToken;
//       console.log(config.headers)
//       console.log(config)
//     }
//   });
//   console.log(config)
//   return config
// })

export default API