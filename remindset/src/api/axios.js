import Vue from 'vue'
import axios from 'axios'
import router from '../router/index'
import { Toast } from 'vant'
const http = axios.create({
  timeout: 80000,
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  }
});

http.interceptors.request.use(
  config=>{
    // Toast.loading({
    //   mask: true,
    // });
    // if(localStorage.getItem('userToken')){
    //   config.headers.token = localStorage.getItem('userToken')
    // }else{
    //   config.headers.token = '1';
    // }
    return config;
  },error=>{
    Promise.reject(error)
  });

http.interceptors.response.use(
  response=>{
    // if(response.data.code == 1){
    //   Toast.clear();
    //   return response.data;
    // }else if (response.data.code == -1) {
    //   Toast.clear();
    //   Toast({
    //     type:'fail',
    //     message:'登录过期',
    //     mask:true,
    //     duration:1000,
    //     onClose:function () {
    //       router.push('/login')
    //     }
    //   })
    // }else{
    //   Toast.clear();
    //   Toast.fail('请求失败')
    // }
    return response.data;
  },error=>{
    return Promise.resolve((error.response))
  });

export default http;
