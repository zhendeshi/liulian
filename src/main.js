import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import EventProxy from 'vue-event-proxy'


import 'vant/lib/index.css';

import './assets/css/base.css'
import './assets/iconfont/iconfont.css'
import 'lib-flexible/flexible'
import './icons/index'
import '@/vant/index'
import pubMethods from './utils/pubMethods'
import {
  Dialog
} from 'vant';


Vue.use(EventProxy);


// 判断当前环境
var ua = navigator.userAgent.toLowerCase();
if (ua.match(/MicroMessenger/i) == "micromessenger") {
  //ios的ua中无miniProgram，但都有MicroMessenger（表示是微信浏览器）
  wx.miniProgram.getEnv((res) => {
    if (res.miniprogram) {
      Vue.prototype.$appType = 1;
       console.log("在小程序里");
    } else {
      Vue.prototype.$appType = 2;
       console.log("不在小程序里,在微信浏览器里");
    }
  })
} else {
  Vue.prototype.$appType = 3;
  console.log('不在微信里，在浏览器里');
}
import {
  post,
  uploadFile
} from '../src/utils/request'
import {
  Toast
} from "vant";
Vue.prototype.$post = post;
Vue.prototype.$uploadFile = uploadFile
Vue.use(Dialog);


Vue.config.productionTip = false
Vue.use(pubMethods)
console.log(wx)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
