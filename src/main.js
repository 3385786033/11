// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import $ from 'jquery'
import qs from 'qs'
import VueAreaLinkage from 'vue-area-linkage'
import 'vue-area-linkage/dist/index.css'
import Amap from 'vue-baidu-map'
import echarts from 'echarts'
import store from './store/store'
import axios from 'axios'
import md5 from 'js-md5'
//富文本2
import  VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
Vue.use(VueQuillEditor)
//兼容
import 'babel-polyfill'
//引入中国地图
import 'echarts/map/js/china';
Vue.prototype.$echarts = echarts
Vue.prototype.$md5 = md5
Vue.use(Amap,{
  ak: 'YOUR_APP_KEY'
})
//测试服
/*Vue.prototype.url = 'https://mps.essocial.win/backend'
Vue.prototype.urlImg = 'https://mps.essocial.win'
axios.defaults.baseURL = 'https://mps.essocial.win/backend'*/
//正式服
Vue.prototype.url = 'https://mps.essocial.com.cn/backend'
Vue.prototype.urlImg = 'https://mps.essocial.com.cn'
axios.defaults.baseURL = 'https://mps.essocial.com.cn/backend'

Vue.config.productionTip = false

axios.interceptors.request.use(
  config => {
    config.data = qs.stringify(config.data)
    config.headers = {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      'Accept': 'application/json',
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  })
Vue.use(function(Vue){
  Vue.prototype.$axios = axios
})
Vue.use(ElementUI)
Vue.use(VueAreaLinkage)
/* eslint-disable no-new */

new Vue({
  el: '#app',
  router,
  $,
  store,
  components: { App },
  template: '<App/>'
})
