import Vue from 'vue'
import App from './App'
import router from './router'
import axios from './api/axios'
import Vant from 'vant';
import 'vant/lib/index.css';
import 'lib-flexible/flexible'
Vue.prototype.$http = axios;
Vue.config.productionTip = false
Vue.use(Vant);
/* eslint-disable no-new */
var obj = {};
var href = decodeURIComponent(window.location.href);
function getParams(sHref) {
  var args = sHref.split('?');
  if(args[0] == sHref){
    return ""
  }
  var arr = args[1].split('&');
  for(var i = 0; i <arr.length;i++){
    var arg = arr[i].split('=');
    obj[arg[0]] = arg[1];
  }
  return obj;
}
getParams(href);
Vue.prototype.userId = obj.userId;
Vue.prototype.macId = obj.macId;
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})

