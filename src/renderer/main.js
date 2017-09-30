import Vue from 'vue'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

Vue.use(ElementUI)

import App from './App'
import router from './router'
import store from './store'
import { formatDate } from '@/lib/myUtils'

Vue.filter('dateToString', function (value) {
  // 返回处理后的值
  return formatDate(new Date(value))
})
Vue.filter('langToString', function (value) {
  // 返回处理后的值
  let time = parseInt(value / 1000)
  return parseInt(time / 60) + '分' + time % 60 + '秒'
})

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

import './main.css'

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
