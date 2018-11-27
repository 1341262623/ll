// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import moment from 'moment'
import router from './router'
import MyHttpServer from '@/plugins/http.js'


import '@/assets/css/index.css'
 Vue.use(ElementUI)
 Vue.use(MyHttpServer)
 Vue.config.productionTip = false

//定义一个过滤器
Vue.filter('fmdData',(value, fmtString)=>{
return moment(value).format(fmtString)
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
